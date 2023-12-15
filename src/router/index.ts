import { createRouter, createWebHistory } from "vue-router";
//createRouter方法，用于创建路由器实例，可以管理多个路由
export default createRouter({
  //路由模式的设置
  history: createWebHistory(),
  //管理路由
  routes: [
    {
      path: "/home",
      component: () => import("@/pages/home/index.vue"),
      meta: { title: "首页" },
    },
    {
      path: "/hospital",
      component: () => import("@/pages/hospital/index.vue"),
      meta: { title: "医院" },
      children: [
        {
          path: "registered",
          component: () => import("@/pages/hospital/registered/index.vue"),
          meta: { title: "预约挂号" },
        },
        {
          path: "detail",
          component: () => import("@/pages/hospital/detail/index.vue"),
          meta: { title: "医院详情" },
        },
        {
          path: "notify",
          component: () => import("@/pages/hospital/notify/index.vue"),
          meta: { title: "预约须知" },
        },
        {
          path: "message",
          component: () => import("@/pages/hospital/message/index.vue"),
          meta: { title: "停诊信息" },
        },
        {
          path: "query",
          component: () => import("@/pages/hospital/query/index.vue"),
          meta: { title: "查询/取消" },
        },
        {
          path: "registered_step",
          component: () =>
            import("@/pages/hospital/registered/registered_step.vue"),
            meta: { title: "预约挂号-第一步" },
        },
        {
          path: "registered_step1",
          component: () =>
            import("@/pages/hospital/registered/registered_step1.vue"),
            meta: { title: "预约挂号-第二步" },
        },
        {
          path: "registered_step2",
          component: () =>
            import("@/pages/hospital/registered/registered_step2.vue"),
            meta: { title: "就诊人信息管理" },
        },
      ],
    },
    {
      path: "/wxlogin",
      component: () => import("@/pages/wxlogin/index.vue"),
      meta: { title: "微信登录" },
    },
    {
      path: "/vipuser",
      component: () => import("@/pages/vipuser/index.vue"),
      children: [
        {
          path: "certification",
          component: () => import("@/pages/vipuser/certification/index.vue"),
          meta: { title: "实名认证" },
        },
        {
          path: "order",
          component: () => import("@/pages/vipuser/order/index.vue"),
          meta: { title: "挂号订单" },
        },
        {
          path: "patient",
          component: () => import("@/pages/vipuser/patient/index.vue"),
          meta: { title: "就诊人管理" },
        },
        {
          path: "profile",
          component: () => import("@/pages/vipuser/profile/index.vue"),
          meta: { title: "账号信息" },
        },
        {
          path: "feedback",
          component: () => import("@/pages/vipuser/feedback/index.vue"),
          meta: { title: "意见反馈" },
        },
      ],
    },
    {
      path: "/",
      redirect: "/home",
    },
  ],
  //滚动行为:控制滚动条的位置
  scrollBehavior() {
    return {
      top: 0,
      left: 0,
    };
  },
});
