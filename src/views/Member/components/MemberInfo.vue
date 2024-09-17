<script setup>
import { ref } from 'vue';
import { useUserStore } from '@/stores/user';
import { updateUserAPI } from '@/apis/user';

const userStore = useUserStore();
userStore.userInfo
const userInfo = ref({
    
    firstName: userStore.userInfo.firstName,
    lastName: userStore.userInfo.lastName,
    nickname: userStore.userInfo.nickname,
    gender: userStore.userInfo.gender,
    username: userStore.userInfo.username,
    phoneNumber: userStore.userInfo.phoneNumber,
    birthday: userStore.userInfo.birthday,
    address: userStore.userInfo.address,
   
});
//TODO 前後端性別轉換
const save  = async (e) => {
    e.preventDefault();
   let  userId = userStore.userInfo.userId;
   let  changeId = userStore.userInfo.userId;
   let firstName = userStore.userInfo.firstName;
   let lastName =userStore.userInfo.lastName;
   let nickname = userStore.userInfo.nickname;
//    let gender = userStore.userInfo.gender;
   let username = userStore.userInfo.username;
   let phoneNumber = userStore.userInfo.phoneNumber;
   let birthday = userStore.userInfo.birthday;
   let address =userStore.userInfo.address;
   await updateUserAPI({changeId,userId, firstName, lastName, nickname, username, phoneNumber, birthday, address})
};



const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2); // 月份从0开始，所以需要加1
    const day = ('0' + date.getDate()).slice(-2);

    return `${year}年${month}月${day}日`;
};

// const radio = ref('')
const isNameEdit = ref(false);
const isNickNameEdit = ref(false);
const gender = ref(false);
const birthday = ref(false);
const mail = ref(false);
const tel = ref(false);
// const country = ref(false);
const address = ref(false);

const nameEditClick = (e) => {
    e.preventDefault();
    isNameEdit.value = !isNameEdit.value;
}
const isNickNameEditClick = (e) => {
    e.preventDefault();
    isNickNameEdit.value = !isNickNameEdit.value
}
const genderClick = (e) => {
    e.preventDefault();
    gender.value = !gender.value
}
const birthdayClick = (e) => {
    e.preventDefault();
    birthday.value = !birthday.value
}
const mailClick = (e) => {
    e.preventDefault();
    mail.value = !mail.value
}
const telClick = (e) => {
    e.preventDefault();
    tel.value = !tel.value
}
// const countryClick = (e) => {
//     e.preventDefault();
//     country.value = !country.value
// }
const addressClick = (e) => {
    e.preventDefault();
    address.value = !address.value
}

</script>
//TODO新增大頭貼
<template>
    <div>
        <div class="title">
            <div>
                <h1>個人資訊</h1>
                <p class="sub-title">更新個人資訊並查看我們如何使用這些資訊。</p>
            </div>
            <div class="avatar">
                <img src="" alt="">
                <div class="avatar-icon">
                    <el-icon size="23" color="#fff" class="camera">
                        <Camera />
                    </el-icon>
                </div>
            </div>
        </div>
        <div class="row border-bottom">
            <template v-if="!isNameEdit">
                <div class="column">姓名</div>
                <div class="info">{{ userInfo.firstName + userInfo.lastName }}</div>
                <div class="edit">
                    <a href="" @click="nameEditClick">編輯</a>
                </div>
            </template>
            <template v-else>
                <div class="afterclick">
                    <div class="column">姓名</div>
                    <div class="input">
                        <input class="text" type="text" placeholder="請輸入姓" v-model="userInfo.firstName" required>
                        <input class="text" type="text" placeholder="請輸入名" v-model="userInfo.lastName" required>
                    </div>
                    <div class="edit">
                        <a href="" @click="nameEditClick">完成</a>
                    </div>
                </div>
            </template>
        </div>
        <div class="row border-bottom">
            <template v-if="!isNickNameEdit">
                <div class="column">顯示名稱</div>
                <div class="info">{{ userInfo.nickname }}</div>
                <div class="edit">
                    <a href="" @click="isNickNameEditClick">編輯</a>
                </div>
            </template>
            <template v-else>
                <div class="afterclick">
                    <div class="column">暱稱</div>
                    <div class="input">
                        <input class="text" type="text" placeholder="請輸入暱稱" v-model="userInfo.nickname" required>
                    </div>
                    <div class="edit">
                        <a href="" @click="isNickNameEditClick">完成</a>
                    </div>
                </div>
            </template>
        </div>

        <div class="row border-bottom">
            <template v-if="!gender">
                <div class="column">姓別</div>
                <div class="info">{{ userInfo.gender }}</div>
                <div class="edit">
                    <a href="" @click="genderClick">編輯</a>
                </div>
            </template>
            <template v-else>
                <div class="afterclick">
                    <div class="column">性別</div>
                    <div class="input">
                        <el-radio-group v-model="userInfo.gender">
                            <el-radio :value="'FEMALE'">女性</el-radio>
                            <el-radio :value="'MALE'">男性 </el-radio>
                            <el-radio :value="'LBGT'">LBGT</el-radio>
                        </el-radio-group>
                    </div>
                    <div class="edit">
                        <a href="" @click="genderClick">完成</a>
                    </div>
                </div>
            </template>
        </div>

        <div class="row border-bottom">
            <template v-if="!birthday">
                <div class="column">生日</div>
                <div class="info">{{ formatDate(userInfo.birthday) }}</div>
                <div class="edit">
                    <a href="" @click="birthdayClick">編輯</a>
                </div>
            </template>
            <template v-else>
                <div class="afterclick">
                    <div class="column">出生日期</div>
                    <div class="input">
                        <div class="demo-date-picker">
                            <div class="block">
                                <el-date-picker v-model="userInfo.birthday" type="date" placeholder="請選擇生日" />
                            </div>
                        </div>
                    </div>
                    <div class="edit">
                        <a href="" @click="birthdayClick">完成</a>
                    </div>
                </div>
            </template>
        </div>

        <div class="row border-bottom">
            <template v-if="!mail">
                <div class="column">電子信箱</div>
                <div class="info">
                    <div> {{ userInfo.username }}</div>
                    <div class="remind">這是您用來登入的電子信箱，我們也會發送預訂確認函至此信箱。</div>
                </div>
                <div class="edit">
                    <a href="" @click="mailClick">編輯</a>
                </div>
            </template>
            <template v-else>
                <div class="afterclick">
                    <div class="column">電子信箱</div>
                    <div class="input">
                        <input class="text1" type="text" placeholder="請輸入電子信箱" v-model="userInfo.username" required>
                    </div>
                    <div class="edit">
                        <a href="" @click="mailClick">完成</a>
                    </div>
                </div>
            </template>

        </div>
        <div class="row border-bottom">
            <template v-if="!tel">
                <div class="column">手機號碼</div>
                <div class="info">
                    <div>{{ userInfo.phoneNumber }}</div>
                    <div class="remind">若有需要，您預訂的住宿或景點／活動供應商會使用此號碼聯繫您。</div>
                </div>
                <div class="edit">
                    <a href="" @click="telClick">編輯</a>
                </div>
            </template>
            <template v-else>
                <div class="afterclick">
                    <div class="column">手機號碼</div>
                    <div class="input">
                        <input class="text" type="text" placeholder="請輸入電話號碼" v-model="userInfo.phoneNumber" required>
                    </div>
                    <div class="edit">
                        <a href="" @click="telClick">完成</a>
                    </div>
                </div>
            </template>

        </div>

        <div class="row border-bottom">
            <!-- <template v-if="!country">
                <div class="column">國籍</div>
                <div class="info">{{ userInfo.country }}</div>
                <div class="edit">
                    <a href="" @click="countryClick">編輯</a>
                </div>
            </template> -->
            <!-- <template v-else> -->
                <!-- <div class="afterclick">
                    <div class="column">國籍</div>
                    <div class="input">
                        <input class="text" type="text" placeholder="請輸入您的國籍" v-model="userInfo.country" required>
                    </div>
                    <div class="edit">
                        <a href="" @click="countryClick">完成</a>
                    </div>
                </div>
            </template> -->
        </div>

        <div class="row border-bottom"> 
            <template v-if="!address">
                <div class="column">地址</div>
                <div class="info">{{ userInfo.address }}</div>
                <div class="edit"><a href="" @click="addressClick">編輯</a></div>
            </template>
            <template v-else>
                <div class="afterclick">
                    <div class="column">地址</div>
                    <div class="input">
                        <input class="text1" type="text" placeholder="請輸入您的地址"  v-model="userInfo.address" required>
                    </div>
                    <div class="edit">
                        <a href="" @click="addressClick">完成</a>
                    </div>
                </div>
            </template>

        </div>
        <div class="save">
            <el-button type="primary" @click="save" >儲存</el-button>
        </div>


    </div>
</template>

<style lang="scss" scoped>
.title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    // padding-bottom: 12px;
    border-bottom: 1px solid #00000022;

    h1 {
        letter-spacing: 2px;
    }

    .sub-title {
        opacity: 0.75;
        font-size: 1.15em;
        margin: 14px 0 23px;
        letter-spacing: 1px;
    }


    .avatar {
        position: relative;
        width: 70px;
        height: 70px;
        border-radius: 50%;
        border: 1px solid #ffb700;
        background-color: #dbe0e4;
        overflow: hidden;
        cursor: pointer;

        .avatar-icon {
            position: absolute;
            text-align: center;
            bottom: 0;
            width: 100%;
            height: 40%;
            background-color: #00000030;
        }
    }
}

.remind {
    color: #0000006f;
}

.border-bottom {
    padding: 18px 12px;
    // border-bottom: 1px solid #00000022;
}

.row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    // border: 1px solid red;

    .column {
        width: 150px;
        // border: 1px solid black;
    }

    .info {
        flex-grow: 1;
        // border: 1px solid black;
    }

    .edit {
        width: 80px;
        justify-content: flex-end;
        // border: 1px solid black;

        a {
            color: #0b94cf;
        }
    }
}

.afterclick {
    // border: 1px solid blue;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 18 12;
    margin: 0;
    width: 100%;

    .column {
        width: 150px;
        // border: 1px solid black;
    }

    .input {

        flex-grow: 1;
        // border: 1px solid black;

        .text {
            border-radius: 3px;

            &:focus {
                outline: 1px solid #ffb700;

            }

            padding: 10px 10px;
            border: 1px solid #ffb700;
            width: 200px;
        }

        .text1 {
            border-radius: 3px;

            &:focus {
                outline: 1px solid #ffb700;

            }

            padding: 10px 10px;
            border: 1px solid #ffb700;
            width: 400px;
        }
    }



    .edit {
        // display: flex;
        width: 80px;
        justify-content: flex-end;
        // border: 1px solid black;

        a {
            color: #0b94cf;
        }
    }

}

.save {
    display: flex;
    justify-content: flex-end;
    padding: 10px;
}
</style>
