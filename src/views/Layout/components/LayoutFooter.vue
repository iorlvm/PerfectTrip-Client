<script setup></script>

<template>
  <footer>
    <div class="container">
      <el-row :gutter="10">
        <el-col :xs="12" :sm="8" :md="8">
          <!-- <div class="logo">LOGO</div>
          <p>地址：XXX 路，城市，國家</p>
          <p>電話：+123 456 7890</p>
          <p>電子郵件：info@example.com</p> -->
        </el-col>
        <el-col :xs="12" :sm="8" :md="8">
          <!-- <h3>快速連結</h3>
          <div class="quick-link">
            <p><a href="#">會員中心</a></p>
            <p><a href="#">最新消息</a></p>
            <p><a href="#">常見問題</a></p>
            <p><a href="#">熱門推薦</a></p>
            <p><a href="#">隱私申明</a></p>
            <p><a href="#">聯絡我們</a></p>
          </div> -->
        </el-col>
        <el-col :xs="0" :sm="8" :md="8">
          <!-- <h3>不知道要幹嘛</h3> -->
        </el-col>
      </el-row>
      <p class="copyright">
        © 2024 Tibame TIA201 Group 1. All rights reserved. For educational
        purposes only.
      </p>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
footer {
  background-color: $headerFooter;
  padding: 0 20px;
  min-width: 768px;
}

.container {
  color: $xtxColor;

  .el-col {
    padding: 50px 0;

    .column {
      width: 20%;
    }

    h3,
    .logo {
      height: 4.5em;
      font-size: 1.5em;
      line-height: 4.5;
    }

    p {
      font-size: 1.1em;
      line-height: 2.5;
    }
  }

  .quick-link {
    display: flex;
    flex-wrap: wrap;

    p {
      width: 50%;
    }
  }

  .copyright {
    padding-bottom: 50px;
    text-align: center;
    color: $xtxColor;
  }

  a {
    color: $xtxColor;
    text-decoration: none;
  }
}
</style>
