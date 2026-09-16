<?php

declare(strict_types=1);

$config = require dirname(__DIR__) . '/config.php';
$pdo = new PDO($config['db']['dsn'], $config['db']['username'], $config['db']['password'], [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]);
$cacheRoot = rtrim($config['cacheRoot'], '/\\') . DIRECTORY_SEPARATOR . 'pages';
$cap = (int) ($config['pageCacheCapBytes'] ?? 10 * 1024 * 1024 * 1024);
$target = (int) ($cap * 0.8);
$total = (int) $pdo->query('SELECT COALESCE(SUM(bytes), 0) FROM page_cache')->fetchColumn();

if ($total > $target) {
    $entries = $pdo->query("SELECT ck, bytes FROM page_cache WHERE created_at < DATE_SUB(NOW(), INTERVAL 60 SECOND) ORDER BY last_hit ASC")->fetchAll(PDO::FETCH_ASSOC);
    foreach ($entries as $entry) {
        $path = $cacheRoot . DIRECTORY_SEPARATOR . substr($entry['ck'], 0, 2) . DIRECTORY_SEPARATOR . substr($entry['ck'], 2, 2) . DIRECTORY_SEPARATOR . $entry['ck'];
        if (is_file($path) && !@unlink($path)) continue;
        $pdo->prepare('DELETE FROM page_cache WHERE ck = ?')->execute([$entry['ck']]);
        $total -= (int) $entry['bytes'];
        if ($total <= $target) break;
    }
}

$cutoff = time() - 3600;
foreach (new RecursiveIteratorIterator(new RecursiveDirectoryIterator($cacheRoot, FilesystemIterator::SKIP_DOTS)) as $file) {
    if ($file->isFile() && str_ends_with($file->getFilename(), '.tmp') && $file->getMTime() < $cutoff) @unlink($file->getPathname());
}
printf("Page cache is %d bytes.\n", max(0, $total));
