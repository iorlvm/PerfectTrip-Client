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
                <div class="info">14:00 以後</div>
            </div>
            <div class="row">
                <div class="label">入住時間</div>
                <div class="info">14:00 以後</div>
            </div>
            <div class="row">
                <div class="label">入住時間</div>
                <div class="info">14:00 以後</div>
            </div>
            <div class="row">
                <div class="label">孩童XXX</div>
                <div class="info">
                    <h3>孩童政策</h3>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit .Dolore maiores quod sed illo
                        sequi,
                        iste officia a fugiat debitis eaque. Assumenda aspernatur facere maiores quia quo! Enim qui sit
                        corporis!</p>
                    <p>XXXXXXXXXXXX</p>
                </div>
            </div>
            <div class="row">
                <div class="label">入住時間</div>
                <div class="info">14:00 以後</div>
            </div>
            <div class="row">
                <div class="label">入住時間</div>
                <div class="info">14:00 以後</div>
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
            border-bottom: none;
        }
    }
}
</style>