<script setup>
import ManageToolbar from './ManageToolbar.vue';
function goToHome() {
    // 返回主頁
}

function logout() {
    // 登出
}

function addInventory() {
    // 添加庫存
}

function editInventory(id) {
    // 編輯庫存
}

function deleteInventory(id) {
    // 刪除庫存
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
    <div id="inventory-managemnet">

        <head>
            <h1>房間庫存管理</h1>
            <nav>
                <button @click="goToHome()">返回主頁</button>
                <button @click="logout()">登出</button>
            </nav>
        </head>

        <section id='filter-search'>
            <input type="text" id="searchQuery" placeholder="搜索房型或房間">
            <select id="filterStatus">
                <option value="">所有狀態</option>
                <option value="available">可用</option>
                <option value="booked">已預訂</option>
            </select>
        </section>

        <section id='inventory-list'>
            <h2>房間庫存列表</h2>
            <button @click="addInventory()">添加庫存</button>
            <ul>
                <li>
                    <p>房間號碼：101</p>
                    <p>房型：標準房</p>
                    <p>狀態: <span class="可用"></span>
                    </p>
                    <div class="actions">
                        <button @click="editInventory()">編輯</button>
                        <button @click="delectInventory()">刪除</button>
                    </div>
                </li>
            </ul>

        </section>
        <footer>
            <p>&copy; 2024 酒店管理平台</p>
        </footer>

    </div>
</template>


<style lang="scss" scoped>
body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background-color: #f9f9f9;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}

#inventory-management {
    width: 800px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 20px;
}

header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}

header h1 {
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

#filter-search {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
}

#filter-search input,
#filter-search select {
    width: 48%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
}

#inventory-list {
    margin-bottom: 20px;
}

#inventory-list h2 {
    margin-top: 0;
    font-size: 20px;
    color: #333;
    border-bottom: 2px solid #007bff;
    padding-bottom: 5px;
}

#inventory-list ul {
    list-style-type: none;
    padding: 0;
}

#inventory-list li {
    background-color: #f1f1f1;
    border: 1px solid #e7e7e7;
    padding: 15px;
    margin-bottom: 10px;
    border-radius: 4px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

#inventory-list li p {
    margin: 5px 0;
}

#inventory-list li .available {
    color: green;
}

#inventory-list li .booked {
    color: red;
}

.actions {
    display: flex;
    gap: 10px;
}

.actions button {
    padding: 5px 10px;
    background-color: #28a745;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.actions button:hover {
    background-color: #218838;
}

.actions button:nth-child(2) {
    background-color: #dc3545;
}

.actions button:nth-child(2):hover {
    background-color: #c82333;
}

.add-button {
    padding: 10px 20px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
    margin-bottom: 10px;
}

.add-button:hover {
    background-color: #0056b3;
}

footer {
    text-align: center;
    margin-top: 20px;
    font-size: 14px;
    color: #666;
}
</style>