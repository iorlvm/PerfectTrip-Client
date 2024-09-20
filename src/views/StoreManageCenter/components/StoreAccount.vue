<script setup>
import { ref } from 'vue';
import ManageToolbar from './ManageToolbar.vue';
import { useUserStore } from '@/stores/user'
import { updatecompanyAPI } from '@/apis/company'

const userStore = useUserStore();
userStore.userInfo
const userInfo = ref({
    companyId:userStore.userInfo.companyId,
    companyName: userStore.userInfo.companyName,
    username: userStore.userInfo.username,
    vatNumber: userStore.userInfo.vatNumber,
    telephone: userStore.userInfo.telephone,
    address: userStore.userInfo.address,
    manager: userStore.userInfo.manager,
    country: userStore.userInfo.country,
    city: userStore.userInfo.city

});

const save = async (e) => {
    e.preventDefault();
   
    let companyId = userInfo.value.companyId;
    let username = userInfo.value.username;
    let companyName =userInfo.value.companyName;
    let vatNumber = userInfo.value.vatNumber;
    let address = userInfo.value.address;
    let telephone = userInfo.value.telephone;
    let manager = userInfo.value.manager;
    let country = userInfo.value.country;
    let city = userInfo.value.city;

   
    // console.log({ companyId, changeId, username, companyName, vatNumber, address, telephone, manager });
    try {
       const res = await updatecompanyAPI({ companyId, username, companyName, vatNumber, address, telephone, manager, country, city })
        // console.log({ companyId, username, companyName, vatNumber, address, telephone, manager, country, city });
       console.log(res);
       userStore.updateInfo(res);
        // 成功處理
    } catch (error) {
        console.error("Error updating company:", error.response.data);
        // 顯示錯誤信息
    }
    console.log('companyId:', companyId);
    console.log('API request companyId:', companyId);


}

const companyNameEdit = ref(false);
const mail = ref(false);
const address = ref(false);
const manager = ref(false);
const tel = ref(false);
const vatNumber = ref(false);

const companyNameEditClick = (e) => {
    e.preventDefault();
    companyNameEdit.value = !companyNameEdit.value;
}
const mailClick = (e) => {
    e.preventDefault();
    mail.value = !mail.value
}
const addressClick = (e) => {
    e.preventDefault();
    address.value = !address.value
}
const managerClick = (e) => {
    e.preventDefault();
    manager.value = !manager.value
}
const telClick = (e) => {
    e.preventDefault();
    tel.value = !tel.value
}
const vatNumberClick = (e) => {
    e.preventDefault();
    vatNumber.value = !vatNumber.value
}
</script>

<template>
    <ManageToolbar>
        <li>
            左選項1
        </li>
        <li>
            左選項2
        </li>
    </ManageToolbar>

    <div class="storeaccount">
        <div class="title">
            <div>
                <h1>帳號管理頁面</h1>
            </div>

        </div>

        <div class="row border-bottom">
            <template v-if="!companyNameEdit">
                <div class="column">刊登名稱</div>
                <div class="info">{{ userInfo.companyName }}</div>
                <div class="edit">
                    <a href="" @click="companyNameEditClick">編輯</a>
                </div>
            </template>
            <template v-else>
                <div class="afterclick">
                    <div class="column">刊登名稱</div>
                    <div class="input">
                        <input class="text" type="text" placeholder="請輸入申請者名稱" v-model="userInfo.companyName" required>
                    </div>
                    <div class="edit">
                        <a href="" @click="companyNameEditClick">完成</a>
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
            <template v-if="!address">
                <div class="column">營業地址</div>
                <div class="info">
                    <div class="site"  style="display: flex;">
                        <div>{{ userInfo.country }}</div>
                        <div>{{ userInfo.city }}</div>
                        <div> {{ userInfo.address }}</div>
                    </div>
                    <div class="remind">此地址為營業地址</div>
                </div>

                <div class="edit"><a href="" @click="addressClick">編輯</a></div>
            </template>
            <template v-else>
                <div class="afterclick">
                    <div class="column">營業地址</div>
                    <div class="input">
                        <input class="text1" type="text" placeholder="請輸入您的地址" v-model="userInfo.address" required>
                    </div>
                    <div class="edit">
                        <a href="" @click="addressClick">完成</a>
                    </div>
                </div>
            </template>
        </div>
        <div class="row border-bottom">
            <template v-if="!manager">
                <div class="column">負責人姓名</div>
                <div class="info">{{ userInfo.manager }}</div>
                <div class="edit">
                    <a href="" @click="managerClick">編輯</a>
                </div>
            </template>
            <template v-else>
                <div class="afterclick">
                    <div class="column">負責人姓名</div>
                    <div class="input">
                        <input class="text" type="text" placeholder="請輸入負責人姓名" v-model="userInfo.manager" required>
                    </div>
                    <div class="edit">
                        <a href="" @click="managerClick">完成</a>
                    </div>
                </div>
            </template>
        </div>

        <div class="row border-bottom">
            <template v-if="!tel">
                <div class="column">聯絡電話</div>
                <div class="info">
                    <div>{{ userInfo.telephone }}</div>
                    <div class="remind">此電話將使用於官方聯絡資訊</div>
                </div>
                <div class="edit">
                    <a href="" @click="telClick">編輯</a>
                </div>
            </template>
            <template v-else>
                <div class="afterclick">
                    <div class="column">聯絡電話</div>
                    <div class="input">
                        <input class="text" type="text" placeholder="請輸入電話" v-model="userInfo.telephone" required>
                    </div>
                    <div class="edit">
                        <a href="" @click="telClick">完成</a>
                    </div>
                </div>
            </template>
        </div>



        <div class="row border-bottom">
            <template v-if="!vatNumber">
                <div class="column">統一編號</div>
                <div class="info"> {{ userInfo.vatNumber }} </div>
                <div class="edit">
                    <a href="" @click="vatNumberClick">編輯</a>
                </div>
            </template>
            <template v-else>
                <div class="afterclick">
                    <div class="column">統一編號</div>
                    <div class="input">
                        <input class="text" type="text" placeholder="請輸入統一編號" v-model="userInfo.vatNumber" required>
                    </div>
                    <div class="edit">
                        <a href="" @click="vatNumberClick">完成</a>
                    </div>
                </div>
            </template>
        </div>
        <div class="save">
            <el-button type="primary" @click="save">儲存</el-button>
        </div>


    </div>

</template>

<style lang="scss" scoped>
.storeaccount {
    padding-left: 3%;

    .title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 0 6px 12px;
        border-bottom: 1px solid #00000022;

        h1 {
            letter-spacing: 2px;
        }
    }

    .remind {
        color: #0000006f;
    }

    .border-bottom {
        padding: 18px 12px;
        border-bottom: 1px solid #00000022;

        a {
            color: #0b94cf;
        }
    }

    .row {
        display: flex;
        justify-content: space-between;

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
}

.save {
    display: flex;
    justify-content: flex-end;
    padding: 10px;
}
</style>
