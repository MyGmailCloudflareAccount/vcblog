<script setup>
import { ref, onMounted } from 'vue'

const loading = ref(false)
const settings = ref({})

onMounted(async () => {
    loading.value = true
    const resp = await fetch('/api/site/settings/list')
    settings.value = await resp.json()
    loading.value = false
})

const updateSettings = async () => {
    console.log(settings.value)
}
</script>

<template>
    <el-form v-loading="loading" label-width="auto">
        <el-form-item v-for="(_, key) in settings" :label="key">
            <el-input v-model="settings[key]" placeholder=" " clearable />
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="updateSettings">更新</el-button>
        </el-form-item>
    </el-form>
</template>

<style scoped></style>
