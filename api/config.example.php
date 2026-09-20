<?php

return [
    'db' => [
        'dsn' => 'mysql:host=127.0.0.1;dbname=comic_stack;charset=utf8mb4',
        'username' => 'comic_stack',
        'password' => 'change-me',
    ],
    'libraryRoot' => 'D:/Comics',
    'cacheRoot' => 'D:/comic-stack-cache',
    'sevenZipBinary' => __DIR__ . '/tools/7z.exe',
    'pageCacheCapBytes' => 10 * 1024 * 1024 * 1024,
    'jwtSecret' => 'replace-with-a-long-random-secret',
    'allowRegistration' => false,
];
