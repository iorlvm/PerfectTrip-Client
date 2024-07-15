<script setup>
defineProps({
    title: String,
    desc: String
});
</script>

<template>
    <div class="coupon-wrap">
        <h2>{{ title }}</h2>
        <p class="desc">{{ desc }}</p>
        <div class="card-container">
            <slot>

            </slot>
        </div>
    </div>
</template>


<style lang="scss" scoped>
.coupon-wrap {
    width: 95%;
    margin: 60px auto 0;

    h2 {
        font-size: 1.6em;
        letter-spacing: 2px;
        margin-bottom: 5px;
    }

    .desc {
        color: #606060;
        font-size: 1.18em;
        letter-spacing: 1px;
        margin-bottom: 20px;
    }

    .card-container {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        gap: 18px;
    }

}
</style>