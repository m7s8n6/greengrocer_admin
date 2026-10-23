<template>
    <div>
        <div class="page-heading">
            <div class="row">
                <div class="col-12 col-md-6 order-md-1 order-last">
                    <h3>{{ __('view_product') }}</h3>
                </div>
                <div class="col-12 col-md-6 order-md-2 order-first">
                    <nav aria-label="breadcrumb" class="breadcrumb-header float-start float-lg-end">
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item" v-if="isSellerRoute">
                                <router-link to="/seller/dashboard">{{ __('dashboard') }}</router-link>
                            </li>
                            <li class="breadcrumb-item" v-else>
                                <router-link to="/dashboard">{{ __('dashboard') }}</router-link>
                            </li>

                            <li class="breadcrumb-item" v-if="isSellerRoute">
                                <router-link to="/seller/manage_products">{{ __('manage_products') }}</router-link>
                            </li>
                            <li class="breadcrumb-item" v-else>
                                <router-link to="/manage_products">{{ __('manage_products') }}</router-link>
                            </li>

                            <li class="breadcrumb-item active" aria-current="page">
                                {{ __('product_details') }}
                            </li>
                        </ol>
                    </nav>
                </div>
            </div>

            <div v-if="!record" class="card">
                <div class="card-body text-center text-muted py-5">
                    <b-spinner small class="me-2"></b-spinner>{{ __('loading') }}...
                </div>
            </div>

            <div class="row product-view" v-if="record">
                <!-- Main column: gallery + info, description, variants -->
                <div class="col-12 col-lg-8">
                    <div class="card">
                        <div class="card-header d-flex justify-content-between align-items-center flex-wrap gap-2">
                            <h4>{{ __('product_details') }}</h4>
                            <span>
                                <router-link :to="isSellerRoute ? '/seller/manage_products' : '/manage_products'" class="btn btn-sm btn-outline-secondary">{{ __('manage_products')
                                    }}</router-link>
                            </span>
                        </div>
                        <div class="card-body">
                            <div class="row g-4">
                                <div class="col-12 col-md-5">
                                    <div class="product-view-main-image">
                                        <img :src="$storageUrl + record.image" v-if="record.image" alt="" />
                                        <i v-else class="bi bi-image"></i>
                                    </div>
                                    <div class="product-view-thumbs" v-if="other_images && other_images.length">
                                        <template v-if="other_images" v-for="image in other_images">
                                            <img :src="$storageUrl + image.image" alt="" />
                                        </template>
                                    </div>
                                </div>
                                <div class="col-12 col-md-7">
                                    <h4 class="product-view-name">{{ translatedRecord ? translatedRecord.name : '' }}</h4>
                                    <dl class="product-view-dl">
                                        <div>
                                            <dt>{{ __('product_id') }}</dt>
                                            <dd>#{{ record.id }}</dd>
                                        </div>
                                        <div>
                                            <dt>{{ __('category') }}</dt>
                                            <dd>
                                                <template v-if="translatedRecord && translatedRecord.category">
                                                    {{ translatedRecord.category.name }}
                                                </template>
                                            </dd>
                                        </div>
                                        <div>
                                            <dt>{{ __('seller') }}</dt>
                                            <dd>
                                                <template v-if="translatedRecord && translatedRecord.seller">
                                                    {{ translatedRecord.seller.name }}
                                                </template>
                                            </dd>
                                        </div>
                                        <div>
                                            <dt>{{ __('manufacturer') }}</dt>
                                            <dd>{{ translatedRecord ? translatedRecord.manufacturer : '' }}</dd>
                                        </div>
                                        <div>
                                            <dt>{{ __('made_in') }}</dt>
                                            <dd>
                                                <template v-if="record.made_in_country">
                                                    {{ record.made_in_country.name }}
                                                </template>
                                            </dd>
                                        </div>
                                        <div>
                                            <dt>{{ __('tax') }}</dt>
                                            <dd>
                                                <template v-if="translatedRecord && translatedRecord.tax">
                                                    {{ translatedRecord.tax.title }} {{
                                                        translatedRecord.tax.percentage }}%
                                                </template>
                                            </dd>
                                        </div>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="card">
                        <div class="card-header">
                            <h4>{{ __('product_request_description') }}</h4>
                        </div>
                        <div class="card-body">
                            <editor :placeholder="__('enter_product_description')"
                                :value="translatedRecord ? translatedRecord.description : ''"
                                :disabled="true"
                                :init="{
                                    height: 260,
                                    menubar: false,
                                    toolbar: false,
                                    statusbar: false,
                                    readonly: true
                                }" />
                        </div>
                    </div>

                    <div class="card">
                        <div class="card-header">
                            <h4>{{ __('product_variants') }}</h4>
                        </div>
                        <div class="card-body p-0">
                            <div class="table-responsive">
                                <table class="table mb-0">
                                    <thead>
                                        <tr>
                                            <th>{{ __('image') }}</th>
                                            <th>{{ __('product_name') }}</th>
                                            <th>{{ __('variant_id') }}</th>
                                            <th>{{ __('variant') }}</th>
                                            <th>{{ __('stock') }}</th>
                                            <th>{{ __('price') }}({{ $currency }})</th>
                                            <th>{{ __('discounted_price') }}({{ $currency }})</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="variant in record.variants" :key="variant.id">
                                            <td>
                                                <img v-if="variant.images && variant.images.length"
                                                    :src="variant.images[0].image_url"
                                                    class="variant-thumb" alt="">
                                                <img v-else-if="record.image" :src="$storageUrl + record.image"
                                                    class="variant-thumb" alt="">
                                            </td>
                                            <td>{{ record.name }}</td>
                                            <td>{{ variant.id }}</td>
                                            <td>{{ variantLabel(variant) }}</td>
                                            <td>{{ variant.stock }}</td>
                                            <td>{{ variant.price }}</td>
                                            <td>{{ variant.discounted_price }}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Side column: status & settings -->
                <div class="col-12 col-lg-4">
                    <div class="card">
                        <div class="card-header">
                            <h4>{{ __('product_status') }}</h4>
                        </div>
                        <div class="card-body">
                            <dl class="product-view-dl product-view-dl--side">
                                <div>
                                    <dt>{{ __('is_approved') }}</dt>
                                    <dd>
                                        <span class='badge bg-success' v-if="record.is_approved === 1">{{
                                            __('approved') }}</span>
                                        <span class='badge bg-danger' v-if="record.is_approved === 0">{{
                                            __('not_approved') }}</span>
                                    </dd>
                                </div>
                                <div>
                                    <dt>{{ __('status') }}</dt>
                                    <dd>
                                        <span v-if="record.status === 1" class="badge bg-success">{{
                                            __('active') }}</span>
                                        <span v-if="record.status === 0" class="badge bg-danger">{{
                                            __('deactive') }}</span>
                                    </dd>
                                </div>
                                <div>
                                    <dt>{{ __('indicator') }}</dt>
                                    <dd>
                                        <span v-if="record.status === 0" class="badge bg-info">{{ __('none')
                                            }}</span>
                                        <span v-if="record.status === 1" class="badge bg-success">{{
                                            __('veg') }}</span>
                                        <span v-if="record.status === 2" class="badge bg-danger">{{
                                            __('non_veg') }}</span>
                                    </dd>
                                </div>
                                <div>
                                    <dt>{{ __('return') }}</dt>
                                    <dd>
                                        <span class='badge bg-danger' v-if="record.return_status === 0">{{
                                            __('not_allowed') }}</span>
                                        <span class='badge bg-success' v-if="record.return_status === 1">{{
                                            __('allowed') }}</span>
                                    </dd>
                                </div>
                                <div>
                                    <dt>{{ __('cancellation') }}</dt>
                                    <dd>
                                        <span class='badge bg-danger'
                                            v-if="record.cancelable_status === 0">{{ __('not_allowed')
                                            }}</span>
                                        <span class='badge bg-success'
                                            v-if="record.cancelable_status === 1">{{ __('allowed') }}</span>
                                    </dd>
                                </div>
                                <div>
                                    <dt>{{ __('till_status') }}</dt>
                                    <dd>
                                        <span class='badge bg-danger' v-if="record.till_status == 0">{{
                                            __('not_applicable') }}</span>
                                        <span class='badge bg-success' v-if="record.till_status == 2">{{
                                            __('received') }}</span>
                                        <span class='badge bg-success' v-if="record.till_status == 3">{{
                                            __('processed') }}</span>
                                        <span class='badge bg-success' v-if="record.till_status == 4">{{
                                            __('shipped') }}</span>
                                        <span class='badge bg-success' v-if="record.till_status == 5">{{
                                            __('delivered') }}</span>
                                    </dd>
                                </div>
                            </dl>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from "axios";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Editor from '@tinymce/tinymce-vue';
export default {
    components: { 'editor': Editor },
    data: function () {
        return {
            editor: ClassicEditor,
            editorConfig: { toolbar: [] },
            image: null,
            main_image_path: "",
            other_images: null,
            id: null,
            record: null,
            // Language handling
            languages: [],
            activeLanguages: [],
            currentLanguageId: null,
            defaultLanguageId: null,
            isLoadingLanguages: false,
        }
    },
    computed: {
        isSellerRoute() {
            // Use this.$route to access the current route
            return this.$route.path.startsWith('/seller/');
        },
        translatedRecord() {
            if (!this.record || !this.currentLanguageId || !this.activeLanguages.length) {
                return this.record;
            }

            const defaultLang = this.activeLanguages.find(lang => lang.is_default === 1);
            const defaultLanguageId = defaultLang ? defaultLang.id : null;

            const translated = { ...this.record };

            // Helper to pick translation for a translations value
            const pickTranslation = (translations) => {
                if (!translations) return null;

                // Case 1: accessor from HasTranslations (single object for current lang)
                if (!Array.isArray(translations) && typeof translations === 'object') {
                    return translations;
                }

                // Case 2: full array of translations (all languages)
                if (Array.isArray(translations)) {
                    let t = translations.find(tr => tr.language_id === this.currentLanguageId);
                    if (!t && defaultLanguageId) {
                        t = translations.find(tr => tr.language_id === defaultLanguageId);
                    }
                    return t || null;
                }

                return null;
            };

            // Product fields
            const productTr = pickTranslation(this.record.translations);
            if (productTr) {
                if (productTr.name && productTr.name.trim() !== '') {
                    translated.name = productTr.name;
                }
                if (productTr.description && productTr.description.trim() !== '') {
                    translated.description = productTr.description;
                }
                if (productTr.manufacturer && productTr.manufacturer.trim() !== '') {
                    translated.manufacturer = productTr.manufacturer;
                }
            }

            // Seller name
            if (this.record.seller) {
                translated.seller = { ...this.record.seller };
                const sellerTr = pickTranslation(this.record.seller.translations);
                if (sellerTr && sellerTr.name && sellerTr.name.trim() !== '') {
                    translated.seller.name = sellerTr.name;
                }
            }

            // Tax title
            if (this.record.tax) {
                translated.tax = { ...this.record.tax };
                const taxTr = pickTranslation(this.record.tax.translations);
                if (taxTr && taxTr.title && taxTr.title.trim() !== '') {
                    translated.tax.title = taxTr.title;
                }
            }

            // Category name
            if (this.record.category) {
                translated.category = { ...this.record.category };
                const catTr = pickTranslation(this.record.category.translations);
                if (catTr && catTr.name && catTr.name.trim() !== '') {
                    translated.category.name = catTr.name;
                }
            }

            return translated;
        }
    },
    created: function () {
        this.id = this.$route.params.id;
        // Load languages first so we know currentLanguageId before mapping translations
        this.fetchActiveLanguages().then(() => {
            if (this.id) {
                this.getProduct();
            }
        }).catch(() => {
            if (this.id) {
                this.getProduct();
            }
        });
    },
    methods: {
        variantUnitShortCode(variant) {
            return variant.attribute_values && variant.attribute_values.length
                ? variant.attribute_values[0].short_code
                : null;
        },
        // Attribute-based variants (Size, Color, ...): show every attribute value picked.
        // Legacy variants saved before the attribute system: fall back to measurement + unit.
        variantLabel(variant) {
            if (variant.attribute_values && variant.attribute_values.length) {
                return variant.attribute_values.map(v => v.value).join(' / ');
            }
            const unitShortCode = this.variantUnitShortCode(variant);
            return unitShortCode ? (variant.measurement + ' ' + unitShortCode) : ('' + variant.measurement);
        },
        fetchActiveLanguages() {
            this.isLoadingLanguages = true;
            return axios.get(this.$apiUrl + '/active_languages')
                .then(response => {
                    this.isLoadingLanguages = false;
                    if (response.data.data) {
                        this.languages = response.data.data;
                        this.activeLanguages = response.data.data;

                        const defaultLang = this.languages.find(lang => lang.is_default === 1);
                        if (defaultLang) {
                            this.defaultLanguageId = defaultLang.id;
                        }

                        const appLocale = window.appLocale || 'en';
                        const currentLang = this.languages.find(lang => lang.code === appLocale);
                        this.currentLanguageId = currentLang ? currentLang.id : (defaultLang ? defaultLang.id : null);
                    }
                })
                .catch(() => {
                    this.isLoadingLanguages = false;
                });
        },
        getProduct() {
            this.isLoading = true
            axios.get(this.$apiUrl + '/products/edit/' + this.id)
                .then((response) => {
                    this.isLoading = false
                    let data = response.data;
                    if (data.status === 1) {
                        this.record = data.data
                        this.main_image_path = this.record.image;
                        this.other_images = this.record.images;
                    } else {
                        this.showError(data.message);
                        setTimeout(() => {
                            this.$router.back();
                        }, 1000);
                    }
                }).catch(error => {
                    this.isLoading = false;
                    if (error.request.statusText) {
                        this.showError(error.request.statusText);
                    } else if (error.message) {
                        this.showError(error.message);
                    } else {
                        this.showError("Something went wrong!");
                    }
                });
        },
        deleteRecord(variant_id) {
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
                    let postData = {
                        id: variant_id
                    }
                    axios.post(this.$apiUrl + '/products/delete', postData)
                        .then((response) => {
                            let data = response.data;
                            this.getProduct();
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
.variant-thumb {
    width: 40px;
    height: 40px;
    object-fit: cover;
    border-radius: var(--ui-radius);
    border: 1px solid var(--ui-border);
}

.product-view .card {
    margin-bottom: 20px;
}

.product-view .card > .card-body:not(.p-0) {
    padding-top: 20px;
}

.product-view .card > .card-header h4 {
    font-size: 16px;
    font-weight: 700;
    color: var(--ui-heading);
    margin-bottom: 0;
}

/* Gallery */
.product-view-main-image {
    aspect-ratio: 1 / 1;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid var(--ui-border);
    border-radius: var(--ui-radius-lg);
    background: var(--ui-surface-muted);
    overflow: hidden;
}

.product-view-main-image img {
    width: 100%;
    height: 100%;
    object-fit: contain;
}

.product-view-main-image i {
    font-size: 40px;
    color: var(--ui-text-subtle);
}

.product-view-thumbs {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 10px;
}

.product-view-thumbs img {
    width: 56px;
    height: 56px;
    object-fit: cover;
    border: 1px solid var(--ui-border);
    border-radius: var(--ui-radius);
    background: var(--ui-surface-muted);
}

/* Main info */
.product-view-name {
    font-size: 20px;
    font-weight: 700;
    color: var(--ui-heading);
    margin-bottom: 14px;
    overflow-wrap: anywhere;
}

.product-view-dl {
    margin: 0;
}

.product-view-dl > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
    padding: 10px 0;
    border-bottom: 1px solid var(--ui-border);
}

.product-view-dl > div:last-child {
    border-bottom: 0;
}

.product-view-dl dt {
    flex: 0 0 auto;
    font-size: 13px;
    font-weight: 400;
    color: var(--ui-text-muted);
}

.product-view-dl dd {
    margin: 0;
    font-size: 13px;
    font-weight: 600;
    color: var(--ui-text);
    text-align: right;
    overflow-wrap: anywhere;
}

.product-view-dl--side > div:first-child {
    padding-top: 0;
}

.product-view .table th,
.product-view .table td {
    white-space: nowrap;
}
</style>
