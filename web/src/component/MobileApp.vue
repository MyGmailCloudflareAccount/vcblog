<script setup>
import { ref } from 'vue'
import { Operation, Close } from '@element-plus/icons-vue'

const asideOpen = ref(false)
const collapseBtnIcon = ref(Operation)

const asideSwitch = () => {
    asideOpen.value = !asideOpen.value
    collapseBtnIcon.value = asideOpen.value ? Close : Operation
}

const closeAside = () => {
    asideOpen.value = false
    collapseBtnIcon.value = Operation
}

import Header from '@/component/Header.vue'
import Aside from '@/component/Aside.vue'
import Footer from '@/component/Footer.vue'
</script>

<template>
    <el-container style="height: 100%">
        <el-header style="padding: 10px 0; height: 60px; overflow: hidden">
            <el-button style="background-color: transparent; position: absolute" @click="asideSwitch" :icon="collapseBtnIcon" text />
            <Header />
        </el-header>
        <el-container style="flex: 1; overflow: hidden">
            <el-aside style="position: absolute; top: 60px; bottom: 0; left: 0; background-color: #eee; box-shadow: 0 0 5px 0; z-index: 100" v-show="asideOpen" width="200px">
                <el-scrollbar>
                    <Aside @close-aside="closeAside" />
                </el-scrollbar>
            </el-aside>
            <el-container>
                <el-main style="margin: 5px 0; padding: 0; flex: 1; overflow: hidden">
                    <el-scrollbar>
                        <div style="padding: 0 10px">
                            <router-view />
                        </div>
                    </el-scrollbar>
                </el-main>
                <el-footer style="padding: 5px 0; height: auto">
                    <Footer />
                </el-footer>
            </el-container>
        </el-container>
    </el-container>
</template>

<style scoped>
.el-header,
.el-footer {
    display: flex;
    align-items: center;
    background-color: #ede796;
}
</style>
