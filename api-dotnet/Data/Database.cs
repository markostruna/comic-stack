using MySqlConnector;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;

namespace api_dotnet.Data
{
    public sealed class Database
    {
        private readonly string connectionString;

        public Database(IConfiguration configuration)
        {
            connectionString = configuration.GetConnectionString("ComicStack")
                ?? configuration["Database:ConnectionString"]
                ?? throw new InvalidOperationException("Database connection string is missing.");
        }

        public MySqlConnection CreateConnection() => new MySqlConnection(connectionString);

        public static async Task<List<Dictionary<string, object>>> ReadRowsAsync(MySqlCommand command)
        {
            var rows = new List<Dictionary<string, object>>();
            await using var reader = await command.ExecuteReaderAsync();
            while (await reader.ReadAsync())
            {
                var row = new Dictionary<string, object>(StringComparer.OrdinalIgnoreCase);
                for (var index = 0; index < reader.FieldCount; index++)
                    row[reader.GetName(index)] = await reader.IsDBNullAsync(index) ? null : reader.GetValue(index);
                rows.Add(row);
            }
            return rows;
        }
    }
}
