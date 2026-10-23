<template>
    <div>
        <div class="page-heading">
            <div class="page-title mb-3">
                <div class="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-2">
                    <h3 class="mb-0">{{ __('manage_countries') }}</h3>
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb mb-0">
                            <li class="breadcrumb-item"><router-link to="/dashboard">{{ __('dashboard') }}</router-link>
                            </li>
                            <li class="breadcrumb-item active" aria-current="page">{{ __('manage_countries') }}</li>
                        </ol>
                    </nav>
                </div>
            </div>

            <!-- Global Background Colors Section -->
            <section class="section mb-4">
                <div class="card mb-0">
                    <div class="card-header">
                        <h4 class="card-title mb-0 text-start float-none">{{ __('items_background_colors') || 'Items Background Colors' }}</h4>
                        <p class="text-muted small mb-0 mt-1">{{ tr('items_background_colors_desc', 'Background colour used behind country items in the apps, globally or per country.') }}</p>
                    </div>
                    <div class="card-body">
                        <div class="row mb-3">
                            <div class="col-md-12">
                                <label class="form-label d-block">{{ __('items_background_color_mode') || 'Items Background Colour' }}</label>
                                <div class="d-flex flex-wrap align-items-center gap-2 gap-sm-3">
                                    <div class="form-check form-check-inline m-0">
                                        <input class="form-check-input" type="radio" id="colorModeGlobal" value="global" v-model="globalSettings.country_background_color_mode">
                                        <label class="form-check-label ms-1" for="colorModeGlobal">{{ __('global') || 'Global' }}</label>
                                    </div>
                                    <div class="form-check form-check-inline m-0">
                                        <input class="form-check-input" type="radio" id="colorModeItemWise" value="item-wise" v-model="globalSettings.country_background_color_mode">
                                        <label class="form-check-label ms-1" for="colorModeItemWise">{{ __('item_wise') || 'Item Wise' }}</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row" v-if="globalSettings.country_background_color_mode === 'global'">
                            <div class="col-md-6 form-group mb-3 mb-md-0">
                                <label>{{ __('country_light_theme_background') || 'Country Light Theme Background' }}</label>
                                <div class="d-flex flex-wrap align-items-center gap-2 w-100 category-color-row">
                                    <input type="text" v-model="globalSettings.country_background_color_light_theme" class="form-control category-color-text">
                                    <input type="color" :value="(globalSettings.country_background_color_light_theme && globalSettings.country_background_color_light_theme.startsWith('#') && (globalSettings.country_background_color_light_theme.length === 4 || globalSettings.country_background_color_light_theme.length === 7 || globalSettings.country_background_color_light_theme.length === 9)) ? globalSettings.country_background_color_light_theme.substring(0, 7) : '#ffffff'" @input="globalSettings.country_background_color_light_theme = $event.target.value" class="form-control cursor-pointer color-swatch-input">
                                    <b-button size="sm" variant="outline-secondary" @click="globalSettings.country_background_color_light_theme = '#ffffff00'">
                                        {{ __('transparent') || 'Transparent' }}
                                    </b-button>
                                </div>
                            </div>
                            <div class="col-md-6 form-group mb-0">
                                <label>{{ __('country_dark_theme_background') || 'Country Dark Theme Background' }}</label>
                                <div class="d-flex flex-wrap align-items-center gap-2 w-100 category-color-row">
                                    <input type="text" v-model="globalSettings.country_background_color_dark_theme" class="form-control category-color-text">
                                    <input type="color" :value="(globalSettings.country_background_color_dark_theme && globalSettings.country_background_color_dark_theme.startsWith('#') && (globalSettings.country_background_color_dark_theme.length === 4 || globalSettings.country_background_color_dark_theme.length === 7 || globalSettings.country_background_color_dark_theme.length === 9)) ? globalSettings.country_background_color_dark_theme.substring(0, 7) : '#000000'" @input="globalSettings.country_background_color_dark_theme = $event.target.value" class="form-control cursor-pointer color-swatch-input">
                                    <b-button size="sm" variant="outline-secondary" @click="globalSettings.country_background_color_dark_theme = '#00000000'">
                                        {{ __('transparent') || 'Transparent' }}
                                    </b-button>
                                </div>
                            </div>
                        </div>
                        <div class="d-flex justify-content-end border-top pt-3 mt-3">
                            <b-button variant="primary" @click="saveGlobalColors" :disabled="isSavingGlobal">
                                {{ __('save') }}
                                <b-spinner v-if="isSavingGlobal" small class="ml-1"></b-spinner>
                            </b-button>
                        </div>
                    </div>
                </div>
            </section>

            <div class="row">
                <div class="col-12 col-md-12 order-md-1 order-last">
                    <div class="figma-main-section-card">
                        <div class="card-body p-0">
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
                                        @click="getRecords()" v-b-tooltip.hover :title="__('refresh')">
                                        <i class="fa fa-refresh"></i>
                                        <span>{{ __('refresh') }}</span>
                                    </button>
                                    <router-link to="/countries/create"
                                        class="btn btn-figma-filter d-flex align-items-center gap-2"
                                        v-if="$can('country_create')">
                                        <i class="fa fa-plus"></i>
                                        <span>{{ __('add_country') }}</span>
                                    </router-link>
                                </div>
                            </div>

                            <div class="table-responsive">
                                <b-table :items="translatedCountries" :fields="fields" :current-page="currentPage"
                                    :per-page="perPage" :filter="filter" :filter-included-fields="filterOn"
                                    :sort-by.sync="sortBy" :sort-desc.sync="sortDesc" :sort-direction="sortDirection"
                                    :bordered="false" :busy="isLoading" stacked="md" show-empty small
                                    class="figma-table mb-0" :tbody-tr-class="() => 'figma-tr align-middle'">
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
                                    <template #cell(logo)="row">
                                        <img :src="row.item.logo ? ($storageUrl + row.item.logo) : $placeholderImage" height="40" class="rounded" />
                                    </template>
                                    <template #cell(is_default)="row">
                                        <span v-if="row.item.is_default == 1" class="badge bg-success">{{ __('yes')
                                        }}</span>
                                        <span v-else class="badge bg-danger">{{ __('no') }}</span>
                                    </template>

                                    <template #cell(status)="row">
                                        <span class='badge bg-success' v-if="row.item.status == 1">{{ __('active')
                                            }}</span>
                                        <span class='badge bg-danger' v-if="row.item.status == 0">{{ __('deactive')
                                        }}</span>
                                    </template>

                                    <template #cell(actions)="row">
                                        <div class="d-flex gap-2">
                                            <button v-if="$can('country_update')" class="figma-action-btn"
                                                @click="edit_record = row.item" v-b-tooltip.hover :title="__('edit')">
                                                <base-icon name="edit icon" hoverName="edit Hover" width="24"
                                                    height="24" />
                                            </button>
                                            <button v-if="$can('country_delete')"
                                                class="figma-action-btn figma-delete-btn"
                                                @click="deleteRecord(row.index, row.item.id)" v-b-tooltip.hover
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
        <app-edit-record v-if="create_new || edit_record" :record="edit_record" :globalColors="globalSettings"
            @modalClose="hideModal()"></app-edit-record>
    </div>

</template>
<script>

import EditRecord from './Edit.vue';
import axios from "axios";


export default {
    components: {
        'app-edit-record': EditRecord,
    },
    data: function () {
        return {
            fields: [
                { key: 'id', label: __('id'), sortable: true, sortDirection: 'asc' },
                { key: 'name', label: __('name'), sortable: true, sortDirection: 'asc' },
                { key: 'dial_code', label: __('dial_code') },
                { key: 'code', label: __('code') },
                { key: 'logo', label: __('logo') },
                { key: 'status', label: __('status'), sortable: true, sortDirection: 'asc' },
                { key: 'actions', label: __('actions') }
            ],
            totalRows: 1,
            currentPage: 1,
            perPage: this.$perPage,
            pageOptions: this.$pageOptions,
            sortBy: 'id',
            sortDesc: false,
            sortDirection: 'asc',
            filter: null,
            filterOn: [],
            page: 1,
            isLoading: false,
            sectionStyle: 'style_1',
            max_visible_units: 12,
            max_col_in_single_row: 3,
            countries: [],
            sortBySL: 'id',
            sortDescSL: false,
            sortDirectionSL: 'asc',
            isSystemRefreshing: false,
            create_new: null,
            edit_record: null,
            currentLanguageId: null,
            activeLanguages: [],
            globalSettings: {
                country_background_color_mode: 'global',
                country_background_color_light_theme: '',
                country_background_color_dark_theme: ''
            },
            isSavingGlobal: false
        }
    },
    computed: {
        translatedCountries() {
            const list = Array.isArray(this.countries) ? this.countries : [];

            if (!this.currentLanguageId || list.length === 0) {
                return list;
            }

            return list.map(country => {
                const translatedCountry = { ...country };

                if (country.translations && Array.isArray(country.translations)) {
                    const translation = country.translations.find(
                        t => t.language_id === this.currentLanguageId
                    );

                    if (translation && translation.name && translation.name.trim() !== '') {
                        translatedCountry.name = translation.name;
                    }
                }

                return translatedCountry;
            });
        },

        pageStart() {
            if (this.totalRows === 0) return 0;
            return (this.currentPage - 1) * this.perPage + 1;
        },
        pageEnd() {
            return Math.min(this.currentPage * this.perPage, this.totalRows);
        },
        sortOptions() {
            // Create an options list from our fields
            return this.fields
                .filter(f => f.sortable)
                .map(f => {
                    return { text: f.label, value: f.key }
                })
        }
    },

    watch: {
        $route(to, from) {
            this.showCreateModal();
        }
    },
    created() {
        this.showCreateModal();

        this.recordSavedHandler = (message) => {
            this.showMessage('success', message);
            this.fetchActiveLanguages().then(() => {
                this.getRecords();
            });
            this.create_new = null;
        };
        this.$eventBus.$on('recordSaved', this.recordSavedHandler);

        this.fetchGlobalColors();
        this.fetchActiveLanguages().then(() => {
            this.getRecords();
        });
    },

    beforeDestroy() {
        this.$eventBus.$off('recordSaved', this.recordSavedHandler);
    },

    methods: {
        tr(key, fallback) {
            const v = this.__(key);
            return v && v !== key ? v : fallback;
        },
        fetchGlobalColors() {
            axios.get(this.$apiUrl + '/web_settings').then((response) => {
                let settings = response.data.data.settingsObject;
                this.globalSettings.country_background_color_mode = settings.country_background_color_mode || 'global';
                this.globalSettings.country_background_color_light_theme = settings.country_background_color_light_theme || '';
                this.globalSettings.country_background_color_dark_theme = settings.country_background_color_dark_theme || '';
            });
        },
        saveGlobalColors() {
            this.isSavingGlobal = true;
            let formData = new FormData();
            formData.append('country_background_color_mode', this.globalSettings.country_background_color_mode || 'global');
            formData.append('country_background_color_light_theme', this.globalSettings.country_background_color_light_theme || '');
            formData.append('country_background_color_dark_theme', this.globalSettings.country_background_color_dark_theme || '');
            
            axios.post(this.$apiUrl + '/web_settings/save', formData).then(res => {
                if (res.data.status === 1) {
                    this.showMessage("success", __('background_colors_saved_successfully') || 'Background Colors Saved Successfully.');
                } else {
                    this.showError(res.data.message);
                }
            }).catch(error => {
                this.showError(__('something_went_wrong'));
            }).finally(() => {
                this.isSavingGlobal = false;
            });
        },

        fetchActiveLanguages() {
            return axios.get(this.$apiUrl + '/active_languages')
                .then(response => {
                    if (response.data.data && Array.isArray(response.data.data)) {
                        this.activeLanguages = response.data.data;

                        const appLocale = window.appLocale || 'en';

                        const currentLanguage = this.activeLanguages.find(
                            lang => lang.code === appLocale
                        );

                        if (currentLanguage) {
                            this.currentLanguageId = currentLanguage.id;
                        } else {
                            const defaultLanguage = this.activeLanguages.find(
                                lang => lang.is_default === 1
                            );
                            if (defaultLanguage) {
                                this.currentLanguageId = defaultLanguage.id;
                            }
                        }
                    }
                })
                .catch(error => {
                    console.error('Error loading languages:', error);
                });
        },

        getRecords() {
            this.isLoading = true
            axios.get(this.$apiUrl + '/countries', {
            }).then((response) => {
                this.isLoading = false
                let data = response.data;
                this.countries = data.data;
                this.totalRows = this.countries.length
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
        deleteRecord(index, id) {
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
                    this.isLoading = true
                    let postData = {
                        id: id
                    }
                    axios.post(this.$apiUrl + '/countries/delete', postData)
                        .then((response) => {
                            this.isLoading = false
                            let data = response.data;
                            if (data.status === 1) {
                                // Find the index of the country in the array based on its id
                                const indexOfDeletedCountry = this.countries.findIndex(country => country.id === postData.id);

                                if (indexOfDeletedCountry !== -1) {
                                    // If the country is found in the array, remove it
                                    this.countries.splice(indexOfDeletedCountry, 1);
                                    this.showMessage('success', data.message);
                                } else {
                                    console.error("Country not found in the array.");
                                }
                            } else {
                                this.showError(data.message);
                            }
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
            this.$router.push({ path: '/countries' });
        },
    }
};
</script>

<style scoped>
.category-color-text {
    flex: 1 1 200px;
    min-width: 0;
}

/* Phones: the "Items Background Colors" card. The colour text field gets its own full row,
   the swatch + Transparent button sit on the next one, and the card header is more compact. */
@media (max-width: 575.98px) {
    .category-color-text {
        flex: 1 1 100%;
        min-width: 0;
    }

    .category-color-row > input[type="color"] {
        flex: 0 0 72px;
        max-width: 72px !important;
    }

    .card > .card-header {
        padding: 12px 16px !important;
    }

    .card > .card-header .card-title {
        font-size: 1rem;
        line-height: 1.3;
    }
}
</style>
