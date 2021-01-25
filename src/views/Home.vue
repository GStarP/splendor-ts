<template>
  <div class="home">
    <img class="poster" src="@/assets/splendor.png" />
    <div class="room">
      <div class="title">玩家</div>
      <div class="player" v-for="(p, i) of players" :key="'player-' + p.name">
        <div class="player__name">{{ p.name }}</div>
        <v-icon class="player__remove" color="#ff5252" @click="removePlayer(i)"
          >mdi-close</v-icon
        >
      </div>
      <v-text-field
        v-if="canAddPlayer"
        outlined
        v-model="newPlayerName"
        placeholder="请输入玩家名称"
      >
        <template slot="append">
          <v-icon class="add" color="#4caf50" @click="addNewPlayer"
            >mdi-check</v-icon
          >
        </template>
      </v-text-field>
      <v-btn
        class="start"
        depressed
        :dark="enoughPlayer"
        x-large
        width="100%"
        :disabled="!enoughPlayer"
        @click="startGame"
        >开始游戏</v-btn
      >
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Player } from "@/backend/class";
import { launchGame } from "@/interface/api";
export default Vue.extend({
  data() {
    return {
      players: [] as Player[],
      winScore: 20,
      newPlayerName: ""
    };
  },
  methods: {
    addNewPlayer() {
      if (this.newPlayerName !== "") {
        this.players.push(new Player(this.newPlayerName));
        this.newPlayerName = "";
      }
    },
    removePlayer(idx: number) {
      this.players.splice(idx, 1);
    },
    startGame() {
      launchGame(this.players, this.winScore);
      this.$router.push({ path: "/game" });
    }
  },
  computed: {
    enoughPlayer(): boolean {
      return this.players.length >= 2;
    },
    canAddPlayer(): boolean {
      return this.players.length < 4;
    }
  }
});
</script>

<style lang="scss">
.home {
  width: 100%;
  height: 100%;
  padding: 24px 0;

  display: flex;
  flex-direction: row;
  justify-content: center;
}
.poster {
  height: 100%;
}
.room {
  margin-left: 36px;

  width: 240px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .title {
    font-size: 28px;
    margin-bottom: 24px;
  }

  .player {
    $h: 56px;
    height: $h;
    width: 100%;
    padding: 0 12px;
    margin-bottom: 16px;

    border: 1px solid rgba(0, 0, 0, 0.38);
    border-radius: 4px;

    display: flex;
    flex-direction: row;

    &__name {
      flex: 1;
      line-height: $h;
      -webkit-user-select: none;
    }

    &__remove {
      margin-top: 16px;
      height: 24px;
    }
  }

  .v-text-field {
    width: 100%;
  }

  .add {
    &:hover {
      opacity: 0.7;
    }
  }

  .start {
    margin-top: auto;
  }
}
</style>
