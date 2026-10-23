"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_views_Setting_SettingsHub_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Setting/SettingsHub.vue?vue&type=script&lang=js":
/*!********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Setting/SettingsHub.vue?vue&type=script&lang=js ***!
  \********************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_settingsCatalog_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/settingsCatalog.js */ "./resources/js/utils/settingsCatalog.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


// Settings hub: one grouped grid of every setting page.
// Card list mirrors the sidebar entries that used to live in the "System" / "Web Settings"
// submenus (plus Theme / Delivery settings and the policy pages) with the same url and the same
// visibility check as the sidebar (sub.role ? $role('Super Admin') : sub.permission && $can(sub.permission)).
// Store Settings sections open /store_settings?section=<key>.
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'SettingsHub',
  data: function data() {
    return {
      search: ''
    };
  },
  computed: {
    catalog: function catalog() {
      return (0,_utils_settingsCatalog_js__WEBPACK_IMPORTED_MODULE_0__.settingsCatalog)(this);
    },
    visibleGroups: function visibleGroups() {
      var _this = this;
      var q = this.search.toLowerCase();
      return this.catalog.map(function (group) {
        return _objectSpread(_objectSpread({}, group), {}, {
          cards: group.cards.filter(function (card) {
            return _this.canSee(card) && (!q || String(card.title).toLowerCase().includes(q) || String(card.desc).toLowerCase().includes(q));
          })
        });
      }).filter(function (group) {
        return group.cards.length > 0;
      });
    }
  },
  methods: {
    // __() returns the key itself when a translation is missing - fall back to English text.
    tr: function tr(key, fallback) {
      var v = this.__(key);
      return v && v !== key ? v : fallback;
    },
    // Same visibility rule the sidebar uses for its sub-entries.
    canSee: function canSee(card) {
      return (0,_utils_settingsCatalog_js__WEBPACK_IMPORTED_MODULE_0__.canSeeSetting)(this, card);
    }
  }
});

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Setting/SettingsHub.vue?vue&type=style&index=0&id=2e0969a4&scoped=true&lang=css":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Setting/SettingsHub.vue?vue&type=style&index=0&id=2e0969a4&scoped=true&lang=css ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
___CSS_LOADER_EXPORT___.push([module.id, "\n.settings-hub-head[data-v-2e0969a4] {\n    display: flex;\n    align-items: flex-end;\n    justify-content: space-between;\n    gap: 16px;\n    flex-wrap: wrap;\n}\n.settings-hub-head__text[data-v-2e0969a4] {\n    min-width: 0;\n}\n.settings-hub-search[data-v-2e0969a4] {\n    flex: 0 1 320px;\n    min-width: 220px;\n}\n.settings-hub-search .figma-search-input[data-v-2e0969a4] {\n    width: 100%;\n}\n.settings-hub-group[data-v-2e0969a4] {\n    margin-bottom: 28px;\n}\n.settings-hub-group__title[data-v-2e0969a4] {\n    font-family: var(--ui-font);\n    font-size: 12px;\n    font-weight: 700;\n    letter-spacing: .06em;\n    text-transform: uppercase;\n    color: var(--ui-text-muted);\n    margin: 0 0 12px;\n}\nbody.theme-dark .settings-hub-group__title[data-v-2e0969a4] {\n    color: var(--ui-text-muted) !important; /* beats the global dark-mode heading colour reset */\n}\n.settings-hub-grid[data-v-2e0969a4] {\n    display: grid;\n    grid-template-columns: repeat(4, minmax(0, 1fr));\n    gap: 16px;\n}\n@media (max-width: 1199.98px) {\n.settings-hub-grid[data-v-2e0969a4] { grid-template-columns: repeat(3, minmax(0, 1fr));\n}\n}\n@media (max-width: 991.98px) {\n.settings-hub-grid[data-v-2e0969a4] { grid-template-columns: repeat(2, minmax(0, 1fr));\n}\n}\n@media (max-width: 575.98px) {\n.settings-hub-grid[data-v-2e0969a4] { grid-template-columns: minmax(0, 1fr); gap: 12px;\n}\n#main .settings-hub-search[data-v-2e0969a4] { flex: 1 1 100%; min-width: 0; max-width: none;\n}\n}\n.settings-hub-card[data-v-2e0969a4] {\n    display: flex;\n    flex-direction: column;\n    align-items: flex-start;\n    gap: 6px;\n    height: 100%;\n    padding: 18px;\n    background: var(--ui-surface);\n    border: 1px solid var(--ui-border);\n    border-radius: var(--ui-radius-lg);\n    box-shadow: var(--ui-shadow);\n    font-family: var(--ui-font);\n    text-decoration: none;\n    text-align: start;\n    transition: transform .18s ease, box-shadow .18s ease, border-color .18s ease;\n}\n.settings-hub-card[data-v-2e0969a4]:hover,\n.settings-hub-card[data-v-2e0969a4]:focus-visible {\n    transform: translateY(-3px);\n    box-shadow: var(--ui-shadow-lg);\n    border-color: color-mix(in srgb, var(--theme-primary-500) 35%, var(--ui-border));\n    text-decoration: none;\n}\n.settings-hub-card[data-v-2e0969a4]:focus-visible {\n    outline: 2px solid var(--theme-primary-500);\n    outline-offset: 2px;\n}\nbody.theme-dark .settings-hub-card[data-v-2e0969a4] {\n    background: var(--theme-neutral-800);\n    border-color: var(--theme-neutral-700);\n}\n.settings-hub-card__icon[data-v-2e0969a4] {\n    display: inline-flex;\n    align-items: center;\n    justify-content: center;\n    width: 44px;\n    height: 44px;\n    border-radius: var(--ui-radius-lg);\n    margin-bottom: 8px;\n    font-size: 18px;\n    flex: 0 0 auto;\n    background: color-mix(in srgb, var(--theme-primary-500) 12%, transparent);\n    color: var(--theme-primary-600);\n}\nbody.theme-dark .settings-hub-card__icon i[data-v-2e0969a4] {\n    color: var(--theme-primary-400) !important; /* global dark reset would turn the icon white */\n}\n.settings-hub-card__title[data-v-2e0969a4] {\n    font-size: 15px;\n    font-weight: 700;\n    line-height: 1.3;\n    color: var(--ui-heading);\n}\n.settings-hub-card__desc[data-v-2e0969a4] {\n    font-size: 13px;\n    font-weight: 400;\n    line-height: 1.45;\n    color: var(--ui-text-muted);\n    flex: 1 1 auto;\n}\n.settings-hub-card__link[data-v-2e0969a4] {\n    display: inline-flex;\n    align-items: center;\n    gap: 6px;\n    margin-top: 6px;\n    font-size: 13px;\n    font-weight: 600;\n    color: var(--theme-primary-600);\n}\n.settings-hub-card__arrow[data-v-2e0969a4] {\n    font-size: 11px;\n    transition: transform .18s ease;\n}\n.settings-hub-card:hover .settings-hub-card__arrow[data-v-2e0969a4] {\n    transform: translateX(3px);\n}\n[dir=\"rtl\"] .settings-hub-card__arrow[data-v-2e0969a4],\n.rtl .settings-hub-card__arrow[data-v-2e0969a4] {\n    transform: scaleX(-1);\n}\n[dir=\"rtl\"] .settings-hub-card:hover .settings-hub-card__arrow[data-v-2e0969a4],\n.rtl .settings-hub-card:hover .settings-hub-card__arrow[data-v-2e0969a4] {\n    transform: scaleX(-1) translateX(3px);\n}\n/* Global dark-mode reset forces light text on every span - keep the card's text hierarchy */\nbody.theme-dark .settings-hub-card__title[data-v-2e0969a4] { color: var(--ui-heading) !important;\n}\nbody.theme-dark .settings-hub-card__desc[data-v-2e0969a4] { color: var(--ui-text-muted) !important;\n}\nbody.theme-dark .settings-hub-card__link[data-v-2e0969a4],\nbody.theme-dark .settings-hub-card__link i[data-v-2e0969a4] { color: var(--theme-primary-400) !important;\n}\n.settings-hub-empty[data-v-2e0969a4] {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    gap: 8px;\n    padding: 40px 16px !important;\n    color: var(--ui-text-muted);\n    text-align: center;\n}\n.settings-hub-empty i[data-v-2e0969a4] {\n    font-size: 24px;\n    color: var(--ui-text-subtle);\n}\nbody.theme-dark .settings-hub-empty p[data-v-2e0969a4] { color: var(--ui-text-muted) !important;\n}\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Setting/SettingsHub.vue?vue&type=style&index=0&id=2e0969a4&scoped=true&lang=css":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Setting/SettingsHub.vue?vue&type=style&index=0&id=2e0969a4&scoped=true&lang=css ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_SettingsHub_vue_vue_type_style_index_0_id_2e0969a4_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./SettingsHub.vue?vue&type=style&index=0&id=2e0969a4&scoped=true&lang=css */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Setting/SettingsHub.vue?vue&type=style&index=0&id=2e0969a4&scoped=true&lang=css");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_SettingsHub_vue_vue_type_style_index_0_id_2e0969a4_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_SettingsHub_vue_vue_type_style_index_0_id_2e0969a4_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./resources/js/views/Setting/SettingsHub.vue":
/*!****************************************************!*\
  !*** ./resources/js/views/Setting/SettingsHub.vue ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _SettingsHub_vue_vue_type_template_id_2e0969a4_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SettingsHub.vue?vue&type=template&id=2e0969a4&scoped=true */ "./resources/js/views/Setting/SettingsHub.vue?vue&type=template&id=2e0969a4&scoped=true");
/* harmony import */ var _SettingsHub_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SettingsHub.vue?vue&type=script&lang=js */ "./resources/js/views/Setting/SettingsHub.vue?vue&type=script&lang=js");
/* harmony import */ var _SettingsHub_vue_vue_type_style_index_0_id_2e0969a4_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./SettingsHub.vue?vue&type=style&index=0&id=2e0969a4&scoped=true&lang=css */ "./resources/js/views/Setting/SettingsHub.vue?vue&type=style&index=0&id=2e0969a4&scoped=true&lang=css");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _SettingsHub_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _SettingsHub_vue_vue_type_template_id_2e0969a4_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render,
  _SettingsHub_vue_vue_type_template_id_2e0969a4_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "2e0969a4",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/Setting/SettingsHub.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/views/Setting/SettingsHub.vue?vue&type=script&lang=js":
/*!****************************************************************************!*\
  !*** ./resources/js/views/Setting/SettingsHub.vue?vue&type=script&lang=js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SettingsHub_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./SettingsHub.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Setting/SettingsHub.vue?vue&type=script&lang=js");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SettingsHub_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/Setting/SettingsHub.vue?vue&type=style&index=0&id=2e0969a4&scoped=true&lang=css":
/*!************************************************************************************************************!*\
  !*** ./resources/js/views/Setting/SettingsHub.vue?vue&type=style&index=0&id=2e0969a4&scoped=true&lang=css ***!
  \************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_SettingsHub_vue_vue_type_style_index_0_id_2e0969a4_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/style-loader/dist/cjs.js!../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./SettingsHub.vue?vue&type=style&index=0&id=2e0969a4&scoped=true&lang=css */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Setting/SettingsHub.vue?vue&type=style&index=0&id=2e0969a4&scoped=true&lang=css");


/***/ }),

/***/ "./resources/js/views/Setting/SettingsHub.vue?vue&type=template&id=2e0969a4&scoped=true":
/*!**********************************************************************************************!*\
  !*** ./resources/js/views/Setting/SettingsHub.vue?vue&type=template&id=2e0969a4&scoped=true ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_SettingsHub_vue_vue_type_template_id_2e0969a4_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   staticRenderFns: () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_SettingsHub_vue_vue_type_template_id_2e0969a4_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_SettingsHub_vue_vue_type_template_id_2e0969a4_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./SettingsHub.vue?vue&type=template&id=2e0969a4&scoped=true */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Setting/SettingsHub.vue?vue&type=template&id=2e0969a4&scoped=true");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Setting/SettingsHub.vue?vue&type=template&id=2e0969a4&scoped=true":
/*!*************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Setting/SettingsHub.vue?vue&type=template&id=2e0969a4&scoped=true ***!
  \*************************************************************************************************************************************************************************************************************************************/
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
  return _c("div", { staticClass: "settings-hub" }, [
    _c("div", { staticClass: "page-heading" }, [
      _c("div", { staticClass: "page-title" }, [
        _c("div", { staticClass: "settings-hub-head" }, [
          _c("div", { staticClass: "settings-hub-head__text" }, [
            _c("h3", [_vm._v(_vm._s(_vm.__("settings")))]),
            _vm._v(" "),
            _c("p", { staticClass: "text-subtitle mb-0" }, [
              _vm._v(
                _vm._s(
                  _vm.tr(
                    "settings_hub_subtitle",
                    "Manage your store, delivery, payments, communication and system configuration."
                  )
                )
              ),
            ]),
          ]),
          _vm._v(" "),
          _c(
            "div",
            { staticClass: "figma-search-container settings-hub-search" },
            [
              _c("i", {
                staticClass: "fa fa-search",
                attrs: { "aria-hidden": "true" },
              }),
              _vm._v(" "),
              _c("input", {
                directives: [
                  {
                    name: "model",
                    rawName: "v-model.trim",
                    value: _vm.search,
                    expression: "search",
                    modifiers: { trim: true },
                  },
                ],
                staticClass: "figma-search-input",
                attrs: {
                  type: "search",
                  placeholder: _vm.tr("search_settings", "Search settings…"),
                  "aria-label": _vm.tr("search_settings", "Search settings…"),
                },
                domProps: { value: _vm.search },
                on: {
                  input: function ($event) {
                    if ($event.target.composing) {
                      return
                    }
                    _vm.search = $event.target.value.trim()
                  },
                  blur: function ($event) {
                    return _vm.$forceUpdate()
                  },
                },
              }),
            ]
          ),
        ]),
      ]),
    ]),
    _vm._v(" "),
    _c(
      "section",
      { staticClass: "section" },
      [
        _vm._l(_vm.visibleGroups, function (group) {
          return _c(
            "div",
            { key: group.key, staticClass: "settings-hub-group" },
            [
              _c("h6", { staticClass: "settings-hub-group__title" }, [
                _vm._v(_vm._s(group.title)),
              ]),
              _vm._v(" "),
              _c(
                "div",
                { staticClass: "settings-hub-grid" },
                _vm._l(group.cards, function (card) {
                  return _c(
                    "router-link",
                    {
                      key: card.key,
                      staticClass: "settings-hub-card",
                      attrs: { to: card.to },
                    },
                    [
                      _c(
                        "span",
                        {
                          staticClass: "settings-hub-card__icon",
                          attrs: { "aria-hidden": "true" },
                        },
                        [_c("i", { class: card.icon })]
                      ),
                      _vm._v(" "),
                      _c("span", { staticClass: "settings-hub-card__title" }, [
                        _vm._v(_vm._s(card.title)),
                      ]),
                      _vm._v(" "),
                      _c("span", { staticClass: "settings-hub-card__desc" }, [
                        _vm._v(_vm._s(card.desc)),
                      ]),
                      _vm._v(" "),
                      _c("span", { staticClass: "settings-hub-card__link" }, [
                        _vm._v(
                          "\n                        " +
                            _vm._s(_vm.tr("go_to_settings", "Go to settings")) +
                            "\n                        "
                        ),
                        _c("i", {
                          staticClass:
                            "fas fa-arrow-right settings-hub-card__arrow",
                          attrs: { "aria-hidden": "true" },
                        }),
                      ]),
                    ]
                  )
                }),
                1
              ),
            ]
          )
        }),
        _vm._v(" "),
        _vm.visibleGroups.length === 0
          ? _c("div", { staticClass: "card" }, [
              _c("div", { staticClass: "card-body settings-hub-empty" }, [
                _c("i", {
                  staticClass: "fas fa-search",
                  attrs: { "aria-hidden": "true" },
                }),
                _vm._v(" "),
                _c("p", { staticClass: "mb-0" }, [
                  _vm._v(
                    _vm._s(
                      _vm.tr(
                        "no_settings_found",
                        "No settings match your search."
                      )
                    )
                  ),
                ]),
              ]),
            ])
          : _vm._e(),
      ],
      2
    ),
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ })

}]);