<script setup>
import { useSiteStore } from '@/stores/site'
const siteStore = useSiteStore()

import { useRoute } from 'vue-router'
const route = useRoute()

import { ref, onMounted, watch } from 'vue'
const loading = ref(false)
const count = ref({})
const posts = ref([])

onMounted(async () => {
    loading.value = true
    const resp = await fetch('/api/post/count')
    count.value = await resp.json()
    loading.value = false

    watch(
        () => route.query.page,
        async (page, _) => {
            if (!page) page = '1'
            document.title = `第 ${page} 页 | ${siteStore.site.title}`

            loading.value = true
            const resp = await fetch(`/api/post/list?page=${page}`)
            posts.value = await resp.json()
            loading.value = false
        },
        { immediate: true }
    )
})
</script>

<template>
    <h2 style="margin-top: 5px" v-if="loading">加载中...</h2>
    <div v-else>
        <div v-for="post in posts">
            <router-link :to="`/post/${post.id}`">
                <h1 style="margin: 5px 0">{{ post.title }}</h1>
            </router-link>
            <p style="margin: 0; border-bottom: 1px solid black">{{ post.preview }}</p>
        </div>
        <div style="margin-top: 10px; display: flex; flex-wrap: wrap; justify-content: center">
            <router-link style="background-color: #ccc; margin: 0 5px; padding: 0 5px" v-for="i in count.total_page" :to="`?page=${i}`">第 {{ i }} 页</router-link>
        </div>
    </div>
</template>

<style scoped></style>
