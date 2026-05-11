<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
const dashRoute = router.getRoutes().find(route => route.name === 'dash')

import { useRoute } from 'vue-router'
const curRoute = useRoute()

import { useSiteStore } from '@/stores/site'
const siteStore = useSiteStore()

import { computed, onMounted, watch } from 'vue'
const activeTab = computed(() => curRoute.name)

onMounted(() => {
    if (curRoute.path === dashRoute.path) {
        router.push({ name: dashRoute.children[0].name })
    }

    watch(
        () => curRoute.name,
        (name, _) => {
            document.title = `${name} | 管理面板 | ${siteStore.site.title}`
        },
        { immediate: true }
    )
})

const changeTab = (tab, event) => {
    console.log(tab, event)
}
</script>

<template>
    <el-tabs :value="activeTab" @tab-click="changeTab">
        <el-tab-pane v-for="child in dashRoute.children" :label="child.name" :name="child.name">
            <router-view v-if="child.name === activeTab" />
        </el-tab-pane>
    </el-tabs>
</template>

<style scoped></style>
