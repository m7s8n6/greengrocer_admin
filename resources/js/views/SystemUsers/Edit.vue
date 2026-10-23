<template>
    <b-modal ref="my-modal" :title="modal_title" @hidden="$emit('modalClose')" size="lg" no-fade static>
        <div slot="modal-footer" class="d-flex justify-content-end gap-2 w-100">
            <b-button variant="outline-secondary" @click="hideModal">{{ __('cancel') }}</b-button>
            <b-button variant="primary" @click="$refs['dummy_submit'].click()" :disabled="isLoading">{{ __('save') }}
                <b-spinner v-if="isLoading" small label="Spinning"></b-spinner>
            </b-button>
        </div>
        <form ref="my-form" @submit.prevent="saveRecord">
            <div class="row">
                <div class="form-group col-12 col-md-6">
                    <label for='username'>{{ __('username') }} <span class="text-danger text-xs">*</span></label>
                    <input type='text' id='username' v-model="system_user.username" class='form-control' :placeholder="__('username')" required />
                </div>
                <div class="form-group col-12 col-md-6">
                    <label for='email'>{{ __('email') }} <span class="text-danger text-xs">*</span></label>
                    <input type='email' id='email' v-model="system_user.email" class='form-control' :placeholder="__('email')" required />
                </div>

                <div class="form-group col-12 col-md-6">
                    <label for='role'>{{ __('role') }} <span class="text-danger text-xs">*</span></label>
                    <select class="form-control form-select" id="role" v-model="system_user.role_id">
                        <option value="">{{ __('select_user_role') }}</option>
                        <option v-for="role in roles" :value="role.id" v-if="role.name !== 'Super Admin'">{{role.name}}</option>
                    </select>
                </div>

                <div class="form-group col-12 col-md-6">
                    <label for='password'>{{ __('password') }} <span v-if="!system_user.id" class="text-danger text-xs">*</span></label>
                    <div class="input-group">
                        <input :type="showPassword ? 'text' : 'password'" id='password' v-model="system_user.password" class='form-control' :placeholder="__('password')" :required="!system_user.id ? true : false" />
                        <button type="button" v-on:click="showPassword = !showPassword" class="btn btn-outline-secondary pw-toggle">
                            <img v-if="showPassword" :src="$baseUrl + '/images/icons/show_password.svg'" class="pw-eye-icon" />
                            <img v-else :src="$baseUrl + '/images/icons/hide_password.svg'" class="pw-eye-icon" />
                        </button>
                    </div>
                </div>
                <div class="form-group col-12 col-md-6">
                    <label for='confirm_password'>{{ __('confirm_password') }} <span v-if="!system_user.id" class="text-danger text-xs">*</span></label>
                    <div class="input-group">
                        <input :type="showConfirmPassword ? 'text' : 'password'" id='confirm_password' v-model="system_user.confirm_password" class='form-control' :placeholder="__('confirm_password')" :required="!system_user.id ? true : false" />
                        <button type="button" v-on:click="showConfirmPassword = !showConfirmPassword" class="btn btn-outline-secondary pw-toggle">
                            <img v-if="showConfirmPassword" :src="$baseUrl + '/images/icons/show_password.svg'" class="pw-eye-icon" />
                            <img v-else :src="$baseUrl + '/images/icons/hide_password.svg'" class="pw-eye-icon" />
                        </button>
                    </div>
                </div>

                <div class="col-12" v-if="system_user.id">
                    <small class='text_hint d-block'>
                        <i class="fa fa-info-circle"></i> {{ __('note') }} : {{ __('leave_it_blank_if_you_dont_want_to_update_it') }}
                    </small>
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
    props: ['record','roles'],
    components: {
        Multiselect
    },
    created: function() {
    },
    beforeDestroy() {
        // Clean up event listeners to prevent accumulation
        this.$eventBus.$off('systemUserSaved');
    },
    data : function(){
        return {
            isLoading: false,
            showPassword: false,
            showConfirmPassword:false,
            system_user : {
                id: this.record ? this.record.id : null,
                username: this.record ? this.record.username : "",
                email: this.record ? this.record.email : "",
                role_id: this.record ? this.record.role.id : "",
                password: "",
                confirm_password: "",
            }

        };
    },
    computed: {
        modal_title: function(){
            let title = this.system_user.id ? __('edit') : __('create') ;
            title += ' ' + __('system_users');
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
        saveRecord: function(){
            let vm = this;
            this.isLoading = true;

            let url = this.$apiUrl + '/system_users/save'; 
            if(this.system_user.id){
                url = this.$apiUrl + '/system_users/update';
            }
            axios.post(url, this.system_user).then(res => {
                let data = res.data;
                if (data.status === 1) {
                    vm.isLoading = false;
                    vm.$eventBus.$emit('systemUserSaved', data.message);
                    // Add small delay to ensure toast is shown before modal closes
                    setTimeout(() => {
                        vm.hideModal();
                    }, 100);
                }else{
                    vm.showMessage('error', data.message);
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
@import "../../../../node_modules/vue-multiselect/dist/vue-multiselect.min.css";
.text_hint{
    margin-bottom: 4px;
    font-size: 12px;
    color: var(--ui-text-muted);
}

.pw-toggle {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0 12px;
}

.pw-eye-icon {
    width: 18px;
    height: 18px;
    opacity: 0.7;
}

body.theme-dark .pw-eye-icon {
    filter: invert(1);
}
</style>
