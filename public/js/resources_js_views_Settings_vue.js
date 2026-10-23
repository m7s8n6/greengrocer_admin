"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_views_Settings_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Settings.vue?vue&type=script&lang=js":
/*!*********************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Settings.vue?vue&type=script&lang=js ***!
  \*********************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Auth_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Auth.js */ "./resources/js/Auth.js");
/* harmony import */ var _utils_orderStatus_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/orderStatus.js */ "./resources/js/utils/orderStatus.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
      passwordFields: [{
        key: 'current_password',
        label: 'current_password',
        autocomplete: 'current-password'
      }, {
        key: 'password',
        label: 'new_password',
        autocomplete: 'new-password'
      }, {
        key: 'confirm_password',
        label: 'confirm_new_password',
        autocomplete: 'new-password'
      }],
      showPw: {
        current_password: false,
        password: false,
        confirm_password: false
      },
      isLoading: false,
      // which Save button owns the spinner ('mail' | 'password'), so only that one spins
      savingForm: '',
      statuses: [],
      mail_statuses: [],
      mobile_statuses: [],
      sms_statuses: [],
      settings: {
        username: _Auth_js__WEBPACK_IMPORTED_MODULE_1__["default"].user.username,
        current_password: "",
        password: "",
        confirm_password: ""
      }
    };
  },
  computed: {
    isSellerOrDeliveryBoy: function isSellerOrDeliveryBoy() {
      return _Auth_js__WEBPACK_IMPORTED_MODULE_1__["default"].user.role_id === 3 || _Auth_js__WEBPACK_IMPORTED_MODULE_1__["default"].user.role_id === 4;
    },
    dashboardPath: function dashboardPath() {
      var roleId = _Auth_js__WEBPACK_IMPORTED_MODULE_1__["default"].user.role_id;
      return roleId === 3 ? '/seller' : roleId === 4 ? '/delivery_boy' : '/dashboard';
    }
  },
  created: function created() {
    this.getOrderStatus();
    this.getMailSetting();
  },
  methods: {
    tr: function tr(key, fallback) {
      var v = this.__(key);
      return v && v !== key ? v : fallback;
    },
    statusIcon: _utils_orderStatus_js__WEBPACK_IMPORTED_MODULE_2__.statusIcon,
    statusTone: _utils_orderStatus_js__WEBPACK_IMPORTED_MODULE_2__.statusTone,
    // "All" switch in a column header: on when every status is selected in that column
    allOn: function allOn(list) {
      return this.statuses.length > 0 && this.statuses.every(function (s) {
        return list.includes(s.id);
      });
    },
    setAll: function setAll(listName, on) {
      this[listName] = on ? _toConsumableArray(new Set(this.statuses.map(function (s) {
        return s.id;
      }))) : [];
    },
    /**
     * Status label for display. API returns status_name as object by lang code { en: "...", hi: "..." }.
     * Picks current app locale; fallback to status.status.
     */
    getStatusDisplayName: function getStatusDisplayName(status) {
      if (!status) return '';
      var sn = status.status_name;
      if (sn == null) return status.status || '';
      if (typeof sn === 'string') return sn.trim() || status.status || '';
      if (_typeof(sn) === 'object' && !Array.isArray(sn)) {
        var appLocale = window.appLocale || window.localStorage.getItem('lang') || 'en';
        var forLocale = sn[appLocale];
        if (forLocale != null && String(forLocale).trim() !== '') return String(forLocale).trim();
        var first = Object.values(sn).find(function (val) {
          return val != null && String(val).trim() !== '';
        });
        return first != null ? String(first).trim() : status.status || '';
      }
      return status.status || '';
    },
    getOrderStatus: function getOrderStatus() {
      var _this = this;
      this.isLoading = true;
      var vm = this;
      var orderStatusesUrl = this.$apiUrl + '/order_statuses';
      var selfPickStatusesUrl = this.$apiUrl + '/order_statuses/self_pickup';
      Promise.all([axios__WEBPACK_IMPORTED_MODULE_0___default().get(orderStatusesUrl), axios__WEBPACK_IMPORTED_MODULE_0___default().get(selfPickStatusesUrl)]).then(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
          orderResponse = _ref2[0],
          selfPickResponse = _ref2[1];
        _this.isLoading = false;

        // All order statuses (no filter)
        var orderStatuses = orderResponse.data.data;

        // Filter selfpick statuses (exclude IDs 1, 7, 8)
        var selfPickStatuses = selfPickResponse.data.data.filter(function (item) {
          return ![1, 7, 8].includes(item.id);
        });

        // Merge both
        _this.statuses = [].concat(_toConsumableArray(orderStatuses), _toConsumableArray(selfPickStatuses));
      })["catch"](function (error) {
        vm.isLoading = false;
        if (error.request && error.request.statusText) {
          _this.showError(error.request.statusText);
        } else if (error.message) {
          _this.showError(error.message);
        } else {
          _this.showError(__('something_went_wrong'));
        }
      });
    },
    getMailSetting: function getMailSetting() {
      var _this2 = this;
      var vm = this;
      axios__WEBPACK_IMPORTED_MODULE_0___default().get(this.$apiUrl + '/mail_settings').then(function (response) {
        _this2.isLoading = false;
        var data = response.data.data;
        data.forEach(function (status) {
          if (status.mail_status === 1) {
            _this2.mail_statuses.push(status.order_status_id);
          }
          if (status.mobile_status === 1) {
            _this2.mobile_statuses.push(status.order_status_id);
          }
          if (status.sms_status === 1) {
            _this2.sms_statuses.push(status.order_status_id);
          }
        });
      })["catch"](function (error) {
        vm.isLoading = false;
        if (error.request.statusText) {
          _this2.showError(error.request.statusText);
        } else if (error.message) {
          _this2.showError(error.message);
        } else {
          _this2.showError(__('something_went_wrong'));
        }
      });
    },
    saveMailSetting: function saveMailSetting() {
      var _this3 = this;
      var vm = this;
      this.savingForm = 'mail';
      this.isLoading = true;
      var formData = new FormData();
      this.statuses.forEach(function (status) {
        formData.append('status_ids[]', status.id);
        if (_this3.mail_statuses.includes(status.id)) {
          formData.append('mail_statuses[]', "1");
        } else {
          formData.append('mail_statuses[]', "0");
        }
        if (_this3.mobile_statuses.includes(status.id)) {
          formData.append('mobile_statuses[]', "1");
        } else {
          formData.append('mobile_statuses[]', "0");
        }
        if (_this3.sms_statuses.includes(status.id)) {
          formData.append('sms_statuses[]', "1");
        } else {
          formData.append('sms_statuses[]', "0");
        }
      });
      axios__WEBPACK_IMPORTED_MODULE_0___default().post(this.$apiUrl + '/mail_settings/save', formData).then(function (res) {
        var data = res.data;
        vm.isLoading = false;
        if (data.status === 1) {
          vm.showMessage("success", data.message);
          _this3.getMailSetting();
        } else {
          vm.showError(data.message);
        }
      })["catch"](function (error) {
        vm.isLoading = false;
        if (error.request.statusText) {
          _this3.showError(error.request.statusText);
        } else if (error.message) {
          _this3.showError(error.message);
        } else {
          _this3.showError(__('something_went_wrong'));
        }
      });
    },
    saveRecord: function saveRecord() {
      var _this4 = this;
      var vm = this;
      this.savingForm = 'password';
      this.isLoading = true;
      axios__WEBPACK_IMPORTED_MODULE_0___default().post(this.$apiUrl + '/system_users/change_password', this.settings).then(function (res) {
        var data = res.data;
        vm.isLoading = false;
        if (data.status === 1) {
          vm.showMessage("success", data.message);
          // Update Auth.user.username in memory and localStorage so the header reflects immediately
          _Auth_js__WEBPACK_IMPORTED_MODULE_1__["default"].user.username = vm.settings.username;
          window.localStorage.setItem('user', JSON.stringify(_Auth_js__WEBPACK_IMPORTED_MODULE_1__["default"].user));
          var role_id = _Auth_js__WEBPACK_IMPORTED_MODULE_1__["default"].user.role_id;
          if (role_id === 3) {
            _this4.$router.push('/seller');
          } else if (role_id === 4) {
            _this4.$router.push('/delivery_boy');
          } else {
            _this4.$router.push({
              path: '/'
            });
          }
        } else {
          vm.showError(data.message);
        }
      })["catch"](function (error) {
        vm.isLoading = false;
        if (error.request.statusText) {
          _this4.showError(error.request.statusText);
        } else if (error.message) {
          _this4.showError(error.message);
        } else {
          _this4.showError(__('something_went_wrong'));
        }
      });
    },
    deleteAccount: function deleteAccount() {
      var _this5 = this;
      var vm = this;
      this.$swal.fire({
        title: __('are_you_sure'),
        text: __('delete_account_confirmation'),
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: 'var(--theme-error-500)',
        cancelButtonColor: 'var(--theme-primary-500)',
        confirmButtonText: __('yes_delete'),
        cancelButtonText: __('cancel')
      }).then(function (result) {
        if (result.isConfirmed) {
          vm.$swal.fire({
            title: __('final_confirmation'),
            text: __('delete_account_final_warning'),
            icon: 'error',
            showCancelButton: true,
            confirmButtonColor: 'var(--theme-error-500)',
            cancelButtonColor: 'var(--theme-primary-500)',
            confirmButtonText: __('yes_delete_permanently'),
            cancelButtonText: __('cancel'),
            dangerMode: true
          }).then(function (secondResult) {
            if (secondResult.isConfirmed) {
              vm.isLoading = true;
              var role_id = _Auth_js__WEBPACK_IMPORTED_MODULE_1__["default"].user.role_id;
              var deleteUrl = '';
              if (role_id === 3) {
                deleteUrl = _this5.$sellerApiUrl + '/delete_seller_account';
              } else if (role_id === 4) {
                deleteUrl = _this5.$deliveryBoyApiUrl + '/delete_delivery_boy_account';
              }
              if (deleteUrl) {
                axios__WEBPACK_IMPORTED_MODULE_0___default().get(deleteUrl).then(function (response) {
                  vm.isLoading = false;
                  var data = response.data;
                  if (data.status === 1) {
                    vm.showSuccess(data.message);
                    _Auth_js__WEBPACK_IMPORTED_MODULE_1__["default"].logout();
                    setTimeout(function () {
                      vm.$router.push('/login');
                    }, 1500);
                  } else {
                    vm.showError(data.message);
                  }
                })["catch"](function (error) {
                  vm.isLoading = false;
                  if (error.request && error.request.statusText) {
                    _this5.showError(error.request.statusText);
                  } else if (error.message) {
                    _this5.showError(error.message);
                  } else {
                    _this5.showError(__('something_went_wrong'));
                  }
                });
              }
            }
          });
        }
      });
    }
  }
});

/***/ }),

/***/ "./resources/js/utils/orderStatus.js":
/*!*******************************************!*\
  !*** ./resources/js/utils/orderStatus.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   statusIcon: () => (/* binding */ statusIcon),
/* harmony export */   statusTone: () => (/* binding */ statusTone)
/* harmony export */ });
// One icon and one colour tone per order status, shared by every screen that shows order statuses
// (dashboard, settings, …). Tones match the status pills: info / success / warn / error / primary.
// Icons are Bootstrap Icons (served locally, always available).

var STATUS = {
  1: {
    icon: 'bi bi-credit-card',
    tone: 'warn'
  },
  // Payment Pending
  2: {
    icon: 'bi bi-inbox',
    tone: 'info'
  },
  // Received
  3: {
    icon: 'bi bi-gear',
    tone: 'success'
  },
  // Processed
  4: {
    icon: 'bi bi-box-seam',
    tone: 'info'
  },
  // Shipped
  5: {
    icon: 'bi bi-truck',
    tone: 'primary'
  },
  // Out For Delivery
  6: {
    icon: 'bi bi-check-circle',
    tone: 'success'
  },
  // Delivered
  7: {
    icon: 'bi bi-x-circle',
    tone: 'error'
  },
  // Cancelled
  8: {
    icon: 'bi bi-arrow-counterclockwise',
    tone: 'error'
  },
  // Returned
  9: {
    icon: 'bi bi-clock',
    tone: 'warn'
  },
  // Pending
  10: {
    icon: 'bi bi-bag-check',
    tone: 'success'
  },
  // Ready for Pickup
  11: {
    icon: 'bi bi-check2-all',
    tone: 'success'
  } // Picked Up
};
function statusIcon(statusId) {
  var s = STATUS[Number(statusId)];
  return s ? s.icon : 'bi bi-circle';
}
function statusTone(statusId) {
  var s = STATUS[Number(statusId)];
  return s ? s.tone : 'info';
}

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Settings.vue?vue&type=style&index=0&id=6af1f6c2&scoped=true&lang=css":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Settings.vue?vue&type=style&index=0&id=6af1f6c2&scoped=true&lang=css ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.id, "\n.settings-grid-head[data-v-6af1f6c2] {\n    padding-bottom: 8px;\n    margin-bottom: 4px;\n    border-bottom: 1px solid var(--ui-border);\n}\n.settings-grid-head h6[data-v-6af1f6c2] {\n    margin: 0;\n    font-size: 12px;\n    font-weight: 600;\n    text-transform: uppercase;\n    letter-spacing: 0.02em;\n    color: var(--ui-text-muted);\n}\n/* MAIL / SMS headers centred over their switch columns */\n.settings-col-head[data-v-6af1f6c2] {\n    display: flex;\n    justify-content: center;\n}\n.settings-grid-row[data-v-6af1f6c2] {\n    padding: 8px 0;\n    border-bottom: 1px solid var(--ui-border);\n    transition: background-color 0.15s ease;\n}\n.settings-grid-row[data-v-6af1f6c2]:hover {\n    background: var(--ui-surface-muted);\n}\n/* the switches sit exactly in the middle of their column, on every row */\n.settings-grid-row .form-switch[data-v-6af1f6c2] {\n    padding: 0;\n}\n.settings-grid-row .form-switch .form-check-input[data-v-6af1f6c2] {\n    float: none;\n    margin: 0;\n}\n.settings-grid-row--all[data-v-6af1f6c2] {\n    background: var(--ui-surface-muted);\n}\n.settings-grid-row--all label[data-v-6af1f6c2] {\n    font-weight: 700;\n}\n.settings-grid-row[data-v-6af1f6c2]:last-child {\n    border-bottom: 0;\n}\n.settings-grid-row label[data-v-6af1f6c2] {\n    margin: 0;\n    font-size: 13px;\n    font-weight: 600;\n    color: var(--ui-text);\n}\n\n/* input with a leading icon (and an optional show/hide button at the end) */\n.field-icon[data-v-6af1f6c2] {\n    position: relative;\n}\n/* doubled classes outrank the global \".form-control:not(…):not(…):not(…)\" padding rule */\n.field-icon.field-icon .form-control.form-control[data-v-6af1f6c2] {\n    padding-inline-start: 40px !important;\n    padding-left: 40px !important;\n}\n.rtl .field-icon.field-icon .form-control.form-control[data-v-6af1f6c2] {\n    padding-left: 16px !important;\n    padding-right: 40px !important;\n}\n.field-icon.field-icon:has(.field-icon__toggle) .form-control.form-control[data-v-6af1f6c2] {\n    padding-inline-end: 44px !important;\n}\n.field-icon__lead[data-v-6af1f6c2] {\n    position: absolute;\n    top: 50%;\n    inset-inline-start: 14px;\n    transform: translateY(-50%);\n    font-size: 16px;\n    color: var(--ui-text-subtle);\n    pointer-events: none;\n}\n.field-icon__toggle[data-v-6af1f6c2] {\n    position: absolute;\n    top: 50%;\n    inset-inline-end: 6px;\n    transform: translateY(-50%);\n    display: inline-flex;\n    align-items: center;\n    justify-content: center;\n    width: 32px;\n    height: 32px;\n    border: 0;\n    border-radius: var(--ui-radius-sm);\n    background: transparent;\n    color: var(--ui-text-muted);\n    font-size: 16px;\n}\n.field-icon__toggle[data-v-6af1f6c2]:hover {\n    background: var(--ui-surface-muted);\n    color: var(--ui-text);\n}\n.field-hint[data-v-6af1f6c2] {\n    display: flex;\n    align-items: flex-start;\n    gap: 6px;\n    font-size: 12px;\n    line-height: 1.45;\n    color: var(--ui-text-muted);\n}\n.field-hint--error[data-v-6af1f6c2] {\n    color: var(--theme-error-600);\n}\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Settings.vue?vue&type=style&index=0&id=6af1f6c2&scoped=true&lang=css":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Settings.vue?vue&type=style&index=0&id=6af1f6c2&scoped=true&lang=css ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Settings_vue_vue_type_style_index_0_id_6af1f6c2_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Settings.vue?vue&type=style&index=0&id=6af1f6c2&scoped=true&lang=css */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Settings.vue?vue&type=style&index=0&id=6af1f6c2&scoped=true&lang=css");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Settings_vue_vue_type_style_index_0_id_6af1f6c2_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Settings_vue_vue_type_style_index_0_id_6af1f6c2_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./resources/js/views/Settings.vue":
/*!*****************************************!*\
  !*** ./resources/js/views/Settings.vue ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Settings_vue_vue_type_template_id_6af1f6c2_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Settings.vue?vue&type=template&id=6af1f6c2&scoped=true */ "./resources/js/views/Settings.vue?vue&type=template&id=6af1f6c2&scoped=true");
/* harmony import */ var _Settings_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Settings.vue?vue&type=script&lang=js */ "./resources/js/views/Settings.vue?vue&type=script&lang=js");
/* harmony import */ var _Settings_vue_vue_type_style_index_0_id_6af1f6c2_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Settings.vue?vue&type=style&index=0&id=6af1f6c2&scoped=true&lang=css */ "./resources/js/views/Settings.vue?vue&type=style&index=0&id=6af1f6c2&scoped=true&lang=css");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _Settings_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _Settings_vue_vue_type_template_id_6af1f6c2_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render,
  _Settings_vue_vue_type_template_id_6af1f6c2_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "6af1f6c2",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/Settings.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/views/Settings.vue?vue&type=script&lang=js":
/*!*****************************************************************!*\
  !*** ./resources/js/views/Settings.vue?vue&type=script&lang=js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Settings_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Settings.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Settings.vue?vue&type=script&lang=js");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Settings_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/Settings.vue?vue&type=style&index=0&id=6af1f6c2&scoped=true&lang=css":
/*!*************************************************************************************************!*\
  !*** ./resources/js/views/Settings.vue?vue&type=style&index=0&id=6af1f6c2&scoped=true&lang=css ***!
  \*************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Settings_vue_vue_type_style_index_0_id_6af1f6c2_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/style-loader/dist/cjs.js!../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Settings.vue?vue&type=style&index=0&id=6af1f6c2&scoped=true&lang=css */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Settings.vue?vue&type=style&index=0&id=6af1f6c2&scoped=true&lang=css");


/***/ }),

/***/ "./resources/js/views/Settings.vue?vue&type=template&id=6af1f6c2&scoped=true":
/*!***********************************************************************************!*\
  !*** ./resources/js/views/Settings.vue?vue&type=template&id=6af1f6c2&scoped=true ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Settings_vue_vue_type_template_id_6af1f6c2_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   staticRenderFns: () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Settings_vue_vue_type_template_id_6af1f6c2_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Settings_vue_vue_type_template_id_6af1f6c2_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Settings.vue?vue&type=template&id=6af1f6c2&scoped=true */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Settings.vue?vue&type=template&id=6af1f6c2&scoped=true");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Settings.vue?vue&type=template&id=6af1f6c2&scoped=true":
/*!**************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Settings.vue?vue&type=template&id=6af1f6c2&scoped=true ***!
  \**************************************************************************************************************************************************************************************************************************/
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
            "page-title d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3",
        },
        [
          _c("h3", { staticClass: "mb-0" }, [
            _vm._v(_vm._s(_vm.__("settings"))),
          ]),
          _vm._v(" "),
          _c(
            "div",
            { staticClass: "d-flex flex-wrap align-items-center gap-3" },
            [
              _c("nav", { attrs: { "aria-label": "breadcrumb" } }, [
                _c("ol", { staticClass: "breadcrumb mb-0" }, [
                  _c(
                    "li",
                    { staticClass: "breadcrumb-item" },
                    [
                      _c("router-link", { attrs: { to: _vm.dashboardPath } }, [
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
                    [_vm._v(_vm._s(_vm.__("settings")))]
                  ),
                ]),
              ]),
              _vm._v(" "),
              _vm.isSellerOrDeliveryBoy
                ? _c(
                    "button",
                    {
                      staticClass: "btn btn-outline-danger",
                      attrs: { type: "button", disabled: _vm.isLoading },
                      on: { click: _vm.deleteAccount },
                    },
                    [
                      _c("i", {
                        staticClass: "fas fa-trash-alt me-1",
                        attrs: { "aria-hidden": "true" },
                      }),
                      _vm._v(
                        _vm._s(_vm.__("delete_account")) + "\n                "
                      ),
                    ]
                  )
                : _vm._e(),
            ]
          ),
        ]
      ),
    ]),
    _vm._v(" "),
    _c("div", { staticClass: "page-content" }, [
      _c("section", { staticClass: "row" }, [
        _c("div", { staticClass: "col-12 col-lg-12" }, [
          _c("div", { staticClass: "row" }, [
            _c(
              "div",
              { staticClass: "col-12 col-lg-6 mb-4 d-flex flex-column" },
              [
                _c(
                  "form",
                  {
                    staticClass: "flex-grow-1 d-flex flex-column",
                    on: {
                      submit: function ($event) {
                        $event.preventDefault()
                        return _vm.saveMailSetting.apply(null, arguments)
                      },
                    },
                  },
                  [
                    _c("div", { staticClass: "card flex-grow-1 mb-0" }, [
                      _c("div", { staticClass: "card-header" }, [
                        _c("h4", { staticClass: "card-title float-none" }, [
                          _vm._v(_vm._s(_vm.__("order_mail_settings"))),
                        ]),
                        _vm._v(" "),
                        _c("p", { staticClass: "text-muted small mb-0 mt-1" }, [
                          _vm._v(
                            _vm._s(
                              _vm.tr(
                                "order_mail_settings_desc",
                                "Choose which order status updates send an email or SMS."
                              )
                            )
                          ),
                        ]),
                      ]),
                      _vm._v(" "),
                      _c("div", { staticClass: "card-body" }, [
                        _c("div", { staticClass: "row" }, [
                          _c("div", { staticClass: "col-md-12" }, [
                            _c("div", [
                              _c(
                                "div",
                                { staticClass: "settings-status-grid" },
                                [
                                  _c(
                                    "div",
                                    {
                                      staticClass:
                                        "row d-flex justify-content-between align-items-center settings-grid-head",
                                    },
                                    [
                                      _c(
                                        "div",
                                        { staticClass: "col-6 col-md-8" },
                                        [
                                          _c("h6", [
                                            _vm._v(
                                              _vm._s(_vm.__("order_status"))
                                            ),
                                          ]),
                                        ]
                                      ),
                                      _vm._v(" "),
                                      _c(
                                        "div",
                                        {
                                          staticClass:
                                            "col-3 col-md-2 settings-col-head",
                                        },
                                        [
                                          _c("h6", [
                                            _vm._v(_vm._s(_vm.__("mail"))),
                                          ]),
                                        ]
                                      ),
                                      _vm._v(" "),
                                      _c(
                                        "div",
                                        {
                                          staticClass:
                                            "col-3 col-md-2 settings-col-head",
                                        },
                                        [
                                          _c("h6", [
                                            _vm._v(_vm._s(_vm.__("sms"))),
                                          ]),
                                        ]
                                      ),
                                    ]
                                  ),
                                  _vm._v(" "),
                                  _vm.statuses.length
                                    ? _c(
                                        "div",
                                        {
                                          staticClass:
                                            "row d-flex justify-content-between align-items-center settings-grid-row settings-grid-row--all",
                                        },
                                        [
                                          _c(
                                            "div",
                                            {
                                              staticClass:
                                                "col-6 col-md-8 d-flex align-items-center gap-2 min-w-0",
                                            },
                                            [
                                              _vm._m(0),
                                              _vm._v(" "),
                                              _c(
                                                "label",
                                                {
                                                  staticClass: "text-truncate",
                                                },
                                                [
                                                  _vm._v(
                                                    _vm._s(
                                                      _vm.tr(
                                                        "all_statuses",
                                                        "All statuses"
                                                      )
                                                    )
                                                  ),
                                                ]
                                              ),
                                            ]
                                          ),
                                          _vm._v(" "),
                                          _c(
                                            "div",
                                            {
                                              staticClass:
                                                "form-check form-switch col-3 col-md-2 d-flex justify-content-center m-0",
                                            },
                                            [
                                              _c("input", {
                                                staticClass: "form-check-input",
                                                attrs: {
                                                  type: "checkbox",
                                                  "aria-label":
                                                    _vm.__("mail") +
                                                    " - " +
                                                    _vm.tr(
                                                      "all_statuses",
                                                      "All statuses"
                                                    ),
                                                },
                                                domProps: {
                                                  checked: _vm.allOn(
                                                    _vm.mail_statuses
                                                  ),
                                                },
                                                on: {
                                                  change: function ($event) {
                                                    return _vm.setAll(
                                                      "mail_statuses",
                                                      $event.target.checked
                                                    )
                                                  },
                                                },
                                              }),
                                            ]
                                          ),
                                          _vm._v(" "),
                                          _c(
                                            "div",
                                            {
                                              staticClass:
                                                "form-check form-switch col-3 col-md-2 d-flex justify-content-center m-0",
                                            },
                                            [
                                              _c("input", {
                                                staticClass: "form-check-input",
                                                attrs: {
                                                  type: "checkbox",
                                                  "aria-label":
                                                    _vm.__("sms") +
                                                    " - " +
                                                    _vm.tr(
                                                      "all_statuses",
                                                      "All statuses"
                                                    ),
                                                },
                                                domProps: {
                                                  checked: _vm.allOn(
                                                    _vm.sms_statuses
                                                  ),
                                                },
                                                on: {
                                                  change: function ($event) {
                                                    return _vm.setAll(
                                                      "sms_statuses",
                                                      $event.target.checked
                                                    )
                                                  },
                                                },
                                              }),
                                            ]
                                          ),
                                        ]
                                      )
                                    : _vm._e(),
                                  _vm._v(" "),
                                  _vm._l(
                                    _vm.statuses,
                                    function (status, index) {
                                      return _c(
                                        "div",
                                        {
                                          key: "st-" + status.id + "-" + index,
                                          staticClass:
                                            "row d-flex justify-content-between align-items-center settings-grid-row",
                                        },
                                        [
                                          _c(
                                            "div",
                                            {
                                              staticClass:
                                                "col-6 col-md-8 d-flex align-items-center gap-2 min-w-0",
                                            },
                                            [
                                              _c(
                                                "span",
                                                {
                                                  staticClass: "icon-tile",
                                                  class:
                                                    "tone-" +
                                                    _vm.statusTone(status.id),
                                                  attrs: {
                                                    "aria-hidden": "true",
                                                  },
                                                },
                                                [
                                                  _c("i", {
                                                    class: _vm.statusIcon(
                                                      status.id
                                                    ),
                                                  }),
                                                ]
                                              ),
                                              _vm._v(" "),
                                              _c(
                                                "label",
                                                {
                                                  staticClass: "text-truncate",
                                                },
                                                [
                                                  _vm._v(
                                                    " " +
                                                      _vm._s(
                                                        _vm.getStatusDisplayName(
                                                          status
                                                        )
                                                      ) +
                                                      " "
                                                  ),
                                                ]
                                              ),
                                            ]
                                          ),
                                          _vm._v(" "),
                                          _c(
                                            "div",
                                            {
                                              staticClass:
                                                "form-check form-switch col-3 col-md-2 d-flex justify-content-center m-0",
                                            },
                                            [
                                              _c("input", {
                                                directives: [
                                                  {
                                                    name: "model",
                                                    rawName: "v-model",
                                                    value: _vm.mail_statuses,
                                                    expression: "mail_statuses",
                                                  },
                                                ],
                                                staticClass: "form-check-input",
                                                attrs: {
                                                  type: "checkbox",
                                                  id:
                                                    "checkbox_mail_" +
                                                    status.id,
                                                },
                                                domProps: {
                                                  value: status.id,
                                                  checked:
                                                    _vm.mail_statuses.includes(
                                                      status.id
                                                    ),
                                                  checked: Array.isArray(
                                                    _vm.mail_statuses
                                                  )
                                                    ? _vm._i(
                                                        _vm.mail_statuses,
                                                        status.id
                                                      ) > -1
                                                    : _vm.mail_statuses,
                                                },
                                                on: {
                                                  change: function ($event) {
                                                    var $$a = _vm.mail_statuses,
                                                      $$el = $event.target,
                                                      $$c = $$el.checked
                                                        ? true
                                                        : false
                                                    if (Array.isArray($$a)) {
                                                      var $$v = status.id,
                                                        $$i = _vm._i($$a, $$v)
                                                      if ($$el.checked) {
                                                        $$i < 0 &&
                                                          (_vm.mail_statuses =
                                                            $$a.concat([$$v]))
                                                      } else {
                                                        $$i > -1 &&
                                                          (_vm.mail_statuses =
                                                            $$a
                                                              .slice(0, $$i)
                                                              .concat(
                                                                $$a.slice(
                                                                  $$i + 1
                                                                )
                                                              ))
                                                      }
                                                    } else {
                                                      _vm.mail_statuses = $$c
                                                    }
                                                  },
                                                },
                                              }),
                                            ]
                                          ),
                                          _vm._v(" "),
                                          _c(
                                            "div",
                                            {
                                              staticClass:
                                                "form-check form-switch col-3 col-md-2 d-flex justify-content-center m-0",
                                            },
                                            [
                                              _c("input", {
                                                directives: [
                                                  {
                                                    name: "model",
                                                    rawName: "v-model",
                                                    value: _vm.sms_statuses,
                                                    expression: "sms_statuses",
                                                  },
                                                ],
                                                staticClass: "form-check-input",
                                                attrs: {
                                                  type: "checkbox",
                                                  id:
                                                    "checkbox_sms_" + status.id,
                                                },
                                                domProps: {
                                                  value: status.id,
                                                  checked:
                                                    _vm.sms_statuses.includes(
                                                      status.id
                                                    ),
                                                  checked: Array.isArray(
                                                    _vm.sms_statuses
                                                  )
                                                    ? _vm._i(
                                                        _vm.sms_statuses,
                                                        status.id
                                                      ) > -1
                                                    : _vm.sms_statuses,
                                                },
                                                on: {
                                                  change: function ($event) {
                                                    var $$a = _vm.sms_statuses,
                                                      $$el = $event.target,
                                                      $$c = $$el.checked
                                                        ? true
                                                        : false
                                                    if (Array.isArray($$a)) {
                                                      var $$v = status.id,
                                                        $$i = _vm._i($$a, $$v)
                                                      if ($$el.checked) {
                                                        $$i < 0 &&
                                                          (_vm.sms_statuses =
                                                            $$a.concat([$$v]))
                                                      } else {
                                                        $$i > -1 &&
                                                          (_vm.sms_statuses =
                                                            $$a
                                                              .slice(0, $$i)
                                                              .concat(
                                                                $$a.slice(
                                                                  $$i + 1
                                                                )
                                                              ))
                                                      }
                                                    } else {
                                                      _vm.sms_statuses = $$c
                                                    }
                                                  },
                                                },
                                              }),
                                            ]
                                          ),
                                        ]
                                      )
                                    }
                                  ),
                                ],
                                2
                              ),
                            ]),
                          ]),
                        ]),
                      ]),
                      _vm._v(" "),
                      _c(
                        "div",
                        {
                          staticClass: "card-footer d-flex justify-content-end",
                        },
                        [
                          _c(
                            "button",
                            {
                              staticClass: "btn btn-outline-secondary mr-2",
                              attrs: { type: "button" },
                              on: {
                                click: function ($event) {
                                  return _vm.$router.go(-1)
                                },
                              },
                            },
                            [_vm._v(_vm._s(_vm.__("back")))]
                          ),
                          _vm._v(" "),
                          _c(
                            "button",
                            {
                              staticClass: "btn btn-primary",
                              attrs: {
                                type: "submit",
                                disabled:
                                  _vm.isLoading && _vm.savingForm === "mail",
                              },
                            },
                            [
                              _vm._v(
                                "\n                                        " +
                                  _vm._s(_vm.__("save")) +
                                  " "
                              ),
                              _vm.isLoading && _vm.savingForm === "mail"
                                ? _c("b-spinner", {
                                    attrs: { small: "", label: "Spinning" },
                                  })
                                : _vm._e(),
                            ],
                            1
                          ),
                        ]
                      ),
                    ]),
                  ]
                ),
              ]
            ),
            _vm._v(" "),
            _c(
              "div",
              { staticClass: "col-12 col-lg-6 mb-4 d-flex flex-column" },
              [
                _c(
                  "form",
                  {
                    staticClass: "flex-grow-1 d-flex flex-column",
                    on: {
                      submit: function ($event) {
                        $event.preventDefault()
                        return _vm.saveRecord.apply(null, arguments)
                      },
                    },
                  },
                  [
                    _c("div", { staticClass: "card flex-grow-1 mb-0" }, [
                      _c("div", { staticClass: "card-header" }, [
                        _c("h4", { staticClass: "card-title float-none" }, [
                          _vm._v(
                            _vm._s(_vm.__("change_username_and_password"))
                          ),
                        ]),
                        _vm._v(" "),
                        _c("p", { staticClass: "text-muted small mb-0 mt-1" }, [
                          _vm._v(
                            _vm._s(
                              _vm.tr(
                                "change_username_and_password_desc",
                                "Update your login username and password."
                              )
                            )
                          ),
                        ]),
                      ]),
                      _vm._v(" "),
                      _c("div", { staticClass: "card-body" }, [
                        _c("div", { staticClass: "row" }, [
                          _c("div", { staticClass: "col-md-12" }, [
                            _c(
                              "div",
                              [
                                _c("div", { staticClass: "form-group" }, [
                                  _c("label", { attrs: { for: "username" } }, [
                                    _vm._v(_vm._s(_vm.__("username"))),
                                  ]),
                                  _vm._v(" "),
                                  _c("div", { staticClass: "field-icon" }, [
                                    _c("i", {
                                      staticClass:
                                        "bi bi-person field-icon__lead",
                                      attrs: { "aria-hidden": "true" },
                                    }),
                                    _vm._v(" "),
                                    _c("input", {
                                      directives: [
                                        {
                                          name: "model",
                                          rawName: "v-model",
                                          value: _vm.settings.username,
                                          expression: "settings.username",
                                        },
                                      ],
                                      staticClass: "form-control",
                                      attrs: {
                                        type: "text",
                                        id: "username",
                                        placeholder: _vm.__("username"),
                                        autocomplete: "username",
                                        required: "",
                                      },
                                      domProps: {
                                        value: _vm.settings.username,
                                      },
                                      on: {
                                        input: function ($event) {
                                          if ($event.target.composing) {
                                            return
                                          }
                                          _vm.$set(
                                            _vm.settings,
                                            "username",
                                            $event.target.value
                                          )
                                        },
                                      },
                                    }),
                                  ]),
                                ]),
                                _vm._v(" "),
                                _vm._l(_vm.passwordFields, function (f) {
                                  return _c(
                                    "div",
                                    { key: f.key, staticClass: "form-group" },
                                    [
                                      _c("label", { attrs: { for: f.key } }, [
                                        _vm._v(_vm._s(_vm.__(f.label))),
                                      ]),
                                      _vm._v(" "),
                                      _c("div", { staticClass: "field-icon" }, [
                                        _c("i", {
                                          staticClass:
                                            "bi bi-lock field-icon__lead",
                                          attrs: { "aria-hidden": "true" },
                                        }),
                                        _vm._v(" "),
                                        (_vm.showPw[f.key]
                                          ? "text"
                                          : "password") === "checkbox"
                                          ? _c("input", {
                                              directives: [
                                                {
                                                  name: "model",
                                                  rawName: "v-model",
                                                  value: _vm.settings[f.key],
                                                  expression: "settings[f.key]",
                                                },
                                              ],
                                              staticClass: "form-control",
                                              attrs: {
                                                id: f.key,
                                                placeholder: _vm.__(f.label),
                                                autocomplete: f.autocomplete,
                                                required: "",
                                                type: "checkbox",
                                              },
                                              domProps: {
                                                checked: Array.isArray(
                                                  _vm.settings[f.key]
                                                )
                                                  ? _vm._i(
                                                      _vm.settings[f.key],
                                                      null
                                                    ) > -1
                                                  : _vm.settings[f.key],
                                              },
                                              on: {
                                                change: function ($event) {
                                                  var $$a = _vm.settings[f.key],
                                                    $$el = $event.target,
                                                    $$c = $$el.checked
                                                      ? true
                                                      : false
                                                  if (Array.isArray($$a)) {
                                                    var $$v = null,
                                                      $$i = _vm._i($$a, $$v)
                                                    if ($$el.checked) {
                                                      $$i < 0 &&
                                                        _vm.$set(
                                                          _vm.settings,
                                                          f.key,
                                                          $$a.concat([$$v])
                                                        )
                                                    } else {
                                                      $$i > -1 &&
                                                        _vm.$set(
                                                          _vm.settings,
                                                          f.key,
                                                          $$a
                                                            .slice(0, $$i)
                                                            .concat(
                                                              $$a.slice($$i + 1)
                                                            )
                                                        )
                                                    }
                                                  } else {
                                                    _vm.$set(
                                                      _vm.settings,
                                                      f.key,
                                                      $$c
                                                    )
                                                  }
                                                },
                                              },
                                            })
                                          : (_vm.showPw[f.key]
                                              ? "text"
                                              : "password") === "radio"
                                          ? _c("input", {
                                              directives: [
                                                {
                                                  name: "model",
                                                  rawName: "v-model",
                                                  value: _vm.settings[f.key],
                                                  expression: "settings[f.key]",
                                                },
                                              ],
                                              staticClass: "form-control",
                                              attrs: {
                                                id: f.key,
                                                placeholder: _vm.__(f.label),
                                                autocomplete: f.autocomplete,
                                                required: "",
                                                type: "radio",
                                              },
                                              domProps: {
                                                checked: _vm._q(
                                                  _vm.settings[f.key],
                                                  null
                                                ),
                                              },
                                              on: {
                                                change: function ($event) {
                                                  return _vm.$set(
                                                    _vm.settings,
                                                    f.key,
                                                    null
                                                  )
                                                },
                                              },
                                            })
                                          : _c("input", {
                                              directives: [
                                                {
                                                  name: "model",
                                                  rawName: "v-model",
                                                  value: _vm.settings[f.key],
                                                  expression: "settings[f.key]",
                                                },
                                              ],
                                              staticClass: "form-control",
                                              attrs: {
                                                id: f.key,
                                                placeholder: _vm.__(f.label),
                                                autocomplete: f.autocomplete,
                                                required: "",
                                                type: _vm.showPw[f.key]
                                                  ? "text"
                                                  : "password",
                                              },
                                              domProps: {
                                                value: _vm.settings[f.key],
                                              },
                                              on: {
                                                input: function ($event) {
                                                  if ($event.target.composing) {
                                                    return
                                                  }
                                                  _vm.$set(
                                                    _vm.settings,
                                                    f.key,
                                                    $event.target.value
                                                  )
                                                },
                                              },
                                            }),
                                        _vm._v(" "),
                                        _c(
                                          "button",
                                          {
                                            staticClass: "field-icon__toggle",
                                            attrs: {
                                              type: "button",
                                              "aria-label": _vm.showPw[f.key]
                                                ? _vm.tr(
                                                    "hide_password",
                                                    "Hide password"
                                                  )
                                                : _vm.tr(
                                                    "show_password",
                                                    "Show password"
                                                  ),
                                            },
                                            on: {
                                              click: function ($event) {
                                                _vm.showPw[f.key] =
                                                  !_vm.showPw[f.key]
                                              },
                                            },
                                          },
                                          [
                                            _c("i", {
                                              class: _vm.showPw[f.key]
                                                ? "bi bi-eye-slash"
                                                : "bi bi-eye",
                                            }),
                                          ]
                                        ),
                                      ]),
                                    ]
                                  )
                                }),
                                _vm._v(" "),
                                _vm.settings.confirm_password &&
                                _vm.settings.password !==
                                  _vm.settings.confirm_password
                                  ? _c(
                                      "p",
                                      {
                                        staticClass:
                                          "field-hint field-hint--error mb-2",
                                      },
                                      [
                                        _c("i", {
                                          staticClass:
                                            "bi bi-exclamation-circle",
                                        }),
                                        _vm._v(
                                          "\n                                                    " +
                                            _vm._s(
                                              _vm.tr(
                                                "passwords_do_not_match",
                                                "New password and confirmation do not match."
                                              )
                                            ) +
                                            "\n                                                "
                                        ),
                                      ]
                                    )
                                  : _vm._e(),
                                _vm._v(" "),
                                _c("p", { staticClass: "field-hint mb-0" }, [
                                  _c("i", { staticClass: "bi bi-shield-lock" }),
                                  _vm._v(
                                    "\n                                                    " +
                                      _vm._s(
                                        _vm.tr(
                                          "password_change_hint",
                                          "After saving you will be taken back to the dashboard. Use your new password the next time you log in."
                                        )
                                      ) +
                                      "\n                                                "
                                  ),
                                ]),
                              ],
                              2
                            ),
                          ]),
                        ]),
                      ]),
                      _vm._v(" "),
                      _c(
                        "div",
                        {
                          staticClass: "card-footer d-flex justify-content-end",
                        },
                        [
                          _c(
                            "button",
                            {
                              staticClass: "btn btn-outline-secondary mr-2",
                              attrs: { type: "button" },
                              on: {
                                click: function ($event) {
                                  return _vm.$router.go(-1)
                                },
                              },
                            },
                            [_vm._v(_vm._s(_vm.__("back")))]
                          ),
                          _vm._v(" "),
                          _c(
                            "button",
                            {
                              staticClass: "btn btn-primary",
                              attrs: {
                                type: "submit",
                                disabled:
                                  _vm.isLoading &&
                                  _vm.savingForm === "password",
                              },
                            },
                            [
                              _vm._v(
                                "\n                                        " +
                                  _vm._s(_vm.__("save")) +
                                  " "
                              ),
                              _vm.isLoading && _vm.savingForm === "password"
                                ? _c("b-spinner", {
                                    attrs: { small: "", label: "Spinning" },
                                  })
                                : _vm._e(),
                            ],
                            1
                          ),
                        ]
                      ),
                    ]),
                  ]
                ),
              ]
            ),
          ]),
        ]),
      ]),
    ]),
  ])
}
var staticRenderFns = [
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "span",
      {
        staticClass: "icon-tile tone-primary",
        attrs: { "aria-hidden": "true" },
      },
      [_c("i", { staticClass: "bi bi-check2-all" })]
    )
  },
]
render._withStripped = true



/***/ })

}]);