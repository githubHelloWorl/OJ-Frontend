<template>
<!--  {{ language }}-->
  <div
    id="codeEditor"
    ref="codeEditorRef"
    style="min-height: 400px; height: 70vh"
  ></div>
  <!--  <a-button @click="fillValue"></a-button>-->
</template>

<script setup lang="ts">
import * as monaco from "monaco-editor";
import { onMounted, ref, toRaw, defineProps, withDefaults, watch } from "vue";

const codeEditorRef = ref();
const codeEditor = ref();
const value = ref();

/**
 * 定义组件类型
 */
interface Props {
  value: string;
  language?: string;
  handlerChange: (v: string) => void;
}

/**
 * 给组件指定初始值
 */
const props = withDefaults(defineProps<Props>(), {
  value: () => "",
  language: () => "java",
  handlerChange: (v: string) => {
    console.log("v=")
    console.log(v);
  },
});

/**
 * 如果要监听,那就使用这种方式生效
 */
watch(
  () => props.language,
  () => {
    if(codeEditor.value){
      monaco.editor.setModelLanguage(toRaw(codeEditor.value).getModel(),props.language);
    }


    // // 初始值
    // codeEditor.value = monaco.editor.create(codeEditorRef.value, {
    //   value: value.value,
    //   language: props.language,
    //   automaticLayout: true,
    //   colorDecorators: true,
    //   minimap: {
    //     enabled: true,
    //   },
    //   readOnly: false,
    //   theme: "vs-dark",
    //   // lineNumbers: "off",
    //   // roundedSelection: false,
    //   // scrollBeyondLastLine: false,
    // });
  }
);

// const fillValue = () => {
//   if (!codeEditorRef.value) {
//     return;
//   }
//   // 改变值
//   toRaw(codeEditor.value).setValue("hello");
// };

onMounted(() => {
  if (!codeEditorRef.value) {
    return;
  }

  // 初始值
  codeEditor.value = monaco.editor.create(codeEditorRef.value, {
    value: value.value,
    language: props.language,
    automaticLayout: true,
    colorDecorators: true,
    minimap: {
      enabled: true,
    },
    readOnly: false,
    theme: "vs-dark",
    // lineNumbers: "off",
    // roundedSelection: false,
    // scrollBeyondLastLine: false,
  });

  // 编辑 监听内容变化
  codeEditor.value.onDidChangeModelContent(() => {
    // console.log("目前内容为 :", toRaw(codeEditor.value).getValue());
    props.handlerChange(toRaw(codeEditor.value).getValue());
  });
});
</script>
