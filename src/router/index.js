import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "@/stores/user";
import Login from "@/views/Login/index.vue";
import ErrorPage from "@/views/ErrorPage/index.vue";
import Layout from "@/views/Layout/index.vue";
import Home from "@/views/Home/index.vue";
import Search from "@/views/Search/index.vue";
import Product from "@/views/Product/index.vue";
import Order from "@/views/Order/index.vue";
import OrderForm from "@/views/Order/components/OrderForm.vue";
import OrderPay from "@/views/Order/components/OrderPay.vue";
import OrderCreated from "@/views/Order/components/OrderCreated.vue";
import Member from "@/views/Member/index.vue";
import MemberInfo from "@/views/Member/components/MemberInfo.vue";
import MemberBooking from "@/views/Member/components/MemberBooking.vue";
import StoreIndex from "@/views/StorePage/index.vue";
import StoreLogin from "@/views/StorePage/components/StoreLogin.vue";
import StoreWelcome from "@/views/StorePage/components/StoreWelcome.vue";
import StoreManageCenter from "@/views/StoreManageCenter/index.vue";
import InfoOverview from "@/views/StoreManageCenter/components/InfoOverview.vue";
import ImportantMessage from "@/views/StoreManageCenter/components/ImportantMessage.vue";
import CustomerMessage from "@/views/StoreManageCenter/components/CustomerMessage.vue";
import ContactUs from "@/views/StoreManageCenter/components/ContactUs.vue";
import OrderList from "@/views/StoreManageCenter/components/OrderList.vue";
import OrderCalendar from "@/views/StoreManageCenter/components/OrderCalendar.vue";
import RoomList from "@/views/StoreManageCenter/components/RoomList.vue";
import RoomDiscount from "@/views/StoreManageCenter/components/RoomDiscount.vue";
import RoomInventory from "@/views/StoreManageCenter/components/RoomInventory.vue";
import HotelInfo from "@/views/StoreManageCenter/components/HotelInfo.vue";
import HotelInfoEdit from "@/views/StoreManageCenter/components/HotelInfoEdit.vue";
import StoreAccount from "@/views/StoreManageCenter/components/StoreAccount.vue";
import QA from "@/views/QA/index.vue";
import StoreRegister from "@/views/StorePage/components/StoreRegister.vue"
import MemberRegister from "@/views/Member/components/MemberRegister.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: Layout,
      children: [
        {
          path: "",
          component: Home,
        },
        {
          path: "search",
          component: Search,
        },
        {
          path: "login",
          component: Login,
        },
        {
          path: "company/:id",
          component: Product
        },
        {
          path: "/register",
          component: MemberRegister,
        },
        {
          path: "order/",
          component: Order,
          redirect: "/error",
          children: [
            {
              path: "form/:id",
              component: OrderForm,
              name: "orderForm",
            },
            {
              path: "pay/:id",
              component: OrderPay,
              name: "orderPay",
            },
            {
              path: "created/:id",
              component: OrderCreated,
              name: "orderCreated",
            },
          ],
        },
        {
          path: "member/",
          component: Member,
          meta: {
            requiresRole: 'user'
          },
          children: [
            {
              path: "",
              component: MemberInfo,
            },
            {
              path: "journey",
              component: MemberBooking,
            }
          ],
        },
        {
          path: "qa",
          component: QA,
        },
      ],
    },
    {
      path: "/store",
      component: StoreIndex,
      children: [
        {
          path: "",
          component: StoreWelcome,
        },
        {
          path: "login",
          component: StoreLogin,
        },
        {
          path: "register",
          component: StoreRegister
        }
      ],
    },
    {
      path: "/store/manage",
      component: StoreManageCenter,
      meta: {
        requiresRole: 'company'
      },
      children: [
        {
          path: "",
          component: InfoOverview,
        },
        {
          path: "message/important",
          component: ImportantMessage,
        },
        {
          path: "message/customer",
          component: CustomerMessage,
        },
        {
          path: "message/contactus",
          component: ContactUs,
        },
        {
          path: "order/list",
          component: OrderList,
        },
        {
          path: "order/calendar",
          component: OrderCalendar,
        },
        {
          path: "room/list",
          component: RoomList,
        },
        {
          path: "room/discount",
          component: RoomDiscount,
        },
        {
          path: "room/inventory",
          component: RoomInventory,
        },
        {
          path: "setting/info",
          component: HotelInfo,
        },
        {
          path: "setting/infoedit",
          component: HotelInfoEdit,
        },
        {
          path: "setting/account",
          component: StoreAccount,
        },
      ],
    },
    {
      path: "/error",
      component: ErrorPage,
    },
    {
      path: "/:catchAll(.*)",
      component: ErrorPage,
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
  },
});

router.beforeEach((to, from, next) => {
  const userStore = useUserStore();
  const { role } = userStore.userInfo;

  if (
    (from.name === "orderCreated" && to.name === "orderPay") ||
    (from.name === "orderPay" && to.name === "orderForm")
  ) {
    // 防止從完成頁面返回到付款頁面 或是 付款頁面回到表單頁面
    next(false);
    return;
  }

  if (to.matched.some(record => record.meta.requiresRole)) {
    const requiredRole = to.matched.find(record => record.meta.requiresRole).meta.requiresRole;
    if (role !== requiredRole) {
      switch (requiredRole) {
        case 'user':
          next({ path: '/login' });
          return;
        case 'company':
          next({ path: '/store/login' });
          return;
      }
      next(false);
      return;
    }
  }

  next();
});

export default router;
