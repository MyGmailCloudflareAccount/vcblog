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
    <div style="display: flex; align-items: center; margin-bottom: 5px; column-gap: 5px">
        <button style="cursor: pointer" type="button" @click="search">搜索</button>
        <input style="flex: 1" type="text" placeholder="输入关键词" v-model="input" />
    </div>
    <h2 style="margin-top: 5px" v-if="loading">加载中...</h2>
    <div v-else>
        <div v-for="post in results">
            <router-link :to="`/post/${post.id}`">
                <h1 style="margin: 5px 0">{{ post.title }}</h1>
            </router-link>
            <p style="margin: 0; border-bottom: 1px solid black">{{ post.preview }}</p>
        </div>
    </div>
</template>

<style scoped></style>
