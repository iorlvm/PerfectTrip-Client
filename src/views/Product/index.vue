<script setup>
import SearchBar from '@/components/SearchBar.vue';
import ProductOverview from './components/ProductOverview.vue';
import ProductRoomList from './components/ProductRoomList.vue';
import HotelFacility from '@/views/Product/components/HotelFacility.vue'
import HotelRule from './components/HotelRule.vue';
import { onMounted, ref } from 'vue';
import router from '@/router';
import { useRoute } from 'vue-router';
import { searchProductAPI } from '@/apis/search';
import { ElMessage } from 'element-plus';
import { getRateAPI } from '@/apis/rate';
import { getCompanyDetailAPI } from '@/apis/company';


const route = useRoute();

const rateDrawer = ref(false);
const roomList = ref([]);

const rate = ref({ total: 0, data: [] });
const page = ref(0);
const loading = ref(false);
const noMoreData = ref(false);

const company = ref({});
const facilities = ref([]);
const photos = ref([]);


const openRate = () => {
  rateDrawer.value = true;
  loadRates();
}

const loadRates = async () => {
  if (loading.value || noMoreData.value) return; // 防止重複加載

  loading.value = true; // 開始加載
  try {
    const res = await getRateAPI({ companyId: company.value.companyId, page: page.value });
    if (res.data.length > 0) {
      rate.value.total = res.total;
      rate.value.data.push(...res.data); // 添加新加載的數據
      page.value++;
    } else {
      noMoreData.value = true; // 沒有更多數據
    }
  } catch (error) {
    ElMessage.error('加載評價失敗');
  } finally {
    loading.value = false; // 加載結束
  }
};

// 添加 handleScroll 函數
const handleScroll = (event) => {
  const { scrollTop, clientHeight, scrollHeight } = event.target;
  if (scrollTop + clientHeight >= scrollHeight - 5) {
    loadRates(); // 加載更多評價
  }
};

onMounted(async () => {
  const id = route.params.id;
  const query = route.query;

  // 檢查是否缺少必要的 query 參數
  const requiredParams = ['adultCount', 'childCount', 'roomCount', 'startDate', 'endDate'];
  const isMissingParams = requiredParams.some(param => !query[param]);

  if (isMissingParams) {
    // 缺少參數，導回首頁
    ElMessage.warning('缺少查詢資訊, 請重新搜尋');
    router.push('/');
  } else {
    const startDate = query.startDate.split('T')[0];
    const endDate = query.endDate.split('T')[0];

    const res = await searchProductAPI({
      companyId: id,
      adultCount: query.adultCount,
      childCount: query.childCount,
      roomCount: query.roomCount,
      startDate,
      endDate
    });

    roomList.value = res.data;
    // console.log(res);

    const detail = await getCompanyDetailAPI({ companyId: id });

    company.value = detail.data.company;
    facilities.value = detail.data.facilities;
    photos.value = detail.data.photos;


    await loadRates();
  }
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
        <el-anchor-link class="a-link" @click="openRate"> 住客評價({{ rate.total }}) </el-anchor-link>
        <div class="bottom-line"></div>
      </el-anchor>
      <ProductOverview :rateData="rate.data" :totalRate="rate.total" :company="company" :facilities="facilities"
        :photos="photos" id="overview" @openRate="openRate" />
      <el-divider class="divider" />
      <ProductRoomList id="price-info" :roomList="roomList" />
      <el-divider class="divider" />
      <HotelFacility id="facility" />
      <el-divider class="divider" />
      <HotelRule id="rules" />
    </div>
  </div>

  <el-drawer v-model="rateDrawer" :with-header="false" size="40%" :lock-scroll="true">
    <div class="rate-header">
      <h3 class="rate-title">{{ company.companyName }} 的評價列表</h3>
      <div class="point">{{ company.score }}</div>
    </div>
    <div class="rate-list" ref="rateList" @scroll="handleScroll"> <!-- 添加 ref 和 @scroll -->
      <div v-for="(item, index) in rate.data" :key="index" class="rate-item">
        <div class="rate-comment-wrapper">
          <p class="rate-comment">{{ item.comment }}</p>
          <el-rate v-model="item.starRank" :disabled="true" class="rate-stars"></el-rate>
        </div>
        <div class="rate-meta">
          <span class="rate-author">{{ item.author }}</span>
        </div>
      </div>
      <!-- 加載更多提示 -->
      <div v-if="loading" class="loading">加載中...</div>
      <div v-if="noMoreData" class="no-more">沒有更多評價了</div>
    </div>
  </el-drawer>
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
.loading,
.no-more {
  text-align: center;
  padding: 10px;
  color: #999;
}

.rate-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  border-bottom: 1px solid #eaeaea;
  /* 分隔線 */
}

.rate-title {
  font-size: 18px;
  font-weight: bold;
  margin: 0;
  color: #333;
}

.point {
  padding: 5px;
  background-color: $headerFooter;
  color: #fff;
  border-radius: 5px;
  margin-left: 8px;
}

.rate-list {
  padding: 20px;
  max-height: 100%;
  overflow-y: auto;
  scrollbar-width: none;
  /* Firefox */
  -ms-overflow-style: none;
  /* IE and Edge */

  &::-webkit-scrollbar {
    display: none;
    /* Chrome, Safari, Opera */
  }
}

.rate-item {
  padding: 15px 0;
  border-bottom: 1px solid #eaeaea;
}

.rate-comment-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.rate-comment {
  font-size: 16px;
  color: #333;
  margin: 0;
}

.rate-stars {
  margin-left: 20px;
}

.rate-meta {
  text-align: right;
  font-size: 14px;
  color: #666;
}

.rate-author {
  font-weight: bold;
}

.product-container {
  width: 95%;
  margin: 0 auto;
  padding-bottom: 50px;
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
