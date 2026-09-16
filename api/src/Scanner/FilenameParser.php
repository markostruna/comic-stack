<?php

namespace Comic\Api\Scanner;

final class FilenameParser
{
    private const PATTERNS = [
        ['number', 'hero', 'collection', 'seqNumber', 'title'],
        ['number', 'hero', 'title', 'hero2', 'title2'],
        ['number', 'hero', 'collection', 'seqNumber'],
        ['number', 'hero', 'seqNumber', 'title'],
        ['hero', 'collection', 'seqNumber', 'title'],
        ['number', 'hero', 'title'],
        ['hero', 'collection', 'seqNumber'],
        ['hero', 'seqNumber', 'title'],
    ];

    public function parse(string $filename): array
    {
        foreach (self::PATTERNS as $fields) {
            $expression = '/^' . implode(' - ', array_map(
                static fn (string $field): string => in_array($field, ['number', 'seqNumber'], true) ? '([1-9,0]+)' : '(.*)',
                $fields
            )) . '$/u';
            if (!preg_match($expression, $filename, $matches)) continue;

            $result = ['number' => null, 'title' => $filename, 'heroes' => [], 'collection' => null, 'seqNumber' => null];
            foreach ($fields as $index => $field) {
                $value = $matches[$index + 1] ?? '';
                if ($field === 'title' || $field === 'title2') {
                    $result['title'] = $result['title'] === $filename ? $value : $result['title'] . ' / ' . $value;
                } elseif ($field === 'hero' || $field === 'hero2') {
                    $result['heroes'][] = $value;
                } elseif ($field === 'number' || $field === 'seqNumber') {
                    $result[$field] = (int) str_replace(',', '', $value);
                } else {
                    $result[$field] = $value;
                }
            }
            return $result;
        }

        return ['number' => null, 'title' => $filename, 'heroes' => [], 'collection' => null, 'seqNumber' => null];
    }
}
