<template>
  <div>
    <header class="header">
      <h2>Existing Rooms</h2>
      <button @click="showModal = true" class="add-room-btn">Add New Room</button>
    </header>
    <div class="filter-section">
      <label for="filterType">Filter rooms by type</label>
      <select v-model="filterType" id="filterType">
        <option value="">Select a room type to filter...</option>
        <option v-for="type in roomTypes" :key="type" :value="type">{{ type }}</option>
      </select>
      <button @click="clearFilter" class="filter-btn">Clear Filter</button>
    </div>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Company ID</th>
          <th>Room Type</th>
          <th>Room Price</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="room in paginatedRooms" :key="room.id">
          <td>{{ room.id }}</td>
          <td>{{ room.companyId }}</td>
          <td>{{ room.type }}</td>
          <td>{{ room.price }}</td>
          <td>
            <button @click="editRoom(room)" class="edit-btn">View/Edit</button>
            <button @click="deleteRoom(room.id)" class="delete-btn">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- 分页标签 -->
    <div class="pagination">
      <button 
        v-for="page in totalPages" 
        :key="page" 
        @click="currentPage = page" 
        :class="{ active: currentPage === page }"
      >
        {{ page }}
      </button>
    </div>

    <!-- Add New Room Modal -->
    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <span class="close" @click="showModal = false">&times;</span>
        <h2>Add a New Room</h2>
        <form @submit.prevent="addRoom">
          <div class="form-group">
            <label for="companyId">Company ID</label>
            <input type="number" v-model="newRoom.companyId" id="companyId" required />
          </div>
          <div class="form-group">
            <label for="changeId">Change ID</label>
            <input type="number" v-model="newRoom.changeId" id="changeId" required />
          </div>
          <div class="form-group">
            <label for="roomType">Room Type</label>
            <select v-model="newRoom.type" id="roomType" required>
              <option disabled value="">Select a room type</option>
              <option v-for="type in roomTypes" :key="type" :value="type">{{ type }}</option>
            </select>
          </div>
          <div class="form-group">
            <label for="roomPrice">Room Price</label>
            <input type="number" v-model="newRoom.price" id="roomPrice" required />
          </div>
          <div class="form-group">
            <label for="roomPhoto">Room Photo</label>
            <input type="file" @change="onFileChange" id="roomPhoto" required />
          </div>
          <button type="submit" class="save-btn">Save Room</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, computed } from 'vue';

const showModal = ref(false);

const newRoom = reactive({
  companyId: '',
  changeId: '',
  type: '',
  price: '',
  photo: null,
});

const rooms = ref([
  { id: 1, companyId: 101, type: 'Single bed room', price: 200 },
  { id: 2, companyId: 102, type: 'Double bed room', price: 500 },
  { id: 3, companyId: 103, type: 'Triple Suite', price: 1000 },
  { id: 4, companyId: 101, type: 'Single bed room', price: 150 },
  { id: 5, companyId: 102, type: 'Family Suite', price: 700 },
  { id: 6, companyId: 103, type: 'Triple Suite 2', price: 300 },
]);

const roomTypes = ref(['Single bed room', 'Double bed room', 'Triple Suite', 'Family Suite']);
const filterType = ref('');

const currentPage = ref(1);
const roomsPerPage = 6;

const totalPages = computed(() => {
  return Math.ceil(filteredRooms.value.length / roomsPerPage);
});

const filteredRooms = computed(() => {
  if (filterType.value) {
    return rooms.value.filter(room => room.type === filterType.value);
  }
  return rooms.value;
});

const paginatedRooms = computed(() => {
  const start = (currentPage.value - 1) * roomsPerPage;
  const end = start + roomsPerPage;
  return filteredRooms.value.slice(start, end);
});

const addRoom = async () => {
  const formData = new FormData();
  formData.append('companyId', newRoom.companyId);
  formData.append('changeId', newRoom.changeId);
  formData.append('roomType', newRoom.type);
  formData.append('roomPrice', newRoom.price);
  formData.append('photo', newRoom.photo);

  try {
    const response = await fetch('http://localhost:8080/rooms/add/new-room', {
      method: 'POST',
      body: formData,
    });
    const data = await response.json();
    if (response.ok) {
      rooms.value.push({
        id: data.id,
        companyId: data.companyId,
        type: data.roomType,
        price: data.roomPrice,
      });
      newRoom.companyId = '';
      newRoom.changeId = '';
      newRoom.type = '';
      newRoom.price = '';
      newRoom.photo = null;
      showModal.value = false;
    } else {
      console.error('Error adding room:', data);
    }
  } catch (error) {
    console.error('Error adding room:', error);
  }
};

const onFileChange = (event) => {
  const file = event.target.files[0];
  newRoom.photo = file;
};

const clearFilter = () => {
  filterType.value = '';
};

const editRoom = (room) => {
  console.log(`Editing room: ${room.type}`);
};

const deleteRoom = (roomId) => {
  rooms.value = rooms.value.filter(room => room.id !== roomId);
};
</script>

<style scoped>
/* Header 样式 */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.add-room-btn {
  padding: 10px 20px;
  background-color: lightcoral;
  color: #fff;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.add-room-btn:hover {
  background-color: lightcoral
}


.filter-section {
  margin-bottom: 20px;
  display: flex;
  align-items: center;
}

.filter-btn {
  margin-left: 10px;
  padding: 10px 15px;
  background-color: lightcoral;
  color: #fff;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.filter-btn:hover {
  background-color: lightcoral;
}

/* 表格样式 */
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
}

table thead {
  background-color: #343a40;
  color: #fff;
  text-align: left;
}

table th,
table td {
  padding: 12px 15px;
  border-bottom: 1px solid #dee2e6;
  font-size: 14px;
}

table th {
  font-weight: 600;
}

table tr:hover {
  background-color: #f8f9fa;
}

table td {
  color: #495057;
}

table td button {
  margin-right: 5px;
  padding: 8px 12px;
  background-color: #6c757d;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

table td button:hover {
  background-color: #5a6268;
}

table td button:last-child {
  margin-right: 0;
  background-color: #dc3545;
}

table td button:last-child:hover {
  background-color: lightcoral;
}

/* 分页样式 */
.pagination {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.pagination button {
  margin: 0 5px;
  padding: 8px 12px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.pagination button.active {
  background-color: #0056b3;
}

.pagination button:hover {
  background-color: #0056b3;
}

/* Modal 样式 */
.modal {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
}

.modal-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  max-width: 500px;
  width: 100%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: relative;
}

.close {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 24px;
  cursor: pointer;
}

.modal h2 {
  margin-bottom: 20px;
  color: #495057;
  font-size: 24px;
  font-weight: 600;
}

.modal .form-group {
  margin-bottom: 15px;
}

.modal .form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: #495057;
}

.modal .form-group input[type="text"],
.modal .form-group input[type="number"],
.modal .form-group select {
  width: 100%;
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #ced4da;
  font-size: 16px;
  color: #495057;
}

.modal .form-group input[type="file"] {
  width: 100%;
  padding: 6px;
  font-size: 14px;
  color: #495057;
}

.modal .save-btn {
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.modal .save-btn:hover {
  background-color: #0056b3;
}
</style>
