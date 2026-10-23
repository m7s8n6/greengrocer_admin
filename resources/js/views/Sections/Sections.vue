<template>
    <div>
        <div class="page-heading d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
            <h3 class="modern-page-title mb-0">{{ __('featured_section_to_show_product_exclusively') }}</h3>
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb mb-0">
                    <li class="breadcrumb-item">
                        <router-link to="/dashboard" class="text-muted">{{ __('dashboard') }}</router-link>
                    </li>
                    <li class="breadcrumb-item active text-primary" aria-current="page">{{ __('featured_sections') }}
                    </li>
                </ol>
            </nav>
        </div>
        <section class="section">
            <div class="card figma-main-section-card">
                <div class="card-header bg-transparent">
                    <h4 class="card-title mb-0 figma-card-title section-card-title">{{ __('featured_sections_of_app') }}</h4>
                </div>
                <div class="card-body p-0">
                    <!-- Modern Filter Action Bar -->
                    <div class="d-flex justify-content-between align-items-center flex-wrap gap-2 figma-action-bar-row">
                        <div class="flex-grow-1">
                            <div class="figma-search-container">
                                <i class="fa fa-search text-muted"></i>
                                <input v-model="filter" type="text" class="figma-search-input"
                                    :placeholder="__('search') || 'Search...'" @input="getSections()">
                            </div>
                        </div>
                        <div class="d-flex flex-wrap gap-2">
                            <div class="view-toggle" role="group" :aria-label="__('view')">
                                <button type="button" class="view-toggle-btn" :class="{ active: viewMode === 'grid' }" @click="setViewMode('grid')" v-b-tooltip.hover :title="__('grid_view')"><i class="bi bi-grid-3x3-gap-fill"></i></button>
                                <button type="button" class="view-toggle-btn" :class="{ active: viewMode === 'list' }" @click="setViewMode('list')" v-b-tooltip.hover :title="__('list_view')"><i class="bi bi-list-ul"></i></button>
                            </div>
                            <button class="btn btn-figma-columns d-flex align-items-center gap-2" @click="getSections()"
                                v-b-tooltip.hover :title="__('refresh')">
                                <i class="fa fa-refresh"></i>
                                <span>{{ __('refresh') }}</span>
                            </button>
                            <button class="btn btn-figma-filter d-flex align-items-center gap-2"
                                @click="create_new = true" v-if="$can('featured_section_create')">
                                <i class="fa fa-plus"></i>
                                <span>{{ __('add_sections') }}</span>
                            </button>
                        </div>
                    </div>

                    <!-- Grid view (same rows, search, sort and handlers as the list view) -->
                    <div v-if="viewMode === 'grid'">
                        <div v-if="isLoading" class="item-grid-state">
                            <i class="bi bi-hourglass-split"></i>{{ __('loading') }}...
                        </div>
                        <div v-else-if="!gridSections.length" class="item-grid-state">
                            <template v-if="filter && translatedSections.length"><i class="bi bi-search"></i>{{ __('no_records_matching_your_request') }}</template>
                            <template v-else><i class="bi bi-inbox"></i>{{ __('no_records_to_show') }}</template>
                        </div>
                        <div v-else class="item-grid item-grid--wide">
                            <div v-for="section in pagedItems(gridSections)" :key="section.id" class="item-card">
                                <div class="item-card-media section-card-styles">
                                    <div class="section-card-style">
                                        <img v-if="styleImage('app', section.style_app)" :src="styleImage('app', section.style_app)"
                                            class="section-card-style-img" alt="App Style" role="button"
                                            @click="openLightbox(styleImage('app', section.style_app))">
                                        <span v-else class="text-danger small">{{ section.style_app || 'Style Unknown' }}</span>
                                        <span class="section-card-style-label">{{ __('App Style:') }}</span>
                                    </div>
                                    <div class="section-card-style section-card-style--web">
                                        <img v-if="styleImage('web', section.style_web)" :src="styleImage('web', section.style_web)"
                                            class="section-card-style-img" alt="Web Style" role="button"
                                            @click="openLightbox(styleImage('web', section.style_web))">
                                        <span v-else class="text-danger small">{{ section.style_web || 'Style Unknown' }}</span>
                                        <span class="section-card-style-label">{{ __('Web Style:') }}</span>
                                    </div>
                                </div>
                                <div class="item-card-body">
                                    <div class="item-card-title">{{ section.title }}</div>
                                    <div v-if="section.short_description" class="item-card-meta" :title="section.short_description">{{ section.short_description }}</div>
                                    <div v-if="sectionCategories(section)" class="item-card-meta" :title="sectionCategories(section)">
                                        <i class="bi bi-tags"></i> {{ sectionCategories(section) }}
                                    </div>
                                    <div class="item-card-stats">
                                        <span v-if="section.product_type" class="item-card-chip"><i class="bi bi-box-seam"></i>{{ __(section.product_type) }}</span>
                                        <span v-if="section.position" class="item-card-chip"><i class="bi bi-layout-text-window"></i>{{ __(section.position === 'custom_below_shop_by_brands' ? 'below_shop_by_brands' : section.position) }}</span>
                                    </div>
                                </div>
                                <div class="item-card-footer">
                                    <span class="item-card-meta">#{{ section.id }}</span>
                                    <div class="item-card-actions">
                                        <button class="figma-action-btn" @click="edit_record = section"
                                            v-if="$can('featured_section_update')" v-b-tooltip.hover :title="__('edit')">
                                            <i class="bi bi-pencil-square"></i>
                                        </button>
                                        <button class="figma-action-btn figma-delete-btn"
                                            @click="deleteSection(translatedSections.indexOf(section), section.id)"
                                            v-if="$can('featured_section_delete')" v-b-tooltip.hover :title="__('delete')">
                                            <i class="bi bi-trash"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-else class="table-responsive">
                        <b-table :items="translatedSections" :fields="fields" :current-page="currentPage"
                            :per-page="perPage" :filter="filter" :filter-included-fields="filterOn"
                            :sort-by.sync="sortBy" :sort-desc.sync="sortDesc" :sort-direction="sortDirection"
                            :bordered="false" :busy="isLoading" stacked="md" show-empty
                            :tbody-tr-class="() => 'figma-tr align-middle'" small class="figma-order-table mb-0">

                            <template #table-busy>
                                <div class="text-center text-black my-2">
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

                            <template #cell(title)="row">
                                {{ row.item.title }}
                            </template>
                            <template #cell(short_description)="row">
                                {{ row.item.short_description }}
                            </template>

                            <template #cell(style)="row">
                                <div class="d-flex flex-column align-items-center gap-1 py-1">
                                    <span class="d-block text-muted small"><strong>{{ __('App Style:') }}</strong></span>
                                    <template v-if="['style_1', 'style_2', 'style_3', 'style_4'].includes(row.item.style_app)">
                                        <img :src="$baseUrl + '/images/app_style/App_Style_' + row.item.style_app.replace('style_', '') + '.jpg'" 
                                             class="style-thumb my-1" 
                                             alt="App Style"
                                             @click="openLightbox($baseUrl + '/images/app_style/App_Style_' + row.item.style_app.replace('style_', '') + '.jpg')">
                                    </template>
                                    <template v-else>
                                        <span class="text-danger small">{{ row.item.style_app || 'Style Unknown' }}</span>
                                    </template>

                                    <span class="d-block text-muted small mt-2"><strong>{{ __('Web Style:') }}</strong></span>
                                    <template v-if="['style_1', 'style_2', 'style_3', 'style_4'].includes(row.item.style_web)">
                                        <img :src="$baseUrl + '/images/web_style/Web_Style_' + row.item.style_web.replace('style_', '') + '.jpg'" 
                                             class="style-thumb style-thumb-web my-1" 
                                             alt="Web Style"
                                             @click="openLightbox($baseUrl + '/images/web_style/Web_Style_' + row.item.style_web.replace('style_', '') + '.jpg')">
                                    </template>
                                    <template v-else>
                                        <span class="text-danger small">{{ row.item.style_web || 'Style Unknown' }}</span>
                                    </template>
                                </div>
                            </template>

                            <template #cell(product_type)="row">
                                <template v-if="row.item.product_type === 'all_products'">{{ __('all_products')
                                    }}</template>
                                <template v-else-if="row.item.product_type === 'new_added_products'">{{
                                    __('new_added_products') }}</template>
                                <template v-else-if="row.item.product_type === 'on_sale_products'">{{
                                    __('on_sale_products') }}</template>
                                <template v-else-if="row.item.product_type === 'recently_visited_products'">{{
                                    __('recently_visited_products') }}</template>
                                <template v-else-if="row.item.product_type === 'most_selling_products'">{{
                                    __('most_selling_products') }}</template>
                                <template v-else-if="row.item.product_type === 'custom_products'">{{
                                    __('custom_products') }}</template>
                                <template v-else>{{ row.item.product_type }}</template>
                            </template>

                            <template #cell(category_ids)="row">
                                {{ Array.isArray(row.item.category_names) && row.item.category_names.length > 0 
                                    ? row.item.category_names.join(', ') 
                                    : (Array.isArray(row.item.category_ids) ? row.item.category_ids.join(', ') : row.item.category_ids) }}
                            </template>

                            <template #cell(position)="row">
                                <template v-if="row.item.position === 'top'">{{ __('top') }}</template>
                                <template v-else-if="row.item.position === 'below_slider'">{{ __('below_slider') }}</template>
                                <template v-else-if="row.item.position === 'below_category'">{{ __('below_category') }}</template>
                                <template v-else-if="row.item.position === 'below_shop_by_seller'">{{ __('below_shop_by_seller') }}</template>
                                <template v-else-if="row.item.position === 'below_shop_by_country_of_origin'">{{ __('below_shop_by_country_of_origin') }}</template>
                                <template v-else-if="row.item.position === 'custom_below_shop_by_brands'">{{ __('below_shop_by_brands') }}</template>
                                <template v-else>{{ row.item.position }}</template>
                            </template>

                            <template #cell(actions)="row">
                                <div class="d-flex gap-2">
                                    <button class="figma-action-btn" @click="edit_record = row.item"
                                        v-if="$can('featured_section_update')" v-b-tooltip.hover :title="__('edit')">
                                        <base-icon name="edit icon" hoverName="edit Hover" width="24" height="24" />
                                    </button>
                                    <button class="figma-action-btn figma-delete-btn"
                                        @click="deleteSection(translatedSections.indexOf(row.item), row.item.id)"
                                        v-if="$can('featured_section_delete')" v-b-tooltip.hover :title="__('delete')">
                                        <base-icon name="Type=Default" hoverName="Type=Hover" width="24" height="24" />
                                    </button>
                                </div>
                            </template>
                        </b-table>
                    </div>

                    <div class="figma-table-footer flex-wrap gap-3">
                        <div class="d-flex align-items-center gap-2">
                            <label class="showing-results-text mb-0">{{ __('per_page') }}</label>
                            <b-form-select v-model="perPage" :options="pageOptions" size="sm" class="w-auto"></b-form-select>
                                <table-count :current-page="currentPage" :per-page="perPage" :total-rows="totalRows"></table-count>
                        </div>
                        <b-pagination v-model="currentPage" :total-rows="totalRows" :per-page="perPage" align="right"
                            class="figma-pagination mb-0" hide-goto-end-buttons hide-ellipsis prev-text="<" next-text=">"></b-pagination>
                    </div>
                </div>
            </div>
        </section>

        <!-- Add / Edit -->
        <app-edit-record v-if="create_new || edit_record" @saved="handleSectionSaved" :record="edit_record"
            @modalClose="hideModal()"></app-edit-record>

        <FsLightbox :toggler="toggler" :sources="lightboxSources" :onClose="handleClose"></FsLightbox>
    </div>
</template>

<script>
import EditRecord from './Edit';
import FsLightbox from "fslightbox-vue";
import ViewModeMixin from '../../mixins/ViewModeMixin';

export default {
    mixins: [ViewModeMixin],
    components: {
        'app-edit-record': EditRecord,
        FsLightbox,
    },
    data: function () {
        return {
            fields: [
                { key: 'id', label: __('id'), sortable: true, sortDirection: 'desc' },
                { key: 'title', label: __('title'), sortable: true, class: 'text-center' },
                { key: 'short_description', label: __('short_description'), sortable: true, class: 'text-center' },
                { key: 'style', label: __('style'), sortable: true, class: 'text-center' },
                { key: 'product_type', label: __('product_type'), sortable: true, class: 'text-center' },
                { key: 'category_ids', label: __('category_ids'), sortable: true, class: 'text-center' },
                { key: 'position', label: __('position'), sortable: true, class: 'text-center' },
                { key: 'actions', label: __('actions') }
            ],
            totalRows: 1,
            currentPage: 1,
            perPage: this.$perPage,
            pageOptions: this.$pageOptions,
            sortBy: '',
            sortDesc: false,
            sortDirection: 'asc',
            filter: null,
            filterOn: [],
            page: 1,

            isLoading: false,
            sectionStyle: 'style_1',
            max_visible_units: 12,
            max_col_in_single_row: 3,
            create_new: null,
            edit_record: null,
            sections: [],
            toggler: false,
            lightboxSources: [],
            slide: 1,
            currentLanguageId: null,
            activeLanguages: []

        }
    },
    computed: {
        // Grid view rows: translatedSections with the list view's search + sort applied
        gridSections() {
            return this.gridFilterSort(this.translatedSections, this.filterOn);
        },
        translatedSections() {
            if (!this.currentLanguageId || this.sections.length === 0) {
                return this.sections;
            }

            return this.sections.map(section => {
                const translatedSection = { ...section };

                // Get main table data for fallback
                const mainTitle = section.title || '';
                const mainShortDescription = section.short_description || '';

                // Try to get translation for current language
                if (section.translations && Array.isArray(section.translations) && section.translations.length > 0) {
                    const translation = section.translations.find(
                        t => t.language_id === this.currentLanguageId
                    );

                    if (translation) {
                        // Use translation if it exists and has value
                        if (translation.title && translation.title.trim() !== '') {
                            translatedSection.title = translation.title;
                        }

                        if (
                            translation.short_description &&
                            translation.short_description.trim() !== ''
                        ) {
                            translatedSection.short_description =
                                translation.short_description;
                        }
                    }
                }

                // Fallback: If no translation found or translation is empty, use main table data
                if (!translatedSection.title || translatedSection.title.trim() === '') {
                    translatedSection.title = mainTitle;
                }
                if (!translatedSection.short_description || translatedSection.short_description.trim() === '') {
                    translatedSection.short_description = mainShortDescription;
                }

                return translatedSection;
            });
        },
        sortOptions() {
            // Create an options list from our fields
            return this.fields
                .filter(f => f.sortable)
                .map(f => {
                    return { text: f.label, value: f.key }
                })
        },
        pageEnd() {
            return Math.min(this.currentPage * this.perPage, this.totalRows);
        }
    },
    mounted() {
        // Set the initial number of items
        this.totalRows = this.sections.length
    },
    watch: {
        $route(to, from) {
            this.showCreateModal();
        },
        perPage() {
            this.currentPage = 1;
        }
    },
    created() {
        this.showCreateModal();

        this.$eventBus.$on('sectionSaved', (message) => {
            this.showMessage("success", message);
            this.getSections();
            this.create_new = null;
        });

        this.fetchActiveLanguages().then(() => {
            this.getSections();
        });
    },
    methods: {

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

        // Grid view: same client-side search (b-table :filter / :filter-included-fields) and sort as the list view.
        // Style preview image (same files the list view shows); null for unknown styles
        styleImage(kind, style) {
            if (!['style_1', 'style_2', 'style_3', 'style_4'].includes(style)) return null;
            const n = style.replace('style_', '');
            return kind === 'web'
                ? this.$baseUrl + '/images/web_style/Web_Style_' + n + '.jpg'
                : this.$baseUrl + '/images/app_style/App_Style_' + n + '.jpg';
        },
        // Category text as shown in the list view's category_ids column
        sectionCategories(section) {
            if (Array.isArray(section.category_names) && section.category_names.length > 0) return section.category_names.join(', ');
            if (Array.isArray(section.category_ids)) return section.category_ids.join(', ');
            return section.category_ids || '';
        },
        openLightbox(image) {

            this.lightboxSources = [image];
            this.toggler = !this.toggler;
        },
        handleClose() {
            this.lightboxSources = null;
            this.toggler = false;

        },
        handleSectionSaved(message) {
            this.showMessage('success', message);
            this.getSections();
            this.create_new = false;
            this.edit_record = null;
        },
        getSections() {
            this.isLoading = true
            axios.get(this.$apiUrl + '/sections')
                .then((response) => {
                    this.isLoading = false
                    this.sections = response.data.data;
                    this.totalRows = this.sections.length
                }).catch(error => {
                    this.isLoading = false;

                    let msg = __('something_went_wrong');

                    if (error.response && error.response.data && error.response.data.message) {
                        msg = error.response.data.message;
                    } else if (error.message) {
                        msg = error.message;
                    }

                    this.showError(msg);
                });

        },
        deleteSection(index, id) {
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
                    axios.post(this.$apiUrl + '/sections/delete', postData)
                        .then((response) => {
                            this.isLoading = false
                            this.sections.splice(index, 1)
                            this.showMessage('success', response.data.message);
                        }).catch(error => {
                            this.isLoading = false;


                            let msg = __('something_went_wrong');

                            if (error.response && error.response.data && error.response.data.message) {
                                msg = error.response.data.message;
                            } else if (error.message) {
                                msg = error.message;
                            }

                            this.showError(msg);
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

            if (this.$route.path !== '/sections') {
                this.$router.push({ path: '/sections' });
            }
        }
    },
    beforeDestroy() {
        this.$eventBus.$off('sectionSaved');
    }
};
</script>

<style scoped>
.section-card-title {
    font-size: 16px !important;
    font-weight: 700 !important;
    color: var(--ui-heading) !important;
}

.style-thumb {
    width: 64px;
    aspect-ratio: 1 / 1;
    height: auto;
    object-fit: contain;
    padding: 4px;
    cursor: pointer;
    border-radius: var(--ui-radius) !important;
    border: 1px solid var(--ui-border);
    background: var(--ui-surface-muted);
}

.style-thumb-web {
    width: 88px;
    aspect-ratio: 16 / 10;
}

/* Grid view: app + web style previews in the card media area */
.section-card-styles {
    aspect-ratio: auto;
    display: grid;
    grid-template-columns: 2fr 3fr;
    gap: 10px;
    padding: 12px;
    align-items: end;
}

.section-card-style {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    min-width: 0;
}

.item-card-media img.section-card-style-img {
    width: 100%;
    height: auto;
    aspect-ratio: 1 / 1;
    max-height: 110px;
    object-fit: contain;
    padding: 4px;
    cursor: pointer;
    border-radius: var(--ui-radius);
    border: 1px solid var(--ui-border);
    background: var(--ui-surface);
}

.item-card-media .section-card-style--web img.section-card-style-img {
    aspect-ratio: 16 / 10;
}

.section-card-style-label {
    font-size: 11px;
    font-weight: 600;
    color: var(--ui-text-muted);
}
</style>
