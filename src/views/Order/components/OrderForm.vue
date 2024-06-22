<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from "vue-router";

const props = defineProps([
    'active'
])

const emit = defineEmits([
    'nextActive', 'backActive'
]);

const goback = () => {
    scrollTop();
    emit('backActive');
}

const nextStep = () => {
    scrollTop();
    emit('nextActive');
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
            console.log('表單驗證通過！', formData.value);
            nextStep();
        } else {
            console.log('表單驗證失敗！', fields);
        }
    });
};

const isDisable = () => {
    return props.active !== 1;
}

const route = useRoute();
const router = useRouter();
const submitForm = () => {
    const orderId = route.params.id;
    // 把資料送給後端伺服器
    nextStep();
    console.log('真的把資料送出去啦!');
    router.push(`/order/created/${orderId}`);
}


onMounted(() => {
    //const orderId = route.params.id;
    //TODO 利用這個值去撈資料
});

</script>

<template>
    <div class="order-form">
        <el-form :model="formData" :rules="rules" ref="ruleFormRef" label-position="top" label-width="auto"
            :status-icon="true" :scroll-to-error="true">
            <div class="basic-info">
                <h2>輸入個人資料</h2>
                <div class="login-status">是否已登入</div>
                <div class="name-row">
                    <el-form-item label="姓" prop="lastName">
                        <el-input v-model="formData.lastName" placeholder="請輸入姓氏" :disabled="isDisable()"></el-input>
                    </el-form-item>
                    <el-form-item label="名" prop="firstName">
                        <el-input v-model="formData.firstName" placeholder="請輸入名字" :disabled="isDisable()"></el-input>
                    </el-form-item>
                </div>
                <el-form-item label="電子信箱" prop="email">
                    <el-input v-model="formData.email" placeholder="請輸入電子信箱" :disabled="isDisable()"></el-input>
                </el-form-item>
                <el-form-item label="國家/地區" prop="region">
                    <el-select v-model="formData.region" placeholder="請選擇國家/地區" :disabled="isDisable()">
                        <el-option v-for="item in regions" :key="item" :label="item" :value="item" />
                    </el-select>
                </el-form-item>
                <el-form-item label="電話/手機" prop="phone">
                    <el-input v-model="formData.phone" placeholder="請輸入電話/手機" :disabled="isDisable()"></el-input>
                </el-form-item>
            </div>

            <div class="remarks-block">
                <h3>您還有什麼特別要求？</h3>
                <p class="desc">住宿方無法保證達成您的特殊要求，但將盡力為您安排，訂單完成後，您依然可隨時提出特殊要求！</p>
                <el-form-item class="remarks-text" prop="remarks">
                    <template #label>
                        <span>請用英語或是中文填寫您的請求</span>
                        <span class="note"> ( 選填 )</span>
                    </template>
                    <el-input v-model="formData.remarks" type="textarea" placeholder="請輸入備註"
                        :disabled="isDisable()"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-checkbox class="free-parking-check-box" v-model="formData.freeParking"
                        :disabled="isDisable()">我想要免費私人停車位
                        (額外)</el-checkbox>
                </el-form-item>
                <h3>您的抵達時間</h3>
                <p class="center"><span class="check-icon"><i class="bi bi-check-circle"></i></span>您可在 14:00 -
                    20:00 間入住</p>
                <el-form-item class="arrival-time-select" label="提供您預計的抵達時間" prop="arrivalTime">
                    <el-time-select v-model="formData.arrivalTime" format="HH:mm" :clearable="false" start="14:00"
                        step="00:30" end="20:00" placeholder="選擇時間" :disabled="isDisable()"></el-time-select>
                </el-form-item>
                <div class="rule">
                    <h3>查看住宿規定</h3>
                    <p>&nbsp;住宿方需要您同意以下住宿規定：</p>
                    <p><i class="bi bi-dot"></i>&nbsp;禁止吸菸</p>
                    <p><i class="bi bi-dot"></i>&nbsp;禁止攜帶寵物入住</p>
                    <p>&nbsp;若繼續下一步，代表您同意住宿規定</p>
                </div>
            </div>
            <div class="button-block">
                <template v-if="active === 1">
                    <el-button @click="checkForm(ruleFormRef)" size="large" type="primary">下一步：最後資料確認&nbsp;<i
                            class="bi bi-chevron-right"></i></el-button>
                </template>
                <template v-else-if="active === 2">
                    <el-button @click="goback" size="large" type="info" plain><i
                            class="bi bi-chevron-left"></i>再次確認個人資料&nbsp;</el-button>
                    <el-button @click="submitForm" size="large" type="primary"><i
                            class="bi bi-lock"></i>&nbsp;完成訂房</el-button>
                </template>
            </div>
        </el-form>
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
</style>

<style lang="scss" scoped>
.order-form {
    padding: 10px 30px 10px 20px;
    border: 1px solid #00000025;
    border-radius: 8px;
    box-shadow: 0 4px 8px -2px #00000020;

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
    }
}
</style>