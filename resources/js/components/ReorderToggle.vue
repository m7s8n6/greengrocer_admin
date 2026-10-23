<template>
    <button type="button" class="reorder-toggle" :class="{ 'is-on': value }" role="switch" :aria-checked="value ? 'true' : 'false'"
        :disabled="disabled" :title="value ? (onHint || __('drag_to_reorder') || 'Drag to reorder') : ''"
        @click="toggle">
        <i class="reorder-toggle__icon" :class="icon"></i>
        <span class="reorder-toggle__label">{{ label || __('enable_drag_and_drop') || 'Re-order' }}</span>
        <span class="reorder-toggle__switch" aria-hidden="true"><span class="reorder-toggle__knob"></span></span>
    </button>
</template>

<script>
/**
 * Shared "drag & drop to reorder" toggle for list toolbars.
 *   <reorder-toggle v-model="enableDragDrop"></reorder-toggle>
 *   <reorder-toggle v-model="editable" :label="__('enable_drag_and_drop')" icon="bi bi-sort-down"></reorder-toggle>
 */
export default {
    name: 'ReorderToggle',
    props: {
        value: { type: Boolean, default: false },
        label: { type: String, default: '' },
        onHint: { type: String, default: '' },
        icon: { type: String, default: 'bi bi-arrows-move' },
        disabled: { type: Boolean, default: false },
    },
    methods: {
        toggle() {
            this.$emit('input', !this.value);
            this.$emit('change', !this.value);
        },
    },
};
</script>
