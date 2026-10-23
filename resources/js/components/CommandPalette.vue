<template>
    <!-- host stays in the DOM (moved to <body> on mount) so the overlay is never trapped under the header -->
    <div class="cmdk-host">
    <div v-if="open" class="cmdk" @mousedown.self="close" role="dialog" aria-modal="true" :aria-label="tr('quick_search', 'Quick search')">
        <div class="cmdk__panel">
            <div class="cmdk__search">
                <i class="bi bi-search cmdk__search-icon" aria-hidden="true"></i>
                <input ref="input" v-model="q" class="cmdk__input" type="text" autocomplete="off" spellcheck="false"
                    :placeholder="tr('quick_search_placeholder', 'Search pages and settings…')"
                    @keydown.down.prevent="move(1)" @keydown.up.prevent="move(-1)"
                    @keydown.enter.prevent="go(results[active])" @keydown.esc.prevent="close">
                <kbd class="cmdk__kbd">Esc</kbd>
            </div>

            <div ref="list" class="cmdk__list">
                <template v-for="(item, i) in results">
                    <div v-if="i === 0 || results[i - 1].group !== item.group" :key="'g-' + item.group + i" class="cmdk__group">
                        {{ item.group }}
                    </div>
                    <button :key="item.key" type="button" class="cmdk__item" :class="{ 'is-active': i === active }"
                        :data-idx="i" @mousemove="active = i" @click="go(item)">
                        <span class="cmdk__icon"><i :class="item.icon"></i></span>
                        <span class="cmdk__text">
                            <span class="cmdk__title">{{ item.title }}</span>
                        </span>
                        <i class="bi bi-arrow-return-left cmdk__enter" aria-hidden="true"></i>
                    </button>
                </template>
                <div v-if="!results.length" class="cmdk__empty">
                    <i class="bi bi-search"></i>
                    <span>{{ tr('no_results_found', 'No results found') }}</span>
                </div>
            </div>

            <div class="cmdk__foot">
                <span><kbd>↑</kbd><kbd>↓</kbd> {{ tr('navigate', 'Navigate') }}</span>
                <span><kbd>↵</kbd> {{ tr('open', 'Open') }}</span>
                <span><kbd>Esc</kbd> {{ tr('close', 'Close') }}</span>
            </div>
        </div>
    </div>
    </div>
</template>

<script>
/**
 * Command palette (Ctrl+K / ⌘K): jump to a menu entry or setting of the panel the user is in.
 * Menu entries are exactly the sidebar of the current panel (admin / seller / delivery boy, same
 * visibility as the sidebar), so a page that exists in the router but not in that panel's menu
 * (e.g. the seller's POS Reports in admin) is never offered; settings come from the shared settings
 * catalog (Store Settings sections included).
 * Each item's `sub` (menu group / description) is used for matching only, not shown.
 * Open it from anywhere with the shortcut, or this.$root.$emit('open-command-palette').
 */
import Auth from '../Auth.js';
import { settingsCatalog, canSeeSetting } from '../utils/settingsCatalog.js';

export default {
    name: 'CommandPalette',
    data() {
        return { open: false, q: '', active: 0 };
    },
    computed: {
        roleName() {
            return Auth.user && Auth.user.role ? Auth.user.role.name : '';
        },
        // Sidebar entries of the current panel (admin / seller / delivery boy), same visibility as the sidebar.
        menuItems() {
            let c = this.$parent;
            while (c && !['modulesSidebarItems', 'generalSidebarItems', 'visibleSidebarItems', 'sidebarItems'].some(k => Array.isArray(c[k]))) c = c.$parent;
            if (!c) return [];
            // exactly the lists the sidebar renders (already filtered per module, e.g. Addons only in
            // Food Delivery) — never the raw, unfiltered sidebarItems when a filtered list exists
            const lists = Array.isArray(c.modulesSidebarItems) ? [c.modulesSidebarItems, c.generalSidebarItems]
                : Array.isArray(c.visibleSidebarItems) ? [c.visibleSidebarItems]
                    : [c.sidebarItems];
            lists.splice(0, lists.length, ...lists.filter(Array.isArray));
            const visible = e => e.role === true ? this.$role('Super Admin') : (!e.permission || this.$can(e.permission));
            const group = this.tr('menu', 'Menu');
            const out = [];
            lists.forEach(list => list.forEach(item => {
                if (Array.isArray(item.submenu) && item.submenu.length) {
                    item.submenu.forEach(sub => {
                        if (sub.url && visible(sub)) out.push({ key: 'm' + sub.url, group, title: sub.name, sub: item.name + ' · ' + sub.url, to: sub.url, icon: this.iconFor(sub.url, sub.name) });
                    });
                } else if (item.url && visible(item)) {
                    out.push({ key: 'm' + item.url, group, title: item.name, sub: item.url, to: item.url, icon: this.iconFor(item.url, item.name) });
                }
            }));
            return out;
        },
        settingItems() {
            if (this.roleName === 'Seller' || this.roleName === 'Delivery Boy') return [];
            const out = [];
            settingsCatalog(this).forEach(g => g.cards.forEach(card => {
                if (!canSeeSetting(this, card)) return;
                out.push({ key: 's' + card.key, group: this.tr('settings', 'Settings'), title: card.title, sub: g.title + ' · ' + card.desc, to: card.to, icon: card.icon });
            }));
            return out;
        },
        results() {
            // one entry per destination: settings (with description) > sidebar
            const seen = new Set();
            const keyOf = to => typeof to === 'string' ? to.replace(/\/$/, '') : JSON.stringify(to);
            const all = [];
            this.settingItems.concat(this.menuItems).forEach(item => {
                const k = keyOf(item.to);
                if (!seen.has(k)) { seen.add(k); all.push(item); }
            });
            const order = [this.tr('menu', 'Menu'), this.tr('pages', 'Pages'), this.tr('settings', 'Settings')];
            all.sort((a, b) => order.indexOf(a.group) - order.indexOf(b.group));
            const q = this.q.trim().toLowerCase();
            if (!q) return all;
            const words = q.split(/\s+/);
            return all
                .map(item => {
                    const title = String(item.title).toLowerCase();
                    const hay = (title + ' ' + item.sub + ' ' + item.group).toLowerCase();
                    if (!words.every(w => hay.includes(w))) return null;
                    const score = title === q ? 0 : title.startsWith(q) ? 1 : title.includes(q) ? 2 : 3;
                    return { item, score };
                })
                .filter(Boolean)
                .sort((a, b) => a.score - b.score || a.item.group.localeCompare(b.item.group))
                .map(x => x.item)
                .slice(0, 60);
        },
    },
    watch: {
        q() {
            this.active = 0;
        },
    },
    mounted() {
        document.body.appendChild(this.$el);
        this._onKey = (e) => {
            if ((e.ctrlKey || e.metaKey) && !e.altKey && String(e.key).toLowerCase() === 'k') {
                e.preventDefault();
                this.open ? this.close() : this.show();
            }
        };
        window.addEventListener('keydown', this._onKey);
        this.$root.$on('open-command-palette', this.show);
    },
    beforeDestroy() {
        if (this.$el && this.$el.parentNode) this.$el.parentNode.removeChild(this.$el);
        window.removeEventListener('keydown', this._onKey);
        this.$root.$off('open-command-palette', this.show);
    },
    methods: {
        tr(key, fallback) {
            const v = this.__(key);
            return v && v !== key ? v : fallback;
        },
        iconFor(path, title) {
            const t = (path + ' ' + title).toLowerCase();
            if (/create|add/.test(t)) return 'bi bi-plus-circle';
            if (/setting|theme|config/.test(t)) return 'bi bi-gear';
            if (/order/.test(t)) return 'bi bi-receipt';
            if (/categor/.test(t)) return 'bi bi-diagram-3';
            if (/product|stock|media|brand|tax|unit|attribute/.test(t)) return 'bi bi-box-seam';
            if (/seller|customer|user|delivery|rider|boy/.test(t)) return 'bi bi-people';
            if (/report|dashboard|transaction|wallet|withdraw/.test(t)) return 'bi bi-graph-up';
            return 'bi bi-arrow-right-short';
        },
        show() {
            this.open = true;
            this.q = '';
            this.active = 0;
            this.$nextTick(() => this.$refs.input && this.$refs.input.focus());
        },
        close() {
            this.open = false;
        },
        move(step) {
            const n = this.results.length;
            if (!n) return;
            this.active = (this.active + step + n) % n;
            this.$nextTick(() => {
                const el = this.$refs.list && this.$refs.list.querySelector('[data-idx="' + this.active + '"]');
                if (el) el.scrollIntoView({ block: 'nearest' });
            });
        },
        go(item) {
            if (!item) return;
            this.close();
            this.$router.push(item.to).catch(() => { });
        },
    },
};
</script>
