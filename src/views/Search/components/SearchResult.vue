<script setup>
import { ref } from "vue";
import { useSearchStore } from "@/stores/search";

const searchStore = useSearchStore();

const orederBy = ref("default");
const isOptionOpen = ref(false);
const isOnSelect = ref(false);

const orderOptions = [
  {
    value: "default",
    label: "為你推薦",
  },
  {
    value: "price",
    label: "價格優先",
  },
  {
    value: "score",
    label: "住宿評價",
  },
];

const changeOrder = () => {
  isOnSelect.value = false;
  if (orederBy.value == 'default') {
    searchStore.changeOrderBy('price');
  } else {
    searchStore.changeOrderBy(orederBy.value);
  }
}

</script>

<template>
  <div class="search-result">
    <h3>{{ searchStore.searchQuery.destination }}：找到 <strong>{{ searchStore.total }}</strong> 間住宿</h3>
    <div class="select" :class="isOnSelect || isOptionOpen ? 'on-select' : ''">
      <el-select v-model="orederBy" placeholder="Select" size="large" style="width: 240px"
        @visible-change="isOptionOpen = !isOptionOpen" @change="isOnSelect = true" @blur="changeOrder">
        <template #prefix>
          <span class="arrow">⮃</span>
        </template>
        <el-option v-for="item in orderOptions" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
    </div>
  </div>
</template>

<style lang="scss">
.search-result {
  .el-select__wrapper {
    border-radius: 20px;

    span {
      color: $headerFooter;
    }

    .arrow {
      font-size: 1.2em;
    }
  }
}
</style>
<style lang="scss" scoped>
.select {
  display: inline-block;
  background-color: $headerFooter;
  border-radius: 21px;
  box-sizing: content-box;
  padding: 2px;
}

.on-select {
  background-color: var(--el-color-primary);
}

.search-result {
  margin: 10px 0;

  h3 {
    margin-bottom: 10px;
    font-weight: normal;
    font-size: 1.3em;
  }
}
</style>
