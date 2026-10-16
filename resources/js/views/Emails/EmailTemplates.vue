<template>
    <div>
        <div class="page-heading d-flex justify-content-between align-items-center mb-4">
            <h3 class="modern-page-title mb-0">{{ __('email_templates') }}</h3>
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb mb-0">
                    <li class="breadcrumb-item"><router-link to="/dashboard" class="text-muted">{{ __('dashboard')
                            }}</router-link></li>
                    <li class="breadcrumb-item active text-primary" aria-current="page">{{ __('email_templates') }}</li>
                </ol>
            </nav>
        </div>
        <section class="section">
            <div class="figma-main-section-card">
                <div class="card-body p-0">
                    <!-- Modern Filter Action Bar -->
                    <div class="d-flex justify-content-between align-items-center flex-wrap gap-2 figma-action-bar-row">
                        <div class="flex-grow-1">
                            <div class="figma-search-container">
                                <i class="fa fa-search text-muted"></i>
                                <input v-model="filter" type="text" class="figma-search-input"
                                    :placeholder="__('search') || 'Search...'" @input="getEmailTemplates()">
                            </div>
                        </div>
                        <div class="d-flex gap-2">
                            <button class="btn btn-figma-filter d-flex align-items-center gap-2"
                                @click="create_new = true" v-if="$can('create_email_template')">
                                <i class="fa fa-plus"></i>
                                <span>{{ __('create_email_templates') }}</span>
                            </button>
                            <button class="btn btn-figma-filter d-flex align-items-center gap-2"
                                @click="getEmailTemplates()" v-b-tooltip.hover :title="__('refresh')">
                                <i class="fa fa-refresh"></i>
                            </button>
                        </div>
                    </div>
                    <div class="table-responsive">
                        <b-table :items="email_templates" :fields="fields" :current-page="currentPage"
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

                            <template #cell(image)="row">
                                <p v-if="row.item.image === ''">{{ __('no_image') }}</p>
                                <img :src="$storageUrl + row.item.image" height="50" v-else />
                            </template>

                            <template #cell(message)="row">
                                <div>
                                    <small class="d-inline-flex mb-3 px-2 py-1 text-muted bg-secondary bg-opacity-10 border border-secondary border-opacity-10 rounded-2"
                                        v-b-tooltip.hover="{ html: true, title: row.item.message, boundary: 'window' }">
                                        <i class="fa fa-info-circle"></i>
                                    </small>
                                </div>
                            </template>

                            <template #cell(actions)="row">
                                <div class="d-flex gap-2 justify-content-center">
                                    <button class="figma-action-btn" @click="edit_record = row.item" v-b-tooltip.hover
                                        v-if="$can('update_email_template')" :title="__('edit')">
                                        <base-icon name="edit icon" hoverName="edit Hover" width="24" height="24" />
                                    </button>
                                    <button class="figma-action-btn figma-delete-btn"
                                        @click="deleteEmailTemplate(row.index, row.item.id)"
                                        v-if="$can('delete_email_template')" v-b-tooltip.hover :title="__('delete')">
                                        <base-icon name="Type=Default" hoverName="Type=Hover" width="24" height="24" />
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
import EditRecord from './EditEmailTemplate';
export default {
    components: {
        'app-edit-record': EditRecord,
    },
    data: function () {
        return {
            fields: [
                { key: 'id', label: __('id'), class: 'text-center', sortable: true, sortDirection: 'desc' },
                { key: 'type', label: __('type'), class: 'text-center', sortable: true },
                { key: 'message', label: __('message'), class: 'text-center', sortable: true },
                { key: 'updated_at', label: __('last_updated'), class: 'text-center' },
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
            email_templates: [],
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
        pageEnd() {
            return Math.min(this.currentPage * this.perPage, this.totalRows);
        }
    },
    mounted() {
        // Set the initial number of items
        this.totalRows = this.email_templates.length
    },
    watch: {
        $route(to, from) {
            this.showCreateModal();
        }
    },
    created: function () {
        if (!this.$can('email_templates')) {
            this.showError("You do not have permission to view this page.");
            this.$router.back();
        }
        this.showCreateModal();
        this.$eventBus.$on('emailSaved', (message) => {
            this.showMessage("success", message);
            this.getEmailTemplates();
            this.create_new = null;
        });
        this.getEmailTemplates();
    },
    methods: {
        getEmailTemplates() {
            this.isLoading = true
            axios.get(this.$apiUrl + '/email_templates')
                .then((response) => {
                    this.isLoading = false
                    this.email_templates = response.data.data.email_templates;
                    this.totalRows = this.email_templates.length
                });
        },
        deleteEmailTemplate(index, id) {
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
                    axios.post(this.$apiUrl + '/email_templates/delete', postData)
                        .then((response) => {
                            this.isLoading = false
                            this.email_templates.splice(index, 1)
                            this.showMessage("success", response.data.message);
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
            this.$router.push({ path: '/email_templates' });
        },
    }
};
</script>