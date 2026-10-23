<template>
  <b-modal :key="id" ref="my-modal" :title="modal_title" @hidden="$emit('modalClose')" scrollable no-close-on-backdrop
    no-fade static size="lg">

    <div slot="modal-footer" class="d-flex justify-content-end flex-wrap gap-2 w-100">
      <b-button variant="outline-secondary" @click="hideModal">{{ __('cancel') }}</b-button>
      <b-button variant="primary" @click="$refs['dummy_submit'].click()" :disabled="isLoading">
        {{ __('save') }}
        <b-spinner v-if="isLoading" small label="Spinning"></b-spinner>
      </b-button>
    </div>

    <form ref="my-form" @submit.prevent="saveRecord" novalidate>

      <!-- Language Tabs with lazy (same as Category Edit - only active tab in DOM to avoid "not focusable") -->
      <b-tabs :key="tabsKey" v-if="languages.length" v-model="activeTab" content-class="mt-3">
        <b-tab v-for="(lang, index) in languages" :key="lang.id" :title="lang.name" :active="lang.is_default == 1">

          <!-- Translate buttons -->
          <div class="d-flex flex-wrap gap-2 mb-3" v-if="lang.is_default && languages.length > 1">
            <b-button size="sm" variant="outline-primary" @click="translateEmpty(lang)" v-b-tooltip.hover
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
              <label>{{ __('name') }} <i class="text-danger" v-if="lang.is_default">*</i></label>
              <input type="text" class="form-control" v-model="form[lang.id].name" :placeholder="__('enter_name')"
                :required="lang.is_default ? true : undefined">
            </div>

            <div class="form-group col-12" v-if="lang.is_default">
              <label>{{ __('image') }} <i class="text-danger" v-if="lang.is_default">*</i></label>
              <input type="file" id="brand_image" ref="file_image" class="d-none" accept="image/*" @change="handleFileUpload">

              <label for="brand_image" class="file-input-div bg-gray-100" @drop="dropFile" @dragover.prevent
                @dragenter.prevent>
                <template v-if="image && image.name">
                  {{ __('selected_file_name') }}: {{ image.name }}
                </template>
                <template v-else>
                  <i class="fa fa-cloud-upload-alt fa-2x"></i><br>
                  {{ __('drop_files_here_or_click_to_upload') }}
                </template>
              </label>

              <div v-if="error" class="text-danger mt-1">{{ error }}</div>

              <div v-if="image_url" class="mt-2">
                <img :src="image_url" class="custom-image" />
              </div>
            </div>

            <div class="form-group col-md-6" v-if="lang.is_default && globalColors && globalColors.brand_background_color_mode === 'item-wise'">
              <label>{{ __('background_color_for_light_theme') }}</label>
              <div class="color-field d-flex">
                <input type="text" class="form-control" v-model="background_color_for_light_theme">
                <input type="color" class="form-control cursor-pointer color-swatch" :value="(background_color_for_light_theme && background_color_for_light_theme.startsWith('#') && (background_color_for_light_theme.length === 4 || background_color_for_light_theme.length === 7 || background_color_for_light_theme.length === 9)) ? background_color_for_light_theme.substring(0, 7) : '#ffffff'" @input="background_color_for_light_theme = $event.target.value">
                <b-button size="sm" variant="outline-secondary" @click="background_color_for_light_theme = '#ffffff00'">
                  {{ __('transparent') || 'Transparent' }}
                </b-button>
              </div>
              <small class="text-muted d-block mt-1">Note: Plain bg and bg less that's bg set perfectly category wise. That selected bg set in app and web cat image bg colur.</small>
            </div>
            <div class="form-group col-md-6" v-if="lang.is_default && globalColors && globalColors.brand_background_color_mode === 'item-wise'">
              <label>{{ __('background_color_for_dark_theme') }}</label>
              <div class="color-field d-flex">
                <input type="text" class="form-control" v-model="background_color_for_dark_theme">
                <input type="color" class="form-control cursor-pointer color-swatch" :value="(background_color_for_dark_theme && background_color_for_dark_theme.startsWith('#') && (background_color_for_dark_theme.length === 4 || background_color_for_dark_theme.length === 7 || background_color_for_dark_theme.length === 9)) ? background_color_for_dark_theme.substring(0, 7) : '#000000'" @input="background_color_for_dark_theme = $event.target.value">
                <b-button size="sm" variant="outline-secondary" @click="background_color_for_dark_theme = '#00000000'">
                  {{ __('transparent') || 'Transparent' }}
                </b-button>
              </div>
              <small class="text-muted d-block mt-1">Note: Plain bg and bg less that's bg set perfectly category wise. That selected bg set in app and web cat image bg colur.</small>
            </div>

            <div class="form-group col-12 mb-0" v-if="id && lang.is_default">
              <label class="d-block">{{ __('status') }}</label>
              <div class="text-left mt-1">
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
import TranslationHelper from '../../../mixins/TranslationHelper.js';

export default {
  mixins: [TranslationHelper],
  props: ['record', 'globalColors'],
  data() {
    return {
      id: null,
      status: 1,
      languages: [],
      defaultLanguageId: null,
      activeTab: 0,
      form: {},
      image: "",
      image_url: "",
      background_color_for_light_theme: null,
      background_color_for_dark_theme: null,
      error: null,
      isLoading: false,
      tabsKey: 0,

      // Translate buttons
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
          // Only load brand data if languages are already loaded
          if (this.languages.length > 0) {
            this.loadBrandWithTranslations();
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
      return this.id ? __('edit_brand') : __('add_brand');
    }
  },
  methods: {
    resetForm() {
      this.form = {};
      this.image = "";
      this.image_url = "";
      this.background_color_for_light_theme = this.globalColors?.brand_background_color_light_theme || null;
      this.background_color_for_dark_theme = this.globalColors?.brand_background_color_dark_theme || null;
      this.status = 1;
      this.activeTab = 0;

      // re-init empty translations
      this.languages.forEach(lang => {
        this.$set(this.form, lang.id, { name: '' });
      });
    }
    ,
    showModal() {
      this.$refs['my-modal'].show();
    },
    hideModal() {
      this.$refs['my-modal'].hide();
    },
    dropFile(event) {
      event.preventDefault();
      this.$refs.file_image.files = event.dataTransfer.files;
      this.setImageFile(event.dataTransfer.files[0]);
    },
    handleFileUpload(e) {
      this.setImageFile(e.target.files[0]);
    },
    setImageFile(file) {
      if (!file) return;

      this.error = null;

      const validTypes = [
        "image/jpeg",
        "image/png",
        "image/jpg",
        "image/gif",
        "image/webp"
      ];

      if (!validTypes.includes(file.type)) {
        this.error = __('invalid_image_type');
        return;
      }

      if (file.size > 2 * 1024 * 1024) {
        this.error = __('image_must_be_less_than_2mb');
        return;
      }

      this.image = file;
      this.image_url = URL.createObjectURL(file);
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

          // Initialize form for all languages
          this.initializeForm();

          // Load brand data if id exists (after languages are loaded)
          if (this.id) {
            return this.loadBrandWithTranslations();
          }
        });
    },
    loadBrandWithTranslations() {
      if (!this.id) return;

      // Ensure languages are loaded first - if not, wait for them
      if (!this.languages.length) {
        return this.loadLanguages();
      }

      return axios.get(this.$apiUrl + '/products/brands', { params: { id: this.id } }).then(res => {
        const brand = Array.isArray(res.data.data) ? res.data.data[0] : res.data.data;

        if (!brand) {
          console.error('Brand not found');
          return;
        }

        this.status = brand.status;
        this.image_url = brand.image_url || "";
        this.background_color_for_light_theme = brand.background_color_for_light_theme || this.globalColors?.brand_background_color_light_theme || null;
        this.background_color_for_dark_theme = brand.background_color_for_dark_theme || this.globalColors?.brand_background_color_dark_theme || null;

        // Ensure all languages are initialized first
        this.initializeForm();

        // Process translations with fallback logic
        this.languages.forEach(lang => {
          const translation = Array.isArray(brand.translations)
            ? brand.translations.find(t => t.language_id === lang.id)
            : null;

          if (lang.is_default) {
            // For default language, use translation if exists, otherwise fallback to main table data
            this.$set(this.form, lang.id, {
              name: (translation && translation.name && translation.name.trim() !== '')
                ? translation.name
                : (brand.name || ''),
            });
          } else {
            // For other languages, use translation if exists, otherwise empty
            this.$set(this.form, lang.id, {
              name: (translation && translation.name) ? translation.name : '',
            });
          }
        });

        this.tabsKey++;
      });
    },
    validateDefaultLanguage() {
      if (!this.defaultLanguageId) {
        this.showError(__('default_language_not_found'));
        return false;
      }

      const defaultForm = this.form[this.defaultLanguageId];

      // Check required fields for default language
      if (!defaultForm.name || defaultForm.name.trim() === '') {
        this.showError(__('please_fill_name_in_default_language') || __('please_fill_name_in_default_language'));
        this.switchToDefaultLanguageTab();
        return false;
      }

      // Check image for new brands
      if (!this.id && !this.image && !this.image_url) {
        this.showError(__('please_upload_brand_image') || __('please_upload_image'));
        this.switchToDefaultLanguageTab();
        return false;
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
        this.showError(__('please_fill_default_language_required_fields'));
        this.activeTab = defaultLangIndex;
      }
    },

    saveRecord() {
      if (!this.validateDefaultLanguage()) return;
      const isUpdate = !!this.id; // check before saving
      this.isLoading = true;

      const languagesToSave = [];
      const defaultLang = this.languages.find(l => l.is_default);
      if (defaultLang) languagesToSave.push(defaultLang);

      this.languages.forEach(lang => {
        if (lang.is_default) return;
        const name = this.form[lang.id].name;
        if (name && name.trim() !== '') languagesToSave.push(lang);
      });

      const saveSequentially = async () => {
        let brandId = this.id;

        for (const lang of languagesToSave) {
          let fd = new FormData();
          if (brandId) fd.append('id', brandId);

          fd.append('language_id', lang.id);
          fd.append('name', this.form[lang.id].name);
          fd.append('status', this.status);
          if (this.background_color_for_light_theme) fd.append('background_color_for_light_theme', this.background_color_for_light_theme);
          if (this.background_color_for_dark_theme) fd.append('background_color_for_dark_theme', this.background_color_for_dark_theme);

          if (lang.is_default && this.image) fd.append('image', this.image);

          const url = brandId
            ? this.$apiUrl + '/products/brands/update'
            : this.$apiUrl + '/products/brands/save';

          const res = await axios.post(url, fd);

          if (!brandId && res.data.data?.id) brandId = res.data.data.id;
        }
        return brandId; //change 
      };


      saveSequentially()
        .then(async (brandId) => {
          const message = isUpdate
            ? __('brand_updated_successfully')
            : __('brand_saved_successfully');

          this.$emit('saved', message);

          this.id = brandId;
          await this.loadBrandWithTranslations();
          this.tabsKey++;
          this.hideModal();
        })

        .finally(() => this.isLoading = false);
    }
  },
  mounted() {

    this.loadLanguages();
    this.resetForm(); // here change 2 
    this.showModal();
  }
};
</script>
<style scoped>
.image_preview {
  margin-top: 5px;
}

.color-field {
  gap: 8px;
  align-items: center;
}

.color-field .color-swatch {
  flex: 0 0 56px;
  max-width: 56px;
  padding: 4px;
}

.color-field .btn {
  white-space: nowrap;
}
</style>