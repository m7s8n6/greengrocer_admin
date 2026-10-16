<template>
    <div>
        <div class="page-heading d-flex justify-content-between align-items-center mb-4">
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
            <div class="figma-main-section-card">
                <div class="card-header border-0 bg-transparent py-3">
                    <h4 class="card-title mb-0 figma-card-title">{{ __('featured_sections_of_app') }}</h4>
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
                        <div class="d-flex gap-2">
                            <button class="btn btn-figma-filter d-flex align-items-center gap-2"
                                @click="create_new = true" v-if="$can('featured_section_create')">
                                <i class="fa fa-plus"></i>
                                <span>{{ __('add_sections') }}</span>
                            </button>
                            <button class="btn btn-figma-filter d-flex align-items-center gap-2" @click="getSections()"
                                v-b-tooltip.hover :title="__('refresh')">
                                <i class="fa fa-refresh"></i>
                                <span>{{ __('refresh') }}</span>
                            </button>
                        </div>
                    </div>

                    <div class="table-responsive">
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
                                             class="img-thumbnail my-1" 
                                             style="max-width: 60px; max-height: 60px; object-fit: contain; cursor: pointer;" 
                                             alt="App Style"
                                             @click="openLightbox($baseUrl + '/images/app_style/App_Style_' + row.item.style_app.replace('style_', '') + '.jpg')">
                                    </template>
                                    <template v-else>
                                        <span class="text-danger small">{{ row.item.style_app || 'Style Unknown' }}</span>
                                    </template>

                                    <span class="d-block text-muted small mt-2"><strong>{{ __('Web Style:') }}</strong></span>
                                    <template v-if="['style_1', 'style_2', 'style_3', 'style_4'].includes(row.item.style_web)">
                                        <img :src="$baseUrl + '/images/web_style/Web_Style_' + row.item.style_web.replace('style_', '') + '.jpg'" 
                                             class="img-thumbnail my-1" 
                                             style="max-width: 80px; max-height: 80px; object-fit: contain; cursor: pointer;" 
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
                                        @click="deleteSection(row.index, row.item.id)"
                                        v-if="$can('featured_section_delete')" v-b-tooltip.hover :title="__('delete')">
                                        <base-icon name="Type=Default" hoverName="Type=Hover" width="24" height="24" />
                                    </button>
                                </div>
                            </template>
                        </b-table>
                    </div>

                    <div class="figma-table-footer">
                        <div class="showing-results-text">
                            {{ __('Showing Result') }} : <span class="showing-bold">{{ pageEnd
                                }}</span> {{ __('of') || 'of' }} <span class="showing-bold">{{ totalRows }}</span>
                        </div>
                        <b-pagination v-model="currentPage" :total-rows="totalRows" :per-page="perPage" align="right"
                            class="figma-pagination mb-0"></b-pagination>
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

export default {
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
                confirmButtonColor: '#37a279',
                cancelButtonColor: '#d33',
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
