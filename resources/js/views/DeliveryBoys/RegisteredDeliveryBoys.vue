<template>
    <div>
        <div class="page-heading d-flex justify-content-between align-items-center mb-4">
            <h3 class="modern-page-title mb-0">{{ __('delivery_boys') }}</h3>
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb mb-0">
                    <li class="breadcrumb-item"><router-link to="/dashboard" class="text-muted">{{ __('dashboard')
                            }}</router-link></li>
                    <li class="breadcrumb-item active text-primary" aria-current="page">{{
                        __('new_registered_delivery_boys') }}</li>
                </ol>
            </nav>
        </div>
        <section class="section">
            <div class="figma-main-section-card">
                <div class="card-header border-0 bg-transparent py-3">
                    <h4 class="card-title mb-0 figma-card-title">{{ __('new_registered_delivery_boys') }}</h4>
                </div>
                <div class="card-body p-0">
                    <!-- Modern Filter Action Bar -->
                    <div class="d-flex justify-content-between align-items-center flex-wrap gap-2 figma-action-bar-row">
                        <div class="flex-grow-1">
                            <div class="figma-search-container">
                                <i class="fa fa-search text-muted"></i>
                                <input v-model="filter" type="text" class="figma-search-input"
                                    :placeholder="__('search') || 'Search...'" @input="getDeliveryBoys()">
                            </div>
                        </div>
                        <div class="d-flex gap-2">
                            <button class="btn btn-figma-filter d-flex align-items-center gap-2"
                                @click="getDeliveryBoys()" v-b-tooltip.hover :title="__('refresh')">
                                <i class="fa fa-refresh"></i>
                                <span>{{ __('refresh') }}</span>
                            </button>
                        </div>
                    </div>
                    <div class="table-responsive">
                        <b-table :items="translatedDeliveryBoys" :fields="fields" :current-page="currentPage"
                            :per-page="perPage" :filter="filter" :filter-included-fields="filterOn"
                            :sort-by.sync="sortBy" :sort-desc.sync="sortDesc" :sort-direction="sortDirection"
                            :bordered="false" :busy="isLoading" stacked="md" show-empty
                            :tbody-tr-class="() => 'figma-tr align-middle'" small class="figma-order-table mb-0">

                            <template #table-busy>
                                <div class="text-center text-black my-2">
                                    <b-spinner class="align-middle"></b-spinner>
                                    <strong>{{ __('loading') }}...</strong>
                                </div>
                            </template>

                            <template #cell(bonus_percentage)="row">
                                <div class="d-flex justify-content-center">
                                    <small class="d-inline-flex px-2 py-1 text-muted bg-secondary bg-opacity-10 border border-secondary border-opacity-10 rounded-2 cursor-pointer"
                                        v-b-tooltip.hover="{ html: true, title: bonusDetailsHtml(row.item), boundary: 'window' }">
                                        <i class="fa fa-info-circle me-1"></i> {{ row.item.bonus_percentage }}
                                    </small>
                                </div>
                            </template>

                            <template #cell(documents)="row">
                                <div class="d-flex justify-content-center">
                                    <small class="d-inline-flex px-2 py-1 text-muted bg-secondary bg-opacity-10 border border-secondary border-opacity-10 rounded-2 cursor-pointer"
                                        v-b-tooltip.hover="{ html: true, title: documentsHtml(row.item), boundary: 'window' }">
                                        <i class="fa fa-info-circle"></i>
                                    </small>
                                </div>
                            </template>

                            <template #cell(status)="row">
                                <span v-if="row.item.status == 0"
                                    class="badge bg-light-primary text-primary border border-primary border-opacity-10">{{
                                    __('registered') }}</span>
                                <span v-else-if="row.item.status == 1"
                                    class="badge bg-light-success text-success border border-success border-opacity-10">{{
                                    __('active') }}</span>
                                <span v-else-if="row.item.status == 2"
                                    class="badge bg-light-warning text-warning border border-warning border-opacity-10">{{
                                    __('not_approved') }}</span>
                                <span v-else-if="row.item.status == 3"
                                    class="badge bg-light-danger text-danger border border-danger border-opacity-10">{{
                                    __('deactive') }}</span>
                            </template>

                            <template #cell(actions)="row">
                                <div class="d-flex flex-column gap-2 align-items-center">
                                    <button class="btn btn-xs btn-success w-100"
                                        @click="updateStatus(row.index, row.item.id, 1)"
                                        v-if="$can('delivery_boy_update')" v-b-tooltip.hover :title="__('approve')">
                                        {{ __('approved') || 'Approved' }}
                                    </button>
                                    <button class="btn btn-xs btn-danger w-100"
                                        @click="updateStatus(row.index, row.item.id, 2)"
                                        v-if="$can('delivery_boy_update')" v-b-tooltip.hover :title="__('reject')">
                                        {{ __('reject') || 'Reject' }}
                                    </button>
                                </div>
                            </template>
                        </b-table>
                    </div>

                    <div class="figma-table-footer">
                        <div class="showing-results-text">
                            {{ __('Showing Result') }} : <span class="showing-bold">{{ pageEnd }}</span> {{ __('of') ||
                            'of' }} <span class="showing-bold">{{ totalRows }}</span>
                        </div>
                        <b-pagination v-model="currentPage" :total-rows="totalRows" :per-page="perPage" align="right"
                            class="figma-pagination mb-0"></b-pagination>
                    </div>
                </div>
            </div>
        </section>

        <!-- Add / Edit -->
        <app-edit-record v-if="create_new || edit_record" :record="edit_record"
            @modalClose="hideModal()"></app-edit-record>
    </div>
</template>

<script>
import EditRecord from './Edit';
export default {
    components: {
        'app-edit-record': EditRecord,
    },
    data: function () {
        return {
            fields: [
                { key: 'id', label: __('id'), sortable: true, sortDirection: 'desc' },
                { key: 'name', label: __('name'), sortable: true, class: 'text-center' },
                { key: 'mobile', label: __('mobile'), sortable: true, class: 'text-center' },
                { key: 'email', label: __('email'), sortable: true, class: 'text-center' },
                { key: 'bonus_percentage', label: __('bonus'), sortable: true, class: 'text-center' },
                { key: 'documents', label: __('documents'), class: 'text-center' },
                { key: 'dob', label: __('dob'), sortable: true, class: 'text-center' },
                { key: 'city_name', label: __('city'), sortable: true, class: 'text-center' },
                { key: 'status', label: __('status'), sortable: true, class: 'text-center' },
                { key: 'created_at', label: __('date'), sortable: true, class: 'text-center' },
                { key: 'actions', label: __('actions'), class: 'text-center' }
            ],
            totalRows: 1,
            currentPage: 1,
            perPage: this.$perPage,
            pageOptions: this.$pageOptions,
            sortBy: '',
            sortDesc: false,
            sortDirection: 'asc',
            filter: null,
            filterOn: [],
            page: 1,

            isLoading: false,
            sectionStyle: 'style_1',
            max_visible_units: 12,
            max_col_in_single_row: 3,
            create_new: null,
            edit_record: null,

            categories: null,
            products: null,

            deliveryBoys: [],
            filterStatus: 0,
            currentLanguageId: null,
            activeLanguages: []
        }
    },
    computed: {
        sortOptions() {
            // Create an options list from our fields
            return this.fields
                .filter(f => f.sortable)
                .map(f => {
                    return { text: f.label, value: f.key }
                })
        },
        translatedDeliveryBoys() {
            if (!this.currentLanguageId || !Array.isArray(this.deliveryBoys)) {
                return this.deliveryBoys;
            }

            return this.deliveryBoys.map(deliveryBoy => {
                const translated = { ...deliveryBoy };

                if (Array.isArray(deliveryBoy.translations)) {
                    const tr = deliveryBoy.translations.find(
                        t => t.language_id === this.currentLanguageId
                    );

                    if (tr) {
                        // Use translation if it exists and has value
                        if (tr.name?.trim()) {
                            translated.name = tr.name;
                        }
                    }
                }

                // Fallback: If no translation found or translation name is empty, use main table name
                if (!translated.name || !translated.name.trim()) {
                    translated.name = deliveryBoy.name || '';
                }

                return translated;
            });
        }
    },
    mounted() {
        // Set the initial number of items
        this.totalRows = this.deliveryBoys.length
    },
    watch: {
        $route(to, from) {
            this.showCreateModal();
        }
    },
    created: function () {
        this.showCreateModal();
        this.$eventBus.$on('deliveryBoysSaved', (message) => {
            this.showMessage("success", message);
            this.getDeliveryBoys();
            this.create_new = null;
        });
        this.fetchActiveLanguages().then(() => {
            this.getDeliveryBoys();
        });
    },
    methods: {
        escapeHtml(value) {
            const div = document.createElement('div');
            div.textContent = value ?? '';
            return div.innerHTML;
        },
        bonusDetailsHtml(item) {
            const rows = [
                [__('bonus_type'), item.bonus_type === 1 ? 'Commission' : 'Fixed/Salaried'],
            ];
            if (item.bonus_type === 1) {
                rows.push([__('commission'), `${item.bonus_percentage}%`]);
            }
            rows.push([__('min_amount'), `${this.$currency}${item.bonus_min_amount}`]);
            rows.push([__('max_amount'), `${this.$currency}${item.bonus_max_amount}`]);

            const rowsHtml = rows.map(([label, value]) =>
                `<tr><th class="ps-0">${this.escapeHtml(label)}</th><td class="text-end pe-0">${this.escapeHtml(value)}</td></tr>`
            ).join('');

            return `<div class="text-start"><strong>${this.escapeHtml(__('bonus_details'))}</strong>`
                + `<table class="table table-sm table-borderless mb-0">${rowsHtml}</table></div>`;
        },
        documentsHtml(item) {
            const links = [];
            if (item.id_proof_url) {
                links.push(`<a href="${this.escapeHtml(item.id_proof_url)}" target="_blank" class="btn btn-sm btn-light-primary w-100 text-start"><i class="fa fa-file-image-o me-2"></i>${this.escapeHtml(__('id_proof'))}</a>`);
            }
            if (item.driving_license_url) {
                links.push(`<a href="${this.escapeHtml(item.driving_license_url)}" target="_blank" class="btn btn-sm btn-light-primary w-100 text-start"><i class="fa fa-id-card-o me-2"></i>${this.escapeHtml(__('driving_license'))}</a>`);
            }
            const body = links.length
                ? `<div class="d-flex flex-column gap-2 p-1">${links.join('')}</div>`
                : `<span class="text-muted small fst-italic">${this.escapeHtml(__('no_documents_found'))}</span>`;

            return `<div class="text-start"><strong>${this.escapeHtml(__('documents'))}</strong>${body}</div>`;
        },
        async fetchActiveLanguages() {
            try {
                const res = await axios.get(this.$apiUrl + '/active_languages');

                if (res.data.status === 1 && Array.isArray(res.data.data)) {
                    this.activeLanguages = res.data.data;

                    const appLocale = window.appLocale || 'en';

                    const currentLang = this.activeLanguages.find(
                        l => l.code === appLocale
                    );

                    if (currentLang) {
                        this.currentLanguageId = currentLang.id;
                    } else {
                        const def = this.activeLanguages.find(l => l.is_default === 1);
                        if (def) this.currentLanguageId = def.id;
                    }
                }
            } catch (e) {
                console.error('Language load failed', e);
            }
        },
        getDeliveryBoys() {
            this.isLoading = true
            axios.get(this.$apiUrl + '/delivery_boys', {
                params: {
                    filterStatus: this.filterStatus
                }
            })
                .then((response) => {
                    this.isLoading = false
                    this.deliveryBoys = response.data.data;
                    this.totalRows = this.deliveryBoys.length
                });
        },
        updateStatus(index, id, selectedStatus) {
            this.$swal.fire({
                title: __('are_you_sure'),
                text: __('you_want_be_able_to_revert_this'),
                confirmButtonText: __('yes_sure'),
                cancelButtonText: __('cancel'),
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#37a279',
                cancelButtonColor: '#d33',
            }).then(async result => {
                if (result.value) {
                    let remarks = "";
                    if (selectedStatus === 2) {
                        const { value: text } = await this.$swal.fire({
                            title: __('remarks'),
                            input: 'textarea',

                            inputPlaceholder: 'Type your remarks here...',
                            inputAttributes: {
                                'aria-label': 'Type your remarks here'
                            },
                            confirmButtonText: "Submit",
                            cancelButtonText: "Cancel",
                            showCancelButton: true,

                            inputValidator: (value) => {
                                return new Promise((resolve) => {
                                    if (value !== '') {
                                        resolve()
                                    } else {
                                        resolve('The Remarks field is required')
                                    }
                                })
                            }
                        })
                        if (text) {
                            remarks = text;
                        }
                    }
                    if (selectedStatus === 1 || (selectedStatus === 2 && remarks !== "")) {
                        this.isLoading = true
                        let postData = {
                            id: id,
                            status: selectedStatus,
                            remark: remarks
                        }

                        axios.post(this.$apiUrl + '/delivery_boys/update-status', postData)
                            .then((response) => {
                                this.isLoading = false
                                let data = response.data;
                                this.getDeliveryBoys();
                                this.showMessage('success', data.message);
                            });
                    }
                }
            });
        },



        deleteDeliveryBoys(index, id) {
            this.$swal.fire({
                title: "Are you Sure?",
                text: "You want be able to revert this",
                confirmButtonText: "Yes, Sure",
                cancelButtonText: "Cancel",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#37a279',
                cancelButtonColor: '#d33',
            }).then(result => {

                if (result.value) {
                    this.isLoading = true
                    let postData = {
                        id: id
                    }
                    axios.post(this.$apiUrl + '/delivery_boys/delete', postData)
                        .then((response) => {
                            this.isLoading = false
                            this.deliveryBoys.splice(index, 1)
                            this.showSuccess(response.data.message)
                        });
                }
            });
        },
        showCreateModal() {
            let create = this.$route.params.create;
            if (create) {
                this.create_new = true;
            }
        },
        hideModal() {
            this.create_new = false
            this.edit_record = false
            this.$router.push({ path: '/delivery_boys' });
        },
    }
};
</script>

<style scoped>
.btn-xs {
    padding: 0.25rem 0.5rem;
    font-size: 0.75rem;
    line-height: 1.5;
    border-radius: 0.2rem;
}

.cursor-pointer {
    cursor: pointer;
}

.bg-light-primary {
    background-color: rgba(67, 94, 190, 0.1);
}

.bg-light-success {
    background-color: rgba(25, 135, 84, 0.1);
}

.bg-light-warning {
    background-color: rgba(255, 193, 7, 0.1);
}

.bg-light-danger {
    background-color: rgba(220, 53, 69, 0.1);
}
</style>
