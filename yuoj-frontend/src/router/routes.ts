import { RouteRecordRaw } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import AdminView from "@/views/AdminView.vue";
import NoAuthView from "@/views/NoAuthView.vue";
import AddQuestionView from "@/views/question/AddQuestionView.vue";
import ACCESS_ENUM from "@/access/accessEnum";
import UserLayout from "@/views/user/UserLayout.vue";
import UserLoginView from "@/views/user/UserLoginView.vue";
import UserRegisterView from "@/views/user/UserRegisterView.vue";

export const routes: Array<RouteRecordRaw> = [
  {
    path: "/user",
    name: "用户",
    component: UserLayout,
    children: [
      {
        path: "/user/login",
        name: "用户登录",
        component: UserLoginView,
      },
      {
        path: "/user/register",
        name: "用户注册",
        component: UserRegisterView,
      },
    ],
  },
  {
    path: "/add/question",
    name: "创建题目",
    component: () => import("@/views/question/AddQuestionView.vue"),
    // meta: {
    //   access: ACCESS_ENUM.ADMIN,
    // },
  },
  {
    path: "/update/question",
    name: "更新题目",
    component: () => import("@/views/question/AddQuestionView.vue"),
    // meta: {
    //   access: ACCESS_ENUM.ADMIN,
    // },
  },
  {
    path: "/manage/question",
    name: "管理题目",
    component: () => import("@/views/question/ManageQuestionView.vue"),
  },
  {
    path: "/",
    name: "主页",
    component: HomeView,
  },
  {
    path: "/questions",
    name: "浏览题目",
    component: () => import("@/views/question/QuestionView.vue"),
  },
  {
    path: "/view/question/:id",
    name: "在线做题",
    component: () => import("@/views/question/ViewQuestionView.vue"),
    props: true,
  },
  // {
  //   path: "/hide",
  //   name: "隐藏页面",
  //   component: HomeView,
  //   meta: {
  //     hideInMenu: true,
  //   },
  // },
  // {
  //   path: "/noAuth",
  //   name: "无权限",
  //   component: NoAuthView,
  // },
  // {
  //   path: "/admin",
  //   name: "管理员可见",
  //   component: AdminView,
  //   meta: {
  //     access: ACCESS_ENUM.ADMIN,
  //   },
  // },
  // {
  //   path: "/about",
  //   name: "about",
  //   component: () =>
  //     import("../views/AboutView.vue"),
  // },
];
