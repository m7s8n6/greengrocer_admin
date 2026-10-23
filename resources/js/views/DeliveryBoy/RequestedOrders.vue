<template>
    <div>
        <div class="page-heading">
            <div class="page-title mb-4">
                <div class="d-flex justify-content-between align-items-center flex-wrap gap-2">
                    <h3 class="modern-page-title mb-0">Requested Orders</h3>
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb mb-0">
                            <li class="breadcrumb-item">
                                <router-link to="/delivery_boy/dashboard" class="text-muted">{{ __('dashboard') }}</router-link>
                            </li>
                            <li class="breadcrumb-item active text-primary" aria-current="page">Requested Orders</li>
                        </ol>
                    </nav>
                </div>
            </div>
            <section class="section">
                <div class="figma-main-section-card">
                    <div class="card-body">
                        <div class="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
                            <p class="text-muted mb-0">
                                Orders offered to you. Accept the ones you want to deliver, or reject the rest.
                            </p>
                            <button class="btn btn-figma-filter d-flex align-items-center gap-2" :disabled="isLoading"
                                @click="fetchQueue">
                                <i class="fa fa-refresh"></i>{{ __('refresh') }}
                            </button>
                        </div>

                        <div v-if="isLoading && !loadedOnce" class="text-center text-muted my-4">
                            <b-spinner class="align-middle"></b-spinner>
                            <strong>{{ __('loading') }}...</strong>
                        </div>

                        <div v-else-if="!queue.length" class="text-center text-muted py-5">
                            <i class="fa fa-inbox fa-2x mb-2 d-block"></i>
                            No requested orders right now.
                        </div>

                        <div v-else class="row g-3">
                            <div class="col-12 col-md-6 col-xl-4" v-for="item in queue" :key="item.attempt_id">
                                <div class="border rounded p-3 h-100 d-flex flex-column">
                                    <div class="d-flex justify-content-between align-items-start mb-2">
                                        <h5 class="mb-0">Order #{{ item.order_id }}</h5>
                                        <span class="badge bg-warning text-dark">{{ secondsLeft(item) }}s left</span>
                                    </div>
                                    <p class="text-muted mb-2" v-if="item.area || item.city">
                                        {{ item.area }}<span v-if="item.area && item.city">, </span>{{ item.city }}
                                    </p>
                                    <div class="d-flex justify-content-between mb-1">
                                        <span class="text-muted">Items</span>
                                        <strong>{{ item.item_count }}</strong>
                                    </div>
                                    <div class="d-flex justify-content-between mb-1">
                                        <span class="text-muted">Order Value</span>
                                        <strong>{{ $currency }}{{ item.final_total }}</strong>
                                    </div>
                                    <div class="d-flex justify-content-between mb-3" v-if="item.distance_km">
                                        <span class="text-muted">Distance</span>
                                        <strong>{{ Number(item.distance_km).toFixed(1) }} km</strong>
                                    </div>
                                    <div class="d-flex gap-2 mt-auto">
                                        <b-button variant="outline-danger" class="flex-fill"
                                            :disabled="respondingId !== null" @click="respond(item, 'reject')">
                                            Reject
                                        </b-button>
                                        <b-button variant="success" class="flex-fill"
                                            :disabled="respondingId !== null || secondsLeft(item) <= 0"
                                            @click="respond(item, 'accept')">
                                            Accept
                                            <b-spinner v-if="respondingId === item.order_id" small></b-spinner>
                                        </b-button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    data() {
        return {
            queue: [],
            isLoading: false,
            loadedOnce: false,
            respondingId: null,
            now: Date.now(),
            pollTimer: null,
            tickTimer: null,
        };
    },
    mounted() {
        this.fetchQueue();
        // Offers arrive and expire on their own, so keep the list fresh.
        this.pollTimer = setInterval(() => this.fetchQueue(), 6000);
        this.tickTimer = setInterval(() => { this.now = Date.now(); }, 1000);
    },
    beforeDestroy() {
        clearInterval(this.pollTimer);
        clearInterval(this.tickTimer);
    },
    methods: {
        fetchQueue() {
            if (this.respondingId !== null) return;
            this.isLoading = true;
            axios.get(this.$deliveryBoyApiUrl + '/requested_orders')
                .then((response) => {
                    this.queue = (response.data && response.data.data) ? response.data.data : [];
                })
                .catch((error) => {
                    console.error('Error loading requested orders:', error.response?.data || error);
                })
                .finally(() => {
                    this.isLoading = false;
                    this.loadedOnce = true;
                });
        },
        secondsLeft(item) {
            if (!item.expires_at) return 0;
            return Math.max(0, Math.round((new Date(item.expires_at).getTime() - this.now) / 1000));
        },
        respond(item, action) {
            if (this.respondingId !== null) return;
            this.respondingId = item.order_id;

            const formData = new FormData();
            formData.append('order_id', item.order_id);
            formData.append('action', action);

            axios.post(this.$deliveryBoyApiUrl + '/requested_orders/respond', formData)
                .then((response) => {
                    const ok = response.data && response.data.status === 1;
                    if (ok) {
                        this.showSuccess(response.data.message);
                    } else {
                        this.showError(response.data.message);
                    }
                    if (ok && action === 'accept') {
                        this.$router.push({ path: '/delivery_boy/orders' }).catch(() => { });
                    }
                })
                .catch((error) => {
                    console.error('Error responding to requested order:', error.response?.data || error);
                    this.showError(error.response?.data?.message || error.message);
                })
                .finally(() => {
                    this.respondingId = null;
                    this.fetchQueue();
                });
        },
    },
};
</script>
