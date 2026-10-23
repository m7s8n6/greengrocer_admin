<template>
    <div class="card border mb-4 rider-live-map-card"
        style="width: 100%; border-radius: 16px; border: 1px solid var(--ui-border) !important; overflow: hidden; padding: 0;">
        <div style="padding: 16px; border-bottom: 1px solid var(--ui-border); display: flex; align-items: center; justify-content: space-between; gap: 12px; flex-wrap: wrap;">
            <span style="font-family: var(--ui-font); font-weight: 600; font-size: 16px; line-height: 24px;">
                <i class="bi bi-geo-alt me-2"></i>{{ __('live_tracking') || 'Live Tracking' }}
            </span>
            <span class="text-muted small" v-if="summary">{{ summary }}</span>
        </div>
        <div style="position: relative;">
            <div ref="mapEl" style="width: 100%; height: 360px;"></div>
            <div v-if="message" class="rider-live-map-message">{{ message }}</div>
        </div>
    </div>
</template>

<script>
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';

/**
 * Live map for the delivery boy's order page: rider position, delivery address and the road
 * route between them, refreshed every few seconds from GET delivery_boy/live_tracking_route
 * (the same reply the customer app reads from customer/live_tracking_route).
 *
 * The map picture follows the Map Provider setting: Google Maps when it is Google (the script is
 * already loaded app-wide by vue2-google-maps), OpenStreetMap when it is OSM - so with Google
 * selected, no OpenStreetMap service is used here.
 */
export default {
    name: 'RiderLiveMap',
    props: {
        orderId: { type: [Number, String], required: true },
        refreshSeconds: { type: Number, default: 10 },
    },
    data() {
        return {
            useGoogle: window.mapProvider !== 'osm',
            map: null,
            riderMarker: null,
            destMarker: null,
            routeLine: null,
            timer: null,
            fitted: false,
            summary: '',
            message: '',
        };
    },
    mounted() {
        this.start();
    },
    beforeDestroy() {
        if (this.timer) clearInterval(this.timer);
        if (this.useGoogle) {
            [this.riderMarker, this.destMarker, this.routeLine].forEach((o) => o && o.setMap && o.setMap(null));
        } else if (this.map) {
            this.map.remove();
        }
        this.map = null;
    },
    methods: {
        start() {
            if (this.useGoogle && typeof this.$gmapApiPromiseLazy === 'function') {
                this.$gmapApiPromiseLazy().then(() => {
                    this.initGoogleMap();
                    this.beginPolling();
                }).catch(() => {
                    // Google script could not load (key / network) - fall back to OpenStreetMap.
                    this.useGoogle = false;
                    this.initOsmMap();
                    this.beginPolling();
                });
            } else {
                this.useGoogle = false;
                this.initOsmMap();
                this.beginPolling();
            }
        },
        beginPolling() {
            this.loadRoute();
            this.timer = setInterval(this.loadRoute, this.refreshSeconds * 1000);
        },

        // ---------- map setup ----------
        initGoogleMap() {
            this.map = new window.google.maps.Map(this.$refs.mapEl, {
                center: { lat: 23.0225, lng: 72.5714 },
                zoom: 13,
                mapTypeControl: false,
                streetViewControl: false,
                fullscreenControl: false,
            });
        },
        initOsmMap() {
            this.map = L.map(this.$refs.mapEl).setView([23.0225, 72.5714], 13);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '&copy; OpenStreetMap contributors',
            }).addTo(this.map);
        },
        emojiIcon(emoji) {
            return L.divIcon({
                html: '<div style="font-size:28px;line-height:28px;">' + emoji + '</div>',
                className: 'rider-live-map-icon',
                iconSize: [28, 28],
                iconAnchor: [14, 14],
            });
        },

        // ---------- data ----------
        loadRoute() {
            axios.get(this.$deliveryBoyApiUrl + '/live_tracking_route', { params: { order_id: this.orderId } })
                .then((response) => {
                    const res = response.data;
                    if (res.status !== 1 || !res.data) {
                        this.message = res.message || (this.__('live_tracking_not_available') || 'Live location is not available yet.');
                        return;
                    }
                    this.message = '';
                    this.draw(res.data);
                })
                .catch(() => {
                    this.message = this.__('live_tracking_not_available') || 'Live location is not available yet.';
                });
        },
        draw(data) {
            if (!this.map) return;
            const rider = [Number(data.driver.latitude), Number(data.driver.longitude)];
            const dest = [Number(data.destination.latitude), Number(data.destination.longitude)];
            const coords = (data.route && data.route.coordinates) ? data.route.coordinates : [rider, dest];

            if (this.useGoogle) {
                this.drawGoogle(rider, dest, coords);
            } else {
                this.drawOsm(rider, dest, coords);
            }

            const route = data.route || {};
            const parts = [];
            if (route.distance) parts.push((route.distance / 1000).toFixed(1) + ' km');
            if (route.duration) parts.push(Math.max(1, Math.round(route.duration / 60)) + ' min');
            this.summary = parts.join(' · ');
        },
        drawGoogle(rider, dest, coords) {
            const gm = window.google.maps;
            const riderPos = { lat: rider[0], lng: rider[1] };
            const destPos = { lat: dest[0], lng: dest[1] };
            const path = coords.map((c) => ({ lat: Number(c[0]), lng: Number(c[1]) }));
            // An invisible circle icon + an emoji label gives an emoji marker without extra image files.
            const hiddenIcon = { path: gm.SymbolPath.CIRCLE, scale: 0 };

            if (this.riderMarker) {
                this.riderMarker.setPosition(riderPos);
            } else {
                this.riderMarker = new gm.Marker({ position: riderPos, map: this.map, icon: hiddenIcon, label: { text: '🛵', fontSize: '26px' } });
            }
            if (this.destMarker) {
                this.destMarker.setPosition(destPos);
            } else {
                this.destMarker = new gm.Marker({ position: destPos, map: this.map, icon: hiddenIcon, label: { text: '📍', fontSize: '26px' } });
            }
            if (this.routeLine) {
                this.routeLine.setPath(path);
            } else {
                this.routeLine = new gm.Polyline({ path, map: this.map, strokeColor: this.$themeColor('primary-500'), strokeOpacity: 0.9, strokeWeight: 5 });
            }

            // Fit the view once, so the rider can still pan and zoom without it snapping back.
            if (!this.fitted) {
                const bounds = new gm.LatLngBounds();
                bounds.extend(riderPos);
                bounds.extend(destPos);
                this.map.fitBounds(bounds, 60);
                this.fitted = true;
            }
        },
        drawOsm(rider, dest, coords) {
            if (this.riderMarker) {
                this.riderMarker.setLatLng(rider);
            } else {
                this.riderMarker = L.marker(rider, { icon: this.emojiIcon('🛵') }).addTo(this.map);
            }
            if (this.destMarker) {
                this.destMarker.setLatLng(dest);
            } else {
                this.destMarker = L.marker(dest, { icon: this.emojiIcon('📍') }).addTo(this.map);
            }
            if (this.routeLine) {
                this.routeLine.setLatLngs(coords);
            } else {
                this.routeLine = L.polyline(coords, { color: this.$themeColor('primary-500'), weight: 5, opacity: 0.9 }).addTo(this.map);
            }
            if (!this.fitted) {
                this.map.fitBounds(L.latLngBounds([rider, dest]).pad(0.3));
                this.fitted = true;
            }
        },
    },
};
</script>

<style scoped>
.rider-live-map-message {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 500;
    padding: 8px 14px;
    border-radius: 8px;
    font-size: 14px;
    background: rgba(0, 0, 0, 0.65);
    color: #fff;
    text-align: center;
}
</style>
<style>
.rider-live-map-icon {
    background: transparent;
    border: none;
}
</style>
