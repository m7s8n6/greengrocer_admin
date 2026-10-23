<template>
    <div class="auth" :style="{ backgroundImage: 'url(' + $panelLoginBackgroundImg + ')' }">
        <div class="login-wrapper">
            <div class="detail-card">
                <div class="auth-logo">
                    <a href="javascript:void(0)" class="d-flex align-items-center justify-content-center">
                        <img class="auth-logo-img login-logo-light" v-if="$appLogo != ''" :src="$storageUrl + $appLogo" alt="Logo" />
                        <img class="auth-logo-img login-logo-light" v-else :src="$baseUrl + '/images/logo.png'" alt="Logo" />
                        <img class="auth-logo-img login-logo-dark" v-if="$appDarkLogo" :src="$storageUrl + $appDarkLogo" alt="Logo" />
                    </a>
                </div>
                <nav aria-label="breadcrumb" class="register-breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><router-link :to="{ name: 'delivery_boy_login' }">{{ __('login') }}</router-link></li>
                        <li class="breadcrumb-item active" aria-current="page">{{ __('delivery_boy_complete_profile') }}</li>
                    </ol>
                </nav>
                <h4>{{ __('delivery_boy_complete_profile') }}</h4>
                <p class="auth-subtitle text-primary">{{ __('please_complete_the_form_to_complete_your_registration') }}</p>
                <form ref="my-form" @submit.prevent="saveRecord" novalidate>
                    <div class="content">
                        <div class="register-section">
                        <h6 class="register-section-title">{{ __('delivery_boy_information') }}</h6>
                        <div class="row">
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label for="name">{{ __('name') }} <span class="text-danger text-xs">*</span></label>
                                    <input type="text" name="name" id="name" v-model="deliveryBoys.name"
                                        class="form-control" :placeholder="__('enter_name')">
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label for="dob">{{ __('dob') }} <span class="text-danger text-xs">*</span></label>
                                    <input type="date" name="dob" id="dob" v-model="deliveryBoys.dob" required
                                        class="form-control" :placeholder="__('dob')"
                                        @input="validateDateOfBirth">
                                    <span v-if="dobvalidationError" class="error">{{ dobvalidationError }}</span>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form-group mobile">
                                    <label for="mobile">{{ __('mobile') }} <span class="text-danger text-xs">*</span></label>
                                    <input type="number" name="mobile" id="mobile" v-model="deliveryBoys.mobile"
                                        class="form-control" :placeholder="__('mobile')"
                                        @input="validateMobileNumber">
                                    <span v-if="mobilevalidationError" class="error">{{ mobilevalidationError }}</span>
                                </div>
                            </div>

                            <div class="col-md-4">
                                <div class="form-group">
                                    <label for="email">{{ __('email') }} <span class="text-danger text-xs">*</span></label>
                                    <input type="email" name="email" id="email" v-model="deliveryBoys.email"
                                        class="form-control" :placeholder="__('email')">
                                </div>
                            </div>

                            <div class="col-md-4">
                                <div class="form-group">
                                    <label for="password">{{ __('password') }} <span class="text-danger text-xs">*</span></label>
                                    <div class="input-group">
                                        <input :type="showPassword ? 'text' : 'password'" name="password" id="password"
                                            v-model="deliveryBoys.password" class="form-control"
                                            :placeholder="__('password')">
                                        <button type="button" v-on:click="showPassword = !showPassword"
                                            class="btn btn-outline-secondary pw-toggle-btn">
                                            <img v-if="showPassword" :src="$baseUrl + '/images/icons/show_password.svg'" alt="toggle-password" />
                                            <img v-else :src="$baseUrl + '/images/icons/hide_password.svg'" alt="toggle-password" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label for="confirm_password">{{ __('confirm_password') }} <span
                                            class="text-danger text-xs">*</span></label>
                                    <div class="input-group">
                                        <input :type="showConfirmPassword ? 'text' : 'password'" name="confirm_password"
                                            id="confirm_password" v-model="deliveryBoys.confirm_password"
                                            class="form-control" :placeholder="__('confirm_password')">
                                        <button type="button" v-on:click="showConfirmPassword = !showConfirmPassword"
                                            class="btn btn-outline-secondary pw-toggle-btn">
                                            <img v-if="showConfirmPassword"
                                                :src="$baseUrl + '/images/icons/show_password.svg'" alt="toggle-password" />
                                            <img v-else :src="$baseUrl + '/images/icons/hide_password.svg'" alt="toggle-password" />
                                        </button>
                                    </div>
                                </div>
                            </div>


                            <div class="col-md-6 form-group">
                                <label for="city_name">{{ __('select_or_search_city') }} <span
                                        class="text-danger text-xs">*</span></label>
                                <multiselect v-model="city" :options="cities" @close="setCityId" :multiple="true"
                                    :close-on-select="false" :clear-on-select="false" :hide-selected="true"
                                    :placeholder="__('select_and_search_city')" label="name" track-by="id" id="city_name">
                                    <template slot="option" slot-scope="props">
                                        <div class="option__desc">
                                            <span class="option__title">{{
                                                props.option.formatted_address
                                            }}</span>
                                        </div>
                                    </template>
                                </multiselect>
                            </div>

                            <div class="col-md-3" v-if="allowSellerOwnDrivers">
                                <div class="form-group">
                                    <label for="register_to">Register To <span
                                            class="text-danger text-xs">*</span></label>
                                    <select id="register_to" v-model="deliveryBoys.register_to" @change="onRegisterToChange"
                                        class="form-control form-select">
                                        <option value="admin">Admin</option>
                                        <option value="seller">Seller</option>
                                    </select>
                                </div>
                            </div>
                            <div v-if="deliveryBoys.register_to === 'seller'" class="col-md-6 form-group">
                                <label for="seller_name">Select Seller <span class="text-danger text-xs">*</span></label>
                                <multiselect v-model="seller" :options="sellers" @input="setSellerId"
                                    :disabled="!deliveryBoys.city_id" :show-no-options="true"
                                    :placeholder="deliveryBoys.city_id ? 'Select and Search Seller' : 'Select city first'" label="name" track-by="id" id="seller_name">
                                </multiselect>
                            </div>

                            <div class="col-md-3">
                                <div class="form-group">
                                    <label for="bonus_type">{{ __('bonus_type') }} <span
                                            class="text-danger text-xs">*</span></label>
                                    <select name="bonus_type" id="bonus_type" @change="changeBonusType"
                                        v-model="deliveryBoys.bonus_type" class="form-control form-select">
                                        <option value="">{{ __('select') }}</option>
                                        <option value="1">{{ __('commission') }}</option>
                                        <option value="0">{{ __('salaried') }}</option>
                                    </select>
                                </div>
                            </div>
                            <div v-if="deliveryBoys.bonus_type == 1" class="col-md-3">
                                <div class="form-group">
                                    <label for="bonus_percentage">{{ __('bonus_percentage') }} <span
                                            class="text-danger text-xs">*</span></label>
                                    <input type="number" min="0.1" max="100" step="0.1" @input="validateCommission"
                                        name="bonus_percentage" id="bonus_percentage"
                                        v-model="deliveryBoys.bonus_percentage" class="form-control"
                                        :placeholder="__('bonus_percentage')">
                                    <span v-if="bonusValidationMessage" class="error">{{ bonusValidationMessage
                                        }}</span>
                                </div>
                            </div>

                        </div>
                        </div>

                        <!-- Custom Fields -->
                        <div class="register-section" v-if="customFields.length">
                        <h6 class="register-section-title">{{ __('custom_fields') }}</h6>
                        <div class="row">
                                <div class="col-md-4" v-for="field in translatedCustomFields" :key="field.id">
                                    <div class="form-group">
                                        <label>{{ field.name }}
                                            <span v-if="field.is_required" class="text-danger text-xs">*</span></label>

                                        <textarea v-if="field.type === 'textarea'" class="form-control"
                                            v-model="customFieldValues[field.id]" :placeholder="field.name"></textarea>

                                        <select v-else-if="field.type === 'dropdown'" class="form-control form-select"
                                            v-model="customFieldValues[field.id]">
                                            <option value="" disabled>{{ __('select') || 'Select' }}</option>
                                            <option v-for="option in field.options" :key="option" :value="option">
                                                {{ option }}
                                            </option>
                                        </select>

                                        <input v-else-if="field.type === 'file'" type="file" class="form-control"
                                            @change="handleCustomFieldFile($event, field.id)">

                                        <custom-field-date v-else-if="field.type === 'date'" v-model="customFieldValues[field.id]"
                                            :placeholder="field.name"></custom-field-date>
                                        <input v-else :type="field.type === 'number' ? 'number' : 'text'"
                                            class="form-control" v-model="customFieldValues[field.id]"
                                            :placeholder="field.name">
                                    </div>
                                </div>
                        </div>
                        </div>
                    </div>
                    <div class="register-actions">
                        <button class="btn btn-primary btn-lg">
                            {{ __('complete') }}
                            <b-spinner v-if="isLoading" small label="Spinning"></b-spinner>
                        </button>
                    </div>
                </form>
                <div class="auth-copyright">
                    <a href="javascript:void(0)" class="text-primary font-weight-normal"> {{ $copyrightDetails }}</a>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
import Auth from '../../Auth.js';
import { VuejsDatatableFactory } from "vuejs-datatable";
import Select2 from "v-select2-component";
import Multiselect from "vue-multiselect";
import Editor from "@tinymce/tinymce-vue";
export default {
    components: {
        VuejsDatatableFactory,
        Select2,
        Multiselect,
        'editor': Editor
    },
    data: function () {
        return {
            isLoading: false,

            city: [],
            cities: [],
            seller: null,
            sellers: [],
            // Admin's global "Allow Sellers' Own Drivers" switch - Register To stays hidden
            // (always Admin) unless it is on.
            allowSellerOwnDrivers: false,
            deliveryBoys: {
                register_to: "admin",
                seller_id: "",

                mobile: "",
                dob: "",

                bonus_percentage: "",
                city_id: "",
                password: "",
                confirm_password: "",
            },
            mobilevalidationError: null,
            dobvalidationError: null,
            account_numbervalidationError: null,
            showPassword: false,
            showConfirmPassword: false,
            bonusValidationMessage: null,

            customFields: [],
            customFieldValues: {},
            customFieldFiles: {},
            currentLanguageId: null,
            activeLanguages: [],

        };
    },
    created: function () {
        this.getCities();
        this.getAllowSellerOwnDrivers();
        this.fetchActiveLanguages();
        this.getCustomFields();
    },
    mounted() {
        let user_theme = sessionStorage.getItem("user-theme");
        if (user_theme === 'theme-dark' || user_theme === 'theme-light') { document.body.classList.remove('theme-light', 'theme-dark'); document.body.classList.add(user_theme); }

    },
    computed: {
        // Custom fields shown to the end user in the current app locale, falling back to the
        // default-language name/options when no translation exists for it.
        translatedCustomFields: function () {
            const list = Array.isArray(this.customFields) ? this.customFields : [];

            if (!this.currentLanguageId || list.length === 0) {
                return list;
            }

            return list.map(field => {
                const translatedField = { ...field };

                if (Array.isArray(field.translations)) {
                    const translation = field.translations.find(
                        t => t.language_id === this.currentLanguageId
                    );

                    if (translation && translation.name && translation.name.trim() !== '') {
                        translatedField.name = translation.name;
                    }
                    if (translation && Array.isArray(translation.options) && translation.options.length > 0) {
                        translatedField.options = translation.options;
                    }
                }

                return translatedField;
            });
        },
    },
    methods: {
        fetchActiveLanguages() {
            return axios.get(this.$apiUrl + '/active_languages')
                .then(response => {
                    if (response.data.data && Array.isArray(response.data.data)) {
                        this.activeLanguages = response.data.data;

                        const appLocale = window.appLocale || 'en';

                        const currentLanguage = this.activeLanguages.find(
                            lang => lang.code === appLocale
                        );

                        if (currentLanguage) {
                            this.currentLanguageId = currentLanguage.id;
                        } else {
                            const defaultLanguage = this.activeLanguages.find(
                                lang => lang.is_default === 1
                            );
                            if (defaultLanguage) {
                                this.currentLanguageId = defaultLanguage.id;
                            }
                        }
                    }
                })
                .catch(error => {
                    console.error('Error loading languages:', error);
                });
        },

        validateDateOfBirth() {
            const selectedDate = new Date(this.deliveryBoys.dob);
            const currentDate = new Date();
            if (selectedDate > currentDate) {
                this.dobvalidationError = "Date of Birth cannot be in the future.";
                this.deliveryBoys.dob = "";
            } else {
                this.dobvalidationError = "";
            }
        },
        validateMobileNumber() {
            const mobileRegex = /^[0-9]{1,16}$/; // Regular expression for numeric values with a maximum of 16 digits

            if (!mobileRegex.test(this.deliveryBoys.mobile)) {
                this.mobilevalidationError = "Mobile Number must be numeric and should not exceed 16 digits.";
                this.deliveryBoys.mobile = null;
            } else {
                this.mobilevalidationError = null;
            }
        },
        validateAccountNumber() {
            if (this.deliveryBoys.bank_account_number < 1) {
                this.account_numbervalidationError = "Account Number must be numeric value.";
                this.deliveryBoys.bank_account_number = null;
            } else {
                this.account_numbervalidationError = null;
            }
        },
        changeBonusType() {
            if (this.deliveryBoys.bonus_type == 0) {
                this.deliveryBoys.bonus_percentage = 0;
                this.deliveryBoys.bonus_min_amount = 0;
                this.deliveryBoys.bonus_max_amount = 0;
            } else {
                this.deliveryBoys.bonus_percentage = this.record ? this.record.bonus_percentage : "";
                this.deliveryBoys.bonus_min_amount = this.record ? this.record.bonus_min_amount : "";
                this.deliveryBoys.bonus_max_amount = this.record ? this.record.bonus_max_amount : "";
            }
        },
        validateCommission() {
            if (this.deliveryBoys.bonus_percentage < 1 || this.deliveryBoys.bonus_percentage > 100) {
                this.bonusValidationMessage = this.__('percentage_must_be_between_1_and_100');
                this.deliveryBoys.bonus_percentage = "";
            } else {
                this.bonusValidationMessage = null;
            }
        },
        getCities() {
            axios.get(this.$sellerApiUrl + '/cities')
                .then((response) => {
                    this.isLoading = false
                    let data = response.data;
                    const raw = data.data;
                    this.cities = (raw && raw.cities) ? raw.cities : (Array.isArray(raw) ? raw : []);
                })
                .catch(() => {
                    this.isLoading = false;
                    this.cities = [];
                });
        },
        getAllowSellerOwnDrivers() {
            axios.get(this.$apiUrl + '/delivery_boy/sellers')
                .then((response) => {
                    this.allowSellerOwnDrivers = response.data.allow_seller_own_drivers === true;
                    if (!this.allowSellerOwnDrivers) {
                        this.deliveryBoys.register_to = 'admin';
                        this.deliveryBoys.seller_id = "";
                    }
                })
                .catch(() => {
                    this.allowSellerOwnDrivers = false;
                });
        },
        getSellers() {
            axios.get(this.$apiUrl + '/delivery_boy/sellers', { params: { city_ids: this.city.map(c => c.id) } })
                .then((response) => {
                    this.sellers = response.data.data || [];
                })
                .catch(() => {
                    this.sellers = [];
                });
        },
        onRegisterToChange() {
            if (this.deliveryBoys.register_to !== 'seller') {
                this.seller = null;
                this.deliveryBoys.seller_id = "";
            }
        },
        setSellerId() {
            this.deliveryBoys.seller_id = this.seller ? this.seller.id : "";
        },
        setCityId() {
            // first city kept as the primary one; the full list goes out as city_ids[]
            this.deliveryBoys.city_id = this.city.length ? this.city[0].id : "";
            // sellers depend on the cities: reset the pick and reload the list.
            this.seller = null;
            this.deliveryBoys.seller_id = "";
            this.sellers = [];
            if (this.deliveryBoys.city_id) {
                this.getSellers();
            }
        },
        getCustomFields() {
            axios.get(this.$apiUrl + '/custom_fields/list', { params: { module: 'delivery_boy', active_only: 1 } })
                .then((response) => {
                    this.customFields = response.data.data || [];
                    const values = {};
                    this.customFields.forEach(field => {
                        values[field.id] = '';
                    });
                    this.customFieldValues = values;
                })
                .catch(() => {
                    this.customFields = [];
                });
        },
        handleCustomFieldFile(event, fieldId) {
            this.customFieldFiles[fieldId] = event.target.files[0] || null;
        },
        validateCustomFields() {
            for (const field of this.customFields) {
                if (!field.is_required) continue;
                if (field.type === 'file') {
                    if (!this.customFieldFiles[field.id]) {
                        this.showError(field.name + ' ' + (__('is_required') || 'is required'));
                        return false;
                    }
                } else {
                    const value = this.customFieldValues[field.id];
                    if (value === undefined || value === null || String(value).trim() === '') {
                        this.showError(field.name + ' ' + (__('is_required') || 'is required'));
                        return false;
                    }
                }
            }
            return true;
        },
        saveRecord: function () {
            if (!this.validateCustomFields()) {
                return;
            }

            let vm = this;
            if (this.deliveryBoys.register_to === 'seller' && !this.deliveryBoys.seller_id) {
                this.showError('Please select a seller');
                return;
            }

            this.isLoading = true;
            let formObject = this.deliveryBoys;
            let formData = new FormData();
            for (let key in formObject) {
                formData.append(key, formObject[key]);
            }
            this.city.forEach(c => formData.append('city_ids[]', c.id));

            if (this.customFields.length) {
                const textValues = {};
                this.customFields.forEach(field => {
                    if (field.type !== 'file') {
                        textValues[field.id] = this.customFieldValues[field.id] || '';
                    }
                });
                formData.append('custom_field_values', JSON.stringify(textValues));

                this.customFields.forEach(field => {
                    if (field.type === 'file' && this.customFieldFiles[field.id]) {
                        formData.append('custom_field_file_' + field.id, this.customFieldFiles[field.id]);
                    }
                });
            }

            let url = this.$deliveryBoyApiUrl + '/register';
            axios.post(url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(res => {
                this.isLoading = false;
                let data = res.data;
                if (data.status === 1) {
                    this.showMessage("success", data.message);
                    setTimeout(
                        function () {
                            vm.$swal.close();
                            //Auth.logout();
                            vm.$router.push({ path: '/delivery_boy/login' })
                        }, 2000);
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
    }
}
</script>

<style>
.login-logo-dark {
    display: none;
}
body.theme-dark .login-logo-light {
    display: none;
}
body.theme-dark .login-logo-dark {
    display: block;
}
</style>

<style scoped>
@import "../../../../node_modules/vue-multiselect/dist/vue-multiselect.min.css";

/* Registration card: wide auth card with grouped form sections (SnapBuy look) */
.auth {
    overflow-y: auto !important;
}

.auth .login-wrapper {
    justify-content: center;
    align-items: flex-start;
    padding: 32px 20px;
    height: auto !important;
    min-height: 100% !important;
    overflow: visible !important;
}

.auth .register-breadcrumb .breadcrumb {
    justify-content: center;
    font-size: 13px;
    padding: 0;
    margin-bottom: 12px;
    background: transparent;
}

/* Sections flow with the page; no nested scroll box (overrides common.css + dark-mode .content) */
.auth .content {
    max-height: none !important;
    overflow: visible !important;
    padding: 0 !important;
    margin: 0 !important; /* common.css gives .content a 10px margin; keeps sections aligned with the actions row */
    border: 0 !important;
    background: transparent !important;
}

.auth .content > .card-body {
    padding: 0;
}

@media (max-width: 575.98px) {
    .auth .login-wrapper {
        padding: 16px;
    }

    .auth .detail-card {
        padding: 24px 16px 16px;
        border-radius: 16px;
        min-width: 0;
    }

    .register-section {
        padding: 16px;
    }

    .register-actions .btn {
        width: 100%;
    }
}
</style>
