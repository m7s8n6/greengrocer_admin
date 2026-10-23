<template>
    <div>
        <div class="page-heading">
            <div class="page-title mb-4">
                <div class="d-flex justify-content-between align-items-center flex-wrap gap-2">
                    <h3 class="modern-page-title mb-0">{{ __('fund_transfers') }}</h3>
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb mb-0">
                            <li class="breadcrumb-item">
                                <router-link to="/delivery_boy/dashboard" class="text-muted">{{ __('dashboard') }}</router-link>
                            </li>
                            <li class="breadcrumb-item active text-primary" aria-current="page">{{ __('fund_transfers') }}</li>
                        </ol>
                    </nav>
                </div>
            </div>
            <section class="section">
                <div class="figma-main-section-card">
                    <div class="card-body p-0">
                        <!-- Action Bar: Search + Refresh + Add -->
                        <div class="d-flex justify-content-between align-items-center flex-wrap gap-2 figma-action-bar-row">
                            <div class="flex-grow-1">
                                <div class="figma-search-container">
                                    <i class="fa fa-search text-muted"></i>
                                    <input v-model="filter" type="text" class="figma-search-input"
                                        :placeholder="__('search') || 'Search...'">
                                </div>
                            </div>
                            <div class="d-flex gap-2">
                                <button class="btn btn-figma-filter d-flex align-items-center gap-2" v-b-tooltip.hover :title="__('refresh')" @click="getFundTransfers()">
                                    <i class="fa fa-refresh" aria-hidden="true"></i>
                                    <span>{{ __('refresh') }}</span>
                                </button>
                                <button class="btn btn-figma-filter d-flex align-items-center gap-2" @click="create_new=true"
                                        v-if="$can('fund_transfers_create')">
                                    <i class="fa fa-plus"></i>
                                    <span>{{ __('add_fund_transfers') }}</span>
                                </button>
                            </div>
                        </div>

                        <!-- Table -->
                        <div class="table-responsive mb-0">
                            <b-table
                                :items="fundTransfers"
                                :fields="fields"
                                :current-page="currentPage"
                                :per-page="perPage"
                                :filter="filter"
                                :filter-included-fields="filterOn"
                                :sort-by.sync="sortBy"
                                :sort-desc.sync="sortDesc"
                                :sort-direction="sortDirection"
                                :bordered="false"
                                :busy="isLoading"
                                stacked="md"
                                show-empty
                                :tbody-tr-class="() => 'figma-tr align-middle'"
                                class="figma-order-table mb-0"
                                small>
<template #empty="scope">
<div class="text-center text-muted py-4"><i class="fa fa-inbox fa-2x d-block mb-2"></i>{{ scope.emptyText }}</div>
</template>
<template #emptyfiltered="scope">
<div class="text-center text-muted py-4"><i class="fa fa-search fa-2x d-block mb-2"></i>{{ scope.emptyFilteredText }}</div>
</template>

                                <template #table-busy>
                                    <div class="text-center py-4">
                                        <b-spinner class="align-middle text-muted"></b-spinner>
                                    </div>
                                </template>
                                <template #head(opening_balance)="row">
                                    {{__('opening_balance') + ' ('+$currency+')' }}
                                </template>
                                <template #head(closing_balance)="row">
                                    {{__('closing_balance') + ' ('+$currency+')' }}
                                </template>
                                <template #head(amount)="row">
                                    {{__('amount') + ' ('+$currency+')' }}
                                </template>

                                <template #cell(type)="row">
                                    <span v-if="row.item.type === 'credit'" class="figma-status-pill bg-success">{{ __('credit') }}</span>
                                    <span v-else class="figma-status-pill bg-danger">{{ __('debit') }}</span>
                                </template>

                                <template #cell(status)="row">
                                    <span v-if="row.item.status === '1'" class="figma-status-pill bg-success">{{ __('active') }}</span>
                                    <span v-else class="figma-status-pill bg-danger">{{ __('deactive') }}</span>
                                </template>
                                
                                <template #cell(created_at)="row">
                                    <div class="d-flex flex-column">
                                        <span class="figma-date-bold">{{ formatDateBold(row.item.created_at) }}</span>
                                        <span class="figma-time-light">{{ formatTimeLight(row.item.created_at) }}</span>
                                    </div>
                                </template>
                            </b-table>
                        </div>
                        
                        <!-- Footer: Totals + Pagination -->
                        <div class="figma-table-footer flex-wrap gap-3">
                            <div class="d-flex align-items-center gap-4">
                                <div class="d-flex align-items-center gap-3 flex-wrap">
<div class="d-flex align-items-center gap-2">
<label class="showing-results-text mb-0">{{ __('per_page') }}</label>
<b-form-select v-model="perPage" :options="pageOptions" size="sm" class="w-auto"></b-form-select>
</div>
<table-count :current-page="currentPage" :per-page="perPage" :total-rows="totalRows"></table-count>
</div>
                            </div>
                            <div class="d-flex align-items-center gap-3">
                                <b-pagination
                                    v-model="currentPage"
                                    :total-rows="totalRows"
                                    :per-page="perPage"
                                    align="right"
                                    class="figma-pagination mb-0"
                                    hide-goto-end-buttons hide-ellipsis prev-text="<" next-text=">"></b-pagination>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>
<script>
import moment from "moment";

export default {

    data: function () {
        return {
            fields: [
                {key: 'id', label: __('id'), sortable: true, sortDirection: 'desc'},
                {key: 'opening_balance', label: __('opening_balance'), sortable: true},
                {key: 'closing_balance', label: __('closing_balance'), sortable: true},
                {key: 'amount', label: __('amount'), sortable: true},
                {key: 'type', label: __('type'), sortable: true},
                {key: 'message', label: __('message'), sortable: true},
                {key: 'status', label: __('status'), sortable: true},
                {key: 'created_at', label: __('date_created'), sortable: true}
            ],
            totalRows: 1,
            currentPage: 1,
            perPage: this.$perPage,
            pageOptions: this.$pageOptions,
            sortBy: '',
            sortDesc: false,
            sortDirection: 'asc',
            filter: null,
            filterOn: [],
            page: 1,

            isLoading: false,

            max_visible_units: 12,
            max_col_in_single_row: 3,

            fundTransfers: [],
        }
    },
    computed: {
        pageStart() {
            if (this.totalRows === 0) return 0;
            return (this.currentPage - 1) * this.perPage + 1;
        },
        pageEnd() {
            return Math.min(this.currentPage * this.perPage, this.totalRows);
        },
        sortOptions() {
            // Create an options list from our fields
            return this.fields
                .filter(f => f.sortable)
                .map(f => {
                    return {text: f.label, value: f.key}
                })
        }
    },
    mounted() {
        // Set the initial number of items
        this.totalRows = this.fundTransfers.length
    },
    created: function () {
        this.getFundTransfers();
    },
    methods: {
        formatDateBold(date) {
            if (!date) return '';
            return moment(date).format('DD MMM YYYY');
        },
        formatTimeLight(date) {
            if (!date) return '';
            return moment(date).format('hh:mm A');
        },
        getFundTransfers() {
            this.isLoading = true
            axios.get(this.$deliveryBoyApiUrl + '/fund_transfers')
                .then((response) => {
                    this.isLoading = false
                    this.fundTransfers = response.data.data;
                    this.totalRows = this.fundTransfers.length;
                    this.isLoading = false;
                });
        },
    }
};
</script>
