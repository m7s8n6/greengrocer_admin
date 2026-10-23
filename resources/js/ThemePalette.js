// Applies the active module's Theme Settings palette (/theme-settings) to the whole panel.
//
// Every shade of every role is published as a CSS variable on <html>:
//   --theme-primary-50 … --theme-primary-950   (brand, buttons, links, active states)
//   --theme-neutral-50 … --theme-neutral-950   (text, surfaces, borders)
//   --theme-success-*, --theme-error-*, --theme-warn-*, --theme-info-*  (states only)
// The legacy --figma-* variables are defined on top of these in custom-egrocer.scss, so
// existing CSS follows the theme too. Static fallbacks for every shade also live there (:root)
// and are used until the first fetch completes.
//
// Switching module reloads the page, so applying once at boot is enough. The last payload is
// cached so a reload paints with the right colors before the request returns.

const ROLES = ['primary', 'neutral', 'success', 'error', 'warn', 'info'];
const CACHE_KEY = 'theme_palette_cache';

// Same module the header uses: the stored one, else the module marked as default.
function activeModuleId() {
    return Number(localStorage.getItem('active_module_id')) || null;
}

function readCache() {
    try {
        return JSON.parse(localStorage.getItem(CACHE_KEY)) || {};
    } catch (e) {
        return {};
    }
}

function writeCache(all) {
    try {
        localStorage.setItem(CACHE_KEY, JSON.stringify(all));
    } catch (e) {
        // Storage full or blocked - the CSS fallbacks still apply.
    }
}

function setPalette(palette) {
    const root = document.documentElement.style;
    ROLES.forEach(role => {
        const shades = palette[role];
        if (!shades || typeof shades !== 'object') return;
        Object.keys(shades).forEach(stop => root.setProperty(`--theme-${role}-${stop}`, shades[stop]));
    });
}

// Only the default module stores status colors; the others reuse its success/error/warn/info.
function resolvePalette(all, moduleId) {
    if (!all) return null;
    const fallback = Object.values(all).find(m => m && m.module_is_default) || {};
    const own = (moduleId && all[moduleId]) || fallback;
    if (!own.primary) return null;
    const palette = { primary: own.primary, neutral: own.neutral };
    ['success', 'error', 'warn', 'info'].forEach(type => {
        palette[type] = own[type] || fallback[type];
    });
    return palette;
}

// Admin panel colours (Theme Settings > Admin panel colours, one global setting): when the admin
// panel does not follow the module themes, its own primary / neutral replace the module's.
// Status colours always stay the shared ones.
const ADMIN_CACHE_KEY = 'theme_admin_panel_cache';

function readAdminCache() {
    try {
        return JSON.parse(localStorage.getItem(ADMIN_CACHE_KEY)) || null;
    } catch (e) {
        return null;
    }
}

function writeAdminCache(admin) {
    try {
        localStorage.setItem(ADMIN_CACHE_KEY, JSON.stringify(admin));
    } catch (e) {
        // CSS fallbacks still apply.
    }
}

// The admin panel colours belong to the admin panel only: sellers and delivery boys always follow
// their own module's palette.
function isAdminPanelUser() {
    try {
        const user = JSON.parse(localStorage.getItem('user'));
        const role = user && user.role ? user.role.name : '';
        return role !== 'Seller' && role !== 'Delivery Boy';
    } catch (e) {
        return true;
    }
}

export function applyTheme(all, admin = readAdminCache()) {
    const palette = resolvePalette(all, activeModuleId());
    if (!palette) return;
    if (admin && admin.use_module_theme === false && admin.primary && admin.neutral && isAdminPanelUser()) {
        palette.primary = admin.primary;
        palette.neutral = admin.neutral;
    }
    setPalette(palette);
}

export function loadTheme(baseUrl) {
    const cached = readCache();
    if (Object.keys(cached).length) applyTheme(cached);

    const themes = window.axios.get(baseUrl + '/api/theme').then(r => r.data && r.data.data).catch(() => null);
    const admin = window.axios.get(baseUrl + '/api/theme/admin').then(r => r.data && r.data.data).catch(() => null);

    return Promise.all([themes, admin]).then(([all, adminTheme]) => {
        if (adminTheme) writeAdminCache(adminTheme);
        const modules = all || (Object.keys(cached).length ? cached : null);
        if (!modules) return;
        if (all) writeCache(all);
        applyTheme(modules, adminTheme || readAdminCache());
    });
}

// Resolved hex value of a theme shade, e.g. themeColor('primary-500'). For libraries that cannot
// read CSS variables themselves (ApexCharts, Leaflet, Google Maps).
export function themeColor(name, fallback = '') {
    const value = getComputedStyle(document.documentElement).getPropertyValue('--theme-' + name).trim();
    return value || fallback;
}

// Categorical series colors for charts, all taken from the theme palette.
export function themeChartColors() {
    return ['primary-500', 'info-500', 'success-500', 'warn-500', 'error-500',
        'primary-300', 'info-300', 'success-300', 'warn-300', 'error-300'].map(name => themeColor(name));
}

export default { loadTheme, applyTheme, themeColor, themeChartColors };
