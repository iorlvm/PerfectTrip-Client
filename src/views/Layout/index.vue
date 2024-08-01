<script setup>
import LayoutNav from './components/LayoutNav.vue';
import LayoutFooter from './components/LayoutFooter.vue';
import LayoutChat from './components/LayoutChat.vue';
import { useAuthStore } from '@/stores/auth';
import { onBeforeMount } from 'vue';

const authStore = useAuthStore();

onBeforeMount(() => {
  if (!authStore.isAuth) {
    authStore.authToken();
  }
});
</script>

<template>
  <div class="flex-container">
    <LayoutNav />
    <main class="flex-main">
      <RouterView />

    </main>
    <LayoutFooter />
  </div>
  <LayoutChat />
</template>


<style lang="scss" scoped>
.flex-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.flex-main {
  flex: 1;
}
</style>
