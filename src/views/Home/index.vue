<script setup>
import SearchBar from '@/components/SearchBar.vue';
import HomeCarousel from './components/HomeCarousel.vue';
import HomeCoupons from './components/HomeCoupons.vue';
import HomeTitle from './components/HomeTitle.vue';
import HotelCard from './components/HotelCard.vue';
import TravelDest from './components/TravelDest.vue'
import { ref } from 'vue';

const dests = ref([
  {
    place: '台北',
    img: '/1.jpg'
  },
  {
    place: '台中',
    img: '/2.jpg'
  },
  {
    place: '高雄',
    img: '/3.jpg'
  },
  {
    place: '台南',
    img: '/4.jpg'
  },
  {
    place: '東京',
    img: '/5.jpg'
  },
])
</script>

<template>
  <HomeCarousel />
  <SearchBar :half="false" />
  <div class="container">
    <HomeTitle title="特別優惠" desc="為您提供的促銷、折扣與特別優惠">
      <HomeCoupons />
    </HomeTitle>
    <HomeTitle title="推薦目的地" desc="發現我們精心挑選的推薦目的地，開啟您的夢幻假期">
      <TravelDest :dest="item" v-for="item in dests" :key="item" />
    </HomeTitle>
    <HomeTitle title="限時優惠" desc="7 月 19 日 - 7 月 21 日住宿省一筆">
      <HotelCard v-for="item in 4" :key="item" />
    </HomeTitle>
    <HomeTitle title="熱門旅館" desc="探索我們精選的熱門旅館，享受無與倫比的舒適和服務">
      <HotelCard v-for="item in 4" :key="item" />
    </HomeTitle>
    <HomeTitle title="特色住宿" desc="體驗獨特的住宿風格，給您難忘的度假回憶" class="bottom">
      <HotelCard v-for="item in 4" :key="item" />
    </HomeTitle>
  </div>
</template>

<style lang="scss" scoped>
.bottom {
  margin-bottom: 80px;
}
</style>
