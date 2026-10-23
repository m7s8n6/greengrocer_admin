<template>
    <div>
        <!-- Welcome header (same as the admin dashboard) -->
        <div class="page-heading mb-4">
            <h2 class="h4 font-weight-bold text-dark mb-1">{{ __('Welcome') }}<template v-if="welcomeName">, {{ welcomeName }}</template></h2>
            <p class="text-muted small mb-0">{{ greetingMessage }} &bull; {{ welcomeDate }}</p>
        </div>
        <div class="page-content">
            <section>
                <!-- KPI tiles -->
                <div class="row g-3 mb-4">
                    <div class="col-6 col-md-4 db-kpi-col"
                        :class="{ 'db-kpi-col--wide': index === summaryStats.length - 1 && summaryStats.length % 2 === 1 }"
                        v-for="(stat, index) in summaryStats" :key="index">
                        <component :is="stat.url ? 'router-link' : 'div'" :to="stat.url"
                            class="figma-kpi-card-v2 db-kpi-tile text-decoration-none d-block w-100 h-100">
                            <div class="d-flex align-items-center gap-3">
                                <div class="figma-stat-icon-box flex-shrink-0" :class="stat.bgClass">
                                    <template v-if="stat.isSvg">
                                        <base-icon :name="stat.icon" width="22" height="22" class="text-white" />
                                    </template>
                                    <template v-else>
                                        <i :class="`fa fa-${stat.icon} text-white small`"></i>
                                    </template>
                                </div>
                                <div class="d-flex flex-column overflow-hidden w-100 text-start">
                                    <span class="figma-stat-label mb-0 text-truncate w-100">{{ stat.label }}</span>
                                    <h4 class="figma-stat-value mb-0 text-truncate w-100">{{ stat.value }}</h4>
                                </div>
                            </div>
                        </component>
                    </div>
                </div>

                <!-- Order status + wallet summary -->
                <div class="row g-4 mb-4">
                    <div class="col-12 col-lg-6">
                        <div class="card figma-card h-100 mb-0">
                            <div class="card-header d-flex align-items-center justify-content-between">
                                <h4 class="h6 mb-0">{{ __('order_status') }}</h4>
                            </div>
                            <div class="card-body">
                                <div class="db-status-row">
                                    <span class="db-status-dot db-status-dot--warn"></span>
                                    <span class="db-status-label">{{ __('pending') }}</span>
                                    <span class="db-status-value">{{ record.pending_orders || 0 }}</span>
                                </div>
                                <div class="db-status-row">
                                    <span class="db-status-dot db-status-dot--success"></span>
                                    <span class="db-status-label">{{ __('delivered') }}</span>
                                    <span class="db-status-value">{{ record.delivered_orders || 0 }}</span>
                                </div>
                                <div class="db-status-row">
                                    <span class="db-status-dot db-status-dot--error"></span>
                                    <span class="db-status-label">{{ __('return_requests') }}</span>
                                    <span class="db-status-value">{{ record.return_requests || 0 }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 col-lg-6">
                        <div class="card figma-card h-100 mb-0">
                            <div class="card-header d-flex align-items-center justify-content-between">
                                <h4 class="h6 mb-0">{{ __('balance') }}</h4>
                            </div>
                            <div class="card-body">
                                <div class="row g-3">
                                    <div class="col-6 db-wallet-col">
                                        <div class="db-wallet-tile">
                                            <span class="figma-stat-label">{{ __('balance') }}</span>
                                            <span class="db-wallet-value">{{ $currency }} {{ record.balance }}</span>
                                        </div>
                                    </div>
                                    <div class="col-6 db-wallet-col">
                                        <div class="db-wallet-tile">
                                            <span class="figma-stat-label">{{ __('cash_in_hand') }}</span>
                                            <span class="db-wallet-value">{{ $currency }} {{ record.cash_in_hand || 0 }}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-12">
                        <div class="card figma-card">
                            <div
                                class="card-header d-flex align-items-center justify-content-between flex-wrap gap-2">
                                <h4 class="h6 mb-0">{{ __('latest_orders') }}</h4>
                                <div class="d-flex align-items-center gap-2">

                                    <router-link to="/delivery_boy/orders"
                                        class="btn btn-outline-secondary btn-sm view-order-btn">
                                        <span>{{ __('view_orders') || 'View Orders' }}</span>
                                        <i class="fa fa-arrow-right ms-1"></i>
                                    </router-link>
                                </div>
                            </div>
                            <div class="card-body p-0">
                                <div class="table-responsive dash-orders-scroll">
                                    <b-table class="table figma-table figma-order-table mb-0" :items="orders"
                                        :fields="orderFields" :current-page="orderCurrentPage" :per-page="orderPerPage"
                                        :filter="filter" :filter-included-fields="filterOn" :sort-by.sync="sortBy"
                                        :sort-desc.sync="sortDesc" :sort-direction="sortDirection" :bordered="false"
                                        :busy="isLoading" show-empty
                                        :tbody-tr-class="() => 'figma-tr align-middle'" small>
<template #empty="scope">
<div class="text-center text-muted py-4"><i class="fa fa-inbox fa-2x d-block mb-2"></i>{{ scope.emptyText }}</div>
</template>
<template #emptyfiltered="scope">
<div class="text-center text-muted py-4"><i class="fa fa-search fa-2x d-block mb-2"></i>{{ scope.emptyFilteredText }}</div>
</template>

                                        <template #table-busy>
                                            <div class="text-center text-muted my-2">
                                                <b-spinner class="align-middle"></b-spinner>
                                                <strong>{{ __('loading') }}</strong>
                                            </div>
                                        </template>

                                        <template #head(total)="row">
                                            {{ __('total') + ' (' + $currency + ')' }}
                                        </template>
                                        <template #head(delivery_charge)="row">
                                            {{ __('dcharges') + ' (' + $currency + ')' }}
                                        </template>
                                        <template #head(tax)="row">
                                            {{ __('tax') + ' (' + $currency + ') (%)' }}
                                        </template>
                                        <template #head(discount)="row">
                                            {{ __('disc') + ' (' + $currency + ') (%)' }}
                                        </template>
                                        <template #head(promo_discount)="row">
                                            {{ __('promo_disc') + ' (' + $currency + ')' }}
                                        </template>
                                        <template #head(wallet_balance)="row">
                                            {{ __('wallet_used') + ' (' + $currency + ')' }}
                                        </template>
                                        <template #head(remaining_final)="row">
                                            {{ __('ftotal') + ' (' + $currency + ')' }}
                                        </template>

                                        <template #cell(id)="row">
                                            <span class="text-primary font-weight-bold small">#{{ row.item.id }}</span>
                                        </template>

                                        <template #cell(mobile)="row">
                                            <span class="text-muted small">{{ row.item.mobile | mobileMask }}</span>
                                        </template>

                                        <template #cell(user_name)="row">
                                            <span class="font-weight-bold small">{{ row.item.user_name
                                                }}</span>
                                        </template>

                                        <template #cell(payment_method)="row">
                                            <span class="figma-payment-method-badge">{{ row.item.payment_method
                                                }}</span>
                                        </template>

                                        <template #cell(total)="row">
                                            <span class="font-weight-bold small">{{ row.item.total }}</span>
                                        </template>

                                        <template #cell(actions)="row">
                                            <router-link
                                                :to="{ name: 'DeliveryBoyOrder', params: { id: row.item.id, record: row.item } }"
                                                v-b-tooltip.hover title="View"
                                                class="figma-action-btn d-inline-flex align-items-center justify-content-center">
                                                <base-icon name="Eye" width="20"
                                                    height="20" />
                                            </router-link>
                                        </template>
                                    </b-table>
                                </div>
                                <div class="figma-table-footer">
                                    <div class="d-flex align-items-center gap-3 flex-wrap">
                                        <div class="d-flex align-items-center gap-2">
                                            <label class="showing-results-text mb-0">{{ __('per_page') }}</label>
                                            <b-form-select v-model="orderPerPage" :options="pageOptions" size="sm" class="w-auto" @change="orderCurrentPage = 1"></b-form-select>
                                        </div>
                                        <table-count :current-page="orderCurrentPage" :per-page="orderPerPage" :total-rows="orderTotalRows"></table-count>
                                    </div>
                                    <b-pagination v-model="orderCurrentPage" :total-rows="orderTotalRows" :per-page="orderPerPage" align="right"
                                        class="figma-pagination mb-0"></b-pagination>
                                </div>
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
import axios from "axios";
import moment from "moment";
export default {
    name: "range_dates",
    mixins: [DateRangePickerMixin],
    components: { DateRangePicker },
    data: function () {
        let startDate = new Date();
        let endDate = new Date();
        startDate.setDate(startDate.getDate() - 30);
        return {
            dateRange: { startDate, endDate },
            deliveryDateRange: { startDate: null, endDate: null },
            maxDate: new Date(),
            isLoading: false,
            record: {
                balance: 0,
                order_count: 0,
                pending_orders: 0,
                delivered_orders: 0,
                return_requests: 0,
                cash_in_hand: 0
            },
            orderFields: [
                { key: 'id', label: __('order_id'), sortable: true, sortDirection: 'desc' },
                { key: 'user_name', label: __('user'), sortable: true },
                { key: 'mobile', label: __('mobile'), sortable: true },
                { key: 'total', label: __('total'), sortable: true },
                { key: 'delivery_charge', label: __('dcharges'), sortable: true },
                { key: 'remaining_final', label: __('ftotal'), sortable: true },
                { key: 'payment_method', label: __('p_method'), sortable: true },
                { key: 'delivery_time', label: __('d_time'), sortable: true },
                { key: "actions", label: __('actions') }
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
        sortOptions() {
            // Create an options list from our fields
            return this.fields
                .filter(f => f.sortable)
                .map(f => {
                    return { text: f.label, value: f.key }
                })
        },
        orderPageStart() {
            if (this.orderTotalRows === 0) return 0;
            return (this.orderCurrentPage - 1) * this.orderPerPage + 1;
        },
        orderTotalPages() {
            return Math.ceil(this.orderTotalRows / this.orderPerPage);
        },
        summaryStats() {
            return [
                { label: this.__('orders'), value: this.record.order_count, url: '/delivery_boy/orders', icon: 'Total order', isSvg: true, bgClass: 'bg-stat-blue' },
                { label: this.__('return_requests') || 'Returns', value: this.record.return_requests || 0, url: '/delivery_boy/return_requests', icon: 'total return', isSvg: true, bgClass: 'bg-stat-purple' },
                { label: this.__('balance'), value: this.$currency + " " + this.record.balance, url: null, icon: 'total rev', isSvg: true, bgClass: 'bg-stat-green' },
            ];
        }
    },
    mounted() {
        // Set the initial number of items
        this.orderTotalRows = this.orders.length
    },
    created() {
        this.getRecord();
        this.getOrderStatus();
        this.getLatestOrders();
    },
    methods: {
        getRecord: function () {
            let vm = this;
            this.isLoading = true;
            axios.get(this.$deliveryBoyApiUrl + '/dashboard').then(res => {
                vm.isLoading = false;
                let data = res.data;
                if (data.status === 1) {
                    this.record = data.data;
                }
            }).catch(error => {
                vm.isLoading = false;
                if (error.request.statusText) {
                    this.showError(error.request.statusText);
                } else if (error.message) {
                    this.showError(error.message);
                } else {
                    this.showError(__('something_went_wrong'));
                }
            });
        },
        /**
         * Status name for dropdown. API returns status_name as object by lang code { en: "...", hi: "..." }.
         * Picks current app locale; fallback to status.status.
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
        getOrderStatus: function () {
            let vm = this;
            axios.get(this.$apiUrl + '/order_statuses').then((response) => {
                this.isLoading = false
                this.statuses = response.data.data;
            }).catch(error => {
                vm.isLoading = false;
                if (error.request.statusText) {
                    this.showError(error.request.statusText);
                } else if (error.message) {
                    this.showError(error.message);
                } else {
                    this.showError(__('something_went_wrong'));
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
            axios.get(this.$deliveryBoyApiUrl + '/orders', {
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
                if (error.request.statusText) {
                    this.showError(error.request.statusText);
                } else if (error.message) {
                    this.showError(error.message);
                } else {
                    this.showError(__('something_went_wrong'));
                }
            });
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

.view-order-btn {
    display: inline-flex;
    align-items: center;
    font-size: 13px;
    font-weight: 600;
}

.db-kpi-tile {
    color: inherit;
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

.db-status-row {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 12px 0;
    border-bottom: 1px solid var(--ui-border);
    font-size: 13px;
}

.db-status-row:last-child {
    border-bottom: 0;
}

.db-status-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    flex-shrink: 0;
}

.db-status-dot--warn { background: var(--theme-warn-500); }
.db-status-dot--success { background: var(--theme-success-500); }
.db-status-dot--error { background: var(--theme-error-500); }

.db-status-label {
    flex: 1 1 auto;
    color: var(--ui-text);
}

.db-status-value {
    font-weight: 700;
    color: var(--ui-heading);
}

.db-wallet-tile {
    display: flex;
    flex-direction: column;
    gap: 4px;
    height: 100%;
    padding: 14px 16px;
    border: 1px solid var(--ui-border);
    border-radius: var(--ui-radius);
    background: var(--ui-surface-muted);
}

.db-wallet-value {
    font-size: 18px;
    font-weight: 700;
    color: var(--ui-heading);
    overflow-wrap: anywhere;
}

/* Phones only: Balance and Cash In Hand stack full width so the amount stays on one line.
   Tablet and desktop keep the original two-column tiles. */
@media (max-width: 575.98px) {
    .db-wallet-col {
        flex: 0 0 100%;
        max-width: 100%;
    }

    .db-wallet-tile {
        height: auto;
    }

    .db-wallet-value {
        font-size: 20px;
        white-space: nowrap;
        overflow-wrap: normal;
    }
}

</style>
