// Every Settings page / Store Settings section in one grouped list, shared by the Settings hub
// (/system_settings) and the command palette (Ctrl/Cmd + K). Pass the calling component (vm) for
// translations. Visibility: canSeeSetting(vm, card) — same rule as the sidebar.

export function settingsCatalog(vm) {
    const tr = (key, fallback) => { const v = vm.__(key); return v && v !== key ? v : fallback; };
    const section = (key, icon, descKey, descFallback, titleKey) => ({
        key: 'section_' + key,
        title: vm.__(titleKey || key),
        desc: tr(descKey, descFallback),
        icon,
        to: { path: '/store_settings', query: { section: key } },
        permission: 'manage_store_settings',
    });
    const page = (key, title, url, permission, icon, descKey, descFallback) => ({
        key,
        title,
        desc: tr(descKey, descFallback),
        icon,
        to: url,
        permission,
    });
    return [
        {
            key: 'general', title: tr('settings_group_general', 'General'),
            cards: [
                section('store_setting', 'fas fa-store', 'store_setting_desc', 'Store name, support contacts, logos and copyright text.'),
                section('address_setting', 'fas fa-map-marker-alt', 'store_address_settings_desc', 'Store address and map location shown to customers and on invoices.'),
                section('other_setting', 'fas fa-sliders-h', 'other_setting_desc', 'Country code, date and time formats, cart limits and stock alerts.'),
                section('app_setting', 'fas fa-mobile-alt', 'app_setting_desc', 'App store links and version control for the customer, seller and delivery boy apps.'),
                section('frontend_home_setting', 'fas fa-home', 'frontend_home_setting_desc', 'Choose which sections appear on the website home page and how many items they show.'),
                section('login_setting', 'fas fa-sign-in-alt', 'login_setting_desc', 'Sign-in methods available to customers.'),
                section('cart_setting', 'fas fa-shopping-cart', 'cart_setting_desc', 'Guest cart and abandoned-cart reminder notifications.'),
                section('refer_earn_setting', 'fas fa-gift', 'refer_earn_setting_desc', 'Referral rewards for customers who invite new users.'),
                page('theme_settings', vm.__('theme_settings'), '/theme-settings', 'theme_settings', 'fas fa-paint-brush', 'theme_settings_desc', 'Brand, neutral and status colours used across the panels and apps.'),
            ],
        },
        {
            key: 'delivery', title: tr('settings_group_delivery', 'Delivery'),
            cards: [
                section('delivery_boy_setting', 'fas fa-motorcycle', 'delivery_boy_setting_desc', 'How delivery boys earn bonuses and confirm deliveries.'),
                page('delivery_settings', vm.__('delivery_settings'), '/delivery_settings', 'delivery_settings', 'fas fa-clock', 'time_slot_config_desc', 'Turn delivery time slots on or off and choose how customers pick a delivery time.'),
                page('auto_assign', tr('seller_own_drivers', 'Seller Delivery Boys'), '/auto-assign-settings', 'seller_delivery_boys', 'fas fa-route', 'seller_own_drivers_desc', 'Decide whether sellers can deliver orders with their own delivery boys.'),
            ],
        },
        {
            key: 'payments', title: tr('settings_group_payments', 'Payments'),
            cards: [
                page('payment_methods', vm.__('payment_methods'), '/payment_methods', 'manage_payment_methods', 'fas fa-credit-card', 'payment_methods_desc', 'Turn payment gateways on or off and enter their credentials.'),
                page('additional_charges', vm.__('additional_charge'), '/additional_charges', 'additional_charges_list', 'fas fa-receipt', 'additional_charge_desc', 'Extra charges (packaging, handling, etc.) added to orders at checkout.'),
            ],
        },
        {
            key: 'communication', title: tr('settings_group_communication', 'Communication'),
            cards: [
                section('smtp_mail_setting', 'fas fa-envelope', 'smtp_mail_setting_desc', 'Mail server used to send emails, plus a test email.'),
                page('firebase_settings', vm.__('firebase_settings'), '/firebase-settings', 'manage_Notification_settings', 'fas fa-fire', 'firebase_settings_desc', 'Firebase project keys and service-account file used for push notifications and phone login.'),
                page('notification_templates', vm.__('notification_templates'), '/notification-templates', 'manage_Notification_settings', 'fas fa-bell', 'notification_templates_desc', 'Title and message of the push notifications sent for each event.'),
                page('sms_settings', vm.__('sms_settings'), '/sms-settings', 'sms_settings', 'fas fa-sms', 'sms_settings_desc', 'Twilio credentials used to send OTP and order SMS messages.'),
                page('sms_templates', vm.__('sms_templates'), '/sms-templates', 'sms_templates_list', 'fas fa-comment-dots', 'sms_templates_desc', 'Text of the SMS messages sent for OTP and order updates.'),
                page('realtime_settings', tr('realtime_settings', 'Realtime Settings'), '/realtime-settings', 'realtime_settings', 'fas fa-bolt', 'realtime_settings_desc', 'Choose how realtime order-offer alerts reach delivery boys; only the selected driver is used.'),
            ],
        },
        {
            key: 'integrations', title: tr('settings_group_integrations', 'Integrations'),
            cards: [
                section('third_party_api_credentials', 'fas fa-key', 'third_party_api_credentials_desc', 'Map provider and API keys used by the panel and apps.'),
                page('deeplink_settings', vm.__('deeplink_settings'), '/deeplink-settings', 'deeplink_settings', 'fas fa-link', 'deeplink_settings_desc', 'Deeplink configuration used by the website and the mobile apps to open in-app screens.'),
                page('seo_settings', vm.__('seo_settings'), '/seo-settings', 'seo_settings_list', 'fas fa-search', 'seo_settings_desc', 'Meta titles, descriptions and keywords used by search engines.'),
            ],
        },
        {
            key: 'content', title: tr('settings_group_content_policies', 'Content & Policies'),
            cards: [
                page('contact_us', vm.__('contact_us'), '/contact_us', 'manage_contact_us', 'fas fa-address-book', 'contact_us_desc', 'Contact details shown on the Contact Us page of your store, per language.'),
                page('about_us', vm.__('about_us'), '/about_us', 'manage_about_us', 'fas fa-info-circle', 'about_us_desc', 'Content shown on the About Us page of your store, per language.'),
                page('customer_policies', vm.__('customer_policies'), '/privacy_policy', 'manage_privacy_policy', 'fas fa-user-shield', 'customer_policies_desc', 'Customer-facing policies shown in the app and website, per language.'),
                page('seller_policies', vm.__('policies_seller'), '/privacy_policy_seller', 'manage_privacy_policy_seller_app', 'fas fa-file-contract', 'seller_policies_desc', 'Privacy policy and terms that sellers accept, per language.'),
                page('delivery_boy_policies', vm.__('delivery_boy_policies'), '/privacy_policy_delivery_boy', 'manage_privacy_policy_delivery_boy', 'fas fa-shield-alt', 'delivery_boy_policies_desc', 'Privacy policy and terms that delivery boys accept, per language.'),
                page('general_web_settings', vm.__('general_web_settings'), '/general_settings', 'general_settings', 'fas fa-globe', 'general_web_settings_desc', 'Website header, footer, app download section and other web content.'),
                page('social_media', vm.__('social_media'), '/social_media', 'manage_social_media_list', 'fas fa-share-alt', 'social_media_desc', 'Social media links shown in the website footer.'),
            ],
        },
        {
            key: 'sellers', title: tr('settings_group_sellers', 'Sellers'),
            cards: [
                section('seller_setting', 'fas fa-user-tie', 'seller_setting_desc', 'Seller cart rules, commission and self pickup.'),
            ],
        },
        {
            key: 'system', title: tr('settings_group_system', 'System'),
            cards: [
                page('system_registration', vm.__('system_registration'), '/purchase_code', 'manage_system_registration', 'fas fa-certificate', 'purchase_code_desc', 'Register this installation with your purchase code to unlock updates and support.'),
                page('system_updater', vm.__('system_updater'), '/system_updater', 'manage_store_settings', 'fas fa-sync-alt', 'system_updater_desc', 'Review the changes in this release, then update the system.'),
            ],
        },
    ];
}

export function canSeeSetting(vm, card) {
    return card.role ? vm.$role('Super Admin') : !!(card.permission && vm.$can(card.permission));
}
