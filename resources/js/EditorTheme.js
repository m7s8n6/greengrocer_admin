// Makes every TinyMCE editor in the panel follow the light / dark theme (and the module's theme palette).
//
// The editor chrome (toolbar, menus, dialogs, status bar) is styled from theme tokens in
// custom-egrocer.scss ("TinyMCE editor"). The editing area is an iframe that can't see the page's CSS
// variables, so its colours are copied in here: once when each editor starts, and again whenever the
// theme is switched (the header toggles theme-light / theme-dark on <body> without a reload).
// Only colours are set; the editor's own content fonts (e.g. a page's content_style) are left alone.

const STYLE_ID = 'ui-theme-content-style';

function themeColors() {
    const css = getComputedStyle(document.body);
    const v = (name) => css.getPropertyValue(name).trim();
    return {
        dark: document.body.classList.contains('theme-dark'),
        bg: v('--ui-surface'),
        text: v('--ui-text'),
        muted: v('--ui-text-subtle'),
        border: v('--ui-border-strong'),
        link: v('--theme-primary-600'),
        selection: v('--ui-primary-soft'),
    };
}

function applyToEditor(editor) {
    const doc = editor && editor.getDoc && editor.getDoc();
    if (!doc || !doc.head) return;
    const c = themeColors();
    let style = doc.getElementById(STYLE_ID);
    if (!style) {
        style = doc.createElement('style');
        style.id = STYLE_ID;
        doc.head.appendChild(style);
    }
    style.textContent = `
        html, body { background: ${c.bg} !important; color: ${c.text} !important; }
        a { color: ${c.link}; }
        table, table td, table th { border-color: ${c.border}; }
        hr { border-color: ${c.border}; }
        ::selection { background: ${c.selection}; }
        .mce-content-body[data-mce-placeholder]:not(.mce-visualblocks)::before { color: ${c.muted} !important; }
    `;
    doc.documentElement.classList.toggle('theme-dark', c.dark);
    if (doc.body) doc.body.style.colorScheme = c.dark ? 'dark' : 'light';
}

function applyToAll() {
    const tinymce = window.tinymce;
    if (!tinymce || !tinymce.get) return;
    tinymce.get().forEach(applyToEditor);
}

export function installEditorTheme() {
    const tinymce = window.tinymce;
    if (!tinymce || tinymce.__uiThemeInstalled) return;
    tinymce.__uiThemeInstalled = true;

    const originalInit = tinymce.init.bind(tinymce);
    tinymce.init = (config = {}) => {
        const pageSetup = config.setup;
        return originalInit(Object.assign({}, config, {
            setup(editor) {
                editor.on('init', () => applyToEditor(editor));
                if (typeof pageSetup === 'function') pageSetup(editor);
            },
        }));
    };

    // Theme switch (and module palette changes) -> re-colour open editors.
    new MutationObserver(applyToAll).observe(document.body, { attributes: true, attributeFilter: ['class'] });
    new MutationObserver(applyToAll).observe(document.documentElement, { attributes: true, attributeFilter: ['style'] });
}

export default { installEditorTheme };
