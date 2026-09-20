using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace api_dotnet.Security
{
    public sealed class JwtTokenService
    {
        private readonly string secret;
        private readonly int lifetimeMinutes;

        public JwtTokenService(Microsoft.Extensions.Configuration.IConfiguration configuration)
        {
            secret = configuration["Jwt:Secret"] ?? throw new InvalidOperationException("Jwt:Secret is missing.");
            lifetimeMinutes = int.TryParse(configuration["Jwt:LifetimeMinutes"], out var minutes) ? minutes : 60;
            if (Encoding.UTF8.GetByteCount(secret) < 32) throw new InvalidOperationException("Jwt:Secret must be at least 32 bytes.");
        }

        public string Issue(long userId, string username, string role)
        {
            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, userId.ToString()),
                new Claim(JwtRegisteredClaimNames.UniqueName, username),
                new Claim(ClaimTypes.Name, username),
                new Claim(ClaimTypes.Role, role),
            };
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secret));
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var token = new JwtSecurityToken(claims: claims, expires: DateTime.UtcNow.AddMinutes(lifetimeMinutes), signingCredentials: credentials);
            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        public TokenValidationParameters ValidationParameters => new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secret)),
            ValidateIssuer = false,
            ValidateAudience = false,
            ValidateLifetime = true,
            ClockSkew = TimeSpan.FromSeconds(30),
        };
    }
}
