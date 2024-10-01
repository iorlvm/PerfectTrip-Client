<script setup>
import SearchBar from '@/components/SearchBar.vue';
import HomeCarousel from './components/HomeCarousel.vue';
import HomeCoupons from './components/HomeCoupons.vue';
import HomeTitle from './components/HomeTitle.vue';
import HotelCard from './components/HotelCard.vue';
import TravelDest from './components/TravelDest.vue'
import { onMounted, ref } from 'vue';
import { getDiscountCompanyAPI, getHotCompanyAPI, getRandCompanyAPI } from '@/apis/recommend';
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();

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
    place: '屏東',
    img: '/5.jpg'
  },
])

const hotCompany = ref([]);

const randCompany = ref([]);

const discountCompany = ref([]);

const threeDaysLater = ref();

const formateDesc = (date) => {
  if (!date) return;
  const date2 = new Date(date);
  date2.setDate(date.getDate() + 1);

  return `${formateDate2(date)} - ${formateDate2(date2)}住宿省一筆`;
}

const formateDate2 = (date) => {
  const month = String(date.getMonth() + 1).padStart(2, '0'); // 月份需要 +1
  const day = String(date.getDate()).padStart(2, '0');        // 保證日期是兩位數
  return `${month} 月 ${day} 日`;
}

const formateDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // 月份需要 +1
  const day = String(date.getDate()).padStart(2, '0');        // 保證日期是兩位數
  return `${year}-${month}-${day}`;
}

onMounted(async () => {
  const date = new Date();
  date.setDate(date.getDate() + 3);
  threeDaysLater.value = date;

  hotCompany.value = (await getHotCompanyAPI()).data;
  randCompany.value = (await getRandCompanyAPI()).data;
  discountCompany.value = (await getDiscountCompanyAPI(formateDate(date))).data;
})
</script>

<template>
  <HomeCarousel />
  <SearchBar :half="false" />
  <div class="container">
    <HomeTitle title="特別優惠" desc="為您提供的促銷、折扣與特別優惠" v-if="userStore.userInfo.role !== 'user'">
      <HomeCoupons />
    </HomeTitle>
    <HomeTitle title="推薦目的地" desc="發現我們精心挑選的推薦目的地，開啟您的夢幻假期">
      <TravelDest :dest="item" v-for="item in dests" :key="item.companyId" :item="item" />
    </HomeTitle>
    <HomeTitle title="限時優惠" :desc="formateDesc(threeDaysLater)">
      <HotelCard v-for="item in discountCompany" :key="item.companyId" :item="item" />
    </HomeTitle>
    <HomeTitle title="熱門旅館" desc="探索我們精選的熱門旅館，享受無與倫比的舒適和服務">
      <HotelCard v-for="item in hotCompany" :key="item.companyId" :item="item" />
    </HomeTitle>
    <HomeTitle title="特色住宿" desc="體驗獨特的住宿風格，給您難忘的度假回憶" class="bottom">
      <HotelCard v-for="item in randCompany" :key="item.companyId" :item="item" />
    </HomeTitle>
  </div>
</template>

<style lang="scss" scoped>
.bottom {
  margin-bottom: 80px;
}
</style>
