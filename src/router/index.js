import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue'),
  },
  {
    path: '/front',
    name: 'front',
    component: () => import('../views/FrontView.vue'),
    children: [
      // 登入
      {
        path: 'login',
        component: () => import('../components/LoginComponent.vue'),
      },
    ],
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import('../views/AdminView.vue'),
    children: [
      // 商品管理
      {
        path: 'manage',
        component: () => import('../components/ManageComponent.vue'),
      },
      // 訂單管理
      {
        path: 'order',
        component: () => import('../components/order/OrderComponent.vue'),
      },
      // 優惠券管理
      {
        path: 'coupon',
        component: () => import('../components/coupon/CouponComponent.vue'),
      },
      // 登出
      {
        path: 'logout',
        component: () => import('../components/LogOut.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  linkActiveClass: 'active',
  routes,
});

export default router;
