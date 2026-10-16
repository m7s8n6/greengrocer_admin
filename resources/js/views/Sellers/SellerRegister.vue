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
                        <li class="breadcrumb-item"><router-link :to="{ name: 'seller_login' }">{{ __('login') }}</router-link></li>
                        <li class="breadcrumb-item active" aria-current="page">{{ __('seller_complete_profile') }}</li>
                    </ol>
                </nav>
                <h4>{{ __('seller_complete_profile') }}</h4>
                <p class="auth-subtitle text-primary">{{ __('please_complete_the_form_to_complete_your_registration') }}</p>
                <form ref="my-form" @submit.prevent="sellerRegister" novalidate>
                    <div class="row">
                        <div class="content">
                            <div class="card-body">

                                <div class="row g-4">
                                    <div class="col-md-6">
                                        <div class="form-group mb-0">
                                            <label class="form-label">{{ __('name') }} <i class="text-danger">*</i></label>
                                            <input type="text" class="form-control py-2" v-model="name"
                                                :placeholder="__('enter_name')">
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group mb-0">
                                            <label class="form-label">{{ __('email') }} <i class="text-danger">*</i></label>
                                            <input type="email" class="form-control py-2" v-model="email"
                                                :placeholder="__('email')">
                                        </div>
                                    </div>

                                    <div class="col-md-6">
                                        <div class="form-group mb-0">
                                            <label class="form-label">{{ __('mobile') }} <i class="text-danger">*</i></label>
                                            <input type="text" class="form-control py-2" v-model="mobile"
                                                :placeholder="__('mobile')" inputmode="numeric"
                                                @input="validateMobileNumber">
                                            <span v-if="mobilevalidationError" class="error small text-danger">{{ mobilevalidationError
                                                }}</span>
                                        </div>
                                    </div>

                                    <div class="col-md-6">
                                        <div class="form-group mb-0">
                                            <label class="form-label">{{ __('password') }} <i v-if="!id" class="text-danger">*</i></label>
                                            <div class="input-group">
                                                <input :type="showPassword ? 'text' : 'password'" class="form-control py-2"
                                                    v-model="password" :placeholder="__('password')">
                                                <button type="button" v-on:click="showPassword = !showPassword"
                                                    class="btn btn-primary">
                                                    <img v-if="showPassword" :src="$baseUrl + '/images/icons/show_password.svg'" style="filter: brightness(0) invert(1); width: 20px; height: 20px;" />
                                                    <img v-else :src="$baseUrl + '/images/icons/hide_password.svg'" style="filter: brightness(0) invert(1); width: 20px; height: 20px;" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="col-md-6">
                                        <div class="form-group mb-0">
                                            <label class="form-label">{{ __('confirm_password') }} <i v-if="!id" class="text-danger">*</i></label>
                                            <div class="input-group">
                                                <input :type="showConfirmPassword ? 'text' : 'password'"
                                                    class="form-control py-2" v-model="confirm_password"
                                                    :placeholder="__('confirm_password')">
                                                <button type="button"
                                                    v-on:click="showConfirmPassword = !showConfirmPassword"
                                                    class="btn btn-primary">
                                                    <img v-if="showConfirmPassword" :src="$baseUrl + '/images/icons/show_password.svg'" style="filter: brightness(0) invert(1); width: 20px; height: 20px;" />
                                                    <img v-else :src="$baseUrl + '/images/icons/hide_password.svg'" style="filter: brightness(0) invert(1); width: 20px; height: 20px;" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="col-md-6">
                                        <div class="form-group mb-0">
                                            <label class="form-label">{{ __('select_module') }} <i class="text-danger">*</i></label>
                                            <select class="form-control form-select py-2" v-model="module_id" required>
                                                <option value="" disabled>{{ __('select_module') }}</option>
                                                <option v-for="mod in modules" :key="mod.id" :value="mod.id">{{ mod.name }}</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div class="col-md-6 categories-field">
                                        <div class="form-group mb-0">
                                            <label class="form-label">{{ __('categories') }} <i class="text-danger">*</i></label>
                                            <Select2 v-model="categories_ids" :placeholder="__('select_categories')"
                                                :options="categories_options" :settings="{ multiple: 'multiple', width: '100%' }" />
                                        </div>
                                    </div>
                                </div>
                                <div class="row g-4 mt-1">
                                    <div class="col-md-4">
                                        <div class="form-group mb-0">
                                            <label class="form-label">{{ __('store_name') }} <i class="text-danger">*</i></label>
                                            <input type="text" class="form-control py-2" v-model="store_name" required
                                                :placeholder="__('store_name')">
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="form-group mb-0">
                                            <label class="form-label" for="city_name">{{ __('select_or_search_city') }} <i
                                                    class="text-danger">*</i></label>
                                            <multiselect v-model="city" :options="cities" @close="setCityId"
                                                :placeholder="__('select_and_search_city')" label="name" track-by="name"
                                                id="city_name" required>
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
                                    </div>
                                    <div class="col-md-4">
                                        <div class="form-group mb-0">
                                            <label class="form-label">{{ __('commission') }} (%) <i class="text-danger">*</i></label>
                                            <input type="number" class="form-control py-2" v-model="commission"
                                                :placeholder="__('commission')" readonly>
                                            <p v-if="commissionvalidationError" class="error small text-danger">{{ commissionvalidationError
                                                }}</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="row g-4 mt-2">
                                    <div class="col-md-4">
                                        <div class="form-group mb-0">
                                            <label class="form-label" for="logo">{{ __('logo') }} <i class="text-danger">*</i></label>
                                            <input type="file" id="logo" accept="image/*" class="file-input"
                                                ref="file_store_logo" v-on:change="handleFileStoreLogo" required>
                                            <div class="file-input-div bg-gray-100" @click="$refs.file_store_logo.click()"
                                                @drop="dropFileStoreLogo" @dragover="$dragoverFile"
                                                @dragleave="$dragleaveFile">
                                                <template v-if="store_logo && store_logo.name !== ''">
                                                    <label>Selected file name:- {{ store_logo.name }}</label>
                                                </template>
                                                <template v-else>
                                                    <label><i class="fa fa-cloud-upload-alt fa-2x"></i></label>
                                                    <label>{{ __('drop_files_here_or_click_to_upload') }}</label>
                                                </template>
                                            </div>
                                            <div class="row mt-2" v-if="store_logo_url">
                                                <div class="col-auto">
                                                    <img class="file-preview-thumb" :src="store_logo_url" title='Store Logo'
                                                        alt='Store Logo' />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-12">
                                        <div class="form-group mb-0">
                                            <label class="form-label">{{ __('store_description') }} : <i class="text-danger">*</i></label>
                                            <editor :placeholder="__('store_description')" v-model="store_description" :init="getEditorConfig()" />
                                        </div>
                                    </div>
                                </div>

                                <!-- Custom Fields -->
                                <div class="row g-4 mt-2" v-if="customFields.length">
                                    <div class="col-md-6" v-for="field in translatedCustomFields" :key="field.id">
                                        <div class="form-group mb-0">
                                            <label class="form-label">{{ field.name }}
                                                <i v-if="field.is_required" class="text-danger">*</i></label>

                                            <textarea v-if="field.type === 'textarea'" class="form-control py-2"
                                                v-model="customFieldValues[field.id]" :placeholder="field.name"></textarea>

                                            <select v-else-if="field.type === 'dropdown'"
                                                class="form-control form-select py-2"
                                                v-model="customFieldValues[field.id]">
                                                <option value="" disabled>{{ __('select') || 'Select' }}</option>
                                                <option v-for="option in field.options" :key="option" :value="option">
                                                    {{ option }}
                                                </option>
                                            </select>

                                            <input v-else-if="field.type === 'file'" type="file" class="form-control py-2"
                                                @change="handleCustomFieldFile($event, field.id)">

                                            <input v-else :type="field.type === 'number' ? 'number' : 'text'"
                                                class="form-control py-2" v-model="customFieldValues[field.id]"
                                                :placeholder="field.name">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button class="btn btn-primary btn-block btn-lg figma-btn-standard mt-4 py-3" :disabled="isLoading">
                            {{ __('complete') }}
                            <b-spinner v-if="isLoading" small label="Spinning" class="ms-2"></b-spinner>
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
    delimiters: ['${', '}'], // Avoid Twig conflicts
    data: function () {
        return {
            isLoading: false,
            name: "",
            username: "",
            email: "",
            mobile: "",
            store_url: "",
            password: "",
            showPassword: false,
            confirm_password: "",
            showConfirmPassword: false,
            store_name: "",

            categories_ids: [],

            store_description: "",

            status: 0,
            store_logo: "",
            store_logo_url: "",
            categories: [],


            id: null,
            record: null,
            id_card: "",
            proof: "",

            mobilevalidationError: null,
            city: "",
            cities: [],
            city_id: "",

            commission: "",
            commissionvalidationError: null,

            modules: [],
            module_id: "",

            customFields: [],
            customFieldValues: {},
            customFieldFiles: {},
            currentLanguageId: null,
            activeLanguages: [],
        };
    },
    created: function () {
        this.getModules();
        this.getCities();
        this.getSellerCommission();
        this.fetchActiveLanguages();
        this.getCustomFields();
    },
    mounted() {

    },
    computed: {
        categories_options: function () {
            var temp = [];
            this.categories.forEach(category => {
                //Only Main Categories
                if (category.parent_id == 0) {
                    temp.push({ id: category.id, text: category.name })
                }
            });
            return temp;
        },

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
    watch: {
        module_id: function (newVal) {
            if (newVal) {
                this.getCategories(newVal);
            }
        }
    },
    methods: {
        getModules() {
            axios.get(this.$apiUrl + '/modules')
                .then((response) => {
                    let data = response.data;
                    this.modules = data.data;
                });
        },
        getCategories(moduleId = null) {
            let headers = {};
            if (moduleId) {
                headers['X-Module-Id'] = moduleId;
            }
            axios.get(this.$sellerApiUrl + '/categories', { headers })
                .then((response) => {
                    let data = response.data;
                    this.categories = data.data
                    console.log(this.categories);
                });
        },
        // Get editor configuration with safe fallbacks
        getEditorConfig() {
            const plugins = (this.$editorPlugins && Array.isArray(this.$editorPlugins))
                ? this.$editorPlugins
                : ["autolink", "lists", "link", "image", "charmap", "anchor", "searchreplace", "visualblocks", "media", "table", "wordcount", "code", "codesample"];

            const toolbar = this.$editorToolbar || "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | charmap | code | removeformat";

            const fontSizes = this.$editorFont_size_formats || '8pt 10pt 12pt 14pt 16pt 18pt 24pt 36pt 48pt';

            return {
                height: 400,
                plugins: plugins,
                toolbar: toolbar,
                font_size_formats: fontSizes,
                ...this.$tinymceImageUploadOptions()
            };
        },
        getSellerCommission() {
            axios.get(this.$sellerApiUrl + '/seller_commission')
                .then((response) => {
                    let data = response.data;
                    this.commission = data.data.value;
                });
        },

        validateMobileNumber() {
            const mobileNumber = this.mobile;
            if (!/^\d{1,16}$/.test(mobileNumber)) {
                this.mobilevalidationError = __('mobile_number_must_be_maximum_16_digits_numbers');
                this.mobile = null;
            } else {
                this.mobilevalidationError = null;
            }
        },

        handleFileStoreLogo() {
            this.store_logo = this.$refs.file_store_logo.files[0];
            this.store_logo_url = URL.createObjectURL(this.store_logo);
        },
        dropFileStoreLogo(event) {
            event.preventDefault();
            this.$refs.file_store_logo.files = event.dataTransfer.files;
            this.handleFileStoreLogo(); // Trigger the onChange event manually
            // Clean up
            event.currentTarget.classList.add('bg-gray-100');
            event.currentTarget.classList.remove('bg-green-300');
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
            this.city_id = this.city && this.city.id !== undefined ? this.city.id : 0;
        },

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
        getCustomFields() {
            axios.get(this.$apiUrl + '/custom_fields/list', { params: { module: 'seller', active_only: 1 } })
                .then((response) => {
                    this.customFields = response.data.data || [];
                    const values = {};
                    this.customFields.forEach(field => {
                        values[field.id] = field.type === 'dropdown' ? '' : '';
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

        sellerRegister: function () {
            if (this.isLoading) {
                return;
            }

            if (!this.validateCustomFields()) {
                return;
            }

            let vm = this;
            this.isLoading = true;

            let formData = new FormData();

            formData.append('username', this.username);
            formData.append('name', this.name);
            formData.append('email', this.email);
            formData.append('mobile', this.mobile);
            formData.append('store_url', this.store_url);
            formData.append('password', this.password);
            formData.append('confirm_password', this.confirm_password);
            formData.append('store_name', this.store_name);
            formData.append('categories_ids', this.categories_ids);
            formData.append('store_description', this.store_description);
            formData.append('store_logo', this.store_logo);
            formData.append('city_id', this.city_id);
            formData.append('commission', this.commission);
            formData.append('module_id', this.module_id);

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

            let url = this.$apiUrl + '/seller/register';
            axios.post(url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(res => {
                let data = res.data;
                if (data.status === 1) {
                    this.showMessage("success", data.message);
                    setTimeout(
                        function () {
                            vm.$swal.close();
                            //Auth.logout();
                            vm.$router.push({ path: '/seller/login' })
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

#auth {
    overflow: auto !important;
}

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