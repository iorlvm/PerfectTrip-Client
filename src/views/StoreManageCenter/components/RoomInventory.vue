<script setup>
import ManageToolbar from './ManageToolbar.vue';
import { getAllProductsAPI, updateInventoryAPI, deleteInventoryAPI, getInventoryByStatusAPI } from '@/apis/Inventory';
import { ElDatePicker } from 'element-plus';

let selectedStartDate = null;

function editInventory(id) {
    
}

function deleteInventory(id) {
    // 確認後刪除指定的房型庫存
}

function onDateChange(date) {
    selectedStartDate = date;
    
}
</script>

<template>
    <el-scrollbar>
        <div class="body">
            <div class="inventory-management">
                <header>
                    <h1>房間庫存管理</h1>
                </header>

                <!-- 日期選擇器 -->
                <section class="date-selection">
                    <el-date-picker
                        v-model="selectedStartDate"
                        type="date"
                        placeholder="選擇開始日期"
                        @change="onDateChange"
                    />
                    <p>選擇的日期範圍: {{ selectedStartDate }} ~ {{ selectedStartDate ? selectedStartDate + 1 : '' }}</p>
                </section>

                <!-- 篩選與搜索 -->
                <section class="filter-search">
                    <input type="text" class="search-query" placeholder="搜索房型或房間" />
                    <select class="filter-status">
                        <option value="">所有狀態</option>
                        <option value="available">可用</option>
                        <option value="booked">已預訂</option>
                    </select>
                </section>

                <!-- 庫存列表 -->
                <section class="inventory-list">
                    <h2>房間庫存列表</h2>
                    <ul>
                        <li v-for="product in products" :key="product.id">
                            <p>房間號碼：{{ product.roomNumber }}</p>
                            <p>房型：{{ product.roomType }}</p>
                            <p>價格：{{ product.price }} 元</p>
                            <p>狀態: <span :class="['status', product.status]">{{ product.statusText }}</span></p>
                            <div class="actions">
                                <button @click="editInventory(product.id)">編輯</button>
                                <button @click="deleteInventory(product.id)">刪除</button>
                            </div>
                        </li>
                    </ul>
                </section>
                
                <section class="inventory-summary">
                    <h2>庫存統計</h2>
                    <p>可用房型總數：{{ availableRoomsCount }}</p>
                    <p>已訂房型數量：{{ bookedRoomsCount }}</p>
                    <p>剩餘房型數量：{{ remainingRoomsCount }}</p>
                </section>

                <footer>
                    <p>&copy; 2024 酒店管理平台</p>
                </footer>
            </div>
        </div>
    </el-scrollbar>
</template>

<style lang="scss" scoped>
$primary-color: #007bff;
$danger-color: #dc3545;
$confirm-color: #28a745;

.body {
    padding: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.inventory-management {
    min-width: 800px;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 20px;

    header {
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

    .date-selection {
        display: flex;
        flex-direction: column;
        margin-bottom: 20px;
    }

    .filter-search {
        display: flex;
        justify-content: space-between;
        margin-bottom: 20px;

        .search-query,
        .filter-status {
            width: 48%;
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 4px;
            font-size: 16px;
        }
    }

    .inventory-list {
        margin-bottom: 20px;

        h2 {
            margin-top: 0;
            font-size: 20px;
            color: #333;
            border-bottom: 2px solid $primary-color;
            padding-bottom: 5px;
        }

        ul {
            list-style-type: none;
            padding: 0;

            li {
                background-color: #f1f1f1;
                border: 1px solid #e7e7e7;
                padding: 15px;
                margin-bottom: 10px;
                border-radius: 4px;
                display: flex;
                justify-content: space-between;
                align-items: center;

                p {
                    margin: 5px 0;
                }

                .status {
                    &.available {
                        color: $confirm-color;
                    }

                    &.booked {
                        color: $danger-color;
                    }
                }

                .actions {
                    display: flex;
                    gap: 10px;

                    button {
                        padding: 5px 10px;
                        background-color: $confirm-color;
                        color: #fff;
                        border: none;
                        border-radius: 4px;
                        cursor: pointer;
                        transition: background-color 0.3s;

                        &:hover {
                            background-color: darken($confirm-color, 10%);
                        }

                        &:nth-child(2) {
                            background-color: $danger-color;

                            &:hover {
                                background-color: darken($danger-color, 10%);
                            }
                        }
                    }
                }
            }
        }

        .add-button {
            padding: 8px 15px;
            background-color: $primary-color;
            color: #fff;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            transition: background-color 0.3s;
            margin-bottom: 10px;

            &:hover {
                background-color: darken($primary-color, 10%);
            }
        }
    }

    .inventory-summary {
        margin-top: 20px;

        h2 {
            font-size: 18px;
            color: #333;
        }

        p {
            margin: 5px 0;
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
