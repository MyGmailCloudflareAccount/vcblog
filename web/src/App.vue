<script setup>
import { computed } from 'vue'
const isMobile = computed(() => window.innerWidth < 768)

import MobileApp from '@/component/MobileApp.vue'
import DesktopApp from '@/component/DesktopApp.vue'

import { useSiteStore } from './stores/site'
const siteStore = useSiteStore()

const style = document.createElement('style')
style.textContent = siteStore.site.extra_css
document.head.appendChild(style)

const script = document.createElement('script')
script.textContent = siteStore.site.extra_js
document.head.appendChild(script)
</script>

<template>
    <MobileApp v-if="isMobile" />
    <DesktopApp v-else />
</template>

<style scoped></style>
