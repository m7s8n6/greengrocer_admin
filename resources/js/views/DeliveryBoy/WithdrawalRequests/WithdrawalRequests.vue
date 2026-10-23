<template>
    <div>
        <div class="page-heading">
            <div class="page-title mb-4">
                <div class="d-flex justify-content-between align-items-center flex-wrap gap-2">
                    <h3 class="modern-page-title mb-0">{{ __('manage_withdrawal_requests') }}</h3>
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb mb-0">
                            <li class="breadcrumb-item">
                                <router-link to="/delivery_boy/dashboard" class="text-muted">{{ __('dashboard')
                                    }}</router-link>
                            </li>
                            <li class="breadcrumb-item active text-primary" aria-current="page">{{
                                __('manage_withdrawal_requests') }}</li>
                        </ol>
                    </nav>
                </div>
            </div>
            <section class="section">
                <div class="figma-main-section-card">
                    <div class="card-body p-0">
                        <!-- Action Bar: Search + Filter + Add -->
                        <div
                            class="d-flex justify-content-between align-items-center flex-wrap gap-2 figma-action-bar-row">
                            <div class="flex-grow-1">
                                <div class="figma-search-container">
                                    <i class="fa fa-search text-muted"></i>
                                    <input v-model="filter" type="text" class="figma-search-input"
                                        :placeholder="__('search') || 'Search...'">
                                </div>
                            </div>
                            <div class="d-flex gap-2">
                                <button class="btn btn-figma-filter d-flex align-items-center gap-2"
                                    :class="{ 'active': showFilters }" @click="showFilters = !showFilters">
                                    <base-icon name="Funnel" width="16" height="16" useCurrentColor />
                                    <span>{{ __('filters') || 'Filters' }}</span>
                                    <i class="bi ms-1" :class="showFilters ? 'bi-chevron-up' : 'bi-chevron-down'"></i>
                                </button>
                                <button class="btn btn-figma-filter d-flex align-items-center gap-2" v-b-tooltip.hover
                                    :title="__('refresh')" @click="getWthdrawalRequests()">
                                    <i class="fa fa-refresh" aria-hidden="true"></i>
                                    <span>{{ __('refresh') }}</span>
                                </button>
                                <button class="btn btn-figma-filter d-flex align-items-center gap-2"
                                    @click="create_new = true">
                                    <i class="fa fa-plus"></i>
                                    <span>{{ __('create_withdraw_request') }}</span>
                                </button>
                            </div>
                        </div>

                        <!-- Expandable Filter Section -->
                        <b-collapse v-model="showFilters">
                            <div class="figma-filter-section">
                                <div class="row g-4">
                                    <div class="col-md-4">
                                        <div class="figma-filter-group">
                                            <label class="figma-filter-label">{{ __('filter_by_status') }}</label>
                                            <select @change="getWthdrawalRequests()" v-model="status"
                                                class="form-select modern-select">
                                                <option value="">{{ __('select_status') }}</option>
                                                <option value="0">{{ __('pending') }}</option>
                                                <option value="1">{{ __('approved') }}</option>
                                                <option value="2">{{ __('rejected') }}</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </b-collapse>

                        <div class="table-responsive mb-0">
                            <b-table :items="withdrawalRequests" :fields="fields" :current-page="currentPage"
                                :per-page="perPage" :filter="filter" :filter-included-fields="filterOn"
                                :sort-by.sync="sortBy" :sort-desc.sync="sortDesc" :sort-direction="sortDirection"
                                :bordered="false" :busy="isLoading" stacked="md" show-empty
                                :tbody-tr-class="() => 'figma-tr align-middle'" class="figma-order-table mb-0" small>
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
                                <template #head(amount)="row">
                                    {{ __('amount') + ' (' + $currency + ')' }}
                                </template>
                                <template #cell(status)="row">
                                    <span v-if="row.item.status === 0" class="figma-status-pill bg-warning">{{
                                        __('pending') }}</span>
                                    <span v-else-if="row.item.status === 1" class="figma-status-pill bg-success">{{
                                        __('approved') }}</span>
                                    <span v-else-if="row.item.status === 2" class="figma-status-pill bg-danger">{{
                                        __('rejected') }}</span>
                                    <span v-else class="figma-status-pill bg-danger">{{ __('undefine') }}</span>
                                </template>
                                <template #cell(receipt_image)="row">
                                    <img :src="row.item.receipt_image_url" height="40" class="wr-receipt-thumb" />
                                </template>
                                <template #cell(created_at)="row">
                                    <div class="d-flex flex-column">
                                        <span class="figma-date-bold">{{ formatDateBold(row.item.created_at) }}</span>
                                        <span class="figma-time-light">{{ formatTimeLight(row.item.created_at) }}</span>
                                    </div>
                                </template>
                                <template #cell(message)="row">
                                    <small :id="'bonus' + row.item.id"
                                        class="wr-info-chip">
                                        <i class="fa fa-info-circle"></i>
                                    </small>
                                    <b-popover :target="'bonus' + row.item.id" triggers="hover" placement="left">
                                        {{ row.item.message }}
                                    </b-popover>
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
                                <b-pagination v-model="currentPage" :total-rows="totalRows" :per-page="perPage"
                                    align="right" class="figma-pagination mb-0" hide-goto-end-buttons hide-ellipsis
                                    prev-text="<" next-text=">"></b-pagination>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
        <!-- Add / Edit -->
        <app-edit-record v-if="create_new || edit_record" :record="edit_record" :customers="customers"
            :balance="balance" @modalClose="hideModal()"></app-edit-record>
    </div>
</template>
<script>
import EditRecord from './Edit';
import moment from "moment";

export default {
    components: {
        'app-edit-record': EditRecord,
    },
    data: function () {
        return {
            fields: [
                { key: 'id', label: __('id'), sortable: true, sortDirection: 'desc' },
                { key: 'type', label: __('type'), sortable: true },
                { key: 'name', label: __('name'), sortable: true },
                { key: 'amount', label: __('amount'), sortable: true },
                { key: 'message', label: __('message'), sortable: true },
                { key: 'status', label: __('status'), sortable: true },
                { key: 'remark', label: __('remark'), sortable: true },
                { key: 'receipt_image', label: __('receipt_image'), sortable: true, class: 'text-center' },
                { key: 'created_at', label: __('date'), sortable: true },

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
            showFilters: false,
            sectionStyle: 'style_1',
            max_visible_units: 12,
            max_col_in_single_row: 3,
            create_new: null,
            edit_record: null,

            customers: null,
            withdrawalRequests: [

            ],
            balance: 0,
            status: ""
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
                    return { text: f.label, value: f.key }
                })
        }
    },
    mounted() {
        // Set the initial number of items
        this.totalRows = this.withdrawalRequests.length
    },

    created: function () {
        this.$eventBus.$on('withdrawalRequestsSaved', (message) => {
            //this.showSuccess(message);
            this.showMessage("success", message);
            this.getWthdrawalRequests();
            this.create_new = null;
        });
        this.getWthdrawalRequests();
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
        getWthdrawalRequests() {
            this.isLoading = true
            let param = {
                "status": this.status
            }
            axios.get(this.$deliveryBoyApiUrl + '/withdrawal_requests/get', {
                params: param
            })
                .then((response) => {
                    this.isLoading = false
                    this.withdrawalRequests = response.data.data.withdraw_requests;
                    this.totalRows = this.withdrawalRequests.length;
                    this.balance = response.data.data.balance
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
.wr-info-chip {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    border: 1px solid var(--ui-border);
    border-radius: var(--ui-radius-sm);
    background: var(--ui-surface-muted);
    color: var(--ui-text-muted);
    cursor: pointer;
}

.wr-receipt-thumb {
    width: 40px;
    object-fit: cover;
    border: 1px solid var(--ui-border);
    border-radius: var(--ui-radius-sm);
}
</style>
