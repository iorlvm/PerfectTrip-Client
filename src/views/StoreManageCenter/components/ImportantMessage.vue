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

    <el-scrollbar>
        <div class="list-block">
            <div class="message">2024-06-28
                <h3>折價券到期提醒</h3>
                <p>您帳號有兄弟大飯店折價券即將於2024-07-01到期，可至票券匣頁面查看並請盡快使用。</p>
            </div>
            <br>
            <div class="message">2024-06-28
                <h3>折價券到期提醒</h3>
                <p>您帳號有長榮桂冠酒店折價券即將於2024-07-15到期，可至票券匣頁面查看並請盡快使用。</p>
            </div>
        </div>
    </el-scrollbar>

</template>

<style lang="scss" scoped>
.list-block {
    .message {
        display: flex;
        justify-content: space-between;
        padding: 40px;
        border: 1px solid #0000002a;
        border-radius: 8px;

    }

}
</style>