<script setup>
</script>

<template>
    <div class="accommodation-card">
        <el-carousel height="200px" class="accommodation-image" :autoplay="false">
            <el-carousel-item v-for="item in 3" :key="item">
                <img src="/1.jpg" alt="住宿圖片">
            </el-carousel-item>
        </el-carousel>

        <div class="accommodation-content">
            <h3 class="accommodation-title">住宿名稱</h3>
            <p class="accommodation-desc">國家, 地點</p>
            <div class="rate-block">
                <span class="rate">9.7</span>
                <span>傑出－9,999 則評語</span>
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
