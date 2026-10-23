<template>
    <div
        class="auth"
        :style="{ backgroundImage: 'url(' + $panelLoginBackgroundImg + ')' }"
    >
        <div class="login-wrapper">
            <div class="auth-section">
                <div class="auth-card">
                    <div class="auth-logo">
                        <a href="javascript:void(0)" class="d-flex align-items-center justify-content-center">
                            <img class="auth-logo-img login-logo-light" v-if="$appLogo != ''" :src="$storageUrl + $appLogo" alt="Logo" />
                            <img class="auth-logo-img login-logo-light" v-else :src="$baseUrl + '/images/logo.png'" alt="Logo" />
                            <img class="auth-logo-img login-logo-dark" v-if="$appDarkLogo" :src="$storageUrl + $appDarkLogo" alt="Logo" />
                        </a>
                    </div>
                    <h4>{{ __('reset_your_password_here') }}</h4>
                    <form class="mt-4" @submit.prevent="forgetPasswordSendMail()">
                        <div
                            class="form-group position-relative has-icon-left mb-4"
                        >
                            <input
                                type="email"
                                class="form-control form-control-xl"
                                :placeholder="__('email_address')"
                                v-model="user.email"
                                required
                            />
                            <div class="form-control-icon">
                                <i class="bi bi-envelope"></i>
                            </div>
                        </div>
                        <button
                            class="btn btn-primary btn-block btn-lg shadow-lg mt-5 auth-btn"
                        >
                            {{ __('reset_password') }}
                            <b-spinner
                                v-if="isLoading"
                                small
                                label="Spinning"
                            ></b-spinner>
                        </button>

                        <hr>
                        <router-link to="/login" class="btn btn-primary btn-block btn-lg shadow-lg mt-2">
                            <i class="bi bi-arrow-left me-2"></i>{{ __('login') }}</router-link>
                    </form>
                    <div class="auth-copyright">
                        <a
                            href="javascript:void(0)"
                            class="text-primary font-weight-normal"
                        >
                            {{ $copyrightDetails }}</a
                        >
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from "axios";
import Auth from "../Auth.js";

export default {
    data: function () {
        return {
            isLoading: false,
            user: {
                email: "",
            },
            loggedUser: Auth.user,
            setting: "",
        };
    },

    mounted() {
        if (this.loggedUser) {
            this.$router.push("/dashboard");
        }
    },
    methods: {
        forgetPasswordSendMail: function () {
            let vm = this;
            this.isLoading = true;
            let url = this.$apiUrl + "/forgot_password";
            axios
                .post(url, this.user)
                .then((res) => {
                    vm.isLoading = false;
                    let data = res.data;

                    if (data.status === 1) {
                        this.user.email = "";
                        vm.showMessage("success", data.message);
                    } else {
                        vm.showError(data.message);
                    }
                })
                .catch((error) => {
                    vm.isLoading = false;
                    if (error.request.statusText) {
                        this.showError(error.request.statusText);
                    } else {
                        if (error.request.statusText) {
                            this.showError(error.request.statusText);
                        } else if (error.message) {
                            this.showError(error.message);
                        } else {
                            this.showError(__("something_went_wrong"));
                        }
                    }
                });
        },
    },
};
</script>
<style scoped>
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
