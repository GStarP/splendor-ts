/**
 * 前后台接口
 */

import { Player } from "@/backend/class";
import {
  buyCard,
  buySavedCard,
  createGame,
  getCoin,
  saveCard
} from "@/backend/index";

export function launchGame(players: Player[], winScore: number) {
  createGame(players, winScore);
}

export function playerGetCoin(playerIdx: number, coins: number[]) {
  getCoin(playerIdx, coins);
}

export function playerBuyCard(playerIdx: number, cardX: number, cardY: number) {
  buyCard(playerIdx, cardX, cardY);
}

export function playerSaveCard(
  playerIdx: number,
  cardX: number,
  cardY: number
) {
  saveCard(playerIdx, cardX, cardY);
}

export function playerBuySavedCard(playerIdx: number, cardX: number) {
  buySavedCard(playerIdx, cardX);
}
