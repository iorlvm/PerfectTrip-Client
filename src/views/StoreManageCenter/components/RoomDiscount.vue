<script setup>
import ManageToolbar from './ManageToolbar.vue';

function editDiscount(id) {
    // 編輯折扣
}

function deleteDiscount(id) {
    // 刪除折扣
}
</script>

<template>
    <ManageToolbar>
        <li>左選項1</li>
        <li>左選項2</li>
    </ManageToolbar>
    <el-scrollbar>
        <div class="body">
            <div class="discount-management">
                <div class="title">
                    <h1>房型折扣管理</h1>
                </div>

                <section class="discount-list">
                    <h2>現有折扣</h2>
                    <ul>
                        <li>
                            <h3>標準房 - 夏季折扣</h3>
                            <p>折扣 ：20%</p>
                            <p>有效期：2024-06-01 至 2024-12-31</p>
                            <div class="actions">
                                <button @click="editDiscount()">編輯</button>
                                <button @click="deleteDiscount()">刪除</button>
                            </div>
                        </li>
                        <!-- 添加更多折扣 -->
                    </ul>
                </section>

                <section class="add-discount">
                    <h2>添加新折扣</h2>
                    <form>
                        <label for="title">標題</label>
                        <input type="input" id="title" name="title" required>

                        <label for="roomType">房型</label>
                        <select name="roomType" id="roomType">
                            <option value="standard">標準房</option>
                            <option value="deluxe">豪華房</option>
                        </select>

                        <label for="discount">折扣 （％）</label>
                        <input type="number" id="discount" name="discount" min="0" max="100" required>

                        <label for="startDate">開始日期</label>
                        <input type="date" id="startDate" name="startDate" required>

                        <label for="endDate">結束日期</label>
                        <input type="date" id="endDate" name="endDate" required>
                        <button>新增</button>
                    </form>
                </section>

                <footer>
                    <p>&copy; 2024 飯店管理平台</p>
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

    .discount-list,
    .add-discount {
        margin-bottom: 20px;

        h2 {
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

                h3,
                p {
                    margin: 5px 0;
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
    }

    .add-discount form {
        display: flex;
        flex-direction: column;
        gap: 10px;

        label {
            font-size: 14px;
            color: #333;
        }

        input,
        select {
            padding: 10px;
            font-size: 16px;
            border: 1px solid #ccc;
            border-radius: 4px;
        }

        button {
            margin-top: 5px;
            padding: 12px;
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

    footer {
        text-align: center;
        margin-top: 20px;
        font-size: 14px;
        color: #666;
    }
}
</style>
