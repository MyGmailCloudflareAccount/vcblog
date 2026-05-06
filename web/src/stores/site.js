import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSiteStore = defineStore('site', () => {
    const site = ref({})
    const fetchInfo = async () => {
        const resp = await fetch('/api/site/info')
        site.value = await resp.json()
    }

    return { site, fetchInfo }
})
