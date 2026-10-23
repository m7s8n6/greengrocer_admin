<template>
    <div>
        <div class="page-heading">
            <div class="page-title mb-2">
                <div class="d-flex justify-content-between align-items-center">
                    <div>
                        <h3 v-if="type === 'sold_out'" class="modern-page-title mb-0">{{ __('sold_out_products') }}</h3>
                        <h3 v-if="type === 'low_stock'" class="modern-page-title mb-0">{{ __('low_stock_products') }}</h3>
                    </div>
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb mb-0">
                            <li class="breadcrumb-item"><router-link to="/seller/dashboard" class="text-muted">{{ __('dashboard') }}</router-link></li>
                            <li v-if="type === 'sold_out'" class="breadcrumb-item active text-primary" aria-current="page">{{ __('sold_out_products') }}</li>
                            <li v-if="type === 'low_stock'" class="breadcrumb-item active text-primary" aria-current="page">{{ __('low_stock_products') }}</li>
                        </ol>
                    </nav>
                </div>
            </div>

            <section class="section">
                <div class="figma-main-section-card">
                    <div class="card-body p-0">
                        <div class="d-flex justify-content-between align-items-center flex-wrap gap-2 figma-action-bar-row">
                            <div class="flex-grow-1">
                                <div class="figma-search-container">
                                    <i class="fa fa-search text-muted"></i>
                                    <input v-model="filter" type="text" class="figma-search-input"
                                        :placeholder="__('search')">
                                </div>
                            </div>
                            <div class="d-flex gap-2 align-items-center">
                                <button class="btn btn-figma-filter d-flex align-items-center gap-2" @click="getProducts()" v-b-tooltip.hover :title="__('refresh')">
                                    <i class="fa fa-refresh"></i>
                                    <span>{{ __('refresh') }}</span>
                                </button>
                                <router-link to="/manage_products/create" class="btn btn-figma-filter d-flex align-items-center gap-2">
                                    <i class="fa fa-plus"></i>
                                    <span>{{ __('add_product') }}</span>
                                </router-link>
                            </div>
                        </div>

                        <div class="table-responsive mb-0">
                            <b-table
                                :items="products"
                                :fields="fields"
                                :current-page="currentPage"
                                :per-page="perPage"
                                :filter="filter"
                                :filter-included-fields="filterOn"
                                :sort-by.sync="sortBy"
                                :sort-desc.sync="sortDesc"
                                :sort-direction="sortDirection"
                                :bordered="false"
                                :busy="isLoading"
                                stacked="md"
                                show-empty
                                small
                                class="figma-table mb-0"
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
                                <template #cell(seller_name)="row">
                                    {{ row.item.seller_name }}
                                </template>
                                <template #cell(image)="row">
                                    <img :src="$storageUrl + row.item.image" height="44" width="44" v-if="row.item.image"/>
                                </template>
                                <template #cell(actions)="row">
                                    <div class="d-flex gap-2 justify-content-center">
                                        <router-link
                                            :to="{ name: 'ViewProduct',params: { id: row.item.id, record : row.item }}"
                                            v-b-tooltip.hover :title="__('view')" class="figma-action-btn">
                                            <base-icon name="Eye" hoverName="Type=Hover (1)" width="24" height="24" />
                                        </router-link>
                                        <router-link
                                            :to="{ name: 'EditProduct',params: { id: row.item.id, record : row.item }}"
                                            v-b-tooltip.hover :title="__('edit')" class="figma-action-btn">
                                            <base-icon name="edit icon" hoverName="edit Hover" width="24" height="24" />
                                        </router-link>
                                        <button class="figma-action-btn figma-delete-btn" v-b-tooltip.hover :title="__('delete')"
                                                @click="deleteRecord(row.index,row.item.product_variant_id)">
                                            <base-icon name="Type=Default" hoverName="Type=Hover" width="24" height="24" />
                                        </button>
                                    </div>
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
                                <b-pagination v-model="currentPage" :total-rows="totalRows" :per-page="perPage" align="right" class="figma-pagination mb-0" hide-goto-end-buttons hide-ellipsis prev-text="<" next-text=">"></b-pagination>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>
<script>
import axios from "axios";

export default {
    data: function () {
        return {
            category: "",
            // Same columns as Dashboard ProductInfo: id, product_id, seller_name, name, image, price, discounted_price, actions
            fields: [
                {key: 'product_variant_id', label: __('id'), sortable: true, sortDirection: 'desc'},
                {key: 'product_id', label: __('product_id'), sortable: true, sortDirection: 'desc'},
                {key: 'seller_name', label: __('seller_name'), sortable: true},
                {key: 'name', label: __('name'), sortable: true},
                {key: 'image', label: __('image'), class: 'text-center'},
                {key: 'price', label: __('price'), sortable: true},
                {key: 'discounted_price', label: __('discounted_price'), sortable: true},
                {key: 'actions', label: __('actions')}
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

            isLoading: false,
            products: null,
            type: null
        }
    },
    computed: {
        pageStart() {
            if (this.totalRows === 0) return 0;
            return (this.currentPage - 1) * this.perPage + 1;
        }
    },
    created: function () {
        // packet_products/loose_products were removed along with the packet/loose dashboard
        // cards - the backend no longer filters on them, so a stale bookmark/direct URL for
        // either would otherwise silently show every product, mislabeled. Only these two
        // types are still wired up end to end.
        const validTypes = ['sold_out', 'low_stock'];
        this.type = this.$route.params.type;
        if (!validTypes.includes(this.type)) {
            this.$router.replace('/seller/dashboard');
            return;
        }
        this.getProducts();
    },
    methods: {
        getProducts() {
            this.isLoading = true;
            let param = {
                "category": this.category,
                "type": this.type
            }
            axios.get(this.$sellerApiUrl + '/products/product_info', {
                params: param
            }).then((response) => {
                this.isLoading = false;
                this.products = response.data.data.products;
                this.totalRows = response.data.total
            });
        },

        deleteRecord(index, id) {

            this.$swal.fire({
                title: __('are_you_sure'),
                text: __('you_want_to_be_able_to_revert_this'),
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
                    axios.post(this.$apiUrl + '/products/delete', postData)
                        .then((response) => {
                            this.isLoading = false
                            let data = response.data;
                            this.products.splice(index, 1)
                            this.showSuccess(data.message)
                        });
                }
            });
        },
    }
};
</script>
<style scoped>
</style>
