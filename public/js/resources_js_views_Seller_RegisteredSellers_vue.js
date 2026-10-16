"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_views_Seller_RegisteredSellers_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Seller/RegisteredSellers.vue?vue&type=script&lang=js":
/*!*************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Seller/RegisteredSellers.vue?vue&type=script&lang=js ***!
  \*************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  data: function data() {
    return {
      fields: [{
        key: 'id',
        label: __('id'),
        sortable: true,
        sortDirection: 'desc'
      }, {
        key: 'seller_info',
        label: __('seller_info'),
        "class": 'text-legt',
        sortable: true,
        sortDirection: 'desc'
      }, {
        key: 'store_info',
        label: __('seller_info'),
        "class": 'text-left',
        sortable: true,
        sortDirection: 'desc'
      }, {
        key: 'categories_array',
        label: __('category'),
        "class": 'text-center',
        sortable: true,
        sortDirection: 'desc'
      }, {
        key: 'city.formatted_address',
        label: __('city'),
        "class": 'text-center',
        sortable: true,
        sortDirection: 'desc'
      }, {
        key: 'logo',
        label: __('logo'),
        "class": 'text-center',
        sortable: true,
        sortDirection: 'desc'
      }, {
        key: 'other_info',
        label: __('other_info'),
        "class": 'text-left',
        sortable: true,
        sortDirection: 'desc'
      }, {
        key: 'commission',
        label: __('commission'),
        "class": 'text-center',
        sortable: true,
        sortDirection: 'desc'
      }, {
        key: 'created_at',
        label: __('date'),
        "class": 'text-center',
        sortable: true,
        sortDirection: 'desc'
      }, {
        key: 'status',
        label: __('status'),
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
      filterStatus: 0,
      currentLanguageId: null,
      activeLanguages: []
    };
  },
  computed: {
    translatedRecords: function translatedRecords() {
      var _this = this;
      if (!this.currentLanguageId || !Array.isArray(this.records)) {
        return this.records;
      }
      return this.records.map(function (seller) {
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
    pageEnd: function pageEnd() {
      return Math.min(this.currentPage * this.perPage, this.totalRows);
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
  methods: {
    escapeHtml: function escapeHtml(value) {
      var div = document.createElement('div');
      div.textContent = value !== null && value !== void 0 ? value : '';
      return div.innerHTML;
    },
    kvTableHtml: function kvTableHtml(title, rows) {
      var _this3 = this;
      var rowsHtml = rows.map(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
          label = _ref2[0],
          value = _ref2[1];
        return "<tr><th>".concat(_this3.escapeHtml(label), "</th><td> : ").concat(_this3.escapeHtml(value), "</td></tr>");
      }).join('');
      return "<div class=\"text-start\"><strong>".concat(this.escapeHtml(title), "</strong>") + "<table class=\"table table-borderless mb-0\">".concat(rowsHtml, "</table></div>");
    },
    sellerInfoHtml: function sellerInfoHtml(item) {
      return this.kvTableHtml(__('sellr_details'), [[__('name'), item.name], [__('email'), item.email], [__('mobile'), item.mobile]]);
    },
    storeInfoHtml: function storeInfoHtml(item) {
      return this.kvTableHtml(__('store_details'), [[__('name'), item.store_name], [__('url'), item.store_url], [__('description'), this.strip_tags(item.store_description)]]);
    },
    otherInfoHtml: function otherInfoHtml(item) {
      var table = this.kvTableHtml(__('store_details'), [[__('tax_name'), item.tax_name], [__('tax_no'), item.tax_number], [__('pan_no'), item.pan_number]]);
      var links = [];
      if (item.national_identity_card_url) {
        links.push("<a target=\"_blank\" href=\"".concat(this.escapeHtml(item.national_identity_card_url), "\" class=\"badge bg-success d-inline-flex align-items-center gap-1 mt-1\">").concat(this.escapeHtml(__('national_identity_card')), "</a>"));
      }
      if (item.address_proof_url) {
        links.push("<a target=\"_blank\" href=\"".concat(this.escapeHtml(item.address_proof_url), "\" class=\"badge bg-success d-inline-flex align-items-center gap-1 mt-1\">").concat(this.escapeHtml(__('address_proof')), "</a>"));
      }
      return table + links.join('<br>');
    },
    fetchActiveLanguages: function fetchActiveLanguages() {
      var _this4 = this;
      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee() {
        var res, appLocale, currentLang, def;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return axios.get(_this4.$apiUrl + '/active_languages');
              case 3:
                res = _context.sent;
                if (res.data.status === 1 && Array.isArray(res.data.data)) {
                  _this4.activeLanguages = res.data.data;
                  appLocale = window.appLocale || 'en';
                  currentLang = _this4.activeLanguages.find(function (l) {
                    return l.code === appLocale;
                  });
                  if (currentLang) {
                    _this4.currentLanguageId = currentLang.id;
                  } else {
                    def = _this4.activeLanguages.find(function (l) {
                      return l.is_default === 1;
                    });
                    if (def) _this4.currentLanguageId = def.id;
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
    strip_tags: function strip_tags(input) {
      return input.replace(/<\/?[^>]+(>|$)/g, "");
    },
    getRecords: function getRecords() {
      var _this5 = this;
      this.isLoading = true;
      axios.get(this.$apiUrl + '/sellers', {
        params: {
          filterStatus: this.filterStatus,
          search: this.filter
        }
      }).then(function (response) {
        _this5.isLoading = false;
        var data = response.data;
        _this5.records = data.data;
        _this5.totalRows = _this5.records.length;
      });
    },
    updateStatus: function updateStatus(index, id, selectedStatus) {
      var _this6 = this;
      this.$swal.fire({
        title: __('are_you_sure'),
        text: __('you_want_be_able_to_revert_this'),
        confirmButtonText: __('yes_sure'),
        cancelButtonText: __('cancel'),
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#37a279',
        cancelButtonColor: '#d33'
      }).then( /*#__PURE__*/function () {
        var _ref3 = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee2(result) {
          var remarks, _yield$_this6$$swal$f, text, postData;
          return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  if (!result.value) {
                    _context2.next = 9;
                    break;
                  }
                  remarks = "";
                  if (!(selectedStatus === 2)) {
                    _context2.next = 8;
                    break;
                  }
                  _context2.next = 5;
                  return _this6.$swal.fire({
                    title: __('remarks'),
                    input: 'textarea',
                    /*inputLabel: 'Remarks',*/
                    inputPlaceholder: 'Type your remarks here...',
                    inputAttributes: {
                      'aria-label': 'Type your remarks here'
                    },
                    confirmButtonText: "Submit",
                    cancelButtonText: "Cancel",
                    showCancelButton: true,
                    inputValidator: function inputValidator(value) {
                      return new Promise(function (resolve) {
                        if (value !== '') {
                          resolve();
                        } else {
                          resolve('The Remarks field is required');
                        }
                      });
                    }
                  });
                case 5:
                  _yield$_this6$$swal$f = _context2.sent;
                  text = _yield$_this6$$swal$f.value;
                  if (text) {
                    remarks = text;
                  }
                case 8:
                  if (selectedStatus === 1 || selectedStatus === 2 && remarks !== "") {
                    _this6.isLoading = true;
                    postData = {
                      id: id,
                      status: selectedStatus,
                      remark: remarks
                    };
                    axios.post(_this6.$apiUrl + '/sellers/update_status', postData).then(function (response) {
                      _this6.isLoading = false;
                      var data = response.data;
                      _this6.getRecords();
                      _this6.showMessage('success', data.message);
                    });
                  }
                case 9:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2);
        }));
        return function (_x) {
          return _ref3.apply(this, arguments);
        };
      }());
    },
    deleteSeller: function deleteSeller(index, id) {
      var _this7 = this;
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
          _this7.isLoading = true;
          var postData = {
            id: id
          };
          axios.post(_this7.$apiUrl + '/sellers/delete', postData).then(function (response) {
            _this7.isLoading = false;
            var data = response.data;
            _this7.records.splice(index, 1);
            _this7.showSuccess(data.message);
          });
        }
      });
    }
  }
});

/***/ }),

/***/ "./resources/js/views/Seller/RegisteredSellers.vue":
/*!*********************************************************!*\
  !*** ./resources/js/views/Seller/RegisteredSellers.vue ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _RegisteredSellers_vue_vue_type_template_id_9bfccb3e__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./RegisteredSellers.vue?vue&type=template&id=9bfccb3e */ "./resources/js/views/Seller/RegisteredSellers.vue?vue&type=template&id=9bfccb3e");
/* harmony import */ var _RegisteredSellers_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./RegisteredSellers.vue?vue&type=script&lang=js */ "./resources/js/views/Seller/RegisteredSellers.vue?vue&type=script&lang=js");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _RegisteredSellers_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _RegisteredSellers_vue_vue_type_template_id_9bfccb3e__WEBPACK_IMPORTED_MODULE_0__.render,
  _RegisteredSellers_vue_vue_type_template_id_9bfccb3e__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/Seller/RegisteredSellers.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/views/Seller/RegisteredSellers.vue?vue&type=script&lang=js":
/*!*********************************************************************************!*\
  !*** ./resources/js/views/Seller/RegisteredSellers.vue?vue&type=script&lang=js ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_RegisteredSellers_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./RegisteredSellers.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Seller/RegisteredSellers.vue?vue&type=script&lang=js");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_RegisteredSellers_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/Seller/RegisteredSellers.vue?vue&type=template&id=9bfccb3e":
/*!***************************************************************************************!*\
  !*** ./resources/js/views/Seller/RegisteredSellers.vue?vue&type=template&id=9bfccb3e ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_RegisteredSellers_vue_vue_type_template_id_9bfccb3e__WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   staticRenderFns: () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_RegisteredSellers_vue_vue_type_template_id_9bfccb3e__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_RegisteredSellers_vue_vue_type_template_id_9bfccb3e__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./RegisteredSellers.vue?vue&type=template&id=9bfccb3e */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Seller/RegisteredSellers.vue?vue&type=template&id=9bfccb3e");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Seller/RegisteredSellers.vue?vue&type=template&id=9bfccb3e":
/*!******************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Seller/RegisteredSellers.vue?vue&type=template&id=9bfccb3e ***!
  \******************************************************************************************************************************************************************************************************************************/
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
      _c(
        "div",
        {
          staticClass:
            "page-heading d-flex justify-content-between align-items-center mb-4",
        },
        [
          _c("h3", { staticClass: "modern-page-title mb-0" }, [
            _vm._v(_vm._s(_vm.__("seller_requests"))),
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
                [
                  _vm._v(
                    _vm._s(_vm.__("seller_requests")) + "\n                    "
                  ),
                ]
              ),
            ]),
          ]),
        ]
      ),
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
                            value: _vm.filter,
                            expression: "filter",
                          },
                        ],
                        staticClass: "figma-search-input",
                        attrs: {
                          type: "text",
                          placeholder: _vm.__("search") || "Search...",
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
                            function ($event) {
                              return _vm.getRecords()
                            },
                          ],
                        },
                      }),
                    ]),
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "d-flex gap-2" }, [
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
                        _c("span", [
                          _vm._v(_vm._s(_vm.__("refresh") || "Refresh")),
                        ]),
                      ]
                    ),
                  ]),
                ]
              ),
              _vm._v(" "),
              _c(
                "b-row",
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
                        key: "table-busy",
                        fn: function () {
                          return [
                            _c(
                              "div",
                              { staticClass: "text-center text-black my-2" },
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
                        key: "cell(email)",
                        fn: function (row) {
                          return [
                            _vm._v(
                              "\n                                " +
                                _vm._s(_vm._f("emailMask")(row.item.email)) +
                                "\n                            "
                            ),
                          ]
                        },
                      },
                      {
                        key: "cell(mobile)",
                        fn: function (row) {
                          return [
                            _vm._v(
                              "\n                                " +
                                _vm._s(_vm._f("mobileMask")(row.item.mobile)) +
                                "\n                            "
                            ),
                          ]
                        },
                      },
                      {
                        key: "cell(seller_info)",
                        fn: function (row) {
                          return [
                            _c(
                              "small",
                              {
                                directives: [
                                  {
                                    name: "b-tooltip",
                                    rawName: "v-b-tooltip.hover",
                                    value: {
                                      html: true,
                                      title: _vm.sellerInfoHtml(row.item),
                                      boundary: "window",
                                    },
                                    expression:
                                      "{ html: true, title: sellerInfoHtml(row.item), boundary: 'window' }",
                                    modifiers: { hover: true },
                                  },
                                ],
                                staticClass:
                                  "d-inline-flex mb-3 px-2 py-1 text-muted bg-secondary bg-opacity-10 border border-secondary border-opacity-10 rounded-2",
                              },
                              [_c("i", { staticClass: "fa fa-info-circle" })]
                            ),
                            _vm._v(
                              "\n                                " +
                                _vm._s(row.item.name) +
                                "\n                            "
                            ),
                          ]
                        },
                      },
                      {
                        key: "cell(store_info)",
                        fn: function (row) {
                          return [
                            _c(
                              "small",
                              {
                                directives: [
                                  {
                                    name: "b-tooltip",
                                    rawName: "v-b-tooltip.hover",
                                    value: {
                                      html: true,
                                      title: _vm.storeInfoHtml(row.item),
                                      boundary: "window",
                                    },
                                    expression:
                                      "{ html: true, title: storeInfoHtml(row.item), boundary: 'window' }",
                                    modifiers: { hover: true },
                                  },
                                ],
                                staticClass:
                                  "d-inline-flex mb-3 px-2 py-1 text-muted bg-secondary bg-opacity-10 border border-secondary border-opacity-10 rounded-2",
                              },
                              [_c("i", { staticClass: "fa fa-info-circle" })]
                            ),
                            _vm._v(
                              "\n                                " +
                                _vm._s(row.item.store_name) +
                                "\n                            "
                            ),
                          ]
                        },
                      },
                      {
                        key: "cell(other_info)",
                        fn: function (row) {
                          return [
                            _c(
                              "small",
                              {
                                directives: [
                                  {
                                    name: "b-tooltip",
                                    rawName: "v-b-tooltip.hover",
                                    value: {
                                      html: true,
                                      title: _vm.otherInfoHtml(row.item),
                                      boundary: "window",
                                    },
                                    expression:
                                      "{ html: true, title: otherInfoHtml(row.item), boundary: 'window' }",
                                    modifiers: { hover: true },
                                  },
                                ],
                                staticClass:
                                  "d-inline-flex mb-3 px-2 py-1 text-muted bg-secondary bg-opacity-10 border border-secondary border-opacity-10 rounded-2",
                              },
                              [_c("i", { staticClass: "fa fa-info-circle" })]
                            ),
                            _vm._v(
                              "\n                                " +
                                _vm._s(row.item.store_name) +
                                "\n                            "
                            ),
                          ]
                        },
                      },
                      {
                        key: "cell(logo)",
                        fn: function (row) {
                          return [
                            !row.item.logo
                              ? _c("span", [_vm._v(_vm._s(_vm.__("no_image")))])
                              : _c("img", {
                                  attrs: {
                                    src: _vm.$storageUrl + row.item.logo,
                                    height: "50",
                                  },
                                }),
                          ]
                        },
                      },
                      {
                        key: "cell(created_at)",
                        fn: function (row) {
                          return [
                            _vm._v(
                              "\n                                " +
                                _vm._s(row.item.created_at) +
                                "\n                            "
                            ),
                          ]
                        },
                      },
                      {
                        key: "cell(status)",
                        fn: function (row) {
                          return [
                            row.item.status == 0
                              ? _c(
                                  "label",
                                  { staticClass: "badge bg-primary" },
                                  [_vm._v(_vm._s(_vm.__("registered")))]
                                )
                              : row.item.status == 1
                              ? _c(
                                  "label",
                                  { staticClass: "badge bg-success" },
                                  [_vm._v(_vm._s(_vm.__("approved")))]
                                )
                              : row.item.status == 2
                              ? _c(
                                  "label",
                                  { staticClass: "badge bg-warning" },
                                  [_vm._v(_vm._s(_vm.__("reject")))]
                                )
                              : row.item.status == 3
                              ? _c(
                                  "label",
                                  { staticClass: "badge bg-danger" },
                                  [_vm._v(_vm._s(_vm.__("deactive")))]
                                )
                              : row.item.status == 7
                              ? _c(
                                  "label",
                                  { staticClass: "badge bg-danger" },
                                  [_vm._v(_vm._s(_vm.__("removed")))]
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
                                  "label",
                                  { staticClass: "badge bg-success" },
                                  [_vm._v(_vm._s(_vm.__("yes")))]
                                )
                              : row.item.require_products_approval == 0
                              ? _c(
                                  "label",
                                  { staticClass: "badge bg-danger" },
                                  [_vm._v(_vm._s(_vm.__("no")))]
                                )
                              : _vm._e(),
                          ]
                        },
                      },
                      {
                        key: "cell(actions)",
                        fn: function (row) {
                          return [
                            _c("div", { staticClass: "d-flex gap-2" }, [
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
                                      staticClass: "figma-action-btn",
                                      attrs: {
                                        type: "button",
                                        title: _vm.__("approve"),
                                      },
                                      on: {
                                        click: function ($event) {
                                          return _vm.updateStatus(
                                            row.index,
                                            row.item.id,
                                            1
                                          )
                                        },
                                      },
                                    },
                                    [
                                      _c("base-icon", {
                                        attrs: {
                                          name: "CheckCircle",
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
                                      attrs: {
                                        type: "button",
                                        title: _vm.__("reject"),
                                      },
                                      on: {
                                        click: function ($event) {
                                          return _vm.updateStatus(
                                            row.index,
                                            row.item.id,
                                            2
                                          )
                                        },
                                      },
                                    },
                                    [
                                      _c("base-icon", {
                                        attrs: {
                                          name: "XCircle",
                                          width: "24",
                                          height: "24",
                                        },
                                      }),
                                    ],
                                    1
                                  )
                                : _vm._e(),
                            ]),
                          ]
                        },
                      },
                    ]),
                  }),
                ],
                1
              ),
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "div",
            { staticClass: "figma-table-footer" },
            [
              _c("div", { staticClass: "showing-results-text" }, [
                _vm._v(
                  "\n                        " +
                    _vm._s(_vm.__("Showing Result")) +
                    " : "
                ),
                _c("span", { staticClass: "showing-bold" }, [
                  _vm._v(_vm._s(_vm.pageEnd)),
                ]),
                _vm._v(" " + _vm._s(_vm.__("of") || "of") + " "),
                _c("span", { staticClass: "showing-bold" }, [
                  _vm._v(_vm._s(_vm.totalRows)),
                ]),
              ]),
              _vm._v(" "),
              _c("b-pagination", {
                staticClass: "figma-pagination mb-0",
                attrs: {
                  "total-rows": _vm.totalRows,
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
      ]),
    ]),
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ })

}]);