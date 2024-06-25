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
                <div class="label">入住時間</div>
                <div class="info">11:00 以後</div>
            </div>
            <div class="row">
                <div class="label">退房時間</div>
                <div class="info">14:00 前</div>
            </div>
            <div class="row">
                <div class="label">預訂取消/ 預付政策</div>
                <div class="info">取消和預付款政策根據住宿類型而有所不同。請輸入您住房的日期並查看您所需選項的條件</div>
            </div>
            <div class="row">
                <div class="label">孩童加床選項</div>
                <div class="info">
                    <h3>孩童政策</h3>
                    <p>歡迎任何年齡的孩童入住</p>
                    <p>在此住宿，6 歲（含）以上的孩童將依成人價格收費。</p>
                    <p>搜尋時請加入同行孩童人數及年齡，以查看正確的房價及入住資訊。</p>

                    <h3>嬰兒床與加床政策</h3>
                    <div class="baby-bed">

                        <div class="baby-row">0－1 歲</div>

                        <div class="flex">
                            <div class="col">
                                可要求加嬰兒床
                            </div>
                            <div class="col">
                                免費
                            </div>
                        </div>
                    </div>

                    <p>嬰兒床和加床的費用不會計入總價中，您需在入住時另行支付。</p>
                    <p>允許的嬰兒床和加床數量需視您的選項而定，請查看您的選項以了解更多資訊。</p>
                    <p>嬰兒床與加床需視實際情況供應。</p>
                </div>
            </div>
            <div class="row">
                <div class="label">年齡限制</div>
                <div class="info">須年滿 20 歲才能辦理入住</div>
            </div>
            <div class="row">
                <div class="label">寵物</div>
                <div class="info">不允許攜帶寵物入住。</div>
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
    border: 1px solid #0000002a;
    border-radius: 8px;

    .row {
        display: flex;
        border-bottom: 1px solid #0000002a;
        align-items: center;
        line-height: 2;
        padding: 25px 5px;

        .label {
            min-width: 250px;
            width: 22%;
        }

        .info {
            max-width: 78%;
        }

        &:last-child {
            border: none;
        }
    }
}

.baby-bed {
    border: 1px solid #0000002a;

    .flex {
        display: flex;



        .col {
            width: 50%;
            padding-left: 10px;
        }
    }

    .baby-row {
        border-bottom: 1px solid #0000002a;
        padding-left: 10px;
    }

}
</style>