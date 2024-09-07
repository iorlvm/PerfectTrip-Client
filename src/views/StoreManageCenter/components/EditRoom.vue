<template>
    <div>
      <h2>Edit Room</h2>
      <form @submit.prevent="updateRoom">
        <div>
          <label for="roomType">Room Type</label>
          <input type="text" v-model="room.type" id="roomType" />
        </div>
        <div>
          <label for="roomPrice">Room Price</label>
          <input type="number" v-model="room.price" id="roomPrice" />
        </div>
        <div>
          <label for="roomPhoto">Photo</label>
          <input type="file" @change="onFileChange" id="roomPhoto" />
        </div>
        <img :src="photoUrl" alt="Room Photo" v-if="photoUrl" />
        <button type="submit">Save Changes</button>
      </form>
      <button @click="goBack">Back</button>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { useRouter, useRoute } from 'vue-router'
  
  const route = useRoute()
  const router = useRouter()
  const room = ref({})
  const photoUrl = ref('')
  
  onMounted(async () => {
    const roomId = route.params.roomId
    const response = await fetch(`http://localhost:8080/rooms/${roomId}`)
    room.value = await response.json()
    photoUrl.value = `http://localhost:8080/photos/${room.value.photoId}` 
  })
  
  const onFileChange = (event) => {
    const file = event.target.files[0]
    room.value.photo = file
  }
  
  const updateRoom = async () => {
    const formData = new FormData()
    formData.append('roomType', room.value.type)
    formData.append('roomPrice', room.value.price)
    if (room.value.photo) {
      formData.append('photo', room.value.photo)
    }
  
    const response = await fetch(`http://localhost:8080/rooms/update/${room.value.id}`, {
      method: 'PUT',
      body: formData,
    })
  
    if (response.ok) {
      router.push({ name: 'RoomList' })
    } else {
      console.error('Error updating room:', response.statusText)
    }
  }
  
  const goBack = () => {
    router.back()
  }
  </script>
  
  <style scoped>
 
  </style>
  