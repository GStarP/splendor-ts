<template>
  <div class="game">
    <div class="game__row">
      <div class="player-4"></div>
    </div>
    <div class="game__row">
      <div class="player-2"></div>
      <Deck :deck="gameInfo.deck" />
      <div class="player-3"></div>
    </div>
    <div class="game__row">
      <div class="player"></div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { game } from "@/backend/index";
import Deck from "@/components/Deck.vue";
export default Vue.extend({
  components: { Deck },
  computed: {
    gameInfo() {
      return game;
    }
  },
  mounted() {
    console.log(this.gameInfo);
  }
});
</script>

<style lang="scss">
.game {
  height: 100%;
  display: flex;
  flex-direction: column;

  &__row {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }
}
</style>
