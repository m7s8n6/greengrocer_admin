<template>
    <div>
        <div class="page-heading">
            <div class="page-title">
                <div class="row">
                    <div class="col-12 col-md-6 order-md-1 order-last">
                        <h3>{{ __('transactions_list') }}</h3>
                    </div>
                    <div class="col-12 col-md-6 order-md-2 order-first">
                        <nav aria-label="breadcrumb" class="breadcrumb-header float-start float-lg-end">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><router-link to="/dashboard">{{ __('dashboard')
                                        }}</router-link></li>
                                <li class="breadcrumb-item active" aria-current="page">{{ __('transactions_list') }}
                                </li>
                            </ol>
                        </nav>
                    </div>
                </div>
            </div>
            <section class="section">
                <div class="figma-main-section-card">
                    <div class="card-body p-0">
                        <div
                            class="d-flex justify-content-between align-items-center flex-wrap gap-2 figma-action-bar-row">
                            <div class="d-flex align-items-center gap-2 flex-grow-1 flex-wrap">
                                <div class="figma-search-container">
                                    <i class="fa fa-search text-muted"></i>
                                    <input v-model="filter" type="text" class="figma-search-input"
                                        :placeholder="__('search')">
                                </div>
                            </div>
                            <div class="d-flex gap-2 align-items-center flex-wrap">
                                <button class="btn btn-figma-filter d-flex align-items-center gap-2"
                                    @click="getTransactions()" v-b-tooltip.hover :title="__('refresh')">
                                    <i class="fa fa-refresh"></i>
                                    <span>{{ __('refresh') }}</span>
                                </button>
                            </div>
                        </div>
                        <div class="table-responsive">
                            <data-table :items="transactions" :fields="fields" :filter="filter"
                                :filter-included-fields="filterOn" :sort-by.sync="sortBy" :sort-desc.sync="sortDesc"
                                :sort-direction="sortDirection" :busy="isLoading" :total-rows="totalRows"
                                :current-page.sync="currentPage" :per-page.sync="perPage" :page-options="pageOptions"
                                local-paging>

                                <template #head(amount)="row">
                                    {{ __('amount') }} ({{ $currency }})
                                </template>
                                <template #cell(txn_id)="row">
                                    <span class="small text-muted text-break">{{ row.item.txn_id }}</span>
                                </template>
                                <template #cell(transaction_date)="row">
                                    <span class="text-nowrap">{{ row.item.transaction_date }}</span>
                                </template>
                                <template #cell(status)="row">
                                    <span v-if="row.item.status" class="figma-status-pill text-capitalize"
                                        :class="['success', 'settlement', 'capture', 'paid', 'completed'].includes(String(row.item.status).toLowerCase()) ? 'bg-success'
                                            : (['pending', 'awaiting_payment', 'processing'].includes(String(row.item.status).toLowerCase()) ? 'bg-warning'
                                            : (['failed', 'failure', 'cancel', 'cancelled', 'canceled', 'deny', 'expire', 'refund'].includes(String(row.item.status).toLowerCase()) ? 'bg-danger' : 'bg-info'))">
                                        {{ row.item.status }}
                                    </span>
                                </template>
                            </data-table>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>
<script>
export default {
    data: function () {
        return {
            fields: [
                { key: 'id', label: __('id'), sortable: true, sortDirection: 'desc' },
                { key: 'name', label: __('name'), sortable: true },
                { key: 'order_id', label: __('order_id'), sortable: true },
                { key: 'type', label: __('type'), sortable: true },
                { key: 'txn_id', label: __('txn_id'), sortable: true },
                { key: 'amount', label: __('amount'), sortable: true },
                { key: 'message', label: __('message'), sortable: true },
                { key: 'transaction_date', label: __('transaction_date'), sortable: true },
                { key: 'status', label: __('status'), sortable: true }
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
            sectionStyle: 'style_1',
            max_visible_units: 12,
            max_col_in_single_row: 3,
            transactions: [],
        }
    },
    computed: {
        sortOptions() {
            // Create an options list from our fields
            return this.fields
                .filter(f => f.sortable)
                .map(f => {
                    return { text: f.label, value: f.key }
                })
        },
        pageEnd() {
            return Math.min(this.currentPage * this.perPage, this.totalRows);
        }
    },
    mounted() {
        // Set the initial number of items
        this.totalRows = this.transactions.length
    },
    created: function () {
        this.getTransactions();
    },
    methods: {
        getTransactions() {
            this.isLoading = true
            axios.get(this.$apiUrl + '/transactions')
                .then((response) => {
                    this.isLoading = false
                    this.transactions = response.data.data;
                    this.totalRows = this.transactions.length
                });
        },
    }
};
</script>
