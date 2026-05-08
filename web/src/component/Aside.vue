<script setup>
import { ref, onMounted, defineEmits } from 'vue'

const emit = defineEmits(['closeAside'])
const handleLinkClick = () => {
    emit('closeAside')
}

const commonLink = [
    {
        path: '/',
        text: '首页'
    },
    {
        path: '/search',
        text: '搜索'
    },
    {
        path: '/login',
        text: '管理'
    }
]

const pages = ref([])
onMounted(async () => {
    const resp = await fetch('/api/page/list')
    pages.value = await resp.json()
})
</script>

<template>
    <div style="display: flex; flex-direction: column; align-items: center; padding: 10px; row-gap: 5px">
        <router-link v-for="link in commonLink" :to="link.path" @click="handleLinkClick">{{ link.text }}</router-link>
        <router-link v-for="page in pages" :to="`/page/${page.id}`" @click="handleLinkClick">{{ page.title }}</router-link>
    </div>
</template>

<style scoped></style>
