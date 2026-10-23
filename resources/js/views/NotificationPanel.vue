<template>
    <div>
        <div class="page-heading">
            <div class="page-title d-flex justify-content-between align-items-center flex-wrap gap-2 mb-4">
                <h3 class="modern-page-title mb-0">{{ __('notification') }}</h3>
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb mb-0">
                        <li class="breadcrumb-item">
                            <router-link :to="getDashboardPath()" class="text-muted">{{ __('dashboard') }}</router-link>
                        </li>
                        <li class="breadcrumb-item active text-primary" aria-current="page">{{ __('notification') }}</li>
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
                                        :placeholder="__('search') || 'Search...'">
                                </div>
                            </div>
                            <div class="d-flex gap-2 ms-auto">
                                <button class="btn btn-figma-filter d-flex align-items-center gap-2"
                                    @click="getNotifications()" v-b-tooltip.hover :title="__('refresh')">
                                    <i class="fa fa-refresh"></i>
                                    <span>{{ __('refresh') || 'Refresh' }}</span>
                                </button>
                            </div>
                        </div>

                        <!-- Table -->
                        <div class="table-responsive">
                        <b-table :items="notifications" :fields="fields" :sort-by.sync="sortBy" :sort-desc.sync="sortDesc"
                            :sort-direction="sortDirection" :bordered="false" :busy="isLoading" stacked="md" show-empty
                            :tbody-tr-class="(item) => ['figma-tr align-middle', item && item.read_at == null ? 'notif-unread' : '']" small class="figma-order-table notif-table mb-0">
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

                            <template #cell(title)="row">
                                <div class="d-flex align-items-center gap-3 text-start">
                                    <span class="notif-icon flex-shrink-0">
                                        <i class="fa fa-bell"></i>
                                    </span>
                                    <router-link :to="getOrderViewPath(row.item.data.order_id)"
                                        :class="row.item.read_at == null ? 'notif-title--unread' : 'notif-title--read'"
                                        @click.prevent="markAsRead(row.item, $event)"
                                        class="notif-title flex-grow-1">
                                        {{ row.item.data.text }}
                                    </router-link>
                                    <span v-if="row.item.read_at == null" class="notif-dot flex-shrink-0"
                                        :title="__('unread') || 'Unread'"></span>
                                </div>
                            </template>

                            <template #cell(created_at)="row">
                                <span class="text-muted small text-nowrap">{{ new Date(row.item.created_at).toLocaleString() }}</span>
                            </template>

                        </b-table>
                        </div>
                    </div>

                    <!-- Footer -->
                    <div class="figma-table-footer flex-wrap gap-3">
                        <div class="d-flex align-items-center gap-3 flex-wrap">
<div class="d-flex align-items-center gap-2">
<label class="showing-results-text mb-0">{{ __('per_page') }}</label>
<b-form-select v-model="perPage" :options="pageOptions" size="sm" class="w-auto"></b-form-select>
</div>
<table-count :current-page="currentPage" :per-page="perPage" :total-rows="totalRows"></table-count>
</div>
                        <div class="d-flex align-items-center gap-3">
                            <b-pagination v-model="currentPage" :total-rows="totalRows" :per-page="perPage" align="right" class="figma-pagination mb-0" hide-goto-end-buttons hide-ellipsis prev-text="<" next-text=">"></b-pagination>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>

<script>
export default {
    components: {
        // InfiniteLoading,
    },
    data: function () {
        return {
            fields: [
                { key: 'title', label: __('title'), class: 'text-left' },
                { key: 'created_at', label: __('date') }
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
            searchTimer: null,
            page: 1,
            isLoading: false,
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
        },
    },
    mounted() {
        this.totalRows = this.notifications.length
    },
    created: function () {
        this.getNotifications();
    },
    watch: {
        currentPage() {
            this.getNotifications();
        },
        perPage() {
            this.getNotifications();
        },
        // Search is done by the server (all pages), so wait for a pause in typing, go back to
        // page 1 and reload.
        filter() {
            clearTimeout(this.searchTimer);
            this.searchTimer = setTimeout(() => {
                if (this.currentPage !== 1) {
                    this.currentPage = 1; // its watcher reloads
                } else {
                    this.getNotifications();
                }
            }, 350);
        },
    },
    methods: {
        getNotifications() {
            this.isLoading = true
            let param = {
                page: this.currentPage,
                per_page: this.perPage,
                search: this.filter || ''
            }
            axios.get(this.$apiUrl + '/panel_notification', {
                params: param
            }).then((response) => {
                this.isLoading = false;
                let data = response.data;
                this.notifications = data.data;
                this.totalRows = response.data.total
            });
        },
        async markAsRead(item, event) {
            if (item.read_at === null) {
                try {
                    await axios.get(this.$apiUrl + '/notification_read?id=' + item.id);
                    item.read_at = new Date().toISOString(); // Update locally for immediate UI change
                } catch (error) {
                    console.error("Failed to mark as read", error);
                }
            }
            this.$router.push(this.getOrderViewPath(item.data.order_id));
        },
        getDashboardPath() {
            if (this.$route.path.startsWith('/seller')) {
                return '/seller';
            } else if (this.$route.path.startsWith('/delivery_boy')) {
                return '/delivery_boy';
            } else {
                return '/dashboard';
            }
        },
        getOrderViewPath(orderId) {
            if (this.$route.path.startsWith('/seller')) {
                return '/seller/orders/view/' + orderId;
            } else if (this.$route.path.startsWith('/delivery_boy')) {
                return '/delivery_boy/orders/view/' + orderId;
            } else {
                return '/orders/view/' + orderId;
            }
        }
    }
};
</script>

<style scoped>
/* Notification rows: icon tile + title + unread dot; unread rows get a soft primary tint */
.notif-icon {
    width: 36px;
    height: 36px;
    border-radius: 10px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: var(--ui-surface-muted);
    color: var(--ui-text-muted);
    font-size: 14px;
}

.notif-unread .notif-icon {
    background: var(--ui-primary-soft);
    color: var(--theme-primary-600);
}

.notif-title {
    font-size: 13px;
    line-height: 1.4;
    text-decoration: none;
}

/* #main prefix: the global "#main .table tbody td a" rule colours every table link primary */
#main .notif-title--unread {
    font-weight: 700 !important; /* beats the global "td a" 600 weight */
    color: var(--ui-heading) !important;
}

#main .notif-title--read {
    font-weight: 400 !important;
    color: var(--ui-text-muted) !important;
}

#main .notif-title:hover {
    color: var(--theme-primary-600) !important;
}

.notif-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--theme-primary-500);
}

.notif-table ::v-deep tr.notif-unread > td {
    background: color-mix(in srgb, var(--theme-primary-500) 5%, var(--ui-surface)) !important; /* beats the global white td background */
}
</style>
