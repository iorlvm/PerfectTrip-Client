<script setup>
import router from '@/router';

const routeToRegist = () => {
    router.push('/register');
}
</script>

<template>
    <div class="banner">
        <h3>註冊會員，獲取專屬優惠</h3>
        <!-- <p>2025年02月31日前加入會員，立即獲得獨家優惠！</p> -->
        <el-button type="primary" size="large" class="more" @click="routeToRegist">立即行動</el-button>
    </div>
</template>


<style lang="scss" scoped>
.banner {
    flex-grow: 1;
    position: relative;
    border-radius: 8px;
    height: 140px;
    padding: 15px;
    color: #fff;
    background: linear-gradient(to right, #8c8c8c, rgba(179, 179, 179, 0)), url('/article-57ada7cd13dce.jpg') no-repeat center center;
    background-size: cover;
    background-blend-mode: multiply;
    color: white;

    h3 {
        font-size: 1.25em;
        font-weight: 500;
        letter-spacing: 2px;
    }

    p {
        font-size: 1.1em;
        margin-top: 10px;
        letter-spacing: 1px;
    }

    .more {
        display: block;
        position: absolute;
        right: 20px;
        bottom: 15px;
        font-size: 1.15em;
    }
}
</style>