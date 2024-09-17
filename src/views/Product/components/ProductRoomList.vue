<script setup>
import RoomList from '@/views/StoreManageCenter/components/RoomList.vue';
import RoomCard from './RoomCard.vue';
import router from "@/router";

const createOrder = () => {
    // TODO:
    // 先傳給伺服器訂單內容  由伺服器創造一個臨時的訂單編號
    // 臨時訂單與編號使用redis完成 不進SQL
    // 接收回傳的訂單編號
    const orderId = 1; // 假資料  還沒做功能沒法寫真的
    // 導去對應編號的頁面
    router.push(
        `/order/form/${orderId}`
    )
}

defineProps({
    roomList: Array
})

</script>


<template>
    <div class="room-list">
        <h2>
            空房情況
        </h2>
        <p class="desc">價格已轉換至TWD 圖標</p>
        <el-row>
            <el-col :xs="24" :sm="24" :md="20" class="roomCard-list">
                <RoomCard v-for="(room, index) in roomList" :key="index" :roomInfo="room" />
            </el-col>
            <el-col :xs="24" :sm="24" :md="4">
                <div class="order-title"></div>
                <el-row class="order-block">
                    <el-col :span="24">
                        <el-button class="order-button" type="primary" size="large"
                            @click="createOrder">現在就預定</el-button>
                    </el-col>
                    <el-col :xs="0" :sm="0" :md="24">
                        <p><i class="bi bi-dot"></i>資訊</p>
                    </el-col>
                    <el-col :xs="0" :sm="0" :md="24">
                        <p><i class="bi bi-dot"></i>資訊</p>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
    </div>

</template>

<style lang="scss" scoped>
@media (max-width: 991px) {
    .order-title {
        position: relative !important;
        height: 3px !important;
        margin-left: 0 !important;
    }
}

.room-list {
    h2 {
        margin: 0;
        line-height: 1.5;
        letter-spacing: 1px;
    }

    .desc {
        margin: 5px 0 12px;
    }

    .order-title {
        position: sticky;
        top: 0;
        height: 40px;
        margin-left: 1px;
        background-color: $headerFooter;
        border-bottom: 2px solid $headerFooter;
        z-index: 1;
    }

    .order-block {
        position: sticky;
        top: 40px;

        .order-button {
            padding-top: 16px;
            margin-top: 10px;
            margin-left: 12px;
            width: calc(100% - 16px);
            font-size: 1.2em;
            height: 36px;
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
}
</style>