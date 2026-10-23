<template>
    <div>
        <div class="page-heading">
            <div class="page-title mb-3">
                <div class="d-flex justify-content-between align-items-center flex-wrap gap-2">
                    <h3 class="modern-page-title mb-0">{{ __('abandoned_carts') }}</h3>
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb mb-0">
                            <li class="breadcrumb-item"><router-link to="/dashboard" class="text-muted">{{ __('dashboard') }}</router-link></li>
                            <li class="breadcrumb-item active text-primary" aria-current="page">{{ __('abandoned_carts') }}</li>
                        </ol>
                    </nav>
                </div>
            </div>
            <section class="section">
                <div class="card figma-main-section-card">
                    <div class="card-body p-0">
                        <div class="d-flex justify-content-between align-items-center flex-wrap gap-2 figma-action-bar-row">
                            <div class="d-flex align-items-center gap-2 flex-grow-1 flex-wrap">
                                <div class="figma-search-container">
                                    <i class="fa fa-search text-muted"></i>
                                    <input v-model="filter" type="text" class="figma-search-input" :placeholder="__('search')" @input="addFilter()">
                                </div>
                            </div>
                            <div class="d-flex gap-2 align-items-center flex-wrap">
                                <button class="btn btn-figma-columns d-flex align-items-center gap-2" @click="getCarts()" v-b-tooltip.hover :title="__('refresh')">
                                    <i class="fa fa-refresh"></i>
                                    <span>{{ __('refresh') }}</span>
                                </button>
                            </div>
                        </div>
                        <div class="table-responsive mb-0">
                            <b-table :items="carts" :fields="fields" :current-page="currentPage" :per-page="perPage"
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

                                <template #empty="scope">
                                    <div class="text-center text-muted py-4"><i class="fa fa-inbox fa-2x d-block mb-2"></i>{{ scope.emptyText }}</div>
                                </template>
                                <template #emptyfiltered="scope">
                                    <div class="text-center text-muted py-4"><i class="fa fa-search fa-2x d-block mb-2"></i>{{ scope.emptyFilteredText }}</div>
                                </template>

                                <template #cell(actions)="row">
                                    <button class="figma-action-btn figma-delete-btn" v-b-tooltip.hover :title="__('delete')" @click="deleteCart(row.index, row.item.id)">
                                        <base-icon name="Type=Default" hoverName="Type=Hover" width="24" height="24" />
                                    </button>
                                </template>
                            </b-table>
                        </div>
                        <div class="figma-table-footer flex-wrap gap-3">
                            <table-count :current-page="currentPage" :per-page="perPage" :total-rows="totalRows"></table-count>
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
                { key: 'id', label: __('id'), sortable: true, class: 'text-center' },
                { key: 'user_name', label: __('user'), sortable: true, class: 'text-center' },
                { key: 'product_name', label: __('product'), sortable: true, class: 'text-center' },
                { key: 'variant_name', label: __('variant'), sortable: true, class: 'text-center' },
                { key: 'store_name', label: __('store'), sortable: true, class: 'text-center' },
                { key: 'qty', label: __('quantity'), sortable: true, class: 'text-center' },
                { key: 'created_at', label: __('added_on'), sortable: true, class: 'text-center' },
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
            carts: [],
            isLoading: false
        }
    },
    computed: {
        pageEnd() {
            return Math.min(this.currentPage * this.perPage, this.totalRows);
        }
    },
    mounted() {
        this.totalRows = this.carts.length;
    },
    created: function () {
        this.getCarts();
    },
    methods: {
        addFilter() {
            // Vue-tables-2 handles local filtering, but if it was server side we'd re-fetch here
        },
        getCarts() {
            this.isLoading = true;
            // We pass limit=1000 so the backend fetches all and we handle pagination locally like customers API does
            axios.get(this.$apiUrl + '/carts?limit=1000')
                .then((response) => {
                    this.isLoading = false;
                    this.carts = response.data.data;
                    this.totalRows = this.carts.length;
                }).catch(error => {
                    this.isLoading = false;
                    this.showError(__('something_went_wrong'));
                });
        },
        deleteCart(index, id) {
            this.$swal.fire({
                title: "Are you Sure?",
                text: "You want be able to revert this",
                confirmButtonText: "Yes, Sure",
                cancelButtonText: "Cancel",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: 'var(--theme-primary-500)',
                cancelButtonColor: 'var(--theme-error-500)',
            }).then(result => {
                if (result.value) {
                    this.isLoading = true;
                    axios.delete(this.$apiUrl + '/carts/' + id)
                        .then((response) => {
                            if (response.data.status) {
                                this.showMessage("success", response.data.message);
                                this.getCarts();
                            } else {
                                this.showError(response.data.message);
                            }
                            this.isLoading = false;
                        }).catch(error => {
                            this.isLoading = false;
                            this.showError(__('something_went_wrong'));
                        });
                }
            });
        }
    }
}
</script>
