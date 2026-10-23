<template>
    <div>
        <div class="page-heading">
            <div class="page-title mb-3">
                <div class="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-2">
                    <h3 class="mb-0">{{ __('manage_languages') }}</h3>
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb mb-0">
                            <li class="breadcrumb-item"><router-link to="/dashboard">{{ __('dashboard') }}</router-link>
                            </li>
                            <li class="breadcrumb-item active" aria-current="page">{{ __('manage_languages') }}</li>
                        </ol>
                    </nav>
                </div>
            </div>

            <div class="row">
                <div class="col-12 col-md-12 order-md-1 order-last">
                    <div class="figma-main-section-card">
                        <div class="card-body p-0">
                            <!-- Download Samples Bar -->
                            <div
                                class="d-flex justify-content-between align-items-center flex-wrap gap-2 figma-action-bar-row border-bottom-0 pb-0">
                                <div class="d-flex align-items-center gap-2 flex-grow-1 flex-wrap">
                                    <span class="text-muted small fw-bold text-uppercase">{{ __('download_sample_files')
                                        }}:</span>
                                    <button class="btn btn-sm btn-outline-primary"
                                        @click="downloadSampleFile('customer.json', getSystemTypeName(1))">
                                        <i class="fa fa-download me-1"></i> {{ __('customer_app') }}
                                    </button>
                                    <button class="btn btn-sm btn-outline-primary"
                                        @click="downloadSampleFile('partner.json', getSystemTypeName(2))">
                                        <i class="fa fa-download me-1"></i> {{ __('partner_app') }}
                                    </button>
                                    <button class="btn btn-sm btn-outline-primary"
                                        @click="downloadSampleFile('web.json', getSystemTypeName(3))">
                                        <i class="fa fa-download me-1"></i> {{ __('website') }}
                                    </button>
                                    <button class="btn btn-sm btn-outline-primary"
                                        @click="downloadSampleFile('panel.json', getSystemTypeName(4))">
                                        <i class="fa fa-download me-1"></i> {{ __('admin_panel') }}
                                    </button>
                                </div>
                            </div>

                            <!-- Core Action Bar -->
                            <div
                                class="d-flex justify-content-between align-items-center flex-wrap gap-2 figma-action-bar-row">
                                <div class="d-flex align-items-center gap-2 flex-grow-1 flex-wrap">
                                    <div class="figma-search-container">
                                        <i class="fa fa-search text-muted"></i>
                                        <input v-model="filter" type="text" class="figma-search-input"
                                            :placeholder="__('search')">
                                    </div>
                                </div>
                                <div class="d-flex gap-2 align-items-center flex-wrap">
                                    <button class="btn btn-figma-columns d-flex align-items-center gap-2"
                                        @click="showSupportedLanguages = true">
                                        <i class="fa fa-list"></i>
                                        <span>{{ __('supported_languages_list') }}</span>
                                    </button>
                                    <button class="btn btn-figma-columns d-flex align-items-center gap-2"
                                        @click="getRecords()" v-b-tooltip.hover :title="__('refresh')">
                                        <i class="fa fa-refresh"></i>
                                        <span>{{ __('refresh') }}</span>
                                    </button>
                                    <router-link to="/languages/create"
                                        class="btn btn-figma-filter d-flex align-items-center gap-2"
                                        v-if="$can('language_create')">
                                        <i class="fa fa-plus"></i>
                                        <span>{{ __('add_language') }}</span>
                                    </router-link>
                                </div>
                            </div>

                            <div class="table-responsive">
                                <b-table :items="groupedLanguages" :fields="languageFields" :current-page="currentPage"
                                    :per-page="perPage" :filter="filter" :filter-included-fields="filterOn"
                                    :sort-by.sync="sortBy" :sort-desc.sync="sortDesc" :sort-direction="sortDirection"
                                    :bordered="false" :busy="isLoading" stacked="md" show-empty small
                                    class="figma-table mb-0" :tbody-tr-class="() => 'figma-tr align-middle'">
                                    <template #table-busy>
                                        <div class="text-center text-muted my-2">
                                            <b-spinner class="align-middle"></b-spinner>
                                            <strong>{{ __('loading') }}...</strong>
                                        </div>
                                    </template>

                                    <template #cell(name)="row">
                                        <span class="lang-name">{{ row.item.name }}</span>
                                    </template>

                                    <template #cell(code)="row">
                                        <span class="text-muted text-uppercase">{{ row.item.code }}</span>
                                    </template>

                                    <template #cell(is_default)="row">
                                        <span v-if="row.item.has_default" class="badge bg-success">{{ __('yes')
                                        }}</span>
                                        <span v-else class="badge bg-secondary">{{ __('no') }}</span>
                                    </template>

                                    <template #cell(status)="row">
                                        <span v-if="row.item.status == 1" class="badge bg-success">{{ __('active')
                                        }}</span>
                                        <span v-else class="badge bg-danger">{{ __('inactive') }}</span>
                                    </template>

                                    <template #cell(actions)="row">
                                        <div class="d-flex gap-2">
                                            <button v-if="$can('language_update')" class="figma-action-btn"
                                                @click="openEditModal(row.item)" v-b-tooltip.hover :title="__('edit')">
                                                <base-icon name="edit icon" hoverName="edit Hover" width="24"
                                                    height="24" />
                                            </button>
                                            <button v-if="$can('language_delete')"
                                                class="figma-action-btn figma-delete-btn"
                                                @click="deleteLanguageGroup(row.item)" v-b-tooltip.hover
                                                :title="__('delete')">
                                                <base-icon name="Type=Default" hoverName="Type=Hover" width="24"
                                                    height="24" />
                                            </button>
                                        </div>
                                    </template>
                                </b-table>
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

        <!-- Add / Edit -->
        <app-edit-record v-if="create_new || edit_record" :record="edit_record" :system_types="system_types"
            :supported_languages="supported_languages" @modalClose="hideModal()"></app-edit-record>

        <!-- Edit Language Modal - Shows supported language, display name, is_default, and 4 Edit buttons -->
        <b-modal ref="edit-language-modal" :title="__('edit_language')" @hidden="closeEditModal" size="lg" scrollable
            no-close-on-backdrop no-fade static>
            <div v-if="selectedLanguageGroup" class="row">
                <div class="form-group col-md-6">
                    <label for="edit_supported_language">{{ __('supported_language') }}</label>
                    <input type="text" id="edit_supported_language" class="form-control"
                        :value="selectedLanguageGroup.name + ' (' + selectedLanguageGroup.code + ')'" readonly>
                </div>

                <div class="form-group col-md-6">
                    <label for="edit_display_name">{{ __('display_name') }}<span class="text-danger">*</span></label>
                    <input type="text" id="edit_display_name" class="form-control" v-model="editDisplayName"
                        :placeholder="__('enter_display_name')">
                </div>

                <div class="form-group col-md-6 d-flex align-items-end">
                    <div class="form-check mb-2">
                        <input name="edit_is_default" id="edit_is_default" v-model="editIsDefault" true-value="1"
                            false-value="0" type="checkbox" class="form-check-input">
                        <label for="edit_is_default" class="form-check-label">{{ __('set_as_a_default_language')
                        }}</label>
                    </div>
                </div>

                <div class="form-group col-md-6">
                    <label>{{ __('status') }}</label>
                    <div class="text-left mt-1">
                        <b-form-radio-group v-model="editStatus" :options="[
                            { text: __('deactivate'), 'value': 0 },
                            { text: __('activate'), 'value': 1 },
                        ]" buttons button-variant="outline-primary" required></b-form-radio-group>
                    </div>
                </div>

                <div class="form-group col-md-12">
                    <label class="mb-2 lang-name">{{ __('edit_json_data_for_system_types') }}</label>
                    <div class="row">
                        <div class="col-md-6 mb-3" v-for="systemType in system_types" :key="systemType.id">
                            <button class="btn btn-outline-primary w-100 mb-2"
                                @click="openJsonEditModal(systemType, selectedLanguageGroup)">
                                <i class="fa fa-pencil-alt"></i> {{ __('edit') }} {{ systemType.name }}
                            </button>

                            <!-- Drag-and-drop JSON upload; applied when the language is saved -->
                            <input type="file" accept="application/json" class="file-input"
                                :ref="'edit_json_file_' + systemType.id"
                                @change="handleEditJsonFile($event.target, systemType.id)">
                            <div class="file-input-div bg-gray-100"
                                @click="$refs['edit_json_file_' + systemType.id][0].click()"
                                @drop="dropEditJsonFile($event, systemType.id)" @dragover="$dragoverFile"
                                @dragleave="$dragleaveFile">
                                <template v-if="editJsonFiles[systemType.id]">
                                    <label>{{ __('selected_file_name') }}: {{ editJsonFiles[systemType.id].name }}</label>
                                </template>
                                <template v-else>
                                    <label><i class="fa fa-cloud-upload-alt fa-2x"></i></label>
                                    <label>{{ __('drop_files_here_or_click_to_upload') }}</label>
                                </template>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <template #modal-footer>
                <div class="d-flex justify-content-end gap-2 w-100">
                    <b-button variant="outline-secondary" @click="closeEditModal">{{ __('cancel') }}</b-button>
                    <b-button variant="primary" @click="saveLanguageSettings" :disabled="isSaving">
                        {{ __('save') }}
                        <b-spinner v-if="isSaving" small label="Spinning"></b-spinner>
                    </b-button>
                </div>
            </template>
        </b-modal>

        <app-json-edit v-if="jsonEditRecord" :record="jsonEditRecord" :system_type="jsonEditSystemType"
            @modalClose="closeJsonEditModal" @jsonSaved="closeEditModal"></app-json-edit>

        <!-- Supported Languages Modal -->
        <b-modal v-model="showSupportedLanguages" :title="__('supported_languages_list')" size="lg" hide-footer
            scrollable>
            <div class="mb-3">
                <div class="figma-search-container">
                    <i class="fa fa-search text-muted"></i>
                    <input v-model="filterSL" type="search" class="figma-search-input" :placeholder="__('search')">
                </div>
            </div>
            <div class="table-responsive">
                <b-table :items="supported_languages" :fields="supported_languages_fields" :filter="filterSL"
                    :sort-by.sync="sortBySL" :sort-desc.sync="sortDescSL" :sort-direction="sortDirectionSL"
                    :bordered="false" :busy="isLoading" stacked="md" show-empty small class="mb-0">
                    <template #table-busy>
                        <div class="text-center text-muted my-2">
                            <b-spinner class="align-middle"></b-spinner>
                            <strong>{{ __('loading') }}...</strong>
                        </div>
                    </template>
                </b-table>
            </div>
        </b-modal>
    </div>

</template>
<script>

import EditRecord from './Edit.vue';
import JsonEdit from './JsonEdit.vue';
import axios from "axios";


export default {
    components: {
        'app-edit-record': EditRecord,
        'app-json-edit': JsonEdit,
    },
    data: function () {
        return {
            fields: [
                { key: 'id', label: __('id'), class: 'text-center', sortable: true, sortDirection: 'desc' },
                { key: 'name', label: __('name'), class: 'text-center' },
                { key: 'code', label: __('code'), class: 'text-center' },
                { key: 'is_default', label: __('default'), class: 'text-center' },
                { key: 'actions', label: __('actions'), class: 'text-center' }
            ],
            languageFields: [
                { key: 'name', label: __('language'), class: 'text-nowrap', sortable: true },
                { key: 'code', label: __('code'), class: 'text-nowrap', sortable: true },
                { key: 'is_default', label: __('default'), class: 'text-nowrap', sortable: true },
                { key: 'status', label: __('status'), class: 'text-nowrap', sortable: true },
                { key: 'actions', label: __('actions'), class: 'text-nowrap' }
            ],
            totalRows: 1,
            currentPage: 1,
            perPage: this.$perPage,
            pageOptions: this.$pageOptions,
            sortBy: 'id',
            sortDesc: true,
            sortDirection: 'desc',
            filter: null,
            filterOn: ['name', 'code'],
            page: 1,

            isLoading: false,
            sectionStyle: 'style_1',
            max_visible_units: 12,
            max_col_in_single_row: 3,

            languages: [],
            system_types: [],
            system_type: "",
            supported_languages: [],
            supported_languages_fields: [
                { key: 'id', label: __('id'), sortable: true, sortDirection: 'asc' },
                { key: 'name', label: __('name') },
                { key: 'code', label: __('code') },
                { key: 'type', label: __('type') }
            ],
            sortBySL: 'id',
            sortDescSL: false,
            sortDirectionSL: 'asc',
            filterSL: null,
            showSupportedLanguages: false,
            isSystemRefreshing: false,


            create_new: null,
            edit_record: null,
            selectedLanguageGroup: null,
            editDisplayName: '',
            editIsDefault: 0,
            editStatus: 1,
            isSaving: false,
            jsonEditRecord: null,
            jsonEditSystemType: null,
            editJsonFiles: {},
        }
    },
    computed: {
        sortOptions() {
            // Create an options list from our fields
            return this.fields
                .filter(f => f.sortable)
                .map(f => {
                    return { text: f.label, value: f.key }
                })
        },
        pageStart() {
            if (this.totalRows === 0) return 0;
            return (this.currentPage - 1) * this.perPage + 1;
        },
        pageEnd() {
            return Math.min(this.currentPage * this.perPage, this.totalRows);
        },
        groupedLanguages() {
            const grouped = {};

            this.languages.forEach(lang => {
                const key = lang.supported_language_id;

                if (!grouped[key]) {
                    grouped[key] = {
                        id: lang.supported_language_id,
                        supported_language_id: lang.supported_language_id,
                        name: lang.name,
                        code: lang.code,
                        type: lang.type,
                        display_name: lang.display_name,
                        has_default: false,
                        status: lang.status,
                        languages: []
                    };
                }

                grouped[key].languages.push(lang);

                if (lang.is_default == 1) {
                    grouped[key].has_default = true;
                }
            });

            return Object.values(grouped).sort((a, b) => {
                return a.name.localeCompare(b.name);
            });
        }
    },
    mounted() {
        // Set the initial number of items
        this.totalRows = this.groupedLanguages.length
    },
    watch: {
        $route(to, from) {
            this.showCreateModal();
        },
        groupedLanguages: {
            handler(newVal) {
                this.totalRows = newVal.length;
            },
            immediate: true
        }
    },
    created: function () {
        this.showCreateModal();
        this.$eventBus.$on('recordSaved', (message) => {
            this.showMessage('success', message);
            this.getRecords();
            this.create_new = null;
        });
        this.getRecords();
        this.getSupportedLanguages();
    },
    methods: {

        getRecords() {
            this.isLoading = true
            axios.get(this.$apiUrl + '/languages')
                .then((response) => {
                    this.isLoading = false
                    let data = response.data;
                    this.languages = data.data || [];
                }).catch(error => {
                    this.isLoading = false;
                    if (error?.request?.statusText) {
                        this.showError(error.request.statusText);
                    } else if (error.message) {
                        this.showError(error.message);
                    } else {
                        this.showError("Something went wrong!");
                    }
                });
        },
        getSupportedLanguages() {
            this.isLoading = true
            axios.get(this.$apiUrl + '/languages/supported_languages')
                .then((response) => {
                    this.isLoading = false
                    let data = response.data;

                    this.system_types = data.data.system_types;
                    this.system_types = this.system_types; // this line is remove System type admin panel.

                    this.supported_languages = data.data.supported_languages;
                }).catch(error => {
                    this.isLoading = false;
                    if (error?.request?.statusText) {
                        this.showError(error.request.statusText);
                    } else if (error.message) {
                        this.showError(error.message);
                    } else {
                        this.showError("Something went wrong!");
                    }
                });
        },
        downloadJSON(row) {
            const data = this.convertInJsonData(row.json_data);

            const json = JSON.stringify(data, null, 2);
            const blob = new Blob([json], { type: 'application/json' });
            const url = URL.createObjectURL(blob);

            const link = document.createElement('a');
            link.href = url;
            link.download = row.code + '.json';
            link.click();

            // Clean up the object URL
            URL.revokeObjectURL(url);
        },

        convertInJsonData(data) {
            data = JSON.parse(data);
            if (Array.isArray(data)) {
                data = data[0];
            }
            return data;
        },

        deleteRecord(index, id) {
            this.$swal.fire({
                title: "Are you Sure?",
                text: "You want be able to revert this",
                confirmButtonText: "Yes, Sure",
                cancelButtonText: "Cancel",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: 'var(--theme-primary-500)',
                cancelButtonColor: 'var(--theme-error-500)',
            }).then(result => {
                if (result.value) {
                    this.isLoading = true
                    let postData = {
                        id: id
                    }
                    axios.post(this.$apiUrl + '/languages/delete', postData)
                        .then((response) => {
                            this.isLoading = false

                            let data = response.data;


                            if (data.status === 1) {
                                this.getRecords();
                                this.showMessage('success', data.message);
                            } else {
                                this.showError(data.message);
                            }

                        }).catch(error => {
                            this.isLoading = false;
                            if (error?.request?.statusText) {
                                this.showError(error.request.statusText);
                            } else if (error.message) {
                                this.showError(error.message);
                            } else {
                                this.showError("Something went wrong!");
                            }
                        });
                }
            });
        },

        showCreateModal() {
            let create = this.$route.params.create;
            if (create) {
                this.create_new = true;
            }
        },
        hideModal() {
            this.create_new = false
            this.edit_record = false
            this.$router.push({ path: '/languages' });
        },
        openEditModal(languageGroup) {
            this.selectedLanguageGroup = languageGroup;
            this.editDisplayName = languageGroup.display_name || '';
            this.editIsDefault = languageGroup.has_default ? 1 : 0;
            // Get status from the first language in the group (all should have the same status)
            this.editStatus = languageGroup.languages[0]?.status ?? 1;
            this.$refs['edit-language-modal'].show();
        },
        closeEditModal() {
            this.editJsonFiles = {};
            this.selectedLanguageGroup = null;
            this.editDisplayName = '';
            this.editIsDefault = 0;
            this.editStatus = 1;
            this.$refs['edit-language-modal'].hide();
        },
        handleEditJsonFile(input, systemTypeId) {
            const file = input.files[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const parsed = JSON.parse(e.target.result);
                    this.$set(this.editJsonFiles, systemTypeId, { name: file.name, data: JSON.stringify(parsed) });
                } catch (err) {
                    this.$delete(this.editJsonFiles, systemTypeId);
                    input.value = '';
                    this.showError(__('invalid_json_format') + ': ' + err.message);
                }
            };
            reader.readAsText(file);
        },
        dropEditJsonFile(event, systemTypeId) {
            event.preventDefault();
            const input = this.$refs['edit_json_file_' + systemTypeId][0];
            input.files = event.dataTransfer.files;
            this.handleEditJsonFile(input, systemTypeId);
            if (event.currentTarget) {
                event.currentTarget.classList.add('bg-gray-100');
                event.currentTarget.classList.remove('bg-green-300');
            }
        },
        openJsonEditModal(systemType, languageGroup) {
            const langRecord = languageGroup.languages.find(l => l.system_type == systemType.id);

            if (langRecord) {
                this.jsonEditRecord = langRecord;
                this.jsonEditSystemType = systemType;
            } else {
                this.jsonEditRecord = {
                    id: null,
                    supported_language_id: languageGroup.supported_language_id,
                    system_type: systemType.id,
                    json_data: '{}',
                    display_name: languageGroup.display_name,
                    is_default: 0,
                    status: 1
                };
                this.jsonEditSystemType = systemType;
            }
        },
        closeJsonEditModal() {
            this.jsonEditRecord = null;
            this.jsonEditSystemType = null;
            this.getRecords();
        },
        saveLanguageSettings() {
            if (!this.selectedLanguageGroup) return;

            this.isSaving = true;

            const updatePromises = this.selectedLanguageGroup.languages.map(lang => {
                const formData = new FormData();
                formData.append('id', lang.id);
                formData.append('system_type', lang.system_type);
                formData.append('supported_language', lang.supported_language_id);
                formData.append('display_name', this.editDisplayName);
                const uploaded = this.editJsonFiles[lang.system_type];
                formData.append('json_data', uploaded ? uploaded.data : lang.json_data);
                formData.append('is_default', this.editIsDefault);
                formData.append('status', this.editStatus);

                return axios.post(this.$apiUrl + '/languages/update', formData);
            });

            // A file dropped for a system type this language has no row for yet creates that row.
            const existingTypes = this.selectedLanguageGroup.languages.map(l => String(l.system_type));
            Object.keys(this.editJsonFiles).filter(id => !existingTypes.includes(String(id))).forEach(id => {
                const formData = new FormData();
                formData.append('system_type', id);
                formData.append('supported_language', this.selectedLanguageGroup.supported_language_id);
                formData.append('json_data', this.editJsonFiles[id].data);
                formData.append('display_name', this.editDisplayName);
                formData.append('is_default', 0);
                formData.append('status', this.editStatus);
                updatePromises.push(axios.post(this.$apiUrl + '/languages/update_json', formData));
            });

            Promise.all(updatePromises)
                .then(responses => {
                    for (let i = 0; i < responses.length; i++) {
                        const response = responses[i];
                        const data = response.data;

                        if (data.status !== 1) {
                            this.isSaving = false;
                            const errorMessage = data.message || __('something_went_wrong');
                            this.showError(errorMessage);
                            return;
                        }
                    }

                    this.isSaving = false;
                    const message = responses[0]?.data?.message || __('language_updated_successfully');
                    this.showMessage('success', message);
                    this.closeEditModal();
                    this.getRecords();
                })
                .catch(error => {
                    this.isSaving = false;

                    let errorMessage = __('something_went_wrong');

                    if (error.response && error.response.data) {
                        if (error.response.data.message) {
                            errorMessage = error.response.data.message;
                        } else if (error.response.data.error) {
                            errorMessage = error.response.data.error;
                        }
                    } else if (error.request && error.request.statusText) {
                        errorMessage = error.request.statusText;
                    } else if (error.message) {
                        errorMessage = error.message;
                    }

                    this.showError(errorMessage);
                });
        },
        // Get system type name by ID
        getSystemTypeName(systemTypeId) {
            const systemType = this.system_types.find(st => st.id == systemTypeId);
            return systemType ? systemType.name : '';
        },
        downloadSampleFile(fileName, systemTypeName) {
            const fileUrl = this.$baseUrl + '/sample-file/' + fileName;

            // Create a temporary anchor element to trigger download
            const link = document.createElement('a');
            link.href = fileUrl;
            link.download = fileName;
            link.target = '_blank';

            // Append to body, click, and remove
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            // Show success message
            this.showMessage('success', __('sample_file_downloaded') + ': ' + systemTypeName);
        },
        deleteLanguageGroup(languageGroup) {
            const languageName = languageGroup.name;
            const deletedCode = languageGroup.code;

            this.$swal.fire({
                title: __('are_you_sure'),
                text: __('you_will_not_be_able_to_revert_this'),
                confirmButtonText: __('yes_sure'),
                cancelButtonText: __('cancel'),
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: 'var(--theme-primary-500)',
                cancelButtonColor: 'var(--theme-error-500)',
            }).then(result => {
                if (result.value) {
                    this.isLoading = true;
                    // Backend deletes every row sharing this supported_language_id in one shot
                    // (all system-type entries for this language), so a single request is
                    // enough - sending one per row raced against that: the first call's delete
                    // already wiped the rest, so their calls came back "language_not_found" and
                    // got treated as a failure even though the language was fully deleted.
                    axios.post(this.$apiUrl + '/languages/delete', { id: languageGroup.languages[0].id })
                        .then((response) => {
                            this.isLoading = false;
                            this.getRecords();
                            const failed = response.data && response.data.status !== 1;
                            if (failed) {
                                this.showError(response.data.message || __('something_went_wrong'));
                            } else {
                                this.showMessage('success', response.data?.message || __('language_deleted_successfully'));
                                this.$eventBus.$emit('languagesUpdated');
                            }

                            // The header language dropdown persists its selection in
                            // localStorage independently of this page - if the language just
                            // deleted was the one currently active there, it's left pointing at
                            // a code that no longer exists. Reload so it falls back to default.
                            if (!failed && deletedCode && window.localStorage.getItem('lang') === deletedCode) {
                                window.localStorage.removeItem('lang');
                                window.location.reload();
                            }
                        })
                        .catch(error => {
                            this.isLoading = false;
                            this.getRecords();
                            if (error.response && error.response.data && error.response.data.message) {
                                this.showError(error.response.data.message);
                            } else {
                                this.showError(__('something_went_wrong'));
                            }
                        });
                }
            });
        },
    },
    beforeDestroy() {
        this.$eventBus.$off('recordSaved');
    }
};
</script>

<style scoped>
.lang-name {
    font-weight: 600;
    color: var(--ui-heading);
}
</style>
