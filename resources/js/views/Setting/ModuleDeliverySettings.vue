<template>
    <div>
        <div class="page-heading">
            <div class="page-title">
                <div class="row">
                    <div class="col-12 col-md-6 order-md-1 order-last">
                        <h3>Seller Delivery Boys</h3>
                    </div>
                    <div class="col-12 col-md-6 order-md-2 order-first">
                        <nav aria-label="breadcrumb" class="breadcrumb-header float-start float-lg-end">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><router-link to="/dashboard">{{ __('dashboard') }}</router-link></li>
                                <li class="breadcrumb-item"><router-link to="/delivery_settings">{{ __('delivery_settings') }}</router-link></li>
                                <li class="breadcrumb-item active" aria-current="page">Seller Delivery Boys</li>
                            </ol>
                        </nav>
                    </div>
                </div>
            </div>
            <section class="section">
                <div v-if="isLoading" class="text-center text-muted my-3">
                    <b-spinner class="align-middle"></b-spinner>
                    <strong>{{ __('loading') }}...</strong>
                </div>

                <!-- Auto-assign delivery boy feature disabled - Auto-Assign Settings card:
                <div class="card" v-else-if="module">
                    <div class="card-header">
                        <h4 class="card-title float-none">{{ tr('auto_assign_settings', 'Auto-Assign Settings') }}</h4>
                        <p class="text-muted small mb-0 mt-1">{{ tr('auto_assign_settings_desc', 'Control how new orders are offered to nearby delivery boys for the selected module.') }}</p>
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-12 col-md-6 form-group">
                                <div class="form-check form-switch">
                                    <input class="form-check-input" type="checkbox" v-model="module.auto_assign_enabled" id="auto_assign_enabled">
                                    <label class="form-check-label ms-2" for="auto_assign_enabled">Auto-Assign Enabled</label>
                                </div>
                                <small class="text-muted">Automatically send new orders to nearby drivers instead of assigning manually.</small>
                            </div>
                        </div>

                        <div class="row" v-if="module.auto_assign_enabled">
                            <div class="col-12 col-md-6 form-group">
                                <label>Response Timeout (seconds)</label>
                                <input type="number" min="60" class="form-control" v-model.number="module.response_timeout_seconds">
                                <small class="text-muted">How long a driver has to accept before it moves to the next driver.</small>
                            </div>
                            <div class="col-12 col-md-6 form-group">
                                <label>Max Rounds</label>
                                <input type="number" min="1" class="form-control" v-model.number="module.max_rounds">
                                <small class="text-muted">How many times to retry with drivers before giving up.</small>
                            </div>
                            <div class="col-12 col-md-6 form-group">
                                <label>Total Wait Cap (seconds)</label>
                                <input type="number" min="1" class="form-control" v-model.number="module.total_wait_cap_seconds">
                                <small class="text-muted">Maximum total time to keep trying before it gives up.</small>
                            </div>
                            <div class="col-12 col-md-6 form-group">
                                <label>Max Concurrent Orders / Driver</label>
                                <input type="number" min="0" class="form-control" v-model.number="module.max_concurrent_orders">
                                <small class="text-muted">Stop offering new orders to a driver already this busy. Set 0 for unlimited (no restriction).</small>
                            </div>
                            <div class="col-12 col-md-6 form-group">
                                <label>Location Staleness (minutes)</label>
                                <input type="number" min="1" class="form-control" v-model.number="module.location_staleness_minutes">
                                <small class="text-muted">Ignore a driver's location if it hasn't updated in this long.</small>
                            </div>
                        </div>

                        <div class="d-flex justify-content-end border-top pt-3 mt-2">
                            <b-button v-if="$can('seller_delivery_boys')" variant="primary" :disabled="isSaving" @click="saveModule">
                                {{ __('update') }}
                                <b-spinner v-if="isSaving" small></b-spinner>
                            </b-button>
                        </div>
                    </div>
                </div>
                
                -->

                <div class="card mt-3" v-if="!isLoading && module">
                    <div class="card-header">
                        <h4 class="card-title float-none">{{ tr('seller_own_drivers', 'Seller Delivery Boys') }}</h4>
                        <p class="text-muted small mb-0 mt-1">{{ tr('seller_own_drivers_desc', 'Decide whether sellers can deliver orders with their own delivery boys.') }}</p>
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-12 col-md-8 form-group">
                                <div class="form-check form-switch">
                                    <input class="form-check-input" type="checkbox" v-model="module.allow_seller_own_drivers" id="allow_seller_own_drivers">
                                    <label class="form-check-label ms-2" for="allow_seller_own_drivers">Allow Sellers' Own Drivers</label>
                                </div>
                                <small class="text-muted">When on, sellers whose "Who Delivers Their Orders" is set to Own Delivery Boys use their own drivers. When off, every seller uses the admin's drivers.</small>
                            </div>
                        </div>
                        <div class="d-flex justify-content-end border-top pt-3 mt-2">
                            <b-button v-if="$can('seller_delivery_boys')" variant="primary" :disabled="isSavingSellerDrivers" @click="saveSellerOwnDrivers">
                                {{ __('update') }}
                                <b-spinner v-if="isSavingSellerDrivers" small></b-spinner>
                            </b-button>
                        </div>
                    </div>
                </div>

                <div v-if="!isLoading && !module" class="alert alert-warning">
                    Could not load settings for the currently selected module.
                </div>
            </section>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    data: function () {
        return {
            module: null,
            isLoading: false,
            isSaving: false,
            isSavingSellerDrivers: false,
        }
    },
    created: function () {
        this.getModule();
    },
    methods: {
        tr(key, fallback) { const v = this.__(key); return v && v !== key ? v : fallback; },
        activeModuleId() {
            return Number(localStorage.getItem('active_module_id')) || 1;
        },
        getModule() {
            this.isLoading = true;
            axios.get(this.$apiUrl + '/module_delivery_settings', {
                params: { module_id: this.activeModuleId() }
            }).then((response) => {
                const data = response.data.data;
                this.module = Array.isArray(data) && data.length ? data[0] : null;
                this.isLoading = false;
            }).catch(() => {
                this.isLoading = false;
            });
        },
        saveSellerOwnDrivers() {
            this.isSavingSellerDrivers = true;
            let formData = new FormData();
            formData.append('allow_seller_own_drivers', this.module.allow_seller_own_drivers ? 1 : 0);
            axios.post(this.$apiUrl + '/module_delivery_settings/save_seller_own_drivers', formData).then((res) => {
                if (res.data.status === 1) {
                    this.showMessage("success", res.data.message);
                } else {
                    this.showError(res.data.message);
                }
                this.isSavingSellerDrivers = false;
            }).catch((error) => {
                this.showError((error.request && error.request.statusText) || error.message || this.__('something_went_wrong'));
                this.isSavingSellerDrivers = false;
            });
        },
        saveModule() {
            this.isSaving = true;
            let formData = new FormData();
            for (let key in this.module) {
                if (key === 'module_name' || key === 'allow_seller_own_drivers') continue;
                let value = this.module[key];
                formData.append(key, value === true ? 1 : value === false ? 0 : value);
            }

            axios.post(this.$apiUrl + '/module_delivery_settings/save', formData).then((res) => {
                if (res.data.status === 1) {
                    this.showMessage("success", res.data.message);
                } else {
                    this.showError(res.data.message);
                }
                this.isSaving = false;
            }).catch((error) => {
                if (error.request && error.request.statusText) {
                    this.showError(error.request.statusText);
                } else if (error.message) {
                    this.showError(error.message);
                } else {
                    this.showError(this.__('something_went_wrong'));
                }
                this.isSaving = false;
            });
        },
    },
}
</script>
