<script setup>
import { useSiteStore } from '@/stores/site'
const siteStore = useSiteStore()
document.title = `搜索 | ${siteStore.site.title}`

import { ref } from 'vue'
const input = ref('')
const loading = ref(false)
const results = ref([])

const search = async () => {
    loading.value = true
    const resp = await fetch(`/api/post/search?keyword=${input.value}`)
    results.value = await resp.json()
    loading.value = false
}
</script>

<template>
    <div style="display: flex; align-items: center; margin: 5px 0; column-gap: 5px">
        <el-button plain :loading="loading" @click="search">搜索</el-button>
        <el-input v-model="input" style="flex: 1" placeholder="输入关键词" />
    </div>
    <div v-for="post in results">
        <router-link :to="`/post/${post.id}`">
            <h1 style="margin: 5px 0">{{ post.title }}</h1>
        </router-link>
        <p style="margin: 0; border-bottom: 1px solid black">{{ post.preview }}</p>
    </div>
</template>

<style scoped></style>
