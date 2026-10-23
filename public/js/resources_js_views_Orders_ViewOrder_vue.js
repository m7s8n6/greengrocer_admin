"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_views_Orders_ViewOrder_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/RiderLiveMap.vue?vue&type=script&lang=js":
/*!******************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/RiderLiveMap.vue?vue&type=script&lang=js ***!
  \******************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var leaflet__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! leaflet */ "./node_modules/leaflet/dist/leaflet-src.js");
/* harmony import */ var leaflet__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(leaflet__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var leaflet_dist_leaflet_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! leaflet/dist/leaflet.css */ "./node_modules/leaflet/dist/leaflet.css");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_2__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//





/**
 * Live map for the delivery boy's order page: rider position, delivery address and the road
 * route between them, refreshed every few seconds from GET delivery_boy/live_tracking_route
 * (the same reply the customer app reads from customer/live_tracking_route).
 *
 * The map picture follows the Map Provider setting: Google Maps when it is Google (the script is
 * already loaded app-wide by vue2-google-maps), OpenStreetMap when it is OSM - so with Google
 * selected, no OpenStreetMap service is used here.
 */
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'RiderLiveMap',
  props: {
    orderId: {
      type: [Number, String],
      required: true
    },
    refreshSeconds: {
      type: Number,
      "default": 10
    }
  },
  data: function data() {
    return {
      useGoogle: window.mapProvider !== 'osm',
      map: null,
      riderMarker: null,
      destMarker: null,
      routeLine: null,
      timer: null,
      fitted: false,
      summary: '',
      message: ''
    };
  },
  mounted: function mounted() {
    this.start();
  },
  beforeDestroy: function beforeDestroy() {
    if (this.timer) clearInterval(this.timer);
    if (this.useGoogle) {
      [this.riderMarker, this.destMarker, this.routeLine].forEach(function (o) {
        return o && o.setMap && o.setMap(null);
      });
    } else if (this.map) {
      this.map.remove();
    }
    this.map = null;
  },
  methods: {
    start: function start() {
      var _this = this;
      if (this.useGoogle && typeof this.$gmapApiPromiseLazy === 'function') {
        this.$gmapApiPromiseLazy().then(function () {
          _this.initGoogleMap();
          _this.beginPolling();
        })["catch"](function () {
          // Google script could not load (key / network) - fall back to OpenStreetMap.
          _this.useGoogle = false;
          _this.initOsmMap();
          _this.beginPolling();
        });
      } else {
        this.useGoogle = false;
        this.initOsmMap();
        this.beginPolling();
      }
    },
    beginPolling: function beginPolling() {
      this.loadRoute();
      this.timer = setInterval(this.loadRoute, this.refreshSeconds * 1000);
    },
    // ---------- map setup ----------
    initGoogleMap: function initGoogleMap() {
      this.map = new window.google.maps.Map(this.$refs.mapEl, {
        center: {
          lat: 23.0225,
          lng: 72.5714
        },
        zoom: 13,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false
      });
    },
    initOsmMap: function initOsmMap() {
      this.map = leaflet__WEBPACK_IMPORTED_MODULE_0___default().map(this.$refs.mapEl).setView([23.0225, 72.5714], 13);
      leaflet__WEBPACK_IMPORTED_MODULE_0___default().tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(this.map);
    },
    emojiIcon: function emojiIcon(emoji) {
      return leaflet__WEBPACK_IMPORTED_MODULE_0___default().divIcon({
        html: '<div style="font-size:28px;line-height:28px;">' + emoji + '</div>',
        className: 'rider-live-map-icon',
        iconSize: [28, 28],
        iconAnchor: [14, 14]
      });
    },
    // ---------- data ----------
    loadRoute: function loadRoute() {
      var _this2 = this;
      axios__WEBPACK_IMPORTED_MODULE_2___default().get(this.$deliveryBoyApiUrl + '/live_tracking_route', {
        params: {
          order_id: this.orderId
        }
      }).then(function (response) {
        var res = response.data;
        if (res.status !== 1 || !res.data) {
          _this2.message = res.message || _this2.__('live_tracking_not_available') || 'Live location is not available yet.';
          return;
        }
        _this2.message = '';
        _this2.draw(res.data);
      })["catch"](function () {
        _this2.message = _this2.__('live_tracking_not_available') || 'Live location is not available yet.';
      });
    },
    draw: function draw(data) {
      if (!this.map) return;
      var rider = [Number(data.driver.latitude), Number(data.driver.longitude)];
      var dest = [Number(data.destination.latitude), Number(data.destination.longitude)];
      var coords = data.route && data.route.coordinates ? data.route.coordinates : [rider, dest];
      if (this.useGoogle) {
        this.drawGoogle(rider, dest, coords);
      } else {
        this.drawOsm(rider, dest, coords);
      }
      var route = data.route || {};
      var parts = [];
      if (route.distance) parts.push((route.distance / 1000).toFixed(1) + ' km');
      if (route.duration) parts.push(Math.max(1, Math.round(route.duration / 60)) + ' min');
      this.summary = parts.join(' · ');
    },
    drawGoogle: function drawGoogle(rider, dest, coords) {
      var gm = window.google.maps;
      var riderPos = {
        lat: rider[0],
        lng: rider[1]
      };
      var destPos = {
        lat: dest[0],
        lng: dest[1]
      };
      var path = coords.map(function (c) {
        return {
          lat: Number(c[0]),
          lng: Number(c[1])
        };
      });
      // An invisible circle icon + an emoji label gives an emoji marker without extra image files.
      var hiddenIcon = {
        path: gm.SymbolPath.CIRCLE,
        scale: 0
      };
      if (this.riderMarker) {
        this.riderMarker.setPosition(riderPos);
      } else {
        this.riderMarker = new gm.Marker({
          position: riderPos,
          map: this.map,
          icon: hiddenIcon,
          label: {
            text: '🛵',
            fontSize: '26px'
          }
        });
      }
      if (this.destMarker) {
        this.destMarker.setPosition(destPos);
      } else {
        this.destMarker = new gm.Marker({
          position: destPos,
          map: this.map,
          icon: hiddenIcon,
          label: {
            text: '📍',
            fontSize: '26px'
          }
        });
      }
      if (this.routeLine) {
        this.routeLine.setPath(path);
      } else {
        this.routeLine = new gm.Polyline({
          path: path,
          map: this.map,
          strokeColor: this.$themeColor('primary-500'),
          strokeOpacity: 0.9,
          strokeWeight: 5
        });
      }

      // Fit the view once, so the rider can still pan and zoom without it snapping back.
      if (!this.fitted) {
        var bounds = new gm.LatLngBounds();
        bounds.extend(riderPos);
        bounds.extend(destPos);
        this.map.fitBounds(bounds, 60);
        this.fitted = true;
      }
    },
    drawOsm: function drawOsm(rider, dest, coords) {
      if (this.riderMarker) {
        this.riderMarker.setLatLng(rider);
      } else {
        this.riderMarker = leaflet__WEBPACK_IMPORTED_MODULE_0___default().marker(rider, {
          icon: this.emojiIcon('🛵')
        }).addTo(this.map);
      }
      if (this.destMarker) {
        this.destMarker.setLatLng(dest);
      } else {
        this.destMarker = leaflet__WEBPACK_IMPORTED_MODULE_0___default().marker(dest, {
          icon: this.emojiIcon('📍')
        }).addTo(this.map);
      }
      if (this.routeLine) {
        this.routeLine.setLatLngs(coords);
      } else {
        this.routeLine = leaflet__WEBPACK_IMPORTED_MODULE_0___default().polyline(coords, {
          color: this.$themeColor('primary-500'),
          weight: 5,
          opacity: 0.9
        }).addTo(this.map);
      }
      if (!this.fitted) {
        this.map.fitBounds(leaflet__WEBPACK_IMPORTED_MODULE_0___default().latLngBounds([rider, dest]).pad(0.3));
        this.fitted = true;
      }
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Orders/ViewOrder.vue?vue&type=script&lang=js":
/*!*****************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Orders/ViewOrder.vue?vue&type=script&lang=js ***!
  \*****************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Auth_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Auth.js */ "./resources/js/Auth.js");
/* harmony import */ var _components_RiderLiveMap_vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../components/RiderLiveMap.vue */ "./resources/js/components/RiderLiveMap.vue");
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
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




/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  components: {
    RiderLiveMap: _components_RiderLiveMap_vue__WEBPACK_IMPORTED_MODULE_2__["default"]
  },
  data: function data() {
    var _ref;
    return _ref = {
      login_user: _Auth_js__WEBPACK_IMPORTED_MODULE_1__["default"].user,
      isLoading: false,
      isLoadingDboy: false,
      isLoadingUstatus: false,
      isLoadingCancel: false,
      id: null,
      order: [],
      order_items: [],
      discount_in_rupees: 0,
      whatsapp_message: "",
      order_status_id: "",
      liveTrackingWatchId: null,
      liveTrackingLastSentAt: 0,
      selectedItems: [],
      select: '',
      all_select: false,
      statuses: '',
      status_id: '',
      deliveryBoys: '',
      delivery_boy_id: '',
      itemModalShow: false,
      item: '',
      userRole: ''
    }, _defineProperty(_ref, "order", {
      order_id: '' // Replace with the actual order ID
    }), _defineProperty(_ref, "cancellationReason", ''), _defineProperty(_ref, "cancelItem", null), _defineProperty(_ref, "cancelModalError", ''), _defineProperty(_ref, "prescriptionModalShow", false), _defineProperty(_ref, "selectedPrescriptionUrl", ''), _ref;
  },
  computed: {
    isSellerRoute: function isSellerRoute() {
      // Use this.$route to access the current route
      return this.$route.path.startsWith('/seller/');
    },
    isDeliveryBoyRole: function isDeliveryBoyRole() {
      return this.login_user && this.login_user.role && this.login_user.role.name === this.$roleDeliveryBoy;
    },
    isDeliveryBoyRoute: function isDeliveryBoyRoute() {
      // Use this.$route to access the current route
      return this.$route.path.startsWith('/delivery_boy/');
    },
    activeOrderItems: function activeOrderItems() {
      return this.order_items.filter(function (item) {
        return Number(item.active_status) !== 7;
      });
    },
    activeSubtotal: function activeSubtotal() {
      return this.activeOrderItems.reduce(function (sum, item) {
        return sum + parseFloat(item.sub_total || 0);
      }, 0);
    },
    activeAddonTotal: function activeAddonTotal() {
      return this.activeOrderItems.reduce(function (sum, item) {
        return sum + parseFloat(item.addon_price || 0) * (item.quantity || 1);
      }, 0);
    },
    invoiceRoute: function invoiceRoute() {
      // Define route configurations based on user roles
      var routeConfig = null;
      switch (this.login_user.role.name) {
        case 'Seller':
          routeConfig = {
            name: 'SellerInvoiceOrder',
            params: {
              id: this.order.order_id
            }
          };
          break;
        case 'Delivery Boy':
          routeConfig = {
            name: 'DeliveryBoyInvoiceOrder',
            params: {
              id: this.order.order_id
            }
          };
          break;
        case 'Admin':
          routeConfig = {
            name: 'InvoiceOrder',
            params: {
              id: this.order.order_id
            }
          };
          break;
        case 'Super Admin':
          routeConfig = {
            name: 'InvoiceOrder',
            params: {
              id: this.order.order_id
            }
          };
          break;
        default:
          // Handle any other roles or cases
          break;
      }
      return routeConfig;
    },
    viewProductRoute: function viewProductRoute() {
      // Define route configurations based on user roles
      var routeConfig = null;
      switch (this.login_user.role.name) {
        case 'Seller':
          routeConfig = {
            name: 'SellerViewProduct',
            params: {
              id: this.item.product_id
            }
          };
          break;
        case 'Delivery Boy':
          routeConfig = {
            name: 'DeliveryBoyViewProduct',
            params: {
              id: this.item.product_id
            }
          };
          break;
        case 'Admin':
          routeConfig = {
            name: 'ViewProduct',
            params: {
              id: this.item.product_id
            }
          };
          break;
        case 'Super Admin':
          routeConfig = {
            name: 'ViewProduct',
            params: {
              id: this.item.product_id
            }
          };
          break;
        default:
          // Handle any other roles or cases
          break;
      }
      return routeConfig;
    },
    // ----- Presentation helpers for the redesigned layout (no data/API changes) -----
    hasDeliveryTime: function hasDeliveryTime() {
      var t = this.order && this.order.delivery_time;
      return !!(t && typeof t === 'string' && !t.includes('1970') && t.trim() !== '' && t !== 'N/A');
    },
    totalQuantity: function totalQuantity() {
      return (this.order_items || []).reduce(function (sum, item) {
        return sum + (parseInt(item.quantity, 10) || 0);
      }, 0);
    },
    paymentMethodLabel: function paymentMethodLabel() {
      var pm = this.order && this.order.payment_method;
      if (!pm || typeof pm !== 'string') return '';
      var key = 'txn_type_' + pm.toLowerCase();
      var translated = this.__(key);
      if (translated && translated !== key) return translated;
      return pm.replace(/_/g, ' ').replace(/\b\w/g, function (c) {
        return c.toUpperCase();
      });
    },
    orderTypeLabel: function orderTypeLabel() {
      var o = this.order || {};
      if (o.order_type === 'selfpickup') return this.__('self_pickup');
      if (o.slot_type === 'express') return this.__('express');
      if (o.order_type === 'doorstep') return this.tr('doorstep_delivery', 'Doorstep Delivery');
      return '';
    },
    customerTel: function customerTel() {
      var o = this.order || {};
      if (!o.user_mobile) return '';
      var cc = o.user_country_code ? String(o.user_country_code).replace(/[^0-9]/g, '') : '';
      return 'tel:' + (cc ? '+' + cc : '') + String(o.user_mobile).replace(/\s+/g, '');
    },
    mapsUrl: function mapsUrl() {
      var o = this.order || {};
      var lat = parseFloat(o.latitude);
      var lng = parseFloat(o.longitude);
      var query = '';
      if (!isNaN(lat) && !isNaN(lng) && (lat !== 0 || lng !== 0)) {
        query = lat + ',' + lng;
      } else if (o.order_address && String(o.order_address).trim() !== '') {
        query = String(o.order_address).trim();
      }
      return query ? 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(query) : '';
    },
    // Order lifecycle stepper. Built only from the current active_status (the order view API
    // returns no per-status history), plus the order date under the first step.
    trackerSteps: function trackerSteps() {
      var _this = this;
      var o = this.order || {};
      var current = Number(o.active_status) || 0;
      if (!current) return [];
      var isPickup = o.order_type === 'selfpickup' || [9, 10, 11].includes(current);
      var flow = isPickup ? [9, 10, 11] : [2, 3, 4, 5, 6];
      if (!isPickup && current === 1) flow = [1].concat(flow);
      var icons = {
        1: 'fas fa-wallet',
        2: 'fas fa-clipboard-check',
        3: 'fas fa-box',
        4: 'fas fa-box-open',
        5: 'fas fa-shipping-fast',
        6: 'fas fa-home',
        9: 'fas fa-clock',
        10: 'fas fa-store',
        11: 'fas fa-hand-holding'
      };
      var finalIds = [6, 11];
      var currentIdx = flow.indexOf(current);
      if (current === 8) currentIdx = flow.length; // returned => the delivery flow was completed
      var steps = flow.map(function (id, i) {
        var state = 'upcoming';
        if (current !== 7 && currentIdx > -1) {
          if (i < currentIdx) state = 'done';else if (i === currentIdx) state = finalIds.includes(id) ? 'done' : 'current';
        }
        return {
          key: 's' + id,
          id: id,
          label: _this.getStatusLabelById(id),
          icon: icons[id] || 'fas fa-circle',
          state: state,
          time: i === 0 && state !== 'upcoming' ? o.orders_created_at || '' : ''
        };
      });
      if (current === 7 || current === 8) {
        steps.push({
          key: 's' + current,
          id: current,
          label: this.getStatusLabelById(current),
          icon: current === 7 ? 'fas fa-times' : 'fas fa-undo',
          state: current === 7 ? 'error' : 'warn',
          time: ''
        });
      }
      return steps;
    }
  },
  created: function created() {
    this.id = this.$route.params.id;
    //this.record = this.$route.params.record;
    if (this.id) {
      this.getOrderStatus();
      this.getOrder();
    }
    if (this.order.discount > 0) {
      var discounted_amount = this.order.total * this.order.discount / 100;
      var remaining_final = this.order.total - discounted_amount;
      this.discount_in_rupees = this.order.total - remaining_final;
    }
  },
  beforeDestroy: function beforeDestroy() {
    this.stopLiveTracking();
  },
  methods: {
    // Translate with an English fallback when the key is missing (window.__ returns the key itself).
    tr: function tr(key, fallback) {
      var v = this.__(key);
      return v && v !== key ? v : fallback;
    },
    showPrescription: function showPrescription(url) {
      this.selectedPrescriptionUrl = url;
      this.prescriptionModalShow = true;
    },
    getDisplayName: function getDisplayName(name) {
      if (name == null) return '';
      if (typeof name === 'string') {
        var trimmed = name.trim();
        if (trimmed.startsWith('{') && trimmed.endsWith('}')) {
          try {
            name = JSON.parse(trimmed);
          } catch (e) {
            return name;
          }
        } else {
          return name;
        }
      }
      if (_typeof(name) === 'object' && !Array.isArray(name)) {
        if ('name' in name && 'lang' in name) return String(name.name || '').trim();
        var appLocale = window.appLocale || window.localStorage.getItem('lang') || 'en';
        var forLocale = name[appLocale];
        if (forLocale != null && String(forLocale).trim() !== '') return String(forLocale).trim();
        var firstNonEmpty = Object.values(name).find(function (val) {
          return val != null && String(val).trim() !== '';
        });
        return firstNonEmpty != null ? String(firstNonEmpty).trim() : '';
      }
      return String(name);
    },
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
      var _this2 = this;
      var vm = this;
      axios__WEBPACK_IMPORTED_MODULE_0___default().get(this.$apiUrl + '/order_statuses').then(function (response) {
        _this2.isLoading = false;
        var data = response.data;
        var statusesToRemoveIds = [7, 8];
        _this2.statuses = data.data.filter(function (status) {
          return !statusesToRemoveIds.includes(status.id);
        });
      })["catch"](function (error) {
        vm.isLoading = false;
        if (error.request.statusText) {
          _this2.showError(error.request.statusText);
        } else if (error.message) {
          _this2.showError(error.message);
        } else {
          _this2.showError("Something went wrong!");
        }
      });
    },
    formatDate: function formatDate(dateTime) {
      if (!dateTime) return 'N/A';
      var date = new Date(dateTime);
      if (isNaN(date.getTime())) return 'N/A';
      var day = date.getDate().toString().padStart(2, '0');
      var month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is 0-based
      var year = date.getFullYear();
      return "".concat(day, "-").concat(month, "-").concat(year);
    },
    getOrder: function getOrder() {
      var _this3 = this;
      this.isLoading = true;
      axios__WEBPACK_IMPORTED_MODULE_0___default().get(this.$apiUrl + '/orders/view/' + this.id).then(function (response) {
        _this3.isLoading = false;
        var data = response.data;
        if (data.status === 1) {
          _this3.order = response.data.data.order;
          _this3.order_items = response.data.data.order_items;
          _this3.deliveryBoys = response.data.data.deliveryBoys;
          _this3.delivery_boy_id = _this3.order.delivery_boy_id != 0 && _this3.order.delivery_boy_id != "" ? _this3.order.delivery_boy_id : "";
          _this3.order_status_id = _this3.order.active_status != 0 && _this3.order.active_status != "" ? _this3.order.active_status : "";
          _this3.syncLiveTracking();
        } else {
          _this3.showError(data.message);
          setTimeout(function () {
            _this3.$router.back();
          }, 1000);
        }
      })["catch"](function (error) {
        _this3.isLoading = false;
        if (error.request.statusText) {
          _this3.showError(error.request.statusText);
        } else if (error.message) {
          _this3.showError(error.message);
        } else {
          _this3.showError("Something went wrong!");
        }
      });
    },
    // Live tracking: the delivery boy's mobile app pushes GPS via update_location while
    // an order is Out For Delivery - the web panel never did, so customers never got live
    // tracking data for orders worked from here. Mirrors that same behavior in the browser
    // via watchPosition, only while this delivery boy has this order open and it's Out For
    // Delivery (active_status 5 - the only status this feature makes sense for).
    syncLiveTracking: function syncLiveTracking() {
      if (this.login_user.role.name !== this.$roleDeliveryBoy || !navigator.geolocation) {
        return;
      }
      if (Number(this.order.active_status) === 5) {
        this.startLiveTracking();
      } else {
        this.stopLiveTracking();
      }
    },
    startLiveTracking: function startLiveTracking() {
      var _this4 = this;
      if (this.liveTrackingWatchId !== null) return;
      this.liveTrackingWatchId = navigator.geolocation.watchPosition(function (position) {
        return _this4.sendLiveTrackingUpdate(position);
      }, function (error) {
        return console.error('Live tracking location error:', error.message);
      }, {
        enableHighAccuracy: true,
        maximumAge: 10000
      });
    },
    stopLiveTracking: function stopLiveTracking() {
      if (this.liveTrackingWatchId === null) return;
      navigator.geolocation.clearWatch(this.liveTrackingWatchId);
      this.liveTrackingWatchId = null;
    },
    sendLiveTrackingUpdate: function sendLiveTrackingUpdate(position) {
      // watchPosition can fire far more often than needed - send at most every 15s.
      var now = Date.now();
      if (now - this.liveTrackingLastSentAt < 15000) return;
      this.liveTrackingLastSentAt = now;

      // update_location needs only the position: the server saves it for every order this
      // rider has Out For Delivery.
      var formData = new FormData();
      formData.append('latitude', position.coords.latitude);
      formData.append('longitude', position.coords.longitude);
      axios__WEBPACK_IMPORTED_MODULE_0___default().post(this.$deliveryBoyApiUrl + '/update_location', formData)["catch"](function (error) {
        console.error('Failed to send live tracking update:', error);
      });
    },
    sendInfo: function sendInfo(item) {
      this.item = item;
      this.itemModalShow = true;
    },
    whatsappMessageLink: function whatsappMessageLink(country_code, mobile, user_name, order_id, item_id) {
      return "https://api.whatsapp.com/send?phone=+" + country_code + " " + mobile + "&text=Hello " + user_name + " ,Your order with ID :" + order_id + " is  " + item_id + ". Please take a note of it. If you have further queries feel free to contact us. Thank you.";
    },
    updateStatus: function updateStatus() {
      var _this5 = this;
      var vm = this;
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
          _this5.isLoadingUstatus = true;
          var postData = {
            order_id: _this5.id,
            status_id: _this5.order_status_id
          };
          axios__WEBPACK_IMPORTED_MODULE_0___default().post(_this5.$apiUrl + '/orders/update_status', postData).then(function (response) {
            _this5.isLoadingUstatus = false;
            var data = response.data;
            if (data.status === 1) {
              //this.showSuccess(data.message);
              _this5.order_status_id = '';
              _this5.getOrder();
              _this5.showMessage("success", data.message);
              setTimeout(function () {
                vm.$swal.close();
              }, 2000);
            } else {
              vm.showError(data.message);
              vm.isLoadingUstatus = false;
            }
          })["catch"](function (error) {
            vm.isLoadingUstatus = false;
            _this5.showError("Something went wrong!");
          });
        }
      });
    },
    assignDeliveryBoy: function assignDeliveryBoy() {
      var _this6 = this;
      this.isLoadingDboy = true;
      var postData = {
        order_id: this.id,
        delivery_boy_id: this.delivery_boy_id
      };
      axios__WEBPACK_IMPORTED_MODULE_0___default().post(this.$apiUrl + '/orders/assign_delivery_boy', postData).then(function (response) {
        _this6.isLoadingDboy = false;
        var data = response.data;
        if (data.status === 1) {
          _this6.delivery_boy_id = '';
          _this6.getOrder();
          _this6.showMessage("success", data.message);
          setTimeout(function () {
            vm.$swal.close();
          }, 2000);
        } else {
          _this6.showMessage("error", data.message);
          _this6.isLoadingDboy = false;
        }
      })["catch"](function (error) {
        _this6.isLoadingDboy = false;
        _this6.showError("Something went wrong!");
      });
    },
    downloadInvoice: function downloadInvoice() {
      var _this7 = this;
      this.isLoading = true;
      var postData = {
        order_id: this.id
      };
      axios__WEBPACK_IMPORTED_MODULE_0___default()({
        url: this.$apiUrl + '/orders/invoice_download',
        method: 'post',
        responseType: 'blob',
        data: postData
      }).then(function (response) {
        var fileURL = window.URL.createObjectURL(new Blob([response.data]));
        var fileLink = document.createElement('a');
        fileLink.href = fileURL;
        fileLink.setAttribute('download', 'Invoice-No:#' + _this7.id + '.pdf');
        document.body.appendChild(fileLink);
        fileLink.click();
        _this7.isLoading = false;
      })["catch"](function (error) {
        if (error.request.statusText) {
          _this7.showError(error.request.statusText);
        } else if (error.message) {
          _this7.showError(error.message);
        } else {
          _this7.showError("Something went wrong!");
        }
        _this7.isLoading = false;
      });
    },
    allSelectCheckBox: function allSelectCheckBox() {
      var _this8 = this;
      if (this.all_select == false) {
        this.all_select = true;
        this.order_items.forEach(function (item) {
          _this8.selectedItems.push(item.id);
        });
      } else {
        this.all_select = false;
        this.selectedItems = [];
      }
    },
    selectCheckBox: function selectCheckBox() {
      var uniqueSelectedItems = _toConsumableArray(new Set(this.selectedItems));
      if (this.order_items.length === uniqueSelectedItems.length) {
        this.all_select = true;
      } else {
        this.all_select = false;
      }
    },
    updateItemsStatus: function updateItemsStatus() {
      var _this9 = this;
      var vm = this;
      var uniqueSelectedItems = _toConsumableArray(new Set(this.selectedItems));
      if (uniqueSelectedItems.length !== 0) {
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
            var ids = uniqueSelectedItems.toString();
            _this9.isLoading = true;
            var postData = {
              ids: ids,
              status_id: _this9.status_id
            };
            axios__WEBPACK_IMPORTED_MODULE_0___default().post(_this9.$apiUrl + '/orders/update_items_status', postData).then(function (response) {
              _this9.isLoading = false;
              var data = response.data;
              if (data.status === 1) {
                _this9.getOrder();
                _this9.status_id = '';
                _this9.selectedItems = [];
                _this9.all_select = false;
                _this9.showMessage("success", data.message);
                setTimeout(function () {
                  vm.$swal.close();
                }, 2000);
              } else {
                vm.showError(data.message);
                vm.isLoading = false;
              }
            })["catch"](function (error) {
              vm.isLoading = false;
              _this9.showError("Something went wrong!");
            });
          }
        });
      } else {
        this.showWarning("Select at least one record!");
      }
    },
    getAdditionalChargesTotal: function getAdditionalChargesTotal(charges) {
      if (!charges || !Array.isArray(charges)) return 0;
      return charges.reduce(function (total, charge) {
        return total + (parseFloat(charge.amount) || 0);
      }, 0).toFixed(2);
    },
    canCancelItem: function canCancelItem(item) {
      // 6=delivered, 7=cancelled, 8=returned
      return item.active_status != 6 && item.active_status != 7 && item.active_status != 8 && item.active_status != 11; // 11=selfPickupPicked
    },
    cancelOrderItem: function cancelOrderItem(item) {
      this.cancelItem = item;
      this.cancellationReason = '';
      this.cancelModalError = '';
      this.$refs['cancel-item-modal'].show();
    },
    closeCancelModal: function closeCancelModal() {
      this.$refs['cancel-item-modal'].hide();
      this.cancelItem = null;
      this.cancellationReason = '';
      this.cancelModalError = '';
    },
    confirmCancelOrderItem: function confirmCancelOrderItem() {
      var _this10 = this;
      if (!this.cancellationReason || !this.cancellationReason.trim()) {
        this.cancelModalError = (this.__('cancellation_reason') || 'Cancellation reason') + ' ' + (this.__('is_required') || 'is required');
        return;
      }
      this.cancelModalError = '';
      this.isLoadingCancel = true;
      var postData = {
        order_item_id: this.cancelItem.id,
        cancellation_reason: this.cancellationReason
      };
      axios__WEBPACK_IMPORTED_MODULE_0___default().post(this.$apiUrl + '/orders/cancel_order_item', postData).then(function (response) {
        _this10.isLoadingCancel = false;
        var data = response.data;
        if (data.status === 1) {
          _this10.getOrder();
          _this10.showMessage("success", data.message);
          _this10.closeCancelModal();
        } else {
          _this10.showError(data.message);
        }
      })["catch"](function (error) {
        _this10.isLoadingCancel = false;
        _this10.showError(error.message || 'Something went wrong!');
      });
    },
    getStatusBadgeClass: function getStatusBadgeClass(statusId) {
      var id = Number(statusId);
      var classMap = {
        1: 'status-pending',
        // Payment Pending
        2: 'status-received',
        // Received
        3: 'status-processed',
        // Processed
        4: 'status-shipped',
        // Shipped
        5: 'status-outfordelivery',
        // Out For Delivery
        6: 'status-delivered',
        // Delivered
        7: 'status-cancelled',
        // Cancelled
        8: 'status-returned',
        // Returned
        9: 'status-pending',
        // Pending (Self Pickup)
        10: 'status-processed',
        // Ready for Pickup (Self Pickup)
        11: 'status-delivered' // Picked Up (Self Pickup)
      };
      return classMap[id] || 'status-default';
    },
    getStatusLabelById: function getStatusLabelById(val) {
      if (val == null || val === '') return '';
      var id = typeof val === 'number' ? val : parseInt(val, 10);
      if (!isNaN(id)) {
        var map = {
          1: 'payment_pending',
          2: 'received',
          3: 'processed',
          4: 'shipped',
          5: 'outForDelivery',
          6: 'delivered',
          7: 'cancelled',
          8: 'returned',
          9: 'pending',
          10: 'ready_for_pickup',
          11: 'picked_up'
        };
        var key = map[id];
        return key ? this.__(key) : String(val);
      }
      return String(val);
    }
  }
});

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/RiderLiveMap.vue?vue&type=style&index=0&id=6ea55c3e&scoped=true&lang=css":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/RiderLiveMap.vue?vue&type=style&index=0&id=6ea55c3e&scoped=true&lang=css ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
___CSS_LOADER_EXPORT___.push([module.id, "\n.rider-live-map-message[data-v-6ea55c3e] {\n    position: absolute;\n    left: 50%;\n    top: 50%;\n    transform: translate(-50%, -50%);\n    z-index: 500;\n    padding: 8px 14px;\n    border-radius: 8px;\n    font-size: 14px;\n    background: rgba(0, 0, 0, 0.65);\n    color: #fff;\n    text-align: center;\n}\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/RiderLiveMap.vue?vue&type=style&index=1&id=6ea55c3e&lang=css":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/RiderLiveMap.vue?vue&type=style&index=1&id=6ea55c3e&lang=css ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
___CSS_LOADER_EXPORT___.push([module.id, "\n.rider-live-map-icon {\n    background: transparent;\n    border: none;\n}\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Orders/ViewOrder.vue?vue&type=style&index=0&id=721c2304&scoped=true&lang=css":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Orders/ViewOrder.vue?vue&type=style&index=0&id=721c2304&scoped=true&lang=css ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
___CSS_LOADER_EXPORT___.push([module.id, "\n[data-v-721c2304] .cancel-item-btn svg path,[data-v-721c2304] .cancel-item-btn:hover svg path {\n    fill: var(--theme-error-500) !important;\n}\n\n/* ===== Order detail (SnapBuy layout) ===== */\n.modern-page-title[data-v-721c2304] {\n    font-family: var(--ui-font);\n    font-weight: 700;\n    font-size: 20px;\n    line-height: 28px;\n    color: var(--ui-heading);\n}\n.order-meta-bar[data-v-721c2304] {\n    width: 100%;\n    display: flex;\n    flex-wrap: wrap;\n    align-items: center;\n    gap: 8px 24px;\n    padding-top: 12px;\n    border-top: 1px solid var(--ui-border);\n    font-family: var(--ui-font);\n    font-size: 13px;\n    line-height: 20px;\n}\n.order-meta-date[data-v-721c2304],\n.order-meta-seller[data-v-721c2304] {\n    display: flex;\n    align-items: center;\n    flex-wrap: wrap;\n    gap: 6px;\n}\n.order-meta-bar i[data-v-721c2304] {\n    color: var(--ui-text-muted);\n    font-size: 13px;\n}\n.card[data-v-721c2304] {\n    border: 1px solid var(--ui-border) !important;\n    border-radius: var(--ui-radius-lg) !important;\n    overflow: hidden;\n    margin-bottom: 24px;\n}\n.item-count-badge[data-v-721c2304] {\n    display: inline-flex;\n    align-items: center;\n    height: 26px;\n    padding: 0 10px;\n    border-radius: var(--ui-radius-sm);\n    background-color: var(--ui-surface-muted);\n    border: 1px solid var(--ui-border);\n    color: var(--ui-text);\n    font-weight: 600;\n    font-size: 12px;\n    white-space: nowrap;\n}\nbody.theme-dark .item-count-badge[data-v-721c2304] {\n    background-color: var(--theme-neutral-700) !important;\n    border-color: var(--theme-neutral-600) !important;\n    color: var(--theme-neutral-100) !important;\n}\n.cancel-item-btn[data-v-721c2304] {\n    width: 32px;\n    height: 32px;\n    border-radius: var(--ui-radius);\n    border: 1px solid color-mix(in srgb, var(--theme-error-500) 30%, transparent) !important;\n    background: var(--theme-error-50);\n    color: var(--theme-error-500);\n}\n.cancel-item-btn[data-v-721c2304]:hover {\n    background: color-mix(in srgb, var(--theme-error-500) 18%, transparent);\n}\n.delivery-time-box[data-v-721c2304] {\n    padding: 10px 12px;\n    background: var(--theme-error-50);\n    border: 1px solid var(--theme-error-200);\n    border-radius: var(--ui-radius);\n}\nbody.theme-dark .delivery-time-box[data-v-721c2304] {\n    background: color-mix(in srgb, var(--theme-error-500) 15%, transparent) !important;\n    border-color: color-mix(in srgb, var(--theme-error-500) 30%, transparent) !important;\n}\n.order-notes-box[data-v-721c2304] {\n    background-color: var(--theme-info-50);\n    border-inline-start: 3px solid var(--theme-info-500);\n    border-radius: var(--ui-radius);\n    padding: 12px 14px;\n    text-align: start;\n}\n.order-notes-text[data-v-721c2304] {\n    font-size: 13px;\n    line-height: 20px;\n    color: var(--ui-text);\n}\n@media (max-width: 575.98px) {\n.order-header-card[data-v-721c2304] {\n        padding: 14px 16px;\n}\n.od-print-btn[data-v-721c2304] {\n        width: 100%;\n        justify-content: center;\n}\n.od-card-body[data-v-721c2304] {\n        padding: 16px;\n}\n.od-card-header[data-v-721c2304] {\n        padding: 12px 16px;\n}\n}\n\n/* order-notes-box/title/text use hardcoded light inline colors (light-blue bg, near-black\n   text) that stay light-only - the broad dark-mode span/div text-color override further down\n   then forces near-white text onto that unchanged light-blue background, making it unreadable. */\nbody.theme-dark .order-notes-box[data-v-721c2304] {\n    background-color: color-mix(in srgb, var(--theme-info-500) 15%, transparent) !important;\n    border-left-color: var(--theme-info-500) !important;\n}\nbody.theme-dark .order-notes-title[data-v-721c2304],\nbody.theme-dark .order-notes-text[data-v-721c2304] {\n    color: var(--theme-neutral-100) !important;\n}\n\n/* Base text color fixes for dark mode in this component */\nbody.theme-dark .modern-page-title[data-v-721c2304],\nbody.theme-dark .figma-text-xl-semibold[data-v-721c2304],\nbody.theme-dark .text-dark[data-v-721c2304],\nbody.theme-dark h2[data-v-721c2304],\nbody.theme-dark h3[data-v-721c2304],\nbody.theme-dark h4[data-v-721c2304],\nbody.theme-dark h5[data-v-721c2304],\nbody.theme-dark span[data-v-721c2304],\nbody.theme-dark th[data-v-721c2304],\nbody.theme-dark td[data-v-721c2304],\nbody.theme-dark div[data-v-721c2304]:not(.figma-status-pill) {\n    color: var(--theme-neutral-100) !important;\n}\nbody.theme-dark .text-secondary[data-v-721c2304],\nbody.theme-dark .text-muted[data-v-721c2304] {\n    color: var(--theme-neutral-400) !important;\n}\nbody.theme-dark .card-header[data-v-721c2304],\nbody.theme-dark .table thead[data-v-721c2304],\nbody.theme-dark .table thead th[data-v-721c2304] {\n    background-color: var(--theme-neutral-800) !important;\n    border-top-color: var(--theme-neutral-700) !important;\n    border-bottom-color: var(--theme-neutral-700) !important;\n}\nbody.theme-dark .table tbody tr td[data-v-721c2304] {\n    background-color: var(--theme-neutral-800) !important;\n    border-bottom: 1px solid var(--theme-neutral-700) !important;\n}\nbody.theme-dark table.table tbody tr:hover td[data-v-721c2304] {\n    background-color: var(--theme-neutral-800) !important;\n}\nbody.theme-dark .card[data-v-721c2304] {\n    background-color: var(--theme-neutral-800) !important;\n    border-color: var(--theme-neutral-700) !important;\n}\nbody.theme-dark .form-select[data-v-721c2304],\nbody.theme-dark .form-control[data-v-721c2304] {\n    background-color: var(--theme-neutral-900) !important;\n    border-color: var(--theme-neutral-700) !important;\n    color: var(--theme-neutral-100) !important;\n}\nbody.theme-dark .order-details-wrapper>div[data-v-721c2304]:first-child {\n    background: linear-gradient(180deg, var(--theme-neutral-800) 0%, var(--theme-neutral-900) 100%) !important;\n    border: 1px solid var(--theme-neutral-700) !important;\n}\nbody.theme-dark .delivery-time-box div[data-v-721c2304] {\n    color: var(--theme-error-400) !important;\n}\nbody.theme-dark .delivery-time-box .text-dark[data-v-721c2304] {\n    color: var(--theme-neutral-100) !important;\n}\n\n/* Print Order button contrast */\nbody.theme-dark .btn-dark[data-v-721c2304] {\n    background-color: var(--theme-neutral-700) !important;\n    border-color: var(--theme-neutral-600) !important;\n}\nbody.theme-dark .avatar-box.bg-light[data-v-721c2304] {\n    background-color: var(--theme-neutral-700) !important;\n    color: var(--theme-success-500) !important;\n}\n.figma-default-badge[data-v-721c2304] {\n    display: flex !important;\n    align-items: center !important;\n    justify-content: center !important;\n    height: 22px !important;\n    padding: 0 8px !important;\n    background: var(--theme-success-50) !important;\n    border-radius: 8px !important;\n}\n.figma-default-badge span[data-v-721c2304] {\n    font-family: var(--ui-font) !important;\n    font-weight: 600 !important;\n    font-size: 12px !important;\n    line-height: 16px !important;\n    color: var(--theme-success-500) !important;\n    text-align: center !important;\n}\nbody.theme-dark .figma-default-badge[data-v-721c2304] {\n    background: color-mix(in srgb, var(--theme-success-500) 15%, transparent) !important;\n}\nbody.theme-dark .figma-default-badge span[data-v-721c2304] {\n    color: var(--theme-success-500) !important;\n}\n.normal-seller-name[data-v-721c2304] {\n    color: var(--Colors-Shades-Neutral-N---950, var(--theme-neutral-950)) !important;\n}\nbody.theme-dark .normal-seller-name[data-v-721c2304] {\n    color: var(--theme-neutral-100) !important;\n}\n.db-panel-seller-name[data-v-721c2304] {\n    color: var(--Colors-Shades-Neutral-N---950, var(--theme-neutral-950)) !important;\n}\nbody.theme-dark .db-panel-seller-name[data-v-721c2304] {\n    color: var(--theme-neutral-50) !important;\n}\n.normal-truck-icon[data-v-721c2304] {\n    color: var(--theme-neutral-950) !important;\n}\nbody.theme-dark .normal-truck-icon[data-v-721c2304] {\n    color: var(--theme-neutral-100) !important;\n}\n.db-panel-truck-icon[data-v-721c2304] {\n    color: var(--theme-neutral-950) !important;\n}\nbody.theme-dark .db-panel-truck-icon[data-v-721c2304] {\n    color: var(--theme-neutral-50) !important;\n}\n.normal-delivery-title[data-v-721c2304] {\n    color: var(--theme-neutral-950) !important;\n}\nbody.theme-dark .normal-delivery-title[data-v-721c2304] {\n    color: var(--theme-neutral-100) !important;\n}\n.db-panel-delivery-title[data-v-721c2304] {\n    color: var(--theme-neutral-950) !important;\n}\nbody.theme-dark .db-panel-delivery-title[data-v-721c2304] {\n    color: var(--theme-neutral-50) !important;\n}\n\n/* Cancel order item modal (tidy header / body / footer) */\n.figma-cancel-modal-content[data-v-721c2304] {\n    display: flex;\n    flex-direction: column;\n    font-family: var(--ui-font);\n}\n.figma-cancel-modal-header[data-v-721c2304] {\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n    gap: 12px;\n    padding: 16px 20px;\n    border-bottom: 1px solid var(--ui-border);\n}\n.figma-cancel-modal-body[data-v-721c2304] {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    gap: 16px;\n    padding: 20px;\n}\n.figma-cancel-modal-footer[data-v-721c2304] {\n    display: flex;\n    justify-content: flex-end;\n    align-items: center;\n    gap: 8px;\n    padding: 14px 20px;\n    border-top: 1px solid var(--ui-border);\n    background: var(--ui-surface);\n}\n.figma-cancel-title[data-v-721c2304] {\n    color: var(--ui-heading);\n    font-size: 16px;\n    font-weight: 700;\n    line-height: 24px;\n}\n.figma-close-modal-btn[data-v-721c2304] {\n    width: 32px;\n    height: 32px;\n    display: inline-flex;\n    align-items: center;\n    justify-content: center;\n    border-radius: var(--ui-radius);\n    border: 1px solid var(--ui-border);\n    background: var(--ui-surface);\n    color: var(--ui-text-muted);\n    cursor: pointer;\n    transition: all 0.2s ease;\n}\n.figma-close-modal-btn[data-v-721c2304]:hover {\n    background: var(--ui-surface-muted);\n    color: var(--ui-heading);\n}\n.figma-warning-icon-wrapper[data-v-721c2304] {\n    width: 48px;\n    height: 48px;\n    border-radius: 50%;\n    background: var(--theme-error-50);\n    color: var(--theme-error-500);\n}\n.figma-cancel-heading[data-v-721c2304] {\n    font-size: 16px;\n    font-weight: 700;\n    line-height: 24px;\n    color: var(--ui-heading);\n    margin-bottom: 4px;\n}\n.figma-cancel-description[data-v-721c2304] {\n    font-size: 13px;\n    line-height: 20px;\n    color: var(--ui-text-muted);\n    margin: 0 auto;\n    max-width: 400px;\n}\n.figma-cancel-input-label[data-v-721c2304] {\n    display: block;\n    font-size: 13px;\n    font-weight: 600;\n    color: var(--ui-heading);\n    margin-bottom: 6px;\n}\n.figma-cancel-textarea[data-v-721c2304] {\n    width: 100%;\n    min-height: 110px;\n    border-radius: var(--ui-radius);\n    border: 1px solid var(--ui-border-strong);\n    background: var(--ui-surface);\n    color: var(--ui-text);\n    font-size: 13px;\n    padding: 10px 12px;\n    resize: vertical;\n}\n.figma-cancel-textarea[data-v-721c2304]:focus {\n    border-color: var(--theme-error-500);\n    outline: none;\n    box-shadow: 0 0 0 3px color-mix(in srgb, var(--theme-error-500) 15%, transparent);\n}\n.btn-figma-keep[data-v-721c2304],\n.btn-figma-confirm[data-v-721c2304] {\n    height: 38px;\n    padding: 0 16px;\n    border-radius: var(--ui-radius);\n    font-size: 13px;\n    font-weight: 600;\n    display: inline-flex;\n    align-items: center;\n    justify-content: center;\n    gap: 6px;\n}\n.btn-figma-keep[data-v-721c2304] {\n    border: 1px solid var(--ui-border-strong);\n    background: var(--ui-surface);\n    color: var(--ui-text);\n}\n.btn-figma-keep[data-v-721c2304]:hover {\n    background: var(--ui-surface-muted);\n    color: var(--ui-heading);\n}\n.btn-figma-confirm[data-v-721c2304] {\n    border: 1px solid var(--theme-error-500);\n    background: var(--theme-error-500);\n    color: var(--theme-neutral-50);\n}\n.btn-figma-confirm[data-v-721c2304]:hover {\n    background: var(--theme-error-600);\n    border-color: var(--theme-error-600);\n    color: var(--theme-neutral-50);\n}\n/* ===== Redesign: header actions, progress tracker, summary tiles, actions card ===== */\n.od-head-title[data-v-721c2304] {\n    min-width: 0;\n}\n.od-head-actions[data-v-721c2304] {\n    display: flex;\n    flex-wrap: wrap;\n    align-items: center;\n    gap: 8px;\n}\n.od-title-fa[data-v-721c2304] {\n    font-size: 15px;\n    width: 18px;\n    text-align: center;\n}\n\n/* Progress tracker (horizontal on >= 576px, vertical on phones) */\n.od-track-card .od-card-body[data-v-721c2304] {\n    padding: 20px 20px 18px;\n}\n.od-track[data-v-721c2304] {\n    list-style: none;\n    margin: 0;\n    padding: 0;\n    display: flex;\n    align-items: flex-start;\n    font-family: var(--ui-font);\n}\n.od-track-step[data-v-721c2304] {\n    position: relative;\n    flex: 1 1 0;\n    min-width: 0;\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    text-align: center;\n    gap: 8px;\n    padding: 0 4px;\n}\n\n/* connector from this step to the next one; coloured once this step is complete */\n.od-track-step[data-v-721c2304]:not(:last-child)::after {\n    content: '';\n    position: absolute;\n    top: 17px;\n    inset-inline-start: calc(50% + 24px);\n    inset-inline-end: calc(-50% + 24px);\n    height: 2px;\n    border-radius: 2px;\n    background: var(--ui-border-strong);\n}\n.od-track-step.is-done[data-v-721c2304]:not(:last-child)::after {\n    background: var(--theme-primary-500);\n}\n.od-track-dot[data-v-721c2304] {\n    position: relative;\n    z-index: 1;\n    width: 36px;\n    height: 36px;\n    flex-shrink: 0;\n    display: inline-flex;\n    align-items: center;\n    justify-content: center;\n    border-radius: 50%;\n    border: 1px solid var(--ui-border-strong);\n    background: var(--ui-surface);\n    color: var(--ui-text-subtle);\n    font-size: 14px;\n    transition: all .2s ease;\n}\n.od-track-step.is-done .od-track-dot[data-v-721c2304] {\n    background: var(--theme-primary-500);\n    border-color: var(--theme-primary-500);\n    color: #fff;\n}\n.od-track-step.is-current .od-track-dot[data-v-721c2304] {\n    background: var(--ui-primary-soft);\n    border: 2px solid var(--theme-primary-500);\n    color: var(--theme-primary-600);\n    box-shadow: 0 0 0 4px color-mix(in srgb, var(--theme-primary-500) 15%, transparent);\n}\n.od-track-step.is-error .od-track-dot[data-v-721c2304] {\n    background: var(--theme-error-500);\n    border-color: var(--theme-error-500);\n    color: #fff;\n    box-shadow: 0 0 0 4px color-mix(in srgb, var(--theme-error-500) 15%, transparent);\n}\n.od-track-step.is-warn .od-track-dot[data-v-721c2304] {\n    background: var(--theme-warn-500);\n    border-color: var(--theme-warn-500);\n    color: #fff;\n    box-shadow: 0 0 0 4px color-mix(in srgb, var(--theme-warn-500) 15%, transparent);\n}\n.od-track-text[data-v-721c2304] {\n    display: flex;\n    flex-direction: column;\n    gap: 2px;\n    min-width: 0;\n}\n.od-track-label[data-v-721c2304] {\n    font-size: 12px;\n    line-height: 16px;\n    font-weight: 600;\n    color: var(--ui-text-muted);\n    overflow-wrap: anywhere;\n}\n.od-track-step.is-done .od-track-label[data-v-721c2304] {\n    color: var(--ui-heading);\n}\n.od-track-step.is-current .od-track-label[data-v-721c2304] {\n    color: var(--theme-primary-600);\n    font-weight: 700;\n}\n.od-track-step.is-error .od-track-label[data-v-721c2304] {\n    color: var(--theme-error-600);\n    font-weight: 700;\n}\n.od-track-step.is-warn .od-track-label[data-v-721c2304] {\n    color: var(--theme-warn-700);\n    font-weight: 700;\n}\n.od-track-time[data-v-721c2304] {\n    font-size: 11px;\n    line-height: 15px;\n    color: var(--ui-text-subtle);\n}\n\n/* Summary tiles */\n.od-tiles[data-v-721c2304] {\n    margin-bottom: 24px;\n    justify-content: flex-start;\n}\n.od-tile[data-v-721c2304] {\n    height: 100% !important; /* equal-height tiles; global .figma-kpi-card-v2 sets height:auto !important */\n    min-height: 76px;\n    gap: 12px;\n    padding: 14px 16px !important; /* global .figma-kpi-card-v2 padding uses !important */\n    box-shadow: var(--ui-shadow);\n}\n.od-tile-icon[data-v-721c2304] {\n    width: 42px !important; /* global .figma-kpi-icon-v2 size uses !important */\n    height: 42px !important;\n    border-radius: 10px !important;\n}\n.od-tile-icon i[data-v-721c2304] {\n    font-size: 17px !important;\n}\n.od-tile-body[data-v-721c2304] {\n    display: flex;\n    flex-direction: column;\n    min-width: 0;\n    font-family: var(--ui-font);\n}\n.od-tile-label[data-v-721c2304] {\n    font-size: 12px;\n    line-height: 16px;\n    font-weight: 600;\n    color: var(--ui-text-muted);\n}\n.od-tile-value[data-v-721c2304] {\n    font-size: 18px;\n    line-height: 24px;\n    font-weight: 700;\n    color: var(--ui-heading);\n    overflow-wrap: anywhere;\n}\n.od-tile-value--text[data-v-721c2304] {\n    font-size: 14px;\n    line-height: 20px;\n}\n.od-tile-sub[data-v-721c2304] {\n    font-size: 11px;\n    line-height: 16px;\n    color: var(--ui-text-subtle);\n    overflow-wrap: anywhere;\n}\n\n/* Actions card (Order Status + Assign Delivery Partner, stacked) */\n.od-action-block + .od-action-block[data-v-721c2304] {\n    margin-top: 16px;\n    padding-top: 16px;\n    border-top: 1px solid var(--ui-border);\n}\n.od-action-label[data-v-721c2304] {\n    display: flex;\n    align-items: center;\n    margin-bottom: 8px;\n    font-family: var(--ui-font);\n    font-size: 13px;\n    font-weight: 600;\n    color: var(--ui-heading);\n}\n.od-stack-form[data-v-721c2304] {\n    flex-direction: column;\n    align-items: stretch;\n}\n.od-stack-form .form-select[data-v-721c2304] {\n    width: 100%;\n    height: 40px;\n}\n.od-stack-form .od-form-btn[data-v-721c2304] {\n    width: 100%;\n    height: 40px;\n}\n\n/* Contacts / maps */\n.od-person-text[data-v-721c2304] {\n    min-width: 0;\n}\n.od-contact-link[data-v-721c2304] {\n    color: var(--ui-heading);\n    text-decoration: none;\n    word-break: break-word;\n}\n.od-contact-link[data-v-721c2304]:hover {\n    color: var(--theme-primary-600);\n    text-decoration: underline;\n}\n.od-contact-link--sub[data-v-721c2304] {\n    color: var(--ui-text-muted);\n    font-weight: 400;\n}\n.od-map-btn[data-v-721c2304] {\n    display: inline-flex;\n    align-items: center;\n    gap: 6px;\n    height: 34px;\n    padding: 0 12px;\n    font-size: 12px;\n    font-weight: 600;\n    border-radius: var(--ui-radius);\n}\n\n/* Items table: cancelled rows are dimmed */\n.od-row-cancelled .od-product-img[data-v-721c2304] {\n    opacity: .55;\n}\n.od-row-cancelled .od-td-num[data-v-721c2304] {\n    color: var(--ui-text-subtle);\n    text-decoration: line-through;\n}\n@media (max-width: 991.98px) {\n.od-tile-value[data-v-721c2304] {\n        font-size: 16px;\n}\n}\n\n/* Phones: vertical tracker + items as compact rows */\n@media (max-width: 575.98px) {\n.od-head-actions[data-v-721c2304] {\n        width: 100%;\n}\n.od-track[data-v-721c2304] {\n        flex-direction: column;\n}\n.od-track-step[data-v-721c2304] {\n        flex-direction: row;\n        align-items: flex-start;\n        text-align: start;\n        gap: 12px;\n        padding: 0 0 18px;\n        width: 100%;\n}\n.od-track-step[data-v-721c2304]:last-child {\n        padding-bottom: 0;\n}\n.od-track-step[data-v-721c2304]:not(:last-child)::after {\n        top: 38px;\n        bottom: 2px;\n        inset-inline-start: 17px;\n        inset-inline-end: auto;\n        width: 2px;\n        height: auto;\n}\n.od-track-text[data-v-721c2304] {\n        padding-top: 8px;\n}\n.od-tile[data-v-721c2304] {\n        flex-direction: column;\n        align-items: flex-start !important; /* global kpi card centres items */\n        gap: 8px;\n        padding: 12px !important;\n}\n.od-tile-icon[data-v-721c2304] {\n        width: 34px !important;\n        height: 34px !important;\n}\n.od-tile-icon i[data-v-721c2304] {\n        font-size: 14px !important;\n}\n.od-items-table[data-v-721c2304] {\n        min-width: 0;\n}\n.od-items-table thead[data-v-721c2304] {\n        display: none;\n}\n.od-items-table tbody tr[data-v-721c2304] {\n        display: flex;\n        flex-wrap: wrap;\n        align-items: center;\n        gap: 6px 12px;\n        padding: 12px 16px;\n        border-bottom: 1px solid var(--ui-border);\n}\n.od-items-table tbody tr[data-v-721c2304]:last-child {\n        border-bottom: none;\n}\n.od-items-table tbody td[data-v-721c2304] {\n        display: block;\n        padding: 0 !important; /* overrides global .od-items-table first/last-child padding */\n        border: none;\n        text-align: start !important; /* table cells switch to stacked row layout */\n}\n.od-items-table tbody td.od-td-product[data-v-721c2304] {\n        flex: 1 1 100%;\n}\n.od-items-table tbody td.od-td-num[data-v-721c2304] {\n        flex: 1 1 0;\n        font-size: 13px;\n}\n.od-items-table tbody td.od-td-num[data-v-721c2304]::before {\n        content: attr(data-label);\n        display: block;\n        font-size: 11px;\n        line-height: 14px;\n        font-weight: 600;\n        text-transform: uppercase;\n        color: var(--ui-text-subtle);\n}\n.od-items-table tbody td.od-td-action[data-v-721c2304] {\n        flex: 0 0 auto;\n        margin-left: auto;\n}\n\n    /* Summary tiles: two per row (a broader phone rule elsewhere stretched them to full width) */\n#main .od-tiles > [class*=\"col\"][data-v-721c2304] {\n        flex: 0 0 50% !important;\n        max-width: 50% !important;\n}\n\n    /* Item rows: the shared #main table rule re-adds cell padding, which pushed the cancel button\n       onto its own line; keep price / qty / total / action on one row */\n#main .od-items-table tbody td[data-v-721c2304] {\n        padding: 0 !important;\n        border: 0 !important;\n}\n#main .od-items-table tbody td.od-td-num[data-v-721c2304] {\n        min-width: 0;\n}\n}\n\n/* Dark mode: the broad span/div text override above would flatten the tracker/tile text\n   hierarchy, so re-apply the token colours (needs !important to beat that rule). */\nbody.theme-dark .od-track-label[data-v-721c2304],\nbody.theme-dark .od-tile-label[data-v-721c2304] {\n    color: var(--theme-neutral-300) !important;\n}\nbody.theme-dark .od-track-time[data-v-721c2304],\nbody.theme-dark .od-tile-sub[data-v-721c2304] {\n    color: var(--theme-neutral-400) !important;\n}\nbody.theme-dark .od-track-step.is-done .od-track-label[data-v-721c2304],\nbody.theme-dark .od-tile-value[data-v-721c2304] {\n    color: var(--theme-neutral-100) !important;\n}\nbody.theme-dark .od-track-step.is-current .od-track-label[data-v-721c2304] {\n    color: var(--theme-primary-400) !important;\n}\nbody.theme-dark .od-track-step.is-error .od-track-label[data-v-721c2304] {\n    color: var(--theme-error-400) !important;\n}\nbody.theme-dark .od-track-step.is-warn .od-track-label[data-v-721c2304] {\n    color: var(--theme-warn-400) !important;\n}\nbody.theme-dark .od-track-dot[data-v-721c2304] {\n    background: var(--theme-neutral-800);\n    border-color: var(--theme-neutral-600);\n    color: var(--theme-neutral-400) !important; /* dot is a span: beats the broad span override */\n}\nbody.theme-dark .od-track-step.is-current .od-track-dot[data-v-721c2304] {\n    background: color-mix(in srgb, var(--theme-primary-500) 20%, transparent);\n    color: var(--theme-primary-400) !important;\n}\nbody.theme-dark .od-track-step.is-done .od-track-dot[data-v-721c2304],\nbody.theme-dark .od-track-step.is-error .od-track-dot[data-v-721c2304],\nbody.theme-dark .od-track-step.is-warn .od-track-dot[data-v-721c2304] {\n    color: #fff !important;\n}\nbody.theme-dark .od-track-step[data-v-721c2304]:not(:last-child)::after {\n    background: var(--theme-neutral-600);\n}\nbody.theme-dark .od-track-step.is-done[data-v-721c2304]:not(:last-child)::after {\n    background: var(--theme-primary-500);\n}\nbody.theme-dark .od-tile[data-v-721c2304] {\n    background: var(--theme-neutral-800) !important; /* global kpi card bg uses !important */\n    border-color: var(--theme-neutral-700) !important;\n}\nbody.theme-dark .od-action-label[data-v-721c2304],\nbody.theme-dark .od-contact-link[data-v-721c2304] {\n    color: var(--theme-neutral-100) !important;\n}\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Orders/ViewOrder.vue?vue&type=style&index=1&id=721c2304&lang=css":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Orders/ViewOrder.vue?vue&type=style&index=1&id=721c2304&lang=css ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
___CSS_LOADER_EXPORT___.push([module.id, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n/* Cancel item modal shell (b-modal renders outside the scoped DOM) */\n#cancel-item-modal .modal-dialog {\n    max-width: 480px;\n}\n#cancel-item-modal .modal-content {\n    border-radius: var(--ui-radius-lg);\n    border: 1px solid var(--ui-border);\n    background: var(--ui-surface);\n    box-shadow: var(--ui-shadow-lg);\n    overflow: hidden;\n}\n#cancel-item-modal .modal-body {\n    padding: 0;\n}\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/RiderLiveMap.vue?vue&type=style&index=0&id=6ea55c3e&scoped=true&lang=css":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/RiderLiveMap.vue?vue&type=style&index=0&id=6ea55c3e&scoped=true&lang=css ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_RiderLiveMap_vue_vue_type_style_index_0_id_6ea55c3e_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./RiderLiveMap.vue?vue&type=style&index=0&id=6ea55c3e&scoped=true&lang=css */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/RiderLiveMap.vue?vue&type=style&index=0&id=6ea55c3e&scoped=true&lang=css");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_RiderLiveMap_vue_vue_type_style_index_0_id_6ea55c3e_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_RiderLiveMap_vue_vue_type_style_index_0_id_6ea55c3e_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/RiderLiveMap.vue?vue&type=style&index=1&id=6ea55c3e&lang=css":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/RiderLiveMap.vue?vue&type=style&index=1&id=6ea55c3e&lang=css ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_RiderLiveMap_vue_vue_type_style_index_1_id_6ea55c3e_lang_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./RiderLiveMap.vue?vue&type=style&index=1&id=6ea55c3e&lang=css */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/RiderLiveMap.vue?vue&type=style&index=1&id=6ea55c3e&lang=css");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_RiderLiveMap_vue_vue_type_style_index_1_id_6ea55c3e_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_RiderLiveMap_vue_vue_type_style_index_1_id_6ea55c3e_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Orders/ViewOrder.vue?vue&type=style&index=0&id=721c2304&scoped=true&lang=css":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Orders/ViewOrder.vue?vue&type=style&index=0&id=721c2304&scoped=true&lang=css ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ViewOrder_vue_vue_type_style_index_0_id_721c2304_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./ViewOrder.vue?vue&type=style&index=0&id=721c2304&scoped=true&lang=css */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Orders/ViewOrder.vue?vue&type=style&index=0&id=721c2304&scoped=true&lang=css");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ViewOrder_vue_vue_type_style_index_0_id_721c2304_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ViewOrder_vue_vue_type_style_index_0_id_721c2304_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Orders/ViewOrder.vue?vue&type=style&index=1&id=721c2304&lang=css":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Orders/ViewOrder.vue?vue&type=style&index=1&id=721c2304&lang=css ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ViewOrder_vue_vue_type_style_index_1_id_721c2304_lang_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./ViewOrder.vue?vue&type=style&index=1&id=721c2304&lang=css */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Orders/ViewOrder.vue?vue&type=style&index=1&id=721c2304&lang=css");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ViewOrder_vue_vue_type_style_index_1_id_721c2304_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ViewOrder_vue_vue_type_style_index_1_id_721c2304_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./resources/js/components/RiderLiveMap.vue":
/*!**************************************************!*\
  !*** ./resources/js/components/RiderLiveMap.vue ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _RiderLiveMap_vue_vue_type_template_id_6ea55c3e_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./RiderLiveMap.vue?vue&type=template&id=6ea55c3e&scoped=true */ "./resources/js/components/RiderLiveMap.vue?vue&type=template&id=6ea55c3e&scoped=true");
/* harmony import */ var _RiderLiveMap_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./RiderLiveMap.vue?vue&type=script&lang=js */ "./resources/js/components/RiderLiveMap.vue?vue&type=script&lang=js");
/* harmony import */ var _RiderLiveMap_vue_vue_type_style_index_0_id_6ea55c3e_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./RiderLiveMap.vue?vue&type=style&index=0&id=6ea55c3e&scoped=true&lang=css */ "./resources/js/components/RiderLiveMap.vue?vue&type=style&index=0&id=6ea55c3e&scoped=true&lang=css");
/* harmony import */ var _RiderLiveMap_vue_vue_type_style_index_1_id_6ea55c3e_lang_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./RiderLiveMap.vue?vue&type=style&index=1&id=6ea55c3e&lang=css */ "./resources/js/components/RiderLiveMap.vue?vue&type=style&index=1&id=6ea55c3e&lang=css");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;



/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_4__["default"])(
  _RiderLiveMap_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _RiderLiveMap_vue_vue_type_template_id_6ea55c3e_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render,
  _RiderLiveMap_vue_vue_type_template_id_6ea55c3e_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "6ea55c3e",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/RiderLiveMap.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/views/Orders/ViewOrder.vue":
/*!*************************************************!*\
  !*** ./resources/js/views/Orders/ViewOrder.vue ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ViewOrder_vue_vue_type_template_id_721c2304_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ViewOrder.vue?vue&type=template&id=721c2304&scoped=true */ "./resources/js/views/Orders/ViewOrder.vue?vue&type=template&id=721c2304&scoped=true");
/* harmony import */ var _ViewOrder_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ViewOrder.vue?vue&type=script&lang=js */ "./resources/js/views/Orders/ViewOrder.vue?vue&type=script&lang=js");
/* harmony import */ var _ViewOrder_vue_vue_type_style_index_0_id_721c2304_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ViewOrder.vue?vue&type=style&index=0&id=721c2304&scoped=true&lang=css */ "./resources/js/views/Orders/ViewOrder.vue?vue&type=style&index=0&id=721c2304&scoped=true&lang=css");
/* harmony import */ var _ViewOrder_vue_vue_type_style_index_1_id_721c2304_lang_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ViewOrder.vue?vue&type=style&index=1&id=721c2304&lang=css */ "./resources/js/views/Orders/ViewOrder.vue?vue&type=style&index=1&id=721c2304&lang=css");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;



/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_4__["default"])(
  _ViewOrder_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _ViewOrder_vue_vue_type_template_id_721c2304_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render,
  _ViewOrder_vue_vue_type_template_id_721c2304_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "721c2304",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/Orders/ViewOrder.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/components/RiderLiveMap.vue?vue&type=script&lang=js":
/*!**************************************************************************!*\
  !*** ./resources/js/components/RiderLiveMap.vue?vue&type=script&lang=js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_RiderLiveMap_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./RiderLiveMap.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/RiderLiveMap.vue?vue&type=script&lang=js");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_RiderLiveMap_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/Orders/ViewOrder.vue?vue&type=script&lang=js":
/*!*************************************************************************!*\
  !*** ./resources/js/views/Orders/ViewOrder.vue?vue&type=script&lang=js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ViewOrder_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./ViewOrder.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Orders/ViewOrder.vue?vue&type=script&lang=js");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ViewOrder_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/RiderLiveMap.vue?vue&type=style&index=0&id=6ea55c3e&scoped=true&lang=css":
/*!**********************************************************************************************************!*\
  !*** ./resources/js/components/RiderLiveMap.vue?vue&type=style&index=0&id=6ea55c3e&scoped=true&lang=css ***!
  \**********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_RiderLiveMap_vue_vue_type_style_index_0_id_6ea55c3e_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/style-loader/dist/cjs.js!../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./RiderLiveMap.vue?vue&type=style&index=0&id=6ea55c3e&scoped=true&lang=css */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/RiderLiveMap.vue?vue&type=style&index=0&id=6ea55c3e&scoped=true&lang=css");


/***/ }),

/***/ "./resources/js/components/RiderLiveMap.vue?vue&type=style&index=1&id=6ea55c3e&lang=css":
/*!**********************************************************************************************!*\
  !*** ./resources/js/components/RiderLiveMap.vue?vue&type=style&index=1&id=6ea55c3e&lang=css ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_RiderLiveMap_vue_vue_type_style_index_1_id_6ea55c3e_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/style-loader/dist/cjs.js!../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./RiderLiveMap.vue?vue&type=style&index=1&id=6ea55c3e&lang=css */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/RiderLiveMap.vue?vue&type=style&index=1&id=6ea55c3e&lang=css");


/***/ }),

/***/ "./resources/js/views/Orders/ViewOrder.vue?vue&type=style&index=0&id=721c2304&scoped=true&lang=css":
/*!*********************************************************************************************************!*\
  !*** ./resources/js/views/Orders/ViewOrder.vue?vue&type=style&index=0&id=721c2304&scoped=true&lang=css ***!
  \*********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ViewOrder_vue_vue_type_style_index_0_id_721c2304_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/style-loader/dist/cjs.js!../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./ViewOrder.vue?vue&type=style&index=0&id=721c2304&scoped=true&lang=css */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Orders/ViewOrder.vue?vue&type=style&index=0&id=721c2304&scoped=true&lang=css");


/***/ }),

/***/ "./resources/js/views/Orders/ViewOrder.vue?vue&type=style&index=1&id=721c2304&lang=css":
/*!*********************************************************************************************!*\
  !*** ./resources/js/views/Orders/ViewOrder.vue?vue&type=style&index=1&id=721c2304&lang=css ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ViewOrder_vue_vue_type_style_index_1_id_721c2304_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/style-loader/dist/cjs.js!../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./ViewOrder.vue?vue&type=style&index=1&id=721c2304&lang=css */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Orders/ViewOrder.vue?vue&type=style&index=1&id=721c2304&lang=css");


/***/ }),

/***/ "./resources/js/components/RiderLiveMap.vue?vue&type=template&id=6ea55c3e&scoped=true":
/*!********************************************************************************************!*\
  !*** ./resources/js/components/RiderLiveMap.vue?vue&type=template&id=6ea55c3e&scoped=true ***!
  \********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_RiderLiveMap_vue_vue_type_template_id_6ea55c3e_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   staticRenderFns: () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_RiderLiveMap_vue_vue_type_template_id_6ea55c3e_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_RiderLiveMap_vue_vue_type_template_id_6ea55c3e_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./RiderLiveMap.vue?vue&type=template&id=6ea55c3e&scoped=true */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/RiderLiveMap.vue?vue&type=template&id=6ea55c3e&scoped=true");


/***/ }),

/***/ "./resources/js/views/Orders/ViewOrder.vue?vue&type=template&id=721c2304&scoped=true":
/*!*******************************************************************************************!*\
  !*** ./resources/js/views/Orders/ViewOrder.vue?vue&type=template&id=721c2304&scoped=true ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ViewOrder_vue_vue_type_template_id_721c2304_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   staticRenderFns: () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ViewOrder_vue_vue_type_template_id_721c2304_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ViewOrder_vue_vue_type_template_id_721c2304_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./ViewOrder.vue?vue&type=template&id=721c2304&scoped=true */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Orders/ViewOrder.vue?vue&type=template&id=721c2304&scoped=true");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/RiderLiveMap.vue?vue&type=template&id=6ea55c3e&scoped=true":
/*!***********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/RiderLiveMap.vue?vue&type=template&id=6ea55c3e&scoped=true ***!
  \***********************************************************************************************************************************************************************************************************************************/
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
    {
      staticClass: "card border mb-4 rider-live-map-card",
      staticStyle: {
        width: "100%",
        "border-radius": "16px",
        border: "1px solid var(--ui-border) !important",
        overflow: "hidden",
        padding: "0",
      },
    },
    [
      _c(
        "div",
        {
          staticStyle: {
            padding: "16px",
            "border-bottom": "1px solid var(--ui-border)",
            display: "flex",
            "align-items": "center",
            "justify-content": "space-between",
            gap: "12px",
            "flex-wrap": "wrap",
          },
        },
        [
          _c(
            "span",
            {
              staticStyle: {
                "font-family": "var(--ui-font)",
                "font-weight": "600",
                "font-size": "16px",
                "line-height": "24px",
              },
            },
            [
              _c("i", { staticClass: "bi bi-geo-alt me-2" }),
              _vm._v(
                _vm._s(_vm.__("live_tracking") || "Live Tracking") +
                  "\n        "
              ),
            ]
          ),
          _vm._v(" "),
          _vm.summary
            ? _c("span", { staticClass: "text-muted small" }, [
                _vm._v(_vm._s(_vm.summary)),
              ])
            : _vm._e(),
        ]
      ),
      _vm._v(" "),
      _c("div", { staticStyle: { position: "relative" } }, [
        _c("div", {
          ref: "mapEl",
          staticStyle: { width: "100%", height: "360px" },
        }),
        _vm._v(" "),
        _vm.message
          ? _c("div", { staticClass: "rider-live-map-message" }, [
              _vm._v(_vm._s(_vm.message)),
            ])
          : _vm._e(),
      ]),
    ]
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Orders/ViewOrder.vue?vue&type=template&id=721c2304&scoped=true":
/*!**********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Orders/ViewOrder.vue?vue&type=template&id=721c2304&scoped=true ***!
  \**********************************************************************************************************************************************************************************************************************************/
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
            "page-heading d-flex flex-wrap justify-content-between align-items-center gap-2 mb-4 view_order",
        },
        [
          _c("h3", { staticClass: "modern-page-title mb-0" }, [
            _vm._v(
              "\n            " + _vm._s(_vm.__("order_details")) + "\n        "
            ),
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
                      attrs: {
                        to: _vm.isSellerRoute
                          ? "/seller/dashboard"
                          : _vm.isDeliveryBoyRoute
                          ? "/delivery_boy/dashboard"
                          : "/dashboard",
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
                { staticClass: "breadcrumb-item" },
                [
                  _c(
                    "router-link",
                    {
                      attrs: {
                        to: _vm.isSellerRoute
                          ? "/seller/orders"
                          : _vm.isDeliveryBoyRoute
                          ? "/delivery_boy/orders"
                          : "/orders",
                      },
                    },
                    [_vm._v(_vm._s(_vm.__("orders")))]
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
                [_vm._v(_vm._s(_vm.__("order_details")))]
              ),
            ]),
          ]),
        ]
      ),
      _vm._v(" "),
      _vm.order
        ? _c("div", { staticClass: "order-details-wrapper od-page" }, [
            _c("div", { staticClass: "mb-4 order-header-card" }, [
              _c("div", { staticClass: "od-header-top" }, [
                _c(
                  "div",
                  {
                    staticClass:
                      "d-flex flex-wrap align-items-center gap-2 od-head-title",
                  },
                  [
                    _c(
                      "h2",
                      {
                        staticClass: "figma-text-xl-semibold od-order-id mb-0",
                      },
                      [
                        _vm._v(
                          "\n                        " +
                            _vm._s(_vm.__("Order") || "Order") +
                            " #" +
                            _vm._s(_vm.order.id)
                        ),
                      ]
                    ),
                    _vm._v(" "),
                    _c(
                      "span",
                      {
                        staticClass: "figma-status-pill",
                        class: _vm.getStatusBadgeClass(_vm.order.active_status),
                      },
                      [
                        _vm._v(
                          "\n                        " +
                            _vm._s(
                              _vm.getStatusLabelById(_vm.order.active_status)
                            ) +
                            "\n                    "
                        ),
                      ]
                    ),
                    _vm._v(" "),
                    _vm.order.wallet_balance > 0
                      ? _c(
                          "span",
                          {
                            staticClass:
                              "figma-status-pill status-wallet od-wallet-pill",
                          },
                          [
                            _vm._v(
                              "\n                        " +
                                _vm._s(
                                  _vm.__("paid_via_wallet") || "Paid via Wallet"
                                ) +
                                "\n                    "
                            ),
                          ]
                        )
                      : _vm._e(),
                  ]
                ),
                _vm._v(" "),
                _c("div", { staticClass: "od-head-actions" }, [
                  _c(
                    "button",
                    {
                      staticClass: "btn btn-outline-primary od-print-btn",
                      on: { click: _vm.downloadInvoice },
                    },
                    [
                      _c("i", { staticClass: "fa fa-print" }),
                      _vm._v(
                        " " +
                          _vm._s(_vm.__("Print Order") || "Print Order") +
                          "\n                    "
                      ),
                    ]
                  ),
                ]),
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "order-meta-bar" }, [
                _c("div", { staticClass: "order-meta-date" }, [
                  _c("i", { staticClass: "far fa-calendar-alt" }),
                  _vm._v(" "),
                  _c("span", { staticClass: "od-meta-label" }, [
                    _vm._v(_vm._s(_vm.__("date")) + " :"),
                  ]),
                  _vm._v(" "),
                  _c("span", { staticClass: "od-meta-value" }, [
                    _vm._v(_vm._s(_vm.order.orders_created_at)),
                  ]),
                ]),
                _vm._v(" "),
                _vm.order_items && _vm.order_items.length > 0
                  ? _c(
                      "div",
                      { staticClass: "order-meta-seller" },
                      [
                        _c("i", { staticClass: "fas fa-store" }),
                        _vm._v(" "),
                        _c("span", { staticClass: "od-meta-label" }, [
                          _vm._v(_vm._s(_vm.__("seller")) + " :"),
                        ]),
                        _vm._v(" "),
                        _vm.login_user.role.name === "Admin" ||
                        _vm.login_user.role.name === "Super Admin"
                          ? [
                              _c(
                                "router-link",
                                {
                                  staticClass: "od-seller-link",
                                  attrs: {
                                    to: {
                                      name: "EditSeller",
                                      params: {
                                        id:
                                          _vm.order_items[0].seller_id ||
                                          _vm.order.seller_id,
                                      },
                                    },
                                  },
                                },
                                [
                                  _vm._v(
                                    "\n                            " +
                                      _vm._s(_vm.order_items[0].seller_name) +
                                      "\n                            "
                                  ),
                                  _c("i", {
                                    staticClass: "fa fa-external-link-alt",
                                  }),
                                ]
                              ),
                            ]
                          : [
                              _c(
                                "span",
                                {
                                  staticClass: "od-meta-value",
                                  class:
                                    _vm.login_user.role.name === "Delivery Boy"
                                      ? "db-panel-seller-name"
                                      : "normal-seller-name",
                                },
                                [
                                  _vm._v(
                                    "\n                            " +
                                      _vm._s(_vm.order_items[0].seller_name) +
                                      "\n                        "
                                  ),
                                ]
                              ),
                            ],
                      ],
                      2
                    )
                  : _vm._e(),
                _vm._v(" "),
                _vm.paymentMethodLabel
                  ? _c("div", { staticClass: "order-meta-date" }, [
                      _c("i", { staticClass: "far fa-credit-card" }),
                      _vm._v(" "),
                      _c("span", { staticClass: "od-meta-label" }, [
                        _vm._v(_vm._s(_vm.__("payment_method")) + " :"),
                      ]),
                      _vm._v(" "),
                      _c("span", { staticClass: "od-meta-value" }, [
                        _vm._v(_vm._s(_vm.paymentMethodLabel)),
                      ]),
                    ])
                  : _vm._e(),
                _vm._v(" "),
                _vm.orderTypeLabel
                  ? _c("div", { staticClass: "order-meta-date" }, [
                      _c("i", { staticClass: "fas fa-truck" }),
                      _vm._v(" "),
                      _c("span", { staticClass: "od-meta-label" }, [
                        _vm._v(
                          _vm._s(_vm.tr("delivery_type", "Delivery Type")) +
                            " :"
                        ),
                      ]),
                      _vm._v(" "),
                      _c("span", { staticClass: "od-meta-value" }, [
                        _vm._v(_vm._s(_vm.orderTypeLabel)),
                      ]),
                    ])
                  : _vm._e(),
              ]),
            ]),
            _vm._v(" "),
            _vm.trackerSteps.length
              ? _c("div", { staticClass: "card od-card od-track-card" }, [
                  _c(
                    "div",
                    { staticClass: "od-card-header justify-content-between" },
                    [
                      _c("h5", { staticClass: "od-card-title" }, [
                        _c("i", {
                          staticClass:
                            "fas fa-route me-2 text-primary od-title-fa",
                        }),
                        _vm._v(
                          "\n                    " +
                            _vm._s(_vm.tr("order_progress", "Order Progress")) +
                            "\n                "
                        ),
                      ]),
                    ]
                  ),
                  _vm._v(" "),
                  _c("div", { staticClass: "card-body od-card-body" }, [
                    _c(
                      "ol",
                      { staticClass: "od-track" },
                      _vm._l(_vm.trackerSteps, function (step) {
                        return _c(
                          "li",
                          {
                            key: step.key,
                            staticClass: "od-track-step",
                            class: "is-" + step.state,
                          },
                          [
                            _c(
                              "span",
                              {
                                staticClass: "od-track-dot",
                                attrs: { "aria-hidden": "true" },
                              },
                              [
                                _c("i", {
                                  class:
                                    step.state === "done"
                                      ? "fas fa-check"
                                      : step.icon,
                                }),
                              ]
                            ),
                            _vm._v(" "),
                            _c("span", { staticClass: "od-track-text" }, [
                              _c("span", { staticClass: "od-track-label" }, [
                                _vm._v(_vm._s(step.label)),
                              ]),
                              _vm._v(" "),
                              step.time
                                ? _c("span", { staticClass: "od-track-time" }, [
                                    _vm._v(_vm._s(step.time)),
                                  ])
                                : _vm._e(),
                            ]),
                          ]
                        )
                      }),
                      0
                    ),
                  ]),
                ])
              : _vm._e(),
            _vm._v(" "),
            _c("div", { staticClass: "row g-3 od-tiles" }, [
              _c("div", { staticClass: "col-6 col-md-3" }, [
                _c("div", { staticClass: "figma-kpi-card-v2 od-tile" }, [
                  _vm._m(0),
                  _vm._v(" "),
                  _c("div", { staticClass: "od-tile-body" }, [
                    _c("span", { staticClass: "od-tile-label" }, [
                      _vm._v(_vm._s(_vm.__("Items") || "Items")),
                    ]),
                    _vm._v(" "),
                    _c("span", { staticClass: "od-tile-value" }, [
                      _vm._v(_vm._s(_vm.order_items.length)),
                    ]),
                    _vm._v(" "),
                    _c("span", { staticClass: "od-tile-sub" }, [
                      _vm._v(
                        _vm._s(_vm.__("quantity")) +
                          ": " +
                          _vm._s(_vm.totalQuantity)
                      ),
                    ]),
                  ]),
                ]),
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "col-6 col-md-3" }, [
                _c("div", { staticClass: "figma-kpi-card-v2 od-tile" }, [
                  _vm._m(1),
                  _vm._v(" "),
                  _c("div", { staticClass: "od-tile-body" }, [
                    _c("span", { staticClass: "od-tile-label" }, [
                      _vm._v(_vm._s(_vm.__("payment_method"))),
                    ]),
                    _vm._v(" "),
                    _c(
                      "span",
                      { staticClass: "od-tile-value od-tile-value--text" },
                      [_vm._v(_vm._s(_vm.paymentMethodLabel || "N/A"))]
                    ),
                    _vm._v(" "),
                    _vm.order.wallet_balance > 0
                      ? _c("span", { staticClass: "od-tile-sub" }, [
                          _vm._v(
                            _vm._s(_vm.__("Wallet Used") || "Wallet Used") +
                              ": " +
                              _vm._s(_vm.$currency) +
                              _vm._s(_vm.order.wallet_balance)
                          ),
                        ])
                      : _vm._e(),
                  ]),
                ]),
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "col-6 col-md-3" }, [
                _c("div", { staticClass: "figma-kpi-card-v2 od-tile" }, [
                  _c(
                    "div",
                    {
                      staticClass:
                        "figma-kpi-icon-v2 bg-stat-orange od-tile-icon",
                    },
                    [
                      _c("i", {
                        class:
                          _vm.order.order_type === "selfpickup"
                            ? "fas fa-store"
                            : "fas fa-truck",
                      }),
                    ]
                  ),
                  _vm._v(" "),
                  _c("div", { staticClass: "od-tile-body" }, [
                    _c("span", { staticClass: "od-tile-label" }, [
                      _vm._v(
                        _vm._s(
                          _vm.hasDeliveryTime
                            ? _vm.__("Delivery Time & Date") ||
                                "Delivery Time & Date"
                            : _vm.tr("delivery_type", "Delivery Type")
                        )
                      ),
                    ]),
                    _vm._v(" "),
                    _c(
                      "span",
                      { staticClass: "od-tile-value od-tile-value--text" },
                      [
                        _vm._v(
                          _vm._s(
                            _vm.hasDeliveryTime
                              ? _vm.order.delivery_time
                              : _vm.orderTypeLabel || "N/A"
                          )
                        ),
                      ]
                    ),
                    _vm._v(" "),
                    _vm.hasDeliveryTime && _vm.orderTypeLabel
                      ? _c("span", { staticClass: "od-tile-sub" }, [
                          _vm._v(_vm._s(_vm.orderTypeLabel)),
                        ])
                      : _vm._e(),
                  ]),
                ]),
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "col-6 col-md-3" }, [
                _c("div", { staticClass: "figma-kpi-card-v2 od-tile" }, [
                  _vm._m(2),
                  _vm._v(" "),
                  _c("div", { staticClass: "od-tile-body" }, [
                    _c("span", { staticClass: "od-tile-label" }, [
                      _vm._v(
                        _vm._s(_vm.__("Payable Total") || "Payable Total")
                      ),
                    ]),
                    _vm._v(" "),
                    _c("span", { staticClass: "od-tile-value" }, [
                      _vm._v(
                        _vm._s(_vm.$currency) +
                          _vm._s(_vm.order.remaining_final)
                      ),
                    ]),
                  ]),
                ]),
              ]),
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "row g-4" }, [
              _c(
                "div",
                { staticClass: "col-lg-8" },
                [
                  _c("div", { staticClass: "card od-card" }, [
                    _c(
                      "div",
                      { staticClass: "od-card-header justify-content-between" },
                      [
                        _c(
                          "h5",
                          { staticClass: "od-card-title" },
                          [
                            _c("base-icon", {
                              staticClass: "me-2 text-primary",
                              attrs: {
                                name: "Package",
                                width: "18",
                                height: "18",
                              },
                            }),
                            _vm._v(
                              "\n                            " +
                                _vm._s(_vm.__("Items Ordered")) +
                                "\n                        "
                            ),
                          ],
                          1
                        ),
                        _vm._v(" "),
                        _c("span", { staticClass: "item-count-badge" }, [
                          _vm._v(
                            _vm._s(_vm.order_items.length) +
                              " " +
                              _vm._s(_vm.__("Items") || "Items")
                          ),
                        ]),
                      ]
                    ),
                    _vm._v(" "),
                    _c("div", { staticClass: "card-body p-0" }, [
                      _c(
                        "div",
                        { staticClass: "table-responsive od-table-wrap" },
                        [
                          _c(
                            "table",
                            {
                              staticClass:
                                "table align-middle mb-0 od-items-table",
                            },
                            [
                              _c("thead", [
                                _c("tr", [
                                  _c("th", { staticClass: "text-start" }, [
                                    _vm._v(_vm._s(_vm.__("product_name"))),
                                  ]),
                                  _vm._v(" "),
                                  _c("th", { staticClass: "text-center" }, [
                                    _vm._v(_vm._s(_vm.__("price"))),
                                  ]),
                                  _vm._v(" "),
                                  _c("th", { staticClass: "text-center" }, [
                                    _vm._v(_vm._s(_vm.__("quantity"))),
                                  ]),
                                  _vm._v(" "),
                                  _c("th", { staticClass: "text-end" }, [
                                    _vm._v(_vm._s(_vm.__("total"))),
                                  ]),
                                  _vm._v(" "),
                                  _vm.login_user &&
                                  (_vm.login_user.role.name === "Admin" ||
                                    _vm.login_user.role.name === "Super Admin")
                                    ? _c("th", { staticClass: "text-center" }, [
                                        _vm._v(
                                          "\n                                            " +
                                            _vm._s(_vm.__("Action") || "Action")
                                        ),
                                      ])
                                    : _vm._e(),
                                ]),
                              ]),
                              _vm._v(" "),
                              _c(
                                "tbody",
                                _vm._l(_vm.order_items, function (item) {
                                  return _c(
                                    "tr",
                                    {
                                      key: item.id,
                                      class: {
                                        "od-row-cancelled":
                                          Number(item.active_status) === 7,
                                      },
                                    },
                                    [
                                      _c(
                                        "td",
                                        {
                                          staticClass:
                                            "text-start od-td-product",
                                        },
                                        [
                                          _c(
                                            "div",
                                            { staticClass: "od-product" },
                                            [
                                              _c("img", {
                                                staticClass: "od-product-img",
                                                attrs: { src: item.image },
                                              }),
                                              _vm._v(" "),
                                              _c(
                                                "div",
                                                {
                                                  staticClass:
                                                    "od-product-info",
                                                },
                                                [
                                                  _c(
                                                    "div",
                                                    {
                                                      staticClass:
                                                        "od-product-name",
                                                    },
                                                    [
                                                      _vm._v(
                                                        _vm._s(
                                                          item.product_name
                                                        )
                                                      ),
                                                    ]
                                                  ),
                                                  _vm._v(" "),
                                                  _c(
                                                    "div",
                                                    {
                                                      staticClass:
                                                        "od-product-sub",
                                                    },
                                                    [
                                                      _vm._v(
                                                        "\n                                                        " +
                                                          _vm._s(
                                                            _vm.__("Variant") ||
                                                              "Variant"
                                                          ) +
                                                          ": " +
                                                          _vm._s(
                                                            item.variant_name
                                                          )
                                                      ),
                                                    ]
                                                  ),
                                                  _vm._v(" "),
                                                  item.selected_addons &&
                                                  item.selected_addons.length >
                                                    0
                                                    ? _c(
                                                        "div",
                                                        {
                                                          staticClass:
                                                            "od-product-sub",
                                                        },
                                                        [
                                                          _vm._v(
                                                            "\n                                                        " +
                                                              _vm._s(
                                                                _vm.__(
                                                                  "addons"
                                                                ) || "Addons"
                                                              ) +
                                                              ":\n                                                        " +
                                                              _vm._s(
                                                                item.selected_addons
                                                                  .map(
                                                                    function (
                                                                      a
                                                                    ) {
                                                                      return a.name
                                                                    }
                                                                  )
                                                                  .join(", ")
                                                              ) +
                                                              "\n                                                        (" +
                                                              _vm._s(
                                                                _vm.$currency
                                                              ) +
                                                              _vm._s(
                                                                item.addon_price
                                                              ) +
                                                              ")"
                                                          ),
                                                        ]
                                                      )
                                                    : _vm._e(),
                                                  _vm._v(" "),
                                                  item.prescriptions &&
                                                  item.prescriptions.length > 0
                                                    ? _c(
                                                        "div",
                                                        {
                                                          staticClass:
                                                            "d-flex flex-wrap gap-1 mt-2",
                                                        },
                                                        _vm._l(
                                                          item.prescriptions,
                                                          function (
                                                            pUrl,
                                                            pIdx
                                                          ) {
                                                            return _c(
                                                              "div",
                                                              {
                                                                key: pIdx,
                                                                staticClass:
                                                                  "od-prescription-thumb position-relative border rounded p-1",
                                                                on: {
                                                                  click:
                                                                    function (
                                                                      $event
                                                                    ) {
                                                                      return _vm.showPrescription(
                                                                        pUrl
                                                                      )
                                                                    },
                                                                },
                                                              },
                                                              [
                                                                _c("img", {
                                                                  staticClass:
                                                                    "w-100 h-100 object-fit-cover rounded",
                                                                  attrs: {
                                                                    src: pUrl,
                                                                  },
                                                                }),
                                                              ]
                                                            )
                                                          }
                                                        ),
                                                        0
                                                      )
                                                    : _vm._e(),
                                                  _vm._v(" "),
                                                  item.cancellation_reason
                                                    ? _c(
                                                        "div",
                                                        {
                                                          staticClass:
                                                            "od-product-cancel",
                                                        },
                                                        [
                                                          _vm._v(
                                                            "\n                                                        " +
                                                              _vm._s(
                                                                item.cancellation_reason
                                                                  .toLowerCase()
                                                                  .includes(
                                                                    "cancelled by"
                                                                  )
                                                                  ? item.cancellation_reason
                                                                  : (_vm.__(
                                                                      "cancelled_by_user"
                                                                    ) ||
                                                                      "Cancelled by user") +
                                                                      ": " +
                                                                      item.cancellation_reason
                                                              )
                                                          ),
                                                        ]
                                                      )
                                                    : _vm._e(),
                                                ]
                                              ),
                                            ]
                                          ),
                                        ]
                                      ),
                                      _vm._v(" "),
                                      _c(
                                        "td",
                                        {
                                          staticClass: "text-center od-td-num",
                                          attrs: {
                                            "data-label": _vm.__("price"),
                                          },
                                        },
                                        [
                                          _vm._v(
                                            _vm._s(_vm.$currency) +
                                              _vm._s(item.price)
                                          ),
                                        ]
                                      ),
                                      _vm._v(" "),
                                      _c(
                                        "td",
                                        {
                                          staticClass: "text-center od-td-num",
                                          attrs: {
                                            "data-label": _vm.__("quantity"),
                                          },
                                        },
                                        [_vm._v(_vm._s(item.quantity))]
                                      ),
                                      _vm._v(" "),
                                      _c(
                                        "td",
                                        {
                                          staticClass:
                                            "text-end od-cell-strong od-td-num",
                                          attrs: {
                                            "data-label": _vm.__("total"),
                                          },
                                        },
                                        [
                                          _vm._v(
                                            _vm._s(_vm.$currency) +
                                              _vm._s(item.sub_total)
                                          ),
                                        ]
                                      ),
                                      _vm._v(" "),
                                      _vm.login_user &&
                                      (_vm.login_user.role.name === "Admin" ||
                                        _vm.login_user.role.name ===
                                          "Super Admin")
                                        ? _c(
                                            "td",
                                            {
                                              staticClass:
                                                "text-center od-td-action",
                                            },
                                            [
                                              Number(item.active_status) === 7
                                                ? _c(
                                                    "span",
                                                    {
                                                      staticClass:
                                                        "od-item-cancelled",
                                                    },
                                                    [
                                                      _vm._v(
                                                        "\n                                                " +
                                                          _vm._s(
                                                            _vm.__(
                                                              "cancelled"
                                                            ) || "Cancelled"
                                                          ) +
                                                          "\n                                            "
                                                      ),
                                                    ]
                                                  )
                                                : _vm.canCancelItem(item)
                                                ? _c(
                                                    "button",
                                                    {
                                                      staticClass:
                                                        "btn p-0 d-inline-flex align-items-center justify-content-center cancel-item-btn",
                                                      attrs: {
                                                        "aria-label":
                                                          _vm.__(
                                                            "cancel_item"
                                                          ) || "Cancel Item",
                                                      },
                                                      on: {
                                                        click: function (
                                                          $event
                                                        ) {
                                                          return _vm.cancelOrderItem(
                                                            item
                                                          )
                                                        },
                                                      },
                                                    },
                                                    [
                                                      _c("base-icon", {
                                                        staticClass:
                                                          "od-cancel-icon",
                                                        attrs: {
                                                          name: "order cancel",
                                                          width: "12.5",
                                                          height: "12.5",
                                                          useCurrentColor: "",
                                                        },
                                                      }),
                                                    ],
                                                    1
                                                  )
                                                : _vm._e(),
                                            ]
                                          )
                                        : _vm._e(),
                                    ]
                                  )
                                }),
                                0
                              ),
                            ]
                          ),
                        ]
                      ),
                    ]),
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "card od-card" }, [
                    _c("div", { staticClass: "od-card-header" }, [
                      _c(
                        "h5",
                        { staticClass: "od-card-title" },
                        [
                          _c("base-icon", {
                            staticClass: "me-2",
                            attrs: {
                              name: "Receipt",
                              width: "18",
                              height: "18",
                            },
                          }),
                          _vm._v(
                            "\n                            " +
                              _vm._s(_vm.__("Billing Summary")) +
                              "\n                        "
                          ),
                        ],
                        1
                      ),
                    ]),
                    _vm._v(" "),
                    _c("div", { staticClass: "card-body od-card-body" }, [
                      _c("div", { staticClass: "billing-list" }, [
                        _c(
                          "div",
                          { staticClass: "od-sum-row od-sum-row--sub" },
                          [
                            _c("span", [
                              _vm._v(
                                _vm._s(_vm.__("Subtotal") || "Subtotal") +
                                  "\n                                    (" +
                                  _vm._s(_vm.activeOrderItems.length) +
                                  " " +
                                  _vm._s(_vm.__("items") || "items") +
                                  ")"
                              ),
                            ]),
                            _vm._v(" "),
                            _c("span", [
                              _vm._v(
                                _vm._s(_vm.$currency) +
                                  _vm._s(_vm.activeSubtotal.toFixed(2))
                              ),
                            ]),
                          ]
                        ),
                        _vm._v(" "),
                        _vm.activeAddonTotal > 0
                          ? _c("div", { staticClass: "od-sum-row" }, [
                              _c("span", [
                                _vm._v(_vm._s(_vm.__("addons") || "Addons")),
                              ]),
                              _vm._v(" "),
                              _c("span", { staticClass: "od-sum-val" }, [
                                _vm._v(
                                  _vm._s(_vm.$currency) +
                                    _vm._s(_vm.activeAddonTotal.toFixed(2))
                                ),
                              ]),
                            ])
                          : _vm._e(),
                        _vm._v(" "),
                        _vm.order.discount > 0
                          ? _c(
                              "div",
                              { staticClass: "od-sum-row od-sum-row--error" },
                              [
                                _c("span", [
                                  _vm._v(
                                    _vm._s(_vm.__("Discount") || "Discount") +
                                      " (" +
                                      _vm._s(_vm.order.discount) +
                                      "%)"
                                  ),
                                ]),
                                _vm._v(" "),
                                _c("span", { staticClass: "od-sum-val" }, [
                                  _vm._v(
                                    "-" +
                                      _vm._s(_vm.$currency) +
                                      _vm._s(_vm.discount_in_rupees)
                                  ),
                                ]),
                              ]
                            )
                          : _vm._e(),
                        _vm._v(" "),
                        _c("div", { staticClass: "od-sum-row" }, [
                          _c("span", [
                            _vm._v(
                              _vm._s(
                                _vm.__("Delivery Charges") || "Delivery Charges"
                              )
                            ),
                          ]),
                          _vm._v(" "),
                          _vm.order.delivery_charge == 0
                            ? _c("span", { staticClass: "od-sum-val" }, [
                                _vm._v(_vm._s(_vm.__("Free") || "Free")),
                              ])
                            : _c("span", { staticClass: "od-sum-val" }, [
                                _vm._v(
                                  _vm._s(_vm.$currency) +
                                    _vm._s(_vm.order.delivery_charge)
                                ),
                              ]),
                        ]),
                        _vm._v(" "),
                        _vm.getAdditionalChargesTotal(
                          _vm.order.additional_charges
                        ) > 0
                          ? _c("div", { staticClass: "od-sum-row" }, [
                              _c("span", [
                                _vm._v(
                                  _vm._s(
                                    _vm.__("Additional Charges") ||
                                      "Additional Charges"
                                  )
                                ),
                              ]),
                              _vm._v(" "),
                              _c("span", { staticClass: "od-sum-val" }, [
                                _vm._v(
                                  _vm._s(_vm.$currency) +
                                    _vm._s(
                                      _vm.getAdditionalChargesTotal(
                                        _vm.order.additional_charges
                                      )
                                    )
                                ),
                              ]),
                            ])
                          : _vm._e(),
                        _vm._v(" "),
                        _vm.order.promo_discount > 0
                          ? _c("div", { staticClass: "od-sum-row" }, [
                              _c("span", [
                                _vm._v(
                                  _vm._s(_vm.__("Promo Code") || "Promo Code")
                                ),
                              ]),
                              _vm._v(" "),
                              _c("span", { staticClass: "od-sum-val" }, [
                                _vm._v(_vm._s(_vm.order.promo_code)),
                              ]),
                            ])
                          : _vm._e(),
                        _vm._v(" "),
                        _vm.order.promo_discount > 0
                          ? _c("div", { staticClass: "od-sum-row" }, [
                              _c("span", [
                                _vm._v(
                                  _vm._s(
                                    _vm.__("Promo Discount") || "Promo Discount"
                                  )
                                ),
                              ]),
                              _vm._v(" "),
                              _c("span", { staticClass: "od-sum-val" }, [
                                _vm._v(
                                  "-" +
                                    _vm._s(_vm.$currency) +
                                    _vm._s(_vm.order.promo_discount)
                                ),
                              ]),
                            ])
                          : _vm._e(),
                        _vm._v(" "),
                        _vm.order.wallet_balance > 0
                          ? _c(
                              "div",
                              { staticClass: "od-sum-row od-sum-row--success" },
                              [
                                _c("span", [
                                  _vm._v(
                                    _vm._s(
                                      _vm.__("Wallet Used") || "Wallet Used"
                                    )
                                  ),
                                ]),
                                _vm._v(" "),
                                _c("span", { staticClass: "od-sum-val" }, [
                                  _vm._v(
                                    "-" +
                                      _vm._s(_vm.$currency) +
                                      _vm._s(_vm.order.wallet_balance)
                                  ),
                                ]),
                              ]
                            )
                          : _vm._e(),
                        _vm._v(" "),
                        _c(
                          "div",
                          {
                            staticClass:
                              "d-flex justify-content-between align-items-center payable-total-box",
                          },
                          [
                            _c("span", [
                              _vm._v(
                                _vm._s(
                                  _vm.__("Payable Total") || "Payable Total"
                                )
                              ),
                            ]),
                            _vm._v(" "),
                            _c("span", [
                              _vm._v(
                                _vm._s(_vm.$currency) +
                                  _vm._s(_vm.order.remaining_final)
                              ),
                            ]),
                          ]
                        ),
                      ]),
                    ]),
                  ]),
                  _vm._v(" "),
                  _vm.isDeliveryBoyRole &&
                  Number(_vm.order.active_status) === 5 &&
                  _vm.order.id
                    ? _c("rider-live-map", {
                        attrs: { "order-id": _vm.order.id },
                      })
                    : _vm._e(),
                ],
                1
              ),
              _vm._v(" "),
              _c("div", { staticClass: "col-lg-4" }, [
                _c("div", { staticClass: "card od-card od-actions-card" }, [
                  _c("div", { staticClass: "od-card-header" }, [
                    _c("h5", { staticClass: "od-card-title" }, [
                      _c("i", {
                        staticClass:
                          "fas fa-sliders-h me-2 text-primary od-title-fa",
                      }),
                      _vm._v(
                        "\n                            " +
                          _vm._s(_vm.__("actions")) +
                          "\n                        "
                      ),
                    ]),
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "card-body od-card-body" }, [
                    _c(
                      "div",
                      {
                        staticClass: "od-action-block",
                        attrs: { id: "assign_partner_section" },
                      },
                      [
                        _c(
                          "label",
                          { staticClass: "od-action-label" },
                          [
                            _c("base-icon", {
                              staticClass: "me-2",
                              attrs: {
                                name: "CheckCircle",
                                width: "16",
                                height: "16",
                              },
                            }),
                            _vm._v(
                              "\n                                " +
                                _vm._s(
                                  _vm.__("order_status") || "Order Status"
                                ) +
                                "\n                            "
                            ),
                          ],
                          1
                        ),
                        _vm._v(" "),
                        _c(
                          "form",
                          {
                            staticClass: "od-inline-form od-stack-form",
                            on: {
                              submit: function ($event) {
                                $event.preventDefault()
                                return _vm.updateStatus.apply(null, arguments)
                              },
                            },
                          },
                          [
                            _c(
                              "select",
                              {
                                directives: [
                                  {
                                    name: "model",
                                    rawName: "v-model",
                                    value: _vm.order_status_id,
                                    expression: "order_status_id",
                                  },
                                ],
                                staticClass: "form-select",
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
                                    _vm.order_status_id = $event.target.multiple
                                      ? $$selectedVal
                                      : $$selectedVal[0]
                                  },
                                },
                              },
                              [
                                _c("option", { attrs: { value: "" } }, [
                                  _vm._v(
                                    _vm._s(
                                      _vm.__("choose_status") || "Choose Status"
                                    )
                                  ),
                                ]),
                                _vm._v(" "),
                                _vm._l(_vm.statuses, function (status) {
                                  return _c(
                                    "option",
                                    { domProps: { value: status.id } },
                                    [
                                      _vm._v(
                                        _vm._s(
                                          _vm.getStatusDisplayName(status)
                                        ) +
                                          "\n                                    "
                                      ),
                                    ]
                                  )
                                }),
                              ],
                              2
                            ),
                            _vm._v(" "),
                            _c(
                              "button",
                              {
                                staticClass: "btn btn-primary od-form-btn",
                                attrs: {
                                  type: "submit",
                                  disabled:
                                    _vm.order_status_id === "" ||
                                    _vm.isLoadingUstatus,
                                },
                              },
                              [
                                _vm._v(
                                  "\n                                    " +
                                    _vm._s(_vm.__("update") || "Update") +
                                    "\n                                "
                                ),
                              ]
                            ),
                          ]
                        ),
                      ]
                    ),
                    _vm._v(" "),
                    this.$roleDeliveryBoy !== this.login_user.role.name
                      ? _c("div", { staticClass: "od-action-block" }, [
                          _c(
                            "label",
                            { staticClass: "od-action-label" },
                            [
                              _c("base-icon", {
                                staticClass: "me-2",
                                attrs: {
                                  name: "Vector (1)",
                                  width: "16",
                                  height: "16",
                                },
                              }),
                              _vm._v(
                                "\n                                " +
                                  _vm._s(
                                    _vm.__("assign_delivery_partner") ||
                                      "Assign Delivery Partner"
                                  ) +
                                  "\n                            "
                              ),
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _c(
                            "form",
                            {
                              staticClass: "od-inline-form od-stack-form",
                              on: {
                                submit: function ($event) {
                                  $event.preventDefault()
                                  return _vm.assignDeliveryBoy.apply(
                                    null,
                                    arguments
                                  )
                                },
                              },
                            },
                            [
                              _c(
                                "select",
                                {
                                  directives: [
                                    {
                                      name: "model",
                                      rawName: "v-model",
                                      value: _vm.delivery_boy_id,
                                      expression: "delivery_boy_id",
                                    },
                                  ],
                                  staticClass: "form-select",
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
                                      _vm.delivery_boy_id = $event.target
                                        .multiple
                                        ? $$selectedVal
                                        : $$selectedVal[0]
                                    },
                                  },
                                },
                                [
                                  _c("option", { attrs: { value: "" } }, [
                                    _vm._v(
                                      _vm._s(_vm.__("select_delivery_boy"))
                                    ),
                                  ]),
                                  _vm._v(" "),
                                  _vm._l(_vm.deliveryBoys, function (boy) {
                                    return _c(
                                      "option",
                                      { domProps: { value: boy.id } },
                                      [
                                        _vm._v(
                                          "\n                                        " +
                                            _vm._s(
                                              _vm.getDisplayName(boy.name)
                                            ) +
                                            " (" +
                                            _vm._s(boy.pending_order_count) +
                                            ")\n                                    "
                                        ),
                                      ]
                                    )
                                  }),
                                ],
                                2
                              ),
                              _vm._v(" "),
                              _c(
                                "button",
                                {
                                  staticClass: "btn btn-primary od-form-btn",
                                  attrs: {
                                    type: "submit",
                                    disabled:
                                      _vm.delivery_boy_id === "" ||
                                      _vm.isLoadingDboy,
                                  },
                                },
                                [
                                  _vm._v(
                                    "\n                                    " +
                                      _vm._s(
                                        Number(_vm.order.delivery_boy_id) > 0
                                          ? _vm.__("change") || "Change"
                                          : _vm.__("assign") || "Assign"
                                      ) +
                                      "\n                                "
                                  ),
                                ]
                              ),
                            ]
                          ),
                        ])
                      : _vm._e(),
                  ]),
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "card od-card" }, [
                  _c("div", { staticClass: "od-card-header" }, [
                    _c(
                      "h5",
                      { staticClass: "od-card-title" },
                      [
                        _c("base-icon", {
                          staticClass: "me-2",
                          attrs: { name: "User", width: "18", height: "18" },
                        }),
                        _vm._v(
                          "\n                            " +
                            _vm._s(
                              _vm.__("customer_details") || "Customer Details"
                            ) +
                            "\n                        "
                        ),
                      ],
                      1
                    ),
                  ]),
                  _vm._v(" "),
                  _c(
                    "div",
                    { staticClass: "card-body od-card-body text-start" },
                    [
                      _c("div", { staticClass: "od-person" }, [
                        _c(
                          "div",
                          { staticClass: "avatar-box bg-light od-avatar" },
                          [
                            _vm._v(
                              "\n                                " +
                                _vm._s(
                                  _vm.order.user_name
                                    ? _vm.order.user_name
                                        .charAt(0)
                                        .toUpperCase()
                                    : "U"
                                ) +
                                "\n                            "
                            ),
                          ]
                        ),
                        _vm._v(" "),
                        _c(
                          "div",
                          { staticClass: "text-start od-person-text" },
                          [
                            _c("div", { staticClass: "od-person-name" }, [
                              _vm._v(_vm._s(_vm.order.user_name)),
                            ]),
                            _vm._v(" "),
                            _c("div", { staticClass: "od-person-sub" }, [
                              _vm._v(
                                _vm._s(
                                  _vm.__("Customer Joined") || "Customer Joined"
                                ) + ":\n                                    "
                              ),
                              _c("span", { staticClass: "od-person-strong" }, [
                                _vm._v(
                                  _vm._s(
                                    _vm.formatDate(_vm.order.user_created_at) ||
                                      "N/A"
                                  )
                                ),
                              ]),
                            ]),
                          ]
                        ),
                      ]),
                      _vm._v(" "),
                      _c("div", { staticClass: "od-divider" }),
                      _vm._v(" "),
                      _c("div", { staticClass: "od-info-row" }, [
                        _c(
                          "div",
                          { staticClass: "od-info-label" },
                          [
                            _c("base-icon", {
                              staticClass: "me-2",
                              attrs: {
                                name: "Envelope",
                                width: "16",
                                height: "16",
                              },
                            }),
                            _vm._v(
                              "\n                                " +
                                _vm._s(
                                  _vm.__("Email Address") || "Email Address"
                                )
                            ),
                          ],
                          1
                        ),
                        _vm._v(" "),
                        _c("div", { staticClass: "od-info-value" }, [
                          _vm.order.user_email
                            ? _c(
                                "a",
                                {
                                  staticClass: "od-contact-link",
                                  attrs: {
                                    href: "mailto:" + _vm.order.user_email,
                                  },
                                },
                                [_vm._v(_vm._s(_vm.order.user_email))]
                              )
                            : _vm._e(),
                        ]),
                      ]),
                      _vm._v(" "),
                      _c("div", { staticClass: "od-info-row mb-0" }, [
                        _c(
                          "div",
                          { staticClass: "od-info-label" },
                          [
                            _c("base-icon", {
                              staticClass: "me-2",
                              attrs: {
                                name: "Phone",
                                width: "16",
                                height: "16",
                              },
                            }),
                            _vm._v(
                              "\n                                " +
                                _vm._s(_vm.__("Phone Number") || "Phone Number")
                            ),
                          ],
                          1
                        ),
                        _vm._v(" "),
                        _c("div", { staticClass: "od-info-value" }, [
                          _vm.order.user_mobile
                            ? _c(
                                "a",
                                {
                                  staticClass: "od-contact-link",
                                  attrs: { href: _vm.customerTel },
                                },
                                [_vm._v(_vm._s(_vm.order.user_mobile))]
                              )
                            : _vm._e(),
                        ]),
                      ]),
                    ]
                  ),
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "card od-card" }, [
                  _c("div", { staticClass: "od-card-header" }, [
                    _c(
                      "h5",
                      { staticClass: "od-card-title" },
                      [
                        _c("base-icon", {
                          staticClass: "me-2",
                          attrs: {
                            name: "MapPinLine",
                            width: "18",
                            height: "18",
                          },
                        }),
                        _vm._v(
                          "\n                            " +
                            _vm._s(
                              _vm.__("shipping_address") || "Shipping Address"
                            ) +
                            "\n                        "
                        ),
                      ],
                      1
                    ),
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "card-body od-card-body" }, [
                    _c(
                      "div",
                      {
                        staticClass:
                          "d-flex align-items-center flex-wrap mb-2 gap-2",
                      },
                      [
                        _c("span", { staticClass: "od-address-type" }, [
                          _vm._v(
                            _vm._s(_vm.__("Home Address") || "Home Address")
                          ),
                        ]),
                        _vm._v(" "),
                        _c("div", { staticClass: "figma-default-badge" }, [
                          _c("span", [
                            _vm._v(_vm._s(_vm.__("Default") || "Default")),
                          ]),
                        ]),
                      ]
                    ),
                    _vm._v(" "),
                    _c("p", { staticClass: "od-address-text mb-0" }, [
                      _vm._v(
                        "\n                            " +
                          _vm._s(_vm.order.order_address) +
                          "\n                        "
                      ),
                    ]),
                    _vm._v(" "),
                    _vm.mapsUrl
                      ? _c(
                          "a",
                          {
                            staticClass:
                              "btn btn-outline-primary od-map-btn mt-3",
                            attrs: {
                              href: _vm.mapsUrl,
                              target: "_blank",
                              rel: "noopener noreferrer",
                            },
                          },
                          [
                            _c("i", { staticClass: "fas fa-map-marked-alt" }),
                            _vm._v(
                              " " +
                                _vm._s(_vm.tr("open_in_maps", "Open in Maps")) +
                                "\n                        "
                            ),
                          ]
                        )
                      : _vm._e(),
                    _vm._v(" "),
                    _vm.hasDeliveryTime
                      ? _c("div", { staticClass: "delivery-time-box mt-3" }, [
                          _c("div", { staticClass: "od-delivery-time-label" }, [
                            _vm._v(
                              "\n                                " +
                                _vm._s(
                                  _vm.__("Delivery Time & Date") ||
                                    "Delivery Time & Date"
                                )
                            ),
                          ]),
                          _vm._v(" "),
                          _c(
                            "div",
                            { staticClass: "text-dark od-delivery-time-value" },
                            [
                              _vm._v(
                                _vm._s(_vm.order.delivery_time) +
                                  "\n                            "
                              ),
                            ]
                          ),
                        ])
                      : _vm._e(),
                  ]),
                ]),
                _vm._v(" "),
                _vm.order.delivery_boy_name ||
                _vm.getDisplayName(_vm.order.delivery_boy_name_translation)
                  ? _c("div", { staticClass: "card od-card" }, [
                      _c("div", { staticClass: "od-card-header" }, [
                        _c(
                          "h5",
                          { staticClass: "od-card-title" },
                          [
                            _c("base-icon", {
                              staticClass: "me-2",
                              class:
                                _vm.login_user.role.name === "Delivery Boy"
                                  ? "db-panel-truck-icon"
                                  : "normal-truck-icon",
                              attrs: {
                                name: "Vector (1)",
                                width: "18",
                                height: "18",
                                "use-current-color": true,
                              },
                            }),
                            _vm._v(" "),
                            _c(
                              "span",
                              {
                                class:
                                  _vm.login_user.role.name === "Delivery Boy"
                                    ? "db-panel-delivery-title"
                                    : "normal-delivery-title",
                              },
                              [
                                _vm._v(
                                  _vm._s(
                                    _vm.__("delivery_partner_details") ||
                                      "Delivery Partner Details"
                                  )
                                ),
                              ]
                            ),
                          ],
                          1
                        ),
                      ]),
                      _vm._v(" "),
                      _c("div", { staticClass: "card-body od-card-body" }, [
                        _c("div", { staticClass: "od-person" }, [
                          _c(
                            "div",
                            {
                              staticClass:
                                "avatar-box bg-light od-avatar rounded-circle",
                            },
                            [
                              _vm._v(
                                "\n                                " +
                                  _vm._s(
                                    _vm.order.delivery_boy_name
                                      ? _vm.order.delivery_boy_name
                                          .charAt(0)
                                          .toUpperCase()
                                      : "D"
                                  ) +
                                  "\n                            "
                              ),
                            ]
                          ),
                          _vm._v(" "),
                          _c(
                            "div",
                            { staticClass: "text-start od-person-text" },
                            [
                              _c("div", { staticClass: "od-person-name" }, [
                                _vm._v(
                                  _vm._s(
                                    _vm.getDisplayName(
                                      _vm.order.delivery_boy_name_translation
                                    ) || _vm.order.delivery_boy_name
                                  ) + "\n                                "
                                ),
                              ]),
                              _vm._v(" "),
                              _c(
                                "div",
                                { staticClass: "od-person-sub" },
                                [
                                  _vm.order.delivery_boy_mobile
                                    ? _c(
                                        "a",
                                        {
                                          staticClass:
                                            "od-contact-link od-contact-link--sub",
                                          attrs: {
                                            href:
                                              "tel:+" +
                                              _vm.order.delivery_boy_mobile,
                                          },
                                        },
                                        [
                                          _vm._v(
                                            "+" +
                                              _vm._s(
                                                _vm.order.delivery_boy_mobile
                                              )
                                          ),
                                        ]
                                      )
                                    : [
                                        _vm._v(
                                          "+" +
                                            _vm._s(
                                              _vm.order.delivery_boy_mobile
                                            )
                                        ),
                                      ],
                                ],
                                2
                              ),
                            ]
                          ),
                        ]),
                      ]),
                    ])
                  : _vm._e(),
                _vm._v(" "),
                _vm.order.order_note
                  ? _c(
                      "div",
                      { staticClass: "card od-card order-notes-card" },
                      [
                        _c("div", { staticClass: "od-card-header" }, [
                          _c("h5", { staticClass: "od-card-title" }, [
                            _c("i", {
                              staticClass: "far fa-calendar-check me-2",
                            }),
                            _vm._v(" "),
                            _c("span", { staticClass: "order-notes-title" }, [
                              _vm._v(
                                _vm._s(
                                  _vm.__("Customer Order Notes") ||
                                    "Customer Order Notes"
                                )
                              ),
                            ]),
                          ]),
                        ]),
                        _vm._v(" "),
                        _c("div", { staticClass: "card-body od-card-body" }, [
                          _c("div", { staticClass: "order-notes-box" }, [
                            _c("p", { staticClass: "mb-0 order-notes-text" }, [
                              _vm._v(
                                "\n                                " +
                                  _vm._s(_vm.order.order_note) +
                                  "\n                            "
                              ),
                            ]),
                          ]),
                        ]),
                      ]
                    )
                  : _vm._e(),
              ]),
            ]),
          ])
        : _vm._e(),
      _vm._v(" "),
      _c(
        "b-modal",
        {
          attrs: { "hide-footer": true, title: _vm.__("order_item_details") },
          model: {
            value: _vm.itemModalShow,
            callback: function ($$v) {
              _vm.itemModalShow = $$v
            },
            expression: "itemModalShow",
          },
        },
        [
          _c("b-container", { attrs: { fluid: "" } }, [
            _c("div", { staticClass: "row" }, [
              _c("ul", { staticClass: "list-group" }, [
                _c("li", { staticClass: "list-group-item" }, [
                  _c("b", [_vm._v(_vm._s(_vm.__("name")) + " :- ")]),
                  _vm._v(
                    _vm._s(
                      _vm.item.product_name + " (" + _vm.item.variant_name + ")"
                    )
                  ),
                ]),
                _vm._v(" "),
                _vm.item.active_status
                  ? _c("li", { staticClass: "list-group-item capitalize" }, [
                      _c("b", [_vm._v(_vm._s(_vm.__("status")) + " :- ")]),
                      _vm._v(
                        _vm._s(
                          _vm.getDisplayName(
                            _vm.item.status_name_translation
                          ) || _vm.item.status_name
                        ) + "\n                    "
                      ),
                    ])
                  : _vm._e(),
                _vm._v(" "),
                _c(
                  "li",
                  { staticClass: "list-group-item" },
                  [
                    _c("span", [
                      _c("b", [_vm._v(_vm._s(_vm.__("product_id")) + " :- ")]),
                      _vm._v(_vm._s(_vm.item.product_id)),
                    ]),
                    _vm._v(" "),
                    _vm.item.product_id
                      ? _c(
                          "router-link",
                          {
                            directives: [
                              {
                                name: "b-tooltip",
                                rawName: "v-b-tooltip.hover",
                                modifiers: { hover: true },
                              },
                            ],
                            staticClass: "figma-action-btn float-end",
                            attrs: { to: _vm.viewProductRoute, title: "View" },
                          },
                          [_c("i", { staticClass: "bi bi-eye" })]
                        )
                      : _vm._e(),
                  ],
                  1
                ),
                _vm._v(" "),
                _vm.item.seller_name ||
                _vm.getDisplayName(_vm.item.seller_name_translation)
                  ? _c("li", { staticClass: "list-group-item" }, [
                      _c("b", [_vm._v(_vm._s(_vm.__("seller_name")) + " :- ")]),
                      _vm._v(
                        _vm._s(
                          _vm.getDisplayName(
                            _vm.item.seller_name_translation
                          ) || _vm.item.seller_name
                        ) + "\n                    "
                      ),
                    ])
                  : _vm._e(),
                _vm._v(" "),
                _c("li", { staticClass: "list-group-item" }, [
                  _c("b", [_vm._v(_vm._s(_vm.__("user_name")) + " :- ")]),
                  _vm._v(_vm._s(_vm.item.user_name)),
                ]),
                _vm._v(" "),
                _c("li", { staticClass: "list-group-item" }, [
                  _c("b", [_vm._v(_vm._s(_vm.__("variant_id")) + " :- ")]),
                  _vm._v(
                    _vm._s(_vm.item.product_variant_id) +
                      "\n                    "
                  ),
                ]),
                _vm._v(" "),
                _c("li", { staticClass: "list-group-item" }, [
                  _c("b", [_vm._v(_vm._s(_vm.__("quantity")) + " :- ")]),
                  _vm._v(_vm._s(_vm.item.quantity)),
                ]),
                _vm._v(" "),
                _c("li", { staticClass: "list-group-item" }, [
                  _c("b", [_vm._v(_vm._s(_vm.__("price")) + " :- ")]),
                  _vm._v(_vm._s(_vm.item.price)),
                ]),
                _vm._v(" "),
                _c("li", { staticClass: "list-group-item" }, [
                  _c("b", [
                    _vm._v(
                      _vm._s(_vm.__("discounted_price")) +
                        " (" +
                        _vm._s(_vm.$currency) +
                        " ) :- "
                    ),
                  ]),
                  _vm._v(_vm._s(_vm.item.discounted_price)),
                ]),
                _vm._v(" "),
                _c("li", { staticClass: "list-group-item" }, [
                  _c("b", [
                    _vm._v(
                      _vm._s(_vm.__("tax_amount")) +
                        " (" +
                        _vm._s(_vm.$currency) +
                        " ) :- "
                    ),
                  ]),
                  _vm._v(
                    _vm._s(_vm.item.tax_amount) + "\n                    "
                  ),
                ]),
                _vm._v(" "),
                _c("li", { staticClass: "list-group-item" }, [
                  _c("b", [
                    _vm._v(_vm._s(_vm.__("tax_percentage")) + " (%) :- "),
                  ]),
                  _vm._v(_vm._s(_vm.item.tax_percentage)),
                ]),
                _vm._v(" "),
                _c("li", { staticClass: "list-group-item" }, [
                  _c("b", [
                    _vm._v(
                      _vm._s(_vm.__("subtotal")) +
                        " (" +
                        _vm._s(_vm.$currency) +
                        " ) :- "
                    ),
                  ]),
                  _vm._v(_vm._s(_vm.item.sub_total)),
                ]),
                _vm._v(" "),
                _c("li", { staticClass: "list-group-item" }, [
                  _c(
                    "a",
                    {
                      staticClass: " col-sm-12 btn btn-success",
                      attrs: {
                        href: _vm.whatsappMessageLink(
                          _vm.order.country_code,
                          _vm.order.mobile,
                          _vm.order.user_name,
                          _vm.order.id,
                          _vm.item.id
                        ),
                        target: "_blank",
                        title: "Send Whatsapp Notification",
                      },
                    },
                    [_c("i", { staticClass: "fab fa-whatsapp" })]
                  ),
                ]),
              ]),
            ]),
          ]),
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "b-modal",
        {
          ref: "cancel-item-modal",
          staticClass: "figma-cancel-modal-wrapper",
          attrs: {
            id: "cancel-item-modal",
            size: "md",
            centered: "",
            "hide-header": "",
            "hide-footer": "",
            "no-close-on-backdrop": "",
          },
        },
        [
          _c("div", { staticClass: "figma-cancel-modal-content" }, [
            _c(
              "div",
              {
                staticClass:
                  "figma-cancel-modal-header d-flex justify-content-between align-items-center",
              },
              [
                _c("div", { staticClass: "d-flex flex-column text-start" }, [
                  _c("span", { staticClass: "figma-cancel-title" }, [
                    _vm._v(
                      _vm._s(
                        _vm.__("cancel") === "cancel"
                          ? "Cancel"
                          : _vm.__("cancel")
                      )
                    ),
                  ]),
                ]),
                _vm._v(" "),
                _c(
                  "button",
                  {
                    staticClass: "figma-close-modal-btn",
                    attrs: { type: "button" },
                    on: { click: _vm.closeCancelModal },
                  },
                  [
                    _c("base-icon", {
                      attrs: {
                        name: "order cancel",
                        width: "14",
                        height: "14",
                        useCurrentColor: "",
                      },
                    }),
                  ],
                  1
                ),
              ]
            ),
            _vm._v(" "),
            _c("div", { staticClass: "figma-cancel-modal-body text-center" }, [
              _c(
                "div",
                {
                  staticClass:
                    "figma-warning-icon-wrapper d-flex align-items-center justify-content-center mx-auto",
                },
                [
                  _c("base-icon", {
                    attrs: {
                      name: "warning",
                      width: "24",
                      height: "24",
                      useCurrentColor: "",
                    },
                  }),
                ],
                1
              ),
              _vm._v(" "),
              _c("div", { staticClass: "figma-cancel-info-block" }, [
                _c("h3", { staticClass: "figma-cancel-heading" }, [
                  _vm._v(
                    _vm._s(
                      _vm.__("cancel_this_item") === "cancel_this_item"
                        ? "Cancel this item?"
                        : _vm.__("cancel_this_item")
                    )
                  ),
                ]),
                _vm._v(" "),
                _c("p", { staticClass: "figma-cancel-description" }, [
                  _vm._v(
                    _vm._s(
                      _vm.__(
                        "this_action_cannot_be_undone_please_provide_a_reason_for_cancelling_this_item_from_order"
                      ) ===
                        "this_action_cannot_be_undone_please_provide_a_reason_for_cancelling_this_item_from_order"
                        ? "This action cannot be undone. Please provide a reason for cancelling this item from order"
                        : _vm.__(
                            "this_action_cannot_be_undone_please_provide_a_reason_for_cancelling_this_item_from_order"
                          )
                    )
                  ),
                ]),
              ]),
              _vm._v(" "),
              _c(
                "div",
                { staticClass: "figma-cancel-input-group w-100 text-start" },
                [
                  _c("label", { staticClass: "figma-cancel-input-label" }, [
                    _vm._v(
                      _vm._s(
                        _vm.__("cancellation_reason") === "cancellation_reason"
                          ? "Cancellation Reason"
                          : _vm.__("cancellation_reason")
                      ) + " "
                    ),
                    _c("span", { staticClass: "text-danger" }, [_vm._v("*")]),
                  ]),
                  _vm._v(" "),
                  _c("textarea", {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model",
                        value: _vm.cancellationReason,
                        expression: "cancellationReason",
                      },
                    ],
                    staticClass: "form-control figma-cancel-textarea",
                    attrs: {
                      placeholder:
                        _vm.__("eg_out_of_stock_and_etc") ===
                        "eg_out_of_stock_and_etc"
                          ? "e.g, Out of stock, and etc."
                          : _vm.__("eg_out_of_stock_and_etc"),
                      rows: "4",
                    },
                    domProps: { value: _vm.cancellationReason },
                    on: {
                      input: function ($event) {
                        if ($event.target.composing) {
                          return
                        }
                        _vm.cancellationReason = $event.target.value
                      },
                    },
                  }),
                  _vm._v(" "),
                  _vm.cancelModalError
                    ? _c(
                        "span",
                        { staticClass: "text-danger small mt-1 d-block" },
                        [_vm._v(_vm._s(_vm.cancelModalError))]
                      )
                    : _vm._e(),
                ]
              ),
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "figma-cancel-modal-footer" }, [
              _c(
                "button",
                {
                  staticClass: "btn btn-figma-keep",
                  attrs: { type: "button", disabled: _vm.isLoadingCancel },
                  on: { click: _vm.closeCancelModal },
                },
                [
                  _vm._v(
                    "\n                    " +
                      _vm._s(
                        _vm.__("keep_item") === "keep_item"
                          ? "Keep Item"
                          : _vm.__("keep_item")
                      ) +
                      "\n                "
                  ),
                ]
              ),
              _vm._v(" "),
              _c(
                "button",
                {
                  staticClass: "btn btn-figma-confirm",
                  attrs: { type: "button", disabled: _vm.isLoadingCancel },
                  on: { click: _vm.confirmCancelOrderItem },
                },
                [
                  !_vm.isLoadingCancel
                    ? _c("span", [
                        _vm._v(
                          _vm._s(
                            _vm.__("confirm_cancel") === "confirm_cancel"
                              ? "Confirm Cancel"
                              : _vm.__("confirm_cancel")
                          )
                        ),
                      ])
                    : _c("b-spinner", {
                        attrs: { small: "", variant: "light" },
                      }),
                ],
                1
              ),
            ]),
          ]),
        ]
      ),
      _vm._v(" "),
      _c(
        "b-modal",
        {
          attrs: {
            "hide-footer": true,
            size: "lg",
            centered: "",
            title: _vm.__("prescription_view") || "Prescription Image",
          },
          model: {
            value: _vm.prescriptionModalShow,
            callback: function ($$v) {
              _vm.prescriptionModalShow = $$v
            },
            expression: "prescriptionModalShow",
          },
        },
        [
          _c("div", { staticClass: "text-center p-2" }, [
            _c("img", {
              staticClass: "img-fluid rounded border shadow-sm",
              staticStyle: { "max-height": "70vh" },
              attrs: { src: _vm.selectedPrescriptionUrl },
            }),
            _vm._v(" "),
            _c("div", { staticClass: "mt-3" }, [
              _c(
                "a",
                {
                  staticClass: "btn btn-primary",
                  attrs: {
                    href: _vm.selectedPrescriptionUrl,
                    target: "_blank",
                    download: "",
                  },
                },
                [
                  _c("i", { staticClass: "fa fa-download me-1" }),
                  _vm._v(
                    " " +
                      _vm._s(_vm.__("download") || "Download") +
                      "\n                "
                  ),
                ]
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
      { staticClass: "figma-kpi-icon-v2 bg-stat-blue od-tile-icon" },
      [_c("i", { staticClass: "fas fa-shopping-basket" })]
    )
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "div",
      { staticClass: "figma-kpi-icon-v2 bg-stat-green od-tile-icon" },
      [_c("i", { staticClass: "fas fa-credit-card" })]
    )
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "div",
      { staticClass: "figma-kpi-icon-v2 bg-stat-purple od-tile-icon" },
      [_c("i", { staticClass: "fas fa-receipt" })]
    )
  },
]
render._withStripped = true



/***/ })

}]);