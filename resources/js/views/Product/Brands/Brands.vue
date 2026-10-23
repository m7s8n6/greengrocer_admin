<template>
    <div>
        <div class="page-heading">
            <div class="page-title d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
                <h3 class="modern-page-title mb-0">{{ __('brands') }}</h3>
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb mb-0">
                        <li class="breadcrumb-item">
                            <router-link to="/dashboard" class="text-muted">{{ __('dashboard') }}</router-link>
                        </li>
                        <li class="breadcrumb-item active text-primary" aria-current="page">{{ __('brands') }}</li>
                    </ol>
                </nav>
            </div>
        </div>

        <!-- Global Background Colors Section -->
        <section class="section mb-3">
            <div class="card figma-main-section-card bg-colors-card mb-0">
                <div class="card-header d-flex justify-content-between align-items-center gap-2">
                    <h4 class="card-title mb-0">{{ __('items_background_colors') || 'Items Background Colors' }}</h4>
                    <b-button size="sm" variant="primary" @click="saveGlobalColors" :disabled="isSavingGlobal">
                        {{ __('save') }}
                        <b-spinner v-if="isSavingGlobal" small class="ml-1"></b-spinner>
                    </b-button>
                </div>
                <div class="card-body">
                    <div class="row">
                        <div class="col-lg-4 form-group mb-3 mb-lg-0">
                            <label class="form-label d-block">{{ __('items_background_color_mode') || 'Items Background Colour' }}</label>
                            <div class="form-check form-check-inline d-inline-block">
                                <input class="form-check-input" type="radio" id="colorModeGlobal" value="global" v-model="globalSettings.brand_background_color_mode">
                                <label class="form-check-label ms-1" for="colorModeGlobal">{{ __('global') || 'Global' }}</label>
                            </div>
                            <div class="form-check form-check-inline d-inline-block ms-3">
                                <input class="form-check-input" type="radio" id="colorModeItemWise" value="item-wise" v-model="globalSettings.brand_background_color_mode">
                                <label class="form-check-label ms-1" for="colorModeItemWise">{{ __('item_wise') || 'Item Wise' }}</label>
                            </div>
                        </div>
                        <template v-if="globalSettings.brand_background_color_mode === 'global'">
                        <div class="col-md-6 col-lg-4 form-group mb-3 mb-lg-0">
                            <label>{{ __('brand_light_theme_background') || 'Brand Light Theme Background' }}</label>
                            <div class="color-field d-flex w-100 mt-1">
                                <input type="text" v-model="globalSettings.brand_background_color_light_theme" class="form-control">
                                <input type="color" :value="(globalSettings.brand_background_color_light_theme && globalSettings.brand_background_color_light_theme.startsWith('#') && (globalSettings.brand_background_color_light_theme.length === 4 || globalSettings.brand_background_color_light_theme.length === 7 || globalSettings.brand_background_color_light_theme.length === 9)) ? globalSettings.brand_background_color_light_theme.substring(0, 7) : '#ffffff'" @input="globalSettings.brand_background_color_light_theme = $event.target.value" class="form-control cursor-pointer color-swatch">
                                <b-button size="sm" variant="outline-secondary" @click="globalSettings.brand_background_color_light_theme = '#ffffff00'">
                                    {{ __('transparent') || 'Transparent' }}
                                </b-button>
                            </div>
                        </div>
                        <div class="col-md-6 col-lg-4 form-group mb-0">
                            <label>{{ __('brand_dark_theme_background') || 'Brand Dark Theme Background' }}</label>
                            <div class="color-field d-flex w-100 mt-1">
                                <input type="text" v-model="globalSettings.brand_background_color_dark_theme" class="form-control">
                                <input type="color" :value="(globalSettings.brand_background_color_dark_theme && globalSettings.brand_background_color_dark_theme.startsWith('#') && (globalSettings.brand_background_color_dark_theme.length === 4 || globalSettings.brand_background_color_dark_theme.length === 7 || globalSettings.brand_background_color_dark_theme.length === 9)) ? globalSettings.brand_background_color_dark_theme.substring(0, 7) : '#000000'" @input="globalSettings.brand_background_color_dark_theme = $event.target.value" class="form-control cursor-pointer color-swatch">
                                <b-button size="sm" variant="outline-secondary" @click="globalSettings.brand_background_color_dark_theme = '#00000000'">
                                    {{ __('transparent') || 'Transparent' }}
                                </b-button>
                            </div>
                        </div>
                        </template>
                    </div>
                </div>
            </div>
        </section>

        <section class="section">
            <div class="card figma-main-section-card">
                <div class="card-body p-0">
                    <!-- Modern Filter Action Bar -->
                    <div class="d-flex justify-content-between align-items-center flex-wrap gap-2 figma-action-bar-row">
                        <div class="flex-grow-1">
                            <div class="figma-search-container">
                                <i class="fa fa-search text-muted"></i>
                                <input v-model="filter" type="text" class="figma-search-input"
                                    :placeholder="__('search') || 'Search...'" @input="getRecords()">
                            </div>
                        </div>
                        <div class="d-flex flex-wrap gap-2">
                            <div class="view-toggle" role="group" :aria-label="__('view')">
                                <button type="button" class="view-toggle-btn" :class="{ active: viewMode === 'grid' }" @click="setViewMode('grid')" v-b-tooltip.hover :title="__('grid_view')"><i class="bi bi-grid-3x3-gap-fill"></i></button>
                                <button type="button" class="view-toggle-btn" :class="{ active: viewMode === 'list' }" @click="setViewMode('list')" v-b-tooltip.hover :title="__('list_view')"><i class="bi bi-list-ul"></i></button>
                            </div>
                            <button class="btn btn-figma-columns d-flex align-items-center gap-2" @click="getRecords()"
                                v-b-tooltip.hover :title="__('refresh')">
                                <i class="fa fa-refresh"></i>
                                <span>{{ __('refresh') || 'Refresh' }}</span>
                            </button>
                            <button class="btn btn-figma-filter d-flex align-items-center gap-2"
                                @click="edit_record = true">
                                <i class="fa fa-plus"></i>
                                <span>{{ __('add_brand') }}</span>
                            </button>
                        </div>
                    </div>

                    <!-- Grid view (same rows / handlers as the table list view; API pages on the server) -->
                    <div v-if="viewMode === 'grid'">
                        <div v-if="isLoading" class="item-grid-state">
                            <i class="bi bi-hourglass-split"></i>
                            <span>{{ __('loading') }}...</span>
                        </div>
                        <div v-else-if="!translatedBrands.length" class="item-grid-state">
                            <i class="bi bi-inbox"></i>
                            <span>{{ __('no_records_to_show') }}</span>
                        </div>
                        <div v-else class="item-grid">
                            <div v-for="brand in pagedItems(translatedBrands)" :key="brand.id" class="item-card">
                                <div class="item-card-media">
                                    <img :src="brand.image ? ($storageUrl + brand.image) : $placeholderImage" :alt="brand.name" />
                                </div>
                                <div class="item-card-body">
                                    <div class="item-card-title" :title="brand.name">{{ brand.name }}</div>
                                    <div class="item-card-meta">#{{ brand.id }}</div>
                                </div>
                                <div class="item-card-footer">
                                    <span v-if="brand.status == 1" class="badge bg-success">{{ __('active') }}</span>
                                    <span v-else class="badge bg-danger">{{ __('deactive') }}</span>
                                    <div class="item-card-actions">
                                        <button class="figma-action-btn" @click="edit_record = brand"
                                            v-b-tooltip.hover :title="__('edit')">
                                            <base-icon name="edit icon" hoverName="edit Hover" width="20" height="20" />
                                        </button>
                                        <button class="figma-action-btn" @click="deleteRecord(translatedBrands.indexOf(brand), brand.id)"
                                            v-b-tooltip.hover :title="__('delete')">
                                            <base-icon name="Type=Default" hoverName="Type=Hover" width="20" height="20" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <b-table v-else :items="translatedBrands" :fields="fields" :sort-by.sync="sortBy"
                        :sort-desc.sync="sortDesc" :sort-direction="sortDirection" :bordered="false" :busy="isLoading"
                        stacked="md" show-empty responsive :tbody-tr-class="() => 'figma-tr align-middle'" small
                        class="figma-order-table mb-0">
                        <template #table-busy>
                            <div class="text-center text-black my-2">
                                <b-spinner class="align-middle"></b-spinner>
                                <strong>{{ __('loading') }}...</strong>
                            </div>
                        </template>

                        <template #cell(id)="row">
                            {{ row.item.id }}
                        </template>

                        <template #cell(image)="row">
                            <img :src="row.item.image ? ($storageUrl + row.item.image) : $placeholderImage" height="50" class="brand-thumb" />
                        </template>

                        <template #cell(status)="row">
                            <span v-if="row.item.status == 1" class="badge bg-success">{{ __('active') }}</span>
                            <span v-else class="badge bg-danger">{{ __('deactive') }}</span>
                        </template>

                        <template #cell(actions)="row">
                            <div class="d-flex gap-2">
                                <button class="figma-action-btn" @click="edit_record = row.item" v-b-tooltip.hover
                                    :title="__('edit')">
                                    <base-icon name="edit icon" hoverName="edit Hover" width="24" height="24" />
                                </button>
                                <button class="figma-action-btn" @click="deleteRecord(row.index, row.item.id)"
                                    v-b-tooltip.hover :title="__('delete')">
                                    <base-icon name="Type=Default" hoverName="Type=Hover" width="24" height="24" />
                                </button>
                            </div>
                        </template>
                    </b-table>
                </div>
                <div class="figma-table-footer flex-wrap gap-3">
                    <div class="d-flex align-items-center gap-2">
                        <label class="showing-results-text mb-0">{{ __('per_page') }}</label>
                        <b-form-select v-model="perPage" :options="pageOptions" size="sm"
                            class="w-auto"></b-form-select>
                                <table-count :current-page="currentPage" :per-page="perPage" :total-rows="totalRows"></table-count>
                    </div>
                    <div class="d-flex align-items-center gap-3">
                        <b-pagination v-model="currentPage" :total-rows="totalRows" :per-page="perPage" align="right"
                            class="figma-pagination mb-0" hide-goto-end-buttons hide-ellipsis prev-text="<"
                            next-text=">"></b-pagination>
                    </div>
                </div>
            </div>
        </section>

        <!-- Add / Edit -->
        <app-edit-record v-if="edit_record" :record="edit_record" :globalColors="globalSettings" @modalClose="edit_record = null"
            @saved="onBrandSaved"></app-edit-record>
    </div>
</template>

<script>
import { VuejsDatatableFactory } from 'vuejs-datatable';
import EditRecord from './Edit.vue';
import ViewModeMixin from '../../../mixins/ViewModeMixin';

export default {
    mixins: [ViewModeMixin],
    components: {
        VuejsDatatableFactory,
        'app-edit-record': EditRecord,
    },
    data() {
        return {
            fields: [
                { key: 'id', label: __('id'), class: 'text-center', sortable: true, sortDirection: 'desc' },
                { key: 'name', label: __('name'), class: 'text-center' },
                { key: 'image', label: __('image'), class: 'text-center' },
                {
                    key: 'status', label: __('status'), class: 'text-center', formatter: (value) => {
                        return value == 1 ? __('active') : __('deactive');
                    }
                },
                { key: 'actions', label: __('actions') }
            ],
            totalRows: 0,
            currentPage: 1,
            perPage: this.$perPage || 10,
            pageOptions: this.$pageOptions || [5, 10, 15, 20],
            sortBy: '',
            sortDesc: false,
            sortDirection: 'asc',
            filter: null,
            // API returns one page (page/per_page): grid shows the array as is
            serverPagination: true,
            filterOn: ['id', 'name', 'status'],
            isLoading: false,
            brands: [],
            edit_record: null,
            currentLanguageId: null,
            activeLanguages: [],
            globalSettings: {
                brand_background_color_mode: 'global',
                brand_background_color_light_theme: '',
                brand_background_color_dark_theme: ''
            },
            isSavingGlobal: false
        }
    },

    computed: {
        translatedBrands() {
            if (!this.currentLanguageId || this.brands.length === 0) {
                return this.brands;
            }

            return this.brands.map(brand => {
                const translatedBrand = { ...brand };

                if (brand.translations && Array.isArray(brand.translations)) {
                    const translation = brand.translations.find(
                        t => Number(t.language_id) === Number(this.currentLanguageId)
                    );
                    if (translation && translation.name && translation.name.trim() !== '') {
                        translatedBrand.name = translation.name;
                    }
                }

                return translatedBrand;
            });
        },
    },
    created() {
        this.fetchGlobalColors();
        this.fetchActiveLanguages().then(() => {
            this.getRecords();
        });
    },
    watch: {
        currentPage() {
            this.getRecords();
        },
        perPage() {
            this.getRecords();
        }
    },
    methods: {
        fetchGlobalColors() {
            axios.get(this.$apiUrl + '/web_settings').then((response) => {
                let settings = response.data.data.settingsObject;
                this.globalSettings.brand_background_color_mode = settings.brand_background_color_mode || 'global';
                this.globalSettings.brand_background_color_light_theme = settings.brand_background_color_light_theme || '';
                this.globalSettings.brand_background_color_dark_theme = settings.brand_background_color_dark_theme || '';
            });
        },
        saveGlobalColors() {
            this.isSavingGlobal = true;
            let formData = new FormData();
            formData.append('brand_background_color_mode', this.globalSettings.brand_background_color_mode || 'global');
            formData.append('brand_background_color_light_theme', this.globalSettings.brand_background_color_light_theme || '');
            formData.append('brand_background_color_dark_theme', this.globalSettings.brand_background_color_dark_theme || '');
            
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
            console.log("data fetch");

            return axios.get(this.$apiUrl + '/active_languages')
                .then(response => {
                    this.activeLanguages = response.data.data || [];

                    const appLocale = window.appLocale || 'en';

                    const currentLanguage = this.activeLanguages.find(
                        lang => lang.code === appLocale
                    );

                    if (currentLanguage) {
                        this.currentLanguageId = currentLanguage.id;
                    } else {
                        const defaultLang = this.activeLanguages.find(l => l.is_default === 1);
                        if (defaultLang) {
                            this.currentLanguageId = defaultLang.id;
                        }
                    }

                    console.log('Languages:', this.activeLanguages);
                    console.log('Current language ID:', this.currentLanguageId);

                });
        },

        getRecords() {

            this.isLoading = true;
            axios.get(this.$apiUrl + '/products/brands', {
                params: {
                    page: this.currentPage,
                    per_page: this.perPage,
                    filter: this.filter
                }
            }).then((response) => {
                this.isLoading = false;
                const data = response.data;
                this.brands = data.data;
                this.totalRows = data.total;

            }).catch(() => {
                this.isLoading = false;
            });
        },
        onBrandSaved(message) {
            this.showMessage('success', message);
            this.getRecords();
            this.edit_record = null;
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
                    this.isLoading = true;
                    axios.post(this.$apiUrl + '/products/brands/delete', { id })
                        .then((response) => {
                            this.isLoading = false;
                            this.brands.splice(index, 1);
                            this.showMessage('success', response.data.message);
                        }).catch(() => {
                            this.isLoading = false;
                        });
                }
            });
        },
    }
};
</script>

<style scoped>
.bg-colors-card .form-check-inline {
    margin-right: 16px;
}
</style>
