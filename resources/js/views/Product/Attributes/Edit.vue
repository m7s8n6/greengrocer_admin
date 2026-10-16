<template>
  <b-modal :key="id" ref="my-modal" :title="modal_title" @hidden="$emit('modalClose')" scrollable no-close-on-backdrop
    no-fade static>

    <div slot="modal-footer">
      <b-button variant="primary" @click="$refs['dummy_submit'].click()" :disabled="isLoading">
        {{ __('save') }}
        <b-spinner v-if="isLoading" small label="Spinning"></b-spinner>
      </b-button>
      <b-button variant="secondary" @click="hideModal">{{ __('cancel') }}</b-button>
    </div>

    <form ref="my-form" @submit.prevent="saveRecord" novalidate>

      <!-- Language Tabs -->
      <b-tabs :key="tabsKey" v-if="languages.length" v-model="activeTab" content-class="mt-3">
        <b-tab v-for="(lang, index) in languages" :key="lang.id" :title="lang.name" :active="lang.is_default == 1">

          <!-- Translate buttons (attribute name only) -->
          <div class="mb-3" v-if="lang.is_default && languages.length > 1">
            <b-button size="sm" variant="outline-primary" class="mr-2" @click="translateEmpty(lang)" v-b-tooltip.hover
              :title="__('only_empty_fields_will_be_translated_existing_content_will_not_be_changed')"
              :disabled="loadingEmpty">
              <span v-if="!loadingEmpty">{{ __('translate_empty_fields') }}</span>
              <b-spinner v-else small></b-spinner>
            </b-button>

            <b-button size="sm" variant="outline-danger" @click="translateOverwrite(lang)" v-b-tooltip.hover
              :title="__('all_fields_will_be_translated_and_existing_content_will_be_overwritten')"
              :disabled="loadingOverwrite">
              <span v-if="!loadingOverwrite">{{ __('translate_and_overwrite') }}</span>
              <b-spinner v-else small></b-spinner>
            </b-button>
          </div>
          <!-- Translate buttons END -->

          <div class="row">
            <div class="form-group col-12">
              <label>{{ __('name') }}</label>
              <i class="text-danger" v-if="lang.is_default">*</i>
              <input type="text" class="form-control" v-model="form[lang.id].name" :placeholder="__('enter_name')"
                :required="lang.is_default ? true : undefined">
            </div>

            <!-- Type (not translatable; applies to the whole attribute, not per value) -->
            <div class="form-group col-12" v-if="lang.is_default">
              <label>{{ __('type') }}</label>
              <i class="text-danger">*</i>
              <select class="form-control" v-model="type" style="max-width: 260px;">
                <option value="text">{{ __('text') }}</option>
                <option value="color">{{ __('colour') }}</option>
                <option value="image">{{ __('image') }}</option>
              </select>
              <small class="text-muted">{{ __('type_applies_to_the_whole_attribute_not_per_value') }}</small>
            </div>

            <!-- Values (not translatable; managed on the default language tab) -->
            <div class="form-group col-12" v-if="lang.is_default">
              <label>{{ __('values') }}</label>
              <i class="text-danger">*</i>

              <div class="d-flex mb-1" style="gap: 8px;">
                <small class="text-muted" style="width: 40%;">{{ __('value') }}</small>
                <small v-if="type === 'text'" class="text-muted flex-grow-1" style="text-align: left;">{{ __('short_code') }}</small>
                <small v-if="type === 'color'" class="text-muted flex-grow-1" style="text-align: left;">{{ __('colour') }}</small>
                <small v-if="type === 'image'" class="text-muted flex-grow-1" style="text-align: left;">{{ __('image') }}</small>
                <span style="width: 38px;"></span>
              </div>

              <div v-for="(val, idx) in values" :key="val.uid" class="d-flex align-items-center mb-2"
                style="gap: 8px;">
                <input type="text" class="form-control" style="width: 40%;" v-model="val.value"
                  :placeholder="__('enter_value')" required>

                <input v-if="type === 'text'" type="text" class="form-control flex-grow-1"
                  v-model="val.short_code" :placeholder="__('enter_short_code')" required>

                <div v-if="type === 'color'" class="d-flex align-items-center flex-grow-1">
                  <input type="color" v-model="val.color_code" class="color-swatch-input">
                </div>

                <div v-if="type === 'image'" class="d-flex align-items-center gap-2 flex-grow-1">
                  <img v-if="val.image_url" :src="val.image_url" class="img-thumbnail" style="width: 32px; height: 32px; object-fit: cover; flex-shrink: 0;">
                  <input type="file" accept="image/*" class="form-control form-control-sm"
                    @change="onValueImageChange($event, idx)">
                </div>

                <b-button v-if="values.length > 1" variant="outline-danger" size="sm" @click="removeValue(idx)"
                  v-b-tooltip.hover :title="__('delete')">
                  <i class="fa fa-times"></i>
                </b-button>
              </div>

              <b-button variant="outline-primary" size="sm" @click="addValue()">
                <i class="fa fa-plus"></i> {{ __('add_value') }}
              </b-button>
            </div>

            <!-- Category assignment (seller only - admin assigns attributes to a category from
                 the Category edit page instead). Restricted server-side to the seller's own
                 allowed categories regardless of what's checked here. -->
            <div class="form-group col-12" v-if="isSeller && lang.is_default">
              <label>{{ __('categories') }}</label>
              <small class="text-muted d-block mb-1">Assign this attribute to your own categories</small>
              <div v-if="sellerCategories.length" class="d-flex flex-wrap" style="gap: 10px;">
                <b-form-checkbox v-for="cat in sellerCategories" :key="cat.id" v-model="selectedCategoryIds"
                  :value="cat.id" class="category-checkbox">
                  {{ cat.name }}
                </b-form-checkbox>
              </div>
              <small v-else class="text-muted">No categories assigned to you yet - ask admin to assign one.</small>
            </div>

            <div class="form-group col-12" v-if="id && lang.is_default">
              <label>{{ __('status') }}</label>
              <div class="col-md-9 text-left mt-1">
                <b-form-radio-group v-model="status" :options="[
                  { text: __('deactivate'), 'value': 0 },
                  { text: __('activate'), 'value': 1 }
                ]" buttons button-variant="outline-primary" required></b-form-radio-group>
              </div>
            </div>

          </div>
        </b-tab>
      </b-tabs>

      <button ref="dummy_submit" style="display:none;"></button>

    </form>
  </b-modal>
</template>

<script>
import axios from 'axios';
import Auth from '../../../Auth.js';
import TranslationHelper from '../../../mixins/TranslationHelper.js';

export default {
  mixins: [TranslationHelper],
  props: ['record'],
  data() {
    return {
      id: null,
      status: 1,
      type: 'text',
      languages: [],
      defaultLanguageId: null,
      activeTab: 0,
      form: {},
      values: [],
      error: null,
      isLoading: false,
      tabsKey: 0,
      sellerCategories: [],
      selectedCategoryIds: [],

      // Translate buttons (attribute name)
      translatableFields: ['name'],
      loadingEmpty: false,
      loadingOverwrite: false,
    };
  },
  watch: {
    record: {
      immediate: true,
      deep: true,
      handler(newVal) {
        if (newVal && newVal.id) {
          this.id = newVal.id;
          this.resetForm();
          if (this.languages.length > 0) {
            this.loadAttributeWithTranslations();
          }
        } else {
          this.id = null;
          this.resetForm();
        }
      }
    }
  },
  computed: {
    modal_title() {
      return this.id ? __('edit_attribute') : __('add_attribute');
    },
    isSeller() {
      return !!(Auth.user && Auth.user.role && Auth.user.role.name === 'Seller' && Auth.user.seller !== null);
    },
  },
  methods: {
    loadSellerCategories() {
      if (!this.isSeller) return;
      // Same endpoint the seller's own "Manage Categories" page uses - already scoped
      // server-side to just the categories assigned to this seller.
      axios.get(this.$sellerApiUrl + '/seller_categories_list').then(res => {
        this.sellerCategories = res.data.data || [];
      });
    },
    uid() {
      return '_' + Math.random().toString(36).slice(2);
    },
    resetForm() {
      this.form = {};
      this.status = 1;
      this.type = 'text';
      this.activeTab = 0;

      this.languages.forEach(lang => {
        this.$set(this.form, lang.id, { name: '' });
      });

      // Start with a single empty value row
      this.values = [this.blankValue()];
      this.selectedCategoryIds = [];
    },
    blankValue() {
      return {
        uid: this.uid(), id: null, value: '', short_code: '',
        color_code: '#000000', image: null, image_url: null,
      };
    },
    showModal() {
      this.$refs['my-modal'].show();
    },
    hideModal() {
      this.$refs['my-modal'].hide();
    },
    addValue() {
      this.values.push(this.blankValue());
    },
    onValueImageChange(event, index) {
      const file = event.target.files && event.target.files[0];
      if (!file) return;
      this.values[index].image = file;
      this.values[index].image_url = URL.createObjectURL(file);
    },
    removeValue(index) {
      if (this.values.length <= 1) return;
      const val = this.values[index];

      // A saved value (has an id) may already back a live product variant - the backend
      // silently keeps it (FK is RESTRICT) instead of deleting, which would otherwise
      // confuse the admin ("I removed it but it's still there after reload").
      if (val.id) {
        this.$swal.fire({
          title: __('are_you_sure'),
          text: __('removing_a_value_already_used_by_a_product_variant_will_not_delete_it'),
          confirmButtonText: __('yes_sure'),
          cancelButtonText: __('cancel'),
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#37a279',
          cancelButtonColor: '#d33',
        }).then(result => {
          if (result.value) this.values.splice(index, 1);
        });
        return;
      }

      this.values.splice(index, 1);
    },
    initializeForm() {
      this.languages.forEach(lang => {
        if (!this.form[lang.id]) {
          this.$set(this.form, lang.id, { name: '' });
        }
      });
    },
    loadLanguages() {
      return axios.get(this.$apiUrl + '/active_languages')
        .then(res => {
          this.languages = res.data.data;

          const defaultLang = this.languages.find(l => l.is_default);
          this.defaultLanguageId = defaultLang?.id || null;

          this.initializeForm();

          if (this.id) {
            return this.loadAttributeWithTranslations();
          }
        });
    },
    loadAttributeWithTranslations() {
      if (!this.id) return;

      if (!this.languages.length) {
        return this.loadLanguages();
      }

      return axios.get(this.$apiUrl + '/products/attributes', { params: { id: this.id } }).then(res => {
        const attribute = Array.isArray(res.data.data) ? res.data.data[0] : res.data.data;

        if (!attribute) {
          console.error('Attribute not found');
          return;
        }

        this.status = attribute.status;
        this.type = attribute.type || 'text';

        this.initializeForm();

        // Attribute name per language (fallback to base for default language)
        this.languages.forEach(lang => {
          const translation = Array.isArray(attribute.translations)
            ? attribute.translations.find(t => t.language_id === lang.id)
            : null;

          if (lang.is_default) {
            this.$set(this.form, lang.id, {
              name: (translation && translation.name && translation.name.trim() !== '')
                ? translation.name
                : (attribute.name || ''),
            });
          } else {
            this.$set(this.form, lang.id, {
              name: (translation && translation.name) ? translation.name : '',
            });
          }
        });

        // Value rows (not translatable)
        const values = Array.isArray(attribute.values) ? attribute.values : [];
        this.values = values.map(v => ({
          uid: this.uid(),
          id: v.id,
          value: v.value || '',
          short_code: v.short_code || '',
          color_code: v.color_code || '#000000',
          image: null,
          image_url: v.image_url || null,
        }));

        if (this.values.length === 0) {
          this.values = [this.blankValue()];
        }

        this.selectedCategoryIds = Array.isArray(attribute.categories)
          ? attribute.categories.map(c => c.id)
          : [];

        this.tabsKey++;
      });
    },
    validateDefaultLanguage() {
      if (!this.defaultLanguageId) {
        this.showError(__('default_language_not_found'));
        return false;
      }

      const defaultForm = this.form[this.defaultLanguageId];

      if (!defaultForm.name || defaultForm.name.trim() === '') {
        this.showError(__('please_fill_name_in_default_language'));
        this.switchToDefaultLanguageTab();
        return false;
      }

      const filledValues = this.values.filter(v => v.value && v.value.trim() !== '');

      if (filledValues.length === 0) {
        this.showError(__('please_add_at_least_one_value'));
        this.switchToDefaultLanguageTab();
        return false;
      }

      // A "Text" typed attribute's short_code doubles as the measurement-unit abbreviation
      // shown across cart/orders/invoices - blank ones render an empty unit there with no warning.
      if (this.type === 'text') {
        const missing = filledValues.some(v => !v.short_code || v.short_code.trim() === '');
        if (missing) {
          this.showError(__('please_set_a_short_code_for_every_value'));
          this.switchToDefaultLanguageTab();
          return false;
        }
      }

      // A "Colour" or "Image" typed attribute must actually carry the swatch/photo for
      // every value, otherwise the storefront renders a broken/blank chip with no warning.
      if (this.type === 'color') {
        const missing = filledValues.some(v => !v.color_code || v.color_code.trim() === '');
        if (missing) {
          this.showError(__('please_set_a_colour_for_every_value'));
          this.switchToDefaultLanguageTab();
          return false;
        }
      }

      if (this.type === 'image') {
        const missing = filledValues.some(v => !v.image && !v.image_url);
        if (missing) {
          this.showError(__('please_upload_an_image_for_every_value'));
          this.switchToDefaultLanguageTab();
          return false;
        }
      }

      return true;
    },

    validateDefaultLanguageForTranslation() {
      const form = this.$refs['my-form'];
      if (form && !form.reportValidity()) {
        this.$nextTick(() => this.switchToDefaultLanguageTab());
        return false;
      }
      return this.validateDefaultLanguage();
    },

    switchToDefaultLanguageTab() {
      const defaultLangIndex = this.languages.findIndex(lang => lang.id === this.defaultLanguageId);
      if (defaultLangIndex !== -1) {
        this.activeTab = defaultLangIndex;
      }
    },

    saveRecord() {
      if (!this.validateDefaultLanguage()) return;
      const isUpdate = !!this.id;
      this.isLoading = true;

      // Only keep value rows that actually have text (values are not translatable)
      const values = this.values.filter(v => v.value && v.value.trim() !== '');

      // FormData (not plain JSON) so per-value image files can be uploaded alongside the rest.
      const formData = new FormData();
      formData.append('status', this.status);
      formData.append('type', this.type);
      if (this.id) formData.append('id', this.id);

      this.languages.forEach(lang => {
        formData.append(`translations[${lang.id}][name]`, this.form[lang.id].name || '');
      });

      values.forEach((v, index) => {
        if (v.id) formData.append(`values[${index}][id]`, v.id);
        formData.append(`values[${index}][sequence]`, index);
        formData.append(`values[${index}][value]`, v.value.trim());
        formData.append(`values[${index}][short_code]`, (v.short_code && v.short_code.trim() !== '') ? v.short_code.trim() : '');
        if (this.type === 'color') {
          formData.append(`values[${index}][color_code]`, v.color_code || '');
        }
        if (this.type === 'image' && v.image) {
          formData.append(`values[${index}][image]`, v.image);
        }
      });

      if (this.isSeller) {
        // FormData drops an empty array entirely, so category_ids would be absent (= "leave
        // assignment untouched") even when the seller deliberately unchecked everything -
        // this flag tells the backend the field was actually submitted.
        formData.append('category_ids_provided', '1');
        this.selectedCategoryIds.forEach(catId => formData.append('category_ids[]', catId));
      }

      const url = this.id
        ? this.$apiUrl + '/products/attributes/update'
        : this.$apiUrl + '/products/attributes/save';

      axios.post(url, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
        .then(res => {
          if (res.data.status === 0) {
            this.showError(res.data.message);
            return;
          }

          const message = isUpdate
            ? __('attribute_updated_successfully')
            : __('attribute_saved_successfully');

          const keptValues = res.data.data?.kept_values;
          if (keptValues && keptValues.length) {
            this.$swal.fire({
              title: __('some_values_were_kept'),
              text: __('these_values_are_used_by_product_variants_and_were_not_removed') + ': ' + keptValues.join(', '),
              icon: 'info',
              confirmButtonColor: '#37a279',
            }).then(() => {
              this.$emit('saved', message);
              this.hideModal();
            });
            return;
          }

          this.$emit('saved', message);
          this.hideModal();
        })
        .catch(error => {
          const msg = error.response?.data?.message || __('something_went_wrong');
          this.showError(msg);
        })
        .finally(() => this.isLoading = false);
    }
  },
  mounted() {
    this.loadLanguages();
    this.resetForm();
    this.loadSellerCategories();
    this.showModal();
  }
};
</script>

<style scoped>
/* Strip the browser's default color-input padding/border so the fill sits centered
   and evenly inset, instead of the native swatch floating off-center in a big box. */
.category-checkbox ::v-deep .custom-control-label {
  margin-left: 8px;
}

.color-swatch-input {
  width: 64px;
  height: 30px;
  padding: 0;
  border: 1px solid #ced4da;
  border-radius: 6px;
  cursor: pointer;
  background: none;
}

.color-swatch-input::-webkit-color-swatch-wrapper {
  padding: 3px;
}

.color-swatch-input::-webkit-color-swatch {
  border: none;
  border-radius: 4px;
}

.color-swatch-input::-moz-color-swatch {
  border: none;
  border-radius: 4px;
}
</style>
