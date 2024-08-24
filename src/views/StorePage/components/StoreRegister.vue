<script setup>
import { ref } from 'vue'

const form = ref({
    application: '',
    publishName: '',
    email: '',
    password: '',
    passwordCheck: '',
    address: '',
    manager: '',
    regionNumber:'',
    contactNumber: '',
    tax_ID: '',
});
// const formData = ref({
//     application: '',
//     publishName: '',
//     email: '',
//     password: '',
//     passwordCheck: '',
//     address: '',
//     manager: '',
//     regionNumber:'',
//     contactNumber: '',
//     tax_ID: '',
// });

const rules = {
    application: [
        { required: true, message: '請輸入申請者名稱', trigger: 'blur' }
    ],
    publishName: [
        { required: true, message: '請輸入刊登名稱', trigger: 'blur' }
    ],
    email: [
        { required: true, message: '請輸入電子信箱', trigger: 'blur' },
        { type: 'email', message: '請輸入正確的電子信箱格式', trigger: ['blur', 'change'] }
    ],
    password: [
        { required: true, message: '請輸入密碼', trigger: 'blur' }
    ],
    password_check: [
        { required: true, message: '再次輸入密碼', trigger: 'blur' }
    ],
    address: [
        { required: true, message: '請輸入地址', trigger: 'blur' }
    ],
    manager: [
        { required: true, message: '請輸入地址', trigger: 'change' }
    ],
    
    contactNumber: [
        { required: true, message: '請輸入電話/手機', trigger: 'blur' },
        { pattern: /^\d{8}$/, message: '請輸入正確的電話/手機格式', trigger: ['blur', 'change'] }
    ],
    regionNumber: [
        { required: true, message: '請輸入區碼', trigger: 'blur' },
        { pattern: /^\d{3}$/, message: '請輸入正確的區碼', trigger: ['blur', 'change'] }
    ],
    tax_ID: [
        { required: true, message: '請輸入統一編號', trigger: 'blur' },
        { pattern: /^\d{8}$/, message: '請輸入正確的統一編號(8位數字)', trigger: ['blur', 'change'] }
    ],
};

const ruleFormRef = ref(null);
const checkForm = async (formEl) => {
    if (!formEl) return;

    await formEl.validate((valid, fields) => {
        if (valid) {
            // console.log('表單驗證通過！', formData.value);

            // nextStep();
        } else {
            console.log('表單驗證失敗！', fields);
        }
    });
};

// const isVisible = () => {
//     return props.active === 1;
// }
</script>

<template>
    <div>
        <div class="form_container">
            <div class="storeregister">
                <el-form :model="form" :rules="rules" ref="ruleFormRef" label-width="auto" style="max-width: 600px" 
                    :status-icon="true" :scroll-to-error="true">
                    <el-form-item label="申請者名稱" prop="application">
                        <div>
                            <el-input type="text" placeholder="請輸入申請者名稱" v-model="form.application" required></el-input>
                        </div>
                       
                    </el-form-item>
                    <el-form-item label="刊登名稱" prop="publishName">
                        <div>
                            <el-input type="text" placeholder="請輸入刊登名稱" v-model="form.publishName" required></el-input>
                        </div>
                    </el-form-item>
                    <el-form-item label="電子信箱" prop="email">
                        <div>
                            <el-input class="mail" type="text" placeholder="電子信箱即為登入帳號" v-model="form.email"
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
                            <el-input type="text" placeholder="請輸入密碼" v-model="form.passwordCheck" required></el-input>
                        </div>
                    </el-form-item>
                    <el-form-item label="營業地址" prop="address">
                        <div>
                            <el-input type="text" class="address" placeholder="請輸入營業地址" v-model="form.address"
                                required></el-input>
                        </div>
                    </el-form-item>
                    <el-form-item label="負責人姓名" prop="manager">
                        <div>
                            <el-input type="text" placeholder="請輸入負責人名稱" v-model="form.manager"  required></el-input>
                        </div>
                    </el-form-item>

                    <div class="phone" style="display: flex; align-items: center;">
                        
                        <el-form-item label="連絡電話" prop="regionNumber">
                        
                                <div class="country_code" style="display: flex; align-items: center;">
                                <div>+</div>  
                                <el-input type="text" placeholder="886" v-model="form.regionNumber" required></el-input>
                                </div>
                        
                        </el-form-item>
                       
                        <el-form-item label="" prop="contactNumber" >
                                <div style="display: flex; align-items: center;">
                                    <el-input type="text" placeholder="請輸入電話" v-model="form.contactNumber" required></el-input>
                                </div>
                        </el-form-item>
                    </div>

                    <el-form-item label="統一編號" prop="tax_ID">
                        <div>
                            <el-input type="text" placeholder="請輸入統一編號" v-model="form.tax_ID" required></el-input>
                        </div>
                    </el-form-item>

                     <div button>
                        <el-button type="danger" >清除</el-button>
                        <el-button type="primary" @click="checkForm(ruleFormRef)" >註冊</el-button>
                    </div>
                </el-form>

               
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
        display:flex;
    }

    .country_code {
        width: 80px;
    }

    .address {
        width: 500px;
    }

    .mail {
        width: 500px;
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
<!-- <script setup>
import { ref } from 'vue';
import { ElMessageBox } from 'element-plus';

const form = ref({
    application: '',
    publishName: '',
    email: '',
    password: '',
    passwordCheck: '',
    address: '',
    manager: '',
    contactNumber: '',
    tax_ID: '',
});

const register = () => {
    ElMessageBox.alert('您的註冊申請成功，管理員正審核中', '註冊成功', {
        confirmButtonText: '確定',
        callback: action => {
            // 可以在這裡添加點擊確定按鈕後的操作
        }
    });
};

const clearForm = () => {
    Object.keys(form.value).forEach(key => {
        form.value[key] = '';
    });
};
</script>

<template>
    <div class="title">
        <div>
            <h1>這是商家註冊頁面</h1>
            <p class="sub-title">歡迎成為PerfectTrip優質成員</p>
        </div>
    </div>
    <div class="container">
        <div class="storeregister">
            <el-form :model="form">
                <el-form-item label="申請者名稱" prop="application">
                    <el-input v-model="form.application" type="text" placeholder="請輸入申請者名稱" required></el-input>
                </el-form-item>
                <el-form-item label="刊登名稱" prop="publishName">
                    <el-input v-model="form.publishName" type="text" placeholder="請輸入刊登名稱" required></el-input>
                </el-form-item>
                <el-form-item label="電子信箱" prop="email">
                    <el-input v-model="form.email" class="mail" type="text" placeholder="電子信箱即為登入帳號"
                        required></el-input>
                </el-form-item>
                <el-form-item label="登入密碼" prop="password">
                    <el-input v-model="form.password" type="password" placeholder="請輸入密碼" required></el-input>
                </el-form-item>
                <el-form-item label="再次輸入密碼" prop="passwordCheck">
                    <el-input v-model="form.passwordCheck" type="password" placeholder="請輸入密碼" required></el-input>
                </el-form-item>
                <el-form-item label="營業地址" prop="address">
                    <el-input v-model="form.address" type="text" class="address" placeholder="請輸入營業地址"
                        required></el-input>
                </el-form-item>
                <el-form-item label="負責人姓名" prop="manager">
                    <el-input v-model="form.manager" type="text" placeholder="請輸入負責人名稱" required></el-input>
                </el-form-item>
                <el-form-item label="連絡電話" prop="contactNumber">
                    <div class="phone">
                        <div class="country_code">
                            <el-input v-model="form.countryCode" type="text" placeholder="+886" required></el-input>
                        </div>
                        <div>
                            <el-input v-model="form.contactNumber" type="text" placeholder="請輸入電話" required></el-input>
                        </div>
                    </div>
                </el-form-item>
                <el-form-item label="統一編號" prop="tax_ID">
                    <el-input v-model="form.tax_ID" type="text" placeholder="請輸入統一編號" required></el-input>
                </el-form-item>

                <div class="button">
                    <el-button type="danger" @click="clearForm">清除</el-button>
                    <el-button type="primary" @click="register">註冊</el-button>
                </div>
            </el-form>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh; // 讓容器充滿整個視窗高度
    text-align: center;
}

.storeregister {
    padding: 100px 300px 100px 200px;
    border: 1px solid #00000025;
    border-radius: 8px;
    box-shadow: 0 1px 3px -1px #00000020;

    .phone {
        display: flex;
    }

    .country_code {
        width: 60px;
    }

    .address {
        width: 500px;
    }

    .mail {
        width: 500px;
    }

    .free-parking-check-box {
        --el-checkbox-checked-text-color: var(--el-color-success);
        --el-checkbox-checked-bg-color: var(--el-color-success);
    }

    .el-form-item__label {
        font-weight: bold;
        padding-right: 50px; // 右側邊距
    }

    .button {
        display: flex;
        justify-content: space-between;
        margin-top: 20px; // 上邊距
        width: 100%;
    }

    .button>* {
        flex: none; // 禁止按鈕彈性佈局
    }

    .el-message-box__wrapper {
        z-index: 9999 !important; // 確保彈窗顯示在最上層
        top: 20px !important; // 距離頂部的位置調整
    }
}
</style> -->
