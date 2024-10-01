<script setup>
import { onMounted, ref } from 'vue';
import { ElMessage } from 'element-plus';
import { addRateAPI, editRateAPI, getUserRateAPI } from '@/apis/rate';

// 定義本地的評論與評分
const rateId = ref(null);
const comment = ref('');
const rating = ref(0);

const isInput = ref(false);

const props = defineProps(['companyId']);

const submitComment = async () => {
    if (comment.value !== '' && rating.value > 0) {
        if (rateId.value) {
            await editRateAPI({
                companyReviewId: rateId.value,
                starRank: rating.value,
                comment: comment.value
            })
        } else {
            const res = await addRateAPI({
                companyId: props.companyId,
                starRank: rating.value,
                comment: comment.value
            })

            rateId.value = res.data.companyReviewsId;
        }
        isInput.value = false;
    } else {
        ElMessage.warning('請輸入評論並選擇評分');
    }
};


onMounted(async () => {
    const res = await getUserRateAPI(props.companyId);

    if (res.data) {
        rateId.value = res.data.companyReviewsId;
        comment.value = res.data.comment;
        rating.value = res.data.starRank;
    }
})
</script>

<template>
    <div v-if="rateId && !isInput" class="rate-edit">
        <div class="rate-item">
            <div class="rate-meta">
                <span class="rate-author">我的評論</span>
                <span class="edit" @click="isInput = true">點擊修改</span>
            </div>
            <div class="rate-comment-wrapper">
                <p class="rate-comment">{{ comment }}</p>
                <el-rate v-model="rating" :disabled="true" class="rate-stars"></el-rate>
            </div>
        </div>
    </div>
    <div class="rate-input-area" v-else>
        <el-input v-model="comment" type="textarea" placeholder="請輸入您的評論" class="rate-comment-input"
            :autosize="{ minRows: 3, maxRows: 6 }" resize="none" />
        <div class="rate-comment-wrapper">
            <el-rate v-model="rating" class="rate-stars-selector" />
            <el-button type="primary" @click="submitComment">
                提交評論
            </el-button>
        </div>
    </div>
</template>


<style scoped>
.rate-input-area {
    margin-bottom: 20px;
    padding: 15px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.rate-comment-input {
    margin-bottom: 10px;
}


.rate-edit {
    padding: 0 20px;
}

.rate-item {
    padding: 15px 0 5px;
    border-bottom: 1px solid #eaeaea;
}

.rate-comment-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
}

.rate-comment {
    font-size: 16px;
    color: #333;
    margin: 0;
}

.rate-stars {
    margin-left: 20px;
}

.rate-meta {
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    color: #666;
    margin-bottom: 10px;
}

.rate-author {
    font-weight: bold;
}

.edit {
    margin-right: 10px;
    /* font-weight: bold; */
    color: #409EFF;
    cursor: pointer;
}

.edit:hover {
    text-decoration: underline;
    color: #66b1ff;
}
</style>