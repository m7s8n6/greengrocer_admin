"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_views_Setting_RealtimeSettings_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Setting/RealtimeSettings.vue?vue&type=script&lang=js":
/*!*************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Setting/RealtimeSettings.vue?vue&type=script&lang=js ***!
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
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
        broadcast_driver: 'pusher',
        pusher_app_id: '',
        pusher_app_key: '',
        pusher_app_secret: '',
        pusher_app_cluster: '',
        reverb_app_id: '',
        reverb_app_key: '',
        reverb_app_secret: '',
        reverb_host: '',
        reverb_port: '',
        reverb_scheme: 'http'
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
      axios__WEBPACK_IMPORTED_MODULE_0___default().get(this.$apiUrl + '/realtime_settings').then(function (response) {
        if (response.data.data) {
          Object.assign(_this.settings, response.data.data);
        }
      });
    },
    saveRecord: function saveRecord() {
      var _this2 = this;
      this.isLoading = true;
      var formData = new FormData();
      for (var key in this.settings) {
        var _this$settings$key;
        formData.append(key, (_this$settings$key = this.settings[key]) !== null && _this$settings$key !== void 0 ? _this$settings$key : '');
      }
      axios__WEBPACK_IMPORTED_MODULE_0___default().post(this.$apiUrl + '/realtime_settings/save', formData).then(function (res) {
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

/***/ "./resources/js/views/Setting/RealtimeSettings.vue":
/*!*********************************************************!*\
  !*** ./resources/js/views/Setting/RealtimeSettings.vue ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _RealtimeSettings_vue_vue_type_template_id_a048e768__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./RealtimeSettings.vue?vue&type=template&id=a048e768 */ "./resources/js/views/Setting/RealtimeSettings.vue?vue&type=template&id=a048e768");
/* harmony import */ var _RealtimeSettings_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./RealtimeSettings.vue?vue&type=script&lang=js */ "./resources/js/views/Setting/RealtimeSettings.vue?vue&type=script&lang=js");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _RealtimeSettings_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _RealtimeSettings_vue_vue_type_template_id_a048e768__WEBPACK_IMPORTED_MODULE_0__.render,
  _RealtimeSettings_vue_vue_type_template_id_a048e768__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/Setting/RealtimeSettings.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/views/Setting/RealtimeSettings.vue?vue&type=script&lang=js":
/*!*********************************************************************************!*\
  !*** ./resources/js/views/Setting/RealtimeSettings.vue?vue&type=script&lang=js ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_RealtimeSettings_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./RealtimeSettings.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Setting/RealtimeSettings.vue?vue&type=script&lang=js");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_RealtimeSettings_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/Setting/RealtimeSettings.vue?vue&type=template&id=a048e768":
/*!***************************************************************************************!*\
  !*** ./resources/js/views/Setting/RealtimeSettings.vue?vue&type=template&id=a048e768 ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_RealtimeSettings_vue_vue_type_template_id_a048e768__WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   staticRenderFns: () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_RealtimeSettings_vue_vue_type_template_id_a048e768__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_RealtimeSettings_vue_vue_type_template_id_a048e768__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./RealtimeSettings.vue?vue&type=template&id=a048e768 */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Setting/RealtimeSettings.vue?vue&type=template&id=a048e768");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Setting/RealtimeSettings.vue?vue&type=template&id=a048e768":
/*!******************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Setting/RealtimeSettings.vue?vue&type=template&id=a048e768 ***!
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
            _c("h3", [
              _vm._v(
                _vm._s(_vm.__("realtime_settings") || "Realtime Settings")
              ),
            ]),
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
                    {
                      staticClass: "breadcrumb-item active",
                      attrs: { "aria-current": "page" },
                    },
                    [
                      _vm._v(
                        _vm._s(
                          _vm.__("realtime_settings") || "Realtime Settings"
                        )
                      ),
                    ]
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
                  _vm._v(
                    _vm._s(_vm.__("realtime_settings") || "Realtime Settings")
                  ),
                ]),
                _vm._v(" "),
                _c("p", { staticClass: "text-muted small mb-0 mt-1" }, [
                  _vm._v(
                    _vm._s(
                      _vm.tr(
                        "realtime_settings_desc",
                        "Choose how realtime order-offer alerts reach delivery boys; only the selected driver is used."
                      )
                    )
                  ),
                ]),
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "card-body" }, [
                _c("div", { staticClass: "form-group mb-4" }, [
                  _vm._m(0),
                  _vm._v(" "),
                  _c(
                    "div",
                    {
                      staticClass: "btn-group w-100",
                      attrs: { role: "group" },
                    },
                    [
                      _c(
                        "button",
                        {
                          staticClass: "btn",
                          class:
                            _vm.settings.broadcast_driver === "reverb"
                              ? "btn-primary"
                              : "btn-outline-secondary",
                          attrs: { type: "button" },
                          on: {
                            click: function ($event) {
                              _vm.settings.broadcast_driver = "reverb"
                            },
                          },
                        },
                        [
                          _vm._v(
                            "\n                                    Reverb (Self Hosted)\n                                "
                          ),
                        ]
                      ),
                      _vm._v(" "),
                      _c(
                        "button",
                        {
                          staticClass: "btn",
                          class:
                            _vm.settings.broadcast_driver === "pusher"
                              ? "btn-primary"
                              : "btn-outline-secondary",
                          attrs: { type: "button" },
                          on: {
                            click: function ($event) {
                              _vm.settings.broadcast_driver = "pusher"
                            },
                          },
                        },
                        [
                          _vm._v(
                            "\n                                    Pusher (Cloud)\n                                "
                          ),
                        ]
                      ),
                    ]
                  ),
                ]),
                _vm._v(" "),
                _vm.settings.broadcast_driver === "pusher"
                  ? _c("div", [
                      _c("h5", { staticClass: "mb-1" }, [
                        _vm._v("Pusher Credentials"),
                      ]),
                      _vm._v(" "),
                      _c("p", { staticClass: "text-muted small" }, [
                        _vm._v(
                          'Get these from your Pusher Channels app under "App Keys".'
                        ),
                      ]),
                      _vm._v(" "),
                      _c("div", { staticClass: "row" }, [
                        _c(
                          "div",
                          { staticClass: "col-12 col-md-6 form-group" },
                          [
                            _c("label", [_vm._v("App ID")]),
                            _vm._v(" "),
                            _c("input", {
                              directives: [
                                {
                                  name: "model",
                                  rawName: "v-model",
                                  value: _vm.settings.pusher_app_id,
                                  expression: "settings.pusher_app_id",
                                },
                              ],
                              staticClass: "form-control",
                              attrs: { type: "text" },
                              domProps: { value: _vm.settings.pusher_app_id },
                              on: {
                                input: function ($event) {
                                  if ($event.target.composing) {
                                    return
                                  }
                                  _vm.$set(
                                    _vm.settings,
                                    "pusher_app_id",
                                    $event.target.value
                                  )
                                },
                              },
                            }),
                          ]
                        ),
                        _vm._v(" "),
                        _c(
                          "div",
                          { staticClass: "col-12 col-md-6 form-group" },
                          [
                            _c("label", [_vm._v("App Key")]),
                            _vm._v(" "),
                            _c("input", {
                              directives: [
                                {
                                  name: "model",
                                  rawName: "v-model",
                                  value: _vm.settings.pusher_app_key,
                                  expression: "settings.pusher_app_key",
                                },
                              ],
                              staticClass: "form-control",
                              attrs: { type: "text" },
                              domProps: { value: _vm.settings.pusher_app_key },
                              on: {
                                input: function ($event) {
                                  if ($event.target.composing) {
                                    return
                                  }
                                  _vm.$set(
                                    _vm.settings,
                                    "pusher_app_key",
                                    $event.target.value
                                  )
                                },
                              },
                            }),
                          ]
                        ),
                        _vm._v(" "),
                        _c(
                          "div",
                          { staticClass: "col-12 col-md-6 form-group" },
                          [
                            _c("label", [_vm._v("App Secret")]),
                            _vm._v(" "),
                            _c("input", {
                              directives: [
                                {
                                  name: "model",
                                  rawName: "v-model",
                                  value: _vm.settings.pusher_app_secret,
                                  expression: "settings.pusher_app_secret",
                                },
                              ],
                              staticClass: "form-control",
                              attrs: { type: "password" },
                              domProps: {
                                value: _vm.settings.pusher_app_secret,
                              },
                              on: {
                                input: function ($event) {
                                  if ($event.target.composing) {
                                    return
                                  }
                                  _vm.$set(
                                    _vm.settings,
                                    "pusher_app_secret",
                                    $event.target.value
                                  )
                                },
                              },
                            }),
                          ]
                        ),
                        _vm._v(" "),
                        _c(
                          "div",
                          { staticClass: "col-12 col-md-6 form-group" },
                          [
                            _c("label", [_vm._v("Cluster")]),
                            _vm._v(" "),
                            _c("input", {
                              directives: [
                                {
                                  name: "model",
                                  rawName: "v-model",
                                  value: _vm.settings.pusher_app_cluster,
                                  expression: "settings.pusher_app_cluster",
                                },
                              ],
                              staticClass: "form-control",
                              attrs: { type: "text" },
                              domProps: {
                                value: _vm.settings.pusher_app_cluster,
                              },
                              on: {
                                input: function ($event) {
                                  if ($event.target.composing) {
                                    return
                                  }
                                  _vm.$set(
                                    _vm.settings,
                                    "pusher_app_cluster",
                                    $event.target.value
                                  )
                                },
                              },
                            }),
                          ]
                        ),
                      ]),
                    ])
                  : _c("div", [
                      _c("h5", { staticClass: "mb-1" }, [
                        _vm._v("Reverb Credentials"),
                      ]),
                      _vm._v(" "),
                      _vm._m(1),
                      _vm._v(" "),
                      _c("div", { staticClass: "row" }, [
                        _c(
                          "div",
                          { staticClass: "col-12 col-md-6 form-group" },
                          [
                            _c("label", [_vm._v("App ID")]),
                            _vm._v(" "),
                            _c("input", {
                              directives: [
                                {
                                  name: "model",
                                  rawName: "v-model",
                                  value: _vm.settings.reverb_app_id,
                                  expression: "settings.reverb_app_id",
                                },
                              ],
                              staticClass: "form-control",
                              attrs: { type: "text" },
                              domProps: { value: _vm.settings.reverb_app_id },
                              on: {
                                input: function ($event) {
                                  if ($event.target.composing) {
                                    return
                                  }
                                  _vm.$set(
                                    _vm.settings,
                                    "reverb_app_id",
                                    $event.target.value
                                  )
                                },
                              },
                            }),
                          ]
                        ),
                        _vm._v(" "),
                        _c(
                          "div",
                          { staticClass: "col-12 col-md-6 form-group" },
                          [
                            _c("label", [_vm._v("App Key")]),
                            _vm._v(" "),
                            _c("input", {
                              directives: [
                                {
                                  name: "model",
                                  rawName: "v-model",
                                  value: _vm.settings.reverb_app_key,
                                  expression: "settings.reverb_app_key",
                                },
                              ],
                              staticClass: "form-control",
                              attrs: { type: "text" },
                              domProps: { value: _vm.settings.reverb_app_key },
                              on: {
                                input: function ($event) {
                                  if ($event.target.composing) {
                                    return
                                  }
                                  _vm.$set(
                                    _vm.settings,
                                    "reverb_app_key",
                                    $event.target.value
                                  )
                                },
                              },
                            }),
                          ]
                        ),
                        _vm._v(" "),
                        _c(
                          "div",
                          { staticClass: "col-12 col-md-6 form-group" },
                          [
                            _c("label", [_vm._v("App Secret")]),
                            _vm._v(" "),
                            _c("input", {
                              directives: [
                                {
                                  name: "model",
                                  rawName: "v-model",
                                  value: _vm.settings.reverb_app_secret,
                                  expression: "settings.reverb_app_secret",
                                },
                              ],
                              staticClass: "form-control",
                              attrs: { type: "password" },
                              domProps: {
                                value: _vm.settings.reverb_app_secret,
                              },
                              on: {
                                input: function ($event) {
                                  if ($event.target.composing) {
                                    return
                                  }
                                  _vm.$set(
                                    _vm.settings,
                                    "reverb_app_secret",
                                    $event.target.value
                                  )
                                },
                              },
                            }),
                          ]
                        ),
                        _vm._v(" "),
                        _c(
                          "div",
                          { staticClass: "col-12 col-md-6 form-group" },
                          [
                            _c("label", [_vm._v("Host")]),
                            _vm._v(" "),
                            _c("input", {
                              directives: [
                                {
                                  name: "model",
                                  rawName: "v-model",
                                  value: _vm.settings.reverb_host,
                                  expression: "settings.reverb_host",
                                },
                              ],
                              staticClass: "form-control",
                              attrs: { type: "text" },
                              domProps: { value: _vm.settings.reverb_host },
                              on: {
                                input: function ($event) {
                                  if ($event.target.composing) {
                                    return
                                  }
                                  _vm.$set(
                                    _vm.settings,
                                    "reverb_host",
                                    $event.target.value
                                  )
                                },
                              },
                            }),
                          ]
                        ),
                        _vm._v(" "),
                        _c(
                          "div",
                          { staticClass: "col-12 col-md-6 form-group" },
                          [
                            _c("label", [_vm._v("Port")]),
                            _vm._v(" "),
                            _c("input", {
                              directives: [
                                {
                                  name: "model",
                                  rawName: "v-model",
                                  value: _vm.settings.reverb_port,
                                  expression: "settings.reverb_port",
                                },
                              ],
                              staticClass: "form-control",
                              attrs: { type: "text" },
                              domProps: { value: _vm.settings.reverb_port },
                              on: {
                                input: function ($event) {
                                  if ($event.target.composing) {
                                    return
                                  }
                                  _vm.$set(
                                    _vm.settings,
                                    "reverb_port",
                                    $event.target.value
                                  )
                                },
                              },
                            }),
                          ]
                        ),
                        _vm._v(" "),
                        _c(
                          "div",
                          { staticClass: "col-12 col-md-6 form-group" },
                          [
                            _c("label", [_vm._v("Scheme")]),
                            _vm._v(" "),
                            _c(
                              "select",
                              {
                                directives: [
                                  {
                                    name: "model",
                                    rawName: "v-model",
                                    value: _vm.settings.reverb_scheme,
                                    expression: "settings.reverb_scheme",
                                  },
                                ],
                                staticClass: "form-control",
                                on: {
                                  change: function ($event) {
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
                                    _vm.$set(
                                      _vm.settings,
                                      "reverb_scheme",
                                      $event.target.multiple
                                        ? $$selectedVal
                                        : $$selectedVal[0]
                                    )
                                  },
                                },
                              },
                              [
                                _c("option", { attrs: { value: "http" } }, [
                                  _vm._v("http"),
                                ]),
                                _vm._v(" "),
                                _c("option", { attrs: { value: "https" } }, [
                                  _vm._v("https"),
                                ]),
                              ]
                            ),
                          ]
                        ),
                      ]),
                    ]),
                _vm._v(" "),
                _c("div", { staticClass: "alert alert-info mt-3" }, [
                  _vm._v(
                    "\n                            Saving here does not by itself send anything over websocket -\n                            "
                  ),
                  _c("code", [
                    _vm._v(
                      _vm._s(
                        _vm.settings.broadcast_driver === "pusher"
                          ? "pusher/pusher-php-server"
                          : "laravel/reverb"
                      )
                    ),
                  ]),
                  _vm._v(
                    "\n                            must also be installed on the server for this driver to actually work.\n                        "
                  ),
                ]),
                _vm._v(" "),
                _c(
                  "div",
                  {
                    staticClass:
                      "d-flex justify-content-end border-top pt-3 mt-2",
                  },
                  [
                    _vm.$can("realtime_settings")
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
    return _c("label", { staticClass: "d-block mb-2" }, [
      _vm._v("Realtime Driver"),
      _c("span", { staticClass: "text-danger" }, [_vm._v("*")]),
    ])
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("p", { staticClass: "text-muted small" }, [
      _vm._v(
        "\n                                Reverb runs as its own process on your server ("
      ),
      _c("code", [_vm._v("php artisan reverb:start")]),
      _vm._v(") -\n                                requires the "),
      _c("code", [_vm._v("laravel/reverb")]),
      _vm._v(
        " composer package to be installed.\n                            "
      ),
    ])
  },
]
render._withStripped = true



/***/ })

}]);