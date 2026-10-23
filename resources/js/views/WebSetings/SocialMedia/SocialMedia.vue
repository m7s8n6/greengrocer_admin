<template>
    <div>
        <div class="page-heading">
            <div class="page-title">
                <div class="row">
                    <div class="col-12 col-md-6 order-md-1 order-last">
                        <h3>{{ __('social_media') }}</h3>
                    </div>
                    <div class="col-12 col-md-6 order-md-2 order-first">
                        <nav aria-label="breadcrumb" class="breadcrumb-header float-start float-lg-end">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><router-link to="/dashboard">{{ __('dashboard') }}</router-link></li>
                                <li class="breadcrumb-item"><router-link to="/system_settings">{{ __('settings') }}</router-link></li>
                                <li class="breadcrumb-item active" aria-current="page"> {{ __('social_media') }}</li>
                            </ol>
                        </nav>
                    </div>
                </div>
            </div>
            <section class="section">
                <div class="figma-main-section-card">
                    <div class="card-body p-0">
                        <div class="d-flex justify-content-between align-items-center flex-wrap gap-2 figma-action-bar-row">
                            <div class="flex-grow-1">
                                <div class="figma-search-container">
                                    <i class="fa fa-search text-muted"></i>
                                    <input v-model="filter" type="text" class="figma-search-input"
                                        :placeholder="__('search')">
                                </div>
                            </div>
                            <div class="d-flex gap-2 align-items-center flex-wrap">
                                <button class="btn btn-figma-filter d-flex align-items-center gap-2" @click="create_new=true" v-if="$can('manage_social_media_create')">
                                    <i class="fa fa-plus"></i>
                                    <span>{{ __('add') }}</span>
                                </button>
                                <button class="btn btn-figma-filter d-flex align-items-center gap-2" @click="getSocialMedia()" v-b-tooltip.hover :title="__('refresh')">
                                    <i class="fa fa-refresh"></i>
                                    <span>{{ __('refresh') }}</span>
                                </button>
                            </div>
                        </div>

                        <div class="table-responsive">
                            <b-table
                                :items="socialMedia"
                                :fields="fields"
                                :current-page="currentPage"
                                :per-page="perPage"
                                :filter="filter"
                                :filter-included-fields="filterOn"
                                :sort-by.sync="sortBy"
                                :sort-desc.sync="sortDesc"
                                :sort-direction="sortDirection"
                                :bordered="false"
                                :busy="isLoading"
                                stacked="md"
                                show-empty
                                small
                                class="figma-table mb-0"
                                :tbody-tr-class="() => 'figma-tr align-middle'"
                            >
                                <template #table-busy>
                                    <div class="text-center text-muted my-2">
                                        <b-spinner class="align-middle"></b-spinner>
                                        <strong>{{ __('loading') }}...</strong>
                                    </div>
                                </template>
                                <template #empty="scope">
                                    <div class="text-center text-muted py-4"><i class="fa fa-inbox fa-2x d-block mb-2"></i>{{ scope.emptyText }}</div>
                                </template>
                                <template #emptyfiltered="scope">
                                    <div class="text-center text-muted py-4"><i class="fa fa-search fa-2x d-block mb-2"></i>{{ scope.emptyFilteredText }}</div>
                                </template>
                                <template #cell(icon)="row">
                                    <img v-if="row.item.icon && row.item.icon.startsWith('http')" :src="row.item.icon"
                                        class="social-icon-thumb" />
                                    <i v-else-if="row.item.icon" v-bind:class="row.item.icon"></i>
                                    <span v-else>—</span>
                                </template>

                                <template #cell(actions)="row">
                                    <div class="d-flex gap-2 justify-content-center">
                                        <button class="figma-action-btn" @click="edit_record = row.item" v-if="$can('manage_social_media_update')" v-b-tooltip.hover :title="__('edit')">
                                            <base-icon name="edit icon" hoverName="edit Hover" width="24" height="24" />
                                        </button>
                                        <button class="figma-action-btn figma-delete-btn" @click="deleteSocialMedia(row.index,row.item.id)" v-if="$can('manage_social_media_delete')" v-b-tooltip.hover :title="__('delete')">
                                            <base-icon name="Type=Default" hoverName="Type=Hover" width="24" height="24" />
                                        </button>
                                    </div>
                                </template>
                            </b-table>
                        </div>

                        <div class="figma-table-footer flex-wrap gap-3 mt-4">
                            <table-count :current-page="currentPage" :per-page="perPage" :total-rows="totalRows"></table-count>
                            <div class="d-flex align-items-center gap-3">
                                <b-pagination
                                    v-model="currentPage"
                                    :total-rows="totalRows"
                                    :per-page="perPage"
                                    align="right"
                                    class="figma-pagination mb-0"
                                    hide-goto-end-buttons
                                    hide-ellipsis
                                    prev-text="<"
                                    next-text=">"
                                ></b-pagination>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
        <!-- Add / Edit -->
        <app-edit-record
            v-if="create_new || edit_record"
            :record="edit_record"
            @modalClose="hideModal()"
        ></app-edit-record>
    </div>
</template>
<script>
import EditRecord from './Edit';
export default {
    components: {
        'app-edit-record' : EditRecord,
    },
    data: function() {
        return {
            fields: [
                { key: 'id', label:  __('id') , sortable: true, sortDirection: 'desc', class: 'text-left' },
                { key: 'icon', label:  __('icon') , sortable: false, class: 'text-left' },
                { key: 'name', label:  __('name') , sortable: true, class: 'text-left' },
                { key: 'link', label: __('link') , sortable: true, class: 'text-left' },
                { key: 'actions', label:  __('actions'), class: 'text-center' }
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
            per_page: 10,
            isLoading: false,

            sectionStyle : 'style_1',
            max_visible_units : 12,
            max_col_in_single_row : 3,
            create_new : null,
            edit_record : null,

            socialMedia: [],
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
        sortOptions() {
            // Create an options list from our fields
            return this.fields
                .filter(f => f.sortable)
                .map(f => {
                    return { text: f.label, value: f.key }
                })
        }
    },
    mounted() {
        // Set the initial number of items
        this.totalRows = this.socialMedia.length
    },
    created: function() {
        this.$eventBus.$on('socialMediaSaved', (message) => {
            this.showMessage("success", message);
            this.getSocialMedia();
            this.create_new = null;
        });
        this.getSocialMedia();
    },
    methods: {
        getSocialMedia(){
            this.isLoading = true
           
            axios.get(this.$apiUrl + '/social_media')
                .then((response) => {
                    this.socialMedia = response.data.data;
                    this.totalRows = this.socialMedia.length
                    this.isLoading = false
                });
        },
        deleteSocialMedia(index, id){
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
                        id : id
                    }
                    axios.post(this.$apiUrl + '/social_media/delete',postData)
                        .then((response) => {
                            this.isLoading = false
                            this.socialMedia.splice(index, 1)
                            this.showSuccess(response.data.message)
                        });
                }
            });
        },
        hideModal() {
            this.create_new = false
            this.edit_record = false
        },
    }
};
</script>

<style scoped>
/* !important: the shared "#main .table tbody td img" rule (id selector) would otherwise win */
.social-icon-thumb {
    width: 24px !important;
    height: 24px !important;
    object-fit: contain !important;
}
</style>
