<script setup>
import { ref } from 'vue';

import { onMounted } from 'vue';
import { addDiscountAPI, getDiscountsAPI, updateDiscountAPI, deleteDiscountAPI } from '@/apis/discount';
import { useUserStore } from '@/stores/user';
const userStore = useUserStore();

// 表單欄位
const discountTitle = ref('');
const discountRate = ref(0);
const startDate = ref('');
const endDate = ref('');

// 控制編輯模式的狀態
const isEditing = ref(false);
const editingDiscountId = ref(null);

// 折扣列表
const discounts = ref([]);

// 取得已有的折扣
async function fetchDiscounts() {
    const response = await getDiscountsAPI(userStore.userInfo.companyId);
    // console.log(response);
    discounts.value = response.data;

}

// 打開編輯視窗
function editDiscount(discount) {
    isEditing.value = true;
    editingDiscountId.value = discount.productDiscountId;
    // 填充表單資料
    discountTitle.value = discount.discountTitle;
    discountRate.value = discount.discountRate;
    startDate.value = new Date(discount.startDateTime).toISOString().substring(0, 10);
    endDate.value = new Date(discount.endDateTime).toISOString().substring(0, 10);
}

// 保存編輯後的折扣
const saveEditedDiscount = async () => {
    const updatedDiscount = {
        discountTitle: discountTitle.value,
        discountRate: discountRate.value,
        startDateTime: new Date(startDate.value).toISOString(),
        endDateTime: new Date(endDate.value).toISOString(),
    };

    try {
        await updateDiscountAPI(editingDiscountId.value, updatedDiscount);
        fetchDiscounts();
        isEditing.value = false;
        clearForm();
    } catch (error) {
        console.error("Error updating discount:", error);
    }
};

// 清空表單
function clearForm() {
    discountTitle.value = '';
    discountRate.value = 0;
    startDate.value = '';
    endDate.value = '';
}

// 刪除折扣
const deleteDiscount = async (id) => {
    try {
        await deleteDiscountAPI(id);
        fetchDiscounts();
    } catch (error) {
        console.error("Error deleting discount:", error);
    }
};

// Add Product
const addDiscount = async () => {
    const response = await addDiscountAPI({
        discountTitle: discountTitle.value,
        discountRate: discountRate.value,
        startDate: new Date(startDate.value).toISOString(),
        endDate: new Date(endDate.value).toISOString()
    });

    if (response.success) {
        fetchDiscounts();

    }
};

// 初始化時取得已有的折扣
onMounted(() => {
    fetchDiscounts();  // 組件載入後自動調用此函數來取得資料
});
fetchDiscounts();
</script>

<template>
    <div class="discount-management">
        <div class="title">
            <h1>房型折扣管理</h1>
        </div>

        <!-- 現有折扣列表 -->
        <section class="discount-list">
            <h2>現有折扣</h2>
            <table>
                <thead>
                    <tr>
                        <th>優惠標題</th>
                        <th>折扣 (%)</th>
                        <th>有效期</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="discount in discounts" :key="discount.productDiscountId">
                        <td>{{ discount.discountTitle }}</td>
                        <td>{{ parseInt(discount.discountRate * 100) }}</td>
                        <td>
                            {{ new Date(discount.startDateTime).toLocaleDateString('en-CA') }} -
                            {{ new Date(discount.endDateTime).toLocaleDateString('en-CA') }}
                        </td>
                        <td>
                            <button class="edit" @click="editDiscount(discount)">編輯</button>
                            <button class="delete" @click="deleteDiscount(discount.productDiscountId)">刪除</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </section>

        <!-- 添加新折扣或編輯折扣 -->
        <section class="add-discount">
            <h2 v-if="isEditing">編輯折扣</h2>
            <h2 v-else>添加新折扣</h2>
            <form @submit.prevent="isEditing ? saveEditedDiscount() : addDiscount()">
                <label for="title">標題</label>
                <input v-model="discountTitle" type="text" id="title" name="title" required>

                <label for="discount">折扣 （％）</label>
                <input v-model="discountRate" type="number" id="discount" name="discount" min="0" max="100" required>

                <label for="startDate">開始日期</label>
                <input v-model="startDate" type="date" id="startDate" name="startDate" required>

                <label for="endDate">結束日期</label>
                <input v-model="endDate" type="date" id="endDate" name="endDate" required>
                <button type="submit">{{ isEditing ? '保存編輯' : '新增' }}</button>
            </form>
        </section>

        <footer>
            <p>&copy; 2024 飯店管理平台</p>
        </footer>
    </div>
</template>


<style scoped>
.discount-management {
    min-width: 800px;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 20px;

    .title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;

        h1 {
            margin: 0;
            font-size: 24px;
            color: #333;
        }
    }

    table {
        width: 100%;
        border-collapse: collapse;
        margin-bottom: 20px;

        th,
        td {
            padding: 10px;
            border: 1px solid #e7e7e7;
            text-align: left;
        }

        th {
            background-color: #007bff;
            color: white;
        }

        td {
            background-color: #f1f1f1;
        }

        .actions {
            display: flex;
            gap: 10px;

            button {
                padding: 5px 10px;
                color: white;
                border: none;
                border-radius: 4px;
                cursor: pointer;
                transition: background-color 0.3s;

                &.edit {
                    background-color: #28a745;
                    /* confirm color */
                }

                &.edit:hover {
                    background-color: #218838;
                }

                &.delete {
                    background-color: #dc3545;
                    /* danger color */
                }

                &.delete:hover {
                    background-color: #c82333;
                }
            }
        }
    }

    .add-discount form {
        display: flex;
        flex-direction: column;
        gap: 10px;

        label {
            font-size: 14px;
            color: #333;
        }

        input {
            padding: 10px;
            font-size: 16px;
            border: 1px solid #ccc;
            border-radius: 4px;
        }

        button {
            margin-top: 5px;
            padding: 12px;
            background-color: #007bff;
            /* primary color */
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            transition: background-color 0.3s;
            margin-bottom: 10px;

            &:hover {
                background-color: #0056b3;
                /* darker primary color */
            }
        }
    }

    footer {
        text-align: center;
        margin-top: 20px;
        font-size: 14px;
        color: #666;
    }
}
</style>
