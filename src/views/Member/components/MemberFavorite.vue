<script setup>
</script>

<template> 
<el-scrollbar height="400px">
<div>
        <h1>我的收藏</h1>
    </div>

    <el-card style="max-width: 600px">
      <div class="header">
        <h1 class = text>麗寶樂園飯店</h1>
        <div data-v-8ce22d14 class="number">9.5</div>
      </div>  
     
     <div class="row1">
          <div class="imagew">
            <div class="image"><img src="" alt="" /></div>
          </div>
          <div class="content">
                <div>親子豪華房型</div>
                
                <div>住宿及享親子手做蛋糕體驗</div>
                <div>僅限四人房型</div>
            </div>
            <div class="twd">TWD 5280</div>
     </div>
    </el-card>
<br>
    <el-card style="max-width: 600px">
      <div class="header">
        <h1 class = text>麗寶樂園飯店</h1>
        <div data-v-8ce22d14 class="number">9.5</div>
      </div>  
     
     <div class="row1">
          <div class="imagew">
            <div class="image"><img src="" alt="" /></div>
          </div>
          <div class="content">
                <div>親子豪華房型</div>
                
                <div>住宿及享親子手做蛋糕體驗</div>
                <div>僅限四人房型</div>
            </div>
            <div class="twd">TWD 5280</div>
     </div>
    </el-card>
<br>
    <el-card style="max-width: 600px">
      <div class="header">
        <h1 class = text>麗寶樂園飯店</h1>
        <div data-v-8ce22d14 class="number">9.5</div>
      </div>  
     
     <div class="row1">
          <div class="imagew">
            <div class="image"><img src="" alt="" /></div>
          </div>
          <div class="content">
                <div>親子豪華房型</div>
                
                <div>住宿及享親子手做蛋糕體驗</div>
                <div>僅限四人房型</div>
            </div>
            <div class="twd">TWD 5280</div>
     </div>
    </el-card>
</el-scrollbar>
</template>

<style lang="scss" scoped>
.text{
    font-size: 20px;
    margin-bottom: 10px;
    
}

.header{
    display: flex;
    justify-content: space-between;
    .number{
        font-size: 1em;
        font-weight: bold;
        width: 2em;
        height: 2em;
        color: #eeeeee;
        background-color: #313a45;
        text-align: center;
        line-height: 2;
        border-radius: 5px;
    }
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
.twd {
  width: 100px;
  height: 100px;
  display: flex;
  align-items: flex-end;
  justify-content: center; /* 如果希望文字水平居中 */
//   border: 1px solid black; 
}

}
</style>