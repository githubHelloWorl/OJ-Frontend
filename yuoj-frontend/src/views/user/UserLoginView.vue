<template>
  <div id="userLoginView">
    <a-form
      label-align="left"
      auto-label-width
      :model="form"
      style="max-width: 480px; margin: 0 auto"
      @submit="handleSubmit"
    >
      <a-form-item field="userAccount" label="账号">
        <a-input v-model="form.userAccount" placeholder="请输入账号" />
      </a-form-item>
      <a-form-item field="userPassword" label="密码">
        <a-input-password
          v-model="form.userPassword"
          placeholder="请输入密码"
        />
      </a-form-item>
      <a-form-item label="Activity form">
        <a-button html-type="submit">提交</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { UserControllerService, UserLoginRequest } from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import ACCESS_ENUM from "@/access/accessEnum";

/**
 * 表单信息
 */
const form = reactive({
  userAccount: "",
  userPassword: "",
});
const router = useRouter();
const store = useStore();
/**
 * 提交表单
 * @param data
 */
const handleSubmit = async (data: any) => {
  // alert(JSON.stringify(data))

  const res = await UserControllerService.userLogin(form);
  // 登录成功 跳转到主页
  if (res.code === 0) {
    // console.log("res.data?.userName =");
    // console.log(res.data?.userName);

    await store.dispatch("user/getLoginUser", {
      userName: res.data?.userName,
      userRole: ACCESS_ENUM.ADMIN,
    });

    // const res1 = await UserControllerService.getLoginUser();
    // if (res1.code === 0) {
    //   message.success("得到陈宫");
    // } else {
    //   message.error("得到失败");
    // }

    await router.push({
      path: "/",
      replace: true,
    });
  } else {
    message.error("登录失败 " + res.message);
  }
};
</script>

<style scoped>
#userLoginView {
}
</style>