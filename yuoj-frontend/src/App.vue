<template>
  <div id="app">
    <template v-if="route.path.startsWith('/user')">
      <router-view></router-view>
    </template>
    <template v-else>
      <BasicLayout />
    </template>
  </div>
</template>

<style>
#app {
}
</style>
<script setup lang="ts">
import BasicLayout from "@/layouts/BasicLayout";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";
import { onMounted } from "vue";

const route = useRoute();

/**
 * 全局初始化函数,有全局单次调用的代码,可以写到这里
 */
const doInit = () => {
  console.log("doInit");
};

onMounted(() => {
  doInit();
});

const router = useRouter();
const store = useStore();
//
// // 进行权限判断拦截
// router.beforeEach((to, from, next) => {
//   // 仅管理员可见 判断当前用户是否有权限
//   if (to.meta?.access === "canAdmin") {
//     if (store.state.user.loginUser?.rule !== "admin") {
//       next("/noAuth");
//       return;
//     }
//   }
//   next();
// });
</script>
