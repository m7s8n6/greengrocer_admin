<template>
  <div>
    <div class="page-heading">
      <div class="page-title"><div class="row">
        <div class="col-12 col-md-6 order-md-1 order-last">
          <h3>{{ __('manage_time_slots') }}</h3>
        </div>
        <div class="col-12 col-md-6 order-md-2 order-first">
          <nav aria-label="breadcrumb" class="breadcrumb-header float-start float-lg-end">
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
                <router-link to="/dashboard">{{ __('dashboard') }}</router-link>
              </li>
              <li class="breadcrumb-item"><router-link to="/system_settings">{{ __('settings') }}</router-link></li>
              <li class="breadcrumb-item active" aria-current="page">{{ __('manage_time_slots') }}</li>
            </ol>
          </nav>
        </div>
      </div></div>

      <div class="row">
                <div class="col-12 col-xl-4 timeslot-config-col mb-3 mb-xl-0">
                  <div class="card mb-0">
                    <div class="card-header">
                      <h4 class="card-title float-none">{{ __('time_slot_config') }}</h4>
                      <p class="text-muted small mb-0 mt-1">{{ tr('time_slot_config_desc', 'Turn delivery time slots on or off and choose how customers pick a delivery time.') }}</p>
                    </div>
                  <div class="card-body">
                    <div class="form-group">
                      <label for="time_slots_is_enabled">{{ __('enable') }} / {{ __('disable') }} {{ __('time_slots')
                        }}</label>
                      <div class="form-check form-switch mt-1">
                      <input type="checkbox" required id="time_slots_is_enabled"
                        v-model="timeSlot_settingsObject.time_slots_is_enabled" class="form-check-input"
                        :true-value="1" :false-value="0">
                      </div>
                    </div>
                    <template v-if="timeSlot_settingsObject.time_slots_is_enabled == 1">
                      <div class="form-group">
                        <label>{{ __('slot_type') || 'Slot Type' }}</label>
                        <div class="mt-1 d-inline-block" v-b-tooltip.hover.bottom
                          :title="oneSellerCart ? '' : 'Quick Delivery needs One Seller Cart turned on (Settings \u2192 Seller Setting).'">
                          <b-form-radio-group v-model="timeSlot_settingsObject.time_slot_type" :options="[
                            { text: __('fixed_time_window') || 'Fixed Time Window', 'value': 'fixed' },
                            { text: __('express') || 'Quick Delivery', 'value': 'express', disabled: !oneSellerCart },
                          ]" buttons button-variant="outline-primary" class="slot-type-group"></b-form-radio-group>

                        </div>
                      </div>
                      <div class="form-group" v-if="timeSlot_settingsObject.time_slot_type !== 'express'">

                        <label>{{ __('delivery_estimate_days') }}</label>
                        <input type="number" min="1" class="form-control" required
                          v-model="timeSlot_settingsObject.delivery_estimate_days" @input="validateNoOfEstimateDays">
                        <span v-if="validationNoOfEstimateDaysError" class="error">{{ validationNoOfEstimateDaysError
                          }}</span>
                      </div>
                      <div class="form-group" v-if="timeSlot_settingsObject.time_slot_type !== 'express'">
                        <label>{{ __('how_many_days_you_want_to_allow') }}?</label>
                        <input type="number" min="1" class="form-control" required
                          v-model="timeSlot_settingsObject.time_slots_allowed_days" @input="validateNoOfDays">
                        <span v-if="validationNoOfDaysError" class="error">{{ validationNoOfDaysError }}</span>
                        <br />
                      </div>
                    </template>

                    <div class="d-flex justify-content-end border-top pt-3 mt-2">
                      <button v-if="$can('delivery_settings')" type="submit" class="btn btn-primary" @click="addTimeSlotsSettings" :disabled="isLoading">
                        {{ __('save') }} <b-spinner v-if="isLoading" small label="Spinning"></b-spinner></button>
                    </div>
                  </div>
                  </div>
                </div>
                <div class="col-12 col-xl-8 timeslot-list-col" v-if="timeSlot_settingsObject.time_slots_is_enabled == 1">
                  <div class="card mb-0">
                  <div class="card-body">
                  <div
                    class="d-flex justify-content-between align-items-center flex-wrap gap-2 figma-action-bar-row mb-3">
                    <div class="flex-grow-1">
                      <div class="figma-search-container">
                        <i class="fa fa-search text-muted"></i>
                        <input v-model="filter" type="text" class="figma-search-input" :placeholder="__('search')">
                      </div>
                    </div>
                    <div class="d-flex gap-2 align-items-center flex-wrap timeslot-actions">
                      <button class="btn btn-figma-filter d-flex align-items-center gap-2 timeslot-add-btn" @click="edit_record = true"
                        v-if="$can('time_slot_create')" :disabled="quickDeliverySlotExists"
                        v-b-tooltip.hover
                        :title="quickDeliverySlotExists ? (__('quick_delivery_slot_already_exists') || 'A Quick Delivery slot already exists. Delete it before adding a new one.') : ''">
                        <i class="fa fa-plus"></i>
                        <span>{{ __('add_new_time_slot') }}</span>
                      </button>
                      <button class="btn btn-figma-filter d-flex align-items-center justify-content-center timeslot-refresh-btn"
                        @click="getTimeSlots()" v-b-tooltip.hover
                        :title="__('refresh')">
                        <i class="fa fa-refresh"></i>
                      </button>
                    </div>
                  </div>

                  <div class="table-responsive">

                    <b-table :items="translatedTimeSlots" :fields="visibleFields" :current-page="currentPage"
                      :per-page="perPage" :filter="filter" :filter-included-fields="filterOn" :sort-by.sync="sortBy"
                      :sort-desc.sync="sortDesc" :sort-direction="sortDirection" :bordered="false" :busy="isLoading"
                      stacked="md" show-empty small class="figma-table mb-0"
                      :tbody-tr-class="() => 'figma-tr align-middle'">
                      <template #table-busy>
                        <div class="text-center text-muted my-2">
                          <b-spinner class="align-middle"></b-spinner>
                          <strong>{{ __('loading') }}...</strong>
                        </div>
                      </template>

                      <template #empty="scope">
                        <div class="text-center text-muted py-4"><i class="fa fa-clock-o fa-2x d-block mb-2"></i>{{ scope.emptyText }}</div>
                      </template>
                      <template #emptyfiltered="scope">
                        <div class="text-center text-muted py-4"><i class="fa fa-search fa-2x d-block mb-2"></i>{{ scope.emptyFilteredText }}</div>
                      </template>

                      <template #cell(status)="row">
                        <span class="figma-status-pill"
                          :class="row.item.status == 1 ? 'status-delivered' : 'status-cancelled'">
                          {{ row.item.status == 1 ? __('active') : __('deactive') }}
                        </span>
                      </template>

                      <template #cell(is_free_delivery)="row">
                        <span class="figma-status-pill"
                          :class="row.item.is_free_delivery == 1 ? 'status-delivered' : 'status-default'">
                          {{ row.item.is_free_delivery == 1 ? __('yes') : __('no') }}
                        </span>
                      </template>

                      <template #cell(slot_type)="row">
                        <span class="figma-status-pill"
                          :class="row.item.slot_type === 'express' ? 'status-delivered' : 'status-default'">
                          {{ row.item.slot_type === 'express' ? (__('express') || 'Quick Delivery') : (__('fixed') || 'Fixed') }}
                        </span>
                      </template>
                      <template #cell(from_time)="row">
                        <template v-if="row.item.slot_type === 'express'">
                          {{ (row.item.duration_minutes || '—') + ' ' + (__('min') || 'min') }}
                        </template>
                        <template v-else>{{ timeSlotTimeLabel(row.item, 'from_time') }}</template>
                      </template>
                      <template #cell(to_time)="row">
                        <template v-if="row.item.slot_type === 'express'">—</template>
                        <template v-else>{{ timeSlotTimeLabel(row.item, 'to_time') }}</template>
                      </template>
                      <template #cell(last_order_time)="row">
                        <template v-if="row.item.slot_type === 'express' && !row.item.last_order_time">—</template>
                        <template v-else>{{ timeSlotTimeLabel(row.item, 'last_order_time') }}</template>
                      </template>

                      <template #cell(actions)="row">
                        <div class="d-flex gap-2 justify-content-center">
                          <button class="figma-action-btn" @click="edit_record = row.item"
                            v-if="$can('time_slot_update')" v-b-tooltip.hover.top.viewport.noninteractive :title="__('edit')">
                            <base-icon name="edit icon" hoverName="edit Hover" width="24" height="24" />
                          </button>
                          <button class="figma-action-btn figma-delete-btn"
                            @click="deleteTimeSlots(row.index, row.item.id)" v-if="$can('time_slot_delete')"
                            v-b-tooltip.hover.top.viewport.noninteractive :title="__('delete')">
                            <base-icon name="Type=Default" hoverName="Type=Hover" width="24" height="24" />
                          </button>
                        </div>
                      </template>
                    </b-table>
                  </div>

                  <div class="figma-table-footer flex-wrap gap-3 mt-4" v-if="timeSlot_settingsObject.time_slot_type !== 'express'">
                    <div class="d-flex align-items-center gap-2">
                      <label class="showing-results-text mb-0">{{ __('per_page') }}</label>
                      <b-form-select v-model="perPage" :options="pageOptions" size="sm"
                        class="w-auto"></b-form-select>
                                <table-count :current-page="currentPage" :per-page="perPage" :total-rows="totalRows"></table-count>
                    </div>
                    <div class="d-flex align-items-center gap-3">
                      <b-pagination v-model="currentPage" :total-rows="totalRows" :per-page="perPage" align="right"
                        class="figma-pagination mb-0" hide-goto-end-buttons hide-ellipsis prev-text="<"
                        next-text=">"></b-pagination>
                    </div>
                  </div>
                  </div>
                  </div>
                </div>
      </div>
    </div>

    <!-- Add / Edit -->
    <app-edit-record v-if="edit_record" :record="edit_record" :global-slot-type="timeSlot_settingsObject.time_slot_type"
      @modalClose="edit_record = null"></app-edit-record>
  </div>
</template>
<script>
import { VuejsDatatableFactory } from "vuejs-datatable";
import EditRecord from "./Edit.vue";

export default {
  components: {
    VuejsDatatableFactory,
    "app-edit-record": EditRecord,
  },
  data: function () {
    return {
      fields: [
        { key: "id", label: __('id'), sortable: true, sortDirection: "desc" },
        { key: "title", label: __('title'), sortable: true, sortDirection: "desc", class: "text-center" },
        { key: "slot_type", label: __('slot_type') || 'Slot Type', sortable: true, sortDirection: "desc", class: "text-center" },
        { key: "from_time", label: __('from_time'), sortable: true, sortDirection: "desc", class: "text-center" },
        { key: "to_time", label: __('to_time'), sortable: true, sortDirection: "desc", class: "text-center" },
        { key: "last_order_time", label: __('last_order_time'), sortable: true, sortDirection: "desc", class: "text-center" },
        { key: "status", label: __('status'), sortable: true, sortDirection: "desc", class: "text-center" },
        { key: "is_free_delivery", label: __('free_delivery'), sortable: true, sortDirection: "desc", class: "text-center" },
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

      time_slots: [],
      isLoading: false,
      sectionStyle: "style_1",
      max_visible_categories: 12,
      max_col_in_single_row: 3,
      edit_record: null,


      is_time_slots_enabled: false,
      delivery_starts_from: "",
      allowed_days: 1,

      timeSlot_settingsObject: {
        time_slots_is_enabled: false,
        time_slot_type: 'fixed',
      },
      timeSlot_settings: {},
      oneSellerCart: false,
      validationNoOfDaysError: null,
      validationNoOfEstimateDaysError: null,
      currentLanguageId: null,
      activeLanguages: [],
    };
  },
  computed: {
    // Table only shows slots matching the currently selected Slot Type radio - a Fixed slot
    // has no meaning while managing Quick Delivery (and vice versa).
    filteredTimeSlots() {
      return this.time_slots.filter(slot => slot.slot_type === this.timeSlot_settingsObject.time_slot_type);
    },
    // Quick Delivery is one "ready in N minutes" setting per module, not a set of windows to
    // pick between - only one express slot may exist, so hide "Add" once one is already there.
    quickDeliverySlotExists() {
      return this.timeSlot_settingsObject.time_slot_type === 'express' && this.filteredTimeSlots.length > 0;
    },
    translatedTimeSlots() {
      if (!this.currentLanguageId || this.filteredTimeSlots.length === 0) {
        return this.filteredTimeSlots;
      }

      return this.filteredTimeSlots.map(slot => {
        const translatedSlot = { ...slot };

        if (slot.translations && Array.isArray(slot.translations)) {
          const translation = slot.translations.find(
            t => t.language_id === this.currentLanguageId
          );

          if (translation && translation.title && translation.title.trim() !== '') {
            translatedSlot.title = translation.title;
          }
        }

        return translatedSlot;
      });
    },
    showingEnd() {
      return Math.min(this.currentPage * this.perPage, this.totalRows);
    },
    // Quick Delivery has no window to close - it's ready N minutes after the order, not a
    // from/to range - so the To Time column has nothing to show and is dropped entirely.
    visibleFields() {
      return this.timeSlot_settingsObject.time_slot_type === 'express'
        ? this.fields.filter(f => f.key !== 'to_time')
        : this.fields;
    },
    sortOptions() {
      // Create an options list from our fields
      return this.visibleFields
        .filter((f) => f.sortable)
        .map((f) => {
          return { text: f.label, value: f.key };
        });
    },
  },
  created: function () {
    this.$eventBus.$on("TimeSlotsSaved", (message) => {
      this.showMessage("success", message);
      this.getTimeSlots();
    });

    this.fetchActiveLanguages().then(() => {
      this.getTimeSlots();
    });

    this.getTimeSlotsSettings();
  },
  watch: {
    filteredTimeSlots: {
      immediate: true,
      handler(list) {
        this.totalRows = list.length;
        this.currentPage = 1;
      }
    },
    perPage() {
      this.currentPage = 1;
    }
  },
  methods: {
    tr(key, fallback) { const v = this.__(key); return v && v !== key ? v : fallback; },
    /**
     * List: show store-formatted time from API (*_display). Edit modal still uses raw HH:mm fields on the same row.
     */
    timeSlotTimeLabel(item, field) {
      if (!item) return '';
      const displayKey = `${field}_display`;
      const v = item[displayKey];
      if (v !== undefined && v !== null && String(v).trim() !== '') {
        return v;
      }
      return item[field] != null ? item[field] : '';
    },
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
        .catch(err => {
          console.error('Language load error', err);
        });
    }
    ,
    validateNoOfDays() {
      if (this.timeSlot_settingsObject.time_slots_allowed_days < 1) {
        this.validationNoOfDaysError = "No of Users must be integer value.";
        this.timeSlot_settingsObject.time_slots_allowed_days = "";
      } else {
        this.validationNoOfDaysError = null;
      }
    },
    validateNoOfEstimateDays() {
      if (this.timeSlot_settingsObject.delivery_estimate_days < 1) {
        this.validationNoOfEstimateDaysError = "No of Users must be integer value.";
        this.timeSlot_settingsObject.delivery_estimate_days = "";
      } else {
        this.validationNoOfEstimateDaysError = null;
      }
    },
    getTimeSlots() {
      this.isLoading = true;
      axios.get(this.$apiUrl + "/delivery_settings").then((response) => {
        this.isLoading = false;
        let data = response.data;
        this.time_slots = data.data;
      });
    },
    deleteTimeSlots(index, id) {
      this.$swal
        .fire({
          title: "Are you Sure?",
          text: "You want be able to revert this",
          confirmButtonText: "Yes, Sure",
          cancelButtonText: "Cancel",
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
              .post(this.$apiUrl + "/delivery_settings/delete", postData)
              .then((response) => {
                this.isLoading = false;
                let data = response.data;
                this.time_slots.splice(index, 1);
                this.showMessage("success", data.message);
              });
          }
        });
    },
    getTimeSlotsSettings() {
      axios.get(this.$apiUrl + "/delivery_settings/getTimeSlotsSettings").then((response) => {
        let data = response.data.data;
        this.timeSlot_settingsObject = data.timeSlot_settingsObject;
        this.oneSellerCart = Number(data.one_seller_cart) === 1;
        // Normalize to 1/0 regardless of how it was saved previously (boolean "true"/"false"
        // strings from an old save, or "1"/"0") - every v-if in this form checks == 1.
        const enabledRaw = this.timeSlot_settingsObject.time_slots_is_enabled;
        this.timeSlot_settingsObject.time_slots_is_enabled =
          (enabledRaw === true || enabledRaw === 1 || enabledRaw === '1' || enabledRaw === 'true') ? 1 : 0;
        this.timeSlot_settings = response.data.data.timeSlot_settings;
        this.timeSlot_settings.map((item, index) => {
          if (item.value === 'false' || item.value === 'true') {
            this.timeSlot_settingsObject[item.variable] = (item.value === 'false') ? false : true;
          } else {
            this.timeSlot_settingsObject[item.variable] = item.value;
          }
        });
      });
    },
    addTimeSlotsSettings() {
      this.isLoading = true;
      let timeSlot_settingsObject = this.timeSlot_settingsObject;
      let formData = new FormData();
      for (let key in timeSlot_settingsObject) {
        formData.append(key, timeSlot_settingsObject[key]);
      }
      axios.post(this.$apiUrl + "/delivery_settings/saveTimeSlotsSettings", formData)
        .then((response) => {
          let data = response.data;
          if (data.status === 1) {
            this.getTimeSlotsSettings();
            this.isLoading = false;
            this.showMessage("success", data.message);
          } else {
            this.isLoading = false;
            this.showMessage("error", data.message);
          }
        });
    },
  },
  beforeDestroy() {
    this.$eventBus.$off('TimeSlotsSaved');
  }
};
</script>

<style>
/* Time slot config card (left) and slot list card (right) */
.timeslot-refresh-btn {
  width: 38px;
  padding: 0 !important; /* global .btn-figma-filter padding is !important */
}

/* Selected slot type: BootstrapVue marks the checked button with .active (global outline style has no .active state) */
.slot-type-group > .btn.btn-outline-primary.active {
  background: var(--theme-primary-500) !important; /* beats global !important outline background */
  border-color: var(--theme-primary-500) !important;
  color: var(--theme-neutral-50) !important;
}

/* Button-style radio group: hide the native radio circles at every width */
.slot-type-group input[type="radio"] {
  position: absolute;
  opacity: 0;
  pointer-events: none;
}

/* Unscoped on purpose: the toggle buttons are rendered inside BootstrapVue's b-form-radio-group,
   outside this component's scope. Phones: slot-type toggle fills the row (two equal halves, no stray radio circles), and the
   "Add New Time Slot" button takes the free width beside a fixed-size refresh button instead
   of being squeezed into a narrow half-width cell. */
@media (max-width: 575.98px) {
  .slot-type-group {
    display: flex;
    width: 100%;
  }

  .slot-type-group > .btn {
    flex: 1 1 0;
    min-width: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
  }


  .timeslot-list-col .figma-action-bar-row > .timeslot-actions {
    display: flex !important;
    flex-wrap: nowrap;
    gap: 8px !important;
  }

  .timeslot-actions > .timeslot-add-btn {
    flex: 1 1 auto;
    width: auto;
  }

  .timeslot-actions > .timeslot-refresh-btn {
    flex: 0 0 38px;
  }
}
</style>
