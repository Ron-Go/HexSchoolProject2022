import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '',
    name: 'home',
    component: () => import('../views/HomeView.vue'),
  },
  {
    path: '/front',
    name: 'front',
    component: () => import('../views/FrontView.vue'),
    children: [
      // 商品
      {
        path: 'products',
        name: 'products',
        component: () => import('../components/front/ProductsComponent.vue'),
      },
      // 單一商品頁面
      {
        path: 'product/:id',
        component: () => import('../components/front/ProductComponent.vue'),
      },
      // 結帳
      {
        path: 'order',
        component: () => import('../components/front/OrderComponent.vue'),
      },
      // 結帳完成
      {
        path: 'payment/:id',
        component: () => import('../components/front/PaymentComponent.vue'),
        props: (route) => {
          console.log(route);
          return {
            orderId: route.params.id,
          };
        },
      },
      // 付款完成
      {
        path: 'finish/:id',
        component: () => import('../components/front/FinishComponent.vue'),
      },
    ],
  },
  // 登入
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue'),
    children: [
      {
        path: 'check',
        component: () => import('../components/LoginComponent.vue'),
      },
    ],
  },
  // 後台
  {
    path: '/admin',
    name: 'admin',
    component: () => import('../views/AdminView.vue'),
    children: [
      // 商品管理
      {
        path: 'product',
        name: 'product',
        component: () => import('../components/ManageComponent.vue'),
      },
      // 訂單管理
      {
        path: 'order',
        name: 'order',
        component: () => import('../components/order/OrderComponent.vue'),
      },
      // 優惠券管理
      {
        path: 'coupon',
        name: 'coupon',
        component: () => import('../components/coupon/CouponComponent.vue'),
      },
      // 登出
      {
        path: 'logout',
        name: 'logout',
        component: () => import('../components/LogOut.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  linkActiveClass: 'active',
  routes,
  // 經由滾動行為，到達錨點位置
  // scrollBehavior 由return值來控制滾動的目標位置
  scrollBehavior(to) {
    if (to.hash) {
      return {
        el: to.hash,
        // 距離錨點上方100px
        top: 100,
        right: 0,
        left: 0,
        behavior: 'smooth',
      };
    }
    return { top: 0 };
  },
});

export default router;
