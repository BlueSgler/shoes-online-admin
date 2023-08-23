import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import { useUserInfoStore } from "@/stores/userInfo.store";

const userInfoStore = useUserInfoStore();

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/home/admin-home",
    },
    {
      path: "/home",
      name: "home",
      component: HomeView,
      children: [
        {
          path: "admin-home",
          name: "admin-home",
          component: () => import("@/components/home/AdminHome.vue"),
        },
        {
          path: "users",
          name: "users",
          component: () => import("@/components/users/UserManagement.vue"),
        },
        {
          path: "goods",
          name: "goods",
          component: () => import("@/components/goods/GoodsManagement.vue"),
        },
      ],
    },
    {
      path: "/login",
      name: "login",
      meta: {
        noAuth: true,
      },
      component: () => import("@/views/LoiginView.vue"),
    },
  ],
});

//路由前置守卫，验证用户身份，检查权限
//to 即将进入目标路由对象，包含路径、参数、查询参数等
//from 当前导航正要离开的路由对象，包含了当前的路由信息
//next 函数，用于控制导航行为，他可以接收一个参数，用于指定导航的目标路由
router.beforeEach((to, from, next) => {
  if (to.meta.noAuth || userInfoStore.authFromLoacl()) {
    next();
  } else {
    router.push("/login");
  }
});

export default router;
