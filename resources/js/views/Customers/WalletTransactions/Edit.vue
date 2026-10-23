<template>
    <b-modal ref="my-modal" :title="modal_title" @hidden="$emit('modalClose')" no-fade static>
        <div slot="modal-footer" class="d-flex flex-wrap justify-content-end gap-2 w-100">
            <b-button variant="outline-secondary" @click="hideModal">{{ __('cancel') }}</b-button>
            <b-button variant="primary" @click="$refs['dummy_submit'].click()" :disabled="isLoading || (graterAmount === true) ">{{ __('save') }}
                <b-spinner v-if="isLoading" small label="Spinning"></b-spinner>
            </b-button>
        </div>
        <form ref="my-form" @submit.prevent="saveRecord">
            <div class="row">
                <div class="form-group col-12">
                    <label>{{ __('customer') }}</label>
                    <multiselect v-model="walletTransaction.customer"
                                 :options="customers"
                                 @close="checkAmount"
                                 :placeholder="__('select_and_search_customer')"
                                 label="name"
                                 track-by="name" required>
                        <template slot="singleLabel" slot-scope="props">
                            <span class="option__desc">
                                <span class="option__title">{{ props.option.name }}</span>
                            </span>
                        </template>
                        <template slot="option" slot-scope="props">
                            <div class="option__desc">
                                <span class="option__title">{{ props.option.name }}</span>,
                                <span class="option__small">{{ __('balance') }}:- {{ props.option.balance }}</span>
                            </div>
                        </template>
                    </multiselect>
                    <div class="customer-summary row g-2 mx-0 mt-2" v-if="walletTransaction.customer">
                        <div class="col-6">
                            <span class="d-block small text-muted">{{ __('name') }}</span><span class="font-weight-bold"> {{ walletTransaction.customer.name }}</span>
                        </div>
                        <div class="col-6">
                            <span class="d-block small text-muted">{{ __('mobile') }}</span><span class="font-weight-bold"> {{ walletTransaction.customer.mobile }}</span>
                        </div>
                        <div class="col-6">
                            <span class="d-block small text-muted">{{ __('id') }}</span><span class="font-weight-bold"> {{ walletTransaction.customer.id }}</span>
                        </div>
                        <div class="col-6">
                            <span class="d-block small text-muted">{{ __('balance') }}</span><span class="font-weight-bold"> {{ walletTransaction.customer.balance }}</span>
                        </div>
                    </div>
                </div>
                <div class="form-group col-12 col-sm-6">
                    <label for="type">{{ __('type') }}</label>
                    <input type="text" name="type" id="type" v-model="walletTransaction.type" class="form-control" value="Credit" readonly disabled />
                </div>
                <div class="form-group col-12 col-sm-6">
                    <label for="amount">{{ __('amount') }}</label>
                    <input type="number" name="amount" id="amount" v-model="walletTransaction.amount" v-on:keyup="checkAmount" required class="form-control" :placeholder="__('transfer_amount')" min="1" step="0.01"  @input="validateAmount">
                    <span class="text-danger" v-if="graterAmount === true">{{ __('you_can_not_enter_amount_greater_than_balance') }}</span>
                    <span v-if="validationError" class="error">{{ validationError }}</span>
                </div>
                <div class="form-group col-12 mb-0">
                    <label for="message">{{ __('message') }}</label>
                    <textarea name="message" id="message" v-model="walletTransaction.message" class="form-control" rows="3" :placeholder="__('message')" required ></textarea>
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
    props: ['record','customers'],
    components: {
        Multiselect
    },
    data : function(){
        return {
            isLoading: false,
            graterAmount:false,
            walletTransaction:{
                id: this.record ? this.record.id : null ,
                customer:null,
                type: "credit" ,
                amount: this.record ? this.record.amount : "" ,
                message: this.record ? this.record.message : "" ,
                validationError: null,
            },

        };
    },
    computed: {
        modal_title: function(){
            let title = this.id ? __('edit') : __('add') ;
            title += ' ' + __('wallet_transaction');
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
         validateAmount() {
            if (this.walletTransaction.amount < 1 ) {
                this.validationError = "Amount must be greater than 0";
            } else {
                this.validationError = null;
            }
        },
        
        checkAmount(){
            if((this.walletTransaction.type === 'debit') && (parseInt(this.walletTransaction.amount) > parseInt(this.walletTransaction.customer.balance))){
                this.graterAmount = true;
            }else{
                this.graterAmount = false;
            }
        },
        saveRecord: function(){
            let vm = this;
            this.isLoading = true;
            let formObject = this.walletTransaction;
            let formData = new FormData();
            for(let key in formObject){
                if (key === 'customer'){
                    formData.append(key, JSON.stringify(formObject[key]));
                }
                else{
                    formData.append(key, formObject[key]);
                }
            }
            let url = this.$apiUrl + '/wallet_transactions/save';
            if(this.walletTransaction.id){
                url = this.$apiUrl + '/wallet_transactions/update';
            }
            axios.post(url, formData).then(res => {
                let data = res.data;
                if (data.status === 1) {
                    this.$eventBus.$emit('walletTransactionsSaved', data.message);
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
                    this.showError(__('something_went_wrong'));
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

/* Selected customer details: compact 2x2 summary tile */
.customer-summary {
    padding: 10px 12px;
    background: var(--ui-surface-muted);
    border: 1px solid var(--ui-border);
    border-radius: var(--ui-radius);
    font-size: 13px;
}
</style>
