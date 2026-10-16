<template>
    <div>
        <div class="page-heading d-flex justify-content-between align-items-center mb-4">
            <h3 class="modern-page-title mb-0">{{ __('delivery_boys') }}</h3>
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb mb-0">
                    <li class="breadcrumb-item"><router-link to="/dashboard" class="text-muted">{{ __('dashboard')
                    }}</router-link></li>
                    <li class="breadcrumb-item active text-primary" aria-current="page">{{ __('delivery_boys') }}</li>
                </ol>
            </nav>
        </div>
        <section class="section">
            <div class="figma-main-section-card">
                <div class="card-header border-0 bg-transparent py-3">
                    <h4 class="card-title mb-0 figma-card-title">{{ __('delivery_boys') }}</h4>
                </div>
                <div class="card-body p-0">
                    <!-- Modern Filter Action Bar -->
                    <div class="d-flex justify-content-between align-items-center flex-wrap gap-2 figma-action-bar-row">
                        <div class="flex-grow-1">
                            <div class="figma-search-container">
                                <i class="fa fa-search text-muted"></i>
                                <input v-model="filter" type="text" class="figma-search-input"
                                    :placeholder="__('search') || 'Search...'" @input="getDeliveryBoys()">
                            </div>
                        </div>
                        <div class="d-flex gap-2">
                            <button class="btn btn-figma-filter d-flex align-items-center gap-2"
                                :class="{ 'active': showFilters }" @click="showFilters = !showFilters">
                                <base-icon name="Funnel" width="24" height="24" useCurrentColor />
                                <span>{{ __('filters') || 'Filters' }}</span>
                            </button>
                            <router-link to="/delivery_boys/create"
                                class="btn btn-figma-filter d-flex align-items-center gap-2"
                                v-if="$can('delivery_boy_create')">
                                <i class="fa fa-plus"></i>
                                <span>{{ __('add_delivery_boy') }}</span>
                            </router-link>
                            <button class="btn btn-figma-filter d-flex align-items-center gap-2"
                                @click="getDeliveryBoys()" v-b-tooltip.hover :title="__('refresh')">
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
                                        <label class="figma-filter-label">{{ __('status') }}</label>
                                        <select id="filterStatus" name="filterStatus" v-model="filterStatus"
                                            @change="getDeliveryBoys()" class="form-control form-select modern-select">
                                            <option value="">{{ __('all') }}</option>
                                            <option value="1">{{ __('active') }}</option>
                                            <option value="2">{{ __('not_approved') }}</option>
                                            <option value="3">{{ __('deactive') }}</option>
                                            <option value="4">{{ __('blocked') }}</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </b-collapse>
                    <div class="table-responsive">
                        <b-table :items="translatedDeliveryBoys" :fields="fields" :current-page="currentPage"
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
                            <template #head(balance)="row">
                                {{ __('balance') }}{{ ' (' + $currency + ')' }}
                            </template>
                            <template #head(cash_received)="row">
                                {{ __('cash_received') }} {{ '(' + $currency + ')' }}
                            </template>

                            <template #cell(mobile)="row">
                                {{ row.item.mobile | mobileMask }}
                            </template>

                            <template #cell(bonus_percentage)="row">
                                <div>
                                    <small class="d-inline-flex mb-3 px-2 py-1 text-muted bg-secondary bg-opacity-10 border border-secondary border-opacity-10 rounded-2"
                                        v-b-tooltip.hover="{ html: true, title: bonusDetailsHtml(row.item), boundary: 'window' }">
                                        <i class="fa fa-info-circle"></i>
                                    </small>
                                </div>
                            </template>

                            <template #cell(status)="row">
                                <label v-if="row.item.status == 0" class='badge bg-primary'>{{ __('registered')
                                    }}</label>
                                <label v-else-if="row.item.status == 1" class='badge bg-success'>{{ __('active')
                                    }}</label>
                                <label v-else-if="row.item.status == 2" class='badge bg-warning'>{{
                                    __('not_approved') }}</label>
                                <label v-else-if="row.item.status == 3" class='badge bg-danger'>{{ __('deactive')
                                    }}</label>
                                <label v-else-if="row.item.status == 4" class='badge bg-black'>{{ __('blocked')
                                    }}</label>
                                <label v-else-if="row.item.status == 7" class='badge bg-danger'>{{ __('removed')
                                    }}</label>
                            </template>

                            <template #cell(is_available)="row">
                                <span v-if="row.item.status == 1" class="badge bg-success">{{ __('yes') }}</span>
                                <span v-else class="badge bg-danger">{{ __('no') }}</span>
                            </template>

                            <template #cell(actions)="row">
                                <div class="d-flex gap-2">
                                    <router-link
                                        :to="{ name: 'EditDeliveryBoy', params: { id: row.item.id, record: row.item } }"
                                        class="figma-action-btn" v-if="$can('seller_update')" v-b-tooltip.hover
                                        :title="__('edit')">
                                        <base-icon name="edit icon" hoverName="edit Hover" width="24" height="24" />
                                    </router-link>

                                    <button class="figma-action-btn figma-delete-btn"
                                        @click="deleteDeliveryBoys(row.index, row.item.id)"
                                        v-if="$can('delivery_boy_delete')" v-b-tooltip.hover :title="__('delete')">
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
import EditRecord from './Edit';
export default {
    components: {
        'app-edit-record': EditRecord,
    },
    data: function () {
        return {
            fields: [
                { key: 'id', label: __('id'), sortable: true, sortDirection: 'desc' },
                { key: 'name', label: __('name'), sortable: true, class: 'text-center' },
                { key: 'mobile', label: __('mobile'), sortable: true, class: 'text-center' },
                { key: 'email', label: __('email'), sortable: true, class: 'text-center' },
                { key: 'address', label: __('address'), sortable: true, class: 'text-center' },
                { key: 'bonus_percentage', label: __('bonus'), sortable: true, class: 'text-center' },
                { key: 'balance', label: __('balance'), sortable: true, class: 'text-center' },
                { key: 'cash_received', label: __('cash_received'), sortable: true, class: 'text-center' },
                { key: 'status', label: __('status'), sortable: true, class: 'text-center' },
                { key: 'is_available', label: __('available'), class: 'text-center' },
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
            create_new: null,
            edit_record: null,

            categories: null,
            products: null,

            deliveryBoys: [],
            filterStatus: '',
            showFilters: false,
            currentLanguageId: null,
            activeLanguages: []
        }
    },
    computed: {
        translatedDeliveryBoys() {
            if (!this.currentLanguageId || !Array.isArray(this.deliveryBoys)) {
                return this.deliveryBoys;
            }

            return this.deliveryBoys.map(boy => {
                const translatedBoy = { ...boy };

                if (boy.translations && Array.isArray(boy.translations)) {
                    const translation = boy.translations.find(
                        t => t.language_id === this.currentLanguageId
                    );

                    if (translation) {
                        // translate fields safely
                        if (translation.name && translation.name.trim() !== '') {
                            translatedBoy.name = translation.name;
                        }

                        if (translation.address && translation.address.trim() !== '') {
                            translatedBoy.address = translation.address;
                        }

                        if (translation.other_payment_information && translation.other_payment_information.trim() !== '') {
                            translatedBoy.other_payment_information = translation.other_payment_information;
                        }
                    }
                }

                return translatedBoy;
            });
        },
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
        this.totalRows = this.deliveryBoys.length
    },

    created: function () {
        this.$eventBus.$on('deliveryBoysSaved', (message) => {
            this.showMessage("success", message);
            this.getDeliveryBoys();
            this.create_new = null;
        });
        this.fetchActiveLanguages().then(() => {
            this.getDeliveryBoys();
        });
    },
    methods: {
        escapeHtml(value) {
            const div = document.createElement('div');
            div.textContent = value ?? '';
            return div.innerHTML;
        },
        bonusDetailsHtml(item) {
            const rows = [
                [__('bonus_type'), item.bonus_type === 1 ? 'Commission' : 'Fixed/Salaried'],
            ];
            if (item.bonus_type === 1) {
                rows.push([__('commission'), item.bonus_percentage]);
            }
            rows.push([`${__('min_amount')} (${this.$currency})`, item.bonus_min_amount]);
            rows.push([`${__('max_amount')} (${this.$currency})`, item.bonus_max_amount]);

            const rowsHtml = rows.map(([label, value]) =>
                `<tr><th>${this.escapeHtml(label)}</th><td class="text-end">${this.escapeHtml(value)}</td></tr>`
            ).join('');

            return `<div class="text-start"><strong>${this.escapeHtml(__('bonus_details'))}</strong>`
                + `<table class="table table-borderless mb-0">${rowsHtml}</table></div>`;
        },
        fetchActiveLanguages() {
            return axios.get(this.$apiUrl + '/active_languages')
                .then(response => {
                    if (Array.isArray(response.data.data)) {
                        this.activeLanguages = response.data.data;

                        const appLocale = window.appLocale || 'en';

                        const currentLanguage = this.activeLanguages.find(
                            lang => lang.code === appLocale
                        );

                        if (currentLanguage) {
                            this.currentLanguageId = currentLanguage.id;
                        } else {
                            const defaultLang = this.activeLanguages.find(
                                lang => lang.is_default === 1
                            );
                            if (defaultLang) {
                                this.currentLanguageId = defaultLang.id;
                            }
                        }
                    }
                })
                .catch(err => {
                    console.error('Language load error:', err);
                });
        },
        getDeliveryBoys() {
            this.isLoading = true

            axios.get(this.$apiUrl + '/delivery_boys', {
                params: {
                    filterStatus: this.filterStatus,
                    search: this.filter
                }
            })
                .then((response) => {
                    this.isLoading = false
                    this.deliveryBoys = response.data.data.filter(boy => boy.status !== 0) || []
                    this.totalRows = this.deliveryBoys.length
                });
        },
        deleteDeliveryBoys(index, id) {
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
                    axios.post(this.$apiUrl + '/delivery_boys/delete', postData)
                        .then((response) => {
                            this.isLoading = false
                            this.deliveryBoys.splice(index, 1)
                            this.showMessage('success', response.data.message);
                        });
                }
            });
        },

        hideModal() {
            this.create_new = false
            this.edit_record = false
            this.$router.push({ path: '/delivery_boys' });
        },
    }
};
</script>
