<template>
    <div>
        <div class="page-heading">
            <div class="page-title">
                <div class="row">
                    <div class="col-12 col-md-6 order-md-1 order-last">
                        <h3>{{ __('manage_customer_wallet') }}</h3>
                    </div>
                    <div class="col-12 col-md-6 order-md-2 order-first">
                        <nav aria-label="breadcrumb" class="breadcrumb-header float-start float-lg-end">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item">
                                    <router-link to="/dashboard">{{ __('dashboard') }}</router-link>
                                </li>
                                <li class="breadcrumb-item active" aria-current="page">{{ __('manage_customer_wallet')
                                    }}</li>
                            </ol>
                        </nav>
                    </div>
                </div>
            </div>
            <section class="section">
                <div class="figma-main-section-card">
                    <div class="card-body p-0">
                        <div class="d-flex justify-content-between align-items-center flex-wrap gap-2 figma-action-bar-row">
                            <div class="d-flex align-items-center gap-2 flex-grow-1 flex-wrap">
                                <div class="figma-search-container">
                                    <i class="fa fa-search text-muted"></i>
                                    <input v-model="filter" type="text" class="figma-search-input"
                                        :placeholder="__('search')">
                                </div>
                            </div>
                            <div class="d-flex gap-2 align-items-center flex-wrap">
                                <button class="btn btn-figma-filter d-flex align-items-center gap-2" @click="getWalletTransactions()" v-b-tooltip.hover :title="__('refresh')">
                                    <i class="fa fa-refresh"></i>
                                    <span>{{ __('refresh') }}</span>
                                </button>
                                <button class="btn btn-figma-filter d-flex align-items-center gap-2" @click="create_new = true">
                                    <i class="fa fa-plus"></i>
                                    <span>{{ __('add_transactions') }}</span>
                                </button>
                            </div>
                        </div>
                        <div class="table-responsive">
                            <b-table :items="walletTransactions" :fields="fields" :current-page="currentPage"
                                :per-page="perPage" :filter="filter" :filter-included-fields="filterOn"
                                :sort-by.sync="sortBy" :sort-desc.sync="sortDesc" :sort-direction="sortDirection"
                                :bordered="false" :busy="isLoading" stacked="md" show-empty small
                                class="figma-table mb-0"
                                :tbody-tr-class="() => 'figma-tr align-middle'">
<template #empty="scope">
<div class="text-center text-muted py-4"><i class="fa fa-inbox fa-2x d-block mb-2"></i>{{ scope.emptyText }}</div>
</template>
<template #emptyfiltered="scope">
<div class="text-center text-muted py-4"><i class="fa fa-search fa-2x d-block mb-2"></i>{{ scope.emptyFilteredText }}</div>
</template>

                                <template #table-busy>
                                    <div class="text-center text-muted my-3">
                                        <b-spinner class="align-middle"></b-spinner>
                                        <strong>{{ __('loading') }}...</strong>
                                    </div>
                                </template>

                                <template #head(amount)="row">
                                    {{ __('amount') }} ({{ $currency }})
                                </template>

                                <template #cell(amount)="row">
                                    {{ $formatAmount(row.item.amount) }}
                                </template>

                                <template #cell(type)="row">
                                    <span v-if="row.item.type === 'credit'" class="figma-status-pill bg-success">{{ __('credit')
                                        }}</span>
                                    <span v-else class="figma-status-pill bg-danger">{{ __('debit') }}</span>
                                </template>

                                <template #cell(transaction_date)="row">
                                    {{ row.item.transaction_date }}
                                </template>
                                <template #cell(updated_at)="row">
                                    {{ row.item.updated_at }}
                                </template>

                            </b-table>
                        </div>
                        <div class="figma-table-footer flex-wrap gap-3">
                            <div class="d-flex align-items-center gap-3 flex-wrap">
<div class="d-flex align-items-center gap-2">
<label class="showing-results-text mb-0">{{ __('per_page') }}</label>
<b-form-select v-model="perPage" :options="pageOptions" size="sm" class="w-auto"></b-form-select>
</div>
<table-count :current-page="currentPage" :per-page="perPage" :total-rows="totalRows"></table-count>
</div>
                            <div class="d-flex align-items-center gap-3">
                                <b-pagination v-model="currentPage" :total-rows="totalRows" :per-page="perPage"
                                    align="right" class="figma-pagination mb-0"
                                    hide-goto-end-buttons hide-ellipsis prev-text="<" next-text=">">
                                </b-pagination>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
        <!-- Add / Edit -->
        <app-edit-record v-if="create_new || edit_record" :record="edit_record" :customers="customers"
            @modalClose="hideModal()"></app-edit-record>
    </div>
</template>
<script>
import EditRecord from './Edit';

export default {
    components: {
        'app-edit-record': EditRecord,
    },
    data: function () {
        return {
            fields: [
                { key: 'id', label: __('id'), sortable: true, sortDirection: 'desc' },
                { key: 'user_id', label: __('user_id'), sortable: true },
                { key: 'name', label: __('user_name'), sortable: true },
                { key: 'type', label: __('type'), sortable: true },
                { key: 'payment_type', label: __('payment_type'), sortable: true },
                { key: 'txn_id', label: __('txn_id'), sortable: true },
                { key: 'amount', label: __('amount'), sortable: true },
                { key: 'message', label: __('message'), sortable: true },
                { key: 'transaction_date', label: __('transaction_date'), sortable: true },
                { key: 'updated_at', label: __('last_updated'), sortable: true }
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
            create_new: null,
            edit_record: null,

            customers: null,
            walletTransactions: [],
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
        this.totalRows = this.walletTransactions.length
    },
    created: function () {
        this.$eventBus.$on('walletTransactionsSaved', (message) => {
            //this.showSuccess(message);
            this.showMessage("success", message);
            this.getWalletTransactions();
            this.create_new = null;
        });
        this.getWalletTransactions();
    },
    methods: {
        getWalletTransactions() {
            this.isLoading = true
            axios.get(this.$apiUrl + '/wallet_transactions')
                .then((response) => {
                    this.isLoading = false
                    this.walletTransactions = response.data.data.walletTransactions;
                    this.customers = response.data.data.customers;
                    this.totalRows = this.walletTransactions.length
                });
        },
        hideModal() {
            this.create_new = false
            this.edit_record = false
        },
    }
};
</script>
