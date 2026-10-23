<template>
    <div class="p-2 dash-page">
        <!-- Section 1: Welcome header + quick actions -->
        <div class="page-heading mb-3 d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between gap-2">
            <div class="min-w-0">
                <h2 class="h4 font-weight-bold dash-welcome-title mb-0">{{ __('Welcome') }}, {{ userName }}</h2>
                <p class="text-muted small mb-0">{{ greetingMessage }} &bull; {{ formattedDate }}</p>
            </div>
            <div class="d-flex flex-wrap align-items-center gap-2 dash-quick-actions" v-if="$can('product_create') || $can('order_list')">
                <router-link v-if="$can('order_list')" to="/orders" class="btn-figma-columns text-decoration-none">
                    <i class="fa fa-shopping-cart"></i>
                    <span>{{ __('view_orders') }}</span>
                </router-link>
                <router-link v-if="$can('product_create')" to="/manage_products/create" class="btn-figma-filter text-decoration-none">
                    <i class="fa fa-plus"></i>
                    <span>{{ __('add_product') }}</span>
                </router-link>
            </div>
        </div>

        <!-- Section 2: Today strip (4 slim tiles) -->
        <div class="row g-3 mb-3">
            <div class="col-6 col-md-3" v-for="(stat, index) in todayStats" :key="'today-' + index">
                <div class="figma-kpi-card-v2 dash-tile w-100 h-100">
                    <div class="d-flex align-items-center gap-2 min-w-0">
                        <div class="figma-stat-icon-box dash-icon-36" :class="stat.iconBgClass">
                            <base-icon v-if="stat.icon" :name="stat.icon" width="20" height="20" />
                            <i v-else :class="stat.iconClass"></i>
                        </div>
                        <div class="d-flex flex-column text-start min-w-0">
                            <span class="figma-stat-label mb-0 dash-tile-label">{{ stat.label }}</span>
                            <h4 class="figma-stat-value mb-0 dash-value-wrap">{{ stat.value }}</h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Section 3: Sales Overview + Order Status -->
        <div class="row g-3 mb-3">
            <div class="col-12 col-xl-8">
                <div class="card border rounded-4 h-100 mb-0 overflow-hidden figma-card">
                    <div class="card-header d-flex align-items-center justify-content-between flex-wrap gap-2">
                        <h4 class="h6 mb-0">{{ __('sales_overview') }}</h4>
                        <div class="d-flex align-items-center gap-3 sales-header-controls">
                            <div class="d-flex align-items-center gap-3 text-muted small sales-legend">
                                <div class="d-flex align-items-center gap-2">
                                    <span class="dot-sm bg-primary"></span>
                                    <span class="text-capitalize">{{ __('orders') }}</span>
                                </div>
                                <div class="d-flex align-items-center gap-2">
                                    <span class="dot-sm bg-light-primary"></span>
                                    <span class="text-capitalize">{{ __('revenue') }}</span>
                                </div>
                            </div>
                            <select v-model="salesPeriod" @change="updateSalesChart"
                                class="form-select form-select-sm figma-select-pill">
                                <option value="yearly">{{ __('yearly') }}</option>
                                <option value="monthly">{{ __('daily') }}</option>
                                <option value="weekly">{{ __('weekly') }}</option>
                            </select>
                        </div>
                    </div>
                    <div class="card-body dash-body dash-body--chart">
                        <!-- Desktop / tablet: the original single chart. -->
                        <apexcharts v-if="!isPhone" ref="salesChart" width="100%" :height="salesChartHeight" type="bar" :options="salesChartOptions"
                            :series="salesChartSeries"></apexcharts>

                        <!-- Phones: the y-axis is its own fixed column (a second, invisible-bars chart that only
                             draws the rupee scale) so it never moves; only the plot + Jan-Dec scroll sideways.
                             Both charts share height, data and axis settings so the scale lines up with the grid. -->
                        <div v-else class="d-flex w-100 overflow-hidden sales-chart-wrapper">
                            <div class="flex-shrink-0 sales-y-axis" :style="{ width: salesAxisWidth + 'px' }">
                                <apexcharts :width="salesAxisWidth" :height="salesChartHeight" type="bar" :options="salesAxisChartOptions"
                                    :series="salesChartSeries"></apexcharts>
                            </div>
                            <div class="flex-grow-1 overflow-auto sales-chart-scroll">
                                <div class="sales-chart-inner" :style="{ minWidth: salesChartMinWidth + 'px' }">
                                    <apexcharts ref="salesChart" width="100%" :height="salesChartHeight" type="bar" :options="salesChartOptions"
                                        :series="salesChartSeries"></apexcharts>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-12 col-xl-4">
                <div class="card border rounded-4 h-100 mb-0 figma-card">
                    <div class="card-header d-flex align-items-center justify-content-between flex-wrap gap-2">
                        <h4 class="h6 mb-0">{{ __('order_status') }}</h4>
                        <select v-model="orderStatusPeriod" @change="mockDataRefresh('orderStatus')" class="form-select form-select-sm figma-select-pill">
                            <option value="yearly">{{ __('yearly') }}</option>
                            <option value="monthly">{{ __('monthly') }}</option>
                        </select>
                    </div>
                    <div class="card-body dash-body d-flex flex-column justify-content-center">
                        <div class="d-flex flex-column dash-os-list" v-if="orderStatusItems.length">
                            <div class="d-flex align-items-center gap-2" v-for="(item, idx) in orderStatusItems"
                                :key="'os-' + idx">
                                <div class="d-flex align-items-center justify-content-center flex-shrink-0 dash-os-icon"
                                    :style="{ '--os-color': item.color }">
                                    <i :class="item.iconClass"></i>
                                </div>
                                <div class="flex-grow-1 min-w-0">
                                    <div class="d-flex justify-content-between align-items-center dash-row-head">
                                        <span class="figma-order-status-label dash-row-label text-truncate">{{ item.label }}</span>
                                        <span class="figma-order-status-count mb-0">{{ item.count }}</span>
                                    </div>
                                    <div class="rounded-pill overflow-hidden dash-bar-track" :style="{ backgroundColor: item.bgColor }">
                                        <div class="h-100 rounded-pill transition-all"
                                            :style="{ width: item.percent + '%', backgroundColor: item.color }"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div v-else-if="recordLoading" class="dash-empty"><b-spinner small variant="primary"></b-spinner></div>
                        <div v-else class="dash-empty">
                            <i class="fa fa-inbox fa-2x mb-2"></i>
                            <span>{{ __('No data found') }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Section 4: Business performance (all-time totals with trend pills), compact horizontal cards -->
        <div class="mb-3">
            <h5 class="dash-section-title mb-2">{{ __('business_performance') }}</h5>
            <div class="row g-3">
                <div class="col-6 col-md-4 col-xl-2" v-for="(stat, index) in summaryStats" :key="'sum-' + index">
                    <div class="card border rounded-4 h-100 mb-0 figma-card-white dash-perf-card">
                        <div class="d-flex align-items-start gap-2 min-w-0 dash-perf-row">
                            <div class="figma-stat-icon-box dash-icon-32" :class="stat.iconBgClass">
                                <base-icon v-if="stat.icon" :name="stat.icon" width="18" height="18" />
                                <i v-else :class="[stat.iconClass, stat.iconTextClass]"></i>
                            </div>
                            <div class="d-flex flex-column flex-grow-1 min-w-0">
                                <span class="dash-perf-label text-capitalize">{{ stat.label }}</span>
                                <div class="d-flex align-items-center flex-wrap dash-perf-meta">
                                    <span class="dash-perf-value dash-value-wrap">{{ stat.value }}</span>
                                    <span v-if="stat.trendValue" class="dash-trend" :class="stat.trendUp ? 'dash-trend--up' : 'dash-trend--down'">
                                        <base-icon :name="stat.trendUp ? 'TrendUp' : 'TrendDown'" width="12" height="12" />
                                        <span>{{ stat.trendValue }}</span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Section 5: Top sales by category (ranked list) + Catalog & inventory + Customers by platform -->
        <div class="row g-3 mb-3">
            <div class="col-12 col-lg-6 col-xl-4">
                <div class="card border rounded-4 h-100 mb-0 figma-card">
                    <div class="card-header d-flex align-items-center justify-content-between flex-wrap gap-2">
                        <h4 class="h6 mb-0">
                            {{ __('top_sales_by_category') }}
                            <span class="text-muted small font-weight-normal ms-1">({{ categoryChartLabels.length }} {{ __('categories') }})</span>
                        </h4>
                        <select v-model="categoryPeriod" @change="mockDataRefresh('category')" class="form-select form-select-sm figma-select-pill">
                            <option value="yearly">{{ __('yearly') }}</option>
                            <option value="monthly">{{ __('monthly') }}</option>
                        </select>
                    </div>
                    <div class="card-body dash-body d-flex flex-column">
                        <template v-if="categoryRanked.length">
                            <div class="d-flex align-items-baseline justify-content-between gap-2 dash-rank-summary">
                                <span class="figma-stat-label mb-0">{{ __('total_sales') }}</span>
                                <span class="dash-rank-total">{{ $currency }}{{ formatNumber(categoryTotalSales) }}</span>
                            </div>
                            <div class="d-flex flex-column dash-rank-list">
                                <div v-for="item in categoryRanked" :key="'cat-' + item.key" class="d-flex align-items-center gap-2 min-w-0">
                                    <span class="dash-rank-chip flex-shrink-0" :class="{ 'dash-rank-chip--top': item.rank === 1, 'dash-rank-chip--other': item.isOther }">
                                        <i v-if="item.isOther" class="fa fa-ellipsis-h"></i>
                                        <template v-else>{{ item.rank }}</template>
                                    </span>
                                    <div class="flex-grow-1 min-w-0">
                                        <div class="d-flex justify-content-between align-items-center gap-2 dash-row-head">
                                            <span class="dash-rank-name text-truncate" :class="{ 'text-capitalize': item.isOther }">{{ item.name }}</span>
                                            <span class="dash-rank-amount flex-shrink-0">{{ item.value }} <span class="dash-rank-share">{{ item.share }}%</span></span>
                                        </div>
                                        <div class="rounded-pill overflow-hidden dash-bar-track dash-bar-track--muted">
                                            <div class="h-100 rounded-pill transition-all"
                                                :style="{ width: item.share + '%', backgroundColor: item.color }"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </template>
                        <div v-else-if="recordLoading" class="dash-empty"><b-spinner small variant="primary"></b-spinner></div>
                        <div v-else class="dash-empty">
                            <i class="fa fa-chart-bar fa-2x mb-2"></i>
                            <span>{{ __('No data found') }}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-12 col-lg-6 col-xl-4">
                <div class="card border rounded-4 h-100 mb-0 figma-card">
                    <div class="card-header d-flex align-items-center justify-content-between flex-wrap gap-2">
                        <h4 class="h6 mb-0">{{ __('catalog_inventory') }}</h4>
                    </div>
                    <div class="card-body dash-body">
                        <div class="row dash-cat-grid">
                            <div class="col-6" v-for="tile in catalogTiles" :key="'cat-tile-' + tile.key">
                                <component :is="tile.to ? 'router-link' : 'div'" v-bind="tile.to ? { to: tile.to } : {}"
                                    class="figma-kpi-card-v2 w-100 h-100 text-decoration-none dash-cat-tile"
                                    :class="[tile.tintClass, { 'dash-cat-tile--link': !!tile.to }]">
                                    <div class="d-flex align-items-center gap-2 w-100 min-w-0">
                                        <div class="figma-stat-icon-box figma-kpi-icon-v2 dash-icon-32" :class="tile.iconBgClass">
                                            <i :class="tile.iconClass"></i>
                                        </div>
                                        <div class="d-flex flex-column text-start flex-grow-1 min-w-0">
                                            <span class="figma-stat-label mb-0 dash-tile-label">{{ tile.label }}</span>
                                            <h4 class="figma-stat-value mb-0 dash-value-wrap">{{ tile.value }}</h4>
                                        </div>
                                        <span v-if="tile.to && tile.showView" class="dash-cat-view flex-shrink-0">
                                            <span class="dash-cat-view-text">{{ __('view') }}</span>
                                            <i class="fa fa-chevron-right"></i>
                                        </span>
                                        <i v-else-if="tile.to" class="fa fa-chevron-right dash-cat-chevron flex-shrink-0"></i>
                                    </div>
                                </component>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-12 col-xl-4">
                <div class="card border rounded-4 h-100 mb-0 figma-card">
                    <div class="card-header d-flex align-items-center justify-content-between flex-wrap gap-2">
                        <h4 class="h6 mb-0">{{ __('customers_by_platform') }}</h4>
                        <select v-model="platformPeriod" @change="mockDataRefresh('platform')" class="form-select form-select-sm figma-select-pill">
                            <option value="yearly">{{ __('yearly') }}</option>
                            <option value="monthly">{{ __('monthly') }}</option>
                        </select>
                    </div>
                    <div class="card-body dash-body d-flex flex-column">
                        <div class="d-flex align-items-baseline justify-content-between gap-2 dash-rank-summary">
                            <span class="figma-stat-label mb-0">{{ __('Total Users') }}</span>
                            <span class="dash-platform-total">{{ formatNumber(totalUsers) }}</span>
                        </div>
                        <div class="d-flex flex-column dash-os-list">
                            <div v-for="p in platformItems" :key="'plat-' + p.key" class="d-flex align-items-center gap-2">
                                <div class="dash-platform-icon flex-shrink-0">
                                    <i :class="p.iconClass"></i>
                                </div>
                                <div class="flex-grow-1 min-w-0">
                                    <div class="d-flex justify-content-between align-items-center gap-2 dash-row-head">
                                        <span class="figma-order-status-label dash-row-label text-truncate">{{ p.label }}</span>
                                        <span class="dash-platform-count flex-shrink-0">{{ p.count }} <span class="text-muted">&middot; {{ p.percent }}%</span></span>
                                    </div>
                                    <div class="rounded-pill overflow-hidden dash-bar-track dash-bar-track--muted">
                                        <div class="h-100 rounded-pill transition-all"
                                            :style="{ width: p.percent + '%', backgroundColor: p.color }"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Section 6: Top Selling Products + Top Rated Products + Highest Revenue Sellers -->
        <div class="row g-3 mb-3">
            <div class="col-12 col-lg-6 col-xl-4">
                <div class="card border rounded-4 h-100 mb-0 figma-card">
                    <div class="card-header d-flex align-items-center justify-content-between flex-wrap gap-2">
                        <h4 class="h6 mb-0">{{ __('top_selling_products') }}</h4>
                        <select v-model="sellingPeriod" @change="mockDataRefresh('selling')"
                            class="form-select form-select-sm figma-select-pill">
                            <option value="yearly">{{ __('yearly') }}</option>
                            <option value="monthly">{{ __('monthly') }}</option>
                        </select>
                    </div>
                    <div class="card-body p-0 d-flex flex-column">
                        <div class="dash-list" v-if="paginatedSellingProducts.length">
                            <div class="d-flex align-items-center gap-2 border-bottom figma-hover-light dash-list-row"
                                v-for="(prod, idx) in paginatedSellingProducts" :key="'selling-' + idx">
                                <div class="figma-avatar-42 dash-avatar overflow-hidden dash-avatar-soft flex-shrink-0">
                                    <img v-if="prod.image" :src="prod.image" class="w-100 h-100 object-fit-cover" alt="" />
                                </div>
                                <div class="flex-grow-1 text-start min-w-0">
                                    <h6 class="dash-list-title dash-list-name mb-0 text-truncate">{{ getDisplayName(prod.name) }}</h6>
                                    <div class="d-flex align-items-center gap-1">
                                        <img :src="$baseUrl + '/images/icons/sold.svg'" class="dash-sold-icon" alt="" />
                                        <span class="text-muted extra-small">{{ __('sold') }} : {{ formatNumber(prod.sold_count || 0) }}</span>
                                    </div>
                                </div>
                                <span class="dash-list-title dash-list-amount flex-shrink-0">{{ $currency }}{{ formatNumber(prod.total_revenue || 0) }}</span>
                            </div>
                        </div>
                        <div v-else-if="recordLoading" class="dash-empty"><b-spinner small variant="primary"></b-spinner></div>
                        <div v-else class="dash-empty">
                            <i class="fa fa-box-open fa-2x mb-2"></i>
                            <span>{{ __('No data found') }}</span>
                        </div>

                        <div class="d-flex justify-content-between align-items-center flex-wrap gap-2 mt-auto border-top bg-light-soft rounded-bottom-4 dash-pager dash-pager--compact"
                            v-if="topSellingProducts.length">
                            <div class="d-flex align-items-center gap-2">
                                <label class="showing-results-text mb-0">{{ __('per_page') }}</label>
                                <b-form-select v-model="sellingPerPage" :options="pageOptions" size="sm"
                                    class="w-auto" @change="sellingPage = 1"></b-form-select>
                            </div>
                            <b-pagination v-model="sellingPage" :total-rows="topSellingProducts.length" :per-page="sellingPerPage"
                                align="right" class="figma-pagination mb-0" :limit="3"
                                hide-goto-end-buttons hide-ellipsis prev-text="<" next-text=">"></b-pagination>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-12 col-lg-6 col-xl-4">
                <div class="card border rounded-4 h-100 mb-0 figma-card">
                    <div class="card-header d-flex align-items-center justify-content-between flex-wrap gap-2">
                        <h4 class="h6 mb-0">{{ __('top_rated_products') }}</h4>
                        <select v-model="ratedPeriod" @change="mockDataRefresh('rated')"
                            class="form-select form-select-sm figma-select-pill">
                            <option value="yearly">{{ __('yearly') }}</option>
                            <option value="monthly">{{ __('monthly') }}</option>
                        </select>
                    </div>
                    <div class="card-body p-0 d-flex flex-column">
                        <div class="dash-list" v-if="paginatedRatedProducts.length">
                            <div class="d-flex align-items-center gap-2 border-bottom figma-hover-light dash-list-row"
                                v-for="(prod, idx) in paginatedRatedProducts" :key="'rated-' + idx">
                                <div class="figma-avatar-42 dash-avatar overflow-hidden dash-avatar-soft flex-shrink-0">
                                    <img v-if="prod.image" :src="prod.image" class="w-100 h-100 object-fit-cover" alt="" />
                                </div>
                                <div class="flex-grow-1 text-start min-w-0">
                                    <h6 class="dash-list-title dash-list-name mb-0 text-truncate">{{ getDisplayName(prod.name) }}</h6>
                                    <span class="text-muted extra-small">{{ formatNumber(prod.review_count || 0) }} {{ __('reviews') }}</span>
                                </div>
                                <div class="d-flex align-items-center gap-1 dash-rating flex-shrink-0">
                                    <i class="fa fa-star small"></i>
                                    <span class="font-weight-bold small">{{ (prod.rating || 0).toFixed(1) }}</span>
                                </div>
                            </div>
                        </div>
                        <div v-else-if="recordLoading" class="dash-empty"><b-spinner small variant="primary"></b-spinner></div>
                        <div v-else class="dash-empty">
                            <i class="fa fa-star fa-2x mb-2"></i>
                            <span>{{ __('No data found') }}</span>
                        </div>

                        <div class="d-flex justify-content-between align-items-center flex-wrap gap-2 mt-auto border-top bg-light-soft rounded-bottom-4 dash-pager dash-pager--compact"
                            v-if="topRatedProducts.length">
                            <div class="d-flex align-items-center gap-2">
                                <label class="showing-results-text mb-0">{{ __('per_page') }}</label>
                                <b-form-select v-model="ratedPerPage" :options="pageOptions" size="sm"
                                    class="w-auto" @change="ratedPage = 1"></b-form-select>
                            </div>
                            <b-pagination v-model="ratedPage" :total-rows="topRatedProducts.length" :per-page="ratedPerPage"
                                align="right" class="figma-pagination mb-0" :limit="3"
                                hide-goto-end-buttons hide-ellipsis prev-text="<" next-text=">"></b-pagination>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-12 col-xl-4">
                <div class="card border rounded-4 h-100 mb-0 figma-card">
                    <div class="card-header d-flex align-items-center justify-content-between flex-wrap gap-2">
                        <h4 class="h6 mb-0">
                            {{ __('highest_revenue_sellers') }}
                            <span class="text-muted small font-weight-normal ms-1">({{ sellers.length }} {{ __('sellers') }})</span>
                        </h4>
                        <select v-model="sellerPeriod" @change="mockDataRefresh('sellers')" class="form-select form-select-sm figma-select-pill">
                            <option value="yearly">{{ __('yearly') }}</option>
                            <option value="monthly">{{ __('monthly') }}</option>
                        </select>
                    </div>
                    <div class="card-body p-0 d-flex flex-column">
                        <div class="dash-list" v-if="paginatedSellers.length">
                            <div class="d-flex align-items-center gap-2 border-bottom figma-hover-light dash-list-row"
                                v-for="(seller, idx) in paginatedSellers" :key="'seller-' + idx">
                                <div class="figma-avatar-42 dash-avatar overflow-hidden dash-avatar-soft flex-shrink-0">
                                    <img v-if="seller.logo_url" :src="seller.logo_url" class="w-100 h-100 object-fit-cover" alt="" />
                                </div>
                                <div class="flex-grow-1 text-start min-w-0">
                                    <h6 class="dash-list-title dash-list-name mb-0 text-truncate">{{ getDisplayName(seller.store_name) || getDisplayName(seller.name) }}</h6>
                                    <span class="text-muted extra-small">{{ __('orders') }} : {{ seller.order_count || '—' }}</span>
                                </div>
                                <span class="dash-list-title dash-list-amount flex-shrink-0">{{ $currency }}{{ formatNumber(seller.total_revenue) }}</span>
                            </div>
                        </div>
                        <div v-else-if="recordLoading" class="dash-empty"><b-spinner small variant="primary"></b-spinner></div>
                        <div v-else class="dash-empty">
                            <i class="fa fa-store fa-2x mb-2"></i>
                            <span>{{ __('No data found') }}</span>
                        </div>

                        <div class="d-flex justify-content-between align-items-center flex-wrap gap-2 mt-auto border-top bg-light-soft rounded-bottom-4 dash-pager dash-pager--compact"
                            v-if="sellers.length > sellerPerPage">
                            <div class="showing-results-text">
                                {{ __('Showing Result') }} : <span class="showing-bold">{{ sellerPageEnd }}</span> {{ __('of') }} <span class="showing-bold">{{ sellers.length }}</span>
                            </div>
                            <b-pagination v-model="sellerPage" :total-rows="sellers.length" :per-page="sellerPerPage"
                                align="right" class="figma-pagination mb-0" :limit="3"
                                hide-goto-end-buttons hide-ellipsis prev-text="<" next-text=">"></b-pagination>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Section 7: Latest Orders -->
        <div class="card figma-card mb-0">
            <div class="card-header d-flex align-items-center justify-content-between flex-wrap gap-2">
                <h4 class="h6 mb-0">{{ __('recent_orders') }}</h4>
                <div class="d-flex align-items-center gap-2">
                    <router-link to="/orders" class="btn btn-light btn-sm px-3 view-order-btn">
                        <span class="small font-weight-bold">{{ __('view_orders') }}</span>
                        <i class="fa fa-arrow-right ms-1 extra-small"></i>
                    </router-link>
                </div>
            </div>
            <div class="card-body p-0">
                <div class="table-responsive dash-orders-scroll">
                    <b-table :items="orders" :fields="orderFields" :current-page="orderCurrentPage"
                        :per-page="orderPerPage" :filter-included-fields="filterOn" :sort-by.sync="sortBy"
                        :sort-desc.sync="sortDesc" :sort-direction="sortDirection" :bordered="false" :busy="isLoading"
                        show-empty :tbody-tr-class="() => 'figma-tr align-middle'" small
                        class="figma-order-table text-dark mb-0">
                        <template #empty="scope">
                            <div class="text-center text-muted py-4"><i class="fa fa-inbox fa-2x d-block mb-2"></i>{{ scope.emptyText }}</div>
                        </template>


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
                                    <i class="bi bi-box-arrow-up-right dash-ext-icon"></i>
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
                                    class="dash-view-btn" v-b-tooltip.hover :title="__('view')" :aria-label="__('view')">
                                    <i class="bi bi-eye"></i>
                                </router-link>
                            </div>
                        </template>

                        <template #table-busy>
                            <div class="text-center py-4">
                                <b-spinner class="align-middle" variant="primary"></b-spinner>
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
                                        <img :src="item.image" class="rounded-3 dash-item-thumb" alt="" />
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
                                    <b-spinner small variant="primary"></b-spinner>
                                </div>
                            </div>
                        </template>
                    </b-table>
                </div>

                <div class="d-flex justify-content-between align-items-center flex-wrap gap-2 border-top bg-light-soft rounded-bottom-4 dash-pager dash-pager--compact" v-if="orderTotalRows">
                    <div class="d-flex align-items-center gap-2">
                        <label class="showing-results-text mb-0">{{ __('per_page') }}</label>
                        <b-form-select v-model="orderPerPage" :options="pageOptions" size="sm"
                            class="w-auto" @change="orderCurrentPage = 1"></b-form-select>
                        <table-count :current-page="orderCurrentPage" :per-page="orderPerPage" :total-rows="orderTotalRows"></table-count>
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

            <div class="modal-body-content dash-modal-scroll">
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
            recordLoading: true,
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

            // Viewport width, kept current so charts can switch to their phone sizing
            viewportWidth: window.innerWidth,

            // Chart data
            salesChartCategories: [],
            salesOrdersData: [],
            salesRevenueData: [],

            // Category chart
            categoryChartLabels: [],
            categoryChartSeries: [],

            // Top products (derived from categories/orders data)
            topRatedProducts: [],
            topSellingProducts: [],

            // Platform data (from record.platform_usage)
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
                { label: this.__('today_order'), value: this.formatNumber(todayOrders), cardBg: 'var(--ui-surface)', iconBgClass: 'bg-stat-blue', icon: 'Total order' },
                { label: this.__('today_revenue'), value: this.$currency + this.formatNumber(todayRevenue), cardBg: 'var(--ui-surface)', iconBgClass: 'bg-stat-green', icon: 'total rev' },
                { label: this.__('today_returns'), value: this.formatNumber(todayReturns), cardBg: 'var(--ui-surface)', iconBgClass: 'bg-stat-orange', icon: 'total return' },
                { label: this.__('today_cancelled'), value: this.formatNumber(todayCancelled), cardBg: 'var(--ui-surface)', iconBgClass: 'bg-stat-red', icon: 'total cancel' },
            ];
        },
        summaryStats() {
            const r = this.record || {};
            const orderCount = Number(r.order_count) || 0;
            const revenue = Number(r.revenue) || 0;
            const customers = r.customer_count || 0;
            const pendingOrders = r.pending_orders || 0;
            const deliveredOrders = r.delivered_orders || 0;
            // Average order value: all-time revenue / all-time orders (0 when there are no orders yet)
            const avgOrderValue = orderCount > 0 ? Math.round((revenue / orderCount) * 100) / 100 : 0;
            // Trend pills are only shown when the API sends a trend for that stat
            const trend = (key, defaultUp) => ({
                trendUp: r[key + '_up'] !== undefined ? r[key + '_up'] : defaultUp,
                trendValue: r[key] || null,
            });
            return [
                { label: this.__('total_orders'), value: this.formatNumber(orderCount), iconBgClass: 'bg-stat-blue-light', iconTextClass: 'text-stat-blue', iconClass: 'fa fa-shopping-bag', ...trend('total_orders_trend', true) },
                { label: this.__('revenue'), value: this.$currency + this.formatNumber(revenue), iconBgClass: 'bg-stat-green-light', iconTextClass: 'text-stat-green', iconClass: 'fa fa-wallet', ...trend('revenue_trend', true) },
                { label: this.__('average_order_value'), value: this.$currency + this.formatNumber(avgOrderValue), iconBgClass: 'bg-stat-purple-light', iconTextClass: 'text-stat-purple', iconClass: 'fa fa-receipt', trendValue: null },
                { label: this.__('active_customers'), value: this.formatNumber(customers), iconBgClass: 'bg-stat-pink-light', iconTextClass: 'text-stat-pink', iconClass: 'fa fa-users', ...trend('customers_trend', true) },
                { label: this.__('pending_orders'), value: this.formatNumber(pendingOrders), iconBgClass: 'bg-stat-red-light', iconTextClass: 'text-stat-red', iconClass: 'fa fa-hourglass-half', ...trend('pending_orders_trend', false) },
                { label: this.__('delivered_orders'), value: this.formatNumber(deliveredOrders), iconBgClass: 'bg-stat-green-light', iconTextClass: 'text-stat-green', iconClass: 'fa fa-truck', ...trend('delivered_orders_trend', true) },
            ];
        },
        // Catalog & inventory tiles: counts the dashboard API already returns. Each tile links to its
        // list page only when the user may open it (same permissions as the sidebar).
        catalogTiles() {
            const r = this.record || {};
            const link = (perm, to) => (this.$can(perm) ? to : null);
            return [
                { key: 'products', label: this.__('products'), value: this.formatNumber(r.product_count || 0), iconClass: 'fa fa-cubes', iconBgClass: 'bg-stat-purple', tintClass: '', to: link('product_list', '/manage_products') },
                { key: 'sellers', label: this.__('sellers'), value: this.formatNumber(r.seller_count || 0), iconClass: 'fa fa-store', iconBgClass: 'bg-stat-blue', tintClass: '', to: link('seller_list', '/sellers') },
                { key: 'categories', label: this.__('categories'), value: this.formatNumber(r.category_count || 0), iconClass: 'fa fa-th-large', iconBgClass: 'bg-stat-green', tintClass: '', to: link('category_list', '/manage_categories') },
                { key: 'brands', label: this.__('brands'), value: this.formatNumber(r.brand_count || 0), iconClass: 'fa fa-tags', iconBgClass: 'bg-stat-pink', tintClass: '', to: link('brands', '/brands') },
                { key: 'sold_out', label: this.__('sold_out'), value: this.formatNumber(r.sold_out_count || 0), iconClass: 'fa fa-times-circle', iconBgClass: 'bg-stat-red', tintClass: 'card-kpi-out', to: link('stock_management', '/manage_stock'), showView: true },
                { key: 'low_stock', label: this.__('low_stock'), value: this.formatNumber(r.low_stock_count || 0), iconClass: 'fa fa-exclamation-triangle', iconBgClass: 'bg-stat-orange', tintClass: 'card-kpi-processing', to: link('stock_management', '/manage_stock'), showView: true },
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
                'Payment Pending': { color: 'var(--theme-warn-500)', bgColor: 'var(--theme-warn-50)', label: this.__('payment_pending') || 'Pending', iconClass: 'fa fa-credit-card' },
                'Pending': { color: 'var(--theme-warn-500)', bgColor: 'var(--theme-warn-50)', label: this.__('pending') || 'Pending', iconClass: 'fa fa-clock' },
                'Received': { color: 'var(--theme-info-500)', bgColor: 'var(--theme-info-50)', label: this.__('received') || 'Received', iconClass: 'fa fa-inbox' },
                'Processed': { color: 'var(--theme-success-500)', bgColor: 'var(--theme-success-50)', label: this.__('processed') || 'Processed', iconClass: 'fa fa-cog' },
                'Shipped': { color: 'var(--theme-info-600)', bgColor: 'var(--theme-info-100)', label: this.__('shipped') || 'Shipped', iconClass: 'fa fa-box' },
                'Out For Delivery': { color: 'var(--theme-primary-500)', bgColor: 'var(--theme-primary-50)', label: this.__('out_for_delivery') || 'Out for Delivery', iconClass: 'fa fa-truck' },
                'Delivered': { color: 'var(--theme-success-500)', bgColor: 'var(--theme-success-50)', label: this.__('delivered') || 'Delivered', iconClass: 'fa fa-check-circle' },
            };

            return filteredStatuses.map(s => {
                const mapped = statusMap[s.status];
                return {
                    label: mapped.label,
                    count: s.order_count || 0,
                    color: mapped.color,
                    bgColor: mapped.bgColor,
                    iconClass: mapped.iconClass,
                    percent: Math.round(((s.order_count || 0) / maxCount) * 100),
                };
            });
        },
        isPhone() {
            return this.viewportWidth < 576;
        },
        // Sales Overview chart height: compact on every screen (desktop 260, tablet 220, phone 200).
        salesChartHeight() {
            if (this.viewportWidth < 576) return 200;
            if (this.viewportWidth < 992) return 220;
            return 260;
        },
        // Phone chart width: ~28px per category plus the y-axis, never narrower than 300px.
        salesChartMinWidth() {
            return Math.max(300, (this.salesChartCategories || []).length * 28 + 56);
        },
        // Phones: width of the fixed y-axis column - grows with the longest rupee label so big
        // values (e.g. ₹1,234,567) are never cut, and stays at 64px for small ones.
        salesAxisWidth() {
            const orders = this.salesOrdersData || [];
            const revenue = this.salesRevenueData || [];
            let max = 15000;
            for (let i = 0; i < Math.max(orders.length, revenue.length); i++) {
                max = Math.max(max, (parseFloat(orders[i]) || 0) + (parseFloat(revenue[i]) || 0));
            }
            const longest = (this.$currency + this.formatNumber(Math.round(max))).length;
            return Math.max(64, Math.ceil(longest * 6.4) + 18);
        },
        // Phones: options for the fixed y-axis column. Same data / scale / label heights as the
        // scrolling chart, but bars, grid, x labels and tooltip are invisible - only the rupee
        // labels remain, lined up with the scrolling chart's gridlines.
        salesAxisChartOptions() {
            const o = this.salesChartOptions;
            return {
                ...o,
                chart: { ...o.chart, animations: { enabled: false }, zoom: { enabled: false } },
                colors: ['transparent', 'transparent'],
                xaxis: {
                    ...o.xaxis,
                    labels: { ...o.xaxis.labels, style: { colors: 'transparent', fontSize: '10px' } },
                    crosshairs: { show: false },
                    tooltip: { enabled: false }
                },
                yaxis: { ...o.yaxis, show: true },
                grid: { show: false, padding: { left: 0, right: 0 } },
                tooltip: { enabled: false },
                legend: { show: false }
            };
        },
        salesChartOptions() {
            return {
                chart: { type: 'bar', stacked: true, toolbar: { show: false }, fontFamily: 'Nunito, sans-serif' },
                plotOptions: {
                    bar: {
                        columnWidth: this.isPhone ? '60%' : '40%',
                        borderRadius: this.isPhone ? 3 : 4,
                    }
                },
                // revenue uses a lighter shade than orders, but not -100 (near-white in light themes)
                colors: [this.$themeColor('primary-500'), this.$themeColor('primary-300')],
                dataLabels: { enabled: false },
                xaxis: {
                    categories: this.salesChartCategories,
                    axisBorder: { show: false },
                    axisTicks: { show: false },
                    // Phones: horizontal 10px labels, all shown - the chart gets enough width
                    // (see salesChartMinWidth) and scrolls inside its wrapper instead of squeezing.
                    labels: this.isPhone
                        ? { rotate: 0, rotateAlways: false, hideOverlappingLabels: false, trim: false, minHeight: 24, maxHeight: 24, style: { colors: this.$themeColor('neutral-500'), fontSize: '10px' } }
                        : { style: { colors: this.$themeColor('neutral-500'), fontSize: '12px' } },
                    crosshairs: {
                        show: true,
                        fill: {
                            type: 'solid',
                            color: this.$themeColor('neutral-200'),
                            opacity: 0.8
                        },
                        stroke: {
                            color: this.$themeColor('neutral-200'),
                            width: 0,
                        }
                    }
                },
                yaxis: {
                    // Phones: the rupee scale lives in the fixed column beside the scrolling plot.
                    show: !this.isPhone,
                    min: 0,
                    max: (max) => {
                        return max > 15000 ? max : 15000;
                    },
                    tickAmount: 5,
                    labels: {
                        style: { colors: this.$themeColor('neutral-500'), fontSize: this.isPhone ? '10px' : '12px' },
                        // Phones: whole rupees only - the axis column is narrow and decimals on the
                        // scale ticks (e.g. 71,791.96) are noise.
                        formatter: (val) => this.$currency + this.formatNumber(this.isPhone ? Math.round(val) : val)
                    }
                },
                grid: { borderColor: this.$themeColor('neutral-200'), strokeDashArray: 4 },
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
                        // Phones: a smaller card (tighter padding / font) that never wraps.
                        const phone = this.isPhone;
                        const box = phone
                            ? 'background:var(--theme-neutral-900);color:var(--theme-neutral-50);padding:8px 10px;border-radius:8px;font-size:11px;line-height:1.5;white-space:nowrap;border:none;box-shadow:0 10px 15px -3px rgba(0,0,0,0.1)'
                            : 'background:var(--theme-neutral-900);color:var(--theme-neutral-50);padding:12px;border-radius:12px;font-size:13px;line-height:1.6;border:none;box-shadow:0 10px 15px -3px rgba(0,0,0,0.1)';
                        const gap = phone ? 6 : 8;
                        return '<div style="' + box + '">' +
                            '<div style="margin-bottom:4px;font-weight:700">' + cat + '</div>' +
                            '<div style="display:flex;align-items:center;gap:' + gap + 'px"><span style="width:8px;height:8px;border-radius:50%;background:var(--theme-primary-500)"></span> ' + ordersLabel + ' : <span style="font-weight:700">' + orders + '</span></div>' +
                            '<div style="display:flex;align-items:center;gap:' + gap + 'px"><span style="width:8px;height:8px;border-radius:50%;background:var(--theme-primary-300)"></span> ' + revenueLabel + ' : <span style="font-weight:700">' + this.$currency + (revenue || 0).toLocaleString() + '</span></div>' +
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
        // Top sales by category: total of every category with sales in the selected period.
        categoryTotalSales() {
            return (this.categoryChartSeries || []).reduce((sum, v) => sum + (parseFloat(v) || 0), 0);
        },
        // Top sales by category as a ranked bar list: top 5 by sales, then one "Others" row with
        // the rest. Bar width = share of the total; #1 uses the strongest primary shade.
        categoryRanked() {
            const total = this.categoryTotalSales;
            if (!total) return [];
            const shades = ['var(--theme-primary-500)', 'var(--theme-primary-400)', 'var(--theme-primary-300)', 'var(--theme-primary-300)', 'var(--theme-primary-200)'];
            const share = (v) => {
                const pct = (v / total) * 100;
                return pct >= 10 ? Math.round(pct) : Math.round(pct * 10) / 10;
            };
            const items = this.categoryChartLabels
                .map((label, index) => ({ name: label, amount: parseFloat(this.categoryChartSeries[index]) || 0 }))
                .sort((x, y) => y.amount - x.amount);
            const rows = items.slice(0, 5).map((item, idx) => ({
                key: 'r' + idx,
                rank: idx + 1,
                name: item.name,
                value: this.$currency + this.formatNumber(item.amount),
                share: share(item.amount),
                color: shades[idx],
                isOther: false,
            }));
            const rest = items.slice(5);
            if (rest.length) {
                const restTotal = rest.reduce((sum, item) => sum + item.amount, 0);
                rows.push({
                    key: 'others',
                    rank: null,
                    name: this.__('others') + ' (' + rest.length + ')',
                    value: this.$currency + this.formatNumber(restTotal),
                    share: share(restTotal),
                    color: 'var(--theme-neutral-400)',
                    isOther: true,
                });
            }
            return rows;
        },
        // Customers by platform: one progress bar per platform with its share of all users.
        platformItems() {
            const u = this.platformUsage || {};
            const web = Number(u.web) || 0;
            const android = Number(u.android) || 0;
            const ios = Number(u.ios) || 0;
            const total = web + android + ios;
            const pct = (n) => (total > 0 ? Math.round((n / total) * 100) : 0);
            return [
                { key: 'web', label: this.__('Web'), count: this.formatNumber(web), percent: pct(web), iconClass: 'bi bi-globe', color: 'var(--theme-primary-500)' },
                { key: 'android', label: this.__('Android (App)'), count: this.formatNumber(android), percent: pct(android), iconClass: 'fab fa-android', color: 'var(--theme-primary-400)' },
                { key: 'ios', label: this.__('iOS (App)'), count: this.formatNumber(ios), percent: pct(ios), iconClass: 'fab fa-apple', color: 'var(--theme-primary-300)' },
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
    mounted() {
        window.addEventListener('resize', this.onViewportResize);
        // Phones: the tooltip lives inside the scrolling chart, so near the visible edge it gets
        // cut off. Nudge it back inside after every pointer/touch update.
        ['mousemove', 'touchstart', 'touchmove', 'click'].forEach(evt => this.$el.addEventListener(evt, this.keepSalesTooltipInView, { passive: true }));
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.onViewportResize);
        ['mousemove', 'touchstart', 'touchmove', 'click'].forEach(evt => this.$el.removeEventListener(evt, this.keepSalesTooltipInView));
    },
    created() {
        this.getRecord();
        this.getSalesData();
        this.getPieChartData();
        this.setSellerWalletTransaction();
        this.getLatestOrders();
    },
    methods: {
        keepSalesTooltipInView(e) {
            if (!this.isPhone || !e.target.closest || !e.target.closest('.sales-chart-scroll')) return;
            requestAnimationFrame(() => {
                const scroller = this.$el.querySelector('.sales-chart-scroll');
                const tip = scroller && scroller.querySelector('.apexcharts-tooltip');
                if (!tip) return;
                tip.style.marginLeft = '0px';
                const t = tip.getBoundingClientRect();
                const r = scroller.getBoundingClientRect();
                let shift = 0;
                if (t.right > r.right) shift = r.right - t.right - 4;
                if (t.left + shift < r.left) shift = r.left - t.left + 4;
                tip.style.marginLeft = shift + 'px';
            });
        },
        onViewportResize() {
            this.viewportWidth = window.innerWidth;
        },
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
            this.recordLoading = true;
            axios.get(this.$apiUrl + '/dashboard', { params: params }).then(res => {
                this.recordLoading = false;
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

                    // Populate the category ranked list with real sales from top_categories_sales
                    const catSales = data.data.top_categories_sales || [];
                    const filtered = catSales.filter(c => parseFloat(c.total_revenue) > 0);
                    this.categoryChartLabels = filtered.map(c => this.getDisplayName(c.category_name));
                    this.categoryChartSeries = filtered.map(c => parseFloat(c.total_revenue));
                }
            }).catch(error => {
                this.recordLoading = false;
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
            // the Sellers period visibly "refreshed" the unrelated Category list too).
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
                confirmButtonColor: 'var(--theme-primary-500)',
                cancelButtonColor: 'var(--theme-error-500)',
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

/* Recent orders: view action as a tinted primary tile (same pattern as the Order Status icons) */
.dash-view-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border-radius: var(--ui-radius);
    color: var(--theme-primary-600);
    background: color-mix(in srgb, currentColor 12%, transparent);
    font-size: 16px;
    text-decoration: none;
    transition: background-color 0.15s ease;
}

.dash-view-btn:hover {
    color: var(--theme-primary-700);
    background: color-mix(in srgb, currentColor 20%, transparent);
}

body.theme-dark .dash-view-btn,
body.theme-dark .dash-view-btn i {
    color: var(--theme-primary-400) !important;
}

/* Page never scrolls sideways: long values wrap / truncate inside their cards */
.dash-page {
    max-width: 100%;
    overflow-x: hidden;
}

.min-w-0 {
    min-width: 0;
}

.dash-welcome-title {
    color: var(--ui-heading);
}

.dash-section-title {
    font-family: var(--ui-font);
    font-size: 16px;
    font-weight: 700;
    color: var(--ui-heading);
}

.dash-value-wrap {
    overflow-wrap: anywhere;
    line-height: 1.25;
}

.dash-list-title {
    color: var(--ui-heading);
}

.dash-rating {
    color: var(--theme-warn-500);
}

.dash-os-icon {
    width: 32px;
    height: 32px;
    border-radius: 8px;
    font-size: 14px;
    /* icon in the status colour, tile tinted from it; follows the theme in light and dark mode */
    color: var(--os-color);
    background: color-mix(in srgb, var(--os-color) 14%, transparent);
}

/* the global dark-mode text reset forces div/i colours with !important; keep the status colour */
body.theme-dark .dash-os-icon,
body.theme-dark .dash-os-icon i {
    color: var(--os-color) !important;
}

.dash-bar-track {
    height: 6px;
}

.dash-bar-track--muted {
    background-color: var(--ui-surface-muted);
}

/* Empty / loading state inside a card */
.dash-empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    flex-grow: 1;
    padding: 24px 16px;
    font-size: 13px;
    color: var(--ui-text-muted);
}

.dash-empty i {
    color: var(--ui-text-subtle);
    opacity: 0.6;
}


/* Catalog & inventory tiles */
.dash-cat-tile {
    color: inherit;
    box-shadow: none !important; /* flat tiles inside a card (global KPI tile adds a shadow) */
}

.dash-cat-tile--link:hover,
.dash-cat-tile--link:focus {
    text-decoration: none;
    border-color: var(--theme-primary-300) !important; /* global tile border is !important */
}

.dash-cat-view {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    font-size: 12px;
    font-weight: 600;
    color: var(--ui-text-muted);
}

.dash-cat-view i,
.dash-cat-chevron {
    font-size: 10px;
    color: var(--ui-text-subtle);
}

.dash-cat-tile--link:hover .dash-cat-view,
.dash-cat-tile--link:hover .dash-cat-view i,
.dash-cat-tile--link:hover .dash-cat-chevron {
    color: var(--theme-primary-600);
}

/* Customers by platform */
.dash-platform-total {
    font-size: 22px;
    font-weight: 700;
    line-height: 1.2;
    color: var(--ui-heading);
}

.dash-platform-icon {
    width: 30px;
    height: 30px;
    border-radius: 8px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    background: var(--ui-primary-soft);
    color: var(--theme-primary-600);
}

.dash-platform-count {
    font-size: 13px;
    font-weight: 700;
    color: var(--ui-heading);
}

.dash-platform-count .text-muted {
    font-weight: 400;
}

@media (max-width: 575.98px) {
    .dash-quick-actions {
        width: 100%;
    }

    .dash-quick-actions > * {
        flex: 1 1 0;
        justify-content: center;
    }

    .dash-platform-total {
        font-size: 20px;
    }
}

/* "View Orders" (secondary action): global hover fills it with primary, keep the label readable */
.view-order-btn:hover,
.view-order-btn:hover span,
.view-order-btn:hover i {
    color: var(--theme-neutral-50) !important; /* beats .btn-light text colour on the filled hover */
}

/* Recent orders: the table keeps its columns and scrolls inside the card on narrow screens */
.dash-orders-scroll {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
}

.dash-orders-scroll .figma-order-table {
    min-width: 880px;
}

.dash-orders-scroll .figma-order-table td,
.dash-orders-scroll .figma-order-table th {
    white-space: nowrap;
}

.dash-avatar-soft {
    background-color: var(--theme-info-50);
}

.dash-sold-icon {
    width: 17px;
    height: 17px;
}

.dash-ext-icon {
    font-size: 12px;
}

.dash-item-thumb {
    width: 44px;
    height: 44px;
    object-fit: cover;
}

.dash-modal-scroll {
    max-height: 500px;
    overflow-y: auto;
}

/* Sales Overview on phones (<576px). Desktop and tablet are untouched. */
@media (max-width: 575.98px) {
    /* Header: title + period select share the first row, the legend drops to a compact
       second row. The controls wrapper is flattened so its children can be reordered. */
    .sales-header-controls {
        display: contents;
    }

    .sales-header-controls .figma-select-pill {
        order: 2;
        width: auto;
    }

    .sales-header-controls .sales-legend {
        order: 3;
        width: 100%;
    }

    /* Fixed y-axis column + scrollable plot. The scroll bar belongs to the plot only. */
    .sales-y-axis {
        pointer-events: none;
    }

    .sales-chart-scroll {
        min-width: 0;
        overflow-y: hidden;
        -webkit-overflow-scrolling: touch;
        scrollbar-width: thin;
        scrollbar-color: var(--theme-neutral-300) transparent;
    }

    .sales-chart-scroll::-webkit-scrollbar {
        height: 6px;
    }

    .sales-chart-scroll::-webkit-scrollbar-thumb {
        background: var(--theme-neutral-300);
        border-radius: 999px;
    }
}

/* ===== Compact dashboard (second pass) =====
   Global card / tile rules use "#main ..." + !important, so these overrides are scoped under
   "#main .dash-page" to win on specificity. */
.dash-welcome-title {
    font-size: 20px;
    line-height: 1.3;
}

#main .dash-page .figma-card > .card-header {
    min-height: 0 !important;
    padding: 12px 16px !important;
}

#main .dash-page .figma-card > .card-header .figma-select-pill {
    min-height: 36px !important;
    height: 36px !important;
    font-size: 13px !important;
    font-weight: 500 !important;
    padding-top: 0 !important;
    padding-bottom: 0 !important;
    padding-left: 14px !important;
    padding-right: 34px !important;
    line-height: normal !important;
}

#main .dash-page .figma-card > .card-body.dash-body {
    padding: 14px 16px !important;
}

#main .dash-page .figma-card > .card-body.dash-body--chart {
    padding: 4px 12px 8px !important;
}

/* Today strip: slim 64px tiles with a 36px icon */
#main .dash-page .figma-kpi-card-v2.dash-tile {
    min-height: 64px !important;
    padding: 10px 14px !important;
}

/* Label wraps (max 2 lines) instead of cutting to "Today ..." on narrow screens */
#main .dash-page .dash-tile-label {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    white-space: normal;
    line-height: 1.2;
}

@media (max-width: 575.98px) {
    #main .dash-page .figma-kpi-card-v2.dash-tile {
        padding: 10px !important;
    }
}

#main .dash-page .dash-tile .figma-stat-value {
    font-size: 18px !important;
    line-height: 1.25;
}

#main .dash-page .dash-icon-36 {
    width: 36px !important;
    height: 36px !important;
    min-width: 36px;
    border-radius: 9px !important;
    font-size: 15px;
}

#main .dash-page .dash-icon-32 {
    width: 32px !important;
    height: 32px !important;
    min-width: 32px;
    border-radius: 8px !important;
    font-size: 14px;
}

/* Rows of label + count + thin bar (order status, platforms, categories) */
.dash-os-list {
    gap: 10px;
}

.dash-row-head {
    margin-bottom: 4px;
    line-height: 18px;
}

#main .dash-page .dash-row-label {
    font-size: 13px;
    line-height: 18px;
}

#main .dash-page .dash-row-head .figma-order-status-count {
    font-size: 13px !important;
    line-height: 18px !important;
}

.dash-section-title {
    font-size: 15px;
}

/* Business performance: compact horizontal cards (icon left, label, value + trend pill) */
#main .dash-page .figma-card-white.dash-perf-card {
    padding: 10px 12px !important;
}

.dash-perf-label {
    font-size: 12px;
    line-height: 16px;
    color: var(--ui-text-muted);
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    overflow-wrap: normal;
    word-break: normal;
}

/* Phones: icon sits above the text so the label gets the full card width (no mid-word breaks) */
@media (max-width: 575.98px) {
    .dash-perf-row {
        flex-direction: column;
        gap: 6px !important;
    }

    .dash-perf-row > .flex-grow-1 {
        width: 100%;
    }
}

.dash-perf-meta {
    gap: 4px 6px;
    margin-top: 2px;
}

/* The trend pill always sits on its own line below the amount, on every card and screen size */
.dash-perf-meta.d-flex {
    flex-direction: column;
    align-items: flex-start !important;
}

.dash-perf-value {
    font-size: 16px;
    font-weight: 700;
    color: var(--ui-heading);
}

.dash-trend {
    display: inline-flex;
    align-items: center;
    gap: 2px;
    height: 18px;
    padding: 0 6px;
    border-radius: 999px;
    font-size: 11px;
    font-weight: 600;
    white-space: nowrap;
}

.dash-trend--up {
    background: var(--theme-primary-50);
    color: var(--theme-primary-600);
}

.dash-trend--down {
    background: var(--theme-error-50);
    color: var(--theme-error-500);
}

/* Top sales by category: ranked bar list */
.dash-rank-summary {
    padding-bottom: 10px;
    margin-bottom: 12px;
    border-bottom: 1px dashed var(--ui-border);
}

.dash-rank-total {
    font-size: 20px;
    font-weight: 700;
    line-height: 1.2;
    color: var(--ui-heading);
    overflow-wrap: anywhere;
}

.dash-rank-list {
    gap: 12px;
}

.dash-rank-chip {
    width: 24px;
    height: 24px;
    border-radius: 7px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    font-weight: 700;
    background: var(--theme-primary-50);
    color: var(--theme-primary-700);
}

.dash-rank-chip--top {
    background: var(--theme-primary-500);
    color: var(--theme-neutral-50);
}

.dash-rank-chip--other {
    background: var(--ui-surface-muted);
    color: var(--ui-text-muted);
    font-size: 10px;
}

.dash-rank-name {
    font-size: 13px;
    font-weight: 600;
    color: var(--ui-heading);
}

.dash-rank-amount {
    font-size: 13px;
    font-weight: 700;
    color: var(--ui-heading);
}

.dash-rank-share {
    font-weight: 400;
    color: var(--ui-text-muted);
    margin-left: 2px;
}

/* Catalog & inventory: 6 compact tiles, 2 per row */
.dash-cat-grid {
    margin: -5px;
}

.dash-cat-grid > [class*="col"] {
    padding: 5px;
}

#main .dash-page .figma-kpi-card-v2.dash-cat-tile {
    min-height: 56px !important;
    padding: 8px 10px !important;
}

#main .dash-page .dash-cat-tile .figma-stat-value {
    font-size: 16px !important;
    line-height: 1.25;
}

#main .dash-page .dash-cat-tile .figma-stat-label {
    font-size: 11px !important;
}

/* Phones: the whole tile is the link, so drop the chevron to give the label room */
@media (max-width: 575.98px) {
    .dash-cat-tile .dash-cat-chevron {
        display: none;
    }
}

/* The tile is a link already; the "View" word only shows when the tile is wide enough */
@media (min-width: 1200px) and (max-width: 1599.98px), (max-width: 400px) {
    .dash-cat-view-text {
        display: none;
    }
}

/* Product / seller lists */
.dash-list {
    padding: 0 16px;
}

.dash-list-row {
    padding: 8px 0;
}

.dash-list-row:last-child {
    border-bottom: 0 !important;
}

.dash-avatar.figma-avatar-42 {
    width: 36px;
    height: 36px;
    border-radius: 9px;
}

.dash-list-name {
    font-size: 13px;
    font-weight: 600;
    line-height: 18px;
}

.dash-list-amount {
    font-size: 13px;
    font-weight: 700;
}

.dash-pager--compact {
    padding: 8px 12px;
}

@media (max-width: 575.98px) {
    #main .dash-page .figma-card > .card-header {
        padding: 10px 12px !important;
    }

    #main .dash-page .figma-card > .card-body.dash-body {
        padding: 12px !important;
    }

    #main .dash-page .figma-kpi-card-v2.dash-tile {
        padding: 8px 10px !important;
        min-height: 58px !important;
    }

    #main .dash-page .dash-tile .figma-stat-value {
        font-size: 16px !important;
    }

    .dash-list {
        padding: 0 12px;
    }

    .dash-perf-value {
        font-size: 15px;
    }

    .dash-rank-total {
        font-size: 18px;
    }
}
</style>
