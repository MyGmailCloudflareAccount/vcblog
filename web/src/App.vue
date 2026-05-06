<script setup>
import { computed, watch } from 'vue'
const isMobile = computed(() => window.innerWidth < 768)

import MobileApp from '@/component/MobileApp.vue'
import DesktopApp from '@/component/DesktopApp.vue'

import { useSiteStore } from './stores/site'
const siteStore = useSiteStore()

watch(
    () => siteStore.site,
    (value, _) => {
        if (value.extra_css) {
            const style = document.createElement('style')
            style.textContent = value.extra_css
            document.head.appendChild(style)
        }

        if (value.extra_js) {
            const script = document.createElement('script')
            script.textContent = value.extra_js
            document.head.appendChild(script)
        }
    },
    { immediate: true }
)
</script>

<template>
    <MobileApp v-if="isMobile" />
    <DesktopApp v-else />
</template>

<style scoped></style>
