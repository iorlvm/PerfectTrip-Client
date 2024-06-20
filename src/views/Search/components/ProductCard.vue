<script setup>
import Tag from "@/components/Tag.vue";
import { ref, computed } from "vue";
import router from "@/router";

const rateValue = ref(9.2);
const convertedScore = computed(() => {
  const score = rateValue.value / 2;
  return score;
});

const routeToProduct = (id) => {
  router.push(
    `/product/${id}`
  )
}


</script>

<template>
  <div class="hotel-card">
    <div class="image"><img src="" alt="" /></div>
    <div class="info">
      <div class="row">
        <div class="col title">
          <h3>這家旅館名字超級長居然有一共二十六個中文字的旅館名稱</h3>
          <p><el-rate v-model="convertedScore" disabled></el-rate></p>
          <p>
            <span>國家, 地點</span>
            <span>顯示在地圖上</span>
          </p>
        </div>
        <div class="col rate">
          <div class="score">
            <div class="comment">
              <h3>
                很讚讚喔
              </h3>
              <p class="small">
                9,999則評語
              </p>
            </div>
            <div class="number">{{ rateValue }}</div>
          </div>
          <div class="feature">WOC! 這間 9.2 分</div>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <tag>年終回饋</tag>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <div class="details-info">
            <div class="narration">
              <h5>標準百人房</h5>
              <p>1 張國軍大通鋪</p>
            </div>
            <div class="remark">
              <p>包含三餐</p>
              <p><i class="bi bi-check-lg"></i> 可免費取消</p>
              <p><i class="bi bi-check-lg"></i> 無須訂金</p>
            </div>
            <div class="stock">此價格的客房在本站僅剩1間</div>
          </div>
        </div>
        <div class="col price">
          <div class="price-info">
            <p class="small">365 晚、 9,999 位成人</p>
            <p class="large">TWD 9,999,999</p>
            <p class="small">不含稅費與其他費用</p>
            <el-button type="primary" @click="routeToProduct(1)"> <!-- 靜態暫時寫死 記得要換 -->
              &nbsp;查看客房供應情況&nbsp;<i class="bi bi-chevron-right"></i></el-button>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.hotel-card .el-icon {
  margin: 0 !important;
}
</style>

<style lang="scss" scoped>
.hotel-card {
  margin: 20px 0;
  display: flex;
  padding: 15px;
  border: 1px solid;
  border-color: #e7e7e7;
  border-radius: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

  .image {
    position: relative;
    aspect-ratio: 1/1;
    width: 240px;
    min-width: 160px;
    border-radius: 12px;
    overflow: hidden;
    flex-shrink: 0;
  }

  .rate {
    min-width: 110px;
    margin-left: 10px;
    flex-shrink: 0;

    .score {
      display: flex;
      align-items: center;
    }

    .comment {
      margin-right: 10px;
      text-align: end;

      h3 {
        font-size: 1.2em;
      }

      .small {
        font-size: 0.9em;
      }
    }

    .feature {
      text-align: end;
      margin-top: 2px;
    }

    .number {
      font-size: 1.2em;
      font-weight: bold;
      width: 2em;
      height: 2em;
      color: #eeeeee;
      background-color: $headerFooter;
      text-align: center;
      line-height: 2;
      border-radius: 5px;
    }
  }

  .info {
    flex-grow: 1;
    margin: 10px 0px 10px 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .row {
      display: flex;
      justify-content: space-between;
    }

    .details-info {
      transform: translate(0, 5px);
      max-height: 105px;
      // overflow: hidden;
      border-left: 2px solid #cdcdcd;
      margin-left: 8px;
      padding-left: 12px;

      .stock {
        font-size: 0.85em;
        font-weight: 700;
        letter-spacing: 1px;
        color: $priceColor;
      }

      .remark {
        margin: 2px 0;
        font-size: 0.8em;
        font-weight: 500;
        letter-spacing: 1px;
      }

      .narration {
        h5 {
          letter-spacing: 1px;
          margin: 0;
        }

        p {
          font-size: 0.85em;
        }
      }
    }
  }

  .title {
    h3 {
      font-size: 1.3em;
      min-width: 160px;
    }

    p {
      span {
        margin: 0 10px;
      }

      :first-child {
        margin-left: 0;
      }

      :last-child {
        margin-right: 0;
      }
    }
  }

  .price {

    .price-info {
      width: 100%;

      .small {
        font-size: 0.8em;
      }

      .large {
        font-size: 1.5em;
        font-weight: bold;
      }

      p {
        text-align: end;
      }
    }
  }
}
</style>
