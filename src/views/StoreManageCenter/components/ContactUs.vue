<script setup>
import { ElScrollbar } from 'element-plus';
import ManageToolbar from './ManageToolbar.vue';

</script>


<template>
    <ManageToolbar>
        <li>
            選項一
        </li>
        <li>
            選項二
        </li>

    </ManageToolbar>
    <el-Scrollbar>

        <div class="contant-form">
            <div class="contant-us">
                <h5>聯絡我們</h5>
            </div>
            <div class="name">
                <label for="name" id="name"><span class="must">*</span>聯絡姓名</label>
                <input type="text" id="input_name" required>
            </div>
            <div class="mail">
                <label for="mail" id="mail"><span class="must">*</span>聯絡郵件</label>
                <input type="text" id="input_mail">
            </div>
            <div class="message">
                <label for="text" id="message"><span class="must">*</span>內容簡述</label>
                <textarea id="textarea_message" rows="5" />
            </div>
            <el-button type="primary">送出</el-button>

        </div>

    </el-Scrollbar>

</template>
<style lang="scss" scoped>
.contant-form {
    background-color: #fff;
    width: 80%;
    margin: 15px auto;
    padding: 20px 90px;
    border: 1px solid #0000002a;
    box-shadow: 0 1px 3px -1px #00000064;
    border-radius: 8px;

    .must {
        color: red;
    }

    .contant-us {

        padding: 10px;
        font-size: 24px;
        font-weight: bold;
        margin-bottom: 20px;
        text-align: center;
        border-bottom: 1px solid #0000002a;

        h5 {
            font-size: 0.8em;
            padding-bottom: 15px;
            margin: 0;
        }
    }

    .name,
    .mail,
    .message {
        margin-bottom: 15px;
    }

    .name label,
    .mail label,
    .message label {
        display: block;
        font-weight: bold;
        margin-bottom: 5px;
    }

    .name input,
    .mail input,
    .message textarea {
        width: 100%;
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 5px;
        box-sizing: border-box;
    }

    .name input {
        height: 40px;
    }

    .mail input {
        height: 40px;
    }

    .message textarea {
        resize: vertical;
        min-height: 100px;
    }

    #textarea_message {
        width: 100%;
        resize: none;
        line-height: 1.5;
    }
}
</style>
