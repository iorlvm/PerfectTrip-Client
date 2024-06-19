<script setup></script>

<template>
  <header>
    <nav class="container">
      <ul>
        <li class="logo">PerfectTrip.com</li>
        <li class="grow"></li>
        <li>商家註冊</li>
        <li><i class="bi bi-question-circle"></i></li>
        <template v-if="true">
          <li>註冊</li>
          <li>登入</li>
        </template>
        <template v-else>
          <li><i class="bi bi-person-circle"></i></li>
        </template>
      </ul>
    </nav>
  </header>
</template>

<style lang="scss" scoped>
header {
  background-color: $headerFooter;
  padding: 2px 10px;
}

ul {
  display: flex;
  align-items: center;
  padding: 0 20px;

  .logo {
    font-size: 1.3em;
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
