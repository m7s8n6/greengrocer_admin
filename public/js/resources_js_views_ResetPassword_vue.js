"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_views_ResetPassword_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/ResetPassword.vue?vue&type=script&lang=js":
/*!**************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/ResetPassword.vue?vue&type=script&lang=js ***!
  \**************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Auth_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Auth.js */ "./resources/js/Auth.js");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
      showPassword: false,
      showPasswordConfirmation: false,
      user: {
        password: '',
        password_confirmation: '',
        token: ''
      },
      loggedUser: _Auth_js__WEBPACK_IMPORTED_MODULE_1__["default"].user
    };
  },
  mounted: function mounted() {
    if (this.loggedUser) {
      this.$router.push('/dashboard');
    }
  },
  methods: {
    resetPassword: function resetPassword() {
      var _this = this;
      this.user.token = this.$route.query.token;
      var vm = this;
      this.isLoading = true;
      var url = this.$apiUrl + '/reset-password';
      axios__WEBPACK_IMPORTED_MODULE_0___default().post(url, this.user).then(function (res) {
        vm.isLoading = false;
        var data = res.data;
        if (data.status === 1) {
          vm.showSuccess(data.message);
          setTimeout(function () {
            _this.$router.push('/login');
          }, 1000);
        } else {
          vm.showError(data.message);
        }
      })["catch"](function (error) {
        vm.isLoading = false;
        if (error.request.statusText) {
          _this.showError(error.request.statusText);
        } else if (error.message) {
          _this.showError(error.message);
        } else {
          _this.showError(__('something_went_wrong'));
        }
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/ResetPassword.vue?vue&type=style&index=0&id=0888257b&scoped=true&lang=css":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/ResetPassword.vue?vue&type=style&index=0&id=0888257b&scoped=true&lang=css ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
___CSS_LOADER_EXPORT___.push([module.id, "\n.login-logo-dark[data-v-0888257b] {\n    display: none;\n}\nbody.theme-dark .login-logo-light[data-v-0888257b] {\n    display: none;\n}\nbody.theme-dark .login-logo-dark[data-v-0888257b] {\n    display: block;\n}\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/ResetPassword.vue?vue&type=style&index=0&id=0888257b&scoped=true&lang=css":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/ResetPassword.vue?vue&type=style&index=0&id=0888257b&scoped=true&lang=css ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ResetPassword_vue_vue_type_style_index_0_id_0888257b_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./ResetPassword.vue?vue&type=style&index=0&id=0888257b&scoped=true&lang=css */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/ResetPassword.vue?vue&type=style&index=0&id=0888257b&scoped=true&lang=css");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ResetPassword_vue_vue_type_style_index_0_id_0888257b_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ResetPassword_vue_vue_type_style_index_0_id_0888257b_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./resources/js/views/ResetPassword.vue":
/*!**********************************************!*\
  !*** ./resources/js/views/ResetPassword.vue ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ResetPassword_vue_vue_type_template_id_0888257b_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ResetPassword.vue?vue&type=template&id=0888257b&scoped=true */ "./resources/js/views/ResetPassword.vue?vue&type=template&id=0888257b&scoped=true");
/* harmony import */ var _ResetPassword_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ResetPassword.vue?vue&type=script&lang=js */ "./resources/js/views/ResetPassword.vue?vue&type=script&lang=js");
/* harmony import */ var _ResetPassword_vue_vue_type_style_index_0_id_0888257b_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ResetPassword.vue?vue&type=style&index=0&id=0888257b&scoped=true&lang=css */ "./resources/js/views/ResetPassword.vue?vue&type=style&index=0&id=0888257b&scoped=true&lang=css");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _ResetPassword_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _ResetPassword_vue_vue_type_template_id_0888257b_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render,
  _ResetPassword_vue_vue_type_template_id_0888257b_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "0888257b",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/ResetPassword.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/views/ResetPassword.vue?vue&type=script&lang=js":
/*!**********************************************************************!*\
  !*** ./resources/js/views/ResetPassword.vue?vue&type=script&lang=js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ResetPassword_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./ResetPassword.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/ResetPassword.vue?vue&type=script&lang=js");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ResetPassword_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/ResetPassword.vue?vue&type=style&index=0&id=0888257b&scoped=true&lang=css":
/*!******************************************************************************************************!*\
  !*** ./resources/js/views/ResetPassword.vue?vue&type=style&index=0&id=0888257b&scoped=true&lang=css ***!
  \******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ResetPassword_vue_vue_type_style_index_0_id_0888257b_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/style-loader/dist/cjs.js!../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./ResetPassword.vue?vue&type=style&index=0&id=0888257b&scoped=true&lang=css */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/ResetPassword.vue?vue&type=style&index=0&id=0888257b&scoped=true&lang=css");


/***/ }),

/***/ "./resources/js/views/ResetPassword.vue?vue&type=template&id=0888257b&scoped=true":
/*!****************************************************************************************!*\
  !*** ./resources/js/views/ResetPassword.vue?vue&type=template&id=0888257b&scoped=true ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ResetPassword_vue_vue_type_template_id_0888257b_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   staticRenderFns: () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ResetPassword_vue_vue_type_template_id_0888257b_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ResetPassword_vue_vue_type_template_id_0888257b_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./ResetPassword.vue?vue&type=template&id=0888257b&scoped=true */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/ResetPassword.vue?vue&type=template&id=0888257b&scoped=true");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/ResetPassword.vue?vue&type=template&id=0888257b&scoped=true":
/*!*******************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/ResetPassword.vue?vue&type=template&id=0888257b&scoped=true ***!
  \*******************************************************************************************************************************************************************************************************************************/
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
  return _c(
    "div",
    {
      staticClass: "auth",
      style: { backgroundImage: "url(" + _vm.$panelLoginBackgroundImg + ")" },
    },
    [
      _c("div", { staticClass: "login-wrapper" }, [
        _c("div", { staticClass: "auth-section" }, [
          _c("div", { staticClass: "auth-card" }, [
            _c("div", { staticClass: "auth-logo" }, [
              _c(
                "a",
                {
                  staticClass:
                    "d-flex align-items-center justify-content-center",
                  attrs: { href: "javascript:void(0)" },
                },
                [
                  _vm.$appLogo != ""
                    ? _c("img", {
                        staticClass: "auth-logo-img login-logo-light",
                        attrs: {
                          src: _vm.$storageUrl + _vm.$appLogo,
                          alt: "Logo",
                        },
                      })
                    : _c("img", {
                        staticClass: "auth-logo-img login-logo-light",
                        attrs: {
                          src: _vm.$baseUrl + "/images/logo.png",
                          alt: "Logo",
                        },
                      }),
                  _vm._v(" "),
                  _vm.$appDarkLogo
                    ? _c("img", {
                        staticClass: "auth-logo-img login-logo-dark",
                        attrs: {
                          src: _vm.$storageUrl + _vm.$appDarkLogo,
                          alt: "Logo",
                        },
                      })
                    : _vm._e(),
                ]
              ),
            ]),
            _vm._v(" "),
            _c("h4", [_vm._v(_vm._s(_vm.__("reset_your_password_here")))]),
            _vm._v(" "),
            _c(
              "form",
              {
                staticClass: "mt-4",
                on: {
                  submit: function ($event) {
                    $event.preventDefault()
                    return _vm.resetPassword()
                  },
                },
              },
              [
                _c(
                  "div",
                  { staticClass: "form-group position-relative has-icon-left" },
                  [
                    (_vm.showPassword ? "text" : "password") === "checkbox"
                      ? _c("input", {
                          directives: [
                            {
                              name: "model",
                              rawName: "v-model",
                              value: _vm.user.password,
                              expression: "user.password",
                            },
                          ],
                          staticClass: "form-control form-control-xl",
                          attrs: {
                            placeholder: _vm.__("new_password"),
                            required: "",
                            type: "checkbox",
                          },
                          domProps: {
                            checked: Array.isArray(_vm.user.password)
                              ? _vm._i(_vm.user.password, null) > -1
                              : _vm.user.password,
                          },
                          on: {
                            change: function ($event) {
                              var $$a = _vm.user.password,
                                $$el = $event.target,
                                $$c = $$el.checked ? true : false
                              if (Array.isArray($$a)) {
                                var $$v = null,
                                  $$i = _vm._i($$a, $$v)
                                if ($$el.checked) {
                                  $$i < 0 &&
                                    _vm.$set(
                                      _vm.user,
                                      "password",
                                      $$a.concat([$$v])
                                    )
                                } else {
                                  $$i > -1 &&
                                    _vm.$set(
                                      _vm.user,
                                      "password",
                                      $$a
                                        .slice(0, $$i)
                                        .concat($$a.slice($$i + 1))
                                    )
                                }
                              } else {
                                _vm.$set(_vm.user, "password", $$c)
                              }
                            },
                          },
                        })
                      : (_vm.showPassword ? "text" : "password") === "radio"
                      ? _c("input", {
                          directives: [
                            {
                              name: "model",
                              rawName: "v-model",
                              value: _vm.user.password,
                              expression: "user.password",
                            },
                          ],
                          staticClass: "form-control form-control-xl",
                          attrs: {
                            placeholder: _vm.__("new_password"),
                            required: "",
                            type: "radio",
                          },
                          domProps: {
                            checked: _vm._q(_vm.user.password, null),
                          },
                          on: {
                            change: function ($event) {
                              return _vm.$set(_vm.user, "password", null)
                            },
                          },
                        })
                      : _c("input", {
                          directives: [
                            {
                              name: "model",
                              rawName: "v-model",
                              value: _vm.user.password,
                              expression: "user.password",
                            },
                          ],
                          staticClass: "form-control form-control-xl",
                          attrs: {
                            placeholder: _vm.__("new_password"),
                            required: "",
                            type: _vm.showPassword ? "text" : "password",
                          },
                          domProps: { value: _vm.user.password },
                          on: {
                            input: function ($event) {
                              if ($event.target.composing) {
                                return
                              }
                              _vm.$set(
                                _vm.user,
                                "password",
                                $event.target.value
                              )
                            },
                          },
                        }),
                    _vm._v(" "),
                    _vm._m(0),
                    _vm._v(" "),
                    _c(
                      "button",
                      {
                        staticClass: "auth-pw-toggle",
                        attrs: { type: "button" },
                        on: {
                          click: function ($event) {
                            _vm.showPassword = !_vm.showPassword
                          },
                        },
                      },
                      [
                        _c("img", {
                          attrs: {
                            src: _vm.showPassword
                              ? _vm.$baseUrl + "/images/icons/show_password.svg"
                              : _vm.$baseUrl +
                                "/images/icons/hide_password.svg",
                            alt: "toggle-password",
                          },
                        }),
                      ]
                    ),
                  ]
                ),
                _vm._v(" "),
                _c(
                  "div",
                  { staticClass: "form-group position-relative has-icon-left" },
                  [
                    (_vm.showPasswordConfirmation ? "text" : "password") ===
                    "checkbox"
                      ? _c("input", {
                          directives: [
                            {
                              name: "model",
                              rawName: "v-model",
                              value: _vm.user.password_confirmation,
                              expression: "user.password_confirmation",
                            },
                          ],
                          staticClass: "form-control form-control-xl",
                          attrs: {
                            placeholder: _vm.__("confirm_new_password"),
                            required: "",
                            type: "checkbox",
                          },
                          domProps: {
                            checked: Array.isArray(
                              _vm.user.password_confirmation
                            )
                              ? _vm._i(_vm.user.password_confirmation, null) >
                                -1
                              : _vm.user.password_confirmation,
                          },
                          on: {
                            change: function ($event) {
                              var $$a = _vm.user.password_confirmation,
                                $$el = $event.target,
                                $$c = $$el.checked ? true : false
                              if (Array.isArray($$a)) {
                                var $$v = null,
                                  $$i = _vm._i($$a, $$v)
                                if ($$el.checked) {
                                  $$i < 0 &&
                                    _vm.$set(
                                      _vm.user,
                                      "password_confirmation",
                                      $$a.concat([$$v])
                                    )
                                } else {
                                  $$i > -1 &&
                                    _vm.$set(
                                      _vm.user,
                                      "password_confirmation",
                                      $$a
                                        .slice(0, $$i)
                                        .concat($$a.slice($$i + 1))
                                    )
                                }
                              } else {
                                _vm.$set(_vm.user, "password_confirmation", $$c)
                              }
                            },
                          },
                        })
                      : (_vm.showPasswordConfirmation ? "text" : "password") ===
                        "radio"
                      ? _c("input", {
                          directives: [
                            {
                              name: "model",
                              rawName: "v-model",
                              value: _vm.user.password_confirmation,
                              expression: "user.password_confirmation",
                            },
                          ],
                          staticClass: "form-control form-control-xl",
                          attrs: {
                            placeholder: _vm.__("confirm_new_password"),
                            required: "",
                            type: "radio",
                          },
                          domProps: {
                            checked: _vm._q(
                              _vm.user.password_confirmation,
                              null
                            ),
                          },
                          on: {
                            change: function ($event) {
                              return _vm.$set(
                                _vm.user,
                                "password_confirmation",
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
                              value: _vm.user.password_confirmation,
                              expression: "user.password_confirmation",
                            },
                          ],
                          staticClass: "form-control form-control-xl",
                          attrs: {
                            placeholder: _vm.__("confirm_new_password"),
                            required: "",
                            type: _vm.showPasswordConfirmation
                              ? "text"
                              : "password",
                          },
                          domProps: { value: _vm.user.password_confirmation },
                          on: {
                            input: function ($event) {
                              if ($event.target.composing) {
                                return
                              }
                              _vm.$set(
                                _vm.user,
                                "password_confirmation",
                                $event.target.value
                              )
                            },
                          },
                        }),
                    _vm._v(" "),
                    _vm._m(1),
                    _vm._v(" "),
                    _c(
                      "button",
                      {
                        staticClass: "auth-pw-toggle",
                        attrs: { type: "button" },
                        on: {
                          click: function ($event) {
                            _vm.showPasswordConfirmation =
                              !_vm.showPasswordConfirmation
                          },
                        },
                      },
                      [
                        _c("img", {
                          attrs: {
                            src: _vm.showPasswordConfirmation
                              ? _vm.$baseUrl + "/images/icons/show_password.svg"
                              : _vm.$baseUrl +
                                "/images/icons/hide_password.svg",
                            alt: "toggle-password",
                          },
                        }),
                      ]
                    ),
                  ]
                ),
                _vm._v(" "),
                _c(
                  "button",
                  {
                    staticClass:
                      "btn btn-primary btn-block btn-lg shadow-lg mt-5 auth-btn",
                  },
                  [
                    _vm._v(
                      "\n                        " +
                        _vm._s(_vm.__("reset_password")) +
                        "\n                        "
                    ),
                    _vm.isLoading
                      ? _c("b-spinner", {
                          attrs: { small: "", label: "Spinning" },
                        })
                      : _vm._e(),
                  ],
                  1
                ),
              ]
            ),
            _vm._v(" "),
            _c("div", { staticClass: "auth-copyright" }, [
              _c(
                "a",
                {
                  staticClass: "text-primary font-weight-normal",
                  attrs: { href: "javascript:void(0)" },
                },
                [
                  _vm._v(
                    " @ " +
                      _vm._s(new Date().getFullYear()) +
                      " " +
                      _vm._s(_vm.$appName) +
                      ". All Right Reserved"
                  ),
                ]
              ),
            ]),
          ]),
        ]),
      ]),
    ]
  )
}
var staticRenderFns = [
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "form-control-icon" }, [
      _c("i", { staticClass: "bi bi-key" }),
    ])
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "form-control-icon" }, [
      _c("i", { staticClass: "bi bi-key" }),
    ])
  },
]
render._withStripped = true



/***/ })

}]);