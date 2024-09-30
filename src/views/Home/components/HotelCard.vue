<script setup>
import router from '@/router';

const baseURL = 'http://localhost:8080/';

defineProps([
    'item'
]);

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

const formateDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 月份需要 +1
    const day = String(date.getDate()).padStart(2, '0');        // 保證日期是兩位數
    return `${year}-${month}-${day}`;
}


const routeToCompany = (id) => {
    const date1 = new Date();
    date1.setDate(date1.getDate() + 3);
    const date2 = new Date();
    date2.setDate(date2.getDate() + 4);

    const startDate = formateDate(date1);
    const endDate = formateDate(date2);

    router.push({
        path: `/company/${id}`,
        query: {
            startDate,  // 日期範圍的開始日期
            endDate,    // 日期範圍的結束日期
            adultCount: 2,
            childCount: 0,
            roomCount: 1
        }
    })
}

</script>

<template>
    <div class="accommodation-card" @click="routeToCompany(item.companyId)">
        <el-carousel height="200px" class="accommodation-image" :autoplay="false">
            <el-carousel-item v-for="photo in item.photos.slice(0, 3)" :key="photo">
                <img :src="baseURL + photo.photoUrl" :alt="photo.description">
            </el-carousel-item>
        </el-carousel>

        <div class="accommodation-content">
            <h3 class="accommodation-title">{{ item.companyName }}</h3>
            <p class="accommodation-desc">{{ item.country }}, {{ item.city }}</p>
            <div class="rate-block">
                <span class="rate">{{ item.score }}</span>
                <span>{{ getRatingMessage(item.score) }}－{{ item.rateCount }} 則評語</span>
            </div>
        </div>
    </div>
</template>

<style>
.accommodation-card .el-carousel__indicator {
    --el-carousel-indicator-width: 25px;
}
</style>

<style lang="scss" scoped>
.accommodation-card {
    border: 1px solid #ddd;
    border-radius: 8px;
    overflow: hidden;
    width: 20%;
    flex-grow: 1;
    min-width: 225px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s, box-shadow 0.3s;
    cursor: pointer;


    @media screen and (max-width: 1024px) {
        width: 40%;
    }

    &:hover {
        transform: translateY(-3px);
    }

    .accommodation-image {
        width: 100%;
        height: 200px; // 根據需要調整高度
        object-fit: cover;
    }

    .accommodation-content {
        padding: 12px;

        .accommodation-title {
            font-size: 1.25em;
            margin-bottom: 4px;
            color: #333;
        }

        .accommodation-desc {
            font-size: 1em;
            margin-bottom: 12px;
            color: #666;
        }

        .rate-block {
            margin-bottom: 22px;
            font-size: 0.95em;

            .rate {
                background-color: $headerFooter;
                font-weight: bold;
                color: #fff;
                padding: 5px;
                border-radius: 5px;
                margin-right: 8px;
            }

        }

    }


}
</style>
