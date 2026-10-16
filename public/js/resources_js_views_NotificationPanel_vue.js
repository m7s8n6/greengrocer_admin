"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_views_NotificationPanel_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/NotificationPanel.vue?vue&type=script&lang=js":
/*!******************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/NotificationPanel.vue?vue&type=script&lang=js ***!
  \******************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
  components: {
    // InfiniteLoading,
  },
  data: function data() {
    return {
      fields: [{
        key: 'title',
        label: __('title'),
        "class": 'text-left'
      }, {
        key: 'created_at',
        label: __('date'),
        "class": 'text-center'
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
      notifications: []
    };
  },
  computed: {
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
    },
    pageStart: function pageStart() {
      if (this.totalRows === 0) return 0;
      return (this.currentPage - 1) * this.perPage + 1;
    },
    pageEnd: function pageEnd() {
      return Math.min(this.currentPage * this.perPage, this.totalRows);
    }
  },
  mounted: function mounted() {
    this.totalRows = this.notifications.length;
  },
  created: function created() {
    this.getNotifications();
  },
  watch: {
    currentPage: function currentPage() {
      this.getNotifications();
    },
    perPage: function perPage() {
      this.getNotifications();
    }
  },
  methods: {
    getNotifications: function getNotifications() {
      var _this = this;
      this.isLoading = true;
      var param = {
        page: this.currentPage,
        per_page: this.perPage
      };
      axios.get(this.$apiUrl + '/panel_notification', {
        params: param
      }).then(function (response) {
        _this.isLoading = false;
        var data = response.data;
        _this.notifications = data.data;
        _this.totalRows = response.data.total;
      });
    },
    markAsRead: function markAsRead(item, event) {
      var _this2 = this;
      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(item.read_at === null)) {
                  _context.next = 10;
                  break;
                }
                _context.prev = 1;
                _context.next = 4;
                return axios.get(_this2.$apiUrl + '/notification_read?id=' + item.id);
              case 4:
                item.read_at = new Date().toISOString(); // Update locally for immediate UI change
                _context.next = 10;
                break;
              case 7:
                _context.prev = 7;
                _context.t0 = _context["catch"](1);
                console.error("Failed to mark as read", _context.t0);
              case 10:
                _this2.$router.push(_this2.getOrderViewPath(item.data.order_id));
              case 11:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[1, 7]]);
      }))();
    },
    getDashboardPath: function getDashboardPath() {
      if (this.$route.path.startsWith('/seller')) {
        return '/seller';
      } else if (this.$route.path.startsWith('/delivery_boy')) {
        return '/delivery_boy';
      } else {
        return '/dashboard';
      }
    },
    getOrderViewPath: function getOrderViewPath(orderId) {
      if (this.$route.path.startsWith('/seller')) {
        return '/seller/orders/view/' + orderId;
      } else if (this.$route.path.startsWith('/delivery_boy')) {
        return '/delivery_boy/orders/view/' + orderId;
      } else {
        return '/orders/view/' + orderId;
      }
    }
  }
});

/***/ }),

/***/ "./resources/js/views/NotificationPanel.vue":
/*!**************************************************!*\
  !*** ./resources/js/views/NotificationPanel.vue ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _NotificationPanel_vue_vue_type_template_id_6a6bff6c__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./NotificationPanel.vue?vue&type=template&id=6a6bff6c */ "./resources/js/views/NotificationPanel.vue?vue&type=template&id=6a6bff6c");
/* harmony import */ var _NotificationPanel_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./NotificationPanel.vue?vue&type=script&lang=js */ "./resources/js/views/NotificationPanel.vue?vue&type=script&lang=js");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _NotificationPanel_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _NotificationPanel_vue_vue_type_template_id_6a6bff6c__WEBPACK_IMPORTED_MODULE_0__.render,
  _NotificationPanel_vue_vue_type_template_id_6a6bff6c__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/NotificationPanel.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/views/NotificationPanel.vue?vue&type=script&lang=js":
/*!**************************************************************************!*\
  !*** ./resources/js/views/NotificationPanel.vue?vue&type=script&lang=js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_NotificationPanel_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./NotificationPanel.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/NotificationPanel.vue?vue&type=script&lang=js");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_NotificationPanel_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/NotificationPanel.vue?vue&type=template&id=6a6bff6c":
/*!********************************************************************************!*\
  !*** ./resources/js/views/NotificationPanel.vue?vue&type=template&id=6a6bff6c ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_NotificationPanel_vue_vue_type_template_id_6a6bff6c__WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   staticRenderFns: () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_NotificationPanel_vue_vue_type_template_id_6a6bff6c__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_NotificationPanel_vue_vue_type_template_id_6a6bff6c__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./NotificationPanel.vue?vue&type=template&id=6a6bff6c */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/NotificationPanel.vue?vue&type=template&id=6a6bff6c");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/NotificationPanel.vue?vue&type=template&id=6a6bff6c":
/*!***********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/NotificationPanel.vue?vue&type=template&id=6a6bff6c ***!
  \***********************************************************************************************************************************************************************************************************************/
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
            _vm._v(_vm._s(_vm.__("notification"))),
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
                      attrs: { to: _vm.getDashboardPath() },
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
                [_vm._v(_vm._s(_vm.__("notification")))]
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
                          input: function ($event) {
                            if ($event.target.composing) {
                              return
                            }
                            _vm.filter = $event.target.value
                          },
                        },
                      }),
                    ]),
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "d-flex gap-2 ms-auto" }, [
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
                            return _vm.getNotifications()
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
              _c("b-table", {
                staticClass: "figma-order-table mb-0",
                attrs: {
                  items: _vm.notifications,
                  fields: _vm.fields,
                  filter: _vm.filter,
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
                    key: "cell(title)",
                    fn: function (row) {
                      return [
                        _c(
                          "router-link",
                          {
                            staticClass: "text-primary font-medium",
                            style: {
                              fontWeight:
                                row.item.read_at == null ? "bold" : "normal",
                            },
                            attrs: {
                              to: _vm.getOrderViewPath(row.item.data.order_id),
                            },
                            on: {
                              click: function ($event) {
                                $event.preventDefault()
                                return _vm.markAsRead(row.item, $event)
                              },
                            },
                          },
                          [
                            _vm._v(
                              "\n                                " +
                                _vm._s(row.item.data.text) +
                                "\n                            "
                            ),
                          ]
                        ),
                      ]
                    },
                  },
                  {
                    key: "cell(created_at)",
                    fn: function (row) {
                      return [
                        _c("span", { staticClass: "text-muted" }, [
                          _vm._v(
                            _vm._s(
                              new Date(row.item.created_at).toLocaleString()
                            )
                          ),
                        ]),
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
            _c("div", { staticClass: "showing-results-text small" }, [
              _vm._v(
                "\n                        " +
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