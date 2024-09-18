<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router';
import { companyRegisterAPI } from '@/apis/company';

const router = useRouter();

//company_name=email
const form = ref({
    companyName: '',
    username: '',
    password: '',
    password_check: '',
    country: '台灣',
    city: '',
    address: '',
    manager: '',
    regionNumber: '',
    telephone: '',
    vatNumber: '',

});


const validatePasswordCheck = (rule, value, callback) => {
    if (form.value.password_check !== form.value.password) {
        callback(new Error('兩次輸入的密碼不一致'));
    } else {
        callback();
    }
};

const rules = {

    companyName: [
        { required: true, message: '請輸入刊登名稱', trigger: 'blur' }
    ],
    username: [
        { required: true, message: '請輸入電子信箱', trigger: 'blur' },
        { type: 'email', message: '請輸入正確的電子信箱格式', trigger: ['blur', 'change'] }
    ],
    password: [
        { required: true, message: '請輸入密碼', trigger: 'blur' }
    ],
    password_check: [
        { required: true, message: '再次輸入密碼', trigger: 'blur' },
        { validator: validatePasswordCheck, trigger: ['blur', 'change'] }
    ],
    country: [
        { required: true, message: '請輸入國家', trigger: 'blur' }
    ],
    city: [
        { required: true, message: '請輸入縣/市', trigger: 'blur' }
    ],
    address: [
        { required: true, message: '請輸入地址', trigger: 'blur' }
    ],
    manager: [
        { required: true, message: '請輸入負責人', trigger: 'change' }
    ],

    telephone: [
        { required: true, message: '請輸入電話', trigger: 'blur' },
        { pattern: /^\d{7}$/, message: '請輸入正確的電話', trigger: ['blur', 'change'] }
    ],
    regionNumber: [
        { required: true, message: '請輸入區碼', trigger: 'blur' },
    ],
    vatNumber: [
        { required: true, message: '請輸入統一編號', trigger: 'blur' },
        { pattern: /^\d{8}$/, message: '請輸入正確的統一編號(8位數字)', trigger: ['blur', 'change'] }
    ],
};

const ruleFormRef = ref(null);

const resetForm = () => {
    if (ruleFormRef.value) {
        ruleFormRef.value.resetFields(); // 重設所有欄位
    }
};

const register = async (e) => {
    e.preventDefault();//阻止表單進行自動刷新或導航到新的頁面

    let companyName = form.value.companyName;
    let username = form.value.username;
    let password = form.value.password;
    let country = form.value.country;
    let city = form.value.city;
    let address = form.value.address;
    let manager = form.value.manager;
    let telephone = form.value.regionNumber + form.value.telephone;
    let vatNumber = form.value.vatNumber
    // console.log({username, password, companyName, vatNumber, address, telephone})
    await companyRegisterAPI({ username, password, companyName, vatNumber, country, city, address, manager, telephone });
    // console.log({username, password, companyName, vatNumber, address, telephone})

    router.push('/store/manage');//討論導主頁?
}



</script>

<template>
    <div>
        <div class="form_container">
            <div class="storeregister">
                <el-form :model="form" :rules="rules" ref="ruleFormRef" label-width="auto" style="max-width: 600px"
                    :status-icon="true" :scroll-to-error="true">

                    <el-form-item label="刊登名稱" prop="companyName">
                        <div>
                            <el-input type="text" placeholder="請輸入刊登名稱" v-model="form.companyName" required></el-input>
                        </div>
                    </el-form-item>
                    <el-form-item label="電子信箱" prop="username">
                        <div>
                            <el-input class="username" type="text" placeholder="電子信箱即為登入帳號" v-model="form.username"
                                required></el-input>
                        </div>
                    </el-form-item>
                    <el-form-item label="登入密碼" prop="password">
                        <div>
                            <el-input type="text" placeholder="請輸入密碼" v-model="form.password" required></el-input>
                        </div>
                    </el-form-item>
                    <el-form-item label="再次輸入密碼" prop="password_check">
                        <div>
                            <el-input type="text" placeholder="請輸入密碼" v-model="form.password_check" required></el-input>
                        </div>
                    </el-form-item>

                    <div class="site" style="display: flex; align-items: center; justify-content: space-between;">
                        <el-form-item label="營業地址" prop="country" style="flex: 1; margin-right: 10px;">
                            <el-input type="text" class="country" placeholder="台灣" v-model="form.country"
                                disabled></el-input>
                        </el-form-item>

                        <el-form-item  prop="city" style="flex: 2; margin-right: 10px;">
                            <el-input type="text" class="city" placeholder="縣/市 ex:台北市" v-model="form.city"
                                required></el-input>
                        </el-form-item>

                        <el-form-item  prop="address" style="flex: 7;">
                            <el-input type="text" class="address" placeholder="請輸入營業地址" v-model="form.address"
                                required></el-input>
                        </el-form-item>
                    </div>

                    <el-form-item label="負責人姓名" prop="manager">
                        <div>
                            <el-input type="text" placeholder="請輸入負責人名稱" v-model="form.manager" required></el-input>
                        </div>
                    </el-form-item>

                    <div class="phone" style="display: flex; align-items: center;">

                        <el-form-item label="連絡電話" prop="regionNumber">
                            <div class="country_code" style="display: flex; align-items: center;">
                                <el-input type="text" placeholder="ex:03" v-model="form.regionNumber"
                                    required></el-input>
                            </div>
                        </el-form-item>

                        <el-form-item label="" prop="telephone">
                            <div style="display: flex; align-items: center;">
                                <el-input type="text" placeholder="請輸入電話" v-model="form.telephone" required></el-input>
                            </div>
                        </el-form-item>
                    </div>

                    <el-form-item label="統一編號" prop="vatNumber">
                        <div>
                            <el-input type="text" placeholder="請輸入統一編號" v-model="form.vatNumber" required></el-input>
                        </div>
                    </el-form-item>


                </el-form>
                <div class="button">
                    <el-button type="danger" @click="resetForm()">清除</el-button>
                    <el-button type="primary" @click="register">註冊</el-button>
                </div>

            </div>
        </div>
    </div>



</template>





<style lang="scss" scoped>
.form_container {
    // border: 1px solid #00000025;
    // height: 100vh; // 讓容器充滿整個視窗高度
    width: 70%;
    text-align: center;
    margin: 50px auto;
}



.storeregister {
    padding: 75px 150px;
    border: 1px solid #00000025;
    border-radius: 8px;
    box-shadow: 0 1px 3px -1px #00000020;

    .phone {
        display: flex;
    }

    .country_code {
        width: 80px;
    }


    .country {
        width: 100px;
    }

    .city {
        width: 100px;
    }

    .address {
        width: 380px;
    }

    .username {
        width: 460px;
    }

    .free-parking-check-box {
        --el-checkbox-checked-text-color: var(--el-color-success);
        --el-checkbox-checked-bg-color: var(--el-color-success);
    }


    .el-form-item__label {
        font-weight: bold;
    }

    .button {
        display: flex;
        justify-content: center;
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