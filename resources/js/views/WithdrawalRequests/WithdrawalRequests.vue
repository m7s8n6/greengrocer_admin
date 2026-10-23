<template>
    <div>
        <div class="page-heading d-flex justify-content-between align-items-center mb-4">
            <h3 class="modern-page-title mb-0">{{ __('withdrawal_requests') }}</h3>
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb mb-0">
                    <li class="breadcrumb-item"><router-link to="/dashboard" class="text-muted">{{ __('dashboard')
                            }}</router-link></li>
                    <li class="breadcrumb-item active text-primary" aria-current="page">{{ __('withdrawal_requests') }}
                    </li>
                </ol>
            </nav>
        </div>
        <section class="section">
            <div class="figma-main-section-card">
                <div class="card-body p-0">
                    <!-- Modern Filter Action Bar -->
                    <div class="d-flex justify-content-between align-items-center flex-wrap gap-2 figma-action-bar-row">
                        <div class="flex-grow-1">
                            <div class="figma-search-container">
                                <i class="fa fa-search text-muted"></i>
                                <input v-model="filter" type="text" class="figma-search-input"
                                    :placeholder="__('search') || 'Search...'">
                            </div>
                        </div>
                        <div class="d-flex gap-2">
                            <button class="btn btn-figma-filter d-flex align-items-center gap-2"
                                :class="{ 'active': showFilters }" @click="showFilters = !showFilters">
                                <base-icon name="Funnel" width="24" height="24" useCurrentColor />
                                <span>{{ __('filters') || 'Filters' }}</span>
                            </button>
                            <button class="btn btn-figma-filter d-flex align-items-center gap-2" @click="getRecords()"
                                v-b-tooltip.hover :title="__('refresh')">
                                <i class="fa fa-refresh"></i>
                                <span>{{ __('refresh') }}</span>
                            </button>
                        </div>
                    </div>

                    <b-collapse v-model="showFilters">
                        <div class="figma-filter-section">
                            <div class="row g-4">
                                <div class="col-md-4">
                                    <div class="figma-filter-group">
                                        <label class="figma-filter-label">{{ __('filter_by_role') }}</label>
                                        <select @change="getRecords()" v-model="type"
                                            class="form-control form-select modern-select">
                                            <option value="">{{ __('all_roles') }}</option>
                                            <option value="seller">{{ __('seller') }}</option>
                                            <option value="delivery_boy">{{ __('delivery_boy') }}</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="figma-filter-group">
                                        <label class="figma-filter-label">{{ __('filter_by_status') }}</label>
                                        <select @change="getRecords()" v-model="status"
                                            class="form-control form-select modern-select">
                                            <option value="">{{ __('select_status') }}</option>
                                            <option value="0">{{ __('pending') }}</option>
                                            <option value="1">{{ __('approved') }}</option>
                                            <option value="2">{{ __('rejected') }}</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </b-collapse>

                    <div class="table-responsive withdrawal-table">
                        <b-table :items="withdrawalRequests" :fields="fields" :current-page="currentPage"
                            :per-page="perPage" :filter="filter" :filter-included-fields="filterOn"
                            :sort-by.sync="sortBy" :sort-desc.sync="sortDesc" :sort-direction="sortDirection"
                            :bordered="false" :busy="isLoading" stacked="md" show-empty
                            :tbody-tr-class="() => 'figma-tr align-middle'" small class="w-100 figma-order-table mb-0">
<template #empty="scope">
<div class="text-center text-muted py-4"><i class="fa fa-inbox fa-2x d-block mb-2"></i>{{ scope.emptyText }}</div>
</template>
<template #emptyfiltered="scope">
<div class="text-center text-muted py-4"><i class="fa fa-search fa-2x d-block mb-2"></i>{{ scope.emptyFilteredText }}</div>
</template>

                            <template #table-busy>
                                <div class="text-center text-muted my-2">
                                    <b-spinner class="align-middle"></b-spinner>
                                    <strong>{{ __('loading') }}...</strong>
                                </div>
                            </template>
                            <template #head(amount)="row">
                                {{ __('amount') + ' (' + $currency + ')' }}
                            </template>

                            <template #cell(status)="row">
                                <span v-if="row.item.status === 0" class="badge bg-warning">{{ __('pending')
                                }}</span>
                                <span v-else-if="row.item.status === 1" class="badge bg-success">{{ __('approved')
                                }}</span>
                                <span v-else-if="row.item.status === 2" class="badge bg-danger">{{ __('rejected')
                                }}</span>
                                <span v-else class="badge bg-danger">{{ __('undefine') }}Undefine</span>
                            </template>
                            <template #cell(receipt_image)="row">
                                <img :src="row.item.receipt_image_url" height="50" class="wr-receipt-thumb" />
                            </template>
                            <template #cell(message)="row">
                                <small class="wr-info-chip"
                                    v-b-tooltip.hover :title="row.item.message">
                                    <i class="fa fa-info-circle"></i>
                                </small>

                            </template>
                            <template #cell(created_at)="row">
                                {{ row.item.created_at }}
                            </template>
                            <template #cell(actions)="row">
                                <div class="d-flex gap-2 justify-content-center">
                                    <button class="figma-action-btn" @click="edit_record = row.item"
                                        v-if="$can('withdrawal_request_update')" v-b-tooltip.hover :title="__('edit')">
                                        <base-icon name="edit icon" hoverName="edit Hover" width="24" height="24" />
                                    </button>
                                    <button class="figma-action-btn figma-delete-btn"
                                        @click="deleteWithdrawalRequests(row.index, row.item.id)"
                                        v-if="$can('withdrawal_request_delete')" v-b-tooltip.hover
                                        :title="__('delete')">
                                        <base-icon name="Type=Default" hoverName="Type=Hover" width="24" height="24" />
                                    </button>
                                </div>
                            </template>

                        </b-table>
                    </div>

                </div>
                <div class="figma-table-footer">
                    <div class="d-flex align-items-center gap-2">
                        <label class="showing-results-text mb-0">{{ __('per_page') }}</label>
                        <b-form-select v-model="perPage" :options="pageOptions" size="sm"
                            class="w-auto"></b-form-select>
                                <table-count :current-page="currentPage" :per-page="perPage" :total-rows="totalRowsFilter"></table-count>
                    </div>
                    <b-pagination v-model="currentPage" :total-rows="totalRowsFilter" :per-page="perPage" align="right"
                        class="figma-pagination mb-0"></b-pagination>
                </div>

            </div>
        </section>
        <!-- Add / Edit -->
        <app-edit-record v-if="create_new || edit_record" :record="edit_record" @modalClose="hideModal()"></app-edit-record>
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
                { key: 'id', label: __('id'), sortable: true, sortDirection: 'desc', thClass: 'text-nowrap' },
                { key: 'type', label: __('type'), sortable: true, thClass: 'text-nowrap' },
                { key: 'name', label: __('name'), sortable: true, thClass: 'text-nowrap' },
                { key: 'amount', label: __('amount'), sortable: true, thClass: 'text-nowrap' },
                { key: 'message', label: __('message'), sortable: true, thClass: 'text-nowrap' },
                { key: 'status', label: __('status'), sortable: true, thClass: 'text-nowrap' },
                { key: 'remark', label: __('remark'), sortable: true, thClass: 'text-nowrap' },
                { key: 'receipt_image', label: __('receipt_image'), sortable: true, class: 'text-center', thClass: 'text-nowrap' },
                { key: 'created_at', label: __('date'), sortable: true, thClass: 'text-nowrap' },
                { key: 'actions', label: __('actions'), thClass: 'text-nowrap', class: 'text-center' }
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
            sectionStyle: 'style_1',
            max_visible_units: 12,
            max_col_in_single_row: 3,
            create_new: null,
            edit_record: null,
            withdrawalRequests: [],
            status: "",
            remark: "",
            type: "",
            showFilters: false
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
        filteredWithdrawRequests: function () {
            const query = this.filter ? this.filter.toLowerCase() : '';
            return this.withdrawalRequests.filter(request => {
                return (
                    (request.type && request.type.toLowerCase().includes(query)) ||
                    (request.remark && request.remark.toLowerCase().includes(query))
                );
            });
        },
        totalRowsFilter: function () {
            return this.filteredWithdrawRequests.length;
        },
        pageEnd() {
            return Math.min(this.currentPage * this.perPage, this.totalRowsFilter);
        }
    },
    mounted() {
        // Set the initial number of items
        this.totalRows = this.withdrawalRequests.length
    },
    created: function () {
        this.$eventBus.$on('withdrawalRequestSaved', (message) => {
            this.showMessage("success", message);
            this.getRecords();
            this.create_new = null;
        });
        this.getRecords();
    },
    watch: {
        perPage() {
            this.currentPage = 1;
        }
    },
    methods: {
        getRecords() {
            this.isLoading = true
            let param = {
                "type": this.type,
                "status": this.status
            }
            axios.get(this.$apiUrl + '/withdrawal_requests/get', {
                params: param
            }).then((response) => {
                this.withdrawalRequests = response.data.data.withdraw_requests;
                this.totalRows = this.withdrawalRequests.length;
                this.isLoading = false;
            });
        },
        deleteWithdrawalRequests(index, id) {
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
                    axios.post(this.$apiUrl + '/withdrawal_requests/delete', postData)
                        .then((response) => {
                            this.isLoading = false
                            this.withdrawalRequests.splice(index, 1)
                            this.showSuccess(response.data.message)
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

<style scoped>
.wr-info-chip {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    border: 1px solid var(--ui-border);
    border-radius: var(--ui-radius-sm);
    background: var(--ui-surface-muted);
    color: var(--ui-text-muted);
    cursor: pointer;
}

.wr-receipt-thumb {
    width: 50px;
    object-fit: cover;
    border: 1px solid var(--ui-border);
    border-radius: var(--ui-radius-sm);
}
</style>
