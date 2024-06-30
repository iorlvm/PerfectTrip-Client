<script setup>
import ManageToolbar from './ManageToolbar.vue';

function goToHome() {
    //回首頁
}

function logout() {
    // 登出
}

function editDiscount(id) {
    // 編輯折扣
}

function deleteDiscount(id) {
    // 刪除折扣
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
    <el-scrollbar>
        <div class="body">
            <div id="discount-management">
                <dic class="title">
                    <h1>房型折扣管理</h1>
                    <nav>
                        <!-- <button @click="goToHome()">返回主頁</button>
                        <button @click="logout()">登出</button> -->
                    </nav>
                </dic>

                <section id="discount-list">
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
                        <!--添加更多折扣-->
                    </ul>
                </section>

                <section id="add-discount">
                    <h2>添加新折扣</h2>
                    <form>
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
.body {
    padding: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
}

#discount-management {
    min-width: 800px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 20px;
}

.title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}

.title h1 {
    margin: 0;
    font-size: 24px;
    color: #333;
}

nav button {
    margin-left: 10px;
    padding: 10px 20px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
}

nav button:hover {
    background-color: #0056b3;
}

#discount-list,
#add-discount {
    margin-bottom: 20px;
}

#discount-list h2,
#add-discount h2 {
    font-size: 20px;
    color: #333;
    border-bottom: 2px solid #007bff;
    padding-bottom: 5px;
}

#discount-list ul {
    list-style-type: none;
    padding: 0;
}

#discount-list li {
    background-color: #f1f1f1;
    border: 1px solid #e7e7e7;
    padding: 15px;
    margin-bottom: 10px;
    border-radius: 4px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

#discount-list li h3,
#discount-list li p {
    margin: 5px 0;
}

#discount-list li .actions {
    display: flex;
    gap: 10px;
}

#discount-list li .actions button {
    padding: 5px 10px;
    background-color: #28a745;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
}

#discount-list li .actions button:hover {
    background-color: #218838;
}

#discount-list li .actions button:nth-child(2) {
    background-color: #dc3545;
}

#discount-list li .actions button:nth-child(2):hover {
    background-color: #c82333;
}

#add-discount form {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

#add-discount form label {
    font-size: 14px;
    color: #333;
}

#add-discount form input,
#add-discount form select,
#add-discount form button {
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

#add-discount form button {
    background-color: #007bff;
    color: #fff;
    cursor: pointer;
    transition: background-color 0.3s;
}

#add-discount form button:hover {
    background-color: #0056b3;
}

footer {
    text-align: center;
    margin-top: 20px;
    font-size: 14px;
    color: #666;
}
</style>