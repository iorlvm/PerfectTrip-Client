<script setup>
</script>

<template>
    <div>
        <div class="title">
            <h1>付款資訊</h1>
            <div class="sub-title">安全新增或移除付款方式，讓預訂更方便。</div>
        </div>
        <div class="row border-bottom">
            <div class="pay">付款卡片</div>
            <div class="desc">•••• 8888</div>
            <div class="edit"><a href="">刪除</a></div>
        </div>
        <div class="row border-bottom">
            <div class="pay">付款卡片</div>
            <div class="desc">•••• 8888</div>
            <div class="edit"><a href="">刪除</a></div>
        </div>
        <div class="row border-bottom">
            <div class="pay"></div>
            <div class="desc">使用新卡片付款</div>
            <div class="edit"><a href="">新增卡片</a></div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.title {
    border-bottom: 1px solid #00000022;

    h1 {
        letter-spacing: 2px;
    }

    .sub-title {
        opacity: 0.75;
        font-size: 1.15em;
        margin: 14px 0 23px;
        letter-spacing: 1px;
    }
}

.border-bottom {
    padding: 18px 12px;
    border-bottom: 1px solid #00000022;
}

.row {
    display: flex;
    justify-content: space-between;

    .pay {
        width: 150px;
    }

    .desc {
        flex-grow: 1;
    }

    .edit {
        width: 80px;

        a {
            color: #0b94cf;
        }
    }

}
</style>
