<?php

declare(strict_types=1);

$config = require dirname(__DIR__) . '/config.php';
$pdo = new PDO($config['db']['dsn'], $config['db']['username'], $config['db']['password'], [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]);
$pdo->exec('CREATE TABLE IF NOT EXISTS schema_migration (version VARCHAR(100) PRIMARY KEY, applied_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP) ENGINE=InnoDB');

$files = glob(dirname(__DIR__) . '/db/*.sql');
sort($files, SORT_NATURAL | SORT_FLAG_CASE);
foreach ($files as $file) {
    $version = basename($file, '.sql');
    $check = $pdo->prepare('SELECT 1 FROM schema_migration WHERE version = ?');
    $check->execute([$version]);
    if ($check->fetchColumn()) continue;

    $pdo->beginTransaction();
    try {
        $pdo->exec(file_get_contents($file));
        $insert = $pdo->prepare('INSERT INTO schema_migration (version) VALUES (?)');
        $insert->execute([$version]);
        $pdo->commit();
        printf("Applied %s\n", $version);
    } catch (Throwable $error) {
        $pdo->rollBack();
        throw $error;
    }
}
