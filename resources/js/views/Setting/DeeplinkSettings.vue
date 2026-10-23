<template>
    <div>
        <div class="page-heading">
            <div class="page-title">
                <div class="row">
                    <div class="col-12 col-md-6 order-md-1 order-last">
                        <h3>{{ __('deeplink_settings') }}</h3>
                    </div>
                    <div class="col-12 col-md-6 order-md-2 order-first">
                        <nav aria-label="breadcrumb" class="breadcrumb-header float-start float-lg-end">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><router-link to="/dashboard">{{ __('dashboard') }}</router-link></li>
                                <li class="breadcrumb-item"><router-link to="/system_settings">{{ __('settings') }}</router-link></li>
                                <li class="breadcrumb-item active" aria-current="page">{{ __('deeplink_settings') }}</li>
                            </ol>
                        </nav>
                    </div>
                </div>
            </div>
            <section class="section">
                <form @submit.prevent="saveRecord">
                    <div class="card">
                        <div class="card-header">
                            <h4 class="card-title float-none">{{ __('deeplink_settings') }}</h4>
                            <p class="text-muted small mb-0 mt-1">{{ tr('deeplink_settings_desc', 'Deeplink configuration used by the website and the mobile apps to open in-app screens.') }}</p>
                        </div>
                        <div class="card-body">

                            <div class="alert alert-info">
                                <b>How deeplinks work:</b>
                                <ul class="mb-0 mt-2">
                                    <li>Scheme is the custom URL prefix the apps respond to, e.g. <code>emarket</code> (lowercase, no <code>://</code>).</li>
                                </ul>
                            </div>

                            <div class="row">
                                <div class="col-md-6 form-group">
                                    <label>Deeplink Schema<span class="text-danger">*</span></label>
                                    <input type="text" class="form-control" placeholder="emarket" v-model.trim="settings.deeplink_scheme" required>
                                </div>
                            </div>
                            <div class="d-flex justify-content-end border-top pt-3 mt-2">
                                <b-button v-if="$can('deeplink_settings')" type="submit" variant="primary" :disabled="isLoading">
                                    {{ __('update') }}
                                    <b-spinner v-if="isLoading" small label="Spinning"></b-spinner>
                                </b-button>
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
            isLoading: false,
            settings: {
                deeplink_scheme: '',
            },
        }
    },
    created: function () {
        this.getSettings();
    },
    methods: {
        tr(key, fallback) { const v = this.__(key); return v && v !== key ? v : fallback; },
        getSettings() {
            axios.get(this.$apiUrl + '/deeplink_settings').then((response) => {
                if (response.data.data) {
                    this.settings.deeplink_scheme = response.data.data.deeplink_scheme ?? '';
                }
            });
        },
        saveRecord() {
            const scheme = (this.settings.deeplink_scheme || '').trim();
            if (!/^[a-z][a-z0-9+.-]*$/.test(scheme)) {
                this.showError('Deeplink schema must be lowercase, start with a letter and contain no "://" or spaces.');
                return;
            }
            this.isLoading = true;
            let formData = new FormData();
            for (let key in this.settings) {
                formData.append(key, this.settings[key] ?? '');
            }

            axios.post(this.$apiUrl + '/deeplink_settings/save', formData).then((res) => {
                if (res.data.status === 1) {
                    this.showMessage("success", res.data.message);
                } else {
                    this.showError(res.data.message);
                }
                this.isLoading = false;
            }).catch((error) => {
                if (error.request && error.request.statusText) {
                    this.showError(error.request.statusText);
                } else if (error.message) {
                    this.showError(error.message);
                } else {
                    this.showError(this.__('something_went_wrong'));
                }
                this.isLoading = false;
            });
        },
    },
}
</script>
