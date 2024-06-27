<script setup>
import Tag from '@/components/Tag.vue';
import ProductAlbum from './ProductAlbum.vue';
import { ref } from 'vue';

const rateScore = ref(5);
const isOpenFlod = ref(false);

const openFlod = () => {
  isOpenFlod.value = true;
};
</script>

<template>
  <div>
    <div class="title">
      <p class="title-info">
        <tag> 年終回饋 </tag>
        &nbsp;
        <el-rate v-model="rateScore" disabled></el-rate>
      </p>
      <h2>旅館名稱旅館名稱旅館名稱</h2>
      <p class="location">圖標 地點 位置 國家 -顯示地圖</p>
    </div>
    <el-row :gutter="20">
      <el-col :xs="24" :sm="24" :md="18">
        <ProductAlbum />
      </el-col>
      <el-col :xs="0" :sm="0" :md="6">
        <div class="rate-map">
          <div class="rate">rate</div>
          <div class="map">map</div>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="40">
      <el-col :xs="24" :sm="24" :md="16">
        <div class="introduce" :class="isOpenFlod ? '' : 'fold'">
          <div class="open-flod" v-if="!isOpenFlod">
            <el-button type="info" @click="openFlod" plain>顯示更多</el-button>
          </div>
          <p>
            Aurora Star Hotel
            地點絕佳，位於巴黎市中心，提供空調客房，擁有美麗的花園、免費WiFi和寬敞的露台。這間4星級飯店的每個房型都能欣賞到城市美景。住客可以享用館內餐廳和酒吧的美食。飯店還提供私人停車位。
          </p>
          <p>
            Aurora Star Hotel
            的所有客房均配備舒適的座位區、平面電視和保險箱。每間客房都備有寢具和毛巾，確保住客享有舒適的住宿體驗。
          </p>
          <p>
            飯店每天早上供應豐富的早餐，提供自助式、歐陸式和素食三種選擇，滿足不同住客的需求。
          </p>
          <p>
            櫃台服務人員會講法語、英語、西班牙語和中文，可以幫助住客規劃行程，解答各種問題。
          </p>
          <p>
            Aurora Star Hotel
            附近的人氣景點包括艾菲爾鐵塔、羅浮宮博物館和香榭麗舍大街。最近的機場是夏爾·戴高樂國際機場，距離
            Aurora Star Hotel 25 公里。飯店提供付費機場接駁服務。
          </p>
          <p>情侶特別喜歡這個位置，並給他們的雙人旅行住宿體驗評分9.8分。</p>
          <p>這邊的文字由旅館方輸入提供 (Html格式)</p>
        </div>
      </el-col>
      <el-col :xs="0" :sm="0" :md="8">
        <div class="coupon">coupon</div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :xs="24" :sm="19" :md="14">
        <div class="facility-wrap">
          <h3>熱門設施</h3>
          <div class="facility-tags">
            <div class="tag">
              <i class="bi bi-exclamation-circle"></i>
              <span>禁菸客房</span>
            </div>
            <div class="tag">
              <i class="bi bi-exclamation-circle"></i>
              <span>機場接駁車</span>
            </div>
            <div class="tag">
              <i class="bi bi-exclamation-circle"></i>
              <span>免費wife</span>
            </div>
            <div class="tag">
              <i class="bi bi-exclamation-circle"></i>
              <span>客房服務</span>
            </div>
            <div class="tag">
              <i class="bi bi-exclamation-circle"></i>
              <span>私人停車場</span>
            </div>
            <div class="tag">
              <i class="bi bi-exclamation-circle"></i>
              <span>餐廳</span>
            </div>
            <div class="tag">
              <i class="bi bi-exclamation-circle"></i>
              <span>家庭房</span>
            </div>
            <div class="tag">
              <i class="bi bi-exclamation-circle"></i>
              <span>24 小時接待櫃檯</span>
            </div>
            <div class="tag">
              <i class="bi bi-exclamation-circle"></i>
              <span>酒吧</span>
            </div>
            <div class="tag">
              <i class="bi bi-exclamation-circle"></i>
              <span>早餐評價很好</span>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<style lang="scss">
.title .el-icon {
  margin: 0 !important;
  width: 0.8em;
}

.open-flod {
  .el-button {
    opacity: 1;
    width: 100%;
    // margin-left: 2px;
    font-size: 1em;
    padding: 14px;
    --el-button-hover-bg-color: #d7d8dd;
    --el-button-hover-text-color: #536288;
    --el-button-hover-border-color: #aeb6ca;
  }
}
</style>

<style lang="scss" scoped>
.photos,
.rate,
.map,
.coupon {
  width: 100%;
  border: 1px solid #000;
}

.title {
  margin-bottom: 30px;

  h2 {
    margin: 0;
    line-height: 1.5;
    letter-spacing: 1px;
  }

  .title-info {
    display: flex;
    align-items: center;
    padding-left: 3px;
  }

  .location {
    margin-top: 10px;
  }
}

.photos {
  height: 500px;
}

.rate-map {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .rate {
    height: 270px;
  }

  .map {
    height: 185px;
  }
}

.fold {
  height: 200px;
}

.introduce {
  position: relative;
  overflow: hidden;
  margin-bottom: 20px;

  .open-flod {
    width: 100%;
    position: absolute;
    bottom: 0;
    background: linear-gradient(to bottom, #ffffffe5, #ffffff);

    ::before {
      content: "";
      position: absolute;
      top: -35px;
      left: 0;
      right: 0;
      height: 35px;
      background: linear-gradient(to bottom, rgba(255, 255, 255, 0), #ffffffe5);
      pointer-events: none;
    }
  }

  p {
    line-height: 1.5;
    margin: 20px 3px;
  }
}

.coupon {
  height: 185px;
  margin: 20px 0;
}

.facility-wrap {
  height: 125px;

  h3 {
    font-size: 1.2em;
    font-weight: 600;
    letter-spacing: 1px;
    margin: 1px 1px 8px;
  }

  .facility-tags {
    display: flex;
    flex-wrap: wrap;

    .tag {
      vertical-align: middle;
      line-height: 2;
      margin: 3px 5px;

      i {
        font-size: 1.2em;
      }

      span {
        margin: 0 10px;
      }
    }
  }
}
</style>
