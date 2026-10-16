<template>
    <div>
        <!-- Added Figma Typography and Layout properties here -->
        <div class="page-heading d-flex justify-content-between align-items-center mb-4 view_order">
            <h3 class="modern-page-title mb-0"
                style="font-weight: 500; font-size: 24px; line-height: 32px; letter-spacing: 0%; color: #000000;">
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

        <div v-if="order" class="order-details-wrapper">
            <!-- Order Header Card -->
            <div class="mb-4 order-header-card"
                style="width: 100%; padding: 24px; gap: 16px; opacity: 1; border-radius: 16px; border: 1px solid #EDEDED; display: flex; flex-direction: column; transform: rotate(0deg);">
                <!-- Top Row -->
                <div class="d-flex flex-wrap align-items-center justify-content-between gap-3">
                    <div class="d-flex flex-wrap align-items-center gap-3">
                        <h2 class="figma-text-xl-semibold mb-0"
                            style="font-weight: 700; font-size: 30px; line-height: 36px; letter-spacing: 0%; color: var(--Colors-Shades-Neutral-N---950, #000000);">
                            {{ __('Order') || 'Order' }} #{{ order.id }}</h2>
                        <div class="d-flex flex-wrap gap-2">
                            <span class="figma-status-pill" :class="getStatusBadgeClass(order.active_status)">
                                {{ getStatusLabelById(order.active_status) }}
                            </span>
                            <span v-if="order.wallet_balance > 0" class="figma-status-pill status-wallet"
                                style="background-color: #F1F5F9; color: #475569;">
                                {{ __('paid_via_wallet') || 'Paid via Wallet' }}
                            </span>
                        </div>
                    </div>
                    <button @click="downloadInvoice"
                        class="btn btn-dark rounded-3 px-4 py-2 d-flex align-items-center gap-2"
                        style="font-weight: 500;">
                        <i class="fa fa-print"></i> {{ __('Print Order') || 'Print Order' }}
                    </button>
                </div>

                <!-- Bottom Row (Date & Seller) -->
                <div class="order-meta-bar">
                    <div class="order-meta-date">
                        <i class="far fa-calendar-alt text-secondary" style="font-size: 16px;"></i>
                        <span class="text-dark"
                            style="font-weight: 500; font-size: 16px; line-height: 24px; letter-spacing: 0%; color: var(--Colors-Shades-Neutral-N---950, #000000);">{{
                                __('date') }} :</span>
                        <span class="text-dark"
                            style="font-weight: 500; font-size: 16px; line-height: 24px; letter-spacing: 0%; color: var(--Colors-Shades-Neutral-N---950, #000000);">{{
                                order.orders_created_at }}</span>
                    </div>
                    <div class="order-meta-seller" v-if="order_items && order_items.length > 0">
                        <i class="fas fa-store text-secondary" style="font-size: 15px;"></i>
                        <span class="text-dark"
                            style="font-weight: 500; font-size: 16px; line-height: 24px; letter-spacing: 0%; color: var(--Colors-Shades-Neutral-N---950, #000000);">{{
                                __('seller') }} :</span>
                        <template v-if="login_user.role.name === 'Admin' || login_user.role.name === 'Super Admin'">
                            <router-link
                                :to="{ name: 'EditSeller', params: { id: order_items[0].seller_id || order.seller_id } }"
                                style="font-weight: 600; font-size: 16px; line-height: 24px; letter-spacing: 0%; text-decoration: underline; color: var(--Colors-Primary, #55AE7B) !important; display: inline-flex; align-items: center; gap: 4px;">
                                {{ order_items[0].seller_name }}
                                <i class="fa fa-external-link-alt"
                                    style="font-size: 14px; color: var(--Colors-Primary, #55AE7B);"></i>
                            </router-link>
                        </template>
                        <template v-else>
                            <span
                                :class="login_user.role.name === 'Delivery Boy' ? 'db-panel-seller-name' : 'normal-seller-name'"
                                style="font-weight: 600; font-size: 16px; line-height: 24px; letter-spacing: 0%;">
                                {{ order_items[0].seller_name }}
                            </span>
                        </template>
                    </div>
                </div>
            </div>

            <div class="row g-4">
                <!-- Left Column (7) -->
                <div class="col-lg-7">
                    <!-- Items Ordered Section -->
                    <div class="card rounded-4 mb-4 overflow-hidden">
                        <div class="card-header bg-white d-flex justify-content-between align-items-center"
                            style="height: 68px; padding: 16px 24px; border-bottom: 1px solid #EDEDED !important;">
                            <h5 class="mb-0"
                                style="font-family: 'Inter', sans-serif; font-weight: 600; font-size: 16px; line-height: 24px; color: #000000; display: flex; align-items: center;">
                                <base-icon name="Package" width="20" height="20" class="me-2 text-primary" />
                                {{ __('Items Ordered') }}
                            </h5>
                            <span class="item-count-badge">{{ order_items.length }} {{ __('Items') || 'Items' }}</span>
                        </div>
                        <div class="card-body p-0">
                            <div class="table-responsive"
                                style="border-radius: 0px !important; border: none !important; margin-bottom: 0 !important;">
                                <table class="table align-middle mb-0"
                                    style="border-collapse: collapse !important; border-radius: 0 !important; overflow: hidden;">
                                    <thead
                                        style="background-color: #F7F7F7 !important; border-top: 1px solid #EDEDED !important; border-bottom: 1px solid #EDEDED !important; border-left: none !important; border-right: none !important; border-radius: 0px !important;">
                                        <tr style="height: 52px;">
                                            <th class="ps-4"
                                                style="padding: 16px 0 16px 24px; border: none !important; font-family: 'Inter', sans-serif; font-weight: 600; font-size: 14px; color: #555555; vertical-align: middle;">
                                                {{ __('product_name') }}</th>
                                            <th class="text-center"
                                                style="padding: 16px 0; border: none !important; font-family: 'Inter', sans-serif; font-weight: 600; font-size: 14px; color: #555555; vertical-align: middle;">
                                                {{ __('price') }}</th>
                                            <th class="text-center"
                                                style="padding: 16px 0; border: none !important; font-family: 'Inter', sans-serif; font-weight: 600; font-size: 14px; color: #555555; vertical-align: middle;">
                                                {{ __('quantity') }}</th>
                                            <th class="text-end pe-4"
                                                style="padding: 16px 24px 16px 0; border: none !important; font-family: 'Inter', sans-serif; font-weight: 600; font-size: 14px; color: #555555; vertical-align: middle;">
                                                {{ __('total') }}</th>
                                            <th v-if="login_user && (login_user.role.name === 'Admin' || login_user.role.name === 'Super Admin')"
                                                class="text-center"
                                                style="padding: 16px 24px; border: none !important; font-family: 'Inter', sans-serif; font-weight: 600; font-size: 14px; color: #555555; vertical-align: middle;">
                                                {{ __('Action') || 'Action' }}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="item in order_items" :key="item.id"
                                            style="height: 96px; border-bottom: 1px solid #EDEDED !important;">
                                            <td class="ps-4"
                                                style="padding: 24px 0 24px 24px; border: none !important; vertical-align: middle; text-align: left !important;">
                                                <div class="d-flex align-items-center py-2"
                                                    style="gap: 8px !important; text-align: left !important;">
                                                    <img :src="item.image" class="rounded-3 border"
                                                        style="width: 48px; height: 48px; object-fit: cover;">
                                                    <div style="text-align: left !important;">
                                                        <div
                                                            style="font-family: 'Inter', sans-serif; font-weight: 600; font-size: 14px; line-height: 20px; color: #555555; text-align: left !important;">
                                                            {{ item.product_name }}</div>
                                                        <div
                                                            style="font-family: 'Inter', sans-serif; font-weight: 400; font-size: 12px; line-height: 16px; color: #71717A; text-align: left !important;">
                                                            {{ __('Variant') || 'Variant' }}: {{ item.variant_name }}</div>
                                                        <div v-if="item.selected_addons && item.selected_addons.length > 0"
                                                            style="font-family: 'Inter', sans-serif; font-weight: 400; font-size: 12px; line-height: 16px; color: #71717A; text-align: left !important;">
                                                            {{ __('addons') || 'Addons' }}:
                                                            {{ item.selected_addons.map(a => a.name).join(', ') }}
                                                            ({{ $currency }}{{ item.addon_price }})</div>
                                                        <div v-if="item.prescriptions && item.prescriptions.length > 0" class="d-flex flex-wrap gap-1 mt-2">
                                                            <div v-for="(pUrl, pIdx) in item.prescriptions" :key="pIdx" class="position-relative border rounded p-1" style="width: 40px; height: 40px; cursor: pointer;" @click="showPrescription(pUrl)">
                                                                <img :src="pUrl" class="w-100 h-100 object-fit-cover rounded" />
                                                            </div>
                                                        </div>
                                                        <div v-if="item.cancellation_reason"
                                                            style="font-family: 'Inter', sans-serif; font-weight: 600; font-size: 12px; line-height: 16px; color: var(--Colors-Status-Error, #D63031); text-align: left !important; margin-top: 4px;">
                                                            {{ item.cancellation_reason.toLowerCase().includes('cancelled by') ? item.cancellation_reason : (__('cancelled_by_user') || 'Cancelled by user') + ': ' + item.cancellation_reason }}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td class="text-center"
                                                style="padding: 24px 0; border: none !important; font-family: 'Inter', sans-serif; font-weight: 500; font-size: 16px; line-height: 24px; color: #000000; vertical-align: middle;">
                                                {{ $currency }}{{ item.price }}</td>
                                            <td class="text-center"
                                                style="padding: 24px 0; border: none !important; font-family: 'Inter', sans-serif; font-weight: 500; font-size: 16px; line-height: 24px; color: #000000; vertical-align: middle;">
                                                {{ item.quantity }}</td>
                                            <td class="text-end pe-4"
                                                style="padding: 24px 24px 24px 0; border: none !important; font-family: 'Inter', sans-serif; font-weight: 500; font-size: 16px; line-height: 24px; color: #000000; vertical-align: middle;">
                                                {{ $currency }}{{ item.sub_total }}</td>
                                            <td v-if="login_user && (login_user.role.name === 'Admin' || login_user.role.name === 'Super Admin')"
                                                class="text-center"
                                                style="padding: 24px 24px; border: none !important; font-family: 'Inter', sans-serif; font-weight: 500; font-size: 16px; line-height: 24px; color: #000000; vertical-align: middle;">
                                                <span v-if="Number(item.active_status) === 7"
                                                    style="font-family: 'Inter', sans-serif; font-weight: 500; font-size: 14px; line-height: 20px; letter-spacing: 0%; text-align: center; vertical-align: middle; color: var(--Colors-Status-Error, #D63031); display: inline-block;">
                                                    {{ __('cancelled') || 'Cancelled' }}
                                                </span>
                                                <button v-else-if="canCancelItem(item)" @click="cancelOrderItem(item)" class="btn p-0 border-0 d-inline-flex align-items-center justify-content-center cancel-item-btn" v-b-tooltip.hover :title="__('cancel_item') || 'Cancel Item'" style="width: 28px; height: 28px; border-radius: 8px; background: var(--Colors-Status-Shades-E---50, #FBEAEA); padding: 4px; transition: all 0.2s; outline: none; margin: 0 auto;">
                                                    <base-icon name="order cancel" width="12.5" height="12.5" useCurrentColor style="color: var(--Colors-Status-Error, #D63031);" />
                                                </button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    <!-- Assignment & Status Row -->
                    <div class="row g-4 mb-4">
                        <div class="col-md-6" v-if="this.$roleDeliveryBoy !== this.login_user.role.name">
                            <div class="card border mb-4"
                                style="max-width: 436px; width: 100%; height: 140px; border-radius: 16px; border: 1px solid #EDEDED !important; overflow: hidden; display: flex; flex-direction: column; padding: 0;">
                                <!-- Top Half: Header -->
                                <div
                                    style="height: 68px; padding: 16px 24px; border-bottom: 1px solid #EDEDED; display: flex; align-items: center;">
                                    <base-icon name="Vector (1)" width="20" height="20" class="me-2" />
                                    <span
                                        style="font-family: 'Inter', sans-serif; font-weight: 600; font-size: 16px; line-height: 24px; color: #000000;">{{
                                            __('assign_delivery_partner') || 'Assign Delivery Partner' }}</span>
                                </div>
                                <!-- Bottom Half: Form -->
                                <div style="flex: 1; padding: 16px; display: flex; align-items: center; gap: 12px;">
                                    <form @submit.prevent="assignDeliveryBoy"
                                        class="d-flex align-items-center gap-2 w-100">
                                        <select class="form-select" v-model="delivery_boy_id"
                                            style="width: 300px; height: 40px; border-radius: 8px; border: 1px solid #EDEDED; padding: 8px 16px; font-size: 14px;">
                                            <option value="">{{ __('select_delivery_boy') }}</option>
                                            <option v-for="boy in deliveryBoys" :value='boy.id'>
                                                {{ getDisplayName(boy.name) }} ({{ boy.pending_order_count }})
                                            </option>
                                        </select>
                                        <button type="submit" class="btn btn-primary p-0"
                                            :disabled="delivery_boy_id === '' || isLoadingDboy"
                                            style="width: 88px; height: 40px; border-radius: 8px; font-weight: 600; background-color: var(--figma-primary, #FF9900) !important; border-color: var(--figma-primary, #FF9900) !important; display: flex; align-items: center; justify-content: center; font-size: 14px; color: #FFFFFF !important;">
                                            {{ __('assign') || 'Assign' }}
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6" id="assign_partner_section">
                            <div class="card border mb-4"
                                style="max-width: 436px; width: 100%; height: 140px; border-radius: 16px; border: 1px solid #EDEDED !important; overflow: hidden; display: flex; flex-direction: column; padding: 0;">
                                <!-- Top Half: Header -->
                                <div
                                    style="height: 68px; padding: 16px; border-bottom: 1px solid #EDEDED; display: flex; align-items: center;">
                                    <base-icon name="CheckCircle" width="20" height="20" class="me-2" />
                                    <span
                                        style="font-family: 'Inter', sans-serif; font-weight: 600; font-size: 16px; line-height: 24px; color: #000000;">{{
                                            __('order_status') || 'Order Status' }}</span>
                                </div>
                                <!-- Bottom Half: Form -->
                                <div style="flex: 1; padding: 16px; display: flex; align-items: center; gap: 12px;">
                                    <form @submit.prevent="updateStatus" class="d-flex align-items-center gap-2 w-100">
                                        <select class="form-select" v-model="order_status_id"
                                            style="width: 300px; height: 40px; border-radius: 8px; border: 1px solid #EDEDED; padding: 8px 16px; font-size: 14px;">
                                            <option value="">{{ __('choose_status') || 'Choose Status' }}</option>
                                            <option v-for="status in statuses" :value='status.id'>{{
                                                getStatusDisplayName(status) }}
                                            </option>
                                        </select>
                                        <button type="submit" class="btn btn-primary p-0"
                                            :disabled="order_status_id === '' || isLoadingUstatus"
                                            style="width: 88px; height: 40px; border-radius: 8px; font-weight: 600; background-color: var(--figma-primary, #FF9900) !important; border-color: var(--figma-primary, #FF9900) !important; display: flex; align-items: center; justify-content: center; font-size: 14px; color: #FFFFFF !important;">
                                            {{ __('update') || 'Update' }}
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Customer Order Notes Section -->
                    <div class="card border mb-4 order-notes-card" v-if="order.order_note"
                        style="width: 100%; border-radius: 16px; border: 1px solid #EDEDED !important; overflow: hidden; display: flex; flex-direction: column; padding: 0;">
                        <!-- Header -->
                        <div
                            style="height: 68px; padding: 16px 24px; border-bottom: 1px solid #EDEDED; display: flex; align-items: center;">
                            <i class="far fa-calendar-check me-2 text-dark" style="font-size: 20px;"></i>
                            <span class="order-notes-title"
                                style="font-family: 'Inter', sans-serif; font-weight: 600; font-size: 16px; line-height: 24px; color: #000000;">
                                {{ __('Customer Order Notes') || 'Customer Order Notes' }}
                            </span>
                        </div>
                        <!-- Content -->
                        <div class="card-body p-4">
                            <div class="order-notes-box" style="background-color: #EBF5FF; border-left: 4px solid #3B82F6; border-radius: 12px; padding: 16px 20px; text-align: left !important;">
                                <p class="mb-0 order-notes-text" style="font-family: 'Inter', sans-serif; font-size: 14px; line-height: 22px; font-weight: 500; color: #1E293B;">
                                    {{ order.order_note }}
                                </p>
                            </div>
                        </div>
                    </div>

                    <!-- Delivery Partner Details (Conditional) -->
                    <div class="card border mb-4"
                        v-if="order.delivery_boy_name || getDisplayName(order.delivery_boy_name_translation)"
                        style="max-width: 436px; width: 100%; height: 140px; border-radius: 16px; border: 1px solid #EDEDED !important; overflow: hidden; display: flex; flex-direction: column; padding: 0;">
                        <!-- Top Half: Header -->
                        <div
                            style="height: 68px; padding: 16px; border-bottom: 1px solid #EDEDED; display: flex; align-items: center; justify-content: space-between;">
                            <div class="d-flex align-items-center">
                                <base-icon name="Vector (1)" width="20" height="20"
                                    :class="login_user.role.name === 'Delivery Boy' ? 'db-panel-truck-icon' : 'normal-truck-icon'"
                                    class="me-2" :use-current-color="true" />
                                <span
                                    :class="login_user.role.name === 'Delivery Boy' ? 'db-panel-delivery-title' : 'normal-delivery-title'"
                                    style="font-family: 'Inter', sans-serif; font-weight: 600; font-size: 16px; line-height: 24px;">{{
                                        __('delivery_partner_details') || 'Delivery Partner Details' }}</span>
                            </div>
                            <!-- <a href="javascript:void(0)" @click="$scrollTo('#assign_partner_section')" style="width: 59px; height: 20px; color: #D63031; font-family: 'Inter', sans-serif; font-weight: 400; font-size: 14px; line-height: 20px; text-decoration: underline; display: inline-block; cursor: pointer;">Change?</a> -->
                        </div>
                        <!-- Bottom Half: Details -->
                        <div style="flex: 1; padding: 16px; display: flex; align-items: center; gap: 24px;">
                            <div class="avatar-box bg-light rounded-circle d-flex align-items-center justify-content-center fw-bold text-primary"
                                style="width: 48px; height: 48px; font-size: 18px; flex-shrink: 0;">
                                {{ order.delivery_boy_name ? order.delivery_boy_name.charAt(0).toUpperCase() : 'D' }}
                            </div>
                            <div>
                                <div class="fw-bold text-dark mb-1" style="font-size: 16px;">{{
                                    getDisplayName(order.delivery_boy_name_translation) || order.delivery_boy_name }}
                                </div>
                                <div class="text-muted" style="font-size: 14px;">+{{ order.delivery_boy_mobile }}</div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Right Column (5) -->
                <div class="col-lg-5">


                    <!-- Customer Details -->
                    <div class="card border mb-4"
                        style="border-radius: 16px; border: 1px solid #EDEDED !important; overflow: hidden; display: flex; flex-direction: column; padding: 0;">
                        <!-- Top Half: Header -->
                        <div
                            style="height: 68px; padding: 16px; border-bottom: 1px solid #EDEDED; display: flex; align-items: center;">
                            <base-icon name="User" width="20" height="20" class="me-2" />
                            <span
                                style="font-family: 'Inter', sans-serif; font-weight: 600; font-size: 16px; line-height: 24px; color: #000000;">{{
                                    __('customer_details') || 'Customer Details' }}</span>
                        </div>
                        <!-- Bottom Half: Content -->
                        <div class="card-body p-4" style="text-align: left !important;">
                            <div class="d-flex align-items-center mb-4" style="gap: 12px; text-align: left !important;">
                                <div class="avatar-box bg-light d-flex align-items-center justify-content-center fw-bold text-primary overflow-hidden"
                                    style="width: 48px; height: 48px; font-size: 18px; flex-shrink: 0; border-radius: 8px;">
                                    {{ order.user_name ? order.user_name.charAt(0).toUpperCase() : 'U' }}
                                </div>
                                <div style="text-align: left !important;">
                                    <div class="text-dark mb-1"
                                        style="font-family: 'Inter', sans-serif; font-weight: 500; font-size: 16px; line-height: 24px; text-align: left !important;">
                                        {{ order.user_name }}</div>
                                    <div class="text-muted small" style="text-align: left !important;">{{ __('Customer Joined') || 'Customer Joined' }}:
                                        <span class="fw-bold text-dark">{{ formatDate(order.user_created_at) || 'N/A'
                                        }}</span>
                                    </div>
                                </div>
                            </div>
                            <div style="border-top: 1px solid #EDEDED; margin-bottom: 24px;"></div>
                            <div class="mb-4">
                                <div class="d-flex align-items-center mb-1">
                                    <base-icon name="Envelope" width="20" height="20" style="margin-right: 12px;" />
                                    <div
                                        style="font-family: 'Inter', sans-serif; font-weight: 400; font-size: 14px; line-height: 20px; color: #333333;">
                                        {{ __('Email Address') || 'Email Address' }}</div>
                                </div>
                                <div
                                    style="font-family: 'Inter', sans-serif; font-weight: 600; font-size: 14px; line-height: 20px; color: #000000; margin-left: 32px;">
                                    {{ order.user_email }}</div>
                            </div>
                            <div class="mb-2">
                                <div class="d-flex align-items-center mb-1">
                                    <base-icon name="Phone" width="20" height="20" style="margin-right: 12px;" />
                                    <div
                                        style="font-family: 'Inter', sans-serif; font-weight: 400; font-size: 14px; line-height: 20px; color: #333333;">
                                        {{ __('Phone Number') || 'Phone Number' }}</div>
                                </div>
                                <div
                                    style="font-family: 'Inter', sans-serif; font-weight: 600; font-size: 14px; line-height: 20px; color: #000000; margin-left: 32px;">
                                    {{ order.user_mobile }}</div>
                            </div>
                        </div>
                    </div>

                    <!-- Shipping Address -->
                    <div class="card border mb-4"
                        style="border-radius: 16px; border: 1px solid #EDEDED !important; overflow: hidden; display: flex; flex-direction: column; padding: 0;">
                        <!-- Top Half: Header -->
                        <div
                            style="height: 68px; padding: 16px; border-bottom: 1px solid #EDEDED; display: flex; align-items: center;">
                            <base-icon name="MapPinLine" width="20" height="20" class="me-2" />
                            <span
                                style="font-family: 'Inter', sans-serif; font-weight: 600; font-size: 16px; line-height: 24px; color: #000000;">{{
                                    __('shipping_address') || 'Shipping Address' }}</span>
                        </div>
                        <!-- Bottom Half: Content -->
                        <div class="card-body p-4">
                            <div class="mb-4">
                                <div class="d-flex align-items-center mb-2" style="gap: 8px;">
                                    <span
                                        style="font-family: 'Inter', sans-serif; font-weight: 600; font-size: 14px; line-height: 20px; color: #000000;">{{ __('Home Address') || 'Home Address' }}</span>
                                    <span style="color: #555555; font-size: 14px;">-</span>
                                    <div class="figma-default-badge">
                                        <span>{{ __('Default') || 'Default' }}</span>
                                    </div>
                                </div>
                                <p class="text-muted mb-0"
                                    style="font-size: 14px; line-height: 1.5; color: #555555 !important;">
                                    {{ order.order_address }}
                                </p>
                            </div>
                            <div class="d-flex flex-column justify-content-center p-3 delivery-time-box" v-if="order.delivery_time && !order.delivery_time.includes('1970') && order.delivery_time.trim() !== '' && order.delivery_time !== 'N/A'">
                                <div
                                    style="font-family: 'Inter', sans-serif; font-weight: 500; font-size: 14px; line-height: 20px; color: #D63031; margin-bottom: 4px;">
                                    {{ __('Delivery Time & Date') || 'Delivery Time & Date' }}</div>
                                <div class="text-dark fw-bold" style="font-size: 16px; line-height: 24px;">{{
                                    order.delivery_time }}
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Billing Summary -->
                    <div class="card border mb-4"
                        style="border-radius: 16px; border: 1px solid #EDEDED !important; overflow: hidden; display: flex; flex-direction: column; padding: 0;">
                        <!-- Top Half: Header -->
                        <div
                            style="height: 68px; padding: 16px; border-bottom: 1px solid #EDEDED; display: flex; align-items: center;">
                            <base-icon name="Receipt" width="20" height="20" class="me-2" />
                            <span
                                style="font-family: 'Inter', sans-serif; font-weight: 600; font-size: 16px; line-height: 24px; color: #000000;">{{
                                    __('Billing Summary') }}</span>
                        </div>
                        <!-- Bottom Half: Content -->
                        <div class="card-body p-4">
                            <div class="billing-list">
                                <div class="d-flex justify-content-between mb-4">
                                    <span
                                        style="font-family: 'Inter', sans-serif; font-weight: 600; font-size: 16px; line-height: 24px; color: #000000;">{{ __('Subtotal') || 'Subtotal' }}
                                        ({{ activeOrderItems.length }} {{ __('items') || 'items' }})</span>
                                    <span
                                        style="font-family: 'Inter', sans-serif; font-weight: 600; font-size: 16px; line-height: 24px; color: #000000;">{{
                                            $currency }}{{ activeSubtotal.toFixed(2) }}</span>
                                </div>
                                <div style="border-top: 1px solid #EDEDED; margin-bottom: 24px;"></div>
                                <div class="d-flex justify-content-between mb-4" v-if="activeAddonTotal > 0"
                                    style="height: 24px; align-items: center;">
                                    <span
                                        style="font-family: 'Inter', sans-serif; font-weight: 400; font-size: 16px; line-height: 24px; color: #000000;">{{ __('addons') || 'Addons' }}</span>
                                    <span
                                        style="font-family: 'Inter', sans-serif; font-weight: 600; font-size: 14px; line-height: 20px; color: #000000;">{{
                                            $currency }}{{ activeAddonTotal.toFixed(2) }}</span>
                                </div>
                                <div class="d-flex justify-content-between mb-4" v-if="order.discount > 0"
                                    style="height: 20px; align-items: center;">
                                    <span
                                        style="font-family: 'Inter', sans-serif; font-weight: 500; font-size: 14px; line-height: 20px; color: #D63031;">{{ __('Discount') || 'Discount' }}
                                        ({{ order.discount }}%)</span>
                                    <span
                                        style="font-family: 'Inter', sans-serif; font-weight: 500; font-size: 14px; line-height: 20px; color: #D63031;">-{{
                                            $currency }}{{ discount_in_rupees }}</span>
                                </div>
                                <div class="d-flex justify-content-between mb-4"
                                    style="height: 24px; align-items: center;">
                                    <span
                                        style="font-family: 'Inter', sans-serif; font-weight: 400; font-size: 16px; line-height: 24px; color: #000000;">{{ __('Delivery Charges') || 'Delivery Charges' }}</span>
                                    <span
                                        style="font-family: 'Inter', sans-serif; font-weight: 600; font-size: 14px; line-height: 20px; color: #000000;"
                                        v-if="order.delivery_charge == 0">{{ __('Free') || 'Free' }}</span>
                                    <span
                                        style="font-family: 'Inter', sans-serif; font-weight: 600; font-size: 14px; line-height: 20px; color: #000000;"
                                        v-else>{{ $currency }}{{ order.delivery_charge }}</span>
                                </div>
                                <div class="d-flex justify-content-between mb-4"
                                    v-if="getAdditionalChargesTotal(order.additional_charges) > 0"
                                    style="height: 24px; align-items: center;">
                                    <span
                                        style="font-family: 'Inter', sans-serif; font-weight: 400; font-size: 16px; line-height: 24px; color: #000000;">{{ __('Additional Charges') || 'Additional Charges' }}</span>
                                    <span
                                        style="font-family: 'Inter', sans-serif; font-weight: 600; font-size: 14px; line-height: 20px; color: #000000;">{{
                                            $currency }}{{ getAdditionalChargesTotal(order.additional_charges) }}</span>
                                </div>
                                <div class="d-flex justify-content-between mb-4" v-if="order.promo_discount > 0"
                                    style="height: 24px; align-items: center;">
                                    <span
                                        style="font-family: 'Inter', sans-serif; font-weight: 400; font-size: 16px; line-height: 24px; color: #000000;">{{ __('Promo Code') || 'Promo Code' }}</span>
                                    <span
                                        style="font-family: 'Inter', sans-serif; font-weight: 600; font-size: 14px; line-height: 20px; color: #000000;">{{
                                            order.promo_code }}</span>
                                </div>
                                <div class="d-flex justify-content-between mb-4" v-if="order.promo_discount > 0"
                                    style="height: 24px; align-items: center;">
                                    <span
                                        style="font-family: 'Inter', sans-serif; font-weight: 400; font-size: 16px; line-height: 24px; color: #000000;">{{ __('Promo Discount') || 'Promo Discount' }}</span>
                                    <span
                                        style="font-family: 'Inter', sans-serif; font-weight: 600; font-size: 14px; line-height: 20px; color: #000000;">-{{
                                            $currency }}{{ order.promo_discount }}</span>
                                </div>
                                <div class="d-flex justify-content-between mb-4" v-if="order.wallet_balance > 0"
                                    style="height: 24px; align-items: center;">
                                    <span
                                        style="font-family: 'Inter', sans-serif; font-weight: 700; font-size: 14px; line-height: 20px; color: #20B364;">{{ __('Wallet Used') || 'Wallet Used' }}</span>
                                    <span
                                        style="font-family: 'Inter', sans-serif; font-weight: 700; font-size: 14px; line-height: 20px; color: #20B364;">-{{
                                            $currency }}{{ order.wallet_balance }}</span>
                                </div>
                                <div class="d-flex justify-content-between align-items-center p-3 payable-total-box">
                                    <span
                                        style="font-family: 'Inter', sans-serif; font-weight: 700; font-size: 20px; line-height: 28px; color: #000000;">{{ __('Payable Total') || 'Payable Total' }}</span>
                                    <span
                                        style="font-family: 'Inter', sans-serif; font-weight: 700; font-size: 20px; line-height: 28px; color: #000000;">{{
                                            $currency }}{{ order.remaining_final }}</span>
                                </div>
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
                                class="btn btn-primary btn-sm pull-right border-0 bg-transparent p-0">
                                <base-icon name="Eye" hoverName="Type=Hover (1)" width="32" height="32" />
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
                        <base-icon name="order cancel" width="14" height="14" useCurrentColor style="color: #64748B;" />
                    </button>
                </div>
                
                <!-- Body -->
                <div class="figma-cancel-modal-body text-center">
                    <div class="figma-warning-icon-wrapper d-flex align-items-center justify-content-center mx-auto">
                        <base-icon name="warning" width="24" height="24" useCurrentColor style="color: #D63031;" />
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
                    <button type="button" class="btn btn-figma-keep w-50" @click="closeCancelModal" :disabled="isLoadingCancel">
                        {{ __('keep_item') === 'keep_item' ? 'Keep Item' : __('keep_item') }}
                    </button>
                    <button type="button" class="btn btn-figma-confirm w-50" @click="confirmCancelOrderItem" :disabled="isLoadingCancel">
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

export default {
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

        // Live tracking: the delivery boy's mobile app pushes GPS via manage_live_tracking while
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

            const formData = new FormData();
            formData.append('order_id', this.id);
            formData.append('order_status', this.order.active_status);
            formData.append('latitude', position.coords.latitude);
            formData.append('longitude', position.coords.longitude);

            axios.post(this.$deliveryBoyApiUrl + '/manage_live_tracking', formData)
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
                confirmButtonColor: '#37a279',
                cancelButtonColor: '#d33',
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
                    confirmButtonColor: '#37a279',
                    cancelButtonColor: '#d33',
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
    fill: #D63031 !important;
}

/* Base Theme-Aware Variables for this component */
.order-meta-bar {
    width: 100%;
    border-radius: 8px;
    border: 1px solid #DCEFE4;
    background-color: #EEF7F2;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 16px;
    gap: 12px;
}

body.theme-dark .order-meta-bar {
    background: linear-gradient(90deg, #1e293b 0%, #0f172a 100%) !important;
    border-color: #334155 !important;
}

.order-meta-date {
    display: flex;
    align-items: center;
    gap: 8px;
}

.order-meta-seller {
    display: flex;
    align-items: center;
    gap: 8px;
}

@media (min-width: 768px) {
    .order-meta-bar {
        flex-direction: row;
        align-items: center;
        padding: 8px 16px;
        gap: 0;
    }

    .order-meta-date {
        padding-right: 24px;
        border-right: 1px solid rgba(85, 174, 123, 0.25);
    }

    .order-meta-seller {
        padding-left: 24px;
    }
}


.card {
    border: 1px solid #EDEDED !important;
    border-radius: 12px !important;
    overflow: hidden;
    margin-bottom: 24px;
}

.item-count-badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 36px;
    padding: 8px 12px;
    gap: 4px;
    border-radius: 8px;
    background-color: #EDEDED;
    border: 1px solid #D9D9D9;
    color: #000000;
    font-weight: 500;
    font-size: 14px;
}

body.theme-dark .item-count-badge {
    background-color: #334155 !important;
    border-color: #475569 !important;
    color: #f1f5f9 !important;
}

.delivery-time-box {
    min-height: 76px;
    background: #FBEAEA;
    border: 1px solid #EFAEAF;
    border-radius: 8px;
}

body.theme-dark .delivery-time-box {
    background: rgba(214, 48, 49, 0.15) !important;
    border-color: rgba(214, 48, 49, 0.3) !important;
}

.payable-total-box {
    min-height: 52px;
    background: #F7F7F7;
    border: 1px solid #EDEDED;
    border-radius: 8px;
}

body.theme-dark .payable-total-box {
    background: #1e293b !important;
    border-color: #334155 !important;
}

/* order-notes-box/title/text use hardcoded light inline colors (light-blue bg, near-black
   text) that stay light-only - the broad dark-mode span/div text-color override further down
   then forces near-white text onto that unchanged light-blue background, making it unreadable. */
body.theme-dark .order-notes-box {
    background-color: rgba(59, 130, 246, 0.15) !important;
    border-left-color: #3B82F6 !important;
}

body.theme-dark .order-notes-title,
body.theme-dark .order-notes-text {
    color: #F1F5F9 !important;
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
    color: #f1f5f9 !important;
}

body.theme-dark .text-secondary,
body.theme-dark .text-muted {
    color: #94a3b8 !important;
}

body.theme-dark .card-header,
body.theme-dark .table thead,
body.theme-dark .table thead th {
    background-color: #1e293b !important;
    border-top-color: #334155 !important;
    border-bottom-color: #334155 !important;
}

body.theme-dark .table tbody tr td {
    background-color: #1e293b !important;
    border-bottom: 1px solid #334155 !important;
}

body.theme-dark table.table tbody tr:hover td {
    background-color: #2d3748 !important;
}

body.theme-dark .card {
    background-color: #1e293b !important;
    border-color: #334155 !important;
}

body.theme-dark .form-select,
body.theme-dark .form-control {
    background-color: #0f172a !important;
    border-color: #334155 !important;
    color: #f1f5f9 !important;
}

body.theme-dark .order-details-wrapper>div:first-child {
    background: linear-gradient(180deg, #1e293b 0%, #0f172a 100%) !important;
    border: 1px solid #334155 !important;
}

body.theme-dark .delivery-time-box div {
    color: #ff8080 !important;
}

body.theme-dark .delivery-time-box .text-dark {
    color: #f1f5f9 !important;
}

/* Print Order button contrast */
body.theme-dark .btn-dark {
    background-color: #334155 !important;
    border-color: #475569 !important;
}

body.theme-dark .avatar-box.bg-light {
    background-color: #334155 !important;
    color: #61b795 !important;
}

.figma-default-badge {
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    width: 58px !important;
    height: 24px !important;
    background: #EEF7F2 !important;
    border-radius: 8px !important;
}

.figma-default-badge span {
    font-family: 'Inter', sans-serif !important;
    font-weight: 600 !important;
    font-size: 12px !important;
    line-height: 16px !important;
    color: #55AE7B !important;
    text-align: center !important;
}

body.theme-dark .figma-default-badge {
    background: rgba(85, 174, 123, 0.15) !important;
}

body.theme-dark .figma-default-badge span {
    color: #55AE7B !important;
}

.normal-seller-name {
    color: var(--Colors-Shades-Neutral-N---950, #000000) !important;
}

body.theme-dark .normal-seller-name {
    color: #f1f5f9 !important;
}

.db-panel-seller-name {
    color: var(--Colors-Shades-Neutral-N---950, #000000) !important;
}

body.theme-dark .db-panel-seller-name {
    color: #ffffff !important;
}

.normal-truck-icon {
    color: #000000 !important;
}

body.theme-dark .normal-truck-icon {
    color: #f1f5f9 !important;
}

.db-panel-truck-icon {
    color: #000000 !important;
}

body.theme-dark .db-panel-truck-icon {
    color: #ffffff !important;
}

.normal-delivery-title {
    color: #000000 !important;
}

body.theme-dark .normal-delivery-title {
    color: #f1f5f9 !important;
}

.db-panel-delivery-title {
    color: #000000 !important;
}

body.theme-dark .db-panel-delivery-title {
    color: #ffffff !important;
}

/* Figma-styled Cancel Order Item Modal */

.figma-cancel-modal-content {
    width: 540px !important;
    height: 652px !important;
    display: flex !important;
    flex-direction: column !important;
    justify-content: space-between !important;
    box-sizing: border-box !important;
}



.figma-cancel-modal-header {
    width: 540px !important;
    height: 100px !important;
    padding: 24px !important;
    gap: 16px !important;
    border-bottom: 1px solid #F1F5F9 !important;
    box-sizing: border-box !important;
    display: flex !important;
    justify-content: space-between !important;
    align-items: center !important;
    opacity: 1 !important;
}

body.theme-dark .figma-cancel-modal-header {
    border-bottom-color: #334155 !important;
}

.figma-cancel-modal-body {
    width: 540px !important;
    height: 468px !important;
    padding: 24px !important;
    box-sizing: border-box !important;
    display: flex !important;
    flex-direction: column !important;
    align-items: center !important;
    gap: 32px !important;
    opacity: 1 !important;
}

.figma-cancel-modal-footer {
    width: 540px !important;
    height: 84px !important;
    opacity: 1 !important;
    gap: 24px !important;
    border-top: 1px solid var(--Colors-Shades-Neutral-N---200, #EDEDED) !important;
    padding-top: 16px !important;
    padding-right: 24px !important;
    padding-bottom: 16px !important;
    padding-left: 24px !important;
    border-top-left-radius: 0px !important;
    border-top-right-radius: 0px !important;
    border-bottom-right-radius: 16px !important;
    border-bottom-left-radius: 16px !important;
    background: var(--Colors-Shades-Neutral-N---50, #FFFFFF) !important;
    box-sizing: border-box !important;
    display: flex !important;
    align-items: center !important;
    justify-content: space-between !important;
}

body.theme-dark .figma-cancel-modal-footer {
    background: #1E293B !important;
    border-top-color: #334155 !important;
}

.figma-cancel-title {
    color: var(--Foreground-Primary, #0D0D0D);
    font-family: var(--Font-Family-Body, 'Inter', sans-serif);
    font-size: var(--Font-Size-text-xl, 20px);
    font-style: normal;
    font-weight: var(--Font-Weight-font-semibold, 600);
    line-height: var(--Font-Line-Height-xl, 28px);
}

body.theme-dark .figma-cancel-title {
    color: #F1F5F9;
}

.figma-cancel-subtitle {
    font-size: 13px;
    color: #64748B;
    font-family: 'Inter', sans-serif;
    margin-top: 2px;
}

body.theme-dark .figma-cancel-subtitle {
    color: #94A3B8;
}

.figma-close-modal-btn {
    background: #F8FAFC !important;
    border: 1px solid #EDEDED !important;
    outline: none !important;
    color: #64748B !important;
    cursor: pointer !important;
    transition: all 0.2s ease !important;
    width: 40px !important;
    height: 40px !important;
    border-radius: 8px !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    box-sizing: border-box !important;
}

body.theme-dark .figma-close-modal-btn {
    background-color: #334155 !important;
    border-color: #475569 !important;
    color: #CBD5E1 !important;
}

.figma-close-modal-btn:hover {
    color: #0F172A !important;
    background-color: #E2E8F0 !important;
    border-color: #CBD5E1 !important;
}

body.theme-dark .figma-close-modal-btn:hover {
    color: #FFFFFF;
    background-color: #475569;
}

.figma-warning-icon-wrapper {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: #FBEAEA;
    margin-bottom: 0px !important;
}

.figma-warning-icon-wrapper .base-icon,
.figma-warning-icon-wrapper .base-icon * {
    color: #D63031 !important;
    fill: #D63031 !important;
}

.figma-cancel-heading {
    font-size: 20px;
    font-weight: 700;
    line-height: 28px;
    color: #0F172A;
    font-family: 'Inter', sans-serif;
    margin-bottom: 8px !important;
}

body.theme-dark .figma-cancel-heading {
    color: #F1F5F9;
}

.figma-cancel-description {
    font-family: 'Inter', sans-serif !important;
    font-weight: 500 !important;
    font-size: 16px !important;
    line-height: 24px !important;
    letter-spacing: 0% !important;
    text-align: center !important;
    vertical-align: middle !important;
    color: var(--Colors-Shades-Neutral-N---700, #555555) !important;
    margin-bottom: 0px !important;
    max-width: 420px !important;
    opacity: 1 !important;
}

body.theme-dark .figma-cancel-description {
    color: #CBD5E1 !important;
}

.figma-cancel-input-group {
    margin-bottom: 12px;
}

.figma-cancel-input-label {
    font-family: 'Inter', sans-serif !important;
    font-weight: 400 !important;
    font-size: 14px !important;
    line-height: 20px !important;
    letter-spacing: 0% !important;
    color: var(--Colors-Shades-Neutral-N---950, #000000) !important;
    margin-bottom: 8px !important;
    display: block !important;
}

body.theme-dark .figma-cancel-input-label {
    color: #FFFFFF !important;
}

.figma-cancel-textarea {
    width: 492px !important;
    height: 172px !important;
    opacity: 1 !important;
    border-radius: 8px !important;
    border: 1px solid var(--Colors-Shades-Neutral-N---700, #555555) !important;
    padding-top: 12px !important;
    padding-right: 16px !important;
    padding-bottom: 12px !important;
    padding-left: 16px !important;
    background: var(--Colors-Shades-Neutral-N---50, #FFFFFF) !important;
    color: #0F172A !important;
    font-size: 14px !important;
    font-family: 'Inter', sans-serif !important;
    transition: all 0.2s ease-in-out !important;
    resize: none !important;
    box-sizing: border-box !important;
}

body.theme-dark .figma-cancel-textarea {
    border-color: #475569 !important;
    background: #0F172A !important;
    color: #F1F5F9 !important;
}

.figma-cancel-textarea:focus {
    border-color: #D63031 !important;
    outline: none !important;
    box-shadow: 0px 0px 0px 3px rgba(214, 48, 49, 0.15) !important;
}

.btn-figma-keep {
    width: 234px !important;
    height: 52px !important;
    gap: 8px !important;
    opacity: 1 !important;
    padding-top: 12px !important;
    padding-right: 24px !important;
    padding-bottom: 12px !important;
    padding-left: 24px !important;
    border-radius: 8px !important;
    border: 1px solid var(--Colors-Shades-Neutral-N---950, #000000) !important;
    background: #FFFFFF !important;
    color: var(--Colors-Shades-Neutral-N---950, #000000) !important;
    font-family: 'Inter', sans-serif !important;
    font-weight: 400 !important;
    font-size: 16px !important;
    line-height: 24px !important;
    letter-spacing: 0% !important;
    transition: all 0.2s !important;
    display: inline-flex !important;
    align-items: center !important;
    justify-content: center !important;
    box-sizing: border-box !important;
}

body.theme-dark .btn-figma-keep {
    border-color: #475569 !important;
    background: #1E293B !important;
    color: #FFFFFF !important;
}

.btn-figma-keep:hover {
    background: #F8FAFC !important;
    color: #0F172A !important;
}

body.theme-dark .btn-figma-keep:hover {
    background: #334155 !important;
    color: #FFFFFF !important;
}

.btn-figma-confirm {
    width: 234px !important;
    height: 52px !important;
    gap: 8px !important;
    opacity: 1 !important;
    padding-top: 12px !important;
    padding-right: 24px !important;
    padding-bottom: 12px !important;
    padding-left: 24px !important;
    border-radius: 8px !important;
    border: none !important;
    background: var(--Colors-Status-Error, #D63031) !important;
    color: var(--Colors-Shades-Neutral-N---50, #FFFFFF) !important;
    font-family: 'Inter', sans-serif !important;
    font-weight: 400 !important;
    font-size: 16px !important;
    line-height: 24px !important;
    letter-spacing: 0% !important;
    transition: all 0.2s !important;
    display: inline-flex !important;
    align-items: center !important;
    justify-content: center !important;
    box-sizing: border-box !important;
}

.btn-figma-confirm:hover {
    background: #B32424 !important;
}
</style>

<style>
/* Global styles for cancel item modal (outside Vue scoped DOM) */
#cancel-item-modal .modal-dialog {
    max-width: 540px !important;
    width: 540px !important;
}

#cancel-item-modal .modal-content {
    width: 540px !important;
    height: 652px !important;
    opacity: 1 !important;
    border-radius: 16px !important;
    border: 1px solid #EDEDED !important;
    background: #FFFFFF !important;
    box-shadow: 0px 8px 30px rgba(0, 0, 0, 0.08) !important;
    overflow: hidden !important;
    padding: 0px !important;
}

#cancel-item-modal .modal-body {
    padding: 0px !important;
    margin: 0px !important;
}

body.theme-dark #cancel-item-modal .modal-content {
    background: #1E293B !important;
    border-color: #334155 !important;
    box-shadow: 0px 8px 30px rgba(0, 0, 0, 0.4) !important;
}

#cancel-item-modal .figma-cancel-modal-header {
    width: 540px !important;
    height: 100px !important;
    padding: 24px !important;
    gap: 16px !important;
    border-bottom: 1px solid #F1F5F9 !important;
    box-sizing: border-box !important;
    display: flex !important;
    justify-content: space-between !important;
    align-items: center !important;
    opacity: 1 !important;
}

body.theme-dark #cancel-item-modal .figma-cancel-modal-header {
    border-bottom-color: #334155 !important;
}

#cancel-item-modal .figma-cancel-modal-body {
    width: 540px !important;
    height: 468px !important;
    padding: 24px !important;
    box-sizing: border-box !important;
    display: flex !important;
    flex-direction: column !important;
    align-items: center !important;
    gap: 32px !important;
    opacity: 1 !important;
}

#cancel-item-modal .figma-cancel-modal-footer {
    width: 540px !important;
    height: 84px !important;
    opacity: 1 !important;
    gap: 24px !important;
    border-top: 1px solid var(--Colors-Shades-Neutral-N---200, #EDEDED) !important;
    padding-top: 16px !important;
    padding-right: 24px !important;
    padding-bottom: 16px !important;
    padding-left: 24px !important;
    border-top-left-radius: 0px !important;
    border-top-right-radius: 0px !important;
    border-bottom-right-radius: 16px !important;
    border-bottom-left-radius: 16px !important;
    background: var(--Colors-Shades-Neutral-N---50, #FFFFFF) !important;
    box-sizing: border-box !important;
    display: flex !important;
    align-items: center !important;
    justify-content: space-between !important;
}

body.theme-dark #cancel-item-modal .figma-cancel-modal-footer {
    background: #1E293B !important;
    border-top-color: #334155 !important;
}
</style>
