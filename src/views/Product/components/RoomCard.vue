<script setup>
import { ref } from 'vue';

const roomCount = ref([0, 0]);
</script>

<template>
    <div class="room-card">
        <el-row class="title-block">
            <el-col :span="12">
                <h3>標準雙人房</h3>
            </el-col>
            <el-col :span="2">住客人數</el-col>
            <el-col :span="3">99 晚房價</el-col>
            <el-col :span="5">預定須知</el-col>
            <el-col :span="2">選擇客房</el-col>
        </el-row>
        <el-row class="info-block">
            <el-col class="right-line" :span="12">圖片&詳細解說</el-col>
            <el-col :span="12">
                <el-row class="room-option">
                    <el-col class="right-line text-center" :span="4">
                        <i class="bi bi-person-fill"></i>
                        <i class="bi bi-person-fill"></i>
                        <i class="bi bi-person-fill"></i>
                        <i class="bi bi-person-fill"></i>
                    </el-col>
                    <el-col class="right-line" :span="6">TWD 19,654</el-col>
                    <el-col class="right-line" :span="10">預定須知</el-col>
                    <el-col class="rightmost" :span="4">
                        <div class="room-count">
                            <el-select v-model="roomCount[0]" placeholder="Select">
                                <el-option label="0" value="0" />
                                <el-option label="1" value="1" />
                            </el-select>
                        </div>
                    </el-col>
                </el-row>
                <el-row class="room-option top-line">
                    <el-col class="right-line text-center" :span="4">
                        <i class="bi bi-person-fill"></i>
                        <i class="bi bi-person-fill"></i>
                        <i class="bi bi-person-fill"></i>
                        <i class="bi bi-person-fill"></i>
                    </el-col>
                    <el-col class="right-line" :span="6">TWD 19,654</el-col>
                    <el-col class="right-line" :span="10">預定須知</el-col>
                    <el-col class="rightmost" :span="4">
                        <div class="room-count">
                            <el-select v-model="roomCount[1]" placeholder="Select">
                                <el-option label="0" value="0" />
                                <el-option label="1" value="1" />
                            </el-select>
                        </div>

                    </el-col>
                </el-row>
            </el-col>
        </el-row>
    </div>

</template>

<style lang="scss" scoped>
@media (min-width: 992px) {
    .rightmost {
        border-right: 1px solid #b2b9c1;
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
    }

    h3 {
        line-height: 2;
        letter-spacing: 2px;
        font-weight: 500;
    }
}

.info-block {
    border-bottom: 3px solid $headerFooter;

    .room-option {
        height: 200px;

        .el-col {
            padding: 2px;
        }

        .text-center {
            text-align: center;
        }

        .room-count {
            width: 95%;
            margin: 0 auto;
        }
    }

    .right-line {
        border-right: 1px solid #b2b9c1;
    }

    .top-line {
        border-top: 1px solid #b2b9c1;
    }
}
</style>