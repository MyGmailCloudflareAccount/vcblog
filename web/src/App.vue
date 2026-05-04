<script setup>
import { computed } from 'vue'
const isMobile = computed(() => window.innerWidth < 768)

import MobileApp from '@/component/MobileApp.vue'
import DesktopApp from '@/component/DesktopApp.vue'

import { useSiteStore } from '@/stores/site'
const site = useSiteStore().site

if (site.extra_css) {
    const style = document.createElement('style')
    style.textContent = site.extra_css
    document.body.appendChild(style)
}

if (site.extra_js) {
    const script = document.createElement('script')
    script.textContent = site.extra_js
    document.body.appendChild(script)
}
</script>

<template>
    <MobileApp v-if="isMobile" />
    <DesktopApp v-else />
</template>

<style scoped></style>
