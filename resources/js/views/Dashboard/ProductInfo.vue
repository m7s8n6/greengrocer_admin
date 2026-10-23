<template>
    <div>
        <div class="page-heading">
            <div class="page-title">
                <div class="row">
                    <div class="col-12 col-md-6 order-md-1 order-last">
                        <h3 v-if="type === 'sold_out'">{{ __('sold_out_products') }}</h3>
                        <h3 v-if="type === 'low_stock'">{{ __('low_stock_products') }}</h3>
                        <h3 v-if="type === 'packet_products'">{{ __('packet_products') }}</h3>
                        <h3 v-if="type === 'loose_products'">{{ __('loose_products') }}</h3>
                    </div>
                    <div class="col-12 col-md-6 order-md-2 order-first">
                        <nav aria-label="breadcrumb" class="breadcrumb-header float-start float-lg-end">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><router-link to="/dashboard">{{ __('dashboard')
                                        }}</router-link></li>
                                <li v-if="type === 'sold_out'" class="breadcrumb-item active" aria-current="page">{{
                                    __('sold_out_products') }}</li>
                                <li v-if="type === 'low_stock'" class="breadcrumb-item active" aria-current="page">{{
                                    __('low_stock_products') }}</li>
                                <li v-if="type === 'packet_products'" class="breadcrumb-item active"
                                    aria-current="page">{{ __('packet_products') }}</li>
                                <li v-if="type === 'loose_products'" class="breadcrumb-item active" aria-current="page">
                                    {{ __('loose_products') }}</li>
                            </ol>
                        </nav>
                    </div>
                </div>
            </div>
            <section class="section">
                <div class="card figma-main-section-card">
                    <div class="card-header d-flex align-items-center justify-content-between flex-wrap gap-2">
                        <h4 v-if="type === 'sold_out'" class="card-title mb-0">{{ __('sold_out_products_list') }}</h4>
                        <h4 v-if="type === 'low_stock'" class="card-title mb-0">{{ __('low_stock_products_list') }}</h4>
                        <h4 v-if="type === 'packet_products'" class="card-title mb-0">{{ __('packet_stock_products_list') }}
                        </h4>
                        <h4 v-if="type === 'loose_products'" class="card-title mb-0">{{ __('loose_stock_products_list') }}
                        </h4>
                        <router-link v-if="$can('product_create')" to="/manage_products/create"
                            class="btn btn-figma-filter d-flex align-items-center gap-2">
                            <i class="fa fa-plus"></i>
                            <span>{{ __('add_product') }}</span>
                        </router-link>
                    </div>
                    <div class="card-body p-0">
                        <div class="d-flex justify-content-between align-items-center flex-wrap gap-2 figma-action-bar-row">
                            <div class="d-flex align-items-center gap-2 flex-grow-1 flex-wrap">
                                <div class="figma-search-container flex-grow-1">
                                    <i class="fa fa-search text-muted"></i>
                                    <input id="filter-input" v-model="filter" type="search" class="figma-search-input"
                                        :placeholder="__('search')">
                                </div>
                                <select name="category" id="category" v-model="category" @change="getProducts()"
                                    class="form-control form-select category-filter" :aria-label="__('category')">
                                    <option value="">{{ __('all_categories') }}</option>
                                    <option v-for="category in categories" :value="category.id">
                                        {{ category.name }}
                                    </option>
                                </select>
                            </div>
                            <div class="d-flex gap-2 align-items-center">
                                <button class="btn btn-figma-filter d-flex align-items-center gap-2 btn_refresh" v-b-tooltip.hover
                                    :title="__('refresh')" @click="getProducts()">
                                    <i class="fa fa-refresh" aria-hidden="true"></i>
                                    <span>{{ __('refresh') }}</span>
                                </button>
                            </div>
                        </div>
                        <div class="table-responsive">
                            <b-table :items="products" :fields="fields" :current-page="currentPage" :per-page="perPage"
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
                                <template #cell(seller_name)="row">
                                    {{ row.item.seller_name }}
                                </template>
                                <template #cell(image)="row">
                                    <img :src="$storageUrl + row.item.image" height="44" width="44" v-if="row.item.image" />
                                </template>
                                <template #cell(actions)="row">
                                    <div class="d-flex gap-2 justify-content-center">
                                        <router-link
                                            :to="{ name: 'ViewProduct', params: { id: row.item.id, record: row.item } }"
                                            v-b-tooltip.hover :title="__('view')"
                                            class="figma-action-btn">
                                            <base-icon name="Eye" hoverName="Type=Hover (1)" width="24" height="24" />
                                        </router-link>
                                        <router-link
                                            :to="{ name: 'EditProduct', params: { id: row.item.id, record: row.item } }"
                                            v-b-tooltip.hover :title="__('edit')"
                                            class="figma-action-btn"
                                            v-if="$can('product_update')">
                                            <base-icon name="edit icon" hoverName="edit Hover" width="24" height="24" />
                                        </router-link>
                                        <button class="figma-action-btn figma-delete-btn"
                                            v-b-tooltip.hover :title="__('delete')"
                                            @click="deleteRecord(row.index, row.item.product_variant_id)"
                                            v-if="$can('product_delete')">
                                            <base-icon name="Type=Default" hoverName="Type=Hover" width="24"
                                                height="24" />
                                        </button>
                                    </div>
                                </template>
                            </b-table>
                        </div>
                        <div class="figma-table-footer flex-wrap gap-3">
                            <div class="d-flex align-items-center gap-2">
                                <label for="per-page-select" class="showing-results-text small mb-0">{{ __('per_page') }}</label>
                                <b-form-select id="per-page-select" v-model="perPage" :options="pageOptions"
                                    size="sm" class="form-select w-auto"></b-form-select>
                                <table-count :current-page="currentPage" :per-page="perPage" :total-rows="totalRows"></table-count>
                            </div>
                            <b-pagination v-model="currentPage" :total-rows="totalRows" :per-page="perPage"
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
import axios from "axios";

export default {
    data: function () {
        return {
            category: "",
            fields: [
                { key: 'product_variant_id', label: __('id'), sortable: true, sortDirection: 'desc' },
                { key: 'product_id', label: __('product_id'), sortable: true, sortDirection: 'desc' },
                { key: 'seller_name', label: __('seller_name'), sortable: true },
                { key: 'name', label: __('name'), sortable: true },
                { key: 'image', label: __('image'), class: 'text-center' },
                { key: 'price', label: __('price'), sortable: true },
                { key: 'discounted_price', label: __('discounted_price'), sortable: true },
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

            isLoading: false,
            products: null,
            categories: null,
            type: null
        }
    },
    created: function () {
        if (!this.$can('product_list')) {
            this.showError("You do not have permission to view this page.");
            this.$router.back();
        }
        this.type = this.$route.params.type;
        if (this.type) {
            this.getProducts();
        }

    },
    methods: {
        getProducts() {
            this.isLoading = true;
            let param = {
                "category": this.category,
                "type": this.type
            }
            axios.get(this.$apiUrl + '/products/product_info', {
                params: param
            }).then((response) => {
                this.isLoading = false;
                this.categories = response.data.data.categories;
                this.products = response.data.data.products;
                this.totalRows = this.products.length
            });
        },
        deleteRecord(index, id) {

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
/* Category filter sits next to the search field in the list toolbar */
.category-filter {
    width: auto;
    min-width: 180px;
    max-width: 260px;
    height: 38px;
    font-size: 13px;
}

@media (max-width: 575.98px) {
    .category-filter {
        max-width: none;
        width: 100%;
    }
}
</style>
