<script setup>
import { useUserStore } from '@/stores/user'

const userStore = useUserStore();
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
        <li style="margin-right: 10px;">
          <router-link to="/store">
            註冊為商家
          </router-link>
        </li>
        <li>
          <router-link to="/qa"><i class="bi bi-question-circle"></i></router-link>
        </li>
        <template v-if="userStore.userInfo.role !== 'user'">
          <router-link to="/register">
            <li>加入會員</li>
          </router-link>
          <router-link to="/login">
            <li>登入</li>
          </router-link>
        </template>
        <template v-else>
          <li>
            <router-link to="/member/journey">
              我的旅程
            </router-link>
          </li>
          <li>
            <router-link to="/member">
              <i class="bi bi-person-circle"></i>&nbsp;{{ userStore.userInfo.nickname }}
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
