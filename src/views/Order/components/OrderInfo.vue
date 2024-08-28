<script setup>

</script>

<template>
    <el-divider>訂購資訊</el-divider>
    <div class="order-info">
        <div class="info-card">
            <h2>住客資料</h2>
            <div class="customer">
                <div class="info">
                    <div class="label">姓名：</div>
                    <div class="value">張三</div>
                </div>
                <div class="info">
                    <div class="label">國家：</div>
                    <div class="value">Taiwan</div>
                </div>
                <div class="info">
                    <div class="label">電話：</div>
                    <div class="value">0900123456</div>
                </div>
                <div class="info">
                    <div class="label">電子信箱：</div>
                    <div class="value">test@test.com</div>
                </div>
                <div class="info">
                    <div class="label">抵達時間：</div>
                    <div class="value">15:00</div>
                </div>
                <div class="info">
                    <div class="label">特別需求：</div>
                    <div class="value">無</div>
                </div>
            </div>
        </div>
    </div>
    <el-divider>訂單明細</el-divider>
    <div class="order-info">
        <div class="info-card hotel-name">
            <h4>民宿</h4>
            <h2>旅館名稱</h2>
            <p>旅館地址 旅館地址XXX路 XXX 號 XX樓</p>
            <div class="flex">
                <div class="number">9.2</div>
                <div class="desc">很讚 - 9,999則評語</div>
            </div>
            <div class="flex">
                <div class="tag">
                    <i class="bi bi-exclamation-circle"></i>
                    <span>免費無線網路</span>
                </div>
                <div class="tag">
                    <i class="bi bi-exclamation-circle"></i>
                    <span>停車場</span>
                </div>
            </div>
        </div>
        <el-divider class="divider" />
        <div class="info-card selected-room">
            <h3>您的訂房資訊</h3>
            <div class="flex">
                <div class="date">
                    <p>入住時間</p>
                    <p class="big">2024 年 7 月 8 日 ( 一 )</p>
                    <p class="small">15:00 - 22:00</p>
                </div>
                <div class="date">
                    <p>退房時間</p>
                    <p class="big">2024 年 7 月 9 日 ( 二 )</p>
                    <p class="small">12:00 前</p>
                </div>
            </div>
            <div class="total-days">
                <p>總共入住：</p>
                <span>1 晚</span>
            </div>
            <el-divider class="divider" />
            <h3>訂購內容：</h3>
            <div class="selected">
                <p>1 x 標準雙人或雙床房</p>
                <p>3 x 高級雙人或雙床房</p>
                <p>1 x 豪華雙人或雙床房</p>
            </div>
        </div>
        <el-divider class="divider" />
        <div class="info-card total-price">
            <h3>房價明細</h3>
            <div class="row">
                <div class="flex">
                    <h4>原價</h4>
                    <p>TWD 2,104</p>
                </div>
            </div>
            <div class="row">
                <div class="flex">
                    <h4>折扣</h4>
                    <p>- TWD 492</p>
                </div>
                <p class="small">該住宿正在打折，因此您可享折扣價。</p>
            </div>
            <div class="row">
                <div class="flex">
                    <h4>優惠券</h4>
                    <p>- TWD 210</p>
                </div>
                <p class="small">您使用了優惠券，因此享有額外折扣。</p>
            </div>
            <div class="highlight">
                <p class="right through">TWD 2,104</p>
                <div class="flex">
                    <h2>總金額</h2>
                    <h2 class="right">TWD 1,401</h2>
                </div>
                <p class="right">含稅費與其他費用</p>
            </div>
            <div class="price-info">
                <h3>價格資訊</h3>
                <div>
                    <div class="desc">
                        <el-icon size="20">
                            <PriceTag />
                        </el-icon>
                        <h4>
                            包含 TWD 188 稅費與其他費用
                        </h4>
                    </div>
                    <div class="flex">
                        <p>5% 加值稅</p>
                        <p>TWD 61</p>
                    </div>
                    <div class="flex">
                        <p>10% 住宿方服務費</p>
                        <p>TWD 127</p>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>


<style lang="scss" scoped>
.divider {
    margin: 10px 0;
}

.flex {
    display: flex;
    align-items: center;
}

.order-success {
    .desc {
        font-size: 1.1em;
    }

    .success-icon {
        color: $sucColor;
        font-size: 8em;
    }

}


.order-info {
    .info-card {
        padding: 10px 3% 15px;

        h2 {
            font-size: 1.4em;
            margin: 6px 0;
            letter-spacing: 1px;
        }

        h3 {
            font-size: 1.25em;
            letter-spacing: 1px;
            margin: 8px 0;
        }

        h4 {
            letter-spacing: 1px;
            margin-top: 2px;
            font-size: 1.05em;
        }
    }

    .customer {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;

        .info {
            min-width: 320px;
            width: 45%;
            margin-bottom: 20px;

            &:last-child {
                width: 100%;

                .value {
                    min-height: 5em;
                }
            }
        }

        .label {
            font-size: 1.2em;
            font-weight: bold;
            letter-spacing: 1px;
            margin-bottom: 5px;
            margin-left: 5px;
        }

        .value {
            color: #3f5976 !important;
            font-size: 1.1em !important;
            font-weight: bold;
            padding: 7px 15px;
            background-color: #f4f0f0;
            border-radius: 10px;
        }
    }

    .hotel-name {
        .number {
            margin-right: 7px;
            font-size: 1.15em;
            font-weight: bold;
            width: 2em;
            height: 2em;
            color: #eeeeee;
            background-color: $headerFooter;
            text-align: center;
            line-height: 2;
            border-radius: 5px;
        }

        p {
            font-size: 1.1em;
            margin: 10px 0;
        }

        .desc {
            font-size: 1.1em;
        }

        .tag {
            font-size: 1.1em;
            display: flex;
            align-items: center;
            margin-top: 10px;

            span {
                font-weight: bold;
                margin: 0 15px 0 5px;
            }
        }
    }

    .selected-room {
        p {
            font-size: 1.05em;
            margin: 5px 0;
        }

        span {
            font-size: 1.15em;
            letter-spacing: 1px;
            font-weight: bold;
        }

        .date {
            width: calc(50% - 1px);
            margin-bottom: 10px;

            .big {
                margin: 6px 0;
                font-size: 1.15em;
                font-weight: bold;
            }

            .small {
                font-size: 0.98em;
                opacity: 0.85;
            }

            &:first-child {
                margin-right: 28px;
            }
        }

        .selected {
            .title {
                font-size: 1.2em;
                font-weight: bold;
            }
        }
    }

    .total-price {
        .flex {
            justify-content: space-between;
        }

        .row {
            margin: 8px 0;
        }

        .small {
            opacity: 0.8;
        }

        .right {
            text-align: right;
        }

        .through {
            color: $priceColor;
            text-decoration: line-through;
        }

        .highlight {
            padding: 12px 0;
            position: relative;

            &::before {
                content: "";
                position: absolute;
                left: calc(-3% - 12px);
                right: calc(-3% - 12px);
                top: 0;
                bottom: 0;
                background-color: #509cff1c;
                border-bottom: 1px solid #00000012;
                border-top: 1px solid #00000012;
            }
        }

        .price-info {
            .desc {
                display: flex;
                align-items: center;
                margin: 15px 0 7px;

                h4 {
                    margin: 0 0 0 11px;
                }
            }

            p {
                margin: 5px 0 5px 30px;
            }
        }
    }
}
</style>