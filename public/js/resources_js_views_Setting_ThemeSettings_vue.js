"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_views_Setting_ThemeSettings_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Setting/ThemeSettings.vue?vue&type=script&lang=js":
/*!**********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Setting/ThemeSettings.vue?vue&type=script&lang=js ***!
  \**********************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


var STOPS = {
  '50': .95,
  '100': .90,
  '200': .80,
  '300': .70,
  '400': .60,
  '500': .50,
  '600': .40,
  '700': .30,
  '800': .20,
  '900': .10,
  '950': .05
};
function hexToHsl(hex) {
  var r = parseInt(hex.slice(1, 3), 16) / 255,
    g = parseInt(hex.slice(3, 5), 16) / 255,
    b = parseInt(hex.slice(5, 7), 16) / 255;
  var max = Math.max(r, g, b),
    min = Math.min(r, g, b),
    d = max - min;
  var h = 0,
    s = 0,
    l = (max + min) / 2;
  var denom = 1 - Math.abs(2 * l - 1);
  if (d && denom) {
    s = d / denom;
    h = max === r ? (g - b) / d : max === g ? (b - r) / d + 2 : (r - g) / d + 4;
    h = (h < 0 ? h + 6 : h) * 60;
  }
  return {
    h: h,
    s: s
  };
}
function hslToHex(h, s, l) {
  var c = (1 - Math.abs(2 * l - 1)) * s,
    x = c * (1 - Math.abs(h / 60 % 2 - 1)),
    m = l - c / 2;
  var r = 0,
    g = 0,
    b = 0;
  if (h < 60) {
    r = c;
    g = x;
  } else if (h < 120) {
    r = x;
    g = c;
  } else if (h < 180) {
    g = c;
    b = x;
  } else if (h < 240) {
    g = x;
    b = c;
  } else if (h < 300) {
    r = x;
    b = c;
  } else {
    r = c;
    b = x;
  }
  var hex = function hex(v) {
    return Math.round(Math.max(0, Math.min(255, (v + m) * 255))).toString(16).padStart(2, '0');
  };
  return '#' + hex(r) + hex(g) + hex(b);
}
function generatePalette(seed) {
  var _hexToHsl = hexToHsl(seed),
    h = _hexToHsl.h,
    s = _hexToHsl.s;
  var palette = {};
  Object.entries(STOPS).forEach(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
      stop = _ref2[0],
      l = _ref2[1];
    palette[stop] = stop === '500' ? seed : hslToHex(h, s, l);
  });
  return palette;
}
var NEUTRAL_STOPS = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'];
var NEUTRAL_CURVE_SOFT = [{
  x: 0,
  y: 0
}, {
  x: .25,
  y: .15
}, {
  x: .5,
  y: .5
}, {
  x: .75,
  y: .85
}, {
  x: 1,
  y: 1
}];
function hexToRgb(hex) {
  var h = hex.replace('#', '');
  var f = h.length === 3 ? h.split('').map(function (c) {
    return c + c;
  }).join('') : h;
  return [parseInt(f.slice(0, 2), 16), parseInt(f.slice(2, 4), 16), parseInt(f.slice(4, 6), 16)];
}
function rgbToHex(rgb) {
  var to = function to(v) {
    return Math.round(Math.max(0, Math.min(255, v))).toString(16).padStart(2, '0');
  };
  return '#' + to(rgb[0]) + to(rgb[1]) + to(rgb[2]);
}
function lerpRgb(c1, c2, r) {
  return [0, 1, 2].map(function (i) {
    return c1[i] + (c2[i] - c1[i]) * r;
  });
}
function catmullRomEval(points, t) {
  var n = points.length;
  var seg = 0;
  for (var i = 0; i < n - 1; i++) {
    if (t >= points[i].x && t <= points[i + 1].x) {
      seg = i;
      break;
    }
  }
  var p0 = points[Math.max(0, seg - 1)],
    p1 = points[seg],
    p2 = points[Math.min(n - 1, seg + 1)],
    p3 = points[Math.min(n - 1, seg + 2)];
  var span = p2.x - p1.x;
  var d = span < 1e-9 ? 0 : Math.min(1, Math.max(0, (t - p1.x) / span));
  var d2 = d * d;
  var y = 0.5 * (2 * p1.y + (-p0.y + p2.y) * d + (2 * p0.y - 5 * p1.y + 4 * p2.y - p3.y) * d2 + (-p0.y + 3 * p1.y - 3 * p2.y + p3.y) * (d2 * d));
  return Math.min(1, Math.max(0, y));
}
function generateNeutralPalette(seed) {
  var seedRgb = hexToRgb(seed);
  var dark = [0, 0, 0],
    light = [255, 255, 255];
  var palette = {};
  NEUTRAL_STOPS.forEach(function (stop, t) {
    var T = 1 - t / 10;
    var y = catmullRomEval(NEUTRAL_CURVE_SOFT, T);
    var rgb = y <= 0.5 ? lerpRgb(dark, seedRgb, 2 * y) : lerpRgb(seedRgb, light, (y - 0.5) * 2);
    palette[stop] = rgbToHex(rgb);
  });
  return palette;
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  data: function data() {
    return {
      isLoading: false,
      isDefaultModule: true,
      statusTypes: ['success', 'error', 'warn', 'info'],
      seeds: {
        light_seed_primary: '#FF9900',
        light_seed_neutral: '#FFFFFF'
      },
      statusSeeds: {
        success: '#20B364',
        error: '#D63031',
        warn: '#F79E1B',
        info: '#2196F3'
      },
      statusLoading: {
        success: false,
        error: false,
        warn: false,
        info: false
      },
      theme: {
        success: {},
        error: {},
        warn: {},
        info: {}
      },
      preview: {
        light: {
          primary: {},
          neutral: {}
        }
      }
    };
  },
  created: function created() {
    this.getTheme();
  },
  methods: {
    getTheme: function getTheme() {
      var _this = this;
      axios__WEBPACK_IMPORTED_MODULE_0___default().get(this.$apiUrl + '/theme').then(function (response) {
        var all = response.data.data;
        var activeModuleId = Number(localStorage.getItem('active_module_id')) || 1;
        var data = all && all[activeModuleId];
        if (!data) return;
        _this.theme = data;
        _this.isDefaultModule = !!data.module_is_default;
        _this.seeds.light_seed_primary = data.seed_primary;
        _this.seeds.light_seed_neutral = data.seed_neutral;
        _this.preview.light.primary = data.primary;
        _this.preview.light.neutral = data.neutral;
        _this.statusTypes.forEach(function (type) {
          if (data[type] && data[type]['500']) _this.statusSeeds[type] = data[type]['500'];
        });
      });
    },
    previewPalette: function previewPalette(mode, role) {
      var seed = this.seeds[mode + '_seed_' + role];
      this.preview[mode][role] = role === 'neutral' ? generateNeutralPalette(seed) : generatePalette(seed);
    },
    // Same floor as the backend's own check (luma > 158, i.e. lighter than #9E9E9E) - catch
    // it before the request so the warning shows immediately on save, not after a round trip.
    isNeutralTooLight: function isNeutralTooLight(hex) {
      var clean = (hex || '').replace('#', '');
      if (clean.length !== 6) return false;
      var r = parseInt(clean.substring(0, 2), 16);
      var g = parseInt(clean.substring(2, 4), 16);
      var b = parseInt(clean.substring(4, 6), 16);
      var luma = (r * 299 + g * 587 + b * 114) / 1000;
      return luma > 158;
    },
    saveTheme: function saveTheme() {
      var _this2 = this;
      if (this.isNeutralTooLight(this.seeds.light_seed_neutral)) {
        var fallbackWarning = 'Neutral too light — borders and dividers will be invisible in the app. Pick a colour with some depth (around #9E9E9E or darker).';
        var translated = __('neutral_color_too_light_warning');
        this.showWarning(translated && translated !== 'neutral_color_too_light_warning' ? translated : fallbackWarning);
        return;
      }
      this.isLoading = true;
      var formData = new FormData();
      Object.keys(this.seeds).forEach(function (key) {
        return formData.append(key, _this2.seeds[key]);
      });
      axios__WEBPACK_IMPORTED_MODULE_0___default().post(this.$apiUrl + '/theme/save', formData).then(function (res) {
        var data = res.data;
        _this2.isLoading = false;
        if (data.status === 1) {
          _this2.theme = data.data;
          _this2.showMessage("success", data.message);
        } else {
          _this2.showError(data.message);
        }
      })["catch"](function (error) {
        _this2.isLoading = false;
        _this2.showError(error.message || __('something_went_wrong'));
      });
    },
    saveStatusColor: function saveStatusColor(type) {
      var _this3 = this;
      this.statusLoading[type] = true;
      var formData = new FormData();
      formData.append('seed', this.statusSeeds[type]);
      axios__WEBPACK_IMPORTED_MODULE_0___default().post(this.$apiUrl + '/theme/status/' + type, formData).then(function (res) {
        var data = res.data;
        _this3.statusLoading[type] = false;
        if (data.status === 1) {
          _this3.theme = data.data;
          _this3.showMessage("success", data.message);
        } else {
          _this3.showError(data.message);
        }
      })["catch"](function (error) {
        _this3.statusLoading[type] = false;
        _this3.showError(error.message || __('something_went_wrong'));
      });
    },
    resetStatusColor: function resetStatusColor(type) {
      var _this4 = this;
      this.statusLoading[type] = true;
      axios__WEBPACK_IMPORTED_MODULE_0___default()["delete"](this.$apiUrl + '/theme/status/' + type + '/reset').then(function (res) {
        var data = res.data;
        _this4.statusLoading[type] = false;
        if (data.status === 1) {
          _this4.theme = data.data;
          _this4.statusSeeds[type] = data.data[type]['500'];
          _this4.showMessage("success", data.message);
        } else {
          _this4.showError(data.message);
        }
      })["catch"](function (error) {
        _this4.statusLoading[type] = false;
        _this4.showError(error.message || __('something_went_wrong'));
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Setting/ThemeSettings.vue?vue&type=style&index=0&id=0f7a895e&scoped=true&lang=css":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Setting/ThemeSettings.vue?vue&type=style&index=0&id=0f7a895e&scoped=true&lang=css ***!
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
___CSS_LOADER_EXPORT___.push([module.id, "\n.card-header[data-v-0f7a895e] {\n    border-bottom: none;\n}\n.theme-settings-section .theme-card[data-v-0f7a895e] {\n    border-radius: 12px;\n    border: 1px solid #e9ecef;\n}\n.theme-card-header[data-v-0f7a895e] {\n    display: flex;\n    align-items: flex-start;\n    gap: 10px;\n    margin-bottom: 16px;\n}\n.color-dot[data-v-0f7a895e] {\n    width: 12px;\n    height: 12px;\n    border-radius: 50%;\n    margin-top: 6px;\n    flex-shrink: 0;\n}\n.theme-card-title[data-v-0f7a895e] {\n    margin: 0;\n    font-size: 1rem;\n    font-weight: 600;\n}\n.theme-card-desc[data-v-0f7a895e] {\n    margin: 2px 0 0;\n    font-size: 0.8rem;\n    color: #8592a3;\n}\n.hex-picker-row input[type=\"color\"][data-v-0f7a895e] {\n    flex-shrink: 0;\n}\n.hex-input[data-v-0f7a895e] {\n    width: 110px;\n    margin-left: 10px;\n    text-transform: uppercase;\n    font-family: monospace;\n}\n.palette-preview[data-v-0f7a895e] {\n    display: flex;\n    margin-top: 12px;\n    border-radius: 6px;\n    overflow: hidden;\n}\n.swatch[data-v-0f7a895e] {\n    flex: 1;\n    height: 26px;\n}\n.status-colors-title[data-v-0f7a895e] {\n    margin-top: 8px;\n    margin-bottom: 2px;\n    font-size: 1.1rem;\n    font-weight: 600;\n}\n.status-colors-desc[data-v-0f7a895e] {\n    font-size: 0.85rem;\n    color: #8592a3;\n    margin-bottom: 16px;\n}\n.theme-save-btn[data-v-0f7a895e] {\n    border-radius: 6px;\n}\n.theme-reset-btn[data-v-0f7a895e] {\n    border-radius: 6px;\n}\n.status-mobile-card[data-v-0f7a895e] {\n    border-radius: 12px;\n    border: 1px solid #e9ecef;\n    overflow: hidden;\n}\n.status-mobile-row[data-v-0f7a895e] {\n    border-bottom: 1px solid #e9ecef;\n}\n.status-mobile-row[data-v-0f7a895e]:last-child {\n    border-bottom: none;\n}\n.status-mobile-summary[data-v-0f7a895e] {\n    display: flex;\n    align-items: center;\n    gap: 8px;\n    padding: 14px 16px;\n    cursor: pointer;\n}\n.status-mobile-title[data-v-0f7a895e] {\n    font-weight: 600;\n    flex: 1;\n}\n.status-mobile-hex[data-v-0f7a895e] {\n    font-family: monospace;\n    color: #8592a3;\n    font-size: 0.85rem;\n}\n.status-mobile-chevron[data-v-0f7a895e] {\n    color: #8592a3;\n    transition: transform 0.2s ease;\n}\n.status-mobile-summary:not(.collapsed) .status-mobile-chevron[data-v-0f7a895e] {\n    transform: rotate(180deg);\n}\n.status-mobile-body[data-v-0f7a895e] {\n    padding: 0 16px 16px;\n}\n@media (max-width: 575.98px) {\n.hex-picker-row[data-v-0f7a895e] {\n        flex-wrap: wrap;\n        row-gap: 8px;\n}\n.hex-input[data-v-0f7a895e] {\n        margin-left: 10px;\n}\n.card-footer.d-flex[data-v-0f7a895e] {\n        flex-wrap: wrap;\n        gap: 8px;\n}\n.card-footer.d-flex .btn[data-v-0f7a895e] {\n        flex: 1 1 auto;\n}\n}\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Setting/ThemeSettings.vue?vue&type=style&index=0&id=0f7a895e&scoped=true&lang=css":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Setting/ThemeSettings.vue?vue&type=style&index=0&id=0f7a895e&scoped=true&lang=css ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ThemeSettings_vue_vue_type_style_index_0_id_0f7a895e_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./ThemeSettings.vue?vue&type=style&index=0&id=0f7a895e&scoped=true&lang=css */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Setting/ThemeSettings.vue?vue&type=style&index=0&id=0f7a895e&scoped=true&lang=css");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ThemeSettings_vue_vue_type_style_index_0_id_0f7a895e_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ThemeSettings_vue_vue_type_style_index_0_id_0f7a895e_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./resources/js/views/Setting/ThemeSettings.vue":
/*!******************************************************!*\
  !*** ./resources/js/views/Setting/ThemeSettings.vue ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ThemeSettings_vue_vue_type_template_id_0f7a895e_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ThemeSettings.vue?vue&type=template&id=0f7a895e&scoped=true */ "./resources/js/views/Setting/ThemeSettings.vue?vue&type=template&id=0f7a895e&scoped=true");
/* harmony import */ var _ThemeSettings_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ThemeSettings.vue?vue&type=script&lang=js */ "./resources/js/views/Setting/ThemeSettings.vue?vue&type=script&lang=js");
/* harmony import */ var _ThemeSettings_vue_vue_type_style_index_0_id_0f7a895e_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ThemeSettings.vue?vue&type=style&index=0&id=0f7a895e&scoped=true&lang=css */ "./resources/js/views/Setting/ThemeSettings.vue?vue&type=style&index=0&id=0f7a895e&scoped=true&lang=css");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _ThemeSettings_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _ThemeSettings_vue_vue_type_template_id_0f7a895e_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render,
  _ThemeSettings_vue_vue_type_template_id_0f7a895e_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "0f7a895e",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/Setting/ThemeSettings.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/views/Setting/ThemeSettings.vue?vue&type=script&lang=js":
/*!******************************************************************************!*\
  !*** ./resources/js/views/Setting/ThemeSettings.vue?vue&type=script&lang=js ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ThemeSettings_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./ThemeSettings.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Setting/ThemeSettings.vue?vue&type=script&lang=js");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ThemeSettings_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/Setting/ThemeSettings.vue?vue&type=style&index=0&id=0f7a895e&scoped=true&lang=css":
/*!**************************************************************************************************************!*\
  !*** ./resources/js/views/Setting/ThemeSettings.vue?vue&type=style&index=0&id=0f7a895e&scoped=true&lang=css ***!
  \**************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ThemeSettings_vue_vue_type_style_index_0_id_0f7a895e_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/style-loader/dist/cjs.js!../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./ThemeSettings.vue?vue&type=style&index=0&id=0f7a895e&scoped=true&lang=css */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Setting/ThemeSettings.vue?vue&type=style&index=0&id=0f7a895e&scoped=true&lang=css");


/***/ }),

/***/ "./resources/js/views/Setting/ThemeSettings.vue?vue&type=template&id=0f7a895e&scoped=true":
/*!************************************************************************************************!*\
  !*** ./resources/js/views/Setting/ThemeSettings.vue?vue&type=template&id=0f7a895e&scoped=true ***!
  \************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ThemeSettings_vue_vue_type_template_id_0f7a895e_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   staticRenderFns: () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ThemeSettings_vue_vue_type_template_id_0f7a895e_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ThemeSettings_vue_vue_type_template_id_0f7a895e_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./ThemeSettings.vue?vue&type=template&id=0f7a895e&scoped=true */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Setting/ThemeSettings.vue?vue&type=template&id=0f7a895e&scoped=true");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Setting/ThemeSettings.vue?vue&type=template&id=0f7a895e&scoped=true":
/*!***************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Setting/ThemeSettings.vue?vue&type=template&id=0f7a895e&scoped=true ***!
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
            _c("h3", [_vm._v(_vm._s(_vm.__("theme_settings")))]),
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
                    [_vm._v(_vm._s(_vm.__("theme_settings")))]
                  ),
                ]),
              ]
            ),
          ]),
        ]),
      ]),
      _vm._v(" "),
      _c(
        "section",
        { staticClass: "section theme-settings-section" },
        [
          _c(
            "form",
            {
              on: {
                submit: function ($event) {
                  $event.preventDefault()
                  return _vm.saveTheme.apply(null, arguments)
                },
              },
            },
            [
              _c("div", { staticClass: "card theme-card mb-4" }, [
                _c("div", { staticClass: "card-body" }, [
                  _c("div", { staticClass: "row" }, [
                    _c("div", { staticClass: "col-12 col-md-6 mb-4 mb-md-0" }, [
                      _c("div", { staticClass: "theme-card-header" }, [
                        _c("span", {
                          staticClass: "color-dot",
                          style: { background: _vm.seeds.light_seed_primary },
                        }),
                        _vm._v(" "),
                        _c("div", [
                          _c("h4", { staticClass: "theme-card-title" }, [
                            _vm._v(_vm._s(_vm.__("theme_primary_color"))),
                          ]),
                          _vm._v(" "),
                          _c("p", { staticClass: "theme-card-desc" }, [
                            _vm._v(
                              _vm._s(
                                _vm.__(
                                  "used_for_main_brand_elements_and_actions"
                                )
                              )
                            ),
                          ]),
                        ]),
                      ]),
                      _vm._v(" "),
                      _c(
                        "div",
                        {
                          staticClass:
                            "d-flex align-items-center hex-picker-row",
                        },
                        [
                          _c("input", {
                            directives: [
                              {
                                name: "model",
                                rawName: "v-model",
                                value: _vm.seeds.light_seed_primary,
                                expression: "seeds.light_seed_primary",
                              },
                            ],
                            attrs: { type: "color" },
                            domProps: { value: _vm.seeds.light_seed_primary },
                            on: {
                              input: [
                                function ($event) {
                                  if ($event.target.composing) {
                                    return
                                  }
                                  _vm.$set(
                                    _vm.seeds,
                                    "light_seed_primary",
                                    $event.target.value
                                  )
                                },
                                function ($event) {
                                  return _vm.previewPalette("light", "primary")
                                },
                              ],
                            },
                          }),
                          _vm._v(" "),
                          _c("input", {
                            directives: [
                              {
                                name: "model",
                                rawName: "v-model",
                                value: _vm.seeds.light_seed_primary,
                                expression: "seeds.light_seed_primary",
                              },
                            ],
                            staticClass: "form-control hex-input",
                            attrs: { type: "text", maxlength: "7" },
                            domProps: { value: _vm.seeds.light_seed_primary },
                            on: {
                              input: [
                                function ($event) {
                                  if ($event.target.composing) {
                                    return
                                  }
                                  _vm.$set(
                                    _vm.seeds,
                                    "light_seed_primary",
                                    $event.target.value
                                  )
                                },
                                function ($event) {
                                  return _vm.previewPalette("light", "primary")
                                },
                              ],
                            },
                          }),
                        ]
                      ),
                      _vm._v(" "),
                      _c(
                        "div",
                        { staticClass: "palette-preview" },
                        _vm._l(_vm.preview.light.primary, function (hex, stop) {
                          return _c("div", {
                            key: stop,
                            staticClass: "swatch",
                            style: { background: hex },
                            attrs: { title: stop + ": " + hex },
                          })
                        }),
                        0
                      ),
                    ]),
                    _vm._v(" "),
                    _c("div", { staticClass: "col-12 col-md-6" }, [
                      _c("div", { staticClass: "theme-card-header" }, [
                        _c("span", {
                          staticClass: "color-dot",
                          style: { background: _vm.seeds.light_seed_neutral },
                        }),
                        _vm._v(" "),
                        _c("div", [
                          _c("h4", { staticClass: "theme-card-title" }, [
                            _vm._v(_vm._s(_vm.__("theme_neutral_color"))),
                          ]),
                          _vm._v(" "),
                          _c("p", { staticClass: "theme-card-desc" }, [
                            _vm._v(
                              _vm._s(
                                _vm.__(
                                  "used_for_text_backgrounds_borders_and_neutral_elements"
                                )
                              )
                            ),
                          ]),
                        ]),
                      ]),
                      _vm._v(" "),
                      _c(
                        "div",
                        {
                          staticClass:
                            "d-flex align-items-center hex-picker-row",
                        },
                        [
                          _c("input", {
                            directives: [
                              {
                                name: "model",
                                rawName: "v-model",
                                value: _vm.seeds.light_seed_neutral,
                                expression: "seeds.light_seed_neutral",
                              },
                            ],
                            attrs: { type: "color" },
                            domProps: { value: _vm.seeds.light_seed_neutral },
                            on: {
                              input: [
                                function ($event) {
                                  if ($event.target.composing) {
                                    return
                                  }
                                  _vm.$set(
                                    _vm.seeds,
                                    "light_seed_neutral",
                                    $event.target.value
                                  )
                                },
                                function ($event) {
                                  return _vm.previewPalette("light", "neutral")
                                },
                              ],
                            },
                          }),
                          _vm._v(" "),
                          _c("input", {
                            directives: [
                              {
                                name: "model",
                                rawName: "v-model",
                                value: _vm.seeds.light_seed_neutral,
                                expression: "seeds.light_seed_neutral",
                              },
                            ],
                            staticClass: "form-control hex-input",
                            attrs: { type: "text", maxlength: "7" },
                            domProps: { value: _vm.seeds.light_seed_neutral },
                            on: {
                              input: [
                                function ($event) {
                                  if ($event.target.composing) {
                                    return
                                  }
                                  _vm.$set(
                                    _vm.seeds,
                                    "light_seed_neutral",
                                    $event.target.value
                                  )
                                },
                                function ($event) {
                                  return _vm.previewPalette("light", "neutral")
                                },
                              ],
                            },
                          }),
                        ]
                      ),
                      _vm._v(" "),
                      _c(
                        "div",
                        { staticClass: "palette-preview" },
                        _vm._l(_vm.preview.light.neutral, function (hex, stop) {
                          return _c("div", {
                            key: stop,
                            staticClass: "swatch",
                            style: { background: hex },
                            attrs: { title: stop + ": " + hex },
                          })
                        }),
                        0
                      ),
                    ]),
                  ]),
                ]),
                _vm._v(" "),
                _vm.$can("manage_store_settings")
                  ? _c(
                      "div",
                      { staticClass: "card-footer" },
                      [
                        _c(
                          "b-button",
                          {
                            staticClass: "theme-save-btn",
                            attrs: {
                              type: "submit",
                              variant: "primary",
                              disabled: _vm.isLoading,
                            },
                          },
                          [
                            _vm._v(
                              "\n                            " +
                                _vm._s(_vm.__("save")) +
                                "\n                            "
                            ),
                            _vm.isLoading
                              ? _c("b-spinner", {
                                  attrs: { small: "", label: "Spinning" },
                                })
                              : _vm._e(),
                          ],
                          1
                        ),
                      ],
                      1
                    )
                  : _vm._e(),
              ]),
            ]
          ),
          _vm._v(" "),
          _vm.isDefaultModule
            ? [
                _c("h4", { staticClass: "status-colors-title" }, [
                  _vm._v(
                    "\n                " +
                      _vm._s(_vm.__("status_colors")) +
                      "\n                "
                  ),
                  _c("i", {
                    directives: [
                      {
                        name: "b-tooltip",
                        rawName: "v-b-tooltip.hover",
                        modifiers: { hover: true },
                      },
                    ],
                    staticClass: "fa fa-info-circle ml-1",
                    attrs: { title: _vm.__("general_custom_fields_tooltip") },
                  }),
                ]),
                _vm._v(" "),
                _c("p", { staticClass: "status-colors-desc" }, [
                  _vm._v(
                    _vm._s(
                      _vm.__(
                        "used_to_represent_different_states_and_alerts_in_the_system"
                      )
                    )
                  ),
                ]),
                _vm._v(" "),
                _c(
                  "div",
                  { staticClass: "row d-none d-sm-flex" },
                  _vm._l(_vm.statusTypes, function (type) {
                    return _c(
                      "div",
                      {
                        key: type,
                        staticClass: "col-12 col-sm-6 col-xl-3 mb-4",
                      },
                      [
                        _c("div", { staticClass: "card h-100 theme-card" }, [
                          _c("div", { staticClass: "card-body" }, [
                            _c("div", { staticClass: "theme-card-header" }, [
                              _c("span", {
                                staticClass: "color-dot",
                                style: { background: _vm.statusSeeds[type] },
                              }),
                              _vm._v(" "),
                              _c("div", [
                                _c("h4", { staticClass: "theme-card-title" }, [
                                  _vm._v(
                                    _vm._s(_vm.__("theme_" + type + "_color"))
                                  ),
                                ]),
                                _vm._v(" "),
                                _c("p", { staticClass: "theme-card-desc" }, [
                                  _vm._v(
                                    _vm._s(
                                      _vm.__("theme_" + type + "_color_desc")
                                    )
                                  ),
                                ]),
                              ]),
                            ]),
                            _vm._v(" "),
                            _c(
                              "div",
                              {
                                staticClass:
                                  "d-flex align-items-center hex-picker-row",
                              },
                              [
                                _c("input", {
                                  directives: [
                                    {
                                      name: "model",
                                      rawName: "v-model",
                                      value: _vm.statusSeeds[type],
                                      expression: "statusSeeds[type]",
                                    },
                                  ],
                                  attrs: { type: "color" },
                                  domProps: { value: _vm.statusSeeds[type] },
                                  on: {
                                    input: function ($event) {
                                      if ($event.target.composing) {
                                        return
                                      }
                                      _vm.$set(
                                        _vm.statusSeeds,
                                        type,
                                        $event.target.value
                                      )
                                    },
                                  },
                                }),
                                _vm._v(" "),
                                _c("input", {
                                  directives: [
                                    {
                                      name: "model",
                                      rawName: "v-model",
                                      value: _vm.statusSeeds[type],
                                      expression: "statusSeeds[type]",
                                    },
                                  ],
                                  staticClass: "form-control hex-input",
                                  attrs: { type: "text", maxlength: "7" },
                                  domProps: { value: _vm.statusSeeds[type] },
                                  on: {
                                    input: function ($event) {
                                      if ($event.target.composing) {
                                        return
                                      }
                                      _vm.$set(
                                        _vm.statusSeeds,
                                        type,
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
                              { staticClass: "palette-preview" },
                              _vm._l(_vm.theme[type], function (hex, stop) {
                                return _c("div", {
                                  key: stop,
                                  staticClass: "swatch",
                                  style: { background: hex },
                                  attrs: { title: stop + ": " + hex },
                                })
                              }),
                              0
                            ),
                          ]),
                          _vm._v(" "),
                          _vm.$can("manage_store_settings")
                            ? _c(
                                "div",
                                {
                                  staticClass:
                                    "card-footer d-flex justify-content-between",
                                },
                                [
                                  _c(
                                    "button",
                                    {
                                      staticClass:
                                        "btn btn-outline-secondary theme-reset-btn",
                                      attrs: {
                                        type: "button",
                                        disabled: _vm.statusLoading[type],
                                      },
                                      on: {
                                        click: function ($event) {
                                          return _vm.resetStatusColor(type)
                                        },
                                      },
                                    },
                                    [_vm._v(_vm._s(_vm.__("reset_to_default")))]
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "button",
                                    {
                                      staticClass:
                                        "btn btn-primary theme-save-btn",
                                      attrs: {
                                        type: "button",
                                        disabled: _vm.statusLoading[type],
                                      },
                                      on: {
                                        click: function ($event) {
                                          return _vm.saveStatusColor(type)
                                        },
                                      },
                                    },
                                    [_vm._v(_vm._s(_vm.__("save")))]
                                  ),
                                ]
                              )
                            : _vm._e(),
                        ]),
                      ]
                    )
                  }),
                  0
                ),
                _vm._v(" "),
                _c(
                  "div",
                  {
                    staticClass: "card theme-card d-sm-none status-mobile-card",
                  },
                  _vm._l(_vm.statusTypes, function (type) {
                    return _c(
                      "div",
                      { key: "m-" + type, staticClass: "status-mobile-row" },
                      [
                        _c(
                          "div",
                          {
                            directives: [
                              {
                                name: "b-toggle",
                                rawName: "v-b-toggle",
                                value: "status-collapse-" + type,
                                expression: "'status-collapse-' + type",
                              },
                            ],
                            staticClass: "status-mobile-summary",
                          },
                          [
                            _c("span", {
                              staticClass: "color-dot",
                              style: { background: _vm.statusSeeds[type] },
                            }),
                            _vm._v(" "),
                            _c("span", { staticClass: "status-mobile-title" }, [
                              _vm._v(
                                _vm._s(_vm.__("theme_" + type + "_color"))
                              ),
                            ]),
                            _vm._v(" "),
                            _c("span", { staticClass: "status-mobile-hex" }, [
                              _vm._v(_vm._s(_vm.statusSeeds[type])),
                            ]),
                            _vm._v(" "),
                            _c("i", {
                              staticClass:
                                "fa fa-chevron-down status-mobile-chevron",
                            }),
                          ]
                        ),
                        _vm._v(" "),
                        _c(
                          "b-collapse",
                          { attrs: { id: "status-collapse-" + type } },
                          [
                            _c("div", { staticClass: "status-mobile-body" }, [
                              _c("p", { staticClass: "theme-card-desc" }, [
                                _vm._v(
                                  _vm._s(
                                    _vm.__("theme_" + type + "_color_desc")
                                  )
                                ),
                              ]),
                              _vm._v(" "),
                              _c(
                                "div",
                                {
                                  staticClass:
                                    "d-flex align-items-center hex-picker-row",
                                },
                                [
                                  _c("input", {
                                    directives: [
                                      {
                                        name: "model",
                                        rawName: "v-model",
                                        value: _vm.statusSeeds[type],
                                        expression: "statusSeeds[type]",
                                      },
                                    ],
                                    attrs: { type: "color" },
                                    domProps: { value: _vm.statusSeeds[type] },
                                    on: {
                                      input: function ($event) {
                                        if ($event.target.composing) {
                                          return
                                        }
                                        _vm.$set(
                                          _vm.statusSeeds,
                                          type,
                                          $event.target.value
                                        )
                                      },
                                    },
                                  }),
                                  _vm._v(" "),
                                  _c("input", {
                                    directives: [
                                      {
                                        name: "model",
                                        rawName: "v-model",
                                        value: _vm.statusSeeds[type],
                                        expression: "statusSeeds[type]",
                                      },
                                    ],
                                    staticClass: "form-control hex-input",
                                    attrs: { type: "text", maxlength: "7" },
                                    domProps: { value: _vm.statusSeeds[type] },
                                    on: {
                                      input: function ($event) {
                                        if ($event.target.composing) {
                                          return
                                        }
                                        _vm.$set(
                                          _vm.statusSeeds,
                                          type,
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
                                { staticClass: "palette-preview" },
                                _vm._l(_vm.theme[type], function (hex, stop) {
                                  return _c("div", {
                                    key: stop,
                                    staticClass: "swatch",
                                    style: { background: hex },
                                    attrs: { title: stop + ": " + hex },
                                  })
                                }),
                                0
                              ),
                              _vm._v(" "),
                              _vm.$can("manage_store_settings")
                                ? _c(
                                    "div",
                                    {
                                      staticClass:
                                        "d-flex justify-content-between mt-3",
                                    },
                                    [
                                      _c(
                                        "button",
                                        {
                                          staticClass:
                                            "btn btn-outline-secondary theme-reset-btn",
                                          attrs: {
                                            type: "button",
                                            disabled: _vm.statusLoading[type],
                                          },
                                          on: {
                                            click: function ($event) {
                                              return _vm.resetStatusColor(type)
                                            },
                                          },
                                        },
                                        [
                                          _vm._v(
                                            _vm._s(_vm.__("reset_to_default"))
                                          ),
                                        ]
                                      ),
                                      _vm._v(" "),
                                      _c(
                                        "button",
                                        {
                                          staticClass:
                                            "btn btn-primary theme-save-btn",
                                          attrs: {
                                            type: "button",
                                            disabled: _vm.statusLoading[type],
                                          },
                                          on: {
                                            click: function ($event) {
                                              return _vm.saveStatusColor(type)
                                            },
                                          },
                                        },
                                        [_vm._v(_vm._s(_vm.__("save")))]
                                      ),
                                    ]
                                  )
                                : _vm._e(),
                            ]),
                          ]
                        ),
                      ],
                      1
                    )
                  }),
                  0
                ),
              ]
            : _vm._e(),
        ],
        2
      ),
    ]),
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ })

}]);