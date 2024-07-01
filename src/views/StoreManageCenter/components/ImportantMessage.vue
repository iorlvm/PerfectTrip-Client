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
            <div class="message">
                <div class="icon">
                    <el-icon>
                        <Message />
                    </el-icon>
                </div>
                <p class="date"> 2024-06-28</p>
                <div class="type">折價券到期提醒</div>
                <p class="info-title">您帳號有兄弟大飯店折價券即將於2024-07-01到期，可至票券匣頁面查看並請盡快使用。</p>
            </div>

            <div class="message">
                <div class="icon">
                    <el-icon>
                        <Message />
                    </el-icon>
                </div>
                <p class="date"> 2024-06-28</p>
                <div class="type">折價券到期提醒</div>
                <p class="info-title">您帳號有長榮桂冠酒店折價券即將於2024-07-15到期，可至票券匣頁面查看並請盡快使用。</p>
            </div>
        </div>
    </el-scrollbar>

</template>

<style lang="scss" scoped>
.list-block {
    padding: 30px;

    .message {
        background-color: #fff;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 15px 20px;
        border: 1px solid #0000002a;
        border-radius: 8px;
        margin-bottom: 15px;

        .icon {
            width: 40px;
            font-size: 2em;
            border-right: 1px solid #0000002a;
        }

        p {
            font-size: 1.05em;
        }

        .date {
            margin: 0 15px;
        }

        .type {
            font-size: 1.2em;
            font-weight: bold;
            margin: 0 20px;
        }

        .info-title {
            margin-left: 20px;
            flex-grow: 1;
        }
    }
}
</style>