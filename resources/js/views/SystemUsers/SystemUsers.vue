<template>
    <div>
        <div>
            <div class="page-heading">
                <div class="row">
                    <div class="col-12 col-md-6 order-md-1 order-last">
                        <h3>{{ __('system_users') }}</h3>
                    </div>
                    <div class="col-12 col-md-6 order-md-2 order-first">
                        <nav aria-label="breadcrumb" class="breadcrumb-header float-start float-lg-end">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><router-link to="/dashboard">{{ __('dashboard')
                                        }}</router-link></li>
                                <li class="breadcrumb-item active" aria-current="page">{{ __('system_users') }}</li>
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
                                    @click="openCreateModal()" v-if="$role('Super Admin')">
                                    <i class="fa fa-plus"></i>
                                    <span>{{ __('add_new') }}</span>
                                </button>
                                <button class="btn btn-figma-filter d-flex align-items-center gap-2"
                                    @click="getRecords()" v-b-tooltip.hover :title="__('refresh')">
                                    <i class="fa fa-refresh"></i>
                                    <span>{{ __('refresh') }}</span>
                                </button>
                            </div>
                        </div>

                        <div class="table-responsive mb-0">
                            <b-table :items="system_users" :fields="fields" :current-page="currentPage"
                                :per-page="perPage" :filter="filter" :filter-included-fields="filterOn"
                                :sort-by.sync="sortBy" :sort-desc.sync="sortDesc" :sort-direction="sortDirection"
                                :bordered="false" :busy="isLoading" stacked="md" show-empty small
                                :tbody-tr-class="() => 'figma-tr align-middle'" class="figma-table">
                                <template #head()="data">
                                    <span class="figma-th">{{ data.label }}</span>
                                </template>
                                <template #table-busy>
                                    <div class="text-center text-black my-2">
                                        <b-spinner class="align-middle"></b-spinner>
                                        <strong>{{ __('loading') }}...</strong>
                                    </div>
                                </template>

                                <template #cell(email)="row">
                                    {{ row.item.email | emailMask }}
                                </template>

                                <template #cell(role)="row">
                                    {{ row.item.role.name }}
                                </template>

                                <template #cell(actions)="row">
                                    <div class="d-flex gap-2">
                                        <template v-if="row.item.role.name !== 'Super Admin'">
                                            <button class="figma-action-btn" @click="openEditModal(row.item)"
                                                v-b-tooltip.hover :title="__('edit')">
                                                <base-icon name="edit icon" hoverName="edit Hover" width="24"
                                                    height="24" />
                                            </button>
                                            <button class="figma-action-btn figma-delete-btn"
                                                @click="deleteSystemUser(row.index, row.item.id)" v-b-tooltip.hover
                                                :title="__('delete')">
                                                <base-icon name="Type=Default" hoverName="Type=Hover" width="24"
                                                    height="24" />
                                            </button>
                                        </template>
                                        <template v-else>
                                            <span class="text-muted small">
                                                <i class="fa fa-shield-alt"></i> {{ __('protected') }}
                                            </span>
                                        </template>
                                    </div>
                                </template>

                            </b-table>

                            <div class="figma-table-footer">
                                <div class="showing-results-text">
                                    {{ __('Showing Result') }} : <span class="showing-bold">{{ pageEnd }}</span> {{
                                    __('of') }} <span class="showing-bold">{{ totalRows }}</span>
                                </div>
                                <b-pagination v-model="currentPage" :total-rows="totalRows" :per-page="perPage"
                                    align="right" class="figma-pagination mb-0" hide-goto-end-buttons hide-ellipsis
                                    prev-text="<" next-text=">"></b-pagination>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
        <!-- Add / Edit -->
        <app-edit-record v-if="create_new || edit_record" :record="edit_record" :roles="roles" :products="products"
            @modalClose="hideModal()"></app-edit-record>
    </div>
</template>
<script>
import EditRecord from './Edit';
export default {
    components: {
        'app-edit-record': EditRecord,
    },
    data: function () {
        return {
            fields: [
                { key: 'id', label: __('id'), sortable: true, sortDirection: 'desc' },
                { key: 'username', label: __('username'), sortable: true, class: 'text-center' },
                { key: 'email', label: __('email'), sortable: true, class: 'text-center' },
                { key: 'role', label: __('role'), class: 'text-center' },
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

            isLoading: false,

            create_new: null,
            edit_record: null,
            system_users: [],
            roles: [],
        }
    },
    computed: {
        sortOptions() {
            // Create an options list from our fields
            return this.fields
                .filter(f => f.sortable)
                .map(f => {
                    return { text: f.label, value: f.key }
                })
        },
        pageEnd() {
            return Math.min(this.currentPage * this.perPage, this.totalRows);
        }
    },
    mounted() {
        // Set the initial number of items
        this.totalRows = this.system_users.length
    },
    created: function () {
        this.ensureEventListeners();
        this.getRecords();
    },
    beforeDestroy() {
        // Clean up event listeners to prevent accumulation
        this.$eventBus.$off('systemUserSaved');
    },
    methods: {
        getRecords() {
            this.isLoading = true
            axios.get(this.$apiUrl + '/system_users')
                .then((response) => {
                    this.system_users = response.data.data.records;
                    this.roles = response.data.data.roles;
                    this.totalRows = this.system_users.length;
                    this.isLoading = false;
                });
        },
        deleteSystemUser(index, id) {
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
                        id: id
                    }
                    axios.post(this.$apiUrl + '/system_users/delete', postData)
                        .then((response) => {
                            this.isLoading = false;
                            this.system_users.splice(index, 1);
                            this.showMessage("success", response.data.message);
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
            this.$eventBus.$off('systemUserSaved');
            this.$eventBus.$on('systemUserSaved', (message) => {
                this.showMessage("success", message);
                this.getRecords();
                this.hideModal();
            });
        },
    }
};
</script>
