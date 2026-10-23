<template>
    <div class="table-count text-muted small d-inline-flex align-items-center flex-wrap">
        <template v-if="total > 0">
            <span>{{ labelShowing }}</span>
            <span class="table-count__num font-weight-bold mx-1">{{ from }}–{{ to }}</span>
            <span>{{ labelOf }}</span>
            <span class="table-count__num font-weight-bold mx-1">{{ total }}</span>
            <span>{{ labelItems }}</span>
        </template>
        <template v-else>
            <span class="table-count__num font-weight-bold me-1">0</span>
            <span>{{ labelItems }}</span>
        </template>
    </div>
</template>

<script>
export default {
    name: 'TableCount',
    props: {
        currentPage: {
            type: [Number, String],
            default: 1
        },
        perPage: {
            type: [Number, String],
            default: 10
        },
        totalRows: {
            type: [Number, String],
            default: 0
        }
    },
    computed: {
        current() {
            const p = parseInt(this.currentPage, 10);
            return isNaN(p) || p < 1 ? 1 : p;
        },
        size() {
            const s = parseInt(this.perPage, 10);
            return isNaN(s) || s < 1 ? 10 : s;
        },
        total() {
            const t = parseInt(this.totalRows, 10);
            return isNaN(t) || t < 0 ? 0 : t;
        },
        from() {
            if (this.total === 0) return 0;
            return Math.min((this.current - 1) * this.size + 1, this.total);
        },
        to() {
            if (this.total === 0) return 0;
            return Math.min(this.current * this.size, this.total);
        },
        labelShowing() {
            return this.__('showing') !== 'showing' ? this.__('showing') : (this.__('Showing Result') || 'Showing');
        },
        labelOf() {
            return this.__('of') !== 'of' ? this.__('of') : 'of';
        },
        labelItems() {
            return this.__('items') !== 'items' ? this.__('items') : (this.__('Items') || 'items');
        }
    }
};
</script>

<style scoped>
.table-count {
    font-size: 13px;
    line-height: 1.4;
    color: var(--ui-text-muted);
    user-select: none;
    gap: 0.25rem;
}

.table-count__num {
    color: var(--ui-heading, var(--ui-text));
    font-weight: 700;
}
</style>
