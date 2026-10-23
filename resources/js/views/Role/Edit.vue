<template>
    <b-modal ref="my-modal" :title="modal_title" @hidden="$emit('modalClose')" size="xl" scrollable no-close-on-backdrop
        no-fade static>
        <div slot="modal-footer" class="d-flex align-items-center justify-content-between flex-wrap gap-2 w-100">
            <span class="text-muted small">{{ user_permissions.length }} {{ __('selected') }}</span>
            <div class="d-flex gap-2 ms-auto">
                <b-button variant="outline-secondary" @click="hideModal">{{ __('cancel') }}</b-button>
                <b-button variant="primary" @click="$refs['dummy_submit'].click()" :disabled="isLoading">{{ __('save') }}
                    <b-spinner v-if="isLoading" small label="Spinning"></b-spinner>
                </b-button>
            </div>
        </div>

        <template #modal-header="{ close }">
            <h5 v-if="id" class="modal-title">{{ modal_title }} & {{ __('permission_access') }} : <strong> {{ printName
                    }} </strong>
            </h5>
            <h5 v-else class="modal-title">{{ modal_title }}</h5>
            <button type="button" aria-label="Close" class="close" @click="close()">×</button>
        </template>

        <form ref="my-form" @submit.prevent="saveRecord" class="role-form">
            <div class="row">
                <div class="col-12 col-md-6">
                    <div class="form-group">
                        <label class="form-label">{{ __('title') }} <span class="text-danger">*</span></label>
                        <input type="text" class="form-control" required v-model="name" :placeholder="__('title')">
                    </div>
                </div>
            </div>

            <div class="perm-section-head">
                <h6 class="mb-0">{{ __('permission_access') }}</h6>
                <span class="figma-status-pill bg-primary">{{ user_permissions.length }} {{ __('selected') }}</span>
            </div>

            <div class="row g-3">
                <div v-for="(category, index) in categories" :key="index" class="col-12 col-lg-6">
                    <div class="perm-card h-100">
                        <div class="perm-card__head">
                            <span class="perm-card__title">{{ formattedName(category.name) }}</span>
                            <span class="perm-card__count">{{ category.permissions.filter(p => user_permissions.includes(p.id)).length }}/{{ category.permissions.length }}</span>
                        </div>
                        <div class="perm-card__body">
                            <div class="row g-2">
                                <div v-for="permission in category.permissions" :key="permission.id"
                                    class="col-12 col-sm-6">
                                    <div class='form-check perm-check'>
                                        <input class='form-check-input' type='checkbox'
                                            :id="'checkbox_' + permission.id" :value="permission.id"
                                            v-model="user_permissions"
                                            :checked="user_permissions.includes(permission.id)">
                                        <label class="permission-label"
                                            :for="'checkbox_' + permission.id"> {{
                                                formattedName(permission.name) }} </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <button ref="dummy_submit" class="d-none"></button>
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
    background-color: var(--theme-neutral-300);
    bottom: 0;
    cursor: pointer;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
    transition: .4s;
}

.slider:before {
    background-color: var(--ui-surface);
    bottom: 4px;
    content: "";
    height: 26px;
    left: 4px;
    position: absolute;
    transition: .4s;
    width: 26px;
}

input:checked+.slider {
    background-color: var(--theme-success-500);
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

.role-form {
    padding: 4px;
}

.perm-section-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    margin: 4px 0 12px;
    padding-bottom: 10px;
    border-bottom: 1px solid var(--ui-border);
}

.perm-section-head h6 {
    font-size: 15px;
    font-weight: 700;
    color: var(--ui-heading);
}

.perm-card {
    background: var(--ui-surface);
    border: 1px solid var(--ui-border);
    border-radius: var(--ui-radius-lg);
    overflow: hidden;
}

.perm-card__head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    padding: 10px 14px;
    background: var(--ui-surface-muted);
    border-bottom: 1px solid var(--ui-border);
}

.perm-card__title {
    font-size: 13px;
    font-weight: 700;
    color: var(--ui-heading);
}

.perm-card__count {
    flex-shrink: 0;
    font-size: 12px;
    font-weight: 600;
    color: var(--ui-text-muted);
}

.perm-card__body {
    padding: 12px 14px;
}

.form-check.perm-check {
    margin: 0;
    padding: 6px 8px !important;
    border-radius: var(--ui-radius-sm);
}

.perm-check:hover {
    background: var(--ui-primary-soft);
}

.perm-check .permission-label {
    font-size: 13px;
    color: var(--ui-text);
    cursor: pointer;
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
