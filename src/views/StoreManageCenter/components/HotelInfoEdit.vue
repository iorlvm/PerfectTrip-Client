<script setup>
import ManageToolbar from './ManageToolbar.vue';
import { ref } from 'vue';

const url =
    '/1.jpg'
const srcList = [
    '/1.jpg',
    '/2.jpg',
    '/3.jpg',
    '/4.jpg',
    '/5.jpg',
    '/6.jpg',
]

// do not use same name with ref
const form = ref({
    name: '',
    region: '',
    date1: '',
    date2: '',
    delivery: false,
    type: [],
    resource: '',
    desc: '',
    number: ''
})

const onSubmit = () => {
    console.log('submit!')
}
</script>

<template>
    <ManageToolbar>
        <template #default>
            <li>
                <router-link to="/store/manage/setting/info">房間總覽</router-link>
            </li>
            <li>
                <router-link to="/store/manage/setting/infoedit">編輯</router-link>
            </li>
        </template>
    </ManageToolbar>
    <el-scrollbar>
        <div class="infoedit">

            <div>
                <h1> 我是旅館顯示頁面設定</h1>
            </div>
            <br>
            <div class="image">

                <el-image style="width: 120px; height: 120px" :src="url" :zoom-rate="1.2" :max-scale="7"
                    :min-scale="0.2" :preview-src-list="srcList" fit="cover" />

                <div style="margin-bottom: 20px" class="addtab">
                    <el-button size="small" @click="addTab(editableTabsValue)" style="margin: 0 0 0 20px;">
                        編輯
                    </el-button>
                </div>
            </div>

            <el-form :model="form" label-width="auto">
                <el-form-item label="房間數量">
                    <el-input type="number" :min="0" v-model="form.number" placeholder="0" style="width: 150px;" />
                </el-form-item>
                <el-form-item label="房價(TWD)" placeholder="TWD">
                    <el-input v-model="form.price" style="width: 150px;" />
                </el-form-item>
                <el-form-item label="每房入住人數">
                    <el-select v-model="form.region" placeholder="選擇人數" style="width: 150px;">
                        <el-option label="1" value="1人" />
                        <el-option label="2" value="2人" />
                        <el-option label="3" value="3人" />
                        <el-option label="4" value="4人" />
                        <el-option label="5" value="5人" />
                        <el-option label="6" value="6人" />
                        <el-option label="7" value="7人" />
                        <el-option label="8" value="8人" />
                    </el-select>
                </el-form-item>
                <el-form-item label="期間限定(非必填)">
                    <div class="demo-date-picker">
                        <div class="block">
                            <span class="demonstration"></span>
                            <el-date-picker v-model="value1" type="daterange" range-separator="To"
                                start-placeholder="開始日期" end-placeholder="結束日期" :size="size" />
                        </div>
                    </div>
                </el-form-item>
                <el-form-item label="開放訂房">
                    <el-switch v-model="form.open" />
                </el-form-item>
                <div class="hot">
                    <el-form-item label="熱門設施">
                        <el-checkbox-group v-model="form.type">
                            <el-checkbox value="swim" name="type">
                                <img src="@/assets/images/swim.png" class="icon">室內游泳池
                            </el-checkbox>
                            <el-checkbox value="wifi" name="type">
                                <img src="@/assets/images/wifi.png" class="icon">免費無線網路
                            </el-checkbox>
                            <el-checkbox value="familysweet" name="type">
                                <img src="@/assets/images/family.png" class="icon">家庭房
                            </el-checkbox>
                            <el-checkbox value="nosmoke" name="type">
                                <img src="@/assets/images/family.png" class="icon">禁菸客房
                            </el-checkbox>
                            <el-checkbox value="freepark" name="type">
                                <img src="@/assets/images/family.png" class="icon">免費停車
                            </el-checkbox>
                            <el-checkbox value="gym" name="type">
                                <img src="@/assets/images/family.png" class="icon">健身中心
                            </el-checkbox>
                            <el-checkbox value="restaurant" name="type">
                                <img src="@/assets/images/family.png" class="icon">餐廳
                            </el-checkbox>
                            <el-checkbox value="24hr" name="type">
                                <img src="@/assets/images/family.png" class="icon">24小時接待櫃檯
                            </el-checkbox>
                            <el-checkbox value="liquor" name="type">
                                <img src="@/assets/images/family.png" class="icon">酒吧
                            </el-checkbox>
                            <el-checkbox value="breakfast" name="type">
                                <img src="@/assets/images/family.png" class="icon">附早餐
                            </el-checkbox>
                            <el-checkbox value="dinner" name="type">
                                <img src="@/assets/images/family.png" class="icon">附晚餐
                            </el-checkbox>
                            <el-checkbox value="package" name="type">
                                <img src="@/assets/images/family.png" class="icon">行李寄放
                            </el-checkbox>
                            <el-checkbox value="pet" name="type">
                                <img src="@/assets/images/family.png" class="icon">寵物寄宿
                            </el-checkbox>

                        </el-checkbox-group>
                    </el-form-item>
                </div>

                <el-form-item label="寵物友善">
                    <el-radio-group v-model="form.resource">
                        <el-radio value="Y">YES</el-radio>
                        <el-radio value="N">NO</el-radio>

                    </el-radio-group>
                </el-form-item>
                <el-form-item label="房型描述">
                    <el-input v-model="form.desc" type="textarea" rows="5" resize="none" class="textarea"
                        style="width:650px" />
                </el-form-item>
                <br>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">新增</el-button>
                    <el-button>暫存</el-button>
                </el-form-item>
            </el-form>

        </div>
    </el-scrollbar>
</template>



<style lang="scss" scoped>
.demo-image__error .image-slot {
    font-size: 30px;
}

.demo-image__error .image-slot .el-icon {
    font-size: 30px;
}

.demo-image__error .el-image {
    width: 100%;
    height: 200px;
}

.icon {
    width: 24px;
    height: 24px;
    margin-right: 8px;
}

.hot {
    width: 800px;
    height: 130px;
}

.image {
    display: flex;

}

.addtab {
    width: 120px;
    height: 120px;
    // border: 1px solid black;
    display: flex;
    align-items: flex-end;
}

.textarea {
    // border: 1px solid black;
    width: 300px;
    height: 100px;

    resize: none;
}

.infoedit {
    padding-left: 20px;
}
</style>