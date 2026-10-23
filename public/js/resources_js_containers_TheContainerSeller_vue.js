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
    this.observeBannerHeight();
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
    if (window.innerWidth < 1200) {
      var _document$getElementB, _document$getElementB2;
      (_document$getElementB = document.getElementById('sidebar')) === null || _document$getElementB === void 0 ? void 0 : (_document$getElementB2 = _document$getElementB.classList) === null || _document$getElementB2 === void 0 ? void 0 : _document$getElementB2.remove('active');
    }
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
    this.scrollSidebarToActive();
  },
  beforeDestroy: function beforeDestroy() {
    if (this.bannerObserver) this.bannerObserver.disconnect();
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
        icon: 'box-open',
        url: '/seller/self_pickup_orders',
        permission: 'self_pickup_order_list'
      }, {
        name: 'Delivery Boy Requests',
        icon: 'user-plus',
        url: '/seller/delivery_boy_requests',
        permission: 'order_list'
      }, {
        name: 'My Delivery Boys',
        icon: 'motorcycle',
        url: '/seller/my_delivery_fleet',
        permission: 'order_list'
      }, {
        name: 'Delivery Boy Salary',
        icon: 'file-invoice-dollar',
        url: '/seller/delivery_boy_salary',
        permission: 'order_list'
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
        }]
      }, {
        name: __('custom_fields'),
        icon: 'list-alt',
        url: '/seller/custom_fields',
        permission: 'product_list'
      }, {
        name: __('stock_management'),
        icon: 'cubes',
        url: '/seller/manage_stock',
        permission: 'product_list'
      }, {
        name: __('abandoned_carts'),
        icon: 'shopping-cart',
        url: '/seller/carts',
        permission: 'order_list'
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
        icon: 'wallet',
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
    announcementText: function announcementText() {
      return __('global_attributes_deprecation_notice') || 'Global attributes and custom fields-product are being deprecated in an upcoming update. Sellers will need to create their own attributes and custom fields-product - please replace any global attribute and custom fields-product currently used on your products.';
    },
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
    // Phones / tablets: tapping a final menu item closes the slide-in sidebar.
    closeSideBarMenu: function closeSideBarMenu() {
      if (window.innerWidth < 1200) {
        var _document$getElementB11, _document$getElementB12;
        (_document$getElementB11 = document.getElementById('sidebar')) === null || _document$getElementB11 === void 0 ? void 0 : (_document$getElementB12 = _document$getElementB11.classList) === null || _document$getElementB12 === void 0 ? void 0 : _document$getElementB12.remove('active');
        var backdrop = document.querySelector('.sidebar-backdrop');
        if (backdrop) backdrop.remove();
      }
    },
    // Bring the active menu item into view by scrolling only the sidebar list. scrollIntoView()
    // also scrolled the page itself, which on phones (off-canvas sidebar) hid the top bar.
    scrollSidebarToActive: function scrollSidebarToActive() {
      var item = document.querySelector('#sidebar .sidebar-item.active');
      var wrapper = document.querySelector('#sidebar .sidebar-wrapper');
      if (!item || !wrapper) return;
      var offset = item.getBoundingClientRect().top - wrapper.getBoundingClientRect().top;
      wrapper.scrollTop += offset - wrapper.clientHeight / 2;
    },
    // The announcement banner wraps to several lines on phones, so its height is not a fixed 40/72px.
    // Publish the real height as --banner-h so the sidebar and content offsets always clear it.
    observeBannerHeight: function observeBannerHeight() {
      var banner = document.querySelector('.global-announcement-banner');
      if (!banner) return;
      var apply = function apply() {
        return document.documentElement.style.setProperty('--banner-h', banner.offsetHeight + 'px');
      };
      apply();
      if (window.ResizeObserver) {
        this.bannerObserver = new ResizeObserver(apply);
        this.bannerObserver.observe(banner);
      } else {
        window.addEventListener('resize', apply);
      }
    },
    subIsActive: function subIsActive(item) {
      var _this2 = this;
      var paths = Array.isArray(item.submenu) ? item.submenu : [];
      return paths.some(function (path) {
        return _this2.$route.path.indexOf(path.url) === 0;
      });
    },
    isActive: function isActive(url) {
      // The dashboard menu item links to the panel root, which redirects to its dashboard route.
      if (this.$route.path == url || url === '/seller' && this.$route.path === '/seller/dashboard') {
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
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
      themeIconSpinning: false,
      isToggle: false,
      //seller status
      sellerStatus: null,
      sellerStatusLoading: false,
      // Start from what the login response (or last stored user) says about this driver, so the
      // switches are right straight after login; getDeliveryBoyStatus() then refreshes them.
      deliveryBoyStatus: _Auth_js__WEBPACK_IMPORTED_MODULE_0__["default"].user && (_Auth_js__WEBPACK_IMPORTED_MODULE_0__["default"].user.delivery_boy || _Auth_js__WEBPACK_IMPORTED_MODULE_0__["default"].user.deliveryBoy) ? Number((_Auth_js__WEBPACK_IMPORTED_MODULE_0__["default"].user.delivery_boy || _Auth_js__WEBPACK_IMPORTED_MODULE_0__["default"].user.deliveryBoy).status) : null,
      deliveryBoyStatusLoading: false,
      remark: '',
      // // On Duty (auto-assign delivery boy, plan §1) - distinct from deliveryBoyStatus
      // // above, which is the account approval status, not live availability.
      // onDuty: !!(Auth.user && (Auth.user.delivery_boy || Auth.user.deliveryBoy)
      // && (Auth.user.delivery_boy || Auth.user.deliveryBoy).is_online),
      // onDutyLoading: false,
      // onDutyWatchId: null,
      // onDutyLastSentAt: 0,
      // offerPollInterval: null,
      // offerQueue: [],
      // offerPopupOpen: false,
      // offerSeenIds: [],
      // offerNow: Date.now(),
      // offerTickInterval: null,
      // offerRespondingId: null,

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
    // // Offers still inside their time limit. Shrinks by itself as offers run out, which is
    // // also what closes the popup at 0s.
    // liveOffers() {
    // return this.offerQueue.filter((o) => this.offerSecondsLeft(o) > 0);
    // },
    isMac: function isMac() {
      return /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent || '');
    },
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
      var stored = localStorage.getItem('active_module_id');
      if (stored) {
        var found = this.modules.find(function (m) {
          return m.id === Number(stored);
        });
        if (found) return found;
      }
      // No module picked yet in this browser - show whichever module is flagged
      // default on the server instead of assuming id 1 (Grocery).
      return this.modules.find(function (m) {
        return m.is_default;
      }) || this.modules[0] || null;
    },
    currentModuleName: function currentModuleName() {
      return this.currentModule ? this.currentModule.name : '';
    }
  },
  beforeDestroy: function beforeDestroy() {
    window.removeEventListener('resize', this.onResize);
    window.removeEventListener('DOMContentLoaded', this.onResize);
    this.$eventBus.$off('modulesUpdated');
    this.$eventBus.$off('languagesUpdated');
    // this.stopOnDutyLocationWatch();
    // this.stopOfferPolling();
  },
  mounted: function mounted() {
    var _this2 = this;
    // Fetch initial seller status if the user is a seller
    if (this.role === this.$roleSeller) this.getSellerStatus();

    // Fetch initial delivery boy status if the user is a delivery boy
    if (this.role === this.$roleDeliveryBoy) {
      this.getDeliveryBoyStatus();
    }
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
    if (this.role !== this.$roleSeller && this.role !== this.$roleDeliveryBoy) {
      this.getModules();
    }
    this.$eventBus.$on('modulesUpdated', function () {
      if (_this2.role !== _this2.$roleSeller && _this2.role !== _this2.$roleDeliveryBoy) {
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
      // The stored user may carry the driver under `delivery_boy` or `deliveryBoy`, or not yet at
      // all right after login; the API falls back to the logged-in driver when no id is sent, so
      // never let a missing id stop the status (Active / On Duty) from being restored.
      var driver = this.user && (this.user.delivery_boy || this.user.deliveryBoy) || null;
      axios__WEBPACK_IMPORTED_MODULE_1___default().post(this.$apiUrl + '/delivery_boy/get_delivery_boy_status', driver && driver.id ? {
        id: driver.id
      } : {}).then(function (response) {
        if (response.data && response.data.data) {
          _this4.deliveryBoyStatus = Number(response.data.data.status);
          // this.onDuty = !!response.data.data.is_online;
          // if (this.onDuty) {
          // this.startOnDutyLocationWatch();
          // this.startOfferPolling();
          // } else {
          // this.stopOnDutyLocationWatch();
          // this.stopOfferPolling();
          // }
        }
      })["catch"](function (error) {
        var _error$response2;
        console.error('Error fetching delivery boy status:', ((_error$response2 = error.response) === null || _error$response2 === void 0 ? void 0 : _error$response2.data) || error);
      });
    },
    // // On Duty toggle (auto-assign delivery boy, plan §1) - starts/stops the browser
    // // geolocation watch and the incoming-offer poll. Distinct from the account
    // // active/deactive status toggle above.
    // toggleOnDuty() {
    // if (this.onDutyLoading) return;
    // this.onDutyLoading = true;
    // // v-model already flipped this.onDuty to the desired new state by the time
    // // @change fires - mirrors toggleDeliveryBoyStatus's optimistic-update pattern.
    // const turningOn = this.onDuty;
    // const previousState = !turningOn;
    // const submit = (latitude, longitude) => {
    // const formData = new FormData();
    // formData.append('is_online', turningOn ? 1 : 0);
    // if (latitude && longitude) {
    // formData.append('latitude', latitude);
    // formData.append('longitude', longitude);
    // }
    // axios.post(this.$deliveryBoyApiUrl + '/toggle_duty', formData)
    // .then((response) => {
    // if (response.data.status === 1) {
    // if (turningOn) {
    // this.startOnDutyLocationWatch();
    // this.startOfferPolling();
    // } else {
    // this.stopOnDutyLocationWatch();
    // this.stopOfferPolling();
    // this.offerQueue = [];
    // }
    // } else {
    // this.onDuty = previousState;
    // this.showError(response.data.message);
    // }
    // })
    // .catch((error) => {
    // this.onDuty = previousState;
    // console.error('Error toggling on-duty status:', error.response?.data || error);
    // })
    // .finally(() => {
    // this.onDutyLoading = false;
    // });
    // };
    // if (turningOn && navigator.geolocation) {
    // navigator.geolocation.getCurrentPosition(
    // (position) => submit(position.coords.latitude, position.coords.longitude),
    // () => submit(null, null),
    // { enableHighAccuracy: true, timeout: 8000 }
    // );
    // } else {
    // submit(null, null);
    // }
    // },
    // startOnDutyLocationWatch() {
    // if (this.onDutyWatchId !== null || !navigator.geolocation) return;
    // this.onDutyWatchId = navigator.geolocation.watchPosition(
    // (position) => this.sendOnDutyLocationUpdate(position),
    // (error) => console.error('On-duty location error:', error.message),
    // { enableHighAccuracy: true, maximumAge: 10000 }
    // );
    // },
    // stopOnDutyLocationWatch() {
    // if (this.onDutyWatchId === null) return;
    // navigator.geolocation.clearWatch(this.onDutyWatchId);
    // this.onDutyWatchId = null;
    // },
    // sendOnDutyLocationUpdate(position) {
    // // watchPosition can fire far more often than needed - send at most every 20s.
    // const now = Date.now();
    // if (now - this.onDutyLastSentAt < 20000) return;
    // this.onDutyLastSentAt = now;
    // const formData = new FormData();
    // formData.append('latitude', position.coords.latitude);
    // formData.append('longitude', position.coords.longitude);
    // axios.post(this.$deliveryBoyApiUrl + '/update_location', formData)
    // .catch((error) => {
    // console.error('Failed to send on-duty location update:', error);
    // });
    // },
    // // Incoming-offer popup - polled, not websocket-driven (works identically on
    // // shared hosting or a VPS, no Pusher/Reverb dependency). It reads the whole offer queue
    // // (DeliveryBoyController::requestedOrders), so several offers can be answered one by one.
    // startOfferPolling() {
    // if (this.offerPollInterval !== null) return;
    // this.pollCurrentOffer();
    // this.offerPollInterval = setInterval(() => this.pollCurrentOffer(), 6000);
    // // One-second clock: counts every offer down and drops it from the popup at 0s.
    // this.offerTickInterval = setInterval(() => { this.offerNow = Date.now(); }, 1000);
    // },
    // stopOfferPolling() {
    // if (this.offerPollInterval !== null) {
    // clearInterval(this.offerPollInterval);
    // this.offerPollInterval = null;
    // }
    // if (this.offerTickInterval !== null) {
    // clearInterval(this.offerTickInterval);
    // this.offerTickInterval = null;
    // }
    // },
    // pollCurrentOffer() {
    // if (this.offerRespondingId !== null) return;
    // axios.get(this.$deliveryBoyApiUrl + '/requested_orders')
    // .then((response) => {
    // this.offerQueue = response.data && response.data.data ? response.data.data : [];
    // this.offerNow = Date.now();
    // // Open the popup when a new offer arrives. If the driver closed it, it stays
    // // closed until the next new offer; the header button reopens it any time.
    // const fresh = this.offerQueue.filter((o) =>
    // this.offerSecondsLeft(o) > 0 && !this.offerSeenIds.includes(o.attempt_id));
    // if (fresh.length) {
    // this.offerSeenIds = this.offerSeenIds.concat(fresh.map((o) => o.attempt_id)).slice(-100);
    // this.offerPopupOpen = true;
    // }
    // })
    // .catch((error) => {
    // console.error('Error polling offers:', error.response?.data || error);
    // });
    // },
    // offerSecondsLeft(offer) {
    // if (!offer.expires_at) return 0;
    // return Math.max(0, Math.round((new Date(offer.expires_at).getTime() - this.offerNow) / 1000));
    // },
    // respondToOffer(offer, action) {
    // if (this.offerRespondingId !== null) return;
    // this.offerRespondingId = offer.order_id;
    // const formData = new FormData();
    // formData.append('order_id', offer.order_id);
    // formData.append('action', action);
    // axios.post(this.$deliveryBoyApiUrl + '/requested_orders/respond', formData)
    // .then((response) => {
    // if (response.data.status === 1 && action === 'accept') {
    // this.$router.push({ path: '/delivery_boy/orders' }).catch(() => {});
    // }
    // })
    // .catch((error) => {
    // console.error('Error responding to offer:', error.response?.data || error);
    // })
    // .finally(() => {
    // this.offerRespondingId = null;
    // // Drop it now, then reload so the remaining offers stay accurate.
    // this.offerQueue = this.offerQueue.filter((o) => o.order_id !== offer.order_id);
    // this.pollCurrentOffer();
    // });
    // },
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
          _this6.showError(response.data.message);
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

          // First time in this browser - nothing picked yet, so lock in the
          // server's default module instead of silently sending header 1.
          if (!localStorage.getItem('active_module_id')) {
            var defaultModule = _this10.modules.find(function (m) {
              return m.is_default;
            }) || _this10.modules[0];
            if (defaultModule) {
              localStorage.setItem('active_module_id', defaultModule.id);
              window.axios.defaults.headers.common['X-Module-Id'] = defaultModule.id;
            }
          }
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
      // Remembered so pages without this header (login, error pages) can apply RTL on first paint.
      try {
        localStorage.setItem('is_rtl', isRtl ? '1' : '0');
      } catch (e) {}
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
        confirmButtonColor: 'var(--theme-primary-500)',
        cancelButtonColor: 'var(--theme-error-500)'
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
    setTheme: function setTheme(theme, event) {
      var _this15 = this;
      if (theme !== 'theme-dark' && theme !== 'theme-light') theme = this.getMediaPreference();
      var applyThemeClass = function applyThemeClass() {
        sessionStorage.setItem("user-theme", theme);
        _this15.userTheme = theme;
        // Only swap theme classes so RTL class is preserved (sidebar stays on correct side in RTL + dark mode).
        document.body.classList.remove('theme-light', 'theme-dark');
        document.body.classList.add(theme);
      };

      // Circular reveal expanding from the toggle button, via the View Transitions API.
      // Only for an actual user click (event present) - skip it on initial page
      // load/login where setTheme() just applies the stored/OS-preferred theme.
      // Falls back to the plain CSS color-fade (custom-egrocer.scss) otherwise.
      if (!event || !document.startViewTransition || window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        applyThemeClass();
        return;
      }
      var x = event ? event.clientX : window.innerWidth / 2;
      var y = event ? event.clientY : 0;
      var endRadius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
      var transition = document.startViewTransition(applyThemeClass);
      transition.ready.then(function () {
        document.documentElement.animate({
          clipPath: ["circle(0px at ".concat(x, "px ").concat(y, "px)"), "circle(".concat(endRadius, "px at ").concat(x, "px ").concat(y, "px)")]
        }, {
          duration: 650,
          easing: 'cubic-bezier(0.65, 0, 0.35, 1)',
          pseudoElement: '::view-transition-new(root)'
        });
        // Old theme gently recedes (fade + scale) instead of just sitting static
        // underneath the reveal, giving the swap some depth.
        document.documentElement.animate({
          opacity: [1, 0],
          transform: ['scale(1)', 'scale(1.03)']
        }, {
          duration: 650,
          easing: 'cubic-bezier(0.65, 0, 0.35, 1)',
          pseudoElement: '::view-transition-old(root)'
        });
      });
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
      // nothing saved yet (or an old "null" value): follow the OS preference
      if (user_theme !== 'theme-dark' && user_theme !== 'theme-light') {
        user_theme = this.getMediaPreference();
      }
      this.userTheme = user_theme;
      return user_theme;
    },
    toggleTheme: function toggleTheme(event) {
      var _this16 = this;
      var activeTheme = sessionStorage.getItem("user-theme");
      this.themeIconSpinning = true;
      setTimeout(function () {
        _this16.themeIconSpinning = false;
      }, 650);
      if (activeTheme === "theme-light" || activeTheme == "" || activeTheme == "undefined" || activeTheme == "null") {
        this.setTheme("theme-dark", event);
      } else {
        this.setTheme("theme-light", event);
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
      var _this17 = this;
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
              _this17.$router.push('/self_pickup_orders/view/' + orderId);
            } else {
              _this17.$router.push('/orders/view/' + orderId);
            }
          } else {
            _this17.$router.push('/orders/view/' + orderId);
          }
        })["catch"](function (error) {
          _this17.$router.push('/orders/view/' + orderId);
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
      // icon + tone (theme colour family) for the popup tile
      var icon = 'bi bi-truck';
      var tone = 'info';
      if (type === 'auto_assign_failed') {
        // Checked first: its text contains "assign", which would otherwise read as "Order Assigned".
        title = 'Manual Assignment Needed';
        icon = 'bi bi-exclamation-triangle';
        tone = 'warn';
      } else if (type === 'return_request_new' || type === 'return_request_sent' || type === 'return_request_status' || lowerText.includes('return')) {
        title = 'Return Request Received';
        icon = 'bi bi-arrow-counterclockwise';
        tone = 'warn';
      } else if (lowerText.includes('cancel')) {
        title = 'Order Cancelled';
        icon = 'bi bi-x-circle';
        tone = 'error';
      } else if (lowerText.includes('receive') || lowerText.includes('place') || lowerText.includes('new order')) {
        title = 'New Order Placed';
        icon = 'bi bi-bag-check';
        tone = 'primary';
      } else if (lowerText.includes('assign')) {
        title = 'Order Assigned';
        icon = 'bi bi-person-check';
        tone = 'info';
      } else if (lowerText.includes('picked') || lowerText.includes('pickup')) {
        title = 'Order Out for Pickup';
        icon = 'bi bi-box-seam';
        tone = 'info';
      } else if (lowerText.includes('deliver')) {
        title = 'Order Delivered';
        icon = 'bi bi-check2-circle';
        tone = 'success';
      } else {
        title = 'Order Status Update';
      }
      return {
        title: title,
        body: body,
        icon: icon,
        tone: tone
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
___CSS_LOADER_EXPORT___.push([module.id, "\n.fade-enter-active[data-v-0baa285e],\n.fade-leave-active[data-v-0baa285e] {\n    transition: opacity 0.3s;\n}\n.fade-enter[data-v-0baa285e],\n.fade-leave-to[data-v-0baa285e] {\n    opacity: 0;\n}\n\n/* Announcement banner, sidebar/#main offsets and sticky header: shared, see custom-egrocer.scss\n   (\"Announcement ticker & sticky header\"). */\n.logo-dark[data-v-0baa285e] {\n    display: none;\n}\nbody.theme-dark .logo-light[data-v-0baa285e] {\n    display: none;\n}\nbody.theme-dark .logo-dark[data-v-0baa285e] {\n    display: block;\n}\n\n", ""]);
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
___CSS_LOADER_EXPORT___.push([module.id, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n/* Active/On-Duty pills (delivery boy dropdown) - reuse the theme's own orange tokens\n   instead of Bootstrap's green/red so they don't clash with the orange toggle switch. */\n.status-pill[data-v-29466cd2] {\n    display: inline-flex;\n    align-items: center;\n    gap: 6px;\n    padding: 6px 14px;\n    border-radius: 999px;\n    font-size: 0.85rem;\n    font-weight: 600;\n}\n.status-pill-soft[data-v-29466cd2] {\n    background: var(--figma-primary-light, var(--theme-primary-50));\n    color: var(--figma-primary, var(--theme-primary-500));\n}\n.status-pill-muted[data-v-29466cd2] {\n    background: var(--theme-neutral-100);\n    color: var(--theme-neutral-400);\n}\n/* Dark mode: the light pill backgrounds above made the label unreadable - use a translucent tint\n   with a lighter text colour so Active / Deactive / On Duty stay visible. */\nbody.theme-dark .status-pill.status-pill-soft[data-v-29466cd2] {\n    background: color-mix(in srgb, var(--theme-primary-500) 18%, transparent);\n    color: var(--theme-warn-400);\n}\nbody.theme-dark .status-pill.status-pill-muted[data-v-29466cd2] {\n    background: color-mix(in srgb, var(--theme-neutral-400) 18%, transparent);\n    color: var(--theme-neutral-300);\n}\n\n/* .navbar {\n    background: transparent;\n    padding: 0.75rem 1rem;\n} */\n/* \n.figma-header {\n    background: #fff;\n    position: sticky;\n    top: 0;\n    z-index: 1020;\n    border-bottom: 1px solid var(--ui-border);\n} */\n.figma-header[data-v-29466cd2] {\n    background: #fff;\n    box-shadow: none !important;\n    /* remove these */\n    /* position: sticky; */\n    /* top: 0; */\n    /* z-index: 1020; */\n}\n.navbar[data-v-29466cd2] {\n    background: transparent;\n    min-height: 70px;\n}\n.container-fluid[data-v-29466cd2] {\n    padding-left: 20px;\n    padding-right: 20px;\n}\n.website-link[data-v-29466cd2] {\n    background: var(--theme-neutral-100);\n    border-radius: 6px;\n    font-size: 0.8rem;\n    color: var(--theme-neutral-600);\n    text-decoration: none;\n    transition: all 0.2s ease;\n}\n.website-link[data-v-29466cd2]:hover {\n    background: var(--theme-neutral-200);\n    color: var(--theme-success-500);\n}\n\n/* Header Icon Buttons & Sidebar Toggle */\n.header-icon-btn[data-v-29466cd2] {\n    width: 40px;\n    height: 40px;\n    border: 1px solid var(--ui-border);\n    border-radius: var(--ui-radius);\n    background: var(--ui-surface);\n    color: var(--ui-text);\n    display: inline-flex;\n    align-items: center;\n    justify-content: center;\n    text-decoration: none;\n    cursor: pointer;\n    padding: 0;\n    flex-shrink: 0;\n    transition: background-color 0.15s ease, border-color 0.15s ease, color 0.15s ease;\n    box-shadow: none;\n&:hover {\n        background: var(--ui-surface-muted);\n        border-color: var(--ui-border-strong);\n        color: var(--theme-primary-500);\n}\n&:focus-visible {\n        outline: none;\n        box-shadow: 0 0 0 2px color-mix(in srgb, var(--theme-primary-500) 25%, transparent);\n}\n}\n.burger-btn[data-v-29466cd2] {\n    width: 40px;\n    height: 40px;\n    border: 1px solid var(--ui-border);\n    border-radius: var(--ui-radius);\n    background: var(--ui-surface);\n    color: var(--ui-text);\n    display: inline-flex;\n    align-items: center;\n    justify-content: center;\n    text-decoration: none;\n    cursor: pointer;\n    padding: 0;\n    flex-shrink: 0;\n    transition: background-color 0.15s ease, border-color 0.15s ease, color 0.15s ease;\n    box-shadow: none;\n&:hover {\n        background: var(--ui-surface-muted);\n        border-color: var(--ui-border-strong);\n        color: var(--theme-primary-500);\n}\n}\n\n/* Clear Cache Button */\n.header-cache-btn[data-v-29466cd2] {\n    height: 40px;\n    padding: 0 14px;\n    border: 1px solid var(--ui-border) !important;\n    border-radius: var(--ui-radius) !important;\n    background: var(--ui-surface) !important;\n    color: var(--ui-text) !important;\n    font-size: 13px !important;\n    font-weight: 600 !important;\n    font-family: var(--ui-font) !important;\n    display: inline-flex;\n    align-items: center;\n    justify-content: center;\n    gap: 6px;\n    white-space: nowrap;\n    flex-shrink: 0;\n    cursor: pointer;\n    box-shadow: none !important;\n    transition: background-color 0.15s ease, border-color 0.15s ease, color 0.15s ease;\n&:hover {\n        background: var(--ui-surface-muted) !important;\n        border-color: var(--ui-border-strong) !important;\n        color: var(--theme-primary-500) !important;\n}\n}\n\n/* Module & Language Selector */\n.module-selector[data-v-29466cd2],\n.lang-selector[data-v-29466cd2] {\n    height: 40px;\n    padding: 0 12px;\n    border: 1px solid var(--ui-border) !important;\n    border-radius: var(--ui-radius) !important;\n    background: var(--ui-surface) !important;\n    color: var(--ui-text) !important;\n    display: inline-flex;\n    align-items: center;\n    justify-content: space-between;\n    gap: 8px;\n    white-space: nowrap;\n    cursor: pointer;\n    -webkit-user-select: none;\n       -moz-user-select: none;\n            user-select: none;\n    transition: background-color 0.15s ease, border-color 0.15s ease;\n&:hover {\n        background: var(--ui-surface-muted) !important;\n        border-color: var(--ui-border-strong) !important;\n}\n.module-icon {\n        width: 20px;\n        height: 20px;\n        -o-object-fit: contain;\n           object-fit: contain;\n}\n.lang-flag {\n        width: 20px;\n        height: 20px;\n        -o-object-fit: cover;\n           object-fit: cover;\n}\n.module-name,\n    .lang-name {\n        font-size: 13px;\n        font-weight: 600;\n        color: var(--ui-heading);\n}\n.module-chevron,\n    .lang-chevron {\n        font-size: 11px;\n        color: var(--ui-text-subtle);\n}\n}\n\n/* Notification badge */\n.header-badge-count[data-v-29466cd2] {\n    position: absolute;\n    top: -4px;\n    right: -4px;\n    min-width: 18px;\n    height: 18px;\n    padding: 0 4px;\n    border-radius: 999px;\n    background: var(--theme-error-500);\n    color: #ffffff;\n    font-size: 10px;\n    font-weight: 700;\n    line-height: 1;\n    display: inline-flex;\n    align-items: center;\n    justify-content: center;\n    border: 2px solid var(--ui-surface);\n}\n\n/* Divider */\n.header-divider[data-v-29466cd2] {\n    width: 1px;\n    height: 24px;\n    background: var(--ui-border);\n    margin: 0 4px;\n    flex-shrink: 0;\n}\n\n/* User dropdown toggle */\n/* user chip: styled with the other header controls in custom-egrocer.scss (\"Header controls\") */\n\n/* Custom Language Dropdown Menu */\n.lang-dropdown-menu[data-v-29466cd2] {\n    min-width: 110px !important;\n    padding: 6px !important;\n    border-radius: 12px !important;\n    border: 1px solid var(--ui-border) !important;\n    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.02) !important;\n}\n.lang-dropdown-menu .dropdown-item[data-v-29466cd2] {\n    border-radius: 8px !important;\n    padding: 6px 12px !important;\n    color: var(--ui-text) !important;\n    font-size: 0.85rem !important;\n    transition: all 0.2s ease !important;\n}\n.lang-dropdown-menu .dropdown-item[data-v-29466cd2]:hover,\n.lang-dropdown-menu .dropdown-item.active[data-v-29466cd2] {\n    background-color: var(--ui-primary-soft) !important;\n    color: var(--theme-primary-600) !important;\n}\nbody.theme-dark .lang-dropdown-menu[data-v-29466cd2] {\n    background-color: var(--ui-surface) !important;\n    border-color: var(--ui-border) !important;\n}\nbody.theme-dark .lang-dropdown-menu .dropdown-item[data-v-29466cd2] {\n    color: var(--ui-text) !important;\n}\nbody.theme-dark .lang-dropdown-menu .dropdown-item[data-v-29466cd2]:hover,\nbody.theme-dark .lang-dropdown-menu .dropdown-item.active[data-v-29466cd2] {\n    background-color: var(--ui-primary-soft) !important;\n    color: var(--theme-primary-400) !important;\n}\n\n/* User Menu */\n.user-dropdown-link[data-v-29466cd2] {\n    text-decoration: none;\n    padding: 2px;\n    border-radius: 12px;\n    transition: background 0.2s ease;\n}\n.user-dropdown-link[data-v-29466cd2]:hover {\n    background: var(--theme-neutral-100);\n}\n.avatar-md img[data-v-29466cd2] {\n    width: 38px;\n    height: 38px;\n    -o-object-fit: cover;\n       object-fit: cover;\n    border: 2px solid #fff;\n    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\n}\n\n/* Dropdown styling */\n.dropdown-menu[data-v-29466cd2] {\n    border-radius: 12px;\n    padding: 0.5rem;\n    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05) !important;\n}\n.dropdown-item[data-v-29466cd2] {\n    border-radius: 8px;\n    padding: 0.6rem 1rem;\n    font-weight: 500;\n    color: var(--theme-neutral-600);\n}\n.dropdown-item[data-v-29466cd2]:hover {\n    background-color: var(--theme-neutral-100);\n    color: var(--theme-success-500);\n}\n.dropdown-header[data-v-29466cd2] {\n    font-weight: 600;\n    color: var(--theme-neutral-800);\n    padding: 0.5rem 1rem;\n}\n\n/* Utility */\n.font-bold[data-v-29466cd2] {\n    font-weight: 700;\n}\n.font-medium[data-v-29466cd2] {\n    font-weight: 500;\n}\n.text-gray-400[data-v-29466cd2] {\n    color: var(--theme-neutral-400);\n}\n.text-gray-600[data-v-29466cd2] {\n    color: var(--theme-neutral-600);\n}\n.text-gray-800[data-v-29466cd2] {\n    color: var(--theme-neutral-800);\n}\n.text-xs[data-v-29466cd2] {\n    font-size: 0.75rem;\n}\n\n/* Responsive adjustments */\n@media (max-width: 991px) {\n.navbar-collapse[data-v-29466cd2] {\n        background: #fff;\n        border-radius: 12px;\n        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);\n        padding: 1rem;\n        margin-top: 1rem;\n}\n}\n\n/* Phones: one row that always fits, down to 320px.\n   Kept visible: burger, module chip, notification bell, avatar. The module chip is the only\n   flexible item - it takes whatever room is left and truncates its name with an ellipsis.\n   Clear Cache, language, theme and website link leave the row (the last three move into the\n   avatar menu), so nothing can overflow or wrap and no inner scrolling is needed. */\n@media (max-width: 575.98px) {\n.figma-header .container-fluid[data-v-29466cd2] {\n        padding-left: 0.75rem !important;\n        padding-right: 0.75rem !important;\n        gap: 0.4rem;\n}\n.figma-header .container-fluid>.d-flex[data-v-29466cd2]:first-child {\n        flex-shrink: 0;\n}\n.figma-header .header-right[data-v-29466cd2] {\n        flex: 1 1 auto;\n        min-width: 0;\n        justify-content: flex-end;\n        gap: 0.25rem !important;\n}\n.header-cache-btn[data-v-29466cd2] {\n        display: none !important;\n}\n.header-module[data-v-29466cd2] {\n        flex: 0 1 auto;\n        min-width: 0;\n        margin-right: 0 !important;\n}\n.module-selector[data-v-29466cd2] {\n        width: auto !important;\n        min-width: 0 !important;\n        padding-left: 8px !important;\n        padding-right: 8px !important;\n}\n.module-selector>.d-flex[data-v-29466cd2] {\n        min-width: 0;\n}\n.module-selector .module-name[data-v-29466cd2] {\n        display: block;\n        flex: 1 1 auto;\n        min-width: 0;\n        max-width: 96px;\n        overflow: hidden;\n        text-overflow: ellipsis;\n        white-space: nowrap;\n        font-size: 0.8rem !important;\n}\n\n    /* Avatar chevron adds width for no benefit on phones. */\n.header-right .dropdown>a>.bi-chevron-down[data-v-29466cd2] {\n        display: none;\n}\n\n    /* Notifications: a fixed 400px popover is wider than the phone and anchors off-screen.\n       Anchor it to the header itself (full width, small gutter) so it always opens right under\n       the header - whatever sits above it (announcement banner etc.) and wherever the bell is. */\n    /* sticky (not relative): it still anchors the popover, and relative + the sticky \"top\" offset\n       pushed the header down by the banner height and over the page content */\n.figma-header[data-v-29466cd2] {\n        position: sticky;\n}\n.header-right .nav-item.dropdown[data-v-29466cd2] {\n        position: static;\n}\n.header-right .notification-dropdown[data-v-29466cd2] {\n        position: absolute !important;\n        top: 100% !important;\n        left: 0.75rem !important;\n        right: 0.75rem !important;\n        width: auto !important;\n        max-width: none !important;\n        transform: none !important;\n        margin-top: 0 !important;\n}\n.header-right .user-dropdown-menu[data-v-29466cd2] {\n        max-height: 70vh;\n        overflow-y: auto;\n}\n}\n.text-wrap-custom[data-v-29466cd2] {\n    word-break: break-word !important;\n    overflow-wrap: break-word !important;\n    white-space: normal !important;\n}\n", ""]);
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
___CSS_LOADER_EXPORT___.push([module.id, "\nbody.theme-dark .notification-dropdown,\nbody.theme-dark .dropdown-header {\n    background-color: var(--theme-neutral-900) !important;\n    border-color: var(--theme-neutral-800) !important;\n}\n\n/* Module Selector Styling */\n.module-selector {\n    background: var(--theme-neutral-100);\n    border: 1px solid var(--ui-border);\n    border-radius: 8px;\n    height: 40px;\n    min-width: 145px !important;\n    transition: all 0.2s ease;\n}\n.module-selector:hover {\n    background: var(--theme-neutral-200);\n}\nbody.theme-dark .module-selector {\n    background: var(--theme-neutral-800);\n    border-color: var(--theme-neutral-700);\n}\nbody.theme-dark .module-selector:hover {\n    background: var(--theme-neutral-800);\n}\n\n/* Header dropdown rows (avatar menu + language menu): hover and active use the theme's primary\n   colour instead of the template's green / Bootstrap blue. */\nhtml body .header-right .user-dropdown-menu .dropdown-item:hover,\nhtml body .header-right .user-dropdown-menu .dropdown-item:focus,\nhtml body .header-right .user-dropdown-menu .dropdown-item.active,\nhtml body .header-right .lang-dropdown-menu .dropdown-item:hover,\nhtml body .header-right .lang-dropdown-menu .dropdown-item.active {\n    background-color: var(--figma-primary-light, var(--theme-primary-50)) !important;\n    color: var(--figma-primary, var(--theme-primary-500)) !important;\n}\nhtml body.theme-dark .header-right .user-dropdown-menu .dropdown-item:hover,\nhtml body.theme-dark .header-right .user-dropdown-menu .dropdown-item:focus,\nhtml body.theme-dark .header-right .user-dropdown-menu .dropdown-item.active,\nhtml body.theme-dark .header-right .lang-dropdown-menu .dropdown-item:hover,\nhtml body.theme-dark .header-right .lang-dropdown-menu .dropdown-item.active {\n    background-color: color-mix(in srgb, var(--figma-primary, var(--theme-primary-500)) 18%, var(--theme-neutral-900)) !important;\n    color: var(--figma-primary, var(--theme-primary-500)) !important;\n}\n\n\n/* ==========================================================================\n   Notifications popup (ntf-*)\n   ========================================================================== */\n.notification-dropdown.ntf-popup {\n    width: 380px;\n    max-width: calc(100vw - 24px);\n    padding: 0 !important;\n    overflow: hidden;\n    border: 1px solid var(--ui-border) !important;\n    border-radius: 14px !important;\n    background: var(--ui-surface) !important;\n    box-shadow: var(--ui-shadow-lg) !important;\n}\n.ntf-head {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    gap: 12px;\n    padding: 14px 16px 12px;\n    border-bottom: 1px solid var(--ui-border);\n}\n.ntf-head-title {\n    font-size: 15px;\n    font-weight: 700;\n    color: var(--ui-text);\n}\n.ntf-new-pill {\n    padding: 2px 8px;\n    border-radius: 999px;\n    background: var(--ui-primary-soft);\n    color: var(--theme-primary-700);\n    font-size: 11px;\n    font-weight: 700;\n    white-space: nowrap;\n}\n.ntf-read-all {\n    display: inline-flex;\n    align-items: center;\n    gap: 4px;\n    padding: 4px 8px;\n    border: 0;\n    border-radius: 8px;\n    background: transparent;\n    color: var(--theme-primary-600);\n    font-size: 12px;\n    font-weight: 600;\n    white-space: nowrap;\n    cursor: pointer;\n}\n.ntf-read-all:hover {\n    background: var(--ui-primary-soft);\n}\n.ntf-read-all i {\n    font-size: 15px;\n}\n.ntf-list {\n    max-height: min(420px, calc(100vh - 220px));\n    overflow-y: auto;\n    padding: 6px;\n}\n.ntf-item {\n    position: relative;\n    display: flex;\n    align-items: flex-start;\n    gap: 12px;\n    padding: 10px;\n    padding-inline-end: 24px;\n    border-radius: 10px;\n    list-style: none;\n    cursor: pointer;\n    transition: background-color 0.15s ease;\n}\n.ntf-item + .ntf-item {\n    margin-top: 2px;\n}\n.ntf-item:hover {\n    background: var(--ui-surface-muted);\n}\n.ntf-item.is-unread {\n    background: color-mix(in srgb, var(--theme-primary-500) 6%, transparent);\n}\n.ntf-item.is-unread:hover {\n    background: color-mix(in srgb, var(--theme-primary-500) 11%, transparent);\n}\n\n/* icon tile: tinted from its tone colour, so it follows the theme in light and dark mode */\n.ntf-icon {\n    flex: none;\n    display: inline-flex;\n    align-items: center;\n    justify-content: center;\n    width: 36px;\n    height: 36px;\n    border-radius: 10px;\n    font-size: 17px;\n    background: color-mix(in srgb, currentColor 14%, transparent);\n}\n.ntf-tone-primary { color: var(--theme-primary-600);\n}\n.ntf-tone-info { color: var(--theme-info-600);\n}\n.ntf-tone-success { color: var(--theme-success-600);\n}\n.ntf-tone-warn { color: var(--theme-warn-600);\n}\n.ntf-tone-error { color: var(--theme-error-600);\n}\n.ntf-content {\n    flex: 1;\n    min-width: 0;\n}\n.ntf-title {\n    font-size: 13.5px;\n    font-weight: 700;\n    line-height: 1.3;\n    color: var(--ui-text);\n}\n.ntf-body {\n    margin: 2px 0 4px;\n    font-size: 12.5px;\n    line-height: 1.4;\n    color: var(--ui-text-muted);\n    display: -webkit-box;\n    -webkit-line-clamp: 2;\n    -webkit-box-orient: vertical;\n    overflow: hidden;\n    overflow-wrap: anywhere;\n}\n.ntf-time {\n    display: inline-flex;\n    align-items: center;\n    gap: 4px;\n    font-size: 11.5px;\n    color: var(--ui-text-muted);\n}\n.ntf-time i {\n    font-size: 11px;\n}\n.ntf-dot {\n    position: absolute;\n    top: 16px;\n    inset-inline-end: 10px;\n    width: 8px;\n    height: 8px;\n    border-radius: 50%;\n    background: var(--theme-primary-500);\n}\n.ntf-empty {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    gap: 8px;\n    padding: 28px 16px;\n    list-style: none;\n    font-size: 13px;\n    color: var(--ui-text-muted);\n}\n.ntf-empty-icon {\n    display: inline-flex;\n    align-items: center;\n    justify-content: center;\n    width: 44px;\n    height: 44px;\n    border-radius: 12px;\n    background: var(--ui-surface-muted);\n    font-size: 20px;\n}\n.ntf-foot {\n    border-top: 1px solid var(--ui-border);\n}\n.ntf-see-all {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    gap: 6px;\n    height: 44px;\n    color: var(--theme-primary-600) !important;\n    font-size: 13px;\n    font-weight: 600;\n    text-decoration: none;\n    transition: background-color 0.15s ease;\n}\n.ntf-see-all:hover {\n    background: var(--ui-primary-soft);\n}\n.ntf-see-all .ntf-arrow {\n    transition: transform 0.15s ease;\n}\n.ntf-see-all:hover .ntf-arrow {\n    transform: translateX(3px);\n}\n.rtl .ntf-see-all .ntf-arrow {\n    transform: scaleX(-1);\n}\n.rtl .ntf-see-all:hover .ntf-arrow {\n    transform: scaleX(-1) translateX(3px);\n}\n\n/* dark mode: brighter tone shades, and keep the popup on the theme surface */\nbody.theme-dark .notification-dropdown.ntf-popup {\n    background: var(--ui-surface) !important;\n    border-color: var(--ui-border-strong) !important;\n}\n\n/* the global dark-mode text reset forces span/i colours with !important, so the tone colours must too */\nbody.theme-dark .ntf-popup .ntf-tone-primary,\nbody.theme-dark .ntf-popup .ntf-tone-primary i { color: var(--theme-primary-400) !important;\n}\nbody.theme-dark .ntf-popup .ntf-tone-info,\nbody.theme-dark .ntf-popup .ntf-tone-info i { color: var(--theme-info-400) !important;\n}\nbody.theme-dark .ntf-popup .ntf-tone-success,\nbody.theme-dark .ntf-popup .ntf-tone-success i { color: var(--theme-success-400) !important;\n}\nbody.theme-dark .ntf-popup .ntf-tone-warn,\nbody.theme-dark .ntf-popup .ntf-tone-warn i { color: var(--theme-warn-400) !important;\n}\nbody.theme-dark .ntf-popup .ntf-tone-error,\nbody.theme-dark .ntf-popup .ntf-tone-error i { color: var(--theme-error-400) !important;\n}\n\n/* same size and spacing as light mode (dark mode resets button font size and paragraph margins elsewhere) */\nbody .ntf-popup .ntf-read-all,\nbody .ntf-popup .ntf-read-all span {\n    font-size: 12px !important;\n    font-weight: 600 !important;\n}\nbody .ntf-popup .ntf-body {\n    margin: 2px 0 4px !important;\n}\nbody .ntf-popup .ntf-time,\nbody .ntf-popup .ntf-time i {\n    font-size: 11.5px !important;\n}\nbody.theme-dark :is(.ntf-title, .ntf-head-title) {\n    color: var(--ui-text) !important;\n}\nbody.theme-dark :is(.ntf-body, .ntf-time) {\n    color: var(--ui-text-muted) !important;\n}\nbody.theme-dark .ntf-new-pill {\n    color: var(--theme-primary-300) !important;\n}\nbody.theme-dark :is(.ntf-read-all, .ntf-read-all span, .ntf-see-all, .ntf-see-all span) {\n    color: var(--theme-primary-400) !important;\n}\n", ""]);
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
      _c(
        "div",
        { staticClass: "global-announcement-banner", attrs: { role: "note" } },
        [
          _c("i", { staticClass: "fa fa-exclamation-circle" }),
          _vm._v(" "),
          _c("div", { staticClass: "announcement-ticker" }, [
            _c("div", { staticClass: "announcement-track" }, [
              _c("span", [_vm._v(_vm._s(_vm.announcementText))]),
              _vm._v(" "),
              _c("span", { attrs: { "aria-hidden": "true" } }, [
                _vm._v(_vm._s(_vm.announcementText)),
              ]),
            ]),
          ]),
        ]
      ),
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
                                                {
                                                  attrs: { to: sub.url },
                                                  nativeOn: {
                                                    click: function ($event) {
                                                      return _vm.closeSideBarMenu()
                                                    },
                                                  },
                                                },
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
                                      nativeOn: {
                                        click: function ($event) {
                                          return _vm.closeSideBarMenu()
                                        },
                                      },
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
                "container-fluid px-4 py-2 d-flex justify-content-between flex-nowrap",
            },
            [
              _c("div", { staticClass: "d-flex align-items-center gap-2" }, [
                _c(
                  "a",
                  {
                    staticClass:
                      "burger-btn header-icon-btn d-flex align-items-center justify-content-center text-decoration-none",
                    attrs: {
                      href: "javascript:void(0)",
                      role: "button",
                      "aria-label": "Toggle sidebar",
                    },
                  },
                  [
                    _c(
                      "svg",
                      {
                        attrs: {
                          width: "20",
                          height: "20",
                          viewBox: "0 0 20 20",
                          fill: "none",
                          xmlns: "http://www.w3.org/2000/svg",
                        },
                      },
                      [
                        _c("path", {
                          attrs: {
                            d: "M3.5 5.5H16.5M3.5 10H16.5M3.5 14.5H16.5",
                            stroke: "currentColor",
                            "stroke-width": "1.8",
                            "stroke-linecap": "round",
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
                      "header-cache-btn d-flex align-items-center justify-content-center",
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
                      : [
                          _c("i", {
                            staticClass: "bi bi-arrow-repeat fs-6 me-1",
                          }),
                          _vm._v(" "),
                          _c("span", [_vm._v(_vm._s(_vm.__("Clear Cache")))]),
                        ],
                  ],
                  2
                ),
                _vm._v(" "),
                _c(
                  "button",
                  {
                    staticClass:
                      "header-cache-btn header-search-btn d-flex align-items-center",
                    attrs: { type: "button", "aria-label": _vm.__("search") },
                    on: {
                      click: function ($event) {
                        return _vm.$root.$emit("open-command-palette")
                      },
                    },
                  },
                  [
                    _c("i", { staticClass: "bi bi-search" }),
                    _vm._v(" "),
                    _c("span", [_vm._v(_vm._s(_vm.__("search")))]),
                    _vm._v(" "),
                    _c("kbd", { staticClass: "header-search-kbd" }, [
                      _vm._v(_vm._s(_vm.isMac ? "⌘K" : "Ctrl K")),
                    ]),
                  ]
                ),
              ]),
              _vm._v(" "),
              _c(
                "div",
                { staticClass: "d-flex align-items-center gap-2 header-right" },
                [
                  _vm.role !== this.$roleSeller &&
                  _vm.role !== this.$roleDeliveryBoy
                    ? _c("div", { staticClass: "dropdown header-module" }, [
                        _c(
                          "div",
                          {
                            staticClass:
                              "module-selector d-flex align-items-center justify-content-between",
                            attrs: {
                              "data-bs-toggle": "dropdown",
                              "aria-expanded": "false",
                              role: "button",
                            },
                          },
                          [
                            _c(
                              "div",
                              {
                                staticClass:
                                  "d-flex align-items-center text-truncate",
                              },
                              [
                                _c("module-icon", {
                                  staticClass: "module-icon me-2",
                                  attrs: {
                                    src:
                                      (_vm.currentModule &&
                                        _vm.currentModule.image_url) ||
                                      _vm.$baseUrl +
                                        "/images/icons/module_default.svg",
                                    size: 22,
                                    alt: _vm.currentModuleName,
                                  },
                                }),
                                _vm._v(" "),
                                _c(
                                  "span",
                                  { staticClass: "module-name text-truncate" },
                                  [_vm._v(_vm._s(_vm.currentModuleName))]
                                ),
                              ],
                              1
                            ),
                            _vm._v(" "),
                            _c("i", {
                              staticClass:
                                "bi bi-chevron-down module-chevron ms-2",
                            }),
                          ]
                        ),
                        _vm._v(" "),
                        _c(
                          "ul",
                          {
                            staticClass:
                              "dropdown-menu dropdown-menu-end lang-dropdown-menu shadow border mt-2",
                          },
                          _vm._l(_vm.modules, function (mod) {
                            return _c("li", { key: mod.id }, [
                              _c(
                                "a",
                                {
                                  staticClass:
                                    "dropdown-item d-flex align-items-center gap-2 py-2",
                                  class: {
                                    active:
                                      _vm.currentModule &&
                                      _vm.currentModule.id === mod.id,
                                  },
                                  attrs: { href: "javascript:void(0)" },
                                  on: {
                                    click: function ($event) {
                                      return _vm.selectModule(mod.id)
                                    },
                                  },
                                },
                                [
                                  _c("module-icon", {
                                    staticClass: "me-1",
                                    attrs: {
                                      src:
                                        mod.image_url ||
                                        _vm.$baseUrl +
                                          "/images/icons/module_default.svg",
                                      size: 20,
                                      alt: mod.name,
                                    },
                                  }),
                                  _vm._v(" "),
                                  _c("span", { staticClass: "fw-semibold" }, [
                                    _vm._v(_vm._s(mod.name)),
                                  ]),
                                ],
                                1
                              ),
                            ])
                          }),
                          0
                        ),
                      ])
                    : _vm._e(),
                  _vm._v(" "),
                  _c(
                    "button",
                    {
                      staticClass:
                        "header-icon-btn d-none d-sm-inline-flex theme-toggle-btn",
                      class: [
                        _vm.themeIconSpinning ? "theme-toggle-btn--spin" : "",
                      ],
                      attrs: { title: "Toggle theme", type: "button" },
                      on: { click: _vm.toggleTheme },
                    },
                    [
                      _vm.userTheme === "theme-dark"
                        ? _c("i", { staticClass: "bi bi-sun fs-5" })
                        : _c("i", { staticClass: "bi bi-moon fs-5" }),
                    ]
                  ),
                  _vm._v(" "),
                  _c(
                    "div",
                    { staticClass: "d-none d-sm-flex align-items-center" },
                    [
                      _c(
                        "a",
                        {
                          staticClass: "header-icon-btn",
                          attrs: {
                            href: _vm.websiteUrl,
                            target: "_blank",
                            title: "Visit Website",
                          },
                        },
                        [_c("i", { staticClass: "bi bi-globe fs-5" })]
                      ),
                    ]
                  ),
                  _vm._v(" "),
                  _c(
                    "div",
                    {
                      staticClass:
                        "dropdown header-notification d-flex align-items-center",
                    },
                    [
                      _c(
                        "a",
                        {
                          staticClass: "header-icon-btn position-relative",
                          attrs: {
                            href: "#",
                            "data-bs-toggle": "dropdown",
                            "aria-expanded": "false",
                            title: "Notifications",
                          },
                        },
                        [
                          _c("i", { staticClass: "bi bi-bell fs-5" }),
                          _vm._v(" "),
                          _vm.notifications_unread_count > 0
                            ? _c(
                                "span",
                                { staticClass: "header-badge-count" },
                                [
                                  _vm._v(
                                    "\n                                " +
                                      _vm._s(
                                        _vm.notifications_unread_count > 9
                                          ? "9+"
                                          : _vm.notifications_unread_count
                                      ) +
                                      "\n                            "
                                  ),
                                ]
                              )
                            : _vm._e(),
                        ]
                      ),
                      _vm._v(" "),
                      _c(
                        "ul",
                        {
                          staticClass:
                            "dropdown-menu dropdown-menu-end notification-dropdown ntf-popup mt-2 p-0",
                          attrs: { "aria-labelledby": "dropdownMenuButton" },
                        },
                        [
                          _c("div", { staticClass: "ntf-head" }, [
                            _c(
                              "div",
                              {
                                staticClass:
                                  "d-flex align-items-center gap-2 min-w-0",
                              },
                              [
                                _c("span", { staticClass: "ntf-head-title" }, [
                                  _vm._v(_vm._s(_vm.__("notifications"))),
                                ]),
                                _vm._v(" "),
                                _vm.notifications_unread_count > 0
                                  ? _c(
                                      "span",
                                      { staticClass: "ntf-new-pill" },
                                      [
                                        _vm._v(
                                          "\n                                        " +
                                            _vm._s(
                                              _vm.notifications_unread_count >
                                                99
                                                ? "99+"
                                                : _vm.notifications_unread_count
                                            ) +
                                            " " +
                                            _vm._s(
                                              _vm.__("new") === "new"
                                                ? "new"
                                                : _vm.__("new")
                                            ) +
                                            "\n                                    "
                                        ),
                                      ]
                                    )
                                  : _vm._e(),
                              ]
                            ),
                            _vm._v(" "),
                            _vm.notifications_unread_count > 0
                              ? _c(
                                  "button",
                                  {
                                    staticClass: "ntf-read-all",
                                    attrs: { type: "button" },
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
                                      staticClass: "bi bi-check2-all",
                                    }),
                                    _vm._v(" "),
                                    _c("span", [
                                      _vm._v(
                                        _vm._s(_vm.__("read_all_notifications"))
                                      ),
                                    ]),
                                  ]
                                )
                              : _vm._e(),
                          ]),
                          _vm._v(" "),
                          _c(
                            "div",
                            { staticClass: "ntf-list" },
                            [
                              _vm._l(
                                _vm.notifications.slice(0, 4),
                                function (notification) {
                                  return _c(
                                    "li",
                                    {
                                      key: notification.id,
                                      staticClass: "ntf-item",
                                      class: {
                                        "is-unread":
                                          notification.read_at == null,
                                      },
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
                                        "span",
                                        {
                                          staticClass: "ntf-icon",
                                          class:
                                            "ntf-tone-" +
                                            _vm.parseNotification(notification)
                                              .tone,
                                        },
                                        [
                                          _c("i", {
                                            class:
                                              _vm.parseNotification(
                                                notification
                                              ).icon,
                                          }),
                                        ]
                                      ),
                                      _vm._v(" "),
                                      _c(
                                        "div",
                                        { staticClass: "ntf-content" },
                                        [
                                          _c(
                                            "div",
                                            { staticClass: "ntf-title" },
                                            [
                                              _vm._v(
                                                _vm._s(
                                                  _vm.parseNotification(
                                                    notification
                                                  ).title
                                                )
                                              ),
                                            ]
                                          ),
                                          _vm._v(" "),
                                          _c("p", { staticClass: "ntf-body" }, [
                                            _vm._v(
                                              _vm._s(
                                                _vm.parseNotification(
                                                  notification
                                                ).body
                                              )
                                            ),
                                          ]),
                                          _vm._v(" "),
                                          _c(
                                            "div",
                                            { staticClass: "ntf-time" },
                                            [
                                              _c("i", {
                                                staticClass: "bi bi-clock",
                                              }),
                                              _vm._v(
                                                _vm._s(
                                                  _vm.changeDateTime(
                                                    notification.created_at
                                                  )
                                                )
                                              ),
                                            ]
                                          ),
                                        ]
                                      ),
                                      _vm._v(" "),
                                      notification.read_at == null
                                        ? _c("span", {
                                            staticClass: "ntf-dot",
                                            attrs: { "aria-hidden": "true" },
                                          })
                                        : _vm._e(),
                                    ]
                                  )
                                }
                              ),
                              _vm._v(" "),
                              _vm.notifications.length == 0
                                ? _c("li", { staticClass: "ntf-empty" }, [
                                    _vm._m(0),
                                    _vm._v(" "),
                                    _c("span", [
                                      _vm._v(
                                        _vm._s(_vm.__("no_new_notification"))
                                      ),
                                    ]),
                                  ])
                                : _vm._e(),
                            ],
                            2
                          ),
                          _vm._v(" "),
                          _c("div", { staticClass: "ntf-foot" }, [
                            _c(
                              "a",
                              {
                                staticClass: "ntf-see-all",
                                attrs: { href: "javascript:void(0)" },
                                on: {
                                  click: function ($event) {
                                    _vm.$router.push(
                                      _vm.isSellerRoute
                                        ? "/seller/notification_panel"
                                        : _vm.isDeliveryBoyRoute
                                        ? "/delivery_boy/notification_panel"
                                        : "/notification_panel"
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
                                        ? "See all notifications"
                                        : _vm.__("see_all_notifications")
                                    )
                                  ),
                                ]),
                                _vm._v(" "),
                                _c("i", {
                                  staticClass: "bi bi-arrow-right ntf-arrow",
                                }),
                              ]
                            ),
                          ]),
                        ]
                      ),
                    ]
                  ),
                  _vm._v(" "),
                  _c(
                    "div",
                    { staticClass: "dropdown d-none d-sm-block header-lang" },
                    [
                      _c(
                        "a",
                        {
                          staticClass: "header-icon-btn",
                          attrs: {
                            href: "#",
                            "data-bs-toggle": "dropdown",
                            "aria-expanded": "false",
                            title: _vm.currentLanguageName,
                            "aria-label": _vm.currentLanguageName,
                          },
                        },
                        [
                          _c(
                            "svg",
                            {
                              staticClass: "header-lang-icon",
                              attrs: {
                                width: "20",
                                height: "20",
                                viewBox: "0 0 24 24",
                                fill: "none",
                                stroke: "currentColor",
                                "stroke-width": "1.8",
                                "stroke-linecap": "round",
                                "stroke-linejoin": "round",
                                "aria-hidden": "true",
                              },
                            },
                            [
                              _c("path", { attrs: { d: "m5 8 6 6" } }),
                              _c("path", { attrs: { d: "m4 14 6-6 2-3" } }),
                              _c("path", { attrs: { d: "M2 5h12" } }),
                              _c("path", { attrs: { d: "M7 2h1" } }),
                              _vm._v(" "),
                              _c("path", { attrs: { d: "m22 22-5-10-5 10" } }),
                              _c("path", { attrs: { d: "M14 18h6" } }),
                            ]
                          ),
                        ]
                      ),
                      _vm._v(" "),
                      _c(
                        "ul",
                        {
                          staticClass:
                            "dropdown-menu dropdown-menu-end lang-dropdown-menu shadow border mt-2",
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
                                _c(
                                  "span",
                                  { staticClass: "fw-semibold flex-grow-1" },
                                  [_vm._v(_vm._s(language.name))]
                                ),
                                _vm._v(" "),
                                _vm.lang === language.code
                                  ? _c("i", {
                                      staticClass: "bi bi-check2 text-primary",
                                    })
                                  : _vm._e(),
                              ]
                            ),
                          ])
                        }),
                        0
                      ),
                    ]
                  ),
                  _vm._v(" "),
                  _c("div", {
                    staticClass: "header-divider d-none d-sm-block",
                  }),
                  _vm._v(" "),
                  _c("div", { staticClass: "dropdown header-user" }, [
                    _c(
                      "a",
                      {
                        staticClass:
                          "user-dropdown-toggle d-flex align-items-center text-decoration-none",
                        attrs: {
                          href: "#",
                          "data-bs-toggle": "dropdown",
                          "aria-expanded": "false",
                        },
                      },
                      [
                        _c("img", {
                          staticClass: "user-avatar",
                          attrs: {
                            src: _vm.profile_url,
                            width: "36",
                            height: "36",
                            alt: "avatar",
                          },
                        }),
                        _vm._v(" "),
                        _c(
                          "div",
                          {
                            staticClass:
                              "d-none d-sm-flex flex-column text-start align-items-start user-meta",
                          },
                          [
                            _c("div", { staticClass: "user-username" }, [
                              _vm._v(_vm._s(_vm.user.username)),
                            ]),
                            _vm._v(" "),
                            _c(
                              "span",
                              { staticClass: "figma-user-role-text user-role" },
                              [_vm._v(_vm._s(_vm.role))]
                            ),
                          ]
                        ),
                        _vm._v(" "),
                        _c("i", {
                          staticClass: "bi bi-chevron-down user-chevron ms-1",
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
                                  {
                                    staticClass:
                                      "d-flex align-items-center gap-2",
                                  },
                                  [
                                    _c(
                                      "div",
                                      {
                                        staticClass:
                                          "form-check form-switch fs-6 mb-0",
                                      },
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
                                            checked: Array.isArray(
                                              _vm.sellerStatus
                                            )
                                              ? _vm._i(_vm.sellerStatus, null) >
                                                -1
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
                                                      (_vm.sellerStatus =
                                                        $$a.concat([$$v]))
                                                  } else {
                                                    $$i > -1 &&
                                                      (_vm.sellerStatus = $$a
                                                        .slice(0, $$i)
                                                        .concat(
                                                          $$a.slice($$i + 1)
                                                        ))
                                                  }
                                                } else {
                                                  _vm.sellerStatus = $$c
                                                }
                                              },
                                              _vm.toggleSellerStatus,
                                            ],
                                          },
                                        }),
                                      ]
                                    ),
                                    _vm._v(" "),
                                    _c(
                                      "span",
                                      {
                                        staticClass: "status-pill flex-fill",
                                        class:
                                          _vm.sellerStatus === 1
                                            ? "status-pill-soft"
                                            : "status-pill-muted",
                                      },
                                      [
                                        _c("i", {
                                          staticClass: "bi bi-person-fill",
                                        }),
                                        _vm._v(
                                          "\n                                            " +
                                            _vm._s(
                                              _vm.sellerStatus === 1
                                                ? _vm.__("active")
                                                : _vm.__("deactive")
                                            ) +
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
                                  {
                                    staticClass:
                                      "d-flex align-items-center gap-2",
                                  },
                                  [
                                    _c(
                                      "div",
                                      {
                                        staticClass:
                                          "form-check form-switch fs-6 mb-0",
                                      },
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
                                            disabled:
                                              _vm.deliveryBoyStatusLoading,
                                          },
                                          domProps: {
                                            checked: Array.isArray(
                                              _vm.deliveryBoyStatus
                                            )
                                              ? _vm._i(
                                                  _vm.deliveryBoyStatus,
                                                  null
                                                ) > -1
                                              : _vm._q(
                                                  _vm.deliveryBoyStatus,
                                                  1
                                                ),
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
                                                      (_vm.deliveryBoyStatus =
                                                        $$a
                                                          .slice(0, $$i)
                                                          .concat(
                                                            $$a.slice($$i + 1)
                                                          ))
                                                  }
                                                } else {
                                                  _vm.deliveryBoyStatus = $$c
                                                }
                                              },
                                              _vm.toggleDeliveryBoyStatus,
                                            ],
                                          },
                                        }),
                                      ]
                                    ),
                                    _vm._v(" "),
                                    _c(
                                      "span",
                                      {
                                        staticClass: "status-pill flex-fill",
                                        class:
                                          _vm.deliveryBoyStatus === 1
                                            ? "status-pill-soft"
                                            : "status-pill-muted",
                                      },
                                      [
                                        _c("i", {
                                          staticClass: "bi bi-person-fill",
                                        }),
                                        _vm._v(
                                          "\n                                            " +
                                            _vm._s(
                                              _vm.deliveryBoyStatus === 1
                                                ? _vm.__("active")
                                                : _vm.__("deactive")
                                            ) +
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
                        _vm._m(1),
                        _vm._v(" "),
                        _c("li", { staticClass: "d-sm-none" }, [
                          _c(
                            "a",
                            {
                              staticClass:
                                "dropdown-item d-flex align-items-center",
                              attrs: { href: "javascript:void(0)" },
                              on: {
                                click: function ($event) {
                                  return _vm.toggleTheme($event)
                                },
                              },
                            },
                            [
                              _c("i", {
                                staticClass: "icon-mid bi me-2",
                                class:
                                  _vm.userTheme === "theme-dark"
                                    ? "bi-sun"
                                    : "bi-moon",
                              }),
                              _vm._v(
                                _vm._s(
                                  _vm.userTheme === "theme-dark"
                                    ? "Light"
                                    : "Dark"
                                ) + "\n                                "
                              ),
                            ]
                          ),
                        ]),
                        _vm._v(" "),
                        _vm.websiteUrl
                          ? _c("li", { staticClass: "d-sm-none" }, [
                              _c(
                                "a",
                                {
                                  staticClass:
                                    "dropdown-item d-flex align-items-center",
                                  attrs: {
                                    href: _vm.websiteUrl,
                                    target: "_blank",
                                  },
                                },
                                [
                                  _c("i", {
                                    staticClass: "icon-mid bi bi-globe me-2",
                                  }),
                                  _vm._v(
                                    _vm._s(_vm.__("website")) +
                                      "\n                                "
                                  ),
                                ]
                              ),
                            ])
                          : _vm._e(),
                        _vm._v(" "),
                        _vm._l(_vm.languages, function (language) {
                          return _c(
                            "li",
                            {
                              key: "m-" + language.code,
                              staticClass: "d-sm-none",
                            },
                            [
                              _c(
                                "a",
                                {
                                  staticClass:
                                    "dropdown-item d-flex align-items-center gap-2",
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
                                    _vm._v(_vm._s(language.name)),
                                  ]),
                                ]
                              ),
                            ]
                          )
                        }),
                        _vm._v(" "),
                        _vm._m(2),
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
                                staticClass:
                                  "icon-mid bi bi-box-arrow-left me-2",
                              }),
                              _vm._v(
                                _vm._s(_vm.__("logout")) +
                                  "\n                                "
                              ),
                            ]
                          ),
                        ]),
                      ],
                      2
                    ),
                  ]),
                ]
              ),
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
      _vm._v(" "),
      _c("command-palette"),
    ],
    1
  )
}
var staticRenderFns = [
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("span", { staticClass: "ntf-empty-icon" }, [
      _c("i", { staticClass: "bi bi-bell-slash" }),
    ])
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("li", { staticClass: "d-sm-none" }, [
      _c("hr", { staticClass: "dropdown-divider" }),
    ])
  },
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