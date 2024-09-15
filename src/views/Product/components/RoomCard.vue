<script setup>
import { ref } from 'vue';

const dialogVisible = ref(false)

const openDialog = () => {
    dialogVisible.value = true;
}



const roomData = ref({
    title: "標準雙人房",
    guestCount: 4,
    facilities: [
        {
            icon: '<i class="bi bi-check-lg"></i>',
            text: '兩張大床'
        },
        {
            icon: '<i class="bi bi-check-lg"></i>',
            text: '禁菸房'
        },
        {
            icon: '<i class="bi bi-check-lg"></i>',
            text: '淋浴間&浴缸'
        }
    ],
    days: 99,
    photos: [
        '/1.jpg',
        '/2.jpg',
        '/3.jpg',
    ],
    options: [
        {
            price: "19,654",
            notice: "預定須知",
            stockOptions: 3,
            selectedRoomCount: 0
        }
    ]
});
</script>

<template>
    <div class="room-card">
        <el-row class="title-block">
            <el-col :span="8">
                <h3>{{ roomData.title }}</h3>
            </el-col>
            <el-col :span="3"><span>住客人數</span></el-col>
            <el-col :span="3"><span>{{ roomData.days }} 晚房價</span></el-col>
            <el-col :span="8">預定須知</el-col>
            <el-col :span="2">選擇客房</el-col>
        </el-row>
        <el-row class="info-block">
            <el-col class="right-line" :span="8">
                <div class="photos">
                    <div class="photo" v-for="photo in roomData.photos" :key="photo">
                        <img :src="photo" alt="">
                    </div>
                </div>
                <div class="detail">
                    <p v-for="(facility, index) in roomData.facilities" :key="index">
                        <span v-html="facility.icon" style="margin-right: 8px;"></span>
                        <span>{{ facility.text }}</span>
                    </p>
                </div>
                <el-link class="show-more" type="primary" @click="openDialog">查看所有的設施與服務</el-link>
            </el-col>
            <el-col class="room-options" :span="16">
                <el-row class="room-option" v-for="(room, index) in roomData.options" :key="index">
                    <el-col class="right-line text-center" :span="4">
                        <i class="bi bi-person-fill" v-for="item in roomData.guestCount" :key="item"></i>
                    </el-col>
                    <el-col class="right-line price" :span="5">TWD <span>{{ room.price }}</span></el-col>
                    <el-col class="right-line" :span="12">{{ room.notice }}</el-col>
                    <el-col class="rightmost" :span="3">
                        <div class="room-count">
                            <el-select v-model="room.selectedRoomCount" placeholder="Select">
                                <el-option label="0" value="0" />
                                <el-option :label="i" :value="i" v-for="i in room.stockOptions" :key="i" />
                            </el-select>
                        </div>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
    </div>
    <el-dialog v-model="dialogVisible" :title="roomData.title" width="65%">
        <div>詳細資訊放這裡</div>
    </el-dialog>
</template>

<style lang="scss" scoped>
@media (min-width: 992px) {
    .rightmost {
        border-right: 1px solid #b2b9c1;
    }
}

@media (min-width: 1240px) {
    .photos {
        padding: 10px 8px !important;
        flex-direction: column;
        height: 50%;

        .photo {
            width: 33% !important;
            height: 40%;

            &:first-child {
                width: 65% !important;
                height: 80%;
            }
        }
    }
}

.bi-person-fill {
    font-size: 1.3em;
}

.title-block {
    background-color: $headerFooter;
    color: $xtxColor;
    position: sticky;
    top: 0;
    font-size: 1.1em;
    text-align: center;
    align-items: center;
    z-index: 1;

    .el-col {
        margin: 2px 0;

        span {
            padding-right: 12%; // 24網格系統無法整除 只好用這個微調置中
        }
    }

    h3 {
        line-height: 2;
        letter-spacing: 2px;
        font-weight: 500;
    }
}

.info-block {
    border-bottom: 3px solid $headerFooter;



    .photos {
        display: flex;
        flex-wrap: wrap;
        padding: 12px;
        gap: 8px;

        .photo {
            width: 40%;
            flex-grow: 1;
            border-radius: 5px;
            overflow: hidden;
            aspect-ratio: 16/9;

            &:first-child {
                width: 80%;
            }
        }
    }

    .detail {
        padding: 10px;
        font-size: 1.1em;

        p {
            margin: 8px 3px;

            span {
                &:first-child {
                    font-size: 1.3em;
                }
            }
        }
    }

    .show-more {
        margin: 5px 10px 15px;
        font-size: 1.1em;
    }

    .room-options {
        display: flex;
        flex-direction: column;
    }

    .room-option {
        flex-grow: 1;
        border-top: 1px solid #b2b9c1;

        .price {
            text-align: center;

            span {
                font-size: 1.2em;
                font-weight: bold;
                color: $priceColor;
            }
        }

        .el-col {
            padding: 5px 2px;
        }

        .text-center {
            text-align: center;
        }

        .room-count {
            width: 95%;
            margin: 0 auto;
        }

        &:first-child {
            border-top: none;
        }
    }

    .right-line {
        border-right: 1px solid #b2b9c1;
    }
}
</style>