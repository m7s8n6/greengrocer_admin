"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_containers_TheContainerSeller_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/containers/TheContainerSeller.vue?vue&type=script&lang=js":
/*!************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/containers/TheContainerSeller.vue?vue&type=script&lang=js ***!
  \************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _TheSidebar__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TheSidebar */ "./resources/js/containers/TheSidebar.vue");
/* harmony import */ var _TheFooter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./TheFooter */ "./resources/js/containers/TheFooter.vue");
/* harmony import */ var _VerticalHeader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./VerticalHeader */ "./resources/js/containers/VerticalHeader.vue");
/* harmony import */ var _Auth__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Auth */ "./resources/js/Auth.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_4__);
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






/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'TheContainerSeller',
  components: {
    TheSidebar: _TheSidebar__WEBPACK_IMPORTED_MODULE_0__["default"],
    TheFooter: _TheFooter__WEBPACK_IMPORTED_MODULE_1__["default"],
    VerticalHeader: _VerticalHeader__WEBPACK_IMPORTED_MODULE_2__["default"]
  },
  created: function created() {
    // this.updateCurrency(window.localStorage.getItem('currency'));
    this.checkPermissions();
    this.checkSellerStatus();
  },
  watch: {
    '$route': 'checkPermissions'
  },
  mounted: function mounted() {
    var _this = this;
    //lang
    if (window.localStorage.getItem('lang')) {
      this.lang = window.localStorage.getItem('lang');
    }

    // Start periodic status check every 30 seconds
    this.statusCheckInterval = setInterval(function () {
      _this.checkSellerStatus();
    }, 30000);
    function slideToggle(t, e, o) {
      0 === t.clientHeight ? j(t, e, o, !0) : j(t, e, o);
    }
    function slideUp(t, e, o) {
      j(t, e, o);
    }
    function slideDown(t, e, o) {
      j(t, e, o, !0);
    }
    function j(t, e, o, i) {
      void 0 === e && (e = 400), void 0 === i && (i = !1), t.style.overflow = "hidden", i && (t.style.display = "block");
      var p,
        l = window.getComputedStyle(t),
        n = parseFloat(l.getPropertyValue("height")),
        a = parseFloat(l.getPropertyValue("padding-top")),
        s = parseFloat(l.getPropertyValue("padding-bottom")),
        r = parseFloat(l.getPropertyValue("margin-top")),
        d = parseFloat(l.getPropertyValue("margin-bottom")),
        g = n / e,
        y = a / e,
        m = s / e,
        u = r / e,
        h = d / e;
      window.requestAnimationFrame(function l(x) {
        void 0 === p && (p = x);
        var f = x - p;
        i ? (t.style.height = g * f + "px", t.style.paddingTop = y * f + "px", t.style.paddingBottom = m * f + "px", t.style.marginTop = u * f + "px", t.style.marginBottom = h * f + "px") : (t.style.height = n - g * f + "px", t.style.paddingTop = a - y * f + "px", t.style.paddingBottom = s - m * f + "px", t.style.marginTop = r - u * f + "px", t.style.marginBottom = d - h * f + "px"), f >= e ? (t.style.height = "", t.style.paddingTop = "", t.style.paddingBottom = "", t.style.marginTop = "", t.style.marginBottom = "", t.style.overflow = "", i || (t.style.display = "none"), "function" == typeof o && o()) : window.requestAnimationFrame(l);
      });
    }
    var sidebarItems = document.querySelectorAll('.sidebar-item.has-sub');
    var _loop = function _loop() {
      var sidebarItem = sidebarItems[i];
      sidebarItems[i].querySelector('.sidebar-link').addEventListener('click', function (e) {
        var _submenu$classList, _submenu$classList2, _submenu$classList3;
        e.preventDefault();
        var submenu = sidebarItem.querySelector('.submenu');
        if (submenu !== null && submenu !== void 0 && (_submenu$classList = submenu.classList) !== null && _submenu$classList !== void 0 && _submenu$classList.contains('active')) submenu.style.display = "block";
        if (submenu.style.display == "none") submenu === null || submenu === void 0 ? void 0 : (_submenu$classList2 = submenu.classList) === null || _submenu$classList2 === void 0 ? void 0 : _submenu$classList2.add('active');else submenu === null || submenu === void 0 ? void 0 : (_submenu$classList3 = submenu.classList) === null || _submenu$classList3 === void 0 ? void 0 : _submenu$classList3.remove('active');
        slideToggle(submenu, 300);
      });
    };
    for (var i = 0; i < sidebarItems.length; i++) {
      _loop();
    }
    window.addEventListener('DOMContentLoaded', function (event) {
      var w = window.innerWidth;
      if (w < 1200) {
        var _document$getElementB, _document$getElementB2;
        (_document$getElementB = document.getElementById('sidebar')) === null || _document$getElementB === void 0 ? void 0 : (_document$getElementB2 = _document$getElementB.classList) === null || _document$getElementB2 === void 0 ? void 0 : _document$getElementB2.remove('active');
      }
    });
    // Update backdrop when sidebar opens/closes on small screens - click outside to close
    var updateSidebarBackdrop = function updateSidebarBackdrop() {
      var _sidebar$classList;
      var sidebar = document.getElementById('sidebar');
      var backdrop = document.querySelector('.sidebar-backdrop');
      var isSmallScreen = window.innerWidth < 1200;
      var isActive = sidebar === null || sidebar === void 0 ? void 0 : (_sidebar$classList = sidebar.classList) === null || _sidebar$classList === void 0 ? void 0 : _sidebar$classList.contains('active');
      if (backdrop) backdrop.remove();
      if (isSmallScreen && isActive) {
        var b = document.createElement('div');
        b.className = 'sidebar-backdrop';
        b.addEventListener('click', function () {
          var _sidebar$classList2;
          sidebar === null || sidebar === void 0 ? void 0 : (_sidebar$classList2 = sidebar.classList) === null || _sidebar$classList2 === void 0 ? void 0 : _sidebar$classList2.remove('active');
          updateSidebarBackdrop();
        });
        document.body.appendChild(b);
      }
    };
    window.addEventListener('resize', function (event) {
      var w = window.innerWidth;
      if (w < 1200) {
        var _document$getElementB3, _document$getElementB4;
        (_document$getElementB3 = document.getElementById('sidebar')) === null || _document$getElementB3 === void 0 ? void 0 : (_document$getElementB4 = _document$getElementB3.classList) === null || _document$getElementB4 === void 0 ? void 0 : _document$getElementB4.remove('active');
        updateSidebarBackdrop();
      } else {
        var _document$getElementB5, _document$getElementB6;
        (_document$getElementB5 = document.getElementById('sidebar')) === null || _document$getElementB5 === void 0 ? void 0 : (_document$getElementB6 = _document$getElementB5.classList) === null || _document$getElementB6 === void 0 ? void 0 : _document$getElementB6.add('active');
        updateSidebarBackdrop();
      }
    });
    document.querySelector('.burger-btn').addEventListener('click', function () {
      var _document$getElementB7, _document$getElementB8;
      (_document$getElementB7 = document.getElementById('sidebar')) === null || _document$getElementB7 === void 0 ? void 0 : (_document$getElementB8 = _document$getElementB7.classList) === null || _document$getElementB8 === void 0 ? void 0 : _document$getElementB8.toggle('active');
      updateSidebarBackdrop();
    });
    document.querySelector('.sidebar-hide').addEventListener('click', function () {
      var _document$getElementB9, _document$getElementB10;
      (_document$getElementB9 = document.getElementById('sidebar')) === null || _document$getElementB9 === void 0 ? void 0 : (_document$getElementB10 = _document$getElementB9.classList) === null || _document$getElementB10 === void 0 ? void 0 : _document$getElementB10.toggle('active');
      updateSidebarBackdrop();
    });
    // Perfect Scrollbar Init
    if (typeof PerfectScrollbar["default"] == 'function') {
      var container = document.querySelector(".sidebar-wrapper");
      var ps = new PerfectScrollbar["default"](container, {
        wheelPropagation: false
      });
    }
    // Scroll into active sidebar
    document.querySelector('.sidebar-item.active').scrollIntoView(false);
  },
  beforeDestroy: function beforeDestroy() {
    // Clear the status check interval when component is destroyed
    if (this.statusCheckInterval) {
      clearInterval(this.statusCheckInterval);
    }
  },
  data: function data() {
    return {
      lang: 'en',
      statusCheckInterval: null,
      remark: '',
      sidebarItems: [{
        name: __('dashboard'),
        icon: 'tachometer-alt',
        url: '/seller',
        permission: 'manage_dashboard'
      }, {
        name: __('orders'),
        icon: 'shopping-cart',
        url: '/seller/orders',
        permission: 'order_list'
      }, {
        name: __('self_pickup_orders'),
        icon: 'shopping-cart',
        url: '/seller/self_pickup_orders',
        permission: 'self_pickup_order_list'
      }, {
        name: __('categories'),
        icon: 'bullseye',
        url: '/seller/categories',
        permission: 'category_list'
      }, {
        name: __('products'),
        icon: 'cube',
        permission: 'product_list',
        submenu: [{
          name: __('add_product'),
          icon: 'grid-fill',
          url: '/seller/manage_products/create'
        }, {
          name: __('manage_products'),
          icon: 'grid-fill',
          url: '/seller/manage_products'
        }, {
          name: __('media'),
          icon: 'grid-fill',
          url: '/seller/media'
        }, {
          name: __('bulk_upload'),
          icon: 'grid-fill',
          url: '/seller/bulk_upload'
        }, {
          name: __('bulk_update'),
          icon: 'grid-fill',
          url: '/seller/bulk_update'
        }, {
          name: __('taxes'),
          icon: 'grid-fill',
          url: '/seller/taxes'
        }, {
          name: __('brands'),
          icon: 'grid-fill',
          url: '/seller/brands'
        }, {
          name: __('addons'),
          icon: 'grid-fill',
          url: '/seller/addons'
        }, {
          name: __('attributes'),
          icon: 'grid-fill',
          url: '/seller/attributes'
        }, {
          name: __('custom_fields'),
          icon: 'grid-fill',
          url: '/seller/custom_fields'
        }]
      }, {
        name: __('stock_management'),
        icon: 'cubes',
        url: '/seller/manage_stock',
        permission: 'product_list'
      }, {
        name: __('return_requests'),
        icon: 'retweet',
        url: '/seller/return_requests',
        permission: 'return_request_list'
      }, {
        name: __('point_of_sale'),
        icon: 'calculator',
        url: '/seller/point_of_sale',
        permission: 'product_list'
      }, {
        name: __('withdrawal_requests'),
        icon: 'credit-card',
        url: '/seller/withdrawal_requests',
        permission: 'product_sales_reports'
      }, {
        name: __('wallet_transactions'),
        icon: 'credit-card',
        url: '/seller/seller_wallet_transactions',
        permission: 'product_sales_reports'
      }, {
        name: __('reports'),
        icon: 'folder-open',
        permission: 'product_sales_reports',
        submenu: [{
          name: __('product_sales_report'),
          icon: 'grid-fill',
          url: '/seller/product_sales_reports',
          permission: 'product_sales_reports'
        }, {
          name: __('sales_reports'),
          icon: 'grid-fill',
          url: '/seller/sales_reports',
          permission: 'sales_reports'
        }, {
          name: __('pos_reports'),
          icon: 'grid-fill',
          url: '/seller/pos_reports',
          permission: 'product_sales_reports'
        }]
      }, {
        name: __('settings'),
        icon: 'cog',
        url: '/seller/setting',
        permission: 'order_list'
      }]
    };
  },
  computed: {
    visibleSidebarItems: function visibleSidebarItems() {
      // Addons only makes sense for the Food Delivery module - a seller's module is fixed
      // at seller_id creation (Auth.js seeds active_module_id from user.seller.module_id
      // at login), so this is a stable per-seller check, not a switchable one like admin.
      var activeModuleId = Number(localStorage.getItem('active_module_id')) || 1;
      if (activeModuleId === 4) {
        return this.sidebarItems;
      }
      return this.sidebarItems.map(function (item) {
        if (item.submenu) {
          return _objectSpread(_objectSpread({}, item), {}, {
            submenu: item.submenu.filter(function (s) {
              return s.url !== '/seller/addons';
            })
          });
        }
        return item;
      });
    }
  },
  methods: {
    subIsActive: function subIsActive(item) {
      var _this2 = this;
      var paths = Array.isArray(item.submenu) ? item.submenu : [];
      return paths.some(function (path) {
        return _this2.$route.path.indexOf(path.url) === 0;
      });
    },
    isActive: function isActive(url) {
      if (this.$route.path == url) {
        return true;
      }
      return false;
    },
    isHasSub: function isHasSub(item) {
      if (item.hasOwnProperty("submenu")) {
        if (item.submenu.length > 0) {
          return true;
        }
      }
      return false;
    },
    changeLanguage: function changeLanguage(event) {
      var _this3 = this;
      this.lang = event.target.value;
      window.localStorage.setItem('lang', this.lang);
      this.isLoading = true;
      var data = {
        language: this.lang
      };
      axios__WEBPACK_IMPORTED_MODULE_4___default().post(this.$apiUrl + '/change_language', data).then(function (response) {
        _this3.isLoading = false;
        window.location.reload();
      });
    },
    checkPermissions: function checkPermissions() {
      var current_path = this.$route.path;
      var permission = '';
      this.sidebarItems.forEach(function (menu) {
        //Only Main Categories
        if (menu.submenu && menu.submenu.length > 0) {
          menu.submenu.forEach(function (submenu) {
            if (submenu.url == current_path) {
              permission = submenu.permission;
            }
          });
        } else {
          if (menu.url == current_path) {
            permission = menu.permission;
          }
        }
      });
      if (_Auth__WEBPACK_IMPORTED_MODULE_3__["default"].check() && UserPermissions.length == 0) {
        //this.$router.push({path:'/login'});
        if (window.localStorage.getItem('loginCheck') == 1) {
          _Auth__WEBPACK_IMPORTED_MODULE_3__["default"].logout();
        }
        window.localStorage.setItem('loginCheck', 1);
        window.location.reload();
      } else if (_Auth__WEBPACK_IMPORTED_MODULE_3__["default"].check() && permission && !this.$can(permission)) {
        this.$router.push({
          path: '/unauthorized'
        });
      }
    },
    checkSellerStatus: function checkSellerStatus() {
      var _this4 = this;
      // Check if seller is blocked
      axios__WEBPACK_IMPORTED_MODULE_4___default().post(this.$sellerApiUrl + '/get_seller_status').then(function (response) {
        if (response.data.status === 1) {
          var sellerStatus = response.data.data.status;
          // Status 4 means blocked
          if (sellerStatus === 4) {
            _this4.remark = response.data.data.remark;
            _this4.$bvModal.show('seller-blocked-modal');
            // Clear the interval to stop further checks
            if (_this4.statusCheckInterval) {
              clearInterval(_this4.statusCheckInterval);
            }
          }
        }
      })["catch"](function (error) {
        // Silently fail - don't show errors for background checks
        console.error('Status check error:', error);
      });
    },
    handleBlockedLogout: function handleBlockedLogout() {
      // Logout the seller
      _Auth__WEBPACK_IMPORTED_MODULE_3__["default"].logout();
      // Redirect to login page
      this.$router.push({
        path: '/seller/login'
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/containers/TheFooter.vue?vue&type=script&lang=js":
/*!***************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/containers/TheFooter.vue?vue&type=script&lang=js ***!
  \***************************************************************************************************************************************************************************************************/
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'TheFooter',
  data: function data() {
    return {
      copyrightDetails: window.copyrightDetails,
      currentVersion: window.currentVersion
    };
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/containers/TheSidebar.vue?vue&type=script&lang=js":
/*!****************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/containers/TheSidebar.vue?vue&type=script&lang=js ***!
  \****************************************************************************************************************************************************************************************************/
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


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'TheSidebar',
  data: function data() {
    return {
      //minimize: false,
      nav: [],
      //show: true,
      buffor: []
    };
  },
  computed: {
    show: function show() {
      //return this.$store.state.sidebarShow
    },
    minimize: function minimize() {
      //return this.$store.state.sidebarMinimize
    }
  },
  methods: {
    dropdown: function dropdown(data) {
      var result = {
        _name: 'CSidebarNavDropdown',
        name: data['name'],
        route: data['href'],
        icon: data['icon'],
        _children: []
      };
      for (var i = 0; i < data['elements'].length; i++) {
        if (data['elements'][i]['slug'] == 'dropdown') {
          result._children.push(this.dropdown(data['elements'][i]));
        } else {
          result._children.push({
            _name: 'CSidebarNavItem',
            name: data['elements'][i]['name'],
            to: data['elements'][i]['href'],
            icon: data['elements'][i]['icon']
          });
        }
      }
      return result;
    },
    rebuildData: function rebuildData(data) {
      this.buffor = [{
        _name: 'CSidebarNav',
        _children: []
      }];
      for (var k = 0; k < data.length; k++) {
        switch (data[k]['slug']) {
          case 'link':
            if (data[k]['href'].indexOf('http') !== -1) {
              this.buffor[0]._children.push({
                _name: 'CSidebarNavItem',
                name: data[k]['name'],
                href: data[k]['href'],
                icon: data[k]['icon'],
                target: '_blank'
              });
            } else {
              this.buffor[0]._children.push({
                _name: 'CSidebarNavItem',
                name: data[k]['name'],
                to: data[k]['href'],
                icon: data[k]['icon']
              });
            }
            break;
          case 'title':
            this.buffor[0]._children.push({
              _name: 'CSidebarNavTitle',
              _children: [data[k]['name']]
            });
            break;
          case 'dropdown':
            this.buffor[0]._children.push(this.dropdown(data[k]));
            break;
        }
      }
      return this.buffor;
    }
  },
  mounted: function mounted() {
    var _this = this;
    this.$root.$on('toggle-sidebar', function () {
      var sidebarOpened = _this.show === true || _this.show === 'responsive';
      _this.show = sidebarOpened ? false : 'responsive';
    });
    this.$root.$on('toggle-sidebar-mobile', function () {
      var sidebarClosed = _this.show === 'responsive' || _this.show === false;
      _this.show = sidebarClosed ? true : 'responsive';
    });
    var self = this;
    axios__WEBPACK_IMPORTED_MODULE_0___default().get(this.$apiAdress + '/api/menu?token=' + localStorage.getItem("api_token")).then(function (response) {
      self.nav = self.rebuildData(response.data);
    })["catch"](function (error) {
      self.$router.push({
        path: '/login'
      });
    });
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/containers/VerticalHeader.vue?vue&type=script&lang=js":
/*!********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/containers/VerticalHeader.vue?vue&type=script&lang=js ***!
  \********************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Auth_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Auth.js */ "./resources/js/Auth.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_1__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
    var cachedModules = [];
    try {
      cachedModules = JSON.parse(localStorage.getItem('modules')) || [];
    } catch (e) {
      console.error('Error parsing cached modules', e);
    }
    return {
      websiteUrl: window.websiteUrl,
      lang: window.localStorage.getItem('lang') || window.appLocale || 'en',
      user: _Auth_js__WEBPACK_IMPORTED_MODULE_0__["default"].user,
      role: Role,
      profile_url: Role === 'Seller' ? _Auth_js__WEBPACK_IMPORTED_MODULE_0__["default"].user.seller.logo_url : Role === 'Delivery Boy' ? this.$baseUrl + '/images/admin_logo.png' : this.$baseUrl + '/images/admin_logo.png',
      notifications: [],
      userTheme: "theme-light",
      isToggle: false,
      //seller status
      sellerStatus: null,
      sellerStatusLoading: false,
      deliveryBoyStatus: null,
      deliveryBoyStatusLoading: false,
      remark: '',
      popoverShow: false,
      isSystemRefreshing: false,
      windowHeight: window.innerHeight,
      windowWidth: window.innerWidth,
      languages: [],
      notifications_unread_count: 0,
      modules: cachedModules,
      activeModuleId: Number(localStorage.getItem('active_module_id')) || 1
    };
  },
  computed: {
    isSellerRoute: function isSellerRoute() {
      // Use this.$route to access the current route
      return this.$route.path.startsWith('/seller/') || this.$route.path === '/seller';
    },
    isDeliveryBoyRoute: function isDeliveryBoyRoute() {
      return this.$route.path.startsWith('/delivery_boy');
    },
    currentFlag: function currentFlag() {
      var flags = {
        'en': 'us',
        'ar': 'sa',
        'hi': 'in',
        'es': 'es',
        'fr': 'fr',
        'de': 'de',
        'it': 'it',
        'ja': 'jp',
        'ko': 'kr',
        'gu': 'in',
        'be': 'by',
        'zh': 'cn',
        'pt': 'pt',
        'ru': 'ru',
        'tr': 'tr',
        'vi': 'vn',
        'th': 'th',
        'id': 'id',
        'ms': 'my',
        'nl': 'nl',
        'pl': 'pl',
        'uk': 'ua',
        'sv': 'se',
        'no': 'no',
        'da': 'dk',
        'fi': 'fi',
        'ro': 'ro',
        'cs': 'cz',
        'hu': 'hu',
        'sk': 'sk',
        'bg': 'bg',
        'hr': 'hr',
        'sr': 'rs',
        'sl': 'si',
        'et': 'ee',
        'lv': 'lv',
        'lt': 'lt',
        'el': 'gr',
        'he': 'il',
        'fa': 'ir',
        'ur': 'pk',
        'bn': 'bd',
        'pa': 'in',
        'ta': 'in',
        'te': 'in',
        'kn': 'in',
        'ml': 'in',
        'mr': 'in'
      };
      var code = flags[(this.lang || 'en').toLowerCase()] || 'us';
      return "https://flagcdn.com/w80/".concat(code, ".png");
    },
    currentLanguageName: function currentLanguageName() {
      var _this = this;
      var lang = this.languages.find(function (l) {
        return l.code === _this.lang;
      });
      return lang ? lang.name.substring(0, 3) : (this.lang || 'en').substring(0, 3);
    },
    currentModule: function currentModule() {
      var activeModuleId = Number(localStorage.getItem('active_module_id')) || 1;
      return this.modules.find(function (m) {
        return m.id === activeModuleId;
      }) || null;
    },
    currentModuleName: function currentModuleName() {
      return this.currentModule ? this.currentModule.name : 'Grocery';
    }
  },
  beforeDestroy: function beforeDestroy() {
    window.removeEventListener('resize', this.onResize);
    window.removeEventListener('DOMContentLoaded', this.onResize);
    this.$eventBus.$off('modulesUpdated');
    this.$eventBus.$off('languagesUpdated');
  },
  mounted: function mounted() {
    var _this2 = this;
    // Fetch initial seller status if the user is a seller
    if (this.role === this.$roleSeller) this.getSellerStatus();

    // Fetch initial delivery boy status if the user is a delivery boy
    if (this.role === this.$roleDeliveryBoy) this.getDeliveryBoyStatus();
    this.$nextTick(function () {
      window.addEventListener('resize', _this2.onResize);
      window.addEventListener('DOMContentLoaded', _this2.onResize);
    });
    var initUserTheme = this.getTheme();
    this.setTheme(initUserTheme);
    this.timer = setInterval(function () {
      _this2.getNotifications();
    }, 40000); // 40 seconds

    this.getLanguage();
    if (this.role === this.$roleSuperAdmin) {
      this.getModules();
    }
    this.$eventBus.$on('modulesUpdated', function () {
      if (_this2.role === _this2.$roleSuperAdmin) {
        _this2.getModules();
      }
    });

    // Keep the header language dropdown in sync with Manage Languages - without this it
    // only ever fetched once on mount, so a newly added/deleted language didn't show up
    // there until a full page reload.
    this.$eventBus.$on('languagesUpdated', function () {
      _this2.getLanguage();
    });
  },
  created: function created() {
    this.getNotifications();
  },
  watch: {
    'user.delivery_boy.id': function userDelivery_boyId(id) {
      if (id && this.role === this.$roleDeliveryBoy) {
        this.getDeliveryBoyStatus();
      }
    }
  },
  methods: {
    //seller status toggle
    getSellerStatus: function getSellerStatus() {
      var _this3 = this;
      axios__WEBPACK_IMPORTED_MODULE_1___default().post(this.$apiUrl + '/seller/get_seller_status', {
        seller_id: this.user.seller.id
      }).then(function (response) {
        if (response.data && response.data.data) {
          _this3.sellerStatus = Number(response.data.data.status);
        }
      })["catch"](function (error) {
        var _error$response;
        console.error('Error fetching seller status:', ((_error$response = error.response) === null || _error$response === void 0 ? void 0 : _error$response.data) || error);
      });
    },
    //delivery boy status toggle
    getDeliveryBoyStatus: function getDeliveryBoyStatus() {
      var _this4 = this;
      axios__WEBPACK_IMPORTED_MODULE_1___default().post(this.$apiUrl + '/delivery_boy/get_delivery_boy_status', {
        id: this.user.delivery_boy.id
      }).then(function (response) {
        if (response.data && response.data.data) {
          _this4.deliveryBoyStatus = Number(response.data.data.status);
        }
      })["catch"](function (error) {
        var _error$response2;
        console.error('Error fetching delivery boy status:', ((_error$response2 = error.response) === null || _error$response2 === void 0 ? void 0 : _error$response2.data) || error);
      });
    },
    // Toggle seller status update
    toggleSellerStatus: function toggleSellerStatus() {
      var _this5 = this;
      if (this.sellerStatusLoading) return;
      var previousStatus = this.sellerStatus === 1 ? 3 : 1;
      this.sellerStatusLoading = true;
      var formData = new FormData();
      formData.append('seller_id', this.user.seller.id);
      formData.append('status', this.sellerStatus);
      axios__WEBPACK_IMPORTED_MODULE_1___default().post(this.$apiUrl + '/sellers/update_status', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(function (response) {
        if (response.data.status === 1) {
          console.log('Seller status updated:', response.data);
        } else {
          console.error('API returned error:', response.data.message);
          _this5.sellerStatus = previousStatus;
        }
      })["catch"](function (error) {
        var _error$response3;
        console.error('API error:', ((_error$response3 = error.response) === null || _error$response3 === void 0 ? void 0 : _error$response3.data) || error);
        _this5.sellerStatus = previousStatus;
      })["finally"](function () {
        _this5.sellerStatusLoading = false;
      });
    },
    // Toggle delivery boy status update
    toggleDeliveryBoyStatus: function toggleDeliveryBoyStatus() {
      var _this6 = this;
      if (this.deliveryBoyStatusLoading) return;
      var previousStatus = this.deliveryBoyStatus === 1 ? 3 : 1;
      this.deliveryBoyStatusLoading = true;
      var formData = new FormData();
      formData.append('id', this.user.delivery_boy.id);
      formData.append('status', this.deliveryBoyStatus);
      axios__WEBPACK_IMPORTED_MODULE_1___default().post(this.$apiUrl + '/delivery_boys/update-status', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(function (response) {
        if (response.data.status === 1) {
          console.log('Delivery boy status updated:', response.data);
        } else {
          console.error('API returned error:', response.data.message);
          _this6.deliveryBoyStatus = previousStatus;
        }
      })["catch"](function (error) {
        var _error$response4;
        console.error('API error:', ((_error$response4 = error.response) === null || _error$response4 === void 0 ? void 0 : _error$response4.data) || error);
        _this6.deliveryBoyStatus = previousStatus;
      })["finally"](function () {
        _this6.deliveryBoyStatusLoading = false;
      });
    },
    logout: function logout() {
      var _this7 = this;
      var role_id = _Auth_js__WEBPACK_IMPORTED_MODULE_0__["default"].user.role_id;

      // Clear language session on server before logout
      axios__WEBPACK_IMPORTED_MODULE_1___default().post(this.$apiUrl + '/clear_language_session').then(function () {
        // Now proceed with logout
        _Auth_js__WEBPACK_IMPORTED_MODULE_0__["default"].logout();
        setTimeout(function () {
          if (role_id === 3) {
            _this7.$router.push('/seller/login');
          } else if (role_id === 4) {
            _this7.$router.push('/delivery_boy/login');
          } else {
            _this7.$router.push('/login');
          }
          window.location.reload();
        }, 500);
      })["catch"](function () {
        // If API call fails, still proceed with logout
        _Auth_js__WEBPACK_IMPORTED_MODULE_0__["default"].logout();
        setTimeout(function () {
          if (role_id === 3) {
            _this7.$router.push('/seller/login');
          } else if (role_id === 4) {
            _this7.$router.push('/delivery_boy/login');
          } else {
            _this7.$router.push('/login');
          }
          window.location.reload();
        }, 500);
      });
    },
    getFlagByCode: function getFlagByCode(langCode) {
      var flags = {
        'en': 'us',
        'ar': 'sa',
        'hi': 'in',
        'es': 'es',
        'fr': 'fr',
        'de': 'de',
        'it': 'it',
        'ja': 'jp',
        'ko': 'kr',
        'gu': 'in',
        'be': 'by',
        'zh': 'cn',
        'pt': 'pt',
        'ru': 'ru',
        'tr': 'tr',
        'vi': 'vn',
        'th': 'th',
        'id': 'id',
        'ms': 'my',
        'nl': 'nl',
        'pl': 'pl',
        'uk': 'ua',
        'sv': 'se',
        'no': 'no',
        'da': 'dk',
        'fi': 'fi',
        'ro': 'ro',
        'cs': 'cz',
        'hu': 'hu',
        'sk': 'sk',
        'bg': 'bg',
        'hr': 'hr',
        'sr': 'rs',
        'sl': 'si',
        'et': 'ee',
        'lv': 'lv',
        'lt': 'lt',
        'el': 'gr',
        'he': 'il',
        'fa': 'ir',
        'ur': 'pk',
        'bn': 'bd',
        'pa': 'in',
        'ta': 'in',
        'te': 'in',
        'kn': 'in',
        'ml': 'in',
        'mr': 'in'
      };
      var code = flags[(langCode || 'en').toLowerCase()] || 'us';
      return "https://flagcdn.com/w80/".concat(code, ".png");
    },
    selectLanguage: function selectLanguage(code) {
      this.changeLanguage({
        target: {
          value: code
        }
      });
    },
    changeLanguage: function changeLanguage(event) {
      var _this8 = this;
      // Update the selected language based on the change event
      this.lang = event.target.value;
      window.localStorage.setItem('lang', this.lang);
      this.isLoading = true;
      var data = {
        language: this.lang
      };
      axios__WEBPACK_IMPORTED_MODULE_1___default().post(this.$apiUrl + '/change_language', data).then(function (response) {
        _this8.isLoading = false;
        // Apply RTL based on language type from API (any language can be RTL)
        _this8.applyRtlForLanguage(_this8.lang);
        // Update the default language in local state
        _this8.updateDefaultLanguage(_this8.lang);
        window.localStorage.removeItem('language');
        var currentUrl = window.location.href.split('?')[0].split('#')[0];
        var cacheBuster = '_t=' + Date.now();
        window.location.href = currentUrl + '?' + cacheBuster;
      });
    },
    updateDefaultLanguage: function updateDefaultLanguage(newDefaultLanguage) {
      // Update the default language in the languages array
      this.languages.forEach(function (language) {
        if (language.code === newDefaultLanguage) {
          language.is_default = 1;
        } else {
          language.is_default = 0;
        }
      });
    },
    getLanguage: function getLanguage() {
      var _this9 = this;
      this.isLoading = true;
      var data = {
        params: {
          system_type: 4
        }
      };
      axios__WEBPACK_IMPORTED_MODULE_1___default().get(this.$apiUrl + '/system_languages', data).then(function (response) {
        _this9.isLoading = false;
        var data = response.data;
        if (data && Array.isArray(data.data)) {
          _this9.languages = data.data;
          _this9.totalRows = _this9.languages.length;
        } else {
          _this9.languages = [];
          _this9.totalRows = 0;
        }
        // Apply RTL based on language type from API (any language can be RTL)
        _this9.applyRtlForLanguage(window.localStorage.getItem('lang') || _this9.lang);
      })["catch"](function (error) {
        _this9.isLoading = false;
        console.error('Error fetching languages:', error);
      });
    },
    getModules: function getModules() {
      var _this10 = this;
      axios__WEBPACK_IMPORTED_MODULE_1___default().get(this.$apiUrl + '/modules').then(function (response) {
        if (response.data && response.data.data) {
          _this10.modules = response.data.data;
          localStorage.setItem('modules', JSON.stringify(response.data.data));
        }
      })["catch"](function (error) {
        console.error('Error fetching modules:', error);
      });
    },
    selectModule: function selectModule(moduleId) {
      localStorage.setItem('active_module_id', moduleId);
      window.axios.defaults.headers.common['X-Module-Id'] = moduleId;
      window.location.reload();
    },
    /**
     * Apply or remove RTL class on body based on language type from API.
     * Uses language.type from supported_languages (rtl/ltr) - not hardcoded to any specific language.
     */
    applyRtlForLanguage: function applyRtlForLanguage(langCode) {
      var lang = this.languages.find(function (l) {
        return (l.code || '').toLowerCase() === (langCode || '').toLowerCase();
      });
      var isRtl = lang && String(lang.type || '').toLowerCase() === 'rtl';
      if (isRtl) {
        document.body.classList.add('rtl');
      } else {
        document.body.classList.remove('rtl');
      }
    },
    getNotifications: function getNotifications(event) {
      var _this11 = this;
      axios__WEBPACK_IMPORTED_MODULE_1___default().get(this.$apiUrl + '/get_top_notifications').then(function (response) {
        _this11.notifications = response.data.data.notifications;
        _this11.notifications_unread_count = response.data.data.unread;
      });
    },
    markAsReadNotification: function markAsReadNotification(notification) {
      var _this12 = this;
      if (notification.read_at == null) {
        axios__WEBPACK_IMPORTED_MODULE_1___default().get(this.$apiUrl + '/notification_read?id=' + notification.id).then(function (response) {
          _this12.getNotifications();
        });
      }
    },
    confirmMarkAllAsRead: function confirmMarkAllAsRead() {
      var _this13 = this;
      // Show SweetAlert confirmation dialog before marking all notifications as read
      this.$swal.fire({
        title: __('are_you_sure'),
        text: __('do_you_want_to_mark_all_notifications_as_read'),
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: __('yes_sure'),
        cancelButtonText: __('cancel'),
        confirmButtonColor: '#37a279',
        cancelButtonColor: '#d33'
      }).then(function (result) {
        // If user confirms, proceed to mark all as read
        if (result.value) {
          _this13.markAllAsRead();
        }
      });
    },
    markAllAsRead: function markAllAsRead() {
      var _this14 = this;
      // Mark all notifications as read by calling the API without id parameter
      axios__WEBPACK_IMPORTED_MODULE_1___default().get(this.$apiUrl + '/notification_read').then(function (response) {
        // Refresh notifications to update the UI
        _this14.getNotifications();
        // Show success message
        _this14.showMessage("success", response.data.message || "All notifications marked as read");
      })["catch"](function (error) {
        // Show error message if something goes wrong
        _this14.showError("Failed to mark all notifications as read");
      });
    },
    changeDateTime: function changeDateTime(dateTime) {
      return moment(dateTime).fromNow();
    },
    setTheme: function setTheme(theme) {
      sessionStorage.setItem("user-theme", theme);
      this.userTheme = theme;
      // Only swap theme classes so RTL class is preserved (sidebar stays on correct side in RTL + dark mode).
      document.body.classList.remove('theme-light', 'theme-dark');
      document.body.classList.add(theme);
    },
    getMediaPreference: function getMediaPreference() {
      var hasDarkPreference = window.matchMedia("(prefers-color-scheme: dark)").matches;
      if (hasDarkPreference) {
        return "theme-dark";
      } else {
        return "theme-light";
      }
    },
    getTheme: function getTheme() {
      var user_theme = sessionStorage.getItem("user-theme");
      this.userTheme = user_theme;
      return user_theme;
    },
    toggleTheme: function toggleTheme() {
      var activeTheme = sessionStorage.getItem("user-theme");
      if (activeTheme === "theme-light" || activeTheme == "" || activeTheme == "undefined" || activeTheme == "null") {
        this.setTheme("theme-dark");
      } else {
        this.setTheme("theme-light");
      }
    },
    onResize: function onResize() {
      this.windowHeight = window.innerHeight;
      this.windowWidth = window.innerWidth;
    },
    clearCache: function clearCache() {
      var vm = this;
      vm.isSystemRefreshing = true;
      axios__WEBPACK_IMPORTED_MODULE_1___default().get(this.$baseUrl + '/clear').then(function (response) {
        var data = response.data;
        if (data.status === 1) {
          setTimeout(function () {
            vm.showMessage("success", data.message);
            vm.isSystemRefreshing = false;
            vm.popoverShow = false;
            window.location.reload();
          }, 2000);
        } else {
          vm.showError(data.message);
          vm.isSystemRefreshing = false;
        }
      })["catch"](function (error) {
        var _error$request;
        vm.isSystemRefreshing = false;
        if (error !== null && error !== void 0 && (_error$request = error.request) !== null && _error$request !== void 0 && _error$request.statusText) {
          vm.showError(error.request.statusText);
        } else if (error.message) {
          vm.showError(error.message);
        } else {
          vm.showError(__('something_went_wrong'));
        }
      });
    },
    handleNotificationClick: function handleNotificationClick(notification) {
      var _this15 = this;
      this.markAsReadNotification(notification);
      var orderId = notification.data.order_id;
      if (this.isSellerRoute) {
        this.$router.push('/seller/orders/view/' + orderId);
      } else if (this.isDeliveryBoyRoute) {
        this.$router.push('/delivery_boy/orders/view/' + orderId);
      } else {
        axios__WEBPACK_IMPORTED_MODULE_1___default().get(this.$apiUrl + '/orders/view/' + orderId).then(function (response) {
          var order = response.data.data.order;
          if (order) {
            if (order.order_type === 'selfpickup') {
              _this15.$router.push('/self_pickup_orders/view/' + orderId);
            } else {
              _this15.$router.push('/orders/view/' + orderId);
            }
          } else {
            _this15.$router.push('/orders/view/' + orderId);
          }
        })["catch"](function (error) {
          _this15.$router.push('/orders/view/' + orderId);
        });
      }
    },
    parseNotification: function parseNotification(notification) {
      var text = notification.data.text || '';
      var title = 'Notification';
      var body = text;
      var type = notification.data.type || '';
      var lowerText = text.toLowerCase();

      // Body always comes from the real server-computed text - never fabricate customer/store/total data.
      if (type === 'return_request_new' || type === 'return_request_sent' || type === 'return_request_status' || lowerText.includes('return')) {
        title = 'Return Request Received';
      } else if (lowerText.includes('cancel')) {
        title = 'Order Cancelled';
      } else if (lowerText.includes('receive') || lowerText.includes('place') || lowerText.includes('new order')) {
        title = 'New Order Placed';
      } else if (lowerText.includes('assign')) {
        title = 'Order Assigned';
      } else if (lowerText.includes('picked') || lowerText.includes('pickup')) {
        title = 'Order Out for Pickup';
      } else if (lowerText.includes('deliver')) {
        title = 'Order Delivered';
      } else {
        title = 'Order Status Update';
      }
      return {
        title: title,
        body: body
      };
    }
  }
});

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/containers/TheContainerSeller.vue?vue&type=style&index=0&id=0baa285e&scoped=true&lang=css":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/containers/TheContainerSeller.vue?vue&type=style&index=0&id=0baa285e&scoped=true&lang=css ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
___CSS_LOADER_EXPORT___.push([module.id, "\n.fade-enter-active[data-v-0baa285e],\n.fade-leave-active[data-v-0baa285e] {\n    transition: opacity 0.3s;\n}\n.fade-enter[data-v-0baa285e],\n.fade-leave-to[data-v-0baa285e] {\n    opacity: 0;\n}\n.global-announcement-banner[data-v-0baa285e] {\n    position: fixed;\n    top: 0;\n    left: 0;\n    right: 0;\n    height: 40px;\n    background: var(--figma-primary-light, #FEF5E6);\n    color: var(--figma-primary, #FF9900);\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    gap: 8px;\n    padding: 0 16px;\n    font-size: 14px;\n    font-weight: 500;\n    text-align: center;\n    z-index: 1051;\n}\n\n/* body.theme-dark forces color:#F1F5F9 !important on every span/div/p globally (dark-mode\n   typography reset in custom-egrocer.scss) - that beats this banner's own color rule since\n   .global-announcement-banner alone has lower specificity, making the orange text invisible\n   against the near-white banner background. Re-declaring with the same body.theme-dark prefix\n   matches its specificity and wins on source order. */\nbody.theme-dark .global-announcement-banner[data-v-0baa285e],\nbody.theme-dark .global-announcement-banner span[data-v-0baa285e],\nbody.theme-dark .global-announcement-banner i[data-v-0baa285e] {\n    color: var(--figma-primary, #FF9900) !important;\n}\nbody.theme-dark .global-announcement-banner[data-v-0baa285e] {\n    background: #2A2013 !important;\n}\n.logo-dark[data-v-0baa285e] {\n    display: none;\n}\nbody.theme-dark .logo-light[data-v-0baa285e] {\n    display: none;\n}\nbody.theme-dark .logo-dark[data-v-0baa285e] {\n    display: block;\n}\n.sidebar-wrapper[data-v-0baa285e] {\n    top: 40px !important;\n    height: calc(100vh - 40px) !important;\n}\n#main[data-v-0baa285e] {\n    margin-top: 40px !important;\n}\n\n/* On narrow screens the message wraps to 2-3 lines - the fixed 40px height above was clipping\n   it and spilling the overflow onto the sidebar below. Let the banner grow with its content\n   instead, and bump the sidebar/#main offsets to match (kept in sync with the banner's own\n   min-height + padding below). */\n@media (max-width: 767px) {\n.global-announcement-banner[data-v-0baa285e] {\n        height: auto;\n        min-height: 40px;\n        padding: 8px 16px;\n        font-size: 12px;\n        line-height: 1.4;\n}\n.sidebar-wrapper[data-v-0baa285e] {\n        top: 72px !important;\n        height: calc(100vh - 72px) !important;\n}\n#main[data-v-0baa285e] {\n        margin-top: 72px !important;\n}\n}\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/containers/VerticalHeader.vue?vue&type=style&index=0&id=29466cd2&scoped=true&lang=css":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/containers/VerticalHeader.vue?vue&type=style&index=0&id=29466cd2&scoped=true&lang=css ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
___CSS_LOADER_EXPORT___.push([module.id, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n/* .navbar {\n    background: transparent;\n    padding: 0.75rem 1rem;\n} */\n/* \n.figma-header {\n    background: #fff;\n    position: sticky;\n    top: 0;\n    z-index: 1020;\n    border-bottom: 1px solid #F1F5F9;\n} */\n.figma-header[data-v-29466cd2] {\n    background: #fff;\n    box-shadow: none !important;\n    /* remove these */\n    /* position: sticky; */\n    /* top: 0; */\n    /* z-index: 1020; */\n}\n.navbar[data-v-29466cd2] {\n    background: transparent;\n    min-height: 70px;\n}\n.container-fluid[data-v-29466cd2] {\n    padding-left: 20px;\n    padding-right: 20px;\n}\n.website-link[data-v-29466cd2] {\n    background: #F8FAFC;\n    border-radius: 6px;\n    font-size: 0.8rem;\n    color: #475569;\n    text-decoration: none;\n    transition: all 0.2s ease;\n}\n.website-link[data-v-29466cd2]:hover {\n    background: #E2E8F0;\n    color: #10B981;\n}\n\n/* Sidebar Toggle Button */\n.burger-btn[data-v-29466cd2] {\n    background: #fff;\n    border: 1px solid #E2E8F0;\n    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);\n    padding: 8px 10px;\n    border-radius: 8px;\n    text-decoration: none;\n    transition: all 0.2s ease;\n}\n.burger-btn[data-v-29466cd2]:hover {\n    background: #F8FAFC;\n    transform: translateY(-1px);\n}\n\n/* Clear Cache Button - Light Green Style */\n.header-cache-btn[data-v-29466cd2] {\n    background: color-mix(in srgb, var(--figma-primary) 12%, white) !important;\n    color: var(--figma-primary) !important;\n    border: none !important;\n    padding: 8px 16px !important;\n    border-radius: 8px !important;\n    font-weight: 600 !important;\n    font-size: 0.85rem !important;\n    transition: all 0.2s ease !important;\n    box-shadow: none !important;\n}\n.header-cache-btn[data-v-29466cd2]:hover {\n    background: color-mix(in srgb, var(--figma-primary) 20%, white) !important;\n}\n\n/* Language Selector */\n.lang-selector[data-v-29466cd2] {\n    background: #ffffff;\n    border: 1px solid #EDEDED;\n    border-radius: 20px;\n    height: 40px;\n    width: 97px;\n    transition: all 0.2s ease;\n}\n.lang-selector[data-v-29466cd2]:hover {\n    background: #F8FAFC;\n}\n.lang-selector select[data-v-29466cd2]:focus {\n    outline: none !important;\n    box-shadow: none !important;\n    border: none !important;\n}\n\n/* Custom Language Dropdown Menu */\n.lang-dropdown-menu[data-v-29466cd2] {\n    min-width: 110px !important;\n    padding: 6px !important;\n    border-radius: 12px !important;\n    border: 1px solid #EDEDED !important;\n    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.02) !important;\n}\n.lang-dropdown-menu .dropdown-item[data-v-29466cd2] {\n    border-radius: 8px !important;\n    padding: 6px 12px !important;\n    color: #475569 !important;\n    font-size: 0.85rem !important;\n    transition: all 0.2s ease !important;\n}\n.lang-dropdown-menu .dropdown-item[data-v-29466cd2]:hover,\n.lang-dropdown-menu .dropdown-item.active[data-v-29466cd2] {\n    background-color: #F1F5F9 !important;\n    color: #10B981 !important;\n}\nbody.theme-dark .lang-dropdown-menu[data-v-29466cd2] {\n    background-color: #1b1b29 !important;\n    border-color: #2d2d44 !important;\n}\nbody.theme-dark .lang-dropdown-menu .dropdown-item[data-v-29466cd2] {\n    color: #cbd5e1 !important;\n}\nbody.theme-dark .lang-dropdown-menu .dropdown-item[data-v-29466cd2]:hover,\nbody.theme-dark .lang-dropdown-menu .dropdown-item.active[data-v-29466cd2] {\n    background-color: #2d2d44 !important;\n    color: #34d399 !important;\n}\n\n/* Icons styling */\n.nav-link i[data-v-29466cd2],\n.btn i[data-v-29466cd2] {\n    transition: color 0.2s ease;\n}\n.nav-link:hover i[data-v-29466cd2],\n.btn:hover i[data-v-29466cd2] {\n    color: #10B981 !important;\n}\n\n/* User Menu */\n.user-dropdown-link[data-v-29466cd2] {\n    text-decoration: none;\n    padding: 2px;\n    border-radius: 12px;\n    transition: background 0.2s ease;\n}\n.user-dropdown-link[data-v-29466cd2]:hover {\n    background: #F8FAFC;\n}\n.avatar-md img[data-v-29466cd2] {\n    width: 38px;\n    height: 38px;\n    -o-object-fit: cover;\n       object-fit: cover;\n    border: 2px solid #fff;\n    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\n}\n\n/* Dropdown styling */\n.dropdown-menu[data-v-29466cd2] {\n    border-radius: 12px;\n    padding: 0.5rem;\n    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05) !important;\n}\n.dropdown-item[data-v-29466cd2] {\n    border-radius: 8px;\n    padding: 0.6rem 1rem;\n    font-weight: 500;\n    color: #475569;\n}\n.dropdown-item[data-v-29466cd2]:hover {\n    background-color: #F8FAFC;\n    color: #10B981;\n}\n.dropdown-header[data-v-29466cd2] {\n    font-weight: 600;\n    color: #1E293B;\n    padding: 0.5rem 1rem;\n}\n\n/* Utility */\n.font-bold[data-v-29466cd2] {\n    font-weight: 700;\n}\n.font-medium[data-v-29466cd2] {\n    font-weight: 500;\n}\n.text-gray-400[data-v-29466cd2] {\n    color: #94A3B8;\n}\n.text-gray-600[data-v-29466cd2] {\n    color: #475569;\n}\n.text-gray-800[data-v-29466cd2] {\n    color: #1E293B;\n}\n.text-xs[data-v-29466cd2] {\n    font-size: 0.75rem;\n}\n\n/* Responsive adjustments */\n@media (max-width: 991px) {\n.navbar-collapse[data-v-29466cd2] {\n        background: #fff;\n        border-radius: 12px;\n        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);\n        padding: 1rem;\n        margin-top: 1rem;\n}\n}\n.text-wrap-custom[data-v-29466cd2] {\n    word-break: break-word !important;\n    overflow-wrap: break-word !important;\n    white-space: normal !important;\n}\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/containers/VerticalHeader.vue?vue&type=style&index=1&id=29466cd2&lang=css":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/containers/VerticalHeader.vue?vue&type=style&index=1&id=29466cd2&lang=css ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
___CSS_LOADER_EXPORT___.push([module.id, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n/* Unscoped high-fidelity overrides for Notifications Popover */\n.notification-dropdown {\n    width: 400px !important;\n    max-width: 400px !important;\n    padding: 0 !important;\n    border-radius: 0 !important;\n    overflow: hidden !important;\n}\n.notification-item-custom {\n    display: flex !important;\n    flex-direction: column !important;\n    width: 100% !important;\n    min-height: 116px !important;\n    padding: 16px !important;\n    gap: 0 !important;\n    border-bottom: 1px solid #EDEDED !important;\n    background: #ffffff !important;\n    cursor: pointer !important;\n    transition: background-color 0.2s ease !important;\n    white-space: normal !important;\n    text-decoration: none !important;\n    list-style: none !important;\n    text-align: left !important;\n}\n.notification-item-custom:hover {\n    background-color: #F8FAFC !important;\n}\n.notification-title-custom {\n    font-weight: 600 !important;\n    font-size: 16px !important;\n    line-height: 1.5 !important;\n    letter-spacing: 0 !important;\n    color: var(--Colors-Shades-Neutral-N---950, #000000) !important;\n    text-align: left !important;\n}\n.notification-time-custom {\n    font-family: inherit !important;\n    font-weight: 400 !important;\n    font-size: 14px !important;\n    line-height: 1.25 !important;\n    letter-spacing: 0 !important;\n    text-align: right !important;\n    color: var(--Colors-Shades-Neutral-N---800, #333333) !important;\n    flex-shrink: 0 !important;\n}\n.notification-body-custom {\n    font-family: inherit !important;\n    font-weight: 400 !important;\n    font-size: 14px !important;\n    line-height: 1.4 !important;\n    color: var(--Colors-Shades-Neutral-N---600, #666666) !important;\n    padding-left: 0 !important;\n    margin-top: 4px !important;\n    margin-bottom: 0 !important;\n    text-align: left !important;\n    word-break: break-word !important;\n    overflow-wrap: break-word !important;\n    white-space: normal !important;\n    display: block !important;\n    width: 100% !important;\n}\nbody.theme-dark .notification-dropdown,\nbody.theme-dark .dropdown-header {\n    background-color: #1b1b29 !important;\n    border-color: #2d2d44 !important;\n}\nbody.theme-dark .notification-item-custom {\n    background: #1b1b29 !important;\n    border-color: #2d2d44 !important;\n    text-align: left !important;\n}\nbody.theme-dark .notification-item-custom:hover {\n    background-color: #2d2d44 !important;\n}\nbody.theme-dark .notification-item-custom .text-dark {\n    color: #ffffff !important;\n}\nbody.theme-dark .notification-item-custom .text-muted {\n    color: #94A3B8 !important;\n}\nbody.theme-dark .notification-title-custom {\n    color: #ffffff !important;\n    text-align: left !important;\n}\nbody.theme-dark .notification-time-custom {\n    color: #94A3B8 !important;\n}\nbody.theme-dark .notification-body-custom {\n    color: #94A3B8 !important;\n    text-align: left !important;\n}\n.see-all-btn-custom {\n    display: flex !important;\n    align-items: center !important;\n    justify-content: center !important;\n    width: 400px !important;\n    height: 40px !important;\n    padding: 8px 16px !important;\n    gap: 8px !important;\n    border-radius: 0 !important;\n    background: var(--Colors-Shades-Neutral-N---950, #000000) !important;\n    color: #ffffff !important;\n    font-weight: 600 !important;\n    font-size: 0.9rem !important;\n    border: none !important;\n    text-decoration: none !important;\n    transition: background-color 0.2s ease !important;\n}\n.see-all-btn-custom:hover {\n    background-color: #1E293B !important;\n    color: #ffffff !important;\n}\nbody.theme-dark .see-all-btn-custom {\n    background-color: #11111d !important;\n    color: #ffffff !important;\n}\nbody.theme-dark .see-all-btn-custom:hover {\n    background-color: #2d2d44 !important;\n}\n\n/* Module Selector Styling */\n.module-selector {\n    background: #f3f4f6;\n    border: 1px solid #e5e7eb;\n    border-radius: 8px;\n    height: 40px;\n    min-width: 145px !important;\n    transition: all 0.2s ease;\n}\n.module-selector:hover {\n    background: #e5e7eb;\n}\nbody.theme-dark .module-selector {\n    background: #232334;\n    border-color: #3b3b4f;\n}\nbody.theme-dark .module-selector:hover {\n    background: #2d2d44;\n}\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/containers/TheContainerSeller.vue?vue&type=style&index=0&id=0baa285e&scoped=true&lang=css":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/containers/TheContainerSeller.vue?vue&type=style&index=0&id=0baa285e&scoped=true&lang=css ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_TheContainerSeller_vue_vue_type_style_index_0_id_0baa285e_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./TheContainerSeller.vue?vue&type=style&index=0&id=0baa285e&scoped=true&lang=css */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/containers/TheContainerSeller.vue?vue&type=style&index=0&id=0baa285e&scoped=true&lang=css");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_TheContainerSeller_vue_vue_type_style_index_0_id_0baa285e_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_TheContainerSeller_vue_vue_type_style_index_0_id_0baa285e_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/containers/VerticalHeader.vue?vue&type=style&index=0&id=29466cd2&scoped=true&lang=css":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/containers/VerticalHeader.vue?vue&type=style&index=0&id=29466cd2&scoped=true&lang=css ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_VerticalHeader_vue_vue_type_style_index_0_id_29466cd2_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./VerticalHeader.vue?vue&type=style&index=0&id=29466cd2&scoped=true&lang=css */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/containers/VerticalHeader.vue?vue&type=style&index=0&id=29466cd2&scoped=true&lang=css");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_VerticalHeader_vue_vue_type_style_index_0_id_29466cd2_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_VerticalHeader_vue_vue_type_style_index_0_id_29466cd2_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/containers/VerticalHeader.vue?vue&type=style&index=1&id=29466cd2&lang=css":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/containers/VerticalHeader.vue?vue&type=style&index=1&id=29466cd2&lang=css ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_VerticalHeader_vue_vue_type_style_index_1_id_29466cd2_lang_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./VerticalHeader.vue?vue&type=style&index=1&id=29466cd2&lang=css */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/containers/VerticalHeader.vue?vue&type=style&index=1&id=29466cd2&lang=css");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_VerticalHeader_vue_vue_type_style_index_1_id_29466cd2_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_VerticalHeader_vue_vue_type_style_index_1_id_29466cd2_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./resources/js/containers/TheContainerSeller.vue":
/*!********************************************************!*\
  !*** ./resources/js/containers/TheContainerSeller.vue ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _TheContainerSeller_vue_vue_type_template_id_0baa285e_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TheContainerSeller.vue?vue&type=template&id=0baa285e&scoped=true */ "./resources/js/containers/TheContainerSeller.vue?vue&type=template&id=0baa285e&scoped=true");
/* harmony import */ var _TheContainerSeller_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./TheContainerSeller.vue?vue&type=script&lang=js */ "./resources/js/containers/TheContainerSeller.vue?vue&type=script&lang=js");
/* harmony import */ var _TheContainerSeller_vue_vue_type_style_index_0_id_0baa285e_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./TheContainerSeller.vue?vue&type=style&index=0&id=0baa285e&scoped=true&lang=css */ "./resources/js/containers/TheContainerSeller.vue?vue&type=style&index=0&id=0baa285e&scoped=true&lang=css");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _TheContainerSeller_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _TheContainerSeller_vue_vue_type_template_id_0baa285e_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render,
  _TheContainerSeller_vue_vue_type_template_id_0baa285e_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "0baa285e",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/containers/TheContainerSeller.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/containers/TheFooter.vue":
/*!***********************************************!*\
  !*** ./resources/js/containers/TheFooter.vue ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _TheFooter_vue_vue_type_template_id_44bdf58d__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TheFooter.vue?vue&type=template&id=44bdf58d */ "./resources/js/containers/TheFooter.vue?vue&type=template&id=44bdf58d");
/* harmony import */ var _TheFooter_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./TheFooter.vue?vue&type=script&lang=js */ "./resources/js/containers/TheFooter.vue?vue&type=script&lang=js");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _TheFooter_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _TheFooter_vue_vue_type_template_id_44bdf58d__WEBPACK_IMPORTED_MODULE_0__.render,
  _TheFooter_vue_vue_type_template_id_44bdf58d__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/containers/TheFooter.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/containers/TheSidebar.vue":
/*!************************************************!*\
  !*** ./resources/js/containers/TheSidebar.vue ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _TheSidebar_vue_vue_type_template_id_08a98f4c__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TheSidebar.vue?vue&type=template&id=08a98f4c */ "./resources/js/containers/TheSidebar.vue?vue&type=template&id=08a98f4c");
/* harmony import */ var _TheSidebar_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./TheSidebar.vue?vue&type=script&lang=js */ "./resources/js/containers/TheSidebar.vue?vue&type=script&lang=js");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _TheSidebar_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _TheSidebar_vue_vue_type_template_id_08a98f4c__WEBPACK_IMPORTED_MODULE_0__.render,
  _TheSidebar_vue_vue_type_template_id_08a98f4c__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/containers/TheSidebar.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/containers/VerticalHeader.vue":
/*!****************************************************!*\
  !*** ./resources/js/containers/VerticalHeader.vue ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _VerticalHeader_vue_vue_type_template_id_29466cd2_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./VerticalHeader.vue?vue&type=template&id=29466cd2&scoped=true */ "./resources/js/containers/VerticalHeader.vue?vue&type=template&id=29466cd2&scoped=true");
/* harmony import */ var _VerticalHeader_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./VerticalHeader.vue?vue&type=script&lang=js */ "./resources/js/containers/VerticalHeader.vue?vue&type=script&lang=js");
/* harmony import */ var _VerticalHeader_vue_vue_type_style_index_0_id_29466cd2_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./VerticalHeader.vue?vue&type=style&index=0&id=29466cd2&scoped=true&lang=css */ "./resources/js/containers/VerticalHeader.vue?vue&type=style&index=0&id=29466cd2&scoped=true&lang=css");
/* harmony import */ var _VerticalHeader_vue_vue_type_style_index_1_id_29466cd2_lang_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./VerticalHeader.vue?vue&type=style&index=1&id=29466cd2&lang=css */ "./resources/js/containers/VerticalHeader.vue?vue&type=style&index=1&id=29466cd2&lang=css");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;



/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_4__["default"])(
  _VerticalHeader_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _VerticalHeader_vue_vue_type_template_id_29466cd2_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render,
  _VerticalHeader_vue_vue_type_template_id_29466cd2_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "29466cd2",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/containers/VerticalHeader.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/containers/TheContainerSeller.vue?vue&type=script&lang=js":
/*!********************************************************************************!*\
  !*** ./resources/js/containers/TheContainerSeller.vue?vue&type=script&lang=js ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_TheContainerSeller_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./TheContainerSeller.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/containers/TheContainerSeller.vue?vue&type=script&lang=js");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_TheContainerSeller_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/containers/TheFooter.vue?vue&type=script&lang=js":
/*!***********************************************************************!*\
  !*** ./resources/js/containers/TheFooter.vue?vue&type=script&lang=js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_TheFooter_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./TheFooter.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/containers/TheFooter.vue?vue&type=script&lang=js");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_TheFooter_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/containers/TheSidebar.vue?vue&type=script&lang=js":
/*!************************************************************************!*\
  !*** ./resources/js/containers/TheSidebar.vue?vue&type=script&lang=js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_TheSidebar_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./TheSidebar.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/containers/TheSidebar.vue?vue&type=script&lang=js");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_TheSidebar_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/containers/VerticalHeader.vue?vue&type=script&lang=js":
/*!****************************************************************************!*\
  !*** ./resources/js/containers/VerticalHeader.vue?vue&type=script&lang=js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_VerticalHeader_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./VerticalHeader.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/containers/VerticalHeader.vue?vue&type=script&lang=js");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_VerticalHeader_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/containers/TheContainerSeller.vue?vue&type=style&index=0&id=0baa285e&scoped=true&lang=css":
/*!****************************************************************************************************************!*\
  !*** ./resources/js/containers/TheContainerSeller.vue?vue&type=style&index=0&id=0baa285e&scoped=true&lang=css ***!
  \****************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_TheContainerSeller_vue_vue_type_style_index_0_id_0baa285e_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/style-loader/dist/cjs.js!../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./TheContainerSeller.vue?vue&type=style&index=0&id=0baa285e&scoped=true&lang=css */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/containers/TheContainerSeller.vue?vue&type=style&index=0&id=0baa285e&scoped=true&lang=css");


/***/ }),

/***/ "./resources/js/containers/VerticalHeader.vue?vue&type=style&index=0&id=29466cd2&scoped=true&lang=css":
/*!************************************************************************************************************!*\
  !*** ./resources/js/containers/VerticalHeader.vue?vue&type=style&index=0&id=29466cd2&scoped=true&lang=css ***!
  \************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_VerticalHeader_vue_vue_type_style_index_0_id_29466cd2_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/style-loader/dist/cjs.js!../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./VerticalHeader.vue?vue&type=style&index=0&id=29466cd2&scoped=true&lang=css */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/containers/VerticalHeader.vue?vue&type=style&index=0&id=29466cd2&scoped=true&lang=css");


/***/ }),

/***/ "./resources/js/containers/VerticalHeader.vue?vue&type=style&index=1&id=29466cd2&lang=css":
/*!************************************************************************************************!*\
  !*** ./resources/js/containers/VerticalHeader.vue?vue&type=style&index=1&id=29466cd2&lang=css ***!
  \************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_VerticalHeader_vue_vue_type_style_index_1_id_29466cd2_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/style-loader/dist/cjs.js!../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./VerticalHeader.vue?vue&type=style&index=1&id=29466cd2&lang=css */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/containers/VerticalHeader.vue?vue&type=style&index=1&id=29466cd2&lang=css");


/***/ }),

/***/ "./resources/js/containers/TheContainerSeller.vue?vue&type=template&id=0baa285e&scoped=true":
/*!**************************************************************************************************!*\
  !*** ./resources/js/containers/TheContainerSeller.vue?vue&type=template&id=0baa285e&scoped=true ***!
  \**************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_TheContainerSeller_vue_vue_type_template_id_0baa285e_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   staticRenderFns: () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_TheContainerSeller_vue_vue_type_template_id_0baa285e_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_TheContainerSeller_vue_vue_type_template_id_0baa285e_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./TheContainerSeller.vue?vue&type=template&id=0baa285e&scoped=true */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/containers/TheContainerSeller.vue?vue&type=template&id=0baa285e&scoped=true");


/***/ }),

/***/ "./resources/js/containers/TheFooter.vue?vue&type=template&id=44bdf58d":
/*!*****************************************************************************!*\
  !*** ./resources/js/containers/TheFooter.vue?vue&type=template&id=44bdf58d ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_TheFooter_vue_vue_type_template_id_44bdf58d__WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   staticRenderFns: () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_TheFooter_vue_vue_type_template_id_44bdf58d__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_TheFooter_vue_vue_type_template_id_44bdf58d__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./TheFooter.vue?vue&type=template&id=44bdf58d */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/containers/TheFooter.vue?vue&type=template&id=44bdf58d");


/***/ }),

/***/ "./resources/js/containers/TheSidebar.vue?vue&type=template&id=08a98f4c":
/*!******************************************************************************!*\
  !*** ./resources/js/containers/TheSidebar.vue?vue&type=template&id=08a98f4c ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_TheSidebar_vue_vue_type_template_id_08a98f4c__WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   staticRenderFns: () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_TheSidebar_vue_vue_type_template_id_08a98f4c__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_TheSidebar_vue_vue_type_template_id_08a98f4c__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./TheSidebar.vue?vue&type=template&id=08a98f4c */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/containers/TheSidebar.vue?vue&type=template&id=08a98f4c");


/***/ }),

/***/ "./resources/js/containers/VerticalHeader.vue?vue&type=template&id=29466cd2&scoped=true":
/*!**********************************************************************************************!*\
  !*** ./resources/js/containers/VerticalHeader.vue?vue&type=template&id=29466cd2&scoped=true ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_VerticalHeader_vue_vue_type_template_id_29466cd2_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   staticRenderFns: () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_VerticalHeader_vue_vue_type_template_id_29466cd2_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_VerticalHeader_vue_vue_type_template_id_29466cd2_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./VerticalHeader.vue?vue&type=template&id=29466cd2&scoped=true */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/containers/VerticalHeader.vue?vue&type=template&id=29466cd2&scoped=true");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/containers/TheContainerSeller.vue?vue&type=template&id=0baa285e&scoped=true":
/*!*****************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/containers/TheContainerSeller.vue?vue&type=template&id=0baa285e&scoped=true ***!
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
    "div",
    { attrs: { id: "app" } },
    [
      _c("div", { staticClass: "global-announcement-banner" }, [
        _c("i", { staticClass: "fa fa-exclamation-circle" }),
        _vm._v(" "),
        _c("span", [
          _vm._v(
            _vm._s(
              _vm.__("global_attributes_deprecation_notice") ||
                "Global attributes and custom fields-product are being deprecated in an upcoming update. Sellers will need to create their own attributes and custom fields-product - please replace any global attribute and custom fields-product currently used on your products."
            )
          ),
        ]),
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "active", attrs: { id: "sidebar" } }, [
        _c("div", { staticClass: "sidebar-wrapper active" }, [
          _c("div", { staticClass: "sidebar-header" }, [
            _c("div", { staticClass: "d-flex justify-content-between" }, [
              _c(
                "div",
                { staticClass: "logo" },
                [
                  _c(
                    "router-link",
                    {
                      staticStyle: {
                        display: "flex",
                        "align-items": "center",
                        "justify-content": "flex-start",
                      },
                      attrs: { to: "/seller" },
                    },
                    [
                      _vm.$appLogo != ""
                        ? _c("img", {
                            staticClass: "container-logo logo-light",
                            attrs: {
                              src: _vm.$storageUrl + _vm.$appLogo,
                              alt: "Logo",
                              srcset: "",
                            },
                          })
                        : _c("img", {
                            staticClass: "container-logo logo-light",
                            attrs: {
                              src: _vm.$baseUrl + "/images/logo.png",
                              alt: "Logo",
                              srcset: "",
                            },
                          }),
                      _vm._v(" "),
                      _vm.$appDarkLogo
                        ? _c("img", {
                            staticClass: "container-logo logo-dark",
                            attrs: {
                              src: _vm.$storageUrl + _vm.$appDarkLogo,
                              alt: "Logo",
                              srcset: "",
                            },
                          })
                        : _vm._e(),
                      _vm._v(
                        "\n                            " +
                          _vm._s(_vm.$appName) +
                          "\n                        "
                      ),
                    ]
                  ),
                ],
                1
              ),
            ]),
            _vm._v(" "),
            _vm._m(0),
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "sidebar-menu" }, [
            _c(
              "ul",
              { staticClass: "menu" },
              [
                _vm._l(_vm.visibleSidebarItems, function (item) {
                  return [
                    (
                      item.role == true
                        ? _vm.$role("Super Admin") &&
                          (item.name == "Role" || item.name == "System Users")
                        : item.permission || _vm.$can(item.permission)
                    )
                      ? _c(
                          "li",
                          {
                            staticClass: "sidebar-item",
                            class: {
                              active:
                                _vm.isActive(item.url) || _vm.subIsActive(item),
                              "has-sub": _vm.isHasSub(item),
                            },
                          },
                          [
                            _vm.isHasSub(item)
                              ? [
                                  _c("a", { staticClass: "sidebar-link" }, [
                                    _c("i", { class: "fa fa-" + item.icon }),
                                    _vm._v(" "),
                                    _c("span", [_vm._v(_vm._s(item.name))]),
                                  ]),
                                  _vm._v(" "),
                                  _c(
                                    "ul",
                                    {
                                      staticClass: "submenu",
                                      class: { active: _vm.subIsActive(item) },
                                    },
                                    [
                                      _vm._l(item.submenu, function (sub) {
                                        return [
                                          _c(
                                            "li",
                                            {
                                              key: sub.key,
                                              staticClass: "submenu-item",
                                              class: {
                                                active: _vm.isActive(sub.url),
                                              },
                                            },
                                            [
                                              _c(
                                                "router-link",
                                                { attrs: { to: sub.url } },
                                                [
                                                  _vm._v(
                                                    "\n                                                " +
                                                      _vm._s(sub.name) +
                                                      "\n                                            "
                                                  ),
                                                ]
                                              ),
                                            ],
                                            1
                                          ),
                                        ]
                                      }),
                                    ],
                                    2
                                  ),
                                ]
                              : [
                                  _c(
                                    "router-link",
                                    {
                                      staticClass: "sidebar-link",
                                      attrs: { to: item.url },
                                    },
                                    [
                                      _c("i", { class: "fa fa-" + item.icon }),
                                      _vm._v(" "),
                                      _c("span", [_vm._v(_vm._s(item.name))]),
                                    ]
                                  ),
                                ],
                          ],
                          2
                        )
                      : _vm._e(),
                  ]
                }),
              ],
              2
            ),
          ]),
          _vm._v(" "),
          _vm._m(1),
        ]),
      ]),
      _vm._v(" "),
      _c(
        "div",
        { attrs: { id: "main" } },
        [
          _c("vertical-header"),
          _vm._v(" "),
          _c("div", { staticClass: "main-content" }, [_c("router-view")], 1),
          _vm._v(" "),
          _c("the-footer"),
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "b-modal",
        {
          attrs: {
            id: "seller-blocked-modal",
            title: "Account Blocked",
            "no-close-on-backdrop": true,
            "no-close-on-esc": true,
            "hide-header-close": true,
            centered: "",
          },
          on: { ok: _vm.handleBlockedLogout },
          scopedSlots: _vm._u([
            {
              key: "modal-footer",
              fn: function (ref) {
                var ok = ref.ok
                return [
                  _c(
                    "b-button",
                    {
                      attrs: { variant: "primary" },
                      on: {
                        click: function ($event) {
                          return ok()
                        },
                      },
                    },
                    [_vm._v("\n                OK\n            ")]
                  ),
                ]
              },
            },
          ]),
        },
        [
          _c("div", { staticClass: "text-center" }, [
            _c("i", {
              staticClass: "fa fa-ban",
              staticStyle: { "font-size": "48px" },
            }),
            _vm._v(" "),
            _c("h5", { staticClass: "mt-3" }, [
              _vm._v("You are blocked by admin"),
            ]),
            _vm._v(" "),
            _c("h6", [_vm._v("Reason: " + _vm._s(_vm.remark))]),
            _vm._v(" "),
            _c("p", { staticClass: "text-muted" }, [
              _vm._v(
                "Your account has been blocked by admin. Please contact admin to unblock your\n                account."
              ),
            ]),
          ]),
        ]
      ),
    ],
    1
  )
}
var staticRenderFns = [
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "div",
      {
        staticClass: "toggler",
        staticStyle: {
          position: "absolute",
          top: "0",
          right: "0",
          display: "none !important",
        },
      },
      [
        _c(
          "a",
          {
            staticClass: "sidebar-hide",
            attrs: { href: "javascript:void(0)" },
          },
          [_c("i", { staticClass: "bi bi-x bi-middle" })]
        ),
      ]
    )
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("button", { staticClass: "sidebar-toggler btn x" }, [
      _c("i", { attrs: { "data-feather": "x" } }),
    ])
  },
]
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/containers/TheFooter.vue?vue&type=template&id=44bdf58d":
/*!********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/containers/TheFooter.vue?vue&type=template&id=44bdf58d ***!
  \********************************************************************************************************************************************************************************************************************/
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
  return _c("footer", { staticClass: "figma-footer" }, [
    _c("div", { staticClass: "copyright" }, [
      _c("span", { domProps: { innerHTML: _vm._s(_vm.copyrightDetails) } }),
    ]),
    _vm._v(" "),
    _vm.currentVersion
      ? _c("div", { staticClass: "version" }, [
          _c("span", { staticClass: "version-label me-2" }, [
            _vm._v(_vm._s(_vm.__("version"))),
          ]),
          _vm._v(" "),
          _c("span", { staticClass: "version-badge" }, [
            _vm._v(_vm._s(_vm.currentVersion)),
          ]),
        ])
      : _vm._e(),
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/containers/TheSidebar.vue?vue&type=template&id=08a98f4c":
/*!*********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/containers/TheSidebar.vue?vue&type=template&id=08a98f4c ***!
  \*********************************************************************************************************************************************************************************************************************/
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
    "CSidebar",
    {
      attrs: { fixed: "", minimize: _vm.minimize, show: _vm.show },
      on: {
        "update:show": function (value) {
          return _vm.$store.commit("set", ["sidebarShow", value])
        },
      },
    },
    [
      _c(
        "CSidebarBrand",
        { staticClass: "d-md-down-none", attrs: { to: "/" } },
        [
          _c("CIcon", {
            staticClass: "d-block",
            attrs: {
              name: "logo",
              size: "custom-size",
              height: 35,
              viewBox: "0 0 " + (_vm.minimize ? 110 : 556) + " 134",
            },
          }),
        ],
        1
      ),
      _vm._v(" "),
      _c("CRenderFunction", {
        attrs: { flat: "", "content-to-render": _vm.nav },
      }),
      _vm._v(" "),
      _c("CSidebarMinimizer", {
        staticClass: "d-md-down-none",
        nativeOn: {
          click: function ($event) {
            return _vm.$store.commit("set", ["sidebarMinimize", !_vm.minimize])
          },
        },
      }),
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/containers/VerticalHeader.vue?vue&type=template&id=29466cd2&scoped=true":
/*!*************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/containers/VerticalHeader.vue?vue&type=template&id=29466cd2&scoped=true ***!
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
    "header",
    { staticClass: "figma-header border-bottom" },
    [
      _c(
        "nav",
        { staticClass: "navbar navbar-expand-lg align-items-center py-0" },
        [
          _c(
            "div",
            {
              staticClass:
                "container-fluid px-4 py-2 d-flex justify-content-between",
            },
            [
              _c("div", { staticClass: "d-flex align-items-center gap-3" }, [
                _c(
                  "a",
                  {
                    staticClass:
                      "burger-btn d-flex align-items-center justify-content-center text-decoration-none",
                    staticStyle: {
                      width: "40px",
                      height: "40px",
                      margin: "0",
                      padding: "0",
                      background: "none",
                      border: "none",
                      "box-shadow": "none",
                    },
                    attrs: { href: "javascript:void(0)" },
                  },
                  [
                    _c("base-icon", {
                      attrs: { name: "Button", width: "40", height: "40" },
                    }),
                  ],
                  1
                ),
                _vm._v(" "),
                _c(
                  "button",
                  {
                    staticClass:
                      "header-cache-btn d-flex align-items-center justify-content-center",
                    staticStyle: {
                      width: "125px",
                      height: "40px",
                      gap: "8px",
                      margin: "0",
                    },
                    attrs: { type: "button" },
                    on: {
                      click: function ($event) {
                        _vm.popoverShow = true
                      },
                    },
                  },
                  [
                    _vm.isSystemRefreshing
                      ? _c("b-spinner", { attrs: { small: "" } })
                      : _c("span", [_vm._v(_vm._s(_vm.__("Clear Cache")))]),
                  ],
                  1
                ),
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "d-flex align-items-center gap-3" }, [
                _vm.role === this.$roleSuperAdmin
                  ? _c("div", { staticClass: "dropdown me-2" }, [
                      _c(
                        "div",
                        {
                          staticClass:
                            "module-selector d-flex align-items-center justify-content-between p-2",
                          staticStyle: {
                            cursor: "pointer",
                            "font-size": "0.85rem",
                          },
                          attrs: {
                            "data-bs-toggle": "dropdown",
                            "aria-expanded": "false",
                          },
                        },
                        [
                          _c(
                            "div",
                            { staticClass: "d-flex align-items-center" },
                            [
                              _c("img", {
                                staticClass: "me-2",
                                staticStyle: {
                                  width: "20px",
                                  height: "20px",
                                  "object-fit": "contain",
                                },
                                attrs: {
                                  src:
                                    (_vm.currentModule &&
                                      _vm.currentModule.image_url) ||
                                    _vm.$baseUrl +
                                      "/images/icons/module_default.svg",
                                },
                              }),
                              _vm._v(" "),
                              _c(
                                "span",
                                { staticClass: "fw-bold text-dark fs-6 ms-1" },
                                [_vm._v(_vm._s(_vm.currentModuleName))]
                              ),
                            ]
                          ),
                          _vm._v(" "),
                          _c("i", {
                            staticClass:
                              "bi bi-chevron-down text-dark fw-bold ms-2",
                            staticStyle: { "font-size": "0.8rem" },
                          }),
                        ]
                      ),
                      _vm._v(" "),
                      _c(
                        "ul",
                        {
                          staticClass:
                            "dropdown-menu dropdown-menu-end lang-dropdown-menu shadow border-0 mt-2",
                        },
                        _vm._l(_vm.modules, function (mod) {
                          return _c("li", { key: mod.id }, [
                            _c(
                              "a",
                              {
                                staticClass:
                                  "dropdown-item d-flex align-items-center gap-2 py-2",
                                class: {
                                  active: _vm.activeModuleId === mod.id,
                                },
                                attrs: { href: "javascript:void(0)" },
                                on: {
                                  click: function ($event) {
                                    return _vm.selectModule(mod.id)
                                  },
                                },
                              },
                              [
                                _c("img", {
                                  staticClass: "me-1",
                                  staticStyle: {
                                    width: "20px",
                                    height: "20px",
                                    "object-fit": "contain",
                                  },
                                  attrs: {
                                    src:
                                      mod.image_url ||
                                      _vm.$baseUrl +
                                        "/images/icons/module_default.svg",
                                  },
                                }),
                                _vm._v(" "),
                                _c("span", { staticClass: "fw-semibold" }, [
                                  _vm._v(_vm._s(mod.name)),
                                ]),
                              ]
                            ),
                          ])
                        }),
                        0
                      ),
                    ])
                  : _vm._e(),
                _vm._v(" "),
                _c("div", { staticClass: "dropdown" }, [
                  _c(
                    "div",
                    {
                      staticClass:
                        "lang-selector d-flex align-items-center justify-content-between p-2",
                      staticStyle: {
                        cursor: "pointer",
                        "font-size": "0.85rem",
                      },
                      attrs: {
                        "data-bs-toggle": "dropdown",
                        "aria-expanded": "false",
                      },
                    },
                    [
                      _c("img", {
                        staticClass: "rounded-circle",
                        staticStyle: {
                          width: "24px",
                          height: "24px",
                          "object-fit": "cover",
                        },
                        attrs: { src: _vm.currentFlag, alt: "flag" },
                      }),
                      _vm._v(" "),
                      _c(
                        "span",
                        { staticClass: "fw-bold text-dark fs-6 ms-1" },
                        [_vm._v(_vm._s(_vm.currentLanguageName))]
                      ),
                      _vm._v(" "),
                      _c("i", {
                        staticClass:
                          "bi bi-chevron-down text-dark fw-bold ms-1",
                        staticStyle: { "font-size": "0.8rem" },
                      }),
                    ]
                  ),
                  _vm._v(" "),
                  _c(
                    "ul",
                    {
                      staticClass:
                        "dropdown-menu dropdown-menu-end lang-dropdown-menu shadow border-0 mt-2",
                    },
                    _vm._l(_vm.languages, function (language) {
                      return _c("li", { key: language.code }, [
                        _c(
                          "a",
                          {
                            staticClass:
                              "dropdown-item d-flex align-items-center gap-2 py-2",
                            class: { active: _vm.lang === language.code },
                            attrs: { href: "javascript:void(0)" },
                            on: {
                              click: function ($event) {
                                return _vm.selectLanguage(language.code)
                              },
                            },
                          },
                          [
                            _c("img", {
                              staticClass: "rounded-circle",
                              staticStyle: {
                                width: "18px",
                                height: "18px",
                                "object-fit": "cover",
                              },
                              attrs: {
                                src: _vm.getFlagByCode(language.code),
                                alt: "flag",
                              },
                            }),
                            _vm._v(" "),
                            _c("span", { staticClass: "fw-semibold" }, [
                              _vm._v(_vm._s(language.name.substring(0, 3))),
                            ]),
                          ]
                        ),
                      ])
                    }),
                    0
                  ),
                ]),
                _vm._v(" "),
                _c(
                  "button",
                  {
                    staticClass:
                      "btn p-0 border-0 d-flex align-items-center justify-content-center",
                    class:
                      _vm.userTheme === "theme-dark"
                        ? "text-white"
                        : "text-dark",
                    staticStyle: { width: "40px", height: "40px" },
                    on: { click: _vm.toggleTheme },
                  },
                  [
                    _vm.userTheme === "theme-dark"
                      ? _c(
                          "svg",
                          {
                            attrs: {
                              width: "28",
                              height: "28",
                              viewBox: "8 8 36 36",
                              fill: "none",
                              xmlns: "http://www.w3.org/2000/svg",
                            },
                          },
                          [
                            _c("circle", {
                              attrs: {
                                cx: "26",
                                cy: "26",
                                r: "9",
                                fill: "currentColor",
                              },
                            }),
                            _vm._v(" "),
                            _c("path", {
                              attrs: {
                                d: "M26 13V9M26 43V39M13 26H9M43 26H39M16.8076 16.8076L13.9792 13.9792M38.0208 38.0208L35.1924 35.1924M16.8076 35.1924L13.9792 38.0208M38.0208 13.9792L35.1924 16.8076",
                                stroke: "currentColor",
                                "stroke-width": "3",
                                "stroke-linecap": "round",
                              },
                            }),
                          ]
                        )
                      : _c("base-icon", {
                          staticStyle: {
                            transform: "scale(2.2)",
                            flex: "none",
                          },
                          attrs: {
                            name: "Theme Switch",
                            width: "24",
                            height: "24",
                            useCurrentColor: "",
                          },
                        }),
                  ],
                  1
                ),
                _vm._v(" "),
                _c("div", { staticClass: "d-flex align-items-center" }, [
                  _c(
                    "a",
                    {
                      staticClass:
                        "btn p-0 border-0 d-flex align-items-center justify-content-center",
                      class:
                        _vm.userTheme === "theme-dark"
                          ? "text-white"
                          : "text-dark",
                      staticStyle: { width: "40px", height: "40px" },
                      attrs: { href: _vm.websiteUrl, target: "_blank" },
                    },
                    [
                      _c("base-icon", {
                        staticStyle: { transform: "scale(2.2)", flex: "none" },
                        attrs: {
                          name: "Website",
                          width: "24",
                          height: "24",
                          useCurrentColor: "",
                        },
                      }),
                    ],
                    1
                  ),
                ]),
                _vm._v(" "),
                _c(
                  "li",
                  {
                    staticClass: "nav-item dropdown d-flex align-items-center",
                  },
                  [
                    _c(
                      "a",
                      {
                        staticClass:
                          "nav-link p-1 position-relative d-flex align-items-center justify-content-center",
                        class:
                          _vm.userTheme === "theme-dark"
                            ? "text-white"
                            : "text-dark",
                        staticStyle: { width: "40px", height: "40px" },
                        attrs: {
                          href: "#",
                          "data-bs-toggle": "dropdown",
                          "aria-expanded": "false",
                        },
                      },
                      [
                        _c("base-icon", {
                          attrs: {
                            name: "Bell",
                            width: "24",
                            height: "24",
                            useCurrentColor: "",
                          },
                        }),
                        _vm._v(" "),
                        _vm.notifications_unread_count > 0
                          ? _c(
                              "span",
                              {
                                staticClass:
                                  "position-absolute translate-middle badge rounded-circle bg-danger p-0 d-flex align-items-center justify-content-center",
                                staticStyle: {
                                  "font-size": "0.65rem",
                                  "min-width": "16px",
                                  height: "16px",
                                  top: "10px",
                                  left: "30px",
                                  border: "1.5px solid #fff",
                                },
                              },
                              [
                                _vm._v(
                                  "\n                                " +
                                    _vm._s(_vm.notifications_unread_count) +
                                    "\n                            "
                                ),
                              ]
                            )
                          : _vm._e(),
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _c(
                      "ul",
                      {
                        staticClass:
                          "dropdown-menu dropdown-menu-end notification-dropdown shadow border-0 mt-2 p-0",
                        staticStyle: {
                          width: "400px",
                          "max-width": "400px",
                          overflow: "hidden",
                          "border-radius": "0",
                        },
                        attrs: { "aria-labelledby": "dropdownMenuButton" },
                      },
                      [
                        _c(
                          "div",
                          {
                            staticClass:
                              "dropdown-header d-flex justify-content-between align-items-center px-4 py-3 border-bottom",
                            staticStyle: {
                              background: "#ffffff",
                              "border-radius": "0",
                            },
                          },
                          [
                            _c(
                              "span",
                              { staticClass: "fw-bold text-dark fs-6" },
                              [_vm._v(_vm._s(_vm.__("notifications")))]
                            ),
                            _vm._v(" "),
                            _vm.notifications_unread_count > 0
                              ? _c(
                                  "button",
                                  {
                                    staticClass:
                                      "btn btn-sm btn-link text-primary p-0 font-medium text-decoration-none shadow-none",
                                    staticStyle: { "font-size": "0.8rem" },
                                    on: {
                                      click: function ($event) {
                                        $event.stopPropagation()
                                        return _vm.confirmMarkAllAsRead.apply(
                                          null,
                                          arguments
                                        )
                                      },
                                    },
                                  },
                                  [
                                    _c("i", {
                                      staticClass: "bi bi-check-all me-1",
                                    }),
                                    _vm._v(
                                      _vm._s(_vm.__("read_all_notifications")) +
                                        "\n                                "
                                    ),
                                  ]
                                )
                              : _vm._e(),
                          ]
                        ),
                        _vm._v(" "),
                        _c(
                          "div",
                          {
                            staticClass: "notification-list-scroll",
                            staticStyle: {
                              "max-height": "464px",
                              "overflow-y": "auto",
                            },
                          },
                          [
                            _vm._l(
                              _vm.notifications.slice(0, 4),
                              function (notification) {
                                return _c(
                                  "li",
                                  {
                                    key: notification.id,
                                    staticClass: "notification-item-custom",
                                    on: {
                                      click: function ($event) {
                                        return _vm.handleNotificationClick(
                                          notification
                                        )
                                      },
                                    },
                                  },
                                  [
                                    _c(
                                      "div",
                                      {
                                        staticClass:
                                          "d-flex align-items-start w-100",
                                        staticStyle: { gap: "16px" },
                                      },
                                      [
                                        _c("base-icon", {
                                          staticStyle: { "flex-shrink": "0" },
                                          attrs: {
                                            name: "notification",
                                            width: "40",
                                            height: "40",
                                          },
                                        }),
                                        _vm._v(" "),
                                        _c(
                                          "div",
                                          {
                                            staticClass:
                                              "d-flex flex-column flex-grow-1",
                                            staticStyle: {
                                              "min-width": "0",
                                              gap: "4px",
                                            },
                                          },
                                          [
                                            _c(
                                              "div",
                                              {
                                                staticClass:
                                                  "d-flex justify-content-between align-items-center w-100",
                                              },
                                              [
                                                _c(
                                                  "span",
                                                  {
                                                    staticClass:
                                                      "text-truncate notification-title-custom",
                                                  },
                                                  [
                                                    _vm._v(
                                                      "\n                                                    " +
                                                        _vm._s(
                                                          _vm.parseNotification(
                                                            notification
                                                          ).title
                                                        ) +
                                                        "\n                                                "
                                                    ),
                                                  ]
                                                ),
                                                _vm._v(" "),
                                                _c(
                                                  "span",
                                                  {
                                                    staticClass:
                                                      "notification-time-custom ms-2",
                                                  },
                                                  [
                                                    _vm._v(
                                                      "\n                                                    " +
                                                        _vm._s(
                                                          _vm.changeDateTime(
                                                            notification.created_at
                                                          )
                                                        ) +
                                                        "\n                                                "
                                                    ),
                                                  ]
                                                ),
                                              ]
                                            ),
                                            _vm._v(" "),
                                            _c(
                                              "p",
                                              {
                                                staticClass:
                                                  "notification-body-custom",
                                              },
                                              [
                                                _vm._v(
                                                  "\n                                                " +
                                                    _vm._s(
                                                      _vm.parseNotification(
                                                        notification
                                                      ).body
                                                    ) +
                                                    "\n                                            "
                                                ),
                                              ]
                                            ),
                                          ]
                                        ),
                                      ],
                                      1
                                    ),
                                  ]
                                )
                              }
                            ),
                            _vm._v(" "),
                            _vm.notifications.length == 0
                              ? _c(
                                  "li",
                                  { staticClass: "p-4 text-center text-muted" },
                                  [
                                    _vm._v(
                                      "\n                                    " +
                                        _vm._s(_vm.__("no_new_notification")) +
                                        "\n                                "
                                    ),
                                  ]
                                )
                              : _vm._e(),
                          ],
                          2
                        ),
                        _vm._v(" "),
                        _c("div", { staticClass: "notification-footer p-0" }, [
                          _vm.isSellerRoute
                            ? _c(
                                "a",
                                {
                                  staticClass: "see-all-btn-custom",
                                  attrs: { href: "javascript:void(0)" },
                                  on: {
                                    click: function ($event) {
                                      return _vm.$router.push(
                                        "/seller/notification_panel"
                                      )
                                    },
                                  },
                                },
                                [
                                  _c("span", [
                                    _vm._v(
                                      _vm._s(
                                        _vm.__("see_all_notifications") ===
                                          "see_all_notifications"
                                          ? "See All Notifications"
                                          : _vm.__("see_all_notifications")
                                      )
                                    ),
                                  ]),
                                  _vm._v(" "),
                                  _c("base-icon", {
                                    attrs: {
                                      name: "ArrowRight",
                                      width: "16",
                                      height: "16",
                                    },
                                  }),
                                ],
                                1
                              )
                            : _vm.isDeliveryBoyRoute
                            ? _c(
                                "a",
                                {
                                  staticClass: "see-all-btn-custom",
                                  attrs: { href: "javascript:void(0)" },
                                  on: {
                                    click: function ($event) {
                                      return _vm.$router.push(
                                        "/delivery_boy/notification_panel"
                                      )
                                    },
                                  },
                                },
                                [
                                  _c("span", [
                                    _vm._v(
                                      _vm._s(
                                        _vm.__("see_all_notifications") ===
                                          "see_all_notifications"
                                          ? "See All Notifications"
                                          : _vm.__("see_all_notifications")
                                      )
                                    ),
                                  ]),
                                  _vm._v(" "),
                                  _c("base-icon", {
                                    attrs: {
                                      name: "ArrowRight",
                                      width: "16",
                                      height: "16",
                                    },
                                  }),
                                ],
                                1
                              )
                            : _c(
                                "a",
                                {
                                  staticClass: "see-all-btn-custom",
                                  attrs: { href: "javascript:void(0)" },
                                  on: {
                                    click: function ($event) {
                                      return _vm.$router.push(
                                        "/notification_panel"
                                      )
                                    },
                                  },
                                },
                                [
                                  _c("span", [
                                    _vm._v(
                                      _vm._s(
                                        _vm.__("see_all_notifications") ===
                                          "see_all_notifications"
                                          ? "See All Notifications"
                                          : _vm.__("see_all_notifications")
                                      )
                                    ),
                                  ]),
                                  _vm._v(" "),
                                  _c("base-icon", {
                                    attrs: {
                                      name: "ArrowRight",
                                      width: "16",
                                      height: "16",
                                    },
                                  }),
                                ],
                                1
                              ),
                        ]),
                      ]
                    ),
                  ]
                ),
                _vm._v(" "),
                _c("div", {
                  staticClass: "vr mx-2 bg-secondary",
                  staticStyle: {
                    width: "1px",
                    height: "32px",
                    opacity: "0.25",
                  },
                }),
                _vm._v(" "),
                _c("div", { staticClass: "dropdown" }, [
                  _c(
                    "a",
                    {
                      staticClass:
                        "d-flex align-items-center gap-2 text-decoration-none",
                      attrs: {
                        href: "#",
                        "data-bs-toggle": "dropdown",
                        "aria-expanded": "false",
                      },
                    },
                    [
                      _c("img", {
                        staticClass: "rounded-circle shadow-sm",
                        staticStyle: { "object-fit": "cover" },
                        attrs: {
                          src: _vm.profile_url,
                          width: "40",
                          height: "40",
                        },
                      }),
                      _vm._v(" "),
                      _c(
                        "div",
                        {
                          staticClass:
                            "d-none d-sm-flex flex-column text-start align-items-start",
                          staticStyle: { "line-height": "1.1" },
                        },
                        [
                          _c("div", { staticClass: "fw-bold text-dark fs-6" }, [
                            _vm._v(_vm._s(_vm.user.username)),
                          ]),
                          _vm._v(" "),
                          _c(
                            "span",
                            {
                              staticClass:
                                "text-muted text-uppercase fw-bold figma-user-role-text",
                              staticStyle: {
                                "font-size": "0.65rem",
                                "letter-spacing": "0.5px",
                              },
                            },
                            [_vm._v(_vm._s(_vm.role))]
                          ),
                        ]
                      ),
                      _vm._v(" "),
                      _c("i", {
                        staticClass:
                          "bi bi-chevron-down text-dark fw-bold ms-1",
                        staticStyle: { "font-size": "0.8rem" },
                      }),
                    ]
                  ),
                  _vm._v(" "),
                  _c(
                    "ul",
                    {
                      staticClass:
                        "dropdown-menu dropdown-menu-end user-dropdown-menu",
                      attrs: { "aria-labelledby": "dropdownMenuButton" },
                    },
                    [
                      _c("li", [
                        _c("h6", { staticClass: "dropdown-header" }, [
                          _vm._v(
                            _vm._s(_vm.__("hello")) +
                              ", " +
                              _vm._s(_vm.user.username) +
                              "!"
                          ),
                        ]),
                      ]),
                      _vm._v(" "),
                      _c(
                        "li",
                        [
                          _vm.role == this.$roleSeller
                            ? _c(
                                "router-link",
                                {
                                  staticClass: "dropdown-item",
                                  attrs: { to: "/seller/profile" },
                                },
                                [
                                  _c("i", {
                                    staticClass: "icon-mid bi bi-person me-2",
                                  }),
                                  _vm._v(
                                    " " +
                                      _vm._s(_vm.__("my_profile")) +
                                      "\n                                "
                                  ),
                                ]
                              )
                            : _vm._e(),
                          _vm._v(" "),
                          _vm.role == this.$roleDeliveryBoy
                            ? _c(
                                "router-link",
                                {
                                  staticClass: "dropdown-item",
                                  attrs: { to: "/delivery_boy/profile" },
                                },
                                [
                                  _c("i", {
                                    staticClass: "icon-mid bi bi-person me-2",
                                  }),
                                  _vm._v(
                                    " " +
                                      _vm._s(_vm.__("my_profile")) +
                                      "\n                                "
                                  ),
                                ]
                              )
                            : _vm._e(),
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "li",
                        [
                          _vm.role == this.$roleSuperAdmin
                            ? _c(
                                "router-link",
                                {
                                  staticClass: "dropdown-item",
                                  attrs: { to: "/settings" },
                                },
                                [
                                  _c("i", {
                                    staticClass: "icon-mid bi bi-gear me-2",
                                  }),
                                  _vm._v(
                                    " " +
                                      _vm._s(_vm.__("settings")) +
                                      "\n                                "
                                  ),
                                ]
                              )
                            : _vm._e(),
                          _vm._v(" "),
                          _vm.role == this.$roleSeller
                            ? _c(
                                "router-link",
                                {
                                  staticClass: "dropdown-item",
                                  attrs: { to: "/seller/settings" },
                                },
                                [
                                  _c("i", {
                                    staticClass: "icon-mid bi bi-gear me-2",
                                  }),
                                  _vm._v(
                                    " " +
                                      _vm._s(_vm.__("settings")) +
                                      "\n                                "
                                  ),
                                ]
                              )
                            : _vm._e(),
                          _vm._v(" "),
                          _vm.role == this.$roleDeliveryBoy
                            ? _c(
                                "router-link",
                                {
                                  staticClass: "dropdown-item",
                                  attrs: { to: "/delivery_boy/settings" },
                                },
                                [
                                  _c("i", {
                                    staticClass: "icon-mid bi bi-gear me-2",
                                  }),
                                  _vm._v(
                                    " " +
                                      _vm._s(_vm.__("settings")) +
                                      "\n                                "
                                  ),
                                ]
                              )
                            : _vm._e(),
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _vm.role == this.$roleSeller
                        ? _c("li", [
                            _c("div", { staticClass: "dropdown-item" }, [
                              _c(
                                "div",
                                { staticClass: "form-check form-switch fs-6" },
                                [
                                  _c("input", {
                                    directives: [
                                      {
                                        name: "model",
                                        rawName: "v-model",
                                        value: _vm.sellerStatus,
                                        expression: "sellerStatus",
                                      },
                                    ],
                                    staticClass: "form-check-input me-0",
                                    staticStyle: { cursor: "pointer" },
                                    attrs: {
                                      type: "checkbox",
                                      id: "status",
                                      "true-value": 1,
                                      "false-value": 3,
                                      disabled: _vm.sellerStatusLoading,
                                    },
                                    domProps: {
                                      checked: Array.isArray(_vm.sellerStatus)
                                        ? _vm._i(_vm.sellerStatus, null) > -1
                                        : _vm._q(_vm.sellerStatus, 1),
                                    },
                                    on: {
                                      change: [
                                        function ($event) {
                                          var $$a = _vm.sellerStatus,
                                            $$el = $event.target,
                                            $$c = $$el.checked ? 1 : 3
                                          if (Array.isArray($$a)) {
                                            var $$v = null,
                                              $$i = _vm._i($$a, $$v)
                                            if ($$el.checked) {
                                              $$i < 0 &&
                                                (_vm.sellerStatus = $$a.concat([
                                                  $$v,
                                                ]))
                                            } else {
                                              $$i > -1 &&
                                                (_vm.sellerStatus = $$a
                                                  .slice(0, $$i)
                                                  .concat($$a.slice($$i + 1)))
                                            }
                                          } else {
                                            _vm.sellerStatus = $$c
                                          }
                                        },
                                        _vm.toggleSellerStatus,
                                      ],
                                    },
                                  }),
                                  _vm._v(" "),
                                  _vm.sellerStatus === 1
                                    ? _c(
                                        "label",
                                        {
                                          staticClass: "badge bg-success ms-2",
                                        },
                                        [
                                          _vm._v(
                                            "\n                                            " +
                                              _vm._s(_vm.__("active")) +
                                              "\n                                        "
                                          ),
                                        ]
                                      )
                                    : _c(
                                        "label",
                                        { staticClass: "badge bg-danger ms-2" },
                                        [
                                          _vm._v(
                                            "\n                                            " +
                                              _vm._s(_vm.__("deactive")) +
                                              "\n                                        "
                                          ),
                                        ]
                                      ),
                                ]
                              ),
                            ]),
                          ])
                        : _vm._e(),
                      _vm._v(" "),
                      _vm.role == this.$roleDeliveryBoy
                        ? _c("li", [
                            _c("div", { staticClass: "dropdown-item" }, [
                              _c(
                                "div",
                                { staticClass: "form-check form-switch fs-6" },
                                [
                                  _c("input", {
                                    directives: [
                                      {
                                        name: "model",
                                        rawName: "v-model",
                                        value: _vm.deliveryBoyStatus,
                                        expression: "deliveryBoyStatus",
                                      },
                                    ],
                                    staticClass: "form-check-input me-0",
                                    staticStyle: { cursor: "pointer" },
                                    attrs: {
                                      type: "checkbox",
                                      id: "status",
                                      "true-value": 1,
                                      "false-value": 3,
                                      disabled: _vm.deliveryBoyStatusLoading,
                                    },
                                    domProps: {
                                      checked: Array.isArray(
                                        _vm.deliveryBoyStatus
                                      )
                                        ? _vm._i(_vm.deliveryBoyStatus, null) >
                                          -1
                                        : _vm._q(_vm.deliveryBoyStatus, 1),
                                    },
                                    on: {
                                      change: [
                                        function ($event) {
                                          var $$a = _vm.deliveryBoyStatus,
                                            $$el = $event.target,
                                            $$c = $$el.checked ? 1 : 3
                                          if (Array.isArray($$a)) {
                                            var $$v = null,
                                              $$i = _vm._i($$a, $$v)
                                            if ($$el.checked) {
                                              $$i < 0 &&
                                                (_vm.deliveryBoyStatus =
                                                  $$a.concat([$$v]))
                                            } else {
                                              $$i > -1 &&
                                                (_vm.deliveryBoyStatus = $$a
                                                  .slice(0, $$i)
                                                  .concat($$a.slice($$i + 1)))
                                            }
                                          } else {
                                            _vm.deliveryBoyStatus = $$c
                                          }
                                        },
                                        _vm.toggleDeliveryBoyStatus,
                                      ],
                                    },
                                  }),
                                  _vm._v(" "),
                                  _vm.deliveryBoyStatus === 1
                                    ? _c(
                                        "label",
                                        {
                                          staticClass: "badge bg-success ms-2",
                                        },
                                        [
                                          _vm._v(
                                            "\n                                            " +
                                              _vm._s(_vm.__("active")) +
                                              "\n                                        "
                                          ),
                                        ]
                                      )
                                    : _c(
                                        "label",
                                        { staticClass: "badge bg-danger ms-2" },
                                        [
                                          _vm._v(
                                            "\n                                            " +
                                              _vm._s(_vm.__("deactive")) +
                                              "\n                                        "
                                          ),
                                        ]
                                      ),
                                ]
                              ),
                            ]),
                          ])
                        : _vm._e(),
                      _vm._v(" "),
                      _vm._m(0),
                      _vm._v(" "),
                      _c("li", [
                        _c(
                          "a",
                          {
                            staticClass: "dropdown-item",
                            on: {
                              click: function ($event) {
                                return _vm.logout()
                              },
                            },
                          },
                          [
                            _c("i", {
                              staticClass: "icon-mid bi bi-box-arrow-left me-2",
                            }),
                            _vm._v(
                              _vm._s(_vm.__("logout")) +
                                "\n                                "
                            ),
                          ]
                        ),
                      ]),
                    ]
                  ),
                ]),
              ]),
            ]
          ),
        ]
      ),
      _vm._v(" "),
      _c(
        "b-modal",
        {
          attrs: {
            id: "cache-confirm-modal",
            title: _vm.__("are_you_sure"),
            "hide-footer": "",
            centered: "",
          },
          model: {
            value: _vm.popoverShow,
            callback: function ($$v) {
              _vm.popoverShow = $$v
            },
            expression: "popoverShow",
          },
        },
        [
          _c("span", [_vm._v(_vm._s(_vm.__("cache:clear")))]),
          _vm._v(",\n"),
          _c("span", [_vm._v(_vm._s(_vm.__("config:clear")))]),
          _vm._v(",\n"),
          _c("span", [_vm._v(_vm._s(_vm.__("route:clear")))]),
          _vm._v(",\n"),
          _c("span", [_vm._v(_vm._s(_vm.__("view:clear")))]),
          _vm._v(" "),
          _vm.isSystemRefreshing
            ? _c("b-spinner", { attrs: { small: "", label: "Spinning" } })
            : _vm._e(),
          _vm._v(" "),
          _c("hr"),
          _vm._v(" "),
          _c(
            "div",
            {
              staticClass:
                "d-flex flex-row justify-content-between align-items-center",
            },
            [
              _c(
                "b-button",
                {
                  attrs: { size: "sm", variant: "outline-danger" },
                  on: {
                    click: function ($event) {
                      _vm.popoverShow = false
                    },
                  },
                },
                [_vm._v(_vm._s(_vm.__("cancel")))]
              ),
              _vm._v(" "),
              _c(
                "b-button",
                {
                  attrs: {
                    size: "sm",
                    variant: "primary",
                    disabled: _vm.isSystemRefreshing,
                  },
                  on: { click: _vm.clearCache },
                },
                [
                  _vm.isSystemRefreshing
                    ? _c("b-spinner", {
                        attrs: { small: "", label: "Spinning" },
                      })
                    : _vm._e(),
                  _vm._v(
                    "\n                    " +
                      _vm._s(_vm.__("ok")) +
                      "\n                "
                  ),
                ],
                1
              ),
            ],
            1
          ),
        ],
        1
      ),
    ],
    1
  )
}
var staticRenderFns = [
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("li", [_c("hr", { staticClass: "dropdown-divider" })])
  },
]
render._withStripped = true



/***/ })

}]);