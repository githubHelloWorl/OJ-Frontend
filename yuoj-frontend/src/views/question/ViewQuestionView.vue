<template>
  <div id="ViewQuestionView">
    <a-row :gutter="[24,24]">
      <a-col :md="12" :xs="24">
        <a-tags default-active-key="question">
          <a-tab-pane key="question" title="题目">
            <a-card v-if="question">
              <MdViewer :value="question.content || ''" />
            </a-card>
          </a-tab-pane>
        </a-tags>
        <MdEditor :value="question.content" />
      </a-col>
      <a-col>
        <CodeEditor handler-change=""/>
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import { reactive, onMounted, ref, toRaw } from "vue";
import MdEditor from "@/components/MdEditor.vue";
import { useStore } from "vuex";
import {
  Question,
  QuestionVO,
  QuestionControllerService,
  UserControllerService,
} from "../../../generated";
import CodeEditor from "@/components/CodeEditor.vue";
import message from "@arco-design/web-vue/es/message";
import { useRoute } from "vue-router";

interface Props {
  id: string;
}

const props = withDefaults(defineProps<Props>(), {
  id: () => "",
})

const question = ref<QuestionVO>([])

/**
 * 根据题目 id 获取老的数据
 */
const loadData = async () => {
  const res = await QuestionControllerService.getQuestionVoById(props.id as any)
  if (res.code === 0) {
    question.value = res.data
  } else {
    message.error("加载失败" + res.message);
  }
};

// 初始化
onMounted(() => {
  loadData();
});

</script>

<style scoped>
#ViewQuestionView {
}
</style>
