<template>
    <div>
        <div class="page-heading">

            <div class="row">
                <div class="col-12 col-md-6 order-md-1 order-last">
                    <h3 v-if="isSellerRole">
                        {{ __('my_profile') }}
                    </h3>
                    <h3 v-else>
                        <template v-if="id">{{ __('edit') }}</template>
                        <template v-else>{{ __('add') }}</template>
                        {{ __('seller') }}
                    </h3>
                </div>
                <div class="col-12 col-md-6 order-md-2 order-first">
                    <nav aria-label="breadcrumb" class="breadcrumb-header float-start float-lg-end">
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item">
                                <router-link to="/seller" v-if="isSellerRole">{{ __('dashboard') }}</router-link>
                                <router-link to="/dashboard" v-else>{{ __('dashboard') }}</router-link>
                            </li>
                            <template v-if="isSellerRole">
                                <li class="breadcrumb-item" aria-current="page">{{ __('my_profile') }}</li>
                            </template>
                            <template v-else>

                                <li class="breadcrumb-item" aria-current="page">
                                    <router-link to="/sellers">{{ __('manage_sellers') }}</router-link>
                                </li>

                                <li class="breadcrumb-item active" aria-current="page">
                                    <template v-if="id">{{ __('edit') }}</template>
                                    <template v-else>{{ __('add') }}</template>
                                    {{ __('seller') }}
                                </li>
                            </template>
                        </ol>
                    </nav>
                </div>
            </div>

            <div class="row">
                <div class="col-12 col-md-12 order-md-1 order-last">
                    <form ref="my-form" @submit.prevent="saveRecord">
                        <div class="card">
                            <div class="card-header d-flex align-items-center justify-content-between flex-wrap gap-2">
                                <h4 class="card-title mb-0">{{ __('seller_information') }} </h4>
                                <span v-if="!isSellerRole">
                                    <router-link to="/sellers" class="btn btn-light btn-sm d-inline-flex align-items-center gap-2" v-b-tooltip.hover
                                        title="Manage Seller"><i class="fa fa-list"></i> {{
                                            __('manage_seller') }}</router-link>
                                </span>
                            </div>
                            <div class="card-body">
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

                                            <div class="row">
                                                <div class="col-md-6">
                                                    <div class="form-group mb-3">
                                                        <label class="form-label">{{ __('name') }} <i
                                                                class="text-danger"
                                                                v-if="language.is_default">*</i></label>
                                                        <input type="text" class="form-control"
                                                            :required="language.is_default ? true : undefined"
                                                            v-model="translations[language.id].name"
                                                            :placeholder="__('enter_name')" @focus="onInputFocus"
                                                            @blur="onInputBlur">
                                                    </div>
                                                </div>

                                                <!-- Non-translatable Fields (only shown in default language tab) -->
                                                <template v-if="language.is_default">
                                                    <div class="col-md-6">
                                                        <div class="form-group mb-3">
                                                            <label class="form-label">{{ __('email') }} <i
                                                                    class="text-danger">*</i></label>
                                                            <input type="email" class="form-control" v-model="email"
                                                                :placeholder="__('enter_email')" @focus="onInputFocus"
                                                                @blur="onInputBlur">
                                                        </div>
                                                    </div>

                                                    <div class="col-md-6">
                                                        <div class="form-group mb-3">
                                                            <label class="form-label">{{ __('mobile') }} <i
                                                                    class="text-danger">*</i></label>
                                                            <input type="text" class="form-control" v-model="mobile"
                                                                :placeholder="__('enter_mobile_number')"
                                                                inputmode="numeric" required
                                                                @input="validateMobileNumber" @focus="onInputFocus"
                                                                @blur="onInputBlur">
                                                            <span v-if="mobilevalidationError" class="error">{{
                                                                mobilevalidationError
                                                                }}</span>
                                                        </div>
                                                    </div>

                                                    <div class="col-md-6" v-if="!isSellerRole">
                                                        <div class="form-group mb-3">
                                                            <label class="form-label">{{ __('password') }} <i v-if="!id"
                                                                    class="text-danger">*</i></label>
                                                            <div class="input-group">
                                                                <input :type="showPassword ? 'text' : 'password'"
                                                                    class="form-control" v-model="password"
                                                                    :placeholder="__('enter_password')">
                                                                <button type="button"
                                                                    v-on:click="showPassword = !showPassword"
                                                                    class="btn btn-light password-toggle">
                                                                    <img v-if="showPassword"
                                                                        :src="$baseUrl + '/images/icons/show_password.svg'"
                                                                        class="password-toggle-icon" />
                                                                    <img v-else
                                                                        :src="$baseUrl + '/images/icons/hide_password.svg'"
                                                                        class="password-toggle-icon" />
                                                                </button>
                                                            </div>

                                                        </div>
                                                    </div>

                                                    <div class="col-md-6" v-if="!isSellerRole">
                                                        <div class="form-group mb-3">
                                                            <label class="form-label">{{ __('confirm_password') }} <i
                                                                    v-if="!id" class="text-danger">*</i></label>
                                                            <div class="input-group">
                                                                <input :type="showConfirmPassword ? 'text' : 'password'"
                                                                    class="form-control" v-model="confirm_password"
                                                                    :placeholder="__('enter_confirm_password')">
                                                                <button type="button"
                                                                    v-on:click="showConfirmPassword = !showConfirmPassword"
                                                                    class="btn btn-light password-toggle">
                                                                    <img v-if="showConfirmPassword"
                                                                        :src="$baseUrl + '/images/icons/show_password.svg'"
                                                                        class="password-toggle-icon" />
                                                                    <img v-else
                                                                        :src="$baseUrl + '/images/icons/hide_password.svg'"
                                                                        class="password-toggle-icon" />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </template>
                                            </div>

                                            <div class="card">
                                                <div class="card-header">
                                                    <h4> {{ __('store_information') }}</h4>
                                                </div>
                                                <div class="card-body">
                                                    <div class="row">

                                                        <!-- Translatable Field: Store Name (shown in all language tabs) -->
                                                        <div class="col-md-6">
                                                            <div class="form-group mb-3">
                                                                <label class="form-label">{{ __('store_name') }} <i
                                                                        class="text-danger"
                                                                        v-if="language.is_default">*</i></label>
                                                                <input type="text" class="form-control"
                                                                    :required="language.is_default ? true : undefined"
                                                                    v-model="translations[language.id].store_name"
                                                                    :placeholder="__('enter_store_name')">
                                                            </div>
                                                        </div>

                                                        <!-- Non-translatable Fields (only shown in default language tab) -->
                                                        <template v-if="language.is_default">
                                                            <div class="col-md-6">
                                                                <div class="form-group mb-3">
                                                                    <label class="form-label">{{ __('select_module') }} <i class="text-danger">*</i></label>
                                                                    <select class="form-control form-select" v-model="module_id" :disabled="isSellerRole || !!id" required>
                                                                        <option value="" disabled>{{ __('select_module') }}</option>
                                                                        <option v-for="mod in modules" :key="mod.id" :value="mod.id">{{ mod.name }}</option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                            <div class="col-md-6">
                                                                <div class="form-group mb-3">
                                                                    <label class="form-label">{{ __('category_ids') }}<i
                                                                            class="text-danger">*</i></label>
                                                                    <Select2 v-model="categories_ids"
                                                                        :placeholder="__('select_categories')"
                                                                        :options="categories_options"
                                                                        :settings="{ multiple: 'multiple' }" />
                                                                </div>
                                                            </div>
                                                            <div class="col-md-6">
                                                                <div class="form-group mb-3">
                                                                    <label class="form-label">{{
                                                                        __('product_status') }}</label>
                                                                    <div class="d-flex align-items-center"
                                                                        style="min-height: 40px;">
                                                                        <div id="status" class="btn-group btn-group-toggle segmented-toggle seller-status-group">
                                                                            <label class="btn"
                                                                                :class="status == 1 ? 'btn-success' : 'btn-outline-secondary'">
                                                                                <input type="radio" v-model="status" value="1">
                                                                                {{ __('active') }}
                                                                            </label>
                                                                            <label class="btn"
                                                                                :class="status == 3 ? 'btn-danger' : 'btn-outline-secondary'">
                                                                                <input type="radio" v-model="status" value="3">
                                                                                {{ __('deactive') }}
                                                                            </label>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                                <div class="form-group col-md-6 mt-0"
                                                                    v-if="!isSellerRole">
                                                                    <div class="form-group">
                                                                        <label for="logo"> {{ __('logo') }} <i
                                                                                v-if="!id"
                                                                                class="text-danger">*</i></label>
                                                                        <input type="file" accept="image/*" id="logo"
                                                                            class="file-input" ref="file_store_logo"
                                                                            v-on:change="handleFileStoreLogo">
                                                                        <div class="file-input-div bg-gray-100"
                                                                            @click="triggerRefClick('file_store_logo')"
                                                                            @drop="dropFileStoreLogo"
                                                                            @dragover="$dragoverFile"
                                                                            @dragleave="$dragleaveFile">
                                                                            <template
                                                                                v-if="store_logo && store_logo.name !== ''">
                                                                                <label>{{ __('selected_file_name') }}{{
                                                                                    store_logo.name }}</label>
                                                                            </template>
                                                                            <template v-else>
                                                                                <label><i
                                                                                        class="fa fa-cloud-upload-alt fa-2x"></i></label>
                                                                                <label>{{
                                                                                    __('drop_files_here_or_click_to_upload')
                                                                                }}</label>
                                                                            </template>
                                                                        </div>

                                                                        <div class="row mt-2" v-if="store_logo_url">
                                                                            <div class="col-auto">
                                                                                <img class="file-preview-thumb"
                                                                                    :src="store_logo_url"
                                                                                    title='Store Logo'
                                                                                    alt='Store Logo' />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                            <div class="form-group col-md-6" v-if="!isSellerRole">
                                                                <label>{{ __('commission') }}<i
                                                                        class="text-danger">*</i></label>
                                                                <input type="number" class="form-control"
                                                                    v-model="commission"
                                                                    :placeholder="__('enter_commission') + ' (%)'"
                                                                    @input="validateCommission">

                                                                <p v-if="commissionvalidationError" class="error">{{
                                                                    commissionvalidationError
                                                                    }}</p>
                                                                <span class="text text-success font-size-13">
                                                                    <a href="javascript:void(0)"
                                                                        @click="commissionRule = true"
                                                                        title="How it works">{{
                                                                            __('how_seller_commission_works') }}</a>
                                                                </span>
                                                            </div>

                                                            <div class="col-md-12" v-if="id && !isSellerRole">
                                                                <div class="row">
                                                                    <div class="form-group col-md-8">
                                                                        <label class="control-label"> {{ __('status') }}
                                                                            <i class="text-danger">*</i></label><br>
                                                                        <b-form-radio-group v-model="status" :options="[
                                                                            { text: __('registered'), 'value': 0 },
                                                                            { text: __('approved'), 'value': 1 },
                                                                            { text: __('not_approved'), 'value': 2 },
                                                                            { text: __('deactive'), 'value': 3 },
                                                                            { text: __('block'), 'value': 4 },
                                                                        ]" buttons button-variant="outline-primary"
                                                                            class="d-flex flex-wrap flex-md-nowrap"
                                                                            required></b-form-radio-group>
                                                                    </div>
                                                                    <div v-if="[2, 3, 4].includes(status)"
                                                                        class="form-group col-md-4">

                                                                        <label for="remark">{{ __('remark') }} <i
                                                                                class="text-danger">*</i></label>
                                                                        <textarea class="form-control" name="remark"
                                                                            id="remark" required v-model="remark"
                                                                            placeholder="Add a remark of this status..."
                                                                            rows="3" spellcheck="true"></textarea>

                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </template>

                                                        <div class="form-group col-md-12">
                                                            <label> {{ __('store_description') }}</label>
                                                            <editor placeholder="Enter store description"
                                                                v-model="translations[language.id].store_description"
                                                                :init="getEditorConfig()" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <!-- Non-translatable Cards (only shown in default language tab) -->
                                            <template v-if="language.is_default">
                                                <div class="card">
                                                    <div class="card-header">
                                                        <h4> {{ __('store_location_information') }}</h4>
                                                    </div>
                                                    <div class="card-body">
                                                        <div class="row">
                                                            <div class="col-md-6">
                                                                <div class="form-group mb-3">
                                                                    <label for="city_name" class="form-label d-block">{{
                                                                        __('select_or_search_city')
                                                                        }}<i class="text-danger">*</i></label>

                                                                    <Select2 v-model="city_id"
                                                                        :placeholder="__('select_cities')"
                                                                        :options="cities_options"
                                                                        :settings="{ multiple: 'multiple' }" />
                                                                </div>
                                                            </div>
                                                            <div class="col-md-6">
                                                                <div class="form-group mb-3">
                                                                    <label class="form-label d-block"> {{ __('state')
                                                                        }}</label>
                                                                    <input type="text" class="form-control"
                                                                        v-model="state" readonly
                                                                        :placeholder="__('state')">
                                                                </div>
                                                            </div>

                                                            <div class="col-md-6">
                                                                <div class="form-group mb-3">
                                                                    <label class="form-label d-block"> {{ __('street')
                                                                        }}</label>
                                                                    <input type="text" class="form-control"
                                                                        v-model="street" readonly
                                                                        :placeholder="__('street')">
                                                                </div>
                                                            </div>

                                                            <div class="col-md-6">
                                                                <div class="form-group mb-3">
                                                                    <label for="location" class="form-label d-block">{{
                                                                        __('search_location')
                                                                        }}</label>

                                                                    <div class="input-group" v-if="mapProvider === 'google'">
                                                                        <google-place-search
                                                                            :placeholder="__('search_your_location_on_map')"
                                                                            @place_changed="setPlace" input-id="location">
                                                                        </google-place-search>

                                                                        <b-button type="button" variant="primary"
                                                                            class="search_location_btn"
                                                                            v-b-tooltip.hover
                                                                            title="Add current location"
                                                                            @click="getCurrentLocation">
                                                                            <svg xmlns="http://www.w3.org/2000/svg"
                                                                                height="48px" viewBox="0 0 24 24"
                                                                                width="48px" fill="#FFFFFF">
                                                                                <title>current-location</title>
                                                                                <path d="M0 0h24v24H0V0z" fill="none" />
                                                                                <path
                                                                                    d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm8.94 3c-.46-4.17-3.77-7.48-7.94-7.94V1h-2v2.06C6.83 3.52 3.52 6.83 3.06 11H1v2h2.06c.46 4.17 3.77 7.48 7.94 7.94V23h2v-2.06c4.17-.46 7.48-3.77 7.94-7.94H23v-2h-2.06zM12 19c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z" />
                                                                            </svg>
                                                                        </b-button>
                                                                    </div>

                                                                    <div class="input-group position-relative" v-else>
                                                                        <input type="search" class="form-control"
                                                                            id="osm_location"
                                                                            :placeholder="__('search_your_location_on_map')"
                                                                            :value="osmSellerQuery"
                                                                            @input="onOsmSellerQueryInput($event.target.value)"
                                                                            autocomplete="off">
                                                                        <b-button type="button" variant="primary"
                                                                            class="search_location_btn"
                                                                            v-b-tooltip.hover
                                                                            title="Add current location"
                                                                            @click="getOsmCurrentLocation">
                                                                            <svg xmlns="http://www.w3.org/2000/svg"
                                                                                height="48px" viewBox="0 0 24 24"
                                                                                width="48px" fill="#FFFFFF">
                                                                                <title>current-location</title>
                                                                                <path d="M0 0h24v24H0V0z" fill="none" />
                                                                                <path
                                                                                    d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm8.94 3c-.46-4.17-3.77-7.48-7.94-7.94V1h-2v2.06C6.83 3.52 3.52 6.83 3.06 11H1v2h2.06c.46 4.17 3.77 7.48 7.94 7.94V23h2v-2.06c4.17-.46 7.48-3.77 7.94-7.94H23v-2h-2.06zM12 19c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z" />
                                                                            </svg>
                                                                        </b-button>
                                                                        <ul v-if="osmSellerSuggestions.length" class="list-group osm-suggestions">
                                                                            <li v-for="s in osmSellerSuggestions" :key="s.placePrediction.placeId"
                                                                                class="list-group-item list-group-item-action" style="cursor:pointer"
                                                                                @mousedown.prevent="selectOsmSellerSuggestion(s)">
                                                                                {{ s.placePrediction.text.text }}
                                                                            </li>
                                                                        </ul>
                                                                    </div>

                                                                    <span class="text-danger d-block font-size-13 mt-1">
                                                                        {{
                                                                            __('only_search_location_when_update_is_necessary')
                                                                        }}</span>
                                                                    <span
                                                                        class="text text-primary font-size-13 d-block">
                                                                        {{
                                                                            __('search_your_seller_name_and_you_will_get_the_location_points_latitude_longitude_below')
                                                                        }}</span>
                                                                </div>
                                                            </div>

                                                            <div class="col-md-6">
                                                                <div class="form-group mb-3">
                                                                    <label class="form-label d-block"> {{ __('latitude')
                                                                        }}<i class="text-danger">*</i></label>
                                                                    <input type="text" class="form-control"
                                                                        v-model="latitude" readonly
                                                                        :placeholder="__('latitude')">
                                                                </div>
                                                            </div>

                                                            <div class="col-md-6">
                                                                <div class="form-group mb-3">
                                                                    <label class="form-label d-block"> {{
                                                                        __('longitude') }}<i
                                                                            class="text-danger">*</i></label>
                                                                    <input type="text" class="form-control"
                                                                        v-model="longitude" readonly
                                                                        :placeholder="__('longitude')">
                                                                </div>
                                                            </div>

                                                            <div class="col-md-12 mb-3">
                                                                <div v-if="formatted_address" class="text-danger">
                                                                    {{
                                                                        __('draf_and_click_marker_to_your_shop_proper_location')
                                                                    }}</div>
                                                                <div id="map"
                                                                    style="position: relative; overflow: hidden;"
                                                                    v-if="mapProvider === 'google'">
                                                                    <GmapMap :center="center" :zoom="13"
                                                                        :mapTypeControl=true
                                                                        style="width: 100%; height: 400px; margin-top: 20px"
                                                                        ref="mapRef" @click="handleMapClick">
                                                                        <GmapMarker :key="index"
                                                                            v-for="(m, index) in markers"
                                                                            :position="m.position" :clickable="true"
                                                                            :draggable="true" @drag="updateCoordinates"
                                                                            @click="updateCoordinates" />
                                                                        <gmap-info-window :options="{
                                                                            maxWidth: 300,
                                                                            pixelOffset: { width: 0, height: -35 }
                                                                        }" :position="infoWindow.position"
                                                                            :opened="infoWindow.open"
                                                                            @closeclick="infoWindow.open = false">
                                                                            <div v-html="infoWindow.template"></div>
                                                                        </gmap-info-window>
                                                                    </GmapMap>
                                                                </div>
                                                                <div id="osm_map" v-else>
                                                                    <osm-map-picker ref="osmSellerMap"
                                                                        :lat="latitude" :lng="longitude"
                                                                        height="400px"
                                                                        :show-search-box="false"
                                                                        @location-selected="onOsmLocationSelected"
                                                                        @suggestions-updated="osmSellerSuggestions = $event">
                                                                    </osm-map-picker>
                                                                </div>
                                                                <div v-if="formatted_address">
                                                                    <span class="title font-weight-bolder"><b>{{
                                                                        place_name
                                                                            }}</b> - {{ formatted_address }}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>

                                                <div class="card">
                                                    <div class="card-header">
                                                        <h4>{{ __('other_setting') }}</h4>
                                                    </div>
                                                    <div class="card-body">
                                                        <div class="row">
                                                            <div class="form-group col-md-6">
                                                                <div class="form-group">
                                                                    <label class="control-label"> {{
                                                                        __('require_product_approval') }}</label><br>
                                                                    <b-form-radio-group
                                                                        v-model="require_products_approval" :options="[
                                                                            { text: __('yes'), 'value': 1 },
                                                                            { text: __('no'), 'value': 0 },
                                                                        ]" buttons button-variant="outline-primary"
                                                                        required></b-form-radio-group>
                                                                </div>
                                                            </div>

                                                            <div class="form-group col-md-6">
                                                                <div class="form-group">
                                                                    <label class="control-label"> {{
                                                                        __('door_step_mode') }}</label><br>
                                                                    <b-form-radio-group v-model="door_step_mode"
                                                                        :options="[
                                                                            { text: __('yes'), 'value': 1 },
                                                                            { text: __('no'), 'value': 0 },
                                                                        ]" buttons button-variant="outline-primary"
                                                                        required></b-form-radio-group>
                                                                </div>
                                                            </div>

                                                            <div class="form-group col-md-6">
                                                                <div class="form-group">
                                                                    <label class="control-label"> {{
                                                                        __('self_pickup_mode') }}</label><br>
                                                                    <b-form-radio-group v-model="self_pickup_mode"
                                                                        :options="[
                                                                            { text: __('yes'), 'value': 1 },
                                                                            { text: __('no'), 'value': 0 },
                                                                        ]" buttons button-variant="outline-primary"
                                                                        required></b-form-radio-group>
                                                                </div>
                                                            </div>

                                                            <div class="form-group col-md-6">
                                                                <div class="form-group">
                                                                    <label class="control-label">Who Delivers Their Orders</label><br>
                                                                    <input v-if="isSellerRole" type="text" class="form-control"
                                                                        :value="delivery_boy_source === 'own' ? 'Own Delivery Boys' : 'Admin\'s Delivery Boys'"
                                                                        disabled>
                                                                    <b-form-radio-group v-else v-model="delivery_boy_source"
                                                                        :options="[
                                                                            { text: 'Admin\'s Delivery Boys', 'value': 'shared' },
                                                                            { text: 'Own Delivery Boys', 'value': 'own' },
                                                                        ]" buttons button-variant="outline-primary"
                                                                        required></b-form-radio-group>
                                                                    <small class="text-muted d-block mt-1">
                                                                        Only an admin can change this - sellers can't switch it themselves.
                                                                    </small>
                                                                </div>
                                                            </div>

                                                        </div>

                                                        <!-- Self Pickup Configuration Section -->
                                                        <div v-if="self_pickup_mode == 1" class="row mt-4">
                                                            <div class="col-12">
                                                                <h5 class="form-subsection-title">{{
                                                                    __('self_pickup_configuration') }}</h5>
                                                            </div>

                                                            <!-- Map Section for Pickup Location -->
                                                            <div class="form-group col-md-12">
                                                                <div class="row">
                                                                    <!-- Left Side - Map Only (50%) -->
                                                                    <div class="col-md-6">
                                                                        <!-- Map View -->
                                                                        <div class="form-group">
                                                                            <div id="pickup_map"
                                                                                style="position: relative; overflow: hidden;"
                                                                                v-if="mapProvider === 'google'">
                                                                                <GmapMap :zoom="13"
                                                                                    :center="pickupCenter"
                                                                                    :mapTypeControl=true
                                                                                    style="width: 100%; height: 400px; margin-top: 5px"
                                                                                    ref="pickupMapRef">
                                                                                    <GmapMarker :key="index"
                                                                                        v-for="(m, index) in pickupMarkers"
                                                                                        :position="google && m.position"
                                                                                        @click="pickupCenter = m.position"
                                                                                        :clickable="true"
                                                                                        :draggable="true"
                                                                                        @dragend="onPickupMarkerDragEnd" />
                                                                                    <gmap-info-window :options="{
                                                                                        maxWidth: 300,
                                                                                        pixelOffset: { width: 0, height: -35 }
                                                                                    }" :position="pickupInfoWindow.position"
                                                                                        :opened="pickupInfoWindow.open"
                                                                                        @closeclick="pickupInfoWindow.open = false">
                                                                                        <div
                                                                                            v-html="pickupInfoWindow.template">
                                                                                        </div>
                                                                                    </gmap-info-window>
                                                                                </GmapMap>
                                                                            </div>
                                                                            <div id="osm_pickup_map" v-else>
                                                                                <osm-map-picker ref="osmPickupMap"
                                                                                    :lat="pickup_latitude"
                                                                                    :lng="pickup_longitude"
                                                                                    height="400px"
                                                                                    :show-search-box="false"
                                                                                    @location-selected="onOsmPickupLocationSelected"
                                                                                    @suggestions-updated="osmPickupSuggestions = $event">
                                                                                </osm-map-picker>
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                    <!-- Right Side - All Details (50%) -->
                                                                    <div class="col-md-6">
                                                                        <!-- Search Input -->
                                                                        <div class="form-group" v-if="mapProvider === 'google'">
                                                                            <label for="pickup_city_name">{{
                                                                                __('search_location') }}</label>
                                                                            <google-place-search
                                                                                :placeholder="__('search_pickup_location_on_map')"
                                                                                @place_changed="setPickupPlace" input-id="pickup_city_name">
                                                                            </google-place-search>
                                                                            <span class="text text-primary">{{
                                                                                __('search_your_pickup_location_and_to_find_coordinates')
                                                                                }}</span>
                                                                        </div>
                                                                        <div class="form-group position-relative" v-else>
                                                                            <label for="osm_pickup_city_name">{{
                                                                                __('search_location') }}</label>
                                                                            <input type="search" class="form-control"
                                                                                id="osm_pickup_city_name"
                                                                                :placeholder="__('search_pickup_location_on_map')"
                                                                                :value="osmPickupQuery"
                                                                                @input="onOsmPickupQueryInput($event.target.value)"
                                                                                autocomplete="off">
                                                                            <ul v-if="osmPickupSuggestions.length" class="list-group osm-suggestions">
                                                                                <li v-for="s in osmPickupSuggestions" :key="s.placePrediction.placeId"
                                                                                    class="list-group-item list-group-item-action" style="cursor:pointer"
                                                                                    @mousedown.prevent="selectOsmPickupSuggestion(s)">
                                                                                    {{ s.placePrediction.text.text }}
                                                                                </li>
                                                                            </ul>
                                                                            <span class="text text-primary">{{
                                                                                __('search_your_pickup_location_and_to_find_coordinates')
                                                                                }}</span>
                                                                        </div>

                                                                        <!-- Pickup Store Address -->
                                                                        <div class="form-group">
                                                                            <label>{{ __('pickup_store_address') }} <i
                                                                                    class="text-danger">*</i></label>
                                                                            <textarea class="form-control"
                                                                                v-model="pickup_store_address" rows="2"
                                                                                :placeholder="__('pickup_store_address')"></textarea>
                                                                        </div>

                                                                        <!-- Coordinates -->
                                                                        <div class="form-group">
                                                                            <label for="pickup_latitude">{{
                                                                                __('latitude') }} <span
                                                                                    class="text-danger text-sm">*</span></label>
                                                                            <input type="text" class="form-control"
                                                                                name="pickup_latitude"
                                                                                id="pickup_latitude"
                                                                                v-model="pickup_latitude"
                                                                                :placeholder="__('latitude')" required
                                                                                readonly>
                                                                        </div>

                                                                        <div class="form-group">
                                                                            <label for="pickup_longitude">{{
                                                                                __('longitude') }}<span
                                                                                    class="text-danger text-sm">*</span></label>
                                                                            <input type="text" class="form-control"
                                                                                name="pickup_longitude"
                                                                                id="pickup_longitude"
                                                                                v-model="pickup_longitude"
                                                                                :placeholder="__('longitude')" required
                                                                                readonly>
                                                                        </div>

                                                                        <!-- Store Timings -->
                                                                        <div class="form-group">
                                                                            <label>{{ __('store_timings') }} <i
                                                                                    class="text-danger">*</i></label>
                                                                            <div class="row">
                                                                                <div class="col-md-6">
                                                                                    <label class="form-label">{{
                                                                                        __('opening_time') }}</label>
                                                                                    <input type="time"
                                                                                        class="form-control"
                                                                                        v-model="storeTimings.opening_time"
                                                                                        required>
                                                                                </div>
                                                                                <div class="col-md-6">
                                                                                    <label class="form-label">{{
                                                                                        __('closing_time') }}</label>
                                                                                    <input type="time"
                                                                                        class="form-control"
                                                                                        v-model="storeTimings.closing_time"
                                                                                        required>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </template>

                                        </b-tab>
                                    </b-tabs>
                                </div>

                                <!-- Loading state for languages -->
                                <div v-else-if="isLoadingLanguages" class="text-center p-3 mb-3">
                                    <b-spinner label="Loading languages..."></b-spinner>
                                </div>

                                <!-- Custom Fields (not translatable - only show on the default language tab) -->
                                <div class="card" v-if="customFields.length && isDefaultLanguageTabActive">
                                    <div class="card-header">
                                        <h4>{{ __('custom_fields') }}</h4>
                                    </div>
                                    <div class="card-body">
                                        <div class="row">
                                            <div class="form-group col-md-6" v-for="field in translatedCustomFields"
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

                                                <custom-field-date v-else-if="field.type === 'date'" v-model="customFieldValues[field.id]"
                                                    :placeholder="field.name"></custom-field-date>
                                                <input v-else :type="field.type === 'number' ? 'number' : 'text'"
                                                    class="form-control" v-model="customFieldValues[field.id]"
                                                    :placeholder="field.name">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Save button - common for all language tabs -->
                            <div class="card-footer d-flex justify-content-end flex-wrap gap-2 seller-form-actions">
                                <template v-if="id">
                                    <b-button type="submit" variant="primary" :disabled="isLoading"> {{ __('update') }}
                                        <b-spinner v-if="isLoading" small label="Spinning"></b-spinner>
                                    </b-button>
                                </template>
                                <template v-else>
                                    <button type="button" class="btn btn-outline-secondary" @click="clearForm()">
                                        {{ __('clear') }}</button>
                                    <b-button type="submit" variant="primary" :disabled="isLoading"> {{ __('save') }}
                                        <b-spinner v-if="isLoading" small label="Spinning"></b-spinner>
                                    </b-button>
                                </template>
                            </div>
                        </div>

                    </form>
                </div>
            </div>
        </div>
        <!-- Commission Rule Modal-->
        <b-modal v-model="commissionRule" size="lg" title="How commission (Admin commission) will get credited?">
            <b-container fluid>
                <ol>

                    <li>
                        Formula for commision (Admin commission) is <b>Sub total (Excluding delivery charge) / 100 *
                            commission percentage</b>
                    </li>
                    <li>
                        For example sub total is 1378 and commission is 20% then 1378 / 100 X 20 = 275.6 so 1378
                        - 275.6 = 1102.4 will get credited into seller's wallet.
                    </li>
                    <li>
                        275.6 is commission for Admin and 1102.4 is earning of seller .
                    </li>
                    <li>
                        If Order status is delivered then only seller will get earning.
                    </li>
                    <li>
                        Ex - 1. Order placed on 11-Aug-21 and product return days are set to 0 so 11-Aug + 0 days =
                        11-Aug seller earning will get credited when admin is logged in admin panel.
                    </li>
                    <li>
                        Ex - 2. Order placed on 11-Aug-21 and product return days are set to 7 so 11-Aug + 7 days =
                        18-Aug seller earning will get credited when admin is logged in admin panel.
                    </li>

                </ol>
            </b-container>
            <template #modal-footer>
                <b-button variant="secondary" size="sm" class="float-right" @click="commissionRule = false">{{
                    __('ok') }}
                </b-button>
            </template>
        </b-modal>
    </div>
</template>
<script>
import { VuejsDatatableFactory } from 'vuejs-datatable';
import axios from "axios";
import Select2 from 'v-select2-component';

import Multiselect from 'vue-multiselect';
import { gmapApi } from 'vue2-google-maps';
import Editor from '@tinymce/tinymce-vue';

import Auth from '../../Auth.js';
import TranslationHelper from '../../mixins/TranslationHelper.js';

export default {
    mixins: [TranslationHelper],
    components: {
        VuejsDatatableFactory,
        Select2,
        Multiselect,
        'editor': Editor
    },
    data: function () {
        return {
            login_user: Auth.user,
            cacheTimer: null,
            cachedData: null,
            skipCache: false,

            isLoading: false,
            center: { lat: 0, lng: 0 },
            map: "",
            drawingManager: "",

            currentPlace: null,
            markers: [],
            place_name: "",
            osmSellerQuery: "",
            osmSellerSuggestions: [],
            osmPickupQuery: "",
            osmPickupSuggestions: [],
            formatted_address: "",
            infoWindow: {
                position: { lat: 0, lng: 0 },
                open: false,
                template: ''
            },
            city: "",
            cities: [],

            name: "",
            email: "",
            mobile: "",

            password: "",
            showPassword: false,
            confirm_password: "",
            showConfirmPassword: false,

            store_name: "",
            street: "",
            pincode_id: "",
            city_id: [],
            categories_ids: [],
            state: "",
            remark: "",
            commission: "",
            latitude: "",
            longitude: "",
            store_description: "",
            require_products_approval: 0,
            // customer_privacy: 0,
            view_order_otp: 0,
            assign_delivery_boy: 0,
            change_order_status_delivered
            : 0,
            delivery_boy_source: 'shared',
            status: 0,
            store_logo: "",
            store_logo_url: "",

            categories: [],
            modules: [],
            module_id: "",
            id: null,
            admin_id: null,
            record: null,
            id_card: "",
            proof: "",

            commissionRule: false,
            mobilevalidationError: null,
            commissionvalidationError: null,
            isFormLoaded: false, // Flag to prevent form refilling
            isUserTyping: false, // Flag to track if user is actively typing

            // Self Pickup fields
            self_pickup_mode: 0,
            door_step_mode: 1,
            pickup_store_address: "",
            pickup_latitude: "",
            pickup_longitude: "",
            pickup_store_timings: "",

            // Pickup map properties
            pickupCenter: { lat: 0, lng: 0 },
            pickupMarkers: [],
            pickupInfoWindow: {
                position: { lat: 0, lng: 0 },
                open: false,
                template: ''
            },
            pickupCurrentPlace: null,

            // Store timings (single time range)
            storeTimings: {
                opening_time: '09:00',
                closing_time: '18:00'
            },

            // Store settings for watcher
            store_settings: {
                one_seller_cart: 0,
                self_pickup_mode: 0
            },

            // Multi-language support
            activeLanguageTab: 0,
            translations: {},
            defaultLanguageId: null,
            languages: [],
            isLoadingLanguages: false,

            // Translate buttons
            translatableFields: ['name', 'store_name', 'store_description'],
            translateSuccessMessage: '',
            loadingEmpty: false,
            loadingOverwrite: false,

            // Custom fields
            customFields: [],
            customFieldValues: {},
            customFieldFiles: {},
            customFieldExistingValues: {},
        }
    },
    watch: {
        // Auto-disable self pickup when one seller cart is turned off
        'store_settings.one_seller_cart'(newValue) {
            if (newValue == 0) {
                this.self_pickup_mode = 0;
                this.door_step_mode = 1;
            }
        },

        // Validation: When self pickup mode is enabled, at least one delivery mode should be enabled
        'self_pickup_mode'(newValue) {
            this.ensureAtLeastOneDeliveryMode('self_pickup_mode');
        },

        'door_step_mode'(newValue) {
            this.ensureAtLeastOneDeliveryMode('door_step_mode');
        },
        // Sync name field when language tab changes
        activeLanguageTab: function (newTab) {
            if (this.languages.length > 0 && this.languages[newTab]) {
                const currentLangId = this.languages[newTab].id;
                if (this.translations[currentLangId]) {
                    // Update the name field to reflect current language
                    this.name = this.translations[currentLangId].name || '';
                }
            }
        },
        name: function () {
            // Update translation when name changes
            const currentLangId = this.getCurrentLanguageId();
            if (currentLangId && this.translations[currentLangId]) {
                this.translations[currentLangId].name = this.name;
            }
            if (!this.id) this.debouncedSave();
        },
        email: function () { if (!this.id) this.debouncedSave(); },
        mobile: function () { if (!this.id) this.debouncedSave(); },
        store_name: function () { if (!this.id) this.debouncedSave(); },
        street: function () { if (!this.id) this.debouncedSave(); },
        city_id: { handler: function () { if (!this.id) this.debouncedSave(); }, deep: true },
        categories_ids: { handler: function () { if (!this.id) this.debouncedSave(); }, deep: true },
        state: function () { if (!this.id) this.debouncedSave(); },
        commission: function () { if (!this.id) this.debouncedSave(); },
        latitude: function () { if (!this.id) this.debouncedSave(); },
        longitude: function () { if (!this.id) this.debouncedSave(); },
        place_name: function () { if (!this.id) this.debouncedSave(); },
        formatted_address: function () { if (!this.id) this.debouncedSave(); },
        store_description: function () { if (!this.id) this.debouncedSave(); },
        require_products_approval: function () { if (!this.id) this.debouncedSave(); },
        self_pickup_mode: function () { if (!this.id) this.debouncedSave(); },
        door_step_mode: function () { if (!this.id) this.debouncedSave(); },
        pickup_store_address: function () { if (!this.id) this.debouncedSave(); },
        pickup_latitude: function () { if (!this.id) this.debouncedSave(); },
        pickup_longitude: function () { if (!this.id) this.debouncedSave(); },
        storeTimings: { handler: function () { if (!this.id) this.debouncedSave(); }, deep: true },
        translations: { handler: function () { if (!this.id) this.debouncedSave(); }, deep: true },
        module_id: function (newVal) {
            if (newVal) {
                this.getCategories(newVal);
            }
            if (!this.id) this.debouncedSave();
        }
    },
    created: function () {
        this.getModules();
        this.getCategories();
        this.getCities();
        this.getSellerCommission();
        this.getStoreSettings();
        this.getCustomFields();
        const languagesPromise = this.fetchActiveLanguages();

        this.id = this.$route.params.id;
        if (this.isSellerRole) {
            this.id = this.login_user.seller.id;
        }

        if (this.id) {
            this.getSeller();
        } else {
            languagesPromise.then(() => {
                this.restoreCache();
            });
        }
    },
    beforeDestroy: function () {
        if (!this.id && !this.skipCache) this.saveCache();
        if (this.cacheTimer) clearTimeout(this.cacheTimer);
    },
    computed: {
        // Custom Fields card sits below the language tabs (not inside b-tab content), so it must
        // check the currently active tab itself to hide on non-default language tabs.
        isDefaultLanguageTabActive: function () {
            if (!Array.isArray(this.languages) || this.languages.length === 0) {
                return true;
            }
            const activeLanguage = this.languages[this.activeLanguageTab];
            return !activeLanguage || !!activeLanguage.is_default;
        },
        // Custom field label/options in the current app locale, falling back to the
        // default-language name/options when no translation exists for it.
        currentDisplayLanguageId: function () {
            if (!Array.isArray(this.languages) || this.languages.length === 0) {
                return null;
            }
            const appLocale = window.appLocale || 'en';
            const currentLanguage = this.languages.find(lang => lang.code === appLocale);
            if (currentLanguage) return currentLanguage.id;
            const defaultLanguage = this.languages.find(lang => lang.is_default === 1);
            return defaultLanguage ? defaultLanguage.id : null;
        },
        translatedCustomFields: function () {
            const list = Array.isArray(this.customFields) ? this.customFields : [];

            if (!this.currentDisplayLanguageId || list.length === 0) {
                return list;
            }

            return list.map(field => {
                const translatedField = { ...field };

                if (Array.isArray(field.translations)) {
                    const translation = field.translations.find(
                        t => t.language_id === this.currentDisplayLanguageId
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
        categories_options: function () {
            var temp = [];
            if (this.categories.length !== 0) {
                this.categories.forEach(category => {
                    //Only Main Categories
                    if (category.parent_id == 0) {
                        temp.push({ id: category.id, text: category.name })
                    }
                });
            }
            return temp;
        },
        cities_options: function () {
            if (!Array.isArray(this.cities) || this.cities.length === 0) {
                return [];
            }
            return this.cities.map(city => ({
                id: city.id,
                text: (city.name || '') + '-' + (city.zone || '')
            }));
        },
        google: gmapApi,
        mapProvider() {
            return window.mapProvider === 'osm' ? 'osm' : 'google';
        },
        // Computed property to safely access $roleSeller
        roleSeller() {
            return (this.$roleSeller !== undefined) ? this.$roleSeller : '';
        },
        // Computed property to check if current user is seller
        // Safely checks all required properties before comparison
        isSellerRole() {
            try {
                return this.login_user &&
                    this.login_user.role &&
                    this.login_user.role.name &&
                    this.roleSeller &&
                    this.roleSeller === this.login_user.role.name;
            } catch (e) {
                return false;
            }
        }
    },
    methods: {
        /**
         * File inputs live inside a `v-for` (language tabs).
         * In Vue 2, any `ref` used inside a loop becomes an ARRAY in `$refs`.
         * So `$refs.someRef.click()` can fail with:
         *   "click is not a function"
         * because `$refs.someRef` is actually `[HTMLInputElement]`.
         *
         * This helper safely handles both cases (array ref and single ref).
         * Uses $nextTick to ensure refs are available after DOM updates.
         */
        triggerRefClick(refName) {
            // Use $nextTick to ensure refs are available after Vue updates DOM
            this.$nextTick(() => {
                try {
                    const ref = this.$refs[refName];

                    // If ref doesn't exist, exit silently
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
                    // Keep silent; upload input is a best-effort UX helper.
                    console.warn('Error triggering file input click:', e);
                }
            });
        },

        // Get editor configuration with safe fallbacks
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
                // Phones: wrap the toolbar onto several rows instead of a sideways-scrolling one.
                ...(window.innerWidth < 576 ? { toolbar_mode: 'wrap' } : {}),
                ...this.$tinymceImageUploadOptions()
            };
        },

        fetchActiveLanguages() {
            this.isLoadingLanguages = true;
            return axios.get(this.$apiUrl + '/active_languages')
                .then(response => {
                    if (response.data.data) {
                        this.languages = response.data.data;
                        const defaultLang = this.languages.find(lang => lang.is_default === 1);
                        if (defaultLang) {
                            this.defaultLanguageId = defaultLang.id;
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
                    store_name: '',
                    store_description: '',
                };
            });
            this.translations = allTranslations;
        },

        getCurrentLanguageId() {
            if (this.languages.length > 0 && this.activeLanguageTab >= 0) {
                return this.languages[this.activeLanguageTab].id;
            }
            return this.defaultLanguageId || (this.languages.length > 0 ? this.languages[0].id : null);
        },

        getCities() {
            this.isLoading = true
            axios.get(this.$apiUrl + '/cities')
                .then((response) => {
                    this.isLoading = false
                    let data = response.data;
                    const raw = data.data;
                    const list = (raw && raw.cities) ? raw.cities : raw;
                    this.cities = Array.isArray(list) ? list : (list && typeof list === 'object' ? Object.values(list) : [])
                }).catch(error => {
                    this.isLoading = false;
                    if (error?.request?.statusText) {
                        this.showError(error.request.statusText);
                    } else if (error.message) {
                        this.showError(error.message);
                    } else {
                        this.showError(__('something_went_wrong'));
                    }
                });
        },
        getCategories(moduleId = null) {
            this.isLoading = true
            let headers = {};
            let mid = moduleId || this.module_id;
            if (mid) {
                headers['X-Module-Id'] = mid;
            }
            axios.get(this.$apiUrl + '/categories/main', { headers })
                .then((response) => {
                    this.isLoading = false
                    let data = response.data;
                    this.categories = data.data;
                }).catch(error => {
                    this.isLoading = false;
                    if (error?.request?.statusText) {
                        this.showError(error.request.statusText);
                    } else if (error.message) {
                        this.showError(error.message);
                    } else {
                        this.showError(__('something_went_wrong'));
                    }
                });
        },
        getModules() {
            axios.get(this.$apiUrl + '/modules')
                .then((response) => {
                    let data = response.data;
                    this.modules = data.data;
                });
        },
        getSellerCommission() {
            axios.get(this.$sellerApiUrl + '/seller_commission')
                .then((response) => {
                    let data = response.data;
                    this.commission = data.data.value;
                });
        },

        getStoreSettings() {
            axios.get(this.$apiUrl + '/store_settings')
                .then((response) => {
                    let data = response.data.data;
                    this.store_settings = data.store_settingsObject;

                    // Load store settings values
                    data.store_settings.forEach((item) => {
                        if (item.variable === 'one_seller_cart') {
                            this.store_settings.one_seller_cart = (item.value === '1') ? 1 : 0;
                        }
                        if (item.variable === 'self_pickup_mode') {
                            this.store_settings.self_pickup_mode = (item.value === '1') ? 1 : 0;
                        }
                    });
                });
        },

        setPlace(place) {
            this.currentPlace = place;
            this.addMarker()
        },
        addMarker() {
            if (this.currentPlace) {
                const marker = {
                    lat: this.currentPlace.geometry.location.lat(),
                    lng: this.currentPlace.geometry.location.lng(),
                    draggable: true,
                };
                this.markers.push({ position: marker });
                this.center = marker;

                this.latitude = this.currentPlace.geometry.location.lat();
                this.longitude = this.currentPlace.geometry.location.lng();

                let addressArr = this.currentPlace.formatted_address.split(",");
                this.street = addressArr[0] + " " + addressArr[1];

                this.place_name = this.currentPlace.name;
                this.formatted_address = this.currentPlace.formatted_address;

                this.infoWindow.position = { lat: this.latitude, lng: this.longitude }
                this.infoWindow.template = `<b>${this.place_name}</b><br>${this.formatted_address}`
                this.infoWindow.open = true;
                this.currentPlace = null;
            }
        },

        getCurrentLocation() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((position) => {
                    this.latitude = position.coords.latitude;
                    this.longitude = position.coords.longitude;
                    let latlng = new google.maps.LatLng(this.latitude, this.longitude);
                    this.mapConfig(latlng);
                });
            } else {
                this.showError("Geolocation is not supported by this browser.");
            }
        },
        handleMapClick(place) {
            this.latitude = place.latLng.lat();
            this.longitude = place.latLng.lng();
            let latlng = place.latLng;
            this.mapConfig(latlng);
        },
        mapConfig(latlng) {
            let vm = this;
            let geocoder = new google.maps.Geocoder;
            geocoder.geocode({ 'location': latlng }, function (results, status) {
                if (status === 'OK') {
                    if (results[1]) {
                        let clikedPlace = results[1];

                        let addressArr = clikedPlace.formatted_address.split(",");
                        vm.street = addressArr[0] + " " + addressArr[1];
                        vm.place_name = addressArr[1];
                        vm.formatted_address = clikedPlace.formatted_address;
                        vm.infoWindow.position = { lat: vm.latitude, lng: vm.longitude }
                        vm.infoWindow.template = `<b>${vm.place_name}</b><br>${vm.formatted_address}`
                        vm.infoWindow.open = true;
                        vm.currentPlace = null;

                        vm.markers = [];
                        const marker = {
                            lat: parseFloat(vm.latitude),
                            lng: parseFloat(vm.longitude),
                            draggable: true,
                        }
                        vm.markers.push({ position: marker });
                        vm.center = marker;

                    } else {
                        console.warn('No results found');
                    }
                }
            });
        },

        updateCoordinates(location) {
            this.handleMapClick(location);
        },
        onOsmLocationSelected(payload) {
            this.latitude = payload.lat;
            this.longitude = payload.lng;

            let addressArr = (payload.formatted_address || '').split(",");
            this.street = addressArr[0] + " " + (addressArr[1] || "");
            this.place_name = payload.name || addressArr[1] || payload.formatted_address;
            this.formatted_address = payload.formatted_address;
        },
        resolveMapRef(name) {
            const r = this.$refs[name];
            return Array.isArray(r) ? r[0] : r;
        },
        onOsmSellerQueryInput(text) {
            this.osmSellerQuery = text;
            const map = this.resolveMapRef('osmSellerMap');
            if (map) {
                map.setQueryAndSearch(text);
            }
        },
        selectOsmSellerSuggestion(suggestion) {
            this.osmSellerQuery = suggestion.placePrediction.text.text;
            this.osmSellerSuggestions = [];
            const map = this.resolveMapRef('osmSellerMap');
            if (map) {
                map.selectSuggestion(suggestion);
            }
        },
        getOsmCurrentLocation() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((position) => {
                    const map = this.resolveMapRef('osmSellerMap');
                    map && map.setView(position.coords.latitude, position.coords.longitude);
                    axios.post(this.$apiUrl + '/map/geocode', {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        source: 'web',
                    }).then((response) => {
                        const data = response.data && response.data.data ? response.data.data : response.data;
                        const result = data && data.results && data.results[0];
                        this.onOsmLocationSelected({
                            lat: position.coords.latitude,
                            lng: position.coords.longitude,
                            formatted_address: result ? result.formatted_address : '',
                            name: result ? result.formatted_address : '',
                        });
                    });
                });
            } else {
                this.showError("Geolocation is not supported by this browser.");
            }
        },
        setCityId() {
            this.state = this.city.state;
            this.city_id = this.city.id;
        },
        /**
         * Helper to safely get file input ref (handles array refs from v-for)
         */
        getFileInputRef(refName) {
            const ref = this.$refs[refName];
            if (!ref) {
                return null;
            }
            // If ref is array (from v-for), get first valid element
            if (Array.isArray(ref)) {
                return ref.find(el => el && el.files) || null;
            }
            return ref;
        },

        handleFileStoreLogo() {
            const fileInput = this.getFileInputRef('file_store_logo');
            if (fileInput && fileInput.files && fileInput.files[0]) {
                this.store_logo = fileInput.files[0];
                this.store_logo_url = URL.createObjectURL(this.store_logo);
            }
        },
        dropFileStoreLogo(event) {
            event.preventDefault();
            const fileInput = this.getFileInputRef('file_store_logo');
            if (fileInput) {
                fileInput.files = event.dataTransfer.files;
                this.handleFileStoreLogo(); // Trigger the onChange event manually
            }
            // Clean up
            event.currentTarget.classList.add('bg-gray-100');
            event.currentTarget.classList.remove('bg-green-300');
        },

        validateMobileNumber() {
            const mobileNumber = this.mobile;
            if (!/^\d{1,16}$/.test(mobileNumber)) {
                this.mobilevalidationError = __('mobile_number_must_be_maximum_16_digits_numbers');
            } else {
                this.mobilevalidationError = null;
            }
        },
        validateCommission() {
            if (this.commission < 0 || this.commission > 100) {
                this.commissionvalidationError = "Percentage must be between 0 and 100.";
                this.commission = null;
            } else {
                this.commissionvalidationError = null;
            }
        },
        clearForm() {
            if (this.$refs['my-form']) this.$refs['my-form'].reset();
            Object.assign(this, {
                name: "", email: "", mobile: "", password: "", confirm_password: "",
                store_name: "", street: "", pincode_id: "", city_id: [], categories_ids: [],
                state: "", remark: "", commission: "",
                module_id: "",
                latitude: "", longitude: "", store_description: "", require_products_approval: 0,
                view_order_otp: 0, assign_delivery_boy: 0, change_order_status_delivered: 0,
                delivery_boy_source: 'shared',
                status: 0, store_logo: "", store_logo_url: "",
                place_name: "", formatted_address: "",
                markers: [], self_pickup_mode: 0, door_step_mode: 1, pickup_store_address: "",
                pickup_latitude: "", pickup_longitude: "", storeTimings: { opening_time: '09:00', closing_time: '18:00' },
                mobilevalidationError: null, commissionvalidationError: null,
                isFormLoaded: false, activeLanguageTab: 0
            });
            this.initializeTranslations();
            this.infoWindow.open = false;
            localStorage.removeItem('seller_form_cache');
        },

        saveCache: function () {
            if (this.id || this.skipCache) return;
            try {
                const defaultLang = this.languages.find(lang => lang.is_default === 1);
                const defaultTranslation = defaultLang && this.translations[defaultLang.id]
                    ? this.translations[defaultLang.id]
                    : null;
                const data = {
                    name: defaultTranslation ? defaultTranslation.name : this.name,
                    email: this.email, mobile: this.mobile,
                    store_name: defaultTranslation ? defaultTranslation.store_name : this.store_name,
                    street: this.street, pincode_id: this.pincode_id,
                    module_id: this.module_id,
                    city_id: this.city_id, categories_ids: this.categories_ids, state: this.state,
                    remark: this.remark, commission: this.commission,
                    latitude: this.latitude, longitude: this.longitude, place_name: this.place_name,
                    formatted_address: this.formatted_address,
                    store_description: defaultTranslation ? defaultTranslation.store_description : this.store_description,
                    require_products_approval: this.require_products_approval, view_order_otp: this.view_order_otp,
                    assign_delivery_boy: this.assign_delivery_boy, change_order_status_delivered: this.change_order_status_delivered,
                    delivery_boy_source: this.delivery_boy_source,
                    status: this.status, self_pickup_mode: this.self_pickup_mode, door_step_mode: this.door_step_mode,
                    pickup_store_address: this.pickup_store_address, pickup_latitude: this.pickup_latitude,
                    pickup_longitude: this.pickup_longitude, storeTimings: JSON.parse(JSON.stringify(this.storeTimings)),
                    translations: JSON.parse(JSON.stringify(this.translations)),
                    activeLanguageTab: this.activeLanguageTab,
                    timestamp: Date.now()
                };
                localStorage.setItem('seller_form_cache', JSON.stringify(data));
            } catch (e) { }
        },

        restoreCache: function () {
            try {
                const cached = localStorage.getItem('seller_form_cache');
                if (!cached) return;
                const data = JSON.parse(cached);
                if (data.timestamp && Date.now() - data.timestamp > 120000) {
                    localStorage.removeItem('seller_form_cache');
                    return;
                }
                this.cachedData = data;
                Object.keys(data).forEach(key => {
                    if (key === 'timestamp' || key === 'translations') return;
                    if (key === 'storeTimings' && data.storeTimings) {
                        this.storeTimings = data.storeTimings;
                    } else if (this.hasOwnProperty(key)) {
                        this[key] = data[key] !== undefined ? data[key] : this[key];
                    }
                });
                // Restore translations after languages have been initialized.
                if (data.translations && this.languages && this.languages.length > 0) {
                    this.languages.forEach(language => {
                        if (data.translations[language.id]) {
                            this.$set(this.translations, language.id, {
                                ...this.translations[language.id],
                                ...data.translations[language.id]
                            });
                        }
                    });
                    const defaultLang = this.languages.find(lang => lang.is_default === 1);
                    if (defaultLang && this.translations[defaultLang.id]) {
                        this.name = this.translations[defaultLang.id].name || this.name;
                        this.store_name = this.translations[defaultLang.id].store_name || this.store_name;
                        this.store_description = this.translations[defaultLang.id].store_description || this.store_description;
                    }
                }
                if (this.latitude && this.longitude) {
                    const marker = { lat: parseFloat(this.latitude), lng: parseFloat(this.longitude), draggable: true };
                    this.markers = [{ position: marker }];
                    this.center = marker;
                    this.infoWindow.position = { lat: parseFloat(this.latitude), lng: parseFloat(this.longitude) };
                    this.infoWindow.template = `<b>${this.place_name || 'Location'}</b><br>${this.formatted_address || ''}`;
                }
                if (this.pickup_latitude && this.pickup_longitude) {
                    this.pickupCenter = { lat: parseFloat(this.pickup_latitude), lng: parseFloat(this.pickup_longitude) };
                    this.pickupMarkers = [{ position: { lat: parseFloat(this.pickup_latitude), lng: parseFloat(this.pickup_longitude) } }];
                }
            } catch (e) {
                localStorage.removeItem('seller_form_cache');
            }
        },

        debouncedSave: function () {
            if (this.cacheTimer) clearTimeout(this.cacheTimer);
            this.cacheTimer = setTimeout(() => this.saveCache(), 500);
        },

        onInputFocus() {
            // Set flag when user starts typing
            this.isUserTyping = true;
        },

        onInputBlur() {
            // Reset flag when user stops typing (with a small delay)
            setTimeout(() => {
                this.isUserTyping = false;
            }, 1000);
        },
        getCustomFields() {
            axios.get(this.$apiUrl + '/custom_fields/list', { params: { module: 'seller', active_only: 1 } })
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
        getSeller() {
            // Prevent multiple calls and form refilling
            if (this.isFormLoaded || this.isUserTyping) {
                return;
            }

            axios.get(this.$apiUrl + '/sellers/edit/' + this.id)
                .then((response) => {
                    this.isLoading = false
                    let data = response.data;
                    if (data.status === 1) {
                        // Set flag to prevent refilling
                        this.isFormLoaded = true;

                        this.record = data.data

                        // Helper: show empty string when value is null, undefined, or string "null"
                        const emptyIfNull = (val) => (val != null && val !== "null") ? val : "";

                        this.admin_id = this.record.admin.id ?? this.record.admin_id;
                        this.email = this.record.admin.email ?? this.record.email;

                        this.mobile = this.record.mobile;

                        this.password = "";
                        this.confirm_password = "";

                        // Load translations from the seller object
                        const updatedTranslations = { ...this.translations };

                        if (this.record.translations && Array.isArray(this.record.translations)) {
                            // Convert array of translation objects to object keyed by language_id
                            this.record.translations.forEach(trans => {
                                const langId = trans.language_id;
                                updatedTranslations[langId] = {
                                    name: emptyIfNull(trans.name),
                                    store_name: emptyIfNull(trans.store_name),
                                    store_description: emptyIfNull(trans.store_description),
                                };
                            });
                        }

                        // For languages without translations, use base table data for default language
                        this.languages.forEach(language => {
                            if (!updatedTranslations[language.id] ||
                                (!updatedTranslations[language.id].name && !updatedTranslations[language.id].store_name)) {
                                if (language.is_default) {
                                    // Default language: use base table data as fallback
                                    updatedTranslations[language.id] = {
                                        name: emptyIfNull(this.record.name),
                                        store_name: emptyIfNull(this.record.store_name),
                                        store_description: emptyIfNull(this.record.store_description),
                                    };
                                }
                            }
                        });

                        // Set default language values for backward compatibility
                        const defaultLang = this.languages.find(lang => lang.is_default === 1);
                        if (defaultLang && updatedTranslations[defaultLang.id]) {
                            this.name = emptyIfNull(updatedTranslations[defaultLang.id].name) || emptyIfNull(this.record.name);
                            this.store_name = emptyIfNull(updatedTranslations[defaultLang.id].store_name) || emptyIfNull(this.record.store_name);
                            this.store_description = emptyIfNull(updatedTranslations[defaultLang.id].store_description) || emptyIfNull(this.record.store_description);
                        } else {
                            this.name = emptyIfNull(this.record.name);
                            this.store_name = emptyIfNull(this.record.store_name);
                            this.store_description = emptyIfNull(this.record.store_description);
                        }

                        // Single assignment for reactivity
                        this.translations = updatedTranslations;
                        this.street = emptyIfNull(this.record.street);
                        this.pincode_id = "";
                        this.city_id = emptyIfNull(this.record.city_id) ? this.record.city_id.split(",") : [];
                        this.categories_ids = emptyIfNull(this.record.categories) ? this.record.categories.split(",") : [];
                        this.state = emptyIfNull(this.record.state);
                        this.remark = emptyIfNull(this.record.remark);
                        this.commission = this.record.commission;
                        this.latitude = this.record.latitude;
                        this.longitude = this.record.longitude;

                        this.place_name = emptyIfNull(this.record.place_name);
                        this.formatted_address = emptyIfNull(this.record.formatted_address);
                        this.require_products_approval = this.record.require_products_approval;
                        // this.customer_privacy = this.record.customer_privacy;
                        this.view_order_otp = this.record.view_order_otp;
                        this.assign_delivery_boy = this.record.assign_delivery_boy;
                        this.change_order_status_delivered = this.record.change_order_status_delivered;
                        this.delivery_boy_source = this.record.delivery_boy_source || 'shared';

                        // Self Pickup fields
                        this.self_pickup_mode = (this.record.self_pickup_mode === null || this.record.self_pickup_mode === undefined) ? 0 : this.record.self_pickup_mode;
                        this.door_step_mode = (this.record.door_step_mode === null || this.record.door_step_mode === undefined) ? 1 : this.record.door_step_mode;
                        this.pickup_store_address = emptyIfNull(this.record.pickup_store_address);
                        this.pickup_latitude = this.record.pickup_latitude || "";
                        this.pickup_longitude = this.record.pickup_longitude || "";
                        this.module_id = this.record.module_id || "";

                        // Custom field values
                        this.customFieldExistingValues = this.record.custom_field_values || {};
                        this.applyCustomFieldValues();

                        // Load store timings
                        if (this.record.pickup_store_timings) {
                            try {
                                const parsedTimings = JSON.parse(this.record.pickup_store_timings);
                                // Handle both old array format and new object format
                                if (Array.isArray(parsedTimings)) {
                                    // Convert old format to new format (use first day's timings)
                                    const firstDay = parsedTimings.find(day => day.is_open);
                                    if (firstDay) {
                                        this.storeTimings = {
                                            opening_time: firstDay.opening_time || '09:00',
                                            closing_time: firstDay.closing_time || '18:00'
                                        };
                                    }
                                } else {
                                    this.storeTimings = parsedTimings;
                                }
                            } catch (e) {
                                console.log('Error parsing store timings:', e);
                            }
                        }

                        // Set pickup map marker if coordinates exist
                        if (this.pickup_latitude && this.pickup_longitude) {
                            this.pickupCenter = {
                                lat: parseFloat(this.pickup_latitude),
                                lng: parseFloat(this.pickup_longitude)
                            };
                            this.pickupMarkers = [{
                                position: {
                                    lat: parseFloat(this.pickup_latitude),
                                    lng: parseFloat(this.pickup_longitude)
                                }
                            }];
                            this.pickupInfoWindow.position = {
                                lat: parseFloat(this.pickup_latitude),
                                lng: parseFloat(this.pickup_longitude)
                            };
                            this.pickupInfoWindow.template = `<b>Pickup Location</b><br>${this.pickup_store_address}`;
                        }

                        this.status = this.record.status;
                        this.store_logo = this.record.store_logo;

                        this.store_logo_url = this.$storageUrl + this.record.logo;

                        const marker = {
                            lat: parseFloat(this.latitude),
                            lng: parseFloat(this.longitude),
                            draggable: true,
                        }
                        this.markers.push({ position: marker });
                        this.center = marker;

                        this.infoWindow.position = { lat: parseFloat(this.latitude), lng: parseFloat(this.longitude) }
                        this.infoWindow.template = `<b>${this.place_name}</b><br>${this.formatted_address}`
                        this.infoWindow.open = true;

                    } else {
                        this.showError(data.message);
                        setTimeout(() => {
                            this.$router.back();
                        }, 1000);
                    }
                }).catch(error => {
                    this.isLoading = false;
                    if (error?.request?.statusText) {
                        this.showError(error.request.statusText);
                    } else if (error.message) {
                        this.showError(error.message);
                    } else {
                        this.showError(__('something_went_wrong'));
                    }
                });
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

        saveRecord: function () {
            // Validate default language fields
            if (!this.validateDefaultLanguage()) {
                return;
            }

            if (!this.validateCustomFields()) {
                return;
            }

            this.isLoading = true;
            let vm = this;

            // Collect all languages with translations to save
            const defaultLang = this.languages.find(lang => lang.is_default);
            const allTranslations = [];

            // Add default language translation (required)
            if (defaultLang) {
                const defaultTranslation = this.translations[defaultLang.id];
                allTranslations.push({
                    language_id: defaultLang.id,
                    name: defaultTranslation.name || '',
                    store_name: defaultTranslation.store_name || '',
                    store_description: defaultTranslation.store_description || ''
                });
            }

            // Add other languages that have data
            this.languages.forEach(language => {
                if (language.is_default) return; // Skip default, already added

                const translation = this.translations[language.id];
                const hasData = (translation.name && translation.name.trim() !== '') ||
                    (translation.store_name && translation.store_name.trim() !== '') ||
                    (translation.store_description && translation.store_description.trim() !== '');

                if (hasData) {
                    allTranslations.push({
                        language_id: language.id,
                        name: translation.name || '',
                        store_name: translation.store_name || '',
                        store_description: translation.store_description || ''
                    });
                }
            });

            // Single save call with all translations
            const saveAll = async () => {
                const sellerId = this.id; // For edit mode
                const defaultTranslation = this.translations[defaultLang.id];

                let formData = new FormData();

                // Determine URL
                let url = this.$apiUrl + '/sellers/save';
                if (sellerId) {
                    url = this.$apiUrl + '/sellers/update';
                    formData.append('id', sellerId);
                    formData.append('admin_id', this.admin_id);
                }

                // Send default language_id for backward compatibility
                formData.append('language_id', defaultLang.id);

                // Default language translatable fields (for main table)
                formData.append('name', defaultTranslation.name || '');
                formData.append('store_name', defaultTranslation.store_name || '');
                formData.append('store_description', defaultTranslation.store_description || '');

                // All required fields
                formData.append('email', this.email);
                formData.append('mobile', this.mobile);

                // Password only for new sellers or when changing
                if (!sellerId) {
                    formData.append('password', this.password);
                    formData.append('confirm_password', this.confirm_password);
                } else if (this.password) {
                    formData.append('password', this.password);
                    formData.append('confirm_password', this.confirm_password);
                }

                // Non-translatable fields
                formData.append('street', this.street);
                formData.append('pincode_id', this.pincode_id);
                formData.append('city_id', this.city_id);
                formData.append('categories_ids', this.categories_ids);
                formData.append('state', this.state);
                formData.append('remark', this.remark);
                formData.append('commission', this.commission);
                formData.append('latitude', this.latitude);
                formData.append('longitude', this.longitude);
                formData.append('place_name', this.place_name);
                formData.append('formatted_address', this.formatted_address);
                formData.append('require_products_approval', this.require_products_approval);
                formData.append('view_order_otp', this.view_order_otp);
                formData.append('assign_delivery_boy', this.assign_delivery_boy);
                formData.append('change_order_status_delivered', this.change_order_status_delivered);
                formData.append('delivery_boy_source', this.delivery_boy_source);
                formData.append('self_pickup_mode', this.self_pickup_mode);
                formData.append('door_step_mode', this.door_step_mode);
                formData.append('module_id', this.module_id);
                formData.append('pickup_store_address', this.pickup_store_address);
                formData.append('pickup_latitude', this.pickup_latitude);
                formData.append('pickup_longitude', this.pickup_longitude);
                formData.append('pickup_store_timings', JSON.stringify(this.storeTimings));
                formData.append('status', this.status);

                // Send all translations as JSON array
                formData.append('translations', JSON.stringify(allTranslations));

                // Files (only for new sellers or when updating)
                if (this.store_logo) {
                    formData.append('store_logo', this.store_logo);
                }

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

                try {
                    const response = await axios.post(url, formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    });

                    const apiStatus = response?.data?.status;
                    if (apiStatus !== 1) {
                        const apiMessage = response?.data?.message || __('something_went_wrong');
                        throw new Error(apiMessage);
                    }

                    return response;
                } catch (error) {
                    throw error;
                }
            };

            // Execute single save with all translations
            saveAll()
                .then(() => {
                    vm.skipCache = true;
                    localStorage.removeItem('seller_form_cache');
                    vm.isLoading = false;

                    // Show success message first
                    const successMessage = __('seller_saved_successfully') || 'Seller saved successfully!';
                    vm.showMessage("success", successMessage);

                    // Then redirect after a short delay to ensure toast is visible
                    setTimeout(
                        function () {
                            if (vm.isSellerRole) {
                                vm.$router.push({ path: '/seller/profile' })
                            } else {
                                vm.$router.push({ path: '/sellers' })
                            }
                        }, 1500);
                })
                .catch(error => {
                    vm.isLoading = false;
                    // Laravel validation errors often return 422 with `errors` object
                    if (error?.response?.status === 422 && error?.response?.data?.errors) {
                        const errors = error.response.data.errors;
                        const firstKey = Object.keys(errors)[0];
                        const firstMsg = firstKey && Array.isArray(errors[firstKey]) ? errors[firstKey][0] : null;
                        vm.showError(firstMsg || error.response.data.message || __('something_went_wrong'));
                    } else if (error?.response?.data?.message) {
                        vm.showError(error.response.data.message);
                    } else if (error.request && error.request.statusText) {
                        vm.showError(error.request.statusText);
                    } else if (error?.message) {
                        vm.showError(error.message);
                    } else {
                        vm.showError(__('something_went_wrong'));
                    }
                });
        },

        validateDefaultLanguage() {
            if (!this.defaultLanguageId) {
                this.showError(__('default_language_not_found'));
                return false;
            }

            const defaultTranslation = this.translations[this.defaultLanguageId];

            // Check required fields for default language
            if (!defaultTranslation.name || defaultTranslation.name.trim() === '') {
                this.showError(__('please_fill_name_in_default_language'));
                this.switchToDefaultLanguageTab();
                return false;
            }

            if (!defaultTranslation.store_name || defaultTranslation.store_name.trim() === '') {
                this.showError(__('please_fill_store_name_in_default_language'));
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

        // Self Pickup methods (similar to EditCity.vue)
        setPickupPlace(place) {
            this.pickupCurrentPlace = place;
            this.addPickupMarker();
        },

        addPickupMarker() {
            if (this.pickupCurrentPlace) {
                const marker = {
                    lat: this.pickupCurrentPlace.geometry.location.lat(),
                    lng: this.pickupCurrentPlace.geometry.location.lng(),
                };
                this.pickupMarkers = [{ position: marker }];
                this.pickupCenter = marker;
                this.pickup_latitude = this.pickupCurrentPlace.geometry.location.lat();
                this.pickup_longitude = this.pickupCurrentPlace.geometry.location.lng();

                // Auto-fill the pickup store address with the full formatted address
                this.pickup_store_address = this.pickupCurrentPlace.formatted_address;

                this.pickupInfoWindow.position = { lat: this.pickup_latitude, lng: this.pickup_longitude };
                this.pickupInfoWindow.template = `<b>${this.pickupCurrentPlace.name}</b><br>${this.pickup_store_address}`;
                this.pickupInfoWindow.open = true;
                this.pickupCurrentPlace = null;
            }
        },

        onPickupMarkerDragEnd(event) {
            const lat = event.latLng.lat();
            const lng = event.latLng.lng();

            this.pickup_latitude = lat.toString();
            this.pickup_longitude = lng.toString();

            // Update marker position
            this.pickupMarkers = [{
                position: { lat: lat, lng: lng }
            }];

            // Update info window
            this.pickupInfoWindow.position = { lat: lat, lng: lng };
            this.pickupInfoWindow.template = `<b>Selected Location</b><br>Lat: ${lat.toFixed(6)}, Lng: ${lng.toFixed(6)}`;
            this.pickupInfoWindow.open = true;
        },

        onOsmPickupLocationSelected(payload) {
            this.pickup_latitude = payload.lat;
            this.pickup_longitude = payload.lng;
            this.pickup_store_address = payload.formatted_address;
        },
        onOsmPickupQueryInput(text) {
            this.osmPickupQuery = text;
            const map = this.resolveMapRef('osmPickupMap');
            if (map) {
                map.setQueryAndSearch(text);
            }
        },
        selectOsmPickupSuggestion(suggestion) {
            this.osmPickupQuery = suggestion.placePrediction.text.text;
            this.osmPickupSuggestions = [];
            const map = this.resolveMapRef('osmPickupMap');
            if (map) {
                map.selectSuggestion(suggestion);
            }
        },

        ensureAtLeastOneDeliveryMode(changedField) {
            if (this.door_step_mode == 0 && this.self_pickup_mode == 0) {
                if (changedField === 'door_step_mode') {
                    this.self_pickup_mode = 1;
                } else {
                    this.door_step_mode = 1;
                }
                this.showError(this.__('at_least_one_delivery_mode_must_be_enabled') || "At least one delivery mode (Door Step or Self Pickup) must be enabled.");
            }
        }
    },
    mounted() {
    }
};
</script>
<style scoped>
@import "../../../../node_modules/vue-multiselect/dist/vue-multiselect.min.css";

.osm-suggestions {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    z-index: 1000;
    max-height: 220px;
    overflow-y: auto;
    background: var(--ui-surface);
    border: 1px solid var(--ui-border-strong);
    border-top: none;
}

/* Section cards nested inside the main form card: flat (no second shadow), clear header */
.card .card {
    box-shadow: none !important; /* global .card shadow would stack on the outer card */
    margin-bottom: 20px;
}

/* Dark mode: --ui-border equals the card surface, so a card inside the form card showed no edge */
body.theme-dark .card .card {
    border-color: var(--ui-border-strong) !important;
}

.card > .card-header .card-title,
.card .card > .card-header h4 {
    font-size: 15px;
    font-weight: 700;
    color: var(--ui-heading);
}

/* Show / hide password: neutral addon button instead of a solid primary block */
.password-toggle {
    border: 1px solid var(--ui-border-strong);
    border-left: 0;
}

.password-toggle-icon {
    width: 20px;
    height: 20px;
    opacity: 0.6;
}

/* The eye SVGs are black: flip them to white on the dark surface so they stay visible */
body.theme-dark .password-toggle-icon {
    filter: invert(1);
    opacity: 0.8;
}

/* Upload dropzone + preview */
.file-input-div label {
    display: block;
    margin-bottom: 4px;
    cursor: pointer;
}

.seller-form-actions .btn {
    min-width: 110px;
}

/* Compact thumb for logo/identity/address previews - keeps layout aligned when multiple are shown */
.file-preview-thumb {
    max-height: 80px;
    max-width: 80px;
    width: auto;
    height: auto;
    object-fit: contain;
    border: 1px solid var(--ui-border);
    border-radius: var(--ui-radius);
    padding: 4px;
}

/* Phones: this form is nested several levels deep (card > tab > row > col > row > col), and each
   level adds 12-24px of padding, which left the fields a ~180px strip with the status buttons,
   logo drop zone and editor toolbar cut off. Tighter padding / gutters and full-width controls. */
@media (max-width: 575.98px) {
    .card-body {
        padding: 12px;
    }

    .row {
        --bs-gutter-x: 0.75rem;
    }

    /* Active / Deactive toggle fills the row, each half equal. */
    .seller-status-group {
        width: 100%;
    }

    .seller-status-group > .btn {
        flex: 1 1 0;
        min-width: 0;
        padding-left: 0.5rem;
        padding-right: 0.5rem;
    }

    .file-input-div {
        width: 100%;
    }

    .seller-form-actions .btn {
        flex: 1 1 0;
    }
}
</style>
