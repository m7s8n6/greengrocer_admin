<template>
    <div>
        <div class="page-heading d-flex justify-content-between align-items-center mb-4">
            <h3 class="modern-page-title mb-0">{{ __('cash_collection') }}</h3>
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb mb-0">
                    <li class="breadcrumb-item"><router-link to="/dashboard" class="text-muted">{{ __('dashboard')
                            }}</router-link></li>
                    <li class="breadcrumb-item active text-primary" aria-current="page">{{ __('cash_collection') }}</li>
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
                                    :placeholder="__('search') || 'Search...'" @input="getTransactions()">
                            </div>
                        </div>
                        <div class="d-flex gap-2">
                            <button class="btn btn-figma-filter d-flex align-items-center gap-2"
                                :class="{ 'active': showFilters }" @click="showFilters = !showFilters">
                                <base-icon name="Funnel" width="24" height="24" useCurrentColor />
                                <span>{{ __('filters') || 'Filters' }}</span>
                            </button>
                            <button class="btn btn-figma-filter d-flex align-items-center gap-2"
                                @click="create_new = true" v-if="$can('cash_collection_create')">
                                <i class="fa fa-plus"></i>
                                <span>{{ __('add_cash_collection') }}</span>
                            </button>
                            <button class="btn btn-figma-filter d-flex align-items-center gap-2"
                                @click="getTransactions()" v-b-tooltip.hover :title="__('refresh')">
                                <i class="fa fa-refresh"></i>
                                <span>{{ __('refresh') }}</span>
                            </button>
                        </div>
                    </div>

                    <b-collapse v-model="showFilters">
                        <div class="figma-filter-section">
                            <div class="row g-4">
                                <div class="col-md-4">
                                    <div class="figma-filter-group">
                                        <label class="figma-filter-label">{{ __('from_to_date') }}</label>
                                        <div class="d-flex align-items-center gap-2">
                                            <date-range-picker :single-date-picker="'range'" :autoApply=false
                                                :showDropdowns=true v-model="dateRange" :maxDate="maxDate"
                                                @update="getTransactions" opens="right"
                                                append-to-body></date-range-picker>
                                            <button class="btn btn-sm btn-danger"
                                                @click="dateRange.startDate = null, dateRange.endDate = null, getTransactions()">
                                                {{ __('clear') }}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="figma-filter-group">
                                        <label class="figma-filter-label">{{ __('delivery_boy') }}</label>
                                        <select name="delivery_boy" id="delivery_boy" v-model="deliveryBoy"
                                            @change="getTransactions()" class="form-control form-select modern-select">
                                            <option value="">{{ __('all_delivery_boy') }}</option>
                                            <option v-for="deliveryBoy in deliveryBoys" :value="deliveryBoy.id">{{
                                                getTranslatedName(deliveryBoy) }}</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </b-collapse>
                    <div class="table-responsive">
                        <b-table :items="transactions" :fields="fields" :current-page="currentPage" :per-page="perPage"
                            :filter="filter" :filter-included-fields="filterOn" :sort-by.sync="sortBy"
                            :sort-desc.sync="sortDesc" :sort-direction="sortDirection" :bordered="false"
                            :busy="isLoading" stacked="md" show-empty :tbody-tr-class="() => 'figma-tr align-middle'"
                            small class="figma-order-table mb-0">
                            <template #table-busy>
                                <div class="text-center text-black my-2">
                                    <b-spinner class="align-middle"></b-spinner>
                                    <strong>{{ __('loading') }}...</strong>
                                </div>
                            </template>
                            <template #cell(amount)="row">
                                <span v-if="row.item.type === 'Delivery Boy Cash Collection'">{{
                                    row.item.collected_amount }}</span>
                                <span v-else>{{ row.item.amount }}</span>
                            </template>
                            <template #cell(status)="row">
                                <span v-if="row.item.status === '1'" class="badge bg-success">{{ __('active')
                                }}</span>
                                <span v-else class="badge bg-danger">{{ __('deactive') }}</span>
                            </template>
                            <template #cell(created_at)="row">
                                {{ row.item.transaction_date }}
                            </template>
                            <template #cell(name)="row">
                                {{ getTranslatedName(row.item) }}
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
        <app-edit-record v-if="create_new || edit_record" :record="edit_record" :deliveryBoys="deliveryBoys"
            @modalClose="hideModal()"></app-edit-record>
    </div>
</template>

<script>
import EditRecord from './Edit';
import DateRangePicker from 'vue2-daterange-picker'
import moment from "moment";
export default {
    name: "range_dates",
    components: {
        DateRangePicker,
        'app-edit-record': EditRecord,
    },
    data: function () {
        return {
            dateRange: { startDate: null, endDate: null },
            maxDate: new Date(),
            fields: [
                { key: 'id', label: __('id'), sortable: true, sortDirection: 'desc' },
                { key: 'name', label: ('name'), sortable: true, class: 'text-center' },
                { key: 'mobile', label: __('mobile'), sortable: true, class: 'text-center' },
                { key: 'order_id', label: __('order_id'), sortable: true, class: 'text-center' },
                { key: 'final_total', label: __('final_total') + '(' + this.$currency + ')', sortable: true, class: 'text-center' },
                { key: 'amount', label: __('amount') + '(' + this.$currency + ')', sortable: true, class: 'text-center' },
                { key: 'type', label: __('type'), sortable: true, class: 'text-center' },
                { key: 'delivery_boy_bonus_amount', label: __('bonus_amount') + '(' + this.$currency + ')', sortable: true, class: 'text-center' },
                { key: 'message', label: __('message'), sortable: true, class: 'text-center' },
                { key: 'transaction_date', label: __('date_time'), sortable: true, class: 'text-center' }
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

            deliveryBoys: null,
            deliveryBoy: "",
            transactions: [],
            showFilters: false,
            currentLanguageId: null,
            activeLanguages: []
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
        this.totalRows = this.transactions.length
    },
    created: function () {
        this.$eventBus.$on('transactionsSaved', (message) => {
            this.showMessage("success", message);
            this.getTransactions();
            this.create_new = null;
        });
        this.fetchActiveLanguages().then(() => {
            this.getTransactions();
        });
    },
    methods: {
        async fetchActiveLanguages() {
            try {
                const res = await axios.get(this.$apiUrl + '/active_languages');

                if (res.data.status === 1 && Array.isArray(res.data.data)) {
                    this.activeLanguages = res.data.data;

                    const appLocale = window.appLocale || 'en';

                    const currentLang = this.activeLanguages.find(
                        l => l.code === appLocale
                    );

                    if (currentLang) {
                        this.currentLanguageId = currentLang.id;
                    } else {
                        const def = this.activeLanguages.find(l => l.is_default === 1);
                        if (def) this.currentLanguageId = def.id;
                    }
                }
            } catch (e) {
                console.error('Language load failed', e);
            }
        },
        getTranslatedName(item) {
            // If no language is set, return main table name
            if (!this.currentLanguageId) {
                return item.name || '';
            }

            // Check if item has translations array
            if (item.translations && Array.isArray(item.translations)) {
                const translation = item.translations.find(
                    t => t.language_id === this.currentLanguageId
                );

                // Use translation if it exists and has value
                if (translation && translation.name && translation.name.trim() !== '') {
                    return translation.name;
                }
            }

            // Fallback: Use main table name if no translation found
            return item.name || '';
        },
        getTransactions() {
            this.isLoading = true
            let param = {
                "startDate": (this.dateRange.startDate != null) ? moment(this.dateRange.startDate).format('YYYY-MM-DD') : "",
                "endDate": (this.dateRange.endDate != null) ? moment(this.dateRange.endDate).format('YYYY-MM-DD') : "",
                "delivery_boy_id": this.deliveryBoy,
            }
            axios.get(this.$apiUrl + '/cash_collection', {
                params: param
            }).then((response) => {
                this.transactions = response.data.data.transactions;
                this.deliveryBoys = response.data.data.deliveryBoys;
                this.totalRows = this.transactions.length;
                this.isLoading = false;
            });
        },
        hideModal() {
            this.create_new = false
            this.edit_record = false
        },
    }
};
</script>
<style>
@import "../../../../../node_modules/vue2-daterange-picker/dist/vue2-daterange-picker.css";

.vue-daterange-picker[data-v-1ebd09d2] {
    min-width: 80%;
}

@media only screen and (min-width: 600px) {
    .vue-daterange-picker[data-v-1ebd09d2] {
        min-width: 90%;
    }
}
</style>
