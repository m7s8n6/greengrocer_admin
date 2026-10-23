<template>
    <div class="osm-map-picker">
        <div class="osm-draw-toolbar mb-2" v-if="enableDrawing">
            <template v-if="!drawingActive">
                <button type="button" class="btn btn-sm btn-success mr-1" @click="startDrawPolygon">{{ __('draw_polygon') }}</button>
                <button type="button" class="btn btn-sm btn-secondary mr-1" @click="startDrawCircle">{{ __('draw_circle') }}</button>
                <button type="button" class="btn btn-sm btn-danger" v-if="boundaryType" @click="clearBoundary">{{ __('clear_boundary') }}</button>
            </template>
            <template v-else>
                <button type="button" class="btn btn-sm btn-primary mr-1" @click="finishDrawing">{{ __('finish') }}</button>
                <button type="button" class="btn btn-sm btn-secondary mr-1" v-if="boundaryType !== 'circle'" @click="deleteLastPoint">{{ __('delete_last_point') }}</button>
                <button type="button" class="btn btn-sm btn-outline-secondary" @click="cancelDrawing">{{ __('cancel') }}</button>
            </template>
        </div>
        <div class="input-group position-relative" v-if="showSearchBox">
            <input type="search" class="form-control" :placeholder="placeholder" :value="query"
                @input="onQueryInput($event.target.value)" @focus="showSuggestions = suggestions.length > 0" autocomplete="off" />
            <slot name="append"></slot>
            <ul v-if="showSuggestions && suggestions.length" class="list-group osm-suggestions">
                <li v-for="s in suggestions" :key="s.placePrediction.placeId" class="list-group-item list-group-item-action"
                    style="cursor:pointer" @mousedown.prevent="selectSuggestion(s)">
                    {{ s.placePrediction.text.text }}
                </li>
            </ul>
        </div>
        <div :style="{ width: '100%', height: height, marginTop: '5px' }" ref="mapEl"></div>
        <div class="text-muted font-size-13 mt-1" v-if="enableDrawing">
            <template v-if="!boundaryType">{{ __('no_polygon_drawn_yet') }}</template>
        </div>
    </div>
</template>

<script>
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw';
import 'leaflet-draw/dist/leaflet.draw.css';
import axios from 'axios';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

export default {
    name: 'OsmMapPicker',
    props: {
        lat: { type: [Number, String], default: 23.0225 },
        lng: { type: [Number, String], default: 72.5714 },
        zoom: { type: Number, default: 13 },
        height: { type: String, default: '400px' },
        placeholder: { type: String, default: 'Search location on map' },
        draggableMarker: { type: Boolean, default: true },
        clickToPlace: { type: Boolean, default: true },
        showSearchBox: { type: Boolean, default: true },
        enableDrawing: { type: Boolean, default: false },
    },
    data() {
        return {
            map: null,
            marker: null,
            query: '',
            suggestions: [],
            showSuggestions: false,
            debounceTimer: null,
            drawnItems: null,
            activeDrawer: null,
            drawingActive: false,
            boundaryType: null,
            boundaryVertices: [],
            boundaryRadius: null,
        };
    },
    watch: {
        lat() {
            this.syncMarkerToProps();
        },
        lng() {
            this.syncMarkerToProps();
        },
    },
    mounted() {
        this.initMap();
    },
    beforeDestroy() {
        if (this.map) {
            this.map.remove();
        }
    },
    methods: {
        syncMarkerToProps() {
            const lat = parseFloat(this.lat);
            const lng = parseFloat(this.lng);
            if (!this.map || !this.marker || isNaN(lat) || isNaN(lng)) return;
            const cur = this.marker.getLatLng();
            if (cur.lat === lat && cur.lng === lng) return;
            this.setMarker(lat, lng);
        },
        initMap() {
            const startLat = parseFloat(this.lat) || 23.0225;
            const startLng = parseFloat(this.lng) || 72.5714;

            this.map = L.map(this.$refs.mapEl).setView([startLat, startLng], this.zoom);

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; OpenStreetMap contributors',
                maxZoom: 19,
            }).addTo(this.map);

            this.marker = L.marker([startLat, startLng], { draggable: this.draggableMarker }).addTo(this.map);

            if (this.draggableMarker) {
                this.marker.on('dragend', () => {
                    const pos = this.marker.getLatLng();
                    this.reverseGeocode(pos.lat, pos.lng);
                });
            }

            if (this.clickToPlace) {
                this.map.on('click', (e) => {
                    this.setMarker(e.latlng.lat, e.latlng.lng);
                    this.reverseGeocode(e.latlng.lat, e.latlng.lng);
                });
            }

            if (this.enableDrawing) {
                this.drawnItems = new L.FeatureGroup();
                this.map.addLayer(this.drawnItems);
                this.map.on(L.Draw.Event.CREATED, (e) => this.onShapeCreated(e));
            }

            setTimeout(() => {
                if (this.map) {
                    this.map.invalidateSize();
                }
            }, 300);
        },
        startDrawPolygon() {
            this.clearBoundary();
            this.activeDrawer = new L.Draw.Polygon(this.map, { allowIntersection: false, showArea: false });
            this.activeDrawer.enable();
            this.drawingActive = true;
            this.boundaryType = 'polygon';
        },
        startDrawCircle() {
            this.clearBoundary();
            this.activeDrawer = new L.Draw.Circle(this.map);
            this.activeDrawer.enable();
            this.drawingActive = true;
            this.boundaryType = 'circle';
        },
        finishDrawing() {
            if (this.activeDrawer && typeof this.activeDrawer.completeShape === 'function') {
                this.activeDrawer.completeShape();
            }
        },
        deleteLastPoint() {
            if (this.activeDrawer && typeof this.activeDrawer.deleteLastVertex === 'function') {
                this.activeDrawer.deleteLastVertex();
            }
        },
        cancelDrawing() {
            if (this.activeDrawer) {
                this.activeDrawer.disable();
            }
            this.activeDrawer = null;
            this.drawingActive = false;
            this.boundaryType = this.boundaryVertices.length ? this.boundaryType : null;
        },
        onShapeCreated(e) {
            this.drawnItems.clearLayers();
            this.drawnItems.addLayer(e.layer);
            this.drawingActive = false;
            this.activeDrawer = null;

            if (e.layerType === 'circle') {
                const center = e.layer.getLatLng();
                this.boundaryType = 'circle';
                this.boundaryVertices = [{ lat: center.lat, lng: center.lng }];
                this.boundaryRadius = e.layer.getRadius();
            } else {
                this.boundaryType = 'polygon';
                const latlngs = e.layer.getLatLngs()[0];
                this.boundaryVertices = latlngs.map((p) => ({ lat: p.lat, lng: p.lng }));
                this.boundaryRadius = null;
            }
            this.emitBoundaryChanged();
        },
        clearBoundary() {
            if (this.drawnItems) {
                this.drawnItems.clearLayers();
            }
            this.boundaryType = null;
            this.boundaryVertices = [];
            this.boundaryRadius = null;
            this.emitBoundaryChanged();
        },
        emitBoundaryChanged() {
            this.$emit('boundary-changed', {
                geolocation_type: this.boundaryType,
                vertices: this.boundaryVertices,
                radius: this.boundaryRadius,
            });
        },
        restoreBoundary(payload) {
            if (!this.drawnItems || !payload) return;
            this.drawnItems.clearLayers();

            const vertices = payload.vertices;
            if (!vertices || !vertices.length) return;

            if (payload.geolocation_type === 'circle') {
                const c = vertices[0];
                const radius = payload.radius ? Math.sqrt(parseFloat(payload.radius)) * 100 : 1000;
                const layer = L.circle([parseFloat(c.lat), parseFloat(c.lng)], {
                    radius,
                    color: '#FF0000',
                    fillColor: '#FF0000',
                    fillOpacity: 0.35,
                });
                this.drawnItems.addLayer(layer);
                this.map.fitBounds(layer.getBounds());
                this.boundaryType = 'circle';
                this.boundaryVertices = [{ lat: parseFloat(c.lat), lng: parseFloat(c.lng) }];
                this.boundaryRadius = payload.radius;
            } else {
                const latlngs = vertices.map((p) => [parseFloat(p.lat), parseFloat(p.lng)]);
                const layer = L.polygon(latlngs, { color: '#FF0000', fillColor: '#FF0000', fillOpacity: 0.35 });
                this.drawnItems.addLayer(layer);
                this.map.fitBounds(layer.getBounds());
                this.boundaryType = 'polygon';
                this.boundaryVertices = vertices;
                this.boundaryRadius = null;
            }
        },
        setMarker(lat, lng, panTo = true) {
            if (!this.marker) return;
            this.marker.setLatLng([lat, lng]);
            if (panTo) {
                this.map.setView([lat, lng], this.map.getZoom());
            }
        },
        onQueryInput(text) {
            this.setQueryAndSearch(text);
        },
        setQueryAndSearch(text) {
            this.query = text;
            clearTimeout(this.debounceTimer);
            if (!text || text.length < 3) {
                this.suggestions = [];
                this.showSuggestions = false;
                this.$emit('suggestions-updated', []);
                return;
            }
            this.debounceTimer = setTimeout(() => {
                this.fetchSuggestions();
            }, 400);
        },
        fetchSuggestions() {
            axios.post(this.$apiUrl + '/map/places_autocomplete', {
                input: this.query,
                language: 'en',
                source: 'web',
            }).then((response) => {
                const data = response.data && response.data.data ? response.data.data : response.data;
                this.suggestions = (data && data.suggestions) || [];
                this.showSuggestions = this.suggestions.length > 0;
                this.$emit('suggestions-updated', this.suggestions);
            }).catch(() => {
                this.suggestions = [];
                this.showSuggestions = false;
                this.$emit('suggestions-updated', []);
            });
        },
        selectSuggestion(suggestion) {
            this.showSuggestions = false;
            this.query = suggestion.placePrediction.text.text;

            const osmExtra = suggestion.placePrediction._osm;
            if (osmExtra && osmExtra.lat && osmExtra.lon) {
                this.applyPlace({
                    lat: parseFloat(osmExtra.lat),
                    lng: parseFloat(osmExtra.lon),
                    formatted_address: osmExtra.display_name || suggestion.placePrediction.text.text,
                    name: osmExtra.name || suggestion.placePrediction.text.text,
                    address_components: [],
                });
                return;
            }

            axios.post(this.$apiUrl + '/map/places_details', {
                place_id: suggestion.placePrediction.placeId,
                language: 'en',
                source: 'web',
            }).then((response) => {
                const data = response.data && response.data.data ? response.data.data : response.data;
                if (!data || !data.location) return;
                this.applyPlace({
                    lat: data.location.latitude,
                    lng: data.location.longitude,
                    formatted_address: data.formattedAddress || data.displayName || '',
                    name: data.displayName || '',
                    address_components: data.addressComponents || [],
                });
            });
        },
        reverseGeocode(lat, lng) {
            axios.post(this.$apiUrl + '/map/geocode', {
                latitude: lat,
                longitude: lng,
                source: 'web',
            }).then((response) => {
                const data = response.data && response.data.data ? response.data.data : response.data;
                const result = data && data.results && data.results[0];
                this.$emit('location-selected', {
                    lat: lat,
                    lng: lng,
                    formatted_address: result ? result.formatted_address : '',
                    name: result ? result.formatted_address : '',
                    address_components: result ? result.address_components : [],
                });
            }).catch(() => {
                this.$emit('location-selected', {
                    lat: lat,
                    lng: lng,
                    formatted_address: '',
                    name: '',
                    address_components: [],
                });
            });
        },
        applyPlace(payload) {
            this.setMarker(payload.lat, payload.lng);
            this.$emit('location-selected', payload);
        },
        setView(lat, lng) {
            this.setMarker(lat, lng);
        },
    },
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
    background: #fff;
}
</style>
