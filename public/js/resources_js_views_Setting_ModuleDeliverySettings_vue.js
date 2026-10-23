"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_views_Setting_ModuleDeliverySettings_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Setting/ModuleDeliverySettings.vue?vue&type=script&lang=js":
/*!*******************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Setting/ModuleDeliverySettings.vue?vue&type=script&lang=js ***!
  \*******************************************************************************************************************************************************************************************************************/
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


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  data: function data() {
    return {
      module: null,
      isLoading: false,
      isSaving: false,
      isSavingSellerDrivers: false
    };
  },
  created: function created() {
    this.getModule();
  },
  methods: {
    tr: function tr(key, fallback) {
      var v = this.__(key);
      return v && v !== key ? v : fallback;
    },
    activeModuleId: function activeModuleId() {
      return Number(localStorage.getItem('active_module_id')) || 1;
    },
    getModule: function getModule() {
      var _this = this;
      this.isLoading = true;
      axios__WEBPACK_IMPORTED_MODULE_0___default().get(this.$apiUrl + '/module_delivery_settings', {
        params: {
          module_id: this.activeModuleId()
        }
      }).then(function (response) {
        var data = response.data.data;
        _this.module = Array.isArray(data) && data.length ? data[0] : null;
        _this.isLoading = false;
      })["catch"](function () {
        _this.isLoading = false;
      });
    },
    saveSellerOwnDrivers: function saveSellerOwnDrivers() {
      var _this2 = this;
      this.isSavingSellerDrivers = true;
      var formData = new FormData();
      formData.append('allow_seller_own_drivers', this.module.allow_seller_own_drivers ? 1 : 0);
      axios__WEBPACK_IMPORTED_MODULE_0___default().post(this.$apiUrl + '/module_delivery_settings/save_seller_own_drivers', formData).then(function (res) {
        if (res.data.status === 1) {
          _this2.showMessage("success", res.data.message);
        } else {
          _this2.showError(res.data.message);
        }
        _this2.isSavingSellerDrivers = false;
      })["catch"](function (error) {
        _this2.showError(error.request && error.request.statusText || error.message || _this2.__('something_went_wrong'));
        _this2.isSavingSellerDrivers = false;
      });
    },
    saveModule: function saveModule() {
      var _this3 = this;
      this.isSaving = true;
      var formData = new FormData();
      for (var key in this.module) {
        if (key === 'module_name' || key === 'allow_seller_own_drivers') continue;
        var value = this.module[key];
        formData.append(key, value === true ? 1 : value === false ? 0 : value);
      }
      axios__WEBPACK_IMPORTED_MODULE_0___default().post(this.$apiUrl + '/module_delivery_settings/save', formData).then(function (res) {
        if (res.data.status === 1) {
          _this3.showMessage("success", res.data.message);
        } else {
          _this3.showError(res.data.message);
        }
        _this3.isSaving = false;
      })["catch"](function (error) {
        if (error.request && error.request.statusText) {
          _this3.showError(error.request.statusText);
        } else if (error.message) {
          _this3.showError(error.message);
        } else {
          _this3.showError(_this3.__('something_went_wrong'));
        }
        _this3.isSaving = false;
      });
    }
  }
});

/***/ }),

/***/ "./resources/js/views/Setting/ModuleDeliverySettings.vue":
/*!***************************************************************!*\
  !*** ./resources/js/views/Setting/ModuleDeliverySettings.vue ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ModuleDeliverySettings_vue_vue_type_template_id_aa76753e__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ModuleDeliverySettings.vue?vue&type=template&id=aa76753e */ "./resources/js/views/Setting/ModuleDeliverySettings.vue?vue&type=template&id=aa76753e");
/* harmony import */ var _ModuleDeliverySettings_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ModuleDeliverySettings.vue?vue&type=script&lang=js */ "./resources/js/views/Setting/ModuleDeliverySettings.vue?vue&type=script&lang=js");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _ModuleDeliverySettings_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _ModuleDeliverySettings_vue_vue_type_template_id_aa76753e__WEBPACK_IMPORTED_MODULE_0__.render,
  _ModuleDeliverySettings_vue_vue_type_template_id_aa76753e__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/Setting/ModuleDeliverySettings.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/views/Setting/ModuleDeliverySettings.vue?vue&type=script&lang=js":
/*!***************************************************************************************!*\
  !*** ./resources/js/views/Setting/ModuleDeliverySettings.vue?vue&type=script&lang=js ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ModuleDeliverySettings_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./ModuleDeliverySettings.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Setting/ModuleDeliverySettings.vue?vue&type=script&lang=js");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ModuleDeliverySettings_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/Setting/ModuleDeliverySettings.vue?vue&type=template&id=aa76753e":
/*!*********************************************************************************************!*\
  !*** ./resources/js/views/Setting/ModuleDeliverySettings.vue?vue&type=template&id=aa76753e ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ModuleDeliverySettings_vue_vue_type_template_id_aa76753e__WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   staticRenderFns: () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ModuleDeliverySettings_vue_vue_type_template_id_aa76753e__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ModuleDeliverySettings_vue_vue_type_template_id_aa76753e__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./ModuleDeliverySettings.vue?vue&type=template&id=aa76753e */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Setting/ModuleDeliverySettings.vue?vue&type=template&id=aa76753e");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Setting/ModuleDeliverySettings.vue?vue&type=template&id=aa76753e":
/*!************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Setting/ModuleDeliverySettings.vue?vue&type=template&id=aa76753e ***!
  \************************************************************************************************************************************************************************************************************************************/
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
          _vm._m(0),
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
                  _c(
                    "li",
                    { staticClass: "breadcrumb-item" },
                    [
                      _c(
                        "router-link",
                        { attrs: { to: "/delivery_settings" } },
                        [_vm._v(_vm._s(_vm.__("delivery_settings")))]
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
                    [_vm._v("Seller Delivery Boys")]
                  ),
                ]),
              ]
            ),
          ]),
        ]),
      ]),
      _vm._v(" "),
      _c("section", { staticClass: "section" }, [
        _vm.isLoading
          ? _c(
              "div",
              { staticClass: "text-center text-muted my-3" },
              [
                _c("b-spinner", { staticClass: "align-middle" }),
                _vm._v(" "),
                _c("strong", [_vm._v(_vm._s(_vm.__("loading")) + "...")]),
              ],
              1
            )
          : _vm._e(),
        _vm._v(" "),
        !_vm.isLoading && _vm.module
          ? _c("div", { staticClass: "card mt-3" }, [
              _c("div", { staticClass: "card-header" }, [
                _c("h4", { staticClass: "card-title float-none" }, [
                  _vm._v(
                    _vm._s(_vm.tr("seller_own_drivers", "Seller Delivery Boys"))
                  ),
                ]),
                _vm._v(" "),
                _c("p", { staticClass: "text-muted small mb-0 mt-1" }, [
                  _vm._v(
                    _vm._s(
                      _vm.tr(
                        "seller_own_drivers_desc",
                        "Decide whether sellers can deliver orders with their own delivery boys."
                      )
                    )
                  ),
                ]),
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "card-body" }, [
                _c("div", { staticClass: "row" }, [
                  _c("div", { staticClass: "col-12 col-md-8 form-group" }, [
                    _c("div", { staticClass: "form-check form-switch" }, [
                      _c("input", {
                        directives: [
                          {
                            name: "model",
                            rawName: "v-model",
                            value: _vm.module.allow_seller_own_drivers,
                            expression: "module.allow_seller_own_drivers",
                          },
                        ],
                        staticClass: "form-check-input",
                        attrs: {
                          type: "checkbox",
                          id: "allow_seller_own_drivers",
                        },
                        domProps: {
                          checked: Array.isArray(
                            _vm.module.allow_seller_own_drivers
                          )
                            ? _vm._i(
                                _vm.module.allow_seller_own_drivers,
                                null
                              ) > -1
                            : _vm.module.allow_seller_own_drivers,
                        },
                        on: {
                          change: function ($event) {
                            var $$a = _vm.module.allow_seller_own_drivers,
                              $$el = $event.target,
                              $$c = $$el.checked ? true : false
                            if (Array.isArray($$a)) {
                              var $$v = null,
                                $$i = _vm._i($$a, $$v)
                              if ($$el.checked) {
                                $$i < 0 &&
                                  _vm.$set(
                                    _vm.module,
                                    "allow_seller_own_drivers",
                                    $$a.concat([$$v])
                                  )
                              } else {
                                $$i > -1 &&
                                  _vm.$set(
                                    _vm.module,
                                    "allow_seller_own_drivers",
                                    $$a.slice(0, $$i).concat($$a.slice($$i + 1))
                                  )
                              }
                            } else {
                              _vm.$set(
                                _vm.module,
                                "allow_seller_own_drivers",
                                $$c
                              )
                            }
                          },
                        },
                      }),
                      _vm._v(" "),
                      _c(
                        "label",
                        {
                          staticClass: "form-check-label ms-2",
                          attrs: { for: "allow_seller_own_drivers" },
                        },
                        [_vm._v("Allow Sellers' Own Drivers")]
                      ),
                    ]),
                    _vm._v(" "),
                    _c("small", { staticClass: "text-muted" }, [
                      _vm._v(
                        'When on, sellers whose "Who Delivers Their Orders" is set to Own Delivery Boys use their own drivers. When off, every seller uses the admin\'s drivers.'
                      ),
                    ]),
                  ]),
                ]),
                _vm._v(" "),
                _c(
                  "div",
                  {
                    staticClass:
                      "d-flex justify-content-end border-top pt-3 mt-2",
                  },
                  [
                    _vm.$can("seller_delivery_boys")
                      ? _c(
                          "b-button",
                          {
                            attrs: {
                              variant: "primary",
                              disabled: _vm.isSavingSellerDrivers,
                            },
                            on: { click: _vm.saveSellerOwnDrivers },
                          },
                          [
                            _vm._v(
                              "\n                            " +
                                _vm._s(_vm.__("update")) +
                                "\n                            "
                            ),
                            _vm.isSavingSellerDrivers
                              ? _c("b-spinner", { attrs: { small: "" } })
                              : _vm._e(),
                          ],
                          1
                        )
                      : _vm._e(),
                  ],
                  1
                ),
              ]),
            ])
          : _vm._e(),
        _vm._v(" "),
        !_vm.isLoading && !_vm.module
          ? _c("div", { staticClass: "alert alert-warning" }, [
              _vm._v(
                "\n                Could not load settings for the currently selected module.\n            "
              ),
            ])
          : _vm._e(),
      ]),
    ]),
  ])
}
var staticRenderFns = [
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "col-12 col-md-6 order-md-1 order-last" }, [
      _c("h3", [_vm._v("Seller Delivery Boys")]),
    ])
  },
]
render._withStripped = true



/***/ })

}]);