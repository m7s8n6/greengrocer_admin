<template>
    <div id="app">
        <div class="global-announcement-banner" role="note">
            <i class="fa fa-exclamation-circle"></i>
            <div class="announcement-ticker">
                <div class="announcement-track">
                    <span>{{ announcementText }}</span>
                    <span aria-hidden="true">{{ announcementText }}</span>
                </div>
            </div>
        </div>
        <div id="sidebar" class="active">
            <div class="sidebar-wrapper active">
                <div class="sidebar-header">

                    <div class="d-flex justify-content-center align-items-center" style="position: relative;">
                        <div class="logo">
                            <router-link to="/" style="display: flex; align-items: center; justify-content: center;">
                                <img class="container-logo logo-light" v-if="$appLogo != ''" :src="$storageUrl + $appLogo"
                                    alt='Logo' srcset="" />
                                <img class="container-logo logo-light" v-else :src="$baseUrl + '/images/logo.png'" alt='Logo'
                                    srcset="" />
                                <img class="container-logo logo-dark" v-if="$appDarkLogo" :src="$storageUrl + $appDarkLogo"
                                    alt='Logo' srcset="" />
                            </router-link>
                        </div>
                    </div>
                    <div class="toggler" style="position: absolute; top: 0; right: 0; display: none !important;">
                        <a href="javascript:void(0)" class="sidebar-hide"><i class="bi bi-x bi-middle"></i></a>
                    </div>
                </div>
                <div class="sidebar-menu">
                    <ul class="menu">

                        <!-- MODULES Section -->
                        <li class="sidebar-title text-muted text-uppercase"
                            style="padding: 0.5rem 1.5rem 0.5rem 1.5rem; font-size: 0.75rem; font-weight: 700; letter-spacing: .05rem; list-style: none;">
                            {{ __('modules') }}
                        </li>

                        <template v-for="item in modulesSidebarItems">
                            <li class="sidebar-item"
                                :class="{ 'active': isActive(item.url) || subIsActive(item), 'has-sub': isHasSub(item) }"
                                v-if="item.role == true ? $role('Super Admin') : (item.permission && $can(item.permission)) || (item.permission === null && isHasSub(item) && hasAnySubmenuPermission(item)) || (item.settings_hub && hasAnySettingsPermission())">

                                <template v-if="isHasSub(item)">
                                    <a class="sidebar-link">
                                        <i :class="`fa fa-${item.icon}`"></i>
                                        <span>{{ item.name }}</span>
                                        <span class="pending-dot" v-if="hasPending(item)"></span>
                                    </a>
                                    <ul class="submenu" :class="{ 'active': subIsActive(item) }">
                                        <template v-for="sub in item.submenu">
                                            <li class="submenu-item" :class="{ 'active': isActive(sub.url) }"
                                                :key="sub.key"
                                                v-if="sub.role ? $role('Super Admin') : sub.permission && $can(sub.permission)">
                                                <router-link :to="sub.url" @click.native="closeSideBarMenu()">
                                                    {{ sub.name }}
                                                    <span class="pending-dot" v-if="hasPending(sub)"></span>
                                                </router-link>
                                            </li>
                                        </template>
                                    </ul>
                                </template>

                                <template v-else>
                                    <router-link class="sidebar-link" :to="item.url" @click.native="closeSideBarMenu()">
                                        <i :class="`fa fa-${item.icon}`"></i>
                                        <span>{{ item.name }}</span>
                                        <span class="pending-dot" v-if="hasPending(item)"></span>
                                    </router-link>
                                </template>
                            </li>
                        </template>

                        <!-- GENERAL Section -->
                        <li class="sidebar-title text-muted text-uppercase"
                            style="padding: 0.5rem 1.5rem 0.5rem 1.5rem; font-size: 0.75rem; font-weight: 700; letter-spacing: .05rem; list-style: none;">
                            {{ __('general') }}
                        </li>

                        <template v-for="item in generalSidebarItems">
                            <li class="sidebar-item"
                                :class="{ 'active': isActive(item.url) || subIsActive(item), 'has-sub': isHasSub(item) }"
                                v-if="item.role == true ? $role('Super Admin') : (item.permission && $can(item.permission)) || (item.permission === null && isHasSub(item) && hasAnySubmenuPermission(item)) || (item.settings_hub && hasAnySettingsPermission())">

                                <template v-if="isHasSub(item)">
                                    <a class="sidebar-link">
                                        <i :class="`fa fa-${item.icon}`"></i>
                                        <span>{{ item.name }}</span>
                                        <span class="pending-dot" v-if="hasPending(item)"></span>
                                    </a>
                                    <ul class="submenu" :class="{ 'active': subIsActive(item) }">
                                        <template v-for="sub in item.submenu">
                                            <li class="submenu-item" :class="{ 'active': isActive(sub.url) }"
                                                :key="sub.key"
                                                v-if="sub.role ? $role('Super Admin') : sub.permission && $can(sub.permission)">
                                                <router-link :to="sub.url" @click.native="closeSideBarMenu()">
                                                    {{ sub.name }}
                                                    <span class="pending-dot" v-if="hasPending(sub)"></span>
                                                </router-link>
                                            </li>
                                        </template>
                                    </ul>
                                </template>

                                <template v-else>
                                    <router-link class="sidebar-link" :to="item.url" @click.native="closeSideBarMenu()">
                                        <i :class="`fa fa-${item.icon}`"></i>
                                        <span>{{ item.name }}</span>
                                        <span class="pending-dot" v-if="hasPending(item)"></span>
                                    </router-link>
                                </template>
                            </li>
                        </template>
                        <template v-for="item in filteredDatabaseDownloadBtn">
                            <div
                                v-if="item.role == true ? $role('Super Admin') : (item.permission && $can(item.permission))">
                                <button class="btn btn-primary" @click="downloadDatabase"><i
                                        :class="`fa fa-download`"></i><b-spinner v-if="isLoading" small
                                        label="Spinning"></b-spinner> Download Database</button>
                            </div>
                        </template>
                    </ul>
                </div>
                <button class="sidebar-toggler btn x"><i data-feather="x"></i></button>
            </div>
        </div>
        <div id="main">
            <vertical-header></vertical-header>
            <div class="main-content">
                <router-view></router-view>
            </div>
            <the-footer></the-footer>
        </div>
    </div>
</template>
<script>
import TheSidebar from './TheSidebar'
import TheFooter from './TheFooter'
import VerticalHeader from './VerticalHeader'
import Auth from "../Auth";
import axios from "axios";

export default {
    name: 'TheContainer',
    components: {
        TheSidebar,
        TheFooter,
        VerticalHeader
    },
    created() {
        this.closeSideBarMenu();
        this.checkPermissions();
        this.fetchPendingCounts();
        this.pendingTimer = setInterval(this.fetchPendingCounts, 60000);
    },
    beforeDestroy() {
        clearInterval(this.pendingTimer);
        if (this.bannerObserver) this.bannerObserver.disconnect();
    },
    watch: {
        '$route': function () {
            this.checkPermissions();
            this.fetchPendingCounts();
        }
    },
    mounted() {
        this.observeBannerHeight();
        if (window.localStorage.getItem('lang')) {
            this.lang = window.localStorage.getItem('lang');
            console.log(this.lang);
        }

        function slideToggle(t, e, o) { 0 === t.clientHeight ? j(t, e, o, !0) : j(t, e, o) } function slideUp(t, e, o) { j(t, e, o) } function slideDown(t, e, o) { j(t, e, o, !0) } function j(t, e, o, i) { void 0 === e && (e = 400), void 0 === i && (i = !1), t.style.overflow = "hidden", i && (t.style.display = "block"); var p, l = window.getComputedStyle(t), n = parseFloat(l.getPropertyValue("height")), a = parseFloat(l.getPropertyValue("padding-top")), s = parseFloat(l.getPropertyValue("padding-bottom")), r = parseFloat(l.getPropertyValue("margin-top")), d = parseFloat(l.getPropertyValue("margin-bottom")), g = n / e, y = a / e, m = s / e, u = r / e, h = d / e; window.requestAnimationFrame(function l(x) { void 0 === p && (p = x); var f = x - p; i ? (t.style.height = g * f + "px", t.style.paddingTop = y * f + "px", t.style.paddingBottom = m * f + "px", t.style.marginTop = u * f + "px", t.style.marginBottom = h * f + "px") : (t.style.height = n - g * f + "px", t.style.paddingTop = a - y * f + "px", t.style.paddingBottom = s - m * f + "px", t.style.marginTop = r - u * f + "px", t.style.marginBottom = d - h * f + "px"), f >= e ? (t.style.height = "", t.style.paddingTop = "", t.style.paddingBottom = "", t.style.marginTop = "", t.style.marginBottom = "", t.style.overflow = "", i || (t.style.display = "none"), "function" == typeof o && o()) : window.requestAnimationFrame(l) }) }
        let sidebarItems = document.querySelectorAll('.sidebar-item.has-sub');
        // Mark initially open submenus with 'open' class for toggle icon
        sidebarItems.forEach(function (item) {
            const submenu = item.querySelector('.submenu');
            if (submenu && submenu.classList.contains('active')) {
                item.classList.add('open');
            }
        });
        for (var i = 0; i < sidebarItems.length; i++) {
            let sidebarItem = sidebarItems[i];
            sidebarItems[i].querySelector('.sidebar-link').addEventListener('click', function (e) {
                e.preventDefault();

                let submenu = sidebarItem.querySelector('.submenu');
                const isCurrentlyOpen = submenu?.classList?.contains('active');

                // Accordion: close all other open submenus
                sidebarItems.forEach(function (otherItem) {
                    if (otherItem !== sidebarItem) {
                        const otherSubmenu = otherItem.querySelector('.submenu');
                        if (otherSubmenu && otherSubmenu.classList.contains('active')) {
                            otherSubmenu.classList.remove('active');
                            // Use the same animation instead of setting display: none instantly
                            slideUp(otherSubmenu, 300);
                            otherItem.classList.remove('open');
                        }
                    }
                });

                // Toggle current submenu
                if (isCurrentlyOpen) {
                    submenu?.classList?.remove('active');
                    sidebarItem.classList.remove('open');
                    slideUp(submenu, 300);
                } else {
                    submenu?.classList?.add('active');
                    sidebarItem.classList.add('open');
                    slideDown(submenu, 300);
                }
            })
        }
        if (window.innerWidth < 1200) {
            document.getElementById('sidebar')?.classList?.remove('active');
        }
        // Update backdrop when sidebar opens/closes on small screens
        const updateSidebarBackdrop = () => {
            const sidebar = document.getElementById('sidebar');
            const backdrop = document.querySelector('.sidebar-backdrop');
            const isSmallScreen = window.innerWidth < 1200;
            const isActive = sidebar?.classList?.contains('active');
            if (backdrop) backdrop.remove();
            if (isSmallScreen && isActive) {
                const b = document.createElement('div');
                b.className = 'sidebar-backdrop';
                b.addEventListener('click', () => {
                    sidebar?.classList?.remove('active');
                    updateSidebarBackdrop();
                });
                document.body.appendChild(b);
            }
        };
        window.addEventListener('resize', (event) => {
            var w = window.innerWidth;
            if (w < 1200) {
                document.getElementById('sidebar')?.classList?.remove('active');
                updateSidebarBackdrop();
            } else {
                document.getElementById('sidebar')?.classList?.add('active');
                updateSidebarBackdrop();
            }
        });
        document.querySelector('.burger-btn').addEventListener('click', () => {
            document.getElementById('sidebar')?.classList?.toggle('active');
            updateSidebarBackdrop();
        });
        document.querySelector('.sidebar-hide').addEventListener('click', () => {
            document.getElementById('sidebar')?.classList?.toggle('active');
            updateSidebarBackdrop();
        });
        // Perfect Scrollbar Init
        if (typeof PerfectScrollbar.default == 'function') {
            const container = document.querySelector(".sidebar-wrapper");
            const ps = new PerfectScrollbar.default(container, {
                wheelPropagation: false
            });
        }

        // Scroll into active sidebar
        if (document.querySelector('.sidebar-item.active')) {
            this.scrollSidebarToActive()
        }


    },
    data: function () {
        return {
            lang: 'en',
            isLoading: false,
            suspecious: null,
            pendingCounts: {},
            pendingTimer: null,
            sidebarItems: [
                {
                    name: __('dashboard'),
                    icon: 'tachometer-alt',
                    url: '/dashboard',
                    permission: 'manage_dashboard'
                },
                {
                    name: __('modules'),
                    icon: 'th-list',
                    url: '/modules',
                    permission: 'module_list',
                    is_general: true
                },
                {
                    name: __('orders'),
                    icon: 'shopping-cart',
                    url: '/orders',
                    permission: 'order_list'
                },
                {
                    name: __('self_pickup_orders'),
                    icon: 'box-open',
                    url: '/self_pickup_orders',
                    permission: 'self_pickup_order_list'
                },
                {
                    name: __('categories'),
                    icon: 'bullseye',
                    permission: null,
                    submenu: [
                        {
                            name: __('add_category'),
                            icon: 'grid-fill',
                            url: '/manage_categories/create',
                            permission: 'category_create',
                        },
                        {
                            name: __('manage_categories'),
                            icon: 'grid-fill',
                            url: '/manage_categories',
                            permission: 'category_list',
                        },
                    ]
                },
                {
                    name: __('products'),
                    icon: 'cube',
                    permission: null,
                    submenu: [
                        {
                            name: __('add_product'),
                            icon: 'grid-fill',
                            url: '/manage_products/create',
                            permission: 'product_create',
                        },
                        {
                            name: __('manage_products'),
                            icon: 'grid-fill',
                            url: '/manage_products',
                            permission: 'product_list',
                        },
                        {
                            name: __('approve_requests'),
                            icon: 'grid-fill',
                            url: '/approve_requests',
                            pending_key: 'product_approvals',
                            permission: 'approve_requests',
                        },
                        {
                            name: __('product_ratings'),
                            icon: 'grid-fill',
                            url: '/product_ratings',
                            permission: 'product_ratings',
                        },
                        {
                            name: __('media'),
                            icon: 'grid-fill',
                            url: '/media',
                            permission: 'manage_media',
                        },
                        {
                            name: __('bulk_upload'),
                            icon: 'grid-fill',
                            url: '/bulk_upload',
                            permission: 'manage_product_bulk_upload',
                        },
                        {
                            name: __('bulk_update'),
                            icon: 'grid-fill',
                            url: '/bulk_update',
                            permission: 'manage_product_bulk_upload',
                        },
                        {
                            name: __('taxes'),
                            icon: 'grid-fill',
                            url: '/taxes',
                            permission: 'taxes',
                        },
                        {
                            name: __('brands'),
                            icon: 'grid-fill',
                            url: '/brands',
                            permission: 'brands',
                        },
                        {
                            name: __('addons'),
                            icon: 'grid-fill',
                            url: '/addons',
                            permission: 'addons',
                        },
                        {
                            name: __('attributes'),
                            icon: 'grid-fill',
                            url: '/attributes',
                            permission: 'attributes',
                        },
                        {
                            name: __('product_order'),
                            icon: 'grid-fill',
                            url: '/product_order',
                            permission: 'manage_product_order',
                        },
                    ]
                },
                {
                    name: __('stock_management'),
                    icon: 'cubes',
                    url: '/manage_stock',
                    permission: 'stock_management',
                },
                {
                    name: __('sellers'),
                    icon: 'building',
                    permission: null,
                    submenu: [
                        {
                            name: __('add_seller'),
                            icon: 'grid-fill',
                            url: '/sellers/create',
                            permission: 'seller_create',
                        },
                        {
                            name: __('seller_requests'),
                            icon: 'grid-fill',
                            url: '/registered_sellers',
                            pending_key: 'seller_requests',
                            permission: 'seller_requests',
                        },
                        {
                            name: __('manage_sellers'),
                            icon: 'grid-fill',
                            url: '/sellers',
                            permission: 'seller_list',
                        },
                        {
                            name: __('seller_wallet_transactions'),
                            icon: 'grid-fill',
                            url: '/seller_wallet_transactions',
                            permission: 'seller_wallet_transactions',
                        },
                        {
                            name: __('policies_seller'),
                            icon: 'grid-fill',
                            url: '/privacy_policy_seller',
                            permission: 'manage_privacy_policy_seller_app',
                        },
                    ],
                },
                {
                    name: __('home_sliders'),
                    icon: 'picture-o',
                    permission: 'home_slider_image_list',
                    submenu: [
                        {
                            name: __('add_home_slider'),
                            icon: 'grid-fill',
                            url: '/home_sliders/create',
                            permission: 'home_slider_image_create',
                        },
                        {
                            name: __('manager_home_sliders'),
                            icon: 'grid-fill',
                            url: '/home_sliders',
                            permission: 'home_slider_image_list',
                        }
                    ]
                },
                {
                    name: __('offer_image'),
                    icon: 'gift',
                    permission: null,
                    submenu: [
                        {
                            name: __('add_offer_images'),
                            icon: 'grid-fill',
                            url: '/offers/create',
                            permission: 'new_offer_image_create',
                        },
                        {
                            name: __('manage_offer_images'),
                            icon: 'grid-fill',
                            url: '/offers',
                            permission: 'new_offer_image_list',
                        },
                        {
                            name: __('manage_popup_offer'),
                            icon: 'grid-fill',
                            url: '/popup',
                            permission: 'popup_offer',
                        }
                    ]
                },

                {
                    name: __('promo_code'),
                    icon: 'tags',
                    permission: 'promo_code_list',
                    submenu: [
                        {
                            name: __('add_promo_code'),
                            icon: 'grid-fill',
                            url: '/promo_code/create',
                            permission: 'promo_code_create',
                        },
                        {
                            name: __('manage_promo_code'),
                            icon: 'grid-fill',
                            url: '/promo_code',
                            permission: 'promo_code_list',
                        }
                    ]

                },

                {
                    name: __('featured_sections'),
                    icon: 'puzzle-piece',
                    permission: 'featured_section_list',
                    submenu: [
                        {
                            name: __('add_section'),
                            icon: 'grid-fill',
                            url: '/sections/create',
                            permission: 'featured_section_create',
                        },
                        {
                            name: __('manage_section'),
                            icon: 'grid-fill',
                            url: '/sections',
                            permission: 'featured_section_list',
                        },
                    ]

                },

                {
                    name: __('return_requests'),
                    icon: 'retweet',
                    url: '/return_requests',
                    permission: 'return_request_list',
                },
                {
                    name: __('custom_fields'),
                    icon: 'list',
                    url: '/custom_fields/seller',
                    permission: 'custom_field_list',
                },
                {
                    name: __('withdrawal_requests'),
                    icon: 'credit-card',
                    url: '/withdrawal_requests',
                    permission: 'withdrawal_request_list',
                },
                {
                    name: __('theme_settings'),
                    icon: 'paint-brush',
                    url: '/theme-settings',
                    permission: 'theme_settings',
                },
                {
                    name: __('delivery_settings'),
                    icon: 'truck',
                    permission: null,
                    submenu: [
                        {
                            name: __('delivery_settings'),
                            icon: 'grid-fill',
                            url: '/delivery_settings',
                            permission: 'delivery_settings',
                        },
                        {
                            name: 'Seller Delivery Boys',
                            icon: 'grid-fill',
                            url: '/auto-assign-settings',
                            permission: 'seller_delivery_boys',
                        },
                    ]
                },
                {
                    name: __('delivery_boys'),
                    icon: 'male',
                    permission: null,
                    is_general: true,
                    submenu: [
                        {
                            name: __('add_delivery_boy'),
                            icon: 'grid-fill',
                            url: '/delivery_boys/create',
                            permission: 'delivery_boy_create',
                        },
                        {
                            name: __('dlivery_boy_requests'),
                            icon: 'grid-fill',
                            url: '/registered_delivery_boys',
                            pending_key: 'delivery_boy_requests',
                            permission: 'delivery_boy_list',
                        },
                        {
                            name: __('manage_delivery_boys'),
                            icon: 'grid-fill',
                            url: '/delivery_boys',
                            permission: 'delivery_boy_list',
                        },
                        {
                            name: __('fund_transfers'),
                            icon: 'grid-fill',
                            url: '/fund_transfers',
                            permission: 'fund_transfers_list',
                        },
                        {
                            name: __('delivery_boy_cash'),
                            icon: 'grid-fill',
                            url: '/cash_collection',
                            permission: 'cash_collection_list',
                        },
                        {
                            name: __('delivery_boy_policies'),
                            icon: 'grid-fill',
                            url: '/privacy_policy_delivery_boy',
                            permission: 'manage_privacy_policy_delivery_boy',
                        },
                        {
                            name: __('Salary'),
                            icon: 'grid-fill',
                            url: '/salary',
                            permission: 'salary_list',
                        },
                    ]
                },
                {
                    name: __('notifications'),
                    icon: 'share-square',
                    url: '/notifications',
                    permission: null,
                    is_general: true,
                    submenu: [
                        {
                            name: __('send_notifications'),
                            icon: 'grid-fill',
                            url: '/notifications/create',
                            permission: 'send_notification',
                        }, {
                            name: __('manage_notifications'),
                            icon: 'grid-fill',
                            url: '/notifications',
                            permission: 'notification_list',
                        }
                    ]
                },
                {
                    name: __('email'),
                    icon: 'envelope',
                    url: '/emails',
                    permission: null,
                    is_general: true,
                    submenu: [
                        {
                            name: __('email_templates'),
                            icon: 'grid-fill',
                            url: '/email_templates',
                            permission: 'email_templates',
                        }, {
                            name: __('manage_emails'),
                            icon: 'grid-fill',
                            url: '/emails',
                            permission: 'manage_emails',
                        }
                    ]
                },

                {
                    // Single entry for every setting page; the pages themselves are listed as cards on
                    // /system_settings (SettingsHub.vue). Replaces the old "System" and "Web Settings" submenus.
                    name: __('settings'),
                    icon: 'cog',
                    url: '/system_settings',
                    permission: null,
                    is_general: true,
                    settings_hub: true,
                },

                {
                    name: __('blogs'),
                    icon: 'pen',
                    permission: null,
                    submenu: [
                        {
                            name: __('blog_categories'),
                            icon: 'grid-fill',
                            url: '/blog_categories',
                            permission: 'blog_category_list',
                        },
                        {
                            name: __('blogs'),
                            icon: 'grid-fill',
                            url: '/blogs',
                            permission: 'blog_list',
                        }
                    ]
                },
                {
                    name: __('subscriptions'),
                    icon: 'credit-card',
                    permission: null,
                    is_general: true,
                    submenu: [
                        {
                            name: __('subscription_plans'),
                            icon: 'grid-fill',
                            url: '/subscriptions',
                            permission: 'subscription_list',
                        },
                        {
                            name: __('subscriptions_faqs'),
                            icon: 'grid-fill',
                            url: '/subscriptions_faqs',
                            permission: 'subscription_faq_list',
                        }
                    ]
                },

                {
                    name: __('languages'),
                    icon: 'language',
                    permission: null,
                    is_general: true,
                    submenu: [
                        {
                            name: __('add_language'),
                            icon: 'grid-fill',
                            url: '/languages/create',
                            permission: 'language_create',
                        },
                        {
                            name: __('manage_languages'),
                            icon: 'grid-fill',
                            url: '/languages',
                            permission: 'language_list',
                        }
                    ]
                },

                {
                    name: __('countries'),
                    icon: 'globe-asia',
                    permission: null,
                    is_general: true,
                    submenu: [
                        {
                            name: __('add_country'),
                            icon: 'grid-fill',
                            url: '/countries/create',
                            permission: 'country_create',
                        },
                        {
                            name: __('manage_countries'),
                            icon: 'grid-fill',
                            url: '/countries',
                            permission: 'country_list',
                        }
                    ]
                },

                {
                    name: __('location'),
                    icon: 'map',
                    permission: null,
                    is_general: true,
                    submenu: [
                        {
                            name: __('add_city'),
                            icon: 'grid-fill',
                            url: '/cities/create',
                            permission: 'city_create',
                        },

                        {
                            name: __('manage_cities'),
                            icon: 'grid-fill',
                            url: '/cities',
                            permission: 'city_list',
                        }
                    ]
                },
                {
                    name: __('customers'),
                    icon: 'male',
                    permission: null,
                    is_general: true,
                    submenu: [
                        {
                            name: __('customers'),
                            icon: 'grid-fill',
                            url: '/users',
                            permission: 'customer_list',
                        },
                        {
                            name: __('wishlists'),
                            icon: 'grid-fill',
                            url: '/wishlists',
                            permission: 'manage_wishlists',
                        },
                        {
                            name: __('product_requests'),
                            icon: 'grid-fill',
                            url: '/product_requests',
                            pending_key: 'product_requests',
                            permission: 'product_request_list',
                        },
                        {
                            name: __('wallet_transactions'),
                            icon: 'grid-fill',
                            url: '/wallet_transactions',
                            permission: 'manage_customer_wallet',
                        },
                        {
                            name: __('transactions'),
                            icon: 'grid-fill',
                            url: '/transactions',
                            permission: 'transaction_list',
                        },
                        {
                            name: __('customer_policies'),
                            icon: 'grid-fill',
                            url: '/privacy_policy',
                            permission: 'manage_privacy_policy',
                        },

                    ]
                },

                {
                    name: __('reports'),
                    icon: 'folder-open',
                    permission: null,
                    is_general: true,
                    submenu: [
                        {
                            name: __('product_sales_report'),
                            icon: 'grid-fill',
                            url: '/product_sales_reports',
                            permission: 'product_sales_reports',
                        },
                        {
                            name: __('sales_reports'),
                            icon: 'grid-fill',
                            url: '/sales_reports',
                            permission: 'sales_reports',
                        },
                        {
                            name: __('commission_reports'),
                            icon: 'grid-fill',
                            url: '/commission_reports',
                            permission: 'commission_reports',
                        }
                    ]
                },
                {
                    name: __('system_users'),
                    icon: 'users',
                    url: '/system_users',
                    role: true,
                    is_general: true
                },
                {
                    name: __('role'),
                    icon: 'user-secret',
                    url: '/role',
                    role: true,
                    is_general: true
                },
                {
                    name: __('faqs'),
                    icon: 'info',
                    url: '/faqs',
                    permission: 'faq_list',
                    is_general: true
                },
            ],
            // Former "System" / "Web Settings" submenu pages, now reached through the Settings hub.
            // Kept here so checkPermissions() still guards them and the Settings item stays active on them.
            settingsHubPages: [
                { url: '/store_settings', permission: 'manage_store_settings' },
                { url: '/payment_methods', permission: 'manage_payment_methods' },
                { url: '/additional_charges', permission: 'additional_charges_list' },
                { url: '/contact_us', permission: 'manage_contact_us' },
                { url: '/about_us', permission: 'manage_about_us' },
                { url: '/firebase-settings', permission: 'manage_Notification_settings' },
                { url: '/notification-templates', permission: 'manage_Notification_settings' },
                { url: '/sms-settings', permission: 'sms_settings' },
                { url: '/deeplink-settings', permission: 'deeplink_settings' },
                { url: '/realtime-settings', permission: 'realtime_settings' },
                { url: '/sms-templates', permission: 'sms_templates_list' },
                { url: '/seo-settings', permission: 'seo_settings_list' },
                { url: '/purchase_code', permission: 'manage_system_registration' },
                { url: '/system_updater', permission: 'manage_store_settings' },
                { url: '/general_settings', permission: 'general_settings' },
                { url: '/social_media', permission: 'manage_social_media_list' },
            ],
            databasedownloadBtn: [
                {
                    name: __('database_backup'),
                    icon: 'info',
                    permission: 'database_backup_download',

                },
            ]

        }
    },
    computed: {
        announcementText() {
            return __('global_attributes_deprecation_notice') || 'Global attributes and custom fields-product are being deprecated in an upcoming update. Sellers will need to create their own attributes and custom fields-product - please replace any global attribute and custom fields-product currently used on your products.';
        },
        modulesSidebarItems() {
            const activeModuleId = Number(localStorage.getItem('active_module_id')) || 1;
            // Addons only makes sense for the Food Delivery module (id 4) - strip it out of the
            // Products submenu for every other module.
            return this.sidebarItems
                .filter(item => !item.is_general)
                .map(item => {
                    if (activeModuleId !== 4 && item.submenu) {
                        return { ...item, submenu: item.submenu.filter(s => s.url !== '/addons') };
                    }
                    return item;
                });
        },
        generalSidebarItems() {
            return this.sidebarItems.filter(item => item.is_general);
        },
        filteredDatabaseDownloadBtn() {
            return this.databasedownloadBtn;
        }
    },
    methods: {
        // Bring the active menu item into view by scrolling only the sidebar list. scrollIntoView()
        // also scrolled the page itself, which on phones (off-canvas sidebar) hid the top bar.
        scrollSidebarToActive() {
            const item = document.querySelector('#sidebar .sidebar-item.active');
            const wrapper = document.querySelector('#sidebar .sidebar-wrapper');
            if (!item || !wrapper) return;
            const offset = item.getBoundingClientRect().top - wrapper.getBoundingClientRect().top;
            wrapper.scrollTop += offset - wrapper.clientHeight / 2;
        },

        // The announcement banner wraps to several lines on phones, so its height is not a fixed 40/72px.
        // Publish the real height as --banner-h so the sidebar and content offsets always clear it.
        observeBannerHeight() {
            const banner = document.querySelector('.global-announcement-banner');
            if (!banner) return;
            const apply = () => document.documentElement.style.setProperty('--banner-h', banner.offsetHeight + 'px');
            apply();
            if (window.ResizeObserver) {
                this.bannerObserver = new ResizeObserver(apply);
                this.bannerObserver.observe(banner);
            } else {
                window.addEventListener('resize', apply);
            }
        },

        fetchPendingCounts() {
            axios.get(this.$apiUrl + '/pending_counts').then((response) => {
                this.pendingCounts = (response.data && response.data.data) || {};
            }).catch(() => { });
        },

        // Red dot for a menu entry: its own pending_key, or any of its sub-entries (parent menus).
        hasPending(entry) {
            if (entry.pending_key) {
                return (this.pendingCounts[entry.pending_key] || 0) > 0;
            }
            return Array.isArray(entry.submenu) && entry.submenu.some(sub => this.hasPending(sub));
        },

        subIsActive(item) {
            // The Settings hub item has no submenu: it is active on the hub and on every page it links to.
            const paths = Array.isArray(item.submenu) ? item.submenu : (item.settings_hub ? this.settingsHubPages : []);
            return paths.some(path => {
                return this.$route.path.indexOf(path.url) === 0;
            });
        },
        isActive(url) {
            if (this.$route.path == url) {
                return true;
            }
            return false;
        },
        isHasSub(item) {
            if (item.hasOwnProperty("submenu")) {
                if (item.submenu.length > 0) {
                    return true;
                }
            }
            return false;
        },
        // Settings hub item: visible when the user can open at least one page listed on the hub.
        hasAnySettingsPermission() {
            const extra = ['manage_time_slots', 'manage_privacy_policy', 'manage_privacy_policy_seller_app', 'manage_privacy_policy_delivery_boy'];
            return this.settingsHubPages.some(page => page.permission && this.$can(page.permission))
                || extra.some(permission => this.$can(permission));
        },
        hasAnySubmenuPermission(item) {
            if (!item.submenu || item.submenu.length === 0) {
                return false;
            }
            return item.submenu.some(submenu => {
                if (submenu.role) {
                    return this.$role('Super Admin') && (item.name === 'Role' || item.name === 'System Users');
                }
                return submenu.permission && this.$can(submenu.permission);
            });
        },
        checkPermissions() {
            var current_path = this.$route.path;
            var permission = '';

            this.sidebarItems.forEach(menu => {
                //Only Main Categories
                if (menu.submenu && menu.submenu.length > 0) {
                    menu.submenu.forEach(submenu => {
                        if (submenu.url === current_path) {
                            permission = submenu.permission;
                        }
                    });
                } else {
                    if (menu.url === current_path) {
                        permission = menu.permission;
                    }
                }
            });

            // Pages reached through the Settings hub keep their sidebar permission guard.
            this.settingsHubPages.forEach(page => {
                if (page.url === current_path) {
                    permission = page.permission;
                }
            });

            if (Auth.check() && UserPermissions.length === 0) {
                //this.$router.push({path:'/login'});
                if (window.localStorage.getItem('loginCheck') == 1) {
                    Auth.logout();
                }
                window.localStorage.setItem('loginCheck', 1);
                window.location.reload();
            }
            else if (Auth.check() && permission && !this.$can(permission)) {
                this.$router.push({ path: '/unauthorized' });
            }

        },

        closeSideBarMenu() {
            var w = window.innerWidth;
            if (w < 1200) {
                document.getElementById('sidebar')?.classList?.remove('active');
                const backdrop = document.querySelector('.sidebar-backdrop');
                if (backdrop) backdrop.remove();
            }
        },

        downloadDatabase() {
            this.isLoading = true;

            axios({
                method: 'get',
                url: this.$apiUrl + '/database_backup_download',
                responseType: 'blob',  // important: responseType must be 'blob' for file download
            })
                .then((response) => {
                    const blob = new Blob([response.data]);
                    const link = document.createElement('a');
                    link.href = window.URL.createObjectURL(blob);

                    // Extracting the filename from the response headers
                    const contentDisposition = response.headers['content-disposition'];
                    const filenameMatch = contentDisposition && contentDisposition.match(/filename="(.+?)"/);
                    const filename = filenameMatch ? filenameMatch[1] : 'downloaded-database-backup.sql';

                    link.download = filename;
                    link.click();
                    this.showMessage("success", __('database_downloaded_successfully'));
                    this.isLoading = false;
                })
                .catch((error) => {
                    console.error('Error downloading file:', error);
                    // Handle error accordingly
                });
        }


    }
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}

/* Announcement banner, sidebar/#main offsets and sticky header: shared, see custom-egrocer.scss
   ("Announcement ticker & sticky header"). */

/* Swap sidebar logo for the dark-theme variant (Store Setting > Dark Logo) while the admin
   is in dark mode - .logo-dark only renders in the DOM when that setting has a value. */
.logo-dark {
    display: none;
}
body.theme-dark .logo-light {
    display: none;
}
body.theme-dark .logo-dark {
    display: block;
}

</style>

