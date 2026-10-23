<template>
    <div>
        <div class="invoice-page">
            <div class="page-heading d-flex flex-wrap justify-content-between align-items-center gap-2 mb-4">
                    <h3 class="mb-0">Invoice</h3>
                    <nav aria-label="breadcrumb" class="breadcrumb-header">
                        <ol class="breadcrumb mb-0">
                            <li class="breadcrumb-item" v-if="isSellerRoute">
                                <router-link to="/seller/dashboard">{{ __('dashboard') }}</router-link>
                            </li>
                             <li class="breadcrumb-item" v-else-if="isDeliveryBoyRoute">
                                <router-link to="/delivery_boy/">{{ __('dashboard') }}</router-link>
                            </li>
                            <li class="breadcrumb-item" v-else>
                                <router-link to="/dashboard">{{ __('dashboard') }}</router-link>
                            </li>

                            <li class="breadcrumb-item" v-if="isSellerRoute">
                                <router-link to="/seller/orders">View Order</router-link>
                            </li>
                            <li class="breadcrumb-item" v-else-if="isDeliveryBoyRoute">
                                <router-link to="/delivery_boy/orders">View Order</router-link>
                            </li>
                            <li class="breadcrumb-item" v-else>
                                <router-link to="/orders">View Order</router-link>
                            </li>

                            <li class="breadcrumb-item" v-if="isSellerRoute">
                                <router-link :to="'/seller/orders/view/'+id">Order Details</router-link>
                            </li>
                            <li class="breadcrumb-item" v-else-if="isDeliveryBoyRoute">
                                <router-link :to="'/delivery_boy/orders/view/'+id">Order Details</router-link>
                            </li>
                            <li class="breadcrumb-item" v-else>
                                <router-link :to="'/orders/view/'+id">Order Details</router-link>
                            </li>
                            <li class="breadcrumb-item active" aria-current="page">Invoice</li>
                        </ol>
                    </nav>
            </div>

            <div class="card invoice-card">
                <div class="invoice-card-header">
                    <h5 class="invoice-card-title mb-0">Invoice <span v-if="id">#{{ id }}</span></h5>
                    <button type="button" v-print="'#printMe'"  v-b-tooltip.hover title="Print" class="btn btn-outline-primary invoice-print-btn" ><i class="fa fa-print"></i> Print</button>
                </div>
                <div class="card-body invoice-card-body">
                    <section class="invoice" id="printMe" v-html="invoice">

                    </section>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from "axios";
import moment from "moment";
import print from 'vue-print-nb'
export default {
    directives: {
        print
    },
    data: function () {
        return {
            id: null,
            invoice:""
        }
    },
    computed: {
        isSellerRoute() {
        // Use this.$route to access the current route
        return this.$route.path.startsWith('/seller/');
        },
        isDeliveryBoyRoute() {
      // Use this.$route to access the current route
      return this.$route.path.startsWith('/delivery_boy/');
    },
    },

    created: function () {
        this.id = this.$route.params.id;

        if (this.id) {
            this.getInvoice();
        }
    },
    filters: {
        moment: function (date) {

            return moment(date).format('D-MMMM-YYYY, h:mm:ss A');
        }
    },
    methods: {
        moment: function () {
            return moment();
        },
        getInvoice(){
            this.isLoading = true
            let param = {
                "order_id": this.id,
            }
            axios.get(this.$apiUrl + '/orders/invoice/', {
                params: param
            })
            .then((response) => {
                this.isLoading = false
                let data = response.data;
                if (data.status === 1) {
                    this.invoice = response.data.data;
                } else {
                    this.showError(data.message);
                    setTimeout(() => {
                        //this.$router.push('/login');
                        this.$router.back();
                    }, 1000);
                }
            }).catch(error => {
                this.isLoading = false;
                if (error.request.statusText) {
                    this.showError(error.request.statusText);
                }else if (error.message) {
                    this.showError(error.message);
                } else {
                    this.showError(__('something_went_wrong'));
                }
            });
        },
    }
};
</script>
<style scoped>
@page {
    size: auto;
    margin: 0mm;
}

.borderless td,
.heading th {
    border: none !important;
    padding: 0px !important;
}

address {
    margin-bottom: 1px;
    font-style: normal;
    line-height: 1.42857143;
}

p {
    margin: 0 0 0px;
}

/* ===== Invoice card ===== */
.invoice-card {
    border: 1px solid var(--ui-border, var(--ui-border));
    border-radius: var(--ui-radius-lg, 12px);
    box-shadow: var(--ui-shadow);
    overflow: hidden;
}

.invoice-card-header {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 12px 20px;
    border-bottom: 1px solid var(--ui-border, var(--ui-border));
}

.invoice-card-title {
    font-family: var(--ui-font);
    font-weight: 700;
    font-size: 15px;
    color: var(--ui-heading, var(--theme-neutral-900));
}

.invoice-print-btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    height: 38px;
    padding: 0 16px;
    font-size: 13px;
    font-weight: 600;
    border-radius: var(--ui-radius, 8px);
}

.invoice-card-body {
    padding: 20px;
}

.invoice {
    position: relative;
    max-width: 920px;
    margin: 0 auto;
    padding: 0;
    background: var(--ui-surface);
    border: none;
    font-family: var(--ui-font);
    font-size: 13px;
    line-height: 20px;
    color: var(--ui-text, var(--theme-neutral-800));
}

/* The invoice markup comes from the server (v-html), so it is styled with ::v-deep */
.invoice ::v-deep .invoice {
    margin: 0 !important;
    padding: 24px !important;
    border: 1px solid var(--ui-border, var(--ui-border)) !important;
    border-radius: var(--ui-radius-lg, 12px);
    background: var(--ui-surface) !important;
}

.invoice ::v-deep .page-header {
    margin: 0;
    font-weight: 700;
    font-size: 18px;
    line-height: 26px;
    color: var(--ui-heading, var(--theme-neutral-900));
}

.invoice ::v-deep hr {
    margin: 16px 0;
    border-color: var(--ui-border, var(--ui-border));
    opacity: 1;
}

.invoice ::v-deep .d-flex {
    flex-wrap: wrap;
    gap: 12px 24px;
    align-items: flex-start !important;
}

.invoice ::v-deep .invoice-col {
    flex: 1 1 200px;
    text-align: start;
}

.invoice ::v-deep .invoice-col > b,
.invoice ::v-deep .col-md-4 > b,
.invoice ::v-deep .h6 {
    display: block;
    margin-bottom: 4px;
    font-weight: 700;
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: .03em;
    color: var(--ui-text-muted, var(--theme-neutral-500));
}

.invoice ::v-deep address,
.invoice ::v-deep p {
    margin-bottom: 2px;
    font-size: 13px;
    line-height: 20px;
}

.invoice ::v-deep .row {
    margin-left: 0;
    margin-right: 0;
}

.invoice ::v-deep .col-md-4,
.invoice ::v-deep .col-md-3 {
    padding-left: 0;
    padding-right: 0;
    text-align: start;
}

.invoice ::v-deep .table-responsive {
    width: 100%;
    padding: 0;
    overflow-x: auto;
    border: none;
}

.invoice ::v-deep table.table {
    display: table;
    width: 100%;
    margin-bottom: 0;
    border: 1px solid var(--ui-border, var(--ui-border));
}

.invoice ::v-deep table.table thead th {
    padding: 10px 12px;
    background: var(--ui-surface-muted, var(--theme-neutral-100));
    border-bottom: 1px solid var(--ui-border, var(--ui-border));
    font-weight: 600;
    font-size: 12px;
    text-transform: uppercase;
    color: var(--ui-text-muted, var(--theme-neutral-500));
    white-space: nowrap;
}

.invoice ::v-deep table.table td,
.invoice ::v-deep table.table tfoot th {
    padding: 10px 12px;
    font-size: 13px;
    border-color: var(--ui-border, var(--ui-border));
}

.invoice ::v-deep table.table tfoot th,
.invoice ::v-deep table.table tfoot td {
    font-weight: 700;
    background: var(--ui-surface-muted, var(--theme-neutral-100));
}

/* Totals block (second table, no .table class) */
.invoice ::v-deep table:not(.table) {
    min-width: 280px;
    margin-left: auto;
    border-collapse: collapse;
}

.invoice ::v-deep table:not(.table) tr {
    height: auto !important; /* global table row heights (52px) would stretch the totals list */
}

.invoice ::v-deep table:not(.table) th,
.invoice ::v-deep table:not(.table) td {
    height: auto !important;
    padding: 6px 0 !important; /* beats global table cell padding */
    font-size: 13px;
    border-bottom: 1px solid var(--ui-border, var(--ui-border));
}

.invoice ::v-deep table:not(.table) th {
    font-weight: 400;
    color: var(--ui-text-muted, var(--theme-neutral-600));
    padding-right: 24px;
}

.invoice ::v-deep table:not(.table) td {
    text-align: right;
    font-weight: 600;
    color: var(--ui-heading, var(--theme-neutral-900));
}

.invoice ::v-deep table:not(.table) tr:last-child th,
.invoice ::v-deep table:not(.table) tr:last-child td {
    padding-top: 10px;
    border-bottom: none;
    font-weight: 700;
    font-size: 15px;
    color: var(--ui-heading, var(--theme-neutral-900));
}

@media (max-width: 575.98px) {
    .invoice-card-body {
        padding: 12px;
    }

    .invoice ::v-deep .invoice {
        padding: 16px !important;
    }

    .invoice ::v-deep table:not(.table) {
        min-width: 0;
        width: 100%;
    }

    .invoice ::v-deep .table-responsive {
        flex: 1 1 100%;
    }
}

@media print {
    .invoice ::v-deep .invoice {
        border: none !important;
        padding: 0 !important;
    }
}
</style>
