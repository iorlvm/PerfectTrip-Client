<script setup>
import { ref } from 'vue';
const selectedPohto = ref(0);
const hoverPohto = ref(null);

defineProps([
  'photos'
])

const baseUrl = 'http://localhost:8080/'


const isIndexMatch = (index) => {
  return index === selectedPohto.value;
}

const selectPhoto = (index) => {
  selectedPohto.value = index;
  allowMouseHover = false;

  setTimeout(() => {
    allowMouseHover = true;
  }, 500);
}

const getOpacity = (index) => {
  if (index === hoverPohto.value) return 1;
  const diff = Math.abs(index - selectedPohto.value);
  return 1 - diff * 0.18;
}

const getFilterBlur = (index) => {
  if (index === hoverPohto.value) return '0px';
  const diff = Math.abs(index - selectedPohto.value);
  return diff * 2 + 'px';
}

const getFlexShrink = (index) => {
  const diff = Math.abs(index - selectedPohto.value);
  if (diff === 0) return 0;
  return 1 + diff * 0.05;
}

let allowMouseHover = true;
const handleMouseOver = (index) => {
  if (!allowMouseHover) return;
  hoverPohto.value = index;
}

const handleMouseLeave = () => {
  hoverPohto.value = null;
};

</script>

<template>
  <div class="album">
    <div class="show-block">
      <div v-for="(photo, index) in photos.slice(0, 5)" :key="index" class="photo"
        :class="{ 'active': isIndexMatch(index) }" :style="{ flexShrink: getFlexShrink(index) }"
        @click="selectPhoto(index)" @mouseover="handleMouseOver(index)" @mouseleave="handleMouseLeave">
        <div class="action" :style="{ opacity: getOpacity(index), filter: 'blur(' + getFilterBlur(index) + ')' }">
          <img :src="baseUrl + photo.photoUrl" :alt="photo.description">
        </div>
      </div>
    </div>
    <div class="list-block">
      <div v-for="(photo, index) in photos.slice(0, 6)" :key="index" class="list-ele">
        <template v-if="index < 5">
          <div class="image brightness" @click="selectPhoto(index)">
            <img :src="baseUrl + photo.photoUrl" :alt="photo.description">
          </div>
        </template>
        <template v-else>
          <div class="image more" :style="{ backgroundImage: `url(${baseUrl + photo.photoUrl})` }">
            <span>+{{ photos.length - 5 }} 張相片</span>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.album {
  width: 100%;
  height: 500px;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;

  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;


  .show-block {
    display: flex;
    border-bottom-right-radius: 8px;
    border-bottom-left-radius: 8px;
    overflow: hidden;

    .photo {
      aspect-ratio: 540/360;
      height: 380px;
      margin: 0 5px;
      min-width: 25px;
      overflow: hidden;
      cursor: pointer;
      transition: flex-shrink 0.7s cubic-bezier(0.25, 0.8, 0.5, 1);

      .action {
        height: 100%;

        transition: filter 1.4s ease;
        transition: opacity 0.7s ease;
      }
    }

    :first-child {
      margin-left: 0;
    }

    :last-child {
      margin-right: 0;
    }

    .active {
      cursor: auto;

      .action {
        opacity: 1;
        transform: translate(0);
        transition: filter 2.5s ease;
        transition: opacity 1.25s ease;
      }
    }

  }

  .list-block {
    display: flex;

    .list-ele {
      width: 17%;
      height: 110px;
      margin: 0 5px;
      border-radius: 5px;
      overflow: hidden;

      .brightness:hover img {
        transition: filter 0.7s cubic-bezier(0.25, 0.8, 0.5, 1);
        filter: brightness(0.7);
      }

      .image {
        height: 100%;
        cursor: pointer;
      }

      .more {
        background-color: #a2a2a2;
        background-size: cover;
        background-position: center;
        background-blend-mode: multiply;

        display: flex;
        align-items: center;
        justify-content: center;

        span {
          color: #fff;
          font-weight: bold;
          letter-spacing: 1px;
          font-size: 1.2em;
          text-decoration: underline;
          text-underline-offset: 0.5em;
        }
      }
    }

    :first-child {
      margin-left: 0;
    }

    :last-child {
      margin-right: 0;
    }
  }
}
</style>
