<template>
    <div>
        <div class="page-heading">
            <div class="page-title">
                <div class="row">
                    <div class="col-12 col-md-6 order-md-1 order-last">
                        <h3>{{ __('theme_settings') }}</h3>
                    </div>
                    <div class="col-12 col-md-6 order-md-2 order-first">
                        <nav aria-label="breadcrumb" class="breadcrumb-header float-start float-lg-end">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><router-link to="/dashboard">{{ __('dashboard') }}</router-link></li>
                                <li class="breadcrumb-item"><router-link to="/system_settings">{{ __('settings') }}</router-link></li>
                                <li class="breadcrumb-item active" aria-current="page">{{ __('theme_settings') }}</li>
                            </ol>
                        </nav>
                    </div>
                </div>
            </div>
            <section class="section theme-settings-section">
                <!-- Admin panel colours: one global choice for every module -->
                <form @submit.prevent="saveAdminTheme">
                    <div class="card theme-card mb-4">
                        <div class="card-body">
                            <div class="d-flex flex-wrap align-items-center justify-content-between gap-3">
                                <div class="theme-card-header mb-0">
                                    <span class="color-dot" :style="{ background: admin.use_module_theme ? seeds.light_seed_primary : admin.seed_primary }"></span>
                                    <div>
                                        <h4 class="theme-card-title">{{ tr('admin_panel_colors', 'Admin panel colours') }}</h4>
                                        <p class="theme-card-desc mb-0">{{ tr('admin_panel_colors_desc', "Use each module's theme colours in the admin panel? Applies to every module.") }}</p>
                                    </div>
                                </div>
                                <div class="btn-group btn-group-toggle segmented-toggle" role="radiogroup" :aria-label="tr('admin_panel_colors', 'Admin panel colours')">
                                    <label class="btn" :class="admin.use_module_theme ? 'btn-primary' : 'btn-outline-secondary'">
                                        <input type="radio" :value="true" v-model="admin.use_module_theme">
                                        {{ tr('use_module_colors', 'Yes, module colours') }}
                                    </label>
                                    <label class="btn" :class="!admin.use_module_theme ? 'btn-primary' : 'btn-outline-secondary'">
                                        <input type="radio" :value="false" v-model="admin.use_module_theme">
                                        {{ tr('use_own_admin_colors', 'No, own colours') }}
                                    </label>
                                </div>
                            </div>

                            <div v-if="!admin.use_module_theme" class="row mt-4">
                                <div class="col-12 col-md-6 mb-4 mb-md-0">
                                    <div class="theme-card-header">
                                        <span class="color-dot" :style="{ background: admin.seed_primary }"></span>
                                        <div>
                                            <h4 class="theme-card-title">{{ tr('admin_primary_color', 'Admin primary colour') }}</h4>
                                            <p class="theme-card-desc">{{ __('used_for_main_brand_elements_and_actions') }}</p>
                                        </div>
                                    </div>
                                    <div class="d-flex align-items-center hex-picker-row">
                                        <input type="color" v-model="admin.seed_primary" @input="previewAdmin('primary')">
                                        <input type="text" class="form-control hex-input" maxlength="7"
                                            v-model="admin.seed_primary" @input="previewAdmin('primary')">
                                    </div>
                                    <div class="palette-preview">
                                        <div v-for="(hex, stop) in admin.primary" :key="stop"
                                            class="swatch" :style="{ background: hex }" :title="stop + ': ' + hex"></div>
                                    </div>
                                </div>
                                <div class="col-12 col-md-6">
                                    <div class="theme-card-header">
                                        <span class="color-dot" :style="{ background: admin.seed_neutral }"></span>
                                        <div>
                                            <h4 class="theme-card-title">{{ tr('admin_neutral_color', 'Admin neutral colour') }}</h4>
                                            <p class="theme-card-desc">{{ __('used_for_text_backgrounds_borders_and_neutral_elements') }}</p>
                                        </div>
                                    </div>
                                    <div class="d-flex align-items-center hex-picker-row">
                                        <input type="color" v-model="admin.seed_neutral" @input="previewAdmin('neutral')">
                                        <input type="text" class="form-control hex-input" maxlength="7"
                                            v-model="admin.seed_neutral" @input="previewAdmin('neutral')">
                                    </div>
                                    <div class="palette-preview">
                                        <div v-for="(hex, stop) in admin.neutral" :key="stop"
                                            class="swatch" :style="{ background: hex }" :title="stop + ': ' + hex"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="card-footer d-flex justify-content-end" v-if="$can('manage_store_settings')">
                            <b-button v-if="$can('theme_settings')" type="submit" variant="primary" class="theme-save-btn" :disabled="adminSaving">
                                {{ __('save') }}
                                <b-spinner v-if="adminSaving" small label="Spinning"></b-spinner>
                            </b-button>
                        </div>
                    </div>
                </form>

                <div v-if="!admin.use_module_theme && adminLoaded" class="alert alert-info d-flex align-items-center gap-2 mb-4" role="status">
                    <i class="bi bi-info-circle"></i>
                    <span>{{ tr('module_colors_used_by_web_apps', 'The admin panel uses its own colours. The module colours below still apply to the website and the apps.') }}</span>
                </div>

                <form @submit.prevent="saveTheme">
                    <div class="card theme-card mb-4">
                        <div class="card-body">
                            <div v-if="usesDefaultColors" class="alert alert-info d-flex align-items-center gap-2 mb-4" role="status">
                                <i class="bi bi-info-circle"></i>
                                <span>{{ __('theme_uses_default_module_colors') === 'theme_uses_default_module_colors'
                                    ? "This module uses the default module's colours. Change them and save to give it its own."
                                    : __('theme_uses_default_module_colors') }}</span>
                            </div>
                            <div class="row">
                                <div class="col-12 col-md-6 mb-4 mb-md-0">
                                    <div class="theme-card-header">
                                        <span class="color-dot" :style="{ background: seeds.light_seed_primary }"></span>
                                        <div>
                                            <h4 class="theme-card-title">{{ __('theme_primary_color') }}</h4>
                                            <p class="theme-card-desc">{{ __('used_for_main_brand_elements_and_actions') }}</p>
                                        </div>
                                    </div>
                                    <div class="d-flex align-items-center hex-picker-row">
                                        <input type="color" v-model="seeds.light_seed_primary" @input="previewPalette('light', 'primary')">
                                        <input type="text" class="form-control hex-input" maxlength="7"
                                            v-model="seeds.light_seed_primary" @input="previewPalette('light', 'primary')">
                                    </div>
                                    <div class="palette-preview">
                                        <div v-for="(hex, stop) in preview.light.primary" :key="stop"
                                            class="swatch" :style="{ background: hex }" :title="stop + ': ' + hex"></div>
                                    </div>
                                </div>
                                <div class="col-12 col-md-6">
                                    <div class="theme-card-header">
                                        <span class="color-dot" :style="{ background: seeds.light_seed_neutral }"></span>
                                        <div>
                                            <h4 class="theme-card-title">{{ __('theme_neutral_color') }}</h4>
                                            <p class="theme-card-desc">{{ __('used_for_text_backgrounds_borders_and_neutral_elements') }}</p>
                                        </div>
                                    </div>
                                    <div class="d-flex align-items-center hex-picker-row">
                                        <input type="color" v-model="seeds.light_seed_neutral" @input="previewPalette('light', 'neutral')">
                                        <input type="text" class="form-control hex-input" maxlength="7"
                                            v-model="seeds.light_seed_neutral" @input="previewPalette('light', 'neutral')">
                                    </div>
                                    <div class="palette-preview">
                                        <div v-for="(hex, stop) in preview.light.neutral" :key="stop"
                                            class="swatch" :style="{ background: hex }" :title="stop + ': ' + hex"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="card-footer d-flex justify-content-end" v-if="$can('manage_store_settings')">
                            <b-button v-if="$can('theme_settings')" type="submit" variant="primary" class="theme-save-btn" :disabled="isLoading">
                                {{ __('save') }}
                                <b-spinner v-if="isLoading" small label="Spinning"></b-spinner>
                            </b-button>
                        </div>
                    </div>
                </form>

                <template v-if="isDefaultModule">
                <h4 class="status-colors-title">
                    {{ __('status_colors') }}
                    <i class="fa fa-info-circle ml-1" v-b-tooltip.hover
                        :title="__('general_custom_fields_tooltip')"></i>
                </h4>
                <p class="status-colors-desc">{{ __('used_to_represent_different_states_and_alerts_in_the_system') }}</p>

                <div class="row d-none d-sm-flex">
                    <div class="col-12 col-sm-6 col-xl-3 mb-4" v-for="type in statusTypes" :key="type">
                        <div class="card h-100 theme-card">
                            <div class="card-body">
                                <div class="theme-card-header">
                                    <span class="color-dot" :style="{ background: statusSeeds[type] }"></span>
                                    <div>
                                        <h4 class="theme-card-title">{{ __('theme_' + type + '_color') }}</h4>
                                        <p class="theme-card-desc">{{ __('theme_' + type + '_color_desc') }}</p>
                                    </div>
                                </div>
                                <div class="d-flex align-items-center hex-picker-row">
                                    <input type="color" v-model="statusSeeds[type]">
                                    <input type="text" class="form-control hex-input" maxlength="7" v-model="statusSeeds[type]">
                                </div>
                                <div class="palette-preview">
                                    <div v-for="(hex, stop) in theme[type]" :key="stop"
                                        class="swatch" :style="{ background: hex }" :title="stop + ': ' + hex"></div>
                                </div>
                            </div>
                            <div class="card-footer d-flex justify-content-between" v-if="$can('manage_store_settings')">
                                <button type="button" class="btn btn-outline-secondary theme-reset-btn" :disabled="statusLoading[type]"
                                    @click="resetStatusColor(type)">{{ __('reset_to_default') }}</button>
                                <button v-if="$can('theme_settings')" type="button" class="btn btn-primary theme-save-btn" :disabled="statusLoading[type]"
                                    @click="saveStatusColor(type)">{{ __('save') }}</button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Mobile compact accordion rows -->
                <div class="card theme-card d-sm-none status-mobile-card">
                    <div class="status-mobile-row" v-for="type in statusTypes" :key="'m-' + type">
                        <div class="status-mobile-summary" v-b-toggle="'status-collapse-' + type">
                            <span class="color-dot" :style="{ background: statusSeeds[type] }"></span>
                            <span class="status-mobile-title">{{ __('theme_' + type + '_color') }}</span>
                            <span class="status-mobile-hex">{{ statusSeeds[type] }}</span>
                            <i class="fa fa-chevron-down status-mobile-chevron"></i>
                        </div>
                        <b-collapse :id="'status-collapse-' + type">
                            <div class="status-mobile-body">
                                <p class="theme-card-desc">{{ __('theme_' + type + '_color_desc') }}</p>
                                <div class="d-flex align-items-center hex-picker-row">
                                    <input type="color" v-model="statusSeeds[type]">
                                    <input type="text" class="form-control hex-input" maxlength="7" v-model="statusSeeds[type]">
                                </div>
                                <div class="palette-preview">
                                    <div v-for="(hex, stop) in theme[type]" :key="stop"
                                        class="swatch" :style="{ background: hex }" :title="stop + ': ' + hex"></div>
                                </div>
                                <div class="d-flex justify-content-between mt-3" v-if="$can('manage_store_settings')">
                                    <button type="button" class="btn btn-outline-secondary theme-reset-btn" :disabled="statusLoading[type]"
                                        @click="resetStatusColor(type)">{{ __('reset_to_default') }}</button>
                                    <button v-if="$can('theme_settings')" type="button" class="btn btn-primary theme-save-btn" :disabled="statusLoading[type]"
                                        @click="saveStatusColor(type)">{{ __('save') }}</button>
                                </div>
                            </div>
                        </b-collapse>
                    </div>
                </div>
                </template>
            </section>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import { loadTheme } from "../../ThemePalette";

const STOPS = { '50': .95, '100': .90, '200': .80, '300': .70, '400': .60, '500': .50, '600': .40, '700': .30, '800': .20, '900': .10, '950': .05 };

function hexToHsl(hex) {
    let r = parseInt(hex.slice(1, 3), 16) / 255,
        g = parseInt(hex.slice(3, 5), 16) / 255,
        b = parseInt(hex.slice(5, 7), 16) / 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b), d = max - min;
    let h = 0, s = 0, l = (max + min) / 2;
    const denom = 1 - Math.abs(2 * l - 1);
    if (d && denom) {
        s = d / denom;
        h = max === r ? (g - b) / d : max === g ? (b - r) / d + 2 : (r - g) / d + 4;
        h = (h < 0 ? h + 6 : h) * 60;
    }
    return { h, s };
}

function hslToHex(h, s, l) {
    const c = (1 - Math.abs(2 * l - 1)) * s, x = c * (1 - Math.abs((h / 60) % 2 - 1)), m = l - c / 2;
    let r = 0, g = 0, b = 0;
    if (h < 60) { r = c; g = x; } else if (h < 120) { r = x; g = c; } else if (h < 180) { g = c; b = x; }
    else if (h < 240) { g = x; b = c; } else if (h < 300) { r = x; b = c; } else { r = c; b = x; }
    const hex = v => Math.round(Math.max(0, Math.min(255, (v + m) * 255))).toString(16).padStart(2, '0');
    return '#' + hex(r) + hex(g) + hex(b);
}

function generatePalette(seed) {
    const { h, s } = hexToHsl(seed);
    const palette = {};
    Object.entries(STOPS).forEach(([stop, l]) => { palette[stop] = stop === '500' ? seed : hslToHex(h, s, l); });
    return palette;
}

const NEUTRAL_STOPS = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'];
const NEUTRAL_CURVE_SOFT = [{ x: 0, y: 0 }, { x: .25, y: .15 }, { x: .5, y: .5 }, { x: .75, y: .85 }, { x: 1, y: 1 }];

function hexToRgb(hex) {
    const h = hex.replace('#', '');
    const f = h.length === 3 ? h.split('').map(c => c + c).join('') : h;
    return [parseInt(f.slice(0, 2), 16), parseInt(f.slice(2, 4), 16), parseInt(f.slice(4, 6), 16)];
}

function rgbToHex(rgb) {
    const to = v => Math.round(Math.max(0, Math.min(255, v))).toString(16).padStart(2, '0');
    return '#' + to(rgb[0]) + to(rgb[1]) + to(rgb[2]);
}

function lerpRgb(c1, c2, r) {
    return [0, 1, 2].map(i => c1[i] + (c2[i] - c1[i]) * r);
}

function catmullRomEval(points, t) {
    const n = points.length;
    let seg = 0;
    for (let i = 0; i < n - 1; i++) {
        if (t >= points[i].x && t <= points[i + 1].x) { seg = i; break; }
    }
    const p0 = points[Math.max(0, seg - 1)], p1 = points[seg], p2 = points[Math.min(n - 1, seg + 1)], p3 = points[Math.min(n - 1, seg + 2)];
    const span = p2.x - p1.x;
    const d = span < 1e-9 ? 0 : Math.min(1, Math.max(0, (t - p1.x) / span));
    const d2 = d * d;
    const y = 0.5 * (2 * p1.y + (-p0.y + p2.y) * d + (2 * p0.y - 5 * p1.y + 4 * p2.y - p3.y) * d2 + (-p0.y + 3 * p1.y - 3 * p2.y + p3.y) * (d2 * d));
    return Math.min(1, Math.max(0, y));
}

function generateNeutralPalette(seed) {
    const seedRgb = hexToRgb(seed);
    const dark = [0, 0, 0], light = [255, 255, 255];
    const palette = {};
    NEUTRAL_STOPS.forEach((stop, t) => {
        const T = 1 - t / 10;
        const y = catmullRomEval(NEUTRAL_CURVE_SOFT, T);
        const rgb = y <= 0.5 ? lerpRgb(dark, seedRgb, 2 * y) : lerpRgb(seedRgb, light, (y - 0.5) * 2);
        palette[stop] = rgbToHex(rgb);
    });
    return palette;
}

export default {
    data: function () {
        return {
            isLoading: false,
            isDefaultModule: true,
            statusTypes: ['success', 'error', 'warn', 'info'],
            // Shown only until /api/theme answers; same defaults as ThemeService (neutral must not be white).
            seeds: {
                light_seed_primary: '#FF9900',
                light_seed_neutral: '#9E9E9E',
            },
            usesDefaultColors: false,
            // Admin panel colours (global): follow module themes, or own primary / neutral
            admin: { use_module_theme: true, seed_primary: '#FF9900', seed_neutral: '#9E9E9E', primary: {}, neutral: {} },
            adminLoaded: false,
            adminSaving: false,
            statusSeeds: { success: '#20B364', error: '#D63031', warn: '#F79E1B', info: '#2196F3' },
            statusLoading: { success: false, error: false, warn: false, info: false },
            theme: { success: {}, error: {}, warn: {}, info: {} },
            preview: {
                light: { primary: {}, neutral: {} },
            },
        };
    },
    created: function () {
        // Palette bars show straight away (built-in defaults), then the saved colors replace them.
        this.previewPalette('light', 'primary');
        this.previewPalette('light', 'neutral');
        this.getTheme();
        this.getAdminTheme();
    },
    methods: {
        tr(key, fallback) { const v = this.__(key); return v && v !== key ? v : fallback; },
        getAdminTheme() {
            axios.get(this.$apiUrl + '/theme/admin').then((response) => {
                const d = response.data && response.data.data;
                if (d) this.admin = { use_module_theme: !!d.use_module_theme, seed_primary: d.seed_primary, seed_neutral: d.seed_neutral, primary: d.primary || {}, neutral: d.neutral || {} };
                this.adminLoaded = true;
            }).catch(() => { this.adminLoaded = true; });
        },
        previewAdmin(role) {
            const seed = role === 'neutral' ? this.admin.seed_neutral : this.admin.seed_primary;
            if (!/^#[0-9A-Fa-f]{6}$/.test(seed || '')) return;
            this.admin[role] = role === 'neutral' ? generateNeutralPalette(seed) : generatePalette(seed);
        },
        saveAdminTheme() {
            if (!this.admin.use_module_theme && this.isNeutralTooLight(this.admin.seed_neutral)) {
                const translated = __('neutral_color_too_light_warning');
                this.showError((translated && translated !== 'neutral_color_too_light_warning') ? translated
                    : 'Neutral too light — borders and dividers will be invisible in the app. Pick a colour with some depth (around #9E9E9E or darker).');
                return;
            }
            this.adminSaving = true;
            const formData = new FormData();
            formData.append('use_module_theme', this.admin.use_module_theme ? '1' : '0');
            if (!this.admin.use_module_theme) {
                formData.append('seed_primary', this.admin.seed_primary);
                formData.append('seed_neutral', this.admin.seed_neutral);
            }
            axios.post(this.$apiUrl + '/theme/admin/save', formData).then(res => {
                this.adminSaving = false;
                const data = res.data;
                if (data.status === 1) {
                    this.showMessage('success', data.message);
                    loadTheme(this.$baseUrl); // repaint the panel with the new choice right away
                } else {
                    this.showError(data.message);
                }
            }).catch(error => {
                this.adminSaving = false;
                this.showError(error.message || __('something_went_wrong'));
            });
        },
        getTheme() {
            axios.get(this.$apiUrl + '/theme').then((response) => {
                const all = response.data.data || {};
                const modules = Object.values(all);
                const defaultModule = modules.find(m => m && m.module_is_default) || modules[0];
                const activeModuleId = Number(localStorage.getItem('active_module_id')) || (defaultModule && defaultModule.module_id);
                // A module without its own colors comes back with the default module's colors
                // (uses_default_colors); Save stores them as its own.
                const data = all[activeModuleId] || defaultModule;
                if (!data) return;
                this.theme = data;
                this.usesDefaultColors = !!data.uses_default_colors;
                this.isDefaultModule = !!data.module_is_default;
                this.seeds.light_seed_primary = data.seed_primary;
                this.seeds.light_seed_neutral = data.seed_neutral;
                this.preview.light.primary = data.primary;
                this.preview.light.neutral = data.neutral;
                this.statusTypes.forEach(type => {
                    if (data[type] && data[type]['500']) this.statusSeeds[type] = data[type]['500'];
                });
            });
        },
        previewPalette(mode, role) {
            const seed = this.seeds[mode + '_seed_' + role];
            this.preview[mode][role] = role === 'neutral' ? generateNeutralPalette(seed) : generatePalette(seed);
        },
        // Same floor as the backend's own check (luma > 158, i.e. lighter than #9E9E9E) - catch
        // it before the request so the warning shows immediately on save, not after a round trip.
        isNeutralTooLight(hex) {
            const clean = (hex || '').replace('#', '');
            if (clean.length !== 6) return false;
            const r = parseInt(clean.substring(0, 2), 16);
            const g = parseInt(clean.substring(2, 4), 16);
            const b = parseInt(clean.substring(4, 6), 16);
            const luma = (r * 299 + g * 587 + b * 114) / 1000;
            return luma > 158;
        },
        saveTheme() {
            if (this.isNeutralTooLight(this.seeds.light_seed_neutral)) {
                const fallbackWarning = 'Neutral too light — borders and dividers will be invisible in the app. Pick a colour with some depth (around #9E9E9E or darker).';
                const translated = __('neutral_color_too_light_warning');
                this.showError((translated && translated !== 'neutral_color_too_light_warning') ? translated : fallbackWarning);
                return;
            }
            this.isLoading = true;
            const formData = new FormData();
            Object.keys(this.seeds).forEach(key => formData.append(key, this.seeds[key]));

            axios.post(this.$apiUrl + '/theme/save', formData).then(res => {
                const data = res.data;
                this.isLoading = false;
                if (data.status === 1) {
                    this.theme = data.data;
                    loadTheme(this.$baseUrl);
                    this.showMessage("success", data.message);
                } else {
                    this.showError(data.message);
                }
            }).catch(error => {
                this.isLoading = false;
                this.showError(error.message || __('something_went_wrong'));
            });
        },
        saveStatusColor(type) {
            this.statusLoading[type] = true;
            const formData = new FormData();
            formData.append('seed', this.statusSeeds[type]);

            axios.post(this.$apiUrl + '/theme/status/' + type, formData).then(res => {
                const data = res.data;
                this.statusLoading[type] = false;
                if (data.status === 1) {
                    this.theme = data.data;
                    loadTheme(this.$baseUrl);
                    this.showMessage("success", data.message);
                } else {
                    this.showError(data.message);
                }
            }).catch(error => {
                this.statusLoading[type] = false;
                this.showError(error.message || __('something_went_wrong'));
            });
        },
        resetStatusColor(type) {
            this.statusLoading[type] = true;
            axios.delete(this.$apiUrl + '/theme/status/' + type + '/reset').then(res => {
                const data = res.data;
                this.statusLoading[type] = false;
                if (data.status === 1) {
                    this.theme = data.data;
                    this.statusSeeds[type] = data.data[type]['500'];
                    loadTheme(this.$baseUrl);
                    this.showMessage("success", data.message);
                } else {
                    this.showError(data.message);
                }
            }).catch(error => {
                this.statusLoading[type] = false;
                this.showError(error.message || __('something_went_wrong'));
            });
        },
    },
};
</script>

<style scoped>
.card-header {
    border-bottom: none;
}
.theme-settings-section .theme-card {
    border-radius: var(--ui-radius-lg);
    border: 1px solid var(--ui-border);
}
.theme-card-header {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    margin-bottom: 16px;
}
.color-dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    margin-top: 6px;
    flex-shrink: 0;
}
.theme-card-title {
    margin: 0;
    font-size: 15px;
    font-weight: 700;
    color: var(--ui-heading);
}
.theme-card-desc {
    margin: 2px 0 0;
    font-size: 12px;
    color: var(--ui-text-muted);
}
.hex-picker-row input[type="color"] {
    flex-shrink: 0;
}
.hex-input {
    width: 110px;
    margin-inline-start: 10px;
    direction: ltr; /* keep "#F69609" in order on RTL pages */
    text-transform: uppercase;
    font-family: var(--ui-font);
    font-variant-numeric: tabular-nums;
}
.palette-preview {
    display: flex;
    margin-top: 12px;
    border-radius: var(--ui-radius-sm);
    overflow: hidden;
    border: 1px solid var(--ui-border);
}
.swatch {
    flex: 1;
    height: 26px;
}
.status-colors-title {
    margin-top: 8px;
    margin-bottom: 2px;
    font-size: 16px;
    font-weight: 700;
    color: var(--ui-heading);
}
.status-colors-desc {
    font-size: 13px;
    color: var(--ui-text-muted);
    margin-bottom: 16px;
}
.theme-save-btn {
    border-radius: var(--ui-radius);
}
.theme-reset-btn {
    border-radius: var(--ui-radius);
}
.status-mobile-card {
    border-radius: var(--ui-radius-lg);
    border: 1px solid var(--ui-border);
    overflow: hidden;
}
.status-mobile-row {
    border-bottom: 1px solid var(--ui-border);
}
.status-mobile-row:last-child {
    border-bottom: none;
}
.status-mobile-summary {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 14px 16px;
    cursor: pointer;
}
.status-mobile-title {
    font-size: 13px;
    font-weight: 600;
    color: var(--ui-heading);
    flex: 1;
}
.status-mobile-hex {
    font-family: var(--ui-font);
    font-variant-numeric: tabular-nums;
    color: var(--ui-text-muted);
    font-size: 12px;
}
.status-mobile-chevron {
    color: var(--ui-text-muted);
    transition: transform 0.2s ease;
}
.status-mobile-summary:not(.collapsed) .status-mobile-chevron {
    transform: rotate(180deg);
}
.status-mobile-body {
    padding: 0 16px 16px;
}
@media (max-width: 575.98px) {
    .hex-picker-row {
        flex-wrap: wrap;
        row-gap: 8px;
    }
    .hex-input {
        margin-inline-start: 10px;
    }
    .card-footer.d-flex {
        flex-wrap: wrap;
        gap: 8px;
    }
    .card-footer.d-flex .btn {
        flex: 1 1 auto;
    }
}
</style>
