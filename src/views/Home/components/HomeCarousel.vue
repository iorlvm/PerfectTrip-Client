<script setup></script>

<template>
  <!-- <div class="bg"> -->
  <!-- <div class="container"> -->
  <el-carousel height="450px">
    <el-carousel-item>
      <img src="@/assets/images/slider-one.jpg" alt="">
    </el-carousel-item>
    <!-- <el-carousel-item v-for="item in 4" :key="item">
        <h3 class="small justify-center" text="2xl">{{ item }}</h3>
      </el-carousel-item> -->
  </el-carousel>
  <!-- </div> -->
  <!-- </div> -->

</template>

<style lang="scss" scoped>
// .bg {
//   background-color: $headerFooter;
// }

.el-carousel {
  margin: 0 auto;
}

.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
