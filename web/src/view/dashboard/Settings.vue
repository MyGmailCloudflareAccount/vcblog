<script setup>
import { ref, computed, onMounted } from 'vue'

const loading = ref(false)
const settings = ref({})
const oldSettings = ref({})
const saveing = ref(false)

const changedKeys = computed(() => {
    return Object.keys(settings.value).filter(key => settings.value[key] !== oldSettings.value[key])
})

onMounted(async () => {
    loading.value = true
    const resp = await fetch('/api/site/settings/list')
    const data = await resp.json()
    loading.value = false

    settings.value = JSON.parse(JSON.stringify(data))
    oldSettings.value = JSON.parse(JSON.stringify(data))
})

const updateSettings = async () => {
    saveing.value = true

    try {
        for await (const key of changedKeys.value) {
            const resp = await fetch(`/api/site/settings/update?key=${key}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8'
                },
                body: JSON.stringify({
                    key: key,
                    value: settings.value[key]
                })
            })

            if (resp.status !== 200) {
                return
            }
        }
    } finally {
        saveing.value = false
    }

    oldSettings.value = JSON.parse(JSON.stringify(settings.value))
}
</script>

<template>
    <el-form v-loading="loading" label-width="auto">
        <el-form-item v-for="(_, key) in settings" :label="key">
            <el-input :type="key.startsWith('extra_') ? 'textarea' : 'text'" v-model="settings[key]" placeholder=" " autosize />
        </el-form-item>
        <el-form-item>
            <el-text>{{ changedKeys.length === 0 ? '没有暂存的更改' : `暂存的更改: ${changedKeys.join(', ')}` }}</el-text>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" :loading="saveing" @click="updateSettings">更新</el-button>
        </el-form-item>
    </el-form>
</template>

<style scoped></style>
