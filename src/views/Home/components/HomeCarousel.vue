<script setup>
// import { ref } from 'vue';

// const carousel1 = ref(null);
// const carousel2 = ref(null);
// const carousel3 = ref(null);

// const syncCarousels = (index) => {
//   carousel2.value.setActiveItem(index - 1);
//   carousel3.value.setActiveItem(index + 1);
// };
</script>

<template>

  <div class="container">
    <el-carousel ref="carousel1" class="home-carousel" indicator-position="none" :initial-index="1" height="450px">
      <el-carousel-item>
        <div class="item">
          <div class="text right">
            <h1>熱氣球嘉年華</h1>
            <h2>2025 | 1.23 ~ 3.25</h2>
          </div>
          <img src="/shutterstock_697138561.jpg" alt="">
        </div>
      </el-carousel-item>
      <el-carousel-item>
        <div class="item">
          <div class="text left">
            <h1>來一場</h1>
            <h2>說走就走的旅行吧！</h2>
          </div>
          <img src="@/assets/images/slider-one.jpg" alt="">
        </div>
      </el-carousel-item>
      <el-carousel-item>
        <div class="item">
          <div class="text left">
            <h1>賞櫻趣</h1>
            <h2>新倉富士淺間神社</h2>
          </div>
          <img src="/F1458119359482.jpg" alt="">
        </div>
      </el-carousel-item>
      <el-carousel-item>
        <div class="item">
          <div class="text right">
            <h1>越南峴港</h1>
            <h2>此生必去的東方夏威夷</h2>
          </div>
          <img src="/64ddc8e9635af.jpg" alt="">
        </div>
      </el-carousel-item>
    </el-carousel>
    <!-- <el-carousel ref="carousel1" class="home-carousel" indicator-position="none" :initial-index="1" height="450px"
      @change="syncCarousels">
      <el-carousel-item>
        <div class="item">
          <div class="text right">
            <h1>熱氣球嘉年華</h1>
            <h2>2025 | 1.23 ~ 3.25</h2>
          </div>
          <img src="/shutterstock_697138561.jpg" alt="">
        </div>
      </el-carousel-item>
      <el-carousel-item>
        <div class="item">
          <div class="text left">
            <h1>來一場</h1>
            <h2>說走就走的旅行吧！</h2>
          </div>
          <img src="@/assets/images/slider-one.jpg" alt="">
        </div>
      </el-carousel-item>
      <el-carousel-item>
        <div class="item">
          <div class="text left">
            <h1>賞櫻趣</h1>
            <h2>新倉富士淺間神社</h2>
          </div>
          <img src="/F1458119359482.jpg" alt="">
        </div>
      </el-carousel-item>
      <el-carousel-item>
        <div class="item">
          <div class="text right">
            <h1>越南峴港</h1>
            <h2>此生必去的東方夏威夷</h2>
          </div>
          <img src="/64ddc8e9635af.jpg" alt="">
        </div>
      </el-carousel-item>
    </el-carousel>
    <el-carousel ref="carousel2" class="home-carousel absolute left" indicator-position="none" :initial-index="0"
      arrow="never" height="450px" :autoplay="false">
      <el-carousel-item>
        <div class="item">
          <div class="text right">
            <h1>熱氣球嘉年華</h1>
            <h2>2025 | 1.23 ~ 3.25</h2>
          </div>
          <img src="/shutterstock_697138561.jpg" alt="">
        </div>
      </el-carousel-item>
      <el-carousel-item>
        <div class="item">
          <div class="text left">
            <h1>來一場</h1>
            <h2>說走就走的旅行吧！</h2>
          </div>
          <img src="@/assets/images/slider-one.jpg" alt="">
        </div>
      </el-carousel-item>
      <el-carousel-item>
        <div class="item">
          <div class="text left">
            <h1>賞櫻趣</h1>
            <h2>新倉富士淺間神社</h2>
          </div>
          <img src="/F1458119359482.jpg" alt="">
        </div>
      </el-carousel-item>
      <el-carousel-item>
        <div class="item">
          <div class="text right">
            <h1>越南峴港</h1>
            <h2>此生必去的東方夏威夷</h2>
          </div>
          <img src="/64ddc8e9635af.jpg" alt="">
        </div>
      </el-carousel-item>
    </el-carousel>
    <el-carousel ref="carousel3" class="home-carousel absolute right" indicator-position="none" :initial-index="2"
      arrow="never" height="450px" :autoplay="false">
      <el-carousel-item>
        <div class="item">
          <div class="text right">
            <h1>熱氣球嘉年華</h1>
            <h2>2025 | 1.23 ~ 3.25</h2>
          </div>
          <img src="/shutterstock_697138561.jpg" alt="">
        </div>
      </el-carousel-item>
      <el-carousel-item>
        <div class="item">
          <div class="text left">
            <h1>來一場</h1>
            <h2>說走就走的旅行吧！</h2>
          </div>
          <img src="@/assets/images/slider-one.jpg" alt="">
        </div>
      </el-carousel-item>
      <el-carousel-item>
        <div class="item">
          <div class="text left">
            <h1>賞櫻趣</h1>
            <h2>新倉富士淺間神社</h2>
          </div>
          <img src="/F1458119359482.jpg" alt="">
        </div>
      </el-carousel-item>
      <el-carousel-item>
        <div class="item">
          <div class="text right">
            <h1>越南峴港</h1>
            <h2>此生必去的東方夏威夷</h2>
          </div>
          <img src="/64ddc8e9635af.jpg" alt="">
        </div>
      </el-carousel-item>
    </el-carousel> -->
  </div>

</template>


<style lang="scss" scoped>
// @media screen and (max-width: 1600px) {
//   .absolute {
//     display: none;
//   }
// }

.home-carousel {
  background-color: #ffffff;
  width: 100%;
  max-width: 1440px;
  flex-shrink: 0;
}

.absolute {
  top: 0;
  position: absolute;
  opacity: 0.45;

  &.left {
    right: calc(100% + 20px);
  }

  &.right {
    left: calc(100% + 20px);
  }
}

img {
  opacity: 0.85;
}

.el-carousel {
  margin: 0 auto -30px;

  .item {
    position: relative;
    width: 100%;
    height: 100%;

    .text {
      position: absolute;
      z-index: 1;
      top: 35%;
      color: #313a45d5;
      line-height: 1;
      letter-spacing: 1px;
      background-color: #ffffff76;
      padding: 20px;
      border-radius: 15px;

      h1 {
        margin: 0 0 15px;
        font-size: 3em;
      }

      h2 {
        margin: 0;
        font-size: 2em;
      }

      &.left {
        left: 8%;
      }

      &.right {
        right: 8%;
      }
    }
  }
}
</style>
