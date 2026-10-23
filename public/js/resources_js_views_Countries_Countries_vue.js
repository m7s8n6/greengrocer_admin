"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_views_Countries_Countries_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Countries/Countries.vue?vue&type=script&lang=js":
/*!********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Countries/Countries.vue?vue&type=script&lang=js ***!
  \********************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Edit_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Edit.vue */ "./resources/js/views/Countries/Edit.vue");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_1__);
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



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  components: {
    'app-edit-record': _Edit_vue__WEBPACK_IMPORTED_MODULE_0__["default"]
  },
  data: function data() {
    return {
      fields: [{
        key: 'id',
        label: __('id'),
        sortable: true,
        sortDirection: 'asc'
      }, {
        key: 'name',
        label: __('name'),
        sortable: true,
        sortDirection: 'asc'
      }, {
        key: 'dial_code',
        label: __('dial_code')
      }, {
        key: 'code',
        label: __('code')
      }, {
        key: 'logo',
        label: __('logo')
      }, {
        key: 'status',
        label: __('status'),
        sortable: true,
        sortDirection: 'asc'
      }, {
        key: 'actions',
        label: __('actions')
      }],
      totalRows: 1,
      currentPage: 1,
      perPage: this.$perPage,
      pageOptions: this.$pageOptions,
      sortBy: 'id',
      sortDesc: false,
      sortDirection: 'asc',
      filter: null,
      filterOn: [],
      page: 1,
      isLoading: false,
      sectionStyle: 'style_1',
      max_visible_units: 12,
      max_col_in_single_row: 3,
      countries: [],
      sortBySL: 'id',
      sortDescSL: false,
      sortDirectionSL: 'asc',
      isSystemRefreshing: false,
      create_new: null,
      edit_record: null,
      currentLanguageId: null,
      activeLanguages: [],
      globalSettings: {
        country_background_color_mode: 'global',
        country_background_color_light_theme: '',
        country_background_color_dark_theme: ''
      },
      isSavingGlobal: false
    };
  },
  computed: {
    translatedCountries: function translatedCountries() {
      var _this = this;
      var list = Array.isArray(this.countries) ? this.countries : [];
      if (!this.currentLanguageId || list.length === 0) {
        return list;
      }
      return list.map(function (country) {
        var translatedCountry = _objectSpread({}, country);
        if (country.translations && Array.isArray(country.translations)) {
          var translation = country.translations.find(function (t) {
            return t.language_id === _this.currentLanguageId;
          });
          if (translation && translation.name && translation.name.trim() !== '') {
            translatedCountry.name = translation.name;
          }
        }
        return translatedCountry;
      });
    },
    pageStart: function pageStart() {
      if (this.totalRows === 0) return 0;
      return (this.currentPage - 1) * this.perPage + 1;
    },
    pageEnd: function pageEnd() {
      return Math.min(this.currentPage * this.perPage, this.totalRows);
    },
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
    }
  },
  watch: {
    $route: function $route(to, from) {
      this.showCreateModal();
    }
  },
  created: function created() {
    var _this2 = this;
    this.showCreateModal();
    this.recordSavedHandler = function (message) {
      _this2.showMessage('success', message);
      _this2.fetchActiveLanguages().then(function () {
        _this2.getRecords();
      });
      _this2.create_new = null;
    };
    this.$eventBus.$on('recordSaved', this.recordSavedHandler);
    this.fetchGlobalColors();
    this.fetchActiveLanguages().then(function () {
      _this2.getRecords();
    });
  },
  beforeDestroy: function beforeDestroy() {
    this.$eventBus.$off('recordSaved', this.recordSavedHandler);
  },
  methods: {
    tr: function tr(key, fallback) {
      var v = this.__(key);
      return v && v !== key ? v : fallback;
    },
    fetchGlobalColors: function fetchGlobalColors() {
      var _this3 = this;
      axios__WEBPACK_IMPORTED_MODULE_1___default().get(this.$apiUrl + '/web_settings').then(function (response) {
        var settings = response.data.data.settingsObject;
        _this3.globalSettings.country_background_color_mode = settings.country_background_color_mode || 'global';
        _this3.globalSettings.country_background_color_light_theme = settings.country_background_color_light_theme || '';
        _this3.globalSettings.country_background_color_dark_theme = settings.country_background_color_dark_theme || '';
      });
    },
    saveGlobalColors: function saveGlobalColors() {
      var _this4 = this;
      this.isSavingGlobal = true;
      var formData = new FormData();
      formData.append('country_background_color_mode', this.globalSettings.country_background_color_mode || 'global');
      formData.append('country_background_color_light_theme', this.globalSettings.country_background_color_light_theme || '');
      formData.append('country_background_color_dark_theme', this.globalSettings.country_background_color_dark_theme || '');
      axios__WEBPACK_IMPORTED_MODULE_1___default().post(this.$apiUrl + '/web_settings/save', formData).then(function (res) {
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
      return axios__WEBPACK_IMPORTED_MODULE_1___default().get(this.$apiUrl + '/active_languages').then(function (response) {
        if (response.data.data && Array.isArray(response.data.data)) {
          _this5.activeLanguages = response.data.data;
          var appLocale = window.appLocale || 'en';
          var currentLanguage = _this5.activeLanguages.find(function (lang) {
            return lang.code === appLocale;
          });
          if (currentLanguage) {
            _this5.currentLanguageId = currentLanguage.id;
          } else {
            var defaultLanguage = _this5.activeLanguages.find(function (lang) {
              return lang.is_default === 1;
            });
            if (defaultLanguage) {
              _this5.currentLanguageId = defaultLanguage.id;
            }
          }
        }
      })["catch"](function (error) {
        console.error('Error loading languages:', error);
      });
    },
    getRecords: function getRecords() {
      var _this6 = this;
      this.isLoading = true;
      axios__WEBPACK_IMPORTED_MODULE_1___default().get(this.$apiUrl + '/countries', {}).then(function (response) {
        _this6.isLoading = false;
        var data = response.data;
        _this6.countries = data.data;
        _this6.totalRows = _this6.countries.length;
      })["catch"](function (error) {
        var _error$request;
        _this6.isLoading = false;
        if (error !== null && error !== void 0 && (_error$request = error.request) !== null && _error$request !== void 0 && _error$request.statusText) {
          _this6.showError(error.request.statusText);
        } else if (error.message) {
          _this6.showError(error.message);
        } else {
          _this6.showError("Something went wrong!");
        }
      });
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
          var postData = {
            id: id
          };
          axios__WEBPACK_IMPORTED_MODULE_1___default().post(_this7.$apiUrl + '/countries/delete', postData).then(function (response) {
            _this7.isLoading = false;
            var data = response.data;
            if (data.status === 1) {
              // Find the index of the country in the array based on its id
              var indexOfDeletedCountry = _this7.countries.findIndex(function (country) {
                return country.id === postData.id;
              });
              if (indexOfDeletedCountry !== -1) {
                // If the country is found in the array, remove it
                _this7.countries.splice(indexOfDeletedCountry, 1);
                _this7.showMessage('success', data.message);
              } else {
                console.error("Country not found in the array.");
              }
            } else {
              _this7.showError(data.message);
            }
          })["catch"](function (error) {
            var _error$request2;
            vm.isLoading = false;
            if (error !== null && error !== void 0 && (_error$request2 = error.request) !== null && _error$request2 !== void 0 && _error$request2.statusText) {
              _this7.showError(error.request.statusText);
            } else if (error.message) {
              _this7.showError(error.message);
            } else {
              _this7.showError("Something went wrong!");
            }
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
        path: '/countries'
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Countries/Edit.vue?vue&type=script&lang=js":
/*!***************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Countries/Edit.vue?vue&type=script&lang=js ***!
  \***************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _mixins_TranslationHelper_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../mixins/TranslationHelper.js */ "./resources/js/mixins/TranslationHelper.js");

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
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
  props: ['record', 'globalColors'],
  mixins: [_mixins_TranslationHelper_js__WEBPACK_IMPORTED_MODULE_2__["default"]],
  data: function data() {
    var _this$record, _this$globalColors, _this$record2, _this$globalColors2;
    return {
      isLoadingData: true,
      isLoading: false,
      id: this.record ? this.record.id : null,
      dial_code: this.record ? this.record.dial_code : '',
      code: this.record ? this.record.code : '',
      logo_url: this.record ? this.record.logo_url : null,
      status: this.record ? this.record.status : 1,
      logo: null,
      logoError: null,
      background_color_for_light_theme: ((_this$record = this.record) === null || _this$record === void 0 ? void 0 : _this$record.background_color_for_light_theme) || ((_this$globalColors = this.globalColors) === null || _this$globalColors === void 0 ? void 0 : _this$globalColors.country_background_color_light_theme) || null,
      background_color_for_dark_theme: ((_this$record2 = this.record) === null || _this$record2 === void 0 ? void 0 : _this$record2.background_color_for_dark_theme) || ((_this$globalColors2 = this.globalColors) === null || _this$globalColors2 === void 0 ? void 0 : _this$globalColors2.country_background_color_dark_theme) || null,
      languages: [],
      translations: {},
      activeLanguageTab: 0,
      defaultLanguageId: null,
      translatableFields: ['name'],
      translateSuccessMessage: '',
      loadingEmpty: false,
      loadingOverwrite: false
    };
  },
  computed: {
    modal_title: function modal_title() {
      var title = this.id ? __('edit_country') : __('add_country');
      return title;
    }
  },
  methods: {
    resetForm: function resetForm() {
      var _this$globalColors3, _this$globalColors4;
      this.id = null;
      this.dial_code = '';
      this.code = '';
      this.logo = null;
      this.logo_url = null;
      this.status = 1;
      this.background_color_for_light_theme = ((_this$globalColors3 = this.globalColors) === null || _this$globalColors3 === void 0 ? void 0 : _this$globalColors3.country_background_color_light_theme) || null;
      this.background_color_for_dark_theme = ((_this$globalColors4 = this.globalColors) === null || _this$globalColors4 === void 0 ? void 0 : _this$globalColors4.country_background_color_dark_theme) || null;
      this.translations = {};
    },
    deferDataLoad: function deferDataLoad() {
      var _this = this;
      this.isLoadingData = true;
      this.fetchActiveLanguages().then(function () {
        var defaultLang = _this.languages.find(function (lang) {
          return lang.is_default == 1;
        });
        if (defaultLang) {
          _this.defaultLanguageId = defaultLang.id;
        }

        // Initialize ONCE
        _this.initializeTranslations();
        if (_this.id) {
          return _this.loadCountryWithTranslations();
        } else {
          _this.isLoadingData = false;
        }
      })["catch"](function (error) {
        console.error('Error loading data:', error);
        _this.isLoadingData = false;
      });
    },
    fetchActiveLanguages: function fetchActiveLanguages() {
      var _this2 = this;
      return axios__WEBPACK_IMPORTED_MODULE_1___default().get(this.$apiUrl + '/active_languages').then(function (response) {
        if (response.data.data) {
          _this2.languages = response.data.data;
          return _this2.languages;
        } else {
          throw new Error('No languages found');
        }
      });
    },
    initializeTranslations: function initializeTranslations() {
      var _this3 = this;
      this.translations = {};
      this.languages.forEach(function (language) {
        _this3.$set(_this3.translations, language.id, {
          name: ''
        });
      });
    },
    loadCountryWithTranslations: function loadCountryWithTranslations() {
      var _this4 = this;
      return axios__WEBPACK_IMPORTED_MODULE_1___default().get(this.$apiUrl + '/countries', {
        params: {
          id: this.id
        }
      }).then(function (response) {
        var _this4$globalColors, _this4$globalColors2;
        if (!response.data.data) {
          _this4.isLoadingData = false;
          return;
        }
        var country = Array.isArray(response.data.data) ? response.data.data[0] : response.data.data;
        if (!country) {
          _this4.isLoadingData = false;
          return;
        }

        // Base table data
        _this4.dial_code = country.dial_code;
        _this4.code = country.code;
        _this4.status = country.status;
        _this4.logo_url = country.logo_url;
        _this4.background_color_for_light_theme = country.background_color_for_light_theme || ((_this4$globalColors = _this4.globalColors) === null || _this4$globalColors === void 0 ? void 0 : _this4$globalColors.country_background_color_light_theme) || null;
        _this4.background_color_for_dark_theme = country.background_color_for_dark_theme || ((_this4$globalColors2 = _this4.globalColors) === null || _this4$globalColors2 === void 0 ? void 0 : _this4$globalColors2.country_background_color_dark_theme) || null;

        // Always create fresh object 
        var updatedTranslations = {};
        _this4.languages.forEach(function (language) {
          updatedTranslations[language.id] = {
            name: ''
          };
        });

        // Fill from translation table
        if (country.translations && Array.isArray(country.translations)) {
          country.translations.forEach(function (trans) {
            updatedTranslations[trans.language_id] = {
              name: trans.name || ''
            };
          });
        }

        // Fallback for default language
        var defaultLang = _this4.languages.find(function (l) {
          return l.is_default == 1;
        });
        if (defaultLang && !updatedTranslations[defaultLang.id].name) {
          updatedTranslations[defaultLang.id].name = country.name || '';
        }
        _this4.translations = updatedTranslations;
        _this4.isLoadingData = false;
      })["catch"](function (error) {
        console.error(error);
        _this4.isLoadingData = false;
      });
    },
    validateDefaultLanguage: function validateDefaultLanguage() {
      if (!this.defaultLanguageId) {
        this.showError(__('default_language_not_found'));
        return false;
      }
      var defaultTranslation = this.translations[this.defaultLanguageId];
      if (!defaultTranslation || !defaultTranslation.name || defaultTranslation.name.trim() === '') {
        this.showError(__('please_fill_default_language_required_fields'));
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
      // Use $nextTick so tab switch happens after any error toast/modal renders
      this.$nextTick(function () {
        var index = _this6.languages.findIndex(function (l) {
          return l.is_default == 1;
        });
        if (index !== -1) {
          _this6.activeLanguageTab = index;
        }
      });
    },
    triggerLogoClick: function triggerLogoClick() {
      var ref = this.$refs.file_image;
      var input = Array.isArray(ref) ? ref[0] : ref;
      if (input && typeof input.click === 'function') {
        input.click();
      }
    },
    dropLogoFile: function dropLogoFile(event) {
      event.preventDefault();
      var ref = this.$refs.file_image;
      var input = Array.isArray(ref) ? ref[0] : ref;
      if (!input) return;
      input.files = event.dataTransfer.files;
      this.handleFileUpload();
      event.currentTarget.classList.add('bg-gray-100');
      event.currentTarget.classList.remove('bg-green-300');
    },
    handleFileUpload: function handleFileUpload() {
      var _fileInput$files;
      var ref = this.$refs.file_image;
      var fileInput = Array.isArray(ref) ? ref[0] : ref;
      var file = fileInput === null || fileInput === void 0 ? void 0 : (_fileInput$files = fileInput.files) === null || _fileInput$files === void 0 ? void 0 : _fileInput$files[0];
      if (!file) return;
      this.logoError = null;
      var validTypes = ["image/jpeg", "image/png", "image/jpg", "image/gif", "image/webp"];
      if (!validTypes.includes(file.type)) {
        this.logoError = this.__('invalid_image_type');
        return;
      }
      this.logo = file;
      this.logo_url = URL.createObjectURL(file);
    },
    saveRecord: function saveRecord() {
      var _this7 = this;
      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee() {
        var _fileInput$files2, formData, fileInput, logoFile, url;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (_this7.validateDefaultLanguage()) {
                  _context.next = 2;
                  break;
                }
                return _context.abrupt("return");
              case 2:
                if (_this7.$refs['my-form'].checkValidity()) {
                  _context.next = 6;
                  break;
                }
                _this7.showError(__('please_fill_default_language_required_fields'));
                _this7.switchToDefaultLanguageTab();
                return _context.abrupt("return");
              case 6:
                if (!(!_this7.id && !_this7.logo && !_this7.logo_url)) {
                  _context.next = 9;
                  break;
                }
                _this7.showError(_this7.__('please_fill_default_language_required_fields'));
                return _context.abrupt("return");
              case 9:
                if (!(_this7.id && !_this7.logo && !_this7.logo_url)) {
                  _context.next = 12;
                  break;
                }
                _this7.showError(_this7.__('please_fill_default_language_required_fields'));
                return _context.abrupt("return");
              case 12:
                _this7.isLoading = true;
                _context.prev = 13;
                formData = new FormData();
                if (_this7.id) {
                  formData.append('id', _this7.id);
                }
                formData.append('dial_code', _this7.dial_code);
                formData.append('code', _this7.code);
                formData.append('status', _this7.status);
                if (_this7.background_color_for_light_theme) formData.append('background_color_for_light_theme', _this7.background_color_for_light_theme);
                if (_this7.background_color_for_dark_theme) formData.append('background_color_for_dark_theme', _this7.background_color_for_dark_theme);

                // Get file from input at submit time (in case ref was array or state was lost)
                fileInput = Array.isArray(_this7.$refs.file_image) ? _this7.$refs.file_image[0] : _this7.$refs.file_image;
                logoFile = _this7.logo || (fileInput === null || fileInput === void 0 ? void 0 : (_fileInput$files2 = fileInput.files) === null || _fileInput$files2 === void 0 ? void 0 : _fileInput$files2[0]);
                if (logoFile) {
                  formData.append('logo', logoFile, logoFile.name);
                }

                //  Send all translations at once
                formData.append('translations', JSON.stringify(_this7.translations));
                url = _this7.id ? _this7.$apiUrl + '/countries/update' : _this7.$apiUrl + '/countries/save';
                _context.next = 28;
                return axios__WEBPACK_IMPORTED_MODULE_1___default().post(url, formData);
              case 28:
                _this7.$eventBus.$emit('recordSaved', __('country_saved_successfully'));
                _this7.$router.push({
                  path: '/countries'
                });
                _this7.hideModal();
                _context.next = 36;
                break;
              case 33:
                _context.prev = 33;
                _context.t0 = _context["catch"](13);
                console.error(_context.t0);
              case 36:
                _this7.isLoading = false;
              case 37:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[13, 33]]);
      }))();
    },
    showModal: function showModal() {
      this.$refs['my-modal'].show();
    },
    hideModal: function hideModal() {
      this.$refs['my-modal'].hide();
    }
  },
  mounted: function mounted() {
    var _this8 = this;
    this.showModal();
    this.$nextTick(function () {
      _this8.deferDataLoad();
    });
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

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Countries/Countries.vue?vue&type=style&index=0&id=24621b2a&scoped=true&lang=css":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Countries/Countries.vue?vue&type=style&index=0&id=24621b2a&scoped=true&lang=css ***!
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
___CSS_LOADER_EXPORT___.push([module.id, "\n.category-color-text[data-v-24621b2a] {\n    flex: 1 1 200px;\n    min-width: 0;\n}\n\n/* Phones: the \"Items Background Colors\" card. The colour text field gets its own full row,\n   the swatch + Transparent button sit on the next one, and the card header is more compact. */\n@media (max-width: 575.98px) {\n.category-color-text[data-v-24621b2a] {\n        flex: 1 1 100%;\n        min-width: 0;\n}\n.category-color-row > input[type=\"color\"][data-v-24621b2a] {\n        flex: 0 0 72px;\n        max-width: 72px !important;\n}\n.card > .card-header[data-v-24621b2a] {\n        padding: 12px 16px !important;\n}\n.card > .card-header .card-title[data-v-24621b2a] {\n        font-size: 1rem;\n        line-height: 1.3;\n}\n}\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Countries/Edit.vue?vue&type=style&index=0&id=734c5df8&scoped=true&lang=css":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Countries/Edit.vue?vue&type=style&index=0&id=734c5df8&scoped=true&lang=css ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
___CSS_LOADER_EXPORT___.push([module.id, "\n.image_preview[data-v-734c5df8] {\n    margin-top: 5px;\n}\n.logo-status-col[data-v-734c5df8] {\n    flex: 1 1 200px;\n    min-width: 0;\n}\n.color-text-input[data-v-734c5df8] {\n    flex: 1 1 140px;\n    min-width: 0;\n}\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Countries/Countries.vue?vue&type=style&index=0&id=24621b2a&scoped=true&lang=css":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Countries/Countries.vue?vue&type=style&index=0&id=24621b2a&scoped=true&lang=css ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Countries_vue_vue_type_style_index_0_id_24621b2a_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Countries.vue?vue&type=style&index=0&id=24621b2a&scoped=true&lang=css */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Countries/Countries.vue?vue&type=style&index=0&id=24621b2a&scoped=true&lang=css");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Countries_vue_vue_type_style_index_0_id_24621b2a_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Countries_vue_vue_type_style_index_0_id_24621b2a_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Countries/Edit.vue?vue&type=style&index=0&id=734c5df8&scoped=true&lang=css":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Countries/Edit.vue?vue&type=style&index=0&id=734c5df8&scoped=true&lang=css ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Edit_vue_vue_type_style_index_0_id_734c5df8_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Edit.vue?vue&type=style&index=0&id=734c5df8&scoped=true&lang=css */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Countries/Edit.vue?vue&type=style&index=0&id=734c5df8&scoped=true&lang=css");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Edit_vue_vue_type_style_index_0_id_734c5df8_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Edit_vue_vue_type_style_index_0_id_734c5df8_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./resources/js/views/Countries/Countries.vue":
/*!****************************************************!*\
  !*** ./resources/js/views/Countries/Countries.vue ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Countries_vue_vue_type_template_id_24621b2a_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Countries.vue?vue&type=template&id=24621b2a&scoped=true */ "./resources/js/views/Countries/Countries.vue?vue&type=template&id=24621b2a&scoped=true");
/* harmony import */ var _Countries_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Countries.vue?vue&type=script&lang=js */ "./resources/js/views/Countries/Countries.vue?vue&type=script&lang=js");
/* harmony import */ var _Countries_vue_vue_type_style_index_0_id_24621b2a_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Countries.vue?vue&type=style&index=0&id=24621b2a&scoped=true&lang=css */ "./resources/js/views/Countries/Countries.vue?vue&type=style&index=0&id=24621b2a&scoped=true&lang=css");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _Countries_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _Countries_vue_vue_type_template_id_24621b2a_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render,
  _Countries_vue_vue_type_template_id_24621b2a_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "24621b2a",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/Countries/Countries.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/views/Countries/Edit.vue":
/*!***********************************************!*\
  !*** ./resources/js/views/Countries/Edit.vue ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Edit_vue_vue_type_template_id_734c5df8_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Edit.vue?vue&type=template&id=734c5df8&scoped=true */ "./resources/js/views/Countries/Edit.vue?vue&type=template&id=734c5df8&scoped=true");
/* harmony import */ var _Edit_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Edit.vue?vue&type=script&lang=js */ "./resources/js/views/Countries/Edit.vue?vue&type=script&lang=js");
/* harmony import */ var _Edit_vue_vue_type_style_index_0_id_734c5df8_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Edit.vue?vue&type=style&index=0&id=734c5df8&scoped=true&lang=css */ "./resources/js/views/Countries/Edit.vue?vue&type=style&index=0&id=734c5df8&scoped=true&lang=css");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _Edit_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _Edit_vue_vue_type_template_id_734c5df8_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render,
  _Edit_vue_vue_type_template_id_734c5df8_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "734c5df8",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/Countries/Edit.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/views/Countries/Countries.vue?vue&type=script&lang=js":
/*!****************************************************************************!*\
  !*** ./resources/js/views/Countries/Countries.vue?vue&type=script&lang=js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Countries_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Countries.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Countries/Countries.vue?vue&type=script&lang=js");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Countries_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/Countries/Edit.vue?vue&type=script&lang=js":
/*!***********************************************************************!*\
  !*** ./resources/js/views/Countries/Edit.vue?vue&type=script&lang=js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Edit_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Edit.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Countries/Edit.vue?vue&type=script&lang=js");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Edit_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/Countries/Countries.vue?vue&type=style&index=0&id=24621b2a&scoped=true&lang=css":
/*!************************************************************************************************************!*\
  !*** ./resources/js/views/Countries/Countries.vue?vue&type=style&index=0&id=24621b2a&scoped=true&lang=css ***!
  \************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Countries_vue_vue_type_style_index_0_id_24621b2a_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/style-loader/dist/cjs.js!../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Countries.vue?vue&type=style&index=0&id=24621b2a&scoped=true&lang=css */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Countries/Countries.vue?vue&type=style&index=0&id=24621b2a&scoped=true&lang=css");


/***/ }),

/***/ "./resources/js/views/Countries/Edit.vue?vue&type=style&index=0&id=734c5df8&scoped=true&lang=css":
/*!*******************************************************************************************************!*\
  !*** ./resources/js/views/Countries/Edit.vue?vue&type=style&index=0&id=734c5df8&scoped=true&lang=css ***!
  \*******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Edit_vue_vue_type_style_index_0_id_734c5df8_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/style-loader/dist/cjs.js!../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Edit.vue?vue&type=style&index=0&id=734c5df8&scoped=true&lang=css */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Countries/Edit.vue?vue&type=style&index=0&id=734c5df8&scoped=true&lang=css");


/***/ }),

/***/ "./resources/js/views/Countries/Countries.vue?vue&type=template&id=24621b2a&scoped=true":
/*!**********************************************************************************************!*\
  !*** ./resources/js/views/Countries/Countries.vue?vue&type=template&id=24621b2a&scoped=true ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Countries_vue_vue_type_template_id_24621b2a_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   staticRenderFns: () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Countries_vue_vue_type_template_id_24621b2a_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Countries_vue_vue_type_template_id_24621b2a_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Countries.vue?vue&type=template&id=24621b2a&scoped=true */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Countries/Countries.vue?vue&type=template&id=24621b2a&scoped=true");


/***/ }),

/***/ "./resources/js/views/Countries/Edit.vue?vue&type=template&id=734c5df8&scoped=true":
/*!*****************************************************************************************!*\
  !*** ./resources/js/views/Countries/Edit.vue?vue&type=template&id=734c5df8&scoped=true ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Edit_vue_vue_type_template_id_734c5df8_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   staticRenderFns: () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Edit_vue_vue_type_template_id_734c5df8_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Edit_vue_vue_type_template_id_734c5df8_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Edit.vue?vue&type=template&id=734c5df8&scoped=true */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Countries/Edit.vue?vue&type=template&id=734c5df8&scoped=true");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Countries/Countries.vue?vue&type=template&id=24621b2a&scoped=true":
/*!*************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Countries/Countries.vue?vue&type=template&id=24621b2a&scoped=true ***!
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
    "div",
    [
      _c("div", { staticClass: "page-heading" }, [
        _c("div", { staticClass: "page-title mb-3" }, [
          _c(
            "div",
            {
              staticClass:
                "d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-2",
            },
            [
              _c("h3", { staticClass: "mb-0" }, [
                _vm._v(_vm._s(_vm.__("manage_countries"))),
              ]),
              _vm._v(" "),
              _c("nav", { attrs: { "aria-label": "breadcrumb" } }, [
                _c("ol", { staticClass: "breadcrumb mb-0" }, [
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
                    [_vm._v(_vm._s(_vm.__("manage_countries")))]
                  ),
                ]),
              ]),
            ]
          ),
        ]),
        _vm._v(" "),
        _c("section", { staticClass: "section mb-4" }, [
          _c("div", { staticClass: "card mb-0" }, [
            _c("div", { staticClass: "card-header" }, [
              _c(
                "h4",
                { staticClass: "card-title mb-0 text-start float-none" },
                [
                  _vm._v(
                    _vm._s(
                      _vm.__("items_background_colors") ||
                        "Items Background Colors"
                    )
                  ),
                ]
              ),
              _vm._v(" "),
              _c("p", { staticClass: "text-muted small mb-0 mt-1" }, [
                _vm._v(
                  _vm._s(
                    _vm.tr(
                      "items_background_colors_desc",
                      "Background colour used behind country items in the apps, globally or per country."
                    )
                  )
                ),
              ]),
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "card-body" }, [
              _c("div", { staticClass: "row mb-3" }, [
                _c("div", { staticClass: "col-md-12" }, [
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
                        "d-flex flex-wrap align-items-center gap-2 gap-sm-3",
                    },
                    [
                      _c(
                        "div",
                        { staticClass: "form-check form-check-inline m-0" },
                        [
                          _c("input", {
                            directives: [
                              {
                                name: "model",
                                rawName: "v-model",
                                value:
                                  _vm.globalSettings
                                    .country_background_color_mode,
                                expression:
                                  "globalSettings.country_background_color_mode",
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
                                _vm.globalSettings
                                  .country_background_color_mode,
                                "global"
                              ),
                            },
                            on: {
                              change: function ($event) {
                                return _vm.$set(
                                  _vm.globalSettings,
                                  "country_background_color_mode",
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
                        { staticClass: "form-check form-check-inline m-0" },
                        [
                          _c("input", {
                            directives: [
                              {
                                name: "model",
                                rawName: "v-model",
                                value:
                                  _vm.globalSettings
                                    .country_background_color_mode,
                                expression:
                                  "globalSettings.country_background_color_mode",
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
                                _vm.globalSettings
                                  .country_background_color_mode,
                                "item-wise"
                              ),
                            },
                            on: {
                              change: function ($event) {
                                return _vm.$set(
                                  _vm.globalSettings,
                                  "country_background_color_mode",
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
                ]),
              ]),
              _vm._v(" "),
              _vm.globalSettings.country_background_color_mode === "global"
                ? _c("div", { staticClass: "row" }, [
                    _c(
                      "div",
                      { staticClass: "col-md-6 form-group mb-3 mb-md-0" },
                      [
                        _c("label", [
                          _vm._v(
                            _vm._s(
                              _vm.__("country_light_theme_background") ||
                                "Country Light Theme Background"
                            )
                          ),
                        ]),
                        _vm._v(" "),
                        _c(
                          "div",
                          {
                            staticClass:
                              "d-flex flex-wrap align-items-center gap-2 w-100 category-color-row",
                          },
                          [
                            _c("input", {
                              directives: [
                                {
                                  name: "model",
                                  rawName: "v-model",
                                  value:
                                    _vm.globalSettings
                                      .country_background_color_light_theme,
                                  expression:
                                    "globalSettings.country_background_color_light_theme",
                                },
                              ],
                              staticClass: "form-control category-color-text",
                              attrs: { type: "text" },
                              domProps: {
                                value:
                                  _vm.globalSettings
                                    .country_background_color_light_theme,
                              },
                              on: {
                                input: function ($event) {
                                  if ($event.target.composing) {
                                    return
                                  }
                                  _vm.$set(
                                    _vm.globalSettings,
                                    "country_background_color_light_theme",
                                    $event.target.value
                                  )
                                },
                              },
                            }),
                            _vm._v(" "),
                            _c("input", {
                              staticClass:
                                "form-control cursor-pointer color-swatch-input",
                              attrs: { type: "color" },
                              domProps: {
                                value:
                                  _vm.globalSettings
                                    .country_background_color_light_theme &&
                                  _vm.globalSettings.country_background_color_light_theme.startsWith(
                                    "#"
                                  ) &&
                                  (_vm.globalSettings
                                    .country_background_color_light_theme
                                    .length === 4 ||
                                    _vm.globalSettings
                                      .country_background_color_light_theme
                                      .length === 7 ||
                                    _vm.globalSettings
                                      .country_background_color_light_theme
                                      .length === 9)
                                    ? _vm.globalSettings.country_background_color_light_theme.substring(
                                        0,
                                        7
                                      )
                                    : "#ffffff",
                              },
                              on: {
                                input: function ($event) {
                                  _vm.globalSettings.country_background_color_light_theme =
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
                                    _vm.globalSettings.country_background_color_light_theme =
                                      "#ffffff00"
                                  },
                                },
                              },
                              [
                                _vm._v(
                                  "\n                                    " +
                                    _vm._s(
                                      _vm.__("transparent") || "Transparent"
                                    ) +
                                    "\n                                "
                                ),
                              ]
                            ),
                          ],
                          1
                        ),
                      ]
                    ),
                    _vm._v(" "),
                    _c("div", { staticClass: "col-md-6 form-group mb-0" }, [
                      _c("label", [
                        _vm._v(
                          _vm._s(
                            _vm.__("country_dark_theme_background") ||
                              "Country Dark Theme Background"
                          )
                        ),
                      ]),
                      _vm._v(" "),
                      _c(
                        "div",
                        {
                          staticClass:
                            "d-flex flex-wrap align-items-center gap-2 w-100 category-color-row",
                        },
                        [
                          _c("input", {
                            directives: [
                              {
                                name: "model",
                                rawName: "v-model",
                                value:
                                  _vm.globalSettings
                                    .country_background_color_dark_theme,
                                expression:
                                  "globalSettings.country_background_color_dark_theme",
                              },
                            ],
                            staticClass: "form-control category-color-text",
                            attrs: { type: "text" },
                            domProps: {
                              value:
                                _vm.globalSettings
                                  .country_background_color_dark_theme,
                            },
                            on: {
                              input: function ($event) {
                                if ($event.target.composing) {
                                  return
                                }
                                _vm.$set(
                                  _vm.globalSettings,
                                  "country_background_color_dark_theme",
                                  $event.target.value
                                )
                              },
                            },
                          }),
                          _vm._v(" "),
                          _c("input", {
                            staticClass:
                              "form-control cursor-pointer color-swatch-input",
                            attrs: { type: "color" },
                            domProps: {
                              value:
                                _vm.globalSettings
                                  .country_background_color_dark_theme &&
                                _vm.globalSettings.country_background_color_dark_theme.startsWith(
                                  "#"
                                ) &&
                                (_vm.globalSettings
                                  .country_background_color_dark_theme
                                  .length === 4 ||
                                  _vm.globalSettings
                                    .country_background_color_dark_theme
                                    .length === 7 ||
                                  _vm.globalSettings
                                    .country_background_color_dark_theme
                                    .length === 9)
                                  ? _vm.globalSettings.country_background_color_dark_theme.substring(
                                      0,
                                      7
                                    )
                                  : "#000000",
                            },
                            on: {
                              input: function ($event) {
                                _vm.globalSettings.country_background_color_dark_theme =
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
                                  _vm.globalSettings.country_background_color_dark_theme =
                                    "#00000000"
                                },
                              },
                            },
                            [
                              _vm._v(
                                "\n                                    " +
                                  _vm._s(
                                    _vm.__("transparent") || "Transparent"
                                  ) +
                                  "\n                                "
                              ),
                            ]
                          ),
                        ],
                        1
                      ),
                    ]),
                  ])
                : _vm._e(),
              _vm._v(" "),
              _c(
                "div",
                {
                  staticClass:
                    "d-flex justify-content-end border-top pt-3 mt-3",
                },
                [
                  _c(
                    "b-button",
                    {
                      attrs: {
                        variant: "primary",
                        disabled: _vm.isSavingGlobal,
                      },
                      on: { click: _vm.saveGlobalColors },
                    },
                    [
                      _vm._v(
                        "\n                            " +
                          _vm._s(_vm.__("save")) +
                          "\n                            "
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
            ]),
          ]),
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "row" }, [
          _c("div", { staticClass: "col-12 col-md-12 order-md-1 order-last" }, [
            _c("div", { staticClass: "figma-main-section-card" }, [
              _c("div", { staticClass: "card-body p-0" }, [
                _c(
                  "div",
                  {
                    staticClass:
                      "d-flex justify-content-between align-items-center flex-wrap gap-2 figma-action-bar-row",
                  },
                  [
                    _c(
                      "div",
                      {
                        staticClass:
                          "d-flex align-items-center gap-2 flex-grow-1 flex-wrap",
                      },
                      [
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
                              placeholder: _vm.__("search"),
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
                      ]
                    ),
                    _vm._v(" "),
                    _c(
                      "div",
                      {
                        staticClass:
                          "d-flex gap-2 align-items-center flex-wrap",
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
                            _c("span", [_vm._v(_vm._s(_vm.__("refresh")))]),
                          ]
                        ),
                        _vm._v(" "),
                        _vm.$can("country_create")
                          ? _c(
                              "router-link",
                              {
                                staticClass:
                                  "btn btn-figma-filter d-flex align-items-center gap-2",
                                attrs: { to: "/countries/create" },
                              },
                              [
                                _c("i", { staticClass: "fa fa-plus" }),
                                _vm._v(" "),
                                _c("span", [
                                  _vm._v(_vm._s(_vm.__("add_country"))),
                                ]),
                              ]
                            )
                          : _vm._e(),
                      ],
                      1
                    ),
                  ]
                ),
                _vm._v(" "),
                _c(
                  "div",
                  { staticClass: "table-responsive" },
                  [
                    _c("b-table", {
                      staticClass: "figma-table mb-0",
                      attrs: {
                        items: _vm.translatedCountries,
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
                        small: "",
                        "tbody-tr-class": function () {
                          return "figma-tr align-middle"
                        },
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
                          key: "empty",
                          fn: function (scope) {
                            return [
                              _c(
                                "div",
                                { staticClass: "text-center text-muted py-4" },
                                [
                                  _c("i", {
                                    staticClass:
                                      "fa fa-inbox fa-2x d-block mb-2",
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
                                    staticClass:
                                      "fa fa-search fa-2x d-block mb-2",
                                  }),
                                  _vm._v(_vm._s(scope.emptyFilteredText)),
                                ]
                              ),
                            ]
                          },
                        },
                        {
                          key: "cell(id)",
                          fn: function (row) {
                            return [
                              _vm._v(
                                "\n                                    " +
                                  _vm._s(row.item.id) +
                                  "\n                                "
                              ),
                            ]
                          },
                        },
                        {
                          key: "cell(logo)",
                          fn: function (row) {
                            return [
                              _c("img", {
                                staticClass: "rounded",
                                attrs: {
                                  src: row.item.logo
                                    ? _vm.$storageUrl + row.item.logo
                                    : _vm.$placeholderImage,
                                  height: "40",
                                },
                              }),
                            ]
                          },
                        },
                        {
                          key: "cell(is_default)",
                          fn: function (row) {
                            return [
                              row.item.is_default == 1
                                ? _c(
                                    "span",
                                    { staticClass: "badge bg-success" },
                                    [_vm._v(_vm._s(_vm.__("yes")))]
                                  )
                                : _c(
                                    "span",
                                    { staticClass: "badge bg-danger" },
                                    [_vm._v(_vm._s(_vm.__("no")))]
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
                                : _vm._e(),
                              _vm._v(" "),
                              row.item.status == 0
                                ? _c(
                                    "span",
                                    { staticClass: "badge bg-danger" },
                                    [_vm._v(_vm._s(_vm.__("deactive")))]
                                  )
                                : _vm._e(),
                            ]
                          },
                        },
                        {
                          key: "cell(actions)",
                          fn: function (row) {
                            return [
                              _c("div", { staticClass: "d-flex gap-2" }, [
                                _vm.$can("country_update")
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
                                    )
                                  : _vm._e(),
                                _vm._v(" "),
                                _vm.$can("country_delete")
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
                                    )
                                  : _vm._e(),
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
                  ],
                  1
                ),
              ]),
            ]),
          ]),
        ]),
      ]),
      _vm._v(" "),
      _vm.create_new || _vm.edit_record
        ? _c("app-edit-record", {
            attrs: {
              record: _vm.edit_record,
              globalColors: _vm.globalSettings,
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



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Countries/Edit.vue?vue&type=template&id=734c5df8&scoped=true":
/*!********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Countries/Edit.vue?vue&type=template&id=734c5df8&scoped=true ***!
  \********************************************************************************************************************************************************************************************************************************/
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
            [_vm._v("\n            " + _vm._s(_vm.__("cancel")) + "\n        ")]
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
              _vm._v(
                "\n            " + _vm._s(_vm.__("save")) + "\n            "
              ),
              _vm.isLoading
                ? _c("b-spinner", { attrs: { small: "" } })
                : _vm._e(),
            ],
            1
          ),
        ],
        1
      ),
      _vm._v(" "),
      _vm.isLoadingData
        ? _c(
            "div",
            { staticClass: "text-center p-5" },
            [_c("b-spinner", { attrs: { label: "Loading..." } })],
            1
          )
        : _vm._e(),
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
          _vm.languages.length > 0
            ? _c(
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
                                      "\n                        " +
                                        _vm._s(language.name) +
                                        "\n                    "
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
                      language.is_default && _vm.languages.length > 1
                        ? _c(
                            "div",
                            { staticClass: "mb-3 d-flex flex-wrap gap-2" },
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
                                      return _vm.translateEmpty(language)
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
                                      return _vm.translateOverwrite(language)
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
                              _vm._v(" "),
                              _vm.translateSuccessMessage
                                ? _c(
                                    "div",
                                    {
                                      staticClass:
                                        "text-success w-100 font-weight-bold",
                                    },
                                    [
                                      _vm._v(
                                        "\n                        " +
                                          _vm._s(_vm.translateSuccessMessage) +
                                          "\n                    "
                                      ),
                                    ]
                                  )
                                : _vm._e(),
                            ],
                            1
                          )
                        : _vm._e(),
                      _vm._v(" "),
                      _c(
                        "div",
                        { staticClass: "row" },
                        [
                          _c("div", { staticClass: "form-group col-md-12" }, [
                            _c("label", [
                              _vm._v(_vm._s(_vm.__("name")) + " "),
                              language.is_default
                                ? _c("span", { staticClass: "text-danger" }, [
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
                                  value: _vm.translations[language.id].name,
                                  expression: "translations[language.id].name",
                                },
                              ],
                              staticClass: "form-control",
                              attrs: {
                                type: "text",
                                required:
                                  language.is_default == 1 ? true : undefined,
                                placeholder: _vm.__("name"),
                              },
                              domProps: {
                                value: _vm.translations[language.id].name,
                              },
                              on: {
                                input: function ($event) {
                                  if ($event.target.composing) {
                                    return
                                  }
                                  _vm.$set(
                                    _vm.translations[language.id],
                                    "name",
                                    $event.target.value
                                  )
                                },
                              },
                            }),
                          ]),
                          _vm._v(" "),
                          language.is_default
                            ? [
                                _c(
                                  "div",
                                  { staticClass: "form-group col-md-6" },
                                  [
                                    _c("label", [
                                      _vm._v(_vm._s(_vm.__("dial_code")) + " "),
                                      _c(
                                        "span",
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
                                          value: _vm.dial_code,
                                          expression: "dial_code",
                                        },
                                      ],
                                      staticClass: "form-control",
                                      attrs: {
                                        type: "text",
                                        required: "",
                                        placeholder: _vm.__("dial_code"),
                                      },
                                      domProps: { value: _vm.dial_code },
                                      on: {
                                        input: function ($event) {
                                          if ($event.target.composing) {
                                            return
                                          }
                                          _vm.dial_code = $event.target.value
                                        },
                                      },
                                    }),
                                  ]
                                ),
                                _vm._v(" "),
                                _c(
                                  "div",
                                  { staticClass: "form-group col-md-6" },
                                  [
                                    _c("label", [
                                      _vm._v(_vm._s(_vm.__("code")) + " "),
                                      _c(
                                        "span",
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
                                          value: _vm.code,
                                          expression: "code",
                                        },
                                      ],
                                      staticClass: "form-control",
                                      attrs: {
                                        type: "text",
                                        required: "",
                                        placeholder: _vm.__("code"),
                                      },
                                      domProps: { value: _vm.code },
                                      on: {
                                        input: function ($event) {
                                          if ($event.target.composing) {
                                            return
                                          }
                                          _vm.code = $event.target.value
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
                                      "col-md-12 d-flex flex-wrap gap-3",
                                  },
                                  [
                                    _c(
                                      "div",
                                      {
                                        staticClass:
                                          "form-group flex-fill logo-status-col",
                                      },
                                      [
                                        _c(
                                          "label",
                                          { staticClass: "d-block" },
                                          [
                                            _vm._v(
                                              _vm._s(_vm.__("logo")) + " "
                                            ),
                                            _c(
                                              "span",
                                              { staticClass: "text-danger" },
                                              [_vm._v("*")]
                                            ),
                                          ]
                                        ),
                                        _vm._v(" "),
                                        _vm.logoError
                                          ? _c(
                                              "span",
                                              { staticClass: "error" },
                                              [_vm._v(_vm._s(_vm.logoError))]
                                            )
                                          : _vm._e(),
                                        _vm._v(" "),
                                        _c("input", {
                                          ref: "file_image",
                                          refInFor: true,
                                          staticClass: "file-input",
                                          attrs: {
                                            type: "file",
                                            name: "country_logo",
                                            accept: "image/*",
                                          },
                                          on: { change: _vm.handleFileUpload },
                                        }),
                                        _vm._v(" "),
                                        _c(
                                          "div",
                                          {
                                            staticClass:
                                              "file-input-div bg-gray-100",
                                            on: {
                                              click: _vm.triggerLogoClick,
                                              drop: _vm.dropLogoFile,
                                              dragover: _vm.$dragoverFile,
                                              dragleave: _vm.$dragleaveFile,
                                            },
                                          },
                                          [
                                            _vm.logo && _vm.logo.name
                                              ? [
                                                  _c("label", [
                                                    _vm._v(
                                                      _vm._s(
                                                        _vm.__(
                                                          "selected_file_name"
                                                        )
                                                      ) +
                                                        " " +
                                                        _vm._s(_vm.logo.name)
                                                    ),
                                                  ]),
                                                ]
                                              : [
                                                  _c("label", [
                                                    _c("i", {
                                                      staticClass:
                                                        "fa fa-cloud-upload-alt fa-2x",
                                                    }),
                                                  ]),
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
                                                ],
                                          ],
                                          2
                                        ),
                                        _vm._v(" "),
                                        _vm.logo_url
                                          ? _c("div", { staticClass: "mt-2" }, [
                                              _c("img", {
                                                staticClass:
                                                  "img-thumbnail custom-image",
                                                attrs: {
                                                  src: _vm.logo_url,
                                                  width: "120",
                                                },
                                              }),
                                            ])
                                          : _vm._e(),
                                      ]
                                    ),
                                    _vm._v(" "),
                                    _vm.id
                                      ? _c(
                                          "div",
                                          {
                                            staticClass:
                                              "form-group flex-fill logo-status-col",
                                          },
                                          [
                                            _c(
                                              "label",
                                              { staticClass: "d-block" },
                                              [_vm._v(_vm._s(_vm.__("status")))]
                                            ),
                                            _vm._v(" "),
                                            _c("b-form-radio-group", {
                                              staticClass: "d-block mt-1",
                                              attrs: {
                                                options: [
                                                  {
                                                    text: _vm.__("deactive"),
                                                    value: 0,
                                                  },
                                                  {
                                                    text: _vm.__("active"),
                                                    value: 1,
                                                  },
                                                ],
                                                buttons: "",
                                                "button-variant":
                                                  "outline-primary",
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
                                        )
                                      : _vm._e(),
                                  ]
                                ),
                                _vm._v(" "),
                                _vm.globalColors &&
                                _vm.globalColors
                                  .country_background_color_mode === "item-wise"
                                  ? _c(
                                      "div",
                                      { staticClass: "form-group col-md-6" },
                                      [
                                        _c("label", [
                                          _vm._v(
                                            _vm._s(
                                              _vm.__(
                                                "background_color_for_light_theme"
                                              )
                                            )
                                          ),
                                        ]),
                                        _vm._v(" "),
                                        _c(
                                          "div",
                                          {
                                            staticClass:
                                              "d-flex flex-wrap align-items-center gap-2",
                                          },
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
                                              staticClass:
                                                "form-control color-text-input",
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
                                                "form-control cursor-pointer color-swatch-input",
                                              attrs: { type: "color" },
                                              domProps: {
                                                value:
                                                  _vm.background_color_for_light_theme &&
                                                  _vm.background_color_for_light_theme.startsWith(
                                                    "#"
                                                  ) &&
                                                  (_vm
                                                    .background_color_for_light_theme
                                                    .length === 4 ||
                                                    _vm
                                                      .background_color_for_light_theme
                                                      .length === 7 ||
                                                    _vm
                                                      .background_color_for_light_theme
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
                                                  "\n                                    " +
                                                    _vm._s(
                                                      _vm.__("transparent") ||
                                                        "Transparent"
                                                    ) +
                                                    "\n                                "
                                                ),
                                              ]
                                            ),
                                          ],
                                          1
                                        ),
                                        _vm._v(" "),
                                        _c(
                                          "small",
                                          {
                                            staticClass:
                                              "text-muted d-block mt-1",
                                          },
                                          [
                                            _vm._v(
                                              "Note: Plain bg and bg less that's bg set perfectly category wise. That selected bg set in app and web cat image bg colur."
                                            ),
                                          ]
                                        ),
                                      ]
                                    )
                                  : _vm._e(),
                                _vm._v(" "),
                                _vm.globalColors &&
                                _vm.globalColors
                                  .country_background_color_mode === "item-wise"
                                  ? _c(
                                      "div",
                                      { staticClass: "form-group col-md-6" },
                                      [
                                        _c("label", [
                                          _vm._v(
                                            _vm._s(
                                              _vm.__(
                                                "background_color_for_dark_theme"
                                              )
                                            )
                                          ),
                                        ]),
                                        _vm._v(" "),
                                        _c(
                                          "div",
                                          {
                                            staticClass:
                                              "d-flex flex-wrap align-items-center gap-2",
                                          },
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
                                              staticClass:
                                                "form-control color-text-input",
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
                                                "form-control cursor-pointer color-swatch-input",
                                              attrs: { type: "color" },
                                              domProps: {
                                                value:
                                                  _vm.background_color_for_dark_theme &&
                                                  _vm.background_color_for_dark_theme.startsWith(
                                                    "#"
                                                  ) &&
                                                  (_vm
                                                    .background_color_for_dark_theme
                                                    .length === 4 ||
                                                    _vm
                                                      .background_color_for_dark_theme
                                                      .length === 7 ||
                                                    _vm
                                                      .background_color_for_dark_theme
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
                                                  "\n                                    " +
                                                    _vm._s(
                                                      _vm.__("transparent") ||
                                                        "Transparent"
                                                    ) +
                                                    "\n                                "
                                                ),
                                              ]
                                            ),
                                          ],
                                          1
                                        ),
                                        _vm._v(" "),
                                        _c(
                                          "small",
                                          {
                                            staticClass:
                                              "text-muted d-block mt-1",
                                          },
                                          [
                                            _vm._v(
                                              "Note: Plain bg and bg less that's bg set perfectly category wise. That selected bg set in app and web cat image bg colur."
                                            ),
                                          ]
                                        ),
                                      ]
                                    )
                                  : _vm._e(),
                              ]
                            : _vm._e(),
                        ],
                        2
                      ),
                    ]
                  )
                }),
                1
              )
            : _vm._e(),
          _vm._v(" "),
          _c("button", { ref: "dummy_submit", staticClass: "d-none" }),
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