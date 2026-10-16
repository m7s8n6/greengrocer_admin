<template>

    <div>

        <div class="page-heading">
            <div class="page-title mb-2">
                <div class="d-flex justify-content-between align-items-center">
                    <h3 class="modern-page-title mb-0">{{ __('brands') }}</h3>
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb mb-0">
                            <li class="breadcrumb-item"><router-link to="/seller/dashboard" class="text-muted">{{ __('dashboard') }}</router-link></li>
                            <li class="breadcrumb-item active text-primary" aria-current="page">{{ __('brands') }}</li>
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
                                <button class="btn btn-figma-filter d-flex align-items-center gap-2" @click="getRecords()" v-b-tooltip.hover :title="__('refresh')">
                                    <i class="fa fa-refresh"></i>
                                    <span>{{ __('refresh') }}</span>
                                </button>
                            </div>
                        </div>

                        <div class="table-responsive mb-0">
                            <b-table
                                :items="brands"
                                :fields="fields"
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

                                <template #cell(id)="row">
                                    {{ row.item.id }}
                                </template>

                                <template #cell(image)="row">
                                    <p v-if="row.item.image ===''">No Image</p>
                                    <img :src="$storageUrl + row.item.image" height="50" v-else/>
                                </template>

                                <template #cell(status)="row">
                                    <span v-if="row.item.status == 1" class="badge bg-success">{{__('activate')}}</span>
                                    <span v-else class="badge bg-danger">{{__('deactivate')}}</span>
                                </template>

                                <template #cell(actions)="row">
                                    <button class="btn btn-sm btn-primary border-0 bg-transparent p-0" @click="edit_record = row.item" v-b-tooltip.hover :title="__('edit')" >
                                        <base-icon name="edit icon" hoverName="edit Hover" width="32" height="32" />
                                    </button>
                                    <button class="btn btn-sm btn-danger border-0 bg-transparent p-0" @click="deleteRecord(row.index,row.item.id)" v-b-tooltip.hover :title="__('delete')">
                                        <base-icon name="Type=Default" hoverName="Type=Hover" width="32" height="32" />
                                    </button>
                                </template>
                            </b-table>
                            <div class="figma-table-footer flex-wrap gap-3">
                                <div class="d-flex align-items-center gap-2">
                                    <label class="showing-results-text mb-0">{{ __('per_page') }}</label>
                                    <b-form-select v-model="perPage" :options="pageOptions" size="sm" style="width: auto;"></b-form-select>
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
import { VuejsDatatableFactory } from 'vuejs-datatable';
export default {
    components: {
        VuejsDatatableFactory,
    },
    data: function() {
        return {
            fields: [
                { key: 'id', label: __('id'), class: 'text-center', sortable: true, sortDirection: 'desc' },
                { key: 'name', label: __('name'),  class: 'text-center' },
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

            isLoading: false,
            sectionStyle : 'style_1',
            max_visible_units : 12,
            max_col_in_single_row : 3,
            brands: [],
            create_new : null,
            edit_record : null,
        }
    },
    watch: {
        // Re-fetch when page changes
        currentPage() {
            this.getRecords();
        },
        // Re-fetch when per-page changes and reset to page 1
        perPage() {
            this.currentPage = 1;
            this.getRecords();
        },
        // Re-fetch when search filter changes and reset to page 1
        filter() {
            this.currentPage = 1;
            this.getRecords();
        },
    },
    created: function() {
        this.$eventBus.$on('recordSaved', (message) => {
            this.showMessage('success', message);
            this.getRecords();
        });
        this.getRecords();
    },
    methods: {

        getRecords(){
            this.isLoading = true;
            // Pass page, per_page, and filter so the API handles server-side pagination
            axios.get(this.$apiUrl + '/products/brands', {
                params: {
                    page: this.currentPage,
                    per_page: this.perPage,
                    filter: this.filter || '',
                }
            }).then((response) => {
                this.isLoading = false;
                let data = response.data;
                this.brands = data.data;
                // Use the total count from API for correct pagination
                this.totalRows = data.total;
            });
        },
        deleteRecord(index, id){
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
                    axios.post(this.$apiUrl + '/products/brands/delete',postData)
                        .then((response) => {
                            this.isLoading = false
                            let data = response.data;
                            this.brands.splice(index, 1)
                            this.showMessage('success', data.message);
                        });
                }
            });
        },
    }
};
</script>
