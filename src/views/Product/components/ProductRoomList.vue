<script setup>
import RoomCard from './RoomCard.vue';
</script>


<template>
    <div class="room-list">
        <h3>
            空房情況
        </h3>
        <p>價格已轉換至TWD 圖標</p>
        <div>更改條件搜尋組件 (這個功能可以考慮要不要做 這東西其實很麻煩 算是進階題 留給有興趣的組員玩XD)</div>
        <el-row>
            <el-col :xs="24" :sm="24" :md="20" class="roomCard-list">
                <RoomCard />
                <RoomCard />
                <RoomCard />
                <RoomCard />
                <RoomCard />
            </el-col>
            <el-col :xs="0" :sm="0" :md="4">
                <div class="order-title"></div>
                <div class="order-block">
                    <el-button class="order-button" type="primary" size="large">現在就預定</el-button>
                    <div>
                        <p><i class="bi bi-dot"></i>資訊</p>
                        <p><i class="bi bi-dot"></i>資訊</p>
                        <p><i class="bi bi-dot"></i>資訊</p>
                        <p><i class="bi bi-dot"></i>資訊</p>
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>

</template>

<style lang="scss" scoped>
.product-container {
    width: 95%;
    margin: 0 auto;

    // .roomCard-list {
    //     border-right: 1px solid $headerFooter;
    // }
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
            margin-top: 10px;
            margin-left: 12px;
            width: calc(100% - 16px);
            font-size: 1.2em;
            height: 35px;
        }
    }
}
</style>