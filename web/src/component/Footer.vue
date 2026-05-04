<script setup>
import { ref } from 'vue'
const currentYear = ref(new Date().getFullYear())
</script>

<template>
    <span style="flex: 1; text-align: center; font-size: 15px">© {{ currentYear }}. Powered by VCBlog.</span>
</template>

<style scoped></style>
