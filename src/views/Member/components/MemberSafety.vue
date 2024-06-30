<script setup>
</script>

<template>
    <div>
        <div class="title">
            <h1>安全</h1>
            <div class="sub-title">修改安全設定、安全驗證或刪除您的帳戶。</div>
        </div>
        <div class="row border-bottom">
            <div class="secret">密碼</div>
            <div class="desc">定期更新您的密碼，讓帳戶安全有保障</div>
            <div class="edit"><a href="">重設</a></div>
        </div>
        <div class="row border-bottom">
            <div class="secret">雙重驗證</div>
            <div class="desc">設定雙重驗證，提升帳戶安全等級</div>
            <div class="edit"><a href="">設定</a></div>
        </div>
        <div class="row border-bottom">
            <div class="secret">活動狀態</div>
            <div class="desc">若選擇「登出」，除了此裝置外，您將從其他所有裝置登出。此過程最多需 10 分鐘。</div>
            <div class="edit"><a href="">登出</a></div>
        </div>
        <div class="row border-bottom">
            <div class="secret">刪除帳戶</div>
            <div class="desc">永久刪除您的 Booking.com 帳戶</div>
            <div class="edit"><a href="">刪除帳戶</a></div>
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

.row{
    display: flex;
    justify-content: space-between;

    .secret{
        width: 150px;
        // border: 1px solid black;
    }

    .desc{
        flex-grow: 1;
        // border: 1px solid black;
    }

    .edit{
        width: 80px;
        // border: 1px solid black;
        a{
            color: #0b94cf; 
        }
    }
    
}


</style>