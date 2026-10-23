"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_views_DeliveryBoy_Dashboard_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/DeliveryBoy/Dashboard.vue?vue&type=script&lang=js":
/*!**********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/DeliveryBoy/Dashboard.vue?vue&type=script&lang=js ***!
  \**********************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var vue2_daterange_picker__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue2-daterange-picker */ "./node_modules/vue2-daterange-picker/dist/vue2-daterange-picker.umd.min.js");
/* harmony import */ var vue2_daterange_picker__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue2_daterange_picker__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _mixins_DateRangePickerMixin__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../mixins/DateRangePickerMixin */ "./resources/js/mixins/DateRangePickerMixin.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_3__);
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





/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: "range_dates",
  mixins: [_mixins_DateRangePickerMixin__WEBPACK_IMPORTED_MODULE_1__["default"]],
  components: {
    DateRangePicker: (vue2_daterange_picker__WEBPACK_IMPORTED_MODULE_0___default())
  },
  data: function data() {
    var startDate = new Date();
    var endDate = new Date();
    startDate.setDate(startDate.getDate() - 30);
    return {
      dateRange: {
        startDate: startDate,
        endDate: endDate
      },
      deliveryDateRange: {
        startDate: null,
        endDate: null
      },
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
      orderFields: [{
        key: 'id',
        label: __('order_id'),
        sortable: true,
        sortDirection: 'desc'
      }, {
        key: 'user_name',
        label: __('user'),
        sortable: true
      }, {
        key: 'mobile',
        label: __('mobile'),
        sortable: true
      }, {
        key: 'total',
        label: __('total'),
        sortable: true
      }, {
        key: 'delivery_charge',
        label: __('dcharges'),
        sortable: true
      }, {
        key: 'remaining_final',
        label: __('ftotal'),
        sortable: true
      }, {
        key: 'payment_method',
        label: __('p_method'),
        sortable: true
      }, {
        key: 'delivery_time',
        label: __('d_time'),
        sortable: true
      }, {
        key: "actions",
        label: __('actions')
      }],
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
      status: ""
    };
  },
  computed: {
    welcomeName: function welcomeName() {
      // Same source as the header's user menu (Auth.js stores the signed-in user here).
      try {
        var user = JSON.parse(window.localStorage.getItem('user') || 'null');
        if (user) return user.username || user.name || '';
      } catch (e) {}
      return '';
    },
    greetingMessage: function greetingMessage() {
      var hour = new Date().getHours();
      if (hour < 12) return this.__('Good morning');
      if (hour < 17) return this.__('Good afternoon');
      return this.__('Good evening');
    },
    welcomeDate: function welcomeDate() {
      return moment__WEBPACK_IMPORTED_MODULE_3___default()().format('DD MMM YYYY');
    },
    sortOptions: function sortOptions() {
      // Create an options list from our fields
      return this.fields.filter(function (f) {
        return f.sortable;
      }).map(function (f) {
        return {
          text: f.label,
          value: f.key
        };
      });
    },
    orderPageStart: function orderPageStart() {
      if (this.orderTotalRows === 0) return 0;
      return (this.orderCurrentPage - 1) * this.orderPerPage + 1;
    },
    orderTotalPages: function orderTotalPages() {
      return Math.ceil(this.orderTotalRows / this.orderPerPage);
    },
    summaryStats: function summaryStats() {
      return [{
        label: this.__('orders'),
        value: this.record.order_count,
        url: '/delivery_boy/orders',
        icon: 'Total order',
        isSvg: true,
        bgClass: 'bg-stat-blue'
      }, {
        label: this.__('return_requests') || 'Returns',
        value: this.record.return_requests || 0,
        url: '/delivery_boy/return_requests',
        icon: 'total return',
        isSvg: true,
        bgClass: 'bg-stat-purple'
      }, {
        label: this.__('balance'),
        value: this.$currency + " " + this.record.balance,
        url: null,
        icon: 'total rev',
        isSvg: true,
        bgClass: 'bg-stat-green'
      }];
    }
  },
  mounted: function mounted() {
    // Set the initial number of items
    this.orderTotalRows = this.orders.length;
  },
  created: function created() {
    this.getRecord();
    this.getOrderStatus();
    this.getLatestOrders();
  },
  methods: {
    getRecord: function getRecord() {
      var _this = this;
      var vm = this;
      this.isLoading = true;
      axios__WEBPACK_IMPORTED_MODULE_2___default().get(this.$deliveryBoyApiUrl + '/dashboard').then(function (res) {
        vm.isLoading = false;
        var data = res.data;
        if (data.status === 1) {
          _this.record = data.data;
        }
      })["catch"](function (error) {
        vm.isLoading = false;
        if (error.request.statusText) {
          _this.showError(error.request.statusText);
        } else if (error.message) {
          _this.showError(error.message);
        } else {
          _this.showError(__('something_went_wrong'));
        }
      });
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
    getOrderStatus: function getOrderStatus() {
      var _this2 = this;
      var vm = this;
      axios__WEBPACK_IMPORTED_MODULE_2___default().get(this.$apiUrl + '/order_statuses').then(function (response) {
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
    getLatestOrders: function getLatestOrders() {
      var _this3 = this;
      this.isLoading = true;
      var vm = this;
      var param = {
        "startDate": this.dateRange.startDate != null ? moment__WEBPACK_IMPORTED_MODULE_3___default()(this.dateRange.startDate).format('YYYY-MM-DD') : "",
        "endDate": this.dateRange.endDate != null ? moment__WEBPACK_IMPORTED_MODULE_3___default()(this.dateRange.endDate).format('YYYY-MM-DD') : "",
        "status": this.status,
        startDeliveryDate: this.deliveryDateRange.startDate ? moment__WEBPACK_IMPORTED_MODULE_3___default()(this.deliveryDateRange.startDate).format('YYYY-MM-DD') : '',
        endDeliveryDate: this.deliveryDateRange.endDate ? moment__WEBPACK_IMPORTED_MODULE_3___default()(this.deliveryDateRange.endDate).format('YYYY-MM-DD') : ''
      };
      axios__WEBPACK_IMPORTED_MODULE_2___default().get(this.$deliveryBoyApiUrl + '/orders', {
        params: param
      }).then(function (response) {
        var data = response.data;
        if (data.status === 1) {
          _this3.orders = response.data.data.orders;
          _this3.orderTotalRows = _this3.orders.length;
          _this3.isLoading = false;
        }
      })["catch"](function (error) {
        vm.isLoading = false;
        if (error.request.statusText) {
          _this3.showError(error.request.statusText);
        } else if (error.message) {
          _this3.showError(error.message);
        } else {
          _this3.showError(__('something_went_wrong'));
        }
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

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/DeliveryBoy/Dashboard.vue?vue&type=style&index=0&id=1bff0764&scoped=true&lang=css":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/DeliveryBoy/Dashboard.vue?vue&type=style&index=0&id=1bff0764&scoped=true&lang=css ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
___CSS_LOADER_EXPORT___.push([module.id, "\n.vue-daterange-picker[data-v-1ebd09d2][data-v-1bff0764] {\n    min-width: 80%;\n}\n@media only screen and (min-width: 600px) {\n.vue-daterange-picker[data-v-1ebd09d2][data-v-1bff0764] {\n        min-width: 90%;\n}\n}\n.btn_product_count[data-v-1bff0764] {\n    margin-bottom: 10px;\n}\n.view-order-btn[data-v-1bff0764] {\n    display: inline-flex;\n    align-items: center;\n    font-size: 13px;\n    font-weight: 600;\n}\n.db-kpi-tile[data-v-1bff0764] {\n    color: inherit;\n}\n\n/* Latest orders: the table keeps its columns and scrolls inside the card on narrow screens */\n.dash-orders-scroll[data-v-1bff0764] {\n    overflow-x: auto;\n    -webkit-overflow-scrolling: touch;\n}\n.dash-orders-scroll .figma-order-table[data-v-1bff0764] {\n    min-width: 880px;\n}\n.dash-orders-scroll .figma-order-table td[data-v-1bff0764],\n.dash-orders-scroll .figma-order-table th[data-v-1bff0764] {\n    white-space: nowrap;\n}\n.db-status-row[data-v-1bff0764] {\n    display: flex;\n    align-items: center;\n    gap: 10px;\n    padding: 12px 0;\n    border-bottom: 1px solid var(--ui-border);\n    font-size: 13px;\n}\n.db-status-row[data-v-1bff0764]:last-child {\n    border-bottom: 0;\n}\n.db-status-dot[data-v-1bff0764] {\n    width: 10px;\n    height: 10px;\n    border-radius: 50%;\n    flex-shrink: 0;\n}\n.db-status-dot--warn[data-v-1bff0764] { background: var(--theme-warn-500);\n}\n.db-status-dot--success[data-v-1bff0764] { background: var(--theme-success-500);\n}\n.db-status-dot--error[data-v-1bff0764] { background: var(--theme-error-500);\n}\n.db-status-label[data-v-1bff0764] {\n    flex: 1 1 auto;\n    color: var(--ui-text);\n}\n.db-status-value[data-v-1bff0764] {\n    font-weight: 700;\n    color: var(--ui-heading);\n}\n.db-wallet-tile[data-v-1bff0764] {\n    display: flex;\n    flex-direction: column;\n    gap: 4px;\n    height: 100%;\n    padding: 14px 16px;\n    border: 1px solid var(--ui-border);\n    border-radius: var(--ui-radius);\n    background: var(--ui-surface-muted);\n}\n.db-wallet-value[data-v-1bff0764] {\n    font-size: 18px;\n    font-weight: 700;\n    color: var(--ui-heading);\n    overflow-wrap: anywhere;\n}\n\n/* Phones only: Balance and Cash In Hand stack full width so the amount stays on one line.\n   Tablet and desktop keep the original two-column tiles. */\n@media (max-width: 575.98px) {\n.db-wallet-col[data-v-1bff0764] {\n        flex: 0 0 100%;\n        max-width: 100%;\n}\n.db-wallet-tile[data-v-1bff0764] {\n        height: auto;\n}\n.db-wallet-value[data-v-1bff0764] {\n        font-size: 20px;\n        white-space: nowrap;\n        overflow-wrap: normal;\n}\n}\n\n", ""]);
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

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/DeliveryBoy/Dashboard.vue?vue&type=style&index=0&id=1bff0764&scoped=true&lang=css":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/DeliveryBoy/Dashboard.vue?vue&type=style&index=0&id=1bff0764&scoped=true&lang=css ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Dashboard_vue_vue_type_style_index_0_id_1bff0764_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Dashboard.vue?vue&type=style&index=0&id=1bff0764&scoped=true&lang=css */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/DeliveryBoy/Dashboard.vue?vue&type=style&index=0&id=1bff0764&scoped=true&lang=css");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Dashboard_vue_vue_type_style_index_0_id_1bff0764_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Dashboard_vue_vue_type_style_index_0_id_1bff0764_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./resources/js/views/DeliveryBoy/Dashboard.vue":
/*!******************************************************!*\
  !*** ./resources/js/views/DeliveryBoy/Dashboard.vue ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Dashboard_vue_vue_type_template_id_1bff0764_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Dashboard.vue?vue&type=template&id=1bff0764&scoped=true */ "./resources/js/views/DeliveryBoy/Dashboard.vue?vue&type=template&id=1bff0764&scoped=true");
/* harmony import */ var _Dashboard_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Dashboard.vue?vue&type=script&lang=js */ "./resources/js/views/DeliveryBoy/Dashboard.vue?vue&type=script&lang=js");
/* harmony import */ var _Dashboard_vue_vue_type_style_index_0_id_1bff0764_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Dashboard.vue?vue&type=style&index=0&id=1bff0764&scoped=true&lang=css */ "./resources/js/views/DeliveryBoy/Dashboard.vue?vue&type=style&index=0&id=1bff0764&scoped=true&lang=css");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _Dashboard_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _Dashboard_vue_vue_type_template_id_1bff0764_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render,
  _Dashboard_vue_vue_type_template_id_1bff0764_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "1bff0764",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/DeliveryBoy/Dashboard.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/views/DeliveryBoy/Dashboard.vue?vue&type=script&lang=js":
/*!******************************************************************************!*\
  !*** ./resources/js/views/DeliveryBoy/Dashboard.vue?vue&type=script&lang=js ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Dashboard_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Dashboard.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/DeliveryBoy/Dashboard.vue?vue&type=script&lang=js");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Dashboard_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/DeliveryBoy/Dashboard.vue?vue&type=style&index=0&id=1bff0764&scoped=true&lang=css":
/*!**************************************************************************************************************!*\
  !*** ./resources/js/views/DeliveryBoy/Dashboard.vue?vue&type=style&index=0&id=1bff0764&scoped=true&lang=css ***!
  \**************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Dashboard_vue_vue_type_style_index_0_id_1bff0764_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/style-loader/dist/cjs.js!../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Dashboard.vue?vue&type=style&index=0&id=1bff0764&scoped=true&lang=css */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/DeliveryBoy/Dashboard.vue?vue&type=style&index=0&id=1bff0764&scoped=true&lang=css");


/***/ }),

/***/ "./resources/js/views/DeliveryBoy/Dashboard.vue?vue&type=template&id=1bff0764&scoped=true":
/*!************************************************************************************************!*\
  !*** ./resources/js/views/DeliveryBoy/Dashboard.vue?vue&type=template&id=1bff0764&scoped=true ***!
  \************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Dashboard_vue_vue_type_template_id_1bff0764_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   staticRenderFns: () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Dashboard_vue_vue_type_template_id_1bff0764_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Dashboard_vue_vue_type_template_id_1bff0764_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Dashboard.vue?vue&type=template&id=1bff0764&scoped=true */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/DeliveryBoy/Dashboard.vue?vue&type=template&id=1bff0764&scoped=true");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/DeliveryBoy/Dashboard.vue?vue&type=template&id=1bff0764&scoped=true":
/*!***************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/DeliveryBoy/Dashboard.vue?vue&type=template&id=1bff0764&scoped=true ***!
  \***************************************************************************************************************************************************************************************************************************************/
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
    _c("div", { staticClass: "page-heading mb-4" }, [
      _c(
        "h2",
        { staticClass: "h4 font-weight-bold text-dark mb-1" },
        [
          _vm._v(_vm._s(_vm.__("Welcome"))),
          _vm.welcomeName ? [_vm._v(", " + _vm._s(_vm.welcomeName))] : _vm._e(),
        ],
        2
      ),
      _vm._v(" "),
      _c("p", { staticClass: "text-muted small mb-0" }, [
        _vm._v(_vm._s(_vm.greetingMessage) + " • " + _vm._s(_vm.welcomeDate)),
      ]),
    ]),
    _vm._v(" "),
    _c("div", { staticClass: "page-content" }, [
      _c("section", [
        _c(
          "div",
          { staticClass: "row g-3 mb-4" },
          _vm._l(_vm.summaryStats, function (stat, index) {
            return _c(
              "div",
              {
                key: index,
                staticClass: "col-6 col-md-4 db-kpi-col",
                class: {
                  "db-kpi-col--wide":
                    index === _vm.summaryStats.length - 1 &&
                    _vm.summaryStats.length % 2 === 1,
                },
              },
              [
                _c(
                  stat.url ? "router-link" : "div",
                  {
                    tag: "component",
                    staticClass:
                      "figma-kpi-card-v2 db-kpi-tile text-decoration-none d-block w-100 h-100",
                    attrs: { to: stat.url },
                  },
                  [
                    _c(
                      "div",
                      { staticClass: "d-flex align-items-center gap-3" },
                      [
                        _c(
                          "div",
                          {
                            staticClass: "figma-stat-icon-box flex-shrink-0",
                            class: stat.bgClass,
                          },
                          [
                            stat.isSvg
                              ? [
                                  _c("base-icon", {
                                    staticClass: "text-white",
                                    attrs: {
                                      name: stat.icon,
                                      width: "22",
                                      height: "22",
                                    },
                                  }),
                                ]
                              : [
                                  _c("i", {
                                    class:
                                      "fa fa-" +
                                      stat.icon +
                                      " text-white small",
                                  }),
                                ],
                          ],
                          2
                        ),
                        _vm._v(" "),
                        _c(
                          "div",
                          {
                            staticClass:
                              "d-flex flex-column overflow-hidden w-100 text-start",
                          },
                          [
                            _c(
                              "span",
                              {
                                staticClass:
                                  "figma-stat-label mb-0 text-truncate w-100",
                              },
                              [_vm._v(_vm._s(stat.label))]
                            ),
                            _vm._v(" "),
                            _c(
                              "h4",
                              {
                                staticClass:
                                  "figma-stat-value mb-0 text-truncate w-100",
                              },
                              [_vm._v(_vm._s(stat.value))]
                            ),
                          ]
                        ),
                      ]
                    ),
                  ]
                ),
              ],
              1
            )
          }),
          0
        ),
        _vm._v(" "),
        _c("div", { staticClass: "row g-4 mb-4" }, [
          _c("div", { staticClass: "col-12 col-lg-6" }, [
            _c("div", { staticClass: "card figma-card h-100 mb-0" }, [
              _c(
                "div",
                {
                  staticClass:
                    "card-header d-flex align-items-center justify-content-between",
                },
                [
                  _c("h4", { staticClass: "h6 mb-0" }, [
                    _vm._v(_vm._s(_vm.__("order_status"))),
                  ]),
                ]
              ),
              _vm._v(" "),
              _c("div", { staticClass: "card-body" }, [
                _c("div", { staticClass: "db-status-row" }, [
                  _c("span", {
                    staticClass: "db-status-dot db-status-dot--warn",
                  }),
                  _vm._v(" "),
                  _c("span", { staticClass: "db-status-label" }, [
                    _vm._v(_vm._s(_vm.__("pending"))),
                  ]),
                  _vm._v(" "),
                  _c("span", { staticClass: "db-status-value" }, [
                    _vm._v(_vm._s(_vm.record.pending_orders || 0)),
                  ]),
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "db-status-row" }, [
                  _c("span", {
                    staticClass: "db-status-dot db-status-dot--success",
                  }),
                  _vm._v(" "),
                  _c("span", { staticClass: "db-status-label" }, [
                    _vm._v(_vm._s(_vm.__("delivered"))),
                  ]),
                  _vm._v(" "),
                  _c("span", { staticClass: "db-status-value" }, [
                    _vm._v(_vm._s(_vm.record.delivered_orders || 0)),
                  ]),
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "db-status-row" }, [
                  _c("span", {
                    staticClass: "db-status-dot db-status-dot--error",
                  }),
                  _vm._v(" "),
                  _c("span", { staticClass: "db-status-label" }, [
                    _vm._v(_vm._s(_vm.__("return_requests"))),
                  ]),
                  _vm._v(" "),
                  _c("span", { staticClass: "db-status-value" }, [
                    _vm._v(_vm._s(_vm.record.return_requests || 0)),
                  ]),
                ]),
              ]),
            ]),
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "col-12 col-lg-6" }, [
            _c("div", { staticClass: "card figma-card h-100 mb-0" }, [
              _c(
                "div",
                {
                  staticClass:
                    "card-header d-flex align-items-center justify-content-between",
                },
                [
                  _c("h4", { staticClass: "h6 mb-0" }, [
                    _vm._v(_vm._s(_vm.__("balance"))),
                  ]),
                ]
              ),
              _vm._v(" "),
              _c("div", { staticClass: "card-body" }, [
                _c("div", { staticClass: "row g-3" }, [
                  _c("div", { staticClass: "col-6 db-wallet-col" }, [
                    _c("div", { staticClass: "db-wallet-tile" }, [
                      _c("span", { staticClass: "figma-stat-label" }, [
                        _vm._v(_vm._s(_vm.__("balance"))),
                      ]),
                      _vm._v(" "),
                      _c("span", { staticClass: "db-wallet-value" }, [
                        _vm._v(
                          _vm._s(_vm.$currency) +
                            " " +
                            _vm._s(_vm.record.balance)
                        ),
                      ]),
                    ]),
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "col-6 db-wallet-col" }, [
                    _c("div", { staticClass: "db-wallet-tile" }, [
                      _c("span", { staticClass: "figma-stat-label" }, [
                        _vm._v(_vm._s(_vm.__("cash_in_hand"))),
                      ]),
                      _vm._v(" "),
                      _c("span", { staticClass: "db-wallet-value" }, [
                        _vm._v(
                          _vm._s(_vm.$currency) +
                            " " +
                            _vm._s(_vm.record.cash_in_hand || 0)
                        ),
                      ]),
                    ]),
                  ]),
                ]),
              ]),
            ]),
          ]),
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "row" }, [
          _c("div", { staticClass: "col-12" }, [
            _c("div", { staticClass: "card figma-card" }, [
              _c(
                "div",
                {
                  staticClass:
                    "card-header d-flex align-items-center justify-content-between flex-wrap gap-2",
                },
                [
                  _c("h4", { staticClass: "h6 mb-0" }, [
                    _vm._v(_vm._s(_vm.__("latest_orders"))),
                  ]),
                  _vm._v(" "),
                  _c(
                    "div",
                    { staticClass: "d-flex align-items-center gap-2" },
                    [
                      _c(
                        "router-link",
                        {
                          staticClass:
                            "btn btn-outline-secondary btn-sm view-order-btn",
                          attrs: { to: "/delivery_boy/orders" },
                        },
                        [
                          _c("span", [
                            _vm._v(
                              _vm._s(_vm.__("view_orders") || "View Orders")
                            ),
                          ]),
                          _vm._v(" "),
                          _c("i", { staticClass: "fa fa-arrow-right ms-1" }),
                        ]
                      ),
                    ],
                    1
                  ),
                ]
              ),
              _vm._v(" "),
              _c("div", { staticClass: "card-body p-0" }, [
                _c(
                  "div",
                  { staticClass: "table-responsive dash-orders-scroll" },
                  [
                    _c("b-table", {
                      staticClass: "table figma-table figma-order-table mb-0",
                      attrs: {
                        items: _vm.orders,
                        fields: _vm.orderFields,
                        "current-page": _vm.orderCurrentPage,
                        "per-page": _vm.orderPerPage,
                        filter: _vm.filter,
                        "filter-included-fields": _vm.filterOn,
                        "sort-by": _vm.sortBy,
                        "sort-desc": _vm.sortDesc,
                        "sort-direction": _vm.sortDirection,
                        bordered: false,
                        busy: _vm.isLoading,
                        "show-empty": "",
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
                                    staticClass:
                                      "fa fa-inbox fa-2x d-block mb-2",
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
                                { staticClass: "text-center text-muted my-2" },
                                [
                                  _c("b-spinner", {
                                    staticClass: "align-middle",
                                  }),
                                  _vm._v(" "),
                                  _c("strong", [
                                    _vm._v(_vm._s(_vm.__("loading"))),
                                  ]),
                                ],
                                1
                              ),
                            ]
                          },
                          proxy: true,
                        },
                        {
                          key: "head(total)",
                          fn: function (row) {
                            return [
                              _vm._v(
                                "\n                                            " +
                                  _vm._s(
                                    _vm.__("total") + " (" + _vm.$currency + ")"
                                  ) +
                                  "\n                                        "
                              ),
                            ]
                          },
                        },
                        {
                          key: "head(delivery_charge)",
                          fn: function (row) {
                            return [
                              _vm._v(
                                "\n                                            " +
                                  _vm._s(
                                    _vm.__("dcharges") +
                                      " (" +
                                      _vm.$currency +
                                      ")"
                                  ) +
                                  "\n                                        "
                              ),
                            ]
                          },
                        },
                        {
                          key: "head(tax)",
                          fn: function (row) {
                            return [
                              _vm._v(
                                "\n                                            " +
                                  _vm._s(
                                    _vm.__("tax") +
                                      " (" +
                                      _vm.$currency +
                                      ") (%)"
                                  ) +
                                  "\n                                        "
                              ),
                            ]
                          },
                        },
                        {
                          key: "head(discount)",
                          fn: function (row) {
                            return [
                              _vm._v(
                                "\n                                            " +
                                  _vm._s(
                                    _vm.__("disc") +
                                      " (" +
                                      _vm.$currency +
                                      ") (%)"
                                  ) +
                                  "\n                                        "
                              ),
                            ]
                          },
                        },
                        {
                          key: "head(promo_discount)",
                          fn: function (row) {
                            return [
                              _vm._v(
                                "\n                                            " +
                                  _vm._s(
                                    _vm.__("promo_disc") +
                                      " (" +
                                      _vm.$currency +
                                      ")"
                                  ) +
                                  "\n                                        "
                              ),
                            ]
                          },
                        },
                        {
                          key: "head(wallet_balance)",
                          fn: function (row) {
                            return [
                              _vm._v(
                                "\n                                            " +
                                  _vm._s(
                                    _vm.__("wallet_used") +
                                      " (" +
                                      _vm.$currency +
                                      ")"
                                  ) +
                                  "\n                                        "
                              ),
                            ]
                          },
                        },
                        {
                          key: "head(remaining_final)",
                          fn: function (row) {
                            return [
                              _vm._v(
                                "\n                                            " +
                                  _vm._s(
                                    _vm.__("ftotal") +
                                      " (" +
                                      _vm.$currency +
                                      ")"
                                  ) +
                                  "\n                                        "
                              ),
                            ]
                          },
                        },
                        {
                          key: "cell(id)",
                          fn: function (row) {
                            return [
                              _c(
                                "span",
                                {
                                  staticClass:
                                    "text-primary font-weight-bold small",
                                },
                                [_vm._v("#" + _vm._s(row.item.id))]
                              ),
                            ]
                          },
                        },
                        {
                          key: "cell(mobile)",
                          fn: function (row) {
                            return [
                              _c("span", { staticClass: "text-muted small" }, [
                                _vm._v(
                                  _vm._s(_vm._f("mobileMask")(row.item.mobile))
                                ),
                              ]),
                            ]
                          },
                        },
                        {
                          key: "cell(user_name)",
                          fn: function (row) {
                            return [
                              _c(
                                "span",
                                { staticClass: "font-weight-bold small" },
                                [_vm._v(_vm._s(row.item.user_name))]
                              ),
                            ]
                          },
                        },
                        {
                          key: "cell(payment_method)",
                          fn: function (row) {
                            return [
                              _c(
                                "span",
                                { staticClass: "figma-payment-method-badge" },
                                [_vm._v(_vm._s(row.item.payment_method))]
                              ),
                            ]
                          },
                        },
                        {
                          key: "cell(total)",
                          fn: function (row) {
                            return [
                              _c(
                                "span",
                                { staticClass: "font-weight-bold small" },
                                [_vm._v(_vm._s(row.item.total))]
                              ),
                            ]
                          },
                        },
                        {
                          key: "cell(actions)",
                          fn: function (row) {
                            return [
                              _c(
                                "router-link",
                                {
                                  directives: [
                                    {
                                      name: "b-tooltip",
                                      rawName: "v-b-tooltip.hover",
                                      modifiers: { hover: true },
                                    },
                                  ],
                                  staticClass:
                                    "figma-action-btn d-inline-flex align-items-center justify-content-center",
                                  attrs: {
                                    to: {
                                      name: "DeliveryBoyOrder",
                                      params: {
                                        id: row.item.id,
                                        record: row.item,
                                      },
                                    },
                                    title: "View",
                                  },
                                },
                                [
                                  _c("base-icon", {
                                    attrs: {
                                      name: "Eye",
                                      width: "20",
                                      height: "20",
                                    },
                                  }),
                                ],
                                1
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
                _c(
                  "div",
                  { staticClass: "figma-table-footer" },
                  [
                    _c(
                      "div",
                      {
                        staticClass:
                          "d-flex align-items-center gap-3 flex-wrap",
                      },
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
                                  _vm.orderCurrentPage = 1
                                },
                              },
                              model: {
                                value: _vm.orderPerPage,
                                callback: function ($$v) {
                                  _vm.orderPerPage = $$v
                                },
                                expression: "orderPerPage",
                              },
                            }),
                          ],
                          1
                        ),
                        _vm._v(" "),
                        _c("table-count", {
                          attrs: {
                            "current-page": _vm.orderCurrentPage,
                            "per-page": _vm.orderPerPage,
                            "total-rows": _vm.orderTotalRows,
                          },
                        }),
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _c("b-pagination", {
                      staticClass: "figma-pagination mb-0",
                      attrs: {
                        "total-rows": _vm.orderTotalRows,
                        "per-page": _vm.orderPerPage,
                        align: "right",
                      },
                      model: {
                        value: _vm.orderCurrentPage,
                        callback: function ($$v) {
                          _vm.orderCurrentPage = $$v
                        },
                        expression: "orderCurrentPage",
                      },
                    }),
                  ],
                  1
                ),
              ]),
            ]),
          ]),
        ]),
      ]),
    ]),
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ })

}]);