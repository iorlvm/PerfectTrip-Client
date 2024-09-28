<script setup>
import ProductCard from "./ProductCard.vue";
import { useSearchStore } from "@/stores/search";
import { onMounted, ref } from "vue";

const searchStore = useSearchStore();

const days = ref(0);
const adultCount = ref(0);

const calculateNightsDifference = (startDate, endDate) => {
  // 轉換為 Date 物件
  const start = new Date(startDate);
  const end = new Date(endDate);

  // 計算日期差距的毫秒數
  const differenceInTime = end.getTime() - start.getTime();

  // 計算經過的晚上的數量（天數差距）
  const nightsDifference = Math.ceil(differenceInTime / (1000 * 3600 * 24));

  return nightsDifference;
};

const loadMoreTrigger = ref(null);

onMounted(() => {
  searchStore.getProductList();
  adultCount.value = searchStore.searchQuery.adultCount || 0;
  days.value = calculateNightsDifference(searchStore.searchQuery.dateRange[0], searchStore.searchQuery.dateRange[1])

  const observer = new IntersectionObserver(async (entries) => {
    if (entries[0].isIntersecting) {
      await searchStore.loadMoreResult();
    }
  });

  if (loadMoreTrigger.value) {
    observer.observe(loadMoreTrigger.value);
  }
})
</script>

<template>
  <ProductCard v-for="(res) in searchStore.resultList" :key="res.companyId" :product="res" :adultCount="adultCount"
    :days="days" />
  <div ref="loadMoreTrigger" class="load-more-trigger"></div>
</template>

<style lang="scss" scoped>
.load-more-trigger {
  height: 20px;
}
</style>
