<template>
    <div class="auth" :style="{ backgroundImage: 'url(' + $baseUrl + '/images/panel_login_background_img.jpg' + ')' }">
        <div class="login-wrapper">
            <div class="auth-section col-lg-6 mt-5 install-wizard-section">
                <div class="auth-card">
                    <form-wizard @on-complete="onComplete" @on-loading="setLoading" @on-validate="handleValidation"
                        @on-error="handleErrorMessage" shape="circle" color="var(--theme-primary-500)"
                        error-color="var(--theme-error-500)" title="" subtitle="">

                        <!--Welcome-->
                        <tab-content title="Welcome">
                            <div class="text-center">
                                <p class="display-4 py-3">🙌</p>
                                <p>Thank you for choosing the eMarket script from WRTeam.</p>
                                <p>This quick setup wizard will help you configure your new website.</p>
                                <p>It should only take 3-5 minutes.</p>
                            </div>
                        </tab-content>

                        <!-- Requirements-->
                        <tab-content title="Requirements" :before-change="validateAsync">

                            <table class="table" v-for="(requirement, type) in requirements['requirements']">
                                <thead>
                                    <tr>
                                        <th class="ps-2">PHP >= {{ phpSupportInfo['minimum'] }}</th>
                                        <th class="text-end pe-2">
                                            <strong>{{ phpSupportInfo['current'] }}</strong>
                                            <i class="fa fa-fw"
                                                :class="phpSupportInfo['supported'] ? 'fa-check-circle text-success' : 'fa-exclamation-circle text-danger'"></i>
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    <tr v-for="(enabled, extension) in requirements['requirements'][type]"
                                        :class="enabled ? '' : 'text-danger'">
                                        <td>{{ extension }}</td>
                                        <td class="text-end">
                                            <i class="fa fa-fw"
                                                :class="enabled ? 'fa-check-circle text-success' : 'fa-exclamation-circle text-danger'"></i>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>


                            <table class="table">
                                <thead>
                                    <tr>
                                        <th colspan="2" class="ps-2">Permissions</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    <template v-for="permission in permissions['permissions']">

                                        <template v-if="permission['folder'] == '.env'">
                                            <tr :class="permission['permission'] ? '' : 'text-danger'">
                                                <td><input type="text" class="form-control"
                                                        :value="permission['folder']" disabled></td>
                                                <td class="text-end align-middle">
                                                    <strong>{{ permission['permission'] ? '' : __('The file is not
                                                        writable!') }}</strong>
                                                    <i class="fa fa-fw"
                                                        :class="permission['permission'] ? 'fa-check-circle text-success' : 'fa-exclamation-circle text-danger'"></i>

                                                </td>
                                            </tr>
                                        </template>

                                        <template v-else>
                                            <tr :class="permission['isSet'] ? '' : 'text-danger'">
                                                <td><input type="text" class="form-control"
                                                        :value="permission['folder']" disabled></td>
                                                <td class="text-end align-middle">
                                                    <strong>{{ permission['permission'] }}</strong>
                                                    <i class="fa fa-fw"
                                                        :class="permission['isSet'] ? 'fa-check-circle text-success' : 'fa-exclamation-circle text-danger'"></i>
                                                </td>
                                            </tr>
                                        </template>

                                    </template>

                                </tbody>
                            </table>
                        </tab-content>

                        <tab-content title="Database" :before-change="onCreateDatabase">
                            <div>
                                <p class="text-center">Below you should enter your database connection details. If you
                                    are not sure about these,
                                    contact your host.</p>

                                <form>
                                    <div class="row">
                                        <div class="col-md-6">
                                            <div class="form-group mb-3">
                                                <label class="form-label" for="database_host">Database Host<span
                                                        class="text-danger text-xs">*</span></label>
                                                <input type="text" placeholder="Database Host"
                                                    v-model="database.database_host" id="database_host"
                                                    class="form-control" required />
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-group mb-3">
                                                <label class="form-label" for="database_port">Database Port<span
                                                        class="text-danger text-xs">*</span></label>
                                                <input type="text" placeholder="Database Port"
                                                    v-model="database.database_port" id="database_port"
                                                    class="form-control" required />
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-group mb-3">
                                                <label class="form-label" for="database_name">Database Name<span
                                                        class="text-danger text-xs">*</span></label>
                                                <input type="text" placeholder="Database Name"
                                                    v-model="database.database_name" id="database_name"
                                                    class="form-control " required />
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-group mb-3">
                                                <label class="form-label" for="database_username">Database Username<span
                                                        class="text-danger text-xs">*</span></label>
                                                <input type="text" placeholder="Database Usersname"
                                                    v-model="database.database_username" id="database_username"
                                                    class="form-control" required />
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-group mb-3">
                                                <label class="form-label" for="database_password">Database Password<span
                                                        class="text-danger text-xs">*</span></label>
                                                <input type="password" placeholder="Database Password"
                                                    v-model="database.database_password" id="database_password"
                                                    class="form-control" required autocomplete="off" />
                                            </div>
                                        </div>

                                        <div class="divider">
                                            <div class="divider-text">Admin Details</div>
                                        </div>

                                        <div class="col-md-6">
                                            <div class="form-group mb-3">
                                                <label class="form-label" for="admin_email">Admin Email<span
                                                        class="text-danger text-xs">*</span></label>
                                                <input type="email" placeholder="Admin Email"
                                                    v-model="database.admin_email" id="admin_email" class="form-control"
                                                    required />
                                            </div>
                                        </div>

                                        <div class="col-md-6">
                                            <div class="form-group mb-3">
                                                <label class="form-label" for="admin_password">Admin Password<span
                                                        class="text-danger text-xs">*</span></label>
                                                <div class="input-group">
                                                    <input :type="showAdminPassword ? 'text' : 'password'"
                                                        placeholder="Admin Password" v-model="database.admin_password"
                                                        name="admin_password" id="admin_password" class="form-control"
                                                        required autocomplete="off">
                                                    <button type="button"
                                                        v-on:click="showAdminPassword = !showAdminPassword"
                                                        class="btn btn-outline-secondary pw-toggle-btn">
                                                        <img v-if="showAdminPassword"
                                                            :src="$baseUrl + '/images/icons/show_password.svg'"
                                                            alt="toggle-password" />
                                                        <img v-else :src="$baseUrl + '/images/icons/hide_password.svg'"
                                                            alt="toggle-password" />
                                                    </button>
                                                </div>

                                            </div>
                                        </div>

                                    </div>
                                </form>
                            </div>

                        </tab-content>

                        <tab-content title="Purchase Code" :before-change="purchaseCode">
                            <div class="form-group mb-3">
                                <label class="form-label" for="purchase_code">Purchase Code<span
                                        class="text-danger text-xs">*</span></label>
                                <input type="text" v-model="purchase_code" id="purchase_code" class="form-control"
                                    placeholder="Purchase Code" />
                            </div>
                        </tab-content>

                        <tab-content title="Finish" :before-change="finish">
                            <div class="text-center">
                                <i class="fa fa-check-circle fa-5x text-success mx-auto my-3"></i>
                                <h1 class="text-success my-3">Congratulations!</h1>
                                <p>Your website is ready now. Login to your Admin dashboard to make changes and modify
                                    any of the default
                                    content to suit your needs.</p>
                                <p>Please come back and<a class="text-primary"
                                        href="https://codecanyon.net/item/egrocer-online-grocery-store-ecommerce-marketplace-flutter-full-app-with-admin-panel/reviews/41423150">
                                        Leave a 5-star rating </a> if you are happy with this script.</p>

                                <small class="form-hint">For security reasons, the system will remove the install link
                                    automatically.</small>
                            </div>
                        </tab-content>

                        <div class="loader" v-if="loadingWizard"></div>
                        <div v-if="errorMsg">
                            <span class="error">{{ errorMsg }}</span>
                        </div>
                    </form-wizard>

                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
import { FormWizard, TabContent } from 'vue-form-wizard'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'

export default {
    components: {
        FormWizard,
        TabContent
    },
    data: function () {
        return {
            loadingWizard: false,
            errorMsg: null,
            count: 0,

            phpSupportInfo: [],
            requirements: [],
            permissions: [],

            database: {
                database_host: '127.0.0.1',
                database_port: 3306,
                database_name: '',
                database_username: 'root',
                database_password: '',
                admin_email: '',
                admin_password: '',
            },
            showAdminPassword: false,
            purchase_code: ''
        };
    },
    mounted() {
        if (this.loggedUser) {
            this.$router.push('/dashboard');
        }
    },
    created: function () {
        this.getRequirements();
    },
    methods: {
        getRequirements: function () {
            let vm = this;
            axios.get(this.$apiUrl + '/install/requirements').then((response) => {
                this.isLoading = false
                var data = response.data.data;

                this.phpSupportInfo = data.phpSupportInfo;
                this.requirements = data.requirements;
                this.permissions = data.permissions;

            }).catch(error => {
                vm.isLoading = false;
                if (error?.request?.statusText) {
                    this.showError(error.request.statusText);
                } else if (error.message) {
                    this.showError(error.message);
                } else {
                    this.showError("Something went wrong!");
                }
            });
        },
        onComplete: function () {

        },
        setLoading: function (value) {
            this.loadingWizard = value
        },
        handleValidation: function (isValid, tabIndex) {
        },
        handleErrorMessage: function (errorMsg) {
            this.errorMsg = errorMsg
        },
        validateAsync: function () {
            return new Promise((resolve, reject) => {
                if (this.requirements['errors'] === true || !this.phpSupportInfo['supported'] || this.permissions['errors'] === true || this.permissions['permissions'][0]['permission'] === false) {
                    this.count++
                    reject('Please Check the requirements and Try again after fixing it.')
                } else {
                    this.count = 0
                    resolve(true)
                }
            });
        },

        onCreateDatabase: function () {

            return new Promise((resolve, reject) => {
                axios.post(this.$apiUrl + '/install/database', this.database).then((response) => {
                    var data = response.data;
                    if (data.status) {
                        this.count = 0
                        resolve(true)
                    } else {
                        this.count++
                        reject(data.message);
                    }
                }).catch(error => {
                    this.count++
                    reject(error.toString())
                });

            });


        },

        purchaseCode: function () {

            return new Promise((resolve, reject) => {
                let data = { 'purchase_code': this.purchase_code };
                axios.post(this.$apiUrl + '/install/purchase_code', data).then((response) => {
                    var data = response.data;
                    if (data.status) {
                        this.count = 0
                        resolve(true)
                    } else {
                        this.count++
                        reject(data.message);
                    }
                }).catch(error => {
                    this.count++
                    reject(error.toString())
                });

            });


        },

        finish: function () {
            // Full page load straight to the login page. The old code reloaded the current URL
            // (/install): by now the app counts as installed, so the router sends /install to /404.
            window.location.href = this.$baseUrl + '/login';
        },
    }
}
</script>

<style scoped>
span.error {
    color: var(--theme-error-500);
    font-size: 14px;
    font-weight: 600;
    display: flex;
    justify-content: center;
    margin-top: 12px;
}

a {
    color: var(--theme-primary-500);
}

.auth {
    overflow-y: auto !important;
}

.login-wrapper {
    height: auto !important;
    min-height: 100vh !important;
    padding: 20px 10% !important;
    overflow-y: auto !important;
    /* Same placement as the login page: card on the right, vertically centred. */
    align-items: center !important;
    justify-content: flex-end !important;
}

.install-wizard-section.auth-section {
    max-width: 700px !important;
    width: 100% !important;
    max-height: none !important;
    overflow-y: visible !important;
    margin-top: 2rem !important;
    margin-bottom: 2rem !important;
}

.auth-card {
    max-width: 700px !important;
    width: 100% !important;
}

/* Requirement / permission tables: compact SnapBuy table look */
.auth-card .table {
    font-size: 13px;
    color: var(--ui-text);
    border: 1px solid var(--ui-border);
    border-radius: var(--ui-radius-lg);
    border-collapse: separate;
    border-spacing: 0;
    overflow: hidden;
}

.auth-card .table thead th {
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.03em;
    color: var(--ui-text-muted);
    background: var(--ui-surface-muted);
    border-bottom: 1px solid var(--ui-border);
    padding: 10px 14px;
}

.auth-card .table tbody td {
    padding: 8px 14px;
    border-color: var(--ui-border);
    vertical-align: middle;
}

#app .auth .auth-card .table .form-control {
    height: 38px !important;
    min-height: 38px;
    font-size: 13px !important;
}

.auth-card .form-label {
    font-size: 13px;
    font-weight: 600;
    color: var(--ui-text);
}

@media (max-width: 575.98px) {
    .login-wrapper {
        padding: 16px !important;
        justify-content: center !important;
    }

    .install-wizard-section.auth-section {
        margin-top: 0 !important;
        margin-bottom: 1rem !important;
    }
}
</style>

<!-- vue-form-wizard renders its own elements (child component), so scoped styles cannot reach them.
     Its step circles are hard-coded white; follow the active light / dark theme instead. -->
<style>
.install-wizard-section .vue-form-wizard .wizard-icon-circle:not(.checked) {
    background-color: var(--ui-surface-muted) !important;
}

.install-wizard-section .vue-form-wizard .wizard-icon-circle:not(.checked) .wizard-icon-container .wizard-icon,
.install-wizard-section .vue-form-wizard .wizard-icon-circle:not(.checked) .wizard-icon {
    color: var(--ui-text-muted) !important;
}

.install-wizard-section .vue-form-wizard .stepTitle {
    color: var(--ui-text-muted);
}

.install-wizard-section .vue-form-wizard .stepTitle.active {
    color: var(--ui-text);
}
</style>
