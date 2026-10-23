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
                    <div class="d-flex justify-content-between">
                        <div class="logo">
                            <router-link to="/seller"
                                style="display: flex; align-items: center; justify-content: flex-start;">
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
                        <a href="javascript:void(0)" class="sidebar-hide"><i
                                class="bi bi-x bi-middle"></i></a>
                    </div>
                </div>
                <div class="sidebar-menu">
                    <ul class="menu">

                        <template v-for="item in visibleSidebarItems">

                            <li class="sidebar-item"
                                :class="{ 'active': isActive(item.url) || subIsActive(item), 'has-sub': isHasSub(item) }"
                                v-if="item.role == true ? ($role('Super Admin') && (item.name == 'Role' || item.name == 'System Users')) : (item.permission || $can(item.permission))">

                                <template v-if="isHasSub(item)">
                                    <a class="sidebar-link">
                                        <i :class="`fa fa-${item.icon}`"></i>
                                        <span>{{ item.name }}</span>
                                    </a>
                                    <ul class="submenu" :class="{ 'active': subIsActive(item) }">
                                        <template v-for="sub in item.submenu">
                                            <li class="submenu-item" :class="{ 'active': isActive(sub.url) }"
                                                :key="sub.key">
                                                <router-link :to="sub.url" @click.native="closeSideBarMenu()">
                                                    {{ sub.name }}
                                                </router-link>
                                            </li>
                                        </template>
                                    </ul>
                                </template>
                                <template v-else>
                                    <router-link class="sidebar-link" :to="item.url" @click.native="closeSideBarMenu()">
                                        <i :class="`fa fa-${item.icon}`"></i>
                                        <span>{{ item.name }}</span>
                                    </router-link>
                                </template>
                            </li>
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

        <!-- Blocked Status Modal -->
        <b-modal id="seller-blocked-modal" title="Account Blocked" :no-close-on-backdrop="true" :no-close-on-esc="true"
            :hide-header-close="true" centered @ok="handleBlockedLogout">
            <div class="text-center">
                <i class="fa fa-ban" style="font-size: 48px;"></i>
                <h5 class="mt-3">You are blocked by admin</h5>
                <h6>Reason: {{ remark }}</h6>
                <p class="text-muted">Your account has been blocked by admin. Please contact admin to unblock your
                    account.</p>
            </div>
            <template #modal-footer="{ ok }">
                <b-button variant="primary" @click="ok()">
                    OK
                </b-button>
            </template>
        </b-modal>
    </div>
</template>

<script>
import TheSidebar from './TheSidebar'

import TheFooter from './TheFooter'
import VerticalHeader from './VerticalHeader'
import Auth from "../Auth";
import axios from "axios";

export default {
    name: 'TheContainerSeller',
    components: {
        TheSidebar,

        TheFooter,
        VerticalHeader
    },
    created() {
        // this.updateCurrency(window.localStorage.getItem('currency'));
        this.checkPermissions();
        this.checkSellerStatus();
    },
    watch: {
        '$route': 'checkPermissions'
    },
    mounted() {
        this.observeBannerHeight();
        //lang
        if (window.localStorage.getItem('lang')) {
            this.lang = window.localStorage.getItem('lang');
        }

        // Start periodic status check every 30 seconds
        this.statusCheckInterval = setInterval(() => {
            this.checkSellerStatus();
        }, 30000);

        function slideToggle(t, e, o) { 0 === t.clientHeight ? j(t, e, o, !0) : j(t, e, o) } function slideUp(t, e, o) { j(t, e, o) } function slideDown(t, e, o) { j(t, e, o, !0) } function j(t, e, o, i) { void 0 === e && (e = 400), void 0 === i && (i = !1), t.style.overflow = "hidden", i && (t.style.display = "block"); var p, l = window.getComputedStyle(t), n = parseFloat(l.getPropertyValue("height")), a = parseFloat(l.getPropertyValue("padding-top")), s = parseFloat(l.getPropertyValue("padding-bottom")), r = parseFloat(l.getPropertyValue("margin-top")), d = parseFloat(l.getPropertyValue("margin-bottom")), g = n / e, y = a / e, m = s / e, u = r / e, h = d / e; window.requestAnimationFrame(function l(x) { void 0 === p && (p = x); var f = x - p; i ? (t.style.height = g * f + "px", t.style.paddingTop = y * f + "px", t.style.paddingBottom = m * f + "px", t.style.marginTop = u * f + "px", t.style.marginBottom = h * f + "px") : (t.style.height = n - g * f + "px", t.style.paddingTop = a - y * f + "px", t.style.paddingBottom = s - m * f + "px", t.style.marginTop = r - u * f + "px", t.style.marginBottom = d - h * f + "px"), f >= e ? (t.style.height = "", t.style.paddingTop = "", t.style.paddingBottom = "", t.style.marginTop = "", t.style.marginBottom = "", t.style.overflow = "", i || (t.style.display = "none"), "function" == typeof o && o()) : window.requestAnimationFrame(l) }) }
        let sidebarItems = document.querySelectorAll('.sidebar-item.has-sub');
        for (var i = 0; i < sidebarItems.length; i++) {
            let sidebarItem = sidebarItems[i];
            sidebarItems[i].querySelector('.sidebar-link').addEventListener('click', function (e) {
                e.preventDefault();

                let submenu = sidebarItem.querySelector('.submenu');
                if (submenu?.classList?.contains('active')) submenu.style.display = "block"
                if (submenu.style.display == "none") submenu?.classList?.add('active')
                else submenu?.classList?.remove('active')
                slideToggle(submenu, 300)
            })
        }
        if (window.innerWidth < 1200) {
            document.getElementById('sidebar')?.classList?.remove('active');
        }
        // Update backdrop when sidebar opens/closes on small screens - click outside to close
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
        this.scrollSidebarToActive()
    },
    beforeDestroy() {
        if (this.bannerObserver) this.bannerObserver.disconnect();
        // Clear the status check interval when component is destroyed
        if (this.statusCheckInterval) {
            clearInterval(this.statusCheckInterval);
        }
    },
    data: function () {
        return {
            lang: 'en',
            statusCheckInterval: null,
            remark: '',
            sidebarItems: [
                {
                    name: __('dashboard'),
                    icon: 'tachometer-alt',
                    url: '/seller',
                    permission: 'manage_dashboard'
                },
                {
                    name: __('orders'),
                    icon: 'shopping-cart',
                    url: '/seller/orders',
                    permission: 'order_list'
                },
                {
                    name: __('self_pickup_orders'),
                    icon: 'box-open',
                    url: '/seller/self_pickup_orders',
                    permission: 'self_pickup_order_list'
                },
                {
                    name: 'Delivery Boy Requests',
                    icon: 'user-plus',
                    url: '/seller/delivery_boy_requests',
                    permission: 'order_list'
                },
                {
                    name: 'My Delivery Boys',
                    icon: 'motorcycle',
                    url: '/seller/my_delivery_fleet',
                    permission: 'order_list'
                },
                {
                    name: 'Delivery Boy Salary',
                    icon: 'file-invoice-dollar',
                    url: '/seller/delivery_boy_salary',
                    permission: 'order_list'
                },
                {
                    name: __('categories'),
                    icon: 'bullseye',
                    url: '/seller/categories',
                    permission: 'category_list',
                },
                {
                    name: __('products'),
                    icon: 'cube',
                    permission: 'product_list',
                    submenu: [
                        {
                            name: __('add_product'),
                            icon: 'grid-fill',
                            url: '/seller/manage_products/create',
                        },
                        {
                            name: __('manage_products'),
                            icon: 'grid-fill',
                            url: '/seller/manage_products'
                        },
                        {
                            name: __('media'),
                            icon: 'grid-fill',
                            url: '/seller/media'
                        },
                        {
                            name: __('bulk_upload'),
                            icon: 'grid-fill',
                            url: '/seller/bulk_upload'
                        },
                        {
                            name: __('bulk_update'),
                            icon: 'grid-fill',
                            url: '/seller/bulk_update',
                        },
                        {
                            name: __('taxes'),
                            icon: 'grid-fill',
                            url: '/seller/taxes'
                        },
                        {
                            name: __('brands'),
                            icon: 'grid-fill',
                            url: '/seller/brands'
                        },
                        {
                            name: __('addons'),
                            icon: 'grid-fill',
                            url: '/seller/addons'
                        },
                        {
                            name: __('attributes'),
                            icon: 'grid-fill',
                            url: '/seller/attributes'
                        },
                    ]
                },
                {
                    name: __('custom_fields'),
                    icon: 'list-alt',
                    url: '/seller/custom_fields',
                    permission: 'product_list',
                },
                {
                    name: __('stock_management'),
                    icon: 'cubes',
                    url: '/seller/manage_stock',
                    permission: 'product_list',
                },
                {
                    name: __('abandoned_carts'),
                    icon: 'shopping-cart',
                    url: '/seller/carts',
                    permission: 'order_list',
                },
                {
                    name: __('return_requests'),
                    icon: 'retweet',
                    url: '/seller/return_requests',
                    permission: 'return_request_list',
                },
                {
                    name: __('point_of_sale'),
                    icon: 'calculator',
                    url: '/seller/point_of_sale',
                    permission: 'product_list',
                },
                {
                    name: __('withdrawal_requests'),
                    icon: 'credit-card',
                    url: '/seller/withdrawal_requests',
                    permission: 'product_sales_reports',
                },
                {
                    name: __('wallet_transactions'),
                    icon: 'wallet',
                    url: '/seller/seller_wallet_transactions',
                    permission: 'product_sales_reports',
                },
                {
                    name: __('reports'),
                    icon: 'folder-open',
                    permission: 'product_sales_reports',
                    submenu: [
                        {
                            name: __('product_sales_report'),
                            icon: 'grid-fill',
                            url: '/seller/product_sales_reports',
                            permission: 'product_sales_reports',
                        },
                        {
                            name: __('sales_reports'),
                            icon: 'grid-fill',
                            url: '/seller/sales_reports',
                            permission: 'sales_reports',
                        },
                        {
                            name: __('pos_reports'),
                            icon: 'grid-fill',
                            url: '/seller/pos_reports',
                            permission: 'product_sales_reports',
                        }
                    ]
                },
                {
                    name: __('settings'),
                    icon: 'cog',
                    url: '/seller/setting',
                    permission: 'order_list',
                },
            ]
        }
    },
    computed: {
        announcementText() {
            return __('global_attributes_deprecation_notice') || 'Global attributes and custom fields-product are being deprecated in an upcoming update. Sellers will need to create their own attributes and custom fields-product - please replace any global attribute and custom fields-product currently used on your products.';
        },
        visibleSidebarItems() {
            // Addons only makes sense for the Food Delivery module - a seller's module is fixed
            // at seller_id creation (Auth.js seeds active_module_id from user.seller.module_id
            // at login), so this is a stable per-seller check, not a switchable one like admin.
            const activeModuleId = Number(localStorage.getItem('active_module_id')) || 1;
            if (activeModuleId === 4) {
                return this.sidebarItems;
            }
            return this.sidebarItems.map(item => {
                if (item.submenu) {
                    return { ...item, submenu: item.submenu.filter(s => s.url !== '/seller/addons') };
                }
                return item;
            });
        },
    },
    methods: {
        // Phones / tablets: tapping a final menu item closes the slide-in sidebar.
        closeSideBarMenu() {
            if (window.innerWidth < 1200) {
                document.getElementById('sidebar')?.classList?.remove('active');
                const backdrop = document.querySelector('.sidebar-backdrop');
                if (backdrop) backdrop.remove();
            }
        },
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
        subIsActive(item) {
            const paths = Array.isArray(item.submenu) ? item.submenu : [];
            return paths.some(path => {
                return this.$route.path.indexOf(path.url) === 0;
            });
        },
        isActive(url) {
            // The dashboard menu item links to the panel root, which redirects to its dashboard route.
            if (this.$route.path == url || (url === '/seller' && this.$route.path === '/seller/dashboard')) {
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
        changeLanguage(event) {
            this.lang = event.target.value;
            window.localStorage.setItem('lang', this.lang);
            this.isLoading = true
            let data = {
                language: this.lang
            }
            axios.post(this.$apiUrl + '/change_language', data)
                .then((response) => {
                    this.isLoading = false;
                    window.location.reload();
                });
        },
        checkPermissions() {
            var current_path = this.$route.path;
            var permission = '';


            this.sidebarItems.forEach(menu => {
                //Only Main Categories
                if (menu.submenu && menu.submenu.length > 0) {

                    menu.submenu.forEach(submenu => {
                        if (submenu.url == current_path) {
                            permission = submenu.permission;
                        }
                    });

                } else {

                    if (menu.url == current_path) {
                        permission = menu.permission;
                    }
                }
            });


            if (Auth.check() && UserPermissions.length == 0) {
                //this.$router.push({path:'/login'});
                if (window.localStorage.getItem('loginCheck') == 1) {
                    Auth.logout();
                }
                window.localStorage.setItem('loginCheck', 1);
                window.location.reload();
            } else if (Auth.check() && permission && !this.$can(permission)) {
                this.$router.push({ path: '/unauthorized' });
            }

        },
        checkSellerStatus() {
            // Check if seller is blocked
            axios.post(this.$sellerApiUrl + '/get_seller_status')
                .then((response) => {
                    if (response.data.status === 1) {
                        const sellerStatus = response.data.data.status;
                        // Status 4 means blocked
                        if (sellerStatus === 4) {
                            this.remark = response.data.data.remark;
                            this.$bvModal.show('seller-blocked-modal');
                            // Clear the interval to stop further checks
                            if (this.statusCheckInterval) {
                                clearInterval(this.statusCheckInterval);
                            }
                        }
                    }
                })
                .catch((error) => {
                    // Silently fail - don't show errors for background checks
                    console.error('Status check error:', error);
                });
        },
        handleBlockedLogout() {
            // Logout the seller
            Auth.logout();
            // Redirect to login page
            this.$router.push({ path: '/seller/login' });
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
