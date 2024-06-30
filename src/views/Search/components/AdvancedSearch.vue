<template>
  <div id="sidebar">
    <div id="map-section">
      <div id="map">顯示地圖</div>
      <div id="toggle">
        <label for="compare"><h3>比較住宿</h3></label>
        <input type="checkbox" id="compare">
      </div>
      <div id="search">
        <label for="searchInput"><h3>搜尋住宿名稱</h3></label>
        <input type="text" id="searchInput" placeholder="例如：台北君悅酒店">
      </div>
    </div>

    <div class="filter-section">
      <h2>篩選條件</h2>
      <h3>熱門篩選條件</h3>
      <div class="checkbox-group">
        <label><input type="checkbox">貓咪園區</label>
        <label><input type="checkbox">含早餐</label>
        <label><input type="checkbox">游泳池</label>
        <label><input type="checkbox">旅館</label>
        <label><input type="checkbox">飯店</label>
      </div>
      <h3>每晚價格</h3>
      <div class="price-range">
        <div>最低 NT$0</div>
        <div>最高 NT$18,000</div>
        <input type="range" min="0" max="18000">
      </div>
    </div>

    <div class="filter-section">
      <h3>付款方式</h3>
      <div class="checkbox-group">
        <label><input type="checkbox">可選擇入住時付款</label>
      </div>
      <h3>住宿取消選項</h3>
      <div class="checkbox-group">
        <label><input type="checkbox">可全額退款的住宿</label>
      </div>
      <h3>設施服務</h3>
      <div class="checkbox-group">
        <label><input type="checkbox">游泳池</label>
        <label><input type="checkbox">寵物友善</label>
        <label><input type="checkbox">含無線上網</label>
      </div>
      <a href="#">查看更多</a>

      <h3>星級評等</h3>
      <div class="star-rating">
        <label><input type="radio" name="stars">1</label>
        <label><input type="radio" name="stars">2</label>
        <label><input type="radio" name="stars">3</label>
        <label><input type="radio" name="stars">4</label>
        <label><input type="radio" name="stars">5</label>
      </div>

      <h3>住宿選項</h3>
      <div class="radio-group">
        <label><input type="radio" name="option">不限</label>
        <label><input type="radio" name="option">飯店、度假村等</label>
        <label><input type="radio" name="option">整間房屋、出租公寓等</label>
      </div>

      <h3>住宿類型</h3>
      <div class="checkbox-group">
        <label><input type="checkbox">旅館</label>
        <label><input type="checkbox">飯店</label>
        <label><input type="checkbox">民宿</label>
      </div>
    </div>

    <div class="filter-section">
      <h3>熱門地點</h3>
      <div class="radio-group">
        <label><input type="radio" name="location">貓咪園區</label>
        <label><input type="radio" name="location">貓咪消防局</label>
        <label><input type="radio" name="location">貓咪航空公司</label>
      </div>
      <a href="#">查看更多</a>

      <h3>餐飲方案</h3>
      <div class="checkbox-group">
        <label><input type="checkbox">含早餐</label>
        <label><input type="checkbox">含午餐</label>
        <label><input type="checkbox">含晚餐</label>
        <label><input type="checkbox">含包式</label>
      </div>

      <h3>附近地區</h3>
      <div class="radio-group">
        <h4>貓貓洞</h4>
        <h4>貓貓窩</h4>
      </div>

      <h3>無障礙設施</h3>
      <div class="checkbox-group">
        <label><input type="checkbox">無障礙淋浴設備</label>
        <label><input type="checkbox">入口通道無台階</label>
        <label><input type="checkbox">客房無障礙設施</label>
      </div>
      <a href="#">查看更多</a>

      <h3>旅客評分</h3>
      <div class="radio-group">
        <label><input type="radio" name="rating">滿分 10分</label>
        <label><input type="radio" name="rating">優秀 6~9分</label>
        <label><input type="radio" name="rating">普通 1~4分</label>
      </div>
    </div>

    <div class="filter-section">
      <h3>兌換券 Rewards</h3>
      <div class="checkbox-group">
        <label><input type="checkbox">兌換獎勵住宿</label>
        <label><input type="checkbox">VIP Access 住宿</label>
      </div>
      <h3>旅客體驗</h3>
      <div class="checkbox-group">
        <label><input type="checkbox">生態認證</label>
        <label><input type="checkbox">性別友善</label>
        <label><input type="checkbox">適合商務旅客</label>
        <label><input type="checkbox">適合家庭出遊</label>
      </div>
      <a href="#">查看更多</a>
    </div>
  </div>
  
</template>

<script setup>
</script>

<style lang="scss" scoped>
#sidebar {
  width: 300px;
  margin: auto;
  font-family: Arial, sans-serif;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

#map-section {
  border: 1px solid #e7e7e7;
  padding: 15px;
  margin-bottom: 20px;
  text-align: center;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

#map {
  width: 100%;
  height: 100px;
  background-color: #f0f0f0;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  border-radius: 4px;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
}

#toggle {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

#toggle label {
  font-size: 14px;
}

#toggle input {
  transform: scale(1.2);
}

#search {
  margin-bottom: 10px;
  text-align: left;
}

#search label {
  font-size: 14px;
  display: block;
  margin-bottom: 5px;
}

#search input {
  width: 100%;
  padding: 8px;
  font-size: 14px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
}

.filter-section {
  border: 1px solid #e7e7e7;
  padding: 15px;
  margin-bottom: 20px;
  text-align: left;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.filter-section h2, .filter-section h3 {
  font-size: 16px;
  margin-bottom: 8px;
  color: #333;
}

.checkbox-group, .radio-group {
  margin-bottom: 10px;
}

.checkbox-group label, .radio-group label {
  display: block;
  font-size: 14px;
  margin-bottom: 5px;
}

.star-rating label {
  display: inline-block;
  margin-right: 5px;
}

.star-rating input {
  margin-right: 2px;
}

.price-range {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  margin-bottom: 8px;
}

.price-range input[type="range"] {
  width: 100%;
  margin-top: 5px;
}

a {
  font-size: 14px;
  color: #007bff;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}
</style>
