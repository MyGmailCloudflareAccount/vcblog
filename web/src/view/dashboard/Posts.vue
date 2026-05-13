<script setup>
import MarkdownRender from 'markstream-vue'
import { MdEditor } from 'md-editor-v3'
import { Refresh, Plus } from '@element-plus/icons-vue'
import { ref, watch, onMounted } from 'vue'

const loading = ref(false)
const total_page = ref(1)
const cur_page = ref(1)
const posts = ref([])

const showEditor = ref(false)
const postInfo = ref({})
const saveing = ref(false)
const isPreview = ref(false)

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

const editPost = async idx => {
    const post = posts.value[idx]

    loading.value = true
    const resp = await fetch(`/api/post/info?id=${post.id}`)
    postInfo.value = await resp.json()
    postInfo.value.id = post.id
    loading.value = false

    showEditor.value = true
}

const newPost = () => {
    postInfo.value = {}
    showEditor.value = true
}

const deletePost = async idx => {
    const post = posts.value[idx]

    loading.value = true
    await fetch(`/api/post/delete?id=${post.id}`)
    loading.value = false

    await refresh()
}

const savePost = async () => {
    saveing.value = true

    try {
        const resp = await fetch(`/api/post/${typeof postInfo.value.id === 'number' ? 'update' : 'new'}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify(postInfo.value)
        })

        if (resp.status !== 200) {
            return
        }
    } finally {
        saveing.value = false
    }

    showEditor.value = false
    isPreview.value = false
    await refresh()
}

onMounted(getCount)
</script>

<template>
    <div style="margin-bottom: 5px">
        <el-button type="primary" :icon="Refresh" @click="refresh" />
        <el-button type="primary" :icon="Plus" @click="newPost" />
    </div>
    <el-table v-loading="loading" :data="posts" style="width: 100%">
        <el-table-column prop="id" label="编号" width="60" fixed />
        <el-table-column prop="title" label="标题" width="940" />
        <el-table-column fixed="right" label="操作" min-width="120">
            <template #default="scope">
                <el-button link type="primary" size="small" @click.prevent="editPost(scope.$index)">编辑</el-button>
                <el-button link type="primary" size="small" @click.prevent="deletePost(scope.$index)">删除</el-button>
            </template>
        </el-table-column>
    </el-table>
    <el-pagination style="display: flex; justify-content: center; background-color: var(--el-fill-color-blank)" hide-on-single-page :page-count="total_page" layout="prev, pager, next" v-model:current-page="cur_page" />
    <el-dialog v-model="showEditor" title="Markdown 编辑器" fullscreen>
        <div style="display: flex; align-items: center; margin-bottom: 5px; column-gap: 5px">
            <el-text>标题</el-text>
            <el-input v-model="postInfo.title" style="flex: 1" placeholder=" " />
            <el-text>编辑</el-text>
            <el-switch v-model="isPreview" />
            <el-text>预览</el-text>
        </div>
        <MarkdownRender v-show="isPreview" :content="postInfo.content" />
        <MdEditor v-show="!isPreview" v-model="postInfo.content" :preview="false" />
        <template #footer>
            <el-button @click="showEditor = false">放弃</el-button>
            <el-button :loading="saveing" type="primary" @click="savePost">保存</el-button>
        </template>
    </el-dialog>
</template>

<style scoped></style>
