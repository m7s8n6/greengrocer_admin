<template>
    <div class="auth" :style="{ backgroundImage: 'url('+ $panelLoginBackgroundImg + ')' }">
        <div class="login-wrapper">
            <div class="auth-section">
                <div class="auth-card">
                    <div class="auth-logo">
                        <a href="javascript:void(0)" class="d-flex align-items-center justify-content-center">
                            <img class="auth-logo-img login-logo-light" v-if="$appLogo != ''" :src="$storageUrl+$appLogo" alt='Logo'/>
                            <img class="auth-logo-img login-logo-light" v-else :src="$baseUrl + '/images/logo.png'" alt='Logo'/>
                            <img class="auth-logo-img login-logo-dark" v-if="$appDarkLogo" :src="$storageUrl + $appDarkLogo" alt='Logo'/>
                        </a>
                    </div>
                    <h4>{{ __('welcome_back') }}</h4>
                    <p class="auth-subtitle text-primary">{{ __('please_login_to_your_seller_account') }}</p>
                    <form @submit.prevent="loginCheck()">
                        <div class="form-group position-relative has-icon-left mb-4">
                            <input type="email" class="form-control form-control-xl" :placeholder="__('email_address')" required
                                   v-model="user.email">
                            <div class="form-control-icon">
                                <i class="bi bi-envelope"></i>
                            </div>
                        </div>
                        <div class="form-group position-relative has-icon-left">
                            <input :type="showPassword ? 'text' : 'password'" class="form-control form-control-xl" :placeholder="__('password')" required
                                   v-model="user.password">
                            <div class="form-control-icon">
                                <i class="bi bi-key"></i>
                            </div>
                            <button type="button" v-on:click="showPassword = !showPassword" class="auth-pw-toggle">
                                <img :src="showPassword ? $baseUrl + '/images/icons/show_password.svg' : $baseUrl + '/images/icons/hide_password.svg'" alt="toggle-password" />
                            </button>
                        </div>
                        <div class="auth-forgot text-end">
                            <router-link class="font-bold" to="/forgot-password"><span>{{ __('forgot_password') }}</span></router-link>
                        </div>

                        <button class="btn btn-primary btn-block btn-lg shadow-lg mt-5 auth-btn">
                            {{ __('login') }}
                            <b-spinner v-if="isLoading" small label="Spinning"></b-spinner>
                            <span v-else class="bi bi-arrow-right"></span>
                        </button>

                        <hr>
                        <router-link to="/seller/register" class="btn btn-primary btn-block btn-lg shadow-lg mt-2">
                            <i class="bi bi-person-plus me-2"></i>{{ __('register') }}</router-link>
                        <router-link to="/login" class="btn btn-primary btn-block btn-lg shadow-lg mt-2">
                            <i class="bi bi-person-badge me-2"></i>{{ __('admin_panel') }}</router-link>
                    </form>
                    <div class="auth-copyright">
                        <a href="javascript:void(0)" class="text-primary font-weight-normal"> {{ $copyrightDetails }}</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
import Auth from '../../Auth.js';
import { afterLoginPath } from '../../IntendedUrl.js';

export default {
    data: function () {
        return {
            isLoading: false,
            user: {
                email: (this.$isDemo === 1 || this.$isDemo === '1') ? 'seller@gmail.com' : '',
                password: (this.$isDemo === 1 || this.$isDemo === '1') ? '123456' : '',
                type:3
            },
            showPassword: false,
            loggedUser: Auth.user,
            setting:""
        };
    },
    mounted() {
        let user_theme = sessionStorage.getItem("user-theme");
        if (user_theme === 'theme-dark' || user_theme === 'theme-light') { document.body.classList.remove('theme-light', 'theme-dark'); document.body.classList.add(user_theme); }
        if (this.loggedUser) {
            this.$router.push('/seller/login');
        }
    },
    methods: {

        loginCheck: function () {
            let vm = this;
            this.isLoading = true;

            let url = this.$apiUrl + '/login';
            axios.post(url, this.user).then(res => {
                vm.isLoading = false;
                let data = res.data;
                if (data.status === 1) {
                    Auth.login(data.data.access_token, data.data.user);
                    this.$router.push(afterLoginPath(data.data.user, '/seller'));
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
