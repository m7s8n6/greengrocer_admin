<template>
    <div>
        <div class="page-heading">
            <div class="page-title mb-3">
                <div class="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-2">
                    <h3 class="modern-page-title mb-0">{{ __('modules') || 'Modules' }}</h3>
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb mb-0">
                            <li class="breadcrumb-item"><router-link to="/dashboard" class="text-muted">{{
                                    __('dashboard') }}</router-link></li>
                            <li class="breadcrumb-item active text-primary" aria-current="page">{{
                                __('modules') || 'Modules' }}</li>
                        </ol>
                    </nav>
                </div>
            </div>
        </div>

        <section class="section">
            <div class="figma-main-section-card">
                <div class="card-body p-0">
                    <div
                        class="d-flex justify-content-between align-items-center flex-wrap gap-2 figma-action-bar-row">
                        <div class="flex-grow-1">
                            <div class="figma-search-container">
                                <i class="fa fa-search text-muted"></i>
                                <input v-model="filter" type="text" class="figma-search-input"
                                    :placeholder="__('search')">
                            </div>
                        </div>
                        <div class="d-flex gap-2 align-items-center flex-wrap">
                            <button class="btn btn-figma-columns d-flex align-items-center gap-2" @click="getRecords()"
                                v-b-tooltip.hover :title="__('refresh')">
                                <i class="fa fa-refresh"></i>
                                <span>{{ __('refresh') || 'Refresh' }}</span>
                            </button>
                        </div>
                    </div>

                    <div v-if="isLoading" class="text-center text-muted my-4">
                        <b-spinner class="align-middle"></b-spinner>
                        <strong>{{ __('loading') }}...</strong>
                    </div>

                    <div v-else-if="!canReorder" class="module-grid">
                        <div v-if="!translatedModules.length" class="module-empty">
                            <i class="fa fa-cubes"></i>
                            <span>{{ __('no_records_to_show') }}</span>
                        </div>
                        <div v-else class="row" :key="tableKey">
                            <div class="col-12 col-md-6 col-xl-4 mb-3" v-for="row in translatedModules" :key="row.id">
                                <div class="module-card h-100">
                                    <div class="module-card__top">
                                        <div class="module-card__icon">
                                            <module-icon v-if="row.image_url" :src="row.image_url" :size="24" :alt="row.name"></module-icon>
                                            <i v-else class="fa fa-cubes"></i>
                                        </div>
                                        <div class="module-card__title">
                                            <h6 class="mb-0 text-truncate">{{ row.name }}</h6>
                                            <small class="text-muted">#{{ row.id }}</small>
                                        </div>
                                        <span v-if="row.is_default" class="figma-status-pill bg-primary">{{ __('default') || 'Default' }}</span>
                                    </div>
                                    <p class="module-card__desc" v-b-tooltip.hover :title="row.description || __('no_description')">
                                        {{ row.description || __('no_description') }}
                                    </p>
                                    <div class="module-card__foot">
                                        <div class="d-flex align-items-center gap-2">
                                            <div class="form-check form-switch m-0">
                                                <input class="form-check-input module-card__switch" type="checkbox" :id="'status-' + row.id"
                                                    :true-value="1" :false-value="0" v-model="row.status"
                                                    @change="toggleStatus(row)">
                                            </div>
                                            <span class="figma-status-pill" :class="row.status == 1 ? 'bg-success' : 'bg-danger'">
                                                {{ row.status == 1 ? __('active') : __('inactive') }}
                                            </span>
                                        </div>
                                        <button class="figma-action-btn" @click="editRecord(row)" v-b-tooltip.hover
                                            :title="__('edit')">
                                            <base-icon name="edit icon" hoverName="edit Hover" width="24" height="24" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div v-else class="module-grid">
                        <div v-if="!modules.length" class="module-empty">
                            <i class="fa fa-cubes"></i>
                            <span>{{ __('no_records_to_show') }}</span>
                        </div>
                        <draggable v-else tag="div" class="row" v-model="modules" animation="200" handle=".drag-handle"
                            :move="onModuleMove" @end="updateModulesOrder">
                            <div class="col-12 col-md-6 col-xl-4 mb-3" v-for="module in modules" :key="module.id">
                                <div class="module-card h-100">
                                    <div class="module-card__top">
                                        <div class="module-card__icon">
                                            <module-icon v-if="module.image_url" :src="module.image_url" :size="24" :alt="getModuleName(module)"></module-icon>
                                            <i v-else class="fa fa-cubes"></i>
                                        </div>
                                        <div class="module-card__title">
                                            <h6 class="mb-0 text-truncate">{{ getModuleName(module) }}</h6>
                                            <small class="text-muted">#{{ module.id }}</small>
                                        </div>
                                        <span v-if="module.is_default" class="figma-status-pill bg-primary">{{ __('default') || 'Default' }}</span>
                                        <span v-if="!module.is_default" class="module-card__drag drag-handle">
                                            <i class="fas fa-arrows-alt"></i>
                                        </span>
                                    </div>
                                    <p class="module-card__desc" v-b-tooltip.hover :title="getModuleDescription(module) || __('no_description')">
                                        {{ getModuleDescription(module) || __('no_description') }}
                                    </p>
                                    <div class="module-card__foot">
                                        <div class="d-flex align-items-center gap-2">
                                            <div class="form-check form-switch m-0">
                                                <input class="form-check-input module-card__switch" type="checkbox" :id="'status-' + module.id"
                                                    :true-value="1" :false-value="0" v-model="module.status"
                                                    @change="toggleStatus(module)">
                                            </div>
                                            <span class="figma-status-pill" :class="module.status == 1 ? 'bg-success' : 'bg-danger'">
                                                {{ module.status == 1 ? __('active') : __('inactive') }}
                                            </span>
                                        </div>
                                        <button class="figma-action-btn" @click="editRecord(module)" v-b-tooltip.hover
                                            :title="__('edit')">
                                            <base-icon name="edit icon" hoverName="edit Hover" width="24" height="24" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </draggable>
                    </div>

                    <div class="figma-table-footer flex-wrap gap-3">
                        <table-count :current-page="currentPage" :per-page="perPage" :total-rows="totalRows"></table-count>
                        <div class="d-flex align-items-center gap-3">
                            <b-pagination v-model="currentPage" :total-rows="totalRows" :per-page="perPage" align="right"
                                class="figma-pagination mb-0" hide-goto-end-buttons hide-ellipsis prev-text="<" next-text=">"></b-pagination>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Edit Modal -->
        <b-modal id="editModuleModal" ref="edit-modal" :title="__('edit_module') || 'Edit Module'" scrollable
            no-close-on-backdrop no-fade static>
            <template #modal-footer>
                <div class="d-flex justify-content-end gap-2 w-100">
                    <b-button variant="outline-secondary" @click="hideModal">{{ __('cancel') }}</b-button>
                    <b-button variant="primary" @click="$refs['dummy_submit'].click()" :disabled="isSaving">
                        {{ __('save') }}
                        <b-spinner v-if="isSaving" small label="Saving"></b-spinner>
                    </b-button>
                </div>
            </template>

            <form ref="edit-form" @submit.prevent="saveRecord" novalidate>
                <b-tabs :key="tabsKey" v-if="languages.length" v-model="activeTab" content-class="mt-3">
                    <b-tab v-for="(lang, index) in languages" :key="lang.id" :title="lang.name"
                        :active="lang.is_default == 1">

                        <!-- Translate buttons -->
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

                        <div class="form-group mb-3">
                            <label class="form-label">{{ __('name') }} <span class="text-danger"
                                    v-if="lang.is_default">*</span></label>
                            <input type="text" class="form-control" v-model="form[lang.id].name"
                                :placeholder="__('enter_name')" :required="lang.is_default ? true : undefined"
                                @input="lang.is_default ? onNameInput($event) : null">
                        </div>

                        <div class="form-group mb-3" v-if="lang.is_default">
                            <label class="form-label">{{ __('slug') || 'Slug' }} <span class="text-danger">*</span></label>
                            <input type="text" class="form-control" v-model="slug"
                                :placeholder="__('enter_slug') || 'Enter Slug'" required
                                @input="slugManualEdit = true">
                        </div>

                        <div class="form-group mb-3">
                            <label class="form-label">{{ __('description') }}</label>
                            <textarea class="form-control" v-model="form[lang.id].description" rows="3"
                                :placeholder="__('enter_description') || 'Enter Description'"></textarea>
                        </div>

                        <!-- Image and status only in default language tab -->
                        <template v-if="lang.is_default">
                            <div class="form-group mb-3">
                                <label class="form-label">{{ __('image') }}</label>
                                <small class="text-muted d-block mb-1">{{ __('single_colour_svg_only_allowed_note') }}</small>
                                <input type="file" id="module_image" class="d-none" accept="image/svg+xml"
                                    @change="handleFileUpload">
                                <label for="module_image" class="file-input-div bg-gray-100" @dragover="$dragoverFile"
                                    @dragleave="$dragleaveFile" @drop="dropFile">
                                    <template v-if="imageFile && imageFile.name">
                                        {{ __('selected_file_name') }}: {{ imageFile.name }}
                                    </template>
                                    <template v-else>
                                        <i class="fa fa-cloud-upload-alt fa-2x mb-2 text-muted"></i><br>
                                        {{ __('drop_files_here_or_click_to_upload') }}
                                    </template>
                                </label>

                                <div v-if="image_url" class="mt-2 text-center">
                                    <img :src="image_url" class="img-thumbnail module-preview" />
                                </div>
                            </div>

                            <div class="form-group mb-3">
                                <label class="form-label d-block">{{ __('status') }}</label>
                                <b-form-radio-group v-model="status" :options="[
                                    { text: __('deactivate'), 'value': 0 },
                                    { text: __('activate'), 'value': 1 }]" buttons button-variant="outline-primary"
                                    required></b-form-radio-group>
                            </div>

                            <div class="form-group mb-3">
                                <div class="form-check">
                                    <input type="checkbox" class="form-check-input" id="module_is_default"
                                        v-model="isDefault">
                                    <label class="form-check-label" for="module_is_default">
                                        {{ __('set_as_default_module') || 'Set as a default module' }}
                                    </label>
                                </div>
                            </div>
                        </template>
                    </b-tab>
                </b-tabs>
                <button ref="dummy_submit" class="d-none"></button>
            </form>
        </b-modal>
    </div>
</template>

<script>
import axios from 'axios';
import draggable from 'vuedraggable';
import TranslationHelper from '../../mixins/TranslationHelper.js';

export default {
    mixins: [TranslationHelper],
    components: { draggable },
    data() {
        return {
            fields: [
                { key: 'id', label: __('id'), class: 'text-center', sortable: true, sortDirection: 'desc' },
                { key: 'name', label: __('name'), class: 'text-center' },
                { key: 'image', label: __('image'), class: 'text-center' },
                { key: 'description', label: __('description') || 'Description', class: 'text-center' },
                { key: 'is_default', label: __('default') || 'Default', class: 'text-center' },
                { key: 'status', label: __('status'), class: 'text-center' },
                { key: 'actions', label: __('actions'), class: 'text-center' }
            ],
            totalRows: 0,
            currentPage: 1,
            perPage: this.$perPage || 10,
            sortBy: '',
            sortDesc: false,
            sortDirection: 'asc',
            filter: null,
            isLoading: false,
            isSaving: false,
            modules: [],
            tableKey: 0,

            // Translation states
            id: null,
            status: 1,
            isDefault: false,
            wasDefault: false,
            slug: '',
            slugManualEdit: false,
            languages: [],
            defaultLanguageId: null,
            currentLanguageId: null,
            activeTab: 0,
            form: {},
            imageFile: null,
            image_url: '',
            tabsKey: 0,

            // Translation settings
            translatableFields: ['name', 'description'],
            loadingEmpty: false,
            loadingOverwrite: false
        }
    },
    computed: {
        pageEnd() {
            return Math.min(this.currentPage * this.perPage, this.totalRows);
        },
        canReorder() {
            return !this.filter && !this.sortBy;
        },
        translatedModules() {
            const list = Array.isArray(this.modules) ? this.modules : [];
            if (!this.currentLanguageId || list.length === 0) {
                return list;
            }

            return list.map(module => {
                const translatedModule = { ...module };

                if (module.translations && Array.isArray(module.translations)) {
                    const translation = module.translations.find(
                        t => t.language_id === this.currentLanguageId
                    );

                    if (translation && translation.name && translation.name.trim() !== '') {
                        translatedModule.name = translation.name;
                    }

                    if (translation && translation.description && translation.description.trim() !== '') {
                        translatedModule.description = translation.description;
                    }
                }
                return translatedModule;
            });
        }
    },
    created() {
        this.loadLanguages();
        this.getRecords();
    },
    watch: {
        currentPage() {
            this.getRecords();
        },
        perPage() {
            this.getRecords();
        },
        filter() {
            if (this.currentPage === 1) {
                this.getRecords();
            } else {
                this.currentPage = 1;
            }
        }
    },
    methods: {
        getModuleName(module) {
            if (this.currentLanguageId && Array.isArray(module.translations)) {
                const translation = module.translations.find(t => t.language_id === this.currentLanguageId);
                if (translation && translation.name && translation.name.trim() !== '') {
                    return translation.name;
                }
            }
            return module.name || '';
        },
        getModuleDescription(module) {
            if (this.currentLanguageId && Array.isArray(module.translations)) {
                const translation = module.translations.find(t => t.language_id === this.currentLanguageId);
                if (translation && translation.description && translation.description.trim() !== '') {
                    return translation.description;
                }
            }
            return module.description || '';
        },
        // Default module is pinned to the top: it can't be dragged (no drag-handle rendered for
        // it, see the table row above), and nothing else can be dropped into its slot at index 0.
        onModuleMove(evt) {
            return evt.draggedContext.index !== 0 && evt.draggedContext.futureIndex !== 0;
        },
        updateModulesOrder() {
            this.modules.forEach((module, index) => {
                module.row_order = index + 1;
            });

            const formData = this.modules.map(module => ({ id: module.id, row_order: module.row_order }));
            axios.post(this.$apiUrl + '/modules/updateOrder', formData).then(res => {
                if (res.data.status === 1) {
                    this.showMessage('success', res.data.message);
                } else {
                    this.showError(res.data.message);
                    this.getRecords();
                }
            }).catch(() => {
                this.showError(__('something_went_wrong'));
                this.getRecords();
            });
        },
        getRecords() {
            this.isLoading = true;
            axios.get(this.$apiUrl + '/modules', {
                params: {
                    all: 1,
                    page: this.currentPage,
                    per_page: this.perPage,
                    filter: this.filter
                }
            }).then((response) => {
                this.isLoading = false;
                const data = response.data;
                // Default module is pinned to the top - sort it there regardless of row_order,
                // since row_order alone can't be trusted to keep it first after old data/edits.
                this.modules = [...data.data].sort((a, b) => (b.is_default ? 1 : 0) - (a.is_default ? 1 : 0));
                this.totalRows = data.data.length;
            }).catch(() => {
                this.isLoading = false;
            });
        },
        resetForm() {
            this.form = {};
            this.id = null;
            this.status = 1;
            this.isDefault = false;
            this.wasDefault = false;
            this.slug = '';
            this.slugManualEdit = false;
            this.imageFile = null;
            this.image_url = "";
            this.activeTab = 0;

            this.languages.forEach(lang => {
                this.$set(this.form, lang.id, { name: '', description: '' });
            });
        },
        initializeForm() {
            this.languages.forEach(lang => {
                if (!this.form[lang.id]) {
                    this.$set(this.form, lang.id, { name: '', description: '' });
                }
            });
        },
        loadLanguages() {
            return axios.get(this.$apiUrl + '/active_languages')
                .then(res => {
                    this.languages = res.data.data;
                    const defaultLang = this.languages.find(l => l.is_default);
                    this.defaultLanguageId = defaultLang?.id || null;

                    const appLocale = window.appLocale || 'en';
                    const currentLanguage = this.languages.find(
                        lang => lang.code === appLocale
                    );
                    if (currentLanguage) {
                        this.currentLanguageId = currentLanguage.id;
                    } else if (defaultLang) {
                        this.currentLanguageId = defaultLang.id;
                    }

                    this.initializeForm();
                });
        },
        editRecord(item) {
            this.id = item.id;
            this.status = item.status;
            this.isDefault = !!item.is_default;
            this.wasDefault = !!item.is_default;
            this.slug = item.slug || '';
            this.slugManualEdit = false;
            this.imageFile = null;
            this.image_url = item.image_url || '';

            this.initializeForm();

            this.languages.forEach(lang => {
                const translation = Array.isArray(item.translations)
                    ? item.translations.find(t => t.language_id === lang.id)
                    : null;

                if (lang.is_default) {
                    this.$set(this.form, lang.id, {
                        name: (translation && translation.name && translation.name.trim() !== '')
                            ? translation.name
                            : (item.name || ''),
                        description: (translation && translation.description && translation.description.trim() !== '')
                            ? translation.description
                            : (item.description || '')
                    });
                } else {
                    this.$set(this.form, lang.id, {
                        name: (translation && translation.name) ? translation.name : '',
                        description: (translation && translation.description) ? translation.description : ''
                    });
                }
            });

            this.tabsKey++;
            this.$refs['edit-modal'].show();
        },
        hideModal() {
            this.$refs['edit-modal'].hide();
        },
        handleFileUpload(e) {
            const file = e.target.files[0];
            if (!file) return;

            const validTypes = ["image/svg+xml"];
            if (!validTypes.includes(file.type)) {
                this.showError(__('only_svg_images_are_allowed') || "Only SVG images are allowed");
                return;
            }

            if (file.size > 2 * 1024 * 1024) {
                this.showError("Image must be less than 2MB");
                return;
            }

            this.imageFile = file;
            this.image_url = URL.createObjectURL(file);
        },
        dropFile(event) {
            event.preventDefault();
            this.$dragleaveFile(event);
            if (event.dataTransfer.files.length) {
                const file = event.dataTransfer.files[0];
                const validTypes = ["image/svg+xml"];
                if (!validTypes.includes(file.type)) {
                    this.showError(__('only_svg_images_are_allowed') || "Only SVG images are allowed");
                    return;
                }
                if (file.size > 2 * 1024 * 1024) {
                    this.showError("Image must be less than 2MB");
                    return;
                }
                this.imageFile = file;
                this.image_url = URL.createObjectURL(file);
            }
        },
        toggleStatus(item) {
            if (item.status === 0) {
                const otherActiveModules = this.modules.filter(m => m.id !== item.id && m.status === 1);
                if (otherActiveModules.length === 0 || item.is_default) {
                    this.showError(otherActiveModules.length === 0
                        ? (__('at_least_one_module_must_be_on') || 'At least one module must be active')
                        : (__('default_module_must_be_active') || 'Default module must be active'));
                    item.status = 1;
                    const originalModule = this.modules.find(m => m.id === item.id);
                    if (originalModule) {
                        originalModule.status = 1;
                    }
                    this.tableKey++; // Force table re-render
                    return;
                }
            }

            let fd = new FormData();
            fd.append('id', item.id);
            fd.append('name', item.name);
            fd.append('description', item.description || '');
            fd.append('status', item.status);
            fd.append('language_id', this.defaultLanguageId);

            axios.post(this.$apiUrl + '/modules/update', fd)
                .then((response) => {
                    if (response.data.status === 1) {
                        this.showMessage('success', response.data.message || 'Status updated successfully');
                        this.$eventBus.$emit('modulesUpdated');

                        const originalModule = this.modules.find(m => m.id === item.id);
                        if (originalModule) {
                            originalModule.status = item.status;
                        }

                        const activeModuleId = Number(localStorage.getItem('active_module_id')) || 1;
                        if (item.id === activeModuleId && item.status === 0) {
                            const otherActiveModule = this.modules.find(m => m.id !== item.id && m.status === 1);
                            if (otherActiveModule) {
                                localStorage.setItem('active_module_id', otherActiveModule.id);
                                window.location.reload();
                                return;
                            }
                        }
                        this.getRecords();
                    } else {
                        this.showError(response.data.message);
                        item.status = 1;
                        const originalModule = this.modules.find(m => m.id === item.id);
                        if (originalModule) {
                            originalModule.status = 1;
                        }
                        this.tableKey++; // Force table re-render
                        this.getRecords();
                    }
                }).catch(() => {
                    this.showError(__('something_went_wrong'));
                    item.status = 1;
                    const originalModule = this.modules.find(m => m.id === item.id);
                    if (originalModule) {
                        originalModule.status = 1;
                    }
                    this.tableKey++; // Force table re-render
                    this.getRecords();
                });
        },
        validateDefaultLanguage() {
            if (!this.defaultLanguageId) {
                this.showError(__('default_language_not_found'));
                return false;
            }

            const defaultForm = this.form[this.defaultLanguageId];

            if (!defaultForm.name || defaultForm.name.trim() === '') {
                this.showError(__('please_fill_name_in_default_language'));
                this.switchToDefaultLanguageTab();
                return false;
            }

            if (!this.slug || this.slug.trim() === '') {
                this.showError(__('please_enter_slug') || 'Please enter slug');
                this.switchToDefaultLanguageTab();
                return false;
            }

            return true;
        },
        validateDefaultLanguageForTranslation() {
            return this.validateDefaultLanguage();
        },
        switchToDefaultLanguageTab() {
            const defaultLangIndex = this.languages.findIndex(lang => lang.id === this.defaultLanguageId);
            if (defaultLangIndex !== -1) {
                this.activeTab = defaultLangIndex;
            }
        },
        saveRecord() {
            if (!this.validateDefaultLanguage()) return;

            if (this.status === 0) {
                const otherActiveModules = this.modules.filter(m => m.id !== this.id && m.status === 1);
                if (otherActiveModules.length === 0) {
                    this.showError(__('at_least_one_module_must_be_on') || 'At least one module must be active');
                    return;
                }
                if (this.wasDefault) {
                    this.showError(__('default_module_must_be_active') || 'Default module must be active');
                    return;
                }
            }

            if (this.wasDefault && !this.isDefault) {
                this.showError(__('at_least_one_module_must_be_default') || 'At least one module must be set as default');
                return;
            }

            this.isSaving = true;

            const languagesToSave = [];
            const defaultLang = this.languages.find(l => l.is_default);
            if (defaultLang) languagesToSave.push(defaultLang);

            this.languages.forEach(lang => {
                if (lang.is_default) return;
                const name = this.form[lang.id].name;
                if (name && name.trim() !== '') languagesToSave.push(lang);
            });

            const saveSequentially = async () => {
                let moduleId = this.id;

                for (const lang of languagesToSave) {
                    let fd = new FormData();
                    fd.append('id', moduleId);
                    fd.append('language_id', lang.id);
                    fd.append('name', this.form[lang.id].name);
                    fd.append('description', this.form[lang.id].description || '');
                    fd.append('status', this.status);

                    if (lang.is_default) {
                        fd.append('slug', this.slug);
                        fd.append('is_default', this.isDefault ? 1 : 0);
                        if (this.imageFile) {
                            fd.append('image', this.imageFile);
                        }
                    }

                    await axios.post(this.$apiUrl + '/modules/update', fd);
                }
            };

            saveSequentially()
                .then(() => {
                    this.showMessage('success', __('module_updated_successfully') || 'Module updated successfully');
                    this.$eventBus.$emit('modulesUpdated');

                    const activeModuleId = Number(localStorage.getItem('active_module_id')) || 1;
                    if (this.id === activeModuleId && this.status === 0) {
                        const otherActiveModule = this.modules.find(m => m.id !== this.id && m.status === 1);
                        if (otherActiveModule) {
                            localStorage.setItem('active_module_id', otherActiveModule.id);
                            window.location.reload();
                            return;
                        }
                    }

                    this.hideModal();
                    this.getRecords();
                })
                .catch(() => {
                    this.showError(__('something_went_wrong'));
                })
                .finally(() => {
                    this.isSaving = false;
                });
        },
        onNameInput(e) {
            if (!this.slugManualEdit) {
                this.slug = this.slugify(e.target.value);
            }
        },
        slugify(text) {
            return text
                .toString()
                .toLowerCase()
                .replace(/\s+/g, '-')
                .replace(/[^\w\-]+/g, '')
                .replace(/\-\-+/g, '-')
                .replace(/^-+/, '')
                .replace(/-+$/, '');
        }
    }
}
</script>

<style scoped>
.module-grid {
    padding: 20px 20px 4px;
}

.module-card {
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 16px;
    background: var(--ui-surface);
    border: 1px solid var(--ui-border);
    border-radius: var(--ui-radius-lg);
    box-shadow: var(--ui-shadow);
    transition: border-color 0.15s ease, box-shadow 0.15s ease;
}

.module-card:hover {
    border-color: var(--theme-primary-300);
    box-shadow: var(--ui-shadow-lg);
}

.module-card__top {
    display: flex;
    align-items: center;
    gap: 12px;
}

.module-card__icon {
    flex: 0 0 42px;
    width: 42px;
    height: 42px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    background: var(--ui-primary-soft);
    color: var(--theme-primary-600);
    overflow: hidden;
}

.module-card__icon img {
    width: 26px;
    height: 26px;
    object-fit: contain;
}

.module-card__title {
    flex: 1 1 auto;
    min-width: 0;
}

.module-card__title h6 {
    font-size: 15px;
    font-weight: 700;
    color: var(--ui-heading);
}

.module-card__title small {
    font-size: 12px;
}

.module-card__drag {
    flex: 0 0 32px;
    width: 32px;
    height: 32px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border: 1px solid var(--ui-border);
    border-radius: var(--ui-radius);
    color: var(--ui-text-subtle);
    cursor: move;
}

.module-card__drag:hover {
    color: var(--theme-primary-600);
    border-color: var(--theme-primary-300);
}

.module-card__desc {
    flex: 1 1 auto;
    margin: 0;
    font-size: 13px;
    color: var(--ui-text-muted);
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.module-card__foot {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    padding-top: 12px;
    border-top: 1px solid var(--ui-border);
}

.module-card__switch {
    cursor: pointer;
}

.module-empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    padding: 40px 16px 56px;
    font-size: 13px;
    color: var(--ui-text-muted);
}

.module-empty i {
    font-size: 28px;
    color: var(--ui-text-subtle);
}

.module-preview {
    max-height: 150px;
    object-fit: contain;
}

@media (max-width: 575.98px) {
    .module-grid {
        padding: 16px 16px 4px;
    }
}

.file-input-div {
    border: 2px dashed var(--ui-border-strong);
    border-radius: var(--ui-radius);
    padding: 20px;
    text-align: center;
    cursor: pointer;
    display: block;
    transition: all 0.2s ease-in-out;
}

.file-input-div:hover {
    background-color: var(--ui-surface-muted);
    border-color: var(--theme-primary-300);
}
</style>
