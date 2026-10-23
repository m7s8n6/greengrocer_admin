<template>
    <div class="stock-page">
        <div class="page-heading">
            <div class="page-title mb-2">
                <div class="d-flex justify-content-between align-items-center">
                    <h3 class="modern-page-title mb-0">{{ __('stock_management') }}</h3>
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb mb-0">
                            <li class="breadcrumb-item"><router-link to="/dashboard" class="text-muted">{{ __('dashboard') }}</router-link></li>
                            <li class="breadcrumb-item active text-primary" aria-current="page">{{ __('stock_management') }}</li>
                        </ol>
                    </nav>
                </div>
            </div>

            <section class="section">
                <div class="figma-main-section-card">
                    <div class="card-body p-0">
                        <div class="d-flex justify-content-between align-items-center flex-wrap gap-3 figma-action-bar-row p-3">
                            <div class="flex-grow-1" style="min-width: 250px;">
                                <div class="figma-search-container">
                                    <i class="fa fa-search text-muted"></i>
                                    <input v-model="filter" type="text" class="figma-search-input"
                                        :placeholder="__('search')" @input="getRecords()">
                                </div>
                            </div>
                            <div class="d-flex gap-2 flex-shrink-0">
                                <button class="btn btn-figma-filter d-flex align-items-center gap-2" @click="getRecords()" v-b-tooltip.hover :title="__('refresh')">
                                    <i class="fa fa-refresh"></i>
                                    <span>{{ __('refresh') }}</span>
                                </button>
                            </div>
                        </div>

                        <div class="table-responsive mb-0">
                            <b-table :key="tableKey" :items="groupedProducts" :fields="fields"
                                :sort-by.sync="sortBy" :sort-desc.sync="sortDesc" :sort-direction="sortDirection"
                                :bordered="false" :busy="isLoading" stacked="md" show-empty small
                                primary-key="product_variant_id"
                                class="mb-0 stock-table">
                                <template #empty="scope">
                                    <div class="text-center text-muted py-4"><i class="fa fa-inbox fa-2x d-block mb-2"></i>{{ scope.emptyText }}</div>
                                </template>
                                <template #emptyfiltered="scope">
                                    <div class="text-center text-muted py-4"><i class="fa fa-search fa-2x d-block mb-2"></i>{{ scope.emptyFilteredText }}</div>
                                </template>

                                <!-- ID column -->
                                <template #cell(product_variant_id)="row">

                                    {{ row.item.product_variant_id }}

                                </template>

                                <!-- Product Name column with rowspan -->
                                <template #cell(name)="row">
                                    {{ getTranslatedProductName(row.item) }}
                                </template>

                                <template #cell(image_url)="row">
                                    <img :src="row.item.image_url" alt="Image" class="stock-thumb"
                                        @click="openLightbox(row.item.image_url)" />
                                </template>


                                <!-- Stock column -->
                                <template #cell(stock)="row">

                                    <div
                                        v-if="edit_record && edit_record.product_variant_id === row.item.product_variant_id">
                                        <b-form-input v-model="edit_record.stock" type="number" min="0" size="sm" class="stock-input"
                                            @keyup.enter="updateStock(row.item.product_variant_id)"></b-form-input>
                                    </div>
                                    <div v-else>
                                        {{ row.item.stock }}
                                    </div>

                                </template>

                                <!-- Status column -->
                                <template #cell(pv_status)="row">

                                    <span v-if="row.item.pv_status == 1" class="badge bg-success">{{ __('available') }}</span>
                                    <span v-else class="badge bg-danger">{{ __('sold_out') }}</span>

                                </template>

                                <template #cell(actions)="row">
                                    <div class="d-flex gap-1 stock-row-actions">
                                        <button v-if="edit_record && edit_record.product_variant_id === row.item.product_variant_id"
                                                class="figma-action-btn stock-save-btn"
                                                @click="updateStock(row.item.product_variant_id)"
                                                v-b-tooltip.hover :title="__('save')">
                                            <i class="fa fa-check"></i>
                                        </button>
                                        <button v-else class="figma-action-btn" @click="edit_record = { ...row.item }"
                                            v-b-tooltip.hover :title="__('edit')">
                                            <i class="bi bi-pencil"></i>
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
                                <b-pagination v-model="currentPage" :total-rows="totalRows" :per-page="perPage" align="right" class="figma-pagination mb-0" hide-goto-end-buttons hide-ellipsis prev-text="<" next-text=">"></b-pagination>
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
import { VuejsDatatableFactory } from 'vuejs-datatable';
import FsLightbox from "fslightbox-vue";
import axios from "axios";


export default {
    components: {
        VuejsDatatableFactory,
        FsLightbox,
    },
    data() {
        return {
            fields: [
                { key: 'product_variant_id', label: __('id'), class: 'text-center', sortable: true, sortDirection: 'desc' },
                { key: 'image_url', label: __('image'), class: 'text-center' },
                { key: 'name', label: __('name'), class: 'text-center' },
                { key: 'stock', label: __('stock'), class: 'text-center' },
                { key: 'pv_status', label: __('status'), class: 'text-center' },
                { key: 'actions', label: __('actions') }
            ],
            totalRows: 0,
            currentPage: 1,
            perPage: this.$perPage || 10,
            pageOptions: this.$pageOptions || [5, 10, 15, 20],
            sortBy: '',
            sortDesc: false,
            sortDirection: 'asc',
            filter: null,
            filterOn: ['name'],
            isLoading: false,
            products: [],
            edit_record: null,
            groupedProducts: [],
            lightboxSources: [],
            toggler: false,
            tableKey: 0,
            currentLanguageId: null,
            activeLanguages: []
        }
    },
    computed: {
        pageStart() {
            if (this.totalRows === 0) return 0;
            return (this.currentPage - 1) * this.perPage + 1;
        },
        pageEnd() {
            return Math.min(this.currentPage * this.perPage, this.totalRows);
        }
    },
    created() {
        this.$eventBus.$on('recordSaved', (message) => {
            this.showMessage('success', message);
            this.getRecords();
        });
        // Load languages first so we know currentLanguageId before mapping translations
        this.fetchActiveLanguages().then(() => {
            this.getRecords();
        }).catch(() => {
            this.getRecords();
        });
    },
    watch: {
        currentPage() {
            this.getRecords();
        },
        perPage() {
            // a larger page size can leave the current page past the end - go back to page 1
            if (this.currentPage !== 1) {
                this.currentPage = 1;
            } else {
                this.getRecords();
            }
        }
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
        // Get translated product name with fallback logic (guards so rendering never throws)
        getTranslatedProductName(product) {
            if (!product) return '';
            if (!this.currentLanguageId || !product.translations) {
                return product.name != null ? String(product.name) : '';
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

            return product.name != null ? String(product.name) : '';
        },
        // Get translated variant (measurement + unit) with fallback logic (guards so rendering never throws)
        getTranslatedVariant(product) {
            const measurement = (product && product.measurement != null) ? String(product.measurement) : '';
            if (!product) {
                return measurement;
            }

            // Determine unit
            let translatedUnit = null;
            if (this.currentLanguageId) {
                const defaultLanguage = this.activeLanguages.find(lang => lang.is_default === 1);
                const defaultLanguageId = defaultLanguage ? defaultLanguage.id : null;

                if (product.unit_translations && Array.isArray(product.unit_translations)) {
                    let unitTranslation = product.unit_translations.find(
                        t => t.language_id === this.currentLanguageId
                    );

                    if (!unitTranslation && defaultLanguageId) {
                        unitTranslation = product.unit_translations.find(
                            t => t.language_id === defaultLanguageId
                        );
                    }

                    if (unitTranslation && unitTranslation.short_code && unitTranslation.short_code.trim() !== '') {
                        translatedUnit = unitTranslation.short_code;
                    }
                }
            }

            const unit = translatedUnit || product.short_code || '';

            if (measurement && unit) {
                // If it's a comma-separated list (e.g. for loose products), append unit to each item
                if (measurement.includes(',')) {
                    return measurement
                        .split(',')
                        .map(item => {
                            const trimmed = item.trim();
                            if (trimmed && !trimmed.endsWith(unit)) {
                                return `${trimmed} ${unit}`;
                            }
                            return trimmed;
                        })
                        .join(', ');
                } else if (!measurement.endsWith(unit)) {
                    return `${measurement} ${unit}`;
                }
            }

            return measurement;
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
            this.isLoading = true;
            axios.get(this.$apiUrl + '/products/get_product_variants', {
                params: {
                    page: this.currentPage,
                    per_page: this.perPage,
                    filter: this.filter
                }
            }).then((response) => {
                this.isLoading = false;
                const res = response.data;
                const ok = (res.status === 1 || res.status === '1') && res.data != null;
                if (ok) {
                    const raw = res.data;
                    const list = Array.isArray(raw) ? raw : (raw && typeof raw === 'object' ? Object.values(raw) : []);
                    this.groupedProducts = list.slice();
                    this.totalRows = typeof res.total === 'number' ? res.total : (res.total ? parseInt(res.total, 10) : 0);
                    this.tableKey += 1;
                } else {
                    this.groupedProducts = [];
                    this.totalRows = 0;
                }
            }).catch((err) => {
                this.isLoading = false;
                this.groupedProducts = [];
                this.totalRows = 0;
                this.showMessage('error', err.response && err.response.data && err.response.data.message ? err.response.data.message : __('something_went_wrong'));
            });
        },
        updateStock(product_variant_id) {
            if (this.edit_record.stock < 0) {
                this.showMessage('error', __('stock_must_be_positive'));
                return;
            }
            this.isLoading = true;
            axios.post(this.$apiUrl + '/products/update_variant_stock', {
                id: product_variant_id,
                stock: this.edit_record.stock
            }).then((response) => {
                this.isLoading = false;
                if (response.data.status === 1) {
                    this.showMessage('success', response.data.message);
                    this.getRecords(); // Refresh data after updating stock
                } else {
                    this.showMessage('error', response.data.message);
                }
                this.edit_record = null; // Reset edit state

            }).catch(() => {
                this.isLoading = false;
                this.showMessage('error', __('update_failed'));
            });
        }
    }
};
</script>

<style scoped>
.stock-page ::v-deep .stock-thumb {
    width: 40px;
    height: 40px;
    object-fit: cover;
    border-radius: var(--ui-radius);
    border: 1px solid var(--ui-border);
    background: var(--ui-surface-muted);
    cursor: pointer;
}

.stock-page ::v-deep .stock-input {
    max-width: 120px;
    min-height: 32px;
    height: 32px;
}

/* !important: legacy global .figma-action-btn forces 40px with !important */
.stock-page ::v-deep .stock-row-actions .figma-action-btn {
    width: 32px !important;
    height: 32px !important;
    min-width: 32px;
    padding: 0 !important;
    font-size: 14px;
}

.stock-page ::v-deep .stock-row-actions .stock-save-btn {
    background: var(--theme-primary-500) !important;
    border-color: var(--theme-primary-500) !important;
    color: var(--theme-neutral-50) !important;
}

@media (max-width: 767.98px) {
    .stock-page ::v-deep .stock-input {
        max-width: 100%;
    }
}
</style>
