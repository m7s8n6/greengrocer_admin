"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_views_Sellers_Brands_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Sellers/Brands.vue?vue&type=script&lang=js":
/*!***************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Sellers/Brands.vue?vue&type=script&lang=js ***!
  \***************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var vuejs_datatable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vuejs-datatable */ "./node_modules/vuejs-datatable/dist/vuejs-datatable.esm.js");
/* harmony import */ var _mixins_ViewModeMixin__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../mixins/ViewModeMixin */ "./resources/js/mixins/ViewModeMixin.js");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
  mixins: [_mixins_ViewModeMixin__WEBPACK_IMPORTED_MODULE_1__["default"]],
  components: {
    VuejsDatatableFactory: vuejs_datatable__WEBPACK_IMPORTED_MODULE_0__.VuejsDatatableFactory
  },
  data: function data() {
    return {
      fields: [{
        key: 'id',
        label: __('id'),
        "class": 'text-center',
        sortable: true,
        sortDirection: 'desc'
      }, {
        key: 'name',
        label: __('name'),
        "class": 'text-center'
      }, {
        key: 'image',
        label: __('image'),
        "class": 'text-center'
      }, {
        key: 'status',
        label: __('status'),
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
      // API returns one page (page/per_page): grid shows the array as is
      serverPagination: true,
      filterOn: [],
      page: 1,
      isLoading: false,
      sectionStyle: 'style_1',
      max_visible_units: 12,
      max_col_in_single_row: 3,
      brands: [],
      create_new: null,
      edit_record: null
    };
  },
  watch: {
    // Re-fetch when page changes
    currentPage: function currentPage() {
      this.getRecords();
    },
    // Re-fetch when per-page changes and reset to page 1
    perPage: function perPage() {
      this.currentPage = 1;
      this.getRecords();
    },
    // Re-fetch when search filter changes and reset to page 1
    filter: function filter() {
      this.currentPage = 1;
      this.getRecords();
    }
  },
  created: function created() {
    var _this = this;
    this.$eventBus.$on('recordSaved', function (message) {
      _this.showMessage('success', message);
      _this.getRecords();
    });
    this.getRecords();
  },
  methods: {
    getRecords: function getRecords() {
      var _this2 = this;
      this.isLoading = true;
      // Pass page, per_page, and filter so the API handles server-side pagination
      axios.get(this.$apiUrl + '/products/brands', {
        params: {
          page: this.currentPage,
          per_page: this.perPage,
          filter: this.filter || ''
        }
      }).then(function (response) {
        _this2.isLoading = false;
        var data = response.data;
        _this2.brands = data.data;
        // Use the total count from API for correct pagination
        _this2.totalRows = data.total;
      });
    },
    deleteRecord: function deleteRecord(index, id) {
      var _this3 = this;
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
          _this3.isLoading = true;
          var postData = {
            id: id
          };
          axios.post(_this3.$apiUrl + '/products/brands/delete', postData).then(function (response) {
            _this3.isLoading = false;
            var data = response.data;
            _this3.brands.splice(index, 1);
            _this3.showMessage('success', data.message);
          });
        }
      });
    }
  }
});

/***/ }),

/***/ "./resources/js/mixins/ViewModeMixin.js":
/*!**********************************************!*\
  !*** ./resources/js/mixins/ViewModeMixin.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
/**
 * Grid / list view switch for list pages.
 *
 * Provides `viewMode` ('grid' | 'list'), remembered per page (route path) in localStorage,
 * and `pagedItems(items)`: the slice of `items` the b-table list view shows for the current
 * page, so the grid view always shows the same records as the table.
 *
 * Usage: mixins: [ViewModeMixin]; markup: the shared `.view-toggle` buttons calling
 * setViewMode('grid'|'list'), and an `.item-grid` of `.item-card`s rendered from
 * pagedItems(sameArrayAsTheTable). Set `serverPagination: true` in data() when the API
 * already returns one page (then pagedItems returns the array as is).
 */
var STORAGE_KEY = 'list_view_mode';
function readModes() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  } catch (e) {
    return {};
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  data: function data() {
    var saved = readModes()[this.$route ? this.$route.path : ''];
    return {
      viewMode: ['list', 'tree'].includes(saved) ? saved : 'grid'
    };
  },
  methods: {
    setViewMode: function setViewMode(mode) {
      this.viewMode = mode;
      try {
        var modes = readModes();
        modes[this.$route.path] = mode;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(modes));
      } catch (e) {
        // Storage blocked: the choice just isn't remembered.
      }
    },
    // Same client-side search the b-table `:filter` prop applies: case-insensitive match of the
    // page's `filter` text across all fields (or only `includeFields`), keys starting with "_" skipped.
    gridFilter: function gridFilter(items, includeFields) {
      var list = Array.isArray(items) ? items : [];
      var text = this.filter === null || this.filter === undefined ? '' : String(this.filter).trim();
      if (!text) return list;
      var re = new RegExp(text.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&').replace(/\s+/g, '\\s+'), 'i');
      var stringify = function stringify(value) {
        if (value === null || value === undefined) return '';
        if (_typeof(value) === 'object') return Object.keys(value).filter(function (k) {
          return k.charAt(0) !== '_';
        }).map(function (k) {
          return stringify(value[k]);
        }).join(' ');
        return String(value);
      };
      return list.filter(function (item) {
        var keys = includeFields && includeFields.length ? includeFields : Object.keys(item).filter(function (k) {
          return k.charAt(0) !== '_';
        });
        return re.test(keys.map(function (k) {
          return stringify(item[k]);
        }).join(' '));
      });
    },
    // Same order as the b-table's synced `sortBy` / `sortDesc` (dotted keys supported).
    gridSort: function gridSort(items) {
      var _this = this;
      var list = Array.isArray(items) ? items.slice() : [];
      if (!this.sortBy) return list;
      var dir = this.sortDesc ? -1 : 1;
      var val = function val(o) {
        return String(_this.sortBy).split('.').reduce(function (a, k) {
          return a == null ? a : a[k];
        }, o);
      };
      return list.sort(function (a, b) {
        var x = val(a);
        var y = val(b);
        if (x === y) return 0;
        if (x === null || x === undefined) return -dir;
        if (y === null || y === undefined) return dir;
        var nx = Number(x);
        var ny = Number(y);
        if (x !== '' && y !== '' && !isNaN(nx) && !isNaN(ny)) return (nx - ny) * dir;
        return String(x).localeCompare(String(y), undefined, {
          numeric: true
        }) * dir;
      });
    },
    gridFilterSort: function gridFilterSort(items, includeFields) {
      return this.gridSort(this.gridFilter(items, includeFields));
    },
    // First letter of a name for avatar placeholders.
    initial: function initial(name) {
      return ((name || '?').toString().trim().charAt(0) || '?').toUpperCase();
    },
    pagedItems: function pagedItems(items) {
      var list = Array.isArray(items) ? items : [];
      if (this.serverPagination) return list;
      var perPage = Number(this.perPage) || list.length || 1;
      var page = Number(this.currentPage) || 1;
      return list.slice((page - 1) * perPage, page * perPage);
    }
  }
});

/***/ }),

/***/ "./resources/js/views/Sellers/Brands.vue":
/*!***********************************************!*\
  !*** ./resources/js/views/Sellers/Brands.vue ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Brands_vue_vue_type_template_id_6094e2e6__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Brands.vue?vue&type=template&id=6094e2e6 */ "./resources/js/views/Sellers/Brands.vue?vue&type=template&id=6094e2e6");
/* harmony import */ var _Brands_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Brands.vue?vue&type=script&lang=js */ "./resources/js/views/Sellers/Brands.vue?vue&type=script&lang=js");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Brands_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _Brands_vue_vue_type_template_id_6094e2e6__WEBPACK_IMPORTED_MODULE_0__.render,
  _Brands_vue_vue_type_template_id_6094e2e6__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/Sellers/Brands.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/views/Sellers/Brands.vue?vue&type=script&lang=js":
/*!***********************************************************************!*\
  !*** ./resources/js/views/Sellers/Brands.vue?vue&type=script&lang=js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Brands_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Brands.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Sellers/Brands.vue?vue&type=script&lang=js");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Brands_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/Sellers/Brands.vue?vue&type=template&id=6094e2e6":
/*!*****************************************************************************!*\
  !*** ./resources/js/views/Sellers/Brands.vue?vue&type=template&id=6094e2e6 ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Brands_vue_vue_type_template_id_6094e2e6__WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   staticRenderFns: () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Brands_vue_vue_type_template_id_6094e2e6__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Brands_vue_vue_type_template_id_6094e2e6__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Brands.vue?vue&type=template&id=6094e2e6 */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Sellers/Brands.vue?vue&type=template&id=6094e2e6");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Sellers/Brands.vue?vue&type=template&id=6094e2e6":
/*!********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Sellers/Brands.vue?vue&type=template&id=6094e2e6 ***!
  \********************************************************************************************************************************************************************************************************************/
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
      _c("div", { staticClass: "page-title mb-3" }, [
        _c(
          "div",
          {
            staticClass:
              "d-flex justify-content-between align-items-center flex-wrap gap-2",
          },
          [
            _c("h3", { staticClass: "modern-page-title mb-0" }, [
              _vm._v(_vm._s(_vm.__("brands"))),
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
                        attrs: { to: "/seller/dashboard" },
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
                  [_vm._v(_vm._s(_vm.__("brands")))]
                ),
              ]),
            ]),
          ]
        ),
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
                      attrs: { type: "text", placeholder: _vm.__("search") },
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
                _c("div", { staticClass: "d-flex flex-wrap gap-2" }, [
                  _c(
                    "div",
                    {
                      staticClass: "view-toggle",
                      attrs: { role: "group", "aria-label": _vm.__("view") },
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
                          staticClass: "view-toggle-btn",
                          class: { active: _vm.viewMode === "grid" },
                          attrs: { type: "button", title: _vm.__("grid_view") },
                          on: {
                            click: function ($event) {
                              return _vm.setViewMode("grid")
                            },
                          },
                        },
                        [_c("i", { staticClass: "bi bi-grid-3x3-gap-fill" })]
                      ),
                      _vm._v(" "),
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
                          staticClass: "view-toggle-btn",
                          class: { active: _vm.viewMode === "list" },
                          attrs: { type: "button", title: _vm.__("list_view") },
                          on: {
                            click: function ($event) {
                              return _vm.setViewMode("list")
                            },
                          },
                        },
                        [_c("i", { staticClass: "bi bi-list-ul" })]
                      ),
                    ]
                  ),
                  _vm._v(" "),
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
                        "btn btn-figma-columns d-flex align-items-center gap-2",
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
                      _c("span", [_vm._v(_vm._s(_vm.__("refresh")))]),
                    ]
                  ),
                ]),
              ]
            ),
            _vm._v(" "),
            _c(
              "div",
              { staticClass: "table-responsive mb-0" },
              [
                _vm.viewMode === "grid"
                  ? _c("div", [
                      _vm.isLoading
                        ? _c("div", { staticClass: "item-grid-state" }, [
                            _c("i", { staticClass: "bi bi-hourglass-split" }),
                            _vm._v(" "),
                            _c("span", [
                              _vm._v(_vm._s(_vm.__("loading")) + "..."),
                            ]),
                          ])
                        : !_vm.brands.length
                        ? _c("div", { staticClass: "item-grid-state" }, [
                            _c("i", { staticClass: "bi bi-inbox" }),
                            _vm._v(" "),
                            _c("span", [
                              _vm._v(_vm._s(_vm.__("no_records_to_show"))),
                            ]),
                          ])
                        : _c(
                            "div",
                            { staticClass: "item-grid" },
                            _vm._l(
                              _vm.pagedItems(_vm.brands),
                              function (brand) {
                                return _c(
                                  "div",
                                  { key: brand.id, staticClass: "item-card" },
                                  [
                                    _c(
                                      "div",
                                      { staticClass: "item-card-media" },
                                      [
                                        _c("img", {
                                          attrs: {
                                            src: brand.image
                                              ? _vm.$storageUrl + brand.image
                                              : _vm.$placeholderImage,
                                            alt: brand.name,
                                          },
                                        }),
                                      ]
                                    ),
                                    _vm._v(" "),
                                    _c(
                                      "div",
                                      { staticClass: "item-card-body" },
                                      [
                                        _c(
                                          "div",
                                          {
                                            staticClass: "item-card-title",
                                            attrs: { title: brand.name },
                                          },
                                          [_vm._v(_vm._s(brand.name))]
                                        ),
                                        _vm._v(" "),
                                        _c(
                                          "div",
                                          { staticClass: "item-card-meta" },
                                          [_vm._v("#" + _vm._s(brand.id))]
                                        ),
                                      ]
                                    ),
                                    _vm._v(" "),
                                    _c(
                                      "div",
                                      { staticClass: "item-card-footer" },
                                      [
                                        brand.status == 1
                                          ? _c(
                                              "span",
                                              {
                                                staticClass: "badge bg-success",
                                              },
                                              [_vm._v(_vm._s(_vm.__("active")))]
                                            )
                                          : _c(
                                              "span",
                                              {
                                                staticClass: "badge bg-danger",
                                              },
                                              [
                                                _vm._v(
                                                  _vm._s(_vm.__("deactive"))
                                                ),
                                              ]
                                            ),
                                      ]
                                    ),
                                  ]
                                )
                              }
                            ),
                            0
                          ),
                    ])
                  : _c("b-table", {
                      staticClass: "mb-0",
                      attrs: {
                        items: _vm.brands,
                        fields: _vm.fields,
                        "sort-by": _vm.sortBy,
                        "sort-desc": _vm.sortDesc,
                        "sort-direction": _vm.sortDirection,
                        bordered: false,
                        busy: _vm.isLoading,
                        stacked: "md",
                        "show-empty": "",
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
                          key: "cell(id)",
                          fn: function (row) {
                            return [
                              _vm._v(
                                "\n                                " +
                                  _vm._s(row.item.id) +
                                  "\n                            "
                              ),
                            ]
                          },
                        },
                        {
                          key: "cell(image)",
                          fn: function (row) {
                            return [
                              _c("img", {
                                staticClass: "brand-thumb",
                                attrs: {
                                  src: row.item.image
                                    ? _vm.$storageUrl + row.item.image
                                    : _vm.$placeholderImage,
                                  height: "50",
                                },
                              }),
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
                                : _c(
                                    "span",
                                    { staticClass: "badge bg-danger" },
                                    [_vm._v(_vm._s(_vm.__("deactive")))]
                                  ),
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
                                      attrs: { title: _vm.__("edit") },
                                      on: {
                                        click: function ($event) {
                                          _vm.edit_record = row.item
                                        },
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
                                  ),
                                  _vm._v(" "),
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
                                          return _vm.deleteRecord(
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
                { staticClass: "d-flex align-items-center gap-2" },
                [
                  _c("label", { staticClass: "showing-results-text mb-0" }, [
                    _vm._v(_vm._s(_vm.__("per_page"))),
                  ]),
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