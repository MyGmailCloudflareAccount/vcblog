<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

import 'katex/dist/katex.min.css'
import MarkdownRender from 'markstream-vue'

const route = useRoute()
const page = ref({})

onMounted(async () => {
    const resp = await fetch(`/api/page/info?id=${route.params.id}`)
    page.value = await resp.json()
})
</script>

<template>
    <h2 style="margin-top: 5px">{{ page.title }}</h2>
    <MarkdownRender :content="page.content" />
</template>

<style scoped></style>
