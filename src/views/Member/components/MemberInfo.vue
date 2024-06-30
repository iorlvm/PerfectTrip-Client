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
            <div class="column">姓名</div>
            <div class="info">宋仲基</div>
            <div class="edit"><a href="">編輯</a></div>
        </div>
        <div class="row border-bottom">
            <div class="column">顯示名稱</div>
            <div class="info">輸入顯示名稱</div>
            <div class="edit"><a href="">編輯</a></div>
        </div>
        <div class="row border-bottom">
            <div class="column">電子信箱</div>
            <div class="info">
                <div> 12345678@gmail.com</div>
                <div class="remind">這是您用來登入的電子信箱，我們也會發送預訂確認函至此信箱。</div>
            </div>
            <div class="edit"><a href="">編輯</a></div>
        </div>
        <div class="row border-bottom">
            <div class="column">電話號碼</div>
            <div class="info">
                <div>+886 1234567890</div>
                <div class="remind">若有需要，您預訂的住宿或景點／活動供應商會使用此號碼聯繫您。</div>
            </div>
            <div class="edit"><a href="">編輯</a></div>
        </div>
        <div class="row border-bottom">
            <div class="column">出生日期</div>
            <div class="info">請輸入您的生日</div>
            <div class="edit"><a href="">編輯</a></div>
        </div>
        <div class="row border-bottom">
            <div class="column">國籍</div>
            <div class="info">韓國</div>
            <div class="edit"><a href="">編輯</a></div>
        </div>
        <div class="row border-bottom">
            <div class="column">性別</div>
            <div class="info">請選擇您的性別</div>
            <div class="edit"><a href="">編輯</a></div>
        </div>
        <div class="row border-bottom">
            <div class="column">地址</div>
            <div class="info">韓國</div>
            <div class="edit"><a href="">編輯</a></div>
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

.remind{
    color: #0000006f;
}

.border-bottom {
    padding: 18px 12px;
    border-bottom: 1px solid #00000022;
}

.row{
    display: flex;
    justify-content: space-between;

    .column{
        width: 150px;
        // border: 1px solid black;
    }

    .info{
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