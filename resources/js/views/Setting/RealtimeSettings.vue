<template>
    <div>
        <div class="page-heading">
            <div class="page-title">
                <div class="row">
                    <div class="col-12 col-md-6 order-md-1 order-last">
                        <h3>{{ __('realtime_settings') || 'Realtime Settings' }}</h3>
                    </div>
                    <div class="col-12 col-md-6 order-md-2 order-first">
                        <nav aria-label="breadcrumb" class="breadcrumb-header float-start float-lg-end">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><router-link to="/dashboard">{{ __('dashboard') }}</router-link></li>
                                <li class="breadcrumb-item active" aria-current="page">{{ __('realtime_settings') || 'Realtime Settings' }}</li>
                            </ol>
                        </nav>
                    </div>
                </div>
            </div>
            <section class="section">
                <form @submit.prevent="saveRecord">
                    <div class="card">
                        <div class="card-header">
                            <h4 class="card-title float-none">{{ __('realtime_settings') || 'Realtime Settings' }}</h4>
                            <p class="text-muted small mb-0 mt-1">{{ tr('realtime_settings_desc', 'Choose how realtime order-offer alerts reach delivery boys; only the selected driver is used.') }}</p>
                        </div>
                        <div class="card-body">

                            <div class="form-group mb-4">
                                <label class="d-block mb-2">Realtime Driver<span class="text-danger">*</span></label>
                                <div class="btn-group w-100" role="group">
                                    <button type="button" class="btn"
                                        :class="settings.broadcast_driver === 'reverb' ? 'btn-primary' : 'btn-outline-secondary'"
                                        @click="settings.broadcast_driver = 'reverb'">
                                        Reverb (Self Hosted)
                                    </button>
                                    <button type="button" class="btn"
                                        :class="settings.broadcast_driver === 'pusher' ? 'btn-primary' : 'btn-outline-secondary'"
                                        @click="settings.broadcast_driver = 'pusher'">
                                        Pusher (Cloud)
                                    </button>
                                </div>
                            </div>

                            <div v-if="settings.broadcast_driver === 'pusher'">
                                <h5 class="mb-1">Pusher Credentials</h5>
                                <p class="text-muted small">Get these from your Pusher Channels app under "App Keys".</p>
                                <div class="row">
                                    <div class="col-12 col-md-6 form-group">
                                        <label>App ID</label>
                                        <input type="text" class="form-control" v-model="settings.pusher_app_id">
                                    </div>
                                    <div class="col-12 col-md-6 form-group">
                                        <label>App Key</label>
                                        <input type="text" class="form-control" v-model="settings.pusher_app_key">
                                    </div>
                                    <div class="col-12 col-md-6 form-group">
                                        <label>App Secret</label>
                                        <input type="password" class="form-control" v-model="settings.pusher_app_secret">
                                    </div>
                                    <div class="col-12 col-md-6 form-group">
                                        <label>Cluster</label>
                                        <input type="text" class="form-control" v-model="settings.pusher_app_cluster">
                                    </div>
                                </div>
                            </div>

                            <div v-else>
                                <h5 class="mb-1">Reverb Credentials</h5>
                                <p class="text-muted small">
                                    Reverb runs as its own process on your server (<code>php artisan reverb:start</code>) -
                                    requires the <code>laravel/reverb</code> composer package to be installed.
                                </p>
                                <div class="row">
                                    <div class="col-12 col-md-6 form-group">
                                        <label>App ID</label>
                                        <input type="text" class="form-control" v-model="settings.reverb_app_id">
                                    </div>
                                    <div class="col-12 col-md-6 form-group">
                                        <label>App Key</label>
                                        <input type="text" class="form-control" v-model="settings.reverb_app_key">
                                    </div>
                                    <div class="col-12 col-md-6 form-group">
                                        <label>App Secret</label>
                                        <input type="password" class="form-control" v-model="settings.reverb_app_secret">
                                    </div>
                                    <div class="col-12 col-md-6 form-group">
                                        <label>Host</label>
                                        <input type="text" class="form-control" v-model="settings.reverb_host">
                                    </div>
                                    <div class="col-12 col-md-6 form-group">
                                        <label>Port</label>
                                        <input type="text" class="form-control" v-model="settings.reverb_port">
                                    </div>
                                    <div class="col-12 col-md-6 form-group">
                                        <label>Scheme</label>
                                        <select class="form-control" v-model="settings.reverb_scheme">
                                            <option value="http">http</option>
                                            <option value="https">https</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div class="alert alert-info mt-3">
                                Saving here does not by itself send anything over websocket -
                                <code>{{ settings.broadcast_driver === 'pusher' ? 'pusher/pusher-php-server' : 'laravel/reverb' }}</code>
                                must also be installed on the server for this driver to actually work.
                            </div>
                            <div class="d-flex justify-content-end border-top pt-3 mt-2">
                                <b-button v-if="$can('realtime_settings')" type="submit" variant="primary" :disabled="isLoading">
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
                broadcast_driver: 'pusher',
                pusher_app_id: '',
                pusher_app_key: '',
                pusher_app_secret: '',
                pusher_app_cluster: '',
                reverb_app_id: '',
                reverb_app_key: '',
                reverb_app_secret: '',
                reverb_host: '',
                reverb_port: '',
                reverb_scheme: 'http',
            },
        }
    },
    created: function () {
        this.getSettings();
    },
    methods: {
        tr(key, fallback) { const v = this.__(key); return v && v !== key ? v : fallback; },
        getSettings() {
            axios.get(this.$apiUrl + '/realtime_settings').then((response) => {
                if (response.data.data) {
                    Object.assign(this.settings, response.data.data);
                }
            });
        },
        saveRecord() {
            this.isLoading = true;
            let formData = new FormData();
            for (let key in this.settings) {
                formData.append(key, this.settings[key] ?? '');
            }

            axios.post(this.$apiUrl + '/realtime_settings/save', formData).then((res) => {
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
