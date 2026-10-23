# Changelog

All notable changes to the eMarket admin / seller / delivery-boy panels, built from the git history
(27 commits, 2026-10-09 → 2026-10-12). Newest first. Each entry links to its commit (short hash).

Design work follows [DESIGN_RULES.md](DESIGN_RULES.md): theme colours only, Nunito only, shared
components for anything used twice, one radius / height scale.

## In simple words: what changed overall

**A fresh new look**
- The whole admin panel (and the seller and delivery-boy panels) has a new, modern, cleaner design.
- Every colour now comes from your **Theme Settings**. Change the theme colour there and the whole
  panel changes with it, per module (Grocery, Pharmacy, …). Nothing is "stuck" in a fixed colour.
- One font (Nunito) everywhere, and buttons, boxes and corners all follow the same sizes, so screens
  look like one family.

**Works everywhere**
- Looks right on **phones, tablets and desktops**, with no sideways scrolling.
- **Dark mode** works across the system: no more light boxes, unreadable text or missing colours.
- **Arabic (right-to-left)** layout is mirrored properly.

**Easier to use**
- Lists of things with pictures (products, categories, brands, media, sellers, …) can be shown as
  **cards (grid) or a table (list)**, and the page remembers your choice.
- Every list now shows **how many items there are** ("Showing 1–10 of 57 items").
- **Categories** can be viewed as a **tree** (parent → child), and reordering is a simple drag-and-drop
  switch on the same page.
- **Settings** are now one page of grouped cards with a search box, instead of a long menu.
- After your session ends, logging in again takes you **back to the page you were on**, not just the
  dashboard.
- The text editor (for descriptions, policies, …) follows light and dark mode.

**Better pages**
- **Dashboard:** more useful numbers in less space, coloured icons for order statuses, quick actions,
  stock alerts, and top products and sellers.
- **Order details:** a clear progress tracker, summary boxes and an actions panel.
- **Header:** neat matching buttons, a translate button for language, a notification bell with a
  "9+" badge, and a stays-on-top header with a one-line scrolling announcement.
- **Notifications:** a cleaner popup with an icon per type, unread highlights and "Read all".
- Module icons and missing images now show properly (theme-coloured icons, a placeholder image when
  a picture is missing).

**Fixed problems**
- Error pop-ups on **Store Settings** and **Popup Offer** pages no longer appear.
- Misaligned icons, squashed dropdowns, buttons of different heights and other small layout glitches
  were corrected.
- The browser always loads the newest version after an update (no more old screens until you clear
  the cache).

---

## 2026-10-12

### Added
- **Shared `<data-table>` component** (`components/DataTable.vue`) for list tables: standard look,
  loading row, empty states and the footer (per page, item count, pagination) in one place; pages keep
  only their columns and custom cells. Supports server-side and local (`local-paging`) paging.
  Used on Taxes and Customer Transactions. — `33e7774`
- **Return to the requested page after login.** A logged-out visit remembers the page with its query
  (e.g. `/store_settings?section=delivery_boy_setting`) and returns there after login when it belongs
  to the user's panel; seller / delivery-boy pages go to their own login; logout clears it
  (`resources/js/IntendedUrl.js`). — `e7048e5`
- **Shared `<reorder-toggle>`** (`components/ReorderToggle.vue`): one drag-and-drop "reorder" switch
  for list toolbars, used on Manage Categories, Products Order and Subscription FAQs. — `faa788d`
- **Redesigned notifications popup:** per-type icon tiles in theme colours (new order, delivered,
  cancelled, return, assigned, pickup), compact rows (title, 2-line body, time), unread highlight and
  dot, "N new" pill, "Read all" link and a "See all" footer. — `0313d6a`
- **Theme-coloured module icons** (`components/ModuleIcon.vue`): uploaded module icons are drawn in the
  theme primary colour in the header module selector, its dropdown and the Modules page. — `af87b49`
- **Dashboard → Recent Orders:** each status pill shows its status icon (same set as the Order Status
  card) and the view action is a tinted primary tile. — `51859d5`
- **Design rules:** Rule 5b (radius scale, "controls on one line have the same height", icon sizes,
  spacing), new `--ui-control-h` token (40px), shared widgets listed in Rule 3b, checklist items;
  summary added to `CLAUDE.md`. — `4f19344`

### Changed
- **Header controls made uniform**, then restyled to the reference: 44px soft square icon buttons with a
  12px radius and slate icons, same frame for the module and user chips, language shown as a translate
  icon after the bell, bell badge capped at "9+". — `210f969`, `e1a9359`

### Fixed
- `/popup` (Popup Offer) showed "_this.record.map is not a function" on every load: removed code copied
  from Firebase settings that treated the popup object as an array. — `af87b49`
- Light mode lost theme-scoped styles when no theme had been saved: the header put a literal `null`
  class on `<body>` (and saved "null"); it now follows the OS preference. — `e1a9359`
- Dark mode: a copy of Bootstrap's base reset in `app-dark.css` outranked component styles, so buttons
  lost their radius (e.g. the drag-and-drop toggle) and got 16px text; it now keeps the reset's low
  priority (`:where()`), and the file is version-stamped so browsers reload it. — `4f19344`
- Colour fields (text input + swatch + "Transparent") now share one height and radius on Manage
  Categories, Category / Brand / Section edit and Brands. — `4f19344`
- Header icon glyphs sat ~2px below the button centre (icon-font baseline); now exactly centred. —
  `94f5e1e`
- "Per page" select in list footers rendered bare in light mode (28px wide, chevron over the number);
  now styled the same in both themes and as tall as the pagination buttons. — `94f5e1e`
- Dark-mode status pills used an old colour mapping (received green, delivered blue, cancelled grey)
  and white text; they now keep the same colour family as light mode everywhere. — `51859d5`
- Dashboard Order Status icons were white on grey in dark mode; they now show each status colour. —
  `6ead70e`
- Selected text was dark-on-dark in dark mode; selection is now a primary tint with readable text in
  both themes. — `6ead70e`

---

## 2026-10-10

### Added
- **`<table-count>` in every list footer** ("Showing 1–10 of N items"), plus a uniform UI polish pass
  across 86 files. — `648f2b4`
- **Category tree view** on Manage Categories with parent → child hierarchy (`CategoryTreeNode.vue`),
  alongside the grid and list views. — `a3adb65`
- **Placeholder image** from System Settings shown wherever an image is missing (products, brands,
  offers, sellers, categories, POS, …). — `ab2c139`

### Changed
- **Categories Order merged into Manage Categories:** reordering is now a drag-and-drop toggle on the
  list and grid views; the separate Categories Order page and its menu item were removed. — `1483038`
- Header elements standardised to the design-system tokens and controls. — `e6e810f`
- Drag-and-drop toggle: balanced spacing between icon, switch and text. — `c48a7d9`
- Manage Categories route chunk named (`manage_categories`) and view cache cleared. — `813ffa3`

### Fixed
- Tree view: icon centring, a missing "+" icon and light-mode text contrast; action button icon
  replaced with an inline SVG and strictly centred. — `9963207`, `ea0ea46`
- Space between "0" and "Items" in the pagination item count. — `2ca6dfa`
- Select dropdowns: text and chevron vertically centred across the whole system. — `fd636ab`
- Search bar stays aligned to the start of the toolbar on every page (incl. POS). — `bc4bbe0`
- Products: visible "Select all" checkbox and a proper layout for the Select All button (also Media). —
  `695707a`

### Removed
- Unused deployment workflow configuration. — `9e5b6ff`

---

## 2026-10-09

### Added
- Initial import of the project. — `38b3d17`
- **Full redesign of the admin, seller and delivery-boy panels** (SnapBuy reference look, 179 files). —
  `dea2c05`
  - **Theme engine:** `ThemePalette.js` loads the active module's palette from Theme Settings and sets
    `--theme-<role>-<50…950>`; all colours use these or the semantic `--ui-*` tokens, with dark-mode
    variants. Charts and maps use `$themeColor()` / `$themeChartColors()`.
  - **Design rules** (`DESIGN_RULES.md`): shared vs page-local styles, shared widgets, theme colours
    only, Nunito only.
  - **Grid / list views** for image lists (products, categories, brands, media, sliders, offers,
    sections, blogs, sellers, delivery boys, customers…) via `ViewModeMixin`, with the view remembered
    per page.
  - **Dashboard redesign:** compact layout, quick actions, today strip, sales chart, Order Status,
    business performance tiles (incl. average order value), category ranking, catalog and inventory
    alerts, customers by platform, top products / sellers, recent orders.
  - **Order detail redesign:** header strip, progress tracker, summary tiles, actions card.
  - **Settings hub** (`SettingsHub.vue`): settings as a grouped, searchable card grid replacing the
    settings sub-menus; Store Settings redesigned with section pills and a sticky action bar.
  - **TinyMCE editor** follows light / dark mode (`EditorTheme.js`).
  - Sticky header with a single-line scrolling announcement banner.

### Fixed
- Responsive layout on mobile, tablet and desktop (no horizontal scroll); sidebar collapse no longer
  leaves empty space.
- Dark mode: light-looking components (tiles, pills, invoice, error pages) corrected.
- RTL (Arabic): mirrored layout, icons, inputs and dates; RTL kept on login and error pages.
- Store Settings error dialog ("reading 'id'") from leftover copied code.
- Built assets are content-hashed so browsers never keep a stale build.
