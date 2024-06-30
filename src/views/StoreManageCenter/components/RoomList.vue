<template>
    <div id="room-management">
      <header>
        <h1>房型管理</h1>
        <nav>
          <button @click="goToHome">返回主頁</button>
          <button @click="logout">登出</button>
        </nav>
      </header>
  
      <section id="filter-search">
        <input type="text" v-model="searchQuery" placeholder="搜索房型或房間" />
        <select v-model="filterStatus">
          <option value="">所有狀態</option>
          <option value="available">可用</option>
          <option value="booked">已預訂</option>
        </select>
      </section>
  
      <section id="room-types">
        <h2>房型列表</h2>
        <button class="add-button" @click="addRoomType">添加房型</button>
        <ul>
          <li v-for="type in filteredRoomTypes" :key="type.id">
            <h3>{{ type.name }}</h3>
            <p>{{ type.description }}</p>
            <p>價格: {{ type.price }}</p>
            <div class="actions">
              <button @click="editRoomType(type.id)">編輯</button>
              <button @click="deleteRoomType(type.id)">刪除</button>
            </div>
          </li>
        </ul>
      </section>
  
      <section id="rooms">
        <h2>房間列表</h2>
        <button class="add-button" @click="addRoom">添加房間</button>
        <ul>
          <li v-for="room in filteredRooms" :key="room.id">
            <p>房間號碼: {{ room.number }}</p>
            <p>房型: {{ room.typeName }}</p>
            <p>狀態: <span :class="room.status">{{ room.status === 'available' ? '可用' : '已預訂' }}</span></p>
            <div class="actions">
              <button @click="editRoom(room.id)">編輯</button>
              <button @click="deleteRoom(room.id)">刪除</button>
            </div>
          </li>
        </ul>
      </section>
  
      <footer>
        <p>&copy; 2024 飯店管理平台</p>
      </footer>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  
  const searchQuery = ref('');
  const filterStatus = ref('');
  
  const roomTypes = ref([
    { id: 1, name: '標準房', description: '基本設施的標準房', price: 'NT$2000' },
    { id: 2, name: '豪華房', description: '高級設施的豪華房', price: 'NT$4000' },
    // 添加更多房型
  ]);
  
  const rooms = ref([
    { id: 1, number: '101', typeName: '標準房', status: 'available' },
    { id: 2, number: '102', typeName: '豪華房', status: 'booked' },
    // 添加更多房間
  ]);
  
  const filteredRoomTypes = computed(() => {
    return roomTypes.value.filter(type =>
      type.name.includes(searchQuery.value)
    );
  });
  
  const filteredRooms = computed(() => {
    return rooms.value.filter(room =>
      room.number.includes(searchQuery.value) &&
      (filterStatus.value === '' || room.status === filterStatus.value)
    );
  });
  
  const goToHome = () => {
    
  };
  
  const logout = () => {
    
  };
  
  const addRoomType = () => {
    
  };
  
  const editRoomType = (id) => {
    
  };
  
  const deleteRoomType = (id) => {
   
  };
  
  const addRoom = () => {
    
  };
  
  const editRoom = (id) => {
   
  };
  
  const deleteRoom = (id) => {
    
  };
  </script>
  
  <style scoped>
  #room-management {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
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
  
  #room-types,
  #rooms {
    margin-bottom: 20px;
  }
  
  #room-types h2,
  #rooms h2 {
    margin-top: 0;
    font-size: 20px;
    color: #333;
    border-bottom: 2px solid #007bff;
    padding-bottom: 5px;
  }
  
  #room-types ul,
  #rooms ul {
    list-style-type: none;
    padding: 0;
  }
  
  #room-types li,
  #rooms li {
    background-color: #fff;
    border: 1px solid #e7e7e7;
    padding: 15px;
    margin-bottom: 10px;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  }
  
  #room-types li h3,
  #rooms li p {
    margin: 5px 0;
  }
  
  #rooms li p span.available {
    color: green;
  }
  
  #rooms li p span.booked {
    color: red;
  }
  
  .actions {
    display: flex;
    justify-content: flex-end;
  }
  
  .actions button {
    margin-left: 10px;
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
  