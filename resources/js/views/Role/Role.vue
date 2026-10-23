<template>

    <div>
        <div>
            <div class="page-heading">
                <div class="page-title mb-3">
                    <div class="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-2">
                        <h3 class="mb-0">{{ __('role') }}</h3>
                        <nav aria-label="breadcrumb">
                            <ol class="breadcrumb mb-0">
                                <li class="breadcrumb-item"><router-link to="/dashboard">{{ __('dashboard')
                                }}</router-link></li>
                                <li class="breadcrumb-item active" aria-current="page">{{ __('role') }}</li>
                            </ol>
                        </nav>
                    </div>
                </div>
            </div>

            <section class="section">
                <div class="figma-main-section-card">
                    <div class="card-body p-0">
                        <div
                            class="d-flex justify-content-between align-items-center flex-wrap gap-2 figma-action-bar-row">
                            <div class="flex-grow-1">
                                <div class="figma-search-container">
                                    <i class="fa fa-search text-muted"></i>
                                    <input v-model="filter" type="search" class="figma-search-input"
                                        :placeholder="__('search')">
                                </div>
                            </div>
                            <div class="d-flex gap-2">
                                <button class="btn btn-figma-columns d-flex align-items-center gap-2"
                                    @click="getRecords()" v-b-tooltip.hover :title="__('refresh')">
                                    <i class="fa fa-refresh"></i>
                                    <span>{{ __('refresh') }}</span>
                                </button>
                                <button class="btn btn-figma-filter d-flex align-items-center gap-2"
                                    @click="openCreateModal()">
                                    <i class="fa fa-plus"></i>
                                    <span>{{ __('add_new') }}</span>
                                </button>
                            </div>
                        </div>

                        <div class="table-responsive mb-0">

                            <b-table :items="roles" :fields="fields" :current-page="currentPage" :per-page="perPage"
                                :filter="filter" :filter-included-fields="filterOn" :sort-by.sync="sortBy"
                                :sort-desc.sync="sortDesc" :sort-direction="sortDirection" :bordered="false"
                                :busy="isLoading" stacked="md" show-empty small
                                :tbody-tr-class="() => 'figma-tr align-middle'" class="figma-table mb-0">
                                <template #head()="data">
                                    <span class="figma-th">{{ data.label }}</span>
                                </template>

                                <template #table-busy>
                                    <div class="text-center text-muted my-2">
                                        <b-spinner class="align-middle"></b-spinner>
                                        <strong>{{ __('loading') }}...</strong>
                                    </div>
                                </template>

                                <template #cell(name)="row">
                                    <span class="d-inline-flex align-items-center gap-2">
                                        <span class="role-name">{{ row.item.name }}</span>
                                        <span v-if="nonDeleteAbleRoles.includes(row.item.name)" class="badge bg-secondary">
                                            <i class="fa fa-lock"></i> {{ __('system') }}
                                        </span>
                                    </span>
                                </template>

                                <template #cell(actions)="row">
                                    <span v-if="nonDeleteAbleRoles.includes(row.item.name)" class="text-muted">&mdash;</span>
                                    <div v-else class="d-flex gap-2">
                                        <button v-if="!nonDeleteAbleRoles.includes(row.item.name)"
                                            class="figma-action-btn" @click="openEditModal(row.item)" v-b-tooltip.hover
                                            :title="__('edit')">
                                            <base-icon name="edit icon" hoverName="edit Hover" width="24" height="24" />
                                        </button>
                                        <button v-if="!nonDeleteAbleRoles.includes(row.item.name)"
                                            class="figma-action-btn figma-delete-btn"
                                            @click="deleteRecord(row.index, row.item.id)" v-b-tooltip.hover
                                            :title="__('delete')">
                                            <base-icon name="Type=Default" hoverName="Type=Hover" width="24"
                                                height="24" />
                                        </button>
                                    </div>
                                </template>

                            </b-table>
                        </div>
                        <div class="figma-table-footer flex-wrap gap-3">
                                <table-count :current-page="currentPage" :per-page="perPage" :total-rows="totalRows"></table-count>
                                <b-pagination v-model="currentPage" :total-rows="totalRows" :per-page="perPage"
                                    align="right" class="figma-pagination mb-0" hide-goto-end-buttons hide-ellipsis
                                    prev-text="<" next-text=">"></b-pagination>
                        </div>
                    </div>
                </div>
            </section>
        </div>

        <!-- Add / Edit -->
        <app-edit-record v-if="create_new || edit_record" :record="edit_record"
            @modalClose="hideModal()"></app-edit-record>
    </div>
</template>
<script>
import { VuejsDatatableFactory } from 'vuejs-datatable';
import EditRecord from './Edit.vue';


export default {
    components: {
        VuejsDatatableFactory,
        'app-edit-record': EditRecord,
    },
    data: function () {
        return {
            roles: [],
            nonDeleteAbleRoles: [this.$roleSuperAdmin, this.$roleSeller, this.$roleDeliveryBoy],
            isLoading: false,
            edit_record: null,
            create_new: null,
            fields: [
                { key: 'id', label: __('id'), sortable: true, sortDirection: 'desc' },
                { key: 'name', label: __('name'), sortable: true },
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
            page: 1,
        }
    },
    computed: {
        pageEnd() {
            return Math.min(this.currentPage * this.perPage, this.totalRows);
        }
    },
    created: function () {
        this.category_id = this.$route.params.id;

        this.ensureEventListeners();

        this.getRecords();
    },
    beforeDestroy() {
        this.$eventBus.$off('roleSaved');
    },
    methods: {

        getRecords() {
            this.isLoading = true
            axios.get(this.$apiUrl + '/role')
                .then((response) => {
                    this.isLoading = false
                    let data = response.data;
                    this.roles = data.data
                    this.totalRows = this.roles.length;
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
                    axios.post(this.$apiUrl + '/role/delete', postData)
                        .then((response) => {
                            let data = response.data;
                            this.isLoading = false

                            if (data.status === 1) {
                                this.getRecords();
                                this.showSuccess(data.message)
                            } else {
                                this.showError(data.message);
                            }
                        });
                }
            });
        },
        hideModal() {
            this.create_new = false
            this.edit_record = null
        },
        openCreateModal() {
            this.create_new = true
            this.edit_record = null
            this.ensureEventListeners();
        },
        openEditModal(record) {
            this.edit_record = record
            this.create_new = false
            this.ensureEventListeners();
        },
        ensureEventListeners() {
            this.$eventBus.$off('roleSaved');
            this.$eventBus.$on('roleSaved', (message) => {
                this.showMessage("success", message);
                this.getRecords();
                this.hideModal();
            });
        },
    }
};
</script>

<style scoped>
.role-name {
    font-weight: 600;
    color: var(--ui-heading);
}
</style>
