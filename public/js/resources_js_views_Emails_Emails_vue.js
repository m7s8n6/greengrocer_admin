"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_views_Emails_Emails_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Emails/Edit.vue?vue&type=script&lang=js":
/*!************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Emails/Edit.vue?vue&type=script&lang=js ***!
  \************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var v_select2_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! v-select2-component */ "./node_modules/v-select2-component/dist/Select2.esm.js");
/* harmony import */ var _tinymce_tinymce_vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @tinymce/tinymce-vue */ "./node_modules/@tinymce/tinymce-vue/lib/es2015/main/ts/index.js");
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
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
  props: ['record', 'users', 'email_templates'],
  components: {
    Select2: v_select2_component__WEBPACK_IMPORTED_MODULE_1__["default"],
    'editor': _tinymce_tinymce_vue__WEBPACK_IMPORTED_MODULE_2__["default"]
  },
  data: function data() {
    return {
      isLoading: false,
      id: this.record ? this.record.id : null,
      type: this.record ? this.record.type : "",
      type_ids: this.record ? this.record.type_id : [],
      type_id: this.record ? this.record.type_id : 0,
      title: this.record ? this.record.title : "",
      message: this.record ? this.record.message : "",
      include_image: false,
      image: this.record ? this.record.image : "",
      image_url: this.record ? this.record.image : "",
      emailError: false,
      emailErrorMessage: ""
    };
  },
  computed: {
    modal_title: function modal_title() {
      var title = this.id ? __('edit') : __('add');
      title += " ";
      title += __('email');
      return title;
    },
    users_options: function users_options() {
      var temp = [];
      this.users.forEach(function (user) {
        temp.push({
          id: user.id,
          text: user.name
        });
      });
      return temp;
    },
    email_templates_options: function email_templates_options() {
      return this.email_templates.map(function (template) {
        return {
          id: template.id,
          type: template.type,
          title: template.title,
          message: template.message
        };
      });
    }
  },
  methods: {
    // TinyMCE init: global plugins/toolbar plus server image upload (URL in HTML, file on disk).
    getMessageEditorInit: function getMessageEditorInit() {
      return _objectSpread({
        height: 400,
        plugins: this.$editorPlugins,
        toolbar: this.$editorToolbar,
        font_size_formats: this.$editorFont_size_formats
      }, this.$tinymceImageUploadOptions());
    },
    showModal: function showModal() {
      this.$refs['my-modal'].show();
    },
    hideModal: function hideModal() {
      this.$refs['my-modal'].hide();
    },
    selectTemplate: function selectTemplate(template) {
      this.message = template.message;
    },
    dropFile: function dropFile(event) {
      event.preventDefault();
      this.$refs.file_image.files = event.dataTransfer.files;
      this.handleFileUpload(); // Trigger the onChange event manually
      // Clean up
      event.currentTarget.classList.add('bg-gray-100');
      event.currentTarget.classList.remove('bg-green-300');
    },
    handleFileUpload: function handleFileUpload() {
      this.image = this.$refs.file_image.files[0];
      this.image_url = URL.createObjectURL(this.image);
    },
    saveRecord: function saveRecord() {
      var _this = this;
      var vm = this;
      this.isLoading = true;
      var formData = new FormData();
      if (this.id) {
        formData.append('id', this.id);
      }
      formData.append('type', this.type);
      formData.append('type_ids', this.type_ids);
      formData.append('type_id', this.type_id);
      formData.append('type_link', this.type_link);
      formData.append('title', this.title);
      formData.append('message', this.message);
      formData.append('include_image', this.include_image);
      formData.append('image', this.image);
      var url = this.$apiUrl + '/emails/save';
      if (this.id) {
        url = this.$apiUrl + '/emails/update';
      }
      axios__WEBPACK_IMPORTED_MODULE_0___default().post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(function (res) {
        var data = res.data;
        if (data.status === 1) {
          var email = data.data;
          if (email && (email === null || email === void 0 ? void 0 : email.status) === 0) {
            _this.emailError = true;
            _this.emailErrorMessage = email.message;
          }
          setTimeout(function () {
            vm.$eventBus.$emit('emailSaved', data.message);
            vm.hideModal();
            vm.$swal.close();
            vm.$router.push({
              path: '/emails'
            });
          }, 2000);
        } else {
          vm.showError(data.message);
          vm.isLoading = false;
        }
      })["catch"](function (error) {
        vm.isLoading = false;
        if (error.message) {
          _this.showError(error.message);
        } else if (error.request.statusText && error.request.statusText !== "" && typeof error.request.statusText !== 'undefined') {
          _this.showError(error.request.statusText);
        } else {
          _this.showError("Something went wrong!");
        }
      });
    }
  },
  mounted: function mounted() {
    this.showModal();
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Emails/Emails.vue?vue&type=script&lang=js":
/*!**************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Emails/Emails.vue?vue&type=script&lang=js ***!
  \**************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Edit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Edit */ "./resources/js/views/Emails/Edit.vue");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
    'app-edit-record': _Edit__WEBPACK_IMPORTED_MODULE_0__["default"]
  },
  data: function data() {
    return {
      fields: [{
        key: 'id',
        label: __('id'),
        sortable: true,
        sortDirection: 'desc'
      }, {
        key: 'title',
        label: __('title'),
        sortable: true
      }, {
        key: 'message',
        label: __('message'),
        sortable: true
      }, {
        key: 'type',
        label: __('type')
      }, {
        key: 'type_id',
        label: __('type_id')
      }, {
        key: 'image',
        label: __('image')
      }, {
        key: 'actions',
        label: __('actions')
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
      sectionStyle: 'style_1',
      max_visible_units: 12,
      max_col_in_single_row: 3,
      create_new: null,
      edit_record: null,
      users: [],
      emails: [],
      email_templates: []
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
    pageEnd: function pageEnd() {
      return Math.min(this.currentPage * this.perPage, this.totalRows);
    }
  },
  mounted: function mounted() {
    // Set the initial number of items
    this.totalRows = this.emails.length;
  },
  watch: {
    $route: function $route(to, from) {
      this.showCreateModal();
    }
  },
  created: function created() {
    var _this = this;
    if (!this.$can('manage_emails')) {
      this.showError("You do not have permission to view this page.");
      this.$router.back();
    }
    this.showCreateModal();
    this.$eventBus.$on('emailSaved', function (message) {
      _this.showMessage("success", message);
      _this.getEmails();
      _this.create_new = null;
    });
    this.getEmails();
  },
  methods: {
    getEmails: function getEmails() {
      var _this2 = this;
      this.isLoading = true;
      axios.get(this.$apiUrl + '/emails').then(function (response) {
        _this2.isLoading = false;
        _this2.users = response.data.data.users;
        _this2.email_templates = response.data.data.email_templates;
        _this2.emails = response.data.data.emails;
        _this2.totalRows = _this2.emails.length;
      });
    },
    deleteEmail: function deleteEmail(index, id) {
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
          axios.post(_this3.$apiUrl + '/emails/delete', postData).then(function (response) {
            _this3.isLoading = false;
            _this3.emails.splice(index, 1);
            _this3.showMessage("success", response.data.message);
          });
        }
      });
    },
    showCreateModal: function showCreateModal() {
      var create = this.$route.params.create;
      if (create) {
        this.create_new = true;
      }
    },
    hideModal: function hideModal() {
      this.create_new = false;
      this.edit_record = false;
      this.$router.push({
        path: '/emails'
      });
    }
  }
});

/***/ }),

/***/ "./resources/js/views/Emails/Edit.vue":
/*!********************************************!*\
  !*** ./resources/js/views/Emails/Edit.vue ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Edit_vue_vue_type_template_id_25cef0da_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Edit.vue?vue&type=template&id=25cef0da&scoped=true */ "./resources/js/views/Emails/Edit.vue?vue&type=template&id=25cef0da&scoped=true");
/* harmony import */ var _Edit_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Edit.vue?vue&type=script&lang=js */ "./resources/js/views/Emails/Edit.vue?vue&type=script&lang=js");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Edit_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _Edit_vue_vue_type_template_id_25cef0da_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render,
  _Edit_vue_vue_type_template_id_25cef0da_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "25cef0da",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/Emails/Edit.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/views/Emails/Emails.vue":
/*!**********************************************!*\
  !*** ./resources/js/views/Emails/Emails.vue ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Emails_vue_vue_type_template_id_24111b20__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Emails.vue?vue&type=template&id=24111b20 */ "./resources/js/views/Emails/Emails.vue?vue&type=template&id=24111b20");
/* harmony import */ var _Emails_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Emails.vue?vue&type=script&lang=js */ "./resources/js/views/Emails/Emails.vue?vue&type=script&lang=js");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Emails_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _Emails_vue_vue_type_template_id_24111b20__WEBPACK_IMPORTED_MODULE_0__.render,
  _Emails_vue_vue_type_template_id_24111b20__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/Emails/Emails.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/views/Emails/Edit.vue?vue&type=script&lang=js":
/*!********************************************************************!*\
  !*** ./resources/js/views/Emails/Edit.vue?vue&type=script&lang=js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Edit_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Edit.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Emails/Edit.vue?vue&type=script&lang=js");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Edit_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/Emails/Emails.vue?vue&type=script&lang=js":
/*!**********************************************************************!*\
  !*** ./resources/js/views/Emails/Emails.vue?vue&type=script&lang=js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Emails_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Emails.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Emails/Emails.vue?vue&type=script&lang=js");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Emails_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/Emails/Edit.vue?vue&type=template&id=25cef0da&scoped=true":
/*!**************************************************************************************!*\
  !*** ./resources/js/views/Emails/Edit.vue?vue&type=template&id=25cef0da&scoped=true ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Edit_vue_vue_type_template_id_25cef0da_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   staticRenderFns: () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Edit_vue_vue_type_template_id_25cef0da_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Edit_vue_vue_type_template_id_25cef0da_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Edit.vue?vue&type=template&id=25cef0da&scoped=true */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Emails/Edit.vue?vue&type=template&id=25cef0da&scoped=true");


/***/ }),

/***/ "./resources/js/views/Emails/Emails.vue?vue&type=template&id=24111b20":
/*!****************************************************************************!*\
  !*** ./resources/js/views/Emails/Emails.vue?vue&type=template&id=24111b20 ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Emails_vue_vue_type_template_id_24111b20__WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   staticRenderFns: () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Emails_vue_vue_type_template_id_24111b20__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Emails_vue_vue_type_template_id_24111b20__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Emails.vue?vue&type=template&id=24111b20 */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Emails/Emails.vue?vue&type=template&id=24111b20");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Emails/Edit.vue?vue&type=template&id=25cef0da&scoped=true":
/*!*****************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Emails/Edit.vue?vue&type=template&id=25cef0da&scoped=true ***!
  \*****************************************************************************************************************************************************************************************************************************/
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
    "b-modal",
    {
      ref: "my-modal",
      attrs: {
        title: _vm.modal_title,
        size: "lg",
        scrollable: "",
        "no-close-on-backdrop": "",
        "no-fade": "",
        static: "",
        id: "mymodal",
        "no-enforce-focus": "",
      },
      on: {
        hidden: function ($event) {
          return _vm.$emit("modalClose")
        },
      },
    },
    [
      _c(
        "div",
        {
          staticClass: "d-flex justify-content-end gap-2 w-100",
          attrs: { slot: "modal-footer" },
          slot: "modal-footer",
        },
        [
          _c(
            "b-button",
            {
              attrs: { variant: "outline-secondary" },
              on: { click: _vm.hideModal },
            },
            [_vm._v(_vm._s(_vm.__("cancel")))]
          ),
          _vm._v(" "),
          _c(
            "b-button",
            {
              attrs: { variant: "primary", disabled: _vm.isLoading },
              on: {
                click: function ($event) {
                  return _vm.$refs["dummy_submit"].click()
                },
              },
            },
            [
              _vm._v(_vm._s(_vm.__("save")) + "\n            "),
              _vm.isLoading
                ? _c("b-spinner", { attrs: { small: "", label: "Spinning" } })
                : _vm._e(),
            ],
            1
          ),
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "form",
        {
          ref: "my-form",
          on: {
            submit: function ($event) {
              $event.preventDefault()
              return _vm.saveRecord.apply(null, arguments)
            },
          },
        },
        [
          _vm.emailError
            ? _c(
                "div",
                {
                  staticClass:
                    "alert alert-warning alert-dismissible fade show",
                  attrs: { role: "alert" },
                },
                [
                  _c("strong", [
                    _c("i", { staticClass: "bi bi-exclamation-triangle" }),
                    _vm._v(" " + _vm._s(_vm.__("warning"))),
                  ]),
                  _vm._v(
                    "\n            " +
                      _vm._s(_vm.emailErrorMessage) +
                      "\n            "
                  ),
                  _c("button", {
                    staticClass: "btn-close",
                    attrs: {
                      type: "button",
                      "data-bs-dismiss": "alert",
                      "aria-label": "Close",
                    },
                  }),
                ]
              )
            : _vm._e(),
          _vm._v(" "),
          _c("div", { staticClass: "row" }, [
            _c("div", { staticClass: "form-group col-12 col-md-6" }, [
              _c("label", { attrs: { for: "type" } }, [
                _vm._v(_vm._s(_vm.__("type"))),
              ]),
              _vm._v(" "),
              _c(
                "select",
                {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.type,
                      expression: "type",
                    },
                  ],
                  staticClass: "form-control form-select",
                  attrs: { name: "type", id: "type", required: "" },
                  on: {
                    change: function ($event) {
                      var $$selectedVal = Array.prototype.filter
                        .call($event.target.options, function (o) {
                          return o.selected
                        })
                        .map(function (o) {
                          var val = "_value" in o ? o._value : o.value
                          return val
                        })
                      _vm.type = $event.target.multiple
                        ? $$selectedVal
                        : $$selectedVal[0]
                    },
                  },
                },
                [
                  _c("option", { attrs: { value: "" } }, [
                    _vm._v(" " + _vm._s(_vm.__("select_type"))),
                  ]),
                  _vm._v(" "),
                  _c("option", { attrs: { value: "default" } }, [
                    _vm._v(" " + _vm._s(_vm.__("default"))),
                  ]),
                  _vm._v(" "),
                  _c("option", { attrs: { value: "user" } }, [
                    _vm._v(" " + _vm._s(_vm.__("customer"))),
                  ]),
                ]
              ),
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "form-group col-12 col-md-6" }, [
              _c("label", { attrs: { for: "title" } }, [
                _vm._v(" " + _vm._s(_vm.__("title"))),
              ]),
              _vm._v(" "),
              _c("input", {
                directives: [
                  {
                    name: "model",
                    rawName: "v-model",
                    value: _vm.title,
                    expression: "title",
                  },
                ],
                staticClass: "form-control",
                attrs: {
                  type: "text",
                  name: "title",
                  id: "title",
                  required: "",
                  placeholder: _vm.__("title"),
                },
                domProps: { value: _vm.title },
                on: {
                  input: function ($event) {
                    if ($event.target.composing) {
                      return
                    }
                    _vm.title = $event.target.value
                  },
                },
              }),
            ]),
            _vm._v(" "),
            _vm.type === "user"
              ? _c(
                  "div",
                  { staticClass: "form-group col-12" },
                  [
                    _c("label", [
                      _vm._v(" " + _vm._s(_vm.__("customer"))),
                      _c("small", { staticClass: "text-muted ml-1" }, [
                        _vm._v("(Ex: 100, 205, 360)"),
                      ]),
                    ]),
                    _vm._v(" "),
                    _c("Select2", {
                      attrs: {
                        placeholder: _vm.__("select_customer"),
                        options: _vm.users_options,
                        settings: {
                          multiple: "multiple",
                          width: "100%",
                          dropdownParent: "#mymodal",
                        },
                        required: "",
                      },
                      model: {
                        value: _vm.type_ids,
                        callback: function ($$v) {
                          _vm.type_ids = $$v
                        },
                        expression: "type_ids",
                      },
                    }),
                  ],
                  1
                )
              : _vm._e(),
            _vm._v(" "),
            _c("div", { staticClass: "form-group col-12" }, [
              _c("label", { attrs: { for: "message" } }, [
                _vm._v(" " + _vm._s(_vm.__("message")) + " "),
                _c("code", [_vm._v("[Customer Name]")]),
              ]),
              _vm._v(" "),
              _c(
                "div",
                { staticClass: "type-list d-flex flex-wrap gap-2 mb-2" },
                _vm._l(_vm.email_templates_options, function (template) {
                  return _c(
                    "span",
                    {
                      key: template.id,
                      class: [
                        "btn",
                        {
                          "btn-primary": _vm.type_ids.includes(template.id),
                          "btn-outline-primary": !_vm.type_ids.includes(
                            template.id
                          ),
                        },
                        "btn-sm",
                      ],
                      on: {
                        click: function ($event) {
                          return _vm.selectTemplate(template)
                        },
                      },
                    },
                    [
                      _vm._v(
                        "\n                        " +
                          _vm._s(template.type) +
                          "\n                    "
                      ),
                    ]
                  )
                }),
                0
              ),
              _vm._v(" "),
              _c(
                "div",
                { staticClass: "form-floating mb-3" },
                [
                  _c("editor", {
                    attrs: {
                      placeholder: _vm.__("enter_message"),
                      init: _vm.getMessageEditorInit(),
                    },
                    model: {
                      value: _vm.message,
                      callback: function ($$v) {
                        _vm.message = $$v
                      },
                      expression: "message",
                    },
                  }),
                  _vm._v(" "),
                  _c("label", { attrs: { for: "message" } }, [
                    _vm._v(" " + _vm._s(_vm.__("enter_email_message_here"))),
                  ]),
                ],
                1
              ),
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "form-group col-12" }, [
              _c("div", { staticClass: "form-check" }, [
                _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.include_image,
                      expression: "include_image",
                    },
                  ],
                  staticClass: "form-check-input",
                  attrs: {
                    name: "include_image",
                    id: "include_image",
                    type: "checkbox",
                  },
                  domProps: {
                    checked: Array.isArray(_vm.include_image)
                      ? _vm._i(_vm.include_image, null) > -1
                      : _vm.include_image,
                  },
                  on: {
                    change: function ($event) {
                      var $$a = _vm.include_image,
                        $$el = $event.target,
                        $$c = $$el.checked ? true : false
                      if (Array.isArray($$a)) {
                        var $$v = null,
                          $$i = _vm._i($$a, $$v)
                        if ($$el.checked) {
                          $$i < 0 && (_vm.include_image = $$a.concat([$$v]))
                        } else {
                          $$i > -1 &&
                            (_vm.include_image = $$a
                              .slice(0, $$i)
                              .concat($$a.slice($$i + 1)))
                        }
                      } else {
                        _vm.include_image = $$c
                      }
                    },
                  },
                }),
                _vm._v(" "),
                _c(
                  "label",
                  {
                    staticClass: "form-check-label",
                    attrs: { for: "include_image" },
                  },
                  [_vm._v(_vm._s(_vm.__("include_image")))]
                ),
              ]),
            ]),
            _vm._v(" "),
            (_vm.include_image === true && _vm.id) || _vm.include_image === true
              ? _c("div", { staticClass: "form-group col-12" }, [
                  _c("input", {
                    ref: "file_image",
                    staticClass: "file-input",
                    attrs: {
                      type: "file",
                      name: "email_image",
                      accept: "image/*,application/pdf",
                    },
                    on: { change: _vm.handleFileUpload },
                  }),
                  _vm._v(" "),
                  _c(
                    "div",
                    {
                      staticClass: "file-input-div bg-gray-100",
                      on: {
                        click: function ($event) {
                          return _vm.$refs.file_image.click()
                        },
                        drop: _vm.dropFile,
                        dragover: _vm.$dragoverFile,
                        dragleave: _vm.$dragleaveFile,
                      },
                    },
                    [
                      _vm.image && _vm.image.name !== ""
                        ? [
                            _c("label", [
                              _vm._v(
                                " " +
                                  _vm._s(_vm.__("selected_file_name")) +
                                  _vm._s(_vm.image.name)
                              ),
                            ]),
                          ]
                        : [
                            _c("label", [
                              _c("i", {
                                staticClass: "fa fa-cloud-upload-alt fa-2x",
                              }),
                            ]),
                            _vm._v(" "),
                            _c("label", [
                              _vm._v(
                                _vm._s(
                                  _vm.__("drop_files_here_or_click_to_upload")
                                )
                              ),
                            ]),
                          ],
                    ],
                    2
                  ),
                  _vm._v(" "),
                  _vm.image_url
                    ? _c("div", { staticClass: "row mt-2" }, [
                        _c("div", { staticClass: "col-6 col-md-3" }, [
                          _c("img", {
                            staticClass: "custom-image",
                            attrs: {
                              src: _vm.image_url,
                              title: "Store Logo",
                              alt: "Store Logo",
                            },
                          }),
                        ]),
                      ])
                    : _vm._e(),
                ])
              : _vm._e(),
          ]),
          _vm._v(" "),
          _c("button", { ref: "dummy_submit", staticClass: "d-none" }),
        ]
      ),
    ]
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Emails/Emails.vue?vue&type=template&id=24111b20":
/*!*******************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Emails/Emails.vue?vue&type=template&id=24111b20 ***!
  \*******************************************************************************************************************************************************************************************************************/
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
    [
      _c(
        "div",
        {
          staticClass:
            "page-heading d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-2 mb-3",
        },
        [
          _c("h3", { staticClass: "modern-page-title mb-0" }, [
            _vm._v(_vm._s(_vm.__("send_email"))),
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
                    { staticClass: "text-muted", attrs: { to: "/dashboard" } },
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
                [_vm._v(_vm._s(_vm.__("send_email")))]
              ),
            ]),
          ]),
        ]
      ),
      _vm._v(" "),
      _c("section", { staticClass: "section" }, [
        _c("div", { staticClass: "figma-main-section-card" }, [
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
                      attrs: {
                        type: "text",
                        placeholder: _vm.__("search") || "Search...",
                      },
                      domProps: { value: _vm.filter },
                      on: {
                        input: [
                          function ($event) {
                            if ($event.target.composing) {
                              return
                            }
                            _vm.filter = $event.target.value
                          },
                          function ($event) {
                            return _vm.getEmails()
                          },
                        ],
                      },
                    }),
                  ]),
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "d-flex gap-2" }, [
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
                          return _vm.getEmails()
                        },
                      },
                    },
                    [
                      _c("i", { staticClass: "fa fa-refresh" }),
                      _vm._v(" "),
                      _c("span", [_vm._v(_vm._s(_vm.__("refresh")))]),
                    ]
                  ),
                  _vm._v(" "),
                  _vm.$can("send_email")
                    ? _c(
                        "button",
                        {
                          staticClass:
                            "btn btn-figma-filter d-flex align-items-center gap-2",
                          on: {
                            click: function ($event) {
                              _vm.create_new = true
                            },
                          },
                        },
                        [
                          _c("i", { staticClass: "fa fa-plus" }),
                          _vm._v(" "),
                          _c("span", [_vm._v(_vm._s(_vm.__("send_email")))]),
                        ]
                      )
                    : _vm._e(),
                ]),
              ]
            ),
            _vm._v(" "),
            _c(
              "div",
              { staticClass: "table-responsive" },
              [
                _c("b-table", {
                  staticClass: "figma-order-table mb-0",
                  attrs: {
                    items: _vm.emails,
                    fields: _vm.fields,
                    "current-page": _vm.currentPage,
                    "per-page": _vm.perPage,
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
                            { staticClass: "text-center text-muted my-3" },
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
                      key: "empty",
                      fn: function (scope) {
                        return [
                          _c(
                            "div",
                            { staticClass: "text-center text-muted py-4" },
                            [
                              _c("i", {
                                staticClass: "fa fa-inbox fa-2x d-block mb-2",
                              }),
                              _vm._v(_vm._s(scope.emptyText)),
                            ]
                          ),
                        ]
                      },
                    },
                    {
                      key: "emptyfiltered",
                      fn: function (scope) {
                        return [
                          _c(
                            "div",
                            { staticClass: "text-center text-muted py-4" },
                            [
                              _c("i", {
                                staticClass: "fa fa-search fa-2x d-block mb-2",
                              }),
                              _vm._v(_vm._s(scope.emptyFilteredText)),
                            ]
                          ),
                        ]
                      },
                    },
                    {
                      key: "cell(image)",
                      fn: function (row) {
                        return [
                          _c("img", {
                            attrs: {
                              src: row.item.image
                                ? _vm.$storageUrl + row.item.image
                                : _vm.$placeholderImage,
                              height: "40",
                            },
                          }),
                        ]
                      },
                    },
                    {
                      key: "cell(actions)",
                      fn: function (row) {
                        return [
                          _c("div", { staticClass: "d-flex gap-2" }, [
                            _vm.$can("delete_send_email")
                              ? _c(
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
                                        return _vm.deleteEmail(
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
                                )
                              : _vm._e(),
                          ]),
                        ]
                      },
                    },
                    {
                      key: "cell(message)",
                      fn: function (row) {
                        return [
                          _c(
                            "div",
                            [
                              _c(
                                "span",
                                {
                                  staticClass: "figma-action-btn",
                                  attrs: {
                                    id: "bonus" + row.item.id,
                                    tabindex: "0",
                                    "aria-label": _vm.__("message"),
                                  },
                                },
                                [_c("i", { staticClass: "fa fa-eye" })]
                              ),
                              _vm._v(" "),
                              _c(
                                "b-popover",
                                {
                                  attrs: {
                                    target: "bonus" + row.item.id,
                                    triggers: "hover focus",
                                    placement: "left",
                                  },
                                },
                                [
                                  _c("div", {
                                    domProps: {
                                      innerHTML: _vm._s(row.item.message),
                                    },
                                  }),
                                ]
                              ),
                            ],
                            1
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
            _c(
              "div",
              { staticClass: "figma-table-footer flex-wrap gap-3" },
              [
                _c("table-count", {
                  attrs: {
                    "current-page": _vm.currentPage,
                    "per-page": _vm.perPage,
                    "total-rows": _vm.totalRows,
                  },
                }),
                _vm._v(" "),
                _c("b-pagination", {
                  staticClass: "figma-pagination mb-0",
                  attrs: {
                    "total-rows": _vm.totalRows,
                    "per-page": _vm.perPage,
                    align: "right",
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
      _vm._v(" "),
      _vm.create_new || _vm.edit_record
        ? _c("app-edit-record", {
            attrs: {
              record: _vm.edit_record,
              users: _vm.users,
              email_templates: _vm.email_templates,
            },
            on: {
              modalClose: function ($event) {
                return _vm.hideModal()
              },
            },
          })
        : _vm._e(),
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ })

}]);