<template>
    <div>
        <div class="page-heading">
            <div class="page-title">
                <div class="row">
                    <div class="col-12 col-md-6 order-md-1 order-last">
                        <h3>{{ __('wishlists_list') }}</h3>
                    </div>
                    <div class="col-12 col-md-6 order-md-2 order-first">
                        <nav aria-label="breadcrumb" class="breadcrumb-header float-start float-lg-end">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><router-link to="/dashboard">{{ __('dashboard')
                                        }}</router-link></li>
                                <li class="breadcrumb-item active" aria-current="page">{{ __('wishlists_list') }}</li>
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
                                <div class="figma-search-container" style="min-width: 250px;">
                                    <i class="fa fa-search text-muted"></i>
                                    <input v-model="filter" type="text" class="figma-search-input"
                                        :placeholder="__('search')">
                                </div>
                            </div>
                            <div class="d-flex gap-2 align-items-center flex-wrap">
                                <button class="btn btn-figma-filter d-flex align-items-center gap-2"
                                    @click="getWishlists()" v-b-tooltip.hover :title="__('refresh')">
                                    <i class="fa fa-refresh"></i>
                                    <span>{{ __('refresh') }}</span>
                                </button>
                            </div>
                        </div>
                        <div class="table-responsive">
                            <b-table :items="wishlists" :fields="fields" :current-page="currentPage" :per-page="perPage"
                                :filter="filter" :filter-included-fields="filterOn" :sort-by.sync="sortBy"
                                :sort-desc.sync="sortDesc" :sort-direction="sortDirection" :bordered="false"
                                :busy="isLoading" stacked="md" show-empty small class="figma-table mb-0"
                                :tbody-tr-class="() => 'figma-tr align-middle'">
                                <template #table-busy>
                                    <div class="text-center text-black my-2">
                                        <b-spinner class="align-middle"></b-spinner>
                                        <strong>{{ __('loading') }}...</strong>
                                    </div>
                                </template>

                                <template #cell(created_at)="row">
                                    {{ new Date(row.item.created_at).toLocaleString() }}
                                </template>
                                <template #cell(actions)="row">
                                    <div class="d-flex gap-2">
                                        <router-link :to="'manage_products/view/' + row.item.product_id"
                                            class="figma-action-btn" v-b-tooltip.hover :title="__('view')">
                                            <base-icon name="Eye" hoverName="Type=Hover (1)" width="24" height="24" />
                                        </router-link>
                                    </div>
                                </template>

                            </b-table>
                        </div>
                        <div class="figma-table-footer flex-wrap gap-3 mt-4">
                            <div class="showing-results-text small">
                                {{ __('Showing Result') }} : <span class="showing-bold">{{ pageEnd }}</span> {{ __('of') }} <span
                                    class="showing-bold">{{ totalRows
                                    }}</span>
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
export default {
    data: function () {
        return {
            fields: [
                { key: 'id', label: __('id'), sortable: true, sortDirection: 'desc' },
                { key: 'product_name', label: __('product'), sortable: true, class: 'text-center' },
                { key: 'total_qty', label: __('quantity'), sortable: true, class: 'text-center' },
                { key: 'seller_name', label: __('seller'), sortable: true, class: 'text-center' },
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
            wishlists: [],
        }
    },
    computed: {
        sortOptions() {
            // Create an options list from our fields
            return this.fields
                .filter(f => f.sortable)
                .map(f => {
                    return { text: f.label, value: f.key }
                })
        },
        pageEnd() {
            return Math.min(this.currentPage * this.perPage, this.totalRows);
        }
    },
    mounted() {
        // Set the initial number of items
        this.totalRows = this.wishlists.length
    },
    created: function () {
        this.getWishlists();
    },
    methods: {
        getWishlists() {
            this.isLoading = true
            axios.get(this.$apiUrl + '/wishlists')
                .then((response) => {
                    this.isLoading = false
                    this.wishlists = response.data.data;
                    this.totalRows = this.wishlists.length
                });
        },
    }
};
</script>
