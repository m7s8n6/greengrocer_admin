"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_views_Orders_ViewOrder_vue"],{

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
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
      var _this = this;
      var vm = this;
      axios__WEBPACK_IMPORTED_MODULE_0___default().get(this.$apiUrl + '/order_statuses').then(function (response) {
        _this.isLoading = false;
        var data = response.data;
        var statusesToRemoveIds = [7, 8];
        _this.statuses = data.data.filter(function (status) {
          return !statusesToRemoveIds.includes(status.id);
        });
      })["catch"](function (error) {
        vm.isLoading = false;
        if (error.request.statusText) {
          _this.showError(error.request.statusText);
        } else if (error.message) {
          _this.showError(error.message);
        } else {
          _this.showError("Something went wrong!");
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
      var _this2 = this;
      this.isLoading = true;
      axios__WEBPACK_IMPORTED_MODULE_0___default().get(this.$apiUrl + '/orders/view/' + this.id).then(function (response) {
        _this2.isLoading = false;
        var data = response.data;
        if (data.status === 1) {
          _this2.order = response.data.data.order;
          _this2.order_items = response.data.data.order_items;
          _this2.deliveryBoys = response.data.data.deliveryBoys;
          _this2.delivery_boy_id = _this2.order.delivery_boy_id != 0 && _this2.order.delivery_boy_id != "" ? _this2.order.delivery_boy_id : "";
          _this2.order_status_id = _this2.order.active_status != 0 && _this2.order.active_status != "" ? _this2.order.active_status : "";
          _this2.syncLiveTracking();
        } else {
          _this2.showError(data.message);
          setTimeout(function () {
            _this2.$router.back();
          }, 1000);
        }
      })["catch"](function (error) {
        _this2.isLoading = false;
        if (error.request.statusText) {
          _this2.showError(error.request.statusText);
        } else if (error.message) {
          _this2.showError(error.message);
        } else {
          _this2.showError("Something went wrong!");
        }
      });
    },
    // Live tracking: the delivery boy's mobile app pushes GPS via manage_live_tracking while
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
      var _this3 = this;
      if (this.liveTrackingWatchId !== null) return;
      this.liveTrackingWatchId = navigator.geolocation.watchPosition(function (position) {
        return _this3.sendLiveTrackingUpdate(position);
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
      var formData = new FormData();
      formData.append('order_id', this.id);
      formData.append('order_status', this.order.active_status);
      formData.append('latitude', position.coords.latitude);
      formData.append('longitude', position.coords.longitude);
      axios__WEBPACK_IMPORTED_MODULE_0___default().post(this.$deliveryBoyApiUrl + '/manage_live_tracking', formData)["catch"](function (error) {
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
      var _this4 = this;
      var vm = this;
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
          _this4.isLoadingUstatus = true;
          var postData = {
            order_id: _this4.id,
            status_id: _this4.order_status_id
          };
          axios__WEBPACK_IMPORTED_MODULE_0___default().post(_this4.$apiUrl + '/orders/update_status', postData).then(function (response) {
            _this4.isLoadingUstatus = false;
            var data = response.data;
            if (data.status === 1) {
              //this.showSuccess(data.message);
              _this4.order_status_id = '';
              _this4.getOrder();
              _this4.showMessage("success", data.message);
              setTimeout(function () {
                vm.$swal.close();
              }, 2000);
            } else {
              vm.showError(data.message);
              vm.isLoadingUstatus = false;
            }
          })["catch"](function (error) {
            vm.isLoadingUstatus = false;
            _this4.showError("Something went wrong!");
          });
        }
      });
    },
    assignDeliveryBoy: function assignDeliveryBoy() {
      var _this5 = this;
      this.isLoadingDboy = true;
      var postData = {
        order_id: this.id,
        delivery_boy_id: this.delivery_boy_id
      };
      axios__WEBPACK_IMPORTED_MODULE_0___default().post(this.$apiUrl + '/orders/assign_delivery_boy', postData).then(function (response) {
        _this5.isLoadingDboy = false;
        var data = response.data;
        if (data.status === 1) {
          _this5.delivery_boy_id = '';
          _this5.getOrder();
          _this5.showMessage("success", data.message);
          setTimeout(function () {
            vm.$swal.close();
          }, 2000);
        } else {
          _this5.showMessage("error", data.message);
          _this5.isLoadingDboy = false;
        }
      })["catch"](function (error) {
        _this5.isLoadingDboy = false;
        _this5.showError("Something went wrong!");
      });
    },
    downloadInvoice: function downloadInvoice() {
      var _this6 = this;
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
        fileLink.setAttribute('download', 'Invoice-No:#' + _this6.id + '.pdf');
        document.body.appendChild(fileLink);
        fileLink.click();
        _this6.isLoading = false;
      })["catch"](function (error) {
        if (error.request.statusText) {
          _this6.showError(error.request.statusText);
        } else if (error.message) {
          _this6.showError(error.message);
        } else {
          _this6.showError("Something went wrong!");
        }
        _this6.isLoading = false;
      });
    },
    allSelectCheckBox: function allSelectCheckBox() {
      var _this7 = this;
      if (this.all_select == false) {
        this.all_select = true;
        this.order_items.forEach(function (item) {
          _this7.selectedItems.push(item.id);
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
      var _this8 = this;
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
          confirmButtonColor: '#37a279',
          cancelButtonColor: '#d33'
        }).then(function (result) {
          if (result.value) {
            var ids = uniqueSelectedItems.toString();
            _this8.isLoading = true;
            var postData = {
              ids: ids,
              status_id: _this8.status_id
            };
            axios__WEBPACK_IMPORTED_MODULE_0___default().post(_this8.$apiUrl + '/orders/update_items_status', postData).then(function (response) {
              _this8.isLoading = false;
              var data = response.data;
              if (data.status === 1) {
                _this8.getOrder();
                _this8.status_id = '';
                _this8.selectedItems = [];
                _this8.all_select = false;
                _this8.showMessage("success", data.message);
                setTimeout(function () {
                  vm.$swal.close();
                }, 2000);
              } else {
                vm.showError(data.message);
                vm.isLoading = false;
              }
            })["catch"](function (error) {
              vm.isLoading = false;
              _this8.showError("Something went wrong!");
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
      var _this9 = this;
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
        _this9.isLoadingCancel = false;
        var data = response.data;
        if (data.status === 1) {
          _this9.getOrder();
          _this9.showMessage("success", data.message);
          _this9.closeCancelModal();
        } else {
          _this9.showError(data.message);
        }
      })["catch"](function (error) {
        _this9.isLoadingCancel = false;
        _this9.showError(error.message || 'Something went wrong!');
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
___CSS_LOADER_EXPORT___.push([module.id, "\n[data-v-721c2304] .cancel-item-btn svg path,[data-v-721c2304] .cancel-item-btn:hover svg path {\n    fill: #D63031 !important;\n}\n\n/* Base Theme-Aware Variables for this component */\n.order-meta-bar[data-v-721c2304] {\n    width: 100%;\n    border-radius: 8px;\n    border: 1px solid #DCEFE4;\n    background-color: #EEF7F2;\n    display: flex;\n    flex-direction: column;\n    align-items: flex-start;\n    padding: 16px;\n    gap: 12px;\n}\nbody.theme-dark .order-meta-bar[data-v-721c2304] {\n    background: linear-gradient(90deg, #1e293b 0%, #0f172a 100%) !important;\n    border-color: #334155 !important;\n}\n.order-meta-date[data-v-721c2304] {\n    display: flex;\n    align-items: center;\n    gap: 8px;\n}\n.order-meta-seller[data-v-721c2304] {\n    display: flex;\n    align-items: center;\n    gap: 8px;\n}\n@media (min-width: 768px) {\n.order-meta-bar[data-v-721c2304] {\n        flex-direction: row;\n        align-items: center;\n        padding: 8px 16px;\n        gap: 0;\n}\n.order-meta-date[data-v-721c2304] {\n        padding-right: 24px;\n        border-right: 1px solid rgba(85, 174, 123, 0.25);\n}\n.order-meta-seller[data-v-721c2304] {\n        padding-left: 24px;\n}\n}\n.card[data-v-721c2304] {\n    border: 1px solid #EDEDED !important;\n    border-radius: 12px !important;\n    overflow: hidden;\n    margin-bottom: 24px;\n}\n.item-count-badge[data-v-721c2304] {\n    display: inline-flex;\n    align-items: center;\n    justify-content: center;\n    height: 36px;\n    padding: 8px 12px;\n    gap: 4px;\n    border-radius: 8px;\n    background-color: #EDEDED;\n    border: 1px solid #D9D9D9;\n    color: #000000;\n    font-weight: 500;\n    font-size: 14px;\n}\nbody.theme-dark .item-count-badge[data-v-721c2304] {\n    background-color: #334155 !important;\n    border-color: #475569 !important;\n    color: #f1f5f9 !important;\n}\n.delivery-time-box[data-v-721c2304] {\n    min-height: 76px;\n    background: #FBEAEA;\n    border: 1px solid #EFAEAF;\n    border-radius: 8px;\n}\nbody.theme-dark .delivery-time-box[data-v-721c2304] {\n    background: rgba(214, 48, 49, 0.15) !important;\n    border-color: rgba(214, 48, 49, 0.3) !important;\n}\n.payable-total-box[data-v-721c2304] {\n    min-height: 52px;\n    background: #F7F7F7;\n    border: 1px solid #EDEDED;\n    border-radius: 8px;\n}\nbody.theme-dark .payable-total-box[data-v-721c2304] {\n    background: #1e293b !important;\n    border-color: #334155 !important;\n}\n\n/* order-notes-box/title/text use hardcoded light inline colors (light-blue bg, near-black\n   text) that stay light-only - the broad dark-mode span/div text-color override further down\n   then forces near-white text onto that unchanged light-blue background, making it unreadable. */\nbody.theme-dark .order-notes-box[data-v-721c2304] {\n    background-color: rgba(59, 130, 246, 0.15) !important;\n    border-left-color: #3B82F6 !important;\n}\nbody.theme-dark .order-notes-title[data-v-721c2304],\nbody.theme-dark .order-notes-text[data-v-721c2304] {\n    color: #F1F5F9 !important;\n}\n\n/* Base text color fixes for dark mode in this component */\nbody.theme-dark .modern-page-title[data-v-721c2304],\nbody.theme-dark .figma-text-xl-semibold[data-v-721c2304],\nbody.theme-dark .text-dark[data-v-721c2304],\nbody.theme-dark h2[data-v-721c2304],\nbody.theme-dark h3[data-v-721c2304],\nbody.theme-dark h4[data-v-721c2304],\nbody.theme-dark h5[data-v-721c2304],\nbody.theme-dark span[data-v-721c2304],\nbody.theme-dark th[data-v-721c2304],\nbody.theme-dark td[data-v-721c2304],\nbody.theme-dark div[data-v-721c2304]:not(.figma-status-pill) {\n    color: #f1f5f9 !important;\n}\nbody.theme-dark .text-secondary[data-v-721c2304],\nbody.theme-dark .text-muted[data-v-721c2304] {\n    color: #94a3b8 !important;\n}\nbody.theme-dark .card-header[data-v-721c2304],\nbody.theme-dark .table thead[data-v-721c2304],\nbody.theme-dark .table thead th[data-v-721c2304] {\n    background-color: #1e293b !important;\n    border-top-color: #334155 !important;\n    border-bottom-color: #334155 !important;\n}\nbody.theme-dark .table tbody tr td[data-v-721c2304] {\n    background-color: #1e293b !important;\n    border-bottom: 1px solid #334155 !important;\n}\nbody.theme-dark table.table tbody tr:hover td[data-v-721c2304] {\n    background-color: #2d3748 !important;\n}\nbody.theme-dark .card[data-v-721c2304] {\n    background-color: #1e293b !important;\n    border-color: #334155 !important;\n}\nbody.theme-dark .form-select[data-v-721c2304],\nbody.theme-dark .form-control[data-v-721c2304] {\n    background-color: #0f172a !important;\n    border-color: #334155 !important;\n    color: #f1f5f9 !important;\n}\nbody.theme-dark .order-details-wrapper>div[data-v-721c2304]:first-child {\n    background: linear-gradient(180deg, #1e293b 0%, #0f172a 100%) !important;\n    border: 1px solid #334155 !important;\n}\nbody.theme-dark .delivery-time-box div[data-v-721c2304] {\n    color: #ff8080 !important;\n}\nbody.theme-dark .delivery-time-box .text-dark[data-v-721c2304] {\n    color: #f1f5f9 !important;\n}\n\n/* Print Order button contrast */\nbody.theme-dark .btn-dark[data-v-721c2304] {\n    background-color: #334155 !important;\n    border-color: #475569 !important;\n}\nbody.theme-dark .avatar-box.bg-light[data-v-721c2304] {\n    background-color: #334155 !important;\n    color: #61b795 !important;\n}\n.figma-default-badge[data-v-721c2304] {\n    display: flex !important;\n    align-items: center !important;\n    justify-content: center !important;\n    width: 58px !important;\n    height: 24px !important;\n    background: #EEF7F2 !important;\n    border-radius: 8px !important;\n}\n.figma-default-badge span[data-v-721c2304] {\n    font-family: 'Inter', sans-serif !important;\n    font-weight: 600 !important;\n    font-size: 12px !important;\n    line-height: 16px !important;\n    color: #55AE7B !important;\n    text-align: center !important;\n}\nbody.theme-dark .figma-default-badge[data-v-721c2304] {\n    background: rgba(85, 174, 123, 0.15) !important;\n}\nbody.theme-dark .figma-default-badge span[data-v-721c2304] {\n    color: #55AE7B !important;\n}\n.normal-seller-name[data-v-721c2304] {\n    color: var(--Colors-Shades-Neutral-N---950, #000000) !important;\n}\nbody.theme-dark .normal-seller-name[data-v-721c2304] {\n    color: #f1f5f9 !important;\n}\n.db-panel-seller-name[data-v-721c2304] {\n    color: var(--Colors-Shades-Neutral-N---950, #000000) !important;\n}\nbody.theme-dark .db-panel-seller-name[data-v-721c2304] {\n    color: #ffffff !important;\n}\n.normal-truck-icon[data-v-721c2304] {\n    color: #000000 !important;\n}\nbody.theme-dark .normal-truck-icon[data-v-721c2304] {\n    color: #f1f5f9 !important;\n}\n.db-panel-truck-icon[data-v-721c2304] {\n    color: #000000 !important;\n}\nbody.theme-dark .db-panel-truck-icon[data-v-721c2304] {\n    color: #ffffff !important;\n}\n.normal-delivery-title[data-v-721c2304] {\n    color: #000000 !important;\n}\nbody.theme-dark .normal-delivery-title[data-v-721c2304] {\n    color: #f1f5f9 !important;\n}\n.db-panel-delivery-title[data-v-721c2304] {\n    color: #000000 !important;\n}\nbody.theme-dark .db-panel-delivery-title[data-v-721c2304] {\n    color: #ffffff !important;\n}\n\n/* Figma-styled Cancel Order Item Modal */\n.figma-cancel-modal-content[data-v-721c2304] {\n    width: 540px !important;\n    height: 652px !important;\n    display: flex !important;\n    flex-direction: column !important;\n    justify-content: space-between !important;\n    box-sizing: border-box !important;\n}\n.figma-cancel-modal-header[data-v-721c2304] {\n    width: 540px !important;\n    height: 100px !important;\n    padding: 24px !important;\n    gap: 16px !important;\n    border-bottom: 1px solid #F1F5F9 !important;\n    box-sizing: border-box !important;\n    display: flex !important;\n    justify-content: space-between !important;\n    align-items: center !important;\n    opacity: 1 !important;\n}\nbody.theme-dark .figma-cancel-modal-header[data-v-721c2304] {\n    border-bottom-color: #334155 !important;\n}\n.figma-cancel-modal-body[data-v-721c2304] {\n    width: 540px !important;\n    height: 468px !important;\n    padding: 24px !important;\n    box-sizing: border-box !important;\n    display: flex !important;\n    flex-direction: column !important;\n    align-items: center !important;\n    gap: 32px !important;\n    opacity: 1 !important;\n}\n.figma-cancel-modal-footer[data-v-721c2304] {\n    width: 540px !important;\n    height: 84px !important;\n    opacity: 1 !important;\n    gap: 24px !important;\n    border-top: 1px solid var(--Colors-Shades-Neutral-N---200, #EDEDED) !important;\n    padding-top: 16px !important;\n    padding-right: 24px !important;\n    padding-bottom: 16px !important;\n    padding-left: 24px !important;\n    border-top-left-radius: 0px !important;\n    border-top-right-radius: 0px !important;\n    border-bottom-right-radius: 16px !important;\n    border-bottom-left-radius: 16px !important;\n    background: var(--Colors-Shades-Neutral-N---50, #FFFFFF) !important;\n    box-sizing: border-box !important;\n    display: flex !important;\n    align-items: center !important;\n    justify-content: space-between !important;\n}\nbody.theme-dark .figma-cancel-modal-footer[data-v-721c2304] {\n    background: #1E293B !important;\n    border-top-color: #334155 !important;\n}\n.figma-cancel-title[data-v-721c2304] {\n    color: var(--Foreground-Primary, #0D0D0D);\n    font-family: var(--Font-Family-Body, 'Inter', sans-serif);\n    font-size: var(--Font-Size-text-xl, 20px);\n    font-style: normal;\n    font-weight: var(--Font-Weight-font-semibold, 600);\n    line-height: var(--Font-Line-Height-xl, 28px);\n}\nbody.theme-dark .figma-cancel-title[data-v-721c2304] {\n    color: #F1F5F9;\n}\n.figma-cancel-subtitle[data-v-721c2304] {\n    font-size: 13px;\n    color: #64748B;\n    font-family: 'Inter', sans-serif;\n    margin-top: 2px;\n}\nbody.theme-dark .figma-cancel-subtitle[data-v-721c2304] {\n    color: #94A3B8;\n}\n.figma-close-modal-btn[data-v-721c2304] {\n    background: #F8FAFC !important;\n    border: 1px solid #EDEDED !important;\n    outline: none !important;\n    color: #64748B !important;\n    cursor: pointer !important;\n    transition: all 0.2s ease !important;\n    width: 40px !important;\n    height: 40px !important;\n    border-radius: 8px !important;\n    display: flex !important;\n    align-items: center !important;\n    justify-content: center !important;\n    box-sizing: border-box !important;\n}\nbody.theme-dark .figma-close-modal-btn[data-v-721c2304] {\n    background-color: #334155 !important;\n    border-color: #475569 !important;\n    color: #CBD5E1 !important;\n}\n.figma-close-modal-btn[data-v-721c2304]:hover {\n    color: #0F172A !important;\n    background-color: #E2E8F0 !important;\n    border-color: #CBD5E1 !important;\n}\nbody.theme-dark .figma-close-modal-btn[data-v-721c2304]:hover {\n    color: #FFFFFF;\n    background-color: #475569;\n}\n.figma-warning-icon-wrapper[data-v-721c2304] {\n    width: 48px;\n    height: 48px;\n    border-radius: 50%;\n    background: #FBEAEA;\n    margin-bottom: 0px !important;\n}\n.figma-warning-icon-wrapper .base-icon[data-v-721c2304],\n.figma-warning-icon-wrapper .base-icon *[data-v-721c2304] {\n    color: #D63031 !important;\n    fill: #D63031 !important;\n}\n.figma-cancel-heading[data-v-721c2304] {\n    font-size: 20px;\n    font-weight: 700;\n    line-height: 28px;\n    color: #0F172A;\n    font-family: 'Inter', sans-serif;\n    margin-bottom: 8px !important;\n}\nbody.theme-dark .figma-cancel-heading[data-v-721c2304] {\n    color: #F1F5F9;\n}\n.figma-cancel-description[data-v-721c2304] {\n    font-family: 'Inter', sans-serif !important;\n    font-weight: 500 !important;\n    font-size: 16px !important;\n    line-height: 24px !important;\n    letter-spacing: 0% !important;\n    text-align: center !important;\n    vertical-align: middle !important;\n    color: var(--Colors-Shades-Neutral-N---700, #555555) !important;\n    margin-bottom: 0px !important;\n    max-width: 420px !important;\n    opacity: 1 !important;\n}\nbody.theme-dark .figma-cancel-description[data-v-721c2304] {\n    color: #CBD5E1 !important;\n}\n.figma-cancel-input-group[data-v-721c2304] {\n    margin-bottom: 12px;\n}\n.figma-cancel-input-label[data-v-721c2304] {\n    font-family: 'Inter', sans-serif !important;\n    font-weight: 400 !important;\n    font-size: 14px !important;\n    line-height: 20px !important;\n    letter-spacing: 0% !important;\n    color: var(--Colors-Shades-Neutral-N---950, #000000) !important;\n    margin-bottom: 8px !important;\n    display: block !important;\n}\nbody.theme-dark .figma-cancel-input-label[data-v-721c2304] {\n    color: #FFFFFF !important;\n}\n.figma-cancel-textarea[data-v-721c2304] {\n    width: 492px !important;\n    height: 172px !important;\n    opacity: 1 !important;\n    border-radius: 8px !important;\n    border: 1px solid var(--Colors-Shades-Neutral-N---700, #555555) !important;\n    padding-top: 12px !important;\n    padding-right: 16px !important;\n    padding-bottom: 12px !important;\n    padding-left: 16px !important;\n    background: var(--Colors-Shades-Neutral-N---50, #FFFFFF) !important;\n    color: #0F172A !important;\n    font-size: 14px !important;\n    font-family: 'Inter', sans-serif !important;\n    transition: all 0.2s ease-in-out !important;\n    resize: none !important;\n    box-sizing: border-box !important;\n}\nbody.theme-dark .figma-cancel-textarea[data-v-721c2304] {\n    border-color: #475569 !important;\n    background: #0F172A !important;\n    color: #F1F5F9 !important;\n}\n.figma-cancel-textarea[data-v-721c2304]:focus {\n    border-color: #D63031 !important;\n    outline: none !important;\n    box-shadow: 0px 0px 0px 3px rgba(214, 48, 49, 0.15) !important;\n}\n.btn-figma-keep[data-v-721c2304] {\n    width: 234px !important;\n    height: 52px !important;\n    gap: 8px !important;\n    opacity: 1 !important;\n    padding-top: 12px !important;\n    padding-right: 24px !important;\n    padding-bottom: 12px !important;\n    padding-left: 24px !important;\n    border-radius: 8px !important;\n    border: 1px solid var(--Colors-Shades-Neutral-N---950, #000000) !important;\n    background: #FFFFFF !important;\n    color: var(--Colors-Shades-Neutral-N---950, #000000) !important;\n    font-family: 'Inter', sans-serif !important;\n    font-weight: 400 !important;\n    font-size: 16px !important;\n    line-height: 24px !important;\n    letter-spacing: 0% !important;\n    transition: all 0.2s !important;\n    display: inline-flex !important;\n    align-items: center !important;\n    justify-content: center !important;\n    box-sizing: border-box !important;\n}\nbody.theme-dark .btn-figma-keep[data-v-721c2304] {\n    border-color: #475569 !important;\n    background: #1E293B !important;\n    color: #FFFFFF !important;\n}\n.btn-figma-keep[data-v-721c2304]:hover {\n    background: #F8FAFC !important;\n    color: #0F172A !important;\n}\nbody.theme-dark .btn-figma-keep[data-v-721c2304]:hover {\n    background: #334155 !important;\n    color: #FFFFFF !important;\n}\n.btn-figma-confirm[data-v-721c2304] {\n    width: 234px !important;\n    height: 52px !important;\n    gap: 8px !important;\n    opacity: 1 !important;\n    padding-top: 12px !important;\n    padding-right: 24px !important;\n    padding-bottom: 12px !important;\n    padding-left: 24px !important;\n    border-radius: 8px !important;\n    border: none !important;\n    background: var(--Colors-Status-Error, #D63031) !important;\n    color: var(--Colors-Shades-Neutral-N---50, #FFFFFF) !important;\n    font-family: 'Inter', sans-serif !important;\n    font-weight: 400 !important;\n    font-size: 16px !important;\n    line-height: 24px !important;\n    letter-spacing: 0% !important;\n    transition: all 0.2s !important;\n    display: inline-flex !important;\n    align-items: center !important;\n    justify-content: center !important;\n    box-sizing: border-box !important;\n}\n.btn-figma-confirm[data-v-721c2304]:hover {\n    background: #B32424 !important;\n}\n", ""]);
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
___CSS_LOADER_EXPORT___.push([module.id, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n/* Global styles for cancel item modal (outside Vue scoped DOM) */\n#cancel-item-modal .modal-dialog {\n    max-width: 540px !important;\n    width: 540px !important;\n}\n#cancel-item-modal .modal-content {\n    width: 540px !important;\n    height: 652px !important;\n    opacity: 1 !important;\n    border-radius: 16px !important;\n    border: 1px solid #EDEDED !important;\n    background: #FFFFFF !important;\n    box-shadow: 0px 8px 30px rgba(0, 0, 0, 0.08) !important;\n    overflow: hidden !important;\n    padding: 0px !important;\n}\n#cancel-item-modal .modal-body {\n    padding: 0px !important;\n    margin: 0px !important;\n}\nbody.theme-dark #cancel-item-modal .modal-content {\n    background: #1E293B !important;\n    border-color: #334155 !important;\n    box-shadow: 0px 8px 30px rgba(0, 0, 0, 0.4) !important;\n}\n#cancel-item-modal .figma-cancel-modal-header {\n    width: 540px !important;\n    height: 100px !important;\n    padding: 24px !important;\n    gap: 16px !important;\n    border-bottom: 1px solid #F1F5F9 !important;\n    box-sizing: border-box !important;\n    display: flex !important;\n    justify-content: space-between !important;\n    align-items: center !important;\n    opacity: 1 !important;\n}\nbody.theme-dark #cancel-item-modal .figma-cancel-modal-header {\n    border-bottom-color: #334155 !important;\n}\n#cancel-item-modal .figma-cancel-modal-body {\n    width: 540px !important;\n    height: 468px !important;\n    padding: 24px !important;\n    box-sizing: border-box !important;\n    display: flex !important;\n    flex-direction: column !important;\n    align-items: center !important;\n    gap: 32px !important;\n    opacity: 1 !important;\n}\n#cancel-item-modal .figma-cancel-modal-footer {\n    width: 540px !important;\n    height: 84px !important;\n    opacity: 1 !important;\n    gap: 24px !important;\n    border-top: 1px solid var(--Colors-Shades-Neutral-N---200, #EDEDED) !important;\n    padding-top: 16px !important;\n    padding-right: 24px !important;\n    padding-bottom: 16px !important;\n    padding-left: 24px !important;\n    border-top-left-radius: 0px !important;\n    border-top-right-radius: 0px !important;\n    border-bottom-right-radius: 16px !important;\n    border-bottom-left-radius: 16px !important;\n    background: var(--Colors-Shades-Neutral-N---50, #FFFFFF) !important;\n    box-sizing: border-box !important;\n    display: flex !important;\n    align-items: center !important;\n    justify-content: space-between !important;\n}\nbody.theme-dark #cancel-item-modal .figma-cancel-modal-footer {\n    background: #1E293B !important;\n    border-top-color: #334155 !important;\n}\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


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
            "page-heading d-flex justify-content-between align-items-center mb-4 view_order",
        },
        [
          _c(
            "h3",
            {
              staticClass: "modern-page-title mb-0",
              staticStyle: {
                "font-weight": "500",
                "font-size": "24px",
                "line-height": "32px",
                "letter-spacing": "0%",
                color: "#000000",
              },
            },
            [
              _vm._v(
                "\n            " +
                  _vm._s(_vm.__("order_details")) +
                  "\n        "
              ),
            ]
          ),
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
        ? _c("div", { staticClass: "order-details-wrapper" }, [
            _c(
              "div",
              {
                staticClass: "mb-4 order-header-card",
                staticStyle: {
                  width: "100%",
                  padding: "24px",
                  gap: "16px",
                  opacity: "1",
                  "border-radius": "16px",
                  border: "1px solid #EDEDED",
                  display: "flex",
                  "flex-direction": "column",
                  transform: "rotate(0deg)",
                },
              },
              [
                _c(
                  "div",
                  {
                    staticClass:
                      "d-flex flex-wrap align-items-center justify-content-between gap-3",
                  },
                  [
                    _c(
                      "div",
                      {
                        staticClass:
                          "d-flex flex-wrap align-items-center gap-3",
                      },
                      [
                        _c(
                          "h2",
                          {
                            staticClass: "figma-text-xl-semibold mb-0",
                            staticStyle: {
                              "font-weight": "700",
                              "font-size": "30px",
                              "line-height": "36px",
                              "letter-spacing": "0%",
                              color:
                                "var(--Colors-Shades-Neutral-N---950, #000000)",
                            },
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
                        _c("div", { staticClass: "d-flex flex-wrap gap-2" }, [
                          _c(
                            "span",
                            {
                              staticClass: "figma-status-pill",
                              class: _vm.getStatusBadgeClass(
                                _vm.order.active_status
                              ),
                            },
                            [
                              _vm._v(
                                "\n                            " +
                                  _vm._s(
                                    _vm.getStatusLabelById(
                                      _vm.order.active_status
                                    )
                                  ) +
                                  "\n                        "
                              ),
                            ]
                          ),
                          _vm._v(" "),
                          _vm.order.wallet_balance > 0
                            ? _c(
                                "span",
                                {
                                  staticClass:
                                    "figma-status-pill status-wallet",
                                  staticStyle: {
                                    "background-color": "#F1F5F9",
                                    color: "#475569",
                                  },
                                },
                                [
                                  _vm._v(
                                    "\n                            " +
                                      _vm._s(
                                        _vm.__("paid_via_wallet") ||
                                          "Paid via Wallet"
                                      ) +
                                      "\n                        "
                                  ),
                                ]
                              )
                            : _vm._e(),
                        ]),
                      ]
                    ),
                    _vm._v(" "),
                    _c(
                      "button",
                      {
                        staticClass:
                          "btn btn-dark rounded-3 px-4 py-2 d-flex align-items-center gap-2",
                        staticStyle: { "font-weight": "500" },
                        on: { click: _vm.downloadInvoice },
                      },
                      [
                        _c("i", { staticClass: "fa fa-print" }),
                        _vm._v(
                          " " +
                            _vm._s(_vm.__("Print Order") || "Print Order") +
                            "\n                "
                        ),
                      ]
                    ),
                  ]
                ),
                _vm._v(" "),
                _c("div", { staticClass: "order-meta-bar" }, [
                  _c("div", { staticClass: "order-meta-date" }, [
                    _c("i", {
                      staticClass: "far fa-calendar-alt text-secondary",
                      staticStyle: { "font-size": "16px" },
                    }),
                    _vm._v(" "),
                    _c(
                      "span",
                      {
                        staticClass: "text-dark",
                        staticStyle: {
                          "font-weight": "500",
                          "font-size": "16px",
                          "line-height": "24px",
                          "letter-spacing": "0%",
                          color:
                            "var(--Colors-Shades-Neutral-N---950, #000000)",
                        },
                      },
                      [_vm._v(_vm._s(_vm.__("date")) + " :")]
                    ),
                    _vm._v(" "),
                    _c(
                      "span",
                      {
                        staticClass: "text-dark",
                        staticStyle: {
                          "font-weight": "500",
                          "font-size": "16px",
                          "line-height": "24px",
                          "letter-spacing": "0%",
                          color:
                            "var(--Colors-Shades-Neutral-N---950, #000000)",
                        },
                      },
                      [_vm._v(_vm._s(_vm.order.orders_created_at))]
                    ),
                  ]),
                  _vm._v(" "),
                  _vm.order_items && _vm.order_items.length > 0
                    ? _c(
                        "div",
                        { staticClass: "order-meta-seller" },
                        [
                          _c("i", {
                            staticClass: "fas fa-store text-secondary",
                            staticStyle: { "font-size": "15px" },
                          }),
                          _vm._v(" "),
                          _c(
                            "span",
                            {
                              staticClass: "text-dark",
                              staticStyle: {
                                "font-weight": "500",
                                "font-size": "16px",
                                "line-height": "24px",
                                "letter-spacing": "0%",
                                color:
                                  "var(--Colors-Shades-Neutral-N---950, #000000)",
                              },
                            },
                            [_vm._v(_vm._s(_vm.__("seller")) + " :")]
                          ),
                          _vm._v(" "),
                          _vm.login_user.role.name === "Admin" ||
                          _vm.login_user.role.name === "Super Admin"
                            ? [
                                _c(
                                  "router-link",
                                  {
                                    staticStyle: {
                                      "font-weight": "600",
                                      "font-size": "16px",
                                      "line-height": "24px",
                                      "letter-spacing": "0%",
                                      "text-decoration": "underline",
                                      color:
                                        "var(--Colors-Primary, #55AE7B) !important",
                                      display: "inline-flex",
                                      "align-items": "center",
                                      gap: "4px",
                                    },
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
                                      staticStyle: {
                                        "font-size": "14px",
                                        color: "var(--Colors-Primary, #55AE7B)",
                                      },
                                    }),
                                  ]
                                ),
                              ]
                            : [
                                _c(
                                  "span",
                                  {
                                    class:
                                      _vm.login_user.role.name ===
                                      "Delivery Boy"
                                        ? "db-panel-seller-name"
                                        : "normal-seller-name",
                                    staticStyle: {
                                      "font-weight": "600",
                                      "font-size": "16px",
                                      "line-height": "24px",
                                      "letter-spacing": "0%",
                                    },
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
                ]),
              ]
            ),
            _vm._v(" "),
            _c("div", { staticClass: "row g-4" }, [
              _c("div", { staticClass: "col-lg-7" }, [
                _c(
                  "div",
                  { staticClass: "card rounded-4 mb-4 overflow-hidden" },
                  [
                    _c(
                      "div",
                      {
                        staticClass:
                          "card-header bg-white d-flex justify-content-between align-items-center",
                        staticStyle: {
                          height: "68px",
                          padding: "16px 24px",
                          "border-bottom": "1px solid #EDEDED !important",
                        },
                      },
                      [
                        _c(
                          "h5",
                          {
                            staticClass: "mb-0",
                            staticStyle: {
                              "font-family": "'Inter', sans-serif",
                              "font-weight": "600",
                              "font-size": "16px",
                              "line-height": "24px",
                              color: "#000000",
                              display: "flex",
                              "align-items": "center",
                            },
                          },
                          [
                            _c("base-icon", {
                              staticClass: "me-2 text-primary",
                              attrs: {
                                name: "Package",
                                width: "20",
                                height: "20",
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
                        {
                          staticClass: "table-responsive",
                          staticStyle: {
                            "border-radius": "0px !important",
                            border: "none !important",
                            "margin-bottom": "0 !important",
                          },
                        },
                        [
                          _c(
                            "table",
                            {
                              staticClass: "table align-middle mb-0",
                              staticStyle: {
                                "border-collapse": "collapse !important",
                                "border-radius": "0 !important",
                                overflow: "hidden",
                              },
                            },
                            [
                              _c(
                                "thead",
                                {
                                  staticStyle: {
                                    "background-color": "#F7F7F7 !important",
                                    "border-top":
                                      "1px solid #EDEDED !important",
                                    "border-bottom":
                                      "1px solid #EDEDED !important",
                                    "border-left": "none !important",
                                    "border-right": "none !important",
                                    "border-radius": "0px !important",
                                  },
                                },
                                [
                                  _c(
                                    "tr",
                                    { staticStyle: { height: "52px" } },
                                    [
                                      _c(
                                        "th",
                                        {
                                          staticClass: "ps-4",
                                          staticStyle: {
                                            padding: "16px 0 16px 24px",
                                            border: "none !important",
                                            "font-family":
                                              "'Inter', sans-serif",
                                            "font-weight": "600",
                                            "font-size": "14px",
                                            color: "#555555",
                                            "vertical-align": "middle",
                                          },
                                        },
                                        [
                                          _vm._v(
                                            "\n                                            " +
                                              _vm._s(_vm.__("product_name"))
                                          ),
                                        ]
                                      ),
                                      _vm._v(" "),
                                      _c(
                                        "th",
                                        {
                                          staticClass: "text-center",
                                          staticStyle: {
                                            padding: "16px 0",
                                            border: "none !important",
                                            "font-family":
                                              "'Inter', sans-serif",
                                            "font-weight": "600",
                                            "font-size": "14px",
                                            color: "#555555",
                                            "vertical-align": "middle",
                                          },
                                        },
                                        [
                                          _vm._v(
                                            "\n                                            " +
                                              _vm._s(_vm.__("price"))
                                          ),
                                        ]
                                      ),
                                      _vm._v(" "),
                                      _c(
                                        "th",
                                        {
                                          staticClass: "text-center",
                                          staticStyle: {
                                            padding: "16px 0",
                                            border: "none !important",
                                            "font-family":
                                              "'Inter', sans-serif",
                                            "font-weight": "600",
                                            "font-size": "14px",
                                            color: "#555555",
                                            "vertical-align": "middle",
                                          },
                                        },
                                        [
                                          _vm._v(
                                            "\n                                            " +
                                              _vm._s(_vm.__("quantity"))
                                          ),
                                        ]
                                      ),
                                      _vm._v(" "),
                                      _c(
                                        "th",
                                        {
                                          staticClass: "text-end pe-4",
                                          staticStyle: {
                                            padding: "16px 24px 16px 0",
                                            border: "none !important",
                                            "font-family":
                                              "'Inter', sans-serif",
                                            "font-weight": "600",
                                            "font-size": "14px",
                                            color: "#555555",
                                            "vertical-align": "middle",
                                          },
                                        },
                                        [
                                          _vm._v(
                                            "\n                                            " +
                                              _vm._s(_vm.__("total"))
                                          ),
                                        ]
                                      ),
                                      _vm._v(" "),
                                      _vm.login_user &&
                                      (_vm.login_user.role.name === "Admin" ||
                                        _vm.login_user.role.name ===
                                          "Super Admin")
                                        ? _c(
                                            "th",
                                            {
                                              staticClass: "text-center",
                                              staticStyle: {
                                                padding: "16px 24px",
                                                border: "none !important",
                                                "font-family":
                                                  "'Inter', sans-serif",
                                                "font-weight": "600",
                                                "font-size": "14px",
                                                color: "#555555",
                                                "vertical-align": "middle",
                                              },
                                            },
                                            [
                                              _vm._v(
                                                "\n                                            " +
                                                  _vm._s(
                                                    _vm.__("Action") || "Action"
                                                  )
                                              ),
                                            ]
                                          )
                                        : _vm._e(),
                                    ]
                                  ),
                                ]
                              ),
                              _vm._v(" "),
                              _c(
                                "tbody",
                                _vm._l(_vm.order_items, function (item) {
                                  return _c(
                                    "tr",
                                    {
                                      key: item.id,
                                      staticStyle: {
                                        height: "96px",
                                        "border-bottom":
                                          "1px solid #EDEDED !important",
                                      },
                                    },
                                    [
                                      _c(
                                        "td",
                                        {
                                          staticClass: "ps-4",
                                          staticStyle: {
                                            padding: "24px 0 24px 24px",
                                            border: "none !important",
                                            "vertical-align": "middle",
                                            "text-align": "left !important",
                                          },
                                        },
                                        [
                                          _c(
                                            "div",
                                            {
                                              staticClass:
                                                "d-flex align-items-center py-2",
                                              staticStyle: {
                                                gap: "8px !important",
                                                "text-align": "left !important",
                                              },
                                            },
                                            [
                                              _c("img", {
                                                staticClass: "rounded-3 border",
                                                staticStyle: {
                                                  width: "48px",
                                                  height: "48px",
                                                  "object-fit": "cover",
                                                },
                                                attrs: { src: item.image },
                                              }),
                                              _vm._v(" "),
                                              _c(
                                                "div",
                                                {
                                                  staticStyle: {
                                                    "text-align":
                                                      "left !important",
                                                  },
                                                },
                                                [
                                                  _c(
                                                    "div",
                                                    {
                                                      staticStyle: {
                                                        "font-family":
                                                          "'Inter', sans-serif",
                                                        "font-weight": "600",
                                                        "font-size": "14px",
                                                        "line-height": "20px",
                                                        color: "#555555",
                                                        "text-align":
                                                          "left !important",
                                                      },
                                                    },
                                                    [
                                                      _vm._v(
                                                        "\n                                                        " +
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
                                                      staticStyle: {
                                                        "font-family":
                                                          "'Inter', sans-serif",
                                                        "font-weight": "400",
                                                        "font-size": "12px",
                                                        "line-height": "16px",
                                                        color: "#71717A",
                                                        "text-align":
                                                          "left !important",
                                                      },
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
                                                          staticStyle: {
                                                            "font-family":
                                                              "'Inter', sans-serif",
                                                            "font-weight":
                                                              "400",
                                                            "font-size": "12px",
                                                            "line-height":
                                                              "16px",
                                                            color: "#71717A",
                                                            "text-align":
                                                              "left !important",
                                                          },
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
                                                                  "position-relative border rounded p-1",
                                                                staticStyle: {
                                                                  width: "40px",
                                                                  height:
                                                                    "40px",
                                                                  cursor:
                                                                    "pointer",
                                                                },
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
                                                          staticStyle: {
                                                            "font-family":
                                                              "'Inter', sans-serif",
                                                            "font-weight":
                                                              "600",
                                                            "font-size": "12px",
                                                            "line-height":
                                                              "16px",
                                                            color:
                                                              "var(--Colors-Status-Error, #D63031)",
                                                            "text-align":
                                                              "left !important",
                                                            "margin-top": "4px",
                                                          },
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
                                          staticClass: "text-center",
                                          staticStyle: {
                                            padding: "24px 0",
                                            border: "none !important",
                                            "font-family":
                                              "'Inter', sans-serif",
                                            "font-weight": "500",
                                            "font-size": "16px",
                                            "line-height": "24px",
                                            color: "#000000",
                                            "vertical-align": "middle",
                                          },
                                        },
                                        [
                                          _vm._v(
                                            "\n                                            " +
                                              _vm._s(_vm.$currency) +
                                              _vm._s(item.price)
                                          ),
                                        ]
                                      ),
                                      _vm._v(" "),
                                      _c(
                                        "td",
                                        {
                                          staticClass: "text-center",
                                          staticStyle: {
                                            padding: "24px 0",
                                            border: "none !important",
                                            "font-family":
                                              "'Inter', sans-serif",
                                            "font-weight": "500",
                                            "font-size": "16px",
                                            "line-height": "24px",
                                            color: "#000000",
                                            "vertical-align": "middle",
                                          },
                                        },
                                        [
                                          _vm._v(
                                            "\n                                            " +
                                              _vm._s(item.quantity)
                                          ),
                                        ]
                                      ),
                                      _vm._v(" "),
                                      _c(
                                        "td",
                                        {
                                          staticClass: "text-end pe-4",
                                          staticStyle: {
                                            padding: "24px 24px 24px 0",
                                            border: "none !important",
                                            "font-family":
                                              "'Inter', sans-serif",
                                            "font-weight": "500",
                                            "font-size": "16px",
                                            "line-height": "24px",
                                            color: "#000000",
                                            "vertical-align": "middle",
                                          },
                                        },
                                        [
                                          _vm._v(
                                            "\n                                            " +
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
                                              staticClass: "text-center",
                                              staticStyle: {
                                                padding: "24px 24px",
                                                border: "none !important",
                                                "font-family":
                                                  "'Inter', sans-serif",
                                                "font-weight": "500",
                                                "font-size": "16px",
                                                "line-height": "24px",
                                                color: "#000000",
                                                "vertical-align": "middle",
                                              },
                                            },
                                            [
                                              Number(item.active_status) === 7
                                                ? _c(
                                                    "span",
                                                    {
                                                      staticStyle: {
                                                        "font-family":
                                                          "'Inter', sans-serif",
                                                        "font-weight": "500",
                                                        "font-size": "14px",
                                                        "line-height": "20px",
                                                        "letter-spacing": "0%",
                                                        "text-align": "center",
                                                        "vertical-align":
                                                          "middle",
                                                        color:
                                                          "var(--Colors-Status-Error, #D63031)",
                                                        display: "inline-block",
                                                      },
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
                                                        "btn p-0 border-0 d-inline-flex align-items-center justify-content-center cancel-item-btn",
                                                      staticStyle: {
                                                        width: "28px",
                                                        height: "28px",
                                                        "border-radius": "8px",
                                                        background:
                                                          "var(--Colors-Status-Shades-E---50, #FBEAEA)",
                                                        padding: "4px",
                                                        transition: "all 0.2s",
                                                        outline: "none",
                                                        margin: "0 auto",
                                                      },
                                                      attrs: {
                                                        title:
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
                                                        staticStyle: {
                                                          color:
                                                            "var(--Colors-Status-Error, #D63031)",
                                                        },
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
                  ]
                ),
                _vm._v(" "),
                _c("div", { staticClass: "row g-4 mb-4" }, [
                  this.$roleDeliveryBoy !== this.login_user.role.name
                    ? _c("div", { staticClass: "col-md-6" }, [
                        _c(
                          "div",
                          {
                            staticClass: "card border mb-4",
                            staticStyle: {
                              "max-width": "436px",
                              width: "100%",
                              height: "140px",
                              "border-radius": "16px",
                              border: "1px solid #EDEDED !important",
                              overflow: "hidden",
                              display: "flex",
                              "flex-direction": "column",
                              padding: "0",
                            },
                          },
                          [
                            _c(
                              "div",
                              {
                                staticStyle: {
                                  height: "68px",
                                  padding: "16px 24px",
                                  "border-bottom": "1px solid #EDEDED",
                                  display: "flex",
                                  "align-items": "center",
                                },
                              },
                              [
                                _c("base-icon", {
                                  staticClass: "me-2",
                                  attrs: {
                                    name: "Vector (1)",
                                    width: "20",
                                    height: "20",
                                  },
                                }),
                                _vm._v(" "),
                                _c(
                                  "span",
                                  {
                                    staticStyle: {
                                      "font-family": "'Inter', sans-serif",
                                      "font-weight": "600",
                                      "font-size": "16px",
                                      "line-height": "24px",
                                      color: "#000000",
                                    },
                                  },
                                  [
                                    _vm._v(
                                      _vm._s(
                                        _vm.__("assign_delivery_partner") ||
                                          "Assign Delivery Partner"
                                      )
                                    ),
                                  ]
                                ),
                              ],
                              1
                            ),
                            _vm._v(" "),
                            _c(
                              "div",
                              {
                                staticStyle: {
                                  flex: "1",
                                  padding: "16px",
                                  display: "flex",
                                  "align-items": "center",
                                  gap: "12px",
                                },
                              },
                              [
                                _c(
                                  "form",
                                  {
                                    staticClass:
                                      "d-flex align-items-center gap-2 w-100",
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
                                        staticStyle: {
                                          width: "300px",
                                          height: "40px",
                                          "border-radius": "8px",
                                          border: "1px solid #EDEDED",
                                          padding: "8px 16px",
                                          "font-size": "14px",
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
                                            _vm._s(
                                              _vm.__("select_delivery_boy")
                                            )
                                          ),
                                        ]),
                                        _vm._v(" "),
                                        _vm._l(
                                          _vm.deliveryBoys,
                                          function (boy) {
                                            return _c(
                                              "option",
                                              { domProps: { value: boy.id } },
                                              [
                                                _vm._v(
                                                  "\n                                            " +
                                                    _vm._s(
                                                      _vm.getDisplayName(
                                                        boy.name
                                                      )
                                                    ) +
                                                    " (" +
                                                    _vm._s(
                                                      boy.pending_order_count
                                                    ) +
                                                    ")\n                                        "
                                                ),
                                              ]
                                            )
                                          }
                                        ),
                                      ],
                                      2
                                    ),
                                    _vm._v(" "),
                                    _c(
                                      "button",
                                      {
                                        staticClass: "btn btn-primary p-0",
                                        staticStyle: {
                                          width: "88px",
                                          height: "40px",
                                          "border-radius": "8px",
                                          "font-weight": "600",
                                          "background-color":
                                            "var(--figma-primary, #FF9900) !important",
                                          "border-color":
                                            "var(--figma-primary, #FF9900) !important",
                                          display: "flex",
                                          "align-items": "center",
                                          "justify-content": "center",
                                          "font-size": "14px",
                                          color: "#FFFFFF !important",
                                        },
                                        attrs: {
                                          type: "submit",
                                          disabled:
                                            _vm.delivery_boy_id === "" ||
                                            _vm.isLoadingDboy,
                                        },
                                      },
                                      [
                                        _vm._v(
                                          "\n                                        " +
                                            _vm._s(
                                              _vm.__("assign") || "Assign"
                                            ) +
                                            "\n                                    "
                                        ),
                                      ]
                                    ),
                                  ]
                                ),
                              ]
                            ),
                          ]
                        ),
                      ])
                    : _vm._e(),
                  _vm._v(" "),
                  _c(
                    "div",
                    {
                      staticClass: "col-md-6",
                      attrs: { id: "assign_partner_section" },
                    },
                    [
                      _c(
                        "div",
                        {
                          staticClass: "card border mb-4",
                          staticStyle: {
                            "max-width": "436px",
                            width: "100%",
                            height: "140px",
                            "border-radius": "16px",
                            border: "1px solid #EDEDED !important",
                            overflow: "hidden",
                            display: "flex",
                            "flex-direction": "column",
                            padding: "0",
                          },
                        },
                        [
                          _c(
                            "div",
                            {
                              staticStyle: {
                                height: "68px",
                                padding: "16px",
                                "border-bottom": "1px solid #EDEDED",
                                display: "flex",
                                "align-items": "center",
                              },
                            },
                            [
                              _c("base-icon", {
                                staticClass: "me-2",
                                attrs: {
                                  name: "CheckCircle",
                                  width: "20",
                                  height: "20",
                                },
                              }),
                              _vm._v(" "),
                              _c(
                                "span",
                                {
                                  staticStyle: {
                                    "font-family": "'Inter', sans-serif",
                                    "font-weight": "600",
                                    "font-size": "16px",
                                    "line-height": "24px",
                                    color: "#000000",
                                  },
                                },
                                [
                                  _vm._v(
                                    _vm._s(
                                      _vm.__("order_status") || "Order Status"
                                    )
                                  ),
                                ]
                              ),
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _c(
                            "div",
                            {
                              staticStyle: {
                                flex: "1",
                                padding: "16px",
                                display: "flex",
                                "align-items": "center",
                                gap: "12px",
                              },
                            },
                            [
                              _c(
                                "form",
                                {
                                  staticClass:
                                    "d-flex align-items-center gap-2 w-100",
                                  on: {
                                    submit: function ($event) {
                                      $event.preventDefault()
                                      return _vm.updateStatus.apply(
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
                                          value: _vm.order_status_id,
                                          expression: "order_status_id",
                                        },
                                      ],
                                      staticClass: "form-select",
                                      staticStyle: {
                                        width: "300px",
                                        height: "40px",
                                        "border-radius": "8px",
                                        border: "1px solid #EDEDED",
                                        padding: "8px 16px",
                                        "font-size": "14px",
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
                                          _vm.order_status_id = $event.target
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
                                            _vm.__("choose_status") ||
                                              "Choose Status"
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
                                                "\n                                        "
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
                                      staticClass: "btn btn-primary p-0",
                                      staticStyle: {
                                        width: "88px",
                                        height: "40px",
                                        "border-radius": "8px",
                                        "font-weight": "600",
                                        "background-color":
                                          "var(--figma-primary, #FF9900) !important",
                                        "border-color":
                                          "var(--figma-primary, #FF9900) !important",
                                        display: "flex",
                                        "align-items": "center",
                                        "justify-content": "center",
                                        "font-size": "14px",
                                        color: "#FFFFFF !important",
                                      },
                                      attrs: {
                                        type: "submit",
                                        disabled:
                                          _vm.order_status_id === "" ||
                                          _vm.isLoadingUstatus,
                                      },
                                    },
                                    [
                                      _vm._v(
                                        "\n                                        " +
                                          _vm._s(_vm.__("update") || "Update") +
                                          "\n                                    "
                                      ),
                                    ]
                                  ),
                                ]
                              ),
                            ]
                          ),
                        ]
                      ),
                    ]
                  ),
                ]),
                _vm._v(" "),
                _vm.order.order_note
                  ? _c(
                      "div",
                      {
                        staticClass: "card border mb-4 order-notes-card",
                        staticStyle: {
                          width: "100%",
                          "border-radius": "16px",
                          border: "1px solid #EDEDED !important",
                          overflow: "hidden",
                          display: "flex",
                          "flex-direction": "column",
                          padding: "0",
                        },
                      },
                      [
                        _c(
                          "div",
                          {
                            staticStyle: {
                              height: "68px",
                              padding: "16px 24px",
                              "border-bottom": "1px solid #EDEDED",
                              display: "flex",
                              "align-items": "center",
                            },
                          },
                          [
                            _c("i", {
                              staticClass:
                                "far fa-calendar-check me-2 text-dark",
                              staticStyle: { "font-size": "20px" },
                            }),
                            _vm._v(" "),
                            _c(
                              "span",
                              {
                                staticClass: "order-notes-title",
                                staticStyle: {
                                  "font-family": "'Inter', sans-serif",
                                  "font-weight": "600",
                                  "font-size": "16px",
                                  "line-height": "24px",
                                  color: "#000000",
                                },
                              },
                              [
                                _vm._v(
                                  "\n                            " +
                                    _vm._s(
                                      _vm.__("Customer Order Notes") ||
                                        "Customer Order Notes"
                                    ) +
                                    "\n                        "
                                ),
                              ]
                            ),
                          ]
                        ),
                        _vm._v(" "),
                        _c("div", { staticClass: "card-body p-4" }, [
                          _c(
                            "div",
                            {
                              staticClass: "order-notes-box",
                              staticStyle: {
                                "background-color": "#EBF5FF",
                                "border-left": "4px solid #3B82F6",
                                "border-radius": "12px",
                                padding: "16px 20px",
                                "text-align": "left !important",
                              },
                            },
                            [
                              _c(
                                "p",
                                {
                                  staticClass: "mb-0 order-notes-text",
                                  staticStyle: {
                                    "font-family": "'Inter', sans-serif",
                                    "font-size": "14px",
                                    "line-height": "22px",
                                    "font-weight": "500",
                                    color: "#1E293B",
                                  },
                                },
                                [
                                  _vm._v(
                                    "\n                                " +
                                      _vm._s(_vm.order.order_note) +
                                      "\n                            "
                                  ),
                                ]
                              ),
                            ]
                          ),
                        ]),
                      ]
                    )
                  : _vm._e(),
                _vm._v(" "),
                _vm.order.delivery_boy_name ||
                _vm.getDisplayName(_vm.order.delivery_boy_name_translation)
                  ? _c(
                      "div",
                      {
                        staticClass: "card border mb-4",
                        staticStyle: {
                          "max-width": "436px",
                          width: "100%",
                          height: "140px",
                          "border-radius": "16px",
                          border: "1px solid #EDEDED !important",
                          overflow: "hidden",
                          display: "flex",
                          "flex-direction": "column",
                          padding: "0",
                        },
                      },
                      [
                        _c(
                          "div",
                          {
                            staticStyle: {
                              height: "68px",
                              padding: "16px",
                              "border-bottom": "1px solid #EDEDED",
                              display: "flex",
                              "align-items": "center",
                              "justify-content": "space-between",
                            },
                          },
                          [
                            _c(
                              "div",
                              { staticClass: "d-flex align-items-center" },
                              [
                                _c("base-icon", {
                                  staticClass: "me-2",
                                  class:
                                    _vm.login_user.role.name === "Delivery Boy"
                                      ? "db-panel-truck-icon"
                                      : "normal-truck-icon",
                                  attrs: {
                                    name: "Vector (1)",
                                    width: "20",
                                    height: "20",
                                    "use-current-color": true,
                                  },
                                }),
                                _vm._v(" "),
                                _c(
                                  "span",
                                  {
                                    class:
                                      _vm.login_user.role.name ===
                                      "Delivery Boy"
                                        ? "db-panel-delivery-title"
                                        : "normal-delivery-title",
                                    staticStyle: {
                                      "font-family": "'Inter', sans-serif",
                                      "font-weight": "600",
                                      "font-size": "16px",
                                      "line-height": "24px",
                                    },
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
                          ]
                        ),
                        _vm._v(" "),
                        _c(
                          "div",
                          {
                            staticStyle: {
                              flex: "1",
                              padding: "16px",
                              display: "flex",
                              "align-items": "center",
                              gap: "24px",
                            },
                          },
                          [
                            _c(
                              "div",
                              {
                                staticClass:
                                  "avatar-box bg-light rounded-circle d-flex align-items-center justify-content-center fw-bold text-primary",
                                staticStyle: {
                                  width: "48px",
                                  height: "48px",
                                  "font-size": "18px",
                                  "flex-shrink": "0",
                                },
                              },
                              [
                                _vm._v(
                                  "\n                            " +
                                    _vm._s(
                                      _vm.order.delivery_boy_name
                                        ? _vm.order.delivery_boy_name
                                            .charAt(0)
                                            .toUpperCase()
                                        : "D"
                                    ) +
                                    "\n                        "
                                ),
                              ]
                            ),
                            _vm._v(" "),
                            _c("div", [
                              _c(
                                "div",
                                {
                                  staticClass: "fw-bold text-dark mb-1",
                                  staticStyle: { "font-size": "16px" },
                                },
                                [
                                  _vm._v(
                                    _vm._s(
                                      _vm.getDisplayName(
                                        _vm.order.delivery_boy_name_translation
                                      ) || _vm.order.delivery_boy_name
                                    ) + "\n                            "
                                  ),
                                ]
                              ),
                              _vm._v(" "),
                              _c(
                                "div",
                                {
                                  staticClass: "text-muted",
                                  staticStyle: { "font-size": "14px" },
                                },
                                [
                                  _vm._v(
                                    "+" + _vm._s(_vm.order.delivery_boy_mobile)
                                  ),
                                ]
                              ),
                            ]),
                          ]
                        ),
                      ]
                    )
                  : _vm._e(),
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "col-lg-5" }, [
                _c(
                  "div",
                  {
                    staticClass: "card border mb-4",
                    staticStyle: {
                      "border-radius": "16px",
                      border: "1px solid #EDEDED !important",
                      overflow: "hidden",
                      display: "flex",
                      "flex-direction": "column",
                      padding: "0",
                    },
                  },
                  [
                    _c(
                      "div",
                      {
                        staticStyle: {
                          height: "68px",
                          padding: "16px",
                          "border-bottom": "1px solid #EDEDED",
                          display: "flex",
                          "align-items": "center",
                        },
                      },
                      [
                        _c("base-icon", {
                          staticClass: "me-2",
                          attrs: { name: "User", width: "20", height: "20" },
                        }),
                        _vm._v(" "),
                        _c(
                          "span",
                          {
                            staticStyle: {
                              "font-family": "'Inter', sans-serif",
                              "font-weight": "600",
                              "font-size": "16px",
                              "line-height": "24px",
                              color: "#000000",
                            },
                          },
                          [
                            _vm._v(
                              _vm._s(
                                _vm.__("customer_details") || "Customer Details"
                              )
                            ),
                          ]
                        ),
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _c(
                      "div",
                      {
                        staticClass: "card-body p-4",
                        staticStyle: { "text-align": "left !important" },
                      },
                      [
                        _c(
                          "div",
                          {
                            staticClass: "d-flex align-items-center mb-4",
                            staticStyle: {
                              gap: "12px",
                              "text-align": "left !important",
                            },
                          },
                          [
                            _c(
                              "div",
                              {
                                staticClass:
                                  "avatar-box bg-light d-flex align-items-center justify-content-center fw-bold text-primary overflow-hidden",
                                staticStyle: {
                                  width: "48px",
                                  height: "48px",
                                  "font-size": "18px",
                                  "flex-shrink": "0",
                                  "border-radius": "8px",
                                },
                              },
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
                              {
                                staticStyle: {
                                  "text-align": "left !important",
                                },
                              },
                              [
                                _c(
                                  "div",
                                  {
                                    staticClass: "text-dark mb-1",
                                    staticStyle: {
                                      "font-family": "'Inter', sans-serif",
                                      "font-weight": "500",
                                      "font-size": "16px",
                                      "line-height": "24px",
                                      "text-align": "left !important",
                                    },
                                  },
                                  [
                                    _vm._v(
                                      "\n                                    " +
                                        _vm._s(_vm.order.user_name)
                                    ),
                                  ]
                                ),
                                _vm._v(" "),
                                _c(
                                  "div",
                                  {
                                    staticClass: "text-muted small",
                                    staticStyle: {
                                      "text-align": "left !important",
                                    },
                                  },
                                  [
                                    _vm._v(
                                      _vm._s(
                                        _vm.__("Customer Joined") ||
                                          "Customer Joined"
                                      ) +
                                        ":\n                                    "
                                    ),
                                    _c(
                                      "span",
                                      { staticClass: "fw-bold text-dark" },
                                      [
                                        _vm._v(
                                          _vm._s(
                                            _vm.formatDate(
                                              _vm.order.user_created_at
                                            ) || "N/A"
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
                        _c("div", {
                          staticStyle: {
                            "border-top": "1px solid #EDEDED",
                            "margin-bottom": "24px",
                          },
                        }),
                        _vm._v(" "),
                        _c("div", { staticClass: "mb-4" }, [
                          _c(
                            "div",
                            { staticClass: "d-flex align-items-center mb-1" },
                            [
                              _c("base-icon", {
                                staticStyle: { "margin-right": "12px" },
                                attrs: {
                                  name: "Envelope",
                                  width: "20",
                                  height: "20",
                                },
                              }),
                              _vm._v(" "),
                              _c(
                                "div",
                                {
                                  staticStyle: {
                                    "font-family": "'Inter', sans-serif",
                                    "font-weight": "400",
                                    "font-size": "14px",
                                    "line-height": "20px",
                                    color: "#333333",
                                  },
                                },
                                [
                                  _vm._v(
                                    "\n                                    " +
                                      _vm._s(
                                        _vm.__("Email Address") ||
                                          "Email Address"
                                      )
                                  ),
                                ]
                              ),
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _c(
                            "div",
                            {
                              staticStyle: {
                                "font-family": "'Inter', sans-serif",
                                "font-weight": "600",
                                "font-size": "14px",
                                "line-height": "20px",
                                color: "#000000",
                                "margin-left": "32px",
                              },
                            },
                            [
                              _vm._v(
                                "\n                                " +
                                  _vm._s(_vm.order.user_email)
                              ),
                            ]
                          ),
                        ]),
                        _vm._v(" "),
                        _c("div", { staticClass: "mb-2" }, [
                          _c(
                            "div",
                            { staticClass: "d-flex align-items-center mb-1" },
                            [
                              _c("base-icon", {
                                staticStyle: { "margin-right": "12px" },
                                attrs: {
                                  name: "Phone",
                                  width: "20",
                                  height: "20",
                                },
                              }),
                              _vm._v(" "),
                              _c(
                                "div",
                                {
                                  staticStyle: {
                                    "font-family": "'Inter', sans-serif",
                                    "font-weight": "400",
                                    "font-size": "14px",
                                    "line-height": "20px",
                                    color: "#333333",
                                  },
                                },
                                [
                                  _vm._v(
                                    "\n                                    " +
                                      _vm._s(
                                        _vm.__("Phone Number") || "Phone Number"
                                      )
                                  ),
                                ]
                              ),
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _c(
                            "div",
                            {
                              staticStyle: {
                                "font-family": "'Inter', sans-serif",
                                "font-weight": "600",
                                "font-size": "14px",
                                "line-height": "20px",
                                color: "#000000",
                                "margin-left": "32px",
                              },
                            },
                            [
                              _vm._v(
                                "\n                                " +
                                  _vm._s(_vm.order.user_mobile)
                              ),
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
                  {
                    staticClass: "card border mb-4",
                    staticStyle: {
                      "border-radius": "16px",
                      border: "1px solid #EDEDED !important",
                      overflow: "hidden",
                      display: "flex",
                      "flex-direction": "column",
                      padding: "0",
                    },
                  },
                  [
                    _c(
                      "div",
                      {
                        staticStyle: {
                          height: "68px",
                          padding: "16px",
                          "border-bottom": "1px solid #EDEDED",
                          display: "flex",
                          "align-items": "center",
                        },
                      },
                      [
                        _c("base-icon", {
                          staticClass: "me-2",
                          attrs: {
                            name: "MapPinLine",
                            width: "20",
                            height: "20",
                          },
                        }),
                        _vm._v(" "),
                        _c(
                          "span",
                          {
                            staticStyle: {
                              "font-family": "'Inter', sans-serif",
                              "font-weight": "600",
                              "font-size": "16px",
                              "line-height": "24px",
                              color: "#000000",
                            },
                          },
                          [
                            _vm._v(
                              _vm._s(
                                _vm.__("shipping_address") || "Shipping Address"
                              )
                            ),
                          ]
                        ),
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _c("div", { staticClass: "card-body p-4" }, [
                      _c("div", { staticClass: "mb-4" }, [
                        _c(
                          "div",
                          {
                            staticClass: "d-flex align-items-center mb-2",
                            staticStyle: { gap: "8px" },
                          },
                          [
                            _c(
                              "span",
                              {
                                staticStyle: {
                                  "font-family": "'Inter', sans-serif",
                                  "font-weight": "600",
                                  "font-size": "14px",
                                  "line-height": "20px",
                                  color: "#000000",
                                },
                              },
                              [
                                _vm._v(
                                  _vm._s(
                                    _vm.__("Home Address") || "Home Address"
                                  )
                                ),
                              ]
                            ),
                            _vm._v(" "),
                            _c(
                              "span",
                              {
                                staticStyle: {
                                  color: "#555555",
                                  "font-size": "14px",
                                },
                              },
                              [_vm._v("-")]
                            ),
                            _vm._v(" "),
                            _c("div", { staticClass: "figma-default-badge" }, [
                              _c("span", [
                                _vm._v(_vm._s(_vm.__("Default") || "Default")),
                              ]),
                            ]),
                          ]
                        ),
                        _vm._v(" "),
                        _c(
                          "p",
                          {
                            staticClass: "text-muted mb-0",
                            staticStyle: {
                              "font-size": "14px",
                              "line-height": "1.5",
                              color: "#555555 !important",
                            },
                          },
                          [
                            _vm._v(
                              "\n                                " +
                                _vm._s(_vm.order.order_address) +
                                "\n                            "
                            ),
                          ]
                        ),
                      ]),
                      _vm._v(" "),
                      _vm.order.delivery_time &&
                      !_vm.order.delivery_time.includes("1970") &&
                      _vm.order.delivery_time.trim() !== "" &&
                      _vm.order.delivery_time !== "N/A"
                        ? _c(
                            "div",
                            {
                              staticClass:
                                "d-flex flex-column justify-content-center p-3 delivery-time-box",
                            },
                            [
                              _c(
                                "div",
                                {
                                  staticStyle: {
                                    "font-family": "'Inter', sans-serif",
                                    "font-weight": "500",
                                    "font-size": "14px",
                                    "line-height": "20px",
                                    color: "#D63031",
                                    "margin-bottom": "4px",
                                  },
                                },
                                [
                                  _vm._v(
                                    "\n                                " +
                                      _vm._s(
                                        _vm.__("Delivery Time & Date") ||
                                          "Delivery Time & Date"
                                      )
                                  ),
                                ]
                              ),
                              _vm._v(" "),
                              _c(
                                "div",
                                {
                                  staticClass: "text-dark fw-bold",
                                  staticStyle: {
                                    "font-size": "16px",
                                    "line-height": "24px",
                                  },
                                },
                                [
                                  _vm._v(
                                    _vm._s(_vm.order.delivery_time) +
                                      "\n                            "
                                  ),
                                ]
                              ),
                            ]
                          )
                        : _vm._e(),
                    ]),
                  ]
                ),
                _vm._v(" "),
                _c(
                  "div",
                  {
                    staticClass: "card border mb-4",
                    staticStyle: {
                      "border-radius": "16px",
                      border: "1px solid #EDEDED !important",
                      overflow: "hidden",
                      display: "flex",
                      "flex-direction": "column",
                      padding: "0",
                    },
                  },
                  [
                    _c(
                      "div",
                      {
                        staticStyle: {
                          height: "68px",
                          padding: "16px",
                          "border-bottom": "1px solid #EDEDED",
                          display: "flex",
                          "align-items": "center",
                        },
                      },
                      [
                        _c("base-icon", {
                          staticClass: "me-2",
                          attrs: { name: "Receipt", width: "20", height: "20" },
                        }),
                        _vm._v(" "),
                        _c(
                          "span",
                          {
                            staticStyle: {
                              "font-family": "'Inter', sans-serif",
                              "font-weight": "600",
                              "font-size": "16px",
                              "line-height": "24px",
                              color: "#000000",
                            },
                          },
                          [_vm._v(_vm._s(_vm.__("Billing Summary")))]
                        ),
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _c("div", { staticClass: "card-body p-4" }, [
                      _c("div", { staticClass: "billing-list" }, [
                        _c(
                          "div",
                          {
                            staticClass: "d-flex justify-content-between mb-4",
                          },
                          [
                            _c(
                              "span",
                              {
                                staticStyle: {
                                  "font-family": "'Inter', sans-serif",
                                  "font-weight": "600",
                                  "font-size": "16px",
                                  "line-height": "24px",
                                  color: "#000000",
                                },
                              },
                              [
                                _vm._v(
                                  _vm._s(_vm.__("Subtotal") || "Subtotal") +
                                    "\n                                    (" +
                                    _vm._s(_vm.activeOrderItems.length) +
                                    " " +
                                    _vm._s(_vm.__("items") || "items") +
                                    ")"
                                ),
                              ]
                            ),
                            _vm._v(" "),
                            _c(
                              "span",
                              {
                                staticStyle: {
                                  "font-family": "'Inter', sans-serif",
                                  "font-weight": "600",
                                  "font-size": "16px",
                                  "line-height": "24px",
                                  color: "#000000",
                                },
                              },
                              [
                                _vm._v(
                                  _vm._s(_vm.$currency) +
                                    _vm._s(_vm.activeSubtotal.toFixed(2))
                                ),
                              ]
                            ),
                          ]
                        ),
                        _vm._v(" "),
                        _c("div", {
                          staticStyle: {
                            "border-top": "1px solid #EDEDED",
                            "margin-bottom": "24px",
                          },
                        }),
                        _vm._v(" "),
                        _vm.activeAddonTotal > 0
                          ? _c(
                              "div",
                              {
                                staticClass:
                                  "d-flex justify-content-between mb-4",
                                staticStyle: {
                                  height: "24px",
                                  "align-items": "center",
                                },
                              },
                              [
                                _c(
                                  "span",
                                  {
                                    staticStyle: {
                                      "font-family": "'Inter', sans-serif",
                                      "font-weight": "400",
                                      "font-size": "16px",
                                      "line-height": "24px",
                                      color: "#000000",
                                    },
                                  },
                                  [_vm._v(_vm._s(_vm.__("addons") || "Addons"))]
                                ),
                                _vm._v(" "),
                                _c(
                                  "span",
                                  {
                                    staticStyle: {
                                      "font-family": "'Inter', sans-serif",
                                      "font-weight": "600",
                                      "font-size": "14px",
                                      "line-height": "20px",
                                      color: "#000000",
                                    },
                                  },
                                  [
                                    _vm._v(
                                      _vm._s(_vm.$currency) +
                                        _vm._s(_vm.activeAddonTotal.toFixed(2))
                                    ),
                                  ]
                                ),
                              ]
                            )
                          : _vm._e(),
                        _vm._v(" "),
                        _vm.order.discount > 0
                          ? _c(
                              "div",
                              {
                                staticClass:
                                  "d-flex justify-content-between mb-4",
                                staticStyle: {
                                  height: "20px",
                                  "align-items": "center",
                                },
                              },
                              [
                                _c(
                                  "span",
                                  {
                                    staticStyle: {
                                      "font-family": "'Inter', sans-serif",
                                      "font-weight": "500",
                                      "font-size": "14px",
                                      "line-height": "20px",
                                      color: "#D63031",
                                    },
                                  },
                                  [
                                    _vm._v(
                                      _vm._s(_vm.__("Discount") || "Discount") +
                                        "\n                                    (" +
                                        _vm._s(_vm.order.discount) +
                                        "%)"
                                    ),
                                  ]
                                ),
                                _vm._v(" "),
                                _c(
                                  "span",
                                  {
                                    staticStyle: {
                                      "font-family": "'Inter', sans-serif",
                                      "font-weight": "500",
                                      "font-size": "14px",
                                      "line-height": "20px",
                                      color: "#D63031",
                                    },
                                  },
                                  [
                                    _vm._v(
                                      "-" +
                                        _vm._s(_vm.$currency) +
                                        _vm._s(_vm.discount_in_rupees)
                                    ),
                                  ]
                                ),
                              ]
                            )
                          : _vm._e(),
                        _vm._v(" "),
                        _c(
                          "div",
                          {
                            staticClass: "d-flex justify-content-between mb-4",
                            staticStyle: {
                              height: "24px",
                              "align-items": "center",
                            },
                          },
                          [
                            _c(
                              "span",
                              {
                                staticStyle: {
                                  "font-family": "'Inter', sans-serif",
                                  "font-weight": "400",
                                  "font-size": "16px",
                                  "line-height": "24px",
                                  color: "#000000",
                                },
                              },
                              [
                                _vm._v(
                                  _vm._s(
                                    _vm.__("Delivery Charges") ||
                                      "Delivery Charges"
                                  )
                                ),
                              ]
                            ),
                            _vm._v(" "),
                            _vm.order.delivery_charge == 0
                              ? _c(
                                  "span",
                                  {
                                    staticStyle: {
                                      "font-family": "'Inter', sans-serif",
                                      "font-weight": "600",
                                      "font-size": "14px",
                                      "line-height": "20px",
                                      color: "#000000",
                                    },
                                  },
                                  [_vm._v(_vm._s(_vm.__("Free") || "Free"))]
                                )
                              : _c(
                                  "span",
                                  {
                                    staticStyle: {
                                      "font-family": "'Inter', sans-serif",
                                      "font-weight": "600",
                                      "font-size": "14px",
                                      "line-height": "20px",
                                      color: "#000000",
                                    },
                                  },
                                  [
                                    _vm._v(
                                      _vm._s(_vm.$currency) +
                                        _vm._s(_vm.order.delivery_charge)
                                    ),
                                  ]
                                ),
                          ]
                        ),
                        _vm._v(" "),
                        _vm.getAdditionalChargesTotal(
                          _vm.order.additional_charges
                        ) > 0
                          ? _c(
                              "div",
                              {
                                staticClass:
                                  "d-flex justify-content-between mb-4",
                                staticStyle: {
                                  height: "24px",
                                  "align-items": "center",
                                },
                              },
                              [
                                _c(
                                  "span",
                                  {
                                    staticStyle: {
                                      "font-family": "'Inter', sans-serif",
                                      "font-weight": "400",
                                      "font-size": "16px",
                                      "line-height": "24px",
                                      color: "#000000",
                                    },
                                  },
                                  [
                                    _vm._v(
                                      _vm._s(
                                        _vm.__("Additional Charges") ||
                                          "Additional Charges"
                                      )
                                    ),
                                  ]
                                ),
                                _vm._v(" "),
                                _c(
                                  "span",
                                  {
                                    staticStyle: {
                                      "font-family": "'Inter', sans-serif",
                                      "font-weight": "600",
                                      "font-size": "14px",
                                      "line-height": "20px",
                                      color: "#000000",
                                    },
                                  },
                                  [
                                    _vm._v(
                                      _vm._s(_vm.$currency) +
                                        _vm._s(
                                          _vm.getAdditionalChargesTotal(
                                            _vm.order.additional_charges
                                          )
                                        )
                                    ),
                                  ]
                                ),
                              ]
                            )
                          : _vm._e(),
                        _vm._v(" "),
                        _vm.order.promo_discount > 0
                          ? _c(
                              "div",
                              {
                                staticClass:
                                  "d-flex justify-content-between mb-4",
                                staticStyle: {
                                  height: "24px",
                                  "align-items": "center",
                                },
                              },
                              [
                                _c(
                                  "span",
                                  {
                                    staticStyle: {
                                      "font-family": "'Inter', sans-serif",
                                      "font-weight": "400",
                                      "font-size": "16px",
                                      "line-height": "24px",
                                      color: "#000000",
                                    },
                                  },
                                  [
                                    _vm._v(
                                      _vm._s(
                                        _vm.__("Promo Code") || "Promo Code"
                                      )
                                    ),
                                  ]
                                ),
                                _vm._v(" "),
                                _c(
                                  "span",
                                  {
                                    staticStyle: {
                                      "font-family": "'Inter', sans-serif",
                                      "font-weight": "600",
                                      "font-size": "14px",
                                      "line-height": "20px",
                                      color: "#000000",
                                    },
                                  },
                                  [_vm._v(_vm._s(_vm.order.promo_code))]
                                ),
                              ]
                            )
                          : _vm._e(),
                        _vm._v(" "),
                        _vm.order.promo_discount > 0
                          ? _c(
                              "div",
                              {
                                staticClass:
                                  "d-flex justify-content-between mb-4",
                                staticStyle: {
                                  height: "24px",
                                  "align-items": "center",
                                },
                              },
                              [
                                _c(
                                  "span",
                                  {
                                    staticStyle: {
                                      "font-family": "'Inter', sans-serif",
                                      "font-weight": "400",
                                      "font-size": "16px",
                                      "line-height": "24px",
                                      color: "#000000",
                                    },
                                  },
                                  [
                                    _vm._v(
                                      _vm._s(
                                        _vm.__("Promo Discount") ||
                                          "Promo Discount"
                                      )
                                    ),
                                  ]
                                ),
                                _vm._v(" "),
                                _c(
                                  "span",
                                  {
                                    staticStyle: {
                                      "font-family": "'Inter', sans-serif",
                                      "font-weight": "600",
                                      "font-size": "14px",
                                      "line-height": "20px",
                                      color: "#000000",
                                    },
                                  },
                                  [
                                    _vm._v(
                                      "-" +
                                        _vm._s(_vm.$currency) +
                                        _vm._s(_vm.order.promo_discount)
                                    ),
                                  ]
                                ),
                              ]
                            )
                          : _vm._e(),
                        _vm._v(" "),
                        _vm.order.wallet_balance > 0
                          ? _c(
                              "div",
                              {
                                staticClass:
                                  "d-flex justify-content-between mb-4",
                                staticStyle: {
                                  height: "24px",
                                  "align-items": "center",
                                },
                              },
                              [
                                _c(
                                  "span",
                                  {
                                    staticStyle: {
                                      "font-family": "'Inter', sans-serif",
                                      "font-weight": "700",
                                      "font-size": "14px",
                                      "line-height": "20px",
                                      color: "#20B364",
                                    },
                                  },
                                  [
                                    _vm._v(
                                      _vm._s(
                                        _vm.__("Wallet Used") || "Wallet Used"
                                      )
                                    ),
                                  ]
                                ),
                                _vm._v(" "),
                                _c(
                                  "span",
                                  {
                                    staticStyle: {
                                      "font-family": "'Inter', sans-serif",
                                      "font-weight": "700",
                                      "font-size": "14px",
                                      "line-height": "20px",
                                      color: "#20B364",
                                    },
                                  },
                                  [
                                    _vm._v(
                                      "-" +
                                        _vm._s(_vm.$currency) +
                                        _vm._s(_vm.order.wallet_balance)
                                    ),
                                  ]
                                ),
                              ]
                            )
                          : _vm._e(),
                        _vm._v(" "),
                        _c(
                          "div",
                          {
                            staticClass:
                              "d-flex justify-content-between align-items-center p-3 payable-total-box",
                          },
                          [
                            _c(
                              "span",
                              {
                                staticStyle: {
                                  "font-family": "'Inter', sans-serif",
                                  "font-weight": "700",
                                  "font-size": "20px",
                                  "line-height": "28px",
                                  color: "#000000",
                                },
                              },
                              [
                                _vm._v(
                                  _vm._s(
                                    _vm.__("Payable Total") || "Payable Total"
                                  )
                                ),
                              ]
                            ),
                            _vm._v(" "),
                            _c(
                              "span",
                              {
                                staticStyle: {
                                  "font-family": "'Inter', sans-serif",
                                  "font-weight": "700",
                                  "font-size": "20px",
                                  "line-height": "28px",
                                  color: "#000000",
                                },
                              },
                              [
                                _vm._v(
                                  _vm._s(_vm.$currency) +
                                    _vm._s(_vm.order.remaining_final)
                                ),
                              ]
                            ),
                          ]
                        ),
                      ]),
                    ]),
                  ]
                ),
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
                            staticClass:
                              "btn btn-primary btn-sm pull-right border-0 bg-transparent p-0",
                            attrs: { to: _vm.viewProductRoute, title: "View" },
                          },
                          [
                            _c("base-icon", {
                              attrs: {
                                name: "Eye",
                                hoverName: "Type=Hover (1)",
                                width: "32",
                                height: "32",
                              },
                            }),
                          ],
                          1
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
                      staticStyle: { color: "#64748B" },
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
                    staticStyle: { color: "#D63031" },
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
                  staticClass: "btn btn-figma-keep w-50",
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
                  staticClass: "btn btn-figma-confirm w-50",
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
var staticRenderFns = []
render._withStripped = true



/***/ })

}]);