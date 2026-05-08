<script setup>
import Header from '@/component/Header.vue'
import Aside from '@/component/Aside.vue'
import Footer from '@/component/Footer.vue'
</script>

<template>
    <el-container style="height: 100%">
        <el-header style="padding: 10px 0; margin-bottom: 5px; height: 60px; overflow: hidden">
            <Header />
        </el-header>
        <el-container style="flex: 1; overflow: hidden">
            <el-aside width="180px">
                <el-scrollbar>
                    <Aside />
                </el-scrollbar>
            </el-aside>
            <el-main style="padding: 0; flex: 1; overflow: hidden">
                <el-scrollbar>
                    <div style="padding: 0 10px">
                        <router-view />
                    </div>
                </el-scrollbar>
            </el-main>
        </el-container>
        <el-footer style="padding: 5px 0; margin-top: 5px; height: auto">
            <Footer />
        </el-footer>
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
