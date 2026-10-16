"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_views_CustomFields_CustomFields_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/CustomFields/CustomFields.vue?vue&type=script&lang=js":
/*!**************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/CustomFields/CustomFields.vue?vue&type=script&lang=js ***!
  \**************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _mixins_TranslationHelper_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../mixins/TranslationHelper.js */ "./resources/js/mixins/TranslationHelper.js");
/* harmony import */ var _Auth_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../Auth.js */ "./resources/js/Auth.js");
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
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
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
  mixins: [_mixins_TranslationHelper_js__WEBPACK_IMPORTED_MODULE_1__["default"]],
  data: function data() {
    return {
      activeTab: 0,
      activeFormTab: 0,
      customFields: [],
      filter: null,
      filterOn: [],
      totalRows: 0,
      currentPage: 1,
      perPage: this.$perPage || 10,
      pageOptions: this.$pageOptions || [5, 10, 15, 20],
      isLoading: false,
      isSaving: false,
      isEditing: false,
      editingId: null,
      type: 'text',
      is_required: false,
      status: true,
      languages: [],
      defaultLanguageId: null,
      form: {},
      optionInputText: {},
      tabsKey: 0,
      // Translate buttons (field name only - dropdown options are not auto-translated)
      translatableFields: ['name'],
      loadingEmpty: false,
      loadingOverwrite: false,
      fields: [{
        key: 'id',
        label: __('id'),
        "class": 'text-center'
      }, {
        key: 'name',
        label: __('field_name'),
        "class": 'text-center'
      }, {
        key: 'type',
        label: __('field_type'),
        "class": 'text-center'
      }, {
        key: 'is_required',
        label: __('required'),
        "class": 'text-center'
      }, {
        key: 'owner',
        label: __('owner') || 'Owner',
        "class": 'text-center'
      }, {
        key: 'status',
        label: __('status'),
        "class": 'text-center'
      }, {
        key: 'actions',
        label: __('actions'),
        "class": 'text-center'
      }]
    };
  },
  computed: {
    module: function module() {
      var map = {
        0: 'seller',
        1: 'delivery_boy',
        2: 'customer',
        3: 'product'
      };
      return map[this.activeTab] || 'seller';
    },
    isSeller: function isSeller() {
      return !!(_Auth_js__WEBPACK_IMPORTED_MODULE_2__["default"].user && _Auth_js__WEBPACK_IMPORTED_MODULE_2__["default"].user.role && _Auth_js__WEBPACK_IMPORTED_MODULE_2__["default"].user.role.name === 'Seller' && _Auth_js__WEBPACK_IMPORTED_MODULE_2__["default"].user.seller !== null);
    },
    currentSellerId: function currentSellerId() {
      return this.isSeller ? _Auth_js__WEBPACK_IMPORTED_MODULE_2__["default"].user.seller.id : null;
    },
    visibleFields: function visibleFields() {
      if (this.module !== 'product') {
        return this.fields.filter(function (f) {
          return f.key !== 'owner';
        });
      }
      return this.fields;
    }
  },
  watch: {
    activeTab: function activeTab() {
      this.currentPage = 1;
      this.getRecords();
    },
    currentPage: function currentPage() {
      this.getRecords();
    },
    perPage: function perPage() {
      if (this.currentPage !== 1) {
        this.currentPage = 1;
      } else {
        this.getRecords();
      }
    },
    '$route.params.module': {
      immediate: true,
      handler: function handler(value) {
        var map = {
          delivery_boy: 1,
          customer: 2,
          product: 3
        };
        this.activeTab = map[value] !== undefined ? map[value] : 0;
      }
    }
  },
  created: function created() {
    var _this = this;
    if (this.isSeller) {
      this.activeTab = 3;
    }
    this.loadLanguages().then(function () {
      return _this.getRecords();
    });
  },
  methods: {
    // Admin manages everything through the normal role permissions; a seller only their
    // own (seller_id matches) - a global field (seller_id null) stays admin-only even when
    // a seller can see/use it on their products.
    canEdit: function canEdit(item) {
      if (this.isSeller) {
        return item.seller_id === this.currentSellerId;
      }
      return this.$can('custom_field_update');
    },
    canDelete: function canDelete(item) {
      if (this.isSeller) {
        return item.seller_id === this.currentSellerId;
      }
      return this.$can('custom_field_delete');
    },
    typeLabel: function typeLabel(type) {
      var map = {
        text: __('text'),
        number: __('number'),
        dropdown: __('dropdown'),
        file: __('file'),
        textarea: __('textarea')
      };
      return map[type] || type;
    },
    loadLanguages: function loadLanguages() {
      var _this2 = this;
      return axios__WEBPACK_IMPORTED_MODULE_0___default().get(this.$apiUrl + '/active_languages').then(function (res) {
        _this2.languages = res.data.data || [];
        var defaultLang = _this2.languages.find(function (l) {
          return l.is_default;
        });
        _this2.defaultLanguageId = defaultLang ? defaultLang.id : null;
        _this2.initializeForm();
      });
    },
    initializeForm: function initializeForm() {
      var _this3 = this;
      this.languages.forEach(function (lang) {
        if (!_this3.form[lang.id]) {
          _this3.$set(_this3.form, lang.id, {
            name: '',
            options: []
          });
        }
        _this3.$set(_this3.optionInputText, lang.id, '');
      });
    },
    focusOptionInput: function focusOptionInput(langId) {
      var input = this.$refs['optionInput_' + langId];
      var el = Array.isArray(input) ? input[0] : input;
      if (el) el.focus();
    },
    handleOptionKeydown: function handleOptionKeydown(event, langId) {
      if (event.key === ',') {
        event.preventDefault();
        this.addOption(langId);
      } else if (event.key === 'Backspace' && !this.optionInputText[langId] && this.form[langId].options.length) {
        this.form[langId].options.pop();
      }
    },
    addOption: function addOption(langId) {
      var value = (this.optionInputText[langId] || '').trim();
      if (!value) return;
      if (!this.form[langId].options.includes(value)) {
        this.form[langId].options.push(value);
      }
      this.optionInputText[langId] = '';
    },
    removeOption: function removeOption(langId, index) {
      this.form[langId].options.splice(index, 1);
    },
    getRecords: function getRecords() {
      var _this4 = this;
      this.isLoading = true;
      axios__WEBPACK_IMPORTED_MODULE_0___default().get(this.$apiUrl + '/custom_fields/list', {
        params: {
          module: this.module,
          page: this.currentPage,
          per_page: this.perPage,
          filter: this.filter
        }
      }).then(function (response) {
        _this4.isLoading = false;
        var data = response.data.data || [];
        _this4.customFields = data.map(function (field) {
          return _objectSpread(_objectSpread({}, field), {}, {
            status: !!field.status,
            is_required: !!field.is_required
          });
        });
        _this4.totalRows = response.data.total || 0;
      })["catch"](function () {
        _this4.isLoading = false;
      });
    },
    optionsToArray: function optionsToArray(options) {
      return Array.isArray(options) ? _toConsumableArray(options) : [];
    },
    resetForm: function resetForm() {
      this.form = {};
      this.optionInputText = {};
      this.type = 'text';
      this.is_required = false;
      this.status = true;
      this.activeFormTab = 0;
      this.editingId = null;
      this.initializeForm();
    },
    openAddModal: function openAddModal() {
      var _this5 = this;
      this.isEditing = false;
      this.resetForm();
      this.tabsKey++;
      this.$nextTick(function () {
        return _this5.$refs['field-modal'].show();
      });
    },
    openEditModal: function openEditModal(item) {
      var _this6 = this;
      this.isEditing = true;
      this.editingId = item.id;
      this.type = item.type;
      this.is_required = !!item.is_required;
      this.status = !!item.status;
      this.activeFormTab = 0;
      this.form = {};
      this.languages.forEach(function (lang) {
        var translation = Array.isArray(item.translations) ? item.translations.find(function (t) {
          return t.language_id === lang.id;
        }) : null;
        if (lang.is_default) {
          _this6.$set(_this6.form, lang.id, {
            name: translation && translation.name ? translation.name : item.name || '',
            options: _this6.optionsToArray(translation && translation.options && translation.options.length ? translation.options : item.options)
          });
        } else {
          _this6.$set(_this6.form, lang.id, {
            name: translation && translation.name ? translation.name : '',
            options: _this6.optionsToArray(translation ? translation.options : [])
          });
        }
        _this6.$set(_this6.optionInputText, lang.id, '');
      });
      this.tabsKey++;
      this.$nextTick(function () {
        return _this6.$refs['field-modal'].show();
      });
    },
    hideModal: function hideModal() {
      this.$refs['field-modal'].hide();
    },
    switchToDefaultLanguageTab: function switchToDefaultLanguageTab() {
      var _this7 = this;
      var index = this.languages.findIndex(function (lang) {
        return lang.id === _this7.defaultLanguageId;
      });
      if (index !== -1) this.activeFormTab = index;
    },
    saveRecord: function saveRecord() {
      var _this8 = this;
      if (this.type === 'dropdown') {
        this.languages.forEach(function (lang) {
          return _this8.addOption(lang.id);
        });
      }
      if (!this.defaultLanguageId || !this.form[this.defaultLanguageId]) {
        this.showError(__('default_language_not_found'));
        return;
      }
      var defaultForm = this.form[this.defaultLanguageId];
      if (!defaultForm.name || !defaultForm.name.trim()) {
        this.showError(__('field_name') + ' ' + __('required'));
        this.switchToDefaultLanguageTab();
        return;
      }
      if (this.type === 'dropdown' && (!defaultForm.options || !defaultForm.options.length)) {
        this.showError(__('options') + ' ' + __('required'));
        this.switchToDefaultLanguageTab();
        return;
      }
      this.isSaving = true;
      var postData = {
        module: this.module,
        type: this.type,
        is_required: this.is_required ? 1 : 0,
        status: this.status ? 1 : 0,
        translations: {}
      };
      this.languages.forEach(function (lang) {
        var langForm = _this8.form[lang.id] || {
          name: '',
          options: []
        };
        postData.translations[lang.id] = {
          name: langForm.name || '',
          options: _this8.type === 'dropdown' ? langForm.options || [] : []
        };
      });
      var url = this.isEditing ? '/custom_fields/update' : '/custom_fields/save';
      if (this.isEditing) {
        postData.id = this.editingId;
      }
      axios__WEBPACK_IMPORTED_MODULE_0___default().post(this.$apiUrl + url, postData).then(function (response) {
        _this8.isSaving = false;
        if (response.data.status === 1) {
          _this8.showMessage('success', response.data.message);
          _this8.hideModal();
          _this8.getRecords();
        } else {
          _this8.showError(response.data.message);
        }
      })["catch"](function (error) {
        var _error$response, _error$response$data;
        _this8.isSaving = false;
        _this8.showError(((_error$response = error.response) === null || _error$response === void 0 ? void 0 : (_error$response$data = _error$response.data) === null || _error$response$data === void 0 ? void 0 : _error$response$data.message) || __('something_went_wrong'));
      });
    },
    deleteRecord: function deleteRecord(id) {
      var _this9 = this;
      this.$swal.fire({
        title: __('are_you_sure'),
        text: __('you_want_be_able_to_revert_this'),
        confirmButtonText: __('yes_sure'),
        cancelButtonText: __('cancel'),
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#37a279',
        cancelButtonColor: '#d33'
      }).then(function (result) {
        if (result.value) {
          axios__WEBPACK_IMPORTED_MODULE_0___default().post(_this9.$apiUrl + '/custom_fields/delete', {
            id: id
          }).then(function (response) {
            _this9.showMessage('success', response.data.message);
            _this9.getRecords();
          });
        }
      });
    },
    toggleStatus: function toggleStatus(item) {
      var _this10 = this;
      axios__WEBPACK_IMPORTED_MODULE_0___default().post(this.$apiUrl + '/custom_fields/update_status', {
        id: item.id,
        status: item.status ? 1 : 0
      }).then(function (response) {
        if (response.data.status === 1) {
          _this10.showMessage('success', response.data.message);
        } else {
          _this10.showError(response.data.message);
          item.status = !item.status;
        }
      })["catch"](function () {
        _this10.showError(__('something_went_wrong'));
        item.status = !item.status;
      });
    }
  }
});

/***/ }),

/***/ "./resources/js/mixins/TranslationHelper.js":
/*!**************************************************!*\
  !*** ./resources/js/mixins/TranslationHelper.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  methods: {
    translateEmpty: function translateEmpty(language) {
      var _this = this;
      this.$root.$emit('bv::hide::tooltip');
      if (typeof this.validateDefaultLanguageForTranslation === "function") {
        if (!this.validateDefaultLanguageForTranslation()) return;
      }
      if (this.hasOwnProperty("loadingEmpty")) {
        this.loadingEmpty = true;
      } else {
        this.isTranslating = true;
      }
      var fields = this.translatableFields || [];

      // Check if any field is empty in non-default language tabs
      var hasEmptyFields = this.checkNonDefaultLanguagesHaveEmptyFields(fields);
      if (!hasEmptyFields) {
        // All fields in all non-default languages already have values
        var errorMsg = __("translation_error_all_fields_filled") || "All fields already have values. There is nothing to translate.";
        if (this.hasOwnProperty("loadingEmpty")) {
          this.loadingEmpty = false;
        } else {
          this.isTranslating = false;
        }
        this.showError(errorMsg);
        return;
      }
      this.translateEmptyHelper(language, fields).then(function () {
        _this.showSuccess(__("translation_completed_successfully") || "Translation completed successfully");
      })["catch"](function () {
        // Error handling is done in translateEmptyHelper
      })["finally"](function () {
        if (_this.hasOwnProperty("loadingEmpty")) {
          _this.loadingEmpty = false;
        } else {
          _this.isTranslating = false;
        }
      });
    },
    translateOverwrite: function translateOverwrite(language) {
      var _this2 = this;
      this.$root.$emit('bv::hide::tooltip');
      if (typeof this.validateDefaultLanguageForTranslation === "function") {
        if (!this.validateDefaultLanguageForTranslation()) return;
      }
      if (this.hasOwnProperty("loadingOverwrite")) {
        this.loadingOverwrite = true;
      } else {
        this.isTranslating = true;
      }
      var fields = this.translatableFields || [];
      this.translateOverwriteHelper(language, fields).then(function () {
        _this2.showSuccess(__("translation_overwritten_successfully") || "Translation overwritten successfully");
      })["finally"](function () {
        if (_this2.hasOwnProperty("loadingOverwrite")) {
          _this2.loadingOverwrite = false;
        } else {
          _this2.isTranslating = false;
        }
      });
    },
    getDefaultLanguageData: function getDefaultLanguageData() {
      if (this.translations && this.translations[this.defaultLanguageId]) {
        return this.translations[this.defaultLanguageId];
      } else if (this.form && this.form[this.defaultLanguageId]) {
        return this.form[this.defaultLanguageId];
      }
      return {};
    },
    checkNonDefaultLanguagesHaveEmptyFields: function checkNonDefaultLanguagesHaveEmptyFields() {
      var fieldsToTranslate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      // Determine target object (translations or form)
      var targetObj = null;
      if (this.translations) {
        targetObj = this.translations;
      } else if (this.form) {
        targetObj = this.form;
      }
      if (!targetObj || !this.languages || this.languages.length <= 1) {
        return true; // If no languages or only one language, allow translation
      }
      var fields = fieldsToTranslate.length > 0 ? fieldsToTranslate : this.translatableFields || [];
      if (fields.length === 0) {
        return true; // If no fields to check, allow translation
      }

      // Check if any non-default language has at least one empty field
      var _iterator = _createForOfIteratorHelper(this.languages),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var lang = _step.value;
          if (lang.is_default) continue; // Skip default language

          var langData = targetObj[lang.id];
          if (!langData) {
            return true; // If language data doesn't exist, there are empty fields
          }

          // Check if any field is empty for this language
          var _iterator2 = _createForOfIteratorHelper(fields),
            _step2;
          try {
            for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
              var field = _step2.value;
              var value = langData[field];
              if (value === null || value === undefined || value === "" || typeof value === "string" && value.trim() === "") {
                return true; // Found at least one empty field
              }
            }
          } catch (err) {
            _iterator2.e(err);
          } finally {
            _iterator2.f();
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      return false; // All fields in all non-default languages have values
    },
    translateEmptyHelper: function translateEmptyHelper(language) {
      var _this3 = this;
      var fieldsToTranslate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      var source = this.getDefaultLanguageData();
      if (!source || Object.keys(source).length === 0) {
        var errorMsg = __("default_language_data_missing");
        this.showError(errorMsg);
        return Promise.reject("default_language_data_missing");
      }

      // Determine target object (translations or form)
      var targetObj = null;
      if (this.translations) {
        targetObj = this.translations;
      } else if (this.form) {
        targetObj = this.form;
      }
      var dataToSend = {};
      if (fieldsToTranslate.length > 0) {
        fieldsToTranslate.forEach(function (field) {
          dataToSend[field] = source[field];
        });
      } else {
        Object.keys(source).forEach(function (key) {
          if (_typeof(source[key]) !== "object") {
            dataToSend[key] = source[key];
          }
        });
      }

      // Check if all fields in dataToSend are null or empty
      var allFieldsNull = Object.keys(dataToSend).length > 0 && Object.keys(dataToSend).every(function (field) {
        var value = dataToSend[field];
        return value === null || value === undefined || value === "" || typeof value === "string" && value.trim() === "";
      });
      if (allFieldsNull) {
        var _errorMsg = __("translation_error_all_fields_empty") || "All fields are empty. Please fill at least one field in default language before translating.";
        this.showError(_errorMsg);
        return Promise.reject(new Error(_errorMsg));
      }
      return axios__WEBPACK_IMPORTED_MODULE_0___default().post("/api/languages/translate-empty", {
        target_language: language.code,
        data: dataToSend
      }).then(function (res) {
        if (res.data.status === 0) {
          throw new Error(res.data.message || __("something_went_wrong"));
        }
        var allTranslations = res.data.data;
        _this3.languages.forEach(function (lang) {
          if (lang.is_default) return; // skip default language

          var translated = allTranslations[lang.code];
          if (!translated) return;
          Object.keys(translated).forEach(function (field) {
            if (targetObj && targetObj[lang.id]) {
              if (!targetObj[lang.id][field] || targetObj[lang.id][field] === "") {
                _this3.$set(targetObj[lang.id], field, translated[field]);
              }
            }
          });
        });
        if (typeof _this3.convertTagNamesToIds === "function") {
          _this3.$nextTick(function () {
            _this3.convertTagNamesToIds();
          });
        }
        return res;
      })["catch"](function (error) {
        var msg = error.message;
        if (error.response && error.response.data && error.response.data.message) {
          msg = error.response.data.message;
        }
        var errorMessage = msg || __("something_went_wrong");
        _this3.showError(errorMessage);
        throw error;
      });
    },
    translateOverwriteHelper: function translateOverwriteHelper(language) {
      var _this4 = this;
      var fieldsToTranslate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      var source = this.getDefaultLanguageData();
      if (!source || Object.keys(source).length === 0) {
        var errorMsg = __("default_language_data_missing");
        this.showError(errorMsg);
        return Promise.reject("default_language_data_missing");
      }

      // Determine target object (translations or form)
      var targetObj = null;
      if (this.translations) {
        targetObj = this.translations;
      } else if (this.form) {
        targetObj = this.form;
      }
      var dataToSend = {};
      if (fieldsToTranslate.length > 0) {
        fieldsToTranslate.forEach(function (field) {
          dataToSend[field] = source[field];
        });
      } else {
        Object.keys(source).forEach(function (key) {
          if (_typeof(source[key]) !== "object") {
            dataToSend[key] = source[key];
          }
        });
      }

      // Check if all fields in dataToSend are null or empty
      var allFieldsNull = Object.keys(dataToSend).length > 0 && Object.keys(dataToSend).every(function (field) {
        var value = dataToSend[field];
        return value === null || value === undefined || value === "" || typeof value === "string" && value.trim() === "";
      });
      if (allFieldsNull) {
        var _errorMsg2 = __("translation_error_all_fields_empty") || "All fields are empty. Please fill at least one field in default language before translating.";
        this.showError(_errorMsg2);
        return Promise.reject(new Error(_errorMsg2));
      }
      return axios__WEBPACK_IMPORTED_MODULE_0___default().post("/api/languages/translate-overwrite", {
        target_language: language.code,
        data: dataToSend
      }).then(function (res) {
        if (res.data.status === 0) {
          throw new Error(res.data.message || __("something_went_wrong"));
        }
        var allTranslations = res.data.data;
        _this4.languages.forEach(function (lang) {
          if (lang.is_default) return;
          var translated = allTranslations[lang.code];
          if (!translated) return;
          Object.keys(translated).forEach(function (field) {
            if (targetObj && targetObj[lang.id]) {
              _this4.$set(targetObj[lang.id], field, translated[field]);
            }
          });
        });
        if (typeof _this4.convertTagNamesToIds === "function") {
          _this4.$nextTick(function () {
            _this4.convertTagNamesToIds();
          });
        }
        return res;
      })["catch"](function (error) {
        var msg = error.message;
        if (error.response && error.response.data && error.response.data.message) {
          msg = error.response.data.message;
        }
        var errorMessage = msg || __("something_went_wrong");
        _this4.showError(errorMessage);
        throw error;
      })["finally"](function () {
        _this4.isLoading = false;
      });
    }
  }
});

/***/ }),

/***/ "./resources/js/views/CustomFields/CustomFields.vue":
/*!**********************************************************!*\
  !*** ./resources/js/views/CustomFields/CustomFields.vue ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _CustomFields_vue_vue_type_template_id_22911300__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CustomFields.vue?vue&type=template&id=22911300 */ "./resources/js/views/CustomFields/CustomFields.vue?vue&type=template&id=22911300");
/* harmony import */ var _CustomFields_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CustomFields.vue?vue&type=script&lang=js */ "./resources/js/views/CustomFields/CustomFields.vue?vue&type=script&lang=js");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _CustomFields_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _CustomFields_vue_vue_type_template_id_22911300__WEBPACK_IMPORTED_MODULE_0__.render,
  _CustomFields_vue_vue_type_template_id_22911300__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/CustomFields/CustomFields.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/views/CustomFields/CustomFields.vue?vue&type=script&lang=js":
/*!**********************************************************************************!*\
  !*** ./resources/js/views/CustomFields/CustomFields.vue?vue&type=script&lang=js ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CustomFields_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./CustomFields.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/CustomFields/CustomFields.vue?vue&type=script&lang=js");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CustomFields_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/CustomFields/CustomFields.vue?vue&type=template&id=22911300":
/*!****************************************************************************************!*\
  !*** ./resources/js/views/CustomFields/CustomFields.vue?vue&type=template&id=22911300 ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_CustomFields_vue_vue_type_template_id_22911300__WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   staticRenderFns: () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_CustomFields_vue_vue_type_template_id_22911300__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_CustomFields_vue_vue_type_template_id_22911300__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./CustomFields.vue?vue&type=template&id=22911300 */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/CustomFields/CustomFields.vue?vue&type=template&id=22911300");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/CustomFields/CustomFields.vue?vue&type=template&id=22911300":
/*!*******************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/CustomFields/CustomFields.vue?vue&type=template&id=22911300 ***!
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
    [
      _c("div", { staticClass: "page-heading" }, [
        _c(
          "div",
          {
            staticClass:
              "page-heading d-flex justify-content-between align-items-center mb-4",
          },
          [
            _c("h3", { staticClass: "modern-page-title mb-0" }, [
              _vm._v(_vm._s(_vm.__("custom_fields"))),
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
                        attrs: { to: "/dashboard" },
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
                  [_vm._v(_vm._s(_vm.__("custom_fields")))]
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
                !_vm.isSeller
                  ? _c(
                      "b-tabs",
                      {
                        staticClass: "px-3 pt-2",
                        model: {
                          value: _vm.activeTab,
                          callback: function ($$v) {
                            _vm.activeTab = $$v
                          },
                          expression: "activeTab",
                        },
                      },
                      [
                        _c("b-tab", {
                          scopedSlots: _vm._u(
                            [
                              {
                                key: "title",
                                fn: function () {
                                  return [
                                    _vm._v(
                                      "\n                                " +
                                        _vm._s(_vm.__("sellers")) +
                                        "\n                                "
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
                                      attrs: {
                                        title: _vm.__(
                                          "module_wise_custom_fields_tooltip"
                                        ),
                                      },
                                    }),
                                  ]
                                },
                                proxy: true,
                              },
                            ],
                            null,
                            false,
                            102927621
                          ),
                        }),
                        _vm._v(" "),
                        _c("b-tab", {
                          scopedSlots: _vm._u(
                            [
                              {
                                key: "title",
                                fn: function () {
                                  return [
                                    _vm._v(
                                      "\n                                " +
                                        _vm._s(_vm.__("delivery_boys")) +
                                        "\n                                "
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
                                      attrs: {
                                        title: _vm.__(
                                          "general_custom_fields_tooltip"
                                        ),
                                      },
                                    }),
                                  ]
                                },
                                proxy: true,
                              },
                            ],
                            null,
                            false,
                            3280501000
                          ),
                        }),
                        _vm._v(" "),
                        _c("b-tab", {
                          scopedSlots: _vm._u(
                            [
                              {
                                key: "title",
                                fn: function () {
                                  return [
                                    _vm._v(
                                      "\n                                " +
                                        _vm._s(_vm.__("customers")) +
                                        "\n                                "
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
                                      attrs: {
                                        title: _vm.__(
                                          "general_custom_fields_tooltip"
                                        ),
                                      },
                                    }),
                                  ]
                                },
                                proxy: true,
                              },
                            ],
                            null,
                            false,
                            1649676443
                          ),
                        }),
                        _vm._v(" "),
                        _c("b-tab", {
                          scopedSlots: _vm._u(
                            [
                              {
                                key: "title",
                                fn: function () {
                                  return [
                                    _vm._v(
                                      "\n                                " +
                                        _vm._s(_vm.__("products")) +
                                        "\n                                "
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
                                      attrs: {
                                        title: _vm.__(
                                          "module_wise_custom_fields_tooltip"
                                        ),
                                      },
                                    }),
                                  ]
                                },
                                proxy: true,
                              },
                            ],
                            null,
                            false,
                            1302652463
                          ),
                        }),
                      ],
                      1
                    )
                  : _vm._e(),
                _vm._v(" "),
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
                                return _vm.getRecords()
                              },
                            ],
                          },
                        }),
                      ]),
                    ]),
                    _vm._v(" "),
                    _c("div", { staticClass: "d-flex gap-2" }, [
                      _vm.isSeller || _vm.$can("custom_field_create")
                        ? _c(
                            "button",
                            {
                              staticClass:
                                "btn btn-figma-filter d-flex align-items-center gap-2",
                              on: { click: _vm.openAddModal },
                            },
                            [
                              _c("i", { staticClass: "fa fa-plus" }),
                              _vm._v(" "),
                              _c("span", [_vm._v(_vm._s(_vm.__("add_field")))]),
                            ]
                          )
                        : _vm._e(),
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
                            "btn btn-figma-filter d-flex align-items-center gap-2",
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
                    items: _vm.customFields,
                    fields: _vm.visibleFields,
                    filter: _vm.filter,
                    "filter-included-fields": _vm.filterOn,
                    bordered: false,
                    busy: _vm.isLoading,
                    stacked: "md",
                    "show-empty": "",
                    "tbody-tr-class": function () {
                      return "figma-tr align-middle"
                    },
                    small: "",
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
                      key: "cell(id)",
                      fn: function (row) {
                        return [
                          _vm._v(
                            "\n                            " +
                              _vm._s(row.item.id) +
                              "\n                        "
                          ),
                        ]
                      },
                    },
                    {
                      key: "cell(type)",
                      fn: function (row) {
                        return [
                          _vm._v(
                            "\n                            " +
                              _vm._s(_vm.typeLabel(row.item.type)) +
                              "\n                        "
                          ),
                        ]
                      },
                    },
                    {
                      key: "cell(is_required)",
                      fn: function (row) {
                        return [
                          row.item.is_required
                            ? _c("span", { staticClass: "badge bg-info" }, [
                                _vm._v(_vm._s(_vm.__("yes"))),
                              ])
                            : _c(
                                "span",
                                { staticClass: "badge bg-secondary" },
                                [_vm._v(_vm._s(_vm.__("no")))]
                              ),
                        ]
                      },
                    },
                    {
                      key: "cell(owner)",
                      fn: function (row) {
                        return [
                          row.item.is_mine
                            ? _c(
                                "span",
                                { staticClass: "badge bg-secondary" },
                                [_vm._v(_vm._s(_vm.__("mine") || "Mine"))]
                              )
                            : row.item.seller_id
                            ? _c("div", [
                                _c("div", [
                                  _vm._v(
                                    _vm._s(
                                      row.item.seller
                                        ? row.item.seller.name
                                        : _vm.__("seller") || "Seller"
                                    )
                                  ),
                                ]),
                                _vm._v(" "),
                                _c("small", { staticClass: "text-muted" }, [
                                  _vm._v("ID - " + _vm._s(row.item.seller_id)),
                                ]),
                              ])
                            : _c("span", { staticClass: "badge bg-success" }, [
                                _vm._v(_vm._s(_vm.__("global") || "Global")),
                              ]),
                        ]
                      },
                    },
                    {
                      key: "cell(status)",
                      fn: function (row) {
                        return [
                          _c(
                            "div",
                            {
                              staticClass:
                                "form-check form-switch d-flex justify-content-center",
                            },
                            [
                              _c("input", {
                                directives: [
                                  {
                                    name: "model",
                                    rawName: "v-model",
                                    value: row.item.status,
                                    expression: "row.item.status",
                                  },
                                ],
                                staticClass: "form-check-input",
                                staticStyle: { cursor: "pointer" },
                                attrs: {
                                  type: "checkbox",
                                  disabled: !_vm.canEdit(row.item),
                                  "true-value": true,
                                  "false-value": false,
                                },
                                domProps: {
                                  checked: Array.isArray(row.item.status)
                                    ? _vm._i(row.item.status, null) > -1
                                    : row.item.status,
                                },
                                on: {
                                  change: [
                                    function ($event) {
                                      var $$a = row.item.status,
                                        $$el = $event.target,
                                        $$c = $$el.checked ? true : false
                                      if (Array.isArray($$a)) {
                                        var $$v = null,
                                          $$i = _vm._i($$a, $$v)
                                        if ($$el.checked) {
                                          $$i < 0 &&
                                            _vm.$set(
                                              row.item,
                                              "status",
                                              $$a.concat([$$v])
                                            )
                                        } else {
                                          $$i > -1 &&
                                            _vm.$set(
                                              row.item,
                                              "status",
                                              $$a
                                                .slice(0, $$i)
                                                .concat($$a.slice($$i + 1))
                                            )
                                        }
                                      } else {
                                        _vm.$set(row.item, "status", $$c)
                                      }
                                    },
                                    function ($event) {
                                      return _vm.toggleStatus(row.item)
                                    },
                                  ],
                                },
                              }),
                            ]
                          ),
                        ]
                      },
                    },
                    {
                      key: "cell(actions)",
                      fn: function (row) {
                        return [
                          _vm.canEdit(row.item) || _vm.canDelete(row.item)
                            ? _c(
                                "div",
                                {
                                  staticClass:
                                    "d-flex gap-2 justify-content-center",
                                },
                                [
                                  _vm.canEdit(row.item)
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
                                          staticClass: "figma-action-btn",
                                          attrs: { title: _vm.__("edit") },
                                          on: {
                                            click: function ($event) {
                                              return _vm.openEditModal(row.item)
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
                                      )
                                    : _vm._e(),
                                  _vm._v(" "),
                                  _vm.canDelete(row.item)
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
                                          staticClass: "figma-action-btn",
                                          attrs: { title: _vm.__("delete") },
                                          on: {
                                            click: function ($event) {
                                              return _vm.deleteRecord(
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
                                ]
                              )
                            : _c("span", { staticClass: "text-muted small" }, [
                                _vm._v(
                                  _vm._s(
                                    _vm.__("managed_by_admin") ||
                                      "Managed by admin"
                                  )
                                ),
                              ]),
                        ]
                      },
                    },
                  ]),
                }),
                _vm._v(" "),
                _c(
                  "div",
                  { staticClass: "figma-table-footer flex-wrap gap-3" },
                  [
                    _c(
                      "div",
                      { staticClass: "d-flex align-items-center gap-2" },
                      [
                        _c(
                          "label",
                          { staticClass: "showing-results-text mb-0" },
                          [_vm._v(_vm._s(_vm.__("per_page")))]
                        ),
                        _vm._v(" "),
                        _c("b-form-select", {
                          staticStyle: { width: "auto" },
                          attrs: { options: _vm.pageOptions, size: "sm" },
                          model: {
                            value: _vm.perPage,
                            callback: function ($$v) {
                              _vm.perPage = $$v
                            },
                            expression: "perPage",
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
                  ]
                ),
              ],
              1
            ),
          ]),
        ]),
      ]),
      _vm._v(" "),
      _c(
        "b-modal",
        {
          key: _vm.tabsKey,
          ref: "field-modal",
          attrs: {
            id: "customFieldModal",
            title: _vm.isEditing
              ? _vm.__("edit") + " " + _vm.__("field_name")
              : _vm.__("add_field"),
            "no-close-on-backdrop": "",
            "no-fade": "",
            static: "",
            scrollable: "",
          },
          scopedSlots: _vm._u([
            {
              key: "modal-footer",
              fn: function () {
                return [
                  _c(
                    "b-button",
                    {
                      attrs: { variant: "primary", disabled: _vm.isSaving },
                      on: { click: _vm.saveRecord },
                    },
                    [
                      _vm._v(
                        "\n                " +
                          _vm._s(_vm.__("save")) +
                          "\n                "
                      ),
                      _vm.isSaving
                        ? _c("b-spinner", {
                            attrs: { small: "", label: "Saving" },
                          })
                        : _vm._e(),
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "b-button",
                    {
                      attrs: { variant: "secondary" },
                      on: { click: _vm.hideModal },
                    },
                    [_vm._v(_vm._s(_vm.__("cancel")))]
                  ),
                ]
              },
              proxy: true,
            },
          ]),
        },
        [
          _vm._v(" "),
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
              _vm.languages.length
                ? _c(
                    "b-tabs",
                    {
                      attrs: { "content-class": "mt-3" },
                      model: {
                        value: _vm.activeFormTab,
                        callback: function ($$v) {
                          _vm.activeFormTab = $$v
                        },
                        expression: "activeFormTab",
                      },
                    },
                    _vm._l(_vm.languages, function (lang) {
                      return _c(
                        "b-tab",
                        {
                          key: lang.id,
                          attrs: {
                            title: lang.name,
                            active: lang.is_default == 1,
                          },
                        },
                        [
                          lang.is_default && _vm.languages.length > 1
                            ? _c(
                                "div",
                                { staticClass: "mb-3" },
                                [
                                  _c(
                                    "b-button",
                                    {
                                      directives: [
                                        {
                                          name: "b-tooltip",
                                          rawName: "v-b-tooltip.hover",
                                          modifiers: { hover: true },
                                        },
                                      ],
                                      staticClass: "mr-2",
                                      attrs: {
                                        size: "sm",
                                        variant: "outline-primary",
                                        title: _vm.__(
                                          "only_empty_fields_will_be_translated_existing_content_will_not_be_changed"
                                        ),
                                        disabled: _vm.loadingEmpty,
                                      },
                                      on: {
                                        click: function ($event) {
                                          return _vm.translateEmpty(lang)
                                        },
                                      },
                                    },
                                    [
                                      !_vm.loadingEmpty
                                        ? _c("span", [
                                            _vm._v(
                                              _vm._s(
                                                _vm.__("translate_empty_fields")
                                              )
                                            ),
                                          ])
                                        : _c("b-spinner", {
                                            attrs: { small: "" },
                                          }),
                                    ],
                                    1
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "b-button",
                                    {
                                      directives: [
                                        {
                                          name: "b-tooltip",
                                          rawName: "v-b-tooltip.hover",
                                          modifiers: { hover: true },
                                        },
                                      ],
                                      attrs: {
                                        size: "sm",
                                        variant: "outline-danger",
                                        title: _vm.__(
                                          "all_fields_will_be_translated_and_existing_content_will_be_overwritten"
                                        ),
                                        disabled: _vm.loadingOverwrite,
                                      },
                                      on: {
                                        click: function ($event) {
                                          return _vm.translateOverwrite(lang)
                                        },
                                      },
                                    },
                                    [
                                      !_vm.loadingOverwrite
                                        ? _c("span", [
                                            _vm._v(
                                              _vm._s(
                                                _vm.__(
                                                  "translate_and_overwrite"
                                                )
                                              )
                                            ),
                                          ])
                                        : _c("b-spinner", {
                                            attrs: { small: "" },
                                          }),
                                    ],
                                    1
                                  ),
                                ],
                                1
                              )
                            : _vm._e(),
                          _vm._v(" "),
                          _c("div", { staticClass: "form-group mb-3" }, [
                            _c("label", { staticClass: "form-label" }, [
                              _vm._v(_vm._s(_vm.__("field_name"))),
                            ]),
                            _vm._v(" "),
                            lang.is_default
                              ? _c("i", { staticClass: "text-danger" }, [
                                  _vm._v("*"),
                                ])
                              : _vm._e(),
                            _vm._v(" "),
                            _c("input", {
                              directives: [
                                {
                                  name: "model",
                                  rawName: "v-model",
                                  value: _vm.form[lang.id].name,
                                  expression: "form[lang.id].name",
                                },
                              ],
                              staticClass: "form-control",
                              attrs: {
                                type: "text",
                                placeholder: _vm.__("field_name"),
                                required: lang.is_default ? true : undefined,
                              },
                              domProps: { value: _vm.form[lang.id].name },
                              on: {
                                input: function ($event) {
                                  if ($event.target.composing) {
                                    return
                                  }
                                  _vm.$set(
                                    _vm.form[lang.id],
                                    "name",
                                    $event.target.value
                                  )
                                },
                              },
                            }),
                          ]),
                          _vm._v(" "),
                          lang.is_default
                            ? _c("div", { staticClass: "form-group mb-3" }, [
                                _c("label", { staticClass: "form-label" }, [
                                  _vm._v(_vm._s(_vm.__("field_type")) + " "),
                                  _c("span", { staticClass: "text-danger" }, [
                                    _vm._v("*"),
                                  ]),
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
                                    on: {
                                      change: function ($event) {
                                        var $$selectedVal =
                                          Array.prototype.filter
                                            .call(
                                              $event.target.options,
                                              function (o) {
                                                return o.selected
                                              }
                                            )
                                            .map(function (o) {
                                              var val =
                                                "_value" in o
                                                  ? o._value
                                                  : o.value
                                              return val
                                            })
                                        _vm.type = $event.target.multiple
                                          ? $$selectedVal
                                          : $$selectedVal[0]
                                      },
                                    },
                                  },
                                  [
                                    _c("option", { attrs: { value: "text" } }, [
                                      _vm._v(_vm._s(_vm.__("text"))),
                                    ]),
                                    _vm._v(" "),
                                    _c(
                                      "option",
                                      { attrs: { value: "number" } },
                                      [_vm._v(_vm._s(_vm.__("number")))]
                                    ),
                                    _vm._v(" "),
                                    _c(
                                      "option",
                                      { attrs: { value: "dropdown" } },
                                      [_vm._v(_vm._s(_vm.__("dropdown")))]
                                    ),
                                    _vm._v(" "),
                                    _c("option", { attrs: { value: "file" } }, [
                                      _vm._v(_vm._s(_vm.__("file"))),
                                    ]),
                                    _vm._v(" "),
                                    _c(
                                      "option",
                                      { attrs: { value: "textarea" } },
                                      [_vm._v(_vm._s(_vm.__("textarea")))]
                                    ),
                                  ]
                                ),
                              ])
                            : _vm._e(),
                          _vm._v(" "),
                          _vm.type === "dropdown"
                            ? _c("div", { staticClass: "form-group mb-3" }, [
                                _c("label", { staticClass: "form-label" }, [
                                  _vm._v(_vm._s(_vm.__("options"))),
                                ]),
                                _vm._v(" "),
                                lang.is_default
                                  ? _c("i", { staticClass: "text-danger" }, [
                                      _vm._v("*"),
                                    ])
                                  : _vm._e(),
                                _vm._v(" "),
                                _c(
                                  "div",
                                  {
                                    staticClass:
                                      "figma-chip-input form-control h-auto d-flex flex-wrap align-items-center gap-1",
                                    on: {
                                      click: function ($event) {
                                        return _vm.focusOptionInput(lang.id)
                                      },
                                    },
                                  },
                                  [
                                    _vm._l(
                                      _vm.form[lang.id].options,
                                      function (option, index) {
                                        return _c(
                                          "span",
                                          {
                                            key: index,
                                            staticClass:
                                              "badge bg-primary d-flex align-items-center gap-1",
                                          },
                                          [
                                            _vm._v(
                                              "\n                                " +
                                                _vm._s(option) +
                                                "\n                                "
                                            ),
                                            _c("i", {
                                              staticClass: "fa fa-times",
                                              staticStyle: {
                                                cursor: "pointer",
                                              },
                                              on: {
                                                click: function ($event) {
                                                  $event.stopPropagation()
                                                  return _vm.removeOption(
                                                    lang.id,
                                                    index
                                                  )
                                                },
                                              },
                                            }),
                                          ]
                                        )
                                      }
                                    ),
                                    _vm._v(" "),
                                    _c("input", {
                                      directives: [
                                        {
                                          name: "model",
                                          rawName: "v-model",
                                          value: _vm.optionInputText[lang.id],
                                          expression:
                                            "optionInputText[lang.id]",
                                        },
                                      ],
                                      ref: "optionInput_" + lang.id,
                                      refInFor: true,
                                      staticClass:
                                        "chip-input-field border-0 flex-grow-1",
                                      staticStyle: {
                                        outline: "none",
                                        "min-width": "120px",
                                      },
                                      attrs: {
                                        type: "text",
                                        placeholder: _vm.form[lang.id].options
                                          .length
                                          ? ""
                                          : _vm.__("options"),
                                      },
                                      domProps: {
                                        value: _vm.optionInputText[lang.id],
                                      },
                                      on: {
                                        keydown: [
                                          function ($event) {
                                            if (
                                              !$event.type.indexOf("key") &&
                                              _vm._k(
                                                $event.keyCode,
                                                "enter",
                                                13,
                                                $event.key,
                                                "Enter"
                                              )
                                            ) {
                                              return null
                                            }
                                            $event.preventDefault()
                                            return _vm.addOption(lang.id)
                                          },
                                          function ($event) {
                                            return _vm.handleOptionKeydown(
                                              $event,
                                              lang.id
                                            )
                                          },
                                        ],
                                        blur: function ($event) {
                                          return _vm.addOption(lang.id)
                                        },
                                        input: function ($event) {
                                          if ($event.target.composing) {
                                            return
                                          }
                                          _vm.$set(
                                            _vm.optionInputText,
                                            lang.id,
                                            $event.target.value
                                          )
                                        },
                                      },
                                    }),
                                  ],
                                  2
                                ),
                                _vm._v(" "),
                                _c("small", { staticClass: "text-muted" }, [
                                  _vm._v(
                                    _vm._s(
                                      _vm.__(
                                        "press_enter_or_comma_to_add_option"
                                      ) ||
                                        "Press Enter or comma to add an option."
                                    )
                                  ),
                                ]),
                              ])
                            : _vm._e(),
                          _vm._v(" "),
                          lang.is_default
                            ? _c("div", { staticClass: "form-group mb-3" }, [
                                _c("div", { staticClass: "form-check" }, [
                                  _c("input", {
                                    directives: [
                                      {
                                        name: "model",
                                        rawName: "v-model",
                                        value: _vm.is_required,
                                        expression: "is_required",
                                      },
                                    ],
                                    staticClass: "form-check-input",
                                    attrs: {
                                      type: "checkbox",
                                      id: "field_required",
                                    },
                                    domProps: {
                                      checked: Array.isArray(_vm.is_required)
                                        ? _vm._i(_vm.is_required, null) > -1
                                        : _vm.is_required,
                                    },
                                    on: {
                                      change: function ($event) {
                                        var $$a = _vm.is_required,
                                          $$el = $event.target,
                                          $$c = $$el.checked ? true : false
                                        if (Array.isArray($$a)) {
                                          var $$v = null,
                                            $$i = _vm._i($$a, $$v)
                                          if ($$el.checked) {
                                            $$i < 0 &&
                                              (_vm.is_required = $$a.concat([
                                                $$v,
                                              ]))
                                          } else {
                                            $$i > -1 &&
                                              (_vm.is_required = $$a
                                                .slice(0, $$i)
                                                .concat($$a.slice($$i + 1)))
                                          }
                                        } else {
                                          _vm.is_required = $$c
                                        }
                                      },
                                    },
                                  }),
                                  _vm._v(" "),
                                  _c(
                                    "label",
                                    {
                                      staticClass: "form-check-label",
                                      attrs: { for: "field_required" },
                                    },
                                    [_vm._v(_vm._s(_vm.__("required")))]
                                  ),
                                ]),
                              ])
                            : _vm._e(),
                          _vm._v(" "),
                          lang.is_default
                            ? _c("div", { staticClass: "form-group mb-3" }, [
                                _c("div", { staticClass: "form-check" }, [
                                  _c("input", {
                                    directives: [
                                      {
                                        name: "model",
                                        rawName: "v-model",
                                        value: _vm.status,
                                        expression: "status",
                                      },
                                    ],
                                    staticClass: "form-check-input",
                                    attrs: {
                                      type: "checkbox",
                                      id: "field_status",
                                    },
                                    domProps: {
                                      checked: Array.isArray(_vm.status)
                                        ? _vm._i(_vm.status, null) > -1
                                        : _vm.status,
                                    },
                                    on: {
                                      change: function ($event) {
                                        var $$a = _vm.status,
                                          $$el = $event.target,
                                          $$c = $$el.checked ? true : false
                                        if (Array.isArray($$a)) {
                                          var $$v = null,
                                            $$i = _vm._i($$a, $$v)
                                          if ($$el.checked) {
                                            $$i < 0 &&
                                              (_vm.status = $$a.concat([$$v]))
                                          } else {
                                            $$i > -1 &&
                                              (_vm.status = $$a
                                                .slice(0, $$i)
                                                .concat($$a.slice($$i + 1)))
                                          }
                                        } else {
                                          _vm.status = $$c
                                        }
                                      },
                                    },
                                  }),
                                  _vm._v(" "),
                                  _c(
                                    "label",
                                    {
                                      staticClass: "form-check-label",
                                      attrs: { for: "field_status" },
                                    },
                                    [_vm._v(_vm._s(_vm.__("active")))]
                                  ),
                                ]),
                              ])
                            : _vm._e(),
                        ]
                      )
                    }),
                    1
                  )
                : _vm._e(),
            ],
            1
          ),
        ]
      ),
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ })

}]);