<template>
    <div class="auth" :style="{ backgroundImage: 'url('+ $panelLoginBackgroundImg + ')' }">
        <div class="login-wrapper">
            <div class="auth-section">

                <div class="auth-card">
                    <div class="auth-logo">
                        <a href="javascript:void(0)" style="display: flex; align-items: center; justify-content: flex-start;">
                            <img v-if="$appLogo != ''" :src="$storageUrl+$appLogo" style="height: 70px; width: 70px;" alt='Logo'/>
                            <img v-else :src="$baseUrl + '/images/logo.png'" style="height: 70px; width: 70px;" alt='Logo'/>
                            <h2 style="margin: 10px;">{{ $appName }}</h2>
                        </a>
                    </div>

                    <h4>{{ __('reset_your_password_here') }}</h4>

                    <form @submit.prevent="resetPassword()">
                        <div class="form-group position-relative has-icon-left">
                            <input :type="showPassword ? 'text' : 'password'" class="form-control form-control-xl" :placeholder="__('new_password')" v-model="user.password" required>
                            <div class="form-control-icon"><i class="bi bi-shield-lock"></i></div>
                            <button type="button" v-on:click="showPassword = !showPassword"
                                    style="background: transparent; border: none; padding: 0; outline: none; margin-top: -45px; position: absolute; right: 15px; cursor: pointer; display: flex; align-items: center; justify-content: center; height: 38px;">
                                <img :src="showPassword ? $baseUrl + '/images/icons/show_password.svg' : $baseUrl + '/images/icons/hide_password.svg'"
                                     style="width: 22px; height: 22px; filter: invert(0.85); opacity: 0.85;" alt="toggle-password" />
                            </button>
                        </div>
                        <div class="form-group position-relative has-icon-left">
                            <input :type="showPasswordConfirmation ? 'text' : 'password'" class="form-control form-control-xl" :placeholder="__('confirm_new_password')" v-model="user.password_confirmation" required>
                            <div class="form-control-icon"><i class="bi bi-shield-lock"></i></div>
                            <button type="button" v-on:click="showPasswordConfirmation = !showPasswordConfirmation"
                                    style="background: transparent; border: none; padding: 0; outline: none; margin-top: -45px; position: absolute; right: 15px; cursor: pointer; display: flex; align-items: center; justify-content: center; height: 38px;">
                                <img :src="showPasswordConfirmation ? $baseUrl + '/images/icons/show_password.svg' : $baseUrl + '/images/icons/hide_password.svg'"
                                     style="width: 22px; height: 22px; filter: invert(0.85); opacity: 0.85;" alt="toggle-password" />
                            </button>
                        </div>
                        <button class="btn btn-primary btn-block btn-lg shadow-lg mt-5 auth-btn">
                            {{ __('reset_password') }}
                            <b-spinner v-if="isLoading" small label="Spinning"></b-spinner>
                        </button>
                    </form>

                    <div class="auth-copyright">
                        <a href="javascript:void(0)" class="text-primary font-weight-normal"> @ {{ new Date().getFullYear() }} {{$appName}}. All Right Reserved</a>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
import Auth from '../Auth.js';

export default {
    data: function () {
        return {
            isLoading: false,
            showPassword: false,
            showPasswordConfirmation: false,
            user: {
                password: '',
                password_confirmation: '',
                token: '',
            },
            loggedUser: Auth.user
        };
    },
    mounted() {
        if (this.loggedUser) {
            this.$router.push('/dashboard');
        }
    },
    methods: {

        resetPassword: function () {
            this.user.token = this.$route.query.token;
            let vm = this;
            this.isLoading = true;
            let url = this.$apiUrl + '/reset-password';
            axios.post(url, this.user).then(res => {
                vm.isLoading = false;
                let data = res.data;
                if (data.status === 1) {

                    vm.showSuccess(data.message);
                    setTimeout(()=>{
                        this.$router.push('/login');
                    },1000);

                } else {
                    vm.showError(data.message);
                }
            }).catch(error => {
                vm.isLoading = false;
                if (error.request.statusText) {
                    this.showError(error.request.statusText);
                }else if (error.message) {
                    this.showError(error.message);
                } else {
                    this.showError(__('something_went_wrong'));
                }
            });
        }
    }
}
</script>
<style scoped>

</style>
