<template>
    <div>
        <div class="page-heading">
            <div class="page-title mb-3 d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-2">
                <h3 class="modern-page-title mb-0">{{ __('custom_fields') }}</h3>
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb mb-0">
                        <li class="breadcrumb-item">
                            <router-link to="/dashboard" class="text-muted">{{ __('dashboard') }}</router-link>
                        </li>
                        <li class="breadcrumb-item active text-primary" aria-current="page">{{ __('custom_fields') }}</li>
                    </ol>
                </nav>
            </div>

            <section class="section">
                <div class="figma-main-section-card">
                    <div class="card-body p-0">
                        <b-tabs v-if="!isSeller" v-model="activeTab" class="px-3 pt-2 custom-fields-tabs">
                            <b-tab>
                                <template #title>
                                    {{ __('sellers') }}
                                    <i class="fa fa-info-circle ml-1" v-b-tooltip.hover
                                        :title="__('module_wise_custom_fields_tooltip')"></i>
                                </template>
                            </b-tab>
                            <b-tab>
                                <template #title>
                                    {{ __('delivery_boys') }}
                                    <i class="fa fa-info-circle ml-1" v-b-tooltip.hover
                                        :title="__('general_custom_fields_tooltip')"></i>
                                </template>
                            </b-tab>
                            <b-tab>
                                <template #title>
                                    {{ __('customers') }}
                                    <i class="fa fa-info-circle ml-1" v-b-tooltip.hover
                                        :title="__('general_custom_fields_tooltip')"></i>
                                </template>
                            </b-tab>
                            <b-tab>
                                <template #title>
                                    {{ __('products') }}
                                    <i class="fa fa-info-circle ml-1" v-b-tooltip.hover
                                        :title="__('module_wise_custom_fields_tooltip')"></i>
                                </template>
                            </b-tab>
                        </b-tabs>

                        <b-tabs v-else v-model="activeTab" class="px-3 pt-2 custom-fields-tabs">
                            <b-tab :title="__('products')"></b-tab>
                            <b-tab :title="__('delivery_boys')"></b-tab>
                        </b-tabs>

                        <div
                            class="d-flex justify-content-between align-items-center flex-wrap gap-2 figma-action-bar-row">
                            <div class="flex-grow-1">
                                <div class="figma-search-container">
                                    <i class="fa fa-search text-muted"></i>
                                    <input v-model="filter" type="text" class="figma-search-input"
                                        :placeholder="__('search') || 'Search...'" @input="getRecords()">
                                </div>
                            </div>
                            <div class="d-flex gap-2">
                                <button class="btn btn-figma-columns d-flex align-items-center gap-2"
                                    @click="getRecords()" v-b-tooltip.hover :title="__('refresh')">
                                    <i class="fa fa-refresh"></i>
                                    <span>{{ __('refresh') || 'Refresh' }}</span>
                                </button>
                                <button v-if="isSeller || $can('custom_field_create')"
                                    class="btn btn-figma-filter d-flex align-items-center gap-2"
                                    @click="openAddModal">
                                    <i class="fa fa-plus"></i>
                                    <span>{{ __('add_field') }}</span>
                                </button>
                            </div>
                        </div>

                        <b-table :items="translatedCustomFields" :fields="visibleFields" :filter="filter"
                            :filter-included-fields="filterOn" :bordered="false" :busy="isLoading" stacked="md"
                            show-empty :tbody-tr-class="() => 'figma-tr align-middle'" small
                            class="figma-order-table custom-fields-table mb-0">
                            <template #table-busy>
                                <div class="text-center text-muted my-3">
                                    <b-spinner class="align-middle"></b-spinner>
                                    <strong>{{ __('loading') }}...</strong>
                                </div>
                            </template>

                            <template #empty="scope">
                                <div class="text-center text-muted py-4"><i class="fa fa-inbox fa-2x d-block mb-2"></i>{{ scope.emptyText }}</div>
                            </template>
                            <template #emptyfiltered="scope">
                                <div class="text-center text-muted py-4"><i class="fa fa-search fa-2x d-block mb-2"></i>{{ scope.emptyFilteredText }}</div>
                            </template>

                            <template #cell(id)="row">
                                {{ row.item.id }}
                            </template>

                            <template #cell(type)="row">
                                {{ typeLabel(row.item.type) }}
                            </template>

                            <template #cell(is_required)="row">
                                <span v-if="row.item.is_required" class="badge bg-info">{{ __('yes') }}</span>
                                <span v-else class="badge bg-secondary">{{ __('no') }}</span>
                            </template>

                            <template #cell(owner)="row">
                                <span v-if="row.item.is_mine" class="badge bg-secondary">{{ __('mine') || 'Mine' }}</span>
                                <div v-else-if="row.item.seller_id">
                                    <div>{{ row.item.seller ? row.item.seller.name : __('seller') || 'Seller' }}</div>
                                    <small class="text-muted">ID - {{ row.item.seller_id }}</small>
                                </div>
                                <span v-else class="badge bg-success">{{ __('global') || 'Global' }}</span>
                            </template>

                            <template #cell(status)="row">
                                <div class="form-check form-switch">
                                    <input class="form-check-input" type="checkbox"
                                        :disabled="!canEdit(row.item)" :true-value="true"
                                        :false-value="false" v-model="row.item.status"
                                        @change="toggleStatus(row.item)">
                                </div>
                            </template>

                            <template #cell(actions)="row">
                                <div v-if="canEdit(row.item) || canDelete(row.item)" class="d-flex gap-2">
                                    <button v-if="canEdit(row.item)" class="figma-action-btn"
                                        @click="openEditModal(row.item)" v-b-tooltip.hover :title="__('edit')">
                                        <base-icon name="edit icon" hoverName="edit Hover" width="24" height="24" />
                                    </button>
                                    <button v-if="canDelete(row.item)" class="figma-action-btn figma-delete-btn"
                                        @click="deleteRecord(row.item.id)" v-b-tooltip.hover :title="__('delete')">
                                        <base-icon name="Type=Default" hoverName="Type=Hover" width="24" height="24" />
                                    </button>
                                </div>
                                <span v-else class="text-muted small">{{ __('managed_by_admin') || 'Managed by admin' }}</span>
                            </template>
                        </b-table>
                        <div class="figma-table-footer flex-wrap gap-3">
                            <div class="d-flex align-items-center gap-2">
                                <label class="showing-results-text mb-0">{{ __('per_page') }}</label>
                                <b-form-select v-model="perPage" :options="pageOptions" size="sm"
                                    class="w-auto"></b-form-select>
                                <table-count :current-page="currentPage" :per-page="perPage" :total-rows="totalRows"></table-count>
                            </div>
                            <div class="d-flex align-items-center gap-3">
                                <b-pagination v-model="currentPage" :total-rows="totalRows" :per-page="perPage"
                                    align="right" class="figma-pagination mb-0" hide-goto-end-buttons hide-ellipsis
                                    prev-text="<" next-text=">"></b-pagination>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>

        <!-- Add / Edit Modal -->
        <b-modal id="customFieldModal" ref="field-modal" :key="tabsKey"
            :title="isEditing ? __('edit') + ' ' + __('field_name') : __('add_field')" no-close-on-backdrop no-fade
            static scrollable>
            <template #modal-footer>
                <div class="d-flex justify-content-end gap-2 w-100">
                    <b-button variant="outline-secondary" @click="hideModal">{{ __('cancel') }}</b-button>
                    <b-button variant="primary" @click="saveRecord" :disabled="isSaving">
                        {{ __('save') }}
                        <b-spinner v-if="isSaving" small label="Saving"></b-spinner>
                    </b-button>
                </div>
            </template>

            <form @submit.prevent="saveRecord">
                <!-- Language Tabs -->
                <b-tabs v-if="languages.length" v-model="activeFormTab" content-class="mt-3">
                    <b-tab v-for="lang in languages" :key="lang.id" :title="lang.name" :active="lang.is_default == 1">

                        <!-- Translate buttons (field name only) -->
                        <div class="mb-3 d-flex flex-wrap gap-2" v-if="lang.is_default && languages.length > 1">
                            <b-button size="sm" variant="outline-primary" @click="translateEmpty(lang)"
                                v-b-tooltip.hover
                                :title="__('only_empty_fields_will_be_translated_existing_content_will_not_be_changed')"
                                :disabled="loadingEmpty">
                                <span v-if="!loadingEmpty">{{ __('translate_empty_fields') }}</span>
                                <b-spinner v-else small></b-spinner>
                            </b-button>

                            <b-button size="sm" variant="outline-danger" @click="translateOverwrite(lang)"
                                v-b-tooltip.hover
                                :title="__('all_fields_will_be_translated_and_existing_content_will_be_overwritten')"
                                :disabled="loadingOverwrite">
                                <span v-if="!loadingOverwrite">{{ __('translate_and_overwrite') }}</span>
                                <b-spinner v-else small></b-spinner>
                            </b-button>
                        </div>

                        <div class="row">
                        <div class="form-group mb-3" :class="lang.is_default ? 'col-md-6' : 'col-12'">
                            <label class="form-label">{{ __('field_name') }} <span class="text-danger" v-if="lang.is_default">*</span></label>
                            <input type="text" class="form-control" v-model="form[lang.id].name"
                                :placeholder="__('field_name')" :required="lang.is_default ? true : undefined">
                        </div>

                        <!-- Type (not translatable; applies to the whole field) -->
                        <div class="form-group mb-3 col-md-6" v-if="lang.is_default">
                            <label class="form-label">{{ __('field_type') }} <span class="text-danger">*</span></label>
                            <select class="form-control form-select" v-model="type">
                                <option value="text">{{ __('text') }}</option>
                                <option value="number">{{ __('number') }}</option>
                                <option value="dropdown">{{ __('dropdown') }}</option>
                                <option value="file">{{ __('file') }}</option>
                                <option value="textarea">{{ __('textarea') }}</option>
                                <option value="date">{{ __('date') }}</option>
                            </select>
                        </div>
                        </div>

                        <!-- Dropdown options - translatable per language -->
                        <div class="form-group mb-3" v-if="type === 'dropdown'">
                            <label class="form-label">{{ __('options') }} <span class="text-danger" v-if="lang.is_default">*</span></label>
                            <div class="figma-chip-input form-control h-auto d-flex flex-wrap align-items-center gap-1"
                                @click="focusOptionInput(lang.id)">
                                <span class="badge bg-primary d-flex align-items-center gap-1"
                                    v-for="(option, index) in form[lang.id].options" :key="index">
                                    {{ option }}
                                    <i class="fa fa-times chip-remove" @click.stop="removeOption(lang.id, index)"></i>
                                </span>
                                <input type="text" :ref="'optionInput_' + lang.id" class="chip-input-field border-0 flex-grow-1"
                                    v-model="optionInputText[lang.id]"
                                    :placeholder="form[lang.id].options.length ? '' : __('options')"
                                    @keydown.enter.prevent="addOption(lang.id)"
                                    @keydown="handleOptionKeydown($event, lang.id)"
                                    @blur="addOption(lang.id)">
                            </div>
                            <small class="text-muted">{{ __('press_enter_or_comma_to_add_option') || 'Press Enter or comma to add an option.' }}</small>
                        </div>

                        <div class="form-group mb-3" v-if="lang.is_default">
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" id="field_required"
                                    v-model="is_required">
                                <label class="form-check-label" for="field_required">{{ __('required') }}</label>
                            </div>
                        </div>

                        <div class="form-group mb-3" v-if="lang.is_default">
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" id="field_status" v-model="status">
                                <label class="form-check-label" for="field_status">{{ __('active') }}</label>
                            </div>
                        </div>
                    </b-tab>
                </b-tabs>
            </form>
        </b-modal>
    </div>
</template>

<script>
import axios from 'axios';
import TranslationHelper from '../../mixins/TranslationHelper.js';
import Auth from '../../Auth.js';

export default {
    mixins: [TranslationHelper],
    data() {
        return {
            activeTab: 0,
            activeFormTab: 0,
            customFields: [],
            filter: null,
            filterOn: [],
            totalRows: 0,
            currentPage: 1,
            perPage: this.$perPage || 10,
            pageOptions: this.$pageOptions || [5, 10, 15, 20],
            isLoading: false,
            isSaving: false,
            isEditing: false,
            editingId: null,
            type: 'text',
            is_required: false,
            status: true,
            languages: [],
            defaultLanguageId: null,
            currentLanguageId: null,
            form: {},
            optionInputText: {},
            tabsKey: 0,

            // Translate buttons (field name only - dropdown options are not auto-translated)
            translatableFields: ['name'],
            loadingEmpty: false,
            loadingOverwrite: false,

            fields: [
                { key: 'id', label: __('id') },
                { key: 'name', label: __('field_name') },
                { key: 'type', label: __('field_type') },
                { key: 'is_required', label: __('required') },
                { key: 'owner', label: __('owner') || 'Owner' },
                { key: 'status', label: __('status') },
                { key: 'actions', label: __('actions') },
            ],
        };
    },
    computed: {
        module() {
            if (this.isSeller) {
                return this.activeTab === 1 ? 'delivery_boy' : 'product';
            }
            const map = { 0: 'seller', 1: 'delivery_boy', 2: 'customer', 3: 'product' };
            return map[this.activeTab] || 'seller';
        },
        isSeller() {
            return !!(Auth.user && Auth.user.role && Auth.user.role.name === 'Seller' && Auth.user.seller !== null);
        },
        currentSellerId() {
            return this.isSeller ? Auth.user.seller.id : null;
        },
        // Fields shown in the current app locale, falling back to the default-language name/options.
        translatedCustomFields() {
            const list = Array.isArray(this.customFields) ? this.customFields : [];
            if (!this.currentLanguageId || list.length === 0) {
                return list;
            }
            return list.map(field => {
                const translated = { ...field };
                const translation = Array.isArray(field.translations)
                    ? field.translations.find(t => t.language_id === this.currentLanguageId)
                    : null;
                if (translation && translation.name && translation.name.trim() !== '') {
                    translated.name = translation.name;
                }
                if (translation && Array.isArray(translation.options) && translation.options.length > 0) {
                    translated.options = translation.options;
                }
                return translated;
            });
        },
        visibleFields() {
            if (this.module !== 'product') {
                return this.fields.filter(f => f.key !== 'owner');
            }
            return this.fields;
        },
    },
    watch: {
        activeTab() {
            this.currentPage = 1;
            this.getRecords();
        },
        currentPage() {
            this.getRecords();
        },
        perPage() {
            if (this.currentPage !== 1) {
                this.currentPage = 1;
            } else {
                this.getRecords();
            }
        },
        '$route.params.module': {
            immediate: true,
            handler(value) {
                if (this.isSeller) return;
                const map = { delivery_boy: 1, customer: 2, product: 3 };
                this.activeTab = map[value] !== undefined ? map[value] : 0;
            },
        },
    },
    created() {
        if (this.isSeller) {
            this.activeTab = 0;
        }
        this.loadLanguages().then(() => this.getRecords());
    },
    methods: {
        // Admin manages everything through the normal role permissions; a seller only their
        // own (seller_id matches) - a global field (seller_id null) stays admin-only even when
        // a seller can see/use it on their products.
        canEdit(item) {
            if (this.isSeller) {
                return item.seller_id === this.currentSellerId;
            }
            return this.$can('custom_field_update');
        },
        canDelete(item) {
            if (this.isSeller) {
                return item.seller_id === this.currentSellerId;
            }
            return this.$can('custom_field_delete');
        },
        typeLabel(type) {
            const map = {
                text: __('text'),
                number: __('number'),
                dropdown: __('dropdown'),
                file: __('file'),
                textarea: __('textarea'),
                date: __('date'),
            };
            return map[type] || type;
        },
        loadLanguages() {
            return axios.get(this.$apiUrl + '/active_languages')
                .then(res => {
                    this.languages = res.data.data || [];
                    const defaultLang = this.languages.find(l => l.is_default);
                    this.defaultLanguageId = defaultLang ? defaultLang.id : null;

                    const appLocale = window.appLocale || 'en';
                    const currentLang = this.languages.find(l => l.code === appLocale) || defaultLang;
                    this.currentLanguageId = currentLang ? currentLang.id : null;
                    this.initializeForm();
                });
        },
        initializeForm() {
            this.languages.forEach(lang => {
                if (!this.form[lang.id]) {
                    this.$set(this.form, lang.id, { name: '', options: [] });
                }
                this.$set(this.optionInputText, lang.id, '');
            });
        },
        focusOptionInput(langId) {
            const input = this.$refs['optionInput_' + langId];
            const el = Array.isArray(input) ? input[0] : input;
            if (el) el.focus();
        },
        handleOptionKeydown(event, langId) {
            if (event.key === ',') {
                event.preventDefault();
                this.addOption(langId);
            } else if (event.key === 'Backspace' && !this.optionInputText[langId] && this.form[langId].options.length) {
                this.form[langId].options.pop();
            }
        },
        addOption(langId) {
            const value = (this.optionInputText[langId] || '').trim();
            if (!value) return;
            if (!this.form[langId].options.includes(value)) {
                this.form[langId].options.push(value);
            }
            this.optionInputText[langId] = '';
        },
        removeOption(langId, index) {
            this.form[langId].options.splice(index, 1);
        },
        getRecords() {
            this.isLoading = true;
            axios.get(this.$apiUrl + '/custom_fields/list', {
                params: {
                    module: this.module,
                    page: this.currentPage,
                    per_page: this.perPage,
                    filter: this.filter,
                }
            })
                .then((response) => {
                    this.isLoading = false;
                    const data = response.data.data || [];
                    this.customFields = data.map(field => ({
                        ...field,
                        status: !!field.status,
                        is_required: !!field.is_required,
                    }));
                    this.totalRows = response.data.total || 0;
                })
                .catch(() => {
                    this.isLoading = false;
                });
        },
        optionsToArray(options) {
            return Array.isArray(options) ? [...options] : [];
        },
        resetForm() {
            this.form = {};
            this.optionInputText = {};
            this.type = 'text';
            this.is_required = false;
            this.status = true;
            this.activeFormTab = 0;
            this.editingId = null;
            this.initializeForm();
        },
        openAddModal() {
            this.isEditing = false;
            this.resetForm();
            this.tabsKey++;
            this.$nextTick(() => this.$refs['field-modal'].show());
        },
        openEditModal(item) {
            this.isEditing = true;
            this.editingId = item.id;
            this.type = item.type;
            this.is_required = !!item.is_required;
            this.status = !!item.status;
            this.activeFormTab = 0;

            this.form = {};
            this.languages.forEach(lang => {
                const translation = Array.isArray(item.translations)
                    ? item.translations.find(t => t.language_id === lang.id)
                    : null;

                if (lang.is_default) {
                    this.$set(this.form, lang.id, {
                        name: (translation && translation.name) ? translation.name : (item.name || ''),
                        options: this.optionsToArray((translation && translation.options && translation.options.length) ? translation.options : item.options),
                    });
                } else {
                    this.$set(this.form, lang.id, {
                        name: (translation && translation.name) ? translation.name : '',
                        options: this.optionsToArray(translation ? translation.options : []),
                    });
                }
                this.$set(this.optionInputText, lang.id, '');
            });

            this.tabsKey++;
            this.$nextTick(() => this.$refs['field-modal'].show());
        },
        hideModal() {
            this.$refs['field-modal'].hide();
        },
        switchToDefaultLanguageTab() {
            const index = this.languages.findIndex(lang => lang.id === this.defaultLanguageId);
            if (index !== -1) this.activeFormTab = index;
        },
        saveRecord() {
            if (this.type === 'dropdown') {
                this.languages.forEach(lang => this.addOption(lang.id));
            }

            if (!this.defaultLanguageId || !this.form[this.defaultLanguageId]) {
                this.showError(__('default_language_not_found'));
                return;
            }

            const defaultForm = this.form[this.defaultLanguageId];

            if (!defaultForm.name || !defaultForm.name.trim()) {
                this.showError(__('field_name') + ' ' + __('required'));
                this.switchToDefaultLanguageTab();
                return;
            }
            if (this.type === 'dropdown' && (!defaultForm.options || !defaultForm.options.length)) {
                this.showError(__('options') + ' ' + __('required'));
                this.switchToDefaultLanguageTab();
                return;
            }

            this.isSaving = true;

            const postData = {
                module: this.module,
                type: this.type,
                is_required: this.is_required ? 1 : 0,
                status: this.status ? 1 : 0,
                translations: {},
            };

            this.languages.forEach(lang => {
                const langForm = this.form[lang.id] || { name: '', options: [] };
                postData.translations[lang.id] = {
                    name: langForm.name || '',
                    options: this.type === 'dropdown' ? (langForm.options || []) : [],
                };
            });

            const url = this.isEditing ? '/custom_fields/update' : '/custom_fields/save';
            if (this.isEditing) {
                postData.id = this.editingId;
            }

            axios.post(this.$apiUrl + url, postData)
                .then((response) => {
                    this.isSaving = false;
                    if (response.data.status === 1) {
                        this.showMessage('success', response.data.message);
                        this.hideModal();
                        this.getRecords();
                    } else {
                        this.showError(response.data.message);
                    }
                })
                .catch((error) => {
                    this.isSaving = false;
                    this.showError(error.response?.data?.message || __('something_went_wrong'));
                });
        },
        deleteRecord(id) {
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
                    axios.post(this.$apiUrl + '/custom_fields/delete', { id: id })
                        .then((response) => {
                            this.showMessage('success', response.data.message);
                            this.getRecords();
                        });
                }
            });
        },
        toggleStatus(item) {
            axios.post(this.$apiUrl + '/custom_fields/update_status', {
                id: item.id,
                status: item.status ? 1 : 0,
            }).then((response) => {
                if (response.data.status === 1) {
                    this.showMessage('success', response.data.message);
                } else {
                    this.showError(response.data.message);
                    item.status = !item.status;
                }
            }).catch(() => {
                this.showError(__('something_went_wrong'));
                item.status = !item.status;
            });
        },
    },
};
</script>

<style>
#customFieldModal .figma-chip-input {
    min-height: 40px;
    padding: 6px 10px;
    cursor: text;
}

#customFieldModal .chip-input-field {
    min-width: 120px;
    outline: none;
    background: transparent;
    font-size: 13px;
    color: var(--ui-text);
}

#customFieldModal .chip-remove {
    cursor: pointer;
}

.custom-fields-table .form-switch .form-check-input {
    cursor: pointer;
}

/* Phones: the tabs (Sellers / Delivery Boys / Customers / Products) piled up in a column.
   Keep them in one horizontal row that scrolls sideways if it has to, labels on one line. */
@media (max-width: 575.98px) {
    .custom-fields-tabs .nav-tabs {
        flex-wrap: nowrap;
        overflow-x: auto;
        overflow-y: hidden;
        scrollbar-width: none;
        -webkit-overflow-scrolling: touch;
    }

    .custom-fields-tabs .nav-tabs::-webkit-scrollbar {
        display: none;
    }

    .custom-fields-tabs .nav-tabs .nav-item {
        flex: 0 0 auto;
    }

    .custom-fields-tabs .nav-tabs .nav-link {
        white-space: nowrap;
        padding: 0.5rem 0.75rem;
    }
}
</style>
