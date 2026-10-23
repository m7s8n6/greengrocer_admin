<template>
    <div>
        <div class="page-heading">
            <div class="page-title mb-3">
                <div class="d-flex justify-content-between align-items-center flex-wrap gap-1 gap-sm-2">
                    <h3 class="modern-page-title mb-0">{{ __('manage_categories') }}</h3>
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb mb-0">
                            <li class="breadcrumb-item"><router-link to="/dashboard" class="text-muted">{{
                                    __('dashboard') }}</router-link></li>
                            <li class="breadcrumb-item active text-primary" aria-current="page">{{
                                __('manage_categories') }}</li>
                        </ol>
                    </nav>
                </div>
            </div>

            <!-- Global Background Colors Section -->
            <section class="section mb-3" v-if="$can('category_update')">
                <div class="card figma-main-section-card bg-colors-card mb-0">
                    <div class="card-header d-flex justify-content-between align-items-center gap-2">
                        <h4 class="card-title mb-0 text-start">{{ __('items_background_colors') || 'Items Background Colors' }}</h4>
                        <b-button size="sm" variant="primary" class="flex-shrink-0" @click="saveGlobalColors" :disabled="isSavingGlobal">
                            {{ __('save') }}
                            <b-spinner v-if="isSavingGlobal" small class="ml-1"></b-spinner>
                        </b-button>
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-lg-4 form-group mb-3 mb-lg-0">
                                <label class="form-label d-block">{{ __('items_background_color_mode') || 'Items Background Colour' }}</label>
                                <div class="d-flex flex-wrap align-items-center gap-2 gap-sm-3">
                                    <div class="form-check form-check-inline m-0">
                                        <input class="form-check-input" type="radio" id="colorModeGlobal" value="global" v-model="globalSettings.category_background_color_mode">
                                        <label class="form-check-label ms-1" for="colorModeGlobal">{{ __('global') || 'Global' }}</label>
                                    </div>
                                    <div class="form-check form-check-inline m-0">
                                        <input class="form-check-input" type="radio" id="colorModeItemWise" value="item-wise" v-model="globalSettings.category_background_color_mode">
                                        <label class="form-check-label ms-1" for="colorModeItemWise">{{ __('item_wise') || 'Item Wise' }}</label>
                                    </div>
                                </div>
                            </div>
                            <template v-if="globalSettings.category_background_color_mode === 'global'">
                            <div class="col-md-6 col-lg-4 form-group mb-3 mb-md-0">
                                <label>{{ __('category_light_theme_background') || 'Category Light Theme Background' }}</label>
                                <div class="color-field d-flex w-100 mt-1">
                                    <input type="text" v-model="globalSettings.category_background_color_light_theme" class="form-control">
                                    <input type="color" :value="(globalSettings.category_background_color_light_theme && globalSettings.category_background_color_light_theme.startsWith('#') && (globalSettings.category_background_color_light_theme.length === 4 || globalSettings.category_background_color_light_theme.length === 7 || globalSettings.category_background_color_light_theme.length === 9)) ? globalSettings.category_background_color_light_theme.substring(0, 7) : '#ffffff'" @input="globalSettings.category_background_color_light_theme = $event.target.value" class="form-control cursor-pointer color-swatch">
                                    <b-button size="sm" variant="outline-secondary" @click="globalSettings.category_background_color_light_theme = '#ffffff00'">
                                        {{ __('transparent') || 'Transparent' }}
                                    </b-button>
                                </div>
                            </div>
                            <div class="col-md-6 col-lg-4 form-group mb-0">
                                <label>{{ __('category_dark_theme_background') || 'Category Dark Theme Background' }}</label>
                                <div class="color-field d-flex w-100 mt-1">
                                    <input type="text" v-model="globalSettings.category_background_color_dark_theme" class="form-control">
                                    <input type="color" :value="(globalSettings.category_background_color_dark_theme && globalSettings.category_background_color_dark_theme.startsWith('#') && (globalSettings.category_background_color_dark_theme.length === 4 || globalSettings.category_background_color_dark_theme.length === 7 || globalSettings.category_background_color_dark_theme.length === 9)) ? globalSettings.category_background_color_dark_theme.substring(0, 7) : '#000000'" @input="globalSettings.category_background_color_dark_theme = $event.target.value" class="form-control cursor-pointer color-swatch">
                                    <b-button size="sm" variant="outline-secondary" @click="globalSettings.category_background_color_dark_theme = '#00000000'">
                                        {{ __('transparent') || 'Transparent' }}
                                    </b-button>
                                </div>
                            </div>
                            </template>
                        </div>
                    </div>
                </div>
            </section>

            <section class="section">
                <div class="card figma-main-section-card">
                    <div class="card-body p-0">
                        <div
                            class="d-flex justify-content-between align-items-center flex-wrap gap-2 figma-action-bar-row">
                            <div class="flex-grow-1">
                                <div class="figma-search-container">
                                    <i class="fa fa-search text-muted"></i>
                                    <input v-model="filter" type="text" class="figma-search-input"
                                        :placeholder="__('search')">
                                </div>
                            </div>
                            <div class="d-flex gap-2 align-items-center flex-wrap">
                                <reorder-toggle v-if="viewMode !== 'tree'" v-model="enableDragDrop"></reorder-toggle>
                                <div class="view-toggle" role="group" :aria-label="__('view')">
                                    <button type="button" class="view-toggle-btn" :class="{ active: viewMode === 'grid' }" @click="setViewMode('grid')" v-b-tooltip.hover :title="__('grid_view')"><i class="bi bi-grid-3x3-gap-fill"></i></button>
                                    <button type="button" class="view-toggle-btn" :class="{ active: viewMode === 'list' }" @click="setViewMode('list')" v-b-tooltip.hover :title="__('list_view')"><i class="bi bi-list-ul"></i></button>
                                    <button type="button" class="view-toggle-btn" :class="{ active: viewMode === 'tree' }" @click="setViewMode('tree')" v-b-tooltip.hover :title="__('tree_view') || 'Tree View'"><i class="bi bi-diagram-3"></i></button>
                                </div>
                                <button class="btn btn-figma-columns d-flex align-items-center gap-2"
                                    @click="refreshData()" v-b-tooltip.hover :title="__('refresh')">
                                    <i class="fa fa-refresh"></i>
                                    <span>{{ __('refresh') }}</span>
                                </button>
                                <button class="btn btn-figma-filter d-flex align-items-center gap-2"
                                    @click="create_new = true" v-if="$can('category_create')">
                                    <i class="fa fa-plus"></i>
                                    <span>{{ __('add_category') }}</span>
                                </button>
                            </div>
                        </div>

                        <!-- Grid view (same rows / handlers as the table list view) -->
                        <div v-if="viewMode === 'grid'">
                            <div v-if="isLoading" class="item-grid-state">
                                <i class="bi bi-hourglass-split"></i>
                                <span>{{ __('loading') }}...</span>
                            </div>
                            <div v-else-if="!gridCategories.length" class="item-grid-state">
                                <i class="bi bi-inbox"></i>
                                <span>{{ __('no_records_to_show') }}</span>
                            </div>
                            <!-- Draggable grid when enableDragDrop is enabled -->
                            <draggable
                                v-else-if="enableDragDrop"
                                v-model="categories"
                                class="item-grid"
                                v-bind="dragOptions"
                                handle=".item-card-drag-handle"
                                @start="isDragging = true"
                                @end="isDragging = false"
                                @change="updateCategoriesOrder">
                                <div v-for="(category, index) in translatedCategories" :key="category.id" class="item-card item-card-draggable">
                                    <div class="item-card-drag-bar d-flex justify-content-between align-items-center">
                                        <span class="badge bg-light text-dark border category-order-badge">
                                            <i class="bi bi-sort-numeric-down me-1"></i>#{{ category.row_order || ((currentPage - 1) * perPage + index + 1) }}
                                        </span>
                                        <div class="item-card-drag-handle" :title="__('drag_to_reorder') || 'Drag to reorder'">
                                            <i class="bi bi-grip-vertical"></i>
                                            <span>{{ __('drag') || 'Drag' }}</span>
                                        </div>
                                    </div>
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
                                        <div class="item-card-actions">
                                            <button class="figma-action-btn" @click="edit_record = category"
                                                v-if="$can('category_update')" v-b-tooltip.hover :title="__('edit')">
                                                <base-icon name="edit icon" hoverName="edit Hover" width="20" height="20" />
                                            </button>
                                            <button class="figma-action-btn" @click="deleteCategory(categories.indexOf(category), category.id)"
                                                v-if="$can('category_delete')" v-b-tooltip.hover :title="__('delete')">
                                                <base-icon name="Type=Default" hoverName="Type=Hover" width="20" height="20" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </draggable>
                            <!-- Regular static grid when enableDragDrop is disabled -->
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
                                        <div class="item-card-actions">
                                            <button class="figma-action-btn" @click="edit_record = category"
                                                v-if="$can('category_update')" v-b-tooltip.hover :title="__('edit')">
                                                <base-icon name="edit icon" hoverName="edit Hover" width="20" height="20" />
                                            </button>
                                            <button class="figma-action-btn" @click="deleteCategory(translatedCategories.indexOf(category), category.id)"
                                                v-if="$can('category_delete')" v-b-tooltip.hover :title="__('delete')">
                                                <base-icon name="Type=Default" hoverName="Type=Hover" width="20" height="20" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Tree view (hierarchical view: parent > child > child's child) -->
                        <div v-else-if="viewMode === 'tree'" class="category-tree-container">
                            <div class="category-tree-toolbar d-flex justify-content-between align-items-center flex-wrap gap-2 px-3 py-2 border-bottom">
                                <div class="d-flex align-items-center gap-2 flex-wrap">
                                    <span class="tree-summary-stat">
                                        <i class="bi bi-diagram-3 text-primary me-1"></i>
                                        <strong>{{ filteredCategoryTree.length }}</strong> {{ __('root_categories') || 'Root Categories' }}
                                        <span class="text-muted ms-1">({{ totalTreeNodesCount }} {{ __('total_categories') || 'total categories' }})</span>
                                    </span>
                                </div>
                                <div class="d-flex align-items-center gap-2">
                                    <button type="button" class="btn btn-sm btn-outline-secondary" @click="expandAll" :disabled="isTreeLoading || !filteredCategoryTree.length">
                                        <i class="bi bi-arrows-expand me-1"></i>{{ __('expand_all') || 'Expand All' }}
                                    </button>
                                    <button type="button" class="btn btn-sm btn-outline-secondary" @click="collapseAll" :disabled="isTreeLoading || !filteredCategoryTree.length">
                                        <i class="bi bi-arrows-collapse me-1"></i>{{ __('collapse_all') || 'Collapse All' }}
                                    </button>
                                </div>
                            </div>

                            <div v-if="isTreeLoading" class="item-grid-state py-5">
                                <b-spinner class="align-middle mb-2" variant="primary"></b-spinner>
                                <span>{{ __('loading') }}...</span>
                            </div>
                            <div v-else-if="!filteredCategoryTree.length" class="item-grid-state py-5">
                                <i class="bi bi-inbox fs-2 text-muted mb-2"></i>
                                <span>{{ __('no_records_to_show') }}</span>
                            </div>
                            <div v-else class="category-tree-list">
                                <category-tree-node
                                    v-for="rootNode in filteredCategoryTree"
                                    :key="rootNode.id"
                                    :node="rootNode"
                                    :expanded-ids="expandedIds"
                                    :depth="0"
                                    :can-create="$can('category_create')"
                                    :can-update="$can('category_update')"
                                    :can-delete="$can('category_delete')"
                                    @toggle="toggleNode"
                                    @edit="editCategoryRecord"
                                    @delete="deleteCategoryFromTree"
                                    @add-child="addChildCategory"
                                />
                            </div>
                        </div>

                        <!-- List / Table view -->
                        <!-- Draggable table when enableDragDrop is enabled -->
                        <div v-else-if="enableDragDrop" class="table-responsive mb-0">
                            <table class="table figma-table b-table mb-0">
                                <thead>
                                    <tr>
                                        <th class="text-center" style="width: 56px;">{{ __('drag') || 'Drag' }}</th>
                                        <th class="text-center" style="width: 70px;">{{ __('id') }}</th>
                                        <th class="text-center" style="width: 80px;">{{ __('order') || 'Order' }}</th>
                                        <th class="text-center" style="width: 90px;">{{ __('parent_id') }}</th>
                                        <th class="text-center">{{ __('name') }}</th>
                                        <th class="text-center">{{ __('subtitle') }}</th>
                                        <th class="text-center" style="width: 80px;">{{ __('image') }}</th>
                                        <th class="text-center" style="width: 90px;">{{ __('status') }}</th>
                                        <th class="text-center" style="width: 110px;">{{ __('actions') }}</th>
                                    </tr>
                                </thead>
                                <draggable v-model="categories" tag="tbody" :disabled="!enableDragDrop"
                                    v-bind="dragOptions" handle=".category-drag-handle"
                                    @start="isDragging = true" @end="isDragging = false"
                                    @change="updateCategoriesOrder">
                                    <tr v-for="(category, index) in translatedCategories" :key="category.id"
                                        class="figma-tr align-middle" :class="{ 'dragging': isDragging }">
                                        <td class="text-center category-drag-handle cursor-move" :title="__('drag_to_reorder') || 'Drag to reorder'">
                                            <i class="bi bi-grip-vertical fs-5 text-muted"></i>
                                        </td>
                                        <td class="text-center font-monospace">#{{ category.id }}</td>
                                        <td class="text-center">
                                            <span class="badge bg-light text-dark border">{{ category.row_order || ((currentPage - 1) * perPage + index + 1) }}</span>
                                        </td>
                                        <td class="text-center">{{ Number(category.parent_id) > 0 ? '#' + category.parent_id : '-' }}</td>
                                        <td class="text-center fw-semibold">{{ category.name }}</td>
                                        <td class="text-center text-muted">{{ category.subtitle || '-' }}</td>
                                        <td class="text-center">
                                            <img :src="category.image_url || $placeholderImage" height="40" class="category-thumb" />
                                        </td>
                                        <td class="text-center">
                                            <span class='badge bg-success' v-if="category.status == 1">{{ __('active') }}</span>
                                            <span class='badge bg-danger' v-if="category.status == 0">{{ __('deactive') }}</span>
                                        </td>
                                        <td class="text-center">
                                            <div class="d-flex gap-2 justify-content-center">
                                                <button class="figma-action-btn" @click="edit_record = category"
                                                    v-if="$can('category_update')" v-b-tooltip.hover :title="__('edit')">
                                                    <base-icon name="edit icon" hoverName="edit Hover" width="24" height="24" />
                                                </button>
                                                <button class="figma-action-btn" @click="deleteCategory(categories.indexOf(category), category.id)"
                                                    v-if="$can('category_delete')" v-b-tooltip.hover :title="__('delete')">
                                                    <base-icon name="Type=Default" hoverName="Type=Hover" width="24" height="24" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                </draggable>
                            </table>
                        </div>

                        <!-- Regular table when enableDragDrop is disabled -->
                        <div v-else class="table-responsive mb-0">
                            <b-table :items="translatedCategories" :fields="fields" :filter="filter"
                                :filter-included-fields="filterOn" :sort-by.sync="sortBy" :sort-desc.sync="sortDesc"
                                show-empty small :empty-text="__('no_records_to_show')"
                                :empty-filtered-text="__('no_records_to_show')" class="mb-0">

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
                                        <button class="figma-action-btn" @click="edit_record = row.item"
                                            v-if="$can('category_update')" v-b-tooltip.hover :title="__('edit')">
                                            <base-icon name="edit icon" hoverName="edit Hover" width="24" height="24" />
                                        </button>
                                        <button class="figma-action-btn" @click="deleteCategory(translatedCategories.indexOf(row.item), row.item.id)"
                                            v-if="$can('category_delete')" v-b-tooltip.hover :title="__('delete')">
                                            <base-icon name="Type=Default" hoverName="Type=Hover" width="24"
                                                height="24" />
                                        </button>
                                    </div>
                                </template>

                            </b-table>
                        </div>

                        <!-- Footer -->
                        <div v-if="viewMode === 'tree'" class="figma-table-footer flex-wrap gap-3 justify-content-between align-items-center">
                            <div class="showing-results-text text-muted mb-0">
                                <i class="bi bi-diagram-3 me-1 text-primary"></i>
                                <span>{{ __('showing_all') || 'Showing all' }} <strong>{{ totalTreeNodesCount }}</strong> {{ __('categories_in_hierarchy') || 'categories in hierarchy' }} (<strong>{{ rootCategoriesCount }}</strong> {{ __('root_categories') || 'root categories' }}, <strong>{{ subCategoriesCount }}</strong> {{ __('sub_categories') || 'subcategories' }})</span>
                            </div>
                            <div class="d-flex align-items-center gap-2">
                                <button type="button" class="btn btn-sm btn-outline-secondary" @click="expandAll" :disabled="isTreeLoading || !filteredCategoryTree.length">
                                    <i class="bi bi-arrows-expand me-1"></i>{{ __('expand_all') || 'Expand All' }}
                                </button>
                                <button type="button" class="btn btn-sm btn-outline-secondary" @click="collapseAll" :disabled="isTreeLoading || !filteredCategoryTree.length">
                                    <i class="bi bi-arrows-collapse me-1"></i>{{ __('collapse_all') || 'Collapse All' }}
                                </button>
                            </div>
                        </div>
                        <div v-else class="figma-table-footer flex-wrap gap-3">
                            <div class="d-flex align-items-center gap-2">
                                <label class="showing-results-text mb-0">{{ __('per_page') }}</label>
                                <b-form-select v-model="perPage" :options="pageOptions" size="sm"
                                    class="w-auto"></b-form-select>
                                <table-count :current-page="currentPage" :per-page="perPage" :total-rows="totalRows"></table-count>
                            </div>
                            <div class="d-flex align-items-center gap-3">
                                <b-pagination v-model="currentPage" :total-rows="totalRows" :per-page="perPage"
                                    align="right" class="figma-pagination mb-0" @change="getCategories"
                                    hide-goto-end-buttons hide-ellipsis prev-text="<" next-text=">"></b-pagination>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>

        <!-- Add / Edit -->
        <app-edit-record v-if="create_new || edit_record" :record="edit_record" :globalColors="globalSettings" @modalClose="hideModal()"
            @saved="onCategorySaved"></app-edit-record>
    </div>

</template>
<script>

import EditRecord from './Edit.vue';
import CategoryTreeNode from './CategoryTreeNode.vue';
import ViewModeMixin from '../../mixins/ViewModeMixin';
import draggable from 'vuedraggable';

export default {
    mixins: [ViewModeMixin],
    components: {
        'app-edit-record': EditRecord,
        'category-tree-node': CategoryTreeNode,
        draggable,
    },
    data: function () {
        return {
            fields: [
                { key: 'id', label: __('id'), class: 'text-center', sortable: true, sortDirection: 'asc' },
                { key: 'parent_id', label: __('parent_id'), class: 'text-center', sortable: true, sortDirection: 'desc' },
                { key: 'name', label: __('name'), class: 'text-center', sortable: true },
                { key: 'subtitle', label: __('subtitle'), class: 'text-center', sortable: true },
                { key: 'image', label: __('image'), class: 'text-center' },
                { key: 'status', label: __('status'), class: 'text-center' },
                { key: 'actions', label: __('actions'), class: 'text-center' }
            ],
            totalRows: 1,
            currentPage: 1,
            perPage: this.$perPage,
            pageOptions: this.$pageOptions,
            sortBy: 'id',
            sortDesc: true,
            sortDirection: 'asc',
            filter: null,
            filterOn: [],
            page: 1,
            // API returns one page (offset/limit): grid shows the array as is
            serverPagination: true,

            categories: [],
            isLoading: false,

            // Drag and drop reordering state
            enableDragDrop: false,
            isDragging: false,
            isReordering: false,

            // Tree view state
            allCategories: [],
            isTreeLoading: false,
            expandedIds: {},
            treeLoadedOnce: false,

            sectionStyle: 'style_1',
            max_visible_categories: 12,
            max_col_in_single_row: 3,
            create_new: null,
            edit_record: null,
            settingModalShow: false,
            currentLanguageId: null,
            activeLanguages: [],
            latestRequestId: 0,
            globalSettings: {
                category_background_color_mode: 'global',
                category_background_color_light_theme: '',
                category_background_color_dark_theme: ''
            },
            isSavingGlobal: false
        }
    },
    computed: {
        dragOptions() {
            return {
                animation: 200,
                group: "categories",
                disabled: !this.enableDragDrop,
                ghostClass: "ghost-category"
            };
        },
        sortOptions() {
            // Create an options list from our fields
            return this.fields
                .filter(f => f.sortable)
                .map(f => {
                    return { text: f.label, value: f.key }
                })
        },
        pageStart() {
            if (this.totalRows === 0) return 0;
            return (this.currentPage - 1) * this.perPage + 1;
        },
        pageEnd() {
            return Math.min(this.currentPage * this.perPage, this.totalRows);
        },
        filteredCategories: function () {
            const list = Array.isArray(this.categories) ? this.categories : [];
            const query = this.filter ? this.filter.toLowerCase() : '';
            return list.filter(category => {
                const name = (category.name || '').toString().toLowerCase();
                const subtitle = (category.subtitle || '').toString().toLowerCase();
                return name.includes(query) || subtitle.includes(query);
            });
        },
        // Grid view rows: same client-side search (b-table :filter over all fields) and sort as the table
        gridCategories() {
            const list = this.translatedCategories;
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
        // Computed property to transform categories with translated fields based on current app_locale
        translatedCategories: function () {
            const list = Array.isArray(this.categories) ? this.categories : [];
            if (!this.currentLanguageId || list.length === 0) {
                return list;
            }

            return list.map(category => {
                const translatedCategory = { ...category };

                if (category.translations && Array.isArray(category.translations)) {
                    const translation = category.translations.find(
                        t => t.language_id === this.currentLanguageId
                    );

                    if (translation && translation.name && translation.name.trim() !== '') {
                        translatedCategory.name = translation.name;
                    }

                    if (translation && translation.subtitle && translation.subtitle.trim() !== '') {
                        translatedCategory.subtitle = translation.subtitle;
                    }
                }
                return translatedCategory;
            });
        },
        // Translated categories for tree view
        translatedTreeCategories: function () {
            const list = Array.isArray(this.allCategories) ? this.allCategories : [];
            if (!this.currentLanguageId || list.length === 0) {
                return list;
            }

            return list.map(category => {
                const translated = { ...category };
                if (category.translations && Array.isArray(category.translations)) {
                    const translation = category.translations.find(
                        t => t.language_id === this.currentLanguageId
                    );
                    if (translation && translation.name && translation.name.trim() !== '') {
                        translated.name = translation.name;
                    }
                    if (translation && translation.subtitle && translation.subtitle.trim() !== '') {
                        translated.subtitle = translation.subtitle;
                    }
                }
                return translated;
            });
        },
        // Full recursive category tree (depths, hierarchy paths: parent > child > child's child)
        categoryTree() {
            const list = this.translatedTreeCategories;
            if (!list || list.length === 0) return [];

            const map = new Map();
            const roots = [];

            // 1. Map all category nodes
            list.forEach(cat => {
                map.set(Number(cat.id), {
                    ...cat,
                    children: [],
                    depth: 0,
                    path: [cat.name]
                });
            });

            // 2. Build parent-child connections
            list.forEach(cat => {
                const node = map.get(Number(cat.id));
                const parentId = Number(cat.parent_id);
                if (parentId > 0 && map.has(parentId)) {
                    const parent = map.get(parentId);
                    parent.children.push(node);
                } else {
                    roots.push(node);
                }
            });

            // 3. Assign depths and ancestry relation path (parent > child > child's child)
            const setDepthAndPath = (node, depth, parentPath) => {
                node.depth = depth;
                node.path = [...parentPath, node.name];
                if (node.children && node.children.length > 0) {
                    node.children.sort((a, b) => {
                        if (a.row_order !== undefined && b.row_order !== undefined && a.row_order !== b.row_order) {
                            return Number(a.row_order) - Number(b.row_order);
                        }
                        return (a.name || '').localeCompare(b.name || '');
                    });
                    node.children.forEach(child => setDepthAndPath(child, depth + 1, node.path));
                }
            };

            roots.sort((a, b) => {
                if (a.row_order !== undefined && b.row_order !== undefined && a.row_order !== b.row_order) {
                    return Number(a.row_order) - Number(b.row_order);
                }
                return (a.name || '').localeCompare(b.name || '');
            });

            roots.forEach(root => setDepthAndPath(root, 0, []));

            return roots;
        },
        // Filtered tree supporting client-side search while keeping branch hierarchy intact
        filteredCategoryTree() {
            const query = this.filter ? String(this.filter).trim().toLowerCase() : '';
            if (!query) {
                return this.categoryTree;
            }

            const filterNode = (node) => {
                const nameMatches = node.name && node.name.toLowerCase().includes(query);
                const subtitleMatches = node.subtitle && node.subtitle.toLowerCase().includes(query);
                const idMatches = String(node.id).includes(query);
                const matchesSelf = nameMatches || subtitleMatches || idMatches;

                let matchingChildren = [];
                if (node.children && node.children.length > 0) {
                    matchingChildren = node.children
                        .map(filterNode)
                        .filter(Boolean);
                }

                if (matchesSelf || matchingChildren.length > 0) {
                    return {
                        ...node,
                        children: matchingChildren,
                        matchesQuery: matchesSelf
                    };
                }

                return null;
            };

            return this.categoryTree
                .map(filterNode)
                .filter(Boolean);
        },
        totalTreeNodesCount() {
            return Array.isArray(this.allCategories) ? this.allCategories.length : 0;
        },
        rootCategoriesCount() {
            return this.categoryTree.length;
        },
        subCategoriesCount() {
            return Math.max(0, this.totalTreeNodesCount - this.rootCategoriesCount);
        }
    },
    mounted() {
    },
    watch: {
        $route(to, from) {
            this.showCreateModal();
        },
        currentPage(newPage) {
            this.getCategories();
        },
        perPage(newPerPage) {
            if (this.currentPage !== 1) {
                this.currentPage = 1;
            } else {
                this.getCategories();
            }
        },
        filter(newFilter, oldFilter) {
            if (this.viewMode === 'tree') {
                if (newFilter) {
                    this.$nextTick(() => {
                        this.expandMatchingBranches(this.filteredCategoryTree);
                    });
                }
                return;
            }
            if (this.currentPage === 1) {
                this.getCategories();
            } else {
                this.currentPage = 1;
            }
        },
        viewMode(newMode) {
            if (newMode === 'tree') {
                this.enableDragDrop = false;
                if (!this.treeLoadedOnce || !this.allCategories.length) {
                    this.getTreeCategories();
                }
            }
        },
        enableDragDrop(val) {
            if (val) {
                this.sortBy = null;
            } else {
                this.sortBy = 'id';
            }
        }
    },
    created: function () {
        this.showCreateModal();
        this.fetchGlobalColors();
        this.fetchActiveLanguages().then(() => {
            this.getCategories();
            if (this.viewMode === 'tree') {
                this.getTreeCategories();
            }
        });
    },
    methods: {
        refreshData() {
            if (this.viewMode === 'tree') {
                this.getTreeCategories();
            } else {
                this.getCategories();
            }
        },
        fetchGlobalColors() {
            axios.get(this.$apiUrl + '/web_settings').then((response) => {
                let settings = response.data.data.settingsObject;
                this.globalSettings.category_background_color_mode = settings.category_background_color_mode || 'global';
                this.globalSettings.category_background_color_light_theme = settings.category_background_color_light_theme || '';
                this.globalSettings.category_background_color_dark_theme = settings.category_background_color_dark_theme || '';
            });
        },
        saveGlobalColors() {
            this.isSavingGlobal = true;
            let formData = new FormData();
            formData.append('category_background_color_mode', this.globalSettings.category_background_color_mode || 'global');
            formData.append('category_background_color_light_theme', this.globalSettings.category_background_color_light_theme || '');
            formData.append('category_background_color_dark_theme', this.globalSettings.category_background_color_dark_theme || '');
            
            axios.post(this.$apiUrl + '/web_settings/save', formData).then(res => {
                if (res.data.status === 1) {
                    this.showMessage("success", __('background_colors_saved_successfully') || 'Background Colors Saved Successfully.');
                } else {
                    this.showError(res.data.message);
                }
            }).catch(error => {
                this.showError(__('something_went_wrong'));
            }).finally(() => {
                this.isSavingGlobal = false;
            });
        },
        fetchActiveLanguages() {
            return axios.get(this.$apiUrl + '/active_languages')
                .then(response => {
                    if (response.data.data && Array.isArray(response.data.data)) {
                        this.activeLanguages = response.data.data;

                        const appLocale = window.appLocale || 'en';

                        // Find language ID for current app_locale code
                        const currentLanguage = this.activeLanguages.find(
                            lang => lang.code === appLocale
                        );

                        if (currentLanguage) {
                            this.currentLanguageId = currentLanguage.id;
                        } else {
                            const defaultLanguage = this.activeLanguages.find(
                                lang => lang.is_default === 1
                            );
                            if (defaultLanguage) {
                                this.currentLanguageId = defaultLanguage.id;
                            }
                        }
                    }
                })
                .catch(error => {
                    console.error('Error loading languages:', error);
                });
        },

        getCategories() {
            this.isLoading = true;
            this.latestRequestId++;
            const currentRequestId = this.latestRequestId;

            const params = {
                offset: this.currentPage,
                limit: this.perPage,
                filter: this.filter,
                _t: Date.now()
            };
            axios.get(this.$apiUrl + '/categories', { params })
                .then((response) => {
                    if (currentRequestId !== this.latestRequestId) {
                        return; // Discard stale/out-of-order response
                    }
                    this.isLoading = false;
                    const data = response.data || {};
                    // Always set to array so .length and table empty state work; avoid undefined
                    this.categories = Array.isArray(data.data) ? data.data : [];
                    this.totalRows = typeof data.total === 'number' ? data.total : 0;
                })
                .catch(() => {
                    if (currentRequestId !== this.latestRequestId) {
                        return; // Discard stale/out-of-order response
                    }
                    this.isLoading = false;
                    this.categories = [];
                    this.totalRows = 0;
                });
        },

        getTreeCategories() {
            this.isTreeLoading = true;
            return axios.get(this.$apiUrl + '/categories', { params: { _t: Date.now() } })
                .then((response) => {
                    this.isTreeLoading = false;
                    this.treeLoadedOnce = true;
                    const data = response.data || {};
                    this.allCategories = Array.isArray(data.data) ? data.data : [];

                    // Expand root categories by default if not set yet
                    if (Object.keys(this.expandedIds).length === 0) {
                        const initialExpanded = {};
                        this.categoryTree.forEach(root => {
                            if (root.children && root.children.length) {
                                initialExpanded[root.id] = true;
                            }
                        });
                        this.expandedIds = initialExpanded;
                    }
                })
                .catch(() => {
                    this.isTreeLoading = false;
                    this.allCategories = [];
                });
        },

        toggleNode(id) {
            this.$set(this.expandedIds, id, !this.expandedIds[id]);
        },

        expandAll() {
            const newExpanded = {};
            const collect = (nodes) => {
                nodes.forEach(n => {
                    if (n.children && n.children.length > 0) {
                        newExpanded[n.id] = true;
                        collect(n.children);
                    }
                });
            };
            collect(this.categoryTree);
            this.expandedIds = newExpanded;
        },

        collapseAll() {
            this.expandedIds = {};
        },

        expandMatchingBranches(nodes) {
            const newExpanded = { ...this.expandedIds };
            const collect = (list) => {
                list.forEach(n => {
                    if (n.children && n.children.length > 0) {
                        newExpanded[n.id] = true;
                        collect(n.children);
                    }
                });
            };
            collect(nodes || []);
            this.expandedIds = newExpanded;
        },

        editCategoryRecord(node) {
            this.edit_record = node;
        },

        deleteCategoryFromTree(node) {
            const idx = this.categories.findIndex(c => Number(c.id) === Number(node.id));
            this.deleteCategory(idx, node.id);
        },

        addChildCategory(parentNode) {
            this.edit_record = { parent_id: parentNode.id };
            this.create_new = true;
        },

        deleteCategory(index, id) {
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
                    this.isLoading = true;
                    this.isTreeLoading = true;
                    let postData = {
                        id: id
                    }
                    axios.post(this.$apiUrl + '/categories/delete', postData)
                        .then((response) => {
                            this.isLoading = false;
                            this.isTreeLoading = false;
                            let data = response.data;
                            if (index >= 0 && index < this.categories.length) {
                                this.categories.splice(index, 1);
                            }
                            this.getCategories();
                            if (this.treeLoadedOnce || this.viewMode === 'tree') {
                                this.getTreeCategories();
                            }
                            this.showMessage('success', data.message);
                        }).catch(() => {
                            this.isLoading = false;
                            this.isTreeLoading = false;
                        });
                }
            });
        },
        // Grid card: parent category name when it is on the loaded page, otherwise its id
        parentLabel(category) {
            const parent = this.translatedCategories.find(c => Number(c.id) === Number(category.parent_id));
            return parent ? parent.name : '#' + category.parent_id;
        },
        showCreateModal() {
            let create = this.$route.params.create;
            if (create) {
                this.create_new = true;
            }
        },
        hideModal() {
            this.create_new = false;
            this.edit_record = false;
            this.$router.push({ path: '/manage_categories' });
        },
        // Called when Edit modal saves; show toast once and refresh list & tree
        onCategorySaved(message) {
            this.showMessage('success', message);
            this.getCategories();
            if (this.treeLoadedOnce || this.viewMode === 'tree') {
                this.getTreeCategories();
            }
            this.create_new = null;
            this.edit_record = null;
        },
        updateCategoriesOrder() {
            const payload = this.categories.map((category, index) => {
                const rowOrder = (this.currentPage - 1) * this.perPage + index + 1;
                category.row_order = rowOrder;
                return {
                    id: category.id,
                    row_order: rowOrder
                };
            });

            this.isReordering = true;
            axios.post(this.$apiUrl + '/categories/updateOrder', payload)
                .then(res => {
                    this.isReordering = false;
                    if (res.data.status === 1) {
                        this.showMessage("success", res.data.message || __('category_order_updated_successfully') || 'Categories order updated successfully');
                        if (this.treeLoadedOnce || this.viewMode === 'tree') {
                            this.getTreeCategories();
                        }
                    } else {
                        this.showError(res.data.message);
                    }
                })
                .catch(error => {
                    this.isReordering = false;
                    if (error.response && error.response.data && error.response.data.message) {
                        this.showError(error.response.data.message);
                    } else {
                        this.showError(__('something_went_wrong'));
                    }
                });
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

.category-tree-container {
    background: var(--ui-surface);
}

.category-tree-toolbar {
    background: var(--ui-surface-muted, rgba(0, 0, 0, 0.02));
    border-bottom: 1px solid var(--ui-border);
}

.tree-summary-stat {
    font-size: 13px;
    font-weight: 500;
    color: var(--ui-text);
}

.category-tree-list {
    min-height: 160px;
}


/* Phones: more compact card header */
@media (max-width: 575.98px) {
    .figma-main-section-card .card-header {
        padding: 12px 16px !important;
    }

    .figma-main-section-card .card-header .card-title {
        font-size: 15px;
        line-height: 1.3;
    }
}
</style>
