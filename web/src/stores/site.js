import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSiteStore = defineStore('site', () => {
    const site = ref({})
    const fetchInfo = async () => {
        const res = await fetch('/api/site/info')
        site.value = await res.json()
    }

    return { site, fetchInfo }
})
