<template>
    <b-modal ref="my-modal" :title="modal_title" @hidden="$emit('modalClose')" scrollable no-close-on-backdrop no-fade
        static>
        <div slot="modal-footer" class="d-flex flex-wrap justify-content-end gap-2 w-100">
            <b-button variant="outline-secondary" @click="hideModal">{{ __('cancel') }}</b-button>
            <b-button variant="primary" @click="$refs['dummy_submit'].click()" :disabled="isLoading">{{ __('save') }}
                <b-spinner v-if="isLoading" small label="Spinning"></b-spinner>
            </b-button>
        </div>
        <form ref="my-form" @submit.prevent="saveRecord">
            <div class="row">
                <div class="form-group col-12">
                    <label>{{ __('delivery_boy') }}</label>
                    <multiselect v-model="salary.deliveryBoy" :options="deliveryBoys" :custom-label="customLabelOption"
                        :placeholder="__('delivery_boy')" label="name" track-by="name" required>
                    </multiselect>
                    <div class="db-selected-card mt-2" v-if="salary.deliveryBoy">
                        <div class="db-selected-item"><span class="db-selected-label">{{ __('name') }}</span><span class="db-selected-value">{{ salary.deliveryBoy.name }}</span></div>
                        <div class="db-selected-item"><span class="db-selected-label">{{ __('mobile') }}</span><span class="db-selected-value">{{ salary.deliveryBoy.mobile }}</span></div>
                        <div class="db-selected-item"><span class="db-selected-label">{{ __('id') }}</span><span class="db-selected-value">{{ salary.deliveryBoy.id }}</span></div>
                    </div>
                </div>
                <div class="form-group col-12">
                    <label for="salary_amount">{{ __('salary') }}</label>
                    <input type="number" name="amount" id="salary_amount" v-model="salary.amount" required
                        class="form-control" step="0.01" :placeholder="__('salary')" @input="validateAmount">
                    <span v-if="validationError" class="text-danger">{{ validationError }}</span>
                </div>
                <div class="form-group col-12">
                    <label>{{ __('date') }}</label>
                    <input type="date" class="form-control" v-model="salary.date" />

                </div>
                <div class="form-group col-12">
                    <label for="message">{{ __('message') }}</label>
                    <textarea name="message" id="message" v-model="salary.message" class="form-control" rows="3"
                        :placeholder="__('message')"></textarea>
                </div>

            </div>
            <button ref="dummy_submit" class="d-none"></button>
        </form>
    </b-modal>
</template>

<script>
import axios from 'axios';
import Multiselect from 'vue-multiselect'
export default {
    props: ['record', 'deliveryBoys'],
    components: {
        Multiselect
    },
    data: function () {
        return {
            isLoading: false,
            salary: {
                id: this.record ? this.record.id : null,
                deliveryBoy: null,
                amount: this.record ? this.record.amount : "",
                message: this.record ? this.record.message : "",
                date: this.record ? this.record.paid_on : new Date().toISOString().substr(0, 10)
            },
            validationError: null,
        };
    },
    computed: {
        modal_title: function () {
            let title = this.record ? __('edit') : __('add');
            title += ' ';
            title += __('salary');
            return title;
        },
    },
    methods: {
        formatDate(date) {
            if (!date) return '';
            return moment(date).format(this.$parent.dateFormat || 'DD-MM-YYYY');
        },
        showModal() {
            this.$refs['my-modal'].show()
        },
        hideModal() {
            this.$refs['my-modal'].hide()
        },
        validateAmount() {
            if (this.salary.amount < 0) {
                this.validationError = __('amount_must_be_greater_than_zero') || "Amount must be greater than 0.";
                this.salary.amount = null;
            } else {
                this.validationError = null;
            }
        },
        customLabelOption({ name, mobile }) {
            return `Name:-${name}  Mobile:-${mobile}`
        },
        saveRecord: function () {
            let vm = this;
            this.isLoading = true;
            let formData = new FormData();
            if (this.salary.id) {
                formData.append('id', this.salary.id);
            }
            formData.append('delivery_boy_id', this.salary.deliveryBoy ? this.salary.deliveryBoy.id : '');
            formData.append('amount', this.salary.amount);
            formData.append('message', this.salary.message || '');
            // formData.append('paid_on', new Date().toISOString().split('T')[0]);
            formData.append('paid_on', this.salary.date);

            let url = this.$apiUrl + '/delivery_boy_salary/add';
            if (this.salary.id) {
                url = this.$apiUrl + '/delivery_boy_salary/update';
            }
            if (this.$route.path.startsWith('/seller/')) {
                // seller panel: own drivers only (add + edit share one endpoint)
                url = this.$sellerApiUrl + '/delivery_fleet/salary/save';
            }
            axios.post(url, formData).then(res => {
                let data = res.data;
                if (data.status === 1) {
                    this.$eventBus.$emit('salarySaved', data.message);
                    this.hideModal();
                } else {
                    vm.showError(data.message);
                    vm.isLoading = false;
                }
            }).catch(error => {
                vm.isLoading = false;
                if (error.request && error.request.statusText) {
                    this.showError(error.request.statusText);
                } else if (error.message) {
                    this.showError(error.message);
                } else {
                    this.showError("Something went wrong!");
                }
            });
        }
    },
    mounted() {
        this.showModal();
        if (this.record && this.deliveryBoys) {
            this.salary.deliveryBoy = this.deliveryBoys.find(b => b.id === this.record.delivery_boy_id) || null;
        }
    }
}
</script>

<style scoped>
@import "../../../../../node_modules/vue-multiselect/dist/vue-multiselect.min.css";
/* Selected delivery boy summary */
.db-selected-card {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 10px 16px;
    padding: 12px 14px;
    border: 1px solid var(--ui-border);
    border-radius: var(--ui-radius);
    background: var(--ui-surface-muted);
}

.db-selected-item {
    display: flex;
    flex-direction: column;
    min-width: 0;
}

.db-selected-label {
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.02em;
    color: var(--ui-text-muted);
}

.db-selected-value {
    font-size: 13px;
    font-weight: 600;
    color: var(--ui-heading);
    overflow-wrap: anywhere;
}
</style>
