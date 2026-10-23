<template>
    <div>
        <div class="page-heading d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-2 mb-3">
            <h3 class="modern-page-title mb-0">{{ __('send_notification') }}</h3>
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb mb-0">
                    <li class="breadcrumb-item"><router-link to="/dashboard" class="text-muted">{{ __('dashboard')
                            }}</router-link></li>
                    <li class="breadcrumb-item active text-primary" aria-current="page">{{ __('send_notification') }}
                    </li>
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
                                    :placeholder="__('search') || 'Search...'" @input="getNotifications()">
                            </div>
                        </div>
                        <div class="d-flex gap-2">
                            <button class="btn btn-figma-columns d-flex align-items-center gap-2"
                                @click="getNotifications()" v-b-tooltip.hover :title="__('refresh')">
                                <i class="fa fa-refresh"></i>
                                <span>{{ __('refresh') }}</span>
                            </button>
                            <button class="btn btn-figma-filter d-flex align-items-center gap-2"
                                @click="create_new = true" v-if="$can('send_notification')">
                                <i class="fa fa-plus"></i>
                                <span>{{ __('send_notification') }}</span>
                            </button>
                        </div>
                    </div>

                    <div class="table-responsive">
                        <b-table :items="notifications" :fields="fields" :current-page="currentPage" :per-page="perPage"
                            :filter="filter" :filter-included-fields="filterOn" :sort-by.sync="sortBy"
                            :sort-desc.sync="sortDesc" :sort-direction="sortDirection" :bordered="false"
                            :busy="isLoading" stacked="md" show-empty :tbody-tr-class="() => 'figma-tr align-middle'"
                            small class="figma-order-table mb-0">

                            <template #table-busy>
                                <div class="text-center text-muted my-2">
                                    <b-spinner class="align-middle"></b-spinner>
                                    <strong>{{ __('loading') }}...</strong>
                                </div>
                            </template>

                            <template #cell(message)="row">
                                <span class="notif-message" :title="row.item.message">{{ row.item.message }}</span>
                            </template>

                            <template #cell(type)="row">
                                <span class="text-capitalize">{{ row.item.type }}</span>
                            </template>

                            <template #cell(type_id)="row">
                                <span v-if="row.item.type_id">{{ row.item.type_id }}</span>
                                <span v-else class="text-muted">&mdash;</span>
                            </template>

                            <template #cell(type_link)="row">
                                <span v-if="row.item.type_link" class="notif-message" :title="row.item.type_link">{{ row.item.type_link }}</span>
                                <span v-else class="text-muted">&mdash;</span>
                            </template>

                            <template #cell(image)="row">
                                <img :src="row.item.image ? ($storageUrl + row.item.image) : $placeholderImage" class="notif-thumb" alt="" />
                            </template>

                            <template #cell(actions)="row">
                                <div class="d-flex gap-2">
                                    <button class="figma-action-btn figma-delete-btn"
                                        @click="deleteNotification(row.item.id)"
                                        v-if="$can('notification_delete')" v-b-tooltip.hover :title="__('delete')">
                                        <base-icon name="Type=Default" hoverName="Type=Hover" width="24" height="24" />
                                    </button>
                                </div>
                            </template>
                        </b-table>
                    </div>

                    <div class="figma-table-footer flex-wrap gap-3">
                        <table-count :current-page="currentPage" :per-page="perPage" :total-rows="totalRows"></table-count>
                        <b-pagination v-model="currentPage" :total-rows="totalRows" :per-page="perPage" align="right"
                            class="figma-pagination mb-0"></b-pagination>
                    </div>
                </div>
            </div>
        </section>

        <!-- Add / Edit -->
        <app-edit-record v-if="create_new || edit_record" :record="edit_record" :users="users" :sellers="sellers"
            :delivery_boys="delivery_boys" :categories="categories" :products="products"
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
                { key: 'title', label: __('title'), sortable: true },
                { key: 'message', label: __('message'), sortable: true },
                { key: 'type', label: __('type') },
                { key: 'type_id', label: __('type_id') },
                { key: 'type_link', label: __('link') },
                { key: 'image', label: __('image') },
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

            users: [],
            sellers: [],
            delivery_boys: [],
            categories: [],
            products: [],
            notifications: [],
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
        pageStart() {
            if (this.totalRows === 0) return 0;
            return (this.currentPage - 1) * this.perPage + 1;
        },
        pageEnd() {
            return Math.min(this.currentPage * this.perPage, this.totalRows);
        }
    },
    mounted() {
        // Set the initial number of items
        this.totalRows = this.notifications.length
    },
    watch: {
        $route(to, from) {
            this.showCreateModal();
        }
    },
    created: function () {
        this.showCreateModal();
        this.notificationSavedHandler = (message) => {
            this.showMessage("success", message);
            this.getNotifications();
            this.create_new = null;
        };
        this.$eventBus.$on('notificationSaved', this.notificationSavedHandler);
        this.getNotifications();
    },
    beforeDestroy() {
        this.$eventBus.$off('notificationSaved', this.notificationSavedHandler);
    },
    methods: {
        getNotifications() {
            this.isLoading = true
            axios.get(this.$apiUrl + '/notifications')
                .then((response) => {
                    this.isLoading = false
                    this.users = response.data.data.users;
                    this.sellers = response.data.data.sellers;
                    this.delivery_boys = response.data.data.delivery_boys;
                    this.categories = response.data.data.categories;
                    this.products = response.data.data.products;
                    this.notifications = response.data.data.notifications;
                    this.totalRows = this.notifications.length
                });
        },
        deleteNotification(id) {
            this.$swal.fire({
                title: __('are_you_sure'),
                text: __('you_want_be_able_to_revert_this'),
                confirmButtonText: __('yes_sure'),
                cancelButtonText: __('cancel'),
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
                    axios.post(this.$apiUrl + '/notifications/delete', postData)
                        .then((response) => {
                            this.isLoading = false
                            const index = this.notifications.findIndex(n => n.id === id);
                            if (index > -1) this.notifications.splice(index, 1);
                            this.totalRows = this.notifications.length;
                            this.showMessage("success", response.data.message);
                        });
                }
            });
        },
        showCreateModal() {
            let create = this.$route.params.create;
            if (create) {
                this.create_new = true;
            }
        },
        hideModal() {
            this.create_new = false
            this.edit_record = false
            this.$router.push({ path: '/notifications' });
        },
    }
};
</script>

<style scoped>
.notif-message {
    display: inline-block;
    max-width: 260px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: middle;
}
.notif-thumb {
    width: 40px;
    height: 40px;
    object-fit: cover;
    border-radius: var(--ui-radius);
    border: 1px solid var(--ui-border);
}
</style>
