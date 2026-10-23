<template>
    <header class="figma-header border-bottom">
        <nav class="navbar navbar-expand-lg align-items-center py-0">
            <div class="container-fluid px-4 py-2 d-flex justify-content-between flex-nowrap">

                <!-- LEFT SIDE -->
                <div class="d-flex align-items-center gap-2">
                    <a href="javascript:void(0)"
                        class="burger-btn header-icon-btn d-flex align-items-center justify-content-center text-decoration-none"
                        role="button"
                        aria-label="Toggle sidebar">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3.5 5.5H16.5M3.5 10H16.5M3.5 14.5H16.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                        </svg>
                    </a>

                    <button type="button" class="header-cache-btn d-flex align-items-center justify-content-center"
                        @click="popoverShow = true">
                        <b-spinner v-if="isSystemRefreshing" small></b-spinner>
                        <template v-else>
                            <i class="bi bi-arrow-repeat fs-6 me-1"></i>
                            <span>{{ __('Clear Cache') }}</span>
                        </template>
                    </button>

                    <!-- Quick search (command palette): also Ctrl+K / Cmd+K anywhere -->
                    <button type="button" class="header-cache-btn header-search-btn d-flex align-items-center"
                        @click="$root.$emit('open-command-palette')" :aria-label="__('search')">
                        <i class="bi bi-search"></i>
                        <span>{{ __('search') }}</span>
                        <kbd class="header-search-kbd">{{ isMac ? '⌘K' : 'Ctrl K' }}</kbd>
                    </button>
                </div>

                <!-- RIGHT SIDE -->
                <div class="d-flex align-items-center gap-2 header-right">

                    <!-- Module Dropdown -->
                    <div class="dropdown header-module" v-if="role !== this.$roleSeller && role !== this.$roleDeliveryBoy">
                        <div class="module-selector d-flex align-items-center justify-content-between"
                            data-bs-toggle="dropdown" aria-expanded="false" role="button">
                            <div class="d-flex align-items-center text-truncate">
                                <module-icon :src="(currentModule && currentModule.image_url) || ($baseUrl + '/images/icons/module_default.svg')"
                                    class="module-icon me-2" :size="22" :alt="currentModuleName"></module-icon>
                                <span class="module-name text-truncate">{{ currentModuleName }}</span>
                            </div>
                            <i class="bi bi-chevron-down module-chevron ms-2"></i>
                        </div>
                        <ul class="dropdown-menu dropdown-menu-end lang-dropdown-menu shadow border mt-2">
                            <li v-for="mod in modules" :key="mod.id">
                                <a class="dropdown-item d-flex align-items-center gap-2 py-2"
                                    :class="{ 'active': currentModule && currentModule.id === mod.id }"
                                    href="javascript:void(0)"
                                    @click="selectModule(mod.id)">
                                    <module-icon :src="mod.image_url || ($baseUrl + '/images/icons/module_default.svg')"
                                        class="me-1" :size="20" :alt="mod.name"></module-icon>
                                    <span class="fw-semibold">{{ mod.name }}</span>
                                </a>
                            </li>
                        </ul>
                    </div>

                    <!-- Theme -->
                    <button class="header-icon-btn d-none d-sm-inline-flex theme-toggle-btn"
                        :class="[themeIconSpinning ? 'theme-toggle-btn--spin' : '']"
                        @click="toggleTheme" title="Toggle theme" type="button">
                        <i v-if="userTheme === 'theme-dark'" class="bi bi-sun fs-5"></i>
                        <i v-else class="bi bi-moon fs-5"></i>
                    </button>

                    <!-- Website Link (phones: moved into the avatar menu) -->
                    <div class="d-none d-sm-flex align-items-center">
                        <a :href="websiteUrl" target="_blank"
                            class="header-icon-btn"
                            title="Visit Website">
                            <i class="bi bi-globe fs-5"></i>
                        </a>
                    </div>

                    <!-- Auto-assign delivery boy feature disabled - active order offers button:
                    <div v-if="role == this.$roleDeliveryBoy && liveOffers.length > 0"
                        class="d-flex align-items-center">
                        <a class="header-icon-btn position-relative" href="#" title="Active order offers"
                            @click.prevent="offerPopupOpen = true">
                            <i class="bi bi-bag-check fs-5"></i>
                            <span class="header-badge-count">{{ liveOffers.length > 9 ? '9+' : liveOffers.length }}</span>
                        </a>
                    </div>
                    -->

                    <!-- 1. Notifications bell -->
                    <div class="dropdown header-notification d-flex align-items-center">
                        <a class="header-icon-btn position-relative"
                            href="#"
                            data-bs-toggle="dropdown" aria-expanded="false" title="Notifications">
                            <i class="bi bi-bell fs-5"></i>
                            <span v-if="notifications_unread_count > 0"
                                class="header-badge-count">
                                {{ notifications_unread_count > 9 ? '9+' : notifications_unread_count }}
                            </span>
                        </a>
                        <ul class="dropdown-menu dropdown-menu-end notification-dropdown ntf-popup mt-2 p-0"
                            aria-labelledby="dropdownMenuButton">

                            <!-- Header -->
                            <div class="ntf-head">
                                <div class="d-flex align-items-center gap-2 min-w-0">
                                    <span class="ntf-head-title">{{ __('notifications') }}</span>
                                    <span v-if="notifications_unread_count > 0" class="ntf-new-pill">
                                        {{ notifications_unread_count > 99 ? '99+' : notifications_unread_count }} {{ __('new') === 'new' ? 'new' : __('new') }}
                                    </span>
                                </div>
                                <button v-if="notifications_unread_count > 0" type="button" class="ntf-read-all" @click.stop="confirmMarkAllAsRead">
                                    <i class="bi bi-check2-all"></i>
                                    <span>{{ __('read_all_notifications') }}</span>
                                </button>
                            </div>

                            <!-- List -->
                            <div class="ntf-list">
                                <li v-for="notification of notifications.slice(0, 4)" :key="notification.id"
                                    class="ntf-item" :class="{ 'is-unread': notification.read_at == null }"
                                    @click="handleNotificationClick(notification)">
                                    <span class="ntf-icon" :class="'ntf-tone-' + parseNotification(notification).tone">
                                        <i :class="parseNotification(notification).icon"></i>
                                    </span>
                                    <div class="ntf-content">
                                        <div class="ntf-title">{{ parseNotification(notification).title }}</div>
                                        <p class="ntf-body">{{ parseNotification(notification).body }}</p>
                                        <div class="ntf-time"><i class="bi bi-clock"></i>{{ changeDateTime(notification.created_at) }}</div>
                                    </div>
                                    <span v-if="notification.read_at == null" class="ntf-dot" aria-hidden="true"></span>
                                </li>
                                <li v-if="notifications.length == 0" class="ntf-empty">
                                    <span class="ntf-empty-icon"><i class="bi bi-bell-slash"></i></span>
                                    <span>{{ __('no_new_notification') }}</span>
                                </li>
                            </div>

                            <!-- Footer -->
                            <div class="ntf-foot">
                                <a href="javascript:void(0)" class="ntf-see-all"
                                    @click="$router.push(isSellerRoute ? '/seller/notification_panel' : (isDeliveryBoyRoute ? '/delivery_boy/notification_panel' : '/notification_panel'))">
                                    <span>{{ __('see_all_notifications') === 'see_all_notifications' ? 'See all notifications' : __('see_all_notifications') }}</span>
                                    <i class="bi bi-arrow-right ntf-arrow"></i>
                                </a>
                            </div>
                        </ul>
                    </div>

                    <!-- Language (phones: moved into the avatar menu) -->
                    <div class="dropdown d-none d-sm-block header-lang">
                        <a class="header-icon-btn" href="#" data-bs-toggle="dropdown" aria-expanded="false"
                            :title="currentLanguageName" :aria-label="currentLanguageName">
                            <!-- translate glyph (line style, matches the other header icons) -->
                            <svg class="header-lang-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                                <path d="m5 8 6 6" /><path d="m4 14 6-6 2-3" /><path d="M2 5h12" /><path d="M7 2h1" />
                                <path d="m22 22-5-10-5 10" /><path d="M14 18h6" />
                            </svg>
                        </a>
                        <ul class="dropdown-menu dropdown-menu-end lang-dropdown-menu shadow border mt-2">
                            <li v-for="language in languages" :key="language.code">
                                <a class="dropdown-item d-flex align-items-center gap-2 py-2"
                                    :class="{ 'active': lang === language.code }"
                                    href="javascript:void(0)"
                                    @click="selectLanguage(language.code)">
                                    <img :src="getFlagByCode(language.code)" class="rounded-circle"
                                        style="width: 18px; height: 18px; object-fit: cover;" alt="flag">
                                    <span class="fw-semibold flex-grow-1">{{ language.name }}</span>
                                    <i v-if="lang === language.code" class="bi bi-check2 text-primary"></i>
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div class="header-divider d-none d-sm-block"></div>

                    <!-- USER -->
                    <div class="dropdown header-user">
                        <a href="#" data-bs-toggle="dropdown" aria-expanded="false"
                            class="user-dropdown-toggle d-flex align-items-center text-decoration-none">
                            <img :src="profile_url" class="user-avatar" width="36" height="36" alt="avatar">
                            <div class="d-none d-sm-flex flex-column text-start align-items-start user-meta">
                                <div class="user-username">{{ user.username }}</div>
                                <span class="figma-user-role-text user-role">{{ role }}</span>
                            </div>
                            <i class="bi bi-chevron-down user-chevron ms-1"></i>
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
                                    <div class="d-flex align-items-center gap-2">
                                        <div class="form-check form-switch fs-6 mb-0">
                                            <input class="form-check-input me-0" type="checkbox" id="status"
                                                style="cursor: pointer" :true-value="1" :false-value="3"
                                                v-model="sellerStatus" :disabled="sellerStatusLoading"
                                                @change="toggleSellerStatus">
                                        </div>
                                        <span class="status-pill flex-fill" :class="sellerStatus === 1 ? 'status-pill-soft' : 'status-pill-muted'">
                                            <i class="bi bi-person-fill"></i>
                                            {{ sellerStatus === 1 ? __('active') : __('deactive') }}
                                        </span>
                                    </div>
                                </div>
                            </li>
                            <!-- Seller Status Toggle end -->

                            <!-- Delivery Boy Status Toggle -->
                            <li v-if="role == this.$roleDeliveryBoy">
                                <div class="dropdown-item">
                                    <div class="d-flex align-items-center gap-2">
                                        <div class="form-check form-switch fs-6 mb-0">
                                            <input class="form-check-input me-0" type="checkbox" id="status"
                                                style="cursor: pointer" :true-value="1" :false-value="3"
                                                v-model="deliveryBoyStatus" :disabled="deliveryBoyStatusLoading"
                                                @change="toggleDeliveryBoyStatus">
                                        </div>
                                        <span class="status-pill flex-fill" :class="deliveryBoyStatus === 1 ? 'status-pill-soft' : 'status-pill-muted'">
                                            <i class="bi bi-person-fill"></i>
                                            {{ deliveryBoyStatus === 1 ? __('active') : __('deactive') }}
                                        </span>
                                    </div>
                                </div>
                            </li>
                            <!-- Delivery Boy Status Toggle end -->

                            <!-- Auto-assign delivery boy feature disabled - On Duty toggle:
                            <li v-if="role == this.$roleDeliveryBoy">
                                <div class="dropdown-item">
                                    <div class="d-flex align-items-center gap-2">
                                        <div class="form-check form-switch fs-6 mb-0">
                                            <input class="form-check-input me-0" type="checkbox" id="on-duty-toggle"
                                                style="cursor: pointer" v-model="onDuty" :disabled="onDutyLoading"
                                                @change="toggleOnDuty">
                                        </div>
                                        <span class="status-pill flex-fill" :class="onDuty ? 'status-pill-soft' : 'status-pill-muted'">
                                            <i class="bi bi-briefcase-fill"></i>
                                            {{ onDuty ? 'On Duty' : 'Off Duty' }}
                                        </span>
                                    </div>
                                </div>
                            </li>
                            On Duty toggle end -->

                            <!-- Phones only: the header has no room for these three, so they live here -->
                            <li class="d-sm-none">
                                <hr class="dropdown-divider">
                            </li>
                            <li class="d-sm-none">
                                <a class="dropdown-item d-flex align-items-center" href="javascript:void(0)" @click="toggleTheme($event)">
                                    <i class="icon-mid bi me-2" :class="userTheme === 'theme-dark' ? 'bi-sun' : 'bi-moon'"></i>{{ userTheme === 'theme-dark' ? 'Light' : 'Dark' }}
                                </a>
                            </li>
                            <li class="d-sm-none" v-if="websiteUrl">
                                <a class="dropdown-item d-flex align-items-center" :href="websiteUrl" target="_blank">
                                    <i class="icon-mid bi bi-globe me-2"></i>{{ __('website') }}
                                </a>
                            </li>
                            <li class="d-sm-none" v-for="language in languages" :key="'m-' + language.code">
                                <a class="dropdown-item d-flex align-items-center gap-2"
                                    :class="{ 'active': lang === language.code }"
                                    href="javascript:void(0)" @click="selectLanguage(language.code)">
                                    <img :src="getFlagByCode(language.code)" class="rounded-circle"
                                        style="width: 18px; height: 18px; object-fit: cover;" alt="flag">
                                    <span class="fw-semibold">{{ language.name }}</span>
                                </a>
                            </li>
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

        <!-- Auto-assign delivery boy feature disabled - incoming order-offer popup (every open offer
             is shown at once, closes itself when none is left):
        <b-modal id="order-offer-modal" :title="'New Order Offers (' + liveOffers.length + ')'"
            :visible="offerPopupOpen && liveOffers.length > 0" @hidden="offerPopupOpen = false"
            hide-footer centered scrollable>
            <div v-for="offer in liveOffers" :key="offer.attempt_id" class="border rounded p-3 mb-3">
                <div class="d-flex justify-content-between align-items-start mb-2">
                    <div>
                        <h5 class="mb-0">Order #{{ offer.order_id }}</h5>
                        <p class="text-muted small mb-0" v-if="offer.area || offer.city">
                            {{ offer.area }}<span v-if="offer.area && offer.city">, </span>{{ offer.city }}
                        </p>
                    </div>
                    <span class="badge bg-warning text-dark">{{ offerSecondsLeft(offer) }}s left</span>
                </div>
                <div class="d-flex justify-content-between mb-1">
                    <span class="text-muted">Items</span>
                    <strong>{{ offer.item_count }}</strong>
                </div>
                <div class="d-flex justify-content-between mb-1">
                    <span class="text-muted">Order Value</span>
                    <strong>{{ $currency }}{{ offer.final_total }}</strong>
                </div>
                <div class="d-flex justify-content-between mb-3" v-if="offer.distance_km">
                    <span class="text-muted">Distance</span>
                    <strong>{{ Number(offer.distance_km).toFixed(1) }} km</strong>
                </div>
                <div class="d-flex gap-2">
                    <b-button variant="outline-danger" class="flex-fill" :disabled="offerRespondingId !== null"
                        @click="respondToOffer(offer, 'reject')">
                        Reject
                    </b-button>
                    <b-button variant="success" class="flex-fill" :disabled="offerRespondingId !== null"
                        @click="respondToOffer(offer, 'accept')">
                        Accept
                        <b-spinner v-if="offerRespondingId === offer.order_id" small></b-spinner>
                    </b-button>
                </div>
            </div>
        </b-modal> -->
        <command-palette></command-palette>
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
            themeIconSpinning: false,
            isToggle: false,

            //seller status
            sellerStatus: null,
            sellerStatusLoading: false,
            // Start from what the login response (or last stored user) says about this driver, so the
            // switches are right straight after login; getDeliveryBoyStatus() then refreshes them.
            deliveryBoyStatus: Auth.user && (Auth.user.delivery_boy || Auth.user.deliveryBoy)
                ? Number((Auth.user.delivery_boy || Auth.user.deliveryBoy).status)
                : null,
            deliveryBoyStatusLoading: false,
            remark: '',

            // // On Duty (auto-assign delivery boy, plan §1) - distinct from deliveryBoyStatus
            // // above, which is the account approval status, not live availability.
            // onDuty: !!(Auth.user && (Auth.user.delivery_boy || Auth.user.deliveryBoy)
                // && (Auth.user.delivery_boy || Auth.user.deliveryBoy).is_online),
            // onDutyLoading: false,
            // onDutyWatchId: null,
            // onDutyLastSentAt: 0,
            // offerPollInterval: null,
            // offerQueue: [],
            // offerPopupOpen: false,
            // offerSeenIds: [],
            // offerNow: Date.now(),
            // offerTickInterval: null,
            // offerRespondingId: null,

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
        // // Offers still inside their time limit. Shrinks by itself as offers run out, which is
        // // also what closes the popup at 0s.
        // liveOffers() {
            // return this.offerQueue.filter((o) => this.offerSecondsLeft(o) > 0);
        // },
        isMac() {
            return /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent || '');
        },
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
            const stored = localStorage.getItem('active_module_id');
            if (stored) {
                const found = this.modules.find(m => m.id === Number(stored));
                if (found) return found;
            }
            // No module picked yet in this browser - show whichever module is flagged
            // default on the server instead of assuming id 1 (Grocery).
            return this.modules.find(m => m.is_default) || this.modules[0] || null;
        },
        currentModuleName() {
            return this.currentModule ? this.currentModule.name : '';
        },
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.onResize);
        window.removeEventListener('DOMContentLoaded', this.onResize);
        this.$eventBus.$off('modulesUpdated');
        this.$eventBus.$off('languagesUpdated');
        // this.stopOnDutyLocationWatch();
        // this.stopOfferPolling();
    },
    mounted: function () {
        // Fetch initial seller status if the user is a seller
        if (this.role === this.$roleSeller)
            this.getSellerStatus();

        // Fetch initial delivery boy status if the user is a delivery boy
        if (this.role === this.$roleDeliveryBoy) {
            this.getDeliveryBoyStatus();
        }

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
        if (this.role !== this.$roleSeller && this.role !== this.$roleDeliveryBoy) {
            this.getModules();
        }

        this.$eventBus.$on('modulesUpdated', () => {
            if (this.role !== this.$roleSeller && this.role !== this.$roleDeliveryBoy) {
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
            // The stored user may carry the driver under `delivery_boy` or `deliveryBoy`, or not yet at
            // all right after login; the API falls back to the logged-in driver when no id is sent, so
            // never let a missing id stop the status (Active / On Duty) from being restored.
            const driver = (this.user && (this.user.delivery_boy || this.user.deliveryBoy)) || null;
            axios.post(this.$apiUrl + '/delivery_boy/get_delivery_boy_status', driver && driver.id ? { id: driver.id } : {})
                .then(response => {
                    if (response.data && response.data.data) {
                        this.deliveryBoyStatus = Number(response.data.data.status);
                        // this.onDuty = !!response.data.data.is_online;
                        // if (this.onDuty) {
                            // this.startOnDutyLocationWatch();
                            // this.startOfferPolling();
                        // } else {
                            // this.stopOnDutyLocationWatch();
                            // this.stopOfferPolling();
                        // }
                    }
                })
                .catch(error => {
                    console.error('Error fetching delivery boy status:', error.response?.data || error);
                });
        },

        // // On Duty toggle (auto-assign delivery boy, plan §1) - starts/stops the browser
        // // geolocation watch and the incoming-offer poll. Distinct from the account
        // // active/deactive status toggle above.
        // toggleOnDuty() {
            // if (this.onDutyLoading) return;
            // this.onDutyLoading = true;
            // // v-model already flipped this.onDuty to the desired new state by the time
            // // @change fires - mirrors toggleDeliveryBoyStatus's optimistic-update pattern.
            // const turningOn = this.onDuty;
            // const previousState = !turningOn;

            // const submit = (latitude, longitude) => {
                // const formData = new FormData();
                // formData.append('is_online', turningOn ? 1 : 0);
                // if (latitude && longitude) {
                    // formData.append('latitude', latitude);
                    // formData.append('longitude', longitude);
                // }

                // axios.post(this.$deliveryBoyApiUrl + '/toggle_duty', formData)
                    // .then((response) => {
                        // if (response.data.status === 1) {
                            // if (turningOn) {
                                // this.startOnDutyLocationWatch();
                                // this.startOfferPolling();
                            // } else {
                                // this.stopOnDutyLocationWatch();
                                // this.stopOfferPolling();
                                // this.offerQueue = [];
                            // }
                        // } else {
                            // this.onDuty = previousState;
                            // this.showError(response.data.message);
                        // }
                    // })
                    // .catch((error) => {
                        // this.onDuty = previousState;
                        // console.error('Error toggling on-duty status:', error.response?.data || error);
                    // })
                    // .finally(() => {
                        // this.onDutyLoading = false;
                    // });
            // };

            // if (turningOn && navigator.geolocation) {
                // navigator.geolocation.getCurrentPosition(
                    // (position) => submit(position.coords.latitude, position.coords.longitude),
                    // () => submit(null, null),
                    // { enableHighAccuracy: true, timeout: 8000 }
                // );
            // } else {
                // submit(null, null);
            // }
        // },

        // startOnDutyLocationWatch() {
            // if (this.onDutyWatchId !== null || !navigator.geolocation) return;
            // this.onDutyWatchId = navigator.geolocation.watchPosition(
                // (position) => this.sendOnDutyLocationUpdate(position),
                // (error) => console.error('On-duty location error:', error.message),
                // { enableHighAccuracy: true, maximumAge: 10000 }
            // );
        // },
        // stopOnDutyLocationWatch() {
            // if (this.onDutyWatchId === null) return;
            // navigator.geolocation.clearWatch(this.onDutyWatchId);
            // this.onDutyWatchId = null;
        // },
        // sendOnDutyLocationUpdate(position) {
            // // watchPosition can fire far more often than needed - send at most every 20s.
            // const now = Date.now();
            // if (now - this.onDutyLastSentAt < 20000) return;
            // this.onDutyLastSentAt = now;

            // const formData = new FormData();
            // formData.append('latitude', position.coords.latitude);
            // formData.append('longitude', position.coords.longitude);

            // axios.post(this.$deliveryBoyApiUrl + '/update_location', formData)
                // .catch((error) => {
                    // console.error('Failed to send on-duty location update:', error);
                // });
        // },

        // // Incoming-offer popup - polled, not websocket-driven (works identically on
        // // shared hosting or a VPS, no Pusher/Reverb dependency). It reads the whole offer queue
        // // (DeliveryBoyController::requestedOrders), so several offers can be answered one by one.
        // startOfferPolling() {
            // if (this.offerPollInterval !== null) return;
            // this.pollCurrentOffer();
            // this.offerPollInterval = setInterval(() => this.pollCurrentOffer(), 6000);
            // // One-second clock: counts every offer down and drops it from the popup at 0s.
            // this.offerTickInterval = setInterval(() => { this.offerNow = Date.now(); }, 1000);
        // },
        // stopOfferPolling() {
            // if (this.offerPollInterval !== null) {
                // clearInterval(this.offerPollInterval);
                // this.offerPollInterval = null;
            // }
            // if (this.offerTickInterval !== null) {
                // clearInterval(this.offerTickInterval);
                // this.offerTickInterval = null;
            // }
        // },
        // pollCurrentOffer() {
            // if (this.offerRespondingId !== null) return;
            // axios.get(this.$deliveryBoyApiUrl + '/requested_orders')
                // .then((response) => {
                    // this.offerQueue = response.data && response.data.data ? response.data.data : [];
                    // this.offerNow = Date.now();

                    // // Open the popup when a new offer arrives. If the driver closed it, it stays
                    // // closed until the next new offer; the header button reopens it any time.
                    // const fresh = this.offerQueue.filter((o) =>
                        // this.offerSecondsLeft(o) > 0 && !this.offerSeenIds.includes(o.attempt_id));
                    // if (fresh.length) {
                        // this.offerSeenIds = this.offerSeenIds.concat(fresh.map((o) => o.attempt_id)).slice(-100);
                        // this.offerPopupOpen = true;
                    // }
                // })
                // .catch((error) => {
                    // console.error('Error polling offers:', error.response?.data || error);
                // });
        // },
        // offerSecondsLeft(offer) {
            // if (!offer.expires_at) return 0;
            // return Math.max(0, Math.round((new Date(offer.expires_at).getTime() - this.offerNow) / 1000));
        // },
        // respondToOffer(offer, action) {
            // if (this.offerRespondingId !== null) return;
            // this.offerRespondingId = offer.order_id;

            // const formData = new FormData();
            // formData.append('order_id', offer.order_id);
            // formData.append('action', action);

            // axios.post(this.$deliveryBoyApiUrl + '/requested_orders/respond', formData)
                // .then((response) => {
                    // if (response.data.status === 1 && action === 'accept') {
                        // this.$router.push({ path: '/delivery_boy/orders' }).catch(() => {});
                    // }
                // })
                // .catch((error) => {
                    // console.error('Error responding to offer:', error.response?.data || error);
                // })
                // .finally(() => {
                    // this.offerRespondingId = null;
                    // // Drop it now, then reload so the remaining offers stay accurate.
                    // this.offerQueue = this.offerQueue.filter((o) => o.order_id !== offer.order_id);
                    // this.pollCurrentOffer();
                // });
        // },

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
                        this.showError(response.data.message);
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

                        // First time in this browser - nothing picked yet, so lock in the
                        // server's default module instead of silently sending header 1.
                        if (!localStorage.getItem('active_module_id')) {
                            const defaultModule = this.modules.find(m => m.is_default) || this.modules[0];
                            if (defaultModule) {
                                localStorage.setItem('active_module_id', defaultModule.id);
                                window.axios.defaults.headers.common['X-Module-Id'] = defaultModule.id;
                            }
                        }
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
            // Remembered so pages without this header (login, error pages) can apply RTL on first paint.
            try { localStorage.setItem('is_rtl', isRtl ? '1' : '0'); } catch (e) { }
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
                confirmButtonColor: 'var(--theme-primary-500)',
                cancelButtonColor: 'var(--theme-error-500)',
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
        setTheme(theme, event) {
            if (theme !== 'theme-dark' && theme !== 'theme-light') theme = this.getMediaPreference();
            const applyThemeClass = () => {
                sessionStorage.setItem("user-theme", theme);
                this.userTheme = theme;
                // Only swap theme classes so RTL class is preserved (sidebar stays on correct side in RTL + dark mode).
                document.body.classList.remove('theme-light', 'theme-dark');
                document.body.classList.add(theme);
            };

            // Circular reveal expanding from the toggle button, via the View Transitions API.
            // Only for an actual user click (event present) - skip it on initial page
            // load/login where setTheme() just applies the stored/OS-preferred theme.
            // Falls back to the plain CSS color-fade (custom-egrocer.scss) otherwise.
            if (!event || !document.startViewTransition || (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches)) {
                applyThemeClass();
                return;
            }

            const x = event ? event.clientX : window.innerWidth / 2;
            const y = event ? event.clientY : 0;
            const endRadius = Math.hypot(
                Math.max(x, window.innerWidth - x),
                Math.max(y, window.innerHeight - y)
            );

            const transition = document.startViewTransition(applyThemeClass);
            transition.ready.then(() => {
                document.documentElement.animate(
                    {
                        clipPath: [
                            `circle(0px at ${x}px ${y}px)`,
                            `circle(${endRadius}px at ${x}px ${y}px)`,
                        ],
                    },
                    {
                        duration: 650,
                        easing: 'cubic-bezier(0.65, 0, 0.35, 1)',
                        pseudoElement: '::view-transition-new(root)',
                    }
                );
                // Old theme gently recedes (fade + scale) instead of just sitting static
                // underneath the reveal, giving the swap some depth.
                document.documentElement.animate(
                    {
                        opacity: [1, 0],
                        transform: ['scale(1)', 'scale(1.03)'],
                    },
                    {
                        duration: 650,
                        easing: 'cubic-bezier(0.65, 0, 0.35, 1)',
                        pseudoElement: '::view-transition-old(root)',
                    }
                );
            });
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
            // nothing saved yet (or an old "null" value): follow the OS preference
            if (user_theme !== 'theme-dark' && user_theme !== 'theme-light') {
                user_theme = this.getMediaPreference();
            }
            this.userTheme = user_theme;
            return user_theme;
        },
        toggleTheme(event) {
            const activeTheme = sessionStorage.getItem("user-theme");
            this.themeIconSpinning = true;
            setTimeout(() => { this.themeIconSpinning = false; }, 650);
            if (activeTheme === "theme-light" || activeTheme == "" || activeTheme == "undefined" || activeTheme == "null") {
                this.setTheme("theme-dark", event);
            } else {
                this.setTheme("theme-light", event);
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
            // icon + tone (theme colour family) for the popup tile
            let icon = 'bi bi-truck';
            let tone = 'info';
            if (type === 'auto_assign_failed') {
                // Checked first: its text contains "assign", which would otherwise read as "Order Assigned".
                title = 'Manual Assignment Needed';
                icon = 'bi bi-exclamation-triangle'; tone = 'warn';
            } else if (type === 'return_request_new' || type === 'return_request_sent' || type === 'return_request_status' || lowerText.includes('return')) {
                title = 'Return Request Received';
                icon = 'bi bi-arrow-counterclockwise'; tone = 'warn';
            } else if (lowerText.includes('cancel')) {
                title = 'Order Cancelled';
                icon = 'bi bi-x-circle'; tone = 'error';
            } else if (lowerText.includes('receive') || lowerText.includes('place') || lowerText.includes('new order')) {
                title = 'New Order Placed';
                icon = 'bi bi-bag-check'; tone = 'primary';
            } else if (lowerText.includes('assign')) {
                title = 'Order Assigned';
                icon = 'bi bi-person-check'; tone = 'info';
            } else if (lowerText.includes('picked') || lowerText.includes('pickup')) {
                title = 'Order Out for Pickup';
                icon = 'bi bi-box-seam'; tone = 'info';
            } else if (lowerText.includes('deliver')) {
                title = 'Order Delivered';
                icon = 'bi bi-check2-circle'; tone = 'success';
            } else {
                title = 'Order Status Update';
            }

            return {
                title,
                body,
                icon,
                tone
            };
        }
    }
}
</script>
<style scoped>
/* Active/On-Duty pills (delivery boy dropdown) - reuse the theme's own orange tokens
   instead of Bootstrap's green/red so they don't clash with the orange toggle switch. */
.status-pill {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 6px 14px;
    border-radius: 999px;
    font-size: 0.85rem;
    font-weight: 600;
}
.status-pill-soft {
    background: var(--figma-primary-light, var(--theme-primary-50));
    color: var(--figma-primary, var(--theme-primary-500));
}
.status-pill-muted {
    background: var(--theme-neutral-100);
    color: var(--theme-neutral-400);
}
/* Dark mode: the light pill backgrounds above made the label unreadable - use a translucent tint
   with a lighter text colour so Active / Deactive / On Duty stay visible. */
body.theme-dark .status-pill.status-pill-soft {
    background: color-mix(in srgb, var(--theme-primary-500) 18%, transparent);
    color: var(--theme-warn-400);
}
body.theme-dark .status-pill.status-pill-muted {
    background: color-mix(in srgb, var(--theme-neutral-400) 18%, transparent);
    color: var(--theme-neutral-300);
}

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
    border-bottom: 1px solid var(--ui-border);
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
    background: var(--theme-neutral-100);
    border-radius: 6px;
    font-size: 0.8rem;
    color: var(--theme-neutral-600);
    text-decoration: none;
    transition: all 0.2s ease;
}

.website-link:hover {
    background: var(--theme-neutral-200);
    color: var(--theme-success-500);
}

/* Header Icon Buttons & Sidebar Toggle */
.header-icon-btn {
    width: 40px;
    height: 40px;
    border: 1px solid var(--ui-border);
    border-radius: var(--ui-radius);
    background: var(--ui-surface);
    color: var(--ui-text);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    cursor: pointer;
    padding: 0;
    flex-shrink: 0;
    transition: background-color 0.15s ease, border-color 0.15s ease, color 0.15s ease;
    box-shadow: none;

    &:hover {
        background: var(--ui-surface-muted);
        border-color: var(--ui-border-strong);
        color: var(--theme-primary-500);
    }

    &:focus-visible {
        outline: none;
        box-shadow: 0 0 0 2px color-mix(in srgb, var(--theme-primary-500) 25%, transparent);
    }
}

.burger-btn {
    width: 40px;
    height: 40px;
    border: 1px solid var(--ui-border);
    border-radius: var(--ui-radius);
    background: var(--ui-surface);
    color: var(--ui-text);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    cursor: pointer;
    padding: 0;
    flex-shrink: 0;
    transition: background-color 0.15s ease, border-color 0.15s ease, color 0.15s ease;
    box-shadow: none;

    &:hover {
        background: var(--ui-surface-muted);
        border-color: var(--ui-border-strong);
        color: var(--theme-primary-500);
    }
}

/* Clear Cache Button */
.header-cache-btn {
    height: 40px;
    padding: 0 14px;
    border: 1px solid var(--ui-border) !important;
    border-radius: var(--ui-radius) !important;
    background: var(--ui-surface) !important;
    color: var(--ui-text) !important;
    font-size: 13px !important;
    font-weight: 600 !important;
    font-family: var(--ui-font) !important;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    white-space: nowrap;
    flex-shrink: 0;
    cursor: pointer;
    box-shadow: none !important;
    transition: background-color 0.15s ease, border-color 0.15s ease, color 0.15s ease;

    &:hover {
        background: var(--ui-surface-muted) !important;
        border-color: var(--ui-border-strong) !important;
        color: var(--theme-primary-500) !important;
    }
}

/* Module & Language Selector */
.module-selector,
.lang-selector {
    height: 40px;
    padding: 0 12px;
    border: 1px solid var(--ui-border) !important;
    border-radius: var(--ui-radius) !important;
    background: var(--ui-surface) !important;
    color: var(--ui-text) !important;
    display: inline-flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    white-space: nowrap;
    cursor: pointer;
    user-select: none;
    transition: background-color 0.15s ease, border-color 0.15s ease;

    &:hover {
        background: var(--ui-surface-muted) !important;
        border-color: var(--ui-border-strong) !important;
    }

    .module-icon {
        width: 20px;
        height: 20px;
        object-fit: contain;
    }

    .lang-flag {
        width: 20px;
        height: 20px;
        object-fit: cover;
    }

    .module-name,
    .lang-name {
        font-size: 13px;
        font-weight: 600;
        color: var(--ui-heading);
    }

    .module-chevron,
    .lang-chevron {
        font-size: 11px;
        color: var(--ui-text-subtle);
    }
}

/* Notification badge */
.header-badge-count {
    position: absolute;
    top: -4px;
    right: -4px;
    min-width: 18px;
    height: 18px;
    padding: 0 4px;
    border-radius: 999px;
    background: var(--theme-error-500);
    color: #ffffff;
    font-size: 10px;
    font-weight: 700;
    line-height: 1;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border: 2px solid var(--ui-surface);
}

/* Divider */
.header-divider {
    width: 1px;
    height: 24px;
    background: var(--ui-border);
    margin: 0 4px;
    flex-shrink: 0;
}

/* User dropdown toggle */
/* user chip: styled with the other header controls in custom-egrocer.scss ("Header controls") */

/* Custom Language Dropdown Menu */
.lang-dropdown-menu {
    min-width: 110px !important;
    padding: 6px !important;
    border-radius: 12px !important;
    border: 1px solid var(--ui-border) !important;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.02) !important;
}
.lang-dropdown-menu .dropdown-item {
    border-radius: 8px !important;
    padding: 6px 12px !important;
    color: var(--ui-text) !important;
    font-size: 0.85rem !important;
    transition: all 0.2s ease !important;
}
.lang-dropdown-menu .dropdown-item:hover,
.lang-dropdown-menu .dropdown-item.active {
    background-color: var(--ui-primary-soft) !important;
    color: var(--theme-primary-600) !important;
}
body.theme-dark .lang-dropdown-menu {
    background-color: var(--ui-surface) !important;
    border-color: var(--ui-border) !important;
}
body.theme-dark .lang-dropdown-menu .dropdown-item {
    color: var(--ui-text) !important;
}
body.theme-dark .lang-dropdown-menu .dropdown-item:hover,
body.theme-dark .lang-dropdown-menu .dropdown-item.active {
    background-color: var(--ui-primary-soft) !important;
    color: var(--theme-primary-400) !important;
}

/* User Menu */
.user-dropdown-link {
    text-decoration: none;
    padding: 2px;
    border-radius: 12px;
    transition: background 0.2s ease;
}

.user-dropdown-link:hover {
    background: var(--theme-neutral-100);
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
    color: var(--theme-neutral-600);
}

.dropdown-item:hover {
    background-color: var(--theme-neutral-100);
    color: var(--theme-success-500);
}

.dropdown-header {
    font-weight: 600;
    color: var(--theme-neutral-800);
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
    color: var(--theme-neutral-400);
}

.text-gray-600 {
    color: var(--theme-neutral-600);
}

.text-gray-800 {
    color: var(--theme-neutral-800);
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

/* Phones: one row that always fits, down to 320px.
   Kept visible: burger, module chip, notification bell, avatar. The module chip is the only
   flexible item - it takes whatever room is left and truncates its name with an ellipsis.
   Clear Cache, language, theme and website link leave the row (the last three move into the
   avatar menu), so nothing can overflow or wrap and no inner scrolling is needed. */
@media (max-width: 575.98px) {
    .figma-header .container-fluid {
        padding-left: 0.75rem !important;
        padding-right: 0.75rem !important;
        gap: 0.4rem;
    }

    .figma-header .container-fluid>.d-flex:first-child {
        flex-shrink: 0;
    }

    .figma-header .header-right {
        flex: 1 1 auto;
        min-width: 0;
        justify-content: flex-end;
        gap: 0.25rem !important;
    }

    .header-cache-btn {
        display: none !important;
    }

    .header-module {
        flex: 0 1 auto;
        min-width: 0;
        margin-right: 0 !important;
    }

    .module-selector {
        width: auto !important;
        min-width: 0 !important;
        padding-left: 8px !important;
        padding-right: 8px !important;
    }

    .module-selector>.d-flex {
        min-width: 0;
    }

    .module-selector .module-name {
        display: block;
        flex: 1 1 auto;
        min-width: 0;
        max-width: 96px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 0.8rem !important;
    }

    /* Avatar chevron adds width for no benefit on phones. */
    .header-right .dropdown>a>.bi-chevron-down {
        display: none;
    }

    /* Notifications: a fixed 400px popover is wider than the phone and anchors off-screen.
       Anchor it to the header itself (full width, small gutter) so it always opens right under
       the header - whatever sits above it (announcement banner etc.) and wherever the bell is. */
    /* sticky (not relative): it still anchors the popover, and relative + the sticky "top" offset
       pushed the header down by the banner height and over the page content */
    .figma-header {
        position: sticky;
    }

    .header-right .nav-item.dropdown {
        position: static;
    }

    .header-right .notification-dropdown {
        position: absolute !important;
        top: 100% !important;
        left: 0.75rem !important;
        right: 0.75rem !important;
        width: auto !important;
        max-width: none !important;
        transform: none !important;
        margin-top: 0 !important;
    }

    .header-right .user-dropdown-menu {
        max-height: 70vh;
        overflow-y: auto;
    }
}


.text-wrap-custom {
    word-break: break-word !important;
    overflow-wrap: break-word !important;
    white-space: normal !important;
}
</style>

<style>
body.theme-dark .notification-dropdown,
body.theme-dark .dropdown-header {
    background-color: var(--theme-neutral-900) !important;
    border-color: var(--theme-neutral-800) !important;
}

/* Module Selector Styling */
.module-selector {
    background: var(--theme-neutral-100);
    border: 1px solid var(--ui-border);
    border-radius: 8px;
    height: 40px;
    min-width: 145px !important;
    transition: all 0.2s ease;
}
.module-selector:hover {
    background: var(--theme-neutral-200);
}
body.theme-dark .module-selector {
    background: var(--theme-neutral-800);
    border-color: var(--theme-neutral-700);
}
body.theme-dark .module-selector:hover {
    background: var(--theme-neutral-800);
}

/* Header dropdown rows (avatar menu + language menu): hover and active use the theme's primary
   colour instead of the template's green / Bootstrap blue. */
html body .header-right .user-dropdown-menu .dropdown-item:hover,
html body .header-right .user-dropdown-menu .dropdown-item:focus,
html body .header-right .user-dropdown-menu .dropdown-item.active,
html body .header-right .lang-dropdown-menu .dropdown-item:hover,
html body .header-right .lang-dropdown-menu .dropdown-item.active {
    background-color: var(--figma-primary-light, var(--theme-primary-50)) !important;
    color: var(--figma-primary, var(--theme-primary-500)) !important;
}

html body.theme-dark .header-right .user-dropdown-menu .dropdown-item:hover,
html body.theme-dark .header-right .user-dropdown-menu .dropdown-item:focus,
html body.theme-dark .header-right .user-dropdown-menu .dropdown-item.active,
html body.theme-dark .header-right .lang-dropdown-menu .dropdown-item:hover,
html body.theme-dark .header-right .lang-dropdown-menu .dropdown-item.active {
    background-color: color-mix(in srgb, var(--figma-primary, var(--theme-primary-500)) 18%, var(--theme-neutral-900)) !important;
    color: var(--figma-primary, var(--theme-primary-500)) !important;
}


/* ==========================================================================
   Notifications popup (ntf-*)
   ========================================================================== */
.notification-dropdown.ntf-popup {
    width: 380px;
    max-width: calc(100vw - 24px);
    padding: 0 !important;
    overflow: hidden;
    border: 1px solid var(--ui-border) !important;
    border-radius: 14px !important;
    background: var(--ui-surface) !important;
    box-shadow: var(--ui-shadow-lg) !important;
}

.ntf-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 14px 16px 12px;
    border-bottom: 1px solid var(--ui-border);
}

.ntf-head-title {
    font-size: 15px;
    font-weight: 700;
    color: var(--ui-text);
}

.ntf-new-pill {
    padding: 2px 8px;
    border-radius: 999px;
    background: var(--ui-primary-soft);
    color: var(--theme-primary-700);
    font-size: 11px;
    font-weight: 700;
    white-space: nowrap;
}

.ntf-read-all {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 4px 8px;
    border: 0;
    border-radius: 8px;
    background: transparent;
    color: var(--theme-primary-600);
    font-size: 12px;
    font-weight: 600;
    white-space: nowrap;
    cursor: pointer;
}

.ntf-read-all:hover {
    background: var(--ui-primary-soft);
}

.ntf-read-all i {
    font-size: 15px;
}

.ntf-list {
    max-height: min(420px, calc(100vh - 220px));
    overflow-y: auto;
    padding: 6px;
}

.ntf-item {
    position: relative;
    display: flex;
    align-items: flex-start;
    gap: 12px;
    padding: 10px;
    padding-inline-end: 24px;
    border-radius: 10px;
    list-style: none;
    cursor: pointer;
    transition: background-color 0.15s ease;
}

.ntf-item + .ntf-item {
    margin-top: 2px;
}

.ntf-item:hover {
    background: var(--ui-surface-muted);
}

.ntf-item.is-unread {
    background: color-mix(in srgb, var(--theme-primary-500) 6%, transparent);
}

.ntf-item.is-unread:hover {
    background: color-mix(in srgb, var(--theme-primary-500) 11%, transparent);
}

/* icon tile: tinted from its tone colour, so it follows the theme in light and dark mode */
.ntf-icon {
    flex: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    border-radius: 10px;
    font-size: 17px;
    background: color-mix(in srgb, currentColor 14%, transparent);
}

.ntf-tone-primary { color: var(--theme-primary-600); }
.ntf-tone-info { color: var(--theme-info-600); }
.ntf-tone-success { color: var(--theme-success-600); }
.ntf-tone-warn { color: var(--theme-warn-600); }
.ntf-tone-error { color: var(--theme-error-600); }

.ntf-content {
    flex: 1;
    min-width: 0;
}

.ntf-title {
    font-size: 13.5px;
    font-weight: 700;
    line-height: 1.3;
    color: var(--ui-text);
}

.ntf-body {
    margin: 2px 0 4px;
    font-size: 12.5px;
    line-height: 1.4;
    color: var(--ui-text-muted);
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    overflow-wrap: anywhere;
}

.ntf-time {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    font-size: 11.5px;
    color: var(--ui-text-muted);
}

.ntf-time i {
    font-size: 11px;
}

.ntf-dot {
    position: absolute;
    top: 16px;
    inset-inline-end: 10px;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--theme-primary-500);
}

.ntf-empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    padding: 28px 16px;
    list-style: none;
    font-size: 13px;
    color: var(--ui-text-muted);
}

.ntf-empty-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    border-radius: 12px;
    background: var(--ui-surface-muted);
    font-size: 20px;
}

.ntf-foot {
    border-top: 1px solid var(--ui-border);
}

.ntf-see-all {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    height: 44px;
    color: var(--theme-primary-600) !important;
    font-size: 13px;
    font-weight: 600;
    text-decoration: none;
    transition: background-color 0.15s ease;
}

.ntf-see-all:hover {
    background: var(--ui-primary-soft);
}

.ntf-see-all .ntf-arrow {
    transition: transform 0.15s ease;
}

.ntf-see-all:hover .ntf-arrow {
    transform: translateX(3px);
}

.rtl .ntf-see-all .ntf-arrow {
    transform: scaleX(-1);
}

.rtl .ntf-see-all:hover .ntf-arrow {
    transform: scaleX(-1) translateX(3px);
}

/* dark mode: brighter tone shades, and keep the popup on the theme surface */
body.theme-dark .notification-dropdown.ntf-popup {
    background: var(--ui-surface) !important;
    border-color: var(--ui-border-strong) !important;
}

/* the global dark-mode text reset forces span/i colours with !important, so the tone colours must too */
body.theme-dark .ntf-popup .ntf-tone-primary,
body.theme-dark .ntf-popup .ntf-tone-primary i { color: var(--theme-primary-400) !important; }
body.theme-dark .ntf-popup .ntf-tone-info,
body.theme-dark .ntf-popup .ntf-tone-info i { color: var(--theme-info-400) !important; }
body.theme-dark .ntf-popup .ntf-tone-success,
body.theme-dark .ntf-popup .ntf-tone-success i { color: var(--theme-success-400) !important; }
body.theme-dark .ntf-popup .ntf-tone-warn,
body.theme-dark .ntf-popup .ntf-tone-warn i { color: var(--theme-warn-400) !important; }
body.theme-dark .ntf-popup .ntf-tone-error,
body.theme-dark .ntf-popup .ntf-tone-error i { color: var(--theme-error-400) !important; }

/* same size and spacing as light mode (dark mode resets button font size and paragraph margins elsewhere) */
body .ntf-popup .ntf-read-all,
body .ntf-popup .ntf-read-all span {
    font-size: 12px !important;
    font-weight: 600 !important;
}

body .ntf-popup .ntf-body {
    margin: 2px 0 4px !important;
}

body .ntf-popup .ntf-time,
body .ntf-popup .ntf-time i {
    font-size: 11.5px !important;
}

body.theme-dark :is(.ntf-title, .ntf-head-title) {
    color: var(--ui-text) !important;
}

body.theme-dark :is(.ntf-body, .ntf-time) {
    color: var(--ui-text-muted) !important;
}

body.theme-dark .ntf-new-pill {
    color: var(--theme-primary-300) !important;
}

body.theme-dark :is(.ntf-read-all, .ntf-read-all span, .ntf-see-all, .ntf-see-all span) {
    color: var(--theme-primary-400) !important;
}
</style>
