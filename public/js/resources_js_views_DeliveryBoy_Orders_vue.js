"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_views_DeliveryBoy_Orders_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/DeliveryBoy/Orders.vue?vue&type=script&lang=js":
/*!*******************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/DeliveryBoy/Orders.vue?vue&type=script&lang=js ***!
  \*******************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var vue2_daterange_picker__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue2-daterange-picker */ "./node_modules/vue2-daterange-picker/dist/vue2-daterange-picker.umd.min.js");
/* harmony import */ var vue2_daterange_picker__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue2_daterange_picker__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _mixins_DateRangePickerMixin__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../mixins/DateRangePickerMixin */ "./resources/js/mixins/DateRangePickerMixin.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_3__);
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//





/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: "range_dates",
  mixins: [_mixins_DateRangePickerMixin__WEBPACK_IMPORTED_MODULE_1__["default"]],
  components: {
    DateRangePicker: (vue2_daterange_picker__WEBPACK_IMPORTED_MODULE_0___default())
  },
  data: function data() {
    return {
      dateRange: {
        startDate: null,
        endDate: null
      },
      deliveryDateRange: {
        startDate: null,
        endDate: null
      },
      maxDate: new Date(),
      status: "",
      orderFields: [{
        key: 'id',
        label: __('order_id'),
        sortable: true,
        sortDirection: 'desc'
      }, {
        key: 'user_name',
        label: __('user'),
        sortable: true,
        "class": 'text-center'
      }, {
        key: 'mobile',
        label: __('mobile'),
        sortable: true,
        "class": 'text-center'
      }, {
        key: 'total',
        label: __('total') + ' (' + this.$currency + ')',
        sortable: true,
        "class": 'text-center'
      }, {
        key: 'delivery_charge',
        label: __('dcharges') + ' (' + this.$currency + ')',
        sortable: true,
        "class": 'text-center'
      }, {
        key: 'wallet_balance',
        label: __('wallet_used') + '(' + this.$currency + ')',
        sortable: true,
        "class": 'text-center'
      }, {
        key: 'remaining_final',
        label: __('ftotal') + ' (' + this.$currency + ')',
        sortable: true,
        "class": 'text-center'
      }, {
        key: 'payment_method',
        label: __('p_method'),
        sortable: true,
        "class": 'text-center'
      }, {
        key: 'delivery_time',
        label: __('d_time'),
        sortable: true,
        "class": 'text-center'
      }, {
        key: 'active_status',
        label: __('status'),
        sortable: true,
        "class": 'text-center'
      }, {
        key: "actions",
        label: __('actions')
      }],
      totalOrderRows: 1,
      orderItemFields: [{
        key: 'order_id',
        label: __('order_id'),
        sortable: true,
        sortDirection: 'desc'
      }, {
        key: 'id',
        label: __('order_item_id'),
        sortable: true,
        sortDirection: 'desc'
      }, {
        key: 'is_credited',
        label: __('commission'),
        sortable: true,
        "class": 'text-center'
      }, {
        key: 'user_name',
        label: __('user_name'),
        sortable: true,
        "class": 'text-center'
      }, {
        key: 'product_name',
        label: __('product'),
        sortable: true,
        "class": 'text-center'
      }, {
        key: 'mobile',
        label: __('mobile'),
        sortable: true,
        "class": 'text-center'
      }, {
        key: 'total',
        label: __('total') + '(' + this.$currency + ')',
        sortable: true,
        "class": 'text-center'
      }, {
        key: 'payment_method',
        label: __('p_method'),
        sortable: true,
        "class": 'text-center'
      }, {
        key: 'delivery_time',
        label: __('d_time'),
        sortable: true,
        "class": 'text-center'
      }, {
        key: 'active_status',
        label: __('status'),
        sortable: true,
        "class": 'text-center'
      }, {
        key: "actions",
        label: __('actions')
      }],
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
      search: ""
    };
  },
  computed: {
    pageStart: function pageStart() {
      if (this.totalOrderRows === 0) return 0;
      return (this.currentPage - 1) * this.perPage + 1;
    },
    pageEnd: function pageEnd() {
      return Math.min(this.currentPage * this.perPage, this.totalOrderRows);
    },
    visibleFields: function visibleFields() {
      return this.orderFields.filter(function (f) {
        return !f.hidden;
      });
    },
    sortOptions: function sortOptions() {
      // Create an options list from our fields
      return this.orderFields.filter(function (f) {
        return f.sortable;
      }).map(function (f) {
        return {
          text: f.label,
          value: f.key
        };
      });
    }
  },
  mounted: function mounted() {
    // Set the initial number of items
    this.totalOrderRows = this.orders.length;
    this.totalOrderItemRows = this.order_items.length;
  },
  created: function created() {
    this.loadFilter();
    this.getOrderStatus();
    this.getOrders();
  },
  methods: {
    handleFilterChange: function handleFilterChange() {
      localStorage.setItem('dateRangeStartDateFilter', this.dateRange.startDate);
      localStorage.setItem('dateRangeEndDateFilter', this.dateRange.endDate);
      localStorage.setItem('sellerFilter', this.seller);
      localStorage.setItem('statusFilter', this.status);
      localStorage.setItem('dateRangeStartDeliveryDateFilter', this.deliveryDateRange.startDate);
      localStorage.setItem('dateRangeEndDeliveryDateFilter', this.deliveryDateRange.endDate);
      localStorage.setItem('searchFilter', this.search);
      this.getOrders();
    },
    loadFilter: function loadFilter() {
      var saveddateRangeStartDateFilter = localStorage.getItem('dateRangeStartDateFilter');
      console.log(saveddateRangeStartDateFilter);
      if (saveddateRangeStartDateFilter && saveddateRangeStartDateFilter != null && moment__WEBPACK_IMPORTED_MODULE_2___default()(saveddateRangeStartDateFilter).isValid()) {
        this.dateRange.startDate = saveddateRangeStartDateFilter;
      }
      var saveddateRangeEndDateFilter = localStorage.getItem('dateRangeEndDateFilter');
      if (saveddateRangeEndDateFilter && saveddateRangeEndDateFilter != null && moment__WEBPACK_IMPORTED_MODULE_2___default()(saveddateRangeEndDateFilter).isValid()) {
        this.dateRange.endDate = saveddateRangeEndDateFilter;
      }
      var savedSeller = localStorage.getItem('sellerFilter');
      if (savedSeller) {
        this.seller = savedSeller;
      }
      var savedStatus = localStorage.getItem('statusFilter');
      if (savedStatus) {
        this.status = savedStatus;
      }
      var saveddateRangeStartDeliveryDateFilter = localStorage.getItem('dateRangeStartDeliveryDateFilter');
      if (saveddateRangeStartDeliveryDateFilter && moment__WEBPACK_IMPORTED_MODULE_2___default()(saveddateRangeStartDeliveryDateFilter).isValid()) {
        this.deliveryDateRange.startDate = saveddateRangeStartDeliveryDateFilter;
      }
      var saveddateRangeEndDeliveryDateFilter = localStorage.getItem('dateRangeEndDeliveryDateFilter');
      if (saveddateRangeEndDeliveryDateFilter && moment__WEBPACK_IMPORTED_MODULE_2___default()(saveddateRangeEndDeliveryDateFilter).isValid()) {
        this.deliveryDateRange.endDate = saveddateRangeEndDeliveryDateFilter;
      }
      var savedSearchFilter = localStorage.getItem('searchFilter');
      if (savedSearchFilter) {
        this.search = savedSearchFilter;
      }
    },
    clearDate: function clearDate() {
      this.dateRange.startDate = null, this.dateRange.endDate = null, localStorage.setItem('dateRangeStartDateFilter', this.dateRange.startDate);
      localStorage.setItem('dateRangeEndDateFilter', this.dateRange.endDate);
      this.getOrders();
    },
    clearDeliveryDate: function clearDeliveryDate() {
      this.deliveryDateRange.startDate = null, this.deliveryDateRange.endDate = null, localStorage.setItem('dateRangeStartDeliveryDateFilter', this.deliveryDateRange.startDate);
      localStorage.setItem('dateRangeEndDeliveryDateFilter', this.deliveryDateRange.endDate);
      this.getOrders();
    },
    /**
     * Status name for dropdown. API returns status_name as object by lang code { en: "...", hi: "..." }.
     * Picks current app locale; fallback to status.status.
     */
    getStatusDisplayName: function getStatusDisplayName(status) {
      if (!status) return '';
      var sn = status.status_name;
      if (sn == null) return status.status || '';
      if (typeof sn === 'string') return sn.trim() || status.status || '';
      if (_typeof(sn) === 'object' && !Array.isArray(sn)) {
        var appLocale = window.appLocale || window.localStorage.getItem('lang') || 'en';
        var forLocale = sn[appLocale];
        if (forLocale != null && String(forLocale).trim() !== '') return String(forLocale).trim();
        var first = Object.values(sn).find(function (val) {
          return val != null && String(val).trim() !== '';
        });
        return first != null ? String(first).trim() : status.status || '';
      }
      return status.status || '';
    },
    // Returns a Bootstrap badge class based on the numeric status ID
    getStatusBadgeClass: function getStatusBadgeClass(statusId) {
      var id = Number(statusId);
      var classMap = {
        1: 'status-pending',
        // Payment Pending
        2: 'status-received',
        // Received
        3: 'status-processed',
        // Processed
        4: 'status-shipped',
        // Shipped
        5: 'status-outfordelivery',
        // Out For Delivery
        6: 'status-delivered',
        // Delivered
        7: 'status-cancelled',
        // Cancelled
        8: 'status-returned',
        // Returned
        9: 'status-pending',
        // Pending (Self Pickup)
        10: 'status-processed',
        // Ready for Pickup (Self Pickup)
        11: 'status-delivered' // Picked Up (Self Pickup)
      };
      return classMap[id] || 'status-default';
    },
    // Maps a numeric status ID to a translation key
    getStatusTranslationKey: function getStatusTranslationKey(id) {
      var map = {
        1: 'payment_pending',
        2: 'received',
        3: 'processed',
        4: 'shipped',
        5: 'outForDelivery',
        6: 'delivered',
        7: 'cancelled',
        8: 'returned',
        9: 'pending',
        10: 'ready_for_pickup',
        11: 'picked_up'
      };
      return map[Number(id)] || '';
    },
    // Returns the translated status label from a numeric ID or status name string
    getStatusLabelById: function getStatusLabelById(val) {
      if (val == null || val === '') return '';
      var id = typeof val === 'number' ? val : parseInt(val, 10);
      if (!isNaN(id)) {
        var _key = this.getStatusTranslationKey(id);
        return _key ? this.__(_key) : String(val);
      }
      var nameToKey = {
        'Payment Pending': 'payment_pending',
        'Received': 'received',
        'Processed': 'processed',
        'Shipped': 'shipped',
        'Out For Delivery': 'outForDelivery',
        'Delivered': 'delivered',
        'Cancelled': 'cancelled',
        'Returned': 'returned',
        'Pending': 'pending',
        'Ready for Pickup': 'ready_for_pickup',
        'Picked Up': 'picked_up'
      };
      var key = nameToKey[String(val).trim()];
      return key ? this.__(key) : String(val);
    },
    toggleOrder: function toggleOrder(itemOrRow) {
      var _this = this;
      var item = itemOrRow.item || itemOrRow;
      var isRow = !!itemOrRow.toggleDetails;
      var isShowing = isRow ? itemOrRow.detailsShowing : !!item._showDetails;
      if (!isShowing) {
        this.orders.forEach(function (order) {
          _this.$set(order, '_showDetails', false);
        });
      }
      if (isRow) {
        itemOrRow.toggleDetails();
      } else {
        this.$set(item, '_showDetails', !isShowing);
      }
      if (item.order_items && item.order_items.length > 0 || item.itemsLoading) {
        return;
      }
      item.itemsLoading = true;
      axios__WEBPACK_IMPORTED_MODULE_3___default().get(this.$deliveryBoyApiUrl + '/order_by_id?order_id=' + item.id).then(function (res) {
        _this.$set(item, 'order_items', res.data.data.order_items || []);
        item.itemsLoading = false;
      })["catch"](function () {
        item.itemsLoading = false;
        _this.showError(__('something_went_wrong'));
      });
    },
    getOrderStatus: function getOrderStatus() {
      var _this2 = this;
      var vm = this;
      axios__WEBPACK_IMPORTED_MODULE_3___default().get(this.$apiUrl + '/order_statuses').then(function (response) {
        _this2.isLoading = false;
        _this2.statuses = response.data.data;
      })["catch"](function (error) {
        vm.isLoading = false;
        if (error.request.statusText) {
          _this2.showError(error.request.statusText);
        } else if (error.message) {
          _this2.showError(error.message);
        } else {
          _this2.showError(__('something_went_wrong'));
        }
      });
    },
    toggleColumnVisibility: function toggleColumnVisibility(field) {
      this.$set(field, 'hidden', !field.hidden);
    },
    formatDateBold: function formatDateBold(date) {
      if (!date) return '';
      return moment__WEBPACK_IMPORTED_MODULE_2___default()(date).format('DD MMM YYYY');
    },
    getPeriodLabel: function getPeriodLabel(date) {
      if (!date) return '';
      var hour = moment__WEBPACK_IMPORTED_MODULE_2___default()(date).hour();
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
    formatTimeLight: function formatTimeLight(date) {
      if (!date) return '';
      return moment__WEBPACK_IMPORTED_MODULE_2___default()(date).format('hh:mm A');
    },
    getOrders: function getOrders() {
      var _this3 = this;
      this.isLoading = true;
      var param = {
        "startDate": this.dateRange.startDate != null ? moment__WEBPACK_IMPORTED_MODULE_2___default()(this.dateRange.startDate).format('YYYY-MM-DD') : "",
        "endDate": this.dateRange.endDate != null ? moment__WEBPACK_IMPORTED_MODULE_2___default()(this.dateRange.endDate).format('YYYY-MM-DD') : "",
        "status": this.status,
        startDeliveryDate: this.deliveryDateRange.startDate ? moment__WEBPACK_IMPORTED_MODULE_2___default()(this.deliveryDateRange.startDate).format('YYYY-MM-DD') : '',
        endDeliveryDate: this.deliveryDateRange.endDate ? moment__WEBPACK_IMPORTED_MODULE_2___default()(this.deliveryDateRange.endDate).format('YYYY-MM-DD') : '',
        'search': this.search
      };
      axios__WEBPACK_IMPORTED_MODULE_3___default().get(this.$deliveryBoyApiUrl + '/orders', {
        params: param
      }).then(function (response) {
        _this3.isLoading = false;
        _this3.orders = response.data.data.orders.map(function (o) {
          o.order_items = [];
          o.itemsLoading = false;
          return o;
        });
        _this3.totalOrderRows = _this3.orders.length;
        _this3.total_amount = _this3.orders.map(function (item) {
          return item.total;
        }).reduce(function (prev, curr) {
          return prev + curr;
        }, 0).toFixed(2);
        _this3.delivery_charge = _this3.orders.map(function (item) {
          return item.delivery_charge;
        }).reduce(function (prev, curr) {
          return prev + curr;
        }, 0).toFixed(2);
        _this3.remaining_final = _this3.orders.map(function (item) {
          return parseFloat(item.remaining_final) || 0;
        }).reduce(function (prev, curr) {
          return prev + curr;
        }, 0).toFixed(2);
        _this3.order_items = response.data.data.order_items;
        _this3.totalOrderItemRows = _this3.order_items.length;
        _this3.order_items_total_sum = _this3.order_items.map(function (item) {
          return item.total;
        }).reduce(function (prev, curr) {
          return prev + curr;
        }, 0).toFixed(2);
      });
    }
  }
});

/***/ }),

/***/ "./resources/js/mixins/DateRangePickerMixin.js":
/*!*****************************************************!*\
  !*** ./resources/js/mixins/DateRangePickerMixin.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
/**
 * Mixin for vue2-daterange-picker with translated labels.
 * Provides localeData (Cancel, Apply) and customRanges (Today, Yesterday, etc.)
 */
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  computed: {
    dateRangePickerLocale: function dateRangePickerLocale() {
      return {
        cancelLabel: __('cancel'),
        applyLabel: __('apply')
      };
    },
    dateRangePickerRanges: function dateRangePickerRanges() {
      var _ref;
      return _ref = {}, _defineProperty(_ref, __('today'), this.getTodayRange()), _defineProperty(_ref, __('yesterday'), this.getYesterdayRange()), _defineProperty(_ref, __('this_week'), this.getThisWeekRange()), _defineProperty(_ref, __('this_month'), this.getThisMonthRange()), _defineProperty(_ref, __('this_year'), this.getThisYearRange()), _defineProperty(_ref, __('last_month'), this.getLastMonthRange()), _ref;
    }
  },
  methods: {
    getTodayRange: function getTodayRange() {
      var today = new Date();
      today.setHours(0, 0, 0, 0);
      var todayEnd = new Date();
      todayEnd.setHours(23, 59, 59, 999);
      return [today, todayEnd];
    },
    getYesterdayRange: function getYesterdayRange() {
      var yesterdayStart = new Date();
      yesterdayStart.setDate(yesterdayStart.getDate() - 1);
      yesterdayStart.setHours(0, 0, 0, 0);
      var yesterdayEnd = new Date();
      yesterdayEnd.setDate(yesterdayEnd.getDate() - 1);
      yesterdayEnd.setHours(23, 59, 59, 999);
      return [yesterdayStart, yesterdayEnd];
    },
    getThisWeekRange: function getThisWeekRange() {
      var today = new Date();
      var first = new Date(today);
      first.setDate(today.getDate() - today.getDay());
      first.setHours(0, 0, 0, 0);
      var last = new Date(first);
      last.setDate(first.getDate() + 6);
      last.setHours(23, 59, 59, 999);
      return [first, last];
    },
    getThisMonthRange: function getThisMonthRange() {
      var today = new Date();
      var start = new Date(today.getFullYear(), today.getMonth(), 1);
      var end = new Date(today.getFullYear(), today.getMonth() + 1, 0, 23, 59, 59, 999);
      return [start, end];
    },
    getThisYearRange: function getThisYearRange() {
      var today = new Date();
      var start = new Date(today.getFullYear(), 0, 1);
      var end = new Date(today.getFullYear(), 11, 31, 23, 59, 59, 999);
      return [start, end];
    },
    getLastMonthRange: function getLastMonthRange() {
      var today = new Date();
      var start = new Date(today.getFullYear(), today.getMonth() - 1, 1);
      var end = new Date(today.getFullYear(), today.getMonth(), 0, 23, 59, 59, 999);
      return [start, end];
    }
  }
});

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/DeliveryBoy/Orders.vue?vue&type=style&index=0&id=4291351b&scoped=true&lang=css":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/DeliveryBoy/Orders.vue?vue&type=style&index=0&id=4291351b&scoped=true&lang=css ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue2_daterange_picker_dist_vue2_daterange_picker_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! -!../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!../../../../node_modules/vue2-daterange-picker/dist/vue2-daterange-picker.css */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue2-daterange-picker/dist/vue2-daterange-picker.css");
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
___CSS_LOADER_EXPORT___.i(_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue2_daterange_picker_dist_vue2_daterange_picker_css__WEBPACK_IMPORTED_MODULE_1__["default"]);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "\n.vue-daterange-picker[data-v-1ebd09d2][data-v-4291351b] {\n    min-width: 80%;\n}\n@media only screen and (min-width: 600px) {\n.vue-daterange-picker[data-v-1ebd09d2][data-v-4291351b] {\n        min-width: 90%;\n}\n}\n\n/* List footer: results + totals left, pagination right */\n.figma-table-footer[data-v-4291351b] {\n    display: flex;\n    flex-wrap: wrap;\n    justify-content: space-between;\n    align-items: center;\n    gap: 12px;\n    padding: 14px 20px !important;\n    border-top: 1px solid var(--ui-border);\n    background: var(--ui-surface);\n}\n.figma-footer-totals[data-v-4291351b] {\n    font-size: 13px;\n    color: var(--ui-text-muted);\n    padding-left: 12px;\n    border-left: 1px solid var(--ui-border);\n}\n.figma-footer-totals strong[data-v-4291351b] {\n    font-weight: 700;\n    color: var(--ui-heading);\n}\n@media (max-width: 767.98px) {\n.figma-table-footer[data-v-4291351b] {\n        justify-content: center;\n        padding: 12px 16px !important;\n}\n.figma-footer-totals[data-v-4291351b] {\n        padding-left: 0;\n        border-left: none;\n}\n}\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue2-daterange-picker/dist/vue2-daterange-picker.css":
/*!*****************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue2-daterange-picker/dist/vue2-daterange-picker.css ***!
  \*****************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.id, "td[data-v-98ac2448],th[data-v-98ac2448]{padding:2px;background-color:#fff}td.today[data-v-98ac2448]{font-weight:700}td.disabled[data-v-98ac2448]{pointer-events:none;background-color:#eee;border-radius:0;opacity:.6}.fa[data-v-98ac2448]{display:inline-block;width:100%;height:100%;background:transparent no-repeat 50%;background-size:100% 100%;fill:#ccc}.next[data-v-98ac2448]:hover,.prev[data-v-98ac2448]:hover{background-color:transparent!important}.next .fa[data-v-98ac2448]:hover,.prev .fa[data-v-98ac2448]:hover{opacity:.6}.chevron-left[data-v-98ac2448]{width:16px;height:16px;display:block;background-image:url(\"data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='-2 -2 10 10'%3E%3Cpath d='M5.25 0l-4 4 4 4 1.5-1.5-2.5-2.5 2.5-2.5-1.5-1.5z'/%3E%3C/svg%3E\")}.chevron-right[data-v-98ac2448]{width:16px;height:16px;display:block;background-image:url(\"data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='-2 -2 10 10'%3E%3Cpath d='M2.75 0l-1.5 1.5 2.5 2.5-2.5 2.5 1.5 1.5 4-4-4-4z'/%3E%3C/svg%3E\")}.yearselect[data-v-98ac2448]{padding-right:1px;border:none;-webkit-appearance:menulist;-moz-appearance:menulist;appearance:menulist}.monthselect[data-v-98ac2448]{border:none}.daterangepicker .ranges{text-align:left;margin:0;width:100%}.daterangepicker .ranges ul{list-style:none;margin:0 auto;padding:0;width:100%}.daterangepicker .ranges li{font-size:12px;padding:8px 12px;cursor:pointer}.daterangepicker .ranges li:hover{background-color:#eee;color:#000}.daterangepicker .ranges li.active{background-color:#08c;color:#fff}.daterangepicker .monthselect,.daterangepicker .yearselect{font-size:12px;padding:1px;height:auto;margin:0;cursor:default;width:calc(50% - 1rem)}.daterangepicker .monthselect{margin-right:1rem}.daterangepicker .calendar-time{text-align:center;margin:4px auto 0 auto;line-height:30px;position:relative;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center}.daterangepicker .calendar-time select.disabled{color:#ccc;cursor:not-allowed}.daterangepicker select.ampmselect,.daterangepicker select.hourselect,.daterangepicker select.minuteselect,.daterangepicker select.secondselect{width:50px;margin:2px;background:#eee;border:1px solid #eee;padding:2px;outline:0;font-size:12px}.daterangepicker .drp-buttons .btn{margin-left:8px;font-size:12px;font-weight:700;padding:4px 8px}.daterangepicker .btn{display:inline-block;text-align:center;vertical-align:middle;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;background-color:transparent;border:1px solid transparent}.daterangepicker .btn-primary,.daterangepicker .btn-success{background-color:#28a745;color:#fff}.daterangepicker .btn-secondary{background-color:#6c757d;color:#fff}.vue-daterange-picker *,.vue-daterange-picker :after,.vue-daterange-picker :before{-webkit-box-sizing:border-box;box-sizing:border-box}.drp-calendar .col .left{-webkit-box-flex:0;-ms-flex:0 0 auto;flex:0 0 auto}.daterangepicker.hide-calendars.show-ranges .ranges,.daterangepicker.hide-calendars.show-ranges .ranges ul{width:100%}.daterangepicker .calendars-container{display:-webkit-box;display:-ms-flexbox;display:flex}.daterangepicker[readonly]{pointer-events:none}.daterangepicker{position:absolute;color:inherit;background-color:#fff;border-radius:4px;border:1px solid #ddd;width:278px;max-width:none;padding:0;margin-top:7px;top:100px;left:20px;z-index:3001;display:none;font-size:15px;line-height:1em}.daterangepicker:after,.daterangepicker:before{position:absolute;display:inline-block;border-bottom-color:rgba(0,0,0,.2);content:\"\"}.daterangepicker:before{top:-7px;border-right:7px solid transparent;border-left:7px solid transparent;border-bottom:7px solid #ccc}.daterangepicker:after{top:-6px;border-right:6px solid transparent;border-bottom:6px solid #fff;border-left:6px solid transparent}.daterangepicker.opensleft:before{right:9px}.daterangepicker.opensleft:after{right:10px}.daterangepicker.openscenter:after,.daterangepicker.openscenter:before{left:0;right:0;width:0;margin-left:auto;margin-right:auto}.daterangepicker.opensright:before{left:9px}.daterangepicker.opensright:after{left:10px}.daterangepicker.drop-up{margin-top:-7px}.daterangepicker.drop-up:before{top:auto;bottom:-7px;border-bottom:initial;border-top:7px solid #ccc}.daterangepicker.drop-up:after{top:auto;bottom:-6px;border-bottom:initial;border-top:6px solid #fff}.daterangepicker.single .drp-selected{display:none}.daterangepicker.show-calendar .drp-buttons,.daterangepicker.show-calendar .drp-calendar{display:block}.daterangepicker.auto-apply .drp-buttons{display:none}.daterangepicker .drp-calendar{display:none;max-width:270px;width:270px}.daterangepicker .drp-calendar.left{padding:8px 0 8px 8px}.daterangepicker .drp-calendar.right{padding:8px}.daterangepicker .drp-calendar.single .calendar-table{border:none}.daterangepicker .calendar-table .next span,.daterangepicker .calendar-table .prev span{color:#fff;border:solid #000;border-width:0 2px 2px 0;border-radius:0;display:inline-block;padding:3px}.daterangepicker .calendar-table .next span{transform:rotate(-45deg);-webkit-transform:rotate(-45deg)}.daterangepicker .calendar-table .prev span{transform:rotate(135deg);-webkit-transform:rotate(135deg)}.daterangepicker .calendar-table td,.daterangepicker .calendar-table th{white-space:nowrap;text-align:center;vertical-align:middle;min-width:32px;width:32px;height:24px;line-height:24px;font-size:12px;border-radius:4px;border:1px solid transparent;cursor:pointer}.daterangepicker .calendar-table{border:1px solid #fff;border-radius:4px;background-color:#fff}.daterangepicker .calendar-table table{width:100%;margin:0;border-spacing:0;border-collapse:collapse;display:table}.daterangepicker td.available:hover,.daterangepicker th.available:hover{background-color:#eee;border-color:transparent;color:inherit}.daterangepicker td.week,.daterangepicker th.week{font-size:80%;color:#ccc}.daterangepicker td.off,.daterangepicker td.off.end-date,.daterangepicker td.off.in-range,.daterangepicker td.off.start-date{background-color:#fff;border-color:transparent;color:#999}.daterangepicker td.in-range{background-color:#ebf4f8;border-color:transparent;color:#000;border-radius:0}.daterangepicker td.start-date{border-radius:4px 0 0 4px}.daterangepicker td.end-date{border-radius:0 4px 4px 0}.daterangepicker td.start-date.end-date{border-radius:4px}.daterangepicker td.active,.daterangepicker td.active:hover{background-color:#357ebd;border-color:transparent;color:#fff}.daterangepicker th.month{width:auto}.daterangepicker option.disabled,.daterangepicker td.disabled{color:#999;cursor:not-allowed;text-decoration:line-through}.daterangepicker select.yearselect{width:40%}.daterangepicker .drp-buttons{clear:both;text-align:right;padding:8px;border-top:1px solid #ddd;display:none;line-height:12px;vertical-align:middle}.daterangepicker .drp-selected{display:inline-block;font-size:12px;padding-right:8px}.daterangepicker.show-ranges .drp-calendar.left{border-left:1px solid #ddd}.daterangepicker.show-calendar .ranges{margin-top:8px;width:auto}@media (min-width:564px){.daterangepicker{width:auto}.daterangepicker .ranges ul{width:140px}.daterangepicker.single .ranges ul{width:100%}.daterangepicker.single .drp-calendar.left{clear:none}.daterangepicker.ltr{direction:ltr;text-align:left}.daterangepicker.ltr .drp-calendar.left{clear:left;margin-right:0}.daterangepicker.ltr .drp-calendar.left .calendar-table{border-right:none;border-top-right-radius:0;border-bottom-right-radius:0}.daterangepicker.ltr .drp-calendar.right{margin-left:0}.daterangepicker.ltr .drp-calendar.right .calendar-table{border-left:none;border-top-left-radius:0;border-bottom-left-radius:0}.daterangepicker.ltr .drp-calendar.left .calendar-table{padding-right:8px}.daterangepicker.rtl{direction:rtl;text-align:right}.daterangepicker.rtl .drp-calendar.left{clear:right;margin-left:0}.daterangepicker.rtl .drp-calendar.left .calendar-table{border-left:none;border-top-left-radius:0;border-bottom-left-radius:0}.daterangepicker.rtl .drp-calendar.right{margin-right:0}.daterangepicker.rtl .drp-calendar.right .calendar-table{border-right:none;border-top-right-radius:0;border-bottom-right-radius:0}.daterangepicker.rtl .drp-calendar.left .calendar-table{padding-left:12px}.daterangepicker.rtl .drp-calendar,.daterangepicker.rtl .ranges{text-align:right}}@media (min-width:730px){.daterangepicker .drp-calendar.left{clear:none!important}}.calendars[data-v-1ebd09d2]{display:-webkit-box;display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap}.reportrange-text[data-v-1ebd09d2]{background:#fff;cursor:pointer;padding:5px 10px;border:1px solid #ccc;width:100%;overflow:hidden}.daterangepicker[data-v-1ebd09d2]{-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;display:-webkit-box;display:-ms-flexbox;display:flex;width:auto}@media screen and (max-width:768px){.daterangepicker.show-ranges .drp-calendar.left[data-v-1ebd09d2]{border-left:0}.daterangepicker.show-ranges .ranges[data-v-1ebd09d2]{border-bottom:1px solid #ddd;width:100%}.daterangepicker.show-ranges .ranges[data-v-1ebd09d2] ul{display:-webkit-box;display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap;width:auto}}@media screen and (max-width:541px){.daterangepicker .calendars-container[data-v-1ebd09d2]{-ms-flex-wrap:wrap;flex-wrap:wrap}}@media screen and (min-width:540px){.daterangepicker.show-weeknumbers[data-v-1ebd09d2],.daterangepicker[data-v-1ebd09d2]{min-width:486px}}@media screen and (min-width:768px){.daterangepicker.show-ranges.show-weeknumbers[data-v-1ebd09d2],.daterangepicker.show-ranges[data-v-1ebd09d2]{min-width:682px}}@media screen and (max-width:340px){.daterangepicker.single.show-weeknumbers[data-v-1ebd09d2],.daterangepicker.single[data-v-1ebd09d2]{min-width:250px}}@media screen and (min-width:339px){.daterangepicker.single[data-v-1ebd09d2]{min-width:auto}.daterangepicker.single.show-ranges.show-weeknumbers[data-v-1ebd09d2],.daterangepicker.single.show-ranges[data-v-1ebd09d2]{min-width:356px}.daterangepicker.single.show-ranges .drp-calendar.left[data-v-1ebd09d2]{border-left:1px solid #ddd}.daterangepicker.single.show-ranges .ranges[data-v-1ebd09d2]{max-width:none;-ms-flex-preferred-size:auto;flex-basis:auto;border-bottom:0}.daterangepicker.single.show-ranges .ranges[data-v-1ebd09d2] ul{display:block;width:100%}}.daterangepicker.show-calendar[data-v-1ebd09d2]{display:block;top:auto}.daterangepicker.opensleft[data-v-1ebd09d2]{right:10px;left:auto}.daterangepicker.openscenter[data-v-1ebd09d2]{right:auto;left:50%;-webkit-transform:translate(-50%);transform:translate(-50%)}.daterangepicker.opensright[data-v-1ebd09d2]{left:10px;right:auto}.slide-fade-enter-active[data-v-1ebd09d2]{-webkit-transition:all .2s ease;transition:all .2s ease}.slide-fade-leave-active[data-v-1ebd09d2]{-webkit-transition:all .1s cubic-bezier(1,.5,.8,1);transition:all .1s cubic-bezier(1,.5,.8,1)}.slide-fade-enter[data-v-1ebd09d2],.slide-fade-leave-to[data-v-1ebd09d2]{-webkit-transform:translateX(10px);transform:translateX(10px);opacity:0}.vue-daterange-picker[data-v-1ebd09d2]{position:relative;display:inline-block;min-width:60px}.vue-daterange-picker .show-ranges.hide-calendars[data-v-1ebd09d2]{width:150px;min-width:150px}.inline .daterangepicker[data-v-1ebd09d2]{position:static}.inline .daterangepicker[data-v-1ebd09d2]:after,.inline .daterangepicker[data-v-1ebd09d2]:before{display:none}", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/DeliveryBoy/Orders.vue?vue&type=style&index=0&id=4291351b&scoped=true&lang=css":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/DeliveryBoy/Orders.vue?vue&type=style&index=0&id=4291351b&scoped=true&lang=css ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Orders_vue_vue_type_style_index_0_id_4291351b_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Orders.vue?vue&type=style&index=0&id=4291351b&scoped=true&lang=css */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/DeliveryBoy/Orders.vue?vue&type=style&index=0&id=4291351b&scoped=true&lang=css");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Orders_vue_vue_type_style_index_0_id_4291351b_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Orders_vue_vue_type_style_index_0_id_4291351b_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./resources/js/views/DeliveryBoy/Orders.vue":
/*!***************************************************!*\
  !*** ./resources/js/views/DeliveryBoy/Orders.vue ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Orders_vue_vue_type_template_id_4291351b_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Orders.vue?vue&type=template&id=4291351b&scoped=true */ "./resources/js/views/DeliveryBoy/Orders.vue?vue&type=template&id=4291351b&scoped=true");
/* harmony import */ var _Orders_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Orders.vue?vue&type=script&lang=js */ "./resources/js/views/DeliveryBoy/Orders.vue?vue&type=script&lang=js");
/* harmony import */ var _Orders_vue_vue_type_style_index_0_id_4291351b_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Orders.vue?vue&type=style&index=0&id=4291351b&scoped=true&lang=css */ "./resources/js/views/DeliveryBoy/Orders.vue?vue&type=style&index=0&id=4291351b&scoped=true&lang=css");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _Orders_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _Orders_vue_vue_type_template_id_4291351b_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render,
  _Orders_vue_vue_type_template_id_4291351b_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "4291351b",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/DeliveryBoy/Orders.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/views/DeliveryBoy/Orders.vue?vue&type=script&lang=js":
/*!***************************************************************************!*\
  !*** ./resources/js/views/DeliveryBoy/Orders.vue?vue&type=script&lang=js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Orders_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Orders.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/DeliveryBoy/Orders.vue?vue&type=script&lang=js");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Orders_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/DeliveryBoy/Orders.vue?vue&type=style&index=0&id=4291351b&scoped=true&lang=css":
/*!***********************************************************************************************************!*\
  !*** ./resources/js/views/DeliveryBoy/Orders.vue?vue&type=style&index=0&id=4291351b&scoped=true&lang=css ***!
  \***********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Orders_vue_vue_type_style_index_0_id_4291351b_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/style-loader/dist/cjs.js!../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Orders.vue?vue&type=style&index=0&id=4291351b&scoped=true&lang=css */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/DeliveryBoy/Orders.vue?vue&type=style&index=0&id=4291351b&scoped=true&lang=css");


/***/ }),

/***/ "./resources/js/views/DeliveryBoy/Orders.vue?vue&type=template&id=4291351b&scoped=true":
/*!*********************************************************************************************!*\
  !*** ./resources/js/views/DeliveryBoy/Orders.vue?vue&type=template&id=4291351b&scoped=true ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Orders_vue_vue_type_template_id_4291351b_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   staticRenderFns: () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Orders_vue_vue_type_template_id_4291351b_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Orders_vue_vue_type_template_id_4291351b_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Orders.vue?vue&type=template&id=4291351b&scoped=true */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/DeliveryBoy/Orders.vue?vue&type=template&id=4291351b&scoped=true");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/DeliveryBoy/Orders.vue?vue&type=template&id=4291351b&scoped=true":
/*!************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/DeliveryBoy/Orders.vue?vue&type=template&id=4291351b&scoped=true ***!
  \************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render),
/* harmony export */   staticRenderFns: () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function () {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", [
    _c("div", { staticClass: "page-heading" }, [
      _c("div", { staticClass: "page-title mb-2" }, [
        _c(
          "div",
          {
            staticClass:
              "d-flex flex-wrap justify-content-between align-items-center gap-2",
          },
          [
            _c("h3", { staticClass: "modern-page-title mb-0" }, [
              _vm._v(_vm._s(_vm.__("order_list"))),
            ]),
            _vm._v(" "),
            _c("nav", { attrs: { "aria-label": "breadcrumb" } }, [
              _c("ol", { staticClass: "breadcrumb mb-0" }, [
                _c(
                  "li",
                  { staticClass: "breadcrumb-item" },
                  [
                    _c(
                      "router-link",
                      {
                        staticClass: "text-muted",
                        attrs: { to: "/delivery_boy" },
                      },
                      [_vm._v(_vm._s(_vm.__("dashboard")))]
                    ),
                  ],
                  1
                ),
                _vm._v(" "),
                _c(
                  "li",
                  {
                    staticClass: "breadcrumb-item active text-primary",
                    attrs: { "aria-current": "page" },
                  },
                  [_vm._v(_vm._s(_vm.__("order_list")))]
                ),
              ]),
            ]),
          ]
        ),
      ]),
      _vm._v(" "),
      _c("section", { staticClass: "section" }, [
        _c("div", { staticClass: "figma-main-section-card" }, [
          _c(
            "div",
            { staticClass: "card-body p-0" },
            [
              _c(
                "div",
                {
                  staticClass:
                    "d-flex justify-content-between align-items-center flex-wrap gap-2 figma-action-bar-row",
                },
                [
                  _c("div", { staticClass: "flex-grow-1" }, [
                    _c("div", { staticClass: "figma-search-container" }, [
                      _c("i", { staticClass: "fa fa-search text-muted" }),
                      _vm._v(" "),
                      _c("input", {
                        directives: [
                          {
                            name: "model",
                            rawName: "v-model",
                            value: _vm.search,
                            expression: "search",
                          },
                        ],
                        staticClass: "figma-search-input",
                        attrs: {
                          type: "text",
                          placeholder: _vm.__("search") || "Search orders...",
                        },
                        domProps: { value: _vm.search },
                        on: {
                          input: [
                            function ($event) {
                              if ($event.target.composing) {
                                return
                              }
                              _vm.search = $event.target.value
                            },
                            function ($event) {
                              return _vm.handleFilterChange()
                            },
                          ],
                        },
                      }),
                    ]),
                  ]),
                  _vm._v(" "),
                  _c(
                    "div",
                    { staticClass: "d-flex gap-2" },
                    [
                      _c(
                        "button",
                        {
                          staticClass:
                            "btn btn-figma-filter d-flex align-items-center gap-2",
                          class: { active: _vm.showFilters },
                          on: {
                            click: function ($event) {
                              _vm.showFilters = !_vm.showFilters
                            },
                          },
                        },
                        [
                          _c("base-icon", {
                            attrs: {
                              name: "Funnel",
                              width: "16",
                              height: "16",
                              useCurrentColor: "",
                            },
                          }),
                          _vm._v(" "),
                          _c("span", [
                            _vm._v(_vm._s(_vm.__("filters") || "Filters")),
                          ]),
                          _vm._v(" "),
                          _c("i", {
                            staticClass: "bi ms-1",
                            class: _vm.showFilters
                              ? "bi-chevron-up"
                              : "bi-chevron-down",
                          }),
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "b-dropdown",
                        {
                          directives: [
                            {
                              name: "b-tooltip",
                              rawName: "v-b-tooltip.hover",
                              modifiers: { hover: true },
                            },
                          ],
                          attrs: {
                            variant: "figma-columns",
                            "no-caret": "",
                            "toggle-class":
                              "btn-figma-columns d-flex align-items-center gap-2",
                            title: _vm.__("columns"),
                          },
                          scopedSlots: _vm._u([
                            {
                              key: "button-content",
                              fn: function () {
                                return [
                                  _c("i", { staticClass: "fa fa-th-list" }),
                                  _vm._v(" "),
                                  _c("span", [
                                    _vm._v(_vm._s(_vm.__("columns"))),
                                  ]),
                                ]
                              },
                              proxy: true,
                            },
                          ]),
                        },
                        [
                          _vm._v(" "),
                          _c(
                            "b-dropdown-form",
                            {
                              staticClass: "p-2",
                              staticStyle: {
                                "min-width": "200px",
                                "max-height": "300px",
                                "overflow-y": "auto",
                              },
                            },
                            _vm._l(_vm.orderFields, function (field) {
                              return _c(
                                "div",
                                {
                                  key: field.key,
                                  staticClass: "form-check mb-2",
                                },
                                [
                                  _c("input", {
                                    staticClass: "form-check-input",
                                    attrs: {
                                      type: "checkbox",
                                      id: "col-" + field.key,
                                    },
                                    domProps: { checked: !field.hidden },
                                    on: {
                                      change: function ($event) {
                                        return _vm.toggleColumnVisibility(field)
                                      },
                                    },
                                  }),
                                  _vm._v(" "),
                                  _c(
                                    "label",
                                    {
                                      staticClass: "form-check-label ms-2",
                                      attrs: { for: "col-" + field.key },
                                    },
                                    [_vm._v(_vm._s(field.label))]
                                  ),
                                ]
                              )
                            }),
                            0
                          ),
                        ],
                        1
                      ),
                    ],
                    1
                  ),
                ]
              ),
              _vm._v(" "),
              _c(
                "b-collapse",
                {
                  model: {
                    value: _vm.showFilters,
                    callback: function ($$v) {
                      _vm.showFilters = $$v
                    },
                    expression: "showFilters",
                  },
                },
                [
                  _c("div", { staticClass: "figma-filter-section" }, [
                    _c("div", { staticClass: "row g-4" }, [
                      _c("div", { staticClass: "col-md-4" }, [
                        _c("div", { staticClass: "figma-filter-group" }, [
                          _c("label", { staticClass: "figma-filter-label" }, [
                            _vm._v(_vm._s(_vm.__("from_and_to_date"))),
                          ]),
                          _vm._v(" "),
                          _c(
                            "div",
                            { staticClass: "modern-datepicker-container" },
                            [
                              _c("date-range-picker", {
                                staticClass: "w-100",
                                attrs: {
                                  autoApply: false,
                                  showDropdowns: true,
                                  maxDate: _vm.maxDate,
                                  "locale-data": _vm.dateRangePickerLocale,
                                  ranges: _vm.dateRangePickerRanges,
                                  "append-to-body": true,
                                  opens: "right",
                                },
                                on: { update: _vm.handleFilterChange },
                                model: {
                                  value: _vm.dateRange,
                                  callback: function ($$v) {
                                    _vm.dateRange = $$v
                                  },
                                  expression: "dateRange",
                                },
                              }),
                            ],
                            1
                          ),
                        ]),
                      ]),
                      _vm._v(" "),
                      _c("div", { staticClass: "col-md-4" }, [
                        _c("div", { staticClass: "figma-filter-group" }, [
                          _c("label", { staticClass: "figma-filter-label" }, [
                            _vm._v(_vm._s(_vm.__("from_and_to_delivery_date"))),
                          ]),
                          _vm._v(" "),
                          _c(
                            "div",
                            { staticClass: "modern-datepicker-container" },
                            [
                              _c("date-range-picker", {
                                staticClass: "w-100",
                                attrs: {
                                  autoApply: false,
                                  showDropdowns: true,
                                  maxDate: _vm.maxDate,
                                  "locale-data": _vm.dateRangePickerLocale,
                                  ranges: _vm.dateRangePickerRanges,
                                  "append-to-body": true,
                                  opens: "left",
                                },
                                on: { update: _vm.handleFilterChange },
                                model: {
                                  value: _vm.deliveryDateRange,
                                  callback: function ($$v) {
                                    _vm.deliveryDateRange = $$v
                                  },
                                  expression: "deliveryDateRange",
                                },
                              }),
                            ],
                            1
                          ),
                        ]),
                      ]),
                      _vm._v(" "),
                      _c("div", { staticClass: "col-md-4" }, [
                        _c("div", { staticClass: "figma-filter-group" }, [
                          _c("label", { staticClass: "figma-filter-label" }, [
                            _vm._v(_vm._s(_vm.__("status"))),
                          ]),
                          _vm._v(" "),
                          _c(
                            "select",
                            {
                              directives: [
                                {
                                  name: "model",
                                  rawName: "v-model",
                                  value: _vm.status,
                                  expression: "status",
                                },
                              ],
                              staticClass: "form-select modern-select",
                              on: {
                                change: [
                                  function ($event) {
                                    var $$selectedVal = Array.prototype.filter
                                      .call(
                                        $event.target.options,
                                        function (o) {
                                          return o.selected
                                        }
                                      )
                                      .map(function (o) {
                                        var val =
                                          "_value" in o ? o._value : o.value
                                        return val
                                      })
                                    _vm.status = $event.target.multiple
                                      ? $$selectedVal
                                      : $$selectedVal[0]
                                  },
                                  function ($event) {
                                    return _vm.handleFilterChange()
                                  },
                                ],
                              },
                            },
                            [
                              _c("option", { attrs: { value: "" } }, [
                                _vm._v(_vm._s(_vm.__("all_orders"))),
                              ]),
                              _vm._v(" "),
                              _vm._l(_vm.statuses, function (s) {
                                return _c(
                                  "option",
                                  { key: s.id, domProps: { value: s.id } },
                                  [_vm._v(_vm._s(_vm.getStatusDisplayName(s)))]
                                )
                              }),
                            ],
                            2
                          ),
                        ]),
                      ]),
                    ]),
                  ]),
                ]
              ),
              _vm._v(" "),
              _c(
                "div",
                { staticClass: "table-responsive mb-0" },
                [
                  _c("b-table", {
                    staticClass: "figma-order-table mb-0",
                    attrs: {
                      items: _vm.orders,
                      fields: _vm.visibleFields,
                      "current-page": _vm.currentPage,
                      "per-page": _vm.perPage,
                      "filter-included-fields": _vm.filterOn,
                      "sort-by": _vm.sortBy,
                      "sort-desc": _vm.sortDesc,
                      "sort-direction": _vm.sortDirection,
                      bordered: false,
                      busy: _vm.isLoading,
                      stacked: "md",
                      "show-empty": "",
                      "show-details": "",
                      "tbody-tr-class": function () {
                        return "figma-tr align-middle"
                      },
                      small: "",
                    },
                    on: {
                      "update:sortBy": function ($event) {
                        _vm.sortBy = $event
                      },
                      "update:sort-by": function ($event) {
                        _vm.sortBy = $event
                      },
                      "update:sortDesc": function ($event) {
                        _vm.sortDesc = $event
                      },
                      "update:sort-desc": function ($event) {
                        _vm.sortDesc = $event
                      },
                    },
                    scopedSlots: _vm._u([
                      {
                        key: "empty",
                        fn: function (scope) {
                          return [
                            _c(
                              "div",
                              { staticClass: "text-center text-muted py-4" },
                              [
                                _c("i", {
                                  staticClass: "fa fa-inbox fa-2x d-block mb-2",
                                }),
                                _vm._v(_vm._s(scope.emptyText)),
                              ]
                            ),
                          ]
                        },
                      },
                      {
                        key: "emptyfiltered",
                        fn: function (scope) {
                          return [
                            _c(
                              "div",
                              { staticClass: "text-center text-muted py-4" },
                              [
                                _c("i", {
                                  staticClass:
                                    "fa fa-search fa-2x d-block mb-2",
                                }),
                                _vm._v(_vm._s(scope.emptyFilteredText)),
                              ]
                            ),
                          ]
                        },
                      },
                      {
                        key: "table-busy",
                        fn: function () {
                          return [
                            _c(
                              "div",
                              { staticClass: "text-center py-4" },
                              [
                                _c("b-spinner", {
                                  staticClass: "align-middle",
                                  attrs: { variant: "dark" },
                                }),
                              ],
                              1
                            ),
                          ]
                        },
                        proxy: true,
                      },
                      {
                        key: "cell(id)",
                        fn: function (row) {
                          return [
                            _c(
                              "div",
                              {
                                staticClass: "d-flex align-items-center gap-2",
                              },
                              [
                                _c("i", {
                                  class: row.detailsShowing
                                    ? "fa fa-chevron-down"
                                    : "fa fa-chevron-right",
                                  staticStyle: {
                                    cursor: "pointer",
                                    "font-size": "0.7rem",
                                    color: "var(--theme-neutral-400)",
                                  },
                                  on: {
                                    click: function ($event) {
                                      return _vm.toggleOrder(row)
                                    },
                                  },
                                }),
                                _vm._v(" "),
                                _c("span", { staticClass: "figma-link-blue" }, [
                                  _vm._v("#" + _vm._s(row.item.id)),
                                ]),
                              ]
                            ),
                          ]
                        },
                      },
                      {
                        key: "cell(user_name)",
                        fn: function (row) {
                          return [
                            _c("div", { staticClass: "d-flex flex-column" }, [
                              _c(
                                "span",
                                { staticClass: "figma-customer-name" },
                                [_vm._v(_vm._s(row.item.user_name))]
                              ),
                              _vm._v(" "),
                              _c(
                                "span",
                                { staticClass: "figma-customer-email" },
                                [
                                  _vm._v(
                                    _vm._s(
                                      _vm._f("mobileMask")(row.item.mobile)
                                    )
                                  ),
                                ]
                              ),
                            ]),
                          ]
                        },
                      },
                      {
                        key: "cell(total)",
                        fn: function (row) {
                          return [
                            _c("div", { staticClass: "d-flex flex-column" }, [
                              _c(
                                "span",
                                { staticClass: "figma-amount-bold text-dark" },
                                [
                                  _vm._v(
                                    _vm._s(_vm.$currency) +
                                      _vm._s(row.item.total)
                                  ),
                                ]
                              ),
                              _vm._v(" "),
                              _c(
                                "span",
                                { staticClass: "figma-text-muted small" },
                                [_vm._v(_vm._s(row.item.payment_method))]
                              ),
                            ]),
                          ]
                        },
                      },
                      {
                        key: "cell(delivery_time)",
                        fn: function (row) {
                          return [
                            _c("div", { staticClass: "d-flex flex-column" }, [
                              _c("span", { staticClass: "figma-date-bold" }, [
                                _vm._v(
                                  _vm._s(
                                    _vm.formatDateBold(
                                      row.item.created_at ||
                                        row.item.delivery_time
                                    )
                                  )
                                ),
                              ]),
                              _vm._v(" "),
                              _c("span", { staticClass: "figma-time-light" }, [
                                _vm._v(
                                  _vm._s(
                                    _vm.getPeriodLabel(
                                      row.item.created_at ||
                                        row.item.delivery_time
                                    )
                                  ) +
                                    ", " +
                                    _vm._s(
                                      _vm.formatTimeLight(
                                        row.item.created_at ||
                                          row.item.delivery_time
                                      )
                                    )
                                ),
                              ]),
                            ]),
                          ]
                        },
                      },
                      {
                        key: "cell(active_status)",
                        fn: function (row) {
                          return [
                            _c(
                              "span",
                              {
                                staticClass: "figma-status-pill",
                                class: _vm.getStatusBadgeClass(
                                  row.item.active_status
                                ),
                              },
                              [
                                _vm._v(
                                  "\n                                " +
                                    _vm._s(
                                      _vm.getStatusLabelById(
                                        row.item.active_status
                                      )
                                    ) +
                                    "\n                            "
                                ),
                              ]
                            ),
                          ]
                        },
                      },
                      {
                        key: "cell(actions)",
                        fn: function (row) {
                          return [
                            _c(
                              "div",
                              {
                                staticClass:
                                  "d-flex gap-2 justify-content-center",
                              },
                              [
                                _c(
                                  "router-link",
                                  {
                                    staticClass: "figma-action-btn",
                                    attrs: {
                                      to: {
                                        name: "DeliveryBoyOrder",
                                        params: {
                                          id: row.item.id,
                                          record: row.item,
                                        },
                                      },
                                    },
                                  },
                                  [_c("i", { staticClass: "bi bi-eye" })]
                                ),
                              ],
                              1
                            ),
                          ]
                        },
                      },
                      {
                        key: "row-details",
                        fn: function (row) {
                          return [
                            _c(
                              "div",
                              {
                                staticClass:
                                  "bg-light p-4 rounded-bottom-4 border-top",
                              },
                              [
                                row.item.itemsLoading
                                  ? _c(
                                      "div",
                                      { staticClass: "text-center py-3" },
                                      [
                                        _c("b-spinner", {
                                          attrs: { label: "Spinning" },
                                        }),
                                      ],
                                      1
                                    )
                                  : _c(
                                      "div",
                                      { staticClass: "table-responsive" },
                                      [
                                        _c(
                                          "table",
                                          {
                                            staticClass: "table table-sm mb-0",
                                          },
                                          [
                                            _c(
                                              "thead",
                                              { staticClass: "table-light" },
                                              [
                                                _c("tr", [
                                                  _c("th", [
                                                    _vm._v(
                                                      _vm._s(_vm.__("product"))
                                                    ),
                                                  ]),
                                                  _vm._v(" "),
                                                  _c("th", [
                                                    _vm._v(
                                                      _vm._s(_vm.__("image"))
                                                    ),
                                                  ]),
                                                  _vm._v(" "),
                                                  _c("th", [
                                                    _vm._v(
                                                      _vm._s(_vm.__("variant"))
                                                    ),
                                                  ]),
                                                  _vm._v(" "),
                                                  _c("th", [
                                                    _vm._v(
                                                      _vm._s(_vm.__("qty"))
                                                    ),
                                                  ]),
                                                  _vm._v(" "),
                                                  _c("th", [
                                                    _vm._v(
                                                      _vm._s(_vm.__("subtotal"))
                                                    ),
                                                  ]),
                                                  _vm._v(" "),
                                                  _c("th", [
                                                    _vm._v(
                                                      _vm._s(_vm.__("status"))
                                                    ),
                                                  ]),
                                                ]),
                                              ]
                                            ),
                                            _vm._v(" "),
                                            _c(
                                              "tbody",
                                              [
                                                _vm._l(
                                                  row.item.order_items,
                                                  function (item) {
                                                    return _c(
                                                      "tr",
                                                      { key: item.id },
                                                      [
                                                        _c("td", [
                                                          _vm._v(
                                                            _vm._s(
                                                              item.product_name
                                                            )
                                                          ),
                                                        ]),
                                                        _vm._v(" "),
                                                        _c("td", [
                                                          _c("img", {
                                                            staticClass:
                                                              "rounded",
                                                            attrs: {
                                                              src: item.image,
                                                              alt: "",
                                                              height: "40",
                                                            },
                                                          }),
                                                        ]),
                                                        _vm._v(" "),
                                                        _c("td", [
                                                          _vm._v(
                                                            _vm._s(
                                                              item.variant_name
                                                            )
                                                          ),
                                                        ]),
                                                        _vm._v(" "),
                                                        _c("td", [
                                                          _vm._v(
                                                            _vm._s(
                                                              item.quantity
                                                            )
                                                          ),
                                                        ]),
                                                        _vm._v(" "),
                                                        _c("td", [
                                                          _vm._v(
                                                            _vm._s(
                                                              _vm.$currency
                                                            ) +
                                                              " " +
                                                              _vm._s(
                                                                item.sub_total
                                                              )
                                                          ),
                                                        ]),
                                                        _vm._v(" "),
                                                        _c("td", [
                                                          _vm._v(
                                                            _vm._s(
                                                              item.status_name
                                                            )
                                                          ),
                                                        ]),
                                                      ]
                                                    )
                                                  }
                                                ),
                                                _vm._v(" "),
                                                !row.item.order_items ||
                                                row.item.order_items.length ===
                                                  0
                                                  ? _c("tr", [
                                                      _c(
                                                        "td",
                                                        {
                                                          staticClass:
                                                            "text-center text-muted py-3",
                                                          attrs: {
                                                            colspan: "6",
                                                          },
                                                        },
                                                        [
                                                          _vm._v(
                                                            _vm._s(
                                                              _vm.__(
                                                                "no_products_found"
                                                              )
                                                            )
                                                          ),
                                                        ]
                                                      ),
                                                    ])
                                                  : _vm._e(),
                                              ],
                                              2
                                            ),
                                          ]
                                        ),
                                      ]
                                    ),
                              ]
                            ),
                          ]
                        },
                      },
                    ]),
                  }),
                ],
                1
              ),
              _vm._v(" "),
              _c("div", { staticClass: "figma-table-footer flex-wrap gap-3" }, [
                _c(
                  "div",
                  { staticClass: "d-flex align-items-center flex-wrap gap-3" },
                  [
                    _c(
                      "div",
                      { staticClass: "d-flex align-items-center gap-2" },
                      [
                        _c(
                          "label",
                          { staticClass: "showing-results-text mb-0" },
                          [_vm._v(_vm._s(_vm.__("per_page")))]
                        ),
                        _vm._v(" "),
                        _c("b-form-select", {
                          staticClass: "w-auto",
                          attrs: { options: _vm.pageOptions, size: "sm" },
                          on: {
                            change: function ($event) {
                              _vm.currentPage = 1
                            },
                          },
                          model: {
                            value: _vm.perPage,
                            callback: function ($$v) {
                              _vm.perPage = $$v
                            },
                            expression: "perPage",
                          },
                        }),
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _c("table-count", {
                      attrs: {
                        "current-page": _vm.currentPage,
                        "per-page": _vm.perPage,
                        "total-rows": _vm.totalOrderRows,
                      },
                    }),
                    _vm._v(" "),
                    _c(
                      "div",
                      {
                        staticClass:
                          "d-flex flex-wrap gap-3 figma-footer-totals",
                      },
                      [
                        _c("span", [
                          _vm._v(_vm._s(_vm.__("total_amount")) + ": "),
                          _c("strong", [
                            _vm._v(
                              _vm._s(_vm.$currency) +
                                " " +
                                _vm._s(_vm.total_amount)
                            ),
                          ]),
                        ]),
                        _vm._v(" "),
                        _c("span", [
                          _vm._v(_vm._s(_vm.__("total_dchrg")) + ": "),
                          _c("strong", [
                            _vm._v(
                              _vm._s(_vm.$currency) +
                                " " +
                                _vm._s(_vm.delivery_charge)
                            ),
                          ]),
                        ]),
                        _vm._v(" "),
                        _c("span", [
                          _vm._v(_vm._s(_vm.__("total_final_amount")) + ": "),
                          _c("strong", [
                            _vm._v(
                              _vm._s(_vm.$currency) +
                                " " +
                                _vm._s(_vm.remaining_final)
                            ),
                          ]),
                        ]),
                      ]
                    ),
                  ],
                  1
                ),
                _vm._v(" "),
                _c(
                  "div",
                  { staticClass: "d-flex align-items-center gap-3" },
                  [
                    _c("b-pagination", {
                      staticClass: "figma-pagination mb-0",
                      attrs: {
                        "total-rows": _vm.totalOrderRows,
                        "per-page": _vm.perPage,
                        align: "right",
                      },
                      model: {
                        value: _vm.currentPage,
                        callback: function ($$v) {
                          _vm.currentPage = $$v
                        },
                        expression: "currentPage",
                      },
                    }),
                  ],
                  1
                ),
              ]),
            ],
            1
          ),
        ]),
      ]),
    ]),
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ })

}]);