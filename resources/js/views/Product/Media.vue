<template>
    <div class="media-page">
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
                    <div class="card-header">
                        <h4 class="card-title mb-0">{{ __('media_upload_form') }}</h4>
                    </div>
                    <div class="card-body p-3 p-md-4">
                        <form method="POST" enctype="multipart/form-data">
                            <vue-dropzone ref="myVueDropzone" id="dropzone" :options="dropzoneOptions"
                                :useCustomSlot="true" v-on:vdropzone-success="uploadSuccess">
                                <div class="dropzone-custom-content">
                                    <h3 class="dropzone-custom-title"><i class="fa fa-upload"></i> {{
                                        __('drag_and_drop_to_upload_image') }}</h3>
                                    <div class="subtitle">{{ __('or_click_to_select_a_image_from_your_device') }}</div>
                                </div>
                            </vue-dropzone>
                            <div class="d-flex justify-content-end mt-3">
                            <button type="button" :disabled="submitBtn === true" @click="uploadImage()"
                                class="btn btn-primary">
                                <i class="fa fa-upload" v-if="!isLoading"></i> {{ __('upload') }}
                                <b-spinner v-if="isLoading" small label="Spinning"></b-spinner>
                            </button>
                            </div>
                        </form>
                    </div>
                </div>

                <div class="figma-main-section-card">
                    <div class="card-header">
                        <h4 class="card-title mb-0">{{ __('media_list') }}</h4>
                    </div>
                    <div class="card-body p-0">
                        <div
                            class="d-flex justify-content-between align-items-center flex-wrap gap-3 figma-action-bar-row p-3">
                            <div class="flex-grow-1">
                                <div class="figma-search-container">
                                    <i class="fa fa-search text-muted"></i>
                                    <input v-model="filter" type="text" class="figma-search-input"
                                        :placeholder="__('search')" @input="getMedia()">
                                </div>
                            </div>
                            <div class="d-flex gap-2 align-items-center flex-wrap flex-shrink-0">
                                <button class="btn btn-figma-filter d-flex align-items-center gap-2 media-bulk-delete"
                                    @click="multipleDelete" :disabled="selectedItems.length === 0">
                                    <i class="bi bi-trash"></i>
                                    <span>{{ __('delete_selected_media') }}</span>
                                </button>
                                <label v-if="viewMode === 'grid'"
                                    class="btn btn-figma-filter d-flex align-items-center gap-2 mb-0 media-select-all">
                                    <input type="checkbox" v-model="all_select" @click="allSelectCheckBox"
                                        class="form-check-input m-0">
                                    <span>{{ __('select_all') }}</span>
                                </label>
                                <div class="view-toggle" role="group" :aria-label="__('view')">
                                    <button type="button" class="view-toggle-btn" :class="{ active: viewMode === 'grid' }" @click="setViewMode('grid')" v-b-tooltip.hover :title="__('grid_view')"><i class="bi bi-grid-3x3-gap-fill"></i></button>
                                    <button type="button" class="view-toggle-btn" :class="{ active: viewMode === 'list' }" @click="setViewMode('list')" v-b-tooltip.hover :title="__('list_view')"><i class="bi bi-list-ul"></i></button>
                                </div>
                                <button class="btn btn-figma-filter d-flex align-items-center gap-2" @click="getMedia()"
                                    v-b-tooltip.hover :title="__('refresh')">
                                    <i class="fa fa-refresh"></i>
                                    <span>{{ __('refresh') }}</span>
                                </button>
                            </div>
                        </div>

                        <div v-if="viewMode === 'grid'">
                            <div v-if="isLoading" class="item-grid-state">
                                <i class="fa fa-spinner fa-spin"></i>{{ __('loading') }}...
                            </div>
                            <div v-else-if="gridMedia.length === 0" class="item-grid-state">
                                <i class="fa" :class="filter ? 'fa-search' : 'fa-inbox'"></i>
                                {{ filter ? __('no_records_matching_your_request') : __('no_records_to_show') }}
                            </div>
                            <div v-else class="item-grid">
                                <div v-for="item in gridMedia" :key="item.id" class="item-card"
                                    :class="{ 'is-selected': selectedItems.includes(item.id) }">
                                    <label class="item-card-select mb-0">
                                        <input type="checkbox" v-model="selectedItems" @change="selectCheckBox"
                                            :value="item.id" :aria-label="item.name">
                                    </label>
                                    <div class="item-card-media item-card-media--cover">
                                        <img v-if="item.name && isImageFile(item) && !failedImages[item.id]"
                                            :src="$storageUrl + item.sub_directory + item.name" alt="" loading="lazy"
                                            @error="$set(failedImages, item.id, true)" />
                                        <i v-else class="bi item-card-noimg" :class="fileIcon(item)"></i>
                                        <div class="item-card-badges" v-if="item.extension">
                                            <span class="badge bg-info text-uppercase">{{ item.extension }}</span>
                                        </div>
                                    </div>
                                    <div class="item-card-body">
                                        <div class="item-card-title media-card-name" :title="item.name">{{ item.name }}</div>
                                        <div class="item-card-meta">
                                            #{{ item.id }}<template v-if="item.type"> &middot; {{ item.type }}</template>
                                        </div>
                                        <div class="item-card-meta" v-if="item.size" :title="__('size')">
                                            <i class="bi bi-hdd"></i> {{ item.size }}
                                        </div>
                                        <div class="item-card-meta" v-if="item.sub_directory" :title="item.sub_directory">
                                            <i class="bi bi-folder2"></i> {{ item.sub_directory }}
                                        </div>
                                    </div>
                                    <div class="item-card-footer">
                                        <div class="item-card-actions">
                                                <button type="button" class="figma-action-btn"
                                                    :style="copies.includes(item.id) ? 'width: auto !important; min-width: 65px !important; padding: 0 8px !important;' : ''"
                                                    v-clipboard="() => item.sub_directory + item.name"
                                                    @click="copyPath(item.id)" v-b-tooltip.hover :title="__('copy')">
                                                    <span v-if="!copies.includes(item.id)">
                                                        <i class="bi bi-files"></i>
                                                    </span>
                                                    <span v-if="copies.includes(item.id)"
                                                        style="font-size: 12px; font-weight: 600;">Copied!</span>
                                                </button>
                                                <button type="button" class="figma-action-btn figma-delete-btn"
                                                    @click="deleteMedia(media.indexOf(item), item.id)" v-b-tooltip.hover
                                                    :title="__('delete')">
                                                    <i class="bi bi-trash"></i>
                                                </button>
                                            </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div v-else class="table-responsive mb-0">
                            <b-table class="media-table mb-0" :items="media" :fields="fields"
                                :filter="filter" :filter-included-fields="filterOn" :sort-by.sync="sortBy"
                                :sort-desc.sync="sortDesc" :sort-direction="sortDirection" :bordered="false"
                                :busy="isLoading" stacked="md" show-empty small>
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

                                <template #head(select)="row">
                                    <input type="checkbox" v-model="all_select" @click="allSelectCheckBox"
                                        class="form-check-input">
                                </template>
                                <template #cell(select)="row">
                                    <input type="checkbox" v-model="selectedItems" @change="selectCheckBox"
                                        :value="row.item.id" class="form-check-input">
                                </template>

                                <template #cell(image)="row">
                                    <img :src="$storageUrl + row.item.sub_directory + row.item.name"
                                        class="media-thumb" alt="" v-if="row.item.name && isImageFile(row.item) && !failedImages[row.item.id]"
                                        @error="$set(failedImages, row.item.id, true)" />
                                    <i v-else class="bi media-thumb-fallback" :class="fileIcon(row.item)"></i>
                                </template>
                                <template #cell(actions)="row">
                                    <div class="d-flex gap-1 media-row-actions">
                                        <button type="button" class="figma-action-btn"
                                            :style="copies.includes(row.item.id) ? 'width: auto !important; min-width: 65px !important; padding: 0 8px !important;' : ''"
                                            v-clipboard="() => row.item.sub_directory + row.item.name"
                                            @click="copyPath(row.item.id)" v-b-tooltip.hover :title="__('copy')">
                                            <span v-if="!copies.includes(row.item.id)">
                                                <i class="bi bi-files"></i>
                                            </span>
                                            <span v-if="copies.includes(row.item.id)"
                                                style="font-size: 12px; font-weight: 600;">Copied!</span>
                                        </button>
                                        <button type="button" class="figma-action-btn figma-delete-btn"
                                            @click="deleteMedia(media.indexOf(row.item), row.item.id)" v-b-tooltip.hover
                                            :title="__('delete')">
                                            <i class="bi bi-trash"></i>
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
                                <table-count :current-page="currentPage" :per-page="perPage" :total-rows="totalRows"></table-count>
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
import ViewModeMixin from '../../mixins/ViewModeMixin';

export default {
    mixins: [ViewModeMixin],
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
            failedImages: {},
            // The API returns one page at a time (grid view shows the array as is)
            serverPagination: true,
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
        // Grid view cards: same records, search and order as the b-table
        gridMedia() {
            return this.pagedItems(this.gridFilterSort(this.media));
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
        // Grid view: same client-side search (b-table :filter over all fields) and sort as the list view.
        fileExtension(item) {
            const ext = item.extension || (item.name && item.name.indexOf('.') !== -1 ? item.name.split('.').pop() : '');
            return String(ext || '').toLowerCase().replace(/^\./, '');
        },
        isImageFile(item) {
            const type = String(item.type || '').toLowerCase();
            if (type.indexOf('image') !== -1) return true;
            return ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'bmp', 'avif', 'ico'].includes(this.fileExtension(item));
        },
        fileIcon(item) {
            const ext = this.fileExtension(item);
            if (ext === 'pdf') return 'bi-file-earmark-pdf';
            if (['mp4', 'webm', 'mov', 'avi', 'mkv'].includes(ext)) return 'bi-file-earmark-play';
            if (['mp3', 'wav', 'ogg', 'm4a'].includes(ext)) return 'bi-file-earmark-music';
            if (['zip', 'rar', '7z', 'gz', 'tar'].includes(ext)) return 'bi-file-earmark-zip';
            if (['doc', 'docx', 'txt', 'rtf'].includes(ext)) return 'bi-file-earmark-text';
            if (['xls', 'xlsx', 'csv'].includes(ext)) return 'bi-file-earmark-spreadsheet';
            return 'bi-file-earmark';
        },
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
                    // Page changed: re-derive "Select All" from the new page's rows
                    this.selectCheckBox();
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
                confirmButtonColor: 'var(--theme-primary-500)',
                cancelButtonColor: 'var(--theme-error-500)',
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
                    if (!this.selectedItems.includes(media.id)) {
                        this.selectedItems.push(media.id)
                    }
                });
            } else {
                this.all_select = false
                // Unselect only the current page's items
                const currentPageIds = this.media.map(media => media.id);
                this.selectedItems = this.selectedItems.filter(id => !currentPageIds.includes(id));
            }
        },
        selectCheckBox() {
            const selected = new Set(this.selectedItems);
            this.all_select = this.media.length > 0 && this.media.every(media => selected.has(media.id));
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
                    confirmButtonColor: 'var(--theme-primary-500)',
                    cancelButtonColor: 'var(--theme-error-500)',
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

.media-page .figma-main-section-card > .card-header {
    padding: 14px 20px !important;
    border-bottom: 1px solid var(--ui-border);
    background: transparent;
}

.media-page .figma-main-section-card > .card-header .card-title {
    font-size: 16px;
    font-weight: 700;
    color: var(--ui-heading);
}

/* Dropzone: dashed tinted drop area in the theme font */
.media-page ::v-deep .vue-dropzone {
    font-family: var(--ui-font);
    border: 2px dashed var(--ui-border-strong);
    border-radius: var(--ui-radius-lg);
    background: var(--ui-surface-muted);
    color: var(--ui-text-muted);
    min-height: 160px;
    transition: border-color 0.15s ease, background-color 0.15s ease;
}

.media-page ::v-deep .vue-dropzone:hover {
    border-color: var(--theme-primary-400);
    background: var(--ui-primary-soft);
}

.media-page ::v-deep .dropzone-custom-title {
    font-size: 15px;
    font-weight: 700;
    color: var(--ui-heading);
    margin-bottom: 4px;
}

.media-page ::v-deep .dropzone-custom-title i {
    color: var(--theme-primary-500);
    margin-right: 6px;
}

.media-page ::v-deep .dropzone-custom-content .subtitle {
    font-size: 13px;
    color: var(--ui-text-muted);
}

/* Table: 40px thumbs, long file names wrap, compact actions never overflow */
.media-page ::v-deep .media-thumb {
    width: 40px;
    height: 40px;
    object-fit: cover;
    border-radius: var(--ui-radius);
    border: 1px solid var(--ui-border);
    background: var(--ui-surface-muted);
}

.media-page ::v-deep .media-table thead th:first-child,
.media-page ::v-deep .media-table tbody td:first-child {
    width: 44px;
}

.media-page ::v-deep .media-table td {
    overflow-wrap: anywhere;
}

/* !important: legacy global .figma-action-btn forces 40px with !important */
.media-page ::v-deep .media-row-actions .figma-action-btn {
    width: 32px !important;
    height: 32px !important;
    min-width: 32px;
    padding: 0 !important;
    font-size: 14px;
}

.media-page ::v-deep .media-row-actions {
    flex-wrap: nowrap;
}

.media-page .item-card-actions {
    margin-left: auto;
}

.media-page .media-card-name {
    font-size: 13px;
    word-break: break-all;
}

.media-page .media-select-all {
    cursor: pointer;
}

.media-page .media-select-all .form-check-input {
    position: static;
    width: 16px;
    height: 16px;
}

.media-page .media-bulk-delete:not(:disabled),
.media-page .media-bulk-delete:not(:disabled) i {
    color: var(--theme-error-600) !important;
}

/* Phones: "Delete Selected Media" is too long for a half-width cell (it wrapped to 3 lines and
   spilled out of the button), so it takes its own full row; the label stays on one line. */
@media (max-width: 575.98px) {
    .media-page .media-bulk-delete,
    .media-page .media-select-all {
        grid-column: 1 / -1;
        justify-content: center;
    }

    .media-page .media-bulk-delete span {
        white-space: nowrap;
    }
}

.media-page .media-select-all {
    cursor: pointer;
    user-select: none;
}

.media-page .media-select-all .form-check-input {
    position: static !important;
    opacity: 1 !important;
    clip: auto !important;
    pointer-events: auto !important;
    width: 16px !important;
    height: 16px !important;
    margin: 0 !important;
    cursor: pointer !important;
    flex-shrink: 0 !important;
}

.media-page ::v-deep .media-thumb-fallback {
    font-size: 20px;
    color: var(--ui-text-subtle);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: var(--ui-radius);
    background: var(--ui-surface-muted);
}

@media (min-width: 768px) {
    .media-page ::v-deep .media-table td:nth-child(4) {
        min-width: 180px;
        max-width: 280px;
    }

    .media-page ::v-deep .media-table td:nth-child(8),
    .media-page ::v-deep .media-table td:last-child {
        white-space: nowrap;
        overflow-wrap: normal;
    }
}

@media (max-width: 767.98px) {
    .media-page ::v-deep .media-table tbody td:first-child {
        width: auto;
    }
}
</style>
<style>
.vue-dropzone>.dz-preview .dz-error-message {
    top: 1px !important;
}
</style>
