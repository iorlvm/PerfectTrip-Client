<script setup>
</script>

<template>
    <div>
       <h1>訂房紀錄</h1> 
    </div>
<el-scrollbar height="400px">
    <el-card style="max-width: 480px">
    <template #header>
      <div class="card-header">
        <span>台北 <br>2024年6月1日-2024年6月3日</span>
      </div>
    </template>
    <!-- <p v-for="o in 4" :key="o" class="text item">{{ 'List item ' + o }}</p> -->
     <h1 class = text>國賓大飯店</h1>
     <div class="row1">
          <div class="imagew">
            <div class="image"><img src="" alt="" /></div>
          </div>
          <div class="content">
                <div>住宿人數:4人</div>
                <div>豪華雙人房*2</div>
            </div>
            <div class="twd">TWD 5280</div>
     </div>
   
    <template  #footer >
        <div class="row2">
            <div class="ordertime">訂單日期2024/5/1</div> 
            <div class="status">已完成</div>
        </div>
    </template>
  </el-card>
    <br>
    <el-card style="max-width: 480px">
    <template #header>
      <div class="card-header">
        <span>台北 <br>2024年6月1日-2024年6月3日</span>
      </div>
    </template>
    <!-- <p v-for="o in 4" :key="o" class="text item">{{ 'List item ' + o }}</p> -->
     <h1 class = text>國賓大飯店</h1>
     <div class="row1">
          <div class="imagew">
            <div class="image"><img src="" alt="" /></div>
          </div>
          <div class="content">
                <div>住宿人數:4人</div>
                <div>豪華雙人房*2</div>
            </div>
            <div class="twd">TWD 5280</div>
     </div>
   
    <template  #footer >
        <div class="row2">
            <div class="ordertime">訂單日期2024/5/1 </div> 
            <div class="status">已完成</div>
        </div>
    </template>
  </el-card>

</el-scrollbar>
</template>

<style lang="scss" scoped>

.text{
    
    font-size: 1.5em;
    letter-spacing: 1px;
}

.row1{
    display: flex;
    justify-content: space-between;
.imagew{
    width: 150px;
}
.image {
    position: relative;
    aspect-ratio: 1/1;
    width: 120px;
    min-width: 80px;
    border-radius: 12px;
    overflow: hidden;
    flex-shrink: 0;
  }

.content{
    // border: 1px solid black;
    flex-grow: 1;
    width: 100px;
}
.twd{
    width: 100px;
}

}

.row2{
    display: flex;
    justify-content: space-between;
.ordertime{
    // border: 1px solid black;
    width: 380px;
}
.status{
    // border: 1px solid black;
    flex-grow: 1;
}

}


</style>