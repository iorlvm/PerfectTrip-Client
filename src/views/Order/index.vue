<script setup>
import { onMounted, ref } from 'vue';
const active = ref(1)

const nextStep = () => {
    active.value += 1;
}

const backStep = () => {
    active.value -= 1;
}

onMounted(() => {
    // window.scrollTo({
    //     top: 0,
    //     behavior: 'smooth'
    // });
})
</script>

<template>
    <div class="space"></div>
    <div class="container">
        <el-steps class="step" :active="active" process-status="finish" finish-status="success" align-center>
            <el-step title="您的選項" />
            <el-step title="您的資料" />
            <el-step title="完成預定" />
        </el-steps>
        <el-divider class="divider" />
        <router-view v-slot="{ Component }">
            <component :is="Component" :active="active" @nextActive="nextStep" @backActive="backStep" />
        </router-view>
    </div>
</template>

<style lang="scss" scoped>
.space {
    background-color: $headerFooter;
    height: 5px;
}

.divider {
    margin: 5px 0;
}

.step {
    margin-top: 20px;
}
</style>