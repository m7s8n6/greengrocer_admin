<template>
    <div>
        <div class="page-heading">
            <div class="page-title d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3">
                <h3 class="mb-0">{{ __('settings') }}</h3>
                <div class="d-flex flex-wrap align-items-center gap-3">
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb mb-0">
                            <li class="breadcrumb-item"><router-link :to="dashboardPath">{{ __('dashboard') }}</router-link></li>
                            <li class="breadcrumb-item active" aria-current="page">{{ __('settings') }}</li>
                        </ol>
                    </nav>
                    <button v-if="isSellerOrDeliveryBoy" type="button" class="btn btn-outline-danger" @click="deleteAccount"
                        :disabled="isLoading">
                        <i class="fas fa-trash-alt me-1" aria-hidden="true"></i>{{ __('delete_account') }}
                    </button>
                </div>
            </div>
        </div>
        <div class="page-content">
            <section class="row">
                <div class="col-12 col-lg-12">
                    <div class="row">
                        <div class="col-12 col-lg-6 mb-4 d-flex flex-column">
                            <form @submit.prevent="saveMailSetting" class="flex-grow-1 d-flex flex-column">
                                <div class="card flex-grow-1 mb-0">
                                    <div class="card-header">
                                        <h4 class="card-title float-none">{{ __('order_mail_settings') }}</h4>
                                        <p class="text-muted small mb-0 mt-1">{{ tr('order_mail_settings_desc', 'Choose which order status updates send an email or SMS.') }}</p>
                                    </div>
                                    <div class="card-body">
                                        <div class="row">
                                            <div class="col-md-12">
                                                <div>
                                                    <div class="settings-status-grid">
                                                        <div class="row d-flex justify-content-between align-items-center settings-grid-head">
                                                            <div class="col-6 col-md-8">
                                                                <h6>{{ __('order_status') }}</h6>
                                                            </div>
                                                            <div class="col-3 col-md-2 settings-col-head">
                                                                <h6>{{ __('mail') }}</h6>
                                                            </div>
                                                            <div class="col-3 col-md-2 settings-col-head">
                                                                <h6>{{ __('sms') }}</h6>
                                                            </div>
                                                        </div>
                                                        <!-- "All" row: same columns as the status rows, so its switches line up exactly -->
                                                        <div v-if="statuses.length" class="row d-flex justify-content-between align-items-center settings-grid-row settings-grid-row--all">
                                                            <div class="col-6 col-md-8 d-flex align-items-center gap-2 min-w-0">
                                                                <span class="icon-tile tone-primary" aria-hidden="true"><i class="bi bi-check2-all"></i></span>
                                                                <label class="text-truncate">{{ tr('all_statuses', 'All statuses') }}</label>
                                                            </div>
                                                            <div class="form-check form-switch col-3 col-md-2 d-flex justify-content-center m-0">
                                                                <input class="form-check-input" type="checkbox" :checked="allOn(mail_statuses)"
                                                                    @change="setAll('mail_statuses', $event.target.checked)"
                                                                    :aria-label="__('mail') + ' - ' + tr('all_statuses', 'All statuses')">
                                                            </div>
                                                            <div class="form-check form-switch col-3 col-md-2 d-flex justify-content-center m-0">
                                                                <input class="form-check-input" type="checkbox" :checked="allOn(sms_statuses)"
                                                                    @change="setAll('sms_statuses', $event.target.checked)"
                                                                    :aria-label="__('sms') + ' - ' + tr('all_statuses', 'All statuses')">
                                                            </div>
                                                        </div>
                                                        <div v-for="(status, index) in statuses" :key="'st-' + status.id + '-' + index"
                                                            class="row d-flex justify-content-between align-items-center settings-grid-row">
                                                            <div class="col-6 col-md-8 d-flex align-items-center gap-2 min-w-0">
                                                                <span class="icon-tile" :class="'tone-' + statusTone(status.id)" aria-hidden="true">
                                                                    <i :class="statusIcon(status.id)"></i>
                                                                </span>
                                                                <label class="text-truncate"> {{ getStatusDisplayName(status) }} </label>
                                                            </div>
                                                            <div
                                                                class="form-check form-switch col-3 col-md-2 d-flex justify-content-center m-0">
                                                                <input class='form-check-input' type='checkbox'
                                                                    :id="'checkbox_mail_' + status.id"
                                                                    :value="status.id" v-model="mail_statuses"
                                                                    :checked="mail_statuses.includes(status.id)">
                                                            </div>

                                                            <div
                                                                class="form-check form-switch col-3 col-md-2 d-flex justify-content-center m-0">
                                                                <input class='form-check-input' type='checkbox'
                                                                    :id="'checkbox_sms_' + status.id" :value="status.id"
                                                                    v-model="sms_statuses"
                                                                    :checked="sms_statuses.includes(status.id)">
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="card-footer d-flex justify-content-end">
                                        <button type="button" class="btn btn-outline-secondary mr-2" @click="$router.go(-1)">{{
                                            __('back') }}</button>
                                        <button type="submit" class="btn btn-primary" :disabled="isLoading && savingForm === 'mail'">
                                            {{ __('save') }} <b-spinner v-if="isLoading && savingForm === 'mail'" small
                                                label="Spinning"></b-spinner>
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div class="col-12 col-lg-6 mb-4 d-flex flex-column">
                            <form @submit.prevent="saveRecord" class="flex-grow-1 d-flex flex-column">
                                <div class="card flex-grow-1 mb-0">
                                    <div class="card-header">
                                        <h4 class="card-title float-none">{{ __('change_username_and_password') }}</h4>
                                        <p class="text-muted small mb-0 mt-1">{{ tr('change_username_and_password_desc', 'Update your login username and password.') }}</p>
                                    </div>
                                    <div class="card-body">
                                        <div class="row">
                                            <div class="col-md-12">
                                                <div>
                                                    <div class="form-group">
                                                        <label for='username'>{{ __('username') }}</label>
                                                        <div class="field-icon">
                                                            <i class="bi bi-person field-icon__lead" aria-hidden="true"></i>
                                                            <input type='text' id='username' v-model="settings.username"
                                                                class='form-control' :placeholder="__('username')"
                                                                autocomplete="username" required />
                                                        </div>
                                                    </div>
                                                    <div class="form-group" v-for="f in passwordFields" :key="f.key">
                                                        <label :for="f.key">{{ __(f.label) }}</label>
                                                        <div class="field-icon">
                                                            <i class="bi bi-lock field-icon__lead" aria-hidden="true"></i>
                                                            <input :type="showPw[f.key] ? 'text' : 'password'" :id="f.key"
                                                                v-model="settings[f.key]" class='form-control'
                                                                :placeholder="__(f.label)" :autocomplete="f.autocomplete" required />
                                                            <button type="button" class="field-icon__toggle" @click="showPw[f.key] = !showPw[f.key]"
                                                                :aria-label="showPw[f.key] ? tr('hide_password', 'Hide password') : tr('show_password', 'Show password')">
                                                                <i :class="showPw[f.key] ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <p v-if="settings.confirm_password && settings.password !== settings.confirm_password"
                                                        class="field-hint field-hint--error mb-2">
                                                        <i class="bi bi-exclamation-circle"></i>
                                                        {{ tr('passwords_do_not_match', 'New password and confirmation do not match.') }}
                                                    </p>
                                                    <p class="field-hint mb-0">
                                                        <i class="bi bi-shield-lock"></i>
                                                        {{ tr('password_change_hint', 'After saving you will be taken back to the dashboard. Use your new password the next time you log in.') }}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="card-footer d-flex justify-content-end">
                                        <button type="button" class="btn btn-outline-secondary mr-2" @click="$router.go(-1)">{{
                                            __('back') }}</button>
                                        <button type="submit" class="btn btn-primary" :disabled="isLoading && savingForm === 'password'">
                                            {{ __('save') }} <b-spinner v-if="isLoading && savingForm === 'password'" small
                                                label="Spinning"></b-spinner>
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

            </section>

        </div>
    </div>
</template>
<script>
import axios from "axios";
import Auth from '../Auth.js';
import { statusIcon, statusTone } from '../utils/orderStatus.js';
export default {
    data: function () {
        return {
            passwordFields: [
                { key: 'current_password', label: 'current_password', autocomplete: 'current-password' },
                { key: 'password', label: 'new_password', autocomplete: 'new-password' },
                { key: 'confirm_password', label: 'confirm_new_password', autocomplete: 'new-password' },
            ],
            showPw: { current_password: false, password: false, confirm_password: false },
            isLoading: false,
            // which Save button owns the spinner ('mail' | 'password'), so only that one spins
            savingForm: '',
            statuses: [],
            mail_statuses: [],
            mobile_statuses: [],
            sms_statuses: [],
            settings: {
                username: Auth.user.username,
                current_password: "",
                password: "",
                confirm_password: "",
            }
        };
    },
    computed: {
        isSellerOrDeliveryBoy: function () {
            return Auth.user.role_id === 3 || Auth.user.role_id === 4;
        },
        dashboardPath: function () {
            const roleId = Auth.user.role_id;
            return roleId === 3 ? '/seller' : (roleId === 4 ? '/delivery_boy' : '/dashboard');
        }
    },
    created: function () {
        this.getOrderStatus();
        this.getMailSetting();
    },
    methods: {
        tr(key, fallback) { const v = this.__(key); return v && v !== key ? v : fallback; },
        statusIcon,
        statusTone,
        // "All" switch in a column header: on when every status is selected in that column
        allOn(list) {
            return this.statuses.length > 0 && this.statuses.every(s => list.includes(s.id));
        },
        setAll(listName, on) {
            this[listName] = on ? [...new Set(this.statuses.map(s => s.id))] : [];
        },
        /**
         * Status label for display. API returns status_name as object by lang code { en: "...", hi: "..." }.
         * Picks current app locale; fallback to status.status.
         */
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
        getOrderStatus() {
            this.isLoading = true;
            let vm = this;

            let orderStatusesUrl = this.$apiUrl + '/order_statuses';
            let selfPickStatusesUrl = this.$apiUrl + '/order_statuses/self_pickup';

            Promise.all([
                axios.get(orderStatusesUrl),
                axios.get(selfPickStatusesUrl)
            ])
                .then(([orderResponse, selfPickResponse]) => {
                    this.isLoading = false;

                    // All order statuses (no filter)
                    let orderStatuses = orderResponse.data.data;

                    // Filter selfpick statuses (exclude IDs 1, 7, 8)
                    let selfPickStatuses = selfPickResponse.data.data.filter(
                        item => ![1, 7, 8].includes(item.id)
                    );

                    // Merge both
                    this.statuses = [
                        ...orderStatuses,
                        ...selfPickStatuses
                    ];
                })
                .catch(error => {
                    vm.isLoading = false;
                    if (error.request && error.request.statusText) {
                        this.showError(error.request.statusText);
                    } else if (error.message) {
                        this.showError(error.message);
                    } else {
                        this.showError(__('something_went_wrong'));
                    }
                });
        },

        getMailSetting: function () {
            let vm = this;
            axios.get(this.$apiUrl + '/mail_settings').then((response) => {
                this.isLoading = false
                let data = response.data.data;
                data.forEach((status) => {
                    if (status.mail_status === 1) {
                        this.mail_statuses.push(status.order_status_id);
                    }
                    if (status.mobile_status === 1) {
                        this.mobile_statuses.push(status.order_status_id);
                    }
                    if (status.sms_status === 1) {
                        this.sms_statuses.push(status.order_status_id);
                    }
                });
            }).catch(error => {
                vm.isLoading = false;
                if (error.request.statusText) {
                    this.showError(error.request.statusText);
                } else if (error.message) {
                    this.showError(error.message);
                } else {
                    this.showError(__('something_went_wrong'));
                }
            });
        },
        saveMailSetting: function () {
            let vm = this;
            this.savingForm = 'mail';
            this.isLoading = true;

            let formData = new FormData();
            this.statuses.forEach((status) => {
                formData.append('status_ids[]', status.id);
                if (this.mail_statuses.includes(status.id)) {
                    formData.append('mail_statuses[]', "1");
                } else {
                    formData.append('mail_statuses[]', "0");
                }
                if (this.mobile_statuses.includes(status.id)) {
                    formData.append('mobile_statuses[]', "1");
                } else {
                    formData.append('mobile_statuses[]', "0");
                }
                if (this.sms_statuses.includes(status.id)) {
                    formData.append('sms_statuses[]', "1");
                } else {
                    formData.append('sms_statuses[]', "0");
                }
            });
            axios.post(this.$apiUrl + '/mail_settings/save', formData).then(res => {
                let data = res.data;
                vm.isLoading = false;
                if (data.status === 1) {
                    vm.showMessage("success", data.message);
                    this.getMailSetting();
                } else {
                    vm.showError(data.message);
                }
            }).catch(error => {
                vm.isLoading = false;
                if (error.request.statusText) {
                    this.showError(error.request.statusText);
                } else if (error.message) {
                    this.showError(error.message);
                } else {
                    this.showError(__('something_went_wrong'));
                }
            });
        },

        saveRecord: function () {
            let vm = this;
            this.savingForm = 'password';
            this.isLoading = true;
            axios.post(this.$apiUrl + '/system_users/change_password', this.settings).then(res => {
                let data = res.data;
                vm.isLoading = false;
                if (data.status === 1) {
                    vm.showMessage("success", data.message);
                    // Update Auth.user.username in memory and localStorage so the header reflects immediately
                    Auth.user.username = vm.settings.username;
                    window.localStorage.setItem('user', JSON.stringify(Auth.user));
                    let role_id = Auth.user.role_id;
                    if (role_id === 3) {
                        this.$router.push('/seller');
                    } else if (role_id === 4) {
                        this.$router.push('/delivery_boy');
                    } else {
                        this.$router.push({ path: '/' });
                    }
                } else {
                    vm.showError(data.message);
                }
            }).catch(error => {
                vm.isLoading = false;
                if (error.request.statusText) {
                    this.showError(error.request.statusText);
                } else if (error.message) {
                    this.showError(error.message);
                } else {
                    this.showError(__('something_went_wrong'));
                }
            });
        },

        deleteAccount: function () {
            let vm = this;
            this.$swal.fire({
                title: __('are_you_sure'),
                text: __('delete_account_confirmation'),
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: 'var(--theme-error-500)',
                cancelButtonColor: 'var(--theme-primary-500)',
                confirmButtonText: __('yes_delete'),
                cancelButtonText: __('cancel')
            }).then((result) => {
                if (result.isConfirmed) {
                    vm.$swal.fire({
                        title: __('final_confirmation'),
                        text: __('delete_account_final_warning'),
                        icon: 'error',
                        showCancelButton: true,
                        confirmButtonColor: 'var(--theme-error-500)',
                        cancelButtonColor: 'var(--theme-primary-500)',
                        confirmButtonText: __('yes_delete_permanently'),
                        cancelButtonText: __('cancel'),
                        dangerMode: true
                    }).then((secondResult) => {
                        if (secondResult.isConfirmed) {
                            vm.isLoading = true;
                            let role_id = Auth.user.role_id;
                            let deleteUrl = '';

                            if (role_id === 3) {
                                deleteUrl = this.$sellerApiUrl + '/delete_seller_account';
                            } else if (role_id === 4) {
                                deleteUrl = this.$deliveryBoyApiUrl + '/delete_delivery_boy_account';
                            }

                            if (deleteUrl) {
                                axios.get(deleteUrl).then((response) => {
                                    vm.isLoading = false;
                                    let data = response.data;
                                    if (data.status === 1) {
                                        vm.showSuccess(data.message);
                                        Auth.logout();
                                        setTimeout(() => {
                                            vm.$router.push('/login');
                                        }, 1500);
                                    } else {
                                        vm.showError(data.message);
                                    }
                                }).catch(error => {
                                    vm.isLoading = false;
                                    if (error.request && error.request.statusText) {
                                        this.showError(error.request.statusText);
                                    } else if (error.message) {
                                        this.showError(error.message);
                                    } else {
                                        this.showError(__('something_went_wrong'));
                                    }
                                });
                            }
                        }
                    });
                }
            });
        }
    },
};
</script>
<style scoped>
.settings-grid-head {
    padding-bottom: 8px;
    margin-bottom: 4px;
    border-bottom: 1px solid var(--ui-border);
}
.settings-grid-head h6 {
    margin: 0;
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.02em;
    color: var(--ui-text-muted);
}
/* MAIL / SMS headers centred over their switch columns */
.settings-col-head {
    display: flex;
    justify-content: center;
}
.settings-grid-row {
    padding: 8px 0;
    border-bottom: 1px solid var(--ui-border);
    transition: background-color 0.15s ease;
}
.settings-grid-row:hover {
    background: var(--ui-surface-muted);
}
/* the switches sit exactly in the middle of their column, on every row */
.settings-grid-row .form-switch {
    padding: 0;
}
.settings-grid-row .form-switch .form-check-input {
    float: none;
    margin: 0;
}
.settings-grid-row--all {
    background: var(--ui-surface-muted);
}
.settings-grid-row--all label {
    font-weight: 700;
}
.settings-grid-row:last-child {
    border-bottom: 0;
}
.settings-grid-row label {
    margin: 0;
    font-size: 13px;
    font-weight: 600;
    color: var(--ui-text);
}

/* input with a leading icon (and an optional show/hide button at the end) */
.field-icon {
    position: relative;
}
/* doubled classes outrank the global ".form-control:not(…):not(…):not(…)" padding rule */
.field-icon.field-icon .form-control.form-control {
    padding-inline-start: 40px !important;
    padding-left: 40px !important;
}
.rtl .field-icon.field-icon .form-control.form-control {
    padding-left: 16px !important;
    padding-right: 40px !important;
}
.field-icon.field-icon:has(.field-icon__toggle) .form-control.form-control {
    padding-inline-end: 44px !important;
}
.field-icon__lead {
    position: absolute;
    top: 50%;
    inset-inline-start: 14px;
    transform: translateY(-50%);
    font-size: 16px;
    color: var(--ui-text-subtle);
    pointer-events: none;
}
.field-icon__toggle {
    position: absolute;
    top: 50%;
    inset-inline-end: 6px;
    transform: translateY(-50%);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border: 0;
    border-radius: var(--ui-radius-sm);
    background: transparent;
    color: var(--ui-text-muted);
    font-size: 16px;
}
.field-icon__toggle:hover {
    background: var(--ui-surface-muted);
    color: var(--ui-text);
}
.field-hint {
    display: flex;
    align-items: flex-start;
    gap: 6px;
    font-size: 12px;
    line-height: 1.45;
    color: var(--ui-text-muted);
}
.field-hint--error {
    color: var(--theme-error-600);
}
</style>
