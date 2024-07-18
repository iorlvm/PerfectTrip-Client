<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

const emit = defineEmits([
    'openRate'
])

const comments = ref([
    {
        id: 1, text: `只要不知道是誰說的\n通通可以當成是胡適講的。`, author: '胡適 (並沒有說過這句話)'
    },
    { id: 2, text: '服務非常好，會再來！', author: '用戶B' },
    { id: 3, text: '食物很美味，推薦！', author: '用戶C' },
    { id: 4, text: '環境非常舒適！', author: '用戶D' },
    { id: 5, text: '價格合理，值得一試！', author: '用戶E' },
    { id: 6, text: '非常滿意這次的住宿！', author: '用戶F' },
]);

const commentWrapper = ref(null);
const commentBlock = ref(null);
const showLeftButton = ref(false);
const showRightButton = ref(true);

const containerWidth = ref(0);
let scrollUnit = 0;
let scrollTimes = 0;
let preWidth = 0;

const handleScroll = () => {
    const wrapper = commentWrapper.value;
    showLeftButton.value = wrapper.scrollLeft > 0;
    showRightButton.value = wrapper.scrollLeft + wrapper.clientWidth < wrapper.scrollWidth;
};

const handleResize = () => {
    containerWidth.value = commentBlock.value.clientWidth;

    if (containerWidth.value !== preWidth) {
        setTimeout(() => {
            commentWrapper.value.scrollTo({ left: (scrollTimes * scrollUnit), behavior: 'instant' });
        }, 1)
        preWidth = containerWidth.value;
    }

    scrollUnit = containerWidth.value;

    handleScroll();
};

const scrollLeft = (e) => {
    e.stopPropagation();
    commentWrapper.value.scrollBy({ left: -scrollUnit, behavior: 'smooth' });
    scrollTimes++;
};

const scrollRight = (e) => {
    e.stopPropagation();
    commentWrapper.value.scrollBy({ left: scrollUnit, behavior: 'smooth' });
    scrollTimes--;
};

let resizeObserver
onMounted(() => {
    handleResize();
    resizeObserver = new ResizeObserver(handleResize);

    resizeObserver.observe(commentBlock.value);
    commentWrapper.value.addEventListener('scroll', handleScroll);
});

onBeforeUnmount(() => {
    resizeObserver.unobserve(commentBlock.value);
    resizeObserver.disconnect();
});

</script>

<template>
    <div class="rate-container">
        <div class="title" @click="emit('openRate')">
            <div class="desc">
                <p>好吉了</p>
                <p>9,999則評語</p>
            </div>
            <div class="point">9.2</div>
        </div>
        <div class="contect" ref="commentBlock">
            <button v-if="showLeftButton" @click="scrollLeft" class="scroll-button left">
                <el-icon style="transform: translateY(1px);">
                    <ArrowLeftBold />
                </el-icon>
            </button>
            <div class="comment-wrapper" ref="commentWrapper">
                <div v-for="comment in comments" :key="comment.id" class="comment"
                    :style="{ width: `${containerWidth - 20}px` }">
                    <p>{{ comment.text }}</p>
                    <p class="author">{{ comment.author }}</p>
                </div>
            </div>
            <button v-if="showRightButton" @click="scrollRight" class="scroll-button right">
                <el-icon style="transform: translateY(1px);">
                    <ArrowRightBold />
                </el-icon>
            </button>
        </div>
    </div>
</template>


<style lang="scss" scoped>
.rate-container {
    width: 100%;
    height: 100%;
    border: 1px solid #00000030;
    border-radius: 10px;

    .title {
        height: 60px;
        border-bottom: 1px solid #00000030;
        padding: 0 10px;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        font-size: 1.15em;
        cursor: pointer;

        .desc {
            text-align: end;
            line-height: 1;

            p {

                &:last-child {
                    margin-top: 5px;
                    font-size: 0.8em;
                    color: #00000080;
                }
            }
        }

        .point {
            padding: 5px;
            background-color: $headerFooter;
            color: #fff;
            border-radius: 5px;
            margin-left: 8px;
        }
    }

    .contect {
        position: relative;
        display: flex;
        align-items: center;
        overflow: hidden;
        height: calc(100% - 60px);



        .scroll-button {
            line-height: 1;
            background-color: transparent;
            color: #7d96a0;
            border: none;
            padding: 5px;
            cursor: pointer;
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            z-index: 1;

            &.left {
                left: 0;
            }

            &.right {
                right: 0;
            }

            &:hover {
                background-color: #eff2f4;
            }
        }

        .comment-wrapper {
            display: flex;
            overflow-x: auto;
            scroll-behavior: smooth;
            height: 100%;
            padding: 10px 0;

            &::-webkit-scrollbar {
                display: none;
            }

            .comment {
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                flex-shrink: 0;
                height: 100%;
                margin: 0 10px;
                padding: 10px;

                p {
                    margin: 0;
                    white-space: pre-line;
                    text-wrap: wrap;

                    &.author {
                        text-align: end;
                        margin-top: 5px;
                        font-size: 0.85em;
                        color: #666;
                    }
                }
            }
        }
    }
}
</style>