<template>

    <div>

        <div class="page-heading">
            <div class="page-title mb-2">
                <div class="d-flex justify-content-between align-items-center">
                    <h3 class="modern-page-title mb-0">{{ __('manage_categories') }}</h3>
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb mb-0">
                            <li class="breadcrumb-item"><router-link to="/seller/dashboard" class="text-muted">{{ __('dashboard') }}</router-link></li>
                            <li class="breadcrumb-item active text-primary" aria-current="page">{{ __('manage_categories') }}</li>
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
                            <div class="d-flex gap-2">
                                <button class="btn btn-figma-filter d-flex align-items-center gap-2" @click="getCategories()" v-b-tooltip.hover :title="__('refresh')">
                                    <i class="fa fa-refresh"></i>
                                    <span>{{ __('refresh') }}</span>
                                </button>
                                <button class="btn btn-figma-columns d-flex align-items-center gap-2" @click="create_new=true" v-if="$can('category_create')">
                                    <i class="fa fa-plus"></i>
                                    <span>{{ __('add_new_category') }}</span>
                                </button>
                            </div>
                        </div>

                        <div class="table-responsive mb-0">
                            <b-table
                                :items="categories"
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
                                class="mb-0">

                                <template #table-busy>
                                    <div class="text-center text-black my-2">
                                        <b-spinner class="align-middle"></b-spinner>
                                        <strong>{{ __('loading') }}...</strong>
                                    </div>
                                </template>

                                <template #cell(image)="row">
                                    <img :src="row.item.image_url" height="50" />
                                </template>
                                <template #cell(status)="row">
                                    <span class='badge bg-success' v-if="row.item.status == 1">{{__('activate')}}</span>
                                    <span class='badge bg-danger' v-if="row.item.status == 0">{{__('deactivate')}}</span>
                                </template>
                                <template #cell(actions)="row">
                                    <button class="btn btn-sm btn-primary border-0 bg-transparent p-0" @click="edit_record = row.item" v-if="$can('category_update')" v-b-tooltip.hover :title="__('edit')">
                                        <base-icon name="edit icon" hoverName="edit Hover" width="32" height="32" />
                                    </button>
                                    <button class="btn btn-sm btn-danger border-0 bg-transparent p-0" @click="deleteCategory(row.index,row.item.id)" v-if="$can('category_delete')" v-b-tooltip.hover :title="__('delete')">
                                        <base-icon name="Type=Default" hoverName="Type=Hover" width="32" height="32" />
                                    </button>
                                </template>

                            </b-table>
                            <div class="figma-table-footer flex-wrap gap-3">
                                <div class="showing-results-text small">
                                    {{ __('Showing Result') }} : <span class="showing-bold">{{ pageStart }}</span> {{ __('of') }} <span class="showing-bold">{{ totalRows }}</span>
                                </div>
                                <div class="d-flex align-items-center gap-3">
                                    <b-pagination v-model="currentPage" :total-rows="totalRows" :per-page="perPage" align="right" class="figma-pagination mb-0" hide-goto-end-buttons hide-ellipsis prev-text="<" next-text=">"></b-pagination>
                                </div>
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
    data: function() {
        return {
            fields: [
                { key: 'id', label: __('id'), sortable: true, sortDirection: 'desc', class: 'text-center' },
                { key: 'parent_id', label: __('parent_id'), sortable: true, sortDirection: 'desc', class: 'text-center' },
                { key: 'name', label: __('name'), sortable: true, class: 'text-center' },
                { key: 'subtitle', label: __('subtitle'), sortable: true, class: 'text-center' },
                { key: 'image', label: __('image'),  class: 'text-center' },
                { key: 'status', label: __('status'),  class: 'text-center' },
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

            categories: [],
            isLoading: false,
            sectionStyle : 'style_1',
            max_visible_categories : 12,
            max_col_in_single_row : 3,
            create_new : null,
            edit_record : null,
            settingModalShow:false
        }
    },
    computed: {
        pageStart() {
            if (this.totalRows === 0) return 0;
            return (this.currentPage - 1) * this.perPage + 1;
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
        this.totalRows = this.categories.length
    },
    created: function() {
        this.$eventBus.$on('categorySaved', (message) => {
            this.showMessage("success", message);
            this.getCategories();
            this.create_new = null;

        });
        this.getCategories();
    },
    methods: {
        getCategories(){
            this.isLoading = true
            axios.get(this.$sellerApiUrl + '/seller_categories_list', {
                params: {
                    _t: Date.now()
                }
            })
                .then((response) => {
                    this.isLoading = false
                    let data = response.data;
                    this.categories = data.data
                    this.totalRows = this.categories.length
                });
        },

        deleteCategory(index, id){
            this.$swal.fire({
                title: __('are_you_sure'),
                text: __('you_want_be_able_to_revert_this'),
                confirmButtonText: __('yes_sure'),
                cancelButtonText: __('cancel'),
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#37a279',
                cancelButtonColor: '#d33',
            }).then(result => {

                if (result.value) {
                    this.isLoading = true
                    let postData = {
                        id : id
                    }
                    axios.post(this.$apiUrl + '/categories/delete',postData)
                        .then((response) => {
                            this.isLoading = false
                            let data = response.data;
                            this.categories.splice(index, 1)
                            this.showSuccess(data.message)
                        });
                }
            });
        },
        hideModal() {
            this.create_new = false
            this.edit_record = false
        },
    }
};
</script>
