<script setup>
import { onMounted, ref } from "vue";
import router from "@/router";
import { useSearchStore } from "@/stores/search";

const searchStore = useSearchStore();
const searchQuery = ref({});

const placeholderValue = ref(null);

const adultCount = ref(2);
const childCount = ref(0);
const roomCount = ref(1);

defineProps({
  half: {
    type: Boolean,
    default: true
  }
});

onMounted(() => {
  searchQuery.value = searchStore.searchQuery;
  loadGuestCount();
});

const loadGuestCount = () => {
  adultCount.value = searchQuery.value.adultCount;
  childCount.value = searchQuery.value.childCount;
  roomCount.value = searchQuery.value.roomCount;
};

const setGuestCount = () => {
  searchQuery.value.adultCount = adultCount.value;
  searchQuery.value.childCount = childCount.value;
  searchQuery.value.roomCount = roomCount.value;
  placeholderValue.value = null;
};

const clearDestination = () => {
  searchQuery.value.destination = "";
};

const search = () => {
  searchStore.handleSearch(searchQuery.value);
};

const locations = ref([]);
const querySearchAsync = (queryString, cb) => {
  const results = queryString
    ? locations.value.filter(
      (item) =>
        item.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
    )
    : locations.value;
  cb(results);
};

const loadLocations = () => {
  // 假資料 之後要去撈資料庫
  return [
    { value: "台北" },
    { value: "台南" },
    { value: "高雄" },
    { value: "新竹" },
    { value: "宜蘭" },
    { value: "花蓮" },
    { value: "台中" },
  ];
};

onMounted(() => {
  locations.value = loadLocations();
});
</script>

<template>
  <div :class="{ 'fill-half': half }">
    <div class="container">
      <div class="search-bar">
        <el-row :gutter="3">
          <el-col :span="9">
            <div class="flex">
              <el-autocomplete v-model="searchQuery.destination" :fetch-suggestions="querySearchAsync"
                placeholder="選擇地點">
                <template #prefix>
                  <i class="bi bi-geo-alt icon"></i>
                </template>
                <template #suffix>
                  <i v-if="searchQuery.destination" class="bi bi-x icon" @click="clearDestination"
                    style="cursor: pointer; color: #909399"></i>
                </template>
              </el-autocomplete>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="flex">
              <el-date-picker v-model="searchQuery.dateRange" type="daterange" start-placeholder="入住日期"
                end-placeholder="退房日期" />
            </div>
          </el-col>
          <el-col :span="6">
            <div class="flex">
              <el-select v-model="placeholderValue" class="guestCount" @visible-change="loadGuestCount">
                <template #prefix>
                  <div class="guest-count-info">
                    {{ searchQuery.adultCount }} 位成人 -
                    {{ searchQuery.childCount }} 位孩童 -
                    {{ searchQuery.roomCount }} 間客房
                  </div>
                </template>
                <template #header>
                  <div class="option">
                    <div class="label">
                      <span>成人</span>
                    </div>
                    <div class="value">
                      <el-input-number class="num" v-model="adultCount" :min="1" :max="10" />
                    </div>
                  </div>
                  <div class="option">
                    <div class="label">
                      <span>孩童</span>
                    </div>
                    <div class="value">
                      <el-input-number class="num" v-model="childCount" :min="0" :max="10" />
                    </div>
                  </div>
                  <div class="option">
                    <div class="label">
                      <span>客房</span>
                    </div>
                    <div class="value">
                      <el-input-number class="num" v-model="roomCount" :min="1" :max="10" />
                    </div>
                  </div>
                </template>
                <el-option value="placehoder" class="fin-button" @click="setGuestCount">
                  <span>完成</span>
                </el-option>
              </el-select>
            </div>
          </el-col>
          <el-col :span="3">
            <div class="flex">
              <el-button type="primary" @click="search">搜尋</el-button>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.search-bar {
  background-color: $headerFooter;
  box-sizing: content-box;
  margin: 0 auto;
  width: 95%;
  height: 50px;
  padding: 5px;
  border-radius: 6px;

  .el-button--primary {
    --el-color-primary: #f7c411;
    --el-button-text-color: $headerFooter;
    --el-button-hover-text-color: $headerFooter;
    --el-button-hover-bg-color: #f9d658;
    --el-button-outline-color: #fbe288;
    --el-button-active-color: #c69d0e;
    --el-button-hover-link-text-color: #fbe288;
    --el-button-hover-border-color: #f9d658;
    --el-button-active-bg-color: #c69d0e;
    --el-button-active-border-color: #c69d0e;
    --el-button-disabled-text-color: #ffffff;
    --el-button-disabled-bg-color: #fbe288;
    --el-button-disabled-border-color: #fbe288;
    font-weight: bold;
  }
}

.icon {
  font-size: 1.4em;
}
</style>

<style lang="scss">
.search-bar .flex {
  display: flex;
  height: 50px;

  .el-input {

    height: 100%;
    flex-grow: 1;
  }

  .el-input__inner {
    font-size: 1.2em;
    transform: translateY(2px);
  }

  .el-range-editor.el-input__wrapper {
    height: 100%;
    flex-grow: 1;
  }

  .el-select__wrapper {
    height: 100%;
    flex-grow: 1;
  }

  .el-range-input {
    font-size: 1.08em;
    transform: translateY(1px);
  }

  .guestCount {
    .el-select__prefix {
      width: 100%;
      white-space: nowrap;
      overflow: hidden;
    }

    .guest-count-info {
      margin: 0 auto;
      font-size: 1.1em;
      color: #606266;
    }

    .el-select__suffix {
      display: none;
    }

    .el-select__selected-item {
      display: none;
    }
  }

  .el-button {
    height: 100%;
    flex-grow: 1;
    font-size: 1.2em;
  }
}

.option {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px;

  .label {
    font-size: 1.15em;
    margin-left: 5px;
  }

  .value {
    margin-right: 3px;
    width: 50%;
    max-width: 120px;
    min-width: 100px;
  }

  .el-input-number {
    width: 100%;
  }
}

.fin-button {
  text-align: center;

  span {
    font-size: 1.1em;
    font-weight: 550;
    letter-spacing: 2px;
  }
}
</style>