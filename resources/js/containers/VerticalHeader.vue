<template>
    <header class="figma-header border-bottom">
        <nav class="navbar navbar-expand-lg align-items-center py-0">
            <div class="container-fluid px-4 py-2 d-flex justify-content-between">

                <!-- LEFT SIDE -->
                <div class="d-flex align-items-center gap-3">
                    <a href="javascript:void(0)"
                        class="burger-btn d-flex align-items-center justify-content-center text-decoration-none"
                        style="width: 40px; height: 40px; margin: 0; padding: 0; background: none; border: none; box-shadow: none;">
                        <base-icon name="Button" width="40" height="40" />
                    </a>

                    <button type="button" class="header-cache-btn d-flex align-items-center justify-content-center"
                        @click="popoverShow = true"
                        style="width: 125px; height: 40px; gap: 8px; margin: 0;">
                        <b-spinner v-if="isSystemRefreshing" small></b-spinner>
                        <span v-else>{{ __('Clear Cache') }}</span>
                    </button>
                </div>

                <!-- RIGHT SIDE -->
                <div class="d-flex align-items-center gap-3">

                    <!-- Module Dropdown -->
                    <div class="dropdown me-2" v-if="role === this.$roleSuperAdmin">
                        <div class="module-selector d-flex align-items-center justify-content-between p-2"
                            data-bs-toggle="dropdown" aria-expanded="false"
                            style="cursor:pointer; font-size: 0.85rem;">
                            <div class="d-flex align-items-center">
                                <img :src="(currentModule && currentModule.image_url) || ($baseUrl + '/images/icons/module_default.svg')"
                                    class="me-2" style="width: 20px; height: 20px; object-fit: contain;" />
                                <span class="fw-bold text-dark fs-6 ms-1">{{ currentModuleName }}</span>
                            </div>
                            <i class="bi bi-chevron-down text-dark fw-bold ms-2" style="font-size: 0.8rem;"></i>
                        </div>
                        <ul class="dropdown-menu dropdown-menu-end lang-dropdown-menu shadow border-0 mt-2">
                            <li v-for="mod in modules" :key="mod.id">
                                <a class="dropdown-item d-flex align-items-center gap-2 py-2"
                                    :class="{ 'active': activeModuleId === mod.id }"
                                    href="javascript:void(0)"
                                    @click="selectModule(mod.id)">
                                    <img :src="mod.image_url || ($baseUrl + '/images/icons/module_default.svg')"
                                        class="me-1" style="width: 20px; height: 20px; object-fit: contain;" />
                                    <span class="fw-semibold">{{ mod.name }}</span>
                                </a>
                            </li>
                        </ul>
                    </div>

                    <!-- Language Dropdown -->
                    <div class="dropdown">
                        <div class="lang-selector d-flex align-items-center justify-content-between p-2"
                            data-bs-toggle="dropdown" aria-expanded="false"
                            style="cursor:pointer; font-size: 0.85rem;">
                            <img :src="currentFlag" class="rounded-circle"
                                style="width: 24px; height: 24px; object-fit: cover;" alt="flag">
                            <span class="fw-bold text-dark fs-6 ms-1">{{ currentLanguageName }}</span>
                            <i class="bi bi-chevron-down text-dark fw-bold ms-1" style="font-size: 0.8rem;"></i>
                        </div>
                        <ul class="dropdown-menu dropdown-menu-end lang-dropdown-menu shadow border-0 mt-2">
                            <li v-for="language in languages" :key="language.code">
                                <a class="dropdown-item d-flex align-items-center gap-2 py-2"
                                    :class="{ 'active': lang === language.code }"
                                    href="javascript:void(0)"
                                    @click="selectLanguage(language.code)">
                                    <img :src="getFlagByCode(language.code)" class="rounded-circle"
                                        style="width: 18px; height: 18px; object-fit: cover;" alt="flag">
                                    <span class="fw-semibold">{{ language.name.substring(0, 3) }}</span>
                                </a>
                            </li>
                        </ul>
                    </div>

                    <!-- Theme -->
                    <button class="btn p-0 border-0 d-flex align-items-center justify-content-center"
                        :class="userTheme === 'theme-dark' ? 'text-white' : 'text-dark'" @click="toggleTheme"
                        style="width: 40px; height: 40px;">
                        <svg v-if="userTheme === 'theme-dark'" width="28" height="28" viewBox="8 8 36 36" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <circle cx="26" cy="26" r="9" fill="currentColor" />
                            <path
                                d="M26 13V9M26 43V39M13 26H9M43 26H39M16.8076 16.8076L13.9792 13.9792M38.0208 38.0208L35.1924 35.1924M16.8076 35.1924L13.9792 38.0208M38.0208 13.9792L35.1924 16.8076"
                                stroke="currentColor" stroke-width="3" stroke-linecap="round" />
                        </svg>
                        <base-icon v-else name="Theme Switch" width="24" height="24" style="transform: scale(2.2); flex: none;" useCurrentColor />
                    </button>

                    <!-- Website Link -->
                    <div class="d-flex align-items-center">
                        <a :href="websiteUrl" target="_blank"
                            class="btn p-0 border-0 d-flex align-items-center justify-content-center"
                            :class="userTheme === 'theme-dark' ? 'text-white' : 'text-dark'"
                            style="width: 40px; height: 40px;">
                            <base-icon name="Website" width="24" height="24" style="transform: scale(2.2); flex: none;" useCurrentColor />
                        </a>
                    </div>

                    <!-- 1. Notifications bell -->
                    <li class="nav-item dropdown d-flex align-items-center">
                        <a class="nav-link p-1 position-relative d-flex align-items-center justify-content-center"
                            :class="userTheme === 'theme-dark' ? 'text-white' : 'text-dark'" href="#"
                            data-bs-toggle="dropdown" aria-expanded="false" style="width: 40px; height: 40px;">
                            <base-icon name="Bell" width="24" height="24" useCurrentColor />
                            <span v-if="notifications_unread_count > 0"
                                class="position-absolute translate-middle badge rounded-circle bg-danger p-0 d-flex align-items-center justify-content-center"
                                style="font-size: 0.65rem; min-width: 16px; height: 16px; top: 10px; left: 30px; border: 1.5px solid #fff;">
                                {{ notifications_unread_count }}
                            </span>
                        </a>
                        <ul class="dropdown-menu dropdown-menu-end notification-dropdown shadow border-0 mt-2 p-0"
                            aria-labelledby="dropdownMenuButton" style="width: 400px; max-width: 400px; overflow: hidden; border-radius: 0;">
                            
                            <!-- Header -->
                            <div class="dropdown-header d-flex justify-content-between align-items-center px-4 py-3 border-bottom" style="background: #ffffff; border-radius: 0;">
                                <span class="fw-bold text-dark fs-6">{{ __('notifications') }}</span>
                                <button v-if="notifications_unread_count > 0" class="btn btn-sm btn-link text-primary p-0 font-medium text-decoration-none shadow-none" @click.stop="confirmMarkAllAsRead" style="font-size: 0.8rem;">
                                    <i class="bi bi-check-all me-1"></i>{{ __('read_all_notifications') }}
                                </button>
                            </div>

                            <!-- List -->
                            <div class="notification-list-scroll" style="max-height: 464px; overflow-y: auto;">
                                <li class="notification-item-custom"
                                    v-for="notification of notifications.slice(0, 4)" :key="notification.id"
                                    @click="handleNotificationClick(notification)">
                                    
                                    <div class="d-flex align-items-start w-100" style="gap: 16px;">
                                        <!-- Icon -->
                                        <base-icon name="notification" width="40" height="40" style="flex-shrink: 0;" />
                                        
                                        <!-- Content Column -->
                                        <div class="d-flex flex-column flex-grow-1" style="min-width: 0; gap: 4px;">
                                            <!-- Top: Title and Time -->
                                            <div class="d-flex justify-content-between align-items-center w-100">
                                                <span class="text-truncate notification-title-custom">
                                                    {{ parseNotification(notification).title }}
                                                </span>
                                                <span class="notification-time-custom ms-2">
                                                    {{ changeDateTime(notification.created_at) }}
                                                </span>
                                            </div>
                                            <!-- Bottom: Body Text -->
                                            <p class="notification-body-custom">
                                                {{ parseNotification(notification).body }}
                                            </p>
                                        </div>
                                    </div>
                                </li>
                                <li class="p-4 text-center text-muted" v-if="notifications.length == 0">
                                    {{ __('no_new_notification') }}
                                </li>
                            </div>

                            <!-- Footer See All -->
                            <div class="notification-footer p-0">
                                <a v-if="isSellerRoute" href="javascript:void(0)" @click="$router.push('/seller/notification_panel')"
                                    class="see-all-btn-custom">
                                    <span>{{ __('see_all_notifications') === 'see_all_notifications' ? 'See All Notifications' : __('see_all_notifications') }}</span>
                                    <base-icon name="ArrowRight" width="16" height="16" />
                                </a>
                                <a v-else-if="isDeliveryBoyRoute" href="javascript:void(0)" @click="$router.push('/delivery_boy/notification_panel')"
                                    class="see-all-btn-custom">
                                    <span>{{ __('see_all_notifications') === 'see_all_notifications' ? 'See All Notifications' : __('see_all_notifications') }}</span>
                                    <base-icon name="ArrowRight" width="16" height="16" />
                                </a>
                                <a v-else href="javascript:void(0)" @click="$router.push('/notification_panel')"
                                    class="see-all-btn-custom">
                                    <span>{{ __('see_all_notifications') === 'see_all_notifications' ? 'See All Notifications' : __('see_all_notifications') }}</span>
                                    <base-icon name="ArrowRight" width="16" height="16" />
                                </a>
                            </div>
                        </ul>
                    </li>

                    <div class="vr mx-2 bg-secondary" style="width: 1px; height: 32px; opacity: 0.25;"></div>

                    <!-- USER -->
                    <div class="dropdown">
                        <a href="#" data-bs-toggle="dropdown" aria-expanded="false"
                            class="d-flex align-items-center gap-2 text-decoration-none">
                            <img :src="profile_url" class="rounded-circle shadow-sm" width="40" height="40"
                                style="object-fit: cover;">
                            <div class="d-none d-sm-flex flex-column text-start align-items-start"
                                style="line-height: 1.1;">
                                <div class="fw-bold text-dark fs-6">{{ user.username }}</div>
                                <span class="text-muted text-uppercase fw-bold figma-user-role-text"
                                    style="font-size: 0.65rem; letter-spacing: 0.5px;">{{ role
                                    }}</span>
                            </div>
                            <i class="bi bi-chevron-down text-dark fw-bold ms-1" style="font-size: 0.8rem;"></i>
                        </a>
                        <ul class="dropdown-menu dropdown-menu-end user-dropdown-menu"
                            aria-labelledby="dropdownMenuButton">
                            <li>
                                <h6 class="dropdown-header">{{ __('hello') }}, {{ user.username }}!</h6>
                            </li>

                            <li>
                                <router-link class="dropdown-item" to="/seller/profile" v-if="role == this.$roleSeller">
                                    <i class="icon-mid bi bi-person me-2"></i> {{ __('my_profile') }}
                                </router-link>
                                <router-link class="dropdown-item" to="/delivery_boy/profile"
                                    v-if="role == this.$roleDeliveryBoy">
                                    <i class="icon-mid bi bi-person me-2"></i> {{ __('my_profile') }}
                                </router-link>
                            </li>
                            <li>
                                <router-link class="dropdown-item" to="/settings" v-if="role == this.$roleSuperAdmin">
                                    <i class="icon-mid bi bi-gear me-2"></i> {{ __('settings') }}
                                </router-link>
                                <router-link class="dropdown-item" to="/seller/settings"
                                    v-if="role == this.$roleSeller">
                                    <i class="icon-mid bi bi-gear me-2"></i> {{ __('settings') }}
                                </router-link>
                                <router-link class="dropdown-item" to="/delivery_boy/settings"
                                    v-if="role == this.$roleDeliveryBoy">
                                    <i class="icon-mid bi bi-gear me-2"></i> {{ __('settings') }}
                                </router-link>
                            </li>

                            <!-- Seller Status Toggle -->
                            <li v-if="role == this.$roleSeller">
                                <div class="dropdown-item">
                                    <div class="form-check form-switch fs-6">
                                        <input class="form-check-input me-0" type="checkbox" id="status"
                                            style="cursor: pointer" :true-value="1" :false-value="3"
                                            v-model="sellerStatus" :disabled="sellerStatusLoading"
                                            @change="toggleSellerStatus">
                                        <label v-if="sellerStatus === 1" class="badge bg-success ms-2">
                                            {{ __('active') }}
                                        </label>
                                        <label v-else class="badge bg-danger ms-2">
                                            {{ __('deactive') }}
                                        </label>
                                    </div>
                                </div>
                            </li>
                            <!-- Seller Status Toggle end -->

                            <!-- Delivery Boy Status Toggle -->
                            <li v-if="role == this.$roleDeliveryBoy">
                                <div class="dropdown-item">
                                    <div class="form-check form-switch fs-6">
                                        <input class="form-check-input me-0" type="checkbox" id="status"
                                            style="cursor: pointer" :true-value="1" :false-value="3"
                                            v-model="deliveryBoyStatus" :disabled="deliveryBoyStatusLoading"
                                            @change="toggleDeliveryBoyStatus">
                                        <label v-if="deliveryBoyStatus === 1" class="badge bg-success ms-2">
                                            {{ __('active') }}
                                        </label>
                                        <label v-else class="badge bg-danger ms-2">
                                            {{ __('deactive') }}
                                        </label>
                                    </div>
                                </div>
                            </li>
                            <!-- Delivery Boy Status Toggle end -->

                            <li>
                                <hr class="dropdown-divider">
                            </li>
                            <li>
                                <a class="dropdown-item" @click="logout()">
                                    <i class="icon-mid bi bi-box-arrow-left me-2"></i>{{ __('logout') }}
                                </a>
                            </li>
                        </ul>
                    </div>

                </div>
            </div>
        </nav>
        <b-modal id="cache-confirm-modal" v-model="popoverShow" :title="__('are_you_sure')" hide-footer centered>
            <span>{{ __('cache:clear') }}</span>,
<span>{{ __('config:clear') }}</span>,
<span>{{ __('route:clear') }}</span>,
<span>{{ __('view:clear') }}</span>


            <b-spinner v-if="isSystemRefreshing" small label="Spinning"></b-spinner>

            <hr />
            <div class="d-flex flex-row justify-content-between align-items-center">
                <b-button @click="popoverShow = false" size="sm" variant="outline-danger">{{
                    __('cancel') }}</b-button>
                <b-button @click="clearCache" size="sm" variant="primary" :disabled="isSystemRefreshing">
                    <b-spinner v-if="isSystemRefreshing" small label="Spinning"></b-spinner>
                    {{ __('ok') }}
                </b-button>
            </div>
        </b-modal>
    </header>
</template>

<script>
import Auth from '../Auth.js';
import axios from "axios";
export default {

    data: function () {
        let cachedModules = [];
        try {
            cachedModules = JSON.parse(localStorage.getItem('modules')) || [];
        } catch (e) {
            console.error('Error parsing cached modules', e);
        }
        return {
            websiteUrl: window.websiteUrl,
            lang: window.localStorage.getItem('lang') || window.appLocale || 'en',
            user: Auth.user,
            role: Role,
            profile_url:
                Role === 'Seller' ? Auth.user.seller.logo_url :
                    Role === 'Delivery Boy' ? this.$baseUrl + '/images/admin_logo.png' :
                        this.$baseUrl + '/images/admin_logo.png',
            notifications: [],

            userTheme: "theme-light",
            isToggle: false,

            //seller status
            sellerStatus: null,
            sellerStatusLoading: false,
            deliveryBoyStatus: null,
            deliveryBoyStatusLoading: false,
            remark: '',

            popoverShow: false,
            isSystemRefreshing: false,

            windowHeight: window.innerHeight,
            windowWidth: window.innerWidth,
            languages: [],
            notifications_unread_count: 0,
            modules: cachedModules,
            activeModuleId: Number(localStorage.getItem('active_module_id')) || 1,
        };
    },
    computed: {
        isSellerRoute() {
            // Use this.$route to access the current route
            return this.$route.path.startsWith('/seller/') || this.$route.path === '/seller';
        },
        isDeliveryBoyRoute() {
            return this.$route.path.startsWith('/delivery_boy');
        },
        currentFlag() {
            const flags = {
                'en': 'us',
                'ar': 'sa',
                'hi': 'in',
                'es': 'es',
                'fr': 'fr',
                'de': 'de',
                'it': 'it',
                'ja': 'jp',
                'ko': 'kr',
                'gu': 'in',
                'be': 'by',
                'zh': 'cn',
                'pt': 'pt',
                'ru': 'ru',
                'tr': 'tr',
                'vi': 'vn',
                'th': 'th',
                'id': 'id',
                'ms': 'my',
                'nl': 'nl',
                'pl': 'pl',
                'uk': 'ua',
                'sv': 'se',
                'no': 'no',
                'da': 'dk',
                'fi': 'fi',
                'ro': 'ro',
                'cs': 'cz',
                'hu': 'hu',
                'sk': 'sk',
                'bg': 'bg',
                'hr': 'hr',
                'sr': 'rs',
                'sl': 'si',
                'et': 'ee',
                'lv': 'lv',
                'lt': 'lt',
                'el': 'gr',
                'he': 'il',
                'fa': 'ir',
                'ur': 'pk',
                'bn': 'bd',
                'pa': 'in',
                'ta': 'in',
                'te': 'in',
                'kn': 'in',
                'ml': 'in',
                'mr': 'in',
            };
            const code = flags[(this.lang || 'en').toLowerCase()] || 'us';
            return `https://flagcdn.com/w80/${code}.png`;
        },
        currentLanguageName() {
            const lang = this.languages.find(l => l.code === this.lang);
            return lang ? lang.name.substring(0, 3) : (this.lang || 'en').substring(0, 3);
        },
        currentModule() {
            const activeModuleId = Number(localStorage.getItem('active_module_id')) || 1;
            return this.modules.find(m => m.id === activeModuleId) || null;
        },
        currentModuleName() {
            return this.currentModule ? this.currentModule.name : 'Grocery';
        },
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.onResize);
        window.removeEventListener('DOMContentLoaded', this.onResize);
        this.$eventBus.$off('modulesUpdated');
        this.$eventBus.$off('languagesUpdated');
    },
    mounted: function () {
        // Fetch initial seller status if the user is a seller
        if (this.role === this.$roleSeller)
            this.getSellerStatus();

        // Fetch initial delivery boy status if the user is a delivery boy
        if (this.role === this.$roleDeliveryBoy)
            this.getDeliveryBoyStatus();

        this.$nextTick(() => {
            window.addEventListener('resize', this.onResize);
            window.addEventListener('DOMContentLoaded', this.onResize);
        })

        const initUserTheme = this.getTheme();
        this.setTheme(initUserTheme);

        this.timer = setInterval(() => {
            this.getNotifications();
        }, 40000); // 40 seconds

        this.getLanguage();
        if (this.role === this.$roleSuperAdmin) {
            this.getModules();
        }

        this.$eventBus.$on('modulesUpdated', () => {
            if (this.role === this.$roleSuperAdmin) {
                this.getModules();
            }
        });

        // Keep the header language dropdown in sync with Manage Languages - without this it
        // only ever fetched once on mount, so a newly added/deleted language didn't show up
        // there until a full page reload.
        this.$eventBus.$on('languagesUpdated', () => {
            this.getLanguage();
        });
    },
    created() {
        this.getNotifications();
    },
    watch: {
        'user.delivery_boy.id'(id) {
            if (id && this.role === this.$roleDeliveryBoy) {
                this.getDeliveryBoyStatus();
            }
        }
    },


    methods: {
        //seller status toggle
        getSellerStatus() {
            axios.post(this.$apiUrl + '/seller/get_seller_status', {
                seller_id: this.user.seller.id
            })
                .then(response => {
                    if (response.data && response.data.data) {
                        this.sellerStatus = Number(response.data.data.status);
                    }
                })
                .catch(error => {
                    console.error('Error fetching seller status:', error.response?.data || error);
                });
        },

        //delivery boy status toggle
        getDeliveryBoyStatus() {
            axios.post(this.$apiUrl + '/delivery_boy/get_delivery_boy_status', {
                id: this.user.delivery_boy.id
            })
                .then(response => {
                    if (response.data && response.data.data) {
                        this.deliveryBoyStatus = Number(response.data.data.status);
                    }
                })
                .catch(error => {
                    console.error('Error fetching delivery boy status:', error.response?.data || error);
                });
        },

        // Toggle seller status update
        toggleSellerStatus() {
            if (this.sellerStatusLoading) return;

            const previousStatus = this.sellerStatus === 1 ? 3 : 1;
            this.sellerStatusLoading = true;

            let formData = new FormData();
            formData.append('seller_id', this.user.seller.id);
            formData.append('status', this.sellerStatus);

            axios
                .post(this.$apiUrl + '/sellers/update_status', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                })
                .then((response) => {
                    if (response.data.status === 1) {
                        console.log('Seller status updated:', response.data);
                    } else {
                        console.error('API returned error:', response.data.message);
                        this.sellerStatus = previousStatus;
                    }
                })
                .catch((error) => {
                    console.error('API error:', error.response?.data || error);
                    this.sellerStatus = previousStatus;
                })
                .finally(() => {
                    this.sellerStatusLoading = false;
                });
        },

        // Toggle delivery boy status update
        toggleDeliveryBoyStatus() {
            if (this.deliveryBoyStatusLoading) return;

            const previousStatus = this.deliveryBoyStatus === 1 ? 3 : 1;
            this.deliveryBoyStatusLoading = true;

            let formData = new FormData();
            formData.append('id', this.user.delivery_boy.id);
            formData.append('status', this.deliveryBoyStatus);
            axios
                .post(this.$apiUrl + '/delivery_boys/update-status', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                })
                .then((response) => {
                    if (response.data.status === 1) {
                        console.log('Delivery boy status updated:', response.data);
                    } else {
                        console.error('API returned error:', response.data.message);
                        this.deliveryBoyStatus = previousStatus;
                    }
                })
                .catch((error) => {
                    console.error('API error:', error.response?.data || error);
                    this.deliveryBoyStatus = previousStatus;
                })
                .finally(() => {
                    this.deliveryBoyStatusLoading = false;
                });
        },

        logout() {
            let role_id = Auth.user.role_id;

            // Clear language session on server before logout
            axios.post(this.$apiUrl + '/clear_language_session')
                .then(() => {
                    // Now proceed with logout
                    Auth.logout();
                    setTimeout(() => {
                        if (role_id === 3) {
                            this.$router.push('/seller/login');
                        } else if (role_id === 4) {
                            this.$router.push('/delivery_boy/login');
                        } else {
                            this.$router.push('/login');
                        }
                        window.location.reload();
                    }, 500);
                })
                .catch(() => {
                    // If API call fails, still proceed with logout
                    Auth.logout();
                    setTimeout(() => {
                        if (role_id === 3) {
                            this.$router.push('/seller/login');
                        } else if (role_id === 4) {
                            this.$router.push('/delivery_boy/login');
                        } else {
                            this.$router.push('/login');
                        }
                        window.location.reload();
                    }, 500);
                });
        },
        getFlagByCode(langCode) {
            const flags = {
                'en': 'us',
                'ar': 'sa',
                'hi': 'in',
                'es': 'es',
                'fr': 'fr',
                'de': 'de',
                'it': 'it',
                'ja': 'jp',
                'ko': 'kr',
                'gu': 'in',
                'be': 'by',
                'zh': 'cn',
                'pt': 'pt',
                'ru': 'ru',
                'tr': 'tr',
                'vi': 'vn',
                'th': 'th',
                'id': 'id',
                'ms': 'my',
                'nl': 'nl',
                'pl': 'pl',
                'uk': 'ua',
                'sv': 'se',
                'no': 'no',
                'da': 'dk',
                'fi': 'fi',
                'ro': 'ro',
                'cs': 'cz',
                'hu': 'hu',
                'sk': 'sk',
                'bg': 'bg',
                'hr': 'hr',
                'sr': 'rs',
                'sl': 'si',
                'et': 'ee',
                'lv': 'lv',
                'lt': 'lt',
                'el': 'gr',
                'he': 'il',
                'fa': 'ir',
                'ur': 'pk',
                'bn': 'bd',
                'pa': 'in',
                'ta': 'in',
                'te': 'in',
                'kn': 'in',
                'ml': 'in',
                'mr': 'in',
            };
            const code = flags[(langCode || 'en').toLowerCase()] || 'us';
            return `https://flagcdn.com/w80/${code}.png`;
        },
        selectLanguage(code) {
            this.changeLanguage({ target: { value: code } });
        },
        changeLanguage(event) {
            // Update the selected language based on the change event
            this.lang = event.target.value;
            window.localStorage.setItem('lang', this.lang);
            this.isLoading = true;
            let data = {
                language: this.lang
            };
            axios.post(this.$apiUrl + '/change_language', data)
                .then((response) => {
                    this.isLoading = false;
                    // Apply RTL based on language type from API (any language can be RTL)
                    this.applyRtlForLanguage(this.lang);
                    // Update the default language in local state
                    this.updateDefaultLanguage(this.lang);

                    window.localStorage.removeItem('language');

                    const currentUrl = window.location.href.split('?')[0].split('#')[0];
                    const cacheBuster = '_t=' + Date.now();
                    window.location.href = currentUrl + '?' + cacheBuster;
                });
        },
        updateDefaultLanguage(newDefaultLanguage) {
            // Update the default language in the languages array
            this.languages.forEach(language => {
                if (language.code === newDefaultLanguage) {
                    language.is_default = 1;
                } else {
                    language.is_default = 0;
                }
            });
        },
        getLanguage() {
            this.isLoading = true;
            let data = {
                params: {
                    system_type: 4
                }
            };
            axios.get(this.$apiUrl + '/system_languages', data)
                .then((response) => {
                    this.isLoading = false;
                    let data = response.data;
                    if (data && Array.isArray(data.data)) {
                        this.languages = data.data;
                        this.totalRows = this.languages.length;
                    } else {
                        this.languages = [];
                        this.totalRows = 0;
                    }
                    // Apply RTL based on language type from API (any language can be RTL)
                    this.applyRtlForLanguage(window.localStorage.getItem('lang') || this.lang);
                })
                .catch((error) => {
                    this.isLoading = false;
                    console.error('Error fetching languages:', error);
                });
        },
        getModules() {
            axios.get(this.$apiUrl + '/modules')
                .then(response => {
                    if (response.data && response.data.data) {
                        this.modules = response.data.data;
                        localStorage.setItem('modules', JSON.stringify(response.data.data));
                    }
                })
                .catch(error => {
                    console.error('Error fetching modules:', error);
                });
        },
        selectModule(moduleId) {
            localStorage.setItem('active_module_id', moduleId);
            window.axios.defaults.headers.common['X-Module-Id'] = moduleId;
            window.location.reload();
        },
        /**
         * Apply or remove RTL class on body based on language type from API.
         * Uses language.type from supported_languages (rtl/ltr) - not hardcoded to any specific language.
         */
        applyRtlForLanguage(langCode) {
            const lang = this.languages.find(l => (l.code || '').toLowerCase() === (langCode || '').toLowerCase());
            const isRtl = lang && String(lang.type || '').toLowerCase() === 'rtl';
            if (isRtl) {
                document.body.classList.add('rtl');
            } else {
                document.body.classList.remove('rtl');
            }
        },
        getNotifications(event) {
            axios.get(this.$apiUrl + '/get_top_notifications')
                .then((response) => {
                    this.notifications = response.data.data.notifications;
                    this.notifications_unread_count = response.data.data.unread;
                });
        },
        markAsReadNotification(notification) {
            if (notification.read_at == null) {
                axios.get(this.$apiUrl + '/notification_read?id=' + notification.id)
                    .then((response) => {
                        this.getNotifications();
                    });
            }
        },
        confirmMarkAllAsRead() {
            // Show SweetAlert confirmation dialog before marking all notifications as read
            this.$swal.fire({
                title: __('are_you_sure'),
                text: __('do_you_want_to_mark_all_notifications_as_read'),
                icon: 'question',
                showCancelButton: true,
                confirmButtonText: __('yes_sure'),
                cancelButtonText: __('cancel'),
                confirmButtonColor: '#37a279',
                cancelButtonColor: '#d33',
            }).then((result) => {
                // If user confirms, proceed to mark all as read
                if (result.value) {
                    this.markAllAsRead();
                }
            });
        },
        markAllAsRead() {
            // Mark all notifications as read by calling the API without id parameter
            axios.get(this.$apiUrl + '/notification_read')
                .then((response) => {
                    // Refresh notifications to update the UI
                    this.getNotifications();
                    // Show success message
                    this.showMessage("success", response.data.message || "All notifications marked as read");
                })
                .catch((error) => {
                    // Show error message if something goes wrong
                    this.showError("Failed to mark all notifications as read");
                });
        },
        changeDateTime(dateTime) {
                return moment(dateTime).fromNow();
        },
        setTheme(theme) {
            sessionStorage.setItem("user-theme", theme);
            this.userTheme = theme;
            // Only swap theme classes so RTL class is preserved (sidebar stays on correct side in RTL + dark mode).
            document.body.classList.remove('theme-light', 'theme-dark');
            document.body.classList.add(theme);
        },

        getMediaPreference() {
            const hasDarkPreference = window.matchMedia(
                "(prefers-color-scheme: dark)"
            ).matches;
            if (hasDarkPreference) {
                return "theme-dark";
            } else {
                return "theme-light";
            }
        },

        getTheme() {
            let user_theme = sessionStorage.getItem("user-theme");
            this.userTheme = user_theme;
            return user_theme;
        },
        toggleTheme() {
            const activeTheme = sessionStorage.getItem("user-theme");
            if (activeTheme === "theme-light" || activeTheme == "" || activeTheme == "undefined" || activeTheme == "null") {
                this.setTheme("theme-dark");
            } else {
                this.setTheme("theme-light");
            }
        },
        onResize() {
            this.windowHeight = window.innerHeight;
            this.windowWidth = window.innerWidth
        },

        clearCache() {

            let vm = this;

            vm.isSystemRefreshing = true;
            axios.get(this.$baseUrl + '/clear')
                .then((response) => {
                    let data = response.data;
                    if (data.status === 1) {

                        setTimeout(() => {
                            vm.showMessage("success", data.message);
                            vm.isSystemRefreshing = false;
                            vm.popoverShow = false;
                            window.location.reload();

                        }, 2000);

                    } else {
                        vm.showError(data.message);
                        vm.isSystemRefreshing = false;
                    }
                }).catch(error => {
                    vm.isSystemRefreshing = false;
                    if (error?.request?.statusText) {
                        vm.showError(error.request.statusText);
                    } else if (error.message) {
                        vm.showError(error.message);
                    } else {
                        vm.showError(__('something_went_wrong'));
                    }
                });
        },

        handleNotificationClick(notification) {
            this.markAsReadNotification(notification);

            const orderId = notification.data.order_id;

            if (this.isSellerRoute) {
                this.$router.push('/seller/orders/view/' + orderId);
            } else if (this.isDeliveryBoyRoute) {
                this.$router.push('/delivery_boy/orders/view/' + orderId);
            } else {
                axios.get(this.$apiUrl + '/orders/view/' + orderId)
                    .then((response) => {
                        const order = response.data.data.order;
                        if (order) {
                            if (order.order_type === 'selfpickup') {
                                this.$router.push('/self_pickup_orders/view/' + orderId);
                            } else {
                                this.$router.push('/orders/view/' + orderId);
                            }
                        } else {
                            this.$router.push('/orders/view/' + orderId);
                        }
                    })
                    .catch((error) => {
                        this.$router.push('/orders/view/' + orderId);
                    });
            }
        },
        parseNotification(notification) {
            const text = notification.data.text || '';
            let title = 'Notification';
            let body = text;

            const type = notification.data.type || '';
            const lowerText = text.toLowerCase();

            // Body always comes from the real server-computed text - never fabricate customer/store/total data.
            if (type === 'return_request_new' || type === 'return_request_sent' || type === 'return_request_status' || lowerText.includes('return')) {
                title = 'Return Request Received';
            } else if (lowerText.includes('cancel')) {
                title = 'Order Cancelled';
            } else if (lowerText.includes('receive') || lowerText.includes('place') || lowerText.includes('new order')) {
                title = 'New Order Placed';
            } else if (lowerText.includes('assign')) {
                title = 'Order Assigned';
            } else if (lowerText.includes('picked') || lowerText.includes('pickup')) {
                title = 'Order Out for Pickup';
            } else if (lowerText.includes('deliver')) {
                title = 'Order Delivered';
            } else {
                title = 'Order Status Update';
            }

            return {
                title,
                body
            };
        }
    }
}
</script>
<style scoped>
/* .navbar {
    background: transparent;
    padding: 0.75rem 1rem;
} */
/* 
.figma-header {
    background: #fff;
    position: sticky;
    top: 0;
    z-index: 1020;
    border-bottom: 1px solid #F1F5F9;
} */
.figma-header {
    background: #fff;
    box-shadow: none !important;
    /* remove these */
    /* position: sticky; */
    /* top: 0; */
    /* z-index: 1020; */
}

.navbar {
    background: transparent;
    min-height: 70px;
}

.container-fluid {
    padding-left: 20px;
    padding-right: 20px;
}


.website-link {
    background: #F8FAFC;
    border-radius: 6px;
    font-size: 0.8rem;
    color: #475569;
    text-decoration: none;
    transition: all 0.2s ease;
}

.website-link:hover {
    background: #E2E8F0;
    color: #10B981;
}

/* Sidebar Toggle Button */
.burger-btn {
    background: #fff;
    border: 1px solid #E2E8F0;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
    padding: 8px 10px;
    border-radius: 8px;
    text-decoration: none;
    transition: all 0.2s ease;
}

.burger-btn:hover {
    background: #F8FAFC;
    transform: translateY(-1px);
}

/* Clear Cache Button - Light Green Style */
.header-cache-btn {
    background: color-mix(in srgb, var(--figma-primary) 12%, white) !important;
    color: var(--figma-primary) !important;
    border: none !important;
    padding: 8px 16px !important;
    border-radius: 8px !important;
    font-weight: 600 !important;
    font-size: 0.85rem !important;
    transition: all 0.2s ease !important;
    box-shadow: none !important;
}

.header-cache-btn:hover {
    background: color-mix(in srgb, var(--figma-primary) 20%, white) !important;
}

/* Language Selector */
.lang-selector {
    background: #ffffff;
    border: 1px solid #EDEDED;
    border-radius: 20px;
    height: 40px;
    width: 97px;
    transition: all 0.2s ease;
}

.lang-selector:hover {
    background: #F8FAFC;
}

.lang-selector select:focus {
    outline: none !important;
    box-shadow: none !important;
    border: none !important;
}

/* Custom Language Dropdown Menu */
.lang-dropdown-menu {
    min-width: 110px !important;
    padding: 6px !important;
    border-radius: 12px !important;
    border: 1px solid #EDEDED !important;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.02) !important;
}
.lang-dropdown-menu .dropdown-item {
    border-radius: 8px !important;
    padding: 6px 12px !important;
    color: #475569 !important;
    font-size: 0.85rem !important;
    transition: all 0.2s ease !important;
}
.lang-dropdown-menu .dropdown-item:hover,
.lang-dropdown-menu .dropdown-item.active {
    background-color: #F1F5F9 !important;
    color: #10B981 !important;
}
body.theme-dark .lang-dropdown-menu {
    background-color: #1b1b29 !important;
    border-color: #2d2d44 !important;
}
body.theme-dark .lang-dropdown-menu .dropdown-item {
    color: #cbd5e1 !important;
}
body.theme-dark .lang-dropdown-menu .dropdown-item:hover,
body.theme-dark .lang-dropdown-menu .dropdown-item.active {
    background-color: #2d2d44 !important;
    color: #34d399 !important;
}

/* Icons styling */
.nav-link i,
.btn i {
    transition: color 0.2s ease;
}

.nav-link:hover i,
.btn:hover i {
    color: #10B981 !important;
}

/* User Menu */
.user-dropdown-link {
    text-decoration: none;
    padding: 2px;
    border-radius: 12px;
    transition: background 0.2s ease;
}

.user-dropdown-link:hover {
    background: #F8FAFC;
}

.avatar-md img {
    width: 38px;
    height: 38px;
    object-fit: cover;
    border: 2px solid #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* Dropdown styling */
.dropdown-menu {
    border-radius: 12px;
    padding: 0.5rem;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05) !important;
}

.dropdown-item {
    border-radius: 8px;
    padding: 0.6rem 1rem;
    font-weight: 500;
    color: #475569;
}

.dropdown-item:hover {
    background-color: #F8FAFC;
    color: #10B981;
}

.dropdown-header {
    font-weight: 600;
    color: #1E293B;
    padding: 0.5rem 1rem;
}

/* Utility */
.font-bold {
    font-weight: 700;
}

.font-medium {
    font-weight: 500;
}

.text-gray-400 {
    color: #94A3B8;
}

.text-gray-600 {
    color: #475569;
}

.text-gray-800 {
    color: #1E293B;
}

.text-xs {
    font-size: 0.75rem;
}

/* Responsive adjustments */
@media (max-width: 991px) {
    .navbar-collapse {
        background: #fff;
        border-radius: 12px;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        padding: 1rem;
        margin-top: 1rem;
    }
}


.text-wrap-custom {
    word-break: break-word !important;
    overflow-wrap: break-word !important;
    white-space: normal !important;
}
</style>

<style>
/* Unscoped high-fidelity overrides for Notifications Popover */
.notification-dropdown {
    width: 400px !important;
    max-width: 400px !important;
    padding: 0 !important;
    border-radius: 0 !important;
    overflow: hidden !important;
}

.notification-item-custom {
    display: flex !important;
    flex-direction: column !important;
    width: 100% !important;
    min-height: 116px !important;
    padding: 16px !important;
    gap: 0 !important;
    border-bottom: 1px solid #EDEDED !important;
    background: #ffffff !important;
    cursor: pointer !important;
    transition: background-color 0.2s ease !important;
    white-space: normal !important;
    text-decoration: none !important;
    list-style: none !important;
    text-align: left !important;
}

.notification-item-custom:hover {
    background-color: #F8FAFC !important;
}

.notification-title-custom {
    font-weight: 600 !important;
    font-size: 16px !important;
    line-height: 1.5 !important;
    letter-spacing: 0 !important;
    color: var(--Colors-Shades-Neutral-N---950, #000000) !important;
    text-align: left !important;
}

.notification-time-custom {
    font-family: inherit !important;
    font-weight: 400 !important;
    font-size: 14px !important;
    line-height: 1.25 !important;
    letter-spacing: 0 !important;
    text-align: right !important;
    color: var(--Colors-Shades-Neutral-N---800, #333333) !important;
    flex-shrink: 0 !important;
}

.notification-body-custom {
    font-family: inherit !important;
    font-weight: 400 !important;
    font-size: 14px !important;
    line-height: 1.4 !important;
    color: var(--Colors-Shades-Neutral-N---600, #666666) !important;
    padding-left: 0 !important;
    margin-top: 4px !important;
    margin-bottom: 0 !important;
    text-align: left !important;
    word-break: break-word !important;
    overflow-wrap: break-word !important;
    white-space: normal !important;
    display: block !important;
    width: 100% !important;
}

body.theme-dark .notification-dropdown,
body.theme-dark .dropdown-header {
    background-color: #1b1b29 !important;
    border-color: #2d2d44 !important;
}

body.theme-dark .notification-item-custom {
    background: #1b1b29 !important;
    border-color: #2d2d44 !important;
    text-align: left !important;
}

body.theme-dark .notification-item-custom:hover {
    background-color: #2d2d44 !important;
}

body.theme-dark .notification-item-custom .text-dark {
    color: #ffffff !important;
}

body.theme-dark .notification-item-custom .text-muted {
    color: #94A3B8 !important;
}

body.theme-dark .notification-title-custom {
    color: #ffffff !important;
    text-align: left !important;
}

body.theme-dark .notification-time-custom {
    color: #94A3B8 !important;
}

body.theme-dark .notification-body-custom {
    color: #94A3B8 !important;
    text-align: left !important;
}

.see-all-btn-custom {
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    width: 400px !important;
    height: 40px !important;
    padding: 8px 16px !important;
    gap: 8px !important;
    border-radius: 0 !important;
    background: var(--Colors-Shades-Neutral-N---950, #000000) !important;
    color: #ffffff !important;
    font-weight: 600 !important;
    font-size: 0.9rem !important;
    border: none !important;
    text-decoration: none !important;
    transition: background-color 0.2s ease !important;
}

.see-all-btn-custom:hover {
    background-color: #1E293B !important;
    color: #ffffff !important;
}

body.theme-dark .see-all-btn-custom {
    background-color: #11111d !important;
    color: #ffffff !important;
}

body.theme-dark .see-all-btn-custom:hover {
    background-color: #2d2d44 !important;
}

/* Module Selector Styling */
.module-selector {
    background: #f3f4f6;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    height: 40px;
    min-width: 145px !important;
    transition: all 0.2s ease;
}
.module-selector:hover {
    background: #e5e7eb;
}
body.theme-dark .module-selector {
    background: #232334;
    border-color: #3b3b4f;
}
body.theme-dark .module-selector:hover {
    background: #2d2d44;
}
</style>
