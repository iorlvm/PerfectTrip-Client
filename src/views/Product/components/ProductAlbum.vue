<script setup>
import { ref } from 'vue';
const selectedPhoto = ref(0);
const hoverPohto = ref(null);

defineProps([
  'photos'
])

const baseUrl = 'http://iorlvm.i234.me:8080/'


const isIndexMatch = (index) => {
  return index === selectedPhoto.value;
}

const selectPhoto = (index) => {
  selectedPhoto.value = index;
  allowMouseHover = false;

  setTimeout(() => {
    allowMouseHover = true;
  }, 500);
}


const getOpacity = (index) => {
  if (index === hoverPohto.value) return 1;
  const diff = Math.abs(index - selectedPhoto.value);
  return 1 - diff * 0.18;
}

const getFilterBlur = (index) => {
  if (index === hoverPohto.value) return '0px';
  const diff = Math.abs(index - selectedPhoto.value);
  return diff * 2 + 'px';
}

const getFlexShrink = (index) => {
  const diff = Math.abs(index - selectedPhoto.value);
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


// 燈箱相關邏輯，獨立處理
const dialogVisible = ref(false);
const selectedDialogPhoto = ref(0); // 獨立管理燈箱中選中的圖片

// 打開燈箱
const openPhotos = () => {
  dialogVisible.value = true;
};

// 切換燈箱內的大圖顯示
const selectPhotoInDialog = (index) => {
  selectedDialogPhoto.value = index;
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
          <div class="image more" :style="{ backgroundImage: `url(${baseUrl + photo.photoUrl})` }" @click="openPhotos">
            <span>+{{ photos.length - 5 }} 張相片</span>
          </div>
        </template>
      </div>
    </div>
  </div>

  <!-- 燈箱部分，使用獨立的邏輯和變數 -->
  <el-dialog v-model="dialogVisible" width="60%" :before-close="() => { dialogVisible = false }" center>
    <div class="lightbox-content">
      <!-- 左側顯示大圖 -->
      <div class="main-image-container">
        <img :src="baseUrl + photos[selectedDialogPhoto].photoUrl" :alt="photos[selectedDialogPhoto].description"
          class="main-image" />
      </div>

      <!-- 右側滾動圖片列表 -->
      <div class="thumbnail-list">
        <div v-for="(photo, index) in photos" :key="index" class="thumbnail-item" @click="selectPhotoInDialog(index)">
          <div class="thumbnail-image-wrapper" :class="{ active: selectedDialogPhoto === index }">
            <img :src="baseUrl + photo.photoUrl" :alt="photo.description" class="thumbnail-image" />
          </div>
        </div>
      </div>
    </div>
  </el-dialog>
</template>

<style lang="scss" scoped>
/* 燈箱樣式 */
.lightbox-content {
  display: flex;
  justify-content: space-between;
}

.main-image-container {
  flex: 1;
  display: flex;
  max-height: 80vh;
  justify-content: center;
  align-items: center;
}

.thumbnail-list {

  display: flex;
  flex-direction: column;
  overflow-y: auto;
  max-height: 80vh;
  gap: 10px;
  padding-left: 10px;
}

.thumbnail-item {
  cursor: pointer;
}

.thumbnail-image-wrapper {
  height: 80px;
  border: 2px solid transparent;
  border-radius: 5px;
  overflow: hidden;
  transition: transform 0.3s ease, border-color 0.3s ease;
}



.thumbnail-image-wrapper.active {
  border-color: #409eff;
  box-shadow: 0 0 10px rgba(64, 158, 255, 0.5);
}

.thumbnail-image {
  border-radius: 5px;
}

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
