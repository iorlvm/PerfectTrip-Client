<script setup>
import ManageToolbar from './ManageToolbar.vue';
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
      <div class="room-management">
        <header>
          <h1>房型管理</h1>
        </header>

        <section class="filter-search">
          <input type="text" v-model="searchQuery" placeholder="搜索房型或房間" />
          <select v-model="filterStatus">
            <option value="">所有狀態</option>
            <option value="available">可用</option>
            <option value="booked">已預訂</option>
          </select>
        </section>

        <section class="room-types">
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

        <section class="rooms">
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
    </div>
  </el-scrollbar>

</template>

<style lang="scss" scoped>
$primary-color: #007bff;
$danger-color: #dc3545;
$confirm-color: #28a745;

.body {
  width: 100%;
  padding: 20px;
}

.room-management {
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

  h1 {
    margin: 0;
    font-size: 24px;
    color: #333;
  }
}

nav button {
  margin-left: 10px;
  padding: 10px 20px;
  background-color: $primary-color;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: darken($primary-color, 10%);
  }
}

.filter-search {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;

  input,
  select {
    width: 48%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
  }
}

.room-types,
.rooms {
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
  }

  li {
    background-color: #fff;
    border: 1px solid #e7e7e7;
    padding: 15px;
    margin-bottom: 10px;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

    h3 {
      margin: 5px 0;
    }

    .actions {
      display: flex;
      justify-content: flex-end;

      button {
        margin-left: 10px;
        padding: 5px 10px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        transition: background-color 0.3s;
      }

      button:first-child {
        background-color: $confirm-color;
        color: #fff;

        &:hover {
          background-color: darken($confirm-color, 10%);
        }
      }

      button:last-child {
        background-color: $danger-color;
        color: #fff;

        &:hover {
          background-color: darken($danger-color, 10%);
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

footer {
  text-align: center;
  margin-top: 20px;
  font-size: 14px;
  color: #666;
}
</style>
