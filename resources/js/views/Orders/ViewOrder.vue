<template>
    <div>
        <div class="page-heading d-flex flex-wrap justify-content-between align-items-center gap-2 mb-4 view_order">
            <h3 class="modern-page-title mb-0">
                {{ __('order_details') }}
            </h3>
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb mb-0">
                    <li class="breadcrumb-item"><router-link :to="isSellerRoute ? '/seller/dashboard' : (isDeliveryBoyRoute ? '/delivery_boy/dashboard' : '/dashboard')">{{ __('dashboard') }}</router-link></li>
                    <li class="breadcrumb-item"><router-link :to="isSellerRoute ? '/seller/orders' : (isDeliveryBoyRoute ? '/delivery_boy/orders' : '/orders')">{{ __('orders') }}</router-link></li>
                    <li class="breadcrumb-item active text-primary" aria-current="page">{{ __('order_details') }}</li>
                </ol>
            </nav>
        </div>

        <div v-if="order" class="order-details-wrapper od-page">
            <!-- 1. Order header strip: ID + status pills + meta + actions -->
            <div class="mb-4 order-header-card">
                <div class="od-header-top">
                    <div class="d-flex flex-wrap align-items-center gap-2 od-head-title">
                        <h2 class="figma-text-xl-semibold od-order-id mb-0">
                            {{ __('Order') || 'Order' }} #{{ order.id }}</h2>
                        <span class="figma-status-pill" :class="getStatusBadgeClass(order.active_status)">
                            {{ getStatusLabelById(order.active_status) }}
                        </span>
                        <span v-if="order.wallet_balance > 0" class="figma-status-pill status-wallet od-wallet-pill">
                            {{ __('paid_via_wallet') || 'Paid via Wallet' }}
                        </span>
                    </div>
                    <div class="od-head-actions">
                        <button @click="downloadInvoice" class="btn btn-outline-primary od-print-btn">
                            <i class="fa fa-print"></i> {{ __('Print Order') || 'Print Order' }}
                        </button>
                    </div>
                </div>

                <!-- Meta (Date, Seller, Payment method, Order type) -->
                <div class="order-meta-bar">
                    <div class="order-meta-date">
                        <i class="far fa-calendar-alt"></i>
                        <span class="od-meta-label">{{ __('date') }} :</span>
                        <span class="od-meta-value">{{ order.orders_created_at }}</span>
                    </div>
                    <div class="order-meta-seller" v-if="order_items && order_items.length > 0">
                        <i class="fas fa-store"></i>
                        <span class="od-meta-label">{{ __('seller') }} :</span>
                        <template v-if="login_user.role.name === 'Admin' || login_user.role.name === 'Super Admin'">
                            <router-link class="od-seller-link"
                                :to="{ name: 'EditSeller', params: { id: order_items[0].seller_id || order.seller_id } }">
                                {{ order_items[0].seller_name }}
                                <i class="fa fa-external-link-alt"></i>
                            </router-link>
                        </template>
                        <template v-else>
                            <span class="od-meta-value"
                                :class="login_user.role.name === 'Delivery Boy' ? 'db-panel-seller-name' : 'normal-seller-name'">
                                {{ order_items[0].seller_name }}
                            </span>
                        </template>
                    </div>
                    <div class="order-meta-date" v-if="paymentMethodLabel">
                        <i class="far fa-credit-card"></i>
                        <span class="od-meta-label">{{ __('payment_method') }} :</span>
                        <span class="od-meta-value">{{ paymentMethodLabel }}</span>
                    </div>
                    <div class="order-meta-date" v-if="orderTypeLabel">
                        <i class="fas fa-truck"></i>
                        <span class="od-meta-label">{{ tr('delivery_type', 'Delivery Type') }} :</span>
                        <span class="od-meta-value">{{ orderTypeLabel }}</span>
                    </div>
                </div>
            </div>

            <!-- 2. Order progress tracker -->
            <div class="card od-card od-track-card" v-if="trackerSteps.length">
                <div class="od-card-header justify-content-between">
                    <h5 class="od-card-title">
                        <i class="fas fa-route me-2 text-primary od-title-fa"></i>
                        {{ tr('order_progress', 'Order Progress') }}
                    </h5>
                </div>
                <div class="card-body od-card-body">
                    <ol class="od-track">
                        <li v-for="step in trackerSteps" :key="step.key" class="od-track-step" :class="'is-' + step.state">
                            <span class="od-track-dot" aria-hidden="true"><i :class="step.state === 'done' ? 'fas fa-check' : step.icon"></i></span>
                            <span class="od-track-text">
                                <span class="od-track-label">{{ step.label }}</span>
                                <span v-if="step.time" class="od-track-time">{{ step.time }}</span>
                            </span>
                        </li>
                    </ol>
                </div>
            </div>

            <!-- 3. Summary strip -->
            <div class="row g-3 od-tiles">
                <div class="col-6 col-md-3">
                    <div class="figma-kpi-card-v2 od-tile">
                        <div class="figma-kpi-icon-v2 bg-stat-blue od-tile-icon"><i class="fas fa-shopping-basket"></i></div>
                        <div class="od-tile-body">
                            <span class="od-tile-label">{{ __('Items') || 'Items' }}</span>
                            <span class="od-tile-value">{{ order_items.length }}</span>
                            <span class="od-tile-sub">{{ __('quantity') }}: {{ totalQuantity }}</span>
                        </div>
                    </div>
                </div>
                <div class="col-6 col-md-3">
                    <div class="figma-kpi-card-v2 od-tile">
                        <div class="figma-kpi-icon-v2 bg-stat-green od-tile-icon"><i class="fas fa-credit-card"></i></div>
                        <div class="od-tile-body">
                            <span class="od-tile-label">{{ __('payment_method') }}</span>
                            <span class="od-tile-value od-tile-value--text">{{ paymentMethodLabel || 'N/A' }}</span>
                            <span v-if="order.wallet_balance > 0" class="od-tile-sub">{{ __('Wallet Used') || 'Wallet Used' }}: {{ $currency }}{{ order.wallet_balance }}</span>
                        </div>
                    </div>
                </div>
                <div class="col-6 col-md-3">
                    <div class="figma-kpi-card-v2 od-tile">
                        <div class="figma-kpi-icon-v2 bg-stat-orange od-tile-icon"><i :class="order.order_type === 'selfpickup' ? 'fas fa-store' : 'fas fa-truck'"></i></div>
                        <div class="od-tile-body">
                            <span class="od-tile-label">{{ hasDeliveryTime ? (__('Delivery Time & Date') || 'Delivery Time & Date') : tr('delivery_type', 'Delivery Type') }}</span>
                            <span class="od-tile-value od-tile-value--text">{{ hasDeliveryTime ? order.delivery_time : (orderTypeLabel || 'N/A') }}</span>
                            <span v-if="hasDeliveryTime && orderTypeLabel" class="od-tile-sub">{{ orderTypeLabel }}</span>
                        </div>
                    </div>
                </div>
                <div class="col-6 col-md-3">
                    <div class="figma-kpi-card-v2 od-tile">
                        <div class="figma-kpi-icon-v2 bg-stat-purple od-tile-icon"><i class="fas fa-receipt"></i></div>
                        <div class="od-tile-body">
                            <span class="od-tile-label">{{ __('Payable Total') || 'Payable Total' }}</span>
                            <span class="od-tile-value">{{ $currency }}{{ order.remaining_final }}</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 4. Two columns -->
            <div class="row g-4">
                <!-- Left Column (8) -->
                <div class="col-lg-8">
                    <!-- Items Ordered Section -->
                    <div class="card od-card">
                        <div class="od-card-header justify-content-between">
                            <h5 class="od-card-title">
                                <base-icon name="Package" width="18" height="18" class="me-2 text-primary" />
                                {{ __('Items Ordered') }}
                            </h5>
                            <span class="item-count-badge">{{ order_items.length }} {{ __('Items') || 'Items' }}</span>
                        </div>
                        <div class="card-body p-0">
                            <div class="table-responsive od-table-wrap">
                                <table class="table align-middle mb-0 od-items-table">
                                    <thead>
                                        <tr>
                                            <th class="text-start">{{ __('product_name') }}</th>
                                            <th class="text-center">{{ __('price') }}</th>
                                            <th class="text-center">{{ __('quantity') }}</th>
                                            <th class="text-end">{{ __('total') }}</th>
                                            <th v-if="login_user && (login_user.role.name === 'Admin' || login_user.role.name === 'Super Admin')"
                                                class="text-center">
                                                {{ __('Action') || 'Action' }}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="item in order_items" :key="item.id" :class="{ 'od-row-cancelled': Number(item.active_status) === 7 }">
                                            <td class="text-start od-td-product">
                                                <div class="od-product">
                                                    <img :src="item.image" class="od-product-img">
                                                    <div class="od-product-info">
                                                        <div class="od-product-name">{{ item.product_name }}</div>
                                                        <div class="od-product-sub">
                                                            {{ __('Variant') || 'Variant' }}: {{ item.variant_name }}</div>
                                                        <div v-if="item.selected_addons && item.selected_addons.length > 0" class="od-product-sub">
                                                            {{ __('addons') || 'Addons' }}:
                                                            {{ item.selected_addons.map(a => a.name).join(', ') }}
                                                            ({{ $currency }}{{ item.addon_price }})</div>
                                                        <div v-if="item.prescriptions && item.prescriptions.length > 0" class="d-flex flex-wrap gap-1 mt-2">
                                                            <div v-for="(pUrl, pIdx) in item.prescriptions" :key="pIdx" class="od-prescription-thumb position-relative border rounded p-1" @click="showPrescription(pUrl)">
                                                                <img :src="pUrl" class="w-100 h-100 object-fit-cover rounded" />
                                                            </div>
                                                        </div>
                                                        <div v-if="item.cancellation_reason" class="od-product-cancel">
                                                            {{ item.cancellation_reason.toLowerCase().includes('cancelled by') ? item.cancellation_reason : (__('cancelled_by_user') || 'Cancelled by user') + ': ' + item.cancellation_reason }}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td class="text-center od-td-num" :data-label="__('price')">{{ $currency }}{{ item.price }}</td>
                                            <td class="text-center od-td-num" :data-label="__('quantity')">{{ item.quantity }}</td>
                                            <td class="text-end od-cell-strong od-td-num" :data-label="__('total')">{{ $currency }}{{ item.sub_total }}</td>
                                            <td v-if="login_user && (login_user.role.name === 'Admin' || login_user.role.name === 'Super Admin')"
                                                class="text-center od-td-action">
                                                <span v-if="Number(item.active_status) === 7" class="od-item-cancelled">
                                                    {{ __('cancelled') || 'Cancelled' }}
                                                </span>
                                                <button v-else-if="canCancelItem(item)" @click="cancelOrderItem(item)" class="btn p-0 d-inline-flex align-items-center justify-content-center cancel-item-btn" :aria-label="__('cancel_item') || 'Cancel Item'">
                                                    <base-icon name="order cancel" width="12.5" height="12.5" useCurrentColor class="od-cancel-icon" />
                                                </button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    <!-- Billing Summary -->
                    <div class="card od-card">
                        <div class="od-card-header">
                            <h5 class="od-card-title">
                                <base-icon name="Receipt" width="18" height="18" class="me-2" />
                                {{ __('Billing Summary') }}
                            </h5>
                        </div>
                        <div class="card-body od-card-body">
                            <div class="billing-list">
                                <div class="od-sum-row od-sum-row--sub">
                                    <span>{{ __('Subtotal') || 'Subtotal' }}
                                        ({{ activeOrderItems.length }} {{ __('items') || 'items' }})</span>
                                    <span>{{ $currency }}{{ activeSubtotal.toFixed(2) }}</span>
                                </div>
                                <div class="od-sum-row" v-if="activeAddonTotal > 0">
                                    <span>{{ __('addons') || 'Addons' }}</span>
                                    <span class="od-sum-val">{{ $currency }}{{ activeAddonTotal.toFixed(2) }}</span>
                                </div>
                                <div class="od-sum-row od-sum-row--error" v-if="order.discount > 0">
                                    <span>{{ __('Discount') || 'Discount' }} ({{ order.discount }}%)</span>
                                    <span class="od-sum-val">-{{ $currency }}{{ discount_in_rupees }}</span>
                                </div>
                                <div class="od-sum-row">
                                    <span>{{ __('Delivery Charges') || 'Delivery Charges' }}</span>
                                    <span class="od-sum-val" v-if="order.delivery_charge == 0">{{ __('Free') || 'Free' }}</span>
                                    <span class="od-sum-val" v-else>{{ $currency }}{{ order.delivery_charge }}</span>
                                </div>
                                <div class="od-sum-row" v-if="getAdditionalChargesTotal(order.additional_charges) > 0">
                                    <span>{{ __('Additional Charges') || 'Additional Charges' }}</span>
                                    <span class="od-sum-val">{{ $currency }}{{ getAdditionalChargesTotal(order.additional_charges) }}</span>
                                </div>
                                <div class="od-sum-row" v-if="order.promo_discount > 0">
                                    <span>{{ __('Promo Code') || 'Promo Code' }}</span>
                                    <span class="od-sum-val">{{ order.promo_code }}</span>
                                </div>
                                <div class="od-sum-row" v-if="order.promo_discount > 0">
                                    <span>{{ __('Promo Discount') || 'Promo Discount' }}</span>
                                    <span class="od-sum-val">-{{ $currency }}{{ order.promo_discount }}</span>
                                </div>
                                <div class="od-sum-row od-sum-row--success" v-if="order.wallet_balance > 0">
                                    <span>{{ __('Wallet Used') || 'Wallet Used' }}</span>
                                    <span class="od-sum-val">-{{ $currency }}{{ order.wallet_balance }}</span>
                                </div>
                                <div class="d-flex justify-content-between align-items-center payable-total-box">
                                    <span>{{ __('Payable Total') || 'Payable Total' }}</span>
                                    <span>{{ $currency }}{{ order.remaining_final }}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Live map for the delivery boy while this order is Out For Delivery -->
                    <rider-live-map v-if="isDeliveryBoyRole && Number(order.active_status) === 5 && order.id"
                        :order-id="order.id"></rider-live-map>
                </div>

                <!-- Right Column (4) -->
                <div class="col-lg-4">
                    <!-- Actions: Order Status + Assign Delivery Partner -->
                    <div class="card od-card od-actions-card">
                        <div class="od-card-header">
                            <h5 class="od-card-title">
                                <i class="fas fa-sliders-h me-2 text-primary od-title-fa"></i>
                                {{ __('actions') }}
                            </h5>
                        </div>
                        <div class="card-body od-card-body">
                            <div class="od-action-block" id="assign_partner_section">
                                <label class="od-action-label">
                                    <base-icon name="CheckCircle" width="16" height="16" class="me-2" />
                                    {{ __('order_status') || 'Order Status' }}
                                </label>
                                <form @submit.prevent="updateStatus" class="od-inline-form od-stack-form">
                                    <select class="form-select" v-model="order_status_id">
                                        <option value="">{{ __('choose_status') || 'Choose Status' }}</option>
                                        <option v-for="status in statuses" :value='status.id'>{{
                                            getStatusDisplayName(status) }}
                                        </option>
                                    </select>
                                    <button type="submit" class="btn btn-primary od-form-btn"
                                        :disabled="order_status_id === '' || isLoadingUstatus">
                                        {{ __('update') || 'Update' }}
                                    </button>
                                </form>
                            </div>
                            <div class="od-action-block" v-if="this.$roleDeliveryBoy !== this.login_user.role.name">
                                <label class="od-action-label">
                                    <base-icon name="Vector (1)" width="16" height="16" class="me-2" />
                                    {{ __('assign_delivery_partner') || 'Assign Delivery Partner' }}
                                </label>
                                <form @submit.prevent="assignDeliveryBoy" class="od-inline-form od-stack-form">
                                    <select class="form-select" v-model="delivery_boy_id">
                                        <option value="">{{ __('select_delivery_boy') }}</option>
                                        <option v-for="boy in deliveryBoys" :value='boy.id'>
                                            {{ getDisplayName(boy.name) }} ({{ boy.pending_order_count }})
                                        </option>
                                    </select>
                                    <button type="submit" class="btn btn-primary od-form-btn"
                                        :disabled="delivery_boy_id === '' || isLoadingDboy">
                                        {{ Number(order.delivery_boy_id) > 0 ? (__('change') || 'Change') : (__('assign') || 'Assign') }}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>

                    <!-- Customer Details -->
                    <div class="card od-card">
                        <div class="od-card-header">
                            <h5 class="od-card-title">
                                <base-icon name="User" width="18" height="18" class="me-2" />
                                {{ __('customer_details') || 'Customer Details' }}
                            </h5>
                        </div>
                        <div class="card-body od-card-body text-start">
                            <div class="od-person">
                                <div class="avatar-box bg-light od-avatar">
                                    {{ order.user_name ? order.user_name.charAt(0).toUpperCase() : 'U' }}
                                </div>
                                <div class="text-start od-person-text">
                                    <div class="od-person-name">{{ order.user_name }}</div>
                                    <div class="od-person-sub">{{ __('Customer Joined') || 'Customer Joined' }}:
                                        <span class="od-person-strong">{{ formatDate(order.user_created_at) || 'N/A'
                                        }}</span>
                                    </div>
                                </div>
                            </div>
                            <div class="od-divider"></div>
                            <div class="od-info-row">
                                <div class="od-info-label">
                                    <base-icon name="Envelope" width="16" height="16" class="me-2" />
                                    {{ __('Email Address') || 'Email Address' }}</div>
                                <div class="od-info-value">
                                    <a v-if="order.user_email" class="od-contact-link" :href="'mailto:' + order.user_email">{{ order.user_email }}</a>
                                </div>
                            </div>
                            <div class="od-info-row mb-0">
                                <div class="od-info-label">
                                    <base-icon name="Phone" width="16" height="16" class="me-2" />
                                    {{ __('Phone Number') || 'Phone Number' }}</div>
                                <div class="od-info-value">
                                    <a v-if="order.user_mobile" class="od-contact-link" :href="customerTel">{{ order.user_mobile }}</a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Shipping Address -->
                    <div class="card od-card">
                        <div class="od-card-header">
                            <h5 class="od-card-title">
                                <base-icon name="MapPinLine" width="18" height="18" class="me-2" />
                                {{ __('shipping_address') || 'Shipping Address' }}
                            </h5>
                        </div>
                        <div class="card-body od-card-body">
                            <div class="d-flex align-items-center flex-wrap mb-2 gap-2">
                                <span class="od-address-type">{{ __('Home Address') || 'Home Address' }}</span>
                                <div class="figma-default-badge">
                                    <span>{{ __('Default') || 'Default' }}</span>
                                </div>
                            </div>
                            <p class="od-address-text mb-0">
                                {{ order.order_address }}
                            </p>
                            <a v-if="mapsUrl" :href="mapsUrl" target="_blank" rel="noopener noreferrer" class="btn btn-outline-primary od-map-btn mt-3">
                                <i class="fas fa-map-marked-alt"></i> {{ tr('open_in_maps', 'Open in Maps') }}
                            </a>
                            <div class="delivery-time-box mt-3" v-if="hasDeliveryTime">
                                <div class="od-delivery-time-label">
                                    {{ __('Delivery Time & Date') || 'Delivery Time & Date' }}</div>
                                <div class="text-dark od-delivery-time-value">{{
                                    order.delivery_time }}
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Delivery Partner Details (Conditional) -->
                    <div class="card od-card"
                        v-if="order.delivery_boy_name || getDisplayName(order.delivery_boy_name_translation)">
                        <div class="od-card-header">
                            <h5 class="od-card-title">
                                <base-icon name="Vector (1)" width="18" height="18"
                                    :class="login_user.role.name === 'Delivery Boy' ? 'db-panel-truck-icon' : 'normal-truck-icon'"
                                    class="me-2" :use-current-color="true" />
                                <span :class="login_user.role.name === 'Delivery Boy' ? 'db-panel-delivery-title' : 'normal-delivery-title'">{{
                                    __('delivery_partner_details') || 'Delivery Partner Details' }}</span>
                            </h5>
                        </div>
                        <div class="card-body od-card-body">
                            <div class="od-person">
                                <div class="avatar-box bg-light od-avatar rounded-circle">
                                    {{ order.delivery_boy_name ? order.delivery_boy_name.charAt(0).toUpperCase() : 'D' }}
                                </div>
                                <div class="text-start od-person-text">
                                    <div class="od-person-name">{{
                                        getDisplayName(order.delivery_boy_name_translation) || order.delivery_boy_name }}
                                    </div>
                                    <div class="od-person-sub">
                                        <a v-if="order.delivery_boy_mobile" class="od-contact-link od-contact-link--sub" :href="'tel:+' + order.delivery_boy_mobile">+{{ order.delivery_boy_mobile }}</a>
                                        <template v-else>+{{ order.delivery_boy_mobile }}</template>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Customer Order Notes Section -->
                    <div class="card od-card order-notes-card" v-if="order.order_note">
                        <div class="od-card-header">
                            <h5 class="od-card-title">
                                <i class="far fa-calendar-check me-2"></i>
                                <span class="order-notes-title">{{ __('Customer Order Notes') || 'Customer Order Notes' }}</span>
                            </h5>
                        </div>
                        <div class="card-body od-card-body">
                            <div class="order-notes-box">
                                <p class="mb-0 order-notes-text">
                                    {{ order.order_note }}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <b-modal v-model="itemModalShow" v-bind:hide-footer="true" :title="__('order_item_details')">
            <b-container fluid>
                <div class="row">
                    <ul class="list-group">
                        <li class="list-group-item"><b>{{ __('name') }} :- </b>{{ item.product_name + " (" +
                            item.variant_name +
                            ")" }}</li>
                        <li class="list-group-item capitalize" v-if="item.active_status">
                            <b>{{ __('status') }} :- </b>{{ getDisplayName(item.status_name_translation) ||
                                item.status_name }}
                        </li>
                        <li class="list-group-item">
                            <span><b>{{ __('product_id') }} :- </b>{{ item.product_id }}</span>
                            <router-link v-if="item.product_id" :to="viewProductRoute" v-b-tooltip.hover title="View"
                                class="figma-action-btn float-end">
                                <i class="bi bi-eye"></i>
                            </router-link>
                        </li>
                        <li class="list-group-item"
                            v-if="item.seller_name || getDisplayName(item.seller_name_translation)">
                            <b>{{ __('seller_name') }} :- </b>{{
                                getDisplayName(item.seller_name_translation) || item.seller_name }}
                        </li>
                        <li class="list-group-item"><b>{{ __('user_name') }} :- </b>{{ item.user_name }}</li>
                        <li class="list-group-item"><b>{{ __('variant_id') }} :- </b>{{ item.product_variant_id }}
                        </li>
                        <li class="list-group-item"><b>{{ __('quantity') }} :- </b>{{ item.quantity }}</li>
                        <li class="list-group-item"><b>{{ __('price') }} :- </b>{{ item.price }}</li>
                        <li class="list-group-item"><b>{{ __('discounted_price') }} ({{ $currency }} ) :- </b>{{
                            item.discounted_price }}</li>
                        <li class="list-group-item"><b>{{ __('tax_amount') }} ({{ $currency }} ) :- </b>{{
                            item.tax_amount }}
                        </li>
                        <li class="list-group-item"><b>{{ __('tax_percentage') }} (%) :- </b>{{ item.tax_percentage
                        }}</li>
                        <li class="list-group-item"><b>{{ __('subtotal') }} ({{ $currency }} ) :- </b>{{
                            item.sub_total }}</li>
                        <li class="list-group-item">
                            <a class=" col-sm-12 btn btn-success"
                                :href="whatsappMessageLink(order.country_code, order.mobile, order.user_name, order.id, item.id)"
                                target="_blank" title="Send Whatsapp Notification">
                                <i class="fab fa-whatsapp"></i>
                            </a>
                        </li>
                    </ul>
                </div>
            </b-container>
            </b-modal>
        <!-- Figma Cancel Order Item Modal -->
        <b-modal id="cancel-item-modal" ref="cancel-item-modal" size="md" centered hide-header hide-footer no-close-on-backdrop class="figma-cancel-modal-wrapper">
            <div class="figma-cancel-modal-content">
                <!-- Header -->
                <div class="figma-cancel-modal-header d-flex justify-content-between align-items-center">
                    <div class="d-flex flex-column text-start">
                        <span class="figma-cancel-title">{{ __('cancel') === 'cancel' ? 'Cancel' : __('cancel') }}</span>
                    </div>
                    <button type="button" class="figma-close-modal-btn" @click="closeCancelModal">
                        <base-icon name="order cancel" width="14" height="14" useCurrentColor />
                    </button>
                </div>
                
                <!-- Body -->
                <div class="figma-cancel-modal-body text-center">
                    <div class="figma-warning-icon-wrapper d-flex align-items-center justify-content-center mx-auto">
                        <base-icon name="warning" width="24" height="24" useCurrentColor />
                    </div>
                    
                    <div class="figma-cancel-info-block">
                        <h3 class="figma-cancel-heading">{{ __('cancel_this_item') === 'cancel_this_item' ? 'Cancel this item?' : __('cancel_this_item') }}</h3>
                        <p class="figma-cancel-description">{{ __('this_action_cannot_be_undone_please_provide_a_reason_for_cancelling_this_item_from_order') === 'this_action_cannot_be_undone_please_provide_a_reason_for_cancelling_this_item_from_order' ? 'This action cannot be undone. Please provide a reason for cancelling this item from order' : __('this_action_cannot_be_undone_please_provide_a_reason_for_cancelling_this_item_from_order') }}</p>
                    </div>
                    
                    <div class="figma-cancel-input-group w-100 text-start">
                        <label class="figma-cancel-input-label">{{ __('cancellation_reason') === 'cancellation_reason' ? 'Cancellation Reason' : __('cancellation_reason') }} <span class="text-danger">*</span></label>
                        <textarea v-model="cancellationReason" class="form-control figma-cancel-textarea" :placeholder="__('eg_out_of_stock_and_etc') === 'eg_out_of_stock_and_etc' ? 'e.g, Out of stock, and etc.' : __('eg_out_of_stock_and_etc')" rows="4"></textarea>
                        <span v-if="cancelModalError" class="text-danger small mt-1 d-block">{{ cancelModalError }}</span>
                    </div>
                </div>
                
                <!-- Footer -->
                <div class="figma-cancel-modal-footer">
                    <button type="button" class="btn btn-figma-keep" @click="closeCancelModal" :disabled="isLoadingCancel">
                        {{ __('keep_item') === 'keep_item' ? 'Keep Item' : __('keep_item') }}
                    </button>
                    <button type="button" class="btn btn-figma-confirm" @click="confirmCancelOrderItem" :disabled="isLoadingCancel">
                        <span v-if="!isLoadingCancel">{{ __('confirm_cancel') === 'confirm_cancel' ? 'Confirm Cancel' : __('confirm_cancel') }}</span>
                        <b-spinner v-else small variant="light"></b-spinner>
                    </button>
                </div>
            </div>
        </b-modal>

        <!-- Prescription Image Modal -->
        <b-modal v-model="prescriptionModalShow" v-bind:hide-footer="true" size="lg" centered :title="__('prescription_view') || 'Prescription Image'">
            <div class="text-center p-2">
                <img :src="selectedPrescriptionUrl" class="img-fluid rounded border shadow-sm" style="max-height: 70vh;" />
                <div class="mt-3">
                    <a :href="selectedPrescriptionUrl" target="_blank" class="btn btn-primary" download>
                        <i class="fa fa-download me-1"></i> {{ __('download') || 'Download' }}
                    </a>
                </div>
            </div>
        </b-modal>
    </div>
</template>
<script>
import axios from "axios";
import Auth from '../../Auth.js';
import RiderLiveMap from '../../components/RiderLiveMap.vue';

export default {
    components: { RiderLiveMap },
    data: function () {
        return {
            login_user: Auth.user,

            isLoading: false,
            isLoadingDboy: false,
            isLoadingUstatus: false,
            isLoadingCancel: false,

            id: null,
            order: [],
            order_items: [],

            discount_in_rupees: 0,
            whatsapp_message: "",

            order_status_id: "",

            liveTrackingWatchId: null,
            liveTrackingLastSentAt: 0,

            selectedItems: [],
            select: '',
            all_select: false,

            statuses: '',
            status_id: '',

            deliveryBoys: '',
            delivery_boy_id: '',
            itemModalShow: false,
            item: '',
            userRole: '', // Change this based on the user's role
            order: {
                order_id: '', // Replace with the actual order ID
            },
            cancellationReason: '',
            cancelItem: null,
            cancelModalError: '',
            prescriptionModalShow: false,
            selectedPrescriptionUrl: '',
        }

    },
    computed: {
        isSellerRoute() {
            // Use this.$route to access the current route
            return this.$route.path.startsWith('/seller/');
        },
        isDeliveryBoyRole() {
            return this.login_user && this.login_user.role && this.login_user.role.name === this.$roleDeliveryBoy;
        },
        isDeliveryBoyRoute() {
            // Use this.$route to access the current route
            return this.$route.path.startsWith('/delivery_boy/');
        },
        activeOrderItems() {
            return this.order_items.filter(item => Number(item.active_status) !== 7);
        },
        activeSubtotal() {
            return this.activeOrderItems.reduce((sum, item) => sum + parseFloat(item.sub_total || 0), 0);
        },
        activeAddonTotal() {
            return this.activeOrderItems.reduce((sum, item) => sum + (parseFloat(item.addon_price || 0) * (item.quantity || 1)), 0);
        },
        invoiceRoute() {
            // Define route configurations based on user roles
            let routeConfig = null;
            switch (this.login_user.role.name) {
                case 'Seller':
                    routeConfig = {
                        name: 'SellerInvoiceOrder',
                        params: { id: this.order.order_id },
                    };
                    break;
                case 'Delivery Boy':
                    routeConfig = {
                        name: 'DeliveryBoyInvoiceOrder',
                        params: { id: this.order.order_id },
                    };
                    break;
                case 'Admin':
                    routeConfig = {
                        name: 'InvoiceOrder',
                        params: { id: this.order.order_id },
                    };
                    break;
                case 'Super Admin':
                    routeConfig = {
                        name: 'InvoiceOrder',
                        params: { id: this.order.order_id },
                    };
                    break;
                default:
                    // Handle any other roles or cases
                    break;
            }

            return routeConfig;
        },
        viewProductRoute() {
            // Define route configurations based on user roles
            let routeConfig = null;
            switch (this.login_user.role.name) {
                case 'Seller':
                    routeConfig = {
                        name: 'SellerViewProduct',
                        params: { id: this.item.product_id },
                    };
                    break;
                case 'Delivery Boy':
                    routeConfig = {
                        name: 'DeliveryBoyViewProduct',
                        params: { id: this.item.product_id },
                    };
                    break;
                case 'Admin':
                    routeConfig = {
                        name: 'ViewProduct',
                        params: { id: this.item.product_id },
                    };
                    break;
                case 'Super Admin':
                    routeConfig = {
                        name: 'ViewProduct',
                        params: { id: this.item.product_id },
                    };
                    break;
                default:
                    // Handle any other roles or cases
                    break;
            }

            return routeConfig;
        },
        // ----- Presentation helpers for the redesigned layout (no data/API changes) -----
        hasDeliveryTime() {
            const t = this.order && this.order.delivery_time;
            return !!(t && typeof t === 'string' && !t.includes('1970') && t.trim() !== '' && t !== 'N/A');
        },
        totalQuantity() {
            return (this.order_items || []).reduce((sum, item) => sum + (parseInt(item.quantity, 10) || 0), 0);
        },
        paymentMethodLabel() {
            const pm = this.order && this.order.payment_method;
            if (!pm || typeof pm !== 'string') return '';
            const key = 'txn_type_' + pm.toLowerCase();
            const translated = this.__(key);
            if (translated && translated !== key) return translated;
            return pm.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
        },
        orderTypeLabel() {
            const o = this.order || {};
            if (o.order_type === 'selfpickup') return this.__('self_pickup');
            if (o.slot_type === 'express') return this.__('express');
            if (o.order_type === 'doorstep') return this.tr('doorstep_delivery', 'Doorstep Delivery');
            return '';
        },
        customerTel() {
            const o = this.order || {};
            if (!o.user_mobile) return '';
            const cc = o.user_country_code ? String(o.user_country_code).replace(/[^0-9]/g, '') : '';
            return 'tel:' + (cc ? '+' + cc : '') + String(o.user_mobile).replace(/\s+/g, '');
        },
        mapsUrl() {
            const o = this.order || {};
            const lat = parseFloat(o.latitude);
            const lng = parseFloat(o.longitude);
            let query = '';
            if (!isNaN(lat) && !isNaN(lng) && (lat !== 0 || lng !== 0)) {
                query = lat + ',' + lng;
            } else if (o.order_address && String(o.order_address).trim() !== '') {
                query = String(o.order_address).trim();
            }
            return query ? 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(query) : '';
        },
        // Order lifecycle stepper. Built only from the current active_status (the order view API
        // returns no per-status history), plus the order date under the first step.
        trackerSteps() {
            const o = this.order || {};
            const current = Number(o.active_status) || 0;
            if (!current) return [];
            const isPickup = o.order_type === 'selfpickup' || [9, 10, 11].includes(current);
            let flow = isPickup ? [9, 10, 11] : [2, 3, 4, 5, 6];
            if (!isPickup && current === 1) flow = [1].concat(flow);
            const icons = {
                1: 'fas fa-wallet', 2: 'fas fa-clipboard-check', 3: 'fas fa-box', 4: 'fas fa-box-open',
                5: 'fas fa-shipping-fast', 6: 'fas fa-home', 9: 'fas fa-clock', 10: 'fas fa-store', 11: 'fas fa-hand-holding',
            };
            const finalIds = [6, 11];
            let currentIdx = flow.indexOf(current);
            if (current === 8) currentIdx = flow.length; // returned => the delivery flow was completed
            const steps = flow.map((id, i) => {
                let state = 'upcoming';
                if (current !== 7 && currentIdx > -1) {
                    if (i < currentIdx) state = 'done';
                    else if (i === currentIdx) state = finalIds.includes(id) ? 'done' : 'current';
                }
                return {
                    key: 's' + id,
                    id,
                    label: this.getStatusLabelById(id),
                    icon: icons[id] || 'fas fa-circle',
                    state,
                    time: (i === 0 && state !== 'upcoming') ? (o.orders_created_at || '') : '',
                };
            });
            if (current === 7 || current === 8) {
                steps.push({
                    key: 's' + current,
                    id: current,
                    label: this.getStatusLabelById(current),
                    icon: current === 7 ? 'fas fa-times' : 'fas fa-undo',
                    state: current === 7 ? 'error' : 'warn',
                    time: '',
                });
            }
            return steps;
        },
    },
    created: function () {
        this.id = this.$route.params.id;
        //this.record = this.$route.params.record;
        if (this.id) {
            this.getOrderStatus();
            this.getOrder();
        }
        if (this.order.discount > 0) {
            let discounted_amount = this.order.total * this.order.discount / 100;
            let remaining_final = this.order.total - discounted_amount;
            this.discount_in_rupees = this.order.total - remaining_final;
        }

    },
    beforeDestroy() {
        this.stopLiveTracking();
    },
    methods: {
        // Translate with an English fallback when the key is missing (window.__ returns the key itself).
        tr(key, fallback) {
            const v = this.__(key);
            return (v && v !== key) ? v : fallback;
        },
        showPrescription(url) {
            this.selectedPrescriptionUrl = url;
            this.prescriptionModalShow = true;
        },

        getDisplayName(name) {
            if (name == null) return '';
            if (typeof name === 'string') {
                const trimmed = name.trim();
                if (trimmed.startsWith('{') && trimmed.endsWith('}')) {
                    try {
                        name = JSON.parse(trimmed);
                    } catch (e) {
                        return name;
                    }
                } else {
                    return name;
                }
            }
            if (typeof name === 'object' && !Array.isArray(name)) {
                if ('name' in name && 'lang' in name) return String(name.name || '').trim();
                const appLocale = window.appLocale || window.localStorage.getItem('lang') || 'en';
                const forLocale = name[appLocale];
                if (forLocale != null && String(forLocale).trim() !== '') return String(forLocale).trim();
                const firstNonEmpty = Object.values(name).find(val => val != null && String(val).trim() !== '');
                return firstNonEmpty != null ? String(firstNonEmpty).trim() : '';
            }
            return String(name);
        },
        getStatusDisplayName(status) {
            if (!status) return '';
            const sn = status.status_name;
            if (sn == null) return status.status || '';
            if (typeof sn === 'string') return sn.trim() || status.status || '';
            if (typeof sn === 'object' && !Array.isArray(sn)) {
                const appLocale = window.appLocale || window.localStorage.getItem('lang') || 'en';
                const forLocale = sn[appLocale];
                if (forLocale != null && String(forLocale).trim() !== '') return String(forLocale).trim();
                const first = Object.values(sn).find(val => val != null && String(val).trim() !== '');
                return first != null ? String(first).trim() : (status.status || '');
            }
            return status.status || '';
        },
        getOrderStatus: function () {
            let vm = this;
            axios.get(this.$apiUrl + '/order_statuses').then((response) => {

                this.isLoading = false
                let data = response.data;
                const statusesToRemoveIds = [7, 8];
                this.statuses = data.data.filter(status => !statusesToRemoveIds.includes(status.id));
            }).catch(error => {
                vm.isLoading = false;
                if (error.request.statusText) {
                    this.showError(error.request.statusText);
                } else if (error.message) {
                    this.showError(error.message);
                } else {
                    this.showError("Something went wrong!");
                }
            });
        },
        formatDate(dateTime) {
            if (!dateTime) return 'N/A';
            const date = new Date(dateTime);
            if (isNaN(date.getTime())) return 'N/A';
            const day = date.getDate().toString().padStart(2, '0');
            const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is 0-based
            const year = date.getFullYear();

            return `${day}-${month}-${year}`;
        },
        getOrder() {
            this.isLoading = true
            axios.get(this.$apiUrl + '/orders/view/' + this.id)
                .then((response) => {
                    this.isLoading = false
                    let data = response.data;
                    if (data.status === 1) {
                        this.order = response.data.data.order;
                        this.order_items = response.data.data.order_items;
                        this.deliveryBoys = response.data.data.deliveryBoys;

                        this.delivery_boy_id = (this.order.delivery_boy_id != 0 && this.order.delivery_boy_id != "") ? this.order.delivery_boy_id : "";
                        this.order_status_id = (this.order.active_status != 0 && this.order.active_status != "") ? this.order.active_status : "";

                        this.syncLiveTracking();
                    } else {
                        this.showError(data.message);
                        setTimeout(() => {
                            this.$router.back();
                        }, 1000);
                    }
                }).catch(error => {
                    this.isLoading = false;
                    if (error.request.statusText) {
                        this.showError(error.request.statusText);
                    } else if (error.message) {
                        this.showError(error.message);
                    } else {
                        this.showError("Something went wrong!");
                    }
                });
        },

        // Live tracking: the delivery boy's mobile app pushes GPS via update_location while
        // an order is Out For Delivery - the web panel never did, so customers never got live
        // tracking data for orders worked from here. Mirrors that same behavior in the browser
        // via watchPosition, only while this delivery boy has this order open and it's Out For
        // Delivery (active_status 5 - the only status this feature makes sense for).
        syncLiveTracking() {
            if (this.login_user.role.name !== this.$roleDeliveryBoy || !navigator.geolocation) {
                return;
            }
            if (Number(this.order.active_status) === 5) {
                this.startLiveTracking();
            } else {
                this.stopLiveTracking();
            }
        },
        startLiveTracking() {
            if (this.liveTrackingWatchId !== null) return;
            this.liveTrackingWatchId = navigator.geolocation.watchPosition(
                (position) => this.sendLiveTrackingUpdate(position),
                (error) => console.error('Live tracking location error:', error.message),
                { enableHighAccuracy: true, maximumAge: 10000 }
            );
        },
        stopLiveTracking() {
            if (this.liveTrackingWatchId === null) return;
            navigator.geolocation.clearWatch(this.liveTrackingWatchId);
            this.liveTrackingWatchId = null;
        },
        sendLiveTrackingUpdate(position) {
            // watchPosition can fire far more often than needed - send at most every 15s.
            const now = Date.now();
            if (now - this.liveTrackingLastSentAt < 15000) return;
            this.liveTrackingLastSentAt = now;

            // update_location needs only the position: the server saves it for every order this
            // rider has Out For Delivery.
            const formData = new FormData();
            formData.append('latitude', position.coords.latitude);
            formData.append('longitude', position.coords.longitude);

            axios.post(this.$deliveryBoyApiUrl + '/update_location', formData)
                .catch(error => {
                    console.error('Failed to send live tracking update:', error);
                });
        },

        sendInfo(item) {
            this.item = item;
            this.itemModalShow = true;
        },


        whatsappMessageLink(country_code, mobile, user_name, order_id, item_id) {
            return "https://api.whatsapp.com/send?phone=+" + country_code + " " + mobile + "&text=Hello " + user_name + " ,Your order with ID :" + order_id + " is  " + item_id + ". Please take a note of it. If you have further queries feel free to contact us. Thank you.";
        },
        updateStatus() {
            let vm = this;
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
                    this.isLoadingUstatus = true
                    let postData = {
                        order_id: this.id,
                        status_id: this.order_status_id,
                    }
                    axios.post(this.$apiUrl + '/orders/update_status', postData).then((response) => {
                        this.isLoadingUstatus = false
                        let data = response.data;
                        if (data.status === 1) {
                            //this.showSuccess(data.message);
                            this.order_status_id = '';
                            this.getOrder();
                            this.showMessage("success", data.message);
                            setTimeout(
                                function () {
                                    vm.$swal.close();
                                }, 2000);
                        } else {
                            vm.showError(data.message);
                            vm.isLoadingUstatus = false;
                        }
                    }).catch(error => {
                        vm.isLoadingUstatus = false;
                        this.showError("Something went wrong!");
                    });
                }
            });
        },

        assignDeliveryBoy() {
            this.isLoadingDboy = true
            let postData = {
                order_id: this.id,
                delivery_boy_id: this.delivery_boy_id
            }
            axios.post(this.$apiUrl + '/orders/assign_delivery_boy', postData).then((response) => {
                this.isLoadingDboy = false
                let data = response.data;
                if (data.status === 1) {

                    this.delivery_boy_id = '';
                    this.getOrder();
                    this.showMessage("success", data.message);
                    setTimeout(
                        function () {
                            vm.$swal.close();
                        }, 2000);
                } else {
                    this.showMessage("error", data.message);
                    this.isLoadingDboy = false;
                }
            }).catch(error => {
                this.isLoadingDboy = false;
                this.showError("Something went wrong!");
            });
        },

        downloadInvoice() {
            this.isLoading = true;
            let postData = {
                order_id: this.id,
            }
            axios({
                url: this.$apiUrl + '/orders/invoice_download',
                method: 'post',
                responseType: 'blob',

                data: postData
            }).then((response) => {
                var fileURL = window.URL.createObjectURL(new Blob([response.data]));
                var fileLink = document.createElement('a');
                fileLink.href = fileURL;
                fileLink.setAttribute('download', 'Invoice-No:#' + this.id + '.pdf');
                document.body.appendChild(fileLink);
                fileLink.click();
                this.isLoading = false;
            }).catch(error => {
                if (error.request.statusText) {
                    this.showError(error.request.statusText);
                } else if (error.message) {
                    this.showError(error.message);
                } else {
                    this.showError("Something went wrong!");
                }
                this.isLoading = false;
            });
        },


        allSelectCheckBox() {
            if (this.all_select == false) {
                this.all_select = true
                this.order_items.forEach(item => {
                    this.selectedItems.push(item.id)
                });
            } else {
                this.all_select = false
                this.selectedItems = []
            }
        },
        selectCheckBox() {
            let uniqueSelectedItems = [...new Set(this.selectedItems)];
            if (this.order_items.length === uniqueSelectedItems.length) {
                this.all_select = true
            } else {
                this.all_select = false
            }
        },
        updateItemsStatus() {
            let vm = this;
            let uniqueSelectedItems = [...new Set(this.selectedItems)];
            if (uniqueSelectedItems.length !== 0) {
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
                        let ids = uniqueSelectedItems.toString();
                        this.isLoading = true
                        let postData = {
                            ids: ids,
                            status_id: this.status_id
                        }
                        axios.post(this.$apiUrl + '/orders/update_items_status', postData).then((response) => {
                            this.isLoading = false
                            let data = response.data;
                            if (data.status === 1) {

                                this.getOrder();
                                this.status_id = '';
                                this.selectedItems = [];
                                this.all_select = false;
                                this.showMessage("success", data.message);
                                setTimeout(
                                    function () {
                                        vm.$swal.close();
                                    }, 2000);
                            } else {
                                vm.showError(data.message);
                                vm.isLoading = false;
                            }
                        }).catch(error => {
                            vm.isLoading = false;
                            this.showError("Something went wrong!");
                        });
                    }
                });
            } else {
                this.showWarning("Select at least one record!");
            }
        },
        getAdditionalChargesTotal(charges) {
            if (!charges || !Array.isArray(charges)) return 0;
            return charges.reduce((total, charge) => total + (parseFloat(charge.amount) || 0), 0).toFixed(2);
        },
        canCancelItem(item) {
            // 6=delivered, 7=cancelled, 8=returned
            return item.active_status != 6 && item.active_status != 7 && item.active_status != 8
                && item.active_status != 11; // 11=selfPickupPicked
        },
        cancelOrderItem(item) {
            this.cancelItem = item;
            this.cancellationReason = '';
            this.cancelModalError = '';
            this.$refs['cancel-item-modal'].show();
        },
        closeCancelModal() {
            this.$refs['cancel-item-modal'].hide();
            this.cancelItem = null;
            this.cancellationReason = '';
            this.cancelModalError = '';
        },
        confirmCancelOrderItem() {
            if (!this.cancellationReason || !this.cancellationReason.trim()) {
                this.cancelModalError = (this.__('cancellation_reason') || 'Cancellation reason') + ' ' + (this.__('is_required') || 'is required');
                return;
            }
            this.cancelModalError = '';
            this.isLoadingCancel = true;

            let postData = {
                order_item_id: this.cancelItem.id,
                cancellation_reason: this.cancellationReason,
            };

            axios.post(this.$apiUrl + '/orders/cancel_order_item', postData)
                .then((response) => {
                    this.isLoadingCancel = false;
                    let data = response.data;
                    if (data.status === 1) {
                        this.getOrder();
                        this.showMessage("success", data.message);
                        this.closeCancelModal();
                    } else {
                        this.showError(data.message);
                    }
                }).catch(error => {
                    this.isLoadingCancel = false;
                    this.showError(error.message || 'Something went wrong!');
                });
        },
        getStatusBadgeClass(statusId) {
            const id = Number(statusId);
            const classMap = {
                1: 'status-pending',         // Payment Pending
                2: 'status-received',        // Received
                3: 'status-processed',       // Processed
                4: 'status-shipped',         // Shipped
                5: 'status-outfordelivery',  // Out For Delivery
                6: 'status-delivered',       // Delivered
                7: 'status-cancelled',       // Cancelled
                8: 'status-returned',        // Returned
                9: 'status-pending',         // Pending (Self Pickup)
                10: 'status-processed',      // Ready for Pickup (Self Pickup)
                11: 'status-delivered',      // Picked Up (Self Pickup)
            };
            return classMap[id] || 'status-default';
        },
        getStatusLabelById(val) {
            if (val == null || val === '') return '';
            const id = typeof val === 'number' ? val : parseInt(val, 10);
            if (!isNaN(id)) {
                const map = { 1: 'payment_pending', 2: 'received', 3: 'processed', 4: 'shipped', 5: 'outForDelivery', 6: 'delivered', 7: 'cancelled', 8: 'returned', 9: 'pending', 10: 'ready_for_pickup', 11: 'picked_up' };
                const key = map[id];
                return key ? this.__(key) : String(val);
            }
            return String(val);
        },
    }
};
</script>

<style scoped>
::v-deep .cancel-item-btn svg path,
::v-deep .cancel-item-btn:hover svg path {
    fill: var(--theme-error-500) !important;
}

/* ===== Order detail (SnapBuy layout) ===== */
.modern-page-title {
    font-family: var(--ui-font);
    font-weight: 700;
    font-size: 20px;
    line-height: 28px;
    color: var(--ui-heading);
}

.order-meta-bar {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 8px 24px;
    padding-top: 12px;
    border-top: 1px solid var(--ui-border);
    font-family: var(--ui-font);
    font-size: 13px;
    line-height: 20px;
}

.order-meta-date,
.order-meta-seller {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 6px;
}

.order-meta-bar i {
    color: var(--ui-text-muted);
    font-size: 13px;
}

.card {
    border: 1px solid var(--ui-border) !important;
    border-radius: var(--ui-radius-lg) !important;
    overflow: hidden;
    margin-bottom: 24px;
}

.item-count-badge {
    display: inline-flex;
    align-items: center;
    height: 26px;
    padding: 0 10px;
    border-radius: var(--ui-radius-sm);
    background-color: var(--ui-surface-muted);
    border: 1px solid var(--ui-border);
    color: var(--ui-text);
    font-weight: 600;
    font-size: 12px;
    white-space: nowrap;
}

body.theme-dark .item-count-badge {
    background-color: var(--theme-neutral-700) !important;
    border-color: var(--theme-neutral-600) !important;
    color: var(--theme-neutral-100) !important;
}

.cancel-item-btn {
    width: 32px;
    height: 32px;
    border-radius: var(--ui-radius);
    border: 1px solid color-mix(in srgb, var(--theme-error-500) 30%, transparent) !important;
    background: var(--theme-error-50);
    color: var(--theme-error-500);
}

.cancel-item-btn:hover {
    background: color-mix(in srgb, var(--theme-error-500) 18%, transparent);
}

.delivery-time-box {
    padding: 10px 12px;
    background: var(--theme-error-50);
    border: 1px solid var(--theme-error-200);
    border-radius: var(--ui-radius);
}

body.theme-dark .delivery-time-box {
    background: color-mix(in srgb, var(--theme-error-500) 15%, transparent) !important;
    border-color: color-mix(in srgb, var(--theme-error-500) 30%, transparent) !important;
}

.order-notes-box {
    background-color: var(--theme-info-50);
    border-inline-start: 3px solid var(--theme-info-500);
    border-radius: var(--ui-radius);
    padding: 12px 14px;
    text-align: start;
}

.order-notes-text {
    font-size: 13px;
    line-height: 20px;
    color: var(--ui-text);
}

@media (max-width: 575.98px) {
    .order-header-card {
        padding: 14px 16px;
    }

    .od-print-btn {
        width: 100%;
        justify-content: center;
    }

    .od-card-body {
        padding: 16px;
    }

    .od-card-header {
        padding: 12px 16px;
    }
}

/* order-notes-box/title/text use hardcoded light inline colors (light-blue bg, near-black
   text) that stay light-only - the broad dark-mode span/div text-color override further down
   then forces near-white text onto that unchanged light-blue background, making it unreadable. */
body.theme-dark .order-notes-box {
    background-color: color-mix(in srgb, var(--theme-info-500) 15%, transparent) !important;
    border-left-color: var(--theme-info-500) !important;
}

body.theme-dark .order-notes-title,
body.theme-dark .order-notes-text {
    color: var(--theme-neutral-100) !important;
}

/* Base text color fixes for dark mode in this component */
body.theme-dark .modern-page-title,
body.theme-dark .figma-text-xl-semibold,
body.theme-dark .text-dark,
body.theme-dark h2,
body.theme-dark h3,
body.theme-dark h4,
body.theme-dark h5,
body.theme-dark span,
body.theme-dark th,
body.theme-dark td,
body.theme-dark div:not(.figma-status-pill) {
    color: var(--theme-neutral-100) !important;
}

body.theme-dark .text-secondary,
body.theme-dark .text-muted {
    color: var(--theme-neutral-400) !important;
}

body.theme-dark .card-header,
body.theme-dark .table thead,
body.theme-dark .table thead th {
    background-color: var(--theme-neutral-800) !important;
    border-top-color: var(--theme-neutral-700) !important;
    border-bottom-color: var(--theme-neutral-700) !important;
}

body.theme-dark .table tbody tr td {
    background-color: var(--theme-neutral-800) !important;
    border-bottom: 1px solid var(--theme-neutral-700) !important;
}

body.theme-dark table.table tbody tr:hover td {
    background-color: var(--theme-neutral-800) !important;
}

body.theme-dark .card {
    background-color: var(--theme-neutral-800) !important;
    border-color: var(--theme-neutral-700) !important;
}

body.theme-dark .form-select,
body.theme-dark .form-control {
    background-color: var(--theme-neutral-900) !important;
    border-color: var(--theme-neutral-700) !important;
    color: var(--theme-neutral-100) !important;
}

body.theme-dark .order-details-wrapper>div:first-child {
    background: linear-gradient(180deg, var(--theme-neutral-800) 0%, var(--theme-neutral-900) 100%) !important;
    border: 1px solid var(--theme-neutral-700) !important;
}

body.theme-dark .delivery-time-box div {
    color: var(--theme-error-400) !important;
}

body.theme-dark .delivery-time-box .text-dark {
    color: var(--theme-neutral-100) !important;
}

/* Print Order button contrast */
body.theme-dark .btn-dark {
    background-color: var(--theme-neutral-700) !important;
    border-color: var(--theme-neutral-600) !important;
}

body.theme-dark .avatar-box.bg-light {
    background-color: var(--theme-neutral-700) !important;
    color: var(--theme-success-500) !important;
}

.figma-default-badge {
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    height: 22px !important;
    padding: 0 8px !important;
    background: var(--theme-success-50) !important;
    border-radius: 8px !important;
}

.figma-default-badge span {
    font-family: var(--ui-font) !important;
    font-weight: 600 !important;
    font-size: 12px !important;
    line-height: 16px !important;
    color: var(--theme-success-500) !important;
    text-align: center !important;
}

body.theme-dark .figma-default-badge {
    background: color-mix(in srgb, var(--theme-success-500) 15%, transparent) !important;
}

body.theme-dark .figma-default-badge span {
    color: var(--theme-success-500) !important;
}

.normal-seller-name {
    color: var(--Colors-Shades-Neutral-N---950, var(--theme-neutral-950)) !important;
}

body.theme-dark .normal-seller-name {
    color: var(--theme-neutral-100) !important;
}

.db-panel-seller-name {
    color: var(--Colors-Shades-Neutral-N---950, var(--theme-neutral-950)) !important;
}

body.theme-dark .db-panel-seller-name {
    color: var(--theme-neutral-50) !important;
}

.normal-truck-icon {
    color: var(--theme-neutral-950) !important;
}

body.theme-dark .normal-truck-icon {
    color: var(--theme-neutral-100) !important;
}

.db-panel-truck-icon {
    color: var(--theme-neutral-950) !important;
}

body.theme-dark .db-panel-truck-icon {
    color: var(--theme-neutral-50) !important;
}

.normal-delivery-title {
    color: var(--theme-neutral-950) !important;
}

body.theme-dark .normal-delivery-title {
    color: var(--theme-neutral-100) !important;
}

.db-panel-delivery-title {
    color: var(--theme-neutral-950) !important;
}

body.theme-dark .db-panel-delivery-title {
    color: var(--theme-neutral-50) !important;
}

/* Cancel order item modal (tidy header / body / footer) */
.figma-cancel-modal-content {
    display: flex;
    flex-direction: column;
    font-family: var(--ui-font);
}

.figma-cancel-modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
    padding: 16px 20px;
    border-bottom: 1px solid var(--ui-border);
}

.figma-cancel-modal-body {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    padding: 20px;
}

.figma-cancel-modal-footer {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 8px;
    padding: 14px 20px;
    border-top: 1px solid var(--ui-border);
    background: var(--ui-surface);
}

.figma-cancel-title {
    color: var(--ui-heading);
    font-size: 16px;
    font-weight: 700;
    line-height: 24px;
}

.figma-close-modal-btn {
    width: 32px;
    height: 32px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: var(--ui-radius);
    border: 1px solid var(--ui-border);
    background: var(--ui-surface);
    color: var(--ui-text-muted);
    cursor: pointer;
    transition: all 0.2s ease;
}

.figma-close-modal-btn:hover {
    background: var(--ui-surface-muted);
    color: var(--ui-heading);
}

.figma-warning-icon-wrapper {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: var(--theme-error-50);
    color: var(--theme-error-500);
}

.figma-cancel-heading {
    font-size: 16px;
    font-weight: 700;
    line-height: 24px;
    color: var(--ui-heading);
    margin-bottom: 4px;
}

.figma-cancel-description {
    font-size: 13px;
    line-height: 20px;
    color: var(--ui-text-muted);
    margin: 0 auto;
    max-width: 400px;
}

.figma-cancel-input-label {
    display: block;
    font-size: 13px;
    font-weight: 600;
    color: var(--ui-heading);
    margin-bottom: 6px;
}

.figma-cancel-textarea {
    width: 100%;
    min-height: 110px;
    border-radius: var(--ui-radius);
    border: 1px solid var(--ui-border-strong);
    background: var(--ui-surface);
    color: var(--ui-text);
    font-size: 13px;
    padding: 10px 12px;
    resize: vertical;
}

.figma-cancel-textarea:focus {
    border-color: var(--theme-error-500);
    outline: none;
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--theme-error-500) 15%, transparent);
}

.btn-figma-keep,
.btn-figma-confirm {
    height: 38px;
    padding: 0 16px;
    border-radius: var(--ui-radius);
    font-size: 13px;
    font-weight: 600;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
}

.btn-figma-keep {
    border: 1px solid var(--ui-border-strong);
    background: var(--ui-surface);
    color: var(--ui-text);
}

.btn-figma-keep:hover {
    background: var(--ui-surface-muted);
    color: var(--ui-heading);
}

.btn-figma-confirm {
    border: 1px solid var(--theme-error-500);
    background: var(--theme-error-500);
    color: var(--theme-neutral-50);
}

.btn-figma-confirm:hover {
    background: var(--theme-error-600);
    border-color: var(--theme-error-600);
    color: var(--theme-neutral-50);
}
/* ===== Redesign: header actions, progress tracker, summary tiles, actions card ===== */
.od-head-title {
    min-width: 0;
}

.od-head-actions {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 8px;
}

.od-title-fa {
    font-size: 15px;
    width: 18px;
    text-align: center;
}

/* Progress tracker (horizontal on >= 576px, vertical on phones) */
.od-track-card .od-card-body {
    padding: 20px 20px 18px;
}

.od-track {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    align-items: flex-start;
    font-family: var(--ui-font);
}

.od-track-step {
    position: relative;
    flex: 1 1 0;
    min-width: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 8px;
    padding: 0 4px;
}

/* connector from this step to the next one; coloured once this step is complete */
.od-track-step:not(:last-child)::after {
    content: '';
    position: absolute;
    top: 17px;
    inset-inline-start: calc(50% + 24px);
    inset-inline-end: calc(-50% + 24px);
    height: 2px;
    border-radius: 2px;
    background: var(--ui-border-strong);
}

.od-track-step.is-done:not(:last-child)::after {
    background: var(--theme-primary-500);
}

.od-track-dot {
    position: relative;
    z-index: 1;
    width: 36px;
    height: 36px;
    flex-shrink: 0;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    border: 1px solid var(--ui-border-strong);
    background: var(--ui-surface);
    color: var(--ui-text-subtle);
    font-size: 14px;
    transition: all .2s ease;
}

.od-track-step.is-done .od-track-dot {
    background: var(--theme-primary-500);
    border-color: var(--theme-primary-500);
    color: #fff;
}

.od-track-step.is-current .od-track-dot {
    background: var(--ui-primary-soft);
    border: 2px solid var(--theme-primary-500);
    color: var(--theme-primary-600);
    box-shadow: 0 0 0 4px color-mix(in srgb, var(--theme-primary-500) 15%, transparent);
}

.od-track-step.is-error .od-track-dot {
    background: var(--theme-error-500);
    border-color: var(--theme-error-500);
    color: #fff;
    box-shadow: 0 0 0 4px color-mix(in srgb, var(--theme-error-500) 15%, transparent);
}

.od-track-step.is-warn .od-track-dot {
    background: var(--theme-warn-500);
    border-color: var(--theme-warn-500);
    color: #fff;
    box-shadow: 0 0 0 4px color-mix(in srgb, var(--theme-warn-500) 15%, transparent);
}

.od-track-text {
    display: flex;
    flex-direction: column;
    gap: 2px;
    min-width: 0;
}

.od-track-label {
    font-size: 12px;
    line-height: 16px;
    font-weight: 600;
    color: var(--ui-text-muted);
    overflow-wrap: anywhere;
}

.od-track-step.is-done .od-track-label {
    color: var(--ui-heading);
}

.od-track-step.is-current .od-track-label {
    color: var(--theme-primary-600);
    font-weight: 700;
}

.od-track-step.is-error .od-track-label {
    color: var(--theme-error-600);
    font-weight: 700;
}

.od-track-step.is-warn .od-track-label {
    color: var(--theme-warn-700);
    font-weight: 700;
}

.od-track-time {
    font-size: 11px;
    line-height: 15px;
    color: var(--ui-text-subtle);
}

/* Summary tiles */
.od-tiles {
    margin-bottom: 24px;
    justify-content: flex-start;
}

.od-tile {
    height: 100% !important; /* equal-height tiles; global .figma-kpi-card-v2 sets height:auto !important */
    min-height: 76px;
    gap: 12px;
    padding: 14px 16px !important; /* global .figma-kpi-card-v2 padding uses !important */
    box-shadow: var(--ui-shadow);
}

.od-tile-icon {
    width: 42px !important; /* global .figma-kpi-icon-v2 size uses !important */
    height: 42px !important;
    border-radius: 10px !important;
}

.od-tile-icon i {
    font-size: 17px !important;
}

.od-tile-body {
    display: flex;
    flex-direction: column;
    min-width: 0;
    font-family: var(--ui-font);
}

.od-tile-label {
    font-size: 12px;
    line-height: 16px;
    font-weight: 600;
    color: var(--ui-text-muted);
}

.od-tile-value {
    font-size: 18px;
    line-height: 24px;
    font-weight: 700;
    color: var(--ui-heading);
    overflow-wrap: anywhere;
}

.od-tile-value--text {
    font-size: 14px;
    line-height: 20px;
}

.od-tile-sub {
    font-size: 11px;
    line-height: 16px;
    color: var(--ui-text-subtle);
    overflow-wrap: anywhere;
}

/* Actions card (Order Status + Assign Delivery Partner, stacked) */
.od-action-block + .od-action-block {
    margin-top: 16px;
    padding-top: 16px;
    border-top: 1px solid var(--ui-border);
}

.od-action-label {
    display: flex;
    align-items: center;
    margin-bottom: 8px;
    font-family: var(--ui-font);
    font-size: 13px;
    font-weight: 600;
    color: var(--ui-heading);
}

.od-stack-form {
    flex-direction: column;
    align-items: stretch;
}

.od-stack-form .form-select {
    width: 100%;
    height: 40px;
}

.od-stack-form .od-form-btn {
    width: 100%;
    height: 40px;
}

/* Contacts / maps */
.od-person-text {
    min-width: 0;
}

.od-contact-link {
    color: var(--ui-heading);
    text-decoration: none;
    word-break: break-word;
}

.od-contact-link:hover {
    color: var(--theme-primary-600);
    text-decoration: underline;
}

.od-contact-link--sub {
    color: var(--ui-text-muted);
    font-weight: 400;
}

.od-map-btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    height: 34px;
    padding: 0 12px;
    font-size: 12px;
    font-weight: 600;
    border-radius: var(--ui-radius);
}

/* Items table: cancelled rows are dimmed */
.od-row-cancelled .od-product-img {
    opacity: .55;
}

.od-row-cancelled .od-td-num {
    color: var(--ui-text-subtle);
    text-decoration: line-through;
}

@media (max-width: 991.98px) {
    .od-tile-value {
        font-size: 16px;
    }
}

/* Phones: vertical tracker + items as compact rows */
@media (max-width: 575.98px) {
    .od-head-actions {
        width: 100%;
    }

    .od-track {
        flex-direction: column;
    }

    .od-track-step {
        flex-direction: row;
        align-items: flex-start;
        text-align: start;
        gap: 12px;
        padding: 0 0 18px;
        width: 100%;
    }

    .od-track-step:last-child {
        padding-bottom: 0;
    }

    .od-track-step:not(:last-child)::after {
        top: 38px;
        bottom: 2px;
        inset-inline-start: 17px;
        inset-inline-end: auto;
        width: 2px;
        height: auto;
    }

    .od-track-text {
        padding-top: 8px;
    }

    .od-tile {
        flex-direction: column;
        align-items: flex-start !important; /* global kpi card centres items */
        gap: 8px;
        padding: 12px !important;
    }

    .od-tile-icon {
        width: 34px !important;
        height: 34px !important;
    }

    .od-tile-icon i {
        font-size: 14px !important;
    }

    .od-items-table {
        min-width: 0;
    }

    .od-items-table thead {
        display: none;
    }

    .od-items-table tbody tr {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 6px 12px;
        padding: 12px 16px;
        border-bottom: 1px solid var(--ui-border);
    }

    .od-items-table tbody tr:last-child {
        border-bottom: none;
    }

    .od-items-table tbody td {
        display: block;
        padding: 0 !important; /* overrides global .od-items-table first/last-child padding */
        border: none;
        text-align: start !important; /* table cells switch to stacked row layout */
    }

    .od-items-table tbody td.od-td-product {
        flex: 1 1 100%;
    }

    .od-items-table tbody td.od-td-num {
        flex: 1 1 0;
        font-size: 13px;
    }

    .od-items-table tbody td.od-td-num::before {
        content: attr(data-label);
        display: block;
        font-size: 11px;
        line-height: 14px;
        font-weight: 600;
        text-transform: uppercase;
        color: var(--ui-text-subtle);
    }

    .od-items-table tbody td.od-td-action {
        flex: 0 0 auto;
        margin-left: auto;
    }

    /* Summary tiles: two per row (a broader phone rule elsewhere stretched them to full width) */
    #main .od-tiles > [class*="col"] {
        flex: 0 0 50% !important;
        max-width: 50% !important;
    }

    /* Item rows: the shared #main table rule re-adds cell padding, which pushed the cancel button
       onto its own line; keep price / qty / total / action on one row */
    #main .od-items-table tbody td {
        padding: 0 !important;
        border: 0 !important;
    }

    #main .od-items-table tbody td.od-td-num {
        min-width: 0;
    }
}

/* Dark mode: the broad span/div text override above would flatten the tracker/tile text
   hierarchy, so re-apply the token colours (needs !important to beat that rule). */
body.theme-dark .od-track-label,
body.theme-dark .od-tile-label {
    color: var(--theme-neutral-300) !important;
}

body.theme-dark .od-track-time,
body.theme-dark .od-tile-sub {
    color: var(--theme-neutral-400) !important;
}

body.theme-dark .od-track-step.is-done .od-track-label,
body.theme-dark .od-tile-value {
    color: var(--theme-neutral-100) !important;
}

body.theme-dark .od-track-step.is-current .od-track-label {
    color: var(--theme-primary-400) !important;
}

body.theme-dark .od-track-step.is-error .od-track-label {
    color: var(--theme-error-400) !important;
}

body.theme-dark .od-track-step.is-warn .od-track-label {
    color: var(--theme-warn-400) !important;
}

body.theme-dark .od-track-dot {
    background: var(--theme-neutral-800);
    border-color: var(--theme-neutral-600);
    color: var(--theme-neutral-400) !important; /* dot is a span: beats the broad span override */
}

body.theme-dark .od-track-step.is-current .od-track-dot {
    background: color-mix(in srgb, var(--theme-primary-500) 20%, transparent);
    color: var(--theme-primary-400) !important;
}

body.theme-dark .od-track-step.is-done .od-track-dot,
body.theme-dark .od-track-step.is-error .od-track-dot,
body.theme-dark .od-track-step.is-warn .od-track-dot {
    color: #fff !important;
}

body.theme-dark .od-track-step:not(:last-child)::after {
    background: var(--theme-neutral-600);
}

body.theme-dark .od-track-step.is-done:not(:last-child)::after {
    background: var(--theme-primary-500);
}

body.theme-dark .od-tile {
    background: var(--theme-neutral-800) !important; /* global kpi card bg uses !important */
    border-color: var(--theme-neutral-700) !important;
}

body.theme-dark .od-action-label,
body.theme-dark .od-contact-link {
    color: var(--theme-neutral-100) !important;
}
</style>

<style>
/* Cancel item modal shell (b-modal renders outside the scoped DOM) */
#cancel-item-modal .modal-dialog {
    max-width: 480px;
}

#cancel-item-modal .modal-content {
    border-radius: var(--ui-radius-lg);
    border: 1px solid var(--ui-border);
    background: var(--ui-surface);
    box-shadow: var(--ui-shadow-lg);
    overflow: hidden;
}

#cancel-item-modal .modal-body {
    padding: 0;
}
</style>
