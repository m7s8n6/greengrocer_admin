<template>
    <div class="auth" :style="{ backgroundImage: 'url(' + $panelLoginBackgroundImg + ')' }">
        <div class="login-wrapper">
            <div class="detail-card">
                <div class="auth-logo">
                    <a href="javascript:void(0)"
                        style="display: flex; align-items: center; justify-content: flex-start;">
                        <img v-if="$appLogo != ''" :src="$storageUrl + $appLogo" style="height: 70px; width: 70px;"
                            alt='Logo' />
                        <img v-else :src="$baseUrl + '/images/logo.png'" style="height: 70px; width: 70px;"
                            alt='Logo' />
                        <h2 style="margin: 10px;">{{ $appName }}</h2>
                    </a>
                </div>
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb" style="font-size: 14px;">
                        <li class="breadcrumb-item"><router-link :to="{ name: 'delivery_boy_login' }">{{ __('login') }}</router-link></li>
                        <li class="breadcrumb-item active" aria-current="page">{{ __('delivery_boy_complete_profile') }}</li>
                    </ol>
                </nav>
                <h4>{{ __('delivery_boy_complete_profile') }}</h4>
                <p class="auth-subtitle text-primary">{{ __('please_complete_the_form_to_complete_your_registration') }}</p>
                <form ref="my-form" @submit.prevent="saveRecord" novalidate>
                    <div class="content">
                        <h6>{{ __('delivery_boy_information') }}</h6>
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
                                            class="btn btn-primary font-bold">
                                            <img v-if="showPassword" :src="$baseUrl + '/images/icons/show_password.svg'"
                                                style="filter: brightness(0) invert(1); width: 20px; height: 20px;" />
                                            <img v-else :src="$baseUrl + '/images/icons/hide_password.svg'"
                                                style="filter: brightness(0) invert(1); width: 20px; height: 20px;" />
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
                                            class="btn btn-primary font-bold">
                                            <img v-if="showConfirmPassword"
                                                :src="$baseUrl + '/images/icons/show_password.svg'"
                                                style="filter: brightness(0) invert(1); width: 20px; height: 20px;" />
                                            <img v-else :src="$baseUrl + '/images/icons/hide_password.svg'"
                                                style="filter: brightness(0) invert(1); width: 20px; height: 20px;" />
                                        </button>
                                    </div>
                                </div>
                            </div>


                            <div class="col-md-6">
                                <label for="city_name">{{ __('select_or_search_city') }} <span
                                        class="text-danger text-xs">*</span></label>
                                <multiselect v-model="city" :options="cities" @close="setCityId"
                                    :placeholder="__('select_and_search_city')" label="name" track-by="name" id="city_name"
                                    required>
                                    <template slot="singleLabel" slot-scope="props">
                                        <span class="option__desc">
                                            <span class="option__title">{{ props.option.name }}</span>
                                        </span>
                                    </template>
                                    <template slot="option" slot-scope="props">
                                        <div class="option__desc">
                                            <span class="option__title">{{
                                                props.option.formatted_address
                                            }}</span>
                                        </div>
                                    </template>
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

                            <!-- Custom Fields -->
                            <template v-if="customFields.length">
                                <div class="col-md-12">
                                    <h6 class="mt-3">{{ __('custom_fields') }}</h6>
                                </div>
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

                                        <input v-else :type="field.type === 'number' ? 'number' : 'text'"
                                            class="form-control" v-model="customFieldValues[field.id]"
                                            :placeholder="field.name">
                                    </div>
                                </div>
                            </template>
                        </div>
                    </div>
                    <button class="btn btn-primary btn-block btn-lg shadow-lg mt-5">
                        {{ __('complete') }}
                        <b-spinner v-if="isLoading" small label="Spinning"></b-spinner>
                    </button>
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

            city: "",
            cities: [],
            deliveryBoys: {

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
        this.fetchActiveLanguages();
        this.getCustomFields();
    },
    mounted() {

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
        setCityId() {
            this.deliveryBoys.city_id = this.city.id;
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
            this.isLoading = true;
            let formObject = this.deliveryBoys;
            let formData = new FormData();
            for (let key in formObject) {
                formData.append(key, formObject[key]);
            }

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

<style scoped>
@import "../../../../node_modules/vue-multiselect/dist/vue-multiselect.min.css";

.auth {
    overflow-y: auto !important;
}

.auth-logo {
    padding-bottom: 10px;
}

.auth .login-wrapper {
    justify-content: center;
    align-items: center;
    padding: 30px 20px;
    height: auto !important;
    min-height: 100% !important;
    overflow: visible !important;
}

.auth .detail-card {
    max-width: 95%;
    width: 100%;
    max-width: 1100px;
    margin: 0 auto;
}

.auth .content {
    max-height: 70vh;
    overflow-y: auto;
}
</style>
