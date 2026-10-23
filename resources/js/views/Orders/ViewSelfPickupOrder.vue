<template>
    <div>
        <div class="view_order">
            <div class="page-heading d-flex flex-wrap justify-content-between align-items-center gap-2 mb-4">
                <h3 class="mb-0">{{ __('view_self_pickup_order') }}</h3>
                <nav aria-label="breadcrumb" class="breadcrumb-header">
                    <ol class="breadcrumb mb-0">
                        <li class="breadcrumb-item">
                            <router-link to="/dashboard">{{ __('dashboard') }}</router-link>
                        </li>
                        <li class="breadcrumb-item">
                            <router-link to="/self_pickup_orders">{{ __('self_pickup_orders') }}</router-link>
                        </li>
                        <li class="breadcrumb-item active" aria-current="page">
                            {{ __('order_details') }}
                        </li>
                    </ol>
                </nav>
            </div>

            <div v-if="order" class="order-details-wrapper">
                <!-- Order Header Strip -->
                <div class="mb-4 order-header-card">
                    <div class="od-header-top">
                        <div class="d-flex flex-wrap align-items-center gap-2">
                            <h2 class="od-order-id mb-0">{{ __('order_id') }} #{{ order.order_id }}</h2>
                            <span class="figma-status-pill od-status-pill">
                                {{ getDisplayName(order.status_name_translation) || order.status_name }}
                            </span>
                        </div>
                        <div class="d-flex flex-wrap gap-2 od-header-actions">
                            <button @click="downloadInvoice" v-b-tooltip.hover :title="__('download_invoice')"
                                class="btn btn-outline-secondary od-head-btn" :disabled="isLoading">
                                <template v-if="isLoading">
                                    <b-spinner small label="Spinning"></b-spinner> {{ __('downloading') }}...
                                </template>
                                <template v-else>
                                    <i class="fa fa-download"></i> {{ __('download_invoice') }}
                                </template>
                            </button>
                            <router-link :to="invoiceRoute" v-b-tooltip.hover :title="__('generate_invoice')"
                                class="btn btn-outline-primary od-head-btn">
                                <i class="fa fa-file" aria-hidden="true"></i> {{ __('generate_invoice') }}
                            </router-link>
                        </div>
                    </div>
                    <div class="order-meta-bar">
                        <div class="order-meta-date">
                            <i class="far fa-calendar-alt"></i>
                            <span class="od-meta-label">{{ __('order_date') }} :</span>
                            <span class="od-meta-value">{{ order.orders_created_at }}</span>
                        </div>
                        <div class="order-meta-date">
                            <i class="far fa-credit-card"></i>
                            <span class="od-meta-label">{{ __('payment_method') }} :</span>
                            <span class="od-meta-value">{{ order.payment_method }}</span>
                        </div>
                    </div>
                </div>

                <div class="row g-4">
                    <!-- Left Column (8) -->
                    <div class="col-lg-8">
                        <!-- Order Items -->
                        <div class="card od-card">
                            <div class="od-card-header justify-content-between">
                                <h5 class="od-card-title">
                                    <i class="fa fa-box me-2 text-primary"></i>
                                    {{ __('list_of_order_items') }}
                                </h5>
                                <span class="item-count-badge">{{ order_items.length }}</span>
                            </div>
                            <div class="card-body p-0">
                                <div class="table-responsive od-table-wrap">
                                    <table class="table align-middle mb-0 od-items-table">
                                        <thead>
                                            <tr>
                                                <th class="text-start">{{ __('name') }}</th>
                                                <th class="text-center">{{ __('quantity') }}</th>
                                                <th class="text-end">{{ __('subtotal') }} ({{ $currency }})</th>
                                                <th class="text-center">{{ __('status') }}</th>
                                                <th class="text-end"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="item in order_items" :key="item.id">
                                                <td class="text-start">
                                                    <div class="od-product-name">{{ item.product_name + " (" + item.variant_name + ")" }}</div>
                                                    <div class="od-product-sub">{{ __('variant') }}: {{ item.variant_name }}</div>
                                                    <template v-if="item.prescriptions && item.prescriptions.length > 0">
                                                        <div class="od-product-sub mt-1">{{ __('prescriptions') || 'Prescriptions' }}</div>
                                                        <div class="d-flex flex-wrap gap-1 mt-1">
                                                            <div v-for="(pUrl, pIdx) in item.prescriptions" :key="pIdx"
                                                                class="od-prescription-thumb position-relative border rounded p-1"
                                                                @click="showPrescription(pUrl)">
                                                                <img :src="pUrl" class="w-100 h-100 object-fit-cover rounded" />
                                                            </div>
                                                        </div>
                                                    </template>
                                                </td>
                                                <td class="text-center">{{ item.quantity }}</td>
                                                <td class="text-end od-cell-strong">{{ item.sub_total }}</td>
                                                <td class="text-center">
                                                    <span class="figma-status-pill"
                                                        :class="(item.active_status == 7 || item.active_status == 8) ? 'od-pill-danger' : 'od-status-pill'">
                                                        {{ getDisplayName(item.status_name_translation) || item.status_name }}
                                                    </span>
                                                </td>
                                                <td class="text-end">
                                                    <div class="od-row-actions">
                                                        <b-button v-b-tooltip.hover title="View Item Details"
                                                            class="btn btn-outline-primary od-row-btn" @click="sendInfo(item)">
                                                            {{ __('view_item_details') }}
                                                        </b-button>
                                                        <template v-if="canReturnProduct(item)">
                                                            <b-button v-b-tooltip.hover title="Return this product"
                                                                v-if="$can('self_pickup_order_update')"
                                                                class="btn btn-outline-secondary od-row-btn" @click="updateStatus(item, 8)"
                                                                :disabled="isLoadingUstatus">
                                                                <template v-if="isLoadingUstatus">
                                                                    <b-spinner small></b-spinner> {{ __('returning') }}...
                                                                </template>
                                                                <template v-else>
                                                                    {{ __('return') }}
                                                                </template>
                                                            </b-button>
                                                        </template>
                                                        <button v-if="canCancelItem(item)" v-b-tooltip.hover :title="__('cancel_item')"
                                                            class="btn cancel-item-btn"
                                                            @click="cancelOrderItem(item)" :disabled="isLoadingCancel">
                                                            <i class="fa fa-times"></i>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        <!-- Billing Summary -->
                        <div class="card od-card">
                            <div class="od-card-header">
                                <h5 class="od-card-title">
                                    <i class="fa fa-receipt me-2"></i>
                                    {{ __('billing_details') }}
                                </h5>
                            </div>
                            <div class="card-body od-card-body">
                                <div class="od-sum-row od-sum-row--sub">
                                    <span>{{ __('total') }} ({{ $currency }})</span>
                                    <span>{{ order.total }}</span>
                                </div>
                                <div class="od-sum-row">
                                    <span>{{ __('disc') }} {{ $currency }}( % )</span>
                                    <span class="od-sum-val">{{ discount_in_rupees + ' ( ' + order.discount + '% )' }}</span>
                                </div>
                                <div class="od-sum-row">
                                    <span>{{ __('wallet_used') }} ({{ $currency }})</span>
                                    <span class="od-sum-val">{{ order.wallet_balance }}</span>
                                </div>
                                <div class="od-sum-row">
                                    <span>{{ __('promo_discount') }} ({{ $currency }})</span>
                                    <span class="od-sum-val">{{ order.promo_discount }}</span>
                                </div>
                                <div class="od-sum-row">
                                    <span>{{ __('promo_code') }}</span>
                                    <span class="od-sum-val">{{ order.promo_code }}</span>
                                </div>
                                <div class="od-sum-row">
                                    <span>{{ __('delivery_charge') }} ({{ $currency }})</span>
                                    <span class="od-sum-val">{{ order.delivery_charge }}</span>
                                </div>
                                <div class="od-sum-row" v-if="getAdditionalChargesTotal(order.additional_charges) > 0">
                                    <span>{{ __('additional_charges') }} ({{ $currency }})</span>
                                    <span class="od-sum-val">{{ getAdditionalChargesTotal(order.additional_charges) }}</span>
                                </div>
                                <div class="payable-total-box">
                                    <span>{{ __('payable_total') }} ( {{ $currency }} )</span>
                                    <span class="fw-bold">{{ order.remaining_final }}</span>
                                </div>
                            </div>
                        </div>

                        <!-- Update Status -->
                        <div class="card od-card">
                            <div class="od-card-header">
                                <h5 class="od-card-title">
                                    <i class="far fa-check-circle me-2"></i>
                                    {{ __('update_status') }}
                                </h5>
                            </div>
                            <div class="card-body od-card-body">
                                <form class="od-inline-form" ref="my-form" @submit.prevent="updateStatus">
                                    <label class="visually-hidden" for="status">{{ __('status') }}</label>
                                    <select id="status" name="status"
                                        class="form-control form-select" v-model="order_status_id">
                                        <option value="">{{ __('select_order_status') }}</option>
                                        <option v-for="status in statuses" :value='status.id'>{{
                                            getStatusDisplayName(status) }}</option>
                                    </select>
                                    <button type="submit" class="btn btn-primary od-form-btn"
                                        v-if="$can('self_pickup_order_update')"
                                        :disabled="order_status_id === '' || isLoadingUstatus">
                                        <template v-if="isLoadingUstatus"><b-spinner small
                                                label="Spinning"></b-spinner></template>
                                        {{ __('update') }}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>

                    <!-- Right Column (4) -->
                    <div class="col-lg-4">
                        <div class="card od-card">
                            <div class="od-card-header">
                                <h5 class="od-card-title">
                                    <i class="far fa-user me-2"></i>
                                    {{ __('order_details') }}
                                </h5>
                            </div>
                            <div class="card-body od-card-body">
                                <div class="od-info-row">
                                    <div class="od-info-label">{{ __('name') }}</div>
                                    <div class="od-info-value">{{ order.user_name }}</div>
                                </div>
                                <div class="od-info-row">
                                    <div class="od-info-label">{{ __('email') }}</div>
                                    <div class="od-info-value">{{ order.user_email }}</div>
                                </div>
                                <div class="od-info-row mb-0">
                                    <div class="od-info-label">{{ __('mobile') }}</div>
                                    <div class="od-info-value">{{ order.user_mobile | mobileMask }}</div>
                                </div>
                            </div>
                        </div>

                        <div class="card od-card">
                            <div class="od-card-header">
                                <h5 class="od-card-title">
                                    <i class="fa fa-store me-2"></i>
                                    {{ __('pickup_store') }}
                                </h5>
                            </div>
                            <div class="card-body od-card-body">
                                <div class="od-info-row">
                                    <div class="od-info-label">{{ __('pickup_store') }}</div>
                                    <div class="od-info-value">{{ getDisplayName(order.store_name_translation) || order.store_name }}</div>
                                </div>
                                <div class="od-info-row">
                                    <div class="od-info-label">{{ __('store_address') }}</div>
                                    <div class="od-info-value od-info-value--muted">{{ getPickupAddress(order.pickup_address) }}</div>
                                </div>
                                <div class="od-info-row mb-0">
                                    <div class="od-info-label">{{ __('store_timings') }}</div>
                                    <div class="od-info-value">{{ getPickupTimings(order.pickup_address) }}</div>
                                </div>
                            </div>
                        </div>

                        <div class="card od-card" v-if="order.order_note">
                            <div class="od-card-header">
                                <h5 class="od-card-title">
                                    <i class="far fa-sticky-note me-2"></i>
                                    {{ __('order_note') }}
                                </h5>
                            </div>
                            <div class="card-body od-card-body">
                                <div class="order-notes-box">
                                    <p class="mb-0 order-notes-text">{{ order.order_note }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <b-modal v-model="itemModalShow" v-bind:hide-footer="true" :title="__('order_item_details')">
                <b-container fluid>
                    <div class="row">
                        <ul class="list-group">
                            <li class="list-group-item"><b>{{ __('name') }} :- </b>{{ item.product_name + " (" +
                                item.variant_name +
                                ")" }}</li>
                            <li class="list-group-item capitalize" v-if="item.active_status">
                                <b>{{ __('status') }} :- </b>{{ getDisplayName(item.status_name_translation) ||
                                    item.status_name }}
                            </li>
                            <li class="list-group-item">
                                <span><b>{{ __('product_id') }} :- </b>{{ item.product_id }}</span>
                                <router-link v-if="item.product_id" :to="viewProductRoute" v-b-tooltip.hover title="View"
                                    class="figma-action-btn float-end">
                                    <i class="bi bi-eye"></i>
                                </router-link>
                            </li>
                            <li class="list-group-item"
                                v-if="item.seller_name || getDisplayName(item.seller_name_translation)">
                                <b>{{ __('seller_name') }} :- </b>{{ getDisplayName(item.seller_name_translation) ||
                                    item.seller_name }}
                            </li>
                            <li class="list-group-item"><b>{{ __('user_name') }} :- </b>{{ item.user_name }}</li>
                            <li class="list-group-item"><b>{{ __('variant_id') }} :- </b>{{ item.product_variant_id }}
                            </li>
                            <li class="list-group-item"><b>{{ __('quantity') }} :- </b>{{ item.quantity }}</li>
                            <li class="list-group-item"><b>{{ __('price') }} :- </b>{{ item.price }}</li>
                            <li class="list-group-item"><b>{{ __('discounted_price') }} ( {{ $currency }} ) :- </b>{{
                                item.discounted_price }}</li>
                            <li class="list-group-item"><b>{{ __('tax_amount') }} ( {{ $currency }} ) :- </b>{{
                                item.tax_amount }}
                            </li>
                            <li class="list-group-item"><b>{{ __('tax_percentage') }} (%) :- </b>{{ item.tax_percentage
                                }}</li>
                            <li class="list-group-item"><b>{{ __('subtotal') }} ( {{ $currency }} ) :- </b>{{
                                item.sub_total }}</li>
                            <li class="list-group-item">
                                <a class=" col-sm-12 btn btn-success"
                                    :href="whatsappMessageLink(order.country_code, order.mobile, order.user_name, order.id, item.id)"
                                    target="_blank" title="Send Whatsapp Notification">
                                    <i class="fab fa-whatsapp"></i>
                                </a>
                            </li>
                        </ul>
                    </div>
                </b-container>
            </b-modal>

            <!-- Prescription Image Modal -->
            <b-modal v-model="prescriptionModalShow" v-bind:hide-footer="true" size="lg" centered
                :title="__('prescription_view') || 'Prescription Image'">
                <div class="text-center p-2">
                    <img :src="selectedPrescriptionUrl" class="img-fluid rounded border shadow-sm"
                        style="max-height: 70vh;" />
                    <div class="mt-3">
                        <a :href="selectedPrescriptionUrl" target="_blank" class="btn btn-primary" download>
                            <i class="fa fa-download me-1"></i> {{ __('download') || 'Download' }}
                        </a>
                    </div>
                </div>
            </b-modal>
        </div>
    </div>
</template>
<script>
import axios from "axios";
import Auth from '../../Auth.js';

export default {
    data: function () {
        return {
            login_user: Auth.user,

            isLoading: false,
            isLoadingUstatus: false,
            isLoadingCancel: false,

            id: null,
            order: [],
            order_items: [],
            pickup_date: null,

            discount_in_rupees: 0,
            whatsapp_message: "",

            order_status_id: "",

            selectedItems: [],
            select: '',
            all_select: false,

            statuses: '',
            status_id: '',

            itemModalShow: false,
            item: '',
            userRole: '',
            order: {
                order_id: '',
            },
            prescriptionModalShow: false,
            selectedPrescriptionUrl: '',
        }

    },
    computed: {
        invoiceRoute() {
            let routeConfig = null;
            switch (this.login_user.role.name) {
                case 'Admin':
                    routeConfig = {
                        name: 'InvoiceOrder',
                        params: { id: this.order.order_id },
                    };
                    break;
                case 'Super Admin':
                    routeConfig = {
                        name: 'InvoiceOrder',
                        params: { id: this.order.order_id },
                    };
                    break;
                default:
                    break;
            }

            return routeConfig;
        },
        viewProductRoute() {
            let routeConfig = null;
            switch (this.login_user.role.name) {
                case 'Admin':
                    routeConfig = {
                        name: 'ViewProduct',
                        params: { id: this.item.product_id },
                    };
                    break;
                case 'Super Admin':
                    routeConfig = {
                        name: 'ViewProduct',
                        params: { id: this.item.product_id },
                    };
                    break;
                default:
                    break;
            }

            return routeConfig;
        },
    },
    created: function () {
        this.id = this.$route.params.id;
        if (this.id) {
            this.getSelfPickupOrderStatus();
            this.getOrder();
        }
        if (this.order.discount > 0) {
            let discounted_amount = this.order.total * this.order.discount / 100;
            let remaining_final = this.order.total - discounted_amount;
            this.discount_in_rupees = this.order.total - remaining_final;
        }

    },
    methods: {
        showPrescription(url) {
            this.selectedPrescriptionUrl = url;
            this.prescriptionModalShow = true;
        },
        getDisplayName(name) {
            if (name == null) return '';
            if (typeof name === 'string') return name;
            if (typeof name === 'object' && !Array.isArray(name)) {
                if ('name' in name && 'lang' in name) return String(name.name || '').trim();
                const appLocale = window.appLocale || window.localStorage.getItem('lang') || 'en';
                const forLocale = name[appLocale];
                if (forLocale != null && String(forLocale).trim() !== '') return String(forLocale).trim();
                const firstNonEmpty = Object.values(name).find(val => val != null && String(val).trim() !== '');
                return firstNonEmpty != null ? String(firstNonEmpty).trim() : '';
            }
            return '';
        },
        getStatusDisplayName(status) {
            if (!status) return '';
            const sn = status.status_name;
            if (sn == null) return status.status || '';
            if (typeof sn === 'string') return sn.trim() || status.status || '';
            if (typeof sn === 'object' && !Array.isArray(sn)) {
                const appLocale = window.appLocale || window.localStorage.getItem('lang') || 'en';
                const forLocale = sn[appLocale];
                if (forLocale != null && String(forLocale).trim() !== '') return String(forLocale).trim();
                const first = Object.values(sn).find(val => val != null && String(val).trim() !== '');
                return first != null ? String(first).trim() : (status.status || '');
            }
            return status.status || '';
        },
        getSelfPickupOrderStatus: function () {
            let vm = this;
            axios.get(this.$apiUrl + '/order_statuses/self_pickup').then((response) => {

                this.isLoading = false
                let data = response.data;
                const statusesToRemoveIds = [7, 8];
                this.statuses = data.data.filter(status => !statusesToRemoveIds.includes(status.id));
            }).catch(error => {
                vm.isLoading = false;
                if (error.request.statusText) {
                    this.showError(error.request.statusText);
                } else if (error.message) {
                    this.showError(error.message);
                } else {
                    this.showError("Something went wrong!");
                }
            });
        },
        formatDate(dateTime) {
            const date = new Date(dateTime);
            const day = date.getDate().toString().padStart(2, '0');
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const year = date.getFullYear();

            return `${day}-${month}-${year}`;
        },
        getOrder() {
            this.isLoading = true
            axios.get(this.$apiUrl + '/orders/view/' + this.id)
                .then((response) => {
                    this.isLoading = false
                    let data = response.data;
                    if (data.status === 1) {
                        this.order = response.data.data.order;
                        this.order_items = response.data.data.order_items;

                        this.pickup_date = response.data.data.pickup_date;

                        this.order_status_id = (this.order.active_status != 0 && this.order.active_status != "") ? this.order.active_status : "";

                    } else {
                        this.showError(data.message);
                        setTimeout(() => {
                            this.$router.back();
                        }, 1000);
                    }
                }).catch(error => {
                    this.isLoading = false;
                    if (error.request.statusText) {
                        this.showError(error.request.statusText);
                    } else if (error.message) {
                        this.showError(error.message);
                    } else {
                        this.showError("Something went wrong!");
                    }
                });
        },

        sendInfo(item) {
            this.item = item;
            this.itemModalShow = true;
        },


        whatsappMessageLink(country_code, mobile, user_name, order_id, item_id) {
            return "https://api.whatsapp.com/send?phone=+" + country_code + " " + mobile + "&text=Hello " + user_name + " ,Your order with ID :" + order_id + " is  " + item_id + ". Please take a note of it. If you have further queries feel free to contact us. Thank you.";
        },
        updateStatus(item = null, statusId = null) {
            let vm = this;

            const isItemReturn = item !== null && statusId !== null;
            const isOrderStatusUpdate = !isItemReturn && this.order_status_id !== '';

            if (!isItemReturn && !isOrderStatusUpdate) {
                this.showWarning("Please select a status!");
                return;
            }

            let confirmTitle, confirmText, confirmButtonText;
            if (isItemReturn) {
                confirmTitle = this.__('return_product') !== 'return_product' ? this.__('return_product') : "Return Product";
                confirmText = (this.__('are_you_sure_you_want_to_return') !== 'are_you_sure_you_want_to_return' ? this.__('are_you_sure_you_want_to_return') : 'Are you sure you want to return') + ` "${item.product_name}"?`;
                confirmButtonText = this.__('yes_return') !== 'yes_return' ? this.__('yes_return') : "Yes, Return";
            } else {
                confirmTitle = this.__('are_you_sure');
                confirmText = this.__('you_want_be_able_to_revert_this');
                confirmButtonText = this.__('yes_sure');
            }

            this.$swal.fire({
                title: confirmTitle,
                text: confirmText,
                confirmButtonText: confirmButtonText,
                cancelButtonText: this.__('cancel'),
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: 'var(--theme-primary-500)',
                cancelButtonColor: 'var(--theme-error-500)',
            }).then(result => {
                if (result.value) {
                    this.isLoadingUstatus = true

                    let postData, apiUrl;

                    if (isItemReturn) {
                        postData = {
                            order_id: this.id,
                            order_item_id: item.id,
                            status_id: statusId,
                        };
                    } else {
                        postData = {
                            order_id: this.id,
                            status_id: this.order_status_id
                        };
                    }
                    apiUrl = this.$apiUrl + '/orders/update_self_pickup_status';

                    axios.post(apiUrl, postData).then((response) => {
                        this.isLoadingUstatus = false
                        let data = response.data;
                        if (data.status === 1) {
                            if (isOrderStatusUpdate) {
                                this.order_status_id = '';
                            }
                            this.getOrder();
                            this.showMessage("success", data.message);
                            setTimeout(
                                function () {
                                    vm.$swal.close();
                                }, 2000);
                        } else {
                            vm.showError(data.message);
                            vm.isLoadingUstatus = false;
                        }
                    }).catch(error => {
                        vm.isLoadingUstatus = false;
                        this.showError("Something went wrong!");
                    });
                }
            });
        },

        downloadInvoice() {
            this.isLoading = true;
            let postData = {
                order_id: this.id,
            }
            axios({
                url: this.$apiUrl + '/orders/invoice_download',
                method: 'post',
                responseType: 'blob',

                data: postData
            }).then((response) => {
                var fileURL = window.URL.createObjectURL(new Blob([response.data]));
                var fileLink = document.createElement('a');
                fileLink.href = fileURL;
                fileLink.setAttribute('download', 'Invoice-No:#' + this.id + '.pdf');
                document.body.appendChild(fileLink);
                fileLink.click();
                this.isLoading = false;
            }).catch(error => {
                if (error.request.statusText) {
                    this.showError(error.request.statusText);
                } else if (error.message) {
                    this.showError(error.message);
                } else {
                    this.showError("Something went wrong!");
                }
                this.isLoading = false;
            });
        },
        getPickupAddress(pickupAddress) {
            if (!pickupAddress) return 'Not specified';

            try {
                let addressData;
                if (typeof pickupAddress === 'string') {
                    addressData = JSON.parse(pickupAddress);
                } else if (typeof pickupAddress === 'object') {
                    addressData = pickupAddress;
                } else {
                    return 'Not specified';
                }

                if (addressData && addressData.pickup_store_address) {
                    return addressData.pickup_store_address;
                }

                return 'Not specified';
            } catch (e) {
                return 'Not specified';
            }
        },
        getPickupTimings(pickupAddress) {
            if (!pickupAddress) return 'Not specified';

            try {
                let addressData;
                if (typeof pickupAddress === 'string') {
                    addressData = JSON.parse(pickupAddress);
                } else if (typeof pickupAddress === 'object') {
                    addressData = pickupAddress;
                } else {
                    return 'Not specified';
                }

                if (addressData && addressData.opening_time && addressData.closing_time) {
                    return `${addressData.opening_time} - ${addressData.closing_time}`;
                }

                return 'Not specified';
            } catch (e) {
                return 'Not specified';
            }
        },

        allSelectCheckBox() {
            if (this.all_select == false) {
                this.all_select = true
                this.order_items.forEach(item => {
                    this.selectedItems.push(item.id)
                });
            } else {
                this.all_select = false
                this.selectedItems = []
            }
        },
        selectCheckBox() {
            let uniqueSelectedItems = [...new Set(this.selectedItems)];
            if (this.order_items.length === uniqueSelectedItems.length) {
                this.all_select = true
            } else {
                this.all_select = false
            }
        },
        updateItemsStatus() {
            let vm = this;
            let uniqueSelectedItems = [...new Set(this.selectedItems)];
            if (uniqueSelectedItems.length !== 0) {
                this.$swal.fire({
                    title: this.__('are_you_sure'),
                    text: this.__('you_want_be_able_to_revert_this'),
                    confirmButtonText: this.__('yes_sure'),
                    cancelButtonText: this.__('cancel'),
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: 'var(--theme-primary-500)',
                    cancelButtonColor: 'var(--theme-error-500)',
                }).then(result => {
                    if (result.value) {
                        let ids = uniqueSelectedItems.toString();
                        this.isLoading = true
                        let postData = {
                            ids: ids,
                            status_id: this.status_id
                        }
                        axios.post(this.$apiUrl + '/orders/update_items_status', postData).then((response) => {
                            this.isLoading = false
                            let data = response.data;
                            if (data.status === 1) {

                                this.getOrder();
                                this.status_id = '';
                                this.selectedItems = [];
                                this.all_select = false;
                                this.showMessage("success", data.message);
                                setTimeout(
                                    function () {
                                        vm.$swal.close();
                                    }, 2000);
                            } else {
                                vm.showError(data.message);
                                vm.isLoading = false;
                            }
                        }).catch(error => {
                            vm.isLoading = false;
                            this.showError("Something went wrong!");
                        });
                    }
                });
            } else {
                this.showWarning("Select at least one record!");
            }
        },
        getAdditionalChargesTotal(charges) {
            if (!charges || !Array.isArray(charges)) return 0;
            return charges.reduce((total, charge) => total + (parseFloat(charge.amount) || 0), 0).toFixed(2);
        },
        canReturnProduct(item) {

            if (!item.return_status || item.return_status != 1) {
                return false;
            }

            if (item.active_status == 8 || item.active_status == 7) {
                return false;
            }

            if (this.order.active_status != 11) {
                return false;
            }

            if (item.return_days && item.return_days > 0) {

                const pickupDate = this.getPickupDate();
                if (pickupDate) {
                    const today = new Date();
                    const daysSincePickup = Math.floor((today - pickupDate) / (1000 * 60 * 60 * 24));
                    if (daysSincePickup > item.return_days) {
                        return false;
                    }
                }
            }

            return true;
        },
        getPickupDate() {

            if (this.pickup_date) {
                return new Date(this.pickup_date);
            }
            return new Date(this.order.updated_at);
        },
        canCancelItem(item) {
            // 6=delivered, 7=cancelled, 8=returned, 11=selfPickupPicked
            return item.active_status != 6 && item.active_status != 7 && item.active_status != 8
                && item.active_status != 11;
        },
        cancelOrderItem(item) {
            this.$swal.fire({
                title: this.__('are_you_sure'),
                input: 'textarea',
                inputLabel: this.__('cancellation_reason'),
                inputPlaceholder: this.__('enter_cancellation_reason'),
                showCancelButton: true,
                confirmButtonText: this.__('yes_sure'),
                cancelButtonText: this.__('no'),
                confirmButtonColor: 'var(--theme-primary-500)',
                cancelButtonColor: 'var(--theme-error-500)',
                icon: 'warning',
                inputValidator: (value) => {
                    if (!value || !value.trim()) {
                        return this.__('cancellation_reason') + ' ' + this.__('is_required');
                    }
                },
                showLoaderOnConfirm: true,
                allowOutsideClick: () => !this.$swal.isLoading(),
                preConfirm: (reason) => {
                    let postData = {
                        order_item_id: item.id,
                        cancellation_reason: reason,
                    };
                    return axios.post(this.$apiUrl + '/orders/cancel_order_item', postData)
                        .then((response) => {
                            return response.data;
                        }).catch(error => {
                            this.$swal.showValidationMessage('Something went wrong!');
                        });
                },
            }).then(result => {
                if (result.isConfirmed) {
                    let data = result.value;
                    if (data.status === 1) {
                        this.getOrder();
                        this.showMessage("success", data.message);
                    } else {
                        this.showError(data.message);
                    }
                }
            });
        }
    }
};
</script>
<style scoped>
/* ===== Order detail (SnapBuy layout) ===== */
.modern-page-title {
    font-family: var(--ui-font);
    font-weight: 700;
    font-size: 20px;
    line-height: 28px;
    color: var(--ui-heading);
}

.order-meta-bar {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 8px 24px;
    padding-top: 12px;
    border-top: 1px solid var(--ui-border);
    font-family: var(--ui-font);
    font-size: 13px;
    line-height: 20px;
}

.order-meta-date,
.order-meta-seller {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 6px;
}

.order-meta-bar i {
    color: var(--ui-text-muted);
    font-size: 13px;
}

.card {
    border: 1px solid var(--ui-border) !important;
    border-radius: var(--ui-radius-lg) !important;
    overflow: hidden;
    margin-bottom: 24px;
}

.item-count-badge {
    display: inline-flex;
    align-items: center;
    height: 26px;
    padding: 0 10px;
    border-radius: var(--ui-radius-sm);
    background-color: var(--ui-surface-muted);
    border: 1px solid var(--ui-border);
    color: var(--ui-text);
    font-weight: 600;
    font-size: 12px;
    white-space: nowrap;
}

body.theme-dark .item-count-badge {
    background-color: var(--theme-neutral-700) !important;
    border-color: var(--theme-neutral-600) !important;
    color: var(--theme-neutral-100) !important;
}

.cancel-item-btn {
    width: 32px;
    height: 32px;
    border-radius: var(--ui-radius);
    border: 1px solid color-mix(in srgb, var(--theme-error-500) 30%, transparent) !important;
    background: var(--theme-error-50);
    color: var(--theme-error-500);
}

.cancel-item-btn:hover {
    background: color-mix(in srgb, var(--theme-error-500) 18%, transparent);
}

.delivery-time-box {
    padding: 10px 12px;
    background: var(--theme-error-50);
    border: 1px solid var(--theme-error-200);
    border-radius: var(--ui-radius);
}

body.theme-dark .delivery-time-box {
    background: color-mix(in srgb, var(--theme-error-500) 15%, transparent) !important;
    border-color: color-mix(in srgb, var(--theme-error-500) 30%, transparent) !important;
}

.order-notes-box {
    background-color: var(--theme-info-50);
    border-inline-start: 3px solid var(--theme-info-500);
    border-radius: var(--ui-radius);
    padding: 12px 14px;
    text-align: start;
}

.order-notes-text {
    font-size: 13px;
    line-height: 20px;
    color: var(--ui-text);
}

@media (max-width: 575.98px) {
    .order-header-card {
        padding: 14px 16px;
    }

    .od-print-btn {
        width: 100%;
        justify-content: center;
    }

    .od-card-body {
        padding: 16px;
    }

    .od-card-header {
        padding: 12px 16px;
    }
}


/* Self-pickup specific */
.od-status-pill {
    background: var(--ui-primary-soft);
    color: var(--theme-primary-700);
    border: 1px solid color-mix(in srgb, var(--theme-primary-500) 30%, transparent) !important;
}

.od-pill-danger {
    background: var(--theme-error-50);
    color: var(--theme-error-700);
    border: 1px solid color-mix(in srgb, var(--theme-error-500) 30%, transparent) !important;
}

.od-head-btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    height: 38px;
    padding: 0 14px;
    font-size: 13px;
    font-weight: 600;
    border-radius: var(--ui-radius);
}

.od-row-actions {
    display: inline-flex;
    align-items: center;
    justify-content: flex-end;
    gap: 6px;
    flex-wrap: nowrap;
}

.od-row-btn {
    height: 32px;
    padding: 0 10px;
    font-size: 12px;
    font-weight: 600;
    border-radius: var(--ui-radius);
    white-space: nowrap;
}

.payable-total-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.od-info-value {
    margin-left: 0;
}

.od-info-value--muted {
    font-weight: 400;
    color: var(--ui-text-muted);
}

.od-items-table {
    min-width: 640px;
}

@media (max-width: 575.98px) {
    .od-header-actions,
    .od-head-btn {
        width: 100%;
        justify-content: center;
    }
}

/* Dark Mode Styles */
body.theme-dark .card {
    background-color: var(--theme-neutral-800) !important;
    border-color: var(--theme-neutral-700) !important;
}

body.theme-dark .order-header-card,
body.theme-dark .od-card-header {
    background-color: var(--theme-neutral-800) !important;
    border-color: var(--theme-neutral-700) !important;
}

body.theme-dark .od-card-title,
body.theme-dark .od-order-id,
body.theme-dark .od-product-name,
body.theme-dark .od-info-value,
body.theme-dark .od-meta-value,
body.theme-dark .payable-total-box {
    color: var(--theme-neutral-100) !important;
}

body.theme-dark .od-items-table thead th {
    background-color: var(--theme-neutral-700) !important;
}

body.theme-dark .od-items-table tbody td {
    background-color: var(--theme-neutral-800) !important;
    color: var(--theme-neutral-100) !important;
    border-color: var(--theme-neutral-700) !important;
}

body.theme-dark .order-notes-box {
    background-color: color-mix(in srgb, var(--theme-info-500) 15%, transparent) !important;
}
</style>
