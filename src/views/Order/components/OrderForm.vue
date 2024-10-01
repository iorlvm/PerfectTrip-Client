<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from "vue-router";
import { deleteByOrderIdAPI, getOrderByIdAPI, updateOrderAPI } from '@/apis/order';
const props = defineProps([
    'active'
])

const emit = defineEmits([
    'nextActive', 'backActive'
]);

const selectedActive = ref(0);

const goback = () => {
    scrollTop();
    emit('backActive');
}

const nextStep = () => {
    scrollTop();
    emit('nextActive');
    selectedActive.value = 1;
}

const scrollTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}


const formData = ref({
    firstName: '',
    lastName: '',
    email: 'test@test.com',
    region: '',
    phone: '',
    remarks: '',
    freeParking: false,
    arrivalTime: '15:00'
});

const regions = ['USA', 'Canada', 'China', 'Japan', 'Australia'];



const rules = {
    lastName: [
        { required: true, message: '請輸入姓氏', trigger: 'blur' }
    ],
    firstName: [
        { required: true, message: '請輸入名字', trigger: 'blur' }
    ],
    email: [
        { required: true, message: '請輸入電子信箱', trigger: 'blur' },
        { type: 'email', message: '請輸入正確的電子信箱格式', trigger: ['blur', 'change'] }
    ],
    region: [
        { required: true, message: '請選擇國家/地區', trigger: 'change' }
    ],
    phone: [
        { required: true, message: '請輸入電話/手機', trigger: 'blur' },
        { pattern: /^\d{10}$/, message: '請輸入正確的電話/手機格式', trigger: ['blur', 'change'] }
    ],
    remarks: [
        { required: false, message: '請輸入備註', trigger: 'blur' }
    ],
    arrivalTime: [
        { required: false, message: '請選擇抵達時間', trigger: 'change' }
    ]
};


const ruleFormRef = ref(null);
const checkForm = async (formEl) => {
    if (!formEl) return;

    await formEl.validate((valid, fields) => {
        if (valid) {
            nextStep();
        } else {
            console.log('表單驗證失敗！', fields);
        }
    });
};

const isVisible = () => {
    return props.active === 0;
}

const route = useRoute();
const router = useRouter();
const submitForm = async () => {
    const orderId = route.params.id;
    // 把資料送給後端伺服器
    await updateOrderAPI({
        orderId,
        firstName: formData.value.firstName,
        lastName: formData.value.lastName,
        email: formData.value.email,
        country: formData.value.country,
        phone: formData.value.phone,
        remark: formData.value.remarks,
        wishedTime: formData.value.arrivalTime,

    })

    nextStep();
    console.log('前往付款啦!');
    // 轉往付款頁面
    router.push(`/order/pay/${orderId}`);
}

const changeSelected = async () => {
    const orderId = route.params.id;
    await deleteByOrderIdAPI(orderId);
    router.go(-1);
}

const formatPrice = (price) => {
    let format = price;

    return format;
}

const orderData = ref({});

const roomCount = (products) => {
    if (products) {
        let res = 0;
        for (let product of products) {
            res += product.quantity;
        }
        return res;
    }
}

const calculateDaysDifference = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const diffTime = end - start;
    const diffDays = diffTime / (1000 * 60 * 60 * 24);

    return diffDays;
};

const formatScore = (score) => {
    const limitedScore = Math.max(0, Math.min(10, score));

    return limitedScore.toFixed(1);
};

onMounted(async () => {
    const orderId = route.params.id;
    const res = await getOrderByIdAPI(orderId);
    if (!res.success) {
        router.go(-1);
    }
    orderData.value = res.data;
});

</script>

<template>
    <div class="order-view">
        <div class="order-info">
            <div class="info-card hotel-name">
                <h4>旅館</h4>
                <h2>{{ orderData.hotelName }}</h2>
                <p>{{ orderData.hotelAddress }}</p>
                <div class="flex">
                    <div class="number">{{ formatScore(orderData.hotelScore) }}</div>
                    <div class="desc">很讚 - {{ orderData.rateCount }}則評語</div>
                </div>
                <div class="flex">
                    <div class="tag" v-for="(item, index) in orderData.hotelFacilities?.slice(0, 3)" :key="index">
                        <i class="bi bi-check"></i>
                        <span>{{ item }}</span>
                    </div>
                </div>
            </div>
            <div class="info-card selected-room">
                <h3>您的訂房資訊</h3>
                <div class="flex">
                    <div class="date">
                        <p>入住時間</p>
                        <p class="big">{{ orderData.startDate }}</p>
                        <p class="small">15:00 - 22:00</p>
                    </div>
                    <div class="date">
                        <p>退房時間</p>
                        <p class="big check-out">{{ orderData.endDate }}</p>
                        <p class="small">12:00 前</p>
                    </div>
                </div>
                <div class="total-days">
                    <p>總共入住：</p>
                    <span>{{ calculateDaysDifference(orderData.startDate, orderData.endDate) }} 晚</span>
                </div>

                <el-divider class="divider" />
                <p>已選擇：</p>
                <div class="selected">
                    <el-collapse v-model="selectedActive">
                        <el-collapse-item :name="1" :disabled="active !== 0">
                            <template #title>
                                <div class="title" style="color: black;">{{ roomCount(orderData.products) }} 間客房 ( {{
                                    orderData.guestCount }} 位成人 )
                                </div>
                            </template>
                            <p v-for="(product, index) in orderData.products" :key="index">{{ product.quantity }} x {{
                                product.productName }}</p>
                        </el-collapse-item>
                    </el-collapse>
                    <el-link type="primary" @click="changeSelected" v-if="active === 0"><span>更改選擇</span></el-link>
                </div>
            </div>
            <div class="info-card total-price">
                <h3>房價明細</h3>
                <div class="row">
                    <div class="flex">
                        <h4>原價</h4>
                        <p>TWD {{ orderData.fullPrice }}</p>
                    </div>
                </div>
                <div class="row">
                    <div class="flex">
                        <h4>折扣</h4>
                        <p>- TWD {{ orderData.discount }}</p>
                    </div>
                    <p class="small">該住宿正在打折，因此您可享折扣價。</p>
                </div>
                <!-- <div class="row">
                    <div class="flex">
                        <h4>優惠券</h4>
                        <p>- TWD 210</p>
                    </div>
                    <p class="small">您使用了優惠券，因此享有額外折扣。</p>
                </div> -->
                <div class="highlight">
                    <p class="right through"> {{ orderData.fullPrice }}</p>
                    <div class="flex">
                        <h2>總金額</h2>
                        <h2 class="right">{{ orderData.actualPrice }}</h2>
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
                                包含 TWD {{ orderData.tax + orderData.serviceFee }} 稅費與其他費用
                            </h4>
                        </div>
                        <div class="flex">
                            <p>5% 加值稅</p>
                            <p>{{ orderData.tax }}</p>
                        </div>
                        <div class="flex">
                            <p>10% 住宿方服務費</p>
                            <p>{{ formatPrice(orderData.serviceFee) }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="main">
            <div class="order-form">
                <el-form :model="formData" :rules="rules" ref="ruleFormRef" label-position="top" label-width="auto"
                    :status-icon="true" :scroll-to-error="true">
                    <div class="basic-info">
                        <h2>輸入個人資料</h2>
                        <div class="login-status">是否已登入</div>
                        <div class="name-row">
                            <el-form-item label="姓" prop="lastName">
                                <template v-if="isVisible()">
                                    <el-input v-model="formData.lastName" placeholder="請輸入姓氏"></el-input>
                                </template>
                                <template v-else>
                                    <p class="check-value">{{ formData.lastName }}</p>
                                </template>
                            </el-form-item>
                            <el-form-item label="名" prop="firstName">
                                <template v-if="isVisible()">
                                    <el-input v-model="formData.firstName" placeholder="請輸入名字"></el-input>
                                </template>
                                <template v-else>
                                    <p class="check-value">{{ formData.firstName }}</p>
                                </template>
                            </el-form-item>
                        </div>
                        <el-form-item label="電子信箱" prop="email">
                            <template v-if="isVisible()">
                                <el-input v-model="formData.email" placeholder="請輸入電子信箱"></el-input>
                            </template>
                            <template v-else>
                                <p class="check-value">{{ formData.email }}</p>
                            </template>
                        </el-form-item>
                        <el-form-item label="國家/地區" prop="region">
                            <template v-if="isVisible()">
                                <el-select v-model="formData.region" placeholder="請選擇國家/地區">
                                    <el-option v-for="item in regions" :key="item" :label="item" :value="item" />
                                </el-select>
                            </template>
                            <template v-else>
                                <p class="check-value">{{ formData.region }}</p>
                            </template>
                        </el-form-item>
                        <el-form-item label="電話/手機" prop="phone">
                            <template v-if="isVisible()">
                                <el-input v-model="formData.phone" placeholder="請輸入電話/手機"></el-input>
                            </template>
                            <template v-else>
                                <p class="check-value">{{ formData.phone }}</p>
                            </template>
                        </el-form-item>
                    </div>

                    <div class="remarks-block">
                        <template v-if="isVisible()">
                            <h3>您還有什麼特別要求？</h3>
                            <p class="desc">住宿方無法保證達成您的特殊要求，但將盡力為您安排，訂單完成後，您依然可隨時提出特殊要求！</p>
                        </template>
                        <template v-else>
                            <h3>
                                特別需求
                            </h3>
                        </template>
                        <el-form-item class="remarks-text" prop="remarks">
                            <template #label>
                                <template v-if="isVisible()">
                                    <span>請用英語或是中文填寫您的請求 </span>
                                    <span class="note"> ( 選填 )</span>
                                </template>
                            </template>
                            <template v-if="isVisible()">
                                <el-input v-model="formData.remarks" type="textarea" placeholder="請輸入備註"></el-input>
                            </template>
                            <template v-else>
                                <p class="check-value">
                                    <template v-if="!formData.freeParking && formData.remarks.trim() === ''">
                                        無
                                    </template>
                                    <template v-else>
                                        {{ formData.remarks }}
                                        <br v-if="formData.remarks.trim() !== '' && formData.freeParking">
                                        {{ formData.freeParking ? '我需要額外的免費私人停車位' : '' }}
                                    </template>
                                </p>
                            </template>
                        </el-form-item>
                        <el-form-item v-if="isVisible()">
                            <el-checkbox class="free-parking-check-box" v-model="formData.freeParking">我想要免費私人停車位
                                (額外)</el-checkbox>
                        </el-form-item>
                        <h3>您的抵達時間</h3>
                        <template v-if="isVisible()">
                            <p class="center"><span class="check-icon"><i class="bi bi-check-circle"></i></span>您可在
                                14:00 -
                                20:00 間入住</p>
                            <el-form-item class="arrival-time-select" label="提供您預計的抵達時間" prop="arrivalTime">
                                <el-time-select v-model="formData.arrivalTime" format="HH:mm" :clearable="false"
                                    start="14:00" step="00:30" end="20:00" placeholder="選擇時間"></el-time-select>
                            </el-form-item>
                        </template>
                        <template v-else>
                            <el-form-item class="arrival-time-select">
                                <p class="check-value">
                                    {{ formData.arrivalTime }}
                                </p>
                            </el-form-item>
                        </template>


                        <div class="rule">
                            <h3>查看住宿規定</h3>
                            <p>&nbsp;住宿方需要您同意以下住宿規定：</p>
                            <p><i class="bi bi-dot"></i>&nbsp;禁止吸菸</p>
                            <p><i class="bi bi-dot"></i>&nbsp;禁止攜帶寵物入住</p>
                            <p>&nbsp;若繼續下一步，代表您同意住宿規定</p>
                        </div>
                    </div>
                    <div class="button-block">
                        <template v-if="isVisible()">
                            <el-button @click="checkForm(ruleFormRef)" size="large"
                                type="primary">下一步：最後資料確認&nbsp;<el-icon>
                                    <ArrowRightBold />
                                </el-icon></el-button>
                        </template>
                        <template v-else>
                            <el-button @click="goback" size="large" type="info" plain><el-icon>
                                    <ArrowLeftBold />
                                </el-icon>再次確認個人資料&nbsp;</el-button>
                            <el-button @click="submitForm" size="large" type="primary"><el-icon>
                                    <Lock />
                                </el-icon>&nbsp;前往付款</el-button>
                        </template>
                    </div>
                </el-form>
            </div>
        </div>
    </div>


</template>



<style lang="scss">
.free-parking-check-box {
    --el-checkbox-checked-text-color: var(--el-color-success);
    --el-checkbox-checked-bg-color: var(--el-color-success);
}

.order-form {
    .el-form-item__label {
        font-weight: bold;
    }
}

.selected-room {
    .el-collapse {
        --el-collapse-border-color: transparent;
    }
}
</style>

<style lang="scss" scoped>
.order-view {
    display: flex;
    padding: 20px;

    .main {
        flex-grow: 1;
    }

    .order-info {
        flex-shrink: 0;
        margin-right: 35px;
        width: 350px;

        .info-card {
            margin-bottom: 25px;
            padding: 10px 20px 15px;
            border: 1px solid #00000020;
            border-radius: 8px;
            box-shadow: 0 1px 3px -1px #00000020;

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
    }
}

.flex {
    display: flex;
    align-items: center;
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
    .divider {
        margin: 10px 0;
    }

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

        .check-out {
            position: relative;

            &::before {
                content: "";
                position: absolute;
                left: -17px;
                top: 50%;
                transform: translateY(-50%);
                width: 1px;
                height: 116%;
                background-color: #00000025;
            }
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
            left: -20px;
            right: -20px;
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

.order-form {
    padding: 10px 30px 10px 20px;
    border: 1px solid #00000025;
    border-radius: 8px;
    box-shadow: 0 1px 3px -1px #00000020;

    .el-form-item {
        margin-bottom: 25px;
    }

    .basic-info {
        h2 {
            font-size: 1.45em;
            margin: 10px 0;
        }

        .login-status {
            height: 70px;
            margin: 15px auto;
            background-color: #f3e9e9d7;
            border: 1px solid #00000049;
            border-radius: 10px;
        }

        .el-form-item {
            width: 48%;
            margin-right: 15px;

            &:last-child {
                margin-right: 0;
            }
        }

        .name-row {
            display: flex;
        }

    }

    .remarks-block {
        width: 100%;
        max-width: 560px;

        h3 {
            font-size: 1.35em;
            margin: 5px 0;
        }

        p {
            color: #2a2a2a;
            font-size: 0.9em;
            margin: 6px 0 12px;
        }

        .center {
            display: flex;
            align-items: center;

            span {
                margin-right: 10px;
            }
        }



        .remarks-text {
            margin-bottom: 3px;
        }

        .desc {
            opacity: 0.75;
        }

        .note {
            font-size: 0.85em;
            font-weight: lighter;
        }

        .check-icon {
            color: green;
            font-size: 1.8em;
        }

        .arrival-time-select {
            width: 45%;
        }

        .rule {
            margin-bottom: 50px;

            p {
                margin: 8px 0;

                &:nth-child(2),
                &:last-child {
                    font-size: 1.05em;
                }
            }
        }
    }

    .button-block {
        margin-bottom: 10px;
        display: flex;
        justify-content: end;

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

    .check-value {
        color: #3f5976 !important;
        font-size: 1.1em !important;
        font-weight: bold;
        padding: 5px 12px;
        background-color: #f4f0f0;
        border-radius: 10px;
    }
}
</style>