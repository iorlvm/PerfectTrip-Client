<script setup>
import ProductCoupon from './ProductCoupon.vue';
import { ref, onMounted, onBeforeUnmount } from 'vue';

const coupons = ref([
  {
    id: 1,
    title: '夏日特惠',
    description: '夏日專享，所有商品打八折！',
    discount: '20%',
    expirationDate: '2024-08-31',
  },
  {
    id: 2,
    title: '新用戶禮包',
    description: '新用戶首次購物享受九折優惠！',
    discount: '10%',
    expirationDate: '2024-12-31',
  },
  {
    id: 2,
    title: '新用戶禮包',
    description: '新用戶首次購物享受九折優惠！',
    discount: '10%',
    expirationDate: '2024-12-31',
  }, {
    id: 2,
    title: '新用戶禮包',
    description: '新用戶首次購物享受九折優惠！',
    discount: '10%',
    expirationDate: '2024-12-31',
  }, {
    id: 2,
    title: '新用戶禮包',
    description: '新用戶首次購物享受九折優惠！',
    discount: '10%',
    expirationDate: '2024-12-31',
  },
]);

const couponWrapper = ref(null);
const couponBlock = ref(null);
const showLeftButton = ref(false);
const showRightButton = ref(true);

const containerWidth = ref(0);


const handleScroll = () => {
  const wrapper = couponWrapper.value;
  showLeftButton.value = wrapper.scrollLeft > 5;
  showRightButton.value = wrapper.scrollLeft + wrapper.clientWidth < wrapper.scrollWidth - 5;
};

let scrolOnce = 0;
let preWidth;
let scrolTimes = 0;
const handleResize = () => {
  containerWidth.value = couponBlock.value.clientWidth;
  if ((containerWidth.value !== preWidth)) {
    // RWD時 重置卷軸座標
    setTimeout(() => {
      // 設定少許延遲避免錯位
      couponWrapper.value.scrollTo({ left: (scrolTimes * (scrolOnce)), behavior: 'instant' });
    }, 1)
    preWidth = containerWidth.value;
  }
  if (containerWidth.value > 500) {
    scrolOnce = containerWidth.value * 0.334 - 4;
  } else {
    scrolOnce = containerWidth.value - 18;
  }
  handleScroll();
};

const scrollLeft = () => {
  couponWrapper.value.scrollBy({ left: -scrolOnce, behavior: 'smooth' });
  scrolTimes--;
  setTimeout(() => {
    // 左右強制座標校正
    if (!showLeftButton.value) couponWrapper.value.scrollTo({ left: 0, behavior: 'instant' });
  }, 1)
};

const scrollRight = () => {
  couponWrapper.value.scrollBy({ left: scrolOnce, behavior: 'smooth' });
  scrolTimes++;
  setTimeout(() => {
    // 左右強制座標校正
    if (!showRightButton.value) couponWrapper.value.scrollTo({ left: couponWrapper.value.scrollWidth - couponWrapper.value.clientWidth, behavior: 'instant' });
  }, 1)
};



const handleApply = (couponId) => {
  alert(`優惠券 ${couponId} 已使用！`);
};

let resizeObserver;
onMounted(() => {
  handleResize();
  couponWrapper.value.addEventListener('scroll', handleScroll);

  resizeObserver = new ResizeObserver(handleResize);
  resizeObserver.observe(couponBlock.value);
});

onBeforeUnmount(() => {
  resizeObserver.unobserve(couponBlock.value);
  resizeObserver.disconnect();
});
</script>

<template>
  <div ref="couponBlock" class="coupon-block">
    <button v-if="showLeftButton" @click="scrollLeft" class="scroll-button left">
      <el-icon>
        <ArrowLeftBold />
      </el-icon>
    </button>
    <div class="coupon-wrapper" ref="couponWrapper">
      <ProductCoupon v-for="coupon in coupons" :key="coupon.id" :title="coupon.title" :description="coupon.description"
        :discount="coupon.discount" :expirationDate="coupon.expirationDate" :containerWidth="containerWidth"
        @apply="handleApply(coupon.id)" />
      <button v-if="showRightButton" @click="scrollRight" class="scroll-button right">
        <el-icon>
          <ArrowRightBold />
        </el-icon>
      </button>
    </div>
  </div>
</template>


<style lang="scss" scoped>
@media (max-width: 991px) {

  .coupon-block {
    // border-top: 1px solid #00000020;
    padding-top: 15px;
    transform: none !important;
  }

  .scroll-button {
    transform: none !important;
  }
}

.coupon-block {
  width: 100%;
  margin: 20px 0;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
  transform: translateX(18px);

  .coupon-wrapper {
    display: flex;
    overflow-x: auto;
    scroll-behavior: smooth;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  .scroll-button {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #eff2f4;
    color: #7d96a0;
    border: none;
    border-radius: 50%;
    border: 1px solid #cad7dc;
    width: 34px;
    height: 34px;
    cursor: pointer;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 1;
    line-height: 1;

    &.left {
      left: 0;
    }

    &.right {
      right: 0;
    }

    &:hover {
      background-color: #7d96a0;
      border-color: #7d96a0;
      color: white;
    }
  }
}
</style>