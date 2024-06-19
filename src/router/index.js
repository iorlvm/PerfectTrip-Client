import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login/index.vue'
import Layout from '@/views/Layout/index.vue'
import Home from '@/views/Home/index.vue'
import Search from '@/views/Search/index.vue'
import Product from '@/views/Product/index.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: Layout,
      children: [
        {
          path: '',
          component: Home
        },
        {
          path: 'search',
          component: Search
        },
        {
          path: '/login',
          component: Login
        },
        {
          path: '/product/:id',
          component: Product
        }
      ]
    },
  ]
})

export default router
