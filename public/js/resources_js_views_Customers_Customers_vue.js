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
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
      fields: [{
        key: 'id',
        label: __('id'),
        sortable: true,
        sortDirection: 'desc'
      }, {
        key: 'name',
        label: __('name'),
        sortable: true,
        "class": 'text-center'
      }, {
        key: 'email',
        label: __('email'),
        sortable: true,
        "class": 'text-center'
      }, {
        key: 'mobile',
        label: __('mobile_no'),
        sortable: true,
        "class": 'text-center'
      }, {
        key: 'balance',
        label: __('balance'),
        sortable: true,
        "class": 'text-center'
      }, {
        key: 'status',
        label: __('status'),
        sortable: true,
        "class": 'text-center'
      }, {
        key: 'type',
        label: __('type'),
        sortable: true,
        "class": 'text-center'
      }, {
        key: 'created_at',
        label: __('date_time'),
        sortable: true,
        "class": 'text-center'
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
        confirmButtonColor: '#37a279',
        cancelButtonColor: '#d33'
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

/***/ "./resources/js/views/Customers/Customers.vue":
/*!****************************************************!*\
  !*** ./resources/js/views/Customers/Customers.vue ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Customers_vue_vue_type_template_id_0aa4382c__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Customers.vue?vue&type=template&id=0aa4382c */ "./resources/js/views/Customers/Customers.vue?vue&type=template&id=0aa4382c");
/* harmony import */ var _Customers_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Customers.vue?vue&type=script&lang=js */ "./resources/js/views/Customers/Customers.vue?vue&type=script&lang=js");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Customers_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _Customers_vue_vue_type_template_id_0aa4382c__WEBPACK_IMPORTED_MODULE_0__.render,
  _Customers_vue_vue_type_template_id_0aa4382c__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
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

/***/ "./resources/js/views/Customers/Customers.vue?vue&type=template&id=0aa4382c":
/*!**********************************************************************************!*\
  !*** ./resources/js/views/Customers/Customers.vue?vue&type=template&id=0aa4382c ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Customers_vue_vue_type_template_id_0aa4382c__WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   staticRenderFns: () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Customers_vue_vue_type_template_id_0aa4382c__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Customers_vue_vue_type_template_id_0aa4382c__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Customers.vue?vue&type=template&id=0aa4382c */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Customers/Customers.vue?vue&type=template&id=0aa4382c");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Customers/Customers.vue?vue&type=template&id=0aa4382c":
/*!*************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Customers/Customers.vue?vue&type=template&id=0aa4382c ***!
  \*************************************************************************************************************************************************************************************************************************/
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
                    _c(
                      "div",
                      {
                        staticClass: "figma-search-container",
                        staticStyle: { "min-width": "250px" },
                      },
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
                              function ($event) {
                                return _vm.addFilter()
                              },
                            ],
                          },
                        }),
                      ]
                    ),
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
            _c(
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
                        key: "cell(type)",
                        fn: function (row) {
                          return [
                            row.item.type == "phone"
                              ? _c("img", {
                                  attrs: {
                                    src: _vm.$baseUrl + "/images/phone.svg",
                                    height: "40",
                                    alt: "phone",
                                  },
                                })
                              : _vm._e(),
                            _vm._v(" "),
                            row.item.type == "google"
                              ? _c("img", {
                                  attrs: {
                                    src: _vm.$baseUrl + "/images/google.svg",
                                    height: "40",
                                    alt: "google",
                                  },
                                })
                              : _vm._e(),
                            _vm._v(" "),
                            row.item.type == "apple"
                              ? _c("img", {
                                  attrs: {
                                    src: _vm.$baseUrl + "/images/apple.svg",
                                    height: "40",
                                    alt: "apple",
                                  },
                                })
                              : _vm._e(),
                            _vm._v(" "),
                            row.item.type == "email"
                              ? _c("i", {
                                  staticClass: "fa fa-envelope fa-2x",
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
                              : _c("span", { staticClass: "badge bg-danger" }, [
                                  _vm._v(_vm._s(_vm.__("deactive"))),
                                ]),
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
                                                "fa fa-toggle-on fa-2x",
                                            }),
                                          ]
                                        )
                                      : _c(
                                          "span",
                                          { staticClass: "text-danger" },
                                          [
                                            _c("i", {
                                              staticClass:
                                                "fa fa-toggle-off fa-2x",
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
            _c(
              "div",
              { staticClass: "figma-table-footer flex-wrap gap-3 mt-4" },
              [
                _c("div", { staticClass: "showing-results-text small" }, [
                  _vm._v(
                    "\n                            " +
                      _vm._s(_vm.__("Showing Result")) +
                      " : "
                  ),
                  _c("span", { staticClass: "showing-bold" }, [
                    _vm._v(_vm._s(_vm.pageEnd)),
                  ]),
                  _vm._v(" " + _vm._s(_vm.__("of")) + " "),
                  _c("span", { staticClass: "showing-bold" }, [
                    _vm._v(_vm._s(_vm.totalRows)),
                  ]),
                ]),
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
              ]
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