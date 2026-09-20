<?php

namespace Comic\Api\Auth;

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

final class Jwt
{
    public function __construct(private readonly string $secret) {}

    public function issue(int $userId, string $username, string $role, int $ttl = 900): string
    {
        $now = time();
        return JWT::encode([
            'iss' => 'comic-stack-api',
            'iat' => $now,
            'exp' => $now + $ttl,
            'sub' => (string) $userId,
            'username' => $username,
            'role' => $role,
        ], $this->secret, 'HS256');
    }

    public function decode(string $token): object
    {
        return JWT::decode($token, new Key($this->secret, 'HS256'));
    }
}
