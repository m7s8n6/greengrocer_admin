<template>
    <b-modal :key="id" ref="my-modal" :title="modal_title" @hidden="$emit('modalClose')" scrollable no-close-on-backdrop
        no-fade static size="lg">
        <div slot="modal-footer" class="d-flex justify-content-end flex-wrap gap-2 w-100">
            <b-button variant="outline-secondary" @click="hideModal">{{ __('cancel') }}</b-button>
            <b-button variant="primary" @click="$refs['dummy_submit'].click()" :disabled="isLoading">{{ __('save') }}
                <b-spinner v-if="isLoading" small label="Spinning"></b-spinner>
            </b-button>
        </div>

        <form ref="my-form" @submit.prevent="saveRecord" novalidate>

            <!-- Language Tabs -->
            <b-tabs :key="tabsKey" v-if="languages.length" v-model="activeTab" content-class="mt-3">
                <b-tab v-for="lang in languages" :key="lang.id" :title="lang.name" :active="lang.is_default == 1">

                    <div class="row align-items-end">
                        <div class="form-group col-md-6">
                            <label class="d-block mb-2">{{ __('name') }} <i class="text-danger" v-if="lang.is_default">*</i></label>
                            <input type="text" class="form-control" v-model="form[lang.id].name"
                                :placeholder="__('name')" :required="lang.is_default ? true : undefined">
                        </div>
                        <div class="form-group col-md-6">
                            <label class="d-block mb-2">{{ __('sub_title') || 'Sub title' }}</label>
                            <input type="text" class="form-control" v-model="form[lang.id].sub_title"
                                :placeholder="__('sub_title') || 'Sub title'">
                        </div>
                    </div>

                    <!-- Group behaviour (not translatable; applies once to the whole group) -->
                    <div class="row align-items-end" v-if="lang.is_default">
                        <div class="form-group col-md-6">
                            <label class="d-block mb-2">{{ __('type') || 'Type' }} <i class="text-danger">*</i></label>
                            <b-form-radio-group v-model="type" :options="[
                                { text: __('free') || 'Free', value: 'free' },
                                { text: __('paid') || 'Paid', value: 'paid' },
                            ]" buttons button-variant="outline-primary"></b-form-radio-group>
                        </div>
                        <div class="form-group col-md-6">
                            <label class="d-block mb-2">{{ __('selection_type') || 'Selection Type' }}</label>
                            <b-form-radio-group v-model="selection_type" :options="[
                                { text: __('single') || 'Single', value: 'single' },
                                { text: __('multiple') || 'Multiple', value: 'multiple' },
                            ]" buttons button-variant="outline-primary"></b-form-radio-group>
                        </div>
                        <!-- Required toggle hidden per request - is_required stays fully wired
                             (data/validation/save) in case it's needed again later.
                        <div class="form-group col-md-6">
                            <label>{{ __('required') || 'Required' }}</label>
                            <div class="form-check form-switch">
                                <input class="form-check-input" type="checkbox" id="addon-group-required"
                                    style="cursor: pointer" :true-value="true" :false-value="false"
                                    v-model="is_required">
                                <label class="form-check-label" for="addon-group-required" style="cursor: pointer">
                                    {{ is_required ? (__('yes') || 'Yes') : (__('no') || 'No') }}
                                </label>
                            </div>
                        </div>
                        -->
                    </div>

                    <div class="row" v-if="lang.is_default && selection_type === 'multiple'">
                        <div class="form-group col-md-6">
                            <label>{{ __('max_select') || 'Max Select' }}</label>
                            <input type="number" min="0" class="form-control" v-model.number="max_select">
                            <small class="text-muted">{{ __('keep_zero_for_unlimited_selection') || 'Keep zero for unlimited selection' }}</small>
                        </div>
                    </div>

                    <div class="form-group" v-if="id && lang.is_default">
                        <label class="d-block">{{ __('status') }}</label>
                        <div class="text-left mt-1">
                            <b-form-radio-group v-model="status" :options="[
                                { text: __('deactivate'), value: 0 },
                                { text: __('activate'), value: 1 },
                            ]" buttons button-variant="outline-primary"></b-form-radio-group>
                        </div>
                    </div>

                    <hr class="addon-divider">

                    <!-- Options: price/type/add/remove only managed on the default language tab;
                         every other tab just translates the name of each already-added option. -->
                    <div class="d-flex justify-content-between align-items-center mb-2">
                        <label class="mb-0 addon-options-title">{{ __('options') || 'Options' }}</label>
                        <b-button v-if="lang.is_default" size="sm" variant="outline-primary" @click="addOption">
                            <i class="fa fa-plus"></i> {{ __('add_option') || 'Add Option' }}
                        </b-button>
                    </div>

                    <div v-for="(option, index) in options" :key="option._key"
                        class="addon-option-row d-flex gap-2 align-items-center mb-2">
                        <input type="text" class="form-control addon-option-name" v-model="option.form[lang.id].name"
                            :placeholder="__('option_name') || 'Option name (e.g. Extra Cheese)'"
                            :required="lang.is_default ? true : undefined">

                        <template v-if="lang.is_default">
                            <input v-if="type === 'paid'" type="number" min="0.01" step="0.01"
                                class="form-control addon-option-price" v-model.number="option.price"
                                :placeholder="__('price') || 'Price'" required>
                            <input v-if="type === 'paid'" type="number" min="0" step="0.01" :max="option.price"
                                class="form-control addon-option-price addon-option-discount" v-model.number="option.discounted_price"
                                :placeholder="__('discounted_price') || 'Discounted Price'">
                            <b-button size="sm" variant="outline-danger" @click="removeOption(index)"
                                :disabled="options.length === 1">
                                <i class="fa fa-trash"></i>
                            </b-button>
                        </template>
                    </div>

                </b-tab>
            </b-tabs>

            <button ref="dummy_submit" style="display:none;"></button>

        </form>
    </b-modal>
</template>

<script>
export default {
    props: ['record'],
    data: function () {
        return {
            id: null,
            type: 'free',
            selection_type: 'single',
            is_required: false,
            max_select: 0,
            status: 1,
            options: [],
            languages: [],
            defaultLanguageId: null,
            activeTab: 0,
            form: {},
            tabsKey: 0,
            isLoading: false,
            optionKeySeed: 1,
        };
    },
    watch: {
        record: {
            immediate: true,
            deep: true,
            handler(newVal) {
                if (newVal && newVal.id) {
                    this.id = newVal.id;
                    this.resetForm();
                    if (this.languages.length > 0) {
                        this.loadGroupWithTranslations();
                    }
                } else {
                    this.id = null;
                    this.resetForm();
                }
            }
        }
    },
    computed: {
        modal_title: function () {
            return this.id ? (__('edit_addon_group') || 'Edit Addon Group') : (__('add_addon_group') || 'Add Addon Group');
        },
        apiBase: function () {
            return this.isSeller ? '/seller/addons' : '/products/addons';
        },
        isSeller: function () {
            return this.$route && this.$route.path.startsWith('/seller');
        },
    },
    methods: {
        blankTranslationForm() {
            const form = {};
            this.languages.forEach(lang => {
                form[lang.id] = { name: '' };
            });
            return form;
        },
        blankOption() {
            return { id: null, price: null, discounted_price: null, _key: this.optionKeySeed++, form: this.blankTranslationForm() };
        },
        resetForm() {
            this.type = 'free';
            this.selection_type = 'single';
            this.is_required = false;
            this.max_select = 0;
            this.status = 1;
            this.activeTab = 0;
            this.form = this.blankTranslationForm();
            this.languages.forEach(lang => {
                this.form[lang.id].sub_title = '';
            });
            this.options = [this.blankOption()];
        },
        showModal() {
            this.$refs['my-modal'].show();
        },
        hideModal() {
            this.$refs['my-modal'].hide();
        },
        addOption() {
            this.options.push(this.blankOption());
        },
        removeOption(index) {
            if (this.options.length > 1) {
                this.options.splice(index, 1);
            }
        },
        switchToDefaultLanguageTab() {
            const defaultLangIndex = this.languages.findIndex(lang => lang.id === this.defaultLanguageId);
            if (defaultLangIndex !== -1) {
                this.activeTab = defaultLangIndex;
            }
        },
        fetchActiveLanguages() {
            return axios.get(this.$apiUrl + '/active_languages')
                .then(res => {
                    this.languages = res.data.data;

                    const defaultLang = this.languages.find(l => l.is_default);
                    this.defaultLanguageId = defaultLang?.id || null;

                    this.resetForm();

                    if (this.id) {
                        return this.loadGroupWithTranslations();
                    }
                });
        },
        loadGroupWithTranslations() {
            if (!this.id) return;

            if (!this.languages.length) {
                return this.fetchActiveLanguages();
            }

            return axios.get(this.$apiUrl + this.apiBase, { params: { id: this.id } }).then(res => {
                const group = Array.isArray(res.data.data) ? res.data.data[0] : res.data.data;

                if (!group) {
                    console.error('Addon group not found');
                    return;
                }

                this.type = group.type || 'free';
                this.selection_type = group.selection_type;
                this.is_required = !!group.is_required;
                this.max_select = group.max_select;
                this.status = group.status;

                this.languages.forEach(lang => {
                    const translation = Array.isArray(group.translations)
                        ? group.translations.find(t => t.language_id === lang.id)
                        : null;

                    if (lang.is_default) {
                        this.$set(this.form, lang.id, {
                            name: (translation && translation.name && translation.name.trim() !== '')
                                ? translation.name
                                : (group.name || ''),
                            sub_title: (translation && translation.sub_title && translation.sub_title.trim() !== '')
                                ? translation.sub_title
                                : (group.sub_title || ''),
                        });
                    } else {
                        this.$set(this.form, lang.id, {
                            name: (translation && translation.name) ? translation.name : '',
                            sub_title: (translation && translation.sub_title) ? translation.sub_title : '',
                        });
                    }
                });

                const options = Array.isArray(group.options) ? group.options : [];
                this.options = options.length ? options.map(o => {
                    const form = {};
                    this.languages.forEach(lang => {
                        const translation = Array.isArray(o.translations)
                            ? o.translations.find(t => t.language_id === lang.id)
                            : null;

                        if (lang.is_default) {
                            form[lang.id] = {
                                name: (translation && translation.name && translation.name.trim() !== '')
                                    ? translation.name
                                    : (o.name || ''),
                            };
                        } else {
                            form[lang.id] = { name: (translation && translation.name) ? translation.name : '' };
                        }
                    });

                    return { id: o.id, price: o.price, discounted_price: o.discounted_price ?? null, _key: this.optionKeySeed++, form };
                }) : [this.blankOption()];

                this.tabsKey++;
            });
        },
        saveRecord() {
            if (!this.defaultLanguageId) {
                this.showError(__('default_language_not_found'));
                return;
            }

            const defaultName = this.form[this.defaultLanguageId] && this.form[this.defaultLanguageId].name;
            if (!defaultName || !defaultName.trim()) {
                this.showError(__('please_enter_name') || 'Please enter a name');
                this.switchToDefaultLanguageTab();
                return;
            }

            const validOptions = this.options.filter(o => {
                const name = o.form[this.defaultLanguageId] && o.form[this.defaultLanguageId].name;
                return name && name.trim() !== '';
            });
            if (!validOptions.length) {
                this.showError(__('please_add_at_least_one_option') || 'Please add at least one option');
                this.switchToDefaultLanguageTab();
                return;
            }

            const invalidPaidOption = this.type === 'paid' && validOptions.find(o => !(o.price > 0));
            if (invalidPaidOption) {
                this.showError(__('please_enter_price_for_paid_option') || 'Please enter a price for every paid option');
                this.switchToDefaultLanguageTab();
                return;
            }

            const overpricedOption = this.type === 'paid' && validOptions.find(o => o.discounted_price && o.discounted_price > o.price);
            if (overpricedOption) {
                this.showError(__('discounted_price_cannot_be_higher_than_price') || 'Discounted price cannot be higher than price');
                this.switchToDefaultLanguageTab();
                return;
            }

            const samePricedOption = this.type === 'paid' && validOptions.find(o => o.discounted_price && o.discounted_price === o.price);
            if (samePricedOption) {
                this.showError(__('discounted_price_cannot_be_same_as_price') || 'Discounted price cannot be the same as price');
                this.switchToDefaultLanguageTab();
                return;
            }

            this.isLoading = true;

            const translations = {};
            this.languages.forEach(lang => {
                translations[lang.id] = {
                    name: (this.form[lang.id] && this.form[lang.id].name) || '',
                    sub_title: (this.form[lang.id] && this.form[lang.id].sub_title) || '',
                };
            });

            const payload = {
                translations,
                type: this.type,
                selection_type: this.selection_type,
                is_required: this.is_required ? 1 : 0,
                max_select: this.max_select,
                options: validOptions.map(o => {
                    const optionTranslations = {};
                    this.languages.forEach(lang => {
                        optionTranslations[lang.id] = { name: (o.form[lang.id] && o.form[lang.id].name) || '' };
                    });
                    return { id: o.id, price: this.type === 'paid' ? o.price : 0, discounted_price: this.type === 'paid' ? (o.discounted_price || null) : null, translations: optionTranslations };
                }),
            };

            if (this.id) {
                payload.id = this.id;
                payload.status = this.status;
            }

            const url = this.id
                ? this.$apiUrl + this.apiBase + '/update'
                : this.$apiUrl + this.apiBase + '/save';

            axios.post(url, payload)
                .then((res) => {
                    if (res.data.status === false) {
                        throw new Error(res.data.message);
                    }
                    this.$eventBus.$emit('recordSaved', res.data.message || (__('addon_group_saved_successfully') || 'Addon group saved successfully'));
                    this.hideModal();
                })
                .catch((err) => {
                    this.showError(err.response?.data?.message || err.message || __('something_went_wrong'));
                })
                .finally(() => {
                    this.isLoading = false;
                });
        },
    },
    mounted() {
        this.fetchActiveLanguages();
        this.showModal();
    },
};
</script>

<style scoped>
.addon-divider {
    border-top-color: var(--ui-border);
    margin: 8px 0 16px;
}

.addon-options-title {
    font-size: 14px;
    font-weight: 700;
    color: var(--ui-heading);
}

.addon-option-name {
    flex: 1 1 auto;
    min-width: 0;
}

.addon-option-price {
    flex: 0 1 140px;
    min-width: 0;
}

.addon-option-discount {
    flex-basis: 160px;
}

@media (max-width: 575.98px) {
    .addon-option-row {
        flex-wrap: wrap;
        padding-bottom: 8px;
        border-bottom: 1px dashed var(--ui-border);
    }

    .addon-option-name {
        flex-basis: 100%;
    }

    .addon-option-price {
        flex: 1 1 0;
    }
}
</style>
