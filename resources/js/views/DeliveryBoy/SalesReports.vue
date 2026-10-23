<template>
    <div>
        <div class="page-heading">
            <div class="page-title mb-4">
                <div class="d-flex justify-content-between align-items-center flex-wrap gap-2">
                    <h3 class="modern-page-title mb-0">{{ __('sales_reports') }}</h3>
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb mb-0">
                            <li class="breadcrumb-item">
                                <router-link to="/delivery_boy/dashboard" class="text-muted">{{ __('dashboard') }}</router-link>
                            </li>
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
                                    <input id="filter-input" v-model="filter" type="search" class="figma-search-input"
                                        :placeholder="__('search')">
                                </div>
                            </div>
                            <div class="d-flex gap-2">
                                <button class="btn btn-figma-filter d-flex align-items-center gap-2 btn_refresh" v-b-tooltip.hover
                                    :title="__('refresh')" @click="getSalesReports()">
                                    <i class="fa fa-refresh" aria-hidden="true"></i>
                                    <span>{{ __('refresh') }}</span>
                                </button>
                            </div>
                        </div>
                        <div class="figma-filter-section">
                            <div class="row g-3">
                                <div class="col-md-6 col-lg-4">
                                    <div class="figma-filter-group">
                                        <label class="figma-filter-label">{{ __('from_and_to_date') }}</label>
                                        <date-range-picker
                                            :append-to-body="true"
                                            :single-date-picker="'range'"
                                            :locale-data="dateRangePickerLocale"
                                            :ranges="dateRangePickerRanges"
                                            :autoApply=false
                                            :showDropdowns=true
                                            v-model="dateRange"
                                            :maxDate="maxDate"
                                            @update="getSalesReports"
                                            class="w-100"
                                        ></date-range-picker>
                                    </div>
                                </div>
                                <div class="col-md-6 col-lg-4">
                                    <div class="figma-filter-group">
                                        <label class="figma-filter-label" for="category">Category</label>
                                        <select name="category" id="category" v-model="category" @change="getSalesReports()"
                                                class="form-control form-select modern-select">
                                            <option value="">Select Category</option>
                                            <option v-for="category in categories" :value="category.id">{{ category.name }}
                                            </option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="table-responsive">
                            <b-table :items="salesReports" :fields="fields" :current-page="currentPage"
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

                                <template #cell(created_at)="row">
                                    {{ new Date(row.item.created_at).toLocaleString() }}
                                </template>
                            </b-table>
                        </div>
                        <div class="db-report-total">
                            <span class="text-muted">{{ __('total_amount') }}</span>
                            <strong class="text-success">{{ $currency }} {{ final_total_sum }}</strong>
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
    components: {DateRangePicker},
    data: function () {
        let startDate = new Date();
        let endDate = new Date();
        startDate.setDate(startDate.getDate() - 30)
        return {
            dateRange: {startDate, endDate},
            maxDate: new Date(),
            seller: "",
            category: "",
            fields: [
                {key: 'id', label: 'Order Item ID', sortable: true, sortDirection: 'desc'},
                {key: 'user_name', label: __('user'), sortable: true},
                {key: 'product_name', label: __('product'), sortable: true},
                {key: 'mobile', label: __('mobile'), sortable: true},
                {key: 'final_total', label: __('total') + ' (' + this.$currency + ')', sortable: true},
                {key: 'added_date', label: __('date'), sortable: true}
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
            categories: null
        }
    },
    computed: {
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
        getSalesReports() {
            this.isLoading = true;
            let param = {
                "startDate": moment(this.dateRange.startDate).format('YYYY-MM-DD'),
                "endDate": moment(this.dateRange.endDate).format('YYYY-MM-DD'),
                "seller": this.seller,
                "category": this.category
            }
            axios.get(this.$deliveryBoyApiUrl + '/sales_reports', {
                params: param
            }).then((response) => {
                this.isLoading = false
                this.sellers = response.data.data.sellers;
                this.categories = response.data.data.categories;
                this.salesReports = response.data.data.salesReports;
                this.final_total_sum = this.salesReports.map(item => item.final_total).reduce((prev, curr) => prev + curr, 0);
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

.db-report-total {
    display: flex;
    justify-content: flex-end;
    align-items: baseline;
    gap: 8px;
    padding: 12px 24px;
    border-top: 1px solid var(--ui-border);
    font-size: 14px;
}
</style>
