<template>
    <b-modal ref="json-edit-modal" :title="modal_title" @hidden="$emit('modalClose')" size="lg" scrollable no-close-on-backdrop no-fade static>
        <div slot="modal-footer" class="d-flex justify-content-end gap-2 w-100">
            <b-button variant="outline-secondary" @click="hideModal">{{ __('cancel') }}</b-button>
            <b-button variant="primary" @click="$refs['dummy_submit'].click()" :disabled="isLoading">{{ __('save') }}
                <b-spinner v-if="isLoading" small label="Spinning"></b-spinner>
            </b-button>
        </div>
        <form ref="my-form" @submit.prevent="saveRecord">
            <div class="row">
                <div class="form-group col-md-12 mb-0">
                    <div class="json-editor" :class="{ 'json-editor--invalid': error }">
                    <div class="json-editor__head">
                        <label for="json_data" class="mb-0">{{ system_type ? system_type.name : '' }} <span class="text-danger">*</span></label>
                        <span v-if="!error && json_data" class="badge bg-success">
                            <i class="fa fa-check-circle"></i> {{ __('valid_json_format') }}
                        </span>
                        <span v-else-if="error" class="badge bg-danger">
                            <i class="fa fa-exclamation-circle"></i> {{ __('invalid_json_format') }}
                        </span>
                    </div>
                    <textarea 
                        class="form-control json-editor__input" 
                        rows="20"
                        spellcheck="false"
                        v-model="json_data"
                        name="json_data" 
                        id="json_data"
                        :class="{ 'is-invalid': error }"
                        @input="validateJson"
                        placeholder='{"key": "value"}'>
                    </textarea>
                    </div>
                    <small v-if="error" class="text-danger d-block mt-2">{{ error }}</small>
                </div>
            </div>
            <button ref="dummy_submit" class="d-none"></button>
        </form>
    </b-modal>
</template>

<script>
import axios from 'axios';

export default {
    props: ['record', 'system_type'],
    data: function () {
        let initialJsonData = "{}";
        if (this.record && this.record.json_data) {
            try {
                const parsed = typeof this.record.json_data === 'string' 
                    ? JSON.parse(this.record.json_data) 
                    : this.record.json_data;
                initialJsonData = JSON.stringify(parsed, null, 2);
            } catch (e) {
                initialJsonData = this.record.json_data;
            }
        }
        
        return {
            isLoading: false,
            id: this.record ? this.record.id : null,
            system_type_id: this.record ? this.record.system_type : (this.system_type ? this.system_type.id : null),
            supported_language_id: this.record ? this.record.supported_language_id : null,
            json_data: initialJsonData,
            error: null,
        };
    },
    computed: {
        modal_title: function () {
            let title = __('edit_json_data');
            if (this.system_type) {
                title += ' - ' + this.system_type.name;
            }
            return title;
        },
    },
    methods: {
        showModal() {
            this.$refs['json-edit-modal'].show()
        },
        hideModal() {
            this.$refs['json-edit-modal'].hide()
        },
        validateJson() {
            if (!this.json_data || this.json_data.trim() === '') {
                this.error = null;
                return;
            }
            
            try {
                JSON.parse(this.json_data);
                this.error = null;
            } catch (e) {
                this.error = __('invalid_json_format') + ': ' + e.message;
            }
        },
        saveRecord: function () {
            if (!this.json_data || this.json_data.trim() === '') {
                this.showError(__('json_data_is_required'));
                return;
            }

            try {
                JSON.parse(this.json_data);
            } catch (e) {
                this.showError(__('invalid_json_format') + ': ' + e.message);
                return;
            }

            this.isLoading = true;
            let formData = new FormData();
            
            if (this.id) {
                formData.append('id', this.id);
            }
            
            formData.append('system_type', this.system_type_id);
            formData.append('supported_language', this.supported_language_id);
            try {
                const parsedJson = JSON.parse(this.json_data);
                formData.append('json_data', JSON.stringify(parsedJson));
            } catch (e) {
                formData.append('json_data', this.json_data);
            }
            formData.append('display_name', this.record ? this.record.display_name : '');
            formData.append('is_default', this.record ? this.record.is_default : 0);
            formData.append('status', this.record ? this.record.status : 1);

            let url = this.$apiUrl + '/languages/update_json';
            axios.post(url, formData).then(res => {
                let data = res.data;
                if (data.status === 1) {
                    this.$eventBus.$emit('recordSaved', data.message);
                    this.hideModal();
                    this.$emit('jsonSaved');
                    this.$emit('modalClose');
                } else {
                    this.showError(data.message);
                    this.isLoading = false;
                }
            }).catch(error => {
                this.isLoading = false;
                if (error?.request?.statusText) {
                    this.showError(error.request.statusText);
                }else if (error.message) {
                    this.showError(error.message);
                } else {
                    this.showError(__("something_went_wrong"));
                }
            });
        }
    },
    mounted() {
        this.showModal();
    }
}
</script>

<style scoped>
.image_preview {
    margin-top: 5px;
}

.json-editor {
    border: 1px solid var(--ui-border-strong);
    border-radius: var(--ui-radius-lg);
    background: var(--ui-surface);
    overflow: hidden;
}

.json-editor--invalid {
    border-color: var(--theme-error-500);
}

.json-editor__head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 8px;
    padding: 10px 14px;
    background: var(--ui-surface-muted);
    border-bottom: 1px solid var(--ui-border);
}

.json-editor__head label {
    font-size: 13px;
    font-weight: 600;
    color: var(--ui-heading);
}

.json-editor__input,
.json-editor__input:focus,
.json-editor__input.is-invalid {
    border: 0;
    border-radius: 0;
    box-shadow: none;
    font-size: 13px;
    line-height: 1.6;
    min-height: 360px;
    resize: vertical;
    background: var(--ui-surface);
    color: var(--ui-text);
}
</style>

