<template>
    <div>
        <div class="page-heading">
            <div class="page-heading d-flex justify-content-between align-items-center mb-4">
                <h3 class="modern-page-title mb-0">{{ __('attributes') }}</h3>
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb mb-0">
                        <li class="breadcrumb-item">
                            <router-link :to="isSeller ? '/seller/dashboard' : '/dashboard'" class="text-muted">{{ __('dashboard') }}</router-link>
                        </li>
                        <li class="breadcrumb-item active text-primary" aria-current="page">{{ __('attributes') }}</li>
                    </ol>
                </nav>
            </div>
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
                                    :placeholder="__('search') || 'Search...'" @input="getRecords()">
                            </div>
                        </div>
                        <div class="d-flex gap-2">
                            <button class="btn btn-figma-filter d-flex align-items-center gap-2"
                                @click="edit_record = true">
                                <i class="fa fa-plus"></i>
                                <span>{{ __('add_attribute') }}</span>
                            </button>

                            <button class="btn btn-figma-filter d-flex align-items-center gap-2" @click="getRecords()"
                                v-b-tooltip.hover :title="__('refresh')">
                                <i class="fa fa-refresh"></i>
                                <span>{{ __('refresh') || 'Refresh' }}</span>
                            </button>
                        </div>
                    </div>
                    <b-table :items="translatedAttributes" :fields="fields" :sort-by.sync="sortBy"
                        :sort-desc.sync="sortDesc" :sort-direction="sortDirection" :bordered="false" :busy="isLoading"
                        stacked="md" show-empty :tbody-tr-class="() => 'figma-tr align-middle'" small
                        class="figma-order-table mb-0">
                        <template #table-busy>
                            <div class="text-center text-black my-2">
                                <b-spinner class="align-middle"></b-spinner>
                                <strong>{{ __('loading') }}...</strong>
                            </div>
                        </template>

                        <template #cell(id)="row">
                            {{ row.item.id }}
                        </template>

                        <template #cell(name)="row">
                            <div>{{ row.item.name }}</div>
                            <small v-if="isInUse(row.item)" class="text-muted">
                                <i class="fa fa-link"></i>
                                {{ __('used_in') }} {{ row.item.categories_count }}
                                {{ row.item.categories_count == 1 ? __('category') : __('categories') }}
                            </small>
                        </template>

                        <template #cell(values)="row">
                            <div class="d-flex flex-wrap gap-1 justify-content-center align-items-center">
                                <span v-for="value in row.item.values" :key="value.id"
                                    class="badge bg-light text-dark border d-inline-flex align-items-center gap-1">
                                    <span v-if="row.item.type === 'color' && value.color_code"
                                        class="rounded-circle border" :style="{ background: value.color_code, width: '12px', height: '12px', display: 'inline-block' }"></span>
                                    <img v-else-if="row.item.type === 'image' && value.image_url" :src="value.image_url"
                                        class="rounded" style="width: 16px; height: 16px; object-fit: cover;">
                                    {{ value.value }}
                                    <small v-if="value.short_code" class="text-muted">({{ value.short_code }})</small>
                                </span>
                                <span v-if="!row.item.values || row.item.values.length === 0"
                                    class="text-muted">-</span>
                            </div>
                        </template>

                        <template #cell(owner)="row">
                            <span v-if="row.item.is_mine" class="badge bg-secondary">{{ __('mine') || 'Mine' }}</span>
                            <div v-else-if="row.item.seller_id">
                                <div>{{ row.item.seller ? row.item.seller.name : __('seller') || 'Seller' }}</div>
                                <small class="text-muted">ID - {{ row.item.seller_id }}</small>
                            </div>
                            <span v-else class="badge bg-success">{{ __('global') || 'Global' }}</span>
                        </template>

                        <template #cell(status)="row">
                            <span v-if="row.item.status == 1" class="badge bg-success">{{ __('active') }}</span>
                            <span v-else class="badge bg-danger">{{ __('deactive') }}</span>
                        </template>

                        <template #cell(actions)="row">
                            <div v-if="canManage(row.item)" class="d-flex gap-2">
                                <button class="figma-action-btn" @click="edit_record = row.item" v-b-tooltip.hover
                                    :title="__('edit')">
                                    <base-icon name="edit icon" hoverName="edit Hover" width="24" height="24" />
                                </button>
                                <!-- Delete is admin-only, EXCEPT a seller may delete their own attribute
                                     (is_mine). Shown disabled with an explanatory tooltip once it's
                                     assigned to a category, rather than hidden outright. -->
                                <button v-if="!isSeller || row.item.is_mine" class="figma-action-btn"
                                    :disabled="isSeller && isInUse(row.item)"
                                    :style="isSeller && isInUse(row.item) ? 'opacity: 0.5; cursor: not-allowed;' : ''"
                                    @click="!(isSeller && isInUse(row.item)) && deleteRecord(row.index, row.item.id)"
                                    v-b-tooltip.hover
                                    :title="isSeller && isInUse(row.item) ? (__('attribute_in_use_cannot_be_deleted') || 'Assigned to a category, cannot be deleted') : __('delete')">
                                    <base-icon name="Type=Default" hoverName="Type=Hover" width="24" height="24" />
                                </button>
                            </div>
                            <span v-else class="text-muted small">{{ __('managed_by_admin') || 'Managed by admin' }}</span>
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
                        <b-pagination v-model="currentPage" :total-rows="totalRows" :per-page="perPage" align="right"
                            class="figma-pagination mb-0" hide-goto-end-buttons hide-ellipsis prev-text="<"
                            next-text=">"></b-pagination>
                    </div>
                </div>
            </div>
        </section>

        <!-- Add / Edit -->
        <app-edit-record v-if="edit_record" :record="edit_record" @modalClose="edit_record = null"
            @saved="onAttributeSaved"></app-edit-record>
    </div>
</template>

<script>
import Auth from '../../../Auth.js';
import EditRecord from './Edit.vue';

export default {
    components: {
        'app-edit-record': EditRecord,
    },
    data() {
        return {
            fields: [
                { key: 'id', label: __('id'), class: 'text-center', sortable: true, sortDirection: 'desc' },
                { key: 'name', label: __('name'), class: 'text-center' },
                { key: 'values', label: __('values'), class: 'text-center' },
                { key: 'owner', label: __('owner') || 'Owner', class: 'text-center' },
                {
                    key: 'status', label: __('status'), class: 'text-center', formatter: (value) => {
                        return value == 1 ? __('active') : __('deactive');
                    }
                },
                { key: 'actions', label: __('actions') }
            ],
            totalRows: 0,
            currentPage: 1,
            perPage: this.$perPage || 10,
            pageOptions: this.$pageOptions || [5, 10, 15, 20],
            sortBy: '',
            sortDesc: false,
            sortDirection: 'asc',
            filter: null,
            filterOn: ['id', 'name', 'status'],
            isLoading: false,
            attributes: [],
            edit_record: null,
            currentLanguageId: null,
            activeLanguages: [],
        }
    },

    computed: {
        isSeller() {
            return !!(Auth.user && Auth.user.role && Auth.user.role.name === 'Seller' && Auth.user.seller !== null);
        },
        currentSellerId() {
            return this.isSeller ? Auth.user.seller.id : null;
        },
        translatedAttributes() {
            if (!this.currentLanguageId || this.attributes.length === 0) {
                return this.attributes;
            }

            return this.attributes.map(attribute => {
                const translatedAttribute = { ...attribute };

                if (attribute.translations && Array.isArray(attribute.translations)) {
                    const translation = attribute.translations.find(
                        t => Number(t.language_id) === Number(this.currentLanguageId)
                    );
                    if (translation && translation.name && translation.name.trim() !== '') {
                        translatedAttribute.name = translation.name;
                    }
                }

                return translatedAttribute;
            });
        },
    },
    created() {
        this.fetchActiveLanguages().then(() => {
            this.getRecords();
        });
    },
    watch: {
        currentPage() {
            this.getRecords();
        },
        perPage() {
            this.getRecords();
        }
    },
    methods: {
        // Used only to decide whether deleting needs the "used in categories" confirm dialog -
        // the backend is the real gate, this just avoids an unnecessary round trip for admin.
        isInUse(attribute) {
            return (attribute.categories_count || 0) > 0;
        },
        // Admin manages everything; a seller only their own (seller_id matches) - a global
        // attribute (seller_id null) stays admin-only even when a seller can see/use it.
        // Note: this only gates edit - delete is admin-only regardless (see !isSeller in template).
        canManage(attribute) {
            if (!this.isSeller) {
                return true;
            }
            return attribute.seller_id === this.currentSellerId;
        },

        fetchActiveLanguages() {
            return axios.get(this.$apiUrl + '/active_languages')
                .then(response => {
                    this.activeLanguages = response.data.data || [];

                    const appLocale = window.appLocale || 'en';

                    const currentLanguage = this.activeLanguages.find(
                        lang => lang.code === appLocale
                    );

                    if (currentLanguage) {
                        this.currentLanguageId = currentLanguage.id;
                    } else {
                        const defaultLang = this.activeLanguages.find(l => l.is_default === 1);
                        if (defaultLang) {
                            this.currentLanguageId = defaultLang.id;
                        }
                    }
                });
        },

        getRecords() {
            this.isLoading = true;
            axios.get(this.$apiUrl + '/products/attributes', {
                params: {
                    page: this.currentPage,
                    per_page: this.perPage,
                    filter: this.filter
                }
            }).then((response) => {
                this.isLoading = false;
                const data = response.data;
                this.attributes = data.data;
                this.totalRows = data.total;
            }).catch(() => {
                this.isLoading = false;
            });
        },
        onAttributeSaved(message) {
            this.showMessage('success', message);
            this.getRecords();
            this.edit_record = null;
        },

        // Everything needed (category names, owner) is already in the row from getRecords() -
        // one straight warning, admin confirms once, it's gone. No extra round trip.
        deleteRecord(index, id) {
            const attribute = this.attributes[index];
            const inUse = attribute && this.isInUse(attribute);

            const ownerLabel = attribute && attribute.seller_id
                ? ((attribute.seller && (attribute.seller.store_name || attribute.seller.name)) || __('seller') || 'Seller')
                : (__('global') || 'Global');

            const html = inUse
                ? `${__('attribute_in_use_confirm_delete')}<br>`
                    + `<b>${__('categories') || 'Categories'}:</b> ${attribute.categories.map(c => c.name).join(', ')}<br>`
                    + `<b>${__('owner') || 'Owner'}:</b> ${ownerLabel}<br><br>`
                    + `${__('you_want_be_able_to_revert_this')}`
                : __('you_want_be_able_to_revert_this');

            this.$swal.fire({
                title: __('are_you_sure'),
                html,
                confirmButtonText: __('yes_sure'),
                cancelButtonText: __('cancel'),
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: inUse ? '#d33' : '#37a279',
                cancelButtonColor: inUse ? '#37a279' : '#d33',
            }).then(result => {
                if (result.value) {
                    this.isLoading = true;
                    axios.post(this.$apiUrl + '/products/attributes/delete', { id })
                        .then((response) => {
                            this.isLoading = false;
                            if (response.data.status === 0) {
                                this.showError(response.data.message);
                                this.getRecords();
                                return;
                            }
                            this.attributes.splice(index, 1);
                            this.showMessage('success', response.data.message);
                        }).catch(() => {
                            this.isLoading = false;
                        });
                }
            });
        },
    }
};
</script>

<style scoped>
.figma-action-btn.is-disabled,
.figma-action-btn:disabled {
    opacity: 0.35;
    cursor: not-allowed;
    pointer-events: auto;
    /* keep pointer events so the "why" tooltip still shows on hover */
}
</style>
