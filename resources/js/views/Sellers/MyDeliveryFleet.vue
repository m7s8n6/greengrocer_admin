<template>
    <div>
        <div class="page-heading">
            <div class="page-title mb-2">
                <div class="d-flex justify-content-between align-items-center flex-wrap gap-2">
                    <h3 class="modern-page-title mb-0">My Delivery Boys</h3>
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb mb-0">
                            <li class="breadcrumb-item"><router-link to="/seller/dashboard" class="text-muted">{{ __('dashboard') }}</router-link></li>
                            <li class="breadcrumb-item active text-primary" aria-current="page">My Delivery Boys</li>
                        </ol>
                    </nav>
                </div>
            </div>

            <section class="section">
                <div v-if="statusLoading" class="text-center text-muted my-4">
                    <b-spinner class="align-middle"></b-spinner>
                    <strong>{{ __('loading') }}...</strong>
                </div>

                <div v-else-if="deliveryBoySource !== 'own'" class="alert alert-info d-flex align-items-start gap-2">
                    <i class="fa fa-info-circle mt-1"></i>
                    <div>
                    Your orders currently use <strong>admin's shared delivery boys</strong>. This is
                    set by the admin, not by you - contact them if you'd like to switch to managing
                    your own delivery boys instead.
                    </div>
                </div>

                <template v-else>
                    <div class="figma-main-section-card">
                        <div class="card-body p-0">
                            <div class="d-flex justify-content-end align-items-center flex-wrap gap-2 figma-action-bar-row">
                                <div class="d-flex gap-2 flex-wrap">
                                    <div class="view-toggle" role="group" :aria-label="__('view')">
                                        <button type="button" class="view-toggle-btn" :class="{ active: viewMode === 'grid' }" @click="setViewMode('grid')" v-b-tooltip.hover :title="__('grid_view')"><i class="bi bi-grid-3x3-gap-fill"></i></button>
                                        <button type="button" class="view-toggle-btn" :class="{ active: viewMode === 'list' }" @click="setViewMode('list')" v-b-tooltip.hover :title="__('list_view')"><i class="bi bi-list-ul"></i></button>
                                    </div>
                                    <button class="btn btn-figma-filter d-flex align-items-center gap-2" @click="getRecords()" v-b-tooltip.hover :title="__('refresh')">
                                        <i class="fa fa-refresh"></i>
                                        <span>{{ __('refresh') }}</span>
                                    </button>
                                    <button class="btn btn-figma-filter d-flex align-items-center gap-2" @click="openAddModal">
                                        <i class="fa fa-plus"></i>
                                        <span>Add Delivery Boy</span>
                                    </button>
                                </div>
                            </div>

                            <!-- Grid view -->
                            <div v-if="viewMode === 'grid'">
                                <div v-if="isLoading" class="item-grid-state">
                                    <i class="bi bi-hourglass-split"></i>{{ __('loading') }}...
                                </div>
                                <div v-else-if="!deliveryBoys.length" class="item-grid-state">
                                    <i class="bi bi-inbox"></i>{{ __('no_records_to_show') }}
                                </div>
                                <div v-else class="item-grid item-grid--single-xs">
                                    <div v-for="item in pagedItems(deliveryBoys)" :key="item.id" class="item-card">
                                        <div class="item-card-media item-card-media--avatar">
                                            <span class="item-card-avatar">{{ initial(item.name) }}</span>
                                        </div>
                                        <div class="item-card-body">
                                            <div class="item-card-title">{{ item.name }}</div>
                                            <div class="item-card-meta"><i class="bi bi-telephone me-1"></i>{{ item.mobile }}</div>
                                            <div class="item-card-meta" v-if="item.email"><i class="bi bi-envelope me-1"></i>{{ item.email }}</div>
                                            <div class="item-card-meta"><i class="bi bi-geo-alt me-1"></i>{{ cityNames(item) || '-' }}</div>
                                            <div class="item-card-stats justify-content-center">
                                                <span class="item-card-chip">#{{ item.id }}</span>
                                                <span v-if="item.is_online" class="figma-status-pill bg-success">On Duty</span>
                                                <span v-else class="figma-status-pill badge bg-secondary">Off Duty</span>
                                            </div>
                                        </div>
                                        <div class="item-card-footer">
                                            <div class="form-check form-switch mb-0" v-b-tooltip.hover :title="__('status')">
                                                <input class="form-check-input status-switch" type="checkbox"
                                                    :checked="item.status === 1"
                                                    @change="toggleStatus(item, $event.target.checked)">
                                            </div>
                                            <div class="item-card-actions">
                                                <button class="figma-action-btn" @click="openEditModal(item)" v-b-tooltip.hover :title="__('edit')">
                                                    <base-icon name="edit icon" hoverName="edit Hover" width="24" height="24" />
                                                </button>
                                                <button class="figma-action-btn figma-delete-btn" @click="deleteRecord(item)" v-b-tooltip.hover :title="__('delete')">
                                                    <base-icon name="Type=Default" hoverName="Type=Hover" width="24" height="24" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div v-else class="table-responsive mb-0">
                                <b-table
                                    :items="deliveryBoys"
                                    :fields="fields"
                                    :busy="isLoading"
                                    stacked="md"
                                    show-empty
                                    small
                                    class="figma-table mb-0"
                                    :tbody-tr-class="() => 'figma-tr align-middle'">
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

                                    <template #cell(cities)="row">
                                        {{ cityNames(row.item) || '-' }}
                                    </template>

                                    <template #cell(is_online)="row">
                                        <span v-if="row.item.is_online" class="figma-status-pill bg-success">On Duty</span>
                                        <span v-else class="figma-status-pill badge bg-secondary">Off Duty</span>
                                    </template>

                                    <template #cell(status)="row">
                                        <div class="form-check form-switch d-flex justify-content-center">
                                            <input class="form-check-input status-switch" type="checkbox"
                                                :checked="row.item.status === 1"
                                                @change="toggleStatus(row.item, $event.target.checked)">
                                        </div>
                                    </template>

                                    <template #cell(actions)="row">
                                        <div class="d-flex justify-content-center gap-2">
                                            <button class="figma-action-btn" @click="openEditModal(row.item)" v-b-tooltip.hover :title="__('edit')">
                                                <base-icon name="edit icon" hoverName="edit Hover" width="24" height="24" />
                                            </button>
                                            <button class="figma-action-btn figma-delete-btn" @click="deleteRecord(row.item)" v-b-tooltip.hover :title="__('delete')">
                                                <base-icon name="Type=Default" hoverName="Type=Hover" width="24" height="24" />
                                            </button>
                                        </div>
                                    </template>
                                </b-table>
                            </div>
                        </div>
                    </div>
                </template>
            </section>
        </div>

        <b-modal id="add-driver-modal" ref="driver-modal" :title="editingId ? 'Edit Delivery Boy' : 'Add Delivery Boy'"
            no-close-on-backdrop static size="lg" scrollable>
            <template #modal-footer>
                <div class="d-flex justify-content-end gap-2 w-100">
                    <b-button variant="light" @click="$refs['driver-modal'].hide()">{{ __('cancel') }}</b-button>
                    <b-button variant="primary" :disabled="isSaving" @click="saveRecord">
                        {{ __('save') }}
                        <b-spinner v-if="isSaving" small></b-spinner>
                    </b-button>
                </div>
            </template>

            <div class="row">
                <div class="col-md-6 form-group mb-3">
                    <label class="form-label">Name<span class="text-danger">*</span></label>
                    <input type="text" class="form-control" v-model="form.name">
                </div>
                <div class="col-md-6 form-group mb-3">
                    <label class="form-label">Mobile<span class="text-danger">*</span></label>
                    <input type="text" class="form-control" v-model="form.mobile">
                </div>
                <template v-if="!editingId">
                    <div class="col-md-6 form-group mb-3">
                        <label class="form-label">Email<span class="text-danger">*</span></label>
                        <input type="email" class="form-control" v-model="form.email">
                    </div>
                    <div class="col-md-6 form-group mb-3">
                        <label class="form-label">Password<span class="text-danger">*</span></label>
                        <input type="password" class="form-control" v-model="form.password">
                    </div>
                </template>
                <div class="col-12 form-group mb-3">
                    <label class="form-label">Cities<span class="text-danger">*</span></label>
                    <multiselect v-model="form.cities" :options="cityOptions" :multiple="true" :close-on-select="false"
                        :clear-on-select="false" track-by="id" label="name" placeholder="Select cities"
                        selectLabel="" deselectLabel="" selectedLabel=""></multiselect>
                    <small class="text-muted">Only the cities your store serves are listed.</small>
                </div>

                <div class="col-12">
                    <div class="form-subsection mb-3">
                        <h6 class="form-subsection-title">{{ __('delivery_boy_bonus_details') }}</h6>
                        <div class="row">
                            <div class="col-md-6 form-group mb-3">
                                <label class="form-label">{{ __('bonus_type') }}<span class="text-danger">*</span></label>
                                <select class="form-control form-select" v-model="form.bonus_type">
                                    <option value="">{{ __('select') }}</option>
                                    <option value="1">{{ __('commission') }}</option>
                                    <option value="0">{{ __('fixed_salaried') }}</option>
                                </select>
                            </div>
                            <template v-if="form.bonus_type == 1">
                                <div class="col-md-6 form-group mb-3">
                                    <label class="form-label">{{ __('bonus_percentage') }}<span class="text-danger">*</span></label>
                                    <input type="number" min="0.1" max="100" step="0.1" class="form-control" v-model="form.bonus_percentage">
                                </div>
                                <div class="col-md-6 form-group mb-0">
                                    <label class="form-label">{{ __('minimum_bonus_amount') }}</label>
                                    <input type="number" min="0" step="0.1" class="form-control" v-model="form.bonus_min_amount">
                                    <small class="text-muted">{{ __('set_0_if_you_want_to_remove_limit') }}</small>
                                </div>
                                <div class="col-md-6 form-group mb-0">
                                    <label class="form-label">{{ __('maximum_bonus_amount') }}</label>
                                    <input type="number" min="0" step="0.1" class="form-control" v-model="form.bonus_max_amount">
                                    <small class="text-muted">{{ __('set_0_if_you_want_to_remove_limit') }}</small>
                                </div>
                            </template>
                        </div>
                    </div>
                </div>

                <template v-if="customFields.length">
                    <div class="col-12"><h6 class="form-subsection-title">{{ __('custom_fields') }}</h6></div>
                    <div class="col-md-6 form-group mb-3" v-for="field in customFields" :key="field.id">
                        <label class="form-label">{{ fieldLabel(field) }}<span class="text-danger" v-if="field.is_required">*</span></label>
                        <input v-if="field.type === 'text'" type="text" class="form-control" v-model="customFieldValues[field.id]">
                        <custom-field-date v-else-if="field.type === 'date'" v-model="customFieldValues[field.id]" :placeholder="fieldLabel(field)"></custom-field-date>
                        <input v-else-if="field.type === 'number'" type="number" class="form-control" v-model="customFieldValues[field.id]">
                        <textarea v-else-if="field.type === 'textarea'" class="form-control" rows="3" v-model="customFieldValues[field.id]"></textarea>
                        <select v-else-if="field.type === 'dropdown'" class="form-control form-select" v-model="customFieldValues[field.id]">
                            <option value="">{{ __('select') }}</option>
                            <option v-for="opt in (field.options || [])" :key="opt" :value="opt">{{ opt }}</option>
                        </select>
                        <input v-else-if="field.type === 'file'" type="file" class="form-control"
                            @change="customFieldFiles[field.id] = $event.target.files[0] || null">
                    </div>
                </template>
            </div>
        </b-modal>
    </div>
</template>

<script>
import axios from "axios";
import Multiselect from 'vue-multiselect';
import ViewModeMixin from '../../mixins/ViewModeMixin';

export default {
    mixins: [ViewModeMixin],
    components: { Multiselect },
    data: function () {
        return {
            statusLoading: false,
            deliveryBoySource: 'shared',

            isLoading: false,
            isSaving: false,
            deliveryBoys: [],
            editingId: null,
            form: { name: '', mobile: '', email: '', password: '', cities: [], bonus_type: '', bonus_percentage: '', bonus_min_amount: 0, bonus_max_amount: 0 },
            cityOptions: [],
            customFields: [],
            languages: [],
            customFieldValues: {},
            customFieldFiles: {},

            fields: [
                { key: 'id', label: __('id') },
                { key: 'name', label: __('name') },
                { key: 'mobile', label: __('mobile') },
                { key: 'email', label: __('email') },
                { key: 'cities', label: 'Cities' },
                { key: 'is_online', label: 'Duty Status', class: 'text-center' },
                { key: 'status', label: __('status') },
                { key: 'actions', label: __('actions'), class: 'text-center' },
            ],
        }
    },
    created: function () {
        this.getStatus();
    },
    methods: {
        getStatus() {
            this.statusLoading = true;
            axios.get(this.$apiUrl + '/seller/delivery_fleet/status').then((response) => {
                if (response.data.data) {
                    this.deliveryBoySource = response.data.data.delivery_boy_source;
                    if (this.deliveryBoySource === 'own') {
                        this.getCities();
                        this.getCustomFields();
                        this.getRecords();
                    }
                }
                this.statusLoading = false;
            }).catch(() => {
                this.statusLoading = false;
            });
        },
        getCities() {
            axios.get(this.$apiUrl + '/seller/delivery_fleet/cities').then((response) => {
                this.cityOptions = response.data.data || [];
            });
        },
        // Field name in the current app language (falls back to the default-language name).
        fieldLabel(field) {
            const locale = window.appLocale || 'en';
            const lang = this.languages.find(l => l.code === locale);
            const tr = lang ? (field.translations || []).find(t => t.language_id === lang.id) : null;
            return tr && tr.name && tr.name.trim() !== '' ? tr.name : field.name;
        },
        getCustomFields() {
            axios.get(this.$apiUrl + '/active_languages').then((res) => {
                this.languages = res.data.data || [];
            });
            axios.get(this.$apiUrl + '/custom_fields/list', { params: { module: 'delivery_boy', active_only: 1 } })
                .then((response) => {
                    this.customFields = response.data.data || [];
                });
        },
        setCustomFieldValues(existing) {
            const values = {};
            this.customFields.forEach(f => {
                const v = existing[f.id];
                values[f.id] = (f.type !== 'file' && v !== undefined) ? v : '';
            });
            this.customFieldValues = values;
            this.customFieldFiles = {};
        },
        cityNames(item) {
            const ids = item.city_ids || [];
            return this.cityOptions.filter(c => ids.includes(c.id)).map(c => c.name).join(', ');
        },
        getRecords() {
            this.isLoading = true;
            axios.get(this.$apiUrl + '/seller/delivery_fleet').then((response) => {
                this.isLoading = false;
                this.deliveryBoys = response.data.data || [];
            }).catch(() => {
                this.isLoading = false;
            });
        },
        openAddModal() {
            this.editingId = null;
            this.form = { name: '', mobile: '', email: '', password: '', cities: [], bonus_type: '', bonus_percentage: '', bonus_min_amount: 0, bonus_max_amount: 0 };
            this.setCustomFieldValues({});
            this.$refs['driver-modal'].show();
        },
        openEditModal(item) {
            this.editingId = item.id;
            this.form = {
                name: item.name, mobile: item.mobile, email: item.email, password: '',
                cities: this.cityOptions.filter(c => (item.city_ids || []).includes(c.id)),
                bonus_type: item.bonus_type === null || item.bonus_type === undefined ? '' : String(item.bonus_type),
                bonus_percentage: item.bonus_percentage || '',
                bonus_min_amount: item.bonus_min_amount || 0,
                bonus_max_amount: item.bonus_max_amount || 0,
            };
            this.setCustomFieldValues(item.custom_field_values || {});
            this.$refs['driver-modal'].show();
        },
        saveRecord() {
            if (!this.form.name || !this.form.mobile) {
                this.showError('Name and mobile are required');
                return;
            }
            if (!this.form.cities.length) {
                this.showError('Please select at least one city');
                return;
            }
            if (!this.editingId && (!this.form.email || !this.form.password)) {
                this.showError('Email and password are required');
                return;
            }

            if (this.form.bonus_type === '') {
                this.showError(__('bonus_type') + ' ' + __('is_required'));
                return;
            }
            if (this.form.bonus_type == 1) {
                const min = parseFloat(this.form.bonus_min_amount) || 0;
                const max = parseFloat(this.form.bonus_max_amount) || 0;
                if (!(parseFloat(this.form.bonus_percentage) > 0)) {
                    this.showError(__('bonus_percentage') + ' ' + __('is_required'));
                    return;
                }
                if (min < 0 || max < 0 || (max !== 0 && min > max)) {
                    this.showError('Minimum bonus amount cannot be greater than maximum bonus amount.');
                    return;
                }
            }

            this.isSaving = true;
            const formData = new FormData();
            formData.append('bonus_type', this.form.bonus_type);
            if (this.form.bonus_type == 1) {
                formData.append('bonus_percentage', this.form.bonus_percentage);
                formData.append('bonus_min_amount', this.form.bonus_min_amount || 0);
                formData.append('bonus_max_amount', this.form.bonus_max_amount || 0);
            }
            formData.append('name', this.form.name);
            formData.append('mobile', this.form.mobile);
            this.form.cities.forEach(c => formData.append('city_ids[]', c.id));

            for (const field of this.customFields) {
                if (field.is_required) {
                    const filled = field.type === 'file'
                        ? (this.customFieldFiles[field.id] || (this.customFieldValues[field.id] && this.editingId))
                        : String(this.customFieldValues[field.id] ?? '').trim() !== '';
                    if (!filled) {
                        this.isSaving = false;
                        this.showError(field.name + ' ' + __('is_required'));
                        return;
                    }
                }
            }
            const textValues = {};
            this.customFields.forEach(field => {
                if (field.type === 'file') {
                    if (this.customFieldFiles[field.id]) formData.append('custom_field_file_' + field.id, this.customFieldFiles[field.id]);
                } else {
                    textValues[field.id] = this.customFieldValues[field.id];
                }
            });
            formData.append('custom_field_values', JSON.stringify(textValues));

            let url = this.$apiUrl + '/seller/delivery_fleet/save';
            if (this.editingId) {
                url = this.$apiUrl + '/seller/delivery_fleet/update';
                formData.append('id', this.editingId);
            } else {
                formData.append('email', this.form.email);
                formData.append('password', this.form.password);
            }

            axios.post(url, formData).then((res) => {
                this.isSaving = false;
                if (res.data.status === 1) {
                    this.showMessage('success', res.data.message);
                    this.$refs['driver-modal'].hide();
                    this.getRecords();
                } else {
                    this.showError(res.data.message);
                }
            }).catch((error) => {
                this.isSaving = false;
                this.showError(error.response?.data?.message || this.__('something_went_wrong'));
            });
        },
        toggleStatus(item, checked) {
            const previousStatus = item.status;
            item.status = checked ? 1 : 0;
            const formData = new FormData();
            formData.append('id', item.id);
            formData.append('status', item.status);

            axios.post(this.$apiUrl + '/seller/delivery_fleet/update-status', formData).then((res) => {
                if (res.data.status !== 1) {
                    item.status = previousStatus;
                    this.showError(res.data.message);
                }
            }).catch(() => {
                item.status = previousStatus;
                this.showError(this.__('something_went_wrong'));
            });
        },
        deleteRecord(item) {
            this.$swal.fire({
                title: __('are_you_sure'),
                text: __('you_want_be_able_to_revert_this'),
                confirmButtonText: __('yes_sure'),
                cancelButtonText: __('cancel'),
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: 'var(--theme-primary-500)',
                cancelButtonColor: 'var(--theme-error-500)',
            }).then((result) => {
                if (result.value) {
                    axios.post(this.$apiUrl + '/seller/delivery_fleet/delete', { id: item.id }).then((res) => {
                        if (res.data.status === 1) {
                            this.showMessage('success', res.data.message);
                            this.getRecords();
                        } else {
                            this.showError(res.data.message);
                        }
                    });
                }
            });
        },
    }
};
</script>

<style scoped>
@import "../../../../node_modules/vue-multiselect/dist/vue-multiselect.min.css";

.status-switch {
    cursor: pointer;
}

/* Grouped block inside the add / edit modal (bonus details) */
.form-subsection {
    padding: 16px;
    background: var(--ui-surface-muted);
    border: 1px solid var(--ui-border);
    border-radius: var(--ui-radius-lg);
}
</style>
