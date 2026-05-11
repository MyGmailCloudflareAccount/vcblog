<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
const dashRoute = router.getRoutes().find(route => route.name === 'dash')

import { useRoute } from 'vue-router'
const curRoute = useRoute()

import { useSiteStore } from '@/stores/site'
const siteStore = useSiteStore()

import { ref, onMounted, watch } from 'vue'
const activeTab = ref('')

onMounted(() => {
    if (curRoute.path === dashRoute.path) {
        router.push('/dash/settings')
    }

    watch(
        () => curRoute.name,
        (name, _) => {
            activeTab.value = name
            document.title = `${name} | 管理面板 | ${siteStore.site.title}`
        },
        { immediate: true }
    )
})

const changeTab = (tab, _) => {
    router.push({ name: tab.props.name })
}
</script>

<template>
    <el-tabs v-model="activeTab" @tab-click="changeTab">
        <el-tab-pane v-for="child in dashRoute.children" :label="child.name" :name="child.name">
            <router-view v-if="child.name === activeTab" />
        </el-tab-pane>
    </el-tabs>
</template>

<style scoped></style>
