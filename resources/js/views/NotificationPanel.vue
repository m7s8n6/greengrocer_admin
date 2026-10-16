<template>
    <div>
        <div class="page-heading">
            <div class="page-heading d-flex justify-content-between align-items-center mb-4">
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
                        <b-table :items="notifications" :fields="fields" :filter="filter"
                            :filter-included-fields="filterOn" :sort-by.sync="sortBy" :sort-desc.sync="sortDesc"
                            :sort-direction="sortDirection" :bordered="false" :busy="isLoading" stacked="md" show-empty
                            :tbody-tr-class="() => 'figma-tr align-middle'" small class="figma-order-table mb-0">
                            
                            <template #table-busy>
                                <div class="text-center text-black my-2">
                                    <b-spinner class="align-middle"></b-spinner>
                                    <strong>{{ __('loading') }}...</strong>
                                </div>
                            </template>

                            <template #cell(title)="row">
                                <router-link :to="getOrderViewPath(row.item.data.order_id)"
                                    :style="{ fontWeight: row.item.read_at == null ? 'bold' : 'normal' }"
                                    @click.prevent="markAsRead(row.item, $event)"
                                    class="text-primary font-medium">
                                    {{ row.item.data.text }}
                                </router-link>
                            </template>

                            <template #cell(created_at)="row">
                                <span class="text-muted">{{ new Date(row.item.created_at).toLocaleString() }}</span>
                            </template>

                        </b-table>
                    </div>

                    <!-- Footer -->
                    <div class="figma-table-footer flex-wrap gap-3">
                        <div class="showing-results-text small">
                            {{ __('Showing Result') }} : <span class="showing-bold">{{ pageEnd }}</span> {{ __('of') }} <span class="showing-bold">{{ totalRows }}</span>
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
                { key: 'created_at', label: __('date'), class: 'text-center' }
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
    },
    methods: {
        getNotifications() {
            this.isLoading = true
            let param = {
                page: this.currentPage,
                per_page: this.perPage
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
