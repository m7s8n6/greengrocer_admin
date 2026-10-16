<template>
    <div>
        <div class="page-heading">
        <div class="page-heading d-flex justify-content-between align-items-center mb-4">
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
                            class="d-flex justify-content-between align-items-center flex-wrap gap-2 figma-action-bar-row">
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
                                    class="form-control form-select modern-select" style="min-width: 250px;">
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
                        <b-table :items="ratings" :fields="fields" :current-page="currentPage" :per-page="perPage"
                            :filter="filter" :filter-included-fields="filterOn" :sort-by.sync.sync="sortBy"
                            :sort-desc.sync="sortDesc" :sort-direction="sortDirection" :bordered="false"
                            :busy="isLoading" stacked="md" show-empty :tbody-tr-class="() => 'figma-tr align-middle'"
                            small class="figma-order-table mb-0">

                            <template #cell(rate)="row">
                                <!-- Use the renderStarRating method to display the star rating -->
                                {{ renderStarRating(row.item.rate) }}
                            </template>

                            <template #cell(review)="row">
                                <div class="review-cell-text">{{ row.item.review }}</div>
                            </template>

                            <template #table-busy>
                                <div class="text-center text-black my-2">
                                    <b-spinner class="align-middle"></b-spinner>
                                    <strong>{{ __('loading') }}...</strong>
                                </div>
                            </template>
                            <template #cell(updated_at)="row">
                                {{ new Date(row.item.updated_at).toLocaleString() }}
                            </template>
                            <template #cell(images)="row">
                                <a v-for="(image, index) in row.item.images" :key="index" @click="openLightbox(image.image_url)" style="cursor: pointer;">
                                    <img class="images_border" :src="image.image_url" alt="Image" height="50">
                                </a>
                            </template>
                            <template #cell(status)="row">
                                <span class='badge bg-success' v-if="row.item.status == 1">{{ __('activate') }}</span>
                                <span class='badge bg-danger' v-if="row.item.status == 0">{{ __('deactivate') }}</span>
                            </template>
                            <template #cell(actions)="row">
                                <div class="d-flex gap-2">
                                    <button class="figma-action-btn" @click="edit_record = row.item" v-b-tooltip.hover
                                        :title="__('edit')">
                                        <base-icon name="edit icon" hoverName="edit Hover" width="24" height="24" />
                                    </button>
                                    <button class="figma-action-btn" @click="deleteDietary(row.index, row.item.id)"
                                        v-b-tooltip.hover :title="__('delete')">
                                        <base-icon name="Type=Default" hoverName="Type=Hover" width="24" height="24" />
                                    </button>
                                </div>
                            </template>

                        </b-table>
                    </div>
                    <div class="figma-table-footer">
                        <div class="showing-results-text">
                            {{ __('total_ratings') }} : <span class="showing-bold">{{ totalRows }}</span> , {{
                            __('average_rating') }} :
                            <span class="showing-bold">{{ calculateAverageRating().toFixed(2) }}</span>
                        </div>
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
                this.ratings = response.data.data.rating_list;
                this.totalRows = this.ratings.length
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

.review-cell-text {
    white-space: normal;
    word-break: break-word;
    max-width: 320px;
    text-align: left;
}

.figma-warning-text {
    color: #EF4444;
    font-size: 14px;
    font-weight: 600;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 8px 16px;
    background: rgba(239, 68, 68, 0.08);
    border-radius: 8px;
    border: 1px solid rgba(239, 68, 68, 0.15);
}

/* Dark theme support */
body.theme-dark .figma-warning-text {
    background: rgba(239, 68, 68, 0.15);
    color: #F87171;
    border-color: rgba(239, 68, 68, 0.3);
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
    background-color: rgba(0, 0, 0, 0.7);
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
