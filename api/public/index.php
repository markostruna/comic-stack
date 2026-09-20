<?php

declare(strict_types=1);

use Comic\Api\Archive\ArchiveReader;

require dirname(__DIR__) . '/vendor/autoload.php';
require dirname(__DIR__) . '/src/Image/PageProcessor.php';

$config = require dirname(__DIR__) . '/config.php';
$pdo = new PDO($config['db']['dsn'], $config['db']['username'], $config['db']['password'], [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
]);
$jwt = new Comic\Api\Auth\Jwt($config['jwtSecret']);

header('Content-Type: application/json; charset=utf-8');

function body(): array
{
    $decoded = json_decode(file_get_contents('php://input'), true);
    return is_array($decoded) ? $decoded : [];
}

function respond(array $data, int $status = 200): never
{
    http_response_code($status);
    echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

function bearer(): ?string
{
    $header = $_SERVER['HTTP_AUTHORIZATION'] ?? '';
    return preg_match('/^Bearer\s+(.+)$/i', $header, $matches) ? $matches[1] : null;
}

$method = $_SERVER['REQUEST_METHOD'];
$path = trim(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH) ?? '', '/');
$path = preg_replace('#^api/?#', '', $path);

try {
    if ($method === 'POST' && $path === 'auth/login') {
        $input = body();
        $statement = $pdo->prepare('SELECT id, username, password_hash, role FROM user WHERE username = ?');
        $statement->execute([(string) ($input['username'] ?? '')]);
        $user = $statement->fetch();
        if (!$user || !password_verify((string) ($input['password'] ?? ''), $user['password_hash'])) {
            respond(['error' => 'Invalid credentials'], 401);
        }

        $accessToken = $jwt->issue((int) $user['id'], $user['username'], $user['role']);
        $refreshToken = bin2hex(random_bytes(32));
        $refreshStatement = $pdo->prepare('INSERT INTO refresh_token (user_id, token_hash, expires_at, user_agent) VALUES (?, ?, DATE_ADD(NOW(), INTERVAL 30 DAY), ?)');
        $refreshStatement->execute([(int) $user['id'], hash('sha256', $refreshToken), $_SERVER['HTTP_USER_AGENT'] ?? null]);
        $pdo->prepare('UPDATE user SET last_login_at = NOW() WHERE id = ?')->execute([(int) $user['id']]);
        respond(['accessToken' => $accessToken, 'refreshToken' => $refreshToken, 'user' => ['id' => (int) $user['id'], 'username' => $user['username'], 'role' => $user['role']]]);
    }

    if ($method === 'POST' && $path === 'auth/register') {
        if (!($config['allowRegistration'] ?? false)) respond(['error' => 'Registration is disabled'], 403);
        $input = body();
        $username = trim((string) ($input['username'] ?? ''));
        $password = (string) ($input['password'] ?? '');
        if (strlen($username) < 3 || strlen($password) < 8) respond(['error' => 'Invalid registration details'], 422);
        $statement = $pdo->prepare('INSERT INTO user (username, password_hash, role) VALUES (?, ?, \'user\')');
        try { $statement->execute([$username, password_hash($password, PASSWORD_BCRYPT)]); }
        catch (PDOException $error) { respond(['error' => 'Username is already in use'], 409); }
        respond(['ok' => true], 201);
    }

    if ($method === 'POST' && $path === 'auth/refresh') {
        $input = body();
        $statement = $pdo->prepare('SELECT u.id, u.username, u.role FROM refresh_token r JOIN user u ON u.id = r.user_id WHERE r.token_hash = ? AND r.revoked_at IS NULL AND r.expires_at > NOW()');
        $statement->execute([hash('sha256', (string) ($input['refreshToken'] ?? ''))]);
        $user = $statement->fetch();
        if (!$user) respond(['error' => 'Invalid refresh token'], 401);
        respond(['accessToken' => $jwt->issue((int) $user['id'], $user['username'], $user['role'])]);
    }

    if ($method === 'POST' && $path === 'auth/logout') {
        $input = body();
        $statement = $pdo->prepare('UPDATE refresh_token SET revoked_at = NOW() WHERE token_hash = ?');
        $statement->execute([hash('sha256', (string) ($input['refreshToken'] ?? ''))]);
        respond(['ok' => true]);
    }

    $token = bearer();
    if (!$token) respond(['error' => 'Authentication required'], 401);
    $claims = $jwt->decode($token);

    if (str_starts_with($path, 'admin/') && ($claims->role ?? null) !== 'admin') {
        respond(['error' => 'Administrator role required'], 403);
    }

    if ($method === 'GET' && $path === 'auth/me') {
        respond(['id' => (int) $claims->sub, 'username' => $claims->username, 'role' => $claims->role]);
    }

    if ($method === 'GET' && $path === 'publishers') {
        $publishers = $pdo->query('SELECT id, name, slug, background_image AS backgroundImage, comic_count AS comicCount FROM publisher ORDER BY sort_order, name')->fetchAll();
        respond($publishers);
    }

    if ($method === 'GET' && preg_match('#^comics/(\d+)$#', $path, $matches)) {
        $statement = $pdo->prepare('SELECT c.*, p.name AS publisher FROM comic c JOIN publisher p ON p.id = c.publisher_id WHERE c.id = ?');
        $statement->execute([(int) $matches[1]]);
        $comic = $statement->fetch();
        if (!$comic) respond(['error' => 'Comic not found'], 404);
        respond(comicDto($comic));
    }

    if (preg_match('#^comics/(\d+)/progress$#', $path, $matches)) {
        $comicId = (int) $matches[1];
        $userId = (int) $claims->sub;
        if ($method === 'GET') {
            $statement = $pdo->prepare('SELECT page_index AS pageIndex, total_pages AS totalPages, completed FROM reading_progress WHERE user_id = ? AND comic_id = ?');
            $statement->execute([$userId, $comicId]);
            respond($statement->fetch() ?: ['pageIndex' => 0, 'totalPages' => 0, 'completed' => false]);
        }
        if ($method === 'PUT') {
            $input = body();
            $statement = $pdo->prepare('INSERT INTO reading_progress (user_id, comic_id, page_index, total_pages, completed) VALUES (?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE page_index = VALUES(page_index), total_pages = VALUES(total_pages), completed = VALUES(completed), updated_at = NOW()');
            $pageIndex = max(0, (int) ($input['pageIndex'] ?? 0));
            $totalPages = max(0, (int) ($input['totalPages'] ?? 0));
            $statement->execute([$userId, $comicId, $pageIndex, $totalPages, $totalPages > 0 && $pageIndex >= $totalPages - 1]);
            respond(['ok' => true]);
        }
    }

    if ($path === 'bookmarks') {
        $userId = (int) $claims->sub;
        if ($method === 'GET') {
            $statement = $pdo->prepare('SELECT id, comic_id AS comicId, page_index AS pageIndex, note, created_at AS createdAt FROM bookmark WHERE user_id = ? ORDER BY created_at DESC');
            $statement->execute([$userId]);
            respond($statement->fetchAll());
        }
        if ($method === 'POST') {
            $input = body();
            $statement = $pdo->prepare('INSERT INTO bookmark (user_id, comic_id, page_index, note) VALUES (?, ?, ?, ?)');
            $statement->execute([$userId, (int) ($input['comicId'] ?? 0), max(0, (int) ($input['pageIndex'] ?? 0)), $input['note'] ?? null]);
            respond(['id' => (int) $pdo->lastInsertId()], 201);
        }
    }

    if (preg_match('#^bookmarks/(\d+)$#', $path, $matches) && $method === 'DELETE') {
        $statement = $pdo->prepare('DELETE FROM bookmark WHERE id = ? AND user_id = ?');
        $statement->execute([(int) $matches[1], (int) $claims->sub]);
        respond(['ok' => true]);
    }

    if ($path === 'settings') {
        $userId = (int) $claims->sub;
        if ($method === 'GET') {
            $statement = $pdo->prepare('SELECT `key`, value_json AS value FROM user_setting WHERE user_id = ?');
            $statement->execute([$userId]);
            $settings = [];
            foreach ($statement->fetchAll() as $setting) $settings[$setting['key']] = json_decode($setting['value'], true);
            respond($settings);
        }
        if ($method === 'PUT') {
            foreach (body() as $key => $value) {
                $statement = $pdo->prepare('INSERT INTO user_setting (user_id, `key`, value_json) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE value_json = VALUES(value_json)');
                $statement->execute([$userId, $key, json_encode($value, JSON_THROW_ON_ERROR)]);
            }
            respond(['ok' => true]);
        }
    }

    if ($method === 'GET' && $path === 'continue-reading') {
        $statement = $pdo->prepare('SELECT c.id, c.title_resolved AS title, p.page_index AS pageIndex, p.total_pages AS totalPages, p.updated_at AS updatedAt FROM reading_progress p JOIN comic c ON c.id = p.comic_id WHERE p.user_id = ? AND p.completed = 0 ORDER BY p.updated_at DESC LIMIT 50');
        $statement->execute([(int) $claims->sub]);
        respond($statement->fetchAll());
    }

    if ($method === 'GET' && preg_match('#^comics/(\d+)/pages$#', $path, $matches)) {
        $pages = archivePages($pdo, (int) $matches[1]);
        respond(array_map(static fn (array $page): array => [
            'idx' => $page['idx'],
            'width' => $page['width'],
            'height' => $page['height'],
            'isSpread' => $page['isSpread'],
        ], $pages));
    }

    if ($method === 'GET' && preg_match('#^comics/(\d+)/pages/(\d+)$#', $path, $matches)) {
        streamPage($pdo, (int) $matches[1], (int) $matches[2]);
    }

    if ($method === 'GET' && preg_match('#^publishers/([^/]+)/comics$#', $path, $matches)) {
        $statement = $pdo->prepare('SELECT c.*, p.name AS publisher FROM comic c JOIN publisher p ON p.id = c.publisher_id WHERE (p.slug = ? OR p.name = ?) AND c.is_available = 1 ORDER BY c.title_resolved');
        $statement->execute([$matches[1], $matches[1]]);
        respond(array_map('comicDto', $statement->fetchAll()));
    }

    if ($method === 'GET' && $path === 'comics') {
        $where = ['1 = 1'];
        $parameters = [];
        if (($availability = $_GET['availability'] ?? 'All') === 'Available') $where[] = 'c.is_available = 1';
        if ($availability === 'Missing') $where[] = 'c.is_available = 0';
        foreach (['title' => 'c.title_resolved', 'publisher' => 'p.name'] as $filter => $column) {
            if (($query = $_GET[$filter] ?? '') !== '') {
                $where[] = "$column LIKE ?";
                $parameters[] = '%' . $query . '%';
            }
        }
        $page = max(1, (int) ($_GET['page'] ?? 1));
        $pageSize = min(100, max(1, (int) ($_GET['pageSize'] ?? 50)));
        $countStatement = $pdo->prepare('SELECT COUNT(*) FROM comic c JOIN publisher p ON p.id = c.publisher_id WHERE ' . implode(' AND ', $where));
        $countStatement->execute($parameters);
        $total = (int) $countStatement->fetchColumn();
        $sort = ($_GET['sort'] ?? 'title') === 'number' ? 'c.number' : 'c.title_resolved';
        $statement = $pdo->prepare('SELECT c.*, p.name AS publisher FROM comic c JOIN publisher p ON p.id = c.publisher_id WHERE ' . implode(' AND ', $where) . " ORDER BY $sort LIMIT ? OFFSET ?");
        $parameters[] = $pageSize;
        $parameters[] = ($page - 1) * $pageSize;
        $statement->execute($parameters);
        $items = array_map('comicDto', $statement->fetchAll());
        respond(['items' => $items, 'total' => $total, 'page' => $page, 'pageSize' => $pageSize]);
    }

    if ($method === 'GET' && $path === 'search/options') {
        respond([
            'heroes' => [],
            'publishers' => $pdo->query('SELECT name FROM publisher ORDER BY name')->fetchAll(PDO::FETCH_COLUMN),
            'collections' => [],
        ]);
    }

    if ($method === 'POST' && $path === 'admin/scan') {
        $pdo->exec("INSERT INTO scan_run (status) VALUES ('queued')");
        $scanRunId = (int) $pdo->lastInsertId();
        $nullDevice = PHP_OS_FAMILY === 'Windows' ? 'NUL' : '/dev/null';
        $process = proc_open(
            [PHP_BINARY, dirname(__DIR__) . '/bin/scan.php'],
            [['pipe', 'r'], ['file', $nullDevice, 'a'], ['file', $nullDevice, 'a']],
            $pipes,
            dirname(__DIR__),
            ['COMIC_SCAN_RUN_ID' => (string) $scanRunId],
            ['bypass_shell' => true]
        );
        if (is_resource($process)) fclose($pipes[0]);
        respond(['scanRunId' => $scanRunId], 202);
    }

    if ($method === 'GET' && preg_match('#^admin/scan/(\d+)$#', $path, $matches)) {
        $statement = $pdo->prepare('SELECT id, started_at AS startedAt, finished_at AS finishedAt, status, added, updated, removed, errors_json AS errors FROM scan_run WHERE id = ?');
        $statement->execute([(int) $matches[1]]);
        $run = $statement->fetch();
        if (!$run) respond(['error' => 'Scan run not found'], 404);
        $run['errors'] = $run['errors'] ? json_decode($run['errors'], true) : [];
        respond($run);
    }

    if ($method === 'GET' && $path === 'admin/scan/history') {
        respond($pdo->query('SELECT id, started_at AS startedAt, finished_at AS finishedAt, status, added, updated, removed FROM scan_run ORDER BY id DESC LIMIT 50')->fetchAll());
    }

    respond(['error' => 'Not found'], 404);
} catch (Throwable $error) {
    error_log($error->getMessage());
    respond(['error' => 'Internal server error'], 500);
}

function comicDto(array $comic): array
{
    $available = (bool) $comic['is_available'];
    return [
        'id' => (int) $comic['id'],
        'filename' => $comic['filename'],
        'originalFilename' => $comic['original_filename'],
        'extension' => $comic['extension'],
        'path' => $comic['rel_path'],
        'publisher' => $comic['publisher'],
        'missing' => !$available,
        'comicMissing' => !$available,
        'thumbnailMissing' => null,
        'coverMissing' => null,
        'number' => $comic['number'] === null ? null : (int) $comic['number'],
        'numberResolved' => $comic['number'] === null ? '' : (string) $comic['number'],
        'titles' => [$comic['title_resolved']],
        'titlesResolved' => $comic['title_resolved'],
        'heroes' => [],
        'heroesResolved' => '',
        'collection' => '',
        'thumbnailPath' => '/api/comics/' . (int) $comic['id'] . '/thumbnail',
        'coverPath' => '/api/comics/' . (int) $comic['id'] . '/cover',
        'currentBackgroundImage' => 'assets/preset-light.png',
        'backgroundImageUrl' => 'url("assets/preset-light.png")',
        'class' => 'thumb',
        'loaded' => false,
        'fakeEntry' => false,
        'publisherResolved' => $comic['publisher'],
    ];
}

function archivePages(PDO $pdo, int $comicId): array
{
    $stored = $pdo->prepare('SELECT idx, entry_raw AS entry, entry_name AS entryName, width, height, is_spread AS isSpread FROM comic_page WHERE comic_id = ? ORDER BY idx');
    $stored->execute([$comicId]);
    $storedPages = $stored->fetchAll(PDO::FETCH_ASSOC);
    if ($storedPages) return array_map(static function (array $page): array {
        $page['idx'] = (int) $page['idx'];
        $page['width'] = $page['width'] === null ? null : (int) $page['width'];
        $page['height'] = $page['height'] === null ? null : (int) $page['height'];
        $page['isSpread'] = (bool) $page['isSpread'];
        return $page;
    }, $storedPages);

    $statement = $pdo->prepare('SELECT rel_path, archive_type FROM comic WHERE id = ? AND is_available = 1');
    $statement->execute([$comicId]);
    $comic = $statement->fetch(PDO::FETCH_ASSOC);
    if (!$comic || !in_array($comic['archive_type'], ['zip', 'rar'], true)) respond(['error' => 'Unsupported comic archive'], 501);

    if ($comic['archive_type'] === 'rar') {
        try {
            return (new ArchiveReader($GLOBALS['config']['sevenZipBinary'] ?? ''))->listImages($archive)['entries'];
        } catch (Throwable $error) {
            respond(['error' => $error->getMessage()], 501);
        }
    }

    $root = realpath($GLOBALS['config']['libraryRoot']);
    $archive = $root . DIRECTORY_SEPARATOR . str_replace('/', DIRECTORY_SEPARATOR, $comic['rel_path']);
    $zip = new ZipArchive();
    if ($zip->open($archive, ZipArchive::RDONLY) !== true) respond(['error' => 'Archive could not be opened'], 404);
    $pages = [];
    for ($index = 0; $index < $zip->numFiles; $index++) {
        $name = $zip->getNameIndex($index, ZipArchive::FL_ENC_RAW);
        if (!is_string($name) || preg_match('#(^|/)(__MACOSX/|\.DS_Store$|Thumbs\.db$)#i', $name) || !preg_match('/\.(jpe?g|png|webp|gif)$/i', $name)) continue;
        $displayName = mb_check_encoding($name, 'UTF-8') ? $name : (iconv('CP1250', 'UTF-8//IGNORE', $name) ?: $name);
        $pages[] = ['idx' => $index, 'entry' => $name, 'entryName' => $displayName, 'width' => null, 'height' => null, 'isSpread' => false];
    }
    usort($pages, static fn (array $left, array $right): int => strnatcasecmp($left['entryName'], $right['entryName']));
    $zip->close();
    return array_values(array_map(static fn (array $page, int $index): array => [...$page, 'idx' => $index], $pages, array_keys($pages)));
}

function streamPage(PDO $pdo, int $comicId, int $pageNumber): never
{
    $variant = $_GET['variant'] ?? 'page';
    if (!in_array($variant, ['page', 'raw', 'thumb'], true)) respond(['error' => 'Invalid page variant'], 400);
    $pages = archivePages($pdo, $comicId);
    if (!isset($pages[$pageNumber])) respond(['error' => 'Page not found'], 404);
    $statement = $pdo->prepare('SELECT rel_path, archive_type, archive_mtime, archive_size FROM comic WHERE id = ? AND is_available = 1');
    $statement->execute([$comicId]);
    $comic = $statement->fetch(PDO::FETCH_ASSOC);
    if (!in_array($comic['archive_type'], ['zip', 'rar'], true)) respond(['error' => 'Unsupported comic archive'], 501);
    $cacheKey = sha1($comicId . "\0" . $pageNumber . "\0" . $variant . "\0" . $comic['archive_mtime'] . ':' . $comic['archive_size']);
    if (($_SERVER['HTTP_IF_NONE_MATCH'] ?? '') === '"' . $cacheKey . '"') { http_response_code(304); exit; }
    $cacheRoot = rtrim($GLOBALS['config']['cacheRoot'], '/\\') . DIRECTORY_SEPARATOR . 'pages';
    $cacheDirectory = $cacheRoot . DIRECTORY_SEPARATOR . substr($cacheKey, 0, 2) . DIRECTORY_SEPARATOR . substr($cacheKey, 2, 2);
    if (!is_dir($cacheDirectory) && !mkdir($cacheDirectory, 0775, true) && !is_dir($cacheDirectory)) {
        respond(['error' => 'Page cache could not be created'], 500);
    }
    $cachePath = $cacheDirectory . DIRECTORY_SEPARATOR . $cacheKey;
    $lock = fopen($cachePath . '.lock', 'c');
    if ($lock === false) respond(['error' => 'Page cache could not be locked'], 500);
    flock($lock, LOCK_EX);
    if (!is_file($cachePath)) {
        $archive = realpath($GLOBALS['config']['libraryRoot']) . DIRECTORY_SEPARATOR . str_replace('/', DIRECTORY_SEPARATOR, $comic['rel_path']);
        $temporaryPath = $cachePath . '.' . bin2hex(random_bytes(6)) . '.tmp';
        if ($comic['archive_type'] === 'rar') {
            try {
                file_put_contents($temporaryPath, (new ArchiveReader($GLOBALS['config']['sevenZipBinary'] ?? ''))->extract($archive, $pages[$pageNumber]['entry']), LOCK_EX);
            } catch (Throwable $error) {
                @unlink($temporaryPath); flock($lock, LOCK_UN); fclose($lock); respond(['error' => $error->getMessage()], 501);
            }
        } else {
            $zip = new ZipArchive();
            if ($zip->open($archive, ZipArchive::RDONLY) !== true) { flock($lock, LOCK_UN); fclose($lock); respond(['error' => 'Archive could not be opened'], 404); }
            $stream = $zip->getStream($pages[$pageNumber]['entry']);
            $output = fopen($temporaryPath, 'wb');
            if (!is_resource($stream) || $output === false || stream_copy_to_stream($stream, $output) === false) {
                if (is_resource($output)) fclose($output);
                if (is_resource($stream)) fclose($stream);
                $zip->close(); @unlink($temporaryPath); flock($lock, LOCK_UN); fclose($lock);
                respond(['error' => 'Page could not be cached'], 500);
            }
            fclose($output); fclose($stream); $zip->close();
        }
        if ($variant !== 'raw') {
            $processedPath = $cachePath . '.processed.tmp';
            $processed = (new Comic\Api\Image\PageProcessor())->process((string) file_get_contents($temporaryPath), $variant);
            file_put_contents($processedPath, $processed, LOCK_EX);
            @unlink($temporaryPath);
            rename($processedPath, $cachePath);
        }
        else rename($temporaryPath, $cachePath);
    }
    $bytes = filesize($cachePath) ?: 0;
    $pdo->prepare('INSERT INTO page_cache (ck, bytes) VALUES (?, ?) ON DUPLICATE KEY UPDATE bytes = VALUES(bytes), last_hit = NOW()')->execute([$cacheKey, $bytes]);
    flock($lock, LOCK_UN);
    fclose($lock);
    while (ob_get_level() > 0) ob_end_clean();
    $extension = strtolower(pathinfo($pages[$pageNumber]['entryName'], PATHINFO_EXTENSION));
    header('Content-Type: ' . ($variant === 'raw' ? ($extension === 'jpg' ? 'image/jpeg' : 'image/' . $extension) : 'image/webp'));
    header('Content-Length: ' . $bytes);
    header('Cache-Control: public, max-age=31536000, immutable');
    header('ETag: "' . $cacheKey . '"');
    header('Accept-Ranges: bytes');
    readfile($cachePath);
    exit;
}
