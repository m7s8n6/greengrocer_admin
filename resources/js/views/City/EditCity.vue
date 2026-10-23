<template>
    <div>
        <div class="page-heading">
            <div class="page-title mb-3">
                <div class="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-2">
                    <h3 class="mb-0">{{ __('manage_city') }}</h3>
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb mb-0">
                            <li class="breadcrumb-item">
                                <router-link to="/dashboard">{{ __('dashboard') }}</router-link>
                            </li>
                            <li class="breadcrumb-item active" aria-current="page">
                                <template v-if="city.id">
                                    {{ __('edit') }}
                                </template>
                                <template v-else>
                                    {{ __('create') }}
                                </template>
                                {{ __('city') }}
                            </li>
                        </ol>
                    </nav>
                </div>
            </div>
            <div class="row">
                <div class="col-12 col-xl-6 mb-3">
                    <div class="card h-100 mb-0">
                        <div class="card-header">
                            <h4 class="card-title mb-0 float-none">
                                <template v-if="city.id">{{ __('edit') }}</template>
                                <template v-else>{{ __('create') }}</template>
                                {{ __('city') }}
                            </h4>
                            <p class="text-muted small mb-0 mt-1">{{ tr('city_details_desc', 'Search the city, then set its zone, travel time and delivery charges.') }}</p>
                        </div>
                        <div class="card-body">
                            <form ref="my-form" @submit.prevent="saveRecord" novalidate>
                                <b-tabs :key="renderKey" v-model="activeLanguageTab" content-class="mt-3"
                                    v-if="languages.length > 0">

                                    <b-tab v-for="language in languages" :key="language.id" :title="language.name">
                                        <template #title>
                                            <span :class="{ 'text-primary font-weight-bold': language.is_default }">
                                                {{ language.name }}
                                            </span>
                                        </template>

                                        <!-- Translate buttons (skip if no language.name) -->
                                        <div class="mb-3 d-flex flex-wrap gap-2"
                                            v-if="language.is_default && languages.length > 1 && language.name">
                                            <b-button size="sm" variant="outline-primary"
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
                                                class="text-success w-100 font-weight-bold">
                                                {{ translateSuccessMessage }}
                                            </div>
                                        </div>
                                        <!-- Translate buttons END -->

                                        <div class="form-group" v-if="language.is_default && mapProvider === 'google'">
                                            <label for="city_name"> {{ __('search_city') }}</label>
                                            <google-place-search :placeholder="__('search_city_on_map')"
                                                @place_changed="setPlace" input-id="city_name">
                                            </google-place-search>
                                            <input type="hidden" v-model="city.formatted_address">
                                            <small class="form-text text-muted">{{
                                                __('search_your_city_where_you_will_deliver_the_food_and_to_find_co_ordinates')
                                                }}</small>
                                        </div>
                                        <div class="form-group position-relative" v-if="language.is_default && mapProvider === 'osm'">
                                            <label for="osm_city_name"> {{ __('search_city') }}</label>
                                            <input type="search" class="form-control" id="osm_city_name"
                                                :placeholder="__('search_city_on_map')" :value="osmCityQuery"
                                                @input="onOsmCityQueryInput($event.target.value)" autocomplete="off">
                                            <ul v-if="osmCitySuggestions.length" class="list-group osm-suggestions">
                                                <li v-for="s in osmCitySuggestions" :key="s.placePrediction.placeId"
                                                    class="list-group-item list-group-item-action osm-suggestion-item"
                                                    @mousedown.prevent="selectOsmCitySuggestion(s)">
                                                    {{ s.placePrediction.text.text }}
                                                </li>
                                            </ul>
                                            <input type="hidden" v-model="city.formatted_address">
                                            <small class="form-text text-muted">{{
                                                __('search_your_city_where_you_will_deliver_the_food_and_to_find_co_ordinates')
                                                }}</small>
                                        </div>

                                        <div class="row">
                                        <div class="form-group col-12 col-md-6" v-if="language.is_default">
                                            <label for="latitude">{{ __('latitude') }} <span
                                                    class="text-danger text-sm">*</span></label>
                                            <input type="text" class="form-control" name="latitude" id="latitude"
                                                v-model="city.latitude" :placeholder="__('latitude')" required readonly>
                                        </div>
                                        <div class="form-group col-12 col-md-6" v-if="language.is_default">
                                            <label for="longitude"> {{ __('longitude') }}<span
                                                    class="text-danger text-sm">*</span></label>
                                            <input type="text" class="form-control" name="longitude" id="longitude"
                                                v-model="city.longitude" :placeholder="__('longitude')" required
                                                readonly>
                                        </div>

                                        <div class="form-group col-12 col-md-6" v-if="language.is_default">
                                            <label for="name"> {{ __('city_name') }}<span
                                                    class="text-danger text-sm">*</span></label>
                                            <input type="text" class="form-control" name="name" id="name"
                                                v-model="city.name" :placeholder="__('city_name')" required readonly>
                                        </div>

                                        <div class="form-group col-12 col-md-6" v-if="language.is_default">
                                            <label for="state"> {{ __('state_name') }}<span
                                                    class="text-danger text-sm">*</span></label>
                                            <input type="text" class="form-control" name="state" id="state"
                                                v-model="city.state" :placeholder="__('state_name')" required readonly>
                                        </div>

                                        <div class="form-group col-12" :class="{ 'col-md-6': language.is_default }">
                                            <label :for="'zone_' + language.id"> {{ __('zone_name') }}<span
                                                    v-if="language.is_default"
                                                    class="text-danger text-sm">*</span></label>
                                            <input type="text" class="form-control" name="zone"
                                                :id="'zone_' + language.id" v-model="translations[language.id].zone"
                                                :required="language.is_default == 1 ? true : undefined"
                                                :placeholder="__('zone_name')">
                                        </div>

                                        <div class="form-group col-12 col-md-6" v-if="language.is_default">
                                            <label for="time_to_travel">{{ __('time_to_travel_1km') }} <span
                                                    class="text-danger text-sm">*</span> <small>(
                                                    {{ __('enter_in_minutes') }})</small>
                                            </label>
                                            <input type="number" class="form-control" name="time_to_travel"
                                                id="time_to_travel" min="0" max="999999999"
                                                v-model="city.time_to_travel" :placeholder="__('enter_time_to_travel_1km_in_minutes')"
                                                required>
                                        </div>

                                        <div class="form-group col-12 col-md-6" v-if="language.is_default">
                                            <label for="min_amount_for_free_delivery">{{
                                                __('minimum_amount_for_free_delivery')
                                                }}<span class="text-danger text-xs">*</span> <small>[ {{ $currency }}
                                                    ]</small></label>
                                            <input type="number" class="form-control"
                                                name="min_amount_for_free_delivery" id="min_amount_for_free_delivery"
                                                v-model="city.min_amount_for_free_delivery"
                                                :placeholder="__('minimum_amount_for_free_delivery')" min="0"
                                                max="999999999" required>
                                        </div>

                                        <div class="form-group d-none" v-if="language.is_default">
                                            <label for="max_deliverable_distance"> {{ __('maximum_delivarable_distance')
                                                }}<span class="text-danger text-xs">*</span>
                                                <small>[Kilometre]</small></label>
                                            <input type="number" class="form-control" name="max_deliverable_distance"
                                                v-model="city.max_deliverable_distance"
                                                placeholder="Enter Delivarable Maximum Distance in km" min="0"
                                                max="999999999">
                                        </div>
                                        </div>

                                        <div class="form-group" v-if="language.is_default">
                                            <label for="delivery_charge_method">{{
                                                __('delivery_charge_methods') }} <span
                                                    class="text-danger text-sm">*</span></label>
                                            <select class="form-control form-select" name="delivery_charge_method"
                                                id="delivery_charge_method" v-model="city.delivery_charge_method"
                                                required>
                                                <option value="">{{ __('select_method') }}</option>
                                                <option value="fixed_charge">{{ __('fixed_delivery_charges') }}</option>
                                                <option value="per_km_charge">{{ __('per_km_delivery_charges') }}
                                                </option>
                                                <option value="range_wise_charges">{{ __('range_wise_delivery_charges')
                                                    }}</option>
                                            </select>
                                        </div>

                                        <div v-if="language.is_default">
                                            <div class="form-group"
                                                v-if="city.delivery_charge_method === 'fixed_charge'">
                                                <label for="fixed_charge"> {{ __('fix_delivery_charges') }}<span
                                                        class="text-danger text-sm">*</span></label>
                                                <input type="number" class="form-control" name="fixed_charge"
                                                    id="fixed_charge" v-model="city.fixed_charge"
                                                    :placeholder="__('fix_delivery_charges')" min="0" max="999999999"
                                                    step="any">
                                            </div>
                                            <div class="form-group"
                                                v-if="city.delivery_charge_method === 'per_km_charge'">
                                                <label for="per_km_charge">{{ __('per_km_delivery_charges') }}<span
                                                        class="text-danger text-sm">*</span> </label>
                                                <input type="number" class="form-control" name="per_km_charge"
                                                    id="per_km_charge" v-model="city.per_km_charge"
                                                    :placeholder="__('per_km_delivery_charges')" min="0" max="999999999"
                                                    step="any">
                                                <input type="text" class="form-control d-none" name="boundary_points"
                                                    id="boundary_points" v-model="city.boundary_points"
                                                    :placeholder="__('boundary_points')">
                                            </div>

                                            <div class="form-group"
                                                v-if="city.delivery_charge_method === 'range_wise_charges'">
                                                <label>{{ __('range_wise_delivery_charges') }}<span
                                                        class="text-danger text-sm">*
                                                    </span> <small class="d-block text-muted">{{ __('set_proper_ranges_for_delivery_charge_do_not_repeat_the_range_value_to_next_range_for_e_g_1_3_4_6') }}</small>
                                                </label>
                                                <div class="row g-2 align-items-center range-row"
                                                    v-for="(range, index) in city.range_wise_charges"
                                                    :key="key = index + 1">
                                                    <div class="col-auto range-index">{{ key }}.</div>
                                                    <div class="col">
                                                        <input type="number" class="form-control" name="from_range[]"
                                                            id="from_range" v-model="range.from_range"
                                                            :placeholder="__('from_range')" min="0" max="999999999">
                                                    </div>
                                                    <div class="col-auto range-to">{{ __('to') }}</div>
                                                    <div class="col">
                                                        <input type="number" class="form-control" name="to_range[]"
                                                            id="to_range" v-model="range.to_range"
                                                            :placeholder="__('to_range')" min="0" max="999999999">
                                                    </div>
                                                    <div class="col">
                                                        <input type="number" class="form-control" name="price[]"
                                                            id="price" v-model="range.price" :placeholder="__('price')" min="0"
                                                            max="999999999" step="any">
                                                    </div>

                                                    <div class="col-auto" v-if="index === 0">
                                                        <a v-b-tooltip.hover :title="__('add_row')" class="figma-action-btn range-btn"
                                                            role="button" @click="addRow">
                                                            <i class="fa fa-plus"></i>
                                                        </a>
                                                    </div>

                                                    <div class="col-auto" v-if="index !== 0">
                                                        <a v-b-tooltip.hover :title="__('remove_row')" class="figma-action-btn figma-delete-btn range-btn"
                                                            role="button" @click="remove(index)">
                                                            <i class="fa fa-times"></i>
                                                        </a>
                                                    </div>

                                                </div>

                                            </div>
                                        </div>
                                    </b-tab></b-tabs>
                                <div class="form-actions d-flex justify-content-end gap-2">
                                    <button type="reset" class="btn btn-outline-secondary">{{ __('clear') }}</button>
                                    <button type="submit" class="btn btn-primary"> {{ __('save') }}</button>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
                <div class="col-12 col-xl-6 mb-3">
                    <div class="card h-100 mb-0">
                        <div class="card-header">
                            <h4 class="card-title mb-0 float-none">{{ __('map_view') }}</h4>
                            <p class="text-muted small mb-0 mt-1">{{ tr('city_map_view_desc', 'Draw the delivery boundary of the city on the map.') }}</p>
                        </div>
                        <div class="card-body">
                            <div class="d-flex flex-wrap gap-2 mb-3" v-if="mapProvider === 'google'">
                                <button type="button" id="remove-line" class="btn btn-sm btn-outline-primary">{{ __('remove_newly_added_line') }}</button>
                                <button type="button" id="clear-line" class="btn btn-sm btn-outline-danger">{{ __('clear_map') }}</button>
                                <button type="button" id="add-line" class="btn btn-sm btn-outline-success">{{ __('restore_old_map') }}</button>
                            </div>
                            <div id="map" class="city-map city-map--google" v-if="mapProvider === 'google'">
                                <GmapMap :zoom="13" :center="center" :mapTypeControl=true :drawingControl=true
                                    class="city-gmap" ref="mapRef">
                                    <GmapMarker :key="index" v-for="(m, index) in markers"
                                        :position="google && m.position" @click="center = m.position" :clickable="true"
                                        :draggable="true" />
                                    <gmap-info-window :options="{
                                        maxWidth: 300,
                                        pixelOffset: { width: 0, height: -35 }
                                    }" :position="infoWindow.position" :opened="infoWindow.open"
                                        @closeclick="infoWindow.open = false">
                                        <div v-html="infoWindow.template"></div>
                                    </gmap-info-window>
                                </GmapMap>
                            </div>
                            <div id="osm_map" class="city-map" v-else>
                                <osm-map-picker ref="osmCityMap" :lat="city.latitude" :lng="city.longitude" height="700px"
                                    :show-search-box="false" :click-to-place="false" :draggable-marker="false"
                                    :enable-drawing="true"
                                    @location-selected="onOsmLocationSelected"
                                    @suggestions-updated="osmCitySuggestions = $event"
                                    @boundary-changed="onOsmBoundaryChanged">
                                </osm-map-picker>
                            </div>
                            <div v-if="city.formatted_address" class="city-address mt-3">
                                <i class="fa fa-map-marker"></i>
                                <span class="title">{{ city.formatted_address }}</span>
                            </div>
                            <div class="form-group d-none">
                                <label for="vertices" class="control-label">{{ __('boundry_points') }}<span
                                        class='text-danger text-xs'>*</span>
                                </label>
                                <textarea name="vertices" id="vertices" v-model="vertices" class="form-control"
                                    placeholder="here will be your selected outlines latitude and longitude" cols="10"
                                    rows="2"></textarea>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from "axios";
import { gmapApi } from 'vue2-google-maps';
import TranslationHelper from '../../mixins/TranslationHelper.js';

export default {
    mixins: [TranslationHelper],
    data: function () {
        return {

            center: { lat: 0, lng: 0 },
            currentPlace: null,
            markers: [],
            osmCityQuery: '',
            osmCitySuggestions: [],
            city: {
                id: "",
                latitude: "",
                longitude: "",
                name: "",
                state: "",
                zone: "",
                formatted_address: "",
                time_to_travel: "",
                min_amount_for_free_delivery: "",
                max_deliverable_distance: "",
                delivery_charge_method: "",
                fixed_charge: "",
                per_km_charge: "",
                range_wise_charges: [
                    { from_range: "", to_range: "", price: "" }
                ],
                boundary_points: "",
                geolocation_type: "",
                radius: "",

            },
            boundary_points: "",
            formatted_address: "",
            infoWindow: {
                position: { lat: 0, lng: 0 },
                open: false,
                template: ''
            },
            map: "",
            drawingManager: "",
            vertices: "",
            geolocation_type: "",
            googleMapsLoaded: false,
            languages: [],
            translations: {},
            defaultLanguageId: null,
            activeLanguageTab: 0,
            renderKey: 0,

            // Translate buttons
            translatableFields: ['zone'],
            translateSuccessMessage: '',
            loadingEmpty: false,
            loadingOverwrite: false,
        }
    },
    mounted() {
        let vm = this;
        this.$refs.mapRef.$mapPromise.then((map) => {
            vm.map = map;
            vm.drawingManager = new google.maps.drawing.DrawingManager({
                drawingMode: google.maps.drawing.OverlayType.POLYGON,
                drawingControl: true,
                drawingControlOptions: {
                    position: google.maps.ControlPosition.TOP_CENTER,
                    drawingModes: [google.maps.drawing.OverlayType.POLYGON,
                    google.maps.drawing.OverlayType.CIRCLE,]
                },
                polygonOptions: {
                    editable: true,
                },
                circleOptions: {
                    fillColor: '#666666',
                    fillOpacity: 0.5,
                    strokeWeight: 1,
                    clickable: true,
                    editable: true,
                    draggable: true,
                    zIndex: 1
                }
            });
            vm.drawingManager.setMap(vm.map);
            google.maps.event.addListener(vm.drawingManager, "overlaycomplete", function (event) {
                var newShape = event.overlay;
                newShape.type = event.type;
            });
            google.maps.event.addListener(vm.drawingManager, "overlaycomplete", function (event) {
                if (event.type == "circle") {
                    var circle_points = [];
                    vm.radius = event.overlay.getRadius();
                    var lat = event.overlay.getCenter().lat();
                    var lng = event.overlay.getCenter().lng();
                    circle_points.push({
                        "lat": lat,
                        "lng": lng,
                    });
                    vm.geolocation_type = event.type;
                    vm.vertices = JSON.stringify(circle_points);
                } else {
                    vm.geolocation_type = event.type;
                    vm.vertices = event.overlay.getPath().getArray();
                    vm.overlayClickListener(event.overlay);
                }
            });
            google.maps.event.addListener(this.drawingManager, "overlaycomplete", function (event) {
                vm.overlayRemoveListener(event.overlay, false);
            });
        });
        this.waitForGoogleMaps();
    },
    computed: {
        google() {
            return gmapApi(); // This will return the google object once the API is loaded
        },
        mapProvider() {
            return window.mapProvider === 'osm' ? 'osm' : 'google';
        }
    },
    created: function () {
        this.city.id = this.$route.params.id;
        this.cityRecord = this.$route.params.record;
        this.$apiUrl = '/api';

        this.fetchActiveLanguages()
            .then(() => {
                this.initializeTranslations();

                if (this.city.id) {
                    this.loadCityWithTranslations();
                }


                this.isLoadingData = false;
            });

    },
    methods: {
        tr(key, fallback) {
            const v = this.__(key);
            return v && v !== key ? v : fallback;
        },
        fetchActiveLanguages() {
            return axios.get(this.$apiUrl + '/active_languages')
                .then(response => {
                    this.languages = response.data.data;

                    const defaultLang = this.languages.find(l => l.is_default === 1);
                    if (defaultLang) {
                        this.defaultLanguageId = defaultLang.id;
                    }
                });
        },

        initializeTranslations() {
            const allTranslations = {};
            this.languages.forEach(language => {
                allTranslations[language.id] = {
                    name: '',
                    zone: '',
                };
            });
            this.translations = allTranslations;
        },
        validateDefaultLanguage() {

            // Validate normal city name
            if (!this.city.name || this.city.name.trim() === '') {
                this.showError("Please enter city name");
                this.switchToDefaultLanguageTab();
                return false;
            }

            // Validate default language zone
            const defaultTranslation = this.translations[this.defaultLanguageId];

            if (!defaultTranslation.zone || defaultTranslation.zone.trim() === '') {
                this.showError("Please enter zone name in default language");
                this.switchToDefaultLanguageTab();
                return false;
            }

            // Validate Time to travel 1 (km) - required
            if (this.city.time_to_travel === '' || this.city.time_to_travel === null || this.city.time_to_travel === undefined) {
                this.showError(__('time_to_travel_1km') + ' ' + __('is_required'));
                this.switchToDefaultLanguageTab(true);
                return false;
            }

            // Validate Minimum Amount for Free Delivery - required
            if (this.city.min_amount_for_free_delivery === '' || this.city.min_amount_for_free_delivery === null || this.city.min_amount_for_free_delivery === undefined) {
                this.showError(__('minimum_amount_for_free_delivery') + ' ' + __('is_required'));
                this.switchToDefaultLanguageTab(true);
                return false;
            }

            // Validate Delivery Charge Methods - required
            if (!this.city.delivery_charge_method || this.city.delivery_charge_method.trim() === '') {
                this.showError(__('delivery_charge_methods') + ' ' + __('is_required'));
                this.switchToDefaultLanguageTab(true);
                return false;
            }

            // Validate delivery charge method specific fields
            if (this.city.delivery_charge_method === 'fixed_charge') {
                if (this.city.fixed_charge === '' || this.city.fixed_charge === null || this.city.fixed_charge === undefined) {
                    this.showError(__('fix_delivery_charges') + ' ' + __('is_required'));
                    this.switchToDefaultLanguageTab(true);
                    return false;
                }
            } else if (this.city.delivery_charge_method === 'per_km_charge') {
                if (this.city.per_km_charge === '' || this.city.per_km_charge === null || this.city.per_km_charge === undefined) {
                    this.showError(__('per_km_delivery_charges') + ' ' + __('is_required'));
                    this.switchToDefaultLanguageTab(true);
                    return false;
                }
            } else if (this.city.delivery_charge_method === 'range_wise_charges') {
                const ranges = this.city.range_wise_charges || [];
                const hasValidRange = ranges.some(r => (r.from_range !== '' && r.from_range != null) && (r.to_range !== '' && r.to_range != null) && (r.price !== '' && r.price != null));
                if (!hasValidRange) {
                    this.showError(__('range_wise_delivery_charges') + ' ' + __('is_required'));
                    this.switchToDefaultLanguageTab(true);
                    return false;
                }
            }

            return true;
        },


        addRow() {
            this.city.range_wise_charges.push({ from_range: "", to_range: "", price: "" })
        },
        remove(index) {
            this.city.range_wise_charges.splice(index, 1)
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
                };
                this.markers.push({ position: marker });
                this.center = marker;
                this.city.latitude = this.currentPlace.geometry.location.lat();
                this.city.longitude = this.currentPlace.geometry.location.lng();
                this.city.name = this.currentPlace.name;

                let addressArr = this.currentPlace.formatted_address.split(",");
                this.city.state = addressArr[addressArr.length - 2];

                this.city.formatted_address = this.currentPlace.formatted_address;
                this.infoWindow.position = { lat: this.city.latitude, lng: this.city.longitude }
                this.infoWindow.template = `<b>${this.city.name}</b><br>${this.city.formatted_address}`
                this.infoWindow.open = true;
                this.currentPlace = null;
            }
        },

        onOsmLocationSelected(payload) {
            this.city.latitude = payload.lat;
            this.city.longitude = payload.lng;
            this.city.name = payload.name || this.city.name;

            let addressArr = (payload.formatted_address || '').split(",");
            this.city.state = addressArr[addressArr.length - 2] || this.city.state;

            this.city.formatted_address = payload.formatted_address;
        },
        onOsmCityQueryInput(text) {
            this.osmCityQuery = text;
            if (this.$refs.osmCityMap) {
                this.$refs.osmCityMap.setQueryAndSearch(text);
            }
        },
        selectOsmCitySuggestion(suggestion) {
            this.osmCityQuery = suggestion.placePrediction.text.text;
            this.osmCitySuggestions = [];
            if (this.$refs.osmCityMap) {
                this.$refs.osmCityMap.selectSuggestion(suggestion);
            }
        },
        onOsmBoundaryChanged(payload) {
            this.geolocation_type = payload.geolocation_type || 'polygon';
            this.radius = payload.radius;

            if (payload.geolocation_type === 'circle') {
                this.vertices = JSON.stringify(payload.vertices);
            } else {
                this.vertices = payload.vertices;
            }
        },

        loadCityWithTranslations() {

            return axios.get(this.$apiUrl + '/cities/edit/' + this.city.id)
                .then(response => {

                    const city = response.data.data;

                    if (!city) {
                        this.showError("City not found");
                        return;
                    }

                    // Load base fields
                    Object.keys(this.city).forEach(key => {

                        if (key === 'range_wise_charges') {
                            this.city[key] = city[key] ? JSON.parse(city[key]) : [];
                        }
                        else if (key !== 'zone') {
                            this.city[key] = city[key] || '';
                        }

                    });
                    let updatedTranslations = { ...this.translations };

                    if (city.translations && Array.isArray(city.translations)) {

                        city.translations.forEach(trans => {

                            updatedTranslations[trans.language_id] = {
                                zone: trans.zone || ''
                            };

                        });
                    }

                    // Fallback for default language
                    this.languages.forEach(language => {

                        if (language.is_default) {

                            if (!updatedTranslations[language.id]?.zone) {

                                updatedTranslations[language.id] = {
                                    zone: city.zone || ''
                                };

                            }

                        }

                    });

                    this.translations = updatedTranslations;

                    // Force re-render 
                    this.renderKey++;

                    this.setMap();

                })
                .catch(error => {
                    console.error("Error loading city:", error);
                    this.showError("Failed to load city");
                });
        }
        ,

        validateDefaultLanguageForTranslation() {
            return this.validateDefaultLanguage();
        },
        overlayClickListener(overlay) {
            google.maps.event.addListener(overlay, "mouseup", function (event) {
                this.vertices = overlay.getPath().getArray();
            });
        },
        overlayRemoveListener(overlay, is_restore = false, drawed_map = "", not_remove = false, boundary_points = "") {
            let vm = this;
            if (is_restore == true) {
                document.getElementById("add-line").addEventListener("click", addLine);
            }
            document.getElementById("clear-line").addEventListener("click", clearLine);
            if (not_remove == false) {
                document.getElementById("remove-line").addEventListener("click", removeLine);
            }
            function clearLine() {
                overlay.setMap(null);
                vm.vertices = "";
            }
            function removeLine() {
                overlay.setMap(null);
                vm.vertices = "";
            }
            function addLine() {
                if (drawed_map != "") {
                    overlay.setMap(drawed_map);
                } else {
                    overlay.setMap(map);
                }
                vm.vertices = boundary_points;
            }
        },
        waitForGoogleMaps() {
            const checkGoogleMaps = setInterval(() => {
                if (gmapApi() && gmapApi().maps) {
                    this.googleMapsLoaded = true;
                    clearInterval(checkGoogleMaps);
                    this.setMap();
                }
            }, 100); // Check every 100ms
        },
        setMap() {

            if (!this.city.latitude || !this.city.longitude) {
                return; 
            }

            const lat = parseFloat(this.city.latitude);
            const lng = parseFloat(this.city.longitude);

            if (isNaN(lat) || isNaN(lng)) {
                console.error("Invalid coordinates", this.city.latitude, this.city.longitude);
                return;
            }

            const marker = { lat, lng };

            this.markers = []; // clear old markers
            this.markers.push({ position: marker });

            this.center = marker;

            this.infoWindow.position = marker;
            this.infoWindow.template = `<b>${this.city.name}</b><br>${this.city.formatted_address}`;
            this.infoWindow.open = true;

            if (this.mapProvider === 'osm') {
                if (!this.city.boundary_points || !this.city.id) {
                    return;
                }
                let osmBoundaryPoints = this.city.boundary_points;
                if (typeof osmBoundaryPoints === 'string') {
                    try {
                        osmBoundaryPoints = JSON.parse(osmBoundaryPoints);
                    } catch (e) {
                        return;
                    }
                }
                if (!osmBoundaryPoints || typeof osmBoundaryPoints !== 'object') {
                    return;
                }
                const osmPoints = Array.isArray(osmBoundaryPoints) ? osmBoundaryPoints : [osmBoundaryPoints];
                if (osmPoints.length === 0) return;

                this.geolocation_type = this.city.geolocation_type || 'polygon';
                this.radius = this.city.radius;
                this.vertices = this.city.geolocation_type === 'circle' ? this.city.boundary_points : osmPoints;

                this.$nextTick(() => {
                    if (this.$refs.osmCityMap) {
                        this.$refs.osmCityMap.restoreBoundary({
                            geolocation_type: this.city.geolocation_type || 'polygon',
                            vertices: osmPoints,
                            radius: this.city.radius,
                        });
                    }
                });
                return;
            }

            if (!this.map || !this.city.boundary_points || !this.city.id) {
                return;
            }
            let boundaryPoints = this.city.boundary_points;
            if (typeof boundaryPoints === 'string') {
                try {
                    boundaryPoints = JSON.parse(boundaryPoints);
                } catch (e) {
                    return;
                }
            }
            if (!boundaryPoints || typeof boundaryPoints !== 'object') {
                return;
            }
            const points = Array.isArray(boundaryPoints) ? boundaryPoints : [boundaryPoints];
            if (points.length === 0) return;

            this.geolocation_type = this.city.geolocation_type || 'polygon';
            this.radius = this.city.radius;

            if (this.city.geolocation_type === 'circle') {
                this.vertices = this.city.boundary_points;
                const cityCircle = new google.maps.Circle({
                    strokeColor: '#FF0000',
                    strokeOpacity: 0.8,
                    strokeWeight: 2,
                    fillColor: '#FF0000',
                    fillOpacity: 0.35,
                    map: this.map,
                    center: points[0],
                    radius: this.city.radius ? Math.sqrt(parseFloat(this.city.radius)) * 100 : 1000,
                });
                this.overlayRemoveListener(cityCircle, true, this.map, true, this.city.boundary_points);
            } else {
                this.vertices = points;
                const polygon = new google.maps.Polygon({
                    paths: points,
                    strokeColor: '#FF0000',
                    strokeOpacity: 0.8,
                    strokeWeight: 2,
                    fillColor: '#FF0000',
                    fillOpacity: 0.35,
                    editable: true,
                    geodesic: true,
                });
                polygon.setMap(this.map);
                this.overlayRemoveListener(polygon, true, this.map, true, points);
            }
        },

        switchToDefaultLanguageTab(skipError = false) {
            const defaultLangIndex = this.languages.findIndex(language => language.id === this.defaultLanguageId);
            if (defaultLangIndex !== -1) {
                if (!skipError) {
                    this.showError(__('please_fill_default_language_required_fields'));
                }
                this.activeLanguageTab = defaultLangIndex;
            }
        },

        async saveRecord() {

            if (!this.validateDefaultLanguage()) return;

            if (!this.vertices) {
                this.showError("Draw Deliverable area on Map");
                return;
            }

            this.isLoading = true;

            let cityId = this.city.id;

            const languagesToSave = [];

            const defaultLang = this.languages.find(l => l.is_default);
            if (defaultLang) {
                languagesToSave.push(defaultLang);
            }

            this.languages.forEach(language => {
                if (language.is_default) return;

                const trans = this.translations[language.id];
                if (trans.zone && trans.zone.trim() !== '') {
                    languagesToSave.push(language);
                }
            });

            try {

                for (let language of languagesToSave) {

                    let formData = new FormData();

                    // Always send ID only if valid
                    if (cityId && cityId !== "") {
                        formData.append("id", cityId);
                    }

                    // ALWAYS send base fields for default language
                    if (language.is_default) {

                        for (let key in this.city) {

                            if (key === 'range_wise_charges') {
                                formData.append(key, JSON.stringify(this.city[key]));
                            } else {
                                formData.append(key, this.city[key] ?? '');
                            }

                        }

                        formData.append("geolocation_type", this.geolocation_type);
                        formData.append("radius", this.radius);

                        if (this.geolocation_type === 'circle') {
                            formData.append("boundary_points", this.vertices);
                        } else {
                            formData.append("boundary_points", JSON.stringify(this.vertices));
                        }
                    }

                    // Always send translation fields
                    formData.append("language_id", language.id);
                    formData.append("zone", this.translations[language.id].zone || '');

                    const response = await axios.post(this.$apiUrl + '/cities/save', formData);

                    if (!cityId && response.data.data?.id) {
                        cityId = response.data.data.id;
                    }
                }

                this.showMessage("success", __('city_saved_successfully'));

                setTimeout(() => {
                    this.$router.push({ path: '/cities' });
                }, 1500);

            } catch (error) {

                if (error.response?.data?.message) {
                    this.showError(error.response.data.message);
                } else {
                    this.showError("Something went wrong!");
                }

            } finally {
                this.isLoading = false;
            }
        }

    }
};
</script>

<style scoped>
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
    border-radius: 0 0 var(--ui-radius) var(--ui-radius);
    box-shadow: var(--ui-shadow-lg);
}

.osm-suggestion-item {
    cursor: pointer;
}

.city-map--google {
    position: relative;
    overflow: hidden;
}

.city-gmap {
    width: 100%;
    height: 700px;
    margin-top: 5px;
}

.osm-suggestions .list-group-item {
    font-size: 13px;
    color: var(--ui-text);
    background: var(--ui-surface);
    border-color: var(--ui-border);
}

.form-actions {
    margin-top: 8px;
    padding-top: 16px;
    border-top: 1px solid var(--ui-border);
}

.range-row {
    margin-bottom: 10px;
}

.range-row .col {
    min-width: 0;
}

.range-index,
.range-to {
    font-size: 13px;
    color: var(--ui-text-muted);
}

.range-btn {
    width: 32px;
    height: 32px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}

.city-map {
    border: 1px solid var(--ui-border);
    border-radius: var(--ui-radius);
}

.city-address {
    display: flex;
    align-items: flex-start;
    gap: 8px;
    padding: 10px 12px;
    font-size: 13px;
    font-weight: 600;
    color: var(--ui-heading);
    background: var(--ui-surface-muted);
    border-radius: var(--ui-radius);
}

.city-address i {
    color: var(--theme-primary-600);
    margin-top: 2px;
}

@media (max-width: 767.98px) {
    /* shorter map on phones */
    .city-gmap,
    #map ::v-deep .vue-map-container {
        height: 420px;
    }
}
</style>
