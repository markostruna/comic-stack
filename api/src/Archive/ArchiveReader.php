<?php

declare(strict_types=1);

namespace Comic\Api\Archive;

use RuntimeException;

final class ArchiveReader
{
    public function __construct(
        private readonly string $binary,
        private readonly ProcessRunner $runner = new ProcessRunner(),
    )
    {
        if (!is_file($this->binary) || !is_executable($this->binary)) {
            throw new RuntimeException('7-Zip binary is not configured or executable.');
        }
    }

    /** @return array{entries: list<array{entry: string, entryName: string, width: int|null, height: int|null, size: int|null}>, solid: bool} */
    public function listImages(string $archivePath): array
    {
        $result = $this->runner->run([$this->binary, 'l', '-ba', '-slt', '-sccUTF-8', '--', $archivePath]);
        $entries = [];
        $current = [];
        $solid = false;
        foreach (preg_split('/\r?\n/', $result['stdout']) as $line) {
            if ($line === '' && $current !== []) {
                $this->addImageEntry($entries, $current);
                $current = [];
                continue;
            }
            if (str_starts_with($line, 'Path = ')) $current['entry'] = substr($line, 7);
            elseif (str_starts_with($line, 'Size = ')) $current['size'] = (int) substr($line, 7);
            elseif (str_starts_with($line, 'Attributes = ')) $current['file'] = !str_contains(substr($line, 13), 'D');
            elseif (str_starts_with($line, 'Solid = ')) $solid = trim(substr($line, 8)) === '+';
        }
        if ($current !== []) $this->addImageEntry($entries, $current);
        usort($entries, static fn (array $left, array $right): int => strnatcasecmp($left['entryName'], $right['entryName']));
        return ['entries' => array_values(array_map(static fn (array $entry, int $index): array => [...$entry, 'idx' => $index], $entries, array_keys($entries))), 'solid' => $solid];
    }

    public function extract(string $archivePath, string $entryName): string
    {
        return $this->runner->run([$this->binary, 'e', '-so', '-y', '-bso0', '-bsp0', '-spd', '--', $archivePath, $entryName])['stdout'];
    }

    /** @param list<array<string, mixed>> $entries */
    private function addImageEntry(array &$entries, array $entry): void
    {
        $name = (string) ($entry['entry'] ?? '');
        if (($entry['file'] ?? false) !== true || !preg_match('/\.(avif|bmp|gif|jpe?g|png|webp)$/i', $name)) return;
        $entries[] = [
            'entry' => $name,
            'entryName' => $name,
            'width' => null,
            'height' => null,
            'size' => $entry['size'] ?? null,
        ];
    }
}
