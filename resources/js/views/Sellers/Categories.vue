<template>

    <div>

        <div class="page-heading">
            <div class="page-title mb-3">
                <div class="d-flex justify-content-between align-items-center flex-wrap gap-2">
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
                            <div class="d-flex flex-wrap gap-2">
                                <div class="view-toggle" role="group" :aria-label="__('view')">
                                    <button type="button" class="view-toggle-btn" :class="{ active: viewMode === 'grid' }" @click="setViewMode('grid')" v-b-tooltip.hover :title="__('grid_view')"><i class="bi bi-grid-3x3-gap-fill"></i></button>
                                    <button type="button" class="view-toggle-btn" :class="{ active: viewMode === 'list' }" @click="setViewMode('list')" v-b-tooltip.hover :title="__('list_view')"><i class="bi bi-list-ul"></i></button>
                                </div>
                                <button class="btn btn-figma-columns d-flex align-items-center gap-2" @click="getCategories()" v-b-tooltip.hover :title="__('refresh')">
                                    <i class="fa fa-refresh"></i>
                                    <span>{{ __('refresh') }}</span>
                                </button>
                                <button class="btn btn-figma-filter d-flex align-items-center gap-2" @click="create_new=true" v-if="$can('category_create')">
                                    <i class="fa fa-plus"></i>
                                    <span>{{ __('add_new_category') }}</span>
                                </button>
                            </div>
                        </div>

                        <!-- Grid view (same rows as the table list view; the table has no actions column) -->
                        <div v-if="viewMode === 'grid'">
                            <div v-if="isLoading" class="item-grid-state">
                                <i class="bi bi-hourglass-split"></i>
                                <span>{{ __('loading') }}...</span>
                            </div>
                            <div v-else-if="!gridCategories.length" class="item-grid-state">
                                <i class="bi bi-inbox"></i>
                                <span>{{ __('no_records_to_show') }}</span>
                            </div>
                            <div v-else class="item-grid">
                                <div v-for="category in pagedItems(gridCategories)" :key="category.id" class="item-card">
                                    <div class="item-card-media">
                                        <img :src="category.image_url || $placeholderImage" :alt="category.name" />
                                    </div>
                                    <div class="item-card-body">
                                        <div class="item-card-title" :title="category.name">{{ category.name }}</div>
                                        <div v-if="category.subtitle" class="item-card-meta" :title="category.subtitle">{{ category.subtitle }}</div>
                                        <div class="item-card-stats">
                                            <span class="item-card-chip">#{{ category.id }}</span>
                                            <span v-if="Number(category.parent_id) > 0" class="item-card-chip" :title="__('parent_category')">
                                                <i class="bi bi-diagram-3"></i>{{ parentLabel(category) }}
                                            </span>
                                        </div>
                                    </div>
                                    <div class="item-card-footer">
                                        <span class='badge bg-success' v-if="category.status == 1">{{ __('active') }}</span>
                                        <span class='badge bg-danger' v-if="category.status == 0">{{ __('deactive') }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div v-else class="table-responsive mb-0">
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
                                    <img :src="row.item.image_url || $placeholderImage" height="40" class="category-thumb" />
                                </template>
                                <template #cell(status)="row">
                                    <span class='badge bg-success' v-if="row.item.status == 1">{{ __('active') }}</span>
                                    <span class='badge bg-danger' v-if="row.item.status == 0">{{ __('deactive') }}</span>
                                </template>
                                <template #cell(actions)="row">
                                    <div class="d-flex gap-2 justify-content-center">
                                        <button class="figma-action-btn" @click="edit_record = row.item" v-if="$can('category_update')" v-b-tooltip.hover :title="__('edit')">
                                            <base-icon name="edit icon" hoverName="edit Hover" width="24" height="24" />
                                        </button>
                                        <button class="figma-action-btn" @click="deleteCategory(row.index,row.item.id)" v-if="$can('category_delete')" v-b-tooltip.hover :title="__('delete')">
                                            <base-icon name="Type=Default" hoverName="Type=Hover" width="24" height="24" />
                                        </button>
                                    </div>
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
    </div>
</template>
<script>


import ViewModeMixin from '../../mixins/ViewModeMixin';

export default {
    mixins: [ViewModeMixin],
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
        // Grid view rows: same client-side search (b-table :filter over all fields) and sort as the table
        gridCategories() {
            const list = Array.isArray(this.categories) ? this.categories : [];
            const query = this.filter ? String(this.filter).trim().toLowerCase() : '';
            const keys = this.filterOn && this.filterOn.length ? this.filterOn : null;
            const flatten = (val) => {
                if (val === null || val === undefined) return '';
                if (typeof val === 'object') return Object.values(val).map(flatten).join(' ');
                return String(val);
            };
            let rows = query
                ? list.filter(item => flatten(keys ? keys.map(k => item[k]) : item).toLowerCase().includes(query))
                : list.slice();
            if (this.sortBy) {
                const key = this.sortBy;
                const dir = this.sortDesc ? -1 : 1;
                rows = rows.slice().sort((a, b) => {
                    const x = a[key], y = b[key];
                    if (typeof x === 'number' && typeof y === 'number') return (x - y) * dir;
                    return String(x === null || x === undefined ? '' : x)
                        .localeCompare(String(y === null || y === undefined ? '' : y), undefined, { numeric: true }) * dir;
                });
            }
            return rows;
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
                confirmButtonColor: 'var(--theme-primary-500)',
                cancelButtonColor: 'var(--theme-error-500)',
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
        // Grid card: parent category name when it is in the loaded list, otherwise its id
        parentLabel(category) {
            const list = Array.isArray(this.categories) ? this.categories : [];
            const parent = list.find(c => Number(c.id) === Number(category.parent_id));
            return parent ? parent.name : '#' + category.parent_id;
        },
        hideModal() {
            this.create_new = false
            this.edit_record = false
        },
    }
};
</script>

<style scoped>
.category-thumb {
    width: 40px;
    height: 40px;
    object-fit: contain;
    border-radius: var(--ui-radius-sm);
    background: var(--ui-surface-muted);
}
</style>
