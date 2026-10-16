<template>
    <div>
        <div>
            <div class="page-heading">
                <div class="row">
                    <div class="col-12 col-md-6 order-md-1 order-last">
                        <h3>{{ __('sales_reports') }}</h3>
                    </div>
                    <div class="col-12 col-md-6 order-md-2 order-first">
                        <nav aria-label="breadcrumb" class="breadcrumb-header float-start float-lg-end">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><router-link to="/dashboard">{{ __('dashboard')
                                        }}</router-link></li>
                                <li class="breadcrumb-item active" aria-current="page">{{ __('sales_reports') }}</li>
                            </ol>
                        </nav>
                    </div>
                </div>
            </div>
            <section class="section">
                <div class="figma-main-section-card">
                    <div class="card-body p-0">
                        <!-- Modern Filter Action Bar -->
                        <div
                            class="d-flex justify-content-between align-items-center flex-wrap gap-2 figma-action-bar-row">
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
                                    @click="getSalesReports()">
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
                                            <label class="figma-filter-label">{{ __('date_range') || 'Date Range'
                                                }}</label>
                                            <div class="modern-datepicker-container">
                                                <date-range-picker :autoApply=false :showDropdowns=true
                                                    v-model="dateRange" :maxDate="maxDate" @update="getSalesReports"
                                                    :locale-data="dateRangePickerLocale" :ranges="dateRangePickerRanges"
                                                    :append-to-body="true" opens="right"
                                                    class="w-100"></date-range-picker>
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
                                            <select v-model="seller" @change="getSalesReports()"
                                                class="form-select modern-select">
                                                <option value="">{{ __('select_seller') }}</option>
                                                <option v-for="s in sellers" :value="s.id">{{ s.name }}</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="figma-filter-group">
                                            <label class="figma-filter-label">{{ __('select_category') }}</label>
                                            <select v-model="category" @change="getSalesReports()"
                                                class="form-select modern-select">
                                                <option value="">{{ __('select_category') }}</option>
                                                <option v-for="c in categories" :value="c.id">{{ c.name }}</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="figma-filter-group">
                                            <label class="figma-filter-label">{{ __('select_delivery_boys') }}</label>
                                            <select v-model="deliveryBoy" @change="getSalesReports()"
                                                class="form-select modern-select">
                                                <option value="">{{ __('select_delivery_boys') }}</option>
                                                <option v-for="d in deliveryBoys" :value="d.id">{{ d.name }}</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="figma-filter-group">
                                            <label class="figma-filter-label">{{ __('payment_type') }}</label>
                                            <select v-model="payment_type" @change="getSalesReports()"
                                                class="form-select modern-select">
                                                <option value="">{{ __('payment_type') }}</option>
                                                <option :value="1">{{ __('cod') }}</option>
                                                <option :value="2">{{ __('online') }}</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-md-4 d-flex align-items-end">
                                        <button class="btn btn-figma-filter d-flex align-items-center gap-2"
                                            @click="dateRange.startDate = null; dateRange.endDate = null; seller = ''; category = ''; deliveryBoy = ''; payment_type = ''; getSalesReports()">
                                            <i class="fa fa-eraser"></i>
                                            <span>{{ __('clear') || 'Clear' }}</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </b-collapse>

                        <div class="table-responsive mb-0">
                            <b-table :items="salesReports" :fields="fields" :current-page="currentPage"
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
                                <template #head(final_total)="row">
                                    {{ __('total') }} ({{ $currency }})
                                </template>
                                <template #cell(created_at)="row">
                                    {{ new Date(row.item.created_at).toLocaleString() }}
                                </template>
                                <!-- Margin % cell: colour-coded -->
                                <template #cell(margin_pct)="row">
                                    <span
                                        :class="row.item.margin_pct >= 0 ? 'text-success fw-semibold' : 'text-danger fw-semibold'">
                                        {{ row.item.margin_pct }}%
                                    </span>
                                </template>
                                <!-- Margin amount cell: colour-coded -->
                                <template #cell(margin_amount)="row">
                                    <span :class="row.item.margin_amount >= 0 ? 'text-success' : 'text-danger'">
                                        {{ $currency }} {{ Number(row.item.margin_amount).toFixed(2) }}
                                    </span>
                                </template>
                                <!-- Cost cells -->
                                <template #cell(cost_price)="row">
                                    {{ $currency }} {{ Number(row.item.cost_price).toFixed(2) }}
                                </template>
                                <template #cell(cost_total)="row">
                                    {{ $currency }} {{ Number(row.item.cost_total).toFixed(2) }}
                                </template>
                            </b-table>
                        </div>

                        <!-- Summary Stats Bar -->
                        <div class="row g-3 my-3" v-if="salesReports.length > 0">
                            <div class="col-6 col-md-3">
                                <div class="p-3 rounded border text-center bg-light">
                                    <div class="text-muted small mb-1">{{ __('total_revenue') }}</div>
                                    <div class="h6 mb-0 text-primary fw-bold">{{ $currency }} {{
                                        total_revenue.toFixed(2) }}</div>
                                </div>
                            </div>
                            <div class="col-6 col-md-3">
                                <div class="p-3 rounded border text-center bg-light">
                                    <div class="text-muted small mb-1">{{ __('total_cost') }}</div>
                                    <div class="h6 mb-0 text-secondary fw-bold">{{ $currency }} {{ total_cost.toFixed(2)
                                        }}</div>
                                </div>
                            </div>
                            <div class="col-6 col-md-3">
                                <div class="p-3 rounded border text-center bg-light">
                                    <div class="text-muted small mb-1">{{ __('total_margin') }}</div>
                                    <div class="h6 mb-0 fw-bold"
                                        :class="total_margin >= 0 ? 'text-success' : 'text-danger'">{{ $currency }} {{
                                        total_margin.toFixed(2) }}</div>
                                </div>
                            </div>
                            <div class="col-6 col-md-3">
                                <div class="p-3 rounded border text-center bg-light">
                                    <div class="text-muted small mb-1">{{ __('overall_margin_pct') }}</div>
                                    <div class="h6 mb-0 fw-bold"
                                        :class="overall_margin_pct >= 0 ? 'text-success' : 'text-danger'">{{
                                        overall_margin_pct }}%</div>
                                </div>
                            </div>
                        </div>
                        <b-row>
                            <div class="col-md-4 text-success h6">{{ __('total_amount') }} :- {{ $currency }} {{
                                final_total_sum.toFixed(2) }}
                            </div>
                        </b-row>
                        <div class="figma-table-footer">
                            <div class="showing-results-text">
                                {{ __('Showing Result') }} : <span class="showing-bold">{{ pageEnd }}</span> {{ __('of')
                                }} <span class="showing-bold">{{ totalRows }}</span>
                            </div>
                            <b-pagination v-model="currentPage" :total-rows="totalRows" :per-page="perPage"
                                align="right" class="figma-pagination mb-0" hide-goto-end-buttons hide-ellipsis
                                prev-text="<" next-text=">"></b-pagination>
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
        return {
            showFilters: false,
            dateRange: { startDate: null, endDate: null },
            maxDate: new Date(),
            seller: "",
            category: "",
            fields: [
                { key: 'id', label: __('order_item_id'), sortable: true, sortDirection: 'desc' },
                { key: 'user_name', label: __('user'), sortable: true, class: 'text-center' },
                { key: 'product_name', label: __('product'), sortable: true, class: 'text-center' },
                { key: 'mobile', label: __('mobile'), sortable: true, class: 'text-center' },
                { key: 'quantity', label: __('quantity'), sortable: true, class: 'text-center' },
                { key: 'sub_total', label: __('revenue') + ' (' + this.$currency + ')', sortable: true, class: 'text-center' },
                { key: 'cost_price', label: __('cost_price') + ' (' + this.$currency + ')', sortable: true, class: 'text-center' },
                { key: 'cost_total', label: __('cost_total') + ' (' + this.$currency + ')', sortable: true, class: 'text-center' },
                { key: 'margin_amount', label: __('margin_amount') + ' (' + this.$currency + ')', sortable: true, class: 'text-center' },
                { key: 'margin_pct', label: __('margin_pct'), sortable: true, class: 'text-center' },
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
            page: 1,

            isLoading: false,
            sectionStyle: 'style_1',
            max_visible_units: 12,
            max_col_in_single_row: 3,
            salesReports: [],
            final_total_sum: 0,
            total_revenue: 0,
            total_cost: 0,
            total_margin: 0,
            overall_margin_pct: 0,
            sellers: null,
            categories: null,
            deliveryBoy: '',
            deliveryBoys: '',
            payment_type: '',
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
                "startDate": (this.dateRange.startDate != null) ? moment(this.dateRange.startDate).format('YYYY-MM-DD') : "",
                "endDate": (this.dateRange.endDate != null) ? moment(this.dateRange.endDate).format('YYYY-MM-DD') : "",
                "seller": this.seller,
                "category": this.category,
                "deliveryBoy": this.deliveryBoy,
                "payment_type": this.payment_type
            }
            axios.get(this.$apiUrl + '/sales_reports', {
                params: param
            }).then((response) => {
                this.isLoading = false
                this.sellers = response.data.data.sellers;
                this.categories = response.data.data.categories;
                this.deliveryBoys = response.data.data.deliveryBoys;
                this.salesReports = response.data.data.salesReports;
                this.final_total_sum = this.salesReports.map(item => item.sub_total).reduce((prev, curr) => prev + curr, 0) || 0;
                this.total_revenue = response.data.data.total_revenue || 0;
                this.total_cost = response.data.data.total_cost || 0;
                this.total_margin = response.data.data.total_margin || 0;
                this.overall_margin_pct = response.data.data.overall_margin_pct || 0;
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