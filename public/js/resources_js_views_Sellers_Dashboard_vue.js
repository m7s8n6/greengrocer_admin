"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_views_Sellers_Dashboard_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Sellers/Dashboard.vue?vue&type=script&lang=js":
/*!******************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Sellers/Dashboard.vue?vue&type=script&lang=js ***!
  \******************************************************************************************************************************************************************************************************/
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
/* harmony import */ var vue_google_charts_legacy__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! vue-google-charts/legacy */ "./node_modules/vue-google-charts/legacy/index.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var vue_apexcharts__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! vue-apexcharts */ "./node_modules/vue-apexcharts/dist/vue-apexcharts.js");
/* harmony import */ var vue_apexcharts__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(vue_apexcharts__WEBPACK_IMPORTED_MODULE_5__);
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







/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'Chart',
  mixins: [_mixins_DateRangePickerMixin__WEBPACK_IMPORTED_MODULE_1__["default"]],
  components: {
    GChart: vue_google_charts_legacy__WEBPACK_IMPORTED_MODULE_3__.GChart,
    apexcharts: (vue_apexcharts__WEBPACK_IMPORTED_MODULE_5___default()),
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
      record: [],
      currentMonth: "",
      orderFields: [{
        key: 'id',
        label: __('oid'),
        sortable: true,
        sortDirection: 'desc',
        "class": 'text-start'
      }, {
        key: 'user_name',
        label: __('user'),
        sortable: true,
        "class": 'text-start'
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
        key: 'tax',
        label: __('tax'),
        sortable: true
      }, {
        key: 'discount',
        label: __('disc'),
        sortable: true
      }, {
        key: 'promo_discount',
        label: __('promo_disc'),
        sortable: true
      }, {
        key: 'wallet_balance',
        label: __('wallet_used'),
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
        key: 'active_status',
        label: __('status'),
        sortable: true,
        "class": 'text-center'
      }, {
        key: "actions",
        label: __('actions'),
        "class": 'text-center'
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
      status: "",
      graphOrders: [],
      isLoadingColumnChart: false,
      graphCategories: [],
      chartData: [],
      options: {
        chart: {
          height: 350,
          type: 'bar',
          toolbar: {
            show: false
          },
          fontFamily: 'Nunito, sans-serif'
        },
        plotOptions: {
          bar: {
            columnWidth: '40%',
            borderRadius: 4
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
            style: {
              colors: this.$themeColor('neutral-500'),
              fontSize: '12px'
            }
          }
        },
        yaxis: {
          labels: {
            style: {
              colors: this.$themeColor('neutral-500'),
              fontSize: '12px'
            },
            formatter: function formatter(val) {
              return (val || 0).toLocaleString();
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
        tooltip: {
          shared: true,
          intersect: false,
          custom: function custom(_ref) {
            var series = _ref.series,
              seriesIndex = _ref.seriesIndex,
              dataPointIndex = _ref.dataPointIndex,
              w = _ref.w;
            var cat = w.globals.categoryLabels[dataPointIndex] || w.config.xaxis.categories[dataPointIndex];
            var sale = series[0] ? series[0][dataPointIndex] : 0;
            return '<div style="background:var(--theme-neutral-900);color:var(--theme-neutral-50);padding:12px;border-radius:12px;font-size:13px;line-height:1.6;border:none;box-shadow:0 10px 15px -3px rgba(0,0,0,0.1)">' + '<div style="margin-bottom:4px;font-weight:700">' + cat + '</div>' + '<div style="display:flex;align-items:center;gap:8px"><span style="width:8px;height:8px;border-radius:50%;background:var(--theme-primary-500)"></span> Total Sale : <span style="font-weight:700">' + (sale || 0).toLocaleString() + '</span></div>' + '</div>';
          }
        },
        noData: {
          text: "No Data Found",
          align: 'center'
        }
      },
      series: [{
        name: 'Total Sale',
        data: []
      }],
      categoryChartColors: this.$themeChartColors(),
      options2: {
        chart: {
          type: 'donut',
          fontFamily: 'Nunito, sans-serif'
        },
        labels: [],
        colors: [],
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
          colors: [this.$themeColor('neutral-50')]
        },
        tooltip: {
          y: {
            formatter: function formatter(val) {
              return (val || 0).toLocaleString();
            }
          }
        }
      },
      series2: []
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
      return moment__WEBPACK_IMPORTED_MODULE_4___default()().format('DD MMM YYYY');
    },
    orderPageStart: function orderPageStart() {
      if (this.orderTotalRows === 0) return 0;
      return (this.orderCurrentPage - 1) * this.orderPerPage + 1;
    },
    orderPageEnd: function orderPageEnd() {
      return Math.min(this.orderCurrentPage * this.orderPerPage, this.orderTotalRows);
    },
    orderTotalPages: function orderTotalPages() {
      return Math.ceil(this.orderTotalRows / this.orderPerPage);
    },
    categoryChartDataFormatted: function categoryChartDataFormatted() {
      var _this = this;
      return this.options2.labels.map(function (label, index) {
        return {
          name: label,
          value: _this.series2[index] || 0,
          color: _this.categoryChartColors[index % _this.categoryChartColors.length] || _this.$themeColor('neutral-950')
        };
      });
    },
    orderStatusItems: function orderStatusItems() {
      var statusOrderCount = this.record && this.record.status_order_count ? this.record.status_order_count : [];
      if (!statusOrderCount.length) return [];
      var allowedStatuses = ['Payment Pending', 'Pending', 'Received', 'Processed', 'Shipped', 'Out For Delivery', 'Delivered'];
      var filtered = statusOrderCount.filter(function (s) {
        return allowedStatuses.includes(s.status);
      });
      var maxCount = Math.max.apply(Math, _toConsumableArray(filtered.map(function (s) {
        return s.order_count || 0;
      })).concat([1]));
      var statusMap = {
        'Payment Pending': {
          color: 'var(--theme-warn-500)',
          bgColor: 'var(--theme-warn-50)',
          label: this.__('payment_pending') || 'Payment Pending',
          icon: 'Payment Pending'
        },
        'Pending': {
          color: 'var(--theme-warn-500)',
          bgColor: 'var(--theme-warn-50)',
          label: this.__('pending') || 'Pending',
          icon: 'Pending'
        },
        'Received': {
          color: 'var(--theme-info-500)',
          bgColor: 'var(--theme-info-50)',
          label: this.__('received') || 'Received',
          icon: 'Received'
        },
        'Processed': {
          color: 'var(--theme-success-500)',
          bgColor: 'var(--theme-success-50)',
          label: this.__('processed') || 'Processed',
          icon: 'Processed'
        },
        'Shipped': {
          color: 'var(--theme-info-600)',
          bgColor: 'var(--theme-info-100)',
          label: this.__('shipped') || 'Shipped',
          icon: 'Shipped'
        },
        'Out For Delivery': {
          color: 'var(--theme-primary-500)',
          bgColor: 'var(--theme-primary-50)',
          label: this.__('out_for_delivery') || 'Out for Delivery',
          icon: 'Out for Delivery'
        },
        'Delivered': {
          color: 'var(--theme-success-500)',
          bgColor: 'var(--theme-success-50)',
          label: this.__('delivered') || 'Delivered',
          icon: 'Delivered'
        }
      };
      return filtered.map(function (s) {
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
    }
  },
  mounted: function mounted() {
    // Set the initial number of items
    this.orderTotalRows = this.orders.length;
  },
  created: function created() {
    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var now = new Date();
    this.currentMonth = months[now.getMonth()];

    // Dynamic chart translations
    var totalSaleText = this.__('total_sale') || 'Total Sale';
    var noDataFoundText = this.__('no_data_found') || 'No Data Found';
    this.options.noData.text = noDataFoundText;
    this.series[0].name = totalSaleText;
    var primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--theme-primary-500').trim();
    this.options.colors = [primaryColor];
    this.options.tooltip.custom = function (_ref2) {
      var series = _ref2.series,
        seriesIndex = _ref2.seriesIndex,
        dataPointIndex = _ref2.dataPointIndex,
        w = _ref2.w;
      var cat = w.globals.categoryLabels[dataPointIndex] || w.config.xaxis.categories[dataPointIndex];
      var sale = series[0] ? series[0][dataPointIndex] : 0;
      return '<div style="background:var(--theme-neutral-900);color:var(--theme-neutral-50);padding:12px;border-radius:12px;font-size:13px;line-height:1.6;border:none;box-shadow:0 10px 15px -3px rgba(0,0,0,0.1)">' + '<div style="margin-bottom:4px;font-weight:700">' + cat + '</div>' + '<div style="display:flex;align-items:center;gap:8px"><span style="width:8px;height:8px;border-radius:50%;background:' + primaryColor + '"></span> ' + totalSaleText + ' : <span style="font-weight:700">' + (sale || 0).toLocaleString() + '</span></div>' + '</div>';
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
    /**
     * Translation key for order status id (matches OrderStatusList keys in lang files).
     */
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
    /**
     * Lang-wise label for status dropdown (uses panel __() and current language).
     */
    getStatusLabel: function getStatusLabel(status) {
      if (!status) return '';
      var key = this.getStatusTranslationKey(status.id);
      return key ? this.__(key) : status.status || '';
    },
    /**
     * Normalize category name for display. Backend returns string (app) or object by lang code (panel).
     * When object, use app_locale (window.appLocale or localStorage lang) to pick the name; fallback to first non-empty.
     */
    getCategoryDisplayName: function getCategoryDisplayName(name) {
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
    getRecord: function getRecord() {
      var _this2 = this;
      var vm = this;
      this.isLoading = true;
      axios__WEBPACK_IMPORTED_MODULE_2___default().get(this.$sellerApiUrl + '/dashboard').then(function (res) {
        vm.isLoading = false;
        var data = res.data;
        if (data.status === 1) {
          _this2.record = data.data;

          // barChart / pie: name can be string or object by lang code – use helper so we never push [object Object]
          _this2.graphCategories = data.data.category_product_count;
          _this2.graphCategories.forEach(function (category) {
            if (category.product_count !== 0) {
              _this2.options2.labels.push(_this2.getCategoryDisplayName(category.name));
              _this2.series2.push(category.product_count);
            }
          });

          // Duplicate colors if needed
          var totalColorsNeeded = _this2.options2.labels.length;
          var colorsArray = [];
          for (var i = 0; i < totalColorsNeeded; i++) {
            colorsArray.push(_this2.categoryChartColors[i % _this2.categoryChartColors.length]);
          }
          _this2.options2.colors = colorsArray;
          // pieChart
          _this2.graphOrders = data.data.weekly_sales;
          _this2.graphOrders.forEach(function (order) {
            _this2.options.xaxis.categories.push(moment__WEBPACK_IMPORTED_MODULE_4___default()(order.order_date).format('DD-MMM'));
            _this2.series[0].data.push(order.total_sale);
          });
          _this2.$refs.apexBarChart.updateSeries([{
            data: _this2.series[0].data
          }], false, true);
        }
      })["catch"](function (error) {
        vm.isLoading = false;
        if (error.request && error.request.statusText) {
          _this2.showError(error.request.statusText);
        } else if (error.message) {
          _this2.showError(error.message);
        } else {
          _this2.showError("Something went wrong!");
        }
      });
    },
    getOrderStatus: function getOrderStatus() {
      var _this3 = this;
      var vm = this;
      axios__WEBPACK_IMPORTED_MODULE_2___default().get(this.$apiUrl + '/order_statuses').then(function (response) {
        _this3.isLoading = false;
        _this3.statuses = response.data.data;
      })["catch"](function (error) {
        vm.isLoading = false;
        if (error.request && error.request.statusText) {
          _this3.showError(error.request.statusText);
        } else if (error.message) {
          _this3.showError(error.message);
        } else {
          _this3.showError("Something went wrong!");
        }
      });
    },
    getLatestOrders: function getLatestOrders() {
      var _this4 = this;
      this.isLoading = true;
      var vm = this;
      var param = {
        "startDate": this.dateRange.startDate != null ? moment__WEBPACK_IMPORTED_MODULE_4___default()(this.dateRange.startDate).format('YYYY-MM-DD') : "",
        "endDate": this.dateRange.endDate != null ? moment__WEBPACK_IMPORTED_MODULE_4___default()(this.dateRange.endDate).format('YYYY-MM-DD') : "",
        "status": this.status,
        startDeliveryDate: this.deliveryDateRange.startDate ? moment__WEBPACK_IMPORTED_MODULE_4___default()(this.deliveryDateRange.startDate).format('YYYY-MM-DD') : '',
        endDeliveryDate: this.deliveryDateRange.endDate ? moment__WEBPACK_IMPORTED_MODULE_4___default()(this.deliveryDateRange.endDate).format('YYYY-MM-DD') : ''
      };
      axios__WEBPACK_IMPORTED_MODULE_2___default().get(this.$sellerApiUrl + '/orders', {
        params: param
      }).then(function (response) {
        var data = response.data;
        if (data.status === 1) {
          _this4.orders = response.data.data.orders;
          _this4.orderTotalRows = _this4.orders.length;
          _this4.isLoading = false;
        }
      })["catch"](function (error) {
        vm.isLoading = false;
        if (error.request && error.request.statusText) {
          _this4.showError(error.request.statusText);
        } else if (error.message) {
          _this4.showError(error.message);
        } else {
          _this4.showError("Something went wrong!");
        }
      });
    },
    getStatusIconBgClass: function getStatusIconBgClass(status) {
      if (!status) return 'bg-light-figma';
      var s = status.status;
      if (s == this.$pending || s == 'Pending') return 'bg-stat-orange-light';
      if (s == this.$received) return 'bg-stat-blue-light';
      if (s == this.$processed || s == 'Ready for Pickup') return 'bg-stat-green-light';
      if (s == this.$shipped) return 'bg-stat-purple-light';
      if (s == this.$outForDelivery) return 'bg-stat-blue-light';
      if (s == this.$delivered || s == 'Picked Up') return 'bg-stat-green-light';
      if (s == this.$cancelled || s == this.$returned) return 'bg-stat-red-light';
      return 'bg-light-figma';
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
        9: 'status-pending',
        // Pending (Self Pickup)
        10: 'status-processed',
        // Ready for Pickup (Self Pickup)
        11: 'status-delivered' // Picked Up (Self Pickup)
      };
      return classMap[id] || 'status-default';
    },
    formatDateBold: function formatDateBold(date) {
      return moment__WEBPACK_IMPORTED_MODULE_4___default()(date).format('DD MMM YYYY');
    },
    getPeriodLabel: function getPeriodLabel(date) {
      if (!date) return '';
      var hour = moment__WEBPACK_IMPORTED_MODULE_4___default()(date).hour();
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
      return moment__WEBPACK_IMPORTED_MODULE_4___default()(date).format('hh:mm A');
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

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Sellers/Dashboard.vue?vue&type=style&index=0&id=209c7b6a&scoped=true&lang=css":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Sellers/Dashboard.vue?vue&type=style&index=0&id=209c7b6a&scoped=true&lang=css ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
___CSS_LOADER_EXPORT___.push([module.id, "\n.vue-daterange-picker[data-v-1ebd09d2][data-v-209c7b6a] {\n    min-width: 80%;\n}\n@media only screen and (min-width: 600px) {\n.vue-daterange-picker[data-v-1ebd09d2][data-v-209c7b6a] {\n        min-width: 90%;\n}\n}\n.btn_product_count[data-v-209c7b6a] {\n    margin-bottom: 10px;\n}\n.chart-container[data-v-209c7b6a] {\n    min-height: 300px;\n    height: 60vh;\n}\n@media (max-width: 768px) {\n.chart-container[data-v-209c7b6a] {\n        height: 40vh;\n}\n}\n\n/* KPI tiles use the shared .figma-kpi-card-v2 / .dash-stat-card look; only the padding and the\n   router-link text colour are set here. */\n.dash-stat-card[data-v-209c7b6a] {\n    padding: 16px;\n    color: inherit;\n}\n\n/* Phones: two tiles per row are ~120px wide, so icon + text side by side cut the captions\n   (\"Total Or...\") and pushed amounts to the edge. Stack the icon above the text, let the caption\n   and the amount wrap, and keep the tiles top-aligned so a longer label doesn't change the look. */\n@media (max-width: 575.98px) {\n.dash-stat-card[data-v-209c7b6a] {\n        align-items: flex-start;\n        padding: 12px;\n}\n.dash-stat-card > div[data-v-209c7b6a] {\n        flex-direction: column;\n        align-items: flex-start !important;\n        gap: 8px !important;\n        width: 100%;\n}\n.dash-stat-card .dash-stat-sub[data-v-209c7b6a] {\n        white-space: normal !important;\n        overflow: visible !important;\n        text-overflow: clip !important;\n}\n.dash-stat-card .figma-stat-value[data-v-209c7b6a] {\n        white-space: normal !important;\n        overflow-wrap: anywhere;\n}\n}\n.min-w-0[data-v-209c7b6a] {\n    min-width: 0;\n}\n.dash-leader[data-v-209c7b6a] {\n    border-bottom: 1.5px dashed var(--ui-border-strong);\n}\n\n/* Latest orders: the table keeps its columns and scrolls inside the card on narrow screens */\n.dash-orders-scroll[data-v-209c7b6a] {\n    overflow-x: auto;\n    -webkit-overflow-scrolling: touch;\n}\n.dash-orders-scroll .figma-order-table[data-v-209c7b6a] {\n    min-width: 880px;\n}\n.dash-orders-scroll .figma-order-table td[data-v-209c7b6a],\n.dash-orders-scroll .figma-order-table th[data-v-209c7b6a] {\n    white-space: nowrap;\n}\n\n/* Category legend: long category lists scroll inside the card instead of stretching it */\n.category-legend[data-v-209c7b6a] {\n    max-height: 300px;\n    overflow-y: auto;\n}\n\n/* \"View Orders\" (secondary action): global hover fills it with primary, keep the label readable */\n.view-order-btn[data-v-209c7b6a]:hover,\n.view-order-btn:hover span[data-v-209c7b6a],\n.view-order-btn:hover i[data-v-209c7b6a] {\n    color: var(--theme-neutral-50) !important; /* beats .btn-light text colour on the filled hover */\n}\n", ""]);
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

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Sellers/Dashboard.vue?vue&type=style&index=0&id=209c7b6a&scoped=true&lang=css":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Sellers/Dashboard.vue?vue&type=style&index=0&id=209c7b6a&scoped=true&lang=css ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Dashboard_vue_vue_type_style_index_0_id_209c7b6a_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Dashboard.vue?vue&type=style&index=0&id=209c7b6a&scoped=true&lang=css */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Sellers/Dashboard.vue?vue&type=style&index=0&id=209c7b6a&scoped=true&lang=css");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Dashboard_vue_vue_type_style_index_0_id_209c7b6a_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Dashboard_vue_vue_type_style_index_0_id_209c7b6a_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./node_modules/vue-google-charts/legacy/index.js":
/*!********************************************************!*\
  !*** ./node_modules/vue-google-charts/legacy/index.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GChart: () => (/* binding */ GChart),
/* harmony export */   "default": () => (/* binding */ plugin),
/* harmony export */   install: () => (/* binding */ install),
/* harmony export */   loadGoogleCharts: () => (/* binding */ loadGoogleCharts)
/* harmony export */ });
const chartsScriptUrl = 'https://www.gstatic.com/charts/loader.js';
let chartsLoaderPromise = null;
const loadedPackages = new Map();
function getChartsLoader() {
    // If already included in the page:
    if (window.google !== undefined) {
        return Promise.resolve(window.google.charts);
    }
    if (chartsLoaderPromise === null) {
        chartsLoaderPromise = new Promise((resolve)=>{
            // Find script tag with same src in DOM.
            const foundScript = document.querySelector("script[src=\"".concat(chartsScriptUrl, "\"]"));
            // Create or get existed tag.
            const script = foundScript || document.createElement('script');
            // Set src if no script was found.
            if (!foundScript) {
                script.src = chartsScriptUrl;
                script.type = 'text/javascript';
                document.head.append(script);
            }
            script.onload = ()=>{
                if (window.google !== undefined) {
                    resolve(window.google.charts);
                }
            };
        });
    }
    return chartsLoaderPromise;
}
/**
 * Function to load Google Charts JS API.
 * @param version - Chart version to load.
 * @param packages - Packages to load.
 * @param language - Languages to load.
 * @param mapsApiKey - Google Maps api key.
 * @returns
 */ async function loadGoogleCharts() {
    let version = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 'current', { packages =[
        'corechart',
        'controls'
    ] , language ='en' , mapsApiKey  } = arguments.length > 1 ? arguments[1] : void 0;
    const loader = await getChartsLoader();
    const settingsKey = "".concat(version, "_").concat(packages.join('_'), "_").concat(language);
    if (loadedPackages.has(settingsKey)) return loadedPackages.get(settingsKey);
    const loaderPromise = new Promise((resolve)=>{
        loader.load(version, {
            packages,
            language,
            mapsApiKey
        });
        loader.setOnLoadCallback(()=>resolve(window.google)
        );
    });
    loadedPackages.set(settingsKey, loaderPromise);
    return loaderPromise;
}

function debounce(func) {
    let waitMilliseconds = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 50;
    let timeoutId;
    function nextInvokeTimeout() {
        return waitMilliseconds;
    }
    const debouncedFunction = function() {
        for(var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++){
            args[_key] = arguments[_key];
        }
        const context = this;
        const invokeFunction = function() {
            timeoutId = undefined;
            func.apply(context, args);
        };
        if (timeoutId !== undefined) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(invokeFunction, nextInvokeTimeout());
    };
    return debouncedFunction;
}

function getValidChartData(chartsLib, data, isFirstRowLabels) {
    if (chartsLib !== null && data instanceof chartsLib.visualization.DataTable) {
        return data;
    }
    if (chartsLib !== null && data instanceof chartsLib.visualization.DataView) {
        return data;
    }
    if (chartsLib !== null && Array.isArray(data)) {
        return chartsLib.visualization.arrayToDataTable(data, isFirstRowLabels);
    }
    if (chartsLib !== null && data !== null && typeof data === 'object') {
        return new chartsLib.visualization.DataTable(data);
    }
    return null;
}
function createChartObject(chartsLib, chartObject, chartEl, chartType, chartEvents, createChartFunction) {
    const createChart = (el, google, type)=>{
        if (type === undefined) {
            throw new Error('please, provide chart type property');
        }
        return new google.visualization[type](el);
    };
    if (chartsLib === null) {
        throw new Error('please, provide charts lib property');
    }
    if (chartEl === null) {
        throw new Error('please, provide chart element property');
    }
    const fn = createChartFunction || createChart;
    chartObject = fn(chartEl, chartsLib, chartType);
    attachListeners(chartsLib, chartObject, chartEvents);
    return chartObject;
}
function attachListeners(chartsLib, chartObject, chartEvents) {
    if (chartEvents === null) {
        return;
    }
    for (const [event, listener] of Object.entries(chartEvents)){
        if (chartsLib !== null && chartObject !== null) {
            chartsLib.visualization.events.addListener(chartObject, event, listener);
        }
    }
}

let chartsLib = null;
var GChart = {
    render: function() {
        var _vm = this;
        var _h = _vm.$createElement;
        var _c = _vm._self._c || _h;
        return _c('div', {
            ref: "chart"
        });
    },
    staticRenderFns: [],
    name: 'GChart',
    props: {
        type: {
            type: String,
            required: true
        },
        data: {
            type: [
                Array,
                Object
            ],
            default: ()=>[]
        },
        isFirstRowLabels: {
            type: Boolean,
            default: false
        },
        options: {
            type: Object,
            default: ()=>({})
        },
        version: {
            type: String,
            default: 'current'
        },
        settings: {
            type: Object,
            default: ()=>({
                    packages: [
                        'corechart',
                        'table'
                    ]
                })
        },
        events: {
            type: Object,
            default: null
        },
        createChart: {
            type: Function,
            default: null
        },
        resizeDebounce: {
            type: Number,
            default: 200
        }
    },
    data () {
        return {
            chartObject: null
        };
    },
    watch: {
        data: {
            deep: true,
            handler () {
                this.drawChart();
            }
        },
        options: {
            deep: true,
            handler () {
                this.drawChart();
            }
        },
        type () {
            this.chartObject = createChartObject(chartsLib, this.chartObject, this.$refs.chart, this.type, this.events, this.createChart);
            this.drawChart();
        }
    },
    mounted () {
        loadGoogleCharts(this.version, this.settings).then((api)=>{
            chartsLib = api;
            this.chartObject = createChartObject(chartsLib, this.chartObject, this.$refs.chart, this.type, this.events, this.createChart);
            this.$emit('ready', this.chartObject, api);
            this.drawChart();
        });
        if (this.resizeDebounce > 0) window.addEventListener('resize', debounce(this.drawChart, this.resizeDebounce));
    },
    beforeDestroy () {
        if (this.chartObject !== null && typeof this.chartObject.clearChart === 'function') {
            this.chartObject.clearChart();
        }
    },
    methods: {
        drawChart () {
            if (!chartsLib || !this.chartObject) return;
            const data = getValidChartData(chartsLib, this.data, this.isFirstRowLabels);
            if (data) this.chartObject.draw(data, this.options);
        }
    }
};

// Install the components
function install(vue) {
    vue.component('GChart', GChart);
}
/* -- Plugin definition & Auto-install -- */ /* You shouldn't have to modify the code below */ // Plugin
const plugin = {
    version: "1.1.0",
    install
};
// Auto-install
let GlobalVue = null;
if (typeof window !== 'undefined') {
    GlobalVue = window.Vue;
} else if (typeof __webpack_require__.g !== 'undefined') {
    GlobalVue = __webpack_require__.g.Vue;
}
if (GlobalVue) {
    GlobalVue.use(plugin);
}


//# sourceMappingURL=index.js.map


/***/ }),

/***/ "./resources/js/views/Sellers/Dashboard.vue":
/*!**************************************************!*\
  !*** ./resources/js/views/Sellers/Dashboard.vue ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Dashboard_vue_vue_type_template_id_209c7b6a_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Dashboard.vue?vue&type=template&id=209c7b6a&scoped=true */ "./resources/js/views/Sellers/Dashboard.vue?vue&type=template&id=209c7b6a&scoped=true");
/* harmony import */ var _Dashboard_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Dashboard.vue?vue&type=script&lang=js */ "./resources/js/views/Sellers/Dashboard.vue?vue&type=script&lang=js");
/* harmony import */ var _Dashboard_vue_vue_type_style_index_0_id_209c7b6a_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Dashboard.vue?vue&type=style&index=0&id=209c7b6a&scoped=true&lang=css */ "./resources/js/views/Sellers/Dashboard.vue?vue&type=style&index=0&id=209c7b6a&scoped=true&lang=css");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _Dashboard_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _Dashboard_vue_vue_type_template_id_209c7b6a_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render,
  _Dashboard_vue_vue_type_template_id_209c7b6a_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "209c7b6a",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/Sellers/Dashboard.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/views/Sellers/Dashboard.vue?vue&type=script&lang=js":
/*!**************************************************************************!*\
  !*** ./resources/js/views/Sellers/Dashboard.vue?vue&type=script&lang=js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Dashboard_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Dashboard.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Sellers/Dashboard.vue?vue&type=script&lang=js");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Dashboard_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/Sellers/Dashboard.vue?vue&type=style&index=0&id=209c7b6a&scoped=true&lang=css":
/*!**********************************************************************************************************!*\
  !*** ./resources/js/views/Sellers/Dashboard.vue?vue&type=style&index=0&id=209c7b6a&scoped=true&lang=css ***!
  \**********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Dashboard_vue_vue_type_style_index_0_id_209c7b6a_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/style-loader/dist/cjs.js!../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Dashboard.vue?vue&type=style&index=0&id=209c7b6a&scoped=true&lang=css */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Sellers/Dashboard.vue?vue&type=style&index=0&id=209c7b6a&scoped=true&lang=css");


/***/ }),

/***/ "./resources/js/views/Sellers/Dashboard.vue?vue&type=template&id=209c7b6a&scoped=true":
/*!********************************************************************************************!*\
  !*** ./resources/js/views/Sellers/Dashboard.vue?vue&type=template&id=209c7b6a&scoped=true ***!
  \********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Dashboard_vue_vue_type_template_id_209c7b6a_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   staticRenderFns: () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Dashboard_vue_vue_type_template_id_209c7b6a_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Dashboard_vue_vue_type_template_id_209c7b6a_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Dashboard.vue?vue&type=template&id=209c7b6a&scoped=true */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Sellers/Dashboard.vue?vue&type=template&id=209c7b6a&scoped=true");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Sellers/Dashboard.vue?vue&type=template&id=209c7b6a&scoped=true":
/*!***********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Sellers/Dashboard.vue?vue&type=template&id=209c7b6a&scoped=true ***!
  \***********************************************************************************************************************************************************************************************************************************/
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
      _c("section", { staticClass: "row" }, [
        _c("div", { staticClass: "col-12 px-0" }, [
          _c("div", { staticClass: "row g-3 mb-4" }, [
            _c(
              "div",
              { staticClass: "col-12 col-sm-6 col-lg-4" },
              [
                _c(
                  "router-link",
                  {
                    staticClass:
                      "dash-stat-card figma-kpi-card-v2 w-100 h-100 text-decoration-none",
                    attrs: { to: "/seller/orders" },
                  },
                  [
                    _c(
                      "div",
                      { staticClass: "d-flex align-items-center gap-3" },
                      [
                        _c(
                          "div",
                          { staticClass: "figma-stat-icon-box bg-stat-blue" },
                          [_c("i", { staticClass: "fa fa-shopping-cart" })]
                        ),
                        _vm._v(" "),
                        _c(
                          "div",
                          {
                            staticClass:
                              "d-flex flex-column text-start min-w-0",
                          },
                          [
                            _c(
                              "span",
                              { staticClass: "figma-stat-label d-block" },
                              [_vm._v(_vm._s(_vm.__("orders")))]
                            ),
                            _vm._v(" "),
                            _c(
                              "h4",
                              {
                                staticClass:
                                  "figma-stat-value mb-0 text-nowrap",
                              },
                              [_vm._v(_vm._s(_vm.record.order_count))]
                            ),
                            _vm._v(" "),
                            _c(
                              "span",
                              {
                                staticClass:
                                  "dash-stat-sub d-block text-truncate",
                              },
                              [_vm._v(_vm._s(_vm.__("total_orders")))]
                            ),
                          ]
                        ),
                      ]
                    ),
                  ]
                ),
              ],
              1
            ),
            _vm._v(" "),
            _c(
              "div",
              { staticClass: "col-12 col-sm-6 col-lg-4" },
              [
                _c(
                  "router-link",
                  {
                    staticClass:
                      "dash-stat-card figma-kpi-card-v2 w-100 h-100 text-decoration-none",
                    attrs: { to: "/seller/manage_products" },
                  },
                  [
                    _c(
                      "div",
                      { staticClass: "d-flex align-items-center gap-3" },
                      [
                        _c(
                          "div",
                          { staticClass: "figma-stat-icon-box bg-stat-orange" },
                          [_c("i", { staticClass: "fa fa-cubes" })]
                        ),
                        _vm._v(" "),
                        _c(
                          "div",
                          {
                            staticClass:
                              "d-flex flex-column text-start min-w-0",
                          },
                          [
                            _c(
                              "span",
                              { staticClass: "figma-stat-label d-block" },
                              [_vm._v(_vm._s(_vm.__("products")))]
                            ),
                            _vm._v(" "),
                            _c(
                              "h4",
                              {
                                staticClass:
                                  "figma-stat-value mb-0 text-nowrap",
                              },
                              [_vm._v(_vm._s(_vm.record.product_count))]
                            ),
                            _vm._v(" "),
                            _c(
                              "span",
                              {
                                staticClass:
                                  "dash-stat-sub d-block text-truncate",
                              },
                              [_vm._v(_vm._s(_vm.__("total_products")))]
                            ),
                          ]
                        ),
                      ]
                    ),
                  ]
                ),
              ],
              1
            ),
            _vm._v(" "),
            _c(
              "div",
              { staticClass: "col-12 col-sm-6 col-lg-4" },
              [
                _c(
                  "router-link",
                  {
                    staticClass:
                      "dash-stat-card figma-kpi-card-v2 w-100 h-100 text-decoration-none",
                    attrs: { to: "/seller/categories" },
                  },
                  [
                    _c(
                      "div",
                      { staticClass: "d-flex align-items-center gap-3" },
                      [
                        _c(
                          "div",
                          { staticClass: "figma-stat-icon-box bg-stat-purple" },
                          [_c("i", { staticClass: "fa fa-bullseye" })]
                        ),
                        _vm._v(" "),
                        _c(
                          "div",
                          {
                            staticClass:
                              "d-flex flex-column text-start min-w-0",
                          },
                          [
                            _c(
                              "span",
                              { staticClass: "figma-stat-label d-block" },
                              [_vm._v(_vm._s(_vm.__("category")))]
                            ),
                            _vm._v(" "),
                            _c(
                              "h4",
                              {
                                staticClass:
                                  "figma-stat-value mb-0 text-nowrap",
                              },
                              [_vm._v(_vm._s(_vm.record.category_count))]
                            ),
                            _vm._v(" "),
                            _c(
                              "span",
                              {
                                staticClass:
                                  "dash-stat-sub d-block text-truncate",
                              },
                              [_vm._v(_vm._s(_vm.__("total_categories")))]
                            ),
                          ]
                        ),
                      ]
                    ),
                  ]
                ),
              ],
              1
            ),
            _vm._v(" "),
            _c(
              "div",
              { staticClass: "col-12 col-sm-6 col-lg-4" },
              [
                _c(
                  "router-link",
                  {
                    staticClass:
                      "dash-stat-card figma-kpi-card-v2 w-100 h-100 text-decoration-none",
                    attrs: { to: "/seller/dashboard" },
                  },
                  [
                    _c(
                      "div",
                      { staticClass: "d-flex align-items-center gap-3" },
                      [
                        _c(
                          "div",
                          { staticClass: "figma-stat-icon-box bg-stat-green" },
                          [_c("i", { staticClass: "fa fa-money" })]
                        ),
                        _vm._v(" "),
                        _c(
                          "div",
                          {
                            staticClass:
                              "d-flex flex-column text-start min-w-0",
                          },
                          [
                            _c(
                              "span",
                              { staticClass: "figma-stat-label d-block" },
                              [_vm._v(_vm._s(_vm.__("balance")))]
                            ),
                            _vm._v(" "),
                            _c(
                              "h4",
                              {
                                staticClass:
                                  "figma-stat-value mb-0 text-nowrap",
                              },
                              [
                                _vm._v(
                                  _vm._s(_vm.$currency) +
                                    " " +
                                    _vm._s(_vm.record.balance)
                                ),
                              ]
                            ),
                            _vm._v(" "),
                            _c(
                              "span",
                              {
                                staticClass:
                                  "dash-stat-sub d-block text-truncate",
                              },
                              [_vm._v(_vm._s(_vm.__("total_balance")))]
                            ),
                          ]
                        ),
                      ]
                    ),
                  ]
                ),
              ],
              1
            ),
            _vm._v(" "),
            _c(
              "div",
              { staticClass: "col-12 col-sm-6 col-lg-4" },
              [
                _c(
                  "router-link",
                  {
                    staticClass:
                      "dash-stat-card figma-kpi-card-v2 w-100 h-100 text-decoration-none",
                    attrs: {
                      to: {
                        name: "SellerProductInfo",
                        params: { type: "sold_out" },
                      },
                    },
                  },
                  [
                    _c(
                      "div",
                      { staticClass: "d-flex align-items-center gap-3" },
                      [
                        _c(
                          "div",
                          { staticClass: "figma-stat-icon-box bg-stat-red" },
                          [_c("i", { staticClass: "fa fa-ban" })]
                        ),
                        _vm._v(" "),
                        _c(
                          "div",
                          {
                            staticClass:
                              "d-flex flex-column text-start min-w-0",
                          },
                          [
                            _c(
                              "span",
                              { staticClass: "figma-stat-label d-block" },
                              [_vm._v(_vm._s(_vm.__("products_sold_out")))]
                            ),
                            _vm._v(" "),
                            _c(
                              "h4",
                              {
                                staticClass:
                                  "figma-stat-value mb-0 text-nowrap",
                              },
                              [_vm._v(_vm._s(_vm.record.sold_out_count))]
                            ),
                            _vm._v(" "),
                            _c(
                              "span",
                              {
                                staticClass:
                                  "dash-stat-sub d-block text-truncate",
                              },
                              [_vm._v(_vm._s(_vm.__("total_sold_out")))]
                            ),
                          ]
                        ),
                      ]
                    ),
                  ]
                ),
              ],
              1
            ),
            _vm._v(" "),
            _c(
              "div",
              { staticClass: "col-12 col-sm-6 col-lg-4" },
              [
                _c(
                  "router-link",
                  {
                    staticClass:
                      "dash-stat-card figma-kpi-card-v2 w-100 h-100 text-decoration-none",
                    attrs: {
                      to: {
                        name: "SellerProductInfo",
                        params: { type: "low_stock" },
                      },
                    },
                  },
                  [
                    _c(
                      "div",
                      { staticClass: "d-flex align-items-center gap-3" },
                      [
                        _c(
                          "div",
                          { staticClass: "figma-stat-icon-box bg-stat-orange" },
                          [_c("i", { staticClass: "fa fa-warning" })]
                        ),
                        _vm._v(" "),
                        _c(
                          "div",
                          {
                            staticClass:
                              "d-flex flex-column text-start min-w-0",
                          },
                          [
                            _c(
                              "span",
                              { staticClass: "figma-stat-label d-block" },
                              [_vm._v(_vm._s(_vm.__("products_in_low_stock")))]
                            ),
                            _vm._v(" "),
                            _c(
                              "h4",
                              {
                                staticClass:
                                  "figma-stat-value mb-0 text-nowrap",
                              },
                              [_vm._v(_vm._s(_vm.record.low_stock_count))]
                            ),
                            _vm._v(" "),
                            _c(
                              "span",
                              {
                                staticClass:
                                  "dash-stat-sub d-block text-truncate",
                              },
                              [_vm._v(_vm._s(_vm.__("total_low_stock")))]
                            ),
                          ]
                        ),
                      ]
                    ),
                  ]
                ),
              ],
              1
            ),
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "row g-4 mb-4" }, [
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
                        "card-header bg-white border-0 py-3 px-4 d-flex align-items-center justify-content-between flex-wrap gap-3",
                    },
                    [
                      _c("div", { staticClass: "d-flex flex-column" }, [
                        _c(
                          "h4",
                          { staticClass: "h6 font-weight-bold text-dark mb-1" },
                          [_vm._v(_vm._s(_vm.__("weekly_sales")))]
                        ),
                        _vm._v(" "),
                        _c("span", { staticClass: "text-muted small" }, [
                          _vm._v(
                            _vm._s(_vm.__("total_sale_in_last_week")) +
                              " (" +
                              _vm._s(_vm.__("month")) +
                              ": " +
                              _vm._s(_vm.currentMonth) +
                              ")"
                          ),
                        ]),
                      ]),
                      _vm._v(" "),
                      _c(
                        "div",
                        { staticClass: "d-flex align-items-center gap-3" },
                        [
                          _c(
                            "div",
                            {
                              staticClass:
                                "d-none d-sm-flex align-items-center gap-3 text-muted small",
                            },
                            [
                              _c(
                                "div",
                                {
                                  staticClass:
                                    "d-flex align-items-center gap-2",
                                },
                                [
                                  _c("span", {
                                    staticClass: "dot-sm bg-primary",
                                  }),
                                  _vm._v(" "),
                                  _c(
                                    "span",
                                    { staticClass: "text-capitalize" },
                                    [
                                      _vm._v(
                                        _vm._s(
                                          _vm.__("total_sale") || "Total Sale"
                                        )
                                      ),
                                    ]
                                  ),
                                ]
                              ),
                            ]
                          ),
                        ]
                      ),
                    ]
                  ),
                  _vm._v(" "),
                  _c(
                    "div",
                    { staticClass: "card-body p-3 p-sm-4 pt-1" },
                    [
                      _c("apexchart", {
                        ref: "apexBarChart",
                        attrs: {
                          options: _vm.options,
                          series: _vm.series,
                          width: "100%",
                          height: "350",
                        },
                      }),
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
                { staticClass: "card border rounded-4 h-100 figma-card" },
                [
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
                        [_vm._v(_vm._s(_vm.__("order_out_lines")))]
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
                                  staticClass:
                                    "d-flex align-items-center gap-3",
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
                                        borderRadius: "10px",
                                        flexShrink: 0,
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
                                          {
                                            staticClass:
                                              "figma-order-status-label",
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
                                          "rounded-pill overflow-hidden",
                                        style: {
                                          height: "6px",
                                          backgroundColor: item.bgColor,
                                        },
                                      },
                                      [
                                        _c("div", {
                                          staticClass: "h-100 rounded-pill",
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
                            {
                              staticClass:
                                "d-flex flex-column align-items-center justify-content-center text-center py-5 text-muted small",
                            },
                            [
                              _c("i", {
                                staticClass:
                                  "fa fa-inbox fa-2x mb-2 opacity-50",
                              }),
                              _vm._v(" "),
                              _c("span", [
                                _vm._v(_vm._s(_vm.__("No data found"))),
                              ]),
                            ]
                          ),
                    ]
                  ),
                ]
              ),
            ]),
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "row g-4 mb-4" }, [
            _c("div", { staticClass: "col-12 product_category_count" }, [
              _c(
                "div",
                { staticClass: "card border rounded-4 h-100 figma-card" },
                [
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
                            "\n                                    " +
                              _vm._s(_vm.__("product_category_count")) +
                              "\n                                    "
                          ),
                          _vm.options2.labels.length
                            ? _c(
                                "span",
                                {
                                  staticClass:
                                    "text-muted small font-weight-normal ms-1",
                                },
                                [
                                  _vm._v(
                                    "(" +
                                      _vm._s(_vm.options2.labels.length) +
                                      " " +
                                      _vm._s(_vm.__("categories")) +
                                      ")"
                                  ),
                                ]
                              )
                            : _vm._e(),
                        ]
                      ),
                    ]
                  ),
                  _vm._v(" "),
                  _c("div", { staticClass: "card-body p-3 p-sm-4" }, [
                    _vm.series2.length > 0
                      ? _c("div", { staticClass: "row align-items-center" }, [
                          _c(
                            "div",
                            { staticClass: "col-12 col-md-5 col-xl-4" },
                            [
                              _c("apexcharts", {
                                attrs: {
                                  width: "100%",
                                  height: "300",
                                  type: "donut",
                                  options: _vm.options2,
                                  series: _vm.series2,
                                },
                              }),
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _c(
                            "div",
                            { staticClass: "col-12 col-md-7 col-xl-8" },
                            [
                              _c(
                                "div",
                                {
                                  staticClass:
                                    "d-flex flex-column gap-3 pe-md-4 mt-4 mt-md-0 category-legend",
                                },
                                _vm._l(
                                  _vm.categoryChartDataFormatted,
                                  function (item, idx) {
                                    return _c(
                                      "div",
                                      {
                                        key: "cat-" + idx,
                                        staticClass:
                                          "d-flex align-items-center",
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
                                          },
                                          [_vm._v(_vm._s(item.name))]
                                        ),
                                        _vm._v(" "),
                                        _c("div", {
                                          staticClass:
                                            "flex-grow-1 mx-3 dash-leader",
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
                            ]
                          ),
                        ])
                      : _c(
                          "div",
                          {
                            staticClass:
                              "d-flex flex-column align-items-center justify-content-center text-center py-5 text-muted small",
                          },
                          [
                            _c("i", {
                              staticClass: "fa fa-inbox fa-2x mb-2 opacity-50",
                            }),
                            _vm._v(" "),
                            _c("span", [
                              _vm._v(_vm._s(_vm.__("no_product_found"))),
                            ]),
                          ]
                        ),
                  ]),
                ]
              ),
            ]),
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "card figma-card text-dark mt-4" }, [
            _c("div", { staticClass: "card-header" }, [
              _c("h4", { staticClass: "text-dark" }, [
                _vm._v(_vm._s(_vm.__("latest_orders") || "Latest Orders")),
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
                      attrs: { to: "/seller/orders" },
                    },
                    [
                      _c("span", { staticClass: "small font-weight-bold" }, [
                        _vm._v(_vm._s(_vm.__("view_orders") || "View Orders")),
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
            ]),
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
                        key: "cell(id)",
                        fn: function (row) {
                          return [
                            _c("div", { staticClass: "figma-link-blue" }, [
                              _vm._v(
                                "\n                                        #" +
                                  _vm._s(row.item.id) +
                                  "\n                                    "
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
                                    _vm._s(row.item.email || row.item.mobile)
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
                                  "\n                                        " +
                                    _vm._s(
                                      _vm.getStatusLabelById(
                                        row.item.active_status
                                      )
                                    ) +
                                    "\n                                    "
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
                                        name: "SellerViewOrder",
                                        params: {
                                          id: row.item.id,
                                          record: row.item,
                                        },
                                      },
                                    },
                                  },
                                  [
                                    _c("i", {
                                      staticClass: "fa fa-eye text-primary",
                                    }),
                                  ]
                                ),
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
              _vm.orderTotalRows > 0
                ? _c(
                    "div",
                    {
                      staticClass:
                        "d-flex justify-content-between align-items-center flex-wrap gap-2 px-3 px-sm-4 pb-3 border-top pt-3 bg-light-soft rounded-bottom-4 dash-pager",
                    },
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
                          _c(
                            "div",
                            { staticClass: "showing-results-text small" },
                            [
                              _vm._v(
                                "\n                                    " +
                                  _vm._s(_vm.__("Showing Result")) +
                                  " : "
                              ),
                              _c("span", { staticClass: "showing-bold" }, [
                                _vm._v(_vm._s(_vm.orderPageEnd)),
                              ]),
                              _vm._v(" " + _vm._s(_vm.__("of")) + " "),
                              _c("span", { staticClass: "showing-bold" }, [
                                _vm._v(_vm._s(_vm.orderTotalRows)),
                              ]),
                            ]
                          ),
                        ]
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
        ]),
      ]),
    ]),
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ })

}]);