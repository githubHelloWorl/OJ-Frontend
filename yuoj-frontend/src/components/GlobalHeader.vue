<template>
  <!-- wrap="false" 强令组件放在同一行 -->
  <a-row id="globalHeader" align="center" :wrap="false">
    <a-col flex="auto">
      <a-menu
        mode="horizontal"
        :selected-keys="selectedKeys"
        @menu-item-click="doMenuClick"
      >
        <a-menu-item
          key="0"
          :style="{ padding: 0, marginRight: '38px' }"
          disabled
        >
          <div class="title-bar">
            <img class="logo" src="../assets/yu-oj.png" />
            <div class="title">鱼 JO</div>
          </div>
        </a-menu-item>
        <a-menu-item v-for="item in visibleRoutes" :key="item.path">
          {{ item.name }}
        </a-menu-item>
      </a-menu>
    </a-col>
    <a-col flex="100px">
      <!-- 这里的信息 -->
      <div>{{ store.state.user?.loginUser?.userName ?? "未登录" }}</div>
    </a-col>
  </a-row>
</template>

<script setup lang="ts">
import { routes } from "../router/routes";
import { useRoute, useRouter } from "vue-router";
import { ref, computed } from "vue";
import { useStore } from "vuex";
import checkAccess from "@/access/checkAccess";
import ACCESS_ENUM from "@/access/accessEnum";

// 路由使用
const router = useRouter();
// const route = useRoute();

// ----------------------------
// 获取存储的信息
const store = useStore();
// ----------------------------

//const loginUser = store.state.user.loginUser;
// console.log("loginUser.userName:" + loginUser.userName);

// 展示在菜单的路由数组 (如果要监视它不断刷新,则可以使用computed属性)
const visibleRoutes = computed(() => {
  return routes.filter((item, index) => {
    // 此处如果是隐藏页面, 那就过滤掉
    if (item.meta?.hideInMenu) {
      return false;
    }
    // todo 根据权限过滤菜单
    if (
      !checkAccess(store.state.user.loginUser, item?.meta?.access as string)
    ) {
      return false;
    }
    return true;
  });
});

// ------------------ 回到默认主页
// 默认主页
const selectedKeys = ref(["/"]);

// 路由跳转后，更新选中的菜单项
router.afterEach((to, from, next) => {
  selectedKeys.value = [to.path];
});
// --------------------

// 点击跳转路径
const doMenuClick = (key: string) => {
  router.push({
    path: key,
  });
};

// 验证 判断3秒后是否会修改user
setTimeout(() => {
  store.dispatch("user/getLoginUser", {
    userName: "鱼皮",
    userRole: ACCESS_ENUM.ADMIN,
  });
}, 3000);
</script>

<style scoped>
.title-bar {
  display: flex;
  align-items: center;
}

.title {
  color: #4444;
  margin-left: 16px;
}

.logo {
  height: 48px;
}
</style>
