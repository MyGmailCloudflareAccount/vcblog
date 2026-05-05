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
        <router-link to="/">首页</router-link>
        <router-link v-for="page in pages" :to="page.path">{{ page.title }}</router-link>
    </div>
</template>

<style scoped></style>
