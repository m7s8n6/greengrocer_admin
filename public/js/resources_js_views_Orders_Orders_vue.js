"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_views_Orders_Orders_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Orders/Orders.vue?vue&type=script&lang=js":
/*!**************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Orders/Orders.vue?vue&type=script&lang=js ***!
  \**************************************************************************************************************************************************************************************************/
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
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
      seller: "",
      status: "",
      search: "",
      orderFields: [{
        key: 'id',
        label: __('order_id') || 'Order ID',
        sortable: false,
        "class": 'text-start col-id'
      }, {
        key: 'user_name',
        label: __('customer'),
        sortable: false,
        "class": 'text-start col-customer'
      }, {
        key: 'seller_name',
        label: __('seller'),
        sortable: false,
        "class": 'text-start col-seller'
      }, {
        key: 'total_items',
        label: __('total_items'),
        sortable: false,
        "class": 'text-center col-items'
      }, {
        key: 'total',
        label: __('payment'),
        sortable: false,
        "class": 'text-start col-payment'
      }, {
        key: 'created_at',
        label: __('order_date_time'),
        sortable: false,
        "class": 'text-start col-date'
      }, {
        key: 'active_status',
        label: __('status'),
        sortable: false,
        "class": 'text-center col-status'
      }, {
        key: "actions",
        label: __('action'),
        "class": 'col-actions'
      }],
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
      avatarColors: ['var(--theme-info-100)', 'var(--theme-primary-100)', 'var(--theme-success-100)', 'var(--theme-warn-100)', 'var(--theme-info-50)', 'var(--theme-error-100)'],
      showFilters: false,
      statusOrderCount: [],
      isModalLoading: false,
      selectedOrder: null
    };
  },
  computed: {
    visibleFields: function visibleFields() {
      return this.orderFields.filter(function (f) {
        return !f.hidden;
      });
    },
    pageStart: function pageStart() {
      if (this.totalOrderRows === 0) return 0;
      return (this.currentPage - 1) * this.perPage + 1;
    },
    pageEnd: function pageEnd() {
      return Math.min(this.currentPage * this.perPage, this.totalOrderRows);
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
    },
    beforeTotalColspan: function beforeTotalColspan() {
      var index = this.visibleFields.findIndex(function (f) {
        return f.key === 'total';
      });
      return index > -1 ? index : 4;
    },
    afterTotalColspan: function afterTotalColspan() {
      var index = this.visibleFields.findIndex(function (f) {
        return f.key === 'total';
      });
      return index > -1 ? this.visibleFields.length - index - 1 : 3;
    }
  },
  mounted: function mounted() {},
  created: function created() {
    this.loadFilter();
    this.getOrderStatus();
    this.getDashboardStats();
    this.getOrders();
  },
  watch: {
    currentPage: function currentPage() {
      this.getOrders();
    },
    perPage: function perPage() {
      if (this.currentPage !== 1) {
        this.currentPage = 1;
      } else {
        this.getOrders();
      }
    }
  },
  methods: {
    toggleOrder: function toggleOrder(itemOrRow) {
      var _this = this;
      var item = itemOrRow.item || itemOrRow;
      var isRow = !!itemOrRow.toggleDetails;

      // Determine if the clicked row is currently showing details
      var isShowing = isRow ? itemOrRow.detailsShowing : !!item._showDetails;

      // Close all other rows if we are opening a new one
      if (!isShowing) {
        this.orders.forEach(function (order) {
          _this.$set(order, '_showDetails', false);
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
      axios__WEBPACK_IMPORTED_MODULE_3___default().get(this.$apiUrl + '/orders/view/' + item.id).then(function (res) {
        // API returns: data.order_items
        item.order_items = res.data.data.order_items || [];
        item.itemsLoading = false;
      })["catch"](function () {
        item.itemsLoading = false;
        _this.showError('Failed to load order items');
      });
    },
    openOrderModal: function openOrderModal(order) {
      var _this2 = this;
      this.selectedOrder = order;
      this.$bvModal.show('order-details-modal');
      if (this.selectedOrder.order_items && this.selectedOrder.order_items.length === 0) {
        this.isModalLoading = true;
        axios__WEBPACK_IMPORTED_MODULE_3___default().get(this.$apiUrl + '/orders/view/' + order.id).then(function (res) {
          _this2.selectedOrder.order_items = res.data.data.order_items || [];
          _this2.isModalLoading = false;
        })["catch"](function () {
          _this2.isModalLoading = false;
        });
      }
    },
    /**
     * Display value for name that can be string or object by lang code. Uses app locale; fallback to first non-empty.
     */
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
    /**
     * Status label for dropdown. API returns status_name as object by lang code { en: "...", hi: "..." }.
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
    getOrderStatus: function getOrderStatus(tabTitle) {
      var _this3 = this;
      var vm = this;
      axios__WEBPACK_IMPORTED_MODULE_3___default().get(this.$apiUrl + '/order_statuses').then(function (response) {
        _this3.isLoading = false;
        _this3.statuses = response.data.data;
      })["catch"](function (error) {
        var _error$request;
        vm.isLoading = false;
        if (error !== null && error !== void 0 && (_error$request = error.request) !== null && _error$request !== void 0 && _error$request.statusText) {
          _this3.showError(error.request.statusText);
        } else if (error.message) {
          _this3.showError(error.message);
        } else {
          _this3.showError(__('something_went_wrong'));
        }
      });
    },
    onTabChange: function onTabChange(tabTitle) {
      this.selectedTab = tabTitle;
    },
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
    getOrders: function getOrders() {
      var _this4 = this;
      var vm = this;
      this.isLoading = true;
      var param = {
        "startDate": this.dateRange.startDate != null && moment__WEBPACK_IMPORTED_MODULE_2___default()(this.dateRange.startDate).isValid() ? moment__WEBPACK_IMPORTED_MODULE_2___default()(this.dateRange.startDate).format('YYYY-MM-DD') : "",
        "endDate": this.dateRange.endDate != null && moment__WEBPACK_IMPORTED_MODULE_2___default()(this.dateRange.endDate).isValid() ? moment__WEBPACK_IMPORTED_MODULE_2___default()(this.dateRange.endDate).format('YYYY-MM-DD') : "",
        startDeliveryDate: this.deliveryDateRange.endDate != null && moment__WEBPACK_IMPORTED_MODULE_2___default()(this.deliveryDateRange.endDate).isValid() ? moment__WEBPACK_IMPORTED_MODULE_2___default()(this.deliveryDateRange.startDate).format('YYYY-MM-DD') : '',
        endDeliveryDate: this.deliveryDateRange.endDate != null && moment__WEBPACK_IMPORTED_MODULE_2___default()(this.deliveryDateRange.endDate).isValid() ? moment__WEBPACK_IMPORTED_MODULE_2___default()(this.deliveryDateRange.endDate).format('YYYY-MM-DD') : '',
        "seller": this.seller,
        "status": this.status,
        page: this.currentPage,
        per_page: this.perPage,
        item_page: this.itemCurrentPage,
        item_per_page: this.itemPerPage,
        search: this.search
      };
      axios__WEBPACK_IMPORTED_MODULE_3___default().get(this.$apiUrl + '/orders', {
        params: param
      }).then(function (response) {
        _this4.sellers = response.data.data.sellers;
        _this4.orders = response.data.data.orders.map(function (o) {
          o.order_items = []; // products will come later
          o.itemsLoading = false; // loader flag
          return o;
        });
        _this4.totalOrderRows = response.data.data.orders_total;
        _this4.total_amount = _this4.orders.map(function (item) {
          return Number(item.total);
        }).reduce(function (prev, curr) {
          return prev + curr;
        }, 0).toFixed(2);
        _this4.delivery_charge = _this4.orders.map(function (item) {
          return Number(item.delivery_charge);
        }).reduce(function (prev, curr) {
          return prev + curr;
        }, 0).toFixed(2);
        _this4.additional_charges_total = _this4.orders.map(function (item) {
          return _this4.getAdditionalChargesTotal(item.additional_charges || []);
        }).reduce(function (prev, curr) {
          return prev + curr;
        }, 0).toFixed(2);
        _this4.remaining_final = _this4.orders.map(function (item) {
          return Number(item.remaining_final);
        }).reduce(function (prev, curr) {
          return prev + curr;
        }, 0).toFixed(2);
        _this4.isLoading = false;
      })["catch"](function (error) {
        var _error$request2;
        vm.isLoading = false;
        if (error !== null && error !== void 0 && (_error$request2 = error.request) !== null && _error$request2 !== void 0 && _error$request2.statusText) {
          _this4.showError(error.request.statusText);
        } else if (error.message) {
          _this4.showError(error.message);
        } else {
          _this4.showError(__('something_went_wrong'));
        }
      });
    },
    deleteOrder: function deleteOrder(index, id) {
      var _this5 = this;
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
          _this5.isLoading = true;
          var postData = {
            id: id
          };
          axios__WEBPACK_IMPORTED_MODULE_3___default().post(_this5.$apiUrl + '/orders/delete', postData).then(function (response) {
            _this5.isLoading = false;
            var data = response.data;
            _this5.orders.splice(index, 1);
            _this5.showSuccess(data.message);
          });
        }
      });
    },
    deleteOrderItem: function deleteOrderItem(index, id) {
      var _this6 = this;
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
          _this6.isLoading = true;
          var postData = {
            id: id
          };
          axios__WEBPACK_IMPORTED_MODULE_3___default().post(_this6.$apiUrl + '/orders/delete_item', postData).then(function (response) {
            _this6.isLoading = false;
            var data = response.data;
            _this6.order_items.splice(index, 1);
            _this6.showSuccess(data.message);
          });
        }
      });
    },
    getAdditionalChargesTotal: function getAdditionalChargesTotal(charges) {
      if (!charges || !Array.isArray(charges)) return 0;
      return charges.reduce(function (total, charge) {
        return total + (parseFloat(charge.amount) || 0);
      }, 0);
    },
    getAdditionalChargesTooltip: function getAdditionalChargesTooltip(charges) {
      var _this7 = this;
      if (!charges || !Array.isArray(charges) || charges.length === 0) return this.__('no_additional_charges') !== 'no_additional_charges' ? this.__('no_additional_charges') : 'No additional charges';
      return charges.map(function (charge) {
        return "".concat(_this7.__(charge.title), ": ").concat(_this7.$currency).concat(_this7.formatAmount(charge.amount));
      }).join('\n');
    },
    formatAmount: function formatAmount(amount) {
      if (typeof amount !== 'number') amount = parseFloat(amount);
      return Number.isInteger(amount) ? amount : amount.toFixed(2);
    },
    formatDateBold: function formatDateBold(date) {
      if (!date) return 'N/A';
      return moment__WEBPACK_IMPORTED_MODULE_2___default()(date).format('DD, MMM YYYY');
    },
    getPeriodLabel: function getPeriodLabel(date) {
      if (!date) return '';
      var hour = moment__WEBPACK_IMPORTED_MODULE_2___default()(date).hour();
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
    formatTimeLight: function formatTimeLight(date) {
      if (!date) return '';
      return moment__WEBPACK_IMPORTED_MODULE_2___default()(date).format('hh:mm A');
    },
    getStatusBadgeClass: function getStatusBadgeClass(statusId) {
      var id = Number(statusId);
      if (id === 1) return 'status-pending';
      if (id === 2) return 'status-received';
      if (id === 3) return 'status-processed';
      if (id === 4) return 'status-shipped';
      if (id === 5) return 'status-outfordelivery';
      if (id === 6) return 'status-delivered';
      if (id === 7 || id === 8) return 'status-cancelled';
      return 'status-default';
    },
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
    getDashboardStats: function getDashboardStats() {
      var _this8 = this;
      axios__WEBPACK_IMPORTED_MODULE_3___default().get(this.$apiUrl + '/dashboard').then(function (res) {
        if (res.data.status === 1) {
          _this8.statusOrderCount = res.data.data.status_order_count || [];
        }
      })["catch"](function (err) {
        console.error("Error fetching dashboard stats:", err);
      });
    },
    getStatusCount: function getStatusCount(statusIds) {
      if (!this.statusOrderCount || !this.statusOrderCount.length) return 0;
      var nameToId = {
        'Payment Pending': 1,
        'Received': 2,
        'Processed': 3,
        'Shipped': 4,
        'Out For Delivery': 5,
        'Delivered': 6,
        'Cancelled': 7,
        'Returned': 8,
        'Pending': 9,
        'Ready for Pickup': 10,
        'Picked Up': 11
      };
      var total = 0;
      this.statusOrderCount.forEach(function (s) {
        var id = nameToId[s.status];
        if (id && statusIds.includes(id)) {
          total += s.order_count || 0;
        }
      });
      return total;
    },
    toggleColumnVisibility: function toggleColumnVisibility(field) {
      this.$set(field, 'hidden', !field.hidden);
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

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Orders/Orders.vue?vue&type=style&index=0&id=a392c140&scoped=true&lang=css":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Orders/Orders.vue?vue&type=style&index=0&id=a392c140&scoped=true&lang=css ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
___CSS_LOADER_EXPORT___.push([module.id, "\n/* Orders page styles migrated to global custom-egrocer.scss */\n.figma-total-label-cell[data-v-a392c140],\n.figma-total-amount-cell[data-v-a392c140],\n.figma-total-empty-cell[data-v-a392c140] {\n    background: var(--ui-surface-muted) !important;\n    border-top: 1px solid var(--ui-border) !important;\n    border-bottom: 1px solid var(--ui-border) !important;\n    height: 48px !important;\n    color: var(--ui-heading) !important;\n}\n.figma-total-label-cell[data-v-a392c140] {\n    padding: 12px 20px !important;\n    font-size: 12px !important;\n    font-weight: 700 !important;\n    text-transform: uppercase !important;\n    letter-spacing: 0.04em;\n    color: var(--ui-text-muted) !important;\n}\n.figma-total-amount-cell[data-v-a392c140] {\n    padding: 12px 16px !important;\n    font-size: 14px !important;\n    font-weight: 700 !important;\n}\n.figma-table-footer[data-v-a392c140] {\n    display: flex;\n    flex-wrap: wrap;\n    justify-content: space-between;\n    align-items: center;\n    gap: 12px;\n    padding: 14px 20px !important;\n    border-top: 1px solid var(--ui-border) !important;\n    background-color: var(--ui-surface) !important;\n}\n@media (max-width: 767.98px) {\n.figma-table-footer[data-v-a392c140] {\n        justify-content: center;\n        padding: 12px 16px !important;\n}\n\n    /* Stacked (mobile) rows: total row reads as a label/value pair */\n.figma-total-empty-cell[data-v-a392c140] {\n        display: none !important;\n}\n.figma-total-label-cell[data-v-a392c140],\n    .figma-total-amount-cell[data-v-a392c140] {\n        height: auto !important;\n}\n}\n.table-responsive[data-v-a392c140] {\n    margin-bottom: 0 !important;\n    border-bottom: none !important;\n}\n", ""]);
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

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Orders/Orders.vue?vue&type=style&index=0&id=a392c140&scoped=true&lang=css":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Orders/Orders.vue?vue&type=style&index=0&id=a392c140&scoped=true&lang=css ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Orders_vue_vue_type_style_index_0_id_a392c140_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Orders.vue?vue&type=style&index=0&id=a392c140&scoped=true&lang=css */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Orders/Orders.vue?vue&type=style&index=0&id=a392c140&scoped=true&lang=css");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Orders_vue_vue_type_style_index_0_id_a392c140_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Orders_vue_vue_type_style_index_0_id_a392c140_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./resources/js/views/Orders/Orders.vue":
/*!**********************************************!*\
  !*** ./resources/js/views/Orders/Orders.vue ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Orders_vue_vue_type_template_id_a392c140_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Orders.vue?vue&type=template&id=a392c140&scoped=true */ "./resources/js/views/Orders/Orders.vue?vue&type=template&id=a392c140&scoped=true");
/* harmony import */ var _Orders_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Orders.vue?vue&type=script&lang=js */ "./resources/js/views/Orders/Orders.vue?vue&type=script&lang=js");
/* harmony import */ var _Orders_vue_vue_type_style_index_0_id_a392c140_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Orders.vue?vue&type=style&index=0&id=a392c140&scoped=true&lang=css */ "./resources/js/views/Orders/Orders.vue?vue&type=style&index=0&id=a392c140&scoped=true&lang=css");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _Orders_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _Orders_vue_vue_type_template_id_a392c140_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render,
  _Orders_vue_vue_type_template_id_a392c140_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "a392c140",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/Orders/Orders.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/views/Orders/Orders.vue?vue&type=script&lang=js":
/*!**********************************************************************!*\
  !*** ./resources/js/views/Orders/Orders.vue?vue&type=script&lang=js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Orders_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Orders.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Orders/Orders.vue?vue&type=script&lang=js");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Orders_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/Orders/Orders.vue?vue&type=style&index=0&id=a392c140&scoped=true&lang=css":
/*!******************************************************************************************************!*\
  !*** ./resources/js/views/Orders/Orders.vue?vue&type=style&index=0&id=a392c140&scoped=true&lang=css ***!
  \******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Orders_vue_vue_type_style_index_0_id_a392c140_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/style-loader/dist/cjs.js!../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Orders.vue?vue&type=style&index=0&id=a392c140&scoped=true&lang=css */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Orders/Orders.vue?vue&type=style&index=0&id=a392c140&scoped=true&lang=css");


/***/ }),

/***/ "./resources/js/views/Orders/Orders.vue?vue&type=template&id=a392c140&scoped=true":
/*!****************************************************************************************!*\
  !*** ./resources/js/views/Orders/Orders.vue?vue&type=template&id=a392c140&scoped=true ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Orders_vue_vue_type_template_id_a392c140_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   staticRenderFns: () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Orders_vue_vue_type_template_id_a392c140_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Orders_vue_vue_type_template_id_a392c140_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Orders.vue?vue&type=template&id=a392c140&scoped=true */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Orders/Orders.vue?vue&type=template&id=a392c140&scoped=true");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Orders/Orders.vue?vue&type=template&id=a392c140&scoped=true":
/*!*******************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Orders/Orders.vue?vue&type=template&id=a392c140&scoped=true ***!
  \*******************************************************************************************************************************************************************************************************************************/
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
    { staticClass: "orders-page-container" },
    [
      _c(
        "div",
        {
          staticClass:
            "page-heading d-flex flex-wrap justify-content-between align-items-center gap-2 mb-4",
        },
        [
          _c("h3", { staticClass: "modern-page-title mb-0" }, [
            _vm._v(_vm._s(_vm.__("orders") || "Orders")),
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
                    { staticClass: "text-muted", attrs: { to: "/dashboard" } },
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
      _vm._v(" "),
      _c("div", { staticClass: "row g-4 mb-4" }, [
        _c("div", { staticClass: "col-xl-3 col-6" }, [
          _c("div", { staticClass: "figma-kpi-card-v2 card-kpi-new" }, [
            _c(
              "div",
              { staticClass: "figma-kpi-icon-v2" },
              [
                _c("base-icon", {
                  attrs: {
                    name: "Total order",
                    width: "24",
                    height: "24",
                    useCurrentColor: "",
                  },
                }),
              ],
              1
            ),
            _vm._v(" "),
            _c("div", { staticClass: "figma-kpi-content-v2" }, [
              _c("span", { staticClass: "figma-kpi-label-v2" }, [
                _vm._v(_vm._s(_vm.__("new_orders") || "New Orders")),
              ]),
              _vm._v(" "),
              _c("h3", { staticClass: "figma-kpi-value-v2" }, [
                _vm._v(_vm._s(_vm.getStatusCount([2, 9]))),
              ]),
            ]),
          ]),
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "col-xl-3 col-6" }, [
          _c("div", { staticClass: "figma-kpi-card-v2 card-kpi-processing" }, [
            _c(
              "div",
              { staticClass: "figma-kpi-icon-v2" },
              [
                _c("base-icon", {
                  attrs: {
                    name: "Processed",
                    width: "24",
                    height: "24",
                    useCurrentColor: "",
                  },
                }),
              ],
              1
            ),
            _vm._v(" "),
            _c("div", { staticClass: "figma-kpi-content-v2" }, [
              _c("span", { staticClass: "figma-kpi-label-v2" }, [
                _vm._v(
                  _vm._s(_vm.__("processing_orders") || "Processing Orders")
                ),
              ]),
              _vm._v(" "),
              _c("h3", { staticClass: "figma-kpi-value-v2" }, [
                _vm._v(_vm._s(_vm.getStatusCount([3]))),
              ]),
            ]),
          ]),
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "col-xl-3 col-6" }, [
          _c("div", { staticClass: "figma-kpi-card-v2 card-kpi-ready" }, [
            _c(
              "div",
              { staticClass: "figma-kpi-icon-v2" },
              [
                _c("base-icon", {
                  attrs: {
                    name: "Ready to ship",
                    width: "24",
                    height: "24",
                    useCurrentColor: "",
                  },
                }),
              ],
              1
            ),
            _vm._v(" "),
            _c("div", { staticClass: "figma-kpi-content-v2" }, [
              _c("span", { staticClass: "figma-kpi-label-v2" }, [
                _vm._v(_vm._s(_vm.__("ready_to_ship") || "Ready to Ship")),
              ]),
              _vm._v(" "),
              _c("h3", { staticClass: "figma-kpi-value-v2" }, [
                _vm._v(_vm._s(_vm.getStatusCount([4, 10]))),
              ]),
            ]),
          ]),
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "col-xl-3 col-6" }, [
          _c("div", { staticClass: "figma-kpi-card-v2 card-kpi-out" }, [
            _c(
              "div",
              { staticClass: "figma-kpi-icon-v2" },
              [
                _c("base-icon", {
                  attrs: {
                    name: "Vector (1)",
                    width: "24",
                    height: "24",
                    useCurrentColor: "",
                  },
                }),
              ],
              1
            ),
            _vm._v(" "),
            _c("div", { staticClass: "figma-kpi-content-v2" }, [
              _c("span", { staticClass: "figma-kpi-label-v2" }, [
                _vm._v(
                  _vm._s(_vm.__("out_for_delivery") || "Out for Delivery")
                ),
              ]),
              _vm._v(" "),
              _c("h3", { staticClass: "figma-kpi-value-v2" }, [
                _vm._v(_vm._s(_vm.getStatusCount([5]))),
              ]),
            ]),
          ]),
        ]),
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
                          placeholder:
                            _vm.__("search_by_property_name_or_id") ||
                            "Search by property name or ID",
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
                            _vm._v(
                              _vm._s(_vm.__("date_range") || "Date Range") + " "
                            ),
                            _c("span", { staticClass: "text-danger" }, [
                              _vm._v("*"),
                            ]),
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
                              _vm._v(" "),
                              _vm.dateRange.startDate
                                ? _c(
                                    "button",
                                    {
                                      directives: [
                                        {
                                          name: "b-tooltip",
                                          rawName: "v-b-tooltip.hover",
                                          modifiers: { hover: true },
                                        },
                                      ],
                                      staticClass:
                                        "figma-filter-clear figma-filter-icon-right btn btn-sm p-0 border-0",
                                      attrs: {
                                        type: "button",
                                        title: _vm.__("clear") || "Clear",
                                      },
                                      on: {
                                        click: function ($event) {
                                          $event.stopPropagation()
                                          return _vm.clearDate()
                                        },
                                      },
                                    },
                                    [
                                      _c("i", {
                                        staticClass:
                                          "fa fa-times-circle text-muted",
                                      }),
                                    ]
                                  )
                                : _vm._e(),
                              _vm._v(" "),
                              _c("base-icon", {
                                staticClass: "figma-filter-icon-right",
                                attrs: {
                                  name: "CalendarDots",
                                  width: "24",
                                  height: "24",
                                  useCurrentColor: "",
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
                            _vm._v(_vm._s(_vm.__("seller")) + " "),
                            _c("span", { staticClass: "text-danger" }, [
                              _vm._v("*"),
                            ]),
                          ]),
                          _vm._v(" "),
                          _c(
                            "select",
                            {
                              directives: [
                                {
                                  name: "model",
                                  rawName: "v-model",
                                  value: _vm.seller,
                                  expression: "seller",
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
                                    _vm.seller = $event.target.multiple
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
                                _vm._v(_vm._s(_vm.__("all_sellers"))),
                              ]),
                              _vm._v(" "),
                              _vm._l(_vm.sellers, function (seller) {
                                return _c(
                                  "option",
                                  { domProps: { value: seller.id } },
                                  [
                                    _vm._v(
                                      _vm._s(_vm.getDisplayName(seller.name))
                                    ),
                                  ]
                                )
                              }),
                            ],
                            2
                          ),
                        ]),
                      ]),
                      _vm._v(" "),
                      _c("div", { staticClass: "col-md-4" }, [
                        _c("div", { staticClass: "figma-filter-group" }, [
                          _c("label", { staticClass: "figma-filter-label" }, [
                            _vm._v(_vm._s(_vm.__("status")) + " "),
                            _c("span", { staticClass: "text-danger" }, [
                              _vm._v("*"),
                            ]),
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
                              _vm._l(_vm.statuses, function (status) {
                                return _c(
                                  "option",
                                  { domProps: { value: status.id } },
                                  [
                                    _vm._v(
                                      _vm._s(_vm.getStatusDisplayName(status)) +
                                        "\n                                        "
                                    ),
                                  ]
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
                        key: "cell(id)",
                        fn: function (row) {
                          return [
                            _c("div", { staticClass: "figma-link-blue" }, [
                              _vm._v(
                                "\n                                " +
                                  _vm._s(row.item.id) +
                                  "\n                            "
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
                        key: "cell(seller_name)",
                        fn: function (row) {
                          return [
                            _c("div", { staticClass: "d-flex flex-column" }, [
                              _c("span", { staticClass: "figma-seller-name" }, [
                                _vm._v(_vm._s(row.item.seller_name)),
                              ]),
                              _vm._v(" "),
                              _c("span", { staticClass: "figma-seller-id" }, [
                                _vm._v(
                                  "ID - " + _vm._s(row.item.seller_id || "101")
                                ),
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
                                      "\n                                    " +
                                        _vm._s(row.item.total_items || 0) +
                                        " " +
                                        _vm._s(_vm.__("items")) +
                                        "\n                                    "
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
                              row.item.payment_method
                                ? _c(
                                    "span",
                                    { staticClass: "figma-text-muted small" },
                                    [
                                      _vm._v(
                                        _vm._s(
                                          _vm.__(
                                            "txn_type_" +
                                              row.item.payment_method.toLowerCase()
                                          ) !==
                                            "txn_type_" +
                                              row.item.payment_method.toLowerCase()
                                            ? _vm.__(
                                                "txn_type_" +
                                                  row.item.payment_method.toLowerCase()
                                              )
                                            : _vm.formattedName(
                                                row.item.payment_method
                                              )
                                        )
                                      ),
                                    ]
                                  )
                                : _vm._e(),
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
                                  _vm._s(
                                    _vm.formatDateBold(row.item.created_at)
                                  )
                                ),
                              ]),
                              _vm._v(" "),
                              _c("span", { staticClass: "figma-time-light" }, [
                                _vm._v(
                                  _vm._s(
                                    _vm.getPeriodLabel(row.item.created_at)
                                  ) +
                                    ", " +
                                    _vm._s(
                                      _vm.formatTimeLight(row.item.created_at)
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
                              { staticClass: "d-flex gap-2" },
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
                                  [_c("i", { staticClass: "bi bi-eye" })]
                                ),
                                _vm._v(" "),
                                _vm.$can("order_delete")
                                  ? _c(
                                      "button",
                                      {
                                        staticClass:
                                          "figma-action-btn figma-delete-btn",
                                        on: {
                                          click: function ($event) {
                                            $event.stopPropagation()
                                            return _vm.deleteOrder(
                                              row.index,
                                              row.item.id
                                            )
                                          },
                                        },
                                      },
                                      [_c("i", { staticClass: "bi bi-trash" })]
                                    )
                                  : _vm._e(),
                              ],
                              1
                            ),
                          ]
                        },
                      },
                      {
                        key: "bottom-row",
                        fn: function () {
                          return [
                            _vm.orders.length > 0 && !_vm.isLoading
                              ? [
                                  _c(
                                    "b-td",
                                    {
                                      staticClass:
                                        "figma-total-label-cell align-middle",
                                      attrs: {
                                        colspan: _vm.beforeTotalColspan,
                                      },
                                    },
                                    [_vm._v("TOTAL")]
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "b-td",
                                    {
                                      staticClass:
                                        "figma-total-amount-cell align-middle",
                                    },
                                    [
                                      _vm._v(
                                        _vm._s(_vm.$currency) +
                                          _vm._s(_vm.total_amount)
                                      ),
                                    ]
                                  ),
                                  _vm._v(" "),
                                  _c("b-td", {
                                    staticClass:
                                      "figma-total-empty-cell align-middle",
                                    attrs: { colspan: _vm.afterTotalColspan },
                                  }),
                                ]
                              : _vm._e(),
                          ]
                        },
                        proxy: true,
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
                                  "order-details-expanded shadow-sm rounded-bottom",
                              },
                              [
                                _c(
                                  "div",
                                  {
                                    staticClass:
                                      "details-header d-flex justify-content-between align-items-center",
                                  },
                                  [
                                    _c(
                                      "span",
                                      { staticClass: "details-title" },
                                      [
                                        _vm._v(
                                          _vm._s(
                                            _vm.__("order_items") ||
                                              "Order Items"
                                          )
                                        ),
                                      ]
                                    ),
                                    _vm._v(" "),
                                    _c(
                                      "span",
                                      { staticClass: "text-muted small" },
                                      [
                                        _vm._v(
                                          "Total " +
                                            _vm._s(
                                              row.item.order_items.length
                                            ) +
                                            "\n                                        items"
                                        ),
                                      ]
                                    ),
                                  ]
                                ),
                                _vm._v(" "),
                                row.item.order_items &&
                                row.item.order_items.length
                                  ? _c(
                                      "div",
                                      { staticClass: "items-list" },
                                      _vm._l(
                                        row.item.order_items,
                                        function (item, index) {
                                          return _c(
                                            "div",
                                            {
                                              key: index,
                                              staticClass:
                                                "order-item-row shadow-sm border-0",
                                            },
                                            [
                                              _c("img", {
                                                staticClass: "item-img",
                                                attrs: { src: item.image },
                                              }),
                                              _vm._v(" "),
                                              _c(
                                                "div",
                                                { staticClass: "item-info" },
                                                [
                                                  _c(
                                                    "span",
                                                    {
                                                      staticClass:
                                                        "item-name fw-bold",
                                                    },
                                                    [
                                                      _vm._v(
                                                        _vm._s(
                                                          item.product_name
                                                        )
                                                      ),
                                                    ]
                                                  ),
                                                  _vm._v(" "),
                                                  _c(
                                                    "span",
                                                    {
                                                      staticClass:
                                                        "item-variant text-muted small",
                                                    },
                                                    [
                                                      _vm._v(
                                                        _vm._s(
                                                          item.variant_name ||
                                                            "-"
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
                                                    "item-qty text-muted fs-6",
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
                                                    "item-price fw-bold",
                                                },
                                                [
                                                  _vm._v(
                                                    _vm._s(_vm.$currency) +
                                                      _vm._s(item.sub_total)
                                                  ),
                                                ]
                                              ),
                                              _vm._v(" "),
                                              _c(
                                                "div",
                                                { staticClass: "item-status" },
                                                [
                                                  _c(
                                                    "span",
                                                    {
                                                      staticClass:
                                                        "badge bg-light text-dark fw-normal",
                                                    },
                                                    [
                                                      _vm._v(
                                                        _vm._s(item.status_name)
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
                                  : row.item.itemsLoading
                                  ? _c(
                                      "div",
                                      { staticClass: "text-center p-4" },
                                      [
                                        _c("b-spinner", {
                                          attrs: {
                                            small: "",
                                            variant: "primary",
                                          },
                                        }),
                                      ],
                                      1
                                    )
                                  : _c(
                                      "div",
                                      {
                                        staticClass:
                                          "text-center text-muted p-4",
                                      },
                                      [
                                        _vm._v(
                                          "\n                                    " +
                                            _vm._s(
                                              _vm.__("no_products_found")
                                            ) +
                                            "\n                                "
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
              _c(
                "div",
                { staticClass: "figma-table-footer" },
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
                        model: {
                          value: _vm.perPage,
                          callback: function ($$v) {
                            _vm.perPage = $$v
                          },
                          expression: "perPage",
                        },
                      }),
                      _vm._v(" "),
                      _c("table-count", {
                        attrs: {
                          "current-page": _vm.currentPage,
                          "per-page": _vm.perPage,
                          "total-rows": _vm.totalOrderRows,
                        },
                      }),
                    ],
                    1
                  ),
                  _vm._v(" "),
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
            ],
            1
          ),
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
                  ) +
                    " " +
                    _vm._s(_vm.__("items"))
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