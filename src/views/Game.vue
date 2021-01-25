<template>
  <div class="game">
    GAME
  </div>
</template>

<script lang="ts">
import Vue from "vue";
// TODO 多人游戏中通过 socket 获取
import { game } from "@/backend/index";
export default Vue.extend({
  mounted() {
    console.log(game);
  }
});
</script>

<style></style>
