# Comic Stack API

The API requires PHP 8.3.5 or newer, Composer, Apache, and MariaDB. Enable
`pdo_mysql`, `zip`, `gd`, `mbstring`, and `openssl` in the XAMPP PHP setup.

1. Copy `config.example.php` to `config.php` and set database, library, cache,
   and JWT secret values.
2. Run `composer install` from this directory.
3. Create the database and run `php bin/migrate.php`.
4. Create the first administrator with
   `php bin/create-admin.php <username> <password>`.

Expose only `api/public` through Apache. On Windows, enable the system-wide
UTF-8 code page and set `default_charset=UTF-8` and `internal_encoding=UTF-8`
in `php.ini`; this is required for non-ASCII archive names to reach 7-Zip
without silent filename corruption.

CBR/RAR support requires a trusted 7-Zip console distribution. Place `7z.exe`
and its matching `7z.dll` in `api/tools/`, or set `sevenZipBinary` to an
absolute path in `config.php`. The API passes archive paths and entry names as
separate process arguments and does not invoke a shell.
