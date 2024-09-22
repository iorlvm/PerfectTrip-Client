<script setup>
import { getOrderAPI } from '@/apis/order';
import { onMounted, ref } from 'vue';

const orders = ref([]);

const formatDate = (dateString) => {
  const date = new Date(dateString);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}年${month}月${day}日`;
}

const formatDate2 = (dateString) => {
  const date = new Date(dateString);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}/${month}/${day}`;
}

onMounted(async () => {
  const res = await getOrderAPI();
  orders.value = res.data;
  console.log(orders.value);
})

</script>

<template>
  <div class="title">
    <div>
      <h1>訂房紀錄</h1>
      <p class="sub-title">查看您的訂房紀錄 文案我不太會想 再稍微修改過。</p>
    </div>
  </div>
  <div class="state">
    <h2 class="desc">即將啟程</h2>
    <el-card v-for="(order, index) in orders" :key="index">
      <template #header>
        <div class="row">
          <div>
            <p class="location">台北</p>
            <p>{{ formatDate(order.startDate) }} - {{ formatDate(order.endDate) }}</p>

          </div>
          <el-icon class="option">
            <ArrowDownBold />
          </el-icon>
        </div>
      </template>
      <h1 class="hotel-name">{{ order.hotelName }}</h1>
      <div class="row">
        <div class="image"><img :src="order.photo" alt="" /></div>
        <div class="content">
          <div>住宿人數:4人</div>
          <div>豪華雙人房*2</div>
        </div>
        <div class="twd">TWD {{ order.actualPrice }}</div>
      </div>
      <template #footer>
        <div class="row">
          <div class="ordertime">訂單日期 {{ formatDate2(order.createdDate) }}</div>
          <div class="status"> {{ order.payStatus }} </div>
        </div>
      </template>
    </el-card>
  </div>
  <div class="state">
    <h2 class="desc">歷史訂單</h2>
    <el-card>
      <template #header>
        <div class="row">
          <div>
            <p class="location">台北</p>
            <p>2024年8月8日-2024年8月11日</p>
          </div>
          <el-icon class="option">
            <ArrowDownBold />
          </el-icon>
        </div>
      </template>
      <div class="history">
        <div class="row">
          <h1 class="hotel-name">兄弟大飯店</h1>
          <p class="twd">TWD 5280</p>
        </div>
        <div class="row">
          <div class="content">
            <p>住宿人數:4人</p>
            <p>豪華雙人房*2</p>
          </div>
          <div class="end">
            <p>已完成</p>
            <p>訂單日期2024/5/1 </p>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<style lang="scss" scoped>
.title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #00000022;

  h1 {
    letter-spacing: 2px;
  }

  .sub-title {
    opacity: 0.75;
    font-size: 1.15em;
    margin: 14px 0 23px;
    letter-spacing: 1px;
  }
}

.state {
  .desc {
    text-align: center;
    font-weight: 500;
    letter-spacing: 1px;
  }
}

.option {
  margin-top: 8px;
  margin-right: 5px;
  cursor: pointer;
  font-size: 2.3em;
}

.el-card {
  width: 98%;
  margin: 0 auto 25px;
  border-radius: 15px;
  box-shadow: 0 2px 3px -1px #00000019;
}

.end {
  text-align: end;
}

.twd {
  font-size: 1.2em;
  font-weight: bold;
}

.location {
  font-size: 1.15em;
  margin-bottom: 5px;
}

.hotel-name {
  font-size: 1.5em;
  letter-spacing: 1px;
  margin-bottom: 10px;
}

.history {
  align-items: center;

  p {
    margin-top: 2px;
  }
}

.row {
  display: flex;
  justify-content: space-between;

  .image {
    position: relative;
    aspect-ratio: 1/1;
    width: 120px;
    border-radius: 12px;
    overflow: hidden;
    flex-shrink: 0;
  }

  .content {
    margin-left: 20px;
    flex-grow: 1;
  }
}
</style>