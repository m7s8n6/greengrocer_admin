/**
 * Grid / list view switch for list pages.
 *
 * Provides `viewMode` ('grid' | 'list'), remembered per page (route path) in localStorage,
 * and `pagedItems(items)`: the slice of `items` the b-table list view shows for the current
 * page, so the grid view always shows the same records as the table.
 *
 * Usage: mixins: [ViewModeMixin]; markup: the shared `.view-toggle` buttons calling
 * setViewMode('grid'|'list'), and an `.item-grid` of `.item-card`s rendered from
 * pagedItems(sameArrayAsTheTable). Set `serverPagination: true` in data() when the API
 * already returns one page (then pagedItems returns the array as is).
 */
const STORAGE_KEY = 'list_view_mode';

function readModes() {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
    } catch (e) {
        return {};
    }
}

export default {
    data() {
        const saved = readModes()[this.$route ? this.$route.path : ''];
        return {
            viewMode: ['list', 'tree'].includes(saved) ? saved : 'grid',
        };
    },
    methods: {
        setViewMode(mode) {
            this.viewMode = mode;
            try {
                const modes = readModes();
                modes[this.$route.path] = mode;
                localStorage.setItem(STORAGE_KEY, JSON.stringify(modes));
            } catch (e) {
                // Storage blocked: the choice just isn't remembered.
            }
        },
        // Same client-side search the b-table `:filter` prop applies: case-insensitive match of the
        // page's `filter` text across all fields (or only `includeFields`), keys starting with "_" skipped.
        gridFilter(items, includeFields) {
            const list = Array.isArray(items) ? items : [];
            const text = this.filter === null || this.filter === undefined ? '' : String(this.filter).trim();
            if (!text) return list;
            const re = new RegExp(text.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&').replace(/\s+/g, '\\s+'), 'i');
            const stringify = (value) => {
                if (value === null || value === undefined) return '';
                if (typeof value === 'object') return Object.keys(value).filter(k => k.charAt(0) !== '_').map(k => stringify(value[k])).join(' ');
                return String(value);
            };
            return list.filter(item => {
                const keys = includeFields && includeFields.length ? includeFields : Object.keys(item).filter(k => k.charAt(0) !== '_');
                return re.test(keys.map(k => stringify(item[k])).join(' '));
            });
        },
        // Same order as the b-table's synced `sortBy` / `sortDesc` (dotted keys supported).
        gridSort(items) {
            const list = Array.isArray(items) ? items.slice() : [];
            if (!this.sortBy) return list;
            const dir = this.sortDesc ? -1 : 1;
            const val = (o) => String(this.sortBy).split('.').reduce((a, k) => (a == null ? a : a[k]), o);
            return list.sort((a, b) => {
                const x = val(a);
                const y = val(b);
                if (x === y) return 0;
                if (x === null || x === undefined) return -dir;
                if (y === null || y === undefined) return dir;
                const nx = Number(x);
                const ny = Number(y);
                if (x !== '' && y !== '' && !isNaN(nx) && !isNaN(ny)) return (nx - ny) * dir;
                return String(x).localeCompare(String(y), undefined, { numeric: true }) * dir;
            });
        },
        gridFilterSort(items, includeFields) {
            return this.gridSort(this.gridFilter(items, includeFields));
        },
        // First letter of a name for avatar placeholders.
        initial(name) {
            return ((name || '?').toString().trim().charAt(0) || '?').toUpperCase();
        },
        pagedItems(items) {
            const list = Array.isArray(items) ? items : [];
            if (this.serverPagination) return list;
            const perPage = Number(this.perPage) || list.length || 1;
            const page = Number(this.currentPage) || 1;
            return list.slice((page - 1) * perPage, page * perPage);
        },
    },
};
