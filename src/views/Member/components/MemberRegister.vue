<script setup>

import { ref } from 'vue'
import { userRegisterAPI } from '@/apis/user'
const form = ref({
    firstName: '',
    lastName: '',
    nickName: '',
    gender: '',
    username: '',
    password: '',
    password_check: '',
    address: '',
    phoneNamber: '',
    taxId: '',
    birthday: ''
});


const validatePasswordCheck = (rule, value, callback) => {
    // 確保 password_check 與 password 比較時使用的值是最新的
    if (value !== form.value.password) {
        callback(new Error('兩次輸入的密碼不一致'));
    } else {
        callback();
    }
};

const rules = {

    firstName: [
        { required: true, message: '請輸入姓名', trigger: 'blur' }
    ],
    lastName: [
        { required: true, message: '請輸入姓名', trigger: 'blur' }
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

    birthday: [
        { required: true, message: '請選擇生日', trigger: 'blur' }
    ],

    phoneNumber: [
        { required: true, message: '請輸入電話/手機', trigger: 'blur' },
    ],
    //TODO身分證驗證
    taxId: [
        { required: true, message: '請輸入身分證', trigger: 'blur' },
        
    ],
};

const ruleFormRef = ref(null);

const resetForm = () => {
    if (ruleFormRef.value) {
        ruleFormRef.value.resetFields(); // 重設所有欄位
        form.value.birthday = ''; // 手動清空生日欄位
        form.value.gender = '';
    }
};

const register = async (e) => {
    e.preventDefault();//阻止表單進行自動刷新或導航到新的頁面

    let firstName = form.value.firstName;
    let lastName = form.value.lastName;
    let nickName = form.value.nickName;
    let gender = form.value.gender;
    let username = form.value.username;
    let password = form.value.password;
    let address = form.value.address
    let phoneNumber = form.value.phoneNumber;
    let taxId = form.value.taxId;
    let birthday = form.value.birthday
    await userRegisterAPI({ firstName, lastName, nickName, gender, username, password, address, phoneNumber, taxId, birthday })
    // router.go('views/');
}




</script>


<template>
    <div>
        <div class="form_container">
            <div class="storeregister">
                <el-form :model="form" :rules="rules" ref="ruleFormRef" label-width="auto" style="max-width: 600px"
                    :status-icon="true" :scroll-to-error="true">

                    <div class="name" style="display: flex; align-items: center;">
                        <el-form-item label="姓名" class="firstName" prop="firstName">
                            <div>
                                <el-input type="text" placeholder="姓氏" v-model="form.firstName" clearable
                                    required></el-input>
                            </div>
                        </el-form-item>
                        <el-form-item label="" prop="lastName">
                            <div>
                                <el-input type="text" placeholder="名子" v-model="form.lastName" required></el-input>
                            </div>
                        </el-form-item>

                    </div>
                    <el-form-item label="暱稱" prop="nickName">
                        <div>
                            <el-input type="text" placeholder="暱稱" v-model="form.nickName" required></el-input>
                        </div>
                    </el-form-item>
                    <el-form-item label="生日" prop="birthday">
                        <el-date-picker v-model="form.birthday" type="date" placeholder="選擇日期" clearable required />
                    </el-form-item>

                    <el-form-item class="gender" label="性別">
                        <el-select v-model="form.gender" placeholder="選單" clearable>
                            <el-option label="男姓" value="男姓" />
                            <el-option label="女性" value="女性" />
                            <el-option label="LBGT" value="LBGT" />
                        </el-select>
                    </el-form-item>

                    <el-form-item label="電子信箱(登入帳號)" prop="username">
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
                    <el-form-item label="身分證號" prop="taxId">
                        <div>
                            <el-input type="text" placeholder="請輸入身分證字號" v-model="form.taxId" required></el-input>
                        </div>
                    </el-form-item>
                    <el-form-item label="手機" prop="phoneNumber">
                        <div>
                            <el-input type="text" placeholder="請輸入連絡電話" v-model="form.phoneNumber" required></el-input>
                        </div>
                    </el-form-item>

                    <el-form-item label="聯絡地址" prop="address">
                        <div>
                            <el-input type="text" class="address" placeholder="請輸入地址" v-model="form.address"
                                required></el-input>
                        </div>
                    </el-form-item>




                </el-form>
                <div class="button-block">
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

    // .phone {
    //     display: flex;
    // }

    .firstName {
        width: 230px;
    }

    .country_code {
        width: 80px;
    }

    .gender {
        width: 300px;
    }

    .address {
        width: 500px;
    }

    .username {
        width: 500px;
    }

    .free-parking-check-box {
        --el-checkbox-checked-text-color: var(--el-color-success);
        --el-checkbox-checked-bg-color: var(--el-color-success);
    }


    .el-form-item__label {
        font-weight: bold;
    }

    .button-block {
        display: flex;
        justify-content: center;
        // background-color: #3f5976;
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