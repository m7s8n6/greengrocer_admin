<template>
    <div>
        <div class="page-heading">
            <div class="page-title mb-2">
                <div class="d-flex justify-content-between align-items-center">
                    <h3 class="modern-page-title mb-0">{{ __('addons') || 'Addons' }}</h3>
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb mb-0">
                            <li class="breadcrumb-item"><router-link to="/seller/dashboard" class="text-muted">{{ __('dashboard') }}</router-link></li>
                            <li class="breadcrumb-item active text-primary" aria-current="page">{{ __('addons') || 'Addons' }}</li>
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
                                <button class="btn btn-figma-filter d-flex align-items-center gap-2"
                                    @click="edit_record = true">
                                    <i class="fa fa-plus"></i>
                                    <span>{{ __('add_addon_group') || 'Add Addon Group' }}</span>
                                </button>
                                <button class="btn btn-figma-filter d-flex align-items-center gap-2" @click="getRecords()" v-b-tooltip.hover :title="__('refresh')">
                                    <i class="fa fa-refresh"></i>
                                    <span>{{ __('refresh') }}</span>
                                </button>
                            </div>
                        </div>

                        <div class="table-responsive mb-0">
                            <b-table :items="groups" :fields="fields" :bordered="false" :busy="isLoading" stacked="md"
                                show-empty small class="mb-0">
                                <template #table-busy>
                                    <div class="text-center text-black my-2">
                                        <b-spinner class="align-middle"></b-spinner>
                                        <strong>{{ __('loading') }}...</strong>
                                    </div>
                                </template>

                                <template #cell(selection_type)="row">
                                    <span class="badge bg-info text-capitalize">{{ row.item.selection_type }}</span>
                                </template>

                                <template #cell(options_count)="row">
                                    {{ row.item.options_count }}
                                </template>

                                <template #cell(owner)="row">
                                    <span v-if="row.item.is_mine" class="badge bg-secondary">{{ __('mine') || 'Mine' }}</span>
                                    <div v-else-if="row.item.seller_id">
                                        <div>{{ row.item.seller ? row.item.seller.name : __('seller') || 'Seller' }}</div>
                                        <small class="text-muted">ID - {{ row.item.seller_id }}</small>
                                    </div>
                                    <span v-else class="badge bg-success">{{ __('global') || 'Global' }}</span>
                                </template>

                                <template #cell(status)="row">
                                    <span v-if="row.item.status == 1" class="badge bg-success">{{__('activate')}}</span>
                                    <span v-else class="badge bg-danger">{{__('deactivate')}}</span>
                                </template>

                                <template #cell(actions)="row">
                                    <div v-if="row.item.seller_id" class="d-flex gap-2 justify-content-center">
                                        <button class="figma-action-btn" @click="edit_record = row.item" v-b-tooltip.hover :title="__('edit')">
                                            <base-icon name="edit icon" hoverName="edit Hover" width="24" height="24" />
                                        </button>
                                        <button class="figma-action-btn" @click="deleteRecord(row.index, row.item.id)" v-b-tooltip.hover :title="__('delete')">
                                            <base-icon name="Type=Default" hoverName="Type=Hover" width="24" height="24" />
                                        </button>
                                    </div>
                                    <span v-else class="text-muted small">{{ __('managed_by_admin') || 'Managed by admin' }}</span>
                                </template>
                            </b-table>
                            <div class="figma-table-footer flex-wrap gap-3">
                                <div class="d-flex align-items-center gap-2">
                                    <label class="showing-results-text mb-0">{{ __('per_page') }}</label>
                                    <b-form-select v-model="perPage" :options="pageOptions" size="sm"
                                        style="width: auto;"></b-form-select>
                                </div>
                                <div class="d-flex align-items-center gap-3">
                                    <b-pagination v-model="currentPage" :total-rows="totalRows" :per-page="perPage"
                                        align="right" class="figma-pagination mb-0"></b-pagination>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>

        <app-edit-record v-if="edit_record" :record="edit_record === true ? null : edit_record"
            @modalClose="edit_record = null"></app-edit-record>
    </div>
</template>
<script>
import EditRecord from '../Product/Addons/Edit.vue';

export default {
    components: {
        'app-edit-record': EditRecord,
    },
    data: function () {
        return {
            fields: [
                { key: 'id', label: __('id'), class: 'text-center' },
                { key: 'name', label: __('name'), class: 'text-center' },
                { key: 'selection_type', label: __('selection_type') || 'Selection Type', class: 'text-center' },
                { key: 'options_count', label: __('options') || 'Options', class: 'text-center' },
                { key: 'owner', label: __('owner') || 'Owner', class: 'text-center' },
                { key: 'status', label: __('status'), class: 'text-center' },
                { key: 'actions', label: __('actions'), class: 'text-center' },
            ],
            totalRows: 0,
            currentPage: 1,
            perPage: this.$perPage,
            pageOptions: this.$pageOptions,
            filter: null,
            groups: [],
            isLoading: false,
            edit_record: null,
        };
    },
    watch: {
        currentPage() {
            this.getRecords();
        },
        perPage() {
            if (this.currentPage !== 1) {
                this.currentPage = 1;
            } else {
                this.getRecords();
            }
        },
        filter() {
            this.currentPage = 1;
            this.getRecords();
        },
    },
    created: function () {
        this._recordSavedHandler = (message) => {
            this.showMessage('success', message);
            this.getRecords();
        };
        this.$eventBus.$on('recordSaved', this._recordSavedHandler);
        this.getRecords();
    },
    beforeDestroy: function () {
        this.$eventBus.$off('recordSaved', this._recordSavedHandler);
    },
    methods: {
        getRecords() {
            this.isLoading = true;
            axios.get(this.$apiUrl + '/seller/addons', {
                params: {
                    page: this.currentPage,
                    per_page: this.perPage,
                    filter: this.filter || '',
                }
            }).then((response) => {
                this.isLoading = false;
                let data = response.data;
                this.groups = data.data;
                this.totalRows = data.total;
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
                confirmButtonColor: '#37a279',
                cancelButtonColor: '#d33',
            }).then(result => {
                if (result.value) {
                    this.isLoading = true;
                    axios.post(this.$apiUrl + '/seller/addons/delete', { id: id })
                        .then((response) => {
                            this.isLoading = false;
                            this.groups.splice(index, 1);
                            this.showMessage('success', response.data.message);
                        });
                }
            });
        },
    }
};
</script>
