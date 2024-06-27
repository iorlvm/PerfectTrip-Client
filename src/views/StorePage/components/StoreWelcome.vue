<script setup>

</script>

<template>
    <div class="bg">
        <div class="welcome container">
            <div class="height">
                <p class="desc">
                    已經有 29,279,209 間房源在 PerfectTrip.com 上線，加入他們的行列吧！
                </p>
            </div>
            <div class="card">
                <div class="padding">
                    <h2>只需 15 分鐘就可完成免費註冊</h2>
                    <p>
                        <el-icon class="icon">
                            <Check />
                        </el-icon>
                        45% 的屋主在一週內就會收到第一筆訂單
                    </p>
                    <p>
                        <el-icon class="icon">
                            <Check />
                        </el-icon>
                        可選擇即時確認訂單，或請顧客提出訂房要求
                    </p>
                    <p>
                        <el-icon class="icon">
                            <Check />
                        </el-icon>
                        付款交易由我們替您處理
                    </p>
                </div>
                <el-divider class="divider" />
                <div class="padding">
                    <el-button type="primary" size="large">
                        現在就開始&nbsp;
                        <el-icon class="button-icon" size="20">
                            <Right />
                        </el-icon>
                    </el-button>
                </div>
            </div>
            <h1>在 PerfectTrip.com 上刊登住宿</h1>
            <h3 class="letter-spacing">觸及世界各地與亞洲區旅客。今天就上PerfectTrip刊登住宿，獲得來自各地的訂單！</h3>
        </div>
        <!-- <el-divider /> -->
    </div>
</template>

<style lang="scss" scoped>
.welcome {
    position: relative;
    z-index: 1;

    .height {
        min-height: 50px;
        height: 15vh;
    }

    .desc {
        font-size: 0.9em;
        margin-left: 30px;
        margin-top: 3px;
        display: inline-block;
        position: relative;
        background-color: #3182ec;
        color: #fff;
        padding: 10px 10px 10px 15px;
        border-radius: 8px;


        &::after {
            content: '';
            position: absolute;
            bottom: 100%;
            left: 5%;
            width: 0;
            height: 0;
            border-left: 8px solid transparent;
            border-right: 8px solid transparent;
            border-bottom: 8px solid #3182ec;
        }
    }

    h1 {
        margin-top: 30px;
        font-size: 2.2em;
        text-align: center;
        // color: #fff;
        color: $headerFooter;
        letter-spacing: 1px;
    }

    h3 {
        margin: 8px 0;
        font-weight: 500;
        text-align: center;
        // color: #fff;
        color: $headerFooter;
    }

    .letter-spacing {
        letter-spacing: 1px;
    }

    .card {
        border: 5px solid $warnColor;
        background-color: #fff;
        border-radius: 20px;
        margin: 50px auto 35px;
        width: 440px;

        h2 {
            margin: 8px 0 15px;
            font-size: 1.45em;
            font-weight: 500;
            letter-spacing: 1px;
        }


        .el-button {
            padding-top: 15px;
            font-size: 1.2em;
            letter-spacing: 2px;
            width: 100%;
            height: 50px;
            font-weight: 550;

            .button-icon {
                margin-top: -3px;
            }
        }

        p {
            margin: 12px 0;
            display: flex;
            align-items: center;
        }

        .padding {
            padding: 20px;
        }

        .icon {
            font-size: 20px;
            color: $sucColor;
            margin-right: 8px;
        }
    }
}

.divider {
    margin: 0;
}

.bg {
    position: relative;

    &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        background-color: $headerFooter;
        border-bottom-left-radius: 110px;
        width: 100%;
        height: 60%;
        z-index: 0;
    }
}
</style>