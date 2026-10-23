"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_views_Dashboard_ProductInfo_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Dashboard/ProductInfo.vue?vue&type=script&lang=js":
/*!**********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Dashboard/ProductInfo.vue?vue&type=script&lang=js ***!
  \**********************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
      category: "",
      fields: [{
        key: 'product_variant_id',
        label: __('id'),
        sortable: true,
        sortDirection: 'desc'
      }, {
        key: 'product_id',
        label: __('product_id'),
        sortable: true,
        sortDirection: 'desc'
      }, {
        key: 'seller_name',
        label: __('seller_name'),
        sortable: true
      }, {
        key: 'name',
        label: __('name'),
        sortable: true
      }, {
        key: 'image',
        label: __('image'),
        "class": 'text-center'
      }, {
        key: 'price',
        label: __('price'),
        sortable: true
      }, {
        key: 'discounted_price',
        label: __('discounted_price'),
        sortable: true
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
      isLoading: false,
      products: null,
      categories: null,
      type: null
    };
  },
  created: function created() {
    if (!this.$can('product_list')) {
      this.showError("You do not have permission to view this page.");
      this.$router.back();
    }
    this.type = this.$route.params.type;
    if (this.type) {
      this.getProducts();
    }
  },
  methods: {
    getProducts: function getProducts() {
      var _this = this;
      this.isLoading = true;
      var param = {
        "category": this.category,
        "type": this.type
      };
      axios__WEBPACK_IMPORTED_MODULE_0___default().get(this.$apiUrl + '/products/product_info', {
        params: param
      }).then(function (response) {
        _this.isLoading = false;
        _this.categories = response.data.data.categories;
        _this.products = response.data.data.products;
        _this.totalRows = _this.products.length;
      });
    },
    deleteRecord: function deleteRecord(index, id) {
      var _this2 = this;
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
          _this2.isLoading = true;
          var postData = {
            id: id
          };
          axios__WEBPACK_IMPORTED_MODULE_0___default().post(_this2.$apiUrl + '/products/delete', postData).then(function (response) {
            _this2.isLoading = false;
            var data = response.data;
            _this2.products.splice(index, 1);
            _this2.showSuccess(data.message);
          });
        }
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Dashboard/ProductInfo.vue?vue&type=style&index=0&id=82f18ada&scoped=true&lang=css":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Dashboard/ProductInfo.vue?vue&type=style&index=0&id=82f18ada&scoped=true&lang=css ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
___CSS_LOADER_EXPORT___.push([module.id, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n/* Category filter sits next to the search field in the list toolbar */\n.category-filter[data-v-82f18ada] {\n    width: auto;\n    min-width: 180px;\n    max-width: 260px;\n    height: 38px;\n    font-size: 13px;\n}\n@media (max-width: 575.98px) {\n.category-filter[data-v-82f18ada] {\n        max-width: none;\n        width: 100%;\n}\n}\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Dashboard/ProductInfo.vue?vue&type=style&index=0&id=82f18ada&scoped=true&lang=css":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Dashboard/ProductInfo.vue?vue&type=style&index=0&id=82f18ada&scoped=true&lang=css ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ProductInfo_vue_vue_type_style_index_0_id_82f18ada_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./ProductInfo.vue?vue&type=style&index=0&id=82f18ada&scoped=true&lang=css */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Dashboard/ProductInfo.vue?vue&type=style&index=0&id=82f18ada&scoped=true&lang=css");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ProductInfo_vue_vue_type_style_index_0_id_82f18ada_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ProductInfo_vue_vue_type_style_index_0_id_82f18ada_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./resources/js/views/Dashboard/ProductInfo.vue":
/*!******************************************************!*\
  !*** ./resources/js/views/Dashboard/ProductInfo.vue ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ProductInfo_vue_vue_type_template_id_82f18ada_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ProductInfo.vue?vue&type=template&id=82f18ada&scoped=true */ "./resources/js/views/Dashboard/ProductInfo.vue?vue&type=template&id=82f18ada&scoped=true");
/* harmony import */ var _ProductInfo_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ProductInfo.vue?vue&type=script&lang=js */ "./resources/js/views/Dashboard/ProductInfo.vue?vue&type=script&lang=js");
/* harmony import */ var _ProductInfo_vue_vue_type_style_index_0_id_82f18ada_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ProductInfo.vue?vue&type=style&index=0&id=82f18ada&scoped=true&lang=css */ "./resources/js/views/Dashboard/ProductInfo.vue?vue&type=style&index=0&id=82f18ada&scoped=true&lang=css");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _ProductInfo_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _ProductInfo_vue_vue_type_template_id_82f18ada_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render,
  _ProductInfo_vue_vue_type_template_id_82f18ada_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "82f18ada",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/Dashboard/ProductInfo.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/views/Dashboard/ProductInfo.vue?vue&type=script&lang=js":
/*!******************************************************************************!*\
  !*** ./resources/js/views/Dashboard/ProductInfo.vue?vue&type=script&lang=js ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ProductInfo_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./ProductInfo.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Dashboard/ProductInfo.vue?vue&type=script&lang=js");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ProductInfo_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/Dashboard/ProductInfo.vue?vue&type=style&index=0&id=82f18ada&scoped=true&lang=css":
/*!**************************************************************************************************************!*\
  !*** ./resources/js/views/Dashboard/ProductInfo.vue?vue&type=style&index=0&id=82f18ada&scoped=true&lang=css ***!
  \**************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ProductInfo_vue_vue_type_style_index_0_id_82f18ada_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/style-loader/dist/cjs.js!../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./ProductInfo.vue?vue&type=style&index=0&id=82f18ada&scoped=true&lang=css */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Dashboard/ProductInfo.vue?vue&type=style&index=0&id=82f18ada&scoped=true&lang=css");


/***/ }),

/***/ "./resources/js/views/Dashboard/ProductInfo.vue?vue&type=template&id=82f18ada&scoped=true":
/*!************************************************************************************************!*\
  !*** ./resources/js/views/Dashboard/ProductInfo.vue?vue&type=template&id=82f18ada&scoped=true ***!
  \************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ProductInfo_vue_vue_type_template_id_82f18ada_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   staticRenderFns: () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ProductInfo_vue_vue_type_template_id_82f18ada_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ProductInfo_vue_vue_type_template_id_82f18ada_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./ProductInfo.vue?vue&type=template&id=82f18ada&scoped=true */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Dashboard/ProductInfo.vue?vue&type=template&id=82f18ada&scoped=true");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Dashboard/ProductInfo.vue?vue&type=template&id=82f18ada&scoped=true":
/*!***************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Dashboard/ProductInfo.vue?vue&type=template&id=82f18ada&scoped=true ***!
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
    _c("div", { staticClass: "page-heading" }, [
      _c("div", { staticClass: "page-title" }, [
        _c("div", { staticClass: "row" }, [
          _c("div", { staticClass: "col-12 col-md-6 order-md-1 order-last" }, [
            _vm.type === "sold_out"
              ? _c("h3", [_vm._v(_vm._s(_vm.__("sold_out_products")))])
              : _vm._e(),
            _vm._v(" "),
            _vm.type === "low_stock"
              ? _c("h3", [_vm._v(_vm._s(_vm.__("low_stock_products")))])
              : _vm._e(),
            _vm._v(" "),
            _vm.type === "packet_products"
              ? _c("h3", [_vm._v(_vm._s(_vm.__("packet_products")))])
              : _vm._e(),
            _vm._v(" "),
            _vm.type === "loose_products"
              ? _c("h3", [_vm._v(_vm._s(_vm.__("loose_products")))])
              : _vm._e(),
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "col-12 col-md-6 order-md-2 order-first" }, [
            _c(
              "nav",
              {
                staticClass: "breadcrumb-header float-start float-lg-end",
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
                  _vm.type === "sold_out"
                    ? _c(
                        "li",
                        {
                          staticClass: "breadcrumb-item active",
                          attrs: { "aria-current": "page" },
                        },
                        [_vm._v(_vm._s(_vm.__("sold_out_products")))]
                      )
                    : _vm._e(),
                  _vm._v(" "),
                  _vm.type === "low_stock"
                    ? _c(
                        "li",
                        {
                          staticClass: "breadcrumb-item active",
                          attrs: { "aria-current": "page" },
                        },
                        [_vm._v(_vm._s(_vm.__("low_stock_products")))]
                      )
                    : _vm._e(),
                  _vm._v(" "),
                  _vm.type === "packet_products"
                    ? _c(
                        "li",
                        {
                          staticClass: "breadcrumb-item active",
                          attrs: { "aria-current": "page" },
                        },
                        [_vm._v(_vm._s(_vm.__("packet_products")))]
                      )
                    : _vm._e(),
                  _vm._v(" "),
                  _vm.type === "loose_products"
                    ? _c(
                        "li",
                        {
                          staticClass: "breadcrumb-item active",
                          attrs: { "aria-current": "page" },
                        },
                        [
                          _vm._v(
                            "\n                                    " +
                              _vm._s(_vm.__("loose_products"))
                          ),
                        ]
                      )
                    : _vm._e(),
                ]),
              ]
            ),
          ]),
        ]),
      ]),
      _vm._v(" "),
      _c("section", { staticClass: "section" }, [
        _c("div", { staticClass: "card figma-main-section-card" }, [
          _c(
            "div",
            {
              staticClass:
                "card-header d-flex align-items-center justify-content-between flex-wrap gap-2",
            },
            [
              _vm.type === "sold_out"
                ? _c("h4", { staticClass: "card-title mb-0" }, [
                    _vm._v(_vm._s(_vm.__("sold_out_products_list"))),
                  ])
                : _vm._e(),
              _vm._v(" "),
              _vm.type === "low_stock"
                ? _c("h4", { staticClass: "card-title mb-0" }, [
                    _vm._v(_vm._s(_vm.__("low_stock_products_list"))),
                  ])
                : _vm._e(),
              _vm._v(" "),
              _vm.type === "packet_products"
                ? _c("h4", { staticClass: "card-title mb-0" }, [
                    _vm._v(
                      _vm._s(_vm.__("packet_stock_products_list")) +
                        "\n                        "
                    ),
                  ])
                : _vm._e(),
              _vm._v(" "),
              _vm.type === "loose_products"
                ? _c("h4", { staticClass: "card-title mb-0" }, [
                    _vm._v(
                      _vm._s(_vm.__("loose_stock_products_list")) +
                        "\n                        "
                    ),
                  ])
                : _vm._e(),
              _vm._v(" "),
              _vm.$can("product_create")
                ? _c(
                    "router-link",
                    {
                      staticClass:
                        "btn btn-figma-filter d-flex align-items-center gap-2",
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
          ),
          _vm._v(" "),
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
                    _c(
                      "div",
                      { staticClass: "figma-search-container flex-grow-1" },
                      [
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
                            id: "filter-input",
                            type: "search",
                            placeholder: _vm.__("search"),
                          },
                          domProps: { value: _vm.filter },
                          on: {
                            input: function ($event) {
                              if ($event.target.composing) {
                                return
                              }
                              _vm.filter = $event.target.value
                            },
                          },
                        }),
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
                            value: _vm.category,
                            expression: "category",
                          },
                        ],
                        staticClass: "form-control form-select category-filter",
                        attrs: {
                          name: "category",
                          id: "category",
                          "aria-label": _vm.__("category"),
                        },
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
                              _vm.category = $event.target.multiple
                                ? $$selectedVal
                                : $$selectedVal[0]
                            },
                            function ($event) {
                              return _vm.getProducts()
                            },
                          ],
                        },
                      },
                      [
                        _c("option", { attrs: { value: "" } }, [
                          _vm._v(_vm._s(_vm.__("all_categories"))),
                        ]),
                        _vm._v(" "),
                        _vm._l(_vm.categories, function (category) {
                          return _c(
                            "option",
                            { domProps: { value: category.id } },
                            [
                              _vm._v(
                                "\n                                        " +
                                  _vm._s(category.name) +
                                  "\n                                    "
                              ),
                            ]
                          )
                        }),
                      ],
                      2
                    ),
                  ]
                ),
                _vm._v(" "),
                _c("div", { staticClass: "d-flex gap-2 align-items-center" }, [
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
                        "btn btn-figma-filter d-flex align-items-center gap-2 btn_refresh",
                      attrs: { title: _vm.__("refresh") },
                      on: {
                        click: function ($event) {
                          return _vm.getProducts()
                        },
                      },
                    },
                    [
                      _c("i", {
                        staticClass: "fa fa-refresh",
                        attrs: { "aria-hidden": "true" },
                      }),
                      _vm._v(" "),
                      _c("span", [_vm._v(_vm._s(_vm.__("refresh")))]),
                    ]
                  ),
                ]),
              ]
            ),
            _vm._v(" "),
            _c(
              "div",
              { staticClass: "table-responsive" },
              [
                _c("b-table", {
                  staticClass: "figma-table mb-0",
                  attrs: {
                    items: _vm.products,
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
                                staticClass: "fa fa-search fa-2x d-block mb-2",
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
                            { staticClass: "text-center text-muted my-3" },
                            [
                              _c("b-spinner", { staticClass: "align-middle" }),
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
                      key: "cell(seller_name)",
                      fn: function (row) {
                        return [
                          _vm._v(
                            "\n                                    " +
                              _vm._s(row.item.seller_name) +
                              "\n                                "
                          ),
                        ]
                      },
                    },
                    {
                      key: "cell(image)",
                      fn: function (row) {
                        return [
                          row.item.image
                            ? _c("img", {
                                attrs: {
                                  src: _vm.$storageUrl + row.item.image,
                                  height: "44",
                                  width: "44",
                                },
                              })
                            : _vm._e(),
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
                                      name: "ViewProduct",
                                      params: {
                                        id: row.item.id,
                                        record: row.item,
                                      },
                                    },
                                    title: _vm.__("view"),
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
                              _vm._v(" "),
                              _vm.$can("product_update")
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
                                          name: "EditProduct",
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
                              _vm.$can("product_delete")
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
                                          return _vm.deleteRecord(
                                            row.index,
                                            row.item.product_variant_id
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
                      {
                        staticClass: "showing-results-text small mb-0",
                        attrs: { for: "per-page-select" },
                      },
                      [_vm._v(_vm._s(_vm.__("per_page")))]
                    ),
                    _vm._v(" "),
                    _c("b-form-select", {
                      staticClass: "form-select w-auto",
                      attrs: {
                        id: "per-page-select",
                        options: _vm.pageOptions,
                        size: "sm",
                      },
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
                        "total-rows": _vm.totalRows,
                      },
                    }),
                  ],
                  1
                ),
                _vm._v(" "),
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
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ })

}]);