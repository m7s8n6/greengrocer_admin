<template>
    <div>
        <div class="page-heading">
            <div class="page-title mb-2">
                <div class="d-flex justify-content-between align-items-center flex-wrap gap-2">
                    <h3 class="modern-page-title mb-0">{{ __('units') }}</h3>
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb mb-0">
                            <li class="breadcrumb-item"><router-link to="/seller/dashboard" class="text-muted">{{ __('dashboard') }}</router-link></li>
                            <li class="breadcrumb-item active text-primary" aria-current="page">{{ __('units') }}</li>
                        </ol>
                    </nav>
                </div>
            </div>

            <section class="section">
                <div class="card figma-main-section-card">
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
                                <button class="btn btn-figma-columns d-flex align-items-center gap-2" @click="getUnits()" v-b-tooltip.hover :title="__('refresh')">
                                    <i class="fa fa-refresh"></i>
                                    <span>{{ __('refresh') }}</span>
                                </button>
                            </div>
                        </div>

                        <div class="table-responsive mb-0">
                            <b-table
                                :items="units"
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

                            <template #empty="scope">
                                <div class="text-center text-muted py-4"><i class="fa fa-inbox fa-2x d-block mb-2"></i>{{ scope.emptyText }}</div>
                            </template>
                            <template #emptyfiltered="scope">
                                <div class="text-center text-muted py-4"><i class="fa fa-search fa-2x d-block mb-2"></i>{{ scope.emptyFilteredText }}</div>
                            </template>

                            <template #cell(parent_id)="row">
                                <p class="mb-0" v-if="row.item.parent_id!==null">{{ row.item.parent_id }}</p>
                                <p class="mb-0" v-else>-</p>
                            </template>

                            <template #cell(conversion)="row">
                                <p class="mb-0" v-if="row.item.conversion!==null">{{ row.item.conversion }}</p>
                                <p class="mb-0" v-else>-</p>
                            </template>
                        </b-table>
                        </div>
                        <div class="figma-table-footer flex-wrap gap-3">
                            <table-count :current-page="currentPage" :per-page="perPage" :total-rows="totalRows"></table-count>
                            <div class="d-flex align-items-center gap-3">
                                <b-pagination v-model="currentPage" :total-rows="totalRows" :per-page="perPage" align="right" class="figma-pagination mb-0" hide-goto-end-buttons hide-ellipsis prev-text="<" next-text=">"></b-pagination>
                            </div>
                        </div>

                </div>
                </div>
            </section>
        </div>
        <!-- Add / Edit -->

    </div>
</template>
<script>

    export default {
        data: function() {
            return {
                fields: [
                    { key: 'id', label: __('id'), sortable: true, sortDirection: 'desc' },
                    { key: 'name', label: __('name'), sortable: true, class: 'text-center' },
                    { key: 'short_code', label: __('short_code'), sortable: true, class: 'text-center' },
                    { key: 'parent_id', label: __('parent_id'),  class: 'text-center' },
                    { key: 'conversion', label: __('conversion'),  class: 'text-center' }
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

                units: [],
                isLoading: false,
                sectionStyle : 'style_1',
                max_visible_units : 12,
                max_col_in_single_row : 3,
                create_new : null,
                edit_record : null
            }
        },
        computed: {
            pageStart() {
                if (this.totalRows === 0) return 0;
                return (this.currentPage - 1) * this.perPage + 1;
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
            this.totalRows = this.units.length
        },
        created: function() {
            this.$eventBus.$on('unitSaved', (message) => {
                this.showMessage("success", message);
                this.getUnits();
                this.create_new = null;
            });
            this.getUnits();
        },
        methods: {
            getUnits(){
                this.isLoading = true
                axios.get(this.$apiUrl + '/units')
                    .then((response) => {
                        this.isLoading = false
                        let data = response.data;
                        this.units = data.data
                        this.totalRows = this.units.length
                    });
            },
        }
    };
</script>
