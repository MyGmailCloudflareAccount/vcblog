import { createApp } from 'vue'
import App from './App.vue'
const app = createApp(App)

import { createPinia } from 'pinia'
app.use(createPinia())

import router from './router'
app.use(router)

import { useSiteStore } from '@/stores/site'
await useSiteStore().fetchInfo()

import './global.css'
app.mount('#app')
