<script setup>
import { useSiteStore } from '@/stores/site'
const siteStore = useSiteStore()
document.title = `管理面板 | ${siteStore.site.title}`
</script>

<template>dashboard</template>

<style scoped></style>
