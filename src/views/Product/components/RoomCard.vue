<script setup>
import { ref, computed } from 'vue';

const dialogVisible = ref(false)

const openDialog = () => {
    dialogVisible.value = true;
}

const props = defineProps({
    roomInfo: Object
})

const mainIndex = ref(0);
const mainPhoto = computed(() => roomData.value.photos[mainIndex.value] || {});

const changMainPhoto = (index) => {
    mainIndex.value = index;
}

const emit = defineEmits([
    'select-product'
]);
const emitSelectedCount = (productId, selectedCount) => {
    emit('select-product', { productId, selectedCount });
};


const roomData = ref({
    title: props.roomInfo.productName,
    guestCount: props.roomInfo.maxOccupancy,
    facilities: props.roomInfo.facilities.slice(0, 3),
    days: props.roomInfo.days,
    photos: props.roomInfo.photos.slice(0, 3),
    options: [
        {
            productId: props.roomInfo.productId,
            price: props.roomInfo.price,
            includesBreakfast: props.roomInfo.includesBreakfast,
            allowDateChanges: props.roomInfo.allowDateChanges,
            isRefundable: props.roomInfo.isRefundable,
            allowFreeCancellation: props.roomInfo.allowFreeCancellation,
            stockOptions: props.roomInfo.remainingRooms,
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
                        <img :src="photo.photoUrl" :alt="photo.description">
                    </div>
                </div>
                <div class="detail">
                    <p v-for="(facility, index) in roomData.facilities" :key="index">
                        <span v-html="facility.facilityIcon" style="margin-right: 8px;"></span>
                        <span>{{ facility.facilityName }}</span>
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
                    <el-col class="right-line notice" :span="12">
                        <li>{{ room.includesBreakfast ? '' : '不' }}包含早餐</li>
                        <li v-if="room.allowDateChanges">可更改日期</li>
                        <li v-if="room.allowFreeCancellation">可免費取消</li>
                        <li v-if="room.isRefundable">可退款</li>
                    </el-col>
                    <el-col class="rightmost" :span="3">
                        <div class="room-count">
                            <el-select v-model="room.selectedRoomCount" placeholder="Select"
                                @change="emitSelectedCount(room.productId, room.selectedRoomCount)">
                                <el-option label="0" value="0" />
                                <el-option :label="i" :value="i" v-for="i in room.stockOptions" :key="i" />
                            </el-select>
                        </div>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
    </div>
    <el-dialog v-model="dialogVisible" :title="roomData.title" width="70%">
        <div class="product-detail">
            <div class="left-section">
                <div class="main-photo">
                    <img :src="mainPhoto.photoUrl" :alt="mainPhoto.description">
                </div>
                <div class="photo-list">
                    <div class="detail-photo" v-for="(photo, index) in roomData.photos" :key="photo.photoUrl"
                        @click="changMainPhoto(index)">
                        <img :src="photo.photoUrl" :alt="photo.description">
                    </div>
                </div>
            </div>
            <div class="right-section">
                <div class="intro">
                    <h2>{{ roomData.title }}</h2>
                    <p>可容納人數: {{ roomData.guestCount }}</p>
                    <p>入住天數: {{ roomData.days }}</p>
                </div>
                <div class="facilities">
                    <h3>設施</h3>
                    <div class="facility-list">
                        <div v-for="(facility, index) in roomData.facilities" :key="index" class="facility-item">
                            <span v-html="facility.facilityIcon" class="facility-icon"></span>
                            <span>{{ facility.facilityName }}</span>
                        </div>
                    </div>
                </div>
                <div class="options">
                    <h3>房間選項</h3>
                    <p>價格: {{ roomData.options[0].price }} 元</p>
                    <p>包含早餐: {{ roomData.options[0].includesBreakfast ? '是' : '否' }}</p>
                    <p>允許更改日期: {{ roomData.options[0].allowDateChanges ? '是' : '否' }}</p>
                    <p>可退款: {{ roomData.options[0].isRefundable ? '是' : '否' }}</p>
                    <p>免費取消: {{ roomData.options[0].allowFreeCancellation ? '是' : '否' }}</p>
                    <p>剩餘房間數: {{ roomData.options[0].stockOptions }}</p>
                </div>
            </div>
        </div>
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

        .notice {
            padding: 5px 20px;

            li {
                font-size: 1.1em;
                margin: 5px 0px;
            }
        }

        &:first-child {
            border-top: none;
        }
    }

    .right-line {
        border-right: 1px solid #b2b9c1;
    }
}

.product-detail {
    display: flex;
    gap: 20px;

    .left-section {
        flex: 1;
        display: flex;
        flex-direction: column;

        .main-photo {
            margin-bottom: 20px;
            height: 40vh;

            img {
                border-radius: 8px;
            }
        }

        .photo-list {
            display: flex;
            gap: 10px;
            flex-wrap: wrap;

            .detail-photo {
                flex: 1 1 calc(33% - 10px);
                box-sizing: border-box;
                cursor: pointer;

                img {
                    border-radius: 4px;
                }
            }
        }
    }

    .right-section {
        flex: 1;
        display: flex;
        flex-direction: column;

        .intro {
            margin-bottom: 20px;

            h2 {
                font-size: 28px;
                margin-bottom: 10px;
            }

            p {
                margin: 5px 0;
            }
        }

        .facilities {
            margin-bottom: 20px;

            h3 {
                font-size: 20px;
                margin-bottom: 10px;
            }

            .facility-list {
                display: flex;
                flex-wrap: wrap;
                gap: 15px;

                .facility-item {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    flex: 1 1 calc(33% - 15px);

                    .facility-icon {
                        width: 24px;
                        height: 24px;
                    }
                }
            }
        }

        .options {
            h3 {
                font-size: 20px;
                margin-bottom: 10px;
            }

            p {
                margin: 5px 0;
            }
        }
    }
}
</style>