<template>
  <div class="home">
    HOME
  </div>
</template>

<script lang="ts">
import { Player } from '@/backend/class';
import { launchGame } from '@/interface/api';
export default {
  data() {
    return {
      players: [] as Player[],
      winScore: 20
    }
  },
  methods: {
    startGame() {
      launchGame(this.players, this.winScore);
    }
  },
  computed: {
    enoughPlayer() {
      return this.$data.players.length >= 2;
    }
  }
};
</script>
