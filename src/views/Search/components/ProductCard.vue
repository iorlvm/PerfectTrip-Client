<script setup>
import Tag from "@/components/Tag.vue";
import { ref, computed, onMounted } from "vue";
import router from "@/router";

const rateValue = ref(7.0);
const convertedScore = computed(() => {
  const score = rateValue.value / 2;
  return score;
});

const props = defineProps([
  'product',
  'days',
  'adultCount'
])


const routeToProduct = (id) => {
  router.push(
    `/company/${id}`
  )
}

const getRatingMessage = (score) => {
  if (score > 9) {
    return "超棒";
  } else if (score > 8) {
    return "推薦";
  } else if (score > 7) {
    return "不錯";
  } else if (score > 6) {
    return "一般";
  } else if (score > 5) {
    return "可接受";
  } else if (score > 4) {
    return "不推薦";
  } else {
    return "差勁";
  }
};

const getLongRatingMessage = (score) => {
  if (score > 9) {
    return "非常值得推薦！";
  } else if (score > 8) {
    return "非常值得一試！";
  } else if (score > 7) {
    return "值得考慮一下。";
  } else if (score > 6) {
    return "還算不錯啦。";
  } else if (score > 5) {
    return "勉強可以接受。";
  } else if (score > 4) {
    return "不太建議嘗試。";
  } else {
    return "強烈不推薦！";
  }
};


const formatScore = (score) => {
  const limitedScore = Math.max(0, Math.min(10, score));

  return limitedScore.toFixed(1);
};

onMounted(() => {
  rateValue.value = formatScore(props.product.score);
})

</script>

<template>
  <div class="hotel-card">
    <div class="image"><img :src="product.photo" alt="" /></div>
    <div class="info">
      <div class="row">
        <div class="col title">
          <h3>{{ product.companyName }}</h3>
          <p><el-rate v-model="convertedScore" disabled></el-rate></p>
          <p>
            <span>{{ product.country }}, {{ product.city }}</span>
          </p>
        </div>
        <div class="col rate">
          <div class="score">
            <div class="comment">
              <h3>
                {{ getRatingMessage(rateValue) }}
              </h3>
              <p class="small">
                {{ product.commentCount }}則評語
              </p>
            </div>
            <div class="number">{{ rateValue }}</div>
          </div>
          <div class="feature">{{ getLongRatingMessage(rateValue) }}</div>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <tag v-if="product.isPromotion">促銷中</tag>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <div class="details-info">
            <div class="narration">
              <h5>
                <span v-for="(name, index) in product.products" :key="index">
                  {{ (index > 0 ? '、' : '') + name }}
                </span>
              </h5>
            </div>
            <div class="remark">
              <p v-if="product.includesBreakfast">包含早餐</p>
              <p v-if="product.allowFreeCancellation"><i class="bi bi-check-lg"></i> 可免費取消</p>
              <p><i class="bi bi-check-lg"></i> 無須訂金</p>
            </div>
          </div>
        </div>
        <div class="col price">
          <div class="price-info">
            <p>{{ days }} 晚、 {{ adultCount }} 位成人</p>
            <p class="large">TWD {{ product.price }}</p>
            <p class="small">不含稅費與其他費用</p>
            <el-button type="primary" @click="routeToProduct(product.companyId)"> <!-- 靜態暫時寫死 記得要換 -->
              &nbsp;查看客房供應情況&nbsp;<el-icon>
                <ArrowRightBold />
              </el-icon></el-button>
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
}
</style>
