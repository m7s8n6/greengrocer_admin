<template>
   <div class="auth" :style="{ backgroundImage: 'url('+ $panelLoginBackgroundImg + ')' }">
        <div class="login-wrapper"> 
            <div class="detail-card">
                <div class="auth-logo">
                    <a href="javascript:void(0)" class="d-flex align-items-center justify-content-center">
                        <img class="auth-logo-img login-logo-light" v-if="$appLogo != ''" :src="$storageUrl + $appLogo" alt="Logo" />
                        <img class="auth-logo-img login-logo-light" v-else :src="$baseUrl + '/images/logo.png'" alt="Logo" />
                        <img class="auth-logo-img login-logo-dark" v-if="$appDarkLogo" :src="$storageUrl + $appDarkLogo" alt="Logo" />
                    </a>
                </div>
                <h4>Delivery Boy Complete Profile</h4>
                <p class="auth-subtitle text-primary">Please Complete the form to complete your registration</p>
                <form ref="my-form" @submit.prevent="saveRecord">
                    <div class="content">
                        <div class="register-section">
                        <h6 class="register-section-title">Delivery Boy Information</h6>
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="name">Name</label>
                                    <input type="text" name="name" id="name" v-model="deliveryBoys.name" class="form-control" placeholder="Enter name.">
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="mobile">Mobile No.</label>
                                    <input type="number" name="mobile" id="mobile" v-model="deliveryBoys.mobile" class="form-control" placeholder="Enter mobile no.">
                                </div>
                            </div>

                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="driving_license">Driving License</label>
                                    <input type="file" name="driving_license" id="driving_license" v-on:change="handleFileUploadLicense" ref="file_license" :required="!deliveryBoys.id" class="file-input" />

                                    <div class="file-input-div bg-gray-100" @click="$refs.file_license.click()" @drop="dropFileUploadLicense" @dragover="$dragoverFile" @dragleave="$dragleaveFile">

                                        <template v-if="deliveryBoys.driving_license && deliveryBoys.driving_license.name !== ''">
                                            <label>Selected file name:- {{ deliveryBoys.driving_license.name }}</label>
                                        </template>
                                        <template v-else>
                                            <label><i class="fa fa-cloud-upload-alt fa-2x"></i></label>
                                            <label>{{ __('drop_files_here_or_click_to_upload') }}</label>
                                        </template>

                                    </div>

                                    <div class="row" v-if="deliveryBoys.driving_license_url">
                                        <div v-if="isImage(deliveryBoys.driving_license_url)" class="col-md-2">
                                            <img class="custom-image" :src="deliveryBoys.driving_license_url" title='Driving License' alt='Driving License'/>
                                        </div>
                                        <div v-else class="col-md-2 mt-2">
                                            <a target="_blank" :href="deliveryBoys.driving_license_url" class="badge bg-success"> <i class="fa fa-eye"></i> Identity Card</a>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="national_identity_card">National Identity Card</label>
                                    <input type="file" name="national_identity_card" id="national_identity_card" v-on:change="handleFileUploadCard" ref="file_card" :required="!deliveryBoys.id" class="file-input" />
                                    
                                    <div class="file-input-div bg-gray-100" @click="$refs.file_card.click()" @drop="dropFileUploadCard" @dragover="$dragoverFile" @dragleave="$dragleaveFile">
                                        <template v-if="deliveryBoys.national_identity_card && deliveryBoys.national_identity_card.name !== ''">
                                            <label>Selected file name:- {{ deliveryBoys.national_identity_card.name }}</label>
                                        </template>
                                        <template v-else>
                                            <label><i class="fa fa-cloud-upload-alt fa-2x"></i></label>
                                            <label>{{ __('drop_files_here_or_click_to_upload') }}</label>
                                        </template>
                                    </div>

                                    <div class="row" v-if="deliveryBoys.national_identity_card_url">
                                        <div v-if="isImage(deliveryBoys.national_identity_card_url)" class="col-md-2">
                                            <img class="custom-image" :src="deliveryBoys.national_identity_card_url" title='National Identity Card' alt='National Identity Card'/>
                                        </div>
                                        <div v-else class="col-md-2 mt-2">
                                            <a target="_blank" :href="deliveryBoys.national_identity_card_url" class="badge bg-success"> <i class="fa fa-eye"></i> Identity Card</a>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="dob">Date Of Birth</label>
                                    <input type="date" name="dob" id="dob" v-model="deliveryBoys.dob" required class="form-control" placeholder="Enter date of birth">
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="ifsc_code">Bank's IFSC Code</label>
                                    <input type="text" name="ifsc_code" id="ifsc_code" v-model="deliveryBoys.ifsc_code" required class="form-control" placeholder="Enter bank's IFSC code.">
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="bank_name">Bank Name</label>
                                    <input type="text" name="bank_name" id="bank_name" v-model="deliveryBoys.bank_name" required class="form-control" placeholder="Enter bank name">
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="account_number">Account Number</label>
                                    <input type="text" name="account_number" id="account_number" v-model="deliveryBoys.bank_account_number" required class="form-control" placeholder="Enter account number">
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="account_name">Bank Account Name</label>
                                    <input type="text" name="account_name" id="account_name" v-model="deliveryBoys.account_name" required class="form-control" placeholder="Enter bank account name">
                                </div>
                            </div>
                            <div class="col-md-6 form-group">
                                <label for="city_name">Select or Search City</label>
                                <multiselect v-model="city"
                                             :options="cities"
                                             @close="setCityId"
                                             placeholder="Select & Search City"
                                             label="name"
                                             track-by="name" id="city_name" required>
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
                                    <label for="address">Address</label>
                                    <textarea name="address" id="address" v-model="deliveryBoys.address" rows='3' class="form-control" placeholder="Enter address"></textarea>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="other_payment_info">Other Payment Information</label>
                                    <textarea name="other_payment_info" id="other_payment_info" v-model="deliveryBoys.other_payment_information" rows='3' class="form-control" placeholder="Enter other payment information"></textarea>
                                </div>
                            </div>

                        </div>
                        </div>
                    </div>
                    <div class="register-actions">
                        <button class="btn btn-primary btn-lg">
                            Complete
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
import {VuejsDatatableFactory} from "vuejs-datatable";
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
    data : function(){
        return {
            isLoading: false,
            loggedUser: Auth.user,
            city:"",
            cities:[],
            deliveryBoys:{
                name: Auth.user.username ,
                mobile: "" ,
                dob: "" ,

                driving_license: "" ,
                driving_license_url: "" ,
                national_identity_card: "" ,
                national_identity_card_url: "" ,

                ifsc_code: "" ,
                bank_name: "" ,
                bank_account_number: "" ,
                account_name: "" ,
                address: "" ,
                other_payment_information: "" ,
                city_id:""
            },

        };
    },
    created: function () {
        this.getCities();
    },
    mounted() {
        if(!this.loggedUser){
            this.$router.push('/login');
        }
    },
    methods: {
        handleFileUploadLicense() {
            this.deliveryBoys.driving_license = this.$refs.file_license.files[0];
            this.deliveryBoys.driving_license_url = URL.createObjectURL(this.deliveryBoys.driving_license);;
        },
        dropFileUploadLicense(event){
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
        dropFileUploadCard(event){
            event.preventDefault();
            this.$refs.file_card.files = event.dataTransfer.files;
            this.handleFileUploadCard(); // Trigger the onChange event manually
            // Clean up
            event.currentTarget.classList.add('bg-gray-100');
            event.currentTarget.classList.remove('bg-green-300');
        },
        getCities() {
            this.isLoading = true
            axios.get(this.$apiUrl + '/cities')
                .then((response) => {
                    this.isLoading = false
                    let data = response.data;
                    this.cities = data.data;
                });
        },
        setCityId() {
            this.deliveryBoys.city_id = this.city.id;
        },
        saveRecord: function(){
            let vm = this;
            this.isLoading = true;
            let formObject = this.deliveryBoys;
            let formData = new FormData();
            for(let key in formObject){
                formData.append(key, formObject[key]);
            }
            let url = this.$deliveryBoyApiUrl + '/details';
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
                            Auth.logout();
                            vm.$router.push({path: '/login'})
                        }, 2000);
                }else{
                    vm.showError(data.message);
                    vm.isLoading = false;
                }
            }).catch(error => {
                vm.isLoading = false;
                if (error.request.statusText) {
                    this.showError(error.request.statusText);
                }else if (error.message) {
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
