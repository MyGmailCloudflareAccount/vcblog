import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('@/view/Home.vue')
        },
        {
            path: '/page/:id',
            name: 'page',
            component: () => import('@/view/Page.vue')
        },
        {
            path: '/post/:id',
            name: 'post',
            component: () => import('@/view/Post.vue')
        },
        {
            path: '/search',
            name: 'search',
            component: () => import('@/view/Search.vue')
        }
    ]
})

export default router
