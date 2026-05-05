<script setup>
import { ref, onMounted } from 'vue'

const site = ref({})
onMounted(async () => {
    const resp = await fetch('/api/site/info')
    site.value = await resp.json()

    if (site.value.extra_css) {
        const style = document.createElement('style')
        style.textContent = site.value.extra_css
        document.head.appendChild(style)
    }

    if (site.value.extra_js) {
        const script = document.createElement('script')
        script.textContent = site.value.extra_js
        document.head.appendChild(script)
    }
})
</script>

<template>
    <span style="flex: 1; font-size: 25px; text-align: center">{{ site.title }}</span>
</template>

<style scoped></style>
