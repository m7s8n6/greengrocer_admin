<template>
    <div>
        <div class="page-heading">
            <div class="page-title mb-2">
                <div class="d-flex justify-content-between align-items-center">
                    <h3 class="modern-page-title mb-0">{{ __('sales_reports') }}</h3>
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb mb-0">
                            <li class="breadcrumb-item"><router-link to="/seller/dashboard" class="text-muted">{{ __('dashboard') }}</router-link></li>
                            <li class="breadcrumb-item active text-primary" aria-current="page">{{ __('sales_reports') }}</li>
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
                                <button class="btn btn-figma-filter d-flex align-items-center gap-2" :class="{'active': showFilters}" @click="showFilters = !showFilters">
                                    <base-icon name="Funnel" width="24" height="24" useCurrentColor />
                                    <span>{{ __('filters') }}</span>
                                    <i class="bi ms-1" :class="showFilters ? 'bi-chevron-up' : 'bi-chevron-down'"></i>
                                </button>
                                <button class="btn btn-figma-filter d-flex align-items-center gap-2" @click="getSalesReports()" v-b-tooltip.hover :title="__('refresh')">
                                    <i class="fa fa-refresh"></i>
                                    <span>{{ __('refresh') }}</span>
                                </button>
                            </div>
                        </div>

                        <b-collapse v-model="showFilters">
                            <div class="figma-filter-section">
                                <div class="row g-4">
                                    <div class="col-md-3">
                                        <div class="figma-filter-group">
                                            <label class="figma-filter-label">{{ __('category') }}</label>
                                            <select v-model="category" @change="getSalesReports()" class="form-select modern-select">
                                                <option value="">{{ __('select_category') }}</option>
                                                <option v-for="category in categories" :value="category.id" :key="category.id">{{ category.name }}</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="figma-filter-group">
                                            <label class="figma-filter-label">{{ __('date_range') }}</label>
                                            <div class="modern-datepicker-container">
                                                <date-range-picker
                                                    :append-to-body="true"
                                                    :single-date-picker="'range'"
                                                    :locale-data="dateRangePickerLocale"
                                                    :ranges="dateRangePickerRanges"
                                                    :autoApply="false"
                                                    :showDropdowns = "true"
                                                    v-model="dateRange"
                                                    :maxDate="maxDate"
                                                    @update="getSalesReports"
                                                    class="w-100"
                                                ></date-range-picker>
                                                <button v-if="dateRange.startDate" type="button"
                                                    class="figma-filter-icon-right btn btn-sm p-0 border-0"
                                                    style="right: 48px; background: transparent; pointer-events: auto; cursor: pointer;"
                                                    @click.stop="clearDate()"
                                                    v-b-tooltip.hover :title="__('clear') || 'Clear'">
                                                    <i class="fa fa-times-circle text-muted"></i>
                                                </button>
                                                <base-icon name="CalendarDots" width="24" height="24" class="figma-filter-icon-right" useCurrentColor />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </b-collapse>
                        <div class="table-responsive">
                            <b-table
                                :items="salesReports"
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
                                small
                                :tbody-tr-class="() => 'figma-tr align-middle'"
                                class="figma-table mb-0">
                                <template #table-busy>
                                    <div class="text-center text-black my-2">
                                        <b-spinner class="align-middle"></b-spinner>
                                        <strong>{{ __('loading') }}...</strong>
                                    </div>
                                </template>

                                <template #cell(created_at)="row">
                                    {{ new Date(row.item.created_at).toLocaleString() }}
                                </template>
                            </b-table>
                        </div>
                        <div class="figma-table-footer flex-wrap gap-3">
                            <div class="d-flex align-items-center gap-4">
                                <div class="showing-results-text small">
                                    {{ __('Showing Result') }} : <span class="showing-bold">{{ pageEnd }}</span> {{ __('of') }} <span class="showing-bold">{{ totalRows }}</span>
                                </div>
                                <div class="d-flex gap-3 text-success small border-start ps-4">
                                    <span>{{ __('total_amount') }}: <strong>{{ $currency }} {{ final_total_sum }}</strong></span>
                                </div>
                            </div>
                            <div class="d-flex align-items-center gap-3">
                                <b-pagination v-model="currentPage" :total-rows="totalRows" :per-page="perPage" align="right" class="figma-pagination mb-0" hide-goto-end-buttons hide-ellipsis prev-text="<" next-text=">"></b-pagination>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>
<script>
import DateRangePicker from 'vue2-daterange-picker';
import DateRangePickerMixin from '../../mixins/DateRangePickerMixin';
import moment from "moment";

export default {
    name: "range_dates",
    mixins: [DateRangePickerMixin],
    components: {DateRangePicker},
    data: function () {
        return {
            dateRange: {startDate:null, endDate:null},
            maxDate: new Date(),
            seller: "",
            category: "",
            fields: [
                {key: 'id', label: __('order_item_id'), sortable: true, sortDirection: 'desc'},
                {key: 'user_name', label: __('user'), sortable: true, class: 'text-center'},
                {key: 'product_name', label: __('product'), sortable: true, class: 'text-center'},
                {key: 'mobile', label: __('mobile'), sortable: true, class: 'text-center'},
                {key: 'sub_total', label: __('total') + '('+ this.$currency +')', sortable: true, class: 'text-center'},
                {key: 'added_date', label: __('date'), sortable: true, class: 'text-center'}
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
            salesReports: [],
            final_total_sum: 0,
            sellers: null,
            categories: null,
            showFilters: false
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
        this.totalRows = this.salesReports.length
    },
    created: function () {
        this.getSalesReports();
    },
    methods: {
        clearDate() {
            this.dateRange.startDate = null;
            this.dateRange.endDate = null;
            this.getSalesReports();
        },
        getSalesReports() {
            this.isLoading = true;
            let param = {
                "startDate": (this.dateRange.startDate != null) ? moment(this.dateRange.startDate).format('YYYY-MM-DD'):"",
                "endDate": (this.dateRange.endDate != null) ? moment(this.dateRange.endDate).format('YYYY-MM-DD'):"",
                "seller": this.seller,
                "category": this.category
            }
            axios.get(this.$sellerApiUrl + '/sales_reports', {
                params: param
            }).then((response) => {
                this.isLoading = false
                this.sellers = response.data.data.sellers;
                this.categories = response.data.data.categories;
                this.salesReports = response.data.data.salesReports;
                this.final_total_sum = this.salesReports.map(item => item.sub_total).reduce((prev, curr) => prev + curr, 0);
                this.totalRows = this.salesReports.length
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
