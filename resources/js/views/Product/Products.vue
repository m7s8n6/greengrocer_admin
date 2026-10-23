<template>
    <div class="products-page">
        <div class="page-heading">
            <div class="page-title mb-2">
                <div class="d-flex justify-content-between align-items-center">
                    <h3 class="modern-page-title mb-0">{{ __('manage_products') }}</h3>
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb mb-0">
                            <li class="breadcrumb-item" v-if="isSellerRoute">
                                <router-link to="/seller/dashboard" class="text-muted">{{ __('dashboard')
                                }}</router-link>
                            </li>
                            <li class="breadcrumb-item" v-else>
                                <router-link to="/dashboard" class="text-muted">{{ __('dashboard') }}</router-link>
                            </li>
                            <li class="breadcrumb-item active text-primary" aria-current="page">{{ __('manage_products')
                            }}</li>
                        </ol>
                    </nav>
                </div>
            </div>

            <section class="section">
                <div class="figma-main-section-card products-list-card">
                    <div class="card-body p-0">
                        <div
                            class="d-flex justify-content-between align-items-center flex-wrap gap-3 figma-action-bar-row p-3">
                            <div class="flex-grow-1" style="min-width: 250px;">
                                <div class="figma-search-container">
                                    <i class="fa fa-search text-muted"></i>
                                    <input v-model="filter" type="text" class="figma-search-input"
                                        :placeholder="__('search')" @input="getRecords()">
                                </div>
                            </div>
                            <div class="d-flex gap-2 align-items-center flex-wrap flex-shrink-0">
                                <button class="btn btn-figma-filter d-flex align-items-center gap-2"
                                    :class="{ 'active': showFilters }" @click="showFilters = !showFilters">
                                    <base-icon name="Funnel" width="16" height="16" useCurrentColor />
                                    <span>{{ __('filters') }}</span>
                                    <i class="bi ms-1" :class="showFilters ? 'bi-chevron-up' : 'bi-chevron-down'"></i>
                                </button>

                                <button class="btn btn-figma-filter d-flex align-items-center gap-2 products-bulk-delete"
                                    @click="multipleDelete" :disabled="selectedItems.length === 0">
                                    <i class="bi bi-trash"></i>
                                    <span>{{ __('bulk_delete') }}</span>
                                </button>

                                <label v-if="viewMode === 'grid'"
                                    class="btn btn-figma-filter d-flex align-items-center gap-2 mb-0 products-select-all">
                                    <input type="checkbox" v-model="all_select" @click="allSelectCheckBox"
                                        class="form-check-input m-0">
                                    <span>{{ __('select_all') }}</span>
                                </label>

                                <div class="view-toggle" role="group" :aria-label="__('view')">
                                    <button type="button" class="view-toggle-btn" :class="{ active: viewMode === 'grid' }" @click="setViewMode('grid')" v-b-tooltip.hover :title="__('grid_view')"><i class="bi bi-grid-3x3-gap-fill"></i></button>
                                    <button type="button" class="view-toggle-btn" :class="{ active: viewMode === 'list' }" @click="setViewMode('list')" v-b-tooltip.hover :title="__('list_view')"><i class="bi bi-list-ul"></i></button>
                                </div>

                                <button class="btn btn-figma-filter d-flex align-items-center gap-2"
                                    @click="getRecords()" v-b-tooltip.hover :title="__('refresh')">
                                    <i class="fa fa-refresh"></i>
                                    <span>{{ __('refresh') }}</span>
                                </button>
                                <b-dropdown v-if="viewMode === 'list'" variant="figma-columns" no-caret
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
                                                :disabled="visibleFields.length == 1 && field.visible"
                                                v-model="field.visible" class="form-check-input">
                                            <label class="form-check-label ms-2" :for="'col-' + field.key">{{
                                                field.label }}</label>
                                        </div>
                                    </b-dropdown-form>
                                </b-dropdown>
                                <template v-if="$roleSeller == login_user.role.name">
                                    <router-link to="/seller/manage_products/create"
                                        class="btn btn-figma-filter d-flex align-items-center gap-2">
                                        <i class="fa fa-plus"></i>
                                        <span>{{ __('add_product') }}</span>
                                    </router-link>
                                </template>
                                <template v-else>
                                    <router-link to="/manage_products/create"
                                        class="btn btn-figma-filter d-flex align-items-center gap-2">
                                        <i class="fa fa-plus"></i>
                                        <span>{{ __('add_product') }}</span>
                                    </router-link>
                                </template>
                            </div>
                        </div>

                        <b-collapse v-model="showFilters">
                            <div class="figma-filter-section">
                                <div class="row g-4">
                                    <div class="col-md-4">
                                        <div class="figma-filter-group">
                                            <label class="figma-filter-label">{{ __('category') }}</label>
                                            <select v-model="category" @change="getRecords()"
                                                class="form-select modern-select">
                                                <option value="">{{ __('all_categories') }}</option>
                                                <option v-for="category in translatedCategories" :value="category.id">{{
                                                    category.name }}</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="figma-filter-group">
                                            <label class="figma-filter-label">{{ __('status') }}</label>
                                            <select v-model="is_approved" @change="getRecords()"
                                                class="form-select modern-select">
                                                <option value="">{{ __('all_statuses') }}</option>
                                                <option value="1">{{ __('approved') }}</option>
                                                <option value="0">{{ __('not_approved') }}</option>
                                            </select>
                                        </div>
                                    </div>
                                    <template v-if="$roleSeller != login_user.role.name">
                                        <div class="col-md-4">
                                            <div class="figma-filter-group">
                                                <label class="figma-filter-label">{{ __('seller') }}</label>
                                                <select v-model="seller" @change="getRecords()"
                                                    class="form-select modern-select">
                                                    <option value="">{{ __('all_sellers') }}</option>
                                                    <option v-for="seller in translatedSellers" :value="seller.id">{{
                                                        seller.name }}
                                                    </option>
                                                </select>
                                            </div>
                                        </div>
                                    </template>
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
                                <div v-for="item in gridProducts" :key="item.product_variant_id" class="item-card"
                                    :class="{ 'is-selected': selectedItems.includes(item.product_variant_id) }">
                                    <label class="item-card-select mb-0">
                                        <input type="checkbox" v-model="selectedItems" @change="selectCheckBox"
                                            :value="item.product_variant_id" :aria-label="item.name">
                                    </label>
                                    <div class="item-card-media">
                                        <img :src="item.image ? ($storageUrl + item.image) : $placeholderImage" :alt="item.name"
                                            class="products-card-img" @click="openLightbox(item.image ? ($storageUrl + item.image) : $placeholderImage)" />
                                        <div class="item-card-badges">
                                            <span class="badge bg-success" v-if="item.is_approved == 1">{{ __('approved') }}</span>
                                            <span class="badge bg-danger" v-if="item.is_approved == 0">{{ __('not_approved') }}</span>
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
                                        <div class="item-card-stats" v-if="item.return_status == 1 || item.cancelable_status == 1">
                                            <span class="item-card-chip" v-if="item.return_status == 1">
                                                <i class="bi bi-arrow-counterclockwise"></i>{{ __('return') }}
                                            </span>
                                            <span class="item-card-chip" v-if="item.cancelable_status == 1">
                                                <i class="bi bi-x-circle"></i>{{ __('cancellation') }}
                                            </span>
                                        </div>
                                    </div>
                                    <div class="item-card-footer">
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
                                                    <router-link
                                                        :to="{ name: 'SellerProductRatings', params: { id: item.id, record: item } }"
                                                        class="figma-action-btn" v-if="$can('product_update')" v-b-tooltip.hover
                                                        :title="__('view_ratings')">
                                                        <i class="bi bi-star"></i>
                                                    </router-link>
                                                    <router-link
                                                        :to="{ name: 'SellerCloneProduct', params: { id: item.id, record: item, clone: true } }"
                                                        class="figma-action-btn" v-if="$can('product_update')" v-b-tooltip.hover
                                                        :title="__('clone_product')">
                                                        <i class="bi bi-files"></i>
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
                                                    <router-link
                                                        :to="{ name: 'ProductRatings', params: { id: item.id, record: item } }"
                                                        class="figma-action-btn" v-if="$can('product_update')" v-b-tooltip.hover
                                                        :title="__('view_ratings')">
                                                        <i class="bi bi-star"></i>
                                                    </router-link>
                                                    <router-link
                                                        :to="{ name: 'CloneProduct', params: { id: item.id, record: item, clone: true } }"
                                                        class="figma-action-btn" v-if="$can('product_update')" v-b-tooltip.hover
                                                        :title="__('clone_product')">
                                                        <i class="bi bi-files"></i>
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
                        <div v-else class="table-responsive mb-0">
                            <b-table class="products-table mb-0" :items="translatedProducts" :fields="visibleFields" :filter="filter"
                                :filter-included-fields="filterOn" :sort-by.sync="sortBy" :sort-desc.sync="sortDesc"
                                :sort-direction="sortDirection" :bordered="false" :busy="isLoading" stacked="md"
                                show-empty small>
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

                                <template #head(select)="row">
                                    <input type="checkbox" v-model="all_select" @click="allSelectCheckBox"
                                        class="form-check-input">
                                </template>
                                <template #cell(select)="row">
                                    <input type="checkbox" v-model="selectedItems" @change="selectCheckBox"
                                        :value="row.item.product_variant_id" class="form-check-input">
                                </template>

                                <template #cell(seller_name)="row">
                                    {{ row.item.seller_name }}
                                </template>

                                <template #cell(image)="row">
                                    <img :src="row.item.image ? ($storageUrl + row.item.image) : $placeholderImage"
                                        @click="openLightbox(row.item.image ? ($storageUrl + row.item.image) : $placeholderImage)" alt="Image"
                                        class="product-thumb" />
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

                                <template #cell(actions)="row">
                                    <div class="d-flex gap-1 product-row-actions">

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
                                            <router-link
                                                :to="{ name: 'SellerProductRatings', params: { id: row.item.id, record: row.item } }"
                                                class="figma-action-btn" v-if="$can('product_update')" v-b-tooltip.hover
                                                :title="__('view_ratings')">
                                                <i class="bi bi-star"></i>
                                            </router-link>
                                            <router-link
                                                :to="{ name: 'SellerCloneProduct', params: { id: row.item.id, record: row.item, clone: true } }"
                                                class="figma-action-btn" v-if="$can('product_update')" v-b-tooltip.hover
                                                :title="__('clone_product')">
                                                <i class="bi bi-files"></i>
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
                                            <router-link
                                                :to="{ name: 'ProductRatings', params: { id: row.item.id, record: row.item } }"
                                                class="figma-action-btn" v-if="$can('product_update')" v-b-tooltip.hover
                                                :title="__('view_ratings')">
                                                <i class="bi bi-star"></i>
                                            </router-link>
                                            <router-link
                                                :to="{ name: 'CloneProduct', params: { id: row.item.id, record: row.item, clone: true } }"
                                                class="figma-action-btn" v-if="$can('product_update')" v-b-tooltip.hover
                                                :title="__('clone_product')">
                                                <i class="bi bi-files"></i>
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
                </div>

            </section>
        </div>
        <FsLightbox :toggler="toggler" :sources="lightboxSources" :types="['image']" :onClose="handleClose">
        </FsLightbox>
    </div>
</template>
<script>
import axios from "axios";
import Auth from '../../Auth.js';
import FsLightbox from "fslightbox-vue";
import ViewModeMixin from '../../mixins/ViewModeMixin';
export default {
    mixins: [ViewModeMixin],
    components: {
        FsLightbox,
    },
    data: function () {
        return {
            login_user: Auth.user,

            fields: [
                { key: 'select', label: '', visible: true, class: 'text-center' },
                { key: 'product_variant_id', label: __('id'), visible: true, sortable: true, sortDirection: 'desc', class: 'text-center' },
                { key: 'product_id', label: __('product_id'), visible: true, sortable: true, sortDirection: 'desc', class: 'text-center' },
                { key: 'tax_id', label: __('tax_id'), visible: false, sortable: true, class: 'text-center' },
                { key: 'seller_name', label: __('seller_name'), visible: true, class: 'text-center', sortable: true },
                { key: 'name', label: __('name'), visible: true, sortable: true, class: 'text-center' },
                { key: 'image', label: __('image'), visible: true, class: 'text-center' },
                { key: 'price', label: __('price') + '(' + this.$currency + ')', visible: true, class: 'text-center', sortable: true },
                { key: 'discounted_price', label: __('discounted_price') + '(' + this.$currency + ')', visible: true, class: 'text-center', sortable: true },
                { key: 'is_approved', label: __('is_approved'), visible: true, class: 'text-center', sortable: true },
                { key: 'return_status', label: __('return'), visible: false, class: 'text-center', sortable: true },
                { key: 'cancelable_status', label: __('cancellation'), visible: false, class: 'text-center', sortable: true },
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
            showFilters: false,

            currentLanguageId: null,
            activeLanguages: [],
            // The API returns one page at a time (grid view shows the array as is)
            serverPagination: true,
        }
    },
    computed: {
        pageStart() {
            if (this.totalRows === 0) return 0;
            return (this.currentPage - 1) * this.perPage + 1;
        },
        pageEnd() {
            return Math.min(this.currentPage * this.perPage, this.totalRows);
        },
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
        if (!this.$can('product_list')) {
            this.showError("You do not have permission to view this page.");
            this.$router.back();
        }
        if (this.$roleSeller === this.login_user.role.name) {
            this.fields.forEach((field, index) => {
                if (field.key === 'seller_name') {
                    this.fields.splice(index, 1);
                }
            });
        }
        this.fetchActiveLanguages().then(() => {
            this.getRecords();
        });
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
        category() {
            this.resetSelection();
        },
        seller() {
            this.resetSelection();
        },
        is_approved() {
            this.resetSelection();
        },
        filter() {
            this.resetSelection();
        },
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
                "is_approved": this.is_approved,
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
                // Page changed: re-derive "Select All" from the new page's rows
                this.selectCheckBox();

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
                            if (data.status) {
                                this.products.splice(index, 1)
                                this.showMessage("success", data.message);
                            } else {
                                this.showMessage("error", data.message);
                            }
                        });
                }
            });

        },
        allSelectCheckBox() {
            if (this.all_select === false) {
                this.all_select = true;
                // Get all products from current page (considering filters)
                this.products.forEach(product => {
                    // Only add if not already selected to avoid duplicates
                    if (!this.selectedItems.includes(product.product_variant_id)) {
                        this.selectedItems.push(product.product_variant_id);
                    }
                });
            } else {
                this.all_select = false;
                // Remove only the products from current page from selected items
                const currentPageProductIds = this.products.map(product => product.product_variant_id);
                this.selectedItems = this.selectedItems.filter(id => !currentPageProductIds.includes(id));
            }
        },
        selectCheckBox() {
            let uniqueSelectedItems = [...new Set(this.selectedItems)];
            // Get current page product IDs
            const currentPageProductIds = this.products.map(product => product.product_variant_id);
            // Check if all current page products are selected
            const allCurrentPageSelected = currentPageProductIds.every(id => uniqueSelectedItems.includes(id));
            this.all_select = allCurrentPageSelected && currentPageProductIds.length > 0;
        },
        resetSelection() {
            // Reset selection when filters change
            this.selectedItems = [];
            this.all_select = false;
        },
        multipleDelete() {
            let uniqueSelectedItems = [...new Set(this.selectedItems)];
            if (uniqueSelectedItems.length !== 0) {
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
                        let ids = uniqueSelectedItems.toString();
                        this.isLoading = true
                        let postData = {
                            ids: ids
                        }
                        axios.post(this.$apiUrl + '/products/multiple_delete', postData)
                            .then((response) => {
                                this.isLoading = false
                                let data = response.data;
                                this.getRecords();
                                this.selectedItems = [];
                                this.all_select = false;
                                this.showMessage("success", data.message);

                            });
                    }
                });
            } else {
                this.showWarning("Select at least one record!");
            }
        }
    }
};
</script>

<style scoped>
/* Thumbnail: 40px rounded square */
.products-page ::v-deep .product-thumb {
    width: 40px;
    height: 40px;
    object-fit: cover;
    border-radius: var(--ui-radius);
    border: 1px solid var(--ui-border);
    background: var(--ui-surface-muted);
    cursor: pointer;
}

/* Checkbox column stays narrow */
.products-page ::v-deep .products-table thead th:first-child,
.products-page ::v-deep .products-table tbody td:first-child {
    width: 44px;
    padding-left: 16px !important;
    padding-right: 8px !important;
}

.products-page ::v-deep .products-table .form-check-input {
    position: static;
    margin: 0;
    width: 16px;
    height: 16px;
}

/* Row actions: compact 32px icon buttons. !important needed: the legacy global
   .figma-action-btn rule (custom-egrocer.scss) forces 40px with !important. */
.products-page ::v-deep .product-row-actions {
    flex-wrap: nowrap;
}

.products-page ::v-deep .product-row-actions .figma-action-btn {
    width: 32px !important;
    height: 32px !important;
    min-width: 32px;
    padding: 0 !important;
    font-size: 14px;
    line-height: 1;
}

.products-page ::v-deep .products-table td:last-child,
.products-page ::v-deep .products-table th:last-child {
    white-space: nowrap;
}

.products-page .products-bulk-delete:not(:disabled) {
    color: var(--theme-error-600) !important;
    border-color: color-mix(in srgb, var(--theme-error-500) 40%, transparent) !important;
}

.products-page .products-bulk-delete:not(:disabled) i {
    color: var(--theme-error-600) !important;
}

.products-page .item-card-actions {
    margin-left: auto;
}

.products-page .products-card-img {
    cursor: zoom-in;
}

.products-page .products-select-all {
    cursor: pointer;
    user-select: none;
}

.products-page .products-select-all .form-check-input {
    position: static !important;
    opacity: 1 !important;
    clip: auto !important;
    pointer-events: auto !important;
    width: 16px !important;
    height: 16px !important;
    margin: 0 !important;
    cursor: pointer !important;
    flex-shrink: 0 !important;
}

.products-page .products-bulk-delete:disabled {
    opacity: 0.55;
}

/* Phones: stacked rows, actions left-aligned and wrapping */
@media (max-width: 767.98px) {
    .products-page ::v-deep .products-table tbody td:first-child {
        width: auto;
    }

    .products-page ::v-deep .product-row-actions {
        flex-wrap: wrap;
    }

    .products-page ::v-deep .products-table td:last-child {
        white-space: normal;
    }
}
</style>
