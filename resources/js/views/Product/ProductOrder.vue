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
                <div class="figma-main-section-card mb-4">
                    <div class="card-body p-4">
                        <h4 class="card-title mb-4">{{ __('products_order_list') }}</h4>
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
                                <span class="text-danger d-block font-size-13 mt-2">{{
                                    __('select_a_categories_for_update_products_order_list') }}</span>
                            </b-col>
                        </b-row>

                        <b-row v-if="list.length > 0" class="mb-4">
                            <b-col md="6">
                                <div class="d-flex align-items-center gap-4">
                                    <div class="form-check form-switch mb-0">
                                        <input type="checkbox" v-model="editable" class="form-check-input"
                                            id="enableDragDrop">
                                        <label class="form-check-label ms-1" for="enableDragDrop">
                                            {{ __('enable_drag_and_drop') }}
                                        </label>
                                    </div>
                                    <button type="button" class="btn btn-sm btn-figma-filter px-3" @click="orderList">
                                        <i class="fa fa-sort me-1"></i>
                                        {{ __('sort_by_original_order') }}
                                    </button>
                                </div>
                            </b-col>
                        </b-row>

                        <div v-if="list.length > 0">
                            <b-row>
                                <b-col md="6" style="overflow-y:scroll;height:300px;">

                                    <ul id="sortable-row" class="list-group">
                                        <draggable class="list-group" tag="ul" v-model="list" v-bind="dragOptions"
                                            :move="onMove" :options="{ animation: 200 }" @start="isDragging = true"
                                            @end="isDragging = false" @change="updateList()">

                                            <li v-for="product in list" :key="product.row_order"
                                                class="list-group-item d-flex justify-content-between align-items-center py-2 px-3">
                                                <div class="d-flex align-items-center flex-grow-1">
                                                    <span class="order-number text-muted font-weight-bold text-end"
                                                        style="width: 30px; margin-right: 8px;">{{ product.row_order
                                                        }}</span>
                                                    <span class="text-muted" style="margin-right: 8px;">-</span>
                                                    <span class="product-id text-muted text-end"
                                                        style="width: 35px; margin-right: 12px;">{{ product.id }}</span>
                                                    <div class="product-image-container d-flex align-items-center justify-content-center"
                                                        style="width: 35px; height: 35px; margin-right: 12px; overflow: hidden; background-color: transparent;">
                                                        <img :src="product.image_url"
                                                            style="max-width: 100%; max-height: 100%; object-fit: contain;">
                                                    </div>
                                                    <span
                                                        class="product-name font-weight-semibold text-start flex-grow-1">{{
                                                        getTranslatedProductName(product) }}</span>
                                                </div>
                                                <span class="drag-handle text-muted"><i class="fa fa-arrows"></i></span>
                                            </li>

                                        </draggable>
                                    </ul>

                                </b-col>
                            </b-row>
                            <div class="d-flex justify-content-end mt-4">
                                <button type="button" @click="updateProductsOrder()" class="btn btn-primary px-5"
                                    :disabled="isLoading">
                                    <i class="fa fa-save me-2" v-if="!isLoading"></i>
                                    {{ __('save_order') }}
                                    <b-spinner v-if="isLoading" small label="Spinning" class="ms-2"></b-spinner>
                                </button>
                            </div>
                        </div>

                        <template v-if="list.length == 0 && category_id > 0">
                            <span>{{ __('no_products_found') }}</span>
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
    background: #c8ebfb;
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
</style>
