import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login/index.vue'
import Layout from '@/views/Layout/index.vue'
import Home from '@/views/Home/index.vue'
import Search from '@/views/Search/index.vue'
import Product from '@/views/Product/index.vue'
import Order from '@/views/Order/index.vue'
import OrderForm from '@/views/Order/components/OrderForm.vue'
import OrderCreated from '@/views/Order/components/OrderCreated.vue'


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
        },
        {
          path: '/order/:id',
          component: Order,
          children: [
            {
              path: '',
              component: OrderForm,
              name: 'orderForm'
            },
            {
              path: '/order/created/:id',
              component: OrderCreated,
              name: 'orderCreated'
            }
          ]
        },
      ]
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    // 如果有儲存的位置，則滾動到儲存的位置（例如，點擊瀏覽器的回退按鈕時）
    if (savedPosition) {
      return savedPosition;
    } else {
      // 否則滾動到頂部
      return { top: 0, behavior: 'smooth' };
    }
  }
})

router.beforeEach((to, from, next) => {
  if (from.name === 'orderCreated' && to.name === 'orderForm') {
    // 防止從完成頁面返回到表單頁面
    next(false);
  } else {
    next();
  }
});

export default router
