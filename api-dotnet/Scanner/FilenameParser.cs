using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text.RegularExpressions;

namespace api_dotnet.Scanner
{
    public sealed class ParsedFilename
    {
        public int? Number { get; init; }
        public int? SeqNumber { get; init; }
        public string Hero { get; init; } = string.Empty;
        public string Collection { get; init; }
        public string Title { get; init; } = string.Empty;
    }

    public sealed class FilenameParser
    {
        private static readonly string[][] Patterns =
        {
            new[] { "number", "hero", "collection", "seqNumber", "title" },
            new[] { "number", "hero", "title", "hero2", "title2" },
            new[] { "number", "hero", "collection", "seqNumber" },
            new[] { "number", "hero", "seqNumber", "title" },
            new[] { "hero", "collection", "seqNumber", "title" },
            new[] { "number", "hero", "title" },
            new[] { "hero", "collection", "seqNumber" },
            new[] { "hero", "seqNumber", "title" },
        };

        public ParsedFilename Parse(string filename)
        {
            var parts = filename.Split(" - ", StringSplitOptions.None);
            if (TryParseParts(parts, filename, out var parsed))
            {
                return parsed;
            }

            foreach (var fields in Patterns)
            {
                var expression = string.Join(" - ", fields.Select(field =>
                    field is "number" or "seqNumber" ? "([1-9,0]+)" : "(.*)"));
                var match = Regex.Match(filename, expression, RegexOptions.CultureInvariant);
                if (!match.Success) continue;

                var number = (int?)null;
                var seqNumber = (int?)null;
                var heroes = new List<string>();
                var collection = (string)null;
                var title = filename;

                for (var index = 0; index < fields.Length; index++)
                {
                    var value = match.Groups[index + 1].Value;
                    switch (fields[index])
                    {
                        case "title":
                        case "title2":
                            title = title == filename ? value : title + " / " + value;
                            break;
                        case "hero":
                        case "hero2":
                            heroes.Add(value);
                            break;
                        case "number":
                            number = ParseNumber(value);
                            break;
                        case "seqNumber":
                            seqNumber = ParseNumber(value);
                            break;
                        case "collection":
                            collection = value;
                            break;
                    }
                }

                return new ParsedFilename
                {
                    Number = number,
                    SeqNumber = seqNumber,
                    Hero = string.Join(", ", heroes.Where(hero => !string.IsNullOrWhiteSpace(hero))),
                    Collection = collection,
                    Title = NormalizeTitles(title),
                };
            }

            return new ParsedFilename { Title = NormalizeTitles(filename) };
        }

        private static bool TryParseParts(string[] parts, string filename, out ParsedFilename parsed)
        {
            parsed = null;
            if (parts.Length < 3 || parts.Length > 5) return false;

            foreach (var fields in Patterns.Where(pattern => pattern.Length == parts.Length))
            {
                int? number = null;
                int? seqNumber = null;
                string collection = null;
                var titles = new List<string>();
                var heroes = new List<string>();
                var valid = true;

                for (var index = 0; index < fields.Length; index++)
                {
                    var value = parts[index];
                    if (string.IsNullOrEmpty(value))
                    {
                        valid = false;
                        break;
                    }

                    switch (fields[index])
                    {
                        case "number":
                            if (!Regex.IsMatch(value, "^\\d+$")) valid = false;
                            else number = ParseNumber(value);
                            break;
                        case "seqNumber":
                            if (!Regex.IsMatch(value, "^\\d+$")) valid = false;
                            else seqNumber = ParseNumber(value);
                            break;
                        case "collection":
                            collection = value;
                            break;
                        case "title":
                        case "title2":
                            titles.Add(value);
                            break;
                        case "hero":
                        case "hero2":
                            heroes.Add(value);
                            break;
                        default:
                            valid = false;
                            break;
                    }

                    if (!valid) break;
                }

                if (!valid) continue;

                parsed = new ParsedFilename
                {
                    Number = number,
                    SeqNumber = seqNumber,
                    Hero = string.Join(", ", heroes),
                    Collection = collection,
                    Title = NormalizeTitles(string.Join(" / ", titles)),
                };
                return true;
            }

            return false;
        }

        private static int? ParseNumber(string value)
        {
            return int.TryParse(value.Replace(",", string.Empty), NumberStyles.Integer, CultureInfo.InvariantCulture, out var number)
                ? number
                : null;
        }

        public static string NormalizeTitles(string value)
        {
            return string.Join(" / ", (value ?? string.Empty)
                .Split(';', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries)
                .Where(title => !string.IsNullOrWhiteSpace(title)));
        }
    }
}
