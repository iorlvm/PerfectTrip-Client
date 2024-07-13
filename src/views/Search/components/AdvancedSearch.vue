<script setup>
</script>

<template>
  <div class="sidebar">
    <div class="map-section">
      <div class="map">顯示地圖</div>
      <div class="toggle">
        <label for="compare">
          <h3>比較住宿</h3>
        </label>
        <input type="checkbox" id="compare">
      </div>
      <div class="search">
        <label for="searchInput">
          <h3>搜尋住宿名稱</h3>
        </label>
        <input type="text" id="searchInput" placeholder="例如：台北君悅酒店">
      </div>
    </div>

    <el-divider class="divider" />

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

    <el-divider class="divider" />

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
      <a>查看更多</a>

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

    <el-divider class="divider" />

    <div class="filter-section">
      <h3>熱門地點</h3>
      <div class="radio-group">
        <label><input type="radio" name="location">貓咪園區</label>
        <label><input type="radio" name="location">貓咪消防局</label>
        <label><input type="radio" name="location">貓咪航空公司</label>
      </div>
      <a>查看更多</a>

      <h3>餐飲方案</h3>
      <div class="checkbox-group">
        <label><input type="checkbox">含早餐</label>
        <label><input type="checkbox">含午餐</label>
        <label><input type="checkbox">含晚餐</label>
        <label><input type="checkbox">含包式</label>
      </div>

      <h3>附近地區</h3>
      <div class="radio-group">
        <label><input type="radio" name="rating">貓貓洞</label>
        <label><input type="radio" name="rating">貓貓窩</label>
      </div>

      <h3>無障礙設施</h3>
      <div class="checkbox-group">
        <label><input type="checkbox">無障礙淋浴設備</label>
        <label><input type="checkbox">入口通道無台階</label>
        <label><input type="checkbox">客房無障礙設施</label>
      </div>
      <a>查看更多</a>

      <h3>旅客評分</h3>
      <div class="radio-group">
        <label><input type="radio" name="rating">滿分 10分</label>
        <label><input type="radio" name="rating">優秀 6~9分</label>
        <label><input type="radio" name="rating">普通 1~4分</label>
      </div>
    </div>

    <el-divider class="divider" />

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
      <a>查看更多</a>
    </div>
  </div>
</template>



<style lang="scss" scoped>
.divider {
  width: 90%;
  margin: 0 auto;
}

.sidebar {
  padding: 10px 5px 0;
  margin-bottom: 20px;
  background-color: #fff;
  border-radius: 8px;
  border: 1px solid #e7e7e776;
  box-shadow: 0 2px 5px -1px #00000020;

  .map-section {
    padding: 15px;
    text-align: center;
    border-radius: 8px;

    .map {
      width: 100%;
      height: 150px;
      background-color: #f0f0f0;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 10px;
      border-radius: 4px;
      box-shadow: inset 0 1px 2px #00000020;
    }

    .toggle {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;

      input[type="checkbox"] {
        transform: scale(1.2);
      }
    }

    .search {
      margin-bottom: 10px;
      text-align: left;

      label {
        display: flex;
        margin-bottom: 5px;
        align-items: center;
      }

      input[type="text"] {
        width: 100%;
        padding: 8px;
        box-sizing: border-box;
        border: 1px solid #ccc;
        border-radius: 4px;
        box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
      }
    }
  }

  .filter-section {
    padding: 15px 15px 10px;
    text-align: left;
    border-radius: 8px;

    h2,
    h3 {
      font-size: 1.15em;
      margin: 15px 0 8px;
      color: #333;
    }

    .checkbox-group,
    .radio-group {
      margin-bottom: 5px;

      label {
        display: flex;
        align-items: center;
        margin-bottom: 6px;

        input {
          margin-right: 4px;
        }
      }
    }

    .star-rating {
      label {
        display: inline-block;
        margin-right: 5px;
      }

      input {
        margin-right: 2px;
      }
    }

    .price-range {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: center;
      font-size: 14px;
      margin-bottom: 8px;

      input[type="range"] {
        width: 100%;
      }
    }
  }

  a {
    display: inline-block;
    color: #007bff;
    text-decoration: none;
    margin-bottom: 5px;
    position: relative;
    cursor: pointer;

    &::after {
      content: '';
      position: absolute;
      left: 0;
      bottom: -2px;
      width: 100%;
      height: 1px;
      background-color: #007bff;
      transform: scaleX(0);
      transition: transform 0.2s ease;
    }

    &:hover::after {
      transform: scaleX(1);
    }
  }
}
</style>
