<template>
    <div>
        <div class="page-heading">
            <div class="page-heading d-flex justify-content-between align-items-center mb-4">
                <h3 class="modern-page-title mb-0">{{ __('taxes') }}</h3>
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb mb-0">
                        <li class="breadcrumb-item">
                            <router-link to="/dashboard" class="text-muted">{{ __('dashboard') }}</router-link>
                        </li>
                        <li class="breadcrumb-item active text-primary" aria-current="page">{{ __('taxes') }}</li>
                    </ol>
                </nav>
            </div>

            <section class="section">
                <div class="figma-main-section-card">
                    <div class="card-body p-0">

                        <!-- Modern Filter Action Bar -->
                        <div
                            class="d-flex justify-content-between align-items-center flex-wrap gap-2 figma-action-bar-row">
                            <div class="flex-grow-1">
                                <div class="figma-search-container">
                                    <i class="fa fa-search text-muted"></i>
                                    <input v-model="filter" type="text" class="figma-search-input"
                                        :placeholder="__('search') || 'Search...'" @input="getRecords()">
                                </div>
                            </div>
                            <div class="d-flex gap-2">
                                <button class="btn btn-figma-filter d-flex align-items-center gap-2"
                                    @click="edit_record = true">
                                    <i class="fa fa-plus"></i>
                                    <span>{{ __('add_tax') }}</span>
                                </button>

                                <button class="btn btn-figma-filter d-flex align-items-center gap-2"
                                    @click="getRecords()" v-b-tooltip.hover :title="__('refresh')">
                                    <i class="fa fa-refresh"></i>
                                    <span>{{ __('refresh') || 'Refresh' }}</span>
                                </button>
                            </div>
                        </div>
                        <b-table :items="translatedTaxes" :fields="fields" :filter="filter" :filter-included-fields="filterOn"
                            :sort-by.sync="sortBy" :sort-desc.sync="sortDesc" :sort-direction="sortDirection"
                            :bordered="false" :busy="isLoading" stacked="md" show-empty
                            :tbody-tr-class="() => 'figma-tr align-middle'" small class="figma-order-table mb-0">
                            <template #table-busy>
                                <div class="text-center text-black my-2">
                                    <b-spinner class="align-middle"></b-spinner>
                                    <strong>{{ __('loading') }}...</strong>
                                </div>
                            </template>

                            <template #cell(id)="row">
                                {{ row.item.id }}
                            </template>

                            <template #cell(image)="row">
                                <p v-if="row.item.image === ''">No Image</p>
                                <img :src="$storageUrl + row.item.image" height="50" v-else />
                            </template>

                            <template #cell(status)="row">
                                <span v-if="row.item.status == 1" class="badge bg-success">{{ __('active') }}</span>
                                <span v-else class="badge bg-danger">{{ __('deactive') }}</span>
                            </template>

                            <template #cell(actions)="row">
                                <div class="d-flex gap-2">
                                    <button class="figma-action-btn" @click="edit_record = row.item" v-b-tooltip.hover
                                        :title="__('edit')">
                                        <base-icon name="edit icon" hoverName="edit Hover" width="24" height="24" />
                                    </button>
                                    <button class="figma-action-btn" @click="deleteRecord(row.index, row.item.id)"
                                        v-b-tooltip.hover :title="__('delete')">
                                        <base-icon name="Type=Default" hoverName="Type=Hover" width="24" height="24" />
                                    </button>
                                </div>
                            </template>
                        </b-table>
                    </div>
                    <div class="figma-table-footer flex-wrap gap-3">
                        <div class="d-flex align-items-center gap-2">
                            <label class="showing-results-text mb-0">{{ __('per_page') }}</label>
                            <b-form-select v-model="perPage" :options="pageOptions" size="sm"
                                style="width: auto;"></b-form-select>
                        </div>
                        <div class="d-flex align-items-center gap-3">
                            <b-pagination v-model="currentPage" :total-rows="totalRows" :per-page="perPage"
                                align="right" class="figma-pagination mb-0" hide-goto-end-buttons hide-ellipsis
                                prev-text="<" next-text=">"></b-pagination>
                        </div>
                    </div>
                </div>

            </section>
        </div>

        <!-- Add / Edit -->
        <app-edit-record v-if="edit_record" :record="edit_record" @modalClose="edit_record = null"></app-edit-record>
    </div>

</template>
<script>
import { VuejsDatatableFactory } from 'vuejs-datatable';
import EditRecord from './Edit.vue';


export default {
    components: {
        VuejsDatatableFactory,
        'app-edit-record': EditRecord,
    },
    data: function () {
        return {
            fields: [
                { key: 'id', label: __('id'), class: 'text-center', sortable: true, sortDirection: 'desc' },
                { key: 'title', label: __('title'), class: 'text-center' },
                { key: 'percentage', label: __('percentage'), class: 'text-center' },
                { key: 'status', label: __('status'), class: 'text-center' },
                { key: 'actions', label: __('actions') }
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

            sectionStyle: 'style_1',
            max_visible_units: 12,
            max_col_in_single_row: 3,

            taxes: [],
            isLoading: false,
            create_new: null,
            edit_record: null,
            settingModalShow: false,
            currentLanguageId: null,
            activeLanguages: []

        }
    },
    computed: {
        translatedTaxes() {
            if (!this.currentLanguageId || this.taxes.length === 0) {
                return this.taxes;
            }

            return this.taxes.map(tax => {
                const translatedTax = { ...tax };

                if (tax.translations && Array.isArray(tax.translations)) {
                    const translation = tax.translations.find(
                        t => t.language_id === this.currentLanguageId
                    );

                    if (translation && translation.title && translation.title.trim() !== '') {
                        translatedTax.title = translation.title;
                    }
                }

                return translatedTax;
            });
        },
    },
    watch: {
        currentPage() {
            this.getRecords();
        },
        perPage() {
            if (this.currentPage !== 1) {
                this.currentPage = 1;
            } else {
                this.getRecords();
            }
        },
    },
    created: function () {
        this._recordSavedHandler = (message) => {
            this.showMessage('success', message);
            this.getRecords();
        };
        this.$eventBus.$on('recordSaved', this._recordSavedHandler);

        this.fetchActiveLanguages().then(() => {
            this.getRecords();
        });
    },
    beforeDestroy: function () {
        this.$eventBus.$off('recordSaved', this._recordSavedHandler);
    },
    methods: {
        fetchActiveLanguages() {
            return axios.get(this.$apiUrl + '/active_languages')
                .then(response => {
                    if (response.data.data && Array.isArray(response.data.data)) {
                        this.activeLanguages = response.data.data;

                        const appLocale = window.appLocale || 'en';

                        // Find language ID for current app_locale code
                        const currentLanguage = this.activeLanguages.find(
                            lang => lang.code === appLocale
                        );

                        if (currentLanguage) {
                            this.currentLanguageId = currentLanguage.id;
                        } else {
                            const defaultLanguage = this.activeLanguages.find(
                                lang => lang.is_default === 1
                            );
                            if (defaultLanguage) {
                                this.currentLanguageId = defaultLanguage.id;
                            }
                        }
                    }
                })
                .catch(error => {
                    console.error('Error loading languages:', error);
                });
        },

        getRecords() {
            this.isLoading = true
            axios.get(this.$apiUrl + '/products/taxes', {
                params: {
                    limit: this.perPage,
                    offset: (this.currentPage - 1) * this.perPage,
                }
            })
                .then((response) => {
                    this.isLoading = false
                    let data = response.data;
                    this.taxes = data.data;
                    this.totalRows = data.total
                });
        },
        deleteRecord(index, id) {
            this.$swal.fire({
                title: __('are_you_sure'),
                text: __('you_want_be_able_to_revert_this'),
                confirmButtonText: __('yes_sure'),
                cancelButtonText: __('cancel'),
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
                    axios.post(this.$apiUrl + '/products/taxes/delete', postData)
                        .then((response) => {
                            this.isLoading = false
                            let data = response.data;
                            this.taxes.splice(index, 1)
                            //this.showSuccess(data.message);
                            this.showMessage('success', data.message);
                        });
                }
            });
        },
    }
};
</script>
