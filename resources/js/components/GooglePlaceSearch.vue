<template>
    <div class="position-relative google-place-search" style="flex: 1 1 auto; min-width: 0;">
        <input type="search" class="form-control" :id="inputId" :placeholder="placeholder" v-model="query"
            @input="onInput" @focus="showSuggestions = suggestions.length > 0" @blur="hideSoon" autocomplete="off">
        <ul v-if="showSuggestions && suggestions.length" class="list-group google-place-suggestions">
            <li v-for="s in suggestions" :key="s.placePrediction.placeId"
                class="list-group-item list-group-item-action" style="cursor:pointer"
                @mousedown.prevent="select(s)">
                {{ s.placePrediction.text.text }}
            </li>
        </ul>
    </div>
</template>

<script>
import axios from 'axios';

/**
 * Address search for the admin/seller map pages when the Map Provider is Google.
 *
 * Replaces vue2-google-maps' <GmapAutocomplete>, which uses the browser-side
 * google.maps.places.Autocomplete widget - Google no longer offers that to new customers. This
 * one asks the server instead (the same /map/places_autocomplete and /map/places_details calls the
 * OSM search uses; the server talks to Google's Places API (New)).
 *
 * It emits `place_changed` with an object shaped like a Google Place result (name,
 * formatted_address, address_components, geometry.location.lat()/lng()), so the existing
 * setPlace / setPickupPlace handlers on the pages work unchanged.
 */
export default {
    name: 'GooglePlaceSearch',
    props: {
        placeholder: { type: String, default: '' },
        inputId: { type: String, default: null },
    },
    data() {
        return {
            query: '',
            suggestions: [],
            showSuggestions: false,
            timer: null,
            sessionToken: this.newToken(),
        };
    },
    beforeDestroy() {
        if (this.timer) clearTimeout(this.timer);
    },
    methods: {
        newToken() {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
                const r = Math.random() * 16 | 0;
                return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
            });
        },
        onInput() {
            if (this.timer) clearTimeout(this.timer);
            if (this.query.trim().length < 2) {
                this.suggestions = [];
                this.showSuggestions = false;
                return;
            }
            this.timer = setTimeout(this.fetchSuggestions, 350);
        },
        fetchSuggestions() {
            axios.post(this.$apiUrl + '/map/places_autocomplete', {
                input: this.query,
                language: 'en',
                sessiontoken: this.sessionToken,
                source: 'web',
            }).then((response) => {
                const data = response.data && response.data.data ? response.data.data : null;
                this.suggestions = (data && data.suggestions) || [];
                this.showSuggestions = this.suggestions.length > 0;
            }).catch(() => {
                this.suggestions = [];
                this.showSuggestions = false;
            });
        },
        select(suggestion) {
            const prediction = suggestion.placePrediction;
            this.query = prediction.text.text;
            this.showSuggestions = false;

            axios.post(this.$apiUrl + '/map/places_details', {
                place_id: prediction.placeId,
                language: 'en',
                sessiontoken: this.sessionToken,
                source: 'web',
            }).then((response) => {
                const d = response.data && response.data.data ? response.data.data : null;
                if (!d || !d.location) {
                    return;
                }
                const lat = Number(d.location.latitude);
                const lng = Number(d.location.longitude);
                this.$emit('place_changed', {
                    name: (d.displayName && d.displayName.text) || (prediction.structuredFormat && prediction.structuredFormat.mainText.text) || '',
                    formatted_address: d.formattedAddress || prediction.text.text,
                    address_components: (d.addressComponents || []).map((c) => ({
                        long_name: c.longText,
                        short_name: c.shortText,
                        types: c.types || [],
                    })),
                    geometry: { location: { lat: () => lat, lng: () => lng } },
                    place_id: d.id,
                    types: d.types || [],
                });
                // A finished search ends the billing session - the next search starts a new one.
                this.sessionToken = this.newToken();
            }).catch(() => { });
        },
        hideSoon() {
            setTimeout(() => { this.showSuggestions = false; }, 150);
        },
    },
};
</script>

<style scoped>
.google-place-suggestions {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    z-index: 1000;
    max-height: 220px;
    overflow-y: auto;
    background: #fff;
}
</style>
