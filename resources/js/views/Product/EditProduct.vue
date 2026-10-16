<template>
    <div>
        <div class="page-heading d-flex justify-content-between align-items-center mb-4">
            <h3 class="mb-0">
                <template v-if="clone">
                    {{ __('clone') }}
                </template>
                <template v-else-if="id">
                    {{ __('edit') }}
                </template>
                <template v-else>
                    {{ __('add') }}
                </template>
                {{ __('product') }}
            </h3>
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb mb-0">
                    <!-- Conditionally render breadcrumb item based on the current route -->
                    <li class="breadcrumb-item" v-if="isSellerRoute">
                        <router-link to="/seller/dashboard">{{ __('dashboard') }}</router-link>
                    </li>
                    <li class="breadcrumb-item" v-else>
                        <router-link to="/dashboard">{{ __('dashboard') }}</router-link>
                    </li>
                    <!-- Conditionally render breadcrumb item based on the current route -->
                    <li class="breadcrumb-item" v-if="isSellerRoute">
                        <router-link to="/seller/manage_products">{{ __('manage_products') }}</router-link>
                    </li>
                    <li class="breadcrumb-item" v-else>
                        <router-link to="/manage_products">{{ __('manage_products') }}</router-link>
                    </li>

                    <li class="breadcrumb-item active" aria-current="page">
                        <template v-if="clone">
                            {{ __('clone') }}
                        </template>
                        <template v-else-if="id">
                            {{ __('edit') }}
                        </template>
                        <template v-else>
                            {{ __('add') }}
                        </template>
                        {{ __('product') }}
                    </li>
                </ol>
            </nav>
        </div>

            <div class="row">
                <div class="col-12 col-md-12 order-md-1 order-last" id="mymodal">
                    <form ref="my-form" @submit.prevent="saveRecord" @keydown.enter="$event.preventDefault()">
                        <div class="card">
                            <div class="card-header">
                                <h4><template v-if="clone">{{ __('clone') }}</template><template v-else-if="id">{{
                                    __('edit') }}</template><template v-else>{{ __('add') }}</template> {{
                                            __('product') }}</h4>
                                <span class="pull-right">
                                    <template v-if="isSellerRole">
                                        <router-link to="/seller/manage_products" class="btn btn-primary"
                                            v-b-tooltip.hover title="Manage Product">{{ __('manage_products')
                                            }}</router-link>
                                    </template>
                                    <template v-else>
                                        <router-link to="/manage_products" class="btn btn-primary" v-b-tooltip.hover
                                            title="Manage Product">{{ __('manage_products') }}</router-link>
                                    </template>
                                </span>
                            </div>
                            <div class="card-body">
                                <!-- Language Tabs -->
                                <div class="col-md-12 mb-3" v-if="languages.length > 0">
                                    <b-tabs v-model="activeLanguageTab" content-class="mt-3">
                                        <b-tab v-for="language in languages" :key="language.id" :title="language.name"
                                            lazy>
                                            <template #title>
                                                <span :class="{ 'text-primary font-weight-bold': language.is_default }">
                                                    {{ language.name }}
                                                </span>
                                            </template>

                                            <!-- Translate buttons -->
                                            <div class="mb-3" v-if="language.is_default && languages.length > 1">
                                                <b-button size="sm" variant="outline-primary" class="mr-2"
                                                    @click="translateEmpty(language)" v-b-tooltip.hover
                                                    :title="__('only_empty_fields_will_be_translated_existing_content_will_not_be_changed')"
                                                    :disabled="loadingEmpty">
                                                    <span v-if="!loadingEmpty">{{ __('translate_empty_fields') }}</span>
                                                    <b-spinner v-else small></b-spinner>
                                                </b-button>

                                                <b-button size="sm" variant="outline-danger"
                                                    @click="translateOverwrite(language)" v-b-tooltip.hover
                                                    :title="__('all_fields_will_be_translated_and_existing_content_will_be_overwritten')"
                                                    :disabled="loadingOverwrite">
                                                    <span v-if="!loadingOverwrite">{{ __('translate_and_overwrite')
                                                        }}</span>
                                                    <b-spinner v-else small></b-spinner>
                                                </b-button>

                                                <div v-if="translateSuccessMessage"
                                                    class="text-success mt-2 font-weight-bold">
                                                    {{ translateSuccessMessage }}
                                                </div>
                                            </div>
                                            <!-- Translate buttons END -->

                                            <div v-if="translations[language.id]">
                                                <div class="row">
                                                    <div class="col-md-6">
                                                        <div class="form-group mb-3">
                                                            <label>{{ __('product_name') }} <i class="text-danger"
                                                                    v-if="language.is_default">*</i></label>
                                                            <input type="text" class="form-control"
                                                                :placeholder="__('enter_product_name')"
                                                                v-model="translations[language.id].name"
                                                                :required="language.is_default ? true : undefined"
                                                                @input="handleDefaultLanguageInput('name', language)">
                                                        </div>
                                                    </div>

                                                    <template v-if="language.is_default">
                                                        <div class="col-md-6">
                                                            <div class="form-group mb-3">
                                                                <label>{{ __('slug') }} <i class="text-danger">*</i></label>
                                                                <input type="text" class="form-control"
                                                                    :placeholder="__('enter_product_slug')" v-model="slug"
                                                                    readonly>
                                                            </div>
                                                        </div>
                                                        <template v-if="isSellerRole">
                                                            <input type="hidden" v-model="seller_id" required>   
                                                        </template>
                                                        <template v-else>
                                                            <div class="col-md-6">
                                                                <div class="form-group mb-3">
                                                                    <label class="control-label" for="seller_id">{{
                                                                        __('seller') }} <i class="text-danger">*</i></label>
                                                                    <select id="seller_id" name="seller_id"
                                                                        class="form-control form-select" v-model="seller_id"
                                                                        required
                                                                        @change="getSellerCategories(); getSeller()">
                                                                        <option value="">{{ __('select_seller') }}</option>
                                                                        <option v-for="seller in translatedSellers"
                                                                            :value="seller.id">{{ seller.name }}
                                                                        </option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                        </template>
                                                        <div class="col-md-6">
                                                            <div class="form-group mb-3">
                                                                <label for="tax_id">{{ __('tax') }}</label>
                                                                <select id="tax_id" name="tax_id"
                                                                    class="form-control" v-model="tax_id">
                                                                    <option value="0">{{ __('select_tax') }}</option>
                                                                    <option v-for="tax in translatedTaxes" :value="tax.id">
                                                                        {{ tax.title }}
                                                                        ({{ tax.percentage }} %)</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div class="col-md-6">
                                                            <div class="form-group mb-3">
                                                                <label for="brands">{{ __('brands') }}</label>
                                                                <multiselect id="brands" v-model="brand" :options="translatedBrands"
                                                                    :placeholder="__('select_and_search_brands')"
                                                                    label="name" track-by="id" required>
                                                                    <template slot="singleLabel" slot-scope="props">
                                                                        <span class="option__desc">
                                                                            <span class="option__title">{{
                                                                                props.option.name }}</span>
                                                                        </span>
                                                                    </template>
                                                                    <template slot="option" slot-scope="props">
                                                                        <div class="option__desc">
                                                                            <span class="option__small">
                                                                                <img style="height: 25px; "
                                                                                    class="option__image"
                                                                                    :src="props.option.image_url"
                                                                                    alt="Brand Logo">
                                                                            </span>
                                                                            <span class="option__title">{{
                                                                                props.option.name }}</span>
                                                                        </div>
                                                                    </template>
                                                                </multiselect>
                                                            </div>
                                                        </div>
                                                        <div class="col-md-12" v-if="addonGroupOptions.length">
                                                            <div class="form-group mb-3">
                                                                <label for="addon_groups">{{ __('addons') || 'Addons' }}</label>
                                                                <multiselect id="addon_groups" v-model="selectedAddonGroups"
                                                                    :options="addonGroupOptions" :multiple="true"
                                                                    :placeholder="__('select_addons') || 'Select addon groups'"
                                                                    label="name" track-by="id"></multiselect>
                                                            </div>
                                                        </div>
                                                        <div class="col-md-12">
                                                            <div
                                                                class="form-group mb-3 d-flex flex-wrap align-items-center">
                                                                <button type="button"
                                                                    class="btn btn-outline-primary me-3 my-2 ai-generate-btn"
                                                                    @click="generateDescription"
                                                                    :disabled="isGeneratingAI">
                                                                    <!-- AI Processing State -->
                                                                    <template v-if="isGeneratingAI">
                                                                        <span class="ai-spinner me-2"></span>
                                                                        <span class="ai-text-animate">AI is
                                                                            generating...</span>
                                                                    </template>
                                                                    <!-- Normal State -->
                                                                    <template v-else>
                                                                        <i class="fa fa-magic me-1"></i>
                                                                        {{ __('generate_description_with_ai') }}
                                                                    </template>
                                                                </button>
                                                                <label class="my-2 d-flex align-items-center">
                                                                    <input type="checkbox" v-model="useCustomPrompt"
                                                                        class="me-2" />
                                                                    <span class="mt-1">{{ __('use_custom_prompt')
                                                                    }}</span>
                                                                </label>
                                                            </div>
                                                        </div>

                                                        <div class="col-md-12">
                                                            <div class="form-group mb-3" v-if="useCustomPrompt">
                                                                <label>{{ __('custom_prompt') }}</label>
                                                                <textarea class="form-control" v-model="customPrompt"
                                                                    rows="3"
                                                                    :placeholder="__('custom_prompt_placeholder_example')"></textarea>
                                                            </div>
                                                        </div>
                                                    </template>

                                                    <!-- Translatable Fields: Tags (shown in all language tabs) -->
                                                    <div class="col-md-12">
                                                        <div class="form-group mb-3">
                                                            <label for="tags">{{ __('tags') }} (
                                                                {{
                                                                    __('these_tags_help_you_in_search_result') }} )</label>
                                                            <!-- Use Select2 for all language tabs -->
                                                            <Select2
                                                                :key="'tags_' + language.id + '_' + activeLanguageTab"
                                                                :value="language.is_default ? tag_ids : (tagIdsByLanguage[language.id] || [])"
                                                                @input="handleTagInput(language.id, $event)"
                                                                @change="handleTagInput(language.id, $event)"
                                                                placeholder="Select Tags" no-add-on-enter
                                                                :options="tagsOptions" separator=" ,;" :settings="{
                                                                    tags: true,
                                                                    multiple: true,
                                                                    width: '100%',
                                                                    dropdownParent: '#mymodal',
                                                                    tokenSeparators: [',', ';'],
                                                                    placeholder: __('enter_product_tag'),
                                                                }" />
                                                        </div>
                                                    </div>

                                                    <!-- Translatable Fields: Description (shown in all language tabs) -->
                                                    <div class="col-md-12">
                                                        <div class="form-group mb-3">
                                                            <label>{{ __('description') }} <i class="text-danger"
                                                                    v-if="language.is_default">*</i></label>
                                                            <editor :placeholder="__('enter_product_description')"
                                                                v-model="translations[language.id].description"
                                                                :init="getEditorConfig()"
                                                                @input="handleDefaultLanguageInput('description', language)" />
                                                        </div>
                                                    </div>

                                                    <!-- Translatable Fields: Manufacturer (shown in other language tabs only, not in default) -->
                                                    <div class="col-md-6" v-if="!language.is_default">
                                                        <div class="form-group mb-3">
                                                            <label>{{ __('manufacturer') }}</label>
                                                            <input type="text" class="form-control"
                                                                :placeholder="__('enter_manufacturer')"
                                                                v-model="translations[language.id].manufacturer">
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        </b-tab>
                                    </b-tabs>
                                </div>

                                <!-- Loading state for languages -->
                                <div v-else-if="isLoadingLanguages" class="text-center p-3 mb-3">
                                    <b-spinner label="Loading languages..."></b-spinner>
                                </div>
                            </div>
                        </div>

                        <div class="card">
                            <div class="card-header">
                                <h4>{{ __('seo_settings') }}</h4>
                            </div>
                            <div class="card-body">
                                <!-- Language Tabs for SEO -->
                                <div class="col-md-12 mb-3" v-if="languages.length > 0">
                                    <b-tabs v-model="activeLanguageTab" content-class="mt-3">
                                        <b-tab v-for="language in languages" :key="language.id" :title="language.name"
                                            lazy>
                                            <template #title>
                                                <span :class="{ 'text-primary font-weight-bold': language.is_default }">
                                                    {{ language.name }}
                                                </span>
                                            </template>

                                            <div v-if="translations[language.id]">
                                                <div class="row">
                                                    <div class="col-md-6">
                                                        <div class="form-group mb-3">
                                                            <label>{{ __('meta_title') }} </label>
                                                            <input type="text" class="form-control"
                                                                v-model="translations[language.id].meta_title"
                                                                :placeholder="__('enter_meta_title')"
                                                                @input="handleDefaultLanguageInput('meta_title', language)">
                                                        </div>
                                                        <div class="form-group mb-3">
                                                            <label>{{ __('meta_keywords') }} </label>
                                                            <input type="text" class="form-control"
                                                                v-model="translations[language.id].meta_keywords"
                                                                :placeholder="__('enter_meta_keywords')"
                                                                @input="handleDefaultLanguageInput('meta_keywords', language)">
                                                        </div>
                                                        <div class="form-group mb-3">
                                                            <label>{{ __('schema_markup') }} </label>
                                                            <input type="text" class="form-control"
                                                                v-model="translations[language.id].schema_markup"
                                                                :placeholder="__('enter_schema_markup')"
                                                                @input="handleDefaultLanguageInput('schema_markup', language)">
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <div class="form-group mb-3">
                                                            <label>{{ __('meta_description') }} </label>
                                                            <textarea type="text" class="form-control"
                                                                v-model="translations[language.id].meta_description"
                                                                :placeholder="__('enter_meta_description')" rows="4"
                                                                @input="handleDefaultLanguageInput('meta_description', language)"></textarea>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </b-tab>
                                    </b-tabs>
                                </div>
                            </div>
                            <!-- Save and Clear buttons for non-default language tabs -->
                            <div class="card-footer"
                                v-if="languages.length > 0 && languages[activeLanguageTab] && !languages[activeLanguageTab].is_default">
                                <b-button type="submit" @keydown.enter="saveRecord" variant="primary"
                                    :disabled="isLoading"> {{ __('save') }}
                                    <b-spinner v-if="isLoading" small label="Spinning"></b-spinner>
                                </b-button>
                                <button type="button" class="btn btn-danger" @click="clearForm">{{ __('clear')
                                    }}</button>
                            </div>
                        </div>

                        <!-- Non-translatable Fields: Only show in default language tab -->
                        <div class="card"
                            v-if="languages.length > 0 && languages[activeLanguageTab] && languages[activeLanguageTab].is_default">
                            <div class="card-header">
                                <h4>{{ __('product_settings') }}</h4>
                            </div>
                            <div class="card-body">
                                <div class="row">
                                    <!-- Row: Category, Product type, Product status -->
                                    <div class="col-md-4">
                                        <div class="form-group mb-3">
                                            <label>{{ __('category') }} <i class="text-danger">*</i></label>
                                            <!-- Select2 instead of a native <select>: the native dropdown popup is
                                                 rendered by the browser itself, outside app CSS/z-index control, and
                                                 was getting mispositioned behind/away-from the fixed sidebar. -->
                                            <Select2 v-model="category_id" :options="categoryOptionsArray"
                                                :disabled="!seller_id && !isSellerRole"
                                                :placeholder="__('select_category')"
                                                :settings="{ width: '100%', dropdownParent: '#mymodal' }" />
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                                        <template v-if="isSellerRole">
                                            <input type="hidden" v-model="is_approved">
                                        </template>
                                        <template v-else>
                                            <div class="form-group mb-3">
                                                <label>{{ __('product_status') }}</label><br>
                                                <div id="status" class="btn-group">
                                                    <label class="btn btn-primary" data-toggle-class="btn-primary"
                                                        data-toggle-passive-class="btn-default">
                                                        <input type="radio" v-model="is_approved" value="1"> {{
                                                            __('approved') }}
                                                    </label>
                                                    <label class="btn btn-danger" data-toggle-class="btn-danger"
                                                        data-toggle-passive-class="btn-default">
                                                        <input type="radio" v-model="is_approved" value="0">
                                                        {{ __('not_approved') }}
                                                    </label>
                                                </div>
                                            </div>
                                        </template>
                                    </div>

                                    <!-- Row: Manufacturer, Made in -->
                                    <div class="col-md-6">
                                        <div class="form-group mb-3">
                                            <label for="manufacturer">{{ __('manufacturer') }} </label>
                                            <input type="text" id="manufacturer" class="form-control" v-model="manufacturer"
                                                :placeholder="__('enter_manufacturer')">
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group mb-3">
                                            <label for="made_in">{{ __('made_in') }}</label>
                                            <multiselect id="made_in" v-model="made_in" :options="countries"
                                                :placeholder="__('select_and_search_country_name')" label="name"
                                                track-by="name" required>
                                                <template slot="singleLabel" slot-scope="props">
                                                    <span class="option__desc">
                                                        <span class="option__title">{{ props.option.name }}</span>
                                                    </span>
                                                </template>
                                                <template slot="option" slot-scope="props">
                                                    <div class="option__desc">

                                                        <span class="option__title">{{ props.option.name }}</span>
                                                        <span class="option__small">[{{ props.option.code }}]</span>
                                                    </div>
                                                </template>
                                            </multiselect>

                                        </div>
                                    </div>


                                    <!-- Row: Barcode, Total allowed quantity -->
                                    <div class="col-md-4">
                                        <div class="form-group mb-3">
                                            <label for="barcode">{{ __('barcode') }}</label>
                                            <input type="text" id="barcode" class="form-control" :placeholder="__('barcode')"
                                                v-model="barcode" @input="validateBarcode">
                                            <p style="color:red !important" v-if="validationBarcodeMessage">{{
                                                validationBarcodeMessage }}</p>
                                            <p style="color:green !important" v-else-if="isBarcodeValid">Barcode is valid!
                                            </p>
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="form-group mb-3">
                                            <label for="max_allowed_quantity">{{ __('total_allowed_quantity') }} ({{ __('keep_blank_if_no_such_limit')
                                                }}) </label>
                                            <input type="number" id="max_allowed_quantity" min="0" class="form-control"
                                                v-model="max_allowed_quantity">
                                        </div>
                                    </div>

                                    <!-- Row: Is returnable, Is cancelable, Is COD allowed -->
                                    <div class="col-md-4">
                                        <div class="form-group mb-3 d-flex flex-wrap align-items-start gap-2">
                                            <div>
                                                <label>{{ __('is_returnable') }}</label><br>
                                                <b-form-radio-group v-model="return_status" :options="[
                                                    { text: __('no'), 'value': 0 },
                                                    { text: __('yes'), 'value': 1 },
                                                ]" buttons button-variant="outline-primary" required></b-form-radio-group>
                                            </div>
                                            <div v-if="return_status == 1" class="ms-2">
                                                <label for="return_day">{{ __('max_return_days') }}</label>
                                                <input type="number" step="any" :min="return_status == 1 ? 1 : 0"
                                                    :required="return_status == 1 ? true : undefined" id="return_day"
                                                    class="form-control" :placeholder="__('number_of_days_to_return')"
                                                    v-model="return_days">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="form-group mb-3 d-flex flex-wrap align-items-start gap-2">
                                            <div>
                                                <label>{{ __('is_cancelable') }}</label><br>
                                                <b-form-radio-group v-model="cancelable_status" :options="[
                                                    { text: __('no'), 'value': 0 },
                                                    { text: __('yes'), 'value': 1 },
                                                ]" buttons button-variant="outline-primary"></b-form-radio-group>
                                            </div>
                                            <div v-if="cancelable_status === 1" class="ms-2">
                                                <label for="till_status">{{ __('till_which_status') }} <i
                                                    class="text-danger">*</i></label>
                                                <select id="till_status" class="form-control"
                                                    v-model="till_status"
                                                    :required="cancelable_status === 1 ? true : undefined">
                                                    <option value="">{{ __('select_order_status') }}</option>
                                                    <option v-for="status in order_status" :value="status.id">{{
                                                        getStatusDisplayName(status) }}
                                                    </option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="form-group mb-3">
                                            <label>{{ __('is_cod_allowed') }}</label><br>
                                            <b-form-radio-group v-model="cod_allowed_status" :options="[
                                                { text: __('no'), 'value': 0 },
                                                { text: __('yes'), 'value': 1 },
                                            ]" buttons button-variant="outline-primary"></b-form-radio-group>
                                        </div>
                                    </div>
                                    <div class="col-md-4" v-if="isPharmacyModule">
                                        <div class="form-group mb-3">
                                            <label>{{ __('require_prescription') }}</label><br>
                                            <b-form-radio-group v-model="require_prescription" :options="[
                                                { text: __('no'), 'value': 0 },
                                                { text: __('yes'), 'value': 1 },
                                            ]" buttons button-variant="outline-primary"></b-form-radio-group>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Custom Fields: Only show in default language tab -->
                        <div class="card" v-if="translatedCustomFields.length > 0 && languages.length > 0 && languages[activeLanguageTab] && languages[activeLanguageTab].is_default">
                            <div class="card-header">
                                <h4>{{ __('custom_fields') }}
                                    <i class="fa fa-info-circle text-muted" v-b-tooltip.hover
                                        :title="__('these_fields_appear_in_product_specification_only_on_web_and_app_side')"></i>
                                </h4>
                            </div>
                            <div class="card-body">
                                <div class="row">
                                    <div class="form-group col-md-4" v-for="field in translatedCustomFields"
                                        :key="field.id">
                                        <label>{{ field.name }}
                                            <i v-if="field.is_required" class="text-danger">*</i></label>

                                        <textarea v-if="field.type === 'textarea'" class="form-control"
                                            v-model="customFieldValues[field.id]"
                                            :placeholder="field.name"></textarea>

                                        <select v-else-if="field.type === 'dropdown'"
                                            class="form-control form-select"
                                            v-model="customFieldValues[field.id]">
                                            <option value="">{{ __('select') || 'Select' }}</option>
                                            <option v-for="option in field.options" :key="option"
                                                :value="option">{{ option }}</option>
                                        </select>

                                        <template v-else-if="field.type === 'file'">
                                            <input type="file" class="form-control"
                                                @change="handleCustomFieldFile($event, field.id)">
                                            <a v-if="customFieldExistingFileUrl(field.id)"
                                                :href="customFieldExistingFileUrl(field.id)" target="_blank"
                                                class="badge bg-success mt-1"><i class="fa fa-eye"></i> {{ __('view') || 'View' }}</a>
                                        </template>

                                        <input v-else :type="field.type === 'number' ? 'number' : 'text'"
                                            class="form-control" v-model="customFieldValues[field.id]"
                                            :placeholder="field.name">
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Product Variants: Only show in default language tab -->
                        <div class="card"
                            v-if="languages.length > 0 && languages[activeLanguageTab] && languages[activeLanguageTab].is_default">
                            <div class="card-header">
                                <h4>{{ __('product_variants') }}</h4>
                            </div>
                            <div class="card-body">
                                <div class="col-md-6">
                                    <div class="row">
                                        <div class="form-group col-md-6">
                                            <label class="control-label">{{ __('stock_limit') }} <i
                                                    class="text-danger">*</i></label><br>
                                            <b-form-radio-group v-model="is_unlimited_stock" :options="[
                                                { text: __('limited'), 'value': 0 },
                                                { text: __('unlimited'), 'value': 1 },
                                            ]" buttons button-variant="outline-primary"></b-form-radio-group>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-md-12">
                                    <div class="form-group mb-3">
                                        <label>{{ __('images') }}</label><br>
                                        <b-form-radio-group v-model="image_mode" :options="[
                                            { text: __('global_images'), 'value': 'global' },
                                            { text: __('variant_wise_images'), 'value': 'variant' },
                                        ]" buttons button-variant="outline-primary"></b-form-radio-group>
                                    </div>
                                </div>

                                <div class="row" v-if="image_mode === 'global'">
                                    <div class="col-md-6">
                                        <div class="form-group mb-3">
                                            <label>{{ __('main_image') }} <i
                                                    class="text-danger">*</i></label>
                                            <input type="file" name="image" accept="image/*"
                                                ref="file_image" v-on:change="fileImage"
                                                class="file-input">

                                            <div class="file-input-div bg-gray-100"
                                                @click="triggerRefClick('file_image')"
                                                @drop="dropFile" @dragover="$dragoverFile"
                                                @dragleave="$dragleaveFile">
                                                <template v-if="main_image_name == ''">
                                                    <label><i
                                                            class="fa fa-cloud-upload-alt fa-2x"></i></label>
                                                    <label>{{
                                                        __('drop_files_here_or_click_to_upload')
                                                        }}</label>
                                                </template>
                                                <template v-else>
                                                    <label>{{ __('selected_file_name') }} {{
                                                        main_image_name
                                                        }}</label>
                                                </template>
                                            </div>
                                            <span class="text text-primary">{{ __('please_choose_square_image_of_larger_than_350px_350px_and_smaller_than_550px_550px') }}</span>
                                            <p v-if="mainImageerror" class="error">{{ mainImageerror
                                                }}</p>

                                            <div class="row" v-if="main_image_path">
                                                <div class="col-md-4">
                                                    <img class="custom-image" :src="main_image_path"
                                                        title='Main Image' alt='Main Image' />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group mb-3">
                                            <label for="other_images">{{
                                                __('other_images_of_the_product') }}</label>

                                            <input type="file" name="other_images[]"
                                                accept="image/*" id="other_images"
                                                v-on:change="otherImage" multiple=""
                                                ref="file_other_images" class="file-input">

                                            <div class="file-input-div bg-gray-100"
                                                @click="triggerRefClick('file_other_images')"
                                                @drop="dropFileOtherImage" @dragover="$dragoverFile"
                                                @dragleave="$dragleaveFile">
                                                <template v-if="images.length === 0">
                                                    <label><i
                                                            class="fa fa-cloud-upload-alt fa-2x"></i></label>
                                                    <label>{{
                                                        __('drop_files_here_or_click_to_upload')
                                                        }}</label>
                                                </template>
                                                <template v-else>
                                                    <template v-if="images.length === 1">
                                                        <label>{{ __('selected_file_name') }}
                                                            {{ images[0].name }}</label>
                                                    </template>
                                                    <template v-else>
                                                        <label>{{ images.length }} files
                                                            Selected</label>
                                                        <span><small v-for="image in images">{{
                                                            image.name }}, </small></span>
                                                    </template>
                                                </template>
                                            </div>
                                            <span class="text text-primary">{{ __('please_choose_square_image_of_larger_than_350px_350px_and_smaller_than_550px_550px') }} *</span>
                                            <p v-if="otherImageerror" class="error">{{
                                                otherImageerror }}</p>

                                            <div v-if="images && images.length !== 0">
                                                <h6 class="mt-3">Seleted Other Image List.</h6>
                                                <div class="d-flex flex-wrap variant-image-preview-list">
                                                    <div class="image-container variant-image-preview-item"
                                                        v-for="(image, index) in images" :key="image.url">
                                                        <img class="img-thumbnail custom-image"
                                                            :src="image.url"
                                                            title='Selected Other Image'
                                                            alt='Selected Other Image' />
                                                        <button type="button"
                                                            @click="removeOtherImage(images.indexOf(image))"
                                                            class="btn btn-sm btn-danger btn-remove"> <i
                                                                class="fa fa-times-circle"></i>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>

                                            <div v-if="other_images && other_images.length !== 0">
                                                <h6 class="mt-3">Uploaded Other Image List.</h6>
                                                <div class="d-flex flex-wrap variant-image-preview-list">
                                                    <div class="image-container variant-image-preview-item"
                                                        v-for="(image, index) in other_images" :key="image.id">
                                                        <img class="img-thumbnail custom-image"
                                                            :src="$storageUrl + image.image"
                                                            title='Other Image' alt='Other Image' />
                                                        <button type="button"
                                                            @click="deleteImage(index, image.id, true)"
                                                            class="btn btn-sm btn-danger btn-remove"> <i
                                                                class="fa fa-times-circle"></i>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>

                                <div class="col-md-12" v-if="attributeOptions.length === 0 && !isLoadingAttributes">
                                    <p class="text-danger mb-2">
                                        {{ category_id ? __('no_attributes_for_this_category') : __('please_select_category_first') }}
                                    </p>
                                </div>

                                <!-- Variant matrix: pick attribute values, generate every combination -->
                                <div class="col-md-12" v-if="attributeOptions.length">
                                    <h5 class="mb-1">{{ __('variant_matrix') }}</h5>
                                    <p class="text-muted mb-3">{{ __('select_one_or_more_values_for_each_attribute_every_combination_becomes_a_variant') }}</p>

                                    <div v-for="attribute in attributeOptions" :key="attribute.id" class="mb-3">
                                        <label class="d-block fw-bold">{{ attribute.name }}</label>

                                        <!-- Colour type: circular swatches -->
                                        <template v-if="attribute.type === 'color'">
                                            <span v-for="value in attribute.values" :key="value.id"
                                                @click="toggleAttributeValueChecked(attribute.id, value.id)"
                                                v-b-tooltip.hover :title="value.value"
                                                class="d-inline-block rounded-circle me-2 mb-1"
                                                :style="{
                                                    background: value.color_code || '#ccc',
                                                    width: '32px', height: '32px', cursor: 'pointer',
                                                    border: isAttributeValueChecked(attribute.id, value.id) ? '3px solid #37a279' : '1px solid #ccc'
                                                }"></span>
                                        </template>

                                        <!-- Image type: thumbnail swatches -->
                                        <template v-else-if="attribute.type === 'image'">
                                            <span v-for="value in attribute.values" :key="value.id"
                                                @click="toggleAttributeValueChecked(attribute.id, value.id)"
                                                v-b-tooltip.hover :title="value.value"
                                                class="d-inline-block me-2 mb-1"
                                                :style="{ cursor: 'pointer', border: isAttributeValueChecked(attribute.id, value.id) ? '3px solid #37a279' : '1px solid #ccc' }">
                                                <img v-if="value.image_url" :src="value.image_url" style="width: 40px; height: 40px; object-fit: cover; display: block;">
                                                <span v-else style="width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; font-size: 10px;">{{ value.value }}</span>
                                            </span>
                                        </template>

                                        <!-- Text type: current button checkboxes.
                                             Keyed with checkboxRenderKey so we can force a remount when a
                                             toggle is cancelled (see toggleAttributeValueChecked) - bootstrap-vue's
                                             button-style checkbox keeps its own internal pressed state and only
                                             re-syncs from :checked when that prop's value actually changes, so a
                                             cancelled toggle (prop stays the same) would otherwise leave the
                                             button showing the native click's visual state instead of the real one. -->
                                        <template v-else>
                                            <b-form-checkbox v-for="value in attribute.values"
                                                :key="value.id + '_' + (checkboxRenderKey[attribute.id + '_' + value.id] || 0)"
                                                :checked="isAttributeValueChecked(attribute.id, value.id)"
                                                @change="toggleAttributeValueChecked(attribute.id, value.id)"
                                                button button-variant="outline-primary" class="mb-1 me-1">
                                                {{ value.value }}<template v-if="value.short_code"> ({{ value.short_code }})</template>
                                            </b-form-checkbox>
                                        </template>
                                    </div>

                                    <div class="alert alert-info d-flex justify-content-between align-items-center flex-wrap gap-2">
                                        <span>{{ __('total_variants_to_be_generated') }}: <strong>{{ variantCombosCount }}</strong></span>
                                        <button type="button" class="btn btn-primary" :disabled="attributeOptions.length === 0"
                                            v-b-tooltip.hover :title="__('select_every_value_of_every_attribute')"
                                            @click="generateAllVariants">
                                            <i class="fa fa-bolt"></i> {{ __('generate_all_variants') }}
                                        </button>
                                    </div>
                                </div>

                                <!-- Chip list: one chip per generated variant, click to edit its fields below.
                                     Legacy variants saved before the attribute system (no attribute_value_id)
                                     still get a chip - "unmapped" - so they stay editable/recoverable. -->
                                <div class="col-md-12 mb-3" v-if="hasEditableVariants">
                                    <hr>
                                    <h5 class="mb-2">{{ __('product_variants') }}</h5>
                                    <button type="button" v-for="(input, k) in inputs" :key="k"
                                        class="btn btn-sm me-1 mb-1"
                                        :class="[k === activeVariantIndex ? 'btn-primary' : 'btn-outline-secondary', (!input.attribute_value_id || input.orphan_combo) ? 'border-warning' : '']"
                                        @click="selectVariant(k)">
                                        <i v-if="input.orphan_combo" class="fa fa-exclamation-triangle text-warning me-1"
                                            v-b-tooltip.hover :title="__('variant_combo_incomplete_warning')"></i>
                                        #{{ k + 1 }} — {{ input.label || (input.id ? __('unmapped') : input.attribute_value_id) }}
                                        <i class="fa fa-times ms-1" @click.stop="remove(k)"></i>
                                    </button>
                                </div>

                                <div id="packate_div" class="list-group-item" v-for="(input, k) in inputs" :key="k"
                                    v-show="k === activeVariantIndex && (input.attribute_value_id || input.id)">
                                    <div class="row">
                                        <div class="col-md-12 mb-2" v-if="input.label">
                                            <strong>{{ input.label }}</strong>
                                        </div>

                                        <div class="col-md-12 mb-2" v-if="input.orphan_combo">
                                            <p class="text-warning mb-1">{{ __('variant_combo_incomplete_warning') }}</p>
                                        </div>

                                        <div class="col-md-12 mb-2" v-if="!input.attribute_value_id && input.id">
                                            <p class="text-warning mb-1">{{ __('legacy_variant_no_attribute_assigned') }}</p>
                                            <select class="form-control" @change="assignLegacyAttributeValue(k, $event.target.value)">
                                                <option value="">{{ __('select_attribute_value') }}</option>
                                                <optgroup v-for="attribute in attributeOptions" :key="attribute.id"
                                                    :label="attribute.name">
                                                    <option v-for="value in attribute.values" :key="value.id" :value="value.id">
                                                        {{ value.value }}<template v-if="value.short_code"> ({{ value.short_code }})</template>
                                                    </option>
                                                </optgroup>
                                            </select>
                                        </div>

                                        <div class="col-md-4">
                                            <div class="form-group mb-3">
                                                <label>{{ __('price') }} ( {{ $currency }} ) <i
                                                        class="text-danger">*</i></label>
                                                <input type="number" min="0" step="any" class="form-control"
                                                    placeholder="0.00" v-model="input.packet_price" required>
                                            </div>
                                        </div>
                                        <div class="col-md-4">
                                            <div class="form-group mb-3">
                                                <label>{{ __('purchase_price') }} ( {{ $currency }} )
                                                    <i class="fa fa-info-circle text-muted" v-b-tooltip.hover
                                                        title="This field is used to calculate in your report"></i>
                                                </label>
                                                <input type="number" min="0" step="any" class="form-control"
                                                    placeholder="0.00" v-model="input.packet_purchase_price">
                                            </div>
                                        </div>
                                        <div class="col-md-4">
                                            <div class="form-group mb-3">
                                                <label>{{ __('discounted_price') }} ( {{ $currency }} )</label>
                                                <input type="number" min="0" step="any" class="form-control"
                                                    placeholder="0.00" v-model="input.discounted_price"
                                                    @input="validateDiscountedPrice(input)">
                                                <span v-if="input.validationErrorDiscountedPrice" class="error">{{
                                                    input.validationErrorDiscountedPrice }}</span>
                                            </div>
                                        </div>
                                        <div class="col-md-4" v-if="is_unlimited_stock != 1">
                                            <div class="form-group mb-3">
                                                <label>{{ __('stock') }} <i class="text-danger">*</i></label>
                                                <input type="number" step="any" min="0" class="form-control"
                                                    placeholder="0" name="packate_stock[]" v-model="input.packet_stock">
                                            </div>
                                        </div>
                                        <div class="col-md-4">
                                            <div class="form-group mb-3">
                                                <label>{{ __('status') }} <i class="text-danger">*</i></label>
                                                <select class="form-control" v-model="input.packet_status"
                                                    required>
                                                    <option value="">{{ __('select_status') }}</option>
                                                    <option value="1">{{ __('available') }}</option>
                                                    <option value="0">{{ __('sold_out') }}</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="col-md-12" v-if="image_mode === 'variant'">
                                            <div class="form-group">
                                                <label>{{ __('variant_images') }}</label>
                                                <input type="file" accept="image/*" :ref="'packet_variant_images_' + k"
                                                    multiple class="file-input" v-on:change="variantImagesChanges(k)">

                                                <div class="file-input-div bg-gray-100"
                                                    @click="$refs['packet_variant_images_' + k][0].click()"
                                                    @dragover="$dragoverFile" @dragleave="$dragleaveFile">
                                                    <label><i class="fa fa-cloud-upload-alt fa-2x"></i></label>
                                                    <label>{{ __('drop_files_here_or_click_to_upload') }}</label>
                                                </div>

                                                <span class="text text-primary">{{ __('please_choose_square_image_of_larger_than_350px_350px_and_smaller_than_550px_550px') }}</span>
                                                <p v-if="variantImageerror" class="error">{{ variantImageerror }}</p>
                                                <draggable v-model="variantFiles[k]" tag="div"
                                                    class="d-flex flex-wrap variant-image-preview-list"
                                                    v-bind="{ animation: 150 }"
                                                    @end="reorderVariantFiles(k)">
                                                    <div class="image-container variant-image-preview-item"
                                                        v-for="(image, index) in variantFiles[k]" :key="image.url">
                                                        <img class="img-thumbnail custom-image" :src="image.url"
                                                            title='Selected Variant Image'
                                                            alt='Selected Variant Image' />
                                                        <button type="button"
                                                            @click="removeVariantFile(k, index)"
                                                            class="btn btn-sm btn-danger btn-remove"> <i
                                                                class="fa fa-times-circle"></i>
                                                        </button>
                                                    </div>
                                                </draggable>

                                                <div class="d-flex flex-wrap variant-image-preview-list">
                                                    <div class="image-container variant-image-preview-item"
                                                        v-if="input.images && input.images.length !== 0"
                                                        v-for="(image, index) in input.images">
                                                        <img class="img-thumbnail custom-image"
                                                            :src="$storageUrl + image.image" title='Variant Image'
                                                            alt='Variant Image' />
                                                        <button type="button"
                                                            @click="deleteImage(index, image.id, false, k)"
                                                            class="btn btn-sm btn-danger btn-remove"> <i
                                                                class="fa fa-times-circle"></i>
                                                        </button>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>

                                    </div>
                                </div>

                            </div>
                            <!-- Save and Clear buttons for default language tab only -->
                            <div class="card-footer"
                                v-if="languages.length === 0 || (languages[activeLanguageTab] && languages[activeLanguageTab].is_default)">
                                <b-button type="submit" @keydown.enter="saveRecord" variant="primary"
                                    :disabled="isLoading"> {{ __('save') }}
                                    <b-spinner v-if="isLoading" small label="Spinning"></b-spinner>
                                </b-button>
                                <button type="button" class="btn btn-danger" @click="clearForm">{{ __('clear')
                                    }}</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Vue from 'vue';
// import InputTag from 'vue-input-tag';
import axios from "axios";
import Multiselect from 'vue-multiselect'
import Select2 from "v-select2-component";
import Editor from '@tinymce/tinymce-vue';
import draggable from 'vuedraggable';
import Auth from '../../Auth.js';
import TranslationHelper from '../../mixins/TranslationHelper.js';

export default {
    mixins: [TranslationHelper],
    // register the component
    components: { Multiselect, Select2, 'editor': Editor, draggable },
    data: function () {
        return {
            login_user: Auth.user,
            isLoading: false,
            isGeneratingAI: false, // Track AI content generation state
            cacheTimer: null,
            cachedData: null,
            skipCache: false,

            name: '',
            slug: '',
            seller_id: '',
            tags: [],
            addonGroupOptions: [],
            selectedAddonGroups: [],
            tag_ids: '',
            tagIdsByLanguage: {}, // Store tag IDs for each language
            tagSuggestions: [],
            brand: null,
            tax_id: 0,
            /* Variants are defined by an attribute value. The backend maps this back to the legacy
               packet semantics (measurement / stock_unit_id / type) that the cart and reports read. */
            type: 'attribute',
            attributeOptions: [],
            isLoadingAttributes: false,
            selectedAttributeValues: {},
            checkboxRenderKey: {},
            activeVariantIndex: 0,
            image_mode: 'global',
            suppressCategoryWatch: false,
            category_id: '',
            manufacturer: '',
            made_in: '',
            tag: '',

            return_status: 0,
            return_days: 1,
            cancelable_status: 0,
            till_status: "",
            cod_allowed_status: 0,
            max_allowed_quantity: 0,
            description: '',
            require_products_approval: 0,
            require_prescription: 0,
            is_approved: 1,
            status: 1,
            is_unlimited_stock: 0,
            tax_included_in_price: 0,
            pincode_ids_exc: null,

            sellers: null,
            taxes: null,
            brands: [],
            countries: [],

            categories: null,
            order_status: null,

            inputs: [{ 'name': '', 'packet_status': '', 'attribute_value_id': '' }],

            image: null,
            main_image_path: "",
            main_image_name: "",


            other_images: null,
            images: [],
            variantFiles: {},
            id: null,
            record: null,
            clone: false,
            categoryOptions: '<option value="">' + __('select_category') + '</option>',
            deleteImageIds: [],
            loggedUser: Auth.user,
            isBarcodeValid: '',
            input: [],
            mainImageerror: null,
            otherImageerror: null,
            variantImageerror: null,
            barcode: "",
            meta_title: "",
            meta_keywords: "",
            schema_markup: "",
            meta_description: "",
            validationBarcodeMessage: "",
            useCustomPrompt: false,
            customPrompt: '',
            loading: false,
            textGenKey: '',
            // Multi-language support
            isLoadingLanguages: false,
            activeLanguageTab: 0,
            translations: {},
            defaultLanguageId: null,
            languages: [],
            currentLanguageId: null,
            activeLanguages: [],
            categories: [], // Store categories data for translation

            // Translate buttons
            translatableFields: ['name', 'description', 'manufacturer', 'meta_title', 'meta_keywords', 'schema_markup', 'meta_description', 'tags'],
            translateSuccessMessage: '',
            loadingEmpty: false,
            loadingOverwrite: false,

            // Cache helpers
            cacheTimer: null,
            cachedData: null,
            skipCache: false,

            // Custom fields
            customFields: [],
            customFieldValues: {},
            customFieldFiles: {},
            customFieldExistingValues: {},
        }
    },

    computed: {
        // Custom fields shown in the current app locale, falling back to the default-language
        // name/options when no translation exists for it. Product Type / FSSAI Lic. No. are
        // seeded module=product custom_fields rows themselves, so they render through this same
        // generic loop and only appear when their row still exists (e.g. not removed via the
        // admin Custom Fields page, or not seeded for this module).
        translatedCustomFields: function () {
            const list = Array.isArray(this.customFields) ? this.customFields : [];

            if (!this.currentLanguageId || list.length === 0) {
                return list;
            }

            return list.map(field => {
                const translatedField = { ...field };

                if (Array.isArray(field.translations)) {
                    const translation = field.translations.find(
                        t => t.language_id === this.currentLanguageId
                    );

                    if (translation && translation.name && translation.name.trim() !== '') {
                        translatedField.name = translation.name;
                    }
                    if (translation && Array.isArray(translation.options) && translation.options.length > 0) {
                        translatedField.options = translation.options;
                    }
                }

                return translatedField;
            });
        },
        // Attributes with at least one checked value, paired with just the checked values.
        selectedAttributeCombos() {
            return this.attributeOptions
                .map(attribute => ({
                    attribute,
                    values: (attribute.values || []).filter(v => this.isAttributeValueChecked(attribute.id, v.id)),
                }))
                .filter(entry => entry.values.length > 0);
        },
        variantCombosCount() {
            if (this.selectedAttributeCombos.length === 0) return 0;
            return this.selectedAttributeCombos.reduce((total, entry) => total * entry.values.length, 1);
        },
        // True once there's a real variant to show - matrix-generated or a legacy saved row
        // (id set) that predates the attribute system and has no attribute_value_id yet.
        hasEditableVariants() {
            return this.inputs.some(input => input.attribute_value_id || input.id);
        },
        isSellerRoute() {
            // Use this.$route to access the current route
            return this.$route.path.startsWith('/seller/');
        },
        tagsOptions() {
            return this.tags.length ? this.tags.map(tag => ({ id: tag.id, text: tag.name })) : [];
        },
        selectedTags() {
            return this.tags.filter(tag => this.tag_ids.includes(tag.id));
        },
        // Computed property to safely access $roleSeller
        roleSeller() {
            return (this.$roleSeller !== undefined) ? this.$roleSeller : '';
        },
        // Computed property to check if current user is seller
        isSellerRole() {
            try {
                return this.login_user && this.login_user.role && this.login_user.role.name && this.roleSeller && this.roleSeller === this.login_user.role.name;
            } catch (e) {
                return false;
            }
        },
        canUseAIGenerate() {
            const user = Auth.user || this.login_user;
            return this.$isDemo != 1 && user && user.id == 1;
        },
        isPharmacyModule() {
            const activeModuleId = Number(localStorage.getItem('active_module_id')) || 1;
            return activeModuleId === 2;
        },
        translatedSellers: function () {
            if (!this.currentLanguageId || !this.sellers || this.sellers.length === 0) {
                return this.sellers || [];
            }

            const defaultLanguage = this.activeLanguages.find(lang => lang.is_default === 1);
            const defaultLanguageId = defaultLanguage ? defaultLanguage.id : null;

            return this.sellers.map(seller => {
                const translatedSeller = { ...seller };
                let translatedName = seller.name;

                if (seller.translations && Array.isArray(seller.translations)) {
                    let translation = seller.translations.find(
                        t => t.language_id === this.currentLanguageId
                    );

                    if (!translation && defaultLanguageId) {
                        translation = seller.translations.find(
                            t => t.language_id === defaultLanguageId
                        );
                    }

                    if (translation && translation.name && translation.name.trim() !== '') {
                        translatedName = translation.name;
                    }
                }

                translatedSeller.name = translatedName;
                return translatedSeller;
            });
        },
        translatedBrands: function () {
            if (!this.currentLanguageId || !this.brands || this.brands.length === 0) {
                return this.brands || [];
            }

            const defaultLanguage = this.activeLanguages.find(lang => lang.is_default === 1);
            const defaultLanguageId = defaultLanguage ? defaultLanguage.id : null;

            return this.brands.map(brand => {
                const translatedBrand = { ...brand };
                let translatedTitle = brand.title || brand.name;

                if (brand.translations && Array.isArray(brand.translations)) {
                    let translation = brand.translations.find(
                        t => t.language_id === this.currentLanguageId
                    );

                    if (!translation && defaultLanguageId) {
                        translation = brand.translations.find(
                            t => t.language_id === defaultLanguageId
                        );
                    }

                    if (translation && translation.title && translation.title.trim() !== '') {
                        translatedTitle = translation.title;
                    }
                }

                translatedBrand.name = translatedTitle;
                translatedBrand.title = translatedTitle;
                return translatedBrand;
            });
        },
        translatedTaxes: function () {
            if (!this.currentLanguageId || !this.taxes || this.taxes.length === 0) {
                return this.taxes || [];
            }

            const defaultLanguage = this.activeLanguages.find(lang => lang.is_default === 1);
            const defaultLanguageId = defaultLanguage ? defaultLanguage.id : null;

            return this.taxes.map(tax => {
                const translatedTax = { ...tax };
                let translatedTitle = tax.title;

                if (tax.translations && Array.isArray(tax.translations)) {
                    let translation = tax.translations.find(
                        t => t.language_id === this.currentLanguageId
                    );

                    if (!translation && defaultLanguageId) {
                        translation = tax.translations.find(
                            t => t.language_id === defaultLanguageId
                        );
                    }

                    if (translation && translation.title && translation.title.trim() !== '') {
                        translatedTitle = translation.title;
                    }
                }

                translatedTax.title = translatedTitle;
                return translatedTax;
            });
        },
        translatedCategories: function () {
            if (!this.currentLanguageId || !this.categories || this.categories.length === 0) {
                return this.categories || [];
            }

            const defaultLanguage = this.activeLanguages.find(lang => lang.is_default === 1);
            const defaultLanguageId = defaultLanguage ? defaultLanguage.id : null;

            return this.categories.map(category => {
                const translatedCategory = { ...category };
                let translatedName = category.name;

                if (category.translations && Array.isArray(category.translations)) {
                    let translation = category.translations.find(
                        t => t.language_id === this.currentLanguageId
                    );

                    if (!translation && defaultLanguageId) {
                        translation = category.translations.find(
                            t => t.language_id === defaultLanguageId
                        );
                    }

                    if (translation && translation.name && translation.name.trim() !== '') {
                        translatedName = translation.name;
                    }
                }

                translatedCategory.name = translatedName;
                return translatedCategory;
            });
        },
        // Parses the <option> HTML string returned by the backend (which already encodes the
        // seller-restricted / excluded-id / hierarchy logic via CommonHelper::categoryTree) into
        // {id, text} pairs for the Select2 widget - keeps that server-side logic untouched.
        categoryOptionsArray: function () {
            if (!this.categoryOptions) return [];
            const container = document.createElement('div');
            container.innerHTML = this.categoryOptions;
            return Array.from(container.querySelectorAll('option'))
                .filter(opt => opt.value !== '')
                .map(opt => ({ id: opt.value, text: opt.textContent }));
        },
    },

    created: function () {
        this.id = this.$route.params.id || null;
        this.clone = this.$route.params.clone || false;

        this.getCustomFields();
        this.fetchActiveLanguages().then(() => {
            this.getSellers();
            this.getTaxes();
            /* Attributes are category-driven: don't fetch until a category is picked (new product)
               or getProduct() sets category_id (edit) - both paths call loadAttributes() themselves. */
            this.getBrands();
            this.getCountries();
            this.getTags();
            this.getAddonGroups();
            this.getOrderStatus();
            this.getTextGenKey();
            if (this.isSellerRole) {
                this.seller_id = this.login_user.seller.id;
                this.getSeller();
                this.getSellerCategories();
            }
            if (this.id) {
                this.getProduct();
            } else {
                this.restoreCache();
            }
        });
    },
    beforeDestroy: function () {
        if (!this.id && !this.clone && !this.skipCache) this.saveCache();
        if (this.cacheTimer) clearTimeout(this.cacheTimer);
    },
    methods: {
        getCustomFields() {
            axios.get(this.$apiUrl + '/custom_fields/list', { params: { module: 'product', active_only: 1 } })
                .then((response) => {
                    this.customFields = response.data.data || [];
                    this.applyCustomFieldValues();
                })
                .catch(() => {
                    this.customFields = [];
                });
        },
        applyCustomFieldValues() {
            const values = {};
            this.customFields.forEach(field => {
                const existing = this.customFieldExistingValues[field.id];
                values[field.id] = (field.type !== 'file' && existing !== undefined) ? existing : '';
            });
            this.customFieldValues = values;
        },
        handleCustomFieldFile(event, fieldId) {
            this.$set(this.customFieldFiles, fieldId, event.target.files[0] || null);
        },
        customFieldExistingFileUrl(fieldId) {
            const path = this.customFieldExistingValues[fieldId];
            return path ? this.$storageUrl + path : '';
        },
        validateCustomFields() {
            for (const field of this.customFields) {
                if (!field.is_required) continue;
                if (field.type === 'file') {
                    if (!this.customFieldFiles[field.id] && !this.customFieldExistingValues[field.id]) {
                        this.showError(field.name + ' ' + (__('is_required') || 'is required'));
                        return false;
                    }
                } else {
                    const value = this.customFieldValues[field.id];
                    if (value === undefined || value === null || String(value).trim() === '') {
                        this.showError(field.name + ' ' + (__('is_required') || 'is required'));
                        return false;
                    }
                }
            }
            return true;
        },
        validateDefaultLanguageForTranslation() {
            const form = this.$refs['my-form'];

            // Trigger native browser validation UI
            if (form && !form.reportValidity()) {
                // Switch to default language tab so error field is visible
                this.$nextTick(() => {
                    this.switchToDefaultLanguageTab();
                });
                return false;
            }

            // Also validate required fields specifically
            return this.validateDefaultLanguage();
        },
        fetchActiveLanguages() {
            this.isLoadingLanguages = true;
            return axios.get(this.$apiUrl + '/active_languages')
                .then(response => {
                    if (response.data.data) {
                        this.languages = response.data.data;
                        this.activeLanguages = response.data.data;
                        const defaultLang = this.languages.find(lang => lang.is_default === 1);
                        if (defaultLang) {
                            this.defaultLanguageId = defaultLang.id;
                        }

                        // Get current language ID from app_locale
                        const appLocale = window.appLocale || 'en';
                        const currentLanguage = this.activeLanguages.find(
                            lang => lang.code === appLocale
                        );
                        if (currentLanguage) {
                            this.currentLanguageId = currentLanguage.id;
                        } else if (defaultLang) {
                            this.currentLanguageId = defaultLang.id;
                        }

                        this.initializeTranslations();
                        this.isLoadingLanguages = false;
                    } else {
                        this.isLoadingLanguages = false;
                    }
                })
                .catch(error => {
                    console.error('Error loading languages:', error);
                    this.isLoadingLanguages = false;
                });
        },

        initializeTranslations() {
            const allTranslations = {};
            this.languages.forEach(language => {
                allTranslations[language.id] = {
                    name: '',
                    tags: '',
                    manufacturer: '',
                    description: '',
                    meta_title: '',
                    meta_keywords: '',
                    schema_markup: '',
                    meta_description: ''
                };
            });
            this.translations = allTranslations;
        },

        // Handle input events for default language fields
        handleDefaultLanguageInput(fieldName, language) {
            if (language.is_default && this.translations[language.id]) {
                // Update the main data property with the translation value
                this[fieldName] = this.translations[language.id][fieldName];

                // Special handling for name field - also create slug
                if (fieldName === 'name') {
                    this.createSlug();
                }
            }
        },

        // Handle tag input for any language tab
        handleTagInput(languageId, value) {
            // Ensure value is properly formatted (could be array, string, or undefined)
            let tagIds = value;
            if (!tagIds) {
                tagIds = [];
            } else if (typeof tagIds === 'string') {
                tagIds = tagIds.split(',').map(t => t.trim()).filter(t => t);
            } else if (!Array.isArray(tagIds)) {
                tagIds = [tagIds];
            }

            if (languageId === this.defaultLanguageId) {
                // For default language, update tag_ids
                this.tag_ids = tagIds;
            } else {
                // For other languages, update tagIdsByLanguage
                this.$set(this.tagIdsByLanguage, languageId, tagIds);
            }
            // Convert IDs to names for translation
            this.handleTagChange(languageId);
        },

        // Handle tag changes - convert IDs to names for translation
        handleTagChange(languageId) {
            if (!this.translations[languageId]) return;

            // Get tag IDs for this language
            let tagIds = [];
            if (languageId === this.defaultLanguageId) {
                tagIds = Array.isArray(this.tag_ids) ? this.tag_ids : (this.tag_ids ? String(this.tag_ids).split(',').map(t => t.trim()).filter(t => t) : []);
            } else {
                const langTagIds = this.tagIdsByLanguage[languageId];
                if (langTagIds) {
                    tagIds = Array.isArray(langTagIds) ? langTagIds : (String(langTagIds).split(',').map(t => t.trim()).filter(t => t));
                }
            }

            // Convert tag IDs to tag names for translation
            if (tagIds.length > 0) {
                const tagNames = tagIds.map(tagId => {
                    // If it's a number, find the tag name from tags array
                    if (typeof tagId === 'number' || (typeof tagId === 'string' && !isNaN(tagId))) {
                        const tag = this.tags.find(t => t.id == tagId);
                        return tag ? tag.name : tagId;
                    }
                    // If it's already a string (new tag), use it as is
                    return tagId;
                });
                this.$set(this.translations[languageId], 'tags', tagNames.join(','));
            } else {
                // Only clear if we explicitly have an empty array (user cleared tags)
                // Don't overwrite if translation.tags already has a value
                if (tagIds.length === 0 && (!this.translations[languageId].tags || this.translations[languageId].tags === '')) {
                    this.$set(this.translations[languageId], 'tags', '');
                }
            }
        },

        getEditorConfig() {
            const plugins = (this.$editorPlugins && Array.isArray(this.$editorPlugins))
                ? this.$editorPlugins
                : ["autolink", "lists", "link", "image", "charmap", "anchor", "searchreplace", "visualblocks", "media", "table", "wordcount", "code", "codesample"];

            const toolbar = this.$editorToolbar || "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | charmap | code | removeformat";

            const fontSizes = this.$editorFont_size_formats || '8pt 10pt 12pt 14pt 16pt 18pt 24pt 36pt 48pt';

            return {
                height: 400,
                plugins: plugins,
                toolbar: toolbar,
                font_size_formats: fontSizes,
                ...this.$tinymceImageUploadOptions()
            };
        },

        // Helper method to safely trigger file input click (handles refs in v-for)
        triggerRefClick(refName) {
            this.$nextTick(() => {
                try {
                    const ref = this.$refs[refName];
                    if (!ref) {
                        return;
                    }
                    // Handle array case (refs inside v-for)
                    if (Array.isArray(ref)) {
                        // Find first valid element in array
                        for (let i = 0; i < ref.length; i++) {
                            if (ref[i] && typeof ref[i].click === 'function') {
                                ref[i].click();
                                return;
                            }
                        }
                        return;
                    }
                    // Handle single ref case
                    if (typeof ref.click === 'function') {
                        ref.click();
                    }
                } catch (e) {
                    console.warn('Error triggering file input click:', e);
                }
            });
        },

        validateDefaultLanguage() {
            if (!this.defaultLanguageId) {
                this.showError(__('default_language_not_found'));
                return false;
            }

            const defaultTranslation = this.translations[this.defaultLanguageId];

            if (!defaultTranslation.name || defaultTranslation.name.trim() === '') {
                this.showError(__('please_fill_product_name_in_default_language'));
                this.switchToDefaultLanguageTab();
                return false;
            }

            if (!defaultTranslation.description || defaultTranslation.description.trim() === '') {
                this.showError(__('please_fill_description_in_default_language'));
                this.switchToDefaultLanguageTab();
                return false;
            }

            return true;
        },

        switchToDefaultLanguageTab() {
            const defaultLangIndex = this.languages.findIndex(lang => lang.id === this.defaultLanguageId);
            if (defaultLangIndex !== -1) {
                this.activeLanguageTab = defaultLangIndex;
            }
        },

        loadTranslations() {
            if (!this.id) return;

            // Wait for languages to be loaded first
            if (this.languages.length === 0) {
                this.fetchActiveLanguages().then(() => {
                    this.loadTranslationsData();
                });
                return;
            }

            this.loadTranslationsData();
        },

        // Load translations from API response (translations array with all language records)
        loadTranslationsData() {
            if (!this.record || !this.record.translations || !Array.isArray(this.record.translations)) {
                return;
            }

            const translationsArray = this.record.translations;

            this.languages.forEach(language => {
                const translation = translationsArray.find(t => t.language_id === language.id);
                if (translation) {
                    this.$set(this.translations[language.id], 'name', translation.name || '');
                    this.$set(this.translations[language.id], 'tags', translation.tags || '');
                    this.$set(this.translations[language.id], 'manufacturer', translation.manufacturer || '');
                    this.$set(this.translations[language.id], 'description', translation.description || '');
                    this.$set(this.translations[language.id], 'meta_title', translation.meta_title || '');
                    this.$set(this.translations[language.id], 'meta_keywords', translation.meta_keywords || '');
                    this.$set(this.translations[language.id], 'schema_markup', translation.schema_markup || '');
                    this.$set(this.translations[language.id], 'meta_description', translation.meta_description || '');
                }
            });

            if (this.tags && this.tags.length > 0) {
                this.convertTagNamesToIds();
            }
        },

        // Helper method to convert tag names to IDs for Select2 (for all languages)
        convertTagNamesToIds() {
            if (!this.tags || this.tags.length === 0) {
                return; // Tags not loaded yet
            }

            if (!this.languages || this.languages.length === 0) {
                return; // Languages not loaded yet
            }

            this.languages.forEach(language => {
                if (this.translations[language.id] && this.translations[language.id].tags) {
                    const tagsString = this.translations[language.id].tags;
                    if (tagsString && tagsString.trim()) {
                        // Tags in translation are names (comma-separated string)
                        // Convert names to IDs for Select2
                        const tagNames = tagsString.split(',').map(t => t.trim()).filter(t => t);
                        const tagIds = tagNames.map(tagName => {
                            // Try to find tag by name (case-insensitive matching)
                            const tag = this.tags.find(t => {
                                const tagNameTrimmed = String(t.name || '').trim();
                                const searchNameTrimmed = String(tagName || '').trim();
                                return tagNameTrimmed.toLowerCase() === searchNameTrimmed.toLowerCase();
                            });

                            if (tag) {
                                return tag.id;
                            }
                            // If not found, it might be a new tag (keep as string)
                            return tagName;
                        });

                        if (language.is_default) {
                            this.tag_ids = tagIds;
                        } else {
                            // Use $set to ensure reactivity
                            this.$set(this.tagIdsByLanguage, language.id, tagIds);
                        }
                    } else {
                        // Set empty array if no tags
                        if (language.is_default) {
                            this.tag_ids = [];
                        } else {
                            this.$set(this.tagIdsByLanguage, language.id, []);
                        }
                    }
                } else {
                    // Initialize with empty array if no translation
                    if (!language.is_default) {
                        this.$set(this.tagIdsByLanguage, language.id, []);
                    }
                }
            });
        },

        async generateDescription() {
            if (this.$isDemo == 1) {
                this.showError("This function is not available in demo mode.");
                return;
            }
            if (!this.name) {
                this.showMessage("error", "Please enter the product name.");
                return;
            }

            if (!this.textGenKey) {
                this.showMessage("error", "Text generation API key is not configured");
                return;
            }

            const prompt = this.useCustomPrompt && this.customPrompt.trim()
                ? `${this.customPrompt} for product: ${this.name}. Output raw HTML only, no explanatory text, no code blocks, no images.`
                : `Generate a detailed product description for ${this.name} formatted for TinyMCE editor.
            Structure: Start with <strong>Product Overview</strong>, then multiple <p> paragraphs describing features and benefits.
            Include <strong>Key Features</strong> with <ul><li> bullet points.
            Add <strong>Benefits</strong> section with more <p> content.
            Use <strong> for emphasis, <em> for highlights.
            Important: no code blocks, no markdown syntax, no explanatory text.`;

            try {
                this.isGeneratingAI = true; // Start AI processing state

                const response = await fetch(
                    "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key=" + this.textGenKey,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            contents: [{ parts: [{ text: prompt }] }]
                        })
                    }
                );

                const data = await response.json();

                if (data?.candidates?.[0]?.content?.parts?.[0]?.text) {
                    const generatedText = data.candidates[0].content.parts[0].text;
                    this.description = generatedText;
                    if (this.defaultLanguageId && this.translations[this.defaultLanguageId]) {
                        this.$set(this.translations[this.defaultLanguageId], 'description', generatedText);
                    }
                } else {
                    this.showMessage("error", "Failed to generate description.");
                }
            } catch (error) {
                this.showMessage("error", "An error occurred while generating the description.");
            } finally {
                this.isGeneratingAI = false; // Stop AI processing state
            }
        },

        createSlug() {
            if (this.name !== "") {
                this.slug = this.name
                    .normalize("NFD") // Normalize Unicode
                    .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
                    .replace(/[^\p{L}\p{N}\s-]/gu, '') // Keep letters, numbers, spaces, and hyphens (any language)
                    .trim()
                    .replace(/\s+/g, '-') // Replace spaces with '-'
                    .toLowerCase();
            } else {
                this.slug = "";
            }
        },

        fetchTags(query) {
            if (query.length > 1) {
                axios.get(this.$apiUrl + '/products/tags', {
                    params: { search: query }
                })
                    .then(response => {
                        this.tagSuggestions = response.data;
                    })
                    .catch(error => {
                        console.error(error);
                    });
            }
        },
        isAttributeValueChecked(attributeId, valueId) {
            return (this.selectedAttributeValues[attributeId] || []).includes(valueId);
        },
        toggleAttributeValueChecked(attributeId, valueId) {
            const current = (this.selectedAttributeValues[attributeId] || []).slice();
            const idx = current.indexOf(valueId);
            const isUnchecking = idx !== -1;

            if (isUnchecking) {
                // Any row that already has a real id (i.e. saved to the DB) and whose combo uses
                // the value being unchecked will disappear from the matrix once we resync - and
                // per the update() cleanup, disappearing here means it gets DELETED on save. Warn
                // before that becomes irreversible instead of silently dropping saved data.
                const affected = this.inputs.filter(input => {
                    if (!input.id) return false;
                    const ids = (input.combo_value_ids && input.combo_value_ids.length)
                        ? input.combo_value_ids : [input.attribute_value_id];
                    return ids.includes(valueId);
                });
                if (affected.length) {
                    this.$swal.fire({
                        title: __('are_you_sure'),
                        text: __('this_will_delete_the_following_saved_variants') + ': '
                            + affected.map(a => a.label || a.name).join(', '),
                        confirmButtonText: __('yes_sure'),
                        cancelButtonText: __('cancel'),
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#37a279',
                        cancelButtonColor: '#d33',
                    }).then(result => {
                        if (result.value) {
                            this.applyAttributeValueToggle(attributeId, valueId, current, idx);
                        } else {
                            // Cancel: selectedAttributeValues stays untouched, but the button
                            // checkbox already flipped visually on the native click - force it to
                            // remount so it re-reads the real (still-checked) state.
                            const key = attributeId + '_' + valueId;
                            this.$set(this.checkboxRenderKey, key, (this.checkboxRenderKey[key] || 0) + 1);
                        }
                    });
                    return;
                }
            }

            this.applyAttributeValueToggle(attributeId, valueId, current, idx);
        },
        applyAttributeValueToggle(attributeId, valueId, current, idx) {
            if (idx === -1) current.push(valueId); else current.splice(idx, 1);
            this.$set(this.selectedAttributeValues, attributeId, current);
            // Legacy rows (saved before the attribute system - no attribute_value_id) aren't part
            // of the combo matrix at all, so they'd otherwise be silently dropped by the full
            // rebuild below. Carry them through untouched on every toggle.
            const legacyRows = this.inputs.filter(input => !input.attribute_value_id && input.id);
            this.syncVariantsFromSelection(legacyRows);
        },
        /* Cartesian product of every checked value across attributes. Existing rows whose combo
           already matches are kept (preserving saved id/price/stock/images), but their label and
           combo_value_ids are always refreshed from the current selection so a row can never keep
           a stale/incorrect label across future syncs; new combos get blank rows. Runs automatically
           on every checkbox toggle - no combos selected just clears back to blank (plus any legacyRows
           passed in, which are always preserved as-is since they aren't part of the matrix). */
        syncVariantsFromSelection(legacyRows) {
            legacyRows = legacyRows || [];
            const combos = this.selectedAttributeCombos;
            if (combos.length === 0) {
                this.inputs = legacyRows.length
                    ? legacyRows.slice()
                    : [{ 'name': '', 'packet_status': '', 'attribute_value_id': '' }];
                this.activeVariantIndex = 0;
                return;
            }

            let rows = [{ valueIds: [], labels: [] }];
            combos.forEach(entry => {
                const next = [];
                rows.forEach(row => {
                    entry.values.forEach(value => {
                        next.push({
                            valueIds: [...row.valueIds, value.id],
                            labels: [...row.labels, value.value],
                        });
                    });
                });
                rows = next;
            });

            const existingByKey = {};
            this.inputs.forEach(input => {
                if (!input.attribute_value_id) return;
                const key = this.comboKey(input.combo_value_ids && input.combo_value_ids.length ? input.combo_value_ids : [input.attribute_value_id]);
                existingByKey[key] = input;
            });

            this.inputs = rows.map(row => {
                const key = this.comboKey(row.valueIds);
                const existing = existingByKey[key];
                if (existing) {
                    // Reuse the saved id/price/stock/status/images, but always refresh the label
                    // and combo_value_ids from the freshly computed combo - otherwise a row whose
                    // label was ever wrong (e.g. loaded from an incomplete attribute_values
                    // relation) would stay wrong forever across every future sync.
                    existing.attribute_value_id = row.valueIds[0];
                    existing.combo_value_ids = row.valueIds;
                    existing.label = row.labels.join(' / ');
                    return existing;
                }
                return {
                    name: '',
                    attribute_value_id: row.valueIds[0],
                    combo_value_ids: row.valueIds,
                    label: row.labels.join(' / '),
                    packet_price: '',
                    packet_purchase_price: '',
                    discounted_price: '',
                    packet_stock: '',
                    packet_status: '',
                    images: [],
                };
            }).concat(legacyRows);
            if (this.activeVariantIndex >= this.inputs.length) this.activeVariantIndex = 0;
        },
        /* Button shortcut: check every value of every attribute, then generate the full matrix. */
        generateAllVariants() {
            if (this.attributeOptions.length === 0) {
                this.showError(__('please_select_category_first'));
                return;
            }
            this.attributeOptions.forEach(attribute => {
                this.$set(this.selectedAttributeValues, attribute.id, (attribute.values || []).map(v => v.id));
            });
            const legacyRows = this.inputs.filter(input => !input.attribute_value_id && input.id);
            this.syncVariantsFromSelection(legacyRows);
        },
        selectVariant(index) {
            this.activeVariantIndex = index;
        },
        // Repairs a legacy variant row (saved before the attribute system, no attribute_value_id)
        // by assigning it one of the current category's attribute values.
        assignLegacyAttributeValue(index, valueId) {
            if (!valueId) return;
            let label = '';
            for (const attribute of this.attributeOptions) {
                const found = (attribute.values || []).find(v => String(v.id) === String(valueId));
                if (found) {
                    label = found.value + (found.short_code ? ' (' + found.short_code + ')' : '');
                    break;
                }
            }
            const input = this.inputs[index];
            input.attribute_value_id = valueId;
            input.combo_value_ids = [valueId];
            input.label = label;
            this.$set(this.inputs, index, { ...input });
        },
        remove(index) {
            let variant_id = (this.inputs[index].id) ? this.inputs[index].id : "";
            if (this.id && variant_id !== "") {
                this.$swal.fire({
                    title: __('are_you_sure'),
                    text: __('you_want_be_able_to_revert_this'),
                    confirmButtonText: __('yes_sure'),
                    cancelButtonText: __('cancel'),
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#37a279',
                    cancelButtonColor: '#d33',
                }).then(result => {
                    if (result.value) {
                        let postData = {
                            id: variant_id
                        }
                        axios.post(this.$apiUrl + '/products/delete', postData)
                            .then((response) => {
                                let data = response.data;
                                if (data.status === false || data.status === 0) {
                                    // Backend refused (e.g. variant is tied to past orders) - the
                                    // row was never touched, so keep showing the chip instead of
                                    // splicing it out and reporting a false "removed" success.
                                    this.showError(data.message);
                                    return;
                                }
                                this.inputs.splice(index, 1)
                                if (data.data && data.data.product_deleted) {
                                    this.$swal.fire({
                                        title: __('product_deleted'),
                                        text: __('this_was_the_last_variant_the_product_has_been_deleted_please_add_it_as_a_new_product'),
                                        icon: 'warning',
                                        confirmButtonText: __('ok'),
                                        confirmButtonColor: '#37a279',
                                    }).then(() => {
                                        this.$router.push({ path: this.loggedUser?.role?.name === "Seller" ? '/seller/manage_products' : '/manage_products' });
                                    });
                                    return;
                                }
                                this.showSuccess(data.message)
                                if (this.activeVariantIndex >= this.inputs.length) this.activeVariantIndex = Math.max(0, this.inputs.length - 1);
                            });
                    }
                });
            } else {
                this.inputs.splice(index, 1)
                if (this.activeVariantIndex >= this.inputs.length) this.activeVariantIndex = Math.max(0, this.inputs.length - 1);
            }
        },

        dropFile(event) {
            event.preventDefault();
            // Safely access file_image ref (can be array in v-for)
            const fileInput = Array.isArray(this.$refs.file_image)
                ? this.$refs.file_image[0]
                : this.$refs.file_image;

            if (fileInput) {
                fileInput.files = event.dataTransfer.files;
                this.fileImage(); // Trigger the onChange event manually
            }
            // Clean up
            event.currentTarget.classList.add('bg-gray-100');
            event.currentTarget.classList.remove('bg-green-300');
        },

        fileImage() {
            // Safely access file_image ref (can be array in v-for)
            const fileInput = Array.isArray(this.$refs.file_image)
                ? this.$refs.file_image[0]
                : this.$refs.file_image;

            if (!fileInput) return;

            const file = fileInput.files[0];

            // Reset previous error message
            this.mainImageerror = null;

            // Check if a file was selected
            if (!file) return;

            // Perform image validation
            const validTypes = ["image/jpeg", "image/png", "image/jpg", "image/gif", "image/webp"];
            if (!validTypes.includes(file.type)) {
                this.mainImageerror = "Invalid file type. Please upload a JPEG, PNG, JPG,  GIF or WEBP image.";
                this.main_image_path = "";
                this.main_image_name = "";
                return;
            }

            const maxSize = 2 * 1024 * 1024; // 2MB
            if (file.size > maxSize) {
                this.mainImageerror = "File size exceeds the maximum allowed limit (2MB).";
                this.main_image_path = "";
                this.main_image_name = "";
                return;
            }

            // Create a URL for the uploaded image and display it
            this.imageUrl = URL.createObjectURL(file);
            this.image = fileInput.files[0];
            this.main_image_path = URL.createObjectURL(this.image);
            this.main_image_name = this.image.name;
        },
        dropFileOtherImage(event) {
            event.preventDefault();
            // Safely access file_other_images ref (can be array in v-for)
            const fileInput = Array.isArray(this.$refs.file_other_images)
                ? this.$refs.file_other_images[0]
                : this.$refs.file_other_images;

            if (fileInput) {
                fileInput.files = event.dataTransfer.files;
                this.otherImage(); // Trigger the onChange event manually
            }
            // Clean up
            event.currentTarget.classList.add('bg-gray-100');
            event.currentTarget.classList.remove('bg-green-300');
        },
        removeOtherImage(index) {
            this.images.splice(index, 1);
        },

        otherImage() {
            // Safely access file_other_images ref (can be array in v-for)
            const fileInput = Array.isArray(this.$refs.file_other_images)
                ? this.$refs.file_other_images[0]
                : this.$refs.file_other_images;

            if (!fileInput) return;

            const files = fileInput.files;

            for (let i = 0; i < files.length; i++) {
                const file = files[i];

                // Check if the file is an image (you can extend the list of allowed file types)
                if (!file.type.startsWith('image/')) {
                    this.otherImageerror = "Invalid file type. Please upload a JPEG, PNG, JPG,  GIF or WEBP image.";
                    continue;
                }

                let image = {};
                image.url = URL.createObjectURL(file);
                image.name = file.name;
                image.file = file; // Store the actual file object
                this.images.push(image);
            }

            // Native file inputs replace the whole selection on every dialog open, so picking
            // images one at a time would wipe the previous pick. Sync the merged set back into
            // the input via DataTransfer, so the submit code (which reads fileInput.files) sees
            // every picked file.
            const dataTransfer = new DataTransfer();
            this.images.forEach(item => dataTransfer.items.add(item.file));
            fileInput.files = dataTransfer.files;
        },

        /* Keeps the native file input's FileList in sync with variantFiles[index] (order and
           membership), so the submit code (which still reads packetInput.files) always sees
           exactly what's shown in the reorderable preview. */
        syncVariantFilesInput(index) {
            const inputEl = this.$refs['packet_variant_images_' + index][0];
            const dataTransfer = new DataTransfer();
            this.variantFiles[index].forEach(item => dataTransfer.items.add(item.file));
            inputEl.files = dataTransfer.files;
        },
        reorderVariantFiles(index) {
            this.syncVariantFilesInput(index);
        },
        removeVariantFile(index, itemIndex) {
            this.variantFiles[index].splice(itemIndex, 1);
            this.syncVariantFilesInput(index);
        },
        /* Native file inputs replace the whole selection on every dialog open, so picking
           images one at a time would wipe the previous pick. Accumulate picked files across
           opens here and push the merged set back into the input via DataTransfer, so the
           submit code (which still reads packetInput.files) sees every picked file. */
        variantImagesChanges(index) {
            const inputEl = this.$refs['packet_variant_images_' + index][0];
            const validExtensions = ['jpg', 'jpeg', 'png', 'gif'];
            const maxSizeInBytes = 5 * 1024 * 1024;

            if (!this.variantFiles[index]) this.$set(this.variantFiles, index, []);
            const accumulated = this.variantFiles[index];

            this.variantImageerror = '';

            for (let i = 0; i < inputEl.files.length; i++) {
                const file = inputEl.files[i];
                const extension = file.name.split('.').pop().toLowerCase();

                if (!validExtensions.includes(extension)) {
                    this.variantImageerror = "Invalid file type. Please upload a JPEG, PNG, JPG,  GIF or WEBP image.";
                    return;
                }
                if (file.size > maxSizeInBytes) {
                    this.variantImageerror = "File size exceeds the limit of 5 MB.";
                    return;
                }
                accumulated.push({ file, url: URL.createObjectURL(file), name: file.name });
            }

            this.syncVariantFilesInput(index);
            Vue.set(this.variantFiles, index, accumulated);
        },

        getSellerCategories() {
            const selectPlaceholder = '<option value="">' + __('select_category') + '</option>';
            // When no seller selected, show only placeholder and clear selection
            if (!this.seller_id || this.seller_id === 0 || this.seller_id === '') {
                this.categoryOptions = selectPlaceholder;
                this.category_id = '';
                return;
            }
            this.isLoading = true;
            axios.get(this.$apiUrl + '/categories/seller_categories', {
                params: { seller_id: this.seller_id }
            })
                .then((response) => {
                    this.isLoading = false;
                    const data = response.data;
                    let optionsHtml = '';
                    if (typeof data === 'string') {
                        optionsHtml = data;
                    } else if (data && typeof data.data === 'string') {
                        optionsHtml = data.data;
                    }
                    this.categoryOptions = selectPlaceholder + optionsHtml;
                })
                .catch((error) => {
                    this.isLoading = false;
                    this.categoryOptions = selectPlaceholder;
                });
        },
        getSeller() {
            if (this.seller_id !== 0 && this.seller_id !== "" && !this.id) {
                this.isLoading = true;
                let param = {
                    "seller_id": this.seller_id
                }
                axios.get(this.$apiUrl + '/sellers/edit/' + this.seller_id, {
                    params: param
                }).then((response) => {
                    this.isLoading = false,
                        this.require_products_approval = response.data.data.require_products_approval;
                    this.is_approved = this.require_products_approval == 0 ? 1 : 0;
                });
            }
        },
        getCategories() {
            this.isLoading = true
            axios.get(this.$apiUrl + '/categories/options')
                .then((response) => {
                    this.isLoading = false
                    let data = response.data;
                    const placeholder = '<option value="">' + __('select_category') + '</option>';
                    if (typeof data === 'string') {
                        this.categoryOptions = placeholder + data;
                    } else if (data.data && typeof data.data === 'string') {
                        this.categoryOptions = placeholder + data.data;
                    } else {
                        this.categoryOptions = placeholder;
                    }
                })
                .catch((error) => {
                    this.isLoading = false
                });
        },
        getSellers() {
            this.isLoading = true
            axios.get(this.$apiUrl + '/sellers', { params: { filterStatus: 1 } })
                .then((response) => {
                    this.isLoading = false
                    let data = response.data;
                    this.sellers = data.data
                });
        },
        getTaxes() {
            this.isLoading = true
            axios.get(this.$apiUrl + '/products/taxes')
                .then((response) => {
                    this.isLoading = false
                    let data = response.data;
                    this.taxes = data.data
                });
        },
        /* Variant values come strictly from the attributes assigned to the selected category.
           A category with none assigned shows none - no fallback to the full attribute list. */
        loadAttributes() {
            if (!this.category_id) {
                this.attributeOptions = [];
                return Promise.resolve();
            }

            this.isLoadingAttributes = true;

            return axios.get(this.$apiUrl + '/products/attributes/get', { params: { category_id: this.category_id } })
                .then((response) => {
                    this.attributeOptions = response.data.data || [];
                })
                .catch(() => {
                    this.attributeOptions = [];
                })
                .finally(() => {
                    this.isLoadingAttributes = false;
                });
        },
        getBrands() {
            this.isLoading = true
            axios.get(this.$apiUrl + '/products/brands/get')
                .then((response) => {
                    this.isLoading = false
                    let data = response.data;
                    this.brands = data.data;
                    if (this.cachedData && this.cachedData.brand) {
                        const foundBrand = this.brands.find(b => b.id === this.cachedData.brand.id) || null;
                        // Update brand with translated name
                        this.$nextTick(() => {
                            if (foundBrand && this.translatedBrands && this.translatedBrands.length > 0) {
                                const translatedBrand = this.translatedBrands.find(b => b.id === foundBrand.id);
                                if (translatedBrand) {
                                    this.brand = { ...foundBrand, name: translatedBrand.name, title: translatedBrand.title };
                                } else {
                                    this.brand = foundBrand;
                                }
                            } else {
                                this.brand = foundBrand;
                            }
                        });
                    }
                });
        },
        getCountries() {
            this.isLoading = true
            axios.get(this.$apiUrl + '/countries/active')
                .then((response) => {
                    this.isLoading = false
                    let data = response.data;
                    this.countries = data.data;
                    if (this.cachedData && this.cachedData.made_in) {
                        this.made_in = this.countries.find(c => c.id === this.cachedData.made_in.id) || null;
                    }
                });
        },
        getTags() {
            this.isLoading = true
            axios.get(this.$apiUrl + '/products/tags')
                .then((response) => {
                    this.isLoading = false
                    let data = response.data;
                    this.tags = data.data;

                    // After tags are loaded, convert tag names to IDs for Select2 (if translations are already loaded)
                    if (this.id && this.languages.length > 0) {
                        this.$nextTick(() => {
                            this.convertTagNamesToIds();
                        });
                    }
                });
        },

        getAddonGroups() {
            const url = this.isSellerRole ? '/seller/addons' : '/products/addons';
            axios.get(this.$apiUrl + url, { params: { per_page: 100 } })
                .then((response) => {
                    this.addonGroupOptions = response.data.data || [];
                    this.applySelectedAddonGroups();
                });
        },

        applySelectedAddonGroups() {
            if (!this.record || !this.record.addon_groups || !this.addonGroupOptions.length) {
                return;
            }
            const selectedIds = this.record.addon_groups.map(g => g.id);
            this.selectedAddonGroups = this.addonGroupOptions.filter(g => selectedIds.includes(g.id));
        },

        /**
         * Status label for dropdown. API returns status_name as object by lang code { en: "...", hi: "..." }.
         * Picks current app locale; fallback to status.status.
         */
        getStatusDisplayName(status) {
            if (!status) return '';
            const sn = status.status_name;
            if (sn == null) return status.status || '';
            if (typeof sn === 'string') return sn.trim() || status.status || '';
            if (typeof sn === 'object' && !Array.isArray(sn)) {
                const appLocale = window.appLocale || window.localStorage.getItem('lang') || 'en';
                const forLocale = sn[appLocale];
                if (forLocale != null && String(forLocale).trim() !== '') return String(forLocale).trim();
                const first = Object.values(sn).find(val => val != null && String(val).trim() !== '');
                return first != null ? String(first).trim() : (status.status || '');
            }
            return status.status || '';
        },
        getOrderStatus() {
            this.isLoading = true
            axios.get(this.$apiUrl + '/order_statuses').then((response) => {
                this.isLoading = false
                let data = response.data;
                const statusesToRemoveIds = [6, 7, 8];
                this.order_status = data.data.filter(status => !statusesToRemoveIds.includes(status.id));
            });
        },
        getTextGenKey() {
            // Get the text generation API key from store settings
            axios.get(this.$apiUrl + '/store_settings')
                .then((response) => {
                    let data = response.data.data;
                    if (data.store_settings) {
                        data.store_settings.forEach((item) => {
                            if (item.variable === 'text_gen_key') {
                                this.textGenKey = item.value;
                            }
                        });
                    }
                })
                .catch((error) => {
                    console.error('Error fetching text generation key:', error);
                });
        },
        validateBarcode() {
            const barcodePattern = /^[A-Za-z0-9-]+$/;

            if (barcodePattern.test(this.barcode)) {
                this.validationBarcodeMessage = '';
                this.isBarcodeValid = true;
            } else {
                this.validationBarcodeMessage = 'Invalid Barcode Number.';
                this.isBarcodeValid = false;
            }
        },
        validateDiscountedPrice(input) {
            const discountedPrice = parseFloat(input.discounted_price);
            const actualPrice = parseFloat(input.packet_price);
            if (discountedPrice >= actualPrice) {
                input.validationErrorDiscountedPrice = "Discounted Price must be less than Actual Price";
                input.discounted_price = null;
            } else {
                input.validationErrorDiscountedPrice = null;
            }
        },
        validateDiscountedPriceLoose(input) {
            const discountedPrice = parseFloat(input.loose_discounted_price);
            const actualPrice = parseFloat(input.loose_price);
            if (discountedPrice >= actualPrice) {
                input.validationErrorDiscountedPriceLoose = "Discounted Price must be less than Actual Price";
                input.loose_discounted_price = null;
            } else {
                input.validationErrorDiscountedPriceLoose = null;
            }
        },
        /* Every variant must be backed by an attribute value, and no value may be used twice. */
        comboKey(ids) {
            return (ids || []).slice().sort((a, b) => Number(a) - Number(b)).join('-');
        },
        validateVariantAttributeValues() {
            const seen = [];
            console.log('[variant-debug] inputs', this.inputs.map(inp => ({
                label: inp.label,
                attribute_value_id: inp.attribute_value_id,
                combo_value_ids: inp.combo_value_ids,
            })));

            for (let i = 0; i < this.inputs.length; i++) {
                const valueId = this.inputs[i].attribute_value_id;

                if (!valueId) {
                    this.showError(__('please_select_attribute_value_for_variant') + ' ' + (i + 1));
                    return false;
                }

                const comboIds = (this.inputs[i].combo_value_ids && this.inputs[i].combo_value_ids.length)
                    ? this.inputs[i].combo_value_ids : [valueId];
                const key = this.comboKey(comboIds);
                console.log('[variant-debug] variant', i, 'key', key, 'comboIds', comboIds);

                if (seen.indexOf(key) !== -1) {
                    console.log('[variant-debug] DUPLICATE at index', i, 'matches earlier key', key);
                    this.showError(__('variations_are_duplicate'));
                    return false;
                }
                seen.push(key);
            }
            return true;
        },
        getProduct() {
            this.isLoading = true;

            axios.get(this.$apiUrl + '/products/edit/' + this.id)
                .then((response) => {
                    let data = response.data;
                    if (data.status === 1) {
                        this.record = data.data

                        // Custom field values
                        this.customFieldExistingValues = (!this.clone && this.record.custom_field_values) ? this.record.custom_field_values : {};
                        this.applyCustomFieldValues();

                        this.name = this.record.name;
                        this.slug = this.record.slug;
                        this.barcode = this.record.barcode;
                        if (this.clone) {
                            this.name = '';
                            this.slug = '';
                            this.barcode = '';
                        }

                        this.seller_id = this.record.seller_id;
                        this.getSellerCategories();
                        this.getSeller();

                        this.tag_ids = this.record.tags.map(item => item.id);
                        this.applySelectedAddonGroups();

                        this.tax_id = this.record.tax_id;

                        const foundBrand = this.brands.find((item) => {
                            return item.id === this.record.brand_id;
                        });
                        // Update brand with translated name after brands are loaded
                        this.$nextTick(() => {
                            if (foundBrand && this.translatedBrands && this.translatedBrands.length > 0) {
                                const translatedBrand = this.translatedBrands.find(b => b.id === foundBrand.id);
                                if (translatedBrand) {
                                    this.brand = { ...foundBrand, name: translatedBrand.name, title: translatedBrand.title };
                                } else {
                                    this.brand = foundBrand;
                                }
                            } else {
                                this.brand = foundBrand;
                            }
                        });

                        /* The stored type is always packet/loose (the legacy stock semantics); the form
                           itself is always attribute-driven. */
                        this.suppressCategoryWatch = true;
                        this.category_id = this.record.category_id;
                        this.$nextTick(() => { this.suppressCategoryWatch = false; });
                        const attributesLoaded = this.loadAttributes();

                        this.manufacturer = (this.record.manufacturer != null && this.record.manufacturer !== "null") ? this.record.manufacturer : "";

                        // Load translations
                        this.loadTranslations();


                        this.made_in = this.countries.find((item) => {
                            return item.id == this.record.made_in;
                        });

                        this.tax_included_in_price = this.record.tax_included_in_price;

                        this.return_status = this.record.return_status;
                        this.return_days = this.record.return_days;
                        this.cancelable_status = this.record.cancelable_status;

                        this.till_status = this.record.till_status;
                        this.cod_allowed_status = this.record.cod_allowed;
                        this.require_prescription = this.record.require_prescription || 0;
                        this.max_allowed_quantity = this.record.total_allowed_quantity;
                        this.description = this.record.description;
                        this.is_approved = this.record.is_approved;
                        this.status = this.record.status;
                        this.is_unlimited_stock = this.record.is_unlimited_stock;
                        this.main_image_path = this.record.image ? (this.$storageUrl + this.record.image) : "";
                        this.other_images = this.record.images;
                        this.image = this.record.image;
                        /* image_mode isn't persisted on the product itself - infer it from what
                           was actually saved: no main image but variants carry images means it
                           was saved as variant-wise. */
                        const anyVariantHasImages = (this.record.variants || []).some(v => v.images && v.images.length > 0);
                        this.image_mode = (!this.record.image && anyVariantHasImages) ? 'variant' : 'global';
                        this.meta_title = this.record.meta_title;
                        this.meta_keywords = this.record.meta_keywords;
                        this.schema_markup = this.record.schema_markup;
                        this.meta_description = this.record.meta_description;

                        // Set default language translation from main record
                        if (this.defaultLanguageId && this.translations[this.defaultLanguageId]) {
                            this.translations[this.defaultLanguageId].name = this.name;
                            // Convert tag_ids to tag names for translation
                            if (Array.isArray(this.tag_ids) && this.tag_ids.length > 0) {
                                const tagNames = this.tag_ids.map(tagId => {
                                    const tag = this.tags.find(t => t.id == tagId);
                                    return tag ? tag.name : tagId;
                                });
                                this.translations[this.defaultLanguageId].tags = tagNames.join(',');
                            } else {
                                this.translations[this.defaultLanguageId].tags = '';
                            }
                            this.translations[this.defaultLanguageId].manufacturer = this.manufacturer;
                            this.translations[this.defaultLanguageId].description = this.description;
                            this.translations[this.defaultLanguageId].meta_title = this.meta_title;
                            this.translations[this.defaultLanguageId].meta_keywords = this.meta_keywords;
                            this.translations[this.defaultLanguageId].schema_markup = this.schema_markup;
                            this.translations[this.defaultLanguageId].meta_description = this.meta_description;
                        }

                        let vm = this;
                        this.selectedAttributeValues = {};
                        // Rows backed by a real attribute value go through the same cartesian/merge
                        // reconciliation as the checkbox picker (see syncVariantsFromSelection) once
                        // attributeOptions has loaded, below - this is what stops a stray/incomplete
                        // saved variant (e.g. one whose combo no longer matches every checked
                        // attribute) from resurfacing as an orphan tab on every reload. Legacy rows
                        // (saved before the attribute system - no attribute_value_id) aren't part of
                        // the matrix and are always preserved as-is.
                        const loadedRows = [];
                        const legacyRows = [];
                        this.record.variants.forEach(function (item) {
                            // attribute_values[] is meant to be a superset that always includes the
                            // primary attribute_value_id alongside any secondary combo values (see
                            // syncVariantComboAttributeValues on the backend) - but don't rely on that
                            // blindly for the label/checkbox state, since legacy/bulk-edited rows can
                            // have an incomplete relation.
                            const allValues = item.attribute_values || [];
                            const comboValueIds = [item.attribute_value_id, ...allValues.map(v => v.id)].filter((id, idx, arr) => id && arr.indexOf(id) === idx);
                            const labels = allValues.map(v => v.value);

                            // Pre-check the matching attribute value checkboxes so the picker reflects saved combos.
                            const checkValue = (attributeId, valueId) => {
                                if (!attributeId || !valueId) return;
                                const current = vm.selectedAttributeValues[attributeId] || [];
                                if (!current.includes(valueId)) current.push(valueId);
                                vm.$set(vm.selectedAttributeValues, attributeId, current);
                            };
                            allValues.forEach(v => checkValue(v.attribute_id, v.id));

                            const row = {
                                'id': (item.id) ? item.id : "",
                                'attribute_value_id': item.attribute_value_id ?? "",
                                'combo_value_ids': comboValueIds,
                                'label': labels.join(' / '),
                                'packet_price': item.price,
                                'packet_purchase_price': item.purchase_price,
                                'discounted_price': item.discounted_price,
                                'packet_stock': item.stock,
                                'packet_status': item.status,
                                'images': item.images || [],
                            };

                            if (item.attribute_value_id) {
                                loadedRows.push(row);
                            } else {
                                legacyRows.push(row);
                            }
                        });

                        Promise.resolve(attributesLoaded).then(() => {
                            if (vm.attributeOptions.length > 0) {
                                // Reconcile through the same key-based merge as the checkbox picker so
                                // this.inputs never diverges from the checked attribute values - any
                                // loaded row that isn't a full, valid combo across every currently
                                // checked attribute would normally be dropped here.
                                vm.inputs = loadedRows;
                                vm.syncVariantsFromSelection(legacyRows);

                                // A dropped row isn't just hidden - since it also never gets submitted
                                // on save, the backend's delete-orphans sync (ProductApisController::
                                // update) would silently delete it from the database with zero warning
                                // to the seller. Keep it visible instead (flagged), so it's included on
                                // save and the seller can see/fix/delete it deliberately.
                                const survivingIds = new Set(vm.inputs.filter(i => i.id).map(i => i.id));
                                const droppedRows = loadedRows.filter(row => row.id && !survivingIds.has(row.id));
                                if (droppedRows.length) {
                                    droppedRows.forEach(row => { row.orphan_combo = true; });
                                    vm.inputs = vm.inputs.concat(droppedRows);
                                }
                            } else {
                                // No attributes available for this category (e.g. removed since the
                                // variants were saved, or the attributes request failed) - nothing to
                                // reconcile against, so just show what was saved.
                                vm.inputs = loadedRows.concat(legacyRows);
                            }

                            if (vm.inputs.length === 0) {
                                vm.inputs = [{ 'name': '', 'packet_status': '', 'attribute_value_id': '' }];
                            }
                        });
                    } else {
                        this.showError(data.message);
                        setTimeout(() => {
                            this.$router.back();
                        }, 1000);
                    }
                }).catch(error => {
                    this.isLoading = false;
                    if (error.message) {
                        this.showError(error.message);
                    } else {
                        this.showError("Something went wrong!");
                    }
                });
        },

        saveRecord: function () {
            // Validate default language
            if (!this.validateDefaultLanguage()) {
                return;
            }

            // Every variant must map to a distinct attribute value
            if (!this.validateVariantAttributeValues()) {
                return;
            }

            if (!this.validateCustomFields()) {
                return;
            }

            this.isLoading = true;
            let vm = this;

            // Get default language translation for main table
            const defaultLang = this.languages.find(lang => lang.is_default === 1);
            if (!defaultLang) {
                vm.showError(__('default_language_not_found'));
                vm.isLoading = false;
                return;
            }

            const defaultTranslation = this.translations[defaultLang.id];

            let formData = new FormData();
            if (this.id) {
                formData.append('id', this.id);
                formData.append('deleteImageIds', JSON.stringify(this.deleteImageIds));
            }
            // Use default language values for main table
            formData.append('name', defaultTranslation.name || '');
            formData.append('slug', this.slug);
            formData.append('seller_id', this.seller_id);
            // Convert tag_ids array to comma-separated string for backend relationship
            const tagIdsString = Array.isArray(this.tag_ids) ? this.tag_ids.join(',') : (this.tag_ids || '');
            formData.append('tag_ids', tagIdsString);
            // Convert tag_ids to tag names for main products table tags column
            let tagsString = '';
            if (Array.isArray(this.tag_ids) && this.tag_ids.length > 0) {
                const tagNames = this.tag_ids.map(tagId => {
                    // If it's a number, find the tag name from tags array
                    if (typeof tagId === 'number' || (typeof tagId === 'string' && !isNaN(tagId))) {
                        const tag = this.tags.find(t => t.id == tagId);
                        return tag ? tag.name : tagId;
                    }
                    // If it's already a string (new tag), use it as is
                    return tagId;
                });
                tagsString = tagNames.join(',');
            } else if (this.tag_ids) {
                // Handle string case
                const tagIdsArray = String(this.tag_ids).split(',').map(t => t.trim());
                const tagNames = tagIdsArray.map(tagId => {
                    if (!isNaN(tagId)) {
                        const tag = this.tags.find(t => t.id == tagId);
                        return tag ? tag.name : tagId;
                    }
                    return tagId;
                });
                tagsString = tagNames.join(',');
            }
            formData.append('tags', tagsString);
            formData.append('tax_id', this.tax_id);
            formData.append('brand_id', this.brand ? this.brand.id : 0);
            formData.append('description', defaultTranslation.description || '');
            formData.append('type', this.type);
            formData.append('is_unlimited_stock', this.is_unlimited_stock);
            formData.append('barcode', (this.barcode != null && this.barcode !== undefined) ? String(this.barcode).trim() : '');
            formData.append('meta_title', defaultTranslation.meta_title || '');
            formData.append('meta_keywords', defaultTranslation.meta_keywords || '');
            formData.append('schema_markup', defaultTranslation.schema_markup || '');
            formData.append('meta_description', defaultTranslation.meta_description || '');
            (this.selectedAddonGroups || []).forEach((group) => {
                formData.append('addon_group_ids[]', group.id);
            });

            /* Variants: the chosen attribute value replaces the old measurement + unit pair.
               The backend derives measurement / stock_unit_id / type from it. */
            for (let i = 0; i < this.inputs.length; i++) {

                formData.append('variant_id[]', (this.inputs[i].id) ? this.inputs[i].id : "");
                formData.append('attribute_value_id[]', this.inputs[i].attribute_value_id);

                const comboValueIds = (this.inputs[i].combo_value_ids && this.inputs[i].combo_value_ids.length)
                    ? this.inputs[i].combo_value_ids : [this.inputs[i].attribute_value_id];
                comboValueIds.forEach((valueId) => {
                    formData.append('combo_attribute_value_ids[' + i + '][]', valueId);
                });

                formData.append('packet_price[]', (this.inputs[i].packet_price != undefined) ? this.inputs[i].packet_price : 0);
                formData.append('packet_purchase_price[]', (this.inputs[i].packet_purchase_price != undefined) ? this.inputs[i].packet_purchase_price : 0);
                formData.append('discounted_price[]', (this.inputs[i].discounted_price != undefined) ? this.inputs[i].discounted_price : 0);
                formData.append('packet_stock[]', (this.inputs[i].packet_stock !== undefined && this.inputs[i].packet_stock !== '') ? this.inputs[i].packet_stock : 0);
                formData.append('packet_status[]', (this.inputs[i].packet_status != undefined) ? this.inputs[i].packet_status : 0);

                // Safely handle variant images refs (can be undefined when card is hidden in non-default language tab)
                const packetRef = this.$refs['packet_variant_images_' + i];
                const packetInput = Array.isArray(packetRef) ? packetRef && packetRef[0] : packetRef;
                if (packetInput && packetInput.files) {
                    for (let j = 0; j < packetInput.files.length; j++) {
                        let file = packetInput.files[j];
                        formData.append('packet_variant_images_' + i + '[]', file);
                    }
                }
            }

            formData.append('status', (this.status != undefined) ? this.status : 0);

            formData.append('category_id', this.category_id);
            formData.append('manufacturer', this.manufacturer || '');

            formData.append('made_in', this.made_in ? this.made_in.id : 0);

            formData.append('shipping_type', this.shipping_type);

            formData.append('pincode_ids_exc', this.pincode_ids_exc);

            formData.append('return_status', this.return_status);
            const returnDaysToStore = (parseInt(this.return_days, 10) > 0) ? this.return_days : 1;
            formData.append('return_days', returnDaysToStore);
            formData.append('cancelable_status', this.cancelable_status);
            formData.append('till_status', this.till_status);
            formData.append('cod_allowed_status', this.cod_allowed_status);
            formData.append('require_prescription', this.require_prescription);
            formData.append('max_allowed_quantity', this.max_allowed_quantity);

            formData.append('is_approved', this.is_approved);
            formData.append('tax_included_in_price', this.tax_included_in_price);
            formData.append('image_mode', this.image_mode);
            if (this.image) {
                formData.append('image', this.image);
            }
            // Other Images - Use files from images array to maintain correct indexing
            for (var i = 0; i < this.images.length; i++) {
                let file = this.images[i].file;
                formData.append('other_images[]', file);
            }

            // Sync manufacturer to default language translation before saving
            if (this.defaultLanguageId && this.translations[this.defaultLanguageId]) {
                this.translations[this.defaultLanguageId].manufacturer = this.manufacturer;
            }

            // Sync tags for all languages before saving (ensure translation.tags is up to date)
            this.languages.forEach(language => {
                if (this.translations[language.id]) {
                    this.handleTagChange(language.id);
                }
            });

            // Prepare translations array
            const allTranslations = [];
            this.languages.forEach(language => {
                const translation = this.translations[language.id];
                // Convert tag IDs to tag names for translation (for all languages)
                let tagsValue = translation.tags || '';

                // Get tag IDs for this language
                let tagIds = [];
                if (language.is_default) {
                    tagIds = Array.isArray(this.tag_ids) ? this.tag_ids : (this.tag_ids ? String(this.tag_ids).split(',').map(t => t.trim()).filter(t => t) : []);
                } else {
                    const langTagIds = this.tagIdsByLanguage[language.id];
                    if (langTagIds) {
                        tagIds = Array.isArray(langTagIds) ? langTagIds : (String(langTagIds).split(',').map(t => t.trim()).filter(t => t));
                    }
                }

                // Convert tag IDs to tag names (only if we have tag IDs)
                // If tagIds is empty but translation.tags already has a value, use that (it was already converted by handleTagChange)
                if (tagIds.length > 0) {
                    const tagNames = tagIds.map(tagId => {
                        // If it's a number, find the tag name from tags array
                        if (typeof tagId === 'number' || (typeof tagId === 'string' && !isNaN(tagId))) {
                            const tag = this.tags.find(t => t.id == tagId);
                            return tag ? tag.name : tagId;
                        }
                        // If it's already a string (new tag), use it as is
                        return tagId;
                    });
                    tagsValue = tagNames.join(',');
                } else if (!tagsValue && translation.tags) {
                    // If no tagIds but translation.tags exists, use it (already converted)
                    tagsValue = translation.tags;
                }

                // For default language, use manufacturer from main field
                if (language.is_default) {
                    translation.manufacturer = this.manufacturer || '';
                }
                allTranslations.push({
                    language_id: language.id,
                    name: translation.name || '',
                    tags: tagsValue,
                    manufacturer: translation.manufacturer || '',
                    description: translation.description || '',
                    meta_title: translation.meta_title || '',
                    meta_keywords: translation.meta_keywords || '',
                    schema_markup: translation.schema_markup || '',
                    meta_description: translation.meta_description || '',
                });
            });
            formData.append('translations', JSON.stringify(allTranslations));

            if (this.customFields.length) {
                const textValues = {};
                this.customFields.forEach(field => {
                    if (field.type !== 'file') {
                        textValues[field.id] = this.customFieldValues[field.id] || '';
                    } else if (this.customFieldExistingValues[field.id] && !this.customFieldFiles[field.id]) {
                        // Keep the previously uploaded file path if a new one wasn't chosen
                        textValues[field.id] = this.customFieldExistingValues[field.id];
                    }
                });
                formData.append('custom_field_values', JSON.stringify(textValues));

                this.customFields.forEach(field => {
                    if (field.type === 'file' && this.customFieldFiles[field.id]) {
                        formData.append('custom_field_file_' + field.id, this.customFieldFiles[field.id]);
                    }
                });
            }

            let url = this.$apiUrl + '/products/save';
            if (this.clone) {

                url = this.$apiUrl + '/products/save';
            } else if (this.id) {
                url = this.$apiUrl + '/products/update';
            }

            axios.post(url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(res => {
                let data = res.data;

                if (data.status === 1) {
                    this.skipCache = true;
                    localStorage.removeItem('product_form_cache');

                    const redirectAfterSave = () => {
                        vm.isLoading = false;
                        if (vm.loggedUser?.role?.name === "Seller") {
                            vm.$router.push({ path: '/seller/manage_products' });
                        } else {
                            vm.$router.push({ path: '/manage_products' });
                        }
                    };

                    // A variant that couldn't actually be removed (tied to past order history)
                    // is kept in place server-side instead of silently vanishing - tell the
                    // seller which ones, instead of letting them believe removal succeeded only
                    // to see the variant reappear on the next reload.
                    const keptVariants = data.data && data.data.kept_variants;
                    if (keptVariants && keptVariants.length) {
                        this.$swal.fire({
                            title: __('some_variants_were_kept') || 'Some variants were kept',
                            text: (__('these_variants_have_order_history_and_were_not_removed') || 'These variants are tied to past orders and were not removed') + ': ' + keptVariants.join(', '),
                            icon: 'info',
                            confirmButtonColor: '#37a279',
                        }).then(() => {
                            redirectAfterSave();
                        });
                        return;
                    }

                    this.showMessage("success", data.message);
                    setTimeout(() => {
                        vm.$swal.close();
                        redirectAfterSave();
                    }, 2000);
                } else {
                    vm.showError(data.message);
                    vm.isLoading = false;
                }
            }).catch(error => {
                vm.isLoading = false;
                this.showError("Something went wrong!");
            });
        },
        deleteImage(index, id, productImage, key = "") {
            this.$swal.fire({
                title: __('are_you_sure'),
                text: __('you_want_be_able_to_revert_this'),
                confirmButtonText: __('yes_sure'),
                cancelButtonText: __('cancel'),
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#37a279',
                cancelButtonColor: '#d33',
            }).then(result => {
                if (result.value) {
                    this.deleteImageIds.push(id);
                    if (productImage) {
                        this.other_images.splice(index, 1);
                    } else {
                        this.inputs[key].images.splice(index, 1);
                    }
                }
            });
        },

        saveCache: function () {
            if (this.id || this.clone || this.skipCache) return;
            try {
                const data = {
                    name: this.name, slug: this.slug, seller_id: this.seller_id, tag_ids: this.tag_ids,
                    tax_id: this.tax_id, brand: this.brand ? { id: this.brand.id } : null,
                    description: this.description, type: this.type, is_unlimited_stock: this.is_unlimited_stock,
                    barcode: this.barcode, meta_title: this.meta_title,
                    meta_keywords: this.meta_keywords, schema_markup: this.schema_markup,
                    meta_description: this.meta_description, category_id: this.category_id,
                    manufacturer: this.manufacturer,
                    made_in: this.made_in ? { id: this.made_in.id } : null, return_status: this.return_status,
                    return_days: (parseInt(this.return_days, 10) > 0) ? this.return_days : 1,
                    cancelable_status: this.cancelable_status,
                    till_status: this.till_status, cod_allowed_status: this.cod_allowed_status,
                    max_allowed_quantity: this.max_allowed_quantity, is_approved: this.is_approved,
                    tax_included_in_price: this.tax_included_in_price, status: this.status,
                    inputs: JSON.parse(JSON.stringify(this.inputs)), useCustomPrompt: this.useCustomPrompt,
                    customPrompt: this.customPrompt,
                    tagIdsByLanguage: JSON.parse(JSON.stringify(this.tagIdsByLanguage)),
                    translations: JSON.parse(JSON.stringify(this.translations)),
                    timestamp: Date.now()
                };
                localStorage.setItem('product_form_cache', JSON.stringify(data));
            } catch (e) { }
        },

        restoreCache: function () {
            try {
                const cached = localStorage.getItem('product_form_cache');
                if (!cached) return;
                const data = JSON.parse(cached);
                if (data.timestamp && Date.now() - data.timestamp > 120000) {
                    localStorage.removeItem('product_form_cache');
                    return;
                }
                this.cachedData = data;
                Object.keys(data).forEach(key => {
                    if (key === 'timestamp' || key === 'brand' || key === 'made_in' || key === 'translations' || key === 'tagIdsByLanguage') return;
                    // seller_id is always the logged-in seller's own id for a seller - never let a stale
                    // cache (e.g. left over from an admin's in-progress form for a different seller) override it.
                    if (key === 'seller_id' && this.isSellerRole) return;
                    if (this.hasOwnProperty(key)) this[key] = data[key] !== undefined ? data[key] : this[key];
                });

                // Restore per-language translation data.
                // At this point initializeTranslations() has already run (it's called inside
                // fetchActiveLanguages before restoreCache, so this.translations already has
                // valid language-keyed slots we can safely overwrite.
                if (data.translations && this.languages && this.languages.length > 0) {
                    this.languages.forEach(language => {
                        if (data.translations[language.id]) {
                            this.$set(this.translations, language.id, {
                                ...this.translations[language.id],
                                ...data.translations[language.id]
                            });
                        }
                    });
                }
                // Restore per-language tag ID selections.
                if (data.tagIdsByLanguage && this.languages && this.languages.length > 0) {
                    Object.keys(data.tagIdsByLanguage).forEach(languageId => {
                        this.$set(this.tagIdsByLanguage, languageId, data.tagIdsByLanguage[languageId]);
                    });
                }

                if (data.brand && this.brands && this.brands.length) {
                    const foundBrand = this.brands.find(b => b.id === data.brand.id) || null;
                    // Update brand with translated name
                    this.$nextTick(() => {
                        if (foundBrand && this.translatedBrands && this.translatedBrands.length > 0) {
                            const translatedBrand = this.translatedBrands.find(b => b.id === foundBrand.id);
                            if (translatedBrand) {
                                this.brand = { ...foundBrand, name: translatedBrand.name, title: translatedBrand.title };
                            } else {
                                this.brand = foundBrand;
                            }
                        } else {
                            this.brand = foundBrand;
                        }
                    });
                }
                if (data.made_in && this.countries && this.countries.length) {
                    this.made_in = this.countries.find(c => c.id === data.made_in.id) || null;
                }
                if (this.seller_id) {
                    this.$nextTick(() => { this.getSellerCategories(); this.getSeller(); });
                }
            } catch (e) {
                localStorage.removeItem('product_form_cache');
            }
        },

        clearForm: function () {
            this.$swal.fire({
                title: __('are_you_sure'),
                text: __('you_want_be_able_to_revert_this'),
                confirmButtonText: __('yes_sure'),
                cancelButtonText: __('cancel'),
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#37a279',
                cancelButtonColor: '#d33',
            }).then(result => {
                if (result.value) {
                    if (this.$refs['my-form']) this.$refs['my-form'].reset();
                    this.suppressCategoryWatch = true;
                    this.$nextTick(() => { this.suppressCategoryWatch = false; });
                    Object.assign(this, {
                        name: '', slug: '', seller_id: 0, tag_ids: '', tax_id: 0, brand: null,
                        description: '', type: 'attribute', is_unlimited_stock: 0,
                        barcode: '', meta_title: '', meta_keywords: '', schema_markup: '',
                        meta_description: '', category_id: '', manufacturer: '',
                        made_in: null, return_status: 0, return_days: 1, cancelable_status: 0,
                        categoryOptions: '<option value="">' + __('select_category') + '</option>',
                        till_status: '', cod_allowed_status: 0, max_allowed_quantity: 0,
                        is_approved: 1, tax_included_in_price: 0, status: 1, loose_stock: 0,
                        loose_stock_unit_id: '', inputs: [{ 'name': '', 'packet_status': '', 'attribute_value_id': '' }],
                        selectedAttributeValues: {},
                        image: null, main_image_path: '', main_image_name: '', other_images: null,
                        images: [], variantFiles: {}, deleteImageIds: [], useCustomPrompt: false, customPrompt: '',
                        tagIdsByLanguage: {}, activeLanguageTab: 0,
                        customFieldValues: {}, customFieldFiles: {}, customFieldExistingValues: {},
                    });
                    this.applyCustomFieldValues();
                    this.tag_ids = [];
                    this.initializeTranslations();
                    localStorage.removeItem('product_form_cache');
                }
            });
        },

        debouncedSave: function () {
            if (this.cacheTimer) clearTimeout(this.cacheTimer);
            this.cacheTimer = setTimeout(() => this.saveCache(), 500);
        }
    },
    watch: {
        // Watch currentLanguageId to update selected brand name when language changes
        currentLanguageId: function (newVal, oldVal) {
            if (newVal && this.brand && this.translatedBrands && this.translatedBrands.length > 0) {
                // Find the translated brand from translatedBrands
                const translatedBrand = this.translatedBrands.find(b => b.id === this.brand.id);
                if (translatedBrand) {
                    // Update the brand object with translated name
                    this.brand = { ...this.brand, name: translatedBrand.name, title: translatedBrand.title };
                }
            }
        },
        // Watch translatedBrands to update selected brand when brands are loaded or language changes
        translatedBrands: {
            handler: function (newVal) {
                if (newVal && newVal.length > 0 && this.brand && this.brand.id) {
                    // Find the translated brand from translatedBrands
                    const translatedBrand = newVal.find(b => b.id === this.brand.id);
                    if (translatedBrand) {
                        // Update the brand object with translated name
                        this.brand = { ...this.brand, name: translatedBrand.name, title: translatedBrand.title };
                    }
                }
            },
            deep: true
        },
        // Watch activeLanguageTab to ensure Select2 updates when switching tabs
        activeLanguageTab: function (newTab, oldTab) {
            // Force Select2 to update when switching language tabs
            this.$nextTick(() => {
                // Trigger conversion again to ensure tagIdsByLanguage is set
                if (this.tags && this.tags.length > 0 && this.languages.length > 0) {
                    this.convertTagNamesToIds();
                }
            });
        },
        // Auto-save form data to cache (debounced)
        name: function () { if (!this.id && !this.clone) this.debouncedSave(); },
        slug: function () { if (!this.id && !this.clone) this.debouncedSave(); },
        seller_id: function () { if (!this.id && !this.clone) this.debouncedSave(); },
        tag_ids: function () { if (!this.id && !this.clone) this.debouncedSave(); },
        tax_id: function () { if (!this.id && !this.clone) this.debouncedSave(); },
        brand: { handler: function () { if (!this.id && !this.clone) this.debouncedSave(); }, deep: true },
        description: function () { if (!this.id && !this.clone) this.debouncedSave(); },
        type: function () { if (!this.id && !this.clone) this.debouncedSave(); },
        is_unlimited_stock: function () { if (!this.id && !this.clone) this.debouncedSave(); },
        barcode: function () { if (!this.id && !this.clone) this.debouncedSave(); },
        meta_title: function () { if (!this.id && !this.clone) this.debouncedSave(); },
        meta_keywords: function () { if (!this.id && !this.clone) this.debouncedSave(); },
        schema_markup: function () { if (!this.id && !this.clone) this.debouncedSave(); },
        meta_description: function () { if (!this.id && !this.clone) this.debouncedSave(); },
        category_id: function (newVal, oldVal) {
            if (!this.id && !this.clone) this.debouncedSave();
            if (newVal !== oldVal && !this.suppressCategoryWatch) {
                this.selectedAttributeValues = {};
                this.inputs = [{ 'name': '', 'packet_status': '', 'attribute_value_id': '' }];
                this.loadAttributes();
            }
        },
        manufacturer: function () {
            // Sync manufacturer to default language translation
            if (this.defaultLanguageId && this.translations[this.defaultLanguageId]) {
                this.translations[this.defaultLanguageId].manufacturer = this.manufacturer;
            }
            if (!this.id && !this.clone) this.debouncedSave();
        },
        made_in: { handler: function () { if (!this.id && !this.clone) this.debouncedSave(); }, deep: true },
        return_status: function () {
            // When user turns off returnable, default return_days to 1 if empty/0
            if (Number(this.return_status) === 0 && (parseInt(this.return_days, 10) || 0) <= 0) {
                this.return_days = 1;
            }
            if (!this.id && !this.clone) this.debouncedSave();
        },
        return_days: function () {
            // When days cleared or set to 0 (e.g. returnable off), keep default 1 in memory for next save
            if ((this.return_days === '' || this.return_days === null || parseInt(this.return_days, 10) <= 0) && Number(this.return_status) === 0) {
                this.return_days = 1;
            }
            if (!this.id && !this.clone) this.debouncedSave();
        },
        cancelable_status: function () { if (!this.id && !this.clone) this.debouncedSave(); },
        till_status: function () { if (!this.id && !this.clone) this.debouncedSave(); },
        cod_allowed_status: function () { if (!this.id && !this.clone) this.debouncedSave(); },
        max_allowed_quantity: function () { if (!this.id && !this.clone) this.debouncedSave(); },
        is_approved: function () { if (!this.id && !this.clone) this.debouncedSave(); },
        tax_included_in_price: function () { if (!this.id && !this.clone) this.debouncedSave(); },
        status: function () { if (!this.id && !this.clone) this.debouncedSave(); },
        loose_stock: function () { if (!this.id && !this.clone) this.debouncedSave(); },
        loose_stock_unit_id: function () { if (!this.id && !this.clone) this.debouncedSave(); },
        inputs: { handler: function () { if (!this.id && !this.clone) this.debouncedSave(); }, deep: true },
        useCustomPrompt: function () { if (!this.id && !this.clone) this.debouncedSave(); },
        customPrompt: function () { if (!this.id && !this.clone) this.debouncedSave(); },
        translations: { handler: function () { if (!this.id && !this.clone) this.debouncedSave(); }, deep: true }
        ,
        tagIdsByLanguage: { handler: function () { if (!this.id && !this.clone) this.debouncedSave(); }, deep: true }
    },

};
</script>
<style scoped>
@import "../../../../node_modules/vue-multiselect/dist/vue-multiselect.min.css";

/* AI Generate Button Styles */
.ai-generate-btn {
    position: relative;
    min-width: 200px;
    transition: all 0.3s ease;
}

.ai-generate-btn:disabled {
    opacity: 0.9;
    cursor: not-allowed;
    background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
    border-color: #667eea;
    color: white;
}

/* AI Spinner Animation */
.ai-spinner {
    display: inline-block;
    width: 16px;
    height: 16px;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    border-top-color: #fff;
    animation: ai-spin 0.8s ease-in-out infinite;
}

@keyframes ai-spin {
    to {
        transform: rotate(360deg);
    }
}

/* AI Text Animation - Pulsing effect */
.ai-text-animate {
    animation: ai-pulse 1.5s ease-in-out infinite;
}

@keyframes ai-pulse {

    0%,
    100% {
        opacity: 1;
    }

    50% {
        opacity: 0.6;
    }
}

.variant-image-preview-list {
    gap: 8px;
    margin-top: 8px;
}

.variant-image-preview-item {
    position: relative;
    width: 90px;
    cursor: grab;
}

.variant-image-preview-item:active {
    cursor: grabbing;
}

.variant-image-preview-item .custom-image {
    width: 90px;
    height: 90px;
    object-fit: cover;
}

.variant-image-preview-item .btn-remove {
    position: absolute;
    top: -8px;
    right: -8px;
    padding: 0;
    width: 18px;
    height: 18px;
    line-height: 1;
    border: none;
    background: transparent;
    color: #dc3545;
    font-size: 16px;
}
</style>
