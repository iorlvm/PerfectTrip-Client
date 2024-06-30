<script setup>
import ManageToolbar from './ManageToolbar.vue';
import ProductAlbum from '@/views/Product/components/ProductAlbum.vue';
</script>

<template>
  <ManageToolbar>
    <template #default>
      <li>
        <router-link to="/store/manage/setting/info">房間總覽</router-link>
      </li>
      <li>
        <router-link to="/store/manage/setting/infoedit">編輯</router-link>
      </li>
    </template>
  </ManageToolbar>

  <el-scrollbar>
    <ProductAlbum />
  </el-scrollbar>
</template>



<style lang="scss" scoped></style>