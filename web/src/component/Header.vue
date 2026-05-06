<script setup>
import { useSiteStore } from '@/stores/site'
const siteStore = useSiteStore()
</script>

<template>
    <span style="flex: 1; font-size: 25px; text-align: center">{{ siteStore.site.title }}</span>
</template>

<style scoped></style>
