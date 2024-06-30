<template>

    <div>
       <h1> 我是旅館顯示頁面設定</h1>
    </div>
<br>
    <div class="image">

    <el-image
      style="width: 100px; height: 100px"
      :src="url"
      :zoom-rate="1.2"
      :max-scale="7"
      :min-scale="0.2"
      :preview-src-list="srcList"
      :initial-index="4"
      fit="cover"
    />

    <div style="margin-bottom: 20px" class="addtab">
            <el-button size="small" @click="addTab(editableTabsValue)">
            編輯
            </el-button>
    </div>
  </div>

    <el-form :model="form" label-width="auto" style="max-width: 300px">
      <el-form-item  label="房間數量">
        <el-input type="number" :min="0" v-model="form.number"  placeholder="0"/>
      </el-form-item> 
      <el-form-item label="房價(TWD)" placeholder="TWD">
        <el-input  v-model="form.price" />
      </el-form-item>
      <el-form-item label="每房入住人數">
        <el-select v-model="form.region" placeholder="選擇人數">
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
        <el-row :gutter="50">
        <el-col :span="16">
          <el-date-picker
            v-model="form.date1"
            type="date"
            placeholder="開始日期"
            style="width: 100%"
          />
        </el-col>
        <el-col :span="2" class="text-center">
          <span class="text-gray-500">-</span>
        </el-col>
        <el-col :span="16">
          <el-date-picker
            v-model="form.date2"
            type="date"
            placeholder="結束日期"
            style="width: 100%"
          />
        </el-col>
        </el-row>
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
                <el-checkbox value="" name="type">
                
                </el-checkbox>
                <el-checkbox value="" name="type">
                
                </el-checkbox>
                <el-checkbox value="" name="type">
                    
                </el-checkbox>
                <el-checkbox value="" name="type">
                
                </el-checkbox>
                <el-checkbox value="" name="type">
                
                </el-checkbox>
                <el-checkbox value="" name="type">
            
                </el-checkbox>
                <el-checkbox value="" name="type">
                
                </el-checkbox>
                <el-checkbox value="" name="type">
                
                </el-checkbox>
                <el-checkbox value="" name="type">
                    
                </el-checkbox>
                <el-checkbox value="" name="type">
                
                </el-checkbox>
                <el-checkbox value="" name="type">
                
                </el-checkbox>
                <el-checkbox value="" name="type">
            
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
      <el-form-item label="房型描述" >
        <el-input v-model="form.desc" type="textarea"  style="width:200px;height:200px;" class="textarea"  />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">新增</el-button>
        <el-button>暫存</el-button>
      </el-form-item>
    </el-form>
  </template>
  
  <script lang="ts" setup>
  import { reactive } from 'vue'
  
  const url =
  'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg'
    const srcList = [
  'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
  'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
  'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
  'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
  'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
  'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',
  'https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg',
    ]

  // do not use same name with ref
  const form = reactive({
    name: '',
    region: '',
    date1: '',
    date2: '',
    delivery: false,
    type: [],
    resource: '',
    desc: '',
  })
  
  const onSubmit = () => {
    console.log('submit!')
  }
  </script>


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
.hot{
    width: 800px;
    height: 180px;
}

.image{
    display: flex;
    
}
.addtab{
    width: 100px;
    height: 100px;
    // border: 1px solid black;
    display: flex;
    align-items: flex-end;
}
.textarea{
    border: 1px solid black;
    width: 300px;
    height: 100px;
    
}
</style>