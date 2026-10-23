<template>
    <div>
        <div class="page-heading">
            <div class="page-title mb-2">
                <div class="d-flex justify-content-between align-items-center flex-wrap gap-2">
                    <h3 class="modern-page-title mb-0">{{ __('manage_withdrawal_requests') }}</h3>
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb mb-0">
                            <li class="breadcrumb-item"><router-link to="/seller/dashboard" class="text-muted">{{ __('dashboard') }}</router-link></li>
                            <li class="breadcrumb-item active text-primary" aria-current="page">{{ __('manage_withdrawal_requests') }}</li>
                        </ol>
                    </nav>
                </div>
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
                            <div class="d-flex gap-2 align-items-center">
                                <select @change="getWthdrawalRequests()" v-model="status" class="form-select modern-select toolbar-select">
                                    <option value="">{{ __('all_statuses') }}</option>
                                    <option value="0">{{ __('pending') }}</option>
                                    <option value="1">{{ __('approved') }}</option>
                                    <option value="2">{{ __('rejected') }}</option>
                                </select>
                                <button class="btn btn-figma-filter d-flex align-items-center gap-2" @click="getWthdrawalRequests()" v-b-tooltip.hover :title="__('refresh')">
                                    <i class="fa fa-refresh"></i>
                                    <span>{{ __('refresh') }}</span>
                                </button>
                                <button class="btn btn-figma-filter d-flex align-items-center gap-2" @click="create_new = true">
                                    <i class="fa fa-plus"></i>
                                    <span>{{ __('add_withdrawal_request') }}</span>
                                </button>
                            </div>
                        </div>

                        <div class="table-responsive mb-0">
                            <b-table :items="withdrawalRequests" :fields="fields"
                                :current-page="currentPage" :per-page="perPage" :filter="filter"
                                :sort-direction="sortDirection" :bordered="false" :busy="isLoading" stacked="md"
                                show-empty small class="figma-table w-100 mb-0" :tbody-tr-class="() => 'figma-tr align-middle'">
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

                                <template #cell(status)="row">
                                    <span v-if="row.item.status === 0" class="figma-status-pill bg-warning">{{ __('pending')
                                        }}</span>
                                    <span v-else-if="row.item.status === 1" class="figma-status-pill bg-success">{{ __('approved')
                                        }}</span>
                                    <span v-else-if="row.item.status === 2" class="figma-status-pill bg-danger">{{ __('rejected')
                                        }}</span>
                                    <span v-else class="figma-status-pill bg-danger">{{ __('undefine') }}</span>
                                </template>
                                <template #cell(receipt_image)="row">
                                    <img :src="row.item.receipt_image_url" class="border" height="40" width="40" />
                                </template>
                                <template #cell(created_at)="row">
                                    {{ row.item.created_at }}
                                </template>
                                <template #cell(message)="row">
                                    <small :id="'bonus' + row.item.id"
                                        class="d-inline-flex px-2 py-1 text-muted bg-secondary bg-opacity-10 border border-secondary border-opacity-10 rounded-2">
                                        <i class="fa fa-info-circle"></i>
                                    </small>
                                    <b-popover :target="'bonus' + row.item.id" triggers="hover" placement="left">
                                        {{ row.item.message }}
                                    </b-popover>
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
                                <b-pagination v-model="currentPage" :total-rows="totalRows" :per-page="perPage" align="right" class="figma-pagination mb-0" hide-goto-end-buttons hide-ellipsis prev-text="<" next-text=">"></b-pagination>
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

export default {
    components: {
        'app-edit-record': EditRecord,
    },
    data: function () {
        return {
            fields: [
                { key: 'id', label: __('id'), sortable: true, sortDirection: 'desc', thClass: 'text-nowrap' },
                { key: 'amount', label: __('amount'), sortable: true, thClass: 'text-nowrap' },
                { key: 'message', label: __('message'), sortable: true, thClass: 'text-nowrap' },
                { key: 'status', label: __('status'), sortable: true, thClass: 'text-nowrap' },
                { key: 'remark', label: __('remark'), sortable: true, thClass: 'text-nowrap' },
                { key: 'receipt_image', label: __('receipt_image'), sortable: true, class: 'text-center', thClass: 'text-nowrap' },
                { key: 'created_at', label: __('date'), sortable: true, thClass: 'text-nowrap' },

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
            this.showMessage("success", message);
            this.getWthdrawalRequests();
            this.create_new = null;
        });
        this.getWthdrawalRequests();
    },
    methods: {
        getWthdrawalRequests() {
            this.isLoading = true
            let param = {
                "status": this.status
            }
            axios.get(this.$apiUrl + '/withdrawal_requests/get', {
                params: param
            }).then((response) => {
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
/* Status filter in the toolbar: compact, same height as the toolbar buttons
   (the global .figma-action-bar-row .modern-select rule is 40px / 16px with a dark border) */
.figma-action-bar-row .toolbar-select {
    height: 38px !important;
    min-width: 150px !important;
    padding-top: 0 !important;
    padding-bottom: 0 !important;
    font-size: 13px !important;
    border-color: var(--ui-border-strong) !important;
}
</style>
