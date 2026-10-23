<template>
    <div>
        <div class="page-heading">
            <div class="page-title mb-4">
                <div class="d-flex justify-content-between align-items-center flex-wrap gap-2">
                    <h3 class="modern-page-title mb-0">{{ __('cash_collection') }}</h3>
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb mb-0">
                            <li class="breadcrumb-item">
                                <router-link to="/delivery_boy/dashboard" class="text-muted">{{ __('dashboard') }}</router-link>
                            </li>
                            <li class="breadcrumb-item active text-primary" aria-current="page">{{ __('cash_collection') }}</li>
                        </ol>
                    </nav>
                </div>
            </div>
            <section class="section">
                <div class="row g-3 mb-4">
                    <div class="col-12 col-sm-6 col-md-4 kpi-col-full-phone">
                        <div class="figma-kpi-card-v2 w-100 h-100">
                            <div class="d-flex align-items-center gap-3">
                                <div class="figma-stat-icon-box bg-stat-purple flex-shrink-0">
                                    <i class="fa fa-handshake-o"></i>
                                </div>
                                <div class="d-flex flex-column overflow-hidden text-start">
                                    <span class="figma-stat-label mb-0 text-truncate">{{ __('cash_in_hand') }}</span>
                                    <h4 class="figma-stat-value mb-0 text-truncate">{{ $currency + " " + cash_in_hand }}</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 col-sm-6 col-md-4 kpi-col-full-phone">
                        <div class="figma-kpi-card-v2 w-100 h-100">
                            <div class="d-flex align-items-center gap-3">
                                <div class="figma-stat-icon-box bg-stat-green flex-shrink-0">
                                    <i class="fa fa-money"></i>
                                </div>
                                <div class="d-flex flex-column overflow-hidden text-start">
                                    <span class="figma-stat-label mb-0 text-truncate">{{ __('cash_collected') }}</span>
                                    <h4 class="figma-stat-value mb-0 text-truncate">{{ $currency + " " + Math.abs(cash_collected) }}</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="figma-main-section-card">
                    <div class="card-body p-0">
                        <!-- Action Bar: Search + Filter + Refresh -->
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
                                    :title="__('refresh')" @click="getTransactions()">
                                    <i class="fa fa-refresh" aria-hidden="true"></i>
                                    <span>{{ __('refresh') }}</span>
                                </button>
                            </div>
                        </div>

                        <!-- Expandable Filter Section -->
                        <b-collapse v-model="showFilters">
                            <div class="figma-filter-section">
                                <div class="row g-4">
                                    <div class="col-md-4">
                                        <div class="figma-filter-group position-relative">
                                            <label class="figma-filter-label">{{ __('from_and_to_date') }}</label>
                                            <div class="modern-datepicker-container position-relative">
                                                <date-range-picker :append-to-body="true" :single-date-picker="'range'"
                                                    :locale-data="dateRangePickerLocale" :ranges="dateRangePickerRanges"
                                                    :autoApply="false" :showDropdowns="true" v-model="dateRange"
                                                    :maxDate="maxDate" @update="getTransactions"
                                                    class="w-100"></date-range-picker>
                                                <button v-if="dateRange.startDate"
                                                    class="btn btn-sm btn-outline-secondary db-date-clear"
                                                    @click="dateRange.startDate = null; dateRange.endDate = null; getTransactions()">
                                                    {{ __('clear') }}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </b-collapse>

                        <div class="table-responsive mb-0">
                            <b-table :items="transactions" :fields="fields" :current-page="currentPage"
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
                                <template #cell(amount)="row">
                                    <span v-if="row.item.type === __('delivery_boy_cash_collection')"
                                        class="figma-amount-bold">{{ row.item.collected_amount }}</span>
                                    <span v-else class="figma-amount-bold">{{ row.item.amount }}</span>
                                </template>
                                <template #head(amount)="row">
                                    {{ __('amount') }}{{ ' (' + $currency + ')' }}
                                </template>
                                <template #cell(transaction_date)="row">
                                    <div class="d-flex flex-column">
                                        <span class="figma-date-bold">{{ formatDateBold(row.item.transaction_date)
                                            }}</span>
                                        <span class="figma-time-light">{{ formatTimeLight(row.item.transaction_date)
                                            }}</span>
                                    </div>
                                </template>
                                <template #cell(status)="row">
                                    <span class="figma-status-pill bg-success">
                                        {{ row.item.status }}
                                    </span>
                                </template>
                            </b-table>
                        </div>

                        <!-- Footer: Totals + Pagination -->
                        <div class="figma-table-footer flex-wrap gap-3">
                            <div class="d-flex align-items-center flex-wrap gap-3">
                                <div class="d-flex align-items-center gap-3 flex-wrap">
<div class="d-flex align-items-center gap-2">
<label class="showing-results-text mb-0">{{ __('per_page') }}</label>
<b-form-select v-model="perPage" :options="pageOptions" size="sm" class="w-auto"></b-form-select>
</div>
<table-count :current-page="currentPage" :per-page="perPage" :total-rows="totalRows"></table-count>
</div>
                                <div class="d-flex gap-3 text-success small border-start ps-3">
                                    <span>{{ __('total_amount') }}: <strong>{{ $currency }} {{ total_amount
                                            }}</strong></span>
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
    </div>
</template>
<script>
import DateRangePicker from 'vue2-daterange-picker'
import DateRangePickerMixin from '../../mixins/DateRangePickerMixin';
import moment from "moment";
export default {
    name: "range_dates",
    mixins: [DateRangePickerMixin],
    components: { DateRangePicker },
    data: function () {
        return {
            dateRange: { startDate: null, endDate: null },
            maxDate: new Date(),
            fields: [
                { key: 'id', label: __('id'), sortable: true, sortDirection: 'desc' },
                { key: 'order_id', label: __('order_id'), sortable: true },
                { key: 'message', label: __('message'), sortable: true },
                { key: 'amount', label: __('amount'), sortable: true },
                { key: 'status', label: __('status'), sortable: true },
                { key: 'transaction_date', label: __('date_time'), sortable: true }
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
            max_visible_units: 12,
            max_col_in_single_row: 3,

            transactions: [],
            cash_in_hand: 0,
            cash_collected: 0,
            total_amount: 0
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
        this.totalRows = this.transactions.length
    },
    created: function () {
        this.$eventBus.$on('transactionsSaved', (message) => {
            this.showMessage("success", message);
            this.getTransactions();
            this.create_new = null;
        });
        this.getTransactions();
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
        getTransactions() {
            this.isLoading = true
            let param = {
                "startDate": (this.dateRange.startDate != null) ? moment(this.dateRange.startDate).format('YYYY-MM-DD') : "",
                "endDate": (this.dateRange.endDate != null) ? moment(this.dateRange.endDate).format('YYYY-MM-DD') : "",
            }
            axios.get(this.$deliveryBoyApiUrl + '/cash_collection', {
                params: param
            }).then((response) => {
                this.transactions = response.data.data.transactions;
                this.cash_in_hand = response.data.data.cash_in_hand;
                this.cash_collected = response.data.data.cash_collected;

                this.totalRows = this.transactions.length;
                this.total_amount = this.transactions.map(item => item.amount).reduce((prev, curr) => prev + curr, 0).toFixed(2);

                this.isLoading = false;
            });
        },
    }
};
</script>
<style>
@import "../../../../node_modules/vue2-daterange-picker/dist/vue2-daterange-picker.css";

.vue-daterange-picker[data-v-1ebd09d2] {
    min-width: 80%;
}

@media only screen and (min-width: 600px) {
    .vue-daterange-picker[data-v-1ebd09d2] {
        min-width: 90%;
    }
}

/* Delivery boy cash collection: date-range "clear" sits inside the picker field */
.db-date-clear {
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
    height: 28px;
    padding: 0 10px;
    font-size: 12px;
}
</style>
