import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login/index.vue'
import ErrorPage from '@/views/ErrorPage/index.vue'
import Layout from '@/views/Layout/index.vue'
import Home from '@/views/Home/index.vue'
import Search from '@/views/Search/index.vue'
import Product from '@/views/Product/index.vue'
import Order from '@/views/Order/index.vue'
import OrderForm from '@/views/Order/components/OrderForm.vue'
import OrderCreated from '@/views/Order/components/OrderCreated.vue'
import Member from '@/views/Member/index.vue'
import MemberInfo from '@/views/Member/components/MemberInfo.vue'
import MemberPayment from '@/views/Member/components/MemberPayment.vue'
import MemberFavorite from '@/views/Member/components/MemberFavorite.vue'
import MemberBooking from '@/views/Member/components/MemberBooking.vue'
import MemberMessage from '@/views/Member/components/MemberMessage.vue'
import MemberFerences from '@/views/Member/components/MemberFerences.vue'
import MemberSafety from '@/views/Member/components/MemberSafety.vue'
import StoreIndex from '@/views/StorePage/index.vue'
import StoreLogin from '@/views/StorePage/components/StoreLogin.vue'
import StoreWelcome from '@/views/StorePage/components/StoreWelcome.vue'
import StoreManageCenter from '@/views/StoreManageCenter/index.vue'

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
          path: 'login',
          component: Login
        },
        {
          path: 'product/:id',
          component: Product
        },
        {
          path: 'order/',
          component: Order,
          redirect: '/error',
          children: [
            {
              path: 'form/:id',
              component: OrderForm,
              name: 'orderForm'
            },
            {
              path: 'created/:id',
              component: OrderCreated,
              name: 'orderCreated'
            },
          ]
        },
        {
          path: 'member/',
          component: Member,
          children: [
            {
              path: '',
              component: MemberInfo,
            },
            {
              path: 'payment',
              component: MemberPayment,
            },
            {
              path: 'journey',
              component: MemberBooking,
            },
            {
              path: 'favorite',
              component: MemberFavorite,
            },
            {
              path: 'message',
              component: MemberMessage,
            },
            {
              path: 'ferences',
              component: MemberFerences,
            },
            {
              path: 'safety',
              component: MemberSafety,
            },
          ]
        },
        {
          path: '/error',
          component: ErrorPage
        },
        {
          path: '/:catchAll(.*)',
          component: ErrorPage
        },
      ]
    },
    {
      path: '/store',
      component: StoreIndex,
      children: [
        {
          path: '',
          component: StoreWelcome,
        },
        {
          path: 'login',
          component: StoreLogin,
        },

      ]
    },
            {
          path: '/store/manage',
          component: StoreManageCenter,
        },
  ],
  scrollBehavior(to, from, savedPosition) {
    // 如果有儲存的位置，則滾動到儲存的位置（例如:上一頁）
    if (savedPosition) {
      return savedPosition;
    } else {
      // 否則滾動到頂部
      return { top: 0 };
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
