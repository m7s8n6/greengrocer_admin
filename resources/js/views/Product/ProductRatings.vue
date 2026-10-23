<template>
    <div class="ratings-page">
        <div class="page-heading">
        <div class="page-title d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
            <h3 class="modern-page-title mb-0">{{ __('product_ratings') }}</h3>
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb mb-0">
                    <li class="breadcrumb-item">
                        <router-link to="/dashboard" class="text-muted">{{ __('dashboard') }}</router-link>
                    </li>
                    <li class="breadcrumb-item active text-primary" aria-current="page">{{ __('product_ratings') }}</li>
                </ol>
            </nav>
        </div>

            <section class="section">
                <div class="figma-main-section-card">
                    <div class="card-body p-0">
                        <!-- Modern Filter Action Bar -->
                        <div
                            class="d-flex justify-content-between align-items-center flex-wrap gap-2 figma-action-bar-row p-3">
                            <div class="flex-grow-1" v-if="product_id">
                                <div class="figma-search-container">
                                    <i class="fa fa-search text-muted"></i>
                                    <input v-model="filter" type="text" class="figma-search-input"
                                        :placeholder="__('search') || 'Search...'" @input="getRecords()">
                                </div>
                            </div>
                            <div class="d-flex gap-2 ms-auto align-items-center flex-wrap">
                                <div class="figma-warning-text me-2" v-if="!product_id">
                                    <span>{{ __('please_select_product_first_to_show_the_rating') || 'Please select product first to show the rating' }}</span>
                                </div>

                                <select @change="getRecords()" v-model="product_id"
                                    class="form-select ratings-product-select">
                                    <option value="">{{ __('select_product') }}</option>
                                    <option v-for="product in translatedProducts" :value="product.id">
                                        {{ product.name }}
                                    </option>
                                </select>

                                <button class="btn btn-figma-filter d-flex align-items-center gap-2"
                                    @click="getRecords()" v-b-tooltip.hover :title="__('refresh')">
                                    <i class="fa fa-refresh"></i>
                                    <span>{{ __('refresh') || 'Refresh' }}</span>
                                </button>
                            </div>
                        </div>
                        <div class="table-responsive mb-0">
                        <b-table :items="ratings" :fields="fields" :current-page="currentPage" :per-page="perPage"
                            :filter="filter" :filter-included-fields="filterOn" :sort-by.sync.sync="sortBy"
                            :sort-desc.sync="sortDesc" :sort-direction="sortDirection" :bordered="false"
                            :busy="isLoading" stacked="md" show-empty :tbody-tr-class="() => 'figma-tr align-middle'"
                            small class="figma-order-table mb-0">
                            <template #empty="scope">
                                <div class="text-center text-muted py-4"><i class="fa fa-inbox fa-2x d-block mb-2"></i>{{ scope.emptyText }}</div>
                            </template>
                            <template #emptyfiltered="scope">
                                <div class="text-center text-muted py-4"><i class="fa fa-search fa-2x d-block mb-2"></i>{{ scope.emptyFilteredText }}</div>
                            </template>

                            <template #cell(rate)="row">
                                <!-- Use the renderStarRating method to display the star rating -->
                                {{ renderStarRating(row.item.rate) }}
                            </template>

                            <template #cell(review)="row">
                                <div class="review-cell-text">{{ row.item.review }}</div>
                            </template>

                            <template #table-busy>
                                <div class="text-center text-muted my-3">
                                    <b-spinner class="align-middle"></b-spinner>
                                    <strong>{{ __('loading') }}...</strong>
                                </div>
                            </template>
                            <template #cell(updated_at)="row">
                                {{ new Date(row.item.updated_at).toLocaleString() }}
                            </template>
                            <template #cell(images)="row">
                                <a v-for="(image, index) in row.item.images" :key="index" @click="openLightbox(image.image_url)" class="rating-thumb-link">
                                    <img class="images_border rating-thumb" :src="image.image_url" alt="Image">
                                </a>
                            </template>
                            <template #cell(status)="row">
                                <span class='badge bg-success' v-if="row.item.status == 1">{{ __('activate') }}</span>
                                <span class='badge bg-danger' v-if="row.item.status == 0">{{ __('deactivate') }}</span>
                            </template>
                            <template #cell(actions)="row">
                                <div class="d-flex gap-1 rating-row-actions">
                                    <button class="figma-action-btn" @click="edit_record = row.item" v-b-tooltip.hover
                                        :title="__('edit')">
                                        <i class="bi bi-pencil"></i>
                                    </button>
                                    <button class="figma-action-btn figma-delete-btn" @click="deleteDietary(row.index, row.item.id)"
                                        v-b-tooltip.hover :title="__('delete')">
                                        <i class="bi bi-trash"></i>
                                    </button>
                                </div>
                            </template>

                        </b-table>
                        </div>
                    </div>
                    <div class="figma-table-footer flex-wrap gap-3">
                        <table-count :current-page="currentPage" :per-page="perPage" :total-rows="totalRows"></table-count>
                        <b-pagination v-model="currentPage" :total-rows="totalRows" :per-page="perPage" align="right"
                            class="figma-pagination mb-0"></b-pagination>
                    </div>
                </div>
            </section>
        </div>
        <FsLightbox :toggler="toggler" :sources="lightboxSource" :types="['image']" :onClose="handleClose">
        </FsLightbox>
    </div>
</template>
<script>
import draggable from 'vuedraggable';
import axios from "axios";
import FsLightbox from "fslightbox-vue";
export default {
    components: {
        draggable,
        FsLightbox,
    },
    data: function () {
        return {
            fields: [
                { key: 'id', label: __('id'), class: 'text-center', sortable: true, sortDirection: 'desc' },
                { key: 'user.name', label: __('user'), class: 'text-center' },
                { key: 'rate', label: __('product_ratings'), class: 'text-center', sortable: true },
                { key: 'review', label: __('reviews'), class: 'text-center' },
                { key: 'images', label: __('image'), class: 'text-center' },
                { key: 'updated_at', label: __('date'), class: 'text-center' },

            ],
            totalRows: 0,
            currentPage: 1,
            perPage: this.$perPage,
            pageOptions: this.$pageOptions,
            sortBy: 'id',
            sortDesc: false,
            sortDirection: 'asc',
            filter: null,
            filterOn: [],
            page: 1,
            ratings: [],
            list: [],
            editable: true,
            isDragging: false,
            delayedDragging: false,
            isLoading: false,
            products: [],
            product_id: this.id !== undefined ? this.id : "",

            lightboxSource: [],  // array to store sources for each row
            toggler: false,
            activeImageIndex: 0,
            // Language handling for translations
            currentLanguageId: null,
            activeLanguages: [],
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

        $(document).on('click', '[data-toggle="lightbox"]', function (event) {
            event.preventDefault();
            $(this).ekkoLightbox();
        });

    },
    created: function () {
        this.id = this.$route.params.id;
        if (this.id !== undefined) {
            this.product_id = this.id;
        }
        // Load languages first so we know currentLanguageId before mapping translations
        this.fetchActiveLanguages().then(() => {
            this.getProducts();
            this.getRecords();
        }).catch(() => {
            this.getProducts();
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
            // Populate lightboxSources with the image URLs
            this.lightboxSource = [image];
            // Open the lightbox at the selected index
            this.toggler = !this.toggler;
        },
        handleClose(rowIndex) {
            this.lightboxSource[rowIndex] = null;  // Close lightbox for the specific row
        },
        calculateAverageRating() {
            if (this.ratings.length === 0) {
                return 0; // Return 0 if there are no ratings to avoid division by zero
            }

            const totalRatings = this.ratings.reduce((total, rating) => total + rating.rate, 0);
            const averageRating = totalRatings / this.ratings.length;

            return averageRating;
        },
        renderStarRating(rate) {
            const totalStars = 5;
            const filledStars = rate;
            const blankStars = totalStars - filledStars;

            const starIconFilled = '⭐️';
            const starIconBlank = '☆';

            const ratingString = starIconFilled.repeat(filledStars) + starIconBlank.repeat(blankStars);

            return ratingString;
        },


        getRecords() {
            this.isLoading = true;
            let param = {
                "product_id": this.product_id
            }

            axios.get(this.$baseUrl + '/customer/products/ratings_list', {
                params: param
            }).then((response) => {
                this.isLoading = false;
                const data = response.data && response.data.data;
                this.ratings = (data && data.rating_list) || [];
                this.totalRows = this.ratings.length
            }).catch(() => {
                this.isLoading = false;
                this.ratings = [];
                this.totalRows = 0;
            });
        },


        getProducts() {
            axios.get(this.$apiUrl + '/products/active')
                .then((response) => {
                    this.products = response.data.data;
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

.review-cell-text {
    white-space: normal;
    word-break: break-word;
    max-width: 320px;
    text-align: start;
}

.figma-warning-text {
    color: var(--theme-warn-700);
    font-size: 13px;
    font-weight: 600;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 8px 12px;
    background: var(--theme-warn-50);
    border-radius: var(--ui-radius);
    border: 1px solid color-mix(in srgb, var(--theme-warn-500) 30%, transparent);
}

/* Dark theme support */
body.theme-dark .figma-warning-text {
    background: color-mix(in srgb, var(--theme-warn-500) 15%, transparent);
    color: var(--theme-warn-300);
    border-color: color-mix(in srgb, var(--theme-warn-500) 30%, transparent);
}

.ratings-product-select {
    width: 250px;
    max-width: 100%;
    height: 38px;
    padding: 0 32px 0 12px;
    line-height: 36px;
    font-size: 13px;
    color: var(--ui-text);
    border-color: var(--ui-border-strong);
    border-radius: var(--ui-radius);
}

@media (max-width: 575.98px) {
    .ratings-product-select {
        width: 100%;
    }
}

.ratings-page ::v-deep .rating-thumb-link {
    display: inline-block;
    margin: 0 4px 4px 0;
    cursor: pointer;
}

.ratings-page ::v-deep .rating-thumb {
    width: 40px;
    height: 40px;
    object-fit: cover;
    border-radius: var(--ui-radius);
    border: 1px solid var(--ui-border);
}

/* !important: legacy global .figma-action-btn forces 40px with !important */
.ratings-page ::v-deep .rating-row-actions .figma-action-btn {
    width: 32px !important;
    height: 32px !important;
    min-width: 32px;
    padding: 0 !important;
    font-size: 14px;
}

@media (max-width: 575.98px) {
    .ratings-product-select {
        min-width: 0;
        width: 100% !important;
    }

    .figma-warning-text {
        width: 100%;
    }
}
</style>
<style>
/* Add some basic styling to the lightbox */
#lightbox {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: color-mix(in srgb, var(--theme-neutral-950) 70%, transparent);
    justify-content: center;
    align-items: center;
    overflow: hidden;
    z-index: 999;
}

#lightbox-content {
    position: relative;
    max-width: 80%;
    max-height: 80%;
}

.close {
    position: absolute;
    top: 15px;
    right: 15px;
    font-size: 30px;
    color: #fff;
    cursor: pointer;
}
</style>
