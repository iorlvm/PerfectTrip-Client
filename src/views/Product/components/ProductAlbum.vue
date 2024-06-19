<script setup>
import { ref } from 'vue';
const selectedPohto = ref(4);

const photos = ref([
  { id: 1, src: '' },
  { id: 2, src: '' },
  { id: 3, src: '' },
  { id: 4, src: '' },
  { id: 5, src: '' },
]);

const isIdMatch = (id) => {
  return id === selectedPohto.value;
}

const selectPhoto = (id) => {
  selectedPohto.value = id;
}

</script>

<template>
  <div class="album">
    <div class="show-block">
      <div v-for="photo in photos" :key="photo.id" class="photo" :class="{ 'active': isIdMatch(photo.id) }"
        @click="selectPhoto(photo.id)">
        <img :src="photo.src" alt="">
      </div>
    </div>
    <div class="list-block">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.album {
  width: 100%;
  height: 500px;
  border: 1px solid #000;

  .show-block {
    display: flex;

    .photo {
      width: 540px;
      height: 360px;
      margin: 5px;
      border: 1px solid #000;
    }

    .active {
      flex-shrink: 0;
    }

  }

  .list-block {
    display: flex;

    div {
      width: 100%;
      height: 100px;
      margin: 5px;
      border: 1px solid #000;
    }
  }
}
</style>
