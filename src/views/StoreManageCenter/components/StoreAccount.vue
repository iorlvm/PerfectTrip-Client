<script setup>
import ManageToolbar from './ManageToolbar.vue';
</script>

<template>
    <ManageToolbar>
        <li>
            左選項1
        </li>
        <li>
            左選項2
        </li>
    </ManageToolbar>

    <div class="storeaccount">
        <div class="title">
            <div>
                <h1>帳號管理頁面</h1>
            </div>

        </div>
        <div class="row border-bottom">
            <div class="column">申請者名稱</div>
            <div class="info">萬豪集團</div>
            <div class="edit"><a href="">編輯</a></div>
        </div>
        <div class="row border-bottom">
            <div class="column">刊登名稱</div>
            <div class="info">萬豪酒店</div>
            <div class="edit"><a href="">編輯</a></div>
        </div>
        <div class="row border-bottom">
            <div class="column">營業地址</div>
            <div class="info">
                <div> 10491台北市中山區樂群二路199號</div>
                <div class="remind">此地址為營業地址</div>
            </div>
            <div class="edit"><a href="">編輯</a></div>
        </div>
        <div class="row border-bottom">
            <div class="column">聯絡電話</div>
            <div class="info">
                <div>+886 1234567890</div>
                <div class="remind">此電話將公佈於官方資訊</div>
            </div>
            <div class="edit"><a href="">編輯</a></div>
        </div>
        <div class="row border-bottom">
            <div class="column">旅館營業登記證號</div>
            <div class="info">府觀光業字第123456號</div>
            <div class="edit"><a href="">編輯</a></div>
        </div>
        <div class="row border-bottom">
            <div class="column">總資本額</div>
            <div class="info">43億6000萬元 </div>
            <div class="edit"><a href="">編輯</a></div>
        </div>
        <div class="row border-bottom">
            <div class="column">統一編號</div>
            <div class="info">888888</div>
            <div class="edit"><a href="">編輯</a></div>
        </div>
        <div class="row border-bottom">
            <div class="column">官方網站</div>
            <div class="info"><a href="https://www.taipeimarriott.com.tw/">https://www.taipeimarriott.com.tw/</a></div>
            <div class="edit"><a href="">編輯</a></div>
        </div>


    </div>

</template>
<style lang="scss" scoped>
.storeaccount {
    padding-left: 3%;

    .title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 0 6px 12px;
        border-bottom: 1px solid #00000022;

        h1 {
            letter-spacing: 2px;
        }
    }

    .remind {
        color: #0000006f;
    }

    .border-bottom {
        padding: 18px 12px;
        border-bottom: 1px solid #00000022;

        a {
            color: #0b94cf;
        }
    }

    .row {
        display: flex;
        justify-content: space-between;

        .column {
            width: 150px;
            // border: 1px solid black;
        }

        .info {
            flex-grow: 1;
            // border: 1px solid black;
        }

        .edit {
            width: 80px;

            // border: 1px solid black;
            a {
                color: #0b94cf;
            }
        }



    }
}
</style>



<style lang="scss" scoped></style>