<script setup>
import { ref } from 'vue';

const active = ref(0)

const nextStep = () => {
    active.value += 1;
}

const backStep = () => {
    active.value -= 1;
}
</script>

<template>
    <div class="space"></div>
    <div class="container">
        <el-steps class="step" :active="active" process-status="finish" finish-status="success" align-center>
            <el-step title="填寫資料" />
            <el-step title="確認訂單" />
            <el-step title="前往付款" />
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