<template>
  <div class="deck">
    <div
      v-for="(cardHeap, i) of deck.getShowCards()"
      :key="'ch' + i"
      class="deck__row"
    >
      <div class="card-heap">
        {{ deck.cards[i].length - deck.getShowCards()[i].length }}
      </div>
      <Card
        v-for="(card, j) of cardHeap"
        :key="'ch' + i + 'card' + j"
        :card="card"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Card from "@/components/Card.vue";

export default Vue.extend({
  components: {
    Card
  },
  props: ["deck"]
});
</script>

<style lang="scss">
.deck {
  display: flex;
  flex-direction: column;

  &__row {
    display: flex;
    flex-direction: row;
  }
}
.card-heap {
  margin-right: 16px;
  margin-bottom: 8px;

  width: 64px;
  border: 2px solid;

  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 20px;
  font-weight: bold;
}
</style>
