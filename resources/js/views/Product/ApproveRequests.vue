<template>
    <div class="approve-page">
        <div class="page-heading">
            <div class="page-title d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
                <h3 class="modern-page-title mb-0">{{ __('approve_requests') }}</h3>
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb mb-0">
                        <li class="breadcrumb-item" v-if="isSellerRoute">
                            <router-link to="/seller/dashboard" class="text-muted">{{ __('dashboard') }}</router-link>
                        </li>
                        <li class="breadcrumb-item" v-else>
                            <router-link to="/dashboard" class="text-muted">{{ __('dashboard') }}</router-link>
                        </li>
                        <li class="breadcrumb-item active text-primary" aria-current="page">{{ __('approve_requests') }}
                        </li>
                    </ol>
                </nav>
            </div>

            <section class="section">
                <div class="figma-main-section-card">
                    <div class="card-body p-0">

                        <!-- Modern Filter Action Bar -->
                        <div
                            class="d-flex justify-content-between align-items-center flex-wrap gap-2 figma-action-bar-row p-3">
                            <div class="flex-grow-1">
                                <div class="figma-search-container">
                                    <i class="fa fa-search text-muted"></i>
                                    <input v-model="filter" type="text" class="figma-search-input"
                                        :placeholder="__('search') || 'Search...'" @input="getRecords()">
                                </div>
                            </div>
                            <div class="d-flex gap-2 align-items-center flex-wrap">
                                <button class="btn btn-figma-filter d-flex align-items-center gap-2"
                                    :class="{ 'active': showFilters }" @click="showFilters = !showFilters">
                                    <base-icon name="Funnel" width="16" height="16" useCurrentColor />
                                    <span>{{ __('filters') || 'Filters' }}</span>
                                    <i class="bi ms-1" :class="showFilters ? 'bi-chevron-up' : 'bi-chevron-down'"></i>
                                </button>

                                <b-dropdown variant="figma-columns" no-caret
                                    toggle-class="btn-figma-columns d-flex align-items-center gap-2" v-b-tooltip.hover
                                    :title="__('columns')">
                                    <template #button-content>
                                        <i class="fa fa-th-list"></i>
                                        <span>{{ __('columns') }}</span>
                                    </template>
                                    <b-dropdown-form class="p-2"
                                        style="min-width: 200px; max-height: 300px; overflow-y: auto;">
                                        <div v-for="field in fields" :key="field.key" v-if="field.key !== 'select'"
                                            class="form-check mb-2">
                                            <input type="checkbox" :id="'col-' + field.key"
                                                v-model="field.visible" class="form-check-input">
                                            <label class="form-check-label ms-2" :for="'col-' + field.key">{{
                                                field.label }}</label>
                                        </div>
                                    </b-dropdown-form>
                                </b-dropdown>

<div class="view-toggle" role="group" :aria-label="__('view')">
                                    <button type="button" class="view-toggle-btn" :class="{ active: viewMode === 'grid' }" @click="setViewMode('grid')" v-b-tooltip.hover :title="__('grid_view')"><i class="bi bi-grid-3x3-gap-fill"></i></button>
                                    <button type="button" class="view-toggle-btn" :class="{ active: viewMode === 'list' }" @click="setViewMode('list')" v-b-tooltip.hover :title="__('list_view')"><i class="bi bi-list-ul"></i></button>
                                </div>

                                <button class="btn btn-figma-filter d-flex align-items-center gap-2"
                                    @click="getRecords()" v-b-tooltip.hover :title="__('refresh')">
                                    <i class="fa fa-refresh"></i>
                                    <span>{{ __('refresh') || 'Refresh' }}</span>
                                </button>
                            </div>
                        </div>

                        <!-- Expandable Filter Section -->
                        <b-collapse v-model="showFilters">
                            <div class="figma-filter-section">
                                <div class="row g-4">
                                    <div class="col-md-4">
                                        <div class="figma-filter-group">
                                            <label class="figma-filter-label">{{ __('categories') }}</label>
                                            <select @change="getRecords()" v-model="category"
                                                class="form-control form-select modern-select">
                                                <option value="">{{ __('all_categories') }}</option>
                                                <option v-for="category in translatedCategories" :value="category.id">
                                                    {{ category.name }}
                                                </option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-md-4" v-if="$roleSeller != login_user.role.name">
                                        <div class="figma-filter-group">
                                            <label class="figma-filter-label">{{ __('sellers') }}</label>
                                            <select @change="getRecords()" v-model="seller"
                                                class="form-control form-select modern-select">
                                                <option value="">{{ __('all_sellers') }}</option>
                                                <option v-for="seller in translatedSellers" :value="seller.id">{{
                                                    seller.name }}</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </b-collapse>
                        <div v-if="viewMode === 'grid'">
                            <div v-if="isLoading" class="item-grid-state">
                                <i class="fa fa-spinner fa-spin"></i>{{ __('loading') }}...
                            </div>
                            <div v-else-if="gridProducts.length === 0" class="item-grid-state">
                                <i class="fa" :class="filter ? 'fa-search' : 'fa-inbox'"></i>
                                {{ filter ? __('no_records_matching_your_request') : __('no_records_to_show') }}
                            </div>
                            <div v-else class="item-grid">
                                <div v-for="item in gridProducts" :key="item.product_variant_id" class="item-card">
                                    <div class="item-card-media">
                                        <img :src="item.image ? ($storageUrl + item.image) : $placeholderImage" :alt="item.name"
                                            class="approve-card-img" @click="openLightbox(item.image ? ($storageUrl + item.image) : $placeholderImage)" />
                                        <div class="item-card-badges">
                                            <span class="badge bg-success" v-if="item.status == 1">{{ __('available') }}</span>
                                            <span class="badge bg-danger" v-if="item.status == 0">{{ __('sold_out') }}</span>
                                        </div>
                                    </div>
                                    <div class="item-card-body">
                                        <div class="item-card-title" :title="item.name">{{ item.name }}</div>
                                        <div class="item-card-meta" v-if="$roleSeller != login_user.role.name && item.seller_name"
                                            :title="item.seller_name">
                                            <i class="bi bi-shop"></i> {{ item.seller_name }}
                                        </div>
                                        <div class="item-card-meta">
                                            {{ __('id') }}: #{{ item.product_variant_id }} &middot; {{ __('product_id') }}: #{{ item.product_id }}
                                        </div>
                                        <div class="item-card-price">
                                            <template v-if="hasDiscount(item)">
                                                <span>{{ $currency }}{{ item.discounted_price }}</span>
                                                <del>{{ $currency }}{{ item.price }}</del>
                                            </template>
                                            <span v-else>{{ $currency }}{{ item.price }}</span>
                                        </div>
                                        <div class="item-card-stats">
                                            <span class="item-card-chip" v-if="item.measurement" :title="__('measurement')">
                                                <i class="bi bi-rulers"></i>{{ item.measurement }} <span v-if="item.short_code">{{ item.short_code }}</span>
                                            </span>
                                            <span class="item-card-chip" :title="__('stock')">
                                                <i class="bi bi-box-seam"></i>
                                                <span v-if="item.is_unlimited_stock">{{ __('unlimited') }}</span>
                                                <template v-else>{{ item.stock }}</template>
                                            </span>
                                        </div>
                                    </div>
                                    <div class="item-card-footer">
                                        <a class="btn btn-sm approve-toggle" @click="updateStatusProduct(productIndex(item), item.id)"
                                            v-if="$can('product_update')" v-b-tooltip.hover :title="__('availability')">
                                            <span class="primary-toggal" v-if="item.status == 1"><i
                                                    class="fa fa-toggle-on fa-2x"></i></span>
                                            <span class="text-danger" v-else><i class="fa fa-toggle-off fa-2x"></i></span>
                                        </a>
                                        <div class="item-card-actions">

                                                <template v-if="$roleSeller == login_user.role.name">
                                                    <router-link
                                                        :to="{ name: 'SellerViewProduct', params: { id: item.id, record: item } }"
                                                        class="figma-action-btn" v-b-tooltip.hover :title="__('view')">
                                                        <i class="bi bi-eye"></i>
                                                    </router-link>
                                                    <router-link
                                                        :to="{ name: 'SellerEditProduct', params: { id: item.id, record: item } }"
                                                        class="figma-action-btn" v-if="$can('product_update')" v-b-tooltip.hover
                                                        :title="__('edit')">
                                                        <i class="bi bi-pencil"></i>
                                                    </router-link>
                                                </template>
                                                <template v-else>
                                                    <router-link
                                                        :to="{ name: 'ViewProduct', params: { id: item.id, record: item } }"
                                                        class="figma-action-btn" v-b-tooltip.hover :title="__('view')">
                                                        <i class="bi bi-eye"></i>
                                                    </router-link>
                                                    <router-link
                                                        :to="{ name: 'EditProduct', params: { id: item.id, record: item } }"
                                                        class="figma-action-btn" v-if="$can('product_update')" v-b-tooltip.hover
                                                        :title="__('edit')">
                                                        <i class="bi bi-pencil"></i>
                                                    </router-link>
                                                </template>

                                                <button class="figma-action-btn figma-delete-btn"
                                                    @click="deleteRecord(productIndex(item), item.product_variant_id)"
                                                    v-if="$can('product_delete')" v-b-tooltip.hover :title="__('delete')">
                                                    <i class="bi bi-trash"></i>
                                                </button>
                                            </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div v-else class="table-responsive">

                            <b-table :items="translatedProducts" :fields="visibleFields" :filter="filter" :filter-included-fields="filterOn"
                                :sort-by.sync="sortBy" :sort-desc.sync="sortDesc" :sort-direction="sortDirection"
                                :bordered="false" :busy="isLoading" stacked="md" show-empty
                                :tbody-tr-class="() => 'figma-tr align-middle'" small class="figma-order-table approve-table mb-0">
                                <template #empty="scope">
                                    <div class="text-center text-muted py-4"><i class="fa fa-inbox fa-2x d-block mb-2"></i>{{ scope.emptyText }}</div>
                                </template>
                                <template #emptyfiltered="scope">
                                    <div class="text-center text-muted py-4"><i class="fa fa-search fa-2x d-block mb-2"></i>{{ scope.emptyFilteredText }}</div>
                                </template>

                                <template #table-busy>
                                    <div class="text-center text-muted my-3">
                                        <b-spinner class="align-middle"></b-spinner>
                                        <strong>{{ __('loading') }}...</strong>
                                    </div>
                                </template>

                                <template #cell(seller_name)="row">
                                    {{ row.item.seller_name }}
                                </template>
                                <template #cell(image)="row">
                                    <img :src="row.item.image ? ($storageUrl + row.item.image) : $placeholderImage"
                                        @click="openLightbox(row.item.image ? ($storageUrl + row.item.image) : $placeholderImage)" alt="Image"
                                        class="approve-thumb" />
                                </template>
                                <template #cell(measurement)="row">

                                    {{ row.item.measurement }} <span
                                        v-if="row.item.short_code">{{ row.item.short_code }}</span>
                                </template>

                                <template #cell(stock)="row">

                                    <span v-if="row.item.is_unlimited_stock">{{ __('unlimited') }}</span>
                                    <template v-else>
                                        {{ row.item.stock }}
                                    </template>

                                </template>

                                <template #cell(availability)="row">
                                    <a class="btn btn-sm approve-toggle" @click="updateStatusProduct(productIndex(row.item), row.item.id)"
                                        v-if="$can('product_update')">
                                        <span class="primary-toggal" v-if="row.item.status == 1"><i
                                                class="fa fa-toggle-on fa-2x"></i></span>
                                        <span class="text-danger" v-else><i class="fa fa-toggle-off fa-2x"></i></span>
                                    </a>
                                </template>

                                <template #cell(status)="row">
                                    <span class='badge bg-success' v-if="row.item.status == 1">{{ __('available')
                                        }}</span>
                                    <span class='badge bg-danger' v-if="row.item.status == 0">{{ __('sold_out')
                                        }}</span>
                                </template>


                                <template #cell(indicator)="row">
                                    <span class='badge bg-info' v-if="row.item.indicator == 0">{{ __('none') }}</span>
                                    <span class='badge bg-success' v-if="row.item.indicator == 1">{{ __('veg') }}</span>
                                    <span class='badge bg-danger' v-if="row.item.indicator == 2">{{ __('non_veg')
                                        }}</span>
                                </template>
                                <template #cell(is_approved)="row">
                                    <span class='badge bg-success' v-if="row.item.is_approved == 1">{{ __('approved')
                                        }}</span>
                                    <span class='badge bg-danger' v-if="row.item.is_approved == 0">{{ __('not_approved')
                                        }}</span>
                                </template>
                                <template #cell(return_status)="row">
                                    <span class='badge bg-danger' v-if="row.item.return_status == 0">{{
                                        __('not_allowed') }}</span>
                                    <span class='badge bg-success' v-if="row.item.return_status == 1">{{ __('allowed')
                                        }}</span>
                                </template>
                                <template #cell(cancelable_status)="row">
                                    <span class='badge bg-danger' v-if="row.item.cancelable_status === 0">{{
                                        __('not_allowed') }}</span>
                                    <span class='badge bg-success' v-if="row.item.cancelable_status == 1">{{
                                        __('allowed') }}</span>
                                </template>

                                <template #cell(till_status)="row">
                                    <span class='badge bg-danger' v-if="row.item.till_status == '0'">{{
                                        __('not_applicable') }}</span>
                                    <span class='badge bg-success' v-if="row.item.till_status == '2'">{{
                                        row.item.till_status_name }}</span>
                                    <span class='badge bg-success' v-if="row.item.till_status == '3'">{{
                                        row.item.till_status_name }}</span>
                                    <span class='badge bg-success' v-if="row.item.till_status == '4'">{{
                                        row.item.till_status_name }}</span>
                                    <span class='badge bg-success' v-if="row.item.till_status == '6'">{{
                                        row.item.till_status_name }}</span>
                                </template>

                                <template #cell(actions)="row">
                                    <div class="d-flex gap-1 approve-row-actions">

                                        <template v-if="$roleSeller == login_user.role.name">
                                            <router-link
                                                :to="{ name: 'SellerViewProduct', params: { id: row.item.id, record: row.item } }"
                                                class="figma-action-btn" v-b-tooltip.hover :title="__('view')">
                                                <i class="bi bi-eye"></i>
                                            </router-link>
                                            <router-link
                                                :to="{ name: 'SellerEditProduct', params: { id: row.item.id, record: row.item } }"
                                                class="figma-action-btn" v-if="$can('product_update')" v-b-tooltip.hover
                                                :title="__('edit')">
                                                <i class="bi bi-pencil"></i>
                                            </router-link>
                                        </template>
                                        <template v-else>
                                            <router-link
                                                :to="{ name: 'ViewProduct', params: { id: row.item.id, record: row.item } }"
                                                class="figma-action-btn" v-b-tooltip.hover :title="__('view')">
                                                <i class="bi bi-eye"></i>
                                            </router-link>
                                            <router-link
                                                :to="{ name: 'EditProduct', params: { id: row.item.id, record: row.item } }"
                                                class="figma-action-btn" v-if="$can('product_update')" v-b-tooltip.hover
                                                :title="__('edit')">
                                                <i class="bi bi-pencil"></i>
                                            </router-link>
                                        </template>

                                        <button class="figma-action-btn figma-delete-btn"
                                            @click="deleteRecord(productIndex(row.item), row.item.product_variant_id)"
                                            v-if="$can('product_delete')" v-b-tooltip.hover :title="__('delete')">
                                            <i class="bi bi-trash"></i>
                                        </button>
                                    </div>
                                </template>
                            </b-table>
                        </div>
                    </div>
                    <div class="figma-table-footer flex-wrap gap-3">
                        <div class="d-flex align-items-center gap-2">
                            <label class="showing-results-text mb-0">{{ __('per_page') }}</label>
                            <b-form-select v-model="perPage" :options="pageOptions" size="sm"
                                style="width: auto;"></b-form-select>
                                <table-count :current-page="currentPage" :per-page="perPage" :total-rows="totalRows"></table-count>
                        </div>
                        <div class="d-flex align-items-center gap-3">
                            <b-pagination v-model="currentPage" :total-rows="totalRows" :per-page="perPage"
                                align="right" class="figma-pagination mb-0" hide-goto-end-buttons hide-ellipsis
                                prev-text="<" next-text=">"></b-pagination>
                        </div>
                    </div>
                </div>
            </section>
        </div>
        <FsLightbox :toggler="toggler" :sources="lightboxSources" :types="['image']" :onClose="handleClose">
        </FsLightbox>
    </div>
</template>
<script>
import { VuejsDatatableFactory } from 'vuejs-datatable';
import axios from "axios";
import Auth from '../../Auth.js';
import Vue from "vue";
import FsLightbox from "fslightbox-vue";
import ViewModeMixin from '../../mixins/ViewModeMixin';
export default {
    mixins: [ViewModeMixin],
    components: {
        VuejsDatatableFactory,
        FsLightbox,
    },
    data: function () {
        return {
            login_user: Auth.user,

            fields: [

                { key: 'product_variant_id', label: __('id'), visible: true, sortable: true, sortDirection: 'desc' },
                { key: 'product_id', label: __('product_id'), visible: true, sortable: true, sortDirection: 'desc' },
                { key: 'tax_id', label: __('tax_id'), visible: false, sortable: true, class: 'text-center' },
                { key: 'seller_name', label: __('seller_name'), visible: true, class: 'text-center', sortable: true },
                { key: 'name', label: __('name'), visible: true, sortable: true, class: 'text-center' },
                { key: 'image', label: __('image'), visible: true, class: 'text-center' },
                { key: 'price', label: __('price') + '(' + this.$currency + ')', visible: true, class: 'text-center', sortable: true },
                { key: 'discounted_price', label: __('discounted_price') + '(' + this.$currency + ')', /*label: 'D.Price',*/ visible: true, class: 'text-center', sortable: true },
                { key: 'measurement', label: __('measurement'), visible: true, class: 'text-center', sortable: true },
                { key: 'stock', label: __('stock'), visible: true, class: 'text-center', sortable: true },
                { key: 'availability', label: __('availability'), visible: true, class: 'text-center', sortable: true },
                { key: 'status', label: __('status'), visible: true, class: 'text-center', sortable: true },
                { key: 'indicator', label: __('indicator'), visible: false, class: 'text-center', sortable: true },
                { key: 'is_approved', label: __('is_approved'), visible: false, class: 'text-center', sortable: true },
                { key: 'return_status', label: __('return'), visible: false, class: 'text-center', sortable: true },
                { key: 'cancelable_status', label: __('cancellation'), visible: false, class: 'text-center', sortable: true },
                { key: 'till_status', label: __('till_status'), visible: false, class: 'text-center', sortable: true },
                { key: 'actions', label: __('actions'), visible: true }
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
            categories: [],
            sellers: [],
            products: [],

            category: "",
            seller: (Auth.user && Auth.user.role && Auth.user.role.name === "Seller" && Auth.user.seller !== null) ? Auth.user.seller.id : "",
            is_approved: "",

            selectedItems: [],
            select: '',
            all_select: false,
            isLoading: false,
            toggler: false,
            lightboxSources: [],
            slide: 1,

            activeImageIndex: 0,
            // Language handling for translations
            currentLanguageId: null,
            activeLanguages: [],
            showFilters: false,
            // The API returns one page at a time (grid view shows the array as is)
            serverPagination: true,
        }
    },
    watch: {
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
    },
    computed: {
        visibleFields() {
            return this.fields.filter(field => field.visible)
        },
        // Grid view cards: same records, search and order as the b-table
        gridProducts() {
            return this.pagedItems(this.gridFilterSort(this.translatedProducts));
        },
        isSellerRoute() {
            // Use this.$route to access the current route
            return this.$route.path.startsWith('/seller/');
        },
        // Computed property to translate products with seller names and product names
        translatedProducts: function () {
            if (!this.currentLanguageId || this.products.length === 0) {
                return this.products;
            }

            // Get translated sellers for lookup
            const sellersMap = {};
            if (this.translatedSellers && this.translatedSellers.length > 0) {
                this.translatedSellers.forEach(seller => {
                    sellersMap[seller.id] = seller.name;
                });
            }

            return this.products.map(product => {
                const translatedProduct = { ...product };

                // Translate product name
                if (product.translations && Array.isArray(product.translations)) {
                    const translation = product.translations.find(
                        t => t.language_id === this.currentLanguageId
                    );

                    if (translation && translation.name && translation.name.trim() !== '') {
                        translatedProduct.name = translation.name;
                    }
                }

                // Translate seller name
                if (product.seller_id && sellersMap[product.seller_id]) {
                    translatedProduct.seller_name = sellersMap[product.seller_id];
                }

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
        // Computed property to translate sellers for dropdown
        translatedSellers: function () {
            if (!this.currentLanguageId || this.sellers.length === 0) {
                return this.sellers;
            }

            // Get default language ID for fallback
            const defaultLanguage = this.activeLanguages.find(lang => lang.is_default === 1);
            const defaultLanguageId = defaultLanguage ? defaultLanguage.id : null;

            return this.sellers.map(seller => {
                const translatedSeller = { ...seller };
                let translatedName = seller.name; // Fallback to main table name

                if (seller.translations && Array.isArray(seller.translations)) {
                    // First try to find translation for current language
                    let translation = seller.translations.find(
                        t => t.language_id === this.currentLanguageId
                    );

                    // If not found, try default language
                    if (!translation && defaultLanguageId) {
                        translation = seller.translations.find(
                            t => t.language_id === defaultLanguageId
                        );
                    }

                    // Use translation name if available and not empty
                    if (translation && translation.name && translation.name.trim() !== '') {
                        translatedName = translation.name;
                    }
                }

                translatedSeller.name = translatedName;
                return translatedSeller;
            });
        },
    },

    mounted() {

    },
    created: function () {
        if (this.$roleSeller === this.login_user.role.name) {
            this.fields.forEach((field, index) => {
                if (field.key === 'seller_name') {

                    this.fields.splice(index, 1);
                }
            });
        }
        // Load languages first so we know currentLanguageId before mapping translations
        this.fetchActiveLanguages().then(() => {
            this.getRecords();
        }).catch(() => {
            this.getRecords();
        });
    },
    methods: {
        // Grid view: same client-side search (b-table :filter over all fields) and sort as the list view.
        productIndex(item) {
            return this.products.findIndex(product => product.product_variant_id === item.product_variant_id);
        },
        hasDiscount(item) {
            const price = parseFloat(item.price);
            const discounted = parseFloat(item.discounted_price);
            return !isNaN(discounted) && discounted > 0 && (isNaN(price) || discounted < price);
        },
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
        openLightbox(image) {

            this.lightboxSources = [image];
            this.toggler = !this.toggler;
        },
        handleClose() {
            this.lightboxSources = null;
            this.toggler = false;

        },
        getRecords() {
            this.isLoading = true
            let param = {
                "category": this.category,
                "seller": this.seller,
                "is_approved": 0,
                page: this.currentPage,
                per_page: this.perPage,
                filter: this.filter
            }
            axios.get(this.$apiUrl + '/products', {
                params: param
            }).then((response) => {
                this.isLoading = false;
                this.categories = response.data.data.categories;
                this.sellers = response.data.data.sellers;
                this.products = response.data.data.products;
                this.totalRows = response.data.total
            });
        },

        updateStatusProduct(index, id) {
            this.$swal.fire({
                title: "Are you Sure?",
                text: "You want to change status.",
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
                    axios.post(this.$apiUrl + '/products/change', postData)
                        .then((response) => {
                            this.isLoading = false
                            this.getRecords();
                            this.showMessage("success", response.data.message);
                        });
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
                    axios.post(this.$apiUrl + '/products/delete', postData)
                        .then((response) => {
                            this.isLoading = false
                            let data = response.data;
                            this.products.splice(index, 1)
                            //this.showSuccess(data.message);
                            this.showMessage("success", data.message);
                        });
                }
            });
        },
    }
};
</script>

<style scoped>
.approve-page ::v-deep .approve-thumb {
    width: 40px;
    height: 40px;
    object-fit: cover;
    border-radius: var(--ui-radius);
    border: 1px solid var(--ui-border);
    background: var(--ui-surface-muted);
    cursor: pointer;
}

/* !important: legacy global .figma-action-btn forces 40px with !important */
.approve-page ::v-deep .approve-row-actions .figma-action-btn {
    width: 32px !important;
    height: 32px !important;
    min-width: 32px;
    padding: 0 !important;
    font-size: 14px;
}

.approve-page ::v-deep .approve-row-actions {
    flex-wrap: nowrap;
}

.approve-page ::v-deep .approve-table td:last-child {
    white-space: nowrap;
}

.approve-page .item-card-actions {
    margin-left: auto;
}

.approve-page .approve-card-img {
    cursor: zoom-in;
}

.approve-page ::v-deep .approve-toggle {
    padding: 0;
    border: 0;
    line-height: 1;
}

.approve-page ::v-deep .approve-toggle .fa-2x {
    font-size: 24px;
}

.approve-page ::v-deep .approve-toggle .primary-toggal {
    color: var(--theme-primary-500);
}

@media (max-width: 767.98px) {
    .approve-page ::v-deep .approve-row-actions {
        flex-wrap: wrap;
    }

    .approve-page ::v-deep .approve-table td:last-child {
        white-space: normal;
    }
}
</style>
