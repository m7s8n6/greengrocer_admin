<template>
    <b-modal ref="my-modal" :title="modal_title" @hidden="$emit('modalClose')" scrollable no-close-on-backdrop no-fade static>
        <div slot="modal-footer" class="d-flex flex-wrap justify-content-end gap-2 w-100">
            <b-button variant="outline-secondary" @click="hideModal">{{ __('cancel') }}</b-button>
            <b-button variant="primary" @click="$refs['dummy_submit'].click()" :disabled="isLoading || (graterAmount === true) ">{{ __('save') }}
                <b-spinner v-if="isLoading" small label="Spinning"></b-spinner>
            </b-button>
        </div>
        <form ref="my-form" @submit.prevent="saveRecord">
            <div class="row">
                <div class="form-group col-12">
                    <label>{{ __('delivery_boy') }}</label>
                    <multiselect v-model="fundTransfers.deliveryBoy"
                                 :options="deliveryBoys"
                                 :custom-label="customLabelOption"
                                 @close="checkAmount"
                                 :placeholder="__('delivery_boy')"
                                 :select-label="__('press_enter_to_select')"
                                 :selected-label="__('selected')"
                                 :deselect-label="__('press_enter_to_remove')"
                                 label="name"
                                 track-by="name" required>
                    </multiselect>
                    <div class="db-selected-card mt-2" v-if="fundTransfers.deliveryBoy">
                        <div class="db-selected-item"><span class="db-selected-label">{{ __('name') }}</span><span class="db-selected-value">{{ fundTransfers.deliveryBoy.name }}</span></div>
                        <div class="db-selected-item"><span class="db-selected-label">{{ __('mobile') }}</span><span class="db-selected-value">{{ fundTransfers.deliveryBoy.mobile }}</span></div>
                        <div class="db-selected-item"><span class="db-selected-label">{{ __('id') }}</span><span class="db-selected-value">{{ fundTransfers.deliveryBoy.id }}</span></div>
                        <div class="db-selected-item"><span class="db-selected-label">{{ __('balance') }}</span><span class="db-selected-value">{{ fundTransfers.deliveryBoy.balance }}</span></div>
                    </div>
                </div>
                <div class="form-group col-12">
                    <label for="amount">{{ __('transfer_amount') }}</label>
                    <input type="number" name="amount" id="amount" v-model="fundTransfers.amount" v-on:keyup="checkAmount" required class="form-control" :placeholder="__('transfer_amount')" @input="validateFundTransfer">
                    <span class="text-danger" v-if="graterAmount === true">{{ __('you_can_not_enter_amount_greater_than_balance') }}</span>
                    <span v-if="validationErrorFundTransfer" class="error">{{ validationErrorFundTransfer }}</span>
                </div>
                <div class="form-group col-12">
                    <label for="message">{{ __('message') }}</label>
                    <textarea name="message" id="message" v-model="fundTransfers.message" class="form-control" rows="3" :placeholder="__('message')" ></textarea>
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
    props: ['record','deliveryBoys'],
    components: {
        Multiselect
    },
    data : function(){
        return {
            isLoading: false,
            graterAmount:false,
            fundTransfers:{
                id: this.record ? this.record.id : null ,
                deliveryBoy:null,
                amount: this.record ? this.record.amount : "" ,
                message: this.record ? this.record.message : "" ,
                
            },
            validationErrorFundTransfer: null,

        };
    },
    computed: {
        modal_title: function(){
            let title = this.id ?  __('edit')  : __('add')  ;
            title +=' ';
            title += __('fund_transfer');
            return title;
        },
    },
    methods: {
        showModal() {
            this.$refs['my-modal'].show()
        },
        hideModal() {
            this.$refs['my-modal'].hide()
        },
        validateFundTransfer() {
            if (this.fundTransfers.amount < 0) {
                this.validationErrorFundTransfer = "Amount must be greater than 0.";
                this.fundTransfers.amount = null;
            } else {
                this.validationErrorFundTransfer = null;
            }
        },
        customLabelOption({id, name, mobile, balance}){
            return `${__('name')}:-${name}  ${__('balance')}:-${balance}`
        },
        checkAmount(){
          if(parseInt(this.fundTransfers.amount) > parseInt(this.fundTransfers.deliveryBoy.balance)){
              this.graterAmount = true;
          }else{
              this.graterAmount = false;
          }
        },

        saveRecord: function(){
            let vm = this;
            this.isLoading = true;
            let formObject = this.fundTransfers;
            let formData = new FormData();
            for(let key in formObject){
                if (key === 'deliveryBoy'){
                    formData.append(key, JSON.stringify(formObject[key]));
                }
                else{
                    formData.append(key, formObject[key]);
                }
            }
            let url = this.$apiUrl + '/fund_transfers/save';
            if(this.fundTransfers.id){
                url = this.$apiUrl + '/fund_transfers/update';
            }
            axios.post(url, formData).then(res => {
                let data = res.data;
                if (data.status === 1) {
                    this.$eventBus.$emit('fundTransfersSaved', data.message);
                    this.hideModal();
                }else{
                    vm.showError(data.message);
                    vm.isLoading = false;
                }
            }).catch(error => {
                vm.isLoading = false;
                if (error.request.statusText) {
                    this.showError(error.request.statusText);
                }else if (error.message) {
                    this.showError(error.message);
                } else {
                    this.showError("Something went wrong!");
                }
            });
        }
    },
    mounted(){
        this.showModal();
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
