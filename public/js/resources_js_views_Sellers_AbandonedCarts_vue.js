"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_views_Sellers_AbandonedCarts_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Sellers/AbandonedCarts.vue?vue&type=script&lang=js":
/*!***********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Sellers/AbandonedCarts.vue?vue&type=script&lang=js ***!
  \***********************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
        sortable: true
      }, {
        key: 'user_name',
        label: __('user'),
        sortable: true
      }, {
        key: 'product_name',
        label: __('product'),
        sortable: true
      }, {
        key: 'variant_name',
        label: __('variant'),
        sortable: true
      }, {
        key: 'qty',
        label: __('quantity'),
        sortable: true
      }, {
        key: 'created_at',
        label: __('added_on'),
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
      carts: [],
      isLoading: false
    };
  },
  computed: {
    pageEnd: function pageEnd() {
      return Math.min(this.currentPage * this.perPage, this.totalRows);
    }
  },
  mounted: function mounted() {
    this.totalRows = this.carts.length;
  },
  created: function created() {
    this.getCarts();
  },
  methods: {
    addFilter: function addFilter() {
      // Vue-tables-2 handles local filtering, but if it was server side we'd re-fetch here
    },
    getCarts: function getCarts() {
      var _this = this;
      this.isLoading = true;
      // We pass limit=1000 so the backend fetches all and we handle pagination locally like customers API does
      axios.get(this.$apiUrl + '/seller/carts?limit=1000').then(function (response) {
        _this.isLoading = false;
        _this.carts = response.data.data;
        _this.totalRows = _this.carts.length;
      })["catch"](function (error) {
        _this.isLoading = false;
        _this.showError(__('something_went_wrong'));
      });
    },
    deleteCart: function deleteCart(index, id) {
      var _this2 = this;
      this.$swal.fire({
        title: "Are you Sure?",
        text: "You want be able to revert this",
        confirmButtonText: "Yes, Sure",
        cancelButtonText: "Cancel",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: 'var(--theme-primary-500)',
        cancelButtonColor: 'var(--theme-error-500)'
      }).then(function (result) {
        if (result.value) {
          _this2.isLoading = true;
          axios["delete"](_this2.$apiUrl + '/seller/carts/' + id).then(function (response) {
            if (response.data.status) {
              _this2.showMessage("success", response.data.message);
              _this2.getCarts();
            } else {
              _this2.showError(response.data.message);
            }
            _this2.isLoading = false;
          })["catch"](function (error) {
            _this2.isLoading = false;
            _this2.showError(__('something_went_wrong'));
          });
        }
      });
    }
  }
});

/***/ }),

/***/ "./resources/js/views/Sellers/AbandonedCarts.vue":
/*!*******************************************************!*\
  !*** ./resources/js/views/Sellers/AbandonedCarts.vue ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _AbandonedCarts_vue_vue_type_template_id_794ac579__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AbandonedCarts.vue?vue&type=template&id=794ac579 */ "./resources/js/views/Sellers/AbandonedCarts.vue?vue&type=template&id=794ac579");
/* harmony import */ var _AbandonedCarts_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AbandonedCarts.vue?vue&type=script&lang=js */ "./resources/js/views/Sellers/AbandonedCarts.vue?vue&type=script&lang=js");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _AbandonedCarts_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _AbandonedCarts_vue_vue_type_template_id_794ac579__WEBPACK_IMPORTED_MODULE_0__.render,
  _AbandonedCarts_vue_vue_type_template_id_794ac579__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/Sellers/AbandonedCarts.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/views/Sellers/AbandonedCarts.vue?vue&type=script&lang=js":
/*!*******************************************************************************!*\
  !*** ./resources/js/views/Sellers/AbandonedCarts.vue?vue&type=script&lang=js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_AbandonedCarts_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./AbandonedCarts.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Sellers/AbandonedCarts.vue?vue&type=script&lang=js");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_AbandonedCarts_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/Sellers/AbandonedCarts.vue?vue&type=template&id=794ac579":
/*!*************************************************************************************!*\
  !*** ./resources/js/views/Sellers/AbandonedCarts.vue?vue&type=template&id=794ac579 ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_AbandonedCarts_vue_vue_type_template_id_794ac579__WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   staticRenderFns: () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_AbandonedCarts_vue_vue_type_template_id_794ac579__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_AbandonedCarts_vue_vue_type_template_id_794ac579__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./AbandonedCarts.vue?vue&type=template&id=794ac579 */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Sellers/AbandonedCarts.vue?vue&type=template&id=794ac579");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Sellers/AbandonedCarts.vue?vue&type=template&id=794ac579":
/*!****************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Sellers/AbandonedCarts.vue?vue&type=template&id=794ac579 ***!
  \****************************************************************************************************************************************************************************************************************************/
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
            _c("h3", [_vm._v(_vm._s(_vm.__("abandoned_carts")))]),
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
                      _c(
                        "router-link",
                        { attrs: { to: "/seller/dashboard" } },
                        [_vm._v(_vm._s(_vm.__("dashboard")))]
                      ),
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
                    [_vm._v(_vm._s(_vm.__("abandoned_carts")))]
                  ),
                ]),
              ]
            ),
          ]),
        ]),
      ]),
      _vm._v(" "),
      _c("section", { staticClass: "section" }, [
        _c("div", { staticClass: "card figma-main-section-card" }, [
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
                            return _vm.getCarts()
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
              "div",
              { staticClass: "table-responsive" },
              [
                _c("b-table", {
                  staticClass: "figma-table mb-0",
                  attrs: {
                    items: _vm.carts,
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
                                      return _vm.deleteCart(
                                        row.index,
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