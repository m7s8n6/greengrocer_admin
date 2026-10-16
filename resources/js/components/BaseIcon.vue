<template>
  <span v-html="svgContent" class="base-icon" :style="iconStyle"
    @mouseover="isHovered = true"
    @mouseleave="isHovered = false">
  </span>
</template>

<script>
export default {
  name: 'BaseIcon',
  props: {
    name: {
      type: String,
      required: true
    },
    hoverName: {
      type: String,
      default: ''
    },
    width: {
      type: [String, Number],
      default: 24
    },
    height: {
      type: [String, Number],
      default: 24
    },
    useCurrentColor: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      svgContent: '',
      isHovered: false
    };
  },
  computed: {
    iconStyle() {
      return {
        width: typeof this.width === 'number' ? `${this.width}px` : this.width,
        height: typeof this.height === 'number' ? `${this.height}px` : this.height,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.2s ease'
      };
    },
    currentIconName() {
      return (this.isHovered && this.hoverName) ? this.hoverName : this.name;
    }
  },
  watch: {
    currentIconName: {
      handler: 'loadIcon',
      immediate: true
    }
  },
  methods: {
    async loadIcon() {
      if (!this.currentIconName) return;
      try {
        const response = await fetch(`${this.$baseUrl}/images/icons/${this.currentIconName}.svg`);
        if (response.ok) {
          let svg = await response.text();
          
          if (this.useCurrentColor) {
            // Force the SVG to use the current text color
            svg = svg.replace(/fill="[^"]*"/g, 'fill="currentColor"');
            svg = svg.replace(/stroke="[^"]*"/g, 'stroke="currentColor"');
          }
          
          this.svgContent = svg;
        } else {
          console.error(`Icon "${this.currentIconName}" not found at ${this.$baseUrl}/images/icons/${this.currentIconName}.svg`);
        }
      } catch (error) {
        console.error(`Error loading icon "${this.currentIconName}":`, error);
      }
    }
  }
};
</script>

<style scoped>
.base-icon :deep(svg) {
  width: 100%;
  height: 100%;
}
</style>
