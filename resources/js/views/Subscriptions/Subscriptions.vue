<template>
    <div>
        <div class="page-heading">
            <div class="page-title d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
                <h3 class="modern-page-title mb-0">{{ __('manage_subscriptions') }}</h3>
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb mb-0">
                        <li class="breadcrumb-item"><router-link to="/dashboard" class="text-muted">{{ __('dashboard') }}</router-link>
                        </li>
                        <li class="breadcrumb-item active text-primary" aria-current="page">{{ __('manage_subscriptions') }}</li>
                    </ol>
                </nav>
            </div>

            <div class="row">
                <div class="col-12 col-md-12 order-md-1 order-last">
                    <div class="card figma-main-section-card">
                        <div class="card-body p-0">
                            <div
                                class="d-flex justify-content-between align-items-center flex-wrap gap-2 figma-action-bar-row">
                                <div class="flex-grow-1">
                                    <div class="figma-search-container">
                                        <i class="fa fa-search text-muted"></i>
                                        <input v-model="filter" type="text" class="figma-search-input"
                                            :placeholder="__('search')" @input="currentPage = 1; getPlans()">
                                    </div>
                                </div>
                                <div class="d-flex align-items-center gap-2 plan-name-editor">
                                        <div class="figma-search-container">
                                            <i class="fa fa-tag"></i>
                                            <input v-model="subscriptionName" type="text" class="figma-search-input"
                                                :placeholder="__('enter_subscription_name')">
                                        </div>
                                        <button class="btn btn-figma-filter plan-name-save"
                                            @click="updateSubscriptionName" :disabled="isUpdatingName" v-b-tooltip.hover
                                            :title="__('update')">
                                            <i class="fa fa-save" v-if="!isUpdatingName"></i>
                                            <i class="fa fa-spinner fa-spin" v-else></i>
                                        </button>
                                </div>
                                <div class="d-flex gap-2 align-items-center flex-wrap">
                                    <button class="btn btn-figma-columns d-flex align-items-center gap-2"
                                        @click="getPlans()" v-b-tooltip.hover :title="__('refresh')">
                                        <i class="fa fa-refresh"></i>
                                        <span>{{ __('refresh') }}</span>
                                    </button>
                                    <button class="btn btn-figma-filter d-flex align-items-center gap-2"
                                        @click="openAddModal" v-b-tooltip.hover v-if="$can('subscription_create')">
                                        <i class="fa fa-plus"></i>
                                        <span>{{ __('add_subscription') }}</span>
                                    </button>
                                </div>
                            </div>

                            <div class="plan-grid">
                                <div v-if="isLoading" class="text-center text-muted py-5">
                                    <b-spinner class="align-middle"></b-spinner>
                                    <strong>{{ __('loading') }}...</strong>
                                </div>
                                <div v-else-if="!translatedPlans.length" class="text-center text-muted py-5">
                                    <i class="fa fa-inbox fa-2x d-block mb-2"></i>{{ __('no_records_to_show') }}
                                </div>
                                <div v-else class="row">
                                    <div class="col-12 col-sm-6 col-xl-4 mb-3"
                                        v-for="row in translatedPlans.map((item, index) => ({ item, index })).sort((a, b) => sortDesc ? b.item.id - a.item.id : a.item.id - b.item.id)"
                                        :key="row.item.id">
                                        <div class="plan-card h-100">
                                            <div class="d-flex justify-content-between align-items-start gap-2">
                                                <div class="min-w-0">
                                                    <div class="plan-name">{{ row.item.name }}</div>
                                                    <div class="plan-id">#{{ row.item.id }}</div>
                                                </div>
                                                <span class='badge bg-success' v-if="row.item.status == 1">{{ __('active') }}</span>
                                                <span class='badge bg-danger' v-if="row.item.status == 0">{{ __('deactive') }}</span>
                                            </div>

                                            <div class="plan-price">
                                                <template v-if="row.item.discounted_price">
                                                    <span class="plan-price-value">{{ $currency }}{{ parseFloat(row.item.discounted_price).toFixed(2) }}</span>
                                                    <span class="plan-price-old">{{ $currency }}{{ parseFloat(row.item.price).toFixed(2) }}</span>
                                                </template>
                                                <span v-else class="plan-price-value">{{ $currency }}{{ parseFloat(row.item.price).toFixed(2) }}</span>
                                                <span class="plan-price-period">/ {{ row.item.days }} {{ __('days') }}</span>
                                            </div>

                                            <ul class="plan-features">
                                                <li>
                                                    <i class="fa fa-calendar"></i>
                                                    <span>{{ __('days') }}</span>
                                                    <strong>{{ row.item.days }}</strong>
                                                </li>
                                                <li>
                                                    <i class="fa fa-truck"></i>
                                                    <span>{{ __('free_delivery_above') }}</span>
                                                    <strong v-if="row.item.free_delivery_above">{{ $currency }}{{ parseFloat(row.item.free_delivery_above).toFixed(2) }}</strong>
                                                    <strong v-else class="text-muted">-</strong>
                                                </li>
                                            </ul>

                                            <div class="plan-actions">
                                                <div class="form-check form-switch plan-status-switch mb-0"
                                                    v-if="$can('subscription_update')" v-b-tooltip.hover
                                                    :title="row.item.status == 1 ? __('active') : __('deactive')">
                                                    <input class="form-check-input" type="checkbox" role="switch"
                                                        :checked="row.item.status == 1"
                                                        @click.prevent="togglePlanStatus(row.item)">
                                                </div>
                                                <button class="figma-action-btn" @click="editPlan(row.item)"
                                                    v-if="$can('subscription_update')" v-b-tooltip.hover
                                                    :title="__('edit')">
                                                    <base-icon name="edit icon" hoverName="edit Hover" width="24"
                                                        height="24" />
                                                </button>
                                                <button class="figma-action-btn figma-delete-btn"
                                                    @click="deletePlan(row.index, row.item.id)"
                                                    v-if="$can('subscription_delete')" v-b-tooltip.hover
                                                    :title="__('delete')">
                                                    <base-icon name="Type=Default" hoverName="Type=Hover" width="24"
                                                        height="24" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="figma-table-footer flex-wrap gap-3">
                                <table-count :current-page="currentPage" :per-page="perPage" :total-rows="totalRows"></table-count>
                                <div class="d-flex align-items-center gap-3">
                                    <b-pagination v-model="currentPage" :total-rows="totalRows" :per-page="perPage"
                                        align="right" class="figma-pagination mb-0" hide-goto-end-buttons hide-ellipsis
                                        prev-text="<" next-text=">"></b-pagination>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Create/Edit Subscription Plan Modal -->
        <b-modal v-model="create_new" :title="form.id ? __('edit_subscription_plan') : __('add_subscription')" size="lg"
            hide-footer @hidden="onModalHidden" no-close-on-backdrop>

            <form @submit.prevent="savePlan" id="subscription-form">

                <b-tabs v-if="languages.length && form.translations && Object.keys(form.translations).length > 0"
                    v-model="activeLanguageTab" content-class="mt-3">

                    <b-tab v-for="language in languages" :key="language.id">
                        <template #title>
                            <span :class="{ 'text-primary font-weight-bold': language.is_default }">
                                {{ language.name }}
                            </span>
                        </template>

                        <!-- Translate buttons -->
                        <div class="mb-3" v-if="language.is_default && languages.length > 1">
                            <b-button size="sm" variant="outline-primary" class="mr-2" @click="translateEmpty(language)"
                                v-b-tooltip.hover
                                :title="__('only_empty_fields_will_be_translated_existing_content_will_not_be_changed')"
                                :disabled="loadingEmpty">
                                <span v-if="!loadingEmpty">{{ __('translate_empty_fields') }}</span>
                                <b-spinner v-else small></b-spinner>
                            </b-button>
                            <b-button size="sm" variant="outline-danger" @click="translateOverwrite(language)"
                                v-b-tooltip.hover
                                :title="__('all_fields_will_be_translated_and_existing_content_will_be_overwritten')"
                                :disabled="loadingOverwrite">
                                <span v-if="!loadingOverwrite">{{ __('translate_and_overwrite') }}</span>
                                <b-spinner v-else small></b-spinner>
                            </b-button>
                            <div v-if="translateSuccessMessage" class="text-success mt-2 font-weight-bold">
                                {{ translateSuccessMessage }}
                            </div>
                        </div>
                        <!-- Translate buttons END -->

                        <!-- PLAN NAME -->
                        <div class="form-group" v-if="form.translations && form.translations[language.id]">
                            <!-- Only default language is logically required (handled in validateDefaultLanguage) -->
                            <label>{{ __('plan_name') }} <i class="text-danger" v-if="language.is_default">*</i></label>

                            <input type="text" class="form-control" :id="'plan_name_' + language.id"
                                v-model="form.translations[language.id].name" :placeholder="__('enter_plan_name')" />
                        </div>

                        <!-- DEFAULT LANGUAGE FIELDS -->
                        <template v-if="language.is_default">

                            <div class="row">
                                <div class="col-md-6 mb-3">
                                    <label for="days" class="d-block">{{ __('days') }} <span class="text-danger">*</span></label>
                                    <input type="number" class="form-control" v-model="form.days" min="1"
                                        :placeholder="__('days')" required />
                                </div>

                                <div class="col-md-6 mb-3">
                                    <label class="d-block">{{ __('status') }} <span class="text-danger">*</span></label>
                                    <b-form-radio-group v-model="form.status" :options="[
                                        { text: __('deactive'), value: 0 },
                                        { text: __('active'), value: 1 }
                                    ]" buttons button-variant="outline-primary d-flex gap-2" required />
                                </div>
                            </div>

                            <div class="row mt-3">
                                <div class="col-md-6">
                                    <label>
                                        {{ __('price') }} ({{ $currency }})
                                    </label>
                                    <input type="number" class="form-control" id="price" v-model="form.price"
                                        :placeholder="__('enter_price')" step="0.01" min="1" required
                                        @input="validateDiscountedPrice">
                                </div>

                                <div class="col-md-6">
                                    <label>
                                        {{ __('discounted_price') }} ({{ $currency }})
                                    </label>
                                    <input type="number" class="form-control"
                                        :class="{ 'is-invalid': discountedPriceError }" v-model="form.discounted_price"
                                        step="0.01" min="1" @input="validateDiscountedPrice"
                                        :placeholder="__('enter_discounted_price')" />
                                    <div v-if="discountedPriceError" class="invalid-feedback">
                                        {{ discountedPriceError }}
                                    </div>
                                </div>
                            </div>

                            <div class="row mt-3">
                                <div class="col-md-6">
                                    <label>
                                        {{ __('free_delivery_above') }} ({{ $currency }})
                                    </label>
                                    <input type="number" class="form-control" id="free_delivery_above"
                                        v-model="form.free_delivery_above"
                                        :placeholder="__('enter_free_delivery_above')" step="0.01" min="0">
                                    <small class="text-muted">{{ __('minimum_order_amount_for_free_delivery') }}</small>
                                </div>

                                <div class="col-md-6">
                                    <label>{{ __('ios_product_id') }}</label>
                                    <input type="text" class="form-control" id="ios_product_id"
                                        v-model="form.ios_product_id" :placeholder="__('enter_ios_product_id')">
                                    <small class="text-muted">{{ __('ios_in_app_purchase_product_id') }}</small>

                                </div>

                                <div class="col-md-12">
                                    <div class="alert alert-success mt-2 mb-3" role="alert">
                                        <small>
                                            <i class="fa fa-info-circle"></i>
                                            <strong>{{ __('note') }}:</strong> {{
                                                __('please_configure_free_delivery_settings_properly') }}
                                            {{ __('to_avoid_conflicts_with_time_slots') }}.
                                            <router-link to="/delivery_settings" class="alert-link">
                                                {{ __('configure_delivery_settings') }} <i
                                                    class="fa fa-external-link-alt"></i>
                                            </router-link>
                                        </small>
                                    </div>
                                </div>
                            </div>

                        </template>
                    </b-tab>
                </b-tabs>

                <div class="d-flex justify-content-end gap-2 pt-3 mt-2 border-top modal-form-actions">

                    <button type="button" class="btn btn-outline-secondary" @click="closeModal">
                        {{ __('cancel') }}
                    </button>


                    <button type="submit" class="btn btn-primary" :disabled="isSubmitting" @click="savePlan">
                        <span v-if="isSubmitting">{{ __('saving') }}...</span>
                        <span v-else>{{ __('save') }}</span>
                    </button>


                </div>

            </form>
        </b-modal>

    </div>
</template>

<script>
import axios from 'axios';
import TranslationHelper from '../../mixins/TranslationHelper.js';

export default {
    mixins: [TranslationHelper],
    name: 'Subscriptions',
    data() {
        return {
            plans: [],

            languages: [],
            currentLanguageId: null,
            activeLanguageTab: 0,
            isLoadingLanguages: false,
            isLoadingData: false,

            create_new: false,
            edit_record: {},
            form: {
                id: null,
                translations: {},
                days: '',
                price: '',
                discounted_price: '',
                free_delivery_above: '',
                ios_product_id: '',
                status: 1
            },
            isLoading: false,
            isSubmitting: false,
            isUpdatingName: false,
            subscriptionName: '',
            discountedPriceError: '',
            filter: '',
            filterOn: ['id', 'name', 'days', 'price', 'discounted_price', 'free_delivery_above', 'status'],
            sortBy: 'id',
            sortDesc: true,
            sortDirection: 'desc',
            perPage: 10,
            currentPage: 1,
            totalRows: 0,
            pageOptions: [5, 10, 15, 20, 25, 50, 100],

            translatableFields: ['name'],
            translateSuccessMessage: '',
            loadingEmpty: false,
            loadingOverwrite: false,
        }
    },
    async mounted() {
        await this.fetchActiveLanguages();
        this.getPlans();
    },
    computed: {
        defaultLanguageId() {
            const d = this.languages.find(l => l.is_default === 1);
            return d ? d.id : null;
        },
        pageStart() {
            if (this.totalRows === 0) return 0;
            return (this.currentPage - 1) * this.perPage + 1;
        },
        pageEnd() {
            return Math.min(this.currentPage * this.perPage, this.totalRows);
        },
        translations() {
            return this.form.translations || {};
        },
        fields() {
            const c = this.$currency || '';
            return [
                { key: 'id', label: __('id'), sortable: true },
                { key: 'name', label: __('plan_name') },
                { key: 'days', label: __('days') },
                { key: 'price', label: __('price') + ` (${c})` },
                { key: 'discounted_price', label: __('discounted_price') + ` (${c})` },
                { key: 'free_delivery_above', label: __('free_delivery_above') + ` (${c})` },
                { key: 'status', label: __('status') },
                { key: 'actions', label: __('actions') }
            ];
        },
        translatedPlans() {
            if (!this.currentLanguageId) return this.plans;

            return this.plans.map(plan => {
                const translated = { ...plan };

                if (Array.isArray(plan.translations)) {
                    const t = plan.translations.find(
                        tr => tr.language_id === this.currentLanguageId
                    );

                    if (t?.name?.trim()) {
                        translated.name = t.name;
                    }
                }

                return translated;
            });
        }
    },

    methods: {

        loadPlanWithTranslations() {
            this.isLoadingData = true;

            return axios.get(this.$apiUrl + '/subscription_plans', {
                params: {
                    id: this.id
                }
            })
                .then(response => {
                    if (!response.data.data) {
                        this.isLoadingData = false;
                        return;
                    }

                    // API may return array or single object
                    const plans = Array.isArray(response.data.data)
                        ? response.data.data
                        : [response.data.data];

                    const plan = plans.length > 0 ? plans[0] : null;

                    if (!plan) {
                        console.error('Subscription plan not found in response');
                        this.isLoadingData = false;
                        return;
                    }


                    this.form.id = plan.id;
                    this.form.days = plan.days;
                    this.form.price = plan.price;
                    this.form.discounted_price = plan.discounted_price;
                    this.form.free_delivery_above = plan.free_delivery_above;
                    this.form.status = plan.status;

                    /* ----------- TRANSLATIONS MERGE ------------ */
                    const updatedTranslations = { ...this.form.translations };

                    // Load translation table data
                    if (plan.translations && Array.isArray(plan.translations)) {
                        plan.translations.forEach(trans => {
                            const langId = trans.language_id;
                            updatedTranslations[langId] = {
                                language_id: langId,
                                name: trans.name || ''
                            };
                        });
                    }

                    this.languages.forEach(language => {
                        if (
                            !updatedTranslations[language.id] ||
                            !updatedTranslations[language.id].name
                        ) {
                            if (language.is_default) {
                                updatedTranslations[language.id] = {
                                    language_id: language.id,
                                    name: plan.name || ''
                                };
                            }
                        }
                    });

                    this.form.translations = updatedTranslations;

                    this.isLoadingData = false;
                })
                .catch(error => {
                    console.error('Error loading subscription plan translations:', error);
                    this.isLoadingData = false;
                    throw error;
                });
        },

        validateDefaultLanguage() {
            const def = this.languages.find(l => l.is_default);
            if (!def) return true;

            const t = this.form.translations?.[def.id];
            if (!t || !t.name || !t.name.trim()) {
                this.showError(__('please_fill_default_language_required_fields'));
                this.activeLanguageTab = this.languages.findIndex(l => l.id === def.id);
                return false;
            }
            return true;
        },

        fetchActiveLanguages() {
            this.isLoadingLanguages = true;

            return axios.get(this.$apiUrl + '/active_languages')
                .then(res => {
                    this.languages = res.data.data || [];

                    const appLocale = window.appLocale || 'en';
                    const current =
                        this.languages.find(l => l.code === appLocale) ||
                        this.languages.find(l => l.is_default);

                    this.currentLanguageId = current?.id || null;
                })
                .finally(() => {
                    this.isLoadingLanguages = false;
                });
        },


        initializeTranslations(existing = [], base = null) {
            const map = {};

            this.languages.forEach(lang => {
                const found = existing.find(
                    t => t.language_id === lang.id
                );

                map[lang.id] = {
                    language_id: lang.id,
                    name:
                        found?.name ??
                        (lang.is_default ? base?.name : '') ??
                        ''
                };
            });

            this.form.translations = map;
        },

        // Get all subscription plans
        async getPlans() {
            this.isLoading = true;
            try {
                const params = {
                    limit: this.perPage,
                    offset: (this.currentPage - 1) * this.perPage,
                    search: this.filter
                };

                const response = await axios.get(this.$apiUrl + '/subscription_plans/', { params });
                if (response.data.status === 1) {
                    // Check if response has plans array or object with plans property
                    if (Array.isArray(response.data.data)) {
                        this.plans = response.data.data;
                        this.totalRows = response.data.total || response.data.data.length;
                    } else if (response.data.data && response.data.data.plans) {
                        // New format with plans and subscription_name
                        this.plans = response.data.data.plans;
                        this.totalRows = response.data.total || response.data.data.plans.length;
                        // Set subscription name if available
                        if (response.data.data.subscription_name !== undefined) {
                            this.subscriptionName = response.data.data.subscription_name || '';
                        }
                    } else {
                        this.plans = [];
                        this.totalRows = 0;
                    }
                } else {
                    this.showError(response.data.message);
                }
            } catch (error) {
                this.showError(__('something_went_wrong'));
            } finally {
                this.isLoading = false;
            }
        },

        // Validate discounted price
        validateDiscountedPrice() {
            this.discountedPriceError = '';

            // Only validate if both price and discounted_price are provided
            if (this.form.discounted_price && this.form.price) {
                const discountedPrice = parseFloat(this.form.discounted_price);
                const regularPrice = parseFloat(this.form.price);

                // Check if discounted price is less than regular price
                if (discountedPrice >= regularPrice) {
                    this.discountedPriceError = __('discounted_price_must_be_less_than_regular_price');
                    return false;
                }

                // Check if discounted price is negative
                if (discountedPrice < 0) {
                    this.discountedPriceError = __('discounted_price_cannot_be_negative');
                    return false;
                }
            }

            return true;
        },

        async checkFreeDeliveryTimeSlots() {
            try {
                const response = await axios.get(this.$apiUrl + '/subscription_plans/check_free_delivery_time_slots');
                if (response.data.status === 1) {
                    return response.data.data.has_free_delivery_time_slots;
                }
                return false;
            } catch (error) {
                console.error('Error checking free delivery time slots:', error);
                return false;
            }
        },

        // Save or update subscription plan
        async savePlan(event) {
            const form = event.target;

            // Validate discounted price before form submission
            if (!this.validateDiscountedPrice()) {
                // Focus on discounted price field if validation fails
                this.$nextTick(() => {
                    const discountedPriceInput = document.getElementById('discounted_price');
                    if (discountedPriceInput) {
                        discountedPriceInput.focus();
                        discountedPriceInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                });
                return;
            }

            // Check HTML5 form validation
            if (!form.checkValidity()) {
                form.reportValidity();
                return;
            }

            if (!this.validateDefaultLanguage()) return;
            this.isSubmitting = true;
            const payload = {
                days: this.form.days,
                price: this.form.price,
                discounted_price: this.form.discounted_price || null,
                free_delivery_above: this.form.free_delivery_above || null,
                ios_product_id: this.form.ios_product_id || null,
                status: this.form.status,
                translations: Object.values(this.form.translations)
            };

            let url = this.$apiUrl + '/subscription_plans/save';
            if (this.form.id) {
                url = this.$apiUrl + '/subscription_plans/update/' + this.form.id;
            }

            this.isSubmitting = true;

            axios.post(url, payload)
                .then(res => {
                    if (res.data.status === 1) {
                        this.showMessage('success', res.data.message);
                        this.create_new = false;
                        this.getPlans();
                    } else {
                        this.showError(res.data.message);
                    }
                })
                .finally(() => {
                    this.isSubmitting = false;
                });
        },

        // Active / deactive switch on the card. Turning a plan ON is blocked while free-delivery time
        // slots exist (same rule as creating / editing a plan); turning it OFF is always allowed.
        async togglePlanStatus(plan) {
            const newStatus = plan.status == 1 ? 0 : 1;

            if (newStatus === 1 && await this.checkFreeDeliveryTimeSlots()) {
                this.$swal.fire({
                    title: __('cannot_create_subscription_plan'),
                    html: `
                        <div class="text-left">
                            <p>${__('free_delivery_time_slots_exist_message')}</p>
                            <p class="mt-3"><strong>${__('please_remove_free_delivery_time_slots_first')}</strong></p>
                        </div>
                    `,
                    icon: 'warning',
                    confirmButtonText: __('ok'),
                    confirmButtonColor: 'var(--theme-primary-500)',
                    width: '600px'
                });
                return;
            }

            // Same API and payload as the edit form's Save (subscription_plans/update/{id}); only the
            // status differs, everything else is the plan's current data.
            const payload = {
                days: plan.days,
                price: plan.price,
                discounted_price: plan.discounted_price || null,
                free_delivery_above: plan.free_delivery_above || null,
                ios_product_id: plan.ios_product_id || null,
                status: newStatus,
                translations: (plan.translations || []).map(t => ({ language_id: t.language_id, name: t.name || '' }))
            };

            this.isLoading = true;
            axios.post(this.$apiUrl + `/subscription_plans/update/${plan.id}`, payload)
                .then((response) => {
                    if (response.data.status === 1) {
                        this.showMessage('success', response.data.message);
                        this.getPlans();
                    } else {
                        this.isLoading = false;
                        this.showError(response.data.message);
                    }
                })
                .catch(() => {
                    this.isLoading = false;
                    this.showError(__('something_went_wrong'));
                });
        },

        // Edit plan - populate form with plan data and check for conflicts
        async editPlan(plan) {
            this.activeLanguageTab = 0;

            // Check for free delivery time slots before opening edit modal
            const hasFreeDeliveryTimeSlots = await this.checkFreeDeliveryTimeSlots();
            if (hasFreeDeliveryTimeSlots) {
                this.$swal.fire({
                    title: __('cannot_create_subscription_plan'),
                    html: `
                        <div class="text-left">
                            <p>${__('free_delivery_time_slots_exist_message')}</p>
                            <p class="mt-3">
                                <strong>${__('please_remove_free_delivery_time_slots_first')}</strong>
                            </p>
                            <p class="mt-3">
                                <a href="/delivery_settings" class="btn btn-primary btn-sm">
                                    ${__('go_to_delivery_settings')} <i class="fa fa-external-link-alt"></i>
                                </a>
                            </p>
                        </div>
                    `,
                    icon: 'warning',
                    confirmButtonText: __('ok'),
                    confirmButtonColor: 'var(--theme-primary-500)',
                    width: '600px'
                });
                return;
            }

            this.resetForm();

            await this.fetchActiveLanguages();

            this.form.id = plan.id;
            this.form.days = plan.days;
            this.form.price = plan.price;
            this.form.discounted_price = plan.discounted_price;
            this.form.free_delivery_above = plan.free_delivery_above;
            this.form.ios_product_id = plan.ios_product_id;
            this.form.status = plan.status;

            const map = {};
            this.languages.forEach(l => {
                map[l.id] = { language_id: l.id, name: '' };
            });

            if (Array.isArray(plan.translations)) {
                plan.translations.forEach(t => {
                    if (map[t.language_id]) {
                        map[t.language_id].name = t.name || '';
                    }
                });
            }

            const def = this.languages.find(l => l.is_default);
            if (def && !map[def.id].name) {
                map[def.id].name = plan.name || '';
            }

            this.form.translations = map;
            this.activeLanguageTab = 0;
            this.create_new = true;
        },

        // Delete subscription plan
        async deletePlan(index, id) {
            this.$swal.fire({
                title: __('are_you_sure'),
                text: __('you_want_be_able_to_revert_this'),
                confirmButtonText: __('yes_sure'),
                cancelButtonText: __('cancel'),
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: 'var(--theme-primary-500)',
                cancelButtonColor: 'var(--theme-error-500)',
            }).then(result => {
                if (result.value) {
                    this.isLoading = true;
                    axios.post(this.$apiUrl + `/subscription_plans/delete/${id}`)
                        .then((response) => {
                            this.isLoading = false;
                            if (response.data.status === 1) {
                                this.showMessage('success', response.data.message);
                                this.getPlans();
                            } else {
                                this.showError(response.data.message);
                            }
                        })
                        .catch(error => {
                            this.isLoading = false;
                            this.showError(__('something_went_wrong'));
                        });
                }
            });
        },

        // Reset form to default values
        resetForm() {
            this.form = {
                id: null,
                days: '',
                price: '',
                discounted_price: '',
                free_delivery_above: '',
                ios_product_id: '',
                status: 1,
                translations: {}
            };

            this.discountedPriceError = '';
            this.activeLanguageTab = 0;
        },

        closeModal() {
            this.create_new = false;

        },

        onModalHidden() {
            this.resetForm();
        },

        async openAddModal() {
            this.activeLanguageTab = 0;

            // Check for free delivery time slots before opening the modal
            const hasFreeDeliveryTimeSlots = await this.checkFreeDeliveryTimeSlots();
            if (hasFreeDeliveryTimeSlots) {
                this.$swal.fire({
                    title: __('cannot_create_subscription_plan'),
                    html: `
                        <div class="text-left">
                            <p>${__('free_delivery_time_slots_exist_message')}</p>
                            <p class="mt-3">
                                <strong>${__('please_remove_free_delivery_time_slots_first')}</strong>
                            </p>
                                <p class="mt-3">
                                    <a href="/delivery_settings" class="btn btn-primary btn-sm">
                                        ${__('go_to_delivery_settings')} <i class="fa fa-external-link-alt"></i>
                                    </a>
                                </p>
                        </div>
                    `,
                    icon: 'warning',
                    confirmButtonText: __('ok'),
                    confirmButtonColor: 'var(--theme-primary-500)',
                    width: '600px'
                });
                return;
            }

            // If no conflicts, proceed to open the modal
            this.resetForm();

            await this.fetchActiveLanguages();
            this.initializeTranslations([], null);
            this.activeLanguageTab = 0;
            this.create_new = true;

        },

        // Update subscription name in settings
        async updateSubscriptionName() {
            if (!this.subscriptionName || this.subscriptionName.trim() === '') {
                this.showError(__('subscription_name_cannot_be_empty'));
                return;
            }

            this.isUpdatingName = true;
            try {
                const response = await axios.post(this.$apiUrl + '/subscription_plans/update_setting', {
                    subscription_name: this.subscriptionName.trim()
                });

                if (response.data.status === 1) {
                    this.showMessage("success", response.data.message);
                } else {
                    this.showError(response.data.message);
                }
            } catch (error) {
                this.showError(__('something_went_wrong'));
            } finally {
                this.isUpdatingName = false;
            }
        }
    },
    watch: {
        // Watch for pagination changes
        currentPage() {
            this.getPlans();
        },

        // Watch for per page changes
        perPage() {
            this.currentPage = 1; // Reset to first page when changing per page
            this.getPlans();
        }
    }
}
</script>

<style scoped>
/* Subscription name editor in the toolbar */
.plan-name-editor .figma-search-container {
    width: 220px;
}

.plan-name-save {
    width: 38px;
    padding: 0 !important;
    justify-content: center;
}

/* Plan cards */
.plan-grid {
    padding: 20px 20px 4px;
}

.plan-status-switch {
    margin-right: auto;
}

.plan-status-switch .form-check-input {
    cursor: pointer;
    margin-top: 0;
}

.plan-card {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 14px;
    padding: 18px;
    background: var(--ui-surface);
    border: 1px solid var(--ui-border);
    border-radius: var(--ui-radius-lg);
    box-shadow: var(--ui-shadow);
    transition: border-color 0.15s ease, box-shadow 0.15s ease;
}

.plan-card:hover {
    border-color: var(--theme-primary-300);
    box-shadow: var(--ui-shadow-lg);
}

.plan-card .min-w-0 {
    min-width: 0;
}

.plan-name {
    font-size: 16px;
    font-weight: 700;
    color: var(--ui-heading);
    word-break: break-word;
}

.plan-id {
    font-size: 12px;
    color: var(--ui-text-subtle);
}

.plan-price {
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    gap: 6px;
    padding: 12px 14px;
    background: var(--ui-primary-soft);
    border-radius: var(--ui-radius);
}

.plan-price-value {
    font-size: 22px;
    font-weight: 700;
    line-height: 1.1;
    color: var(--theme-primary-700);
}

.plan-price-old {
    font-size: 13px;
    color: var(--ui-text-subtle);
    text-decoration: line-through;
}

.plan-price-period {
    font-size: 13px;
    color: var(--ui-text-muted);
}

.plan-features {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.plan-features li {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 13px;
    color: var(--ui-text-muted);
}

.plan-features li i {
    width: 16px;
    text-align: center;
    color: var(--theme-primary-500);
}

.plan-features li strong {
    margin-left: auto;
    font-weight: 600;
    color: var(--ui-text);
}

.plan-actions {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 8px;
    margin-top: auto;
    padding-top: 12px;
    border-top: 1px solid var(--ui-border);
}

.modal-form-actions {
    border-color: var(--ui-border) !important;
}

@media (max-width: 575.98px) {
    .plan-grid {
        padding: 16px 16px 0;
    }

    /* the toolbar's phone grid rule treats this group as buttons (it holds one); keep it a row:
       name box fills the width, save button stays a 38px square */
    .figma-action-bar-row > .plan-name-editor {
        display: flex !important;
        width: 100%;
        overflow: visible;
    }

    .plan-name-editor .plan-name-save {
        flex: 0 0 38px;
        width: 38px;
        min-width: 38px !important;
    }

    .plan-name-editor .figma-search-container {
        flex: 1 1 auto;
        width: auto;
    }
}
</style>
