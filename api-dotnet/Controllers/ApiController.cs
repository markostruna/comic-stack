using api_dotnet.Data;
using api_dotnet.Models;
using api_dotnet.Security;
using BCrypt.Net;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using MySqlConnector;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using System.Threading;
using System.Threading.Tasks;
using System.IdentityModel.Tokens.Jwt;
using System.IO;
using System.IO.Compression;
using Microsoft.AspNetCore.StaticFiles;
using System.Text.RegularExpressions;
using api_dotnet.Scanner;

namespace api_dotnet.Controllers
{
    [ApiController]
    [Route("api")]
    [Authorize]
    public sealed class ApiController : ControllerBase
    {
        private readonly Database database;
        private readonly JwtTokenService tokens;
        private readonly IConfiguration configuration;
        private static readonly ConcurrentDictionary<long, SemaphoreSlim> pageIndexLocks = new();
        private static readonly FilenameParser filenameParser = new();

        public ApiController(Database database, JwtTokenService tokens, IConfiguration configuration)
        {
            this.database = database;
            this.tokens = tokens;
            this.configuration = configuration;
        }

        [AllowAnonymous]
        [HttpPost("auth/login")]
        public async Task<IActionResult> Login(LoginRequest request)
        {
            await using var connection = database.CreateConnection();
            await connection.OpenAsync();
            await using var command = new MySqlCommand("SELECT id, username, password_hash, role FROM user WHERE username = @username", connection);
            command.Parameters.AddWithValue("@username", request?.Username ?? string.Empty);
            await using var reader = await command.ExecuteReaderAsync();
            if (!await reader.ReadAsync() || !BCrypt.Net.BCrypt.Verify(request?.Password ?? string.Empty, reader.GetString("password_hash")))
                return Unauthorized(new { error = "Invalid credentials" });

            var userId = reader.GetInt64("id");
            var username = reader.GetString("username");
            var role = reader.GetString("role");
            await reader.CloseAsync();
            var refreshBytes = new byte[32];
            RandomNumberGenerator.Fill(refreshBytes);
            var refreshToken = Convert.ToHexString(refreshBytes).ToLowerInvariant();
            await using var refresh = new MySqlCommand("INSERT INTO refresh_token (user_id, token_hash, expires_at, user_agent) VALUES (@userId, @hash, DATE_ADD(NOW(), INTERVAL 30 DAY), @agent); UPDATE user SET last_login_at = NOW() WHERE id = @userId;", connection);
            refresh.Parameters.AddWithValue("@userId", userId);
            refresh.Parameters.AddWithValue("@hash", Sha256(refreshToken));
            refresh.Parameters.AddWithValue("@agent", Request.Headers["User-Agent"].ToString());
            await refresh.ExecuteNonQueryAsync();
            return Ok(new { accessToken = tokens.Issue(userId, username, role), refreshToken, user = new { id = userId, username, role } });
        }

        [AllowAnonymous]
        [HttpPost("auth/register")]
        public async Task<IActionResult> Register(LoginRequest request)
        {
            if (!bool.TryParse(configuration["AllowRegistration"], out var enabled) || !enabled)
                return StatusCode(403, new { error = "Registration is disabled" });
            if (string.IsNullOrWhiteSpace(request?.Username) || request.Username.Trim().Length < 3 || string.IsNullOrEmpty(request.Password) || request.Password.Length < 8)
                return UnprocessableEntity(new { error = "Invalid registration details" });
            try
            {
                await using var connection = database.CreateConnection();
                await connection.OpenAsync();
                await using var command = new MySqlCommand("INSERT INTO user (username, password_hash, role) VALUES (@username, @password, 'user')", connection);
                command.Parameters.AddWithValue("@username", request.Username.Trim());
                command.Parameters.AddWithValue("@password", BCrypt.Net.BCrypt.HashPassword(request.Password));
                await command.ExecuteNonQueryAsync();
                return StatusCode(201, new { ok = true });
            }
            catch (MySqlException error) when (error.Number == 1062)
            {
                return Conflict(new { error = "Username is already in use" });
            }
        }

        [AllowAnonymous]
        [HttpPost("auth/refresh")]
        public async Task<IActionResult> Refresh(RefreshRequest request)
        {
            await using var connection = database.CreateConnection();
            await connection.OpenAsync();
            await using var command = new MySqlCommand("SELECT u.id, u.username, u.role FROM refresh_token r JOIN user u ON u.id = r.user_id WHERE r.token_hash = @hash AND r.revoked_at IS NULL AND r.expires_at > NOW()", connection);
            command.Parameters.AddWithValue("@hash", Sha256(request?.RefreshToken ?? string.Empty));
            await using var reader = await command.ExecuteReaderAsync();
            if (!await reader.ReadAsync()) return Unauthorized(new { error = "Invalid refresh token" });
            return Ok(new { accessToken = tokens.Issue(reader.GetInt64("id"), reader.GetString("username"), reader.GetString("role")) });
        }

        [AllowAnonymous]
        [HttpPost("auth/logout")]
        public async Task<IActionResult> Logout(RefreshRequest request)
        {
            await using var connection = database.CreateConnection();
            await connection.OpenAsync();
            await using var command = new MySqlCommand("UPDATE refresh_token SET revoked_at = NOW() WHERE token_hash = @hash", connection);
            command.Parameters.AddWithValue("@hash", Sha256(request?.RefreshToken ?? string.Empty));
            await command.ExecuteNonQueryAsync();
            return Ok(new { ok = true });
        }

        [HttpGet("auth/me")]
        public IActionResult Me() => Ok(new { id = UserId(), username = User.Identity?.Name, role = User.FindFirstValue(ClaimTypes.Role) });

        [HttpGet("publishers")]
        public async Task<IActionResult> Publishers()
        {
            var rows = await Query("SELECT id, name, slug, slug AS path, background_image AS backgroundImage, comic_count AS comicCount FROM publisher ORDER BY sort_order, name");
            return Ok(rows);
        }

        [HttpGet("publishers/{publisher}/comics")]
        public async Task<IActionResult> PublisherComics(string publisher)
        {
            var rows = await Query("SELECT c.*, p.name AS publisher FROM comic c JOIN publisher p ON p.id = c.publisher_id WHERE (p.slug = @publisher OR p.name = @publisher) ORDER BY c.original_filename", new Dictionary<string, object> { ["@publisher"] = publisher });
            return Ok(rows.Select(ComicDto));
        }

        [HttpGet("comics")]
        public async Task<IActionResult> Comics([FromQuery] ComicFilter filter)
        {
            filter.Page = Math.Max(1, filter.Page);
            filter.PageSize = Math.Min(10000, Math.Max(1, filter.PageSize));
            var clauses = new List<string> { "1 = 1" };
            var parameters = new Dictionary<string, object>();
            if (filter.Availability == "Available") clauses.Add("c.is_available = 1");
            if (filter.Availability == "Missing") clauses.Add("c.is_available = 0");
            if (!string.IsNullOrWhiteSpace(filter.Title)) { clauses.Add("c.title_resolved LIKE @title"); parameters["@title"] = "%" + filter.Title + "%"; }
            if (!string.IsNullOrWhiteSpace(filter.Publisher)) { clauses.Add("p.name = @publisher"); parameters["@publisher"] = filter.Publisher.Trim(); }
            if (!string.IsNullOrWhiteSpace(filter.Hero))
            {
                clauses.Add("FIND_IN_SET(@hero, REPLACE(c.hero, ', ', ',')) > 0");
                parameters["@hero"] = filter.Hero.Trim();
            }
            if (!string.IsNullOrWhiteSpace(filter.Collection)) { clauses.Add("c.collection = @collection"); parameters["@collection"] = filter.Collection.Trim(); }
            var where = string.Join(" AND ", clauses);
            var countRows = await Query("SELECT COUNT(*) AS total FROM comic c JOIN publisher p ON p.id = c.publisher_id WHERE " + where, parameters);
            var total = Convert.ToInt32(countRows[0]["total"]);
            var sort = filter.Sort == "number"
                ? "p.name, c.number, c.original_filename"
                : "p.name, c.original_filename";
            parameters["@limit"] = filter.PageSize;
            parameters["@offset"] = (filter.Page - 1) * filter.PageSize;
            var items = await Query("SELECT c.*, p.name AS publisher FROM comic c JOIN publisher p ON p.id = c.publisher_id WHERE " + where + " ORDER BY " + sort + " LIMIT @limit OFFSET @offset", parameters);
            return Ok(new { items = items.Select(ComicDto), total, page = filter.Page, pageSize = filter.PageSize });
        }

        [HttpGet("comics/{comicId:long}")]
        public async Task<IActionResult> Comic(long comicId)
        {
            var rows = await Query("SELECT c.*, p.name AS publisher FROM comic c JOIN publisher p ON p.id = c.publisher_id WHERE c.id = @id", new Dictionary<string, object> { ["@id"] = comicId });
            return rows.Count == 0 ? NotFound(new { error = "Comic not found" }) : Ok(ComicDto(rows[0]));
        }

        [HttpGet("search/options")]
        public async Task<IActionResult> SearchOptions()
        {
            var publishers = await Query("SELECT name FROM publisher ORDER BY name");
            var heroes = await Query("SELECT DISTINCT hero FROM comic WHERE is_available = 1 AND hero IS NOT NULL AND hero <> '' ORDER BY hero");
            var collections = await Query("SELECT DISTINCT collection FROM comic WHERE is_available = 1 AND collection IS NOT NULL AND collection <> '' ORDER BY collection");
            return Ok(new
            {
                heroes = heroes.SelectMany(row => (row["hero"]?.ToString() ?? string.Empty).Split(',', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries)).Distinct(StringComparer.OrdinalIgnoreCase).OrderBy(value => value),
                publishers = publishers.Select(row => row["name"]?.ToString()),
                collections = collections.Select(row => row["collection"]?.ToString()),
            });
        }

        [HttpGet("comics/{comicId:long}/progress")]
        public async Task<IActionResult> ReadProgress(long comicId)
        {
            var rows = await Query("SELECT page_index AS pageIndex, total_pages AS totalPages, completed FROM reading_progress WHERE user_id = @userId AND comic_id = @comicId", UserParameters(comicId));
            return Ok(rows.Count == 0 ? new { pageIndex = 0, totalPages = 0, completed = false } : rows[0]);
        }

        [HttpPut("comics/{comicId:long}/progress")]
        public async Task<IActionResult> WriteProgress(long comicId, ProgressRequest request)
        {
            var pageIndex = Math.Max(0, request?.PageIndex ?? 0);
            var totalPages = Math.Max(0, request?.TotalPages ?? 0);
            await Execute("INSERT INTO reading_progress (user_id, comic_id, page_index, total_pages, completed) VALUES (@userId, @comicId, @pageIndex, @totalPages, @completed) ON DUPLICATE KEY UPDATE page_index = VALUES(page_index), total_pages = VALUES(total_pages), completed = VALUES(completed), updated_at = NOW()", new Dictionary<string, object> { ["@userId"] = UserId(), ["@comicId"] = comicId, ["@pageIndex"] = pageIndex, ["@totalPages"] = totalPages, ["@completed"] = totalPages > 0 && pageIndex >= totalPages - 1 });
            return Ok(new { ok = true });
        }

        [HttpGet("bookmarks")]
        public async Task<IActionResult> Bookmarks()
        {
            return Ok(await Query("SELECT id, comic_id AS comicId, page_index AS pageIndex, note, created_at AS createdAt FROM bookmark WHERE user_id = @userId ORDER BY created_at DESC", UserParameters()));
        }

        [HttpPost("bookmarks")]
        public async Task<IActionResult> CreateBookmark(BookmarkRequest request)
        {
            await using var connection = database.CreateConnection();
            await connection.OpenAsync();
            await using var command = new MySqlCommand("INSERT INTO bookmark (user_id, comic_id, page_index, note) VALUES (@userId, @comicId, @pageIndex, @note); SELECT LAST_INSERT_ID();", connection);
            command.Parameters.AddWithValue("@userId", UserId());
            command.Parameters.AddWithValue("@comicId", request?.ComicId ?? 0);
            command.Parameters.AddWithValue("@pageIndex", Math.Max(0, request?.PageIndex ?? 0));
            command.Parameters.AddWithValue("@note", request?.Note);
            var id = Convert.ToInt64(await command.ExecuteScalarAsync());
            return StatusCode(201, new { id });
        }

        [HttpDelete("bookmarks/{bookmarkId:long}")]
        public async Task<IActionResult> DeleteBookmark(long bookmarkId)
        {
            await Execute("DELETE FROM bookmark WHERE id = @id AND user_id = @userId", new Dictionary<string, object> { ["@id"] = bookmarkId, ["@userId"] = UserId() });
            return Ok(new { ok = true });
        }

        [HttpGet("settings")]
        public async Task<IActionResult> Settings()
        {
            var rows = await Query("SELECT `key`, value_json AS value FROM user_setting WHERE user_id = @userId", UserParameters());
            var settings = rows.ToDictionary(row => row["key"].ToString(), row => JsonSerializer.Deserialize<JsonElement>(row["value"].ToString()));
            return Ok(settings);
        }

        [HttpPut("settings")]
        public async Task<IActionResult> UpdateSettings([FromBody] Dictionary<string, JsonElement> settings)
        {
            foreach (var setting in settings ?? new Dictionary<string, JsonElement>())
                await Execute("INSERT INTO user_setting (user_id, `key`, value_json) VALUES (@userId, @key, @value) ON DUPLICATE KEY UPDATE value_json = VALUES(value_json)", new Dictionary<string, object> { ["@userId"] = UserId(), ["@key"] = setting.Key, ["@value"] = setting.Value.GetRawText() });
            return Ok(new { ok = true });
        }

        [HttpGet("continue-reading")]
        public async Task<IActionResult> ContinueReading()
        {
            return Ok(await Query("SELECT c.id, c.title_resolved AS title, p.page_index AS pageIndex, p.total_pages AS totalPages, p.updated_at AS updatedAt FROM reading_progress p JOIN comic c ON c.id = p.comic_id WHERE p.user_id = @userId AND p.completed = 0 ORDER BY p.updated_at DESC LIMIT 50", UserParameters()));
        }

        [Authorize(Roles = "admin")]
        [HttpPost("admin/scan")]
        public async Task<IActionResult> StartScan()
        {
            await using var connection = database.CreateConnection();
            await connection.OpenAsync();
            await using var command = new MySqlCommand("INSERT INTO scan_run (status) VALUES ('queued'); SELECT LAST_INSERT_ID();", connection);
            var scanRunId = Convert.ToInt64(await command.ExecuteScalarAsync());
            _ = Task.Run(() => ScanAsync(scanRunId));
            return Accepted(new { scanRunId });
        }

        [Authorize(Roles = "admin")]
        [HttpGet("admin/scan/{scanRunId:long}")]
        public async Task<IActionResult> ScanStatus(long scanRunId)
        {
            var rows = await Query("SELECT id, started_at AS startedAt, finished_at AS finishedAt, status, added, updated, removed, errors_json AS errors FROM scan_run WHERE id = @id", new Dictionary<string, object> { ["@id"] = scanRunId });
            if (rows.Count == 0) return NotFound(new { error = "Scan run not found" });
            rows[0]["errors"] = rows[0]["errors"] == null ? Array.Empty<string>() : JsonSerializer.Deserialize<JsonElement>(rows[0]["errors"].ToString());
            return Ok(rows[0]);
        }

        [Authorize(Roles = "admin")]
        [HttpGet("admin/scan/history")]
        public async Task<IActionResult> ScanHistory()
        {
            return Ok(await Query("SELECT id, started_at AS startedAt, finished_at AS finishedAt, status, added, updated, removed FROM scan_run ORDER BY id DESC LIMIT 50"));
        }

        [HttpGet("comics/{comicId:long}/pages")]
        public async Task<IActionResult> Pages(long comicId)
        {
            await EnsurePageIndexAsync(comicId);
            var rows = await Query("SELECT idx, width, height, is_spread AS isSpread FROM comic_page WHERE comic_id = @comicId ORDER BY idx", new Dictionary<string, object> { ["@comicId"] = comicId });
            return Ok(rows);
        }

        [AllowAnonymous]
        [HttpGet("comics/{comicId:long}/pages/{pageIndex:int}")]
        public async Task<IActionResult> Page(long comicId, int pageIndex)
        {
            await EnsurePageIndexAsync(comicId);
            var comics = await Query("SELECT rel_path, archive_type, is_available FROM comic WHERE id = @comicId", new Dictionary<string, object> { ["@comicId"] = comicId });
            if (comics.Count == 0 || !Convert.ToBoolean(comics[0]["is_available"])) return NotFound(new { error = "Comic not found" });
            var pages = await Query("SELECT idx, entry_name AS entryName FROM comic_page WHERE comic_id = @comicId AND idx = @pageIndex", new Dictionary<string, object> { ["@comicId"] = comicId, ["@pageIndex"] = pageIndex });
            if (pages.Count == 0) return NotFound(new { error = "Page not found" });
            var archivePath = SafeLibraryPath(comics[0]["rel_path"]?.ToString());
            if (archivePath == null || !System.IO.File.Exists(archivePath)) return NotFound(new { error = "Comic archive not found" });

            var entryName = pages[0]["entryName"]?.ToString() ?? string.Empty;
            byte[] content;
            if (string.Equals(comics[0]["archive_type"]?.ToString(), "zip", StringComparison.OrdinalIgnoreCase))
            {
                using var archive = ZipFile.OpenRead(archivePath);
                var entry = archive.GetEntry(entryName);
                if (entry == null) return NotFound(new { error = "Page entry not found" });
                await using var stream = entry.Open();
                using var memory = new MemoryStream();
                await stream.CopyToAsync(memory);
                content = memory.ToArray();
            }
            else
            {
                content = await ExtractSevenZipEntryAsync(archivePath, entryName);
            }

            var provider = new FileExtensionContentTypeProvider();
            Response.Headers.CacheControl = "public, max-age=2592000";
            return File(content, provider.TryGetContentType(entryName, out var contentType) ? contentType : "application/octet-stream");
        }

        [AllowAnonymous]
        [HttpGet("comics/{comicId:long}/thumbnail")]
        public async Task<IActionResult> Thumbnail(long comicId)
        {
            var comics = await Query("SELECT rel_path, original_filename FROM comic WHERE id = @comicId", new Dictionary<string, object> { ["@comicId"] = comicId });
            if (comics.Count == 0) return NotFound(new { error = "Comic not found" });

            var thumbnailPath = FindArtworkPath(comics[0], "thumbnails");
            if (thumbnailPath == null) return NotFound(new { error = "Thumbnail not found" });

            Response.Headers.CacheControl = "public, max-age=2592000";
            return PhysicalFile(thumbnailPath, ArtworkContentType(thumbnailPath));
        }

        [AllowAnonymous]
        [HttpGet("artwork/{kind}")]
        public IActionResult Artwork(string kind, [FromQuery] string path)
        {
            if (!string.Equals(kind, "thumbnail", StringComparison.OrdinalIgnoreCase)
                && !string.Equals(kind, "cover", StringComparison.OrdinalIgnoreCase))
                return NotFound(new { error = "Artwork type not found" });

            var comicPath = SafeLibraryPath(path);
            if (comicPath == null) return NotFound(new { error = "Comic path is invalid" });

            var comic = new Dictionary<string, object>
            {
                ["rel_path"] = path ?? string.Empty,
                ["original_filename"] = Path.GetFileName(comicPath),
            };
            var folder = kind.Equals("cover", StringComparison.OrdinalIgnoreCase) ? "covers" : "thumbnails";
            var artworkPath = FindArtworkPath(comic, folder);
            if (artworkPath == null) return NotFound(new { error = "Artwork not found" });
            Response.Headers.CacheControl = "public, max-age=2592000";
            return PhysicalFile(artworkPath, ArtworkContentType(artworkPath));
        }

        [AllowAnonymous]
        [HttpGet("comics/{comicId:long}/cover")]
        public async Task<IActionResult> Cover(long comicId)
        {
            var comics = await Query("SELECT rel_path, original_filename FROM comic WHERE id = @comicId", new Dictionary<string, object> { ["@comicId"] = comicId });
            if (comics.Count == 0) return NotFound(new { error = "Comic not found" });

            var coverPath = FindArtworkPath(comics[0], "covers");
            if (coverPath == null) return NotFound(new { error = "Cover not found" });
            Response.Headers.CacheControl = "public, max-age=2592000";
            return PhysicalFile(coverPath, ArtworkContentType(coverPath));
        }

        private long UserId() => long.Parse(User.FindFirstValue(JwtRegisteredClaimNames.Sub) ?? User.FindFirstValue(ClaimTypes.NameIdentifier));

        private Dictionary<string, object> UserParameters(long? comicId = null)
        {
            var values = new Dictionary<string, object> { ["@userId"] = UserId() };
            if (comicId.HasValue) values["@comicId"] = comicId.Value;
            return values;
        }

        private async Task<List<Dictionary<string, object>>> Query(string sql, Dictionary<string, object> parameters = null)
        {
            await using var connection = database.CreateConnection();
            await connection.OpenAsync();
            await using var command = new MySqlCommand(sql, connection);
            AddParameters(command, parameters);
            return await Database.ReadRowsAsync(command);
        }

        private async Task<int> Execute(string sql, Dictionary<string, object> parameters)
        {
            await using var connection = database.CreateConnection();
            await connection.OpenAsync();
            await using var command = new MySqlCommand(sql, connection);
            AddParameters(command, parameters);
            return await command.ExecuteNonQueryAsync();
        }

        private static void AddParameters(MySqlCommand command, Dictionary<string, object> parameters)
        {
            if (parameters == null) return;
            foreach (var parameter in parameters) command.Parameters.AddWithValue(parameter.Key, parameter.Value ?? DBNull.Value);
        }

        private static string Sha256(string value)
        {
            using var hash = SHA256.Create();
            return Convert.ToHexString(hash.ComputeHash(Encoding.UTF8.GetBytes(value))).ToLowerInvariant();
        }

        private string SafeLibraryPath(string relativePath)
        {
            var root = configuration["LibraryRoot"] ?? string.Empty;
            var fullRoot = Path.GetFullPath(root).TrimEnd(Path.DirectorySeparatorChar) + Path.DirectorySeparatorChar;
            var candidate = Path.GetFullPath(Path.Combine(root, (relativePath ?? string.Empty).Replace('/', Path.DirectorySeparatorChar)));
            return candidate.StartsWith(fullRoot, StringComparison.OrdinalIgnoreCase) ? candidate : null;
        }

        private string FindArtworkPath(Dictionary<string, object> comic, string folder)
        {
            var relativePath = comic["rel_path"]?.ToString() ?? string.Empty;
            var publisher = relativePath.Split('/', StringSplitOptions.RemoveEmptyEntries).FirstOrDefault();
            var originalFilename = comic["original_filename"]?.ToString() ?? string.Empty;
            if (string.IsNullOrWhiteSpace(publisher) || string.IsNullOrWhiteSpace(originalFilename)) return null;

            var publisherPath = SafeLibraryPath(publisher);
            if (publisherPath == null || !Directory.Exists(publisherPath)) return null;

            var artworkFolder = Directory.EnumerateDirectories(publisherPath)
                .FirstOrDefault(path => string.Equals(Path.GetFileName(path), folder, StringComparison.OrdinalIgnoreCase));
            if (artworkFolder == null) return null;

            var names = new[]
            {
                originalFilename + ".webp",
                Path.GetFileNameWithoutExtension(originalFilename) + ".webp",
                originalFilename + ".jpg",
                Path.GetFileNameWithoutExtension(originalFilename) + ".jpg",
            };
            var artworkFiles = Directory.EnumerateFiles(artworkFolder)
                .Where(path => string.Equals(Path.GetExtension(path), ".webp", StringComparison.OrdinalIgnoreCase)
                    || string.Equals(Path.GetExtension(path), ".jpg", StringComparison.OrdinalIgnoreCase)
                    || string.Equals(Path.GetExtension(path), ".jpeg", StringComparison.OrdinalIgnoreCase))
                .ToDictionary(Path.GetFileName, StringComparer.OrdinalIgnoreCase);
            return names
                .Select(name => artworkFiles.TryGetValue(name, out var path) ? path : null)
                .FirstOrDefault(path => path != null);
        }

        private static string ArtworkContentType(string path)
        {
            return string.Equals(Path.GetExtension(path), ".webp", StringComparison.OrdinalIgnoreCase)
                ? "image/webp"
                : "image/jpeg";
        }

        private async Task ScanAsync(long scanRunId)
        {
            var added = 0;
            var updated = 0;
            var errors = new List<string>();
            try
            {
                await Execute("UPDATE scan_run SET status = 'running' WHERE id = @id", new Dictionary<string, object> { ["@id"] = scanRunId });
                var root = configuration["LibraryRoot"];
                if (string.IsNullOrWhiteSpace(root) || !Directory.Exists(root)) throw new DirectoryNotFoundException("Library root does not exist: " + root);

                await Execute("DELETE FROM comic", new Dictionary<string, object>());
                await Execute("DELETE FROM publisher", new Dictionary<string, object>());

                foreach (var publisherDirectory in Directory.EnumerateDirectories(root))
                foreach (var file in Directory.EnumerateFiles(publisherDirectory, "*.*", SearchOption.TopDirectoryOnly))
                {
                    var extension = Path.GetExtension(file).TrimStart('.').ToLowerInvariant();
                    if (!new[] { "cbz", "zip", "cbr", "rar", "jpg" }.Contains(extension)) continue;
                    var relative = Path.GetRelativePath(root, file).Replace(Path.DirectorySeparatorChar, '/');
                    var parts = relative.Split('/', 2);
                    if (parts.Length != 2) continue;
                    var publisherName = parts[0];
                    var publisherId = await EnsurePublisherAsync(publisherName);
                    var existing = await Query("SELECT id, archive_size AS archiveSize, archive_mtime AS archiveMtime FROM comic WHERE rel_path = @path", new Dictionary<string, object> { ["@path"] = relative });
                    var info = new FileInfo(file);
                    var archiveType = extension == "cbz" || extension == "zip" ? "zip" : extension == "cbr" || extension == "rar" ? "rar" : "none";
                    var filename = Path.GetFileNameWithoutExtension(file);
                    var parsed = filenameParser.Parse(filename);
                    await Execute("INSERT INTO comic (publisher_id, rel_path, filename, original_filename, extension, number, seq_number, hero, collection, title_resolved, archive_size, archive_mtime, archive_type, is_available, scanned_at) VALUES (@publisherId, @path, @filename, @original, @extension, @number, @seqNumber, @hero, @collection, @title, @size, @mtime, @archiveType, @available, NOW()) ON DUPLICATE KEY UPDATE id = LAST_INSERT_ID(id), publisher_id = VALUES(publisher_id), filename = VALUES(filename), original_filename = VALUES(original_filename), extension = VALUES(extension), number = VALUES(number), seq_number = VALUES(seq_number), hero = VALUES(hero), collection = VALUES(collection), title_resolved = VALUES(title_resolved), archive_size = VALUES(archive_size), archive_mtime = VALUES(archive_mtime), archive_type = VALUES(archive_type), is_available = VALUES(is_available), scanned_at = NOW()", new Dictionary<string, object>
                    {
                        ["@publisherId"] = publisherId, ["@path"] = relative, ["@filename"] = filename, ["@original"] = Path.GetFileName(file), ["@extension"] = extension,
                        ["@number"] = parsed.Number ?? (object)DBNull.Value, ["@seqNumber"] = parsed.SeqNumber ?? (object)DBNull.Value, ["@hero"] = string.IsNullOrWhiteSpace(parsed.Hero) ? (object)DBNull.Value : parsed.Hero, ["@collection"] = string.IsNullOrWhiteSpace(parsed.Collection) ? (object)DBNull.Value : parsed.Collection, ["@title"] = parsed.Title, ["@size"] = info.Length, ["@mtime"] = new DateTimeOffset(info.LastWriteTimeUtc).ToUnixTimeSeconds(), ["@archiveType"] = archiveType, ["@available"] = extension != "jpg",
                    });
                    if (existing.Count == 0) added++; else updated++;
                }
                await Execute("UPDATE publisher p SET comic_count = (SELECT COUNT(*) FROM comic c WHERE c.publisher_id = p.id AND c.is_available = 1)", new Dictionary<string, object>());
                await Execute("UPDATE scan_run SET status = 'completed', finished_at = NOW(), added = @added, updated = @updated, errors_json = @errors WHERE id = @id", new Dictionary<string, object> { ["@id"] = scanRunId, ["@added"] = added, ["@updated"] = updated, ["@errors"] = JsonSerializer.Serialize(errors) });
            }
            catch (Exception error)
            {
                errors.Add(error.Message);
                await Execute("UPDATE scan_run SET status = 'failed', finished_at = NOW(), added = @added, updated = @updated, errors_json = @errors WHERE id = @id", new Dictionary<string, object> { ["@id"] = scanRunId, ["@added"] = added, ["@updated"] = updated, ["@errors"] = JsonSerializer.Serialize(errors) });
            }
        }

        private async Task<long> EnsurePublisherAsync(string name)
        {
            var slug = Regex.Replace(name.ToLowerInvariant(), "[^a-z0-9]+", "-").Trim('-');
            if (string.IsNullOrEmpty(slug)) slug = "publisher";
            await Execute("INSERT INTO publisher (name, slug, rel_path) VALUES (@name, @slug, @path) ON DUPLICATE KEY UPDATE id = LAST_INSERT_ID(id), rel_path = VALUES(rel_path)", new Dictionary<string, object> { ["@name"] = name, ["@slug"] = slug, ["@path"] = name + "/" });
            var rows = await Query("SELECT id FROM publisher WHERE name = @name", new Dictionary<string, object> { ["@name"] = name });
            return Convert.ToInt64(rows[0]["id"]);
        }

        private async Task EnsurePageIndexAsync(long comicId)
        {
            var pageIndexLock = pageIndexLocks.GetOrAdd(comicId, _ => new SemaphoreSlim(1, 1));
            await pageIndexLock.WaitAsync();
            try
            {
                await EnsurePageIndexCoreAsync(comicId);
            }
            finally
            {
                pageIndexLock.Release();
            }
        }

        private async Task EnsurePageIndexCoreAsync(long comicId)
        {
            var comics = await Query("SELECT rel_path, archive_type, is_available FROM comic WHERE id = @comicId", new Dictionary<string, object> { ["@comicId"] = comicId });
            if (comics.Count == 0 || !Convert.ToBoolean(comics[0]["is_available"])) return;
            var archiveType = comics[0]["archive_type"]?.ToString();
            if (string.Equals(archiveType, "none", StringComparison.OrdinalIgnoreCase)) return;

            var indexed = await Query("SELECT COUNT(*) AS pageCount FROM comic_page WHERE comic_id = @comicId", new Dictionary<string, object> { ["@comicId"] = comicId });
            if (Convert.ToInt64(indexed[0]["pageCount"]) > 0) return;

            var archivePath = SafeLibraryPath(comics[0]["rel_path"]?.ToString());
            if (archivePath == null || !System.IO.File.Exists(archivePath)) return;
            if (string.Equals(archiveType, "zip", StringComparison.OrdinalIgnoreCase))
                await IndexZipAsync(comicId, archivePath);
            else if (string.Equals(archiveType, "rar", StringComparison.OrdinalIgnoreCase))
                await IndexRarAsync(comicId, archivePath);
        }

        private async Task IndexZipAsync(long comicId, string archivePath)
        {
            using var archive = ZipFile.OpenRead(archivePath);
            var entries = archive.Entries.Where(entry => !string.IsNullOrEmpty(entry.Name) && Regex.IsMatch(entry.Name, "\\.(jpe?g|png|webp|gif|bmp)$", RegexOptions.IgnoreCase)).OrderBy(entry => entry.FullName, StringComparer.OrdinalIgnoreCase).ToList();
            await Execute("DELETE FROM comic_page WHERE comic_id = @comicId", new Dictionary<string, object> { ["@comicId"] = comicId });
            for (var index = 0; index < entries.Count; index++)
                await Execute("INSERT INTO comic_page (comic_id, idx, entry_raw, entry_name, uncompressed_size) VALUES (@comicId, @idx, @raw, @name, @size)", new Dictionary<string, object> { ["@comicId"] = comicId, ["@idx"] = index, ["@raw"] = Encoding.UTF8.GetBytes(entries[index].FullName), ["@name"] = entries[index].FullName, ["@size"] = entries[index].Length });
            await Execute("UPDATE comic SET page_count = @count, indexed_at = NOW() WHERE id = @comicId", new Dictionary<string, object> { ["@comicId"] = comicId, ["@count"] = entries.Count });
        }

        private async Task IndexRarAsync(long comicId, string archivePath)
        {
            var output = await RunSevenZipAsync("l", "-slt", archivePath);
            var entries = output.StandardOutput
                .Split(new[] { "\r\n", "\n" }, StringSplitOptions.None)
                .Where(line => line.StartsWith("Path = ", StringComparison.Ordinal))
                .Select(line => line[7..].Trim())
                .Where(name => !string.IsNullOrWhiteSpace(name) && Regex.IsMatch(name, "\\.(jpe?g|png|webp|gif|bmp)$", RegexOptions.IgnoreCase))
                .OrderBy(name => name, StringComparer.OrdinalIgnoreCase)
                .ToList();
            await Execute("DELETE FROM comic_page WHERE comic_id = @comicId", new Dictionary<string, object> { ["@comicId"] = comicId });
            for (var index = 0; index < entries.Count; index++)
                await Execute("INSERT INTO comic_page (comic_id, idx, entry_raw, entry_name) VALUES (@comicId, @idx, @raw, @name)", new Dictionary<string, object> { ["@comicId"] = comicId, ["@idx"] = index, ["@raw"] = Encoding.UTF8.GetBytes(entries[index]), ["@name"] = entries[index] });
            await Execute("UPDATE comic SET page_count = @count, indexed_at = NOW() WHERE id = @comicId", new Dictionary<string, object> { ["@comicId"] = comicId, ["@count"] = entries.Count });
        }

        private async Task<byte[]> ExtractSevenZipEntryAsync(string archivePath, string entryName)
        {
            var output = await RunSevenZipAsync("e", "-so", archivePath, entryName);
            return output.BinaryOutput;
        }

        private async Task<(string StandardOutput, byte[] BinaryOutput)> RunSevenZipAsync(params string[] arguments)
        {
            var binary = configuration["SevenZipBinary"];
            if (string.IsNullOrWhiteSpace(binary) || !System.IO.File.Exists(binary))
                throw new InvalidOperationException("SevenZipBinary is not configured or does not exist: " + binary);

            var startInfo = new ProcessStartInfo(binary)
            {
                CreateNoWindow = true,
                RedirectStandardError = true,
                RedirectStandardOutput = true,
                UseShellExecute = false,
            };
            foreach (var argument in arguments) startInfo.ArgumentList.Add(argument);
            using var process = Process.Start(startInfo) ?? throw new InvalidOperationException("Unable to start 7-Zip");
            using var output = new MemoryStream();
            var errorTask = process.StandardError.ReadToEndAsync();
            await process.StandardOutput.BaseStream.CopyToAsync(output);
            var error = await errorTask;
            await process.WaitForExitAsync();
            if (process.ExitCode != 0) throw new InvalidOperationException($"7-Zip failed ({process.ExitCode}): {error.Trim()}");
            var bytes = output.ToArray();
            return (Encoding.UTF8.GetString(bytes), bytes);
        }

        private static object ComicDto(Dictionary<string, object> row)
        {
            var available = Convert.ToBoolean(row["is_available"]);
            var id = Convert.ToInt64(row["id"]);
            var originalFilename = row["original_filename"]?.ToString() ?? string.Empty;
            var parsedFallback = filenameParser.Parse(Path.GetFileNameWithoutExtension(originalFilename));
            var title = row["title_resolved"] == null || row["title_resolved"] == DBNull.Value
                || string.IsNullOrWhiteSpace(row["title_resolved"].ToString())
                ? FilenameParser.NormalizeTitles(parsedFallback.Title)
                : FilenameParser.NormalizeTitles(row["title_resolved"].ToString());
            var hero = row["hero"] == null || row["hero"] == DBNull.Value || string.IsNullOrWhiteSpace(row["hero"].ToString())
                ? parsedFallback.Hero
                : row["hero"].ToString();
            var collection = row["collection"] == null || row["collection"] == DBNull.Value
                ? parsedFallback.Collection ?? string.Empty
                : row["collection"].ToString();
            var publisher = row["publisher"]?.ToString() ?? string.Empty;
            return new
            {
                id,
                filename = row["filename"],
                originalFilename = row["original_filename"],
                extension = row["extension"],
                path = row["rel_path"],
                publisher,
                missing = !available,
                comicMissing = !available,
                number = row["number"] == null || row["number"] == DBNull.Value ? (int?)null : Convert.ToInt32(row["number"]),
                seqNumber = row["seq_number"] == null || row["seq_number"] == DBNull.Value ? (int?)null : Convert.ToInt32(row["seq_number"]),
                numberResolved = BuildNumberResolved(row),
                titles = title.Split(" / ", StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries),
                titlesResolved = title,
                heroes = ParseHeroes(hero),
                heroesResolved = hero,
                collection,
                thumbnailPath = "/api/artwork/thumbnail?path=" + Uri.EscapeDataString(row["rel_path"]?.ToString() ?? string.Empty),
                coverPath = "/api/artwork/cover?path=" + Uri.EscapeDataString(row["rel_path"]?.ToString() ?? string.Empty),
                currentBackgroundImage = "assets/preset-light.png",
                backgroundImageUrl = "url(\"assets/preset-light.png\")",
                @class = "thumb",
                loaded = false,
                fakeEntry = false,
                publisherResolved = publisher,
            };
        }

        private static string BuildNumberResolved(Dictionary<string, object> row)
        {
            var number = row["number"] == null || row["number"] == DBNull.Value ? string.Empty : row["number"].ToString();
            var sequence = row["seq_number"] == null || row["seq_number"] == DBNull.Value ? string.Empty : row["seq_number"].ToString();
            return string.IsNullOrEmpty(sequence) ? number : string.IsNullOrEmpty(number) ? sequence : number + "-" + sequence;
        }

        private static object[] ParseHeroes(string heroes)
        {
            return (heroes ?? string.Empty)
                .Split(',', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries)
                .Select(name => (object)new { name, imagePath = HeroImagePath(name) })
                .ToArray();
        }

        private static string HeroImagePath(string name)
        {
            var slug = name.ToLowerInvariant().Replace(' ', '-');
            var supported = new HashSet<string>(StringComparer.OrdinalIgnoreCase)
            {
                "zagor", "dilan-dog", "dampir", "mister-no", "marti-misterija", "teks-viler",
                "brad-barron", "tim-i-dasti", "kit-teler", "veliki-blek", "ken-parker",
                "kapetan-miki", "komandant-mark",
            };

            return supported.Contains(slug) ? $"url(\"assets/{slug}.png\")" : string.Empty;
        }
    }
}
