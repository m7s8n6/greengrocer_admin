"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_views_Customers_Customers_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Customers/Customers.vue?vue&type=script&lang=js":
/*!********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Customers/Customers.vue?vue&type=script&lang=js ***!
  \********************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _mixins_ViewModeMixin__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../mixins/ViewModeMixin */ "./resources/js/mixins/ViewModeMixin.js");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
  mixins: [_mixins_ViewModeMixin__WEBPACK_IMPORTED_MODULE_0__["default"]],
  data: function data() {
    return {
      isLoading: false,
      fields: [{
        key: 'id',
        label: __('id'),
        sortable: true,
        sortDirection: 'desc'
      }, {
        key: 'name',
        label: __('name'),
        sortable: true
      }, {
        key: 'email',
        label: __('email'),
        sortable: true
      }, {
        key: 'mobile',
        label: __('mobile_no'),
        sortable: true
      }, {
        key: 'balance',
        label: __('balance'),
        sortable: true
      }, {
        key: 'status',
        label: __('status'),
        sortable: true
      }, {
        key: 'type',
        label: __('type'),
        sortable: true
      }, {
        key: 'created_at',
        label: __('date_time'),
        sortable: true
      }, {
        key: 'actions',
        label: __('actions')
      }],
      totalRows: 1,
      currentPage: 1,
      perPage: this.$perPage,
      pageOptions: this.$pageOptions,
      sortBy: 'id',
      sortDesc: true,
      sortDirection: 'desc',
      filter: null,
      filterOn: [],
      customers: []
    };
  },
  computed: {
    // Grid view: same records, client-side search and order (id desc by default) as the table.
    gridCustomers: function gridCustomers() {
      return this.gridSort(this.gridFilter(this.customers));
    },
    pageEnd: function pageEnd() {
      return Math.min(this.currentPage * this.perPage, this.totalRows);
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
    }
  },
  mounted: function mounted() {
    // Set the initial number of items
    this.totalRows = this.customers.length;
  },
  created: function created() {
    var _this = this;
    this.$eventBus.$on('customersSaved', function (message) {
      _this.showMessage("success", message);
      _this.getCustomers();
      _this.create_new = null;
    });
    this.getCustomers();
  },
  methods: {
    // Grid view: same client-side search the b-table :filter applies (any field contains the text).
    // Grid view: same order as the b-table (its sortBy / sortDesc are synced from the list view headers).
    addFilter: function addFilter() {
      this.customers = [];
      this.totalRows = 1;
      this.currentPage = 1;
      this.offset = 0;
      this.getCustomers();
    },
    getCustomers: function getCustomers() {
      var _this2 = this;
      var vm = this;
      this.isLoading = true;
      axios.get(this.$apiUrl + '/customers').then(function (response) {
        _this2.isLoading = false;
        vm.isLoading = false;
        _this2.customers = response.data.data;
        _this2.totalRows = response.data.total;
      })["catch"](function (error) {
        var _error$request;
        vm.isLoading = false;
        if ((_error$request = error.request) !== null && _error$request !== void 0 && _error$request.statusText) {
          var _error$request2;
          _this2.showError((_error$request2 = error.request) === null || _error$request2 === void 0 ? void 0 : _error$request2.statusText);
        } else if (error.message) {
          _this2.showError(error.message);
        } else {
          _this2.showError(__('something_went_wrong'));
        }
      });
    },
    updateStatusCustomer: function updateStatusCustomer(index, id) {
      var _this3 = this;
      this.$swal.fire({
        title: __('are_you_sure'),
        text: __('you_want_to_change_status'),
        confirmButtonText: __('yes_sure'),
        cancelButtonText: __('cancel'),
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: 'var(--theme-primary-500)',
        cancelButtonColor: 'var(--theme-error-500)'
      }).then(function (result) {
        if (result.value) {
          _this3.isLoading = true;
          var postData = {
            id: id
          };
          axios.post(_this3.$apiUrl + '/customers/change', postData).then(function (response) {
            _this3.isLoading = false;
            _this3.getCustomers();
            _this3.showMessage("success", response.data.message);
          });
        }
      });
    }
  }
});

/***/ }),

/***/ "./resources/js/mixins/ViewModeMixin.js":
/*!**********************************************!*\
  !*** ./resources/js/mixins/ViewModeMixin.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
/**
 * Grid / list view switch for list pages.
 *
 * Provides `viewMode` ('grid' | 'list'), remembered per page (route path) in localStorage,
 * and `pagedItems(items)`: the slice of `items` the b-table list view shows for the current
 * page, so the grid view always shows the same records as the table.
 *
 * Usage: mixins: [ViewModeMixin]; markup: the shared `.view-toggle` buttons calling
 * setViewMode('grid'|'list'), and an `.item-grid` of `.item-card`s rendered from
 * pagedItems(sameArrayAsTheTable). Set `serverPagination: true` in data() when the API
 * already returns one page (then pagedItems returns the array as is).
 */
var STORAGE_KEY = 'list_view_mode';
function readModes() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  } catch (e) {
    return {};
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  data: function data() {
    var saved = readModes()[this.$route ? this.$route.path : ''];
    return {
      viewMode: ['list', 'tree'].includes(saved) ? saved : 'grid'
    };
  },
  methods: {
    setViewMode: function setViewMode(mode) {
      this.viewMode = mode;
      try {
        var modes = readModes();
        modes[this.$route.path] = mode;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(modes));
      } catch (e) {
        // Storage blocked: the choice just isn't remembered.
      }
    },
    // Same client-side search the b-table `:filter` prop applies: case-insensitive match of the
    // page's `filter` text across all fields (or only `includeFields`), keys starting with "_" skipped.
    gridFilter: function gridFilter(items, includeFields) {
      var list = Array.isArray(items) ? items : [];
      var text = this.filter === null || this.filter === undefined ? '' : String(this.filter).trim();
      if (!text) return list;
      var re = new RegExp(text.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&').replace(/\s+/g, '\\s+'), 'i');
      var stringify = function stringify(value) {
        if (value === null || value === undefined) return '';
        if (_typeof(value) === 'object') return Object.keys(value).filter(function (k) {
          return k.charAt(0) !== '_';
        }).map(function (k) {
          return stringify(value[k]);
        }).join(' ');
        return String(value);
      };
      return list.filter(function (item) {
        var keys = includeFields && includeFields.length ? includeFields : Object.keys(item).filter(function (k) {
          return k.charAt(0) !== '_';
        });
        return re.test(keys.map(function (k) {
          return stringify(item[k]);
        }).join(' '));
      });
    },
    // Same order as the b-table's synced `sortBy` / `sortDesc` (dotted keys supported).
    gridSort: function gridSort(items) {
      var _this = this;
      var list = Array.isArray(items) ? items.slice() : [];
      if (!this.sortBy) return list;
      var dir = this.sortDesc ? -1 : 1;
      var val = function val(o) {
        return String(_this.sortBy).split('.').reduce(function (a, k) {
          return a == null ? a : a[k];
        }, o);
      };
      return list.sort(function (a, b) {
        var x = val(a);
        var y = val(b);
        if (x === y) return 0;
        if (x === null || x === undefined) return -dir;
        if (y === null || y === undefined) return dir;
        var nx = Number(x);
        var ny = Number(y);
        if (x !== '' && y !== '' && !isNaN(nx) && !isNaN(ny)) return (nx - ny) * dir;
        return String(x).localeCompare(String(y), undefined, {
          numeric: true
        }) * dir;
      });
    },
    gridFilterSort: function gridFilterSort(items, includeFields) {
      return this.gridSort(this.gridFilter(items, includeFields));
    },
    // First letter of a name for avatar placeholders.
    initial: function initial(name) {
      return ((name || '?').toString().trim().charAt(0) || '?').toUpperCase();
    },
    pagedItems: function pagedItems(items) {
      var list = Array.isArray(items) ? items : [];
      if (this.serverPagination) return list;
      var perPage = Number(this.perPage) || list.length || 1;
      var page = Number(this.currentPage) || 1;
      return list.slice((page - 1) * perPage, page * perPage);
    }
  }
});

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Customers/Customers.vue?vue&type=style&index=0&id=0aa4382c&scoped=true&lang=css":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Customers/Customers.vue?vue&type=style&index=0&id=0aa4382c&scoped=true&lang=css ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.id, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n/* Initial avatar in the name column */\n.customer-avatar[data-v-0aa4382c] {\n    width: 34px;\n    height: 34px;\n    border-radius: 50%;\n    background: var(--ui-primary-soft);\n    color: var(--theme-primary-600);\n    font-size: 13px;\n}\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Customers/Customers.vue?vue&type=style&index=0&id=0aa4382c&scoped=true&lang=css":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Customers/Customers.vue?vue&type=style&index=0&id=0aa4382c&scoped=true&lang=css ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Customers_vue_vue_type_style_index_0_id_0aa4382c_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Customers.vue?vue&type=style&index=0&id=0aa4382c&scoped=true&lang=css */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Customers/Customers.vue?vue&type=style&index=0&id=0aa4382c&scoped=true&lang=css");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Customers_vue_vue_type_style_index_0_id_0aa4382c_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Customers_vue_vue_type_style_index_0_id_0aa4382c_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./resources/js/views/Customers/Customers.vue":
/*!****************************************************!*\
  !*** ./resources/js/views/Customers/Customers.vue ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Customers_vue_vue_type_template_id_0aa4382c_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Customers.vue?vue&type=template&id=0aa4382c&scoped=true */ "./resources/js/views/Customers/Customers.vue?vue&type=template&id=0aa4382c&scoped=true");
/* harmony import */ var _Customers_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Customers.vue?vue&type=script&lang=js */ "./resources/js/views/Customers/Customers.vue?vue&type=script&lang=js");
/* harmony import */ var _Customers_vue_vue_type_style_index_0_id_0aa4382c_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Customers.vue?vue&type=style&index=0&id=0aa4382c&scoped=true&lang=css */ "./resources/js/views/Customers/Customers.vue?vue&type=style&index=0&id=0aa4382c&scoped=true&lang=css");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _Customers_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _Customers_vue_vue_type_template_id_0aa4382c_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render,
  _Customers_vue_vue_type_template_id_0aa4382c_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "0aa4382c",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/Customers/Customers.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/views/Customers/Customers.vue?vue&type=script&lang=js":
/*!****************************************************************************!*\
  !*** ./resources/js/views/Customers/Customers.vue?vue&type=script&lang=js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Customers_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Customers.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Customers/Customers.vue?vue&type=script&lang=js");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Customers_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/Customers/Customers.vue?vue&type=style&index=0&id=0aa4382c&scoped=true&lang=css":
/*!************************************************************************************************************!*\
  !*** ./resources/js/views/Customers/Customers.vue?vue&type=style&index=0&id=0aa4382c&scoped=true&lang=css ***!
  \************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Customers_vue_vue_type_style_index_0_id_0aa4382c_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/style-loader/dist/cjs.js!../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Customers.vue?vue&type=style&index=0&id=0aa4382c&scoped=true&lang=css */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Customers/Customers.vue?vue&type=style&index=0&id=0aa4382c&scoped=true&lang=css");


/***/ }),

/***/ "./resources/js/views/Customers/Customers.vue?vue&type=template&id=0aa4382c&scoped=true":
/*!**********************************************************************************************!*\
  !*** ./resources/js/views/Customers/Customers.vue?vue&type=template&id=0aa4382c&scoped=true ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Customers_vue_vue_type_template_id_0aa4382c_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   staticRenderFns: () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Customers_vue_vue_type_template_id_0aa4382c_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Customers_vue_vue_type_template_id_0aa4382c_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Customers.vue?vue&type=template&id=0aa4382c&scoped=true */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Customers/Customers.vue?vue&type=template&id=0aa4382c&scoped=true");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Customers/Customers.vue?vue&type=template&id=0aa4382c&scoped=true":
/*!*************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Customers/Customers.vue?vue&type=template&id=0aa4382c&scoped=true ***!
  \*************************************************************************************************************************************************************************************************************************************/
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
      _c("div", { staticClass: "page-title" }, [
        _c("div", { staticClass: "row" }, [
          _c("div", { staticClass: "col-12 col-md-6 order-md-1 order-last" }, [
            _c("h3", [_vm._v(_vm._s(_vm.__("customers_list")))]),
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "col-12 col-md-6 order-md-2 order-first" }, [
            _c(
              "nav",
              {
                staticClass: "breadcrumb-header float-start float-md-end",
                attrs: { "aria-label": "breadcrumb" },
              },
              [
                _c("ol", { staticClass: "breadcrumb" }, [
                  _c(
                    "li",
                    { staticClass: "breadcrumb-item" },
                    [
                      _c("router-link", { attrs: { to: "/dashboard" } }, [
                        _vm._v(_vm._s(_vm.__("dashboard"))),
                      ]),
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "li",
                    {
                      staticClass: "breadcrumb-item active",
                      attrs: { "aria-current": "page" },
                    },
                    [_vm._v(_vm._s(_vm.__("customers_list")))]
                  ),
                ]),
              ]
            ),
          ]),
        ]),
      ]),
      _vm._v(" "),
      _c("section", { staticClass: "section" }, [
        _c("div", { staticClass: "figma-main-section-card" }, [
          _c("div", { staticClass: "card-body p-0" }, [
            _c(
              "div",
              {
                staticClass:
                  "d-flex justify-content-between align-items-center flex-wrap gap-2 figma-action-bar-row",
              },
              [
                _c(
                  "div",
                  {
                    staticClass:
                      "d-flex align-items-center gap-2 flex-grow-1 flex-wrap",
                  },
                  [
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
                        attrs: { type: "text", placeholder: _vm.__("search") },
                        domProps: { value: _vm.filter },
                        on: {
                          input: [
                            function ($event) {
                              if ($event.target.composing) {
                                return
                              }
                              _vm.filter = $event.target.value
                            },
                            function ($event) {
                              return _vm.addFilter()
                            },
                          ],
                        },
                      }),
                    ]),
                  ]
                ),
                _vm._v(" "),
                _c(
                  "div",
                  { staticClass: "d-flex gap-2 align-items-center flex-wrap" },
                  [
                    _c(
                      "div",
                      {
                        staticClass: "view-toggle",
                        attrs: { role: "group", "aria-label": _vm.__("view") },
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
                            staticClass: "view-toggle-btn",
                            class: { active: _vm.viewMode === "grid" },
                            attrs: {
                              type: "button",
                              title: _vm.__("grid_view"),
                            },
                            on: {
                              click: function ($event) {
                                return _vm.setViewMode("grid")
                              },
                            },
                          },
                          [_c("i", { staticClass: "bi bi-grid-3x3-gap-fill" })]
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
                            staticClass: "view-toggle-btn",
                            class: { active: _vm.viewMode === "list" },
                            attrs: {
                              type: "button",
                              title: _vm.__("list_view"),
                            },
                            on: {
                              click: function ($event) {
                                return _vm.setViewMode("list")
                              },
                            },
                          },
                          [_c("i", { staticClass: "bi bi-list-ul" })]
                        ),
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
                        staticClass:
                          "btn btn-figma-filter d-flex align-items-center gap-2",
                        attrs: { title: _vm.__("refresh") },
                        on: {
                          click: function ($event) {
                            return _vm.getCustomers()
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
            _vm.viewMode === "grid"
              ? _c("div", [
                  _vm.isLoading
                    ? _c("div", { staticClass: "item-grid-state" }, [
                        _c("i", { staticClass: "bi bi-hourglass-split" }),
                        _vm._v(
                          _vm._s(_vm.__("loading")) +
                            "...\n                            "
                        ),
                      ])
                    : !_vm.gridCustomers.length
                    ? _c(
                        "div",
                        { staticClass: "item-grid-state" },
                        [
                          _vm.filter && _vm.customers.length
                            ? [
                                _c("i", { staticClass: "bi bi-search" }),
                                _vm._v(
                                  _vm._s(
                                    _vm.__("no_records_matching_your_request")
                                  ) + "\n                                "
                                ),
                              ]
                            : [
                                _c("i", { staticClass: "bi bi-inbox" }),
                                _vm._v(
                                  _vm._s(_vm.__("no_records_to_show")) +
                                    "\n                                "
                                ),
                              ],
                        ],
                        2
                      )
                    : _c(
                        "div",
                        { staticClass: "item-grid item-grid--single-xs" },
                        _vm._l(
                          _vm.pagedItems(_vm.gridCustomers),
                          function (item) {
                            return _c(
                              "div",
                              { key: item.id, staticClass: "item-card" },
                              [
                                _c(
                                  "div",
                                  {
                                    staticClass:
                                      "item-card-media item-card-media--avatar",
                                  },
                                  [
                                    _c(
                                      "span",
                                      { staticClass: "item-card-avatar" },
                                      [
                                        _vm._v(
                                          _vm._s(
                                            _vm.initial(item.name || item.email)
                                          )
                                        ),
                                      ]
                                    ),
                                  ]
                                ),
                                _vm._v(" "),
                                _c("div", { staticClass: "item-card-body" }, [
                                  _c(
                                    "div",
                                    { staticClass: "item-card-title" },
                                    [_vm._v(_vm._s(item.name || "-"))]
                                  ),
                                  _vm._v(" "),
                                  item.email
                                    ? _c(
                                        "div",
                                        { staticClass: "item-card-meta" },
                                        [
                                          _c("i", {
                                            staticClass: "bi bi-envelope me-1",
                                          }),
                                          _vm._v(
                                            _vm._s(
                                              _vm._f("emailMask")(item.email)
                                            )
                                          ),
                                        ]
                                      )
                                    : _vm._e(),
                                  _vm._v(" "),
                                  item.mobile
                                    ? _c(
                                        "div",
                                        { staticClass: "item-card-meta" },
                                        [
                                          _c("i", {
                                            staticClass: "bi bi-telephone me-1",
                                          }),
                                          _vm._v(
                                            _vm._s(
                                              _vm._f("mobileMask")(item.mobile)
                                            )
                                          ),
                                        ]
                                      )
                                    : _vm._e(),
                                  _vm._v(" "),
                                  _c(
                                    "div",
                                    {
                                      staticClass:
                                        "item-card-stats justify-content-center",
                                    },
                                    [
                                      _c(
                                        "span",
                                        { staticClass: "item-card-chip" },
                                        [_vm._v("#" + _vm._s(item.id))]
                                      ),
                                      _vm._v(" "),
                                      _c(
                                        "span",
                                        { staticClass: "item-card-chip" },
                                        [
                                          _vm._v(
                                            _vm._s(_vm.__("balance")) +
                                              ": " +
                                              _vm._s(item.balance)
                                          ),
                                        ]
                                      ),
                                      _vm._v(" "),
                                      item.type
                                        ? _c(
                                            "span",
                                            { staticClass: "item-card-chip" },
                                            [
                                              item.type == "phone"
                                                ? _c("img", {
                                                    attrs: {
                                                      src:
                                                        _vm.$baseUrl +
                                                        "/images/phone.svg",
                                                      height: "14",
                                                      alt: "phone",
                                                    },
                                                  })
                                                : _vm._e(),
                                              _vm._v(" "),
                                              item.type == "google"
                                                ? _c("img", {
                                                    attrs: {
                                                      src:
                                                        _vm.$baseUrl +
                                                        "/images/google.svg",
                                                      height: "14",
                                                      alt: "google",
                                                    },
                                                  })
                                                : _vm._e(),
                                              _vm._v(" "),
                                              item.type == "apple"
                                                ? _c("img", {
                                                    attrs: {
                                                      src:
                                                        _vm.$baseUrl +
                                                        "/images/apple.svg",
                                                      height: "14",
                                                      alt: "apple",
                                                    },
                                                  })
                                                : _vm._e(),
                                              _vm._v(" "),
                                              item.type == "email"
                                                ? _c("i", {
                                                    staticClass:
                                                      "fa fa-envelope",
                                                  })
                                                : _vm._e(),
                                              _vm._v(
                                                "\n                                                " +
                                                  _vm._s(item.type) +
                                                  "\n                                            "
                                              ),
                                            ]
                                          )
                                        : _vm._e(),
                                      _vm._v(" "),
                                      item.created_at
                                        ? _c(
                                            "span",
                                            { staticClass: "item-card-chip" },
                                            [
                                              _c("i", {
                                                staticClass: "bi bi-calendar3",
                                              }),
                                              _vm._v(_vm._s(item.created_at)),
                                            ]
                                          )
                                        : _vm._e(),
                                    ]
                                  ),
                                ]),
                                _vm._v(" "),
                                _c("div", { staticClass: "item-card-footer" }, [
                                  _c("div", [
                                    item.status == 1
                                      ? _c(
                                          "span",
                                          { staticClass: "badge bg-success" },
                                          [_vm._v(_vm._s(_vm.__("active")))]
                                        )
                                      : _c(
                                          "span",
                                          { staticClass: "badge bg-danger" },
                                          [_vm._v(_vm._s(_vm.__("deactive")))]
                                        ),
                                  ]),
                                  _vm._v(" "),
                                  _vm.$can("customer_update")
                                    ? _c(
                                        "div",
                                        { staticClass: "item-card-actions" },
                                        [
                                          _c(
                                            "a",
                                            {
                                              directives: [
                                                {
                                                  name: "b-tooltip",
                                                  rawName: "v-b-tooltip.hover",
                                                  modifiers: { hover: true },
                                                },
                                              ],
                                              staticClass: "btn btn-sm px-1",
                                              attrs: {
                                                title: _vm.__("status"),
                                              },
                                              on: {
                                                click: function ($event) {
                                                  _vm.updateStatusCustomer(
                                                    _vm.customers.indexOf(item),
                                                    item.id
                                                  )
                                                },
                                              },
                                            },
                                            [
                                              item.status == 1
                                                ? _c(
                                                    "span",
                                                    {
                                                      staticClass:
                                                        "primary-toggal",
                                                    },
                                                    [
                                                      _c("i", {
                                                        staticClass:
                                                          "fa fa-toggle-on fa-lg",
                                                      }),
                                                    ]
                                                  )
                                                : _c(
                                                    "span",
                                                    {
                                                      staticClass:
                                                        "text-danger",
                                                    },
                                                    [
                                                      _c("i", {
                                                        staticClass:
                                                          "fa fa-toggle-off fa-lg",
                                                      }),
                                                    ]
                                                  ),
                                            ]
                                          ),
                                        ]
                                      )
                                    : _vm._e(),
                                ]),
                              ]
                            )
                          }
                        ),
                        0
                      ),
                ])
              : _c(
                  "div",
                  { staticClass: "table-responsive" },
                  [
                    _c("b-table", {
                      staticClass: "figma-table mb-0",
                      attrs: {
                        items: _vm.customers,
                        fields: _vm.fields,
                        "current-page": _vm.currentPage,
                        "per-page": _vm.perPage,
                        filter: _vm.filter,
                        "filter-included-fields": _vm.filterOn,
                        "sort-by": _vm.sortBy,
                        "sort-desc": _vm.sortDesc,
                        "sort-direction": _vm.sortDirection,
                        bordered: false,
                        busy: _vm.isLoading,
                        stacked: "md",
                        "show-empty": "",
                        small: "",
                        "tbody-tr-class": function () {
                          return "figma-tr align-middle"
                        },
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
                      scopedSlots: _vm._u(
                        [
                          {
                            key: "empty",
                            fn: function (scope) {
                              return [
                                _c(
                                  "div",
                                  {
                                    staticClass: "text-center text-muted py-4",
                                  },
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
                                  {
                                    staticClass: "text-center text-muted py-4",
                                  },
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
                                  {
                                    staticClass: "text-center text-muted my-3",
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
                              ]
                            },
                            proxy: true,
                          },
                          {
                            key: "cell(name)",
                            fn: function (row) {
                              return [
                                _c(
                                  "div",
                                  {
                                    staticClass:
                                      "d-inline-flex align-items-center gap-2",
                                  },
                                  [
                                    _c(
                                      "span",
                                      {
                                        staticClass:
                                          "figma-avatar-42 customer-avatar flex-shrink-0",
                                      },
                                      [
                                        _vm._v(
                                          _vm._s(
                                            (
                                              row.item.name ||
                                              row.item.email ||
                                              "?"
                                            )
                                              .toString()
                                              .charAt(0)
                                              .toUpperCase()
                                          )
                                        ),
                                      ]
                                    ),
                                    _vm._v(" "),
                                    _c(
                                      "span",
                                      {
                                        staticClass:
                                          "font-weight-bold text-start",
                                      },
                                      [_vm._v(_vm._s(row.item.name || "-"))]
                                    ),
                                  ]
                                ),
                              ]
                            },
                          },
                          {
                            key: "cell(email)",
                            fn: function (row) {
                              return [
                                _vm._v(
                                  "\n                                    " +
                                    _vm._s(
                                      _vm._f("emailMask")(row.item.email)
                                    ) +
                                    "\n                                "
                                ),
                              ]
                            },
                          },
                          {
                            key: "cell(mobile)",
                            fn: function (row) {
                              return [
                                _vm._v(
                                  "\n                                    " +
                                    _vm._s(
                                      _vm._f("mobileMask")(row.item.mobile)
                                    ) +
                                    "\n                                "
                                ),
                              ]
                            },
                          },
                          {
                            key: "cell(type)",
                            fn: function (row) {
                              return [
                                row.item.type == "phone"
                                  ? _c("img", {
                                      attrs: {
                                        src: _vm.$baseUrl + "/images/phone.svg",
                                        height: "28",
                                        alt: "phone",
                                      },
                                    })
                                  : _vm._e(),
                                _vm._v(" "),
                                row.item.type == "google"
                                  ? _c("img", {
                                      attrs: {
                                        src:
                                          _vm.$baseUrl + "/images/google.svg",
                                        height: "28",
                                        alt: "google",
                                      },
                                    })
                                  : _vm._e(),
                                _vm._v(" "),
                                row.item.type == "apple"
                                  ? _c("img", {
                                      attrs: {
                                        src: _vm.$baseUrl + "/images/apple.svg",
                                        height: "28",
                                        alt: "apple",
                                      },
                                    })
                                  : _vm._e(),
                                _vm._v(" "),
                                row.item.type == "email"
                                  ? _c("i", {
                                      staticClass:
                                        "fa fa-envelope fa-lg text-muted",
                                      attrs: {
                                        title: _vm.__("email"),
                                        alt: "email",
                                      },
                                    })
                                  : _vm._e(),
                              ]
                            },
                          },
                          {
                            key: "cell(status)",
                            fn: function (row) {
                              return [
                                row.item.status == 1
                                  ? _c(
                                      "span",
                                      { staticClass: "badge bg-success" },
                                      [_vm._v(_vm._s(_vm.__("active")))]
                                    )
                                  : _c(
                                      "span",
                                      { staticClass: "badge bg-danger" },
                                      [_vm._v(_vm._s(_vm.__("deactive")))]
                                    ),
                              ]
                            },
                          },
                          {
                            key: "cell(created_at)",
                            fn: function (row) {
                              return [
                                _vm._v(
                                  "\n                                    " +
                                    _vm._s(row.item.created_at) +
                                    "\n                                "
                                ),
                              ]
                            },
                          },
                          _vm.$can("customer_update")
                            ? {
                                key: "cell(actions)",
                                fn: function (row) {
                                  return [
                                    _c(
                                      "a",
                                      {
                                        staticClass: "btn btn-sm",
                                        on: {
                                          click: function ($event) {
                                            return _vm.updateStatusCustomer(
                                              row.index,
                                              row.item.id
                                            )
                                          },
                                        },
                                      },
                                      [
                                        row.item.status == 1
                                          ? _c(
                                              "span",
                                              { staticClass: "primary-toggal" },
                                              [
                                                _c("i", {
                                                  staticClass:
                                                    "fa fa-toggle-on fa-lg",
                                                }),
                                              ]
                                            )
                                          : _c(
                                              "span",
                                              { staticClass: "text-danger" },
                                              [
                                                _c("i", {
                                                  staticClass:
                                                    "fa fa-toggle-off fa-lg",
                                                }),
                                              ]
                                            ),
                                      ]
                                    ),
                                  ]
                                },
                              }
                            : null,
                        ],
                        null,
                        true
                      ),
                    }),
                  ],
                  1
                ),
            _vm._v(" "),
            _c("div", { staticClass: "figma-table-footer flex-wrap gap-3" }, [
              _c(
                "div",
                { staticClass: "d-flex align-items-center gap-3 flex-wrap" },
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
                      "total-rows": _vm.totalRows,
                    },
                  }),
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
                      "total-rows": _vm.totalRows,
                      "per-page": _vm.perPage,
                      align: "right",
                      "hide-goto-end-buttons": "",
                      "hide-ellipsis": "",
                      "prev-text": "<",
                      "next-text": ">",
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