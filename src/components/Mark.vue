<template>
  <div class="mark" :class="'mark__' + type" :style="colorStyle">{{ num }}</div>
</template>

<script lang="ts">
import Vue from "vue";
import { CoinColor } from "@/backend/enum";

export default Vue.extend({
  props: ["type", "color", "num"],
  computed: {
    colorStyle() {
      return {
        "background-color": CoinColor[this.color as number]
      };
    }
  }
});
</script>

<style lang="scss">
.mark {
  $size: 24px;
  width: $size;
  height: $size;
  line-height: $size;

  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 300;
  color: #fff;

  &__coin {
    border-radius: 50%;
  }

  &__card {
    width: 20px;
  }
}
</style>
