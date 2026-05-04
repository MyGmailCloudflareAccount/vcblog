<script setup>
import { useSiteStore } from '@/stores/site'
const site = useSiteStore().site
</script>

<template>
    <span style="flex: 1; font-size: 25px; text-align: center">{{ site.title }}</span>
</template>

<style scoped></style>
