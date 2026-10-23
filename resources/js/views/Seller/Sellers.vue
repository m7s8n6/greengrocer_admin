<template>
    <div class="sellers-page-container">
        <div class="page-heading d-flex justify-content-between align-items-center mb-4">
            <h3 class="modern-page-title mb-0">{{ __('manage_sellers') }}</h3>
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb mb-0">
                    <li class="breadcrumb-item">
                        <router-link to="/dashboard" class="text-muted">{{ __('dashboard') }}</router-link>
                    </li>
                    <li class="breadcrumb-item active text-primary" aria-current="page">{{ __('sellers') }}</li>
                </ol>
            </nav>
        </div>

        <div class="page-content">
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
                                        :placeholder="__('search')" @input="getRecords()">
                                </div>
                            </div>
                            <div class="d-flex gap-2 flex-wrap">
                                <button class="btn btn-figma-filter d-flex align-items-center gap-2"
                                    :class="{ 'active': showFilters }" @click="showFilters = !showFilters">
                                    <base-icon name="Funnel" width="24" height="24" useCurrentColor />
                                    <span>{{ __('filters') || 'Filters' }}</span>
                                    <i class="bi ms-1" :class="showFilters ? 'bi-chevron-up' : 'bi-chevron-down'"></i>
                                </button>

                                <div class="view-toggle" role="group" :aria-label="__('view')">
                                    <button type="button" class="view-toggle-btn" :class="{ active: viewMode === 'grid' }" @click="setViewMode('grid')" v-b-tooltip.hover :title="__('grid_view')"><i class="bi bi-grid-3x3-gap-fill"></i></button>
                                    <button type="button" class="view-toggle-btn" :class="{ active: viewMode === 'list' }" @click="setViewMode('list')" v-b-tooltip.hover :title="__('list_view')"><i class="bi bi-list-ul"></i></button>
                                </div>
                                <button class="btn btn-figma-filter d-flex align-items-center gap-2"
                                    @click="getRecords()" v-b-tooltip.hover :title="__('refresh')">
                                    <i class="fa fa-refresh"></i>
                                    <span>{{ __('refresh') }}</span>
                                </button>
                                <router-link to="/sellers/create"
                                    class="btn btn-figma-filter d-flex align-items-center gap-2"
                                    v-if="$can('seller_create')">
                                    <i class="fa fa-plus"></i>
                                    <span>{{ __('add_seller') }}</span>
                                </router-link>
                            </div>
                        </div>
                        <b-collapse v-model="showFilters">
                            <div class="figma-filter-section">
                                <div class="row g-4">
                                    <div class="col-md-4">
                                        <div class="figma-filter-group">
                                            <label class="figma-filter-label">{{ __('status') }}</label>
                                            <select v-model="filterStatus" @change="getRecords()"
                                                class="form-control form-select modern-select">
                                                <option value="">{{ __('all') }}</option>
                                                <option value="1">{{ __('approve') }}</option>
                                                <option value="2">{{ __('not_approved') }}</option>
                                                <option value="3">{{ __('deactivate') }}</option>
                                                <option value="4">{{ __('blocked') }}</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </b-collapse>

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
                                        <div class="item-card-stats justify-content-center">
                                            <span class="item-card-chip">#{{ item.id }}</span>
                                            <span class="item-card-chip">{{ __('balance') }}: {{ item.balance }}</span>
                                            <span class="item-card-chip">{{ __('commission') }}: {{ item.commission }}</span>
                                            <span class="item-card-chip" style="cursor: pointer;" v-b-tooltip.hover
                                                :title="item.categories_array"><i class="fa fa-info-circle"></i>{{ __('categories') }}</span>
                                            <span class="item-card-chip" v-if="item.require_products_approval == 1 || item.require_products_approval == 0">
                                                {{ __('require_products_approval') }}:
                                                {{ item.require_products_approval == 1 ? __('yes') : __('no') }}</span>
                                        </div>
                                    </div>
                                    <div class="item-card-footer">
                                        <div class="d-flex align-items-center gap-1 flex-wrap">
                                            <span v-if="item.status == 1" class='figma-status-pill status-delivered'>{{ __('approved') }}</span>
                                            <span v-else-if="item.status == 2" class='figma-status-pill status-pending'>{{ __('not_approved') }}</span>
                                            <span v-else-if="item.status == 3" class='figma-status-pill status-cancelled'>{{ __('deactive') }}</span>
                                            <span v-else-if="item.status == 4" class='figma-status-pill badge bg-dark'>{{ __('blocked') }}</span>
                                            <span v-if="$can('seller_update') && (item.status == 1 || item.status == 3)"
                                                @click="updateStatusSeller(fullIndex(item), item.id, item.status)"
                                                class="figma-hover-light" v-b-tooltip.hover :title="__('availability')">
                                                <a class="btn btn-sm px-1" :class="item.status == 1 ? 'text-success' : 'text-danger'">
                                                    <i class="fa fs-5" :class="item.status == 1 ? 'fa-toggle-on' : 'fa-toggle-off'"></i></a>
                                            </span>
                                        </div>
                                        <div class="item-card-actions">
                                            <router-link
                                                :to="{ name: 'EditSeller', params: { id: item.id, record: item } }"
                                                class="figma-action-btn" v-if="$can('seller_update')" v-b-tooltip.hover
                                                :title="__('edit')">
                                                <base-icon name="edit icon" hoverName="edit Hover" width="24" height="24" />
                                            </router-link>
                                            <button class="figma-action-btn figma-delete-btn"
                                                @click="deleteSeller(fullIndex(item), item.id)" v-if="$can('seller_delete')"
                                                v-b-tooltip.hover :title="__('delete')">
                                                <base-icon name="Type=Default" hoverName="Type=Hover" width="24" height="24" />
                                            </button>
                                        </div>
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
                                    <div class="text-center py-4">
                                        <b-spinner class="align-middle" variant="primary"></b-spinner>
                                    </div>
                                </template>

                                <template #cell(email)="row">
                                    <span class="figma-text-muted">{{ row.item.email | emailMask }}</span>
                                </template>
                                <template #cell(mobile)="row">
                                    <span class="figma-text-muted">{{ row.item.mobile | mobileMask }}</span>
                                </template>

                                <template #cell(logo)="row">
                                    <img :src="row.item.logo ? ($storageUrl + row.item.logo) : $placeholderImage" class="rounded-3 border"
                                        height="40" width="40" />
                                </template>

                                <template #cell(status)="row">
                                    <span v-if="row.item.status == 1" class='figma-status-pill status-delivered'>{{
                                        __('approved') }}</span>
                                    <span v-else-if="row.item.status == 2" class='figma-status-pill status-pending'>{{
                                        __('not_approved') }}</span>
                                    <span v-else-if="row.item.status == 3" class='figma-status-pill status-cancelled'>{{
                                        __('deactive') }}</span>
                                    <span v-else-if="row.item.status == 4"
                                        class='figma-status-pill badge bg-dark'>{{ __('blocked') }}</span>
                                </template>

                                <template #cell(require_products_approval)="row">
                                    <span v-if="row.item.require_products_approval == 1"
                                        class='figma-status-pill status-delivered'>{{ __('yes') }}</span>
                                    <span v-else-if="row.item.require_products_approval == 0"
                                        class='figma-status-pill status-cancelled'>{{ __('no') }}</span>
                                </template>

                                <template #cell(availability)="row">
                                    <span v-if="$can('seller_update')"
                                        @click="updateStatusSeller(fullIndex(row.item), row.item.id, row.item.status)"
                                        class="figma-hover-light">
                                        <span class="text-success" v-if="row.item.status == 1">
                                            <a class="btn btn-sm"><i class="fa fa-toggle-on fs-5"></i></a>
                                        </span>
                                        <span class="text-danger" v-if="row.item.status == 3">
                                            <a class="btn btn-sm"><i class="fa fa-toggle-off fs-5"></i></a>
                                        </span>
                                    </span>
                                </template>

                                <template #cell(categories_array)="row">
                                    <div class="d-flex align-items-center gap-2">
                                        <small class="d-inline-flex px-2 py-1 text-muted bg-secondary bg-opacity-10 rounded-2"
                                            style="cursor: pointer;" v-b-tooltip.hover
                                            :title="row.item.categories_array">
                                            <i class="fa fa-info-circle"></i>
                                        </small>
                                        <span class="fw-bold">{{ row.item.bonus_percentage }}</span>
                                    </div>
                                </template>

                                <template #cell(actions)="row">
                                    <div class="d-flex gap-2">
                                        <router-link
                                            :to="{ name: 'EditSeller', params: { id: row.item.id, record: row.item } }"
                                            class="figma-action-btn" v-if="$can('seller_update')" v-b-tooltip.hover
                                            :title="__('edit')">
                                            <base-icon name="edit icon" hoverName="edit Hover" width="24" height="24" />
                                        </router-link>
                                        <button class="figma-action-btn figma-delete-btn"
                                            @click="deleteSeller(fullIndex(row.item), row.item.id)" v-if="$can('seller_delete')"
                                            v-b-tooltip.hover :title="__('delete')">
                                            <base-icon name="Type=Default" hoverName="Type=Hover" width="24"
                                                height="24" />
                                        </button>
                                    </div>
                                </template>

                            </b-table>
                        </div>

                        <div class="figma-table-footer flex-wrap gap-3">
                            <div class="d-flex align-items-center gap-2">
                                <label class="showing-results-text mb-0">{{ __('per_page') }}</label>
                                <b-form-select v-model="perPage" :options="pageOptions" size="sm"
                                    class="w-auto"></b-form-select>
                                <table-count :current-page="currentPage" :per-page="perPage" :total-rows="translatedRecords.length"></table-count>
                            </div>
                            <b-pagination v-model="currentPage" :total-rows="translatedRecords.length" :per-page="perPage"
                                align="right" class="figma-pagination mb-0" hide-goto-end-buttons hide-ellipsis
                                prev-text="<" next-text=">"></b-pagination>
                        </div>
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
                { key: 'name', label: __('name'), sortable: true, sortDirection: 'desc' },
                { key: 'store_name', label: __('store_name'), sortable: true, sortDirection: 'desc' },
                { key: 'email', label: __('email'), sortable: true, sortDirection: 'desc' },
                { key: 'mobile', label: __('mobile'), sortable: true, sortDirection: 'desc' },
                { key: 'balance', label: __('balance'), sortable: true, sortDirection: 'desc' },
                { key: 'logo', label: __('logo'), class: 'text-center', sortable: true, sortDirection: 'desc' },
                { key: 'commission', label: __('commission'), sortable: true, sortDirection: 'desc' },
                { key: 'categories_array', label: __('categories'), sortable: true, sortDirection: 'desc' },
                { key: 'status', label: __('status'), sortable: true, sortDirection: 'desc' },
                { key: 'availability', label: __('availability'), class: 'text-center', sortable: true, sortDirection: 'desc' },
                { key: 'require_products_approval', label: __('require_products_approval'), class: 'text-center', sortable: true, sortDirection: 'desc' },
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

            filterStatus: "",
            showFilters: false,
            currentLanguageId: null,
            activeLanguages: []
        }
    },
    computed: {
        translatedRecords() {
            let records = this.records || [];
            // Hide sellers with status 0 (Registered) from the list
            records = records.filter(s => s.status !== 0 && s.status !== '0');
            if (!this.currentLanguageId || !Array.isArray(records)) {
                return records;
            }
            return records.map(seller => {
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
        // Grid view: same records and order as the table (search / status filter are server side).
        gridRecords() {
            return this.gridSort(this.translatedRecords);
        },
        pageEnd() {
            return Math.min(this.currentPage * this.perPage, this.translatedRecords.length);
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
        // Position of a card's record in this.records (the delete handler splices that array).
        fullIndex(item) {
            return this.records.findIndex(r => r.id === item.id);
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
        updateStatusSeller(index, id, status) {
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
                    this.isLoading = true;
                    let newStatus = status === 1 ? 3 : 1;
                    let postData = {
                        id: id,
                        status: newStatus
                    }
                    axios.post(this.$apiUrl + '/sellers/update_status', postData)
                        .then((response) => {
                            this.isLoading = false
                            this.getRecords();
                            this.showMessage("success", response.data.message);
                        });
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
                            this.showMessage('success', data.message);
                        });
                }
            });
        },
    }
};
</script>
