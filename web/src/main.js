import { createApp } from 'vue'
import App from './App.vue'
const app = createApp(App)

import { createPinia } from 'pinia'
app.use(createPinia())

import router from './router'
app.use(router)

import { useSiteStore } from './stores/site'
await useSiteStore().fetchInfo()

import 'md-editor-v3/lib/style.css'
import 'katex/dist/katex.min.css'
import 'markstream-vue/index.css'
import { enableKatex, enableMermaid, enableD2 } from 'markstream-vue'
enableKatex()
enableMermaid()
enableD2()

import './global.css'
app.mount('#app')
