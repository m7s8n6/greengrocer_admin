<template>
    <div>
        <div class="page-heading">
            <div class="row">
                <div class="col-12 col-md-6 order-md-1 order-last">
                    <h3>{{ __('commission_reports') }}</h3>
                </div>
                <div class="col-12 col-md-6 order-md-2 order-first">
                    <nav aria-label="breadcrumb" class="breadcrumb-header float-start float-lg-end">
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item"><router-link to="/dashboard">{{ __('dashboard') }}</router-link>
                            </li>
                            <li class="breadcrumb-item active" aria-current="page">{{ __('commission_reports') }}</li>
                        </ol>
                    </nav>
                </div>
            </div>
        </div>
        <section class="section">
            <div class="figma-main-section-card">
                <div class="card-body p-0">
                    <!-- Modern Filter Action Bar -->
                    <div class="d-flex justify-content-between align-items-center flex-wrap gap-2 figma-action-bar-row">
                        <div class="flex-grow-1">
                            <div class="figma-search-container">
                                <i class="fa fa-search text-muted"></i>
                                <input v-model="filter" type="search" class="figma-search-input"
                                    :placeholder="__('search')">
                            </div>
                        </div>
                        <div class="d-flex gap-2">
                            <button class="btn btn-figma-filter d-flex align-items-center gap-2"
                                :class="{ 'active': showFilters }" @click="showFilters = !showFilters">
                                <base-icon name="Funnel" width="24" height="24" useCurrentColor />
                                <span>{{ __('filters') || 'Filters' }}</span>
                                <i class="bi ms-1" :class="showFilters ? 'bi-chevron-up' : 'bi-chevron-down'"></i>
                            </button>
                            <button class="btn btn-figma-filter d-flex align-items-center gap-2"
                                @click="getCommissionReports()">
                                <i class="fa fa-refresh"></i>
                                <span>{{ __('refresh') || 'Refresh' }}</span>
                            </button>
                        </div>
                    </div>

                    <!-- Expandable Filter Section -->
                    <b-collapse v-model="showFilters">
                        <div class="figma-filter-section">
                            <div class="row g-4">
                                <div class="col-md-4">
                                    <div class="figma-filter-group">
                                        <label class="figma-filter-label">{{ __('date_range') || 'Date Range' }}</label>
                                        <div class="modern-datepicker-container">
                                            <date-range-picker :autoApply=false :showDropdowns=true v-model="dateRange"
                                                :maxDate="maxDate" @update="getCommissionReports"
                                                :locale-data="dateRangePickerLocale" :ranges="dateRangePickerRanges"
                                                :append-to-body="true" opens="right" class="w-100"></date-range-picker>
                                            <button v-if="dateRange.startDate" type="button"
                                                class="figma-filter-icon-right btn btn-sm p-0 border-0"
                                                style="right: 48px; background: transparent; pointer-events: auto; cursor: pointer;"
                                                @click.stop="clearDate()"
                                                v-b-tooltip.hover :title="__('clear') || 'Clear'">
                                                <i class="fa fa-times-circle text-muted"></i>
                                            </button>
                                            <base-icon name="CalendarDots" width="24" height="24"
                                                class="figma-filter-icon-right" useCurrentColor />
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="figma-filter-group">
                                        <label class="figma-filter-label">{{ __('select_seller') }}</label>
                                        <select v-model="seller" @change="getCommissionReports()"
                                            class="form-select modern-select">
                                            <option value="">{{ __('select_seller') }}</option>
                                            <option v-for="s in sellers" :value="s.id">{{ s.name }}</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-md-4 d-flex align-items-end">
                                    <button class="btn btn-figma-filter d-flex align-items-center gap-2"
                                        @click="dateRange.startDate = null; dateRange.endDate = null; seller = ''; getCommissionReports()">
                                        <i class="fa fa-eraser"></i>
                                        <span>{{ __('clear') || 'Clear' }}</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </b-collapse>

                    <div class="table-responsive mb-0">
                        <b-table :items="commissionReports" :fields="fields" :current-page="currentPage"
                            :per-page="perPage" :filter="filter" :filter-included-fields="filterOn"
                            :sort-by.sync="sortBy" :sort-desc.sync="sortDesc" :sort-direction="sortDirection"
                            :bordered="false" :busy="isLoading" stacked="md" show-empty small
                            :tbody-tr-class="() => 'figma-tr align-middle'" class="figma-table">
                            <template #head()="data">
                                <span class="figma-th">{{ data.label }}</span>
                            </template>
                            <template #table-busy>
                                <div class="text-center text-black my-2">
                                    <b-spinner class="align-middle"></b-spinner>
                                    <strong>{{ __('loading') }}...</strong>
                                </div>
                            </template>
                        </b-table>
                    </div>
                    <div class="row mb-3">
                        <div class="col-md-12">
                            <div class="p-3 rounded border bg-light d-inline-block">
                                <span class="text-muted small me-2">{{ __('total_commission') }}:</span>
                                <span class="h6 mb-0 text-success fw-bold">{{ $currency }} {{
                                    total_commission.toFixed(2) }}</span>
                            </div>
                        </div>
                    </div>

                    <div class="figma-table-footer">
                        <div class="showing-results-text">
                            {{ __('Showing Result') }} : <span class="showing-bold">{{ pageEnd }}</span> {{ __('of') }}
                            <span class="showing-bold">{{ totalRows }}</span>
                        </div>
                        <b-pagination v-model="currentPage" :total-rows="totalRows" :per-page="perPage" align="right"
                            class="figma-pagination mb-0" hide-goto-end-buttons hide-ellipsis prev-text="<"
                            next-text=">"></b-pagination>
                    </div>
                </div>
            </div>
        </section>
    </div>
    
</template>
<script>
import DateRangePicker from 'vue2-daterange-picker';
import DateRangePickerMixin from '../../mixins/DateRangePickerMixin';
import moment from "moment";

export default {
    name: "commission_reports",
    mixins: [DateRangePickerMixin],
    components: { DateRangePicker },
    data: function () {
        return {
            showFilters: false,
            dateRange: { startDate: null, endDate: null },
            maxDate: new Date(),
            seller: "",
            fields: [
                { key: 'order_id', label: __('order_id'), sortable: true, sortDirection: 'desc' },
                { key: 'order_item_id', label: __('order_item_id'), sortable: true, class: 'text-center' },
                { key: 'seller_name', label: __('seller'), sortable: true, class: 'text-center' },
                { key: 'order_item_amount', label: __('order_item_amount') + ' (' + this.$currency + ')', sortable: true, class: 'text-center' },
                { key: 'seller_commission_percentage', label: __('commission') + ' (%)', sortable: true, class: 'text-center' },
                { key: 'commission_amount', label: __('commission_amount') + ' (' + this.$currency + ')', sortable: true, class: 'text-center' },
                { key: 'added_date', label: __('date'), sortable: true, class: 'text-center' }
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
            isLoading: false,
            commissionReports: [],
            total_commission: 0,
            sellers: null,
        }
    },
    computed: {
        sortOptions() {
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
        this.totalRows = this.commissionReports.length
    },
    created: function () {
        this.getCommissionReports();
    },
    methods: {
        clearDate() {
            this.dateRange.startDate = null;
            this.dateRange.endDate = null;
            this.getCommissionReports();
        },
        getCommissionReports() {
            this.isLoading = true;
            let param = {
                "startDate": (this.dateRange.startDate != null) ? moment(this.dateRange.startDate).format('YYYY-MM-DD') : "",
                "endDate": (this.dateRange.endDate != null) ? moment(this.dateRange.endDate).format('YYYY-MM-DD') : "",
                "seller": this.seller,
            }
            axios.get(this.$apiUrl + '/commission_reports', {
                params: param
            }).then((response) => {
                this.isLoading = false;
                this.sellers = response.data.data.sellers;
                this.commissionReports = response.data.data.commissionReports;
                this.total_commission = this.commissionReports.map(item => parseFloat(item.commission_amount)).reduce((prev, curr) => prev + curr, 0) || 0;
                this.totalRows = this.commissionReports.length;
            });
        },
    }
};
</script>

<style scoped>
@import "../../../../node_modules/vue2-daterange-picker/dist/vue2-daterange-picker.css";

.vue-daterange-picker[data-v-1ebd09d2] {
    min-width: 80%;
}

@media only screen and (min-width: 600px) {
    .vue-daterange-picker[data-v-1ebd09d2] {
        min-width: 90%;
    }
}
</style>
