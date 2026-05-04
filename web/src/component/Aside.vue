<script setup>
import { ref, onMounted } from 'vue'

const pages = ref([])
onMounted(async () => {
    const resp = await fetch('/api/page/list')
    pages.value = await resp.json()
})
</script>

<template>
    <div style="display: flex; flex-direction: column; align-items: center; padding: 10px; row-gap: 5px">
        <a href="/">首页</a>
        <a v-for="page in pages" :href="page.path">{{ page.title }}</a>
    </div>
</template>

<style scoped></style>
