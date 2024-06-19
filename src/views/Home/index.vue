<script setup>
import SearchBar from "@/components/SearchBar.vue";
import HomeCarousel from "./components/HomeCarousel.vue";
</script>

<template>
  <HomeCarousel />
  <SearchBar />
  <div class="container">
    <div class="temp">偏前端的靜態區塊 標語等 (非優先)</div>
  </div>
</template>

<style lang="scss" scoped>
.temp {
  text-align: center;
  line-height: 10;
}
</style>
