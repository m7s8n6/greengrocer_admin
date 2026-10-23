<template>
    <div>
        <div class="page-heading">
            <div class="page-title mb-2">
                <div class="d-flex justify-content-between align-items-center">
                    <h3 class="modern-page-title mb-0">{{ __('products_order') }}</h3>
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb mb-0">
                            <li class="breadcrumb-item">
                                <router-link to="/dashboard" class="text-muted">{{ __('dashboard') }}</router-link>
                            </li>
                            <li class="breadcrumb-item active text-primary" aria-current="page">{{ __('products_order')
                                }}</li>
                        </ol>
                    </nav>
                </div>
            </div>

            <section class="section">
                <div class="figma-main-section-card mb-4 product-order-card">
                    <div class="card-header">
                        <h4 class="card-title mb-0">{{ __('products_order_list') }}</h4>
                    </div>
                    <div class="card-body p-3 p-md-4">
                        <b-row class="mb-4">
                            <b-col md="6" lg="5">
                                <div class="figma-filter-group mb-2">
                                    <label class="figma-filter-label">{{ __('categories') }} <span
                                            class="text-danger">*</span></label>
                                    <select @change="getProducts()" v-model="category_id"
                                        class="form-select modern-select">
                                        <option value="0">{{ __('select_category') }}</option>
                                        <option v-for="category in translatedCategories" :value="category.id">
                                            {{ category.name }}
                                        </option>
                                    </select>
                                </div>
                                <span class="text-muted d-block small mt-1">{{
                                    __('select_a_categories_for_update_products_order_list') }}</span>
                            </b-col>
                        </b-row>

                        <b-row v-if="list.length > 0" class="mb-3">
                            <b-col lg="8">
                                <div class="d-flex align-items-center justify-content-between flex-wrap gap-3">
                                    <reorder-toggle v-model="editable"></reorder-toggle>
                                    <button type="button" class="btn btn-sm btn-outline-secondary" @click="orderList">
                                        <i class="fa fa-sort me-1"></i>
                                        {{ __('sort_by_original_order') }}
                                    </button>
                                </div>
                            </b-col>
                        </b-row>

                        <div v-if="list.length > 0">
                            <b-row>
                                <b-col lg="8">
                                    <div class="product-order-scroll">

                                    <ul id="sortable-row" class="list-group">
                                        <draggable class="list-group" tag="ul" v-model="list" v-bind="dragOptions"
                                            :move="onMove" :options="{ animation: 200 }" @start="isDragging = true"
                                            @end="isDragging = false" @change="updateList()">

                                            <li v-for="product in list" :key="product.row_order"
                                                class="list-group-item product-order-item d-flex justify-content-between align-items-center">
                                                <div class="d-flex align-items-center flex-grow-1">
                                                    <span class="order-number">{{ product.row_order
                                                        }}</span>
                                                    <span class="product-id">#{{ product.id }}</span>
                                                    <div class="product-image-container">
                                                        <img :src="product.image_url" alt="">
                                                    </div>
                                                    <span
                                                        class="product-name font-weight-semibold text-start flex-grow-1">{{
                                                        getTranslatedProductName(product) }}</span>
                                                </div>
                                                <span class="drag-handle"><i class="bi bi-grip-vertical"></i></span>
                                            </li>

                                        </draggable>
                                    </ul>
                                    </div>

                                </b-col>
                            </b-row>
                            <b-row>
                            <b-col lg="8" class="d-flex justify-content-end mt-3">
                                <button type="button" @click="updateProductsOrder()" class="btn btn-primary"
                                    :disabled="isLoading">
                                    <i class="fa fa-save me-2" v-if="!isLoading"></i>
                                    {{ __('save_order') }}
                                    <b-spinner v-if="isLoading" small label="Spinning" class="ms-2"></b-spinner>
                                </button>
                            </b-col>
                            </b-row>
                        </div>

                        <template v-if="list.length == 0 && category_id > 0">
                            <div class="product-order-empty">
                                <i class="bi bi-box-seam"></i>
                                <span>{{ __('no_products_found') }}</span>
                            </div>
                        </template>

                    </div>
                </div>
            </section>
        </div>
    </div>
</template>
<script>
import draggable from 'vuedraggable';
import axios from "axios";

export default {
    components: {
        draggable,
    },
    data: function () {
        return {
            products: [],
            list: [],
            editable: true,
            isDragging: false,
            delayedDragging: false,
            isLoading: false,
            categories: [],
            category_id: 0,
            // Language handling for translations
            currentLanguageId: null,
            activeLanguages: []
        }
    },
    computed: {
        dragOptions() {
            return {
                animation: 0,
                group: "description",
                disabled: !this.editable,
                ghostClass: "ghost"
            };
        },
        listString() {
            return JSON.stringify(this.list, null, 2);
        },
        list2String() {
            return JSON.stringify(this.list2, null, 2);
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
    watch: {
        isDragging(newValue) {
            if (newValue) {
                this.delayedDragging = true;
                return;
            }
            this.$nextTick(() => {
                this.delayedDragging = false;
            });
        }
    },
    mounted() {

    },
    created: function () {
        // Load languages first so we know currentLanguageId before mapping translations
        this.fetchActiveLanguages().then(() => {
            this.getCategories();
        }).catch(() => {
            this.getCategories();
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
        // Get translated product name with fallback logic
        getTranslatedProductName(product) {
            if (!this.currentLanguageId || !product.translations) {
                return product.name;
            }

            // Get default language ID for fallback
            const defaultLanguage = this.activeLanguages.find(lang => lang.is_default === 1);
            const defaultLanguageId = defaultLanguage ? defaultLanguage.id : null;

            if (Array.isArray(product.translations)) {
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
                    return translation.name;
                }
            }

            return product.name;
        },
        orderList() {
            this.getProducts();
        },
        onMove({ relatedContext, draggedContext }) {
            const relatedElement = relatedContext.element;
            const draggedElement = draggedContext.element;
            return (
                (!relatedElement || !relatedElement.fixed) && !draggedElement.fixed
            );
        },
        updateList() {
            this.list.map((product, index) => {
                product.row_order = index + 1;
            });
        },
        getProducts() {
            axios.get(this.$apiUrl + '/products/order_list?category_id=' + this.category_id)
                .then((response) => {
                    let data = response.data.data;
                    this.list = data.map((product, index) => {
                        return {
                            id: product.id,
                            name: product.name,
                            row_order: product.row_order,
                            image_url: product.image_url,
                            translations: product.translations || [], // Include translations for display
                            fixed: false
                        };
                    })
                });
        },
        updateProductsOrder() {
            this.isLoading = true;
            let formData = this.list;
            let url = this.$apiUrl + '/products/updateOrder';
            axios.post(url, formData).then(res => {
                let data = res.data;
                if (data.status === 1) {
                    this.showMessage("success", data.message);
                    this.isLoading = false;
                    this.getProducts();
                } else {
                    this.showError(data.message);
                    this.isLoading = false;
                }
            }).catch(error => {
                this.isLoading = false;
                if (error.request.statusText) {
                    this.showError(error.request.statusText);
                } else if (error.message) {
                    this.showError(error.message);
                } else {
                    this.showError(__('something_went_wrong'));
                }
            });
        },
        getCategories() {
            axios.get(this.$apiUrl + '/categories/options_json')
                .then((response) => {
                    if (response.data.data) {
                        this.categories = response.data.data;
                    }
                });
        },
    }
};
</script>
<style scoped>
.flip-list-move {
    transition: transform 0.5s;
}

.no-move {
    transition: transform 0s;
}

.ghost {
    opacity: 0.5;
    background: var(--theme-info-100);
}

.list-group {
    min-height: 20px;
}

.list-group-item {
    cursor: move;
}

.list-group-item i {
    cursor: pointer;
}

.product-order-card > .card-header {
    padding: 14px 20px !important;
    border-bottom: 1px solid var(--ui-border);
    background: transparent;
}

.product-order-card > .card-header .card-title {
    font-size: 16px;
    font-weight: 700;
    color: var(--ui-heading);
}

/* Sortable list: bordered, scrolls inside its own box */
.product-order-scroll {
    max-height: 420px;
    overflow-y: auto;
    border: 1px solid var(--ui-border);
    border-radius: var(--ui-radius-lg);
    background: var(--ui-surface);
}

.product-order-scroll .list-group {
    margin: 0;
    padding: 0;
}

.product-order-scroll ::v-deep .product-order-item {
    gap: 12px;
    padding: 10px 14px;
    border: 0;
    border-bottom: 1px solid var(--ui-border);
    border-radius: 0;
    background: var(--ui-surface);
    font-size: 13px;
    color: var(--ui-text);
}

.product-order-scroll ::v-deep .product-order-item:last-child {
    border-bottom: 0;
}

.product-order-scroll ::v-deep .product-order-item:hover {
    background: var(--ui-primary-soft);
}

.product-order-scroll ::v-deep .order-number {
    min-width: 28px;
    height: 24px;
    padding: 0 6px;
    margin-inline-end: 10px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: var(--ui-radius-sm);
    background: var(--ui-surface-muted);
    color: var(--ui-text-muted);
    font-size: 12px;
    font-weight: 600;
}

.product-order-scroll ::v-deep .product-id {
    min-width: 44px;
    margin-inline-end: 10px;
    font-size: 12px;
    color: var(--ui-text-subtle);
}

.product-order-scroll ::v-deep .product-image-container {
    width: 40px;
    height: 40px;
    flex: 0 0 40px;
    margin-inline-end: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    border: 1px solid var(--ui-border);
    border-radius: var(--ui-radius);
    background: var(--ui-surface-muted);
}

.product-order-scroll ::v-deep .product-image-container img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.product-order-scroll ::v-deep .product-name {
    font-weight: 600;
    min-width: 0;
    overflow-wrap: anywhere;
}

.product-order-scroll ::v-deep .drag-handle {
    color: var(--ui-text-subtle);
    font-size: 16px;
    cursor: grab;
}

.product-order-empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    padding: 32px 16px;
    color: var(--ui-text-muted);
    font-size: 13px;
    text-align: center;
}

.product-order-empty i {
    font-size: 28px;
    color: var(--ui-text-subtle);
}
</style>
