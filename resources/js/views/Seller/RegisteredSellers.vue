<template>
    <div>
        <div class="page-heading">
            <div class="page-title d-flex justify-content-between align-items-center flex-wrap gap-2 mb-4">
                <h3 class="modern-page-title mb-0">{{ __('seller_requests') }}</h3>
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb mb-0">
                        <li class="breadcrumb-item">
                            <router-link to="/dashboard" class="text-muted">{{ __('dashboard') }}</router-link>
                        </li>
                        <li class="breadcrumb-item active text-primary" aria-current="page">{{ __('seller_requests') }}
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
                        <!-- Grid view -->
                        <div v-if="viewMode === 'grid'">
                            <div v-if="isLoading" class="item-grid-state">
                                <i class="bi bi-hourglass-split"></i>{{ __('loading') }}...
                            </div>
                            <div v-else-if="!gridRecords.length" class="item-grid-state">
                                <i class="bi bi-inbox"></i>{{ __('no_records_to_show') }}
                            </div>
                            <div v-else class="item-grid item-grid--single-xs">
                                <div v-for="item in pagedItems(gridRecords)" :key="item.id" class="item-card">
                                    <div class="item-card-media item-card-media--avatar">
                                        <img v-if="item.logo" :src="$storageUrl + item.logo" :alt="item.store_name || item.name" />
                                        <span v-else class="item-card-avatar">{{ initial(item.name) }}</span>
                                    </div>
                                    <div class="item-card-body">
                                        <div class="item-card-title">{{ item.name }}</div>
                                        <div class="item-card-meta" v-if="item.store_name"><i class="bi bi-shop me-1"></i>{{ item.store_name }}</div>
                                        <div class="item-card-meta"><i class="bi bi-envelope me-1"></i>{{ item.email | emailMask }}</div>
                                        <div class="item-card-meta"><i class="bi bi-telephone me-1"></i>{{ item.mobile | mobileMask }}</div>
                                        <div class="item-card-meta" v-if="item.city && item.city.formatted_address"><i class="bi bi-geo-alt me-1"></i>{{ item.city.formatted_address }}</div>
                                        <div>
                                            <label v-if="item.status == 0" class='figma-status-pill bg-primary mb-0'>{{ __('registered') }}</label>
                                            <label v-else-if="item.status == 1" class='figma-status-pill bg-success mb-0'>{{ __('approved') }}</label>
                                            <label v-else-if="item.status == 2" class='figma-status-pill bg-warning mb-0'>{{ __('reject') }}</label>
                                            <label v-else-if="item.status == 3" class='figma-status-pill bg-danger mb-0'>{{ __('deactive') }}</label>
                                            <label v-else-if="item.status == 7" class='figma-status-pill bg-danger mb-0'>{{ __('removed') }}</label>
                                        </div>
                                        <div class="item-card-stats justify-content-center">
                                            <span class="item-card-chip">#{{ item.id }}</span>
                                            <span class="item-card-chip">{{ __('commission') }}: {{ item.commission }}</span>
                                            <span class="item-card-chip" v-if="item.categories_array" style="cursor: pointer;"
                                                v-b-tooltip.hover :title="item.categories_array"><i class="fa fa-info-circle"></i>{{ __('category') }}</span>
                                            <span class="item-card-chip" style="cursor: pointer;"
                                                v-b-tooltip.hover="{ html: true, title: sellerInfoHtml(item), boundary: 'window' }"><i class="fa fa-info-circle"></i>{{ __('seller_info') }}</span>
                                            <span class="item-card-chip" style="cursor: pointer;"
                                                v-b-tooltip.hover="{ html: true, title: storeInfoHtml(item), boundary: 'window' }"><i class="fa fa-info-circle"></i>{{ __('store_information') }}</span>
                                            <span class="item-card-chip" style="cursor: pointer;"
                                                v-b-tooltip.hover="{ html: true, title: otherInfoHtml(item), boundary: 'window' }"><i class="fa fa-info-circle"></i>{{ __('other_info') }}</span>
                                            <span class="item-card-chip" v-if="item.created_at"><i class="bi bi-calendar3"></i>{{ item.created_at }}</span>
                                        </div>
                                    </div>
                                    <div class="item-card-footer request-card-footer" v-if="$can('seller_delete')">
                                        <button class="btn btn-sm btn-outline-success request-card-btn" type="button"
                                            @click="updateStatus(fullIndex(item), item.id, 1)">
                                            <i class="bi bi-check-circle"></i>{{ __('approve') }}
                                        </button>
                                        <button class="btn btn-sm btn-outline-danger request-card-btn" type="button"
                                            @click="updateStatus(fullIndex(item), item.id, 2)">
                                            <i class="bi bi-x-circle"></i>{{ __('reject') }}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div v-else class="table-responsive">
                            <b-table :items="translatedRecords" :fields="fields" :current-page="currentPage"
                                :per-page="perPage" :filter-included-fields="filterOn" :sort-by.sync="sortBy"
                                :sort-desc.sync="sortDesc" :sort-direction="sortDirection" :bordered="false"
                                :busy="isLoading" stacked="md" show-empty
                                :tbody-tr-class="() => 'figma-tr align-middle'" small class="figma-order-table mb-0">
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

                                <template #cell(email)="row">
                                    {{ row.item.email | emailMask }}
                                </template>
                                <template #cell(mobile)="row">
                                    {{ row.item.mobile | mobileMask }}
                                </template>
                                <template #cell(seller_info)="row">
                                    <small class="d-inline-flex me-2 px-2 py-1 text-muted bg-secondary bg-opacity-10 border border-secondary border-opacity-10 rounded-2 align-middle"
                                        v-b-tooltip.hover="{ html: true, title: sellerInfoHtml(row.item), boundary: 'window' }">
                                        <i class="fa fa-info-circle"></i>
                                    </small>
                                    {{ row.item.name }}
                                </template>
                                <template #cell(store_info)="row">
                                    <small class="d-inline-flex me-2 px-2 py-1 text-muted bg-secondary bg-opacity-10 border border-secondary border-opacity-10 rounded-2 align-middle"
                                        v-b-tooltip.hover="{ html: true, title: storeInfoHtml(row.item), boundary: 'window' }">
                                        <i class="fa fa-info-circle"></i>
                                    </small>
                                    {{ row.item.store_name }}
                                </template>
                                <template #cell(other_info)="row">
                                    <small class="d-inline-flex me-2 px-2 py-1 text-muted bg-secondary bg-opacity-10 border border-secondary border-opacity-10 rounded-2 align-middle"
                                        v-b-tooltip.hover="{ html: true, title: otherInfoHtml(row.item), boundary: 'window' }">
                                        <i class="fa fa-info-circle"></i>
                                    </small>
                                    {{ row.item.store_name }}
                                </template>
                                <template #cell(logo)="row">
                                    <img :src="row.item.logo ? ($storageUrl + row.item.logo) : $placeholderImage" class="rounded-3 border" height="40" width="40" />
                                </template>
                                <template #cell(created_at)="row">
                                    {{ row.item.created_at }}
                                </template>
                                <template #cell(status)="row">
                                    <label v-if="row.item.status == 0" class='figma-status-pill bg-primary mb-0'>{{ __('registered')
                                        }}</label>
                                    <label v-else-if="row.item.status == 1" class='figma-status-pill bg-success mb-0'>{{ __('approved')
                                        }}</label>
                                    <label v-else-if="row.item.status == 2" class='figma-status-pill bg-warning mb-0'>{{ __('reject')
                                        }}</label>
                                    <label v-else-if="row.item.status == 3" class='figma-status-pill bg-danger mb-0'>{{ __('deactive')
                                        }}</label>
                                    <label v-else-if="row.item.status == 7" class='figma-status-pill bg-danger mb-0'>{{ __('removed')
                                        }}</label>
                                </template>

                                <template #cell(require_products_approval)="row">
                                    <label v-if="row.item.require_products_approval == 1" class='figma-status-pill bg-success mb-0'>{{
                                        __('yes') }}</label>
                                    <label v-else-if="row.item.require_products_approval == 0"
                                        class='figma-status-pill bg-danger mb-0'>{{ __('no') }}</label>
                                </template>
                                <template #cell(actions)="row">
                                    <div class="d-flex gap-2 justify-content-center">
                                        <button class="figma-action-btn" type="button"
                                            @click="updateStatus(row.index, row.item.id, 1)" v-if="$can('seller_delete')"
                                            v-b-tooltip.hover :title="__('approve')">
                                            <base-icon name="CheckCircle" width="24" height="24" />
                                        </button>
                                        <button class="figma-action-btn figma-delete-btn" type="button"
                                            @click="updateStatus(row.index, row.item.id, 2)" v-if="$can('seller_delete')"
                                            v-b-tooltip.hover :title="__('reject')">
                                            <base-icon name="XCircle" width="24" height="24" />
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
                                class="w-auto"></b-form-select>
                                <table-count :current-page="currentPage" :per-page="perPage" :total-rows="totalRows"></table-count>
                        </div>
                        <b-pagination v-model="currentPage" :total-rows="totalRows" :per-page="perPage" align="right"
                            class="figma-pagination mb-0" hide-goto-end-buttons hide-ellipsis prev-text="<"
                            next-text=">"></b-pagination>
                    </div>
                </div>

            </section>
        </div>
    </div>
</template>
<script>
import ViewModeMixin from '../../mixins/ViewModeMixin';

export default {
    mixins: [ViewModeMixin],
    data: function () {
        return {
            fields: [
                { key: 'id', label: __('id'), sortable: true, sortDirection: 'desc' },
                { key: 'seller_info', label: __('seller_info'), sortable: true, sortDirection: 'desc' },
                { key: 'store_info', label: __('store_information'), class: 'text-left', sortable: true, sortDirection: 'desc' },
                { key: 'categories_array', label: __('category'), sortable: true, sortDirection: 'desc' },
                { key: 'city.formatted_address', label: __('city'), sortable: true, sortDirection: 'desc' },
                { key: 'logo', label: __('logo'), class: 'text-center', sortable: true, sortDirection: 'desc' },
                { key: 'other_info', label: __('other_info'), class: 'text-left', sortable: true, sortDirection: 'desc' },
                { key: 'commission', label: __('commission'), sortable: true, sortDirection: 'desc' },
                { key: 'created_at', label: __('date'), sortable: true, sortDirection: 'desc' },
                { key: 'status', label: __('status'), sortable: true, sortDirection: 'desc' },
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
            records: [],

            filterStatus: 0,
            currentLanguageId: null,
            activeLanguages: []
        }
    },
    computed: {
        translatedRecords() {
            if (!this.currentLanguageId || !Array.isArray(this.records)) {
                return this.records;
            }
            return this.records.map(seller => {
                const translatedSeller = { ...seller };
                if (seller.translations && Array.isArray(seller.translations)) {
                    const translation = seller.translations.find(
                        t => t.language_id === this.currentLanguageId
                    );
                    if (translation) {
                        if (translation.name && translation.name.trim() !== '') {
                            translatedSeller.name = translation.name;
                        }
                        if (translation.store_name && translation.store_name.trim() !== '') {
                            translatedSeller.store_name = translation.store_name;
                        }
                    }
                }
                return translatedSeller;
            });
        },
        // Grid view: same records and order as the table (search is server side).
        gridRecords() {
            return this.gridSort(this.translatedRecords);
        },
        pageEnd() {
            return Math.min(this.currentPage * this.perPage, this.totalRows);
        }
    },

    created: function () {
        this.category_id = this.$route.params.id;
        this.$eventBus.$on('recordSaved', (message) => {
            this.showMessage('success', message);
            this.getRecords();
        });

        this.fetchActiveLanguages().then(() => {
            this.getRecords();
        });
    },
    watch: {
        perPage() {
            this.currentPage = 1;
        }
    },
    methods: {
        // Grid view: same order as the b-table (its sortBy / sortDesc are synced from the list view headers).
        fullIndex(item) {
            return (this.records || []).findIndex(r => r.id === item.id);
        },
        escapeHtml(value) {
            const div = document.createElement('div');
            div.textContent = value ?? '';
            return div.innerHTML;
        },
        kvTableHtml(title, rows) {
            const rowsHtml = rows.map(([label, value]) =>
                `<tr><th>${this.escapeHtml(label)}</th><td> : ${this.escapeHtml(value)}</td></tr>`
            ).join('');
            return `<div class="text-start"><strong>${this.escapeHtml(title)}</strong>`
                + `<table class="table table-borderless mb-0">${rowsHtml}</table></div>`;
        },
        sellerInfoHtml(item) {
            return this.kvTableHtml(__('sellr_details'), [
                [__('name'), item.name],
                [__('email'), item.email],
                [__('mobile'), item.mobile],
            ]);
        },
        storeInfoHtml(item) {
            return this.kvTableHtml(__('store_details'), [
                [__('name'), item.store_name],
                [__('description'), this.strip_tags(item.store_description)],
            ]);
        },
        otherInfoHtml(item) {
            const table = this.kvTableHtml(__('store_details'), [
                [__('tax_name'), item.tax_name],
                [__('tax_no'), item.tax_number],
                [__('pan_no'), item.pan_number],
            ]);
            const links = [];
            if (item.national_identity_card_url) {
                links.push(`<a target="_blank" href="${this.escapeHtml(item.national_identity_card_url)}" class="badge bg-success d-inline-flex align-items-center gap-1 mt-1">${this.escapeHtml(__('national_identity_card'))}</a>`);
            }
            if (item.address_proof_url) {
                links.push(`<a target="_blank" href="${this.escapeHtml(item.address_proof_url)}" class="badge bg-success d-inline-flex align-items-center gap-1 mt-1">${this.escapeHtml(__('address_proof'))}</a>`);
            }
            return table + links.join('<br>');
        },
        async fetchActiveLanguages() {
            try {
                const res = await axios.get(this.$apiUrl + '/active_languages');
                if (res.data.status === 1 && Array.isArray(res.data.data)) {
                    this.activeLanguages = res.data.data;
                    const appLocale = window.appLocale || 'en';
                    const currentLang = this.activeLanguages.find(
                        l => l.code === appLocale
                    );
                    if (currentLang) {
                        this.currentLanguageId = currentLang.id;
                    } else {
                        const def = this.activeLanguages.find(l => l.is_default === 1);
                        if (def) this.currentLanguageId = def.id;
                    }
                }
            } catch (e) {
                console.error('Language load failed', e);
            }
        },
        strip_tags(input) {
            return input.replace(/<\/?[^>]+(>|$)/g, "");
        },
        getRecords() {
            this.isLoading = true;
            axios.get(this.$apiUrl + '/sellers', {
                params: {
                    filterStatus: this.filterStatus,
                    search: this.filter
                }
            }).then((response) => {
                this.isLoading = false
                let data = response.data;
                this.records = data.data;
                this.totalRows = this.records.length
            });
        },


        updateStatus(index, id, selectedStatus) {
            this.$swal.fire({
                title: __('are_you_sure'),
                text: __('you_want_be_able_to_revert_this'),
                confirmButtonText: __('yes_sure'),
                cancelButtonText: __('cancel'),
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: 'var(--theme-primary-500)',
                cancelButtonColor: 'var(--theme-error-500)',
            }).then(async result => {
                if (result.value) {
                    let remarks = "";
                    if (selectedStatus === 2) {
                        const { value: text } = await this.$swal.fire({
                            title: __('remarks'),
                            input: 'textarea',
                            /*inputLabel: 'Remarks',*/
                            inputPlaceholder: 'Type your remarks here...',
                            inputAttributes: {
                                'aria-label': 'Type your remarks here'
                            },
                            confirmButtonText: "Submit",
                            cancelButtonText: "Cancel",
                            showCancelButton: true,

                            inputValidator: (value) => {
                                return new Promise((resolve) => {
                                    if (value !== '') {
                                        resolve()
                                    } else {
                                        resolve('The Remarks field is required')
                                    }
                                })
                            }
                        })
                        if (text) {
                            remarks = text;
                        }
                    }
                    if (selectedStatus === 1 || (selectedStatus === 2 && remarks !== "")) {
                        this.isLoading = true
                        let postData = {
                            id: id,
                            status: selectedStatus,
                            remark: remarks
                        }
                        axios.post(this.$apiUrl + '/sellers/update_status', postData)
                            .then((response) => {
                                this.isLoading = false
                                let data = response.data;
                                this.getRecords();
                                this.showMessage('success', data.message);
                            });
                    }
                }
            });
        },

        deleteSeller(index, id) {
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
                    axios.post(this.$apiUrl + '/sellers/delete', postData)
                        .then((response) => {
                            this.isLoading = false
                            let data = response.data;
                            this.records.splice(index, 1)
                            this.showSuccess(data.message)
                        });
                }
            });
        },
    }
};
</script>

<style scoped>
/* Approve / reject buttons in the grid card footer (registration requests) */
.request-card-footer {
    gap: 8px;
}

.request-card-btn {
    flex: 1 1 0;
    min-width: 0;
    height: 34px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    font-size: 12px;
    font-weight: 600;
    white-space: nowrap;
}
</style>
