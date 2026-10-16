<template>
    <div>
        <div class="page-heading">
            <h3>{{ __('dashboard') }}</h3>
        </div>
        <div class="page-content">
            <section class="row">

                <!-- Seller Dashboard Content -->
                <div class="col-12 px-0">

                <!-- Row 1: Dashboard Counter -->
                <div class="dash-stat-grid mb-4">
                    <router-link to="/seller/orders" class="dash-stat-card">
                        <div class="dash-stat-icon bg-stat-blue-light">
                            <i class="fa fa-shopping-cart text-stat-blue"></i>
                        </div>
                        <span class="dash-stat-label">{{ __('orders') }}</span>
                        <h4 class="dash-stat-value">{{ record.order_count }}</h4>
                        <span class="dash-stat-sub">{{ __('total_orders') }}</span>
                    </router-link>

                    <router-link to="/seller/manage_products" class="dash-stat-card">
                        <div class="dash-stat-icon bg-stat-orange-light">
                            <i class="fa fa-cubes text-stat-orange"></i>
                        </div>
                        <span class="dash-stat-label">{{ __('products') }}</span>
                        <h4 class="dash-stat-value">{{ record.product_count }}</h4>
                        <span class="dash-stat-sub">{{ __('total_products') }}</span>
                    </router-link>

                    <router-link to="/seller/categories" class="dash-stat-card">
                        <div class="dash-stat-icon bg-stat-purple-light">
                            <i class="fa fa-bullseye text-stat-purple"></i>
                        </div>
                        <span class="dash-stat-label">{{ __('category') }}</span>
                        <h4 class="dash-stat-value">{{ record.category_count }}</h4>
                        <span class="dash-stat-sub">{{ __('total_categories') }}</span>
                    </router-link>

                    <router-link to="/seller/dashboard" class="dash-stat-card">
                        <div class="dash-stat-icon bg-stat-green-light">
                            <i class="fa fa-money text-stat-green"></i>
                        </div>
                        <span class="dash-stat-label">{{ __('balance') }}</span>
                        <h4 class="dash-stat-value">{{ $currency }} {{ record.balance }}</h4>
                        <span class="dash-stat-sub">{{ __('total_balance') }}</span>
                    </router-link>

                    <router-link :to="{ name: 'SellerProductInfo', params: { type: 'sold_out' } }" class="dash-stat-card">
                        <div class="dash-stat-icon bg-stat-red-light">
                            <i class="fa fa-ban text-stat-red"></i>
                        </div>
                        <span class="dash-stat-label">{{ __('products_sold_out') }}</span>
                        <h4 class="dash-stat-value">{{ record.sold_out_count }}</h4>
                        <span class="dash-stat-sub">{{ __('total_sold_out') }}</span>
                    </router-link>

                    <router-link :to="{ name: 'SellerProductInfo', params: { type: 'low_stock' } }" class="dash-stat-card">
                        <div class="dash-stat-icon bg-stat-orange-light">
                            <i class="fa fa-warning text-stat-orange"></i>
                        </div>
                        <span class="dash-stat-label">{{ __('products_in_low_stock') }}</span>
                        <h4 class="dash-stat-value">{{ record.low_stock_count }}</h4>
                        <span class="dash-stat-sub">{{ __('total_low_stock') }}</span>
                    </router-link>
                </div>

                <!-- Row 2: Weekly Sales (Full Width) -->
                <div class="row g-4 mb-4">
                    <div class="col-12">
                        <div class="card border figma-card overflow-hidden" style="border-radius: 24px !important;">
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
                            <div class="card-body p-4 pt-1">
                                <apexchart :options="options" :series="series" width="100%" height="420"
                                    ref="apexBarChart">
                                </apexchart>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Row 3: Categorywise Product Count + Order Out Lines -->
                <div class="row g-4 mb-4">
                    <!-- Categorywise Product Count -->
                    <div class="col-12 col-lg-7 product_category_count">
                        <div class="card border rounded-4 h-100 figma-card">
                            <div class="card-header bg-white border-0 py-3 px-4 d-flex align-items-center justify-content-between flex-wrap gap-2">
                                <h4 class="h6 font-weight-bold text-dark mb-0">
                                    {{ __('product_category_count') }}
                                    <span class="text-muted small font-weight-normal ms-1" v-if="options2.labels.length">({{ options2.labels.length }} {{ __('categories') }})</span>
                                </h4>
                            </div>
                            <div class="card-body p-4 pt-0">
                                <div v-if="series2.length > 0" class="row align-items-center" style="min-height: 380px;">
                                    <div class="col-12 col-md-5">
                                        <apexcharts width="100%" height="320" type="donut" :options="options2"
                                            :series="series2"></apexcharts>
                                    </div>
                                    <div class="col-12 col-md-7">
                                        <div class="d-flex flex-column gap-3 pe-md-4 mt-4 mt-md-0" style="max-height: 320px; overflow-y: auto;">
                                            <div v-for="(item, idx) in categoryChartDataFormatted" :key="'cat-' + idx" class="d-flex align-items-center">
                                                <div class="rounded-circle me-3 flex-shrink-0" :style="{ width: '12px', height: '12px', backgroundColor: item.color }"></div>
                                                <div class="text-dark small flex-shrink-0" style="font-weight: 500;">{{ item.name }}</div>
                                                <div class="flex-grow-1 mx-3" style="border-bottom: 1.5px dashed #E2E8F0;"></div>
                                                <div class="text-dark small font-weight-bold flex-shrink-0">{{ item.value }}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div v-else class="text-center py-5 text-muted small">{{ __('no_product_found') }}</div>
                            </div>
                        </div>
                    </div>

                    <!-- Order Out Lines -->
                    <div class="col-12 col-lg-5">
                        <div class="card border rounded-4 h-100 figma-card">
                            <div class="card-header bg-white border-bottom py-3 px-4 d-flex align-items-center justify-content-between">
                                <h4 class="h6 font-weight-bold text-dark mb-0">{{ __('order_out_lines') }}</h4>
                            </div>
                            <div class="card-body p-4">
                                <div class="d-flex flex-column gap-3" v-if="orderStatusItems.length">
                                    <div class="d-flex align-items-center gap-3" v-for="(item, idx) in orderStatusItems" :key="'os-' + idx">
                                        <div class="rounded-3 d-flex align-items-center justify-content-center"
                                            :style="{ background: item.bgColor, width: '40px', height: '40px', borderRadius: '10px', flexShrink: 0 }">
                                            <base-icon v-if="item.icon" :name="item.icon" width="24" height="24" />
                                        </div>
                                        <div class="flex-grow-1">
                                            <div class="d-flex justify-content-between align-items-center mb-1">
                                                <span class="figma-order-status-label">{{ item.label }}</span>
                                                <span class="small font-weight-bold text-dark mb-0">{{ item.count }}</span>
                                            </div>
                                            <div class="rounded-pill overflow-hidden" :style="{ height: '6px', backgroundColor: item.bgColor }">
                                                <div class="h-100 rounded-pill"
                                                    :style="{ width: item.percent + '%', backgroundColor: item.color }"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div v-else class="text-center py-5 text-muted small">{{ __('No data found') }}</div>
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
                            <router-link to="/seller/orders" class="btn btn-dark btn-sm rounded-3 px-3 view-order-btn">
                                <span class="small font-weight-bold text-white">{{ __('view_orders') || 'View Orders' }}</span>
                                <i class="fa fa-arrow-right ms-1 text-white extra-small"></i>
                            </router-link>
                        </div>
                    </div>
                    <div class="card-body p-0">
                        <div class="table-responsive">
                            <b-table :items="orders" :fields="orderFields" :current-page="orderCurrentPage"
                                :per-page="orderPerPage" :filter="filter" :filter-included-fields="filterOn"
                                :sort-by.sync="sortBy" :sort-desc.sync="sortDesc"
                                :sort-direction="sortDirection" :bordered="false" :busy="isLoading" stacked="md"
                                show-empty :tbody-tr-class="() => 'figma-tr align-middle'" small
                                class="figma-order-table text-dark mb-0">

                                <template #table-busy>
                                    <div class="text-center py-4">
                                        <b-spinner class="align-middle" variant="dark"></b-spinner>
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
                        <div class="d-flex justify-content-between align-items-center px-4 pb-4 border-top pt-3 bg-light-soft rounded-bottom-4" v-if="orderTotalRows > 0">
                            <div class="showing-results-text small">
                                {{ __('Showing Result') }} : <span class="showing-bold">{{ orderPageEnd }}</span> {{ __('of') }} <span class="showing-bold">{{ orderTotalRows }}</span>
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
                { key: 'mobile', label: __('mobile'), sortable: true, class: 'text-center' },
                { key: 'total', label: __('total'), sortable: true, class: 'text-center' },
                { key: 'delivery_charge', label: __('dcharges'), sortable: true, class: 'text-center' },
                { key: 'tax', label: __('tax'), sortable: true, class: 'text-center' },
                { key: 'discount', label: __('disc'), sortable: true, class: 'text-center' },
                { key: 'promo_discount', label: __('promo_disc'), sortable: true, class: 'text-center' },
                { key: 'wallet_balance', label: __('wallet_used'), sortable: true, class: 'text-center' },
                { key: 'remaining_final', label: __('ftotal'), sortable: true, class: 'text-center' },
                { key: 'payment_method', label: __('p_method'), sortable: true, class: 'text-center' },
                { key: 'delivery_time', label: __('d_time'), sortable: true, class: 'text-center' },
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
                    fontFamily: 'Inter, sans-serif'
                },
                plotOptions: {
                    bar: {
                        columnWidth: '40%',
                        borderRadius: 4,
                    }
                },
                colors: ['#68E4A1'],
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
                        style: { colors: '#64748B', fontSize: '12px' }
                    }
                },
                yaxis: {
                    labels: {
                        style: { colors: '#64748B', fontSize: '12px' },
                        formatter: (val) => (val || 0).toLocaleString()
                    }
                },
                grid: {
                    borderColor: '#F1F5F9',
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
                        return '<div style="background:#111827;color:#fff;padding:12px;border-radius:12px;font-size:13px;line-height:1.6;border:none;box-shadow:0 10px 15px -3px rgba(0,0,0,0.1)">' +
                            '<div style="margin-bottom:4px;font-weight:700">' + cat + '</div>' +
                            '<div style="display:flex;align-items:center;gap:8px"><span style="width:8px;height:8px;border-radius:50%;background:#68E4A1"></span> Total Sale : <span style="font-weight:700">' + (sale || 0).toLocaleString() + '</span></div>' +
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
            categoryChartColors: ['#F5A623', '#9B6FD9', '#7BC67E', '#5B93D4', '#4FC5C9', '#F472B6', '#A78BFA', '#FBBF24', '#34D399', '#60A5FA'],
            options2: {
                chart: { type: 'donut', fontFamily: 'Inter, sans-serif' },
                labels: [],
                colors: [],
                legend: { show: false },
                dataLabels: { enabled: false },
                plotOptions: { pie: { donut: { size: '75%' } } },
                stroke: { width: 4, colors: ['#fff'] },
                tooltip: {
                    y: { formatter: (val) => (val || 0).toLocaleString() }
                },
            },
            series2: []
        };
    },
    computed: {
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
                color: this.categoryChartColors[index % this.categoryChartColors.length] || '#000'
            }));
        },
        orderStatusItems() {
            const statusOrderCount = (this.record && this.record.status_order_count) ? this.record.status_order_count : [];
            if (!statusOrderCount.length) return [];
            const allowedStatuses = ['Payment Pending', 'Pending', 'Received', 'Processed', 'Shipped', 'Out For Delivery', 'Delivered'];
            const filtered = statusOrderCount.filter(s => allowedStatuses.includes(s.status));
            const maxCount = Math.max(...filtered.map(s => s.order_count || 0), 1);
            const statusMap = {
                'Payment Pending': { color: '#F59E0B', bgColor: '#FEF3C7', label: this.__('payment_pending') || 'Payment Pending', icon: 'Payment Pending' },
                'Pending':         { color: '#F59E0B', bgColor: '#FEF3C7', label: this.__('pending') || 'Pending', icon: 'Pending' },
                'Received':        { color: '#3B82F6', bgColor: '#DBEAFE', label: this.__('received') || 'Received', icon: 'Received' },
                'Processed':       { color: '#10B981', bgColor: '#D1FAE5', label: this.__('processed') || 'Processed', icon: 'Processed' },
                'Shipped':         { color: '#06B6D4', bgColor: '#CFFAFE', label: this.__('shipped') || 'Shipped', icon: 'Shipped' },
                'Out For Delivery':{ color: '#6366F1', bgColor: '#E0E7FF', label: this.__('out_for_delivery') || 'Out for Delivery', icon: 'Out for Delivery' },
                'Delivered':       { color: '#10B981', bgColor: '#D1FAE5', label: this.__('delivered') || 'Delivered', icon: 'Delivered' },
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

        const primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--figma-primary').trim() || '#68E4A1';
        this.options.colors = [primaryColor];

        this.options.tooltip.custom = ({ series, seriesIndex, dataPointIndex, w }) => {
            const cat = w.globals.categoryLabels[dataPointIndex] || w.config.xaxis.categories[dataPointIndex];
            const sale = series[0] ? series[0][dataPointIndex] : 0;
            return '<div style="background:#111827;color:#fff;padding:12px;border-radius:12px;font-size:13px;line-height:1.6;border:none;box-shadow:0 10px 15px -3px rgba(0,0,0,0.1)">' +
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

/* Dashboard stat cards: CSS Grid gives every card the same width/height natively -
   no flex/router-link height-propagation needed, and long titles just wrap within
   a fixed-height label area instead of stretching one card taller than the rest. */
.dash-stat-grid {
    display: grid;
    grid-template-columns: repeat(6, minmax(0, 1fr));
    gap: 22px;
}

.dash-stat-card {
    display: flex;
    flex-direction: column;
    background: #fff;
    border: 1px solid #e9e9e9;
    border-radius: 15px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    padding: 22px;
    text-decoration: none;
    transition: box-shadow 0.15s ease;
}

.dash-stat-card:hover {
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.08);
}

.dash-stat-icon {
    width: 52px;
    height: 52px;
    border-radius: 13px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    flex-shrink: 0;
    margin-bottom: 14px;
}

.dash-stat-label {
    font-size: 14px;
    font-weight: 500;
    color: #333333;
    line-height: 1.3;
    margin-bottom: 6px;
    /* Reserve two lines of height so a short title ("Balance") and a long one
       ("Product(S) In Low Stock!") both push the value down by the same amount -
       cards stay the same height either way, per Grid's own row-height matching. */
    min-height: 2.6em;
    display: flex;
    align-items: flex-end;
}

.dash-stat-value {
    font-family: 'Inter', sans-serif;
    font-weight: 700;
    font-size: 26px;
    line-height: 1.2;
    color: #0D0E0D;
    margin: 0 0 4px 0;
    white-space: nowrap;
}

.dash-stat-sub {
    font-size: 12.5px;
    color: #8b93a1;
}

/* .dash-stat-card isn't a bootstrap .card, so the global body.theme-dark override that swaps
   .card to a dark background never applies to it - it stayed white while that same override's
   broad span/div/h4 selector (custom-egrocer.scss) forced its text near-white, making label/
   value/sub invisible. Give it the same dark treatment explicitly. */
body.theme-dark .dash-stat-card {
    background: #1E293B !important;
    border-color: #334155 !important;
}

body.theme-dark .dash-stat-label {
    color: #CBD5E1 !important;
}

body.theme-dark .dash-stat-value {
    color: #F8FAFC !important;
}

body.theme-dark .dash-stat-sub {
    color: #94A3B8 !important;
}

@media (max-width: 1199px) and (min-width: 768px) {
    .dash-stat-grid {
        grid-template-columns: repeat(3, minmax(0, 1fr));
    }
}

@media (max-width: 767px) and (min-width: 480px) {
    .dash-stat-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 16px;
    }
}

@media (max-width: 479px) {
    .dash-stat-grid {
        grid-template-columns: minmax(0, 1fr);
        gap: 14px;
    }
}
</style>
