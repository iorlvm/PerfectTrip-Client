<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router';
import { companyRegisterAPI } from '@/apis/company';
import { ElMessage } from 'element-plus';

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
    try {
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
        const res = await companyRegisterAPI({ username, password, companyName, vatNumber, country, city, address, manager, telephone });

        if(res.success){
            ElMessage.success('商家註冊成功');
            router.push('/store/manage');//討論導主頁?
        }else{
            ElMessage.error('商家註冊失敗,請重試')
        }
    }catch(error){
        console.error('提交表單發生錯誤:', error);
        ElMessage.error('商家資訊更新失敗，請稍後重試！');
    }
    

   
}
</script>

<template>
    <div class="form_container container">
        <h2>註冊商家</h2>
        <div class="storeregister">
            <el-form :model="form" :rules="rules" ref="ruleFormRef" label-width="auto"
                style="margin: 0 auto; max-width: 600px" :status-icon="true" :scroll-to-error="true">

                <el-form-item label="刊登名稱" prop="companyName">
                    <el-input type="text" placeholder="請輸入刊登名稱" v-model="form.companyName" required></el-input>
                </el-form-item>

                <el-form-item label="電子信箱" prop="username">
                    <el-input type="text" placeholder="電子信箱即為登入帳號" v-model="form.username" required></el-input>
                </el-form-item>

                <el-form-item label="登入密碼" prop="password">
                    <el-input type="password" placeholder="請輸入密碼" v-model="form.password" required></el-input>
                </el-form-item>

                <el-form-item label="再次輸入密碼" prop="password_check">
                    <el-input type="password" placeholder="請再次輸入密碼" v-model="form.password_check" required></el-input>
                </el-form-item>

                <div class="site">
                    <el-form-item label="營業地址" prop="country" class="country">
                        <el-input type="text" placeholder="台灣" v-model="form.country" disabled></el-input>
                    </el-form-item>

                    <el-form-item prop="city" class="city">
                        <el-input type="text" placeholder="縣/市 ex:台北市" v-model="form.city" required></el-input>
                    </el-form-item>
                </div>

                <el-form-item prop="address" label=" " class="address">
                    <el-input type="text" placeholder="請輸入營業地址" v-model="form.address" required></el-input>
                </el-form-item>

                <el-form-item label="負責人姓名" prop="manager">
                    <el-input type="text" placeholder="請輸入負責人名稱" v-model="form.manager" required></el-input>
                </el-form-item>

                <div class="phone">
                    <el-form-item label="連絡電話" prop="regionNumber" class="regionNumber">
                        <el-input type="text" placeholder="ex:03" v-model="form.regionNumber" required></el-input>
                    </el-form-item>

                    <el-form-item prop="telephone" class="telephone">
                        <el-input type="text" placeholder="請輸入電話" v-model="form.telephone" required></el-input>
                    </el-form-item>
                </div>

                <el-form-item label="統一編號" prop="vatNumber">
                    <el-input type="text" placeholder="請輸入統一編號" v-model="form.vatNumber" required></el-input>
                </el-form-item>

            </el-form>

            <div class="button-block">
                <el-button type="danger" @click="resetForm()">清除</el-button>
                <el-button type="primary" @click="register">註冊</el-button>
            </div>

        </div>
    </div>
</template>

<style lang="scss">
.address {
    .el-form-item__label-wrap {
        label {
            opacity: 0;
        }
    }
}
</style>

<style lang="scss" scoped>
.form_container {
    width: 60%;
    text-align: center;
    margin: 50px auto;
}

.storeregister {

    .site {
        display: flex;
        gap: 10px;

        .country {
            width: 27%;
        }

        .city {
            width: 20%;
        }
    }

    .phone {
        display: flex;
        gap: 10px;

        .regionNumber {
            width: 35%;
        }

        .telephone {
            width: 65%;
        }
    }

    .el-form-item {
        margin-bottom: 20px;
    }

    .el-input {
        width: 100%;
    }

    .button-block {
        display: flex;
        justify-content: center;
        margin-top: 20px;
        gap: 20px;
    }

    .el-button {
        width: 120px;
    }
}
</style>