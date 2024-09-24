<script setup>
import { getOrderAPI } from '@/apis/order';
import { InfoFilled } from '@element-plus/icons-vue'
import { onMounted, ref } from 'vue'




const tableData = ref([])

onMounted(async () => {
    const res = await getOrderAPI({ page: 0, size: 10 });
    console.log(res);
    tableData.value = res.data;

})

const formatDate = (dateString) => {
    const date = new Date(dateString);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}/${month}/${day}`;
}
// 控制版面折叠或收合
// const toggleCollapse = (row: User) => {
//     row.isExpanded = !row.isExpanded
// }

// const activeName = ref('1')
</script>

<template>
    <el-table :data="tableData" style="width: 100%">
        <el-table-column type="selection" width="55" />
        <el-table-column property="createdDate" label="日期" width="120">
            <template #default="scope">
                {{ formatDate(scope.row.createdDate) }}


            </template>
        </el-table-column>
        <el-table-column property="orderId" label="訂單編號" width="180" />
        <el-table-column property="subscriber" label="訂購人" width="180" />
        <el-table-column property="products" label="訂購房型" width="280" show-overflow-tooltip>
            <template #default="scope">
                <div v-for="(item, index) in scope.row.products " :key="index">
                    {{ item.productName }}
                    x
                    {{ item.quantity }}
                </div>
            </template>
        </el-table-column>
        <el-table-column property="payStatus" label="訂單狀態">
            <template #default="scope">
                {{ scope.row.payStatus }}
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
                                </el-icon> 訂單金額 {{ scope.row.actualPrice.toLocaleString() }}</div>
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