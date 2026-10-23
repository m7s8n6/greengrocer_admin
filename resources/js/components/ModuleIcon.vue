<template>
    <span class="module-icon-mask" :class="{ 'module-icon-mask--tile': tile }"
        :style="{ '--mi-size': size + 'px', '--mi-url': src ? 'url(&quot;' + src + '&quot;)' : 'none' }"
        role="img" :aria-label="alt"></span>
</template>

<script>
/**
 * Module icon in the theme colour: the uploaded icon (SVG/PNG) is used as a mask, so its shape
 * is filled with the current text colour (primary by default) instead of its own colours.
 *   <module-icon :src="mod.image_url" :size="22"></module-icon>
 *   <module-icon :src="row.image_url" :size="20" tile></module-icon>   (tinted square behind it)
 */
export default {
    name: 'ModuleIcon',
    props: {
        src: { type: String, default: '' },
        size: { type: [Number, String], default: 22 },
        tile: { type: Boolean, default: false },
        alt: { type: String, default: '' },
    },
};
</script>
