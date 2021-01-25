<template>
  <div class="card" :style="borderColorStyle">
    <div class="card__top">
      <div class="card__score">
        <span>{{ card.score }}</span>
        <v-icon color="#000">mdi-star-outline</v-icon>
      </div>
      <div class="card__value"><Mark type="card" :color="card.value" /></div>
    </div>
    <div class="card__middle"></div>
    <div class="card__bottom">
      <div class="card__price">
        <Mark
          v-for="(mark, i) of card.price"
          v-show="mark !== 0"
          :key="mark + 'x' + i"
          type="coin"
          :color="i"
          :num="mark"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Mark from "@/components/Mark.vue";
import { Card } from "@/backend/class";
import { CoinColor } from "@/backend/enum";

export default Vue.extend({
  components: {
    Mark
  },
  props: ["card"],
  computed: {
    borderColorStyle() {
      return {
        "border-color": CoinColor[(this.card as Card).value]
      };
    }
  }
});
</script>

<style lang="scss">
.card {
  display: flex;
  flex-direction: column;

  padding: 12px;
  border: 2px solid;
  margin-right: 8px;
  margin-bottom: 8px;

  &__top {
    height: 24px;
    display: flex;
    flex-direction: row;
    margin-bottom: 16px;
  }

  &__score {
    display: flex;
    flex-direction: row;
    align-items: center;
    span {
      font-weight: bold;
      margin-right: 2px;
    }
  }

  &__value {
    margin-left: auto;
  }

  &__bottom {
    width: 128px;
  }

  &__price {
    display: flex;
    flex-direction: row;

    .mark:not(:last-child) {
      margin-right: 2px;
    }
  }
}
</style>
