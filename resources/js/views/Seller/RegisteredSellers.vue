<template>
    <div>
        <div class="page-heading">
            <div class="page-heading d-flex justify-content-between align-items-center mb-4">
                <h3 class="modern-page-title mb-0">{{ __('seller_requests') }}</h3>
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb mb-0">
                        <li class="breadcrumb-item">
                            <router-link to="/dashboard" class="text-muted">{{ __('dashboard') }}</router-link>
                        </li>
                        <li class="breadcrumb-item active text-primary" aria-current="page">{{ __('seller_requests') }}
                        </li>
                    </ol>
                </nav>
            </div>
            <section class="section">
                <div class="figma-main-section-card">
                    <div class="card-body p-0">
                        <!-- Modern Filter Action Bar -->
                        <div
                            class="d-flex justify-content-between align-items-center flex-wrap gap-2 figma-action-bar-row">
                            <div class="flex-grow-1">
                                <div class="figma-search-container">
                                    <i class="fa fa-search text-muted"></i>
                                    <input v-model="filter" type="text" class="figma-search-input"
                                        :placeholder="__('search') || 'Search...'" @input="getRecords()">
                                </div>
                            </div>
                            <div class="d-flex gap-2">
                                <button class="btn btn-figma-filter d-flex align-items-center gap-2"
                                    @click="getRecords()" v-b-tooltip.hover :title="__('refresh')">
                                    <i class="fa fa-refresh"></i>
                                    <span>{{ __('refresh') || 'Refresh' }}</span>
                                </button>
                            </div>
                        </div>
                        <b-row class="table-responsive">
                            <b-table :items="translatedRecords" :fields="fields" :current-page="currentPage"
                                :per-page="perPage" :filter-included-fields="filterOn" :sort-by.sync="sortBy"
                                :sort-desc.sync="sortDesc" :sort-direction="sortDirection" :bordered="false"
                                :busy="isLoading" stacked="md" show-empty
                                :tbody-tr-class="() => 'figma-tr align-middle'" small class="figma-order-table mb-0">
                                <template #table-busy>
                                    <div class="text-center text-black my-2">
                                        <b-spinner class="align-middle"></b-spinner>
                                        <strong>{{ __('loading') }}...</strong>
                                    </div>
                                </template>

                                <template #cell(email)="row">
                                    {{ row.item.email | emailMask }}
                                </template>
                                <template #cell(mobile)="row">
                                    {{ row.item.mobile | mobileMask }}
                                </template>
                                <template #cell(seller_info)="row">
                                    <small class="d-inline-flex mb-3 px-2 py-1 text-muted bg-secondary bg-opacity-10 border border-secondary border-opacity-10 rounded-2"
                                        v-b-tooltip.hover="{ html: true, title: sellerInfoHtml(row.item), boundary: 'window' }">
                                        <i class="fa fa-info-circle"></i>
                                    </small>
                                    {{ row.item.name }}
                                </template>
                                <template #cell(store_info)="row">
                                    <small class="d-inline-flex mb-3 px-2 py-1 text-muted bg-secondary bg-opacity-10 border border-secondary border-opacity-10 rounded-2"
                                        v-b-tooltip.hover="{ html: true, title: storeInfoHtml(row.item), boundary: 'window' }">
                                        <i class="fa fa-info-circle"></i>
                                    </small>
                                    {{ row.item.store_name }}
                                </template>
                                <template #cell(other_info)="row">
                                    <small class="d-inline-flex mb-3 px-2 py-1 text-muted bg-secondary bg-opacity-10 border border-secondary border-opacity-10 rounded-2"
                                        v-b-tooltip.hover="{ html: true, title: otherInfoHtml(row.item), boundary: 'window' }">
                                        <i class="fa fa-info-circle"></i>
                                    </small>
                                    {{ row.item.store_name }}
                                </template>
                                <template #cell(logo)="row">
                                    <span v-if="!row.item.logo">{{ __('no_image') }}</span>
                                    <img v-else :src="$storageUrl + row.item.logo" height="50" />
                                </template>
                                <template #cell(created_at)="row">
                                    {{ row.item.created_at }}
                                </template>
                                <template #cell(status)="row">
                                    <label v-if="row.item.status == 0" class='badge bg-primary'>{{ __('registered')
                                        }}</label>
                                    <label v-else-if="row.item.status == 1" class='badge bg-success'>{{ __('approved')
                                        }}</label>
                                    <label v-else-if="row.item.status == 2" class='badge bg-warning'>{{ __('reject')
                                        }}</label>
                                    <label v-else-if="row.item.status == 3" class='badge bg-danger'>{{ __('deactive')
                                        }}</label>
                                    <label v-else-if="row.item.status == 7" class='badge bg-danger'>{{ __('removed')
                                        }}</label>
                                </template>

                                <template #cell(require_products_approval)="row">
                                    <label v-if="row.item.require_products_approval == 1" class='badge bg-success'>{{
                                        __('yes') }}</label>
                                    <label v-else-if="row.item.require_products_approval == 0"
                                        class='badge bg-danger'>{{ __('no') }}</label>
                                </template>
                                <template #cell(actions)="row">
                                    <div class="d-flex gap-2">
                                        <button class="figma-action-btn" type="button"
                                            @click="updateStatus(row.index, row.item.id, 1)" v-if="$can('seller_delete')"
                                            v-b-tooltip.hover :title="__('approve')">
                                            <base-icon name="CheckCircle" width="24" height="24" />
                                        </button>
                                        <button class="figma-action-btn figma-delete-btn" type="button"
                                            @click="updateStatus(row.index, row.item.id, 2)" v-if="$can('seller_delete')"
                                            v-b-tooltip.hover :title="__('reject')">
                                            <base-icon name="XCircle" width="24" height="24" />
                                        </button>
                                    </div>
                                </template>

                            </b-table>
                        </b-row>

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

            </section>
        </div>
    </div>
</template>
<script>
export default {
    data: function () {
        return {
            fields: [
                { key: 'id', label: __('id'), sortable: true, sortDirection: 'desc' },
                { key: 'seller_info', label: __('seller_info'), class: 'text-legt', sortable: true, sortDirection: 'desc' },
                { key: 'store_info', label: __('seller_info'), class: 'text-left', sortable: true, sortDirection: 'desc' },
                { key: 'categories_array', label: __('category'), class: 'text-center', sortable: true, sortDirection: 'desc' },
                { key: 'city.formatted_address', label: __('city'), class: 'text-center', sortable: true, sortDirection: 'desc' },
                { key: 'logo', label: __('logo'), class: 'text-center', sortable: true, sortDirection: 'desc' },
                { key: 'other_info', label: __('other_info'), class: 'text-left', sortable: true, sortDirection: 'desc' },
                { key: 'commission', label: __('commission'), class: 'text-center', sortable: true, sortDirection: 'desc' },
                { key: 'created_at', label: __('date'), class: 'text-center', sortable: true, sortDirection: 'desc' },
                { key: 'status', label: __('status'), class: 'text-center', sortable: true, sortDirection: 'desc' },
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
            records: [],

            filterStatus: 0,
            currentLanguageId: null,
            activeLanguages: []
        }
    },
    computed: {
        translatedRecords() {
            if (!this.currentLanguageId || !Array.isArray(this.records)) {
                return this.records;
            }
            return this.records.map(seller => {
                const translatedSeller = { ...seller };
                if (seller.translations && Array.isArray(seller.translations)) {
                    const translation = seller.translations.find(
                        t => t.language_id === this.currentLanguageId
                    );
                    if (translation) {
                        if (translation.name && translation.name.trim() !== '') {
                            translatedSeller.name = translation.name;
                        }
                        if (translation.store_name && translation.store_name.trim() !== '') {
                            translatedSeller.store_name = translation.store_name;
                        }
                    }
                }
                return translatedSeller;
            });
        },
        pageEnd() {
            return Math.min(this.currentPage * this.perPage, this.totalRows);
        }
    },

    created: function () {
        this.category_id = this.$route.params.id;
        this.$eventBus.$on('recordSaved', (message) => {
            this.showMessage('success', message);
            this.getRecords();
        });

        this.fetchActiveLanguages().then(() => {
            this.getRecords();
        });
    },
    methods: {
        escapeHtml(value) {
            const div = document.createElement('div');
            div.textContent = value ?? '';
            return div.innerHTML;
        },
        kvTableHtml(title, rows) {
            const rowsHtml = rows.map(([label, value]) =>
                `<tr><th>${this.escapeHtml(label)}</th><td> : ${this.escapeHtml(value)}</td></tr>`
            ).join('');
            return `<div class="text-start"><strong>${this.escapeHtml(title)}</strong>`
                + `<table class="table table-borderless mb-0">${rowsHtml}</table></div>`;
        },
        sellerInfoHtml(item) {
            return this.kvTableHtml(__('sellr_details'), [
                [__('name'), item.name],
                [__('email'), item.email],
                [__('mobile'), item.mobile],
            ]);
        },
        storeInfoHtml(item) {
            return this.kvTableHtml(__('store_details'), [
                [__('name'), item.store_name],
                [__('url'), item.store_url],
                [__('description'), this.strip_tags(item.store_description)],
            ]);
        },
        otherInfoHtml(item) {
            const table = this.kvTableHtml(__('store_details'), [
                [__('tax_name'), item.tax_name],
                [__('tax_no'), item.tax_number],
                [__('pan_no'), item.pan_number],
            ]);
            const links = [];
            if (item.national_identity_card_url) {
                links.push(`<a target="_blank" href="${this.escapeHtml(item.national_identity_card_url)}" class="badge bg-success d-inline-flex align-items-center gap-1 mt-1">${this.escapeHtml(__('national_identity_card'))}</a>`);
            }
            if (item.address_proof_url) {
                links.push(`<a target="_blank" href="${this.escapeHtml(item.address_proof_url)}" class="badge bg-success d-inline-flex align-items-center gap-1 mt-1">${this.escapeHtml(__('address_proof'))}</a>`);
            }
            return table + links.join('<br>');
        },
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
        strip_tags(input) {
            return input.replace(/<\/?[^>]+(>|$)/g, "");
        },
        getRecords() {
            this.isLoading = true;
            axios.get(this.$apiUrl + '/sellers', {
                params: {
                    filterStatus: this.filterStatus,
                    search: this.filter
                }
            }).then((response) => {
                this.isLoading = false
                let data = response.data;
                this.records = data.data;
                this.totalRows = this.records.length
            });
        },


        updateStatus(index, id, selectedStatus) {
            this.$swal.fire({
                title: __('are_you_sure'),
                text: __('you_want_be_able_to_revert_this'),
                confirmButtonText: __('yes_sure'),
                cancelButtonText: __('cancel'),
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#37a279',
                cancelButtonColor: '#d33',
            }).then(async result => {
                if (result.value) {
                    let remarks = "";
                    if (selectedStatus === 2) {
                        const { value: text } = await this.$swal.fire({
                            title: __('remarks'),
                            input: 'textarea',
                            /*inputLabel: 'Remarks',*/
                            inputPlaceholder: 'Type your remarks here...',
                            inputAttributes: {
                                'aria-label': 'Type your remarks here'
                            },
                            confirmButtonText: "Submit",
                            cancelButtonText: "Cancel",
                            showCancelButton: true,

                            inputValidator: (value) => {
                                return new Promise((resolve) => {
                                    if (value !== '') {
                                        resolve()
                                    } else {
                                        resolve('The Remarks field is required')
                                    }
                                })
                            }
                        })
                        if (text) {
                            remarks = text;
                        }
                    }
                    if (selectedStatus === 1 || (selectedStatus === 2 && remarks !== "")) {
                        this.isLoading = true
                        let postData = {
                            id: id,
                            status: selectedStatus,
                            remark: remarks
                        }
                        axios.post(this.$apiUrl + '/sellers/update_status', postData)
                            .then((response) => {
                                this.isLoading = false
                                let data = response.data;
                                this.getRecords();
                                this.showMessage('success', data.message);
                            });
                    }
                }
            });
        },

        deleteSeller(index, id) {
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
                    axios.post(this.$apiUrl + '/sellers/delete', postData)
                        .then((response) => {
                            this.isLoading = false
                            let data = response.data;
                            this.records.splice(index, 1)
                            this.showSuccess(data.message)
                        });
                }
            });
        },
    }
};
</script>
