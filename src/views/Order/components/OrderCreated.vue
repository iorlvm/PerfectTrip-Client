<script setup>
import { onMounted, ref } from 'vue';
import OrderInfo from './OrderInfo.vue';
import { useRoute } from "vue-router";


const props = defineProps([
    'active'
])

const orderId = ref('1234567890');

const emit = defineEmits([
    'nextActive', 'backActive'
]);

const nextStep = () => {
    emit('nextActive');
}

const route = useRoute();

onMounted(() => {
    orderId.value = route.params.id;
    // TODO: 利用訂單id 取得訂單資料

    // 不知道為什麼用while會失效  只好寫的這麼醜陋了
    if (props.active < 3) {
        nextStep();
    }
    if (props.active < 3) {
        nextStep();
    }
    if (props.active < 3) {
        nextStep();
    }
})

</script>

<template>
    <div class="order-created">
        <div class="order-success">
            <el-result title="已收到您的訂單">
                <template #icon>
                    <i class="bi bi-check-circle success-icon"></i>
                </template>
                <template #sub-title>
                    <p class="desc">訂單編號：{{ orderId }}</p>
                </template>
            </el-result>
        </div>

        <OrderInfo />
    </div>
</template>


<style lang="scss" scoped>
.order-created {
    padding: 10px;
    margin: 20px;
    border: 1px solid #00000025;
    border-radius: 8px;
    box-shadow: 0 1px 3px -1px #00000020;

    .divider {
        margin: 10px 0;
    }

    .flex {
        display: flex;
        align-items: center;
    }

    .order-success {
        .desc {
            font-size: 1.1em;
        }

        .success-icon {
            color: $sucColor;
            font-size: 8em;
        }

    }
}
</style>