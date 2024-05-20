<template>
  <div id="ViewQuestionView">
    <a-row :gutter="[24, 24]">
      <a-col :md="12" :xs="24">
        <a-tabs default-active-key="question">
          <a-tab-pane key="question" title="题目">
            <a-card v-if="question" :title="question.title">
              <a-descriptions
                title="判题条件"
                :column="{ xs: 1, md: 2, lg: 3 }"
              >
                <a-descriptions-item label="时间限制">
                  {{ question.judgeConfig?.timeLimit ?? 0 }}
                </a-descriptions-item>
                <a-descriptions-item label="内存限制">
                  {{ question.judgeConfig?.memoryLimit ?? 0 }}
                </a-descriptions-item>
                <a-descriptions-item label="堆栈限制">
                  {{ question.judgeConfig?.stackLimit ?? 0 }}
                </a-descriptions-item>
              </a-descriptions>
              <MdViewer :value="question.content || ''" />
              <template #extra>
                <a-space wrap>
                  <a-tag
                    v-for="(tag, index) of question.tags"
                    :key="index"
                    style="margin-bottom: 0"
                    color="green"
                    >{{ tag }}
                  </a-tag>
                </a-space>
              </template>
            </a-card>
          </a-tab-pane>
          <a-tab-pane key="comment" title="评论" disabled> 评论区 </a-tab-pane>
          <a-tab-pane key="answer" title="答案"> 暂时无法查看答案 </a-tab-pane>
        </a-tabs>
      </a-col>
      <a-col :md="12" :xs="24">
        <a-form :model="form" layout="inline">
          <a-form-item field="=title" label="编程语言" style="min-width: 240px">
            <a-select
              v-model="form.language"
              :style="{ width: '320px' }"
              placeholder="请选择编程语言"
            >
              <a-option>Java</a-option>
              <a-option>C++</a-option>
              <a-option>Golang</a-option>
            </a-select>
          </a-form-item>
        </a-form>
        <CodeEditor
          :handler-change="changeCode"
          :value="form.code as string"
          :language="form.language"
        />
        <a-divider :size="0" />
        <a-button type="primary" style="min-width: 200px" @click="doSubmit"
          >提交代码</a-button
        >
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
  QuestionSubmitAddRequest,
  QuestionVO,
  QuestionControllerService,
  UserControllerService,
  QuestionSubmitControllerService,
} from "../../../generated";
import CodeEditor from "@/components/CodeEditor.vue";
import message from "@arco-design/web-vue/es/message";
import { useRoute } from "vue-router";
import MdViewer from "@/components/MdViewer.vue";
import { useRouter } from "vue-router";

interface Props {
  id: string;
}

const props = withDefaults(defineProps<Props>(), {
  id: () => "",
});

const router = useRouter();
const question = ref<QuestionVO>([]);

const codeValue = ref();

/**
 * 根据题目 id 获取老的数据
 */
const loadData = async () => {
  const res: any = await QuestionControllerService.getQuestionVoById(
    props.id as any
  );
  if (res.code === 0) {
    question.value = res.data;
  } else {
    message.error("加载失败" + res.message);
    await router.replace({ path: "/questions" });
  }
};

const form = ref<QuestionSubmitAddRequest>({
  language: "java",
  code: "",
});

/**
 * 提交代码
 */
const doSubmit = async () => {
  if(!question.value?.id){
    return;
  }
  console.log(form.value)
  const res = await QuestionSubmitControllerService.doQuestionSubmit({
    ...form.value,
    questionId: question.value.id,
  });
  if (res.code === 0) {
    message.success("提交成功");
  } else {
    message.error("提交失败," + res.message);
  }
};

const changeCode = (value: string) => {
  form.value.code = value;
  console.log("ViewQuestionView form.value = ")
  console.log(form.value.code)
};

const onCodeChange = (v: string) => {
  codeValue.value = v;
};

// 初始化
onMounted(() => {
  loadData();
});

/*
public class test1{
    public static int main(String[] args){
        System.out.println("hello world");
        return 0;
    }
}
 */
</script>

<style scoped>
#ViewQuestionView {
  max-width: 1400px;
  margin: 0 auto;
}

#viewQuestionView .arco-apace-horizontal .arco-space-item {
  margin-bottom: 0 !important;
}
</style>
