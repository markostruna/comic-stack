namespace api_dotnet.Models
{
    public sealed class LoginRequest
    {
        public string Username { get; set; }
        public string Password { get; set; }
    }

    public sealed class RefreshRequest
    {
        public string RefreshToken { get; set; }
    }

    public sealed class ProgressRequest
    {
        public int PageIndex { get; set; }
        public int TotalPages { get; set; }
    }

    public sealed class BookmarkRequest
    {
        public long ComicId { get; set; }
        public int PageIndex { get; set; }
        public string Note { get; set; }
    }

    public sealed class ComicFilter
    {
        public string Title { get; set; }
        public string Hero { get; set; }
        public string Publisher { get; set; }
        public string Collection { get; set; }
        public string Availability { get; set; } = "All";
        public int Page { get; set; } = 1;
        public int PageSize { get; set; } = 50;
        public string Sort { get; set; } = "title";
    }
}
