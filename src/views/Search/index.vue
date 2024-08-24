<script setup>
import SearchBar from "@/components/SearchBar.vue";
import AdvancedSearch from "./components/AdvancedSearch.vue";
import ResultList from "./components/ResultList.vue";
import SearchResult from "./components/SearchResult.vue";
import { onMounted } from "vue";
import { useSearchStore } from "@/stores/search";


const searchStore = useSearchStore();


onMounted(() => {
  console.log(searchStore.searchQuery);

})

</script>

<template>
  <div class="space"></div>
  <SearchBar />
  <div class="container">
    <div class="breadcrumb-container">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item :to="{ path: '/' }">首頁</el-breadcrumb-item>
        <el-breadcrumb-item>麵包屑路徑</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="layout">
      <aside>
        <AdvancedSearch />
      </aside>
      <main>
        <SearchResult />
        <ResultList />
      </main>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@media (max-width: 992px) {
  aside {
    display: none;
  }
}

.layout {
  display: flex;
  min-height: 100vh;
  padding: 0 20px;

  aside {
    width: 25%;
    min-width: 270px;
    padding: 5px;
  }

  main {
    flex-grow: 1;
    padding: 0 20px;
  }
}

.space {
  background-color: $headerFooter;
  height: 12px;
}
</style>
