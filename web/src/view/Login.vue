<script setup>
import { useSiteStore } from '@/stores/site'
const siteStore = useSiteStore()
document.title = `登录 | ${siteStore.site.title}`

import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const loading = ref(false)
const message = ref('')
const form = reactive({
    password: ''
})

const doLogin = async () => {
    loading.value = true

    try {
        const resp = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify(form)
        })

        if (resp.status !== 200) {
            message.value = '登录失败'
            return
        }

        message.value = '登录成功'
        router.push('/dash')
    } finally {
        loading.value = false
    }
}

onMounted(async () => {
    loading.value = true

    try {
        const resp = await fetch('/api/auth/status')
        if (resp.status !== 200) {
            return
        }

        message.value = '已登录'
        router.push('/dash')
    } finally {
        loading.value = false
    }
})
</script>

<template>
    <div style="display: flex; flex-direction: column; align-items: center">
        <span style="margin: 5px 0">{{ message }}</span>
        <el-form :model="form" label-width="auto" style="width: 250px">
            <el-form-item label="密码">
                <el-input v-model="form.password" type="password" placeholder=" " show-password />
            </el-form-item>
            <el-form-item style="display: flex">
                <el-button style="flex: 1" type="primary" :loading="loading" @click="doLogin">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<style scoped></style>
