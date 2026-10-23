<template>
    <div>
        <div class="page-heading">
            <div class="page-title mb-2">
                <div class="d-flex justify-content-between align-items-center flex-wrap gap-2">
                    <h3 class="modern-page-title mb-0">Delivery Boy Requests</h3>
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb mb-0">
                            <li class="breadcrumb-item"><router-link to="/seller/dashboard" class="text-muted">{{ __('dashboard') }}</router-link></li>
                            <li class="breadcrumb-item active text-primary" aria-current="page">Delivery Boy Requests</li>
                        </ol>
                    </nav>
                </div>
            </div>

            <section class="section">
                <div class="figma-main-section-card">
                    <div class="card-body p-0">
                        <div class="d-flex justify-content-between align-items-center flex-wrap gap-2 figma-action-bar-row">
                            <select class="form-control form-select w-auto status-filter" v-model="filterStatus" @change="onFilterChange">
                                <option value="0">Pending</option>
                                <option value="1">Accepted</option>
                                <option value="2">Rejected</option>
                            </select>
                            <button class="btn btn-figma-filter d-flex align-items-center gap-2" @click="getRecords()">
                                <i class="fa fa-refresh"></i>
                                <span>{{ __('refresh') }}</span>
                            </button>
                        </div>

                        <div class="table-responsive mb-0">
                            <b-table :items="requests" :fields="fields" :busy="isLoading" stacked="md" show-empty small
                                class="figma-table mb-0" :tbody-tr-class="() => 'figma-tr align-middle'">
<template #empty="scope">
<div class="text-center text-muted py-4"><i class="fa fa-inbox fa-2x d-block mb-2"></i>{{ scope.emptyText }}</div>
</template>
<template #emptyfiltered="scope">
<div class="text-center text-muted py-4"><i class="fa fa-search fa-2x d-block mb-2"></i>{{ scope.emptyFilteredText }}</div>
</template>

                                <template #table-busy>
                                    <div class="text-center text-muted my-3">
                                        <b-spinner class="align-middle"></b-spinner>
                                        <strong>{{ __('loading') }}...</strong>
                                    </div>
                                </template>

                                <template #cell(status)="row">
                                    <span v-if="row.item.status === 1" class="figma-status-pill bg-success">Accepted</span>
                                    <span v-else-if="row.item.status === 2" class="figma-status-pill bg-danger">Rejected</span>
                                    <span v-else class="figma-status-pill bg-warning">Pending</span>
                                </template>

                                <template #cell(actions)="row">
                                    <div v-if="row.item.status === 0" class="d-flex justify-content-center gap-2">
                                        <button class="btn btn-sm btn-outline-success d-inline-flex align-items-center gap-1" :disabled="busyId === row.item.id" @click="respond(row.item, 'accept')"><i class="fa fa-check"></i> Accept</button>
                                        <button class="btn btn-sm btn-outline-danger d-inline-flex align-items-center gap-1" :disabled="busyId === row.item.id" @click="respond(row.item, 'reject')"><i class="fa fa-times"></i> Reject</button>
                                    </div>
                                    <span v-else class="text-muted">-</span>
                                </template>
                            </b-table>
                        </div>

                        <div class="figma-table-footer flex-wrap gap-3">
                            <table-count :current-page="currentPage" :per-page="perPage" :total-rows="total"></table-count>
                            <b-pagination v-model="currentPage" :total-rows="total" :per-page="perPage"
                                class="figma-pagination mb-0" hide-goto-end-buttons hide-ellipsis prev-text="<"
                                next-text=">" @input="getRecords"></b-pagination>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    data: function () {
        return {
            isLoading: false,
            busyId: null,
            requests: [],
            filterStatus: '0',
            total: 0,
            perPage: 10,
            currentPage: 1,
            fields: [
                { key: 'id', label: __('id') },
                { key: 'name', label: __('name') },
                { key: 'mobile', label: __('mobile') },
                { key: 'email', label: __('email') },
                { key: 'city_name', label: __('city') },
                { key: 'status', label: __('status') },
                { key: 'actions', label: __('actions'), class: 'text-center' },
            ],
        }
    },
    created: function () {
        this.getRecords();
    },
    methods: {
        onFilterChange() {
            this.currentPage = 1;
            this.getRecords();
        },
        getRecords() {
            this.isLoading = true;
            axios.get(this.$apiUrl + '/seller/delivery_fleet/requests', {
                params: {
                    status: this.filterStatus,
                    limit: this.perPage,
                    offset: (this.currentPage - 1) * this.perPage,
                }
            }).then((response) => {
                this.requests = response.data.data || [];
                this.total = response.data.total || 0;
                this.isLoading = false;
            }).catch(() => {
                this.isLoading = false;
            });
        },
        respond(item, action) {
            this.$swal.fire({
                title: __('are_you_sure'),
                text: action === 'accept' ? 'Accept this delivery boy into your fleet?' : 'Reject this delivery boy request?',
                confirmButtonText: __('yes_sure'),
                cancelButtonText: __('cancel'),
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: 'var(--theme-primary-500)',
                cancelButtonColor: 'var(--theme-error-500)',
            }).then((result) => {
                if (!result.value) {
                    return;
                }
                this.busyId = item.id;
                axios.post(this.$apiUrl + '/seller/delivery_fleet/respond-request', { id: item.id, action: action }).then((res) => {
                    this.busyId = null;
                    if (res.data.status === 1) {
                        this.showMessage('success', res.data.message);
                        this.getRecords();
                    } else {
                        this.showError(res.data.message);
                    }
                }).catch(() => {
                    this.busyId = null;
                    this.showError(this.__('something_went_wrong'));
                });
            });
        },
    }
};
</script>

<style scoped>
/* Status filter: same height as the toolbar buttons */
.status-filter {
    height: 38px;
    min-width: 160px;
    font-size: 13px;
}
</style>
