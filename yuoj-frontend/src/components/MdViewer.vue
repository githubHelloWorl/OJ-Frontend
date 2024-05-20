<template>
  <Viewer :value="value" :plugins="plugins"/>
</template>

<script setup lang="ts">
import highlight from "@bytemd/plugin-highlight";
import gfm from "@bytemd/plugin-gfm";
import { Editor, Viewer } from "@bytemd/vue-next";
import { ref, withDefaults, defineProps } from "vue";

/**
 * 定義組件屬性類型
 */
interface Props {
  value: string;
}

//
const plugins = [
  gfm(),
  highlight(),
  // Add more plugins here
];

/**
 * withDefaults : 裡面的屬性設置默認值
 */
const props = withDefaults(defineProps<Props>(), {
  value: () => "",
});
</script>
