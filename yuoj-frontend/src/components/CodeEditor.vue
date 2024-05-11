<template>
  <div id="codeEditor" ref="codeEditorRef" style="min-height: 400px"></div>
  {{ value }}
  <a-button @click="fillValue"></a-button>
</template>

<script setup lang="ts">
import * as monaco from "monaco-editor";
import { onMounted, ref, toRaw, defineProps, withDefaults } from "vue";

const codeEditorRef = ref();
const codeEditor = ref();
const value = ref();

/**
 * 定义组件类型
 */
interface Props {
  value: string;
  handlerChange: (v: string) => void;
}

/**
 * 给组件指定初始值
 */
const props = withDefaults(defineProps<Props>(), {
  value: () => "",
  handleChange: (v: string) => {
    console.log(v);
  },
});

const fillValue = () => {
  if (!codeEditorRef.value) {
    return;
  }
  // 改变值
  toRaw(codeEditor.value).setValue("hello");
};

onMounted(() => {
  if (!codeEditorRef.value) {
    return;
  }

  // 初始值
  codeEditor.value = monaco.editor.create(codeEditorRef.value, {
    value: value.value,
    language: "java",
    automaticLayout: true,
    minimap: {
      enabled: true,
    },
    lineNumbers: "off",
    roundedSelection: false,
    scrollBeyondLastLine: false,
    readOnly: false,
    theme: "vs-dark",
  });

  // 编辑 监听内容变化
  codeEditor.value.onDidChangeModelContent(() => {
    console.log("目前内容为 :", toRaw(codeEditor.value).getValue());
  });
});
</script>
