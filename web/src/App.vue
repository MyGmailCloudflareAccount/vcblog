<script setup>
import { computed } from 'vue'
const isMobile = computed(() => window.innerWidth < 768)

import MobileApp from '@/component/MobileApp.vue'
import DesktopApp from '@/component/DesktopApp.vue'
</script>

<template>
    <MobileApp v-if="isMobile" />
    <DesktopApp v-else />
</template>

<style scoped></style>
