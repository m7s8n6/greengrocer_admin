<template>
    <div>
        <div class="page-heading">
            <div class="page-title mb-2">
                <div class="d-flex justify-content-between align-items-center">
                    <h3 class="modern-page-title mb-0">{{ __('return_requests') }}</h3>
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb mb-0">
                            <li class="breadcrumb-item"><router-link to="/seller/dashboard" class="text-muted">{{
                                    __('dashboard') }}</router-link></li>
                            <li class="breadcrumb-item active text-primary" aria-current="page">{{ __('return_requests')
                                }}</li>
                        </ol>
                    </nav>
                </div>
            </div>

            <section class="section">
                <div class="figma-main-section-card">
                    <div class="card-body p-0">
                        <div
                            class="d-flex justify-content-between align-items-center flex-wrap gap-3 figma-action-bar-row p-3">
                            <div class="flex-grow-1">
                                <div class="figma-search-container">
                                    <i class="fa fa-search text-muted"></i>
                                    <input v-model="filter" type="text" class="figma-search-input"
                                        :placeholder="__('search')">
                                </div>
                            </div>
                            <div class="d-flex gap-2 flex-shrink-0">
                                <button class="btn btn-figma-filter d-flex align-items-center gap-2"
                                    @click="getReturnRequests()" v-b-tooltip.hover :title="__('refresh')">
                                    <i class="fa fa-refresh"></i>
                                    <span>{{ __('refresh') }}</span>
                                </button>
                            </div>
                        </div>

                        <div class="table-responsive mb-0">
                            <b-table :items="returnRequestsForTable" :fields="fields" :current-page="currentPage"
                                :per-page="perPage" :filter="filter" :filter-included-fields="filterOn"
                                :sort-by.sync="sortBy" :sort-desc.sync="sortDesc" :sort-direction="sortDirection"
                                :bordered="false" :busy="isLoading" stacked="md" show-empty small class="mb-0">

                                <template #table-busy>
                                    <div class="text-center text-black my-2">
                                        <b-spinner class="align-middle"></b-spinner>
                                        <strong>{{ __('loading') }}...</strong>
                                    </div>
                                </template>

                                <template #head(price)="row">
                                    {{ 'Price (' + $currency + ')' }}
                                </template>
                                <template #head(discounted_price)="row">
                                    {{ 'Discounted Price (' + $currency + ')' }}
                                </template>

                                <template #cell(status)="row">
                                    <span v-if="row.item.status === 0" class="badge bg-warning">{{ __('pending')
                                    }}</span>
                                    <span v-else-if="row.item.status === 1" class="badge bg-success">{{ __('approved')
                                    }}</span>
                                    <span v-else-if="row.item.status === 2" class="badge bg-danger">{{ __('cancelled')
                                    }}</span>
                                    <span v-else class="badge bg-danger">{{ __('undefine') }}</span>
                                </template>
                                <template #cell(created_at)="row">
                                    {{ new Date(row.item.created_at).toLocaleString() }}
                                </template>
                                <template #cell(customer_name)="row">
                                    {{ row.item.customer_name }}
                                </template>
                                <template #cell(product_name)="row">
                                    {{ row.item.product_name }}
                                </template>
                                <template #cell(variant_name)="row">
                                    {{ row.item.variant_name }}
                                </template>
                                <template #cell(actions)="row">
                                    <div class="d-flex gap-2 justify-content-center">
                                        <button class="figma-action-btn" @click="edit_record = row.item"
                                            v-if="$can('return_request_update')" v-b-tooltip.hover :title="__('edit')">
                                            <base-icon name="edit icon" hoverName="edit Hover" width="24" height="24" />
                                        </button>
                                        <button class="figma-action-btn"
                                            @click="deleteReturnRequests(row.index, row.item.id)"
                                            v-if="$can('return_request_delete')" v-b-tooltip.hover
                                            :title="__('delete')">
                                            <base-icon name="Type=Default" hoverName="Type=Hover" width="24"
                                                height="24" />
                                        </button>
                                    </div>
                                </template>

                            </b-table>
                        </div>
                        <div class="figma-table-footer flex-wrap gap-3">
                            <div class="showing-results-text small">
                                {{ __('Showing Result') }} : <span class="showing-bold">{{ pageStart }}</span> {{ __('of') }} <span class="showing-bold">{{ totalRows }}</span>
                            </div>
                            <div class="d-flex align-items-center gap-3">
                                <b-pagination v-model="currentPage" :total-rows="totalRows" :per-page="perPage"
                                    align="right" class="figma-pagination mb-0" hide-goto-end-buttons hide-ellipsis
                                    prev-text="<" next-text=">"></b-pagination>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>
<script>
export default {
    data: function () {
        return {
            fields: [
                { key: 'id', label: __('id'), sortable: true, sortDirection: 'desc' },
                { key: 'user_id', label: __('user_id'), sortable: true, class: 'text-center' },
                { key: 'customer_name', label: __('name'), sortable: true, class: 'text-center' },
                { key: 'product_name', label: __('product_name'), sortable: true, class: 'text-center' },
                { key: 'variant_name', label: __('variant_name'), sortable: true, class: 'text-center' },
                { key: 'price', label: __('price'), sortable: true, class: 'text-center' },
                { key: 'discounted_price', label: __('discounted_price'), sortable: true, class: 'text-center' },
                { key: 'quantity', label: __('quantity'), sortable: true, class: 'text-center' },
                { key: 'balance', label: __('balance'), sortable: true, class: 'text-center' },
                { key: 'status', label: __('status'), sortable: true, class: 'text-center' },
                { key: 'created_at', label: __('date'), sortable: true, class: 'text-center' },
                { key: 'actions', label: __('actions'), class: 'text-center' }
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
            create_new: null,
            edit_record: null,
            returnRequests: [],
        }
    },
    computed: {
        pageStart() {
            if (this.totalRows === 0) return 0;
            return (this.currentPage - 1) * this.perPage + 1;
        },
        returnRequestsForTable() {
            return this.returnRequests || [];
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
        this.totalRows = this.returnRequests.length
    },
    created: function () {
        this.getReturnRequests();
    },
    methods: {

        getReturnRequests() {
            this.isLoading = true
            axios.get(this.$sellerApiUrl + '/return_requests')
                .then((response) => {
                    this.returnRequests = response.data.data;
                    this.totalRows = this.returnRequests.length;
                    this.isLoading = false;
                });
        },
    }
};
</script>
