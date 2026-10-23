"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_views_Product_Addons_Addons_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Product/Addons/Addons.vue?vue&type=script&lang=js":
/*!**********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Product/Addons/Addons.vue?vue&type=script&lang=js ***!
  \**********************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Edit_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Edit.vue */ "./resources/js/views/Product/Addons/Edit.vue");
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


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  components: {
    'app-edit-record': _Edit_vue__WEBPACK_IMPORTED_MODULE_0__["default"]
  },
  data: function data() {
    return {
      fields: [{
        key: 'id',
        label: __('id'),
        "class": 'text-center'
      }, {
        key: 'name',
        label: __('name'),
        "class": 'text-center'
      }, {
        key: 'selection_type',
        label: __('selection_type') || 'Selection Type',
        "class": 'text-center'
      }, {
        key: 'options_count',
        label: __('options') || 'Options',
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
        "class": 'text-center',
        tdClass: 'text-nowrap'
      }],
      totalRows: 0,
      currentPage: 1,
      perPage: this.$perPage,
      pageOptions: this.$pageOptions,
      filter: null,
      groups: [],
      isLoading: false,
      edit_record: null,
      currentLanguageId: null,
      activeLanguages: []
    };
  },
  computed: {
    // Same pattern as Category's translatedCategories / Attributes' translatedAttributes -
    // swap in the currently-selected admin language's translation, falling back to the
    // base (default-language) name when no translation exists for it.
    translatedGroups: function translatedGroups() {
      var _this = this;
      var list = Array.isArray(this.groups) ? this.groups : [];
      if (!this.currentLanguageId || list.length === 0) {
        return list;
      }
      return list.map(function (group) {
        var translatedGroup = _objectSpread({}, group);
        if (group.translations && Array.isArray(group.translations)) {
          var translation = group.translations.find(function (t) {
            return Number(t.language_id) === Number(_this.currentLanguageId);
          });
          if (translation && translation.name && translation.name.trim() !== '') {
            translatedGroup.name = translation.name;
          }
        }
        return translatedGroup;
      });
    }
  },
  watch: {
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
    filter: function filter() {
      this.currentPage = 1;
      this.getRecords();
    }
  },
  created: function created() {
    var _this2 = this;
    this._recordSavedHandler = function (message) {
      _this2.showMessage('success', message);
      _this2.getRecords();
    };
    this.$eventBus.$on('recordSaved', this._recordSavedHandler);
    this.fetchActiveLanguages().then(function () {
      _this2.getRecords();
    });
  },
  beforeDestroy: function beforeDestroy() {
    this.$eventBus.$off('recordSaved', this._recordSavedHandler);
  },
  methods: {
    fetchActiveLanguages: function fetchActiveLanguages() {
      var _this3 = this;
      return axios.get(this.$apiUrl + '/active_languages').then(function (response) {
        if (response.data.data && Array.isArray(response.data.data)) {
          _this3.activeLanguages = response.data.data;
          var appLocale = window.appLocale || 'en';
          var currentLanguage = _this3.activeLanguages.find(function (lang) {
            return lang.code === appLocale;
          });
          if (currentLanguage) {
            _this3.currentLanguageId = currentLanguage.id;
          } else {
            var defaultLanguage = _this3.activeLanguages.find(function (lang) {
              return lang.is_default === 1;
            });
            if (defaultLanguage) {
              _this3.currentLanguageId = defaultLanguage.id;
            }
          }
        }
      })["catch"](function (error) {
        console.error('Error loading languages:', error);
      });
    },
    getRecords: function getRecords() {
      var _this4 = this;
      this.isLoading = true;
      axios.get(this.$apiUrl + '/products/addons', {
        params: {
          page: this.currentPage,
          per_page: this.perPage,
          filter: this.filter || ''
        }
      }).then(function (response) {
        _this4.isLoading = false;
        var data = response.data;
        _this4.groups = data.data;
        _this4.totalRows = data.total;
      });
    },
    deleteRecord: function deleteRecord(index, id) {
      var _this5 = this;
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
          _this5.isLoading = true;
          axios.post(_this5.$apiUrl + '/products/addons/delete', {
            id: id
          }).then(function (response) {
            _this5.isLoading = false;
            _this5.groups.splice(index, 1);
            _this5.showMessage('success', response.data.message);
          });
        }
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Product/Addons/Edit.vue?vue&type=script&lang=js":
/*!********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Product/Addons/Edit.vue?vue&type=script&lang=js ***!
  \********************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
  props: ['record'],
  data: function data() {
    return {
      id: null,
      type: 'free',
      selection_type: 'single',
      is_required: false,
      max_select: 0,
      status: 1,
      options: [],
      languages: [],
      defaultLanguageId: null,
      activeTab: 0,
      form: {},
      tabsKey: 0,
      isLoading: false,
      optionKeySeed: 1
    };
  },
  watch: {
    record: {
      immediate: true,
      deep: true,
      handler: function handler(newVal) {
        if (newVal && newVal.id) {
          this.id = newVal.id;
          this.resetForm();
          if (this.languages.length > 0) {
            this.loadGroupWithTranslations();
          }
        } else {
          this.id = null;
          this.resetForm();
        }
      }
    }
  },
  computed: {
    modal_title: function modal_title() {
      return this.id ? __('edit_addon_group') || 'Edit Addon Group' : __('add_addon_group') || 'Add Addon Group';
    },
    apiBase: function apiBase() {
      return this.isSeller ? '/seller/addons' : '/products/addons';
    },
    isSeller: function isSeller() {
      return this.$route && this.$route.path.startsWith('/seller');
    }
  },
  methods: {
    blankTranslationForm: function blankTranslationForm() {
      var form = {};
      this.languages.forEach(function (lang) {
        form[lang.id] = {
          name: ''
        };
      });
      return form;
    },
    blankOption: function blankOption() {
      return {
        id: null,
        price: null,
        discounted_price: null,
        _key: this.optionKeySeed++,
        form: this.blankTranslationForm()
      };
    },
    resetForm: function resetForm() {
      var _this = this;
      this.type = 'free';
      this.selection_type = 'single';
      this.is_required = false;
      this.max_select = 0;
      this.status = 1;
      this.activeTab = 0;
      this.form = this.blankTranslationForm();
      this.languages.forEach(function (lang) {
        _this.form[lang.id].sub_title = '';
      });
      this.options = [this.blankOption()];
    },
    showModal: function showModal() {
      this.$refs['my-modal'].show();
    },
    hideModal: function hideModal() {
      this.$refs['my-modal'].hide();
    },
    addOption: function addOption() {
      this.options.push(this.blankOption());
    },
    removeOption: function removeOption(index) {
      if (this.options.length > 1) {
        this.options.splice(index, 1);
      }
    },
    switchToDefaultLanguageTab: function switchToDefaultLanguageTab() {
      var _this2 = this;
      var defaultLangIndex = this.languages.findIndex(function (lang) {
        return lang.id === _this2.defaultLanguageId;
      });
      if (defaultLangIndex !== -1) {
        this.activeTab = defaultLangIndex;
      }
    },
    fetchActiveLanguages: function fetchActiveLanguages() {
      var _this3 = this;
      return axios.get(this.$apiUrl + '/active_languages').then(function (res) {
        _this3.languages = res.data.data;
        var defaultLang = _this3.languages.find(function (l) {
          return l.is_default;
        });
        _this3.defaultLanguageId = (defaultLang === null || defaultLang === void 0 ? void 0 : defaultLang.id) || null;
        _this3.resetForm();
        if (_this3.id) {
          return _this3.loadGroupWithTranslations();
        }
      });
    },
    loadGroupWithTranslations: function loadGroupWithTranslations() {
      var _this4 = this;
      if (!this.id) return;
      if (!this.languages.length) {
        return this.fetchActiveLanguages();
      }
      return axios.get(this.$apiUrl + this.apiBase, {
        params: {
          id: this.id
        }
      }).then(function (res) {
        var group = Array.isArray(res.data.data) ? res.data.data[0] : res.data.data;
        if (!group) {
          console.error('Addon group not found');
          return;
        }
        _this4.type = group.type || 'free';
        _this4.selection_type = group.selection_type;
        _this4.is_required = !!group.is_required;
        _this4.max_select = group.max_select;
        _this4.status = group.status;
        _this4.languages.forEach(function (lang) {
          var translation = Array.isArray(group.translations) ? group.translations.find(function (t) {
            return t.language_id === lang.id;
          }) : null;
          if (lang.is_default) {
            _this4.$set(_this4.form, lang.id, {
              name: translation && translation.name && translation.name.trim() !== '' ? translation.name : group.name || '',
              sub_title: translation && translation.sub_title && translation.sub_title.trim() !== '' ? translation.sub_title : group.sub_title || ''
            });
          } else {
            _this4.$set(_this4.form, lang.id, {
              name: translation && translation.name ? translation.name : '',
              sub_title: translation && translation.sub_title ? translation.sub_title : ''
            });
          }
        });
        var options = Array.isArray(group.options) ? group.options : [];
        _this4.options = options.length ? options.map(function (o) {
          var _o$discounted_price;
          var form = {};
          _this4.languages.forEach(function (lang) {
            var translation = Array.isArray(o.translations) ? o.translations.find(function (t) {
              return t.language_id === lang.id;
            }) : null;
            if (lang.is_default) {
              form[lang.id] = {
                name: translation && translation.name && translation.name.trim() !== '' ? translation.name : o.name || ''
              };
            } else {
              form[lang.id] = {
                name: translation && translation.name ? translation.name : ''
              };
            }
          });
          return {
            id: o.id,
            price: o.price,
            discounted_price: (_o$discounted_price = o.discounted_price) !== null && _o$discounted_price !== void 0 ? _o$discounted_price : null,
            _key: _this4.optionKeySeed++,
            form: form
          };
        }) : [_this4.blankOption()];
        _this4.tabsKey++;
      });
    },
    saveRecord: function saveRecord() {
      var _this5 = this;
      if (!this.defaultLanguageId) {
        this.showError(__('default_language_not_found'));
        return;
      }
      var defaultName = this.form[this.defaultLanguageId] && this.form[this.defaultLanguageId].name;
      if (!defaultName || !defaultName.trim()) {
        this.showError(__('please_enter_name') || 'Please enter a name');
        this.switchToDefaultLanguageTab();
        return;
      }
      var validOptions = this.options.filter(function (o) {
        var name = o.form[_this5.defaultLanguageId] && o.form[_this5.defaultLanguageId].name;
        return name && name.trim() !== '';
      });
      if (!validOptions.length) {
        this.showError(__('please_add_at_least_one_option') || 'Please add at least one option');
        this.switchToDefaultLanguageTab();
        return;
      }
      var invalidPaidOption = this.type === 'paid' && validOptions.find(function (o) {
        return !(o.price > 0);
      });
      if (invalidPaidOption) {
        this.showError(__('please_enter_price_for_paid_option') || 'Please enter a price for every paid option');
        this.switchToDefaultLanguageTab();
        return;
      }
      var overpricedOption = this.type === 'paid' && validOptions.find(function (o) {
        return o.discounted_price && o.discounted_price > o.price;
      });
      if (overpricedOption) {
        this.showError(__('discounted_price_cannot_be_higher_than_price') || 'Discounted price cannot be higher than price');
        this.switchToDefaultLanguageTab();
        return;
      }
      var samePricedOption = this.type === 'paid' && validOptions.find(function (o) {
        return o.discounted_price && o.discounted_price === o.price;
      });
      if (samePricedOption) {
        this.showError(__('discounted_price_cannot_be_same_as_price') || 'Discounted price cannot be the same as price');
        this.switchToDefaultLanguageTab();
        return;
      }
      this.isLoading = true;
      var translations = {};
      this.languages.forEach(function (lang) {
        translations[lang.id] = {
          name: _this5.form[lang.id] && _this5.form[lang.id].name || '',
          sub_title: _this5.form[lang.id] && _this5.form[lang.id].sub_title || ''
        };
      });
      var payload = {
        translations: translations,
        type: this.type,
        selection_type: this.selection_type,
        is_required: this.is_required ? 1 : 0,
        max_select: this.max_select,
        options: validOptions.map(function (o) {
          var optionTranslations = {};
          _this5.languages.forEach(function (lang) {
            optionTranslations[lang.id] = {
              name: o.form[lang.id] && o.form[lang.id].name || ''
            };
          });
          return {
            id: o.id,
            price: _this5.type === 'paid' ? o.price : 0,
            discounted_price: _this5.type === 'paid' ? o.discounted_price || null : null,
            translations: optionTranslations
          };
        })
      };
      if (this.id) {
        payload.id = this.id;
        payload.status = this.status;
      }
      var url = this.id ? this.$apiUrl + this.apiBase + '/update' : this.$apiUrl + this.apiBase + '/save';
      axios.post(url, payload).then(function (res) {
        if (res.data.status === false) {
          throw new Error(res.data.message);
        }
        _this5.$eventBus.$emit('recordSaved', res.data.message || __('addon_group_saved_successfully') || 'Addon group saved successfully');
        _this5.hideModal();
      })["catch"](function (err) {
        var _err$response, _err$response$data;
        _this5.showError(((_err$response = err.response) === null || _err$response === void 0 ? void 0 : (_err$response$data = _err$response.data) === null || _err$response$data === void 0 ? void 0 : _err$response$data.message) || err.message || __('something_went_wrong'));
      })["finally"](function () {
        _this5.isLoading = false;
      });
    }
  },
  mounted: function mounted() {
    this.fetchActiveLanguages();
    this.showModal();
  }
});

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Product/Addons/Edit.vue?vue&type=style&index=0&id=84990a12&scoped=true&lang=css":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Product/Addons/Edit.vue?vue&type=style&index=0&id=84990a12&scoped=true&lang=css ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.id, "\n.addon-divider[data-v-84990a12] {\n    border-top-color: var(--ui-border);\n    margin: 8px 0 16px;\n}\n.addon-options-title[data-v-84990a12] {\n    font-size: 14px;\n    font-weight: 700;\n    color: var(--ui-heading);\n}\n.addon-option-name[data-v-84990a12] {\n    flex: 1 1 auto;\n    min-width: 0;\n}\n.addon-option-price[data-v-84990a12] {\n    flex: 0 1 140px;\n    min-width: 0;\n}\n.addon-option-discount[data-v-84990a12] {\n    flex-basis: 160px;\n}\n@media (max-width: 575.98px) {\n.addon-option-row[data-v-84990a12] {\n        flex-wrap: wrap;\n        padding-bottom: 8px;\n        border-bottom: 1px dashed var(--ui-border);\n}\n.addon-option-name[data-v-84990a12] {\n        flex-basis: 100%;\n}\n.addon-option-price[data-v-84990a12] {\n        flex: 1 1 0;\n}\n}\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Product/Addons/Edit.vue?vue&type=style&index=0&id=84990a12&scoped=true&lang=css":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Product/Addons/Edit.vue?vue&type=style&index=0&id=84990a12&scoped=true&lang=css ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Edit_vue_vue_type_style_index_0_id_84990a12_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Edit.vue?vue&type=style&index=0&id=84990a12&scoped=true&lang=css */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Product/Addons/Edit.vue?vue&type=style&index=0&id=84990a12&scoped=true&lang=css");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Edit_vue_vue_type_style_index_0_id_84990a12_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Edit_vue_vue_type_style_index_0_id_84990a12_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./resources/js/views/Product/Addons/Addons.vue":
/*!******************************************************!*\
  !*** ./resources/js/views/Product/Addons/Addons.vue ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Addons_vue_vue_type_template_id_aabc9540__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Addons.vue?vue&type=template&id=aabc9540 */ "./resources/js/views/Product/Addons/Addons.vue?vue&type=template&id=aabc9540");
/* harmony import */ var _Addons_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Addons.vue?vue&type=script&lang=js */ "./resources/js/views/Product/Addons/Addons.vue?vue&type=script&lang=js");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Addons_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _Addons_vue_vue_type_template_id_aabc9540__WEBPACK_IMPORTED_MODULE_0__.render,
  _Addons_vue_vue_type_template_id_aabc9540__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/Product/Addons/Addons.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/views/Product/Addons/Edit.vue":
/*!****************************************************!*\
  !*** ./resources/js/views/Product/Addons/Edit.vue ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Edit_vue_vue_type_template_id_84990a12_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Edit.vue?vue&type=template&id=84990a12&scoped=true */ "./resources/js/views/Product/Addons/Edit.vue?vue&type=template&id=84990a12&scoped=true");
/* harmony import */ var _Edit_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Edit.vue?vue&type=script&lang=js */ "./resources/js/views/Product/Addons/Edit.vue?vue&type=script&lang=js");
/* harmony import */ var _Edit_vue_vue_type_style_index_0_id_84990a12_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Edit.vue?vue&type=style&index=0&id=84990a12&scoped=true&lang=css */ "./resources/js/views/Product/Addons/Edit.vue?vue&type=style&index=0&id=84990a12&scoped=true&lang=css");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _Edit_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _Edit_vue_vue_type_template_id_84990a12_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render,
  _Edit_vue_vue_type_template_id_84990a12_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "84990a12",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/Product/Addons/Edit.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/views/Product/Addons/Addons.vue?vue&type=script&lang=js":
/*!******************************************************************************!*\
  !*** ./resources/js/views/Product/Addons/Addons.vue?vue&type=script&lang=js ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Addons_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Addons.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Product/Addons/Addons.vue?vue&type=script&lang=js");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Addons_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/Product/Addons/Edit.vue?vue&type=script&lang=js":
/*!****************************************************************************!*\
  !*** ./resources/js/views/Product/Addons/Edit.vue?vue&type=script&lang=js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Edit_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Edit.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Product/Addons/Edit.vue?vue&type=script&lang=js");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Edit_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/Product/Addons/Edit.vue?vue&type=style&index=0&id=84990a12&scoped=true&lang=css":
/*!************************************************************************************************************!*\
  !*** ./resources/js/views/Product/Addons/Edit.vue?vue&type=style&index=0&id=84990a12&scoped=true&lang=css ***!
  \************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Edit_vue_vue_type_style_index_0_id_84990a12_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/style-loader/dist/cjs.js!../../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Edit.vue?vue&type=style&index=0&id=84990a12&scoped=true&lang=css */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Product/Addons/Edit.vue?vue&type=style&index=0&id=84990a12&scoped=true&lang=css");


/***/ }),

/***/ "./resources/js/views/Product/Addons/Addons.vue?vue&type=template&id=aabc9540":
/*!************************************************************************************!*\
  !*** ./resources/js/views/Product/Addons/Addons.vue?vue&type=template&id=aabc9540 ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Addons_vue_vue_type_template_id_aabc9540__WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   staticRenderFns: () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Addons_vue_vue_type_template_id_aabc9540__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Addons_vue_vue_type_template_id_aabc9540__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Addons.vue?vue&type=template&id=aabc9540 */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Product/Addons/Addons.vue?vue&type=template&id=aabc9540");


/***/ }),

/***/ "./resources/js/views/Product/Addons/Edit.vue?vue&type=template&id=84990a12&scoped=true":
/*!**********************************************************************************************!*\
  !*** ./resources/js/views/Product/Addons/Edit.vue?vue&type=template&id=84990a12&scoped=true ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Edit_vue_vue_type_template_id_84990a12_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   staticRenderFns: () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Edit_vue_vue_type_template_id_84990a12_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Edit_vue_vue_type_template_id_84990a12_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Edit.vue?vue&type=template&id=84990a12&scoped=true */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Product/Addons/Edit.vue?vue&type=template&id=84990a12&scoped=true");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Product/Addons/Addons.vue?vue&type=template&id=aabc9540":
/*!***************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Product/Addons/Addons.vue?vue&type=template&id=aabc9540 ***!
  \***************************************************************************************************************************************************************************************************************************/
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
              "page-title d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3",
          },
          [
            _c("h3", { staticClass: "modern-page-title mb-0" }, [
              _vm._v(_vm._s(_vm.__("addons") || "Addons")),
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
                  [_vm._v(_vm._s(_vm.__("addons") || "Addons"))]
                ),
              ]),
            ]),
          ]
        ),
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
                  _c("div", { staticClass: "d-flex flex-wrap gap-2" }, [
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
                        _c("span", [
                          _vm._v(_vm._s(_vm.__("refresh") || "Refresh")),
                        ]),
                      ]
                    ),
                    _vm._v(" "),
                    _c(
                      "button",
                      {
                        staticClass:
                          "btn btn-figma-filter d-flex align-items-center gap-2",
                        on: {
                          click: function ($event) {
                            _vm.edit_record = true
                          },
                        },
                      },
                      [
                        _c("i", { staticClass: "fa fa-plus" }),
                        _vm._v(" "),
                        _c("span", [
                          _vm._v(
                            _vm._s(
                              _vm.__("add_addon_group") || "Add Addon Group"
                            )
                          ),
                        ]),
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
                  _c("b-table", {
                    staticClass: "mb-0",
                    attrs: {
                      items: _vm.translatedGroups,
                      fields: _vm.fields,
                      bordered: false,
                      busy: _vm.isLoading,
                      stacked: "md",
                      "show-empty": "",
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
                        key: "cell(selection_type)",
                        fn: function (row) {
                          return [
                            _c(
                              "span",
                              { staticClass: "badge bg-info text-capitalize" },
                              [_vm._v(_vm._s(row.item.selection_type))]
                            ),
                          ]
                        },
                      },
                      {
                        key: "cell(options_count)",
                        fn: function (row) {
                          return [
                            _vm._v(
                              "\n                                " +
                                _vm._s(row.item.options_count) +
                                "\n                            "
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
                                    _vm._v(
                                      "ID - " + _vm._s(row.item.seller_id)
                                    ),
                                  ]),
                                ])
                              : _c(
                                  "span",
                                  { staticClass: "badge bg-primary" },
                                  [_vm._v(_vm._s(_vm.__("global") || "Global"))]
                                ),
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
                              : _c("span", { staticClass: "badge bg-danger" }, [
                                  _vm._v(_vm._s(_vm.__("deactive"))),
                                ]),
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
                                  "d-flex flex-nowrap gap-2 justify-content-center",
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
                                    staticClass: "figma-action-btn",
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
      _vm._v(" "),
      _vm.edit_record
        ? _c("app-edit-record", {
            attrs: {
              record: _vm.edit_record === true ? null : _vm.edit_record,
            },
            on: {
              modalClose: function ($event) {
                _vm.edit_record = null
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



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Product/Addons/Edit.vue?vue&type=template&id=84990a12&scoped=true":
/*!*************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Product/Addons/Edit.vue?vue&type=template&id=84990a12&scoped=true ***!
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
  return _c(
    "b-modal",
    {
      key: _vm.id,
      ref: "my-modal",
      attrs: {
        title: _vm.modal_title,
        scrollable: "",
        "no-close-on-backdrop": "",
        "no-fade": "",
        static: "",
        size: "lg",
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
          staticClass: "d-flex justify-content-end flex-wrap gap-2 w-100",
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
          attrs: { novalidate: "" },
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
                  key: _vm.tabsKey,
                  attrs: { "content-class": "mt-3" },
                  model: {
                    value: _vm.activeTab,
                    callback: function ($$v) {
                      _vm.activeTab = $$v
                    },
                    expression: "activeTab",
                  },
                },
                _vm._l(_vm.languages, function (lang) {
                  return _c(
                    "b-tab",
                    {
                      key: lang.id,
                      attrs: { title: lang.name, active: lang.is_default == 1 },
                    },
                    [
                      _c("div", { staticClass: "row align-items-end" }, [
                        _c("div", { staticClass: "form-group col-md-6" }, [
                          _c("label", { staticClass: "d-block mb-2" }, [
                            _vm._v(_vm._s(_vm.__("name")) + " "),
                            lang.is_default
                              ? _c("i", { staticClass: "text-danger" }, [
                                  _vm._v("*"),
                                ])
                              : _vm._e(),
                          ]),
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
                              placeholder: _vm.__("name"),
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
                        _c("div", { staticClass: "form-group col-md-6" }, [
                          _c("label", { staticClass: "d-block mb-2" }, [
                            _vm._v(_vm._s(_vm.__("sub_title") || "Sub title")),
                          ]),
                          _vm._v(" "),
                          _c("input", {
                            directives: [
                              {
                                name: "model",
                                rawName: "v-model",
                                value: _vm.form[lang.id].sub_title,
                                expression: "form[lang.id].sub_title",
                              },
                            ],
                            staticClass: "form-control",
                            attrs: {
                              type: "text",
                              placeholder: _vm.__("sub_title") || "Sub title",
                            },
                            domProps: { value: _vm.form[lang.id].sub_title },
                            on: {
                              input: function ($event) {
                                if ($event.target.composing) {
                                  return
                                }
                                _vm.$set(
                                  _vm.form[lang.id],
                                  "sub_title",
                                  $event.target.value
                                )
                              },
                            },
                          }),
                        ]),
                      ]),
                      _vm._v(" "),
                      lang.is_default
                        ? _c("div", { staticClass: "row align-items-end" }, [
                            _c(
                              "div",
                              { staticClass: "form-group col-md-6" },
                              [
                                _c("label", { staticClass: "d-block mb-2" }, [
                                  _vm._v(
                                    _vm._s(_vm.__("type") || "Type") + " "
                                  ),
                                  _c("i", { staticClass: "text-danger" }, [
                                    _vm._v("*"),
                                  ]),
                                ]),
                                _vm._v(" "),
                                _c("b-form-radio-group", {
                                  attrs: {
                                    options: [
                                      {
                                        text: _vm.__("free") || "Free",
                                        value: "free",
                                      },
                                      {
                                        text: _vm.__("paid") || "Paid",
                                        value: "paid",
                                      },
                                    ],
                                    buttons: "",
                                    "button-variant": "outline-primary",
                                  },
                                  model: {
                                    value: _vm.type,
                                    callback: function ($$v) {
                                      _vm.type = $$v
                                    },
                                    expression: "type",
                                  },
                                }),
                              ],
                              1
                            ),
                            _vm._v(" "),
                            _c(
                              "div",
                              { staticClass: "form-group col-md-6" },
                              [
                                _c("label", { staticClass: "d-block mb-2" }, [
                                  _vm._v(
                                    _vm._s(
                                      _vm.__("selection_type") ||
                                        "Selection Type"
                                    )
                                  ),
                                ]),
                                _vm._v(" "),
                                _c("b-form-radio-group", {
                                  attrs: {
                                    options: [
                                      {
                                        text: _vm.__("single") || "Single",
                                        value: "single",
                                      },
                                      {
                                        text: _vm.__("multiple") || "Multiple",
                                        value: "multiple",
                                      },
                                    ],
                                    buttons: "",
                                    "button-variant": "outline-primary",
                                  },
                                  model: {
                                    value: _vm.selection_type,
                                    callback: function ($$v) {
                                      _vm.selection_type = $$v
                                    },
                                    expression: "selection_type",
                                  },
                                }),
                              ],
                              1
                            ),
                          ])
                        : _vm._e(),
                      _vm._v(" "),
                      lang.is_default && _vm.selection_type === "multiple"
                        ? _c("div", { staticClass: "row" }, [
                            _c("div", { staticClass: "form-group col-md-6" }, [
                              _c("label", [
                                _vm._v(
                                  _vm._s(_vm.__("max_select") || "Max Select")
                                ),
                              ]),
                              _vm._v(" "),
                              _c("input", {
                                directives: [
                                  {
                                    name: "model",
                                    rawName: "v-model.number",
                                    value: _vm.max_select,
                                    expression: "max_select",
                                    modifiers: { number: true },
                                  },
                                ],
                                staticClass: "form-control",
                                attrs: { type: "number", min: "0" },
                                domProps: { value: _vm.max_select },
                                on: {
                                  input: function ($event) {
                                    if ($event.target.composing) {
                                      return
                                    }
                                    _vm.max_select = _vm._n($event.target.value)
                                  },
                                  blur: function ($event) {
                                    return _vm.$forceUpdate()
                                  },
                                },
                              }),
                              _vm._v(" "),
                              _c("small", { staticClass: "text-muted" }, [
                                _vm._v(
                                  _vm._s(
                                    _vm.__(
                                      "keep_zero_for_unlimited_selection"
                                    ) || "Keep zero for unlimited selection"
                                  )
                                ),
                              ]),
                            ]),
                          ])
                        : _vm._e(),
                      _vm._v(" "),
                      _vm.id && lang.is_default
                        ? _c("div", { staticClass: "form-group" }, [
                            _c("label", { staticClass: "d-block" }, [
                              _vm._v(_vm._s(_vm.__("status"))),
                            ]),
                            _vm._v(" "),
                            _c(
                              "div",
                              { staticClass: "text-left mt-1" },
                              [
                                _c("b-form-radio-group", {
                                  attrs: {
                                    options: [
                                      { text: _vm.__("deactivate"), value: 0 },
                                      { text: _vm.__("activate"), value: 1 },
                                    ],
                                    buttons: "",
                                    "button-variant": "outline-primary",
                                  },
                                  model: {
                                    value: _vm.status,
                                    callback: function ($$v) {
                                      _vm.status = $$v
                                    },
                                    expression: "status",
                                  },
                                }),
                              ],
                              1
                            ),
                          ])
                        : _vm._e(),
                      _vm._v(" "),
                      _c("hr", { staticClass: "addon-divider" }),
                      _vm._v(" "),
                      _c(
                        "div",
                        {
                          staticClass:
                            "d-flex justify-content-between align-items-center mb-2",
                        },
                        [
                          _c(
                            "label",
                            { staticClass: "mb-0 addon-options-title" },
                            [_vm._v(_vm._s(_vm.__("options") || "Options"))]
                          ),
                          _vm._v(" "),
                          lang.is_default
                            ? _c(
                                "b-button",
                                {
                                  attrs: {
                                    size: "sm",
                                    variant: "outline-primary",
                                  },
                                  on: { click: _vm.addOption },
                                },
                                [
                                  _c("i", { staticClass: "fa fa-plus" }),
                                  _vm._v(
                                    " " +
                                      _vm._s(
                                        _vm.__("add_option") || "Add Option"
                                      ) +
                                      "\n                    "
                                  ),
                                ]
                              )
                            : _vm._e(),
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _vm._l(_vm.options, function (option, index) {
                        return _c(
                          "div",
                          {
                            key: option._key,
                            staticClass:
                              "addon-option-row d-flex gap-2 align-items-center mb-2",
                          },
                          [
                            _c("input", {
                              directives: [
                                {
                                  name: "model",
                                  rawName: "v-model",
                                  value: option.form[lang.id].name,
                                  expression: "option.form[lang.id].name",
                                },
                              ],
                              staticClass: "form-control addon-option-name",
                              attrs: {
                                type: "text",
                                placeholder:
                                  _vm.__("option_name") ||
                                  "Option name (e.g. Extra Cheese)",
                                required: lang.is_default ? true : undefined,
                              },
                              domProps: { value: option.form[lang.id].name },
                              on: {
                                input: function ($event) {
                                  if ($event.target.composing) {
                                    return
                                  }
                                  _vm.$set(
                                    option.form[lang.id],
                                    "name",
                                    $event.target.value
                                  )
                                },
                              },
                            }),
                            _vm._v(" "),
                            lang.is_default
                              ? [
                                  _vm.type === "paid"
                                    ? _c("input", {
                                        directives: [
                                          {
                                            name: "model",
                                            rawName: "v-model.number",
                                            value: option.price,
                                            expression: "option.price",
                                            modifiers: { number: true },
                                          },
                                        ],
                                        staticClass:
                                          "form-control addon-option-price",
                                        attrs: {
                                          type: "number",
                                          min: "0.01",
                                          step: "0.01",
                                          placeholder:
                                            _vm.__("price") || "Price",
                                          required: "",
                                        },
                                        domProps: { value: option.price },
                                        on: {
                                          input: function ($event) {
                                            if ($event.target.composing) {
                                              return
                                            }
                                            _vm.$set(
                                              option,
                                              "price",
                                              _vm._n($event.target.value)
                                            )
                                          },
                                          blur: function ($event) {
                                            return _vm.$forceUpdate()
                                          },
                                        },
                                      })
                                    : _vm._e(),
                                  _vm._v(" "),
                                  _vm.type === "paid"
                                    ? _c("input", {
                                        directives: [
                                          {
                                            name: "model",
                                            rawName: "v-model.number",
                                            value: option.discounted_price,
                                            expression:
                                              "option.discounted_price",
                                            modifiers: { number: true },
                                          },
                                        ],
                                        staticClass:
                                          "form-control addon-option-price addon-option-discount",
                                        attrs: {
                                          type: "number",
                                          min: "0",
                                          step: "0.01",
                                          max: option.price,
                                          placeholder:
                                            _vm.__("discounted_price") ||
                                            "Discounted Price",
                                        },
                                        domProps: {
                                          value: option.discounted_price,
                                        },
                                        on: {
                                          input: function ($event) {
                                            if ($event.target.composing) {
                                              return
                                            }
                                            _vm.$set(
                                              option,
                                              "discounted_price",
                                              _vm._n($event.target.value)
                                            )
                                          },
                                          blur: function ($event) {
                                            return _vm.$forceUpdate()
                                          },
                                        },
                                      })
                                    : _vm._e(),
                                  _vm._v(" "),
                                  _c(
                                    "b-button",
                                    {
                                      attrs: {
                                        size: "sm",
                                        variant: "outline-danger",
                                        disabled: _vm.options.length === 1,
                                      },
                                      on: {
                                        click: function ($event) {
                                          return _vm.removeOption(index)
                                        },
                                      },
                                    },
                                    [_c("i", { staticClass: "fa fa-trash" })]
                                  ),
                                ]
                              : _vm._e(),
                          ],
                          2
                        )
                      }),
                    ],
                    2
                  )
                }),
                1
              )
            : _vm._e(),
          _vm._v(" "),
          _c("button", {
            ref: "dummy_submit",
            staticStyle: { display: "none" },
          }),
        ],
        1
      ),
    ]
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ })

}]);