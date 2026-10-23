"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_views_Seller_Sellers_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Seller/Sellers.vue?vue&type=script&lang=js":
/*!***************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Seller/Sellers.vue?vue&type=script&lang=js ***!
  \***************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _mixins_ViewModeMixin__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../mixins/ViewModeMixin */ "./resources/js/mixins/ViewModeMixin.js");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
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


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  mixins: [_mixins_ViewModeMixin__WEBPACK_IMPORTED_MODULE_1__["default"]],
  data: function data() {
    return {
      fields: [{
        key: 'id',
        label: __('id'),
        sortable: true,
        sortDirection: 'desc'
      }, {
        key: 'name',
        label: __('name'),
        sortable: true,
        sortDirection: 'desc'
      }, {
        key: 'store_name',
        label: __('store_name'),
        sortable: true,
        sortDirection: 'desc'
      }, {
        key: 'email',
        label: __('email'),
        sortable: true,
        sortDirection: 'desc'
      }, {
        key: 'mobile',
        label: __('mobile'),
        sortable: true,
        sortDirection: 'desc'
      }, {
        key: 'balance',
        label: __('balance'),
        sortable: true,
        sortDirection: 'desc'
      }, {
        key: 'logo',
        label: __('logo'),
        "class": 'text-center',
        sortable: true,
        sortDirection: 'desc'
      }, {
        key: 'commission',
        label: __('commission'),
        sortable: true,
        sortDirection: 'desc'
      }, {
        key: 'categories_array',
        label: __('categories'),
        sortable: true,
        sortDirection: 'desc'
      }, {
        key: 'status',
        label: __('status'),
        sortable: true,
        sortDirection: 'desc'
      }, {
        key: 'availability',
        label: __('availability'),
        "class": 'text-center',
        sortable: true,
        sortDirection: 'desc'
      }, {
        key: 'require_products_approval',
        label: __('require_products_approval'),
        "class": 'text-center',
        sortable: true,
        sortDirection: 'desc'
      }, {
        key: 'actions',
        label: __('actions')
      }],
      totalRows: 1,
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
      records: [],
      filterStatus: "",
      showFilters: false,
      currentLanguageId: null,
      activeLanguages: []
    };
  },
  computed: {
    translatedRecords: function translatedRecords() {
      var _this = this;
      var records = this.records || [];
      // Hide sellers with status 0 (Registered) from the list
      records = records.filter(function (s) {
        return s.status !== 0 && s.status !== '0';
      });
      if (!this.currentLanguageId || !Array.isArray(records)) {
        return records;
      }
      return records.map(function (seller) {
        var translatedSeller = _objectSpread({}, seller);
        if (seller.translations && Array.isArray(seller.translations)) {
          var translation = seller.translations.find(function (t) {
            return t.language_id === _this.currentLanguageId;
          });
          if (translation) {
            if (translation.name && translation.name.trim() !== '') {
              translatedSeller.name = translation.name;
            }
            if (translation.store_name && translation.store_name.trim() !== '') {
              translatedSeller.store_name = translation.store_name;
            }
          }
        }
        return translatedSeller;
      });
    },
    // Grid view: same records and order as the table (search / status filter are server side).
    gridRecords: function gridRecords() {
      return this.gridSort(this.translatedRecords);
    },
    pageEnd: function pageEnd() {
      return Math.min(this.currentPage * this.perPage, this.translatedRecords.length);
    }
  },
  created: function created() {
    var _this2 = this;
    this.category_id = this.$route.params.id;
    this.$eventBus.$on('recordSaved', function (message) {
      _this2.showMessage('success', message);
      _this2.getRecords();
    });
    this.fetchActiveLanguages().then(function () {
      _this2.getRecords();
    });
  },
  watch: {
    perPage: function perPage() {
      this.currentPage = 1;
    }
  },
  methods: {
    // Grid view: same order as the b-table (its sortBy / sortDesc are synced from the list view headers).
    // Position of a card's record in this.records (the delete handler splices that array).
    fullIndex: function fullIndex(item) {
      return this.records.findIndex(function (r) {
        return r.id === item.id;
      });
    },
    fetchActiveLanguages: function fetchActiveLanguages() {
      var _this3 = this;
      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee() {
        var res, appLocale, currentLang, def;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return axios.get(_this3.$apiUrl + '/active_languages');
              case 3:
                res = _context.sent;
                if (res.data.status === 1 && Array.isArray(res.data.data)) {
                  _this3.activeLanguages = res.data.data;
                  appLocale = window.appLocale || 'en';
                  currentLang = _this3.activeLanguages.find(function (l) {
                    return l.code === appLocale;
                  });
                  if (currentLang) {
                    _this3.currentLanguageId = currentLang.id;
                  } else {
                    def = _this3.activeLanguages.find(function (l) {
                      return l.is_default === 1;
                    });
                    if (def) _this3.currentLanguageId = def.id;
                  }
                }
                _context.next = 10;
                break;
              case 7:
                _context.prev = 7;
                _context.t0 = _context["catch"](0);
                console.error('Language load failed', _context.t0);
              case 10:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 7]]);
      }))();
    },
    getRecords: function getRecords() {
      var _this4 = this;
      this.isLoading = true;
      axios.get(this.$apiUrl + '/sellers', {
        params: {
          filterStatus: this.filterStatus,
          search: this.filter
        }
      }).then(function (response) {
        _this4.isLoading = false;
        var data = response.data;
        _this4.records = data.data;
        _this4.totalRows = _this4.records.length;
      });
    },
    updateStatusSeller: function updateStatusSeller(index, id, status) {
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
          var newStatus = status === 1 ? 3 : 1;
          var postData = {
            id: id,
            status: newStatus
          };
          axios.post(_this5.$apiUrl + '/sellers/update_status', postData).then(function (response) {
            _this5.isLoading = false;
            _this5.getRecords();
            _this5.showMessage("success", response.data.message);
          });
        }
      });
    },
    deleteSeller: function deleteSeller(index, id) {
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
          axios.post(_this6.$apiUrl + '/sellers/delete', postData).then(function (response) {
            _this6.isLoading = false;
            var data = response.data;
            _this6.records.splice(index, 1);
            _this6.showMessage('success', data.message);
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

/***/ "./resources/js/views/Seller/Sellers.vue":
/*!***********************************************!*\
  !*** ./resources/js/views/Seller/Sellers.vue ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Sellers_vue_vue_type_template_id_3712b1fa__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Sellers.vue?vue&type=template&id=3712b1fa */ "./resources/js/views/Seller/Sellers.vue?vue&type=template&id=3712b1fa");
/* harmony import */ var _Sellers_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Sellers.vue?vue&type=script&lang=js */ "./resources/js/views/Seller/Sellers.vue?vue&type=script&lang=js");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Sellers_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _Sellers_vue_vue_type_template_id_3712b1fa__WEBPACK_IMPORTED_MODULE_0__.render,
  _Sellers_vue_vue_type_template_id_3712b1fa__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/Seller/Sellers.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/views/Seller/Sellers.vue?vue&type=script&lang=js":
/*!***********************************************************************!*\
  !*** ./resources/js/views/Seller/Sellers.vue?vue&type=script&lang=js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Sellers_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Sellers.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Seller/Sellers.vue?vue&type=script&lang=js");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Sellers_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/Seller/Sellers.vue?vue&type=template&id=3712b1fa":
/*!*****************************************************************************!*\
  !*** ./resources/js/views/Seller/Sellers.vue?vue&type=template&id=3712b1fa ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Sellers_vue_vue_type_template_id_3712b1fa__WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   staticRenderFns: () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Sellers_vue_vue_type_template_id_3712b1fa__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Sellers_vue_vue_type_template_id_3712b1fa__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Sellers.vue?vue&type=template&id=3712b1fa */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Seller/Sellers.vue?vue&type=template&id=3712b1fa");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Seller/Sellers.vue?vue&type=template&id=3712b1fa":
/*!********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Seller/Sellers.vue?vue&type=template&id=3712b1fa ***!
  \********************************************************************************************************************************************************************************************************************/
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
  return _c("div", { staticClass: "sellers-page-container" }, [
    _c(
      "div",
      {
        staticClass:
          "page-heading d-flex justify-content-between align-items-center mb-4",
      },
      [
        _c("h3", { staticClass: "modern-page-title mb-0" }, [
          _vm._v(_vm._s(_vm.__("manage_sellers"))),
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
              [_vm._v(_vm._s(_vm.__("sellers")))]
            ),
          ]),
        ]),
      ]
    ),
    _vm._v(" "),
    _c("div", { staticClass: "page-content" }, [
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
                              return _vm.getRecords()
                            },
                          ],
                        },
                      }),
                    ]),
                  ]),
                  _vm._v(" "),
                  _c(
                    "div",
                    { staticClass: "d-flex gap-2 flex-wrap" },
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
                        "div",
                        {
                          staticClass: "view-toggle",
                          attrs: {
                            role: "group",
                            "aria-label": _vm.__("view"),
                          },
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
                            [
                              _c("i", {
                                staticClass: "bi bi-grid-3x3-gap-fill",
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
                              return _vm.getRecords()
                            },
                          },
                        },
                        [
                          _c("i", { staticClass: "fa fa-refresh" }),
                          _vm._v(" "),
                          _c("span", [_vm._v(_vm._s(_vm.__("refresh")))]),
                        ]
                      ),
                      _vm._v(" "),
                      _vm.$can("seller_create")
                        ? _c(
                            "router-link",
                            {
                              staticClass:
                                "btn btn-figma-filter d-flex align-items-center gap-2",
                              attrs: { to: "/sellers/create" },
                            },
                            [
                              _c("i", { staticClass: "fa fa-plus" }),
                              _vm._v(" "),
                              _c("span", [
                                _vm._v(_vm._s(_vm.__("add_seller"))),
                              ]),
                            ]
                          )
                        : _vm._e(),
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
                                  value: _vm.filterStatus,
                                  expression: "filterStatus",
                                },
                              ],
                              staticClass:
                                "form-control form-select modern-select",
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
                                    _vm.filterStatus = $event.target.multiple
                                      ? $$selectedVal
                                      : $$selectedVal[0]
                                  },
                                  function ($event) {
                                    return _vm.getRecords()
                                  },
                                ],
                              },
                            },
                            [
                              _c("option", { attrs: { value: "" } }, [
                                _vm._v(_vm._s(_vm.__("all"))),
                              ]),
                              _vm._v(" "),
                              _c("option", { attrs: { value: "1" } }, [
                                _vm._v(_vm._s(_vm.__("approve"))),
                              ]),
                              _vm._v(" "),
                              _c("option", { attrs: { value: "2" } }, [
                                _vm._v(_vm._s(_vm.__("not_approved"))),
                              ]),
                              _vm._v(" "),
                              _c("option", { attrs: { value: "3" } }, [
                                _vm._v(_vm._s(_vm.__("deactivate"))),
                              ]),
                              _vm._v(" "),
                              _c("option", { attrs: { value: "4" } }, [
                                _vm._v(_vm._s(_vm.__("blocked"))),
                              ]),
                            ]
                          ),
                        ]),
                      ]),
                    ]),
                  ]),
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
                      : !_vm.gridRecords.length
                      ? _c("div", { staticClass: "item-grid-state" }, [
                          _c("i", { staticClass: "bi bi-inbox" }),
                          _vm._v(
                            _vm._s(_vm.__("no_records_to_show")) +
                              "\n                            "
                          ),
                        ])
                      : _c(
                          "div",
                          { staticClass: "item-grid item-grid--single-xs" },
                          _vm._l(
                            _vm.pagedItems(_vm.gridRecords),
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
                                      item.logo
                                        ? _c("img", {
                                            attrs: {
                                              src: _vm.$storageUrl + item.logo,
                                              alt: item.store_name || item.name,
                                            },
                                          })
                                        : _c(
                                            "span",
                                            { staticClass: "item-card-avatar" },
                                            [
                                              _vm._v(
                                                _vm._s(_vm.initial(item.name))
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
                                      [_vm._v(_vm._s(item.name))]
                                    ),
                                    _vm._v(" "),
                                    item.store_name
                                      ? _c(
                                          "div",
                                          { staticClass: "item-card-meta" },
                                          [
                                            _c("i", {
                                              staticClass: "bi bi-shop me-1",
                                            }),
                                            _vm._v(_vm._s(item.store_name)),
                                          ]
                                        )
                                      : _vm._e(),
                                    _vm._v(" "),
                                    _c(
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
                                    ),
                                    _vm._v(" "),
                                    _c(
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
                                    ),
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
                                        _c(
                                          "span",
                                          { staticClass: "item-card-chip" },
                                          [
                                            _vm._v(
                                              _vm._s(_vm.__("commission")) +
                                                ": " +
                                                _vm._s(item.commission)
                                            ),
                                          ]
                                        ),
                                        _vm._v(" "),
                                        _c(
                                          "span",
                                          {
                                            directives: [
                                              {
                                                name: "b-tooltip",
                                                rawName: "v-b-tooltip.hover",
                                                modifiers: { hover: true },
                                              },
                                            ],
                                            staticClass: "item-card-chip",
                                            staticStyle: { cursor: "pointer" },
                                            attrs: {
                                              title: item.categories_array,
                                            },
                                          },
                                          [
                                            _c("i", {
                                              staticClass: "fa fa-info-circle",
                                            }),
                                            _vm._v(
                                              _vm._s(_vm.__("categories"))
                                            ),
                                          ]
                                        ),
                                        _vm._v(" "),
                                        item.require_products_approval == 1 ||
                                        item.require_products_approval == 0
                                          ? _c(
                                              "span",
                                              { staticClass: "item-card-chip" },
                                              [
                                                _vm._v(
                                                  "\n                                                " +
                                                    _vm._s(
                                                      _vm.__(
                                                        "require_products_approval"
                                                      )
                                                    ) +
                                                    ":\n                                                " +
                                                    _vm._s(
                                                      item.require_products_approval ==
                                                        1
                                                        ? _vm.__("yes")
                                                        : _vm.__("no")
                                                    )
                                                ),
                                              ]
                                            )
                                          : _vm._e(),
                                      ]
                                    ),
                                  ]),
                                  _vm._v(" "),
                                  _c(
                                    "div",
                                    { staticClass: "item-card-footer" },
                                    [
                                      _c(
                                        "div",
                                        {
                                          staticClass:
                                            "d-flex align-items-center gap-1 flex-wrap",
                                        },
                                        [
                                          item.status == 1
                                            ? _c(
                                                "span",
                                                {
                                                  staticClass:
                                                    "figma-status-pill status-delivered",
                                                },
                                                [
                                                  _vm._v(
                                                    _vm._s(_vm.__("approved"))
                                                  ),
                                                ]
                                              )
                                            : item.status == 2
                                            ? _c(
                                                "span",
                                                {
                                                  staticClass:
                                                    "figma-status-pill status-pending",
                                                },
                                                [
                                                  _vm._v(
                                                    _vm._s(
                                                      _vm.__("not_approved")
                                                    )
                                                  ),
                                                ]
                                              )
                                            : item.status == 3
                                            ? _c(
                                                "span",
                                                {
                                                  staticClass:
                                                    "figma-status-pill status-cancelled",
                                                },
                                                [
                                                  _vm._v(
                                                    _vm._s(_vm.__("deactive"))
                                                  ),
                                                ]
                                              )
                                            : item.status == 4
                                            ? _c(
                                                "span",
                                                {
                                                  staticClass:
                                                    "figma-status-pill badge bg-dark",
                                                },
                                                [
                                                  _vm._v(
                                                    _vm._s(_vm.__("blocked"))
                                                  ),
                                                ]
                                              )
                                            : _vm._e(),
                                          _vm._v(" "),
                                          _vm.$can("seller_update") &&
                                          (item.status == 1 || item.status == 3)
                                            ? _c(
                                                "span",
                                                {
                                                  directives: [
                                                    {
                                                      name: "b-tooltip",
                                                      rawName:
                                                        "v-b-tooltip.hover",
                                                      modifiers: {
                                                        hover: true,
                                                      },
                                                    },
                                                  ],
                                                  staticClass:
                                                    "figma-hover-light",
                                                  attrs: {
                                                    title:
                                                      _vm.__("availability"),
                                                  },
                                                  on: {
                                                    click: function ($event) {
                                                      _vm.updateStatusSeller(
                                                        _vm.fullIndex(item),
                                                        item.id,
                                                        item.status
                                                      )
                                                    },
                                                  },
                                                },
                                                [
                                                  _c(
                                                    "a",
                                                    {
                                                      staticClass:
                                                        "btn btn-sm px-1",
                                                      class:
                                                        item.status == 1
                                                          ? "text-success"
                                                          : "text-danger",
                                                    },
                                                    [
                                                      _c("i", {
                                                        staticClass: "fa fs-5",
                                                        class:
                                                          item.status == 1
                                                            ? "fa-toggle-on"
                                                            : "fa-toggle-off",
                                                      }),
                                                    ]
                                                  ),
                                                ]
                                              )
                                            : _vm._e(),
                                        ]
                                      ),
                                      _vm._v(" "),
                                      _c(
                                        "div",
                                        { staticClass: "item-card-actions" },
                                        [
                                          _vm.$can("seller_update")
                                            ? _c(
                                                "router-link",
                                                {
                                                  directives: [
                                                    {
                                                      name: "b-tooltip",
                                                      rawName:
                                                        "v-b-tooltip.hover",
                                                      modifiers: {
                                                        hover: true,
                                                      },
                                                    },
                                                  ],
                                                  staticClass:
                                                    "figma-action-btn",
                                                  attrs: {
                                                    to: {
                                                      name: "EditSeller",
                                                      params: {
                                                        id: item.id,
                                                        record: item,
                                                      },
                                                    },
                                                    title: _vm.__("edit"),
                                                  },
                                                },
                                                [
                                                  _c("base-icon", {
                                                    attrs: {
                                                      name: "edit icon",
                                                      hoverName: "edit Hover",
                                                      width: "24",
                                                      height: "24",
                                                    },
                                                  }),
                                                ],
                                                1
                                              )
                                            : _vm._e(),
                                          _vm._v(" "),
                                          _vm.$can("seller_delete")
                                            ? _c(
                                                "button",
                                                {
                                                  directives: [
                                                    {
                                                      name: "b-tooltip",
                                                      rawName:
                                                        "v-b-tooltip.hover",
                                                      modifiers: {
                                                        hover: true,
                                                      },
                                                    },
                                                  ],
                                                  staticClass:
                                                    "figma-action-btn figma-delete-btn",
                                                  attrs: {
                                                    title: _vm.__("delete"),
                                                  },
                                                  on: {
                                                    click: function ($event) {
                                                      _vm.deleteSeller(
                                                        _vm.fullIndex(item),
                                                        item.id
                                                      )
                                                    },
                                                  },
                                                },
                                                [
                                                  _c("base-icon", {
                                                    attrs: {
                                                      name: "Type=Default",
                                                      hoverName: "Type=Hover",
                                                      width: "24",
                                                      height: "24",
                                                    },
                                                  }),
                                                ],
                                                1
                                              )
                                            : _vm._e(),
                                        ],
                                        1
                                      ),
                                    ]
                                  ),
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
                        staticClass: "figma-order-table mb-0",
                        attrs: {
                          items: _vm.translatedRecords,
                          fields: _vm.fields,
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
                            key: "cell(email)",
                            fn: function (row) {
                              return [
                                _c(
                                  "span",
                                  { staticClass: "figma-text-muted" },
                                  [
                                    _vm._v(
                                      _vm._s(
                                        _vm._f("emailMask")(row.item.email)
                                      )
                                    ),
                                  ]
                                ),
                              ]
                            },
                          },
                          {
                            key: "cell(mobile)",
                            fn: function (row) {
                              return [
                                _c(
                                  "span",
                                  { staticClass: "figma-text-muted" },
                                  [
                                    _vm._v(
                                      _vm._s(
                                        _vm._f("mobileMask")(row.item.mobile)
                                      )
                                    ),
                                  ]
                                ),
                              ]
                            },
                          },
                          {
                            key: "cell(logo)",
                            fn: function (row) {
                              return [
                                _c("img", {
                                  staticClass: "rounded-3 border",
                                  attrs: {
                                    src: row.item.logo
                                      ? _vm.$storageUrl + row.item.logo
                                      : _vm.$placeholderImage,
                                    height: "40",
                                    width: "40",
                                  },
                                }),
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
                                      {
                                        staticClass:
                                          "figma-status-pill status-delivered",
                                      },
                                      [_vm._v(_vm._s(_vm.__("approved")))]
                                    )
                                  : row.item.status == 2
                                  ? _c(
                                      "span",
                                      {
                                        staticClass:
                                          "figma-status-pill status-pending",
                                      },
                                      [_vm._v(_vm._s(_vm.__("not_approved")))]
                                    )
                                  : row.item.status == 3
                                  ? _c(
                                      "span",
                                      {
                                        staticClass:
                                          "figma-status-pill status-cancelled",
                                      },
                                      [_vm._v(_vm._s(_vm.__("deactive")))]
                                    )
                                  : row.item.status == 4
                                  ? _c(
                                      "span",
                                      {
                                        staticClass:
                                          "figma-status-pill badge bg-dark",
                                      },
                                      [_vm._v(_vm._s(_vm.__("blocked")))]
                                    )
                                  : _vm._e(),
                              ]
                            },
                          },
                          {
                            key: "cell(require_products_approval)",
                            fn: function (row) {
                              return [
                                row.item.require_products_approval == 1
                                  ? _c(
                                      "span",
                                      {
                                        staticClass:
                                          "figma-status-pill status-delivered",
                                      },
                                      [_vm._v(_vm._s(_vm.__("yes")))]
                                    )
                                  : row.item.require_products_approval == 0
                                  ? _c(
                                      "span",
                                      {
                                        staticClass:
                                          "figma-status-pill status-cancelled",
                                      },
                                      [_vm._v(_vm._s(_vm.__("no")))]
                                    )
                                  : _vm._e(),
                              ]
                            },
                          },
                          {
                            key: "cell(availability)",
                            fn: function (row) {
                              return [
                                _vm.$can("seller_update")
                                  ? _c(
                                      "span",
                                      {
                                        staticClass: "figma-hover-light",
                                        on: {
                                          click: function ($event) {
                                            _vm.updateStatusSeller(
                                              _vm.fullIndex(row.item),
                                              row.item.id,
                                              row.item.status
                                            )
                                          },
                                        },
                                      },
                                      [
                                        row.item.status == 1
                                          ? _c(
                                              "span",
                                              { staticClass: "text-success" },
                                              [
                                                _c(
                                                  "a",
                                                  { staticClass: "btn btn-sm" },
                                                  [
                                                    _c("i", {
                                                      staticClass:
                                                        "fa fa-toggle-on fs-5",
                                                    }),
                                                  ]
                                                ),
                                              ]
                                            )
                                          : _vm._e(),
                                        _vm._v(" "),
                                        row.item.status == 3
                                          ? _c(
                                              "span",
                                              { staticClass: "text-danger" },
                                              [
                                                _c(
                                                  "a",
                                                  { staticClass: "btn btn-sm" },
                                                  [
                                                    _c("i", {
                                                      staticClass:
                                                        "fa fa-toggle-off fs-5",
                                                    }),
                                                  ]
                                                ),
                                              ]
                                            )
                                          : _vm._e(),
                                      ]
                                    )
                                  : _vm._e(),
                              ]
                            },
                          },
                          {
                            key: "cell(categories_array)",
                            fn: function (row) {
                              return [
                                _c(
                                  "div",
                                  {
                                    staticClass:
                                      "d-flex align-items-center gap-2",
                                  },
                                  [
                                    _c(
                                      "small",
                                      {
                                        directives: [
                                          {
                                            name: "b-tooltip",
                                            rawName: "v-b-tooltip.hover",
                                            modifiers: { hover: true },
                                          },
                                        ],
                                        staticClass:
                                          "d-inline-flex px-2 py-1 text-muted bg-secondary bg-opacity-10 rounded-2",
                                        staticStyle: { cursor: "pointer" },
                                        attrs: {
                                          title: row.item.categories_array,
                                        },
                                      },
                                      [
                                        _c("i", {
                                          staticClass: "fa fa-info-circle",
                                        }),
                                      ]
                                    ),
                                    _vm._v(" "),
                                    _c("span", { staticClass: "fw-bold" }, [
                                      _vm._v(_vm._s(row.item.bonus_percentage)),
                                    ]),
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
                                    _vm.$can("seller_update")
                                      ? _c(
                                          "router-link",
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
                                              to: {
                                                name: "EditSeller",
                                                params: {
                                                  id: row.item.id,
                                                  record: row.item,
                                                },
                                              },
                                              title: _vm.__("edit"),
                                            },
                                          },
                                          [
                                            _c("base-icon", {
                                              attrs: {
                                                name: "edit icon",
                                                hoverName: "edit Hover",
                                                width: "24",
                                                height: "24",
                                              },
                                            }),
                                          ],
                                          1
                                        )
                                      : _vm._e(),
                                    _vm._v(" "),
                                    _vm.$can("seller_delete")
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
                                              "figma-action-btn figma-delete-btn",
                                            attrs: { title: _vm.__("delete") },
                                            on: {
                                              click: function ($event) {
                                                _vm.deleteSeller(
                                                  _vm.fullIndex(row.item),
                                                  row.item.id
                                                )
                                              },
                                            },
                                          },
                                          [
                                            _c("base-icon", {
                                              attrs: {
                                                name: "Type=Default",
                                                hoverName: "Type=Hover",
                                                width: "24",
                                                height: "24",
                                              },
                                            }),
                                          ],
                                          1
                                        )
                                      : _vm._e(),
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
                { staticClass: "figma-table-footer flex-wrap gap-3" },
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
                      _vm._v(" "),
                      _c("table-count", {
                        attrs: {
                          "current-page": _vm.currentPage,
                          "per-page": _vm.perPage,
                          "total-rows": _vm.translatedRecords.length,
                        },
                      }),
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c("b-pagination", {
                    staticClass: "figma-pagination mb-0",
                    attrs: {
                      "total-rows": _vm.translatedRecords.length,
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