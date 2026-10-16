<template>
    <b-modal ref="my-modal" :title="modal_title" @hidden="$emit('modalClose')" size="xl" scrollable no-close-on-backdrop
        no-fade static>
        <div slot="modal-footer">
            <b-button variant="primary" @click="$refs['dummy_submit'].click()" :disabled="isLoading">{{ __('save') }}
                <b-spinner v-if="isLoading" small label="Spinning"></b-spinner>
            </b-button>
            <b-button variant="secondary" @click="hideModal">{{ __('cancel') }}</b-button>
        </div>

        <template #modal-header="{ close }">
            <h5 v-if="id" class="modal-title">{{ modal_title }} & {{ __('permission_access') }} : <strong> {{ printName
                    }} </strong>
            </h5>
            <h5 v-else class="modal-title">{{ modal_title }}</h5>
            <button type="button" aria-label="Close" class="close" @click="close()">×</button>
        </template>

        <form ref="my-form" @submit.prevent="saveRecord" class="p-2">
            <div class="row g-3">
                <div class="col-md-12">
                    <div class="form-group">
                        <label class="form-label fw-bold">{{ __('title') }} <span class="text-danger">*</span></label>
                        <input type="text" class="form-control" required v-model="name" :placeholder="__('title')">
                    </div>
                </div>

                <div class="col-md-12">
                    <div class="table-responsive border-0">
                        <table class="table table-bordered permission-table">
                            <tbody>
                                <tr v-for="(category, index) in categories" :key="index">
                                    <th class="bg-light-custom text-nowrap" style="width: 200px;"> {{
                                        formattedName(category.name) }} </th>
                                    <td>
                                        <div class="row g-2">
                                            <div v-for="permission in category.permissions" :key="permission.id"
                                                class="col-12 col-md-6 col-lg-4">
                                                <div class='form-check form-switch d-flex align-items-center gap-2 flex-nowrap'>
                                                    <input class='form-check-input flex-shrink-0 m-0' type='checkbox'
                                                        :id="'checkbox_' + permission.id" :value="permission.id"
                                                        v-model="user_permissions"
                                                        :checked="user_permissions.includes(permission.id)">
                                                    <label class="permission-label"
                                                        :for="'checkbox_' + permission.id"> {{
                                                            formattedName(permission.name) }} </label>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <button ref="dummy_submit" style="display:none;"></button>
        </form>
    </b-modal>
</template>

<script>
import axios from 'axios';

export default {
    props: ['record'],
    data: function () {
        return {
            isLoading: false,

            printName: this.record ? this.record.name : null,

            id: this.record ? this.record.id : null,
            name: this.record ? this.record.name : null,
            categories: [],
            user_permissions: [],
        };
    },
    computed: {
        modal_title: function () {
            let title = this.id ? __('edit') : __('add');
            title += ' ' + __('role');
            return title;
        }
    },
    created: function () {
        this.getRecords();
    },
    beforeDestroy() {
        // Clean up event listeners to prevent accumulation
        this.$eventBus.$off('roleSaved');
    },
    methods: {

        getRecords() {
            this.isLoading = true
            let url = this.$apiUrl + '/role/permissions';
            if (this.id) {
                url = this.$apiUrl + '/role/edit/' + this.record.id;
            }
            axios.get(url)
                .then((response) => {
                    this.isLoading = false
                    let data = response.data;
                    this.categories = data.data.categories
                    if (this.id) {
                        this.user_permissions = data.data.user_permissions
                    }
                });
        },
        showModal() {
            this.$refs['my-modal'].show()
        },
        hideModal() {
            this.$refs['my-modal'].hide()
        },

        saveRecord: function () {
            let vm = this;
            this.isLoading = true;

            let formData = new FormData();
            if (this.id) {
                formData.append('id', this.id);
            }
            formData.append('name', this.name);

            for (var index in this.user_permissions) {
                formData.append('permissions[]', this.user_permissions[index]);
            }

            let url = this.$apiUrl + '/role/save';
            if (this.id) {
                url = this.$apiUrl + '/role/update';
            }

            axios.post(url, formData).then(res => {
                let data = res.data;
                if (data.status === 1) {
                    this.isLoading = false;
                    this.$eventBus.$emit('roleSaved', data.message);
                    // Add small delay to ensure toast is shown before modal closes
                    setTimeout(() => {
                        this.hideModal();
                    }, 100);
                } else {
                    vm.showError(data.message);
                    vm.isLoading = false;
                }
            }).catch(error => {
                vm.isLoading = false;
                if (error.request.statusText) {
                    this.showError(error.request.statusText);
                } else if (error.message) {
                    this.showError(error.message);
                } else {
                    this.showError("Something went wrong!");
                }
            });
        },

        formattedName: function (name) {
            var newName = name.replace(/_/g, ' ');
            newName = newName.toLowerCase().replace(/(?<= )[^\s]|^./g, a => a.toUpperCase());
            // Try to get a translation using the original key (snake_case)
            const translated = __(name);
            if (translated && translated !== name) {
                return translated;
            }
            // Also try a title-case version of the formatted name
            const translatedFormatted = __(newName);
            if (translatedFormatted && translatedFormatted !== newName) {
                return translatedFormatted;
            }
            return newName;
        }
    },
    mounted() {
        this.showModal();
    }
}
</script>

<style scoped>
.switch {
    display: inline-block;
    height: 34px;
    position: relative;
    width: 60px;
}

.switch input {
    display: none;
}

.slider {
    background-color: #ccc;
    bottom: 0;
    cursor: pointer;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
    transition: .4s;
}

.slider:before {
    background-color: #fff;
    bottom: 4px;
    content: "";
    height: 26px;
    left: 4px;
    position: absolute;
    transition: .4s;
    width: 26px;
}

input:checked+.slider {
    background-color: #66bb6a;
}

input:checked+.slider:before {
    transform: translateX(26px);
}

.slider.round {
    border-radius: 34px;
}

.slider.round:before {
    border-radius: 50%;
}

.permission-table {
    margin-bottom: 0;
    border: 1px solid #dee2e6;
}

.bg-light-custom {
    background-color: #f8f9fa;
}

body.theme-dark .permission-table {
    border-color: #334155 !important;
}

body.theme-dark .permission-table th,
body.theme-dark .permission-table td {
    border-color: #334155 !important;
}

body.theme-dark .bg-light-custom {
    background-color: #1e293b !important;
    color: #f8fafc !important;
}

.form-check {
    display: flex !important;
    align-items: center !important;
    flex-wrap: nowrap;
    gap: 8px;
    padding-left: 0 !important;
    padding-right: 0 !important;
}

.form-check-input {
    flex-shrink: 0;
    margin-top: 0 !important;
    margin-left: 0 !important;
    margin-right: 0 !important;
    min-width: 2em;
}

.permission-label {
    word-break: break-word;
    white-space: normal;
    line-height: 1.3;
    flex: 1;
    min-width: 0;
    padding: 0;
}
</style>
