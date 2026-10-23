<template>
    <div>
        <div class="page-heading d-flex flex-wrap justify-content-between align-items-center gap-2 mb-4">
            <h3 class="modern-page-title mb-0">{{ __('return_requests') }}</h3>
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb mb-0">
                    <li class="breadcrumb-item"><router-link :to="isSellerRoute ? '/seller/dashboard' : (isDeliveryBoyRoute ? '/delivery_boy/dashboard' : '/dashboard')" class="text-muted">{{ __('dashboard') }}</router-link></li>
                    <li class="breadcrumb-item active text-primary" aria-current="page">{{ __('return_requests') }}</li>
                </ol>
            </nav>
        </div>

        <section class="section">
            <div class="figma-main-section-card">
                <div class="card-body p-0">
                    <div class="d-flex justify-content-between align-items-center flex-wrap gap-2 figma-action-bar-row">
                        <div class="flex-grow-1">
                            <div class="figma-search-container">
                                <i class="fa fa-search text-muted"></i>
                                <input v-model="filter" type="text" class="figma-search-input"
                                    :placeholder="__('search')">
                            </div>
                        </div>
                        <div class="d-flex gap-2">
                            <button class="btn btn-figma-filter d-flex align-items-center gap-2"
                                @click="getReturnRequests()" v-b-tooltip.hover :title="__('refresh')">
                                <i class="fa fa-refresh"></i>
                                <span>{{ __('refresh') }}</span>
                            </button>
                        </div>
                    </div>

                    <div class="table-responsive mb-0">
                        <b-table :items="returnRequestsForTable" :fields="fields" :current-page="isPaginatedApi ? 1 : currentPage"
                            :per-page="perPage" :sort-direction="sortDirection" :bordered="false" :busy="isLoading"
                            stacked="md" show-empty :tbody-tr-class="() => 'figma-tr align-middle'" small
                            class="figma-order-table mb-0">
                            <template #empty="scope">
                                <div class="text-center text-muted py-4"><i class="fa fa-inbox fa-2x d-block mb-2"></i>{{ scope.emptyText }}</div>
                            </template>
                            <template #emptyfiltered="scope">
                                <div class="text-center text-muted py-4"><i class="fa fa-search fa-2x d-block mb-2"></i>{{ scope.emptyFilteredText }}</div>
                            </template>

                            <template #table-busy>
                                <div class="text-center text-black my-2">
                                    <b-spinner class="align-middle"></b-spinner>
                                    <strong>{{ __('loading') }}...</strong>
                                </div>
                            </template>

                            <template #head(price)="row">
                                {{ 'Price (' + $currency + ')' }}
                            </template>
                            <template #head(discounted_price)="row">
                                {{ 'Discounted Price (' + $currency + ')' }}
                            </template>

                            <template #cell(status)="row">
                                <span v-if="row.item.status === 1" class="badge bg-warning">{{ __('pending')
                                }}</span>
                                <span v-else-if="row.item.status === 2" class="badge bg-success">{{ __('approved')
                                }}</span>
                                <span v-else-if="row.item.status === 3" class="badge bg-danger">{{ __('rejected')
                                }}</span>
                                <span v-else-if="row.item.status === 4" class="badge bg-info">{{
                                    __('delivery_boy_assigned') }}</span>
                                <span v-else-if="row.item.status === 5" class="badge bg-primary">{{
                                    __('out_for_pickup') }}</span>
                                <span v-else-if="row.item.status === 6" class="badge bg-secondary">{{
                                    __('received_from_customer') }}</span>
                                <span v-else-if="row.item.status === 7" class="badge bg-danger">{{ __('cancelled')
                                }}</span>
                                <span v-else-if="row.item.status === 8" class="badge bg-dark">{{
                                    __('return_to_seller') }}</span>
                                <span v-else class="badge bg-danger">{{ __('undefined') }}</span>
                            </template>
                            <template #cell(created_at)="row">
                                {{ row.item.created_at }}
                            </template>
                            <template #cell(reason)="row">
                                <div class="reason-cell-text">{{ row.item.reason }}</div>
                            </template>
                            <!-- Resolve name, product_name, variant_name when API sends object by lang code -->
                            <template #cell(name)="row">
                                {{ row.item.customer_name || row.item.name }}
                            </template>
                            <template #cell(product_name)="row">
                                {{ row.item.product_name }}
                            </template>
                            <template #cell(variant_name)="row">
                                {{ row.item.variant_name }}
                            </template>
                            <template #cell(actions)="row">
                                <div class="d-flex gap-2">
                                    <button class="figma-action-btn" @click="edit_record = row.item"
                                        v-if="$can('return_request_update')" v-b-tooltip.hover :title="__('edit')">
                                        <i class="bi bi-pencil"></i>
                                    </button>
                                    <button class="figma-action-btn figma-delete-btn"
                                        @click="deleteReturnRequests(row.index, row.item.id)"
                                        v-if="$can('return_request_delete')" v-b-tooltip.hover :title="__('delete')">
                                        <i class="bi bi-trash"></i>
                                    </button>
                                </div>
                            </template>

                        </b-table>
                    </div>

                    <div class="figma-table-footer flex-wrap gap-3">
                        <div class="d-flex align-items-center gap-2">
                            <label class="showing-results-text mb-0">{{ __('per_page') }}</label>
                            <b-form-select v-model="perPage" :options="pageOptions" size="sm"
                                style="width: auto;"></b-form-select>
                                <table-count :current-page="currentPage" :per-page="perPage" :total-rows="totalRows"></table-count>
                        </div>
                        <div class="d-flex align-items-center gap-3">
                            <b-pagination v-model="currentPage" :total-rows="totalRows" :per-page="perPage"
                                align="right" class="figma-pagination mb-0" hide-goto-end-buttons hide-ellipsis
                                prev-text="<" next-text=">"></b-pagination>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Add / Edit -->
        <app-edit-record v-if="create_new || edit_record" :record="edit_record"
            @modalClose="hideModal()"></app-edit-record>
    </div>
</template>

<script>
import EditRecord from './Edit';
import Auth from '../../Auth.js';

export default {
    components: {
        'app-edit-record': EditRecord,
    },
    data: function () {
        return {
            login_user: Auth.user,
            fields: [
                { key: 'id', label: __('id'), sortable: true, sortDirection: 'desc' },
                { key: 'user_id', label: __('user_id'), sortable: true, class: 'text-center' },
                { key: 'name', label: __('name'), sortable: true, class: 'text-center' },
                { key: 'product_name', label: __('product_name'), sortable: true, class: 'text-center' },
                { key: 'variant_name', label: __('variant'), sortable: true, class: 'text-center' },
                { key: 'quantity', label: __('quantity'), sortable: true, class: 'text-center' },
                { key: 'sub_total', label: __('total'), sortable: true, class: 'text-center' },
                ...(Auth.user.role_id == 4 ? [{ key: 'delivery_boy_bonus_amount', label: __('bonus') || 'Bonus', sortable: true, class: 'text-center' }] : []),
                { key: 'status', label: __('status'), sortable: true, class: 'text-center' },
                { key: 'reason', label: __('reason'), sortable: true, class: 'text-center' },
                { key: 'created_at', label: __('date'), sortable: true, class: 'text-center' },
                { key: "actions", label: __("actions") }
            ],
            totalRows: 1,
            currentPage: 1,
            perPage: this.$perPage,
            pageOptions: this.$pageOptions,
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
            returnRequests: [],
        }
    },
    computed: {
        isSellerRoute() {
            return this.$route.path.startsWith('/seller/');
        },
        isDeliveryBoyRoute() {
            return this.$route.path.startsWith('/delivery_boy/');
        },
        isPaginatedApi() {
            return this.login_user.role_id == 3 || this.login_user.role_id == 4;
        },
        pageStart() {
            if (this.totalRows === 0) return 0;
            return (this.currentPage - 1) * this.perPage + 1;
        },
        pageEnd() {
            return Math.min(this.currentPage * this.perPage, this.totalRows);
        },
        appLocale() {
            return (typeof window !== 'undefined' && (window.appLocale || (window.localStorage && window.localStorage.getItem('lang')))) || 'en';
        },
        returnRequestsForTable() {
            return this.returnRequests || [];
        },
        sortOptions() {
            // Create an options list from our fields
            return this.fields
                .filter(f => f.sortable)
                .map(f => {
                    return { text: f.label, value: f.key }
                })
        }
    },
    mounted() {
        // totalRows set in getReturnRequests when data loads
    },
    created: function () {
        this._handleReturnRequestSaved = (message) => {
            this.showMessage("success", message);
            this.getReturnRequests();
            this.create_new = null;
        };
        this.$eventBus.$on('returnRequestSaved', this._handleReturnRequestSaved);
        this.getReturnRequests();
    },
    beforeDestroy() {
        this.$eventBus.$off('returnRequestSaved', this._handleReturnRequestSaved);
    },
    watch: {
        filter() {
            this.currentPage = 1;
            this.getReturnRequests();
        },
        currentPage() {
            if (this.login_user.role_id == 3 || this.login_user.role_id == 4) {
                this.getReturnRequests();
            }
        },
        perPage() {
            this.currentPage = 1;
            if (this.login_user.role_id == 3 || this.login_user.role_id == 4) {
                this.getReturnRequests();
            }
        }
    },
    methods: {

        getReturnRequests() {
            this.isLoading = true

            let apiEndpoint = '/return_requests';
            if (this.login_user.role_id == 3) { // Seller
                apiEndpoint = '/seller/return_requests';
            } else if (this.login_user.role_id == 4) { // Delivery Boy
                apiEndpoint = '/delivery_boy/return_requests';
            }

            const isPaginatedApi = this.isPaginatedApi;
            const offset = isPaginatedApi ? (this.currentPage - 1) * this.perPage : 0;
            const limit = isPaginatedApi ? this.perPage : 1000;

            let url = this.$apiUrl + apiEndpoint + "?search=" + encodeURIComponent(this.filter || "");
            if (isPaginatedApi) {
                url += "&offset=" + offset + "&limit=" + limit;
            }

            axios.get(url)
                .then((response) => {
                    this.returnRequests = response.data.data || [];
                    this.totalRows = (isPaginatedApi && response.data.total) ? response.data.total : this.returnRequests.length;
                    this.isLoading = false;
                });
        },
        deleteReturnRequests(index, id) {
            this.$swal.fire({
                title: __('are_you_sure'),
                text: __('you_want_be_able_to_revert_this'),
                confirmButtonText: __('yes_sure'),
                cancelButtonText: __('cancel'),
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: 'var(--theme-primary-500)',
                cancelButtonColor: 'var(--theme-error-500)',
            }).then(result => {

                if (result.value) {
                    this.isLoading = true
                    let postData = {
                        id: id
                    }

                    let apiEndpoint = '/return_requests/delete';
                    if (this.login_user.role_id == 3) {
                        apiEndpoint = '/seller/return_requests_delete';
                    }

                    axios.post(this.$apiUrl + apiEndpoint, postData)
                        .then((response) => {
                            this.isLoading = false
                            this.returnRequests.splice(index, 1)
                            this.showSuccess(response.data.message)
                        });
                }
            });
        },
        hideModal() {
            this.create_new = false
            this.edit_record = false
        },
    }
};
</script>
<style scoped>
.reason-cell-text {
    white-space: normal;
    word-break: break-word;
    max-width: 320px;
    text-align: start;
    font-size: 13px;
}

/* Neutral statuses (received from customer / return to seller) as soft pills */
.badge.bg-secondary,
.badge.bg-dark {
    background: var(--ui-surface-muted) !important;
    color: var(--ui-text) !important;
    border-color: var(--ui-border) !important;
}

.figma-table-footer {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
    padding: 14px 20px !important;
    border-top: 1px solid var(--ui-border);
    background: var(--ui-surface);
}

@media (max-width: 767.98px) {
    .figma-table-footer {
        justify-content: center;
        padding: 12px 16px !important;
    }

    .reason-cell-text {
        max-width: none;
    }
}
</style>
