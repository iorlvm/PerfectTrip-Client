<script setup>
</script>

<template>
    <div class="flex-container">
        <header>
            <router-link to="/">(暫時的頭部)</router-link>
            <router-link to="/store">歡迎/註冊商家</router-link>
            <router-link to="/store/login">登入</router-link>
            <router-link to="/store/manage">管理中心</router-link>
        </header>
        <main class="flex-main">
            <RouterView />
        </main>
        <footer>
        </footer>
    </div>
</template>


<style lang="scss" scoped>
.flex-container {
    height: 100vh;

    a {
        color: $xtxColor;
    }

    header {
        display: flex;
        align-items: center;
        justify-content: space-around;
        background-color: $headerFooter;
        height: 50px;
        flex-shrink: 0;
    }

    footer {
        background-color: $headerFooter;
        height: 10px;
        flex-shrink: 0;
    }
}

.flex-main {
    min-height: calc(100vh - 60px);
}
</style>