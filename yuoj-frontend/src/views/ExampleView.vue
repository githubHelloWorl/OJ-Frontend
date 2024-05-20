<template>
  <div class="home">
    <MdEditor :value="mdValue" :handle-change="onMdChange" />
    <CodeEditor :value="codeValue" :handler-change="onCodeChange"/>
  </div>
</template>

<script setup lang="ts">
import { defineComponent, ref } from "vue";
import MdEditor from "@/components/MdEditor.vue";
import CodeEditor from "@/components/CodeEditor.vue";
import { UserControllerService } from "../../generated";
import message from "@arco-design/web-vue/es/message"; // @ is an alias to /src

const mdValue= ref();
const codeValue = ref();

const onMdChange = (v: string) => {
  mdValue.value = v;
};

const onCodeChange = (v: string) => {
  codeValue.value = v;
}
</script>
