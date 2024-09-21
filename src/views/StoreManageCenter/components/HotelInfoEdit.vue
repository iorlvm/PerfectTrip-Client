<script setup>
import { ref } from 'vue';
import { ElMessage } from 'element-plus';
import { imageUpdateAPI } from '@/apis/image';


const maxPhotos = 12;  // 最多 8 張照片

const form = ref({
    name: '',
    region: '',
    delivery: false,
    type: [],
    resource: '',
    desc: '',
    number: '',
    date: []
});

// 管理上傳的圖片列表
const photoList = ref([]);
const showUploadDialog = ref(false);  // 控制燈箱顯示

// 確認圖片數量限制
const handlePhotoUpload = (event) => {
    const files = Array.from(event.target.files);
    if (photoList.value.length + files.length > maxPhotos) {
        ElMessage.error(`最多只能上傳 ${maxPhotos} 張照片`);
    } else {
        photoList.value.push(...files.map(file => URL.createObjectURL(file)));  // 預覽圖片
    }
};

// 刪除圖片
const removePhoto = (index) => {
    photoList.value.splice(index, 1);
};

// 提交表單
const onSubmit = () => {
    console.log('submit!', form.value);
    console.log('Uploaded Photos:', photoList.value);
};

// 打開編輯燈箱
const openUploadDialog = () => {
    showUploadDialog.value = true;
};

//燈箱大圖連結
const dialogImageUrl = ref('')
const dialogVisible = ref(false)

const customUpload = async ({ file }) => {
    const formData = new FormData();

    formData.append('file', file);
    formData.append('cacheEnabled', false);
    formData.append('resizeEnabled', true);
    formData.append('width', 1200);
    formData.append('height', 900);

    const res = await imageUpdateAPI(formData);

    console.log(res);
    // TODO: res.data是圖片網址 把這個網址存到商家相簿之中
};

//圖片
const fileList = ref([
    {
        name: 'food.jpeg',
        url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
    },
    {
        name: 'plant-1.png',
        url: '/images/plant-1.png',
    },

])

const handleRemove = (uploadFile, uploadFiles) => {
    console.log(uploadFile, uploadFiles)
}

const handlePictureCardPreview = (uploadFile) => {
    dialogImageUrl.value = uploadFile.url
    dialogVisible.value = true
}
</script>

<template>
    <el-dialog v-model="dialogVisible">
        <img w-full :src="dialogImageUrl" alt="Preview Image" />
    </el-dialog>
    <el-scrollbar>
        <div class="infoedit">
            <div>
                <h1>我是旅館顯示頁面設定</h1>
            </div>
            <br />
            <div class="image">
                <!-- 縮圖區域 -->
                <el-upload v-model:file-list="fileList" :http-request="customUpload" list-type="picture-card"
                    :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
                    <el-icon>
                        <Plus />
                    </el-icon>
                </el-upload>

                <div v-if="photoList.length" class="photo-preview">
                    <div v-for="(photo, index) in photoList" :key="index" class="photo-item">
                        <el-image :src="photo" style="width: 100px; height: 100px" fit="cover" />
                        <el-button @click="removePhoto(index)" type="danger" icon="el-icon-delete" circle></el-button>
                    </div>
                </div>

                <!-- 編輯按鈕 -->
                <!-- <el-image style="width: 160px; height: 126px" :src="url" :zoom-rate="1.2" :max-scale="7" :min-scale="0.2" fit="cover" /> -->
                <div style="margin-bottom: 20px" class="addtab">
                    <el-button size="small" @click="openUploadDialog" style="margin: 0 0 0 20px;">編輯</el-button>
                </div>
            </div>

            <!-- 燈箱內容 -->
            <el-dialog v-model="showUploadDialog" title="上傳圖片" width="50%">
                <div>
                    <input type="file" multiple accept="image/*" @change="handlePhotoUpload" />
                </div>
                <div v-if="photoList.length">
                    <h3>預覽照片：</h3>
                    <div class="photo-preview">
                        <div v-for="(photo, index) in photoList" :key="index" class="photo-item">
                            <el-image :src="photo" style="width: 100px; height: 100px" fit="cover" />
                            <el-button @click="removePhoto(index)" type="danger" icon="el-icon-delete"
                                circle></el-button>
                        </div>
                    </div>
                </div>
                <template #footer>
                    <el-button @click="showUploadDialog = false">取消</el-button>
                    <el-button type="primary" @click="showUploadDialog = false">確定</el-button>
                </template>
            </el-dialog>

            <el-form :model="form" label-width="">
                <div class="hot">
                    <el-form-item label="熱門設施">
                        <el-checkbox-group v-model="form.type">
                            <el-checkbox value="swim">室內游泳池</el-checkbox>
                            <el-checkbox value="wifi">免費無線網路</el-checkbox>
                            <el-checkbox value="familysweet">家庭房</el-checkbox>
                            <el-checkbox value="nosmoke">禁菸客房</el-checkbox>
                            <el-checkbox value="freepark">免費停車</el-checkbox>
                            <el-checkbox value="gym">健身中心</el-checkbox>
                            <el-checkbox value="restaurant">餐廳</el-checkbox>
                            <el-checkbox value="24hr">24小時接待櫃檯</el-checkbox>
                            <el-checkbox value="liquor">酒吧</el-checkbox>
                            <el-checkbox value="breakfast">附早餐</el-checkbox>
                            <el-checkbox value="dinner">附晚餐</el-checkbox>
                            <el-checkbox value="package">行李寄放</el-checkbox>
                            <el-checkbox value="tv">電視</el-checkbox>
                            <el-checkbox value="washlet ">免治馬桶</el-checkbox>
                            <el-checkbox value="spring">溫泉</el-checkbox>
                            <el-checkbox value="shuttle_service">機場接駁車</el-checkbox>
                            <el-checkbox value="pet">寵物友善</el-checkbox>
                            <el-checkbox value="breakfast">早餐</el-checkbox>
                            <el-checkbox value="brunch">早午餐</el-checkbox>
                            <el-checkbox value="lunch">午餐</el-checkbox>
                            <el-checkbox value="dunch ">下午茶</el-checkbox>
                            <el-checkbox value="dinner">晚餐 </el-checkbox>

                        </el-checkbox-group>
                    </el-form-item>
                </div>

                <el-form-item label="旅館介紹">
                    <el-input v-model="form.desc" type="textarea" rows="5" resize="none" class="textarea"
                        style="width: 650px" />
                </el-form-item>
                <br />
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">新增</el-button>
                    <el-button>暫存</el-button>
                </el-form-item>
            </el-form>
        </div>
    </el-scrollbar>
</template>

<style scoped>
.photo-preview {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 20px;
}

.photo-item {
    position: relative;
    margin-right: 10px;
    margin-bottom: 10px;
}

.photo-item .el-button {
    position: absolute;
    top: 5px;
    right: 5px;
    background-color: rgba(255, 255, 255, 0.8);
}
</style>
