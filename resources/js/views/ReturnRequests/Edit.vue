<template>
    <b-modal ref="my-modal" :title="modal_title" @hidden="$emit('modalClose')" no-fade static size="lg">
        <div slot="modal-footer">
            <b-button variant="primary" @click="$refs['dummy_submit'].click()" :disabled="isLoading">{{ __('save') }}
                <b-spinner v-if="isLoading" small label="Spinning"></b-spinner>
            </b-button>
            <b-button variant="secondary" @click="hideModal">{{ __('cancel') }}</b-button>
        </div>
        <form ref="my-form" @submit.prevent="saveRecord">
            <div class="row">
                <div class="col-md-12">
                    <div class="form-group">
                        <label class="form-label fw-bold mb-3">{{ __('status') }} <span
                                class="text-danger">*</span></label>

                        <!-- Customer Details for Delivery Boy -->
                        <div v-if="login_user.role_id == 4 && order_details"
                            class="mb-4 p-3 rounded-3 bg-light border border-secondary border-opacity-10">
                            <h6 class="fw-bold mb-3">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                                    xmlns="http://www.w3.org/2000/svg" class="me-2 text-primary"
                                    style="display: inline-block; vertical-align: middle;">
                                    <path d="M20 21C20 16.5817 16.4183 13 12 13C7.58172 13 4 16.5817 4 21"
                                        stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                    <circle cx="12" cy="7" r="4" stroke="currentColor" stroke-width="2"
                                        stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                                {{ __('customer_details') || 'Customer Details' }}
                            </h6>
                            <div class="row">
                                <div class="col-md-6 mb-2">
                                    <span class="small text-muted d-block">{{ __('name') }}</span>
                                    <span class="fw-bold small">{{ record.customer_name || record.name }}</span>
                                </div>
                                <div class="col-md-6 mb-2">
                                    <span class="small text-muted d-block">{{ __('mobile') }}</span>
                                    <span class="fw-bold small">{{ record.customer_mobile || order_details.order_mobile
                                        }}</span>
                                </div>
                                <div class="col-12">
                                    <span class="small text-muted d-block">{{ __('address') }}</span>
                                    <span class="fw-bold small text-wrap d-block">{{ order_details.order_address
                                        }}</span>
                                </div>
                            </div>
                        </div>

                        <!-- Return Item Summary -->
                        <div class="mb-4 p-3 rounded-3 bg-light border border-secondary border-opacity-10">
                            <h6 class="fw-bold mb-3">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                                    xmlns="http://www.w3.org/2000/svg" class="me-2 text-primary"
                                    style="display: inline-block; vertical-align: middle;">
                                    <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" stroke-width="2"
                                        stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M2 17L12 22L22 17" stroke="currentColor" stroke-width="2"
                                        stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M2 12L12 17L22 12" stroke="currentColor" stroke-width="2"
                                        stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                                {{ __('return_item') || 'Return Item' }}
                            </h6>
                            <div class="d-flex align-items-center">
                                <div class="flex-grow-1">
                                    <div class="fw-bold small text-dark mb-1">{{ record.product_name }}</div>
                                    <div class="small text-muted">{{ record.variant_name }} | {{ __('quantity') }}: {{
                                        record.quantity }}</div>
                                    <div class="small text-primary fw-bold mt-1">{{ $currency }} {{ record.sub_total }}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Seller Statuses (role_id: 3) - Only show Pending, Delivery Boy Assigned, Approve, Reject -->
                        <div v-if="login_user.role_id == 3" class="row g-2">
                            <div class="col-lg-3 col-md-4 col-sm-6 mb-2">
                                <div class="card h-100 border-2 status-card"
                                    :class="returnRequest.status == '1' ? 'border-warning bg-warning bg-opacity-10' : 'border-light'"
                                    @click="returnRequest.status = '1'">
                                    <div
                                        class="card-body text-center d-flex flex-column justify-content-center align-items-center p-3">
                                        <div class="mb-2 fs-4">&#8635;</div>
                                        <div class="fw-bold small">{{ __('pending') }}</div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-3 col-md-4 col-sm-6 mb-2">
                                <div class="card h-100 border-2 status-card"
                                    :class="returnRequest.status == '4' ? 'border-info bg-info bg-opacity-10' : 'border-light'"
                                    @click="returnRequest.status = '4'">
                                    <div
                                        class="card-body text-center d-flex flex-column justify-content-center align-items-center p-3">
                                        <div class="mb-2 fs-4">&#128100;</div>
                                        <div class="fw-bold small">{{ __('delivery_boy_assigned') }}</div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-3 col-md-4 col-sm-6 mb-2">
                                <div class="card h-100 border-2 status-card"
                                    :class="returnRequest.status == '2' ? 'border-success bg-success bg-opacity-10' : 'border-light'"
                                    @click="returnRequest.status = '2'">
                                    <div
                                        class="card-body text-center d-flex flex-column justify-content-center align-items-center p-3">
                                        <div class="mb-2 fs-4">&#9989;</div>
                                        <div class="fw-bold small">{{ __('approve') }}</div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-3 col-md-4 col-sm-6 mb-2">
                                <div class="card h-100 border-2 status-card"
                                    :class="returnRequest.status == '3' ? 'border-danger bg-danger bg-opacity-10' : 'border-light'"
                                    @click="returnRequest.status = '3'">
                                    <div
                                        class="card-body text-center d-flex flex-column justify-content-center align-items-center p-3">
                                        <div class="mb-2 fs-4">&#10060;</div>
                                        <div class="fw-bold small">{{ __('reject') }}</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Delivery Boy Statuses (role_id: 4) - Only show Out for Pickup, Received from Customer, Return to Seller, Cancelled -->
                        <div v-else-if="login_user.role_id == 4" class="row g-2">
                            <div class="col-lg-3 col-md-4 col-sm-6 mb-2">
                                <div class="card h-100 border-2 status-card"
                                    :class="returnRequest.status == '5' ? 'border-primary bg-primary bg-opacity-10' : 'border-light'"
                                    @click="returnRequest.status = '5'">
                                    <div
                                        class="card-body text-center d-flex flex-column justify-content-center align-items-center p-3">
                                        <div class="mb-2 fs-4">&#128666;</div>
                                        <div class="fw-bold small">{{ __('out_for_pickup') }}</div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-3 col-md-4 col-sm-6 mb-2">
                                <div class="card h-100 border-2 status-card"
                                    :class="returnRequest.status == '6' ? 'border-secondary bg-secondary bg-opacity-10' : 'border-light'"
                                    @click="returnRequest.status = '6'">
                                    <div
                                        class="card-body text-center d-flex flex-column justify-content-center align-items-center p-3">
                                        <div class="mb-2 fs-4">&#128230;</div>
                                        <div class="fw-bold small">{{ __('received_from_customer') }}</div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-3 col-md-4 col-sm-6 mb-2">
                                <div class="card h-100 border-2 status-card"
                                    :class="returnRequest.status == '8' ? 'border-dark bg-dark bg-opacity-10' : 'border-light'"
                                    @click="returnRequest.status = '8'">
                                    <div
                                        class="card-body text-center d-flex flex-column justify-content-center align-items-center p-3">
                                        <div class="mb-2 fs-4">&#127980;</div>
                                        <div class="fw-bold small">{{ __('return_to_seller') }}</div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-3 col-md-4 col-sm-6 mb-2">
                                <div class="card h-100 border-2 status-card"
                                    :class="returnRequest.status == '7' ? 'border-danger bg-danger bg-opacity-10' : 'border-light'"
                                    @click="returnRequest.status = '7'">
                                    <div
                                        class="card-body text-center d-flex flex-column justify-content-center align-items-center p-3">
                                        <div class="mb-2 fs-4">&#128683;</div>
                                        <div class="fw-bold small">{{ __('cancelled') }}</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- All Other Roles (not 3 and not 4) - Show all statuses -->
                        <div v-else class="row g-2">
                            <div class="col-lg-3 col-md-4 col-sm-6 mb-2">
                                <div class="card h-100 border-2 status-card"
                                    :class="returnRequest.status == '1' ? 'border-warning bg-warning bg-opacity-10' : 'border-light'"
                                    @click="returnRequest.status = '1'">
                                    <div
                                        class="card-body text-center d-flex flex-column justify-content-center align-items-center p-3">
                                        <div class="mb-2 fs-4">&#8635;</div>
                                        <div class="fw-bold small">{{ __('pending') }}</div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-3 col-md-4 col-sm-6 mb-2">
                                <div class="card h-100 border-2 status-card"
                                    :class="returnRequest.status == '4' ? 'border-info bg-info bg-opacity-10' : 'border-light'"
                                    @click="returnRequest.status = '4'">
                                    <div
                                        class="card-body text-center d-flex flex-column justify-content-center align-items-center p-3">
                                        <div class="mb-2 fs-4">&#128100;</div>
                                        <div class="fw-bold small">{{ __('delivery_boy_assigned') }}</div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-3 col-md-4 col-sm-6 mb-2">
                                <div class="card h-100 border-2 status-card"
                                    :class="returnRequest.status == '5' ? 'border-primary bg-primary bg-opacity-10' : 'border-light'"
                                    @click="returnRequest.status = '5'">
                                    <div
                                        class="card-body text-center d-flex flex-column justify-content-center align-items-center p-3">
                                        <div class="mb-2 fs-4">&#128666;</div>
                                        <div class="fw-bold small">{{ __('out_for_pickup') }}</div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-3 col-md-4 col-sm-6 mb-2">
                                <div class="card h-100 border-2 status-card"
                                    :class="returnRequest.status == '6' ? 'border-secondary bg-secondary bg-opacity-10' : 'border-light'"
                                    @click="returnRequest.status = '6'">
                                    <div
                                        class="card-body text-center d-flex flex-column justify-content-center align-items-center p-3">
                                        <div class="mb-2 fs-4">&#128230;</div>
                                        <div class="fw-bold small">{{ __('received_from_customer') }}</div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-3 col-md-4 col-sm-6 mb-2">
                                <div class="card h-100 border-2 status-card"
                                    :class="returnRequest.status == '8' ? 'border-dark bg-dark bg-opacity-10' : 'border-light'"
                                    @click="returnRequest.status = '8'">
                                    <div
                                        class="card-body text-center d-flex flex-column justify-content-center align-items-center p-3">
                                        <div class="mb-2 fs-4">&#127980;</div>
                                        <div class="fw-bold small">{{ __('return_to_seller') }}</div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-3 col-md-4 col-sm-6 mb-2">
                                <div class="card h-100 border-2 status-card"
                                    :class="returnRequest.status == '2' ? 'border-success bg-success bg-opacity-10' : 'border-light'"
                                    @click="returnRequest.status = '2'">
                                    <div
                                        class="card-body text-center d-flex flex-column justify-content-center align-items-center p-3">
                                        <div class="mb-2 fs-4">&#9989;</div>
                                        <div class="fw-bold small">{{ __('approve') }}</div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-3 col-md-4 col-sm-6 mb-2">
                                <div class="card h-100 border-2 status-card"
                                    :class="returnRequest.status == '3' ? 'border-danger bg-danger bg-opacity-10' : 'border-light'"
                                    @click="returnRequest.status = '3'">
                                    <div
                                        class="card-body text-center d-flex flex-column justify-content-center align-items-center p-3">
                                        <div class="mb-2 fs-4">&#10060;</div>
                                        <div class="fw-bold small">{{ __('reject') }}</div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-3 col-md-4 col-sm-6 mb-2">
                                <div class="card h-100 border-2 status-card"
                                    :class="returnRequest.status == '7' ? 'border-danger bg-danger bg-opacity-10' : 'border-light'"
                                    @click="returnRequest.status = '7'">
                                    <div
                                        class="card-body text-center d-flex flex-column justify-content-center align-items-center p-3">
                                        <div class="mb-2 fs-4">&#128683;</div>
                                        <div class="fw-bold small">{{ __('cancelled') }}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <input type="hidden" v-model="returnRequest.order_id">

                    <!-- Show delivery boy assignment only if user is not delivery boy and status is Delivery Boy Assigned -->
                    <div class="form-group mt-4" v-if="returnRequest.status == 4 && login_user.role_id != 4">
                        <label for="delivery_boy_id" class="form-label fw-bold">{{ __('assign_delivery_boy') }} <span
                                class="text-danger">*</span></label>
                        <select id="delivery_boy_id" name="delivery_boy_id" class="form-control form-select"
                            v-model="returnRequest.delivery_boy_id" required>
                            <option value="">{{ __('select_delivery_boy') }}</option>
                            <option v-for="boy in deliveryBoys" :key="boy.id" :value="boy.id">{{
                                getDisplayName(boy.name) }}</option>
                        </select>
                    </div>

                    <!-- Show cancellation reason only if status is Cancelled -->
                    <div class="form-group mt-4" v-if="returnRequest.status == 7">
                        <label for="cancellation_reason" class="form-label fw-bold">{{ __('cancellation_reason') }}
                            <span class="text-danger">*</span></label>
                        <textarea name="cancellation_reason" id="cancellation_reason"
                            v-model="returnRequest.cancellation_reason" class="form-control"
                            placeholder="Enter cancellation reason" rows="3" required></textarea>
                    </div>
                </div>

                <div class="col-md-12 mt-4">
                    <div class="form-group">
                        <label for="remark" class="form-label fw-bold">{{ __('remark') }}</label>
                        <textarea name="remark" id="remark" v-model="returnRequest.remark" class="form-control"
                            placeholder="Enter Remark" rows="3"></textarea>
                    </div>
                </div>
            </div>
            <button ref="dummy_submit" style="display:none;"></button>
        </form>
    </b-modal>
</template>

<script>
import axios from 'axios';
import Auth from '../../Auth.js';

export default {
    props: ['record'],
    data: function () {
        return {
            isLoading: false,
            login_user: Auth.user,
            deliveryBoys: '',
            delivery_boy_id: '',
            returnRequest: {
                id: this.record ? this.record.id : null,
                status: this.record ? this.record.status : "",
                order_id: this.record ? this.record.order_id : "",
                delivery_boy_id: this.record ? this.record.delivery_boy_id : 0,
                remark: this.record ? this.record.remarks : "",
                cancellation_reason: this.record ? this.record.cancellation_reason : "",
            },
            order_details: null
        };
    },
    computed: {
        modal_title: function () {
            let title = this.returnRequest.id ? __('edit') : __('add');
            title += ' ' + __('return_requests');
            return title;
        },
    },
    methods: {
        getDisplayName(name) {
            if (name == null) return '';
            if (typeof name === 'string') return name;
            if (typeof name === 'object' && !Array.isArray(name)) {
                const appLocale = window.appLocale || (window.localStorage && window.localStorage.getItem('lang')) || 'en';
                const forLocale = name[appLocale];
                if (forLocale != null && String(forLocale).trim() !== '') return String(forLocale).trim();
                const firstNonEmpty = Object.values(name).find(val => val != null && String(val).trim() !== '');
                return firstNonEmpty != null ? String(firstNonEmpty).trim() : '';
            }
            return '';
        },
        showModal() {
            this.$refs['my-modal'].show();
            this.getOrder();
        },
        hideModal() {
            this.$refs['my-modal'].hide()
        },

        getOrder() {
            this.isLoading = true

            axios.get(this.$apiUrl + '/orders/view/' + this.record.order_id)
                .then((response) => {

                    this.isLoading = false
                    let data = response.data;
                    if (data.status === 1) {
                        this.deliveryBoys = response.data.data.deliveryBoys;
                        this.order_details = response.data.data.order;
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

        saveRecord: function () {
            let vm = this;
            this.isLoading = true;
            let formObject = this.returnRequest;
            let formData = new FormData();
            for (let key in formObject) {
                formData.append(key, formObject[key]);
            }

            // Determine API endpoint based on user role
            let url = this.$apiUrl + '/return_requests/update';
            if (this.login_user.role_id == 3) { // Seller
                url = this.$apiUrl + '/seller/return_request_status_update';
            } else if (this.login_user.role_id == 4) { // Delivery Boy
                url = this.$apiUrl + '/delivery_boy/return_request_status_update';
            }
            // Admin (role_id 1, 2) uses default /return_requests/update

            axios.post(url, formData).then(res => {
                let data = res.data;
                if (data.status === 1) {
                    this.$eventBus.$emit('returnRequestSaved', data.message);
                    this.hideModal();
                } else {
                    vm.showError(data.message);
                    vm.isLoading = false;
                }
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
        }

    },
    mounted() {
        this.showModal();
    }
}
</script>

<style scoped>
.status-card {
    cursor: pointer !important;
    transition: all 0.2s ease-in-out !important;
    border: 1px solid #EDEDED !important;
}

.status-card:hover {
    transform: translateY(-2px) !important;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08) !important;
}

/* Active status overrides to combat .card !important rules in global CSS */
.status-card.bg-warning {
    background-color: rgba(255, 193, 7, 0.15) !important;
    border: 2px solid #ffc107 !important;
    color: #856404 !important;
}

.status-card.bg-info {
    background-color: rgba(13, 202, 240, 0.15) !important;
    border: 2px solid #0dcaf0 !important;
    color: #087990 !important;
}

.status-card.bg-success {
    background-color: rgba(25, 135, 84, 0.15) !important;
    border: 2px solid #198754 !important;
    color: #0f5132 !important;
}

.status-card.bg-danger {
    background-color: rgba(220, 53, 69, 0.15) !important;
    border: 2px solid #dc3545 !important;
    color: #842029 !important;
}

.status-card.bg-primary {
    background-color: rgba(55, 162, 121, 0.15) !important;
    border: 2px solid var(--figma-primary, #37a279) !important;
    color: var(--figma-primary, #37a279) !important;
}

.status-card.bg-secondary {
    background-color: rgba(108, 117, 125, 0.15) !important;
    border: 2px solid #6c757d !important;
    color: #495057 !important;
}

.status-card.bg-dark {
    background-color: rgba(33, 37, 41, 0.15) !important;
    border: 2px solid #212529 !important;
    color: #212529 !important;
}

/* Inactive states / fallback border-light styling */
.status-card.border-light {
    border: 1px solid #EDEDED !important;
    background-color: #FFFFFF !important;
    color: #333333 !important;
}
</style>
