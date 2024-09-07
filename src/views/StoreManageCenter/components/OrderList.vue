<script lang="ts" setup>
import { InfoFilled } from '@element-plus/icons-vue'
import { ref } from 'vue'

interface User {
    date: string
    number: string
    name: string
    roomtype: string
    status: string
    isExpanded: boolean
    price: number
}


const tableData: User[] = [
    {
        date: '20240808',
        number: '20160503001',
        name: '萱萱美眉',
        roomtype: '兄弟大飯店',
        status: '完成',
        isExpanded: false,
        price: 11603,
    },
    {
        date: '20240808',
        number: '20160502002',
        name: '維恩大大',
        roomtype: '長榮桂冠酒店(台中)',
        status: '完成',
        isExpanded: false,
        price: 10737,
    },
    {
        date: '20240808',
        number: '20160504003',
        name: '陳小餅乾',
        roomtype: '大倉久和大飯店',
        status: '完成',
        isExpanded: false,
        price: 12776,
    },
    {
        date: '20240808',
        number: '20160501004',
        name: '誌謙小哥',
        roomtype: '亞都麗緻大飯店',
        status: '完成',
        isExpanded: false,
        price: 19888,
    },

]
// 控制版面折叠或收合
// const toggleCollapse = (row: User) => {
//     row.isExpanded = !row.isExpanded
// }

// const activeName = ref('1')
</script>

<template>
    <el-table :data="tableData" style="width: 100%">
        <el-table-column type="selection" width="55" />
        <el-table-column property="date" label="日期" width="120" />
        <el-table-column property="number" label="訂單編號" width="180" />
        <el-table-column property="name" label="訂購人" width="180" />
        <el-table-column property="roomtype" label="訂購房型" width="280" show-overflow-tooltip />
        <el-table-column property="status" label="訂單狀態">

            <template #default="scope">
                {{ scope.row.status }}

                <div class="demo-collapse">
                    <el-collapse v-model="scope.row.isExpanded">
                        <el-collapse-item :name="scope.row.number">
                            <template #title>
                                訂單詳情<el-icon class="header-icon">
                                    <info-filled />
                                </el-icon>
                            </template>
                            <div>
                                豪華雙人房
                            </div>
                            <div>
                                <img src="@/assets/images/OrderRoom/Room1.jpg" alt="RoomPic" class="room-image" />
                            </div>
                            <div><el-icon>
                                    <PriceTag />
                                </el-icon> 訂單金額 {{ scope.row.price.toLocaleString() }}</div>
                        </el-collapse-item>
                    </el-collapse>
                </div>
            </template>
        </el-table-column>

    </el-table>
</template>

<!-- <style lang="scss" scoped></style> -->
<style>
.el-table .el-table__row {
    height: 70px;
}

.room-image {
    width: 100%;
    height: 100%;
}
</style>