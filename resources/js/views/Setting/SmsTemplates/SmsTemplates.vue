<template>

    <div>

        <div class="page-heading">
            <div class="row">
                <div class="col-12 col-md-6 order-md-1 order-last">
                    <h3>{{ __('manage_sms_templates') }}</h3>
                </div>
                <div class="col-12 col-md-6 order-md-2 order-first">
                    <nav aria-label="breadcrumb" class="breadcrumb-header float-start float-lg-end">
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item"><router-link to="/dashboard">{{ __('dashboard') }}</router-link>
                            </li>
                            <li class="breadcrumb-item active" aria-current="page">{{ __('manage_sms_templates') }}</li>
                        </ol>
                    </nav>
                </div>
            </div>

            <div class="row">
                <div class="col-12 col-md-12 order-md-1 order-last">
                    <div class="figma-main-section-card">
                        <div class="card-body p-0">
                            <div
                                class="d-flex justify-content-between align-items-center flex-wrap gap-2 figma-action-bar-row">
                                <div class="flex-grow-1">
                                    <div class="figma-search-container">
                                        <i class="fa fa-search text-muted"></i>
                                        <input v-model="filter" type="text" class="figma-search-input"
                                            :placeholder="__('search')">
                                    </div>
                                </div>
                                <div class="d-flex gap-2 align-items-center flex-wrap">
                                    <button class="btn btn-figma-filter d-flex align-items-center gap-2"
                                        @click="getSmsTemplates()" v-b-tooltip.hover :title="__('refresh')">
                                        <i class="fa fa-refresh"></i>
                                        <span>{{ __('refresh') }}</span>
                                    </button>
                                </div>
                            </div>

                            <div class="table-responsive">
                                <b-table :items="sms_templates" :fields="fields" :filter="filter"
                                    :filter-included-fields="filterOn" :sort-by.sync="sortBy" :sort-desc.sync="sortDesc"
                                    :sort-direction="sortDirection" :bordered="false" :busy="isLoading" stacked="md"
                                    show-empty small class="figma-table mb-0"
                                    :tbody-tr-class="() => 'figma-tr align-middle'">
                                    <template #table-busy>
                                        <div class="text-center text-black my-2">
                                            <b-spinner class="align-middle"></b-spinner>
                                            <strong>{{ __('loading') }}...</strong>
                                        </div>
                                    </template>
                                    <template #cell(updated_at)="row">
                                        {{ row.item.updated_at }}
                                    </template>

                                    <template #cell(actions)="row">
                                        <div class="d-flex gap-2 justify-content-center">
                                            <button class="figma-action-btn" @click="edit_record = row.item"
                                                v-if="$can('category_update')" v-b-tooltip.hover :title="__('edit')">
                                                <base-icon name="edit icon" hoverName="edit Hover" width="24"
                                                    height="24" />
                                            </button>
                                        </div>
                                    </template>
                                </b-table>
                            </div>

                            <div class="figma-table-footer flex-wrap gap-3 mt-4">
                                <div class="showing-results-text small">
                                    {{ __('Showing Result') }} : <span class="showing-bold">{{ pageEnd }}</span> {{ __('of') }} <span
                                        class="showing-bold">{{ totalRows
                                        }}</span>
                                </div>
                                <div class="d-flex align-items-center gap-3">
                                    <b-pagination v-model="currentPage" :total-rows="totalRows" :per-page="perPage"
                                        align="right" class="figma-pagination mb-0" hide-goto-end-buttons hide-ellipsis
                                        prev-text="<" next-text=">"></b-pagination>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Add / Edit -->
        <app-edit-record v-if="edit_record" :record="edit_record" @modalClose="edit_record = null"></app-edit-record>
    </div>

</template>
<script>

import EditRecord from './Edit.vue';
export default {
    components: {
        'app-edit-record': EditRecord,
    },
    data: function () {
        return {
            fields: [
                { key: 'id', label: __('id'), class: 'text-left', sortable: true, sortDirection: 'desc', thStyle: { width: '5%' } },
                { key: 'type', label: __('type'), class: 'text-left', sortable: true, thStyle: { width: '20%' } },
                { key: 'message', label: __('message'), class: 'text-left', sortable: true, thStyle: { width: '50%' } },
                { key: 'updated_at', label: __('last_updated'), class: 'text-left', thStyle: { width: '15%' } },
                { key: 'actions', label: __('actions'), class: 'text-center', thStyle: { width: '10%' } }
            ],
            totalRows: 1,
            currentPage: 1,
            perPage: this.$perPage,
            pageOptions: this.$pageOptions,
            sortBy: 'id',
            sortDesc: false,
            sortDirection: 'asc',
            filter: null,
            filterOn: [],
            page: 1,
            sms_templates: [],
            isLoading: false,
            edit_record: null,
            settingModalShow: false
        };
    },
    computed: {
        pageStart() {
            if (this.totalRows === 0) return 0;
            return (this.currentPage - 1) * this.perPage + 1;
        },
        pageEnd() {
            return Math.min(this.currentPage * this.perPage, this.totalRows);
        },
    },
    mounted() {

    },
    watch: {
        currentPage() {
            this.getSmsTemplates();
        },
        perPage() {
            this.getSmsTemplates();
        }
    },
    created: function () {
        this.$eventBus.$on('SmsTemplatesSaved', (message) => {
            this.showMessage("success", message);
            this.getSmsTemplates();
            this.create_new = null;
        });
        this.getSmsTemplates();
    },
    methods: {

        getSmsTemplates() {

            this.isLoading = true
            const params = {
                offset: this.currentPage,
                limit: this.perPage,
                filter: this.filter
            };
            axios.get(this.$apiUrl + '/sms_templates', { params })
                .then((response) => {
                    this.isLoading = false
                    let data = response.data;
                    this.sms_templates = data.data
                    this.totalRows = data.total
                });
        }

    }
};
</script>
