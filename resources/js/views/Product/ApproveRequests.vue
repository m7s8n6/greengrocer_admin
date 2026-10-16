<template>
    <div>
        <div class="page-heading">
            <div class="page-heading d-flex justify-content-between align-items-center mb-4">
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
                            class="d-flex justify-content-between align-items-center flex-wrap gap-2 figma-action-bar-row">
                            <div class="flex-grow-1">
                                <div class="figma-search-container">
                                    <i class="fa fa-search text-muted"></i>
                                    <input v-model="filter" type="text" class="figma-search-input"
                                        :placeholder="__('search') || 'Search...'" @input="getRecords()">
                                </div>
                            </div>
                            <div class="d-flex gap-2">
                                <button class="btn btn-figma-filter d-flex align-items-center gap-2"
                                    :class="{ 'active': showFilters }" @click="showFilters = !showFilters">
                                    <base-icon name="Funnel" width="24" height="24" useCurrentColor />
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
                        <div class="table-responsive">

                            <b-table :items="translatedProducts" :fields="visibleFields" :filter="filter" :filter-included-fields="filterOn"
                                :sort-by.sync="sortBy" :sort-desc.sync="sortDesc" :sort-direction="sortDirection"
                                :bordered="false" :busy="isLoading" stacked="md" show-empty
                                :tbody-tr-class="() => 'figma-tr align-middle'" small class="figma-order-table mb-0">

                                <template #table-busy>
                                    <div class="text-center text-black my-2">
                                        <b-spinner class="align-middle"></b-spinner>
                                        <strong>{{ __('loading') }}...</strong>
                                    </div>
                                </template>

                                <template #cell(seller_name)="row">
                                    {{ row.item.seller_name }}
                                </template>
                                <template #cell(image)="row">
                                    <img :src="$storageUrl + row.item.image"
                                        @click="openLightbox($storageUrl + row.item.image)" alt="Image" height="50" style="cursor: pointer;" />
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
                                    <a class="btn btn-sm" @click="updateStatusProduct(row.index, row.item.id)"
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
                                    <div class="d-flex gap-2">

                                        <template v-if="$roleSeller == login_user.role.name">
                                            <router-link
                                                :to="{ name: 'SellerViewProduct', params: { id: row.item.id, record: row.item } }"
                                                class="figma-action-btn" v-b-tooltip.hover :title="__('view')">
                                                <base-icon name="Eye" hoverName="Type=Hover (1)" width="24"
                                                    height="24" />
                                            </router-link>
                                            <router-link
                                                :to="{ name: 'SellerEditProduct', params: { id: row.item.id, record: row.item } }"
                                                class="figma-action-btn" v-if="$can('product_update')" v-b-tooltip.hover
                                                :title="__('edit')">
                                                <base-icon name="edit icon" hoverName="edit Hover" width="24"
                                                    height="24" />
                                            </router-link>
                                        </template>
                                        <template v-else>
                                            <router-link
                                                :to="{ name: 'ViewProduct', params: { id: row.item.id, record: row.item } }"
                                                class="figma-action-btn" v-b-tooltip.hover :title="__('view')">
                                                <base-icon name="Eye" hoverName="Type=Hover (1)" width="24"
                                                    height="24" />
                                            </router-link>
                                            <router-link
                                                :to="{ name: 'EditProduct', params: { id: row.item.id, record: row.item } }"
                                                class="figma-action-btn" v-if="$can('product_update')" v-b-tooltip.hover
                                                :title="__('edit')">
                                                <base-icon name="edit icon" hoverName="edit Hover" width="24"
                                                    height="24" />
                                            </router-link>
                                        </template>

                                        <button class="figma-action-btn"
                                            @click="deleteRecord(row.index, row.item.product_variant_id)"
                                            v-if="$can('product_delete')" v-b-tooltip.hover :title="__('delete')">
                                            <base-icon name="Type=Default" hoverName="Type=Hover" width="24"
                                                height="24" />
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
export default {
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
                confirmButtonColor: '#37a279',
                cancelButtonColor: '#d33',
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
                confirmButtonColor: '#37a279',
                cancelButtonColor: '#d33',
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
