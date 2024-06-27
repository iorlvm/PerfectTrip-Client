<script setup>
</script>

<template>
    <div class="store-container">
        <header>
            <nav class="container">
                <ul class="nav">
                    <li class="logo">
                        <router-link to="/">PerfectTrip.com</router-link>
                    </li>
                    <li>
                        (支援中心實際上是管理中心連結 功能完成後替換)
                    </li>
                    <li class="grow"></li>
                    <li>
                        已經是合作夥伴了嗎？
                    </li>
                    <li>
                        <router-link to="/store/login">
                            <span class="login">
                                登入
                            </span>
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/store/manage">
                            <span class="help">
                                支援中心
                            </span>
                        </router-link>
                    </li>
                </ul>
            </nav>
        </header>
        <main>
            <RouterView />
        </main>
        <footer>
        </footer>
    </div>
</template>


<style lang="scss" scoped>
.store-container {
    height: 100vh;



    header {
        background-color: $headerFooter;

        .nav {
            padding: 0 20px;
            display: flex;
            align-items: center;
            justify-content: space-between;

            height: 50px;

            .grow {
                flex-grow: 1;
            }

            .logo {
                font-size: 1.5em;
                font-weight: bold;
            }

            li {
                margin: 0 6px;
                font-size: 1.1em;
                color: $xtxColor;
            }

            a {
                color: $xtxColor;
            }

            .login {
                border: 1px solid #fff;
                border-radius: 5px;
                padding: 6px 8px 6px 9px;
                letter-spacing: 1px;

                &:hover {
                    background-color: #757f8c2a;
                }
            }

            .help {
                border: 1px solid #1654a4;
                border-radius: 5px;
                padding: 6px 8px 6px 9px;
                background-color: #3182ec;
                letter-spacing: 1px;

                &:hover {
                    background-color: #216aca;
                }
            }
        }
    }



    footer {
        background-color: $headerFooter;
        height: 10px;
    }
}

main {
    min-height: calc(100vh - 60px);
}
</style>