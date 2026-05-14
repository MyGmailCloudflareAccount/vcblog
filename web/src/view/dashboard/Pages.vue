<script setup>
import MarkdownRender from 'markstream-vue'
import { MdEditor } from 'md-editor-v3'
import { Refresh, Plus } from '@element-plus/icons-vue'
import { ref, onMounted } from 'vue'

const loading = ref(false)
const pages = ref([])

const showEditor = ref(false)
const pageInfo = ref({})
const isPreview = ref(false)
const saveing = ref(false)

const fetchPages = async () => {
    loading.value = true
    const resp = await fetch('/api/page/list')
    pages.value = await resp.json()
    loading.value = false
}

const editPage = async idx => {
    const page = pages.value[idx]

    loading.value = true
    const resp = await fetch(`/api/page/info?id=${page.id}`)
    pageInfo.value = await resp.json()
    pageInfo.value.id = page.id
    loading.value = false

    showEditor.value = true
}

const newPage = () => {
    pageInfo.value = {}
    showEditor.value = true
}

const deletePage = async idx => {
    const page = pages.value[idx]

    loading.value = true
    await fetch(`/api/page/delete?id=${page.id}`)
    loading.value = false

    await fetchPages()
}

const savePage = async () => {
    saveing.value = true

    try {
        const resp = await fetch(`/api/page/${typeof pageInfo.value.id === 'number' ? 'update' : 'new'}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify(pageInfo.value)
        })

        if (resp.status !== 200) {
            return
        }
    } finally {
        saveing.value = false
    }

    showEditor.value = false
    isPreview.value = false
    await fetchPages()
}

onMounted(fetchPages)
</script>

<template>
    <div style="margin-bottom: 5px">
        <el-button type="primary" :icon="Refresh" @click="fetchPages" />
        <el-button type="primary" :icon="Plus" @click="newPage" />
    </div>
    <el-table v-loading="loading" :data="pages" style="width: 100%">
        <el-table-column prop="id" label="编号" width="60" fixed />
        <el-table-column prop="title" label="标题" width="940" />
        <el-table-column fixed="right" label="操作" min-width="120">
            <template #default="scope">
                <el-button link type="primary" size="small" @click.prevent="editPage(scope.$index)">编辑</el-button>
                <el-button link type="primary" size="small" @click.prevent="deletePage(scope.$index)">删除</el-button>
            </template>
        </el-table-column>
    </el-table>
    <el-dialog v-model="showEditor" title="Markdown 编辑器" fullscreen>
        <div style="display: flex; align-items: center; margin-bottom: 5px; column-gap: 5px">
            <el-text>标题</el-text>
            <el-input v-model="pageInfo.title" style="flex: 1" placeholder=" " />
            <el-text>编辑</el-text>
            <el-switch v-model="isPreview" />
            <el-text>预览</el-text>
        </div>
        <MarkdownRender v-show="isPreview" :content="pageInfo.content" />
        <MdEditor v-show="!isPreview" v-model="pageInfo.content" :preview="false" />
        <template #footer>
            <el-button @click="showEditor = false">放弃</el-button>
            <el-button :loading="saveing" type="primary" @click="savePage">保存</el-button>
        </template>
    </el-dialog>
</template>

<style scoped></style>
