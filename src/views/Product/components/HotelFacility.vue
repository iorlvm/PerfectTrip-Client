<script setup>

</script>

<template>
    <div>
        <div class="title">title</div>
        <div class="hot">熱門</div>
        <div class="list">
            <div class="col"></div>
            <div class="col"></div>
            <div class="col"></div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.title {
    height: 100px;
    border: 1px solid;
}

.hot {
    height: 100px;
    border: 1px solid;
}

.list {
    // height: 500px;
    border: 1px solid;
    display: flex;
    flex-wrap: wrap;

    .col {
        min-width: 450px;
        width: 50%;
        height: 100px;
        border: 1px solid;
    }
}
</style>