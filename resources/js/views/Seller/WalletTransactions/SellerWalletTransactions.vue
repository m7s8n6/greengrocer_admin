<template>
    <div>
        <div class="page-heading d-flex justify-content-between align-items-center mb-4">
            <h3 class="modern-page-title mb-0">{{ __('wallet_transactions') }}</h3>
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb mb-0">
                    <li class="breadcrumb-item">
                        <router-link to="/dashboard" class="text-muted">{{ __('dashboard') }}</router-link>
                    </li>
                    <li class="breadcrumb-item active text-primary" aria-current="page">{{ __('wallet_transactions') }}
                    </li>
                </ol>
            </nav>
        </div>
        <section class="section">
            <div class="figma-main-section-card">
                <div class="card-body p-0">
                    <!-- Modern Filter Action Bar -->
                    <div class="d-flex justify-content-between align-items-center flex-wrap gap-2 figma-action-bar-row">
                        <div class="flex-grow-1">
                            <div class="figma-search-container">
                                <i class="fa fa-search text-muted"></i>
                                <input v-model="filter" type="text" class="figma-search-input"
                                    :placeholder="__('search') || 'Search...'" @input="getWalletTransactions()">
                            </div>
                        </div>
                        <div class="d-flex gap-2">

                            <button class="btn btn-figma-filter d-flex align-items-center gap-2"
                                @click="getWalletTransactions()" v-b-tooltip.hover :title="__('refresh')">
                                <i class="fa fa-refresh"></i>
                                <span>{{ __('refresh') }}</span>
                            </button>
                            <button class="btn btn-figma-filter d-flex align-items-center gap-2"
                                @click="create_new = true"
                                v-if="login_user && login_user.role && (login_user.role.name === 'Super Admin' || login_user.role.name === 'Admin')">
                                <i class="fa fa-plus"></i>
                                <span>{{ __('add_transactions') }}</span>
                            </button>
                        </div>
                    </div>
                    <div class="table-responsive">
                        <b-table :items="walletTransactions" :fields="fields" :filter-included-fields="filterOn"
                            :sort-by.sync="sortBy" :sort-desc.sync="sortDesc" :sort-direction="sortDirection"
                            :bordered="false" :busy="isLoading" stacked="md" show-empty
                            :tbody-tr-class="() => 'figma-tr align-middle'" small class="figma-order-table mb-0">
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

                            <template #cell(type)="row">
                                <span class="badge text-capitalize" :class="getTypeBadgeClass(row.item.type)">
                                    {{ row.item.type }}
                                </span>
                            </template>

                            <template #cell(module_name)="row">
                                <span class="badge text-capitalize" :class="row.item.module_id === 2 ? 'bg-info' : 'bg-primary'">
                                    {{ row.item.module_name || 'Grocery' }}
                                </span>
                            </template>

                            <template #cell(status)="row">
                                <span class="badge" :class="getStatusBadgeClass(row.item.status)">
                                    {{ row.item.status === 1 ? __('active') : __('deactive') }}
                                </span>
                            </template>

                            <template #cell(created_at)="row">
                                {{ row.item.created_at }}
                            </template>
                            <template #cell(amount)="row">
                                {{ row.item.amount }}
                            </template>
                            <template #cell(actions)="row">
                                <div class="d-flex gap-2 justify-content-center">
                                    <button class="figma-action-btn" @click="row.toggleDetails" v-b-tooltip.hover
                                        :title="__('view')">
                                        <base-icon v-if="row.detailsShowing" name="Eye" hoverName="Type=Hover (1)"
                                            width="24" height="24" />
                                        <base-icon v-else name="Eye" hoverName="Type=Hover (1)" width="24"
                                            height="24" />
                                    </button>
                                </div>
                            </template>

                            <template #row-details="row">
                                <b-card no-body class="p-3 p-md-4 txn-details mb-0">
                                    <div class="d-flex align-items-center mb-3 pb-2 border-bottom">
                                        <h6 class="mb-0 font-weight-bold"><i class="fa fa-file-text-o me-1 text-primary"></i> {{
                                            __('transaction_details') }}</h6>
                                    </div>

                                    <div class="row g-4 text-break">
                                        <!-- Column 1: IDs -->
                                        <div class="col-md-3">
                                            <div class="mb-3">
                                                <label class="text-muted small text-uppercase fw-bold d-block">{{
                                                    __('id') }}</label>
                                                <span class="fs-6">#{{ row.item.id }}</span>
                                            </div>
                                            <div class="mb-3">
                                                <label class="text-muted small text-uppercase fw-bold d-block">{{
                                                    __('order_id') }}</label>
                                                <span class="fs-6">#{{ row.item.order_id }}</span>
                                            </div>
                                            <div class="mb-3">
                                                <label class="text-muted small text-uppercase fw-bold d-block">{{
                                                    __('seller_id') }}</label>
                                                <span class="fs-6">{{ row.item.seller_id }}</span>
                                            </div>
                                            <div class="mb-0">
                                                <label class="text-muted small text-uppercase fw-bold d-block">{{
                                                    __('module') }}</label>
                                                <span class="fs-6">{{ row.item.module_name || 'Grocery' }}</span>
                                            </div>
                                        </div>

                                        <!-- Column 2: Item Info -->
                                        <div class="col-md-5">
                                            <div class="mb-0">
                                                <label class="text-muted small text-uppercase fw-bold d-block">{{
                                                    __('product') }}</label>
                                                <span class="fs-6">{{ row.item.product_name }}</span>
                                            </div>
                                        </div>

                                        <!-- Column 3: Financials & Status -->
                                        <div class="col-md-4">
                                            <div class="mb-3">
                                                <label class="text-muted small text-uppercase fw-bold d-block">{{
                                                    __('amount') }}</label>
                                                <span class="fs-6 fw-bold">₹{{ row.item.amount }}</span>
                                            </div>
                                            <div class="mb-3">
                                                <label class="text-muted small text-uppercase fw-bold d-block">{{
                                                    __('type') }}</label>
                                                <span class="fs-6 text-capitalize">{{ row.item.type }}</span>
                                            </div>
                                            <div class="mb-0">
                                                <label class="text-muted small text-uppercase fw-bold d-block">{{
                                                    __('status') }}</label>
                                                <span class="fs-6">{{ row.item.status === 1 ? __('active') :
                                                    __('deactive') }}</span>
                                            </div>
                                        </div>

                                        <!-- Message Row -->
                                        <div
                                            class="col-12 mt-3">
                                            <div class="txn-message">
                                            <label class="text-muted small text-uppercase fw-bold d-block mb-1">{{
                                                __('message') }}</label>
                                            <p class="mb-0 text-dark fs-6 white-space-pre-wrap">{{ row.item.message }}
                                            </p>
                                            </div>
                                        </div>
                                    </div>
                                </b-card>
                            </template>

                        </b-table>
                    </div>
                    <div class="figma-table-footer flex-wrap gap-3">
                        <div class="d-flex align-items-center gap-2">
                            <label class="showing-results-text mb-0">{{ __('per_page') }}</label>
                            <b-form-select v-model="perPage" :options="pageOptions" size="sm"
                                class="w-auto"></b-form-select>
                                <table-count :current-page="currentPage" :per-page="perPage" :total-rows="totalRows"></table-count>
                        </div>
                        <b-pagination v-model="currentPage" @input="getWalletTransactions()" :total-rows="totalRows"
                            :per-page="perPage" align="right" class="figma-pagination mb-0"
                            hide-goto-end-buttons hide-ellipsis prev-text="<" next-text=">"></b-pagination>
                    </div>
                </div>
            </div>
        </section>
        <!-- Add / Edit -->
        <app-edit-record v-if="create_new || edit_record" :record="edit_record" :sellers="sellers"
            @modalClose="hideModal()"></app-edit-record>
    </div>
</template>
<script>
import EditRecord from './Edit';
import Auth from '../../../Auth.js';

export default {
    components: {
        'app-edit-record': EditRecord,
    },

    data: function () {
        return {
            fields: [
                { key: 'id', label: __('id'), sortable: true, sortDirection: 'desc' },
                { key: 'seller_id', label: __('seller_id'), sortable: true },
                { key: 'name', label: __('seller_name'), sortable: true },
                { key: 'module_name', label: __('module'), sortable: true },
                { key: 'order_id', label: __('order_id'), sortable: true },
                { key: 'order_item_id', label: __('order_item_id'), sortable: true },
                { key: 'product_name', label: __('product_name'), sortable: true },
                { key: 'type', label: __('type'), sortable: true },
                { key: 'amount', label: __('amount'), sortable: true },
                { key: 'status', label: __('status'), sortable: true },
                { key: 'created_at', label: __('date'), sortable: true },
                { key: 'actions', label: __('actions'), class: 'text-center' },
            ],
            totalRows: 0,
            currentPage: 1,
            perPage: this.$perPage || 5,
            pageOptions: this.$pageOptions || [5, 10, 20, 50],
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

            sellers: null,
            walletTransactions: [],
            login_user: Auth.user,
            currentLanguageId: null,
            activeLanguages: []
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
        isSellerRoute() {
            // Use this.$route to access the current route
            return this.$route.path.startsWith('/seller/');
        },
        pageEnd() {
            return Math.min(this.currentPage * this.perPage, this.totalRows);
        },
    },
    created: function () {
        this.$eventBus.$on('sellerWalletTransactionsSaved', (message) => {
            this.showMessage("success", message);
            this.getWalletTransactions();
            this.create_new = null;
        });
        this.fetchActiveLanguages().then(() => {
            this.getWalletTransactions();
        });
    },
    watch: {
        perPage() {
            // the page buttons already reload on change (@input) - only reload here when the page stays 1
            if (this.currentPage !== 1) {
                this.currentPage = 1;
            } else {
                this.getWalletTransactions();
            }
        }
    },
    methods: {
        async fetchActiveLanguages() {
            try {
                const res = await axios.get(this.$apiUrl + '/active_languages');
                if (res.data.status === 1 && Array.isArray(res.data.data)) {
                    this.activeLanguages = res.data.data;
                    const appLocale = window.appLocale || 'en';
                    const currentLang = this.activeLanguages.find(
                        l => l.code === appLocale
                    );
                    if (currentLang) {
                        this.currentLanguageId = currentLang.id;
                    } else {
                        const def = this.activeLanguages.find(l => l.is_default === 1);
                        if (def) this.currentLanguageId = def.id;
                    }
                }
            } catch (e) {
                console.error('Language load failed', e);
            }
        },
        getTranslatedName(item) {
            if (!this.currentLanguageId) {
                return item.name || '';
            }
            if (item.translations && Array.isArray(item.translations)) {
                const translation = item.translations.find(
                    t => t.language_id === this.currentLanguageId
                );
                if (translation && translation.name && translation.name.trim() !== '') {
                    return translation.name;
                }
            }
            return item.name || '';
        },
        getWalletTransactions() {
            this.isLoading = true
            axios.get(this.$apiUrl + '/seller_wallet_transactions', {
                params: {
                    limit: this.perPage,
                    offset: (this.currentPage - 1) * this.perPage,
                    search: this.filter,
                }
            })
                .then((response) => {
                    this.isLoading = false;
                    if (Array.isArray(response.data.data)) {
                        this.walletTransactions = response.data.data;
                    } else if (response.data.data) {
                        this.walletTransactions = response.data.data.walletTransactions || [];
                        this.sellers = response.data.data.sellers || [];
                    } else {
                        this.walletTransactions = [];
                    }
                    this.totalRows = response.data.total;
                });
        },
        getTypeBadgeClass(type) {
            if (!type) {
                return 'bg-secondary';
            }
            const normalized = String(type).toLowerCase();

            if (['credit', 'add', 'added', 'receive', 'received'].includes(normalized)) {
                return 'bg-success';
            }
            if (['debit', 'deduct', 'deducted', 'withdraw', 'payout'].includes(normalized)) {
                return 'bg-danger';
            }

            return 'bg-secondary';
        },
        getStatusBadgeClass(status) {
            return status === 1 ? 'bg-success' : 'bg-danger';
        },
        hideModal() {
            this.create_new = false
            this.edit_record = false
        },
    }
};
</script>

<style scoped>
/* Expanded transaction details inside the table */
.txn-details {
    background: var(--ui-surface-muted);
    border: 1px solid var(--ui-border);
    border-radius: var(--ui-radius-lg);
    box-shadow: none;
    text-align: start;
}

.txn-details label {
    font-size: 11px;
    letter-spacing: 0.04em;
}

.txn-details .fs-6 {
    font-size: 13px !important; /* compact detail values (Bootstrap .fs-6 is !important) */
}

.txn-message {
    padding: 12px 14px;
    background: var(--ui-surface);
    border: 1px solid var(--ui-border);
    border-radius: var(--ui-radius);
}
</style>
