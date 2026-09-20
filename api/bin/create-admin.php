<?php

declare(strict_types=1);

if ($argc !== 3) {
    fwrite(STDERR, "Usage: php bin/create-admin.php <username> <password>\n");
    exit(2);
}

$config = require dirname(__DIR__) . '/config.php';
$pdo = new PDO($config['db']['dsn'], $config['db']['username'], $config['db']['password'], [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]);
$statement = $pdo->prepare('INSERT INTO user (username, password_hash, role) VALUES (?, ?, \'admin\')');
$statement->execute([$argv[1], password_hash($argv[2], PASSWORD_BCRYPT)]);
fwrite(STDOUT, "Admin user created.\n");
