<template>
    <div>
        <div class="page-heading">
            <div class="page-title mb-2">
                <div class="d-flex flex-wrap justify-content-between align-items-center gap-2">
                    <h3 class="modern-page-title mb-0">{{ __('order_list') }}</h3>
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb mb-0">
                            <li class="breadcrumb-item"><router-link to="/delivery_boy" class="text-muted">{{ __('dashboard') }}</router-link></li>
                            <li class="breadcrumb-item active text-primary" aria-current="page">{{ __('order_list') }}</li>
                        </ol>
                    </nav>
                </div>
            </div>

            <section class="section">
            <div class="figma-main-section-card">
                <div class="card-body p-0">
                    <!-- Action Bar: Search + Filter + Refresh -->
                    <div class="d-flex justify-content-between align-items-center flex-wrap gap-2 figma-action-bar-row">
                        <div class="flex-grow-1">
                            <div class="figma-search-container">
                                <i class="fa fa-search text-muted"></i>
                                <input v-model="search" type="text" class="figma-search-input"
                                    :placeholder="__('search') || 'Search orders...'"
                                    @input="handleFilterChange()">
                            </div>
                        </div>
                        <div class="d-flex gap-2">
                            <button class="btn btn-figma-filter d-flex align-items-center gap-2" :class="{'active': showFilters}" @click="showFilters = !showFilters">
                                <base-icon name="Funnel" width="16" height="16" useCurrentColor />
                                <span>{{ __('filters') || 'Filters' }}</span>
                                <i class="bi ms-1" :class="showFilters ? 'bi-chevron-up' : 'bi-chevron-down'"></i>
                            </button>

                            <b-dropdown variant="figma-columns" no-caret
                                toggle-class="btn-figma-columns d-flex align-items-center gap-2" v-b-tooltip.hover
                                :title="__('columns')">
                                <template #button-content>
                                    <i class="fa fa-th-list"></i>
                                    <span>{{ __('columns') }}</span>
                                </template>
                                <b-dropdown-form class="p-2"
                                    style="min-width: 200px; max-height: 300px; overflow-y: auto;">
                                    <div v-for="field in orderFields" :key="field.key" class="form-check mb-2">
                                        <input type="checkbox" :id="'col-' + field.key" :checked="!field.hidden"
                                            @change="toggleColumnVisibility(field)" class="form-check-input">
                                        <label class="form-check-label ms-2" :for="'col-' + field.key">{{
                                            field.label }}</label>
                                    </div>
                                </b-dropdown-form>
                            </b-dropdown>
                        </div>
                    </div>

                    <!-- Expandable Filter Section -->
                    <b-collapse v-model="showFilters">
                        <div class="figma-filter-section">
                            <div class="row g-4">
                                <div class="col-md-4">
                                    <div class="figma-filter-group">
                                        <label class="figma-filter-label">{{ __('from_and_to_date') }}</label>
                                        <div class="modern-datepicker-container">
                                            <date-range-picker :autoApply="false" :showDropdowns="true" v-model="dateRange"
                                                :maxDate="maxDate" @update="handleFilterChange" :locale-data="dateRangePickerLocale"
                                                :ranges="dateRangePickerRanges" :append-to-body="true" opens="right" class="w-100">
                                            </date-range-picker>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="figma-filter-group">
                                        <label class="figma-filter-label">{{ __('from_and_to_delivery_date') }}</label>
                                        <div class="modern-datepicker-container">
                                            <date-range-picker :autoApply="false" :showDropdowns="true" v-model="deliveryDateRange"
                                                :maxDate="maxDate" @update="handleFilterChange" :locale-data="dateRangePickerLocale" :ranges="dateRangePickerRanges"
                                                :append-to-body="true" opens="left" class="w-100">
                                            </date-range-picker>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="figma-filter-group">
                                        <label class="figma-filter-label">{{ __('status') }}</label>
                                        <select v-model="status" @change="handleFilterChange()" class="form-select modern-select">
                                            <option value="">{{ __('all_orders') }}</option>
                                            <option v-for="s in statuses" :key="s.id" :value="s.id">{{ getStatusDisplayName(s) }}</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </b-collapse>

                    <!-- Orders Table -->
                    <div class="table-responsive mb-0">
                        <b-table :items="orders" :fields="visibleFields"
                            :current-page="currentPage" :per-page="perPage"
                            :filter-included-fields="filterOn"
                            :sort-by.sync="sortBy" :sort-desc.sync="sortDesc"
                            :sort-direction="sortDirection" :bordered="false"
                            :busy="isLoading" stacked="md" show-empty show-details
                            :tbody-tr-class="() => 'figma-tr align-middle'" small
                            class="figma-order-table mb-0">
                            <template #empty="scope">
                                <div class="text-center text-muted py-4"><i class="fa fa-inbox fa-2x d-block mb-2"></i>{{ scope.emptyText }}</div>
                            </template>
                            <template #emptyfiltered="scope">
                                <div class="text-center text-muted py-4"><i class="fa fa-search fa-2x d-block mb-2"></i>{{ scope.emptyFilteredText }}</div>
                            </template>

                            <template #table-busy>
                                <div class="text-center py-4">
                                    <b-spinner class="align-middle" variant="dark"></b-spinner>
                                </div>
                            </template>

                            <template #cell(id)="row">
                                <div class="d-flex align-items-center gap-2">
                                    <i :class="row.detailsShowing ? 'fa fa-chevron-down' : 'fa fa-chevron-right'"
                                        @click="toggleOrder(row)"
                                        style="cursor:pointer;font-size:0.7rem;color:var(--theme-neutral-400);"></i>
                                    <span class="figma-link-blue">#{{ row.item.id }}</span>
                                </div>
                            </template>

                            <template #cell(user_name)="row">
                                <div class="d-flex flex-column">
                                    <span class="figma-customer-name">{{ row.item.user_name }}</span>
                                    <span class="figma-customer-email">{{ row.item.mobile | mobileMask }}</span>
                                </div>
                            </template>

                            <template #cell(total)="row">
                                <div class="d-flex flex-column">
                                    <span class="figma-amount-bold text-dark">{{ $currency }}{{ row.item.total }}</span>
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
                                        :to="{ name: 'DeliveryBoyOrder', params: { id: row.item.id, record: row.item } }"
                                        class="figma-action-btn">
                                        <i class="bi bi-eye"></i>
                                    </router-link>
                                </div>
                            </template>

                            <template #row-details="row">
                                <div class="bg-light p-4 rounded-bottom-4 border-top">
                                    <div v-if="row.item.itemsLoading" class="text-center py-3">
                                        <b-spinner label="Spinning"></b-spinner>
                                    </div>
                                    <div v-else class="table-responsive">
                                        <table class="table table-sm mb-0">
                                            <thead class="table-light">
                                                <tr>
                                                    <th>{{ __('product') }}</th>
                                                    <th>{{ __('image') }}</th>
                                                    <th>{{ __('variant') }}</th>
                                                    <th>{{ __('qty') }}</th>
                                                    <th>{{ __('subtotal') }}</th>
                                                    <th>{{ __('status') }}</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="item in row.item.order_items" :key="item.id">
                                                    <td>{{ item.product_name }}</td>
                                                    <td><img :src="item.image" alt="" height="40" class="rounded" /></td>
                                                    <td>{{ item.variant_name }}</td>
                                                    <td>{{ item.quantity }}</td>
                                                    <td>{{ $currency }} {{ item.sub_total }}</td>
                                                    <td>{{ item.status_name }}</td>
                                                </tr>
                                                <tr v-if="!row.item.order_items || row.item.order_items.length === 0">
                                                    <td colspan="6" class="text-center text-muted py-3">{{ __('no_products_found') }}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </template>
                        </b-table>
                    </div>

                    <!-- Footer: Totals + Pagination -->
                    <div class="figma-table-footer flex-wrap gap-3">
                        <div class="d-flex align-items-center flex-wrap gap-3">
                            <div class="d-flex align-items-center gap-2">
                                <label class="showing-results-text mb-0">{{ __('per_page') }}</label>
                                <b-form-select v-model="perPage" :options="pageOptions" size="sm" class="w-auto"
                                    @change="currentPage = 1"></b-form-select>
                            </div>
                            <table-count :current-page="currentPage" :per-page="perPage" :total-rows="totalOrderRows"></table-count>
                            <div class="d-flex flex-wrap gap-3 figma-footer-totals">
                                <span>{{ __('total_amount') }}: <strong>{{ $currency }} {{ total_amount }}</strong></span>
                                <span>{{ __('total_dchrg') }}: <strong>{{ $currency }} {{ delivery_charge }}</strong></span>
                                <span>{{ __('total_final_amount') }}: <strong>{{ $currency }} {{ remaining_final }}</strong></span>
                            </div>
                        </div>
                        <div class="d-flex align-items-center gap-3">
                            <b-pagination v-model="currentPage" :total-rows="totalOrderRows" :per-page="perPage"
                                align="right" class="figma-pagination mb-0"></b-pagination>
                        </div>
                    </div>
                </div>
            </div>
            </section>
        </div>
    </div>
</template>
<script>
import DateRangePicker from 'vue2-daterange-picker'
import DateRangePickerMixin from '../../mixins/DateRangePickerMixin'
import moment from "moment";
import axios from "axios";
export default {
    name: "range_dates",
    mixins: [DateRangePickerMixin],
    components: { DateRangePicker },
    data: function () {
        return {
            dateRange: { startDate: null, endDate: null },
            deliveryDateRange: { startDate: null, endDate: null },
            maxDate: new Date(),
            status: "",
            orderFields: [
                { key: 'id', label: __('order_id'), sortable: true, sortDirection: 'desc' },
                { key: 'user_name', label: __('user'), sortable: true, class: 'text-center' },
                { key: 'mobile', label: __('mobile'), sortable: true, class: 'text-center' },
                { key: 'total', label: __('total') + ' (' + this.$currency + ')', sortable: true, class: 'text-center' },
                { key: 'delivery_charge', label: __('dcharges') + ' (' + this.$currency + ')', sortable: true, class: 'text-center' },

                { key: 'wallet_balance', label: __('wallet_used') + '(' + this.$currency + ')', sortable: true, class: 'text-center' },
                { key: 'remaining_final', label: __('ftotal') + ' (' + this.$currency + ')', sortable: true, class: 'text-center' },
                { key: 'payment_method', label: __('p_method'), sortable: true, class: 'text-center' },
                { key: 'delivery_time', label: __('d_time'), sortable: true, class: 'text-center' },
                { key: 'active_status', label: __('status'), sortable: true, class: 'text-center' },
                { key: "actions", label: __('actions') }
            ],
            totalOrderRows: 1,
            orderItemFields: [
                { key: 'order_id', label: __('order_id'), sortable: true, sortDirection: 'desc' },
                { key: 'id', label: __('order_item_id'), sortable: true, sortDirection: 'desc' },
                { key: 'is_credited', label: __('commission'), sortable: true, class: 'text-center' },
                { key: 'user_name', label: __('user_name'), sortable: true, class: 'text-center' },
                { key: 'product_name', label: __('product'), sortable: true, class: 'text-center' },
                { key: 'mobile', label: __('mobile'), sortable: true, class: 'text-center' },
                { key: 'total', label: __('total') + '(' + this.$currency + ')', sortable: true, class: 'text-center' },

                { key: 'payment_method', label: __('p_method'), sortable: true, class: 'text-center' },
                { key: 'delivery_time', label: __('d_time'), sortable: true, class: 'text-center' },
                { key: 'active_status', label: __('status'), sortable: true, class: 'text-center' },
                { key: "actions", label: __('actions') }
            ],
            totalOrderItemRows: 1,
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
            showFilters: false,
            sectionStyle: 'style_1',
            max_visible_units: 12,
            max_col_in_single_row: 3,
            statuses: [],

            orders: [],
            total_amount: 0,
            delivery_charge: 0,
            remaining_final: 0,

            order_items: [],
            order_items_total_sum: 0,

            itemCurrentPage: 1,
            itemPerPage: 5,
            search: "",

        }
    },
    computed: {
        pageStart() {
            if (this.totalOrderRows === 0) return 0;
            return (this.currentPage - 1) * this.perPage + 1;
        },
        pageEnd() {
            return Math.min(this.currentPage * this.perPage, this.totalOrderRows);
        },
        visibleFields() {
            return this.orderFields.filter(f => !f.hidden);
        },
        sortOptions() {
            // Create an options list from our fields
            return this.orderFields
                .filter(f => f.sortable)
                .map(f => {
                    return { text: f.label, value: f.key }
                })
        }
    },
    mounted() {
        // Set the initial number of items
        this.totalOrderRows = this.orders.length
        this.totalOrderItemRows = this.order_items.length
    },
    created: function () {
        this.loadFilter();
        this.getOrderStatus();
        this.getOrders();
    },
    methods: {
        handleFilterChange() {
            localStorage.setItem('dateRangeStartDateFilter', this.dateRange.startDate);
            localStorage.setItem('dateRangeEndDateFilter', this.dateRange.endDate);
            localStorage.setItem('sellerFilter', this.seller);
            localStorage.setItem('statusFilter', this.status);
            localStorage.setItem('dateRangeStartDeliveryDateFilter', this.deliveryDateRange.startDate);
            localStorage.setItem('dateRangeEndDeliveryDateFilter', this.deliveryDateRange.endDate);
            localStorage.setItem('searchFilter', this.search);
            this.getOrders();
        },
        loadFilter() {
            const saveddateRangeStartDateFilter = localStorage.getItem('dateRangeStartDateFilter');
            console.log(saveddateRangeStartDateFilter);
            if (saveddateRangeStartDateFilter && saveddateRangeStartDateFilter != null && moment(saveddateRangeStartDateFilter).isValid()) {
                this.dateRange.startDate = saveddateRangeStartDateFilter;
            }
            const saveddateRangeEndDateFilter = localStorage.getItem('dateRangeEndDateFilter');
            if (saveddateRangeEndDateFilter && saveddateRangeEndDateFilter != null && moment(saveddateRangeEndDateFilter).isValid()) {
                this.dateRange.endDate = saveddateRangeEndDateFilter;
            }
            const savedSeller = localStorage.getItem('sellerFilter');
            if (savedSeller) {
                this.seller = savedSeller;
            }
            const savedStatus = localStorage.getItem('statusFilter');
            if (savedStatus) {
                this.status = savedStatus;
            }
            const saveddateRangeStartDeliveryDateFilter = localStorage.getItem('dateRangeStartDeliveryDateFilter');
            if (saveddateRangeStartDeliveryDateFilter && moment(saveddateRangeStartDeliveryDateFilter).isValid()) {
                this.deliveryDateRange.startDate = saveddateRangeStartDeliveryDateFilter;
            }
            const saveddateRangeEndDeliveryDateFilter = localStorage.getItem('dateRangeEndDeliveryDateFilter');
            if (saveddateRangeEndDeliveryDateFilter && moment(saveddateRangeEndDeliveryDateFilter).isValid()) {
                this.deliveryDateRange.endDate = saveddateRangeEndDeliveryDateFilter;
            }
            const savedSearchFilter = localStorage.getItem('searchFilter');
            if (savedSearchFilter) {
                this.search = savedSearchFilter;
            }
        },
        clearDate() {
            this.dateRange.startDate = null,
                this.dateRange.endDate = null,
                localStorage.setItem('dateRangeStartDateFilter', this.dateRange.startDate);
            localStorage.setItem('dateRangeEndDateFilter', this.dateRange.endDate);
            this.getOrders()
        },
        clearDeliveryDate() {
            this.deliveryDateRange.startDate = null,
                this.deliveryDateRange.endDate = null,
                localStorage.setItem('dateRangeStartDeliveryDateFilter', this.deliveryDateRange.startDate);
            localStorage.setItem('dateRangeEndDeliveryDateFilter', this.deliveryDateRange.endDate);
            this.getOrders()
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
        // Returns a Bootstrap badge class based on the numeric status ID
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
        // Maps a numeric status ID to a translation key
        getStatusTranslationKey(id) {
            const map = { 1: 'payment_pending', 2: 'received', 3: 'processed', 4: 'shipped', 5: 'outForDelivery', 6: 'delivered', 7: 'cancelled', 8: 'returned', 9: 'pending', 10: 'ready_for_pickup', 11: 'picked_up' };
            return map[Number(id)] || '';
        },
        // Returns the translated status label from a numeric ID or status name string
        getStatusLabelById(val) {
            if (val == null || val === '') return '';
            const id = typeof val === 'number' ? val : parseInt(val, 10);
            if (!isNaN(id)) {
                const key = this.getStatusTranslationKey(id);
                return key ? this.__(key) : String(val);
            }
            const nameToKey = { 'Payment Pending': 'payment_pending', 'Received': 'received', 'Processed': 'processed', 'Shipped': 'shipped', 'Out For Delivery': 'outForDelivery', 'Delivered': 'delivered', 'Cancelled': 'cancelled', 'Returned': 'returned', 'Pending': 'pending', 'Ready for Pickup': 'ready_for_pickup', 'Picked Up': 'picked_up' };
            const key = nameToKey[String(val).trim()];
            return key ? this.__(key) : String(val);
        },
        toggleOrder(itemOrRow) {
            const item = itemOrRow.item || itemOrRow;
            const isRow = !!itemOrRow.toggleDetails;

            const isShowing = isRow ? itemOrRow.detailsShowing : !!item._showDetails;

            if (!isShowing) {
                this.orders.forEach(order => {
                    this.$set(order, '_showDetails', false);
                });
            }

            if (isRow) {
                itemOrRow.toggleDetails();
            } else {
                this.$set(item, '_showDetails', !isShowing);
            }

            if ((item.order_items && item.order_items.length > 0) || item.itemsLoading) {
                return;
            }

            item.itemsLoading = true;

            axios.get(this.$deliveryBoyApiUrl + '/order_by_id?order_id=' + item.id)
                .then(res => {
                    this.$set(item, 'order_items', res.data.data.order_items || []);
                    item.itemsLoading = false;
                })
                .catch(() => {
                    item.itemsLoading = false;
                    this.showError(__('something_went_wrong'));
                });
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
        toggleColumnVisibility(field) {
            this.$set(field, 'hidden', !field.hidden);
        },
        formatDateBold(date) {
            if (!date) return '';
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
            if (!date) return '';
            return moment(date).format('hh:mm A');
        },
        getOrders() {
            this.isLoading = true
            let param = {
                "startDate": (this.dateRange.startDate != null) ? moment(this.dateRange.startDate).format('YYYY-MM-DD') : "",
                "endDate": (this.dateRange.endDate != null) ? moment(this.dateRange.endDate).format('YYYY-MM-DD') : "",
                "status": this.status,
                startDeliveryDate: this.deliveryDateRange.startDate ? moment(this.deliveryDateRange.startDate).format('YYYY-MM-DD') : '',
                endDeliveryDate: this.deliveryDateRange.endDate ? moment(this.deliveryDateRange.endDate).format('YYYY-MM-DD') : '',
                'search': this.search,
            }
            axios.get(this.$deliveryBoyApiUrl + '/orders', {
                params: param
            }).then((response) => {
                this.isLoading = false
                this.orders = response.data.data.orders.map(o => {
                    o.order_items = [];
                    o.itemsLoading = false;
                    return o;
                });
                this.totalOrderRows = this.orders.length;

                this.total_amount = this.orders.map(item => item.total).reduce((prev, curr) => prev + curr, 0).toFixed(2);
                this.delivery_charge = this.orders.map(item => item.delivery_charge).reduce((prev, curr) => prev + curr, 0).toFixed(2);
                this.remaining_final = this.orders.map(item => parseFloat(item.remaining_final) || 0).reduce((prev, curr) => prev + curr, 0).toFixed(2);

                this.order_items = response.data.data.order_items;
                this.totalOrderItemRows = this.order_items.length;
                this.order_items_total_sum = this.order_items.map(item => item.total).reduce((prev, curr) => prev + curr, 0).toFixed(2);

            });
        }
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

/* List footer: results + totals left, pagination right */
.figma-table-footer {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
    padding: 14px 20px !important;
    border-top: 1px solid var(--ui-border);
    background: var(--ui-surface);
}

.figma-footer-totals {
    font-size: 13px;
    color: var(--ui-text-muted);
    padding-left: 12px;
    border-left: 1px solid var(--ui-border);
}

.figma-footer-totals strong {
    font-weight: 700;
    color: var(--ui-heading);
}

@media (max-width: 767.98px) {
    .figma-table-footer {
        justify-content: center;
        padding: 12px 16px !important;
    }

    .figma-footer-totals {
        padding-left: 0;
        border-left: none;
    }
}
</style>
