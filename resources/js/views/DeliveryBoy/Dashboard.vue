<template>
    <div>
        <div class="page-heading">
            <h3>{{ __('dashboard') }}</h3>
        </div>
        <div class="page-content">
            <section class="row">
                <!-- Single Row for all Stats -->
                <div class="row g-3 px-2 mb-4 row-cols-1 row-cols-sm-3">
                    <div class="col" v-for="(stat, index) in summaryStats" :key="index">
                        <div class="card border rounded-4 figma-card-white p-3 mb-0">
                            <component :is="stat.url ? 'router-link' : 'div'" :to="stat.url"
                                class="text-decoration-none d-block w-100">
                                <div class="d-flex align-items-center gap-3">
                                    <div class="figma-stat-icon-box" :class="stat.bgClass">
                                        <template v-if="stat.isSvg">
                                            <base-icon :name="stat.icon" width="22" height="22" class="text-white" />
                                        </template>
                                        <template v-else>
                                            <i :class="`fa fa-${stat.icon} text-white small`"></i>
                                        </template>
                                    </div>
                                    <div class="d-flex flex-column overflow-hidden w-100 text-start">
                                        <span class="figma-stat-label mb-1 text-truncate text-start w-100">{{ stat.label }}</span>
                                        <h4 class="figma-stat-value h1 mb-0 text-dark font-weight-bold text-start w-100">{{ stat.value }}</h4>
                                    </div>
                                </div>
                            </component>
                        </div>
                    </div>
                </div>
                <div class="row mt-4">
                    <div class="col-12">
                        <div class="card figma-card">
                            <div
                                class="card-header bg-white border-0 py-3 px-4 d-flex align-items-center justify-content-between flex-wrap gap-2">
                                <h4 class="h6 font-weight-bold text-dark mb-0">{{ __('latest_orders') }}</h4>
                                <div class="d-flex align-items-center gap-2">

                                    <router-link to="/delivery_boy/orders"
                                        class="btn btn-dark btn-sm rounded-3 px-3 view-order-btn">
                                        <span class="small font-weight-bold text-white">{{ __('view_orders') || 'View Orders' }}</span>
                                        <i class="fa fa-arrow-right ms-1 text-white extra-small"></i>
                                    </router-link>
                                </div>
                            </div>
                            <div class="card-body p-0">
                                <div class="table-responsive">
                                    <b-table class="table figma-table figma-order-table text-dark" :items="orders"
                                        :fields="orderFields" :current-page="orderCurrentPage" :per-page="orderPerPage"
                                        :filter="filter" :filter-included-fields="filterOn" :sort-by.sync="sortBy"
                                        :sort-desc.sync="sortDesc" :sort-direction="sortDirection" :bordered="false"
                                        :busy="isLoading" stacked="md" show-empty
                                        :tbody-tr-class="() => 'figma-tr align-middle'" small>
                                        <template #table-busy>
                                            <div class="text-center text-black my-2">
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
                                            <span class="text-dark font-weight-bold small">{{ row.item.user_name
                                                }}</span>
                                        </template>

                                        <template #cell(payment_method)="row">
                                            <span class="figma-payment-method-badge">{{ row.item.payment_method
                                                }}</span>
                                        </template>

                                        <template #cell(total)="row">
                                            <span class="text-dark font-weight-bold small">{{ row.item.total }}</span>
                                        </template>

                                        <template #cell(actions)="row">
                                            <router-link
                                                :to="{ name: 'DeliveryBoyOrder', params: { id: row.item.id, record: row.item } }"
                                                v-b-tooltip.hover title="View"
                                                class="bg-transparent border-0 p-0">
                                                <base-icon name="Eye" width="32"
                                                    height="32" />
                                            </router-link>
                                        </template>
                                    </b-table>
                                </div>
                                <b-row class="mt-3 px-3 pb-3">
                                    <b-col md="6" class="my-1 d-flex align-items-center">
                                        <span class="text-muted extra-small">
                                            {{ __('Showing Result') }} : <span class="showing-bold">{{ Math.min(orderCurrentPage * orderPerPage, orderTotalRows) }}</span> {{ __('of') }} <span class="showing-bold">{{ orderTotalRows }}</span>
                                        </span>
                                    </b-col>
                                    <b-col md="6" class="my-1 d-flex justify-content-end">
                                        <b-pagination v-model="orderCurrentPage" :total-rows="orderTotalRows"
                                            :per-page="orderPerPage" align="right" class="figma-pagination mb-0"
                                            hide-goto-end-buttons hide-ellipsis prev-text="<"
                                            next-text=">"></b-pagination>
                                    </b-col>
                                </b-row>
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
                { key: 'user_name', label: __('user'), sortable: true, class: 'text-center' },
                { key: 'mobile', label: __('mobile'), sortable: true, class: 'text-center' },
                { key: 'total', label: __('total'), sortable: true, class: 'text-center' },
                { key: 'delivery_charge', label: __('dcharges'), sortable: true, class: 'text-center' },
                { key: 'remaining_final', label: __('ftotal'), sortable: true, class: 'text-center' },
                { key: 'payment_method', label: __('p_method'), sortable: true, class: 'text-center' },
                { key: 'delivery_time', label: __('d_time'), sortable: true, class: 'text-center' },
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
    transition: all 0.2s ease;
}

.view-order-btn:hover {
    transform: translateX(3px);
}
</style>
