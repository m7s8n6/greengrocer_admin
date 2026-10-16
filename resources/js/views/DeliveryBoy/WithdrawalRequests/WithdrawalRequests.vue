<template>
    <div>
        <div class="page-heading">
            <div class="page-title mb-2">
                <div class="d-flex justify-content-between align-items-center">
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
                                <button class="btn btn-primary d-flex align-items-center gap-2"
                                    @click="create_new = true">
                                    <i class="fa fa-plus"></i> {{ __('create_withdraw_request') }}
                                </button>
                                <button class="btn btn-figma-filter d-flex align-items-center gap-2"
                                    :class="{ 'active': showFilters }" @click="showFilters = !showFilters">
                                    <base-icon name="Funnel" width="24" height="24" useCurrentColor />
                                    <span>{{ __('filters') || 'Filters' }}</span>
                                    <i class="bi ms-1" :class="showFilters ? 'bi-chevron-up' : 'bi-chevron-down'"></i>
                                </button>
                                <button class="btn btn-figma-filter d-flex align-items-center gap-2" v-b-tooltip.hover
                                    :title="__('refresh')" @click="getWthdrawalRequests()">
                                    <i class="fa fa-refresh" aria-hidden="true"></i>
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
                                <template #table-busy>
                                    <div class="text-center py-4">
                                        <b-spinner class="align-middle" variant="dark"></b-spinner>
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
                                    <img :src="row.item.receipt_image_url" height="40" class="rounded" />
                                </template>
                                <template #cell(created_at)="row">
                                    <div class="d-flex flex-column">
                                        <span class="figma-date-bold">{{ formatDateBold(row.item.created_at) }}</span>
                                        <span class="figma-time-light">{{ formatTimeLight(row.item.created_at) }}</span>
                                    </div>
                                </template>
                                <template #cell(message)="row">
                                    <small class="d-inline-flex mb-0 px-2 py-1 text-muted bg-secondary bg-opacity-10 border border-secondary border-opacity-10 rounded-2"
                                        style="cursor: pointer;" v-b-tooltip.hover :title="row.item.message">
                                        <i class="fa fa-info-circle"></i>
                                    </small>
                                </template>
                            </b-table>
                        </div>

                        <!-- Footer: Totals + Pagination -->
                        <div class="figma-table-footer flex-wrap gap-3">
                            <div class="d-flex align-items-center gap-4">
                                <div class="showing-results-text small">
                                    {{ __('Showing Result') }} : <span class="showing-bold">{{ pageEnd }}</span> {{ __('of') }}
                                    <span class="showing-bold">{{ totalRows }}</span>
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
                { key: 'id', label: __('id'), sortable: true, sortDirection: 'desc', class: 'text-center' },
                { key: 'type', label: __('type'), sortable: true, class: 'text-center' },
                { key: 'name', label: __('name'), sortable: true, class: 'text-center' },
                { key: 'amount', label: __('amount'), sortable: true, class: 'text-center' },
                { key: 'message', label: __('message'), sortable: true, class: 'text-center' },
                { key: 'status', label: __('status'), sortable: true, class: 'text-center' },
                { key: 'remark', label: __('remark'), sortable: true, class: 'text-center' },
                { key: 'receipt_image', label: __('receipt_image'), sortable: true, class: 'text-center' },
                { key: 'created_at', label: __('date'), sortable: true, class: 'text-center' },

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
