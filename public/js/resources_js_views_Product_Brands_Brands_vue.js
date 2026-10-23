"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_views_Product_Brands_Brands_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Product/Brands/Brands.vue?vue&type=script&lang=js":
/*!**********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Product/Brands/Brands.vue?vue&type=script&lang=js ***!
  \**********************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var vuejs_datatable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vuejs-datatable */ "./node_modules/vuejs-datatable/dist/vuejs-datatable.esm.js");
/* harmony import */ var _Edit_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Edit.vue */ "./resources/js/views/Product/Brands/Edit.vue");
/* harmony import */ var _mixins_ViewModeMixin__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../mixins/ViewModeMixin */ "./resources/js/mixins/ViewModeMixin.js");
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




/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  mixins: [_mixins_ViewModeMixin__WEBPACK_IMPORTED_MODULE_2__["default"]],
  components: {
    VuejsDatatableFactory: vuejs_datatable__WEBPACK_IMPORTED_MODULE_0__.VuejsDatatableFactory,
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
        key: 'image',
        label: __('image'),
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
      // API returns one page (page/per_page): grid shows the array as is
      serverPagination: true,
      filterOn: ['id', 'name', 'status'],
      isLoading: false,
      brands: [],
      edit_record: null,
      currentLanguageId: null,
      activeLanguages: [],
      globalSettings: {
        brand_background_color_mode: 'global',
        brand_background_color_light_theme: '',
        brand_background_color_dark_theme: ''
      },
      isSavingGlobal: false
    };
  },
  computed: {
    translatedBrands: function translatedBrands() {
      var _this = this;
      if (!this.currentLanguageId || this.brands.length === 0) {
        return this.brands;
      }
      return this.brands.map(function (brand) {
        var translatedBrand = _objectSpread({}, brand);
        if (brand.translations && Array.isArray(brand.translations)) {
          var translation = brand.translations.find(function (t) {
            return Number(t.language_id) === Number(_this.currentLanguageId);
          });
          if (translation && translation.name && translation.name.trim() !== '') {
            translatedBrand.name = translation.name;
          }
        }
        return translatedBrand;
      });
    }
  },
  created: function created() {
    var _this2 = this;
    this.fetchGlobalColors();
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
    fetchGlobalColors: function fetchGlobalColors() {
      var _this3 = this;
      axios.get(this.$apiUrl + '/web_settings').then(function (response) {
        var settings = response.data.data.settingsObject;
        _this3.globalSettings.brand_background_color_mode = settings.brand_background_color_mode || 'global';
        _this3.globalSettings.brand_background_color_light_theme = settings.brand_background_color_light_theme || '';
        _this3.globalSettings.brand_background_color_dark_theme = settings.brand_background_color_dark_theme || '';
      });
    },
    saveGlobalColors: function saveGlobalColors() {
      var _this4 = this;
      this.isSavingGlobal = true;
      var formData = new FormData();
      formData.append('brand_background_color_mode', this.globalSettings.brand_background_color_mode || 'global');
      formData.append('brand_background_color_light_theme', this.globalSettings.brand_background_color_light_theme || '');
      formData.append('brand_background_color_dark_theme', this.globalSettings.brand_background_color_dark_theme || '');
      axios.post(this.$apiUrl + '/web_settings/save', formData).then(function (res) {
        if (res.data.status === 1) {
          _this4.showMessage("success", __('background_colors_saved_successfully') || 'Background Colors Saved Successfully.');
        } else {
          _this4.showError(res.data.message);
        }
      })["catch"](function (error) {
        _this4.showError(__('something_went_wrong'));
      })["finally"](function () {
        _this4.isSavingGlobal = false;
      });
    },
    fetchActiveLanguages: function fetchActiveLanguages() {
      var _this5 = this;
      console.log("data fetch");
      return axios.get(this.$apiUrl + '/active_languages').then(function (response) {
        _this5.activeLanguages = response.data.data || [];
        var appLocale = window.appLocale || 'en';
        var currentLanguage = _this5.activeLanguages.find(function (lang) {
          return lang.code === appLocale;
        });
        if (currentLanguage) {
          _this5.currentLanguageId = currentLanguage.id;
        } else {
          var defaultLang = _this5.activeLanguages.find(function (l) {
            return l.is_default === 1;
          });
          if (defaultLang) {
            _this5.currentLanguageId = defaultLang.id;
          }
        }
        console.log('Languages:', _this5.activeLanguages);
        console.log('Current language ID:', _this5.currentLanguageId);
      });
    },
    getRecords: function getRecords() {
      var _this6 = this;
      this.isLoading = true;
      axios.get(this.$apiUrl + '/products/brands', {
        params: {
          page: this.currentPage,
          per_page: this.perPage,
          filter: this.filter
        }
      }).then(function (response) {
        _this6.isLoading = false;
        var data = response.data;
        _this6.brands = data.data;
        _this6.totalRows = data.total;
      })["catch"](function () {
        _this6.isLoading = false;
      });
    },
    onBrandSaved: function onBrandSaved(message) {
      this.showMessage('success', message);
      this.getRecords();
      this.edit_record = null;
    },
    deleteRecord: function deleteRecord(index, id) {
      var _this7 = this;
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
          _this7.isLoading = true;
          axios.post(_this7.$apiUrl + '/products/brands/delete', {
            id: id
          }).then(function (response) {
            _this7.isLoading = false;
            _this7.brands.splice(index, 1);
            _this7.showMessage('success', response.data.message);
          })["catch"](function () {
            _this7.isLoading = false;
          });
        }
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Product/Brands/Edit.vue?vue&type=script&lang=js":
/*!********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Product/Brands/Edit.vue?vue&type=script&lang=js ***!
  \********************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _mixins_TranslationHelper_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../mixins/TranslationHelper.js */ "./resources/js/mixins/TranslationHelper.js");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
  props: ['record', 'globalColors'],
  data: function data() {
    return {
      id: null,
      status: 1,
      languages: [],
      defaultLanguageId: null,
      activeTab: 0,
      form: {},
      image: "",
      image_url: "",
      background_color_for_light_theme: null,
      background_color_for_dark_theme: null,
      error: null,
      isLoading: false,
      tabsKey: 0,
      // Translate buttons
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
          // Only load brand data if languages are already loaded
          if (this.languages.length > 0) {
            this.loadBrandWithTranslations();
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
      return this.id ? __('edit_brand') : __('add_brand');
    }
  },
  methods: {
    resetForm: function resetForm() {
      var _this$globalColors,
        _this$globalColors2,
        _this = this;
      this.form = {};
      this.image = "";
      this.image_url = "";
      this.background_color_for_light_theme = ((_this$globalColors = this.globalColors) === null || _this$globalColors === void 0 ? void 0 : _this$globalColors.brand_background_color_light_theme) || null;
      this.background_color_for_dark_theme = ((_this$globalColors2 = this.globalColors) === null || _this$globalColors2 === void 0 ? void 0 : _this$globalColors2.brand_background_color_dark_theme) || null;
      this.status = 1;
      this.activeTab = 0;

      // re-init empty translations
      this.languages.forEach(function (lang) {
        _this.$set(_this.form, lang.id, {
          name: ''
        });
      });
    },
    showModal: function showModal() {
      this.$refs['my-modal'].show();
    },
    hideModal: function hideModal() {
      this.$refs['my-modal'].hide();
    },
    dropFile: function dropFile(event) {
      event.preventDefault();
      this.$refs.file_image.files = event.dataTransfer.files;
      this.setImageFile(event.dataTransfer.files[0]);
    },
    handleFileUpload: function handleFileUpload(e) {
      this.setImageFile(e.target.files[0]);
    },
    setImageFile: function setImageFile(file) {
      if (!file) return;
      this.error = null;
      var validTypes = ["image/jpeg", "image/png", "image/jpg", "image/gif", "image/webp"];
      if (!validTypes.includes(file.type)) {
        this.error = __('invalid_image_type');
        return;
      }
      if (file.size > 2 * 1024 * 1024) {
        this.error = __('image_must_be_less_than_2mb');
        return;
      }
      this.image = file;
      this.image_url = URL.createObjectURL(file);
    },
    initializeForm: function initializeForm() {
      var _this2 = this;
      this.languages.forEach(function (lang) {
        if (!_this2.form[lang.id]) {
          _this2.$set(_this2.form, lang.id, {
            name: ''
          });
        }
      });
    },
    loadLanguages: function loadLanguages() {
      var _this3 = this;
      return axios__WEBPACK_IMPORTED_MODULE_1___default().get(this.$apiUrl + '/active_languages').then(function (res) {
        _this3.languages = res.data.data;
        var defaultLang = _this3.languages.find(function (l) {
          return l.is_default;
        });
        _this3.defaultLanguageId = (defaultLang === null || defaultLang === void 0 ? void 0 : defaultLang.id) || null;

        // Initialize form for all languages
        _this3.initializeForm();

        // Load brand data if id exists (after languages are loaded)
        if (_this3.id) {
          return _this3.loadBrandWithTranslations();
        }
      });
    },
    loadBrandWithTranslations: function loadBrandWithTranslations() {
      var _this4 = this;
      if (!this.id) return;

      // Ensure languages are loaded first - if not, wait for them
      if (!this.languages.length) {
        return this.loadLanguages();
      }
      return axios__WEBPACK_IMPORTED_MODULE_1___default().get(this.$apiUrl + '/products/brands', {
        params: {
          id: this.id
        }
      }).then(function (res) {
        var _this4$globalColors, _this4$globalColors2;
        var brand = Array.isArray(res.data.data) ? res.data.data[0] : res.data.data;
        if (!brand) {
          console.error('Brand not found');
          return;
        }
        _this4.status = brand.status;
        _this4.image_url = brand.image_url || "";
        _this4.background_color_for_light_theme = brand.background_color_for_light_theme || ((_this4$globalColors = _this4.globalColors) === null || _this4$globalColors === void 0 ? void 0 : _this4$globalColors.brand_background_color_light_theme) || null;
        _this4.background_color_for_dark_theme = brand.background_color_for_dark_theme || ((_this4$globalColors2 = _this4.globalColors) === null || _this4$globalColors2 === void 0 ? void 0 : _this4$globalColors2.brand_background_color_dark_theme) || null;

        // Ensure all languages are initialized first
        _this4.initializeForm();

        // Process translations with fallback logic
        _this4.languages.forEach(function (lang) {
          var translation = Array.isArray(brand.translations) ? brand.translations.find(function (t) {
            return t.language_id === lang.id;
          }) : null;
          if (lang.is_default) {
            // For default language, use translation if exists, otherwise fallback to main table data
            _this4.$set(_this4.form, lang.id, {
              name: translation && translation.name && translation.name.trim() !== '' ? translation.name : brand.name || ''
            });
          } else {
            // For other languages, use translation if exists, otherwise empty
            _this4.$set(_this4.form, lang.id, {
              name: translation && translation.name ? translation.name : ''
            });
          }
        });
        _this4.tabsKey++;
      });
    },
    validateDefaultLanguage: function validateDefaultLanguage() {
      if (!this.defaultLanguageId) {
        this.showError(__('default_language_not_found'));
        return false;
      }
      var defaultForm = this.form[this.defaultLanguageId];

      // Check required fields for default language
      if (!defaultForm.name || defaultForm.name.trim() === '') {
        this.showError(__('please_fill_name_in_default_language') || __('please_fill_name_in_default_language'));
        this.switchToDefaultLanguageTab();
        return false;
      }

      // Check image for new brands
      if (!this.id && !this.image && !this.image_url) {
        this.showError(__('please_upload_brand_image') || __('please_upload_image'));
        this.switchToDefaultLanguageTab();
        return false;
      }
      return true;
    },
    validateDefaultLanguageForTranslation: function validateDefaultLanguageForTranslation() {
      var _this5 = this;
      var form = this.$refs['my-form'];
      if (form && !form.reportValidity()) {
        this.$nextTick(function () {
          return _this5.switchToDefaultLanguageTab();
        });
        return false;
      }
      return this.validateDefaultLanguage();
    },
    switchToDefaultLanguageTab: function switchToDefaultLanguageTab() {
      var _this6 = this;
      var defaultLangIndex = this.languages.findIndex(function (lang) {
        return lang.id === _this6.defaultLanguageId;
      });
      if (defaultLangIndex !== -1) {
        this.showError(__('please_fill_default_language_required_fields'));
        this.activeTab = defaultLangIndex;
      }
    },
    saveRecord: function saveRecord() {
      var _this7 = this;
      if (!this.validateDefaultLanguage()) return;
      var isUpdate = !!this.id; // check before saving
      this.isLoading = true;
      var languagesToSave = [];
      var defaultLang = this.languages.find(function (l) {
        return l.is_default;
      });
      if (defaultLang) languagesToSave.push(defaultLang);
      this.languages.forEach(function (lang) {
        if (lang.is_default) return;
        var name = _this7.form[lang.id].name;
        if (name && name.trim() !== '') languagesToSave.push(lang);
      });
      var saveSequentially = /*#__PURE__*/function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee() {
          var brandId, _i, _languagesToSave, _res$data$data, lang, fd, url, res;
          return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  brandId = _this7.id;
                  _i = 0, _languagesToSave = languagesToSave;
                case 2:
                  if (!(_i < _languagesToSave.length)) {
                    _context.next = 20;
                    break;
                  }
                  lang = _languagesToSave[_i];
                  fd = new FormData();
                  if (brandId) fd.append('id', brandId);
                  fd.append('language_id', lang.id);
                  fd.append('name', _this7.form[lang.id].name);
                  fd.append('status', _this7.status);
                  if (_this7.background_color_for_light_theme) fd.append('background_color_for_light_theme', _this7.background_color_for_light_theme);
                  if (_this7.background_color_for_dark_theme) fd.append('background_color_for_dark_theme', _this7.background_color_for_dark_theme);
                  if (lang.is_default && _this7.image) fd.append('image', _this7.image);
                  url = brandId ? _this7.$apiUrl + '/products/brands/update' : _this7.$apiUrl + '/products/brands/save';
                  _context.next = 15;
                  return axios__WEBPACK_IMPORTED_MODULE_1___default().post(url, fd);
                case 15:
                  res = _context.sent;
                  if (!brandId && (_res$data$data = res.data.data) !== null && _res$data$data !== void 0 && _res$data$data.id) brandId = res.data.data.id;
                case 17:
                  _i++;
                  _context.next = 2;
                  break;
                case 20:
                  return _context.abrupt("return", brandId);
                case 21:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee);
        }));
        return function saveSequentially() {
          return _ref.apply(this, arguments);
        };
      }();
      saveSequentially().then( /*#__PURE__*/function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee2(brandId) {
          var message;
          return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  message = isUpdate ? __('brand_updated_successfully') : __('brand_saved_successfully');
                  _this7.$emit('saved', message);
                  _this7.id = brandId;
                  _context2.next = 5;
                  return _this7.loadBrandWithTranslations();
                case 5:
                  _this7.tabsKey++;
                  _this7.hideModal();
                case 7:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2);
        }));
        return function (_x) {
          return _ref2.apply(this, arguments);
        };
      }())["finally"](function () {
        return _this7.isLoading = false;
      });
    }
  },
  mounted: function mounted() {
    this.loadLanguages();
    this.resetForm(); // here change 2 
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

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Product/Brands/Brands.vue?vue&type=style&index=0&id=b9b69180&scoped=true&lang=css":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Product/Brands/Brands.vue?vue&type=style&index=0&id=b9b69180&scoped=true&lang=css ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
___CSS_LOADER_EXPORT___.push([module.id, "\n.bg-colors-card .form-check-inline[data-v-b9b69180] {\n    margin-right: 16px;\n}\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Product/Brands/Edit.vue?vue&type=style&index=0&id=64f39104&scoped=true&lang=css":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Product/Brands/Edit.vue?vue&type=style&index=0&id=64f39104&scoped=true&lang=css ***!
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
___CSS_LOADER_EXPORT___.push([module.id, "\n.image_preview[data-v-64f39104] {\n  margin-top: 5px;\n}\n.color-field[data-v-64f39104] {\n  gap: 8px;\n  align-items: center;\n}\n.color-field .color-swatch[data-v-64f39104] {\n  flex: 0 0 56px;\n  max-width: 56px;\n  padding: 4px;\n}\n.color-field .btn[data-v-64f39104] {\n  white-space: nowrap;\n}\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Product/Brands/Brands.vue?vue&type=style&index=0&id=b9b69180&scoped=true&lang=css":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Product/Brands/Brands.vue?vue&type=style&index=0&id=b9b69180&scoped=true&lang=css ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Brands_vue_vue_type_style_index_0_id_b9b69180_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Brands.vue?vue&type=style&index=0&id=b9b69180&scoped=true&lang=css */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Product/Brands/Brands.vue?vue&type=style&index=0&id=b9b69180&scoped=true&lang=css");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Brands_vue_vue_type_style_index_0_id_b9b69180_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Brands_vue_vue_type_style_index_0_id_b9b69180_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Product/Brands/Edit.vue?vue&type=style&index=0&id=64f39104&scoped=true&lang=css":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Product/Brands/Edit.vue?vue&type=style&index=0&id=64f39104&scoped=true&lang=css ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Edit_vue_vue_type_style_index_0_id_64f39104_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Edit.vue?vue&type=style&index=0&id=64f39104&scoped=true&lang=css */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Product/Brands/Edit.vue?vue&type=style&index=0&id=64f39104&scoped=true&lang=css");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Edit_vue_vue_type_style_index_0_id_64f39104_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Edit_vue_vue_type_style_index_0_id_64f39104_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./resources/js/views/Product/Brands/Brands.vue":
/*!******************************************************!*\
  !*** ./resources/js/views/Product/Brands/Brands.vue ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Brands_vue_vue_type_template_id_b9b69180_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Brands.vue?vue&type=template&id=b9b69180&scoped=true */ "./resources/js/views/Product/Brands/Brands.vue?vue&type=template&id=b9b69180&scoped=true");
/* harmony import */ var _Brands_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Brands.vue?vue&type=script&lang=js */ "./resources/js/views/Product/Brands/Brands.vue?vue&type=script&lang=js");
/* harmony import */ var _Brands_vue_vue_type_style_index_0_id_b9b69180_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Brands.vue?vue&type=style&index=0&id=b9b69180&scoped=true&lang=css */ "./resources/js/views/Product/Brands/Brands.vue?vue&type=style&index=0&id=b9b69180&scoped=true&lang=css");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _Brands_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _Brands_vue_vue_type_template_id_b9b69180_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render,
  _Brands_vue_vue_type_template_id_b9b69180_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "b9b69180",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/Product/Brands/Brands.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/views/Product/Brands/Edit.vue":
/*!****************************************************!*\
  !*** ./resources/js/views/Product/Brands/Edit.vue ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Edit_vue_vue_type_template_id_64f39104_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Edit.vue?vue&type=template&id=64f39104&scoped=true */ "./resources/js/views/Product/Brands/Edit.vue?vue&type=template&id=64f39104&scoped=true");
/* harmony import */ var _Edit_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Edit.vue?vue&type=script&lang=js */ "./resources/js/views/Product/Brands/Edit.vue?vue&type=script&lang=js");
/* harmony import */ var _Edit_vue_vue_type_style_index_0_id_64f39104_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Edit.vue?vue&type=style&index=0&id=64f39104&scoped=true&lang=css */ "./resources/js/views/Product/Brands/Edit.vue?vue&type=style&index=0&id=64f39104&scoped=true&lang=css");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _Edit_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _Edit_vue_vue_type_template_id_64f39104_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render,
  _Edit_vue_vue_type_template_id_64f39104_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "64f39104",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/Product/Brands/Edit.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/views/Product/Brands/Brands.vue?vue&type=script&lang=js":
/*!******************************************************************************!*\
  !*** ./resources/js/views/Product/Brands/Brands.vue?vue&type=script&lang=js ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Brands_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Brands.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Product/Brands/Brands.vue?vue&type=script&lang=js");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Brands_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/Product/Brands/Edit.vue?vue&type=script&lang=js":
/*!****************************************************************************!*\
  !*** ./resources/js/views/Product/Brands/Edit.vue?vue&type=script&lang=js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Edit_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Edit.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Product/Brands/Edit.vue?vue&type=script&lang=js");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Edit_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/Product/Brands/Brands.vue?vue&type=style&index=0&id=b9b69180&scoped=true&lang=css":
/*!**************************************************************************************************************!*\
  !*** ./resources/js/views/Product/Brands/Brands.vue?vue&type=style&index=0&id=b9b69180&scoped=true&lang=css ***!
  \**************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Brands_vue_vue_type_style_index_0_id_b9b69180_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/style-loader/dist/cjs.js!../../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Brands.vue?vue&type=style&index=0&id=b9b69180&scoped=true&lang=css */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Product/Brands/Brands.vue?vue&type=style&index=0&id=b9b69180&scoped=true&lang=css");


/***/ }),

/***/ "./resources/js/views/Product/Brands/Edit.vue?vue&type=style&index=0&id=64f39104&scoped=true&lang=css":
/*!************************************************************************************************************!*\
  !*** ./resources/js/views/Product/Brands/Edit.vue?vue&type=style&index=0&id=64f39104&scoped=true&lang=css ***!
  \************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Edit_vue_vue_type_style_index_0_id_64f39104_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/style-loader/dist/cjs.js!../../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Edit.vue?vue&type=style&index=0&id=64f39104&scoped=true&lang=css */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Product/Brands/Edit.vue?vue&type=style&index=0&id=64f39104&scoped=true&lang=css");


/***/ }),

/***/ "./resources/js/views/Product/Brands/Brands.vue?vue&type=template&id=b9b69180&scoped=true":
/*!************************************************************************************************!*\
  !*** ./resources/js/views/Product/Brands/Brands.vue?vue&type=template&id=b9b69180&scoped=true ***!
  \************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Brands_vue_vue_type_template_id_b9b69180_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   staticRenderFns: () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Brands_vue_vue_type_template_id_b9b69180_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Brands_vue_vue_type_template_id_b9b69180_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Brands.vue?vue&type=template&id=b9b69180&scoped=true */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Product/Brands/Brands.vue?vue&type=template&id=b9b69180&scoped=true");


/***/ }),

/***/ "./resources/js/views/Product/Brands/Edit.vue?vue&type=template&id=64f39104&scoped=true":
/*!**********************************************************************************************!*\
  !*** ./resources/js/views/Product/Brands/Edit.vue?vue&type=template&id=64f39104&scoped=true ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Edit_vue_vue_type_template_id_64f39104_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   staticRenderFns: () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Edit_vue_vue_type_template_id_64f39104_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Edit_vue_vue_type_template_id_64f39104_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Edit.vue?vue&type=template&id=64f39104&scoped=true */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Product/Brands/Edit.vue?vue&type=template&id=64f39104&scoped=true");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Product/Brands/Brands.vue?vue&type=template&id=b9b69180&scoped=true":
/*!***************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Product/Brands/Brands.vue?vue&type=template&id=b9b69180&scoped=true ***!
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
                  [_vm._v(_vm._s(_vm.__("brands")))]
                ),
              ]),
            ]),
          ]
        ),
      ]),
      _vm._v(" "),
      _c("section", { staticClass: "section mb-3" }, [
        _c(
          "div",
          { staticClass: "card figma-main-section-card bg-colors-card mb-0" },
          [
            _c(
              "div",
              {
                staticClass:
                  "card-header d-flex justify-content-between align-items-center gap-2",
              },
              [
                _c("h4", { staticClass: "card-title mb-0" }, [
                  _vm._v(
                    _vm._s(
                      _vm.__("items_background_colors") ||
                        "Items Background Colors"
                    )
                  ),
                ]),
                _vm._v(" "),
                _c(
                  "b-button",
                  {
                    attrs: {
                      size: "sm",
                      variant: "primary",
                      disabled: _vm.isSavingGlobal,
                    },
                    on: { click: _vm.saveGlobalColors },
                  },
                  [
                    _vm._v(
                      "\n                    " +
                        _vm._s(_vm.__("save")) +
                        "\n                    "
                    ),
                    _vm.isSavingGlobal
                      ? _c("b-spinner", {
                          staticClass: "ml-1",
                          attrs: { small: "" },
                        })
                      : _vm._e(),
                  ],
                  1
                ),
              ],
              1
            ),
            _vm._v(" "),
            _c("div", { staticClass: "card-body" }, [
              _c(
                "div",
                { staticClass: "row" },
                [
                  _c(
                    "div",
                    { staticClass: "col-lg-4 form-group mb-3 mb-lg-0" },
                    [
                      _c("label", { staticClass: "form-label d-block" }, [
                        _vm._v(
                          _vm._s(
                            _vm.__("items_background_color_mode") ||
                              "Items Background Colour"
                          )
                        ),
                      ]),
                      _vm._v(" "),
                      _c(
                        "div",
                        {
                          staticClass:
                            "form-check form-check-inline d-inline-block",
                        },
                        [
                          _c("input", {
                            directives: [
                              {
                                name: "model",
                                rawName: "v-model",
                                value:
                                  _vm.globalSettings
                                    .brand_background_color_mode,
                                expression:
                                  "globalSettings.brand_background_color_mode",
                              },
                            ],
                            staticClass: "form-check-input",
                            attrs: {
                              type: "radio",
                              id: "colorModeGlobal",
                              value: "global",
                            },
                            domProps: {
                              checked: _vm._q(
                                _vm.globalSettings.brand_background_color_mode,
                                "global"
                              ),
                            },
                            on: {
                              change: function ($event) {
                                return _vm.$set(
                                  _vm.globalSettings,
                                  "brand_background_color_mode",
                                  "global"
                                )
                              },
                            },
                          }),
                          _vm._v(" "),
                          _c(
                            "label",
                            {
                              staticClass: "form-check-label ms-1",
                              attrs: { for: "colorModeGlobal" },
                            },
                            [_vm._v(_vm._s(_vm.__("global") || "Global"))]
                          ),
                        ]
                      ),
                      _vm._v(" "),
                      _c(
                        "div",
                        {
                          staticClass:
                            "form-check form-check-inline d-inline-block ms-3",
                        },
                        [
                          _c("input", {
                            directives: [
                              {
                                name: "model",
                                rawName: "v-model",
                                value:
                                  _vm.globalSettings
                                    .brand_background_color_mode,
                                expression:
                                  "globalSettings.brand_background_color_mode",
                              },
                            ],
                            staticClass: "form-check-input",
                            attrs: {
                              type: "radio",
                              id: "colorModeItemWise",
                              value: "item-wise",
                            },
                            domProps: {
                              checked: _vm._q(
                                _vm.globalSettings.brand_background_color_mode,
                                "item-wise"
                              ),
                            },
                            on: {
                              change: function ($event) {
                                return _vm.$set(
                                  _vm.globalSettings,
                                  "brand_background_color_mode",
                                  "item-wise"
                                )
                              },
                            },
                          }),
                          _vm._v(" "),
                          _c(
                            "label",
                            {
                              staticClass: "form-check-label ms-1",
                              attrs: { for: "colorModeItemWise" },
                            },
                            [_vm._v(_vm._s(_vm.__("item_wise") || "Item Wise"))]
                          ),
                        ]
                      ),
                    ]
                  ),
                  _vm._v(" "),
                  _vm.globalSettings.brand_background_color_mode === "global"
                    ? [
                        _c(
                          "div",
                          {
                            staticClass:
                              "col-md-6 col-lg-4 form-group mb-3 mb-lg-0",
                          },
                          [
                            _c("label", [
                              _vm._v(
                                _vm._s(
                                  _vm.__("brand_light_theme_background") ||
                                    "Brand Light Theme Background"
                                )
                              ),
                            ]),
                            _vm._v(" "),
                            _c(
                              "div",
                              { staticClass: "color-field d-flex w-100 mt-1" },
                              [
                                _c("input", {
                                  directives: [
                                    {
                                      name: "model",
                                      rawName: "v-model",
                                      value:
                                        _vm.globalSettings
                                          .brand_background_color_light_theme,
                                      expression:
                                        "globalSettings.brand_background_color_light_theme",
                                    },
                                  ],
                                  staticClass: "form-control",
                                  attrs: { type: "text" },
                                  domProps: {
                                    value:
                                      _vm.globalSettings
                                        .brand_background_color_light_theme,
                                  },
                                  on: {
                                    input: function ($event) {
                                      if ($event.target.composing) {
                                        return
                                      }
                                      _vm.$set(
                                        _vm.globalSettings,
                                        "brand_background_color_light_theme",
                                        $event.target.value
                                      )
                                    },
                                  },
                                }),
                                _vm._v(" "),
                                _c("input", {
                                  staticClass:
                                    "form-control cursor-pointer color-swatch",
                                  attrs: { type: "color" },
                                  domProps: {
                                    value:
                                      _vm.globalSettings
                                        .brand_background_color_light_theme &&
                                      _vm.globalSettings.brand_background_color_light_theme.startsWith(
                                        "#"
                                      ) &&
                                      (_vm.globalSettings
                                        .brand_background_color_light_theme
                                        .length === 4 ||
                                        _vm.globalSettings
                                          .brand_background_color_light_theme
                                          .length === 7 ||
                                        _vm.globalSettings
                                          .brand_background_color_light_theme
                                          .length === 9)
                                        ? _vm.globalSettings.brand_background_color_light_theme.substring(
                                            0,
                                            7
                                          )
                                        : "#ffffff",
                                  },
                                  on: {
                                    input: function ($event) {
                                      _vm.globalSettings.brand_background_color_light_theme =
                                        $event.target.value
                                    },
                                  },
                                }),
                                _vm._v(" "),
                                _c(
                                  "b-button",
                                  {
                                    attrs: {
                                      size: "sm",
                                      variant: "outline-secondary",
                                    },
                                    on: {
                                      click: function ($event) {
                                        _vm.globalSettings.brand_background_color_light_theme =
                                          "#ffffff00"
                                      },
                                    },
                                  },
                                  [
                                    _vm._v(
                                      "\n                                " +
                                        _vm._s(
                                          _vm.__("transparent") || "Transparent"
                                        ) +
                                        "\n                            "
                                    ),
                                  ]
                                ),
                              ],
                              1
                            ),
                          ]
                        ),
                        _vm._v(" "),
                        _c(
                          "div",
                          { staticClass: "col-md-6 col-lg-4 form-group mb-0" },
                          [
                            _c("label", [
                              _vm._v(
                                _vm._s(
                                  _vm.__("brand_dark_theme_background") ||
                                    "Brand Dark Theme Background"
                                )
                              ),
                            ]),
                            _vm._v(" "),
                            _c(
                              "div",
                              { staticClass: "color-field d-flex w-100 mt-1" },
                              [
                                _c("input", {
                                  directives: [
                                    {
                                      name: "model",
                                      rawName: "v-model",
                                      value:
                                        _vm.globalSettings
                                          .brand_background_color_dark_theme,
                                      expression:
                                        "globalSettings.brand_background_color_dark_theme",
                                    },
                                  ],
                                  staticClass: "form-control",
                                  attrs: { type: "text" },
                                  domProps: {
                                    value:
                                      _vm.globalSettings
                                        .brand_background_color_dark_theme,
                                  },
                                  on: {
                                    input: function ($event) {
                                      if ($event.target.composing) {
                                        return
                                      }
                                      _vm.$set(
                                        _vm.globalSettings,
                                        "brand_background_color_dark_theme",
                                        $event.target.value
                                      )
                                    },
                                  },
                                }),
                                _vm._v(" "),
                                _c("input", {
                                  staticClass:
                                    "form-control cursor-pointer color-swatch",
                                  attrs: { type: "color" },
                                  domProps: {
                                    value:
                                      _vm.globalSettings
                                        .brand_background_color_dark_theme &&
                                      _vm.globalSettings.brand_background_color_dark_theme.startsWith(
                                        "#"
                                      ) &&
                                      (_vm.globalSettings
                                        .brand_background_color_dark_theme
                                        .length === 4 ||
                                        _vm.globalSettings
                                          .brand_background_color_dark_theme
                                          .length === 7 ||
                                        _vm.globalSettings
                                          .brand_background_color_dark_theme
                                          .length === 9)
                                        ? _vm.globalSettings.brand_background_color_dark_theme.substring(
                                            0,
                                            7
                                          )
                                        : "#000000",
                                  },
                                  on: {
                                    input: function ($event) {
                                      _vm.globalSettings.brand_background_color_dark_theme =
                                        $event.target.value
                                    },
                                  },
                                }),
                                _vm._v(" "),
                                _c(
                                  "b-button",
                                  {
                                    attrs: {
                                      size: "sm",
                                      variant: "outline-secondary",
                                    },
                                    on: {
                                      click: function ($event) {
                                        _vm.globalSettings.brand_background_color_dark_theme =
                                          "#00000000"
                                      },
                                    },
                                  },
                                  [
                                    _vm._v(
                                      "\n                                " +
                                        _vm._s(
                                          _vm.__("transparent") || "Transparent"
                                        ) +
                                        "\n                            "
                                    ),
                                  ]
                                ),
                              ],
                              1
                            ),
                          ]
                        ),
                      ]
                    : _vm._e(),
                ],
                2
              ),
            ]),
          ]
        ),
      ]),
      _vm._v(" "),
      _c("section", { staticClass: "section" }, [
        _c("div", { staticClass: "card figma-main-section-card" }, [
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
                            attrs: {
                              type: "button",
                              title: _vm.__("grid_view"),
                            },
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
                            attrs: {
                              type: "button",
                              title: _vm.__("list_view"),
                            },
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
                        _c("span", [_vm._v(_vm._s(_vm.__("add_brand")))]),
                      ]
                    ),
                  ]),
                ]
              ),
              _vm._v(" "),
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
                      : !_vm.translatedBrands.length
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
                            _vm.pagedItems(_vm.translatedBrands),
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
                                  _c("div", { staticClass: "item-card-body" }, [
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
                                  ]),
                                  _vm._v(" "),
                                  _c(
                                    "div",
                                    { staticClass: "item-card-footer" },
                                    [
                                      brand.status == 1
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
                                      _vm._v(" "),
                                      _c(
                                        "div",
                                        { staticClass: "item-card-actions" },
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
                                                  _vm.edit_record = brand
                                                },
                                              },
                                            },
                                            [
                                              _c("base-icon", {
                                                attrs: {
                                                  name: "edit icon",
                                                  hoverName: "edit Hover",
                                                  width: "20",
                                                  height: "20",
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
                                              attrs: {
                                                title: _vm.__("delete"),
                                              },
                                              on: {
                                                click: function ($event) {
                                                  _vm.deleteRecord(
                                                    _vm.translatedBrands.indexOf(
                                                      brand
                                                    ),
                                                    brand.id
                                                  )
                                                },
                                              },
                                            },
                                            [
                                              _c("base-icon", {
                                                attrs: {
                                                  name: "Type=Default",
                                                  hoverName: "Type=Hover",
                                                  width: "20",
                                                  height: "20",
                                                },
                                              }),
                                            ],
                                            1
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
                    staticClass: "figma-order-table mb-0",
                    attrs: {
                      items: _vm.translatedBrands,
                      fields: _vm.fields,
                      "sort-by": _vm.sortBy,
                      "sort-desc": _vm.sortDesc,
                      "sort-direction": _vm.sortDirection,
                      bordered: false,
                      busy: _vm.isLoading,
                      stacked: "md",
                      "show-empty": "",
                      responsive: "",
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
                              "\n                        " +
                                _vm._s(row.item.id) +
                                "\n                    "
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
      _vm._v(" "),
      _vm.edit_record
        ? _c("app-edit-record", {
            attrs: {
              record: _vm.edit_record,
              globalColors: _vm.globalSettings,
            },
            on: {
              modalClose: function ($event) {
                _vm.edit_record = null
              },
              saved: _vm.onBrandSaved,
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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Product/Brands/Edit.vue?vue&type=template&id=64f39104&scoped=true":
/*!*************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Product/Brands/Edit.vue?vue&type=template&id=64f39104&scoped=true ***!
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
              _vm._v("\n      " + _vm._s(_vm.__("save")) + "\n      "),
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
                            { staticClass: "d-flex flex-wrap gap-2 mb-3" },
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
                          _c("label", [
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
                              _c("label", [
                                _vm._v(_vm._s(_vm.__("image")) + " "),
                                lang.is_default
                                  ? _c("i", { staticClass: "text-danger" }, [
                                      _vm._v("*"),
                                    ])
                                  : _vm._e(),
                              ]),
                              _vm._v(" "),
                              _c("input", {
                                ref: "file_image",
                                refInFor: true,
                                staticClass: "d-none",
                                attrs: {
                                  type: "file",
                                  id: "brand_image",
                                  accept: "image/*",
                                },
                                on: { change: _vm.handleFileUpload },
                              }),
                              _vm._v(" "),
                              _c(
                                "label",
                                {
                                  staticClass: "file-input-div bg-gray-100",
                                  attrs: { for: "brand_image" },
                                  on: {
                                    drop: _vm.dropFile,
                                    dragover: function ($event) {
                                      $event.preventDefault()
                                    },
                                    dragenter: function ($event) {
                                      $event.preventDefault()
                                    },
                                  },
                                },
                                [
                                  _vm.image && _vm.image.name
                                    ? [
                                        _vm._v(
                                          "\n                " +
                                            _vm._s(
                                              _vm.__("selected_file_name")
                                            ) +
                                            ": " +
                                            _vm._s(_vm.image.name) +
                                            "\n              "
                                        ),
                                      ]
                                    : [
                                        _c("i", {
                                          staticClass:
                                            "fa fa-cloud-upload-alt fa-2x",
                                        }),
                                        _c("br"),
                                        _vm._v(
                                          "\n                " +
                                            _vm._s(
                                              _vm.__(
                                                "drop_files_here_or_click_to_upload"
                                              )
                                            ) +
                                            "\n              "
                                        ),
                                      ],
                                ],
                                2
                              ),
                              _vm._v(" "),
                              _vm.error
                                ? _c(
                                    "div",
                                    { staticClass: "text-danger mt-1" },
                                    [_vm._v(_vm._s(_vm.error))]
                                  )
                                : _vm._e(),
                              _vm._v(" "),
                              _vm.image_url
                                ? _c("div", { staticClass: "mt-2" }, [
                                    _c("img", {
                                      staticClass: "custom-image",
                                      attrs: { src: _vm.image_url },
                                    }),
                                  ])
                                : _vm._e(),
                            ])
                          : _vm._e(),
                        _vm._v(" "),
                        lang.is_default &&
                        _vm.globalColors &&
                        _vm.globalColors.brand_background_color_mode ===
                          "item-wise"
                          ? _c("div", { staticClass: "form-group col-md-6" }, [
                              _c("label", [
                                _vm._v(
                                  _vm._s(
                                    _vm.__("background_color_for_light_theme")
                                  )
                                ),
                              ]),
                              _vm._v(" "),
                              _c(
                                "div",
                                { staticClass: "color-field d-flex" },
                                [
                                  _c("input", {
                                    directives: [
                                      {
                                        name: "model",
                                        rawName: "v-model",
                                        value:
                                          _vm.background_color_for_light_theme,
                                        expression:
                                          "background_color_for_light_theme",
                                      },
                                    ],
                                    staticClass: "form-control",
                                    attrs: { type: "text" },
                                    domProps: {
                                      value:
                                        _vm.background_color_for_light_theme,
                                    },
                                    on: {
                                      input: function ($event) {
                                        if ($event.target.composing) {
                                          return
                                        }
                                        _vm.background_color_for_light_theme =
                                          $event.target.value
                                      },
                                    },
                                  }),
                                  _vm._v(" "),
                                  _c("input", {
                                    staticClass:
                                      "form-control cursor-pointer color-swatch",
                                    attrs: { type: "color" },
                                    domProps: {
                                      value:
                                        _vm.background_color_for_light_theme &&
                                        _vm.background_color_for_light_theme.startsWith(
                                          "#"
                                        ) &&
                                        (_vm.background_color_for_light_theme
                                          .length === 4 ||
                                          _vm.background_color_for_light_theme
                                            .length === 7 ||
                                          _vm.background_color_for_light_theme
                                            .length === 9)
                                          ? _vm.background_color_for_light_theme.substring(
                                              0,
                                              7
                                            )
                                          : "#ffffff",
                                    },
                                    on: {
                                      input: function ($event) {
                                        _vm.background_color_for_light_theme =
                                          $event.target.value
                                      },
                                    },
                                  }),
                                  _vm._v(" "),
                                  _c(
                                    "b-button",
                                    {
                                      attrs: {
                                        size: "sm",
                                        variant: "outline-secondary",
                                      },
                                      on: {
                                        click: function ($event) {
                                          _vm.background_color_for_light_theme =
                                            "#ffffff00"
                                        },
                                      },
                                    },
                                    [
                                      _vm._v(
                                        "\n                " +
                                          _vm._s(
                                            _vm.__("transparent") ||
                                              "Transparent"
                                          ) +
                                          "\n              "
                                      ),
                                    ]
                                  ),
                                ],
                                1
                              ),
                              _vm._v(" "),
                              _c(
                                "small",
                                { staticClass: "text-muted d-block mt-1" },
                                [
                                  _vm._v(
                                    "Note: Plain bg and bg less that's bg set perfectly category wise. That selected bg set in app and web cat image bg colur."
                                  ),
                                ]
                              ),
                            ])
                          : _vm._e(),
                        _vm._v(" "),
                        lang.is_default &&
                        _vm.globalColors &&
                        _vm.globalColors.brand_background_color_mode ===
                          "item-wise"
                          ? _c("div", { staticClass: "form-group col-md-6" }, [
                              _c("label", [
                                _vm._v(
                                  _vm._s(
                                    _vm.__("background_color_for_dark_theme")
                                  )
                                ),
                              ]),
                              _vm._v(" "),
                              _c(
                                "div",
                                { staticClass: "color-field d-flex" },
                                [
                                  _c("input", {
                                    directives: [
                                      {
                                        name: "model",
                                        rawName: "v-model",
                                        value:
                                          _vm.background_color_for_dark_theme,
                                        expression:
                                          "background_color_for_dark_theme",
                                      },
                                    ],
                                    staticClass: "form-control",
                                    attrs: { type: "text" },
                                    domProps: {
                                      value:
                                        _vm.background_color_for_dark_theme,
                                    },
                                    on: {
                                      input: function ($event) {
                                        if ($event.target.composing) {
                                          return
                                        }
                                        _vm.background_color_for_dark_theme =
                                          $event.target.value
                                      },
                                    },
                                  }),
                                  _vm._v(" "),
                                  _c("input", {
                                    staticClass:
                                      "form-control cursor-pointer color-swatch",
                                    attrs: { type: "color" },
                                    domProps: {
                                      value:
                                        _vm.background_color_for_dark_theme &&
                                        _vm.background_color_for_dark_theme.startsWith(
                                          "#"
                                        ) &&
                                        (_vm.background_color_for_dark_theme
                                          .length === 4 ||
                                          _vm.background_color_for_dark_theme
                                            .length === 7 ||
                                          _vm.background_color_for_dark_theme
                                            .length === 9)
                                          ? _vm.background_color_for_dark_theme.substring(
                                              0,
                                              7
                                            )
                                          : "#000000",
                                    },
                                    on: {
                                      input: function ($event) {
                                        _vm.background_color_for_dark_theme =
                                          $event.target.value
                                      },
                                    },
                                  }),
                                  _vm._v(" "),
                                  _c(
                                    "b-button",
                                    {
                                      attrs: {
                                        size: "sm",
                                        variant: "outline-secondary",
                                      },
                                      on: {
                                        click: function ($event) {
                                          _vm.background_color_for_dark_theme =
                                            "#00000000"
                                        },
                                      },
                                    },
                                    [
                                      _vm._v(
                                        "\n                " +
                                          _vm._s(
                                            _vm.__("transparent") ||
                                              "Transparent"
                                          ) +
                                          "\n              "
                                      ),
                                    ]
                                  ),
                                ],
                                1
                              ),
                              _vm._v(" "),
                              _c(
                                "small",
                                { staticClass: "text-muted d-block mt-1" },
                                [
                                  _vm._v(
                                    "Note: Plain bg and bg less that's bg set perfectly category wise. That selected bg set in app and web cat image bg colur."
                                  ),
                                ]
                              ),
                            ])
                          : _vm._e(),
                        _vm._v(" "),
                        _vm.id && lang.is_default
                          ? _c(
                              "div",
                              { staticClass: "form-group col-12 mb-0" },
                              [
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
                                          {
                                            text: _vm.__("deactivate"),
                                            value: 0,
                                          },
                                          {
                                            text: _vm.__("activate"),
                                            value: 1,
                                          },
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
                              ]
                            )
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