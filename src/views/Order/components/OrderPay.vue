<script setup>
import '@/utils/tpdirect-v5.14.0';
import OrderInfo from './OrderInfo.vue';
import { onMounted, ref } from 'vue';
import { ElMessage } from 'element-plus';
import { useRoute, useRouter } from "vue-router";
import { useUserStore } from '@/stores/user';
import { paymentAPI } from '@/apis/pay';

const isVisible = ref(false);
const isProcessing = ref(false);
const userStore = useUserStore();

const props = defineProps([
    'active'
])

const orderId = ref('');



const cardholder = ref({
    phoneNumber: userStore.userInfo.phoneNumber,
    name: userStore.userInfo.firstName + userStore.userInfo.lastName,
    email: userStore.userInfo.username
});

const emit = defineEmits([
    'nextActive', 'backActive'
]);

const nextStep = () => {
    emit('nextActive');
}

const route = useRoute();
const router = useRouter();
const payProcess = () => {
    // 避免重複點擊
    isProcessing.value = true;
    TPDirect.card.getPrime((result) => {
        if (result.status !== 0) {
            ElMessage('取得 Prime 時發生錯誤：' + result.msg);
            isProcessing.value = false;
            return;
        }
        // TODO: 使用取得的 Prime 進行後續的付款流程

        sendPayment(result.card.prime);
    });
};

const sendPayment = async (prime) => {
    const res = await paymentAPI(
        orderId.value,
        prime,
        'Test',
        cardholder.value.name,
        cardholder.value.phoneNumber,
        cardholder.value.email
    );

    if (res.success && res.data.status === 0) {
        // 跳轉到訂單完成畫面
        router.push(`/order/created/${orderId.value}`);
    } else {
        // 跳出錯誤訊息
        ElMessage.error(res.errorMsg);
        isProcessing.value = false;
    }
}

const initTPDirect = () => {
    // 編輯器看不到所以顯示紅字, 但其實沒有錯誤
    TPDirect.setupSDK(153356, 'app_qNbtbMKcbUtRO4DDy918LLt6HJWOb9Qd93zi9QHF0QnnUxo7oaPQqAPt5VO6', 'sandbox');
    TPDirect.card.setup({
        fields: {
            number: {
                // css selector
                element: '#card-number',
                placeholder: '**** **** **** ****'
            },
            expirationDate: {
                // DOM object
                element: document.getElementById('card-expiration-date'),
                placeholder: 'MM / YY'
            },
            ccv: {
                element: '#card-ccv',
                placeholder: 'ccv'
            }
        },
        styles: {
            // Style all elements
            'input': {
                'color': 'gray'
            },
            // Styling ccv field
            'input.ccv': {
                // 'font-size': '16px'
            },
            // Styling expiration-date field
            'input.expiration-date': {
                // 'font-size': '16px'
            },
            // Styling card-number field
            'input.card-number': {
                // 'font-size': '16px'
            },
            // style focus state
            ':focus': {
                // 'color': 'black'
            },
            // style valid state
            '.valid': {
                'color': 'green'
            },
            // style invalid state
            '.invalid': {
                'color': 'red'
            },
            // Media queries
            // Note that these apply to the iframe, not the root window.
            '@media screen and (max-width: 400px)': {
                'input': {
                    'color': 'orange'
                }
            }
        },
        // 此設定會顯示卡號輸入正確後，會顯示前六後四碼信用卡卡號
        isMaskCreditCardNumber: true,
        maskCreditCardNumberRange: {
            beginIndex: 6,
            endIndex: 11
        }
    });
}

onMounted(() => {
    orderId.value = route.params.id;

    // 不知道為什麼用while會失效  只好寫的這麼醜陋了
    if (props.active < 2) {
        nextStep();
    }
    if (props.active < 2) {
        nextStep();
    }

    initTPDirect();
})

</script>

<template>
    <div class="order-pay">
        <div class="checkout-container">
            <!-- 簡單的訂單資訊 -->
            <div class="summary-info">
                <h2>訂單資訊</h2>
                <div class="info-item">
                    <span class="info-label">旅館名稱：</span>
                    <span class="info-value">豪華酒店</span>
                </div>
                <div class="info-item">
                    <span class="info-label">房間數量：</span>
                    <span class="info-value">2</span>
                </div>
                <div class="info-item">
                    <span class="info-label">住宿日期：</span>
                    <span class="info-value">2024/09/01 - 2024/09/05</span>
                </div>
                <div class="info-item">
                    <span class="info-label">總金額：</span>
                    <span class="info-value">$5,000</span>
                </div>
            </div>

            <!-- 支付表單 -->
            <div class="payment-form">
                <h2>信用卡支付</h2>
                <div class="full">
                    <label for="cardholder-name" class="input-label">持卡人姓名</label>
                    <el-input id="cardholder-name" v-model="cardholder.name" placeholder="持卡人姓名" size="large" clearable
                        class="input-custom" />
                </div>
                <div class="full">
                    <label class="input-label" for="card-number">卡號</label>
                    <div class="tpfield" id="card-number"></div>
                </div>

                <div class="half">
                    <label class="input-label" for="card-expiration-date">有效日期</label>
                    <div class="tpfield" id="card-expiration-date"></div>
                </div>
                <div class="half">
                    <label class="input-label" for="card-ccv">安全碼 (CVV)</label>
                    <div class="tpfield" id="card-ccv"></div>
                </div>
                <div class="full">
                    <label for="cardholder-phone" class="input-label">手機</label>
                    <el-input id="cardholder-phone" v-model="cardholder.phoneNumber" placeholder="手機" size="large"
                        clearable class="input-custom" />
                </div>
                <div class="full">
                    <label for="cardholder-email" class="input-label">電子信箱</label>
                    <el-input id="cardholder-email" v-model="cardholder.email" placeholder="電子信箱" size="large" clearable
                        class="input-custom" />
                </div>

                <el-button type="primary" size="large" @click="payProcess" :disabled="isProcessing">提交支付</el-button>
            </div>
        </div>
        <div class="show-detail" v-if="!isVisible" @click="isVisible = true">
            顯示明細&nbsp;
            <el-icon>
                <ArrowDownBold />
            </el-icon>
        </div>
        <template v-else>
            <OrderInfo />
        </template>
    </div>
</template>

<style lang="scss" scoped>
.show-detail {
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 1;
    font-size: 1.3em;
    margin: 0 auto 10px;
    cursor: pointer;

    &:hover {
        color: #66b1ff;
    }

    &:active {
        color: #1d8ce0;
    }
}

.order-pay {
    padding: 10px;
    margin: 20px;
    border: 1px solid #00000025;
    border-radius: 8px;
    box-shadow: 0 1px 3px -1px #00000020;

    .divider {
        margin: 10px 0;
    }

    .flex {
        display: flex;
        align-items: center;
    }

    .checkout-container {
        max-width: 960px;
        display: flex;
        justify-content: center;
        gap: 20px;
        margin: 40px auto;

        .summary-info {
            width: 45%;
            padding: 20px;
            background-color: #f9f9f9;
            border-radius: 10px;
            box-shadow: 0 1px 3px -1px #00000020;

            h2 {
                font-size: 20px;
                margin-bottom: 20px;
                color: #333;
            }

            .info-item {
                margin-bottom: 15px;
            }

            .info-label {
                font-weight: bold;
                color: #666;
            }

            .info-value {
                float: right;
                color: #333;
            }
        }

        .payment-form {
            width: 45%;
            padding: 20px;
            display: flex;
            flex-wrap: wrap;
            gap: 10px;

            .full {
                width: 90%;
                flex-grow: 1;
            }

            .half {
                width: 45%;
                flex-grow: 1;
            }

            .input-label {
                display: block;
                margin-bottom: 10px;
                color: #333;
                font-weight: bold;
            }


            .tpfield {
                width: 100%;
                height: 35px;
                border: 1px solid #dcdfe6;
                border-radius: 4px;
                padding: 8px 12px;
                background-color: white;
                margin-top: 10px;
                transition: border-color 0.3s ease;
            }
        }
    }

    .el-button {
        margin: 20px 15px 0px;
        font-weight: bold;
    }

    .el-button--primary {
        --el-color-primary: #f7c411;
        --el-button-text-color: $headerFooter;
        --el-button-hover-text-color: $headerFooter;
        --el-button-hover-bg-color: #f9d658;
        --el-button-outline-color: #fbe288;
        --el-button-active-color: #c69d0e;
        --el-button-hover-link-text-color: #fbe288;
        --el-button-hover-border-color: #f9d658;
        --el-button-active-bg-color: #c69d0e;
        --el-button-active-border-color: #c69d0e;
        --el-button-disabled-text-color: #ffffff;
        --el-button-disabled-bg-color: #fbe288;
        --el-button-disabled-border-color: #fbe288;
        font-weight: bold;
    }
}
</style>