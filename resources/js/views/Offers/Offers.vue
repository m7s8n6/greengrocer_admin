<template>
    <div>
        <div class="page-heading">
            <div class="page-heading d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
                <h3 class="modern-page-title mb-0">{{ __('Manage Offer images') }}</h3>
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb mb-0">
                        <li class="breadcrumb-item">
                            <router-link to="/dashboard" class="text-muted">{{ __('dashboard') }}</router-link>
                        </li>
                        <li class="breadcrumb-item active text-primary" aria-current="page">{{ __('Manage Offer images')
                            }}</li>
                    </ol>
                </nav>
            </div>
            <section class="section">
                <div class="card figma-main-section-card">
                    <div class="card-body p-0">
                        <!-- Modern Filter Action Bar -->
                        <div
                            class="d-flex justify-content-between align-items-center flex-wrap gap-2 figma-action-bar-row">
                            <div class="flex-grow-1">
                                <div class="figma-search-container">
                                    <i class="fa fa-search text-muted"></i>
                                    <input v-model="filter" type="text" class="figma-search-input"
                                        :placeholder="__('search') || 'Search...'" @input="getOffers()">
                                </div>
                            </div>
                            <div class="d-flex flex-wrap gap-2">
                                <div class="view-toggle" role="group" :aria-label="__('view')">
                                    <button type="button" class="view-toggle-btn" :class="{ active: viewMode === 'grid' }" @click="setViewMode('grid')" v-b-tooltip.hover :title="__('grid_view')"><i class="bi bi-grid-3x3-gap-fill"></i></button>
                                    <button type="button" class="view-toggle-btn" :class="{ active: viewMode === 'list' }" @click="setViewMode('list')" v-b-tooltip.hover :title="__('list_view')"><i class="bi bi-list-ul"></i></button>
                                </div>
                                <button class="btn btn-figma-columns d-flex align-items-center gap-2"
                                    @click="getOffers()" v-b-tooltip.hover :title="__('refresh')">
                                    <i class="fa fa-refresh"></i>
                                    <span>{{ __('refresh') }}</span>
                                </button>

                                <button class="btn btn-figma-filter d-flex align-items-center gap-2"
                                    @click="create_new = true" v-if="$can('new_offer_image_create')">
                                    <i class="fa fa-plus"></i>
                                    <span>{{ __('add_offer') }}</span>
                                </button>
                            </div>
                        </div>
                        <!-- Grid view (same rows, search, sort and handlers as the list view) -->
                        <div v-if="viewMode === 'grid'">
                            <div v-if="isLoading" class="item-grid-state">
                                <i class="bi bi-hourglass-split"></i>{{ __('loading') }}...
                            </div>
                            <div v-else-if="!gridOffers.length" class="item-grid-state">
                                <template v-if="filter && translatedOffers.length"><i class="bi bi-search"></i>{{ __('no_records_matching_your_request') }}</template>
                                <template v-else><i class="bi bi-inbox"></i>{{ __('no_records_to_show') }}</template>
                            </div>
                            <div v-else class="item-grid item-grid--wide">
                                <div v-for="offer in pagedItems(gridOffers)" :key="offer.id" class="item-card">
                                    <div class="item-card-media item-card-media--banner item-card-media--cover">
                                        <img :src="offer.image_url || $placeholderImage" alt="" @error="handleImageError" />
                                        <div class="item-card-badges">
                                            <span class="badge bg-info">{{ __(offer.type) }}</span>
                                        </div>
                                    </div>
                                    <div class="item-card-body">
                                        <div class="item-card-title">
                                            <template v-if="offer.type === 'offer_url'">{{ __('offer_url') }}</template>
                                            <template v-else>{{ getTranslatedTypeName(offer) || __(offer.type) }}</template>
                                        </div>
                                        <div v-if="offer.type === 'offer_url' && offer.offer_url" class="item-card-meta">
                                            <a :href="offer.offer_url" target="_blank" rel="noopener">{{ offer.offer_url }}</a>
                                        </div>
                                        <div class="item-card-stats">
                                            <span v-if="offer.position" class="item-card-chip"><i class="bi bi-layout-text-window"></i>{{ __(offer.position) }}</span>
                                            <span v-if="offer.position === 'below_section' && offer.section_title" class="item-card-chip">{{ offer.section_title }}</span>
                                        </div>
                                        <!-- Same details as the list view's expandable row -->
                                        <dl v-if="visibleOfferId === offer.id" class="offer-card-details mb-0">
                                            <div><dt>{{ __('type_id') }}</dt><dd>{{ offer.type_id || '-' }}</dd></div>
                                            <div><dt>{{ __('name') }}</dt><dd>{{ offer.type_name && offer.type_name.trim() !== '' ? offer.type_name : '-' }}</dd></div>
                                            <div><dt>{{ __('slug') }}</dt><dd>{{ offer.type_slug && offer.type_slug.trim() !== '' ? offer.type_slug : '-' }}</dd></div>
                                            <div v-if="offer.offer_url"><dt>URL</dt><dd><a :href="offer.offer_url" target="_blank" rel="noopener" class="text-break">{{ offer.offer_url }}</a></dd></div>
                                            <div><dt>{{ __('position') }}</dt><dd>{{ offer.position || '-' }}</dd></div>
                                            <div><dt>{{ __('section_position') }}</dt><dd>{{ offer.section_position || '-' }}</dd></div>
                                            <div v-if="offer.section_title"><dt>{{ __('section_title') }}</dt><dd>{{ offer.section_title }}</dd></div>
                                        </dl>
                                    </div>
                                    <div class="item-card-footer">
                                        <span class="item-card-meta">#{{ offer.id }}</span>
                                        <div class="item-card-actions">
                                            <button class="figma-action-btn" @click="edit_record = offer"
                                                v-if="$can('home_slider_image_update')" v-b-tooltip.hover :title="__('edit')">
                                                <i class="bi bi-pencil-square"></i>
                                            </button>
                                            <button class="figma-action-btn figma-delete-btn"
                                                @click="deleteOffer(translatedOffers.indexOf(offer), offer.id)"
                                                v-if="$can('new_offer_image_delete')" v-b-tooltip.hover :title="__('delete')">
                                                <i class="bi bi-trash"></i>
                                            </button>
                                            <button class="figma-action-btn" :class="{ active: visibleOfferId === offer.id }"
                                                @click="toggleRowDetails({ item: offer })" v-b-tooltip.hover :title="__('view')"
                                                :aria-expanded="visibleOfferId === offer.id ? 'true' : 'false'">
                                                <i :class="visibleOfferId === offer.id ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <b-table v-else :items="translatedOffers" :fields="fields" :current-page="currentPage"
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
                            <template #cell(type)="row">
                                <p class="mb-0" v-if="row.item.type === 'default'"> {{ __('default') }}</p>
                                <p class="mb-0" v-if="row.item.type === 'category'"> {{ __('category') }}</p>
                                <p class="mb-0" v-if="row.item.type === 'product'"> {{ __('product') }}</p>
                                <p class="mb-0" v-if="row.item.type === 'offer_url'"> {{ __('offer_url') }}</p>
                            </template>
                            <template #cell(type_name)="row">
                                <a v-if="row.item.type === 'offer_url'" :href="row.item.offer_url"
                                    target="_blank">LINK</a>
                                <p class="mb-0" v-else> {{ getTranslatedTypeName(row.item) }}</p>
                            </template>
                            <template #cell(position)="row">
                                <p class="mb-0" v-if="row.item.position === 'below_slider'"> {{ __('below_slider') }}</p>
                                <p class="mb-0" v-if="row.item.position === 'below_category'"> {{ __('below_category') }}</p>
                                <p class="mb-0" v-if="row.item.position === 'below_section'"> {{ __('below_section') }}</p>
                                <p class="mb-0" v-if="row.item.position === 'top'"> {{ __('top') }}</p>
                            </template>
                            <template #cell(section_position)="row">
                                <p class="mb-0" v-if="row.item.position === 'below_section'">{{ row.item.section_title }}</p>
                                <p class="mb-0" v-else>-</p>
                            </template>
                            <template #cell(image)="row">
                                <img :src="row.item.image_url || $placeholderImage" class="offer-thumb" alt="" @error="handleImageError" />
                            </template>

                            <template #cell(actions)="row">
                                <div class="d-flex gap-2">
                                    <button class="figma-action-btn" @click="edit_record = row.item"
                                        v-if="$can('home_slider_image_update')" v-b-tooltip.hover :title="__('edit')">
                                        <base-icon name="edit icon" hoverName="edit Hover" width="24" height="24" />
                                    </button>
                                    <button class="figma-action-btn figma-delete-btn"
                                        @click="deleteOffer(translatedOffers.indexOf(row.item), row.item.id)"
                                        v-if="$can('new_offer_image_delete')" v-b-tooltip.hover :title="__('delete')">
                                        <base-icon name="Type=Default" hoverName="Type=Hover" width="24" height="24" />
                                    </button>
                                    <button class="figma-action-btn" @click="toggleRowDetails(row)" v-b-tooltip.hover
                                        :title="__('view')">
                                        <base-icon v-if="row.detailsShowing" name="Eye" hoverName="Type=Hover (1)"
                                            width="24" height="24" />
                                        <base-icon v-else name="Eye" hoverName="Type=Hover (1)" width="24"
                                            height="24" />
                                    </button>
                                </div>
                            </template>

                            <template #row-details="row">
                                <b-card no-body class="p-4 border-0 offer-details">
                                    <div class="d-flex align-items-center mb-3">
                                        <h5 class="offer-details-title mb-0 me-3"><i class="fa fa-info-circle me-1"></i> {{
                                            __('information') }}</h5>
                                        <div class="h-line flex-grow-1"></div>
                                    </div>

                                    <div class="row g-4">
                                        <!-- Column 1 -->
                                        <div class="col-md-4">
                                            <div class="mb-3">
                                                <label class="text-muted small text-uppercase fw-bold d-block">{{
                                                    __('id') }}</label>
                                                <span class="offer-detail-value">#{{ row.item.id }}</span>
                                            </div>
                                            <div class="mb-3">
                                                <label class="text-muted small text-uppercase fw-bold d-block">{{
                                                    __('type') }}</label>
                                                <span class="offer-detail-value">{{ row.item.type }}</span>
                                            </div>
                                            <div class="mb-0">
                                                <label class="text-muted small text-uppercase fw-bold d-block">{{
                                                    __('type_id') }}</label>
                                                <span class="offer-detail-value">{{ row.item.type_id }}</span>
                                            </div>
                                        </div>

                                        <!-- Column 2 -->
                                        <div class="col-md-4">
                                            <div class="mb-3">
                                                <label class="text-muted small text-uppercase fw-bold d-block">{{
                                                    __('name') }}</label>
                                                <span class="offer-detail-value">{{ row.item.type_name && row.item.type_name.trim()
                                                    !== '' ? row.item.type_name : '-' }}</span>
                                            </div>
                                            <div class="mb-3">
                                                <label class="text-muted small text-uppercase fw-bold d-block">{{
                                                    __('slug') }}</label>
                                                <span class="offer-detail-value">{{ row.item.type_slug && row.item.type_slug.trim()
                                                    !== '' ? row.item.type_slug : '-' }}</span>
                                            </div>
                                            <div class="mb-0" v-if="row.item.offer_url">
                                                <label
                                                    class="text-muted small text-uppercase fw-bold d-block">URL</label>
                                                <a :href="row.item.offer_url" target="_blank" class="text-break">{{
                                                    row.item.offer_url }}</a>
                                            </div>
                                        </div>

                                        <!-- Column 3 -->
                                        <div class="col-md-4">
                                            <div class="mb-3">
                                                <label class="text-muted small text-uppercase fw-bold d-block">{{
                                                    __('position') }}</label>
                                                <span class="offer-detail-value">{{ row.item.position }}</span>
                                            </div>
                                            <div class="mb-3">
                                                <label class="text-muted small text-uppercase fw-bold d-block">{{
                                                    __('section_position') }}</label>
                                                <span class="offer-detail-value">{{ row.item.section_position }}</span>
                                            </div>
                                            <div class="mb-0" v-if="row.item.section_title">
                                                <label class="text-muted small text-uppercase fw-bold d-block">{{
                                                    __('section_title') }}</label>
                                                <span class="offer-detail-value">{{ row.item.section_title }}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="mt-4 pt-3 border-top" v-if="row.item.image_url">
                                        <label class="text-muted small text-uppercase fw-bold d-block mb-2">{{
                                            __('image_preview') }}</label>
                                        <img :src="row.item.image_url" class="img-fluid rounded border offer-details-img" @error="handleImageError">
                                    </div>
                                </b-card>
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
            </section>
        </div>
        <!-- Add / Edit -->
        <app-edit-record v-if="create_new || edit_record" :record="edit_record" :sections="sections"
            :categories="translatedCategories" :products="translatedProducts"
            @modalClose="hideModal()"></app-edit-record>
    </div>
</template>
<script>
import EditRecord from './Edit';
import axios from "axios";
import ViewModeMixin from '../../mixins/ViewModeMixin';
export default {
    mixins: [ViewModeMixin],
    components: {
        'app-edit-record': EditRecord,
    },
    data: function () {
        return {

            fields: [
                { key: 'id', label: __('id'), class: 'text-center', sortable: true, sortDirection: 'desc' },
                { key: 'type', label: __('type'), sortable: true, class: 'text-center' },
                { key: 'type_name', label: __('name'), sortable: true, class: 'text-center' },
                { key: 'image', label: __('image'), class: 'text-center' },
                { key: 'position', label: __('position'), class: 'text-center' },
                { key: 'section_position', label: __('select_position'), class: 'text-center' },
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
            offers: [],
            sections: [],
            categories: [],
            products: [],
            visibleOfferId: null,
            // Language handling for translations
            currentLanguageId: null,
            activeLanguages: []
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
        pageEnd() {
            return Math.min(this.currentPage * this.perPage, this.totalRows);
        },
        // Grid view rows: translatedOffers with the list view's search + sort applied
        gridOffers() {
            return this.gridFilterSort(this.translatedOffers, this.filterOn);
        },
        // Computed property to translate offers for datatable
        translatedOffers: function () {
            if (!this.currentLanguageId || this.offers.length === 0) {
                return this.offers;
            }

            return this.offers.map(offer => {
                const translatedOffer = { ...offer };
                // Update type_name using our translation method
                translatedOffer.type_name = this.getTranslatedTypeName(offer);
                // Unified accordion status
                translatedOffer._showDetails = (offer.id === this.visibleOfferId);
                return translatedOffer;
            });
        },
        // Computed property to translate products for dropdown
        translatedProducts: function () {
            if (!this.currentLanguageId || this.products.length === 0) {
                return this.products;
            }

            // Get default language ID for fallback
            const defaultLanguage = this.activeLanguages.find(lang => lang.is_default === 1);
            const defaultLanguageId = defaultLanguage ? defaultLanguage.id : null;

            return this.products.map(product => {
                const translatedProduct = { ...product };
                let translatedName = product.name; // Fallback to main table name

                if (product.translations && Array.isArray(product.translations)) {
                    // First try to find translation for current language
                    let translation = product.translations.find(
                        t => t.language_id === this.currentLanguageId
                    );

                    // If not found, try default language
                    if (!translation && defaultLanguageId) {
                        translation = product.translations.find(
                            t => t.language_id === defaultLanguageId
                        );
                    }

                    // Use translation name if available and not empty
                    if (translation && translation.name && translation.name.trim() !== '') {
                        translatedName = translation.name;
                    }
                }

                translatedProduct.name = translatedName;
                return translatedProduct;
            });
        },
        // Computed property to translate categories for dropdown
        translatedCategories: function () {
            if (!this.currentLanguageId || this.categories.length === 0) {
                return this.categories;
            }

            // Get default language ID for fallback
            const defaultLanguage = this.activeLanguages.find(lang => lang.is_default === 1);
            const defaultLanguageId = defaultLanguage ? defaultLanguage.id : null;

            return this.categories.map(category => {
                const translatedCategory = { ...category };
                let translatedName = category.name; // Fallback to main table name

                if (category.translations && Array.isArray(category.translations)) {
                    // First try to find translation for current language
                    let translation = category.translations.find(
                        t => t.language_id === this.currentLanguageId
                    );

                    // If not found, try default language
                    if (!translation && defaultLanguageId) {
                        translation = category.translations.find(
                            t => t.language_id === defaultLanguageId
                        );
                    }

                    // Use translation name if available and not empty
                    if (translation && translation.name && translation.name.trim() !== '') {
                        translatedName = translation.name;
                    }
                }

                translatedCategory.name = translatedName;
                return translatedCategory;
            });
        },
    },
    mounted() {
        // Set the initial number of items
        this.totalRows = this.offers.length
    },
    watch: {
        $route(to, from) {
            this.showCreateModal();
        },
        perPage() {
            this.currentPage = 1;
        }
    },
    created: function () {
        this.showCreateModal();
        this.$eventBus.$on('offerSaved', (message) => {
            this.showMessage("success", message);
            this.getOffers();
            this.create_new = null;
        });
        // Load languages first so we know currentLanguageId before mapping translations
        this.fetchActiveLanguages().then(() => {
            this.getOffers();
            this.getCategories();
            this.getProducts();
        }).catch(() => {
            this.getOffers();
            this.getCategories();
            this.getProducts();
        });
    },
    methods: {
        // Fetch active languages and set current language ID
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
        // Get translated type name (product or category name) with fallback logic
        getTranslatedTypeName(offer) {
            // If no language is set yet, return the base name
            if (!this.currentLanguageId || !this.activeLanguages.length) {
                return offer.type_name || '';
            }

            // Get default language ID for fallback
            const defaultLanguage = this.activeLanguages.find(lang => lang.is_default === 1);
            const defaultLanguageId = defaultLanguage ? defaultLanguage.id : null;

            // Handle product type
            if (offer.type === 'product' && offer.product) {
                // Check if translations array exists
                if (offer.product.translations && Array.isArray(offer.product.translations) && offer.product.translations.length > 0) {
                    // First try to find translation for current language
                    let translation = offer.product.translations.find(
                        t => t.language_id === this.currentLanguageId
                    );

                    // If not found, try default language
                    if (!translation && defaultLanguageId) {
                        translation = offer.product.translations.find(
                            t => t.language_id === defaultLanguageId
                        );
                    }

                    // Use translation name if available and not empty
                    if (translation && translation.name && translation.name.trim() !== '') {
                        return translation.name;
                    }
                }
                // Fallback to product name or type_name
                return offer.product.name || offer.type_name || '';
            }
            // Handle category type
            else if (offer.type === 'category' && offer.category) {
                // Check if translations array exists
                if (offer.category.translations && Array.isArray(offer.category.translations) && offer.category.translations.length > 0) {
                    // First try to find translation for current language
                    let translation = offer.category.translations.find(
                        t => t.language_id === this.currentLanguageId
                    );

                    // If not found, try default language
                    if (!translation && defaultLanguageId) {
                        translation = offer.category.translations.find(
                            t => t.language_id === defaultLanguageId
                        );
                    }

                    // Use translation name if available and not empty
                    if (translation && translation.name && translation.name.trim() !== '') {
                        return translation.name;
                    }
                }
                // Fallback to category name or type_name
                return offer.category.name || offer.type_name || '';
            }

            // Fallback to type_name for other types (offer_url, default, etc.)
            return offer.type_name || '';
        },
        getOffers() {
            this.isLoading = true
            axios.get(this.$apiUrl + '/offers')
                .then((response) => {
                    this.isLoading = false
                    // Ensure offers have proper structure with translations
                    this.offers = (response.data.data.offers || []).map(offer => {
                        // Ensure product and category objects exist and have translations
                        if (offer.product && !offer.product.translations) {
                            offer.product.translations = [];
                        }
                        if (offer.category && !offer.category.translations) {
                            offer.category.translations = [];
                        }
                        return offer;
                    });
                    this.sections = response.data.data.sections;
                    this.totalRows = this.offers.length
                });
        },
        getCategories() {
            this.isLoading = true
            let url = this.$apiUrl + '/categories?status=1';
            axios.get(url)
                .then((response) => {
                    this.isLoading = false
                    let data = response.data;
                    this.categories = data.data
                });
        },
        getProducts() {

            this.isLoading = true
            let url = this.$apiUrl + '/products';
            axios.get(url)
                .then((response) => {
                    this.isLoading = false
                    let data = response.data;
                    this.products = data.data.products
                });
        },
        deleteOffer(index, id) {
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
                    axios.post(this.$apiUrl + '/offers/delete', postData)
                        .then((response) => {
                            this.isLoading = false
                            this.offers.splice(index, 1)
                            this.showMessage('success', response.data.message);
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
            this.$router.push({ path: '/offers' });
        },
        // Grid view: same client-side search (b-table :filter / :filter-included-fields) and sort as the list view.
        toggleRowDetails(row) {
            if (this.visibleOfferId === row.item.id) {
                this.visibleOfferId = null;
            } else {
                this.visibleOfferId = row.item.id;
            }
        },
        handleImageError(event) {
            if (this.$placeholderImage && event.target.src !== this.$placeholderImage) {
                event.target.src = this.$placeholderImage;
            }
        }
    }
};
</script>

<style scoped>
.offer-thumb {
    width: 96px;
    aspect-ratio: 16 / 9;
    height: auto;
    object-fit: cover;
    border-radius: var(--ui-radius) !important;
    border: 1px solid var(--ui-border);
    background: var(--ui-surface-muted);
}

.offer-details {
    background: var(--ui-surface-muted) !important;
    border-radius: var(--ui-radius-lg) !important;
}

.offer-details .h-line {
    height: 1px;
    background: var(--ui-border) !important;
}

.offer-details-title {
    font-size: 15px;
    font-weight: 700;
    color: var(--ui-heading);
}

.offer-details-title .fa {
    color: var(--theme-primary-600);
}

.offer-detail-value {
    font-size: 13px;
    color: var(--ui-text);
}

.offer-details-img {
    max-height: 250px;
}

/* Grid view: inline details (same fields as the list view's row details) */
.offer-card-details {
    margin-top: 8px;
    padding: 10px 12px;
    border-radius: var(--ui-radius);
    background: var(--ui-surface-muted);
    border: 1px solid var(--ui-border);
    display: grid;
    gap: 6px;
}

.offer-card-details > div {
    display: flex;
    justify-content: space-between;
    gap: 12px;
    min-width: 0;
}

.offer-card-details dt {
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
    color: var(--ui-text-muted);
    flex-shrink: 0;
}

.offer-card-details dd {
    margin: 0;
    font-size: 12px;
    color: var(--ui-text);
    text-align: right;
    min-width: 0;
    overflow-wrap: anywhere;
}
</style>
