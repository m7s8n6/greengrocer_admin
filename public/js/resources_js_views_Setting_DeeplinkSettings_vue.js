"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_views_Setting_DeeplinkSettings_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Setting/DeeplinkSettings.vue?vue&type=script&lang=js":
/*!*************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Setting/DeeplinkSettings.vue?vue&type=script&lang=js ***!
  \*************************************************************************************************************************************************************************************************************/
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


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  data: function data() {
    return {
      isLoading: false,
      settings: {
        deeplink_scheme: ''
      }
    };
  },
  created: function created() {
    this.getSettings();
  },
  methods: {
    tr: function tr(key, fallback) {
      var v = this.__(key);
      return v && v !== key ? v : fallback;
    },
    getSettings: function getSettings() {
      var _this = this;
      axios__WEBPACK_IMPORTED_MODULE_0___default().get(this.$apiUrl + '/deeplink_settings').then(function (response) {
        if (response.data.data) {
          var _response$data$data$d;
          _this.settings.deeplink_scheme = (_response$data$data$d = response.data.data.deeplink_scheme) !== null && _response$data$data$d !== void 0 ? _response$data$data$d : '';
        }
      });
    },
    saveRecord: function saveRecord() {
      var _this2 = this;
      var scheme = (this.settings.deeplink_scheme || '').trim();
      if (!/^[a-z][a-z0-9+.-]*$/.test(scheme)) {
        this.showError('Deeplink schema must be lowercase, start with a letter and contain no "://" or spaces.');
        return;
      }
      this.isLoading = true;
      var formData = new FormData();
      for (var key in this.settings) {
        var _this$settings$key;
        formData.append(key, (_this$settings$key = this.settings[key]) !== null && _this$settings$key !== void 0 ? _this$settings$key : '');
      }
      axios__WEBPACK_IMPORTED_MODULE_0___default().post(this.$apiUrl + '/deeplink_settings/save', formData).then(function (res) {
        if (res.data.status === 1) {
          _this2.showMessage("success", res.data.message);
        } else {
          _this2.showError(res.data.message);
        }
        _this2.isLoading = false;
      })["catch"](function (error) {
        if (error.request && error.request.statusText) {
          _this2.showError(error.request.statusText);
        } else if (error.message) {
          _this2.showError(error.message);
        } else {
          _this2.showError(_this2.__('something_went_wrong'));
        }
        _this2.isLoading = false;
      });
    }
  }
});

/***/ }),

/***/ "./resources/js/views/Setting/DeeplinkSettings.vue":
/*!*********************************************************!*\
  !*** ./resources/js/views/Setting/DeeplinkSettings.vue ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _DeeplinkSettings_vue_vue_type_template_id_735c5572__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DeeplinkSettings.vue?vue&type=template&id=735c5572 */ "./resources/js/views/Setting/DeeplinkSettings.vue?vue&type=template&id=735c5572");
/* harmony import */ var _DeeplinkSettings_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DeeplinkSettings.vue?vue&type=script&lang=js */ "./resources/js/views/Setting/DeeplinkSettings.vue?vue&type=script&lang=js");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _DeeplinkSettings_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _DeeplinkSettings_vue_vue_type_template_id_735c5572__WEBPACK_IMPORTED_MODULE_0__.render,
  _DeeplinkSettings_vue_vue_type_template_id_735c5572__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/Setting/DeeplinkSettings.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/views/Setting/DeeplinkSettings.vue?vue&type=script&lang=js":
/*!*********************************************************************************!*\
  !*** ./resources/js/views/Setting/DeeplinkSettings.vue?vue&type=script&lang=js ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_DeeplinkSettings_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./DeeplinkSettings.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Setting/DeeplinkSettings.vue?vue&type=script&lang=js");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_DeeplinkSettings_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/Setting/DeeplinkSettings.vue?vue&type=template&id=735c5572":
/*!***************************************************************************************!*\
  !*** ./resources/js/views/Setting/DeeplinkSettings.vue?vue&type=template&id=735c5572 ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_DeeplinkSettings_vue_vue_type_template_id_735c5572__WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   staticRenderFns: () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_DeeplinkSettings_vue_vue_type_template_id_735c5572__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_DeeplinkSettings_vue_vue_type_template_id_735c5572__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./DeeplinkSettings.vue?vue&type=template&id=735c5572 */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Setting/DeeplinkSettings.vue?vue&type=template&id=735c5572");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Setting/DeeplinkSettings.vue?vue&type=template&id=735c5572":
/*!******************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Setting/DeeplinkSettings.vue?vue&type=template&id=735c5572 ***!
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
      _c("div", { staticClass: "page-title" }, [
        _c("div", { staticClass: "row" }, [
          _c("div", { staticClass: "col-12 col-md-6 order-md-1 order-last" }, [
            _c("h3", [_vm._v(_vm._s(_vm.__("deeplink_settings")))]),
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
                  _c(
                    "li",
                    { staticClass: "breadcrumb-item" },
                    [
                      _c("router-link", { attrs: { to: "/system_settings" } }, [
                        _vm._v(_vm._s(_vm.__("settings"))),
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
                    [_vm._v(_vm._s(_vm.__("deeplink_settings")))]
                  ),
                ]),
              ]
            ),
          ]),
        ]),
      ]),
      _vm._v(" "),
      _c("section", { staticClass: "section" }, [
        _c(
          "form",
          {
            on: {
              submit: function ($event) {
                $event.preventDefault()
                return _vm.saveRecord.apply(null, arguments)
              },
            },
          },
          [
            _c("div", { staticClass: "card" }, [
              _c("div", { staticClass: "card-header" }, [
                _c("h4", { staticClass: "card-title float-none" }, [
                  _vm._v(_vm._s(_vm.__("deeplink_settings"))),
                ]),
                _vm._v(" "),
                _c("p", { staticClass: "text-muted small mb-0 mt-1" }, [
                  _vm._v(
                    _vm._s(
                      _vm.tr(
                        "deeplink_settings_desc",
                        "Deeplink configuration used by the website and the mobile apps to open in-app screens."
                      )
                    )
                  ),
                ]),
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "card-body" }, [
                _vm._m(0),
                _vm._v(" "),
                _c("div", { staticClass: "row" }, [
                  _c("div", { staticClass: "col-md-6 form-group" }, [
                    _vm._m(1),
                    _vm._v(" "),
                    _c("input", {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model.trim",
                          value: _vm.settings.deeplink_scheme,
                          expression: "settings.deeplink_scheme",
                          modifiers: { trim: true },
                        },
                      ],
                      staticClass: "form-control",
                      attrs: {
                        type: "text",
                        placeholder: "emarket",
                        required: "",
                      },
                      domProps: { value: _vm.settings.deeplink_scheme },
                      on: {
                        input: function ($event) {
                          if ($event.target.composing) {
                            return
                          }
                          _vm.$set(
                            _vm.settings,
                            "deeplink_scheme",
                            $event.target.value.trim()
                          )
                        },
                        blur: function ($event) {
                          return _vm.$forceUpdate()
                        },
                      },
                    }),
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
                    _vm.$can("deeplink_settings")
                      ? _c(
                          "b-button",
                          {
                            attrs: {
                              type: "submit",
                              variant: "primary",
                              disabled: _vm.isLoading,
                            },
                          },
                          [
                            _vm._v(
                              "\n                                " +
                                _vm._s(_vm.__("update")) +
                                "\n                                "
                            ),
                            _vm.isLoading
                              ? _c("b-spinner", {
                                  attrs: { small: "", label: "Spinning" },
                                })
                              : _vm._e(),
                          ],
                          1
                        )
                      : _vm._e(),
                  ],
                  1
                ),
              ]),
            ]),
          ]
        ),
      ]),
    ]),
  ])
}
var staticRenderFns = [
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "alert alert-info" }, [
      _c("b", [_vm._v("How deeplinks work:")]),
      _vm._v(" "),
      _c("ul", { staticClass: "mb-0 mt-2" }, [
        _c("li", [
          _vm._v("Scheme is the custom URL prefix the apps respond to, e.g. "),
          _c("code", [_vm._v("emarket")]),
          _vm._v(" (lowercase, no "),
          _c("code", [_vm._v("://")]),
          _vm._v(")."),
        ]),
      ]),
    ])
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("label", [
      _vm._v("Deeplink Schema"),
      _c("span", { staticClass: "text-danger" }, [_vm._v("*")]),
    ])
  },
]
render._withStripped = true



/***/ })

}]);