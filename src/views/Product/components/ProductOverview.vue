<script setup>
import Tag from '@/components/Tag.vue';
import ProductAlbum from './ProductAlbum.vue';
import CouponBlock from './CouponBlock.vue';
import OverviewRate from './OverviewRate.vue';
import OverviewMap from './OverviewMap.vue';
import { onMounted, ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { getCompanyDetailAPI } from '@/apis/company';

const isOpenFlod = ref(false);

const openFlod = () => {
  isOpenFlod.value = true;
};

const emit = defineEmits([
  'openRate'
])

const props = defineProps([
  'rateData',
  'totalRate',
  'company',
  'facilities',
  'photos'
])


const rateScore = computed(() => (props.company.score || 6) / 2);

</script>

<template>
  <div>
    <div class="title">
      <p class="title-info">
        <tag> 年終回饋 </tag>
        &nbsp;
        <el-rate v-model="rateScore" disabled></el-rate>
      </p>
      <h2>{{ company.companyName }}</h2>
      <p class="location">{{ company.country }} - {{ company.city }}</p>
    </div>
    <el-row :gutter="20">
      <el-col :xs="24" :sm="24" :md="18">
        <ProductAlbum :photos />
      </el-col>
      <el-col :xs="0" :sm="0" :md="6">
        <div class="rate-map">
          <div class="rate">
            <OverviewRate :rateData="rateData" :score="company.score" :totalRate="totalRate"
              @openRate="emit('openRate')" />
          </div>
          <div class="map">
            <OverviewMap />
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="40" style="margin-top: 8px;">
      <el-col :xs="24" :sm="24" :md="16">
        <div class="introduce" :class="isOpenFlod ? '' : 'fold'">
          <div class="open-flod" v-if="!isOpenFlod">
            <el-button type="info" @click="openFlod" plain>顯示更多</el-button>
          </div>
          <p class="pre-line-text">
            {{ company.introduce }}
          </p>
        </div>
        <div class="facility-wrap">
          <h3>熱門設施</h3>
          <div class="facility-tags">
            <div class="tag" v-for="(facility, index) in facilities" :key="index">
              <i v-html="facility.facilityIcon"></i>
              <span>{{ facility.facilityName }}</span>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :md="8">
        <CouponBlock />
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
    font-size: 1em;
    padding: 14px;
    --el-button-hover-bg-color: #d7d8dd;
    --el-button-hover-text-color: #536288;
    --el-button-hover-border-color: #aeb6ca;
  }
}
</style>

<style lang="scss" scoped>
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


.rate-map {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .rate {
    height: 245px;
  }

  .map {
    height: 225px;
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

  .pre-line-text {
    line-height: 1.5;
    margin: 20px 3px;
    white-space: pre-line;
  }
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
