<template>
    <footer class="figma-footer">
        <div class="copyright">
            <span v-html="copyrightDetails"></span>
        </div>
        <div v-if="currentVersion" class="version">
            <span class="version-label me-2">{{ __('version') }}</span>
            <span class="version-badge">{{ currentVersion }}</span>
        </div>
    </footer>
</template>

<script>
export default {
  name: 'TheFooter',
  data() {
    return {
     copyrightDetails: window.copyrightDetails,
     currentVersion:window.currentVersion
    };
  }
}
</script>
