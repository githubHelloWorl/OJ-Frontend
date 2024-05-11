<template>
  <div id="QuestionView">
    <h2 style="margin-left: 15%">管理题目</h2>
    <a-form :model="searchParams" layout="inline">
      <a-form-item field="=title" label="名称" style="min-width: 240px">
        <a-input v-model="searchParams.title" placeholder="请输入名称" />
      </a-form-item>
      <a-form-item field="=tags" label="标签" style="min-width: 240px">
        <a-input-tag v-model="searchParams.tags" placeholder="请输入标签" />
      </a-form-item>
      <a-form-item style="max-width: 240px">
        <a-button type="primary" @click="doSubmit">搜索</a-button>
      </a-form-item>
    </a-form>
    <a-divider size="0" />
    <a-table
      :ref="tableRef"
      :columns="columns"
      :data="dataList"
      :pagination="{
        showTotal: true,
        pageSize: searchParams.pageSize,
        current: searchParams.current,
        total,
      }"
      @page-change="onPageChange"
    >
      <template #tags="{ record }">
                <a-space warp>
                  <a-tag v-for="(tag, index) of JSON.parse(record.tags)" :key="index" color="green">
                    {{ tag }}
                  </a-tag>
                </a-space>
      </template>
      <template #acceptdRate="{ record }">
        {{
          `${
            record.submitNum ? record.acceptedNum / record.submitNum : "0"
          }% (${record.acceptedNum}/${record.submitNum})`
        }}
      </template>
      <template #createTime="{ record }">
        {{ moment(record.createTime).format("YYYY-MM-DD") }}
      </template>
      <template #optional="{ record }">
        <a-space>
          <a-button type="primary" @click="toQuestionPage(record)"
            >做题</a-button
          >
        </a-space>
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watchEffect } from "vue";
import {
  PageQuestion,
  Question,
  QuestionControllerService,
  QuestionQueryRequest,
} from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";
import * as querystring from "querystring";
import moment from "moment";

const show = ref(true);
const tableRef = ref();
const dataList = ref([]);
const total = ref(0);
const searchParams = ref<QuestionQueryRequest>({
  title: "",
  tags: [],
  pageSize: 10,
  pageNum: 1,
  current: 1,
});

const loadData = async () => {
  const res = await QuestionControllerService.listQuestionByPage1(
    searchParams.value
  );
  if (res.code === 0) {
    dataList.value = res.data?.records;
    total.value = res.data?.total;
  } else {
    message.error("加载失败" + res.message);
  }
};

/**
 * 监听searchParams变量改变时触发页面的重新加载
 */
// watchEffect:监听函数中控制的变量 当里面的函数中控制的数据发改变时,会自动触发
watchEffect(() => {
  loadData();
});

/**
 * 加载页面
 */
onMounted(() => {
  loadData();
});

const columns = [
  {
    title: "题号",
    dataIndex: "id",
  },
  {
    title: "题目名称",
    dataIndex: "title",
  },
  {
    title: "标签",
    slotName: "tags",
  },
  {
    title: "通过率",
    slotName: "acceptdRate",
  },
  {
    title: "创建时间",
    slotName: "createTime",
  },
  {
    title: "操作",
    slotName: "optional",
  },
];

const router = useRouter();

const onPageChange = (page: number) => {
  searchParams.value = {
    ...searchParams.value,
    // pageNum: page,
    current: page
  };
};

/**
 * 跳转到做题页面
 * @param question
 */
const toQuestionPage = async (question: Question) => {
  router.push({
    path: `/view/question/${question.id}`,
  });
};

/**
 * 确认搜索,重新加载数据
 */
const doSubmit = async () => {
  // 这里需要重新搜索号
  searchParams.value = {
    ...searchParams.value,
    current: 1,
  };
};
</script>

<style scoped>
#QuestionView {
  max-width: 1280px;
  margin: 0 auto;
}
</style>
