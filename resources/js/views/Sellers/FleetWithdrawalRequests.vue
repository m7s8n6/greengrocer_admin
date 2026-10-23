<template>
    <div>
        <div class="page-heading">
            <div class="page-title mb-2">
                <div class="d-flex justify-content-between align-items-center flex-wrap gap-2">
                    <h3 class="modern-page-title mb-0">Delivery Boy Withdrawals</h3>
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb mb-0">
                            <li class="breadcrumb-item"><router-link to="/seller/dashboard" class="text-muted">{{ __('dashboard') }}</router-link></li>
                            <li class="breadcrumb-item active text-primary" aria-current="page">Delivery Boy Withdrawals</li>
                        </ol>
                    </nav>
                </div>
            </div>

            <section class="section">
                <div class="figma-main-section-card">
                    <div class="card-body p-0">
                        <div class="d-flex justify-content-end align-items-center figma-action-bar-row">
                            <button class="btn btn-figma-filter d-flex align-items-center gap-2" @click="getRecords()">
                                <i class="fa fa-refresh"></i>
                                <span>{{ __('refresh') }}</span>
                            </button>
                        </div>

                        <div class="table-responsive mb-0">
                            <b-table :items="records" :fields="fields" :busy="isLoading" stacked="md" show-empty :empty-text="__('no_records_to_show')" :empty-filtered-text="__('no_records_matching_your_request')" small
                                :tbody-tr-class="() => 'figma-tr align-middle'" class="figma-table mb-0">
                                <template #table-busy>
                                    <div class="text-center text-black my-2">
                                        <b-spinner class="align-middle"></b-spinner>
                                        <strong>{{ __('loading') }}...</strong>
                                    </div>
                                </template>

                                <template #cell(status)="row">
                                    <span v-if="row.item.status == 1" class="badge bg-success">{{ __('approved') }}</span>
                                    <span v-else-if="row.item.status == 2" class="badge bg-danger">{{ __('rejected') }}</span>
                                    <span v-else class="badge bg-warning">{{ __('pending') }}</span>
                                </template>

                                <template #cell(receipt_image)="row">
                                    <img v-if="row.item.receipt_image_url" :src="row.item.receipt_image_url" height="40" class="receipt-thumb" />
                                </template>

                                <template #cell(actions)="row">
                                    <button v-if="row.item.status == 0" class="btn btn-sm btn-primary d-inline-flex align-items-center gap-1"
                                        @click="openModal(row.item)"><i class="bi bi-pencil-square"></i>{{ __('update') || 'Update' }}</button>
                                </template>
                            </b-table>
                        </div>
                    </div>
                </div>
            </section>
        </div>

        <b-modal ref="status-modal" title="Withdrawal Request" no-close-on-backdrop static>
            <template #modal-footer>
                <b-button variant="outline-secondary" @click="$refs['status-modal'].hide()">{{ __('cancel') }}</b-button>
                <b-button variant="primary" :disabled="isSaving" @click="save">
                    {{ __('save') }}
                    <b-spinner v-if="isSaving" small></b-spinner>
                </b-button>
            </template>

            <div class="form-group mb-3">
                <label class="form-label">{{ __('status') }}</label>
                <select class="form-control form-select" v-model="status">
                    <option value="1">{{ __('approved') }}</option>
                    <option value="2">{{ __('rejected') }}</option>
                </select>
            </div>
            <div class="form-group mb-3" v-if="status == 1">
                <label class="form-label">{{ __('upload_receipt_image') }}<span class="text-danger">*</span></label>
                <input type="file" accept="image/*" class="form-control" @change="receipt = $event.target.files[0] || null">
            </div>
            <div class="form-group mb-3">
                <label class="form-label">{{ __('remark') }}<span class="text-danger" v-if="status == 2">*</span></label>
                <textarea class="form-control" rows="3" v-model="remark"></textarea>
            </div>
        </b-modal>
    </div>
</template>

<script>
import axios from "axios";

export default {
    data() {
        return {
            records: [],
            isLoading: false,
            isSaving: false,
            current: null,
            status: '1',
            remark: '',
            receipt: null,
            fields: [
                { key: 'id', label: __('id'), class: 'text-center' },
                { key: 'name', label: __('name'), class: 'text-center' },
                { key: 'balance', label: __('balance'), class: 'text-center' },
                { key: 'amount', label: __('amount'), class: 'text-center' },
                { key: 'message', label: __('message'), class: 'text-center' },
                { key: 'status', label: __('status'), class: 'text-center' },
                { key: 'remark', label: __('remark'), class: 'text-center' },
                { key: 'receipt_image', label: __('receipt_image'), class: 'text-center' },
                { key: 'created_at', label: __('date'), class: 'text-center' },
                { key: 'actions', label: __('actions'), class: 'text-center' },
            ],
        };
    },
    created() {
        this.getRecords();
    },
    methods: {
        getRecords() {
            this.isLoading = true;
            axios.get(this.$apiUrl + '/seller/delivery_fleet/withdrawals').then((res) => {
                this.isLoading = false;
                this.records = res.data.data || [];
            }).catch(() => {
                this.isLoading = false;
            });
        },
        openModal(item) {
            this.current = item;
            this.status = '1';
            this.remark = '';
            this.receipt = null;
            this.$refs['status-modal'].show();
        },
        save() {
            if (this.status == 1 && !this.receipt) {
                this.showError(__('the_receipt_image_is_required_when_the_status_is_approved'));
                return;
            }
            if (this.status == 2 && !this.remark.trim()) {
                this.showError('A remark is required when the status is Rejected.');
                return;
            }
            const formData = new FormData();
            formData.append('id', this.current.id);
            formData.append('status', this.status);
            formData.append('remark', this.remark);
            if (this.status == 1) formData.append('receipt_image', this.receipt);

            this.isSaving = true;
            axios.post(this.$apiUrl + '/seller/delivery_fleet/withdrawals/update', formData).then((res) => {
                this.isSaving = false;
                if (res.data.status === 1) {
                    this.showMessage('success', res.data.message);
                    this.$refs['status-modal'].hide();
                    this.getRecords();
                } else {
                    this.showError(res.data.message);
                }
            }).catch((error) => {
                this.isSaving = false;
                this.showError(error.response?.data?.message || __('something_went_wrong'));
            });
        },
    },
};
</script>

<style scoped>
.receipt-thumb {
    width: 40px;
    object-fit: cover;
    border-radius: var(--ui-radius-sm);
    border: 1px solid var(--ui-border);
}
</style>
