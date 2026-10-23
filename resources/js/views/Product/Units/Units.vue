<template>
    <div>
        <div class="page-heading">
        <div class="page-title d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
            <h3 class="modern-page-title mb-0">{{ __('manage_units') }}</h3>
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb mb-0">
                    <li class="breadcrumb-item">
                        <router-link to="/dashboard" class="text-muted">{{ __('dashboard') }}</router-link>
                    </li>
                    <li class="breadcrumb-item">
                        <router-link to="/manage_products" class="text-muted">{{ __('product') }}</router-link>
                    </li>
                    <li class="breadcrumb-item active text-primary" aria-current="page">{{ __('units') }}</li>
                </ol>
            </nav>
        </div>
            <section class="section">
                <div class="card figma-main-section-card">
                    <div class="card-body p-0">
                        <!-- Modern Filter Action Bar -->
                        <div class="d-flex justify-content-between align-items-center flex-wrap gap-2 figma-action-bar-row">
                            <div class="flex-grow-1">
                                <div class="figma-search-container">
                                    <i class="fa fa-search text-muted"></i>
                                    <input v-model="filter" type="text" class="figma-search-input" :placeholder="__('search') || 'Search...'">
                                </div>
                            </div>
                            <div class="d-flex flex-wrap gap-2">
                                <button class="btn btn-figma-columns d-flex align-items-center gap-2" @click="getUnits()" v-b-tooltip.hover :title="__('refresh')">
                                    <i class="fa fa-refresh"></i>
                                    <span>{{ __('refresh') || 'Refresh' }}</span>
                                </button>
                                <button class="btn btn-figma-filter d-flex align-items-center gap-2" @click="create_new = true" v-if="$can('units')">
                                    <i class="fa fa-plus"></i>
                                    <span>{{ __('add_unit') }}</span>
                                </button>
                            </div>
                        </div>
                        <b-table :items="translatedUnits" :fields="fields" :current-page="currentPage"
                            :per-page="perPage" :filter="filter" :filter-included-fields="filterOn"
                            :sort-by.sync="sortBy" :sort-desc.sync="sortDesc" :sort-direction="sortDirection"
                            :bordered="false" :busy="isLoading" stacked="md" show-empty
                            :tbody-tr-class="() => 'figma-tr align-middle'" small
                            class="figma-order-table mb-0">


                            <template #table-busy>
                                <div class="text-center text-black my-2">
                                    <b-spinner class="align-middle"></b-spinner>
                                    <strong>{{ __('loading') }}...</strong>
                                </div>
                            </template>

                            <template #cell(parent_id)="row">
                                <span v-if="row.item.parent_id !== null">{{ row.item.parent_id }}</span>
                                <span v-else class="text-muted">-</span>
                            </template>

                            <template #cell(conversion)="row">
                                <span v-if="row.item.conversion !== null">{{ row.item.conversion }}</span>
                                <span v-else class="text-muted">-</span>
                            </template>

                            <template #cell(actions)="row">
                                <div class="d-flex gap-2">
                                    <button class="figma-action-btn" @click="edit_record = row.item"
                                        v-if="$can('units')" v-b-tooltip.hover :title="__('edit')">
                                        <base-icon name="edit icon" hoverName="edit Hover" width="24" height="24" />
                                    </button>
                                    <button class="figma-action-btn" @click="deleteUnit(row.index, row.item.id)"
                                        v-if="$can('units')" v-b-tooltip.hover :title="__('delete')">
                                        <base-icon name="Type=Default" hoverName="Type=Hover" width="24" height="24" />
                                    </button>
                                </div>
                            </template>

                        </b-table>

                        </div>
                        <div class="figma-table-footer flex-wrap gap-3">
                            <table-count :current-page="currentPage" :per-page="perPage" :total-rows="totalRows"></table-count>
                            <b-pagination v-model="currentPage" :total-rows="totalRows" :per-page="perPage" align="right" 
                                class="figma-pagination mb-0" hide-goto-end-buttons hide-ellipsis prev-text="<" next-text=">"></b-pagination>
                        </div>
                    </div>
                
            </section>
        </div>
        <!-- Add / Edit -->
        <app-edit-record v-if="create_new || edit_record" :key="edit_record ? edit_record.id : 'new'"
            :record="edit_record" :units="units" :current-language-id="currentLanguageId"
            :default-language-id="defaultLanguageId" @saved="onUnitSaved" @modalClose="hideModal()"></app-edit-record>
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
                { key: 'short_code', label: __('short_code'), sortable: true, class: 'text-center' },
                { key: 'parent_id', label: __('parent_id'), class: 'text-center' },
                { key: 'conversion', label: __('conversion'), class: 'text-center' },
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

            units: [],
            isLoading: false,
            sectionStyle: 'style_1',
            max_visible_units: 12,
            max_col_in_single_row: 3,
            create_new: null,
            edit_record: null,
            currentLanguageId: null,
            activeLanguages: [],
            defaultLanguageId: null,

        }
    },
    computed: {
        translatedUnits() {
            if (!this.units.length) return this.units;

            return this.units.map(unit => {
                const u = { ...unit };

                if (!Array.isArray(unit.translations)) {
                    return u;
                }

                const currentTranslation = unit.translations.find(
                    t => t.language_id === this.currentLanguageId
                );

                const defaultTranslation = unit.translations.find(
                    t => t.language_id === this.defaultLanguageId
                );

                if (currentTranslation?.name?.trim()) {
                    u.name = currentTranslation.name;
                } else if (defaultTranslation?.name?.trim()) {
                    u.name = defaultTranslation.name;
                }

                if (currentTranslation?.short_code?.trim()) {
                    u.short_code = currentTranslation.short_code;
                } else if (defaultTranslation?.short_code?.trim()) {
                    u.short_code = defaultTranslation.short_code;
                }

                return u;
            });
        }
        ,
        sortOptions() {
            // Create an options list from our fields
            return this.fields
                .filter(f => f.sortable)
                .map(f => {
                    return { text: f.label, value: f.key }
                })
        },
        pageEnd() {
            return Math.min(this.currentPage * this.perPage, this.totalRows);
        }
    },
    mounted() {


        // Set the initial number of items
        this.totalRows = this.units.length
    },
    created: function () {
        this.$eventBus.$on('unitSaved', (message) => {
            this.showMessage('success', message);
            this.getUnits();
        });

        this.fetchActiveLanguages().then(() => {
            this.getUnits();
        });
    },
    methods: {
        fetchActiveLanguages() {
            return axios.get(this.$apiUrl + '/active_languages')
                .then(response => {
                    if (Array.isArray(response.data.data)) {
                        this.activeLanguages = response.data.data;

                        const appLocale = window.appLocale || 'en';

                        const currentLang = this.activeLanguages.find(
                            l => l.code === appLocale
                        );

                        const defaultLang = this.activeLanguages.find(
                            l => l.is_default === 1
                        );

                        this.currentLanguageId = currentLang?.id || defaultLang?.id || null;
                        this.defaultLanguageId = defaultLang?.id || null;
                    }
                })
                .catch(err => console.error(err));
        }
        ,

        getUnits() {

            this.isLoading = true;

            axios.get(this.$apiUrl + '/units')
                .then((response) => {

                    this.isLoading = false;

                    let data = response.data;
                    this.units = data.data;
                    this.totalRows = this.units.length;
                })
                .catch(error => {
                    console.error('units API error', error);
                });
        }
        ,
        deleteUnit(index, id) {
            this.$swal.fire({
                title: __('are_you_sure'),
                text: __('you_want_be_able_to_revert_this'),
                confirmButtonText: __('yes_sure'),
                cancelButtonText: __('cancel'),
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: 'var(--theme-primary-500)',
                cancelButtonColor: 'var(--theme-error-500)',
            }).then(result => {

                if (result.value) {
                    this.isLoading = true
                    let postData = {
                        id: id
                    }
                    axios.post(this.$apiUrl + '/units/delete', postData)
                        .then((response) => {
                            this.isLoading = false
                            let data = response.data;
                            this.units.splice(index, 1);

                            this.showMessage("success", data.message);
                        });
                }
            });
        },
        addUnitSettings() {
            let postData = {
                add_unit_settings: 1,
                cat_style: this.sectionStyle,
                max_visible_units: this.max_visible_units,
                max_col_in_single_row: this.max_col_in_single_row
            }

            axios.post(this.$apiUrl + '/units/saveUnitSettings', postData)
                .then((response) => {

                    let data = response.data;

                    this.showMessage("success", data.message);
                });
        },

        onUnitSaved(message) {
            this.showMessage(
                'success',
                message || __('unit_saved_successfully')
            );
            this.getUnits();
            this.hideModal();
        },

        hideModal() {
            this.create_new = false
            this.edit_record = false
        },
    }
};
</script>
