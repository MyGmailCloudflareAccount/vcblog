<script setup>
import MarkdownRender from 'markstream-vue'
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

import { useSiteStore } from '@/stores/site'
const siteStore = useSiteStore()

const route = useRoute()
const page = ref({})

onMounted(async () => {
    const resp = await fetch(`/api/page/info?id=${route.params.id}`)
    page.value = await resp.json()
    document.title = `${page.value.title} | ${siteStore.site.title}`
})
</script>

<template>
    <h2 style="margin-top: 5px">{{ page.title || '加载中...' }}</h2>
    <MarkdownRender :content="page.content" />
</template>

<style scoped></style>
