<template>
  <div class="add-room">
    <h1>新增房型選項</h1>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="roomType">房型：</label>
        <select v-model="roomType" id="roomType" @change="checkAddNew" required>
          <option disabled value="">新增房型選項</option>
          <option v-for="type in roomTypes" :key="type" :value="type">
            {{ type }}
          </option>
          <option value="add-new">新增</option>
        </select>
      </div>

      <div v-if="showNewTypeInput" class="form-group">
        <label for="newRoomType">New Room Type</label>
        <input v-model="newRoomType" type="text" id="newRoomType" placeholder="Enter new room type" />
        <button type="button" @click="addNewRoomType">Add</button>
      </div>

      <div class="form-group">
        <label for="roomPrice">房型價格</label>
        <input v-model="roomPrice" type="number" id="roomPrice" required />
      </div>

      <div class="form-group">
        <label for="roomPhoto">房間照片</label>
        <input type="file" id="roomPhoto" @change="handleFileUpload" required />
      </div>

      <button type="submit">儲存房型
      </button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      roomType: "",
      newRoomType: "",
      roomPrice: "",
      roomPhoto: null,
      roomTypes: [ ], 
      showNewTypeInput: false,
    };
  },
  methods: {
    checkAddNew() {
      if (this.roomType === "add-new") {
        this.showNewTypeInput = true;
      } else {
        this.showNewTypeInput = false;
      }
    },
    addNewRoomType() {
      if (this.newRoomType && !this.roomTypes.includes(this.newRoomType)) {
        this.roomTypes.push(this.newRoomType);
        this.roomType = this.newRoomType;
        this.newRoomType = "";
        this.showNewTypeInput = false;
      } else {
        alert("不要新增重複項，謝謝");
      }
    },
    handleFileUpload(event) {
      this.roomPhoto = event.target.files[0];
    },
    async submitForm() {
      try {
        const formData = new FormData();
        formData.append('photo', this.roomPhoto);
        formData.append('roomType', this.roomType);
        formData.append('roomPrice', this.roomPrice);

        const response = await fetch('http://localhost:8080/rooms/add/new-room', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error('網路問題啦');
        }

        const responseData = await response.json();
        console.log('新增房型成功:', responseData);
        alert('新增房型成功!');
        // Optionally, reset the form
        this.roomType = '';
        this.roomPrice = '';
        this.roomPhoto = null;
        this.showNewTypeInput = false;
      } catch (error) {
        console.error('Error:', error);
        alert('操作失敗，確認技術問題！');
      }
    }
  },
};
</script>

<style scoped>
.add-room {
  max-width: 500px;
  margin: auto;
  padding: 2rem;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
  font-family: 'Roboto', sans-serif;
}

h1 {
  text-align: center;
  margin-bottom: 2rem;
  font-size: 28px;
  color: #333333;
  font-weight: 700;
}

.form-group {
  margin-bottom: 1.5rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #555555;
  font-size: 16px;
}

input[type="text"],
input[type="number"],
select {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #cccccc;
  border-radius: 5px;
  box-sizing: border-box;
  font-size: 16px;
  color: #333333;
  background-color: #f9f9f9;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

input[type="file"] {
  padding: 0.75rem;
}

input:focus,
select:focus {
  border-color: #007bff;
  box-shadow: 0 0 8px rgba(0, 123, 255, 0.2);
  outline: none;
}

button {
  width: 100%;
  padding: 0.75rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  transition: background-color 0.3s ease;
  margin-top: 1rem;
}

button:hover {
  background-color: #0056b3;
}

button:focus {
  outline: none;
  box-shadow: 0 0 8px rgba(0, 123, 255, 0.3);
}

button[type="button"] {
  width: auto;
  padding: 0.5rem 1rem;
  background-color: #28a745;
  color: white;
  border-radius: 5px;
  margin-left: 0.5rem;
}

button[type="button"]:hover {
  background-color: #218838;
}

button[type="button"]:focus {
  outline: none;
  box-shadow: 0 0 8px rgba(40, 167, 69, 0.3);
}
</style>

