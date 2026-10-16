(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_views_Product_EditProduct_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Product/EditProduct.vue?vue&type=script&lang=js":
/*!********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Product/EditProduct.vue?vue&type=script&lang=js ***!
  \********************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var vue_multiselect__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! vue-multiselect */ "./node_modules/vue-multiselect/dist/vue-multiselect.min.js");
/* harmony import */ var vue_multiselect__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(vue_multiselect__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var v_select2_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! v-select2-component */ "./node_modules/v-select2-component/dist/Select2.esm.js");
/* harmony import */ var _tinymce_tinymce_vue__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @tinymce/tinymce-vue */ "./node_modules/@tinymce/tinymce-vue/lib/es2015/main/ts/index.js");
/* harmony import */ var vuedraggable__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! vuedraggable */ "./node_modules/vuedraggable/dist/vuedraggable.umd.js");
/* harmony import */ var vuedraggable__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(vuedraggable__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _Auth_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../Auth.js */ "./resources/js/Auth.js");
/* harmony import */ var _mixins_TranslationHelper_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../mixins/TranslationHelper.js */ "./resources/js/mixins/TranslationHelper.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
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
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


// import InputTag from 'vue-input-tag';







/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  mixins: [_mixins_TranslationHelper_js__WEBPACK_IMPORTED_MODULE_7__["default"]],
  // register the component
  components: {
    Multiselect: (vue_multiselect__WEBPACK_IMPORTED_MODULE_2___default()),
    Select2: v_select2_component__WEBPACK_IMPORTED_MODULE_3__["default"],
    'editor': _tinymce_tinymce_vue__WEBPACK_IMPORTED_MODULE_4__["default"],
    draggable: (vuedraggable__WEBPACK_IMPORTED_MODULE_5___default())
  },
  data: function data() {
    var _ref;
    return _ref = {
      login_user: _Auth_js__WEBPACK_IMPORTED_MODULE_6__["default"].user,
      isLoading: false,
      isGeneratingAI: false,
      // Track AI content generation state
      cacheTimer: null,
      cachedData: null,
      skipCache: false,
      name: '',
      slug: '',
      seller_id: '',
      tags: [],
      addonGroupOptions: [],
      selectedAddonGroups: [],
      tag_ids: '',
      tagIdsByLanguage: {},
      // Store tag IDs for each language
      tagSuggestions: [],
      brand: null,
      tax_id: 0,
      /* Variants are defined by an attribute value. The backend maps this back to the legacy
         packet semantics (measurement / stock_unit_id / type) that the cart and reports read. */
      type: 'attribute',
      attributeOptions: [],
      isLoadingAttributes: false,
      selectedAttributeValues: {},
      checkboxRenderKey: {},
      activeVariantIndex: 0,
      image_mode: 'global',
      suppressCategoryWatch: false,
      category_id: '',
      manufacturer: '',
      made_in: '',
      tag: '',
      return_status: 0,
      return_days: 1,
      cancelable_status: 0,
      till_status: "",
      cod_allowed_status: 0,
      max_allowed_quantity: 0,
      description: '',
      require_products_approval: 0,
      require_prescription: 0,
      is_approved: 1,
      status: 1,
      is_unlimited_stock: 0,
      tax_included_in_price: 0,
      pincode_ids_exc: null,
      sellers: null,
      taxes: null,
      brands: [],
      countries: [],
      categories: null,
      order_status: null,
      inputs: [{
        'name': '',
        'packet_status': '',
        'attribute_value_id': ''
      }],
      image: null,
      main_image_path: "",
      main_image_name: "",
      other_images: null,
      images: [],
      variantFiles: {},
      id: null,
      record: null,
      clone: false,
      categoryOptions: '<option value="">' + __('select_category') + '</option>',
      deleteImageIds: [],
      loggedUser: _Auth_js__WEBPACK_IMPORTED_MODULE_6__["default"].user,
      isBarcodeValid: '',
      input: [],
      mainImageerror: null,
      otherImageerror: null,
      variantImageerror: null,
      barcode: "",
      meta_title: "",
      meta_keywords: "",
      schema_markup: "",
      meta_description: "",
      validationBarcodeMessage: "",
      useCustomPrompt: false,
      customPrompt: '',
      loading: false,
      textGenKey: '',
      // Multi-language support
      isLoadingLanguages: false,
      activeLanguageTab: 0,
      translations: {},
      defaultLanguageId: null,
      languages: [],
      currentLanguageId: null,
      activeLanguages: []
    }, _defineProperty(_ref, "categories", []), _defineProperty(_ref, "translatableFields", ['name', 'description', 'manufacturer', 'meta_title', 'meta_keywords', 'schema_markup', 'meta_description', 'tags']), _defineProperty(_ref, "translateSuccessMessage", ''), _defineProperty(_ref, "loadingEmpty", false), _defineProperty(_ref, "loadingOverwrite", false), _defineProperty(_ref, "cacheTimer", null), _defineProperty(_ref, "cachedData", null), _defineProperty(_ref, "skipCache", false), _defineProperty(_ref, "customFields", []), _defineProperty(_ref, "customFieldValues", {}), _defineProperty(_ref, "customFieldFiles", {}), _defineProperty(_ref, "customFieldExistingValues", {}), _ref;
  },
  computed: {
    // Custom fields shown in the current app locale, falling back to the default-language
    // name/options when no translation exists for it. Product Type / FSSAI Lic. No. are
    // seeded module=product custom_fields rows themselves, so they render through this same
    // generic loop and only appear when their row still exists (e.g. not removed via the
    // admin Custom Fields page, or not seeded for this module).
    translatedCustomFields: function translatedCustomFields() {
      var _this = this;
      var list = Array.isArray(this.customFields) ? this.customFields : [];
      if (!this.currentLanguageId || list.length === 0) {
        return list;
      }
      return list.map(function (field) {
        var translatedField = _objectSpread({}, field);
        if (Array.isArray(field.translations)) {
          var translation = field.translations.find(function (t) {
            return t.language_id === _this.currentLanguageId;
          });
          if (translation && translation.name && translation.name.trim() !== '') {
            translatedField.name = translation.name;
          }
          if (translation && Array.isArray(translation.options) && translation.options.length > 0) {
            translatedField.options = translation.options;
          }
        }
        return translatedField;
      });
    },
    // Attributes with at least one checked value, paired with just the checked values.
    selectedAttributeCombos: function selectedAttributeCombos() {
      var _this2 = this;
      return this.attributeOptions.map(function (attribute) {
        return {
          attribute: attribute,
          values: (attribute.values || []).filter(function (v) {
            return _this2.isAttributeValueChecked(attribute.id, v.id);
          })
        };
      }).filter(function (entry) {
        return entry.values.length > 0;
      });
    },
    variantCombosCount: function variantCombosCount() {
      if (this.selectedAttributeCombos.length === 0) return 0;
      return this.selectedAttributeCombos.reduce(function (total, entry) {
        return total * entry.values.length;
      }, 1);
    },
    // True once there's a real variant to show - matrix-generated or a legacy saved row
    // (id set) that predates the attribute system and has no attribute_value_id yet.
    hasEditableVariants: function hasEditableVariants() {
      return this.inputs.some(function (input) {
        return input.attribute_value_id || input.id;
      });
    },
    isSellerRoute: function isSellerRoute() {
      // Use this.$route to access the current route
      return this.$route.path.startsWith('/seller/');
    },
    tagsOptions: function tagsOptions() {
      return this.tags.length ? this.tags.map(function (tag) {
        return {
          id: tag.id,
          text: tag.name
        };
      }) : [];
    },
    selectedTags: function selectedTags() {
      var _this3 = this;
      return this.tags.filter(function (tag) {
        return _this3.tag_ids.includes(tag.id);
      });
    },
    // Computed property to safely access $roleSeller
    roleSeller: function roleSeller() {
      return this.$roleSeller !== undefined ? this.$roleSeller : '';
    },
    // Computed property to check if current user is seller
    isSellerRole: function isSellerRole() {
      try {
        return this.login_user && this.login_user.role && this.login_user.role.name && this.roleSeller && this.roleSeller === this.login_user.role.name;
      } catch (e) {
        return false;
      }
    },
    canUseAIGenerate: function canUseAIGenerate() {
      var user = _Auth_js__WEBPACK_IMPORTED_MODULE_6__["default"].user || this.login_user;
      return this.$isDemo != 1 && user && user.id == 1;
    },
    isPharmacyModule: function isPharmacyModule() {
      var activeModuleId = Number(localStorage.getItem('active_module_id')) || 1;
      return activeModuleId === 2;
    },
    translatedSellers: function translatedSellers() {
      var _this4 = this;
      if (!this.currentLanguageId || !this.sellers || this.sellers.length === 0) {
        return this.sellers || [];
      }
      var defaultLanguage = this.activeLanguages.find(function (lang) {
        return lang.is_default === 1;
      });
      var defaultLanguageId = defaultLanguage ? defaultLanguage.id : null;
      return this.sellers.map(function (seller) {
        var translatedSeller = _objectSpread({}, seller);
        var translatedName = seller.name;
        if (seller.translations && Array.isArray(seller.translations)) {
          var translation = seller.translations.find(function (t) {
            return t.language_id === _this4.currentLanguageId;
          });
          if (!translation && defaultLanguageId) {
            translation = seller.translations.find(function (t) {
              return t.language_id === defaultLanguageId;
            });
          }
          if (translation && translation.name && translation.name.trim() !== '') {
            translatedName = translation.name;
          }
        }
        translatedSeller.name = translatedName;
        return translatedSeller;
      });
    },
    translatedBrands: function translatedBrands() {
      var _this5 = this;
      if (!this.currentLanguageId || !this.brands || this.brands.length === 0) {
        return this.brands || [];
      }
      var defaultLanguage = this.activeLanguages.find(function (lang) {
        return lang.is_default === 1;
      });
      var defaultLanguageId = defaultLanguage ? defaultLanguage.id : null;
      return this.brands.map(function (brand) {
        var translatedBrand = _objectSpread({}, brand);
        var translatedTitle = brand.title || brand.name;
        if (brand.translations && Array.isArray(brand.translations)) {
          var translation = brand.translations.find(function (t) {
            return t.language_id === _this5.currentLanguageId;
          });
          if (!translation && defaultLanguageId) {
            translation = brand.translations.find(function (t) {
              return t.language_id === defaultLanguageId;
            });
          }
          if (translation && translation.title && translation.title.trim() !== '') {
            translatedTitle = translation.title;
          }
        }
        translatedBrand.name = translatedTitle;
        translatedBrand.title = translatedTitle;
        return translatedBrand;
      });
    },
    translatedTaxes: function translatedTaxes() {
      var _this6 = this;
      if (!this.currentLanguageId || !this.taxes || this.taxes.length === 0) {
        return this.taxes || [];
      }
      var defaultLanguage = this.activeLanguages.find(function (lang) {
        return lang.is_default === 1;
      });
      var defaultLanguageId = defaultLanguage ? defaultLanguage.id : null;
      return this.taxes.map(function (tax) {
        var translatedTax = _objectSpread({}, tax);
        var translatedTitle = tax.title;
        if (tax.translations && Array.isArray(tax.translations)) {
          var translation = tax.translations.find(function (t) {
            return t.language_id === _this6.currentLanguageId;
          });
          if (!translation && defaultLanguageId) {
            translation = tax.translations.find(function (t) {
              return t.language_id === defaultLanguageId;
            });
          }
          if (translation && translation.title && translation.title.trim() !== '') {
            translatedTitle = translation.title;
          }
        }
        translatedTax.title = translatedTitle;
        return translatedTax;
      });
    },
    translatedCategories: function translatedCategories() {
      var _this7 = this;
      if (!this.currentLanguageId || !this.categories || this.categories.length === 0) {
        return this.categories || [];
      }
      var defaultLanguage = this.activeLanguages.find(function (lang) {
        return lang.is_default === 1;
      });
      var defaultLanguageId = defaultLanguage ? defaultLanguage.id : null;
      return this.categories.map(function (category) {
        var translatedCategory = _objectSpread({}, category);
        var translatedName = category.name;
        if (category.translations && Array.isArray(category.translations)) {
          var translation = category.translations.find(function (t) {
            return t.language_id === _this7.currentLanguageId;
          });
          if (!translation && defaultLanguageId) {
            translation = category.translations.find(function (t) {
              return t.language_id === defaultLanguageId;
            });
          }
          if (translation && translation.name && translation.name.trim() !== '') {
            translatedName = translation.name;
          }
        }
        translatedCategory.name = translatedName;
        return translatedCategory;
      });
    },
    // Parses the <option> HTML string returned by the backend (which already encodes the
    // seller-restricted / excluded-id / hierarchy logic via CommonHelper::categoryTree) into
    // {id, text} pairs for the Select2 widget - keeps that server-side logic untouched.
    categoryOptionsArray: function categoryOptionsArray() {
      if (!this.categoryOptions) return [];
      var container = document.createElement('div');
      container.innerHTML = this.categoryOptions;
      return Array.from(container.querySelectorAll('option')).filter(function (opt) {
        return opt.value !== '';
      }).map(function (opt) {
        return {
          id: opt.value,
          text: opt.textContent
        };
      });
    }
  },
  created: function created() {
    var _this8 = this;
    this.id = this.$route.params.id || null;
    this.clone = this.$route.params.clone || false;
    this.getCustomFields();
    this.fetchActiveLanguages().then(function () {
      _this8.getSellers();
      _this8.getTaxes();
      /* Attributes are category-driven: don't fetch until a category is picked (new product)
         or getProduct() sets category_id (edit) - both paths call loadAttributes() themselves. */
      _this8.getBrands();
      _this8.getCountries();
      _this8.getTags();
      _this8.getAddonGroups();
      _this8.getOrderStatus();
      _this8.getTextGenKey();
      if (_this8.isSellerRole) {
        _this8.seller_id = _this8.login_user.seller.id;
        _this8.getSeller();
        _this8.getSellerCategories();
      }
      if (_this8.id) {
        _this8.getProduct();
      } else {
        _this8.restoreCache();
      }
    });
  },
  beforeDestroy: function beforeDestroy() {
    if (!this.id && !this.clone && !this.skipCache) this.saveCache();
    if (this.cacheTimer) clearTimeout(this.cacheTimer);
  },
  methods: {
    getCustomFields: function getCustomFields() {
      var _this9 = this;
      axios__WEBPACK_IMPORTED_MODULE_1___default().get(this.$apiUrl + '/custom_fields/list', {
        params: {
          module: 'product',
          active_only: 1
        }
      }).then(function (response) {
        _this9.customFields = response.data.data || [];
        _this9.applyCustomFieldValues();
      })["catch"](function () {
        _this9.customFields = [];
      });
    },
    applyCustomFieldValues: function applyCustomFieldValues() {
      var _this10 = this;
      var values = {};
      this.customFields.forEach(function (field) {
        var existing = _this10.customFieldExistingValues[field.id];
        values[field.id] = field.type !== 'file' && existing !== undefined ? existing : '';
      });
      this.customFieldValues = values;
    },
    handleCustomFieldFile: function handleCustomFieldFile(event, fieldId) {
      this.$set(this.customFieldFiles, fieldId, event.target.files[0] || null);
    },
    customFieldExistingFileUrl: function customFieldExistingFileUrl(fieldId) {
      var path = this.customFieldExistingValues[fieldId];
      return path ? this.$storageUrl + path : '';
    },
    validateCustomFields: function validateCustomFields() {
      var _iterator = _createForOfIteratorHelper(this.customFields),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var field = _step.value;
          if (!field.is_required) continue;
          if (field.type === 'file') {
            if (!this.customFieldFiles[field.id] && !this.customFieldExistingValues[field.id]) {
              this.showError(field.name + ' ' + (__('is_required') || 'is required'));
              return false;
            }
          } else {
            var value = this.customFieldValues[field.id];
            if (value === undefined || value === null || String(value).trim() === '') {
              this.showError(field.name + ' ' + (__('is_required') || 'is required'));
              return false;
            }
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      return true;
    },
    validateDefaultLanguageForTranslation: function validateDefaultLanguageForTranslation() {
      var _this11 = this;
      var form = this.$refs['my-form'];

      // Trigger native browser validation UI
      if (form && !form.reportValidity()) {
        // Switch to default language tab so error field is visible
        this.$nextTick(function () {
          _this11.switchToDefaultLanguageTab();
        });
        return false;
      }

      // Also validate required fields specifically
      return this.validateDefaultLanguage();
    },
    fetchActiveLanguages: function fetchActiveLanguages() {
      var _this12 = this;
      this.isLoadingLanguages = true;
      return axios__WEBPACK_IMPORTED_MODULE_1___default().get(this.$apiUrl + '/active_languages').then(function (response) {
        if (response.data.data) {
          _this12.languages = response.data.data;
          _this12.activeLanguages = response.data.data;
          var defaultLang = _this12.languages.find(function (lang) {
            return lang.is_default === 1;
          });
          if (defaultLang) {
            _this12.defaultLanguageId = defaultLang.id;
          }

          // Get current language ID from app_locale
          var appLocale = window.appLocale || 'en';
          var currentLanguage = _this12.activeLanguages.find(function (lang) {
            return lang.code === appLocale;
          });
          if (currentLanguage) {
            _this12.currentLanguageId = currentLanguage.id;
          } else if (defaultLang) {
            _this12.currentLanguageId = defaultLang.id;
          }
          _this12.initializeTranslations();
          _this12.isLoadingLanguages = false;
        } else {
          _this12.isLoadingLanguages = false;
        }
      })["catch"](function (error) {
        console.error('Error loading languages:', error);
        _this12.isLoadingLanguages = false;
      });
    },
    initializeTranslations: function initializeTranslations() {
      var allTranslations = {};
      this.languages.forEach(function (language) {
        allTranslations[language.id] = {
          name: '',
          tags: '',
          manufacturer: '',
          description: '',
          meta_title: '',
          meta_keywords: '',
          schema_markup: '',
          meta_description: ''
        };
      });
      this.translations = allTranslations;
    },
    // Handle input events for default language fields
    handleDefaultLanguageInput: function handleDefaultLanguageInput(fieldName, language) {
      if (language.is_default && this.translations[language.id]) {
        // Update the main data property with the translation value
        this[fieldName] = this.translations[language.id][fieldName];

        // Special handling for name field - also create slug
        if (fieldName === 'name') {
          this.createSlug();
        }
      }
    },
    // Handle tag input for any language tab
    handleTagInput: function handleTagInput(languageId, value) {
      // Ensure value is properly formatted (could be array, string, or undefined)
      var tagIds = value;
      if (!tagIds) {
        tagIds = [];
      } else if (typeof tagIds === 'string') {
        tagIds = tagIds.split(',').map(function (t) {
          return t.trim();
        }).filter(function (t) {
          return t;
        });
      } else if (!Array.isArray(tagIds)) {
        tagIds = [tagIds];
      }
      if (languageId === this.defaultLanguageId) {
        // For default language, update tag_ids
        this.tag_ids = tagIds;
      } else {
        // For other languages, update tagIdsByLanguage
        this.$set(this.tagIdsByLanguage, languageId, tagIds);
      }
      // Convert IDs to names for translation
      this.handleTagChange(languageId);
    },
    // Handle tag changes - convert IDs to names for translation
    handleTagChange: function handleTagChange(languageId) {
      var _this13 = this;
      if (!this.translations[languageId]) return;

      // Get tag IDs for this language
      var tagIds = [];
      if (languageId === this.defaultLanguageId) {
        tagIds = Array.isArray(this.tag_ids) ? this.tag_ids : this.tag_ids ? String(this.tag_ids).split(',').map(function (t) {
          return t.trim();
        }).filter(function (t) {
          return t;
        }) : [];
      } else {
        var langTagIds = this.tagIdsByLanguage[languageId];
        if (langTagIds) {
          tagIds = Array.isArray(langTagIds) ? langTagIds : String(langTagIds).split(',').map(function (t) {
            return t.trim();
          }).filter(function (t) {
            return t;
          });
        }
      }

      // Convert tag IDs to tag names for translation
      if (tagIds.length > 0) {
        var tagNames = tagIds.map(function (tagId) {
          // If it's a number, find the tag name from tags array
          if (typeof tagId === 'number' || typeof tagId === 'string' && !isNaN(tagId)) {
            var tag = _this13.tags.find(function (t) {
              return t.id == tagId;
            });
            return tag ? tag.name : tagId;
          }
          // If it's already a string (new tag), use it as is
          return tagId;
        });
        this.$set(this.translations[languageId], 'tags', tagNames.join(','));
      } else {
        // Only clear if we explicitly have an empty array (user cleared tags)
        // Don't overwrite if translation.tags already has a value
        if (tagIds.length === 0 && (!this.translations[languageId].tags || this.translations[languageId].tags === '')) {
          this.$set(this.translations[languageId], 'tags', '');
        }
      }
    },
    getEditorConfig: function getEditorConfig() {
      var plugins = this.$editorPlugins && Array.isArray(this.$editorPlugins) ? this.$editorPlugins : ["autolink", "lists", "link", "image", "charmap", "anchor", "searchreplace", "visualblocks", "media", "table", "wordcount", "code", "codesample"];
      var toolbar = this.$editorToolbar || "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | charmap | code | removeformat";
      var fontSizes = this.$editorFont_size_formats || '8pt 10pt 12pt 14pt 16pt 18pt 24pt 36pt 48pt';
      return _objectSpread({
        height: 400,
        plugins: plugins,
        toolbar: toolbar,
        font_size_formats: fontSizes
      }, this.$tinymceImageUploadOptions());
    },
    // Helper method to safely trigger file input click (handles refs in v-for)
    triggerRefClick: function triggerRefClick(refName) {
      var _this14 = this;
      this.$nextTick(function () {
        try {
          var ref = _this14.$refs[refName];
          if (!ref) {
            return;
          }
          // Handle array case (refs inside v-for)
          if (Array.isArray(ref)) {
            // Find first valid element in array
            for (var i = 0; i < ref.length; i++) {
              if (ref[i] && typeof ref[i].click === 'function') {
                ref[i].click();
                return;
              }
            }
            return;
          }
          // Handle single ref case
          if (typeof ref.click === 'function') {
            ref.click();
          }
        } catch (e) {
          console.warn('Error triggering file input click:', e);
        }
      });
    },
    validateDefaultLanguage: function validateDefaultLanguage() {
      if (!this.defaultLanguageId) {
        this.showError(__('default_language_not_found'));
        return false;
      }
      var defaultTranslation = this.translations[this.defaultLanguageId];
      if (!defaultTranslation.name || defaultTranslation.name.trim() === '') {
        this.showError(__('please_fill_product_name_in_default_language'));
        this.switchToDefaultLanguageTab();
        return false;
      }
      if (!defaultTranslation.description || defaultTranslation.description.trim() === '') {
        this.showError(__('please_fill_description_in_default_language'));
        this.switchToDefaultLanguageTab();
        return false;
      }
      return true;
    },
    switchToDefaultLanguageTab: function switchToDefaultLanguageTab() {
      var _this15 = this;
      var defaultLangIndex = this.languages.findIndex(function (lang) {
        return lang.id === _this15.defaultLanguageId;
      });
      if (defaultLangIndex !== -1) {
        this.activeLanguageTab = defaultLangIndex;
      }
    },
    loadTranslations: function loadTranslations() {
      var _this16 = this;
      if (!this.id) return;

      // Wait for languages to be loaded first
      if (this.languages.length === 0) {
        this.fetchActiveLanguages().then(function () {
          _this16.loadTranslationsData();
        });
        return;
      }
      this.loadTranslationsData();
    },
    // Load translations from API response (translations array with all language records)
    loadTranslationsData: function loadTranslationsData() {
      var _this17 = this;
      if (!this.record || !this.record.translations || !Array.isArray(this.record.translations)) {
        return;
      }
      var translationsArray = this.record.translations;
      this.languages.forEach(function (language) {
        var translation = translationsArray.find(function (t) {
          return t.language_id === language.id;
        });
        if (translation) {
          _this17.$set(_this17.translations[language.id], 'name', translation.name || '');
          _this17.$set(_this17.translations[language.id], 'tags', translation.tags || '');
          _this17.$set(_this17.translations[language.id], 'manufacturer', translation.manufacturer || '');
          _this17.$set(_this17.translations[language.id], 'description', translation.description || '');
          _this17.$set(_this17.translations[language.id], 'meta_title', translation.meta_title || '');
          _this17.$set(_this17.translations[language.id], 'meta_keywords', translation.meta_keywords || '');
          _this17.$set(_this17.translations[language.id], 'schema_markup', translation.schema_markup || '');
          _this17.$set(_this17.translations[language.id], 'meta_description', translation.meta_description || '');
        }
      });
      if (this.tags && this.tags.length > 0) {
        this.convertTagNamesToIds();
      }
    },
    // Helper method to convert tag names to IDs for Select2 (for all languages)
    convertTagNamesToIds: function convertTagNamesToIds() {
      var _this18 = this;
      if (!this.tags || this.tags.length === 0) {
        return; // Tags not loaded yet
      }
      if (!this.languages || this.languages.length === 0) {
        return; // Languages not loaded yet
      }
      this.languages.forEach(function (language) {
        if (_this18.translations[language.id] && _this18.translations[language.id].tags) {
          var tagsString = _this18.translations[language.id].tags;
          if (tagsString && tagsString.trim()) {
            // Tags in translation are names (comma-separated string)
            // Convert names to IDs for Select2
            var tagNames = tagsString.split(',').map(function (t) {
              return t.trim();
            }).filter(function (t) {
              return t;
            });
            var tagIds = tagNames.map(function (tagName) {
              // Try to find tag by name (case-insensitive matching)
              var tag = _this18.tags.find(function (t) {
                var tagNameTrimmed = String(t.name || '').trim();
                var searchNameTrimmed = String(tagName || '').trim();
                return tagNameTrimmed.toLowerCase() === searchNameTrimmed.toLowerCase();
              });
              if (tag) {
                return tag.id;
              }
              // If not found, it might be a new tag (keep as string)
              return tagName;
            });
            if (language.is_default) {
              _this18.tag_ids = tagIds;
            } else {
              // Use $set to ensure reactivity
              _this18.$set(_this18.tagIdsByLanguage, language.id, tagIds);
            }
          } else {
            // Set empty array if no tags
            if (language.is_default) {
              _this18.tag_ids = [];
            } else {
              _this18.$set(_this18.tagIdsByLanguage, language.id, []);
            }
          }
        } else {
          // Initialize with empty array if no translation
          if (!language.is_default) {
            _this18.$set(_this18.tagIdsByLanguage, language.id, []);
          }
        }
      });
    },
    generateDescription: function generateDescription() {
      var _this19 = this;
      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee() {
        var prompt, _data$candidates, _data$candidates$, _data$candidates$$con, _data$candidates$$con2, _data$candidates$$con3, response, data, generatedText;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(_this19.$isDemo == 1)) {
                  _context.next = 3;
                  break;
                }
                _this19.showError("This function is not available in demo mode.");
                return _context.abrupt("return");
              case 3:
                if (_this19.name) {
                  _context.next = 6;
                  break;
                }
                _this19.showMessage("error", "Please enter the product name.");
                return _context.abrupt("return");
              case 6:
                if (_this19.textGenKey) {
                  _context.next = 9;
                  break;
                }
                _this19.showMessage("error", "Text generation API key is not configured");
                return _context.abrupt("return");
              case 9:
                prompt = _this19.useCustomPrompt && _this19.customPrompt.trim() ? "".concat(_this19.customPrompt, " for product: ").concat(_this19.name, ". Output raw HTML only, no explanatory text, no code blocks, no images.") : "Generate a detailed product description for ".concat(_this19.name, " formatted for TinyMCE editor.\n            Structure: Start with <strong>Product Overview</strong>, then multiple <p> paragraphs describing features and benefits.\n            Include <strong>Key Features</strong> with <ul><li> bullet points.\n            Add <strong>Benefits</strong> section with more <p> content.\n            Use <strong> for emphasis, <em> for highlights.\n            Important: no code blocks, no markdown syntax, no explanatory text.");
                _context.prev = 10;
                _this19.isGeneratingAI = true; // Start AI processing state
                _context.next = 14;
                return fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key=" + _this19.textGenKey, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json"
                  },
                  body: JSON.stringify({
                    contents: [{
                      parts: [{
                        text: prompt
                      }]
                    }]
                  })
                });
              case 14:
                response = _context.sent;
                _context.next = 17;
                return response.json();
              case 17:
                data = _context.sent;
                if (data !== null && data !== void 0 && (_data$candidates = data.candidates) !== null && _data$candidates !== void 0 && (_data$candidates$ = _data$candidates[0]) !== null && _data$candidates$ !== void 0 && (_data$candidates$$con = _data$candidates$.content) !== null && _data$candidates$$con !== void 0 && (_data$candidates$$con2 = _data$candidates$$con.parts) !== null && _data$candidates$$con2 !== void 0 && (_data$candidates$$con3 = _data$candidates$$con2[0]) !== null && _data$candidates$$con3 !== void 0 && _data$candidates$$con3.text) {
                  generatedText = data.candidates[0].content.parts[0].text;
                  _this19.description = generatedText;
                  if (_this19.defaultLanguageId && _this19.translations[_this19.defaultLanguageId]) {
                    _this19.$set(_this19.translations[_this19.defaultLanguageId], 'description', generatedText);
                  }
                } else {
                  _this19.showMessage("error", "Failed to generate description.");
                }
                _context.next = 24;
                break;
              case 21:
                _context.prev = 21;
                _context.t0 = _context["catch"](10);
                _this19.showMessage("error", "An error occurred while generating the description.");
              case 24:
                _context.prev = 24;
                _this19.isGeneratingAI = false; // Stop AI processing state
                return _context.finish(24);
              case 27:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[10, 21, 24, 27]]);
      }))();
    },
    createSlug: function createSlug() {
      if (this.name !== "") {
        this.slug = this.name.normalize("NFD") // Normalize Unicode
        .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
        .replace(/(?:(?![\t-\r \x2D0-9A-Za-z\xA0\xAA\xB2\xB3\xB5\xB9\xBA\xBC-\xBE\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0560-\u0588\u05D0-\u05EA\u05EF-\u05F2\u0620-\u064A\u0660-\u0669\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07C0-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u0870-\u0887\u0889-\u088E\u08A0-\u08C9\u0904-\u0939\u093D\u0950\u0958-\u0961\u0966-\u096F\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09E6-\u09F1\u09F4-\u09F9\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A66-\u0A6F\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AE6-\u0AEF\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B66-\u0B6F\u0B71-\u0B77\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0BE6-\u0BF2\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C5D\u0C60\u0C61\u0C66-\u0C6F\u0C78-\u0C7E\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDD\u0CDE\u0CE0\u0CE1\u0CE6-\u0CEF\u0CF1\u0CF2\u0D04-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D58-\u0D61\u0D66-\u0D78\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DE6-\u0DEF\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E86-\u0E8A\u0E8C-\u0EA3\u0EA5\u0EA7-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F20-\u0F33\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F-\u1049\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u1090-\u1099\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1369-\u137C\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u1711\u171F-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u17E0-\u17E9\u17F0-\u17F9\u1810-\u1819\u1820-\u1878\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19DA\u1A00-\u1A16\u1A20-\u1A54\u1A80-\u1A89\u1A90-\u1A99\u1AA7\u1B05-\u1B33\u1B45-\u1B4C\u1B50-\u1B59\u1B83-\u1BA0\u1BAE-\u1BE5\u1C00-\u1C23\u1C40-\u1C49\u1C4D-\u1C7D\u1C80-\u1C88\u1C90-\u1CBA\u1CBD-\u1CBF\u1CE9-\u1CEC\u1CEE-\u1CF3\u1CF5\u1CF6\u1CFA\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2000-\u200A\u2028\u2029\u202F\u205F\u2070\u2071\u2074-\u2079\u207F-\u2089\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2150-\u2189\u2460-\u249B\u24EA-\u24FF\u2776-\u2793\u2C00-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2CFD\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3000\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312F\u3131-\u318E\u3192-\u3195\u31A0-\u31BF\u31F0-\u31FF\u3220-\u3229\u3248-\u324F\u3251-\u325F\u3280-\u3289\u32B1-\u32BF\u3400-\u4DBF\u4E00-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7CA\uA7D0\uA7D1\uA7D3\uA7D5-\uA7D9\uA7F2-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA830-\uA835\uA840-\uA873\uA882-\uA8B3\uA8D0-\uA8D9\uA8F2-\uA8F7\uA8FB\uA8FD\uA8FE\uA900-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF-\uA9D9\uA9E0-\uA9E4\uA9E6-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA50-\uAA59\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB69\uAB70-\uABE2\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFEFF\uFF10-\uFF19\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD07-\uDD33\uDD40-\uDD78\uDD8A\uDD8B\uDE80-\uDE9C\uDEA0-\uDED0\uDEE1-\uDEFB\uDF00-\uDF23\uDF2D-\uDF4A\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCA0-\uDCA9\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDD70-\uDD7A\uDD7C-\uDD8A\uDD8C-\uDD92\uDD94\uDD95\uDD97-\uDDA1\uDDA3-\uDDB1\uDDB3-\uDDB9\uDDBB\uDDBC\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67\uDF80-\uDF85\uDF87-\uDFB0\uDFB2-\uDFBA]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC58-\uDC76\uDC79-\uDC9E\uDCA7-\uDCAF\uDCE0-\uDCF2\uDCF4\uDCF5\uDCFB-\uDD1B\uDD20-\uDD39\uDD80-\uDDB7\uDDBC-\uDDCF\uDDD2-\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE35\uDE40-\uDE48\uDE60-\uDE7E\uDE80-\uDE9F\uDEC0-\uDEC7\uDEC9-\uDEE4\uDEEB-\uDEEF\uDF00-\uDF35\uDF40-\uDF55\uDF58-\uDF72\uDF78-\uDF91\uDFA9-\uDFAF]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2\uDCFA-\uDD23\uDD30-\uDD39\uDE60-\uDE7E\uDE80-\uDEA9\uDEB0\uDEB1\uDF00-\uDF27\uDF30-\uDF45\uDF51-\uDF54\uDF70-\uDF81\uDFB0-\uDFCB\uDFE0-\uDFF6]|\uD804[\uDC03-\uDC37\uDC52-\uDC6F\uDC71\uDC72\uDC75\uDC83-\uDCAF\uDCD0-\uDCE8\uDCF0-\uDCF9\uDD03-\uDD26\uDD36-\uDD3F\uDD44\uDD47\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDD0-\uDDDA\uDDDC\uDDE1-\uDDF4\uDE00-\uDE11\uDE13-\uDE2B\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDEF0-\uDEF9\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC50-\uDC59\uDC5F-\uDC61\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDCD0-\uDCD9\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE50-\uDE59\uDE80-\uDEAA\uDEB8\uDEC0-\uDEC9\uDF00-\uDF1A\uDF30-\uDF3B\uDF40-\uDF46]|\uD806[\uDC00-\uDC2B\uDCA0-\uDCF2\uDCFF-\uDD06\uDD09\uDD0C-\uDD13\uDD15\uDD16\uDD18-\uDD2F\uDD3F\uDD41\uDD50-\uDD59\uDDA0-\uDDA7\uDDAA-\uDDD0\uDDE1\uDDE3\uDE00\uDE0B-\uDE32\uDE3A\uDE50\uDE5C-\uDE89\uDE9D\uDEB0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC50-\uDC6C\uDC72-\uDC8F\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD30\uDD46\uDD50-\uDD59\uDD60-\uDD65\uDD67\uDD68\uDD6A-\uDD89\uDD98\uDDA0-\uDDA9\uDEE0-\uDEF2\uDFB0\uDFC0-\uDFD4]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|\uD80B[\uDF90-\uDFF0]|[\uD80C\uD81C-\uD820\uD822\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879\uD880-\uD883][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE60-\uDE69\uDE70-\uDEBE\uDEC0-\uDEC9\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF50-\uDF59\uDF5B-\uDF61\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDE40-\uDE96\uDF00-\uDF4A\uDF50\uDF93-\uDF9F\uDFE0\uDFE1\uDFE3]|\uD821[\uDC00-\uDFF7]|\uD823[\uDC00-\uDCD5\uDD00-\uDD08]|\uD82B[\uDFF0-\uDFF3\uDFF5-\uDFFB\uDFFD\uDFFE]|\uD82C[\uDC00-\uDD22\uDD50-\uDD52\uDD64-\uDD67\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD834[\uDEE0-\uDEF3\uDF60-\uDF78]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB\uDFCE-\uDFFF]|\uD837[\uDF00-\uDF1E]|\uD838[\uDD00-\uDD2C\uDD37-\uDD3D\uDD40-\uDD49\uDD4E\uDE90-\uDEAD\uDEC0-\uDEEB\uDEF0-\uDEF9]|\uD839[\uDFE0-\uDFE6\uDFE8-\uDFEB\uDFED\uDFEE\uDFF0-\uDFFE]|\uD83A[\uDC00-\uDCC4\uDCC7-\uDCCF\uDD00-\uDD43\uDD4B\uDD50-\uDD59]|\uD83B[\uDC71-\uDCAB\uDCAD-\uDCAF\uDCB1-\uDCB4\uDD01-\uDD2D\uDD2F-\uDD3D\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD83C[\uDD00-\uDD0C]|\uD83E[\uDFF0-\uDFF9]|\uD869[\uDC00-\uDEDF\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF38\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]|\uD884[\uDC00-\uDF4A])[\s\S])/g, '') // Keep letters, numbers, spaces, and hyphens (any language)
        .trim().replace(/\s+/g, '-') // Replace spaces with '-'
        .toLowerCase();
      } else {
        this.slug = "";
      }
    },
    fetchTags: function fetchTags(query) {
      var _this20 = this;
      if (query.length > 1) {
        axios__WEBPACK_IMPORTED_MODULE_1___default().get(this.$apiUrl + '/products/tags', {
          params: {
            search: query
          }
        }).then(function (response) {
          _this20.tagSuggestions = response.data;
        })["catch"](function (error) {
          console.error(error);
        });
      }
    },
    isAttributeValueChecked: function isAttributeValueChecked(attributeId, valueId) {
      return (this.selectedAttributeValues[attributeId] || []).includes(valueId);
    },
    toggleAttributeValueChecked: function toggleAttributeValueChecked(attributeId, valueId) {
      var _this21 = this;
      var current = (this.selectedAttributeValues[attributeId] || []).slice();
      var idx = current.indexOf(valueId);
      var isUnchecking = idx !== -1;
      if (isUnchecking) {
        // Any row that already has a real id (i.e. saved to the DB) and whose combo uses
        // the value being unchecked will disappear from the matrix once we resync - and
        // per the update() cleanup, disappearing here means it gets DELETED on save. Warn
        // before that becomes irreversible instead of silently dropping saved data.
        var affected = this.inputs.filter(function (input) {
          if (!input.id) return false;
          var ids = input.combo_value_ids && input.combo_value_ids.length ? input.combo_value_ids : [input.attribute_value_id];
          return ids.includes(valueId);
        });
        if (affected.length) {
          this.$swal.fire({
            title: __('are_you_sure'),
            text: __('this_will_delete_the_following_saved_variants') + ': ' + affected.map(function (a) {
              return a.label || a.name;
            }).join(', '),
            confirmButtonText: __('yes_sure'),
            cancelButtonText: __('cancel'),
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#37a279',
            cancelButtonColor: '#d33'
          }).then(function (result) {
            if (result.value) {
              _this21.applyAttributeValueToggle(attributeId, valueId, current, idx);
            } else {
              // Cancel: selectedAttributeValues stays untouched, but the button
              // checkbox already flipped visually on the native click - force it to
              // remount so it re-reads the real (still-checked) state.
              var key = attributeId + '_' + valueId;
              _this21.$set(_this21.checkboxRenderKey, key, (_this21.checkboxRenderKey[key] || 0) + 1);
            }
          });
          return;
        }
      }
      this.applyAttributeValueToggle(attributeId, valueId, current, idx);
    },
    applyAttributeValueToggle: function applyAttributeValueToggle(attributeId, valueId, current, idx) {
      if (idx === -1) current.push(valueId);else current.splice(idx, 1);
      this.$set(this.selectedAttributeValues, attributeId, current);
      // Legacy rows (saved before the attribute system - no attribute_value_id) aren't part
      // of the combo matrix at all, so they'd otherwise be silently dropped by the full
      // rebuild below. Carry them through untouched on every toggle.
      var legacyRows = this.inputs.filter(function (input) {
        return !input.attribute_value_id && input.id;
      });
      this.syncVariantsFromSelection(legacyRows);
    },
    /* Cartesian product of every checked value across attributes. Existing rows whose combo
       already matches are kept (preserving saved id/price/stock/images), but their label and
       combo_value_ids are always refreshed from the current selection so a row can never keep
       a stale/incorrect label across future syncs; new combos get blank rows. Runs automatically
       on every checkbox toggle - no combos selected just clears back to blank (plus any legacyRows
       passed in, which are always preserved as-is since they aren't part of the matrix). */
    syncVariantsFromSelection: function syncVariantsFromSelection(legacyRows) {
      var _this22 = this;
      legacyRows = legacyRows || [];
      var combos = this.selectedAttributeCombos;
      if (combos.length === 0) {
        this.inputs = legacyRows.length ? legacyRows.slice() : [{
          'name': '',
          'packet_status': '',
          'attribute_value_id': ''
        }];
        this.activeVariantIndex = 0;
        return;
      }
      var rows = [{
        valueIds: [],
        labels: []
      }];
      combos.forEach(function (entry) {
        var next = [];
        rows.forEach(function (row) {
          entry.values.forEach(function (value) {
            next.push({
              valueIds: [].concat(_toConsumableArray(row.valueIds), [value.id]),
              labels: [].concat(_toConsumableArray(row.labels), [value.value])
            });
          });
        });
        rows = next;
      });
      var existingByKey = {};
      this.inputs.forEach(function (input) {
        if (!input.attribute_value_id) return;
        var key = _this22.comboKey(input.combo_value_ids && input.combo_value_ids.length ? input.combo_value_ids : [input.attribute_value_id]);
        existingByKey[key] = input;
      });
      this.inputs = rows.map(function (row) {
        var key = _this22.comboKey(row.valueIds);
        var existing = existingByKey[key];
        if (existing) {
          // Reuse the saved id/price/stock/status/images, but always refresh the label
          // and combo_value_ids from the freshly computed combo - otherwise a row whose
          // label was ever wrong (e.g. loaded from an incomplete attribute_values
          // relation) would stay wrong forever across every future sync.
          existing.attribute_value_id = row.valueIds[0];
          existing.combo_value_ids = row.valueIds;
          existing.label = row.labels.join(' / ');
          return existing;
        }
        return {
          name: '',
          attribute_value_id: row.valueIds[0],
          combo_value_ids: row.valueIds,
          label: row.labels.join(' / '),
          packet_price: '',
          packet_purchase_price: '',
          discounted_price: '',
          packet_stock: '',
          packet_status: '',
          images: []
        };
      }).concat(legacyRows);
      if (this.activeVariantIndex >= this.inputs.length) this.activeVariantIndex = 0;
    },
    /* Button shortcut: check every value of every attribute, then generate the full matrix. */generateAllVariants: function generateAllVariants() {
      var _this23 = this;
      if (this.attributeOptions.length === 0) {
        this.showError(__('please_select_category_first'));
        return;
      }
      this.attributeOptions.forEach(function (attribute) {
        _this23.$set(_this23.selectedAttributeValues, attribute.id, (attribute.values || []).map(function (v) {
          return v.id;
        }));
      });
      var legacyRows = this.inputs.filter(function (input) {
        return !input.attribute_value_id && input.id;
      });
      this.syncVariantsFromSelection(legacyRows);
    },
    selectVariant: function selectVariant(index) {
      this.activeVariantIndex = index;
    },
    // Repairs a legacy variant row (saved before the attribute system, no attribute_value_id)
    // by assigning it one of the current category's attribute values.
    assignLegacyAttributeValue: function assignLegacyAttributeValue(index, valueId) {
      if (!valueId) return;
      var label = '';
      var _iterator2 = _createForOfIteratorHelper(this.attributeOptions),
        _step2;
      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var attribute = _step2.value;
          var found = (attribute.values || []).find(function (v) {
            return String(v.id) === String(valueId);
          });
          if (found) {
            label = found.value + (found.short_code ? ' (' + found.short_code + ')' : '');
            break;
          }
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
      var input = this.inputs[index];
      input.attribute_value_id = valueId;
      input.combo_value_ids = [valueId];
      input.label = label;
      this.$set(this.inputs, index, _objectSpread({}, input));
    },
    remove: function remove(index) {
      var _this24 = this;
      var variant_id = this.inputs[index].id ? this.inputs[index].id : "";
      if (this.id && variant_id !== "") {
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
            var postData = {
              id: variant_id
            };
            axios__WEBPACK_IMPORTED_MODULE_1___default().post(_this24.$apiUrl + '/products/delete', postData).then(function (response) {
              var data = response.data;
              if (data.status === false || data.status === 0) {
                // Backend refused (e.g. variant is tied to past orders) - the
                // row was never touched, so keep showing the chip instead of
                // splicing it out and reporting a false "removed" success.
                _this24.showError(data.message);
                return;
              }
              _this24.inputs.splice(index, 1);
              if (data.data && data.data.product_deleted) {
                _this24.$swal.fire({
                  title: __('product_deleted'),
                  text: __('this_was_the_last_variant_the_product_has_been_deleted_please_add_it_as_a_new_product'),
                  icon: 'warning',
                  confirmButtonText: __('ok'),
                  confirmButtonColor: '#37a279'
                }).then(function () {
                  var _this24$loggedUser, _this24$loggedUser$ro;
                  _this24.$router.push({
                    path: ((_this24$loggedUser = _this24.loggedUser) === null || _this24$loggedUser === void 0 ? void 0 : (_this24$loggedUser$ro = _this24$loggedUser.role) === null || _this24$loggedUser$ro === void 0 ? void 0 : _this24$loggedUser$ro.name) === "Seller" ? '/seller/manage_products' : '/manage_products'
                  });
                });
                return;
              }
              _this24.showSuccess(data.message);
              if (_this24.activeVariantIndex >= _this24.inputs.length) _this24.activeVariantIndex = Math.max(0, _this24.inputs.length - 1);
            });
          }
        });
      } else {
        this.inputs.splice(index, 1);
        if (this.activeVariantIndex >= this.inputs.length) this.activeVariantIndex = Math.max(0, this.inputs.length - 1);
      }
    },
    dropFile: function dropFile(event) {
      event.preventDefault();
      // Safely access file_image ref (can be array in v-for)
      var fileInput = Array.isArray(this.$refs.file_image) ? this.$refs.file_image[0] : this.$refs.file_image;
      if (fileInput) {
        fileInput.files = event.dataTransfer.files;
        this.fileImage(); // Trigger the onChange event manually
      }
      // Clean up
      event.currentTarget.classList.add('bg-gray-100');
      event.currentTarget.classList.remove('bg-green-300');
    },
    fileImage: function fileImage() {
      // Safely access file_image ref (can be array in v-for)
      var fileInput = Array.isArray(this.$refs.file_image) ? this.$refs.file_image[0] : this.$refs.file_image;
      if (!fileInput) return;
      var file = fileInput.files[0];

      // Reset previous error message
      this.mainImageerror = null;

      // Check if a file was selected
      if (!file) return;

      // Perform image validation
      var validTypes = ["image/jpeg", "image/png", "image/jpg", "image/gif", "image/webp"];
      if (!validTypes.includes(file.type)) {
        this.mainImageerror = "Invalid file type. Please upload a JPEG, PNG, JPG,  GIF or WEBP image.";
        this.main_image_path = "";
        this.main_image_name = "";
        return;
      }
      var maxSize = 2 * 1024 * 1024; // 2MB
      if (file.size > maxSize) {
        this.mainImageerror = "File size exceeds the maximum allowed limit (2MB).";
        this.main_image_path = "";
        this.main_image_name = "";
        return;
      }

      // Create a URL for the uploaded image and display it
      this.imageUrl = URL.createObjectURL(file);
      this.image = fileInput.files[0];
      this.main_image_path = URL.createObjectURL(this.image);
      this.main_image_name = this.image.name;
    },
    dropFileOtherImage: function dropFileOtherImage(event) {
      event.preventDefault();
      // Safely access file_other_images ref (can be array in v-for)
      var fileInput = Array.isArray(this.$refs.file_other_images) ? this.$refs.file_other_images[0] : this.$refs.file_other_images;
      if (fileInput) {
        fileInput.files = event.dataTransfer.files;
        this.otherImage(); // Trigger the onChange event manually
      }
      // Clean up
      event.currentTarget.classList.add('bg-gray-100');
      event.currentTarget.classList.remove('bg-green-300');
    },
    removeOtherImage: function removeOtherImage(index) {
      this.images.splice(index, 1);
    },
    otherImage: function otherImage() {
      // Safely access file_other_images ref (can be array in v-for)
      var fileInput = Array.isArray(this.$refs.file_other_images) ? this.$refs.file_other_images[0] : this.$refs.file_other_images;
      if (!fileInput) return;
      var files = fileInput.files;
      for (var i = 0; i < files.length; i++) {
        var file = files[i];

        // Check if the file is an image (you can extend the list of allowed file types)
        if (!file.type.startsWith('image/')) {
          this.otherImageerror = "Invalid file type. Please upload a JPEG, PNG, JPG,  GIF or WEBP image.";
          continue;
        }
        var image = {};
        image.url = URL.createObjectURL(file);
        image.name = file.name;
        image.file = file; // Store the actual file object
        this.images.push(image);
      }

      // Native file inputs replace the whole selection on every dialog open, so picking
      // images one at a time would wipe the previous pick. Sync the merged set back into
      // the input via DataTransfer, so the submit code (which reads fileInput.files) sees
      // every picked file.
      var dataTransfer = new DataTransfer();
      this.images.forEach(function (item) {
        return dataTransfer.items.add(item.file);
      });
      fileInput.files = dataTransfer.files;
    },
    /* Keeps the native file input's FileList in sync with variantFiles[index] (order and
       membership), so the submit code (which still reads packetInput.files) always sees
       exactly what's shown in the reorderable preview. */
    syncVariantFilesInput: function syncVariantFilesInput(index) {
      var inputEl = this.$refs['packet_variant_images_' + index][0];
      var dataTransfer = new DataTransfer();
      this.variantFiles[index].forEach(function (item) {
        return dataTransfer.items.add(item.file);
      });
      inputEl.files = dataTransfer.files;
    },
    reorderVariantFiles: function reorderVariantFiles(index) {
      this.syncVariantFilesInput(index);
    },
    removeVariantFile: function removeVariantFile(index, itemIndex) {
      this.variantFiles[index].splice(itemIndex, 1);
      this.syncVariantFilesInput(index);
    },
    /* Native file inputs replace the whole selection on every dialog open, so picking
       images one at a time would wipe the previous pick. Accumulate picked files across
       opens here and push the merged set back into the input via DataTransfer, so the
       submit code (which still reads packetInput.files) sees every picked file. */
    variantImagesChanges: function variantImagesChanges(index) {
      var inputEl = this.$refs['packet_variant_images_' + index][0];
      var validExtensions = ['jpg', 'jpeg', 'png', 'gif'];
      var maxSizeInBytes = 5 * 1024 * 1024;
      if (!this.variantFiles[index]) this.$set(this.variantFiles, index, []);
      var accumulated = this.variantFiles[index];
      this.variantImageerror = '';
      for (var i = 0; i < inputEl.files.length; i++) {
        var file = inputEl.files[i];
        var extension = file.name.split('.').pop().toLowerCase();
        if (!validExtensions.includes(extension)) {
          this.variantImageerror = "Invalid file type. Please upload a JPEG, PNG, JPG,  GIF or WEBP image.";
          return;
        }
        if (file.size > maxSizeInBytes) {
          this.variantImageerror = "File size exceeds the limit of 5 MB.";
          return;
        }
        accumulated.push({
          file: file,
          url: URL.createObjectURL(file),
          name: file.name
        });
      }
      this.syncVariantFilesInput(index);
      vue__WEBPACK_IMPORTED_MODULE_8__["default"].set(this.variantFiles, index, accumulated);
    },
    getSellerCategories: function getSellerCategories() {
      var _this25 = this;
      var selectPlaceholder = '<option value="">' + __('select_category') + '</option>';
      // When no seller selected, show only placeholder and clear selection
      if (!this.seller_id || this.seller_id === 0 || this.seller_id === '') {
        this.categoryOptions = selectPlaceholder;
        this.category_id = '';
        return;
      }
      this.isLoading = true;
      axios__WEBPACK_IMPORTED_MODULE_1___default().get(this.$apiUrl + '/categories/seller_categories', {
        params: {
          seller_id: this.seller_id
        }
      }).then(function (response) {
        _this25.isLoading = false;
        var data = response.data;
        var optionsHtml = '';
        if (typeof data === 'string') {
          optionsHtml = data;
        } else if (data && typeof data.data === 'string') {
          optionsHtml = data.data;
        }
        _this25.categoryOptions = selectPlaceholder + optionsHtml;
      })["catch"](function (error) {
        _this25.isLoading = false;
        _this25.categoryOptions = selectPlaceholder;
      });
    },
    getSeller: function getSeller() {
      var _this26 = this;
      if (this.seller_id !== 0 && this.seller_id !== "" && !this.id) {
        this.isLoading = true;
        var param = {
          "seller_id": this.seller_id
        };
        axios__WEBPACK_IMPORTED_MODULE_1___default().get(this.$apiUrl + '/sellers/edit/' + this.seller_id, {
          params: param
        }).then(function (response) {
          _this26.isLoading = false, _this26.require_products_approval = response.data.data.require_products_approval;
          _this26.is_approved = _this26.require_products_approval == 0 ? 1 : 0;
        });
      }
    },
    getCategories: function getCategories() {
      var _this27 = this;
      this.isLoading = true;
      axios__WEBPACK_IMPORTED_MODULE_1___default().get(this.$apiUrl + '/categories/options').then(function (response) {
        _this27.isLoading = false;
        var data = response.data;
        var placeholder = '<option value="">' + __('select_category') + '</option>';
        if (typeof data === 'string') {
          _this27.categoryOptions = placeholder + data;
        } else if (data.data && typeof data.data === 'string') {
          _this27.categoryOptions = placeholder + data.data;
        } else {
          _this27.categoryOptions = placeholder;
        }
      })["catch"](function (error) {
        _this27.isLoading = false;
      });
    },
    getSellers: function getSellers() {
      var _this28 = this;
      this.isLoading = true;
      axios__WEBPACK_IMPORTED_MODULE_1___default().get(this.$apiUrl + '/sellers', {
        params: {
          filterStatus: 1
        }
      }).then(function (response) {
        _this28.isLoading = false;
        var data = response.data;
        _this28.sellers = data.data;
      });
    },
    getTaxes: function getTaxes() {
      var _this29 = this;
      this.isLoading = true;
      axios__WEBPACK_IMPORTED_MODULE_1___default().get(this.$apiUrl + '/products/taxes').then(function (response) {
        _this29.isLoading = false;
        var data = response.data;
        _this29.taxes = data.data;
      });
    },
    /* Variant values come strictly from the attributes assigned to the selected category.
       A category with none assigned shows none - no fallback to the full attribute list. */
    loadAttributes: function loadAttributes() {
      var _this30 = this;
      if (!this.category_id) {
        this.attributeOptions = [];
        return Promise.resolve();
      }
      this.isLoadingAttributes = true;
      return axios__WEBPACK_IMPORTED_MODULE_1___default().get(this.$apiUrl + '/products/attributes/get', {
        params: {
          category_id: this.category_id
        }
      }).then(function (response) {
        _this30.attributeOptions = response.data.data || [];
      })["catch"](function () {
        _this30.attributeOptions = [];
      })["finally"](function () {
        _this30.isLoadingAttributes = false;
      });
    },
    getBrands: function getBrands() {
      var _this31 = this;
      this.isLoading = true;
      axios__WEBPACK_IMPORTED_MODULE_1___default().get(this.$apiUrl + '/products/brands/get').then(function (response) {
        _this31.isLoading = false;
        var data = response.data;
        _this31.brands = data.data;
        if (_this31.cachedData && _this31.cachedData.brand) {
          var foundBrand = _this31.brands.find(function (b) {
            return b.id === _this31.cachedData.brand.id;
          }) || null;
          // Update brand with translated name
          _this31.$nextTick(function () {
            if (foundBrand && _this31.translatedBrands && _this31.translatedBrands.length > 0) {
              var translatedBrand = _this31.translatedBrands.find(function (b) {
                return b.id === foundBrand.id;
              });
              if (translatedBrand) {
                _this31.brand = _objectSpread(_objectSpread({}, foundBrand), {}, {
                  name: translatedBrand.name,
                  title: translatedBrand.title
                });
              } else {
                _this31.brand = foundBrand;
              }
            } else {
              _this31.brand = foundBrand;
            }
          });
        }
      });
    },
    getCountries: function getCountries() {
      var _this32 = this;
      this.isLoading = true;
      axios__WEBPACK_IMPORTED_MODULE_1___default().get(this.$apiUrl + '/countries/active').then(function (response) {
        _this32.isLoading = false;
        var data = response.data;
        _this32.countries = data.data;
        if (_this32.cachedData && _this32.cachedData.made_in) {
          _this32.made_in = _this32.countries.find(function (c) {
            return c.id === _this32.cachedData.made_in.id;
          }) || null;
        }
      });
    },
    getTags: function getTags() {
      var _this33 = this;
      this.isLoading = true;
      axios__WEBPACK_IMPORTED_MODULE_1___default().get(this.$apiUrl + '/products/tags').then(function (response) {
        _this33.isLoading = false;
        var data = response.data;
        _this33.tags = data.data;

        // After tags are loaded, convert tag names to IDs for Select2 (if translations are already loaded)
        if (_this33.id && _this33.languages.length > 0) {
          _this33.$nextTick(function () {
            _this33.convertTagNamesToIds();
          });
        }
      });
    },
    getAddonGroups: function getAddonGroups() {
      var _this34 = this;
      var url = this.isSellerRole ? '/seller/addons' : '/products/addons';
      axios__WEBPACK_IMPORTED_MODULE_1___default().get(this.$apiUrl + url, {
        params: {
          per_page: 100
        }
      }).then(function (response) {
        _this34.addonGroupOptions = response.data.data || [];
        _this34.applySelectedAddonGroups();
      });
    },
    applySelectedAddonGroups: function applySelectedAddonGroups() {
      if (!this.record || !this.record.addon_groups || !this.addonGroupOptions.length) {
        return;
      }
      var selectedIds = this.record.addon_groups.map(function (g) {
        return g.id;
      });
      this.selectedAddonGroups = this.addonGroupOptions.filter(function (g) {
        return selectedIds.includes(g.id);
      });
    },
    /**
     * Status label for dropdown. API returns status_name as object by lang code { en: "...", hi: "..." }.
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
      var _this35 = this;
      this.isLoading = true;
      axios__WEBPACK_IMPORTED_MODULE_1___default().get(this.$apiUrl + '/order_statuses').then(function (response) {
        _this35.isLoading = false;
        var data = response.data;
        var statusesToRemoveIds = [6, 7, 8];
        _this35.order_status = data.data.filter(function (status) {
          return !statusesToRemoveIds.includes(status.id);
        });
      });
    },
    getTextGenKey: function getTextGenKey() {
      var _this36 = this;
      // Get the text generation API key from store settings
      axios__WEBPACK_IMPORTED_MODULE_1___default().get(this.$apiUrl + '/store_settings').then(function (response) {
        var data = response.data.data;
        if (data.store_settings) {
          data.store_settings.forEach(function (item) {
            if (item.variable === 'text_gen_key') {
              _this36.textGenKey = item.value;
            }
          });
        }
      })["catch"](function (error) {
        console.error('Error fetching text generation key:', error);
      });
    },
    validateBarcode: function validateBarcode() {
      var barcodePattern = /^[A-Za-z0-9-]+$/;
      if (barcodePattern.test(this.barcode)) {
        this.validationBarcodeMessage = '';
        this.isBarcodeValid = true;
      } else {
        this.validationBarcodeMessage = 'Invalid Barcode Number.';
        this.isBarcodeValid = false;
      }
    },
    validateDiscountedPrice: function validateDiscountedPrice(input) {
      var discountedPrice = parseFloat(input.discounted_price);
      var actualPrice = parseFloat(input.packet_price);
      if (discountedPrice >= actualPrice) {
        input.validationErrorDiscountedPrice = "Discounted Price must be less than Actual Price";
        input.discounted_price = null;
      } else {
        input.validationErrorDiscountedPrice = null;
      }
    },
    validateDiscountedPriceLoose: function validateDiscountedPriceLoose(input) {
      var discountedPrice = parseFloat(input.loose_discounted_price);
      var actualPrice = parseFloat(input.loose_price);
      if (discountedPrice >= actualPrice) {
        input.validationErrorDiscountedPriceLoose = "Discounted Price must be less than Actual Price";
        input.loose_discounted_price = null;
      } else {
        input.validationErrorDiscountedPriceLoose = null;
      }
    },
    /* Every variant must be backed by an attribute value, and no value may be used twice. */comboKey: function comboKey(ids) {
      return (ids || []).slice().sort(function (a, b) {
        return Number(a) - Number(b);
      }).join('-');
    },
    validateVariantAttributeValues: function validateVariantAttributeValues() {
      var seen = [];
      console.log('[variant-debug] inputs', this.inputs.map(function (inp) {
        return {
          label: inp.label,
          attribute_value_id: inp.attribute_value_id,
          combo_value_ids: inp.combo_value_ids
        };
      }));
      for (var i = 0; i < this.inputs.length; i++) {
        var valueId = this.inputs[i].attribute_value_id;
        if (!valueId) {
          this.showError(__('please_select_attribute_value_for_variant') + ' ' + (i + 1));
          return false;
        }
        var comboIds = this.inputs[i].combo_value_ids && this.inputs[i].combo_value_ids.length ? this.inputs[i].combo_value_ids : [valueId];
        var key = this.comboKey(comboIds);
        console.log('[variant-debug] variant', i, 'key', key, 'comboIds', comboIds);
        if (seen.indexOf(key) !== -1) {
          console.log('[variant-debug] DUPLICATE at index', i, 'matches earlier key', key);
          this.showError(__('variations_are_duplicate'));
          return false;
        }
        seen.push(key);
      }
      return true;
    },
    getProduct: function getProduct() {
      var _this37 = this;
      this.isLoading = true;
      axios__WEBPACK_IMPORTED_MODULE_1___default().get(this.$apiUrl + '/products/edit/' + this.id).then(function (response) {
        var data = response.data;
        if (data.status === 1) {
          _this37.record = data.data;

          // Custom field values
          _this37.customFieldExistingValues = !_this37.clone && _this37.record.custom_field_values ? _this37.record.custom_field_values : {};
          _this37.applyCustomFieldValues();
          _this37.name = _this37.record.name;
          _this37.slug = _this37.record.slug;
          _this37.barcode = _this37.record.barcode;
          if (_this37.clone) {
            _this37.name = '';
            _this37.slug = '';
            _this37.barcode = '';
          }
          _this37.seller_id = _this37.record.seller_id;
          _this37.getSellerCategories();
          _this37.getSeller();
          _this37.tag_ids = _this37.record.tags.map(function (item) {
            return item.id;
          });
          _this37.applySelectedAddonGroups();
          _this37.tax_id = _this37.record.tax_id;
          var foundBrand = _this37.brands.find(function (item) {
            return item.id === _this37.record.brand_id;
          });
          // Update brand with translated name after brands are loaded
          _this37.$nextTick(function () {
            if (foundBrand && _this37.translatedBrands && _this37.translatedBrands.length > 0) {
              var translatedBrand = _this37.translatedBrands.find(function (b) {
                return b.id === foundBrand.id;
              });
              if (translatedBrand) {
                _this37.brand = _objectSpread(_objectSpread({}, foundBrand), {}, {
                  name: translatedBrand.name,
                  title: translatedBrand.title
                });
              } else {
                _this37.brand = foundBrand;
              }
            } else {
              _this37.brand = foundBrand;
            }
          });

          /* The stored type is always packet/loose (the legacy stock semantics); the form
             itself is always attribute-driven. */
          _this37.suppressCategoryWatch = true;
          _this37.category_id = _this37.record.category_id;
          _this37.$nextTick(function () {
            _this37.suppressCategoryWatch = false;
          });
          var attributesLoaded = _this37.loadAttributes();
          _this37.manufacturer = _this37.record.manufacturer != null && _this37.record.manufacturer !== "null" ? _this37.record.manufacturer : "";

          // Load translations
          _this37.loadTranslations();
          _this37.made_in = _this37.countries.find(function (item) {
            return item.id == _this37.record.made_in;
          });
          _this37.tax_included_in_price = _this37.record.tax_included_in_price;
          _this37.return_status = _this37.record.return_status;
          _this37.return_days = _this37.record.return_days;
          _this37.cancelable_status = _this37.record.cancelable_status;
          _this37.till_status = _this37.record.till_status;
          _this37.cod_allowed_status = _this37.record.cod_allowed;
          _this37.require_prescription = _this37.record.require_prescription || 0;
          _this37.max_allowed_quantity = _this37.record.total_allowed_quantity;
          _this37.description = _this37.record.description;
          _this37.is_approved = _this37.record.is_approved;
          _this37.status = _this37.record.status;
          _this37.is_unlimited_stock = _this37.record.is_unlimited_stock;
          _this37.main_image_path = _this37.record.image ? _this37.$storageUrl + _this37.record.image : "";
          _this37.other_images = _this37.record.images;
          _this37.image = _this37.record.image;
          /* image_mode isn't persisted on the product itself - infer it from what
             was actually saved: no main image but variants carry images means it
             was saved as variant-wise. */
          var anyVariantHasImages = (_this37.record.variants || []).some(function (v) {
            return v.images && v.images.length > 0;
          });
          _this37.image_mode = !_this37.record.image && anyVariantHasImages ? 'variant' : 'global';
          _this37.meta_title = _this37.record.meta_title;
          _this37.meta_keywords = _this37.record.meta_keywords;
          _this37.schema_markup = _this37.record.schema_markup;
          _this37.meta_description = _this37.record.meta_description;

          // Set default language translation from main record
          if (_this37.defaultLanguageId && _this37.translations[_this37.defaultLanguageId]) {
            _this37.translations[_this37.defaultLanguageId].name = _this37.name;
            // Convert tag_ids to tag names for translation
            if (Array.isArray(_this37.tag_ids) && _this37.tag_ids.length > 0) {
              var tagNames = _this37.tag_ids.map(function (tagId) {
                var tag = _this37.tags.find(function (t) {
                  return t.id == tagId;
                });
                return tag ? tag.name : tagId;
              });
              _this37.translations[_this37.defaultLanguageId].tags = tagNames.join(',');
            } else {
              _this37.translations[_this37.defaultLanguageId].tags = '';
            }
            _this37.translations[_this37.defaultLanguageId].manufacturer = _this37.manufacturer;
            _this37.translations[_this37.defaultLanguageId].description = _this37.description;
            _this37.translations[_this37.defaultLanguageId].meta_title = _this37.meta_title;
            _this37.translations[_this37.defaultLanguageId].meta_keywords = _this37.meta_keywords;
            _this37.translations[_this37.defaultLanguageId].schema_markup = _this37.schema_markup;
            _this37.translations[_this37.defaultLanguageId].meta_description = _this37.meta_description;
          }
          var vm = _this37;
          _this37.selectedAttributeValues = {};
          // Rows backed by a real attribute value go through the same cartesian/merge
          // reconciliation as the checkbox picker (see syncVariantsFromSelection) once
          // attributeOptions has loaded, below - this is what stops a stray/incomplete
          // saved variant (e.g. one whose combo no longer matches every checked
          // attribute) from resurfacing as an orphan tab on every reload. Legacy rows
          // (saved before the attribute system - no attribute_value_id) aren't part of
          // the matrix and are always preserved as-is.
          var loadedRows = [];
          var legacyRows = [];
          _this37.record.variants.forEach(function (item) {
            var _item$attribute_value;
            // attribute_values[] is meant to be a superset that always includes the
            // primary attribute_value_id alongside any secondary combo values (see
            // syncVariantComboAttributeValues on the backend) - but don't rely on that
            // blindly for the label/checkbox state, since legacy/bulk-edited rows can
            // have an incomplete relation.
            var allValues = item.attribute_values || [];
            var comboValueIds = [item.attribute_value_id].concat(_toConsumableArray(allValues.map(function (v) {
              return v.id;
            }))).filter(function (id, idx, arr) {
              return id && arr.indexOf(id) === idx;
            });
            var labels = allValues.map(function (v) {
              return v.value;
            });

            // Pre-check the matching attribute value checkboxes so the picker reflects saved combos.
            var checkValue = function checkValue(attributeId, valueId) {
              if (!attributeId || !valueId) return;
              var current = vm.selectedAttributeValues[attributeId] || [];
              if (!current.includes(valueId)) current.push(valueId);
              vm.$set(vm.selectedAttributeValues, attributeId, current);
            };
            allValues.forEach(function (v) {
              return checkValue(v.attribute_id, v.id);
            });
            var row = {
              'id': item.id ? item.id : "",
              'attribute_value_id': (_item$attribute_value = item.attribute_value_id) !== null && _item$attribute_value !== void 0 ? _item$attribute_value : "",
              'combo_value_ids': comboValueIds,
              'label': labels.join(' / '),
              'packet_price': item.price,
              'packet_purchase_price': item.purchase_price,
              'discounted_price': item.discounted_price,
              'packet_stock': item.stock,
              'packet_status': item.status,
              'images': item.images || []
            };
            if (item.attribute_value_id) {
              loadedRows.push(row);
            } else {
              legacyRows.push(row);
            }
          });
          Promise.resolve(attributesLoaded).then(function () {
            if (vm.attributeOptions.length > 0) {
              // Reconcile through the same key-based merge as the checkbox picker so
              // this.inputs never diverges from the checked attribute values - any
              // loaded row that isn't a full, valid combo across every currently
              // checked attribute would normally be dropped here.
              vm.inputs = loadedRows;
              vm.syncVariantsFromSelection(legacyRows);

              // A dropped row isn't just hidden - since it also never gets submitted
              // on save, the backend's delete-orphans sync (ProductApisController::
              // update) would silently delete it from the database with zero warning
              // to the seller. Keep it visible instead (flagged), so it's included on
              // save and the seller can see/fix/delete it deliberately.
              var survivingIds = new Set(vm.inputs.filter(function (i) {
                return i.id;
              }).map(function (i) {
                return i.id;
              }));
              var droppedRows = loadedRows.filter(function (row) {
                return row.id && !survivingIds.has(row.id);
              });
              if (droppedRows.length) {
                droppedRows.forEach(function (row) {
                  row.orphan_combo = true;
                });
                vm.inputs = vm.inputs.concat(droppedRows);
              }
            } else {
              // No attributes available for this category (e.g. removed since the
              // variants were saved, or the attributes request failed) - nothing to
              // reconcile against, so just show what was saved.
              vm.inputs = loadedRows.concat(legacyRows);
            }
            if (vm.inputs.length === 0) {
              vm.inputs = [{
                'name': '',
                'packet_status': '',
                'attribute_value_id': ''
              }];
            }
          });
        } else {
          _this37.showError(data.message);
          setTimeout(function () {
            _this37.$router.back();
          }, 1000);
        }
      })["catch"](function (error) {
        _this37.isLoading = false;
        if (error.message) {
          _this37.showError(error.message);
        } else {
          _this37.showError("Something went wrong!");
        }
      });
    },
    saveRecord: function saveRecord() {
      var _this38 = this;
      // Validate default language
      if (!this.validateDefaultLanguage()) {
        return;
      }

      // Every variant must map to a distinct attribute value
      if (!this.validateVariantAttributeValues()) {
        return;
      }
      if (!this.validateCustomFields()) {
        return;
      }
      this.isLoading = true;
      var vm = this;

      // Get default language translation for main table
      var defaultLang = this.languages.find(function (lang) {
        return lang.is_default === 1;
      });
      if (!defaultLang) {
        vm.showError(__('default_language_not_found'));
        vm.isLoading = false;
        return;
      }
      var defaultTranslation = this.translations[defaultLang.id];
      var formData = new FormData();
      if (this.id) {
        formData.append('id', this.id);
        formData.append('deleteImageIds', JSON.stringify(this.deleteImageIds));
      }
      // Use default language values for main table
      formData.append('name', defaultTranslation.name || '');
      formData.append('slug', this.slug);
      formData.append('seller_id', this.seller_id);
      // Convert tag_ids array to comma-separated string for backend relationship
      var tagIdsString = Array.isArray(this.tag_ids) ? this.tag_ids.join(',') : this.tag_ids || '';
      formData.append('tag_ids', tagIdsString);
      // Convert tag_ids to tag names for main products table tags column
      var tagsString = '';
      if (Array.isArray(this.tag_ids) && this.tag_ids.length > 0) {
        var tagNames = this.tag_ids.map(function (tagId) {
          // If it's a number, find the tag name from tags array
          if (typeof tagId === 'number' || typeof tagId === 'string' && !isNaN(tagId)) {
            var tag = _this38.tags.find(function (t) {
              return t.id == tagId;
            });
            return tag ? tag.name : tagId;
          }
          // If it's already a string (new tag), use it as is
          return tagId;
        });
        tagsString = tagNames.join(',');
      } else if (this.tag_ids) {
        // Handle string case
        var tagIdsArray = String(this.tag_ids).split(',').map(function (t) {
          return t.trim();
        });
        var _tagNames = tagIdsArray.map(function (tagId) {
          if (!isNaN(tagId)) {
            var tag = _this38.tags.find(function (t) {
              return t.id == tagId;
            });
            return tag ? tag.name : tagId;
          }
          return tagId;
        });
        tagsString = _tagNames.join(',');
      }
      formData.append('tags', tagsString);
      formData.append('tax_id', this.tax_id);
      formData.append('brand_id', this.brand ? this.brand.id : 0);
      formData.append('description', defaultTranslation.description || '');
      formData.append('type', this.type);
      formData.append('is_unlimited_stock', this.is_unlimited_stock);
      formData.append('barcode', this.barcode != null && this.barcode !== undefined ? String(this.barcode).trim() : '');
      formData.append('meta_title', defaultTranslation.meta_title || '');
      formData.append('meta_keywords', defaultTranslation.meta_keywords || '');
      formData.append('schema_markup', defaultTranslation.schema_markup || '');
      formData.append('meta_description', defaultTranslation.meta_description || '');
      (this.selectedAddonGroups || []).forEach(function (group) {
        formData.append('addon_group_ids[]', group.id);
      });

      /* Variants: the chosen attribute value replaces the old measurement + unit pair.
         The backend derives measurement / stock_unit_id / type from it. */
      var _loop = function _loop(_i) {
        formData.append('variant_id[]', _this38.inputs[_i].id ? _this38.inputs[_i].id : "");
        formData.append('attribute_value_id[]', _this38.inputs[_i].attribute_value_id);
        var comboValueIds = _this38.inputs[_i].combo_value_ids && _this38.inputs[_i].combo_value_ids.length ? _this38.inputs[_i].combo_value_ids : [_this38.inputs[_i].attribute_value_id];
        comboValueIds.forEach(function (valueId) {
          formData.append('combo_attribute_value_ids[' + _i + '][]', valueId);
        });
        formData.append('packet_price[]', _this38.inputs[_i].packet_price != undefined ? _this38.inputs[_i].packet_price : 0);
        formData.append('packet_purchase_price[]', _this38.inputs[_i].packet_purchase_price != undefined ? _this38.inputs[_i].packet_purchase_price : 0);
        formData.append('discounted_price[]', _this38.inputs[_i].discounted_price != undefined ? _this38.inputs[_i].discounted_price : 0);
        formData.append('packet_stock[]', _this38.inputs[_i].packet_stock !== undefined && _this38.inputs[_i].packet_stock !== '' ? _this38.inputs[_i].packet_stock : 0);
        formData.append('packet_status[]', _this38.inputs[_i].packet_status != undefined ? _this38.inputs[_i].packet_status : 0);

        // Safely handle variant images refs (can be undefined when card is hidden in non-default language tab)
        var packetRef = _this38.$refs['packet_variant_images_' + _i];
        var packetInput = Array.isArray(packetRef) ? packetRef && packetRef[0] : packetRef;
        if (packetInput && packetInput.files) {
          for (var j = 0; j < packetInput.files.length; j++) {
            var _file = packetInput.files[j];
            formData.append('packet_variant_images_' + _i + '[]', _file);
          }
        }
      };
      for (var _i = 0; _i < this.inputs.length; _i++) {
        _loop(_i);
      }
      formData.append('status', this.status != undefined ? this.status : 0);
      formData.append('category_id', this.category_id);
      formData.append('manufacturer', this.manufacturer || '');
      formData.append('made_in', this.made_in ? this.made_in.id : 0);
      formData.append('shipping_type', this.shipping_type);
      formData.append('pincode_ids_exc', this.pincode_ids_exc);
      formData.append('return_status', this.return_status);
      var returnDaysToStore = parseInt(this.return_days, 10) > 0 ? this.return_days : 1;
      formData.append('return_days', returnDaysToStore);
      formData.append('cancelable_status', this.cancelable_status);
      formData.append('till_status', this.till_status);
      formData.append('cod_allowed_status', this.cod_allowed_status);
      formData.append('require_prescription', this.require_prescription);
      formData.append('max_allowed_quantity', this.max_allowed_quantity);
      formData.append('is_approved', this.is_approved);
      formData.append('tax_included_in_price', this.tax_included_in_price);
      formData.append('image_mode', this.image_mode);
      if (this.image) {
        formData.append('image', this.image);
      }
      // Other Images - Use files from images array to maintain correct indexing
      for (var i = 0; i < this.images.length; i++) {
        var file = this.images[i].file;
        formData.append('other_images[]', file);
      }

      // Sync manufacturer to default language translation before saving
      if (this.defaultLanguageId && this.translations[this.defaultLanguageId]) {
        this.translations[this.defaultLanguageId].manufacturer = this.manufacturer;
      }

      // Sync tags for all languages before saving (ensure translation.tags is up to date)
      this.languages.forEach(function (language) {
        if (_this38.translations[language.id]) {
          _this38.handleTagChange(language.id);
        }
      });

      // Prepare translations array
      var allTranslations = [];
      this.languages.forEach(function (language) {
        var translation = _this38.translations[language.id];
        // Convert tag IDs to tag names for translation (for all languages)
        var tagsValue = translation.tags || '';

        // Get tag IDs for this language
        var tagIds = [];
        if (language.is_default) {
          tagIds = Array.isArray(_this38.tag_ids) ? _this38.tag_ids : _this38.tag_ids ? String(_this38.tag_ids).split(',').map(function (t) {
            return t.trim();
          }).filter(function (t) {
            return t;
          }) : [];
        } else {
          var langTagIds = _this38.tagIdsByLanguage[language.id];
          if (langTagIds) {
            tagIds = Array.isArray(langTagIds) ? langTagIds : String(langTagIds).split(',').map(function (t) {
              return t.trim();
            }).filter(function (t) {
              return t;
            });
          }
        }

        // Convert tag IDs to tag names (only if we have tag IDs)
        // If tagIds is empty but translation.tags already has a value, use that (it was already converted by handleTagChange)
        if (tagIds.length > 0) {
          var _tagNames2 = tagIds.map(function (tagId) {
            // If it's a number, find the tag name from tags array
            if (typeof tagId === 'number' || typeof tagId === 'string' && !isNaN(tagId)) {
              var tag = _this38.tags.find(function (t) {
                return t.id == tagId;
              });
              return tag ? tag.name : tagId;
            }
            // If it's already a string (new tag), use it as is
            return tagId;
          });
          tagsValue = _tagNames2.join(',');
        } else if (!tagsValue && translation.tags) {
          // If no tagIds but translation.tags exists, use it (already converted)
          tagsValue = translation.tags;
        }

        // For default language, use manufacturer from main field
        if (language.is_default) {
          translation.manufacturer = _this38.manufacturer || '';
        }
        allTranslations.push({
          language_id: language.id,
          name: translation.name || '',
          tags: tagsValue,
          manufacturer: translation.manufacturer || '',
          description: translation.description || '',
          meta_title: translation.meta_title || '',
          meta_keywords: translation.meta_keywords || '',
          schema_markup: translation.schema_markup || '',
          meta_description: translation.meta_description || ''
        });
      });
      formData.append('translations', JSON.stringify(allTranslations));
      if (this.customFields.length) {
        var textValues = {};
        this.customFields.forEach(function (field) {
          if (field.type !== 'file') {
            textValues[field.id] = _this38.customFieldValues[field.id] || '';
          } else if (_this38.customFieldExistingValues[field.id] && !_this38.customFieldFiles[field.id]) {
            // Keep the previously uploaded file path if a new one wasn't chosen
            textValues[field.id] = _this38.customFieldExistingValues[field.id];
          }
        });
        formData.append('custom_field_values', JSON.stringify(textValues));
        this.customFields.forEach(function (field) {
          if (field.type === 'file' && _this38.customFieldFiles[field.id]) {
            formData.append('custom_field_file_' + field.id, _this38.customFieldFiles[field.id]);
          }
        });
      }
      var url = this.$apiUrl + '/products/save';
      if (this.clone) {
        url = this.$apiUrl + '/products/save';
      } else if (this.id) {
        url = this.$apiUrl + '/products/update';
      }
      axios__WEBPACK_IMPORTED_MODULE_1___default().post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(function (res) {
        var data = res.data;
        if (data.status === 1) {
          _this38.skipCache = true;
          localStorage.removeItem('product_form_cache');
          var redirectAfterSave = function redirectAfterSave() {
            var _vm$loggedUser, _vm$loggedUser$role;
            vm.isLoading = false;
            if (((_vm$loggedUser = vm.loggedUser) === null || _vm$loggedUser === void 0 ? void 0 : (_vm$loggedUser$role = _vm$loggedUser.role) === null || _vm$loggedUser$role === void 0 ? void 0 : _vm$loggedUser$role.name) === "Seller") {
              vm.$router.push({
                path: '/seller/manage_products'
              });
            } else {
              vm.$router.push({
                path: '/manage_products'
              });
            }
          };

          // A variant that couldn't actually be removed (tied to past order history)
          // is kept in place server-side instead of silently vanishing - tell the
          // seller which ones, instead of letting them believe removal succeeded only
          // to see the variant reappear on the next reload.
          var keptVariants = data.data && data.data.kept_variants;
          if (keptVariants && keptVariants.length) {
            _this38.$swal.fire({
              title: __('some_variants_were_kept') || 'Some variants were kept',
              text: (__('these_variants_have_order_history_and_were_not_removed') || 'These variants are tied to past orders and were not removed') + ': ' + keptVariants.join(', '),
              icon: 'info',
              confirmButtonColor: '#37a279'
            }).then(function () {
              redirectAfterSave();
            });
            return;
          }
          _this38.showMessage("success", data.message);
          setTimeout(function () {
            vm.$swal.close();
            redirectAfterSave();
          }, 2000);
        } else {
          vm.showError(data.message);
          vm.isLoading = false;
        }
      })["catch"](function (error) {
        vm.isLoading = false;
        _this38.showError("Something went wrong!");
      });
    },
    deleteImage: function deleteImage(index, id, productImage) {
      var _this39 = this;
      var key = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "";
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
          _this39.deleteImageIds.push(id);
          if (productImage) {
            _this39.other_images.splice(index, 1);
          } else {
            _this39.inputs[key].images.splice(index, 1);
          }
        }
      });
    },
    saveCache: function saveCache() {
      if (this.id || this.clone || this.skipCache) return;
      try {
        var data = {
          name: this.name,
          slug: this.slug,
          seller_id: this.seller_id,
          tag_ids: this.tag_ids,
          tax_id: this.tax_id,
          brand: this.brand ? {
            id: this.brand.id
          } : null,
          description: this.description,
          type: this.type,
          is_unlimited_stock: this.is_unlimited_stock,
          barcode: this.barcode,
          meta_title: this.meta_title,
          meta_keywords: this.meta_keywords,
          schema_markup: this.schema_markup,
          meta_description: this.meta_description,
          category_id: this.category_id,
          manufacturer: this.manufacturer,
          made_in: this.made_in ? {
            id: this.made_in.id
          } : null,
          return_status: this.return_status,
          return_days: parseInt(this.return_days, 10) > 0 ? this.return_days : 1,
          cancelable_status: this.cancelable_status,
          till_status: this.till_status,
          cod_allowed_status: this.cod_allowed_status,
          max_allowed_quantity: this.max_allowed_quantity,
          is_approved: this.is_approved,
          tax_included_in_price: this.tax_included_in_price,
          status: this.status,
          inputs: JSON.parse(JSON.stringify(this.inputs)),
          useCustomPrompt: this.useCustomPrompt,
          customPrompt: this.customPrompt,
          tagIdsByLanguage: JSON.parse(JSON.stringify(this.tagIdsByLanguage)),
          translations: JSON.parse(JSON.stringify(this.translations)),
          timestamp: Date.now()
        };
        localStorage.setItem('product_form_cache', JSON.stringify(data));
      } catch (e) {}
    },
    restoreCache: function restoreCache() {
      var _this40 = this;
      try {
        var cached = localStorage.getItem('product_form_cache');
        if (!cached) return;
        var data = JSON.parse(cached);
        if (data.timestamp && Date.now() - data.timestamp > 120000) {
          localStorage.removeItem('product_form_cache');
          return;
        }
        this.cachedData = data;
        Object.keys(data).forEach(function (key) {
          if (key === 'timestamp' || key === 'brand' || key === 'made_in' || key === 'translations' || key === 'tagIdsByLanguage') return;
          // seller_id is always the logged-in seller's own id for a seller - never let a stale
          // cache (e.g. left over from an admin's in-progress form for a different seller) override it.
          if (key === 'seller_id' && _this40.isSellerRole) return;
          if (_this40.hasOwnProperty(key)) _this40[key] = data[key] !== undefined ? data[key] : _this40[key];
        });

        // Restore per-language translation data.
        // At this point initializeTranslations() has already run (it's called inside
        // fetchActiveLanguages before restoreCache, so this.translations already has
        // valid language-keyed slots we can safely overwrite.
        if (data.translations && this.languages && this.languages.length > 0) {
          this.languages.forEach(function (language) {
            if (data.translations[language.id]) {
              _this40.$set(_this40.translations, language.id, _objectSpread(_objectSpread({}, _this40.translations[language.id]), data.translations[language.id]));
            }
          });
        }
        // Restore per-language tag ID selections.
        if (data.tagIdsByLanguage && this.languages && this.languages.length > 0) {
          Object.keys(data.tagIdsByLanguage).forEach(function (languageId) {
            _this40.$set(_this40.tagIdsByLanguage, languageId, data.tagIdsByLanguage[languageId]);
          });
        }
        if (data.brand && this.brands && this.brands.length) {
          var foundBrand = this.brands.find(function (b) {
            return b.id === data.brand.id;
          }) || null;
          // Update brand with translated name
          this.$nextTick(function () {
            if (foundBrand && _this40.translatedBrands && _this40.translatedBrands.length > 0) {
              var translatedBrand = _this40.translatedBrands.find(function (b) {
                return b.id === foundBrand.id;
              });
              if (translatedBrand) {
                _this40.brand = _objectSpread(_objectSpread({}, foundBrand), {}, {
                  name: translatedBrand.name,
                  title: translatedBrand.title
                });
              } else {
                _this40.brand = foundBrand;
              }
            } else {
              _this40.brand = foundBrand;
            }
          });
        }
        if (data.made_in && this.countries && this.countries.length) {
          this.made_in = this.countries.find(function (c) {
            return c.id === data.made_in.id;
          }) || null;
        }
        if (this.seller_id) {
          this.$nextTick(function () {
            _this40.getSellerCategories();
            _this40.getSeller();
          });
        }
      } catch (e) {
        localStorage.removeItem('product_form_cache');
      }
    },
    clearForm: function clearForm() {
      var _this41 = this;
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
          if (_this41.$refs['my-form']) _this41.$refs['my-form'].reset();
          _this41.suppressCategoryWatch = true;
          _this41.$nextTick(function () {
            _this41.suppressCategoryWatch = false;
          });
          Object.assign(_this41, {
            name: '',
            slug: '',
            seller_id: 0,
            tag_ids: '',
            tax_id: 0,
            brand: null,
            description: '',
            type: 'attribute',
            is_unlimited_stock: 0,
            barcode: '',
            meta_title: '',
            meta_keywords: '',
            schema_markup: '',
            meta_description: '',
            category_id: '',
            manufacturer: '',
            made_in: null,
            return_status: 0,
            return_days: 1,
            cancelable_status: 0,
            categoryOptions: '<option value="">' + __('select_category') + '</option>',
            till_status: '',
            cod_allowed_status: 0,
            max_allowed_quantity: 0,
            is_approved: 1,
            tax_included_in_price: 0,
            status: 1,
            loose_stock: 0,
            loose_stock_unit_id: '',
            inputs: [{
              'name': '',
              'packet_status': '',
              'attribute_value_id': ''
            }],
            selectedAttributeValues: {},
            image: null,
            main_image_path: '',
            main_image_name: '',
            other_images: null,
            images: [],
            variantFiles: {},
            deleteImageIds: [],
            useCustomPrompt: false,
            customPrompt: '',
            tagIdsByLanguage: {},
            activeLanguageTab: 0,
            customFieldValues: {},
            customFieldFiles: {},
            customFieldExistingValues: {}
          });
          _this41.applyCustomFieldValues();
          _this41.tag_ids = [];
          _this41.initializeTranslations();
          localStorage.removeItem('product_form_cache');
        }
      });
    },
    debouncedSave: function debouncedSave() {
      var _this42 = this;
      if (this.cacheTimer) clearTimeout(this.cacheTimer);
      this.cacheTimer = setTimeout(function () {
        return _this42.saveCache();
      }, 500);
    }
  },
  watch: {
    // Watch currentLanguageId to update selected brand name when language changes
    currentLanguageId: function currentLanguageId(newVal, oldVal) {
      var _this43 = this;
      if (newVal && this.brand && this.translatedBrands && this.translatedBrands.length > 0) {
        // Find the translated brand from translatedBrands
        var translatedBrand = this.translatedBrands.find(function (b) {
          return b.id === _this43.brand.id;
        });
        if (translatedBrand) {
          // Update the brand object with translated name
          this.brand = _objectSpread(_objectSpread({}, this.brand), {}, {
            name: translatedBrand.name,
            title: translatedBrand.title
          });
        }
      }
    },
    // Watch translatedBrands to update selected brand when brands are loaded or language changes
    translatedBrands: {
      handler: function handler(newVal) {
        var _this44 = this;
        if (newVal && newVal.length > 0 && this.brand && this.brand.id) {
          // Find the translated brand from translatedBrands
          var translatedBrand = newVal.find(function (b) {
            return b.id === _this44.brand.id;
          });
          if (translatedBrand) {
            // Update the brand object with translated name
            this.brand = _objectSpread(_objectSpread({}, this.brand), {}, {
              name: translatedBrand.name,
              title: translatedBrand.title
            });
          }
        }
      },
      deep: true
    },
    // Watch activeLanguageTab to ensure Select2 updates when switching tabs
    activeLanguageTab: function activeLanguageTab(newTab, oldTab) {
      var _this45 = this;
      // Force Select2 to update when switching language tabs
      this.$nextTick(function () {
        // Trigger conversion again to ensure tagIdsByLanguage is set
        if (_this45.tags && _this45.tags.length > 0 && _this45.languages.length > 0) {
          _this45.convertTagNamesToIds();
        }
      });
    },
    // Auto-save form data to cache (debounced)
    name: function name() {
      if (!this.id && !this.clone) this.debouncedSave();
    },
    slug: function slug() {
      if (!this.id && !this.clone) this.debouncedSave();
    },
    seller_id: function seller_id() {
      if (!this.id && !this.clone) this.debouncedSave();
    },
    tag_ids: function tag_ids() {
      if (!this.id && !this.clone) this.debouncedSave();
    },
    tax_id: function tax_id() {
      if (!this.id && !this.clone) this.debouncedSave();
    },
    brand: {
      handler: function handler() {
        if (!this.id && !this.clone) this.debouncedSave();
      },
      deep: true
    },
    description: function description() {
      if (!this.id && !this.clone) this.debouncedSave();
    },
    type: function type() {
      if (!this.id && !this.clone) this.debouncedSave();
    },
    is_unlimited_stock: function is_unlimited_stock() {
      if (!this.id && !this.clone) this.debouncedSave();
    },
    barcode: function barcode() {
      if (!this.id && !this.clone) this.debouncedSave();
    },
    meta_title: function meta_title() {
      if (!this.id && !this.clone) this.debouncedSave();
    },
    meta_keywords: function meta_keywords() {
      if (!this.id && !this.clone) this.debouncedSave();
    },
    schema_markup: function schema_markup() {
      if (!this.id && !this.clone) this.debouncedSave();
    },
    meta_description: function meta_description() {
      if (!this.id && !this.clone) this.debouncedSave();
    },
    category_id: function category_id(newVal, oldVal) {
      if (!this.id && !this.clone) this.debouncedSave();
      if (newVal !== oldVal && !this.suppressCategoryWatch) {
        this.selectedAttributeValues = {};
        this.inputs = [{
          'name': '',
          'packet_status': '',
          'attribute_value_id': ''
        }];
        this.loadAttributes();
      }
    },
    manufacturer: function manufacturer() {
      // Sync manufacturer to default language translation
      if (this.defaultLanguageId && this.translations[this.defaultLanguageId]) {
        this.translations[this.defaultLanguageId].manufacturer = this.manufacturer;
      }
      if (!this.id && !this.clone) this.debouncedSave();
    },
    made_in: {
      handler: function handler() {
        if (!this.id && !this.clone) this.debouncedSave();
      },
      deep: true
    },
    return_status: function return_status() {
      // When user turns off returnable, default return_days to 1 if empty/0
      if (Number(this.return_status) === 0 && (parseInt(this.return_days, 10) || 0) <= 0) {
        this.return_days = 1;
      }
      if (!this.id && !this.clone) this.debouncedSave();
    },
    return_days: function return_days() {
      // When days cleared or set to 0 (e.g. returnable off), keep default 1 in memory for next save
      if ((this.return_days === '' || this.return_days === null || parseInt(this.return_days, 10) <= 0) && Number(this.return_status) === 0) {
        this.return_days = 1;
      }
      if (!this.id && !this.clone) this.debouncedSave();
    },
    cancelable_status: function cancelable_status() {
      if (!this.id && !this.clone) this.debouncedSave();
    },
    till_status: function till_status() {
      if (!this.id && !this.clone) this.debouncedSave();
    },
    cod_allowed_status: function cod_allowed_status() {
      if (!this.id && !this.clone) this.debouncedSave();
    },
    max_allowed_quantity: function max_allowed_quantity() {
      if (!this.id && !this.clone) this.debouncedSave();
    },
    is_approved: function is_approved() {
      if (!this.id && !this.clone) this.debouncedSave();
    },
    tax_included_in_price: function tax_included_in_price() {
      if (!this.id && !this.clone) this.debouncedSave();
    },
    status: function status() {
      if (!this.id && !this.clone) this.debouncedSave();
    },
    loose_stock: function loose_stock() {
      if (!this.id && !this.clone) this.debouncedSave();
    },
    loose_stock_unit_id: function loose_stock_unit_id() {
      if (!this.id && !this.clone) this.debouncedSave();
    },
    inputs: {
      handler: function handler() {
        if (!this.id && !this.clone) this.debouncedSave();
      },
      deep: true
    },
    useCustomPrompt: function useCustomPrompt() {
      if (!this.id && !this.clone) this.debouncedSave();
    },
    customPrompt: function customPrompt() {
      if (!this.id && !this.clone) this.debouncedSave();
    },
    translations: {
      handler: function handler() {
        if (!this.id && !this.clone) this.debouncedSave();
      },
      deep: true
    },
    tagIdsByLanguage: {
      handler: function handler() {
        if (!this.id && !this.clone) this.debouncedSave();
      },
      deep: true
    }
  }
});

/***/ }),

/***/ "./resources/js/mixins/TranslationHelper.js":
/*!**************************************************!*\
  !*** ./resources/js/mixins/TranslationHelper.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
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

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Product/EditProduct.vue?vue&type=style&index=0&id=a901b314&scoped=true&lang=css":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Product/EditProduct.vue?vue&type=style&index=0&id=a901b314&scoped=true&lang=css ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_multiselect_dist_vue_multiselect_min_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! -!../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!../../../../node_modules/vue-multiselect/dist/vue-multiselect.min.css */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-multiselect/dist/vue-multiselect.min.css");
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
___CSS_LOADER_EXPORT___.i(_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_multiselect_dist_vue_multiselect_min_css__WEBPACK_IMPORTED_MODULE_1__["default"]);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "\n/* AI Generate Button Styles */\n.ai-generate-btn[data-v-a901b314] {\n    position: relative;\n    min-width: 200px;\n    transition: all 0.3s ease;\n}\n.ai-generate-btn[data-v-a901b314]:disabled {\n    opacity: 0.9;\n    cursor: not-allowed;\n    background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);\n    border-color: #667eea;\n    color: white;\n}\n\n/* AI Spinner Animation */\n.ai-spinner[data-v-a901b314] {\n    display: inline-block;\n    width: 16px;\n    height: 16px;\n    border: 2px solid rgba(255, 255, 255, 0.3);\n    border-radius: 50%;\n    border-top-color: #fff;\n    animation: ai-spin-data-v-a901b314 0.8s ease-in-out infinite;\n}\n@keyframes ai-spin-data-v-a901b314 {\nto {\n        transform: rotate(360deg);\n}\n}\n\n/* AI Text Animation - Pulsing effect */\n.ai-text-animate[data-v-a901b314] {\n    animation: ai-pulse-data-v-a901b314 1.5s ease-in-out infinite;\n}\n@keyframes ai-pulse-data-v-a901b314 {\n0%,\n    100% {\n        opacity: 1;\n}\n50% {\n        opacity: 0.6;\n}\n}\n.variant-image-preview-list[data-v-a901b314] {\n    gap: 8px;\n    margin-top: 8px;\n}\n.variant-image-preview-item[data-v-a901b314] {\n    position: relative;\n    width: 90px;\n    cursor: grab;\n}\n.variant-image-preview-item[data-v-a901b314]:active {\n    cursor: grabbing;\n}\n.variant-image-preview-item .custom-image[data-v-a901b314] {\n    width: 90px;\n    height: 90px;\n    -o-object-fit: cover;\n       object-fit: cover;\n}\n.variant-image-preview-item .btn-remove[data-v-a901b314] {\n    position: absolute;\n    top: -8px;\n    right: -8px;\n    padding: 0;\n    width: 18px;\n    height: 18px;\n    line-height: 1;\n    border: none;\n    background: transparent;\n    color: #dc3545;\n    font-size: 16px;\n}\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-multiselect/dist/vue-multiselect.min.css":
/*!*********************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-multiselect/dist/vue-multiselect.min.css ***!
  \*********************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.id, "fieldset[disabled] .multiselect{pointer-events:none}.multiselect__spinner{position:absolute;right:1px;top:1px;width:48px;height:35px;background:#fff;display:block}.multiselect__spinner:after,.multiselect__spinner:before{position:absolute;content:\"\";top:50%;left:50%;margin:-8px 0 0 -8px;width:16px;height:16px;border-radius:100%;border:2px solid transparent;border-top-color:#41b883;box-shadow:0 0 0 1px transparent}.multiselect__spinner:before{animation:spinning 2.4s cubic-bezier(.41,.26,.2,.62);animation-iteration-count:infinite}.multiselect__spinner:after{animation:spinning 2.4s cubic-bezier(.51,.09,.21,.8);animation-iteration-count:infinite}.multiselect__loading-enter-active,.multiselect__loading-leave-active{transition:opacity .4s ease-in-out;opacity:1}.multiselect__loading-enter,.multiselect__loading-leave-active{opacity:0}.multiselect,.multiselect__input,.multiselect__single{font-family:inherit;font-size:16px;-ms-touch-action:manipulation;touch-action:manipulation}.multiselect{box-sizing:content-box;display:block;position:relative;width:100%;min-height:40px;text-align:left;color:#35495e}.multiselect *{box-sizing:border-box}.multiselect:focus{outline:none}.multiselect--disabled{background:#ededed;pointer-events:none;opacity:.6}.multiselect--active{z-index:50}.multiselect--active:not(.multiselect--above) .multiselect__current,.multiselect--active:not(.multiselect--above) .multiselect__input,.multiselect--active:not(.multiselect--above) .multiselect__tags{border-bottom-left-radius:0;border-bottom-right-radius:0}.multiselect--active .multiselect__select{transform:rotate(180deg)}.multiselect--above.multiselect--active .multiselect__current,.multiselect--above.multiselect--active .multiselect__input,.multiselect--above.multiselect--active .multiselect__tags{border-top-left-radius:0;border-top-right-radius:0}.multiselect__input,.multiselect__single{position:relative;display:inline-block;min-height:20px;line-height:20px;border:none;border-radius:5px;background:#fff;padding:0 0 0 5px;width:100%;transition:border .1s ease;box-sizing:border-box;margin-bottom:8px;vertical-align:top}.multiselect__input:-ms-input-placeholder{color:#35495e}.multiselect__input::placeholder{color:#35495e}.multiselect__tag~.multiselect__input,.multiselect__tag~.multiselect__single{width:auto}.multiselect__input:hover,.multiselect__single:hover{border-color:#cfcfcf}.multiselect__input:focus,.multiselect__single:focus{border-color:#a8a8a8;outline:none}.multiselect__single{padding-left:5px;margin-bottom:8px}.multiselect__tags-wrap{display:inline}.multiselect__tags{min-height:40px;display:block;padding:8px 40px 0 8px;border-radius:5px;border:1px solid #e8e8e8;background:#fff;font-size:14px}.multiselect__tag{position:relative;display:inline-block;padding:4px 26px 4px 10px;border-radius:5px;margin-right:10px;color:#fff;line-height:1;background:#41b883;margin-bottom:5px;white-space:nowrap;overflow:hidden;max-width:100%;text-overflow:ellipsis}.multiselect__tag-icon{cursor:pointer;margin-left:7px;position:absolute;right:0;top:0;bottom:0;font-weight:700;font-style:normal;width:22px;text-align:center;line-height:22px;transition:all .2s ease;border-radius:5px}.multiselect__tag-icon:after{content:\"\\D7\";color:#266d4d;font-size:14px}.multiselect__tag-icon:focus,.multiselect__tag-icon:hover{background:#369a6e}.multiselect__tag-icon:focus:after,.multiselect__tag-icon:hover:after{color:#fff}.multiselect__current{min-height:40px;overflow:hidden;padding:8px 30px 0 12px;white-space:nowrap;border-radius:5px;border:1px solid #e8e8e8}.multiselect__current,.multiselect__select{line-height:16px;box-sizing:border-box;display:block;margin:0;text-decoration:none;cursor:pointer}.multiselect__select{position:absolute;width:40px;height:38px;right:1px;top:1px;padding:4px 8px;text-align:center;transition:transform .2s ease}.multiselect__select:before{position:relative;right:0;top:65%;color:#999;margin-top:4px;border-color:#999 transparent transparent;border-style:solid;border-width:5px 5px 0;content:\"\"}.multiselect__placeholder{color:#adadad;display:inline-block;margin-bottom:10px;padding-top:2px}.multiselect--active .multiselect__placeholder{display:none}.multiselect__content-wrapper{position:absolute;display:block;background:#fff;width:100%;max-height:240px;overflow:auto;border:1px solid #e8e8e8;border-top:none;border-bottom-left-radius:5px;border-bottom-right-radius:5px;z-index:50;-webkit-overflow-scrolling:touch}.multiselect__content{list-style:none;display:inline-block;padding:0;margin:0;min-width:100%;vertical-align:top}.multiselect--above .multiselect__content-wrapper{bottom:100%;border-bottom-left-radius:0;border-bottom-right-radius:0;border-top-left-radius:5px;border-top-right-radius:5px;border-bottom:none;border-top:1px solid #e8e8e8}.multiselect__content::webkit-scrollbar{display:none}.multiselect__element{display:block}.multiselect__option{display:block;padding:12px;min-height:40px;line-height:16px;text-decoration:none;text-transform:none;vertical-align:middle;position:relative;cursor:pointer;white-space:nowrap}.multiselect__option:after{top:0;right:0;position:absolute;line-height:40px;padding-right:12px;padding-left:20px;font-size:13px}.multiselect__option--highlight{background:#41b883;outline:none;color:#fff}.multiselect__option--highlight:after{content:attr(data-select);background:#41b883;color:#fff}.multiselect__option--selected{background:#f3f3f3;color:#35495e;font-weight:700}.multiselect__option--selected:after{content:attr(data-selected);color:silver}.multiselect__option--selected.multiselect__option--highlight{background:#ff6a6a;color:#fff}.multiselect__option--selected.multiselect__option--highlight:after{background:#ff6a6a;content:attr(data-deselect);color:#fff}.multiselect--disabled .multiselect__current,.multiselect--disabled .multiselect__select{background:#ededed;color:#a6a6a6}.multiselect__option--disabled{background:#ededed!important;color:#a6a6a6!important;cursor:text;pointer-events:none}.multiselect__option--group{background:#ededed;color:#35495e}.multiselect__option--group.multiselect__option--highlight{background:#35495e;color:#fff}.multiselect__option--group.multiselect__option--highlight:after{background:#35495e}.multiselect__option--disabled.multiselect__option--highlight{background:#dedede}.multiselect__option--group-selected.multiselect__option--highlight{background:#ff6a6a;color:#fff}.multiselect__option--group-selected.multiselect__option--highlight:after{background:#ff6a6a;content:attr(data-deselect);color:#fff}.multiselect-enter-active,.multiselect-leave-active{transition:all .15s ease}.multiselect-enter,.multiselect-leave-active{opacity:0}.multiselect__strong{margin-bottom:8px;line-height:20px;display:inline-block;vertical-align:top}[dir=rtl] .multiselect{text-align:right}[dir=rtl] .multiselect__select{right:auto;left:1px}[dir=rtl] .multiselect__tags{padding:8px 8px 0 40px}[dir=rtl] .multiselect__content{text-align:right}[dir=rtl] .multiselect__option:after{right:auto;left:0}[dir=rtl] .multiselect__clear{right:auto;left:12px}[dir=rtl] .multiselect__spinner{right:auto;left:1px}@keyframes spinning{0%{transform:rotate(0)}to{transform:rotate(2turn)}}", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Product/EditProduct.vue?vue&type=style&index=0&id=a901b314&scoped=true&lang=css":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Product/EditProduct.vue?vue&type=style&index=0&id=a901b314&scoped=true&lang=css ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_EditProduct_vue_vue_type_style_index_0_id_a901b314_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./EditProduct.vue?vue&type=style&index=0&id=a901b314&scoped=true&lang=css */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Product/EditProduct.vue?vue&type=style&index=0&id=a901b314&scoped=true&lang=css");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_EditProduct_vue_vue_type_style_index_0_id_a901b314_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_EditProduct_vue_vue_type_style_index_0_id_a901b314_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./resources/js/views/Product/EditProduct.vue":
/*!****************************************************!*\
  !*** ./resources/js/views/Product/EditProduct.vue ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _EditProduct_vue_vue_type_template_id_a901b314_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./EditProduct.vue?vue&type=template&id=a901b314&scoped=true */ "./resources/js/views/Product/EditProduct.vue?vue&type=template&id=a901b314&scoped=true");
/* harmony import */ var _EditProduct_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./EditProduct.vue?vue&type=script&lang=js */ "./resources/js/views/Product/EditProduct.vue?vue&type=script&lang=js");
/* harmony import */ var _EditProduct_vue_vue_type_style_index_0_id_a901b314_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./EditProduct.vue?vue&type=style&index=0&id=a901b314&scoped=true&lang=css */ "./resources/js/views/Product/EditProduct.vue?vue&type=style&index=0&id=a901b314&scoped=true&lang=css");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _EditProduct_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _EditProduct_vue_vue_type_template_id_a901b314_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render,
  _EditProduct_vue_vue_type_template_id_a901b314_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "a901b314",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/Product/EditProduct.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/views/Product/EditProduct.vue?vue&type=script&lang=js":
/*!****************************************************************************!*\
  !*** ./resources/js/views/Product/EditProduct.vue?vue&type=script&lang=js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_EditProduct_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./EditProduct.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Product/EditProduct.vue?vue&type=script&lang=js");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_EditProduct_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/Product/EditProduct.vue?vue&type=style&index=0&id=a901b314&scoped=true&lang=css":
/*!************************************************************************************************************!*\
  !*** ./resources/js/views/Product/EditProduct.vue?vue&type=style&index=0&id=a901b314&scoped=true&lang=css ***!
  \************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_EditProduct_vue_vue_type_style_index_0_id_a901b314_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/style-loader/dist/cjs.js!../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./EditProduct.vue?vue&type=style&index=0&id=a901b314&scoped=true&lang=css */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Product/EditProduct.vue?vue&type=style&index=0&id=a901b314&scoped=true&lang=css");


/***/ }),

/***/ "./resources/js/views/Product/EditProduct.vue?vue&type=template&id=a901b314&scoped=true":
/*!**********************************************************************************************!*\
  !*** ./resources/js/views/Product/EditProduct.vue?vue&type=template&id=a901b314&scoped=true ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_EditProduct_vue_vue_type_template_id_a901b314_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   staticRenderFns: () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_EditProduct_vue_vue_type_template_id_a901b314_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_EditProduct_vue_vue_type_template_id_a901b314_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./EditProduct.vue?vue&type=template&id=a901b314&scoped=true */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Product/EditProduct.vue?vue&type=template&id=a901b314&scoped=true");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Product/EditProduct.vue?vue&type=template&id=a901b314&scoped=true":
/*!*************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Product/EditProduct.vue?vue&type=template&id=a901b314&scoped=true ***!
  \*************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
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
    _c(
      "div",
      {
        staticClass:
          "page-heading d-flex justify-content-between align-items-center mb-4",
      },
      [
        _c(
          "h3",
          { staticClass: "mb-0" },
          [
            _vm.clone
              ? [
                  _vm._v(
                    "\n                " +
                      _vm._s(_vm.__("clone")) +
                      "\n            "
                  ),
                ]
              : _vm.id
              ? [
                  _vm._v(
                    "\n                " +
                      _vm._s(_vm.__("edit")) +
                      "\n            "
                  ),
                ]
              : [
                  _vm._v(
                    "\n                " +
                      _vm._s(_vm.__("add")) +
                      "\n            "
                  ),
                ],
            _vm._v("\n            " + _vm._s(_vm.__("product")) + "\n        "),
          ],
          2
        ),
        _vm._v(" "),
        _c("nav", { attrs: { "aria-label": "breadcrumb" } }, [
          _c("ol", { staticClass: "breadcrumb mb-0" }, [
            _vm.isSellerRoute
              ? _c(
                  "li",
                  { staticClass: "breadcrumb-item" },
                  [
                    _c("router-link", { attrs: { to: "/seller/dashboard" } }, [
                      _vm._v(_vm._s(_vm.__("dashboard"))),
                    ]),
                  ],
                  1
                )
              : _c(
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
            _vm.isSellerRoute
              ? _c(
                  "li",
                  { staticClass: "breadcrumb-item" },
                  [
                    _c(
                      "router-link",
                      { attrs: { to: "/seller/manage_products" } },
                      [_vm._v(_vm._s(_vm.__("manage_products")))]
                    ),
                  ],
                  1
                )
              : _c(
                  "li",
                  { staticClass: "breadcrumb-item" },
                  [
                    _c("router-link", { attrs: { to: "/manage_products" } }, [
                      _vm._v(_vm._s(_vm.__("manage_products"))),
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
              [
                _vm.clone
                  ? [
                      _vm._v(
                        "\n                        " +
                          _vm._s(_vm.__("clone")) +
                          "\n                    "
                      ),
                    ]
                  : _vm.id
                  ? [
                      _vm._v(
                        "\n                        " +
                          _vm._s(_vm.__("edit")) +
                          "\n                    "
                      ),
                    ]
                  : [
                      _vm._v(
                        "\n                        " +
                          _vm._s(_vm.__("add")) +
                          "\n                    "
                      ),
                    ],
                _vm._v(
                  "\n                    " +
                    _vm._s(_vm.__("product")) +
                    "\n                "
                ),
              ],
              2
            ),
          ]),
        ]),
      ]
    ),
    _vm._v(" "),
    _c("div", { staticClass: "row" }, [
      _c(
        "div",
        {
          staticClass: "col-12 col-md-12 order-md-1 order-last",
          attrs: { id: "mymodal" },
        },
        [
          _c(
            "form",
            {
              ref: "my-form",
              on: {
                submit: function ($event) {
                  $event.preventDefault()
                  return _vm.saveRecord.apply(null, arguments)
                },
                keydown: function ($event) {
                  if (
                    !$event.type.indexOf("key") &&
                    _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")
                  ) {
                    return null
                  }
                  return $event.preventDefault()
                },
              },
            },
            [
              _c("div", { staticClass: "card" }, [
                _c("div", { staticClass: "card-header" }, [
                  _c(
                    "h4",
                    [
                      _vm.clone
                        ? [_vm._v(_vm._s(_vm.__("clone")))]
                        : _vm.id
                        ? [_vm._v(_vm._s(_vm.__("edit")))]
                        : [_vm._v(_vm._s(_vm.__("add")))],
                      _vm._v(" " + _vm._s(_vm.__("product"))),
                    ],
                    2
                  ),
                  _vm._v(" "),
                  _c(
                    "span",
                    { staticClass: "pull-right" },
                    [
                      _vm.isSellerRole
                        ? [
                            _c(
                              "router-link",
                              {
                                directives: [
                                  {
                                    name: "b-tooltip",
                                    rawName: "v-b-tooltip.hover",
                                    modifiers: { hover: true },
                                  },
                                ],
                                staticClass: "btn btn-primary",
                                attrs: {
                                  to: "/seller/manage_products",
                                  title: "Manage Product",
                                },
                              },
                              [_vm._v(_vm._s(_vm.__("manage_products")))]
                            ),
                          ]
                        : [
                            _c(
                              "router-link",
                              {
                                directives: [
                                  {
                                    name: "b-tooltip",
                                    rawName: "v-b-tooltip.hover",
                                    modifiers: { hover: true },
                                  },
                                ],
                                staticClass: "btn btn-primary",
                                attrs: {
                                  to: "/manage_products",
                                  title: "Manage Product",
                                },
                              },
                              [_vm._v(_vm._s(_vm.__("manage_products")))]
                            ),
                          ],
                    ],
                    2
                  ),
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "card-body" }, [
                  _vm.languages.length > 0
                    ? _c(
                        "div",
                        { staticClass: "col-md-12 mb-3" },
                        [
                          _c(
                            "b-tabs",
                            {
                              attrs: { "content-class": "mt-3" },
                              model: {
                                value: _vm.activeLanguageTab,
                                callback: function ($$v) {
                                  _vm.activeLanguageTab = $$v
                                },
                                expression: "activeLanguageTab",
                              },
                            },
                            _vm._l(_vm.languages, function (language) {
                              return _c(
                                "b-tab",
                                {
                                  key: language.id,
                                  attrs: { title: language.name, lazy: "" },
                                  scopedSlots: _vm._u(
                                    [
                                      {
                                        key: "title",
                                        fn: function () {
                                          return [
                                            _c(
                                              "span",
                                              {
                                                class: {
                                                  "text-primary font-weight-bold":
                                                    language.is_default,
                                                },
                                              },
                                              [
                                                _vm._v(
                                                  "\n                                                " +
                                                    _vm._s(language.name) +
                                                    "\n                                            "
                                                ),
                                              ]
                                            ),
                                          ]
                                        },
                                        proxy: true,
                                      },
                                    ],
                                    null,
                                    true
                                  ),
                                },
                                [
                                  _vm._v(" "),
                                  language.is_default &&
                                  _vm.languages.length > 1
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
                                                  return _vm.translateEmpty(
                                                    language
                                                  )
                                                },
                                              },
                                            },
                                            [
                                              !_vm.loadingEmpty
                                                ? _c("span", [
                                                    _vm._v(
                                                      _vm._s(
                                                        _vm.__(
                                                          "translate_empty_fields"
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
                                                  return _vm.translateOverwrite(
                                                    language
                                                  )
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
                                          _vm._v(" "),
                                          _vm.translateSuccessMessage
                                            ? _c(
                                                "div",
                                                {
                                                  staticClass:
                                                    "text-success mt-2 font-weight-bold",
                                                },
                                                [
                                                  _vm._v(
                                                    "\n                                                " +
                                                      _vm._s(
                                                        _vm.translateSuccessMessage
                                                      ) +
                                                      "\n                                            "
                                                  ),
                                                ]
                                              )
                                            : _vm._e(),
                                        ],
                                        1
                                      )
                                    : _vm._e(),
                                  _vm._v(" "),
                                  _vm.translations[language.id]
                                    ? _c("div", [
                                        _c(
                                          "div",
                                          { staticClass: "row" },
                                          [
                                            _c(
                                              "div",
                                              { staticClass: "col-md-6" },
                                              [
                                                _c(
                                                  "div",
                                                  {
                                                    staticClass:
                                                      "form-group mb-3",
                                                  },
                                                  [
                                                    _c("label", [
                                                      _vm._v(
                                                        _vm._s(
                                                          _vm.__("product_name")
                                                        ) + " "
                                                      ),
                                                      language.is_default
                                                        ? _c(
                                                            "i",
                                                            {
                                                              staticClass:
                                                                "text-danger",
                                                            },
                                                            [_vm._v("*")]
                                                          )
                                                        : _vm._e(),
                                                    ]),
                                                    _vm._v(" "),
                                                    _c("input", {
                                                      directives: [
                                                        {
                                                          name: "model",
                                                          rawName: "v-model",
                                                          value:
                                                            _vm.translations[
                                                              language.id
                                                            ].name,
                                                          expression:
                                                            "translations[language.id].name",
                                                        },
                                                      ],
                                                      staticClass:
                                                        "form-control",
                                                      attrs: {
                                                        type: "text",
                                                        placeholder:
                                                          _vm.__(
                                                            "enter_product_name"
                                                          ),
                                                        required:
                                                          language.is_default
                                                            ? true
                                                            : undefined,
                                                      },
                                                      domProps: {
                                                        value:
                                                          _vm.translations[
                                                            language.id
                                                          ].name,
                                                      },
                                                      on: {
                                                        input: [
                                                          function ($event) {
                                                            if (
                                                              $event.target
                                                                .composing
                                                            ) {
                                                              return
                                                            }
                                                            _vm.$set(
                                                              _vm.translations[
                                                                language.id
                                                              ],
                                                              "name",
                                                              $event.target
                                                                .value
                                                            )
                                                          },
                                                          function ($event) {
                                                            return _vm.handleDefaultLanguageInput(
                                                              "name",
                                                              language
                                                            )
                                                          },
                                                        ],
                                                      },
                                                    }),
                                                  ]
                                                ),
                                              ]
                                            ),
                                            _vm._v(" "),
                                            language.is_default
                                              ? [
                                                  _c(
                                                    "div",
                                                    { staticClass: "col-md-6" },
                                                    [
                                                      _c(
                                                        "div",
                                                        {
                                                          staticClass:
                                                            "form-group mb-3",
                                                        },
                                                        [
                                                          _c("label", [
                                                            _vm._v(
                                                              _vm._s(
                                                                _vm.__("slug")
                                                              ) + " "
                                                            ),
                                                            _c(
                                                              "i",
                                                              {
                                                                staticClass:
                                                                  "text-danger",
                                                              },
                                                              [_vm._v("*")]
                                                            ),
                                                          ]),
                                                          _vm._v(" "),
                                                          _c("input", {
                                                            directives: [
                                                              {
                                                                name: "model",
                                                                rawName:
                                                                  "v-model",
                                                                value: _vm.slug,
                                                                expression:
                                                                  "slug",
                                                              },
                                                            ],
                                                            staticClass:
                                                              "form-control",
                                                            attrs: {
                                                              type: "text",
                                                              placeholder:
                                                                _vm.__(
                                                                  "enter_product_slug"
                                                                ),
                                                              readonly: "",
                                                            },
                                                            domProps: {
                                                              value: _vm.slug,
                                                            },
                                                            on: {
                                                              input: function (
                                                                $event
                                                              ) {
                                                                if (
                                                                  $event.target
                                                                    .composing
                                                                ) {
                                                                  return
                                                                }
                                                                _vm.slug =
                                                                  $event.target.value
                                                              },
                                                            },
                                                          }),
                                                        ]
                                                      ),
                                                    ]
                                                  ),
                                                  _vm._v(" "),
                                                  _vm.isSellerRole
                                                    ? [
                                                        _c("input", {
                                                          directives: [
                                                            {
                                                              name: "model",
                                                              rawName:
                                                                "v-model",
                                                              value:
                                                                _vm.seller_id,
                                                              expression:
                                                                "seller_id",
                                                            },
                                                          ],
                                                          attrs: {
                                                            type: "hidden",
                                                            required: "",
                                                          },
                                                          domProps: {
                                                            value:
                                                              _vm.seller_id,
                                                          },
                                                          on: {
                                                            input: function (
                                                              $event
                                                            ) {
                                                              if (
                                                                $event.target
                                                                  .composing
                                                              ) {
                                                                return
                                                              }
                                                              _vm.seller_id =
                                                                $event.target.value
                                                            },
                                                          },
                                                        }),
                                                      ]
                                                    : [
                                                        _c(
                                                          "div",
                                                          {
                                                            staticClass:
                                                              "col-md-6",
                                                          },
                                                          [
                                                            _c(
                                                              "div",
                                                              {
                                                                staticClass:
                                                                  "form-group mb-3",
                                                              },
                                                              [
                                                                _c(
                                                                  "label",
                                                                  {
                                                                    staticClass:
                                                                      "control-label",
                                                                    attrs: {
                                                                      for: "seller_id",
                                                                    },
                                                                  },
                                                                  [
                                                                    _vm._v(
                                                                      _vm._s(
                                                                        _vm.__(
                                                                          "seller"
                                                                        )
                                                                      ) + " "
                                                                    ),
                                                                    _c(
                                                                      "i",
                                                                      {
                                                                        staticClass:
                                                                          "text-danger",
                                                                      },
                                                                      [
                                                                        _vm._v(
                                                                          "*"
                                                                        ),
                                                                      ]
                                                                    ),
                                                                  ]
                                                                ),
                                                                _vm._v(" "),
                                                                _c(
                                                                  "select",
                                                                  {
                                                                    directives:
                                                                      [
                                                                        {
                                                                          name: "model",
                                                                          rawName:
                                                                            "v-model",
                                                                          value:
                                                                            _vm.seller_id,
                                                                          expression:
                                                                            "seller_id",
                                                                        },
                                                                      ],
                                                                    staticClass:
                                                                      "form-control form-select",
                                                                    attrs: {
                                                                      id: "seller_id",
                                                                      name: "seller_id",
                                                                      required:
                                                                        "",
                                                                    },
                                                                    on: {
                                                                      change: [
                                                                        function (
                                                                          $event
                                                                        ) {
                                                                          var $$selectedVal =
                                                                            Array.prototype.filter
                                                                              .call(
                                                                                $event
                                                                                  .target
                                                                                  .options,
                                                                                function (
                                                                                  o
                                                                                ) {
                                                                                  return o.selected
                                                                                }
                                                                              )
                                                                              .map(
                                                                                function (
                                                                                  o
                                                                                ) {
                                                                                  var val =
                                                                                    "_value" in
                                                                                    o
                                                                                      ? o._value
                                                                                      : o.value
                                                                                  return val
                                                                                }
                                                                              )
                                                                          _vm.seller_id =
                                                                            $event
                                                                              .target
                                                                              .multiple
                                                                              ? $$selectedVal
                                                                              : $$selectedVal[0]
                                                                        },
                                                                        function (
                                                                          $event
                                                                        ) {
                                                                          _vm.getSellerCategories()
                                                                          _vm.getSeller()
                                                                        },
                                                                      ],
                                                                    },
                                                                  },
                                                                  [
                                                                    _c(
                                                                      "option",
                                                                      {
                                                                        attrs: {
                                                                          value:
                                                                            "",
                                                                        },
                                                                      },
                                                                      [
                                                                        _vm._v(
                                                                          _vm._s(
                                                                            _vm.__(
                                                                              "select_seller"
                                                                            )
                                                                          )
                                                                        ),
                                                                      ]
                                                                    ),
                                                                    _vm._v(" "),
                                                                    _vm._l(
                                                                      _vm.translatedSellers,
                                                                      function (
                                                                        seller
                                                                      ) {
                                                                        return _c(
                                                                          "option",
                                                                          {
                                                                            domProps:
                                                                              {
                                                                                value:
                                                                                  seller.id,
                                                                              },
                                                                          },
                                                                          [
                                                                            _vm._v(
                                                                              _vm._s(
                                                                                seller.name
                                                                              ) +
                                                                                "\n                                                                    "
                                                                            ),
                                                                          ]
                                                                        )
                                                                      }
                                                                    ),
                                                                  ],
                                                                  2
                                                                ),
                                                              ]
                                                            ),
                                                          ]
                                                        ),
                                                      ],
                                                  _vm._v(" "),
                                                  _c(
                                                    "div",
                                                    { staticClass: "col-md-6" },
                                                    [
                                                      _c(
                                                        "div",
                                                        {
                                                          staticClass:
                                                            "form-group mb-3",
                                                        },
                                                        [
                                                          _c(
                                                            "label",
                                                            {
                                                              attrs: {
                                                                for: "tax_id",
                                                              },
                                                            },
                                                            [
                                                              _vm._v(
                                                                _vm._s(
                                                                  _vm.__("tax")
                                                                )
                                                              ),
                                                            ]
                                                          ),
                                                          _vm._v(" "),
                                                          _c(
                                                            "select",
                                                            {
                                                              directives: [
                                                                {
                                                                  name: "model",
                                                                  rawName:
                                                                    "v-model",
                                                                  value:
                                                                    _vm.tax_id,
                                                                  expression:
                                                                    "tax_id",
                                                                },
                                                              ],
                                                              staticClass:
                                                                "form-control",
                                                              attrs: {
                                                                id: "tax_id",
                                                                name: "tax_id",
                                                              },
                                                              on: {
                                                                change:
                                                                  function (
                                                                    $event
                                                                  ) {
                                                                    var $$selectedVal =
                                                                      Array.prototype.filter
                                                                        .call(
                                                                          $event
                                                                            .target
                                                                            .options,
                                                                          function (
                                                                            o
                                                                          ) {
                                                                            return o.selected
                                                                          }
                                                                        )
                                                                        .map(
                                                                          function (
                                                                            o
                                                                          ) {
                                                                            var val =
                                                                              "_value" in
                                                                              o
                                                                                ? o._value
                                                                                : o.value
                                                                            return val
                                                                          }
                                                                        )
                                                                    _vm.tax_id =
                                                                      $event
                                                                        .target
                                                                        .multiple
                                                                        ? $$selectedVal
                                                                        : $$selectedVal[0]
                                                                  },
                                                              },
                                                            },
                                                            [
                                                              _c(
                                                                "option",
                                                                {
                                                                  attrs: {
                                                                    value: "0",
                                                                  },
                                                                },
                                                                [
                                                                  _vm._v(
                                                                    _vm._s(
                                                                      _vm.__(
                                                                        "select_tax"
                                                                      )
                                                                    )
                                                                  ),
                                                                ]
                                                              ),
                                                              _vm._v(" "),
                                                              _vm._l(
                                                                _vm.translatedTaxes,
                                                                function (tax) {
                                                                  return _c(
                                                                    "option",
                                                                    {
                                                                      domProps:
                                                                        {
                                                                          value:
                                                                            tax.id,
                                                                        },
                                                                    },
                                                                    [
                                                                      _vm._v(
                                                                        "\n                                                                    " +
                                                                          _vm._s(
                                                                            tax.title
                                                                          ) +
                                                                          "\n                                                                    (" +
                                                                          _vm._s(
                                                                            tax.percentage
                                                                          ) +
                                                                          " %)"
                                                                      ),
                                                                    ]
                                                                  )
                                                                }
                                                              ),
                                                            ],
                                                            2
                                                          ),
                                                        ]
                                                      ),
                                                    ]
                                                  ),
                                                  _vm._v(" "),
                                                  _c(
                                                    "div",
                                                    { staticClass: "col-md-6" },
                                                    [
                                                      _c(
                                                        "div",
                                                        {
                                                          staticClass:
                                                            "form-group mb-3",
                                                        },
                                                        [
                                                          _c(
                                                            "label",
                                                            {
                                                              attrs: {
                                                                for: "brands",
                                                              },
                                                            },
                                                            [
                                                              _vm._v(
                                                                _vm._s(
                                                                  _vm.__(
                                                                    "brands"
                                                                  )
                                                                )
                                                              ),
                                                            ]
                                                          ),
                                                          _vm._v(" "),
                                                          _c("multiselect", {
                                                            attrs: {
                                                              id: "brands",
                                                              options:
                                                                _vm.translatedBrands,
                                                              placeholder:
                                                                _vm.__(
                                                                  "select_and_search_brands"
                                                                ),
                                                              label: "name",
                                                              "track-by": "id",
                                                              required: "",
                                                            },
                                                            scopedSlots: _vm._u(
                                                              [
                                                                {
                                                                  key: "singleLabel",
                                                                  fn: function (
                                                                    props
                                                                  ) {
                                                                    return [
                                                                      _c(
                                                                        "span",
                                                                        {
                                                                          staticClass:
                                                                            "option__desc",
                                                                        },
                                                                        [
                                                                          _c(
                                                                            "span",
                                                                            {
                                                                              staticClass:
                                                                                "option__title",
                                                                            },
                                                                            [
                                                                              _vm._v(
                                                                                _vm._s(
                                                                                  props
                                                                                    .option
                                                                                    .name
                                                                                )
                                                                              ),
                                                                            ]
                                                                          ),
                                                                        ]
                                                                      ),
                                                                    ]
                                                                  },
                                                                },
                                                                {
                                                                  key: "option",
                                                                  fn: function (
                                                                    props
                                                                  ) {
                                                                    return [
                                                                      _c(
                                                                        "div",
                                                                        {
                                                                          staticClass:
                                                                            "option__desc",
                                                                        },
                                                                        [
                                                                          _c(
                                                                            "span",
                                                                            {
                                                                              staticClass:
                                                                                "option__small",
                                                                            },
                                                                            [
                                                                              _c(
                                                                                "img",
                                                                                {
                                                                                  staticClass:
                                                                                    "option__image",
                                                                                  staticStyle:
                                                                                    {
                                                                                      height:
                                                                                        "25px",
                                                                                    },
                                                                                  attrs:
                                                                                    {
                                                                                      src: props
                                                                                        .option
                                                                                        .image_url,
                                                                                      alt: "Brand Logo",
                                                                                    },
                                                                                }
                                                                              ),
                                                                            ]
                                                                          ),
                                                                          _vm._v(
                                                                            " "
                                                                          ),
                                                                          _c(
                                                                            "span",
                                                                            {
                                                                              staticClass:
                                                                                "option__title",
                                                                            },
                                                                            [
                                                                              _vm._v(
                                                                                _vm._s(
                                                                                  props
                                                                                    .option
                                                                                    .name
                                                                                )
                                                                              ),
                                                                            ]
                                                                          ),
                                                                        ]
                                                                      ),
                                                                    ]
                                                                  },
                                                                },
                                                              ],
                                                              null,
                                                              true
                                                            ),
                                                            model: {
                                                              value: _vm.brand,
                                                              callback:
                                                                function ($$v) {
                                                                  _vm.brand =
                                                                    $$v
                                                                },
                                                              expression:
                                                                "brand",
                                                            },
                                                          }),
                                                        ],
                                                        1
                                                      ),
                                                    ]
                                                  ),
                                                  _vm._v(" "),
                                                  _vm.addonGroupOptions.length
                                                    ? _c(
                                                        "div",
                                                        {
                                                          staticClass:
                                                            "col-md-12",
                                                        },
                                                        [
                                                          _c(
                                                            "div",
                                                            {
                                                              staticClass:
                                                                "form-group mb-3",
                                                            },
                                                            [
                                                              _c(
                                                                "label",
                                                                {
                                                                  attrs: {
                                                                    for: "addon_groups",
                                                                  },
                                                                },
                                                                [
                                                                  _vm._v(
                                                                    _vm._s(
                                                                      _vm.__(
                                                                        "addons"
                                                                      ) ||
                                                                        "Addons"
                                                                    )
                                                                  ),
                                                                ]
                                                              ),
                                                              _vm._v(" "),
                                                              _c(
                                                                "multiselect",
                                                                {
                                                                  attrs: {
                                                                    id: "addon_groups",
                                                                    options:
                                                                      _vm.addonGroupOptions,
                                                                    multiple: true,
                                                                    placeholder:
                                                                      _vm.__(
                                                                        "select_addons"
                                                                      ) ||
                                                                      "Select addon groups",
                                                                    label:
                                                                      "name",
                                                                    "track-by":
                                                                      "id",
                                                                  },
                                                                  model: {
                                                                    value:
                                                                      _vm.selectedAddonGroups,
                                                                    callback:
                                                                      function (
                                                                        $$v
                                                                      ) {
                                                                        _vm.selectedAddonGroups =
                                                                          $$v
                                                                      },
                                                                    expression:
                                                                      "selectedAddonGroups",
                                                                  },
                                                                }
                                                              ),
                                                            ],
                                                            1
                                                          ),
                                                        ]
                                                      )
                                                    : _vm._e(),
                                                  _vm._v(" "),
                                                  _c(
                                                    "div",
                                                    {
                                                      staticClass: "col-md-12",
                                                    },
                                                    [
                                                      _c(
                                                        "div",
                                                        {
                                                          staticClass:
                                                            "form-group mb-3 d-flex flex-wrap align-items-center",
                                                        },
                                                        [
                                                          _c(
                                                            "button",
                                                            {
                                                              staticClass:
                                                                "btn btn-outline-primary me-3 my-2 ai-generate-btn",
                                                              attrs: {
                                                                type: "button",
                                                                disabled:
                                                                  _vm.isGeneratingAI,
                                                              },
                                                              on: {
                                                                click:
                                                                  _vm.generateDescription,
                                                              },
                                                            },
                                                            [
                                                              _vm.isGeneratingAI
                                                                ? [
                                                                    _c("span", {
                                                                      staticClass:
                                                                        "ai-spinner me-2",
                                                                    }),
                                                                    _vm._v(" "),
                                                                    _c(
                                                                      "span",
                                                                      {
                                                                        staticClass:
                                                                          "ai-text-animate",
                                                                      },
                                                                      [
                                                                        _vm._v(
                                                                          "AI is\n                                                                        generating..."
                                                                        ),
                                                                      ]
                                                                    ),
                                                                  ]
                                                                : [
                                                                    _c("i", {
                                                                      staticClass:
                                                                        "fa fa-magic me-1",
                                                                    }),
                                                                    _vm._v(
                                                                      "\n                                                                    " +
                                                                        _vm._s(
                                                                          _vm.__(
                                                                            "generate_description_with_ai"
                                                                          )
                                                                        ) +
                                                                        "\n                                                                "
                                                                    ),
                                                                  ],
                                                            ],
                                                            2
                                                          ),
                                                          _vm._v(" "),
                                                          _c(
                                                            "label",
                                                            {
                                                              staticClass:
                                                                "my-2 d-flex align-items-center",
                                                            },
                                                            [
                                                              _c("input", {
                                                                directives: [
                                                                  {
                                                                    name: "model",
                                                                    rawName:
                                                                      "v-model",
                                                                    value:
                                                                      _vm.useCustomPrompt,
                                                                    expression:
                                                                      "useCustomPrompt",
                                                                  },
                                                                ],
                                                                staticClass:
                                                                  "me-2",
                                                                attrs: {
                                                                  type: "checkbox",
                                                                },
                                                                domProps: {
                                                                  checked:
                                                                    Array.isArray(
                                                                      _vm.useCustomPrompt
                                                                    )
                                                                      ? _vm._i(
                                                                          _vm.useCustomPrompt,
                                                                          null
                                                                        ) > -1
                                                                      : _vm.useCustomPrompt,
                                                                },
                                                                on: {
                                                                  change:
                                                                    function (
                                                                      $event
                                                                    ) {
                                                                      var $$a =
                                                                          _vm.useCustomPrompt,
                                                                        $$el =
                                                                          $event.target,
                                                                        $$c =
                                                                          $$el.checked
                                                                            ? true
                                                                            : false
                                                                      if (
                                                                        Array.isArray(
                                                                          $$a
                                                                        )
                                                                      ) {
                                                                        var $$v =
                                                                            null,
                                                                          $$i =
                                                                            _vm._i(
                                                                              $$a,
                                                                              $$v
                                                                            )
                                                                        if (
                                                                          $$el.checked
                                                                        ) {
                                                                          $$i <
                                                                            0 &&
                                                                            (_vm.useCustomPrompt =
                                                                              $$a.concat(
                                                                                [
                                                                                  $$v,
                                                                                ]
                                                                              ))
                                                                        } else {
                                                                          $$i >
                                                                            -1 &&
                                                                            (_vm.useCustomPrompt =
                                                                              $$a
                                                                                .slice(
                                                                                  0,
                                                                                  $$i
                                                                                )
                                                                                .concat(
                                                                                  $$a.slice(
                                                                                    $$i +
                                                                                      1
                                                                                  )
                                                                                ))
                                                                        }
                                                                      } else {
                                                                        _vm.useCustomPrompt =
                                                                          $$c
                                                                      }
                                                                    },
                                                                },
                                                              }),
                                                              _vm._v(" "),
                                                              _c(
                                                                "span",
                                                                {
                                                                  staticClass:
                                                                    "mt-1",
                                                                },
                                                                [
                                                                  _vm._v(
                                                                    _vm._s(
                                                                      _vm.__(
                                                                        "use_custom_prompt"
                                                                      )
                                                                    )
                                                                  ),
                                                                ]
                                                              ),
                                                            ]
                                                          ),
                                                        ]
                                                      ),
                                                    ]
                                                  ),
                                                  _vm._v(" "),
                                                  _c(
                                                    "div",
                                                    {
                                                      staticClass: "col-md-12",
                                                    },
                                                    [
                                                      _vm.useCustomPrompt
                                                        ? _c(
                                                            "div",
                                                            {
                                                              staticClass:
                                                                "form-group mb-3",
                                                            },
                                                            [
                                                              _c("label", [
                                                                _vm._v(
                                                                  _vm._s(
                                                                    _vm.__(
                                                                      "custom_prompt"
                                                                    )
                                                                  )
                                                                ),
                                                              ]),
                                                              _vm._v(" "),
                                                              _c("textarea", {
                                                                directives: [
                                                                  {
                                                                    name: "model",
                                                                    rawName:
                                                                      "v-model",
                                                                    value:
                                                                      _vm.customPrompt,
                                                                    expression:
                                                                      "customPrompt",
                                                                  },
                                                                ],
                                                                staticClass:
                                                                  "form-control",
                                                                attrs: {
                                                                  rows: "3",
                                                                  placeholder:
                                                                    _vm.__(
                                                                      "custom_prompt_placeholder_example"
                                                                    ),
                                                                },
                                                                domProps: {
                                                                  value:
                                                                    _vm.customPrompt,
                                                                },
                                                                on: {
                                                                  input:
                                                                    function (
                                                                      $event
                                                                    ) {
                                                                      if (
                                                                        $event
                                                                          .target
                                                                          .composing
                                                                      ) {
                                                                        return
                                                                      }
                                                                      _vm.customPrompt =
                                                                        $event.target.value
                                                                    },
                                                                },
                                                              }),
                                                            ]
                                                          )
                                                        : _vm._e(),
                                                    ]
                                                  ),
                                                ]
                                              : _vm._e(),
                                            _vm._v(" "),
                                            _c(
                                              "div",
                                              { staticClass: "col-md-12" },
                                              [
                                                _c(
                                                  "div",
                                                  {
                                                    staticClass:
                                                      "form-group mb-3",
                                                  },
                                                  [
                                                    _c(
                                                      "label",
                                                      {
                                                        attrs: { for: "tags" },
                                                      },
                                                      [
                                                        _vm._v(
                                                          _vm._s(
                                                            _vm.__("tags")
                                                          ) +
                                                            " (\n                                                            " +
                                                            _vm._s(
                                                              _vm.__(
                                                                "these_tags_help_you_in_search_result"
                                                              )
                                                            ) +
                                                            " )"
                                                        ),
                                                      ]
                                                    ),
                                                    _vm._v(" "),
                                                    _c("Select2", {
                                                      key:
                                                        "tags_" +
                                                        language.id +
                                                        "_" +
                                                        _vm.activeLanguageTab,
                                                      attrs: {
                                                        value:
                                                          language.is_default
                                                            ? _vm.tag_ids
                                                            : _vm
                                                                .tagIdsByLanguage[
                                                                language.id
                                                              ] || [],
                                                        placeholder:
                                                          "Select Tags",
                                                        "no-add-on-enter": "",
                                                        options:
                                                          _vm.tagsOptions,
                                                        separator: " ,;",
                                                        settings: {
                                                          tags: true,
                                                          multiple: true,
                                                          width: "100%",
                                                          dropdownParent:
                                                            "#mymodal",
                                                          tokenSeparators: [
                                                            ",",
                                                            ";",
                                                          ],
                                                          placeholder:
                                                            _vm.__(
                                                              "enter_product_tag"
                                                            ),
                                                        },
                                                      },
                                                      on: {
                                                        input: function (
                                                          $event
                                                        ) {
                                                          return _vm.handleTagInput(
                                                            language.id,
                                                            $event
                                                          )
                                                        },
                                                        change: function (
                                                          $event
                                                        ) {
                                                          return _vm.handleTagInput(
                                                            language.id,
                                                            $event
                                                          )
                                                        },
                                                      },
                                                    }),
                                                  ],
                                                  1
                                                ),
                                              ]
                                            ),
                                            _vm._v(" "),
                                            _c(
                                              "div",
                                              { staticClass: "col-md-12" },
                                              [
                                                _c(
                                                  "div",
                                                  {
                                                    staticClass:
                                                      "form-group mb-3",
                                                  },
                                                  [
                                                    _c("label", [
                                                      _vm._v(
                                                        _vm._s(
                                                          _vm.__("description")
                                                        ) + " "
                                                      ),
                                                      language.is_default
                                                        ? _c(
                                                            "i",
                                                            {
                                                              staticClass:
                                                                "text-danger",
                                                            },
                                                            [_vm._v("*")]
                                                          )
                                                        : _vm._e(),
                                                    ]),
                                                    _vm._v(" "),
                                                    _c("editor", {
                                                      attrs: {
                                                        placeholder: _vm.__(
                                                          "enter_product_description"
                                                        ),
                                                        init: _vm.getEditorConfig(),
                                                      },
                                                      on: {
                                                        input: function (
                                                          $event
                                                        ) {
                                                          return _vm.handleDefaultLanguageInput(
                                                            "description",
                                                            language
                                                          )
                                                        },
                                                      },
                                                      model: {
                                                        value:
                                                          _vm.translations[
                                                            language.id
                                                          ].description,
                                                        callback: function (
                                                          $$v
                                                        ) {
                                                          _vm.$set(
                                                            _vm.translations[
                                                              language.id
                                                            ],
                                                            "description",
                                                            $$v
                                                          )
                                                        },
                                                        expression:
                                                          "translations[language.id].description",
                                                      },
                                                    }),
                                                  ],
                                                  1
                                                ),
                                              ]
                                            ),
                                            _vm._v(" "),
                                            !language.is_default
                                              ? _c(
                                                  "div",
                                                  { staticClass: "col-md-6" },
                                                  [
                                                    _c(
                                                      "div",
                                                      {
                                                        staticClass:
                                                          "form-group mb-3",
                                                      },
                                                      [
                                                        _c("label", [
                                                          _vm._v(
                                                            _vm._s(
                                                              _vm.__(
                                                                "manufacturer"
                                                              )
                                                            )
                                                          ),
                                                        ]),
                                                        _vm._v(" "),
                                                        _c("input", {
                                                          directives: [
                                                            {
                                                              name: "model",
                                                              rawName:
                                                                "v-model",
                                                              value:
                                                                _vm
                                                                  .translations[
                                                                  language.id
                                                                ].manufacturer,
                                                              expression:
                                                                "translations[language.id].manufacturer",
                                                            },
                                                          ],
                                                          staticClass:
                                                            "form-control",
                                                          attrs: {
                                                            type: "text",
                                                            placeholder:
                                                              _vm.__(
                                                                "enter_manufacturer"
                                                              ),
                                                          },
                                                          domProps: {
                                                            value:
                                                              _vm.translations[
                                                                language.id
                                                              ].manufacturer,
                                                          },
                                                          on: {
                                                            input: function (
                                                              $event
                                                            ) {
                                                              if (
                                                                $event.target
                                                                  .composing
                                                              ) {
                                                                return
                                                              }
                                                              _vm.$set(
                                                                _vm
                                                                  .translations[
                                                                  language.id
                                                                ],
                                                                "manufacturer",
                                                                $event.target
                                                                  .value
                                                              )
                                                            },
                                                          },
                                                        }),
                                                      ]
                                                    ),
                                                  ]
                                                )
                                              : _vm._e(),
                                          ],
                                          2
                                        ),
                                      ])
                                    : _vm._e(),
                                ]
                              )
                            }),
                            1
                          ),
                        ],
                        1
                      )
                    : _vm.isLoadingLanguages
                    ? _c(
                        "div",
                        { staticClass: "text-center p-3 mb-3" },
                        [
                          _c("b-spinner", {
                            attrs: { label: "Loading languages..." },
                          }),
                        ],
                        1
                      )
                    : _vm._e(),
                ]),
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "card" }, [
                _c("div", { staticClass: "card-header" }, [
                  _c("h4", [_vm._v(_vm._s(_vm.__("seo_settings")))]),
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "card-body" }, [
                  _vm.languages.length > 0
                    ? _c(
                        "div",
                        { staticClass: "col-md-12 mb-3" },
                        [
                          _c(
                            "b-tabs",
                            {
                              attrs: { "content-class": "mt-3" },
                              model: {
                                value: _vm.activeLanguageTab,
                                callback: function ($$v) {
                                  _vm.activeLanguageTab = $$v
                                },
                                expression: "activeLanguageTab",
                              },
                            },
                            _vm._l(_vm.languages, function (language) {
                              return _c(
                                "b-tab",
                                {
                                  key: language.id,
                                  attrs: { title: language.name, lazy: "" },
                                  scopedSlots: _vm._u(
                                    [
                                      {
                                        key: "title",
                                        fn: function () {
                                          return [
                                            _c(
                                              "span",
                                              {
                                                class: {
                                                  "text-primary font-weight-bold":
                                                    language.is_default,
                                                },
                                              },
                                              [
                                                _vm._v(
                                                  "\n                                                " +
                                                    _vm._s(language.name) +
                                                    "\n                                            "
                                                ),
                                              ]
                                            ),
                                          ]
                                        },
                                        proxy: true,
                                      },
                                    ],
                                    null,
                                    true
                                  ),
                                },
                                [
                                  _vm._v(" "),
                                  _vm.translations[language.id]
                                    ? _c("div", [
                                        _c("div", { staticClass: "row" }, [
                                          _c(
                                            "div",
                                            { staticClass: "col-md-6" },
                                            [
                                              _c(
                                                "div",
                                                {
                                                  staticClass:
                                                    "form-group mb-3",
                                                },
                                                [
                                                  _c("label", [
                                                    _vm._v(
                                                      _vm._s(
                                                        _vm.__("meta_title")
                                                      ) + " "
                                                    ),
                                                  ]),
                                                  _vm._v(" "),
                                                  _c("input", {
                                                    directives: [
                                                      {
                                                        name: "model",
                                                        rawName: "v-model",
                                                        value:
                                                          _vm.translations[
                                                            language.id
                                                          ].meta_title,
                                                        expression:
                                                          "translations[language.id].meta_title",
                                                      },
                                                    ],
                                                    staticClass: "form-control",
                                                    attrs: {
                                                      type: "text",
                                                      placeholder:
                                                        _vm.__(
                                                          "enter_meta_title"
                                                        ),
                                                    },
                                                    domProps: {
                                                      value:
                                                        _vm.translations[
                                                          language.id
                                                        ].meta_title,
                                                    },
                                                    on: {
                                                      input: [
                                                        function ($event) {
                                                          if (
                                                            $event.target
                                                              .composing
                                                          ) {
                                                            return
                                                          }
                                                          _vm.$set(
                                                            _vm.translations[
                                                              language.id
                                                            ],
                                                            "meta_title",
                                                            $event.target.value
                                                          )
                                                        },
                                                        function ($event) {
                                                          return _vm.handleDefaultLanguageInput(
                                                            "meta_title",
                                                            language
                                                          )
                                                        },
                                                      ],
                                                    },
                                                  }),
                                                ]
                                              ),
                                              _vm._v(" "),
                                              _c(
                                                "div",
                                                {
                                                  staticClass:
                                                    "form-group mb-3",
                                                },
                                                [
                                                  _c("label", [
                                                    _vm._v(
                                                      _vm._s(
                                                        _vm.__("meta_keywords")
                                                      ) + " "
                                                    ),
                                                  ]),
                                                  _vm._v(" "),
                                                  _c("input", {
                                                    directives: [
                                                      {
                                                        name: "model",
                                                        rawName: "v-model",
                                                        value:
                                                          _vm.translations[
                                                            language.id
                                                          ].meta_keywords,
                                                        expression:
                                                          "translations[language.id].meta_keywords",
                                                      },
                                                    ],
                                                    staticClass: "form-control",
                                                    attrs: {
                                                      type: "text",
                                                      placeholder: _vm.__(
                                                        "enter_meta_keywords"
                                                      ),
                                                    },
                                                    domProps: {
                                                      value:
                                                        _vm.translations[
                                                          language.id
                                                        ].meta_keywords,
                                                    },
                                                    on: {
                                                      input: [
                                                        function ($event) {
                                                          if (
                                                            $event.target
                                                              .composing
                                                          ) {
                                                            return
                                                          }
                                                          _vm.$set(
                                                            _vm.translations[
                                                              language.id
                                                            ],
                                                            "meta_keywords",
                                                            $event.target.value
                                                          )
                                                        },
                                                        function ($event) {
                                                          return _vm.handleDefaultLanguageInput(
                                                            "meta_keywords",
                                                            language
                                                          )
                                                        },
                                                      ],
                                                    },
                                                  }),
                                                ]
                                              ),
                                              _vm._v(" "),
                                              _c(
                                                "div",
                                                {
                                                  staticClass:
                                                    "form-group mb-3",
                                                },
                                                [
                                                  _c("label", [
                                                    _vm._v(
                                                      _vm._s(
                                                        _vm.__("schema_markup")
                                                      ) + " "
                                                    ),
                                                  ]),
                                                  _vm._v(" "),
                                                  _c("input", {
                                                    directives: [
                                                      {
                                                        name: "model",
                                                        rawName: "v-model",
                                                        value:
                                                          _vm.translations[
                                                            language.id
                                                          ].schema_markup,
                                                        expression:
                                                          "translations[language.id].schema_markup",
                                                      },
                                                    ],
                                                    staticClass: "form-control",
                                                    attrs: {
                                                      type: "text",
                                                      placeholder: _vm.__(
                                                        "enter_schema_markup"
                                                      ),
                                                    },
                                                    domProps: {
                                                      value:
                                                        _vm.translations[
                                                          language.id
                                                        ].schema_markup,
                                                    },
                                                    on: {
                                                      input: [
                                                        function ($event) {
                                                          if (
                                                            $event.target
                                                              .composing
                                                          ) {
                                                            return
                                                          }
                                                          _vm.$set(
                                                            _vm.translations[
                                                              language.id
                                                            ],
                                                            "schema_markup",
                                                            $event.target.value
                                                          )
                                                        },
                                                        function ($event) {
                                                          return _vm.handleDefaultLanguageInput(
                                                            "schema_markup",
                                                            language
                                                          )
                                                        },
                                                      ],
                                                    },
                                                  }),
                                                ]
                                              ),
                                            ]
                                          ),
                                          _vm._v(" "),
                                          _c(
                                            "div",
                                            { staticClass: "col-md-6" },
                                            [
                                              _c(
                                                "div",
                                                {
                                                  staticClass:
                                                    "form-group mb-3",
                                                },
                                                [
                                                  _c("label", [
                                                    _vm._v(
                                                      _vm._s(
                                                        _vm.__(
                                                          "meta_description"
                                                        )
                                                      ) + " "
                                                    ),
                                                  ]),
                                                  _vm._v(" "),
                                                  _c("textarea", {
                                                    directives: [
                                                      {
                                                        name: "model",
                                                        rawName: "v-model",
                                                        value:
                                                          _vm.translations[
                                                            language.id
                                                          ].meta_description,
                                                        expression:
                                                          "translations[language.id].meta_description",
                                                      },
                                                    ],
                                                    staticClass: "form-control",
                                                    attrs: {
                                                      type: "text",
                                                      placeholder: _vm.__(
                                                        "enter_meta_description"
                                                      ),
                                                      rows: "4",
                                                    },
                                                    domProps: {
                                                      value:
                                                        _vm.translations[
                                                          language.id
                                                        ].meta_description,
                                                    },
                                                    on: {
                                                      input: [
                                                        function ($event) {
                                                          if (
                                                            $event.target
                                                              .composing
                                                          ) {
                                                            return
                                                          }
                                                          _vm.$set(
                                                            _vm.translations[
                                                              language.id
                                                            ],
                                                            "meta_description",
                                                            $event.target.value
                                                          )
                                                        },
                                                        function ($event) {
                                                          return _vm.handleDefaultLanguageInput(
                                                            "meta_description",
                                                            language
                                                          )
                                                        },
                                                      ],
                                                    },
                                                  }),
                                                ]
                                              ),
                                            ]
                                          ),
                                        ]),
                                      ])
                                    : _vm._e(),
                                ]
                              )
                            }),
                            1
                          ),
                        ],
                        1
                      )
                    : _vm._e(),
                ]),
                _vm._v(" "),
                _vm.languages.length > 0 &&
                _vm.languages[_vm.activeLanguageTab] &&
                !_vm.languages[_vm.activeLanguageTab].is_default
                  ? _c(
                      "div",
                      { staticClass: "card-footer" },
                      [
                        _c(
                          "b-button",
                          {
                            attrs: {
                              type: "submit",
                              variant: "primary",
                              disabled: _vm.isLoading,
                            },
                            on: {
                              keydown: function ($event) {
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
                                return _vm.saveRecord.apply(null, arguments)
                              },
                            },
                          },
                          [
                            _vm._v(
                              " " +
                                _vm._s(_vm.__("save")) +
                                "\n                                "
                            ),
                            _vm.isLoading
                              ? _c("b-spinner", {
                                  attrs: { small: "", label: "Spinning" },
                                })
                              : _vm._e(),
                          ],
                          1
                        ),
                        _vm._v(" "),
                        _c(
                          "button",
                          {
                            staticClass: "btn btn-danger",
                            attrs: { type: "button" },
                            on: { click: _vm.clearForm },
                          },
                          [_vm._v(_vm._s(_vm.__("clear")))]
                        ),
                      ],
                      1
                    )
                  : _vm._e(),
              ]),
              _vm._v(" "),
              _vm.languages.length > 0 &&
              _vm.languages[_vm.activeLanguageTab] &&
              _vm.languages[_vm.activeLanguageTab].is_default
                ? _c("div", { staticClass: "card" }, [
                    _c("div", { staticClass: "card-header" }, [
                      _c("h4", [_vm._v(_vm._s(_vm.__("product_settings")))]),
                    ]),
                    _vm._v(" "),
                    _c("div", { staticClass: "card-body" }, [
                      _c("div", { staticClass: "row" }, [
                        _c("div", { staticClass: "col-md-4" }, [
                          _c(
                            "div",
                            { staticClass: "form-group mb-3" },
                            [
                              _c("label", [
                                _vm._v(_vm._s(_vm.__("category")) + " "),
                                _c("i", { staticClass: "text-danger" }, [
                                  _vm._v("*"),
                                ]),
                              ]),
                              _vm._v(" "),
                              _c("Select2", {
                                attrs: {
                                  options: _vm.categoryOptionsArray,
                                  disabled: !_vm.seller_id && !_vm.isSellerRole,
                                  placeholder: _vm.__("select_category"),
                                  settings: {
                                    width: "100%",
                                    dropdownParent: "#mymodal",
                                  },
                                },
                                model: {
                                  value: _vm.category_id,
                                  callback: function ($$v) {
                                    _vm.category_id = $$v
                                  },
                                  expression: "category_id",
                                },
                              }),
                            ],
                            1
                          ),
                        ]),
                        _vm._v(" "),
                        _c(
                          "div",
                          { staticClass: "col-md-4" },
                          [
                            _vm.isSellerRole
                              ? [
                                  _c("input", {
                                    directives: [
                                      {
                                        name: "model",
                                        rawName: "v-model",
                                        value: _vm.is_approved,
                                        expression: "is_approved",
                                      },
                                    ],
                                    attrs: { type: "hidden" },
                                    domProps: { value: _vm.is_approved },
                                    on: {
                                      input: function ($event) {
                                        if ($event.target.composing) {
                                          return
                                        }
                                        _vm.is_approved = $event.target.value
                                      },
                                    },
                                  }),
                                ]
                              : [
                                  _c(
                                    "div",
                                    { staticClass: "form-group mb-3" },
                                    [
                                      _c("label", [
                                        _vm._v(
                                          _vm._s(_vm.__("product_status"))
                                        ),
                                      ]),
                                      _c("br"),
                                      _vm._v(" "),
                                      _c(
                                        "div",
                                        {
                                          staticClass: "btn-group",
                                          attrs: { id: "status" },
                                        },
                                        [
                                          _c(
                                            "label",
                                            {
                                              staticClass: "btn btn-primary",
                                              attrs: {
                                                "data-toggle-class":
                                                  "btn-primary",
                                                "data-toggle-passive-class":
                                                  "btn-default",
                                              },
                                            },
                                            [
                                              _c("input", {
                                                directives: [
                                                  {
                                                    name: "model",
                                                    rawName: "v-model",
                                                    value: _vm.is_approved,
                                                    expression: "is_approved",
                                                  },
                                                ],
                                                attrs: {
                                                  type: "radio",
                                                  value: "1",
                                                },
                                                domProps: {
                                                  checked: _vm._q(
                                                    _vm.is_approved,
                                                    "1"
                                                  ),
                                                },
                                                on: {
                                                  change: function ($event) {
                                                    _vm.is_approved = "1"
                                                  },
                                                },
                                              }),
                                              _vm._v(
                                                " " +
                                                  _vm._s(_vm.__("approved")) +
                                                  "\n                                                "
                                              ),
                                            ]
                                          ),
                                          _vm._v(" "),
                                          _c(
                                            "label",
                                            {
                                              staticClass: "btn btn-danger",
                                              attrs: {
                                                "data-toggle-class":
                                                  "btn-danger",
                                                "data-toggle-passive-class":
                                                  "btn-default",
                                              },
                                            },
                                            [
                                              _c("input", {
                                                directives: [
                                                  {
                                                    name: "model",
                                                    rawName: "v-model",
                                                    value: _vm.is_approved,
                                                    expression: "is_approved",
                                                  },
                                                ],
                                                attrs: {
                                                  type: "radio",
                                                  value: "0",
                                                },
                                                domProps: {
                                                  checked: _vm._q(
                                                    _vm.is_approved,
                                                    "0"
                                                  ),
                                                },
                                                on: {
                                                  change: function ($event) {
                                                    _vm.is_approved = "0"
                                                  },
                                                },
                                              }),
                                              _vm._v(
                                                "\n                                                    " +
                                                  _vm._s(
                                                    _vm.__("not_approved")
                                                  ) +
                                                  "\n                                                "
                                              ),
                                            ]
                                          ),
                                        ]
                                      ),
                                    ]
                                  ),
                                ],
                          ],
                          2
                        ),
                        _vm._v(" "),
                        _c("div", { staticClass: "col-md-6" }, [
                          _c("div", { staticClass: "form-group mb-3" }, [
                            _c("label", { attrs: { for: "manufacturer" } }, [
                              _vm._v(_vm._s(_vm.__("manufacturer")) + " "),
                            ]),
                            _vm._v(" "),
                            _c("input", {
                              directives: [
                                {
                                  name: "model",
                                  rawName: "v-model",
                                  value: _vm.manufacturer,
                                  expression: "manufacturer",
                                },
                              ],
                              staticClass: "form-control",
                              attrs: {
                                type: "text",
                                id: "manufacturer",
                                placeholder: _vm.__("enter_manufacturer"),
                              },
                              domProps: { value: _vm.manufacturer },
                              on: {
                                input: function ($event) {
                                  if ($event.target.composing) {
                                    return
                                  }
                                  _vm.manufacturer = $event.target.value
                                },
                              },
                            }),
                          ]),
                        ]),
                        _vm._v(" "),
                        _c("div", { staticClass: "col-md-6" }, [
                          _c(
                            "div",
                            { staticClass: "form-group mb-3" },
                            [
                              _c("label", { attrs: { for: "made_in" } }, [
                                _vm._v(_vm._s(_vm.__("made_in"))),
                              ]),
                              _vm._v(" "),
                              _c("multiselect", {
                                attrs: {
                                  id: "made_in",
                                  options: _vm.countries,
                                  placeholder: _vm.__(
                                    "select_and_search_country_name"
                                  ),
                                  label: "name",
                                  "track-by": "name",
                                  required: "",
                                },
                                scopedSlots: _vm._u(
                                  [
                                    {
                                      key: "singleLabel",
                                      fn: function (props) {
                                        return [
                                          _c(
                                            "span",
                                            { staticClass: "option__desc" },
                                            [
                                              _c(
                                                "span",
                                                {
                                                  staticClass: "option__title",
                                                },
                                                [
                                                  _vm._v(
                                                    _vm._s(props.option.name)
                                                  ),
                                                ]
                                              ),
                                            ]
                                          ),
                                        ]
                                      },
                                    },
                                    {
                                      key: "option",
                                      fn: function (props) {
                                        return [
                                          _c(
                                            "div",
                                            { staticClass: "option__desc" },
                                            [
                                              _c(
                                                "span",
                                                {
                                                  staticClass: "option__title",
                                                },
                                                [
                                                  _vm._v(
                                                    _vm._s(props.option.name)
                                                  ),
                                                ]
                                              ),
                                              _vm._v(" "),
                                              _c(
                                                "span",
                                                {
                                                  staticClass: "option__small",
                                                },
                                                [
                                                  _vm._v(
                                                    "[" +
                                                      _vm._s(
                                                        props.option.code
                                                      ) +
                                                      "]"
                                                  ),
                                                ]
                                              ),
                                            ]
                                          ),
                                        ]
                                      },
                                    },
                                  ],
                                  null,
                                  false,
                                  2573689547
                                ),
                                model: {
                                  value: _vm.made_in,
                                  callback: function ($$v) {
                                    _vm.made_in = $$v
                                  },
                                  expression: "made_in",
                                },
                              }),
                            ],
                            1
                          ),
                        ]),
                        _vm._v(" "),
                        _c("div", { staticClass: "col-md-4" }, [
                          _c("div", { staticClass: "form-group mb-3" }, [
                            _c("label", { attrs: { for: "barcode" } }, [
                              _vm._v(_vm._s(_vm.__("barcode"))),
                            ]),
                            _vm._v(" "),
                            _c("input", {
                              directives: [
                                {
                                  name: "model",
                                  rawName: "v-model",
                                  value: _vm.barcode,
                                  expression: "barcode",
                                },
                              ],
                              staticClass: "form-control",
                              attrs: {
                                type: "text",
                                id: "barcode",
                                placeholder: _vm.__("barcode"),
                              },
                              domProps: { value: _vm.barcode },
                              on: {
                                input: [
                                  function ($event) {
                                    if ($event.target.composing) {
                                      return
                                    }
                                    _vm.barcode = $event.target.value
                                  },
                                  _vm.validateBarcode,
                                ],
                              },
                            }),
                            _vm._v(" "),
                            _vm.validationBarcodeMessage
                              ? _c(
                                  "p",
                                  { staticStyle: { color: "red !important" } },
                                  [_vm._v(_vm._s(_vm.validationBarcodeMessage))]
                                )
                              : _vm.isBarcodeValid
                              ? _c(
                                  "p",
                                  {
                                    staticStyle: { color: "green !important" },
                                  },
                                  [
                                    _vm._v(
                                      "Barcode is valid!\n                                        "
                                    ),
                                  ]
                                )
                              : _vm._e(),
                          ]),
                        ]),
                        _vm._v(" "),
                        _c("div", { staticClass: "col-md-4" }, [
                          _c("div", { staticClass: "form-group mb-3" }, [
                            _c(
                              "label",
                              { attrs: { for: "max_allowed_quantity" } },
                              [
                                _vm._v(
                                  _vm._s(_vm.__("total_allowed_quantity")) +
                                    " (" +
                                    _vm._s(
                                      _vm.__("keep_blank_if_no_such_limit")
                                    ) +
                                    ") "
                                ),
                              ]
                            ),
                            _vm._v(" "),
                            _c("input", {
                              directives: [
                                {
                                  name: "model",
                                  rawName: "v-model",
                                  value: _vm.max_allowed_quantity,
                                  expression: "max_allowed_quantity",
                                },
                              ],
                              staticClass: "form-control",
                              attrs: {
                                type: "number",
                                id: "max_allowed_quantity",
                                min: "0",
                              },
                              domProps: { value: _vm.max_allowed_quantity },
                              on: {
                                input: function ($event) {
                                  if ($event.target.composing) {
                                    return
                                  }
                                  _vm.max_allowed_quantity = $event.target.value
                                },
                              },
                            }),
                          ]),
                        ]),
                        _vm._v(" "),
                        _c("div", { staticClass: "col-md-4" }, [
                          _c(
                            "div",
                            {
                              staticClass:
                                "form-group mb-3 d-flex flex-wrap align-items-start gap-2",
                            },
                            [
                              _c(
                                "div",
                                [
                                  _c("label", [
                                    _vm._v(_vm._s(_vm.__("is_returnable"))),
                                  ]),
                                  _c("br"),
                                  _vm._v(" "),
                                  _c("b-form-radio-group", {
                                    attrs: {
                                      options: [
                                        { text: _vm.__("no"), value: 0 },
                                        { text: _vm.__("yes"), value: 1 },
                                      ],
                                      buttons: "",
                                      "button-variant": "outline-primary",
                                      required: "",
                                    },
                                    model: {
                                      value: _vm.return_status,
                                      callback: function ($$v) {
                                        _vm.return_status = $$v
                                      },
                                      expression: "return_status",
                                    },
                                  }),
                                ],
                                1
                              ),
                              _vm._v(" "),
                              _vm.return_status == 1
                                ? _c("div", { staticClass: "ms-2" }, [
                                    _c(
                                      "label",
                                      { attrs: { for: "return_day" } },
                                      [
                                        _vm._v(
                                          _vm._s(_vm.__("max_return_days"))
                                        ),
                                      ]
                                    ),
                                    _vm._v(" "),
                                    _c("input", {
                                      directives: [
                                        {
                                          name: "model",
                                          rawName: "v-model",
                                          value: _vm.return_days,
                                          expression: "return_days",
                                        },
                                      ],
                                      staticClass: "form-control",
                                      attrs: {
                                        type: "number",
                                        step: "any",
                                        min: _vm.return_status == 1 ? 1 : 0,
                                        required:
                                          _vm.return_status == 1
                                            ? true
                                            : undefined,
                                        id: "return_day",
                                        placeholder: _vm.__(
                                          "number_of_days_to_return"
                                        ),
                                      },
                                      domProps: { value: _vm.return_days },
                                      on: {
                                        input: function ($event) {
                                          if ($event.target.composing) {
                                            return
                                          }
                                          _vm.return_days = $event.target.value
                                        },
                                      },
                                    }),
                                  ])
                                : _vm._e(),
                            ]
                          ),
                        ]),
                        _vm._v(" "),
                        _c("div", { staticClass: "col-md-4" }, [
                          _c(
                            "div",
                            {
                              staticClass:
                                "form-group mb-3 d-flex flex-wrap align-items-start gap-2",
                            },
                            [
                              _c(
                                "div",
                                [
                                  _c("label", [
                                    _vm._v(_vm._s(_vm.__("is_cancelable"))),
                                  ]),
                                  _c("br"),
                                  _vm._v(" "),
                                  _c("b-form-radio-group", {
                                    attrs: {
                                      options: [
                                        { text: _vm.__("no"), value: 0 },
                                        { text: _vm.__("yes"), value: 1 },
                                      ],
                                      buttons: "",
                                      "button-variant": "outline-primary",
                                    },
                                    model: {
                                      value: _vm.cancelable_status,
                                      callback: function ($$v) {
                                        _vm.cancelable_status = $$v
                                      },
                                      expression: "cancelable_status",
                                    },
                                  }),
                                ],
                                1
                              ),
                              _vm._v(" "),
                              _vm.cancelable_status === 1
                                ? _c("div", { staticClass: "ms-2" }, [
                                    _c(
                                      "label",
                                      { attrs: { for: "till_status" } },
                                      [
                                        _vm._v(
                                          _vm._s(_vm.__("till_which_status")) +
                                            " "
                                        ),
                                        _c(
                                          "i",
                                          { staticClass: "text-danger" },
                                          [_vm._v("*")]
                                        ),
                                      ]
                                    ),
                                    _vm._v(" "),
                                    _c(
                                      "select",
                                      {
                                        directives: [
                                          {
                                            name: "model",
                                            rawName: "v-model",
                                            value: _vm.till_status,
                                            expression: "till_status",
                                          },
                                        ],
                                        staticClass: "form-control",
                                        attrs: {
                                          id: "till_status",
                                          required:
                                            _vm.cancelable_status === 1
                                              ? true
                                              : undefined,
                                        },
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
                                            _vm.till_status = $event.target
                                              .multiple
                                              ? $$selectedVal
                                              : $$selectedVal[0]
                                          },
                                        },
                                      },
                                      [
                                        _c("option", { attrs: { value: "" } }, [
                                          _vm._v(
                                            _vm._s(
                                              _vm.__("select_order_status")
                                            )
                                          ),
                                        ]),
                                        _vm._v(" "),
                                        _vm._l(
                                          _vm.order_status,
                                          function (status) {
                                            return _c(
                                              "option",
                                              {
                                                domProps: { value: status.id },
                                              },
                                              [
                                                _vm._v(
                                                  _vm._s(
                                                    _vm.getStatusDisplayName(
                                                      status
                                                    )
                                                  ) +
                                                    "\n                                                "
                                                ),
                                              ]
                                            )
                                          }
                                        ),
                                      ],
                                      2
                                    ),
                                  ])
                                : _vm._e(),
                            ]
                          ),
                        ]),
                        _vm._v(" "),
                        _c("div", { staticClass: "col-md-4" }, [
                          _c(
                            "div",
                            { staticClass: "form-group mb-3" },
                            [
                              _c("label", [
                                _vm._v(_vm._s(_vm.__("is_cod_allowed"))),
                              ]),
                              _c("br"),
                              _vm._v(" "),
                              _c("b-form-radio-group", {
                                attrs: {
                                  options: [
                                    { text: _vm.__("no"), value: 0 },
                                    { text: _vm.__("yes"), value: 1 },
                                  ],
                                  buttons: "",
                                  "button-variant": "outline-primary",
                                },
                                model: {
                                  value: _vm.cod_allowed_status,
                                  callback: function ($$v) {
                                    _vm.cod_allowed_status = $$v
                                  },
                                  expression: "cod_allowed_status",
                                },
                              }),
                            ],
                            1
                          ),
                        ]),
                        _vm._v(" "),
                        _vm.isPharmacyModule
                          ? _c("div", { staticClass: "col-md-4" }, [
                              _c(
                                "div",
                                { staticClass: "form-group mb-3" },
                                [
                                  _c("label", [
                                    _vm._v(
                                      _vm._s(_vm.__("require_prescription"))
                                    ),
                                  ]),
                                  _c("br"),
                                  _vm._v(" "),
                                  _c("b-form-radio-group", {
                                    attrs: {
                                      options: [
                                        { text: _vm.__("no"), value: 0 },
                                        { text: _vm.__("yes"), value: 1 },
                                      ],
                                      buttons: "",
                                      "button-variant": "outline-primary",
                                    },
                                    model: {
                                      value: _vm.require_prescription,
                                      callback: function ($$v) {
                                        _vm.require_prescription = $$v
                                      },
                                      expression: "require_prescription",
                                    },
                                  }),
                                ],
                                1
                              ),
                            ])
                          : _vm._e(),
                      ]),
                    ]),
                  ])
                : _vm._e(),
              _vm._v(" "),
              _vm.translatedCustomFields.length > 0 &&
              _vm.languages.length > 0 &&
              _vm.languages[_vm.activeLanguageTab] &&
              _vm.languages[_vm.activeLanguageTab].is_default
                ? _c("div", { staticClass: "card" }, [
                    _c("div", { staticClass: "card-header" }, [
                      _c("h4", [
                        _vm._v(
                          _vm._s(_vm.__("custom_fields")) +
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
                          staticClass: "fa fa-info-circle text-muted",
                          attrs: {
                            title: _vm.__(
                              "these_fields_appear_in_product_specification_only_on_web_and_app_side"
                            ),
                          },
                        }),
                      ]),
                    ]),
                    _vm._v(" "),
                    _c("div", { staticClass: "card-body" }, [
                      _c(
                        "div",
                        { staticClass: "row" },
                        _vm._l(_vm.translatedCustomFields, function (field) {
                          return _c(
                            "div",
                            {
                              key: field.id,
                              staticClass: "form-group col-md-4",
                            },
                            [
                              _c("label", [
                                _vm._v(
                                  _vm._s(field.name) +
                                    "\n                                        "
                                ),
                                field.is_required
                                  ? _c("i", { staticClass: "text-danger" }, [
                                      _vm._v("*"),
                                    ])
                                  : _vm._e(),
                              ]),
                              _vm._v(" "),
                              field.type === "textarea"
                                ? _c("textarea", {
                                    directives: [
                                      {
                                        name: "model",
                                        rawName: "v-model",
                                        value: _vm.customFieldValues[field.id],
                                        expression:
                                          "customFieldValues[field.id]",
                                      },
                                    ],
                                    staticClass: "form-control",
                                    attrs: { placeholder: field.name },
                                    domProps: {
                                      value: _vm.customFieldValues[field.id],
                                    },
                                    on: {
                                      input: function ($event) {
                                        if ($event.target.composing) {
                                          return
                                        }
                                        _vm.$set(
                                          _vm.customFieldValues,
                                          field.id,
                                          $event.target.value
                                        )
                                      },
                                    },
                                  })
                                : field.type === "dropdown"
                                ? _c(
                                    "select",
                                    {
                                      directives: [
                                        {
                                          name: "model",
                                          rawName: "v-model",
                                          value:
                                            _vm.customFieldValues[field.id],
                                          expression:
                                            "customFieldValues[field.id]",
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
                                          _vm.$set(
                                            _vm.customFieldValues,
                                            field.id,
                                            $event.target.multiple
                                              ? $$selectedVal
                                              : $$selectedVal[0]
                                          )
                                        },
                                      },
                                    },
                                    [
                                      _c("option", { attrs: { value: "" } }, [
                                        _vm._v(
                                          _vm._s(_vm.__("select") || "Select")
                                        ),
                                      ]),
                                      _vm._v(" "),
                                      _vm._l(field.options, function (option) {
                                        return _c(
                                          "option",
                                          {
                                            key: option,
                                            domProps: { value: option },
                                          },
                                          [_vm._v(_vm._s(option))]
                                        )
                                      }),
                                    ],
                                    2
                                  )
                                : field.type === "file"
                                ? [
                                    _c("input", {
                                      staticClass: "form-control",
                                      attrs: { type: "file" },
                                      on: {
                                        change: function ($event) {
                                          return _vm.handleCustomFieldFile(
                                            $event,
                                            field.id
                                          )
                                        },
                                      },
                                    }),
                                    _vm._v(" "),
                                    _vm.customFieldExistingFileUrl(field.id)
                                      ? _c(
                                          "a",
                                          {
                                            staticClass:
                                              "badge bg-success mt-1",
                                            attrs: {
                                              href: _vm.customFieldExistingFileUrl(
                                                field.id
                                              ),
                                              target: "_blank",
                                            },
                                          },
                                          [
                                            _c("i", {
                                              staticClass: "fa fa-eye",
                                            }),
                                            _vm._v(
                                              " " +
                                                _vm._s(_vm.__("view") || "View")
                                            ),
                                          ]
                                        )
                                      : _vm._e(),
                                  ]
                                : (field.type === "number"
                                    ? "number"
                                    : "text") === "checkbox"
                                ? _c("input", {
                                    directives: [
                                      {
                                        name: "model",
                                        rawName: "v-model",
                                        value: _vm.customFieldValues[field.id],
                                        expression:
                                          "customFieldValues[field.id]",
                                      },
                                    ],
                                    staticClass: "form-control",
                                    attrs: {
                                      placeholder: field.name,
                                      type: "checkbox",
                                    },
                                    domProps: {
                                      checked: Array.isArray(
                                        _vm.customFieldValues[field.id]
                                      )
                                        ? _vm._i(
                                            _vm.customFieldValues[field.id],
                                            null
                                          ) > -1
                                        : _vm.customFieldValues[field.id],
                                    },
                                    on: {
                                      change: function ($event) {
                                        var $$a =
                                            _vm.customFieldValues[field.id],
                                          $$el = $event.target,
                                          $$c = $$el.checked ? true : false
                                        if (Array.isArray($$a)) {
                                          var $$v = null,
                                            $$i = _vm._i($$a, $$v)
                                          if ($$el.checked) {
                                            $$i < 0 &&
                                              _vm.$set(
                                                _vm.customFieldValues,
                                                field.id,
                                                $$a.concat([$$v])
                                              )
                                          } else {
                                            $$i > -1 &&
                                              _vm.$set(
                                                _vm.customFieldValues,
                                                field.id,
                                                $$a
                                                  .slice(0, $$i)
                                                  .concat($$a.slice($$i + 1))
                                              )
                                          }
                                        } else {
                                          _vm.$set(
                                            _vm.customFieldValues,
                                            field.id,
                                            $$c
                                          )
                                        }
                                      },
                                    },
                                  })
                                : (field.type === "number"
                                    ? "number"
                                    : "text") === "radio"
                                ? _c("input", {
                                    directives: [
                                      {
                                        name: "model",
                                        rawName: "v-model",
                                        value: _vm.customFieldValues[field.id],
                                        expression:
                                          "customFieldValues[field.id]",
                                      },
                                    ],
                                    staticClass: "form-control",
                                    attrs: {
                                      placeholder: field.name,
                                      type: "radio",
                                    },
                                    domProps: {
                                      checked: _vm._q(
                                        _vm.customFieldValues[field.id],
                                        null
                                      ),
                                    },
                                    on: {
                                      change: function ($event) {
                                        return _vm.$set(
                                          _vm.customFieldValues,
                                          field.id,
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
                                        value: _vm.customFieldValues[field.id],
                                        expression:
                                          "customFieldValues[field.id]",
                                      },
                                    ],
                                    staticClass: "form-control",
                                    attrs: {
                                      placeholder: field.name,
                                      type:
                                        field.type === "number"
                                          ? "number"
                                          : "text",
                                    },
                                    domProps: {
                                      value: _vm.customFieldValues[field.id],
                                    },
                                    on: {
                                      input: function ($event) {
                                        if ($event.target.composing) {
                                          return
                                        }
                                        _vm.$set(
                                          _vm.customFieldValues,
                                          field.id,
                                          $event.target.value
                                        )
                                      },
                                    },
                                  }),
                            ],
                            2
                          )
                        }),
                        0
                      ),
                    ]),
                  ])
                : _vm._e(),
              _vm._v(" "),
              _vm.languages.length > 0 &&
              _vm.languages[_vm.activeLanguageTab] &&
              _vm.languages[_vm.activeLanguageTab].is_default
                ? _c("div", { staticClass: "card" }, [
                    _c("div", { staticClass: "card-header" }, [
                      _c("h4", [_vm._v(_vm._s(_vm.__("product_variants")))]),
                    ]),
                    _vm._v(" "),
                    _c(
                      "div",
                      { staticClass: "card-body" },
                      [
                        _c("div", { staticClass: "col-md-6" }, [
                          _c("div", { staticClass: "row" }, [
                            _c(
                              "div",
                              { staticClass: "form-group col-md-6" },
                              [
                                _c("label", { staticClass: "control-label" }, [
                                  _vm._v(_vm._s(_vm.__("stock_limit")) + " "),
                                  _c("i", { staticClass: "text-danger" }, [
                                    _vm._v("*"),
                                  ]),
                                ]),
                                _c("br"),
                                _vm._v(" "),
                                _c("b-form-radio-group", {
                                  attrs: {
                                    options: [
                                      { text: _vm.__("limited"), value: 0 },
                                      { text: _vm.__("unlimited"), value: 1 },
                                    ],
                                    buttons: "",
                                    "button-variant": "outline-primary",
                                  },
                                  model: {
                                    value: _vm.is_unlimited_stock,
                                    callback: function ($$v) {
                                      _vm.is_unlimited_stock = $$v
                                    },
                                    expression: "is_unlimited_stock",
                                  },
                                }),
                              ],
                              1
                            ),
                          ]),
                        ]),
                        _vm._v(" "),
                        _c("div", { staticClass: "col-md-12" }, [
                          _c(
                            "div",
                            { staticClass: "form-group mb-3" },
                            [
                              _c("label", [_vm._v(_vm._s(_vm.__("images")))]),
                              _c("br"),
                              _vm._v(" "),
                              _c("b-form-radio-group", {
                                attrs: {
                                  options: [
                                    {
                                      text: _vm.__("global_images"),
                                      value: "global",
                                    },
                                    {
                                      text: _vm.__("variant_wise_images"),
                                      value: "variant",
                                    },
                                  ],
                                  buttons: "",
                                  "button-variant": "outline-primary",
                                },
                                model: {
                                  value: _vm.image_mode,
                                  callback: function ($$v) {
                                    _vm.image_mode = $$v
                                  },
                                  expression: "image_mode",
                                },
                              }),
                            ],
                            1
                          ),
                        ]),
                        _vm._v(" "),
                        _vm.image_mode === "global"
                          ? _c("div", { staticClass: "row" }, [
                              _c("div", { staticClass: "col-md-6" }, [
                                _c("div", { staticClass: "form-group mb-3" }, [
                                  _c("label", [
                                    _vm._v(_vm._s(_vm.__("main_image")) + " "),
                                    _c("i", { staticClass: "text-danger" }, [
                                      _vm._v("*"),
                                    ]),
                                  ]),
                                  _vm._v(" "),
                                  _c("input", {
                                    ref: "file_image",
                                    staticClass: "file-input",
                                    attrs: {
                                      type: "file",
                                      name: "image",
                                      accept: "image/*",
                                    },
                                    on: { change: _vm.fileImage },
                                  }),
                                  _vm._v(" "),
                                  _c(
                                    "div",
                                    {
                                      staticClass: "file-input-div bg-gray-100",
                                      on: {
                                        click: function ($event) {
                                          return _vm.triggerRefClick(
                                            "file_image"
                                          )
                                        },
                                        drop: _vm.dropFile,
                                        dragover: _vm.$dragoverFile,
                                        dragleave: _vm.$dragleaveFile,
                                      },
                                    },
                                    [
                                      _vm.main_image_name == ""
                                        ? [
                                            _vm._m(0),
                                            _vm._v(" "),
                                            _c("label", [
                                              _vm._v(
                                                _vm._s(
                                                  _vm.__(
                                                    "drop_files_here_or_click_to_upload"
                                                  )
                                                )
                                              ),
                                            ]),
                                          ]
                                        : [
                                            _c("label", [
                                              _vm._v(
                                                _vm._s(
                                                  _vm.__("selected_file_name")
                                                ) +
                                                  " " +
                                                  _vm._s(_vm.main_image_name)
                                              ),
                                            ]),
                                          ],
                                    ],
                                    2
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "span",
                                    { staticClass: "text text-primary" },
                                    [
                                      _vm._v(
                                        _vm._s(
                                          _vm.__(
                                            "please_choose_square_image_of_larger_than_350px_350px_and_smaller_than_550px_550px"
                                          )
                                        )
                                      ),
                                    ]
                                  ),
                                  _vm._v(" "),
                                  _vm.mainImageerror
                                    ? _c("p", { staticClass: "error" }, [
                                        _vm._v(_vm._s(_vm.mainImageerror)),
                                      ])
                                    : _vm._e(),
                                  _vm._v(" "),
                                  _vm.main_image_path
                                    ? _c("div", { staticClass: "row" }, [
                                        _c("div", { staticClass: "col-md-4" }, [
                                          _c("img", {
                                            staticClass: "custom-image",
                                            attrs: {
                                              src: _vm.main_image_path,
                                              title: "Main Image",
                                              alt: "Main Image",
                                            },
                                          }),
                                        ]),
                                      ])
                                    : _vm._e(),
                                ]),
                              ]),
                              _vm._v(" "),
                              _c("div", { staticClass: "col-md-6" }, [
                                _c("div", { staticClass: "form-group mb-3" }, [
                                  _c(
                                    "label",
                                    { attrs: { for: "other_images" } },
                                    [
                                      _vm._v(
                                        _vm._s(
                                          _vm.__("other_images_of_the_product")
                                        )
                                      ),
                                    ]
                                  ),
                                  _vm._v(" "),
                                  _c("input", {
                                    ref: "file_other_images",
                                    staticClass: "file-input",
                                    attrs: {
                                      type: "file",
                                      name: "other_images[]",
                                      accept: "image/*",
                                      id: "other_images",
                                      multiple: "",
                                    },
                                    on: { change: _vm.otherImage },
                                  }),
                                  _vm._v(" "),
                                  _c(
                                    "div",
                                    {
                                      staticClass: "file-input-div bg-gray-100",
                                      on: {
                                        click: function ($event) {
                                          return _vm.triggerRefClick(
                                            "file_other_images"
                                          )
                                        },
                                        drop: _vm.dropFileOtherImage,
                                        dragover: _vm.$dragoverFile,
                                        dragleave: _vm.$dragleaveFile,
                                      },
                                    },
                                    [
                                      _vm.images.length === 0
                                        ? [
                                            _vm._m(1),
                                            _vm._v(" "),
                                            _c("label", [
                                              _vm._v(
                                                _vm._s(
                                                  _vm.__(
                                                    "drop_files_here_or_click_to_upload"
                                                  )
                                                )
                                              ),
                                            ]),
                                          ]
                                        : [
                                            _vm.images.length === 1
                                              ? [
                                                  _c("label", [
                                                    _vm._v(
                                                      _vm._s(
                                                        _vm.__(
                                                          "selected_file_name"
                                                        )
                                                      ) +
                                                        "\n                                                        " +
                                                        _vm._s(
                                                          _vm.images[0].name
                                                        )
                                                    ),
                                                  ]),
                                                ]
                                              : [
                                                  _c("label", [
                                                    _vm._v(
                                                      _vm._s(
                                                        _vm.images.length
                                                      ) +
                                                        " files\n                                                        Selected"
                                                    ),
                                                  ]),
                                                  _vm._v(" "),
                                                  _c(
                                                    "span",
                                                    _vm._l(
                                                      _vm.images,
                                                      function (image) {
                                                        return _c("small", [
                                                          _vm._v(
                                                            _vm._s(image.name) +
                                                              ", "
                                                          ),
                                                        ])
                                                      }
                                                    ),
                                                    0
                                                  ),
                                                ],
                                          ],
                                    ],
                                    2
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "span",
                                    { staticClass: "text text-primary" },
                                    [
                                      _vm._v(
                                        _vm._s(
                                          _vm.__(
                                            "please_choose_square_image_of_larger_than_350px_350px_and_smaller_than_550px_550px"
                                          )
                                        ) + " *"
                                      ),
                                    ]
                                  ),
                                  _vm._v(" "),
                                  _vm.otherImageerror
                                    ? _c("p", { staticClass: "error" }, [
                                        _vm._v(_vm._s(_vm.otherImageerror)),
                                      ])
                                    : _vm._e(),
                                  _vm._v(" "),
                                  _vm.images && _vm.images.length !== 0
                                    ? _c("div", [
                                        _c("h6", { staticClass: "mt-3" }, [
                                          _vm._v("Seleted Other Image List."),
                                        ]),
                                        _vm._v(" "),
                                        _c(
                                          "div",
                                          {
                                            staticClass:
                                              "d-flex flex-wrap variant-image-preview-list",
                                          },
                                          _vm._l(
                                            _vm.images,
                                            function (image, index) {
                                              return _c(
                                                "div",
                                                {
                                                  key: image.url,
                                                  staticClass:
                                                    "image-container variant-image-preview-item",
                                                },
                                                [
                                                  _c("img", {
                                                    staticClass:
                                                      "img-thumbnail custom-image",
                                                    attrs: {
                                                      src: image.url,
                                                      title:
                                                        "Selected Other Image",
                                                      alt: "Selected Other Image",
                                                    },
                                                  }),
                                                  _vm._v(" "),
                                                  _c(
                                                    "button",
                                                    {
                                                      staticClass:
                                                        "btn btn-sm btn-danger btn-remove",
                                                      attrs: { type: "button" },
                                                      on: {
                                                        click: function (
                                                          $event
                                                        ) {
                                                          _vm.removeOtherImage(
                                                            _vm.images.indexOf(
                                                              image
                                                            )
                                                          )
                                                        },
                                                      },
                                                    },
                                                    [
                                                      _c("i", {
                                                        staticClass:
                                                          "fa fa-times-circle",
                                                      }),
                                                    ]
                                                  ),
                                                ]
                                              )
                                            }
                                          ),
                                          0
                                        ),
                                      ])
                                    : _vm._e(),
                                  _vm._v(" "),
                                  _vm.other_images &&
                                  _vm.other_images.length !== 0
                                    ? _c("div", [
                                        _c("h6", { staticClass: "mt-3" }, [
                                          _vm._v("Uploaded Other Image List."),
                                        ]),
                                        _vm._v(" "),
                                        _c(
                                          "div",
                                          {
                                            staticClass:
                                              "d-flex flex-wrap variant-image-preview-list",
                                          },
                                          _vm._l(
                                            _vm.other_images,
                                            function (image, index) {
                                              return _c(
                                                "div",
                                                {
                                                  key: image.id,
                                                  staticClass:
                                                    "image-container variant-image-preview-item",
                                                },
                                                [
                                                  _c("img", {
                                                    staticClass:
                                                      "img-thumbnail custom-image",
                                                    attrs: {
                                                      src:
                                                        _vm.$storageUrl +
                                                        image.image,
                                                      title: "Other Image",
                                                      alt: "Other Image",
                                                    },
                                                  }),
                                                  _vm._v(" "),
                                                  _c(
                                                    "button",
                                                    {
                                                      staticClass:
                                                        "btn btn-sm btn-danger btn-remove",
                                                      attrs: { type: "button" },
                                                      on: {
                                                        click: function (
                                                          $event
                                                        ) {
                                                          return _vm.deleteImage(
                                                            index,
                                                            image.id,
                                                            true
                                                          )
                                                        },
                                                      },
                                                    },
                                                    [
                                                      _c("i", {
                                                        staticClass:
                                                          "fa fa-times-circle",
                                                      }),
                                                    ]
                                                  ),
                                                ]
                                              )
                                            }
                                          ),
                                          0
                                        ),
                                      ])
                                    : _vm._e(),
                                ]),
                              ]),
                            ])
                          : _vm._e(),
                        _vm._v(" "),
                        _vm.attributeOptions.length === 0 &&
                        !_vm.isLoadingAttributes
                          ? _c("div", { staticClass: "col-md-12" }, [
                              _c("p", { staticClass: "text-danger mb-2" }, [
                                _vm._v(
                                  "\n                                    " +
                                    _vm._s(
                                      _vm.category_id
                                        ? _vm.__(
                                            "no_attributes_for_this_category"
                                          )
                                        : _vm.__("please_select_category_first")
                                    ) +
                                    "\n                                "
                                ),
                              ]),
                            ])
                          : _vm._e(),
                        _vm._v(" "),
                        _vm.attributeOptions.length
                          ? _c(
                              "div",
                              { staticClass: "col-md-12" },
                              [
                                _c("h5", { staticClass: "mb-1" }, [
                                  _vm._v(_vm._s(_vm.__("variant_matrix"))),
                                ]),
                                _vm._v(" "),
                                _c("p", { staticClass: "text-muted mb-3" }, [
                                  _vm._v(
                                    _vm._s(
                                      _vm.__(
                                        "select_one_or_more_values_for_each_attribute_every_combination_becomes_a_variant"
                                      )
                                    )
                                  ),
                                ]),
                                _vm._v(" "),
                                _vm._l(
                                  _vm.attributeOptions,
                                  function (attribute) {
                                    return _c(
                                      "div",
                                      {
                                        key: attribute.id,
                                        staticClass: "mb-3",
                                      },
                                      [
                                        _c(
                                          "label",
                                          { staticClass: "d-block fw-bold" },
                                          [_vm._v(_vm._s(attribute.name))]
                                        ),
                                        _vm._v(" "),
                                        attribute.type === "color"
                                          ? _vm._l(
                                              attribute.values,
                                              function (value) {
                                                return _c("span", {
                                                  directives: [
                                                    {
                                                      name: "b-tooltip",
                                                      rawName:
                                                        "v-b-tooltip.hover",
                                                      modifiers: {
                                                        hover: true,
                                                      },
                                                    },
                                                  ],
                                                  key: value.id,
                                                  staticClass:
                                                    "d-inline-block rounded-circle me-2 mb-1",
                                                  style: {
                                                    background:
                                                      value.color_code ||
                                                      "#ccc",
                                                    width: "32px",
                                                    height: "32px",
                                                    cursor: "pointer",
                                                    border:
                                                      _vm.isAttributeValueChecked(
                                                        attribute.id,
                                                        value.id
                                                      )
                                                        ? "3px solid #37a279"
                                                        : "1px solid #ccc",
                                                  },
                                                  attrs: { title: value.value },
                                                  on: {
                                                    click: function ($event) {
                                                      return _vm.toggleAttributeValueChecked(
                                                        attribute.id,
                                                        value.id
                                                      )
                                                    },
                                                  },
                                                })
                                              }
                                            )
                                          : attribute.type === "image"
                                          ? _vm._l(
                                              attribute.values,
                                              function (value) {
                                                return _c(
                                                  "span",
                                                  {
                                                    directives: [
                                                      {
                                                        name: "b-tooltip",
                                                        rawName:
                                                          "v-b-tooltip.hover",
                                                        modifiers: {
                                                          hover: true,
                                                        },
                                                      },
                                                    ],
                                                    key: value.id,
                                                    staticClass:
                                                      "d-inline-block me-2 mb-1",
                                                    style: {
                                                      cursor: "pointer",
                                                      border:
                                                        _vm.isAttributeValueChecked(
                                                          attribute.id,
                                                          value.id
                                                        )
                                                          ? "3px solid #37a279"
                                                          : "1px solid #ccc",
                                                    },
                                                    attrs: {
                                                      title: value.value,
                                                    },
                                                    on: {
                                                      click: function ($event) {
                                                        return _vm.toggleAttributeValueChecked(
                                                          attribute.id,
                                                          value.id
                                                        )
                                                      },
                                                    },
                                                  },
                                                  [
                                                    value.image_url
                                                      ? _c("img", {
                                                          staticStyle: {
                                                            width: "40px",
                                                            height: "40px",
                                                            "object-fit":
                                                              "cover",
                                                            display: "block",
                                                          },
                                                          attrs: {
                                                            src: value.image_url,
                                                          },
                                                        })
                                                      : _c(
                                                          "span",
                                                          {
                                                            staticStyle: {
                                                              width: "40px",
                                                              height: "40px",
                                                              display: "flex",
                                                              "align-items":
                                                                "center",
                                                              "justify-content":
                                                                "center",
                                                              "font-size":
                                                                "10px",
                                                            },
                                                          },
                                                          [
                                                            _vm._v(
                                                              _vm._s(
                                                                value.value
                                                              )
                                                            ),
                                                          ]
                                                        ),
                                                  ]
                                                )
                                              }
                                            )
                                          : _vm._l(
                                              attribute.values,
                                              function (value) {
                                                return _c(
                                                  "b-form-checkbox",
                                                  {
                                                    key:
                                                      value.id +
                                                      "_" +
                                                      (_vm.checkboxRenderKey[
                                                        attribute.id +
                                                          "_" +
                                                          value.id
                                                      ] || 0),
                                                    staticClass: "mb-1 me-1",
                                                    attrs: {
                                                      checked:
                                                        _vm.isAttributeValueChecked(
                                                          attribute.id,
                                                          value.id
                                                        ),
                                                      button: "",
                                                      "button-variant":
                                                        "outline-primary",
                                                    },
                                                    on: {
                                                      change: function (
                                                        $event
                                                      ) {
                                                        return _vm.toggleAttributeValueChecked(
                                                          attribute.id,
                                                          value.id
                                                        )
                                                      },
                                                    },
                                                  },
                                                  [
                                                    _vm._v(
                                                      "\n                                            " +
                                                        _vm._s(value.value)
                                                    ),
                                                    value.short_code
                                                      ? [
                                                          _vm._v(
                                                            " (" +
                                                              _vm._s(
                                                                value.short_code
                                                              ) +
                                                              ")"
                                                          ),
                                                        ]
                                                      : _vm._e(),
                                                  ],
                                                  2
                                                )
                                              }
                                            ),
                                      ],
                                      2
                                    )
                                  }
                                ),
                                _vm._v(" "),
                                _c(
                                  "div",
                                  {
                                    staticClass:
                                      "alert alert-info d-flex justify-content-between align-items-center flex-wrap gap-2",
                                  },
                                  [
                                    _c("span", [
                                      _vm._v(
                                        _vm._s(
                                          _vm.__(
                                            "total_variants_to_be_generated"
                                          )
                                        ) + ": "
                                      ),
                                      _c("strong", [
                                        _vm._v(_vm._s(_vm.variantCombosCount)),
                                      ]),
                                    ]),
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
                                        staticClass: "btn btn-primary",
                                        attrs: {
                                          type: "button",
                                          disabled:
                                            _vm.attributeOptions.length === 0,
                                          title: _vm.__(
                                            "select_every_value_of_every_attribute"
                                          ),
                                        },
                                        on: { click: _vm.generateAllVariants },
                                      },
                                      [
                                        _c("i", { staticClass: "fa fa-bolt" }),
                                        _vm._v(
                                          " " +
                                            _vm._s(
                                              _vm.__("generate_all_variants")
                                            ) +
                                            "\n                                    "
                                        ),
                                      ]
                                    ),
                                  ]
                                ),
                              ],
                              2
                            )
                          : _vm._e(),
                        _vm._v(" "),
                        _vm.hasEditableVariants
                          ? _c(
                              "div",
                              { staticClass: "col-md-12 mb-3" },
                              [
                                _c("hr"),
                                _vm._v(" "),
                                _c("h5", { staticClass: "mb-2" }, [
                                  _vm._v(_vm._s(_vm.__("product_variants"))),
                                ]),
                                _vm._v(" "),
                                _vm._l(_vm.inputs, function (input, k) {
                                  return _c(
                                    "button",
                                    {
                                      key: k,
                                      staticClass: "btn btn-sm me-1 mb-1",
                                      class: [
                                        k === _vm.activeVariantIndex
                                          ? "btn-primary"
                                          : "btn-outline-secondary",
                                        !input.attribute_value_id ||
                                        input.orphan_combo
                                          ? "border-warning"
                                          : "",
                                      ],
                                      attrs: { type: "button" },
                                      on: {
                                        click: function ($event) {
                                          return _vm.selectVariant(k)
                                        },
                                      },
                                    },
                                    [
                                      input.orphan_combo
                                        ? _c("i", {
                                            directives: [
                                              {
                                                name: "b-tooltip",
                                                rawName: "v-b-tooltip.hover",
                                                modifiers: { hover: true },
                                              },
                                            ],
                                            staticClass:
                                              "fa fa-exclamation-triangle text-warning me-1",
                                            attrs: {
                                              title: _vm.__(
                                                "variant_combo_incomplete_warning"
                                              ),
                                            },
                                          })
                                        : _vm._e(),
                                      _vm._v(
                                        "\n                                    #" +
                                          _vm._s(k + 1) +
                                          " — " +
                                          _vm._s(
                                            input.label ||
                                              (input.id
                                                ? _vm.__("unmapped")
                                                : input.attribute_value_id)
                                          ) +
                                          "\n                                    "
                                      ),
                                      _c("i", {
                                        staticClass: "fa fa-times ms-1",
                                        on: {
                                          click: function ($event) {
                                            $event.stopPropagation()
                                            return _vm.remove(k)
                                          },
                                        },
                                      }),
                                    ]
                                  )
                                }),
                              ],
                              2
                            )
                          : _vm._e(),
                        _vm._v(" "),
                        _vm._l(_vm.inputs, function (input, k) {
                          return _c(
                            "div",
                            {
                              directives: [
                                {
                                  name: "show",
                                  rawName: "v-show",
                                  value:
                                    k === _vm.activeVariantIndex &&
                                    (input.attribute_value_id || input.id),
                                  expression:
                                    "k === activeVariantIndex && (input.attribute_value_id || input.id)",
                                },
                              ],
                              key: k,
                              staticClass: "list-group-item",
                              attrs: { id: "packate_div" },
                            },
                            [
                              _c("div", { staticClass: "row" }, [
                                input.label
                                  ? _c(
                                      "div",
                                      { staticClass: "col-md-12 mb-2" },
                                      [
                                        _c("strong", [
                                          _vm._v(_vm._s(input.label)),
                                        ]),
                                      ]
                                    )
                                  : _vm._e(),
                                _vm._v(" "),
                                input.orphan_combo
                                  ? _c(
                                      "div",
                                      { staticClass: "col-md-12 mb-2" },
                                      [
                                        _c(
                                          "p",
                                          { staticClass: "text-warning mb-1" },
                                          [
                                            _vm._v(
                                              _vm._s(
                                                _vm.__(
                                                  "variant_combo_incomplete_warning"
                                                )
                                              )
                                            ),
                                          ]
                                        ),
                                      ]
                                    )
                                  : _vm._e(),
                                _vm._v(" "),
                                !input.attribute_value_id && input.id
                                  ? _c(
                                      "div",
                                      { staticClass: "col-md-12 mb-2" },
                                      [
                                        _c(
                                          "p",
                                          { staticClass: "text-warning mb-1" },
                                          [
                                            _vm._v(
                                              _vm._s(
                                                _vm.__(
                                                  "legacy_variant_no_attribute_assigned"
                                                )
                                              )
                                            ),
                                          ]
                                        ),
                                        _vm._v(" "),
                                        _c(
                                          "select",
                                          {
                                            staticClass: "form-control",
                                            on: {
                                              change: function ($event) {
                                                return _vm.assignLegacyAttributeValue(
                                                  k,
                                                  $event.target.value
                                                )
                                              },
                                            },
                                          },
                                          [
                                            _c(
                                              "option",
                                              { attrs: { value: "" } },
                                              [
                                                _vm._v(
                                                  _vm._s(
                                                    _vm.__(
                                                      "select_attribute_value"
                                                    )
                                                  )
                                                ),
                                              ]
                                            ),
                                            _vm._v(" "),
                                            _vm._l(
                                              _vm.attributeOptions,
                                              function (attribute) {
                                                return _c(
                                                  "optgroup",
                                                  {
                                                    key: attribute.id,
                                                    attrs: {
                                                      label: attribute.name,
                                                    },
                                                  },
                                                  _vm._l(
                                                    attribute.values,
                                                    function (value) {
                                                      return _c(
                                                        "option",
                                                        {
                                                          key: value.id,
                                                          domProps: {
                                                            value: value.id,
                                                          },
                                                        },
                                                        [
                                                          _vm._v(
                                                            "\n                                                    " +
                                                              _vm._s(
                                                                value.value
                                                              )
                                                          ),
                                                          value.short_code
                                                            ? [
                                                                _vm._v(
                                                                  " (" +
                                                                    _vm._s(
                                                                      value.short_code
                                                                    ) +
                                                                    ")"
                                                                ),
                                                              ]
                                                            : _vm._e(),
                                                        ],
                                                        2
                                                      )
                                                    }
                                                  ),
                                                  0
                                                )
                                              }
                                            ),
                                          ],
                                          2
                                        ),
                                      ]
                                    )
                                  : _vm._e(),
                                _vm._v(" "),
                                _c("div", { staticClass: "col-md-4" }, [
                                  _c(
                                    "div",
                                    { staticClass: "form-group mb-3" },
                                    [
                                      _c("label", [
                                        _vm._v(
                                          _vm._s(_vm.__("price")) +
                                            " ( " +
                                            _vm._s(_vm.$currency) +
                                            " ) "
                                        ),
                                        _c(
                                          "i",
                                          { staticClass: "text-danger" },
                                          [_vm._v("*")]
                                        ),
                                      ]),
                                      _vm._v(" "),
                                      _c("input", {
                                        directives: [
                                          {
                                            name: "model",
                                            rawName: "v-model",
                                            value: input.packet_price,
                                            expression: "input.packet_price",
                                          },
                                        ],
                                        staticClass: "form-control",
                                        attrs: {
                                          type: "number",
                                          min: "0",
                                          step: "any",
                                          placeholder: "0.00",
                                          required: "",
                                        },
                                        domProps: { value: input.packet_price },
                                        on: {
                                          input: function ($event) {
                                            if ($event.target.composing) {
                                              return
                                            }
                                            _vm.$set(
                                              input,
                                              "packet_price",
                                              $event.target.value
                                            )
                                          },
                                        },
                                      }),
                                    ]
                                  ),
                                ]),
                                _vm._v(" "),
                                _c("div", { staticClass: "col-md-4" }, [
                                  _c(
                                    "div",
                                    { staticClass: "form-group mb-3" },
                                    [
                                      _c("label", [
                                        _vm._v(
                                          _vm._s(_vm.__("purchase_price")) +
                                            " ( " +
                                            _vm._s(_vm.$currency) +
                                            " )\n                                                "
                                        ),
                                        _c("i", {
                                          directives: [
                                            {
                                              name: "b-tooltip",
                                              rawName: "v-b-tooltip.hover",
                                              modifiers: { hover: true },
                                            },
                                          ],
                                          staticClass:
                                            "fa fa-info-circle text-muted",
                                          attrs: {
                                            title:
                                              "This field is used to calculate in your report",
                                          },
                                        }),
                                      ]),
                                      _vm._v(" "),
                                      _c("input", {
                                        directives: [
                                          {
                                            name: "model",
                                            rawName: "v-model",
                                            value: input.packet_purchase_price,
                                            expression:
                                              "input.packet_purchase_price",
                                          },
                                        ],
                                        staticClass: "form-control",
                                        attrs: {
                                          type: "number",
                                          min: "0",
                                          step: "any",
                                          placeholder: "0.00",
                                        },
                                        domProps: {
                                          value: input.packet_purchase_price,
                                        },
                                        on: {
                                          input: function ($event) {
                                            if ($event.target.composing) {
                                              return
                                            }
                                            _vm.$set(
                                              input,
                                              "packet_purchase_price",
                                              $event.target.value
                                            )
                                          },
                                        },
                                      }),
                                    ]
                                  ),
                                ]),
                                _vm._v(" "),
                                _c("div", { staticClass: "col-md-4" }, [
                                  _c(
                                    "div",
                                    { staticClass: "form-group mb-3" },
                                    [
                                      _c("label", [
                                        _vm._v(
                                          _vm._s(_vm.__("discounted_price")) +
                                            " ( " +
                                            _vm._s(_vm.$currency) +
                                            " )"
                                        ),
                                      ]),
                                      _vm._v(" "),
                                      _c("input", {
                                        directives: [
                                          {
                                            name: "model",
                                            rawName: "v-model",
                                            value: input.discounted_price,
                                            expression:
                                              "input.discounted_price",
                                          },
                                        ],
                                        staticClass: "form-control",
                                        attrs: {
                                          type: "number",
                                          min: "0",
                                          step: "any",
                                          placeholder: "0.00",
                                        },
                                        domProps: {
                                          value: input.discounted_price,
                                        },
                                        on: {
                                          input: [
                                            function ($event) {
                                              if ($event.target.composing) {
                                                return
                                              }
                                              _vm.$set(
                                                input,
                                                "discounted_price",
                                                $event.target.value
                                              )
                                            },
                                            function ($event) {
                                              return _vm.validateDiscountedPrice(
                                                input
                                              )
                                            },
                                          ],
                                        },
                                      }),
                                      _vm._v(" "),
                                      input.validationErrorDiscountedPrice
                                        ? _c("span", { staticClass: "error" }, [
                                            _vm._v(
                                              _vm._s(
                                                input.validationErrorDiscountedPrice
                                              )
                                            ),
                                          ])
                                        : _vm._e(),
                                    ]
                                  ),
                                ]),
                                _vm._v(" "),
                                _vm.is_unlimited_stock != 1
                                  ? _c("div", { staticClass: "col-md-4" }, [
                                      _c(
                                        "div",
                                        { staticClass: "form-group mb-3" },
                                        [
                                          _c("label", [
                                            _vm._v(
                                              _vm._s(_vm.__("stock")) + " "
                                            ),
                                            _c(
                                              "i",
                                              { staticClass: "text-danger" },
                                              [_vm._v("*")]
                                            ),
                                          ]),
                                          _vm._v(" "),
                                          _c("input", {
                                            directives: [
                                              {
                                                name: "model",
                                                rawName: "v-model",
                                                value: input.packet_stock,
                                                expression:
                                                  "input.packet_stock",
                                              },
                                            ],
                                            staticClass: "form-control",
                                            attrs: {
                                              type: "number",
                                              step: "any",
                                              min: "0",
                                              placeholder: "0",
                                              name: "packate_stock[]",
                                            },
                                            domProps: {
                                              value: input.packet_stock,
                                            },
                                            on: {
                                              input: function ($event) {
                                                if ($event.target.composing) {
                                                  return
                                                }
                                                _vm.$set(
                                                  input,
                                                  "packet_stock",
                                                  $event.target.value
                                                )
                                              },
                                            },
                                          }),
                                        ]
                                      ),
                                    ])
                                  : _vm._e(),
                                _vm._v(" "),
                                _c("div", { staticClass: "col-md-4" }, [
                                  _c(
                                    "div",
                                    { staticClass: "form-group mb-3" },
                                    [
                                      _c("label", [
                                        _vm._v(_vm._s(_vm.__("status")) + " "),
                                        _c(
                                          "i",
                                          { staticClass: "text-danger" },
                                          [_vm._v("*")]
                                        ),
                                      ]),
                                      _vm._v(" "),
                                      _c(
                                        "select",
                                        {
                                          directives: [
                                            {
                                              name: "model",
                                              rawName: "v-model",
                                              value: input.packet_status,
                                              expression: "input.packet_status",
                                            },
                                          ],
                                          staticClass: "form-control",
                                          attrs: { required: "" },
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
                                              _vm.$set(
                                                input,
                                                "packet_status",
                                                $event.target.multiple
                                                  ? $$selectedVal
                                                  : $$selectedVal[0]
                                              )
                                            },
                                          },
                                        },
                                        [
                                          _c(
                                            "option",
                                            { attrs: { value: "" } },
                                            [
                                              _vm._v(
                                                _vm._s(_vm.__("select_status"))
                                              ),
                                            ]
                                          ),
                                          _vm._v(" "),
                                          _c(
                                            "option",
                                            { attrs: { value: "1" } },
                                            [
                                              _vm._v(
                                                _vm._s(_vm.__("available"))
                                              ),
                                            ]
                                          ),
                                          _vm._v(" "),
                                          _c(
                                            "option",
                                            { attrs: { value: "0" } },
                                            [_vm._v(_vm._s(_vm.__("sold_out")))]
                                          ),
                                        ]
                                      ),
                                    ]
                                  ),
                                ]),
                                _vm._v(" "),
                                _vm.image_mode === "variant"
                                  ? _c("div", { staticClass: "col-md-12" }, [
                                      _c(
                                        "div",
                                        { staticClass: "form-group" },
                                        [
                                          _c("label", [
                                            _vm._v(
                                              _vm._s(_vm.__("variant_images"))
                                            ),
                                          ]),
                                          _vm._v(" "),
                                          _c("input", {
                                            ref: "packet_variant_images_" + k,
                                            refInFor: true,
                                            staticClass: "file-input",
                                            attrs: {
                                              type: "file",
                                              accept: "image/*",
                                              multiple: "",
                                            },
                                            on: {
                                              change: function ($event) {
                                                return _vm.variantImagesChanges(
                                                  k
                                                )
                                              },
                                            },
                                          }),
                                          _vm._v(" "),
                                          _c(
                                            "div",
                                            {
                                              staticClass:
                                                "file-input-div bg-gray-100",
                                              on: {
                                                click: function ($event) {
                                                  _vm.$refs[
                                                    "packet_variant_images_" + k
                                                  ][0].click()
                                                },
                                                dragover: _vm.$dragoverFile,
                                                dragleave: _vm.$dragleaveFile,
                                              },
                                            },
                                            [
                                              _vm._m(2, true),
                                              _vm._v(" "),
                                              _c("label", [
                                                _vm._v(
                                                  _vm._s(
                                                    _vm.__(
                                                      "drop_files_here_or_click_to_upload"
                                                    )
                                                  )
                                                ),
                                              ]),
                                            ]
                                          ),
                                          _vm._v(" "),
                                          _c(
                                            "span",
                                            {
                                              staticClass: "text text-primary",
                                            },
                                            [
                                              _vm._v(
                                                _vm._s(
                                                  _vm.__(
                                                    "please_choose_square_image_of_larger_than_350px_350px_and_smaller_than_550px_550px"
                                                  )
                                                )
                                              ),
                                            ]
                                          ),
                                          _vm._v(" "),
                                          _vm.variantImageerror
                                            ? _c(
                                                "p",
                                                { staticClass: "error" },
                                                [
                                                  _vm._v(
                                                    _vm._s(
                                                      _vm.variantImageerror
                                                    )
                                                  ),
                                                ]
                                              )
                                            : _vm._e(),
                                          _vm._v(" "),
                                          _c(
                                            "draggable",
                                            _vm._b(
                                              {
                                                staticClass:
                                                  "d-flex flex-wrap variant-image-preview-list",
                                                attrs: { tag: "div" },
                                                on: {
                                                  end: function ($event) {
                                                    return _vm.reorderVariantFiles(
                                                      k
                                                    )
                                                  },
                                                },
                                                model: {
                                                  value: _vm.variantFiles[k],
                                                  callback: function ($$v) {
                                                    _vm.$set(
                                                      _vm.variantFiles,
                                                      k,
                                                      $$v
                                                    )
                                                  },
                                                  expression: "variantFiles[k]",
                                                },
                                              },
                                              "draggable",
                                              { animation: 150 },
                                              false
                                            ),
                                            _vm._l(
                                              _vm.variantFiles[k],
                                              function (image, index) {
                                                return _c(
                                                  "div",
                                                  {
                                                    key: image.url,
                                                    staticClass:
                                                      "image-container variant-image-preview-item",
                                                  },
                                                  [
                                                    _c("img", {
                                                      staticClass:
                                                        "img-thumbnail custom-image",
                                                      attrs: {
                                                        src: image.url,
                                                        title:
                                                          "Selected Variant Image",
                                                        alt: "Selected Variant Image",
                                                      },
                                                    }),
                                                    _vm._v(" "),
                                                    _c(
                                                      "button",
                                                      {
                                                        staticClass:
                                                          "btn btn-sm btn-danger btn-remove",
                                                        attrs: {
                                                          type: "button",
                                                        },
                                                        on: {
                                                          click: function (
                                                            $event
                                                          ) {
                                                            return _vm.removeVariantFile(
                                                              k,
                                                              index
                                                            )
                                                          },
                                                        },
                                                      },
                                                      [
                                                        _c("i", {
                                                          staticClass:
                                                            "fa fa-times-circle",
                                                        }),
                                                      ]
                                                    ),
                                                  ]
                                                )
                                              }
                                            ),
                                            0
                                          ),
                                          _vm._v(" "),
                                          _c(
                                            "div",
                                            {
                                              staticClass:
                                                "d-flex flex-wrap variant-image-preview-list",
                                            },
                                            _vm._l(
                                              input.images,
                                              function (image, index) {
                                                return input.images &&
                                                  input.images.length !== 0
                                                  ? _c(
                                                      "div",
                                                      {
                                                        staticClass:
                                                          "image-container variant-image-preview-item",
                                                      },
                                                      [
                                                        _c("img", {
                                                          staticClass:
                                                            "img-thumbnail custom-image",
                                                          attrs: {
                                                            src:
                                                              _vm.$storageUrl +
                                                              image.image,
                                                            title:
                                                              "Variant Image",
                                                            alt: "Variant Image",
                                                          },
                                                        }),
                                                        _vm._v(" "),
                                                        _c(
                                                          "button",
                                                          {
                                                            staticClass:
                                                              "btn btn-sm btn-danger btn-remove",
                                                            attrs: {
                                                              type: "button",
                                                            },
                                                            on: {
                                                              click: function (
                                                                $event
                                                              ) {
                                                                return _vm.deleteImage(
                                                                  index,
                                                                  image.id,
                                                                  false,
                                                                  k
                                                                )
                                                              },
                                                            },
                                                          },
                                                          [
                                                            _c("i", {
                                                              staticClass:
                                                                "fa fa-times-circle",
                                                            }),
                                                          ]
                                                        ),
                                                      ]
                                                    )
                                                  : _vm._e()
                                              }
                                            ),
                                            0
                                          ),
                                        ],
                                        1
                                      ),
                                    ])
                                  : _vm._e(),
                              ]),
                            ]
                          )
                        }),
                      ],
                      2
                    ),
                    _vm._v(" "),
                    _vm.languages.length === 0 ||
                    (_vm.languages[_vm.activeLanguageTab] &&
                      _vm.languages[_vm.activeLanguageTab].is_default)
                      ? _c(
                          "div",
                          { staticClass: "card-footer" },
                          [
                            _c(
                              "b-button",
                              {
                                attrs: {
                                  type: "submit",
                                  variant: "primary",
                                  disabled: _vm.isLoading,
                                },
                                on: {
                                  keydown: function ($event) {
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
                                    return _vm.saveRecord.apply(null, arguments)
                                  },
                                },
                              },
                              [
                                _vm._v(
                                  " " +
                                    _vm._s(_vm.__("save")) +
                                    "\n                                "
                                ),
                                _vm.isLoading
                                  ? _c("b-spinner", {
                                      attrs: { small: "", label: "Spinning" },
                                    })
                                  : _vm._e(),
                              ],
                              1
                            ),
                            _vm._v(" "),
                            _c(
                              "button",
                              {
                                staticClass: "btn btn-danger",
                                attrs: { type: "button" },
                                on: { click: _vm.clearForm },
                              },
                              [_vm._v(_vm._s(_vm.__("clear")))]
                            ),
                          ],
                          1
                        )
                      : _vm._e(),
                  ])
                : _vm._e(),
            ]
          ),
        ]
      ),
    ]),
  ])
}
var staticRenderFns = [
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("label", [
      _c("i", { staticClass: "fa fa-cloud-upload-alt fa-2x" }),
    ])
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("label", [
      _c("i", { staticClass: "fa fa-cloud-upload-alt fa-2x" }),
    ])
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("label", [
      _c("i", { staticClass: "fa fa-cloud-upload-alt fa-2x" }),
    ])
  },
]
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-multiselect/dist/vue-multiselect.min.js":
/*!******************************************************************!*\
  !*** ./node_modules/vue-multiselect/dist/vue-multiselect.min.js ***!
  \******************************************************************/
/***/ (function(module) {

!function(t,e){ true?module.exports=e():0}(this,function(){return function(t){function e(i){if(n[i])return n[i].exports;var r=n[i]={i:i,l:!1,exports:{}};return t[i].call(r.exports,r,r.exports,e),r.l=!0,r.exports}var n={};return e.m=t,e.c=n,e.i=function(t){return t},e.d=function(t,n,i){e.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:i})},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="/",e(e.s=60)}([function(t,e){var n=t.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=n)},function(t,e,n){var i=n(49)("wks"),r=n(30),o=n(0).Symbol,s="function"==typeof o;(t.exports=function(t){return i[t]||(i[t]=s&&o[t]||(s?o:r)("Symbol."+t))}).store=i},function(t,e,n){var i=n(5);t.exports=function(t){if(!i(t))throw TypeError(t+" is not an object!");return t}},function(t,e,n){var i=n(0),r=n(10),o=n(8),s=n(6),u=n(11),a=function(t,e,n){var l,c,f,p,h=t&a.F,d=t&a.G,v=t&a.S,g=t&a.P,y=t&a.B,m=d?i:v?i[e]||(i[e]={}):(i[e]||{}).prototype,b=d?r:r[e]||(r[e]={}),_=b.prototype||(b.prototype={});d&&(n=e);for(l in n)c=!h&&m&&void 0!==m[l],f=(c?m:n)[l],p=y&&c?u(f,i):g&&"function"==typeof f?u(Function.call,f):f,m&&s(m,l,f,t&a.U),b[l]!=f&&o(b,l,p),g&&_[l]!=f&&(_[l]=f)};i.core=r,a.F=1,a.G=2,a.S=4,a.P=8,a.B=16,a.W=32,a.U=64,a.R=128,t.exports=a},function(t,e,n){t.exports=!n(7)(function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a})},function(t,e){t.exports=function(t){return"object"==typeof t?null!==t:"function"==typeof t}},function(t,e,n){var i=n(0),r=n(8),o=n(12),s=n(30)("src"),u=Function.toString,a=(""+u).split("toString");n(10).inspectSource=function(t){return u.call(t)},(t.exports=function(t,e,n,u){var l="function"==typeof n;l&&(o(n,"name")||r(n,"name",e)),t[e]!==n&&(l&&(o(n,s)||r(n,s,t[e]?""+t[e]:a.join(String(e)))),t===i?t[e]=n:u?t[e]?t[e]=n:r(t,e,n):(delete t[e],r(t,e,n)))})(Function.prototype,"toString",function(){return"function"==typeof this&&this[s]||u.call(this)})},function(t,e){t.exports=function(t){try{return!!t()}catch(t){return!0}}},function(t,e,n){var i=n(13),r=n(25);t.exports=n(4)?function(t,e,n){return i.f(t,e,r(1,n))}:function(t,e,n){return t[e]=n,t}},function(t,e){var n={}.toString;t.exports=function(t){return n.call(t).slice(8,-1)}},function(t,e){var n=t.exports={version:"2.5.7"};"number"==typeof __e&&(__e=n)},function(t,e,n){var i=n(14);t.exports=function(t,e,n){if(i(t),void 0===e)return t;switch(n){case 1:return function(n){return t.call(e,n)};case 2:return function(n,i){return t.call(e,n,i)};case 3:return function(n,i,r){return t.call(e,n,i,r)}}return function(){return t.apply(e,arguments)}}},function(t,e){var n={}.hasOwnProperty;t.exports=function(t,e){return n.call(t,e)}},function(t,e,n){var i=n(2),r=n(41),o=n(29),s=Object.defineProperty;e.f=n(4)?Object.defineProperty:function(t,e,n){if(i(t),e=o(e,!0),i(n),r)try{return s(t,e,n)}catch(t){}if("get"in n||"set"in n)throw TypeError("Accessors not supported!");return"value"in n&&(t[e]=n.value),t}},function(t,e){t.exports=function(t){if("function"!=typeof t)throw TypeError(t+" is not a function!");return t}},function(t,e){t.exports={}},function(t,e){t.exports=function(t){if(void 0==t)throw TypeError("Can't call method on  "+t);return t}},function(t,e,n){"use strict";var i=n(7);t.exports=function(t,e){return!!t&&i(function(){e?t.call(null,function(){},1):t.call(null)})}},function(t,e,n){var i=n(23),r=n(16);t.exports=function(t){return i(r(t))}},function(t,e,n){var i=n(53),r=Math.min;t.exports=function(t){return t>0?r(i(t),9007199254740991):0}},function(t,e,n){var i=n(11),r=n(23),o=n(28),s=n(19),u=n(64);t.exports=function(t,e){var n=1==t,a=2==t,l=3==t,c=4==t,f=6==t,p=5==t||f,h=e||u;return function(e,u,d){for(var v,g,y=o(e),m=r(y),b=i(u,d,3),_=s(m.length),x=0,w=n?h(e,_):a?h(e,0):void 0;_>x;x++)if((p||x in m)&&(v=m[x],g=b(v,x,y),t))if(n)w[x]=g;else if(g)switch(t){case 3:return!0;case 5:return v;case 6:return x;case 2:w.push(v)}else if(c)return!1;return f?-1:l||c?c:w}}},function(t,e,n){var i=n(5),r=n(0).document,o=i(r)&&i(r.createElement);t.exports=function(t){return o?r.createElement(t):{}}},function(t,e){t.exports="constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",")},function(t,e,n){var i=n(9);t.exports=Object("z").propertyIsEnumerable(0)?Object:function(t){return"String"==i(t)?t.split(""):Object(t)}},function(t,e){t.exports=!1},function(t,e){t.exports=function(t,e){return{enumerable:!(1&t),configurable:!(2&t),writable:!(4&t),value:e}}},function(t,e,n){var i=n(13).f,r=n(12),o=n(1)("toStringTag");t.exports=function(t,e,n){t&&!r(t=n?t:t.prototype,o)&&i(t,o,{configurable:!0,value:e})}},function(t,e,n){var i=n(49)("keys"),r=n(30);t.exports=function(t){return i[t]||(i[t]=r(t))}},function(t,e,n){var i=n(16);t.exports=function(t){return Object(i(t))}},function(t,e,n){var i=n(5);t.exports=function(t,e){if(!i(t))return t;var n,r;if(e&&"function"==typeof(n=t.toString)&&!i(r=n.call(t)))return r;if("function"==typeof(n=t.valueOf)&&!i(r=n.call(t)))return r;if(!e&&"function"==typeof(n=t.toString)&&!i(r=n.call(t)))return r;throw TypeError("Can't convert object to primitive value")}},function(t,e){var n=0,i=Math.random();t.exports=function(t){return"Symbol(".concat(void 0===t?"":t,")_",(++n+i).toString(36))}},function(t,e,n){"use strict";var i=n(0),r=n(12),o=n(9),s=n(67),u=n(29),a=n(7),l=n(77).f,c=n(45).f,f=n(13).f,p=n(51).trim,h=i.Number,d=h,v=h.prototype,g="Number"==o(n(44)(v)),y="trim"in String.prototype,m=function(t){var e=u(t,!1);if("string"==typeof e&&e.length>2){e=y?e.trim():p(e,3);var n,i,r,o=e.charCodeAt(0);if(43===o||45===o){if(88===(n=e.charCodeAt(2))||120===n)return NaN}else if(48===o){switch(e.charCodeAt(1)){case 66:case 98:i=2,r=49;break;case 79:case 111:i=8,r=55;break;default:return+e}for(var s,a=e.slice(2),l=0,c=a.length;l<c;l++)if((s=a.charCodeAt(l))<48||s>r)return NaN;return parseInt(a,i)}}return+e};if(!h(" 0o1")||!h("0b1")||h("+0x1")){h=function(t){var e=arguments.length<1?0:t,n=this;return n instanceof h&&(g?a(function(){v.valueOf.call(n)}):"Number"!=o(n))?s(new d(m(e)),n,h):m(e)};for(var b,_=n(4)?l(d):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger".split(","),x=0;_.length>x;x++)r(d,b=_[x])&&!r(h,b)&&f(h,b,c(d,b));h.prototype=v,v.constructor=h,n(6)(i,"Number",h)}},function(t,e,n){"use strict";function i(t){return 0!==t&&(!(!Array.isArray(t)||0!==t.length)||!t)}function r(t){return function(){return!t.apply(void 0,arguments)}}function o(t,e){return void 0===t&&(t="undefined"),null===t&&(t="null"),!1===t&&(t="false"),-1!==t.toString().toLowerCase().indexOf(e.trim())}function s(t,e,n,i){return t.filter(function(t){return o(i(t,n),e)})}function u(t){return t.filter(function(t){return!t.$isLabel})}function a(t,e){return function(n){return n.reduce(function(n,i){return i[t]&&i[t].length?(n.push({$groupLabel:i[e],$isLabel:!0}),n.concat(i[t])):n},[])}}function l(t,e,i,r,o){return function(u){return u.map(function(u){var a;if(!u[i])return console.warn("Options passed to vue-multiselect do not contain groups, despite the config."),[];var l=s(u[i],t,e,o);return l.length?(a={},n.i(d.a)(a,r,u[r]),n.i(d.a)(a,i,l),a):[]})}}var c=n(59),f=n(54),p=(n.n(f),n(95)),h=(n.n(p),n(31)),d=(n.n(h),n(58)),v=n(91),g=(n.n(v),n(98)),y=(n.n(g),n(92)),m=(n.n(y),n(88)),b=(n.n(m),n(97)),_=(n.n(b),n(89)),x=(n.n(_),n(96)),w=(n.n(x),n(93)),S=(n.n(w),n(90)),O=(n.n(S),function(){for(var t=arguments.length,e=new Array(t),n=0;n<t;n++)e[n]=arguments[n];return function(t){return e.reduce(function(t,e){return e(t)},t)}});e.a={data:function(){return{search:"",isOpen:!1,preferredOpenDirection:"below",optimizedHeight:this.maxHeight}},props:{internalSearch:{type:Boolean,default:!0},options:{type:Array,required:!0},multiple:{type:Boolean,default:!1},value:{type:null,default:function(){return[]}},trackBy:{type:String},label:{type:String},searchable:{type:Boolean,default:!0},clearOnSelect:{type:Boolean,default:!0},hideSelected:{type:Boolean,default:!1},placeholder:{type:String,default:"Select option"},allowEmpty:{type:Boolean,default:!0},resetAfter:{type:Boolean,default:!1},closeOnSelect:{type:Boolean,default:!0},customLabel:{type:Function,default:function(t,e){return i(t)?"":e?t[e]:t}},taggable:{type:Boolean,default:!1},tagPlaceholder:{type:String,default:"Press enter to create a tag"},tagPosition:{type:String,default:"top"},max:{type:[Number,Boolean],default:!1},id:{default:null},optionsLimit:{type:Number,default:1e3},groupValues:{type:String},groupLabel:{type:String},groupSelect:{type:Boolean,default:!1},blockKeys:{type:Array,default:function(){return[]}},preserveSearch:{type:Boolean,default:!1},preselectFirst:{type:Boolean,default:!1}},mounted:function(){!this.multiple&&this.max&&console.warn("[Vue-Multiselect warn]: Max prop should not be used when prop Multiple equals false."),this.preselectFirst&&!this.internalValue.length&&this.options.length&&this.select(this.filteredOptions[0])},computed:{internalValue:function(){return this.value||0===this.value?Array.isArray(this.value)?this.value:[this.value]:[]},filteredOptions:function(){var t=this.search||"",e=t.toLowerCase().trim(),n=this.options.concat();return n=this.internalSearch?this.groupValues?this.filterAndFlat(n,e,this.label):s(n,e,this.label,this.customLabel):this.groupValues?a(this.groupValues,this.groupLabel)(n):n,n=this.hideSelected?n.filter(r(this.isSelected)):n,this.taggable&&e.length&&!this.isExistingOption(e)&&("bottom"===this.tagPosition?n.push({isTag:!0,label:t}):n.unshift({isTag:!0,label:t})),n.slice(0,this.optionsLimit)},valueKeys:function(){var t=this;return this.trackBy?this.internalValue.map(function(e){return e[t.trackBy]}):this.internalValue},optionKeys:function(){var t=this;return(this.groupValues?this.flatAndStrip(this.options):this.options).map(function(e){return t.customLabel(e,t.label).toString().toLowerCase()})},currentOptionLabel:function(){return this.multiple?this.searchable?"":this.placeholder:this.internalValue.length?this.getOptionLabel(this.internalValue[0]):this.searchable?"":this.placeholder}},watch:{internalValue:function(){this.resetAfter&&this.internalValue.length&&(this.search="",this.$emit("input",this.multiple?[]:null))},search:function(){this.$emit("search-change",this.search,this.id)}},methods:{getValue:function(){return this.multiple?this.internalValue:0===this.internalValue.length?null:this.internalValue[0]},filterAndFlat:function(t,e,n){return O(l(e,n,this.groupValues,this.groupLabel,this.customLabel),a(this.groupValues,this.groupLabel))(t)},flatAndStrip:function(t){return O(a(this.groupValues,this.groupLabel),u)(t)},updateSearch:function(t){this.search=t},isExistingOption:function(t){return!!this.options&&this.optionKeys.indexOf(t)>-1},isSelected:function(t){var e=this.trackBy?t[this.trackBy]:t;return this.valueKeys.indexOf(e)>-1},isOptionDisabled:function(t){return!!t.$isDisabled},getOptionLabel:function(t){if(i(t))return"";if(t.isTag)return t.label;if(t.$isLabel)return t.$groupLabel;var e=this.customLabel(t,this.label);return i(e)?"":e},select:function(t,e){if(t.$isLabel&&this.groupSelect)return void this.selectGroup(t);if(!(-1!==this.blockKeys.indexOf(e)||this.disabled||t.$isDisabled||t.$isLabel)&&(!this.max||!this.multiple||this.internalValue.length!==this.max)&&("Tab"!==e||this.pointerDirty)){if(t.isTag)this.$emit("tag",t.label,this.id),this.search="",this.closeOnSelect&&!this.multiple&&this.deactivate();else{if(this.isSelected(t))return void("Tab"!==e&&this.removeElement(t));this.$emit("select",t,this.id),this.multiple?this.$emit("input",this.internalValue.concat([t]),this.id):this.$emit("input",t,this.id),this.clearOnSelect&&(this.search="")}this.closeOnSelect&&this.deactivate()}},selectGroup:function(t){var e=this,n=this.options.find(function(n){return n[e.groupLabel]===t.$groupLabel});if(n)if(this.wholeGroupSelected(n)){this.$emit("remove",n[this.groupValues],this.id);var i=this.internalValue.filter(function(t){return-1===n[e.groupValues].indexOf(t)});this.$emit("input",i,this.id)}else{var r=n[this.groupValues].filter(function(t){return!(e.isOptionDisabled(t)||e.isSelected(t))});this.$emit("select",r,this.id),this.$emit("input",this.internalValue.concat(r),this.id)}},wholeGroupSelected:function(t){var e=this;return t[this.groupValues].every(function(t){return e.isSelected(t)||e.isOptionDisabled(t)})},wholeGroupDisabled:function(t){return t[this.groupValues].every(this.isOptionDisabled)},removeElement:function(t){var e=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];if(!this.disabled&&!t.$isDisabled){if(!this.allowEmpty&&this.internalValue.length<=1)return void this.deactivate();var i="object"===n.i(c.a)(t)?this.valueKeys.indexOf(t[this.trackBy]):this.valueKeys.indexOf(t);if(this.$emit("remove",t,this.id),this.multiple){var r=this.internalValue.slice(0,i).concat(this.internalValue.slice(i+1));this.$emit("input",r,this.id)}else this.$emit("input",null,this.id);this.closeOnSelect&&e&&this.deactivate()}},removeLastElement:function(){-1===this.blockKeys.indexOf("Delete")&&0===this.search.length&&Array.isArray(this.internalValue)&&this.internalValue.length&&this.removeElement(this.internalValue[this.internalValue.length-1],!1)},activate:function(){var t=this;this.isOpen||this.disabled||(this.adjustPosition(),this.groupValues&&0===this.pointer&&this.filteredOptions.length&&(this.pointer=1),this.isOpen=!0,this.searchable?(this.preserveSearch||(this.search=""),this.$nextTick(function(){return t.$refs.search.focus()})):this.$el.focus(),this.$emit("open",this.id))},deactivate:function(){this.isOpen&&(this.isOpen=!1,this.searchable?this.$refs.search.blur():this.$el.blur(),this.preserveSearch||(this.search=""),this.$emit("close",this.getValue(),this.id))},toggle:function(){this.isOpen?this.deactivate():this.activate()},adjustPosition:function(){if("undefined"!=typeof window){var t=this.$el.getBoundingClientRect().top,e=window.innerHeight-this.$el.getBoundingClientRect().bottom;e>this.maxHeight||e>t||"below"===this.openDirection||"bottom"===this.openDirection?(this.preferredOpenDirection="below",this.optimizedHeight=Math.min(e-40,this.maxHeight)):(this.preferredOpenDirection="above",this.optimizedHeight=Math.min(t-40,this.maxHeight))}}}}},function(t,e,n){"use strict";var i=n(54),r=(n.n(i),n(31));n.n(r);e.a={data:function(){return{pointer:0,pointerDirty:!1}},props:{showPointer:{type:Boolean,default:!0},optionHeight:{type:Number,default:40}},computed:{pointerPosition:function(){return this.pointer*this.optionHeight},visibleElements:function(){return this.optimizedHeight/this.optionHeight}},watch:{filteredOptions:function(){this.pointerAdjust()},isOpen:function(){this.pointerDirty=!1}},methods:{optionHighlight:function(t,e){return{"multiselect__option--highlight":t===this.pointer&&this.showPointer,"multiselect__option--selected":this.isSelected(e)}},groupHighlight:function(t,e){var n=this;if(!this.groupSelect)return["multiselect__option--group","multiselect__option--disabled"];var i=this.options.find(function(t){return t[n.groupLabel]===e.$groupLabel});return i&&!this.wholeGroupDisabled(i)?["multiselect__option--group",{"multiselect__option--highlight":t===this.pointer&&this.showPointer},{"multiselect__option--group-selected":this.wholeGroupSelected(i)}]:"multiselect__option--disabled"},addPointerElement:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"Enter",e=t.key;this.filteredOptions.length>0&&this.select(this.filteredOptions[this.pointer],e),this.pointerReset()},pointerForward:function(){this.pointer<this.filteredOptions.length-1&&(this.pointer++,this.$refs.list.scrollTop<=this.pointerPosition-(this.visibleElements-1)*this.optionHeight&&(this.$refs.list.scrollTop=this.pointerPosition-(this.visibleElements-1)*this.optionHeight),this.filteredOptions[this.pointer]&&this.filteredOptions[this.pointer].$isLabel&&!this.groupSelect&&this.pointerForward()),this.pointerDirty=!0},pointerBackward:function(){this.pointer>0?(this.pointer--,this.$refs.list.scrollTop>=this.pointerPosition&&(this.$refs.list.scrollTop=this.pointerPosition),this.filteredOptions[this.pointer]&&this.filteredOptions[this.pointer].$isLabel&&!this.groupSelect&&this.pointerBackward()):this.filteredOptions[this.pointer]&&this.filteredOptions[0].$isLabel&&!this.groupSelect&&this.pointerForward(),this.pointerDirty=!0},pointerReset:function(){this.closeOnSelect&&(this.pointer=0,this.$refs.list&&(this.$refs.list.scrollTop=0))},pointerAdjust:function(){this.pointer>=this.filteredOptions.length-1&&(this.pointer=this.filteredOptions.length?this.filteredOptions.length-1:0),this.filteredOptions.length>0&&this.filteredOptions[this.pointer].$isLabel&&!this.groupSelect&&this.pointerForward()},pointerSet:function(t){this.pointer=t,this.pointerDirty=!0}}}},function(t,e,n){"use strict";var i=n(36),r=n(74),o=n(15),s=n(18);t.exports=n(72)(Array,"Array",function(t,e){this._t=s(t),this._i=0,this._k=e},function(){var t=this._t,e=this._k,n=this._i++;return!t||n>=t.length?(this._t=void 0,r(1)):"keys"==e?r(0,n):"values"==e?r(0,t[n]):r(0,[n,t[n]])},"values"),o.Arguments=o.Array,i("keys"),i("values"),i("entries")},function(t,e,n){"use strict";var i=n(31),r=(n.n(i),n(32)),o=n(33);e.a={name:"vue-multiselect",mixins:[r.a,o.a],props:{name:{type:String,default:""},selectLabel:{type:String,default:"Press enter to select"},selectGroupLabel:{type:String,default:"Press enter to select group"},selectedLabel:{type:String,default:"Selected"},deselectLabel:{type:String,default:"Press enter to remove"},deselectGroupLabel:{type:String,default:"Press enter to deselect group"},showLabels:{type:Boolean,default:!0},limit:{type:Number,default:99999},maxHeight:{type:Number,default:300},limitText:{type:Function,default:function(t){return"and ".concat(t," more")}},loading:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1},openDirection:{type:String,default:""},showNoOptions:{type:Boolean,default:!0},showNoResults:{type:Boolean,default:!0},tabindex:{type:Number,default:0}},computed:{isSingleLabelVisible:function(){return(this.singleValue||0===this.singleValue)&&(!this.isOpen||!this.searchable)&&!this.visibleValues.length},isPlaceholderVisible:function(){return!(this.internalValue.length||this.searchable&&this.isOpen)},visibleValues:function(){return this.multiple?this.internalValue.slice(0,this.limit):[]},singleValue:function(){return this.internalValue[0]},deselectLabelText:function(){return this.showLabels?this.deselectLabel:""},deselectGroupLabelText:function(){return this.showLabels?this.deselectGroupLabel:""},selectLabelText:function(){return this.showLabels?this.selectLabel:""},selectGroupLabelText:function(){return this.showLabels?this.selectGroupLabel:""},selectedLabelText:function(){return this.showLabels?this.selectedLabel:""},inputStyle:function(){if(this.searchable||this.multiple&&this.value&&this.value.length)return this.isOpen?{width:"100%"}:{width:"0",position:"absolute",padding:"0"}},contentStyle:function(){return this.options.length?{display:"inline-block"}:{display:"block"}},isAbove:function(){return"above"===this.openDirection||"top"===this.openDirection||"below"!==this.openDirection&&"bottom"!==this.openDirection&&"above"===this.preferredOpenDirection},showSearchInput:function(){return this.searchable&&(!this.hasSingleSelectedSlot||!this.visibleSingleValue&&0!==this.visibleSingleValue||this.isOpen)}}}},function(t,e,n){var i=n(1)("unscopables"),r=Array.prototype;void 0==r[i]&&n(8)(r,i,{}),t.exports=function(t){r[i][t]=!0}},function(t,e,n){var i=n(18),r=n(19),o=n(85);t.exports=function(t){return function(e,n,s){var u,a=i(e),l=r(a.length),c=o(s,l);if(t&&n!=n){for(;l>c;)if((u=a[c++])!=u)return!0}else for(;l>c;c++)if((t||c in a)&&a[c]===n)return t||c||0;return!t&&-1}}},function(t,e,n){var i=n(9),r=n(1)("toStringTag"),o="Arguments"==i(function(){return arguments}()),s=function(t,e){try{return t[e]}catch(t){}};t.exports=function(t){var e,n,u;return void 0===t?"Undefined":null===t?"Null":"string"==typeof(n=s(e=Object(t),r))?n:o?i(e):"Object"==(u=i(e))&&"function"==typeof e.callee?"Arguments":u}},function(t,e,n){"use strict";var i=n(2);t.exports=function(){var t=i(this),e="";return t.global&&(e+="g"),t.ignoreCase&&(e+="i"),t.multiline&&(e+="m"),t.unicode&&(e+="u"),t.sticky&&(e+="y"),e}},function(t,e,n){var i=n(0).document;t.exports=i&&i.documentElement},function(t,e,n){t.exports=!n(4)&&!n(7)(function(){return 7!=Object.defineProperty(n(21)("div"),"a",{get:function(){return 7}}).a})},function(t,e,n){var i=n(9);t.exports=Array.isArray||function(t){return"Array"==i(t)}},function(t,e,n){"use strict";function i(t){var e,n;this.promise=new t(function(t,i){if(void 0!==e||void 0!==n)throw TypeError("Bad Promise constructor");e=t,n=i}),this.resolve=r(e),this.reject=r(n)}var r=n(14);t.exports.f=function(t){return new i(t)}},function(t,e,n){var i=n(2),r=n(76),o=n(22),s=n(27)("IE_PROTO"),u=function(){},a=function(){var t,e=n(21)("iframe"),i=o.length;for(e.style.display="none",n(40).appendChild(e),e.src="javascript:",t=e.contentWindow.document,t.open(),t.write("<script>document.F=Object<\/script>"),t.close(),a=t.F;i--;)delete a.prototype[o[i]];return a()};t.exports=Object.create||function(t,e){var n;return null!==t?(u.prototype=i(t),n=new u,u.prototype=null,n[s]=t):n=a(),void 0===e?n:r(n,e)}},function(t,e,n){var i=n(79),r=n(25),o=n(18),s=n(29),u=n(12),a=n(41),l=Object.getOwnPropertyDescriptor;e.f=n(4)?l:function(t,e){if(t=o(t),e=s(e,!0),a)try{return l(t,e)}catch(t){}if(u(t,e))return r(!i.f.call(t,e),t[e])}},function(t,e,n){var i=n(12),r=n(18),o=n(37)(!1),s=n(27)("IE_PROTO");t.exports=function(t,e){var n,u=r(t),a=0,l=[];for(n in u)n!=s&&i(u,n)&&l.push(n);for(;e.length>a;)i(u,n=e[a++])&&(~o(l,n)||l.push(n));return l}},function(t,e,n){var i=n(46),r=n(22);t.exports=Object.keys||function(t){return i(t,r)}},function(t,e,n){var i=n(2),r=n(5),o=n(43);t.exports=function(t,e){if(i(t),r(e)&&e.constructor===t)return e;var n=o.f(t);return(0,n.resolve)(e),n.promise}},function(t,e,n){var i=n(10),r=n(0),o=r["__core-js_shared__"]||(r["__core-js_shared__"]={});(t.exports=function(t,e){return o[t]||(o[t]=void 0!==e?e:{})})("versions",[]).push({version:i.version,mode:n(24)?"pure":"global",copyright:"© 2018 Denis Pushkarev (zloirock.ru)"})},function(t,e,n){var i=n(2),r=n(14),o=n(1)("species");t.exports=function(t,e){var n,s=i(t).constructor;return void 0===s||void 0==(n=i(s)[o])?e:r(n)}},function(t,e,n){var i=n(3),r=n(16),o=n(7),s=n(84),u="["+s+"]",a="​",l=RegExp("^"+u+u+"*"),c=RegExp(u+u+"*$"),f=function(t,e,n){var r={},u=o(function(){return!!s[t]()||a[t]()!=a}),l=r[t]=u?e(p):s[t];n&&(r[n]=l),i(i.P+i.F*u,"String",r)},p=f.trim=function(t,e){return t=String(r(t)),1&e&&(t=t.replace(l,"")),2&e&&(t=t.replace(c,"")),t};t.exports=f},function(t,e,n){var i,r,o,s=n(11),u=n(68),a=n(40),l=n(21),c=n(0),f=c.process,p=c.setImmediate,h=c.clearImmediate,d=c.MessageChannel,v=c.Dispatch,g=0,y={},m=function(){var t=+this;if(y.hasOwnProperty(t)){var e=y[t];delete y[t],e()}},b=function(t){m.call(t.data)};p&&h||(p=function(t){for(var e=[],n=1;arguments.length>n;)e.push(arguments[n++]);return y[++g]=function(){u("function"==typeof t?t:Function(t),e)},i(g),g},h=function(t){delete y[t]},"process"==n(9)(f)?i=function(t){f.nextTick(s(m,t,1))}:v&&v.now?i=function(t){v.now(s(m,t,1))}:d?(r=new d,o=r.port2,r.port1.onmessage=b,i=s(o.postMessage,o,1)):c.addEventListener&&"function"==typeof postMessage&&!c.importScripts?(i=function(t){c.postMessage(t+"","*")},c.addEventListener("message",b,!1)):i="onreadystatechange"in l("script")?function(t){a.appendChild(l("script")).onreadystatechange=function(){a.removeChild(this),m.call(t)}}:function(t){setTimeout(s(m,t,1),0)}),t.exports={set:p,clear:h}},function(t,e){var n=Math.ceil,i=Math.floor;t.exports=function(t){return isNaN(t=+t)?0:(t>0?i:n)(t)}},function(t,e,n){"use strict";var i=n(3),r=n(20)(5),o=!0;"find"in[]&&Array(1).find(function(){o=!1}),i(i.P+i.F*o,"Array",{find:function(t){return r(this,t,arguments.length>1?arguments[1]:void 0)}}),n(36)("find")},function(t,e,n){"use strict";var i,r,o,s,u=n(24),a=n(0),l=n(11),c=n(38),f=n(3),p=n(5),h=n(14),d=n(61),v=n(66),g=n(50),y=n(52).set,m=n(75)(),b=n(43),_=n(80),x=n(86),w=n(48),S=a.TypeError,O=a.process,L=O&&O.versions,k=L&&L.v8||"",P=a.Promise,T="process"==c(O),V=function(){},E=r=b.f,A=!!function(){try{var t=P.resolve(1),e=(t.constructor={})[n(1)("species")]=function(t){t(V,V)};return(T||"function"==typeof PromiseRejectionEvent)&&t.then(V)instanceof e&&0!==k.indexOf("6.6")&&-1===x.indexOf("Chrome/66")}catch(t){}}(),C=function(t){var e;return!(!p(t)||"function"!=typeof(e=t.then))&&e},D=function(t,e){if(!t._n){t._n=!0;var n=t._c;m(function(){for(var i=t._v,r=1==t._s,o=0;n.length>o;)!function(e){var n,o,s,u=r?e.ok:e.fail,a=e.resolve,l=e.reject,c=e.domain;try{u?(r||(2==t._h&&$(t),t._h=1),!0===u?n=i:(c&&c.enter(),n=u(i),c&&(c.exit(),s=!0)),n===e.promise?l(S("Promise-chain cycle")):(o=C(n))?o.call(n,a,l):a(n)):l(i)}catch(t){c&&!s&&c.exit(),l(t)}}(n[o++]);t._c=[],t._n=!1,e&&!t._h&&j(t)})}},j=function(t){y.call(a,function(){var e,n,i,r=t._v,o=N(t);if(o&&(e=_(function(){T?O.emit("unhandledRejection",r,t):(n=a.onunhandledrejection)?n({promise:t,reason:r}):(i=a.console)&&i.error&&i.error("Unhandled promise rejection",r)}),t._h=T||N(t)?2:1),t._a=void 0,o&&e.e)throw e.v})},N=function(t){return 1!==t._h&&0===(t._a||t._c).length},$=function(t){y.call(a,function(){var e;T?O.emit("rejectionHandled",t):(e=a.onrejectionhandled)&&e({promise:t,reason:t._v})})},F=function(t){var e=this;e._d||(e._d=!0,e=e._w||e,e._v=t,e._s=2,e._a||(e._a=e._c.slice()),D(e,!0))},M=function(t){var e,n=this;if(!n._d){n._d=!0,n=n._w||n;try{if(n===t)throw S("Promise can't be resolved itself");(e=C(t))?m(function(){var i={_w:n,_d:!1};try{e.call(t,l(M,i,1),l(F,i,1))}catch(t){F.call(i,t)}}):(n._v=t,n._s=1,D(n,!1))}catch(t){F.call({_w:n,_d:!1},t)}}};A||(P=function(t){d(this,P,"Promise","_h"),h(t),i.call(this);try{t(l(M,this,1),l(F,this,1))}catch(t){F.call(this,t)}},i=function(t){this._c=[],this._a=void 0,this._s=0,this._d=!1,this._v=void 0,this._h=0,this._n=!1},i.prototype=n(81)(P.prototype,{then:function(t,e){var n=E(g(this,P));return n.ok="function"!=typeof t||t,n.fail="function"==typeof e&&e,n.domain=T?O.domain:void 0,this._c.push(n),this._a&&this._a.push(n),this._s&&D(this,!1),n.promise},catch:function(t){return this.then(void 0,t)}}),o=function(){var t=new i;this.promise=t,this.resolve=l(M,t,1),this.reject=l(F,t,1)},b.f=E=function(t){return t===P||t===s?new o(t):r(t)}),f(f.G+f.W+f.F*!A,{Promise:P}),n(26)(P,"Promise"),n(83)("Promise"),s=n(10).Promise,f(f.S+f.F*!A,"Promise",{reject:function(t){var e=E(this);return(0,e.reject)(t),e.promise}}),f(f.S+f.F*(u||!A),"Promise",{resolve:function(t){return w(u&&this===s?P:this,t)}}),f(f.S+f.F*!(A&&n(73)(function(t){P.all(t).catch(V)})),"Promise",{all:function(t){var e=this,n=E(e),i=n.resolve,r=n.reject,o=_(function(){var n=[],o=0,s=1;v(t,!1,function(t){var u=o++,a=!1;n.push(void 0),s++,e.resolve(t).then(function(t){a||(a=!0,n[u]=t,--s||i(n))},r)}),--s||i(n)});return o.e&&r(o.v),n.promise},race:function(t){var e=this,n=E(e),i=n.reject,r=_(function(){v(t,!1,function(t){e.resolve(t).then(n.resolve,i)})});return r.e&&i(r.v),n.promise}})},function(t,e,n){"use strict";var i=n(3),r=n(10),o=n(0),s=n(50),u=n(48);i(i.P+i.R,"Promise",{finally:function(t){var e=s(this,r.Promise||o.Promise),n="function"==typeof t;return this.then(n?function(n){return u(e,t()).then(function(){return n})}:t,n?function(n){return u(e,t()).then(function(){throw n})}:t)}})},function(t,e,n){"use strict";function i(t){n(99)}var r=n(35),o=n(101),s=n(100),u=i,a=s(r.a,o.a,!1,u,null,null);e.a=a.exports},function(t,e,n){"use strict";function i(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}e.a=i},function(t,e,n){"use strict";function i(t){return(i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function r(t){return(r="function"==typeof Symbol&&"symbol"===i(Symbol.iterator)?function(t){return i(t)}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":i(t)})(t)}e.a=r},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(34),r=(n.n(i),n(55)),o=(n.n(r),n(56)),s=(n.n(o),n(57)),u=n(32),a=n(33);n.d(e,"Multiselect",function(){return s.a}),n.d(e,"multiselectMixin",function(){return u.a}),n.d(e,"pointerMixin",function(){return a.a}),e.default=s.a},function(t,e){t.exports=function(t,e,n,i){if(!(t instanceof e)||void 0!==i&&i in t)throw TypeError(n+": incorrect invocation!");return t}},function(t,e,n){var i=n(14),r=n(28),o=n(23),s=n(19);t.exports=function(t,e,n,u,a){i(e);var l=r(t),c=o(l),f=s(l.length),p=a?f-1:0,h=a?-1:1;if(n<2)for(;;){if(p in c){u=c[p],p+=h;break}if(p+=h,a?p<0:f<=p)throw TypeError("Reduce of empty array with no initial value")}for(;a?p>=0:f>p;p+=h)p in c&&(u=e(u,c[p],p,l));return u}},function(t,e,n){var i=n(5),r=n(42),o=n(1)("species");t.exports=function(t){var e;return r(t)&&(e=t.constructor,"function"!=typeof e||e!==Array&&!r(e.prototype)||(e=void 0),i(e)&&null===(e=e[o])&&(e=void 0)),void 0===e?Array:e}},function(t,e,n){var i=n(63);t.exports=function(t,e){return new(i(t))(e)}},function(t,e,n){"use strict";var i=n(8),r=n(6),o=n(7),s=n(16),u=n(1);t.exports=function(t,e,n){var a=u(t),l=n(s,a,""[t]),c=l[0],f=l[1];o(function(){var e={};return e[a]=function(){return 7},7!=""[t](e)})&&(r(String.prototype,t,c),i(RegExp.prototype,a,2==e?function(t,e){return f.call(t,this,e)}:function(t){return f.call(t,this)}))}},function(t,e,n){var i=n(11),r=n(70),o=n(69),s=n(2),u=n(19),a=n(87),l={},c={},e=t.exports=function(t,e,n,f,p){var h,d,v,g,y=p?function(){return t}:a(t),m=i(n,f,e?2:1),b=0;if("function"!=typeof y)throw TypeError(t+" is not iterable!");if(o(y)){for(h=u(t.length);h>b;b++)if((g=e?m(s(d=t[b])[0],d[1]):m(t[b]))===l||g===c)return g}else for(v=y.call(t);!(d=v.next()).done;)if((g=r(v,m,d.value,e))===l||g===c)return g};e.BREAK=l,e.RETURN=c},function(t,e,n){var i=n(5),r=n(82).set;t.exports=function(t,e,n){var o,s=e.constructor;return s!==n&&"function"==typeof s&&(o=s.prototype)!==n.prototype&&i(o)&&r&&r(t,o),t}},function(t,e){t.exports=function(t,e,n){var i=void 0===n;switch(e.length){case 0:return i?t():t.call(n);case 1:return i?t(e[0]):t.call(n,e[0]);case 2:return i?t(e[0],e[1]):t.call(n,e[0],e[1]);case 3:return i?t(e[0],e[1],e[2]):t.call(n,e[0],e[1],e[2]);case 4:return i?t(e[0],e[1],e[2],e[3]):t.call(n,e[0],e[1],e[2],e[3])}return t.apply(n,e)}},function(t,e,n){var i=n(15),r=n(1)("iterator"),o=Array.prototype;t.exports=function(t){return void 0!==t&&(i.Array===t||o[r]===t)}},function(t,e,n){var i=n(2);t.exports=function(t,e,n,r){try{return r?e(i(n)[0],n[1]):e(n)}catch(e){var o=t.return;throw void 0!==o&&i(o.call(t)),e}}},function(t,e,n){"use strict";var i=n(44),r=n(25),o=n(26),s={};n(8)(s,n(1)("iterator"),function(){return this}),t.exports=function(t,e,n){t.prototype=i(s,{next:r(1,n)}),o(t,e+" Iterator")}},function(t,e,n){"use strict";var i=n(24),r=n(3),o=n(6),s=n(8),u=n(15),a=n(71),l=n(26),c=n(78),f=n(1)("iterator"),p=!([].keys&&"next"in[].keys()),h=function(){return this};t.exports=function(t,e,n,d,v,g,y){a(n,e,d);var m,b,_,x=function(t){if(!p&&t in L)return L[t];switch(t){case"keys":case"values":return function(){return new n(this,t)}}return function(){return new n(this,t)}},w=e+" Iterator",S="values"==v,O=!1,L=t.prototype,k=L[f]||L["@@iterator"]||v&&L[v],P=k||x(v),T=v?S?x("entries"):P:void 0,V="Array"==e?L.entries||k:k;if(V&&(_=c(V.call(new t)))!==Object.prototype&&_.next&&(l(_,w,!0),i||"function"==typeof _[f]||s(_,f,h)),S&&k&&"values"!==k.name&&(O=!0,P=function(){return k.call(this)}),i&&!y||!p&&!O&&L[f]||s(L,f,P),u[e]=P,u[w]=h,v)if(m={values:S?P:x("values"),keys:g?P:x("keys"),entries:T},y)for(b in m)b in L||o(L,b,m[b]);else r(r.P+r.F*(p||O),e,m);return m}},function(t,e,n){var i=n(1)("iterator"),r=!1;try{var o=[7][i]();o.return=function(){r=!0},Array.from(o,function(){throw 2})}catch(t){}t.exports=function(t,e){if(!e&&!r)return!1;var n=!1;try{var o=[7],s=o[i]();s.next=function(){return{done:n=!0}},o[i]=function(){return s},t(o)}catch(t){}return n}},function(t,e){t.exports=function(t,e){return{value:e,done:!!t}}},function(t,e,n){var i=n(0),r=n(52).set,o=i.MutationObserver||i.WebKitMutationObserver,s=i.process,u=i.Promise,a="process"==n(9)(s);t.exports=function(){var t,e,n,l=function(){var i,r;for(a&&(i=s.domain)&&i.exit();t;){r=t.fn,t=t.next;try{r()}catch(i){throw t?n():e=void 0,i}}e=void 0,i&&i.enter()};if(a)n=function(){s.nextTick(l)};else if(!o||i.navigator&&i.navigator.standalone)if(u&&u.resolve){var c=u.resolve(void 0);n=function(){c.then(l)}}else n=function(){r.call(i,l)};else{var f=!0,p=document.createTextNode("");new o(l).observe(p,{characterData:!0}),n=function(){p.data=f=!f}}return function(i){var r={fn:i,next:void 0};e&&(e.next=r),t||(t=r,n()),e=r}}},function(t,e,n){var i=n(13),r=n(2),o=n(47);t.exports=n(4)?Object.defineProperties:function(t,e){r(t);for(var n,s=o(e),u=s.length,a=0;u>a;)i.f(t,n=s[a++],e[n]);return t}},function(t,e,n){var i=n(46),r=n(22).concat("length","prototype");e.f=Object.getOwnPropertyNames||function(t){return i(t,r)}},function(t,e,n){var i=n(12),r=n(28),o=n(27)("IE_PROTO"),s=Object.prototype;t.exports=Object.getPrototypeOf||function(t){return t=r(t),i(t,o)?t[o]:"function"==typeof t.constructor&&t instanceof t.constructor?t.constructor.prototype:t instanceof Object?s:null}},function(t,e){e.f={}.propertyIsEnumerable},function(t,e){t.exports=function(t){try{return{e:!1,v:t()}}catch(t){return{e:!0,v:t}}}},function(t,e,n){var i=n(6);t.exports=function(t,e,n){for(var r in e)i(t,r,e[r],n);return t}},function(t,e,n){var i=n(5),r=n(2),o=function(t,e){if(r(t),!i(e)&&null!==e)throw TypeError(e+": can't set as prototype!")};t.exports={set:Object.setPrototypeOf||("__proto__"in{}?function(t,e,i){try{i=n(11)(Function.call,n(45).f(Object.prototype,"__proto__").set,2),i(t,[]),e=!(t instanceof Array)}catch(t){e=!0}return function(t,n){return o(t,n),e?t.__proto__=n:i(t,n),t}}({},!1):void 0),check:o}},function(t,e,n){"use strict";var i=n(0),r=n(13),o=n(4),s=n(1)("species");t.exports=function(t){var e=i[t];o&&e&&!e[s]&&r.f(e,s,{configurable:!0,get:function(){return this}})}},function(t,e){t.exports="\t\n\v\f\r   ᠎             　\u2028\u2029\ufeff"},function(t,e,n){var i=n(53),r=Math.max,o=Math.min;t.exports=function(t,e){return t=i(t),t<0?r(t+e,0):o(t,e)}},function(t,e,n){var i=n(0),r=i.navigator;t.exports=r&&r.userAgent||""},function(t,e,n){var i=n(38),r=n(1)("iterator"),o=n(15);t.exports=n(10).getIteratorMethod=function(t){if(void 0!=t)return t[r]||t["@@iterator"]||o[i(t)]}},function(t,e,n){"use strict";var i=n(3),r=n(20)(2);i(i.P+i.F*!n(17)([].filter,!0),"Array",{filter:function(t){return r(this,t,arguments[1])}})},function(t,e,n){"use strict";var i=n(3),r=n(37)(!1),o=[].indexOf,s=!!o&&1/[1].indexOf(1,-0)<0;i(i.P+i.F*(s||!n(17)(o)),"Array",{indexOf:function(t){return s?o.apply(this,arguments)||0:r(this,t,arguments[1])}})},function(t,e,n){var i=n(3);i(i.S,"Array",{isArray:n(42)})},function(t,e,n){"use strict";var i=n(3),r=n(20)(1);i(i.P+i.F*!n(17)([].map,!0),"Array",{map:function(t){return r(this,t,arguments[1])}})},function(t,e,n){"use strict";var i=n(3),r=n(62);i(i.P+i.F*!n(17)([].reduce,!0),"Array",{reduce:function(t){return r(this,t,arguments.length,arguments[1],!1)}})},function(t,e,n){var i=Date.prototype,r=i.toString,o=i.getTime;new Date(NaN)+""!="Invalid Date"&&n(6)(i,"toString",function(){var t=o.call(this);return t===t?r.call(this):"Invalid Date"})},function(t,e,n){n(4)&&"g"!=/./g.flags&&n(13).f(RegExp.prototype,"flags",{configurable:!0,get:n(39)})},function(t,e,n){n(65)("search",1,function(t,e,n){return[function(n){"use strict";var i=t(this),r=void 0==n?void 0:n[e];return void 0!==r?r.call(n,i):new RegExp(n)[e](String(i))},n]})},function(t,e,n){"use strict";n(94);var i=n(2),r=n(39),o=n(4),s=/./.toString,u=function(t){n(6)(RegExp.prototype,"toString",t,!0)};n(7)(function(){return"/a/b"!=s.call({source:"a",flags:"b"})})?u(function(){var t=i(this);return"/".concat(t.source,"/","flags"in t?t.flags:!o&&t instanceof RegExp?r.call(t):void 0)}):"toString"!=s.name&&u(function(){return s.call(this)})},function(t,e,n){"use strict";n(51)("trim",function(t){return function(){return t(this,3)}})},function(t,e,n){for(var i=n(34),r=n(47),o=n(6),s=n(0),u=n(8),a=n(15),l=n(1),c=l("iterator"),f=l("toStringTag"),p=a.Array,h={CSSRuleList:!0,CSSStyleDeclaration:!1,CSSValueList:!1,ClientRectList:!1,DOMRectList:!1,DOMStringList:!1,DOMTokenList:!0,DataTransferItemList:!1,FileList:!1,HTMLAllCollection:!1,HTMLCollection:!1,HTMLFormElement:!1,HTMLSelectElement:!1,MediaList:!0,MimeTypeArray:!1,NamedNodeMap:!1,NodeList:!0,PaintRequestList:!1,Plugin:!1,PluginArray:!1,SVGLengthList:!1,SVGNumberList:!1,SVGPathSegList:!1,SVGPointList:!1,SVGStringList:!1,SVGTransformList:!1,SourceBufferList:!1,StyleSheetList:!0,TextTrackCueList:!1,TextTrackList:!1,TouchList:!1},d=r(h),v=0;v<d.length;v++){var g,y=d[v],m=h[y],b=s[y],_=b&&b.prototype;if(_&&(_[c]||u(_,c,p),_[f]||u(_,f,y),a[y]=p,m))for(g in i)_[g]||o(_,g,i[g],!0)}},function(t,e){},function(t,e){t.exports=function(t,e,n,i,r,o){var s,u=t=t||{},a=typeof t.default;"object"!==a&&"function"!==a||(s=t,u=t.default);var l="function"==typeof u?u.options:u;e&&(l.render=e.render,l.staticRenderFns=e.staticRenderFns,l._compiled=!0),n&&(l.functional=!0),r&&(l._scopeId=r);var c;if(o?(c=function(t){t=t||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext,t||"undefined"==typeof __VUE_SSR_CONTEXT__||(t=__VUE_SSR_CONTEXT__),i&&i.call(this,t),t&&t._registeredComponents&&t._registeredComponents.add(o)},l._ssrRegister=c):i&&(c=i),c){var f=l.functional,p=f?l.render:l.beforeCreate;f?(l._injectStyles=c,l.render=function(t,e){return c.call(e),p(t,e)}):l.beforeCreate=p?[].concat(p,c):[c]}return{esModule:s,exports:u,options:l}}},function(t,e,n){"use strict";var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"multiselect",class:{"multiselect--active":t.isOpen,"multiselect--disabled":t.disabled,"multiselect--above":t.isAbove},attrs:{tabindex:t.searchable?-1:t.tabindex},on:{focus:function(e){t.activate()},blur:function(e){!t.searchable&&t.deactivate()},keydown:[function(e){return"button"in e||!t._k(e.keyCode,"down",40,e.key,["Down","ArrowDown"])?e.target!==e.currentTarget?null:(e.preventDefault(),void t.pointerForward()):null},function(e){return"button"in e||!t._k(e.keyCode,"up",38,e.key,["Up","ArrowUp"])?e.target!==e.currentTarget?null:(e.preventDefault(),void t.pointerBackward()):null}],keypress:function(e){return"button"in e||!t._k(e.keyCode,"enter",13,e.key,"Enter")||!t._k(e.keyCode,"tab",9,e.key,"Tab")?(e.stopPropagation(),e.target!==e.currentTarget?null:void t.addPointerElement(e)):null},keyup:function(e){if(!("button"in e)&&t._k(e.keyCode,"esc",27,e.key,"Escape"))return null;t.deactivate()}}},[t._t("caret",[n("div",{staticClass:"multiselect__select",on:{mousedown:function(e){e.preventDefault(),e.stopPropagation(),t.toggle()}}})],{toggle:t.toggle}),t._v(" "),t._t("clear",null,{search:t.search}),t._v(" "),n("div",{ref:"tags",staticClass:"multiselect__tags"},[t._t("selection",[n("div",{directives:[{name:"show",rawName:"v-show",value:t.visibleValues.length>0,expression:"visibleValues.length > 0"}],staticClass:"multiselect__tags-wrap"},[t._l(t.visibleValues,function(e,i){return[t._t("tag",[n("span",{key:i,staticClass:"multiselect__tag"},[n("span",{domProps:{textContent:t._s(t.getOptionLabel(e))}}),t._v(" "),n("i",{staticClass:"multiselect__tag-icon",attrs:{"aria-hidden":"true",tabindex:"1"},on:{keypress:function(n){if(!("button"in n)&&t._k(n.keyCode,"enter",13,n.key,"Enter"))return null;n.preventDefault(),t.removeElement(e)},mousedown:function(n){n.preventDefault(),t.removeElement(e)}}})])],{option:e,search:t.search,remove:t.removeElement})]})],2),t._v(" "),t.internalValue&&t.internalValue.length>t.limit?[t._t("limit",[n("strong",{staticClass:"multiselect__strong",domProps:{textContent:t._s(t.limitText(t.internalValue.length-t.limit))}})])]:t._e()],{search:t.search,remove:t.removeElement,values:t.visibleValues,isOpen:t.isOpen}),t._v(" "),n("transition",{attrs:{name:"multiselect__loading"}},[t._t("loading",[n("div",{directives:[{name:"show",rawName:"v-show",value:t.loading,expression:"loading"}],staticClass:"multiselect__spinner"})])],2),t._v(" "),t.searchable?n("input",{ref:"search",staticClass:"multiselect__input",style:t.inputStyle,attrs:{name:t.name,id:t.id,type:"text",autocomplete:"nope",placeholder:t.placeholder,disabled:t.disabled,tabindex:t.tabindex},domProps:{value:t.search},on:{input:function(e){t.updateSearch(e.target.value)},focus:function(e){e.preventDefault(),t.activate()},blur:function(e){e.preventDefault(),t.deactivate()},keyup:function(e){if(!("button"in e)&&t._k(e.keyCode,"esc",27,e.key,"Escape"))return null;t.deactivate()},keydown:[function(e){if(!("button"in e)&&t._k(e.keyCode,"down",40,e.key,["Down","ArrowDown"]))return null;e.preventDefault(),t.pointerForward()},function(e){if(!("button"in e)&&t._k(e.keyCode,"up",38,e.key,["Up","ArrowUp"]))return null;e.preventDefault(),t.pointerBackward()},function(e){if(!("button"in e)&&t._k(e.keyCode,"delete",[8,46],e.key,["Backspace","Delete"]))return null;e.stopPropagation(),t.removeLastElement()}],keypress:function(e){return"button"in e||!t._k(e.keyCode,"enter",13,e.key,"Enter")?(e.preventDefault(),e.stopPropagation(),e.target!==e.currentTarget?null:void t.addPointerElement(e)):null}}}):t._e(),t._v(" "),t.isSingleLabelVisible?n("span",{staticClass:"multiselect__single",on:{mousedown:function(e){return e.preventDefault(),t.toggle(e)}}},[t._t("singleLabel",[[t._v(t._s(t.currentOptionLabel))]],{option:t.singleValue})],2):t._e(),t._v(" "),t.isPlaceholderVisible?n("span",{staticClass:"multiselect__placeholder",on:{mousedown:function(e){return e.preventDefault(),t.toggle(e)}}},[t._t("placeholder",[t._v("\n          "+t._s(t.placeholder)+"\n        ")])],2):t._e()],2),t._v(" "),n("transition",{attrs:{name:"multiselect"}},[n("div",{directives:[{name:"show",rawName:"v-show",value:t.isOpen,expression:"isOpen"}],ref:"list",staticClass:"multiselect__content-wrapper",style:{maxHeight:t.optimizedHeight+"px"},attrs:{tabindex:"-1"},on:{focus:t.activate,mousedown:function(t){t.preventDefault()}}},[n("ul",{staticClass:"multiselect__content",style:t.contentStyle},[t._t("beforeList"),t._v(" "),t.multiple&&t.max===t.internalValue.length?n("li",[n("span",{staticClass:"multiselect__option"},[t._t("maxElements",[t._v("Maximum of "+t._s(t.max)+" options selected. First remove a selected option to select another.")])],2)]):t._e(),t._v(" "),!t.max||t.internalValue.length<t.max?t._l(t.filteredOptions,function(e,i){return n("li",{key:i,staticClass:"multiselect__element"},[e&&(e.$isLabel||e.$isDisabled)?t._e():n("span",{staticClass:"multiselect__option",class:t.optionHighlight(i,e),attrs:{"data-select":e&&e.isTag?t.tagPlaceholder:t.selectLabelText,"data-selected":t.selectedLabelText,"data-deselect":t.deselectLabelText},on:{click:function(n){n.stopPropagation(),t.select(e)},mouseenter:function(e){if(e.target!==e.currentTarget)return null;t.pointerSet(i)}}},[t._t("option",[n("span",[t._v(t._s(t.getOptionLabel(e)))])],{option:e,search:t.search})],2),t._v(" "),e&&(e.$isLabel||e.$isDisabled)?n("span",{staticClass:"multiselect__option",class:t.groupHighlight(i,e),attrs:{"data-select":t.groupSelect&&t.selectGroupLabelText,"data-deselect":t.groupSelect&&t.deselectGroupLabelText},on:{mouseenter:function(e){if(e.target!==e.currentTarget)return null;t.groupSelect&&t.pointerSet(i)},mousedown:function(n){n.preventDefault(),t.selectGroup(e)}}},[t._t("option",[n("span",[t._v(t._s(t.getOptionLabel(e)))])],{option:e,search:t.search})],2):t._e()])}):t._e(),t._v(" "),n("li",{directives:[{name:"show",rawName:"v-show",value:t.showNoResults&&0===t.filteredOptions.length&&t.search&&!t.loading,expression:"showNoResults && (filteredOptions.length === 0 && search && !loading)"}]},[n("span",{staticClass:"multiselect__option"},[t._t("noResult",[t._v("No elements found. Consider changing the search query.")],{search:t.search})],2)]),t._v(" "),n("li",{directives:[{name:"show",rawName:"v-show",value:t.showNoOptions&&0===t.options.length&&!t.search&&!t.loading,expression:"showNoOptions && (options.length === 0 && !search && !loading)"}]},[n("span",{staticClass:"multiselect__option"},[t._t("noOptions",[t._v("List is empty.")])],2)]),t._v(" "),t._t("afterList")],2)])])],2)},r=[],o={render:i,staticRenderFns:r};e.a=o}])});

/***/ }),

/***/ "./node_modules/vuedraggable/dist/vuedraggable.umd.js":
/*!************************************************************!*\
  !*** ./node_modules/vuedraggable/dist/vuedraggable.umd.js ***!
  \************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

(function webpackUniversalModuleDefinition(root, factory) {
	if(true)
		module.exports = factory(__webpack_require__(/*! sortablejs */ "./node_modules/vuedraggable/node_modules/sortablejs/modular/sortable.esm.js"));
	else {}
})((typeof self !== 'undefined' ? self : this), function(__WEBPACK_EXTERNAL_MODULE_a352__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __nested_webpack_require_688__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __nested_webpack_require_688__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__nested_webpack_require_688__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__nested_webpack_require_688__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__nested_webpack_require_688__.d = function(exports, name, getter) {
/******/ 		if(!__nested_webpack_require_688__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__nested_webpack_require_688__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__nested_webpack_require_688__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __nested_webpack_require_688__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__nested_webpack_require_688__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __nested_webpack_require_688__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__nested_webpack_require_688__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__nested_webpack_require_688__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__nested_webpack_require_688__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__nested_webpack_require_688__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __nested_webpack_require_688__(__nested_webpack_require_688__.s = "fb15");
/******/ })
/************************************************************************/
/******/ ({

/***/ "01f9":
/***/ (function(module, exports, __nested_webpack_require_4164__) {

"use strict";

var LIBRARY = __nested_webpack_require_4164__("2d00");
var $export = __nested_webpack_require_4164__("5ca1");
var redefine = __nested_webpack_require_4164__("2aba");
var hide = __nested_webpack_require_4164__("32e9");
var Iterators = __nested_webpack_require_4164__("84f2");
var $iterCreate = __nested_webpack_require_4164__("41a0");
var setToStringTag = __nested_webpack_require_4164__("7f20");
var getPrototypeOf = __nested_webpack_require_4164__("38fd");
var ITERATOR = __nested_webpack_require_4164__("2b4c")('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && typeof IteratorPrototype[ITERATOR] != 'function') hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),

/***/ "02f4":
/***/ (function(module, exports, __nested_webpack_require_7070__) {

var toInteger = __nested_webpack_require_7070__("4588");
var defined = __nested_webpack_require_7070__("be13");
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};


/***/ }),

/***/ "0390":
/***/ (function(module, exports, __nested_webpack_require_7783__) {

"use strict";

var at = __nested_webpack_require_7783__("02f4")(true);

 // `AdvanceStringIndex` abstract operation
// https://tc39.github.io/ecma262/#sec-advancestringindex
module.exports = function (S, index, unicode) {
  return index + (unicode ? at(S, index).length : 1);
};


/***/ }),

/***/ "0bfb":
/***/ (function(module, exports, __nested_webpack_require_8134__) {

"use strict";

// 21.2.5.3 get RegExp.prototype.flags
var anObject = __nested_webpack_require_8134__("cb7c");
module.exports = function () {
  var that = anObject(this);
  var result = '';
  if (that.global) result += 'g';
  if (that.ignoreCase) result += 'i';
  if (that.multiline) result += 'm';
  if (that.unicode) result += 'u';
  if (that.sticky) result += 'y';
  return result;
};


/***/ }),

/***/ "0d58":
/***/ (function(module, exports, __nested_webpack_require_8593__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __nested_webpack_require_8593__("ce10");
var enumBugKeys = __nested_webpack_require_8593__("e11e");

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),

/***/ "1495":
/***/ (function(module, exports, __nested_webpack_require_8892__) {

var dP = __nested_webpack_require_8892__("86cc");
var anObject = __nested_webpack_require_8892__("cb7c");
var getKeys = __nested_webpack_require_8892__("0d58");

module.exports = __nested_webpack_require_8892__("9e1e") ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),

/***/ "214f":
/***/ (function(module, exports, __nested_webpack_require_9392__) {

"use strict";

__nested_webpack_require_9392__("b0c5");
var redefine = __nested_webpack_require_9392__("2aba");
var hide = __nested_webpack_require_9392__("32e9");
var fails = __nested_webpack_require_9392__("79e5");
var defined = __nested_webpack_require_9392__("be13");
var wks = __nested_webpack_require_9392__("2b4c");
var regexpExec = __nested_webpack_require_9392__("520a");

var SPECIES = wks('species');

var REPLACE_SUPPORTS_NAMED_GROUPS = !fails(function () {
  // #replace needs built-in support for named groups.
  // #match works fine because it just return the exec results, even if it has
  // a "grops" property.
  var re = /./;
  re.exec = function () {
    var result = [];
    result.groups = { a: '7' };
    return result;
  };
  return ''.replace(re, '$<a>') !== '7';
});

var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = (function () {
  // Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
  var re = /(?:)/;
  var originalExec = re.exec;
  re.exec = function () { return originalExec.apply(this, arguments); };
  var result = 'ab'.split(re);
  return result.length === 2 && result[0] === 'a' && result[1] === 'b';
})();

module.exports = function (KEY, length, exec) {
  var SYMBOL = wks(KEY);

  var DELEGATES_TO_SYMBOL = !fails(function () {
    // String methods call symbol-named RegEp methods
    var O = {};
    O[SYMBOL] = function () { return 7; };
    return ''[KEY](O) != 7;
  });

  var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL ? !fails(function () {
    // Symbol-named RegExp methods call .exec
    var execCalled = false;
    var re = /a/;
    re.exec = function () { execCalled = true; return null; };
    if (KEY === 'split') {
      // RegExp[@@split] doesn't call the regex's exec method, but first creates
      // a new one. We need to return the patched regex when creating the new one.
      re.constructor = {};
      re.constructor[SPECIES] = function () { return re; };
    }
    re[SYMBOL]('');
    return !execCalled;
  }) : undefined;

  if (
    !DELEGATES_TO_SYMBOL ||
    !DELEGATES_TO_EXEC ||
    (KEY === 'replace' && !REPLACE_SUPPORTS_NAMED_GROUPS) ||
    (KEY === 'split' && !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC)
  ) {
    var nativeRegExpMethod = /./[SYMBOL];
    var fns = exec(
      defined,
      SYMBOL,
      ''[KEY],
      function maybeCallNative(nativeMethod, regexp, str, arg2, forceStringMethod) {
        if (regexp.exec === regexpExec) {
          if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
            // The native String method already delegates to @@method (this
            // polyfilled function), leasing to infinite recursion.
            // We avoid it by directly calling the native @@method method.
            return { done: true, value: nativeRegExpMethod.call(regexp, str, arg2) };
          }
          return { done: true, value: nativeMethod.call(str, regexp, arg2) };
        }
        return { done: false };
      }
    );
    var strfn = fns[0];
    var rxfn = fns[1];

    redefine(String.prototype, KEY, strfn);
    hide(RegExp.prototype, SYMBOL, length == 2
      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
      ? function (string, arg) { return rxfn.call(string, this, arg); }
      // 21.2.5.6 RegExp.prototype[@@match](string)
      // 21.2.5.9 RegExp.prototype[@@search](string)
      : function (string) { return rxfn.call(string, this); }
    );
  }
};


/***/ }),

/***/ "230e":
/***/ (function(module, exports, __nested_webpack_require_12849__) {

var isObject = __nested_webpack_require_12849__("d3f4");
var document = __nested_webpack_require_12849__("7726").document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),

/***/ "23c6":
/***/ (function(module, exports, __nested_webpack_require_13233__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __nested_webpack_require_13233__("2d95");
var TAG = __nested_webpack_require_13233__("2b4c")('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};


/***/ }),

/***/ "2621":
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),

/***/ "2aba":
/***/ (function(module, exports, __nested_webpack_require_14160__) {

var global = __nested_webpack_require_14160__("7726");
var hide = __nested_webpack_require_14160__("32e9");
var has = __nested_webpack_require_14160__("69a8");
var SRC = __nested_webpack_require_14160__("ca5a")('src');
var $toString = __nested_webpack_require_14160__("fa5b");
var TO_STRING = 'toString';
var TPL = ('' + $toString).split(TO_STRING);

__nested_webpack_require_14160__("8378").inspectSource = function (it) {
  return $toString.call(it);
};

(module.exports = function (O, key, val, safe) {
  var isFunction = typeof val == 'function';
  if (isFunction) has(val, 'name') || hide(val, 'name', key);
  if (O[key] === val) return;
  if (isFunction) has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
  if (O === global) {
    O[key] = val;
  } else if (!safe) {
    delete O[key];
    hide(O, key, val);
  } else if (O[key]) {
    O[key] = val;
  } else {
    hide(O, key, val);
  }
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, TO_STRING, function toString() {
  return typeof this == 'function' && this[SRC] || $toString.call(this);
});


/***/ }),

/***/ "2aeb":
/***/ (function(module, exports, __nested_webpack_require_15334__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __nested_webpack_require_15334__("cb7c");
var dPs = __nested_webpack_require_15334__("1495");
var enumBugKeys = __nested_webpack_require_15334__("e11e");
var IE_PROTO = __nested_webpack_require_15334__("613b")('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __nested_webpack_require_15334__("230e")('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __nested_webpack_require_15334__("fab2").appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),

/***/ "2b4c":
/***/ (function(module, exports, __nested_webpack_require_16945__) {

var store = __nested_webpack_require_16945__("5537")('wks');
var uid = __nested_webpack_require_16945__("ca5a");
var Symbol = __nested_webpack_require_16945__("7726").Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),

/***/ "2d00":
/***/ (function(module, exports) {

module.exports = false;


/***/ }),

/***/ "2d95":
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),

/***/ "2fdb":
/***/ (function(module, exports, __nested_webpack_require_17667__) {

"use strict";
// 21.1.3.7 String.prototype.includes(searchString, position = 0)

var $export = __nested_webpack_require_17667__("5ca1");
var context = __nested_webpack_require_17667__("d2c8");
var INCLUDES = 'includes';

$export($export.P + $export.F * __nested_webpack_require_17667__("5147")(INCLUDES), 'String', {
  includes: function includes(searchString /* , position = 0 */) {
    return !!~context(this, searchString, INCLUDES)
      .indexOf(searchString, arguments.length > 1 ? arguments[1] : undefined);
  }
});


/***/ }),

/***/ "32e9":
/***/ (function(module, exports, __nested_webpack_require_18235__) {

var dP = __nested_webpack_require_18235__("86cc");
var createDesc = __nested_webpack_require_18235__("4630");
module.exports = __nested_webpack_require_18235__("9e1e") ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),

/***/ "38fd":
/***/ (function(module, exports, __nested_webpack_require_18611__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __nested_webpack_require_18611__("69a8");
var toObject = __nested_webpack_require_18611__("4bf8");
var IE_PROTO = __nested_webpack_require_18611__("613b")('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),

/***/ "41a0":
/***/ (function(module, exports, __nested_webpack_require_19205__) {

"use strict";

var create = __nested_webpack_require_19205__("2aeb");
var descriptor = __nested_webpack_require_19205__("4630");
var setToStringTag = __nested_webpack_require_19205__("7f20");
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__nested_webpack_require_19205__("32e9")(IteratorPrototype, __nested_webpack_require_19205__("2b4c")('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),

/***/ "456d":
/***/ (function(module, exports, __nested_webpack_require_19831__) {

// 19.1.2.14 Object.keys(O)
var toObject = __nested_webpack_require_19831__("4bf8");
var $keys = __nested_webpack_require_19831__("0d58");

__nested_webpack_require_19831__("5eda")('keys', function () {
  return function keys(it) {
    return $keys(toObject(it));
  };
});


/***/ }),

/***/ "4588":
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),

/***/ "4630":
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),

/***/ "4bf8":
/***/ (function(module, exports, __nested_webpack_require_20609__) {

// 7.1.13 ToObject(argument)
var defined = __nested_webpack_require_20609__("be13");
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),

/***/ "5147":
/***/ (function(module, exports, __nested_webpack_require_20831__) {

var MATCH = __nested_webpack_require_20831__("2b4c")('match');
module.exports = function (KEY) {
  var re = /./;
  try {
    '/./'[KEY](re);
  } catch (e) {
    try {
      re[MATCH] = false;
      return !'/./'[KEY](re);
    } catch (f) { /* empty */ }
  } return true;
};


/***/ }),

/***/ "520a":
/***/ (function(module, exports, __nested_webpack_require_21176__) {

"use strict";


var regexpFlags = __nested_webpack_require_21176__("0bfb");

var nativeExec = RegExp.prototype.exec;
// This always refers to the native implementation, because the
// String#replace polyfill uses ./fix-regexp-well-known-symbol-logic.js,
// which loads this file before patching the method.
var nativeReplace = String.prototype.replace;

var patchedExec = nativeExec;

var LAST_INDEX = 'lastIndex';

var UPDATES_LAST_INDEX_WRONG = (function () {
  var re1 = /a/,
      re2 = /b*/g;
  nativeExec.call(re1, 'a');
  nativeExec.call(re2, 'a');
  return re1[LAST_INDEX] !== 0 || re2[LAST_INDEX] !== 0;
})();

// nonparticipating capturing group, copied from es5-shim's String#split patch.
var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED;

if (PATCH) {
  patchedExec = function exec(str) {
    var re = this;
    var lastIndex, reCopy, match, i;

    if (NPCG_INCLUDED) {
      reCopy = new RegExp('^' + re.source + '$(?!\\s)', regexpFlags.call(re));
    }
    if (UPDATES_LAST_INDEX_WRONG) lastIndex = re[LAST_INDEX];

    match = nativeExec.call(re, str);

    if (UPDATES_LAST_INDEX_WRONG && match) {
      re[LAST_INDEX] = re.global ? match.index + match[0].length : lastIndex;
    }
    if (NPCG_INCLUDED && match && match.length > 1) {
      // Fix browsers whose `exec` methods don't consistently return `undefined`
      // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
      // eslint-disable-next-line no-loop-func
      nativeReplace.call(match[0], reCopy, function () {
        for (i = 1; i < arguments.length - 2; i++) {
          if (arguments[i] === undefined) match[i] = undefined;
        }
      });
    }

    return match;
  };
}

module.exports = patchedExec;


/***/ }),

/***/ "52a7":
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),

/***/ "5537":
/***/ (function(module, exports, __nested_webpack_require_23109__) {

var core = __nested_webpack_require_23109__("8378");
var global = __nested_webpack_require_23109__("7726");
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: core.version,
  mode: __nested_webpack_require_23109__("2d00") ? 'pure' : 'global',
  copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
});


/***/ }),

/***/ "5ca1":
/***/ (function(module, exports, __nested_webpack_require_23642__) {

var global = __nested_webpack_require_23642__("7726");
var core = __nested_webpack_require_23642__("8378");
var hide = __nested_webpack_require_23642__("32e9");
var redefine = __nested_webpack_require_23642__("2aba");
var ctx = __nested_webpack_require_23642__("9b43");
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE];
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
  var key, own, out, exp;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // extend global
    if (target) redefine(target, key, out, type & $export.U);
    // export
    if (exports[key] != out) hide(exports, key, exp);
    if (IS_PROTO && expProto[key] != out) expProto[key] = out;
  }
};
global.core = core;
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),

/***/ "5eda":
/***/ (function(module, exports, __nested_webpack_require_25367__) {

// most Object methods by ES6 should accept primitives
var $export = __nested_webpack_require_25367__("5ca1");
var core = __nested_webpack_require_25367__("8378");
var fails = __nested_webpack_require_25367__("79e5");
module.exports = function (KEY, exec) {
  var fn = (core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
};


/***/ }),

/***/ "5f1b":
/***/ (function(module, exports, __nested_webpack_require_25845__) {

"use strict";


var classof = __nested_webpack_require_25845__("23c6");
var builtinExec = RegExp.prototype.exec;

 // `RegExpExec` abstract operation
// https://tc39.github.io/ecma262/#sec-regexpexec
module.exports = function (R, S) {
  var exec = R.exec;
  if (typeof exec === 'function') {
    var result = exec.call(R, S);
    if (typeof result !== 'object') {
      throw new TypeError('RegExp exec method returned something other than an Object or null');
    }
    return result;
  }
  if (classof(R) !== 'RegExp') {
    throw new TypeError('RegExp#exec called on incompatible receiver');
  }
  return builtinExec.call(R, S);
};


/***/ }),

/***/ "613b":
/***/ (function(module, exports, __nested_webpack_require_26551__) {

var shared = __nested_webpack_require_26551__("5537")('keys');
var uid = __nested_webpack_require_26551__("ca5a");
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),

/***/ "626a":
/***/ (function(module, exports, __nested_webpack_require_26811__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __nested_webpack_require_26811__("2d95");
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),

/***/ "6762":
/***/ (function(module, exports, __nested_webpack_require_27194__) {

"use strict";

// https://github.com/tc39/Array.prototype.includes
var $export = __nested_webpack_require_27194__("5ca1");
var $includes = __nested_webpack_require_27194__("c366")(true);

$export($export.P, 'Array', {
  includes: function includes(el /* , fromIndex = 0 */) {
    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
  }
});

__nested_webpack_require_27194__("9c6c")('includes');


/***/ }),

/***/ "6821":
/***/ (function(module, exports, __nested_webpack_require_27659__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __nested_webpack_require_27659__("626a");
var defined = __nested_webpack_require_27659__("be13");
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),

/***/ "69a8":
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),

/***/ "6a99":
/***/ (function(module, exports, __nested_webpack_require_28155__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __nested_webpack_require_28155__("d3f4");
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),

/***/ "7333":
/***/ (function(module, exports, __nested_webpack_require_28898__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var getKeys = __nested_webpack_require_28898__("0d58");
var gOPS = __nested_webpack_require_28898__("2621");
var pIE = __nested_webpack_require_28898__("52a7");
var toObject = __nested_webpack_require_28898__("4bf8");
var IObject = __nested_webpack_require_28898__("626a");
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __nested_webpack_require_28898__("79e5")(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = gOPS.f;
  var isEnum = pIE.f;
  while (aLen > index) {
    var S = IObject(arguments[index++]);
    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
  } return T;
} : $assign;


/***/ }),

/***/ "7726":
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),

/***/ "77f1":
/***/ (function(module, exports, __nested_webpack_require_30635__) {

var toInteger = __nested_webpack_require_30635__("4588");
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),

/***/ "79e5":
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),

/***/ "7f20":
/***/ (function(module, exports, __nested_webpack_require_31112__) {

var def = __nested_webpack_require_31112__("86cc").f;
var has = __nested_webpack_require_31112__("69a8");
var TAG = __nested_webpack_require_31112__("2b4c")('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),

/***/ "8378":
/***/ (function(module, exports) {

var core = module.exports = { version: '2.6.5' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),

/***/ "84f2":
/***/ (function(module, exports) {

module.exports = {};


/***/ }),

/***/ "86cc":
/***/ (function(module, exports, __nested_webpack_require_31751__) {

var anObject = __nested_webpack_require_31751__("cb7c");
var IE8_DOM_DEFINE = __nested_webpack_require_31751__("c69a");
var toPrimitive = __nested_webpack_require_31751__("6a99");
var dP = Object.defineProperty;

exports.f = __nested_webpack_require_31751__("9e1e") ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),

/***/ "9b43":
/***/ (function(module, exports, __nested_webpack_require_32441__) {

// optional / simple context binding
var aFunction = __nested_webpack_require_32441__("d8e8");
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),

/***/ "9c6c":
/***/ (function(module, exports, __nested_webpack_require_33048__) {

// 22.1.3.31 Array.prototype[@@unscopables]
var UNSCOPABLES = __nested_webpack_require_33048__("2b4c")('unscopables');
var ArrayProto = Array.prototype;
if (ArrayProto[UNSCOPABLES] == undefined) __nested_webpack_require_33048__("32e9")(ArrayProto, UNSCOPABLES, {});
module.exports = function (key) {
  ArrayProto[UNSCOPABLES][key] = true;
};


/***/ }),

/***/ "9def":
/***/ (function(module, exports, __nested_webpack_require_33448__) {

// 7.1.15 ToLength
var toInteger = __nested_webpack_require_33448__("4588");
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),

/***/ "9e1e":
/***/ (function(module, exports, __nested_webpack_require_33750__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__nested_webpack_require_33750__("79e5")(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ "a352":
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_a352__;

/***/ }),

/***/ "a481":
/***/ (function(module, exports, __nested_webpack_require_34139__) {

"use strict";


var anObject = __nested_webpack_require_34139__("cb7c");
var toObject = __nested_webpack_require_34139__("4bf8");
var toLength = __nested_webpack_require_34139__("9def");
var toInteger = __nested_webpack_require_34139__("4588");
var advanceStringIndex = __nested_webpack_require_34139__("0390");
var regExpExec = __nested_webpack_require_34139__("5f1b");
var max = Math.max;
var min = Math.min;
var floor = Math.floor;
var SUBSTITUTION_SYMBOLS = /\$([$&`']|\d\d?|<[^>]*>)/g;
var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&`']|\d\d?)/g;

var maybeToString = function (it) {
  return it === undefined ? it : String(it);
};

// @@replace logic
__nested_webpack_require_34139__("214f")('replace', 2, function (defined, REPLACE, $replace, maybeCallNative) {
  return [
    // `String.prototype.replace` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.replace
    function replace(searchValue, replaceValue) {
      var O = defined(this);
      var fn = searchValue == undefined ? undefined : searchValue[REPLACE];
      return fn !== undefined
        ? fn.call(searchValue, O, replaceValue)
        : $replace.call(String(O), searchValue, replaceValue);
    },
    // `RegExp.prototype[@@replace]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@replace
    function (regexp, replaceValue) {
      var res = maybeCallNative($replace, regexp, this, replaceValue);
      if (res.done) return res.value;

      var rx = anObject(regexp);
      var S = String(this);
      var functionalReplace = typeof replaceValue === 'function';
      if (!functionalReplace) replaceValue = String(replaceValue);
      var global = rx.global;
      if (global) {
        var fullUnicode = rx.unicode;
        rx.lastIndex = 0;
      }
      var results = [];
      while (true) {
        var result = regExpExec(rx, S);
        if (result === null) break;
        results.push(result);
        if (!global) break;
        var matchStr = String(result[0]);
        if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
      }
      var accumulatedResult = '';
      var nextSourcePosition = 0;
      for (var i = 0; i < results.length; i++) {
        result = results[i];
        var matched = String(result[0]);
        var position = max(min(toInteger(result.index), S.length), 0);
        var captures = [];
        // NOTE: This is equivalent to
        //   captures = result.slice(1).map(maybeToString)
        // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
        // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
        // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.
        for (var j = 1; j < result.length; j++) captures.push(maybeToString(result[j]));
        var namedCaptures = result.groups;
        if (functionalReplace) {
          var replacerArgs = [matched].concat(captures, position, S);
          if (namedCaptures !== undefined) replacerArgs.push(namedCaptures);
          var replacement = String(replaceValue.apply(undefined, replacerArgs));
        } else {
          replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
        }
        if (position >= nextSourcePosition) {
          accumulatedResult += S.slice(nextSourcePosition, position) + replacement;
          nextSourcePosition = position + matched.length;
        }
      }
      return accumulatedResult + S.slice(nextSourcePosition);
    }
  ];

    // https://tc39.github.io/ecma262/#sec-getsubstitution
  function getSubstitution(matched, str, position, captures, namedCaptures, replacement) {
    var tailPos = position + matched.length;
    var m = captures.length;
    var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
    if (namedCaptures !== undefined) {
      namedCaptures = toObject(namedCaptures);
      symbols = SUBSTITUTION_SYMBOLS;
    }
    return $replace.call(replacement, symbols, function (match, ch) {
      var capture;
      switch (ch.charAt(0)) {
        case '$': return '$';
        case '&': return matched;
        case '`': return str.slice(0, position);
        case "'": return str.slice(tailPos);
        case '<':
          capture = namedCaptures[ch.slice(1, -1)];
          break;
        default: // \d\d?
          var n = +ch;
          if (n === 0) return match;
          if (n > m) {
            var f = floor(n / 10);
            if (f === 0) return match;
            if (f <= m) return captures[f - 1] === undefined ? ch.charAt(1) : captures[f - 1] + ch.charAt(1);
            return match;
          }
          capture = captures[n - 1];
      }
      return capture === undefined ? '' : capture;
    });
  }
});


/***/ }),

/***/ "aae3":
/***/ (function(module, exports, __nested_webpack_require_38885__) {

// 7.2.8 IsRegExp(argument)
var isObject = __nested_webpack_require_38885__("d3f4");
var cof = __nested_webpack_require_38885__("2d95");
var MATCH = __nested_webpack_require_38885__("2b4c")('match');
module.exports = function (it) {
  var isRegExp;
  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : cof(it) == 'RegExp');
};


/***/ }),

/***/ "ac6a":
/***/ (function(module, exports, __nested_webpack_require_39282__) {

var $iterators = __nested_webpack_require_39282__("cadf");
var getKeys = __nested_webpack_require_39282__("0d58");
var redefine = __nested_webpack_require_39282__("2aba");
var global = __nested_webpack_require_39282__("7726");
var hide = __nested_webpack_require_39282__("32e9");
var Iterators = __nested_webpack_require_39282__("84f2");
var wks = __nested_webpack_require_39282__("2b4c");
var ITERATOR = wks('iterator');
var TO_STRING_TAG = wks('toStringTag');
var ArrayValues = Iterators.Array;

var DOMIterables = {
  CSSRuleList: true, // TODO: Not spec compliant, should be false.
  CSSStyleDeclaration: false,
  CSSValueList: false,
  ClientRectList: false,
  DOMRectList: false,
  DOMStringList: false,
  DOMTokenList: true,
  DataTransferItemList: false,
  FileList: false,
  HTMLAllCollection: false,
  HTMLCollection: false,
  HTMLFormElement: false,
  HTMLSelectElement: false,
  MediaList: true, // TODO: Not spec compliant, should be false.
  MimeTypeArray: false,
  NamedNodeMap: false,
  NodeList: true,
  PaintRequestList: false,
  Plugin: false,
  PluginArray: false,
  SVGLengthList: false,
  SVGNumberList: false,
  SVGPathSegList: false,
  SVGPointList: false,
  SVGStringList: false,
  SVGTransformList: false,
  SourceBufferList: false,
  StyleSheetList: true, // TODO: Not spec compliant, should be false.
  TextTrackCueList: false,
  TextTrackList: false,
  TouchList: false
};

for (var collections = getKeys(DOMIterables), i = 0; i < collections.length; i++) {
  var NAME = collections[i];
  var explicit = DOMIterables[NAME];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  var key;
  if (proto) {
    if (!proto[ITERATOR]) hide(proto, ITERATOR, ArrayValues);
    if (!proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
    Iterators[NAME] = ArrayValues;
    if (explicit) for (key in $iterators) if (!proto[key]) redefine(proto, key, $iterators[key], true);
  }
}


/***/ }),

/***/ "b0c5":
/***/ (function(module, exports, __nested_webpack_require_41209__) {

"use strict";

var regexpExec = __nested_webpack_require_41209__("520a");
__nested_webpack_require_41209__("5ca1")({
  target: 'RegExp',
  proto: true,
  forced: regexpExec !== /./.exec
}, {
  exec: regexpExec
});


/***/ }),

/***/ "be13":
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),

/***/ "c366":
/***/ (function(module, exports, __nested_webpack_require_41706__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __nested_webpack_require_41706__("6821");
var toLength = __nested_webpack_require_41706__("9def");
var toAbsoluteIndex = __nested_webpack_require_41706__("77f1");
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),

/***/ "c649":
/***/ (function(module, __nested_webpack_exports__, __nested_webpack_require_42729__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/* harmony export (binding) */ __nested_webpack_require_42729__.d(__nested_webpack_exports__, "c", function() { return insertNodeAt; });
/* harmony export (binding) */ __nested_webpack_require_42729__.d(__nested_webpack_exports__, "a", function() { return camelize; });
/* harmony export (binding) */ __nested_webpack_require_42729__.d(__nested_webpack_exports__, "b", function() { return console; });
/* harmony export (binding) */ __nested_webpack_require_42729__.d(__nested_webpack_exports__, "d", function() { return removeNode; });
/* harmony import */ var core_js_modules_es6_regexp_replace__WEBPACK_IMPORTED_MODULE_0__ = __nested_webpack_require_42729__("a481");
/* harmony import */ var core_js_modules_es6_regexp_replace__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__nested_webpack_require_42729__.n(core_js_modules_es6_regexp_replace__WEBPACK_IMPORTED_MODULE_0__);


function getConsole() {
  if (typeof window !== "undefined") {
    return window.console;
  }

  return global.console;
}

var console = getConsole();

function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

var regex = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(regex, function (_, c) {
    return c ? c.toUpperCase() : "";
  });
});

function removeNode(node) {
  if (node.parentElement !== null) {
    node.parentElement.removeChild(node);
  }
}

function insertNodeAt(fatherNode, node, position) {
  var refNode = position === 0 ? fatherNode.children[0] : fatherNode.children[position - 1].nextSibling;
  fatherNode.insertBefore(node, refNode);
}


/* WEBPACK VAR INJECTION */}.call(this, __nested_webpack_require_42729__("c8ba")))

/***/ }),

/***/ "c69a":
/***/ (function(module, exports, __nested_webpack_require_44512__) {

module.exports = !__nested_webpack_require_44512__("9e1e") && !__nested_webpack_require_44512__("79e5")(function () {
  return Object.defineProperty(__nested_webpack_require_44512__("230e")('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ "c8ba":
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "ca5a":
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),

/***/ "cadf":
/***/ (function(module, exports, __nested_webpack_require_45568__) {

"use strict";

var addToUnscopables = __nested_webpack_require_45568__("9c6c");
var step = __nested_webpack_require_45568__("d53b");
var Iterators = __nested_webpack_require_45568__("84f2");
var toIObject = __nested_webpack_require_45568__("6821");

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __nested_webpack_require_45568__("01f9")(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),

/***/ "cb7c":
/***/ (function(module, exports, __nested_webpack_require_46777__) {

var isObject = __nested_webpack_require_46777__("d3f4");
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),

/***/ "ce10":
/***/ (function(module, exports, __nested_webpack_require_47019__) {

var has = __nested_webpack_require_47019__("69a8");
var toIObject = __nested_webpack_require_47019__("6821");
var arrayIndexOf = __nested_webpack_require_47019__("c366")(false);
var IE_PROTO = __nested_webpack_require_47019__("613b")('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),

/***/ "d2c8":
/***/ (function(module, exports, __nested_webpack_require_47655__) {

// helper for String#{startsWith, endsWith, includes}
var isRegExp = __nested_webpack_require_47655__("aae3");
var defined = __nested_webpack_require_47655__("be13");

module.exports = function (that, searchString, NAME) {
  if (isRegExp(searchString)) throw TypeError('String#' + NAME + " doesn't accept regex!");
  return String(defined(that));
};


/***/ }),

/***/ "d3f4":
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),

/***/ "d53b":
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),

/***/ "d8e8":
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),

/***/ "e11e":
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),

/***/ "f559":
/***/ (function(module, exports, __nested_webpack_require_48796__) {

"use strict";
// 21.1.3.18 String.prototype.startsWith(searchString [, position ])

var $export = __nested_webpack_require_48796__("5ca1");
var toLength = __nested_webpack_require_48796__("9def");
var context = __nested_webpack_require_48796__("d2c8");
var STARTS_WITH = 'startsWith';
var $startsWith = ''[STARTS_WITH];

$export($export.P + $export.F * __nested_webpack_require_48796__("5147")(STARTS_WITH), 'String', {
  startsWith: function startsWith(searchString /* , position = 0 */) {
    var that = context(this, searchString, STARTS_WITH);
    var index = toLength(Math.min(arguments.length > 1 ? arguments[1] : undefined, that.length));
    var search = String(searchString);
    return $startsWith
      ? $startsWith.call(that, search, index)
      : that.slice(index, index + search.length) === search;
  }
});


/***/ }),

/***/ "f6fd":
/***/ (function(module, exports) {

// document.currentScript polyfill by Adam Miller

// MIT license

(function(document){
  var currentScript = "currentScript",
      scripts = document.getElementsByTagName('script'); // Live NodeList collection

  // If browser needs currentScript polyfill, add get currentScript() to the document object
  if (!(currentScript in document)) {
    Object.defineProperty(document, currentScript, {
      get: function(){

        // IE 6-10 supports script readyState
        // IE 10+ support stack trace
        try { throw new Error(); }
        catch (err) {

          // Find the second match for the "at" string to get file src url from stack.
          // Specifically works with the format of stack traces in IE.
          var i, res = ((/.*at [^\(]*\((.*):.+:.+\)$/ig).exec(err.stack) || [false])[1];

          // For all scripts on the page, if src matches or if ready state is interactive, return the script tag
          for(i in scripts){
            if(scripts[i].src == res || scripts[i].readyState == "interactive"){
              return scripts[i];
            }
          }

          // If no match, return null
          return null;
        }
      }
    });
  }
})(document);


/***/ }),

/***/ "f751":
/***/ (function(module, exports, __nested_webpack_require_50913__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __nested_webpack_require_50913__("5ca1");

$export($export.S + $export.F, 'Object', { assign: __nested_webpack_require_50913__("7333") });


/***/ }),

/***/ "fa5b":
/***/ (function(module, exports, __nested_webpack_require_51166__) {

module.exports = __nested_webpack_require_51166__("5537")('native-function-to-string', Function.toString);


/***/ }),

/***/ "fab2":
/***/ (function(module, exports, __nested_webpack_require_51344__) {

var document = __nested_webpack_require_51344__("7726").document;
module.exports = document && document.documentElement;


/***/ }),

/***/ "fb15":
/***/ (function(module, __nested_webpack_exports__, __nested_webpack_require_51548__) {

"use strict";
// ESM COMPAT FLAG
__nested_webpack_require_51548__.r(__nested_webpack_exports__);

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/setPublicPath.js
// This file is imported into lib/wc client bundles.

if (typeof window !== 'undefined') {
  if (true) {
    __nested_webpack_require_51548__("f6fd")
  }

  var setPublicPath_i
  if ((setPublicPath_i = window.document.currentScript) && (setPublicPath_i = setPublicPath_i.src.match(/(.+\/)[^/]+\.js(\?.*)?$/))) {
    __nested_webpack_require_51548__.p = setPublicPath_i[1] // eslint-disable-line
  }
}

// Indicate to webpack that this file can be concatenated
/* harmony default export */ var setPublicPath = (null);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.object.assign.js
var es6_object_assign = __nested_webpack_require_51548__("f751");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.string.starts-with.js
var es6_string_starts_with = __nested_webpack_require_51548__("f559");

// EXTERNAL MODULE: ./node_modules/core-js/modules/web.dom.iterable.js
var web_dom_iterable = __nested_webpack_require_51548__("ac6a");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.array.iterator.js
var es6_array_iterator = __nested_webpack_require_51548__("cadf");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.object.keys.js
var es6_object_keys = __nested_webpack_require_51548__("456d");

// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/arrayWithHoles.js
function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/iterableToArrayLimit.js
function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/nonIterableRest.js
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/slicedToArray.js




function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}
// EXTERNAL MODULE: ./node_modules/core-js/modules/es7.array.includes.js
var es7_array_includes = __nested_webpack_require_51548__("6762");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.string.includes.js
var es6_string_includes = __nested_webpack_require_51548__("2fdb");

// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/arrayWithoutHoles.js

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/iterableToArray.js
function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/nonIterableSpread.js
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js




function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}
// EXTERNAL MODULE: external {"commonjs":"sortablejs","commonjs2":"sortablejs","amd":"sortablejs","root":"Sortable"}
var external_commonjs_sortablejs_commonjs2_sortablejs_amd_sortablejs_root_Sortable_ = __nested_webpack_require_51548__("a352");
var external_commonjs_sortablejs_commonjs2_sortablejs_amd_sortablejs_root_Sortable_default = /*#__PURE__*/__nested_webpack_require_51548__.n(external_commonjs_sortablejs_commonjs2_sortablejs_amd_sortablejs_root_Sortable_);

// EXTERNAL MODULE: ./src/util/helper.js
var helper = __nested_webpack_require_51548__("c649");

// CONCATENATED MODULE: ./src/vuedraggable.js












function buildAttribute(object, propName, value) {
  if (value === undefined) {
    return object;
  }

  object = object || {};
  object[propName] = value;
  return object;
}

function computeVmIndex(vnodes, element) {
  return vnodes.map(function (elt) {
    return elt.elm;
  }).indexOf(element);
}

function _computeIndexes(slots, children, isTransition, footerOffset) {
  if (!slots) {
    return [];
  }

  var elmFromNodes = slots.map(function (elt) {
    return elt.elm;
  });
  var footerIndex = children.length - footerOffset;

  var rawIndexes = _toConsumableArray(children).map(function (elt, idx) {
    return idx >= footerIndex ? elmFromNodes.length : elmFromNodes.indexOf(elt);
  });

  return isTransition ? rawIndexes.filter(function (ind) {
    return ind !== -1;
  }) : rawIndexes;
}

function emit(evtName, evtData) {
  var _this = this;

  this.$nextTick(function () {
    return _this.$emit(evtName.toLowerCase(), evtData);
  });
}

function delegateAndEmit(evtName) {
  var _this2 = this;

  return function (evtData) {
    if (_this2.realList !== null) {
      _this2["onDrag" + evtName](evtData);
    }

    emit.call(_this2, evtName, evtData);
  };
}

function isTransitionName(name) {
  return ["transition-group", "TransitionGroup"].includes(name);
}

function vuedraggable_isTransition(slots) {
  if (!slots || slots.length !== 1) {
    return false;
  }

  var _slots = _slicedToArray(slots, 1),
      componentOptions = _slots[0].componentOptions;

  if (!componentOptions) {
    return false;
  }

  return isTransitionName(componentOptions.tag);
}

function getSlot(slot, scopedSlot, key) {
  return slot[key] || (scopedSlot[key] ? scopedSlot[key]() : undefined);
}

function computeChildrenAndOffsets(children, slot, scopedSlot) {
  var headerOffset = 0;
  var footerOffset = 0;
  var header = getSlot(slot, scopedSlot, "header");

  if (header) {
    headerOffset = header.length;
    children = children ? [].concat(_toConsumableArray(header), _toConsumableArray(children)) : _toConsumableArray(header);
  }

  var footer = getSlot(slot, scopedSlot, "footer");

  if (footer) {
    footerOffset = footer.length;
    children = children ? [].concat(_toConsumableArray(children), _toConsumableArray(footer)) : _toConsumableArray(footer);
  }

  return {
    children: children,
    headerOffset: headerOffset,
    footerOffset: footerOffset
  };
}

function getComponentAttributes($attrs, componentData) {
  var attributes = null;

  var update = function update(name, value) {
    attributes = buildAttribute(attributes, name, value);
  };

  var attrs = Object.keys($attrs).filter(function (key) {
    return key === "id" || key.startsWith("data-");
  }).reduce(function (res, key) {
    res[key] = $attrs[key];
    return res;
  }, {});
  update("attrs", attrs);

  if (!componentData) {
    return attributes;
  }

  var on = componentData.on,
      props = componentData.props,
      componentDataAttrs = componentData.attrs;
  update("on", on);
  update("props", props);
  Object.assign(attributes.attrs, componentDataAttrs);
  return attributes;
}

var eventsListened = ["Start", "Add", "Remove", "Update", "End"];
var eventsToEmit = ["Choose", "Unchoose", "Sort", "Filter", "Clone"];
var readonlyProperties = ["Move"].concat(eventsListened, eventsToEmit).map(function (evt) {
  return "on" + evt;
});
var draggingElement = null;
var props = {
  options: Object,
  list: {
    type: Array,
    required: false,
    default: null
  },
  value: {
    type: Array,
    required: false,
    default: null
  },
  noTransitionOnDrag: {
    type: Boolean,
    default: false
  },
  clone: {
    type: Function,
    default: function _default(original) {
      return original;
    }
  },
  element: {
    type: String,
    default: "div"
  },
  tag: {
    type: String,
    default: null
  },
  move: {
    type: Function,
    default: null
  },
  componentData: {
    type: Object,
    required: false,
    default: null
  }
};
var draggableComponent = {
  name: "draggable",
  inheritAttrs: false,
  props: props,
  data: function data() {
    return {
      transitionMode: false,
      noneFunctionalComponentMode: false
    };
  },
  render: function render(h) {
    var slots = this.$slots.default;
    this.transitionMode = vuedraggable_isTransition(slots);

    var _computeChildrenAndOf = computeChildrenAndOffsets(slots, this.$slots, this.$scopedSlots),
        children = _computeChildrenAndOf.children,
        headerOffset = _computeChildrenAndOf.headerOffset,
        footerOffset = _computeChildrenAndOf.footerOffset;

    this.headerOffset = headerOffset;
    this.footerOffset = footerOffset;
    var attributes = getComponentAttributes(this.$attrs, this.componentData);
    return h(this.getTag(), attributes, children);
  },
  created: function created() {
    if (this.list !== null && this.value !== null) {
      helper["b" /* console */].error("Value and list props are mutually exclusive! Please set one or another.");
    }

    if (this.element !== "div") {
      helper["b" /* console */].warn("Element props is deprecated please use tag props instead. See https://github.com/SortableJS/Vue.Draggable/blob/master/documentation/migrate.md#element-props");
    }

    if (this.options !== undefined) {
      helper["b" /* console */].warn("Options props is deprecated, add sortable options directly as vue.draggable item, or use v-bind. See https://github.com/SortableJS/Vue.Draggable/blob/master/documentation/migrate.md#options-props");
    }
  },
  mounted: function mounted() {
    var _this3 = this;

    this.noneFunctionalComponentMode = this.getTag().toLowerCase() !== this.$el.nodeName.toLowerCase() && !this.getIsFunctional();

    if (this.noneFunctionalComponentMode && this.transitionMode) {
      throw new Error("Transition-group inside component is not supported. Please alter tag value or remove transition-group. Current tag value: ".concat(this.getTag()));
    }

    var optionsAdded = {};
    eventsListened.forEach(function (elt) {
      optionsAdded["on" + elt] = delegateAndEmit.call(_this3, elt);
    });
    eventsToEmit.forEach(function (elt) {
      optionsAdded["on" + elt] = emit.bind(_this3, elt);
    });
    var attributes = Object.keys(this.$attrs).reduce(function (res, key) {
      res[Object(helper["a" /* camelize */])(key)] = _this3.$attrs[key];
      return res;
    }, {});
    var options = Object.assign({}, this.options, attributes, optionsAdded, {
      onMove: function onMove(evt, originalEvent) {
        return _this3.onDragMove(evt, originalEvent);
      }
    });
    !("draggable" in options) && (options.draggable = ">*");
    this._sortable = new external_commonjs_sortablejs_commonjs2_sortablejs_amd_sortablejs_root_Sortable_default.a(this.rootContainer, options);
    this.computeIndexes();
  },
  beforeDestroy: function beforeDestroy() {
    if (this._sortable !== undefined) this._sortable.destroy();
  },
  computed: {
    rootContainer: function rootContainer() {
      return this.transitionMode ? this.$el.children[0] : this.$el;
    },
    realList: function realList() {
      return this.list ? this.list : this.value;
    }
  },
  watch: {
    options: {
      handler: function handler(newOptionValue) {
        this.updateOptions(newOptionValue);
      },
      deep: true
    },
    $attrs: {
      handler: function handler(newOptionValue) {
        this.updateOptions(newOptionValue);
      },
      deep: true
    },
    realList: function realList() {
      this.computeIndexes();
    }
  },
  methods: {
    getIsFunctional: function getIsFunctional() {
      var fnOptions = this._vnode.fnOptions;
      return fnOptions && fnOptions.functional;
    },
    getTag: function getTag() {
      return this.tag || this.element;
    },
    updateOptions: function updateOptions(newOptionValue) {
      for (var property in newOptionValue) {
        var value = Object(helper["a" /* camelize */])(property);

        if (readonlyProperties.indexOf(value) === -1) {
          this._sortable.option(value, newOptionValue[property]);
        }
      }
    },
    getChildrenNodes: function getChildrenNodes() {
      if (this.noneFunctionalComponentMode) {
        return this.$children[0].$slots.default;
      }

      var rawNodes = this.$slots.default;
      return this.transitionMode ? rawNodes[0].child.$slots.default : rawNodes;
    },
    computeIndexes: function computeIndexes() {
      var _this4 = this;

      this.$nextTick(function () {
        _this4.visibleIndexes = _computeIndexes(_this4.getChildrenNodes(), _this4.rootContainer.children, _this4.transitionMode, _this4.footerOffset);
      });
    },
    getUnderlyingVm: function getUnderlyingVm(htmlElt) {
      var index = computeVmIndex(this.getChildrenNodes() || [], htmlElt);

      if (index === -1) {
        //Edge case during move callback: related element might be
        //an element different from collection
        return null;
      }

      var element = this.realList[index];
      return {
        index: index,
        element: element
      };
    },
    getUnderlyingPotencialDraggableComponent: function getUnderlyingPotencialDraggableComponent(_ref) {
      var vue = _ref.__vue__;

      if (!vue || !vue.$options || !isTransitionName(vue.$options._componentTag)) {
        if (!("realList" in vue) && vue.$children.length === 1 && "realList" in vue.$children[0]) return vue.$children[0];
        return vue;
      }

      return vue.$parent;
    },
    emitChanges: function emitChanges(evt) {
      var _this5 = this;

      this.$nextTick(function () {
        _this5.$emit("change", evt);
      });
    },
    alterList: function alterList(onList) {
      if (this.list) {
        onList(this.list);
        return;
      }

      var newList = _toConsumableArray(this.value);

      onList(newList);
      this.$emit("input", newList);
    },
    spliceList: function spliceList() {
      var _arguments = arguments;

      var spliceList = function spliceList(list) {
        return list.splice.apply(list, _toConsumableArray(_arguments));
      };

      this.alterList(spliceList);
    },
    updatePosition: function updatePosition(oldIndex, newIndex) {
      var updatePosition = function updatePosition(list) {
        return list.splice(newIndex, 0, list.splice(oldIndex, 1)[0]);
      };

      this.alterList(updatePosition);
    },
    getRelatedContextFromMoveEvent: function getRelatedContextFromMoveEvent(_ref2) {
      var to = _ref2.to,
          related = _ref2.related;
      var component = this.getUnderlyingPotencialDraggableComponent(to);

      if (!component) {
        return {
          component: component
        };
      }

      var list = component.realList;
      var context = {
        list: list,
        component: component
      };

      if (to !== related && list && component.getUnderlyingVm) {
        var destination = component.getUnderlyingVm(related);

        if (destination) {
          return Object.assign(destination, context);
        }
      }

      return context;
    },
    getVmIndex: function getVmIndex(domIndex) {
      var indexes = this.visibleIndexes;
      var numberIndexes = indexes.length;
      return domIndex > numberIndexes - 1 ? numberIndexes : indexes[domIndex];
    },
    getComponent: function getComponent() {
      return this.$slots.default[0].componentInstance;
    },
    resetTransitionData: function resetTransitionData(index) {
      if (!this.noTransitionOnDrag || !this.transitionMode) {
        return;
      }

      var nodes = this.getChildrenNodes();
      nodes[index].data = null;
      var transitionContainer = this.getComponent();
      transitionContainer.children = [];
      transitionContainer.kept = undefined;
    },
    onDragStart: function onDragStart(evt) {
      this.context = this.getUnderlyingVm(evt.item);
      evt.item._underlying_vm_ = this.clone(this.context.element);
      draggingElement = evt.item;
    },
    onDragAdd: function onDragAdd(evt) {
      var element = evt.item._underlying_vm_;

      if (element === undefined) {
        return;
      }

      Object(helper["d" /* removeNode */])(evt.item);
      var newIndex = this.getVmIndex(evt.newIndex);
      this.spliceList(newIndex, 0, element);
      this.computeIndexes();
      var added = {
        element: element,
        newIndex: newIndex
      };
      this.emitChanges({
        added: added
      });
    },
    onDragRemove: function onDragRemove(evt) {
      Object(helper["c" /* insertNodeAt */])(this.rootContainer, evt.item, evt.oldIndex);

      if (evt.pullMode === "clone") {
        Object(helper["d" /* removeNode */])(evt.clone);
        return;
      }

      var oldIndex = this.context.index;
      this.spliceList(oldIndex, 1);
      var removed = {
        element: this.context.element,
        oldIndex: oldIndex
      };
      this.resetTransitionData(oldIndex);
      this.emitChanges({
        removed: removed
      });
    },
    onDragUpdate: function onDragUpdate(evt) {
      Object(helper["d" /* removeNode */])(evt.item);
      Object(helper["c" /* insertNodeAt */])(evt.from, evt.item, evt.oldIndex);
      var oldIndex = this.context.index;
      var newIndex = this.getVmIndex(evt.newIndex);
      this.updatePosition(oldIndex, newIndex);
      var moved = {
        element: this.context.element,
        oldIndex: oldIndex,
        newIndex: newIndex
      };
      this.emitChanges({
        moved: moved
      });
    },
    updateProperty: function updateProperty(evt, propertyName) {
      evt.hasOwnProperty(propertyName) && (evt[propertyName] += this.headerOffset);
    },
    computeFutureIndex: function computeFutureIndex(relatedContext, evt) {
      if (!relatedContext.element) {
        return 0;
      }

      var domChildren = _toConsumableArray(evt.to.children).filter(function (el) {
        return el.style["display"] !== "none";
      });

      var currentDOMIndex = domChildren.indexOf(evt.related);
      var currentIndex = relatedContext.component.getVmIndex(currentDOMIndex);
      var draggedInList = domChildren.indexOf(draggingElement) !== -1;
      return draggedInList || !evt.willInsertAfter ? currentIndex : currentIndex + 1;
    },
    onDragMove: function onDragMove(evt, originalEvent) {
      var onMove = this.move;

      if (!onMove || !this.realList) {
        return true;
      }

      var relatedContext = this.getRelatedContextFromMoveEvent(evt);
      var draggedContext = this.context;
      var futureIndex = this.computeFutureIndex(relatedContext, evt);
      Object.assign(draggedContext, {
        futureIndex: futureIndex
      });
      var sendEvt = Object.assign({}, evt, {
        relatedContext: relatedContext,
        draggedContext: draggedContext
      });
      return onMove(sendEvt, originalEvent);
    },
    onDragEnd: function onDragEnd() {
      this.computeIndexes();
      draggingElement = null;
    }
  }
};

if (typeof window !== "undefined" && "Vue" in window) {
  window.Vue.component("draggable", draggableComponent);
}

/* harmony default export */ var vuedraggable = (draggableComponent);
// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/entry-lib.js


/* harmony default export */ var entry_lib = __nested_webpack_exports__["default"] = (vuedraggable);



/***/ })

/******/ })["default"];
});
//# sourceMappingURL=vuedraggable.umd.js.map

/***/ }),

/***/ "./node_modules/vuedraggable/node_modules/sortablejs/modular/sortable.esm.js":
/*!***********************************************************************************!*\
  !*** ./node_modules/vuedraggable/node_modules/sortablejs/modular/sortable.esm.js ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MultiDrag: () => (/* binding */ MultiDragPlugin),
/* harmony export */   Sortable: () => (/* binding */ Sortable),
/* harmony export */   Swap: () => (/* binding */ SwapPlugin),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**!
 * Sortable 1.10.2
 * @author	RubaXa   <trash@rubaxa.org>
 * @author	owenm    <owen23355@gmail.com>
 * @license MIT
 */
function _typeof(obj) {
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);

    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      _defineProperty(target, key, source[key]);
    });
  }

  return target;
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};

  var target = _objectWithoutPropertiesLoose(source, excluded);

  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  }
}

function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

var version = "1.10.2";

function userAgent(pattern) {
  if (typeof window !== 'undefined' && window.navigator) {
    return !!
    /*@__PURE__*/
    navigator.userAgent.match(pattern);
  }
}

var IE11OrLess = userAgent(/(?:Trident.*rv[ :]?11\.|msie|iemobile|Windows Phone)/i);
var Edge = userAgent(/Edge/i);
var FireFox = userAgent(/firefox/i);
var Safari = userAgent(/safari/i) && !userAgent(/chrome/i) && !userAgent(/android/i);
var IOS = userAgent(/iP(ad|od|hone)/i);
var ChromeForAndroid = userAgent(/chrome/i) && userAgent(/android/i);

var captureMode = {
  capture: false,
  passive: false
};

function on(el, event, fn) {
  el.addEventListener(event, fn, !IE11OrLess && captureMode);
}

function off(el, event, fn) {
  el.removeEventListener(event, fn, !IE11OrLess && captureMode);
}

function matches(
/**HTMLElement*/
el,
/**String*/
selector) {
  if (!selector) return;
  selector[0] === '>' && (selector = selector.substring(1));

  if (el) {
    try {
      if (el.matches) {
        return el.matches(selector);
      } else if (el.msMatchesSelector) {
        return el.msMatchesSelector(selector);
      } else if (el.webkitMatchesSelector) {
        return el.webkitMatchesSelector(selector);
      }
    } catch (_) {
      return false;
    }
  }

  return false;
}

function getParentOrHost(el) {
  return el.host && el !== document && el.host.nodeType ? el.host : el.parentNode;
}

function closest(
/**HTMLElement*/
el,
/**String*/
selector,
/**HTMLElement*/
ctx, includeCTX) {
  if (el) {
    ctx = ctx || document;

    do {
      if (selector != null && (selector[0] === '>' ? el.parentNode === ctx && matches(el, selector) : matches(el, selector)) || includeCTX && el === ctx) {
        return el;
      }

      if (el === ctx) break;
      /* jshint boss:true */
    } while (el = getParentOrHost(el));
  }

  return null;
}

var R_SPACE = /\s+/g;

function toggleClass(el, name, state) {
  if (el && name) {
    if (el.classList) {
      el.classList[state ? 'add' : 'remove'](name);
    } else {
      var className = (' ' + el.className + ' ').replace(R_SPACE, ' ').replace(' ' + name + ' ', ' ');
      el.className = (className + (state ? ' ' + name : '')).replace(R_SPACE, ' ');
    }
  }
}

function css(el, prop, val) {
  var style = el && el.style;

  if (style) {
    if (val === void 0) {
      if (document.defaultView && document.defaultView.getComputedStyle) {
        val = document.defaultView.getComputedStyle(el, '');
      } else if (el.currentStyle) {
        val = el.currentStyle;
      }

      return prop === void 0 ? val : val[prop];
    } else {
      if (!(prop in style) && prop.indexOf('webkit') === -1) {
        prop = '-webkit-' + prop;
      }

      style[prop] = val + (typeof val === 'string' ? '' : 'px');
    }
  }
}

function matrix(el, selfOnly) {
  var appliedTransforms = '';

  if (typeof el === 'string') {
    appliedTransforms = el;
  } else {
    do {
      var transform = css(el, 'transform');

      if (transform && transform !== 'none') {
        appliedTransforms = transform + ' ' + appliedTransforms;
      }
      /* jshint boss:true */

    } while (!selfOnly && (el = el.parentNode));
  }

  var matrixFn = window.DOMMatrix || window.WebKitCSSMatrix || window.CSSMatrix || window.MSCSSMatrix;
  /*jshint -W056 */

  return matrixFn && new matrixFn(appliedTransforms);
}

function find(ctx, tagName, iterator) {
  if (ctx) {
    var list = ctx.getElementsByTagName(tagName),
        i = 0,
        n = list.length;

    if (iterator) {
      for (; i < n; i++) {
        iterator(list[i], i);
      }
    }

    return list;
  }

  return [];
}

function getWindowScrollingElement() {
  var scrollingElement = document.scrollingElement;

  if (scrollingElement) {
    return scrollingElement;
  } else {
    return document.documentElement;
  }
}
/**
 * Returns the "bounding client rect" of given element
 * @param  {HTMLElement} el                       The element whose boundingClientRect is wanted
 * @param  {[Boolean]} relativeToContainingBlock  Whether the rect should be relative to the containing block of (including) the container
 * @param  {[Boolean]} relativeToNonStaticParent  Whether the rect should be relative to the relative parent of (including) the contaienr
 * @param  {[Boolean]} undoScale                  Whether the container's scale() should be undone
 * @param  {[HTMLElement]} container              The parent the element will be placed in
 * @return {Object}                               The boundingClientRect of el, with specified adjustments
 */


function getRect(el, relativeToContainingBlock, relativeToNonStaticParent, undoScale, container) {
  if (!el.getBoundingClientRect && el !== window) return;
  var elRect, top, left, bottom, right, height, width;

  if (el !== window && el !== getWindowScrollingElement()) {
    elRect = el.getBoundingClientRect();
    top = elRect.top;
    left = elRect.left;
    bottom = elRect.bottom;
    right = elRect.right;
    height = elRect.height;
    width = elRect.width;
  } else {
    top = 0;
    left = 0;
    bottom = window.innerHeight;
    right = window.innerWidth;
    height = window.innerHeight;
    width = window.innerWidth;
  }

  if ((relativeToContainingBlock || relativeToNonStaticParent) && el !== window) {
    // Adjust for translate()
    container = container || el.parentNode; // solves #1123 (see: https://stackoverflow.com/a/37953806/6088312)
    // Not needed on <= IE11

    if (!IE11OrLess) {
      do {
        if (container && container.getBoundingClientRect && (css(container, 'transform') !== 'none' || relativeToNonStaticParent && css(container, 'position') !== 'static')) {
          var containerRect = container.getBoundingClientRect(); // Set relative to edges of padding box of container

          top -= containerRect.top + parseInt(css(container, 'border-top-width'));
          left -= containerRect.left + parseInt(css(container, 'border-left-width'));
          bottom = top + elRect.height;
          right = left + elRect.width;
          break;
        }
        /* jshint boss:true */

      } while (container = container.parentNode);
    }
  }

  if (undoScale && el !== window) {
    // Adjust for scale()
    var elMatrix = matrix(container || el),
        scaleX = elMatrix && elMatrix.a,
        scaleY = elMatrix && elMatrix.d;

    if (elMatrix) {
      top /= scaleY;
      left /= scaleX;
      width /= scaleX;
      height /= scaleY;
      bottom = top + height;
      right = left + width;
    }
  }

  return {
    top: top,
    left: left,
    bottom: bottom,
    right: right,
    width: width,
    height: height
  };
}
/**
 * Checks if a side of an element is scrolled past a side of its parents
 * @param  {HTMLElement}  el           The element who's side being scrolled out of view is in question
 * @param  {String}       elSide       Side of the element in question ('top', 'left', 'right', 'bottom')
 * @param  {String}       parentSide   Side of the parent in question ('top', 'left', 'right', 'bottom')
 * @return {HTMLElement}               The parent scroll element that the el's side is scrolled past, or null if there is no such element
 */


function isScrolledPast(el, elSide, parentSide) {
  var parent = getParentAutoScrollElement(el, true),
      elSideVal = getRect(el)[elSide];
  /* jshint boss:true */

  while (parent) {
    var parentSideVal = getRect(parent)[parentSide],
        visible = void 0;

    if (parentSide === 'top' || parentSide === 'left') {
      visible = elSideVal >= parentSideVal;
    } else {
      visible = elSideVal <= parentSideVal;
    }

    if (!visible) return parent;
    if (parent === getWindowScrollingElement()) break;
    parent = getParentAutoScrollElement(parent, false);
  }

  return false;
}
/**
 * Gets nth child of el, ignoring hidden children, sortable's elements (does not ignore clone if it's visible)
 * and non-draggable elements
 * @param  {HTMLElement} el       The parent element
 * @param  {Number} childNum      The index of the child
 * @param  {Object} options       Parent Sortable's options
 * @return {HTMLElement}          The child at index childNum, or null if not found
 */


function getChild(el, childNum, options) {
  var currentChild = 0,
      i = 0,
      children = el.children;

  while (i < children.length) {
    if (children[i].style.display !== 'none' && children[i] !== Sortable.ghost && children[i] !== Sortable.dragged && closest(children[i], options.draggable, el, false)) {
      if (currentChild === childNum) {
        return children[i];
      }

      currentChild++;
    }

    i++;
  }

  return null;
}
/**
 * Gets the last child in the el, ignoring ghostEl or invisible elements (clones)
 * @param  {HTMLElement} el       Parent element
 * @param  {selector} selector    Any other elements that should be ignored
 * @return {HTMLElement}          The last child, ignoring ghostEl
 */


function lastChild(el, selector) {
  var last = el.lastElementChild;

  while (last && (last === Sortable.ghost || css(last, 'display') === 'none' || selector && !matches(last, selector))) {
    last = last.previousElementSibling;
  }

  return last || null;
}
/**
 * Returns the index of an element within its parent for a selected set of
 * elements
 * @param  {HTMLElement} el
 * @param  {selector} selector
 * @return {number}
 */


function index(el, selector) {
  var index = 0;

  if (!el || !el.parentNode) {
    return -1;
  }
  /* jshint boss:true */


  while (el = el.previousElementSibling) {
    if (el.nodeName.toUpperCase() !== 'TEMPLATE' && el !== Sortable.clone && (!selector || matches(el, selector))) {
      index++;
    }
  }

  return index;
}
/**
 * Returns the scroll offset of the given element, added with all the scroll offsets of parent elements.
 * The value is returned in real pixels.
 * @param  {HTMLElement} el
 * @return {Array}             Offsets in the format of [left, top]
 */


function getRelativeScrollOffset(el) {
  var offsetLeft = 0,
      offsetTop = 0,
      winScroller = getWindowScrollingElement();

  if (el) {
    do {
      var elMatrix = matrix(el),
          scaleX = elMatrix.a,
          scaleY = elMatrix.d;
      offsetLeft += el.scrollLeft * scaleX;
      offsetTop += el.scrollTop * scaleY;
    } while (el !== winScroller && (el = el.parentNode));
  }

  return [offsetLeft, offsetTop];
}
/**
 * Returns the index of the object within the given array
 * @param  {Array} arr   Array that may or may not hold the object
 * @param  {Object} obj  An object that has a key-value pair unique to and identical to a key-value pair in the object you want to find
 * @return {Number}      The index of the object in the array, or -1
 */


function indexOfObject(arr, obj) {
  for (var i in arr) {
    if (!arr.hasOwnProperty(i)) continue;

    for (var key in obj) {
      if (obj.hasOwnProperty(key) && obj[key] === arr[i][key]) return Number(i);
    }
  }

  return -1;
}

function getParentAutoScrollElement(el, includeSelf) {
  // skip to window
  if (!el || !el.getBoundingClientRect) return getWindowScrollingElement();
  var elem = el;
  var gotSelf = false;

  do {
    // we don't need to get elem css if it isn't even overflowing in the first place (performance)
    if (elem.clientWidth < elem.scrollWidth || elem.clientHeight < elem.scrollHeight) {
      var elemCSS = css(elem);

      if (elem.clientWidth < elem.scrollWidth && (elemCSS.overflowX == 'auto' || elemCSS.overflowX == 'scroll') || elem.clientHeight < elem.scrollHeight && (elemCSS.overflowY == 'auto' || elemCSS.overflowY == 'scroll')) {
        if (!elem.getBoundingClientRect || elem === document.body) return getWindowScrollingElement();
        if (gotSelf || includeSelf) return elem;
        gotSelf = true;
      }
    }
    /* jshint boss:true */

  } while (elem = elem.parentNode);

  return getWindowScrollingElement();
}

function extend(dst, src) {
  if (dst && src) {
    for (var key in src) {
      if (src.hasOwnProperty(key)) {
        dst[key] = src[key];
      }
    }
  }

  return dst;
}

function isRectEqual(rect1, rect2) {
  return Math.round(rect1.top) === Math.round(rect2.top) && Math.round(rect1.left) === Math.round(rect2.left) && Math.round(rect1.height) === Math.round(rect2.height) && Math.round(rect1.width) === Math.round(rect2.width);
}

var _throttleTimeout;

function throttle(callback, ms) {
  return function () {
    if (!_throttleTimeout) {
      var args = arguments,
          _this = this;

      if (args.length === 1) {
        callback.call(_this, args[0]);
      } else {
        callback.apply(_this, args);
      }

      _throttleTimeout = setTimeout(function () {
        _throttleTimeout = void 0;
      }, ms);
    }
  };
}

function cancelThrottle() {
  clearTimeout(_throttleTimeout);
  _throttleTimeout = void 0;
}

function scrollBy(el, x, y) {
  el.scrollLeft += x;
  el.scrollTop += y;
}

function clone(el) {
  var Polymer = window.Polymer;
  var $ = window.jQuery || window.Zepto;

  if (Polymer && Polymer.dom) {
    return Polymer.dom(el).cloneNode(true);
  } else if ($) {
    return $(el).clone(true)[0];
  } else {
    return el.cloneNode(true);
  }
}

function setRect(el, rect) {
  css(el, 'position', 'absolute');
  css(el, 'top', rect.top);
  css(el, 'left', rect.left);
  css(el, 'width', rect.width);
  css(el, 'height', rect.height);
}

function unsetRect(el) {
  css(el, 'position', '');
  css(el, 'top', '');
  css(el, 'left', '');
  css(el, 'width', '');
  css(el, 'height', '');
}

var expando = 'Sortable' + new Date().getTime();

function AnimationStateManager() {
  var animationStates = [],
      animationCallbackId;
  return {
    captureAnimationState: function captureAnimationState() {
      animationStates = [];
      if (!this.options.animation) return;
      var children = [].slice.call(this.el.children);
      children.forEach(function (child) {
        if (css(child, 'display') === 'none' || child === Sortable.ghost) return;
        animationStates.push({
          target: child,
          rect: getRect(child)
        });

        var fromRect = _objectSpread({}, animationStates[animationStates.length - 1].rect); // If animating: compensate for current animation


        if (child.thisAnimationDuration) {
          var childMatrix = matrix(child, true);

          if (childMatrix) {
            fromRect.top -= childMatrix.f;
            fromRect.left -= childMatrix.e;
          }
        }

        child.fromRect = fromRect;
      });
    },
    addAnimationState: function addAnimationState(state) {
      animationStates.push(state);
    },
    removeAnimationState: function removeAnimationState(target) {
      animationStates.splice(indexOfObject(animationStates, {
        target: target
      }), 1);
    },
    animateAll: function animateAll(callback) {
      var _this = this;

      if (!this.options.animation) {
        clearTimeout(animationCallbackId);
        if (typeof callback === 'function') callback();
        return;
      }

      var animating = false,
          animationTime = 0;
      animationStates.forEach(function (state) {
        var time = 0,
            target = state.target,
            fromRect = target.fromRect,
            toRect = getRect(target),
            prevFromRect = target.prevFromRect,
            prevToRect = target.prevToRect,
            animatingRect = state.rect,
            targetMatrix = matrix(target, true);

        if (targetMatrix) {
          // Compensate for current animation
          toRect.top -= targetMatrix.f;
          toRect.left -= targetMatrix.e;
        }

        target.toRect = toRect;

        if (target.thisAnimationDuration) {
          // Could also check if animatingRect is between fromRect and toRect
          if (isRectEqual(prevFromRect, toRect) && !isRectEqual(fromRect, toRect) && // Make sure animatingRect is on line between toRect & fromRect
          (animatingRect.top - toRect.top) / (animatingRect.left - toRect.left) === (fromRect.top - toRect.top) / (fromRect.left - toRect.left)) {
            // If returning to same place as started from animation and on same axis
            time = calculateRealTime(animatingRect, prevFromRect, prevToRect, _this.options);
          }
        } // if fromRect != toRect: animate


        if (!isRectEqual(toRect, fromRect)) {
          target.prevFromRect = fromRect;
          target.prevToRect = toRect;

          if (!time) {
            time = _this.options.animation;
          }

          _this.animate(target, animatingRect, toRect, time);
        }

        if (time) {
          animating = true;
          animationTime = Math.max(animationTime, time);
          clearTimeout(target.animationResetTimer);
          target.animationResetTimer = setTimeout(function () {
            target.animationTime = 0;
            target.prevFromRect = null;
            target.fromRect = null;
            target.prevToRect = null;
            target.thisAnimationDuration = null;
          }, time);
          target.thisAnimationDuration = time;
        }
      });
      clearTimeout(animationCallbackId);

      if (!animating) {
        if (typeof callback === 'function') callback();
      } else {
        animationCallbackId = setTimeout(function () {
          if (typeof callback === 'function') callback();
        }, animationTime);
      }

      animationStates = [];
    },
    animate: function animate(target, currentRect, toRect, duration) {
      if (duration) {
        css(target, 'transition', '');
        css(target, 'transform', '');
        var elMatrix = matrix(this.el),
            scaleX = elMatrix && elMatrix.a,
            scaleY = elMatrix && elMatrix.d,
            translateX = (currentRect.left - toRect.left) / (scaleX || 1),
            translateY = (currentRect.top - toRect.top) / (scaleY || 1);
        target.animatingX = !!translateX;
        target.animatingY = !!translateY;
        css(target, 'transform', 'translate3d(' + translateX + 'px,' + translateY + 'px,0)');
        repaint(target); // repaint

        css(target, 'transition', 'transform ' + duration + 'ms' + (this.options.easing ? ' ' + this.options.easing : ''));
        css(target, 'transform', 'translate3d(0,0,0)');
        typeof target.animated === 'number' && clearTimeout(target.animated);
        target.animated = setTimeout(function () {
          css(target, 'transition', '');
          css(target, 'transform', '');
          target.animated = false;
          target.animatingX = false;
          target.animatingY = false;
        }, duration);
      }
    }
  };
}

function repaint(target) {
  return target.offsetWidth;
}

function calculateRealTime(animatingRect, fromRect, toRect, options) {
  return Math.sqrt(Math.pow(fromRect.top - animatingRect.top, 2) + Math.pow(fromRect.left - animatingRect.left, 2)) / Math.sqrt(Math.pow(fromRect.top - toRect.top, 2) + Math.pow(fromRect.left - toRect.left, 2)) * options.animation;
}

var plugins = [];
var defaults = {
  initializeByDefault: true
};
var PluginManager = {
  mount: function mount(plugin) {
    // Set default static properties
    for (var option in defaults) {
      if (defaults.hasOwnProperty(option) && !(option in plugin)) {
        plugin[option] = defaults[option];
      }
    }

    plugins.push(plugin);
  },
  pluginEvent: function pluginEvent(eventName, sortable, evt) {
    var _this = this;

    this.eventCanceled = false;

    evt.cancel = function () {
      _this.eventCanceled = true;
    };

    var eventNameGlobal = eventName + 'Global';
    plugins.forEach(function (plugin) {
      if (!sortable[plugin.pluginName]) return; // Fire global events if it exists in this sortable

      if (sortable[plugin.pluginName][eventNameGlobal]) {
        sortable[plugin.pluginName][eventNameGlobal](_objectSpread({
          sortable: sortable
        }, evt));
      } // Only fire plugin event if plugin is enabled in this sortable,
      // and plugin has event defined


      if (sortable.options[plugin.pluginName] && sortable[plugin.pluginName][eventName]) {
        sortable[plugin.pluginName][eventName](_objectSpread({
          sortable: sortable
        }, evt));
      }
    });
  },
  initializePlugins: function initializePlugins(sortable, el, defaults, options) {
    plugins.forEach(function (plugin) {
      var pluginName = plugin.pluginName;
      if (!sortable.options[pluginName] && !plugin.initializeByDefault) return;
      var initialized = new plugin(sortable, el, sortable.options);
      initialized.sortable = sortable;
      initialized.options = sortable.options;
      sortable[pluginName] = initialized; // Add default options from plugin

      _extends(defaults, initialized.defaults);
    });

    for (var option in sortable.options) {
      if (!sortable.options.hasOwnProperty(option)) continue;
      var modified = this.modifyOption(sortable, option, sortable.options[option]);

      if (typeof modified !== 'undefined') {
        sortable.options[option] = modified;
      }
    }
  },
  getEventProperties: function getEventProperties(name, sortable) {
    var eventProperties = {};
    plugins.forEach(function (plugin) {
      if (typeof plugin.eventProperties !== 'function') return;

      _extends(eventProperties, plugin.eventProperties.call(sortable[plugin.pluginName], name));
    });
    return eventProperties;
  },
  modifyOption: function modifyOption(sortable, name, value) {
    var modifiedValue;
    plugins.forEach(function (plugin) {
      // Plugin must exist on the Sortable
      if (!sortable[plugin.pluginName]) return; // If static option listener exists for this option, call in the context of the Sortable's instance of this plugin

      if (plugin.optionListeners && typeof plugin.optionListeners[name] === 'function') {
        modifiedValue = plugin.optionListeners[name].call(sortable[plugin.pluginName], value);
      }
    });
    return modifiedValue;
  }
};

function dispatchEvent(_ref) {
  var sortable = _ref.sortable,
      rootEl = _ref.rootEl,
      name = _ref.name,
      targetEl = _ref.targetEl,
      cloneEl = _ref.cloneEl,
      toEl = _ref.toEl,
      fromEl = _ref.fromEl,
      oldIndex = _ref.oldIndex,
      newIndex = _ref.newIndex,
      oldDraggableIndex = _ref.oldDraggableIndex,
      newDraggableIndex = _ref.newDraggableIndex,
      originalEvent = _ref.originalEvent,
      putSortable = _ref.putSortable,
      extraEventProperties = _ref.extraEventProperties;
  sortable = sortable || rootEl && rootEl[expando];
  if (!sortable) return;
  var evt,
      options = sortable.options,
      onName = 'on' + name.charAt(0).toUpperCase() + name.substr(1); // Support for new CustomEvent feature

  if (window.CustomEvent && !IE11OrLess && !Edge) {
    evt = new CustomEvent(name, {
      bubbles: true,
      cancelable: true
    });
  } else {
    evt = document.createEvent('Event');
    evt.initEvent(name, true, true);
  }

  evt.to = toEl || rootEl;
  evt.from = fromEl || rootEl;
  evt.item = targetEl || rootEl;
  evt.clone = cloneEl;
  evt.oldIndex = oldIndex;
  evt.newIndex = newIndex;
  evt.oldDraggableIndex = oldDraggableIndex;
  evt.newDraggableIndex = newDraggableIndex;
  evt.originalEvent = originalEvent;
  evt.pullMode = putSortable ? putSortable.lastPutMode : undefined;

  var allEventProperties = _objectSpread({}, extraEventProperties, PluginManager.getEventProperties(name, sortable));

  for (var option in allEventProperties) {
    evt[option] = allEventProperties[option];
  }

  if (rootEl) {
    rootEl.dispatchEvent(evt);
  }

  if (options[onName]) {
    options[onName].call(sortable, evt);
  }
}

var pluginEvent = function pluginEvent(eventName, sortable) {
  var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
      originalEvent = _ref.evt,
      data = _objectWithoutProperties(_ref, ["evt"]);

  PluginManager.pluginEvent.bind(Sortable)(eventName, sortable, _objectSpread({
    dragEl: dragEl,
    parentEl: parentEl,
    ghostEl: ghostEl,
    rootEl: rootEl,
    nextEl: nextEl,
    lastDownEl: lastDownEl,
    cloneEl: cloneEl,
    cloneHidden: cloneHidden,
    dragStarted: moved,
    putSortable: putSortable,
    activeSortable: Sortable.active,
    originalEvent: originalEvent,
    oldIndex: oldIndex,
    oldDraggableIndex: oldDraggableIndex,
    newIndex: newIndex,
    newDraggableIndex: newDraggableIndex,
    hideGhostForTarget: _hideGhostForTarget,
    unhideGhostForTarget: _unhideGhostForTarget,
    cloneNowHidden: function cloneNowHidden() {
      cloneHidden = true;
    },
    cloneNowShown: function cloneNowShown() {
      cloneHidden = false;
    },
    dispatchSortableEvent: function dispatchSortableEvent(name) {
      _dispatchEvent({
        sortable: sortable,
        name: name,
        originalEvent: originalEvent
      });
    }
  }, data));
};

function _dispatchEvent(info) {
  dispatchEvent(_objectSpread({
    putSortable: putSortable,
    cloneEl: cloneEl,
    targetEl: dragEl,
    rootEl: rootEl,
    oldIndex: oldIndex,
    oldDraggableIndex: oldDraggableIndex,
    newIndex: newIndex,
    newDraggableIndex: newDraggableIndex
  }, info));
}

var dragEl,
    parentEl,
    ghostEl,
    rootEl,
    nextEl,
    lastDownEl,
    cloneEl,
    cloneHidden,
    oldIndex,
    newIndex,
    oldDraggableIndex,
    newDraggableIndex,
    activeGroup,
    putSortable,
    awaitingDragStarted = false,
    ignoreNextClick = false,
    sortables = [],
    tapEvt,
    touchEvt,
    lastDx,
    lastDy,
    tapDistanceLeft,
    tapDistanceTop,
    moved,
    lastTarget,
    lastDirection,
    pastFirstInvertThresh = false,
    isCircumstantialInvert = false,
    targetMoveDistance,
    // For positioning ghost absolutely
ghostRelativeParent,
    ghostRelativeParentInitialScroll = [],
    // (left, top)
_silent = false,
    savedInputChecked = [];
/** @const */

var documentExists = typeof document !== 'undefined',
    PositionGhostAbsolutely = IOS,
    CSSFloatProperty = Edge || IE11OrLess ? 'cssFloat' : 'float',
    // This will not pass for IE9, because IE9 DnD only works on anchors
supportDraggable = documentExists && !ChromeForAndroid && !IOS && 'draggable' in document.createElement('div'),
    supportCssPointerEvents = function () {
  if (!documentExists) return; // false when <= IE11

  if (IE11OrLess) {
    return false;
  }

  var el = document.createElement('x');
  el.style.cssText = 'pointer-events:auto';
  return el.style.pointerEvents === 'auto';
}(),
    _detectDirection = function _detectDirection(el, options) {
  var elCSS = css(el),
      elWidth = parseInt(elCSS.width) - parseInt(elCSS.paddingLeft) - parseInt(elCSS.paddingRight) - parseInt(elCSS.borderLeftWidth) - parseInt(elCSS.borderRightWidth),
      child1 = getChild(el, 0, options),
      child2 = getChild(el, 1, options),
      firstChildCSS = child1 && css(child1),
      secondChildCSS = child2 && css(child2),
      firstChildWidth = firstChildCSS && parseInt(firstChildCSS.marginLeft) + parseInt(firstChildCSS.marginRight) + getRect(child1).width,
      secondChildWidth = secondChildCSS && parseInt(secondChildCSS.marginLeft) + parseInt(secondChildCSS.marginRight) + getRect(child2).width;

  if (elCSS.display === 'flex') {
    return elCSS.flexDirection === 'column' || elCSS.flexDirection === 'column-reverse' ? 'vertical' : 'horizontal';
  }

  if (elCSS.display === 'grid') {
    return elCSS.gridTemplateColumns.split(' ').length <= 1 ? 'vertical' : 'horizontal';
  }

  if (child1 && firstChildCSS["float"] && firstChildCSS["float"] !== 'none') {
    var touchingSideChild2 = firstChildCSS["float"] === 'left' ? 'left' : 'right';
    return child2 && (secondChildCSS.clear === 'both' || secondChildCSS.clear === touchingSideChild2) ? 'vertical' : 'horizontal';
  }

  return child1 && (firstChildCSS.display === 'block' || firstChildCSS.display === 'flex' || firstChildCSS.display === 'table' || firstChildCSS.display === 'grid' || firstChildWidth >= elWidth && elCSS[CSSFloatProperty] === 'none' || child2 && elCSS[CSSFloatProperty] === 'none' && firstChildWidth + secondChildWidth > elWidth) ? 'vertical' : 'horizontal';
},
    _dragElInRowColumn = function _dragElInRowColumn(dragRect, targetRect, vertical) {
  var dragElS1Opp = vertical ? dragRect.left : dragRect.top,
      dragElS2Opp = vertical ? dragRect.right : dragRect.bottom,
      dragElOppLength = vertical ? dragRect.width : dragRect.height,
      targetS1Opp = vertical ? targetRect.left : targetRect.top,
      targetS2Opp = vertical ? targetRect.right : targetRect.bottom,
      targetOppLength = vertical ? targetRect.width : targetRect.height;
  return dragElS1Opp === targetS1Opp || dragElS2Opp === targetS2Opp || dragElS1Opp + dragElOppLength / 2 === targetS1Opp + targetOppLength / 2;
},

/**
 * Detects first nearest empty sortable to X and Y position using emptyInsertThreshold.
 * @param  {Number} x      X position
 * @param  {Number} y      Y position
 * @return {HTMLElement}   Element of the first found nearest Sortable
 */
_detectNearestEmptySortable = function _detectNearestEmptySortable(x, y) {
  var ret;
  sortables.some(function (sortable) {
    if (lastChild(sortable)) return;
    var rect = getRect(sortable),
        threshold = sortable[expando].options.emptyInsertThreshold,
        insideHorizontally = x >= rect.left - threshold && x <= rect.right + threshold,
        insideVertically = y >= rect.top - threshold && y <= rect.bottom + threshold;

    if (threshold && insideHorizontally && insideVertically) {
      return ret = sortable;
    }
  });
  return ret;
},
    _prepareGroup = function _prepareGroup(options) {
  function toFn(value, pull) {
    return function (to, from, dragEl, evt) {
      var sameGroup = to.options.group.name && from.options.group.name && to.options.group.name === from.options.group.name;

      if (value == null && (pull || sameGroup)) {
        // Default pull value
        // Default pull and put value if same group
        return true;
      } else if (value == null || value === false) {
        return false;
      } else if (pull && value === 'clone') {
        return value;
      } else if (typeof value === 'function') {
        return toFn(value(to, from, dragEl, evt), pull)(to, from, dragEl, evt);
      } else {
        var otherGroup = (pull ? to : from).options.group.name;
        return value === true || typeof value === 'string' && value === otherGroup || value.join && value.indexOf(otherGroup) > -1;
      }
    };
  }

  var group = {};
  var originalGroup = options.group;

  if (!originalGroup || _typeof(originalGroup) != 'object') {
    originalGroup = {
      name: originalGroup
    };
  }

  group.name = originalGroup.name;
  group.checkPull = toFn(originalGroup.pull, true);
  group.checkPut = toFn(originalGroup.put);
  group.revertClone = originalGroup.revertClone;
  options.group = group;
},
    _hideGhostForTarget = function _hideGhostForTarget() {
  if (!supportCssPointerEvents && ghostEl) {
    css(ghostEl, 'display', 'none');
  }
},
    _unhideGhostForTarget = function _unhideGhostForTarget() {
  if (!supportCssPointerEvents && ghostEl) {
    css(ghostEl, 'display', '');
  }
}; // #1184 fix - Prevent click event on fallback if dragged but item not changed position


if (documentExists) {
  document.addEventListener('click', function (evt) {
    if (ignoreNextClick) {
      evt.preventDefault();
      evt.stopPropagation && evt.stopPropagation();
      evt.stopImmediatePropagation && evt.stopImmediatePropagation();
      ignoreNextClick = false;
      return false;
    }
  }, true);
}

var nearestEmptyInsertDetectEvent = function nearestEmptyInsertDetectEvent(evt) {
  if (dragEl) {
    evt = evt.touches ? evt.touches[0] : evt;

    var nearest = _detectNearestEmptySortable(evt.clientX, evt.clientY);

    if (nearest) {
      // Create imitation event
      var event = {};

      for (var i in evt) {
        if (evt.hasOwnProperty(i)) {
          event[i] = evt[i];
        }
      }

      event.target = event.rootEl = nearest;
      event.preventDefault = void 0;
      event.stopPropagation = void 0;

      nearest[expando]._onDragOver(event);
    }
  }
};

var _checkOutsideTargetEl = function _checkOutsideTargetEl(evt) {
  if (dragEl) {
    dragEl.parentNode[expando]._isOutsideThisEl(evt.target);
  }
};
/**
 * @class  Sortable
 * @param  {HTMLElement}  el
 * @param  {Object}       [options]
 */


function Sortable(el, options) {
  if (!(el && el.nodeType && el.nodeType === 1)) {
    throw "Sortable: `el` must be an HTMLElement, not ".concat({}.toString.call(el));
  }

  this.el = el; // root element

  this.options = options = _extends({}, options); // Export instance

  el[expando] = this;
  var defaults = {
    group: null,
    sort: true,
    disabled: false,
    store: null,
    handle: null,
    draggable: /^[uo]l$/i.test(el.nodeName) ? '>li' : '>*',
    swapThreshold: 1,
    // percentage; 0 <= x <= 1
    invertSwap: false,
    // invert always
    invertedSwapThreshold: null,
    // will be set to same as swapThreshold if default
    removeCloneOnHide: true,
    direction: function direction() {
      return _detectDirection(el, this.options);
    },
    ghostClass: 'sortable-ghost',
    chosenClass: 'sortable-chosen',
    dragClass: 'sortable-drag',
    ignore: 'a, img',
    filter: null,
    preventOnFilter: true,
    animation: 0,
    easing: null,
    setData: function setData(dataTransfer, dragEl) {
      dataTransfer.setData('Text', dragEl.textContent);
    },
    dropBubble: false,
    dragoverBubble: false,
    dataIdAttr: 'data-id',
    delay: 0,
    delayOnTouchOnly: false,
    touchStartThreshold: (Number.parseInt ? Number : window).parseInt(window.devicePixelRatio, 10) || 1,
    forceFallback: false,
    fallbackClass: 'sortable-fallback',
    fallbackOnBody: false,
    fallbackTolerance: 0,
    fallbackOffset: {
      x: 0,
      y: 0
    },
    supportPointer: Sortable.supportPointer !== false && 'PointerEvent' in window,
    emptyInsertThreshold: 5
  };
  PluginManager.initializePlugins(this, el, defaults); // Set default options

  for (var name in defaults) {
    !(name in options) && (options[name] = defaults[name]);
  }

  _prepareGroup(options); // Bind all private methods


  for (var fn in this) {
    if (fn.charAt(0) === '_' && typeof this[fn] === 'function') {
      this[fn] = this[fn].bind(this);
    }
  } // Setup drag mode


  this.nativeDraggable = options.forceFallback ? false : supportDraggable;

  if (this.nativeDraggable) {
    // Touch start threshold cannot be greater than the native dragstart threshold
    this.options.touchStartThreshold = 1;
  } // Bind events


  if (options.supportPointer) {
    on(el, 'pointerdown', this._onTapStart);
  } else {
    on(el, 'mousedown', this._onTapStart);
    on(el, 'touchstart', this._onTapStart);
  }

  if (this.nativeDraggable) {
    on(el, 'dragover', this);
    on(el, 'dragenter', this);
  }

  sortables.push(this.el); // Restore sorting

  options.store && options.store.get && this.sort(options.store.get(this) || []); // Add animation state manager

  _extends(this, AnimationStateManager());
}

Sortable.prototype =
/** @lends Sortable.prototype */
{
  constructor: Sortable,
  _isOutsideThisEl: function _isOutsideThisEl(target) {
    if (!this.el.contains(target) && target !== this.el) {
      lastTarget = null;
    }
  },
  _getDirection: function _getDirection(evt, target) {
    return typeof this.options.direction === 'function' ? this.options.direction.call(this, evt, target, dragEl) : this.options.direction;
  },
  _onTapStart: function _onTapStart(
  /** Event|TouchEvent */
  evt) {
    if (!evt.cancelable) return;

    var _this = this,
        el = this.el,
        options = this.options,
        preventOnFilter = options.preventOnFilter,
        type = evt.type,
        touch = evt.touches && evt.touches[0] || evt.pointerType && evt.pointerType === 'touch' && evt,
        target = (touch || evt).target,
        originalTarget = evt.target.shadowRoot && (evt.path && evt.path[0] || evt.composedPath && evt.composedPath()[0]) || target,
        filter = options.filter;

    _saveInputCheckedState(el); // Don't trigger start event when an element is been dragged, otherwise the evt.oldindex always wrong when set option.group.


    if (dragEl) {
      return;
    }

    if (/mousedown|pointerdown/.test(type) && evt.button !== 0 || options.disabled) {
      return; // only left button and enabled
    } // cancel dnd if original target is content editable


    if (originalTarget.isContentEditable) {
      return;
    }

    target = closest(target, options.draggable, el, false);

    if (target && target.animated) {
      return;
    }

    if (lastDownEl === target) {
      // Ignoring duplicate `down`
      return;
    } // Get the index of the dragged element within its parent


    oldIndex = index(target);
    oldDraggableIndex = index(target, options.draggable); // Check filter

    if (typeof filter === 'function') {
      if (filter.call(this, evt, target, this)) {
        _dispatchEvent({
          sortable: _this,
          rootEl: originalTarget,
          name: 'filter',
          targetEl: target,
          toEl: el,
          fromEl: el
        });

        pluginEvent('filter', _this, {
          evt: evt
        });
        preventOnFilter && evt.cancelable && evt.preventDefault();
        return; // cancel dnd
      }
    } else if (filter) {
      filter = filter.split(',').some(function (criteria) {
        criteria = closest(originalTarget, criteria.trim(), el, false);

        if (criteria) {
          _dispatchEvent({
            sortable: _this,
            rootEl: criteria,
            name: 'filter',
            targetEl: target,
            fromEl: el,
            toEl: el
          });

          pluginEvent('filter', _this, {
            evt: evt
          });
          return true;
        }
      });

      if (filter) {
        preventOnFilter && evt.cancelable && evt.preventDefault();
        return; // cancel dnd
      }
    }

    if (options.handle && !closest(originalTarget, options.handle, el, false)) {
      return;
    } // Prepare `dragstart`


    this._prepareDragStart(evt, touch, target);
  },
  _prepareDragStart: function _prepareDragStart(
  /** Event */
  evt,
  /** Touch */
  touch,
  /** HTMLElement */
  target) {
    var _this = this,
        el = _this.el,
        options = _this.options,
        ownerDocument = el.ownerDocument,
        dragStartFn;

    if (target && !dragEl && target.parentNode === el) {
      var dragRect = getRect(target);
      rootEl = el;
      dragEl = target;
      parentEl = dragEl.parentNode;
      nextEl = dragEl.nextSibling;
      lastDownEl = target;
      activeGroup = options.group;
      Sortable.dragged = dragEl;
      tapEvt = {
        target: dragEl,
        clientX: (touch || evt).clientX,
        clientY: (touch || evt).clientY
      };
      tapDistanceLeft = tapEvt.clientX - dragRect.left;
      tapDistanceTop = tapEvt.clientY - dragRect.top;
      this._lastX = (touch || evt).clientX;
      this._lastY = (touch || evt).clientY;
      dragEl.style['will-change'] = 'all';

      dragStartFn = function dragStartFn() {
        pluginEvent('delayEnded', _this, {
          evt: evt
        });

        if (Sortable.eventCanceled) {
          _this._onDrop();

          return;
        } // Delayed drag has been triggered
        // we can re-enable the events: touchmove/mousemove


        _this._disableDelayedDragEvents();

        if (!FireFox && _this.nativeDraggable) {
          dragEl.draggable = true;
        } // Bind the events: dragstart/dragend


        _this._triggerDragStart(evt, touch); // Drag start event


        _dispatchEvent({
          sortable: _this,
          name: 'choose',
          originalEvent: evt
        }); // Chosen item


        toggleClass(dragEl, options.chosenClass, true);
      }; // Disable "draggable"


      options.ignore.split(',').forEach(function (criteria) {
        find(dragEl, criteria.trim(), _disableDraggable);
      });
      on(ownerDocument, 'dragover', nearestEmptyInsertDetectEvent);
      on(ownerDocument, 'mousemove', nearestEmptyInsertDetectEvent);
      on(ownerDocument, 'touchmove', nearestEmptyInsertDetectEvent);
      on(ownerDocument, 'mouseup', _this._onDrop);
      on(ownerDocument, 'touchend', _this._onDrop);
      on(ownerDocument, 'touchcancel', _this._onDrop); // Make dragEl draggable (must be before delay for FireFox)

      if (FireFox && this.nativeDraggable) {
        this.options.touchStartThreshold = 4;
        dragEl.draggable = true;
      }

      pluginEvent('delayStart', this, {
        evt: evt
      }); // Delay is impossible for native DnD in Edge or IE

      if (options.delay && (!options.delayOnTouchOnly || touch) && (!this.nativeDraggable || !(Edge || IE11OrLess))) {
        if (Sortable.eventCanceled) {
          this._onDrop();

          return;
        } // If the user moves the pointer or let go the click or touch
        // before the delay has been reached:
        // disable the delayed drag


        on(ownerDocument, 'mouseup', _this._disableDelayedDrag);
        on(ownerDocument, 'touchend', _this._disableDelayedDrag);
        on(ownerDocument, 'touchcancel', _this._disableDelayedDrag);
        on(ownerDocument, 'mousemove', _this._delayedDragTouchMoveHandler);
        on(ownerDocument, 'touchmove', _this._delayedDragTouchMoveHandler);
        options.supportPointer && on(ownerDocument, 'pointermove', _this._delayedDragTouchMoveHandler);
        _this._dragStartTimer = setTimeout(dragStartFn, options.delay);
      } else {
        dragStartFn();
      }
    }
  },
  _delayedDragTouchMoveHandler: function _delayedDragTouchMoveHandler(
  /** TouchEvent|PointerEvent **/
  e) {
    var touch = e.touches ? e.touches[0] : e;

    if (Math.max(Math.abs(touch.clientX - this._lastX), Math.abs(touch.clientY - this._lastY)) >= Math.floor(this.options.touchStartThreshold / (this.nativeDraggable && window.devicePixelRatio || 1))) {
      this._disableDelayedDrag();
    }
  },
  _disableDelayedDrag: function _disableDelayedDrag() {
    dragEl && _disableDraggable(dragEl);
    clearTimeout(this._dragStartTimer);

    this._disableDelayedDragEvents();
  },
  _disableDelayedDragEvents: function _disableDelayedDragEvents() {
    var ownerDocument = this.el.ownerDocument;
    off(ownerDocument, 'mouseup', this._disableDelayedDrag);
    off(ownerDocument, 'touchend', this._disableDelayedDrag);
    off(ownerDocument, 'touchcancel', this._disableDelayedDrag);
    off(ownerDocument, 'mousemove', this._delayedDragTouchMoveHandler);
    off(ownerDocument, 'touchmove', this._delayedDragTouchMoveHandler);
    off(ownerDocument, 'pointermove', this._delayedDragTouchMoveHandler);
  },
  _triggerDragStart: function _triggerDragStart(
  /** Event */
  evt,
  /** Touch */
  touch) {
    touch = touch || evt.pointerType == 'touch' && evt;

    if (!this.nativeDraggable || touch) {
      if (this.options.supportPointer) {
        on(document, 'pointermove', this._onTouchMove);
      } else if (touch) {
        on(document, 'touchmove', this._onTouchMove);
      } else {
        on(document, 'mousemove', this._onTouchMove);
      }
    } else {
      on(dragEl, 'dragend', this);
      on(rootEl, 'dragstart', this._onDragStart);
    }

    try {
      if (document.selection) {
        // Timeout neccessary for IE9
        _nextTick(function () {
          document.selection.empty();
        });
      } else {
        window.getSelection().removeAllRanges();
      }
    } catch (err) {}
  },
  _dragStarted: function _dragStarted(fallback, evt) {

    awaitingDragStarted = false;

    if (rootEl && dragEl) {
      pluginEvent('dragStarted', this, {
        evt: evt
      });

      if (this.nativeDraggable) {
        on(document, 'dragover', _checkOutsideTargetEl);
      }

      var options = this.options; // Apply effect

      !fallback && toggleClass(dragEl, options.dragClass, false);
      toggleClass(dragEl, options.ghostClass, true);
      Sortable.active = this;
      fallback && this._appendGhost(); // Drag start event

      _dispatchEvent({
        sortable: this,
        name: 'start',
        originalEvent: evt
      });
    } else {
      this._nulling();
    }
  },
  _emulateDragOver: function _emulateDragOver() {
    if (touchEvt) {
      this._lastX = touchEvt.clientX;
      this._lastY = touchEvt.clientY;

      _hideGhostForTarget();

      var target = document.elementFromPoint(touchEvt.clientX, touchEvt.clientY);
      var parent = target;

      while (target && target.shadowRoot) {
        target = target.shadowRoot.elementFromPoint(touchEvt.clientX, touchEvt.clientY);
        if (target === parent) break;
        parent = target;
      }

      dragEl.parentNode[expando]._isOutsideThisEl(target);

      if (parent) {
        do {
          if (parent[expando]) {
            var inserted = void 0;
            inserted = parent[expando]._onDragOver({
              clientX: touchEvt.clientX,
              clientY: touchEvt.clientY,
              target: target,
              rootEl: parent
            });

            if (inserted && !this.options.dragoverBubble) {
              break;
            }
          }

          target = parent; // store last element
        }
        /* jshint boss:true */
        while (parent = parent.parentNode);
      }

      _unhideGhostForTarget();
    }
  },
  _onTouchMove: function _onTouchMove(
  /**TouchEvent*/
  evt) {
    if (tapEvt) {
      var options = this.options,
          fallbackTolerance = options.fallbackTolerance,
          fallbackOffset = options.fallbackOffset,
          touch = evt.touches ? evt.touches[0] : evt,
          ghostMatrix = ghostEl && matrix(ghostEl, true),
          scaleX = ghostEl && ghostMatrix && ghostMatrix.a,
          scaleY = ghostEl && ghostMatrix && ghostMatrix.d,
          relativeScrollOffset = PositionGhostAbsolutely && ghostRelativeParent && getRelativeScrollOffset(ghostRelativeParent),
          dx = (touch.clientX - tapEvt.clientX + fallbackOffset.x) / (scaleX || 1) + (relativeScrollOffset ? relativeScrollOffset[0] - ghostRelativeParentInitialScroll[0] : 0) / (scaleX || 1),
          dy = (touch.clientY - tapEvt.clientY + fallbackOffset.y) / (scaleY || 1) + (relativeScrollOffset ? relativeScrollOffset[1] - ghostRelativeParentInitialScroll[1] : 0) / (scaleY || 1); // only set the status to dragging, when we are actually dragging

      if (!Sortable.active && !awaitingDragStarted) {
        if (fallbackTolerance && Math.max(Math.abs(touch.clientX - this._lastX), Math.abs(touch.clientY - this._lastY)) < fallbackTolerance) {
          return;
        }

        this._onDragStart(evt, true);
      }

      if (ghostEl) {
        if (ghostMatrix) {
          ghostMatrix.e += dx - (lastDx || 0);
          ghostMatrix.f += dy - (lastDy || 0);
        } else {
          ghostMatrix = {
            a: 1,
            b: 0,
            c: 0,
            d: 1,
            e: dx,
            f: dy
          };
        }

        var cssMatrix = "matrix(".concat(ghostMatrix.a, ",").concat(ghostMatrix.b, ",").concat(ghostMatrix.c, ",").concat(ghostMatrix.d, ",").concat(ghostMatrix.e, ",").concat(ghostMatrix.f, ")");
        css(ghostEl, 'webkitTransform', cssMatrix);
        css(ghostEl, 'mozTransform', cssMatrix);
        css(ghostEl, 'msTransform', cssMatrix);
        css(ghostEl, 'transform', cssMatrix);
        lastDx = dx;
        lastDy = dy;
        touchEvt = touch;
      }

      evt.cancelable && evt.preventDefault();
    }
  },
  _appendGhost: function _appendGhost() {
    // Bug if using scale(): https://stackoverflow.com/questions/2637058
    // Not being adjusted for
    if (!ghostEl) {
      var container = this.options.fallbackOnBody ? document.body : rootEl,
          rect = getRect(dragEl, true, PositionGhostAbsolutely, true, container),
          options = this.options; // Position absolutely

      if (PositionGhostAbsolutely) {
        // Get relatively positioned parent
        ghostRelativeParent = container;

        while (css(ghostRelativeParent, 'position') === 'static' && css(ghostRelativeParent, 'transform') === 'none' && ghostRelativeParent !== document) {
          ghostRelativeParent = ghostRelativeParent.parentNode;
        }

        if (ghostRelativeParent !== document.body && ghostRelativeParent !== document.documentElement) {
          if (ghostRelativeParent === document) ghostRelativeParent = getWindowScrollingElement();
          rect.top += ghostRelativeParent.scrollTop;
          rect.left += ghostRelativeParent.scrollLeft;
        } else {
          ghostRelativeParent = getWindowScrollingElement();
        }

        ghostRelativeParentInitialScroll = getRelativeScrollOffset(ghostRelativeParent);
      }

      ghostEl = dragEl.cloneNode(true);
      toggleClass(ghostEl, options.ghostClass, false);
      toggleClass(ghostEl, options.fallbackClass, true);
      toggleClass(ghostEl, options.dragClass, true);
      css(ghostEl, 'transition', '');
      css(ghostEl, 'transform', '');
      css(ghostEl, 'box-sizing', 'border-box');
      css(ghostEl, 'margin', 0);
      css(ghostEl, 'top', rect.top);
      css(ghostEl, 'left', rect.left);
      css(ghostEl, 'width', rect.width);
      css(ghostEl, 'height', rect.height);
      css(ghostEl, 'opacity', '0.8');
      css(ghostEl, 'position', PositionGhostAbsolutely ? 'absolute' : 'fixed');
      css(ghostEl, 'zIndex', '100000');
      css(ghostEl, 'pointerEvents', 'none');
      Sortable.ghost = ghostEl;
      container.appendChild(ghostEl); // Set transform-origin

      css(ghostEl, 'transform-origin', tapDistanceLeft / parseInt(ghostEl.style.width) * 100 + '% ' + tapDistanceTop / parseInt(ghostEl.style.height) * 100 + '%');
    }
  },
  _onDragStart: function _onDragStart(
  /**Event*/
  evt,
  /**boolean*/
  fallback) {
    var _this = this;

    var dataTransfer = evt.dataTransfer;
    var options = _this.options;
    pluginEvent('dragStart', this, {
      evt: evt
    });

    if (Sortable.eventCanceled) {
      this._onDrop();

      return;
    }

    pluginEvent('setupClone', this);

    if (!Sortable.eventCanceled) {
      cloneEl = clone(dragEl);
      cloneEl.draggable = false;
      cloneEl.style['will-change'] = '';

      this._hideClone();

      toggleClass(cloneEl, this.options.chosenClass, false);
      Sortable.clone = cloneEl;
    } // #1143: IFrame support workaround


    _this.cloneId = _nextTick(function () {
      pluginEvent('clone', _this);
      if (Sortable.eventCanceled) return;

      if (!_this.options.removeCloneOnHide) {
        rootEl.insertBefore(cloneEl, dragEl);
      }

      _this._hideClone();

      _dispatchEvent({
        sortable: _this,
        name: 'clone'
      });
    });
    !fallback && toggleClass(dragEl, options.dragClass, true); // Set proper drop events

    if (fallback) {
      ignoreNextClick = true;
      _this._loopId = setInterval(_this._emulateDragOver, 50);
    } else {
      // Undo what was set in _prepareDragStart before drag started
      off(document, 'mouseup', _this._onDrop);
      off(document, 'touchend', _this._onDrop);
      off(document, 'touchcancel', _this._onDrop);

      if (dataTransfer) {
        dataTransfer.effectAllowed = 'move';
        options.setData && options.setData.call(_this, dataTransfer, dragEl);
      }

      on(document, 'drop', _this); // #1276 fix:

      css(dragEl, 'transform', 'translateZ(0)');
    }

    awaitingDragStarted = true;
    _this._dragStartId = _nextTick(_this._dragStarted.bind(_this, fallback, evt));
    on(document, 'selectstart', _this);
    moved = true;

    if (Safari) {
      css(document.body, 'user-select', 'none');
    }
  },
  // Returns true - if no further action is needed (either inserted or another condition)
  _onDragOver: function _onDragOver(
  /**Event*/
  evt) {
    var el = this.el,
        target = evt.target,
        dragRect,
        targetRect,
        revert,
        options = this.options,
        group = options.group,
        activeSortable = Sortable.active,
        isOwner = activeGroup === group,
        canSort = options.sort,
        fromSortable = putSortable || activeSortable,
        vertical,
        _this = this,
        completedFired = false;

    if (_silent) return;

    function dragOverEvent(name, extra) {
      pluginEvent(name, _this, _objectSpread({
        evt: evt,
        isOwner: isOwner,
        axis: vertical ? 'vertical' : 'horizontal',
        revert: revert,
        dragRect: dragRect,
        targetRect: targetRect,
        canSort: canSort,
        fromSortable: fromSortable,
        target: target,
        completed: completed,
        onMove: function onMove(target, after) {
          return _onMove(rootEl, el, dragEl, dragRect, target, getRect(target), evt, after);
        },
        changed: changed
      }, extra));
    } // Capture animation state


    function capture() {
      dragOverEvent('dragOverAnimationCapture');

      _this.captureAnimationState();

      if (_this !== fromSortable) {
        fromSortable.captureAnimationState();
      }
    } // Return invocation when dragEl is inserted (or completed)


    function completed(insertion) {
      dragOverEvent('dragOverCompleted', {
        insertion: insertion
      });

      if (insertion) {
        // Clones must be hidden before folding animation to capture dragRectAbsolute properly
        if (isOwner) {
          activeSortable._hideClone();
        } else {
          activeSortable._showClone(_this);
        }

        if (_this !== fromSortable) {
          // Set ghost class to new sortable's ghost class
          toggleClass(dragEl, putSortable ? putSortable.options.ghostClass : activeSortable.options.ghostClass, false);
          toggleClass(dragEl, options.ghostClass, true);
        }

        if (putSortable !== _this && _this !== Sortable.active) {
          putSortable = _this;
        } else if (_this === Sortable.active && putSortable) {
          putSortable = null;
        } // Animation


        if (fromSortable === _this) {
          _this._ignoreWhileAnimating = target;
        }

        _this.animateAll(function () {
          dragOverEvent('dragOverAnimationComplete');
          _this._ignoreWhileAnimating = null;
        });

        if (_this !== fromSortable) {
          fromSortable.animateAll();
          fromSortable._ignoreWhileAnimating = null;
        }
      } // Null lastTarget if it is not inside a previously swapped element


      if (target === dragEl && !dragEl.animated || target === el && !target.animated) {
        lastTarget = null;
      } // no bubbling and not fallback


      if (!options.dragoverBubble && !evt.rootEl && target !== document) {
        dragEl.parentNode[expando]._isOutsideThisEl(evt.target); // Do not detect for empty insert if already inserted


        !insertion && nearestEmptyInsertDetectEvent(evt);
      }

      !options.dragoverBubble && evt.stopPropagation && evt.stopPropagation();
      return completedFired = true;
    } // Call when dragEl has been inserted


    function changed() {
      newIndex = index(dragEl);
      newDraggableIndex = index(dragEl, options.draggable);

      _dispatchEvent({
        sortable: _this,
        name: 'change',
        toEl: el,
        newIndex: newIndex,
        newDraggableIndex: newDraggableIndex,
        originalEvent: evt
      });
    }

    if (evt.preventDefault !== void 0) {
      evt.cancelable && evt.preventDefault();
    }

    target = closest(target, options.draggable, el, true);
    dragOverEvent('dragOver');
    if (Sortable.eventCanceled) return completedFired;

    if (dragEl.contains(evt.target) || target.animated && target.animatingX && target.animatingY || _this._ignoreWhileAnimating === target) {
      return completed(false);
    }

    ignoreNextClick = false;

    if (activeSortable && !options.disabled && (isOwner ? canSort || (revert = !rootEl.contains(dragEl)) // Reverting item into the original list
    : putSortable === this || (this.lastPutMode = activeGroup.checkPull(this, activeSortable, dragEl, evt)) && group.checkPut(this, activeSortable, dragEl, evt))) {
      vertical = this._getDirection(evt, target) === 'vertical';
      dragRect = getRect(dragEl);
      dragOverEvent('dragOverValid');
      if (Sortable.eventCanceled) return completedFired;

      if (revert) {
        parentEl = rootEl; // actualization

        capture();

        this._hideClone();

        dragOverEvent('revert');

        if (!Sortable.eventCanceled) {
          if (nextEl) {
            rootEl.insertBefore(dragEl, nextEl);
          } else {
            rootEl.appendChild(dragEl);
          }
        }

        return completed(true);
      }

      var elLastChild = lastChild(el, options.draggable);

      if (!elLastChild || _ghostIsLast(evt, vertical, this) && !elLastChild.animated) {
        // If already at end of list: Do not insert
        if (elLastChild === dragEl) {
          return completed(false);
        } // assign target only if condition is true


        if (elLastChild && el === evt.target) {
          target = elLastChild;
        }

        if (target) {
          targetRect = getRect(target);
        }

        if (_onMove(rootEl, el, dragEl, dragRect, target, targetRect, evt, !!target) !== false) {
          capture();
          el.appendChild(dragEl);
          parentEl = el; // actualization

          changed();
          return completed(true);
        }
      } else if (target.parentNode === el) {
        targetRect = getRect(target);
        var direction = 0,
            targetBeforeFirstSwap,
            differentLevel = dragEl.parentNode !== el,
            differentRowCol = !_dragElInRowColumn(dragEl.animated && dragEl.toRect || dragRect, target.animated && target.toRect || targetRect, vertical),
            side1 = vertical ? 'top' : 'left',
            scrolledPastTop = isScrolledPast(target, 'top', 'top') || isScrolledPast(dragEl, 'top', 'top'),
            scrollBefore = scrolledPastTop ? scrolledPastTop.scrollTop : void 0;

        if (lastTarget !== target) {
          targetBeforeFirstSwap = targetRect[side1];
          pastFirstInvertThresh = false;
          isCircumstantialInvert = !differentRowCol && options.invertSwap || differentLevel;
        }

        direction = _getSwapDirection(evt, target, targetRect, vertical, differentRowCol ? 1 : options.swapThreshold, options.invertedSwapThreshold == null ? options.swapThreshold : options.invertedSwapThreshold, isCircumstantialInvert, lastTarget === target);
        var sibling;

        if (direction !== 0) {
          // Check if target is beside dragEl in respective direction (ignoring hidden elements)
          var dragIndex = index(dragEl);

          do {
            dragIndex -= direction;
            sibling = parentEl.children[dragIndex];
          } while (sibling && (css(sibling, 'display') === 'none' || sibling === ghostEl));
        } // If dragEl is already beside target: Do not insert


        if (direction === 0 || sibling === target) {
          return completed(false);
        }

        lastTarget = target;
        lastDirection = direction;
        var nextSibling = target.nextElementSibling,
            after = false;
        after = direction === 1;

        var moveVector = _onMove(rootEl, el, dragEl, dragRect, target, targetRect, evt, after);

        if (moveVector !== false) {
          if (moveVector === 1 || moveVector === -1) {
            after = moveVector === 1;
          }

          _silent = true;
          setTimeout(_unsilent, 30);
          capture();

          if (after && !nextSibling) {
            el.appendChild(dragEl);
          } else {
            target.parentNode.insertBefore(dragEl, after ? nextSibling : target);
          } // Undo chrome's scroll adjustment (has no effect on other browsers)


          if (scrolledPastTop) {
            scrollBy(scrolledPastTop, 0, scrollBefore - scrolledPastTop.scrollTop);
          }

          parentEl = dragEl.parentNode; // actualization
          // must be done before animation

          if (targetBeforeFirstSwap !== undefined && !isCircumstantialInvert) {
            targetMoveDistance = Math.abs(targetBeforeFirstSwap - getRect(target)[side1]);
          }

          changed();
          return completed(true);
        }
      }

      if (el.contains(dragEl)) {
        return completed(false);
      }
    }

    return false;
  },
  _ignoreWhileAnimating: null,
  _offMoveEvents: function _offMoveEvents() {
    off(document, 'mousemove', this._onTouchMove);
    off(document, 'touchmove', this._onTouchMove);
    off(document, 'pointermove', this._onTouchMove);
    off(document, 'dragover', nearestEmptyInsertDetectEvent);
    off(document, 'mousemove', nearestEmptyInsertDetectEvent);
    off(document, 'touchmove', nearestEmptyInsertDetectEvent);
  },
  _offUpEvents: function _offUpEvents() {
    var ownerDocument = this.el.ownerDocument;
    off(ownerDocument, 'mouseup', this._onDrop);
    off(ownerDocument, 'touchend', this._onDrop);
    off(ownerDocument, 'pointerup', this._onDrop);
    off(ownerDocument, 'touchcancel', this._onDrop);
    off(document, 'selectstart', this);
  },
  _onDrop: function _onDrop(
  /**Event*/
  evt) {
    var el = this.el,
        options = this.options; // Get the index of the dragged element within its parent

    newIndex = index(dragEl);
    newDraggableIndex = index(dragEl, options.draggable);
    pluginEvent('drop', this, {
      evt: evt
    });
    parentEl = dragEl && dragEl.parentNode; // Get again after plugin event

    newIndex = index(dragEl);
    newDraggableIndex = index(dragEl, options.draggable);

    if (Sortable.eventCanceled) {
      this._nulling();

      return;
    }

    awaitingDragStarted = false;
    isCircumstantialInvert = false;
    pastFirstInvertThresh = false;
    clearInterval(this._loopId);
    clearTimeout(this._dragStartTimer);

    _cancelNextTick(this.cloneId);

    _cancelNextTick(this._dragStartId); // Unbind events


    if (this.nativeDraggable) {
      off(document, 'drop', this);
      off(el, 'dragstart', this._onDragStart);
    }

    this._offMoveEvents();

    this._offUpEvents();

    if (Safari) {
      css(document.body, 'user-select', '');
    }

    css(dragEl, 'transform', '');

    if (evt) {
      if (moved) {
        evt.cancelable && evt.preventDefault();
        !options.dropBubble && evt.stopPropagation();
      }

      ghostEl && ghostEl.parentNode && ghostEl.parentNode.removeChild(ghostEl);

      if (rootEl === parentEl || putSortable && putSortable.lastPutMode !== 'clone') {
        // Remove clone(s)
        cloneEl && cloneEl.parentNode && cloneEl.parentNode.removeChild(cloneEl);
      }

      if (dragEl) {
        if (this.nativeDraggable) {
          off(dragEl, 'dragend', this);
        }

        _disableDraggable(dragEl);

        dragEl.style['will-change'] = ''; // Remove classes
        // ghostClass is added in dragStarted

        if (moved && !awaitingDragStarted) {
          toggleClass(dragEl, putSortable ? putSortable.options.ghostClass : this.options.ghostClass, false);
        }

        toggleClass(dragEl, this.options.chosenClass, false); // Drag stop event

        _dispatchEvent({
          sortable: this,
          name: 'unchoose',
          toEl: parentEl,
          newIndex: null,
          newDraggableIndex: null,
          originalEvent: evt
        });

        if (rootEl !== parentEl) {
          if (newIndex >= 0) {
            // Add event
            _dispatchEvent({
              rootEl: parentEl,
              name: 'add',
              toEl: parentEl,
              fromEl: rootEl,
              originalEvent: evt
            }); // Remove event


            _dispatchEvent({
              sortable: this,
              name: 'remove',
              toEl: parentEl,
              originalEvent: evt
            }); // drag from one list and drop into another


            _dispatchEvent({
              rootEl: parentEl,
              name: 'sort',
              toEl: parentEl,
              fromEl: rootEl,
              originalEvent: evt
            });

            _dispatchEvent({
              sortable: this,
              name: 'sort',
              toEl: parentEl,
              originalEvent: evt
            });
          }

          putSortable && putSortable.save();
        } else {
          if (newIndex !== oldIndex) {
            if (newIndex >= 0) {
              // drag & drop within the same list
              _dispatchEvent({
                sortable: this,
                name: 'update',
                toEl: parentEl,
                originalEvent: evt
              });

              _dispatchEvent({
                sortable: this,
                name: 'sort',
                toEl: parentEl,
                originalEvent: evt
              });
            }
          }
        }

        if (Sortable.active) {
          /* jshint eqnull:true */
          if (newIndex == null || newIndex === -1) {
            newIndex = oldIndex;
            newDraggableIndex = oldDraggableIndex;
          }

          _dispatchEvent({
            sortable: this,
            name: 'end',
            toEl: parentEl,
            originalEvent: evt
          }); // Save sorting


          this.save();
        }
      }
    }

    this._nulling();
  },
  _nulling: function _nulling() {
    pluginEvent('nulling', this);
    rootEl = dragEl = parentEl = ghostEl = nextEl = cloneEl = lastDownEl = cloneHidden = tapEvt = touchEvt = moved = newIndex = newDraggableIndex = oldIndex = oldDraggableIndex = lastTarget = lastDirection = putSortable = activeGroup = Sortable.dragged = Sortable.ghost = Sortable.clone = Sortable.active = null;
    savedInputChecked.forEach(function (el) {
      el.checked = true;
    });
    savedInputChecked.length = lastDx = lastDy = 0;
  },
  handleEvent: function handleEvent(
  /**Event*/
  evt) {
    switch (evt.type) {
      case 'drop':
      case 'dragend':
        this._onDrop(evt);

        break;

      case 'dragenter':
      case 'dragover':
        if (dragEl) {
          this._onDragOver(evt);

          _globalDragOver(evt);
        }

        break;

      case 'selectstart':
        evt.preventDefault();
        break;
    }
  },

  /**
   * Serializes the item into an array of string.
   * @returns {String[]}
   */
  toArray: function toArray() {
    var order = [],
        el,
        children = this.el.children,
        i = 0,
        n = children.length,
        options = this.options;

    for (; i < n; i++) {
      el = children[i];

      if (closest(el, options.draggable, this.el, false)) {
        order.push(el.getAttribute(options.dataIdAttr) || _generateId(el));
      }
    }

    return order;
  },

  /**
   * Sorts the elements according to the array.
   * @param  {String[]}  order  order of the items
   */
  sort: function sort(order) {
    var items = {},
        rootEl = this.el;
    this.toArray().forEach(function (id, i) {
      var el = rootEl.children[i];

      if (closest(el, this.options.draggable, rootEl, false)) {
        items[id] = el;
      }
    }, this);
    order.forEach(function (id) {
      if (items[id]) {
        rootEl.removeChild(items[id]);
        rootEl.appendChild(items[id]);
      }
    });
  },

  /**
   * Save the current sorting
   */
  save: function save() {
    var store = this.options.store;
    store && store.set && store.set(this);
  },

  /**
   * For each element in the set, get the first element that matches the selector by testing the element itself and traversing up through its ancestors in the DOM tree.
   * @param   {HTMLElement}  el
   * @param   {String}       [selector]  default: `options.draggable`
   * @returns {HTMLElement|null}
   */
  closest: function closest$1(el, selector) {
    return closest(el, selector || this.options.draggable, this.el, false);
  },

  /**
   * Set/get option
   * @param   {string} name
   * @param   {*}      [value]
   * @returns {*}
   */
  option: function option(name, value) {
    var options = this.options;

    if (value === void 0) {
      return options[name];
    } else {
      var modifiedValue = PluginManager.modifyOption(this, name, value);

      if (typeof modifiedValue !== 'undefined') {
        options[name] = modifiedValue;
      } else {
        options[name] = value;
      }

      if (name === 'group') {
        _prepareGroup(options);
      }
    }
  },

  /**
   * Destroy
   */
  destroy: function destroy() {
    pluginEvent('destroy', this);
    var el = this.el;
    el[expando] = null;
    off(el, 'mousedown', this._onTapStart);
    off(el, 'touchstart', this._onTapStart);
    off(el, 'pointerdown', this._onTapStart);

    if (this.nativeDraggable) {
      off(el, 'dragover', this);
      off(el, 'dragenter', this);
    } // Remove draggable attributes


    Array.prototype.forEach.call(el.querySelectorAll('[draggable]'), function (el) {
      el.removeAttribute('draggable');
    });

    this._onDrop();

    this._disableDelayedDragEvents();

    sortables.splice(sortables.indexOf(this.el), 1);
    this.el = el = null;
  },
  _hideClone: function _hideClone() {
    if (!cloneHidden) {
      pluginEvent('hideClone', this);
      if (Sortable.eventCanceled) return;
      css(cloneEl, 'display', 'none');

      if (this.options.removeCloneOnHide && cloneEl.parentNode) {
        cloneEl.parentNode.removeChild(cloneEl);
      }

      cloneHidden = true;
    }
  },
  _showClone: function _showClone(putSortable) {
    if (putSortable.lastPutMode !== 'clone') {
      this._hideClone();

      return;
    }

    if (cloneHidden) {
      pluginEvent('showClone', this);
      if (Sortable.eventCanceled) return; // show clone at dragEl or original position

      if (rootEl.contains(dragEl) && !this.options.group.revertClone) {
        rootEl.insertBefore(cloneEl, dragEl);
      } else if (nextEl) {
        rootEl.insertBefore(cloneEl, nextEl);
      } else {
        rootEl.appendChild(cloneEl);
      }

      if (this.options.group.revertClone) {
        this.animate(dragEl, cloneEl);
      }

      css(cloneEl, 'display', '');
      cloneHidden = false;
    }
  }
};

function _globalDragOver(
/**Event*/
evt) {
  if (evt.dataTransfer) {
    evt.dataTransfer.dropEffect = 'move';
  }

  evt.cancelable && evt.preventDefault();
}

function _onMove(fromEl, toEl, dragEl, dragRect, targetEl, targetRect, originalEvent, willInsertAfter) {
  var evt,
      sortable = fromEl[expando],
      onMoveFn = sortable.options.onMove,
      retVal; // Support for new CustomEvent feature

  if (window.CustomEvent && !IE11OrLess && !Edge) {
    evt = new CustomEvent('move', {
      bubbles: true,
      cancelable: true
    });
  } else {
    evt = document.createEvent('Event');
    evt.initEvent('move', true, true);
  }

  evt.to = toEl;
  evt.from = fromEl;
  evt.dragged = dragEl;
  evt.draggedRect = dragRect;
  evt.related = targetEl || toEl;
  evt.relatedRect = targetRect || getRect(toEl);
  evt.willInsertAfter = willInsertAfter;
  evt.originalEvent = originalEvent;
  fromEl.dispatchEvent(evt);

  if (onMoveFn) {
    retVal = onMoveFn.call(sortable, evt, originalEvent);
  }

  return retVal;
}

function _disableDraggable(el) {
  el.draggable = false;
}

function _unsilent() {
  _silent = false;
}

function _ghostIsLast(evt, vertical, sortable) {
  var rect = getRect(lastChild(sortable.el, sortable.options.draggable));
  var spacer = 10;
  return vertical ? evt.clientX > rect.right + spacer || evt.clientX <= rect.right && evt.clientY > rect.bottom && evt.clientX >= rect.left : evt.clientX > rect.right && evt.clientY > rect.top || evt.clientX <= rect.right && evt.clientY > rect.bottom + spacer;
}

function _getSwapDirection(evt, target, targetRect, vertical, swapThreshold, invertedSwapThreshold, invertSwap, isLastTarget) {
  var mouseOnAxis = vertical ? evt.clientY : evt.clientX,
      targetLength = vertical ? targetRect.height : targetRect.width,
      targetS1 = vertical ? targetRect.top : targetRect.left,
      targetS2 = vertical ? targetRect.bottom : targetRect.right,
      invert = false;

  if (!invertSwap) {
    // Never invert or create dragEl shadow when target movemenet causes mouse to move past the end of regular swapThreshold
    if (isLastTarget && targetMoveDistance < targetLength * swapThreshold) {
      // multiplied only by swapThreshold because mouse will already be inside target by (1 - threshold) * targetLength / 2
      // check if past first invert threshold on side opposite of lastDirection
      if (!pastFirstInvertThresh && (lastDirection === 1 ? mouseOnAxis > targetS1 + targetLength * invertedSwapThreshold / 2 : mouseOnAxis < targetS2 - targetLength * invertedSwapThreshold / 2)) {
        // past first invert threshold, do not restrict inverted threshold to dragEl shadow
        pastFirstInvertThresh = true;
      }

      if (!pastFirstInvertThresh) {
        // dragEl shadow (target move distance shadow)
        if (lastDirection === 1 ? mouseOnAxis < targetS1 + targetMoveDistance // over dragEl shadow
        : mouseOnAxis > targetS2 - targetMoveDistance) {
          return -lastDirection;
        }
      } else {
        invert = true;
      }
    } else {
      // Regular
      if (mouseOnAxis > targetS1 + targetLength * (1 - swapThreshold) / 2 && mouseOnAxis < targetS2 - targetLength * (1 - swapThreshold) / 2) {
        return _getInsertDirection(target);
      }
    }
  }

  invert = invert || invertSwap;

  if (invert) {
    // Invert of regular
    if (mouseOnAxis < targetS1 + targetLength * invertedSwapThreshold / 2 || mouseOnAxis > targetS2 - targetLength * invertedSwapThreshold / 2) {
      return mouseOnAxis > targetS1 + targetLength / 2 ? 1 : -1;
    }
  }

  return 0;
}
/**
 * Gets the direction dragEl must be swapped relative to target in order to make it
 * seem that dragEl has been "inserted" into that element's position
 * @param  {HTMLElement} target       The target whose position dragEl is being inserted at
 * @return {Number}                   Direction dragEl must be swapped
 */


function _getInsertDirection(target) {
  if (index(dragEl) < index(target)) {
    return 1;
  } else {
    return -1;
  }
}
/**
 * Generate id
 * @param   {HTMLElement} el
 * @returns {String}
 * @private
 */


function _generateId(el) {
  var str = el.tagName + el.className + el.src + el.href + el.textContent,
      i = str.length,
      sum = 0;

  while (i--) {
    sum += str.charCodeAt(i);
  }

  return sum.toString(36);
}

function _saveInputCheckedState(root) {
  savedInputChecked.length = 0;
  var inputs = root.getElementsByTagName('input');
  var idx = inputs.length;

  while (idx--) {
    var el = inputs[idx];
    el.checked && savedInputChecked.push(el);
  }
}

function _nextTick(fn) {
  return setTimeout(fn, 0);
}

function _cancelNextTick(id) {
  return clearTimeout(id);
} // Fixed #973:


if (documentExists) {
  on(document, 'touchmove', function (evt) {
    if ((Sortable.active || awaitingDragStarted) && evt.cancelable) {
      evt.preventDefault();
    }
  });
} // Export utils


Sortable.utils = {
  on: on,
  off: off,
  css: css,
  find: find,
  is: function is(el, selector) {
    return !!closest(el, selector, el, false);
  },
  extend: extend,
  throttle: throttle,
  closest: closest,
  toggleClass: toggleClass,
  clone: clone,
  index: index,
  nextTick: _nextTick,
  cancelNextTick: _cancelNextTick,
  detectDirection: _detectDirection,
  getChild: getChild
};
/**
 * Get the Sortable instance of an element
 * @param  {HTMLElement} element The element
 * @return {Sortable|undefined}         The instance of Sortable
 */

Sortable.get = function (element) {
  return element[expando];
};
/**
 * Mount a plugin to Sortable
 * @param  {...SortablePlugin|SortablePlugin[]} plugins       Plugins being mounted
 */


Sortable.mount = function () {
  for (var _len = arguments.length, plugins = new Array(_len), _key = 0; _key < _len; _key++) {
    plugins[_key] = arguments[_key];
  }

  if (plugins[0].constructor === Array) plugins = plugins[0];
  plugins.forEach(function (plugin) {
    if (!plugin.prototype || !plugin.prototype.constructor) {
      throw "Sortable: Mounted plugin must be a constructor function, not ".concat({}.toString.call(plugin));
    }

    if (plugin.utils) Sortable.utils = _objectSpread({}, Sortable.utils, plugin.utils);
    PluginManager.mount(plugin);
  });
};
/**
 * Create sortable instance
 * @param {HTMLElement}  el
 * @param {Object}      [options]
 */


Sortable.create = function (el, options) {
  return new Sortable(el, options);
}; // Export


Sortable.version = version;

var autoScrolls = [],
    scrollEl,
    scrollRootEl,
    scrolling = false,
    lastAutoScrollX,
    lastAutoScrollY,
    touchEvt$1,
    pointerElemChangedInterval;

function AutoScrollPlugin() {
  function AutoScroll() {
    this.defaults = {
      scroll: true,
      scrollSensitivity: 30,
      scrollSpeed: 10,
      bubbleScroll: true
    }; // Bind all private methods

    for (var fn in this) {
      if (fn.charAt(0) === '_' && typeof this[fn] === 'function') {
        this[fn] = this[fn].bind(this);
      }
    }
  }

  AutoScroll.prototype = {
    dragStarted: function dragStarted(_ref) {
      var originalEvent = _ref.originalEvent;

      if (this.sortable.nativeDraggable) {
        on(document, 'dragover', this._handleAutoScroll);
      } else {
        if (this.options.supportPointer) {
          on(document, 'pointermove', this._handleFallbackAutoScroll);
        } else if (originalEvent.touches) {
          on(document, 'touchmove', this._handleFallbackAutoScroll);
        } else {
          on(document, 'mousemove', this._handleFallbackAutoScroll);
        }
      }
    },
    dragOverCompleted: function dragOverCompleted(_ref2) {
      var originalEvent = _ref2.originalEvent;

      // For when bubbling is canceled and using fallback (fallback 'touchmove' always reached)
      if (!this.options.dragOverBubble && !originalEvent.rootEl) {
        this._handleAutoScroll(originalEvent);
      }
    },
    drop: function drop() {
      if (this.sortable.nativeDraggable) {
        off(document, 'dragover', this._handleAutoScroll);
      } else {
        off(document, 'pointermove', this._handleFallbackAutoScroll);
        off(document, 'touchmove', this._handleFallbackAutoScroll);
        off(document, 'mousemove', this._handleFallbackAutoScroll);
      }

      clearPointerElemChangedInterval();
      clearAutoScrolls();
      cancelThrottle();
    },
    nulling: function nulling() {
      touchEvt$1 = scrollRootEl = scrollEl = scrolling = pointerElemChangedInterval = lastAutoScrollX = lastAutoScrollY = null;
      autoScrolls.length = 0;
    },
    _handleFallbackAutoScroll: function _handleFallbackAutoScroll(evt) {
      this._handleAutoScroll(evt, true);
    },
    _handleAutoScroll: function _handleAutoScroll(evt, fallback) {
      var _this = this;

      var x = (evt.touches ? evt.touches[0] : evt).clientX,
          y = (evt.touches ? evt.touches[0] : evt).clientY,
          elem = document.elementFromPoint(x, y);
      touchEvt$1 = evt; // IE does not seem to have native autoscroll,
      // Edge's autoscroll seems too conditional,
      // MACOS Safari does not have autoscroll,
      // Firefox and Chrome are good

      if (fallback || Edge || IE11OrLess || Safari) {
        autoScroll(evt, this.options, elem, fallback); // Listener for pointer element change

        var ogElemScroller = getParentAutoScrollElement(elem, true);

        if (scrolling && (!pointerElemChangedInterval || x !== lastAutoScrollX || y !== lastAutoScrollY)) {
          pointerElemChangedInterval && clearPointerElemChangedInterval(); // Detect for pointer elem change, emulating native DnD behaviour

          pointerElemChangedInterval = setInterval(function () {
            var newElem = getParentAutoScrollElement(document.elementFromPoint(x, y), true);

            if (newElem !== ogElemScroller) {
              ogElemScroller = newElem;
              clearAutoScrolls();
            }

            autoScroll(evt, _this.options, newElem, fallback);
          }, 10);
          lastAutoScrollX = x;
          lastAutoScrollY = y;
        }
      } else {
        // if DnD is enabled (and browser has good autoscrolling), first autoscroll will already scroll, so get parent autoscroll of first autoscroll
        if (!this.options.bubbleScroll || getParentAutoScrollElement(elem, true) === getWindowScrollingElement()) {
          clearAutoScrolls();
          return;
        }

        autoScroll(evt, this.options, getParentAutoScrollElement(elem, false), false);
      }
    }
  };
  return _extends(AutoScroll, {
    pluginName: 'scroll',
    initializeByDefault: true
  });
}

function clearAutoScrolls() {
  autoScrolls.forEach(function (autoScroll) {
    clearInterval(autoScroll.pid);
  });
  autoScrolls = [];
}

function clearPointerElemChangedInterval() {
  clearInterval(pointerElemChangedInterval);
}

var autoScroll = throttle(function (evt, options, rootEl, isFallback) {
  // Bug: https://bugzilla.mozilla.org/show_bug.cgi?id=505521
  if (!options.scroll) return;
  var x = (evt.touches ? evt.touches[0] : evt).clientX,
      y = (evt.touches ? evt.touches[0] : evt).clientY,
      sens = options.scrollSensitivity,
      speed = options.scrollSpeed,
      winScroller = getWindowScrollingElement();
  var scrollThisInstance = false,
      scrollCustomFn; // New scroll root, set scrollEl

  if (scrollRootEl !== rootEl) {
    scrollRootEl = rootEl;
    clearAutoScrolls();
    scrollEl = options.scroll;
    scrollCustomFn = options.scrollFn;

    if (scrollEl === true) {
      scrollEl = getParentAutoScrollElement(rootEl, true);
    }
  }

  var layersOut = 0;
  var currentParent = scrollEl;

  do {
    var el = currentParent,
        rect = getRect(el),
        top = rect.top,
        bottom = rect.bottom,
        left = rect.left,
        right = rect.right,
        width = rect.width,
        height = rect.height,
        canScrollX = void 0,
        canScrollY = void 0,
        scrollWidth = el.scrollWidth,
        scrollHeight = el.scrollHeight,
        elCSS = css(el),
        scrollPosX = el.scrollLeft,
        scrollPosY = el.scrollTop;

    if (el === winScroller) {
      canScrollX = width < scrollWidth && (elCSS.overflowX === 'auto' || elCSS.overflowX === 'scroll' || elCSS.overflowX === 'visible');
      canScrollY = height < scrollHeight && (elCSS.overflowY === 'auto' || elCSS.overflowY === 'scroll' || elCSS.overflowY === 'visible');
    } else {
      canScrollX = width < scrollWidth && (elCSS.overflowX === 'auto' || elCSS.overflowX === 'scroll');
      canScrollY = height < scrollHeight && (elCSS.overflowY === 'auto' || elCSS.overflowY === 'scroll');
    }

    var vx = canScrollX && (Math.abs(right - x) <= sens && scrollPosX + width < scrollWidth) - (Math.abs(left - x) <= sens && !!scrollPosX);
    var vy = canScrollY && (Math.abs(bottom - y) <= sens && scrollPosY + height < scrollHeight) - (Math.abs(top - y) <= sens && !!scrollPosY);

    if (!autoScrolls[layersOut]) {
      for (var i = 0; i <= layersOut; i++) {
        if (!autoScrolls[i]) {
          autoScrolls[i] = {};
        }
      }
    }

    if (autoScrolls[layersOut].vx != vx || autoScrolls[layersOut].vy != vy || autoScrolls[layersOut].el !== el) {
      autoScrolls[layersOut].el = el;
      autoScrolls[layersOut].vx = vx;
      autoScrolls[layersOut].vy = vy;
      clearInterval(autoScrolls[layersOut].pid);

      if (vx != 0 || vy != 0) {
        scrollThisInstance = true;
        /* jshint loopfunc:true */

        autoScrolls[layersOut].pid = setInterval(function () {
          // emulate drag over during autoscroll (fallback), emulating native DnD behaviour
          if (isFallback && this.layer === 0) {
            Sortable.active._onTouchMove(touchEvt$1); // To move ghost if it is positioned absolutely

          }

          var scrollOffsetY = autoScrolls[this.layer].vy ? autoScrolls[this.layer].vy * speed : 0;
          var scrollOffsetX = autoScrolls[this.layer].vx ? autoScrolls[this.layer].vx * speed : 0;

          if (typeof scrollCustomFn === 'function') {
            if (scrollCustomFn.call(Sortable.dragged.parentNode[expando], scrollOffsetX, scrollOffsetY, evt, touchEvt$1, autoScrolls[this.layer].el) !== 'continue') {
              return;
            }
          }

          scrollBy(autoScrolls[this.layer].el, scrollOffsetX, scrollOffsetY);
        }.bind({
          layer: layersOut
        }), 24);
      }
    }

    layersOut++;
  } while (options.bubbleScroll && currentParent !== winScroller && (currentParent = getParentAutoScrollElement(currentParent, false)));

  scrolling = scrollThisInstance; // in case another function catches scrolling as false in between when it is not
}, 30);

var drop = function drop(_ref) {
  var originalEvent = _ref.originalEvent,
      putSortable = _ref.putSortable,
      dragEl = _ref.dragEl,
      activeSortable = _ref.activeSortable,
      dispatchSortableEvent = _ref.dispatchSortableEvent,
      hideGhostForTarget = _ref.hideGhostForTarget,
      unhideGhostForTarget = _ref.unhideGhostForTarget;
  if (!originalEvent) return;
  var toSortable = putSortable || activeSortable;
  hideGhostForTarget();
  var touch = originalEvent.changedTouches && originalEvent.changedTouches.length ? originalEvent.changedTouches[0] : originalEvent;
  var target = document.elementFromPoint(touch.clientX, touch.clientY);
  unhideGhostForTarget();

  if (toSortable && !toSortable.el.contains(target)) {
    dispatchSortableEvent('spill');
    this.onSpill({
      dragEl: dragEl,
      putSortable: putSortable
    });
  }
};

function Revert() {}

Revert.prototype = {
  startIndex: null,
  dragStart: function dragStart(_ref2) {
    var oldDraggableIndex = _ref2.oldDraggableIndex;
    this.startIndex = oldDraggableIndex;
  },
  onSpill: function onSpill(_ref3) {
    var dragEl = _ref3.dragEl,
        putSortable = _ref3.putSortable;
    this.sortable.captureAnimationState();

    if (putSortable) {
      putSortable.captureAnimationState();
    }

    var nextSibling = getChild(this.sortable.el, this.startIndex, this.options);

    if (nextSibling) {
      this.sortable.el.insertBefore(dragEl, nextSibling);
    } else {
      this.sortable.el.appendChild(dragEl);
    }

    this.sortable.animateAll();

    if (putSortable) {
      putSortable.animateAll();
    }
  },
  drop: drop
};

_extends(Revert, {
  pluginName: 'revertOnSpill'
});

function Remove() {}

Remove.prototype = {
  onSpill: function onSpill(_ref4) {
    var dragEl = _ref4.dragEl,
        putSortable = _ref4.putSortable;
    var parentSortable = putSortable || this.sortable;
    parentSortable.captureAnimationState();
    dragEl.parentNode && dragEl.parentNode.removeChild(dragEl);
    parentSortable.animateAll();
  },
  drop: drop
};

_extends(Remove, {
  pluginName: 'removeOnSpill'
});

var lastSwapEl;

function SwapPlugin() {
  function Swap() {
    this.defaults = {
      swapClass: 'sortable-swap-highlight'
    };
  }

  Swap.prototype = {
    dragStart: function dragStart(_ref) {
      var dragEl = _ref.dragEl;
      lastSwapEl = dragEl;
    },
    dragOverValid: function dragOverValid(_ref2) {
      var completed = _ref2.completed,
          target = _ref2.target,
          onMove = _ref2.onMove,
          activeSortable = _ref2.activeSortable,
          changed = _ref2.changed,
          cancel = _ref2.cancel;
      if (!activeSortable.options.swap) return;
      var el = this.sortable.el,
          options = this.options;

      if (target && target !== el) {
        var prevSwapEl = lastSwapEl;

        if (onMove(target) !== false) {
          toggleClass(target, options.swapClass, true);
          lastSwapEl = target;
        } else {
          lastSwapEl = null;
        }

        if (prevSwapEl && prevSwapEl !== lastSwapEl) {
          toggleClass(prevSwapEl, options.swapClass, false);
        }
      }

      changed();
      completed(true);
      cancel();
    },
    drop: function drop(_ref3) {
      var activeSortable = _ref3.activeSortable,
          putSortable = _ref3.putSortable,
          dragEl = _ref3.dragEl;
      var toSortable = putSortable || this.sortable;
      var options = this.options;
      lastSwapEl && toggleClass(lastSwapEl, options.swapClass, false);

      if (lastSwapEl && (options.swap || putSortable && putSortable.options.swap)) {
        if (dragEl !== lastSwapEl) {
          toSortable.captureAnimationState();
          if (toSortable !== activeSortable) activeSortable.captureAnimationState();
          swapNodes(dragEl, lastSwapEl);
          toSortable.animateAll();
          if (toSortable !== activeSortable) activeSortable.animateAll();
        }
      }
    },
    nulling: function nulling() {
      lastSwapEl = null;
    }
  };
  return _extends(Swap, {
    pluginName: 'swap',
    eventProperties: function eventProperties() {
      return {
        swapItem: lastSwapEl
      };
    }
  });
}

function swapNodes(n1, n2) {
  var p1 = n1.parentNode,
      p2 = n2.parentNode,
      i1,
      i2;
  if (!p1 || !p2 || p1.isEqualNode(n2) || p2.isEqualNode(n1)) return;
  i1 = index(n1);
  i2 = index(n2);

  if (p1.isEqualNode(p2) && i1 < i2) {
    i2++;
  }

  p1.insertBefore(n2, p1.children[i1]);
  p2.insertBefore(n1, p2.children[i2]);
}

var multiDragElements = [],
    multiDragClones = [],
    lastMultiDragSelect,
    // for selection with modifier key down (SHIFT)
multiDragSortable,
    initialFolding = false,
    // Initial multi-drag fold when drag started
folding = false,
    // Folding any other time
dragStarted = false,
    dragEl$1,
    clonesFromRect,
    clonesHidden;

function MultiDragPlugin() {
  function MultiDrag(sortable) {
    // Bind all private methods
    for (var fn in this) {
      if (fn.charAt(0) === '_' && typeof this[fn] === 'function') {
        this[fn] = this[fn].bind(this);
      }
    }

    if (sortable.options.supportPointer) {
      on(document, 'pointerup', this._deselectMultiDrag);
    } else {
      on(document, 'mouseup', this._deselectMultiDrag);
      on(document, 'touchend', this._deselectMultiDrag);
    }

    on(document, 'keydown', this._checkKeyDown);
    on(document, 'keyup', this._checkKeyUp);
    this.defaults = {
      selectedClass: 'sortable-selected',
      multiDragKey: null,
      setData: function setData(dataTransfer, dragEl) {
        var data = '';

        if (multiDragElements.length && multiDragSortable === sortable) {
          multiDragElements.forEach(function (multiDragElement, i) {
            data += (!i ? '' : ', ') + multiDragElement.textContent;
          });
        } else {
          data = dragEl.textContent;
        }

        dataTransfer.setData('Text', data);
      }
    };
  }

  MultiDrag.prototype = {
    multiDragKeyDown: false,
    isMultiDrag: false,
    delayStartGlobal: function delayStartGlobal(_ref) {
      var dragged = _ref.dragEl;
      dragEl$1 = dragged;
    },
    delayEnded: function delayEnded() {
      this.isMultiDrag = ~multiDragElements.indexOf(dragEl$1);
    },
    setupClone: function setupClone(_ref2) {
      var sortable = _ref2.sortable,
          cancel = _ref2.cancel;
      if (!this.isMultiDrag) return;

      for (var i = 0; i < multiDragElements.length; i++) {
        multiDragClones.push(clone(multiDragElements[i]));
        multiDragClones[i].sortableIndex = multiDragElements[i].sortableIndex;
        multiDragClones[i].draggable = false;
        multiDragClones[i].style['will-change'] = '';
        toggleClass(multiDragClones[i], this.options.selectedClass, false);
        multiDragElements[i] === dragEl$1 && toggleClass(multiDragClones[i], this.options.chosenClass, false);
      }

      sortable._hideClone();

      cancel();
    },
    clone: function clone(_ref3) {
      var sortable = _ref3.sortable,
          rootEl = _ref3.rootEl,
          dispatchSortableEvent = _ref3.dispatchSortableEvent,
          cancel = _ref3.cancel;
      if (!this.isMultiDrag) return;

      if (!this.options.removeCloneOnHide) {
        if (multiDragElements.length && multiDragSortable === sortable) {
          insertMultiDragClones(true, rootEl);
          dispatchSortableEvent('clone');
          cancel();
        }
      }
    },
    showClone: function showClone(_ref4) {
      var cloneNowShown = _ref4.cloneNowShown,
          rootEl = _ref4.rootEl,
          cancel = _ref4.cancel;
      if (!this.isMultiDrag) return;
      insertMultiDragClones(false, rootEl);
      multiDragClones.forEach(function (clone) {
        css(clone, 'display', '');
      });
      cloneNowShown();
      clonesHidden = false;
      cancel();
    },
    hideClone: function hideClone(_ref5) {
      var _this = this;

      var sortable = _ref5.sortable,
          cloneNowHidden = _ref5.cloneNowHidden,
          cancel = _ref5.cancel;
      if (!this.isMultiDrag) return;
      multiDragClones.forEach(function (clone) {
        css(clone, 'display', 'none');

        if (_this.options.removeCloneOnHide && clone.parentNode) {
          clone.parentNode.removeChild(clone);
        }
      });
      cloneNowHidden();
      clonesHidden = true;
      cancel();
    },
    dragStartGlobal: function dragStartGlobal(_ref6) {
      var sortable = _ref6.sortable;

      if (!this.isMultiDrag && multiDragSortable) {
        multiDragSortable.multiDrag._deselectMultiDrag();
      }

      multiDragElements.forEach(function (multiDragElement) {
        multiDragElement.sortableIndex = index(multiDragElement);
      }); // Sort multi-drag elements

      multiDragElements = multiDragElements.sort(function (a, b) {
        return a.sortableIndex - b.sortableIndex;
      });
      dragStarted = true;
    },
    dragStarted: function dragStarted(_ref7) {
      var _this2 = this;

      var sortable = _ref7.sortable;
      if (!this.isMultiDrag) return;

      if (this.options.sort) {
        // Capture rects,
        // hide multi drag elements (by positioning them absolute),
        // set multi drag elements rects to dragRect,
        // show multi drag elements,
        // animate to rects,
        // unset rects & remove from DOM
        sortable.captureAnimationState();

        if (this.options.animation) {
          multiDragElements.forEach(function (multiDragElement) {
            if (multiDragElement === dragEl$1) return;
            css(multiDragElement, 'position', 'absolute');
          });
          var dragRect = getRect(dragEl$1, false, true, true);
          multiDragElements.forEach(function (multiDragElement) {
            if (multiDragElement === dragEl$1) return;
            setRect(multiDragElement, dragRect);
          });
          folding = true;
          initialFolding = true;
        }
      }

      sortable.animateAll(function () {
        folding = false;
        initialFolding = false;

        if (_this2.options.animation) {
          multiDragElements.forEach(function (multiDragElement) {
            unsetRect(multiDragElement);
          });
        } // Remove all auxiliary multidrag items from el, if sorting enabled


        if (_this2.options.sort) {
          removeMultiDragElements();
        }
      });
    },
    dragOver: function dragOver(_ref8) {
      var target = _ref8.target,
          completed = _ref8.completed,
          cancel = _ref8.cancel;

      if (folding && ~multiDragElements.indexOf(target)) {
        completed(false);
        cancel();
      }
    },
    revert: function revert(_ref9) {
      var fromSortable = _ref9.fromSortable,
          rootEl = _ref9.rootEl,
          sortable = _ref9.sortable,
          dragRect = _ref9.dragRect;

      if (multiDragElements.length > 1) {
        // Setup unfold animation
        multiDragElements.forEach(function (multiDragElement) {
          sortable.addAnimationState({
            target: multiDragElement,
            rect: folding ? getRect(multiDragElement) : dragRect
          });
          unsetRect(multiDragElement);
          multiDragElement.fromRect = dragRect;
          fromSortable.removeAnimationState(multiDragElement);
        });
        folding = false;
        insertMultiDragElements(!this.options.removeCloneOnHide, rootEl);
      }
    },
    dragOverCompleted: function dragOverCompleted(_ref10) {
      var sortable = _ref10.sortable,
          isOwner = _ref10.isOwner,
          insertion = _ref10.insertion,
          activeSortable = _ref10.activeSortable,
          parentEl = _ref10.parentEl,
          putSortable = _ref10.putSortable;
      var options = this.options;

      if (insertion) {
        // Clones must be hidden before folding animation to capture dragRectAbsolute properly
        if (isOwner) {
          activeSortable._hideClone();
        }

        initialFolding = false; // If leaving sort:false root, or already folding - Fold to new location

        if (options.animation && multiDragElements.length > 1 && (folding || !isOwner && !activeSortable.options.sort && !putSortable)) {
          // Fold: Set all multi drag elements's rects to dragEl's rect when multi-drag elements are invisible
          var dragRectAbsolute = getRect(dragEl$1, false, true, true);
          multiDragElements.forEach(function (multiDragElement) {
            if (multiDragElement === dragEl$1) return;
            setRect(multiDragElement, dragRectAbsolute); // Move element(s) to end of parentEl so that it does not interfere with multi-drag clones insertion if they are inserted
            // while folding, and so that we can capture them again because old sortable will no longer be fromSortable

            parentEl.appendChild(multiDragElement);
          });
          folding = true;
        } // Clones must be shown (and check to remove multi drags) after folding when interfering multiDragElements are moved out


        if (!isOwner) {
          // Only remove if not folding (folding will remove them anyways)
          if (!folding) {
            removeMultiDragElements();
          }

          if (multiDragElements.length > 1) {
            var clonesHiddenBefore = clonesHidden;

            activeSortable._showClone(sortable); // Unfold animation for clones if showing from hidden


            if (activeSortable.options.animation && !clonesHidden && clonesHiddenBefore) {
              multiDragClones.forEach(function (clone) {
                activeSortable.addAnimationState({
                  target: clone,
                  rect: clonesFromRect
                });
                clone.fromRect = clonesFromRect;
                clone.thisAnimationDuration = null;
              });
            }
          } else {
            activeSortable._showClone(sortable);
          }
        }
      }
    },
    dragOverAnimationCapture: function dragOverAnimationCapture(_ref11) {
      var dragRect = _ref11.dragRect,
          isOwner = _ref11.isOwner,
          activeSortable = _ref11.activeSortable;
      multiDragElements.forEach(function (multiDragElement) {
        multiDragElement.thisAnimationDuration = null;
      });

      if (activeSortable.options.animation && !isOwner && activeSortable.multiDrag.isMultiDrag) {
        clonesFromRect = _extends({}, dragRect);
        var dragMatrix = matrix(dragEl$1, true);
        clonesFromRect.top -= dragMatrix.f;
        clonesFromRect.left -= dragMatrix.e;
      }
    },
    dragOverAnimationComplete: function dragOverAnimationComplete() {
      if (folding) {
        folding = false;
        removeMultiDragElements();
      }
    },
    drop: function drop(_ref12) {
      var evt = _ref12.originalEvent,
          rootEl = _ref12.rootEl,
          parentEl = _ref12.parentEl,
          sortable = _ref12.sortable,
          dispatchSortableEvent = _ref12.dispatchSortableEvent,
          oldIndex = _ref12.oldIndex,
          putSortable = _ref12.putSortable;
      var toSortable = putSortable || this.sortable;
      if (!evt) return;
      var options = this.options,
          children = parentEl.children; // Multi-drag selection

      if (!dragStarted) {
        if (options.multiDragKey && !this.multiDragKeyDown) {
          this._deselectMultiDrag();
        }

        toggleClass(dragEl$1, options.selectedClass, !~multiDragElements.indexOf(dragEl$1));

        if (!~multiDragElements.indexOf(dragEl$1)) {
          multiDragElements.push(dragEl$1);
          dispatchEvent({
            sortable: sortable,
            rootEl: rootEl,
            name: 'select',
            targetEl: dragEl$1,
            originalEvt: evt
          }); // Modifier activated, select from last to dragEl

          if (evt.shiftKey && lastMultiDragSelect && sortable.el.contains(lastMultiDragSelect)) {
            var lastIndex = index(lastMultiDragSelect),
                currentIndex = index(dragEl$1);

            if (~lastIndex && ~currentIndex && lastIndex !== currentIndex) {
              // Must include lastMultiDragSelect (select it), in case modified selection from no selection
              // (but previous selection existed)
              var n, i;

              if (currentIndex > lastIndex) {
                i = lastIndex;
                n = currentIndex;
              } else {
                i = currentIndex;
                n = lastIndex + 1;
              }

              for (; i < n; i++) {
                if (~multiDragElements.indexOf(children[i])) continue;
                toggleClass(children[i], options.selectedClass, true);
                multiDragElements.push(children[i]);
                dispatchEvent({
                  sortable: sortable,
                  rootEl: rootEl,
                  name: 'select',
                  targetEl: children[i],
                  originalEvt: evt
                });
              }
            }
          } else {
            lastMultiDragSelect = dragEl$1;
          }

          multiDragSortable = toSortable;
        } else {
          multiDragElements.splice(multiDragElements.indexOf(dragEl$1), 1);
          lastMultiDragSelect = null;
          dispatchEvent({
            sortable: sortable,
            rootEl: rootEl,
            name: 'deselect',
            targetEl: dragEl$1,
            originalEvt: evt
          });
        }
      } // Multi-drag drop


      if (dragStarted && this.isMultiDrag) {
        // Do not "unfold" after around dragEl if reverted
        if ((parentEl[expando].options.sort || parentEl !== rootEl) && multiDragElements.length > 1) {
          var dragRect = getRect(dragEl$1),
              multiDragIndex = index(dragEl$1, ':not(.' + this.options.selectedClass + ')');
          if (!initialFolding && options.animation) dragEl$1.thisAnimationDuration = null;
          toSortable.captureAnimationState();

          if (!initialFolding) {
            if (options.animation) {
              dragEl$1.fromRect = dragRect;
              multiDragElements.forEach(function (multiDragElement) {
                multiDragElement.thisAnimationDuration = null;

                if (multiDragElement !== dragEl$1) {
                  var rect = folding ? getRect(multiDragElement) : dragRect;
                  multiDragElement.fromRect = rect; // Prepare unfold animation

                  toSortable.addAnimationState({
                    target: multiDragElement,
                    rect: rect
                  });
                }
              });
            } // Multi drag elements are not necessarily removed from the DOM on drop, so to reinsert
            // properly they must all be removed


            removeMultiDragElements();
            multiDragElements.forEach(function (multiDragElement) {
              if (children[multiDragIndex]) {
                parentEl.insertBefore(multiDragElement, children[multiDragIndex]);
              } else {
                parentEl.appendChild(multiDragElement);
              }

              multiDragIndex++;
            }); // If initial folding is done, the elements may have changed position because they are now
            // unfolding around dragEl, even though dragEl may not have his index changed, so update event
            // must be fired here as Sortable will not.

            if (oldIndex === index(dragEl$1)) {
              var update = false;
              multiDragElements.forEach(function (multiDragElement) {
                if (multiDragElement.sortableIndex !== index(multiDragElement)) {
                  update = true;
                  return;
                }
              });

              if (update) {
                dispatchSortableEvent('update');
              }
            }
          } // Must be done after capturing individual rects (scroll bar)


          multiDragElements.forEach(function (multiDragElement) {
            unsetRect(multiDragElement);
          });
          toSortable.animateAll();
        }

        multiDragSortable = toSortable;
      } // Remove clones if necessary


      if (rootEl === parentEl || putSortable && putSortable.lastPutMode !== 'clone') {
        multiDragClones.forEach(function (clone) {
          clone.parentNode && clone.parentNode.removeChild(clone);
        });
      }
    },
    nullingGlobal: function nullingGlobal() {
      this.isMultiDrag = dragStarted = false;
      multiDragClones.length = 0;
    },
    destroyGlobal: function destroyGlobal() {
      this._deselectMultiDrag();

      off(document, 'pointerup', this._deselectMultiDrag);
      off(document, 'mouseup', this._deselectMultiDrag);
      off(document, 'touchend', this._deselectMultiDrag);
      off(document, 'keydown', this._checkKeyDown);
      off(document, 'keyup', this._checkKeyUp);
    },
    _deselectMultiDrag: function _deselectMultiDrag(evt) {
      if (typeof dragStarted !== "undefined" && dragStarted) return; // Only deselect if selection is in this sortable

      if (multiDragSortable !== this.sortable) return; // Only deselect if target is not item in this sortable

      if (evt && closest(evt.target, this.options.draggable, this.sortable.el, false)) return; // Only deselect if left click

      if (evt && evt.button !== 0) return;

      while (multiDragElements.length) {
        var el = multiDragElements[0];
        toggleClass(el, this.options.selectedClass, false);
        multiDragElements.shift();
        dispatchEvent({
          sortable: this.sortable,
          rootEl: this.sortable.el,
          name: 'deselect',
          targetEl: el,
          originalEvt: evt
        });
      }
    },
    _checkKeyDown: function _checkKeyDown(evt) {
      if (evt.key === this.options.multiDragKey) {
        this.multiDragKeyDown = true;
      }
    },
    _checkKeyUp: function _checkKeyUp(evt) {
      if (evt.key === this.options.multiDragKey) {
        this.multiDragKeyDown = false;
      }
    }
  };
  return _extends(MultiDrag, {
    // Static methods & properties
    pluginName: 'multiDrag',
    utils: {
      /**
       * Selects the provided multi-drag item
       * @param  {HTMLElement} el    The element to be selected
       */
      select: function select(el) {
        var sortable = el.parentNode[expando];
        if (!sortable || !sortable.options.multiDrag || ~multiDragElements.indexOf(el)) return;

        if (multiDragSortable && multiDragSortable !== sortable) {
          multiDragSortable.multiDrag._deselectMultiDrag();

          multiDragSortable = sortable;
        }

        toggleClass(el, sortable.options.selectedClass, true);
        multiDragElements.push(el);
      },

      /**
       * Deselects the provided multi-drag item
       * @param  {HTMLElement} el    The element to be deselected
       */
      deselect: function deselect(el) {
        var sortable = el.parentNode[expando],
            index = multiDragElements.indexOf(el);
        if (!sortable || !sortable.options.multiDrag || !~index) return;
        toggleClass(el, sortable.options.selectedClass, false);
        multiDragElements.splice(index, 1);
      }
    },
    eventProperties: function eventProperties() {
      var _this3 = this;

      var oldIndicies = [],
          newIndicies = [];
      multiDragElements.forEach(function (multiDragElement) {
        oldIndicies.push({
          multiDragElement: multiDragElement,
          index: multiDragElement.sortableIndex
        }); // multiDragElements will already be sorted if folding

        var newIndex;

        if (folding && multiDragElement !== dragEl$1) {
          newIndex = -1;
        } else if (folding) {
          newIndex = index(multiDragElement, ':not(.' + _this3.options.selectedClass + ')');
        } else {
          newIndex = index(multiDragElement);
        }

        newIndicies.push({
          multiDragElement: multiDragElement,
          index: newIndex
        });
      });
      return {
        items: _toConsumableArray(multiDragElements),
        clones: [].concat(multiDragClones),
        oldIndicies: oldIndicies,
        newIndicies: newIndicies
      };
    },
    optionListeners: {
      multiDragKey: function multiDragKey(key) {
        key = key.toLowerCase();

        if (key === 'ctrl') {
          key = 'Control';
        } else if (key.length > 1) {
          key = key.charAt(0).toUpperCase() + key.substr(1);
        }

        return key;
      }
    }
  });
}

function insertMultiDragElements(clonesInserted, rootEl) {
  multiDragElements.forEach(function (multiDragElement, i) {
    var target = rootEl.children[multiDragElement.sortableIndex + (clonesInserted ? Number(i) : 0)];

    if (target) {
      rootEl.insertBefore(multiDragElement, target);
    } else {
      rootEl.appendChild(multiDragElement);
    }
  });
}
/**
 * Insert multi-drag clones
 * @param  {[Boolean]} elementsInserted  Whether the multi-drag elements are inserted
 * @param  {HTMLElement} rootEl
 */


function insertMultiDragClones(elementsInserted, rootEl) {
  multiDragClones.forEach(function (clone, i) {
    var target = rootEl.children[clone.sortableIndex + (elementsInserted ? Number(i) : 0)];

    if (target) {
      rootEl.insertBefore(clone, target);
    } else {
      rootEl.appendChild(clone);
    }
  });
}

function removeMultiDragElements() {
  multiDragElements.forEach(function (multiDragElement) {
    if (multiDragElement === dragEl$1) return;
    multiDragElement.parentNode && multiDragElement.parentNode.removeChild(multiDragElement);
  });
}

Sortable.mount(new AutoScrollPlugin());
Sortable.mount(Remove, Revert);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Sortable);



/***/ })

}]);