# Comic Stack ASP.NET Core API

This is the ASP.NET Core replacement for the PHP API. It preserves the Angular client's `/api/` route contract.

## Requirements

- .NET 10 SDK
- MariaDB/MySQL with the Comic Stack schema from `../api/db/`
- The `comic_stack` database configured in `appsettings.Local.json`

The project targets `net10.0`.

## Configure

Create `appsettings.Local.json` with your local database credentials:

```json
{
  "ConnectionStrings": {
    "ComicStack": "Server=127.0.0.1;Port=3306;Database=comic_stack;User ID=root;Password=;Allow User Variables=true;"
  },
  "LibraryRoot": "D:/Comics",
  "CacheRoot": "D:/comic-stack-cache",
  "Jwt": {
    "Secret": "replace-with-a-random-secret-at-least-32-bytes",
    "LifetimeMinutes": 60
  },
  "AllowRegistration": false
}
```

Do not commit real passwords or JWT secrets.

## Run

From the repository root:

```powershell
dotnet run --project api-dotnet/api-dotnet.csproj --urls http://localhost:5000
```

The Angular development proxy is configured to send `/api` requests to `http://localhost:5000`.

## Current compatibility scope

Implemented:

- JWT login, refresh, logout, registration configuration, and `auth/me`
- Publishers, comics, search options, filtering, and comic DTOs
- Reading progress
- Bookmarks
- User settings
- Continue reading
- Indexed ZIP/CBZ page listing and image streaming
- RAR/CBR page listing and image streaming through 7-Zip
- Publisher thumbnail files from `thumbnails/<archive-name>.webp` or the existing `.jpg` equivalent; WebP is preferred when both exist
- Filename metadata parsing for number, sequence number, heroes, collection, and title
- Library scanning reads only files directly inside each publisher folder; nested folders such as `covers`, `covers-original`, `missing`, `missing-original`, and `thumbnails` are ignored

## Filename metadata migration

For an existing database, run `../api/db/006_filename_metadata.sql` in phpMyAdmin before starting a new scan. The scanner then applies the same ordered filename patterns as the legacy PHP `FilenameParser`, including multiple heroes and combined titles.

Still to migrate:

- Admin scan orchestration and recursive scanner
- Page image processing and filesystem cache
- Cover image processing and filesystem cache

The original PHP API remains in `../api/` until those remaining capabilities are migrated and runtime-tested.
