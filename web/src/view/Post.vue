<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

import 'katex/dist/katex.min.css'
import MarkdownRender from 'markstream-vue'

import { useSiteStore } from '@/stores/site'
const siteStore = useSiteStore()

const route = useRoute()
const post = ref({})

onMounted(async () => {
    const resp = await fetch(`/api/post/info?id=${route.params.id}`)
    post.value = await resp.json()
    document.title = `${post.value.title} | ${siteStore.site.title}`
})
</script>

<template>
    <h2 style="margin-top: 5px">{{ post.title || '加载中...' }}</h2>
    <MarkdownRender :content="post.content" />
</template>

<style scoped></style>
