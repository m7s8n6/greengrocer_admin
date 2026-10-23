<template>
    <b-modal ref="my-modal" :title="modal_title" @hidden="$emit('modalClose')" size="lg" scrollable no-close-on-backdrop
        no-fade static>
        <div slot="modal-footer" class="d-flex flex-wrap justify-content-end gap-2 w-100">
            <b-button variant="outline-secondary" @click="hideModal">{{ __('cancel') }}</b-button>
            <b-button variant="primary" @click="$refs['dummy_submit'].click()" :disabled="isLoading">{{ __('save') }}
                <b-spinner v-if="isLoading" small label="Spinning"></b-spinner>
            </b-button>
        </div>
        <form ref="my-form" @submit.prevent="saveRecord">
            <div class="row">
                <div class="col-md-6">
                    <div class="form-group">
                        <label for="name">{{ __('name') }}</label>
                        <input type="text" name="name" id="name" v-model="deliveryBoys.name" class="form-control"
                            placeholder="Enter name.">
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-group">
                        <label for="dob">{{ __('date_of_birth') }}</label>
                        <input type="date" name="dob" id="dob" v-model="deliveryBoys.dob" required class="form-control"
                            placeholder="Enter date of birth" @input="validateDateOfBirth">
                        <span v-if="validationError" class="error">{{ validationError }}</span>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-group">
                        <label for="mobile">{{ __('mobile') }}</label>
                        <input type="number" name="mobile" id="mobile" v-model="deliveryBoys.mobile"
                            class="form-control" placeholder="Enter mobile no." @input="validateMobileNumber">
                        <span v-if="validationError" class="error">{{ validationError }}</span>
                    </div>
                </div>

                <div class="col-md-6">
                    <div class="form-group">
                        <label for="email">{{ __('email') }}</label>
                        <input type="text" name="email" id="email" v-model="deliveryBoys.email" class="form-control"
                            placeholder="Enter email id.">
                    </div>
                </div>

                <div class="col-md-6">
                    <div class="form-group">
                        <label for="password">{{ __('password') }}</label>
                        <input type="password" name="password" id="password" v-model="deliveryBoys.password"
                            class="form-control" placeholder="Enter password.">
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-group">
                        <label for="confirm_password">{{ __('confirm_password') }}</label>
                        <input type="password" name="confirm_password" id="confirm_password"
                            v-model="deliveryBoys.confirm_password" class="form-control"
                            placeholder="Enter agin password.">
                    </div>
                </div>


                <div class="col-md-6">
                    <div class="form-group">
                        <label for="driving_license">{{ __('driving_license') }}</label>
                        <input type="file" name="driving_license" id="driving_license"
                            v-on:change="handleFileUploadLicense" ref="file_license" class="file-input" />

                        <div class="file-input-div bg-gray-100" @click="$refs.file_license.click()"
                            @drop="dropFileUploadLicense" @dragover="$dragoverFile" @dragleave="$dragleaveFile">
                            <template v-if="deliveryBoys.driving_license && deliveryBoys.driving_license.name !== ''">
                                <label>{{ __('selected_file_name') }}:- {{ deliveryBoys.driving_license.name }}</label>
                            </template>
                            <template v-else>
                                <label><i class="fa fa-cloud-upload-alt fa-2x"></i></label>
                                <label>{{ __('drop_files_here_or_click_to_upload') }}</label>
                            </template>

                        </div>

                        <div class="row mt-2" v-if="deliveryBoys.driving_license_url">
                            <div v-if="isImage(deliveryBoys.driving_license_url)" class="col-md-2">
                                <img class="custom-image" :src="deliveryBoys.driving_license_url"
                                    title='Driving License' alt='Driving License' />
                            </div>
                            <div v-else class="col-md-2 mt-2">
                                <a target="_blank" :href="deliveryBoys.driving_license_url" class="badge bg-success"> <i
                                        class="fa fa-eye"></i>
                                    {{ __('identity_card') }}</a>
                            </div>
                        </div>

                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-group">
                        <label for="national_identity_card">{{ __('national_identity_card') }}</label>
                        <input type="file" name="national_identity_card" id="national_identity_card"
                            v-on:change="handleFileUploadCard" ref="file_card" class="file-input" />

                        <div class="file-input-div bg-gray-100" @click="$refs.file_card.click()"
                            @drop="dropFileUploadCard" @dragover="$dragoverFile" @dragleave="$dragleaveFile">
                            <template
                                v-if="deliveryBoys.national_identity_card && deliveryBoys.national_identity_card.name !== ''">
                                <label>{{ __('selected_file_name') }}:- {{ deliveryBoys.national_identity_card.name
                                    }}</label>
                            </template>
                            <template v-else>
                                <label><i class="fa fa-cloud-upload-alt fa-2x"></i></label>
                                <label>{{ __('drop_files_here_or_click_to_upload') }}</label>
                            </template>
                        </div>

                        <div class="row mt-2" v-if="deliveryBoys.national_identity_card_url">
                            <div v-if="isImage(deliveryBoys.national_identity_card_url)" class="col-md-2">
                                <img class="custom-image" :src="deliveryBoys.national_identity_card_url"
                                    title='National Identity Card' alt='National Identity Card' />
                            </div>
                            <div v-else class="col-md-2 mt-2">
                                <a target="_blank" :href="deliveryBoys.national_identity_card_url"
                                    class="badge bg-success"> <i class="fa fa-eye"></i> {{ __('identity_card') }}</a>
                            </div>
                        </div>

                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-group">
                        <label for="bonus">{{ __('bonus') }} (%)</label>
                        <input type="number" name="bonus" id="bonus" v-model="deliveryBoys.bonus" class="form-control"
                            placeholder="Enter Bonus (%)">
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-group">
                        <label for="ifsc_code">{{ __('bank_ifsc_code') }}</label>
                        <input type="text" name="ifsc_code" id="ifsc_code" v-model="deliveryBoys.ifsc_code"
                            class="form-control" placeholder="Enter bank's IFSC code.">
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-group">
                        <label for="bank_name">{{ __('bank_name') }}</label>
                        <input type="text" name="bank_name" id="bank_name" v-model="deliveryBoys.bank_name"
                            class="form-control" placeholder="Enter bank name">
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-group">
                        <label for="account_number">{{ __('account_number') }}</label>
                        <input type="number" name="account_number" id="account_number"
                            v-model="deliveryBoys.bank_account_number" class="form-control"
                            placeholder="Enter account number" @input="validateAccountNumber">
                        <span v-if="validationError" class="error">{{ validationError }}</span>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-group">
                        <label for="account_name">{{ __('bank_account_name') }}</label>
                        <input type="text" name="account_name" id="account_name" v-model="deliveryBoys.account_name"
                            class="form-control" placeholder="Enter bank account name">
                    </div>
                </div>
                <div class="col-md-6 form-group">
                    <label for="city_name">{{ __('select_or_search_city') }}</label>
                    <multiselect v-model="city" :options="cities" @close="setCityId" placeholder="Select & Search City"
                        label="name" track-by="name" id="city_name">
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
                <div class="col-md-6">
                    <div class="form-group">
                        <label for="address">{{ __('address') }}</label>
                        <textarea name="address" id="address" v-model="deliveryBoys.address" rows='3'
                            class="form-control" placeholder="Enter address"></textarea>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-group">
                        <label for="other_payment_info">{{ __('other_payment_information') }}</label>
                        <textarea name="other_payment_info" id="other_payment_info"
                            v-model="deliveryBoys.other_payment_information" rows='3' class="form-control"
                            placeholder="Enter other payment information"></textarea>
                    </div>
                </div>

                <div class="col-md-12" v-if="deliveryBoys.id">
                    <div class="form-group">
                        <label>{{ __('status') }}</label>
                        <b-form-radio-group v-model="deliveryBoys.status" :options="[
                            { text: __('registered'), 'value': 0 },
                            { text: __('active'), 'value': 1 },
                            { text: __('not_approved'), 'value': 2 },
                            { text: __('deactive'), 'value': 3 },
                            { text: __('block'), 'value': 4 },
                        ]" buttons button-variant="outline-primary" class="d-flex flex-wrap db-status-group" required></b-form-radio-group>

                    </div>
                </div>
                <div v-if="[2, 3].includes(deliveryBoys.status)" class="form-group col-md-12">
                    <div class="form-group">
                        <label for="remark">{{ __('remark') }}</label>
                        <textarea class="form-control" name="remark" id="remark" v-model="deliveryBoys.remark"
                            placeholder="Add a remark of this status..."></textarea>
                    </div>
                </div>

                <!-- Custom Fields -->
                <template v-if="customFields.length">
                    <div class="col-md-12">
                        <h6 class="db-section-title">{{ __('custom_fields') }}</h6>
                    </div>
                    <div class="col-md-6" v-for="field in translatedCustomFields" :key="field.id">
                        <div class="form-group">
                            <label>{{ field.name }}
                                <span v-if="field.is_required" class="text-danger">*</span></label>

                            <textarea v-if="field.type === 'textarea'" class="form-control"
                                v-model="customFieldValues[field.id]" :placeholder="field.name"></textarea>

                            <select v-else-if="field.type === 'dropdown'" class="form-control form-select"
                                v-model="customFieldValues[field.id]">
                                <option value="">{{ __('select') || 'Select' }}</option>
                                <option v-for="option in field.options" :key="option" :value="option">{{ option }}
                                </option>
                            </select>

                            <template v-else-if="field.type === 'file'">
                                <input type="file" class="form-control" @change="handleCustomFieldFile($event, field.id)">
                                <a v-if="customFieldExistingFileUrl(field.id)" :href="customFieldExistingFileUrl(field.id)"
                                    target="_blank" class="badge bg-success mt-1"><i class="fa fa-eye"></i> {{ __('view') || 'View' }}</a>
                            </template>

                            <custom-field-date v-else-if="field.type === 'date'" v-model="customFieldValues[field.id]"
                                :placeholder="field.name"></custom-field-date>
                            <input v-else :type="field.type === 'number' ? 'number' : 'text'" class="form-control"
                                v-model="customFieldValues[field.id]" :placeholder="field.name">
                        </div>
                    </div>
                </template>
            </div>
            <button ref="dummy_submit" class="d-none"></button>
        </form>
    </b-modal>
</template>

<script>
import axios from 'axios';
import Multiselect from "vue-multiselect";

export default {
    props: ['record'],
    components: {
        Multiselect,
    },
    data: function () {
        return {

            language_id: 46,
            languages: [],
            defaultLanguage: null,
            currentLanguage: null,

            translations: {},


            isLoading: false,
            city: "",
            cities: [],
            deliveryBoys: {
                language_id: this.currentLanguage.id,
                id: this.record ? this.record.id : null,
                admin_id: this.record ? this.record.admin_id : "",
                name: this.record ? this.record.name : "",
                mobile: this.record ? this.record.mobile : "",
                email: this.record ? this.record.admin.email : "",
                password: "",
                confirm_password: "",
                dob: this.record ? this.record.dob : "",
                bonus: this.record ? this.record.bonus : "",

                driving_license: "",
                driving_license_url: this.record ? this.$storageUrl + this.record.driving_license : "",
                national_identity_card: "",
                national_identity_card_url: this.record ? this.$storageUrl + this.record.national_identity_card : "",

                ifsc_code: this.record ? this.record.ifsc_code : "",
                bank_name: this.record ? this.record.bank_name : "",
                bank_account_number: this.record ? this.record.bank_account_number : "",
                account_name: this.record ? this.record.account_name : "",
                address: this.record ? this.record.address : "",
                other_payment_information: this.record ? this.record.other_payment_information : "",
                city_id: this.record ? this.record.city_id : "",
                status: this.record ? this.record.status : 0,
                remark: this.record ? this.record.remark : ""
            },
            validationError: null,

            customFields: [],
            customFieldValues: {},
            customFieldFiles: {},
            customFieldExistingValues: this.record && this.record.custom_field_values ? this.record.custom_field_values : {},
            currentDisplayLanguageId: null,
            activeDisplayLanguages: [],
        };
    },
    created: function () {
        this.getCities();
        this.fetchActiveDisplayLanguages();
        this.getCustomFields();
    },
    computed: {
        isDefaultLanguage() {
            return this.deliveryBoys.language_id === this.defaultLanguage.id
        },
        modal_title: function () {
            let title = this.deliveryBoys.id ? __('edit') : __('add');
            title += __('delivery_boys');
            return title;
        },
        // Custom fields shown to the end user in the current app locale, falling back to the
        // default-language name/options when no translation exists for it.
        translatedCustomFields: function () {
            const list = Array.isArray(this.customFields) ? this.customFields : [];

            if (!this.currentDisplayLanguageId || list.length === 0) {
                return list;
            }

            return list.map(field => {
                const translatedField = { ...field };

                if (Array.isArray(field.translations)) {
                    const translation = field.translations.find(
                        t => t.language_id === this.currentDisplayLanguageId
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
        fetchActiveDisplayLanguages() {
            return axios.get(this.$apiUrl + '/active_languages')
                .then(response => {
                    if (response.data.data && Array.isArray(response.data.data)) {
                        this.activeDisplayLanguages = response.data.data;

                        const appLocale = window.appLocale || 'en';

                        const currentLanguage = this.activeDisplayLanguages.find(
                            lang => lang.code === appLocale
                        );

                        if (currentLanguage) {
                            this.currentDisplayLanguageId = currentLanguage.id;
                        } else {
                            const defaultLanguage = this.activeDisplayLanguages.find(
                                lang => lang.is_default === 1
                            );
                            if (defaultLanguage) {
                                this.currentDisplayLanguageId = defaultLanguage.id;
                            }
                        }
                    }
                })
                .catch(error => {
                    console.error('Error loading languages:', error);
                });
        },
        showModal() {
            this.$refs['my-modal'].show()
        },
        hideModal() {
            this.$refs['my-modal'].hide()
        },
        handleFileUploadLicense() {
            this.deliveryBoys.driving_license = this.$refs.file_license.files[0];
            this.deliveryBoys.driving_license_url = URL.createObjectURL(this.deliveryBoys.driving_license);;
        },
        dropFileUploadLicense(event) {
            event.preventDefault();
            this.$refs.file_license.files = event.dataTransfer.files;
            this.handleFileUploadLicense(); // Trigger the onChange event manually
            // Clean up
            event.currentTarget.classList.add('bg-gray-100');
            event.currentTarget.classList.remove('bg-green-300');
        },
        handleFileUploadCard() {
            this.deliveryBoys.national_identity_card = this.$refs.file_card.files[0];
            this.deliveryBoys.national_identity_card_url = URL.createObjectURL(this.deliveryBoys.national_identity_card);;
        },
        dropFileUploadCard(event) {
            event.preventDefault();
            this.$refs.file_card.files = event.dataTransfer.files;
            this.handleFileUploadCard(); // Trigger the onChange event manually
            // Clean up
            event.currentTarget.classList.add('bg-gray-100');
            event.currentTarget.classList.remove('bg-green-300');
        },
        validateDateOfBirth() {
            const selectedDate = new Date(this.deliveryBoys.dob);
            const currentDate = new Date();
            if (selectedDate > currentDate) {
                this.validationError = "Date of Birth cannot be in the future.";
            } else {
                this.validationError = null;
            }
        },
        validateMobileNumber() {

            if (this.deliveryBoys.mobile < 0) {
                this.validationError = "Mobile Number must be numeric value.";
                this.deliveryBoys.mobile = null;
            } else {
                this.validationError = null;
            }
        },
        validateAccountNumber() {
            if (this.deliveryBoys.bank_account_number < 1) {
                this.validationError = "Account Number must be numeric value.";
                this.deliveryBoys.bank_account_number = null;
            } else {
                this.validationError = null;
            }
        },
        getCities() {
            this.isLoading = true
            axios.get(this.$apiUrl + '/cities')
                .then((response) => {
                    this.isLoading = false
                    let data = response.data;
                    this.cities = data.data

                    if (this.deliveryBoys.id) {
                        this.city = this.cities.filter((item) => {
                            return item.id === this.record.city_id;
                        });
                    }
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
                        const existing = this.customFieldExistingValues[field.id];
                        values[field.id] = (field.type !== 'file' && existing !== undefined) ? existing : '';
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
        customFieldExistingFileUrl(fieldId) {
            const path = this.customFieldExistingValues[fieldId];
            return path ? this.$storageUrl + path : '';
        },
        validateCustomFields() {
            for (const field of this.customFields) {
                if (!field.is_required) continue;
                if (field.type === 'file') {
                    if (!this.customFieldFiles[field.id] && !this.customFieldExistingValues[field.id]) {
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
            if (!this.deliveryBoys.id && !this.isDefaultLanguage) {
                this.$bvToast.toast(
                    this.$t('default_language_required_first') || 'Please save default language first',
                    { variant: 'warning' }
                )
                return
            }

            if (!this.validateCustomFields()) {
                return;
            }

            let formData = new FormData()

            for (let key in this.deliveryBoys) {
                formData.append(key, this.deliveryBoys[key])
            }
            let vm = this;
            this.isLoading = true;
            let formObject = this.deliveryBoys;
            // let formData = new FormData();
            for (let key in formObject) {
                formData.append(key, formObject[key]);
            }

            if (this.customFields.length) {
                const textValues = {};
                this.customFields.forEach(field => {
                    if (field.type !== 'file') {
                        textValues[field.id] = this.customFieldValues[field.id] || '';
                    } else if (this.customFieldExistingValues[field.id] && !this.customFieldFiles[field.id]) {
                        textValues[field.id] = this.customFieldExistingValues[field.id];
                    }
                });
                formData.append('custom_field_values', JSON.stringify(textValues));

                this.customFields.forEach(field => {
                    if (field.type === 'file' && this.customFieldFiles[field.id]) {
                        formData.append('custom_field_file_' + field.id, this.customFieldFiles[field.id]);
                    }
                });
            }

            let url = this.$apiUrl + '/delivery_boys/save';
            if (this.deliveryBoys.id) {
                url = this.$apiUrl + '/delivery_boys/update';
            }

            axios.post(url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(res => {
                let data = res.data;

                if (data.status === 1) {

                    const message = isUpdate
                        ? (this.$t('delivery_boy_updated_successfully') || 'Delivery boy updated successfully')
                        : (this.$t('delivery_boy_saved_successfully') || 'Delivery boy saved successfully');

                    this.$eventBus.$emit('deliveryBoysSaved', message);

                    this.hideModal();
                } else {
                    this.showError(data.message);
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
@import "../../../../node_modules/vue-multiselect/dist/vue-multiselect.min.css";

.db-section-title {
    margin: 8px 0 12px;
    padding-top: 16px;
    border-top: 1px solid var(--ui-border);
    font-size: 15px;
    font-weight: 700;
    color: var(--ui-heading);
}

.db-status-group {
    gap: 8px;
}

.db-status-group ::v-deep .btn {
    margin: 0;
    border-radius: var(--ui-radius) !important; /* beat BootstrapVue btn-group joined corners */
    font-size: 13px;
    font-weight: 600;
}

.db-status-group ::v-deep .btn input[type="radio"] {
    position: absolute;
    opacity: 0;
    pointer-events: none;
}

.custom-image {
    width: 100%;
    max-width: 96px;
    border: 1px solid var(--ui-border);
    border-radius: var(--ui-radius-sm);
}
</style>
