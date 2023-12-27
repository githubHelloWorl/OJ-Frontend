<template>
  <div id="BasicLayout">
    <a-layout style="height: 400px">
      <a-layout-header class="header">
        <GlobalHeader />
      </a-layout-header>
      <a-layout-content class="content">
        <router-view />
      </a-layout-content>
      <!--
      <a-layout-footer class="footer">
        <a href="https://www.baidu.com/">查询信息</a>
      </a-layout-footer> -->
    </a-layout>
  </div>
</template>

<script setup lang="ts">
import GlobalHeader from "@/components/GlobalHeader.vue";
</script>

<style>
#BasicLayout {
}

#BasicLayout .header {
  margin-bottom: 16px;
  box-shadow: #eee 1px 1px 5px;
  /* background: red; */
}

#BasicLayout .content {
  background: linear-gradient(to right, #bbb, #fff);
  margin-bottom: 16px;
}

#BasicLayout .footer {
  background: #efefef;
  padding: 16px;
  position: absolute;
  buttom: 0;
  left: 0;
  right: 0;
  text-align: center;
}
</style>
