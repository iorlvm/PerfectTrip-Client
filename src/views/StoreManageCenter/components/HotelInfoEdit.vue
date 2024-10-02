<script setup>
import { onMounted, ref, computed ,reactive, toRaw} from 'vue';
import { ElMessage } from 'element-plus';
import { imageUpdateAPI } from '@/apis/image';
import { useUserStore } from '@/stores/user';
import {updateCompanyDetailAPI,getCompanyDetailAPI, deleteCompanyPhotoAPI} from '@/apis/company'
import { getFacilitiesAPI } from '@/apis/product';

const userStore = useUserStore();
userStore.userInfo

const currentPhoto = reactive({
  companyPhotos: [],
});
//introduce computed
const form = reactive({
    facility: [],
    introduce: '',
    companyPhotos: []
});

const companyUpload = async ({ file }) => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('cacheEnabled', false);
    formData.append('resizeEnabled', true);
    formData.append('width', 1200);
    formData.append('height', 900);
   
    const companyId = userStore.userInfo.companyId;
    const res = await imageUpdateAPI(formData);
    
   
    if (res.success) {
      const count = currentPhoto.companyPhotos.length + 1;
      currentPhoto.companyPhotos.push({
        photoUrl: res.data,
        description: '商家照片' + count
      });
     await updateCompanyDetailAPI({
       companyId, 
       photos:[{
        photoUrl: res.data,
        description: '商家照片' + count
      }]
       })
    } else {
      console.error('照片上傳失敗', res.error);
    }
  } catch (error) {
    console.error('照片上傳發生錯誤', error);
  }
};
const baseURL = 'http://localhost:8080/';
const fileList = computed(() => {
  return currentPhoto.companyPhotos.map(photo => ({
    name: photo.photoId,
    url: baseURL + photo.photoUrl,
  })) || [];
});


// 管理上傳的圖片列表
const photoList = ref([]);

// 刪除圖片
const removePhoto = (index) => {
    photoList.value.splice(index, 1);
};


//燈箱大圖連結
const dialogImageUrl = ref('')
const dialogVisible = ref(false)



const facilities = ref([]);

onMounted(async () => {
  try {
    // 獲取設施選項
    const res = await getFacilitiesAPI();
    facilities.value = res.data;
 
    // 獲取商家詳細資訊
    const companyId = userStore.userInfo.companyId;
    const introduce = userStore.userInfo.introduce;
    const resCompany = await getCompanyDetailAPI({ companyId,introduce});
    
    if (resCompany.success) {
      // 初始化表單數據
      form.facility = resCompany.data.facilities.map(facilitiy => facilitiy.facilityId);
      form.introduce = resCompany.data.introduce || userStore.userInfo.introduce;
      currentPhoto.companyPhotos = resCompany.data.photos 
    } else {
      ElMessage.error('無法獲取商家資訊，請重試！');
    }
  } catch (error) {
    console.error('初始化商家資訊失敗:', error);
  }
});

const handleRemove = async(file) => {
  try{
    //使用file.name(photoId) 來刪除資料
    await deleteCompanyPhotoAPI(file.name);
    currentPhoto.companyPhotos = currentPhoto.companyPhotos.filter(photo =>photo.photoId != file.name);
  }catch(error){
    console.error('未能刪除照片',error)
  }
}


const handlePictureCardPreview = (uploadFile) => {
    dialogImageUrl.value = uploadFile.url
    dialogVisible.value = true
}
// 提交表單

const onSubmit = async () => {
 
  try {
 
    const companyId = userStore.userInfo.companyId;  // 假設 companyId 來自 userInfo
    const facilityIds = form.facility;// 設施選項
    const introduce = form.introduce;// 介紹文本

    // 打印即將提交的資料
    console.log('Submit Data:', { companyId, facilityIds, introduce });
    console.log('公司 ID:', companyId);
    console.log('設施 ID:', facilityIds);
    console.log('介紹:', introduce);

    const res = await updateCompanyDetailAPI({ companyId, facilityIds, introduce });

    if (res.success) {
      ElMessage.success('商家資訊更新成功！');
    } else {
      ElMessage.error('商家資訊更新失敗，請重試！');
    }
  } catch (error) {
    console.error('提交表單發生錯誤:', error);
    ElMessage.error('商家資訊更新失敗，請稍後重試！');
  }
  console.log('submit!', form);
  console.log('Uploaded Photos:', toRaw(currentPhoto.companyPhotos)); // toRaw() 顯示 reactive 代理內的實際數據。 
  
};
</script>

<template>
    <el-dialog v-model="dialogVisible">
        <img w-full :src="dialogImageUrl" alt="Preview Image" />
    </el-dialog>
    <el-scrollbar>
        <div class="infoedit">
            <div>
                <h1>旅館顯示頁面設定</h1>
            </div>
            <br />
            <div class="image">
                <!-- 縮圖區域 -->
                <el-upload v-model:file-list="fileList" :http-request="companyUpload" list-type="picture-card"
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

            </div>
            <el-form :model="form" label-width="" >
                <div class="hot">
                    <el-form-item label="熱門設施">
                        <el-checkbox-group v-model="form.facility"> 
                            <!-- 沒有冒號會視為字串，家冒號才會認變數 -->
                            <el-checkbox :value="facility.facilityId" v-for="(facility) in facilities" :key="facility.facilityId" >
                                {{facility.facilityName}}</el-checkbox>
                        
                        </el-checkbox-group>
                    </el-form-item>
                </div>

                <el-form-item label="旅館介紹">
                    <el-input v-model="form.introduce"  type="textarea" rows="5" resize="none" class="textarea"
                        style="width: 650px" data-gramm="false" />
                </el-form-item>
                <br />
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">上傳</el-button>
                    <!-- <el-button>刪除</el-button> -->
                </el-form-item>
            </el-form>
        </div>
    </el-scrollbar>
</template>

<style scoped>
.infoedit{
  padding: 30px;
}

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
