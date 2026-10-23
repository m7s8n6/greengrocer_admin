// Remembers the page a logged-out user tried to open, so login can return them there
// (e.g. /store_settings?section=delivery_boy_setting) instead of always the dashboard.
// Kept in sessionStorage: survives the redirect/reload to the login page, gone with the tab.

const KEY = 'intended_url';
const AUTH_PAGES = /^\/(?:(?:seller|delivery_boy)\/)?(?:login|register|forgot[-_]password|reset[-_]password)\b|^\/(?:install|purchase_code|404)\b/;

// Which login page owns a path: '/seller/...' -> seller panel, '/delivery_boy/...' -> delivery boy panel.
export function panelOf(path) {
    if (/^\/seller(\/|$|\?)/.test(path)) return 'seller';
    if (/^\/delivery_boy(\/|$|\?)/.test(path)) return 'delivery_boy';
    return 'admin';
}

export function loginPathFor(path) {
    const panel = panelOf(path);
    return panel === 'admin' ? '/login' : '/' + panel + '/login';
}

function isSafe(path) {
    // same-app absolute path only (no //host or scheme), and never an auth page itself
    return typeof path === 'string' && path.charAt(0) === '/' && path.charAt(1) !== '/' && !AUTH_PAGES.test(path);
}

export function rememberIntended(fullPath) {
    try {
        if (isSafe(fullPath)) sessionStorage.setItem(KEY, fullPath);
    } catch (e) { }
}

export function clearIntended() {
    try { sessionStorage.removeItem(KEY); } catch (e) { }
}

// Returns the remembered path when it belongs to `panel`, otherwise `fallback`; always clears it.
export function takeIntended(panel, fallback) {
    let path = null;
    try { path = sessionStorage.getItem(KEY); } catch (e) { }
    clearIntended();
    return path && isSafe(path) && panelOf(path) === panel ? path : fallback;
}

// Where to go right after a successful login: the remembered page if it belongs to this user's panel
// (role 3 = seller, 4 = delivery boy, anything else = admin), otherwise `fallback`.
export function afterLoginPath(user, fallback) {
    const roleId = user && user.role_id;
    const panel = roleId === 3 ? 'seller' : (roleId === 4 ? 'delivery_boy' : 'admin');
    return takeIntended(panel, fallback);
}
