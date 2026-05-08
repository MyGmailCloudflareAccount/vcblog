<script setup>
import { useSiteStore } from '@/stores/site'
const siteStore = useSiteStore()

import { useRouter } from 'vue-router'
const router = useRouter()

// import { watch, ref, onMounted } from 'vue'
// const maxPage = ref(1)
// const curPage = ref(1)
// const loading = ref(false)
// const posts = ref([])

// onMounted(async () => {
//     const resp = await fetch('/api/post/count')

//     const postCount = (await resp.json()).count
//     const postPerPage = siteStore.site.post_per_page
//     maxPage.value = Math.ceil(postCount / postPerPage)

//     watch(
//         () => router.currentRoute.value.query.page,
//         async (page, _) => {
//             if (!page) page = 1
//             if (typeof page !== 'number') page = parseInt(page, 10)
//             if (isNaN(page) || page < 1) page = 1
//             if (page > maxPage.value) page = maxPage.value

//             document.title = `${page === 1 ? '首页' : `第 ${page} 页`} | ${siteStore.site.title}`
//             curPage.value = page

//             loading.value = true
//             const resp = await fetch(`/api/post/list?page=${page}`)
//             posts.value = await resp.json()
//             loading.value = false
//         },
//         { immediate: true }
//     )
// })
</script>

<template>
    <!-- <h2 style="margin-top: 5px" v-if="loading">加载中...</h2>
    <div v-for="i in 100">
        <router-link :to="`/?page=${i}`">Page {{ i }}</router-link>
    </div> -->
</template>

<style scoped></style>
