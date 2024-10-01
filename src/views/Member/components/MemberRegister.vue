<script setup>
import { useRouter } from 'vue-router';
import { ref } from 'vue'
import { userRegisterAPI } from '@/apis/user'

const router = useRouter();


const form = ref({
    firstName: '',
    lastName: '',
    nickname: '',
    gender: '',
    address: '',
    username: '',
    password: '',
    password_check: '',
    phoneNumber: '',
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
        // { pattern: /^\d{10}$/, message: '請輸入正確的身分證', trigger: ['blur', 'change'] }只能驗證數字
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
    let nickname = form.value.nickname;
    let gender = form.value.gender;
    let username = form.value.username;
    let password = form.value.password;
    let address = form.value.address
    let phoneNumber = form.value.phoneNumber;
    let taxId = form.value.taxId;
    let birthday = form.value.birthday
    console.log({ firstName, lastName, nickname, gender, username, password, address, phoneNumber, taxId, birthday });
    await userRegisterAPI({ firstName, lastName, nickname, gender, username, password, address, phoneNumber, taxId, birthday })
    console.log({ firstName, lastName, nickname, gender, username, password, address, phoneNumber, taxId, birthday });
    router.push('/');
}
</script>

<template>
    <div class="form_container container">
        <h2>註冊會員</h2>
        <div class="storeregister">
            <el-form :model="form" :rules="rules" ref="ruleFormRef" label-width="auto"
                style="max-width: 600px; margin-left: -100px;" :status-icon="true" :scroll-to-error="true">

                <div class="name">
                    <el-form-item label="姓名" prop="firstName" class="firstName">
                        <el-input type="text" placeholder="姓氏" v-model="form.firstName" clearable required></el-input>
                    </el-form-item>
                    <el-form-item label="" prop="lastName" class="lastName">
                        <el-input type="text" placeholder="名字" v-model="form.lastName" required></el-input>
                    </el-form-item>
                </div>

                <el-form-item label="暱稱" prop="nickname">
                    <el-input type="text" placeholder="暱稱" v-model="form.nickname" required></el-input>
                </el-form-item>

                <div class="gender-birthday">
                    <el-form-item label="生日" prop="birthday" class="birthday">
                        <el-date-picker v-model="form.birthday" type="date" placeholder="選擇日期" clearable required />
                    </el-form-item>

                    <el-form-item class="gender" label="性別" label-width="40px">
                        <el-select v-model="form.gender" placeholder="選擇性別" clearable>
                            <el-option label="男姓" value="MALE" />
                            <el-option label="女性" value="FEMALE" />
                            <el-option label="LBGT" value="LBGT" />
                        </el-select>
                    </el-form-item>
                </div>

                <el-form-item label="身分證號" prop="taxId">
                    <el-input type="text" placeholder="請輸入身分證字號" v-model="form.taxId" required></el-input>
                </el-form-item>

                <el-form-item label="電子信箱(登入帳號)" prop="username">
                    <el-input class="username" type="text" placeholder="電子信箱即為登入帳號" v-model="form.username"
                        required></el-input>
                </el-form-item>

                <el-form-item label="登入密碼" prop="password">
                    <el-input type="password" placeholder="請輸入密碼" v-model="form.password" required></el-input>
                </el-form-item>

                <el-form-item label="再次輸入密碼" prop="password_check">
                    <el-input type="password" placeholder="請再次輸入密碼" v-model="form.password_check" required></el-input>
                </el-form-item>

                <el-form-item label="手機" prop="phoneNumber">
                    <el-input type="text" placeholder="請輸入連絡電話" v-model="form.phoneNumber" required></el-input>
                </el-form-item>

                <el-form-item class="address" label="聯絡地址" prop="address">
                    <el-input type="text" placeholder="請輸入地址" v-model="form.address" required></el-input>
                </el-form-item>
            </el-form>

            <div class="button-block">
                <el-button type="danger" @click="resetForm()">清除</el-button>
                <el-button type="primary" @click="register">註冊</el-button>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.form_container {
    width: 60%; // 調整為60%，適應更多螢幕
    text-align: center;
    margin: 50px auto;
}

.storeregister {
    display: flex;
    flex-direction: column;
    align-items: center;

    .name {
        display: flex;
        gap: 15px;

        .firstName {
            width: 50%;
        }

        .lastName {
            width: 50%;
        }
    }

    .gender-birthday {
        display: flex;
        gap: 15px;

        .birthday {
            width: 60%;
        }

        .gender {
            width: 40%;
        }
    }

    .el-form-item {
        margin-bottom: 20px;
    }

    .el-input,
    .el-select {
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
