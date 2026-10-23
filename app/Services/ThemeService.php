<?php

namespace App\Services;

use App\Models\Setting;

class ThemeService
{
    public const STATUS_TYPES = ['success', 'error', 'warn', 'info'];

    public const DEFAULTS = [
        'success' => [
            '50' => '#E9FBF2', '100' => '#D4F7E4', '200' => '#A8F0C9', '300' => '#7DE8AF',
            '400' => '#52E094', '500' => '#20B364', '600' => '#1FAD61', '700' => '#178249',
            '800' => '#0F5730', '900' => '#082B18', '950' => '#04160C',
        ],
        'error' => [
            '50' => '#FBEAEA', '100' => '#F7D4D5', '200' => '#EEAAAA', '300' => '#E67F80',
            '400' => '#DD5556', '500' => '#D63031', '600' => '#AA2223', '700' => '#80191A',
            '800' => '#551111', '900' => '#2B0809', '950' => '#150404',
        ],
        'warn' => [
            '50' => '#FEF5E6', '100' => '#FDECD3', '200' => '#FCD7A1', '300' => '#FAC475',
            '400' => '#F9B149', '500' => '#F79E1B', '600' => '#D48107', '700' => '#9E6006',
            '800' => '#673F04', '900' => '#362102', '950' => '#190F01',
        ],
        'info' => [
            '50' => '#E7F4FE', '100' => '#CFE8FC', '200' => '#9ED1FA', '300' => '#6EBAF7',
            '400' => '#3DA3F5', '500' => '#2196F3', '600' => '#0A70C2', '700' => '#085491',
            '800' => '#053861', '900' => '#031C30', '950' => '#010E18',
        ],
    ];

    public const DEFAULT_LIGHT_SEED_PRIMARY = '#FF9900';
    // Neutral drives text, borders and surfaces; white produced an all-white palette (invisible
    // borders). #9E9E9E is the lightest seed the Theme Settings save check accepts.
    public const DEFAULT_LIGHT_SEED_NEUTRAL = '#9E9E9E';

    /**
     * Generate an 11-stop (50-950) color palette from a single hex seed.
     * The seed is always placed exactly at stop 500.
     */
    public function generatePalette(string $hex): array
    {
        $hex = trim(ltrim($hex, '#'));
        if (strlen($hex) === 3) {
            $hex = $hex[0] . $hex[0] . $hex[1] . $hex[1] . $hex[2] . $hex[2];
        }

        $r = hexdec(substr($hex, 0, 2)) / 255;
        $g = hexdec(substr($hex, 2, 2)) / 255;
        $b = hexdec(substr($hex, 4, 2)) / 255;

        $max = max($r, $g, $b);
        $min = min($r, $g, $b);
        $d = $max - $min;
        $h = 0;
        $s = 0;
        $l = ($max + $min) / 2;

        $denom = 1 - abs(2 * $l - 1);
        if ($d != 0.0 && $denom != 0.0) {
            $s = $d / $denom;
            if ($max === $r) {
                $h = ($g - $b) / $d;
            } elseif ($max === $g) {
                $h = ($b - $r) / $d + 2;
            } else {
                $h = ($r - $g) / $d + 4;
            }
            $h = ($h < 0 ? $h + 6 : $h) * 60;
        }

        $stops = [
            '50' => 0.95, '100' => 0.90, '200' => 0.80,
            '300' => 0.70, '400' => 0.60, '500' => 0.50,
            '600' => 0.40, '700' => 0.30, '800' => 0.20,
            '900' => 0.10, '950' => 0.05,
        ];

        $palette = [];
        foreach ($stops as $stop => $lightness) {
            if ((string) $stop === '500') {
                $palette[$stop] = '#'
                    . str_pad(dechex((int) round($r * 255)), 2, '0', STR_PAD_LEFT)
                    . str_pad(dechex((int) round($g * 255)), 2, '0', STR_PAD_LEFT)
                    . str_pad(dechex((int) round($b * 255)), 2, '0', STR_PAD_LEFT);
                continue;
            }

            $c = (1 - abs(2 * $lightness - 1)) * $s;
            $x = $c * (1 - abs(fmod($h / 60, 2) - 1));
            $m = $lightness - $c / 2;

            [$r1, $g1, $b1] = [0, 0, 0];
            if ($h < 60) {
                $r1 = $c;
                $g1 = $x;
            } elseif ($h < 120) {
                $r1 = $x;
                $g1 = $c;
            } elseif ($h < 180) {
                $g1 = $c;
                $b1 = $x;
            } elseif ($h < 240) {
                $g1 = $x;
                $b1 = $c;
            } elseif ($h < 300) {
                $r1 = $x;
                $b1 = $c;
            } else {
                $r1 = $c;
                $b1 = $x;
            }

            $isExtremeStop = in_array($stop, [50, '50', 950, '950'], true);
            $toHex = function ($v) use ($m, $isExtremeStop) {
                $rounded = $isExtremeStop
                    ? floor(($v + $m) * 255 + 0.49999)
                    : round(($v + $m) * 255);
                return str_pad(dechex((int) max(0, min(255, $rounded))), 2, '0', STR_PAD_LEFT);
            };
            $palette[$stop] = '#' . $toHex($r1) . $toHex($g1) . $toHex($b1);
        }

        return $palette;
    }

    private const NEUTRAL_CURVE_SOFT = [
        ['x' => 0, 'y' => 0], ['x' => 0.25, 'y' => 0.15], ['x' => 0.5, 'y' => 0.5],
        ['x' => 0.75, 'y' => 0.85], ['x' => 1, 'y' => 1],
    ];

    private const NEUTRAL_STOPS = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'];

    /**
     * Generate an 11-stop (50-950) neutral palette via a Catmull-Rom "soft" curve
     * lerping dark anchor (black) -> seed -> light anchor (white). Seed stays exact at 500.
     */
    public function generateNeutralPalette(string $hex): array
    {
        $seed = $this->hexToRgb($hex);
        $dark = [0, 0, 0];
        $light = [255, 255, 255];

        $palette = [];
        foreach (self::NEUTRAL_STOPS as $index => $stop) {
            $t = 1 - $index / 10;
            $y = $this->catmullRomEval(self::NEUTRAL_CURVE_SOFT, $t);
            $rgb = $y <= 0.5
                ? $this->lerpRgb($dark, $seed, 2 * $y)
                : $this->lerpRgb($seed, $light, ($y - 0.5) * 2);
            $palette[$stop] = $this->rgbToHex($rgb);
        }

        return $palette;
    }

    private function hexToRgb(string $hex): array
    {
        $hex = trim(ltrim($hex, '#'));
        if (strlen($hex) === 3) {
            $hex = $hex[0] . $hex[0] . $hex[1] . $hex[1] . $hex[2] . $hex[2];
        }
        return [hexdec(substr($hex, 0, 2)), hexdec(substr($hex, 2, 2)), hexdec(substr($hex, 4, 2))];
    }

    private function rgbToHex(array $rgb): string
    {
        $toHex = fn ($v) => str_pad(dechex((int) max(0, min(255, round($v)))), 2, '0', STR_PAD_LEFT);
        return '#' . $toHex($rgb[0]) . $toHex($rgb[1]) . $toHex($rgb[2]);
    }

    private function lerpRgb(array $c1, array $c2, float $r): array
    {
        return [
            $c1[0] + ($c2[0] - $c1[0]) * $r,
            $c1[1] + ($c2[1] - $c1[1]) * $r,
            $c1[2] + ($c2[2] - $c1[2]) * $r,
        ];
    }

    private function catmullRomEval(array $points, float $t): float
    {
        $n = count($points);
        $seg = 0;
        for ($i = 0; $i < $n - 1; $i++) {
            if ($t >= $points[$i]['x'] && $t <= $points[$i + 1]['x']) {
                $seg = $i;
                break;
            }
        }
        $p0 = $points[max(0, $seg - 1)];
        $p1 = $points[$seg];
        $p2 = $points[min($n - 1, $seg + 1)];
        $p3 = $points[min($n - 1, $seg + 2)];

        $span = $p2['x'] - $p1['x'];
        $d = $span < 1e-9 ? 0 : min(1, max(0, ($t - $p1['x']) / $span));
        $d2 = $d * $d;

        $y = 0.5 * (
            2 * $p1['y']
            + (-$p0['y'] + $p2['y']) * $d
            + (2 * $p0['y'] - 5 * $p1['y'] + 4 * $p2['y'] - $p3['y']) * $d2
            + (-$p0['y'] + 3 * $p1['y'] - 3 * $p2['y'] + $p3['y']) * ($d2 * $d)
        );

        return min(1, max(0, $y));
    }

    /**
     * Module 1 (Grocery) keeps the original, unsuffixed variable names so every pre-existing
     * install's theme keeps working with zero migration. Every other module gets its own
     * namespaced row ("{key}_m{moduleId}") so each module can carry an independent primary/
     * neutral palette. Status colors (success/error/warn/info) are shared across every module -
     * they always resolve to the unscoped key regardless of which module is passed in, and are
     * only ever edited from the default module's Theme Settings page (UI-gated).
     */
    private function scopedKey(string $key, int $moduleId): string
    {
        if ($this->isStatusKey($key)) {
            return $key;
        }

        return $moduleId === 1 ? $key : "{$key}_m{$moduleId}";
    }

    private function isStatusKey(string $key): bool
    {
        foreach (self::STATUS_TYPES as $type) {
            if ($key === "{$type}_seed" || $key === "{$type}_palette") {
                return true;
            }
        }

        return false;
    }

    /**
     * Fetch all theme-related settings for the given module from the key/value settings table.
     * Returned array keys are always the unscoped names, regardless of module.
     */
    public function getSettingsMap(int $moduleId = 1): array
    {
        $keys = [
            'light_seed_primary', 'light_seed_neutral',
            'light_primary_palette', 'light_neutral_palette',
            'theme_updated_at',
        ];
        foreach (self::STATUS_TYPES as $type) {
            $keys[] = "{$type}_seed";
            $keys[] = "{$type}_palette";
        }

        $scopedToUnscoped = [];
        foreach ($keys as $key) {
            $scopedToUnscoped[$this->scopedKey($key, $moduleId)] = $key;
        }

        $rows = Setting::whereIn('variable', array_keys($scopedToUnscoped))->pluck('value', 'variable');

        $map = [];
        foreach ($rows as $scopedKey => $value) {
            $map[$scopedToUnscoped[$scopedKey]] = $value;
        }

        return $map;
    }

    /**
     * Whether the module has saved its own primary / neutral colors (Theme Settings > Save).
     */
    public function hasOwnColors(int $moduleId): bool
    {
        $map = $this->getSettingsMap($moduleId);
        return !empty($map['light_seed_primary']) || !empty($map['light_primary_palette']);
    }

    private function decodedPalette(array $map, string $key): ?array
    {
        if (empty($map[$key])) {
            return null;
        }
        $decoded = json_decode($map[$key], true);
        return is_array($decoded) ? $decoded : null;
    }

    /**
     * Build the full API theme payload from the current settings for the given module.
     */
    public function buildThemePayload(int $moduleId = 1, bool $includeStatus = true): array
    {
        $map = $this->getSettingsMap($moduleId);

        $lightSeedPrimary = $map['light_seed_primary'] ?? self::DEFAULT_LIGHT_SEED_PRIMARY;
        $lightSeedNeutral = $map['light_seed_neutral'] ?? self::DEFAULT_LIGHT_SEED_NEUTRAL;

        $payload = [
            'timestamp' => $map['theme_updated_at'] ?? now()->toIso8601String(),
            'seed_primary' => $lightSeedPrimary,
            'seed_neutral' => $lightSeedNeutral,
            'primary' => $this->decodedPalette($map, 'light_primary_palette') ?? $this->generatePalette($lightSeedPrimary),
            'neutral' => $this->decodedPalette($map, 'light_neutral_palette') ?? $this->generateNeutralPalette($lightSeedNeutral),
        ];

        if ($includeStatus) {
            foreach (self::STATUS_TYPES as $type) {
                $payload[$type] = $this->decodedPalette($map, "{$type}_palette") ?? self::DEFAULTS[$type];
            }
        }

        return $payload;
    }

    /**
     * Persist a setting value, creating the row if it does not exist yet.
     */
    public function putSetting(string $key, string $value, int $moduleId = 1): void
    {
        $scopedKey = $this->scopedKey($key, $moduleId);
        $setting = Setting::where('variable', $scopedKey)->first() ?? new Setting();
        $setting->variable = $scopedKey;
        $setting->value = $value;
        $setting->save();
    }

    public function deleteSetting(string $key, int $moduleId = 1): void
    {
        Setting::where('variable', $this->scopedKey($key, $moduleId))->delete();
    }

    public function touchThemeUpdatedAt(int $moduleId = 1): void
    {
        $this->putSetting('theme_updated_at', now()->toIso8601String(), $moduleId);
    }

    /*
     * Admin panel colours (one global setting, the same for every module):
     *   admin_use_module_theme = 1 -> the admin panel follows each module's theme colours (default)
     *   admin_use_module_theme = 0 -> the admin panel uses its own primary / neutral palette below
     * Stored as plain (unsuffixed) keys; module 1's keys are unsuffixed, so module id 1 = global.
     */
    private const ADMIN_KEYS = ['admin_use_module_theme', 'admin_seed_primary', 'admin_seed_neutral', 'admin_primary_palette', 'admin_neutral_palette'];

    public function getAdminPanelTheme(): array
    {
        $map = Setting::whereIn('variable', self::ADMIN_KEYS)->pluck('value', 'variable')->toArray();

        $usesModuleTheme = !isset($map['admin_use_module_theme']) || (string) $map['admin_use_module_theme'] !== '0';
        $seedPrimary = $map['admin_seed_primary'] ?? self::DEFAULT_LIGHT_SEED_PRIMARY;
        $seedNeutral = $map['admin_seed_neutral'] ?? self::DEFAULT_LIGHT_SEED_NEUTRAL;

        return [
            'use_module_theme' => $usesModuleTheme,
            'seed_primary' => $seedPrimary,
            'seed_neutral' => $seedNeutral,
            'primary' => $this->decodedPalette($map, 'admin_primary_palette') ?? $this->generatePalette($seedPrimary),
            'neutral' => $this->decodedPalette($map, 'admin_neutral_palette') ?? $this->generateNeutralPalette($seedNeutral),
        ];
    }

    public function saveAdminPanelTheme(bool $useModuleTheme, ?string $seedPrimary = null, ?string $seedNeutral = null): array
    {
        $this->putSetting('admin_use_module_theme', $useModuleTheme ? '1' : '0', 1);

        if (!$useModuleTheme && $seedPrimary && $seedNeutral) {
            $this->putSetting('admin_seed_primary', $seedPrimary, 1);
            $this->putSetting('admin_seed_neutral', $seedNeutral, 1);
            $this->putSetting('admin_primary_palette', json_encode($this->generatePalette($seedPrimary)), 1);
            $this->putSetting('admin_neutral_palette', json_encode($this->generateNeutralPalette($seedNeutral)), 1);
        }

        return $this->getAdminPanelTheme();
    }
}
