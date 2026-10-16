<template>
    <div>
        <div class="page-heading d-flex justify-content-between align-items-center mb-4">
            <h3 class="modern-page-title mb-0">{{ __('fund_transfers') }}</h3>
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb mb-0">
                    <li class="breadcrumb-item"><router-link to="/dashboard" class="text-muted">{{ __('dashboard')
                            }}</router-link></li>
                    <li class="breadcrumb-item active text-primary" aria-current="page">{{ __('fund_transfers') }}</li>
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
                                    :placeholder="__('search') || 'Search...'" @input="getFundTransfers()">
                            </div>
                        </div>
                        <div class="d-flex gap-2">
                            <button class="btn btn-figma-filter d-flex align-items-center gap-2"
                                @click="create_new = true" v-if="$can('fund_transfers_create')">
                                <i class="fa fa-plus"></i>
                                <span>{{ __('add_fund_transfers') }}</span>
                            </button>
                            <button class="btn btn-figma-filter d-flex align-items-center gap-2"
                                @click="getFundTransfers()" v-b-tooltip.hover :title="__('refresh')">
                                <i class="fa fa-refresh"></i>
                                <span>{{ __('refresh') }}</span>
                            </button>
                        </div>
                    </div>
                    <div class="table-responsive">
                        <b-table :items="fundTransfers" :fields="fields" :current-page="currentPage" :per-page="perPage"
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
                            <template #head(opening_balance)="row">
                                {{ __('opening_balance') }}{{ ' (' + $currency + ')' }}
                            </template>
                            <template #head(closing_balance)="row">
                                {{ __('closing_balance') }}{{ ' (' + $currency + ')' }}
                            </template>
                            <template #head(amount)="row">
                                {{ __('amount') }}{{ ' (' + $currency + ')' }}
                            </template>

                            <template #cell(type)="row">
                                <span v-if="row.item.type === 'credit'" class="badge bg-success">{{ __('credit')
                                    }}</span>
                                <span v-else class="badge bg-danger">{{ __('debit') }}</span>
                            </template>

                            <template #cell(status)="row">
                                <span v-if="row.item.status === 1 || row.item.status === '1'"
                                    class="badge bg-success">{{ __('active') }}</span>
                                <span v-else class="badge bg-danger">{{ __('deactive') }}</span>
                            </template>

                            <template #cell(name)="row">
                                {{ getTranslatedName(row.item) }}
                            </template>

                            <template #cell(created_at)="row">
                                {{ row.item.created_at }}
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
export default {
    components: {
        'app-edit-record': EditRecord,
    },
    data: function () {
        return {
            fields: [
                { key: 'id', label: __('id'), sortable: true, sortDirection: 'desc' },
                { key: 'delivery_boy_id', label: __('d_boy_id'), sortable: true, class: 'text-center' },
                { key: 'name', label: __('name'), sortable: true, class: 'text-center' },
                { key: 'mobile', label: __('mobile'), sortable: true, class: 'text-center' },
                { key: 'address', label: __('address'), sortable: true, class: 'text-center' },
                { key: 'opening_balance', label: __('opening_balance'), sortable: true, class: 'text-center' },
                { key: 'closing_balance', label: __('closing_balance'), sortable: true, class: 'text-center' },
                { key: 'amount', label: __('amount'), sortable: true, class: 'text-center' },
                { key: 'type', label: __('type'), sortable: true, class: 'text-center' },
                { key: 'message', label: __('message'), sortable: true, class: 'text-center' },
                { key: 'status', label: __('status'), sortable: true, class: 'text-center' },
                { key: 'created_at', label: __('date_created'), sortable: true, class: 'text-center' }
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

            deliveryBoys: [],
            fundTransfers: [],
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
        this.totalRows = this.fundTransfers.length
    },
    created: function () {
        this.$eventBus.$on('fundTransfersSaved', (message) => {
            this.showMessage("success", message);
            this.getFundTransfers();
            this.create_new = null;
        });
        this.fetchActiveLanguages().then(() => {
            this.getFundTransfers();
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
        getFundTransfers() {
            this.isLoading = true
            axios.get(this.$apiUrl + '/fund_transfers')
                .then((response) => {
                    this.isLoading = false
                    this.deliveryBoys = response.data.data.deliveryBoys;
                    this.fundTransfers = response.data.data.fundTransfers;
                    this.totalRows = this.fundTransfers.length
                });
        },
        hideModal() {
            this.create_new = false
            this.edit_record = false
        },
    }
};
</script>
