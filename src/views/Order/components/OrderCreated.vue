<script setup>
defineProps([
    'active'
])

const emit = defineEmits([
    'nextActive', 'backActive'
]);

const nextStep = () => {
    emit('nextActive');
}

</script>

<template>
    <div class="order-created">
        <div class="temp">
            訂單創建成功 請選擇付款方式 (畫面呈現方式待討論)
        </div>
    </div>
</template>


<style lang="scss" scoped>
.order-created {
    padding: 10px 30px 10px 20px;
    margin: 20px 0;
    border: 1px solid #00000025;
    border-radius: 8px;
    box-shadow: 0 4px 8px -2px #00000020;
}

.temp {
    text-align: center;
    line-height: 50;
    width: 100%;
    border: 1px solid;
}
</style>