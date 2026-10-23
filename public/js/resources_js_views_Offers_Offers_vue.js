"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_views_Offers_Offers_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Offers/Edit.vue?vue&type=script&lang=js":
/*!************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Offers/Edit.vue?vue&type=script&lang=js ***!
  \************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
  props: ['record', 'sections', 'categories', 'products'],
  data: function data() {
    return {
      isLoading: false,
      id: this.record ? this.record.id : null,
      type: this.record ? this.record.type : 'default',
      type_id: this.record ? this.record.type_id : "",
      offer_url: this.record ? this.record.offer_url : "",
      image: this.record ? this.record.image : "",
      image_url: this.record ? this.record.image_url : "",
      position: this.record ? this.record.position : "top",
      section_id: this.record ? this.record.section_position : "",
      error: null
    };
  },
  computed: {
    modal_title: function modal_title() {
      var title = this.id ? __('edit') : __('add');
      title += ' ';
      title += __('offers_images');
      return title;
    }
  },
  methods: {
    showModal: function showModal() {
      this.$refs['my-modal'].show();
    },
    hideModal: function hideModal() {
      this.$refs['my-modal'].hide();
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
      var file = this.$refs.file_image.files[0];

      // Reset previous error message
      this.error = null;

      // Check if a file was selected
      if (!file) return;

      // Perform image validation
      var validTypes = ["image/jpeg", "image/png", "image/jpg", "image/gif", "image/webp"];
      if (!validTypes.includes(file.type)) {
        this.error = "Invalid file type. Please upload a JPEG, PNG, JPG,  GIF or WEBP image.";
        return;
      }
      var maxSize = 2 * 1024 * 1024; // 2MB
      if (file.size > maxSize) {
        this.error = "File size exceeds the maximum allowed limit (2MB).";
        return;
      }

      // Create a URL for the uploaded image and display it
      this.imageUrl = URL.createObjectURL(file);
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
      formData.append('image', this.image);
      formData.append('type', this.type);
      formData.append('type_id', this.type_id);
      formData.append('offer_url', this.offer_url);
      formData.append('position', this.position);
      formData.append('section_id', this.section_id);
      var url = this.$apiUrl + '/offers/save';
      if (this.id) {
        url = this.$apiUrl + '/offers/update';
      }
      axios__WEBPACK_IMPORTED_MODULE_0___default().post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(function (res) {
        var data = res.data;
        if (data.status === 1) {
          _this.$eventBus.$emit('offerSaved', data.message);
          vm.$router.push({
            path: '/offers'
          });
          _this.hideModal();
        } else {
          vm.showError(data.message);
          vm.isLoading = false;
        }
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
    }
  },
  mounted: function mounted() {
    this.showModal();
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Offers/Offers.vue?vue&type=script&lang=js":
/*!**************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Offers/Offers.vue?vue&type=script&lang=js ***!
  \**************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Edit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Edit */ "./resources/js/views/Offers/Edit.vue");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _mixins_ViewModeMixin__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../mixins/ViewModeMixin */ "./resources/js/mixins/ViewModeMixin.js");
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




/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  mixins: [_mixins_ViewModeMixin__WEBPACK_IMPORTED_MODULE_2__["default"]],
  components: {
    'app-edit-record': _Edit__WEBPACK_IMPORTED_MODULE_0__["default"]
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
        key: 'type',
        label: __('type'),
        sortable: true,
        "class": 'text-center'
      }, {
        key: 'type_name',
        label: __('name'),
        sortable: true,
        "class": 'text-center'
      }, {
        key: 'image',
        label: __('image'),
        "class": 'text-center'
      }, {
        key: 'position',
        label: __('position'),
        "class": 'text-center'
      }, {
        key: 'section_position',
        label: __('select_position'),
        "class": 'text-center'
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
      offers: [],
      sections: [],
      categories: [],
      products: [],
      visibleOfferId: null,
      // Language handling for translations
      currentLanguageId: null,
      activeLanguages: []
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
    },
    // Grid view rows: translatedOffers with the list view's search + sort applied
    gridOffers: function gridOffers() {
      return this.gridFilterSort(this.translatedOffers, this.filterOn);
    },
    // Computed property to translate offers for datatable
    translatedOffers: function translatedOffers() {
      var _this = this;
      if (!this.currentLanguageId || this.offers.length === 0) {
        return this.offers;
      }
      return this.offers.map(function (offer) {
        var translatedOffer = _objectSpread({}, offer);
        // Update type_name using our translation method
        translatedOffer.type_name = _this.getTranslatedTypeName(offer);
        // Unified accordion status
        translatedOffer._showDetails = offer.id === _this.visibleOfferId;
        return translatedOffer;
      });
    },
    // Computed property to translate products for dropdown
    translatedProducts: function translatedProducts() {
      var _this2 = this;
      if (!this.currentLanguageId || this.products.length === 0) {
        return this.products;
      }

      // Get default language ID for fallback
      var defaultLanguage = this.activeLanguages.find(function (lang) {
        return lang.is_default === 1;
      });
      var defaultLanguageId = defaultLanguage ? defaultLanguage.id : null;
      return this.products.map(function (product) {
        var translatedProduct = _objectSpread({}, product);
        var translatedName = product.name; // Fallback to main table name

        if (product.translations && Array.isArray(product.translations)) {
          // First try to find translation for current language
          var translation = product.translations.find(function (t) {
            return t.language_id === _this2.currentLanguageId;
          });

          // If not found, try default language
          if (!translation && defaultLanguageId) {
            translation = product.translations.find(function (t) {
              return t.language_id === defaultLanguageId;
            });
          }

          // Use translation name if available and not empty
          if (translation && translation.name && translation.name.trim() !== '') {
            translatedName = translation.name;
          }
        }
        translatedProduct.name = translatedName;
        return translatedProduct;
      });
    },
    // Computed property to translate categories for dropdown
    translatedCategories: function translatedCategories() {
      var _this3 = this;
      if (!this.currentLanguageId || this.categories.length === 0) {
        return this.categories;
      }

      // Get default language ID for fallback
      var defaultLanguage = this.activeLanguages.find(function (lang) {
        return lang.is_default === 1;
      });
      var defaultLanguageId = defaultLanguage ? defaultLanguage.id : null;
      return this.categories.map(function (category) {
        var translatedCategory = _objectSpread({}, category);
        var translatedName = category.name; // Fallback to main table name

        if (category.translations && Array.isArray(category.translations)) {
          // First try to find translation for current language
          var translation = category.translations.find(function (t) {
            return t.language_id === _this3.currentLanguageId;
          });

          // If not found, try default language
          if (!translation && defaultLanguageId) {
            translation = category.translations.find(function (t) {
              return t.language_id === defaultLanguageId;
            });
          }

          // Use translation name if available and not empty
          if (translation && translation.name && translation.name.trim() !== '') {
            translatedName = translation.name;
          }
        }
        translatedCategory.name = translatedName;
        return translatedCategory;
      });
    }
  },
  mounted: function mounted() {
    // Set the initial number of items
    this.totalRows = this.offers.length;
  },
  watch: {
    $route: function $route(to, from) {
      this.showCreateModal();
    },
    perPage: function perPage() {
      this.currentPage = 1;
    }
  },
  created: function created() {
    var _this4 = this;
    this.showCreateModal();
    this.$eventBus.$on('offerSaved', function (message) {
      _this4.showMessage("success", message);
      _this4.getOffers();
      _this4.create_new = null;
    });
    // Load languages first so we know currentLanguageId before mapping translations
    this.fetchActiveLanguages().then(function () {
      _this4.getOffers();
      _this4.getCategories();
      _this4.getProducts();
    })["catch"](function () {
      _this4.getOffers();
      _this4.getCategories();
      _this4.getProducts();
    });
  },
  methods: {
    // Fetch active languages and set current language ID
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
    // Get translated type name (product or category name) with fallback logic
    getTranslatedTypeName: function getTranslatedTypeName(offer) {
      var _this6 = this;
      // If no language is set yet, return the base name
      if (!this.currentLanguageId || !this.activeLanguages.length) {
        return offer.type_name || '';
      }

      // Get default language ID for fallback
      var defaultLanguage = this.activeLanguages.find(function (lang) {
        return lang.is_default === 1;
      });
      var defaultLanguageId = defaultLanguage ? defaultLanguage.id : null;

      // Handle product type
      if (offer.type === 'product' && offer.product) {
        // Check if translations array exists
        if (offer.product.translations && Array.isArray(offer.product.translations) && offer.product.translations.length > 0) {
          // First try to find translation for current language
          var translation = offer.product.translations.find(function (t) {
            return t.language_id === _this6.currentLanguageId;
          });

          // If not found, try default language
          if (!translation && defaultLanguageId) {
            translation = offer.product.translations.find(function (t) {
              return t.language_id === defaultLanguageId;
            });
          }

          // Use translation name if available and not empty
          if (translation && translation.name && translation.name.trim() !== '') {
            return translation.name;
          }
        }
        // Fallback to product name or type_name
        return offer.product.name || offer.type_name || '';
      }
      // Handle category type
      else if (offer.type === 'category' && offer.category) {
        // Check if translations array exists
        if (offer.category.translations && Array.isArray(offer.category.translations) && offer.category.translations.length > 0) {
          // First try to find translation for current language
          var _translation = offer.category.translations.find(function (t) {
            return t.language_id === _this6.currentLanguageId;
          });

          // If not found, try default language
          if (!_translation && defaultLanguageId) {
            _translation = offer.category.translations.find(function (t) {
              return t.language_id === defaultLanguageId;
            });
          }

          // Use translation name if available and not empty
          if (_translation && _translation.name && _translation.name.trim() !== '') {
            return _translation.name;
          }
        }
        // Fallback to category name or type_name
        return offer.category.name || offer.type_name || '';
      }

      // Fallback to type_name for other types (offer_url, default, etc.)
      return offer.type_name || '';
    },
    getOffers: function getOffers() {
      var _this7 = this;
      this.isLoading = true;
      axios__WEBPACK_IMPORTED_MODULE_1___default().get(this.$apiUrl + '/offers').then(function (response) {
        _this7.isLoading = false;
        // Ensure offers have proper structure with translations
        _this7.offers = (response.data.data.offers || []).map(function (offer) {
          // Ensure product and category objects exist and have translations
          if (offer.product && !offer.product.translations) {
            offer.product.translations = [];
          }
          if (offer.category && !offer.category.translations) {
            offer.category.translations = [];
          }
          return offer;
        });
        _this7.sections = response.data.data.sections;
        _this7.totalRows = _this7.offers.length;
      });
    },
    getCategories: function getCategories() {
      var _this8 = this;
      this.isLoading = true;
      var url = this.$apiUrl + '/categories?status=1';
      axios__WEBPACK_IMPORTED_MODULE_1___default().get(url).then(function (response) {
        _this8.isLoading = false;
        var data = response.data;
        _this8.categories = data.data;
      });
    },
    getProducts: function getProducts() {
      var _this9 = this;
      this.isLoading = true;
      var url = this.$apiUrl + '/products';
      axios__WEBPACK_IMPORTED_MODULE_1___default().get(url).then(function (response) {
        _this9.isLoading = false;
        var data = response.data;
        _this9.products = data.data.products;
      });
    },
    deleteOffer: function deleteOffer(index, id) {
      var _this10 = this;
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
          _this10.isLoading = true;
          var postData = {
            id: id
          };
          axios__WEBPACK_IMPORTED_MODULE_1___default().post(_this10.$apiUrl + '/offers/delete', postData).then(function (response) {
            _this10.isLoading = false;
            _this10.offers.splice(index, 1);
            _this10.showMessage('success', response.data.message);
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
        path: '/offers'
      });
    },
    // Grid view: same client-side search (b-table :filter / :filter-included-fields) and sort as the list view.
    toggleRowDetails: function toggleRowDetails(row) {
      if (this.visibleOfferId === row.item.id) {
        this.visibleOfferId = null;
      } else {
        this.visibleOfferId = row.item.id;
      }
    },
    handleImageError: function handleImageError(event) {
      if (this.$placeholderImage && event.target.src !== this.$placeholderImage) {
        event.target.src = this.$placeholderImage;
      }
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

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Offers/Edit.vue?vue&type=style&index=0&id=49bee653&scoped=true&lang=css":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Offers/Edit.vue?vue&type=style&index=0&id=49bee653&scoped=true&lang=css ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
___CSS_LOADER_EXPORT___.push([module.id, "\n.custom-image[data-v-49bee653] {\n    display: block;\n    width: 100%;\n    max-width: 520px;\n    aspect-ratio: 1024 / 200;\n    height: auto;\n    -o-object-fit: cover;\n       object-fit: cover;\n    border-radius: var(--ui-radius-lg);\n    border: 1px solid var(--ui-border);\n    background: var(--ui-surface-muted);\n}\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Offers/Offers.vue?vue&type=style&index=0&id=a8b799c0&scoped=true&lang=css":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Offers/Offers.vue?vue&type=style&index=0&id=a8b799c0&scoped=true&lang=css ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
___CSS_LOADER_EXPORT___.push([module.id, "\n.offer-thumb[data-v-a8b799c0] {\n    width: 96px;\n    aspect-ratio: 16 / 9;\n    height: auto;\n    -o-object-fit: cover;\n       object-fit: cover;\n    border-radius: var(--ui-radius) !important;\n    border: 1px solid var(--ui-border);\n    background: var(--ui-surface-muted);\n}\n.offer-details[data-v-a8b799c0] {\n    background: var(--ui-surface-muted) !important;\n    border-radius: var(--ui-radius-lg) !important;\n}\n.offer-details .h-line[data-v-a8b799c0] {\n    height: 1px;\n    background: var(--ui-border) !important;\n}\n.offer-details-title[data-v-a8b799c0] {\n    font-size: 15px;\n    font-weight: 700;\n    color: var(--ui-heading);\n}\n.offer-details-title .fa[data-v-a8b799c0] {\n    color: var(--theme-primary-600);\n}\n.offer-detail-value[data-v-a8b799c0] {\n    font-size: 13px;\n    color: var(--ui-text);\n}\n.offer-details-img[data-v-a8b799c0] {\n    max-height: 250px;\n}\n\n/* Grid view: inline details (same fields as the list view's row details) */\n.offer-card-details[data-v-a8b799c0] {\n    margin-top: 8px;\n    padding: 10px 12px;\n    border-radius: var(--ui-radius);\n    background: var(--ui-surface-muted);\n    border: 1px solid var(--ui-border);\n    display: grid;\n    gap: 6px;\n}\n.offer-card-details > div[data-v-a8b799c0] {\n    display: flex;\n    justify-content: space-between;\n    gap: 12px;\n    min-width: 0;\n}\n.offer-card-details dt[data-v-a8b799c0] {\n    font-size: 11px;\n    font-weight: 600;\n    text-transform: uppercase;\n    color: var(--ui-text-muted);\n    flex-shrink: 0;\n}\n.offer-card-details dd[data-v-a8b799c0] {\n    margin: 0;\n    font-size: 12px;\n    color: var(--ui-text);\n    text-align: right;\n    min-width: 0;\n    overflow-wrap: anywhere;\n}\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Offers/Edit.vue?vue&type=style&index=0&id=49bee653&scoped=true&lang=css":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Offers/Edit.vue?vue&type=style&index=0&id=49bee653&scoped=true&lang=css ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Edit_vue_vue_type_style_index_0_id_49bee653_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Edit.vue?vue&type=style&index=0&id=49bee653&scoped=true&lang=css */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Offers/Edit.vue?vue&type=style&index=0&id=49bee653&scoped=true&lang=css");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Edit_vue_vue_type_style_index_0_id_49bee653_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Edit_vue_vue_type_style_index_0_id_49bee653_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Offers/Offers.vue?vue&type=style&index=0&id=a8b799c0&scoped=true&lang=css":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Offers/Offers.vue?vue&type=style&index=0&id=a8b799c0&scoped=true&lang=css ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Offers_vue_vue_type_style_index_0_id_a8b799c0_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Offers.vue?vue&type=style&index=0&id=a8b799c0&scoped=true&lang=css */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Offers/Offers.vue?vue&type=style&index=0&id=a8b799c0&scoped=true&lang=css");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Offers_vue_vue_type_style_index_0_id_a8b799c0_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Offers_vue_vue_type_style_index_0_id_a8b799c0_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./resources/js/views/Offers/Edit.vue":
/*!********************************************!*\
  !*** ./resources/js/views/Offers/Edit.vue ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Edit_vue_vue_type_template_id_49bee653_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Edit.vue?vue&type=template&id=49bee653&scoped=true */ "./resources/js/views/Offers/Edit.vue?vue&type=template&id=49bee653&scoped=true");
/* harmony import */ var _Edit_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Edit.vue?vue&type=script&lang=js */ "./resources/js/views/Offers/Edit.vue?vue&type=script&lang=js");
/* harmony import */ var _Edit_vue_vue_type_style_index_0_id_49bee653_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Edit.vue?vue&type=style&index=0&id=49bee653&scoped=true&lang=css */ "./resources/js/views/Offers/Edit.vue?vue&type=style&index=0&id=49bee653&scoped=true&lang=css");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _Edit_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _Edit_vue_vue_type_template_id_49bee653_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render,
  _Edit_vue_vue_type_template_id_49bee653_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "49bee653",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/Offers/Edit.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/views/Offers/Offers.vue":
/*!**********************************************!*\
  !*** ./resources/js/views/Offers/Offers.vue ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Offers_vue_vue_type_template_id_a8b799c0_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Offers.vue?vue&type=template&id=a8b799c0&scoped=true */ "./resources/js/views/Offers/Offers.vue?vue&type=template&id=a8b799c0&scoped=true");
/* harmony import */ var _Offers_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Offers.vue?vue&type=script&lang=js */ "./resources/js/views/Offers/Offers.vue?vue&type=script&lang=js");
/* harmony import */ var _Offers_vue_vue_type_style_index_0_id_a8b799c0_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Offers.vue?vue&type=style&index=0&id=a8b799c0&scoped=true&lang=css */ "./resources/js/views/Offers/Offers.vue?vue&type=style&index=0&id=a8b799c0&scoped=true&lang=css");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _Offers_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _Offers_vue_vue_type_template_id_a8b799c0_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render,
  _Offers_vue_vue_type_template_id_a8b799c0_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "a8b799c0",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/Offers/Offers.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/views/Offers/Edit.vue?vue&type=script&lang=js":
/*!********************************************************************!*\
  !*** ./resources/js/views/Offers/Edit.vue?vue&type=script&lang=js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Edit_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Edit.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Offers/Edit.vue?vue&type=script&lang=js");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Edit_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/Offers/Offers.vue?vue&type=script&lang=js":
/*!**********************************************************************!*\
  !*** ./resources/js/views/Offers/Offers.vue?vue&type=script&lang=js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Offers_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Offers.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Offers/Offers.vue?vue&type=script&lang=js");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Offers_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/Offers/Edit.vue?vue&type=style&index=0&id=49bee653&scoped=true&lang=css":
/*!****************************************************************************************************!*\
  !*** ./resources/js/views/Offers/Edit.vue?vue&type=style&index=0&id=49bee653&scoped=true&lang=css ***!
  \****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Edit_vue_vue_type_style_index_0_id_49bee653_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/style-loader/dist/cjs.js!../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Edit.vue?vue&type=style&index=0&id=49bee653&scoped=true&lang=css */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Offers/Edit.vue?vue&type=style&index=0&id=49bee653&scoped=true&lang=css");


/***/ }),

/***/ "./resources/js/views/Offers/Offers.vue?vue&type=style&index=0&id=a8b799c0&scoped=true&lang=css":
/*!******************************************************************************************************!*\
  !*** ./resources/js/views/Offers/Offers.vue?vue&type=style&index=0&id=a8b799c0&scoped=true&lang=css ***!
  \******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Offers_vue_vue_type_style_index_0_id_a8b799c0_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/style-loader/dist/cjs.js!../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Offers.vue?vue&type=style&index=0&id=a8b799c0&scoped=true&lang=css */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Offers/Offers.vue?vue&type=style&index=0&id=a8b799c0&scoped=true&lang=css");


/***/ }),

/***/ "./resources/js/views/Offers/Edit.vue?vue&type=template&id=49bee653&scoped=true":
/*!**************************************************************************************!*\
  !*** ./resources/js/views/Offers/Edit.vue?vue&type=template&id=49bee653&scoped=true ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Edit_vue_vue_type_template_id_49bee653_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   staticRenderFns: () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Edit_vue_vue_type_template_id_49bee653_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Edit_vue_vue_type_template_id_49bee653_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Edit.vue?vue&type=template&id=49bee653&scoped=true */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Offers/Edit.vue?vue&type=template&id=49bee653&scoped=true");


/***/ }),

/***/ "./resources/js/views/Offers/Offers.vue?vue&type=template&id=a8b799c0&scoped=true":
/*!****************************************************************************************!*\
  !*** ./resources/js/views/Offers/Offers.vue?vue&type=template&id=a8b799c0&scoped=true ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Offers_vue_vue_type_template_id_a8b799c0_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   staticRenderFns: () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Offers_vue_vue_type_template_id_a8b799c0_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Offers_vue_vue_type_template_id_a8b799c0_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Offers.vue?vue&type=template&id=a8b799c0&scoped=true */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Offers/Offers.vue?vue&type=template&id=a8b799c0&scoped=true");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Offers/Edit.vue?vue&type=template&id=49bee653&scoped=true":
/*!*****************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Offers/Edit.vue?vue&type=template&id=49bee653&scoped=true ***!
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
          on: {
            submit: function ($event) {
              $event.preventDefault()
              return _vm.saveRecord.apply(null, arguments)
            },
          },
        },
        [
          _c("div", { staticClass: "row" }, [
            _c("div", { staticClass: "form-group col-12 col-md-6" }, [
              _c("label", [_vm._v(_vm._s(_vm.__("type")))]),
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
                  _c("option", { attrs: { value: "default" } }, [
                    _vm._v(" " + _vm._s(_vm.__("default"))),
                  ]),
                  _vm._v(" "),
                  _c("option", { attrs: { value: "category" } }, [
                    _vm._v(" " + _vm._s(_vm.__("category"))),
                  ]),
                  _vm._v(" "),
                  _c("option", { attrs: { value: "product" } }, [
                    _vm._v(" " + _vm._s(_vm.__("product"))),
                  ]),
                  _vm._v(" "),
                  _c("option", { attrs: { value: "offer_url" } }, [
                    _vm._v(" " + _vm._s(_vm.__("offer_url"))),
                  ]),
                ]
              ),
            ]),
            _vm._v(" "),
            _vm.type == "category"
              ? _c("div", { staticClass: "form-group col-12 col-md-6" }, [
                  _c("label", [_vm._v(_vm._s(_vm.__("category")))]),
                  _vm._v(" "),
                  _c(
                    "select",
                    {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: _vm.type_id,
                          expression: "type_id",
                        },
                      ],
                      staticClass: "form-control form-select",
                      attrs: { required: "" },
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
                          _vm.type_id = $event.target.multiple
                            ? $$selectedVal
                            : $$selectedVal[0]
                        },
                      },
                    },
                    [
                      _c("option", { attrs: { value: "" } }, [
                        _vm._v(_vm._s(_vm.__("select_category"))),
                      ]),
                      _vm._v(" "),
                      _vm._l(_vm.categories, function (category) {
                        return _c(
                          "option",
                          { domProps: { value: category.id } },
                          [_vm._v(_vm._s(category.name))]
                        )
                      }),
                    ],
                    2
                  ),
                ])
              : _vm._e(),
            _vm._v(" "),
            _vm.type == "product"
              ? _c("div", { staticClass: "form-group col-12 col-md-6" }, [
                  _c("label", [_vm._v(_vm._s(_vm.__("products")))]),
                  _vm._v(" "),
                  _c(
                    "select",
                    {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: _vm.type_id,
                          expression: "type_id",
                        },
                      ],
                      staticClass: "form-control form-select",
                      attrs: { required: "" },
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
                          _vm.type_id = $event.target.multiple
                            ? $$selectedVal
                            : $$selectedVal[0]
                        },
                      },
                    },
                    [
                      _c("option", { attrs: { value: "" } }, [
                        _vm._v(" " + _vm._s(_vm.__("select_product"))),
                      ]),
                      _vm._v(" "),
                      _vm._l(_vm.products, function (product) {
                        return _c(
                          "option",
                          { domProps: { value: product.id } },
                          [_vm._v(_vm._s(product.name))]
                        )
                      }),
                    ],
                    2
                  ),
                ])
              : _vm._e(),
            _vm._v(" "),
            _vm.type == "offer_url"
              ? _c("div", { staticClass: "form-group col-12 col-md-6" }, [
                  _c("label", [_vm._v(_vm._s(_vm.__("link")))]),
                  _vm._v(" "),
                  _c("input", {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model",
                        value: _vm.offer_url,
                        expression: "offer_url",
                      },
                    ],
                    staticClass: "form-control",
                    attrs: {
                      type: "url",
                      placeholder: "Enter Link",
                      required: "",
                    },
                    domProps: { value: _vm.offer_url },
                    on: {
                      input: function ($event) {
                        if ($event.target.composing) {
                          return
                        }
                        _vm.offer_url = $event.target.value
                      },
                    },
                  }),
                ])
              : _vm._e(),
            _vm._v(" "),
            _c("div", { staticClass: "form-group col-12" }, [
              _c("label", { attrs: { for: "offer_image" } }, [
                _vm._v(_vm._s(_vm.__("offer_image")) + " "),
                _c("i", { staticClass: "text-danger" }, [_vm._v("*")]),
              ]),
              _vm._v(" "),
              _c("p", { staticClass: "text-muted small mb-2" }, [
                _vm._v(
                  _vm._s(_vm.__("image_prefer_size_1024px_width_200px_height"))
                ),
              ]),
              _vm._v(" "),
              _vm.error
                ? _c("span", { staticClass: "error" }, [
                    _vm._v(_vm._s(_vm.error)),
                  ])
                : _vm._e(),
              _vm._v(" "),
              _c("input", {
                ref: "file_image",
                staticClass: "file-input",
                attrs: {
                  type: "file",
                  name: "offer_image",
                  accept: "image/*",
                  id: "offer_image",
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
                            _vm._s(_vm.__("selected_file_name")) +
                              " " +
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
                            _vm._s(_vm.__("drop_files_here_or_click_to_upload"))
                          ),
                        ]),
                      ],
                ],
                2
              ),
              _vm._v(" "),
              _vm.image_url
                ? _c("div", { staticClass: "row mt-3" }, [
                    _c("div", { staticClass: "col-12" }, [
                      _c("img", {
                        staticClass: "custom-image",
                        attrs: {
                          src: _vm.image_url,
                          title: "Offer Image",
                          alt: "Offer Image",
                        },
                      }),
                    ]),
                  ])
                : _vm._e(),
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "form-group col-12 col-md-6" }, [
              _c("label", { attrs: { for: "position" } }, [
                _vm._v(_vm._s(_vm.__("position")) + " "),
                _c("i", { staticClass: "text-danger" }, [_vm._v("*")]),
              ]),
              _vm._v(" "),
              _c(
                "select",
                {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.position,
                      expression: "position",
                    },
                  ],
                  staticClass: "form-control form-select",
                  attrs: { name: "position", id: "position" },
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
                      _vm.position = $event.target.multiple
                        ? $$selectedVal
                        : $$selectedVal[0]
                    },
                  },
                },
                [
                  _c("option", { attrs: { value: "top" } }, [
                    _vm._v(" " + _vm._s(_vm.__("top"))),
                  ]),
                  _vm._v(" "),
                  _c("option", { attrs: { value: "below_slider" } }, [
                    _vm._v(" " + _vm._s(_vm.__("below_slider"))),
                  ]),
                  _vm._v(" "),
                  _c("option", { attrs: { value: "below_category" } }, [
                    _vm._v(" " + _vm._s(_vm.__("below_category"))),
                  ]),
                  _vm._v(" "),
                  _c("option", { attrs: { value: "below_section" } }, [
                    _vm._v(" " + _vm._s(_vm.__("below_section"))),
                  ]),
                ]
              ),
            ]),
            _vm._v(" "),
            _vm.position === "below_section"
              ? _c("div", { staticClass: "form-group col-12 col-md-6" }, [
                  _c("label", { attrs: { for: "section_id" } }, [
                    _vm._v(_vm._s(_vm.__("section_position")) + " "),
                    _c("i", { staticClass: "text-danger" }, [_vm._v("*")]),
                  ]),
                  _vm._v(" "),
                  _c(
                    "select",
                    {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: _vm.section_id,
                          expression: "section_id",
                        },
                      ],
                      staticClass: "form-control form-select",
                      attrs: { name: "section_id", id: "section_id" },
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
                          _vm.section_id = $event.target.multiple
                            ? $$selectedVal
                            : $$selectedVal[0]
                        },
                      },
                    },
                    [
                      _c("option", { attrs: { value: "" } }, [
                        _vm._v(" " + _vm._s(_vm.__("select_section"))),
                      ]),
                      _vm._v(" "),
                      _vm._l(_vm.sections, function (section) {
                        return _c(
                          "option",
                          { domProps: { value: section.id } },
                          [_vm._v(_vm._s(section.title))]
                        )
                      }),
                    ],
                    2
                  ),
                ])
              : _vm._e(),
          ]),
          _vm._v(" "),
          _c("button", {
            ref: "dummy_submit",
            staticStyle: { display: "none" },
          }),
        ]
      ),
    ]
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Offers/Offers.vue?vue&type=template&id=a8b799c0&scoped=true":
/*!*******************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Offers/Offers.vue?vue&type=template&id=a8b799c0&scoped=true ***!
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
              "page-heading d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3",
          },
          [
            _c("h3", { staticClass: "modern-page-title mb-0" }, [
              _vm._v(_vm._s(_vm.__("Manage Offer images"))),
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
                  [_vm._v(_vm._s(_vm.__("Manage Offer images")))]
                ),
              ]),
            ]),
          ]
        ),
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
                                return _vm.getOffers()
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
                          attrs: {
                            role: "group",
                            "aria-label": _vm.__("view"),
                          },
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
                            [
                              _c("i", {
                                staticClass: "bi bi-grid-3x3-gap-fill",
                              }),
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
                              return _vm.getOffers()
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
                      _vm.$can("new_offer_image_create")
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
                              _c("span", [_vm._v(_vm._s(_vm.__("add_offer")))]),
                            ]
                          )
                        : _vm._e(),
                    ]),
                  ]
                ),
                _vm._v(" "),
                _vm.viewMode === "grid"
                  ? _c("div", [
                      _vm.isLoading
                        ? _c("div", { staticClass: "item-grid-state" }, [
                            _c("i", { staticClass: "bi bi-hourglass-split" }),
                            _vm._v(
                              _vm._s(_vm.__("loading")) +
                                "...\n                        "
                            ),
                          ])
                        : !_vm.gridOffers.length
                        ? _c(
                            "div",
                            { staticClass: "item-grid-state" },
                            [
                              _vm.filter && _vm.translatedOffers.length
                                ? [
                                    _c("i", { staticClass: "bi bi-search" }),
                                    _vm._v(
                                      _vm._s(
                                        _vm.__(
                                          "no_records_matching_your_request"
                                        )
                                      )
                                    ),
                                  ]
                                : [
                                    _c("i", { staticClass: "bi bi-inbox" }),
                                    _vm._v(
                                      _vm._s(_vm.__("no_records_to_show"))
                                    ),
                                  ],
                            ],
                            2
                          )
                        : _c(
                            "div",
                            { staticClass: "item-grid item-grid--wide" },
                            _vm._l(
                              _vm.pagedItems(_vm.gridOffers),
                              function (offer) {
                                return _c(
                                  "div",
                                  { key: offer.id, staticClass: "item-card" },
                                  [
                                    _c(
                                      "div",
                                      {
                                        staticClass:
                                          "item-card-media item-card-media--banner item-card-media--cover",
                                      },
                                      [
                                        _c("img", {
                                          attrs: {
                                            src:
                                              offer.image_url ||
                                              _vm.$placeholderImage,
                                            alt: "",
                                          },
                                          on: { error: _vm.handleImageError },
                                        }),
                                        _vm._v(" "),
                                        _c(
                                          "div",
                                          { staticClass: "item-card-badges" },
                                          [
                                            _c(
                                              "span",
                                              { staticClass: "badge bg-info" },
                                              [
                                                _vm._v(
                                                  _vm._s(_vm.__(offer.type))
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
                                      { staticClass: "item-card-body" },
                                      [
                                        _c(
                                          "div",
                                          { staticClass: "item-card-title" },
                                          [
                                            offer.type === "offer_url"
                                              ? [
                                                  _vm._v(
                                                    _vm._s(_vm.__("offer_url"))
                                                  ),
                                                ]
                                              : [
                                                  _vm._v(
                                                    _vm._s(
                                                      _vm.getTranslatedTypeName(
                                                        offer
                                                      ) || _vm.__(offer.type)
                                                    )
                                                  ),
                                                ],
                                          ],
                                          2
                                        ),
                                        _vm._v(" "),
                                        offer.type === "offer_url" &&
                                        offer.offer_url
                                          ? _c(
                                              "div",
                                              { staticClass: "item-card-meta" },
                                              [
                                                _c(
                                                  "a",
                                                  {
                                                    attrs: {
                                                      href: offer.offer_url,
                                                      target: "_blank",
                                                      rel: "noopener",
                                                    },
                                                  },
                                                  [
                                                    _vm._v(
                                                      _vm._s(offer.offer_url)
                                                    ),
                                                  ]
                                                ),
                                              ]
                                            )
                                          : _vm._e(),
                                        _vm._v(" "),
                                        _c(
                                          "div",
                                          { staticClass: "item-card-stats" },
                                          [
                                            offer.position
                                              ? _c(
                                                  "span",
                                                  {
                                                    staticClass:
                                                      "item-card-chip",
                                                  },
                                                  [
                                                    _c("i", {
                                                      staticClass:
                                                        "bi bi-layout-text-window",
                                                    }),
                                                    _vm._v(
                                                      _vm._s(
                                                        _vm.__(offer.position)
                                                      )
                                                    ),
                                                  ]
                                                )
                                              : _vm._e(),
                                            _vm._v(" "),
                                            offer.position ===
                                              "below_section" &&
                                            offer.section_title
                                              ? _c(
                                                  "span",
                                                  {
                                                    staticClass:
                                                      "item-card-chip",
                                                  },
                                                  [
                                                    _vm._v(
                                                      _vm._s(
                                                        offer.section_title
                                                      )
                                                    ),
                                                  ]
                                                )
                                              : _vm._e(),
                                          ]
                                        ),
                                        _vm._v(" "),
                                        _vm.visibleOfferId === offer.id
                                          ? _c(
                                              "dl",
                                              {
                                                staticClass:
                                                  "offer-card-details mb-0",
                                              },
                                              [
                                                _c("div", [
                                                  _c("dt", [
                                                    _vm._v(
                                                      _vm._s(_vm.__("type_id"))
                                                    ),
                                                  ]),
                                                  _c("dd", [
                                                    _vm._v(
                                                      _vm._s(
                                                        offer.type_id || "-"
                                                      )
                                                    ),
                                                  ]),
                                                ]),
                                                _vm._v(" "),
                                                _c("div", [
                                                  _c("dt", [
                                                    _vm._v(
                                                      _vm._s(_vm.__("name"))
                                                    ),
                                                  ]),
                                                  _c("dd", [
                                                    _vm._v(
                                                      _vm._s(
                                                        offer.type_name &&
                                                          offer.type_name.trim() !==
                                                            ""
                                                          ? offer.type_name
                                                          : "-"
                                                      )
                                                    ),
                                                  ]),
                                                ]),
                                                _vm._v(" "),
                                                _c("div", [
                                                  _c("dt", [
                                                    _vm._v(
                                                      _vm._s(_vm.__("slug"))
                                                    ),
                                                  ]),
                                                  _c("dd", [
                                                    _vm._v(
                                                      _vm._s(
                                                        offer.type_slug &&
                                                          offer.type_slug.trim() !==
                                                            ""
                                                          ? offer.type_slug
                                                          : "-"
                                                      )
                                                    ),
                                                  ]),
                                                ]),
                                                _vm._v(" "),
                                                offer.offer_url
                                                  ? _c("div", [
                                                      _c("dt", [_vm._v("URL")]),
                                                      _c("dd", [
                                                        _c(
                                                          "a",
                                                          {
                                                            staticClass:
                                                              "text-break",
                                                            attrs: {
                                                              href: offer.offer_url,
                                                              target: "_blank",
                                                              rel: "noopener",
                                                            },
                                                          },
                                                          [
                                                            _vm._v(
                                                              _vm._s(
                                                                offer.offer_url
                                                              )
                                                            ),
                                                          ]
                                                        ),
                                                      ]),
                                                    ])
                                                  : _vm._e(),
                                                _vm._v(" "),
                                                _c("div", [
                                                  _c("dt", [
                                                    _vm._v(
                                                      _vm._s(_vm.__("position"))
                                                    ),
                                                  ]),
                                                  _c("dd", [
                                                    _vm._v(
                                                      _vm._s(
                                                        offer.position || "-"
                                                      )
                                                    ),
                                                  ]),
                                                ]),
                                                _vm._v(" "),
                                                _c("div", [
                                                  _c("dt", [
                                                    _vm._v(
                                                      _vm._s(
                                                        _vm.__(
                                                          "section_position"
                                                        )
                                                      )
                                                    ),
                                                  ]),
                                                  _c("dd", [
                                                    _vm._v(
                                                      _vm._s(
                                                        offer.section_position ||
                                                          "-"
                                                      )
                                                    ),
                                                  ]),
                                                ]),
                                                _vm._v(" "),
                                                offer.section_title
                                                  ? _c("div", [
                                                      _c("dt", [
                                                        _vm._v(
                                                          _vm._s(
                                                            _vm.__(
                                                              "section_title"
                                                            )
                                                          )
                                                        ),
                                                      ]),
                                                      _c("dd", [
                                                        _vm._v(
                                                          _vm._s(
                                                            offer.section_title
                                                          )
                                                        ),
                                                      ]),
                                                    ])
                                                  : _vm._e(),
                                              ]
                                            )
                                          : _vm._e(),
                                      ]
                                    ),
                                    _vm._v(" "),
                                    _c(
                                      "div",
                                      { staticClass: "item-card-footer" },
                                      [
                                        _c(
                                          "span",
                                          { staticClass: "item-card-meta" },
                                          [_vm._v("#" + _vm._s(offer.id))]
                                        ),
                                        _vm._v(" "),
                                        _c(
                                          "div",
                                          { staticClass: "item-card-actions" },
                                          [
                                            _vm.$can("home_slider_image_update")
                                              ? _c(
                                                  "button",
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
                                                    staticClass:
                                                      "figma-action-btn",
                                                    attrs: {
                                                      title: _vm.__("edit"),
                                                    },
                                                    on: {
                                                      click: function ($event) {
                                                        _vm.edit_record = offer
                                                      },
                                                    },
                                                  },
                                                  [
                                                    _c("i", {
                                                      staticClass:
                                                        "bi bi-pencil-square",
                                                    }),
                                                  ]
                                                )
                                              : _vm._e(),
                                            _vm._v(" "),
                                            _vm.$can("new_offer_image_delete")
                                              ? _c(
                                                  "button",
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
                                                    staticClass:
                                                      "figma-action-btn figma-delete-btn",
                                                    attrs: {
                                                      title: _vm.__("delete"),
                                                    },
                                                    on: {
                                                      click: function ($event) {
                                                        _vm.deleteOffer(
                                                          _vm.translatedOffers.indexOf(
                                                            offer
                                                          ),
                                                          offer.id
                                                        )
                                                      },
                                                    },
                                                  },
                                                  [
                                                    _c("i", {
                                                      staticClass:
                                                        "bi bi-trash",
                                                    }),
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
                                                    rawName:
                                                      "v-b-tooltip.hover",
                                                    modifiers: { hover: true },
                                                  },
                                                ],
                                                staticClass: "figma-action-btn",
                                                class: {
                                                  active:
                                                    _vm.visibleOfferId ===
                                                    offer.id,
                                                },
                                                attrs: {
                                                  title: _vm.__("view"),
                                                  "aria-expanded":
                                                    _vm.visibleOfferId ===
                                                    offer.id
                                                      ? "true"
                                                      : "false",
                                                },
                                                on: {
                                                  click: function ($event) {
                                                    return _vm.toggleRowDetails(
                                                      { item: offer }
                                                    )
                                                  },
                                                },
                                              },
                                              [
                                                _c("i", {
                                                  class:
                                                    _vm.visibleOfferId ===
                                                    offer.id
                                                      ? "bi bi-eye-slash"
                                                      : "bi bi-eye",
                                                }),
                                              ]
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
                        items: _vm.translatedOffers,
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
                          key: "cell(type)",
                          fn: function (row) {
                            return [
                              row.item.type === "default"
                                ? _c("p", { staticClass: "mb-0" }, [
                                    _vm._v(" " + _vm._s(_vm.__("default"))),
                                  ])
                                : _vm._e(),
                              _vm._v(" "),
                              row.item.type === "category"
                                ? _c("p", { staticClass: "mb-0" }, [
                                    _vm._v(" " + _vm._s(_vm.__("category"))),
                                  ])
                                : _vm._e(),
                              _vm._v(" "),
                              row.item.type === "product"
                                ? _c("p", { staticClass: "mb-0" }, [
                                    _vm._v(" " + _vm._s(_vm.__("product"))),
                                  ])
                                : _vm._e(),
                              _vm._v(" "),
                              row.item.type === "offer_url"
                                ? _c("p", { staticClass: "mb-0" }, [
                                    _vm._v(" " + _vm._s(_vm.__("offer_url"))),
                                  ])
                                : _vm._e(),
                            ]
                          },
                        },
                        {
                          key: "cell(type_name)",
                          fn: function (row) {
                            return [
                              row.item.type === "offer_url"
                                ? _c(
                                    "a",
                                    {
                                      attrs: {
                                        href: row.item.offer_url,
                                        target: "_blank",
                                      },
                                    },
                                    [_vm._v("LINK")]
                                  )
                                : _c("p", { staticClass: "mb-0" }, [
                                    _vm._v(
                                      " " +
                                        _vm._s(
                                          _vm.getTranslatedTypeName(row.item)
                                        )
                                    ),
                                  ]),
                            ]
                          },
                        },
                        {
                          key: "cell(position)",
                          fn: function (row) {
                            return [
                              row.item.position === "below_slider"
                                ? _c("p", { staticClass: "mb-0" }, [
                                    _vm._v(
                                      " " + _vm._s(_vm.__("below_slider"))
                                    ),
                                  ])
                                : _vm._e(),
                              _vm._v(" "),
                              row.item.position === "below_category"
                                ? _c("p", { staticClass: "mb-0" }, [
                                    _vm._v(
                                      " " + _vm._s(_vm.__("below_category"))
                                    ),
                                  ])
                                : _vm._e(),
                              _vm._v(" "),
                              row.item.position === "below_section"
                                ? _c("p", { staticClass: "mb-0" }, [
                                    _vm._v(
                                      " " + _vm._s(_vm.__("below_section"))
                                    ),
                                  ])
                                : _vm._e(),
                              _vm._v(" "),
                              row.item.position === "top"
                                ? _c("p", { staticClass: "mb-0" }, [
                                    _vm._v(" " + _vm._s(_vm.__("top"))),
                                  ])
                                : _vm._e(),
                            ]
                          },
                        },
                        {
                          key: "cell(section_position)",
                          fn: function (row) {
                            return [
                              row.item.position === "below_section"
                                ? _c("p", { staticClass: "mb-0" }, [
                                    _vm._v(_vm._s(row.item.section_title)),
                                  ])
                                : _c("p", { staticClass: "mb-0" }, [
                                    _vm._v("-"),
                                  ]),
                            ]
                          },
                        },
                        {
                          key: "cell(image)",
                          fn: function (row) {
                            return [
                              _c("img", {
                                staticClass: "offer-thumb",
                                attrs: {
                                  src:
                                    row.item.image_url || _vm.$placeholderImage,
                                  alt: "",
                                },
                                on: { error: _vm.handleImageError },
                              }),
                            ]
                          },
                        },
                        {
                          key: "cell(actions)",
                          fn: function (row) {
                            return [
                              _c("div", { staticClass: "d-flex gap-2" }, [
                                _vm.$can("home_slider_image_update")
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
                                _vm.$can("new_offer_image_delete")
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
                                            _vm.deleteOffer(
                                              _vm.translatedOffers.indexOf(
                                                row.item
                                              ),
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
                                    attrs: { title: _vm.__("view") },
                                    on: {
                                      click: function ($event) {
                                        return _vm.toggleRowDetails(row)
                                      },
                                    },
                                  },
                                  [
                                    row.detailsShowing
                                      ? _c("base-icon", {
                                          attrs: {
                                            name: "Eye",
                                            hoverName: "Type=Hover (1)",
                                            width: "24",
                                            height: "24",
                                          },
                                        })
                                      : _c("base-icon", {
                                          attrs: {
                                            name: "Eye",
                                            hoverName: "Type=Hover (1)",
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
                        {
                          key: "row-details",
                          fn: function (row) {
                            return [
                              _c(
                                "b-card",
                                {
                                  staticClass: "p-4 border-0 offer-details",
                                  attrs: { "no-body": "" },
                                },
                                [
                                  _c(
                                    "div",
                                    {
                                      staticClass:
                                        "d-flex align-items-center mb-3",
                                    },
                                    [
                                      _c(
                                        "h5",
                                        {
                                          staticClass:
                                            "offer-details-title mb-0 me-3",
                                        },
                                        [
                                          _c("i", {
                                            staticClass:
                                              "fa fa-info-circle me-1",
                                          }),
                                          _vm._v(
                                            " " + _vm._s(_vm.__("information"))
                                          ),
                                        ]
                                      ),
                                      _vm._v(" "),
                                      _c("div", {
                                        staticClass: "h-line flex-grow-1",
                                      }),
                                    ]
                                  ),
                                  _vm._v(" "),
                                  _c("div", { staticClass: "row g-4" }, [
                                    _c("div", { staticClass: "col-md-4" }, [
                                      _c("div", { staticClass: "mb-3" }, [
                                        _c(
                                          "label",
                                          {
                                            staticClass:
                                              "text-muted small text-uppercase fw-bold d-block",
                                          },
                                          [_vm._v(_vm._s(_vm.__("id")))]
                                        ),
                                        _vm._v(" "),
                                        _c(
                                          "span",
                                          { staticClass: "offer-detail-value" },
                                          [_vm._v("#" + _vm._s(row.item.id))]
                                        ),
                                      ]),
                                      _vm._v(" "),
                                      _c("div", { staticClass: "mb-3" }, [
                                        _c(
                                          "label",
                                          {
                                            staticClass:
                                              "text-muted small text-uppercase fw-bold d-block",
                                          },
                                          [_vm._v(_vm._s(_vm.__("type")))]
                                        ),
                                        _vm._v(" "),
                                        _c(
                                          "span",
                                          { staticClass: "offer-detail-value" },
                                          [_vm._v(_vm._s(row.item.type))]
                                        ),
                                      ]),
                                      _vm._v(" "),
                                      _c("div", { staticClass: "mb-0" }, [
                                        _c(
                                          "label",
                                          {
                                            staticClass:
                                              "text-muted small text-uppercase fw-bold d-block",
                                          },
                                          [_vm._v(_vm._s(_vm.__("type_id")))]
                                        ),
                                        _vm._v(" "),
                                        _c(
                                          "span",
                                          { staticClass: "offer-detail-value" },
                                          [_vm._v(_vm._s(row.item.type_id))]
                                        ),
                                      ]),
                                    ]),
                                    _vm._v(" "),
                                    _c("div", { staticClass: "col-md-4" }, [
                                      _c("div", { staticClass: "mb-3" }, [
                                        _c(
                                          "label",
                                          {
                                            staticClass:
                                              "text-muted small text-uppercase fw-bold d-block",
                                          },
                                          [_vm._v(_vm._s(_vm.__("name")))]
                                        ),
                                        _vm._v(" "),
                                        _c(
                                          "span",
                                          { staticClass: "offer-detail-value" },
                                          [
                                            _vm._v(
                                              _vm._s(
                                                row.item.type_name &&
                                                  row.item.type_name.trim() !==
                                                    ""
                                                  ? row.item.type_name
                                                  : "-"
                                              )
                                            ),
                                          ]
                                        ),
                                      ]),
                                      _vm._v(" "),
                                      _c("div", { staticClass: "mb-3" }, [
                                        _c(
                                          "label",
                                          {
                                            staticClass:
                                              "text-muted small text-uppercase fw-bold d-block",
                                          },
                                          [_vm._v(_vm._s(_vm.__("slug")))]
                                        ),
                                        _vm._v(" "),
                                        _c(
                                          "span",
                                          { staticClass: "offer-detail-value" },
                                          [
                                            _vm._v(
                                              _vm._s(
                                                row.item.type_slug &&
                                                  row.item.type_slug.trim() !==
                                                    ""
                                                  ? row.item.type_slug
                                                  : "-"
                                              )
                                            ),
                                          ]
                                        ),
                                      ]),
                                      _vm._v(" "),
                                      row.item.offer_url
                                        ? _c("div", { staticClass: "mb-0" }, [
                                            _c(
                                              "label",
                                              {
                                                staticClass:
                                                  "text-muted small text-uppercase fw-bold d-block",
                                              },
                                              [_vm._v("URL")]
                                            ),
                                            _vm._v(" "),
                                            _c(
                                              "a",
                                              {
                                                staticClass: "text-break",
                                                attrs: {
                                                  href: row.item.offer_url,
                                                  target: "_blank",
                                                },
                                              },
                                              [
                                                _vm._v(
                                                  _vm._s(row.item.offer_url)
                                                ),
                                              ]
                                            ),
                                          ])
                                        : _vm._e(),
                                    ]),
                                    _vm._v(" "),
                                    _c("div", { staticClass: "col-md-4" }, [
                                      _c("div", { staticClass: "mb-3" }, [
                                        _c(
                                          "label",
                                          {
                                            staticClass:
                                              "text-muted small text-uppercase fw-bold d-block",
                                          },
                                          [_vm._v(_vm._s(_vm.__("position")))]
                                        ),
                                        _vm._v(" "),
                                        _c(
                                          "span",
                                          { staticClass: "offer-detail-value" },
                                          [_vm._v(_vm._s(row.item.position))]
                                        ),
                                      ]),
                                      _vm._v(" "),
                                      _c("div", { staticClass: "mb-3" }, [
                                        _c(
                                          "label",
                                          {
                                            staticClass:
                                              "text-muted small text-uppercase fw-bold d-block",
                                          },
                                          [
                                            _vm._v(
                                              _vm._s(_vm.__("section_position"))
                                            ),
                                          ]
                                        ),
                                        _vm._v(" "),
                                        _c(
                                          "span",
                                          { staticClass: "offer-detail-value" },
                                          [
                                            _vm._v(
                                              _vm._s(row.item.section_position)
                                            ),
                                          ]
                                        ),
                                      ]),
                                      _vm._v(" "),
                                      row.item.section_title
                                        ? _c("div", { staticClass: "mb-0" }, [
                                            _c(
                                              "label",
                                              {
                                                staticClass:
                                                  "text-muted small text-uppercase fw-bold d-block",
                                              },
                                              [
                                                _vm._v(
                                                  _vm._s(
                                                    _vm.__("section_title")
                                                  )
                                                ),
                                              ]
                                            ),
                                            _vm._v(" "),
                                            _c(
                                              "span",
                                              {
                                                staticClass:
                                                  "offer-detail-value",
                                              },
                                              [
                                                _vm._v(
                                                  _vm._s(row.item.section_title)
                                                ),
                                              ]
                                            ),
                                          ])
                                        : _vm._e(),
                                    ]),
                                  ]),
                                  _vm._v(" "),
                                  row.item.image_url
                                    ? _c(
                                        "div",
                                        { staticClass: "mt-4 pt-3 border-top" },
                                        [
                                          _c(
                                            "label",
                                            {
                                              staticClass:
                                                "text-muted small text-uppercase fw-bold d-block mb-2",
                                            },
                                            [
                                              _vm._v(
                                                _vm._s(_vm.__("image_preview"))
                                              ),
                                            ]
                                          ),
                                          _vm._v(" "),
                                          _c("img", {
                                            staticClass:
                                              "img-fluid rounded border offer-details-img",
                                            attrs: { src: row.item.image_url },
                                            on: { error: _vm.handleImageError },
                                          }),
                                        ]
                                      )
                                    : _vm._e(),
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
            _c(
              "div",
              { staticClass: "figma-table-footer flex-wrap gap-3" },
              [
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
      _vm.create_new || _vm.edit_record
        ? _c("app-edit-record", {
            attrs: {
              record: _vm.edit_record,
              sections: _vm.sections,
              categories: _vm.translatedCategories,
              products: _vm.translatedProducts,
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