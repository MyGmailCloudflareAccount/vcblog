<script setup>
import { useSiteStore } from '@/stores/site'
const siteStore = useSiteStore()

import { useRouter } from 'vue-router'
const router = useRouter()

import { watch, onMounted } from 'vue'
onMounted(async () => {
    const resp = await fetch('/api/post/count')

    const postCount = (await resp.json()).count
    const postPerPage = siteStore.site.post_per_page
    const maxPage = Math.ceil(postCount / postPerPage)

    watch(
        () => router.currentRoute.value.query.page,
        async (page, _) => {
            if (!page) page = 1
            document.title = `${page === 1 ? '首页' : `第 ${page} 页`} | ${siteStore.site.title}`
        },
        { immediate: true }
    )
})
</script>

<template>
    <div v-for="i in 100">
        <router-link :to="`/?page=${i}`">Page {{ i }}</router-link>
    </div>
</template>

<style scoped></style>
