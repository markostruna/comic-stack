<?php

declare(strict_types=1);

use Comic\Api\Scanner\FilenameParser;
use Comic\Api\Archive\ArchiveReader;

require dirname(__DIR__) . '/vendor/autoload.php';
$config = require dirname(__DIR__) . '/config.php';
$pdo = new PDO($config['db']['dsn'], $config['db']['username'], $config['db']['password'], [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
]);
$root = realpath($config['libraryRoot']);
if ($root === false || !is_dir($root)) throw new RuntimeException('Library root does not exist: ' . $config['libraryRoot']);

$dryRun = in_array('--dry-run', $argv, true);
$scanRunId = getenv('COMIC_SCAN_RUN_ID');
if (!$dryRun && $scanRunId !== false && $scanRunId !== '') {
    $pdo->prepare("UPDATE scan_run SET status = 'running' WHERE id = ?")->execute([(int) $scanRunId]);
}
$parser = new FilenameParser();
$seen = [];
$publishers = [];
$stats = ['added' => 0, 'updated' => 0, 'errors' => 0];
$iterator = new RecursiveIteratorIterator(new RecursiveDirectoryIterator($root, FilesystemIterator::SKIP_DOTS));

if (!$dryRun) $pdo->exec('UPDATE comic SET is_available = 0');

foreach ($iterator as $file) {
    if (!$file->isFile()) continue;
    $extension = strtolower($file->getExtension());
    if (!in_array($extension, ['cbz', 'cbr', 'zip', 'rar', 'jpg'], true)) continue;
    $relative = str_replace('\\', '/', substr($file->getPathname(), strlen($root) + 1));
    $parts = explode('/', $relative, 2);
    if (count($parts) !== 2) continue;
    [$publisherName] = $parts;
    $filename = $file->getFilename();
    $extensionOffset = strrpos($filename, '.');
    $comicName = $extensionOffset === false ? $filename : substr($filename, 0, $extensionOffset);
    $parsed = $parser->parse($comicName);
    $seen[$relative] = true;

    if ($dryRun) {
        printf("%s | %s | %s\n", $publisherName, $relative, $parsed['title']);
        continue;
    }

    if (!isset($publishers[$publisherName])) {
        $slug = strtolower(trim(preg_replace('/[^a-z0-9]+/i', '-', $publisherName), '-')) ?: 'publisher';
        $statement = $pdo->prepare('INSERT INTO publisher (name, slug, rel_path) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE rel_path = VALUES(rel_path), id = LAST_INSERT_ID(id)');
        $statement->execute([$publisherName, $slug, $parts[0] . '/']);
        $publishers[$publisherName] = (int) $pdo->lastInsertId();
    }

    $statement = $pdo->prepare('SELECT id, archive_size, archive_mtime, page_count FROM comic WHERE rel_path = ?');
    $statement->execute([$relative]);
    $existing = $statement->fetch(PDO::FETCH_ASSOC);
    $hasPageIndex = $extension !== 'cbz' && $extension !== 'zip' || $existing && $existing['page_count'] !== null;
    if ($existing && (int) $existing['archive_size'] === $file->getSize() && (int) $existing['archive_mtime'] === $file->getMTime() && $hasPageIndex) {
        $pdo->prepare('UPDATE comic SET is_available = ?, scanned_at = NOW() WHERE id = ?')->execute([$extension === 'jpg' ? 0 : 1, (int) $existing['id']]);
        $stats['updated']++;
        continue;
    }
    $archiveType = in_array($extension, ['cbz', 'zip'], true) ? 'zip' : (in_array($extension, ['cbr', 'rar'], true) ? 'rar' : 'none');
    $number = $parsed['number'];
    $title = $parsed['title'];
    $upsert = $pdo->prepare('INSERT INTO comic (publisher_id, rel_path, filename, original_filename, extension, number, title_resolved, archive_size, archive_mtime, archive_type, is_solid, is_available, scanned_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0, ?, NOW()) ON DUPLICATE KEY UPDATE id = LAST_INSERT_ID(id), publisher_id = VALUES(publisher_id), filename = VALUES(filename), original_filename = VALUES(original_filename), extension = VALUES(extension), number = VALUES(number), title_resolved = VALUES(title_resolved), archive_size = VALUES(archive_size), archive_mtime = VALUES(archive_mtime), archive_type = VALUES(archive_type), is_solid = 0, is_available = VALUES(is_available), scanned_at = NOW()');
    $upsert->execute([$publishers[$publisherName], $relative, $comicName, $filename, $extension, $number, $title, $file->getSize(), $file->getMTime(), $archiveType, $extension === 'jpg' ? 0 : 1]);
    $comicId = (int) $pdo->lastInsertId();
    if ($archiveType === 'zip') indexZipPages($pdo, $comicId, $file->getPathname());
    if ($archiveType === 'rar') {
        try {
            indexRarPages($pdo, $comicId, $file->getPathname(), $config['sevenZipBinary'] ?? '');
        } catch (Throwable $error) {
            $stats['errors']++;
            fwrite(STDERR, $relative . ': ' . $error->getMessage() . PHP_EOL);
        }
    }
    $existing ? $stats['updated']++ : $stats['added']++;
}

if (!$dryRun) {
    $pdo->exec('UPDATE publisher p SET comic_count = (SELECT COUNT(*) FROM comic c WHERE c.publisher_id = p.id AND c.is_available = 1)');
}
printf("Scanned %d files: %d added, %d updated, %d errors.\n", count($seen), $stats['added'], $stats['updated'], $stats['errors']);
if (!$dryRun && $scanRunId !== false && $scanRunId !== '') {
    $pdo->prepare("UPDATE scan_run SET status = 'completed', finished_at = NOW(), added = ?, updated = ?, errors_json = ? WHERE id = ?")
        ->execute([$stats['added'], $stats['updated'], json_encode([], JSON_THROW_ON_ERROR), (int) $scanRunId]);
}

function indexZipPages(PDO $pdo, int $comicId, string $archivePath): void
{
    $zip = new ZipArchive();
    if ($zip->open($archivePath, ZipArchive::RDONLY) !== true) return;
    $pages = [];
    for ($index = 0; $index < $zip->numFiles; $index++) {
        $rawName = $zip->getNameIndex($index, ZipArchive::FL_ENC_RAW);
        if (!is_string($rawName) || preg_match('#(^|/)(__MACOSX/|\.DS_Store$|Thumbs\.db$)#i', $rawName) || !preg_match('/\.(jpe?g|png|webp|gif)$/i', $rawName)) continue;
        $displayName = mb_check_encoding($rawName, 'UTF-8') ? $rawName : (iconv('CP1250', 'UTF-8//IGNORE', $rawName) ?: $rawName);
        $stream = $zip->getStream($rawName);
        $dimensions = is_resource($stream) ? @getimagesizefromstring((string) stream_get_contents($stream)) : false;
        if (is_resource($stream)) fclose($stream);
        $entryStat = $zip->statIndex($index);
        $pages[] = ['raw' => $rawName, 'name' => $displayName, 'width' => $dimensions ? $dimensions[0] : null, 'height' => $dimensions ? $dimensions[1] : null, 'size' => is_array($entryStat) ? ($entryStat['size'] ?? null) : null, 'spread' => $dimensions && $dimensions[1] > 0 && $dimensions[0] / $dimensions[1] >= 1.35];
    }
    $zip->close();
    usort($pages, static fn (array $left, array $right): int => strnatcasecmp($left['name'], $right['name']));
    $pdo->prepare('DELETE FROM comic_page WHERE comic_id = ?')->execute([$comicId]);
    $insert = $pdo->prepare('INSERT INTO comic_page (comic_id, idx, entry_raw, entry_name, width, height, uncompressed_size, is_spread) VALUES (?, ?, ?, ?, ?, ?, ?, ?)');
    foreach ($pages as $index => $page) $insert->execute([$comicId, $index, $page['raw'], $page['name'], $page['width'], $page['height'], $page['size'], $page['spread']]);
    $pdo->prepare('UPDATE comic SET page_count = ?, indexed_at = NOW() WHERE id = ?')->execute([count($pages), $comicId]);
}

function indexRarPages(PDO $pdo, int $comicId, string $archivePath, string $binary): void
{
    $reader = new ArchiveReader($binary);
    $listing = $reader->listImages($archivePath);
    $pages = $listing['entries'];
    foreach ($pages as &$page) {
        $dimensions = @getimagesizefromstring($reader->extract($archivePath, $page['entry']));
        $page['width'] = $dimensions ? $dimensions[0] : null;
        $page['height'] = $dimensions ? $dimensions[1] : null;
        $page['isSpread'] = $dimensions && $dimensions[1] > 0 && $dimensions[0] / $dimensions[1] >= 1.35;
    }
    unset($page);
    $pdo->prepare('DELETE FROM comic_page WHERE comic_id = ?')->execute([$comicId]);
    $insert = $pdo->prepare('INSERT INTO comic_page (comic_id, idx, entry_raw, entry_name, width, height, uncompressed_size, is_spread) VALUES (?, ?, ?, ?, ?, ?, ?, ?)');
    foreach ($pages as $page) {
        $insert->execute([$comicId, $page['idx'], $page['entry'], $page['entryName'], $page['width'], $page['height'], $page['size'], $page['isSpread']]);
    }
    $pdo->prepare('UPDATE comic SET is_solid = ?, page_count = ?, indexed_at = NOW() WHERE id = ?')->execute([$listing['solid'] ? 1 : 0, count($pages), $comicId]);
}
