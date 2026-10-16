"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_views_Product_Attributes_Attributes_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Product/Attributes/Attributes.vue?vue&type=script&lang=js":
/*!******************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Product/Attributes/Attributes.vue?vue&type=script&lang=js ***!
  \******************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Auth_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../Auth.js */ "./resources/js/Auth.js");
/* harmony import */ var _Edit_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Edit.vue */ "./resources/js/views/Product/Attributes/Edit.vue");
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



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  components: {
    'app-edit-record': _Edit_vue__WEBPACK_IMPORTED_MODULE_1__["default"]
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
        key: 'values',
        label: __('values'),
        "class": 'text-center'
      }, {
        key: 'owner',
        label: __('owner') || 'Owner',
        "class": 'text-center'
      }, {
        key: 'status',
        label: __('status'),
        "class": 'text-center',
        formatter: function formatter(value) {
          return value == 1 ? __('active') : __('deactive');
        }
      }, {
        key: 'actions',
        label: __('actions')
      }],
      totalRows: 0,
      currentPage: 1,
      perPage: this.$perPage || 10,
      pageOptions: this.$pageOptions || [5, 10, 15, 20],
      sortBy: '',
      sortDesc: false,
      sortDirection: 'asc',
      filter: null,
      filterOn: ['id', 'name', 'status'],
      isLoading: false,
      attributes: [],
      edit_record: null,
      currentLanguageId: null,
      activeLanguages: []
    };
  },
  computed: {
    isSeller: function isSeller() {
      return !!(_Auth_js__WEBPACK_IMPORTED_MODULE_0__["default"].user && _Auth_js__WEBPACK_IMPORTED_MODULE_0__["default"].user.role && _Auth_js__WEBPACK_IMPORTED_MODULE_0__["default"].user.role.name === 'Seller' && _Auth_js__WEBPACK_IMPORTED_MODULE_0__["default"].user.seller !== null);
    },
    currentSellerId: function currentSellerId() {
      return this.isSeller ? _Auth_js__WEBPACK_IMPORTED_MODULE_0__["default"].user.seller.id : null;
    },
    translatedAttributes: function translatedAttributes() {
      var _this = this;
      if (!this.currentLanguageId || this.attributes.length === 0) {
        return this.attributes;
      }
      return this.attributes.map(function (attribute) {
        var translatedAttribute = _objectSpread({}, attribute);
        if (attribute.translations && Array.isArray(attribute.translations)) {
          var translation = attribute.translations.find(function (t) {
            return Number(t.language_id) === Number(_this.currentLanguageId);
          });
          if (translation && translation.name && translation.name.trim() !== '') {
            translatedAttribute.name = translation.name;
          }
        }
        return translatedAttribute;
      });
    }
  },
  created: function created() {
    var _this2 = this;
    this.fetchActiveLanguages().then(function () {
      _this2.getRecords();
    });
  },
  watch: {
    currentPage: function currentPage() {
      this.getRecords();
    },
    perPage: function perPage() {
      this.getRecords();
    }
  },
  methods: {
    // Used only to decide whether deleting needs the "used in categories" confirm dialog -
    // the backend is the real gate, this just avoids an unnecessary round trip for admin.
    isInUse: function isInUse(attribute) {
      return (attribute.categories_count || 0) > 0;
    },
    // Admin manages everything; a seller only their own (seller_id matches) - a global
    // attribute (seller_id null) stays admin-only even when a seller can see/use it.
    // Note: this only gates edit - delete is admin-only regardless (see !isSeller in template).
    canManage: function canManage(attribute) {
      if (!this.isSeller) {
        return true;
      }
      return attribute.seller_id === this.currentSellerId;
    },
    fetchActiveLanguages: function fetchActiveLanguages() {
      var _this3 = this;
      return axios.get(this.$apiUrl + '/active_languages').then(function (response) {
        _this3.activeLanguages = response.data.data || [];
        var appLocale = window.appLocale || 'en';
        var currentLanguage = _this3.activeLanguages.find(function (lang) {
          return lang.code === appLocale;
        });
        if (currentLanguage) {
          _this3.currentLanguageId = currentLanguage.id;
        } else {
          var defaultLang = _this3.activeLanguages.find(function (l) {
            return l.is_default === 1;
          });
          if (defaultLang) {
            _this3.currentLanguageId = defaultLang.id;
          }
        }
      });
    },
    getRecords: function getRecords() {
      var _this4 = this;
      this.isLoading = true;
      axios.get(this.$apiUrl + '/products/attributes', {
        params: {
          page: this.currentPage,
          per_page: this.perPage,
          filter: this.filter
        }
      }).then(function (response) {
        _this4.isLoading = false;
        var data = response.data;
        _this4.attributes = data.data;
        _this4.totalRows = data.total;
      })["catch"](function () {
        _this4.isLoading = false;
      });
    },
    onAttributeSaved: function onAttributeSaved(message) {
      this.showMessage('success', message);
      this.getRecords();
      this.edit_record = null;
    },
    // Everything needed (category names, owner) is already in the row from getRecords() -
    // one straight warning, admin confirms once, it's gone. No extra round trip.
    deleteRecord: function deleteRecord(index, id) {
      var _this5 = this;
      var attribute = this.attributes[index];
      var inUse = attribute && this.isInUse(attribute);
      var ownerLabel = attribute && attribute.seller_id ? attribute.seller && (attribute.seller.store_name || attribute.seller.name) || __('seller') || 'Seller' : __('global') || 'Global';
      var html = inUse ? "".concat(__('attribute_in_use_confirm_delete'), "<br>") + "<b>".concat(__('categories') || 'Categories', ":</b> ").concat(attribute.categories.map(function (c) {
        return c.name;
      }).join(', '), "<br>") + "<b>".concat(__('owner') || 'Owner', ":</b> ").concat(ownerLabel, "<br><br>") + "".concat(__('you_want_be_able_to_revert_this')) : __('you_want_be_able_to_revert_this');
      this.$swal.fire({
        title: __('are_you_sure'),
        html: html,
        confirmButtonText: __('yes_sure'),
        cancelButtonText: __('cancel'),
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: inUse ? '#d33' : '#37a279',
        cancelButtonColor: inUse ? '#37a279' : '#d33'
      }).then(function (result) {
        if (result.value) {
          _this5.isLoading = true;
          axios.post(_this5.$apiUrl + '/products/attributes/delete', {
            id: id
          }).then(function (response) {
            _this5.isLoading = false;
            if (response.data.status === 0) {
              _this5.showError(response.data.message);
              _this5.getRecords();
              return;
            }
            _this5.attributes.splice(index, 1);
            _this5.showMessage('success', response.data.message);
          })["catch"](function () {
            _this5.isLoading = false;
          });
        }
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Product/Attributes/Edit.vue?vue&type=script&lang=js":
/*!************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Product/Attributes/Edit.vue?vue&type=script&lang=js ***!
  \************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Auth_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../Auth.js */ "./resources/js/Auth.js");
/* harmony import */ var _mixins_TranslationHelper_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../mixins/TranslationHelper.js */ "./resources/js/mixins/TranslationHelper.js");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
  mixins: [_mixins_TranslationHelper_js__WEBPACK_IMPORTED_MODULE_2__["default"]],
  props: ['record'],
  data: function data() {
    return {
      id: null,
      status: 1,
      type: 'text',
      languages: [],
      defaultLanguageId: null,
      activeTab: 0,
      form: {},
      values: [],
      error: null,
      isLoading: false,
      tabsKey: 0,
      sellerCategories: [],
      selectedCategoryIds: [],
      // Translate buttons (attribute name)
      translatableFields: ['name'],
      loadingEmpty: false,
      loadingOverwrite: false
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
            this.loadAttributeWithTranslations();
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
      return this.id ? __('edit_attribute') : __('add_attribute');
    },
    isSeller: function isSeller() {
      return !!(_Auth_js__WEBPACK_IMPORTED_MODULE_1__["default"].user && _Auth_js__WEBPACK_IMPORTED_MODULE_1__["default"].user.role && _Auth_js__WEBPACK_IMPORTED_MODULE_1__["default"].user.role.name === 'Seller' && _Auth_js__WEBPACK_IMPORTED_MODULE_1__["default"].user.seller !== null);
    }
  },
  methods: {
    loadSellerCategories: function loadSellerCategories() {
      var _this = this;
      if (!this.isSeller) return;
      // Same endpoint the seller's own "Manage Categories" page uses - already scoped
      // server-side to just the categories assigned to this seller.
      axios__WEBPACK_IMPORTED_MODULE_0___default().get(this.$sellerApiUrl + '/seller_categories_list').then(function (res) {
        _this.sellerCategories = res.data.data || [];
      });
    },
    uid: function uid() {
      return '_' + Math.random().toString(36).slice(2);
    },
    resetForm: function resetForm() {
      var _this2 = this;
      this.form = {};
      this.status = 1;
      this.type = 'text';
      this.activeTab = 0;
      this.languages.forEach(function (lang) {
        _this2.$set(_this2.form, lang.id, {
          name: ''
        });
      });

      // Start with a single empty value row
      this.values = [this.blankValue()];
      this.selectedCategoryIds = [];
    },
    blankValue: function blankValue() {
      return {
        uid: this.uid(),
        id: null,
        value: '',
        short_code: '',
        color_code: '#000000',
        image: null,
        image_url: null
      };
    },
    showModal: function showModal() {
      this.$refs['my-modal'].show();
    },
    hideModal: function hideModal() {
      this.$refs['my-modal'].hide();
    },
    addValue: function addValue() {
      this.values.push(this.blankValue());
    },
    onValueImageChange: function onValueImageChange(event, index) {
      var file = event.target.files && event.target.files[0];
      if (!file) return;
      this.values[index].image = file;
      this.values[index].image_url = URL.createObjectURL(file);
    },
    removeValue: function removeValue(index) {
      var _this3 = this;
      if (this.values.length <= 1) return;
      var val = this.values[index];

      // A saved value (has an id) may already back a live product variant - the backend
      // silently keeps it (FK is RESTRICT) instead of deleting, which would otherwise
      // confuse the admin ("I removed it but it's still there after reload").
      if (val.id) {
        this.$swal.fire({
          title: __('are_you_sure'),
          text: __('removing_a_value_already_used_by_a_product_variant_will_not_delete_it'),
          confirmButtonText: __('yes_sure'),
          cancelButtonText: __('cancel'),
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#37a279',
          cancelButtonColor: '#d33'
        }).then(function (result) {
          if (result.value) _this3.values.splice(index, 1);
        });
        return;
      }
      this.values.splice(index, 1);
    },
    initializeForm: function initializeForm() {
      var _this4 = this;
      this.languages.forEach(function (lang) {
        if (!_this4.form[lang.id]) {
          _this4.$set(_this4.form, lang.id, {
            name: ''
          });
        }
      });
    },
    loadLanguages: function loadLanguages() {
      var _this5 = this;
      return axios__WEBPACK_IMPORTED_MODULE_0___default().get(this.$apiUrl + '/active_languages').then(function (res) {
        _this5.languages = res.data.data;
        var defaultLang = _this5.languages.find(function (l) {
          return l.is_default;
        });
        _this5.defaultLanguageId = (defaultLang === null || defaultLang === void 0 ? void 0 : defaultLang.id) || null;
        _this5.initializeForm();
        if (_this5.id) {
          return _this5.loadAttributeWithTranslations();
        }
      });
    },
    loadAttributeWithTranslations: function loadAttributeWithTranslations() {
      var _this6 = this;
      if (!this.id) return;
      if (!this.languages.length) {
        return this.loadLanguages();
      }
      return axios__WEBPACK_IMPORTED_MODULE_0___default().get(this.$apiUrl + '/products/attributes', {
        params: {
          id: this.id
        }
      }).then(function (res) {
        var attribute = Array.isArray(res.data.data) ? res.data.data[0] : res.data.data;
        if (!attribute) {
          console.error('Attribute not found');
          return;
        }
        _this6.status = attribute.status;
        _this6.type = attribute.type || 'text';
        _this6.initializeForm();

        // Attribute name per language (fallback to base for default language)
        _this6.languages.forEach(function (lang) {
          var translation = Array.isArray(attribute.translations) ? attribute.translations.find(function (t) {
            return t.language_id === lang.id;
          }) : null;
          if (lang.is_default) {
            _this6.$set(_this6.form, lang.id, {
              name: translation && translation.name && translation.name.trim() !== '' ? translation.name : attribute.name || ''
            });
          } else {
            _this6.$set(_this6.form, lang.id, {
              name: translation && translation.name ? translation.name : ''
            });
          }
        });

        // Value rows (not translatable)
        var values = Array.isArray(attribute.values) ? attribute.values : [];
        _this6.values = values.map(function (v) {
          return {
            uid: _this6.uid(),
            id: v.id,
            value: v.value || '',
            short_code: v.short_code || '',
            color_code: v.color_code || '#000000',
            image: null,
            image_url: v.image_url || null
          };
        });
        if (_this6.values.length === 0) {
          _this6.values = [_this6.blankValue()];
        }
        _this6.selectedCategoryIds = Array.isArray(attribute.categories) ? attribute.categories.map(function (c) {
          return c.id;
        }) : [];
        _this6.tabsKey++;
      });
    },
    validateDefaultLanguage: function validateDefaultLanguage() {
      if (!this.defaultLanguageId) {
        this.showError(__('default_language_not_found'));
        return false;
      }
      var defaultForm = this.form[this.defaultLanguageId];
      if (!defaultForm.name || defaultForm.name.trim() === '') {
        this.showError(__('please_fill_name_in_default_language'));
        this.switchToDefaultLanguageTab();
        return false;
      }
      var filledValues = this.values.filter(function (v) {
        return v.value && v.value.trim() !== '';
      });
      if (filledValues.length === 0) {
        this.showError(__('please_add_at_least_one_value'));
        this.switchToDefaultLanguageTab();
        return false;
      }

      // A "Text" typed attribute's short_code doubles as the measurement-unit abbreviation
      // shown across cart/orders/invoices - blank ones render an empty unit there with no warning.
      if (this.type === 'text') {
        var missing = filledValues.some(function (v) {
          return !v.short_code || v.short_code.trim() === '';
        });
        if (missing) {
          this.showError(__('please_set_a_short_code_for_every_value'));
          this.switchToDefaultLanguageTab();
          return false;
        }
      }

      // A "Colour" or "Image" typed attribute must actually carry the swatch/photo for
      // every value, otherwise the storefront renders a broken/blank chip with no warning.
      if (this.type === 'color') {
        var _missing = filledValues.some(function (v) {
          return !v.color_code || v.color_code.trim() === '';
        });
        if (_missing) {
          this.showError(__('please_set_a_colour_for_every_value'));
          this.switchToDefaultLanguageTab();
          return false;
        }
      }
      if (this.type === 'image') {
        var _missing2 = filledValues.some(function (v) {
          return !v.image && !v.image_url;
        });
        if (_missing2) {
          this.showError(__('please_upload_an_image_for_every_value'));
          this.switchToDefaultLanguageTab();
          return false;
        }
      }
      return true;
    },
    validateDefaultLanguageForTranslation: function validateDefaultLanguageForTranslation() {
      var _this7 = this;
      var form = this.$refs['my-form'];
      if (form && !form.reportValidity()) {
        this.$nextTick(function () {
          return _this7.switchToDefaultLanguageTab();
        });
        return false;
      }
      return this.validateDefaultLanguage();
    },
    switchToDefaultLanguageTab: function switchToDefaultLanguageTab() {
      var _this8 = this;
      var defaultLangIndex = this.languages.findIndex(function (lang) {
        return lang.id === _this8.defaultLanguageId;
      });
      if (defaultLangIndex !== -1) {
        this.activeTab = defaultLangIndex;
      }
    },
    saveRecord: function saveRecord() {
      var _this9 = this;
      if (!this.validateDefaultLanguage()) return;
      var isUpdate = !!this.id;
      this.isLoading = true;

      // Only keep value rows that actually have text (values are not translatable)
      var values = this.values.filter(function (v) {
        return v.value && v.value.trim() !== '';
      });

      // FormData (not plain JSON) so per-value image files can be uploaded alongside the rest.
      var formData = new FormData();
      formData.append('status', this.status);
      formData.append('type', this.type);
      if (this.id) formData.append('id', this.id);
      this.languages.forEach(function (lang) {
        formData.append("translations[".concat(lang.id, "][name]"), _this9.form[lang.id].name || '');
      });
      values.forEach(function (v, index) {
        if (v.id) formData.append("values[".concat(index, "][id]"), v.id);
        formData.append("values[".concat(index, "][sequence]"), index);
        formData.append("values[".concat(index, "][value]"), v.value.trim());
        formData.append("values[".concat(index, "][short_code]"), v.short_code && v.short_code.trim() !== '' ? v.short_code.trim() : '');
        if (_this9.type === 'color') {
          formData.append("values[".concat(index, "][color_code]"), v.color_code || '');
        }
        if (_this9.type === 'image' && v.image) {
          formData.append("values[".concat(index, "][image]"), v.image);
        }
      });
      if (this.isSeller) {
        // FormData drops an empty array entirely, so category_ids would be absent (= "leave
        // assignment untouched") even when the seller deliberately unchecked everything -
        // this flag tells the backend the field was actually submitted.
        formData.append('category_ids_provided', '1');
        this.selectedCategoryIds.forEach(function (catId) {
          return formData.append('category_ids[]', catId);
        });
      }
      var url = this.id ? this.$apiUrl + '/products/attributes/update' : this.$apiUrl + '/products/attributes/save';
      axios__WEBPACK_IMPORTED_MODULE_0___default().post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(function (res) {
        var _res$data$data;
        if (res.data.status === 0) {
          _this9.showError(res.data.message);
          return;
        }
        var message = isUpdate ? __('attribute_updated_successfully') : __('attribute_saved_successfully');
        var keptValues = (_res$data$data = res.data.data) === null || _res$data$data === void 0 ? void 0 : _res$data$data.kept_values;
        if (keptValues && keptValues.length) {
          _this9.$swal.fire({
            title: __('some_values_were_kept'),
            text: __('these_values_are_used_by_product_variants_and_were_not_removed') + ': ' + keptValues.join(', '),
            icon: 'info',
            confirmButtonColor: '#37a279'
          }).then(function () {
            _this9.$emit('saved', message);
            _this9.hideModal();
          });
          return;
        }
        _this9.$emit('saved', message);
        _this9.hideModal();
      })["catch"](function (error) {
        var _error$response, _error$response$data;
        var msg = ((_error$response = error.response) === null || _error$response === void 0 ? void 0 : (_error$response$data = _error$response.data) === null || _error$response$data === void 0 ? void 0 : _error$response$data.message) || __('something_went_wrong');
        _this9.showError(msg);
      })["finally"](function () {
        return _this9.isLoading = false;
      });
    }
  },
  mounted: function mounted() {
    this.loadLanguages();
    this.resetForm();
    this.loadSellerCategories();
    this.showModal();
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

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Product/Attributes/Attributes.vue?vue&type=style&index=0&id=39198fe0&scoped=true&lang=css":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Product/Attributes/Attributes.vue?vue&type=style&index=0&id=39198fe0&scoped=true&lang=css ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
___CSS_LOADER_EXPORT___.push([module.id, "\n.figma-action-btn.is-disabled[data-v-39198fe0],\n.figma-action-btn[data-v-39198fe0]:disabled {\n    opacity: 0.35;\n    cursor: not-allowed;\n    pointer-events: auto;\n    /* keep pointer events so the \"why\" tooltip still shows on hover */\n}\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Product/Attributes/Edit.vue?vue&type=style&index=0&id=06ab285a&scoped=true&lang=css":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Product/Attributes/Edit.vue?vue&type=style&index=0&id=06ab285a&scoped=true&lang=css ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
___CSS_LOADER_EXPORT___.push([module.id, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n/* Strip the browser's default color-input padding/border so the fill sits centered\n   and evenly inset, instead of the native swatch floating off-center in a big box. */\n.category-checkbox[data-v-06ab285a]  .custom-control-label {\n  margin-left: 8px;\n}\n.color-swatch-input[data-v-06ab285a] {\n  width: 64px;\n  height: 30px;\n  padding: 0;\n  border: 1px solid #ced4da;\n  border-radius: 6px;\n  cursor: pointer;\n  background: none;\n}\n.color-swatch-input[data-v-06ab285a]::-webkit-color-swatch-wrapper {\n  padding: 3px;\n}\n.color-swatch-input[data-v-06ab285a]::-webkit-color-swatch {\n  border: none;\n  border-radius: 4px;\n}\n.color-swatch-input[data-v-06ab285a]::-moz-color-swatch {\n  border: none;\n  border-radius: 4px;\n}\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Product/Attributes/Attributes.vue?vue&type=style&index=0&id=39198fe0&scoped=true&lang=css":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Product/Attributes/Attributes.vue?vue&type=style&index=0&id=39198fe0&scoped=true&lang=css ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Attributes_vue_vue_type_style_index_0_id_39198fe0_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Attributes.vue?vue&type=style&index=0&id=39198fe0&scoped=true&lang=css */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Product/Attributes/Attributes.vue?vue&type=style&index=0&id=39198fe0&scoped=true&lang=css");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Attributes_vue_vue_type_style_index_0_id_39198fe0_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Attributes_vue_vue_type_style_index_0_id_39198fe0_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Product/Attributes/Edit.vue?vue&type=style&index=0&id=06ab285a&scoped=true&lang=css":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Product/Attributes/Edit.vue?vue&type=style&index=0&id=06ab285a&scoped=true&lang=css ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Edit_vue_vue_type_style_index_0_id_06ab285a_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Edit.vue?vue&type=style&index=0&id=06ab285a&scoped=true&lang=css */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Product/Attributes/Edit.vue?vue&type=style&index=0&id=06ab285a&scoped=true&lang=css");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Edit_vue_vue_type_style_index_0_id_06ab285a_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Edit_vue_vue_type_style_index_0_id_06ab285a_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./resources/js/views/Product/Attributes/Attributes.vue":
/*!**************************************************************!*\
  !*** ./resources/js/views/Product/Attributes/Attributes.vue ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Attributes_vue_vue_type_template_id_39198fe0_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Attributes.vue?vue&type=template&id=39198fe0&scoped=true */ "./resources/js/views/Product/Attributes/Attributes.vue?vue&type=template&id=39198fe0&scoped=true");
/* harmony import */ var _Attributes_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Attributes.vue?vue&type=script&lang=js */ "./resources/js/views/Product/Attributes/Attributes.vue?vue&type=script&lang=js");
/* harmony import */ var _Attributes_vue_vue_type_style_index_0_id_39198fe0_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Attributes.vue?vue&type=style&index=0&id=39198fe0&scoped=true&lang=css */ "./resources/js/views/Product/Attributes/Attributes.vue?vue&type=style&index=0&id=39198fe0&scoped=true&lang=css");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _Attributes_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _Attributes_vue_vue_type_template_id_39198fe0_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render,
  _Attributes_vue_vue_type_template_id_39198fe0_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "39198fe0",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/Product/Attributes/Attributes.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/views/Product/Attributes/Edit.vue":
/*!********************************************************!*\
  !*** ./resources/js/views/Product/Attributes/Edit.vue ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Edit_vue_vue_type_template_id_06ab285a_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Edit.vue?vue&type=template&id=06ab285a&scoped=true */ "./resources/js/views/Product/Attributes/Edit.vue?vue&type=template&id=06ab285a&scoped=true");
/* harmony import */ var _Edit_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Edit.vue?vue&type=script&lang=js */ "./resources/js/views/Product/Attributes/Edit.vue?vue&type=script&lang=js");
/* harmony import */ var _Edit_vue_vue_type_style_index_0_id_06ab285a_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Edit.vue?vue&type=style&index=0&id=06ab285a&scoped=true&lang=css */ "./resources/js/views/Product/Attributes/Edit.vue?vue&type=style&index=0&id=06ab285a&scoped=true&lang=css");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _Edit_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _Edit_vue_vue_type_template_id_06ab285a_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render,
  _Edit_vue_vue_type_template_id_06ab285a_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "06ab285a",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/Product/Attributes/Edit.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/views/Product/Attributes/Attributes.vue?vue&type=script&lang=js":
/*!**************************************************************************************!*\
  !*** ./resources/js/views/Product/Attributes/Attributes.vue?vue&type=script&lang=js ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Attributes_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Attributes.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Product/Attributes/Attributes.vue?vue&type=script&lang=js");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Attributes_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/Product/Attributes/Edit.vue?vue&type=script&lang=js":
/*!********************************************************************************!*\
  !*** ./resources/js/views/Product/Attributes/Edit.vue?vue&type=script&lang=js ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Edit_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Edit.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Product/Attributes/Edit.vue?vue&type=script&lang=js");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Edit_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/Product/Attributes/Attributes.vue?vue&type=style&index=0&id=39198fe0&scoped=true&lang=css":
/*!**********************************************************************************************************************!*\
  !*** ./resources/js/views/Product/Attributes/Attributes.vue?vue&type=style&index=0&id=39198fe0&scoped=true&lang=css ***!
  \**********************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Attributes_vue_vue_type_style_index_0_id_39198fe0_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/style-loader/dist/cjs.js!../../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Attributes.vue?vue&type=style&index=0&id=39198fe0&scoped=true&lang=css */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Product/Attributes/Attributes.vue?vue&type=style&index=0&id=39198fe0&scoped=true&lang=css");


/***/ }),

/***/ "./resources/js/views/Product/Attributes/Edit.vue?vue&type=style&index=0&id=06ab285a&scoped=true&lang=css":
/*!****************************************************************************************************************!*\
  !*** ./resources/js/views/Product/Attributes/Edit.vue?vue&type=style&index=0&id=06ab285a&scoped=true&lang=css ***!
  \****************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Edit_vue_vue_type_style_index_0_id_06ab285a_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/style-loader/dist/cjs.js!../../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Edit.vue?vue&type=style&index=0&id=06ab285a&scoped=true&lang=css */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Product/Attributes/Edit.vue?vue&type=style&index=0&id=06ab285a&scoped=true&lang=css");


/***/ }),

/***/ "./resources/js/views/Product/Attributes/Attributes.vue?vue&type=template&id=39198fe0&scoped=true":
/*!********************************************************************************************************!*\
  !*** ./resources/js/views/Product/Attributes/Attributes.vue?vue&type=template&id=39198fe0&scoped=true ***!
  \********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Attributes_vue_vue_type_template_id_39198fe0_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   staticRenderFns: () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Attributes_vue_vue_type_template_id_39198fe0_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Attributes_vue_vue_type_template_id_39198fe0_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Attributes.vue?vue&type=template&id=39198fe0&scoped=true */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Product/Attributes/Attributes.vue?vue&type=template&id=39198fe0&scoped=true");


/***/ }),

/***/ "./resources/js/views/Product/Attributes/Edit.vue?vue&type=template&id=06ab285a&scoped=true":
/*!**************************************************************************************************!*\
  !*** ./resources/js/views/Product/Attributes/Edit.vue?vue&type=template&id=06ab285a&scoped=true ***!
  \**************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Edit_vue_vue_type_template_id_06ab285a_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   staticRenderFns: () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Edit_vue_vue_type_template_id_06ab285a_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Edit_vue_vue_type_template_id_06ab285a_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Edit.vue?vue&type=template&id=06ab285a&scoped=true */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Product/Attributes/Edit.vue?vue&type=template&id=06ab285a&scoped=true");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Product/Attributes/Attributes.vue?vue&type=template&id=39198fe0&scoped=true":
/*!***********************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Product/Attributes/Attributes.vue?vue&type=template&id=39198fe0&scoped=true ***!
  \***********************************************************************************************************************************************************************************************************************************************/
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
              _vm._v(_vm._s(_vm.__("attributes"))),
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
                        attrs: {
                          to: _vm.isSeller ? "/seller/dashboard" : "/dashboard",
                        },
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
                  [_vm._v(_vm._s(_vm.__("attributes")))]
                ),
              ]),
            ]),
          ]
        ),
      ]),
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
                        _c("span", [_vm._v(_vm._s(_vm.__("add_attribute")))]),
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
                  items: _vm.translatedAttributes,
                  fields: _vm.fields,
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
                    key: "cell(id)",
                    fn: function (row) {
                      return [
                        _vm._v(
                          "\n                        " +
                            _vm._s(row.item.id) +
                            "\n                    "
                        ),
                      ]
                    },
                  },
                  {
                    key: "cell(name)",
                    fn: function (row) {
                      return [
                        _c("div", [_vm._v(_vm._s(row.item.name))]),
                        _vm._v(" "),
                        _vm.isInUse(row.item)
                          ? _c("small", { staticClass: "text-muted" }, [
                              _c("i", { staticClass: "fa fa-link" }),
                              _vm._v(
                                "\n                            " +
                                  _vm._s(_vm.__("used_in")) +
                                  " " +
                                  _vm._s(row.item.categories_count) +
                                  "\n                            " +
                                  _vm._s(
                                    row.item.categories_count == 1
                                      ? _vm.__("category")
                                      : _vm.__("categories")
                                  ) +
                                  "\n                        "
                              ),
                            ])
                          : _vm._e(),
                      ]
                    },
                  },
                  {
                    key: "cell(values)",
                    fn: function (row) {
                      return [
                        _c(
                          "div",
                          {
                            staticClass:
                              "d-flex flex-wrap gap-1 justify-content-center align-items-center",
                          },
                          [
                            _vm._l(row.item.values, function (value) {
                              return _c(
                                "span",
                                {
                                  key: value.id,
                                  staticClass:
                                    "badge bg-light text-dark border d-inline-flex align-items-center gap-1",
                                },
                                [
                                  row.item.type === "color" && value.color_code
                                    ? _c("span", {
                                        staticClass: "rounded-circle border",
                                        style: {
                                          background: value.color_code,
                                          width: "12px",
                                          height: "12px",
                                          display: "inline-block",
                                        },
                                      })
                                    : row.item.type === "image" &&
                                      value.image_url
                                    ? _c("img", {
                                        staticClass: "rounded",
                                        staticStyle: {
                                          width: "16px",
                                          height: "16px",
                                          "object-fit": "cover",
                                        },
                                        attrs: { src: value.image_url },
                                      })
                                    : _vm._e(),
                                  _vm._v(
                                    "\n                                " +
                                      _vm._s(value.value) +
                                      "\n                                "
                                  ),
                                  value.short_code
                                    ? _c(
                                        "small",
                                        { staticClass: "text-muted" },
                                        [
                                          _vm._v(
                                            "(" + _vm._s(value.short_code) + ")"
                                          ),
                                        ]
                                      )
                                    : _vm._e(),
                                ]
                              )
                            }),
                            _vm._v(" "),
                            !row.item.values || row.item.values.length === 0
                              ? _c("span", { staticClass: "text-muted" }, [
                                  _vm._v("-"),
                                ])
                              : _vm._e(),
                          ],
                          2
                        ),
                      ]
                    },
                  },
                  {
                    key: "cell(owner)",
                    fn: function (row) {
                      return [
                        row.item.is_mine
                          ? _c("span", { staticClass: "badge bg-secondary" }, [
                              _vm._v(_vm._s(_vm.__("mine") || "Mine")),
                            ])
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
                        row.item.status == 1
                          ? _c("span", { staticClass: "badge bg-success" }, [
                              _vm._v(_vm._s(_vm.__("active"))),
                            ])
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
                        _vm.canManage(row.item)
                          ? _c("div", { staticClass: "d-flex gap-2" }, [
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
                              !_vm.isSeller || row.item.is_mine
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
                                      style:
                                        _vm.isSeller && _vm.isInUse(row.item)
                                          ? "opacity: 0.5; cursor: not-allowed;"
                                          : "",
                                      attrs: {
                                        disabled:
                                          _vm.isSeller && _vm.isInUse(row.item),
                                        title:
                                          _vm.isSeller && _vm.isInUse(row.item)
                                            ? _vm.__(
                                                "attribute_in_use_cannot_be_deleted"
                                              ) ||
                                              "Assigned to a category, cannot be deleted"
                                            : _vm.__("delete"),
                                      },
                                      on: {
                                        click: function ($event) {
                                          !(
                                            _vm.isSeller &&
                                            _vm.isInUse(row.item)
                                          ) &&
                                            _vm.deleteRecord(
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
                            ])
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
          ]),
        ]),
      ]),
      _vm._v(" "),
      _vm.edit_record
        ? _c("app-edit-record", {
            attrs: { record: _vm.edit_record },
            on: {
              modalClose: function ($event) {
                _vm.edit_record = null
              },
              saved: _vm.onAttributeSaved,
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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Product/Attributes/Edit.vue?vue&type=template&id=06ab285a&scoped=true":
/*!*****************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Product/Attributes/Edit.vue?vue&type=template&id=06ab285a&scoped=true ***!
  \*****************************************************************************************************************************************************************************************************************************************/
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
        { attrs: { slot: "modal-footer" }, slot: "modal-footer" },
        [
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
              _vm._v("\n      " + _vm._s(_vm.__("save")) + "\n      "),
              _vm.isLoading
                ? _c("b-spinner", { attrs: { small: "", label: "Spinning" } })
                : _vm._e(),
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "b-button",
            { attrs: { variant: "secondary" }, on: { click: _vm.hideModal } },
            [_vm._v(_vm._s(_vm.__("cancel")))]
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
                _vm._l(_vm.languages, function (lang, index) {
                  return _c(
                    "b-tab",
                    {
                      key: lang.id,
                      attrs: { title: lang.name, active: lang.is_default == 1 },
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
                                    : _c("b-spinner", { attrs: { small: "" } }),
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
                                            _vm.__("translate_and_overwrite")
                                          )
                                        ),
                                      ])
                                    : _c("b-spinner", { attrs: { small: "" } }),
                                ],
                                1
                              ),
                            ],
                            1
                          )
                        : _vm._e(),
                      _vm._v(" "),
                      _c("div", { staticClass: "row" }, [
                        _c("div", { staticClass: "form-group col-12" }, [
                          _c("label", [_vm._v(_vm._s(_vm.__("name")))]),
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
                              placeholder: _vm.__("enter_name"),
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
                          ? _c("div", { staticClass: "form-group col-12" }, [
                              _c("label", [_vm._v(_vm._s(_vm.__("type")))]),
                              _vm._v(" "),
                              _c("i", { staticClass: "text-danger" }, [
                                _vm._v("*"),
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
                                  staticClass: "form-control",
                                  staticStyle: { "max-width": "260px" },
                                  on: {
                                    change: function ($event) {
                                      var $$selectedVal = Array.prototype.filter
                                        .call(
                                          $event.target.options,
                                          function (o) {
                                            return o.selected
                                          }
                                        )
                                        .map(function (o) {
                                          var val =
                                            "_value" in o ? o._value : o.value
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
                                  _c("option", { attrs: { value: "color" } }, [
                                    _vm._v(_vm._s(_vm.__("colour"))),
                                  ]),
                                  _vm._v(" "),
                                  _c("option", { attrs: { value: "image" } }, [
                                    _vm._v(_vm._s(_vm.__("image"))),
                                  ]),
                                ]
                              ),
                              _vm._v(" "),
                              _c("small", { staticClass: "text-muted" }, [
                                _vm._v(
                                  _vm._s(
                                    _vm.__(
                                      "type_applies_to_the_whole_attribute_not_per_value"
                                    )
                                  )
                                ),
                              ]),
                            ])
                          : _vm._e(),
                        _vm._v(" "),
                        lang.is_default
                          ? _c(
                              "div",
                              { staticClass: "form-group col-12" },
                              [
                                _c("label", [_vm._v(_vm._s(_vm.__("values")))]),
                                _vm._v(" "),
                                _c("i", { staticClass: "text-danger" }, [
                                  _vm._v("*"),
                                ]),
                                _vm._v(" "),
                                _c(
                                  "div",
                                  {
                                    staticClass: "d-flex mb-1",
                                    staticStyle: { gap: "8px" },
                                  },
                                  [
                                    _c(
                                      "small",
                                      {
                                        staticClass: "text-muted",
                                        staticStyle: { width: "40%" },
                                      },
                                      [_vm._v(_vm._s(_vm.__("value")))]
                                    ),
                                    _vm._v(" "),
                                    _vm.type === "text"
                                      ? _c(
                                          "small",
                                          {
                                            staticClass:
                                              "text-muted flex-grow-1",
                                            staticStyle: {
                                              "text-align": "left",
                                            },
                                          },
                                          [_vm._v(_vm._s(_vm.__("short_code")))]
                                        )
                                      : _vm._e(),
                                    _vm._v(" "),
                                    _vm.type === "color"
                                      ? _c(
                                          "small",
                                          {
                                            staticClass:
                                              "text-muted flex-grow-1",
                                            staticStyle: {
                                              "text-align": "left",
                                            },
                                          },
                                          [_vm._v(_vm._s(_vm.__("colour")))]
                                        )
                                      : _vm._e(),
                                    _vm._v(" "),
                                    _vm.type === "image"
                                      ? _c(
                                          "small",
                                          {
                                            staticClass:
                                              "text-muted flex-grow-1",
                                            staticStyle: {
                                              "text-align": "left",
                                            },
                                          },
                                          [_vm._v(_vm._s(_vm.__("image")))]
                                        )
                                      : _vm._e(),
                                    _vm._v(" "),
                                    _c("span", {
                                      staticStyle: { width: "38px" },
                                    }),
                                  ]
                                ),
                                _vm._v(" "),
                                _vm._l(_vm.values, function (val, idx) {
                                  return _c(
                                    "div",
                                    {
                                      key: val.uid,
                                      staticClass:
                                        "d-flex align-items-center mb-2",
                                      staticStyle: { gap: "8px" },
                                    },
                                    [
                                      _c("input", {
                                        directives: [
                                          {
                                            name: "model",
                                            rawName: "v-model",
                                            value: val.value,
                                            expression: "val.value",
                                          },
                                        ],
                                        staticClass: "form-control",
                                        staticStyle: { width: "40%" },
                                        attrs: {
                                          type: "text",
                                          placeholder: _vm.__("enter_value"),
                                          required: "",
                                        },
                                        domProps: { value: val.value },
                                        on: {
                                          input: function ($event) {
                                            if ($event.target.composing) {
                                              return
                                            }
                                            _vm.$set(
                                              val,
                                              "value",
                                              $event.target.value
                                            )
                                          },
                                        },
                                      }),
                                      _vm._v(" "),
                                      _vm.type === "text"
                                        ? _c("input", {
                                            directives: [
                                              {
                                                name: "model",
                                                rawName: "v-model",
                                                value: val.short_code,
                                                expression: "val.short_code",
                                              },
                                            ],
                                            staticClass:
                                              "form-control flex-grow-1",
                                            attrs: {
                                              type: "text",
                                              placeholder:
                                                _vm.__("enter_short_code"),
                                              required: "",
                                            },
                                            domProps: { value: val.short_code },
                                            on: {
                                              input: function ($event) {
                                                if ($event.target.composing) {
                                                  return
                                                }
                                                _vm.$set(
                                                  val,
                                                  "short_code",
                                                  $event.target.value
                                                )
                                              },
                                            },
                                          })
                                        : _vm._e(),
                                      _vm._v(" "),
                                      _vm.type === "color"
                                        ? _c(
                                            "div",
                                            {
                                              staticClass:
                                                "d-flex align-items-center flex-grow-1",
                                            },
                                            [
                                              _c("input", {
                                                directives: [
                                                  {
                                                    name: "model",
                                                    rawName: "v-model",
                                                    value: val.color_code,
                                                    expression:
                                                      "val.color_code",
                                                  },
                                                ],
                                                staticClass:
                                                  "color-swatch-input",
                                                attrs: { type: "color" },
                                                domProps: {
                                                  value: val.color_code,
                                                },
                                                on: {
                                                  input: function ($event) {
                                                    if (
                                                      $event.target.composing
                                                    ) {
                                                      return
                                                    }
                                                    _vm.$set(
                                                      val,
                                                      "color_code",
                                                      $event.target.value
                                                    )
                                                  },
                                                },
                                              }),
                                            ]
                                          )
                                        : _vm._e(),
                                      _vm._v(" "),
                                      _vm.type === "image"
                                        ? _c(
                                            "div",
                                            {
                                              staticClass:
                                                "d-flex align-items-center gap-2 flex-grow-1",
                                            },
                                            [
                                              val.image_url
                                                ? _c("img", {
                                                    staticClass:
                                                      "img-thumbnail",
                                                    staticStyle: {
                                                      width: "32px",
                                                      height: "32px",
                                                      "object-fit": "cover",
                                                      "flex-shrink": "0",
                                                    },
                                                    attrs: {
                                                      src: val.image_url,
                                                    },
                                                  })
                                                : _vm._e(),
                                              _vm._v(" "),
                                              _c("input", {
                                                staticClass:
                                                  "form-control form-control-sm",
                                                attrs: {
                                                  type: "file",
                                                  accept: "image/*",
                                                },
                                                on: {
                                                  change: function ($event) {
                                                    return _vm.onValueImageChange(
                                                      $event,
                                                      idx
                                                    )
                                                  },
                                                },
                                              }),
                                            ]
                                          )
                                        : _vm._e(),
                                      _vm._v(" "),
                                      _vm.values.length > 1
                                        ? _c(
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
                                                variant: "outline-danger",
                                                size: "sm",
                                                title: _vm.__("delete"),
                                              },
                                              on: {
                                                click: function ($event) {
                                                  return _vm.removeValue(idx)
                                                },
                                              },
                                            },
                                            [
                                              _c("i", {
                                                staticClass: "fa fa-times",
                                              }),
                                            ]
                                          )
                                        : _vm._e(),
                                    ],
                                    1
                                  )
                                }),
                                _vm._v(" "),
                                _c(
                                  "b-button",
                                  {
                                    attrs: {
                                      variant: "outline-primary",
                                      size: "sm",
                                    },
                                    on: {
                                      click: function ($event) {
                                        return _vm.addValue()
                                      },
                                    },
                                  },
                                  [
                                    _c("i", { staticClass: "fa fa-plus" }),
                                    _vm._v(
                                      " " +
                                        _vm._s(_vm.__("add_value")) +
                                        "\n            "
                                    ),
                                  ]
                                ),
                              ],
                              2
                            )
                          : _vm._e(),
                        _vm._v(" "),
                        _vm.isSeller && lang.is_default
                          ? _c("div", { staticClass: "form-group col-12" }, [
                              _c("label", [
                                _vm._v(_vm._s(_vm.__("categories"))),
                              ]),
                              _vm._v(" "),
                              _c(
                                "small",
                                { staticClass: "text-muted d-block mb-1" },
                                [
                                  _vm._v(
                                    "Assign this attribute to your own categories"
                                  ),
                                ]
                              ),
                              _vm._v(" "),
                              _vm.sellerCategories.length
                                ? _c(
                                    "div",
                                    {
                                      staticClass: "d-flex flex-wrap",
                                      staticStyle: { gap: "10px" },
                                    },
                                    _vm._l(
                                      _vm.sellerCategories,
                                      function (cat) {
                                        return _c(
                                          "b-form-checkbox",
                                          {
                                            key: cat.id,
                                            staticClass: "category-checkbox",
                                            attrs: { value: cat.id },
                                            model: {
                                              value: _vm.selectedCategoryIds,
                                              callback: function ($$v) {
                                                _vm.selectedCategoryIds = $$v
                                              },
                                              expression: "selectedCategoryIds",
                                            },
                                          },
                                          [
                                            _vm._v(
                                              "\n                " +
                                                _vm._s(cat.name) +
                                                "\n              "
                                            ),
                                          ]
                                        )
                                      }
                                    ),
                                    1
                                  )
                                : _c("small", { staticClass: "text-muted" }, [
                                    _vm._v(
                                      "No categories assigned to you yet - ask admin to assign one."
                                    ),
                                  ]),
                            ])
                          : _vm._e(),
                        _vm._v(" "),
                        _vm.id && lang.is_default
                          ? _c("div", { staticClass: "form-group col-12" }, [
                              _c("label", [_vm._v(_vm._s(_vm.__("status")))]),
                              _vm._v(" "),
                              _c(
                                "div",
                                { staticClass: "col-md-9 text-left mt-1" },
                                [
                                  _c("b-form-radio-group", {
                                    attrs: {
                                      options: [
                                        {
                                          text: _vm.__("deactivate"),
                                          value: 0,
                                        },
                                        { text: _vm.__("activate"), value: 1 },
                                      ],
                                      buttons: "",
                                      "button-variant": "outline-primary",
                                      required: "",
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
                      ]),
                    ]
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