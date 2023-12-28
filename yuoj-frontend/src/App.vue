<template>
  <div id="app">
    <BasicLayout />
  </div>
</template>

<style>
#app {
}
</style>
<script setup lang="ts">
import BasicLayout from "@/layouts/BasicLayout";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { onMounted } from "vue";

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

// 进行权限判断拦截
router.beforeEach((to, from, next) => {
  // 仅管理员可见 判断当前用户是否有权限
  if (to.meta?.access === "canAdmin") {
    if (store.state.user.loginUser?.rule !== "admin") {
      next("/noAuth");
      return;
    }
  }
  next();
});
</script>
