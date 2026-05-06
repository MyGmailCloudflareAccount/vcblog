<script setup>
import { useSiteStore } from '@/stores/site'
const siteStore = useSiteStore()
document.title = `首页 | ${siteStore.site.title}`
</script>

<template>
    <span v-for="i in 100">{{ i }} <br /></span>
</template>

<style scoped></style>
