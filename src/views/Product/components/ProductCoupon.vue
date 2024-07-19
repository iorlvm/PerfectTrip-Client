<script setup>
import { computed } from 'vue';

const props = defineProps({
    title: String,
    description: String,
    discount: String,
    expirationDate: String,
    containerWidth: Number,
});

const emit = defineEmits(['apply']);

const applyCoupon = () => {
    emit('apply');
};


const dynamicWidthStyle = computed(() => {
    if (props.containerWidth > 500) {
        return { width: `${props.containerWidth * 0.333 - 22}px` };
    } else {
        return { width: `${props.containerWidth - 35}px` };
    }
});

</script>

<template>
    <div class="coupon" :style="dynamicWidthStyle">
        <div class="coupon-header">
            <h3>{{ title }}</h3>
        </div>
        <div class="coupon-body">
            <p>{{ description }}</p>
            <p><strong>折扣：</strong>{{ discount }}</p>
            <p><strong>有效期至：</strong>{{ expirationDate }}</p>
            <button @click="applyCoupon">使用優惠券</button>
        </div>

    </div>
</template>


<style lang="scss" scoped>
.coupon {
    border: 1px solid #ccc;
    margin-right: 18px;
    border-radius: 10px;
    flex: 0 0 auto;
    overflow: hidden;

    &:first-child {
        margin-left: 18px;
    }
}

.coupon-header {
    background-color: #f8f8f8;
    padding: 10px 20px;
    border-bottom: 1px solid #ddd;
}

.coupon-body {
    padding: 10px 10px 20px;

    p {
        margin-left: 10px;
    }
}

button {
    margin-top: 10px;
    padding: 10px 20px;
    background-color: #e26237;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

button:hover {
    background-color: #bf3b0d;
}
</style>