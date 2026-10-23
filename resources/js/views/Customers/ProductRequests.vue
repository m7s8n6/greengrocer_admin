<template>
    <div class="product-requests-page">
        <div class="page-heading">
            <div class="page-title d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
                <h3 class="modern-page-title mb-0">{{ __('product_requests') }}</h3>
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb mb-0">
                        <li class="breadcrumb-item">
                            <router-link to="/dashboard" class="text-muted">{{ __('dashboard') }}</router-link>
                        </li>
                        <li class="breadcrumb-item active text-primary" aria-current="page">{{ __('product_requests') }}</li>
                    </ol>
                </nav>
            </div>

            <div class="row">
                <div class="col-12 col-md-12 order-md-1 order-last">
                    <div class="figma-main-section-card">
                        <div class="card-body p-0">
                            <div
                                class="d-flex justify-content-between align-items-center flex-wrap gap-2 figma-action-bar-row p-3">
                                <div class="d-flex align-items-center gap-2 flex-grow-1 flex-wrap">
                                    <div class="figma-search-container requests-search">
                                        <i class="fa fa-search text-muted"></i>
                                        <input v-model="filter" type="text" class="figma-search-input"
                                            :placeholder="__('search')">
                                    </div>
                                    <select v-model="statusFilter" class="form-select requests-status-select"
                                        @change="getRequests()">
                                        <option value="">{{ __('all_statuses') }}</option>
                                        <option value="pending">{{ __('pending') }}</option>
                                        <option value="accepted">{{ __('accepted') }}</option>
                                        <option value="rejected">{{ __('rejected') }}</option>
                                    </select>
                                </div>
                                <div class="d-flex gap-2 align-items-center flex-wrap">
                                    <div class="view-toggle" role="group" :aria-label="__('view')">
                                        <button type="button" class="view-toggle-btn" :class="{ active: viewMode === 'grid' }" @click="setViewMode('grid')" v-b-tooltip.hover :title="__('grid_view')"><i class="bi bi-grid-3x3-gap-fill"></i></button>
                                        <button type="button" class="view-toggle-btn" :class="{ active: viewMode === 'list' }" @click="setViewMode('list')" v-b-tooltip.hover :title="__('list_view')"><i class="bi bi-list-ul"></i></button>
                                    </div>
                                    <button class="btn btn-figma-filter d-flex align-items-center gap-2"
                                        @click="getRequests()" v-b-tooltip.hover :title="__('refresh')">
                                        <i class="fa fa-refresh"></i>
                                        <span>{{ __('refresh') }}</span>
                                    </button>
                                </div>
                            </div>
                            <div v-if="viewMode === 'grid'">
                                <div v-if="isLoading" class="item-grid-state">
                                    <i class="fa fa-spinner fa-spin"></i>{{ __('loading') }}...
                                </div>
                                <div v-else-if="gridRequests.length === 0" class="item-grid-state">
                                    <i class="fa" :class="filter ? 'fa-search' : 'fa-inbox'"></i>
                                    {{ filter ? __('no_records_matching_your_request') : __('no_records_to_show') }}
                                </div>
                                <div v-else class="item-grid item-grid--single-xs">
                                    <div v-for="item in gridRequests" :key="item.id" class="item-card">
                                        <div class="item-card-media">
                                            <img :src="item.image_url || $placeholderImage" alt="" class="requests-card-img"
                                                @click="openImageModal(item.image_url || $placeholderImage)">
                                            <div class="item-card-badges">
                                                <span class="badge" :class="getStatusVariant(item.status)">
                                                    {{ getStatusText(item.status) }}
                                                </span>
                                            </div>
                                        </div>
                                        <div class="item-card-body">
                                            <div class="item-card-title" :title="item.description">
                                                {{ item.description || '-' }}
                                            </div>
                                            <div class="item-card-meta" :title="__('customer_name')">
                                                <i class="bi bi-person"></i>
                                                {{ item.customer ? item.customer.name : '-' }}
                                            </div>
                                            <div class="item-card-meta" v-if="item.product" :title="__('requested_product')">
                                                <i class="bi bi-box-seam"></i> {{ item.product.name }}
                                            </div>
                                        </div>
                                        <div class="item-card-footer">
                                            <div class="item-card-actions">
                                                <button class="figma-action-btn" v-b-tooltip.hover :title="__('view')"
                                                    @click="viewRequestDetails(item)">
                                                    <i class="bi bi-eye"></i>
                                                </button>
                                                <template v-if="$can('product_request_update')">
                                                    <button v-if="item.status === 'pending'" class="figma-action-btn"
                                                        v-b-tooltip.hover :title="__('approve')"
                                                        @click="acceptRequest(item)">
                                                        <i class="bi bi-check-circle"></i>
                                                    </button>
                                                    <button v-if="item.status === 'pending'"
                                                        class="figma-action-btn figma-delete-btn" v-b-tooltip.hover
                                                        :title="__('reject')" @click="rejectRequest(item)">
                                                        <i class="bi bi-x-circle"></i>
                                                    </button>
                                                </template>
                                                <template v-if="$can('product_request_delete')">
                                                    <button class="figma-action-btn figma-delete-btn" v-b-tooltip.hover
                                                        :title="__('delete')" @click="deleteRequest(item)">
                                                        <i class="bi bi-trash"></i>
                                                    </button>
                                                </template>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div v-else class="table-responsive">
                                <b-table :items="filteredRequests" :fields="fields" :current-page="currentPage"
                                    :per-page="perPage" :filter="filter" :filter-included-fields="filterOn"
                                    :sort-by.sync="sortBy" :sort-desc.sync="sortDesc" :sort-direction="sortDirection"
                                    :bordered="false" :busy="isLoading" stacked="md" show-empty small
                                    class="figma-table requests-table mb-0" :tbody-tr-class="() => 'figma-tr align-middle'">
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
                                    <template #cell(customer_name)="row">
                                        <span v-if="row.item.customer">{{ row.item.customer.name }}</span>
                                        <span v-else class="text-muted">-</span>
                                    </template>
                                    <template #cell(description)="row">
                                        <div v-if="row.item.description" class="text-truncate requests-desc">
                                            {{ row.item.description }}
                                        </div>
                                        <span v-else class="text-muted">-</span>
                                    </template>
                                    <template #cell(image)="row">
                                        <img :src="row.item.image_url || $placeholderImage" class="requests-thumb" alt=""
                                            @click="openImageModal(row.item.image_url || $placeholderImage)">
                                    </template>
                                    <template #cell(status)="row">
                                        <span class="badge" :class="getStatusVariant(row.item.status)">
                                            {{ getStatusText(row.item.status) }}
                                        </span>
                                    </template>
                                    <template #cell(product)="row">
                                        <span v-if="row.item.product">{{ row.item.product.name }}</span>
                                        <span v-else class="text-muted">-</span>
                                    </template>
                                    <template #cell(action)="row">
                                        <div class="d-flex gap-1 requests-row-actions">
                                            <button class="figma-action-btn" v-b-tooltip.hover :title="__('view')"
                                                @click="viewRequestDetails(row.item)">
                                                <i class="bi bi-eye"></i>
                                            </button>
                                            <template v-if="$can('product_request_update')">
                                                <button v-if="row.item.status === 'pending'" class="figma-action-btn"
                                                    v-b-tooltip.hover :title="__('approve')"
                                                    @click="acceptRequest(row.item)">
                                                    <i class="bi bi-check-circle"></i>
                                                </button>
                                                <button v-if="row.item.status === 'pending'"
                                                    class="figma-action-btn figma-delete-btn" v-b-tooltip.hover
                                                    :title="__('reject')" @click="rejectRequest(row.item)">
                                                    <i class="bi bi-x-circle"></i>
                                                </button>
                                            </template>
                                            <template v-if="$can('product_request_delete')">
                                                <button class="figma-action-btn figma-delete-btn" v-b-tooltip.hover
                                                    :title="__('delete')" @click="deleteRequest(row.item)">
                                                    <i class="bi bi-trash"></i>
                                                </button>
                                            </template>
                                        </div>
                                    </template>
                                </b-table>
                            </div>
                            <div class="figma-table-footer flex-wrap gap-3">
                                <table-count :current-page="currentPage" :per-page="perPage" :total-rows="totalRows"></table-count>
                                <div class="d-flex align-items-center gap-3">
                                    <b-pagination v-model="currentPage" :total-rows="totalRows" :per-page="perPage"
                                        align="right" class="figma-pagination mb-0" hide-goto-end-buttons hide-ellipsis
                                        prev-text="<" next-text=">">
                                    </b-pagination>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Request Details Modal -->
        <b-modal v-model="showDetailsModal" size="lg" :title="__('request_details')" ok-only :ok-title="__('close')">
            <div v-if="selectedRequest">
                <div class="row">
                    <div class="col-md-6">
                        <h6>{{ __('request_information') }}</h6>
                        <p><strong>{{ __('product_request_status') }}:</strong>
                            <span class="badge" :class="getStatusVariant(selectedRequest.status)">
                                {{ getStatusText(selectedRequest.status) }}
                            </span>
                        </p>
                        <p><strong>{{ __('date') }}:</strong> {{ selectedRequest.created_at }}</p>
                    </div>
                </div>

                <div class="row mt-3">
                    <div class="col-12">
                        <h6>{{ __('product_request_description') }}</h6>
                        <p v-if="selectedRequest.description" class="description-text">{{ selectedRequest.description }}
                        </p>
                        <p v-else class="text-muted">{{ __('no_description_provided') }}</p>
                    </div>
                </div>

                <div class="row mt-3" v-if="selectedRequest.image_url">
                    <div class="col-12">
                        <h6>{{ __('product_request_image') }}</h6>
                        <img :src="selectedRequest.image_url" class="img-fluid requests-detail-image" alt="">
                    </div>
                </div>

                <div class="row mt-3" v-if="selectedRequest.product">
                    <div class="col-12">
                        <h6>{{ __('requested_product') }}</h6>
                        <p><strong>{{ __('name') }}:</strong> {{ selectedRequest.product.name }}</p>
                    </div>
                </div>
            </div>
        </b-modal>

        <!-- Accept Request Modal -->
        <b-modal v-model="showAcceptModal" size="lg" :title="__('accept_request')">
            <div class="alert alert-warning mb-3">{{ __('add_product_before_accepting_request') }}</div>
            <div v-if="selectedRequest">
                <div class="form-group">
                    <label>{{ __('select_product') }} <span class="text-danger">*</span></label>
                    <multiselect v-model="selectedProduct" :options="productOptions"
                        :placeholder="__('select_and_search_products')" label="name" track-by="id" required>
                        <template slot="singleLabel" slot-scope="props">
                            <span class="option__desc">
                                <span class="option__title">{{ props.option.name }}</span>
                            </span>
                        </template>
                        <template slot="option" slot-scope="props">
                            <div class="option__desc">
                                <span class="option__title">{{ props.option.name }}</span>
                            </div>
                        </template>
                    </multiselect>
                </div>
            </div>
            <template #modal-footer>
                <b-button variant="outline-secondary" @click="showAcceptModal = false">{{ __('cancel') }}</b-button>
                <b-button variant="primary" @click="confirmAcceptRequest" :disabled="!selectedProduct">
                    {{ __('accept_request') }}
                </b-button>
            </template>
        </b-modal>

        <!-- Reject Request Modal -->
        <b-modal v-model="showRejectModal" :title="__('reject_request')">
            <div v-if="selectedRequest">
                <div class="form-group">
                    <label>{{ __('admin_notes') }} <span class="text-danger">*</span></label>
                    <b-form-textarea v-model="adminNotes" :placeholder="__('enter_admin_notes')" rows="3"
                        required></b-form-textarea>
                </div>
            </div>
            <template #modal-footer>
                <b-button variant="outline-secondary" @click="showRejectModal = false">{{ __('cancel') }}</b-button>
                <b-button variant="danger" @click="confirmRejectRequest" :disabled="!adminNotes">
                    {{ __('reject_request') }}
                </b-button>
            </template>
        </b-modal>

        <!-- Image Modal -->
        <b-modal v-model="showImage" size="lg" :title="__('product_request_image')" ok-only :ok-title="__('close')">
            <div class="text-center">
                <img :src="modalImageUrl" class="img-fluid">
            </div>
        </b-modal>
    </div>
</template>

<script>
import axios from 'axios';
import Multiselect from 'vue-multiselect';
import ViewModeMixin from '../../mixins/ViewModeMixin';

export default {
    mixins: [ViewModeMixin],
    components: {
        Multiselect
    },
    data() {
        return {
            fields: [
                { key: 'customer_name', label: __('customer_name'), class: 'text-center' },
                { key: 'description', label: __('product_request_description'), class: 'text-center' },
                { key: 'image', label: __('product_request_image'), class: 'text-center' },
                { key: 'status', label: __('product_request_status'), sortable: true, class: 'text-center' },
                { key: 'product', label: __('requested_product'), class: 'text-center' },
                { key: 'action', label: __('actions'), class: 'text-center' }
            ],
            requests: [],
            isLoading: false,
            currentPage: 1,
            perPage: this.$perPage || 10,
            pageOptions: this.$pageOptions || [5, 10, 15, 20, 25, 50],
            totalRows: 0,
            sortBy: '',
            sortDesc: false,
            sortDirection: 'asc',
            filter: null,
            filterOn: [],
            statusFilter: '',

            // Modals
            showDetailsModal: false,
            showImage: false,
            showAcceptModal: false,
            showRejectModal: false,

            // Selected data
            selectedRequest: null,
            modalImageUrl: '',
            selectedProduct: null, // Changed from selectedProductId to selectedProduct (object)
            adminNotes: '',
            productOptions: [], // Array of product objects with name and id
            allProducts: [],
            productsPage: 1,
            productsPerPage: 50,
            productsTotal: 0,
            isLoadingProducts: false
        }
    },
    computed: {
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
        },
        // Grid view cards: same records, search, order and page slice as the b-table
        gridRequests() {
            return this.pagedItems(this.gridFilterSort(this.filteredRequests));
        },
        filteredRequests() {
            if (!this.statusFilter) {
                return this.requests;
            }
            return this.requests.filter(request => request.status === this.statusFilter);
        }
    },
    watch: {
        statusFilter() {
            this.totalRows = this.filteredRequests.length;
        }
    },
    mounted() {
        // Set the initial number of items
        this.totalRows = this.requests.length
    },
    created() {
        this.getRequests();
        this.getProducts();
    },
    methods: {
        // Grid view: same client-side search (b-table :filter over all fields) and sort as the list view.
        getRequests() {
            this.isLoading = true;

            axios.get(this.$apiUrl + '/user_product_requests')
                .then((response) => {
                    this.isLoading = false;
                    if (response.data.status === 1) {
                        this.requests = response.data.data.data;
                        this.totalRows = this.requests.length;
                    } else {
                        this.showMessage("error", response.data.message);
                    }
                })
                .catch(() => {
                    this.isLoading = false;
                    this.showMessage("error", __('something_went_wrong'));
                });
        },

        viewRequestDetails(request) {
            this.selectedRequest = request;
            this.showDetailsModal = true;
        },

        getProducts() {
            this.isLoadingProducts = true;
            const params = {
                page: this.productsPage,
                per_page: this.productsPerPage,
                include_unlimited: 1
            };

            axios.get(this.$apiUrl + '/products/get_product_variants', { params })
                .then((response) => {
                    this.isLoadingProducts = false;
                    if (response.data.status === 1) {
                        // Add new products to existing array
                        this.allProducts = [...this.allProducts, ...response.data.data];
                        this.productsTotal = response.data.total;

                        // Update dropdown options
                        this.updateProductOptions();

                        // If there are more products to load, load next page
                        if (this.allProducts.length < this.productsTotal) {
                            this.productsPage++;
                            this.getProducts();
                        }
                    }
                })
                .catch((error) => {
                    this.isLoadingProducts = false;
                    console.error('Error fetching products:', error);
                });
        },

        updateProductOptions() {
            // Transform products for multiselect component
            // Each product needs id and name properties
            this.productOptions = this.allProducts.map(product => ({
                id: product.product_id || product.id, // Use product_id if available, fallback to id
                name: `${product.name} (${product.seller_name})`
            }));
        },

        acceptRequest(request) {
            this.selectedRequest = request;
            this.selectedProduct = null; // Reset selected product when opening modal
            this.showAcceptModal = true;
        },

        rejectRequest(request) {
            this.selectedRequest = request;
            this.adminNotes = '';
            this.showRejectModal = true;
        },

        confirmAcceptRequest() {
            if (!this.selectedProduct || !this.selectedProduct.id) {
                this.showMessage("error", __('select_product'));
                return;
            }

            this.updateRequestStatus('accepted');
        },

        confirmRejectRequest() {
            if (!this.adminNotes) {
                this.showMessage("error", __('enter_admin_notes'));
                return;
            }

            this.updateRequestStatus('rejected');
        },

        updateRequestStatus(status) {
            const data = {
                id: this.selectedRequest.id,
                status: status
            };

            if (status === 'accepted') {
                data.product_id = this.selectedProduct.id;
            }

            if (status === 'rejected') {
                data.admin_notes = this.adminNotes;
            }

            axios.post(this.$apiUrl + '/user_product_requests/update-status', data)
                .then((response) => {
                    if (response.data.status === 1) {
                        this.showMessage("success", response.data.message);
                        this.showAcceptModal = false;
                        this.showRejectModal = false;
                        this.getRequests();
                    } else {
                        this.showMessage("error", response.data.message);
                    }
                })
                .catch((error) => {
                    this.showMessage("error", __('something_went_wrong'));
                });
        },

        openImageModal(imageUrl) {
            this.modalImageUrl = imageUrl;
            this.showImage = true;
        },

        getStatusVariant(status) {
            switch (status) {
                case 'pending':
                    return 'bg-warning';
                case 'accepted':
                    return 'bg-success';
                case 'rejected':
                    return 'bg-danger';
                default:
                    return 'bg-secondary';
            }
        },

        getStatusText(status) {
            switch (status) {
                case 'pending':
                    return __('pending');
                case 'accepted':
                    return __('accepted');
                case 'rejected':
                    return __('rejected');
                default:
                    return status;
            }
        },

        formatDate(date) {
            return new Date(date).toLocaleDateString();
        },

        deleteRequest(request) {
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
                if (result.isConfirmed) {
                    this.isLoading = true;
                    axios.delete(this.$apiUrl + `/user_product_requests/${request.id}`)
                        .then((response) => {
                            this.isLoading = false;
                            if (response.data.status === 1) {
                                this.showMessage("success", response.data.message);
                                this.getRequests();
                            } else {
                                this.showMessage("error", response.data.message);
                            }
                        })
                        .catch(() => {
                            this.isLoading = false;
                            this.showMessage("error", __('something_went_wrong'));
                        });
                }
            });
        }
    }
}
</script>

<style scoped>
@import "../../../../node_modules/vue-multiselect/dist/vue-multiselect.min.css";

.description-text {
    word-wrap: break-word;
    word-break: break-word;
    overflow-wrap: break-word;
    white-space: pre-wrap;
    max-width: 100%;
    overflow: hidden;
}

.requests-search {
    min-width: 250px;
    flex: 1 1 250px;
}

.requests-status-select {
    width: auto;
    min-width: 160px;
    height: 38px;
    min-height: 38px;
    padding-top: 0;
    padding-bottom: 0;
    line-height: 36px;
    color: var(--ui-text);
    font-size: 13px !important;
}

.product-requests-page ::v-deep .requests-desc {
    max-width: 220px;
}

.product-requests-page ::v-deep .requests-thumb {
    width: 40px;
    height: 40px;
    object-fit: cover;
    border-radius: var(--ui-radius);
    border: 1px solid var(--ui-border);
    background: var(--ui-surface-muted);
    cursor: pointer;
}

/* !important: legacy global .figma-action-btn forces 40px with !important */
.product-requests-page ::v-deep .requests-row-actions .figma-action-btn {
    width: 32px !important;
    height: 32px !important;
    min-width: 32px;
    padding: 0 !important;
    font-size: 14px;
}

.product-requests-page ::v-deep .requests-row-actions {
    flex-wrap: nowrap;
}

.product-requests-page .requests-card-img {
    cursor: zoom-in;
}

.product-requests-page .item-card-actions {
    margin-left: auto;
}

.requests-detail-image {
    max-width: 300px;
    border-radius: var(--ui-radius);
    border: 1px solid var(--ui-border);
}

@media (max-width: 767.98px) {
    .product-requests-page ::v-deep .requests-row-actions {
        flex-wrap: wrap;
    }
}

@media (max-width: 575.98px) {
    .requests-search,
    .requests-status-select {
        min-width: 0;
        width: 100%;
        flex: 1 1 100%;
    }
}
</style>
