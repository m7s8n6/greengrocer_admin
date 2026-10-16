<template>
    <div>
        <div class="page-heading d-flex justify-content-between align-items-center mb-4">
            <h3 class="modern-page-title mb-0">{{ __('delivery_boy_salary') }}</h3>
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb mb-0">
                    <li class="breadcrumb-item"><router-link :to="isSellerRoute ? '/seller/dashboard' : (isDeliveryBoyRoute ? '/delivery_boy/dashboard' : '/dashboard')" class="text-muted">{{ __('dashboard') }}</router-link></li>
                    <li class="breadcrumb-item active text-primary" aria-current="page">{{ __('delivery_boy_salary') }}</li>
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
                                <input v-model="filter" type="text" class="figma-search-input" :placeholder="__('search') || 'Search...'" @input="getSalaries()">
                            </div>
                        </div>
                        <div class="d-flex gap-2">
                            <button class="btn btn-figma-filter d-flex align-items-center gap-2" :class="{'active': showFilters}" @click="showFilters = !showFilters">
                                <base-icon name="Funnel" width="24" height="24" useCurrentColor />
                                <span>{{ __('filters') || 'Filters' }}</span>
                            </button>
                            <button class="btn btn-figma-filter d-flex align-items-center gap-2" @click="create_new = true" v-if="$can('salary_create')">
                                <i class="fa fa-plus"></i>
                                <span>{{ __('add_salary') }}</span>
                            </button>
                            <button class="btn btn-figma-filter d-flex align-items-center gap-2" @click="getSalaries()" v-b-tooltip.hover :title="__('refresh')">
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
                                            <date-range-picker :single-date-picker="'range'" :autoApply="false"
                                                :showDropdowns="true" v-model="dateRange" :maxDate="maxDate"
                                                @update="getSalaries" opens="right" append-to-body></date-range-picker>
                                            <button class="btn btn-sm btn-danger"
                                                @click="dateRange.startDate = null; dateRange.endDate = null; getSalaries()">
                                                {{ __('clear') }}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </b-collapse>

                    <div class="table-responsive">
                        <b-table :items="salaries" :fields="fields" :current-page="currentPage" :per-page="perPage"
                            :filter="filter" :filter-included-fields="filterOn" :sort-by.sync="sortBy"
                            :sort-desc.sync="sortDesc" :sort-direction="sortDirection" :bordered="false"
                            :busy="isLoading" stacked="md" show-empty :tbody-tr-class="() => 'figma-tr align-middle'" small class="figma-order-table mb-0">
                            <template #table-busy>
                                <div class="text-center text-black my-2">
                                    <b-spinner class="align-middle"></b-spinner>
                                    <strong>{{ __('loading') }}...</strong>
                                </div>
                            </template>
                            <template #head(amount)="data">
                                {{ __('salary') }}{{ ' (' + $currency + ')' }}
                            </template>
                            <template #cell(paid_on)="row">
                                {{ formatDate(row.item.paid_on) }}
                            </template>
                            <template #cell(actions)="row">
                                <div class="d-flex gap-2 justify-content-center">
                                    <button v-if="$can('salary_update')"
                                        @click="editRecord(row.item)" class="figma-action-btn" v-b-tooltip.hover :title="__('edit')">
                                        <base-icon name="edit icon" hoverName="edit Hover" width="24" height="24" />
                                    </button>
                                    <button v-if="$can('salary_delete')"
                                        @click="deleteRecord(row.item.id)" class="figma-action-btn figma-delete-btn" v-b-tooltip.hover :title="__('delete')">
                                        <base-icon name="Type=Default" hoverName="Type=Hover" width="24" height="24" />
                                    </button>
                                </div>
                            </template>
                        </b-table>
                    </div>

                    <div class="figma-table-footer">
                        <div class="showing-results-text">
                            {{ __('Showing Result') }} : <span class="showing-bold">{{ pageEnd }}</span> {{ __('of') || 'of' }} <span class="showing-bold">{{ totalRows }}</span>
                        </div>
                        <b-pagination v-model="currentPage" :total-rows="totalRows" :per-page="perPage" align="right" 
                            class="figma-pagination mb-0"></b-pagination>
                    </div>
                </div>
            </div>
        </section>

        <!-- Add / Edit -->
        <edit-salary v-if="create_new || edit_record" :record="edit_record" :deliveryBoys="deliveryBoys"
            @modalClose="hideModal()"></edit-salary>
    </div>
</template>

<script>
import EditSalary from './EditSalary';
import DateRangePicker from 'vue2-daterange-picker'
import moment from "moment";

export default {
    name: 'DeliveryBoySalary',
    components: {
        'edit-salary': EditSalary,
        DateRangePicker
    },
    data: function () {
        return {
            fields: [
                { key: 'id', label: __('id'), sortable: true, sortDirection: 'desc' },
                { key: 'delivery_boy_name', label: __('delivery_boy'), sortable: true, class: 'text-center' },
                { key: 'amount', label: __('salary'), sortable: true, class: 'text-center' },
                { key: 'message', label: __('message'), sortable: true, class: 'text-center' },
                { key: 'paid_on', label: __('date'), sortable: true, class: 'text-center' },
                { key: 'actions', label: __('actions'), class: 'text-center' }
            ],
            dateRange: { startDate: null, endDate: null },
            maxDate: new Date(),
            deliveryBoys: [],
            deliveryBoy: "",
            totalRows: 1,
            currentPage: 1,
            perPage: this.$perPage,
            pageOptions: this.$pageOptions,
            sortBy: '',
            sortDesc: false,
            sortDirection: 'asc',
            filter: null,
            filterOn: [],
            isLoading: false,
            create_new: null,
            edit_record: null,
            salaries: [],
            showFilters: false,
            dateFormat: 'DD-MM-YYYY',
        }
    },
    computed: {
        isSellerRoute() {
            return this.$route.path.startsWith('/seller/');
        },
        isDeliveryBoyRoute() {
            return this.$route.path.startsWith('/delivery_boy/');
        },
        pageEnd() {
            return Math.min(this.currentPage * this.perPage, this.totalRows);
        }
    },
    mounted() {
        this.totalRows = this.salaries.length
    },
    created: function () {
        this.$eventBus.$on('salarySaved', (message) => {
            this.showMessage("success", message);
            this.getSalaries();
            this.create_new = null;
        });
        this.getSalaries();
    },
    methods: {
        convertFormat(format) {
            if (!format) return 'DD-MM-YYYY';
            const map = { 'd': 'DD', 'm': 'MM', 'M': 'MMM', 'Y': 'YYYY' };
            return format.replace(/d|m|M|Y/g, match => map[match] || match);
        },

        formatDate(date) {
            if (!date) return '';
            return moment(date).format(this.dateFormat);
        },
        getSalaries() {
            this.isLoading = true;

            let param = {
                startDate: this.dateRange.startDate
                    ? moment(this.dateRange.startDate).format('YYYY-MM-DD')
                    : "",
                endDate: this.dateRange.endDate
                    ? moment(this.dateRange.endDate).format('YYYY-MM-DD')
                    : "",
                delivery_boy_id: this.deliveryBoy
            };

            axios.get(this.$apiUrl + '/delivery_boy_salary', {
                params: param
            }).then((response) => {
                this.salaries = response.data.data.salaries;
                this.deliveryBoys = response.data.data.deliveryBoys;
                this.dateFormat = this.convertFormat(response.data.data.date_format);
                this.totalRows = this.salaries.length;
                this.isLoading = false;

            });
        },
        editRecord(record) {
            this.edit_record = record;
        },
        deleteRecord(id) {
            this.$swal.fire({
                title: __('are_you_sure'),
                text: __('you_wont_be_able_to_revert_this'),
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: __('yes_delete_it'),
                cancelButtonText: __('cancel'),
            }).then((result) => {
                if (result.isConfirmed) {
                    axios.post(this.$apiUrl + '/delivery_boy_salary/delete', { id: id })
                        .then((response) => {
                            if (response.data.status === 1) {
                                this.showMessage("success", response.data.message);
                                this.getSalaries();
                            } else {
                                this.showError(response.data.message);
                            }
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

<style>
@import "../../../../../node_modules/vue2-daterange-picker/dist/vue2-daterange-picker.css";

.vue-daterange-picker[data-v-1ebd09d2] {
    min-width: 80%;
}
</style>
