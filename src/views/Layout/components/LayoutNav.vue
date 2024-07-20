<script setup>
import router from '@/router';


</script>

<template>
  <header>
    <nav class="container">
      <ul>
        <li class="logo">
          <router-link to="/">
            PerfectTrip.com
          </router-link>
        </li>
        <li class="grow"></li>
        <li>
          <router-link to="/store">
            商家註冊
          </router-link>
        </li>
        <li>

          <router-link to="/qa"><i class="bi bi-question-circle"></i></router-link>
        </li>
        <template v-if="false">
          <li>註冊</li>
          <li>登入</li>
        </template>
        <template v-else>
          <li>
            <router-link to="/member/journey">
              我的旅程
            </router-link>
          </li>
          <li>
            <router-link to="/member">
              <i class="bi bi-person-circle"></i>&nbsp;會員名稱
            </router-link>
          </li>
        </template>
      </ul>
    </nav>
  </header>
</template>

<style lang="scss" scoped>
header {
  background-color: $headerFooter;
  padding: 8px 10px 5px;
  min-width: 768px;
}

a {
  color: $xtxColor;
}

ul {
  display: flex;
  align-items: center;
  padding: 0 20px;

  .logo {
    font-size: 1.3em;
    letter-spacing: 1px;
    font-weight: bold;
  }

  li {
    margin: 2px 8px;
    font-size: 1.1em;
    color: $xtxColor;
  }

  .grow {
    flex-grow: 1;
  }
}
</style>
