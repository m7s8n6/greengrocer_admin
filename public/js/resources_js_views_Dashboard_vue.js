"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_views_Dashboard_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Dashboard.vue?vue&type=script&lang=js":
/*!**********************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Dashboard.vue?vue&type=script&lang=js ***!
  \**********************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var vue_apexcharts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! vue-apexcharts */ "./node_modules/vue-apexcharts/dist/vue-apexcharts.js");
/* harmony import */ var vue_apexcharts__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(vue_apexcharts__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var vue2_daterange_picker__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! vue2-daterange-picker */ "./node_modules/vue2-daterange-picker/dist/vue2-daterange-picker.umd.min.js");
/* harmony import */ var vue2_daterange_picker__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(vue2_daterange_picker__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _mixins_DateRangePickerMixin__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../mixins/DateRangePickerMixin */ "./resources/js/mixins/DateRangePickerMixin.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
  name: 'Dashboard',
  mixins: [_mixins_DateRangePickerMixin__WEBPACK_IMPORTED_MODULE_4__["default"]],
  components: {
    apexcharts: (vue_apexcharts__WEBPACK_IMPORTED_MODULE_2___default()),
    DateRangePicker: (vue2_daterange_picker__WEBPACK_IMPORTED_MODULE_3___default())
  },
  data: function data() {
    return {
      record: {},
      recordLoading: true,
      sellers: [],
      categories: [],
      statusOrderCount: [],
      // Periods
      salesPeriod: 'yearly',
      categoryPeriod: 'yearly',
      orderStatusPeriod: 'yearly',
      sellerPeriod: 'yearly',
      platformPeriod: 'yearly',
      ratedPeriod: 'yearly',
      sellingPeriod: 'yearly',
      // Pagination
      sellerPage: 1,
      sellerPerPage: 5,
      ratedPage: 1,
      sellingPage: 1,
      ratedPerPage: 5,
      sellingPerPage: 5,
      pageOptions: this.$pageOptions,
      // Viewport width, kept current so charts can switch to their phone sizing
      viewportWidth: window.innerWidth,
      // Chart data
      salesChartCategories: [],
      salesOrdersData: [],
      salesRevenueData: [],
      // Category chart
      categoryChartLabels: [],
      categoryChartSeries: [],
      // Top products (derived from categories/orders data)
      topRatedProducts: [],
      topSellingProducts: [],
      // Platform data (from record.platform_usage)
      totalUsers: 0,
      platformUsage: {
        web: 0,
        android: 0,
        ios: 0
      },
      // Latest Orders Data
      isLoading: false,
      isModalLoading: false,
      selectedOrder: null,
      orders: [],
      orderFields: [{
        key: 'id',
        label: __('Order ID') || 'Order ID',
        sortable: true,
        "class": 'text-start col-id'
      }, {
        key: 'user_name',
        label: __('Customer') || 'Customer',
        sortable: true,
        "class": 'text-start col-customer'
      }, {
        key: 'seller_name',
        label: __('Seller') || 'Seller',
        sortable: true,
        "class": 'text-start col-seller'
      }, {
        key: 'total_items',
        label: __('Total Items') || 'Total Items',
        sortable: true,
        "class": 'text-center col-items'
      }, {
        key: 'total',
        label: __('Payment') || 'Payment',
        sortable: true,
        "class": 'text-start col-payment'
      }, {
        key: 'created_at',
        label: __('Order Date & Time') || 'Order Date & Time',
        sortable: true,
        "class": 'text-start col-date'
      }, {
        key: 'active_status',
        label: __('Status') || 'Status',
        sortable: true,
        "class": 'text-center col-status'
      }, {
        key: "actions",
        label: __('Action') || 'Action',
        "class": 'text-center col-actions'
      }],
      orderTotalRows: 1,
      orderCurrentPage: 1,
      orderPerPage: 5,
      status: "",
      seller: "",
      filterSellers: [],
      dateRange: {
        startDate: moment__WEBPACK_IMPORTED_MODULE_1___default()().subtract(30, 'days').toDate(),
        endDate: moment__WEBPACK_IMPORTED_MODULE_1___default()().toDate()
      },
      deliveryDateRange: {
        startDate: null,
        endDate: null
      },
      maxDate: new Date(),
      sortBy: '',
      sortDesc: false,
      sortDirection: 'asc',
      filterOn: []
    };
  },
  computed: {
    userName: function userName() {
      try {
        var user = this.$auth ? this.$auth.user() : null;
        if (user && user.name) return user.name;
      } catch (e) {}
      return 'Admin';
    },
    greetingMessage: function greetingMessage() {
      var hour = new Date().getHours();
      if (hour < 12) return this.__('Good morning');
      if (hour < 17) return this.__('Good afternoon');
      return this.__('Good evening');
    },
    formattedDate: function formattedDate() {
      return this.formatDateBold(new Date());
    },
    todayStats: function todayStats() {
      var todayOrders = this.record.today_order_count || 0;
      var todayRevenue = this.record.today_revenue || 0;
      var todayReturns = this.record.today_return_count || 0;
      var todayCancelled = this.record.today_cancelled_count || 0;
      return [{
        label: this.__('today_order'),
        value: this.formatNumber(todayOrders),
        cardBg: 'var(--ui-surface)',
        iconBgClass: 'bg-stat-blue',
        icon: 'Total order'
      }, {
        label: this.__('today_revenue'),
        value: this.$currency + this.formatNumber(todayRevenue),
        cardBg: 'var(--ui-surface)',
        iconBgClass: 'bg-stat-green',
        icon: 'total rev'
      }, {
        label: this.__('today_returns'),
        value: this.formatNumber(todayReturns),
        cardBg: 'var(--ui-surface)',
        iconBgClass: 'bg-stat-orange',
        icon: 'total return'
      }, {
        label: this.__('today_cancelled'),
        value: this.formatNumber(todayCancelled),
        cardBg: 'var(--ui-surface)',
        iconBgClass: 'bg-stat-red',
        icon: 'total cancel'
      }];
    },
    summaryStats: function summaryStats() {
      var r = this.record || {};
      var orderCount = Number(r.order_count) || 0;
      var revenue = Number(r.revenue) || 0;
      var customers = r.customer_count || 0;
      var pendingOrders = r.pending_orders || 0;
      var deliveredOrders = r.delivered_orders || 0;
      // Average order value: all-time revenue / all-time orders (0 when there are no orders yet)
      var avgOrderValue = orderCount > 0 ? Math.round(revenue / orderCount * 100) / 100 : 0;
      // Trend pills are only shown when the API sends a trend for that stat
      var trend = function trend(key, defaultUp) {
        return {
          trendUp: r[key + '_up'] !== undefined ? r[key + '_up'] : defaultUp,
          trendValue: r[key] || null
        };
      };
      return [_objectSpread({
        label: this.__('total_orders'),
        value: this.formatNumber(orderCount),
        iconBgClass: 'bg-stat-blue-light',
        iconTextClass: 'text-stat-blue',
        iconClass: 'fa fa-shopping-bag'
      }, trend('total_orders_trend', true)), _objectSpread({
        label: this.__('revenue'),
        value: this.$currency + this.formatNumber(revenue),
        iconBgClass: 'bg-stat-green-light',
        iconTextClass: 'text-stat-green',
        iconClass: 'fa fa-wallet'
      }, trend('revenue_trend', true)), {
        label: this.__('average_order_value'),
        value: this.$currency + this.formatNumber(avgOrderValue),
        iconBgClass: 'bg-stat-purple-light',
        iconTextClass: 'text-stat-purple',
        iconClass: 'fa fa-receipt',
        trendValue: null
      }, _objectSpread({
        label: this.__('active_customers'),
        value: this.formatNumber(customers),
        iconBgClass: 'bg-stat-pink-light',
        iconTextClass: 'text-stat-pink',
        iconClass: 'fa fa-users'
      }, trend('customers_trend', true)), _objectSpread({
        label: this.__('pending_orders'),
        value: this.formatNumber(pendingOrders),
        iconBgClass: 'bg-stat-red-light',
        iconTextClass: 'text-stat-red',
        iconClass: 'fa fa-hourglass-half'
      }, trend('pending_orders_trend', false)), _objectSpread({
        label: this.__('delivered_orders'),
        value: this.formatNumber(deliveredOrders),
        iconBgClass: 'bg-stat-green-light',
        iconTextClass: 'text-stat-green',
        iconClass: 'fa fa-truck'
      }, trend('delivered_orders_trend', true))];
    },
    // Catalog & inventory tiles: counts the dashboard API already returns. Each tile links to its
    // list page only when the user may open it (same permissions as the sidebar).
    catalogTiles: function catalogTiles() {
      var _this = this;
      var r = this.record || {};
      var link = function link(perm, to) {
        return _this.$can(perm) ? to : null;
      };
      return [{
        key: 'products',
        label: this.__('products'),
        value: this.formatNumber(r.product_count || 0),
        iconClass: 'fa fa-cubes',
        iconBgClass: 'bg-stat-purple',
        tintClass: '',
        to: link('product_list', '/manage_products')
      }, {
        key: 'sellers',
        label: this.__('sellers'),
        value: this.formatNumber(r.seller_count || 0),
        iconClass: 'fa fa-store',
        iconBgClass: 'bg-stat-blue',
        tintClass: '',
        to: link('seller_list', '/sellers')
      }, {
        key: 'categories',
        label: this.__('categories'),
        value: this.formatNumber(r.category_count || 0),
        iconClass: 'fa fa-th-large',
        iconBgClass: 'bg-stat-green',
        tintClass: '',
        to: link('category_list', '/manage_categories')
      }, {
        key: 'brands',
        label: this.__('brands'),
        value: this.formatNumber(r.brand_count || 0),
        iconClass: 'fa fa-tags',
        iconBgClass: 'bg-stat-pink',
        tintClass: '',
        to: link('brands', '/brands')
      }, {
        key: 'sold_out',
        label: this.__('sold_out'),
        value: this.formatNumber(r.sold_out_count || 0),
        iconClass: 'fa fa-times-circle',
        iconBgClass: 'bg-stat-red',
        tintClass: 'card-kpi-out',
        to: link('stock_management', '/manage_stock'),
        showView: true
      }, {
        key: 'low_stock',
        label: this.__('low_stock'),
        value: this.formatNumber(r.low_stock_count || 0),
        iconClass: 'fa fa-exclamation-triangle',
        iconBgClass: 'bg-stat-orange',
        tintClass: 'card-kpi-processing',
        to: link('stock_management', '/manage_stock'),
        showView: true
      }];
    },
    orderStatusItems: function orderStatusItems() {
      if (!this.statusOrderCount || !this.statusOrderCount.length) return [];
      var allowedStatuses = ['Payment Pending', 'Received', 'Processed', 'Shipped', 'Out For Delivery', 'Delivered'];
      var filteredStatuses = this.statusOrderCount.filter(function (s) {
        return allowedStatuses.includes(s.status);
      });
      var maxCount = Math.max.apply(Math, _toConsumableArray(filteredStatuses.map(function (s) {
        return s.order_count || 0;
      })).concat([1]));
      var statusMap = {
        'Payment Pending': {
          color: 'var(--theme-warn-500)',
          bgColor: 'var(--theme-warn-50)',
          label: this.__('payment_pending') || 'Pending',
          iconClass: 'fa fa-credit-card'
        },
        'Pending': {
          color: 'var(--theme-warn-500)',
          bgColor: 'var(--theme-warn-50)',
          label: this.__('pending') || 'Pending',
          iconClass: 'fa fa-clock'
        },
        'Received': {
          color: 'var(--theme-info-500)',
          bgColor: 'var(--theme-info-50)',
          label: this.__('received') || 'Received',
          iconClass: 'fa fa-inbox'
        },
        'Processed': {
          color: 'var(--theme-success-500)',
          bgColor: 'var(--theme-success-50)',
          label: this.__('processed') || 'Processed',
          iconClass: 'fa fa-cog'
        },
        'Shipped': {
          color: 'var(--theme-info-600)',
          bgColor: 'var(--theme-info-100)',
          label: this.__('shipped') || 'Shipped',
          iconClass: 'fa fa-box'
        },
        'Out For Delivery': {
          color: 'var(--theme-primary-500)',
          bgColor: 'var(--theme-primary-50)',
          label: this.__('out_for_delivery') || 'Out for Delivery',
          iconClass: 'fa fa-truck'
        },
        'Delivered': {
          color: 'var(--theme-success-500)',
          bgColor: 'var(--theme-success-50)',
          label: this.__('delivered') || 'Delivered',
          iconClass: 'fa fa-check-circle'
        }
      };
      return filteredStatuses.map(function (s) {
        var mapped = statusMap[s.status];
        return {
          label: mapped.label,
          count: s.order_count || 0,
          color: mapped.color,
          bgColor: mapped.bgColor,
          iconClass: mapped.iconClass,
          percent: Math.round((s.order_count || 0) / maxCount * 100)
        };
      });
    },
    isPhone: function isPhone() {
      return this.viewportWidth < 576;
    },
    // Sales Overview chart height: compact on every screen (desktop 260, tablet 220, phone 200).
    salesChartHeight: function salesChartHeight() {
      if (this.viewportWidth < 576) return 200;
      if (this.viewportWidth < 992) return 220;
      return 260;
    },
    // Phone chart width: ~28px per category plus the y-axis, never narrower than 300px.
    salesChartMinWidth: function salesChartMinWidth() {
      return Math.max(300, (this.salesChartCategories || []).length * 28 + 56);
    },
    // Phones: width of the fixed y-axis column - grows with the longest rupee label so big
    // values (e.g. ₹1,234,567) are never cut, and stays at 64px for small ones.
    salesAxisWidth: function salesAxisWidth() {
      var orders = this.salesOrdersData || [];
      var revenue = this.salesRevenueData || [];
      var max = 15000;
      for (var i = 0; i < Math.max(orders.length, revenue.length); i++) {
        max = Math.max(max, (parseFloat(orders[i]) || 0) + (parseFloat(revenue[i]) || 0));
      }
      var longest = (this.$currency + this.formatNumber(Math.round(max))).length;
      return Math.max(64, Math.ceil(longest * 6.4) + 18);
    },
    // Phones: options for the fixed y-axis column. Same data / scale / label heights as the
    // scrolling chart, but bars, grid, x labels and tooltip are invisible - only the rupee
    // labels remain, lined up with the scrolling chart's gridlines.
    salesAxisChartOptions: function salesAxisChartOptions() {
      var o = this.salesChartOptions;
      return _objectSpread(_objectSpread({}, o), {}, {
        chart: _objectSpread(_objectSpread({}, o.chart), {}, {
          animations: {
            enabled: false
          },
          zoom: {
            enabled: false
          }
        }),
        colors: ['transparent', 'transparent'],
        xaxis: _objectSpread(_objectSpread({}, o.xaxis), {}, {
          labels: _objectSpread(_objectSpread({}, o.xaxis.labels), {}, {
            style: {
              colors: 'transparent',
              fontSize: '10px'
            }
          }),
          crosshairs: {
            show: false
          },
          tooltip: {
            enabled: false
          }
        }),
        yaxis: _objectSpread(_objectSpread({}, o.yaxis), {}, {
          show: true
        }),
        grid: {
          show: false,
          padding: {
            left: 0,
            right: 0
          }
        },
        tooltip: {
          enabled: false
        },
        legend: {
          show: false
        }
      });
    },
    salesChartOptions: function salesChartOptions() {
      var _this2 = this;
      return {
        chart: {
          type: 'bar',
          stacked: true,
          toolbar: {
            show: false
          },
          fontFamily: 'Nunito, sans-serif'
        },
        plotOptions: {
          bar: {
            columnWidth: this.isPhone ? '60%' : '40%',
            borderRadius: this.isPhone ? 3 : 4
          }
        },
        // revenue uses a lighter shade than orders, but not -100 (near-white in light themes)
        colors: [this.$themeColor('primary-500'), this.$themeColor('primary-300')],
        dataLabels: {
          enabled: false
        },
        xaxis: {
          categories: this.salesChartCategories,
          axisBorder: {
            show: false
          },
          axisTicks: {
            show: false
          },
          // Phones: horizontal 10px labels, all shown - the chart gets enough width
          // (see salesChartMinWidth) and scrolls inside its wrapper instead of squeezing.
          labels: this.isPhone ? {
            rotate: 0,
            rotateAlways: false,
            hideOverlappingLabels: false,
            trim: false,
            minHeight: 24,
            maxHeight: 24,
            style: {
              colors: this.$themeColor('neutral-500'),
              fontSize: '10px'
            }
          } : {
            style: {
              colors: this.$themeColor('neutral-500'),
              fontSize: '12px'
            }
          },
          crosshairs: {
            show: true,
            fill: {
              type: 'solid',
              color: this.$themeColor('neutral-200'),
              opacity: 0.8
            },
            stroke: {
              color: this.$themeColor('neutral-200'),
              width: 0
            }
          }
        },
        yaxis: {
          // Phones: the rupee scale lives in the fixed column beside the scrolling plot.
          show: !this.isPhone,
          min: 0,
          max: function max(_max) {
            return _max > 15000 ? _max : 15000;
          },
          tickAmount: 5,
          labels: {
            style: {
              colors: this.$themeColor('neutral-500'),
              fontSize: this.isPhone ? '10px' : '12px'
            },
            // Phones: whole rupees only - the axis column is narrow and decimals on the
            // scale ticks (e.g. 71,791.96) are noise.
            formatter: function formatter(val) {
              return _this2.$currency + _this2.formatNumber(_this2.isPhone ? Math.round(val) : val);
            }
          }
        },
        grid: {
          borderColor: this.$themeColor('neutral-200'),
          strokeDashArray: 4
        },
        legend: {
          show: false
        },
        states: {
          hover: {
            filter: {
              type: 'none'
            }
          },
          active: {
            filter: {
              type: 'none'
            }
          }
        },
        tooltip: {
          shared: true,
          intersect: false,
          followCursor: true,
          custom: function custom(_ref) {
            var series = _ref.series,
              seriesIndex = _ref.seriesIndex,
              dataPointIndex = _ref.dataPointIndex,
              w = _ref.w;
            var cat = w.globals.categoryLabels[dataPointIndex] || w.config.xaxis.categories[dataPointIndex];
            var orders = series[0] ? series[0][dataPointIndex] : 0;
            var revenue = series[1] ? series[1][dataPointIndex] : 0;
            var ordersLabel = _this2.__('orders') || 'Orders';
            var revenueLabel = _this2.__('revenue') || 'Revenue';
            // Phones: a smaller card (tighter padding / font) that never wraps.
            var phone = _this2.isPhone;
            var box = phone ? 'background:var(--theme-neutral-900);color:var(--theme-neutral-50);padding:8px 10px;border-radius:8px;font-size:11px;line-height:1.5;white-space:nowrap;border:none;box-shadow:0 10px 15px -3px rgba(0,0,0,0.1)' : 'background:var(--theme-neutral-900);color:var(--theme-neutral-50);padding:12px;border-radius:12px;font-size:13px;line-height:1.6;border:none;box-shadow:0 10px 15px -3px rgba(0,0,0,0.1)';
            var gap = phone ? 6 : 8;
            return '<div style="' + box + '">' + '<div style="margin-bottom:4px;font-weight:700">' + cat + '</div>' + '<div style="display:flex;align-items:center;gap:' + gap + 'px"><span style="width:8px;height:8px;border-radius:50%;background:var(--theme-primary-500)"></span> ' + ordersLabel + ' : <span style="font-weight:700">' + orders + '</span></div>' + '<div style="display:flex;align-items:center;gap:' + gap + 'px"><span style="width:8px;height:8px;border-radius:50%;background:var(--theme-primary-300)"></span> ' + revenueLabel + ' : <span style="font-weight:700">' + _this2.$currency + (revenue || 0).toLocaleString() + '</span></div>' + '</div>';
          }
        }
      };
    },
    salesChartSeries: function salesChartSeries() {
      return [{
        name: 'Orders',
        data: this.salesOrdersData
      }, {
        name: 'Revenue',
        data: this.salesRevenueData
      }];
    },
    // Top sales by category: total of every category with sales in the selected period.
    categoryTotalSales: function categoryTotalSales() {
      return (this.categoryChartSeries || []).reduce(function (sum, v) {
        return sum + (parseFloat(v) || 0);
      }, 0);
    },
    // Top sales by category as a ranked bar list: top 5 by sales, then one "Others" row with
    // the rest. Bar width = share of the total; #1 uses the strongest primary shade.
    categoryRanked: function categoryRanked() {
      var _this3 = this;
      var total = this.categoryTotalSales;
      if (!total) return [];
      var shades = ['var(--theme-primary-500)', 'var(--theme-primary-400)', 'var(--theme-primary-300)', 'var(--theme-primary-300)', 'var(--theme-primary-200)'];
      var share = function share(v) {
        var pct = v / total * 100;
        return pct >= 10 ? Math.round(pct) : Math.round(pct * 10) / 10;
      };
      var items = this.categoryChartLabels.map(function (label, index) {
        return {
          name: label,
          amount: parseFloat(_this3.categoryChartSeries[index]) || 0
        };
      }).sort(function (x, y) {
        return y.amount - x.amount;
      });
      var rows = items.slice(0, 5).map(function (item, idx) {
        return {
          key: 'r' + idx,
          rank: idx + 1,
          name: item.name,
          value: _this3.$currency + _this3.formatNumber(item.amount),
          share: share(item.amount),
          color: shades[idx],
          isOther: false
        };
      });
      var rest = items.slice(5);
      if (rest.length) {
        var restTotal = rest.reduce(function (sum, item) {
          return sum + item.amount;
        }, 0);
        rows.push({
          key: 'others',
          rank: null,
          name: this.__('others') + ' (' + rest.length + ')',
          value: this.$currency + this.formatNumber(restTotal),
          share: share(restTotal),
          color: 'var(--theme-neutral-400)',
          isOther: true
        });
      }
      return rows;
    },
    // Customers by platform: one progress bar per platform with its share of all users.
    platformItems: function platformItems() {
      var u = this.platformUsage || {};
      var web = Number(u.web) || 0;
      var android = Number(u.android) || 0;
      var ios = Number(u.ios) || 0;
      var total = web + android + ios;
      var pct = function pct(n) {
        return total > 0 ? Math.round(n / total * 100) : 0;
      };
      return [{
        key: 'web',
        label: this.__('Web'),
        count: this.formatNumber(web),
        percent: pct(web),
        iconClass: 'bi bi-globe',
        color: 'var(--theme-primary-500)'
      }, {
        key: 'android',
        label: this.__('Android (App)'),
        count: this.formatNumber(android),
        percent: pct(android),
        iconClass: 'fab fa-android',
        color: 'var(--theme-primary-400)'
      }, {
        key: 'ios',
        label: this.__('iOS (App)'),
        count: this.formatNumber(ios),
        percent: pct(ios),
        iconClass: 'fab fa-apple',
        color: 'var(--theme-primary-300)'
      }];
    },
    // Seller pagination
    sellerTotalPages: function sellerTotalPages() {
      return Math.ceil(this.sellers.length / this.sellerPerPage);
    },
    sellerPageStart: function sellerPageStart() {
      return Math.min((this.sellerPage - 1) * this.sellerPerPage + this.sellerPerPage, this.sellers.length);
    },
    paginatedSellers: function paginatedSellers() {
      var start = (this.sellerPage - 1) * this.sellerPerPage;
      return this.sellers.slice(start, start + this.sellerPerPage);
    },
    // Top rated pagination
    ratedTotalPages: function ratedTotalPages() {
      return Math.ceil(this.topRatedProducts.length / this.ratedPerPage);
    },
    ratedPageStart: function ratedPageStart() {
      return Math.min((this.ratedPage - 1) * this.ratedPerPage + this.ratedPerPage, this.topRatedProducts.length);
    },
    paginatedRatedProducts: function paginatedRatedProducts() {
      var start = (this.ratedPage - 1) * this.ratedPerPage;
      return this.topRatedProducts.slice(start, start + this.ratedPerPage);
    },
    // Top selling pagination
    sellingTotalPages: function sellingTotalPages() {
      return Math.ceil(this.topSellingProducts.length / this.sellingPerPage);
    },
    sellingPageStart: function sellingPageStart() {
      return Math.min((this.sellingPage - 1) * this.sellingPerPage + this.sellingPerPage, this.topSellingProducts.length);
    },
    paginatedSellingProducts: function paginatedSellingProducts() {
      var start = (this.sellingPage - 1) * this.sellingPerPage;
      return this.topSellingProducts.slice(start, start + this.sellingPerPage);
    },
    // Latest Orders pagination
    orderTotalPages: function orderTotalPages() {
      return Math.ceil(this.orderTotalRows / this.orderPerPage);
    },
    orderPageStart: function orderPageStart() {
      return Math.min((this.orderCurrentPage - 1) * this.orderPerPage + this.orderPerPage, this.orderTotalRows);
    },
    sellerPageEnd: function sellerPageEnd() {
      return Math.min(this.sellerPage * this.sellerPerPage, this.sellers.length);
    },
    ratedPageEnd: function ratedPageEnd() {
      return Math.min(this.ratedPage * this.ratedPerPage, this.topRatedProducts.length);
    },
    sellingPageEnd: function sellingPageEnd() {
      return Math.min(this.sellingPage * this.sellingPerPage, this.topSellingProducts.length);
    },
    orderPageEnd: function orderPageEnd() {
      return Math.min(this.orderCurrentPage * this.orderPerPage, this.orderTotalRows);
    }
  },
  mounted: function mounted() {
    var _this4 = this;
    window.addEventListener('resize', this.onViewportResize);
    // Phones: the tooltip lives inside the scrolling chart, so near the visible edge it gets
    // cut off. Nudge it back inside after every pointer/touch update.
    ['mousemove', 'touchstart', 'touchmove', 'click'].forEach(function (evt) {
      return _this4.$el.addEventListener(evt, _this4.keepSalesTooltipInView, {
        passive: true
      });
    });
  },
  beforeDestroy: function beforeDestroy() {
    var _this5 = this;
    window.removeEventListener('resize', this.onViewportResize);
    ['mousemove', 'touchstart', 'touchmove', 'click'].forEach(function (evt) {
      return _this5.$el.removeEventListener(evt, _this5.keepSalesTooltipInView);
    });
  },
  created: function created() {
    this.getRecord();
    this.getSalesData();
    this.getPieChartData();
    this.setSellerWalletTransaction();
    this.getLatestOrders();
  },
  methods: {
    keepSalesTooltipInView: function keepSalesTooltipInView(e) {
      var _this6 = this;
      if (!this.isPhone || !e.target.closest || !e.target.closest('.sales-chart-scroll')) return;
      requestAnimationFrame(function () {
        var scroller = _this6.$el.querySelector('.sales-chart-scroll');
        var tip = scroller && scroller.querySelector('.apexcharts-tooltip');
        if (!tip) return;
        tip.style.marginLeft = '0px';
        var t = tip.getBoundingClientRect();
        var r = scroller.getBoundingClientRect();
        var shift = 0;
        if (t.right > r.right) shift = r.right - t.right - 4;
        if (t.left + shift < r.left) shift = r.left - t.left + 4;
        tip.style.marginLeft = shift + 'px';
      });
    },
    onViewportResize: function onViewportResize() {
      this.viewportWidth = window.innerWidth;
    },
    getDisplayName: function getDisplayName(name) {
      if (name == null) return '';
      if (typeof name === 'string') return name;
      if (_typeof(name) === 'object' && !Array.isArray(name)) {
        var appLocale = window.appLocale || window.localStorage.getItem('lang') || 'en';
        var forLocale = name[appLocale];
        if (forLocale != null && String(forLocale).trim() !== '') return String(forLocale).trim();
        var firstNonEmpty = Object.values(name).find(function (val) {
          return val != null && String(val).trim() !== '';
        });
        return firstNonEmpty != null ? String(firstNonEmpty).trim() : '';
      }
      return '';
    },
    formatNumber: function formatNumber(num) {
      if (num == null || isNaN(num)) return '0';
      return Number(num).toLocaleString();
    },
    getSellerInitial: function getSellerInitial(seller) {
      var name = this.getDisplayName(seller.store_name) || this.getDisplayName(seller.name) || '?';
      return name.charAt(0).toUpperCase();
    },
    getRecord: function getRecord() {
      var _this7 = this;
      var params = {
        orderStatusPeriod: this.orderStatusPeriod,
        categoryPeriod: this.categoryPeriod,
        sellerPeriod: this.sellerPeriod,
        platformPeriod: this.platformPeriod,
        ratedPeriod: this.ratedPeriod,
        sellingPeriod: this.sellingPeriod
      };
      this.recordLoading = true;
      axios__WEBPACK_IMPORTED_MODULE_0___default().get(this.$apiUrl + '/dashboard', {
        params: params
      }).then(function (res) {
        _this7.recordLoading = false;
        var data = res.data;
        if (data.status === 1) {
          _this7.record = data.data;
          _this7.sellers = data.data.top_sellers || [];
          _this7.categories = data.data.top_categories || [];
          _this7.statusOrderCount = data.data.status_order_count || [];
          _this7.platformUsage = data.data.platform_usage || {
            web: 0,
            android: 0,
            ios: 0
          };
          _this7.totalUsers = (_this7.platformUsage.web || 0) + (_this7.platformUsage.android || 0) + (_this7.platformUsage.ios || 0);

          // Build top_selling_products
          var topSelling = data.data.top_selling_products || [];
          if (topSelling.length) {
            _this7.topSellingProducts = topSelling.map(function (c) {
              return {
                name: c.product_name,
                sold_count: Math.round(parseFloat(c.total_revenue || 0) / 100),
                total_revenue: c.total_revenue,
                image: c.image_url || c.image || null
              };
            });
          } else {
            _this7.topSellingProducts = [];
          }

          // Build top_rated_products
          var topRated = data.data.top_rated_products || [];
          if (topRated.length) {
            _this7.topRatedProducts = topRated.map(function (c) {
              return {
                name: c.product_name,
                review_count: parseInt(c.review_count || 0),
                rating: parseFloat(c.average_rating || 0.0),
                image: c.image_url || c.image || null
              };
            });
          } else {
            _this7.topRatedProducts = [];
          }

          // Populate the category ranked list with real sales from top_categories_sales
          var catSales = data.data.top_categories_sales || [];
          var filtered = catSales.filter(function (c) {
            return parseFloat(c.total_revenue) > 0;
          });
          _this7.categoryChartLabels = filtered.map(function (c) {
            return _this7.getDisplayName(c.category_name);
          });
          _this7.categoryChartSeries = filtered.map(function (c) {
            return parseFloat(c.total_revenue);
          });
        }
      })["catch"](function (error) {
        _this7.recordLoading = false;
        console.error('Dashboard error:', error);
      });
    },
    getSalesData: function getSalesData() {
      var _this8 = this;
      axios__WEBPACK_IMPORTED_MODULE_0___default().get(this.$apiUrl + '/orders/weekly_sales', {
        params: {
          period: this.salesPeriod
        }
      }).then(function (response) {
        var orders = response.data.data || [];
        // For yearly view, generate month-based data
        if (_this8.salesPeriod === 'yearly') {
          var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
          var monthData = {};
          months.forEach(function (m, idx) {
            monthData[idx + 1] = {
              name: m,
              orders: 0,
              revenue: 0
            };
          });
          orders.forEach(function (o) {
            var m = parseInt(o.order_month);
            if (monthData[m]) {
              monthData[m].orders = parseInt(o.total_orders || 0);
              monthData[m].revenue = parseFloat(o.total_sale || 0);
            }
          });
          _this8.salesChartCategories = months.map(function (m) {
            return _this8.__(m);
          });
          _this8.salesOrdersData = months.map(function (m, idx) {
            return monthData[idx + 1].orders;
          });
          _this8.salesRevenueData = months.map(function (m, idx) {
            return monthData[idx + 1].revenue;
          });
        } else {
          var daysCount = _this8.salesPeriod === 'weekly' ? 7 : 30;
          var categories = [];
          var ordersData = [];
          var revenueData = [];

          // Create a map of existing data by date (YYYY-MM-DD)
          var dataMap = {};
          orders.forEach(function (o) {
            var dateKey = moment__WEBPACK_IMPORTED_MODULE_1___default()(o.order_date).format('YYYY-MM-DD');
            dataMap[dateKey] = {
              orders: parseInt(o.total_orders || 0),
              revenue: parseFloat(o.total_sale || 0)
            };
          });

          // Generate last N days
          for (var i = daysCount - 1; i >= 0; i--) {
            var date = moment__WEBPACK_IMPORTED_MODULE_1___default()().subtract(i, 'days');
            var dateKey = date.format('YYYY-MM-DD');
            var day = date.format('DD');
            var month = date.format('MMM');
            var label = _this8.salesPeriod === 'weekly' ? _this8.__(month) + ' ' + day : day;
            categories.push(label);
            if (dataMap[dateKey]) {
              ordersData.push(dataMap[dateKey].orders);
              revenueData.push(dataMap[dateKey].revenue);
            } else {
              ordersData.push(0);
              revenueData.push(0);
            }
          }
          _this8.salesChartCategories = categories;
          _this8.salesOrdersData = ordersData;
          _this8.salesRevenueData = revenueData;
        }
      })["catch"](function (err) {
        return console.error('Sales data error:', err);
      });
    },
    getPieChartData: function getPieChartData() {
      // Deprecated in favor of real category sales loaded from getRecord()
    },
    setSellerWalletTransaction: function setSellerWalletTransaction() {
      var _this9 = this;
      axios__WEBPACK_IMPORTED_MODULE_0___default().get(this.$apiUrl + '/set_seller_wallet_transaction').then(function (res) {
        var data = res.data;
        if (data.status === 1) {
          // Refresh data if needed
          if (data.data && data.data.top_sellers) {
            _this9.sellers = data.data.top_sellers;
          }
        }
      })["catch"](function () {});
    },
    updateSalesChart: function updateSalesChart() {
      this.getSalesData();
    },
    mockDataRefresh: function mockDataRefresh(section) {
      var _this10 = this;
      // Each period dropdown must only refresh its own widget - re-running the full
      // getRecord() (as this used to do) reassigns every widget's state at once, which
      // makes ApexCharts re-render cards whose own filter never changed (e.g. changing
      // the Sellers period visibly "refreshed" the unrelated Category list too).
      var params = {
        orderStatusPeriod: this.orderStatusPeriod,
        categoryPeriod: this.categoryPeriod,
        sellerPeriod: this.sellerPeriod,
        platformPeriod: this.platformPeriod,
        ratedPeriod: this.ratedPeriod,
        sellingPeriod: this.sellingPeriod
      };
      axios__WEBPACK_IMPORTED_MODULE_0___default().get(this.$apiUrl + '/dashboard', {
        params: params
      }).then(function (res) {
        var data = res.data;
        if (data.status !== 1) return;
        var d = data.data;
        if (section === 'category') {
          var catSales = d.top_categories_sales || [];
          var filtered = catSales.filter(function (c) {
            return parseFloat(c.total_revenue) > 0;
          });
          _this10.categoryChartLabels = filtered.map(function (c) {
            return _this10.getDisplayName(c.category_name);
          });
          _this10.categoryChartSeries = filtered.map(function (c) {
            return parseFloat(c.total_revenue);
          });
        } else if (section === 'orderStatus') {
          _this10.statusOrderCount = d.status_order_count || [];
        } else if (section === 'sellers') {
          _this10.sellers = d.top_sellers || [];
        } else if (section === 'platform') {
          _this10.platformUsage = d.platform_usage || {
            web: 0,
            android: 0,
            ios: 0
          };
          _this10.totalUsers = (_this10.platformUsage.web || 0) + (_this10.platformUsage.android || 0) + (_this10.platformUsage.ios || 0);
        } else if (section === 'rated') {
          var topRated = d.top_rated_products || [];
          _this10.topRatedProducts = topRated.map(function (c) {
            return {
              name: c.product_name,
              review_count: parseInt(c.review_count || 0),
              rating: parseFloat(c.average_rating || 0.0),
              image: c.image_url || c.image || null
            };
          });
        } else if (section === 'selling') {
          var topSelling = d.top_selling_products || [];
          _this10.topSellingProducts = topSelling.map(function (c) {
            return {
              name: c.product_name,
              sold_count: Math.round(parseFloat(c.total_revenue || 0) / 100),
              total_revenue: c.total_revenue,
              image: c.image_url || c.image || null
            };
          });
        } else {
          _this10.getRecord();
        }
      })["catch"](function (error) {
        console.error('Dashboard error:', error);
      });
    },
    getLatestOrders: function getLatestOrders() {
      var _this11 = this;
      this.isLoading = true;
      var param = {
        "startDate": this.dateRange.startDate != null ? moment__WEBPACK_IMPORTED_MODULE_1___default()(this.dateRange.startDate).format('YYYY-MM-DD') : "",
        "endDate": this.dateRange.endDate != null ? moment__WEBPACK_IMPORTED_MODULE_1___default()(this.dateRange.endDate).format('YYYY-MM-DD') : "",
        "seller": this.seller,
        "status": this.status,
        startDeliveryDate: this.deliveryDateRange.startDate ? moment__WEBPACK_IMPORTED_MODULE_1___default()(this.deliveryDateRange.startDate).format('YYYY-MM-DD') : '',
        endDeliveryDate: this.deliveryDateRange.endDate ? moment__WEBPACK_IMPORTED_MODULE_1___default()(this.deliveryDateRange.endDate).format('YYYY-MM-DD') : ''
      };
      axios__WEBPACK_IMPORTED_MODULE_0___default().get(this.$apiUrl + '/orders', {
        params: param
      }).then(function (response) {
        var data = response.data;
        if (data.status === 1) {
          _this11.filterSellers = response.data.data.sellers;
          _this11.orders = response.data.data.orders.map(function (o) {
            o.order_items = [];
            o.itemsLoading = false;
            return o;
          });
          _this11.orderTotalRows = _this11.orders.length;
          _this11.isLoading = false;
        }
      })["catch"](function (error) {
        _this11.isLoading = false;
        console.error(error);
      });
    },
    deleteOrder: function deleteOrder(index, id) {
      var _this12 = this;
      this.$swal.fire({
        title: __('are_you_sure'),
        text: __('you_want_be_able_to_revert_this'),
        confirmButtonText: __('yes_sure'),
        cancelButtonText: __('cancel'),
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: 'var(--theme-primary-500)',
        cancelButtonColor: 'var(--theme-error-500)'
      }).then(function (result) {
        if (result.value) {
          _this12.isLoading = true;
          var postData = {
            id: id
          };
          axios__WEBPACK_IMPORTED_MODULE_0___default().post(_this12.$apiUrl + '/orders/delete', postData).then(function (response) {
            _this12.isLoading = false;
            var data = response.data;
            _this12.orders.splice(index, 1);
            _this12.showSuccess(data.message);
          });
        }
      });
    },
    toggleOrder: function toggleOrder(itemOrRow) {
      var _this13 = this;
      var item = itemOrRow.item || itemOrRow;
      var isRow = !!itemOrRow.toggleDetails;
      var isShowing = isRow ? itemOrRow.detailsShowing : !!item._showDetails;
      if (!isShowing) {
        this.orders.forEach(function (order) {
          _this13.$set(order, '_showDetails', false);
        });
      }
      if (isRow) {
        itemOrRow.toggleDetails();
      } else {
        this.$set(item, '_showDetails', !isShowing);
      }
      if (item.order_items.length > 0 || item.itemsLoading) {
        return;
      }
      item.itemsLoading = true;
      axios__WEBPACK_IMPORTED_MODULE_0___default().get(this.$apiUrl + '/orders/view/' + item.id).then(function (res) {
        item.order_items = res.data.data.order_items || [];
        item.itemsLoading = false;
      })["catch"](function () {
        item.itemsLoading = false;
      });
    },
    openOrderModal: function openOrderModal(order) {
      var _this14 = this;
      this.selectedOrder = order;
      this.$bvModal.show('order-details-modal');
      if (this.selectedOrder.order_items && this.selectedOrder.order_items.length === 0) {
        this.isModalLoading = true;
        axios__WEBPACK_IMPORTED_MODULE_0___default().get(this.$apiUrl + '/orders/view/' + order.id).then(function (res) {
          _this14.selectedOrder.order_items = res.data.data.order_items || [];
          _this14.isModalLoading = false;
        })["catch"](function () {
          _this14.isModalLoading = false;
        });
      }
    },
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
        9: 'status-received',
        // Pending
        10: 'status-processed',
        // Ready for Pickup
        11: 'status-delivered' // Picked Up
      };
      return classMap[id] || 'status-default';
    },
    formatDateBold: function formatDateBold(date) {
      return moment__WEBPACK_IMPORTED_MODULE_1___default()(date).format('DD MMM YYYY');
    },
    getPeriodLabel: function getPeriodLabel(date) {
      if (!date) return '';
      var hour = moment__WEBPACK_IMPORTED_MODULE_1___default()(date).hour();
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
      return moment__WEBPACK_IMPORTED_MODULE_1___default()(date).format('hh:mm A');
    },
    getStatusLabelById: function getStatusLabelById(val) {
      if (val == null || val === '') return '';
      var id = typeof val === 'number' ? val : parseInt(val, 10);
      if (!isNaN(id)) {
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
        var key = map[id];
        return key ? this.__(key) : String(val);
      }
      return String(val);
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

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Dashboard.vue?vue&type=style&index=0&id=1f79daf6&scoped=true&lang=css":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Dashboard.vue?vue&type=style&index=0&id=1f79daf6&scoped=true&lang=css ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.id, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n/* Modernized styles are now central in global SCSS */\n\n/* Recent orders: view action as a tinted primary tile (same pattern as the Order Status icons) */\n.dash-view-btn[data-v-1f79daf6] {\n    display: inline-flex;\n    align-items: center;\n    justify-content: center;\n    width: 32px;\n    height: 32px;\n    border-radius: var(--ui-radius);\n    color: var(--theme-primary-600);\n    background: color-mix(in srgb, currentColor 12%, transparent);\n    font-size: 16px;\n    text-decoration: none;\n    transition: background-color 0.15s ease;\n}\n.dash-view-btn[data-v-1f79daf6]:hover {\n    color: var(--theme-primary-700);\n    background: color-mix(in srgb, currentColor 20%, transparent);\n}\nbody.theme-dark .dash-view-btn[data-v-1f79daf6],\nbody.theme-dark .dash-view-btn i[data-v-1f79daf6] {\n    color: var(--theme-primary-400) !important;\n}\n\n/* Page never scrolls sideways: long values wrap / truncate inside their cards */\n.dash-page[data-v-1f79daf6] {\n    max-width: 100%;\n    overflow-x: hidden;\n}\n.min-w-0[data-v-1f79daf6] {\n    min-width: 0;\n}\n.dash-welcome-title[data-v-1f79daf6] {\n    color: var(--ui-heading);\n}\n.dash-section-title[data-v-1f79daf6] {\n    font-family: var(--ui-font);\n    font-size: 16px;\n    font-weight: 700;\n    color: var(--ui-heading);\n}\n.dash-value-wrap[data-v-1f79daf6] {\n    overflow-wrap: anywhere;\n    line-height: 1.25;\n}\n.dash-list-title[data-v-1f79daf6] {\n    color: var(--ui-heading);\n}\n.dash-rating[data-v-1f79daf6] {\n    color: var(--theme-warn-500);\n}\n.dash-os-icon[data-v-1f79daf6] {\n    width: 32px;\n    height: 32px;\n    border-radius: 8px;\n    font-size: 14px;\n    /* icon in the status colour, tile tinted from it; follows the theme in light and dark mode */\n    color: var(--os-color);\n    background: color-mix(in srgb, var(--os-color) 14%, transparent);\n}\n\n/* the global dark-mode text reset forces div/i colours with !important; keep the status colour */\nbody.theme-dark .dash-os-icon[data-v-1f79daf6],\nbody.theme-dark .dash-os-icon i[data-v-1f79daf6] {\n    color: var(--os-color) !important;\n}\n.dash-bar-track[data-v-1f79daf6] {\n    height: 6px;\n}\n.dash-bar-track--muted[data-v-1f79daf6] {\n    background-color: var(--ui-surface-muted);\n}\n\n/* Empty / loading state inside a card */\n.dash-empty[data-v-1f79daf6] {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    justify-content: center;\n    text-align: center;\n    flex-grow: 1;\n    padding: 24px 16px;\n    font-size: 13px;\n    color: var(--ui-text-muted);\n}\n.dash-empty i[data-v-1f79daf6] {\n    color: var(--ui-text-subtle);\n    opacity: 0.6;\n}\n\n\n/* Catalog & inventory tiles */\n.dash-cat-tile[data-v-1f79daf6] {\n    color: inherit;\n    box-shadow: none !important; /* flat tiles inside a card (global KPI tile adds a shadow) */\n}\n.dash-cat-tile--link[data-v-1f79daf6]:hover,\n.dash-cat-tile--link[data-v-1f79daf6]:focus {\n    text-decoration: none;\n    border-color: var(--theme-primary-300) !important; /* global tile border is !important */\n}\n.dash-cat-view[data-v-1f79daf6] {\n    display: inline-flex;\n    align-items: center;\n    gap: 4px;\n    font-size: 12px;\n    font-weight: 600;\n    color: var(--ui-text-muted);\n}\n.dash-cat-view i[data-v-1f79daf6],\n.dash-cat-chevron[data-v-1f79daf6] {\n    font-size: 10px;\n    color: var(--ui-text-subtle);\n}\n.dash-cat-tile--link:hover .dash-cat-view[data-v-1f79daf6],\n.dash-cat-tile--link:hover .dash-cat-view i[data-v-1f79daf6],\n.dash-cat-tile--link:hover .dash-cat-chevron[data-v-1f79daf6] {\n    color: var(--theme-primary-600);\n}\n\n/* Customers by platform */\n.dash-platform-total[data-v-1f79daf6] {\n    font-size: 22px;\n    font-weight: 700;\n    line-height: 1.2;\n    color: var(--ui-heading);\n}\n.dash-platform-icon[data-v-1f79daf6] {\n    width: 30px;\n    height: 30px;\n    border-radius: 8px;\n    display: inline-flex;\n    align-items: center;\n    justify-content: center;\n    font-size: 14px;\n    background: var(--ui-primary-soft);\n    color: var(--theme-primary-600);\n}\n.dash-platform-count[data-v-1f79daf6] {\n    font-size: 13px;\n    font-weight: 700;\n    color: var(--ui-heading);\n}\n.dash-platform-count .text-muted[data-v-1f79daf6] {\n    font-weight: 400;\n}\n@media (max-width: 575.98px) {\n.dash-quick-actions[data-v-1f79daf6] {\n        width: 100%;\n}\n.dash-quick-actions > *[data-v-1f79daf6] {\n        flex: 1 1 0;\n        justify-content: center;\n}\n.dash-platform-total[data-v-1f79daf6] {\n        font-size: 20px;\n}\n}\n\n/* \"View Orders\" (secondary action): global hover fills it with primary, keep the label readable */\n.view-order-btn[data-v-1f79daf6]:hover,\n.view-order-btn:hover span[data-v-1f79daf6],\n.view-order-btn:hover i[data-v-1f79daf6] {\n    color: var(--theme-neutral-50) !important; /* beats .btn-light text colour on the filled hover */\n}\n\n/* Recent orders: the table keeps its columns and scrolls inside the card on narrow screens */\n.dash-orders-scroll[data-v-1f79daf6] {\n    overflow-x: auto;\n    -webkit-overflow-scrolling: touch;\n}\n.dash-orders-scroll .figma-order-table[data-v-1f79daf6] {\n    min-width: 880px;\n}\n.dash-orders-scroll .figma-order-table td[data-v-1f79daf6],\n.dash-orders-scroll .figma-order-table th[data-v-1f79daf6] {\n    white-space: nowrap;\n}\n.dash-avatar-soft[data-v-1f79daf6] {\n    background-color: var(--theme-info-50);\n}\n.dash-sold-icon[data-v-1f79daf6] {\n    width: 17px;\n    height: 17px;\n}\n.dash-ext-icon[data-v-1f79daf6] {\n    font-size: 12px;\n}\n.dash-item-thumb[data-v-1f79daf6] {\n    width: 44px;\n    height: 44px;\n    -o-object-fit: cover;\n       object-fit: cover;\n}\n.dash-modal-scroll[data-v-1f79daf6] {\n    max-height: 500px;\n    overflow-y: auto;\n}\n\n/* Sales Overview on phones (<576px). Desktop and tablet are untouched. */\n@media (max-width: 575.98px) {\n    /* Header: title + period select share the first row, the legend drops to a compact\n       second row. The controls wrapper is flattened so its children can be reordered. */\n.sales-header-controls[data-v-1f79daf6] {\n        display: contents;\n}\n.sales-header-controls .figma-select-pill[data-v-1f79daf6] {\n        order: 2;\n        width: auto;\n}\n.sales-header-controls .sales-legend[data-v-1f79daf6] {\n        order: 3;\n        width: 100%;\n}\n\n    /* Fixed y-axis column + scrollable plot. The scroll bar belongs to the plot only. */\n.sales-y-axis[data-v-1f79daf6] {\n        pointer-events: none;\n}\n.sales-chart-scroll[data-v-1f79daf6] {\n        min-width: 0;\n        overflow-y: hidden;\n        -webkit-overflow-scrolling: touch;\n        scrollbar-width: thin;\n        scrollbar-color: var(--theme-neutral-300) transparent;\n}\n.sales-chart-scroll[data-v-1f79daf6]::-webkit-scrollbar {\n        height: 6px;\n}\n.sales-chart-scroll[data-v-1f79daf6]::-webkit-scrollbar-thumb {\n        background: var(--theme-neutral-300);\n        border-radius: 999px;\n}\n}\n\n/* ===== Compact dashboard (second pass) =====\n   Global card / tile rules use \"#main ...\" + !important, so these overrides are scoped under\n   \"#main .dash-page\" to win on specificity. */\n.dash-welcome-title[data-v-1f79daf6] {\n    font-size: 20px;\n    line-height: 1.3;\n}\n#main .dash-page .figma-card > .card-header[data-v-1f79daf6] {\n    min-height: 0 !important;\n    padding: 12px 16px !important;\n}\n#main .dash-page .figma-card > .card-header .figma-select-pill[data-v-1f79daf6] {\n    min-height: 36px !important;\n    height: 36px !important;\n    font-size: 13px !important;\n    font-weight: 500 !important;\n    padding-top: 0 !important;\n    padding-bottom: 0 !important;\n    padding-left: 14px !important;\n    padding-right: 34px !important;\n    line-height: normal !important;\n}\n#main .dash-page .figma-card > .card-body.dash-body[data-v-1f79daf6] {\n    padding: 14px 16px !important;\n}\n#main .dash-page .figma-card > .card-body.dash-body--chart[data-v-1f79daf6] {\n    padding: 4px 12px 8px !important;\n}\n\n/* Today strip: slim 64px tiles with a 36px icon */\n#main .dash-page .figma-kpi-card-v2.dash-tile[data-v-1f79daf6] {\n    min-height: 64px !important;\n    padding: 10px 14px !important;\n}\n\n/* Label wraps (max 2 lines) instead of cutting to \"Today ...\" on narrow screens */\n#main .dash-page .dash-tile-label[data-v-1f79daf6] {\n    display: -webkit-box;\n    -webkit-line-clamp: 2;\n    -webkit-box-orient: vertical;\n    overflow: hidden;\n    white-space: normal;\n    line-height: 1.2;\n}\n@media (max-width: 575.98px) {\n#main .dash-page .figma-kpi-card-v2.dash-tile[data-v-1f79daf6] {\n        padding: 10px !important;\n}\n}\n#main .dash-page .dash-tile .figma-stat-value[data-v-1f79daf6] {\n    font-size: 18px !important;\n    line-height: 1.25;\n}\n#main .dash-page .dash-icon-36[data-v-1f79daf6] {\n    width: 36px !important;\n    height: 36px !important;\n    min-width: 36px;\n    border-radius: 9px !important;\n    font-size: 15px;\n}\n#main .dash-page .dash-icon-32[data-v-1f79daf6] {\n    width: 32px !important;\n    height: 32px !important;\n    min-width: 32px;\n    border-radius: 8px !important;\n    font-size: 14px;\n}\n\n/* Rows of label + count + thin bar (order status, platforms, categories) */\n.dash-os-list[data-v-1f79daf6] {\n    gap: 10px;\n}\n.dash-row-head[data-v-1f79daf6] {\n    margin-bottom: 4px;\n    line-height: 18px;\n}\n#main .dash-page .dash-row-label[data-v-1f79daf6] {\n    font-size: 13px;\n    line-height: 18px;\n}\n#main .dash-page .dash-row-head .figma-order-status-count[data-v-1f79daf6] {\n    font-size: 13px !important;\n    line-height: 18px !important;\n}\n.dash-section-title[data-v-1f79daf6] {\n    font-size: 15px;\n}\n\n/* Business performance: compact horizontal cards (icon left, label, value + trend pill) */\n#main .dash-page .figma-card-white.dash-perf-card[data-v-1f79daf6] {\n    padding: 10px 12px !important;\n}\n.dash-perf-label[data-v-1f79daf6] {\n    font-size: 12px;\n    line-height: 16px;\n    color: var(--ui-text-muted);\n    display: -webkit-box;\n    -webkit-line-clamp: 2;\n    -webkit-box-orient: vertical;\n    overflow: hidden;\n    overflow-wrap: normal;\n    word-break: normal;\n}\n\n/* Phones: icon sits above the text so the label gets the full card width (no mid-word breaks) */\n@media (max-width: 575.98px) {\n.dash-perf-row[data-v-1f79daf6] {\n        flex-direction: column;\n        gap: 6px !important;\n}\n.dash-perf-row > .flex-grow-1[data-v-1f79daf6] {\n        width: 100%;\n}\n}\n.dash-perf-meta[data-v-1f79daf6] {\n    gap: 4px 6px;\n    margin-top: 2px;\n}\n\n/* The trend pill always sits on its own line below the amount, on every card and screen size */\n.dash-perf-meta.d-flex[data-v-1f79daf6] {\n    flex-direction: column;\n    align-items: flex-start !important;\n}\n.dash-perf-value[data-v-1f79daf6] {\n    font-size: 16px;\n    font-weight: 700;\n    color: var(--ui-heading);\n}\n.dash-trend[data-v-1f79daf6] {\n    display: inline-flex;\n    align-items: center;\n    gap: 2px;\n    height: 18px;\n    padding: 0 6px;\n    border-radius: 999px;\n    font-size: 11px;\n    font-weight: 600;\n    white-space: nowrap;\n}\n.dash-trend--up[data-v-1f79daf6] {\n    background: var(--theme-primary-50);\n    color: var(--theme-primary-600);\n}\n.dash-trend--down[data-v-1f79daf6] {\n    background: var(--theme-error-50);\n    color: var(--theme-error-500);\n}\n\n/* Top sales by category: ranked bar list */\n.dash-rank-summary[data-v-1f79daf6] {\n    padding-bottom: 10px;\n    margin-bottom: 12px;\n    border-bottom: 1px dashed var(--ui-border);\n}\n.dash-rank-total[data-v-1f79daf6] {\n    font-size: 20px;\n    font-weight: 700;\n    line-height: 1.2;\n    color: var(--ui-heading);\n    overflow-wrap: anywhere;\n}\n.dash-rank-list[data-v-1f79daf6] {\n    gap: 12px;\n}\n.dash-rank-chip[data-v-1f79daf6] {\n    width: 24px;\n    height: 24px;\n    border-radius: 7px;\n    display: inline-flex;\n    align-items: center;\n    justify-content: center;\n    font-size: 12px;\n    font-weight: 700;\n    background: var(--theme-primary-50);\n    color: var(--theme-primary-700);\n}\n.dash-rank-chip--top[data-v-1f79daf6] {\n    background: var(--theme-primary-500);\n    color: var(--theme-neutral-50);\n}\n.dash-rank-chip--other[data-v-1f79daf6] {\n    background: var(--ui-surface-muted);\n    color: var(--ui-text-muted);\n    font-size: 10px;\n}\n.dash-rank-name[data-v-1f79daf6] {\n    font-size: 13px;\n    font-weight: 600;\n    color: var(--ui-heading);\n}\n.dash-rank-amount[data-v-1f79daf6] {\n    font-size: 13px;\n    font-weight: 700;\n    color: var(--ui-heading);\n}\n.dash-rank-share[data-v-1f79daf6] {\n    font-weight: 400;\n    color: var(--ui-text-muted);\n    margin-left: 2px;\n}\n\n/* Catalog & inventory: 6 compact tiles, 2 per row */\n.dash-cat-grid[data-v-1f79daf6] {\n    margin: -5px;\n}\n.dash-cat-grid > [class*=\"col\"][data-v-1f79daf6] {\n    padding: 5px;\n}\n#main .dash-page .figma-kpi-card-v2.dash-cat-tile[data-v-1f79daf6] {\n    min-height: 56px !important;\n    padding: 8px 10px !important;\n}\n#main .dash-page .dash-cat-tile .figma-stat-value[data-v-1f79daf6] {\n    font-size: 16px !important;\n    line-height: 1.25;\n}\n#main .dash-page .dash-cat-tile .figma-stat-label[data-v-1f79daf6] {\n    font-size: 11px !important;\n}\n\n/* Phones: the whole tile is the link, so drop the chevron to give the label room */\n@media (max-width: 575.98px) {\n.dash-cat-tile .dash-cat-chevron[data-v-1f79daf6] {\n        display: none;\n}\n}\n\n/* The tile is a link already; the \"View\" word only shows when the tile is wide enough */\n@media (min-width: 1200px) and (max-width: 1599.98px), (max-width: 400px) {\n.dash-cat-view-text[data-v-1f79daf6] {\n        display: none;\n}\n}\n\n/* Product / seller lists */\n.dash-list[data-v-1f79daf6] {\n    padding: 0 16px;\n}\n.dash-list-row[data-v-1f79daf6] {\n    padding: 8px 0;\n}\n.dash-list-row[data-v-1f79daf6]:last-child {\n    border-bottom: 0 !important;\n}\n.dash-avatar.figma-avatar-42[data-v-1f79daf6] {\n    width: 36px;\n    height: 36px;\n    border-radius: 9px;\n}\n.dash-list-name[data-v-1f79daf6] {\n    font-size: 13px;\n    font-weight: 600;\n    line-height: 18px;\n}\n.dash-list-amount[data-v-1f79daf6] {\n    font-size: 13px;\n    font-weight: 700;\n}\n.dash-pager--compact[data-v-1f79daf6] {\n    padding: 8px 12px;\n}\n@media (max-width: 575.98px) {\n#main .dash-page .figma-card > .card-header[data-v-1f79daf6] {\n        padding: 10px 12px !important;\n}\n#main .dash-page .figma-card > .card-body.dash-body[data-v-1f79daf6] {\n        padding: 12px !important;\n}\n#main .dash-page .figma-kpi-card-v2.dash-tile[data-v-1f79daf6] {\n        padding: 8px 10px !important;\n        min-height: 58px !important;\n}\n#main .dash-page .dash-tile .figma-stat-value[data-v-1f79daf6] {\n        font-size: 16px !important;\n}\n.dash-list[data-v-1f79daf6] {\n        padding: 0 12px;\n}\n.dash-perf-value[data-v-1f79daf6] {\n        font-size: 15px;\n}\n.dash-rank-total[data-v-1f79daf6] {\n        font-size: 18px;\n}\n}\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Dashboard.vue?vue&type=style&index=0&id=1f79daf6&scoped=true&lang=css":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Dashboard.vue?vue&type=style&index=0&id=1f79daf6&scoped=true&lang=css ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Dashboard_vue_vue_type_style_index_0_id_1f79daf6_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Dashboard.vue?vue&type=style&index=0&id=1f79daf6&scoped=true&lang=css */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Dashboard.vue?vue&type=style&index=0&id=1f79daf6&scoped=true&lang=css");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Dashboard_vue_vue_type_style_index_0_id_1f79daf6_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Dashboard_vue_vue_type_style_index_0_id_1f79daf6_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./resources/js/views/Dashboard.vue":
/*!******************************************!*\
  !*** ./resources/js/views/Dashboard.vue ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Dashboard_vue_vue_type_template_id_1f79daf6_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Dashboard.vue?vue&type=template&id=1f79daf6&scoped=true */ "./resources/js/views/Dashboard.vue?vue&type=template&id=1f79daf6&scoped=true");
/* harmony import */ var _Dashboard_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Dashboard.vue?vue&type=script&lang=js */ "./resources/js/views/Dashboard.vue?vue&type=script&lang=js");
/* harmony import */ var _Dashboard_vue_vue_type_style_index_0_id_1f79daf6_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Dashboard.vue?vue&type=style&index=0&id=1f79daf6&scoped=true&lang=css */ "./resources/js/views/Dashboard.vue?vue&type=style&index=0&id=1f79daf6&scoped=true&lang=css");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _Dashboard_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _Dashboard_vue_vue_type_template_id_1f79daf6_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render,
  _Dashboard_vue_vue_type_template_id_1f79daf6_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "1f79daf6",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/Dashboard.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/views/Dashboard.vue?vue&type=script&lang=js":
/*!******************************************************************!*\
  !*** ./resources/js/views/Dashboard.vue?vue&type=script&lang=js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Dashboard_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Dashboard.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Dashboard.vue?vue&type=script&lang=js");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Dashboard_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/Dashboard.vue?vue&type=style&index=0&id=1f79daf6&scoped=true&lang=css":
/*!**************************************************************************************************!*\
  !*** ./resources/js/views/Dashboard.vue?vue&type=style&index=0&id=1f79daf6&scoped=true&lang=css ***!
  \**************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Dashboard_vue_vue_type_style_index_0_id_1f79daf6_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/style-loader/dist/cjs.js!../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Dashboard.vue?vue&type=style&index=0&id=1f79daf6&scoped=true&lang=css */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Dashboard.vue?vue&type=style&index=0&id=1f79daf6&scoped=true&lang=css");


/***/ }),

/***/ "./resources/js/views/Dashboard.vue?vue&type=template&id=1f79daf6&scoped=true":
/*!************************************************************************************!*\
  !*** ./resources/js/views/Dashboard.vue?vue&type=template&id=1f79daf6&scoped=true ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Dashboard_vue_vue_type_template_id_1f79daf6_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   staticRenderFns: () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Dashboard_vue_vue_type_template_id_1f79daf6_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Dashboard_vue_vue_type_template_id_1f79daf6_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Dashboard.vue?vue&type=template&id=1f79daf6&scoped=true */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Dashboard.vue?vue&type=template&id=1f79daf6&scoped=true");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Dashboard.vue?vue&type=template&id=1f79daf6&scoped=true":
/*!***************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Dashboard.vue?vue&type=template&id=1f79daf6&scoped=true ***!
  \***************************************************************************************************************************************************************************************************************************/
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
  return _c(
    "div",
    { staticClass: "p-2 dash-page" },
    [
      _c(
        "div",
        {
          staticClass:
            "page-heading mb-3 d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between gap-2",
        },
        [
          _c("div", { staticClass: "min-w-0" }, [
            _c(
              "h2",
              { staticClass: "h4 font-weight-bold dash-welcome-title mb-0" },
              [_vm._v(_vm._s(_vm.__("Welcome")) + ", " + _vm._s(_vm.userName))]
            ),
            _vm._v(" "),
            _c("p", { staticClass: "text-muted small mb-0" }, [
              _vm._v(
                _vm._s(_vm.greetingMessage) + " • " + _vm._s(_vm.formattedDate)
              ),
            ]),
          ]),
          _vm._v(" "),
          _vm.$can("product_create") || _vm.$can("order_list")
            ? _c(
                "div",
                {
                  staticClass:
                    "d-flex flex-wrap align-items-center gap-2 dash-quick-actions",
                },
                [
                  _vm.$can("order_list")
                    ? _c(
                        "router-link",
                        {
                          staticClass: "btn-figma-columns text-decoration-none",
                          attrs: { to: "/orders" },
                        },
                        [
                          _c("i", { staticClass: "fa fa-shopping-cart" }),
                          _vm._v(" "),
                          _c("span", [_vm._v(_vm._s(_vm.__("view_orders")))]),
                        ]
                      )
                    : _vm._e(),
                  _vm._v(" "),
                  _vm.$can("product_create")
                    ? _c(
                        "router-link",
                        {
                          staticClass: "btn-figma-filter text-decoration-none",
                          attrs: { to: "/manage_products/create" },
                        },
                        [
                          _c("i", { staticClass: "fa fa-plus" }),
                          _vm._v(" "),
                          _c("span", [_vm._v(_vm._s(_vm.__("add_product")))]),
                        ]
                      )
                    : _vm._e(),
                ],
                1
              )
            : _vm._e(),
        ]
      ),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "row g-3 mb-3" },
        _vm._l(_vm.todayStats, function (stat, index) {
          return _c(
            "div",
            { key: "today-" + index, staticClass: "col-6 col-md-3" },
            [
              _c(
                "div",
                { staticClass: "figma-kpi-card-v2 dash-tile w-100 h-100" },
                [
                  _c(
                    "div",
                    { staticClass: "d-flex align-items-center gap-2 min-w-0" },
                    [
                      _c(
                        "div",
                        {
                          staticClass: "figma-stat-icon-box dash-icon-36",
                          class: stat.iconBgClass,
                        },
                        [
                          stat.icon
                            ? _c("base-icon", {
                                attrs: {
                                  name: stat.icon,
                                  width: "20",
                                  height: "20",
                                },
                              })
                            : _c("i", { class: stat.iconClass }),
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "div",
                        {
                          staticClass: "d-flex flex-column text-start min-w-0",
                        },
                        [
                          _c(
                            "span",
                            {
                              staticClass:
                                "figma-stat-label mb-0 dash-tile-label",
                            },
                            [_vm._v(_vm._s(stat.label))]
                          ),
                          _vm._v(" "),
                          _c(
                            "h4",
                            {
                              staticClass:
                                "figma-stat-value mb-0 dash-value-wrap",
                            },
                            [_vm._v(_vm._s(stat.value))]
                          ),
                        ]
                      ),
                    ]
                  ),
                ]
              ),
            ]
          )
        }),
        0
      ),
      _vm._v(" "),
      _c("div", { staticClass: "row g-3 mb-3" }, [
        _c("div", { staticClass: "col-12 col-xl-8" }, [
          _c(
            "div",
            {
              staticClass:
                "card border rounded-4 h-100 mb-0 overflow-hidden figma-card",
            },
            [
              _c(
                "div",
                {
                  staticClass:
                    "card-header d-flex align-items-center justify-content-between flex-wrap gap-2",
                },
                [
                  _c("h4", { staticClass: "h6 mb-0" }, [
                    _vm._v(_vm._s(_vm.__("sales_overview"))),
                  ]),
                  _vm._v(" "),
                  _c(
                    "div",
                    {
                      staticClass:
                        "d-flex align-items-center gap-3 sales-header-controls",
                    },
                    [
                      _c(
                        "div",
                        {
                          staticClass:
                            "d-flex align-items-center gap-3 text-muted small sales-legend",
                        },
                        [
                          _c(
                            "div",
                            { staticClass: "d-flex align-items-center gap-2" },
                            [
                              _c("span", { staticClass: "dot-sm bg-primary" }),
                              _vm._v(" "),
                              _c("span", { staticClass: "text-capitalize" }, [
                                _vm._v(_vm._s(_vm.__("orders"))),
                              ]),
                            ]
                          ),
                          _vm._v(" "),
                          _c(
                            "div",
                            { staticClass: "d-flex align-items-center gap-2" },
                            [
                              _c("span", {
                                staticClass: "dot-sm bg-light-primary",
                              }),
                              _vm._v(" "),
                              _c("span", { staticClass: "text-capitalize" }, [
                                _vm._v(_vm._s(_vm.__("revenue"))),
                              ]),
                            ]
                          ),
                        ]
                      ),
                      _vm._v(" "),
                      _c(
                        "select",
                        {
                          directives: [
                            {
                              name: "model",
                              rawName: "v-model",
                              value: _vm.salesPeriod,
                              expression: "salesPeriod",
                            },
                          ],
                          staticClass:
                            "form-select form-select-sm figma-select-pill",
                          on: {
                            change: [
                              function ($event) {
                                var $$selectedVal = Array.prototype.filter
                                  .call($event.target.options, function (o) {
                                    return o.selected
                                  })
                                  .map(function (o) {
                                    var val = "_value" in o ? o._value : o.value
                                    return val
                                  })
                                _vm.salesPeriod = $event.target.multiple
                                  ? $$selectedVal
                                  : $$selectedVal[0]
                              },
                              _vm.updateSalesChart,
                            ],
                          },
                        },
                        [
                          _c("option", { attrs: { value: "yearly" } }, [
                            _vm._v(_vm._s(_vm.__("yearly"))),
                          ]),
                          _vm._v(" "),
                          _c("option", { attrs: { value: "monthly" } }, [
                            _vm._v(_vm._s(_vm.__("daily"))),
                          ]),
                          _vm._v(" "),
                          _c("option", { attrs: { value: "weekly" } }, [
                            _vm._v(_vm._s(_vm.__("weekly"))),
                          ]),
                        ]
                      ),
                    ]
                  ),
                ]
              ),
              _vm._v(" "),
              _c(
                "div",
                { staticClass: "card-body dash-body dash-body--chart" },
                [
                  !_vm.isPhone
                    ? _c("apexcharts", {
                        ref: "salesChart",
                        attrs: {
                          width: "100%",
                          height: _vm.salesChartHeight,
                          type: "bar",
                          options: _vm.salesChartOptions,
                          series: _vm.salesChartSeries,
                        },
                      })
                    : _c(
                        "div",
                        {
                          staticClass:
                            "d-flex w-100 overflow-hidden sales-chart-wrapper",
                        },
                        [
                          _c(
                            "div",
                            {
                              staticClass: "flex-shrink-0 sales-y-axis",
                              style: { width: _vm.salesAxisWidth + "px" },
                            },
                            [
                              _c("apexcharts", {
                                attrs: {
                                  width: _vm.salesAxisWidth,
                                  height: _vm.salesChartHeight,
                                  type: "bar",
                                  options: _vm.salesAxisChartOptions,
                                  series: _vm.salesChartSeries,
                                },
                              }),
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _c(
                            "div",
                            {
                              staticClass:
                                "flex-grow-1 overflow-auto sales-chart-scroll",
                            },
                            [
                              _c(
                                "div",
                                {
                                  staticClass: "sales-chart-inner",
                                  style: {
                                    minWidth: _vm.salesChartMinWidth + "px",
                                  },
                                },
                                [
                                  _c("apexcharts", {
                                    ref: "salesChart",
                                    attrs: {
                                      width: "100%",
                                      height: _vm.salesChartHeight,
                                      type: "bar",
                                      options: _vm.salesChartOptions,
                                      series: _vm.salesChartSeries,
                                    },
                                  }),
                                ],
                                1
                              ),
                            ]
                          ),
                        ]
                      ),
                ],
                1
              ),
            ]
          ),
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "col-12 col-xl-4" }, [
          _c(
            "div",
            { staticClass: "card border rounded-4 h-100 mb-0 figma-card" },
            [
              _c(
                "div",
                {
                  staticClass:
                    "card-header d-flex align-items-center justify-content-between flex-wrap gap-2",
                },
                [
                  _c("h4", { staticClass: "h6 mb-0" }, [
                    _vm._v(_vm._s(_vm.__("order_status"))),
                  ]),
                  _vm._v(" "),
                  _c(
                    "select",
                    {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: _vm.orderStatusPeriod,
                          expression: "orderStatusPeriod",
                        },
                      ],
                      staticClass:
                        "form-select form-select-sm figma-select-pill",
                      on: {
                        change: [
                          function ($event) {
                            var $$selectedVal = Array.prototype.filter
                              .call($event.target.options, function (o) {
                                return o.selected
                              })
                              .map(function (o) {
                                var val = "_value" in o ? o._value : o.value
                                return val
                              })
                            _vm.orderStatusPeriod = $event.target.multiple
                              ? $$selectedVal
                              : $$selectedVal[0]
                          },
                          function ($event) {
                            return _vm.mockDataRefresh("orderStatus")
                          },
                        ],
                      },
                    },
                    [
                      _c("option", { attrs: { value: "yearly" } }, [
                        _vm._v(_vm._s(_vm.__("yearly"))),
                      ]),
                      _vm._v(" "),
                      _c("option", { attrs: { value: "monthly" } }, [
                        _vm._v(_vm._s(_vm.__("monthly"))),
                      ]),
                    ]
                  ),
                ]
              ),
              _vm._v(" "),
              _c(
                "div",
                {
                  staticClass:
                    "card-body dash-body d-flex flex-column justify-content-center",
                },
                [
                  _vm.orderStatusItems.length
                    ? _c(
                        "div",
                        { staticClass: "d-flex flex-column dash-os-list" },
                        _vm._l(_vm.orderStatusItems, function (item, idx) {
                          return _c(
                            "div",
                            {
                              key: "os-" + idx,
                              staticClass: "d-flex align-items-center gap-2",
                            },
                            [
                              _c(
                                "div",
                                {
                                  staticClass:
                                    "d-flex align-items-center justify-content-center flex-shrink-0 dash-os-icon",
                                  style: { "--os-color": item.color },
                                },
                                [_c("i", { class: item.iconClass })]
                              ),
                              _vm._v(" "),
                              _c(
                                "div",
                                { staticClass: "flex-grow-1 min-w-0" },
                                [
                                  _c(
                                    "div",
                                    {
                                      staticClass:
                                        "d-flex justify-content-between align-items-center dash-row-head",
                                    },
                                    [
                                      _c(
                                        "span",
                                        {
                                          staticClass:
                                            "figma-order-status-label dash-row-label text-truncate",
                                        },
                                        [_vm._v(_vm._s(item.label))]
                                      ),
                                      _vm._v(" "),
                                      _c(
                                        "span",
                                        {
                                          staticClass:
                                            "figma-order-status-count mb-0",
                                        },
                                        [_vm._v(_vm._s(item.count))]
                                      ),
                                    ]
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "div",
                                    {
                                      staticClass:
                                        "rounded-pill overflow-hidden dash-bar-track",
                                      style: { backgroundColor: item.bgColor },
                                    },
                                    [
                                      _c("div", {
                                        staticClass:
                                          "h-100 rounded-pill transition-all",
                                        style: {
                                          width: item.percent + "%",
                                          backgroundColor: item.color,
                                        },
                                      }),
                                    ]
                                  ),
                                ]
                              ),
                            ]
                          )
                        }),
                        0
                      )
                    : _vm.recordLoading
                    ? _c(
                        "div",
                        { staticClass: "dash-empty" },
                        [
                          _c("b-spinner", {
                            attrs: { small: "", variant: "primary" },
                          }),
                        ],
                        1
                      )
                    : _c("div", { staticClass: "dash-empty" }, [
                        _c("i", { staticClass: "fa fa-inbox fa-2x mb-2" }),
                        _vm._v(" "),
                        _c("span", [_vm._v(_vm._s(_vm.__("No data found")))]),
                      ]),
                ]
              ),
            ]
          ),
        ]),
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "mb-3" }, [
        _c("h5", { staticClass: "dash-section-title mb-2" }, [
          _vm._v(_vm._s(_vm.__("business_performance"))),
        ]),
        _vm._v(" "),
        _c(
          "div",
          { staticClass: "row g-3" },
          _vm._l(_vm.summaryStats, function (stat, index) {
            return _c(
              "div",
              { key: "sum-" + index, staticClass: "col-6 col-md-4 col-xl-2" },
              [
                _c(
                  "div",
                  {
                    staticClass:
                      "card border rounded-4 h-100 mb-0 figma-card-white dash-perf-card",
                  },
                  [
                    _c(
                      "div",
                      {
                        staticClass:
                          "d-flex align-items-start gap-2 min-w-0 dash-perf-row",
                      },
                      [
                        _c(
                          "div",
                          {
                            staticClass: "figma-stat-icon-box dash-icon-32",
                            class: stat.iconBgClass,
                          },
                          [
                            stat.icon
                              ? _c("base-icon", {
                                  attrs: {
                                    name: stat.icon,
                                    width: "18",
                                    height: "18",
                                  },
                                })
                              : _c("i", {
                                  class: [stat.iconClass, stat.iconTextClass],
                                }),
                          ],
                          1
                        ),
                        _vm._v(" "),
                        _c(
                          "div",
                          {
                            staticClass:
                              "d-flex flex-column flex-grow-1 min-w-0",
                          },
                          [
                            _c(
                              "span",
                              {
                                staticClass: "dash-perf-label text-capitalize",
                              },
                              [_vm._v(_vm._s(stat.label))]
                            ),
                            _vm._v(" "),
                            _c(
                              "div",
                              {
                                staticClass:
                                  "d-flex align-items-center flex-wrap dash-perf-meta",
                              },
                              [
                                _c(
                                  "span",
                                  {
                                    staticClass:
                                      "dash-perf-value dash-value-wrap",
                                  },
                                  [_vm._v(_vm._s(stat.value))]
                                ),
                                _vm._v(" "),
                                stat.trendValue
                                  ? _c(
                                      "span",
                                      {
                                        staticClass: "dash-trend",
                                        class: stat.trendUp
                                          ? "dash-trend--up"
                                          : "dash-trend--down",
                                      },
                                      [
                                        _c("base-icon", {
                                          attrs: {
                                            name: stat.trendUp
                                              ? "TrendUp"
                                              : "TrendDown",
                                            width: "12",
                                            height: "12",
                                          },
                                        }),
                                        _vm._v(" "),
                                        _c("span", [
                                          _vm._v(_vm._s(stat.trendValue)),
                                        ]),
                                      ],
                                      1
                                    )
                                  : _vm._e(),
                              ]
                            ),
                          ]
                        ),
                      ]
                    ),
                  ]
                ),
              ]
            )
          }),
          0
        ),
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "row g-3 mb-3" }, [
        _c("div", { staticClass: "col-12 col-lg-6 col-xl-4" }, [
          _c(
            "div",
            { staticClass: "card border rounded-4 h-100 mb-0 figma-card" },
            [
              _c(
                "div",
                {
                  staticClass:
                    "card-header d-flex align-items-center justify-content-between flex-wrap gap-2",
                },
                [
                  _c("h4", { staticClass: "h6 mb-0" }, [
                    _vm._v(
                      "\n                        " +
                        _vm._s(_vm.__("top_sales_by_category")) +
                        "\n                        "
                    ),
                    _c(
                      "span",
                      {
                        staticClass: "text-muted small font-weight-normal ms-1",
                      },
                      [
                        _vm._v(
                          "(" +
                            _vm._s(_vm.categoryChartLabels.length) +
                            " " +
                            _vm._s(_vm.__("categories")) +
                            ")"
                        ),
                      ]
                    ),
                  ]),
                  _vm._v(" "),
                  _c(
                    "select",
                    {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: _vm.categoryPeriod,
                          expression: "categoryPeriod",
                        },
                      ],
                      staticClass:
                        "form-select form-select-sm figma-select-pill",
                      on: {
                        change: [
                          function ($event) {
                            var $$selectedVal = Array.prototype.filter
                              .call($event.target.options, function (o) {
                                return o.selected
                              })
                              .map(function (o) {
                                var val = "_value" in o ? o._value : o.value
                                return val
                              })
                            _vm.categoryPeriod = $event.target.multiple
                              ? $$selectedVal
                              : $$selectedVal[0]
                          },
                          function ($event) {
                            return _vm.mockDataRefresh("category")
                          },
                        ],
                      },
                    },
                    [
                      _c("option", { attrs: { value: "yearly" } }, [
                        _vm._v(_vm._s(_vm.__("yearly"))),
                      ]),
                      _vm._v(" "),
                      _c("option", { attrs: { value: "monthly" } }, [
                        _vm._v(_vm._s(_vm.__("monthly"))),
                      ]),
                    ]
                  ),
                ]
              ),
              _vm._v(" "),
              _c(
                "div",
                { staticClass: "card-body dash-body d-flex flex-column" },
                [
                  _vm.categoryRanked.length
                    ? [
                        _c(
                          "div",
                          {
                            staticClass:
                              "d-flex align-items-baseline justify-content-between gap-2 dash-rank-summary",
                          },
                          [
                            _c(
                              "span",
                              { staticClass: "figma-stat-label mb-0" },
                              [_vm._v(_vm._s(_vm.__("total_sales")))]
                            ),
                            _vm._v(" "),
                            _c("span", { staticClass: "dash-rank-total" }, [
                              _vm._v(
                                _vm._s(_vm.$currency) +
                                  _vm._s(
                                    _vm.formatNumber(_vm.categoryTotalSales)
                                  )
                              ),
                            ]),
                          ]
                        ),
                        _vm._v(" "),
                        _c(
                          "div",
                          { staticClass: "d-flex flex-column dash-rank-list" },
                          _vm._l(_vm.categoryRanked, function (item) {
                            return _c(
                              "div",
                              {
                                key: "cat-" + item.key,
                                staticClass:
                                  "d-flex align-items-center gap-2 min-w-0",
                              },
                              [
                                _c(
                                  "span",
                                  {
                                    staticClass: "dash-rank-chip flex-shrink-0",
                                    class: {
                                      "dash-rank-chip--top": item.rank === 1,
                                      "dash-rank-chip--other": item.isOther,
                                    },
                                  },
                                  [
                                    item.isOther
                                      ? _c("i", {
                                          staticClass: "fa fa-ellipsis-h",
                                        })
                                      : [_vm._v(_vm._s(item.rank))],
                                  ],
                                  2
                                ),
                                _vm._v(" "),
                                _c(
                                  "div",
                                  { staticClass: "flex-grow-1 min-w-0" },
                                  [
                                    _c(
                                      "div",
                                      {
                                        staticClass:
                                          "d-flex justify-content-between align-items-center gap-2 dash-row-head",
                                      },
                                      [
                                        _c(
                                          "span",
                                          {
                                            staticClass:
                                              "dash-rank-name text-truncate",
                                            class: {
                                              "text-capitalize": item.isOther,
                                            },
                                          },
                                          [_vm._v(_vm._s(item.name))]
                                        ),
                                        _vm._v(" "),
                                        _c(
                                          "span",
                                          {
                                            staticClass:
                                              "dash-rank-amount flex-shrink-0",
                                          },
                                          [
                                            _vm._v(_vm._s(item.value) + " "),
                                            _c(
                                              "span",
                                              {
                                                staticClass: "dash-rank-share",
                                              },
                                              [_vm._v(_vm._s(item.share) + "%")]
                                            ),
                                          ]
                                        ),
                                      ]
                                    ),
                                    _vm._v(" "),
                                    _c(
                                      "div",
                                      {
                                        staticClass:
                                          "rounded-pill overflow-hidden dash-bar-track dash-bar-track--muted",
                                      },
                                      [
                                        _c("div", {
                                          staticClass:
                                            "h-100 rounded-pill transition-all",
                                          style: {
                                            width: item.share + "%",
                                            backgroundColor: item.color,
                                          },
                                        }),
                                      ]
                                    ),
                                  ]
                                ),
                              ]
                            )
                          }),
                          0
                        ),
                      ]
                    : _vm.recordLoading
                    ? _c(
                        "div",
                        { staticClass: "dash-empty" },
                        [
                          _c("b-spinner", {
                            attrs: { small: "", variant: "primary" },
                          }),
                        ],
                        1
                      )
                    : _c("div", { staticClass: "dash-empty" }, [
                        _c("i", { staticClass: "fa fa-chart-bar fa-2x mb-2" }),
                        _vm._v(" "),
                        _c("span", [_vm._v(_vm._s(_vm.__("No data found")))]),
                      ]),
                ],
                2
              ),
            ]
          ),
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "col-12 col-lg-6 col-xl-4" }, [
          _c(
            "div",
            { staticClass: "card border rounded-4 h-100 mb-0 figma-card" },
            [
              _c(
                "div",
                {
                  staticClass:
                    "card-header d-flex align-items-center justify-content-between flex-wrap gap-2",
                },
                [
                  _c("h4", { staticClass: "h6 mb-0" }, [
                    _vm._v(_vm._s(_vm.__("catalog_inventory"))),
                  ]),
                ]
              ),
              _vm._v(" "),
              _c("div", { staticClass: "card-body dash-body" }, [
                _c(
                  "div",
                  { staticClass: "row dash-cat-grid" },
                  _vm._l(_vm.catalogTiles, function (tile) {
                    return _c(
                      "div",
                      { key: "cat-tile-" + tile.key, staticClass: "col-6" },
                      [
                        _c(
                          tile.to ? "router-link" : "div",
                          _vm._b(
                            {
                              tag: "component",
                              staticClass:
                                "figma-kpi-card-v2 w-100 h-100 text-decoration-none dash-cat-tile",
                              class: [
                                tile.tintClass,
                                { "dash-cat-tile--link": !!tile.to },
                              ],
                            },
                            "component",
                            tile.to ? { to: tile.to } : {},
                            false
                          ),
                          [
                            _c(
                              "div",
                              {
                                staticClass:
                                  "d-flex align-items-center gap-2 w-100 min-w-0",
                              },
                              [
                                _c(
                                  "div",
                                  {
                                    staticClass:
                                      "figma-stat-icon-box figma-kpi-icon-v2 dash-icon-32",
                                    class: tile.iconBgClass,
                                  },
                                  [_c("i", { class: tile.iconClass })]
                                ),
                                _vm._v(" "),
                                _c(
                                  "div",
                                  {
                                    staticClass:
                                      "d-flex flex-column text-start flex-grow-1 min-w-0",
                                  },
                                  [
                                    _c(
                                      "span",
                                      {
                                        staticClass:
                                          "figma-stat-label mb-0 dash-tile-label",
                                      },
                                      [_vm._v(_vm._s(tile.label))]
                                    ),
                                    _vm._v(" "),
                                    _c(
                                      "h4",
                                      {
                                        staticClass:
                                          "figma-stat-value mb-0 dash-value-wrap",
                                      },
                                      [_vm._v(_vm._s(tile.value))]
                                    ),
                                  ]
                                ),
                                _vm._v(" "),
                                tile.to && tile.showView
                                  ? _c(
                                      "span",
                                      {
                                        staticClass:
                                          "dash-cat-view flex-shrink-0",
                                      },
                                      [
                                        _c(
                                          "span",
                                          { staticClass: "dash-cat-view-text" },
                                          [_vm._v(_vm._s(_vm.__("view")))]
                                        ),
                                        _vm._v(" "),
                                        _c("i", {
                                          staticClass: "fa fa-chevron-right",
                                        }),
                                      ]
                                    )
                                  : tile.to
                                  ? _c("i", {
                                      staticClass:
                                        "fa fa-chevron-right dash-cat-chevron flex-shrink-0",
                                    })
                                  : _vm._e(),
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
              ]),
            ]
          ),
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "col-12 col-xl-4" }, [
          _c(
            "div",
            { staticClass: "card border rounded-4 h-100 mb-0 figma-card" },
            [
              _c(
                "div",
                {
                  staticClass:
                    "card-header d-flex align-items-center justify-content-between flex-wrap gap-2",
                },
                [
                  _c("h4", { staticClass: "h6 mb-0" }, [
                    _vm._v(_vm._s(_vm.__("customers_by_platform"))),
                  ]),
                  _vm._v(" "),
                  _c(
                    "select",
                    {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: _vm.platformPeriod,
                          expression: "platformPeriod",
                        },
                      ],
                      staticClass:
                        "form-select form-select-sm figma-select-pill",
                      on: {
                        change: [
                          function ($event) {
                            var $$selectedVal = Array.prototype.filter
                              .call($event.target.options, function (o) {
                                return o.selected
                              })
                              .map(function (o) {
                                var val = "_value" in o ? o._value : o.value
                                return val
                              })
                            _vm.platformPeriod = $event.target.multiple
                              ? $$selectedVal
                              : $$selectedVal[0]
                          },
                          function ($event) {
                            return _vm.mockDataRefresh("platform")
                          },
                        ],
                      },
                    },
                    [
                      _c("option", { attrs: { value: "yearly" } }, [
                        _vm._v(_vm._s(_vm.__("yearly"))),
                      ]),
                      _vm._v(" "),
                      _c("option", { attrs: { value: "monthly" } }, [
                        _vm._v(_vm._s(_vm.__("monthly"))),
                      ]),
                    ]
                  ),
                ]
              ),
              _vm._v(" "),
              _c(
                "div",
                { staticClass: "card-body dash-body d-flex flex-column" },
                [
                  _c(
                    "div",
                    {
                      staticClass:
                        "d-flex align-items-baseline justify-content-between gap-2 dash-rank-summary",
                    },
                    [
                      _c("span", { staticClass: "figma-stat-label mb-0" }, [
                        _vm._v(_vm._s(_vm.__("Total Users"))),
                      ]),
                      _vm._v(" "),
                      _c("span", { staticClass: "dash-platform-total" }, [
                        _vm._v(_vm._s(_vm.formatNumber(_vm.totalUsers))),
                      ]),
                    ]
                  ),
                  _vm._v(" "),
                  _c(
                    "div",
                    { staticClass: "d-flex flex-column dash-os-list" },
                    _vm._l(_vm.platformItems, function (p) {
                      return _c(
                        "div",
                        {
                          key: "plat-" + p.key,
                          staticClass: "d-flex align-items-center gap-2",
                        },
                        [
                          _c(
                            "div",
                            { staticClass: "dash-platform-icon flex-shrink-0" },
                            [_c("i", { class: p.iconClass })]
                          ),
                          _vm._v(" "),
                          _c("div", { staticClass: "flex-grow-1 min-w-0" }, [
                            _c(
                              "div",
                              {
                                staticClass:
                                  "d-flex justify-content-between align-items-center gap-2 dash-row-head",
                              },
                              [
                                _c(
                                  "span",
                                  {
                                    staticClass:
                                      "figma-order-status-label dash-row-label text-truncate",
                                  },
                                  [_vm._v(_vm._s(p.label))]
                                ),
                                _vm._v(" "),
                                _c(
                                  "span",
                                  {
                                    staticClass:
                                      "dash-platform-count flex-shrink-0",
                                  },
                                  [
                                    _vm._v(_vm._s(p.count) + " "),
                                    _c("span", { staticClass: "text-muted" }, [
                                      _vm._v("· " + _vm._s(p.percent) + "%"),
                                    ]),
                                  ]
                                ),
                              ]
                            ),
                            _vm._v(" "),
                            _c(
                              "div",
                              {
                                staticClass:
                                  "rounded-pill overflow-hidden dash-bar-track dash-bar-track--muted",
                              },
                              [
                                _c("div", {
                                  staticClass:
                                    "h-100 rounded-pill transition-all",
                                  style: {
                                    width: p.percent + "%",
                                    backgroundColor: p.color,
                                  },
                                }),
                              ]
                            ),
                          ]),
                        ]
                      )
                    }),
                    0
                  ),
                ]
              ),
            ]
          ),
        ]),
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "row g-3 mb-3" }, [
        _c("div", { staticClass: "col-12 col-lg-6 col-xl-4" }, [
          _c(
            "div",
            { staticClass: "card border rounded-4 h-100 mb-0 figma-card" },
            [
              _c(
                "div",
                {
                  staticClass:
                    "card-header d-flex align-items-center justify-content-between flex-wrap gap-2",
                },
                [
                  _c("h4", { staticClass: "h6 mb-0" }, [
                    _vm._v(_vm._s(_vm.__("top_selling_products"))),
                  ]),
                  _vm._v(" "),
                  _c(
                    "select",
                    {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: _vm.sellingPeriod,
                          expression: "sellingPeriod",
                        },
                      ],
                      staticClass:
                        "form-select form-select-sm figma-select-pill",
                      on: {
                        change: [
                          function ($event) {
                            var $$selectedVal = Array.prototype.filter
                              .call($event.target.options, function (o) {
                                return o.selected
                              })
                              .map(function (o) {
                                var val = "_value" in o ? o._value : o.value
                                return val
                              })
                            _vm.sellingPeriod = $event.target.multiple
                              ? $$selectedVal
                              : $$selectedVal[0]
                          },
                          function ($event) {
                            return _vm.mockDataRefresh("selling")
                          },
                        ],
                      },
                    },
                    [
                      _c("option", { attrs: { value: "yearly" } }, [
                        _vm._v(_vm._s(_vm.__("yearly"))),
                      ]),
                      _vm._v(" "),
                      _c("option", { attrs: { value: "monthly" } }, [
                        _vm._v(_vm._s(_vm.__("monthly"))),
                      ]),
                    ]
                  ),
                ]
              ),
              _vm._v(" "),
              _c("div", { staticClass: "card-body p-0 d-flex flex-column" }, [
                _vm.paginatedSellingProducts.length
                  ? _c(
                      "div",
                      { staticClass: "dash-list" },
                      _vm._l(
                        _vm.paginatedSellingProducts,
                        function (prod, idx) {
                          return _c(
                            "div",
                            {
                              key: "selling-" + idx,
                              staticClass:
                                "d-flex align-items-center gap-2 border-bottom figma-hover-light dash-list-row",
                            },
                            [
                              _c(
                                "div",
                                {
                                  staticClass:
                                    "figma-avatar-42 dash-avatar overflow-hidden dash-avatar-soft flex-shrink-0",
                                },
                                [
                                  prod.image
                                    ? _c("img", {
                                        staticClass:
                                          "w-100 h-100 object-fit-cover",
                                        attrs: { src: prod.image, alt: "" },
                                      })
                                    : _vm._e(),
                                ]
                              ),
                              _vm._v(" "),
                              _c(
                                "div",
                                {
                                  staticClass: "flex-grow-1 text-start min-w-0",
                                },
                                [
                                  _c(
                                    "h6",
                                    {
                                      staticClass:
                                        "dash-list-title dash-list-name mb-0 text-truncate",
                                    },
                                    [
                                      _vm._v(
                                        _vm._s(_vm.getDisplayName(prod.name))
                                      ),
                                    ]
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "div",
                                    {
                                      staticClass:
                                        "d-flex align-items-center gap-1",
                                    },
                                    [
                                      _c("img", {
                                        staticClass: "dash-sold-icon",
                                        attrs: {
                                          src:
                                            _vm.$baseUrl +
                                            "/images/icons/sold.svg",
                                          alt: "",
                                        },
                                      }),
                                      _vm._v(" "),
                                      _c(
                                        "span",
                                        {
                                          staticClass: "text-muted extra-small",
                                        },
                                        [
                                          _vm._v(
                                            _vm._s(_vm.__("sold")) +
                                              " : " +
                                              _vm._s(
                                                _vm.formatNumber(
                                                  prod.sold_count || 0
                                                )
                                              )
                                          ),
                                        ]
                                      ),
                                    ]
                                  ),
                                ]
                              ),
                              _vm._v(" "),
                              _c(
                                "span",
                                {
                                  staticClass:
                                    "dash-list-title dash-list-amount flex-shrink-0",
                                },
                                [
                                  _vm._v(
                                    _vm._s(_vm.$currency) +
                                      _vm._s(
                                        _vm.formatNumber(
                                          prod.total_revenue || 0
                                        )
                                      )
                                  ),
                                ]
                              ),
                            ]
                          )
                        }
                      ),
                      0
                    )
                  : _vm.recordLoading
                  ? _c(
                      "div",
                      { staticClass: "dash-empty" },
                      [
                        _c("b-spinner", {
                          attrs: { small: "", variant: "primary" },
                        }),
                      ],
                      1
                    )
                  : _c("div", { staticClass: "dash-empty" }, [
                      _c("i", { staticClass: "fa fa-box-open fa-2x mb-2" }),
                      _vm._v(" "),
                      _c("span", [_vm._v(_vm._s(_vm.__("No data found")))]),
                    ]),
                _vm._v(" "),
                _vm.topSellingProducts.length
                  ? _c(
                      "div",
                      {
                        staticClass:
                          "d-flex justify-content-between align-items-center flex-wrap gap-2 mt-auto border-top bg-light-soft rounded-bottom-4 dash-pager dash-pager--compact",
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
                                  _vm.sellingPage = 1
                                },
                              },
                              model: {
                                value: _vm.sellingPerPage,
                                callback: function ($$v) {
                                  _vm.sellingPerPage = $$v
                                },
                                expression: "sellingPerPage",
                              },
                            }),
                          ],
                          1
                        ),
                        _vm._v(" "),
                        _c("b-pagination", {
                          staticClass: "figma-pagination mb-0",
                          attrs: {
                            "total-rows": _vm.topSellingProducts.length,
                            "per-page": _vm.sellingPerPage,
                            align: "right",
                            limit: 3,
                            "hide-goto-end-buttons": "",
                            "hide-ellipsis": "",
                            "prev-text": "<",
                            "next-text": ">",
                          },
                          model: {
                            value: _vm.sellingPage,
                            callback: function ($$v) {
                              _vm.sellingPage = $$v
                            },
                            expression: "sellingPage",
                          },
                        }),
                      ],
                      1
                    )
                  : _vm._e(),
              ]),
            ]
          ),
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "col-12 col-lg-6 col-xl-4" }, [
          _c(
            "div",
            { staticClass: "card border rounded-4 h-100 mb-0 figma-card" },
            [
              _c(
                "div",
                {
                  staticClass:
                    "card-header d-flex align-items-center justify-content-between flex-wrap gap-2",
                },
                [
                  _c("h4", { staticClass: "h6 mb-0" }, [
                    _vm._v(_vm._s(_vm.__("top_rated_products"))),
                  ]),
                  _vm._v(" "),
                  _c(
                    "select",
                    {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: _vm.ratedPeriod,
                          expression: "ratedPeriod",
                        },
                      ],
                      staticClass:
                        "form-select form-select-sm figma-select-pill",
                      on: {
                        change: [
                          function ($event) {
                            var $$selectedVal = Array.prototype.filter
                              .call($event.target.options, function (o) {
                                return o.selected
                              })
                              .map(function (o) {
                                var val = "_value" in o ? o._value : o.value
                                return val
                              })
                            _vm.ratedPeriod = $event.target.multiple
                              ? $$selectedVal
                              : $$selectedVal[0]
                          },
                          function ($event) {
                            return _vm.mockDataRefresh("rated")
                          },
                        ],
                      },
                    },
                    [
                      _c("option", { attrs: { value: "yearly" } }, [
                        _vm._v(_vm._s(_vm.__("yearly"))),
                      ]),
                      _vm._v(" "),
                      _c("option", { attrs: { value: "monthly" } }, [
                        _vm._v(_vm._s(_vm.__("monthly"))),
                      ]),
                    ]
                  ),
                ]
              ),
              _vm._v(" "),
              _c("div", { staticClass: "card-body p-0 d-flex flex-column" }, [
                _vm.paginatedRatedProducts.length
                  ? _c(
                      "div",
                      { staticClass: "dash-list" },
                      _vm._l(_vm.paginatedRatedProducts, function (prod, idx) {
                        return _c(
                          "div",
                          {
                            key: "rated-" + idx,
                            staticClass:
                              "d-flex align-items-center gap-2 border-bottom figma-hover-light dash-list-row",
                          },
                          [
                            _c(
                              "div",
                              {
                                staticClass:
                                  "figma-avatar-42 dash-avatar overflow-hidden dash-avatar-soft flex-shrink-0",
                              },
                              [
                                prod.image
                                  ? _c("img", {
                                      staticClass:
                                        "w-100 h-100 object-fit-cover",
                                      attrs: { src: prod.image, alt: "" },
                                    })
                                  : _vm._e(),
                              ]
                            ),
                            _vm._v(" "),
                            _c(
                              "div",
                              { staticClass: "flex-grow-1 text-start min-w-0" },
                              [
                                _c(
                                  "h6",
                                  {
                                    staticClass:
                                      "dash-list-title dash-list-name mb-0 text-truncate",
                                  },
                                  [
                                    _vm._v(
                                      _vm._s(_vm.getDisplayName(prod.name))
                                    ),
                                  ]
                                ),
                                _vm._v(" "),
                                _c(
                                  "span",
                                  { staticClass: "text-muted extra-small" },
                                  [
                                    _vm._v(
                                      _vm._s(
                                        _vm.formatNumber(prod.review_count || 0)
                                      ) +
                                        " " +
                                        _vm._s(_vm.__("reviews"))
                                    ),
                                  ]
                                ),
                              ]
                            ),
                            _vm._v(" "),
                            _c(
                              "div",
                              {
                                staticClass:
                                  "d-flex align-items-center gap-1 dash-rating flex-shrink-0",
                              },
                              [
                                _c("i", { staticClass: "fa fa-star small" }),
                                _vm._v(" "),
                                _c(
                                  "span",
                                  { staticClass: "font-weight-bold small" },
                                  [
                                    _vm._v(
                                      _vm._s((prod.rating || 0).toFixed(1))
                                    ),
                                  ]
                                ),
                              ]
                            ),
                          ]
                        )
                      }),
                      0
                    )
                  : _vm.recordLoading
                  ? _c(
                      "div",
                      { staticClass: "dash-empty" },
                      [
                        _c("b-spinner", {
                          attrs: { small: "", variant: "primary" },
                        }),
                      ],
                      1
                    )
                  : _c("div", { staticClass: "dash-empty" }, [
                      _c("i", { staticClass: "fa fa-star fa-2x mb-2" }),
                      _vm._v(" "),
                      _c("span", [_vm._v(_vm._s(_vm.__("No data found")))]),
                    ]),
                _vm._v(" "),
                _vm.topRatedProducts.length
                  ? _c(
                      "div",
                      {
                        staticClass:
                          "d-flex justify-content-between align-items-center flex-wrap gap-2 mt-auto border-top bg-light-soft rounded-bottom-4 dash-pager dash-pager--compact",
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
                                  _vm.ratedPage = 1
                                },
                              },
                              model: {
                                value: _vm.ratedPerPage,
                                callback: function ($$v) {
                                  _vm.ratedPerPage = $$v
                                },
                                expression: "ratedPerPage",
                              },
                            }),
                          ],
                          1
                        ),
                        _vm._v(" "),
                        _c("b-pagination", {
                          staticClass: "figma-pagination mb-0",
                          attrs: {
                            "total-rows": _vm.topRatedProducts.length,
                            "per-page": _vm.ratedPerPage,
                            align: "right",
                            limit: 3,
                            "hide-goto-end-buttons": "",
                            "hide-ellipsis": "",
                            "prev-text": "<",
                            "next-text": ">",
                          },
                          model: {
                            value: _vm.ratedPage,
                            callback: function ($$v) {
                              _vm.ratedPage = $$v
                            },
                            expression: "ratedPage",
                          },
                        }),
                      ],
                      1
                    )
                  : _vm._e(),
              ]),
            ]
          ),
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "col-12 col-xl-4" }, [
          _c(
            "div",
            { staticClass: "card border rounded-4 h-100 mb-0 figma-card" },
            [
              _c(
                "div",
                {
                  staticClass:
                    "card-header d-flex align-items-center justify-content-between flex-wrap gap-2",
                },
                [
                  _c("h4", { staticClass: "h6 mb-0" }, [
                    _vm._v(
                      "\n                        " +
                        _vm._s(_vm.__("highest_revenue_sellers")) +
                        "\n                        "
                    ),
                    _c(
                      "span",
                      {
                        staticClass: "text-muted small font-weight-normal ms-1",
                      },
                      [
                        _vm._v(
                          "(" +
                            _vm._s(_vm.sellers.length) +
                            " " +
                            _vm._s(_vm.__("sellers")) +
                            ")"
                        ),
                      ]
                    ),
                  ]),
                  _vm._v(" "),
                  _c(
                    "select",
                    {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: _vm.sellerPeriod,
                          expression: "sellerPeriod",
                        },
                      ],
                      staticClass:
                        "form-select form-select-sm figma-select-pill",
                      on: {
                        change: [
                          function ($event) {
                            var $$selectedVal = Array.prototype.filter
                              .call($event.target.options, function (o) {
                                return o.selected
                              })
                              .map(function (o) {
                                var val = "_value" in o ? o._value : o.value
                                return val
                              })
                            _vm.sellerPeriod = $event.target.multiple
                              ? $$selectedVal
                              : $$selectedVal[0]
                          },
                          function ($event) {
                            return _vm.mockDataRefresh("sellers")
                          },
                        ],
                      },
                    },
                    [
                      _c("option", { attrs: { value: "yearly" } }, [
                        _vm._v(_vm._s(_vm.__("yearly"))),
                      ]),
                      _vm._v(" "),
                      _c("option", { attrs: { value: "monthly" } }, [
                        _vm._v(_vm._s(_vm.__("monthly"))),
                      ]),
                    ]
                  ),
                ]
              ),
              _vm._v(" "),
              _c("div", { staticClass: "card-body p-0 d-flex flex-column" }, [
                _vm.paginatedSellers.length
                  ? _c(
                      "div",
                      { staticClass: "dash-list" },
                      _vm._l(_vm.paginatedSellers, function (seller, idx) {
                        return _c(
                          "div",
                          {
                            key: "seller-" + idx,
                            staticClass:
                              "d-flex align-items-center gap-2 border-bottom figma-hover-light dash-list-row",
                          },
                          [
                            _c(
                              "div",
                              {
                                staticClass:
                                  "figma-avatar-42 dash-avatar overflow-hidden dash-avatar-soft flex-shrink-0",
                              },
                              [
                                seller.logo_url
                                  ? _c("img", {
                                      staticClass:
                                        "w-100 h-100 object-fit-cover",
                                      attrs: { src: seller.logo_url, alt: "" },
                                    })
                                  : _vm._e(),
                              ]
                            ),
                            _vm._v(" "),
                            _c(
                              "div",
                              { staticClass: "flex-grow-1 text-start min-w-0" },
                              [
                                _c(
                                  "h6",
                                  {
                                    staticClass:
                                      "dash-list-title dash-list-name mb-0 text-truncate",
                                  },
                                  [
                                    _vm._v(
                                      _vm._s(
                                        _vm.getDisplayName(seller.store_name) ||
                                          _vm.getDisplayName(seller.name)
                                      )
                                    ),
                                  ]
                                ),
                                _vm._v(" "),
                                _c(
                                  "span",
                                  { staticClass: "text-muted extra-small" },
                                  [
                                    _vm._v(
                                      _vm._s(_vm.__("orders")) +
                                        " : " +
                                        _vm._s(seller.order_count || "—")
                                    ),
                                  ]
                                ),
                              ]
                            ),
                            _vm._v(" "),
                            _c(
                              "span",
                              {
                                staticClass:
                                  "dash-list-title dash-list-amount flex-shrink-0",
                              },
                              [
                                _vm._v(
                                  _vm._s(_vm.$currency) +
                                    _vm._s(
                                      _vm.formatNumber(seller.total_revenue)
                                    )
                                ),
                              ]
                            ),
                          ]
                        )
                      }),
                      0
                    )
                  : _vm.recordLoading
                  ? _c(
                      "div",
                      { staticClass: "dash-empty" },
                      [
                        _c("b-spinner", {
                          attrs: { small: "", variant: "primary" },
                        }),
                      ],
                      1
                    )
                  : _c("div", { staticClass: "dash-empty" }, [
                      _c("i", { staticClass: "fa fa-store fa-2x mb-2" }),
                      _vm._v(" "),
                      _c("span", [_vm._v(_vm._s(_vm.__("No data found")))]),
                    ]),
                _vm._v(" "),
                _vm.sellers.length > _vm.sellerPerPage
                  ? _c(
                      "div",
                      {
                        staticClass:
                          "d-flex justify-content-between align-items-center flex-wrap gap-2 mt-auto border-top bg-light-soft rounded-bottom-4 dash-pager dash-pager--compact",
                      },
                      [
                        _c("div", { staticClass: "showing-results-text" }, [
                          _vm._v(
                            "\n                            " +
                              _vm._s(_vm.__("Showing Result")) +
                              " : "
                          ),
                          _c("span", { staticClass: "showing-bold" }, [
                            _vm._v(_vm._s(_vm.sellerPageEnd)),
                          ]),
                          _vm._v(" " + _vm._s(_vm.__("of")) + " "),
                          _c("span", { staticClass: "showing-bold" }, [
                            _vm._v(_vm._s(_vm.sellers.length)),
                          ]),
                        ]),
                        _vm._v(" "),
                        _c("b-pagination", {
                          staticClass: "figma-pagination mb-0",
                          attrs: {
                            "total-rows": _vm.sellers.length,
                            "per-page": _vm.sellerPerPage,
                            align: "right",
                            limit: 3,
                            "hide-goto-end-buttons": "",
                            "hide-ellipsis": "",
                            "prev-text": "<",
                            "next-text": ">",
                          },
                          model: {
                            value: _vm.sellerPage,
                            callback: function ($$v) {
                              _vm.sellerPage = $$v
                            },
                            expression: "sellerPage",
                          },
                        }),
                      ],
                      1
                    )
                  : _vm._e(),
              ]),
            ]
          ),
        ]),
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "card figma-card mb-0" }, [
        _c(
          "div",
          {
            staticClass:
              "card-header d-flex align-items-center justify-content-between flex-wrap gap-2",
          },
          [
            _c("h4", { staticClass: "h6 mb-0" }, [
              _vm._v(_vm._s(_vm.__("recent_orders"))),
            ]),
            _vm._v(" "),
            _c(
              "div",
              { staticClass: "d-flex align-items-center gap-2" },
              [
                _c(
                  "router-link",
                  {
                    staticClass: "btn btn-light btn-sm px-3 view-order-btn",
                    attrs: { to: "/orders" },
                  },
                  [
                    _c("span", { staticClass: "small font-weight-bold" }, [
                      _vm._v(_vm._s(_vm.__("view_orders"))),
                    ]),
                    _vm._v(" "),
                    _c("i", {
                      staticClass: "fa fa-arrow-right ms-1 extra-small",
                    }),
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
                staticClass: "figma-order-table text-dark mb-0",
                attrs: {
                  items: _vm.orders,
                  fields: _vm.orderFields,
                  "current-page": _vm.orderCurrentPage,
                  "per-page": _vm.orderPerPage,
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
                              staticClass: "fa fa-inbox fa-2x d-block mb-2",
                            }),
                            _vm._v(_vm._s(scope.emptyText)),
                          ]
                        ),
                      ]
                    },
                  },
                  {
                    key: "cell(id)",
                    fn: function (row) {
                      return [
                        _c("div", { staticClass: "figma-link-blue" }, [
                          _vm._v(
                            "\n                            " +
                              _vm._s(row.item.id) +
                              "\n                        "
                          ),
                        ]),
                      ]
                    },
                  },
                  {
                    key: "cell(user_name)",
                    fn: function (row) {
                      return [
                        _c("div", { staticClass: "d-flex flex-column" }, [
                          _c("span", { staticClass: "figma-customer-name" }, [
                            _vm._v(_vm._s(row.item.user_name)),
                          ]),
                          _vm._v(" "),
                          _c("span", { staticClass: "figma-customer-email" }, [
                            _vm._v(_vm._s(row.item.email || row.item.mobile)),
                          ]),
                        ]),
                      ]
                    },
                  },
                  {
                    key: "cell(seller_name)",
                    fn: function (row) {
                      return [
                        _c("div", { staticClass: "d-flex flex-column" }, [
                          _c("span", { staticClass: "figma-seller-name" }, [
                            _vm._v(_vm._s(row.item.seller_name)),
                          ]),
                          _vm._v(" "),
                          _c("span", { staticClass: "figma-seller-id" }, [
                            _vm._v("ID - " + _vm._s(row.item.seller_id || "-")),
                          ]),
                        ]),
                      ]
                    },
                  },
                  {
                    key: "cell(total_items)",
                    fn: function (row) {
                      return [
                        _c(
                          "div",
                          {
                            staticClass:
                              "d-flex align-items-center justify-content-center",
                          },
                          [
                            _c(
                              "a",
                              {
                                staticClass: "figma-link-blue",
                                attrs: { href: "javascript:void(0)" },
                                on: {
                                  click: function ($event) {
                                    return _vm.openOrderModal(row.item)
                                  },
                                },
                              },
                              [
                                _vm._v(
                                  "\n                                " +
                                    _vm._s(row.item.total_items || 0) +
                                    " " +
                                    _vm._s(_vm.__("items") || "Items") +
                                    "\n                                "
                                ),
                                _c("i", {
                                  staticClass:
                                    "bi bi-box-arrow-up-right dash-ext-icon",
                                }),
                              ]
                            ),
                          ]
                        ),
                      ]
                    },
                  },
                  {
                    key: "cell(total)",
                    fn: function (row) {
                      return [
                        _c("div", { staticClass: "d-flex flex-column" }, [
                          _c("span", { staticClass: "figma-amount-bold" }, [
                            _vm._v(
                              _vm._s(_vm.$currency) + _vm._s(row.item.total)
                            ),
                          ]),
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
                    key: "cell(created_at)",
                    fn: function (row) {
                      return [
                        _c("div", { staticClass: "d-flex flex-column" }, [
                          _c("span", { staticClass: "figma-date-bold" }, [
                            _vm._v(
                              _vm._s(_vm.formatDateBold(row.item.created_at))
                            ),
                          ]),
                          _vm._v(" "),
                          _c("span", { staticClass: "figma-time-light" }, [
                            _vm._v(
                              _vm._s(_vm.getPeriodLabel(row.item.created_at)) +
                                ", " +
                                _vm._s(_vm.formatTimeLight(row.item.created_at))
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
                              "\n                            " +
                                _vm._s(
                                  _vm.getStatusLabelById(row.item.active_status)
                                ) +
                                "\n                        "
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
                            staticClass: "d-flex gap-2 justify-content-center",
                          },
                          [
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
                                staticClass: "dash-view-btn",
                                attrs: {
                                  to: {
                                    name: "ViewOrder",
                                    params: {
                                      id: row.item.id,
                                      record: row.item,
                                    },
                                  },
                                  title: _vm.__("view"),
                                  "aria-label": _vm.__("view"),
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
                    key: "table-busy",
                    fn: function () {
                      return [
                        _c(
                          "div",
                          { staticClass: "text-center py-4" },
                          [
                            _c("b-spinner", {
                              staticClass: "align-middle",
                              attrs: { variant: "primary" },
                            }),
                          ],
                          1
                        ),
                      ]
                    },
                    proxy: true,
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
                            _c("div", { staticClass: "mb-3" }, [
                              _c(
                                "span",
                                {
                                  staticClass:
                                    "text-muted font-weight-bold extra-small tracking-wider",
                                },
                                [
                                  _vm._v(
                                    _vm._s(
                                      _vm.__("order_items") || "Order Items"
                                    )
                                  ),
                                ]
                              ),
                            ]),
                            _vm._v(" "),
                            row.item.order_items && row.item.order_items.length
                              ? _c(
                                  "div",
                                  { staticClass: "d-flex flex-column gap-2" },
                                  _vm._l(
                                    row.item.order_items,
                                    function (item, index) {
                                      return _c(
                                        "div",
                                        {
                                          key: index,
                                          staticClass:
                                            "bg-white p-3 rounded-3 d-flex align-items-center gap-3 border",
                                        },
                                        [
                                          _c("img", {
                                            staticClass:
                                              "rounded-3 dash-item-thumb",
                                            attrs: { src: item.image, alt: "" },
                                          }),
                                          _vm._v(" "),
                                          _c(
                                            "div",
                                            { staticClass: "flex-grow-1" },
                                            [
                                              _c(
                                                "span",
                                                {
                                                  staticClass:
                                                    "text-dark font-weight-bold d-block small mb-1",
                                                },
                                                [
                                                  _vm._v(
                                                    _vm._s(item.product_name)
                                                  ),
                                                ]
                                              ),
                                              _vm._v(" "),
                                              _c(
                                                "span",
                                                {
                                                  staticClass:
                                                    "text-muted extra-small",
                                                },
                                                [
                                                  _vm._v(
                                                    _vm._s(
                                                      item.variant_name || "-"
                                                    )
                                                  ),
                                                ]
                                              ),
                                            ]
                                          ),
                                          _vm._v(" "),
                                          _c(
                                            "div",
                                            {
                                              staticClass:
                                                "text-dark font-weight-bold small",
                                            },
                                            [
                                              _vm._v(
                                                "x " + _vm._s(item.quantity)
                                              ),
                                            ]
                                          ),
                                          _vm._v(" "),
                                          _c(
                                            "div",
                                            {
                                              staticClass:
                                                "text-dark font-weight-bold small ms-3",
                                            },
                                            [
                                              _vm._v(
                                                _vm._s(_vm.$currency) +
                                                  _vm._s(item.sub_total)
                                              ),
                                            ]
                                          ),
                                          _vm._v(" "),
                                          _c("div", { staticClass: "ms-3" }, [
                                            _c(
                                              "span",
                                              {
                                                staticClass:
                                                  "figma-status-pill scale-75",
                                                class: _vm.getStatusBadgeClass(
                                                  item.active_status
                                                ),
                                              },
                                              [_vm._v(_vm._s(item.status_name))]
                                            ),
                                          ]),
                                        ]
                                      )
                                    }
                                  ),
                                  0
                                )
                              : row.item.itemsLoading
                              ? _c(
                                  "div",
                                  { staticClass: "text-center p-3" },
                                  [
                                    _c("b-spinner", {
                                      attrs: { small: "", variant: "primary" },
                                    }),
                                  ],
                                  1
                                )
                              : _vm._e(),
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
          _vm.orderTotalRows
            ? _c(
                "div",
                {
                  staticClass:
                    "d-flex justify-content-between align-items-center flex-wrap gap-2 border-top bg-light-soft rounded-bottom-4 dash-pager dash-pager--compact",
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
                      "hide-goto-end-buttons": "",
                      "hide-ellipsis": "",
                      "prev-text": "<",
                      "next-text": ">",
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
              )
            : _vm._e(),
        ]),
      ]),
      _vm._v(" "),
      _c(
        "b-modal",
        {
          attrs: {
            id: "order-details-modal",
            size: "lg",
            centered: "",
            "hide-footer": "",
            "header-class": "border-0 pb-0",
            "body-class": "p-0",
            "modal-class": "figma-modal",
          },
          scopedSlots: _vm._u([
            {
              key: "modal-header",
              fn: function (ref) {
                var close = ref.close
                return [
                  _c("div", { staticClass: "figma-modal-header" }, [
                    _c(
                      "div",
                      { staticClass: "figma-modal-title-group text-start" },
                      [
                        _c(
                          "h5",
                          { staticClass: "figma-text-xl-semibold mb-0" },
                          [_vm._v(_vm._s(_vm.__("order_details")))]
                        ),
                        _vm._v(" "),
                        _c("p", { staticClass: "figma-modal-subtitle" }, [
                          _vm._v(
                            _vm._s(
                              _vm.__("review_order_details_below") ||
                                "Review order details below"
                            )
                          ),
                        ]),
                      ]
                    ),
                    _vm._v(" "),
                    _c(
                      "button",
                      {
                        staticClass: "figma-btn-close",
                        attrs: { type: "button" },
                        on: {
                          click: function ($event) {
                            return close()
                          },
                        },
                      },
                      [_c("i", { staticClass: "fa fa-times" })]
                    ),
                  ]),
                ]
              },
            },
          ]),
        },
        [
          _vm._v(" "),
          _c("div", { staticClass: "modal-body-content dash-modal-scroll" }, [
            _vm.isModalLoading
              ? _c(
                  "div",
                  { staticClass: "text-center py-5" },
                  [_c("b-spinner", { attrs: { variant: "primary" } })],
                  1
                )
              : _vm.selectedOrder &&
                _vm.selectedOrder.order_items &&
                _vm.selectedOrder.order_items.length
              ? _c(
                  "div",
                  { staticClass: "modal-order-columns" },
                  _vm._l(_vm.selectedOrder.order_items, function (item, index) {
                    return _c(
                      "div",
                      { key: index, staticClass: "order-item-card" },
                      [
                        _c("div", { staticClass: "order-item-container" }, [
                          _c("img", {
                            staticClass: "order-item-image",
                            attrs: { src: item.image },
                          }),
                          _vm._v(" "),
                          _c("div", { staticClass: "order-item-data" }, [
                            _c("div", [
                              _c("h6", { staticClass: "order-item-name" }, [
                                _vm._v(_vm._s(item.product_name)),
                              ]),
                              _vm._v(" "),
                              _c("p", { staticClass: "order-item-variant" }, [
                                _vm._v(_vm._s(item.variant_name || "-")),
                              ]),
                            ]),
                            _vm._v(" "),
                            _c(
                              "span",
                              {
                                staticClass: "figma-status-pill",
                                class: _vm.getStatusBadgeClass(
                                  item.active_status
                                ),
                              },
                              [
                                _vm._v(
                                  "\n                                " +
                                    _vm._s(
                                      item.status_name
                                        ? _vm.__(item.status_name.toLowerCase())
                                        : ""
                                    ) +
                                    "\n                            "
                                ),
                              ]
                            ),
                          ]),
                        ]),
                        _vm._v(" "),
                        _c("div", { staticClass: "order-item-price-info" }, [
                          _c("span", { staticClass: "order-item-qty" }, [
                            _vm._v(
                              _vm._s(_vm.__("quantity")) +
                                " : " +
                                _vm._s(item.quantity)
                            ),
                          ]),
                          _vm._v(" "),
                          _c("span", { staticClass: "order-item-subtotal" }, [
                            _vm._v(
                              _vm._s(_vm.$currency) + _vm._s(item.sub_total)
                            ),
                          ]),
                        ]),
                      ]
                    )
                  }),
                  0
                )
              : _c("div", { staticClass: "text-center py-5 text-muted" }, [
                  _vm._v("\n                No items found.\n            "),
                ]),
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "modal-footer" }, [
            _c("div", { staticClass: "d-flex flex-column align-items-start" }, [
              _c(
                "span",
                { staticClass: "text-muted extra-small font-weight-medium" },
                [_vm._v(_vm._s(_vm.__("total_items") || "Total Items"))]
              ),
              _vm._v(" "),
              _c("span", { staticClass: "figma-text-base-bold" }, [
                _vm._v(
                  _vm._s(
                    _vm.selectedOrder
                      ? _vm.selectedOrder.total_items ||
                          (_vm.selectedOrder.order_items
                            ? _vm.selectedOrder.order_items.length
                            : 0)
                      : 0
                  ) + " Items"
                ),
              ]),
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "d-flex flex-column align-items-start" }, [
              _c(
                "span",
                { staticClass: "text-muted extra-small font-weight-medium" },
                [_vm._v(_vm._s(_vm.__("total_amount") || "Total Amount"))]
              ),
              _vm._v(" "),
              _c("span", { staticClass: "figma-text-base-bold" }, [
                _vm._v(
                  _vm._s(_vm.$currency) +
                    _vm._s(_vm.selectedOrder ? _vm.selectedOrder.total : 0)
                ),
              ]),
            ]),
          ]),
        ]
      ),
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ })

}]);