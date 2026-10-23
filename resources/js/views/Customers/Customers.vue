<template>
    <div>
        <div class="page-heading">
            <div class="page-title">
                <div class="row">
                    <div class="col-12 col-md-6 order-md-1 order-last">
                        <h3>{{ __('customers_list') }}</h3>
                    </div>
                    <div class="col-12 col-md-6 order-md-2 order-first">
                        <nav aria-label="breadcrumb" class="breadcrumb-header float-start float-md-end">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><router-link to="/dashboard">{{ __('dashboard')
                                        }}</router-link></li>
                                <li class="breadcrumb-item active" aria-current="page">{{ __('customers_list') }}</li>
                            </ol>
                        </nav>
                    </div>
                </div>
            </div>
            <section class="section">
                <div class="figma-main-section-card">
                    <div class="card-body p-0">
                        <div
                            class="d-flex justify-content-between align-items-center flex-wrap gap-2 figma-action-bar-row">
                            <div class="d-flex align-items-center gap-2 flex-grow-1 flex-wrap">
                                <div class="figma-search-container">
                                    <i class="fa fa-search text-muted"></i>
                                    <input v-model="filter" type="text" class="figma-search-input"
                                        :placeholder="__('search')" @input="addFilter()">
                                </div>
                            </div>
                            <div class="d-flex gap-2 align-items-center flex-wrap">
                                <div class="view-toggle" role="group" :aria-label="__('view')">
                                    <button type="button" class="view-toggle-btn" :class="{ active: viewMode === 'grid' }" @click="setViewMode('grid')" v-b-tooltip.hover :title="__('grid_view')"><i class="bi bi-grid-3x3-gap-fill"></i></button>
                                    <button type="button" class="view-toggle-btn" :class="{ active: viewMode === 'list' }" @click="setViewMode('list')" v-b-tooltip.hover :title="__('list_view')"><i class="bi bi-list-ul"></i></button>
                                </div>
                                <button class="btn btn-figma-filter d-flex align-items-center gap-2"
                                    @click="getCustomers()" v-b-tooltip.hover :title="__('refresh')">
                                    <i class="fa fa-refresh"></i>
                                    <span>{{ __('refresh') }}</span>
                                </button>
                            </div>
                        </div>
                        <!-- Grid view -->
                        <div v-if="viewMode === 'grid'">
                            <div v-if="isLoading" class="item-grid-state">
                                <i class="bi bi-hourglass-split"></i>{{ __('loading') }}...
                            </div>
                            <div v-else-if="!gridCustomers.length" class="item-grid-state">
                                <template v-if="filter && customers.length">
                                    <i class="bi bi-search"></i>{{ __('no_records_matching_your_request') }}
                                </template>
                                <template v-else>
                                    <i class="bi bi-inbox"></i>{{ __('no_records_to_show') }}
                                </template>
                            </div>
                            <div v-else class="item-grid item-grid--single-xs">
                                <div v-for="item in pagedItems(gridCustomers)" :key="item.id" class="item-card">
                                    <div class="item-card-media item-card-media--avatar">
                                        <span class="item-card-avatar">{{ initial(item.name || item.email) }}</span>
                                    </div>
                                    <div class="item-card-body">
                                        <div class="item-card-title">{{ item.name || '-' }}</div>
                                        <div class="item-card-meta" v-if="item.email"><i class="bi bi-envelope me-1"></i>{{ item.email | emailMask }}</div>
                                        <div class="item-card-meta" v-if="item.mobile"><i class="bi bi-telephone me-1"></i>{{ item.mobile | mobileMask }}</div>
                                        <div class="item-card-stats justify-content-center">
                                            <span class="item-card-chip">#{{ item.id }}</span>
                                            <span class="item-card-chip">{{ __('balance') }}: {{ item.balance }}</span>
                                            <span class="item-card-chip" v-if="item.type">
                                                <img :src="$baseUrl + '/images/phone.svg'" height="14" alt="phone" v-if="item.type == 'phone'" />
                                                <img :src="$baseUrl + '/images/google.svg'" height="14" alt="google" v-if="item.type == 'google'" />
                                                <img :src="$baseUrl + '/images/apple.svg'" height="14" alt="apple" v-if="item.type == 'apple'" />
                                                <i class="fa fa-envelope" v-if="item.type == 'email'"></i>
                                                {{ item.type }}
                                            </span>
                                            <span class="item-card-chip" v-if="item.created_at"><i class="bi bi-calendar3"></i>{{ item.created_at }}</span>
                                        </div>
                                    </div>
                                    <div class="item-card-footer">
                                        <div>
                                            <span v-if="item.status == 1" class="badge bg-success">{{ __('active') }}</span>
                                            <span v-else class="badge bg-danger">{{ __('deactive') }}</span>
                                        </div>
                                        <div class="item-card-actions" v-if="$can('customer_update')">
                                            <a class="btn btn-sm px-1" @click="updateStatusCustomer(customers.indexOf(item), item.id)"
                                                v-b-tooltip.hover :title="__('status')">
                                                <span class="primary-toggal" v-if="item.status == 1"><i class="fa fa-toggle-on fa-lg"></i></span>
                                                <span class="text-danger" v-else><i class="fa fa-toggle-off fa-lg"></i></span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div v-else class="table-responsive">
                            <b-table :items="customers" :fields="fields" :current-page="currentPage" :per-page="perPage"
                                :filter="filter" :filter-included-fields="filterOn" :sort-by.sync="sortBy"
                                :sort-desc.sync="sortDesc" :sort-direction="sortDirection" :bordered="false"
                                :busy="isLoading" stacked="md" show-empty small class="figma-table mb-0"
                                :tbody-tr-class="() => 'figma-tr align-middle'">
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

                                <template #cell(name)="row">
                                    <div class="d-inline-flex align-items-center gap-2">
                                        <span class="figma-avatar-42 customer-avatar flex-shrink-0">{{ (row.item.name || row.item.email || '?').toString().charAt(0).toUpperCase() }}</span>
                                        <span class="font-weight-bold text-start">{{ row.item.name || '-' }}</span>
                                    </div>
                                </template>

                                <template #cell(email)="row">
                                    {{ row.item.email | emailMask }}
                                </template>

                                <template #cell(mobile)="row">
                                    {{ row.item.mobile | mobileMask }}
                                </template>

                                <template #cell(type)="row">
                                    <img :src="$baseUrl + '/images/phone.svg'" height="28" alt="phone"
                                        v-if="row.item.type == 'phone'" />
                                    <img :src="$baseUrl + '/images/google.svg'" height="28" alt="google"
                                        v-if="row.item.type == 'google'" />
                                    <img :src="$baseUrl + '/images/apple.svg'" height="28" alt="apple"
                                        v-if="row.item.type == 'apple'" />
                                    <i class="fa fa-envelope fa-lg text-muted" :title="__('email')" alt="email"
                                        v-if="row.item.type == 'email'"></i>
                                </template>

                                <template #cell(status)="row">
                                    <span v-if="row.item.status == 1" class="badge bg-success">{{ __('active') }}</span>
                                    <span v-else class="badge bg-danger">{{ __('deactive') }}</span>
                                </template>

                                <template #cell(created_at)="row">
                                    {{ row.item.created_at }}
                                </template>
                                <template v-if="$can('customer_update')" #cell(actions)="row">
                                    <a class="btn btn-sm" @click="updateStatusCustomer(row.index, row.item.id)">
                                        <span class="primary-toggal" v-if="row.item.status == 1"><i
                                                class="fa fa-toggle-on fa-lg"></i></span>
                                        <span class="text-danger" v-else><i class="fa fa-toggle-off fa-lg"></i></span>
                                    </a>

                                </template>

                            </b-table>
                        </div>
                        <div class="figma-table-footer flex-wrap gap-3">
                            <div class="d-flex align-items-center gap-3 flex-wrap">
<div class="d-flex align-items-center gap-2">
<label class="showing-results-text mb-0">{{ __('per_page') }}</label>
<b-form-select v-model="perPage" :options="pageOptions" size="sm" class="w-auto"></b-form-select>
</div>
<table-count :current-page="currentPage" :per-page="perPage" :total-rows="totalRows"></table-count>
</div>
                            <div class="d-flex align-items-center gap-3">
                                <b-pagination v-model="currentPage" :total-rows="totalRows" :per-page="perPage"
                                    align="right" class="figma-pagination mb-0" hide-goto-end-buttons hide-ellipsis
                                    prev-text="<" next-text=">">
                                </b-pagination>
                            </div>
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
            isLoading: false,
            fields: [
                { key: 'id', label: __('id'), sortable: true, sortDirection: 'desc' },
                { key: 'name', label: __('name'), sortable: true },
                { key: 'email', label: __('email'), sortable: true },
                { key: 'mobile', label: __('mobile_no'), sortable: true },
                { key: 'balance', label: __('balance'), sortable: true },
                { key: 'status', label: __('status'), sortable: true },
                { key: 'type', label: __('type'), sortable: true },
                { key: 'created_at', label: __('date_time'), sortable: true },
                { key: 'actions', label: __('actions') }
            ],
            totalRows: 1,
            currentPage: 1,
            perPage: this.$perPage,
            pageOptions: this.$pageOptions,

            sortBy: 'id',
            sortDesc: true,
            sortDirection: 'desc',
            filter: null,
            filterOn: [],
            customers: [],
        }
    },
    computed: {
        // Grid view: same records, client-side search and order (id desc by default) as the table.
        gridCustomers() {
            return this.gridSort(this.gridFilter(this.customers));
        },
        pageEnd() {
            return Math.min(this.currentPage * this.perPage, this.totalRows);
        },
        sortOptions() {
            // Create an options list from our fields
            return this.fields
                .filter(f => f.sortable)
                .map(f => {
                    return { text: f.label, value: f.key }
                })
        }
    },
    mounted() {
        // Set the initial number of items
        this.totalRows = this.customers.length
    },
    created: function () {
        this.$eventBus.$on('customersSaved', (message) => {
            this.showMessage("success", message);
            this.getCustomers();
            this.create_new = null;
        });
        this.getCustomers();
    },
    methods: {
        // Grid view: same client-side search the b-table :filter applies (any field contains the text).
        // Grid view: same order as the b-table (its sortBy / sortDesc are synced from the list view headers).
        addFilter() {
            this.customers = [];
            this.totalRows = 1;
            this.currentPage = 1;
            this.offset = 0;
            this.getCustomers();
        },
        getCustomers() {
            let vm = this;
            this.isLoading = true;
            axios.get(this.$apiUrl + '/customers')
                .then((response) => {
                    this.isLoading = false;
                    vm.isLoading = false;

                    this.customers = response.data.data;

                    this.totalRows = response.data.total;

                }).catch(error => {

                    vm.isLoading = false;
                    if (error.request?.statusText) {
                        this.showError(error.request?.statusText);
                    } else if (error.message) {
                        this.showError(error.message);
                    } else {
                        this.showError(__('something_went_wrong'));
                    }
                });

        },
        updateStatusCustomer(index, id) {
            this.$swal.fire({
                title: __('are_you_sure'),
                text: __('you_want_to_change_status'),
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
                    axios.post(this.$apiUrl + '/customers/change', postData)
                        .then((response) => {
                            this.isLoading = false
                            this.getCustomers();
                            this.showMessage("success", response.data.message);
                        });
                }
            });
        },

    }
};
</script>

<style scoped>
/* Initial avatar in the name column */
.customer-avatar {
    width: 34px;
    height: 34px;
    border-radius: 50%;
    background: var(--ui-primary-soft);
    color: var(--theme-primary-600);
    font-size: 13px;
}
</style>
