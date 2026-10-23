<template>
    <div>
        <!-- Welcome header (same as the admin dashboard) -->
        <div class="page-heading mb-4">
            <h2 class="h4 font-weight-bold text-dark mb-1">{{ __('Welcome') }}<template v-if="welcomeName">, {{ welcomeName }}</template></h2>
            <p class="text-muted small mb-0">{{ greetingMessage }} &bull; {{ welcomeDate }}</p>
        </div>
        <div class="page-content">
            <section class="row">

                <!-- Seller Dashboard Content -->
                <div class="col-12 px-0">

                <!-- Row 1: Dashboard Counter (KPI tiles, same look as the admin dashboard) -->
                <div class="row g-3 mb-4">
                    <div class="col-12 col-sm-6 col-lg-4">
                        <router-link to="/seller/orders" class="dash-stat-card figma-kpi-card-v2 w-100 h-100 text-decoration-none">
                            <div class="d-flex align-items-center gap-3">
                                <div class="figma-stat-icon-box bg-stat-blue">
                                    <i class="fa fa-shopping-cart"></i>
                                </div>
                                <div class="d-flex flex-column text-start min-w-0">
                                    <span class="figma-stat-label d-block">{{ __('orders') }}</span>
                                    <h4 class="figma-stat-value mb-0 text-nowrap">{{ record.order_count }}</h4>
                                    <span class="dash-stat-sub d-block text-truncate">{{ __('total_orders') }}</span>
                                </div>
                            </div>
                        </router-link>
                    </div>
                    <div class="col-12 col-sm-6 col-lg-4">
                        <router-link to="/seller/manage_products" class="dash-stat-card figma-kpi-card-v2 w-100 h-100 text-decoration-none">
                            <div class="d-flex align-items-center gap-3">
                                <div class="figma-stat-icon-box bg-stat-orange">
                                    <i class="fa fa-cubes"></i>
                                </div>
                                <div class="d-flex flex-column text-start min-w-0">
                                    <span class="figma-stat-label d-block">{{ __('products') }}</span>
                                    <h4 class="figma-stat-value mb-0 text-nowrap">{{ record.product_count }}</h4>
                                    <span class="dash-stat-sub d-block text-truncate">{{ __('total_products') }}</span>
                                </div>
                            </div>
                        </router-link>
                    </div>
                    <div class="col-12 col-sm-6 col-lg-4">
                        <router-link to="/seller/categories" class="dash-stat-card figma-kpi-card-v2 w-100 h-100 text-decoration-none">
                            <div class="d-flex align-items-center gap-3">
                                <div class="figma-stat-icon-box bg-stat-purple">
                                    <i class="fa fa-bullseye"></i>
                                </div>
                                <div class="d-flex flex-column text-start min-w-0">
                                    <span class="figma-stat-label d-block">{{ __('category') }}</span>
                                    <h4 class="figma-stat-value mb-0 text-nowrap">{{ record.category_count }}</h4>
                                    <span class="dash-stat-sub d-block text-truncate">{{ __('total_categories') }}</span>
                                </div>
                            </div>
                        </router-link>
                    </div>
                    <div class="col-12 col-sm-6 col-lg-4">
                        <router-link to="/seller/dashboard" class="dash-stat-card figma-kpi-card-v2 w-100 h-100 text-decoration-none">
                            <div class="d-flex align-items-center gap-3">
                                <div class="figma-stat-icon-box bg-stat-green">
                                    <i class="fa fa-money"></i>
                                </div>
                                <div class="d-flex flex-column text-start min-w-0">
                                    <span class="figma-stat-label d-block">{{ __('balance') }}</span>
                                    <h4 class="figma-stat-value mb-0 text-nowrap">{{ $currency }} {{ record.balance }}</h4>
                                    <span class="dash-stat-sub d-block text-truncate">{{ __('total_balance') }}</span>
                                </div>
                            </div>
                        </router-link>
                    </div>
                    <div class="col-12 col-sm-6 col-lg-4">
                        <router-link :to="{ name: 'SellerProductInfo', params: { type: 'sold_out' } }" class="dash-stat-card figma-kpi-card-v2 w-100 h-100 text-decoration-none">
                            <div class="d-flex align-items-center gap-3">
                                <div class="figma-stat-icon-box bg-stat-red">
                                    <i class="fa fa-ban"></i>
                                </div>
                                <div class="d-flex flex-column text-start min-w-0">
                                    <span class="figma-stat-label d-block">{{ __('products_sold_out') }}</span>
                                    <h4 class="figma-stat-value mb-0 text-nowrap">{{ record.sold_out_count }}</h4>
                                    <span class="dash-stat-sub d-block text-truncate">{{ __('total_sold_out') }}</span>
                                </div>
                            </div>
                        </router-link>
                    </div>
                    <div class="col-12 col-sm-6 col-lg-4">
                        <router-link :to="{ name: 'SellerProductInfo', params: { type: 'low_stock' } }" class="dash-stat-card figma-kpi-card-v2 w-100 h-100 text-decoration-none">
                            <div class="d-flex align-items-center gap-3">
                                <div class="figma-stat-icon-box bg-stat-orange">
                                    <i class="fa fa-warning"></i>
                                </div>
                                <div class="d-flex flex-column text-start min-w-0">
                                    <span class="figma-stat-label d-block">{{ __('products_in_low_stock') }}</span>
                                    <h4 class="figma-stat-value mb-0 text-nowrap">{{ record.low_stock_count }}</h4>
                                    <span class="dash-stat-sub d-block text-truncate">{{ __('total_low_stock') }}</span>
                                </div>
                            </div>
                        </router-link>
                    </div>
                </div>

                <!-- Row 2: Weekly Sales (8 cols) + Order Out Lines (4 cols), as on the admin dashboard -->
                <div class="row g-4 mb-4">
                    <div class="col-12 col-xl-8">
                        <div class="card border rounded-4 h-100 mb-0 overflow-hidden figma-card">
                            <div class="card-header bg-white border-0 py-3 px-4 d-flex align-items-center justify-content-between flex-wrap gap-3">
                                <div class="d-flex flex-column">
                                    <h4 class="h6 font-weight-bold text-dark mb-1">{{ __('weekly_sales') }}</h4>
                                    <span class="text-muted small">{{ __('total_sale_in_last_week') }} ({{ __('month') }}: {{ currentMonth }})</span>
                                </div>
                                <div class="d-flex align-items-center gap-3">
                                    <div class="d-none d-sm-flex align-items-center gap-3 text-muted small">
                                        <div class="d-flex align-items-center gap-2">
                                            <span class="dot-sm bg-primary"></span>
                                            <span class="text-capitalize">{{ __('total_sale') || 'Total Sale' }}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="card-body p-3 p-sm-4 pt-1">
                                <apexchart :options="options" :series="series" width="100%" height="350"
                                    ref="apexBarChart">
                                </apexchart>
                            </div>
                        </div>
                    </div>
                    <!-- Order Out Lines -->
                    <div class="col-12 col-xl-4">
                        <div class="card border rounded-4 h-100 figma-card">
                            <div class="card-header bg-white border-bottom py-3 px-4 d-flex align-items-center justify-content-between">
                                <h4 class="h6 font-weight-bold text-dark mb-0">{{ __('order_out_lines') }}</h4>
                            </div>
                            <div class="card-body p-4 d-flex flex-column justify-content-center">
                                <div class="d-flex flex-column gap-3" v-if="orderStatusItems.length">
                                    <div class="d-flex align-items-center gap-3" v-for="(item, idx) in orderStatusItems" :key="'os-' + idx">
                                        <div class="rounded-3 d-flex align-items-center justify-content-center"
                                            :style="{ background: item.bgColor, width: '40px', height: '40px', borderRadius: '10px', flexShrink: 0 }">
                                            <base-icon v-if="item.icon" :name="item.icon" width="24" height="24" />
                                        </div>
                                        <div class="flex-grow-1">
                                            <div class="d-flex justify-content-between align-items-center mb-1">
                                                <span class="figma-order-status-label">{{ item.label }}</span>
                                                <span class="figma-order-status-count mb-0">{{ item.count }}</span>
                                            </div>
                                            <div class="rounded-pill overflow-hidden" :style="{ height: '6px', backgroundColor: item.bgColor }">
                                                <div class="h-100 rounded-pill"
                                                    :style="{ width: item.percent + '%', backgroundColor: item.color }"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div v-else class="d-flex flex-column align-items-center justify-content-center text-center py-5 text-muted small">
                                    <i class="fa fa-inbox fa-2x mb-2 opacity-50"></i>
                                    <span>{{ __('No data found') }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Row 3: Categorywise Product Count -->
                <div class="row g-4 mb-4">
                    <!-- Categorywise Product Count -->
                    <div class="col-12 product_category_count">
                        <div class="card border rounded-4 h-100 figma-card">
                            <div class="card-header bg-white border-0 py-3 px-4 d-flex align-items-center justify-content-between flex-wrap gap-2">
                                <h4 class="h6 font-weight-bold text-dark mb-0">
                                    {{ __('product_category_count') }}
                                    <span class="text-muted small font-weight-normal ms-1" v-if="options2.labels.length">({{ options2.labels.length }} {{ __('categories') }})</span>
                                </h4>
                            </div>
                            <div class="card-body p-3 p-sm-4">
                                <div v-if="series2.length > 0" class="row align-items-center">
                                    <div class="col-12 col-md-5 col-xl-4">
                                        <apexcharts width="100%" height="300" type="donut" :options="options2"
                                            :series="series2"></apexcharts>
                                    </div>
                                    <div class="col-12 col-md-7 col-xl-8">
                                        <div class="d-flex flex-column gap-3 pe-md-4 mt-4 mt-md-0 category-legend">
                                            <div v-for="(item, idx) in categoryChartDataFormatted" :key="'cat-' + idx" class="d-flex align-items-center">
                                                <div class="rounded-circle me-3 flex-shrink-0" :style="{ width: '12px', height: '12px', backgroundColor: item.color }"></div>
                                                <div class="text-dark small flex-shrink-0">{{ item.name }}</div>
                                                <div class="flex-grow-1 mx-3 dash-leader"></div>
                                                <div class="text-dark small font-weight-bold flex-shrink-0">{{ item.value }}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div v-else class="d-flex flex-column align-items-center justify-content-center text-center py-5 text-muted small">
                                    <i class="fa fa-inbox fa-2x mb-2 opacity-50"></i>
                                    <span>{{ __('no_product_found') }}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                <!-- Latest Orders -->
                <div class="card figma-card text-dark mt-4">
                    <div class="card-header">
                        <h4 class="text-dark">{{ __('latest_orders') || 'Latest Orders' }}</h4>
                        <div class="d-flex align-items-center gap-2">
                            <!-- <button class="btn btn-light-soft btn-sm rounded-3 p-2" @click="getLatestOrders()">
                                <i class="fa fa-refresh text-dark"></i>
                            </button> -->
                            <router-link to="/seller/orders" class="btn btn-light btn-sm px-3 view-order-btn">
                                <span class="small font-weight-bold">{{ __('view_orders') || 'View Orders' }}</span>
                                <i class="fa fa-arrow-right ms-1 extra-small"></i>
                            </router-link>
                        </div>
                    </div>
                    <div class="card-body p-0">
                        <div class="table-responsive dash-orders-scroll">
                            <b-table :items="orders" :fields="orderFields" :current-page="orderCurrentPage"
                                :per-page="orderPerPage" :filter="filter" :filter-included-fields="filterOn"
                                :sort-by.sync="sortBy" :sort-desc.sync="sortDesc"
                                :sort-direction="sortDirection" :bordered="false" :busy="isLoading"
                                show-empty :tbody-tr-class="() => 'figma-tr align-middle'" small
                                class="figma-order-table text-dark mb-0">
<template #empty="scope">
<div class="text-center text-muted py-4"><i class="fa fa-inbox fa-2x d-block mb-2"></i>{{ scope.emptyText }}</div>
</template>
<template #emptyfiltered="scope">
<div class="text-center text-muted py-4"><i class="fa fa-search fa-2x d-block mb-2"></i>{{ scope.emptyFilteredText }}</div>
</template>


                                <template #table-busy>
                                    <div class="text-center py-4">
                                        <b-spinner class="align-middle" variant="primary"></b-spinner>
                                    </div>
                                </template>

                                <template #cell(id)="row">
                                    <div class="figma-link-blue">
                                        #{{ row.item.id }}
                                    </div>
                                </template>

                                <template #cell(user_name)="row">
                                    <div class="d-flex flex-column">
                                        <span class="figma-customer-name">{{ row.item.user_name }}</span>
                                        <span class="figma-customer-email">{{ row.item.email || row.item.mobile }}</span>
                                    </div>
                                </template>

                                <template #cell(total)="row">
                                    <div class="d-flex flex-column">
                                        <span class="figma-amount-bold">{{ $currency }}{{ row.item.total }}</span>
                                        <span class="figma-text-muted small">{{ row.item.payment_method }}</span>
                                    </div>
                                </template>

                                <template #cell(delivery_time)="row">
                                    <div class="d-flex flex-column">
                                        <span class="figma-date-bold">{{ formatDateBold(row.item.created_at || row.item.delivery_time) }}</span>
                                        <span class="figma-time-light">{{ getPeriodLabel(row.item.created_at || row.item.delivery_time) }}, {{ formatTimeLight(row.item.created_at || row.item.delivery_time) }}</span>
                                    </div>
                                </template>

                                <template #cell(active_status)="row">
                                    <span class="figma-status-pill" :class="getStatusBadgeClass(row.item.active_status)">
                                        {{ getStatusLabelById(row.item.active_status) }}
                                    </span>
                                </template>

                                <template #cell(actions)="row">
                                    <div class="d-flex gap-2 justify-content-center">
                                        <router-link
                                            :to="{ name: 'SellerViewOrder', params: { id: row.item.id, record: row.item } }"
                                            class="figma-action-btn">
                                            <i class="fa fa-eye text-primary"></i>
                                        </router-link>
                                    </div>
                                </template>
                            </b-table>
                        </div>
                        <div class="d-flex justify-content-between align-items-center flex-wrap gap-2 px-3 px-sm-4 pb-3 border-top pt-3 bg-light-soft rounded-bottom-4 dash-pager" v-if="orderTotalRows > 0">
<div class="d-flex align-items-center gap-3 flex-wrap">
                                <div class="d-flex align-items-center gap-2">
                                    <label class="showing-results-text mb-0">{{ __('per_page') }}</label>
                                    <b-form-select v-model="orderPerPage" :options="pageOptions" size="sm" class="w-auto" @change="orderCurrentPage = 1"></b-form-select>
                        <table-count :current-page="orderCurrentPage" :per-page="orderPerPage" :total-rows="orderTotalRows"></table-count>
                                </div>
                                <div class="showing-results-text small">
                                    {{ __('Showing Result') }} : <span class="showing-bold">{{ orderPageEnd }}</span> {{ __('of') }} <span class="showing-bold">{{ orderTotalRows }}</span>
                                </div>
                            </div>
                            <b-pagination v-model="orderCurrentPage" :total-rows="orderTotalRows" :per-page="orderPerPage"
                                align="right" class="figma-pagination mb-0"
                                hide-goto-end-buttons hide-ellipsis prev-text="<" next-text=">"></b-pagination>
                        </div>
                    </div>
                </div><!-- end Latest Orders -->
                </div><!-- end col-12 wrapper -->
            </section>
        </div>
    </div>
</template>

<script>
import DateRangePicker from 'vue2-daterange-picker'
import DateRangePickerMixin from '../../mixins/DateRangePickerMixin'
import axios from "axios";
import { GChart } from 'vue-google-charts/legacy';
import moment from "moment";
import VueApexCharts from 'vue-apexcharts'
export default {
    name: 'Chart',
    mixins: [DateRangePickerMixin],
    components: {
        GChart,
        apexcharts: VueApexCharts,
        DateRangePicker
    },
    data: function () {
        let startDate = new Date();
        let endDate = new Date();
        startDate.setDate(startDate.getDate() - 30);
        return {
            dateRange: { startDate, endDate },
            deliveryDateRange: { startDate: null, endDate: null },
            maxDate: new Date(),
            isLoading: false,
            record: [],
            currentMonth: "",

            orderFields: [
                { key: 'id', label: __('oid'), sortable: true, sortDirection: 'desc', class: 'text-start' },
                { key: 'user_name', label: __('user'), sortable: true, class: 'text-start' },
                { key: 'mobile', label: __('mobile'), sortable: true },
                { key: 'total', label: __('total'), sortable: true },
                { key: 'delivery_charge', label: __('dcharges'), sortable: true },
                { key: 'tax', label: __('tax'), sortable: true },
                { key: 'discount', label: __('disc'), sortable: true },
                { key: 'promo_discount', label: __('promo_disc'), sortable: true },
                { key: 'wallet_balance', label: __('wallet_used'), sortable: true },
                { key: 'remaining_final', label: __('ftotal'), sortable: true },
                { key: 'payment_method', label: __('p_method'), sortable: true },
                { key: 'delivery_time', label: __('d_time'), sortable: true },
                { key: 'active_status', label: __('status'), sortable: true, class: 'text-center' },
                { key: "actions", label: __('actions'), class: 'text-center' }
            ],

            pageOptions: this.$pageOptions,
            sortBy: '',
            sortDesc: false,
            sortDirection: 'asc',
            filter: null,
            filterOn: [],
            page: 1,

            sectionStyle: 'style_1',
            max_visible_units: 12,
            max_col_in_single_row: 3,

            statuses: [],

            orders: [],
            orderTotalRows: 1,
            orderCurrentPage: 1,
            orderPerPage: this.$perPage,
            status: "",


            graphOrders: [],
            isLoadingColumnChart: false,
            graphCategories: [],

            chartData: [],
            options: {
                chart: {
                    height: 350,
                    type: 'bar',
                    toolbar: { show: false },
                    fontFamily: 'Nunito, sans-serif'
                },
                plotOptions: {
                    bar: {
                        columnWidth: '40%',
                        borderRadius: 4,
                    }
                },
                colors: [this.$themeColor('primary-500')],
                dataLabels: {
                    enabled: false
                },
                xaxis: {
                    categories: [],
                    axisBorder: {
                        show: false
                    },
                    axisTicks: {
                        show: false
                    },
                    labels: {
                        style: { colors: this.$themeColor('neutral-500'), fontSize: '12px' }
                    }
                },
                yaxis: {
                    labels: {
                        style: { colors: this.$themeColor('neutral-500'), fontSize: '12px' },
                        formatter: (val) => (val || 0).toLocaleString()
                    }
                },
                grid: {
                    borderColor: this.$themeColor('neutral-200'),
                    strokeDashArray: 4
                },
                legend: {
                    show: false
                },
                tooltip: {
                    shared: true,
                    intersect: false,
                    custom: function ({ series, seriesIndex, dataPointIndex, w }) {
                        const cat = w.globals.categoryLabels[dataPointIndex] || w.config.xaxis.categories[dataPointIndex];
                        const sale = series[0] ? series[0][dataPointIndex] : 0;
                        return '<div style="background:var(--theme-neutral-900);color:var(--theme-neutral-50);padding:12px;border-radius:12px;font-size:13px;line-height:1.6;border:none;box-shadow:0 10px 15px -3px rgba(0,0,0,0.1)">' +
                            '<div style="margin-bottom:4px;font-weight:700">' + cat + '</div>' +
                            '<div style="display:flex;align-items:center;gap:8px"><span style="width:8px;height:8px;border-radius:50%;background:var(--theme-primary-500)"></span> Total Sale : <span style="font-weight:700">' + (sale || 0).toLocaleString() + '</span></div>' +
                            '</div>';
                    }
                },
                noData: {
                    text: "No Data Found",
                    align: 'center',
                }
            },

            series: [{
                name: 'Total Sale',
                data: []
            }],
            categoryChartColors: this.$themeChartColors(),
            options2: {
                chart: { type: 'donut', fontFamily: 'Nunito, sans-serif' },
                labels: [],
                colors: [],
                legend: { show: false },
                dataLabels: { enabled: false },
                plotOptions: { pie: { donut: { size: '75%' } } },
                stroke: { width: 4, colors: [this.$themeColor('neutral-50')] },
                tooltip: {
                    y: { formatter: (val) => (val || 0).toLocaleString() }
                },
            },
            series2: []
        };
    },
    computed: {
        welcomeName() {
            // Same source as the header's user menu (Auth.js stores the signed-in user here).
            try {
                const user = JSON.parse(window.localStorage.getItem('user') || 'null');
                if (user) return user.username || user.name || '';
            } catch (e) { }
            return '';
        },
        greetingMessage() {
            const hour = new Date().getHours();
            if (hour < 12) return this.__('Good morning');
            if (hour < 17) return this.__('Good afternoon');
            return this.__('Good evening');
        },
        welcomeDate() {
            return moment().format('DD MMM YYYY');
        },
        orderPageStart() {
            if (this.orderTotalRows === 0) return 0;
            return (this.orderCurrentPage - 1) * this.orderPerPage + 1;
        },
        orderPageEnd() {
            return Math.min(this.orderCurrentPage * this.orderPerPage, this.orderTotalRows);
        },
        orderTotalPages() {
            return Math.ceil(this.orderTotalRows / this.orderPerPage);
        },
        categoryChartDataFormatted() {
            return this.options2.labels.map((label, index) => ({
                name: label,
                value: this.series2[index] || 0,
                color: this.categoryChartColors[index % this.categoryChartColors.length] || this.$themeColor('neutral-950')
            }));
        },
        orderStatusItems() {
            const statusOrderCount = (this.record && this.record.status_order_count) ? this.record.status_order_count : [];
            if (!statusOrderCount.length) return [];
            const allowedStatuses = ['Payment Pending', 'Pending', 'Received', 'Processed', 'Shipped', 'Out For Delivery', 'Delivered'];
            const filtered = statusOrderCount.filter(s => allowedStatuses.includes(s.status));
            const maxCount = Math.max(...filtered.map(s => s.order_count || 0), 1);
            const statusMap = {
                'Payment Pending': { color: 'var(--theme-warn-500)', bgColor: 'var(--theme-warn-50)', label: this.__('payment_pending') || 'Payment Pending', icon: 'Payment Pending' },
                'Pending':         { color: 'var(--theme-warn-500)', bgColor: 'var(--theme-warn-50)', label: this.__('pending') || 'Pending', icon: 'Pending' },
                'Received':        { color: 'var(--theme-info-500)', bgColor: 'var(--theme-info-50)', label: this.__('received') || 'Received', icon: 'Received' },
                'Processed':       { color: 'var(--theme-success-500)', bgColor: 'var(--theme-success-50)', label: this.__('processed') || 'Processed', icon: 'Processed' },
                'Shipped':         { color: 'var(--theme-info-600)', bgColor: 'var(--theme-info-100)', label: this.__('shipped') || 'Shipped', icon: 'Shipped' },
                'Out For Delivery':{ color: 'var(--theme-primary-500)', bgColor: 'var(--theme-primary-50)', label: this.__('out_for_delivery') || 'Out for Delivery', icon: 'Out for Delivery' },
                'Delivered':       { color: 'var(--theme-success-500)', bgColor: 'var(--theme-success-50)', label: this.__('delivered') || 'Delivered', icon: 'Delivered' },
            };
            return filtered.map(s => {
                const mapped = statusMap[s.status];
                return {
                    label: mapped.label,
                    count: s.order_count || 0,
                    color: mapped.color,
                    bgColor: mapped.bgColor,
                    icon: mapped.icon || null,
                    percent: Math.round(((s.order_count || 0) / maxCount) * 100),
                };
            });
        }
    },
    mounted() {
        // Set the initial number of items
        this.orderTotalRows = this.orders.length
    },
    created() {
        let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        let now = new Date();
        this.currentMonth = months[now.getMonth()];

        // Dynamic chart translations
        const totalSaleText = this.__('total_sale') || 'Total Sale';
        const noDataFoundText = this.__('no_data_found') || 'No Data Found';

        this.options.noData.text = noDataFoundText;
        this.series[0].name = totalSaleText;

        const primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--theme-primary-500').trim();
        this.options.colors = [primaryColor];

        this.options.tooltip.custom = ({ series, seriesIndex, dataPointIndex, w }) => {
            const cat = w.globals.categoryLabels[dataPointIndex] || w.config.xaxis.categories[dataPointIndex];
            const sale = series[0] ? series[0][dataPointIndex] : 0;
            return '<div style="background:var(--theme-neutral-900);color:var(--theme-neutral-50);padding:12px;border-radius:12px;font-size:13px;line-height:1.6;border:none;box-shadow:0 10px 15px -3px rgba(0,0,0,0.1)">' +
                '<div style="margin-bottom:4px;font-weight:700">' + cat + '</div>' +
                '<div style="display:flex;align-items:center;gap:8px"><span style="width:8px;height:8px;border-radius:50%;background:' + primaryColor + '"></span> ' + totalSaleText + ' : <span style="font-weight:700">' + (sale || 0).toLocaleString() + '</span></div>' +
                '</div>';
        };

        this.getRecord();
        this.getOrderStatus();
        this.getLatestOrders();
    },
    methods: {
        /**
         * Status name for display. Backend returns status_name as string (app) or object by lang code (panel).
         * When object, use app_locale to pick the name; fallback to status.status.
         */
        getStatusDisplayName(status) {
            if (!status) return '';
            const sn = status.status_name;
            if (sn == null) return status.status || '';
            if (typeof sn === 'string') return sn.trim() || status.status || '';
            if (typeof sn === 'object' && !Array.isArray(sn)) {
                const appLocale = window.appLocale || window.localStorage.getItem('lang') || 'en';
                const forLocale = sn[appLocale];
                if (forLocale != null && String(forLocale).trim() !== '') return String(forLocale).trim();
                const first = Object.values(sn).find(val => val != null && String(val).trim() !== '');
                return first != null ? String(first).trim() : (status.status || '');
            }
            return status.status || '';
        },
        /**
         * Translation key for order status id (matches OrderStatusList keys in lang files).
         */
        getStatusTranslationKey(id) {
            const map = { 1: 'payment_pending', 2: 'received', 3: 'processed', 4: 'shipped', 5: 'outForDelivery', 6: 'delivered', 7: 'cancelled', 8: 'returned', 9: 'pending', 10: 'ready_for_pickup', 11: 'picked_up' };
            return map[Number(id)] || '';
        },
        /**
         * Lang-wise label for status dropdown (uses panel __() and current language).
         */
        getStatusLabel(status) {
            if (!status) return '';
            const key = this.getStatusTranslationKey(status.id);
            return key ? this.__(key) : (status.status || '');
        },
        /**
         * Normalize category name for display. Backend returns string (app) or object by lang code (panel).
         * When object, use app_locale (window.appLocale or localStorage lang) to pick the name; fallback to first non-empty.
         */
        getCategoryDisplayName(name) {
            if (name == null) return '';
            if (typeof name === 'string') return name;
            if (typeof name === 'object' && !Array.isArray(name)) {
                const appLocale = window.appLocale || window.localStorage.getItem('lang') || 'en';
                const forLocale = name[appLocale];
                if (forLocale != null && String(forLocale).trim() !== '') return String(forLocale).trim();
                const firstNonEmpty = Object.values(name).find(val => val != null && String(val).trim() !== '');
                return firstNonEmpty != null ? String(firstNonEmpty).trim() : '';
            }
            return '';
        },
        getRecord: function () {
            let vm = this;
            this.isLoading = true;
            axios.get(this.$sellerApiUrl + '/dashboard').then(res => {
                vm.isLoading = false;
                let data = res.data;
                if (data.status === 1) {
                    this.record = data.data;

                    // barChart / pie: name can be string or object by lang code – use helper so we never push [object Object]
                    this.graphCategories = data.data.category_product_count;
                    this.graphCategories.forEach((category) => {
                        if (category.product_count !== 0) {
                            this.options2.labels.push(this.getCategoryDisplayName(category.name));
                            this.series2.push(category.product_count);
                        }
                    });
                    
                    // Duplicate colors if needed
                    let totalColorsNeeded = this.options2.labels.length;
                    let colorsArray = [];
                    for(let i=0; i<totalColorsNeeded; i++){
                        colorsArray.push(this.categoryChartColors[i % this.categoryChartColors.length]);
                    }
                    this.options2.colors = colorsArray;
                    // pieChart
                    this.graphOrders = data.data.weekly_sales;
                    this.graphOrders.forEach((order) => {
                        this.options.xaxis.categories.push(moment(order.order_date).format('DD-MMM'));
                        this.series[0].data.push(order.total_sale);
                    });
                    this.$refs.apexBarChart.updateSeries([{
                        data: this.series[0].data,
                    }], false, true);
                }
            }).catch(error => {
                vm.isLoading = false;
                if (error.request && error.request.statusText) {
                    this.showError(error.request.statusText);
                } else if (error.message) {
                    this.showError(error.message);
                } else {
                    this.showError("Something went wrong!");
                }
            });
        },
        getOrderStatus: function () {
            let vm = this;
            axios.get(this.$apiUrl + '/order_statuses').then((response) => {
                this.isLoading = false
                this.statuses = response.data.data;
            }).catch(error => {
                vm.isLoading = false;
                if (error.request && error.request.statusText) {
                    this.showError(error.request.statusText);
                } else if (error.message) {
                    this.showError(error.message);
                } else {
                    this.showError("Something went wrong!");
                }
            });
        },
        getLatestOrders: function () {
            this.isLoading = true;
            let vm = this;
            let param = {
                "startDate": (this.dateRange.startDate != null) ? moment(this.dateRange.startDate).format('YYYY-MM-DD') : "",
                "endDate": (this.dateRange.endDate != null) ? moment(this.dateRange.endDate).format('YYYY-MM-DD') : "",
                "status": this.status,
                startDeliveryDate: this.deliveryDateRange.startDate ? moment(this.deliveryDateRange.startDate).format('YYYY-MM-DD') : '',
                endDeliveryDate: this.deliveryDateRange.endDate ? moment(this.deliveryDateRange.endDate).format('YYYY-MM-DD') : '',
            }
            axios.get(this.$sellerApiUrl + '/orders', {
                params: param
            }).then((response) => {
                let data = response.data;
                if (data.status === 1) {

                    this.orders = response.data.data.orders;
                    this.orderTotalRows = this.orders.length;
                    this.isLoading = false
                }
            }).catch(error => {
                vm.isLoading = false;
                if (error.request && error.request.statusText) {
                    this.showError(error.request.statusText);
                } else if (error.message) {
                    this.showError(error.message);
                } else {
                    this.showError("Something went wrong!");
                }
            });
        },

        getStatusIconBgClass(status) {
            if (!status) return 'bg-light-figma';
            const s = status.status;
            if (s == this.$pending || s == 'Pending') return 'bg-stat-orange-light';
            if (s == this.$received) return 'bg-stat-blue-light';
            if (s == this.$processed || s == 'Ready for Pickup') return 'bg-stat-green-light';
            if (s == this.$shipped) return 'bg-stat-purple-light';
            if (s == this.$outForDelivery) return 'bg-stat-blue-light';
            if (s == this.$delivered || s == 'Picked Up') return 'bg-stat-green-light';
            if (s == this.$cancelled || s == this.$returned) return 'bg-stat-red-light';
            return 'bg-light-figma';
        },

        getStatusBadgeClass(statusId) {
            const id = Number(statusId);
            const classMap = {
                1: 'status-pending',         // Payment Pending
                2: 'status-received',        // Received
                3: 'status-processed',       // Processed
                4: 'status-shipped',         // Shipped
                5: 'status-outfordelivery',  // Out For Delivery
                6: 'status-delivered',       // Delivered
                7: 'status-cancelled',       // Cancelled
                8: 'status-returned',        // Returned
                9: 'status-pending',         // Pending (Self Pickup)
                10: 'status-processed',      // Ready for Pickup (Self Pickup)
                11: 'status-delivered',      // Picked Up (Self Pickup)
            };
            return classMap[id] || 'status-default';
        },
        formatDateBold(date) {
            return moment(date).format('DD MMM YYYY');
        },
        getPeriodLabel(date) {
            if (!date) return '';
            const hour = moment(date).hour();
            if (hour >= 5 && hour < 12) {
                return this.__('Morning') || 'Morning';
            } else if (hour >= 12 && hour < 17) {
                return this.__('Afternoon') || 'Afternoon';
            } else if (hour >= 17 && hour < 21) {
                return this.__('Evening') || 'Evening';
            } else {
                return this.__('Night') || 'Night';
            }
        },
        formatTimeLight(date) {
            return moment(date).format('hh:mm A');
        },
        getStatusLabelById(val) {
            if (val == null || val === '') return '';
            const id = typeof val === 'number' ? val : parseInt(val, 10);
            if (!isNaN(id)) {
                const map = { 1: 'payment_pending', 2: 'received', 3: 'processed', 4: 'shipped', 5: 'outForDelivery', 6: 'delivered', 7: 'cancelled', 8: 'returned', 9: 'pending', 10: 'ready_for_pickup', 11: 'picked_up' };
                const key = map[id];
                return key ? this.__(key) : String(val);
            }
            return String(val);
        },

    },
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

.btn_product_count {
    margin-bottom: 10px;
}

.chart-container {
    min-height: 300px;
    height: 60vh;
}

@media (max-width: 768px) {
    .chart-container {
        height: 40vh;
    }
}

/* KPI tiles use the shared .figma-kpi-card-v2 / .dash-stat-card look; only the padding and the
   router-link text colour are set here. */
.dash-stat-card {
    padding: 16px;
    color: inherit;
}

/* Phones: two tiles per row are ~120px wide, so icon + text side by side cut the captions
   ("Total Or...") and pushed amounts to the edge. Stack the icon above the text, let the caption
   and the amount wrap, and keep the tiles top-aligned so a longer label doesn't change the look. */
@media (max-width: 575.98px) {
    .dash-stat-card {
        align-items: flex-start;
        padding: 12px;
    }

    .dash-stat-card > div {
        flex-direction: column;
        align-items: flex-start !important;
        gap: 8px !important;
        width: 100%;
    }

    .dash-stat-card .dash-stat-sub {
        white-space: normal !important;
        overflow: visible !important;
        text-overflow: clip !important;
    }

    .dash-stat-card .figma-stat-value {
        white-space: normal !important;
        overflow-wrap: anywhere;
    }
}

.min-w-0 {
    min-width: 0;
}

.dash-leader {
    border-bottom: 1.5px dashed var(--ui-border-strong);
}

/* Latest orders: the table keeps its columns and scrolls inside the card on narrow screens */
.dash-orders-scroll {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
}

.dash-orders-scroll .figma-order-table {
    min-width: 880px;
}

.dash-orders-scroll .figma-order-table td,
.dash-orders-scroll .figma-order-table th {
    white-space: nowrap;
}

/* Category legend: long category lists scroll inside the card instead of stretching it */
.category-legend {
    max-height: 300px;
    overflow-y: auto;
}

/* "View Orders" (secondary action): global hover fills it with primary, keep the label readable */
.view-order-btn:hover,
.view-order-btn:hover span,
.view-order-btn:hover i {
    color: var(--theme-neutral-50) !important; /* beats .btn-light text colour on the filled hover */
}
</style>
