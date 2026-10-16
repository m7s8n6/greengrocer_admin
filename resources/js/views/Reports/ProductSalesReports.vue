<template>
    <div>
        <div class="page-heading">
            <div class="row">
                <div class="col-12 col-md-6 order-md-1 order-last">
                    <h3>{{ __('product_sales_reports') }}</h3>
                </div>
                <div class="col-12 col-md-6 order-md-2 order-first">
                    <nav aria-label="breadcrumb" class="breadcrumb-header float-start float-lg-end">
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item"><router-link to="/dashboard">{{ __('dashboard') }}</router-link>
                            </li>
                            <li class="breadcrumb-item active" aria-current="page">{{ __('product_sales_reports') }}
                            </li>
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
                            <button class="btn btn-figma-filter" @click="getProductSalesReports()" v-b-tooltip.hover
                                :title="__('refresh')">
                                <i class="fa fa-refresh"></i>
                            </button>
                        </div>
                    </div>

                    <!-- Expandable Filter Section -->
                    <b-collapse v-model="showFilters">
                        <div class="figma-filter-section">
                            <div class="row g-4">
                                <div class="col-md-4">
                                    <div class="figma-filter-group">
                                        <label class="figma-filter-label">{{ __('date_range') || 'Date Range' }} <span
                                                class="text-danger">*</span></label>
                                        <div class="modern-datepicker-container">
                                            <date-range-picker :autoApply=false :showDropdowns=true v-model="dateRange"
                                                :maxDate="maxDate" @update="getProductSalesReports"
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
                            </div>
                        </div>
                    </b-collapse>

                    <div class="table-responsive mb-0">
                        <b-table :items="productSalesReports" :fields="fields" :current-page="currentPage"
                            :per-page="perPage" :filter="filter" :filter-included-fields="filterOn"
                            :sort-by.sync="sortBy" :sort-desc.sync="sortDesc" :sort-direction="sortDirection"
                            :bordered="false" :busy="isLoading" stacked="md" show-empty small
                            :tbody-tr-class="() => 'figma-tr align-middle'" class="figma-table">
                            <template #table-busy>
                                <div class="text-center text-black my-2">
                                    <b-spinner class="align-middle"></b-spinner>
                                    <strong>{{ __('loading') }}...</strong>
                                </div>
                            </template>
                            <template #head()="data">
                                <span class="figma-th">{{ data.label }}</span>
                            </template>
                        </b-table>
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
    name: "range_dates",
    mixins: [DateRangePickerMixin],
    components: { DateRangePicker },
    data: function () {
        return {
            showFilters: false,
            dateRange: { startDate: null, endDate: null },
            maxDate: new Date(),
            fields: [
                { key: 'product_name', label: __('product_name'), sortable: true, class: 'text-center' },
                { key: 'seller_name', label: __('seller_name'), sortable: true, class: 'text-center' },
                { key: 'seller_id', label: __('seller_id'), sortable: true, sortDirection: 'desc', class: 'text-center' },
                { key: 'product_variant_id', label: __('product_variant_id'), sortable: true, sortDirection: 'desc', class: 'text-center' },
                { key: 'variant_name', label: __('unit_of_measure'), sortable: true, class: 'text-center' },
                { key: 'total_sales', label: __('total_units_sold'), sortable: true, class: 'text-center' },
                { key: 'total_price', label: __('total_sales'), sortable: true, class: 'text-center' }
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
            productSalesReports: []
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
        this.totalRows = this.productSalesReports.length
    },
    created: function () {
        this.getProductSalesReports();
    },
    methods: {
        clearDate() {
            this.dateRange.startDate = null;
            this.dateRange.endDate = null;
            this.getProductSalesReports();
        },
        downloadExcel() {
            this.isLoading = true;
            let postData = {
                order_id: this.id,
            }
            axios({
                url: this.$apiUrl + '/sales_reports/export_excel',
                method: 'get',
                responseType: 'blob',
            }).then((response) => {
                this.isLoading = false;

                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'sales_report.csv'); // Set the download file name
                document.body.appendChild(link);
                link.click();
                link.parentNode.removeChild(link);
            }).catch(error => {
                if (error.request.statusText) {
                    this.showError(error.request.statusText);
                } else if (error.message) {
                    this.showError(error.message);
                } else {
                    this.showError("Something went wrong!");
                }
                this.isLoading = false;
            });
        },
        exportToCSV() {
            let customHeaders = [
                'Product Name',
                'Seller Name',
                'Seller ID',
                'Product Variant ID',
                'Unit of Measure',
                'Total Units Sold',
                'Total Sales'
            ];
            const csvData = this.convertToCSV(this.productSalesReports, customHeaders);
            const blob = new Blob([csvData], { type: 'text/csv' });
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = 'product_sales_reports.csv';
            link.click();
        },
        convertToCSV(data) {
            let csv = '';
            let headers = Object.keys(this.fields.reduce((acc, cur) => {
                acc[cur.key] = true;
                return acc;
            }, {}));
            csv += headers.join(',') + '\n';
            // Rows
            data.forEach(item => {
                let row = headers.map(field => {
                    let value = item[field];
                    // Ensure values are properly formatted for CSV
                    if (typeof value === 'string') {
                        value = '"' + value.replace(/"/g, '""') + '"';
                    }
                    return value;
                });
                csv += row.join(',') + '\n';
            });
            return csv;
        },
        getProductSalesReports() {
            this.isLoading = true;
            let param = {
                "startDate": (this.dateRange.startDate != null) ? moment(this.dateRange.startDate).format('YYYY-MM-DD') : "",
                "endDate": (this.dateRange.endDate != null) ? moment(this.dateRange.endDate).format('YYYY-MM-DD') : "",
            }
            axios.get(this.$apiUrl + '/product_sales_reports/', {
                params: param
            }).then((response) => {
                this.isLoading = false;
                this.productSalesReports = response.data.data;
                this.totalRows = this.productSalesReports.length;
            });
        },
    }
};
</script>

<style scoped>
@import "../../../../node_modules/vue2-daterange-picker/dist/vue2-daterange-picker.css";
</style>
