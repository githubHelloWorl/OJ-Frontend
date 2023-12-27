<template>
  <a-row id="globalHeader" style="margin-bottom: 16px" align="center">
    <a-col flex="auto">
      <a-menu
        mode="horizontal"
        :selected-keys="selectedKeys"
        :default-selected-keys="['1']"
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
        <a-menu-item v-for="item in routes" :key="item.path">
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
import { ref } from "vue";
import { useStore } from "vuex";

// 路由使用
const router = useRouter();
// const route = useRoute();

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

// ----------------------------
// 获取存储的信息
const store = useStore();
// ----------------------------

// 验证 判断3秒后是否会修改user
setTimeout(() => {
  store.dispatch("user/getLoginUser", {
    userName: "鱼皮",
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
