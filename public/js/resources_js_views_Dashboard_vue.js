(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_views_Dashboard_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Dashboard.vue?vue&type=script&lang=js":
/*!**********************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Dashboard.vue?vue&type=script&lang=js ***!
  \**********************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
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
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
      // Chart data
      salesChartCategories: [],
      salesOrdersData: [],
      salesRevenueData: [],
      // Category chart
      categoryChartLabels: [],
      categoryChartSeries: [],
      categoryChartColors: ['#F5A623', '#9B6FD9', '#7BC67E', '#5B93D4', '#4FC5C9'],
      // Top products (derived from categories/orders data)
      topRatedProducts: [],
      topSellingProducts: [],
      // Avatar colors
      avatarColors: ['#D4E4F7', '#E0D4F7', '#D4F7E0', '#F7E4D4', '#D4F0F7', '#F7D4E0'],
      // Platform data (derived from customer_count)
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
        label: this.__('today_order') || 'Today Order',
        value: this.formatNumber(todayOrders),
        cardBg: '#FFFFFF',
        iconBgClass: 'bg-stat-blue',
        icon: 'Total order'
      }, {
        label: this.__('today_revenue') || 'Today Revenue',
        value: this.$currency + this.formatNumber(todayRevenue),
        cardBg: '#FFFFFF',
        iconBgClass: 'bg-stat-green',
        icon: 'total rev'
      }, {
        label: this.__('today_return_product') || 'Today Return Product',
        value: this.formatNumber(todayReturns),
        cardBg: '#FFFFFF',
        iconBgClass: 'bg-stat-orange',
        icon: 'total return'
      }, {
        label: this.__('today_cancelled') || 'Today Cancelled',
        value: this.formatNumber(todayCancelled),
        cardBg: '#FFFFFF',
        iconBgClass: 'bg-stat-red',
        icon: 'total cancel'
      }];
    },
    summaryStats: function summaryStats() {
      var orderCount = this.record.order_count || 0;
      var revenue = this.record.revenue || 0;
      var customers = this.record.customer_count || 0;
      var pendingOrders = this.record.pending_orders || 0;
      var deliveredOrders = this.record.delivered_orders || 0;
      return [{
        label: this.__('total_orders'),
        value: this.formatNumber(orderCount),
        cardBg: '#FFFFFF',
        iconBgClass: 'bg-stat-blue-light',
        iconTextClass: 'text-stat-blue',
        icon: 'total od',
        trendUp: this.record.total_orders_trend_up !== undefined ? this.record.total_orders_trend_up : true,
        trendValue: this.record.total_orders_trend || '0%'
      }, {
        label: this.__('revenue'),
        value: this.$currency + this.formatNumber(revenue),
        cardBg: '#FFFFFF',
        iconBgClass: 'bg-stat-green-light',
        iconTextClass: 'text-stat-green',
        icon: 'n_rev',
        trendUp: this.record.revenue_trend_up !== undefined ? this.record.revenue_trend_up : true,
        trendValue: this.record.revenue_trend || '0%'
      }, {
        label: this.__('active_customers'),
        value: this.formatNumber(customers),
        cardBg: '#FFFFFF',
        iconBgClass: 'bg-stat-pink-light',
        iconTextClass: 'text-stat-pink',
        icon: 'Active users',
        trendUp: this.record.customers_trend_up !== undefined ? this.record.customers_trend_up : true,
        trendValue: this.record.customers_trend || '0%'
      }, {
        label: this.__('pending_orders'),
        value: this.formatNumber(pendingOrders),
        cardBg: '#FFFFFF',
        iconBgClass: 'bg-stat-red-light',
        iconTextClass: 'text-stat-red',
        icon: 'Pending Orders',
        trendUp: this.record.pending_orders_trend_up !== undefined ? this.record.pending_orders_trend_up : false,
        trendValue: this.record.pending_orders_trend || '0%'
      }, {
        label: this.__('delivered_orders'),
        value: this.formatNumber(deliveredOrders),
        cardBg: '#FFFFFF',
        iconBgClass: 'bg-stat-green-light',
        iconTextClass: 'text-stat-green',
        icon: 'Delivered Orders',
        trendUp: this.record.delivered_orders_trend_up !== undefined ? this.record.delivered_orders_trend_up : true,
        trendValue: this.record.delivered_orders_trend || '0%'
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
          color: '#F59E0B',
          bgColor: '#FEF3C7',
          label: this.__('payment_pending') || 'Pending',
          icon: 'Payment Pending'
        },
        'Pending': {
          color: '#F59E0B',
          bgColor: '#FEF3C7',
          label: this.__('pending') || 'Pending'
        },
        'Received': {
          color: '#3B82F6',
          bgColor: '#DBEAFE',
          label: this.__('received') || 'Received',
          icon: 'Received'
        },
        'Processed': {
          color: '#10B981',
          bgColor: '#D1FAE5',
          label: this.__('processed') || 'Processed',
          icon: 'Processed'
        },
        'Shipped': {
          color: '#06B6D4',
          bgColor: '#CFFAFE',
          label: this.__('shipped') || 'Shipped',
          icon: 'Shipped'
        },
        'Out For Delivery': {
          color: '#6366F1',
          bgColor: '#E0E7FF',
          label: this.__('out_for_delivery') || 'Out for Delivery',
          icon: 'Out for Delivery'
        },
        'Delivered': {
          color: '#10B981',
          bgColor: '#D1FAE5',
          label: this.__('delivered') || 'Delivered',
          icon: 'Delivered'
        }
      };
      return filteredStatuses.map(function (s) {
        var mapped = statusMap[s.status];
        return {
          label: mapped.label,
          count: s.order_count || 0,
          color: mapped.color,
          bgColor: mapped.bgColor,
          icon: mapped.icon || null,
          percent: Math.round((s.order_count || 0) / maxCount * 100)
        };
      });
    },
    salesChartOptions: function salesChartOptions() {
      var _this = this;
      return {
        chart: {
          type: 'bar',
          stacked: true,
          toolbar: {
            show: false
          },
          fontFamily: 'Inter, sans-serif'
        },
        plotOptions: {
          bar: {
            columnWidth: '40%',
            borderRadius: 4
          }
        },
        colors: ['var(--figma-primary, #FF9900)', 'var(--figma-primary-light, #FEF5E6)'],
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
          labels: {
            style: {
              colors: '#64748B',
              fontSize: '12px'
            }
          },
          crosshairs: {
            show: true,
            fill: {
              type: 'solid',
              color: '#F1F5F9',
              opacity: 0.8
            },
            stroke: {
              color: '#F1F5F9',
              width: 0
            }
          }
        },
        yaxis: {
          min: 0,
          max: function max(_max) {
            return _max > 15000 ? _max : 15000;
          },
          tickAmount: 5,
          labels: {
            style: {
              colors: '#64748B',
              fontSize: '12px'
            },
            formatter: function formatter(val) {
              return _this.$currency + _this.formatNumber(val);
            }
          }
        },
        grid: {
          borderColor: '#F1F5F9',
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
            var ordersLabel = _this.__('orders') || 'Orders';
            var revenueLabel = _this.__('revenue') || 'Revenue';
            return '<div style="background:#111827;color:#fff;padding:12px;border-radius:12px;font-size:13px;line-height:1.6;border:none;box-shadow:0 10px 15px -3px rgba(0,0,0,0.1)">' + '<div style="margin-bottom:4px;font-weight:700">' + cat + '</div>' + '<div style="display:flex;align-items:center;gap:8px"><span style="width:8px;height:8px;border-radius:50%;background:var(--figma-primary, #FF9900)"></span> ' + ordersLabel + ' : <span style="font-weight:700">' + orders + '</span></div>' + '<div style="display:flex;align-items:center;gap:8px"><span style="width:8px;height:8px;border-radius:50%;background:var(--figma-primary-light, #FEF5E6)"></span> ' + revenueLabel + ' : <span style="font-weight:700">' + _this.$currency + (revenue || 0).toLocaleString() + '</span></div>' + '</div>';
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
    categoryDonutOptions: function categoryDonutOptions() {
      var _this2 = this;
      return {
        chart: {
          type: 'donut',
          fontFamily: 'Inter, sans-serif'
        },
        labels: this.categoryChartLabels,
        colors: this.categoryChartColors.slice(0, this.categoryChartLabels.length),
        legend: {
          show: false
        },
        dataLabels: {
          enabled: false
        },
        plotOptions: {
          pie: {
            donut: {
              size: '75%'
            }
          }
        },
        stroke: {
          width: 4,
          colors: ['#fff']
        },
        tooltip: {
          y: {
            formatter: function formatter(val) {
              return _this2.$currency + (val || 0).toLocaleString();
            }
          }
        }
      };
    },
    categoryChartDataFormatted: function categoryChartDataFormatted() {
      var _this3 = this;
      return this.categoryChartLabels.map(function (label, index) {
        return {
          name: label,
          value: _this3.$currency + _this3.formatNumber(_this3.categoryChartSeries[index] || 0),
          color: _this3.categoryChartColors[index] || '#000'
        };
      });
    },
    platformGaugeOptions: function platformGaugeOptions() {
      var _this4 = this;
      return {
        chart: {
          type: 'donut',
          fontFamily: 'Inter, sans-serif'
        },
        plotOptions: {
          pie: {
            startAngle: -90,
            endAngle: 90,
            offsetY: 10,
            donut: {
              size: '75%',
              labels: {
                show: true,
                name: {
                  show: true,
                  offsetY: 25,
                  fontSize: '13px',
                  color: '#475569',
                  fontWeight: 500
                },
                value: {
                  show: true,
                  offsetY: -15,
                  fontSize: '24px',
                  fontWeight: 800,
                  color: '#1F2937',
                  formatter: function formatter() {
                    return _this4.formatNumber(_this4.totalUsers);
                  }
                },
                total: {
                  show: true,
                  showAlways: true,
                  label: __('Total Users'),
                  color: '#475569',
                  formatter: function formatter() {
                    return _this4.formatNumber(_this4.totalUsers);
                  }
                }
              }
            }
          }
        },
        grid: {
          padding: {
            bottom: -80
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          width: 0
        },
        colors: ['#FBBF24', '#F472B6', '#A78BFA'],
        labels: [__('Web'), __('Android (App)'), __('iOS (App)')],
        legend: {
          show: true,
          position: 'bottom',
          horizontalAlign: 'center',
          markers: {
            radius: 100
          },
          itemMargin: {
            horizontal: 10,
            vertical: 0
          }
        }
      };
    },
    platformGaugeSeries: function platformGaugeSeries() {
      var _this$platformUsage, _this$platformUsage2, _this$platformUsage3;
      var web = ((_this$platformUsage = this.platformUsage) === null || _this$platformUsage === void 0 ? void 0 : _this$platformUsage.web) || 0;
      var android = ((_this$platformUsage2 = this.platformUsage) === null || _this$platformUsage2 === void 0 ? void 0 : _this$platformUsage2.android) || 0;
      var ios = ((_this$platformUsage3 = this.platformUsage) === null || _this$platformUsage3 === void 0 ? void 0 : _this$platformUsage3.ios) || 0;
      return [web, android, ios];
    },
    platformItems: function platformItems() {
      var _this$platformUsage4, _this$platformUsage5, _this$platformUsage6;
      var web = ((_this$platformUsage4 = this.platformUsage) === null || _this$platformUsage4 === void 0 ? void 0 : _this$platformUsage4.web) || 0;
      var android = ((_this$platformUsage5 = this.platformUsage) === null || _this$platformUsage5 === void 0 ? void 0 : _this$platformUsage5.android) || 0;
      var ios = ((_this$platformUsage6 = this.platformUsage) === null || _this$platformUsage6 === void 0 ? void 0 : _this$platformUsage6.ios) || 0;
      return [{
        label: __('Web'),
        count: this.formatNumber(web)
      }, {
        label: __('Android (App)'),
        count: this.formatNumber(android)
      }, {
        label: __('iOS (App)'),
        count: this.formatNumber(ios)
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
  created: function created() {
    this.getRecord();
    this.getSalesData();
    this.getPieChartData();
    this.setSellerWalletTransaction();
    this.getLatestOrders();
  },
  methods: {
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
      var _this5 = this;
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
        console.log('Total Users:', _this5.totalUsers);
        var data = res.data;
        if (data.status === 1) {
          _this5.record = data.data;
          _this5.sellers = data.data.top_sellers || [];
          _this5.categories = data.data.top_categories || [];
          _this5.statusOrderCount = data.data.status_order_count || [];
          _this5.platformUsage = data.data.platform_usage || {
            web: 0,
            android: 0,
            ios: 0
          };
          _this5.totalUsers = (_this5.platformUsage.web || 0) + (_this5.platformUsage.android || 0) + (_this5.platformUsage.ios || 0);

          // Build top_selling_products
          var topSelling = data.data.top_selling_products || [];
          if (topSelling.length) {
            _this5.topSellingProducts = topSelling.map(function (c) {
              return {
                name: c.product_name,
                sold_count: Math.round(parseFloat(c.total_revenue || 0) / 100),
                total_revenue: c.total_revenue,
                image: c.image_url || c.image || null
              };
            });
          } else {
            _this5.topSellingProducts = [];
          }

          // Build top_rated_products
          var topRated = data.data.top_rated_products || [];
          if (topRated.length) {
            _this5.topRatedProducts = topRated.map(function (c) {
              return {
                name: c.product_name,
                review_count: parseInt(c.review_count || 0),
                rating: parseFloat(c.average_rating || 0.0),
                image: c.image_url || c.image || null
              };
            });
          } else {
            _this5.topRatedProducts = [];
          }

          // Populate the category donut chart with real sales from top_categories_sales
          var catSales = data.data.top_categories_sales || [];
          var filtered = catSales.filter(function (c) {
            return parseFloat(c.total_revenue) > 0;
          });
          _this5.categoryChartLabels = filtered.map(function (c) {
            return _this5.getDisplayName(c.category_name);
          });
          _this5.categoryChartSeries = filtered.map(function (c) {
            return parseFloat(c.total_revenue);
          });
        }
      })["catch"](function (error) {
        console.error('Dashboard error:', error);
      });
    },
    getSalesData: function getSalesData() {
      var _this6 = this;
      axios__WEBPACK_IMPORTED_MODULE_0___default().get(this.$apiUrl + '/orders/weekly_sales', {
        params: {
          period: this.salesPeriod
        }
      }).then(function (response) {
        var orders = response.data.data || [];
        // For yearly view, generate month-based data
        if (_this6.salesPeriod === 'yearly') {
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
          _this6.salesChartCategories = months.map(function (m) {
            return _this6.__(m);
          });
          _this6.salesOrdersData = months.map(function (m, idx) {
            return monthData[idx + 1].orders;
          });
          _this6.salesRevenueData = months.map(function (m, idx) {
            return monthData[idx + 1].revenue;
          });
        } else {
          var daysCount = _this6.salesPeriod === 'weekly' ? 7 : 30;
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
            var label = _this6.salesPeriod === 'weekly' ? _this6.__(month) + ' ' + day : day;
            categories.push(label);
            if (dataMap[dateKey]) {
              ordersData.push(dataMap[dateKey].orders);
              revenueData.push(dataMap[dateKey].revenue);
            } else {
              ordersData.push(0);
              revenueData.push(0);
            }
          }
          _this6.salesChartCategories = categories;
          _this6.salesOrdersData = ordersData;
          _this6.salesRevenueData = revenueData;
        }
      })["catch"](function (err) {
        return console.error('Sales data error:', err);
      });
    },
    getPieChartData: function getPieChartData() {
      // Deprecated in favor of real category sales loaded from getRecord()
    },
    setSellerWalletTransaction: function setSellerWalletTransaction() {
      var _this7 = this;
      axios__WEBPACK_IMPORTED_MODULE_0___default().get(this.$apiUrl + '/set_seller_wallet_transaction').then(function (res) {
        var data = res.data;
        if (data.status === 1) {
          // Refresh data if needed
          if (data.data && data.data.top_sellers) {
            _this7.sellers = data.data.top_sellers;
          }
        }
      })["catch"](function () {});
    },
    updateSalesChart: function updateSalesChart() {
      this.getSalesData();
    },
    mockDataRefresh: function mockDataRefresh(section) {
      var _this8 = this;
      // Each period dropdown must only refresh its own widget - re-running the full
      // getRecord() (as this used to do) reassigns every widget's state at once, which
      // makes ApexCharts re-render cards whose own filter never changed (e.g. changing
      // the Sellers period visibly "refreshed" the unrelated Category donut too).
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
          _this8.categoryChartLabels = filtered.map(function (c) {
            return _this8.getDisplayName(c.category_name);
          });
          _this8.categoryChartSeries = filtered.map(function (c) {
            return parseFloat(c.total_revenue);
          });
        } else if (section === 'orderStatus') {
          _this8.statusOrderCount = d.status_order_count || [];
        } else if (section === 'sellers') {
          _this8.sellers = d.top_sellers || [];
        } else if (section === 'platform') {
          _this8.platformUsage = d.platform_usage || {
            web: 0,
            android: 0,
            ios: 0
          };
          _this8.totalUsers = (_this8.platformUsage.web || 0) + (_this8.platformUsage.android || 0) + (_this8.platformUsage.ios || 0);
        } else if (section === 'rated') {
          var topRated = d.top_rated_products || [];
          _this8.topRatedProducts = topRated.map(function (c) {
            return {
              name: c.product_name,
              review_count: parseInt(c.review_count || 0),
              rating: parseFloat(c.average_rating || 0.0),
              image: c.image_url || c.image || null
            };
          });
        } else if (section === 'selling') {
          var topSelling = d.top_selling_products || [];
          _this8.topSellingProducts = topSelling.map(function (c) {
            return {
              name: c.product_name,
              sold_count: Math.round(parseFloat(c.total_revenue || 0) / 100),
              total_revenue: c.total_revenue,
              image: c.image_url || c.image || null
            };
          });
        } else {
          _this8.getRecord();
        }
      })["catch"](function (error) {
        console.error('Dashboard error:', error);
      });
    },
    getLatestOrders: function getLatestOrders() {
      var _this9 = this;
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
          _this9.filterSellers = response.data.data.sellers;
          _this9.orders = response.data.data.orders.map(function (o) {
            o.order_items = [];
            o.itemsLoading = false;
            return o;
          });
          _this9.orderTotalRows = _this9.orders.length;
          _this9.isLoading = false;
        }
      })["catch"](function (error) {
        _this9.isLoading = false;
        console.error(error);
      });
    },
    deleteOrder: function deleteOrder(index, id) {
      var _this10 = this;
      this.$swal.fire({
        title: __('are_you_sure'),
        text: __('you_want_be_able_to_revert_this'),
        confirmButtonText: __('yes_sure'),
        cancelButtonText: __('cancel'),
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#37a279',
        cancelButtonColor: '#d33'
      }).then(function (result) {
        if (result.value) {
          _this10.isLoading = true;
          var postData = {
            id: id
          };
          axios__WEBPACK_IMPORTED_MODULE_0___default().post(_this10.$apiUrl + '/orders/delete', postData).then(function (response) {
            _this10.isLoading = false;
            var data = response.data;
            _this10.orders.splice(index, 1);
            _this10.showSuccess(data.message);
          });
        }
      });
    },
    toggleOrder: function toggleOrder(itemOrRow) {
      var _this11 = this;
      var item = itemOrRow.item || itemOrRow;
      var isRow = !!itemOrRow.toggleDetails;
      var isShowing = isRow ? itemOrRow.detailsShowing : !!item._showDetails;
      if (!isShowing) {
        this.orders.forEach(function (order) {
          _this11.$set(order, '_showDetails', false);
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
      var _this12 = this;
      this.selectedOrder = order;
      this.$bvModal.show('order-details-modal');
      if (this.selectedOrder.order_items && this.selectedOrder.order_items.length === 0) {
        this.isModalLoading = true;
        axios__WEBPACK_IMPORTED_MODULE_0___default().get(this.$apiUrl + '/orders/view/' + order.id).then(function (res) {
          _this12.selectedOrder.order_items = res.data.data.order_items || [];
          _this12.isModalLoading = false;
        })["catch"](function () {
          _this12.isModalLoading = false;
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

"use strict";
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

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.id, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n/* Modernized styles are now central in global SCSS */\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Dashboard.vue?vue&type=style&index=0&id=1f79daf6&scoped=true&lang=css":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Dashboard.vue?vue&type=style&index=0&id=1f79daf6&scoped=true&lang=css ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Dashboard_vue_vue_type_style_index_0_id_1f79daf6_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/style-loader/dist/cjs.js!../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Dashboard.vue?vue&type=style&index=0&id=1f79daf6&scoped=true&lang=css */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Dashboard.vue?vue&type=style&index=0&id=1f79daf6&scoped=true&lang=css");


/***/ }),

/***/ "./resources/js/views/Dashboard.vue?vue&type=template&id=1f79daf6&scoped=true":
/*!************************************************************************************!*\
  !*** ./resources/js/views/Dashboard.vue?vue&type=template&id=1f79daf6&scoped=true ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
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

"use strict";
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
    { staticClass: "p-2" },
    [
      _c("div", { staticClass: "page-heading mb-4" }, [
        _c("h2", { staticClass: "h4 font-weight-bold text-dark mb-1" }, [
          _vm._v(_vm._s(_vm.__("Welcome")) + ", " + _vm._s(_vm.userName)),
        ]),
        _vm._v(" "),
        _c("p", { staticClass: "text-muted small mb-0" }, [
          _vm._v(
            _vm._s(_vm.greetingMessage) + " • " + _vm._s(_vm.formattedDate)
          ),
        ]),
      ]),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "row g-3 mb-4 row-cols-1 row-cols-sm-2 row-cols-md-4" },
        _vm._l(_vm.todayStats, function (stat, index) {
          return _c("div", { key: "today-" + index, staticClass: "col" }, [
            _c("div", { staticClass: "figma-kpi-card-v2 w-100" }, [
              _c("div", { staticClass: "d-flex align-items-center gap-2" }, [
                _c(
                  "div",
                  {
                    staticClass: "figma-stat-icon-box",
                    class: stat.iconBgClass,
                  },
                  [
                    stat.icon
                      ? _c("base-icon", {
                          attrs: { name: stat.icon, width: "24", height: "24" },
                        })
                      : stat.iconClass && stat.iconClass.includes("fa-plus")
                      ? _c(
                          "svg",
                          {
                            class: stat.iconClass
                              .replace("fa fa-plus", "")
                              .trim(),
                            attrs: {
                              width: "48",
                              height: "48",
                              viewBox: "0 0 48 48",
                              fill: "none",
                              xmlns: "http://www.w3.org/2000/svg",
                            },
                          },
                          [
                            _c("path", {
                              attrs: {
                                d: "M33 24C33 24.1989 32.921 24.3897 32.7803 24.5303C32.6397 24.671 32.4489 24.75 32.25 24.75H24.75V32.25C24.75 32.4489 24.671 32.6397 24.5303 32.7803C24.3897 32.921 24.1989 33 24 33C23.8011 33 23.6103 32.921 23.4697 32.7803C23.329 32.6397 23.25 32.4489 23.25 32.25V24.75H15.75C15.5511 24.75 15.3603 24.671 15.2197 24.5303C15.079 24.3897 15 24.1989 15 24C15 23.8011 15.079 23.6103 15.2197 23.4697C15.3603 23.329 15.5511 23.25 15.75 23.25H23.25V15.75C23.25 15.5511 23.329 15.3603 23.4697 15.2197C23.6103 15.079 23.8011 15 24 15C24.1989 15 24.3897 15.079 24.5303 15.2197C24.671 15.3603 24.75 15.5511 24.75 15.75V23.25H32.25C32.4489 23.25 32.6397 23.329 32.7803 23.4697C32.921 23.6103 33 23.8011 33 24Z",
                                fill: "currentColor",
                              },
                            }),
                          ]
                        )
                      : _c("i", { class: stat.iconClass }),
                  ],
                  1
                ),
                _vm._v(" "),
                _c("div", { staticClass: "d-flex flex-column text-start" }, [
                  _c("span", { staticClass: "figma-stat-label mb-0" }, [
                    _vm._v(_vm._s(stat.label)),
                  ]),
                  _vm._v(" "),
                  _c("h4", { staticClass: "figma-stat-value mb-0" }, [
                    _vm._v(_vm._s(stat.value)),
                  ]),
                ]),
              ]),
            ]),
          ])
        }),
        0
      ),
      _vm._v(" "),
      _c(
        "div",
        {
          staticClass:
            "card border rounded-4 mb-3 mt-0 overflow-hidden figma-card",
        },
        [
          _c(
            "div",
            {
              staticClass:
                "card-header bg-white border-0 py-3 px-4 d-flex align-items-center justify-content-between flex-wrap gap-3",
            },
            [
              _c("h4", { staticClass: "h6 font-weight-bold text-dark mb-0" }, [
                _vm._v(_vm._s(_vm.__("sales_overview") || "Sales Overview")),
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "d-flex align-items-center gap-3" }, [
                _c(
                  "div",
                  {
                    staticClass:
                      "d-none d-sm-flex align-items-center gap-3 text-muted small",
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
                        _c("span", { staticClass: "dot-sm bg-light-primary" }),
                        _vm._v(" "),
                        _c("span", { staticClass: "text-capitalize" }, [
                          _vm._v(_vm._s(_vm.__("revenue") || "Revenue")),
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
                    staticClass: "form-select form-select-sm figma-select-pill",
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
                      _vm._v(_vm._s(_vm.__("yearly") || "Yearly")),
                    ]),
                    _vm._v(" "),
                    _c("option", { attrs: { value: "monthly" } }, [
                      _vm._v(_vm._s(_vm.__("daily") || "Daily")),
                    ]),
                    _vm._v(" "),
                    _c("option", { attrs: { value: "weekly" } }, [
                      _vm._v(_vm._s(_vm.__("weekly") || "Weekly")),
                    ]),
                  ]
                ),
              ]),
            ]
          ),
          _vm._v(" "),
          _c(
            "div",
            { staticClass: "card-body p-4 pt-1" },
            [
              _c("apexcharts", {
                ref: "salesChart",
                attrs: {
                  width: "100%",
                  height: "350",
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
      _vm._v(" "),
      _c("div", { staticClass: "figma-bg-soft-primary p-3 mb-4 rounded-4" }, [
        _c(
          "div",
          { staticClass: "row g-3 row-cols-1 row-cols-sm-2 row-cols-lg-5" },
          _vm._l(_vm.summaryStats, function (stat, index) {
            return _c("div", { key: "sum-" + index, staticClass: "col" }, [
              _c(
                "div",
                {
                  staticClass:
                    "card border rounded-4 h-100 figma-card-white p-3",
                },
                [
                  _c(
                    "div",
                    {
                      staticClass:
                        "d-flex justify-content-between align-items-start mb-2",
                    },
                    [
                      stat.icon
                        ? _c(
                            "div",
                            {
                              staticClass: "figma-stat-icon-box",
                              class: stat.iconBgClass,
                            },
                            [
                              _c("base-icon", {
                                attrs: {
                                  name: stat.icon,
                                  width: "24",
                                  height: "24",
                                },
                              }),
                            ],
                            1
                          )
                        : stat.iconClass && stat.iconClass.includes("fa-plus")
                        ? _c("div", [
                            _c(
                              "svg",
                              {
                                attrs: {
                                  width: "48",
                                  height: "48",
                                  viewBox: "0 0 48 48",
                                  fill: "none",
                                  xmlns: "http://www.w3.org/2000/svg",
                                },
                              },
                              [
                                _c("path", {
                                  attrs: {
                                    d: "M0 8C0 3.58172 3.58172 0 8 0H40C44.4183 0 48 3.58172 48 8V40C48 44.4183 44.4183 48 40 48H8C3.58172 48 0 44.4183 0 40V8Z",
                                    fill: "#E7F4FE",
                                  },
                                }),
                                _vm._v(" "),
                                _c("path", {
                                  attrs: {
                                    d: "M33 24C33 24.1989 32.921 24.3897 32.7803 24.5303C32.6397 24.671 32.4489 24.75 32.25 24.75H24.75V32.25C24.75 32.4489 24.671 32.6397 24.5303 32.7803C24.3897 32.921 24.1989 33 24 33C23.8011 33 23.6103 32.921 23.4697 32.7803C23.329 32.6397 23.25 32.4489 23.25 32.25V24.75H15.75C15.5511 24.75 15.3603 24.671 15.2197 24.5303C15.079 24.3897 15 24.1989 15 24C15 23.8011 15.079 23.6103 15.2197 23.4697C15.3603 23.329 15.5511 23.25 15.75 23.25H23.25V15.75C23.25 15.5511 23.329 15.3603 23.4697 15.2197C23.6103 15.079 23.8011 15 24 15C24.1989 15 24.3897 15.079 24.5303 15.2197C24.671 15.3603 24.75 15.5511 24.75 15.75V23.25H32.25C32.4489 23.25 32.6397 23.329 32.7803 23.4697C32.921 23.6103 33 23.8011 33 24Z",
                                    fill: "#2196F3",
                                  },
                                }),
                              ]
                            ),
                          ])
                        : _c(
                            "div",
                            {
                              staticClass: "figma-stat-icon-box-sm",
                              class: stat.iconBgClass,
                            },
                            [
                              _c("i", {
                                class: [stat.iconClass, stat.iconTextClass],
                              }),
                            ]
                          ),
                      _vm._v(" "),
                      _c(
                        "div",
                        {
                          staticClass: "figma-trend-badge scale-90",
                          class: stat.trendUp ? "trend-up" : "trend-down",
                        },
                        [
                          _c("base-icon", {
                            attrs: {
                              name: stat.trendUp ? "TrendUp" : "TrendDown",
                              width: "18",
                              height: "18",
                            },
                          }),
                          _vm._v(" "),
                          _c("span", [_vm._v(_vm._s(stat.trendValue))]),
                        ],
                        1
                      ),
                    ]
                  ),
                  _vm._v(" "),
                  _c("div", { staticClass: "d-flex flex-column mt-auto" }, [
                    _c(
                      "span",
                      {
                        staticClass: "figma-summary-label mb-1 text-capitalize",
                      },
                      [_vm._v(_vm._s(stat.label))]
                    ),
                    _vm._v(" "),
                    _c("h4", { staticClass: "figma-stat-value h6 mb-0" }, [
                      _vm._v(_vm._s(stat.value)),
                    ]),
                  ]),
                ]
              ),
            ])
          }),
          0
        ),
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "row g-4 mb-4" }, [
        _c("div", { staticClass: "col-12 col-lg-7" }, [
          _c("div", { staticClass: "card border rounded-4 h-100 figma-card" }, [
            _c(
              "div",
              {
                staticClass:
                  "card-header bg-white border-0 py-3 px-4 d-flex align-items-center justify-content-between flex-wrap gap-2",
              },
              [
                _c(
                  "h4",
                  { staticClass: "h6 font-weight-bold text-dark mb-0" },
                  [
                    _vm._v(
                      "\n                        " +
                        _vm._s(
                          _vm.__("top_sales_by_category") ||
                            "Top Sales By Category"
                        ) +
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
                        value: _vm.categoryPeriod,
                        expression: "categoryPeriod",
                      },
                    ],
                    staticClass: "form-select form-select-sm figma-select-pill",
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
                      _vm._v(_vm._s(_vm.__("yearly") || "Yearly")),
                    ]),
                    _vm._v(" "),
                    _c("option", { attrs: { value: "monthly" } }, [
                      _vm._v(_vm._s(_vm.__("monthly") || "Monthly")),
                    ]),
                  ]
                ),
              ]
            ),
            _vm._v(" "),
            _c(
              "div",
              { staticClass: "card-body p-4 pt-0 d-flex flex-column" },
              [
                _vm.categoryChartSeries.length
                  ? _c(
                      "div",
                      {
                        staticClass: "row align-items-center flex-grow-1",
                        staticStyle: { "min-height": "300px" },
                      },
                      [
                        _c(
                          "div",
                          { staticClass: "col-12 col-md-5" },
                          [
                            _c("apexcharts", {
                              attrs: {
                                width: "100%",
                                height: "280",
                                type: "donut",
                                options: _vm.categoryDonutOptions,
                                series: _vm.categoryChartSeries,
                              },
                            }),
                          ],
                          1
                        ),
                        _vm._v(" "),
                        _c("div", { staticClass: "col-12 col-md-7" }, [
                          _c(
                            "div",
                            {
                              staticClass:
                                "d-flex flex-column gap-3 pe-md-4 mt-4 mt-md-0",
                            },
                            _vm._l(
                              _vm.categoryChartDataFormatted,
                              function (item, idx) {
                                return _c(
                                  "div",
                                  {
                                    key: "cat-" + idx,
                                    staticClass: "d-flex align-items-center",
                                  },
                                  [
                                    _c("div", {
                                      staticClass:
                                        "rounded-circle me-3 flex-shrink-0",
                                      style: {
                                        width: "12px",
                                        height: "12px",
                                        backgroundColor: item.color,
                                      },
                                    }),
                                    _vm._v(" "),
                                    _c(
                                      "div",
                                      {
                                        staticClass:
                                          "text-dark small flex-shrink-0",
                                        staticStyle: { "font-weight": "500" },
                                      },
                                      [_vm._v(_vm._s(item.name))]
                                    ),
                                    _vm._v(" "),
                                    _c("div", {
                                      staticClass: "flex-grow-1 mx-3",
                                      staticStyle: {
                                        "border-bottom": "1.5px dashed #E2E8F0",
                                      },
                                    }),
                                    _vm._v(" "),
                                    _c(
                                      "div",
                                      {
                                        staticClass:
                                          "text-dark small font-weight-bold flex-shrink-0",
                                      },
                                      [_vm._v(_vm._s(item.value))]
                                    ),
                                  ]
                                )
                              }
                            ),
                            0
                          ),
                        ]),
                      ]
                    )
                  : _c(
                      "div",
                      { staticClass: "text-center py-5 text-muted small" },
                      [_vm._v(_vm._s(_vm.__("No data found")))]
                    ),
              ]
            ),
          ]),
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "col-12 col-lg-5" }, [
          _c("div", { staticClass: "card border rounded-4 h-100 figma-card" }, [
            _c(
              "div",
              {
                staticClass:
                  "card-header bg-white border-bottom py-3 px-4 d-flex align-items-center justify-content-between",
              },
              [
                _c(
                  "h4",
                  { staticClass: "h6 font-weight-bold text-dark mb-0" },
                  [_vm._v(_vm._s(_vm.__("order_status") || "Order Status"))]
                ),
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
                    staticClass: "form-select form-select-sm figma-select-pill",
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
                      _vm._v(_vm._s(_vm.__("yearly") || "Yearly")),
                    ]),
                    _vm._v(" "),
                    _c("option", { attrs: { value: "monthly" } }, [
                      _vm._v(_vm._s(_vm.__("monthly") || "Monthly")),
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
                  "card-body p-4 d-flex flex-column justify-content-center",
              },
              [
                _vm.orderStatusItems.length
                  ? _c(
                      "div",
                      { staticClass: "d-flex flex-column gap-3" },
                      _vm._l(_vm.orderStatusItems, function (item, idx) {
                        return _c(
                          "div",
                          {
                            key: "os-" + idx,
                            staticClass: "d-flex align-items-center gap-3",
                          },
                          [
                            _c(
                              "div",
                              {
                                staticClass:
                                  "rounded-3 d-flex align-items-center justify-content-center",
                                style: {
                                  background: item.bgColor,
                                  width: "40px",
                                  height: "40px",
                                  borderRadius: "10px !important",
                                },
                              },
                              [
                                item.icon
                                  ? _c("base-icon", {
                                      attrs: {
                                        name: item.icon,
                                        width: "24",
                                        height: "24",
                                      },
                                    })
                                  : _vm._e(),
                              ],
                              1
                            ),
                            _vm._v(" "),
                            _c("div", { staticClass: "flex-grow-1" }, [
                              _c(
                                "div",
                                {
                                  staticClass:
                                    "d-flex justify-content-between align-items-center mb-1",
                                },
                                [
                                  _c(
                                    "span",
                                    { staticClass: "figma-order-status-label" },
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
                                  staticClass: "rounded-pill overflow-hidden",
                                  style: {
                                    height: "6px",
                                    backgroundColor: item.bgColor,
                                  },
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
                            ]),
                          ]
                        )
                      }),
                      0
                    )
                  : _c(
                      "div",
                      { staticClass: "text-center py-5 text-muted small" },
                      [_vm._v(_vm._s(_vm.__("No data found")))]
                    ),
              ]
            ),
          ]),
        ]),
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "row g-4 mb-4" }, [
        _c("div", { staticClass: "col-12 col-lg-7" }, [
          _c("div", { staticClass: "card border rounded-4 h-100 figma-card" }, [
            _c(
              "div",
              {
                staticClass:
                  "card-header bg-white border-0 py-3 px-4 d-flex align-items-center justify-content-between",
              },
              [
                _c(
                  "h4",
                  { staticClass: "h6 font-weight-bold text-dark mb-0" },
                  [
                    _vm._v(
                      "\n                        " +
                        _vm._s(
                          _vm.__("highest_revenue_sellers") ||
                            "Highest revenue generating sellers"
                        ) +
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
                        value: _vm.sellerPeriod,
                        expression: "sellerPeriod",
                      },
                    ],
                    staticClass: "form-select form-select-sm figma-select-pill",
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
                      _vm._v(_vm._s(_vm.__("yearly") || "Yearly")),
                    ]),
                    _vm._v(" "),
                    _c("option", { attrs: { value: "monthly" } }, [
                      _vm._v(_vm._s(_vm.__("monthly") || "Monthly")),
                    ]),
                  ]
                ),
              ]
            ),
            _vm._v(" "),
            _c("div", { staticClass: "card-body p-0" }, [
              _vm.paginatedSellers.length
                ? _c(
                    "div",
                    { staticClass: "px-4" },
                    _vm._l(_vm.paginatedSellers, function (seller, idx) {
                      return _c(
                        "div",
                        {
                          key: "seller-" + idx,
                          staticClass:
                            "py-3 d-flex align-items-center gap-3 border-bottom figma-hover-light",
                        },
                        [
                          _c(
                            "div",
                            {
                              staticClass: "figma-avatar-42 overflow-hidden",
                              staticStyle: { "background-color": "#EBF3FF" },
                            },
                            [
                              seller.logo_url
                                ? _c("img", {
                                    staticClass: "w-100 h-100 object-fit-cover",
                                    attrs: { src: seller.logo_url },
                                  })
                                : _vm._e(),
                            ]
                          ),
                          _vm._v(" "),
                          _c(
                            "div",
                            {
                              staticClass:
                                "flex-grow-1 text-dark text-start ms-2",
                            },
                            [
                              _c(
                                "h6",
                                {
                                  staticClass:
                                    "text-dark font-weight-bold mb-1 small",
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
                            { staticClass: "text-dark font-weight-bold small" },
                            [
                              _vm._v(
                                _vm._s(_vm.$currency) +
                                  _vm._s(_vm.formatNumber(seller.total_revenue))
                              ),
                            ]
                          ),
                        ]
                      )
                    }),
                    0
                  )
                : _c(
                    "div",
                    { staticClass: "text-center py-5 text-muted small" },
                    [_vm._v(_vm._s(_vm.__("No data found")))]
                  ),
              _vm._v(" "),
              _vm.sellers.length > _vm.sellerPerPage
                ? _c(
                    "div",
                    {
                      staticClass:
                        "d-flex justify-content-between align-items-center mt-4 px-3 pb-3 border-top pt-3 bg-light-soft rounded-bottom-4",
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
          ]),
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "col-12 col-lg-5" }, [
          _c("div", { staticClass: "card border rounded-4 h-100 figma-card" }, [
            _c(
              "div",
              {
                staticClass:
                  "card-header bg-white border-0 py-3 px-4 d-flex align-items-center justify-content-between text-dark",
              },
              [
                _c(
                  "h4",
                  { staticClass: "h6 font-weight-bold mb-0 text-dark" },
                  [
                    _vm._v(
                      _vm._s(_vm.__("platform_usage") || "Platform Usage") +
                        "\n                    "
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
                        value: _vm.platformPeriod,
                        expression: "platformPeriod",
                      },
                    ],
                    staticClass: "form-select form-select-sm figma-select-pill",
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
                      _vm._v(_vm._s(_vm.__("yearly") || "Yearly")),
                    ]),
                    _vm._v(" "),
                    _c("option", { attrs: { value: "monthly" } }, [
                      _vm._v(_vm._s(_vm.__("monthly") || "Monthly")),
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
                  "card-body p-4 pt-0 d-flex flex-column align-items-center",
              },
              [
                _c("apexcharts", {
                  attrs: {
                    width: "100%",
                    height: "280",
                    type: "donut",
                    options: _vm.platformGaugeOptions,
                    series: _vm.platformGaugeSeries,
                  },
                }),
                _vm._v(" "),
                _c(
                  "div",
                  { staticClass: "row g-2 w-100 mt-2 text-center text-dark" },
                  _vm._l(_vm.platformItems, function (p, i) {
                    return _c(
                      "div",
                      { key: "plat-" + i, staticClass: "col-4" },
                      [
                        _c(
                          "div",
                          {
                            staticClass: "bg-platform-box p-3 rounded-3 border",
                          },
                          [
                            _c(
                              "div",
                              {
                                staticClass:
                                  "badge bg-white text-dark px-3 py-2 mb-2 rounded-pill font-weight-bold",
                              },
                              [_vm._v(_vm._s(p.count))]
                            ),
                            _vm._v(" "),
                            _c("div", { staticClass: "figma-platform-label" }, [
                              _vm._v(_vm._s(p.label)),
                            ]),
                          ]
                        ),
                      ]
                    )
                  }),
                  0
                ),
              ],
              1
            ),
          ]),
        ]),
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "row g-4 mb-4" }, [
        _c("div", { staticClass: "col-12 col-lg-6" }, [
          _c("div", { staticClass: "card border rounded-4 figma-card" }, [
            _c(
              "div",
              {
                staticClass:
                  "card-header bg-white border-0 py-3 px-4 d-flex align-items-center justify-content-between",
              },
              [
                _c(
                  "h4",
                  { staticClass: "h6 font-weight-bold text-dark mb-0" },
                  [
                    _vm._v(
                      _vm._s(_vm.__("top_rated_products")) +
                        "\n                    "
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
                        value: _vm.ratedPeriod,
                        expression: "ratedPeriod",
                      },
                    ],
                    staticClass: "form-select form-select-sm figma-select-pill",
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
                      _vm._v(_vm._s(_vm.__("yearly") || "Yearly")),
                    ]),
                    _vm._v(" "),
                    _c("option", { attrs: { value: "monthly" } }, [
                      _vm._v(_vm._s(_vm.__("monthly") || "Monthly")),
                    ]),
                  ]
                ),
              ]
            ),
            _vm._v(" "),
            _c("div", { staticClass: "card-body p-0 text-dark" }, [
              _vm.paginatedRatedProducts.length
                ? _c(
                    "div",
                    { staticClass: "px-4" },
                    _vm._l(_vm.paginatedRatedProducts, function (prod, idx) {
                      return _c(
                        "div",
                        {
                          key: "rated-" + idx,
                          staticClass:
                            "py-3 d-flex align-items-center gap-3 border-bottom figma-hover-light text-dark",
                        },
                        [
                          _c(
                            "div",
                            {
                              staticClass: "figma-avatar-42 overflow-hidden",
                              staticStyle: { "background-color": "#EBF3FF" },
                            },
                            [
                              prod.image
                                ? _c("img", {
                                    staticClass: "w-100 h-100 object-fit-cover",
                                    attrs: { src: prod.image },
                                  })
                                : _vm._e(),
                            ]
                          ),
                          _vm._v(" "),
                          _c(
                            "div",
                            {
                              staticClass:
                                "flex-grow-1 text-dark text-start ms-2",
                            },
                            [
                              _c(
                                "h6",
                                {
                                  staticClass:
                                    "text-dark font-weight-bold mb-1 small text-dark",
                                },
                                [
                                  _vm._v(
                                    _vm._s(_vm.getDisplayName(prod.name)) +
                                      "\n                                "
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
                                      _vm._s(_vm.__("reviews") || "Reviews")
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
                                "d-flex align-items-center gap-1 text-warning",
                            },
                            [
                              _c("i", { staticClass: "fa fa-star small" }),
                              _vm._v(" "),
                              _c(
                                "span",
                                { staticClass: "font-weight-bold small" },
                                [_vm._v(_vm._s((prod.rating || 0).toFixed(1)))]
                              ),
                            ]
                          ),
                        ]
                      )
                    }),
                    0
                  )
                : _c(
                    "div",
                    { staticClass: "text-center py-5 text-muted small" },
                    [_vm._v(_vm._s(_vm.__("No data found")))]
                  ),
              _vm._v(" "),
              _vm.topRatedProducts.length
                ? _c(
                    "div",
                    {
                      staticClass:
                        "d-flex justify-content-between align-items-center mt-4 px-3 pb-3 border-top pt-3 bg-light-soft rounded-bottom-4",
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
                            staticStyle: { width: "auto" },
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
          ]),
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "col-12 col-lg-6" }, [
          _c("div", { staticClass: "card border rounded-4 figma-card" }, [
            _c(
              "div",
              {
                staticClass:
                  "card-header bg-white border-0 py-3 px-4 d-flex align-items-center justify-content-between",
              },
              [
                _c(
                  "h4",
                  { staticClass: "h6 font-weight-bold text-dark mb-0" },
                  [_vm._v(_vm._s(_vm.__("top_selling_products")))]
                ),
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
                    staticClass: "form-select form-select-sm figma-select-pill",
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
                      _vm._v(_vm._s(_vm.__("yearly") || "Yearly")),
                    ]),
                    _vm._v(" "),
                    _c("option", { attrs: { value: "monthly" } }, [
                      _vm._v(_vm._s(_vm.__("monthly") || "Monthly")),
                    ]),
                  ]
                ),
              ]
            ),
            _vm._v(" "),
            _c("div", { staticClass: "card-body p-0 text-dark" }, [
              _vm.paginatedSellingProducts.length
                ? _c(
                    "div",
                    { staticClass: "px-4" },
                    _vm._l(_vm.paginatedSellingProducts, function (prod, idx) {
                      return _c(
                        "div",
                        {
                          key: "selling-" + idx,
                          staticClass:
                            "py-3 d-flex align-items-center gap-3 border-bottom figma-hover-light text-dark",
                        },
                        [
                          _c(
                            "div",
                            {
                              staticClass: "figma-avatar-42 overflow-hidden",
                              staticStyle: { "background-color": "#EBF3FF" },
                            },
                            [
                              prod.image
                                ? _c("img", {
                                    staticClass: "w-100 h-100 object-fit-cover",
                                    attrs: { src: prod.image },
                                  })
                                : _vm._e(),
                            ]
                          ),
                          _vm._v(" "),
                          _c(
                            "div",
                            {
                              staticClass:
                                "flex-grow-1 text-dark text-start ms-2",
                            },
                            [
                              _c(
                                "h6",
                                {
                                  staticClass:
                                    "text-dark font-weight-bold mb-1 small text-dark",
                                },
                                [
                                  _vm._v(
                                    _vm._s(_vm.getDisplayName(prod.name)) +
                                      "\n                                "
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
                                    staticStyle: {
                                      width: "17px",
                                      height: "17px",
                                    },
                                    attrs: {
                                      src:
                                        _vm.$baseUrl + "/images/icons/sold.svg",
                                    },
                                  }),
                                  _vm._v(" "),
                                  _c(
                                    "span",
                                    { staticClass: "text-muted extra-small" },
                                    [
                                      _vm._v(
                                        _vm._s(_vm.__("sold") || "Sold") +
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
                            { staticClass: "text-dark font-weight-bold small" },
                            [
                              _vm._v(
                                _vm._s(_vm.$currency) +
                                  _vm._s(
                                    _vm.formatNumber(prod.total_revenue || 0)
                                  )
                              ),
                            ]
                          ),
                        ]
                      )
                    }),
                    0
                  )
                : _c(
                    "div",
                    { staticClass: "text-center py-5 text-muted small" },
                    [_vm._v(_vm._s(_vm.__("No data found")))]
                  ),
              _vm._v(" "),
              _vm.topSellingProducts.length
                ? _c(
                    "div",
                    {
                      staticClass:
                        "d-flex justify-content-between align-items-center mt-4 px-3 pb-3 border-top pt-3 bg-light-soft rounded-bottom-4",
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
                            staticStyle: { width: "auto" },
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
          ]),
        ]),
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "card figma-card text-dark mt-4" }, [
        _c("div", { staticClass: "card-header" }, [
          _c("h4", { staticClass: "text-dark" }, [
            _vm._v(_vm._s(_vm.__("recent_orders") || "Recent Orders")),
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
                    "btn btn-dark btn-sm rounded-3 px-3 view-order-btn",
                  attrs: { to: "/orders" },
                },
                [
                  _c(
                    "span",
                    { staticClass: "small font-weight-bold text-white" },
                    [_vm._v(_vm._s(_vm.__("view_orders") || "View Orders"))]
                  ),
                  _vm._v(" "),
                  _c("i", {
                    staticClass:
                      "fa fa-arrow-right ms-1 text-white extra-small",
                  }),
                ]
              ),
            ],
            1
          ),
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "card-body p-0" }, [
          _c(
            "div",
            { staticClass: "table-responsive" },
            [
              _c("b-table", {
                staticClass: "figma-order-table text-dark",
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
                  stacked: "md",
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
                                  staticClass: "bi bi-box-arrow-up-right",
                                  staticStyle: { "font-size": "0.75rem" },
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
                                staticClass: "figma-action-btn",
                                attrs: {
                                  to: {
                                    name: "ViewOrder",
                                    params: {
                                      id: row.item.id,
                                      record: row.item,
                                    },
                                  },
                                },
                              },
                              [
                                _c("base-icon", {
                                  attrs: {
                                    name: "Eye",
                                    hoverName: "Type=Hover (1)",
                                    width: "24",
                                    height: "24",
                                  },
                                }),
                              ],
                              1
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
                                            staticClass: "rounded-3",
                                            staticStyle: {
                                              width: "44px",
                                              height: "44px",
                                              "object-fit": "cover",
                                            },
                                            attrs: { src: item.image },
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
                                      attrs: { small: "", variant: "dark" },
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
                    "d-flex justify-content-between align-items-center mt-4 px-3 pb-3 border-top pt-3 bg-light-soft rounded-bottom-4",
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
                        staticStyle: { width: "auto" },
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
          _c(
            "div",
            {
              staticClass: "modal-body-content",
              staticStyle: { "max-height": "500px", "overflow-y": "auto" },
            },
            [
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
                    _vm._l(
                      _vm.selectedOrder.order_items,
                      function (item, index) {
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
                                  _c(
                                    "p",
                                    { staticClass: "order-item-variant" },
                                    [_vm._v(_vm._s(item.variant_name || "-"))]
                                  ),
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
                                            ? _vm.__(
                                                item.status_name.toLowerCase()
                                              )
                                            : ""
                                        ) +
                                        "\n                            "
                                    ),
                                  ]
                                ),
                              ]),
                            ]),
                            _vm._v(" "),
                            _c(
                              "div",
                              { staticClass: "order-item-price-info" },
                              [
                                _c("span", { staticClass: "order-item-qty" }, [
                                  _vm._v(
                                    _vm._s(_vm.__("quantity")) +
                                      " : " +
                                      _vm._s(item.quantity)
                                  ),
                                ]),
                                _vm._v(" "),
                                _c(
                                  "span",
                                  { staticClass: "order-item-subtotal" },
                                  [
                                    _vm._v(
                                      _vm._s(_vm.$currency) +
                                        _vm._s(item.sub_total)
                                    ),
                                  ]
                                ),
                              ]
                            ),
                          ]
                        )
                      }
                    ),
                    0
                  )
                : _c("div", { staticClass: "text-center py-5 text-muted" }, [
                    _vm._v("\n                No items found.\n            "),
                  ]),
            ]
          ),
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



/***/ }),

/***/ "./node_modules/vue2-daterange-picker/dist/vue2-daterange-picker.umd.min.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/vue2-daterange-picker/dist/vue2-daterange-picker.umd.min.js ***!
  \**********************************************************************************/
/***/ (function(module) {

(function(t,e){ true?module.exports=e():0})("undefined"!==typeof self?self:this,(function(){return function(t){var e={};function n(r){if(e[r])return e[r].exports;var a=e[r]={i:r,l:!1,exports:{}};return t[r].call(a.exports,a,a.exports,n),a.l=!0,a.exports}return n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var a in t)n.d(r,a,function(e){return t[e]}.bind(null,a));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s="fb15")}({"00ee":function(t,e,n){var r=n("b622"),a=r("toStringTag"),i={};i[a]="z",t.exports="[object z]"===String(i)},"057f":function(t,e,n){var r=n("fc6a"),a=n("241c").f,i={}.toString,o="object"==typeof window&&window&&Object.getOwnPropertyNames?Object.getOwnPropertyNames(window):[],s=function(t){try{return a(t)}catch(e){return o.slice()}};t.exports.f=function(t){return o&&"[object Window]"==i.call(t)?s(t):a(r(t))}},"06cf":function(t,e,n){var r=n("83ab"),a=n("d1e7"),i=n("5c6c"),o=n("fc6a"),s=n("c04e"),c=n("5135"),u=n("0cfb"),l=Object.getOwnPropertyDescriptor;e.f=r?l:function(t,e){if(t=o(t),e=s(e,!0),u)try{return l(t,e)}catch(n){}if(c(t,e))return i(!a.f.call(t,e),t[e])}},"0cfb":function(t,e,n){var r=n("83ab"),a=n("d039"),i=n("cc12");t.exports=!r&&!a((function(){return 7!=Object.defineProperty(i("div"),"a",{get:function(){return 7}}).a}))},"0e58":function(t,e,n){"use strict";var r=n("beb7"),a=n.n(r);a.a},"14c3":function(t,e,n){var r=n("c6b6"),a=n("9263");t.exports=function(t,e){var n=t.exec;if("function"===typeof n){var i=n.call(t,e);if("object"!==typeof i)throw TypeError("RegExp exec method returned something other than an Object or null");return i}if("RegExp"!==r(t))throw TypeError("RegExp#exec called on incompatible receiver");return a.call(t,e)}},"159b":function(t,e,n){var r=n("da84"),a=n("fdbc"),i=n("17c2"),o=n("9112");for(var s in a){var c=r[s],u=c&&c.prototype;if(u&&u.forEach!==i)try{o(u,"forEach",i)}catch(l){u.forEach=i}}},"17c2":function(t,e,n){"use strict";var r=n("b727").forEach,a=n("b301");t.exports=a("forEach")?function(t){return r(this,t,arguments.length>1?arguments[1]:void 0)}:[].forEach},"18e6":function(t,e,n){},"1be4":function(t,e,n){var r=n("d066");t.exports=r("document","documentElement")},"1c0b":function(t,e){t.exports=function(t){if("function"!=typeof t)throw TypeError(String(t)+" is not a function");return t}},"1c7e":function(t,e,n){var r=n("b622"),a=r("iterator"),i=!1;try{var o=0,s={next:function(){return{done:!!o++}},return:function(){i=!0}};s[a]=function(){return this},Array.from(s,(function(){throw 2}))}catch(c){}t.exports=function(t,e){if(!e&&!i)return!1;var n=!1;try{var r={};r[a]=function(){return{next:function(){return{done:n=!0}}}},t(r)}catch(c){}return n}},"1d80":function(t,e){t.exports=function(t){if(void 0==t)throw TypeError("Can't call method on "+t);return t}},"1dde":function(t,e,n){var r=n("d039"),a=n("b622"),i=n("60ae"),o=a("species");t.exports=function(t){return i>=51||!r((function(){var e=[],n=e.constructor={};return n[o]=function(){return{foo:1}},1!==e[t](Boolean).foo}))}},"23cb":function(t,e,n){var r=n("a691"),a=Math.max,i=Math.min;t.exports=function(t,e){var n=r(t);return n<0?a(n+e,0):i(n,e)}},"23e7":function(t,e,n){var r=n("da84"),a=n("06cf").f,i=n("9112"),o=n("6eeb"),s=n("ce4e"),c=n("e893"),u=n("94ca");t.exports=function(t,e){var n,l,f,d,h,p,m=t.target,g=t.global,v=t.stat;if(l=g?r:v?r[m]||s(m,{}):(r[m]||{}).prototype,l)for(f in e){if(h=e[f],t.noTargetGet?(p=a(l,f),d=p&&p.value):d=l[f],n=u(g?f:m+(v?".":"#")+f,t.forced),!n&&void 0!==d){if(typeof h===typeof d)continue;c(h,d)}(t.sham||d&&d.sham)&&i(h,"sham",!0),o(l,f,h,t)}}},"241c":function(t,e,n){var r=n("ca84"),a=n("7839"),i=a.concat("length","prototype");e.f=Object.getOwnPropertyNames||function(t){return r(t,i)}},"25f0":function(t,e,n){"use strict";var r=n("6eeb"),a=n("825a"),i=n("d039"),o=n("ad6d"),s="toString",c=RegExp.prototype,u=c[s],l=i((function(){return"/a/b"!=u.call({source:"a",flags:"b"})})),f=u.name!=s;(l||f)&&r(RegExp.prototype,s,(function(){var t=a(this),e=String(t.source),n=t.flags,r=String(void 0===n&&t instanceof RegExp&&!("flags"in c)?o.call(t):n);return"/"+e+"/"+r}),{unsafe:!0})},"35a1":function(t,e,n){var r=n("f5df"),a=n("3f8c"),i=n("b622"),o=i("iterator");t.exports=function(t){if(void 0!=t)return t[o]||t["@@iterator"]||a[r(t)]}},"37e8":function(t,e,n){var r=n("83ab"),a=n("9bf2"),i=n("825a"),o=n("df75");t.exports=r?Object.defineProperties:function(t,e){i(t);var n,r=o(e),s=r.length,c=0;while(s>c)a.f(t,n=r[c++],e[n]);return t}},"3bbe":function(t,e,n){var r=n("861d");t.exports=function(t){if(!r(t)&&null!==t)throw TypeError("Can't set "+String(t)+" as a prototype");return t}},"3ca3":function(t,e,n){"use strict";var r=n("6547").charAt,a=n("69f3"),i=n("7dd0"),o="String Iterator",s=a.set,c=a.getterFor(o);i(String,"String",(function(t){s(this,{type:o,string:String(t),index:0})}),(function(){var t,e=c(this),n=e.string,a=e.index;return a>=n.length?{value:void 0,done:!0}:(t=r(n,a),e.index+=t.length,{value:t,done:!1})}))},"3f8c":function(t,e){t.exports={}},"428f":function(t,e,n){var r=n("da84");t.exports=r},"44ad":function(t,e,n){var r=n("d039"),a=n("c6b6"),i="".split;t.exports=r((function(){return!Object("z").propertyIsEnumerable(0)}))?function(t){return"String"==a(t)?i.call(t,""):Object(t)}:Object},"44d2":function(t,e,n){var r=n("b622"),a=n("7c73"),i=n("9112"),o=r("unscopables"),s=Array.prototype;void 0==s[o]&&i(s,o,a(null)),t.exports=function(t){s[o][t]=!0}},"466d":function(t,e,n){"use strict";var r=n("d784"),a=n("825a"),i=n("50c4"),o=n("1d80"),s=n("8aa5"),c=n("14c3");r("match",1,(function(t,e,n){return[function(e){var n=o(this),r=void 0==e?void 0:e[t];return void 0!==r?r.call(e,n):new RegExp(e)[t](String(n))},function(t){var r=n(e,t,this);if(r.done)return r.value;var o=a(t),u=String(this);if(!o.global)return c(o,u);var l=o.unicode;o.lastIndex=0;var f,d=[],h=0;while(null!==(f=c(o,u))){var p=String(f[0]);d[h]=p,""===p&&(o.lastIndex=s(u,i(o.lastIndex),l)),h++}return 0===h?null:d}]}))},4930:function(t,e,n){var r=n("d039");t.exports=!!Object.getOwnPropertySymbols&&!r((function(){return!String(Symbol())}))},"4d64":function(t,e,n){var r=n("fc6a"),a=n("50c4"),i=n("23cb"),o=function(t){return function(e,n,o){var s,c=r(e),u=a(c.length),l=i(o,u);if(t&&n!=n){while(u>l)if(s=c[l++],s!=s)return!0}else for(;u>l;l++)if((t||l in c)&&c[l]===n)return t||l||0;return!t&&-1}};t.exports={includes:o(!0),indexOf:o(!1)}},"4de4":function(t,e,n){"use strict";var r=n("23e7"),a=n("b727").filter,i=n("d039"),o=n("1dde"),s=o("filter"),c=s&&!i((function(){[].filter.call({length:-1,0:1},(function(t){throw t}))}));r({target:"Array",proto:!0,forced:!s||!c},{filter:function(t){return a(this,t,arguments.length>1?arguments[1]:void 0)}})},"4df4":function(t,e,n){"use strict";var r=n("f8c2"),a=n("7b0b"),i=n("9bdd"),o=n("e95a"),s=n("50c4"),c=n("8418"),u=n("35a1");t.exports=function(t){var e,n,l,f,d,h=a(t),p="function"==typeof this?this:Array,m=arguments.length,g=m>1?arguments[1]:void 0,v=void 0!==g,y=0,b=u(h);if(v&&(g=r(g,m>2?arguments[2]:void 0,2)),void 0==b||p==Array&&o(b))for(e=s(h.length),n=new p(e);e>y;y++)c(n,y,v?g(h[y],y):h[y]);else for(f=b.call(h),d=f.next,n=new p;!(l=d.call(f)).done;y++)c(n,y,v?i(f,g,[l.value,y],!0):l.value);return n.length=y,n}},"50c4":function(t,e,n){var r=n("a691"),a=Math.min;t.exports=function(t){return t>0?a(r(t),9007199254740991):0}},5135:function(t,e){var n={}.hasOwnProperty;t.exports=function(t,e){return n.call(t,e)}},5319:function(t,e,n){"use strict";var r=n("d784"),a=n("825a"),i=n("7b0b"),o=n("50c4"),s=n("a691"),c=n("1d80"),u=n("8aa5"),l=n("14c3"),f=Math.max,d=Math.min,h=Math.floor,p=/\$([$&'`]|\d\d?|<[^>]*>)/g,m=/\$([$&'`]|\d\d?)/g,g=function(t){return void 0===t?t:String(t)};r("replace",2,(function(t,e,n){return[function(n,r){var a=c(this),i=void 0==n?void 0:n[t];return void 0!==i?i.call(n,a,r):e.call(String(a),n,r)},function(t,i){var c=n(e,t,this,i);if(c.done)return c.value;var h=a(t),p=String(this),m="function"===typeof i;m||(i=String(i));var v=h.global;if(v){var y=h.unicode;h.lastIndex=0}var b=[];while(1){var D=l(h,p);if(null===D)break;if(b.push(D),!v)break;var w=String(D[0]);""===w&&(h.lastIndex=u(p,o(h.lastIndex),y))}for(var x="",S=0,M=0;M<b.length;M++){D=b[M];for(var k=String(D[0]),_=f(d(s(D.index),p.length),0),O=[],T=1;T<D.length;T++)O.push(g(D[T]));var C=D.groups;if(m){var P=[k].concat(O,_,p);void 0!==C&&P.push(C);var j=String(i.apply(void 0,P))}else j=r(k,p,_,O,C,i);_>=S&&(x+=p.slice(S,_)+j,S=_+k.length)}return x+p.slice(S)}];function r(t,n,r,a,o,s){var c=r+t.length,u=a.length,l=m;return void 0!==o&&(o=i(o),l=p),e.call(s,l,(function(e,i){var s;switch(i.charAt(0)){case"$":return"$";case"&":return t;case"`":return n.slice(0,r);case"'":return n.slice(c);case"<":s=o[i.slice(1,-1)];break;default:var l=+i;if(0===l)return e;if(l>u){var f=h(l/10);return 0===f?e:f<=u?void 0===a[f-1]?i.charAt(1):a[f-1]+i.charAt(1):e}s=a[l-1]}return void 0===s?"":s}))}}))},"53ca":function(t,e,n){"use strict";n.d(e,"a",(function(){return a}));n("a4d3"),n("e01a"),n("d28b"),n("e260"),n("d3b7"),n("3ca3"),n("ddb0");function r(t){return r="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"===typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},r(t)}function a(t){return a="function"===typeof Symbol&&"symbol"===r(Symbol.iterator)?function(t){return r(t)}:function(t){return t&&"function"===typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":r(t)},a(t)}},5692:function(t,e,n){var r=n("c430"),a=n("c6cd");(t.exports=function(t,e){return a[t]||(a[t]=void 0!==e?e:{})})("versions",[]).push({version:"3.5.0",mode:r?"pure":"global",copyright:"© 2019 Denis Pushkarev (zloirock.ru)"})},"56ef":function(t,e,n){var r=n("d066"),a=n("241c"),i=n("7418"),o=n("825a");t.exports=r("Reflect","ownKeys")||function(t){var e=a.f(o(t)),n=i.f;return n?e.concat(n(t)):e}},5899:function(t,e){t.exports="\t\n\v\f\r                　\u2028\u2029\ufeff"},"58a8":function(t,e,n){var r=n("1d80"),a=n("5899"),i="["+a+"]",o=RegExp("^"+i+i+"*"),s=RegExp(i+i+"*$"),c=function(t){return function(e){var n=String(r(e));return 1&t&&(n=n.replace(o,"")),2&t&&(n=n.replace(s,"")),n}};t.exports={start:c(1),end:c(2),trim:c(3)}},"5c6c":function(t,e){t.exports=function(t,e){return{enumerable:!(1&t),configurable:!(2&t),writable:!(4&t),value:e}}},"60ae":function(t,e,n){var r,a,i=n("da84"),o=n("b39a"),s=i.process,c=s&&s.versions,u=c&&c.v8;u?(r=u.split("."),a=r[0]+r[1]):o&&(r=o.match(/Edge\/(\d+)/),(!r||r[1]>=74)&&(r=o.match(/Chrome\/(\d+)/),r&&(a=r[1]))),t.exports=a&&+a},6547:function(t,e,n){var r=n("a691"),a=n("1d80"),i=function(t){return function(e,n){var i,o,s=String(a(e)),c=r(n),u=s.length;return c<0||c>=u?t?"":void 0:(i=s.charCodeAt(c),i<55296||i>56319||c+1===u||(o=s.charCodeAt(c+1))<56320||o>57343?t?s.charAt(c):i:t?s.slice(c,c+2):o-56320+(i-55296<<10)+65536)}};t.exports={codeAt:i(!1),charAt:i(!0)}},"65f0":function(t,e,n){var r=n("861d"),a=n("e8b5"),i=n("b622"),o=i("species");t.exports=function(t,e){var n;return a(t)&&(n=t.constructor,"function"!=typeof n||n!==Array&&!a(n.prototype)?r(n)&&(n=n[o],null===n&&(n=void 0)):n=void 0),new(void 0===n?Array:n)(0===e?0:e)}},"69f3":function(t,e,n){var r,a,i,o=n("7f9a"),s=n("da84"),c=n("861d"),u=n("9112"),l=n("5135"),f=n("f772"),d=n("d012"),h=s.WeakMap,p=function(t){return i(t)?a(t):r(t,{})},m=function(t){return function(e){var n;if(!c(e)||(n=a(e)).type!==t)throw TypeError("Incompatible receiver, "+t+" required");return n}};if(o){var g=new h,v=g.get,y=g.has,b=g.set;r=function(t,e){return b.call(g,t,e),e},a=function(t){return v.call(g,t)||{}},i=function(t){return y.call(g,t)}}else{var D=f("state");d[D]=!0,r=function(t,e){return u(t,D,e),e},a=function(t){return l(t,D)?t[D]:{}},i=function(t){return l(t,D)}}t.exports={set:r,get:a,has:i,enforce:p,getterFor:m}},"6eeb":function(t,e,n){var r=n("da84"),a=n("9112"),i=n("5135"),o=n("ce4e"),s=n("8925"),c=n("69f3"),u=c.get,l=c.enforce,f=String(String).split("String");(t.exports=function(t,e,n,s){var c=!!s&&!!s.unsafe,u=!!s&&!!s.enumerable,d=!!s&&!!s.noTargetGet;"function"==typeof n&&("string"!=typeof e||i(n,"name")||a(n,"name",e),l(n).source=f.join("string"==typeof e?e:"")),t!==r?(c?!d&&t[e]&&(u=!0):delete t[e],u?t[e]=n:a(t,e,n)):u?t[e]=n:o(e,n)})(Function.prototype,"toString",(function(){return"function"==typeof this&&u(this).source||s(this)}))},7156:function(t,e,n){var r=n("861d"),a=n("d2bb");t.exports=function(t,e,n){var i,o;return a&&"function"==typeof(i=e.constructor)&&i!==n&&r(o=i.prototype)&&o!==n.prototype&&a(t,o),t}},7418:function(t,e){e.f=Object.getOwnPropertySymbols},"746f":function(t,e,n){var r=n("428f"),a=n("5135"),i=n("c032"),o=n("9bf2").f;t.exports=function(t){var e=r.Symbol||(r.Symbol={});a(e,t)||o(e,t,{value:i.f(t)})}},7839:function(t,e){t.exports=["constructor","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","toLocaleString","toString","valueOf"]},"7a50":function(t,e,n){"use strict";n.r(e);n("a4d3"),n("4de4"),n("d81d"),n("fb6a"),n("e439"),n("dbb4"),n("b64b"),n("159b");var r=n("ade3"),a=(n("d3b7"),n("466d"),n("5319"),n("53ca")),i=function(){var t=/d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZWN]|"[^"]*"|'[^']*'/g,e=/\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,n=/[^-+\dA-Z]/g;return function(r,a,l,f){if(1!==arguments.length||"string"!==u(r)||/\d/.test(r)||(a=r,r=void 0),r=r||new Date,r instanceof Date||(r=new Date(r)),isNaN(r))throw TypeError("Invalid date");a=String(i.masks[a]||a||i.masks["default"]);var d=a.slice(0,4);"UTC:"!==d&&"GMT:"!==d||(a=a.slice(4),l=!0,"GMT:"===d&&(f=!0));var h=l?"getUTC":"get",p=r[h+"Date"](),m=r[h+"Day"](),g=r[h+"Month"](),v=r[h+"FullYear"](),y=r[h+"Hours"](),b=r[h+"Minutes"](),D=r[h+"Seconds"](),w=r[h+"Milliseconds"](),x=l?0:r.getTimezoneOffset(),S=s(r),M=c(r),k={d:p,dd:o(p),ddd:i.i18n.dayNames[m],dddd:i.i18n.dayNames[m+7],m:g+1,mm:o(g+1),mmm:i.i18n.monthNames[g],mmmm:i.i18n.monthNames[g+12],yy:String(v).slice(2),yyyy:v,h:y%12||12,hh:o(y%12||12),H:y,HH:o(y),M:b,MM:o(b),s:D,ss:o(D),l:o(w,3),L:o(Math.round(w/10)),t:y<12?i.i18n.timeNames[0]:i.i18n.timeNames[1],tt:y<12?i.i18n.timeNames[2]:i.i18n.timeNames[3],T:y<12?i.i18n.timeNames[4]:i.i18n.timeNames[5],TT:y<12?i.i18n.timeNames[6]:i.i18n.timeNames[7],Z:f?"GMT":l?"UTC":(String(r).match(e)||[""]).pop().replace(n,""),o:(x>0?"-":"+")+o(100*Math.floor(Math.abs(x)/60)+Math.abs(x)%60,4),S:["th","st","nd","rd"][p%10>3?0:(p%100-p%10!=10)*p%10],W:S,N:M};return a.replace(t,(function(t){return t in k?k[t]:t.slice(1,t.length-1)}))}}();function o(t,e){t=String(t),e=e||2;while(t.length<e)t="0"+t;return t}function s(t){var e=new Date(t.getFullYear(),t.getMonth(),t.getDate());e.setDate(e.getDate()-(e.getDay()+6)%7+3);var n=new Date(e.getFullYear(),0,4);n.setDate(n.getDate()-(n.getDay()+6)%7+3);var r=e.getTimezoneOffset()-n.getTimezoneOffset();e.setHours(e.getHours()-r);var a=(e-n)/6048e5;return 1+Math.floor(a)}function c(t){var e=t.getDay();return 0===e&&(e=7),e}function u(t){return null===t?"null":void 0===t?"undefined":"object"!==Object(a["a"])(t)?Object(a["a"])(t):Array.isArray(t)?"array":{}.toString.call(t).slice(8,-1).toLowerCase()}function l(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function f(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?l(Object(n),!0).forEach((function(e){Object(r["a"])(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}i.masks={default:"ddd mmm dd yyyy HH:MM:ss",shortDate:"m/d/yy",mediumDate:"mmm d, yyyy",longDate:"mmmm d, yyyy",fullDate:"dddd, mmmm d, yyyy",shortTime:"h:MM TT",mediumTime:"h:MM:ss TT",longTime:"h:MM:ss TT Z",isoDate:"yyyy-mm-dd",isoTime:"HH:MM:ss",isoDateTime:"yyyy-mm-dd'T'HH:MM:sso",isoUtcDateTime:"UTC:yyyy-mm-dd'T'HH:MM:ss'Z'",expiresHeaderFormat:"ddd, dd mmm yyyy HH:MM:ss Z"},i.i18n={dayNames:["Sun","Mon","Tue","Wed","Thu","Fri","Sat","Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],monthNames:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec","January","February","March","April","May","June","July","August","September","October","November","December"],timeNames:["a","p","am","pm","A","P","AM","PM"]};var d={isSame:function(t,e,n){var r=new Date(t),a=new Date(e);return"date"===n&&(r.setHours(0,0,0,0),a.setHours(0,0,0,0)),r.getTime()===a.getTime()},daysInMonth:function(t,e){return new Date(t,e,0).getDate()},weekNumber:function(t){return s(t)},format:function(t,e){return i(t,e)},nextMonth:function(t){var e=new Date(t.getTime());return e.setDate(1),e.setMonth(e.getMonth()+1),e},prevMonth:function(t){var e=new Date(t.getTime());return e.setDate(1),e.setMonth(e.getMonth()-1),e},validateDateRange:function(t,e,n){var r=new Date(n),a=new Date(e);return n&&t.getTime()>r.getTime()?r:e&&t.getTime()<a.getTime()?a:t},localeData:function(t){var e={direction:"ltr",format:"mm/dd/yyyy",separator:" - ",applyLabel:"Apply",cancelLabel:"Cancel",weekLabel:"W",customRangeLabel:"Custom Range",daysOfWeek:i.i18n.dayNames.slice(0,7).map((function(t){return t.substring(0,2)})),monthNames:i.i18n.monthNames.slice(0,12),firstDay:0};return f({},e,{},t)},yearMonth:function(t){var e=t.getMonth()+1;return t.getFullYear()+(e<10?"0":"")+e},isValidDate:function(t){return t instanceof Date&&!isNaN(t)}};e["default"]=d},"7b0b":function(t,e,n){var r=n("1d80");t.exports=function(t){return Object(r(t))}},"7c73":function(t,e,n){var r=n("825a"),a=n("37e8"),i=n("7839"),o=n("d012"),s=n("1be4"),c=n("cc12"),u=n("f772"),l=u("IE_PROTO"),f="prototype",d=function(){},h=function(){var t,e=c("iframe"),n=i.length,r="<",a="script",o=">",u="java"+a+":";e.style.display="none",s.appendChild(e),e.src=String(u),t=e.contentWindow.document,t.open(),t.write(r+a+o+"document.F=Object"+r+"/"+a+o),t.close(),h=t.F;while(n--)delete h[f][i[n]];return h()};t.exports=Object.create||function(t,e){var n;return null!==t?(d[f]=r(t),n=new d,d[f]=null,n[l]=t):n=h(),void 0===e?n:a(n,e)},o[l]=!0},"7db0":function(t,e,n){"use strict";var r=n("23e7"),a=n("b727").find,i=n("44d2"),o="find",s=!0;o in[]&&Array(1)[o]((function(){s=!1})),r({target:"Array",proto:!0,forced:s},{find:function(t){return a(this,t,arguments.length>1?arguments[1]:void 0)}}),i(o)},"7dd0":function(t,e,n){"use strict";var r=n("23e7"),a=n("9ed3"),i=n("e163"),o=n("d2bb"),s=n("d44e"),c=n("9112"),u=n("6eeb"),l=n("b622"),f=n("c430"),d=n("3f8c"),h=n("ae93"),p=h.IteratorPrototype,m=h.BUGGY_SAFARI_ITERATORS,g=l("iterator"),v="keys",y="values",b="entries",D=function(){return this};t.exports=function(t,e,n,l,h,w,x){a(n,e,l);var S,M,k,_=function(t){if(t===h&&j)return j;if(!m&&t in C)return C[t];switch(t){case v:return function(){return new n(this,t)};case y:return function(){return new n(this,t)};case b:return function(){return new n(this,t)}}return function(){return new n(this)}},O=e+" Iterator",T=!1,C=t.prototype,P=C[g]||C["@@iterator"]||h&&C[h],j=!m&&P||_(h),A="Array"==e&&C.entries||P;if(A&&(S=i(A.call(new t)),p!==Object.prototype&&S.next&&(f||i(S)===p||(o?o(S,p):"function"!=typeof S[g]&&c(S,g,D)),s(S,O,!0,!0),f&&(d[O]=D))),h==y&&P&&P.name!==y&&(T=!0,j=function(){return P.call(this)}),f&&!x||C[g]===j||c(C,g,j),d[e]=j,h)if(M={values:_(y),keys:w?j:_(v),entries:_(b)},x)for(k in M)!m&&!T&&k in C||u(C,k,M[k]);else r({target:e,proto:!0,forced:m||T},M);return M}},"7f9a":function(t,e,n){var r=n("da84"),a=n("8925"),i=r.WeakMap;t.exports="function"===typeof i&&/native code/.test(a(i))},"825a":function(t,e,n){var r=n("861d");t.exports=function(t){if(!r(t))throw TypeError(String(t)+" is not an object");return t}},"83ab":function(t,e,n){var r=n("d039");t.exports=!r((function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a}))},8418:function(t,e,n){"use strict";var r=n("c04e"),a=n("9bf2"),i=n("5c6c");t.exports=function(t,e,n){var o=r(e);o in t?a.f(t,o,i(0,n)):t[o]=n}},"861d":function(t,e){t.exports=function(t){return"object"===typeof t?null!==t:"function"===typeof t}},8925:function(t,e,n){var r=n("c6cd"),a=Function.toString;"function"!=typeof r.inspectSource&&(r.inspectSource=function(t){return a.call(t)}),t.exports=r.inspectSource},"8aa5":function(t,e,n){"use strict";var r=n("6547").charAt;t.exports=function(t,e,n){return e+(n?r(t,e).length:1)}},"8b2e":function(t,e,n){},"90e3":function(t,e){var n=0,r=Math.random();t.exports=function(t){return"Symbol("+String(void 0===t?"":t)+")_"+(++n+r).toString(36)}},9112:function(t,e,n){var r=n("83ab"),a=n("9bf2"),i=n("5c6c");t.exports=r?function(t,e,n){return a.f(t,e,i(1,n))}:function(t,e,n){return t[e]=n,t}},9263:function(t,e,n){"use strict";var r=n("ad6d"),a=RegExp.prototype.exec,i=String.prototype.replace,o=a,s=function(){var t=/a/,e=/b*/g;return a.call(t,"a"),a.call(e,"a"),0!==t.lastIndex||0!==e.lastIndex}(),c=void 0!==/()??/.exec("")[1],u=s||c;u&&(o=function(t){var e,n,o,u,l=this;return c&&(n=new RegExp("^"+l.source+"$(?!\\s)",r.call(l))),s&&(e=l.lastIndex),o=a.call(l,t),s&&o&&(l.lastIndex=l.global?o.index+o[0].length:e),c&&o&&o.length>1&&i.call(o[0],n,(function(){for(u=1;u<arguments.length-2;u++)void 0===arguments[u]&&(o[u]=void 0)})),o}),t.exports=o},"94ca":function(t,e,n){var r=n("d039"),a=/#|\.prototype\./,i=function(t,e){var n=s[o(t)];return n==u||n!=c&&("function"==typeof e?r(e):!!e)},o=i.normalize=function(t){return String(t).replace(a,".").toLowerCase()},s=i.data={},c=i.NATIVE="N",u=i.POLYFILL="P";t.exports=i},"9bdd":function(t,e,n){var r=n("825a");t.exports=function(t,e,n,a){try{return a?e(r(n)[0],n[1]):e(n)}catch(o){var i=t["return"];throw void 0!==i&&r(i.call(t)),o}}},"9bf2":function(t,e,n){var r=n("83ab"),a=n("0cfb"),i=n("825a"),o=n("c04e"),s=Object.defineProperty;e.f=r?s:function(t,e,n){if(i(t),e=o(e,!0),i(n),a)try{return s(t,e,n)}catch(r){}if("get"in n||"set"in n)throw TypeError("Accessors not supported");return"value"in n&&(t[e]=n.value),t}},"9d0d":function(t,e,n){"use strict";var r=n("8b2e"),a=n.n(r);a.a},"9ed3":function(t,e,n){"use strict";var r=n("ae93").IteratorPrototype,a=n("7c73"),i=n("5c6c"),o=n("d44e"),s=n("3f8c"),c=function(){return this};t.exports=function(t,e,n){var u=e+" Iterator";return t.prototype=a(r,{next:i(1,n)}),o(t,u,!1,!0),s[u]=c,t}},a4d3:function(t,e,n){"use strict";var r=n("23e7"),a=n("da84"),i=n("d066"),o=n("c430"),s=n("83ab"),c=n("4930"),u=n("fdbf"),l=n("d039"),f=n("5135"),d=n("e8b5"),h=n("861d"),p=n("825a"),m=n("7b0b"),g=n("fc6a"),v=n("c04e"),y=n("5c6c"),b=n("7c73"),D=n("df75"),w=n("241c"),x=n("057f"),S=n("7418"),M=n("06cf"),k=n("9bf2"),_=n("d1e7"),O=n("9112"),T=n("6eeb"),C=n("5692"),P=n("f772"),j=n("d012"),A=n("90e3"),N=n("b622"),R=n("c032"),$=n("746f"),E=n("d44e"),U=n("69f3"),F=n("b727").forEach,I=P("hidden"),L="Symbol",H="prototype",B=N("toPrimitive"),Y=U.set,W=U.getterFor(L),V=Object[H],G=a.Symbol,z=i("JSON","stringify"),J=M.f,Z=k.f,X=x.f,q=_.f,K=C("symbols"),Q=C("op-symbols"),tt=C("string-to-symbol-registry"),et=C("symbol-to-string-registry"),nt=C("wks"),rt=a.QObject,at=!rt||!rt[H]||!rt[H].findChild,it=s&&l((function(){return 7!=b(Z({},"a",{get:function(){return Z(this,"a",{value:7}).a}})).a}))?function(t,e,n){var r=J(V,e);r&&delete V[e],Z(t,e,n),r&&t!==V&&Z(V,e,r)}:Z,ot=function(t,e){var n=K[t]=b(G[H]);return Y(n,{type:L,tag:t,description:e}),s||(n.description=e),n},st=c&&"symbol"==typeof G.iterator?function(t){return"symbol"==typeof t}:function(t){return Object(t)instanceof G},ct=function(t,e,n){t===V&&ct(Q,e,n),p(t);var r=v(e,!0);return p(n),f(K,r)?(n.enumerable?(f(t,I)&&t[I][r]&&(t[I][r]=!1),n=b(n,{enumerable:y(0,!1)})):(f(t,I)||Z(t,I,y(1,{})),t[I][r]=!0),it(t,r,n)):Z(t,r,n)},ut=function(t,e){p(t);var n=g(e),r=D(n).concat(pt(n));return F(r,(function(e){s&&!ft.call(n,e)||ct(t,e,n[e])})),t},lt=function(t,e){return void 0===e?b(t):ut(b(t),e)},ft=function(t){var e=v(t,!0),n=q.call(this,e);return!(this===V&&f(K,e)&&!f(Q,e))&&(!(n||!f(this,e)||!f(K,e)||f(this,I)&&this[I][e])||n)},dt=function(t,e){var n=g(t),r=v(e,!0);if(n!==V||!f(K,r)||f(Q,r)){var a=J(n,r);return!a||!f(K,r)||f(n,I)&&n[I][r]||(a.enumerable=!0),a}},ht=function(t){var e=X(g(t)),n=[];return F(e,(function(t){f(K,t)||f(j,t)||n.push(t)})),n},pt=function(t){var e=t===V,n=X(e?Q:g(t)),r=[];return F(n,(function(t){!f(K,t)||e&&!f(V,t)||r.push(K[t])})),r};if(c||(G=function(){if(this instanceof G)throw TypeError("Symbol is not a constructor");var t=arguments.length&&void 0!==arguments[0]?String(arguments[0]):void 0,e=A(t),n=function(t){this===V&&n.call(Q,t),f(this,I)&&f(this[I],e)&&(this[I][e]=!1),it(this,e,y(1,t))};return s&&at&&it(V,e,{configurable:!0,set:n}),ot(e,t)},T(G[H],"toString",(function(){return W(this).tag})),_.f=ft,k.f=ct,M.f=dt,w.f=x.f=ht,S.f=pt,s&&(Z(G[H],"description",{configurable:!0,get:function(){return W(this).description}}),o||T(V,"propertyIsEnumerable",ft,{unsafe:!0}))),u||(R.f=function(t){return ot(N(t),t)}),r({global:!0,wrap:!0,forced:!c,sham:!c},{Symbol:G}),F(D(nt),(function(t){$(t)})),r({target:L,stat:!0,forced:!c},{for:function(t){var e=String(t);if(f(tt,e))return tt[e];var n=G(e);return tt[e]=n,et[n]=e,n},keyFor:function(t){if(!st(t))throw TypeError(t+" is not a symbol");if(f(et,t))return et[t]},useSetter:function(){at=!0},useSimple:function(){at=!1}}),r({target:"Object",stat:!0,forced:!c,sham:!s},{create:lt,defineProperty:ct,defineProperties:ut,getOwnPropertyDescriptor:dt}),r({target:"Object",stat:!0,forced:!c},{getOwnPropertyNames:ht,getOwnPropertySymbols:pt}),r({target:"Object",stat:!0,forced:l((function(){S.f(1)}))},{getOwnPropertySymbols:function(t){return S.f(m(t))}}),z){var mt=!c||l((function(){var t=G();return"[null]"!=z([t])||"{}"!=z({a:t})||"{}"!=z(Object(t))}));r({target:"JSON",stat:!0,forced:mt},{stringify:function(t,e,n){var r,a=[t],i=1;while(arguments.length>i)a.push(arguments[i++]);if(r=e,(h(e)||void 0!==t)&&!st(t))return d(e)||(e=function(t,e){if("function"==typeof r&&(e=r.call(this,t,e)),!st(e))return e}),a[1]=e,z.apply(null,a)}})}G[H][B]||O(G[H],B,G[H].valueOf),E(G,L),j[I]=!0},a630:function(t,e,n){var r=n("23e7"),a=n("4df4"),i=n("1c7e"),o=!i((function(t){Array.from(t)}));r({target:"Array",stat:!0,forced:o},{from:a})},a691:function(t,e){var n=Math.ceil,r=Math.floor;t.exports=function(t){return isNaN(t=+t)?0:(t>0?r:n)(t)}},a6da:function(t,e,n){var r={"./native":"7a50","./native.js":"7a50"};function a(t){var e=i(t);return n(e)}function i(t){if(!n.o(r,t)){var e=new Error("Cannot find module '"+t+"'");throw e.code="MODULE_NOT_FOUND",e}return r[t]}a.keys=function(){return Object.keys(r)},a.resolve=i,t.exports=a,a.id="a6da"},a9e3:function(t,e,n){"use strict";var r=n("83ab"),a=n("da84"),i=n("94ca"),o=n("6eeb"),s=n("5135"),c=n("c6b6"),u=n("7156"),l=n("c04e"),f=n("d039"),d=n("7c73"),h=n("241c").f,p=n("06cf").f,m=n("9bf2").f,g=n("58a8").trim,v="Number",y=a[v],b=y.prototype,D=c(d(b))==v,w=function(t){var e,n,r,a,i,o,s,c,u=l(t,!1);if("string"==typeof u&&u.length>2)if(u=g(u),e=u.charCodeAt(0),43===e||45===e){if(n=u.charCodeAt(2),88===n||120===n)return NaN}else if(48===e){switch(u.charCodeAt(1)){case 66:case 98:r=2,a=49;break;case 79:case 111:r=8,a=55;break;default:return+u}for(i=u.slice(2),o=i.length,s=0;s<o;s++)if(c=i.charCodeAt(s),c<48||c>a)return NaN;return parseInt(i,r)}return+u};if(i(v,!y(" 0o1")||!y("0b1")||y("+0x1"))){for(var x,S=function(t){var e=arguments.length<1?0:t,n=this;return n instanceof S&&(D?f((function(){b.valueOf.call(n)})):c(n)!=v)?u(new y(w(e)),n,S):w(e)},M=r?h(y):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger".split(","),k=0;M.length>k;k++)s(y,x=M[k])&&!s(S,x)&&m(S,x,p(y,x));S.prototype=b,b.constructor=S,o(a,v,S)}},ad6d:function(t,e,n){"use strict";var r=n("825a");t.exports=function(){var t=r(this),e="";return t.global&&(e+="g"),t.ignoreCase&&(e+="i"),t.multiline&&(e+="m"),t.dotAll&&(e+="s"),t.unicode&&(e+="u"),t.sticky&&(e+="y"),e}},ade3:function(t,e,n){"use strict";function r(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}n.d(e,"a",(function(){return r}))},ae93:function(t,e,n){"use strict";var r,a,i,o=n("e163"),s=n("9112"),c=n("5135"),u=n("b622"),l=n("c430"),f=u("iterator"),d=!1,h=function(){return this};[].keys&&(i=[].keys(),"next"in i?(a=o(o(i)),a!==Object.prototype&&(r=a)):d=!0),void 0==r&&(r={}),l||c(r,f)||s(r,f,h),t.exports={IteratorPrototype:r,BUGGY_SAFARI_ITERATORS:d}},b041:function(t,e,n){"use strict";var r=n("00ee"),a=n("f5df");t.exports=r?{}.toString:function(){return"[object "+a(this)+"]"}},b301:function(t,e,n){"use strict";var r=n("d039");t.exports=function(t,e){var n=[][t];return!n||!r((function(){n.call(null,e||function(){throw 1},1)}))}},b39a:function(t,e,n){var r=n("d066");t.exports=r("navigator","userAgent")||""},b622:function(t,e,n){var r=n("da84"),a=n("5692"),i=n("5135"),o=n("90e3"),s=n("4930"),c=n("fdbf"),u=a("wks"),l=r.Symbol,f=c?l:o;t.exports=function(t){return i(u,t)||(s&&i(l,t)?u[t]=l[t]:u[t]=f("Symbol."+t)),u[t]}},b64b:function(t,e,n){var r=n("23e7"),a=n("7b0b"),i=n("df75"),o=n("d039"),s=o((function(){i(1)}));r({target:"Object",stat:!0,forced:s},{keys:function(t){return i(a(t))}})},b727:function(t,e,n){var r=n("f8c2"),a=n("44ad"),i=n("7b0b"),o=n("50c4"),s=n("65f0"),c=[].push,u=function(t){var e=1==t,n=2==t,u=3==t,l=4==t,f=6==t,d=5==t||f;return function(h,p,m,g){for(var v,y,b=i(h),D=a(b),w=r(p,m,3),x=o(D.length),S=0,M=g||s,k=e?M(h,x):n?M(h,0):void 0;x>S;S++)if((d||S in D)&&(v=D[S],y=w(v,S,b),t))if(e)k[S]=y;else if(y)switch(t){case 3:return!0;case 5:return v;case 6:return S;case 2:c.call(k,v)}else if(l)return!1;return f?-1:u||l?l:k}};t.exports={forEach:u(0),map:u(1),filter:u(2),some:u(3),every:u(4),find:u(5),findIndex:u(6)}},beb7:function(t,e,n){},c032:function(t,e,n){var r=n("b622");e.f=r},c04e:function(t,e,n){var r=n("861d");t.exports=function(t,e){if(!r(t))return t;var n,a;if(e&&"function"==typeof(n=t.toString)&&!r(a=n.call(t)))return a;if("function"==typeof(n=t.valueOf)&&!r(a=n.call(t)))return a;if(!e&&"function"==typeof(n=t.toString)&&!r(a=n.call(t)))return a;throw TypeError("Can't convert object to primitive value")}},c430:function(t,e){t.exports=!1},c6b6:function(t,e){var n={}.toString;t.exports=function(t){return n.call(t).slice(8,-1)}},c6cd:function(t,e,n){var r=n("da84"),a=n("ce4e"),i="__core-js_shared__",o=r[i]||a(i,{});t.exports=o},c8ba:function(t,e){var n;n=function(){return this}();try{n=n||new Function("return this")()}catch(r){"object"===typeof window&&(n=window)}t.exports=n},ca84:function(t,e,n){var r=n("5135"),a=n("fc6a"),i=n("4d64").indexOf,o=n("d012");t.exports=function(t,e){var n,s=a(t),c=0,u=[];for(n in s)!r(o,n)&&r(s,n)&&u.push(n);while(e.length>c)r(s,n=e[c++])&&(~i(u,n)||u.push(n));return u}},cc12:function(t,e,n){var r=n("da84"),a=n("861d"),i=r.document,o=a(i)&&a(i.createElement);t.exports=function(t){return o?i.createElement(t):{}}},ce4e:function(t,e,n){var r=n("da84"),a=n("9112");t.exports=function(t,e){try{a(r,t,e)}catch(n){r[t]=e}return e}},ce5f:function(t,e,n){"use strict";var r=n("18e6"),a=n.n(r);a.a},d012:function(t,e){t.exports={}},d039:function(t,e){t.exports=function(t){try{return!!t()}catch(e){return!0}}},d066:function(t,e,n){var r=n("428f"),a=n("da84"),i=function(t){return"function"==typeof t?t:void 0};t.exports=function(t,e){return arguments.length<2?i(r[t])||i(a[t]):r[t]&&r[t][e]||a[t]&&a[t][e]}},d1e7:function(t,e,n){"use strict";var r={}.propertyIsEnumerable,a=Object.getOwnPropertyDescriptor,i=a&&!r.call({1:2},1);e.f=i?function(t){var e=a(this,t);return!!e&&e.enumerable}:r},d28b:function(t,e,n){var r=n("746f");r("iterator")},d2bb:function(t,e,n){var r=n("825a"),a=n("3bbe");t.exports=Object.setPrototypeOf||("__proto__"in{}?function(){var t,e=!1,n={};try{t=Object.getOwnPropertyDescriptor(Object.prototype,"__proto__").set,t.call(n,[]),e=n instanceof Array}catch(i){}return function(n,i){return r(n),a(i),e?t.call(n,i):n.__proto__=i,n}}():void 0)},d3b7:function(t,e,n){var r=n("00ee"),a=n("6eeb"),i=n("b041");r||a(Object.prototype,"toString",i,{unsafe:!0})},d44e:function(t,e,n){var r=n("9bf2").f,a=n("5135"),i=n("b622"),o=i("toStringTag");t.exports=function(t,e,n){t&&!a(t=n?t:t.prototype,o)&&r(t,o,{configurable:!0,value:e})}},d784:function(t,e,n){"use strict";var r=n("9112"),a=n("6eeb"),i=n("d039"),o=n("b622"),s=n("9263"),c=o("species"),u=!i((function(){var t=/./;return t.exec=function(){var t=[];return t.groups={a:"7"},t},"7"!=="".replace(t,"$<a>")})),l=!i((function(){var t=/(?:)/,e=t.exec;t.exec=function(){return e.apply(this,arguments)};var n="ab".split(t);return 2!==n.length||"a"!==n[0]||"b"!==n[1]}));t.exports=function(t,e,n,f){var d=o(t),h=!i((function(){var e={};return e[d]=function(){return 7},7!=""[t](e)})),p=h&&!i((function(){var e=!1,n=/a/;return"split"===t&&(n={},n.constructor={},n.constructor[c]=function(){return n},n.flags="",n[d]=/./[d]),n.exec=function(){return e=!0,null},n[d](""),!e}));if(!h||!p||"replace"===t&&!u||"split"===t&&!l){var m=/./[d],g=n(d,""[t],(function(t,e,n,r,a){return e.exec===s?h&&!a?{done:!0,value:m.call(e,n,r)}:{done:!0,value:t.call(n,e,r)}:{done:!1}})),v=g[0],y=g[1];a(String.prototype,t,v),a(RegExp.prototype,d,2==e?function(t,e){return y.call(t,this,e)}:function(t){return y.call(t,this)}),f&&r(RegExp.prototype[d],"sham",!0)}}},d81d:function(t,e,n){"use strict";var r=n("23e7"),a=n("b727").map,i=n("d039"),o=n("1dde"),s=o("map"),c=s&&!i((function(){[].map.call({length:-1,0:1},(function(t){throw t}))}));r({target:"Array",proto:!0,forced:!s||!c},{map:function(t){return a(this,t,arguments.length>1?arguments[1]:void 0)}})},da84:function(t,e,n){(function(e){var n=function(t){return t&&t.Math==Math&&t};t.exports=n("object"==typeof globalThis&&globalThis)||n("object"==typeof window&&window)||n("object"==typeof self&&self)||n("object"==typeof e&&e)||Function("return this")()}).call(this,n("c8ba"))},dbb4:function(t,e,n){var r=n("23e7"),a=n("83ab"),i=n("56ef"),o=n("fc6a"),s=n("06cf"),c=n("8418");r({target:"Object",stat:!0,sham:!a},{getOwnPropertyDescriptors:function(t){var e,n,r=o(t),a=s.f,u=i(r),l={},f=0;while(u.length>f)n=a(r,e=u[f++]),void 0!==n&&c(l,e,n);return l}})},ddb0:function(t,e,n){var r=n("da84"),a=n("fdbc"),i=n("e260"),o=n("9112"),s=n("b622"),c=s("iterator"),u=s("toStringTag"),l=i.values;for(var f in a){var d=r[f],h=d&&d.prototype;if(h){if(h[c]!==l)try{o(h,c,l)}catch(m){h[c]=l}if(h[u]||o(h,u,f),a[f])for(var p in i)if(h[p]!==i[p])try{o(h,p,i[p])}catch(m){h[p]=i[p]}}}},df75:function(t,e,n){var r=n("ca84"),a=n("7839");t.exports=Object.keys||function(t){return r(t,a)}},e01a:function(t,e,n){"use strict";var r=n("23e7"),a=n("83ab"),i=n("da84"),o=n("5135"),s=n("861d"),c=n("9bf2").f,u=n("e893"),l=i.Symbol;if(a&&"function"==typeof l&&(!("description"in l.prototype)||void 0!==l().description)){var f={},d=function(){var t=arguments.length<1||void 0===arguments[0]?void 0:String(arguments[0]),e=this instanceof d?new l(t):void 0===t?l():l(t);return""===t&&(f[e]=!0),e};u(d,l);var h=d.prototype=l.prototype;h.constructor=d;var p=h.toString,m="Symbol(test)"==String(l("test")),g=/^Symbol\((.*)\)[^)]+$/;c(h,"description",{configurable:!0,get:function(){var t=s(this)?this.valueOf():this,e=p.call(t);if(o(f,t))return"";var n=m?e.slice(7,-1):e.replace(g,"$1");return""===n?void 0:n}}),r({global:!0,forced:!0},{Symbol:d})}},e163:function(t,e,n){var r=n("5135"),a=n("7b0b"),i=n("f772"),o=n("e177"),s=i("IE_PROTO"),c=Object.prototype;t.exports=o?Object.getPrototypeOf:function(t){return t=a(t),r(t,s)?t[s]:"function"==typeof t.constructor&&t instanceof t.constructor?t.constructor.prototype:t instanceof Object?c:null}},e177:function(t,e,n){var r=n("d039");t.exports=!r((function(){function t(){}return t.prototype.constructor=null,Object.getPrototypeOf(new t)!==t.prototype}))},e260:function(t,e,n){"use strict";var r=n("fc6a"),a=n("44d2"),i=n("3f8c"),o=n("69f3"),s=n("7dd0"),c="Array Iterator",u=o.set,l=o.getterFor(c);t.exports=s(Array,"Array",(function(t,e){u(this,{type:c,target:r(t),index:0,kind:e})}),(function(){var t=l(this),e=t.target,n=t.kind,r=t.index++;return!e||r>=e.length?(t.target=void 0,{value:void 0,done:!0}):"keys"==n?{value:r,done:!1}:"values"==n?{value:e[r],done:!1}:{value:[r,e[r]],done:!1}}),"values"),i.Arguments=i.Array,a("keys"),a("values"),a("entries")},e439:function(t,e,n){var r=n("23e7"),a=n("d039"),i=n("fc6a"),o=n("06cf").f,s=n("83ab"),c=a((function(){o(1)})),u=!s||c;r({target:"Object",stat:!0,forced:u,sham:!s},{getOwnPropertyDescriptor:function(t,e){return o(i(t),e)}})},e893:function(t,e,n){var r=n("5135"),a=n("56ef"),i=n("06cf"),o=n("9bf2");t.exports=function(t,e){for(var n=a(e),s=o.f,c=i.f,u=0;u<n.length;u++){var l=n[u];r(t,l)||s(t,l,c(e,l))}}},e8b5:function(t,e,n){var r=n("c6b6");t.exports=Array.isArray||function(t){return"Array"==r(t)}},e95a:function(t,e,n){var r=n("b622"),a=n("3f8c"),i=r("iterator"),o=Array.prototype;t.exports=function(t){return void 0!==t&&(a.Array===t||o[i]===t)}},f5df:function(t,e,n){var r=n("00ee"),a=n("c6b6"),i=n("b622"),o=i("toStringTag"),s="Arguments"==a(function(){return arguments}()),c=function(t,e){try{return t[e]}catch(n){}};t.exports=r?a:function(t){var e,n,r;return void 0===t?"Undefined":null===t?"Null":"string"==typeof(n=c(e=Object(t),o))?n:s?a(e):"Object"==(r=a(e))&&"function"==typeof e.callee?"Arguments":r}},f6fd:function(t,e){(function(t){var e="currentScript",n=t.getElementsByTagName("script");e in t||Object.defineProperty(t,e,{get:function(){try{throw new Error}catch(r){var t,e=(/.*at [^\(]*\((.*):.+:.+\)$/gi.exec(r.stack)||[!1])[1];for(t in n)if(n[t].src==e||"interactive"==n[t].readyState)return n[t];return null}}})})(document)},f772:function(t,e,n){var r=n("5692"),a=n("90e3"),i=r("keys");t.exports=function(t){return i[t]||(i[t]=a(t))}},f8c2:function(t,e,n){var r=n("1c0b");t.exports=function(t,e,n){if(r(t),void 0===e)return t;switch(n){case 0:return function(){return t.call(e)};case 1:return function(n){return t.call(e,n)};case 2:return function(n,r){return t.call(e,n,r)};case 3:return function(n,r,a){return t.call(e,n,r,a)}}return function(){return t.apply(e,arguments)}}},fb15:function(t,e,n){"use strict";var r;(n.r(e),"undefined"!==typeof window)&&(n("f6fd"),(r=window.document.currentScript)&&(r=r.src.match(/(.+\/)[^/]+\.js(\?.*)?$/))&&(n.p=r[1]));var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"vue-daterange-picker",class:{inline:"inline"===t.opens}},[n("div",{ref:"toggle",class:t.controlContainerClass,on:{click:t.onClickPicker}},[t._t("input",[n("i",{staticClass:"glyphicon glyphicon-calendar fa fa-calendar"}),t._v(" "),n("span",[t._v(t._s(t.rangeText))]),n("b",{staticClass:"caret"})],{startDate:t.start,endDate:t.end,ranges:t.ranges,rangeText:t.rangeText})],2),n("transition",{attrs:{name:"slide-fade",mode:"out-in"}},[t.open||"inline"===t.opens?n("div",{directives:[{name:"append-to-body",rawName:"v-append-to-body"}],ref:"dropdown",staticClass:"daterangepicker ltr",class:t.pickerStyles},[t._t("header",null,{rangeText:t.rangeText,locale:t.locale,clickCancel:t.clickCancel,clickApply:t.clickedApply,in_selection:t.in_selection,autoApply:t.autoApply}),n("div",{staticClass:"calendars"},[t.showRanges?t._t("ranges",[n("calendar-ranges",{attrs:{"always-show-calendars":t.alwaysShowCalendars,"locale-data":t.locale,ranges:t.ranges,selected:{startDate:t.start,endDate:t.end}},on:{"click-range":t.clickRange,"show-custom-range":function(e){t.showCustomRangeCalendars=!0}}})],{startDate:t.start,endDate:t.end,ranges:t.ranges,clickRange:t.clickRange}):t._e(),t.showCalendars?n("div",{staticClass:"calendars-container"},[n("div",{staticClass:"drp-calendar col left",class:{single:t.singleDatePicker}},[t._e(),n("div",{staticClass:"calendar-table"},[n("calendar",{attrs:{monthDate:t.monthDate,"locale-data":t.locale,start:t.start,end:t.end,minDate:t.min,maxDate:t.max,"show-dropdowns":t.showDropdowns,"date-format":t.dateFormatFn,showWeekNumbers:t.showWeekNumbers},on:{"change-month":t.changeLeftMonth,"date-click":t.dateClick,"hover-date":t.hoverDate},scopedSlots:t._u([{key:"date-slot",fn:function(e){return t._t("date",null,null,e)}}],null,!0)})],1),t.timePicker&&t.start?n("calendar-time",{attrs:{"miniute-increment":t.timePickerIncrement,hour24:t.timePicker24Hour,"second-picker":t.timePickerSeconds,"current-time":t.start,readonly:t.readonly},on:{update:t.onUpdateStartTime}}):t._e()],1),t.singleDatePicker?t._e():n("div",{staticClass:"drp-calendar col right"},[t._e(),n("div",{staticClass:"calendar-table"},[n("calendar",{attrs:{monthDate:t.nextMonthDate,"locale-data":t.locale,start:t.start,end:t.end,minDate:t.min,maxDate:t.max,"show-dropdowns":t.showDropdowns,"date-format":t.dateFormatFn,showWeekNumbers:t.showWeekNumbers},on:{"change-month":t.changeRightMonth,"date-click":t.dateClick,"hover-date":t.hoverDate},scopedSlots:t._u([{key:"date-slot",fn:function(e){return t._t("date",null,null,e)}}],null,!0)})],1),t.timePicker&&t.end?n("calendar-time",{attrs:{"miniute-increment":t.timePickerIncrement,hour24:t.timePicker24Hour,"second-picker":t.timePickerSeconds,"current-time":t.end,readonly:t.readonly},on:{update:t.onUpdateEndTime}}):t._e()],1)]):t._e()],2),t._t("footer",[t.autoApply?t._e():n("div",{staticClass:"drp-buttons"},[t.showCalendars?n("span",{staticClass:"drp-selected"},[t._v(t._s(t.rangeText))]):t._e(),t.readonly?t._e():n("button",{staticClass:"cancelBtn btn btn-sm btn-secondary",attrs:{type:"button"},on:{click:t.clickCancel}},[t._v(t._s(t.locale.cancelLabel)+" ")]),t.readonly?t._e():n("button",{staticClass:"applyBtn btn btn-sm btn-success",attrs:{disabled:t.in_selection,type:"button"},on:{click:t.clickedApply}},[t._v(t._s(t.locale.applyLabel)+" ")])])],{rangeText:t.rangeText,locale:t.locale,clickCancel:t.clickCancel,clickApply:t.clickedApply,in_selection:t.in_selection,autoApply:t.autoApply})],2):t._e()])],1)},i=[],o=(n("a4d3"),n("4de4"),n("7db0"),n("a9e3"),n("e439"),n("dbb4"),n("b64b"),n("159b"),n("53ca"));function s(t){if(Array.isArray(t)){for(var e=0,n=new Array(t.length);e<t.length;e++)n[e]=t[e];return n}}n("e01a"),n("d28b"),n("a630"),n("e260"),n("d3b7"),n("25f0"),n("3ca3"),n("ddb0");function c(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}function u(){throw new TypeError("Invalid attempt to spread non-iterable instance")}function l(t){return s(t)||c(t)||u()}var f=n("ade3"),d=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"native";return t instanceof Object?t:"string"===typeof t||t instanceof String?n("a6da")("./"+t).default:void 0},h={props:{dateUtil:{type:[Object,String],default:"native"}},beforeCreate:function(){this.$dateUtil=d("native")}},p=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("table",{staticClass:"table-condensed"},[n("thead",[n("tr",[n("th",{staticClass:"prev available",attrs:{tabindex:"0"},on:{click:t.prevMonthClick}},[n("span")]),t.showDropdowns?n("th",{staticClass:"month",attrs:{colspan:t.showWeekNumbers?6:5}},[n("div",{staticClass:"row mx-1"},[n("select",{directives:[{name:"model",rawName:"v-model",value:t.month,expression:"month"}],staticClass:"monthselect col",on:{change:function(e){var n=Array.prototype.filter.call(e.target.options,(function(t){return t.selected})).map((function(t){var e="_value"in t?t._value:t.value;return e}));t.month=e.target.multiple?n:n[0]}}},t._l(t.months,(function(e,r){return n("option",{key:r,attrs:{disabled:!e.enabled},domProps:{value:e.value+1}},[t._v(t._s(e.label))])})),0),n("input",{directives:[{name:"model",rawName:"v-model",value:t.year,expression:"year"}],ref:"yearSelect",staticClass:"yearselect col",attrs:{type:"number"},domProps:{value:t.year},on:{blur:t.checkYear,input:function(e){e.target.composing||(t.year=e.target.value)}}})])]):n("th",{staticClass:"month",attrs:{colspan:t.showWeekNumbers?6:5}},[t._v(t._s(t.monthName)+" "+t._s(t.year))]),n("th",{staticClass:"next available",attrs:{tabindex:"0"},on:{click:t.nextMonthClick}},[n("span")])])]),n("tbody",[n("tr",[t.showWeekNumbers?n("th",{staticClass:"week"},[t._v(t._s(t.locale.weekLabel))]):t._e(),t._l(t.locale.daysOfWeek,(function(e,r){return n("th",{key:r},[t._v(t._s(e))])}))],2),t._l(t.calendar,(function(e,r){return n("tr",{key:r},[t.showWeekNumbers&&(r%7||0===r)?n("td",{staticClass:"week"},[t._v(" "+t._s(t.$dateUtil.weekNumber(e[0]))+" ")]):t._e(),t._l(e,(function(e,r){return n("td",{key:r,class:t.dayClass(e),attrs:{"data-date":e.toISOString().substring(0,10)},on:{click:function(n){return t.$emit("date-click",e)},mouseover:function(n){return t.$emit("hover-date",e)}}},[t._t("date-slot",[t._v(" "+t._s(e.getDate())+" ")],{date:e})],2)}))],2)}))],2)])},m=[],g=(n("d81d"),{mixins:[h],name:"calendar",props:{monthDate:Date,localeData:Object,start:Date,end:Date,minDate:Date,maxDate:Date,showDropdowns:{type:Boolean,default:!1},showWeekNumbers:{type:Boolean,default:!1},dateFormat:{type:Function,default:null}},data:function(){var t=this.monthDate||this.start||new Date;return{currentMonthDate:t,year_text:t.getFullYear()}},methods:{prevMonthClick:function(){this.changeMonthDate(this.$dateUtil.prevMonth(this.currentMonthDate))},nextMonthClick:function(){this.changeMonthDate(this.$dateUtil.nextMonth(this.currentMonthDate))},changeMonthDate:function(t){var e=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],n=this.$dateUtil.yearMonth(this.currentMonthDate);this.currentMonthDate=this.$dateUtil.validateDateRange(t,this.minDate,this.maxDate),e&&n!==this.$dateUtil.yearMonth(this.currentMonthDate)&&this.$emit("change-month",{month:this.currentMonthDate.getMonth()+1,year:this.currentMonthDate.getFullYear()}),this.checkYear()},dayClass:function(t){var e=new Date(t);e.setHours(0,0,0,0);var n=new Date(this.start);n.setHours(0,0,0,0);var r=new Date(this.end);r.setHours(0,0,0,0);var a=new Date(e);a.setHours(23,59,59,999);var i={off:t.getMonth()+1!==this.month,weekend:6===t.getDay()||0===t.getDay(),today:e.setHours(0,0,0,0)==(new Date).setHours(0,0,0,0),active:e.setHours(0,0,0,0)==new Date(this.start).setHours(0,0,0,0)||e.setHours(0,0,0,0)==new Date(this.end).setHours(0,0,0,0),"in-range":e>=n&&e<=r,"start-date":e.getTime()===n.getTime(),"end-date":e.getTime()===r.getTime(),disabled:this.minDate&&a.getTime()<this.minDate.getTime()||this.maxDate&&e.getTime()>this.maxDate.getTime()};return this.dateFormat?this.dateFormat(i,t):i},checkYear:function(){var t=this;this.$refs.yearSelect!==document.activeElement&&this.$nextTick((function(){t.year_text=t.monthDate.getFullYear()}))}},computed:{monthName:function(){return this.locale.monthNames[this.currentMonthDate.getMonth()]},year:{get:function(){return this.year_text},set:function(t){this.year_text=t;var e=this.$dateUtil.validateDateRange(new Date(t,this.month,1),this.minDate,this.maxDate);this.$dateUtil.isValidDate(e)&&this.$emit("change-month",{month:e.getMonth(),year:e.getFullYear()})}},month:{get:function(){return this.currentMonthDate.getMonth()+1},set:function(t){var e=this.$dateUtil.validateDateRange(new Date(this.year,t-1,1),this.minDate,this.maxDate);this.$emit("change-month",{month:e.getMonth()+1,year:e.getFullYear()})}},calendar:function(){for(var t=this.month,e=this.currentMonthDate.getFullYear(),n=new Date(e,t-1,1),r=this.$dateUtil.prevMonth(n).getMonth()+1,a=this.$dateUtil.prevMonth(n).getFullYear(),i=new Date(a,t-1,0).getDate(),o=n.getDay(),s=[],c=0;c<6;c++)s[c]=[];var u=i-o+this.locale.firstDay+1;u>i&&(u-=7),o===this.locale.firstDay&&(u=i-6);for(var l=new Date(a,r-1,u,12,0,0),f=0,d=0,h=0;f<42;f++,d++,l.setDate(l.getDate()+1))f>0&&d%7===0&&(d=0,h++),s[h][d]=new Date(l.getTime());return s},months:function(){var t=this;return this.locale.monthNames.map((function(e,n){return{label:e,value:n,enabled:(!t.maxDate||t.maxDate>=new Date(t.year,n,1))&&(!t.minDate||t.minDate<=new Date(t.year,n+1,0))}}))},locale:function(){return this.$dateUtil.localeData(this.localeData)}},watch:{monthDate:function(t){this.currentMonthDate.getTime()!==t.getTime()&&this.changeMonthDate(t,!1)}}}),v=g;n("9d0d");function y(t,e,n,r,a,i,o,s){var c,u="function"===typeof t?t.options:t;if(e&&(u.render=e,u.staticRenderFns=n,u._compiled=!0),r&&(u.functional=!0),i&&(u._scopeId="data-v-"+i),o?(c=function(t){t=t||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext,t||"undefined"===typeof __VUE_SSR_CONTEXT__||(t=__VUE_SSR_CONTEXT__),a&&a.call(this,t),t&&t._registeredComponents&&t._registeredComponents.add(o)},u._ssrRegister=c):a&&(c=s?function(){a.call(this,this.$root.$options.shadowRoot)}:a),c)if(u.functional){u._injectStyles=c;var l=u.render;u.render=function(t,e){return c.call(e),l(t,e)}}else{var f=u.beforeCreate;u.beforeCreate=f?[].concat(f,c):[c]}return{exports:t,options:u}}var b=y(v,p,m,!1,null,"98ac2448",null),D=b.exports,w=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"calendar-time"},[n("select",{directives:[{name:"model",rawName:"v-model",value:t.hour,expression:"hour"}],staticClass:"hourselect form-control mr-1",attrs:{disabled:t.readonly},on:{change:function(e){var n=Array.prototype.filter.call(e.target.options,(function(t){return t.selected})).map((function(t){var e="_value"in t?t._value:t.value;return e}));t.hour=e.target.multiple?n:n[0]}}},t._l(t.hours,(function(e){return n("option",{key:e,domProps:{value:e}},[t._v(t._s(t._f("formatNumber")(e)))])})),0),t._v(" :"),n("select",{directives:[{name:"model",rawName:"v-model",value:t.minute,expression:"minute"}],staticClass:"minuteselect form-control ml-1",attrs:{disabled:t.readonly},on:{change:function(e){var n=Array.prototype.filter.call(e.target.options,(function(t){return t.selected})).map((function(t){var e="_value"in t?t._value:t.value;return e}));t.minute=e.target.multiple?n:n[0]}}},t._l(t.minutes,(function(e){return n("option",{key:e,domProps:{value:e}},[t._v(t._s(t._f("formatNumber")(e)))])})),0),t.secondPicker?[t._v(" :"),n("select",{directives:[{name:"model",rawName:"v-model",value:t.second,expression:"second"}],staticClass:"secondselect form-control ml-1",attrs:{disabled:t.readonly},on:{change:function(e){var n=Array.prototype.filter.call(e.target.options,(function(t){return t.selected})).map((function(t){var e="_value"in t?t._value:t.value;return e}));t.second=e.target.multiple?n:n[0]}}},t._l(60,(function(e){return n("option",{key:e-1,domProps:{value:e-1}},[t._v(t._s(t._f("formatNumber")(e-1)))])})),0)]:t._e(),t.hour24?t._e():n("select",{directives:[{name:"model",rawName:"v-model",value:t.ampm,expression:"ampm"}],staticClass:"ampmselect",attrs:{disabled:t.readonly},on:{change:function(e){var n=Array.prototype.filter.call(e.target.options,(function(t){return t.selected})).map((function(t){var e="_value"in t?t._value:t.value;return e}));t.ampm=e.target.multiple?n:n[0]}}},[n("option",{attrs:{value:"AM"}},[t._v("AM")]),n("option",{attrs:{value:"PM"}},[t._v("PM")])])],2)},x=[],S={filters:{formatNumber:function(t){return t<10?"0"+t.toString():t.toString()}},props:{miniuteIncrement:{type:Number,default:5},hour24:{type:Boolean,default:!0},secondPicker:{type:Boolean,default:!1},currentTime:{default:function(){return new Date}},readonly:{type:Boolean,default:!1}},data:function(){var t=this.currentTime?this.currentTime:new Date,e=t.getHours();return{hour:this.hour24?e:e%12||12,minute:t.getMinutes()-t.getMinutes()%this.miniuteIncrement,second:t.getSeconds(),ampm:e<12?"AM":"PM"}},computed:{hours:function(){for(var t=[],e=this.hour24?24:12,n=0;n<e;n++)t.push(this.hour24?n:n+1);return t},minutes:function(){for(var t=[],e=60,n=0;n<e;n+=this.miniuteIncrement)t.push(n);return t}},watch:{hour:function(){this.onChange()},minute:function(){this.onChange()},second:function(){this.onChange()},ampm:function(){this.onChange()}},methods:{getHour:function(){return this.hour24?this.hour:12===this.hour?"AM"===this.ampm?0:12:this.hour+("PM"===this.ampm?12:0)},onChange:function(){this.$emit("update",{hours:this.getHour(),minutes:this.minute,seconds:this.second})}}},M=S,k=y(M,w,x,!1,null,null,null),_=k.exports,O=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"ranges"},[t.ranges?n("ul",[t._l(t.listedRanges,(function(e){return n("li",{key:e.label,class:t.range_class(e),attrs:{"data-range-key":e.label,tabindex:"0"},on:{click:function(n){return t.clickRange(e.value)}}},[t._v(t._s(e.label)+" ")])})),t.showCustomRangeLabel?n("li",{class:{active:t.customRangeActive||!t.selectedRange},attrs:{tabindex:"0"},on:{click:t.clickCustomRange}},[t._v(" "+t._s(t.localeData.customRangeLabel)+" ")]):t._e()],2):t._e()])},T=[],C={mixins:[h],props:{ranges:Object,selected:Object,localeData:Object,alwaysShowCalendars:Boolean},data:function(){return{customRangeActive:!1}},methods:{clickRange:function(t){this.customRangeActive=!1,this.$emit("click-range",t)},clickCustomRange:function(){this.customRangeActive=!0,this.$emit("show-custom-range")},range_class:function(t){return{active:!0===t.selected}}},computed:{listedRanges:function(){var t=this;return!!this.ranges&&Object.keys(this.ranges).map((function(e){return{label:e,value:t.ranges[e],selected:t.$dateUtil.isSame(t.selected.startDate,t.ranges[e][0])&&t.$dateUtil.isSame(t.selected.endDate,t.ranges[e][1])}}))},selectedRange:function(){return this.listedRanges.find((function(t){return!0===t.selected}))},showCustomRangeLabel:function(){return!this.alwaysShowCalendars}}},P=C,j=y(P,O,T,!1,null,null,null),A=j.exports,N={inserted:function(t,e,n){var r=n.context;if(r.appendToBody){var a=r.$refs.toggle.getBoundingClientRect(),i=a.height,o=a.top,s=a.left,c=a.width,u=a.right;t.unbindPosition=r.calculatePosition(t,r,{width:c,top:window.scrollY+o+i,left:window.scrollX+s,right:u}),document.body.appendChild(t)}else r.$el.appendChild(t)},unbind:function(t,e,n){var r=n.context;r.appendToBody&&(t.unbindPosition&&"function"===typeof t.unbindPosition&&t.unbindPosition(),t.parentNode&&t.parentNode.removeChild(t))}};function R(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function $(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?R(Object(n),!0).forEach((function(e){Object(f["a"])(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):R(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}var E={inheritAttrs:!1,components:{Calendar:D,CalendarTime:_,CalendarRanges:A},mixins:[h],directives:{appendToBody:N},model:{prop:"dateRange",event:"update"},props:{minDate:{type:[String,Date],default:function(){return null}},maxDate:{type:[String,Date],default:function(){return null}},showWeekNumbers:{type:Boolean,default:!1},linkedCalendars:{type:Boolean,default:!0},singleDatePicker:{type:[Boolean,String],default:!1},showDropdowns:{type:Boolean,default:!1},timePicker:{type:Boolean,default:!1},timePickerIncrement:{type:Number,default:5},timePicker24Hour:{type:Boolean,default:!0},timePickerSeconds:{type:Boolean,default:!1},autoApply:{type:Boolean,default:!1},localeData:{type:Object,default:function(){return{}}},dateRange:{type:[Object],default:null,required:!0},ranges:{type:[Object,Boolean],default:function(){var t=new Date;t.setHours(0,0,0,0);var e=new Date;e.setHours(11,59,59,999);var n=new Date;n.setDate(t.getDate()-1),n.setHours(0,0,0,0);var r=new Date;r.setDate(t.getDate()-1),r.setHours(11,59,59,999);var a=new Date(t.getFullYear(),t.getMonth(),1),i=new Date(t.getFullYear(),t.getMonth()+1,0,11,59,59,999);return{Today:[t,e],Yesterday:[n,r],"This month":[a,i],"This year":[new Date(t.getFullYear(),0,1),new Date(t.getFullYear(),11,31,11,59,59,999)],"Last month":[new Date(t.getFullYear(),t.getMonth()-1,1),new Date(t.getFullYear(),t.getMonth(),0,11,59,59,999)]}}},opens:{type:String,default:"center"},dateFormat:Function,alwaysShowCalendars:{type:Boolean,default:!0},disabled:{type:Boolean,default:!1},controlContainerClass:{type:[Object,String],default:"form-control reportrange-text"},appendToBody:{type:Boolean,default:!1},calculatePosition:{type:Function,default:function(t,e,n){var r=n.width,a=n.top,i=n.left,o=n.right;"center"===e.opens?t.style.left=i+r/2+"px":"left"===e.opens?t.style.right=window.innerWidth-o+"px":"right"===e.opens&&(t.style.left=i+"px"),t.style.top=a+"px"}},closeOnEsc:{type:Boolean,default:!0},readonly:{type:Boolean}},data:function(){var t=d(),e={locale:t.localeData($({},this.localeData))},n=this.dateRange.startDate||null,r=this.dateRange.endDate||null;if(e.monthDate=n?new Date(n):new Date,e.nextMonthDate=t.nextMonth(e.monthDate),e.start=n?new Date(n):null,this.singleDatePicker&&"range"!==this.singleDatePicker?e.end=e.start:e.end=r?new Date(r):null,e.in_selection=!1,e.open=!1,e.showCustomRangeCalendars=!1,0!==e.locale.firstDay){var a=e.locale.firstDay,i=l(e.locale.daysOfWeek);while(a>0)i.push(i.shift()),a--;e.locale.daysOfWeek=i}return e},methods:{selectMonthDate:function(){var t=this.end||new Date;!1!==this.singleDatePicker?this.changeLeftMonth({year:t.getFullYear(),month:t.getMonth()+1}):this.changeRightMonth({year:t.getFullYear(),month:t.getMonth()+1})},dateFormatFn:function(t,e){var n=new Date(e);n.setHours(0,0,0,0);var r=new Date(this.start);r.setHours(0,0,0,0);var a=new Date(this.end);return a.setHours(0,0,0,0),t["in-range"]=n>=r&&n<=a,this.dateFormat?this.dateFormat(t,e):t},changeLeftMonth:function(t){var e=new Date(t.year,t.month-1,1);this.monthDate=e,(this.linkedCalendars||this.$dateUtil.yearMonth(this.monthDate)>=this.$dateUtil.yearMonth(this.nextMonthDate))&&(this.nextMonthDate=this.$dateUtil.validateDateRange(this.$dateUtil.nextMonth(e),this.minDate,this.maxDate),this.singleDatePicker||this.$dateUtil.yearMonth(this.monthDate)!==this.$dateUtil.yearMonth(this.nextMonthDate)||(this.monthDate=this.$dateUtil.validateDateRange(this.$dateUtil.prevMonth(this.monthDate),this.minDate,this.maxDate))),this.$emit("change-month",this.monthDate,0)},changeRightMonth:function(t){var e=new Date(t.year,t.month-1,1);this.nextMonthDate=e,(this.linkedCalendars||this.$dateUtil.yearMonth(this.nextMonthDate)<=this.$dateUtil.yearMonth(this.monthDate))&&(this.monthDate=this.$dateUtil.validateDateRange(this.$dateUtil.prevMonth(e),this.minDate,this.maxDate),this.$dateUtil.yearMonth(this.monthDate)===this.$dateUtil.yearMonth(this.nextMonthDate)&&(this.nextMonthDate=this.$dateUtil.validateDateRange(this.$dateUtil.nextMonth(this.nextMonthDate),this.minDate,this.maxDate))),this.$dateUtil.yearMonth(this.monthDate)===this.$dateUtil.yearMonth(this.nextMonthDate)&&(this.nextMonthDate=this.$dateUtil.nextMonth(this.nextMonthDate)),this.$emit("change-month",this.nextMonthDate,1)},normalizeDatetime:function(t,e){var n=new Date(t);return this.timePicker&&e&&(n.setHours(e.getHours()),n.setMinutes(e.getMinutes()),n.setSeconds(e.getSeconds()),n.setMilliseconds(e.getMilliseconds())),n},dateClick:function(t){if(this.readonly)return!1;this.in_selection?(this.in_selection=!1,this.$emit("finish-selection",t),this.onSelect(),this.autoApply&&this.clickedApply()):(this.start=this.normalizeDatetime(t,this.start),this.end=this.normalizeDatetime(t,this.end),this.singleDatePicker&&"range"!==this.singleDatePicker?(this.onSelect(),this.autoApply&&this.clickedApply()):(this.in_selection=this.end,this.$emit("start-selection",this.start)))},hoverDate:function(t){if(this.readonly)return!1;var e=this.normalizeDatetime(t,this.end),n=this.normalizeDatetime(t,this.start);this.in_selection&&(this.in_selection<=e&&(this.end=e),this.in_selection>=n&&(this.start=n)),this.$emit("hover-date",t)},onClickPicker:function(){this.disabled||this.togglePicker(null,!0)},togglePicker:function(t,e){this.open="boolean"===typeof t?t:!this.open,!0===e&&this.$emit("toggle",this.open,this.togglePicker)},clickedApply:function(){this.togglePicker(!1,!0),this.$emit("update",{startDate:this.start,endDate:this.singleDatePicker&&"range"!==this.singleDatePicker?this.start:this.end})},clickCancel:function(){if(this.open){var t=this.dateRange.startDate,e=this.dateRange.endDate;this.start=t?new Date(t):null,this.end=e?new Date(e):null,this.in_selection=!1,this.togglePicker(!1,!0)}},onSelect:function(){this.$emit("select",{startDate:this.start,endDate:this.end})},clickAway:function(t){t&&t.target&&!this.$el.contains(t.target)&&this.$refs.dropdown&&!this.$refs.dropdown.contains(t.target)&&this.clickCancel()},clickRange:function(t){this.in_selection=!1,this.$dateUtil.isValidDate(t[0])&&this.$dateUtil.isValidDate(t[1])?(this.start=this.$dateUtil.validateDateRange(new Date(t[0]),this.minDate,this.maxDate),this.end=this.$dateUtil.validateDateRange(new Date(t[1]),this.minDate,this.maxDate),this.changeLeftMonth({month:this.start.getMonth()+1,year:this.start.getFullYear()}),!1===this.linkedCalendars&&this.changeRightMonth({month:this.end.getMonth()+1,year:this.end.getFullYear()})):(this.start=null,this.end=null),this.onSelect(),this.autoApply&&this.clickedApply()},onUpdateStartTime:function(t){var e=new Date(this.start);e.setHours(t.hours),e.setMinutes(t.minutes),e.setSeconds(t.seconds),this.start=this.$dateUtil.validateDateRange(e,this.minDate,this.maxDate),this.autoApply&&this.$emit("update",{startDate:this.start,endDate:this.singleDatePicker&&"range"!==this.singleDatePicker?this.start:this.end})},onUpdateEndTime:function(t){var e=new Date(this.end);e.setHours(t.hours),e.setMinutes(t.minutes),e.setSeconds(t.seconds),this.end=this.$dateUtil.validateDateRange(e,this.minDate,this.maxDate),this.autoApply&&this.$emit("update",{startDate:this.start,endDate:this.end})},handleEscape:function(t){this.open&&27===t.keyCode&&this.closeOnEsc&&this.clickCancel()}},computed:{showRanges:function(){return!1!==this.ranges&&!this.readonly},showCalendars:function(){return this.alwaysShowCalendars||this.showCustomRangeCalendars},startText:function(){return null===this.start?"":this.$dateUtil.format(this.start,this.locale.format)},endText:function(){return null===this.end?"":this.$dateUtil.format(this.end,this.locale.format)},rangeText:function(){var t=this.startText;return this.singleDatePicker&&"range"!==this.singleDatePicker||(t+=this.locale.separator+this.endText),t},min:function(){return this.minDate?new Date(this.minDate):null},max:function(){return this.maxDate?new Date(this.maxDate):null},pickerStyles:function(){var t;return t={"show-calendar":this.open||"inline"===this.opens,"show-ranges":this.showRanges,"show-weeknumbers":this.showWeekNumbers,single:this.singleDatePicker},Object(f["a"])(t,"opens"+this.opens,!0),Object(f["a"])(t,"linked",this.linkedCalendars),Object(f["a"])(t,"hide-calendars",!this.showCalendars),t},isClear:function(){return!this.dateRange.startDate||!this.dateRange.endDate},isDirty:function(){var t=new Date(this.dateRange.startDate),e=new Date(this.dateRange.endDate);return!this.isClear&&(this.start.getTime()!==t.getTime()||this.end.getTime()!==e.getTime())}},watch:{minDate:function(){this.selectMonthDate()},maxDate:function(){this.selectMonthDate()},"dateRange.startDate":function(t){this.$dateUtil.isValidDate(new Date(t))&&(this.start=t&&!this.isClear&&this.$dateUtil.isValidDate(new Date(t))?new Date(t):null,this.isClear?(this.start=null,this.end=null):(this.start=new Date(this.dateRange.startDate),this.end=new Date(this.dateRange.endDate)))},"dateRange.endDate":function(t){this.$dateUtil.isValidDate(new Date(t))&&(this.end=t&&!this.isClear?new Date(t):null,this.isClear?(this.start=null,this.end=null):(this.start=new Date(this.dateRange.startDate),this.end=new Date(this.dateRange.endDate)))},open:{handler:function(t){var e=this;"object"===("undefined"===typeof document?"undefined":Object(o["a"])(document))&&(this.selectMonthDate(),this.$nextTick((function(){t?document.body.addEventListener("click",e.clickAway):document.body.removeEventListener("click",e.clickAway),t?document.addEventListener("keydown",e.handleEscape):document.removeEventListener("keydown",e.handleEscape),!e.alwaysShowCalendars&&e.ranges&&(e.showCustomRangeCalendars=!Object.keys(e.ranges).find((function(t){return e.$dateUtil.isSame(e.start,e.ranges[t][0],"date")&&e.$dateUtil.isSame(e.end,e.ranges[t][1],"date")})))})))},immediate:!0}}},U=E,F=(n("0e58"),n("ce5f"),y(U,a,i,!1,null,"1ebd09d2",null)),I=F.exports,L=I;e["default"]=L},fb6a:function(t,e,n){"use strict";var r=n("23e7"),a=n("861d"),i=n("e8b5"),o=n("23cb"),s=n("50c4"),c=n("fc6a"),u=n("8418"),l=n("1dde"),f=n("b622"),d=f("species"),h=[].slice,p=Math.max;r({target:"Array",proto:!0,forced:!l("slice")},{slice:function(t,e){var n,r,l,f=c(this),m=s(f.length),g=o(t,m),v=o(void 0===e?m:e,m);if(i(f)&&(n=f.constructor,"function"!=typeof n||n!==Array&&!i(n.prototype)?a(n)&&(n=n[d],null===n&&(n=void 0)):n=void 0,n===Array||void 0===n))return h.call(f,g,v);for(r=new(void 0===n?Array:n)(p(v-g,0)),l=0;g<v;g++,l++)g in f&&u(r,l,f[g]);return r.length=l,r}})},fc6a:function(t,e,n){var r=n("44ad"),a=n("1d80");t.exports=function(t){return r(a(t))}},fdbc:function(t,e){t.exports={CSSRuleList:0,CSSStyleDeclaration:0,CSSValueList:0,ClientRectList:0,DOMRectList:0,DOMStringList:0,DOMTokenList:1,DataTransferItemList:0,FileList:0,HTMLAllCollection:0,HTMLCollection:0,HTMLFormElement:0,HTMLSelectElement:0,MediaList:0,MimeTypeArray:0,NamedNodeMap:0,NodeList:1,PaintRequestList:0,Plugin:0,PluginArray:0,SVGLengthList:0,SVGNumberList:0,SVGPathSegList:0,SVGPointList:0,SVGStringList:0,SVGTransformList:0,SourceBufferList:0,StyleSheetList:0,TextTrackCueList:0,TextTrackList:0,TouchList:0}},fdbf:function(t,e,n){var r=n("4930");t.exports=r&&!Symbol.sham&&"symbol"==typeof Symbol()}})}));
//# sourceMappingURL=vue2-daterange-picker.umd.min.js.map

/***/ })

}]);