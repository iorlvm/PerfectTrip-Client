<script setup>

</script>

<template>
    <div>
        <div class="title">
            <h3>住宿規定</h3>
            <div>查看客房狀態</div>
        </div>
        <div class="ruleCard">

            <div class="row">
                <div class="label"> 入住時間 </div>
                <div class="info"> 16:00 後
                    <p> 住客在入住時須出示有相片的身分證明及信用卡</p>
                </div>
            </div>
            <div class="row">
                <div class="label"> 退房時間 </div>
                <div class="info"> 11:00 前
                </div>
            </div>
            <div class="row">
                <div class="label"> 預訂取消/ 預付政策 </div>
                <div class="info"> 16:00 後
                    住客在入住時須出示有相片的身分證明及信用卡 </div>
            </div>
            <div class="row">
                <div class="label"> 孩童加床選項 </div>
                <div class="info"> 16:00 後
                    住客在入住時須出示有相片的身分證明及信用卡 </div>
            </div>
            <div class="row">
                <div class="label"> 年齡限制
                </div>
                <div class="info"> 16:00 後
                    住客在入住時須出示有相片的身分證明及信用卡 </div>
            </div>
            <div class="row">
                <div class="label"> 寵物 </div>
                <div class="info"> 16:00 後
                    住客在入住時須出示有相片的身分證明及信用卡 </div>
            </div>

        </div>


    </div>

</template>



<style lang="scss" scoped>
.title {
    display: flex;
    justify-content: space-between;

}

.ruleCard {
    padding: 20px;
    border: 1px solid #00000061;
    border-radius: 8px;


    // height: 300px;
    .row {
        align-items: center;
        display: flex;
        height: 100px;
        border-bottom: 1px solid #00000061;
        line-height: 2; //行高設定
        padding: 25px 5px; //


        .label {
            min-width: 250px;
            width: 30%;
            background-color: #00000061;
        }

        &:last-child {
            border-bottom: none;
        }
    }
}
</style>