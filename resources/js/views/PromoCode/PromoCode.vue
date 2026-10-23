<template>
  <div>
    <div class="page-heading">
      <div class="page-heading d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
        <h3 class="modern-page-title mb-0">{{ __('manage_promo_code') }}</h3>
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb mb-0">
            <li class="breadcrumb-item">
              <router-link to="/dashboard" class="text-muted">{{ __('dashboard') }}</router-link>
            </li>
            <li class="breadcrumb-item active text-primary" aria-current="page">{{ __('manage_promo_code') }}</li>
          </ol>
        </nav>
      </div>

      <section class="section">
        <div class="card figma-main-section-card">
          <div class="card-body p-0">
            <!-- Modern Filter Action Bar -->
            <div class="d-flex justify-content-between align-items-center flex-wrap gap-2 figma-action-bar-row">
              <div class="flex-grow-1">
                <div class="figma-search-container">
                  <i class="fa fa-search text-muted"></i>
                  <input v-model="filter" type="text" class="figma-search-input"
                    :placeholder="__('search') || 'Search...'" @input="getPromoCode()">
                </div>
              </div>
              <div class="d-flex gap-2">
                <button class="btn btn-figma-columns d-flex align-items-center gap-2" @click="getPromoCode()"
                  v-b-tooltip.hover :title="__('refresh')">
                  <i class="fa fa-refresh"></i>
                  <span>{{ __('refresh') }}</span>
                </button>

                <button class="btn btn-figma-filter d-flex align-items-center gap-2" @click="create_new = true"
                  v-if="$can('promo_code_create')">
                  <i class="fa fa-plus"></i>
                  <span>{{ __('add_promo_code') }}</span>
                </button>
              </div>
            </div>
            <template>
              <div class="table-responsive">
                <b-table :items="promocode" :fields="fields" :current-page="currentPage" :per-page="perPage"
                  :sort-direction="sortDirection" :bordered="false" :busy="isLoading" stacked="md" show-empty
                  :tbody-tr-class="() => 'figma-tr align-middle'" small class="figma-order-table mb-0">

                  <template #table-busy>
                    <div class="text-center text-black my-2">
                      <b-spinner class="align-middle"></b-spinner>
                      <strong>{{ __('loading') }}...</strong>
                    </div>
                  </template>
                  <template #empty="scope">
                    <div class="text-center text-muted py-4"><i class="fa fa-inbox fa-2x d-block mb-2"></i>{{ scope.emptyText }}</div>
                  </template>
                  <template #cell(promo_code)="row">
                    <span class="promo-code-pill">{{ row.item.promo_code }}</span>
                  </template>
                  <template #cell(image)="row">
                    <img :src="row.item.image_url" class="promo-thumb" alt="" />
                  </template>
                  <template #cell(message)="row">
                    {{ getTranslatedMessage(row.item) }}
                  </template>

                  <template #cell(no_of_users)="row">
                    <span v-if="row.item.user_limit_type === 'unlimited'">{{ __('unlimited') }}</span>
                    <span v-else>{{ row.item.no_of_users }}</span>
                  </template>

                  <template #cell(validity)="row">
                    <label v-if="row.item.is_applicable === 1" class='badge bg-success'>{{ row.item.validity }}</label>
                    <label v-else="row.item.is_applicable === 0" class='badge bg-danger'>{{ row.item.validity }}</label>
                  </template>

                  <template #cell(status)="row">
                    <label v-if="row.item.status === 1" class='badge bg-success'>{{ __('active') }}</label>
                    <label v-else="row.item.status === 0" class='badge bg-danger'>{{ __('deactive') }}</label>
                  </template>

                  <template #cell(actions)="row">
                    <div class="d-flex gap-2">
                      <button class="figma-action-btn" @click="edit_record = row.item" v-if="$can('promo_code_update')"
                        v-b-tooltip.hover :title="__('edit')">
                        <base-icon name="edit icon" hoverName="edit Hover" width="24" height="24" />
                      </button>
                      <button class="figma-action-btn figma-delete-btn" @click="deleteSlider(row.index, row.item.id)"
                        v-if="$can('promo_code_delete')" v-b-tooltip.hover :title="__('delete')">
                        <base-icon name="Type=Default" hoverName="Type=Hover" width="24" height="24" />
                      </button>
                    </div>
                  </template>
                </b-table>
              </div>
            </template>
          </div>
          <div class="figma-table-footer flex-wrap gap-3">
            <div class="d-flex align-items-center gap-2">
              <label class="showing-results-text mb-0">{{ __('per_page') }}</label>
              <b-form-select v-model="perPage" :options="pageOptions" size="sm" class="w-auto"></b-form-select>
                                <table-count :current-page="currentPage" :per-page="perPage" :total-rows="totalRows"></table-count>
            </div>
            <b-pagination v-model="currentPage" :total-rows="totalRows" :per-page="perPage" align="right"
              class="figma-pagination mb-0" hide-goto-end-buttons hide-ellipsis prev-text="<" next-text=">"></b-pagination>
          </div>
        </div>

      </section>
    </div>

    <!-- Add / Edit -->

    <app-edit-record v-if="create_new || edit_record" :record="edit_record" @modalClose="hideModal()"></app-edit-record>

  </div>
</template>
<script>
import { VuejsDatatableFactory } from "vuejs-datatable";
import EditRecord from "./Edit.vue";
import axios from "axios";

export default {
  components: {
    VuejsDatatableFactory,
    "app-edit-record": EditRecord,
  },
  data: function () {
    return {
      fields: [
        { key: "id", label: __("id"), sortable: true, headAttr: { width: '80px', textAlign: 'center' }, sortDirection: "desc" },
        { key: "promo_code", label: __('promo_code'), sortable: true, class: "text-center" },
        { key: "message", label: __('message'), sortable: true, sortDirection: "desc", class: "text-center" },
        { key: "start_date", label: __('start_date'), sortable: true, sortDirection: "desc", class: "text-center" },
        { key: "end_date", label: __('end_date'), sortable: true, sortDirection: "desc", class: "text-center" },
        { key: "no_of_users", label: __('no_of_users'), sortable: true, sortDirection: "desc", class: "text-center" },
        { key: "minimum_order_amount", label: __('minimum_order_amount'), sortable: true, sortDirection: "desc", class: "text-center" },
        { key: "discount", label: __('discount'), sortable: true, sortDirection: "desc", class: "text-center" },
        { key: "discount_type", label: __('discount_type'), sortable: true, sortDirection: "desc", class: "text-center" },
        { key: 'image', label: __('image'), class: 'text-center' },
        { key: "status", label: __('status'), sortable: true, sortDirection: "desc", class: "text-center" },
        { key: "validity", label: __('validity'), sortable: true, sortDirection: "desc", class: "text-center" },
        { key: "actions", label: __('actions') },
      ],
      totalRows: 1,
      currentPage: 1,
      perPage: this.$perPage,
      pageOptions: this.$pageOptions,
      sortBy: "",
      sortDesc: false,
      sortDirection: "asc",
      filter: null,
      filterOn: [],
      page: 1,

      promocode: [],
      isLoading: false,
      sectionStyle: "style_1",
      max_visible_promocode: 12,
      max_col_in_single_row: 12,
      create_new: false,
      edit_record: null,
      // Language handling for translations
      currentLanguageId: null,
      activeLanguages: []
    };
  },
  computed: {
    sortOptions() {
      // Create an options list from our fields
      return this.fields
        .filter((f) => f.sortable)
        .map((f) => {
          return { text: f.label, value: f.key };
        });
    },
    pageEnd() {
      return Math.min(this.currentPage * this.perPage, this.totalRows);
    },
  },
  mounted() {
    // Set the initial number of items
    this.totalRows = this.promocode.length;
  },
  watch: {
    $route(to, from) {
      this.showCreateModal();
    },
    filter() {
      this.getPromoCode();
    },
    perPage() {
      this.currentPage = 1;
    }
  },
  created: function () {
    this.showCreateModal();
    this.$eventBus.$on("PromoCodeSaved", (message) => {
      this.showMessage("success", message);
      this.getPromoCode();
    });
    // Load languages first so we know currentLanguageId before mapping translations
    this.fetchActiveLanguages().then(() => {
      this.getPromoCode();
    }).catch(() => {
      this.getPromoCode();
    });
  },
  methods: {
    // Fetch active languages and set current language ID
    fetchActiveLanguages() {
      return axios.get(this.$apiUrl + '/active_languages')
        .then(response => {
          if (response.data.data && Array.isArray(response.data.data)) {
            this.activeLanguages = response.data.data;

            const appLocale = window.appLocale || 'en';

            const currentLanguage = this.activeLanguages.find(
              lang => lang.code === appLocale
            );

            if (currentLanguage) {
              this.currentLanguageId = currentLanguage.id;
            } else {
              const defaultLanguage = this.activeLanguages.find(
                lang => lang.is_default === 1
              );
              if (defaultLanguage) {
                this.currentLanguageId = defaultLanguage.id;
              }
            }
          }
        })
        .catch(error => {
          console.error('Error loading languages:', error);
        });
    },
    // Get translated message with fallback logic
    getTranslatedMessage(promoCode) {
      // If no language is set yet, return the base message
      if (!this.currentLanguageId || !this.activeLanguages.length) {
        return promoCode.message || '';
      }

      // Get default language ID for fallback
      const defaultLanguage = this.activeLanguages.find(lang => lang.is_default === 1);
      const defaultLanguageId = defaultLanguage ? defaultLanguage.id : null;

      // Check if translations array exists
      if (promoCode.translations && Array.isArray(promoCode.translations) && promoCode.translations.length > 0) {
        // First try to find translation for current language
        let translation = promoCode.translations.find(
          t => t.language_id === this.currentLanguageId
        );

        // If not found, try default language
        if (!translation && defaultLanguageId) {
          translation = promoCode.translations.find(
            t => t.language_id === defaultLanguageId
          );
        }

        // Use translation message if available and not empty
        if (translation && translation.message && translation.message.trim() !== '') {
          return translation.message;
        }
      }

      // Fallback to base message
      return promoCode.message || '';
    },
    getPromoCode() {
      this.isLoading = true;
      axios.get(this.$apiUrl + "/promo_code?search=" + (this.filter || "")).then((response) => {
        this.isLoading = false;
        let data = response.data;
        // Ensure promo codes have proper structure with translations
        this.promocode = (data.data || []).map(code => {
          // Ensure translations array exists
          if (!code.translations) {
            code.translations = [];
          }
          return code;
        });
        this.totalRows = this.promocode.length;
      });
    },

    deleteSlider(index, id) {
      this.$swal
        .fire({
          title: __('are_you_sure'),
          text: __('you_want_be_able_to_revert_this'),
          confirmButtonText: __('yes_sure'),
          cancelButtonText: __('cancel'),
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "var(--theme-primary-500)",
          cancelButtonColor: "var(--theme-error-500)",
        })
        .then((result) => {
          if (result.value) {
            this.isLoading = true;
            let postData = {
              id: id,
            };
            axios
              .post(this.$apiUrl + "/promo_code/delete", postData)
              .then((response) => {
                this.isLoading = false;
                let data = response.data;
                this.promocode.splice(index, 1);
                //this.showSuccess(data.message);
                this.showMessage("success", data.message);
              });
          }
        });
    },
    showCreateModal() {
      let create = this.$route.params.create;
      if (create) {
        this.create_new = true;
      }
    },
    hideModal() {
      this.create_new = false
      this.edit_record = false
      this.$router.push({ path: '/promo_code' });
    },
  },
  beforeDestroy() {
    this.$eventBus.$off('PromoCodeSaved');
  }
};
</script>

<style scoped>
.promo-code-pill {
    display: inline-block;
    padding: 4px 10px;
    font-family: var(--ui-font);
    font-size: 12px !important;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    white-space: nowrap;
    color: var(--theme-primary-700) !important;
    background: var(--ui-primary-soft);
    border: 1px dashed var(--theme-primary-300);
    border-radius: var(--ui-radius-sm);
}

.promo-thumb {
    width: 44px;
    aspect-ratio: 1 / 1;
    height: auto;
    object-fit: cover;
    border-radius: var(--ui-radius) !important;
    border: 1px solid var(--ui-border);
    background: var(--ui-surface-muted);
}
</style>
