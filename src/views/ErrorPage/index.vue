<script setup>
</script>

<template>
    <div class="error">
        <header>
            <router-link to="/">PerfectTrip.com</router-link>
        </header>
        <main class="main">
            <div class="res-not-found">
                <el-result title="Opss! 404 找不到網頁" sub-title="請確認您輸入的網址是否正確">
                    <template #icon>
                        <div>
                            <img src="@/assets/images/none.png" alt="">
                        </div>
                    </template>
                    <template #extra>
                        <el-button type="primary" @click="$router.go(-1)">上一頁</el-button>
                    </template>
                </el-result>
            </div>
        </main>
        <footer>
        </footer>
    </div>
</template>

<style lang="scss">
.res-not-found {
    margin-top: 30px;

    .el-result__icon {
        width: 50%;
        max-width: 350px;
    }
}
</style>

<style lang="scss" scoped>
.error {
    height: 100vh;

    a {
        color: $xtxColor;
    }

    header {
        display: flex;
        align-items: center;
        justify-content: space-around;
        background-color: $headerFooter;
        height: 45px;
        font-size: 1.3em;
    }

    footer {
        background-color: $headerFooter;
        height: 20px;
        flex-shrink: 0;
    }
}

.main {
    padding-top: 8vh;
    min-height: calc(100vh - 65px);
}
</style>