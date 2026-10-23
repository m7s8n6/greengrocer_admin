<template>
    <div>
        <div class="page-heading">
            <div class="page-title">
            <div class="row">
                <div class="col-12 col-md-6 order-md-1 order-last">
                    <h3>{{ __('sms_gateways_methods_settings') }}</h3>
                </div>
                <div class="col-12 col-md-6 order-md-2 order-first">
                    <nav aria-label="breadcrumb" class="breadcrumb-header float-start float-lg-end">
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item"><router-link to="/dashboard">{{ __('dashboard') }}</router-link></li>
                            <li class="breadcrumb-item"><router-link to="/system_settings">{{ __('settings') }}</router-link></li>
                            <li class="breadcrumb-item active" aria-current="page">{{ __('sms_gateways_methods_settings') }}</li>
                        </ol>
                    </nav>
                </div>
            </div>
        </div>
            <section class="section">
                <form id="sms_method_settings_form" method="post" enctype="multipart/form-data" @submit.prevent="saveRecord">
                    <div class="row sms-methods-grid">
                        <div class="col-12">
                            <div class="card">
                                <div class="card-header">
                                    <h4 class="card-title float-none">{{ __('twilio') }}</h4>
                                    <p class="text-muted small mb-0 mt-1">{{ tr('sms_settings_desc', 'Twilio credentials used to send OTP and order SMS messages.') }}</p>
                                </div>
                                <div class="card-body">
                                    <input type="hidden" id="sms_method_settings" v-model="sms_settings.sms_method_settings" name="sms_method_settings" required="" value="1" aria-required="true">
                                    <div class="">
                                        <div class="form-group">
                                            <label for="twilio_method">{{ __('twilio') }} <small>[ {{ __('enable') }} / {{ __('disable') }} ] </small></label><br>
                                            <div class='form-check form-switch'>
                                                <input class='form-check-input' id="sms_settings" type='checkbox' true-value="1" false-value="0" v-model="sms_settings.twilio_method" :checked="sms_settings.twilio_method">
                                            </div>
                                        </div>
                                        <div class="row" v-if="sms_settings.twilio_method == 1">
                              
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label for="twilio_sid">{{ __('twilio_sid') }}<span class="text-danger text-xs">*</span></label>
                                        <input type="text" class="form-control" name="twilio_sid" id="twilio_sid" v-model="sms_settings.twilio_sid" placeholder="Enter twilio sid.">
                                    </div>
                                </div>

                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label for="twilio_auth_token">{{ __('twilio_auth_token') }}<span class="text-danger text-xs">*</span></label>
                                        <input type="text" class="form-control" name="authDomain" id="authDomain" v-model="sms_settings.twilio_auth_token" placeholder="Enter twilio auth token.">
                                    </div>
                                </div>

                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label for="twilio_phone_number">{{ __('twilio_phone_number') }}<span class="text-danger text-xs">*</span></label>
                                        <input type="text" class="form-control" name="twilio_phone_number" id="twilio_phone_number" v-model="sms_settings.twilio_phone_number" placeholder="Enter twilio phone number.">
                                    </div>
                                </div>

                            </div>
                                    </div>
                                    <div class="d-flex justify-content-end border-top pt-3 mt-2" v-if="$can('manage_payment_methods')">
                                        <b-button v-if="$can('sms_settings')" type="submit" id="btn_update" variant="primary" :disabled="isLoading"> {{ __('update') }}
                                            <b-spinner v-if="isLoading" small label="Spinning"></b-spinner>
                                        </b-button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </form>
            </section>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    data: function () {
        return {
            isLoading:false,
            sms_settings: {
                sms_method_settings: 0,
                twilio_method: 0,
                twilio_sid: '',
                twilio_auth_token:'',
                twilio_phone_number:''
            },
            record: null
        }
    },
    created: function () {
        this.getSmsMethods()
    },
    methods: {
        tr(key, fallback) { const v = this.__(key); return v && v !== key ? v : fallback; },
        getSmsMethods() {
            axios.get(this.$apiUrl + '/sms_settings').then((response) => {
                if(response.data.data) {
                    this.record = response.data.data;

                    this.sms_settings.twilio_method = this.record.twilio_method??0;
                    this.sms_settings.twilio_sid = this.record.twilio_sid??"";
                    this.sms_settings.twilio_auth_token = this.record.twilio_auth_token;
                    this.sms_settings.twilio_phone_number = this.record.twilio_phone_number??"";
                }
            });
        },
        saveRecord: function(){
            this.isLoading = true;
            let sms_settingsObject = this.sms_settings;
            let formData = new FormData();
            for (let key in sms_settingsObject) {
                if(sms_settingsObject[key] == false){
                    formData.append(key, 0);
                }else if(sms_settingsObject[key] == true){
                    formData.append(key, 1);
                }else{
                    formData.append(key, sms_settingsObject[key]);
                }
            }


            let vm = this;
            if (this.sms_settings.twilio_method == 1 ) {
                    

            let url = this.$apiUrl + '/sms_settings/save';
       
            axios.post(url, formData).then(res => {
                let data = res.data;
                if (data.status === 1) {
                    this.showMessage("success", data.message);
                    setTimeout(
                        function() {
                            vm.$swal.close();
                            vm.getSmsMethods();
                            vm.$router.push({path:'/sms-settings'});
                            vm.isLoading = false;
                        }, 100);
                }else{
                    vm.showError(data.message);
                    vm.isLoading = false;
                }
            }).catch(error => {
                if (error.request.statusText) {
                    this.showError(error.request.statusText);
                }else if (error.message) {
                    this.showError(error.message);
                } else {
                    this.showError(__('something_went_wrong'));
                }
                vm.isLoading = false;
            });
     
} else {
  this.showMessage("error", "At lease one sms method is should enable");
      vm.isLoading = false;

        }
        }
    }
}
</script>

<style scoped>
/* Enable/disable switch row at the top of the gateway card: label left, switch right */
.sms-methods-grid .card-body .form-group:has(> .form-switch) {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding-bottom: 14px;
    margin-bottom: 16px;
    border-bottom: 1px solid var(--ui-border);
}
.sms-methods-grid .card-body .form-group:has(> .form-switch) > br {
    display: none;
}
.sms-methods-grid .card-body .form-group:has(> .form-switch) > label {
    margin-bottom: 0;
    font-weight: 600;
    color: var(--ui-heading);
}
.sms-methods-grid .card-body .form-group:has(> .form-switch) > .form-switch {
    margin: 0;
}
</style>
