<template>
    <div class="orders-page-container">
        <div class="page-heading d-flex justify-content-between align-items-center mb-4">
            <h3 class="modern-page-title mb-0">{{ __('orders') || 'Orders' }}</h3>
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb mb-0">
                    <li class="breadcrumb-item"><router-link to="/dashboard" class="text-muted">{{ __('dashboard')
                            }}</router-link></li>
                    <li class="breadcrumb-item active text-primary" aria-current="page">{{ __('order_list') }}</li>
                </ol>
            </nav>
        </div>

        <!-- KPI Cards V.2 Row -->
        <div class="row g-4 mb-4">
            <div class="col-xl-3 col-sm-6">
                <div class="figma-kpi-card-v2 card-kpi-new">
                    <div class="figma-kpi-icon-v2">
                        <base-icon name="Total order" width="24" height="24" useCurrentColor />
                    </div>
                    <div class="figma-kpi-content-v2">
                        <span class="figma-kpi-label-v2">{{ __('new_orders') || 'New Orders' }}</span>
                        <h3 class="figma-kpi-value-v2">{{ getStatusCount([2, 9]) }}</h3>
                    </div>
                </div>
            </div>
            <div class="col-xl-3 col-sm-6">
                <div class="figma-kpi-card-v2 card-kpi-processing">
                    <div class="figma-kpi-icon-v2">
                        <base-icon name="Processed" width="24" height="24" useCurrentColor />
                    </div>
                    <div class="figma-kpi-content-v2">
                        <span class="figma-kpi-label-v2">{{ __('processing_orders') || 'Processing Orders' }}</span>
                        <h3 class="figma-kpi-value-v2">{{ getStatusCount([3]) }}</h3>
                    </div>
                </div>
            </div>
            <div class="col-xl-3 col-sm-6">
                <div class="figma-kpi-card-v2 card-kpi-ready">
                    <div class="figma-kpi-icon-v2">
                        <base-icon name="Ready to ship" width="24" height="24" useCurrentColor />
                    </div>
                    <div class="figma-kpi-content-v2">
                        <span class="figma-kpi-label-v2">{{ __('ready_to_ship') || 'Ready to Ship' }}</span>
                        <h3 class="figma-kpi-value-v2">{{ getStatusCount([4, 10]) }}</h3>
                    </div>
                </div>
            </div>
            <div class="col-xl-3 col-sm-6">
                <div class="figma-kpi-card-v2 card-kpi-out">
                    <div class="figma-kpi-icon-v2">
                        <base-icon name="Vector (1)" width="24" height="24" useCurrentColor />
                    </div>
                    <div class="figma-kpi-content-v2">
                        <span class="figma-kpi-label-v2">{{ __('out_for_delivery') || 'Out for Delivery' }}</span>
                        <h3 class="figma-kpi-value-v2">{{ getStatusCount([5]) }}</h3>
                    </div>
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
                                <input v-model="search" type="text" class="figma-search-input"
                                    :placeholder="__('search_by_property_name_or_id') || 'Search by property name or ID'"
                                    @input="handleFilterChange()">
                            </div>
                        </div>
                        <div class="d-flex gap-2">
                            <button class="btn btn-figma-filter d-flex align-items-center gap-2"
                                :class="{ 'active': showFilters }" @click="showFilters = !showFilters">
                                <base-icon name="Funnel" width="24" height="24" useCurrentColor />
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
                                        <label class="figma-filter-label">{{ __('date_range') || 'Date Range' }} <span
                                                class="text-danger">*</span></label>
                                        <div class="modern-datepicker-container">
                                            <date-range-picker :autoApply=false :showDropdowns=true v-model="dateRange"
                                                :maxDate="maxDate" @update="handleFilterChange"
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
                                <div class="col-md-4">
                                    <div class="figma-filter-group">
                                        <label class="figma-filter-label">{{ __('seller') }} <span
                                                class="text-danger">*</span></label>
                                        <select v-model="seller" @change="handleFilterChange()"
                                            class="form-select modern-select">
                                            <option value="">{{ __('all_sellers') }}</option>
                                            <option v-for="seller in sellers" :value="seller.id">{{
                                                getDisplayName(seller.name) }}</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="figma-filter-group">
                                        <label class="figma-filter-label">{{ __('status') }} <span
                                                class="text-danger">*</span></label>
                                        <select v-model="status" @change="handleFilterChange()"
                                            class="form-select modern-select">
                                            <option value="">{{ __('all_orders') }}</option>
                                            <option v-for="status in statuses" :value='status.id'>{{
                                                getStatusDisplayName(status) }}
                                            </option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </b-collapse>

                    <div class="table-responsive mb-0">
                        <b-table :items="orders" :fields="visibleFields" :filter-included-fields="filterOn"
                            :sort-by.sync="sortBy" :sort-desc.sync="sortDesc" :sort-direction="sortDirection"
                            :bordered="false" :busy="isLoading" stacked="md" show-empty
                            :tbody-tr-class="() => 'figma-tr align-middle'" small class="figma-order-table mb-0">

                            <template #cell(id)="row">
                                <div class="figma-link-blue">
                                    {{ row.item.id }}
                                </div>
                            </template>

                            <template #cell(user_name)="row">
                                <div class="d-flex flex-column">
                                    <span class="figma-customer-name">{{ row.item.user_name }}</span>
                                    <span class="figma-customer-email">{{ row.item.email || row.item.mobile }}</span>
                                </div>
                            </template>

                            <template #cell(seller_name)="row">
                                <div class="d-flex flex-column">
                                    <span class="figma-seller-name">{{ row.item.seller_name }}</span>
                                    <span class="figma-seller-id">ID - {{ row.item.seller_id || '101' }}</span>
                                </div>
                            </template>

                            <template #cell(total_items)="row">
                                <div class="d-flex align-items-center justify-content-center">
                                    <a href="javascript:void(0)" @click="openOrderModal(row.item)"
                                        class="figma-link-blue">
                                        {{ row.item.total_items || 0 }} {{ __('items') }}
                                        <i class="bi bi-box-arrow-up-right" style="font-size: 0.75rem;"></i>
                                    </a>
                                </div>
                            </template>

                            <template #cell(total)="row">
                                <div class="d-flex flex-column">
                                    <span class="figma-amount-bold text-dark">{{ $currency }}{{ row.item.total }}</span>
                                    <span class="figma-text-muted small" v-if="row.item.payment_method">{{
                                        __('txn_type_' + row.item.payment_method.toLowerCase()) !== 'txn_type_' +
                                            row.item.payment_method.toLowerCase() ? __('txn_type_' +
                                        row.item.payment_method.toLowerCase()) : formattedName(row.item.payment_method)
                                        }}</span>
                                </div>
                            </template>

                            <template #cell(created_at)="row">
                                <div class="d-flex flex-column">
                                    <span class="figma-date-bold">{{ formatDateBold(row.item.created_at) }}</span>
                                    <span class="figma-time-light">{{ getPeriodLabel(row.item.created_at) }}, {{ formatTimeLight(row.item.created_at) }}</span>
                                </div>
                            </template>

                            <template #cell(active_status)="row">
                                <span class="figma-status-pill" :class="getStatusBadgeClass(row.item.active_status)">
                                    {{ getStatusLabelById(row.item.active_status) }}
                                </span>
                            </template>

                            <template #cell(actions)="row">
                                <div class="d-flex gap-2">
                                    <router-link
                                        :to="{ name: 'ViewOrder', params: { id: row.item.id, record: row.item } }"
                                        class="figma-action-btn">
                                        <base-icon name="Eye" hoverName="Type=Hover (1)" width="24" height="24" />
                                    </router-link>
                                    <button class="figma-action-btn" @click.stop="deleteOrder(row.index, row.item.id)"
                                        v-if="$can('order_delete')">
                                        <base-icon name="Type=Default" hoverName="Type=Hover" width="24" height="24" />
                                    </button>
                                </div>
                            </template>

                            <template #bottom-row>
                                <template v-if="orders.length > 0 && !isLoading">
                                    <b-td :colspan="beforeTotalColspan"
                                        class="figma-total-label-cell align-middle">TOTAL</b-td>
                                    <b-td class="figma-total-amount-cell align-middle">{{ $currency }}{{ total_amount
                                        }}</b-td>
                                    <b-td :colspan="afterTotalColspan"
                                        class="figma-total-empty-cell align-middle"></b-td>
                                </template>
                            </template>

                            <template #table-busy>
                                <div class="text-center py-4">
                                    <b-spinner class="align-middle" variant="primary"></b-spinner>
                                </div>
                            </template>

                            <template #row-details="row">
                                <div class="order-details-expanded shadow-sm rounded-bottom">
                                    <div class="details-header d-flex justify-content-between align-items-center">
                                        <span class="details-title">{{ __('order_items') || 'Order Items' }}</span>
                                        <span class="text-muted small">Total {{ row.item.order_items.length }}
                                            items</span>
                                    </div>
                                    <div v-if="row.item.order_items && row.item.order_items.length" class="items-list">
                                        <div v-for="(item, index) in row.item.order_items" :key="index"
                                            class="order-item-row shadow-sm border-0">
                                            <img :src="item.image" class="item-img" />
                                            <div class="item-info">
                                                <span class="item-name fw-bold">{{ item.product_name }}</span>
                                                <span class="item-variant text-muted small">{{ item.variant_name || '-'
                                                    }}</span>
                                            </div>
                                            <div class="item-qty text-muted fs-6">x {{ item.quantity }}</div>
                                            <div class="item-price fw-bold">{{ $currency }}{{ item.sub_total }}</div>
                                            <div class="item-status">
                                                <span class="badge bg-light text-dark fw-normal">{{ item.status_name
                                                    }}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div v-else-if="row.item.itemsLoading" class="text-center p-4">
                                        <b-spinner small variant="primary"></b-spinner>
                                    </div>
                                    <div v-else class="text-center text-muted p-4">
                                        {{ __('no_products_found') }}
                                    </div>
                                </div>
                            </template>
                        </b-table>
                    </div>
                    <div class="figma-table-footer">
                        <div class="d-flex align-items-center gap-2">
                            <label class="showing-results-text mb-0">{{ __('per_page') }}</label>
                            <b-form-select v-model="perPage" :options="pageOptions" size="sm"
                                style="width: auto;"></b-form-select>
                        </div>
                        <b-pagination v-model="currentPage" :total-rows="totalOrderRows" :per-page="perPage"
                            align="right" class="figma-pagination mb-0"></b-pagination>
                    </div>
                </div>
            </div>
        </section>
        <!-- Order Details Modal -->
        <b-modal id="order-details-modal" size="lg" centered hide-footer header-class="border-0 pb-0" body-class="p-0"
            modal-class="figma-modal">
            <template #modal-header="{ close }">
                <div class="figma-modal-header">
                    <div class="figma-modal-title-group text-start">
                        <h5 class="figma-text-xl-semibold mb-0">{{ __('order_details') }}</h5>
                        <p class="figma-modal-subtitle">{{ __('review_order_details_below') || 'Review order details below' }}</p>
                    </div>
                    <button type="button" class="figma-btn-close" @click="close()">
                        <i class="fa fa-times"></i>
                    </button>
                </div>
            </template>

            <div class="modal-body-content" style="max-height: 500px; overflow-y: auto;">
                <div v-if="isModalLoading" class="text-center py-5">
                    <b-spinner variant="primary"></b-spinner>
                </div>
                <div v-else-if="selectedOrder && selectedOrder.order_items && selectedOrder.order_items.length"
                    class="modal-order-columns">
                    <div v-for="(item, index) in selectedOrder.order_items" :key="index" class="order-item-card">
                        <!-- Container: Image + Data -->
                        <div class="order-item-container">
                            <img :src="item.image" class="order-item-image" />
                            <div class="order-item-data">
                                <div>
                                    <h6 class="order-item-name">{{ item.product_name }}</h6>
                                    <p class="order-item-variant">{{ item.variant_name || '-' }}</p>
                                </div>
                                <span class="figma-status-pill" :class="getStatusBadgeClass(item.active_status)">
                                    {{ item.status_name ? __(item.status_name.toLowerCase()) : '' }}
                                </span>
                            </div>
                        </div>
                        <!-- Price Info: Quantity + Subtotal -->
                        <div class="order-item-price-info">
                            <span class="order-item-qty">{{ __('quantity') }} : {{ item.quantity }}</span>
                            <span class="order-item-subtotal">{{ $currency }}{{ item.sub_total }}</span>
                        </div>
                    </div>
                </div>
                <div v-else class="text-center py-5 text-muted">
                    No items found.
                </div>
            </div>

            <div class="modal-footer">
                <div class="d-flex flex-column align-items-start">
                    <span class="text-muted extra-small font-weight-medium">{{ __('total_items') || 'Total Items'
                        }}</span>
                    <span class="figma-text-base-bold">{{ selectedOrder ? (selectedOrder.total_items ||
                        (selectedOrder.order_items ? selectedOrder.order_items.length : 0)) : 0 }} {{ __('items') }}</span>
                </div>
                <div class="d-flex flex-column align-items-start">
                    <span class="text-muted extra-small font-weight-medium">{{ __('total_amount') || 'Total Amount'
                        }}</span>
                    <span class="figma-text-base-bold">{{ $currency }}{{ selectedOrder ? selectedOrder.total : 0
                        }}</span>
                </div>
            </div>
        </b-modal>
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
            seller: "",
            status: "",
            search: "",
            orderFields: [
                { key: 'id', label: __('order_id') || 'Order ID', sortable: false, class: 'text-start col-id' },
                { key: 'user_name', label: __('customer'), sortable: false, class: 'text-start col-customer' },
                { key: 'seller_name', label: __('seller'), sortable: false, class: 'text-start col-seller' },
                { key: 'total_items', label: __('total_items'), sortable: false, class: 'text-center col-items' },
                { key: 'total', label: __('payment'), sortable: false, class: 'text-start col-payment' },
                { key: 'created_at', label: __('order_date_time'), sortable: false, class: 'text-start col-date' },
                { key: 'active_status', label: __('status'), sortable: false, class: 'text-center col-status' },
                { key: "actions", label: __('action'), class: 'col-actions' }
            ],
            footClone: false,

            totalOrderRows: 1,

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
            statuses: [],

            orders: [],
            total_amount: 0,
            delivery_charge: 0,
            remaining_final: 0,
            additional_charges_total: 0,

            sellers: null,
            itemCurrentPage: 1,
            itemPerPage: this.$perPage,
            itemPageOptions: this.$pageOptions,
            selectedTab: '',
            avatarColors: ['#D4E4F7', '#E0D4F7', '#D4F7E0', '#F7E4D4', '#D4F0F7', '#F7D4E0'],
            showFilters: false,
            statusOrderCount: [],
            isModalLoading: false,
            selectedOrder: null,
        }
    },
    computed: {
        visibleFields() {
            return this.orderFields.filter(f => !f.hidden);
        },
        pageStart() {
            if (this.totalOrderRows === 0) return 0;
            return (this.currentPage - 1) * this.perPage + 1;
        },
        pageEnd() {
            return Math.min(this.currentPage * this.perPage, this.totalOrderRows);
        },
        sortOptions() {
            // Create an options list from our fields
            return this.orderFields
                .filter(f => f.sortable)
                .map(f => {
                    return { text: f.label, value: f.key }
                })
        },
        beforeTotalColspan() {
            const index = this.visibleFields.findIndex(f => f.key === 'total');
            return index > -1 ? index : 4;
        },
        afterTotalColspan() {
            const index = this.visibleFields.findIndex(f => f.key === 'total');
            return index > -1 ? (this.visibleFields.length - index - 1) : 3;
        }
    },
    mounted() {

    },
    created: function () {
        this.loadFilter();
        this.getOrderStatus();
        this.getDashboardStats();
        this.getOrders();
    },
    watch: {
        currentPage() {
            this.getOrders();
        },
        perPage() {
            if (this.currentPage !== 1) {
                this.currentPage = 1;
            } else {
                this.getOrders();
            }
        },

    },
    methods: {

        toggleOrder(itemOrRow) {
            const item = itemOrRow.item || itemOrRow;
            const isRow = !!itemOrRow.toggleDetails;

            // Determine if the clicked row is currently showing details
            const isShowing = isRow ? itemOrRow.detailsShowing : !!item._showDetails;

            // Close all other rows if we are opening a new one
            if (!isShowing) {
                this.orders.forEach(order => {
                    this.$set(order, '_showDetails', false);
                });
            }

            // Toggle current row
            if (isRow) {
                itemOrRow.toggleDetails();
            } else {
                this.$set(item, '_showDetails', !isShowing);
            }

            // if already loaded or loading, don't call again
            if (item.order_items.length > 0 || item.itemsLoading) {
                return;
            }

            item.itemsLoading = true;

            axios.get(this.$apiUrl + '/orders/view/' + item.id)
                .then(res => {
                    // API returns: data.order_items
                    item.order_items = res.data.data.order_items || [];
                    item.itemsLoading = false;
                })
                .catch(() => {
                    item.itemsLoading = false;
                    this.showError('Failed to load order items');
                });
        },

        openOrderModal(order) {
            this.selectedOrder = order;
            this.$bvModal.show('order-details-modal');
            if (this.selectedOrder.order_items && this.selectedOrder.order_items.length === 0) {
                this.isModalLoading = true;
                axios.get(this.$apiUrl + '/orders/view/' + order.id)
                    .then(res => {
                        this.selectedOrder.order_items = res.data.data.order_items || [];
                        this.isModalLoading = false;
                    })
                    .catch(() => {
                        this.isModalLoading = false;
                    });
            }
        },

        /**
         * Display value for name that can be string or object by lang code. Uses app locale; fallback to first non-empty.
         */
        getDisplayName(name) {
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
        /**
         * Status label for dropdown. API returns status_name as object by lang code { en: "...", hi: "..." }.
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
        getOrderStatus: function (tabTitle) {
            let vm = this;
            axios.get(this.$apiUrl + '/order_statuses').then((response) => {
                this.isLoading = false
                this.statuses = response.data.data;
            }).catch(error => {
                vm.isLoading = false;
                if (error?.request?.statusText) {
                    this.showError(error.request.statusText);
                } else if (error.message) {
                    this.showError(error.message);
                } else {
                    this.showError(__('something_went_wrong'));
                }
            });
        },
        onTabChange(tabTitle) {
            this.selectedTab = tabTitle;
        },
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
        getOrders() {
            let vm = this;
            this.isLoading = true
            const param = {
                "startDate": (this.dateRange.startDate != null && moment(this.dateRange.startDate).isValid()) ? moment(this.dateRange.startDate).format('YYYY-MM-DD') : "",
                "endDate": (this.dateRange.endDate != null && moment(this.dateRange.endDate).isValid()) ? moment(this.dateRange.endDate).format('YYYY-MM-DD') : "",
                startDeliveryDate: (this.deliveryDateRange.endDate != null && moment(this.deliveryDateRange.endDate).isValid()) ? moment(this.deliveryDateRange.startDate).format('YYYY-MM-DD') : '',
                endDeliveryDate: (this.deliveryDateRange.endDate != null && moment(this.deliveryDateRange.endDate).isValid()) ? moment(this.deliveryDateRange.endDate).format('YYYY-MM-DD') : '',
                "seller": this.seller,
                "status": this.status,
                page: this.currentPage,
                per_page: this.perPage,
                item_page: this.itemCurrentPage,
                item_per_page: this.itemPerPage,
                search: this.search
            }

            axios.get(this.$apiUrl + '/orders', {
                params: param
            }).then((response) => {

                this.sellers = response.data.data.sellers;
                this.orders = response.data.data.orders.map(o => {
                    o.order_items = [];     // products will come later
                    o.itemsLoading = false; // loader flag
                    return o;
                });

                this.totalOrderRows = response.data.data.orders_total;

                this.total_amount = this.orders.map(item => Number(item.total)).reduce((prev, curr) => prev + curr, 0).toFixed(2);
                this.delivery_charge = this.orders.map(item => Number(item.delivery_charge)).reduce((prev, curr) => prev + curr, 0).toFixed(2);
                this.additional_charges_total = this.orders
                    .map(item => this.getAdditionalChargesTotal(item.additional_charges || []))
                    .reduce((prev, curr) => prev + curr, 0)
                    .toFixed(2);
                this.remaining_final = this.orders.map(item => Number(item.remaining_final)).reduce((prev, curr) => prev + curr, 0).toFixed(2);

                this.isLoading = false;

            }).catch(error => {
                vm.isLoading = false;
                if (error?.request?.statusText) {
                    this.showError(error.request.statusText);
                } else if (error.message) {
                    this.showError(error.message);
                } else {
                    this.showError(__('something_went_wrong'));
                }
            });
        },
        deleteOrder(index, id) {
            this.$swal.fire({
                title: __('are_you_sure'),
                text: __('you_want_be_able_to_revert_this'),
                confirmButtonText: __('yes_sure'),
                cancelButtonText: __('cancel'),
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#37a279',
                cancelButtonColor: '#d33',
            }).then(result => {
                if (result.value) {
                    this.isLoading = true
                    let postData = {
                        id: id
                    }
                    axios.post(this.$apiUrl + '/orders/delete', postData)
                        .then((response) => {
                            this.isLoading = false
                            let data = response.data;
                            this.orders.splice(index, 1)
                            this.showSuccess(data.message)
                        });
                }
            });
        },
        deleteOrderItem(index, id) {
            this.$swal.fire({
                title: __('are_you_sure'),
                text: __('you_want_be_able_to_revert_this'),
                confirmButtonText: __('yes_sure'),
                cancelButtonText: __('cancel'),
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#37a279',
                cancelButtonColor: '#d33',
            }).then(result => {
                if (result.value) {
                    this.isLoading = true
                    let postData = {
                        id: id
                    }
                    axios.post(this.$apiUrl + '/orders/delete_item', postData)
                        .then((response) => {
                            this.isLoading = false
                            let data = response.data;
                            this.order_items.splice(index, 1)
                            this.showSuccess(data.message)
                        });
                }
            });
        },
        getAdditionalChargesTotal(charges) {
            if (!charges || !Array.isArray(charges)) return 0;
            return charges.reduce((total, charge) => total + (parseFloat(charge.amount) || 0), 0);
        },
        getAdditionalChargesTooltip(charges) {
            if (!charges || !Array.isArray(charges) || charges.length === 0) return this.__('no_additional_charges') !== 'no_additional_charges' ? this.__('no_additional_charges') : 'No additional charges';

            return charges.map(charge =>
                `${this.__(charge.title)}: ${this.$currency}${this.formatAmount(charge.amount)}`
            ).join('\n');
        },
        formatAmount(amount) {
            if (typeof amount !== 'number') amount = parseFloat(amount);
            return Number.isInteger(amount) ? amount : amount.toFixed(2);
        },
        formatDateBold(date) {
            if (!date) return 'N/A';
            return moment(date).format('DD, MMM YYYY');
        },
        getPeriodLabel(date) {
            if (!date) return '';
            const hour = moment(date).hour();
            if (hour >= 5 && hour < 12) {
                return this.__('morning') || 'Morning';
            } else if (hour >= 12 && hour < 17) {
                return this.__('afternoon') || 'Afternoon';
            } else if (hour >= 17 && hour < 21) {
                return this.__('evening') || 'Evening';
            } else {
                return this.__('night') || 'Night';
            }
        },
        formatTimeLight(date) {
            if (!date) return '';
            return moment(date).format('hh:mm A');
        },
        getStatusBadgeClass(statusId) {
            const id = Number(statusId);
            if (id === 1) return 'status-pending';
            if (id === 2) return 'status-received';
            if (id === 3) return 'status-processed';
            if (id === 4) return 'status-shipped';
            if (id === 5) return 'status-outfordelivery';
            if (id === 6) return 'status-delivered';
            if (id === 7 || id === 8) return 'status-cancelled';
            return 'status-default';
        },
        getStatusTranslationKey(id) {
            const map = { 1: 'payment_pending', 2: 'received', 3: 'processed', 4: 'shipped', 5: 'outForDelivery', 6: 'delivered', 7: 'cancelled', 8: 'returned', 9: 'pending', 10: 'ready_for_pickup', 11: 'picked_up' };
            return map[Number(id)] || '';
        },
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
        getDashboardStats() {
            axios.get(this.$apiUrl + '/dashboard').then(res => {
                if (res.data.status === 1) {
                    this.statusOrderCount = res.data.data.status_order_count || [];
                }
            }).catch(err => {
                console.error("Error fetching dashboard stats:", err);
            });
        },
        getStatusCount(statusIds) {
            if (!this.statusOrderCount || !this.statusOrderCount.length) return 0;
            const nameToId = {
                'Payment Pending': 1, 'Received': 2, 'Processed': 3, 'Shipped': 4,
                'Out For Delivery': 5, 'Delivered': 6, 'Cancelled': 7, 'Returned': 8,
                'Pending': 9, 'Ready for Pickup': 10, 'Picked Up': 11
            };
            let total = 0;
            this.statusOrderCount.forEach(s => {
                const id = nameToId[s.status];
                if (id && statusIds.includes(id)) {
                    total += (s.order_count || 0);
                }
            });
            return total;
        },
        toggleColumnVisibility(field) {
            this.$set(field, 'hidden', !field.hidden);
        }
    }
};
</script>

<style scoped>
@import "../../../../node_modules/vue2-daterange-picker/dist/vue2-daterange-picker.css";
/* Orders page styles migrated to global custom-egrocer.scss */

.figma-total-label-cell {
    background: #F7F7F7 !important;
    border-top: 1px solid #EDEDED !important;
    border-bottom: 1px solid #EDEDED !important;
    padding: 16px 24px !important;
    font-size: 14px !important;
    font-weight: 700 !important;
    color: #333333 !important;
    height: 56px !important;
    text-transform: uppercase !important;
    letter-spacing: 0.5px;
}

.figma-total-amount-cell {
    background: #F7F7F7 !important;
    border-top: 1px solid #EDEDED !important;
    border-bottom: 1px solid #EDEDED !important;
    padding: 16px 16px !important;
    font-size: 16px !important;
    font-weight: 700 !important;
    color: #333333 !important;
    height: 56px !important;
}

.figma-total-empty-cell {
    background: #F7F7F7 !important;
    border-top: 1px solid #EDEDED !important;
    border-bottom: 1px solid #EDEDED !important;
    height: 56px !important;
}

.figma-table-footer {
    height: 88px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 24px !important;
    border-top: 1px solid #EDEDED !important;
    background-color: #FFFFFF !important;
}

.table-responsive {
    margin-bottom: 0 !important;
    border-bottom: none !important;
}
</style>
