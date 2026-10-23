"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_views_Sellers_PosReport_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Sellers/PosReport.vue?vue&type=script&lang=js":
/*!******************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Sellers/PosReport.vue?vue&type=script&lang=js ***!
  \******************************************************************************************************************************************************************************************************/
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




/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: "pos_reports",
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
      maxDate: new Date(),
      invoiceUrl: '',
      showFilters: false,
      fields: [{
        key: 'id',
        label: __('order_id'),
        sortable: true,
        "class": 'text-center'
      }, {
        key: 'customer_name',
        label: __('customer'),
        sortable: true,
        "class": 'text-center'
      }, {
        key: 'customer_mobile',
        label: __('mobile'),
        sortable: true,
        "class": 'text-center'
      }, {
        key: 'created_at',
        label: __('date'),
        sortable: true,
        "class": 'text-center',
        formatter: this.formatDate
      }, {
        key: 'total_amount',
        label: __('total_amount'),
        sortable: true,
        "class": 'text-center'
      }, {
        key: 'payment_method',
        label: __('payment_method'),
        sortable: true,
        "class": 'text-center'
      }, {
        key: 'actions',
        label: __('invoice'),
        "class": 'text-center',
        tdClass: 'invoice-action-cell'
      }],
      tableKey: 0,
      // Key to force table re-render
      totalRows: 0,
      currentPage: 1,
      perPage: this.$perPage,
      pageOptions: this.$pageOptions,
      filter: null,
      isLoading: false,
      posOrders: [],
      filteredItems: [],
      selectedPaymentMethod: null,
      paymentMethodOptions: [{
        value: null,
        text: __('all_payment_methods')
      }, {
        value: 'cash',
        text: __('cash')
      }, {
        value: 'upi',
        text: __('upi')
      }, {
        value: 'card',
        text: __('card')
      }],
      footerTotal: '0.00',
      totalAmount: '0.00',
      // ===== THERMAL PRINT DATA =====
      thermalOrder: null,
      sellerSettings: {
        name: '',
        invoice_logo: null,
        thermal_paper_width: null
      }
    };
  },
  mounted: function mounted() {
    this.getPosOrders();
  },
  methods: {
    clearDate: function clearDate() {
      this.dateRange.startDate = null;
      this.dateRange.endDate = null;
      this.getPosOrders();
    },
    openThermalModal: function openThermalModal(orderId) {
      var _this = this;
      axios.get(this.$sellerApiUrl + '/seller/reports/thermal-print', {
        params: {
          order_id: orderId
        }
      }).then(function (res) {
        if (res.data.status) {
          //  single order object
          _this.thermalOrder = res.data.order;
          _this.sellerSettings = res.data.seller;
          _this.$bvModal.show('thermal-modal');
        }
      })["catch"](function (err) {
        console.error(err);
      });
    },
    formatDateTime: function formatDateTime(date) {
      return moment__WEBPACK_IMPORTED_MODULE_2___default()(date).format('DD-MM-YY hh:mm A');
    },
    getPosOrders: function getPosOrders() {
      var _this2 = this;
      this.isLoading = true;
      var params = {
        "startDate": this.dateRange.startDate != null ? moment__WEBPACK_IMPORTED_MODULE_2___default()(this.dateRange.startDate).format('YYYY-MM-DD') : "",
        "endDate": this.dateRange.endDate != null ? moment__WEBPACK_IMPORTED_MODULE_2___default()(this.dateRange.endDate).format('YYYY-MM-DD') : "",
        "payment_method": this.selectedPaymentMethod
      };
      axios.get(this.$sellerApiUrl + '/pos_reports', {
        params: params
      }).then(function (response) {
        _this2.isLoading = false;
        if (response.data.status) {
          _this2.posOrders = response.data.data;
          _this2.filteredItems = _toConsumableArray(_this2.posOrders);

          // Debug: Log the structure of the data
          console.log("POS Orders Data:", _this2.posOrders.length > 0 ? _this2.posOrders[0] : 'No orders');
          console.log("Fields:", _this2.fields);
          _this2.totalRows = _this2.filteredItems.length;
          _this2.calculateFooterTotal();
          _this2.calculateTotalAmount();

          // Force table refresh
          _this2.tableKey++;
        } else {
          _this2.showError(response.data.message);
        }
      })["catch"](function (error) {
        _this2.isLoading = false;
        _this2.showError("Error fetching POS orders");
      });
    },
    formatDate: function formatDate(dateString) {
      return moment__WEBPACK_IMPORTED_MODULE_2___default()(dateString).format('DD/MM/YYYY');
    },
    viewInvoice: function viewInvoice(orderId) {
      // Set the invoice URL and show modal instead of opening in new tab
      this.invoiceUrl = "/pos/invoice/".concat(orderId);
      this.$bvModal.show('invoice-modal');
    },
    calculateTotalAmount: function calculateTotalAmount() {
      // Calculate grand total (all orders)
      this.totalAmount = this.posOrders.reduce(function (total, item) {
        return total + parseFloat(item.total_amount || 0);
      }, 0).toFixed(2);
    },
    calculateFooterTotal: function calculateFooterTotal() {
      // Calculate total for just the current page
      var start = (this.currentPage - 1) * this.perPage;
      var end = Math.min(start + this.perPage, this.filteredItems.length);
      var currentPageItems = this.filteredItems.slice(start, end);
      this.footerTotal = currentPageItems.reduce(function (total, item) {
        return total + parseFloat(item.total_amount || 0);
      }, 0).toFixed(2);
    },
    onFilterChanged: function onFilterChanged() {
      var _this3 = this;
      if (this.filter) {
        var filterLC = this.filter.toLowerCase();
        this.filteredItems = this.posOrders.filter(function (item) {
          return _this3.fields.some(function (field) {
            var value = item[field.key];
            return value && String(value).toLowerCase().includes(filterLC);
          });
        });
      } else {
        this.filteredItems = _toConsumableArray(this.posOrders);
      }
      this.totalRows = this.filteredItems.length;
      this.currentPage = 1; // Reset to first page when filtering
      this.tableKey++; // Force table re-render
      this.calculateFooterTotal();
    },
    onPageChange: function onPageChange() {
      this.calculateFooterTotal();
      this.tableKey++; // Force table re-render
    },
    onPerPageChange: function onPerPageChange() {
      this.currentPage = 1; // Reset to first page when changing per page
      this.calculateFooterTotal();
      this.tableKey++; // Force table re-render
    },
    printInvoice: function printInvoice() {
      var iframe = document.querySelector('#invoice-modal iframe');
      if (iframe) {
        iframe.contentWindow.print();
      }
    },
    printThermal: function printThermal() {
      // 1. Get the content to print
      var printContents = document.getElementById('thermal-print-area').innerHTML;
      var paperWidth = this.sellerSettings.thermal_paper_width || 80;

      // 2. temporary window
      var printWindow = window.open('', '_blank', "width=".concat(paperWidth * 4, ",height=600"));

      // 3. Document structure 
      printWindow.document.open();

      // 4. Basic HTML structure
      printWindow.document.write('<html><head><title>Print Receipt</title></head><body><div id="print-root"></div></body></html>');

      // 5. Copy styles
      document.querySelectorAll('style, link[rel="stylesheet"]').forEach(function (style) {
        printWindow.document.head.appendChild(style.cloneNode(true));
      });

      // 6. Add custom styles for thermal printing
      var styleSheet = printWindow.document.createElement("style");
      styleSheet.innerText = "@page { size: ".concat(paperWidth, "mm auto; margin: 0; } \n                            body { margin: 0 auto; padding: 2mm; width: ").concat(paperWidth, "mm !important;}");
      printWindow.document.head.appendChild(styleSheet);

      // 7. Insert content
      printWindow.document.getElementById('print-root').innerHTML = printContents;
      printWindow.document.close();

      // 8. Print when loaded
      printWindow.onload = function () {
        printWindow.focus();
        printWindow.print();
        printWindow.close();
      };

      // Backup timeout in case onload doesn't fire
      setTimeout(function () {
        if (!printWindow.closed) {
          printWindow.focus();
          printWindow.print();
          printWindow.close();
        }
      }, 700);
    }
  },
  computed: {
    pageStart: function pageStart() {
      if (this.totalRows === 0) return 0;
      return (this.currentPage - 1) * this.perPage + 1;
    },
    paginatedItems: function paginatedItems() {
      var start = (this.currentPage - 1) * this.perPage;
      var end = Math.min(start + this.perPage, this.filteredItems.length);
      return this.filteredItems.slice(start, end);
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

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Sellers/PosReport.vue?vue&type=style&index=0&id=73616904&scoped=true&lang=css":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Sellers/PosReport.vue?vue&type=style&index=0&id=73616904&scoped=true&lang=css ***!
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
___CSS_LOADER_EXPORT___.push([module.id, "\n.vue-daterange-picker[data-v-1ebd09d2][data-v-73616904] {\n    min-width: 80%;\n}\n@media only screen and (min-width: 600px) {\n.vue-daterange-picker[data-v-1ebd09d2][data-v-73616904] {\n        min-width: 90%;\n}\n}\n.total-amount-display[data-v-73616904] {\n    font-weight: bold;\n    font-size: 1.1rem;\n    color: var(--theme-primary-500, #435ebe);\n}\n.invoice-action-cell[data-v-73616904] {\n    min-width: 100px;\n}\n.report-total-row td[data-v-73616904] {\n    font-weight: 700;\n    color: var(--ui-heading);\n    background: var(--ui-surface-muted);\n    border-top: 1px solid var(--ui-border);\n}\n.report-empty[data-v-73616904] {\n    color: var(--ui-text-muted) !important;\n    padding: 32px 16px !important;\n}\n.report-empty-icon[data-v-73616904] {\n    font-size: 28px;\n    color: var(--ui-text-subtle);\n}\n\n/* THERMAL PRINT STYLES */\n\n/* 1. Preview Background Wrapper */\n.preview-wrapper[data-v-73616904] {\n    display: flex;\n    justify-content: center;\n    background: var(--theme-neutral-200, #eee);\n    padding: 20px;\n}\n\n/* 2. Main Receipt Container */\n.receipt-container[data-v-73616904] {\n    background: white;\n    padding: 4mm;\n    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);\n    font-family: 'Courier New', Courier, monospace;\n    color: var(--theme-neutral-950, #000);\n    font-size: 11px;\n    line-height: 1.2;\n}\n\n/* 3. TABLE  */\n.receipt-table[data-v-73616904] {\n    width: 100%;\n    border-collapse: collapse;\n    table-layout: fixed;\n\n    margin: 5px 0;\n}\n.receipt-table th[data-v-73616904],\n.receipt-table td[data-v-73616904] {\n    padding: 2px 0;\n    vertical-align: top;\n    word-wrap: break-word;\n    overflow: hidden;\n}\n\n/* Column Widths (Fixed Balance) */\n.col-item[data-v-73616904] {\n    width: 35%;\n    text-align: start;\n}\n.col-rate[data-v-73616904] {\n    width: 30%;\n    text-align: right;\n}\n.col-qty[data-v-73616904] {\n    width: 10%;\n    text-align: right;\n}\n.col-amt[data-v-73616904] {\n    width: 25%;\n    text-align: right;\n}\n\n/* 4. Store & Header Styling */\n.receipt-logo[data-v-73616904] {\n    max-width: 60px;\n    filter: grayscale(100%);\n    margin: 0 auto 5px auto;\n    display: block;\n}\n.store-name[data-v-73616904] {\n    font-size: 13px;\n    font-weight: bold;\n    text-transform: uppercase;\n    text-align: center;\n}\n.receipt-info[data-v-73616904] {\n    font-size: 10px;\n    margin-top: 5px;\n}\n\n/* 5. Totals Section Styling */\n.totals-section[data-v-73616904] {\n    width: 100%;\n    margin-top: 5px;\n}\n.total-row[data-v-73616904] {\n    display: flex;\n    justify-content: space-between;\n    padding: 1px 0;\n}\n.grand-total[data-v-73616904] {\n    font-size: 13px;\n    font-weight: bold;\n    border-top: 1px dashed var(--theme-neutral-950, #000);\n    border-bottom: 1px dashed var(--theme-neutral-950, #000);\n    padding: 4px 0;\n    margin-top: 4px;\n}\n\n/* 6. Lines */\n.dashed-line[data-v-73616904] {\n    border-top: 1px dashed var(--theme-neutral-950, #000);\n    margin: 6px 0;\n}\n.dashed-line-thin[data-v-73616904] {\n    border-top: 1px dotted var(--theme-neutral-500, #888);\n    margin: 3px 0;\n}\n.text-center[data-v-73616904] {\n    text-align: center;\n}\n.text-right[data-v-73616904] {\n    text-align: right;\n}\n.font-weight-bold[data-v-73616904] {\n    font-weight: bold;\n}\n.footer-thanks[data-v-73616904] {\n    font-style: italic;\n    margin-top: 10px;\n    font-size: 10px;\n}\n\n/* 7. NARROW PAPER OPTIMIZATION (58mm) */\n#thermal-print-area[style*=\"width: 58mm\"][data-v-73616904] {\n    font-size: 9px;\n    padding: 2mm;\n}\n#thermal-print-area[style*=\"width: 58mm\"] .col-item[data-v-73616904] {\n    width: 30%;\n}\n#thermal-print-area[style*=\"width: 58mm\"] .col-rate[data-v-73616904] {\n    width: 35%;\n}\n\n/* 8. PRINT LOGIC */\n@media print {\nhtml[data-v-73616904],\n    body[data-v-73616904],\n    #app[data-v-73616904],\n    .main-content[data-v-73616904],\n    .sidebar[data-v-73616904],\n    .navbar[data-v-73616904],\n    .modal-header[data-v-73616904],\n    .modal-footer[data-v-73616904],\n    .btn[data-v-73616904] {\n        visibility: hidden !important;\n        margin: 0 !important;\n        padding: 0 !important;\n}\n.modal-backdrop[data-v-73616904],\n    .page-heading[data-v-73616904],\n    .section[data-v-73616904],\n    .breadcrumb[data-v-73616904] {\n        display: none !important;\n}\n#thermal-print-area[data-v-73616904],\n    #thermal-print-area *[data-v-73616904] {\n        visibility: visible !important;\n}\n#thermal-print-area[data-v-73616904] {\n        position: fixed !important;\n        left: 0 !important;\n        top: 0 !important;\n        width: 100% !important;\n        margin: 0 !important;\n        padding: 2mm !important;\n        box-shadow: none !important;\n        border: none !important;\n}\nbody[data-v-73616904] {\n        overflow: visible !important;\n}\n}\n", ""]);
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

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Sellers/PosReport.vue?vue&type=style&index=0&id=73616904&scoped=true&lang=css":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Sellers/PosReport.vue?vue&type=style&index=0&id=73616904&scoped=true&lang=css ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_PosReport_vue_vue_type_style_index_0_id_73616904_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./PosReport.vue?vue&type=style&index=0&id=73616904&scoped=true&lang=css */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Sellers/PosReport.vue?vue&type=style&index=0&id=73616904&scoped=true&lang=css");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_PosReport_vue_vue_type_style_index_0_id_73616904_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_PosReport_vue_vue_type_style_index_0_id_73616904_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./resources/js/views/Sellers/PosReport.vue":
/*!**************************************************!*\
  !*** ./resources/js/views/Sellers/PosReport.vue ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _PosReport_vue_vue_type_template_id_73616904_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PosReport.vue?vue&type=template&id=73616904&scoped=true */ "./resources/js/views/Sellers/PosReport.vue?vue&type=template&id=73616904&scoped=true");
/* harmony import */ var _PosReport_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PosReport.vue?vue&type=script&lang=js */ "./resources/js/views/Sellers/PosReport.vue?vue&type=script&lang=js");
/* harmony import */ var _PosReport_vue_vue_type_style_index_0_id_73616904_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./PosReport.vue?vue&type=style&index=0&id=73616904&scoped=true&lang=css */ "./resources/js/views/Sellers/PosReport.vue?vue&type=style&index=0&id=73616904&scoped=true&lang=css");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _PosReport_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _PosReport_vue_vue_type_template_id_73616904_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render,
  _PosReport_vue_vue_type_template_id_73616904_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "73616904",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/Sellers/PosReport.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/views/Sellers/PosReport.vue?vue&type=script&lang=js":
/*!**************************************************************************!*\
  !*** ./resources/js/views/Sellers/PosReport.vue?vue&type=script&lang=js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PosReport_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./PosReport.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Sellers/PosReport.vue?vue&type=script&lang=js");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PosReport_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/Sellers/PosReport.vue?vue&type=style&index=0&id=73616904&scoped=true&lang=css":
/*!**********************************************************************************************************!*\
  !*** ./resources/js/views/Sellers/PosReport.vue?vue&type=style&index=0&id=73616904&scoped=true&lang=css ***!
  \**********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_PosReport_vue_vue_type_style_index_0_id_73616904_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/style-loader/dist/cjs.js!../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./PosReport.vue?vue&type=style&index=0&id=73616904&scoped=true&lang=css */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Sellers/PosReport.vue?vue&type=style&index=0&id=73616904&scoped=true&lang=css");


/***/ }),

/***/ "./resources/js/views/Sellers/PosReport.vue?vue&type=template&id=73616904&scoped=true":
/*!********************************************************************************************!*\
  !*** ./resources/js/views/Sellers/PosReport.vue?vue&type=template&id=73616904&scoped=true ***!
  \********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_PosReport_vue_vue_type_template_id_73616904_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   staticRenderFns: () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_PosReport_vue_vue_type_template_id_73616904_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_PosReport_vue_vue_type_template_id_73616904_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./PosReport.vue?vue&type=template&id=73616904&scoped=true */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Sellers/PosReport.vue?vue&type=template&id=73616904&scoped=true");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Sellers/PosReport.vue?vue&type=template&id=73616904&scoped=true":
/*!***********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Sellers/PosReport.vue?vue&type=template&id=73616904&scoped=true ***!
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
  return _c(
    "div",
    [
      _c("div", { staticClass: "page-heading" }, [
        _c("div", { staticClass: "page-title mb-2" }, [
          _c(
            "div",
            {
              staticClass:
                "d-flex justify-content-between align-items-center flex-wrap gap-2",
            },
            [
              _c("h3", { staticClass: "modern-page-title mb-0" }, [
                _vm._v(_vm._s(_vm.__("pos_orders_report"))),
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
                          attrs: { to: "/seller/dashboard" },
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
                    [_vm._v(_vm._s(_vm.__("pos_orders_report")))]
                  ),
                ]),
              ]),
            ]
          ),
        ]),
        _vm._v(" "),
        _c("section", { staticClass: "section" }, [
          _c(
            "div",
            { staticClass: "row g-3 mb-3 report-kpis justify-content-start" },
            [
              _c("div", { staticClass: "col-6 col-md-4 col-xl-3" }, [
                _c("div", { staticClass: "figma-kpi-card-v2 w-100" }, [
                  _vm._m(0),
                  _vm._v(" "),
                  _c("div", { staticClass: "figma-kpi-content-v2" }, [
                    _c("span", { staticClass: "figma-kpi-label-v2" }, [
                      _vm._v(_vm._s(_vm.__("total_amount"))),
                    ]),
                    _vm._v(" "),
                    _c("span", { staticClass: "figma-kpi-value-v2" }, [
                      _vm._v(
                        _vm._s(_vm.$currency) + " " + _vm._s(_vm.totalAmount)
                      ),
                    ]),
                  ]),
                ]),
              ]),
            ]
          ),
          _vm._v(" "),
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
                              value: _vm.filter,
                              expression: "filter",
                            },
                          ],
                          staticClass: "figma-search-input",
                          attrs: {
                            type: "text",
                            placeholder: _vm.__("search"),
                          },
                          domProps: { value: _vm.filter },
                          on: {
                            input: [
                              function ($event) {
                                if ($event.target.composing) {
                                  return
                                }
                                _vm.filter = $event.target.value
                              },
                              _vm.onFilterChanged,
                            ],
                          },
                        }),
                      ]),
                    ]),
                    _vm._v(" "),
                    _c(
                      "div",
                      { staticClass: "d-flex gap-2 align-items-center" },
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
                                width: "24",
                                height: "24",
                                useCurrentColor: "",
                              },
                            }),
                            _vm._v(" "),
                            _c("span", [_vm._v(_vm._s(_vm.__("filters")))]),
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
                              "btn btn-figma-filter d-flex align-items-center gap-2",
                            attrs: { title: _vm.__("refresh") },
                            on: {
                              click: function ($event) {
                                return _vm.getPosOrders()
                              },
                            },
                          },
                          [
                            _c("i", { staticClass: "fa fa-refresh" }),
                            _vm._v(" "),
                            _c("span", [_vm._v(_vm._s(_vm.__("refresh")))]),
                          ]
                        ),
                      ]
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
                        _c("div", { staticClass: "col-md-3" }, [
                          _c(
                            "div",
                            { staticClass: "figma-filter-group" },
                            [
                              _c(
                                "label",
                                { staticClass: "figma-filter-label" },
                                [_vm._v(_vm._s(_vm.__("payment_method")))]
                              ),
                              _vm._v(" "),
                              _c("b-form-select", {
                                staticClass: "form-select modern-select",
                                attrs: { options: _vm.paymentMethodOptions },
                                on: { change: _vm.getPosOrders },
                                model: {
                                  value: _vm.selectedPaymentMethod,
                                  callback: function ($$v) {
                                    _vm.selectedPaymentMethod = $$v
                                  },
                                  expression: "selectedPaymentMethod",
                                },
                              }),
                            ],
                            1
                          ),
                        ]),
                        _vm._v(" "),
                        _c("div", { staticClass: "col-md-4" }, [
                          _c("div", { staticClass: "figma-filter-group" }, [
                            _c("label", { staticClass: "figma-filter-label" }, [
                              _vm._v(_vm._s(_vm.__("date_range"))),
                            ]),
                            _vm._v(" "),
                            _c(
                              "div",
                              { staticClass: "modern-datepicker-container" },
                              [
                                _c("date-range-picker", {
                                  staticClass: "w-100",
                                  attrs: {
                                    "append-to-body": true,
                                    "single-date-picker": "range",
                                    autoApply: false,
                                    showDropdowns: true,
                                    maxDate: _vm.maxDate,
                                    "locale-data": _vm.dateRangePickerLocale,
                                    ranges: _vm.dateRangePickerRanges,
                                  },
                                  on: { update: _vm.getPosOrders },
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
                      ]),
                    ]),
                  ]
                ),
                _vm._v(" "),
                _c("div", { staticClass: "table-responsive mb-0" }, [
                  _c("table", { staticClass: "table figma-order-table mb-0" }, [
                    _c("thead", [
                      _c("tr", [
                        _c("th", [_vm._v(_vm._s(_vm.__("order_id")))]),
                        _vm._v(" "),
                        _c("th", [_vm._v(_vm._s(_vm.__("customer")))]),
                        _vm._v(" "),
                        _c("th", [_vm._v(_vm._s(_vm.__("mobile")))]),
                        _vm._v(" "),
                        _c("th", [_vm._v(_vm._s(_vm.__("date")))]),
                        _vm._v(" "),
                        _c("th", { staticClass: "text-end" }, [
                          _vm._v(_vm._s(_vm.__("total_amount"))),
                        ]),
                        _vm._v(" "),
                        _c("th", [_vm._v(_vm._s(_vm.__("payment_method")))]),
                        _vm._v(" "),
                        _c("th", { staticClass: "text-center" }, [
                          _vm._v(_vm._s(_vm.__("invoice"))),
                        ]),
                      ]),
                    ]),
                    _vm._v(" "),
                    _c(
                      "tbody",
                      [
                        _vm.isLoading
                          ? _c("tr", [
                              _c(
                                "td",
                                {
                                  staticClass: "text-center text-black my-2",
                                  attrs: { colspan: "7" },
                                },
                                [
                                  _c("b-spinner", {
                                    staticClass: "align-middle",
                                  }),
                                  _vm._v(" "),
                                  _c("strong", [
                                    _vm._v(_vm._s(_vm.__("loading")) + "..."),
                                  ]),
                                ],
                                1
                              ),
                            ])
                          : _vm.filteredItems.length === 0
                          ? _c("tr", [
                              _c(
                                "td",
                                {
                                  staticClass: "text-center report-empty",
                                  attrs: { colspan: "7" },
                                },
                                [
                                  _c("i", {
                                    staticClass:
                                      "fa fa-inbox d-block mb-2 report-empty-icon",
                                    attrs: { "aria-hidden": "true" },
                                  }),
                                  _vm._v(
                                    "\n                                        " +
                                      _vm._s(
                                        _vm.__(
                                          "no_records_matching_your_request"
                                        )
                                      ) +
                                      "\n                                    "
                                  ),
                                ]
                              ),
                            ])
                          : _vm._l(_vm.paginatedItems, function (item) {
                              return _c("tr", { key: item.id }, [
                                _c("td", { staticClass: "fw-semibold" }, [
                                  _vm._v("#" + _vm._s(item.id)),
                                ]),
                                _vm._v(" "),
                                _c("td", [_vm._v(_vm._s(item.customer_name))]),
                                _vm._v(" "),
                                _c("td", [
                                  _vm._v(_vm._s(item.customer_mobile || "-")),
                                ]),
                                _vm._v(" "),
                                _c("td", [_vm._v(_vm._s(item.created_at))]),
                                _vm._v(" "),
                                _c("td", { staticClass: "text-end" }, [
                                  _vm._v(
                                    _vm._s(_vm.$currency) +
                                      " " +
                                      _vm._s(item.total_amount)
                                  ),
                                ]),
                                _vm._v(" "),
                                _c("td", [
                                  _c(
                                    "span",
                                    {
                                      staticClass: "figma-status-pill bg-info",
                                    },
                                    [_vm._v(_vm._s(item.payment_method))]
                                  ),
                                ]),
                                _vm._v(" "),
                                _c("td", [
                                  _c(
                                    "div",
                                    {
                                      staticClass:
                                        "d-flex gap-2 justify-content-center",
                                    },
                                    [
                                      _c(
                                        "button",
                                        {
                                          directives: [
                                            {
                                              name: "b-tooltip",
                                              rawName: "v-b-tooltip.hover",
                                              modifiers: { hover: true },
                                            },
                                          ],
                                          staticClass: "figma-action-btn",
                                          attrs: { title: _vm.__("invoice") },
                                          on: {
                                            click: function ($event) {
                                              return _vm.viewInvoice(item.id)
                                            },
                                          },
                                        },
                                        [
                                          _c("i", {
                                            staticClass: "fa fa-print",
                                          }),
                                        ]
                                      ),
                                      _vm._v(" "),
                                      _c(
                                        "button",
                                        {
                                          directives: [
                                            {
                                              name: "b-tooltip",
                                              rawName: "v-b-tooltip.hover",
                                              modifiers: { hover: true },
                                            },
                                          ],
                                          staticClass: "figma-action-btn",
                                          attrs: {
                                            title: _vm.__("thermal_preview"),
                                          },
                                          on: {
                                            click: function ($event) {
                                              return _vm.openThermalModal(
                                                item.id
                                              )
                                            },
                                          },
                                        },
                                        [
                                          _c("i", {
                                            staticClass: "fa fa-receipt",
                                          }),
                                        ]
                                      ),
                                    ]
                                  ),
                                ]),
                              ])
                            }),
                      ],
                      2
                    ),
                    _vm._v(" "),
                    _c("tfoot", [
                      _c("tr", { staticClass: "report-total-row" }, [
                        _c("td", [_vm._v(_vm._s(_vm.__("total")))]),
                        _vm._v(" "),
                        _c("td"),
                        _vm._v(" "),
                        _c("td"),
                        _vm._v(" "),
                        _c("td"),
                        _vm._v(" "),
                        _c("td", { staticClass: "text-end" }, [
                          _vm._v(
                            _vm._s(_vm.$currency) +
                              " " +
                              _vm._s(_vm.footerTotal)
                          ),
                        ]),
                        _vm._v(" "),
                        _c("td"),
                        _vm._v(" "),
                        _c("td"),
                      ]),
                    ]),
                  ]),
                ]),
                _vm._v(" "),
                _c(
                  "div",
                  { staticClass: "figma-table-footer flex-wrap gap-3" },
                  [
                    _c("table-count", {
                      attrs: {
                        "current-page": _vm.currentPage,
                        "per-page": _vm.perPage,
                        "total-rows": _vm.totalRows,
                      },
                    }),
                    _vm._v(" "),
                    _c(
                      "div",
                      { staticClass: "d-flex align-items-center gap-3" },
                      [
                        _c("b-pagination", {
                          staticClass: "figma-pagination mb-0",
                          attrs: {
                            "total-rows": _vm.totalRows,
                            "per-page": _vm.perPage,
                            align: "right",
                            "hide-goto-end-buttons": "",
                            "hide-ellipsis": "",
                            "prev-text": "<",
                            "next-text": ">",
                          },
                          on: { change: _vm.onPageChange },
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
              ],
              1
            ),
          ]),
        ]),
      ]),
      _vm._v(" "),
      _c(
        "b-modal",
        {
          attrs: {
            id: "invoice-modal",
            size: "xl",
            title: _vm.__("pos_invoice"),
            "hide-footer": "",
          },
        },
        [
          _c("div", { staticClass: "invoice-container" }, [
            _c("iframe", {
              staticStyle: { width: "100%", height: "80vh" },
              attrs: { src: _vm.invoiceUrl, frameborder: "0" },
            }),
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "d-flex justify-content-end gap-2 mt-3" }, [
            _c(
              "button",
              {
                staticClass: "btn btn-outline-secondary",
                on: {
                  click: function ($event) {
                    return _vm.$bvModal.hide("invoice-modal")
                  },
                },
              },
              [_vm._v(_vm._s(_vm.__("close")))]
            ),
            _vm._v(" "),
            _c(
              "button",
              {
                staticClass: "btn btn-primary",
                on: { click: _vm.printInvoice },
              },
              [
                _c("i", { staticClass: "fa fa-print me-1" }),
                _vm._v(_vm._s(_vm.__("print"))),
              ]
            ),
          ]),
        ]
      ),
      _vm._v(" "),
      _c(
        "b-modal",
        {
          attrs: {
            id: "thermal-modal",
            title: _vm.__("thermal_preview"),
            "hide-footer": "",
            centered: "",
          },
        },
        [
          _c("div", { staticClass: "preview-wrapper" }, [
            _vm.sellerSettings && _vm.thermalOrder
              ? _c(
                  "div",
                  {
                    staticClass: "receipt-container",
                    style: {
                      width: _vm.sellerSettings.thermal_paper_width + "mm",
                    },
                    attrs: { id: "thermal-print-area" },
                  },
                  [
                    _vm.sellerSettings.invoice_logo
                      ? _c("div", { staticClass: "text-center mb-2" }, [
                          _c("img", {
                            staticClass: "receipt-logo",
                            attrs: { src: _vm.sellerSettings.invoice_logo },
                          }),
                        ])
                      : _vm._e(),
                    _vm._v(" "),
                    _c("div", { staticClass: "text-center store-name" }, [
                      _vm._v(_vm._s(_vm.sellerSettings.name)),
                    ]),
                    _vm._v(" "),
                    _c("div", { staticClass: "text-center" }, [
                      _c("strong", [_vm._v("Email:")]),
                      _vm._v(_vm._s(_vm.sellerSettings.email)),
                    ]),
                    _vm._v(" "),
                    _c("div", { staticClass: "text-center" }, [
                      _c("strong", [_vm._v("Mobile No:")]),
                      _vm._v(_vm._s(_vm.sellerSettings.mobile)),
                    ]),
                    _vm._v(" "),
                    _c("div", { staticClass: "dashed-line" }),
                    _vm._v(" "),
                    _c("div", { staticClass: "receipt-info" }, [
                      _c("div", [
                        _c("strong", [_vm._v("Invoice No:")]),
                        _vm._v(" #" + _vm._s(_vm.thermalOrder.order_id)),
                      ]),
                      _vm._v(" "),
                      _c("div", [
                        _c("strong", [_vm._v("Date:")]),
                        _vm._v(
                          " " +
                            _vm._s(
                              _vm.formatDateTime(_vm.thermalOrder.created_at)
                            )
                        ),
                      ]),
                      _vm._v(" "),
                      _c("div", [
                        _c("strong", [_vm._v("Payment:")]),
                        _vm._v(
                          " " +
                            _vm._s(
                              _vm.thermalOrder.payment_method.toUpperCase()
                            )
                        ),
                      ]),
                    ]),
                    _vm._v(" "),
                    _c("div", { staticClass: "dashed-line" }),
                    _vm._v(" "),
                    _c("table", { staticClass: "receipt-table" }, [
                      _c("thead", [
                        _c("tr", [
                          _c("th", { staticClass: "col-item text-left" }, [
                            _vm._v("Item"),
                          ]),
                          _vm._v(" "),
                          _c("th", { staticClass: "col-rate text-right" }, [
                            _vm._v("Rate"),
                          ]),
                          _vm._v(" "),
                          _c("th", { staticClass: "col-qty text-right" }, [
                            _vm._v("Qty"),
                          ]),
                          _vm._v(" "),
                          _c("th", { staticClass: "col-amt text-right" }, [
                            _vm._v("Amt"),
                          ]),
                        ]),
                      ]),
                      _vm._v(" "),
                      _c(
                        "tbody",
                        _vm._l(_vm.thermalOrder.items, function (item, i) {
                          return _c("tr", { key: i }, [
                            _c("td", { staticClass: "col-item text-left" }, [
                              _vm._v(_vm._s(item.name)),
                            ]),
                            _vm._v(" "),
                            _c("td", { staticClass: "col-rate text-right" }, [
                              _vm._v(_vm._s(item.unit_price)),
                            ]),
                            _vm._v(" "),
                            _c("td", { staticClass: "col-qty text-right" }, [
                              _vm._v(_vm._s(item.qty)),
                            ]),
                            _vm._v(" "),
                            _c("td", { staticClass: "col-amt text-right" }, [
                              _vm._v(_vm._s(item.subtotal)),
                            ]),
                          ])
                        }),
                        0
                      ),
                    ]),
                    _vm._v(" "),
                    _c("div", { staticClass: "dashed-line" }),
                    _vm._v(" "),
                    _c(
                      "div",
                      { staticClass: "totals" },
                      [
                        _c(
                          "div",
                          { staticClass: "d-flex justify-content-between" },
                          [
                            _c("span", [_vm._v("Total Qty:")]),
                            _vm._v(" "),
                            _c("span", [
                              _vm._v(_vm._s(_vm.thermalOrder.total_qty)),
                            ]),
                          ]
                        ),
                        _vm._v(" "),
                        _c(
                          "div",
                          { staticClass: "d-flex justify-content-between" },
                          [
                            _c("span", [_vm._v("Subtotal:")]),
                            _vm._v(" "),
                            _c("span", [
                              _vm._v(
                                "₹ " + _vm._s(_vm.thermalOrder.items_total)
                              ),
                            ]),
                          ]
                        ),
                        _vm._v(" "),
                        _vm.thermalOrder.discount_amount > 0
                          ? _c(
                              "div",
                              {
                                staticClass:
                                  "d-flex justify-content-between text-danger",
                              },
                              [
                                _c("span", [_vm._v("Discount:")]),
                                _vm._v(" "),
                                _c("span", [
                                  _vm._v(
                                    "- ₹ " +
                                      _vm._s(_vm.thermalOrder.discount_amount)
                                  ),
                                ]),
                              ]
                            )
                          : _vm._e(),
                        _vm._v(" "),
                        _vm._l(
                          _vm.thermalOrder.additional_charges,
                          function (charge, index) {
                            return _c(
                              "div",
                              {
                                key: "c" + index,
                                staticClass: "d-flex justify-content-between",
                              },
                              [
                                _c("span", [
                                  _vm._v(_vm._s(charge.charge_name) + ":"),
                                ]),
                                _vm._v(" "),
                                _c("span", [
                                  _vm._v("₹ " + _vm._s(charge.amount)),
                                ]),
                              ]
                            )
                          }
                        ),
                        _vm._v(" "),
                        _c("div", { staticClass: "dashed-line-thin" }),
                        _vm._v(" "),
                        _c(
                          "div",
                          {
                            staticClass:
                              "d-flex justify-content-between grand-total font-weight-bold",
                          },
                          [
                            _c("span", [_vm._v("Grand Total:")]),
                            _vm._v(" "),
                            _c("span", [
                              _vm._v(
                                "₹ " + _vm._s(_vm.thermalOrder.grand_total)
                              ),
                            ]),
                          ]
                        ),
                      ],
                      2
                    ),
                    _vm._v(" "),
                    _c("div", { staticClass: "dashed-line" }),
                    _vm._v(" "),
                    _c("div", { staticClass: "text-center footer-thanks" }, [
                      _vm._v("Thank you for your purchase!"),
                    ]),
                  ]
                )
              : _vm._e(),
          ]),
          _vm._v(" "),
          _c(
            "div",
            {
              staticClass:
                "modal-footer-custom d-flex justify-content-end gap-2 mt-3",
            },
            [
              _c(
                "button",
                {
                  staticClass: "btn btn-outline-secondary",
                  on: {
                    click: function ($event) {
                      return _vm.$bvModal.hide("thermal-modal")
                    },
                  },
                },
                [_vm._v(_vm._s(_vm.__("close")))]
              ),
              _vm._v(" "),
              _c(
                "button",
                {
                  staticClass: "btn btn-primary",
                  on: { click: _vm.printThermal },
                },
                [
                  _c("i", { staticClass: "fa fa-print" }),
                  _vm._v(" " + _vm._s(_vm.__("print_now")) + "\n            "),
                ]
              ),
            ]
          ),
        ]
      ),
    ],
    1
  )
}
var staticRenderFns = [
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "figma-kpi-icon-v2 bg-stat-green" }, [
      _c("i", { staticClass: "bi bi-receipt" }),
    ])
  },
]
render._withStripped = true



/***/ })

}]);