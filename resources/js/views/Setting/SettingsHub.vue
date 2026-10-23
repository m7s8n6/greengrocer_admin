<template>
    <div class="settings-hub">
        <div class="page-heading">
            <div class="page-title">
                <div class="settings-hub-head">
                    <div class="settings-hub-head__text">
                        <h3>{{ __('settings') }}</h3>
                        <p class="text-subtitle mb-0">{{ tr('settings_hub_subtitle', 'Manage your store, delivery, payments, communication and system configuration.') }}</p>
                    </div>
                    <div class="figma-search-container settings-hub-search">
                        <i class="fa fa-search" aria-hidden="true"></i>
                        <input type="search" class="figma-search-input" v-model.trim="search"
                            :placeholder="tr('search_settings', 'Search settings…')"
                            :aria-label="tr('search_settings', 'Search settings…')" />
                    </div>
                </div>
            </div>
        </div>

        <section class="section">
            <div v-for="group in visibleGroups" :key="group.key" class="settings-hub-group">
                <h6 class="settings-hub-group__title">{{ group.title }}</h6>
                <div class="settings-hub-grid">
                    <router-link v-for="card in group.cards" :key="card.key" :to="card.to"
                        class="settings-hub-card">
                        <span class="settings-hub-card__icon" aria-hidden="true">
                            <i :class="card.icon"></i>
                        </span>
                        <span class="settings-hub-card__title">{{ card.title }}</span>
                        <span class="settings-hub-card__desc">{{ card.desc }}</span>
                        <span class="settings-hub-card__link">
                            {{ tr('go_to_settings', 'Go to settings') }}
                            <i class="fas fa-arrow-right settings-hub-card__arrow" aria-hidden="true"></i>
                        </span>
                    </router-link>
                </div>
            </div>

            <div v-if="visibleGroups.length === 0" class="card">
                <div class="card-body settings-hub-empty">
                    <i class="fas fa-search" aria-hidden="true"></i>
                    <p class="mb-0">{{ tr('no_settings_found', 'No settings match your search.') }}</p>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import { settingsCatalog, canSeeSetting } from '../../utils/settingsCatalog.js';
// Settings hub: one grouped grid of every setting page.
// Card list mirrors the sidebar entries that used to live in the "System" / "Web Settings"
// submenus (plus Theme / Delivery settings and the policy pages) with the same url and the same
// visibility check as the sidebar (sub.role ? $role('Super Admin') : sub.permission && $can(sub.permission)).
// Store Settings sections open /store_settings?section=<key>.
export default {
    name: 'SettingsHub',
    data() {
        return {
            search: '',
        };
    },
    computed: {
        catalog() {
            return settingsCatalog(this);
        },
        visibleGroups() {
            const q = this.search.toLowerCase();
            return this.catalog
                .map(group => ({
                    ...group,
                    cards: group.cards.filter(card => this.canSee(card) && (!q
                        || String(card.title).toLowerCase().includes(q)
                        || String(card.desc).toLowerCase().includes(q))),
                }))
                .filter(group => group.cards.length > 0);
        },
    },
    methods: {
        // __() returns the key itself when a translation is missing - fall back to English text.
        tr(key, fallback) {
            const v = this.__(key);
            return v && v !== key ? v : fallback;
        },
        // Same visibility rule the sidebar uses for its sub-entries.
        canSee(card) {
            return canSeeSetting(this, card);
        },
    },
};
</script>

<style scoped>
.settings-hub-head {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 16px;
    flex-wrap: wrap;
}
.settings-hub-head__text {
    min-width: 0;
}
.settings-hub-search {
    flex: 0 1 320px;
    min-width: 220px;
}
.settings-hub-search .figma-search-input {
    width: 100%;
}

.settings-hub-group {
    margin-bottom: 28px;
}
.settings-hub-group__title {
    font-family: var(--ui-font);
    font-size: 12px;
    font-weight: 700;
    letter-spacing: .06em;
    text-transform: uppercase;
    color: var(--ui-text-muted);
    margin: 0 0 12px;
}
body.theme-dark .settings-hub-group__title {
    color: var(--ui-text-muted) !important; /* beats the global dark-mode heading colour reset */
}

.settings-hub-grid {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 16px;
}
@media (max-width: 1199.98px) {
    .settings-hub-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
}
@media (max-width: 991.98px) {
    .settings-hub-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}
@media (max-width: 575.98px) {
    .settings-hub-grid { grid-template-columns: minmax(0, 1fr); gap: 12px; }
    #main .settings-hub-search { flex: 1 1 100%; min-width: 0; max-width: none; }
}

.settings-hub-card {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 6px;
    height: 100%;
    padding: 18px;
    background: var(--ui-surface);
    border: 1px solid var(--ui-border);
    border-radius: var(--ui-radius-lg);
    box-shadow: var(--ui-shadow);
    font-family: var(--ui-font);
    text-decoration: none;
    text-align: start;
    transition: transform .18s ease, box-shadow .18s ease, border-color .18s ease;
}
.settings-hub-card:hover,
.settings-hub-card:focus-visible {
    transform: translateY(-3px);
    box-shadow: var(--ui-shadow-lg);
    border-color: color-mix(in srgb, var(--theme-primary-500) 35%, var(--ui-border));
    text-decoration: none;
}
.settings-hub-card:focus-visible {
    outline: 2px solid var(--theme-primary-500);
    outline-offset: 2px;
}
body.theme-dark .settings-hub-card {
    background: var(--theme-neutral-800);
    border-color: var(--theme-neutral-700);
}

.settings-hub-card__icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    border-radius: var(--ui-radius-lg);
    margin-bottom: 8px;
    font-size: 18px;
    flex: 0 0 auto;
    background: color-mix(in srgb, var(--theme-primary-500) 12%, transparent);
    color: var(--theme-primary-600);
}
body.theme-dark .settings-hub-card__icon i {
    color: var(--theme-primary-400) !important; /* global dark reset would turn the icon white */
}

.settings-hub-card__title {
    font-size: 15px;
    font-weight: 700;
    line-height: 1.3;
    color: var(--ui-heading);
}
.settings-hub-card__desc {
    font-size: 13px;
    font-weight: 400;
    line-height: 1.45;
    color: var(--ui-text-muted);
    flex: 1 1 auto;
}
.settings-hub-card__link {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    margin-top: 6px;
    font-size: 13px;
    font-weight: 600;
    color: var(--theme-primary-600);
}
.settings-hub-card__arrow {
    font-size: 11px;
    transition: transform .18s ease;
}
.settings-hub-card:hover .settings-hub-card__arrow {
    transform: translateX(3px);
}
[dir="rtl"] .settings-hub-card__arrow,
.rtl .settings-hub-card__arrow {
    transform: scaleX(-1);
}
[dir="rtl"] .settings-hub-card:hover .settings-hub-card__arrow,
.rtl .settings-hub-card:hover .settings-hub-card__arrow {
    transform: scaleX(-1) translateX(3px);
}
/* Global dark-mode reset forces light text on every span - keep the card's text hierarchy */
body.theme-dark .settings-hub-card__title { color: var(--ui-heading) !important; }
body.theme-dark .settings-hub-card__desc { color: var(--ui-text-muted) !important; }
body.theme-dark .settings-hub-card__link,
body.theme-dark .settings-hub-card__link i { color: var(--theme-primary-400) !important; }

.settings-hub-empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    padding: 40px 16px !important;
    color: var(--ui-text-muted);
    text-align: center;
}
.settings-hub-empty i {
    font-size: 24px;
    color: var(--ui-text-subtle);
}
body.theme-dark .settings-hub-empty p { color: var(--ui-text-muted) !important; }
</style>
