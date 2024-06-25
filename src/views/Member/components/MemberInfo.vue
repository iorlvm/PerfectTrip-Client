<script setup>
</script>

<template>
    <div>
        <div class="title">
            <div>
                <h1>個人資訊</h1>
                <p class="sub-title">更新個人資訊並查看我們如何使用這些資訊。</p>
            </div>
            <div class="avatar">
                <img src="" alt="">
                <div class="avatar-icon">
                    <el-icon size="23" color="#fff" class="camera">
                        <Camera />
                    </el-icon>
                </div>
            </div>
        </div>
        <div class="row border-bottom">
            其他內容 一行 一行 一行
        </div>
    </div>
</template>

<style lang="scss" scoped>
.title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    // padding-bottom: 12px;
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

    .avatar {
        position: relative;
        width: 70px;
        height: 70px;
        border-radius: 50%;
        border: 1px solid #ffb700;
        background-color: #dbe0e4;
        overflow: hidden;
        cursor: pointer;

        .avatar-icon {
            position: absolute;
            text-align: center;
            bottom: 0;
            width: 100%;
            height: 40%;
            background-color: #00000030;
        }
    }
}

.border-bottom {
    padding: 18px 12px;
    border-bottom: 1px solid #00000022;
}
</style>