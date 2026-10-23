"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_views_DeliveryBoy_RequestedOrders_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/DeliveryBoy/RequestedOrders.vue?vue&type=script&lang=js":
/*!****************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/DeliveryBoy/RequestedOrders.vue?vue&type=script&lang=js ***!
  \****************************************************************************************************************************************************************************************************************/
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


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  data: function data() {
    return {
      queue: [],
      isLoading: false,
      loadedOnce: false,
      respondingId: null,
      now: Date.now(),
      pollTimer: null,
      tickTimer: null
    };
  },
  mounted: function mounted() {
    var _this = this;
    this.fetchQueue();
    // Offers arrive and expire on their own, so keep the list fresh.
    this.pollTimer = setInterval(function () {
      return _this.fetchQueue();
    }, 6000);
    this.tickTimer = setInterval(function () {
      _this.now = Date.now();
    }, 1000);
  },
  beforeDestroy: function beforeDestroy() {
    clearInterval(this.pollTimer);
    clearInterval(this.tickTimer);
  },
  methods: {
    fetchQueue: function fetchQueue() {
      var _this2 = this;
      if (this.respondingId !== null) return;
      this.isLoading = true;
      axios__WEBPACK_IMPORTED_MODULE_0___default().get(this.$deliveryBoyApiUrl + '/requested_orders').then(function (response) {
        _this2.queue = response.data && response.data.data ? response.data.data : [];
      })["catch"](function (error) {
        var _error$response;
        console.error('Error loading requested orders:', ((_error$response = error.response) === null || _error$response === void 0 ? void 0 : _error$response.data) || error);
      })["finally"](function () {
        _this2.isLoading = false;
        _this2.loadedOnce = true;
      });
    },
    secondsLeft: function secondsLeft(item) {
      if (!item.expires_at) return 0;
      return Math.max(0, Math.round((new Date(item.expires_at).getTime() - this.now) / 1000));
    },
    respond: function respond(item, action) {
      var _this3 = this;
      if (this.respondingId !== null) return;
      this.respondingId = item.order_id;
      var formData = new FormData();
      formData.append('order_id', item.order_id);
      formData.append('action', action);
      axios__WEBPACK_IMPORTED_MODULE_0___default().post(this.$deliveryBoyApiUrl + '/requested_orders/respond', formData).then(function (response) {
        var ok = response.data && response.data.status === 1;
        if (ok) {
          _this3.showSuccess(response.data.message);
        } else {
          _this3.showError(response.data.message);
        }
        if (ok && action === 'accept') {
          _this3.$router.push({
            path: '/delivery_boy/orders'
          })["catch"](function () {});
        }
      })["catch"](function (error) {
        var _error$response2, _error$response3, _error$response3$data;
        console.error('Error responding to requested order:', ((_error$response2 = error.response) === null || _error$response2 === void 0 ? void 0 : _error$response2.data) || error);
        _this3.showError(((_error$response3 = error.response) === null || _error$response3 === void 0 ? void 0 : (_error$response3$data = _error$response3.data) === null || _error$response3$data === void 0 ? void 0 : _error$response3$data.message) || error.message);
      })["finally"](function () {
        _this3.respondingId = null;
        _this3.fetchQueue();
      });
    }
  }
});

/***/ }),

/***/ "./resources/js/views/DeliveryBoy/RequestedOrders.vue":
/*!************************************************************!*\
  !*** ./resources/js/views/DeliveryBoy/RequestedOrders.vue ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _RequestedOrders_vue_vue_type_template_id_2daa04ad__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./RequestedOrders.vue?vue&type=template&id=2daa04ad */ "./resources/js/views/DeliveryBoy/RequestedOrders.vue?vue&type=template&id=2daa04ad");
/* harmony import */ var _RequestedOrders_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./RequestedOrders.vue?vue&type=script&lang=js */ "./resources/js/views/DeliveryBoy/RequestedOrders.vue?vue&type=script&lang=js");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _RequestedOrders_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _RequestedOrders_vue_vue_type_template_id_2daa04ad__WEBPACK_IMPORTED_MODULE_0__.render,
  _RequestedOrders_vue_vue_type_template_id_2daa04ad__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/DeliveryBoy/RequestedOrders.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/views/DeliveryBoy/RequestedOrders.vue?vue&type=script&lang=js":
/*!************************************************************************************!*\
  !*** ./resources/js/views/DeliveryBoy/RequestedOrders.vue?vue&type=script&lang=js ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_RequestedOrders_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./RequestedOrders.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/DeliveryBoy/RequestedOrders.vue?vue&type=script&lang=js");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_RequestedOrders_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/DeliveryBoy/RequestedOrders.vue?vue&type=template&id=2daa04ad":
/*!******************************************************************************************!*\
  !*** ./resources/js/views/DeliveryBoy/RequestedOrders.vue?vue&type=template&id=2daa04ad ***!
  \******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_RequestedOrders_vue_vue_type_template_id_2daa04ad__WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   staticRenderFns: () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_RequestedOrders_vue_vue_type_template_id_2daa04ad__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_RequestedOrders_vue_vue_type_template_id_2daa04ad__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./RequestedOrders.vue?vue&type=template&id=2daa04ad */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/DeliveryBoy/RequestedOrders.vue?vue&type=template&id=2daa04ad");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/DeliveryBoy/RequestedOrders.vue?vue&type=template&id=2daa04ad":
/*!*********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/DeliveryBoy/RequestedOrders.vue?vue&type=template&id=2daa04ad ***!
  \*********************************************************************************************************************************************************************************************************************************/
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
      _c("div", { staticClass: "page-title mb-4" }, [
        _c(
          "div",
          {
            staticClass:
              "d-flex justify-content-between align-items-center flex-wrap gap-2",
          },
          [
            _c("h3", { staticClass: "modern-page-title mb-0" }, [
              _vm._v("Requested Orders"),
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
                      {
                        staticClass: "text-muted",
                        attrs: { to: "/delivery_boy/dashboard" },
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
                  [_vm._v("Requested Orders")]
                ),
              ]),
            ]),
          ]
        ),
      ]),
      _vm._v(" "),
      _c("section", { staticClass: "section" }, [
        _c("div", { staticClass: "figma-main-section-card" }, [
          _c("div", { staticClass: "card-body" }, [
            _c(
              "div",
              {
                staticClass:
                  "d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3",
              },
              [
                _c("p", { staticClass: "text-muted mb-0" }, [
                  _vm._v(
                    "\n                            Orders offered to you. Accept the ones you want to deliver, or reject the rest.\n                        "
                  ),
                ]),
                _vm._v(" "),
                _c(
                  "button",
                  {
                    staticClass:
                      "btn btn-figma-filter d-flex align-items-center gap-2",
                    attrs: { disabled: _vm.isLoading },
                    on: { click: _vm.fetchQueue },
                  },
                  [
                    _c("i", { staticClass: "fa fa-refresh" }),
                    _vm._v(
                      _vm._s(_vm.__("refresh")) + "\n                        "
                    ),
                  ]
                ),
              ]
            ),
            _vm._v(" "),
            _vm.isLoading && !_vm.loadedOnce
              ? _c(
                  "div",
                  { staticClass: "text-center text-muted my-4" },
                  [
                    _c("b-spinner", { staticClass: "align-middle" }),
                    _vm._v(" "),
                    _c("strong", [_vm._v(_vm._s(_vm.__("loading")) + "...")]),
                  ],
                  1
                )
              : !_vm.queue.length
              ? _c("div", { staticClass: "text-center text-muted py-5" }, [
                  _c("i", { staticClass: "fa fa-inbox fa-2x mb-2 d-block" }),
                  _vm._v(
                    "\n                        No requested orders right now.\n                    "
                  ),
                ])
              : _c(
                  "div",
                  { staticClass: "row g-3" },
                  _vm._l(_vm.queue, function (item) {
                    return _c(
                      "div",
                      {
                        key: item.attempt_id,
                        staticClass: "col-12 col-md-6 col-xl-4",
                      },
                      [
                        _c(
                          "div",
                          {
                            staticClass:
                              "border rounded p-3 h-100 d-flex flex-column",
                          },
                          [
                            _c(
                              "div",
                              {
                                staticClass:
                                  "d-flex justify-content-between align-items-start mb-2",
                              },
                              [
                                _c("h5", { staticClass: "mb-0" }, [
                                  _vm._v("Order #" + _vm._s(item.order_id)),
                                ]),
                                _vm._v(" "),
                                _c(
                                  "span",
                                  { staticClass: "badge bg-warning text-dark" },
                                  [
                                    _vm._v(
                                      _vm._s(_vm.secondsLeft(item)) + "s left"
                                    ),
                                  ]
                                ),
                              ]
                            ),
                            _vm._v(" "),
                            item.area || item.city
                              ? _c("p", { staticClass: "text-muted mb-2" }, [
                                  _vm._v(
                                    "\n                                    " +
                                      _vm._s(item.area)
                                  ),
                                  item.area && item.city
                                    ? _c("span", [_vm._v(", ")])
                                    : _vm._e(),
                                  _vm._v(
                                    _vm._s(item.city) +
                                      "\n                                "
                                  ),
                                ])
                              : _vm._e(),
                            _vm._v(" "),
                            _c(
                              "div",
                              {
                                staticClass:
                                  "d-flex justify-content-between mb-1",
                              },
                              [
                                _c("span", { staticClass: "text-muted" }, [
                                  _vm._v("Items"),
                                ]),
                                _vm._v(" "),
                                _c("strong", [_vm._v(_vm._s(item.item_count))]),
                              ]
                            ),
                            _vm._v(" "),
                            _c(
                              "div",
                              {
                                staticClass:
                                  "d-flex justify-content-between mb-1",
                              },
                              [
                                _c("span", { staticClass: "text-muted" }, [
                                  _vm._v("Order Value"),
                                ]),
                                _vm._v(" "),
                                _c("strong", [
                                  _vm._v(
                                    _vm._s(_vm.$currency) +
                                      _vm._s(item.final_total)
                                  ),
                                ]),
                              ]
                            ),
                            _vm._v(" "),
                            item.distance_km
                              ? _c(
                                  "div",
                                  {
                                    staticClass:
                                      "d-flex justify-content-between mb-3",
                                  },
                                  [
                                    _c("span", { staticClass: "text-muted" }, [
                                      _vm._v("Distance"),
                                    ]),
                                    _vm._v(" "),
                                    _c("strong", [
                                      _vm._v(
                                        _vm._s(
                                          Number(item.distance_km).toFixed(1)
                                        ) + " km"
                                      ),
                                    ]),
                                  ]
                                )
                              : _vm._e(),
                            _vm._v(" "),
                            _c(
                              "div",
                              { staticClass: "d-flex gap-2 mt-auto" },
                              [
                                _c(
                                  "b-button",
                                  {
                                    staticClass: "flex-fill",
                                    attrs: {
                                      variant: "outline-danger",
                                      disabled: _vm.respondingId !== null,
                                    },
                                    on: {
                                      click: function ($event) {
                                        return _vm.respond(item, "reject")
                                      },
                                    },
                                  },
                                  [
                                    _vm._v(
                                      "\n                                        Reject\n                                    "
                                    ),
                                  ]
                                ),
                                _vm._v(" "),
                                _c(
                                  "b-button",
                                  {
                                    staticClass: "flex-fill",
                                    attrs: {
                                      variant: "success",
                                      disabled:
                                        _vm.respondingId !== null ||
                                        _vm.secondsLeft(item) <= 0,
                                    },
                                    on: {
                                      click: function ($event) {
                                        return _vm.respond(item, "accept")
                                      },
                                    },
                                  },
                                  [
                                    _vm._v(
                                      "\n                                        Accept\n                                        "
                                    ),
                                    _vm.respondingId === item.order_id
                                      ? _c("b-spinner", {
                                          attrs: { small: "" },
                                        })
                                      : _vm._e(),
                                  ],
                                  1
                                ),
                              ],
                              1
                            ),
                          ]
                        ),
                      ]
                    )
                  }),
                  0
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