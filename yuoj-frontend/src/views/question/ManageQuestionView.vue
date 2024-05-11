<template>
  <div id="manageQuestionView">
    <h2 style="margin-left: 15%">管理题目</h2>
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
      <template #optional="{ record }">
        <a-space>
          <a-button type="primary" @click="doUpdate(record)">修改</a-button>
          <a-button type="danger" @click="doDelete(record)">删除</a-button>
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
} from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";
import * as querystring from "querystring";

const show = ref(true);
const tableRef = ref();
const dataList = ref([]);
const total = ref(0);
const searchParams = ref({
  pageSize: 1,
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
    title: "id",
    dataIndex: "id",
  },
  {
    title: "标题",
    dataIndex: "title",
  },
  {
    title: "内容",
    dataIndex: "content",
  },
  {
    title: "标签",
    dataIndex: "tags",
  },
  {
    title: "答案",
    dataIndex: "answer",
  },
  {
    title: "提交数",
    dataIndex: "submitNum",
  },
  {
    title: "通过数",
    dataIndex: "acceptNum",
  },
  {
    title: "判题配置",
    dataIndex: "judgeConfig",
  },
  {
    title: "判题用例",
    dataIndex: "judgeCase",
  },
  {
    title: "用户id",
    dataIndex: "userId",
  },
  {
    title: "创建时间",
    dataIndex: "createTime",
  },
  {
    title: "Optional",
    slotName: "optional",
  },
];

const router = useRouter();

const onPageChange = (page: number) => {
  searchParams.value = {
    ...searchParams.value,
    pageNum: page,
  };
};

/**
 * 删除
 * @param question
 */
const doDelete = async (question: Question) => {
  const res = await QuestionControllerService.deleteQuestion({
    id: question.id,
  });
  if (res.code === 0) {
    message.success("删除成功");
    // TODO 更新数据
    loadData();
  } else {
    message.error("删除失败");
  }
};

/**
 * 更新
 * @param question
 */
const doUpdate = async (question: Question) => {
  router.push({
    path: "/update/question",
    query: {
      id: question.id,
    },
  });
};
</script>

<style scoped>
# {
}
</style>