<template>
    <div>
        <div class="page-heading">
            <div class="page-title mb-4">
                <div class="d-flex justify-content-between align-items-center flex-wrap gap-2">
                    <h3 class="modern-page-title mb-0">{{ __('product_sales_reports') }}</h3>
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb mb-0">
                            <li class="breadcrumb-item">
                                <router-link to="/delivery_boy/dashboard" class="text-muted">{{ __('dashboard') }}</router-link>
                            </li>
                            <li class="breadcrumb-item active text-primary" aria-current="page">{{ __('product_sales_reports') }}</li>
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
                                    <input id="filter-input" v-model="filter" type="search" class="figma-search-input"
                                        :placeholder="__('search')">
                                </div>
                            </div>
                            <div class="d-flex gap-2">
                                <button class="btn btn-figma-filter d-flex align-items-center gap-2 btn_refresh" v-b-tooltip.hover
                                    :title="__('refresh')" @click="getProductSalesReports()">
                                    <i class="fa fa-refresh" aria-hidden="true"></i>
                                    <span>{{ __('refresh') }}</span>
                                </button>
                            </div>
                        </div>
                        <div class="figma-filter-section">
                            <div class="row g-3">
                                <div class="col-md-6 col-lg-4">
                                    <div class="figma-filter-group">
                                        <label class="figma-filter-label">From & To Date</label>
                                        <date-range-picker :append-to-body="true" :single-date-picker="'range'"
                                            :locale-data="dateRangePickerLocale" :ranges="dateRangePickerRanges"
                                            v-model="dateRange" :autoApply=false :showDropdowns=true :maxDate="maxDate"
                                            @update="getProductSalesReports" class="w-100">

                                        </date-range-picker>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="table-responsive">
                            <b-table :items="productSalesReports" :fields="fields" :current-page="currentPage"
                                :per-page="perPage" :filter="filter" :filter-included-fields="filterOn"
                                :sort-by.sync="sortBy" :sort-desc.sync="sortDesc" :sort-direction="sortDirection"
                                :bordered="false" :busy="isLoading" stacked="md" show-empty small
                                :tbody-tr-class="() => 'figma-tr align-middle'" class="figma-order-table mb-0">
<template #empty="scope">
<div class="text-center text-muted py-4"><i class="fa fa-inbox fa-2x d-block mb-2"></i>{{ scope.emptyText }}</div>
</template>
<template #emptyfiltered="scope">
<div class="text-center text-muted py-4"><i class="fa fa-search fa-2x d-block mb-2"></i>{{ scope.emptyFilteredText }}</div>
</template>

                                <template #table-busy>
                                    <div class="text-center text-muted my-2">
                                        <b-spinner class="align-middle"></b-spinner>
                                        <strong>{{ __('loading') }}...</strong>
                                    </div>
                                </template>
                            </b-table>
                        </div>

                        <div class="figma-table-footer flex-wrap gap-3">
                            <div class="d-flex align-items-center gap-2">
                                <label for="per-page-select" class="showing-results-text mb-0">{{ __('per_page') }}</label>
                                <b-form-select id="per-page-select" v-model="perPage" :options="pageOptions"
                                    size="sm" class="form-select w-auto"></b-form-select>
                                <table-count :current-page="currentPage" :per-page="perPage" :total-rows="totalRows"></table-count>
                            </div>
                            <b-pagination v-model="currentPage" :total-rows="totalRows" :per-page="perPage"
                                align="right" class="figma-pagination mb-0"></b-pagination>
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
    components: { DateRangePicker },
    data: function () {
        let startDate = new Date();
        let endDate = new Date();
        startDate.setDate(startDate.getDate() - 30)
        return {
            dateRange: { startDate, endDate },
            maxDate: new Date(),
            fields: [
                { key: 'product_name', label: __('product_name'), sortable: true },
                { key: 'product_variant_id', label: 'Product Variant ID', sortable: true, sortDirection: 'desc' },
                { key: 'unit_name', label: __('unit_of_measure'), sortable: true },
                { key: 'total_sales', label: __('total_units_sold'), sortable: true },
                { key: 'total_price', label: __('total_sales'), sortable: true }
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
        getProductSalesReports() {
            this.isLoading = true;
            let param = {
                "startDate": moment(this.dateRange.startDate).format('YYYY-MM-DD'),
                "endDate": moment(this.dateRange.endDate).format('YYYY-MM-DD')
            }
            axios.get(this.$deliveryBoyApiUrl + '/product_sales_reports/', {
                params: param
            }).then((response) => {
                this.isLoading = false
                this.productSalesReports = response.data.data;
                this.totalRows = this.productSalesReports.length;
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
