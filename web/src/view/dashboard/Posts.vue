<script setup>
import { Refresh } from '@element-plus/icons-vue'
import { ref, watch, onMounted } from 'vue'

const loading = ref(false)
const total_page = ref(1)
const cur_page = ref(1)
const posts = ref([])

const getCount = async () => {
    loading.value = true
    const resp = await fetch('/api/post/count')
    total_page.value = (await resp.json()).total_page
    loading.value = false
}

const fetchPosts = async page => {
    loading.value = true
    const resp = await fetch(`/api/post/list?page=${page}`)
    posts.value = await resp.json()
    loading.value = false
}

const refresh = async () => {
    await getCount()
    await fetchPosts(cur_page.value)
}

watch(
    () => cur_page.value,
    (value, _) => fetchPosts(value),
    { immediate: true }
)

const editPost = idx => {
    const post = posts.value[idx]
    console.log(post)
}

onMounted(getCount)
</script>

<template>
    <div style="margin-bottom: 5px">
        <el-button type="primary" :icon="Refresh" @click="refresh" />
    </div>
    <el-table v-loading="loading" :data="posts" stripe style="width: 100%">
        <el-table-column prop="id" label="编号" width="120" fixed />
        <el-table-column prop="title" label="标题" width="600" />
        <el-table-column fixed="right" label="操作" min-width="120">
            <template #default="scope">
                <el-button link type="primary" size="small" @click.prevent="editPost(scope.$index)">编辑</el-button>
            </template>
        </el-table-column>
    </el-table>
    <el-pagination style="display: flex; justify-content: center; background-color: var(--el-fill-color-blank)" hide-on-single-page :page-count="total_page" layout="prev, pager, next" v-model:current-page="cur_page" />
</template>

<style scoped></style>
