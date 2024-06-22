<script setup>
import { ref } from 'vue';
</script>

<template>
    <div>
        <div class="title">
            <h2>設施與服務</h2>
            <h3>設施佳 ! 評分:8.5  <img src="@/assets/images/star .png" class="icon1"></h3>
        </div>
        <div class="viewed">
            <h3>熱門設施</h3> <br>
            <div class="facilities">
                <h4><img src="@/assets/images/swim.png" class="icon">室內游泳池</h4>
                <h4><img src="@/assets/images/wifi.png" class="icon">免費無線網路</h4>
                <h4><img src="@/assets/images/family.png" class="icon">家庭房</h4>
                <h4><img src="@/assets/images/family.png" class="icon">禁菸客房</h4>
                <h4><img src="@/assets/images/family.png" class="icon">免費停車</h4>
                <h4><img src="@/assets/images/family.png" class="icon">健身中心</h4>
                <h4><img src="@/assets/images/family.png" class="icon">餐廳</h4>
                <h4><img src="@/assets/images/family.png" class="icon">24小時接待櫃檯</h4>
                <h4><img src="@/assets/images/family.png" class="icon">酒吧</h4>
                <h4><img src="@/assets/images/family.png" class="icon">早餐評價還不錯</h4>
            </div>
        </div>
        <div class="facility">
            <div class="col">
                <h3><img src="@/assets/images/family.png" class="icon1">餐飲服務</h3>
                <p><img src="@/assets/images/check.png" class="icon1">酒吧</p>
                <p><img src="@/assets/images/check.png" class="icon1">餐廳</p>
                <br>
                <h3><img src="@/assets/images/family.png" class="icon1">網路</h3>
                <p><img src="@/assets/images/check.png" class="icon1">住宿客房提供WiFi免費。</p>
                <br>
                <h3><img src="@/assets/images/family.png" class="icon1">停車場</h3>
                <p>不需預約：住宿場所設有私人停車設施（免費）。</p>
                <ul>
                    <li><img src="@/assets/images/check.png" class="icon1">車庫</li>
                    <li><img src="@/assets/images/check.png" class="icon1">無障礙停車</li>
                </ul>
                <br>
                <h3><img src="@/assets/images/family.png" class="icon1">迎賓接待服務</h3>
                <p><img src="@/assets/images/check.png" class="icon1">私人入住/退房手續</p>
                <p><img src="@/assets/images/check.png" class="icon1">附設自動提款機</p>
                <p><img src="@/assets/images/check.png" class="icon1">行李寄存</p>
                <p><img src="@/assets/images/check.png" class="icon1">外幣兌換</p>
                <p><img src="@/assets/images/check.png" class="icon1">24小時接待櫃檯</p>
            </div>
            <div class="col">
                <h3><img src="@/assets/images/family.png" class="icon1">清潔服務</h3>
                <p><img src="@/assets/images/check.png" class="icon1">每日清潔服務</p>
                <p><img src="@/assets/images/check.png" class="icon1">乾洗 <span class="fee">另外收費</span></p>
                <p><img src="@/assets/images/check.png" class="icon1">洗衣 <span class="fee">另外收費</span></p>
                <br>
                <h3><img src="@/assets/images/family.png" class="icon1">商務設施</h3>
                <p><img src="@/assets/images/check.png" class="icon1">傳真 / 複印 <span class="fee">另外收費</span></p>
                <p><img src="@/assets/images/check.png" class="icon1">商務中心 <span class="fee">另外收費</span></p>
                <p><img src="@/assets/images/check.png" class="icon1">會議 / 宴會設施 <span class="fee">另外收費</span></p>
                <br>
                <h3><img src="@/assets/images/family.png" class="icon1">安全</h3>
                <p><img src="@/assets/images/check.png" class="icon1">滅火器</p>
                <p><img src="@/assets/images/check.png" class="icon1">公共區域設有監視器</p>
                <p><img src="@/assets/images/check.png" class="icon1">偵煙探測器</p>
                <p><img src="@/assets/images/check.png" class="icon1">警報器</p>
                <p><img src="@/assets/images/check.png" class="icon1">房卡進出</p>
                <p><img src="@/assets/images/check.png" class="icon1">24小時警衛</p>
                <p><img src="@/assets/images/check.png" class="icon1">保險箱</p>
            </div>
            <div class="col">
                <h3><img src="@/assets/images/family.png" class="icon1">綜合設施</h3>
                <p><img src="@/assets/images/check.png" class="icon1">吸煙區</p>
                <p><img src="@/assets/images/check.png" class="icon1">空調</p>
                <p><img src="@/assets/images/check.png" class="icon1">暖氣</p>
                <p><img src="@/assets/images/check.png" class="icon1">電梯</p>
                <p><img src="@/assets/images/check.png" class="icon1">家庭房</p>
                <p><img src="@/assets/images/check.png" class="icon1">無障礙設施</p>
                <p><img src="@/assets/images/check.png" class="icon1">禁菸客房</p>
                <br>
                <h3><img src="@/assets/images/family.png" class="icon1">室內游泳池 </h3>
                <p><img src="@/assets/images/check.png" class="icon1">開放時間</p>
                <p><img src="@/assets/images/check.png" class="icon1">全年開放</p>
                <p><img src="@/assets/images/check.png" class="icon1">所有年齡皆可使用</p>
                <br>
                <h3><img src="@/assets/images/family.png" class="icon1">養身會館</h3>
                <p><img src="@/assets/images/check.png" class="icon1">健身</p>
                <p><img src="@/assets/images/check.png" class="icon1">健身中心</p>
                <br>
                <h3><img src="@/assets/images/family.png" class="icon1">使用的語言</h3>
                <p><img src="@/assets/images/check.png" class="icon1">英語</p>
                <p><img src="@/assets/images/check.png" class="icon1">日語</p>
                <p><img src="@/assets/images/check.png" class="icon1">韓語</p>
                <p><img src="@/assets/images/check.png" class="icon1">中文</p>
            </div>
        </div>
    </div>
</template>

<style scoped>
.title {
    height: 100px;
}

.viewed {
    height: 100px;
}

.facilities {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
}

.facilities h4.last {
    flex: 1 1 100%;
    max-width: 100%;
}

.facility {
    display: flex;
    gap: 10px;
    margin-top: 20px;
}

.facility .col {
    flex: 1;
    
    padding: 10px;
}

.facility .col h5 {
    margin-top: 0;
}

.facility .col p,
.facility .col ul {
    margin: 7px 0;
}

.fee {
    font-size: smaller;
    
    background-color: #f0f0f0;
    padding: 3px;
    display: inline-block;
    
}
.icon{
    width: 24px;
    height: 24px;
    margin-right: 8px;
}
.icon1{
    width: 20px;
    height: 20px;
    margin-right: 10px;
}
</style>
