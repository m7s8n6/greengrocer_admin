<template>
    <div class="p-2">
        <!-- Section 1: Welcome Header -->
        <div class="page-heading mb-4">
            <h2 class="h4 font-weight-bold text-dark mb-1">{{ __('Welcome') }}, {{ userName }}</h2>
            <p class="text-muted small mb-0">{{ greetingMessage }} &bull; {{ formattedDate }}</p>
        </div>

        <!-- Section 2: Today's Stats Cards -->
        <div class="row g-3 mb-4 row-cols-1 row-cols-sm-2 row-cols-md-4">
            <div class="col" v-for="(stat, index) in todayStats" :key="'today-' + index">
                <div class="figma-kpi-card-v2 w-100">
                    <div class="d-flex align-items-center gap-2">
                        <div class="figma-stat-icon-box" :class="stat.iconBgClass">
                            <base-icon v-if="stat.icon" :name="stat.icon" width="24" height="24" />
                            <svg v-else-if="stat.iconClass && stat.iconClass.includes('fa-plus')" :class="stat.iconClass.replace('fa fa-plus', '').trim()" width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M33 24C33 24.1989 32.921 24.3897 32.7803 24.5303C32.6397 24.671 32.4489 24.75 32.25 24.75H24.75V32.25C24.75 32.4489 24.671 32.6397 24.5303 32.7803C24.3897 32.921 24.1989 33 24 33C23.8011 33 23.6103 32.921 23.4697 32.7803C23.329 32.6397 23.25 32.4489 23.25 32.25V24.75H15.75C15.5511 24.75 15.3603 24.671 15.2197 24.5303C15.079 24.3897 15 24.1989 15 24C15 23.8011 15.079 23.6103 15.2197 23.4697C15.3603 23.329 15.5511 23.25 15.75 23.25H23.25V15.75C23.25 15.5511 23.329 15.3603 23.4697 15.2197C23.6103 15.079 23.8011 15 24 15C24.1989 15 24.3897 15.079 24.5303 15.2197C24.671 15.3603 24.75 15.5511 24.75 15.75V23.25H32.25C32.4489 23.25 32.6397 23.329 32.7803 23.4697C32.921 23.6103 33 23.8011 33 24Z" fill="currentColor"/>
                            </svg>
                            <i v-else :class="stat.iconClass"></i>
                        </div>
                        <div class="d-flex flex-column text-start">
                            <span class="figma-stat-label mb-0">{{ stat.label }}</span>
                            <h4 class="figma-stat-value mb-0">{{ stat.value }}</h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Section 3: Sales Overview -->
        <div class="card border rounded-4 mb-3 mt-0 overflow-hidden figma-card">
            <div
                class="card-header bg-white border-0 py-3 px-4 d-flex align-items-center justify-content-between flex-wrap gap-3">
                <h4 class="h6 font-weight-bold text-dark mb-0">{{ __('sales_overview') || 'Sales Overview' }}</h4>
                <div class="d-flex align-items-center gap-3">
                    <div class="d-none d-sm-flex align-items-center gap-3 text-muted small">
                        <div class="d-flex align-items-center gap-2">
                            <span class="dot-sm bg-primary"></span>
                            <span class="text-capitalize">{{ __('orders') }}</span>
                        </div>
                        <div class="d-flex align-items-center gap-2">
                            <span class="dot-sm bg-light-primary"></span>
                            <span class="text-capitalize">{{ __('revenue') || 'Revenue' }}</span>
                        </div>
                    </div>
                    <select v-model="salesPeriod" @change="updateSalesChart"
                        class="form-select form-select-sm figma-select-pill">
                        <option value="yearly">{{ __('yearly') || 'Yearly' }}</option>
                        <option value="monthly">{{ __('daily') || 'Daily' }}</option>
                        <option value="weekly">{{ __('weekly') || 'Weekly' }}</option>
                    </select>
                </div>
            </div>
            <div class="card-body p-4 pt-1">
                <apexcharts ref="salesChart" width="100%" height="350" type="bar" :options="salesChartOptions"
                    :series="salesChartSeries"></apexcharts>
            </div>
        </div>

        <!-- Section 4: Summary Stats Cards -->
        <div class="figma-bg-soft-primary p-3 mb-4 rounded-4">
            <div class="row g-3 row-cols-1 row-cols-sm-2 row-cols-lg-5">
                <div class="col" v-for="(stat, index) in summaryStats" :key="'sum-' + index">
                    <div class="card border rounded-4 h-100 figma-card-white p-3">
                        <div class="d-flex justify-content-between align-items-start mb-2">
                            <div v-if="stat.icon" class="figma-stat-icon-box" :class="stat.iconBgClass">
                                <base-icon :name="stat.icon" width="24" height="24" />
                            </div>
                            <div v-else-if="stat.iconClass && stat.iconClass.includes('fa-plus')">
                                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M0 8C0 3.58172 3.58172 0 8 0H40C44.4183 0 48 3.58172 48 8V40C48 44.4183 44.4183 48 40 48H8C3.58172 48 0 44.4183 0 40V8Z" fill="#E7F4FE"/>
                                    <path d="M33 24C33 24.1989 32.921 24.3897 32.7803 24.5303C32.6397 24.671 32.4489 24.75 32.25 24.75H24.75V32.25C24.75 32.4489 24.671 32.6397 24.5303 32.7803C24.3897 32.921 24.1989 33 24 33C23.8011 33 23.6103 32.921 23.4697 32.7803C23.329 32.6397 23.25 32.4489 23.25 32.25V24.75H15.75C15.5511 24.75 15.3603 24.671 15.2197 24.5303C15.079 24.3897 15 24.1989 15 24C15 23.8011 15.079 23.6103 15.2197 23.4697C15.3603 23.329 15.5511 23.25 15.75 23.25H23.25V15.75C23.25 15.5511 23.329 15.3603 23.4697 15.2197C23.6103 15.079 23.8011 15 24 15C24.1989 15 24.3897 15.079 24.5303 15.2197C24.671 15.3603 24.75 15.5511 24.75 15.75V23.25H32.25C32.4489 23.25 32.6397 23.329 32.7803 23.4697C32.921 23.6103 33 23.8011 33 24Z" fill="#2196F3"/>
                                </svg>
                            </div>
                            <div v-else class="figma-stat-icon-box-sm" :class="stat.iconBgClass">
                                <i :class="[stat.iconClass, stat.iconTextClass]"></i>
                            </div>
                            <div class="figma-trend-badge scale-90" :class="stat.trendUp ? 'trend-up' : 'trend-down'">
                                <base-icon :name="stat.trendUp ? 'TrendUp' : 'TrendDown'" width="18" height="18" />
                                <span>{{ stat.trendValue }}</span>
                            </div>
                        </div>
                        <div class="d-flex flex-column mt-auto">
                            <span class="figma-summary-label mb-1 text-capitalize">{{ stat.label }}</span>
                            <h4 class="figma-stat-value h6 mb-0">{{ stat.value }}</h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Section 5: Top Sales By Category + Order Status -->
        <div class="row g-4 mb-4">
            <div class="col-12 col-lg-7">
                <div class="card border rounded-4 h-100 figma-card">
                    <div
                        class="card-header bg-white border-0 py-3 px-4 d-flex align-items-center justify-content-between flex-wrap gap-2">
                        <h4 class="h6 font-weight-bold text-dark mb-0">
                            {{ __('top_sales_by_category') || 'Top Sales By Category' }}
                            <span class="text-muted small font-weight-normal ms-1">({{ categoryChartLabels.length }} {{
                                __('categories') }})</span>
                        </h4>
                        <select v-model="categoryPeriod" @change="mockDataRefresh('category')" class="form-select form-select-sm figma-select-pill">
                            <option value="yearly">{{ __('yearly') || 'Yearly' }}</option>
                            <option value="monthly">{{ __('monthly') || 'Monthly' }}</option>
                        </select>
                    </div>
                    <div class="card-body p-4 pt-0 d-flex flex-column">
                        <div v-if="categoryChartSeries.length" class="row align-items-center flex-grow-1" style="min-height: 300px;">
                            <div class="col-12 col-md-5">
                                <apexcharts width="100%" height="280" type="donut" :options="categoryDonutOptions"
                                    :series="categoryChartSeries"></apexcharts>
                            </div>
                            <div class="col-12 col-md-7">
                                <div class="d-flex flex-column gap-3 pe-md-4 mt-4 mt-md-0">
                                    <div v-for="(item, idx) in categoryChartDataFormatted" :key="'cat-' + idx" class="d-flex align-items-center">
                                        <div class="rounded-circle me-3 flex-shrink-0" :style="{ width: '12px', height: '12px', backgroundColor: item.color }"></div>
                                        <div class="text-dark small flex-shrink-0" style="font-weight: 500;">{{ item.name }}</div>
                                        <div class="flex-grow-1 mx-3" style="border-bottom: 1.5px dashed #E2E8F0;"></div>
                                        <div class="text-dark small font-weight-bold flex-shrink-0">{{ item.value }}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div v-else class="text-center py-5 text-muted small">{{ __('No data found')
                        }}</div>
                    </div>
                </div>
            </div>
            <div class="col-12 col-lg-5">
                <div class="card border rounded-4 h-100 figma-card">
                    <div
                        class="card-header bg-white border-bottom py-3 px-4 d-flex align-items-center justify-content-between">
                        <h4 class="h6 font-weight-bold text-dark mb-0">{{ __('order_status') || 'Order Status' }}</h4>
                        <select v-model="orderStatusPeriod" @change="mockDataRefresh('orderStatus')" class="form-select form-select-sm figma-select-pill">
                            <option value="yearly">{{ __('yearly') || 'Yearly' }}</option>
                            <option value="monthly">{{ __('monthly') || 'Monthly' }}</option>
                        </select>
                    </div>
                    <div class="card-body p-4 d-flex flex-column justify-content-center">
                        <div class="d-flex flex-column gap-3" v-if="orderStatusItems.length">
                            <div class="d-flex align-items-center gap-3" v-for="(item, idx) in orderStatusItems"
                                :key="'os-' + idx">
                                <div class="rounded-3 d-flex align-items-center justify-content-center"
                                    :style="{ background: item.bgColor, width: '40px', height: '40px', borderRadius: '10px !important' }">
                                    <base-icon v-if="item.icon" :name="item.icon" width="24" height="24" />
                                </div>
                                <div class="flex-grow-1">
                                    <div class="d-flex justify-content-between align-items-center mb-1">
                                        <span class="figma-order-status-label">{{ item.label }}</span>
                                        <span class="figma-order-status-count mb-0">{{
                                            item.count
                                        }}</span>
                                    </div>
                                    <div class="rounded-pill overflow-hidden" :style="{ height: '6px', backgroundColor: item.bgColor }">
                                        <div class="h-100 rounded-pill transition-all"
                                            :style="{ width: item.percent + '%', backgroundColor: item.color }"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div v-else class="text-center py-5 text-muted small">{{ __('No data found')
                        }}</div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Section 6: Highest Revenue Sellers + Platform Usage -->
        <div class="row g-4 mb-4">
            <div class="col-12 col-lg-7">
                <div class="card border rounded-4 h-100 figma-card">
                    <div
                        class="card-header bg-white border-0 py-3 px-4 d-flex align-items-center justify-content-between">
                        <h4 class="h6 font-weight-bold text-dark mb-0">
                            {{ __('highest_revenue_sellers') || 'Highest revenue generating sellers' }}
                            <span class="text-muted small font-weight-normal ms-1">({{ sellers.length }} {{
                                __('sellers')
                            }})</span>
                        </h4>
                        <select v-model="sellerPeriod" @change="mockDataRefresh('sellers')" class="form-select form-select-sm figma-select-pill">
                            <option value="yearly">{{ __('yearly') || 'Yearly' }}</option>
                            <option value="monthly">{{ __('monthly') || 'Monthly' }}</option>
                        </select>
                    </div>
                    <div class="card-body p-0">
                        <div class="px-4" v-if="paginatedSellers.length">
                            <div class="py-3 d-flex align-items-center gap-3 border-bottom figma-hover-light"
                                v-for="(seller, idx) in paginatedSellers" :key="'seller-' + idx">
                                <div class="figma-avatar-42 overflow-hidden" style="background-color: #EBF3FF;">
                                    <img v-if="seller.logo_url" :src="seller.logo_url" class="w-100 h-100 object-fit-cover" />
                                </div>
                                <div class="flex-grow-1 text-dark text-start ms-2">
                                    <h6 class="text-dark font-weight-bold mb-1 small">{{
                                        getDisplayName(seller.store_name) ||
                                        getDisplayName(seller.name) }}</h6>
                                    <span class="text-muted extra-small">{{ __('orders') }} : {{ seller.order_count ||
                                        '—'
                                    }}</span>
                                </div>
                                <span class="text-dark font-weight-bold small">{{ $currency }}{{
                                    formatNumber(seller.total_revenue) }}</span>
                            </div>
                        </div>
                        <div v-else class="text-center py-5 text-muted small">{{ __('No data found')
                        }}</div>

                        <div class="d-flex justify-content-between align-items-center mt-4 px-3 pb-3 border-top pt-3 bg-light-soft rounded-bottom-4"
                            v-if="sellers.length > sellerPerPage">
                            <div class="showing-results-text">
                                {{ __('Showing Result') }} : <span class="showing-bold">{{ sellerPageEnd }}</span> {{ __('of') }} <span class="showing-bold">{{ sellers.length }}</span>
                            </div>
                            <b-pagination v-model="sellerPage" :total-rows="sellers.length" :per-page="sellerPerPage"
                                align="right" class="figma-pagination mb-0"
                                hide-goto-end-buttons hide-ellipsis prev-text="<" next-text=">"></b-pagination>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-12 col-lg-5">
                <div class="card border rounded-4 h-100 figma-card">
                    <div
                        class="card-header bg-white border-0 py-3 px-4 d-flex align-items-center justify-content-between text-dark">
                        <h4 class="h6 font-weight-bold mb-0 text-dark">{{ __('platform_usage') || 'Platform Usage' }}
                        </h4>
                        <select v-model="platformPeriod" @change="mockDataRefresh('platform')" class="form-select form-select-sm figma-select-pill">
                            <option value="yearly">{{ __('yearly') || 'Yearly' }}</option>
                            <option value="monthly">{{ __('monthly') || 'Monthly' }}</option>
                        </select>
                    </div>
                    <div class="card-body p-4 pt-0 d-flex flex-column align-items-center">
                        <apexcharts width="100%" height="280" type="donut" :options="platformGaugeOptions"
                            :series="platformGaugeSeries"></apexcharts>
                        <div class="row g-2 w-100 mt-2 text-center text-dark">
                            <div class="col-4" v-for="(p, i) in platformItems" :key="'plat-' + i">
                                <div class="bg-platform-box p-3 rounded-3 border">
                                    <div class="badge bg-white text-dark px-3 py-2 mb-2 rounded-pill font-weight-bold">{{ p.count }}</div>
                                    <div class="figma-platform-label">{{ p.label }}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Section 7: Top Rated + Top Selling Products -->
        <div class="row g-4 mb-4">
            <div class="col-12 col-lg-6">
                <div class="card border rounded-4 figma-card">
                    <div
                        class="card-header bg-white border-0 py-3 px-4 d-flex align-items-center justify-content-between">
                        <h4 class="h6 font-weight-bold text-dark mb-0">{{ __('top_rated_products')
                        }}
                        </h4>
                        <select v-model="ratedPeriod" @change="mockDataRefresh('rated')"
                            class="form-select form-select-sm figma-select-pill">
                            <option value="yearly">{{ __('yearly') || 'Yearly' }}</option>
                            <option value="monthly">{{ __('monthly') || 'Monthly' }}</option>
                        </select>
                    </div>
                    <div class="card-body p-0 text-dark">
                        <div class="px-4" v-if="paginatedRatedProducts.length">
                            <div class="py-3 d-flex align-items-center gap-3 border-bottom figma-hover-light text-dark"
                                v-for="(prod, idx) in paginatedRatedProducts" :key="'rated-' + idx">
                                <div class="figma-avatar-42 overflow-hidden" style="background-color: #EBF3FF;">
                                    <img v-if="prod.image" :src="prod.image" class="w-100 h-100 object-fit-cover" />
                                </div>
                                <div class="flex-grow-1 text-dark text-start ms-2">
                                    <h6 class="text-dark font-weight-bold mb-1 small text-dark">{{
                                        getDisplayName(prod.name) }}
                                    </h6>
                                    <span class="text-muted extra-small">{{ formatNumber(prod.review_count || 0) }} {{
                                        __('reviews') || 'Reviews' }}</span>
                                </div>
                                <div class="d-flex align-items-center gap-1 text-warning">
                                    <i class="fa fa-star small"></i>
                                    <span class="font-weight-bold small">{{ (prod.rating || 0).toFixed(1) }}</span>
                                </div>
                            </div>
                        </div>
                        <div v-else class="text-center py-5 text-muted small">{{ __('No data found')
                        }}</div>

                        <div class="d-flex justify-content-between align-items-center mt-4 px-3 pb-3 border-top pt-3 bg-light-soft rounded-bottom-4"
                            v-if="topRatedProducts.length">
                            <div class="d-flex align-items-center gap-2">
                                <label class="showing-results-text mb-0">{{ __('per_page') }}</label>
                                <b-form-select v-model="ratedPerPage" :options="pageOptions" size="sm"
                                    style="width: auto;" @change="ratedPage = 1"></b-form-select>
                            </div>
                            <b-pagination v-model="ratedPage" :total-rows="topRatedProducts.length" :per-page="ratedPerPage"
                                align="right" class="figma-pagination mb-0"
                                hide-goto-end-buttons hide-ellipsis prev-text="<" next-text=">"></b-pagination>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-12 col-lg-6">
                <div class="card border rounded-4 figma-card">
                    <div
                        class="card-header bg-white border-0 py-3 px-4 d-flex align-items-center justify-content-between">
                        <h4 class="h6 font-weight-bold text-dark mb-0">{{ __('top_selling_products')

                        }}</h4>
                        <select v-model="sellingPeriod" @change="mockDataRefresh('selling')"
                            class="form-select form-select-sm figma-select-pill">
                            <option value="yearly">{{ __('yearly') || 'Yearly' }}</option>
                              <option value="monthly">{{ __('monthly') || 'Monthly' }}</option>
                        </select>
                    </div>
                    <div class="card-body p-0 text-dark">
                        <div class="px-4" v-if="paginatedSellingProducts.length">
                            <div class="py-3 d-flex align-items-center gap-3 border-bottom figma-hover-light text-dark"
                                v-for="(prod, idx) in paginatedSellingProducts" :key="'selling-' + idx">
                                <div class="figma-avatar-42 overflow-hidden" style="background-color: #EBF3FF;">
                                    <img v-if="prod.image" :src="prod.image" class="w-100 h-100 object-fit-cover" />
                                </div>
                                <div class="flex-grow-1 text-dark text-start ms-2">
                                    <h6 class="text-dark font-weight-bold mb-1 small text-dark">{{
                                        getDisplayName(prod.name) }}
                                    </h6>
                                    <div class="d-flex align-items-center gap-1">
                                        <img :src="$baseUrl + '/images/icons/sold.svg'" style="width: 17px; height: 17px;" />
                                        <span class="text-muted extra-small">{{ __('sold') || 'Sold' }} : {{
                                            formatNumber(prod.sold_count || 0) }}</span>
                                    </div>
                                </div>
                                <span class="text-dark font-weight-bold small">{{ $currency }}{{
                                    formatNumber(prod.total_revenue
                                        || 0) }}</span>
                            </div>
                        </div>
                        <div v-else class="text-center py-5 text-muted small">{{ __('No data found')
                        }}</div>

                        <div class="d-flex justify-content-between align-items-center mt-4 px-3 pb-3 border-top pt-3 bg-light-soft rounded-bottom-4"
                            v-if="topSellingProducts.length">
                            <div class="d-flex align-items-center gap-2">
                                <label class="showing-results-text mb-0">{{ __('per_page') }}</label>
                                <b-form-select v-model="sellingPerPage" :options="pageOptions" size="sm"
                                    style="width: auto;" @change="sellingPage = 1"></b-form-select>
                            </div>
                            <b-pagination v-model="sellingPage" :total-rows="topSellingProducts.length" :per-page="sellingPerPage"
                                align="right" class="figma-pagination mb-0"
                                hide-goto-end-buttons hide-ellipsis prev-text="<" next-text=">"></b-pagination>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Section 8: Latest Orders -->
        <div class="card figma-card text-dark mt-4">
            <div class="card-header">
                <h4 class="text-dark">{{ __('recent_orders') || 'Recent Orders' }}</h4>
                <div class="d-flex align-items-center gap-2">
                    <router-link to="/orders" class="btn btn-dark btn-sm rounded-3 px-3 view-order-btn">
                        <span class="small font-weight-bold text-white">{{ __('view_orders') || 'View Orders' }}</span>
                        <i class="fa fa-arrow-right ms-1 text-white extra-small"></i>
                    </router-link>
                </div>
            </div>
            <div class="card-body p-0">
                <div class="table-responsive">
                    <b-table :items="orders" :fields="orderFields" :current-page="orderCurrentPage"
                        :per-page="orderPerPage" :filter-included-fields="filterOn" :sort-by.sync="sortBy"
                        :sort-desc.sync="sortDesc" :sort-direction="sortDirection" :bordered="false" :busy="isLoading"
                        stacked="md" show-empty :tbody-tr-class="() => 'figma-tr align-middle'" small
                        class="figma-order-table text-dark">

                        <template #cell(id)="row">
                            <div class="figma-link-blue">
                                {{ row.item.id }}
                            </div>
                        </template>

                        <template #cell(user_name)="row">
                            <div class="d-flex flex-column">
                                <span class="figma-customer-name">{{ row.item.user_name }}</span>
                                <span class="figma-customer-email">{{ row.item.email || row.item.mobile }}</span>
                            </div>
                        </template>

                        <template #cell(seller_name)="row">
                            <div class="d-flex flex-column">
                                <span class="figma-seller-name">{{ row.item.seller_name }}</span>
                                <span class="figma-seller-id">ID - {{ row.item.seller_id || '-' }}</span>
                            </div>
                        </template>
                        
                        <template #cell(total_items)="row">
                            <div class="d-flex align-items-center justify-content-center">
                                <a href="javascript:void(0)" @click="openOrderModal(row.item)" class="figma-link-blue">
                                    {{ row.item.total_items || 0 }} {{ __('items') || 'Items' }}
                                    <i class="bi bi-box-arrow-up-right" style="font-size: 0.75rem;"></i>
                                </a>
                            </div>
                        </template>



                        <template #cell(total)="row">
                            <div class="d-flex flex-column">
                                <span class="figma-amount-bold">{{ $currency }}{{ row.item.total }}</span>
                                <span class="figma-text-muted small">{{ row.item.payment_method }}</span>
                            </div>
                        </template>

                        <template #cell(created_at)="row">
                            <div class="d-flex flex-column">
                                <span class="figma-date-bold">{{ formatDateBold(row.item.created_at) }}</span>
                                <span class="figma-time-light">{{ getPeriodLabel(row.item.created_at) }}, {{ formatTimeLight(row.item.created_at) }}</span>
                            </div>
                        </template>

                        <template #cell(active_status)="row">
                            <span class="figma-status-pill" :class="getStatusBadgeClass(row.item.active_status)">
                                {{ getStatusLabelById(row.item.active_status) }}
                            </span>
                        </template>

                        <template #cell(actions)="row">
                            <div class="d-flex gap-2 justify-content-center">
                                <router-link :to="{ name: 'ViewOrder', params: { id: row.item.id, record: row.item } }"
                                    class="figma-action-btn">
                                    <base-icon name="Eye" hoverName="Type=Hover (1)" width="24" height="24" />
                                </router-link>
                            </div>
                        </template>

                        <template #table-busy>
                            <div class="text-center py-4">
                                <b-spinner class="align-middle" variant="dark"></b-spinner>
                            </div>
                        </template>

                        <template #row-details="row">
                            <div class="bg-light p-4 rounded-bottom-4 border-top">
                                <div class="mb-3">
                                    <span
                                        class="text-muted font-weight-bold extra-small tracking-wider">{{
                                            __('order_items') || 'Order Items' }}</span>
                                </div>
                                <div v-if="row.item.order_items && row.item.order_items.length"
                                    class="d-flex flex-column gap-2">
                                    <div v-for="(item, index) in row.item.order_items" :key="index"
                                        class="bg-white p-3 rounded-3 d-flex align-items-center gap-3 border">
                                        <img :src="item.image" class="rounded-3"
                                            style="width: 44px; height: 44px; object-fit: cover;" />
                                        <div class="flex-grow-1">
                                            <span class="text-dark font-weight-bold d-block small mb-1">{{
                                                item.product_name }}</span>
                                            <span class="text-muted extra-small">{{ item.variant_name || '-' }}</span>
                                        </div>
                                        <div class="text-dark font-weight-bold small">x {{ item.quantity }}</div>
                                        <div class="text-dark font-weight-bold small ms-3">{{ $currency }}{{
                                            item.sub_total }}</div>
                                        <div class="ms-3">
                                            <span class="figma-status-pill scale-75"
                                                :class="getStatusBadgeClass(item.active_status)">{{ item.status_name
                                                }}</span>
                                        </div>
                                    </div>
                                </div>
                                <div v-else-if="row.item.itemsLoading" class="text-center p-3">
                                    <b-spinner small variant="dark"></b-spinner>
                                </div>
                            </div>
                        </template>
                    </b-table>
                </div>

                <div class="d-flex justify-content-between align-items-center mt-4 px-3 pb-3 border-top pt-3 bg-light-soft rounded-bottom-4" v-if="orderTotalRows">
                    <div class="d-flex align-items-center gap-2">
                        <label class="showing-results-text mb-0">{{ __('per_page') }}</label>
                        <b-form-select v-model="orderPerPage" :options="pageOptions" size="sm"
                            style="width: auto;" @change="orderCurrentPage = 1"></b-form-select>
                    </div>
                    <b-pagination v-model="orderCurrentPage" :total-rows="orderTotalRows" :per-page="orderPerPage"
                        align="right" class="figma-pagination mb-0"
                        hide-goto-end-buttons hide-ellipsis prev-text="<" next-text=">"></b-pagination>
                </div>

            </div>
        </div>

        <!-- Order Details Modal -->
        <b-modal id="order-details-modal" size="lg" centered hide-footer header-class="border-0 pb-0" body-class="p-0" modal-class="figma-modal">
            <template #modal-header="{ close }">
                <div class="figma-modal-header">
                    <div class="figma-modal-title-group text-start">
                        <h5 class="figma-text-xl-semibold mb-0">{{ __('order_details') }}</h5>
                        <p class="figma-modal-subtitle">{{ __('review_order_details_below') || 'Review order details below' }}</p>
                    </div>
                    <button type="button" class="figma-btn-close" @click="close()">
                        <i class="fa fa-times"></i>
                    </button>
                </div>
            </template>

            <div class="modal-body-content" style="max-height: 500px; overflow-y: auto;">
                <div v-if="isModalLoading" class="text-center py-5">
                    <b-spinner variant="primary"></b-spinner>
                </div>
                <div v-else-if="selectedOrder && selectedOrder.order_items && selectedOrder.order_items.length"
                    class="modal-order-columns">
                    <div v-for="(item, index) in selectedOrder.order_items" :key="index"
                        class="order-item-card">
                        <!-- Container: Image + Data -->
                        <div class="order-item-container">
                            <img :src="item.image" class="order-item-image" />
                            <div class="order-item-data">
                                <div>
                                    <h6 class="order-item-name">{{ item.product_name }}</h6>
                                    <p class="order-item-variant">{{ item.variant_name || '-' }}</p>
                                </div>
                                <span class="figma-status-pill"
                                    :class="getStatusBadgeClass(item.active_status)">
                                    {{ item.status_name ? __(item.status_name.toLowerCase()) : '' }}
                                </span>
                            </div>
                        </div>
                        <!-- Price Info: Quantity + Subtotal -->
                        <div class="order-item-price-info">
                            <span class="order-item-qty">{{ __('quantity') }} : {{ item.quantity }}</span>
                            <span class="order-item-subtotal">{{ $currency }}{{ item.sub_total }}</span>
                        </div>
                    </div>
                </div>
                <div v-else class="text-center py-5 text-muted">
                    No items found.
                </div>
            </div>

            <div class="modal-footer">
                <div class="d-flex flex-column align-items-start">
                    <span class="text-muted extra-small font-weight-medium">{{ __('total_items') || 'Total Items' }}</span>
                    <span class="figma-text-base-bold">{{ selectedOrder ? (selectedOrder.total_items || (selectedOrder.order_items ? selectedOrder.order_items.length : 0)) : 0 }} Items</span>
                </div>
                <div class="d-flex flex-column align-items-start">
                    <span class="text-muted extra-small font-weight-medium">{{ __('total_amount') || 'Total Amount' }}</span>
                    <span class="figma-text-base-bold">{{ $currency }}{{ selectedOrder ? selectedOrder.total : 0 }}</span>
                </div>
            </div>
        </b-modal>
    </div>
</template>

<script>
import axios from "axios";
import moment from "moment";
import VueApexCharts from 'vue-apexcharts';
import DateRangePicker from 'vue2-daterange-picker';
import DateRangePickerMixin from '../mixins/DateRangePickerMixin';

export default {
    name: 'Dashboard',
    mixins: [DateRangePickerMixin],
    components: {
        apexcharts: VueApexCharts,
        DateRangePicker
    },
    data() {
        return {
            record: {},
            sellers: [],
            categories: [],
            statusOrderCount: [],

            // Periods
            salesPeriod: 'yearly',
            categoryPeriod: 'yearly',
            orderStatusPeriod: 'yearly',
            sellerPeriod: 'yearly',
            platformPeriod: 'yearly',
            ratedPeriod: 'yearly',
            sellingPeriod: 'yearly',

            // Pagination
            sellerPage: 1,
            sellerPerPage: 5,
            ratedPage: 1,
            sellingPage: 1,
            ratedPerPage: 5,
            sellingPerPage: 5,
            pageOptions: this.$pageOptions,

            // Chart data
            salesChartCategories: [],
            salesOrdersData: [],
            salesRevenueData: [],

            // Category chart
            categoryChartLabels: [],
            categoryChartSeries: [],
            categoryChartColors: ['#F5A623', '#9B6FD9', '#7BC67E', '#5B93D4', '#4FC5C9'],

            // Top products (derived from categories/orders data)
            topRatedProducts: [],
            topSellingProducts: [],

            // Avatar colors
            avatarColors: ['#D4E4F7', '#E0D4F7', '#D4F7E0', '#F7E4D4', '#D4F0F7', '#F7D4E0'],

            // Platform data (derived from customer_count)
            totalUsers: 0,
            platformUsage: { web: 0, android: 0, ios: 0 },

            // Latest Orders Data
            isLoading: false,
            isModalLoading: false,
            selectedOrder: null,
            orders: [],
            orderFields: [
                { key: 'id', label: __('Order ID') || 'Order ID', sortable: true, class: 'text-start col-id' },
                { key: 'user_name', label: __('Customer') || 'Customer', sortable: true, class: 'text-start col-customer' },
                { key: 'seller_name', label: __('Seller') || 'Seller', sortable: true, class: 'text-start col-seller' },
                { key: 'total_items', label: __('Total Items') || 'Total Items', sortable: true, class: 'text-center col-items' },
                { key: 'total', label: __('Payment') || 'Payment', sortable: true, class: 'text-start col-payment' },
                { key: 'created_at', label: __('Order Date & Time') || 'Order Date & Time', sortable: true, class: 'text-start col-date' },
                { key: 'active_status', label: __('Status') || 'Status', sortable: true, class: 'text-center col-status' },
                { key: "actions", label: __('Action') || 'Action', class: 'text-center col-actions' }
            ],
            orderTotalRows: 1,
            orderCurrentPage: 1,
            orderPerPage: 5,
            status: "",
            seller: "",
            filterSellers: [],
            dateRange: { startDate: moment().subtract(30, 'days').toDate(), endDate: moment().toDate() },
            deliveryDateRange: { startDate: null, endDate: null },
            maxDate: new Date(),
            sortBy: '',
            sortDesc: false,
            sortDirection: 'asc',
            filterOn: [],
        };
    },
    computed: {
        userName() {
            try {
                const user = this.$auth ? this.$auth.user() : null;
                if (user && user.name) return user.name;
            } catch (e) { }
            return 'Admin';
        },
        greetingMessage() {
            const hour = new Date().getHours();
            if (hour < 12) return this.__('Good morning') ;
            if (hour < 17) return this.__('Good afternoon');
            return this.__('Good evening');
        },
        formattedDate() {
            return this.formatDateBold(new Date());
        },
        todayStats() {
            const todayOrders = this.record.today_order_count || 0;
            const todayRevenue = this.record.today_revenue || 0;
            const todayReturns = this.record.today_return_count || 0;
            const todayCancelled = this.record.today_cancelled_count || 0;
            return [
                { label: this.__('today_order') || 'Today Order', value: this.formatNumber(todayOrders), cardBg: '#FFFFFF', iconBgClass: 'bg-stat-blue', icon: 'Total order' },
                { label: this.__('today_revenue') || 'Today Revenue', value: this.$currency + this.formatNumber(todayRevenue), cardBg: '#FFFFFF', iconBgClass: 'bg-stat-green', icon: 'total rev' },
                { label: this.__('today_return_product') || 'Today Return Product', value: this.formatNumber(todayReturns), cardBg: '#FFFFFF', iconBgClass: 'bg-stat-orange', icon: 'total return' },
                { label: this.__('today_cancelled') || 'Today Cancelled', value: this.formatNumber(todayCancelled), cardBg: '#FFFFFF', iconBgClass: 'bg-stat-red', icon: 'total cancel' },
            ];
        },
        summaryStats() {
            const orderCount = this.record.order_count || 0;
            const revenue = this.record.revenue || 0;
            const customers = this.record.customer_count || 0;
            const pendingOrders = this.record.pending_orders || 0;
            const deliveredOrders = this.record.delivered_orders || 0;
            return [
                { label: this.__('total_orders') , value: this.formatNumber(orderCount), cardBg: '#FFFFFF', iconBgClass: 'bg-stat-blue-light', iconTextClass: 'text-stat-blue', icon: 'total od', trendUp: this.record.total_orders_trend_up !== undefined ? this.record.total_orders_trend_up : true, trendValue: this.record.total_orders_trend || '0%' },
                { label: this.__('revenue'), value: this.$currency + this.formatNumber(revenue), cardBg: '#FFFFFF', iconBgClass: 'bg-stat-green-light', iconTextClass: 'text-stat-green', icon: 'n_rev', trendUp: this.record.revenue_trend_up !== undefined ? this.record.revenue_trend_up : true, trendValue: this.record.revenue_trend || '0%' },
                { label: this.__('active_customers') , value: this.formatNumber(customers), cardBg: '#FFFFFF', iconBgClass: 'bg-stat-pink-light', iconTextClass: 'text-stat-pink', icon: 'Active users', trendUp: this.record.customers_trend_up !== undefined ? this.record.customers_trend_up : true, trendValue: this.record.customers_trend || '0%' },
                { label: this.__('pending_orders'), value: this.formatNumber(pendingOrders), cardBg: '#FFFFFF', iconBgClass: 'bg-stat-red-light', iconTextClass: 'text-stat-red', icon: 'Pending Orders', trendUp: this.record.pending_orders_trend_up !== undefined ? this.record.pending_orders_trend_up : false, trendValue: this.record.pending_orders_trend || '0%' },
                { label: this.__('delivered_orders') , value: this.formatNumber(deliveredOrders), cardBg: '#FFFFFF', iconBgClass: 'bg-stat-green-light', iconTextClass: 'text-stat-green', icon: 'Delivered Orders', trendUp: this.record.delivered_orders_trend_up !== undefined ? this.record.delivered_orders_trend_up : true, trendValue: this.record.delivered_orders_trend || '0%' },
            ];
        },
        orderStatusItems() {
            if (!this.statusOrderCount || !this.statusOrderCount.length) return [];

            const allowedStatuses = [
                'Payment Pending',
                'Received',
                'Processed',
                'Shipped',
                'Out For Delivery',
                'Delivered'
            ];

            const filteredStatuses = this.statusOrderCount.filter(s =>
                allowedStatuses.includes(s.status)
            );

            const maxCount = Math.max(...filteredStatuses.map(s => s.order_count || 0), 1);

            const statusMap = {
                'Payment Pending': { color: '#F59E0B', bgColor: '#FEF3C7', label: this.__('payment_pending') || 'Pending', icon: 'Payment Pending' },
                'Pending': { color: '#F59E0B', bgColor: '#FEF3C7', label: this.__('pending') || 'Pending' },
                'Received': { color: '#3B82F6', bgColor: '#DBEAFE', label: this.__('received') || 'Received', icon: 'Received' },
                'Processed': { color: '#10B981', bgColor: '#D1FAE5', label: this.__('processed') || 'Processed', icon: 'Processed' },
                'Shipped': { color: '#06B6D4', bgColor: '#CFFAFE', label: this.__('shipped') || 'Shipped', icon: 'Shipped' },
                'Out For Delivery': { color: '#6366F1', bgColor: '#E0E7FF', label: this.__('out_for_delivery') || 'Out for Delivery', icon: 'Out for Delivery' },
                'Delivered': { color: '#10B981', bgColor: '#D1FAE5', label: this.__('delivered') || 'Delivered', icon: 'Delivered' },
            };

            return filteredStatuses.map(s => {
                const mapped = statusMap[s.status];
                return {
                    label: mapped.label,
                    count: s.order_count || 0,
                    color: mapped.color,
                    bgColor: mapped.bgColor,
                    icon: mapped.icon || null,
                    percent: Math.round(((s.order_count || 0) / maxCount) * 100),
                };
            });
        },
        salesChartOptions() {
            return {
                chart: { type: 'bar', stacked: true, toolbar: { show: false }, fontFamily: 'Inter, sans-serif' },
                plotOptions: {
                    bar: {
                        columnWidth: '40%',
                        borderRadius: 4,
                    }
                },
                colors: ['var(--figma-primary, #FF9900)', 'var(--figma-primary-light, #FEF5E6)'],
                dataLabels: { enabled: false },
                xaxis: {
                    categories: this.salesChartCategories,
                    axisBorder: { show: false },
                    axisTicks: { show: false },
                    labels: { style: { colors: '#64748B', fontSize: '12px' } },
                    crosshairs: {
                        show: true,
                        fill: {
                            type: 'solid',
                            color: '#F1F5F9',
                            opacity: 0.8
                        },
                        stroke: {
                            color: '#F1F5F9',
                            width: 0,
                        }
                    }
                },
                yaxis: {
                    min: 0,
                    max: (max) => {
                        return max > 15000 ? max : 15000;
                    },
                    tickAmount: 5,
                    labels: {
                        style: { colors: '#64748B', fontSize: '12px' },
                        formatter: (val) => this.$currency + this.formatNumber(val)
                    }
                },
                grid: { borderColor: '#F1F5F9', strokeDashArray: 4 },
                legend: { show: false },
                states: {
                    hover: {
                        filter: {
                            type: 'none'
                        }
                    },
                    active: {
                        filter: {
                            type: 'none'
                        }
                    }
                },
                tooltip: {
                    shared: true,
                    intersect: false,
                    followCursor: true,
                    custom: ({ series, seriesIndex, dataPointIndex, w }) => {
                        const cat = w.globals.categoryLabels[dataPointIndex] || w.config.xaxis.categories[dataPointIndex];
                        const orders = series[0] ? series[0][dataPointIndex] : 0;
                        const revenue = series[1] ? series[1][dataPointIndex] : 0;
                        const ordersLabel = this.__('orders') || 'Orders';
                        const revenueLabel = this.__('revenue') || 'Revenue';
                        return '<div style="background:#111827;color:#fff;padding:12px;border-radius:12px;font-size:13px;line-height:1.6;border:none;box-shadow:0 10px 15px -3px rgba(0,0,0,0.1)">' +
                            '<div style="margin-bottom:4px;font-weight:700">' + cat + '</div>' +
                            '<div style="display:flex;align-items:center;gap:8px"><span style="width:8px;height:8px;border-radius:50%;background:var(--figma-primary, #FF9900)"></span> ' + ordersLabel + ' : <span style="font-weight:700">' + orders + '</span></div>' +
                            '<div style="display:flex;align-items:center;gap:8px"><span style="width:8px;height:8px;border-radius:50%;background:var(--figma-primary-light, #FEF5E6)"></span> ' + revenueLabel + ' : <span style="font-weight:700">' + this.$currency + (revenue || 0).toLocaleString() + '</span></div>' +
                            '</div>';
                    }
                },
            };
        },
        salesChartSeries() {
            return [
                { name: 'Orders', data: this.salesOrdersData },
                { name: 'Revenue', data: this.salesRevenueData },
            ];
        },
        categoryDonutOptions() {
            return {
                chart: { type: 'donut', fontFamily: 'Inter, sans-serif' },
                labels: this.categoryChartLabels,
                colors: this.categoryChartColors.slice(0, this.categoryChartLabels.length),
                legend: { show: false },
                dataLabels: { enabled: false },
                plotOptions: { pie: { donut: { size: '75%' } } },
                stroke: { width: 4, colors: ['#fff'] },
                tooltip: {
                    y: { formatter: (val) => this.$currency + (val || 0).toLocaleString() }
                },
            };
        },
        categoryChartDataFormatted() {
            return this.categoryChartLabels.map((label, index) => ({
                name: label,
                value: this.$currency + this.formatNumber(this.categoryChartSeries[index] || 0),
                color: this.categoryChartColors[index] || '#000'
            }));
        },
        platformGaugeOptions() {
            return {
                chart: { type: 'donut', fontFamily: 'Inter, sans-serif' },
                plotOptions: {
                    pie: {
                        startAngle: -90,
                        endAngle: 90,
                        offsetY: 10,
                        donut: {
                            size: '75%',
                            labels: {
                                show: true,
                                name: { show: true, offsetY: 25, fontSize: '13px', color: '#475569', fontWeight: 500 },
                                value: { show: true, offsetY: -15, fontSize: '24px', fontWeight: 800, color: '#1F2937', formatter: () => this.formatNumber(this.totalUsers) },
                                total: {
                                    show: true,
                                    showAlways: true,
                                    label: __('Total Users'),
                                    color: '#475569',
                                    formatter: () => this.formatNumber(this.totalUsers)
                                }
                            }
                        }
                    }
                },
                grid: { padding: { bottom: -80 } },
                dataLabels: { enabled: false },
                stroke: { width: 0 },
                colors: ['#FBBF24', '#F472B6', '#A78BFA'],
                labels: [__('Web'), __('Android (App)'), __('iOS (App)')],
                legend: {
                    show: true,
                    position: 'bottom',
                    horizontalAlign: 'center',
                    markers: { radius: 100 },
                    itemMargin: { horizontal: 10, vertical: 0 }
                }
            };
        },
        platformGaugeSeries() {
            const web = this.platformUsage?.web || 0;
            const android = this.platformUsage?.android || 0;
            const ios = this.platformUsage?.ios || 0;
            return [web, android, ios];
        },
        platformItems() {
            const web = this.platformUsage?.web || 0;
            const android = this.platformUsage?.android || 0;
            const ios = this.platformUsage?.ios || 0;
            return [
                { label: __('Web'), count: this.formatNumber(web) },
                { label: __('Android (App)'), count: this.formatNumber(android) },
                { label: __('iOS (App)'), count: this.formatNumber(ios) },
            ];
        },
        // Seller pagination
        sellerTotalPages() { return Math.ceil(this.sellers.length / this.sellerPerPage); },
        sellerPageStart() { return Math.min((this.sellerPage - 1) * this.sellerPerPage + this.sellerPerPage, this.sellers.length); },
        paginatedSellers() {
            const start = (this.sellerPage - 1) * this.sellerPerPage;
            return this.sellers.slice(start, start + this.sellerPerPage);
        },
        // Top rated pagination
        ratedTotalPages() { return Math.ceil(this.topRatedProducts.length / this.ratedPerPage); },
        ratedPageStart() { return Math.min((this.ratedPage - 1) * this.ratedPerPage + this.ratedPerPage, this.topRatedProducts.length); },
        paginatedRatedProducts() {
            const start = (this.ratedPage - 1) * this.ratedPerPage;
            return this.topRatedProducts.slice(start, start + this.ratedPerPage);
        },
        // Top selling pagination
        sellingTotalPages() { return Math.ceil(this.topSellingProducts.length / this.sellingPerPage); },
        sellingPageStart() { return Math.min((this.sellingPage - 1) * this.sellingPerPage + this.sellingPerPage, this.topSellingProducts.length); },
        paginatedSellingProducts() {
            const start = (this.sellingPage - 1) * this.sellingPerPage;
            return this.topSellingProducts.slice(start, start + this.sellingPerPage);
        },
        // Latest Orders pagination
        orderTotalPages() { return Math.ceil(this.orderTotalRows / this.orderPerPage); },
        orderPageStart() { return Math.min((this.orderCurrentPage - 1) * this.orderPerPage + this.orderPerPage, this.orderTotalRows); },
        sellerPageEnd() { return Math.min(this.sellerPage * this.sellerPerPage, this.sellers.length); },
        ratedPageEnd() { return Math.min(this.ratedPage * this.ratedPerPage, this.topRatedProducts.length); },
        sellingPageEnd() { return Math.min(this.sellingPage * this.sellingPerPage, this.topSellingProducts.length); },
        orderPageEnd() { return Math.min(this.orderCurrentPage * this.orderPerPage, this.orderTotalRows); },
    },
    created() {
        this.getRecord();
        this.getSalesData();
        this.getPieChartData();
        this.setSellerWalletTransaction();
        this.getLatestOrders();
    },
    methods: {
        getDisplayName(name) {
            if (name == null) return '';
            if (typeof name === 'string') return name;
            if (typeof name === 'object' && !Array.isArray(name)) {
                const appLocale = window.appLocale || window.localStorage.getItem('lang') || 'en';
                const forLocale = name[appLocale];
                if (forLocale != null && String(forLocale).trim() !== '') return String(forLocale).trim();
                const firstNonEmpty = Object.values(name).find(val => val != null && String(val).trim() !== '');
                return firstNonEmpty != null ? String(firstNonEmpty).trim() : '';
            }
            return '';
        },
        formatNumber(num) {
            if (num == null || isNaN(num)) return '0';
            return Number(num).toLocaleString();
        },
        getSellerInitial(seller) {
            const name = this.getDisplayName(seller.store_name) || this.getDisplayName(seller.name) || '?';
            return name.charAt(0).toUpperCase();
        },
        getRecord() {
            let params = {
                orderStatusPeriod: this.orderStatusPeriod,
                categoryPeriod: this.categoryPeriod,
                sellerPeriod: this.sellerPeriod,
                platformPeriod: this.platformPeriod,
                ratedPeriod: this.ratedPeriod,
                sellingPeriod: this.sellingPeriod,
            };
            axios.get(this.$apiUrl + '/dashboard', { params: params }).then(res => {
                console.log('Total Users:', this.totalUsers);
                let data = res.data;
                if (data.status === 1) {
                    this.record = data.data;
                    this.sellers = data.data.top_sellers || [];
                    this.categories = data.data.top_categories || [];
                    this.statusOrderCount = data.data.status_order_count || [];
                    this.platformUsage = data.data.platform_usage || { web: 0, android: 0, ios: 0 };
                    this.totalUsers = (this.platformUsage.web || 0) + (this.platformUsage.android || 0) + (this.platformUsage.ios || 0);

                    // Build top_selling_products
                    const topSelling = data.data.top_selling_products || [];
                    if (topSelling.length) {
                        this.topSellingProducts = topSelling.map(c => ({
                            name: c.product_name,
                            sold_count: Math.round(parseFloat(c.total_revenue || 0) / 100),
                            total_revenue: c.total_revenue,
                            image: c.image_url || c.image || null,
                        }));
                    } else {
                        this.topSellingProducts = [];
                    }

                    // Build top_rated_products
                    const topRated = data.data.top_rated_products || [];
                    if (topRated.length) {
                        this.topRatedProducts = topRated.map(c => ({
                            name: c.product_name,
                            review_count: parseInt(c.review_count || 0),
                            rating: parseFloat(c.average_rating || 0.0),
                            image: c.image_url || c.image || null,
                        }));
                    } else {
                        this.topRatedProducts = [];
                    }

                    // Populate the category donut chart with real sales from top_categories_sales
                    const catSales = data.data.top_categories_sales || [];
                    const filtered = catSales.filter(c => parseFloat(c.total_revenue) > 0);
                    this.categoryChartLabels = filtered.map(c => this.getDisplayName(c.category_name));
                    this.categoryChartSeries = filtered.map(c => parseFloat(c.total_revenue));
                }
            }).catch(error => {
                console.error('Dashboard error:', error);
            });
        },
        getSalesData() {
            axios.get(this.$apiUrl + '/orders/weekly_sales', { params: { period: this.salesPeriod } }).then(response => {
                const orders = response.data.data || [];
                // For yearly view, generate month-based data
                if (this.salesPeriod === 'yearly') {
                    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                    const monthData = {};
                    months.forEach((m, idx) => {
                        monthData[idx + 1] = { name: m, orders: 0, revenue: 0 };
                    });
                    orders.forEach(o => {
                        const m = parseInt(o.order_month);
                        if (monthData[m]) {
                            monthData[m].orders = parseInt(o.total_orders || 0);
                            monthData[m].revenue = parseFloat(o.total_sale || 0);
                        }
                    });
                    this.salesChartCategories = months.map(m => this.__(m));
                    this.salesOrdersData = months.map((m, idx) => monthData[idx + 1].orders);
                    this.salesRevenueData = months.map((m, idx) => monthData[idx + 1].revenue);
                } else {
                    const daysCount = this.salesPeriod === 'weekly' ? 7 : 30;
                    const categories = [];
                    const ordersData = [];
                    const revenueData = [];

                    // Create a map of existing data by date (YYYY-MM-DD)
                    const dataMap = {};
                    orders.forEach(o => {
                        const dateKey = moment(o.order_date).format('YYYY-MM-DD');
                        dataMap[dateKey] = {
                            orders: parseInt(o.total_orders || 0),
                            revenue: parseFloat(o.total_sale || 0)
                        };
                    });

                    // Generate last N days
                    for (let i = daysCount - 1; i >= 0; i--) {
                        const date = moment().subtract(i, 'days');
                        const dateKey = date.format('YYYY-MM-DD');
                        const day = date.format('DD');
                        const month = date.format('MMM');
                        const label = this.salesPeriod === 'weekly' ? (this.__(month) + ' ' + day) : day;

                        categories.push(label);
                        if (dataMap[dateKey]) {
                            ordersData.push(dataMap[dateKey].orders);
                            revenueData.push(dataMap[dateKey].revenue);
                        } else {
                            ordersData.push(0);
                            revenueData.push(0);
                        }
                    }
                    this.salesChartCategories = categories;
                    this.salesOrdersData = ordersData;
                    this.salesRevenueData = revenueData;
                }
            }).catch(err => console.error('Sales data error:', err));
        },
        getPieChartData() {
            // Deprecated in favor of real category sales loaded from getRecord()
        },
        setSellerWalletTransaction() {
            axios.get(this.$apiUrl + '/set_seller_wallet_transaction').then(res => {
                let data = res.data;
                if (data.status === 1) {
                    // Refresh data if needed
                    if (data.data && data.data.top_sellers) {
                        this.sellers = data.data.top_sellers;
                    }
                }
            }).catch(() => { });
        },
        updateSalesChart() {
            this.getSalesData();
        },
        mockDataRefresh(section) {
            // Each period dropdown must only refresh its own widget - re-running the full
            // getRecord() (as this used to do) reassigns every widget's state at once, which
            // makes ApexCharts re-render cards whose own filter never changed (e.g. changing
            // the Sellers period visibly "refreshed" the unrelated Category donut too).
            let params = {
                orderStatusPeriod: this.orderStatusPeriod,
                categoryPeriod: this.categoryPeriod,
                sellerPeriod: this.sellerPeriod,
                platformPeriod: this.platformPeriod,
                ratedPeriod: this.ratedPeriod,
                sellingPeriod: this.sellingPeriod,
            };
            axios.get(this.$apiUrl + '/dashboard', { params: params }).then(res => {
                const data = res.data;
                if (data.status !== 1) return;
                const d = data.data;

                if (section === 'category') {
                    const catSales = d.top_categories_sales || [];
                    const filtered = catSales.filter(c => parseFloat(c.total_revenue) > 0);
                    this.categoryChartLabels = filtered.map(c => this.getDisplayName(c.category_name));
                    this.categoryChartSeries = filtered.map(c => parseFloat(c.total_revenue));
                } else if (section === 'orderStatus') {
                    this.statusOrderCount = d.status_order_count || [];
                } else if (section === 'sellers') {
                    this.sellers = d.top_sellers || [];
                } else if (section === 'platform') {
                    this.platformUsage = d.platform_usage || { web: 0, android: 0, ios: 0 };
                    this.totalUsers = (this.platformUsage.web || 0) + (this.platformUsage.android || 0) + (this.platformUsage.ios || 0);
                } else if (section === 'rated') {
                    const topRated = d.top_rated_products || [];
                    this.topRatedProducts = topRated.map(c => ({
                        name: c.product_name,
                        review_count: parseInt(c.review_count || 0),
                        rating: parseFloat(c.average_rating || 0.0),
                        image: c.image_url || c.image || null,
                    }));
                } else if (section === 'selling') {
                    const topSelling = d.top_selling_products || [];
                    this.topSellingProducts = topSelling.map(c => ({
                        name: c.product_name,
                        sold_count: Math.round(parseFloat(c.total_revenue || 0) / 100),
                        total_revenue: c.total_revenue,
                        image: c.image_url || c.image || null,
                    }));
                } else {
                    this.getRecord();
                }
            }).catch(error => {
                console.error('Dashboard error:', error);
            });
        },

        getLatestOrders() {
            this.isLoading = true;
            let param = {
                "startDate": (this.dateRange.startDate != null) ? moment(this.dateRange.startDate).format('YYYY-MM-DD') : "",
                "endDate": (this.dateRange.endDate != null) ? moment(this.dateRange.endDate).format('YYYY-MM-DD') : "",
                "seller": this.seller,
                "status": this.status,
                startDeliveryDate: this.deliveryDateRange.startDate ? moment(this.deliveryDateRange.startDate).format('YYYY-MM-DD') : '',
                endDeliveryDate: this.deliveryDateRange.endDate ? moment(this.deliveryDateRange.endDate).format('YYYY-MM-DD') : '',
            }
            axios.get(this.$apiUrl + '/orders', { params: param }).then((response) => {
                let data = response.data;
                if (data.status === 1) {
                    this.filterSellers = response.data.data.sellers;
                    this.orders = response.data.data.orders.map(o => {
                        o.order_items = [];
                        o.itemsLoading = false;
                        return o;
                    });
                    this.orderTotalRows = this.orders.length;
                    this.isLoading = false
                }
            }).catch(error => {
                this.isLoading = false;
                console.error(error);
            });
        },
        deleteOrder(index, id) {
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
                    let postData = { id: id }
                    axios.post(this.$apiUrl + '/orders/delete', postData)
                        .then((response) => {
                            this.isLoading = false
                            let data = response.data;
                            this.orders.splice(index, 1)
                            this.showSuccess(data.message)
                        });
                }
            });
        },
        toggleOrder(itemOrRow) {
            const item = itemOrRow.item || itemOrRow;
            const isRow = !!itemOrRow.toggleDetails;
            const isShowing = isRow ? itemOrRow.detailsShowing : !!item._showDetails;
            if (!isShowing) {
                this.orders.forEach(order => { this.$set(order, '_showDetails', false); });
            }
            if (isRow) { itemOrRow.toggleDetails(); } else { this.$set(item, '_showDetails', !isShowing); }
            if (item.order_items.length > 0 || item.itemsLoading) { return; }
            item.itemsLoading = true;
            axios.get(this.$apiUrl + '/orders/view/' + item.id)
                .then(res => {
                    item.order_items = res.data.data.order_items || [];
                    item.itemsLoading = false;
                })
                .catch(() => {
                    item.itemsLoading = false;
                });
        },
        openOrderModal(order) {
            this.selectedOrder = order;
            this.$bvModal.show('order-details-modal');
            if (this.selectedOrder.order_items && this.selectedOrder.order_items.length === 0) {
                this.isModalLoading = true;
                axios.get(this.$apiUrl + '/orders/view/' + order.id)
                    .then(res => {
                        this.selectedOrder.order_items = res.data.data.order_items || [];
                        this.isModalLoading = false;
                    })
                    .catch(() => {
                        this.isModalLoading = false;
                    });
            }
        },
        getStatusBadgeClass(statusId) {
            const id = Number(statusId);
            const classMap = {
                1: 'status-pending', // Payment Pending
                2: 'status-received', // Received
                3: 'status-processed', // Processed
                4: 'status-shipped', // Shipped
                5: 'status-outfordelivery', // Out For Delivery
                6: 'status-delivered', // Delivered
                7: 'status-cancelled', // Cancelled
                8: 'status-returned', // Returned
                9: 'status-received', // Pending
                10: 'status-processed', // Ready for Pickup
                11: 'status-delivered', // Picked Up
            };
            return classMap[id] || 'status-default';
        },
        formatDateBold(date) {
            return moment(date).format('DD MMM YYYY');
        },
        getPeriodLabel(date) {
            if (!date) return '';
            const hour = moment(date).hour();
            if (hour >= 5 && hour < 12) {
                return this.__('Morning') || 'Morning';
            } else if (hour >= 12 && hour < 17) {
                return this.__('Afternoon') || 'Afternoon';
            } else if (hour >= 17 && hour < 21) {
                return this.__('Evening') || 'Evening';
            } else {
                return this.__('Night') || 'Night';
            }
        },
        formatTimeLight(date) {
            return moment(date).format('hh:mm A');
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
    },
};
</script>

<style scoped>
/* Modernized styles are now central in global SCSS */
</style>
