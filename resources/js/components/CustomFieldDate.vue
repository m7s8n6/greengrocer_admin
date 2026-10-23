<template>
    <date-range-picker :single-date-picker="true" :auto-apply="true" :show-dropdowns="true" :append-to-body="true"
        :ranges="false" :locale-data="localeData" v-model="range" @update="onUpdate" class="w-100 custom-field-date">
        <template #input>
            <span class="d-flex justify-content-between align-items-center w-100" style="cursor:pointer">
                <span :class="{ 'text-muted': !value }">{{ display || placeholder }}</span>
                <i class="fa fa-calendar text-muted"></i>
            </span>
        </template>
    </date-range-picker>
</template>

<script>
import axios from 'axios';
import moment from 'moment';
import DateRangePicker from 'vue2-daterange-picker';
import 'vue2-daterange-picker/dist/vue2-daterange-picker.css';

// The store's date format (Store Settings) is fetched once and shared by every instance.
let formatPromise = null;
const loadFormat = (apiUrl) => {
    if (!formatPromise) {
        formatPromise = axios.get(apiUrl + '/custom_fields/date_format')
            .then(res => res.data.data || 'd-m-Y')
            .catch(() => 'd-m-Y');
    }
    return formatPromise;
};

// PHP date() tokens -> moment tokens
const toMomentFormat = (php) => php.replace(/d|m|M|Y/g, t => ({ d: 'DD', m: 'MM', M: 'MMM', Y: 'YYYY' }[t]));

export default {
    components: { DateRangePicker },
    // value is stored as YYYY-MM-DD; only the display follows the store format
    props: { value: { default: '' }, placeholder: { type: String, default: '' } },
    data() {
        return { format: 'DD-MM-YYYY' };
    },
    computed: {
        range: {
            get() {
                const d = this.value ? moment(this.value, 'YYYY-MM-DD').toDate() : null;
                return { startDate: d, endDate: d };
            },
            set() { },
        },
        display() {
            return this.value ? moment(this.value, 'YYYY-MM-DD').format(this.format) : '';
        },
        localeData() {
            return { applyLabel: __('apply'), cancelLabel: __('cancel') };
        },
    },
    created() {
        loadFormat(this.$apiUrl).then(f => { this.format = toMomentFormat(f); });
    },
    methods: {
        onUpdate(val) {
            this.$emit('input', val && val.startDate ? moment(val.startDate).format('YYYY-MM-DD') : '');
        },
    },
};
</script>
