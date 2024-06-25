<script setup>

import SearchBar from '@/components/SearchBar.vue';
import ProductOverview from './components/ProductOverview.vue';
import ProductRoomList from './components/ProductRoomList.vue';
import HotelFacility from '@/views/Product/components/HotelFacility.vue'
import HotelRule from './components/HotelRule.vue';
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';




const router = useRoute();

onMounted(() => {
  const id = router.params.id;
  // 使用這個ID去查旅館詳情
  console.log("商品id : " + id);
});
</script>

<template>
  <div class="space"></div>
  <SearchBar />
  <div class="container">
    <div class="product-container">
      <div class="breadcrumb-container">
        <el-breadcrumb separator=">">
          <el-breadcrumb-item :to="{ path: '/' }">首頁</el-breadcrumb-item>
          <el-breadcrumb-item>麵包屑路徑</el-breadcrumb-item>
          <el-breadcrumb-item>旅館名稱</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-anchor :offset="70" direction="horizontal" class="horizontal-anchor">
        <el-anchor-link class="a-link" href="#overview"> 總覽 </el-anchor-link>
        <el-anchor-link class="a-link" href="#price-info">
          資訊＆房價
        </el-anchor-link>
        <el-anchor-link class="a-link" href="#facility"> 設施 </el-anchor-link>
        <el-anchor-link class="a-link" href="#rules"> 住宿規定 </el-anchor-link>
        <el-anchor-link class="a-link" href="#precautions">
          注意事項
        </el-anchor-link>
        <el-anchor-link class="a-link"> 住客評價(999) </el-anchor-link>
        <div class="bottom-line"></div>
      </el-anchor>
      <ProductOverview id="overview" />
      <el-divider class="divider" />
      <ProductRoomList id="price-info" />
      <el-divider class="divider" />

      <HotelFacility id="facility" />
      <el-divider class="divider" />
      <HotelRule id="rules" />


      <el-divider class="divider" />
      <div class="temp" id="precautions">注意事項</div>
    </div>
  </div>
</template>

<style lang="scss">
.horizontal-anchor .el-anchor__list {
  justify-content: space-around;

  .a-link {
    flex-grow: 1;
    position: relative;

    .el-anchor__link {
      text-align: center;
      color: #676767;
      font-size: 1em;
      line-height: 2.5;
      letter-spacing: 1px;
    }
  }
}
</style>

<style lang="scss" scoped>
.temp {
  border: 1px solid #000;
  height: 350px;
}

.product-container {
  width: 95%;
  margin: 0 auto;
}

.divider {
  width: 99%;
  margin: 18px auto;
}

.horizontal-anchor {
  position: relative;
  margin: 25px 0 20px;

  .bottom-line {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 1px;
    background-color: rgba(0, 0, 0, 0.1);
    z-index: 1;
  }
}
</style>
