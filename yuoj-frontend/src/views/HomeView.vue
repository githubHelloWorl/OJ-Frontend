<template>
  <div class="home">
    <MdEditor :value="value" :handle-change="onChange" />
    <CodeEditor  handler-change=""/>
    <a-button type="primary" @click="aaaTest">aaa</a-button>
  </div>
</template>

<script setup lang="ts">
import { defineComponent, ref } from "vue";
import MdEditor from "@/components/MdEditor.vue";
import CodeEditor from "@/components/CodeEditor.vue";
import { UserControllerService } from "../../generated";
import message from "@arco-design/web-vue/es/message"; // @ is an alias to /src

const aaaTest = async () => {
  const res = await UserControllerService.getLoginUser();
  if (res.code === 0) {
    message.success("得到陈宫");
  } else {
    message.error("得到失败");
  }
};

const value = ref();
const onChange = (v: string) => {
  value.value = v;
  console.log(value.value)
};
</script>
