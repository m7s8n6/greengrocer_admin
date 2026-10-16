<template>
    <div>
        <div class="page-heading">
            <div class="page-title mb-2">
                <div class="d-flex justify-content-between align-items-center">
                    <h3 class="modern-page-title mb-0">{{ __('media') }}</h3>
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb mb-0">
                            <li class="breadcrumb-item" v-if="isSellerRoute">
                                <router-link to="/seller/dashboard" class="text-muted">{{ __('dashboard')
                                    }}</router-link>
                            </li>
                            <li class="breadcrumb-item" v-else>
                                <router-link to="/dashboard" class="text-muted">{{ __('dashboard') }}</router-link>
                            </li>
                            <li class="breadcrumb-item active text-primary" aria-current="page">{{ __('media') }}</li>
                        </ol>
                    </nav>
                </div>
            </div>

            <section class="section">
                <div class="figma-main-section-card mb-4">
                    <div class="card-body p-4">
                        <h4 class="card-title mb-3">{{ __('media_upload_form') }}</h4>
                        <form method="POST" enctype="multipart/form-data">
                            <vue-dropzone ref="myVueDropzone" id="dropzone" :options="dropzoneOptions"
                                :useCustomSlot="true" v-on:vdropzone-success="uploadSuccess">
                                <div class="dropzone-custom-content">
                                    <h3 class="dropzone-custom-title"><i class="fa fa-upload"></i> {{
                                        __('drag_and_drop_to_upload_image') }}</h3>
                                    <div class="subtitle">{{ __('or_click_to_select_a_image_from_your_device') }}</div>
                                </div>
                            </vue-dropzone>
                            <button type="button" :disabled="submitBtn === true" @click="uploadImage()"
                                class="btn btn-primary mt-3">
                                <i class="fa fa-upload" v-if="!isLoading"></i> {{ __('upload') }}
                                <b-spinner v-if="isLoading" small label="Spinning"></b-spinner>
                            </button>
                        </form>
                    </div>
                </div>

                <div class="figma-main-section-card">
                    <div class="card-body p-0">
                        <h4 class="card-title p-3 mb-0">{{ __('media_list') }}</h4>
                        <div
                            class="d-flex justify-content-between align-items-center flex-wrap gap-3 figma-action-bar-row p-3">
                            <div class="flex-grow-1">
                                <div class="figma-search-container">
                                    <i class="fa fa-search text-muted"></i>
                                    <input v-model="filter" type="text" class="figma-search-input"
                                        :placeholder="__('search')" @input="getMedia()">
                                </div>
                            </div>
                            <div class="d-flex gap-2 align-items-center flex-shrink-0">
                                <button class="btn btn-figma-filter d-flex align-items-center gap-2 text-danger"
                                    @click="multipleDelete" :disabled="selectedItems.length === 0">
                                    <base-icon name="Type=Default" hoverName="Type=Hover" width="20" height="20" />
                                    <span>{{ __('delete_selected_media') }}</span>
                                </button>
                                <button class="btn btn-figma-filter d-flex align-items-center gap-2" @click="getMedia()"
                                    v-b-tooltip.hover :title="__('refresh')">
                                    <i class="fa fa-refresh"></i>
                                    <span>{{ __('refresh') }}</span>
                                </button>
                            </div>
                        </div>

                        <div class="table-responsive mb-0">
                            <b-table :items="media" :fields="fields"
                                :filter="filter" :filter-included-fields="filterOn" :sort-by.sync="sortBy"
                                :sort-desc.sync="sortDesc" :sort-direction="sortDirection" :bordered="false"
                                :busy="isLoading" stacked="md" show-empty small class="mb-0">

                                <template #table-busy>
                                    <div class="text-center text-black my-2">
                                        <b-spinner class="align-middle"></b-spinner>
                                        <strong>{{ __('loading') }}...</strong>
                                    </div>
                                </template>

                                <template #head(select)="row">
                                    <input type="checkbox" v-model="all_select" @click="allSelectCheckBox"
                                        class="form-check-input">
                                </template>
                                <template #cell(select)="row">
                                    <input type="checkbox" v-model="selectedItems" @change="selectCheckBox"
                                        :value="row.item.id" class="form-check-input">
                                </template>

                                <template #cell(image)="row">
                                    <img :src="$storageUrl + row.item.sub_directory + row.item.name" height="50"
                                        v-if="row.item.name" />
                                </template>
                                <template #cell(actions)="row">
                                    <div class="d-flex gap-2">
                                        <button type="button" class="figma-action-btn"
                                            :style="copies.includes(row.item.id) ? 'width: auto !important; min-width: 65px !important; padding: 0 8px !important;' : ''"
                                            v-clipboard="() => row.item.sub_directory + row.item.name"
                                            @click="copyPath(row.item.id)" v-b-tooltip.hover :title="__('copy')">
                                            <span v-if="!copies.includes(row.item.id)">
                                                <base-icon name="copy" width="24" height="24" />
                                            </span>
                                            <span v-if="copies.includes(row.item.id)"
                                                style="font-size: 12px; font-weight: 600;">Copied!</span>
                                        </button>
                                        <button type="button" class="figma-action-btn"
                                            @click="deleteMedia(row.index, row.item.id)" v-b-tooltip.hover
                                            :title="__('delete')">
                                            <base-icon name="Type=Default" hoverName="Type=Hover" width="24"
                                                height="24" />
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
                </div>
            </section>
        </div>
    </div>
</template>
<script>
import vue2Dropzone from 'vue2-dropzone';
import axios from "axios";
import Auth from '../../Auth.js';

export default {
    components: {
        vueDropzone: vue2Dropzone
    },
    data: function () {
        return {
            login_user: Auth.user,
            seller_id: 0,

            dropzoneOptions: {
                url: this.$apiUrl + '/media/save',
                thumbnailWidth: 175,
                maxFilesize: 0.5,
                addRemoveLinks: true,
                paramName: "files",
                autoProcessQueue: false,
                parallelUploads: 10,
                autoDiscover: false,
                dictResponseError: 'Error',
                uploadMultiple: true,
                headers: { "My-Awesome-Header": "header value", "Authorization": 'Bearer ' + Auth.token },
                acceptedFiles: 'image/jpeg,image/png,image/jpg,image/gif,image/webp', // Specify allowed image formats
                dictFileTooBig: 'File is too big ({{filesize}}MB). Max file size: {{maxFilesize}}MB.', // Custom error message for file size
                dictInvalidFileType: 'Invalid file type. Only JPG and PNG files are allowed.', // Custom error message for file type
            },
            submitBtn: false,
            fields: [
                { key: 'select', label: '', class: 'text-center' },
                { key: 'id', label: __('id'), sortable: true, sortDirection: 'desc', class: 'text-center' },
                { key: 'image', label: __('image'), sortable: true, class: 'text-center' },
                { key: 'name', label: __('name'), sortable: true, class: 'text-center' },
                { key: 'extension', label: __('extension'), sortable: true, class: 'text-center' },
                { key: 'type', label: __('type'), sortable: true, class: 'text-center' },
                { key: 'sub_directory', label: __('sub_directory'), sortable: true, class: 'text-center' },
                { key: 'size', label: __('size'), sortable: true, class: 'text-center' },
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

            isLoading: false,
            sectionStyle: 'style_1',
            max_visible_units: 12,
            max_col_in_single_row: 3,
            media: [],
            copyIcon: true,
            copies: [],
            selectedItems: [],
            all_select: false,
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
        isSellerRoute() {
            // Use this.$route to access the current route
            return this.$route.path.startsWith('/seller/');
        },
    },
    created: function () {
        if (this.$roleSeller == this.login_user.role.name) {
            this.seller_id = this.login_user.seller.id;
        } else {
            this.seller_id = 0;
        }
        this.getMedia();
    },
    watch: {
        currentPage() {
            this.getMedia();
        },
        perPage() {
            if (this.currentPage !== 1) {
                this.currentPage = 1;
            } else {
                this.getMedia();
            }
        },
    },
    methods: {
        getMedia() {
            this.isLoading = true;
            axios.get(this.$apiUrl + '/media', {
                params: {
                    page: this.currentPage,
                    per_page: this.perPage,
                    filter: this.filter,
                }
            })
                .then((response) => {
                    this.media = response.data.data;
                    this.totalRows = response.data.total;
                    this.isLoading = false;
                });
        },
        uploadImage() {
            let uploadFiles = this.$refs.myVueDropzone.getQueuedFiles();
            this.isLoading = true;
            if (uploadFiles.length === 0) {
                this.isLoading = false;
                this.showError("Select at least one image or selected image is too large!");
            }
            if (uploadFiles.length > 10) {
                this.isLoading = false;
                this.showError("You can upload 10 medias file at a time");
                return false;
            }
            this.$refs.myVueDropzone.processQueue();
        },
        uploadSuccess(file, response) {
            if (response.status === 1) {
                this.getMedia();
                this.isLoading = false;
                this.showMessage("success", response.message);
                setTimeout(() => {
                    this.$refs.myVueDropzone.removeAllFiles();
                }, 3000)
            } else {
                this.isLoading = false;
                this.showError(response.message);
            }
        },
        deleteMedia(index, id) {
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
                    axios.post(this.$apiUrl + '/media/delete', postData)
                        .then((response) => {
                            this.isLoading = false
                            this.media.splice(index, 1)
                            this.showMessage('success', response.data.message);
                        });
                }
            });
        },
        copyPath(id) {
            this.copies.push(id);
            setTimeout(() => {
                this.copies = this.copies.filter(item => item !== id);
            }, 2000);
        },

        allSelectCheckBox() {
            if (this.all_select == false) {
                this.all_select = true
                this.media.forEach(media => {
                    this.selectedItems.push(media.id)
                });
            } else {
                this.all_select = false
                this.selectedItems = []
            }
        },
        selectCheckBox() {
            let uniqueSelectedItems = [...new Set(this.selectedItems)];
            if (this.media.length === uniqueSelectedItems.length) {
                this.all_select = true
            } else {
                this.all_select = false
            }
        },
        multipleDelete() {
            let uniqueSelectedItems = [...new Set(this.selectedItems)];
            if (uniqueSelectedItems.length !== 0) {
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
                        let ids = uniqueSelectedItems.toString();
                        this.isLoading = true
                        let postData = {
                            ids: ids
                        }
                        axios.post(this.$apiUrl + '/media/multiple_delete', postData)
                            .then((response) => {
                                this.isLoading = false
                                let data = response.data;
                                this.getMedia();
                                this.selectedItems = [];
                                this.all_select = false;
                                this.showMessage("success", data.message);

                            });
                    }
                });
            } else {
                this.showWarning("Select at least one record!");
            }
        }
    }
};
</script>

<style scoped>
@import "../../../../node_modules/vue2-dropzone/dist/vue2Dropzone.min.css";
</style>
<style>
.vue-dropzone>.dz-preview .dz-error-message {
    top: 1px !important;
}
</style>
