<template>
    <div>
        <div class="page-heading">
            <div class="page-title">
                <div class="row">
                    <div class="col-12 col-md-6 order-md-1 order-last">
                        <h3>POS Orders Report</h3>
                    </div>
                    <div class="col-12 col-md-6 order-md-2 order-first">
                        <nav aria-label="breadcrumb" class="breadcrumb-header float-start float-lg-end">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><router-link to="/dashboard">{{ __('dashboard')
                                        }}</router-link></li>
                                <li class="breadcrumb-item active" aria-current="page">POS Orders Report</li>
                            </ol>
                        </nav>
                    </div>
                </div>
            </div>
            <section class="section">
                <div class="row g-3 mb-3 report-kpis justify-content-start">
                    <div class="col-6 col-md-4 col-xl-3">
                        <div class="figma-kpi-card-v2 w-100">
                            <div class="figma-kpi-icon-v2 bg-stat-blue"><i class="bi bi-receipt"></i></div>
                            <div class="figma-kpi-content-v2">
                                <span class="figma-kpi-label-v2">{{ __('total_amount') }}</span>
                                <span class="figma-kpi-value-v2">{{ $currency }} {{ totalAmount }}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="figma-main-section-card">
                    <div class="card-body p-0">
                        <!-- Toolbar: search + refresh -->
                        <div class="d-flex justify-content-between align-items-center flex-wrap gap-2 figma-action-bar-row">
                            <div class="flex-grow-1">
                                <div class="figma-search-container">
                                    <i class="fa fa-search text-muted"></i>
                                    <input id="filter-input" v-model="filter" type="search" class="figma-search-input"
                                        :placeholder="__('search')" @input="onFilterChanged">
                                </div>
                            </div>
                            <div class="d-flex gap-2">
                                <button class="btn btn-figma-filter d-flex align-items-center gap-2"
                                    :class="{ 'active': showFilters }" @click="showFilters = !showFilters">
                                    <base-icon name="Funnel" width="24" height="24" useCurrentColor />
                                    <span>{{ __('filters') }}</span>
                                    <i class="bi ms-1" :class="showFilters ? 'bi-chevron-up' : 'bi-chevron-down'"></i>
                                </button>
                                <button class="btn btn-figma-filter d-flex align-items-center gap-2 btn_refresh"
                                    @click="getPosOrders()">
                                    <i class="fa fa-refresh" aria-hidden="true"></i>
                                    <span>{{ __('refresh') }}</span>
                                </button>
                            </div>
                        </div>

                        <!-- Filters -->
                        <b-collapse v-model="showFilters">
                        <div class="figma-filter-section">
                            <div class="row g-3">
                                <div class="col-md-4">
                                    <div class="figma-filter-group">
                                        <label class="figma-filter-label">From & To Date</label>
                                        <div class="d-flex align-items-center gap-2">
                                            <date-range-picker :append-to-body="true" :single-date-picker="'range'"
                                                :locale-data="dateRangePickerLocale" :ranges="dateRangePickerRanges"
                                                :autoApply=false :showDropdowns=true v-model="dateRange" :maxDate="maxDate"
                                                @update="getPosOrders" class="flex-grow-1"></date-range-picker>
                                            <button class="btn btn-figma-filter d-flex align-items-center gap-2"
                                                @click="dateRange.startDate = null, dateRange.endDate = null, getPosOrders()">
                                                <i class="fa fa-eraser"></i>
                                                <span>{{ __('clear') }}</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="figma-filter-group">
                                        <label class="figma-filter-label">Store</label>
                                        <b-form-select class="form-select modern-select" v-model="selectedStore" :options="storeOptions"
                                            @change="getPosOrders"></b-form-select>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="figma-filter-group">
                                        <label class="figma-filter-label">Payment Method</label>
                                        <b-form-select class="form-select modern-select" v-model="selectedPaymentMethod"
                                            :options="paymentMethodOptions" @change="getPosOrders"></b-form-select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </b-collapse>

                        <div class="table-responsive mb-0">
                            <table class="table figma-table mb-0">
                                <thead>
                                    <tr>
                                        <th>Order ID</th>
                                        <th>Store</th>
                                        <th>Customer</th>
                                        <th>Mobile Number</th>
                                        <th>Date</th>
                                        <th class="text-end">Total Amount</th>
                                        <th>Payment Method</th>
                                        <th class="text-center">Invoice</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-if="isLoading">
                                        <td colspan="8" class="text-center my-2">
                                            <b-spinner class="align-middle"></b-spinner>
                                            <strong>{{ __('loading') }}...</strong>
                                        </td>
                                    </tr>
                                    <tr v-else-if="filteredItems.length === 0">
                                        <td colspan="8" class="text-center report-empty">
                                            <i class="fa fa-inbox d-block mb-2 report-empty-icon" aria-hidden="true"></i>
                                            No records found
                                        </td>
                                    </tr>
                                    <template v-else>
                                        <tr v-for="item in paginatedItems" :key="item.id">
                                            <td class="fw-semibold">#{{ item.id }}</td>
                                            <td>{{ item.store_name || '-' }}</td>
                                            <td>{{ item.customer_name }}</td>
                                            <td>{{ item.customer_mobile || '-' }}</td>
                                            <td>{{ formatDate(item.created_at) }}</td>
                                            <td class="text-end">{{ $currency }} {{ item.total_amount }}</td>
                                            <td><span class="figma-status-pill bg-info">{{ item.payment_method }}</span></td>
                                            <td>
                                                <button class="figma-action-btn mx-auto" v-b-tooltip.hover title="Invoice" @click="viewInvoice(item.id)">
                                                    <i class="fa fa-receipt" aria-hidden="true"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    </template>
                                </tbody>
                                <tfoot>
                                    <tr class="report-total-row">
                                        <td>Total</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td class="text-end">{{ $currency }} {{ footerTotal }}</td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                        <div class="figma-table-footer">
                            <div class="d-flex align-items-center gap-2">
                                <label for="per-page-select" class="showing-results-text mb-0">{{ __('per_page') }}</label>
                                <b-form-select id="per-page-select" v-model="perPage" :options="pageOptions"
                                    size="sm" class="form-control form-select report-per-page"
                                    @change="onPerPageChange"></b-form-select>
                                <table-count :current-page="currentPage" :per-page="perPage" :total-rows="totalRows"></table-count>
                            </div>
                            <b-pagination v-model="currentPage" :total-rows="totalRows" :per-page="perPage"
                                align="right" class="figma-pagination mb-0" @change="onPageChange"></b-pagination>
                        </div>
                    </div>
                </div>
            </section>
        </div>

        <!-- Invoice Modal -->
        <b-modal id="invoice-modal" size="xl" title="POS Invoice" hide-footer>
            <div class="invoice-container">
                <iframe :src="invoiceUrl" frameborder="0" style="width: 100%; height: 80vh;"></iframe>
            </div>
            <div class="d-flex justify-content-end gap-2 mt-3">
                <button class="btn btn-outline-secondary" @click="$bvModal.hide('invoice-modal')">Close</button>
                <button class="btn btn-primary" @click="printInvoice"><i class="fa fa-print me-1"></i>Print</button>
            </div>
        </b-modal>
    </div>
</template>
<script>
import DateRangePicker from 'vue2-daterange-picker';
import DateRangePickerMixin from '../../mixins/DateRangePickerMixin';
import moment from "moment";
export default {
    name: "pos_reports",
    mixins: [DateRangePickerMixin],
    components: { DateRangePicker },
    data: function () {
        return {
            showFilters: false,
            dateRange: { startDate: null, endDate: null },
            maxDate: new Date(),
            invoiceUrl: '',
            fields: [
                { key: 'id', label: 'Order ID', sortable: true, class: 'text-center' },
                { key: 'store_name', label: 'Store', sortable: true, class: 'text-center' },
                { key: 'customer_name', label: 'Customer', sortable: true, class: 'text-center' },
                { key: 'customer_mobile', label: 'Mobile Number', sortable: true, class: 'text-center' },
                { key: 'created_at', label: 'Date', sortable: true, class: 'text-center', formatter: this.formatDate },
                { key: 'total_amount', label: 'Total Amount', sortable: true, class: 'text-center' },
                { key: 'payment_method', label: 'Payment Method', sortable: true, class: 'text-center' },
                { key: 'actions', label: 'Invoice', class: 'text-center', tdClass: 'invoice-action-cell' },
            ],
            tableKey: 0, // Key to force table re-render
            totalRows: 0,
            currentPage: 1,
            perPage: this.$perPage,
            pageOptions: this.$pageOptions,
            filter: null,
            isLoading: false,
            posOrders: [],
            filteredItems: [],
            selectedPaymentMethod: null,
            selectedStore: null,
            paymentMethodOptions: [
                { value: null, text: 'All Payment Methods' },
                { value: 'cash', text: 'Cash' },
                { value: 'upi', text: 'UPI' },
                { value: 'card', text: 'Card' }
            ],
            storeOptions: [
                { value: null, text: 'All Stores' }
            ],
            footerTotal: '0.00',
            totalAmount: '0.00'
        }
    },
    mounted() {
        this.getStores();
    },
    created: function () {
        this.getPosOrders();
    },
    methods: {
        getStores() {
            // Fetch stores for the dropdown
            axios.get(this.$apiUrl + '/get-stores')
                .then((response) => {
                    if (response.data.status) {
                        // Add stores to the dropdown options
                        const stores = response.data.data.map(store => {
                            return { value: store.id, text: store.name }
                        });

                        // Merge with the default "All Stores" option
                        this.storeOptions = [
                            { value: null, text: 'All Stores' },
                            ...stores
                        ];
                    }
                })
                .catch(error => {
                    console.error('Error fetching stores:', error);
                });
        },

        getPosOrders() {
            this.isLoading = true;
            let params = {
                "startDate": (this.dateRange.startDate != null) ? moment(this.dateRange.startDate).format('YYYY-MM-DD') : "",
                "endDate": (this.dateRange.endDate != null) ? moment(this.dateRange.endDate).format('YYYY-MM-DD') : "",
                "payment_method": this.selectedPaymentMethod,
                "store_id": this.selectedStore
            };

            axios.get(this.$apiUrl + '/pos-reports', { params })
                .then((response) => {
                    this.isLoading = false;
                    if (response.data.status) {
                        this.posOrders = response.data.data;
                        this.filteredItems = [...this.posOrders];
                        this.totalRows = this.filteredItems.length;
                        this.calculateFooterTotal();
                        this.calculateTotalAmount();
                    } else {
                        this.showError(response.data.message);
                    }
                })
                .catch(error => {
                    this.isLoading = false;
                    this.showError("Error fetching POS orders");
                    console.error(error);
                });
        },

        formatDate(dateString) {
            return moment(dateString).format('DD/MM/YYYY');
        },

        calculateTotalAmount() {
            // Calculate grand total (all orders)
            this.totalAmount = this.posOrders.reduce((total, item) => {
                return total + parseFloat(item.total_amount || 0);
            }, 0).toFixed(2);
        },

        calculateFooterTotal() {
            // Calculate total for just the current page
            const start = (this.currentPage - 1) * this.perPage;
            const end = Math.min(start + this.perPage, this.filteredItems.length);
            const currentPageItems = this.filteredItems.slice(start, end);

            this.footerTotal = currentPageItems.reduce((total, item) => {
                return total + parseFloat(item.total_amount || 0);
            }, 0).toFixed(2);

            // Log for debugging
            console.log(`Items on page ${this.currentPage}:`, currentPageItems.length);
            console.log(`Current page totals:`, currentPageItems.map(i => parseFloat(i.total_amount)));
            console.log(`Footer total: ${this.footerTotal}`);
        },

        onFilterChanged() {
            if (this.filter) {
                const filterLC = this.filter.toLowerCase();
                this.filteredItems = this.posOrders.filter(item => {
                    return this.fields.some(field => {
                        const value = item[field.key];
                        return value && String(value).toLowerCase().includes(filterLC);
                    });
                });
            } else {
                this.filteredItems = [...this.posOrders];
            }

            this.totalRows = this.filteredItems.length;
            this.currentPage = 1; // Reset to first page when filtering
            this.tableKey++; // Force table re-render
            this.calculateFooterTotal();
        },

        onPageChange() {
            this.calculateFooterTotal();
            this.tableKey++; // Force table re-render
        },

        onPerPageChange() {
            this.currentPage = 1; // Reset to first page when changing per page
            this.calculateFooterTotal();
            this.tableKey++; // Force table re-render
        },

        viewInvoice(orderId) {
            // Set the invoice URL and show modal instead of opening in new tab
            this.invoiceUrl = `/admin/pos/invoice/${orderId}`;
            this.$bvModal.show('invoice-modal');
        },

        printInvoice() {
            const iframe = document.querySelector('#invoice-modal iframe');
            if (iframe) {
                iframe.contentWindow.print();
            }
        }
    },
    computed: {
        paginatedItems() {
            const start = (this.currentPage - 1) * this.perPage;
            const end = Math.min(start + this.perPage, this.filteredItems.length);
            return this.filteredItems.slice(start, end);
        }
    }
};
</script>

<style scoped>
@import "../../../../node_modules/vue2-daterange-picker/dist/vue2-daterange-picker.css";

.vue-daterange-picker[data-v-1ebd09d2] {
    min-width: 80%;
}

@media only screen and (min-width: 600px) {
    .vue-daterange-picker[data-v-1ebd09d2] {
        min-width: 90%;
    }
}

.order-details-header {
    background-color: var(--theme-neutral-100, #f8f9fa);
    padding: 15px;
    border-radius: 5px;
    margin-bottom: 20px;
}

.total-amount-display {
    font-weight: bold;
    font-size: 1.1rem;
    color: var(--theme-primary-500, #435ebe);
}

.invoice-action-cell {
    min-width: 100px;
}

.report-total-row td {
    font-weight: 700;
    color: var(--ui-heading);
    background: var(--ui-surface-muted);
    border-top: 1px solid var(--ui-border);
}

.report-empty {
    color: var(--ui-text-muted) !important;
    padding: 32px 16px !important;
}

.report-empty-icon {
    font-size: 28px;
    color: var(--ui-text-subtle);
}

.report-per-page {
    width: auto;
    min-width: 72px;
}

.figma-filter-section .vue-daterange-picker {
    min-width: 0;
}

@media (max-width: 575.98px) {
    .figma-table-footer {
        height: auto;
        flex-direction: column;
        gap: 12px;
        padding: 16px !important;
    }
}

</style>
