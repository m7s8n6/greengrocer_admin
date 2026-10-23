<template>
    <div>
        <div class="page-heading">
            <div class="page-title mb-2">
                <div class="d-flex justify-content-between align-items-center">
                    <h3 class="modern-page-title mb-0">{{ __('bulk_upload') }}</h3>
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb mb-0">
                            <li class="breadcrumb-item" v-if="isSellerRoute">
                                <router-link to="/seller/dashboard" class="text-muted">{{ __('dashboard')
                                    }}</router-link>
                            </li>
                            <li class="breadcrumb-item" v-else>
                                <router-link to="/dashboard" class="text-muted">{{ __('dashboard') }}</router-link>
                            </li>
                            <li class="breadcrumb-item active text-primary" aria-current="page">{{ __('bulk_upload') }}
                            </li>
                        </ol>
                    </nav>
                </div>
            </div>

            <section class="section bulk-page">
                <div class="figma-main-section-card bulk-card mb-4">
                    <div class="card-header">
                        <h4 class="card-title mb-0">{{ __('product_bulk_upload_form') }}</h4>
                    </div>
                    <div class="card-body p-3 p-md-4">
                        <div class="alert alert-info mb-4">
                            <div class="d-flex flex-column gap-2">
                                <p class="mb-0 fw-bold">{{
                                    __('always_download_and_use_new_sample_file_if_you_did_updated_admin_panel_version')
                                    }}</p>
                                <p class="mb-0">{{ __('read_and_follow_instructions_carefully_before_proceed') }}</p>
                                <p class="mb-0">{{
                                    __('before_uploading_the_file_please_check_all_the_data_fields_are_correct') }}</p>
                            </div>
                        </div>
                        <div v-if="rowErrors.length">
                            <div>
                                <div class="alert alert-danger" ref="rowErrorsAlert">
                                    <p class="mb-2">{{
                                        __('validation_failed_for_some_rows_please_review_and_fix_the_following') }}</p>
                                    <div class="table-responsive">
                                        <table class="table table-sm table-bordered">
                                            <thead>
                                                <tr>
                                                    <th class="text-dark" style="width: 80px;">{{ __('row') }}</th>
                                                    <th class="text-dark">{{ __('errors') }}</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="item in rowErrors" :key="'row-' + item.row">
                                                    <td class="text-dark">{{ item.row }}</td>
                                                    <td>
                                                        <ul class="mb-0 ps-3">
                                                            <li v-for="err in item.errors" :key="err"
                                                                class="text-dark">{{ err }}</li>
                                                        </ul>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- form start -->
                            <form method="post" ref="my-form" @submit.prevent="saveRecord"
                                enctype="multipart/form-data">
                                <div>
                                    <div class="form-group mb-0">
                                        <label for="upload_file">{{ __('upload_file') }} {{ __('excel_file')
                                        }}</label>
                                        <p class="text-muted small mb-2">
                                            {{ __('supported_formats') }}: XLSX, XLS
                                        </p>
                                        <span v-if="fileError" class="error">{{ fileError }}</span>
                                        <input type="file" name="upload_file" id="upload_file" ref="file_csv"
                                            class="file-input" accept=".xlsx,.xls" @change="handleFileUpload" />
                                        <div class="file-input-div bg-gray-100" @click="triggerFileClick"
                                            @drop="dropFile" @dragover="$dragoverFile" @dragleave="$dragleaveFile">
                                            <template v-if="file && file.name">
                                                <label>{{ __('selected_file_name') }} {{ file.name }}</label>
                                            </template>
                                            <template v-else>
                                                <label><i class="fa fa-cloud-upload-alt fa-2x"></i></label>
                                                <label>{{ __('drop_files_here_or_click_to_upload') }}</label>
                                            </template>
                                        </div>
                                    </div>
                                </div>
                                <div class="bulk-form-actions">
                                    <div class="d-flex flex-wrap align-items-center gap-2">
                                        <button type="button" class='btn btn-sm btn-outline-primary d-inline-flex align-items-center gap-2' @click="downloadProductDataExcel">
                                            <em class='fa fa-download'></em>
                                            <span>{{ __('download_sample_file') }}</span>
                                        </button>
                                        <a :href="instructionsFileurl" class='btn btn-sm btn-outline-primary d-inline-flex align-items-center gap-2' download>
                                            <em class='fa fa-download'></em>
                                            <span>{{ __('download_instructions') }}</span>
                                        </a>
                                    </div>
                                    <div class="d-flex flex-wrap gap-2">
                                        <button type="button" class="btn btn-outline-secondary" @click="clearForm">
                                            <i class="fa fa-undo" aria-hidden="true"></i> {{ __('clear') }}
                                        </button>
                                        <button type="submit" class="btn btn-primary" id="submit_btn" name="btnAdd"
                                            :disabled="isLoading">
                                            <i class="fa fa-upload" v-if="!isLoading"></i> {{ __('upload') }}
                                            <b-spinner v-if="isLoading" small label="Spinning"></b-spinner>
                                        </button>
                                    </div>
                                </div>
                            </form>
                        <!-- form end -->
                    </div>
                </div>

                <div class="figma-main-section-card bulk-card mb-4">
                    <div class="card-header">
                        <h4 class="card-title mb-0">{{ __('variant_combo_generator') || 'Variant Combo Generator' }}</h4>
                    </div>
                    <div class="card-body p-3 p-md-4">
                        <p class="text-muted small mb-3">{{ __('variant_combo_generator_hint') ||
                            'Pick a category, choose attribute values, generate every combo, then copy the Attribute Value IDs column straight into your sheet.' }}</p>

                        <div class="form-group mb-3">
                            <label class="form-label">{{ __('category') }}</label>
                            <select class="form-control form-select" v-model="comboCategoryId"
                                @change="loadComboAttributes" v-html="comboCategoryOptions"></select>
                        </div>

                        <template v-if="comboAttributes.length">
                            <div class="form-group mb-3" v-for="attribute in comboAttributes" :key="attribute.id">
                                <label class="form-label fw-bold">{{ attribute.name }}</label>
                                <div class="d-flex flex-wrap gap-2">
                                    <label v-for="value in attribute.values" :key="value.id"
                                        class="btn btn-sm"
                                        :class="isComboValueChecked(attribute.id, value.id) ? 'btn-primary' : 'btn-outline-primary'">
                                        <input type="checkbox" class="d-none"
                                            :checked="isComboValueChecked(attribute.id, value.id)"
                                            @change="toggleComboValue(attribute.id, value.id)">
                                        {{ value.value }}
                                    </label>
                                </div>
                            </div>

                            <div class="alert alert-info d-flex justify-content-between align-items-center flex-wrap gap-2">
                                <span>{{ __('total_variants_to_be_generated') || 'Total variants to be generated' }}: <strong>{{ comboRows.length }}</strong></span>
                                <button type="button" class="btn btn-sm btn-primary" @click="selectAllComboValues">
                                    <i class="fa fa-bolt"></i> {{ __('generate_all_variants') || 'Generate All Variants' }}
                                </button>
                            </div>
                        </template>
                        <p class="text-muted" v-else-if="comboCategoryId && comboCategoryId !== '0'">{{ __('no_attributes_assigned_to_this_category') || 'No attributes are assigned to this category.' }}</p>

                        <div v-if="comboRows.length" class="mt-3">
                            <div class="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-2">
                                <h6 class="mb-0 bulk-subtitle">{{ __('generated_combos') || 'Generated Combos' }}</h6>
                                <button type="button" class="btn btn-sm btn-outline-primary" @click="copyAllCombos">
                                    <i class="bi bi-files"></i>
                                    {{ __('copy_all_attribute_value_ids') || 'Copy All (one per line)' }}
                                </button>
                            </div>
                            <div class="table-responsive">
                                <table class="table table-sm figma-order-table mb-0 bulk-combo-table">
                                    <thead>
                                        <tr>
                                            <th>{{ __('combo') || 'Combo' }}</th>
                                            <th class="text-center" style="width: 160px;">{{ __('attribute_value_ids') || 'Attribute Value IDs' }}</th>
                                            <th class="text-center" style="width: 90px;">{{ __('action') }}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr class="figma-tr" v-for="row in comboRows" :key="row.ids">
                                            <td>{{ row.label }}</td>
                                            <td class="text-center"><code>{{ row.ids }}</code></td>
                                            <td class="text-center">
                                                <button type="button" class="figma-action-btn bulk-copy-btn"
                                                    @click="copyText(row.ids)">
                                                    <i class="bi bi-files"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
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

            instructionsFileurl: this.$baseUrl + '/sample-file/products.txt',
            file: null,
            fileError: null,
            rowErrors: [],

            comboCategoryOptions: '',
            comboCategoryId: '0', // matches the backend's own placeholder option value (see loadComboCategories)
            comboAttributes: [],
            comboSelectedValues: {}, // { [attributeId]: Set of valueIds }
        }
    },
    computed: {
        isSellerRoute() {
            // Use this.$route to access the current route
            return this.$route.path.startsWith('/seller/');
        },
        // Live - recomputes on every checkbox click, same as the Variant Matrix in Add/Edit Product.
        // Only attributes with at least one checked value participate in the combo (mirrors
        // EditProduct.vue's selectedAttributeCombos) - an attribute nobody touched yet is just
        // left out, it does NOT block every other attribute's combos down to zero. A category
        // can have many loosely-related attributes assigned; requiring all of them to be picked
        // would make this unusable.
        comboRows() {
            const activeAttributes = this.comboAttributes
                .map(attribute => ({
                    attribute,
                    values: attribute.values.filter(v => this.isComboValueChecked(attribute.id, v.id)),
                }))
                .filter(entry => entry.values.length > 0);

            if (!activeAttributes.length) return [];

            let rows = [{ ids: [], labels: [] }];
            for (const entry of activeAttributes) {
                const next = [];
                for (const row of rows) {
                    for (const value of entry.values) {
                        next.push({
                            ids: [...row.ids, value.id],
                            labels: [...row.labels, entry.attribute.name + '=' + value.value],
                        });
                    }
                }
                rows = next;
            }

            return rows.map(row => ({
                ids: row.ids.join(','),
                label: row.labels.join(' / '),
            }));
        },
    },
    created: function () {
        this.loadComboCategories();
    },
    mounted() {

    },
    methods: {
        loadComboCategories() {
            // /categories/options already includes its own "Select Category" placeholder option.
            axios.get(this.$apiUrl + '/categories/options')
                .then((response) => {
                    const data = response.data;
                    if (typeof data === 'string') {
                        this.comboCategoryOptions = data;
                    } else if (data && typeof data.data === 'string') {
                        this.comboCategoryOptions = data.data;
                    } else {
                        this.comboCategoryOptions = '';
                    }
                })
                .catch(() => {
                    this.comboCategoryOptions = '';
                });
        },
        loadComboAttributes() {
            this.comboAttributes = [];
            this.comboSelectedValues = {};
            if (!this.comboCategoryId || this.comboCategoryId === '0') return;

            axios.get(this.$apiUrl + '/products/attributes/get', {
                params: { category_id: this.comboCategoryId }
            }).then((response) => {
                this.comboAttributes = response.data.data || [];
                const selected = {};
                this.comboAttributes.forEach(attribute => {
                    selected[attribute.id] = new Set();
                });
                this.comboSelectedValues = selected;
            }).catch(() => {
                this.comboAttributes = [];
            });
        },
        isComboValueChecked(attributeId, valueId) {
            const selected = this.comboSelectedValues[attributeId];
            return !!selected && selected.has(valueId);
        },
        toggleComboValue(attributeId, valueId) {
            const selected = this.comboSelectedValues[attributeId];
            if (!selected) return;
            if (selected.has(valueId)) {
                selected.delete(valueId);
            } else {
                selected.add(valueId);
            }
            // Sets aren't reactive - force the computed/template to re-evaluate.
            this.comboSelectedValues = { ...this.comboSelectedValues };
        },
        // Checks every value of every attribute, so the combo table (a live computed property)
        // ends up with the full cross-product - same shortcut as Add/Edit Product's own
        // "Generate All Variants" button.
        selectAllComboValues() {
            const selected = {};
            this.comboAttributes.forEach(attribute => {
                selected[attribute.id] = new Set(attribute.values.map(v => v.id));
            });
            this.comboSelectedValues = selected;
        },
        copyText(text) {
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(text);
            }
            this.showMessage('success', __('copied_to_clipboard') || 'Copied to clipboard');
        },
        copyAllCombos() {
            this.copyText(this.comboRows.map(row => row.ids).join('\n'));
        },
        triggerFileClick() {
            const ref = this.$refs.file_csv;
            const input = Array.isArray(ref) ? ref[0] : ref;
            if (input && typeof input.click === 'function') {
                input.click();
            }
        },
        dropFile(event) {
            event.preventDefault();
            const ref = this.$refs.file_csv;
            const input = Array.isArray(ref) ? ref[0] : ref;
            if (!input) return;
            input.files = event.dataTransfer.files;
            this.handleFileUpload();
            event.currentTarget.classList.add('bg-gray-100');
            event.currentTarget.classList.remove('bg-green-300');
        },
        handleFileUpload() {
            const ref = this.$refs.file_csv;
            const input = Array.isArray(ref) ? ref[0] : ref;
            const file = input && input.files ? input.files[0] : null;
            if (!file) return;
            this.fileError = null;
            const validExtensions = ['.xlsx', '.xls'];
            const name = file.name ? file.name.toLowerCase() : '';
            if (!validExtensions.some(ext => name.endsWith(ext))) {
                this.fileError = this.__('invalid_excel_file_type');
                return;
            }
            this.file = file;
            this.rowErrors = [];
        },
        clearForm() {
            const ref = this.$refs.file_csv;
            const input = Array.isArray(ref) ? ref[0] : ref;
            if (input) input.value = null;
            this.file = null;
            this.fileError = null;
            this.rowErrors = [];
        },
        downloadProductDataExcel() {
            axios({
                url: this.$apiUrl + '/products/download_sample_file_excel',
                method: 'get',
                responseType: 'blob',
            }).then((response) => {
                const url = window.URL.createObjectURL(new Blob([response.data], {
                    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                }));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'products_sample.xlsx');
                document.body.appendChild(link);
                link.click();
                link.parentNode.removeChild(link);
                window.URL.revokeObjectURL(url);
            }).catch(error => {
                if (error.request && error.request.statusText) {
                    this.showError(error.request.statusText);
                } else if (error.message) {
                    this.showError(error.message);
                } else {
                    this.showError("Something went wrong!");
                }
            });
        },
        saveRecord: function () {
            let vm = this;
            this.isLoading = true;
            let formData = new FormData();
            formData.append('file', this.file);
            let url = this.$apiUrl + '/products/bulk_upload';
            axios.post(url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(res => {
                let data = res.data;
                if (data.status === 1) {
                    this.showMessage("success", data.message);
                    this.$refs.file_csv.value = null;
                    this.file = null;
                    this.rowErrors = [];
                    vm.isLoading = false;
                } else {
                    if (Array.isArray(data.data) && data.data.length) {
                        vm.showError(data.message || 'Validation failed for some rows.');
                        vm.rowErrors = data.data;
                    } else {
                        vm.rowErrors = [{
                            row: '—',
                            errors: [data.message || 'An unexpected error occurred. Please check your data and try again.']
                        }];
                    }
                    vm.$nextTick(() => {
                        if (vm.$refs.rowErrorsAlert && typeof vm.$refs.rowErrorsAlert.scrollIntoView === 'function') {
                            vm.$refs.rowErrorsAlert.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        } else {
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                        }
                    });
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
        }
    }
};
</script>

<style scoped>
.bulk-card > .card-header {
    padding: 14px 20px !important;
    border-bottom: 1px solid var(--ui-border);
    background: transparent;
}

.bulk-card > .card-header .card-title {
    font-size: 16px;
    font-weight: 700;
    color: var(--ui-heading);
}

.bulk-subtitle {
    font-size: 14px;
    font-weight: 700;
    color: var(--ui-heading);
}

.bulk-form-actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 12px;
    margin-top: 20px;
    padding-top: 16px;
    border-top: 1px solid var(--ui-border);
}

.bulk-form-actions .btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
}

/* !important: legacy global .figma-action-btn forces 40px with !important */
.bulk-copy-btn {
    width: 32px !important;
    height: 32px !important;
    padding: 0 !important;
    font-size: 14px;
}

.bulk-combo-table code {
    font-size: 12px;
    color: var(--theme-primary-700);
    background: var(--ui-primary-soft);
    padding: 2px 6px;
    border-radius: var(--ui-radius-sm);
}

@media (max-width: 575.98px) {
    .bulk-form-actions > .d-flex {
        width: 100%;
    }

    .bulk-form-actions > .d-flex > .btn {
        flex: 1 1 auto;
        justify-content: center;
    }
}
</style>
