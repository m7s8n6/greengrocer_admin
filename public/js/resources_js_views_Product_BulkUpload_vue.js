"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_views_Product_BulkUpload_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Product/BulkUpload.vue?vue&type=script&lang=js":
/*!*******************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Product/BulkUpload.vue?vue&type=script&lang=js ***!
  \*******************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
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


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  data: function data() {
    return {
      isLoading: false,
      instructionsFileurl: this.$baseUrl + '/sample-file/products.txt',
      file: null,
      fileError: null,
      rowErrors: [],
      comboCategoryOptions: '',
      comboCategoryId: '0',
      // matches the backend's own placeholder option value (see loadComboCategories)
      comboAttributes: [],
      comboSelectedValues: {} // { [attributeId]: Set of valueIds }
    };
  },
  computed: {
    isSellerRoute: function isSellerRoute() {
      // Use this.$route to access the current route
      return this.$route.path.startsWith('/seller/');
    },
    // Live - recomputes on every checkbox click, same as the Variant Matrix in Add/Edit Product.
    // Only attributes with at least one checked value participate in the combo (mirrors
    // EditProduct.vue's selectedAttributeCombos) - an attribute nobody touched yet is just
    // left out, it does NOT block every other attribute's combos down to zero. A category
    // can have many loosely-related attributes assigned; requiring all of them to be picked
    // would make this unusable.
    comboRows: function comboRows() {
      var _this = this;
      var activeAttributes = this.comboAttributes.map(function (attribute) {
        return {
          attribute: attribute,
          values: attribute.values.filter(function (v) {
            return _this.isComboValueChecked(attribute.id, v.id);
          })
        };
      }).filter(function (entry) {
        return entry.values.length > 0;
      });
      if (!activeAttributes.length) return [];
      var rows = [{
        ids: [],
        labels: []
      }];
      var _iterator = _createForOfIteratorHelper(activeAttributes),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var entry = _step.value;
          var next = [];
          var _iterator2 = _createForOfIteratorHelper(rows),
            _step2;
          try {
            for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
              var row = _step2.value;
              var _iterator3 = _createForOfIteratorHelper(entry.values),
                _step3;
              try {
                for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
                  var value = _step3.value;
                  next.push({
                    ids: [].concat(_toConsumableArray(row.ids), [value.id]),
                    labels: [].concat(_toConsumableArray(row.labels), [entry.attribute.name + '=' + value.value])
                  });
                }
              } catch (err) {
                _iterator3.e(err);
              } finally {
                _iterator3.f();
              }
            }
          } catch (err) {
            _iterator2.e(err);
          } finally {
            _iterator2.f();
          }
          rows = next;
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      return rows.map(function (row) {
        return {
          ids: row.ids.join(','),
          label: row.labels.join(' / ')
        };
      });
    }
  },
  created: function created() {
    this.loadComboCategories();
  },
  mounted: function mounted() {},
  methods: {
    loadComboCategories: function loadComboCategories() {
      var _this2 = this;
      // /categories/options already includes its own "Select Category" placeholder option.
      axios__WEBPACK_IMPORTED_MODULE_0___default().get(this.$apiUrl + '/categories/options').then(function (response) {
        var data = response.data;
        if (typeof data === 'string') {
          _this2.comboCategoryOptions = data;
        } else if (data && typeof data.data === 'string') {
          _this2.comboCategoryOptions = data.data;
        } else {
          _this2.comboCategoryOptions = '';
        }
      })["catch"](function () {
        _this2.comboCategoryOptions = '';
      });
    },
    loadComboAttributes: function loadComboAttributes() {
      var _this3 = this;
      this.comboAttributes = [];
      this.comboSelectedValues = {};
      if (!this.comboCategoryId || this.comboCategoryId === '0') return;
      axios__WEBPACK_IMPORTED_MODULE_0___default().get(this.$apiUrl + '/products/attributes/get', {
        params: {
          category_id: this.comboCategoryId
        }
      }).then(function (response) {
        _this3.comboAttributes = response.data.data || [];
        var selected = {};
        _this3.comboAttributes.forEach(function (attribute) {
          selected[attribute.id] = new Set();
        });
        _this3.comboSelectedValues = selected;
      })["catch"](function () {
        _this3.comboAttributes = [];
      });
    },
    isComboValueChecked: function isComboValueChecked(attributeId, valueId) {
      var selected = this.comboSelectedValues[attributeId];
      return !!selected && selected.has(valueId);
    },
    toggleComboValue: function toggleComboValue(attributeId, valueId) {
      var selected = this.comboSelectedValues[attributeId];
      if (!selected) return;
      if (selected.has(valueId)) {
        selected["delete"](valueId);
      } else {
        selected.add(valueId);
      }
      // Sets aren't reactive - force the computed/template to re-evaluate.
      this.comboSelectedValues = _objectSpread({}, this.comboSelectedValues);
    },
    // Checks every value of every attribute, so the combo table (a live computed property)
    // ends up with the full cross-product - same shortcut as Add/Edit Product's own
    // "Generate All Variants" button.
    selectAllComboValues: function selectAllComboValues() {
      var selected = {};
      this.comboAttributes.forEach(function (attribute) {
        selected[attribute.id] = new Set(attribute.values.map(function (v) {
          return v.id;
        }));
      });
      this.comboSelectedValues = selected;
    },
    copyText: function copyText(text) {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text);
      }
      this.showMessage('success', __('copied_to_clipboard') || 'Copied to clipboard');
    },
    copyAllCombos: function copyAllCombos() {
      this.copyText(this.comboRows.map(function (row) {
        return row.ids;
      }).join('\n'));
    },
    triggerFileClick: function triggerFileClick() {
      var ref = this.$refs.file_csv;
      var input = Array.isArray(ref) ? ref[0] : ref;
      if (input && typeof input.click === 'function') {
        input.click();
      }
    },
    dropFile: function dropFile(event) {
      event.preventDefault();
      var ref = this.$refs.file_csv;
      var input = Array.isArray(ref) ? ref[0] : ref;
      if (!input) return;
      input.files = event.dataTransfer.files;
      this.handleFileUpload();
      event.currentTarget.classList.add('bg-gray-100');
      event.currentTarget.classList.remove('bg-green-300');
    },
    handleFileUpload: function handleFileUpload() {
      var ref = this.$refs.file_csv;
      var input = Array.isArray(ref) ? ref[0] : ref;
      var file = input && input.files ? input.files[0] : null;
      if (!file) return;
      this.fileError = null;
      var validExtensions = ['.xlsx', '.xls'];
      var name = file.name ? file.name.toLowerCase() : '';
      if (!validExtensions.some(function (ext) {
        return name.endsWith(ext);
      })) {
        this.fileError = this.__('invalid_excel_file_type');
        return;
      }
      this.file = file;
      this.rowErrors = [];
    },
    clearForm: function clearForm() {
      var ref = this.$refs.file_csv;
      var input = Array.isArray(ref) ? ref[0] : ref;
      if (input) input.value = null;
      this.file = null;
      this.fileError = null;
      this.rowErrors = [];
    },
    downloadProductDataExcel: function downloadProductDataExcel() {
      var _this4 = this;
      axios__WEBPACK_IMPORTED_MODULE_0___default()({
        url: this.$apiUrl + '/products/download_sample_file_excel',
        method: 'get',
        responseType: 'blob'
      }).then(function (response) {
        var url = window.URL.createObjectURL(new Blob([response.data], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        }));
        var link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'products_sample.xlsx');
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
        window.URL.revokeObjectURL(url);
      })["catch"](function (error) {
        if (error.request && error.request.statusText) {
          _this4.showError(error.request.statusText);
        } else if (error.message) {
          _this4.showError(error.message);
        } else {
          _this4.showError("Something went wrong!");
        }
      });
    },
    saveRecord: function saveRecord() {
      var _this5 = this;
      var vm = this;
      this.isLoading = true;
      var formData = new FormData();
      formData.append('file', this.file);
      var url = this.$apiUrl + '/products/bulk_upload';
      axios__WEBPACK_IMPORTED_MODULE_0___default().post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(function (res) {
        var data = res.data;
        if (data.status === 1) {
          _this5.showMessage("success", data.message);
          _this5.$refs.file_csv.value = null;
          _this5.file = null;
          _this5.rowErrors = [];
          vm.isLoading = false;
        } else {
          if (Array.isArray(data.data) && data.data.length) {
            vm.showError(data.message || 'Validation failed for some rows.');
            vm.rowErrors = data.data;
          } else {
            vm.rowErrors = [{
              row: '—',
              errors: [data.message || 'An unexpected error occurred. Please check your data and try again.']
            }];
          }
          vm.$nextTick(function () {
            if (vm.$refs.rowErrorsAlert && typeof vm.$refs.rowErrorsAlert.scrollIntoView === 'function') {
              vm.$refs.rowErrorsAlert.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
              });
            } else {
              window.scrollTo({
                top: 0,
                behavior: 'smooth'
              });
            }
          });
          vm.isLoading = false;
        }
      })["catch"](function (error) {
        vm.isLoading = false;
        if (error.request.statusText) {
          _this5.showError(error.request.statusText);
        } else if (error.message) {
          _this5.showError(error.message);
        } else {
          _this5.showError("Something went wrong!");
        }
      });
    }
  }
});

/***/ }),

/***/ "./resources/js/views/Product/BulkUpload.vue":
/*!***************************************************!*\
  !*** ./resources/js/views/Product/BulkUpload.vue ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _BulkUpload_vue_vue_type_template_id_2705d0d2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BulkUpload.vue?vue&type=template&id=2705d0d2 */ "./resources/js/views/Product/BulkUpload.vue?vue&type=template&id=2705d0d2");
/* harmony import */ var _BulkUpload_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BulkUpload.vue?vue&type=script&lang=js */ "./resources/js/views/Product/BulkUpload.vue?vue&type=script&lang=js");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _BulkUpload_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _BulkUpload_vue_vue_type_template_id_2705d0d2__WEBPACK_IMPORTED_MODULE_0__.render,
  _BulkUpload_vue_vue_type_template_id_2705d0d2__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/Product/BulkUpload.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/views/Product/BulkUpload.vue?vue&type=script&lang=js":
/*!***************************************************************************!*\
  !*** ./resources/js/views/Product/BulkUpload.vue?vue&type=script&lang=js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_BulkUpload_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./BulkUpload.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Product/BulkUpload.vue?vue&type=script&lang=js");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_BulkUpload_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/Product/BulkUpload.vue?vue&type=template&id=2705d0d2":
/*!*********************************************************************************!*\
  !*** ./resources/js/views/Product/BulkUpload.vue?vue&type=template&id=2705d0d2 ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_BulkUpload_vue_vue_type_template_id_2705d0d2__WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   staticRenderFns: () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_BulkUpload_vue_vue_type_template_id_2705d0d2__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_BulkUpload_vue_vue_type_template_id_2705d0d2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./BulkUpload.vue?vue&type=template&id=2705d0d2 */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Product/BulkUpload.vue?vue&type=template&id=2705d0d2");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Product/BulkUpload.vue?vue&type=template&id=2705d0d2":
/*!************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Product/BulkUpload.vue?vue&type=template&id=2705d0d2 ***!
  \************************************************************************************************************************************************************************************************************************/
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
          { staticClass: "d-flex justify-content-between align-items-center" },
          [
            _c("h3", { staticClass: "modern-page-title mb-0" }, [
              _vm._v(_vm._s(_vm.__("bulk_upload"))),
            ]),
            _vm._v(" "),
            _c("nav", { attrs: { "aria-label": "breadcrumb" } }, [
              _c("ol", { staticClass: "breadcrumb mb-0" }, [
                _vm.isSellerRoute
                  ? _c(
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
                    )
                  : _c(
                      "li",
                      { staticClass: "breadcrumb-item" },
                      [
                        _c(
                          "router-link",
                          {
                            staticClass: "text-muted",
                            attrs: { to: "/dashboard" },
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
                  [
                    _vm._v(
                      _vm._s(_vm.__("bulk_upload")) +
                        "\n                        "
                    ),
                  ]
                ),
              ]),
            ]),
          ]
        ),
      ]),
      _vm._v(" "),
      _c("section", { staticClass: "section" }, [
        _c("div", { staticClass: "figma-main-section-card mb-4" }, [
          _c("div", { staticClass: "card-body p-4" }, [
            _c("h4", { staticClass: "card-title mb-4" }, [
              _vm._v(_vm._s(_vm.__("product_bulk_upload_form"))),
            ]),
            _vm._v(" "),
            _c(
              "div",
              { staticClass: "alert alert-info border-0 rounded-3 p-3 mb-4" },
              [
                _c("div", { staticClass: "d-flex flex-column gap-2" }, [
                  _c("p", { staticClass: "mb-0 fw-bold" }, [
                    _vm._v(
                      _vm._s(
                        _vm.__(
                          "always_download_and_use_new_sample_file_if_you_did_updated_admin_panel_version"
                        )
                      )
                    ),
                  ]),
                  _vm._v(" "),
                  _c("p", { staticClass: "mb-0" }, [
                    _vm._v(
                      _vm._s(
                        _vm.__(
                          "read_and_follow_instructions_carefully_before_proceed"
                        )
                      )
                    ),
                  ]),
                  _vm._v(" "),
                  _c("p", { staticClass: "mb-0" }, [
                    _vm._v(
                      _vm._s(
                        _vm.__(
                          "before_uploading_the_file_please_check_all_the_data_fields_are_correct"
                        )
                      )
                    ),
                  ]),
                ]),
              ]
            ),
            _vm._v(" "),
            _c("div", { staticClass: "figma-main-section-card mb-4 border" }, [
              _c(
                "div",
                { staticClass: "card-body p-4" },
                [
                  _c("h5", { staticClass: "mb-1" }, [
                    _vm._v(
                      _vm._s(
                        _vm.__("variant_combo_generator") ||
                          "Variant Combo Generator"
                      )
                    ),
                  ]),
                  _vm._v(" "),
                  _c("p", { staticClass: "text-muted mb-3" }, [
                    _vm._v(
                      _vm._s(
                        _vm.__("variant_combo_generator_hint") ||
                          "Pick a category, choose attribute values, generate every combo, then copy the Attribute Value IDs column straight into your sheet."
                      )
                    ),
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "form-group mb-3" }, [
                    _c("label", { staticClass: "form-label" }, [
                      _vm._v(_vm._s(_vm.__("category"))),
                    ]),
                    _vm._v(" "),
                    _c("select", {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: _vm.comboCategoryId,
                          expression: "comboCategoryId",
                        },
                      ],
                      staticClass: "form-control form-select",
                      domProps: { innerHTML: _vm._s(_vm.comboCategoryOptions) },
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
                            _vm.comboCategoryId = $event.target.multiple
                              ? $$selectedVal
                              : $$selectedVal[0]
                          },
                          _vm.loadComboAttributes,
                        ],
                      },
                    }),
                  ]),
                  _vm._v(" "),
                  _vm.comboAttributes.length
                    ? [
                        _vm._l(_vm.comboAttributes, function (attribute) {
                          return _c(
                            "div",
                            {
                              key: attribute.id,
                              staticClass: "form-group mb-3",
                            },
                            [
                              _c(
                                "label",
                                { staticClass: "form-label fw-bold" },
                                [_vm._v(_vm._s(attribute.name))]
                              ),
                              _vm._v(" "),
                              _c(
                                "div",
                                { staticClass: "d-flex flex-wrap gap-2" },
                                _vm._l(attribute.values, function (value) {
                                  return _c(
                                    "label",
                                    {
                                      key: value.id,
                                      staticClass: "btn btn-sm",
                                      class: _vm.isComboValueChecked(
                                        attribute.id,
                                        value.id
                                      )
                                        ? "btn-success"
                                        : "btn-outline-success",
                                    },
                                    [
                                      _c("input", {
                                        staticClass: "d-none",
                                        attrs: { type: "checkbox" },
                                        domProps: {
                                          checked: _vm.isComboValueChecked(
                                            attribute.id,
                                            value.id
                                          ),
                                        },
                                        on: {
                                          change: function ($event) {
                                            return _vm.toggleComboValue(
                                              attribute.id,
                                              value.id
                                            )
                                          },
                                        },
                                      }),
                                      _vm._v(
                                        "\n                                            " +
                                          _vm._s(value.value) +
                                          "\n                                        "
                                      ),
                                    ]
                                  )
                                }),
                                0
                              ),
                            ]
                          )
                        }),
                        _vm._v(" "),
                        _c(
                          "div",
                          {
                            staticClass:
                              "alert alert-info d-flex justify-content-between align-items-center",
                          },
                          [
                            _c("span", [
                              _vm._v(
                                _vm._s(
                                  _vm.__("total_variants_to_be_generated") ||
                                    "Total variants to be generated"
                                ) + ": "
                              ),
                              _c("strong", [
                                _vm._v(_vm._s(_vm.comboRows.length)),
                              ]),
                            ]),
                            _vm._v(" "),
                            _c(
                              "button",
                              {
                                staticClass: "btn btn-success",
                                attrs: { type: "button" },
                                on: { click: _vm.selectAllComboValues },
                              },
                              [
                                _c("i", { staticClass: "fa fa-bolt" }),
                                _vm._v(
                                  " " +
                                    _vm._s(
                                      _vm.__("generate_all_variants") ||
                                        "Generate All Variants"
                                    ) +
                                    "\n                                    "
                                ),
                              ]
                            ),
                          ]
                        ),
                      ]
                    : _vm.comboCategoryId && _vm.comboCategoryId !== "0"
                    ? _c("p", { staticClass: "text-muted" }, [
                        _vm._v(
                          _vm._s(
                            _vm.__("no_attributes_assigned_to_this_category") ||
                              "No attributes are assigned to this category."
                          )
                        ),
                      ])
                    : _vm._e(),
                  _vm._v(" "),
                  _vm.comboRows.length
                    ? _c("div", { staticClass: "mt-3" }, [
                        _c(
                          "div",
                          {
                            staticClass:
                              "d-flex justify-content-between align-items-center mb-2",
                          },
                          [
                            _c("h6", { staticClass: "mb-0" }, [
                              _vm._v(
                                _vm._s(
                                  _vm.__("generated_combos") ||
                                    "Generated Combos"
                                )
                              ),
                            ]),
                            _vm._v(" "),
                            _c(
                              "button",
                              {
                                staticClass: "btn btn-sm btn-outline-primary",
                                attrs: { type: "button" },
                                on: { click: _vm.copyAllCombos },
                              },
                              [
                                _c("img", {
                                  attrs: {
                                    src:
                                      _vm.$baseUrl + "/images/icons/copy.svg",
                                    width: "14",
                                    height: "14",
                                    alt: "",
                                  },
                                }),
                                _vm._v(
                                  "\n                                        " +
                                    _vm._s(
                                      _vm.__("copy_all_attribute_value_ids") ||
                                        "Copy All (one per line)"
                                    ) +
                                    "\n                                    "
                                ),
                              ]
                            ),
                          ]
                        ),
                        _vm._v(" "),
                        _c("div", { staticClass: "table-responsive" }, [
                          _c(
                            "table",
                            {
                              staticClass:
                                "table table-sm figma-order-table mb-0",
                            },
                            [
                              _c("thead", [
                                _c("tr", [
                                  _c("th", [
                                    _vm._v(_vm._s(_vm.__("combo") || "Combo")),
                                  ]),
                                  _vm._v(" "),
                                  _c(
                                    "th",
                                    {
                                      staticClass: "text-center",
                                      staticStyle: { width: "160px" },
                                    },
                                    [
                                      _vm._v(
                                        _vm._s(
                                          _vm.__("attribute_value_ids") ||
                                            "Attribute Value IDs"
                                        )
                                      ),
                                    ]
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "th",
                                    {
                                      staticClass: "text-center",
                                      staticStyle: { width: "90px" },
                                    },
                                    [_vm._v(_vm._s(_vm.__("action")))]
                                  ),
                                ]),
                              ]),
                              _vm._v(" "),
                              _c(
                                "tbody",
                                _vm._l(_vm.comboRows, function (row) {
                                  return _c(
                                    "tr",
                                    { key: row.ids, staticClass: "figma-tr" },
                                    [
                                      _c("td", [_vm._v(_vm._s(row.label))]),
                                      _vm._v(" "),
                                      _c("td", { staticClass: "text-center" }, [
                                        _c("code", [_vm._v(_vm._s(row.ids))]),
                                      ]),
                                      _vm._v(" "),
                                      _c("td", { staticClass: "text-center" }, [
                                        _c(
                                          "button",
                                          {
                                            staticClass:
                                              "btn btn-sm btn-outline-secondary",
                                            attrs: { type: "button" },
                                            on: {
                                              click: function ($event) {
                                                return _vm.copyText(row.ids)
                                              },
                                            },
                                          },
                                          [
                                            _c("img", {
                                              attrs: {
                                                src:
                                                  _vm.$baseUrl +
                                                  "/images/icons/copy.svg",
                                                width: "14",
                                                height: "14",
                                                alt: "",
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
                        ]),
                      ])
                    : _vm._e(),
                ],
                2
              ),
            ]),
            _vm._v(" "),
            _vm.rowErrors.length
              ? _c("div", { staticClass: "row" }, [
                  _c("div", { staticClass: "col-12" }, [
                    _c(
                      "div",
                      {
                        ref: "rowErrorsAlert",
                        staticClass: "alert alert-danger",
                      },
                      [
                        _c("p", { staticClass: "mb-2" }, [
                          _vm._v(
                            _vm._s(
                              _vm.__(
                                "validation_failed_for_some_rows_please_review_and_fix_the_following"
                              )
                            )
                          ),
                        ]),
                        _vm._v(" "),
                        _c("div", { staticClass: "table-responsive" }, [
                          _c(
                            "table",
                            { staticClass: "table table-sm table-bordered" },
                            [
                              _c("thead", [
                                _c("tr", [
                                  _c(
                                    "th",
                                    {
                                      staticClass: "text-dark",
                                      staticStyle: { width: "80px" },
                                    },
                                    [_vm._v(_vm._s(_vm.__("row")))]
                                  ),
                                  _vm._v(" "),
                                  _c("th", { staticClass: "text-dark" }, [
                                    _vm._v(_vm._s(_vm.__("errors"))),
                                  ]),
                                ]),
                              ]),
                              _vm._v(" "),
                              _c(
                                "tbody",
                                _vm._l(_vm.rowErrors, function (item) {
                                  return _c("tr", { key: "row-" + item.row }, [
                                    _c("td", { staticClass: "text-dark" }, [
                                      _vm._v(_vm._s(item.row)),
                                    ]),
                                    _vm._v(" "),
                                    _c("td", [
                                      _c(
                                        "ul",
                                        { staticClass: "mb-0 ps-3" },
                                        _vm._l(item.errors, function (err) {
                                          return _c(
                                            "li",
                                            {
                                              key: err,
                                              staticClass: "text-dark",
                                            },
                                            [_vm._v(_vm._s(err))]
                                          )
                                        }),
                                        0
                                      ),
                                    ]),
                                  ])
                                }),
                                0
                              ),
                            ]
                          ),
                        ]),
                      ]
                    ),
                  ]),
                ])
              : _vm._e(),
            _vm._v(" "),
            _c("div", { staticClass: "row" }, [
              _c(
                "form",
                {
                  ref: "my-form",
                  attrs: { method: "post", enctype: "multipart/form-data" },
                  on: {
                    submit: function ($event) {
                      $event.preventDefault()
                      return _vm.saveRecord.apply(null, arguments)
                    },
                  },
                },
                [
                  _c("div", { staticClass: "col-md-12" }, [
                    _c("div", { staticClass: "form-group" }, [
                      _c("label", { attrs: { for: "upload_file" } }, [
                        _vm._v(
                          _vm._s(_vm.__("upload_file")) +
                            " " +
                            _vm._s(_vm.__("excel_file"))
                        ),
                      ]),
                      _vm._v(" "),
                      _c("p", { staticClass: "text-muted mb-1" }, [
                        _vm._v(
                          "\n                                        " +
                            _vm._s(_vm.__("supported_formats")) +
                            ": XLSX, XLS\n                                    "
                        ),
                      ]),
                      _vm._v(" "),
                      _vm.fileError
                        ? _c("span", { staticClass: "error" }, [
                            _vm._v(_vm._s(_vm.fileError)),
                          ])
                        : _vm._e(),
                      _vm._v(" "),
                      _c("input", {
                        ref: "file_csv",
                        staticClass: "file-input",
                        attrs: {
                          type: "file",
                          name: "upload_file",
                          id: "upload_file",
                          accept: ".xlsx,.xls",
                        },
                        on: { change: _vm.handleFileUpload },
                      }),
                      _vm._v(" "),
                      _c(
                        "div",
                        {
                          staticClass: "file-input-div bg-gray-100",
                          on: {
                            click: _vm.triggerFileClick,
                            drop: _vm.dropFile,
                            dragover: _vm.$dragoverFile,
                            dragleave: _vm.$dragleaveFile,
                          },
                        },
                        [
                          _vm.file && _vm.file.name
                            ? [
                                _c("label", [
                                  _vm._v(
                                    _vm._s(_vm.__("selected_file_name")) +
                                      " " +
                                      _vm._s(_vm.file.name)
                                  ),
                                ]),
                              ]
                            : [
                                _vm._m(0),
                                _vm._v(" "),
                                _c("label", [
                                  _vm._v(
                                    _vm._s(
                                      _vm.__(
                                        "drop_files_here_or_click_to_upload"
                                      )
                                    )
                                  ),
                                ]),
                              ],
                        ],
                        2
                      ),
                    ]),
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "col-md-12" }, [
                    _c(
                      "button",
                      {
                        staticClass: "btn btn-primary",
                        attrs: {
                          type: "submit",
                          id: "submit_btn",
                          name: "btnAdd",
                          disabled: _vm.isLoading,
                        },
                      },
                      [
                        !_vm.isLoading
                          ? _c("i", { staticClass: "fa fa-upload" })
                          : _vm._e(),
                        _vm._v(
                          " " +
                            _vm._s(_vm.__("upload")) +
                            "\n                                    "
                        ),
                        _vm.isLoading
                          ? _c("b-spinner", {
                              attrs: { small: "", label: "Spinning" },
                            })
                          : _vm._e(),
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _c(
                      "button",
                      {
                        staticClass: "btn btn btn-secondary",
                        attrs: { type: "button" },
                        on: { click: _vm.clearForm },
                      },
                      [
                        _c("i", {
                          staticClass: "fa fa-undo",
                          attrs: { "aria-hidden": "true" },
                        }),
                        _vm._v(
                          " " +
                            _vm._s(_vm.__("clear")) +
                            "\n                                "
                        ),
                      ]
                    ),
                    _vm._v(" "),
                    _c(
                      "button",
                      {
                        staticClass: "btn btn-info",
                        attrs: { type: "button" },
                        on: { click: _vm.downloadProductDataExcel },
                      },
                      [
                        _c("em", { staticClass: "fa fa-download" }),
                        _vm._v(
                          "\n                                    " +
                            _vm._s(_vm.__("download_sample_file"))
                        ),
                      ]
                    ),
                    _vm._v(" "),
                    _c(
                      "a",
                      {
                        staticClass: "btn btn-warning",
                        attrs: { href: _vm.instructionsFileurl, download: "" },
                      },
                      [
                        _c("em", { staticClass: "fa fa-download" }),
                        _vm._v(
                          "\n                                    " +
                            _vm._s(_vm.__("download_instructions"))
                        ),
                      ]
                    ),
                  ]),
                ]
              ),
            ]),
          ]),
        ]),
      ]),
    ]),
  ])
}
var staticRenderFns = [
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("label", [
      _c("i", { staticClass: "fa fa-cloud-upload-alt fa-2x" }),
    ])
  },
]
render._withStripped = true



/***/ })

}]);