<template>
    <div class="data-table">
        <!-- own scroll box: wide tables scroll sideways, the footer below stays put -->
        <div class="data-table__scroll">
        <b-table v-bind="$attrs" v-on="$listeners" :items="items" :fields="fields" :busy="busy"
            :current-page="localPaging ? currentPage : undefined" :per-page="localPaging ? perPage : undefined"
            :stacked="stacked" :small="small" :bordered="false" show-empty :tbody-tr-class="tbodyTrClass"
            :empty-text="emptyText || undefined" :empty-filtered-text="emptyFilteredText || undefined"
            :class="['figma-table', 'figma-order-table', 'mb-0', tableClass]">

            <!-- Pages keep their own cells/heads; every slot they pass is forwarded as-is. -->
            <template v-for="(_, name) in $scopedSlots" #[name]="slotData">
                <slot :name="name" v-bind="slotData"></slot>
            </template>

            <template v-if="!$scopedSlots['table-busy']" #table-busy>
                <div class="data-table__state">
                    <b-spinner small class="align-middle me-2"></b-spinner>
                    <span>{{ __('loading') }}...</span>
                </div>
            </template>

            <template v-if="!$scopedSlots.empty" #empty="scope">
                <div class="data-table__state">
                    <i class="fa fa-inbox fa-2x d-block mb-2"></i>
                    <span>{{ scope.emptyText }}</span>
                </div>
            </template>

            <template v-if="!$scopedSlots.emptyfiltered" #emptyfiltered="scope">
                <div class="data-table__state">
                    <i class="fa fa-search fa-2x d-block mb-2"></i>
                    <span>{{ scope.emptyFilteredText }}</span>
                </div>
            </template>
        </b-table>
        </div>

        <div v-if="!hideFooter" class="figma-table-footer flex-wrap gap-3">
            <div class="d-flex align-items-center gap-2 flex-wrap">
                <label class="showing-results-text mb-0">{{ __('per_page') }}</label>
                <b-form-select :value="perPage" :options="pageOptions || $pageOptions" size="sm" class="w-auto"
                    @change="$emit('update:perPage', $event)"></b-form-select>
                <table-count :current-page="currentPage" :per-page="perPage" :total-rows="totalRows"></table-count>
            </div>
            <div class="d-flex align-items-center gap-3">
                <slot name="footer-end"></slot>
                <b-pagination :value="currentPage" :total-rows="totalRows" :per-page="perPage" align="right"
                    class="figma-pagination mb-0" hide-goto-end-buttons hide-ellipsis prev-text="<" next-text=">"
                    @input="$emit('update:currentPage', $event)"></b-pagination>
            </div>
        </div>
    </div>
</template>

<script>
/**
 * Shared list table: <b-table> with the standard look, loading row, empty states and the
 * footer (per page, item count, pagination). Pages pass their fields/items and cell slots.
 *
 *   <data-table :items="rows" :fields="fields" :busy="isLoading" :total-rows="totalRows"
 *       :current-page.sync="currentPage" :per-page.sync="perPage">
 *       <template #cell(actions)="row">...</template>
 *   </data-table>
 *
 * Server-side paging (API returns one page): default. Client-side paging (all rows loaded):
 * add `local-paging`. Any other b-table prop/event (filter, sort-by.sync, @filtered, ...) passes through.
 */
export default {
    name: 'DataTable',
    inheritAttrs: false,
    props: {
        items: { type: [Array, Function], default: () => [] },
        fields: { type: Array, default: null },
        busy: { type: Boolean, default: false },
        totalRows: { type: [Number, String], default: 0 },
        currentPage: { type: [Number, String], default: 1 },
        perPage: { type: [Number, String], default: 10 },
        pageOptions: { type: Array, default: null },
        localPaging: { type: Boolean, default: false },
        hideFooter: { type: Boolean, default: false },
        stacked: { type: [String, Boolean], default: 'md' },
        small: { type: Boolean, default: true },
        tableClass: { type: [String, Array, Object], default: '' },
        tbodyTrClass: { type: [String, Array, Object, Function], default: () => 'figma-tr align-middle' },
        emptyText: { type: String, default: '' },
        emptyFilteredText: { type: String, default: '' },
    },
};
</script>
