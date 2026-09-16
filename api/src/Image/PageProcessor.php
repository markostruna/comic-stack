<?php

namespace Comic\Api\Image;

final class PageProcessor
{
    public function process(string $bytes, string $variant = 'page'): string
    {
        if ($variant === 'raw') return $bytes;
        if (!function_exists('imagecreatefromstring')) throw new \RuntimeException('GD is required for processed pages');

        $dimensions = @getimagesizefromstring($bytes);
        if (!$dimensions || $dimensions[0] * $dimensions[1] > 60000000) throw new \RuntimeException('Image is too large');
        $source = @imagecreatefromstring($bytes);
        if (!$source) throw new \RuntimeException('Page image could not be decoded');
        $width = imagesx($source);
        $height = imagesy($source);
        $bounds = $this->contentBounds($source, $width, $height);
        $canvasWidth = $variant === 'thumb' ? 320 : 1000;
        $canvasHeight = max(1, (int) round($canvasWidth / ($bounds['width'] / $bounds['height'])));
        $canvas = imagecreatetruecolor($canvasWidth, $canvasHeight);
        $white = imagecolorallocate($canvas, 255, 255, 255);
        imagefill($canvas, 0, 0, $white);
        $scale = min($canvasWidth / $bounds['width'], $canvasHeight / $bounds['height']);
        $targetWidth = (int) round($bounds['width'] * $scale);
        $targetHeight = (int) round($bounds['height'] * $scale);
        imagecopyresampled($canvas, $source, (int) (($canvasWidth - $targetWidth) / 2), (int) (($canvasHeight - $targetHeight) / 2), $bounds['x'], $bounds['y'], $targetWidth, $targetHeight, $bounds['width'], $bounds['height']);
        ob_start();
        imagewebp($canvas, null, 82);
        $result = ob_get_clean();
        imagedestroy($source);
        imagedestroy($canvas);
        if (!is_string($result)) throw new \RuntimeException('Page image could not be encoded');
        return $result;
    }

    private function contentBounds(\GdImage $image, int $width, int $height): array
    {
        $scanWidth = min(800, $width);
        $scanHeight = max(1, (int) round($height / $width * $scanWidth));
        $scan = imagecreatetruecolor($scanWidth, $scanHeight);
        imagecopyresampled($scan, $image, 0, 0, 0, 0, $scanWidth, $scanHeight, $width, $height);
        $left = $scanWidth; $top = $scanHeight; $right = -1; $bottom = -1;
        for ($y = 0; $y < $scanHeight; $y++) for ($x = 0; $x < $scanWidth; $x++) {
            $rgb = imagecolorat($scan, $x, $y);
            if (($rgb & 0xff) < 245 || (($rgb >> 8) & 0xff) < 245 || (($rgb >> 16) & 0xff) < 245) {
                $left = min($left, $x); $top = min($top, $y); $right = max($right, $x); $bottom = max($bottom, $y);
            }
        }
        imagedestroy($scan);
        if ($right < $left || $bottom < $top) return ['x' => 0, 'y' => 0, 'width' => $width, 'height' => $height];
        return ['x' => (int) ($left * $width / $scanWidth), 'y' => (int) ($top * $height / $scanHeight), 'width' => max(1, (int) (($right - $left + 1) * $width / $scanWidth)), 'height' => max(1, (int) (($bottom - $top + 1) * $height / $scanHeight))];
    }
}
