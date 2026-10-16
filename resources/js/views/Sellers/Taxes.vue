<template>
    <div>
        <div class="page-heading">
            <div class="page-title mb-2">
                <div class="d-flex justify-content-between align-items-center">
                    <h3 class="modern-page-title mb-0">{{ __('taxes') }}</h3>
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb mb-0">
                            <li class="breadcrumb-item"><router-link to="/seller/dashboard" class="text-muted">{{ __('dashboard') }}</router-link></li>
                            <li class="breadcrumb-item active text-primary" aria-current="page">{{ __('taxes') }}</li>
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
                                :items="taxes"
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
                { key: 'id', label: __('id'), class: 'text-center', sortable: true, sortDirection: 'desc' },
                { key: 'title', label: __('title'),  class: 'text-center' },
                { key: 'percentage', label: __('percentage'),  class: 'text-center' },
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

            sectionStyle : 'style_1',
            max_visible_units : 12,
            max_col_in_single_row : 3,

            taxes: [],
            isLoading: false,
            create_new : null,
            edit_record : null,

        }
    },
    computed: {
        pageStart() {
            if (this.totalRows === 0) return 0;
            return (this.currentPage - 1) * this.perPage + 1;
        }
    },
    created: function() {
        this.getRecords();
    },
    methods: {
        getRecords(){
            this.isLoading = true
            axios.get(this.$apiUrl + '/products/taxes')
                .then((response) => {
                    this.isLoading = false
                    let data = response.data;
                    this.taxes = data.data;
                    this.totalRows = data.total;
                });
        },
    }
};
</script>
