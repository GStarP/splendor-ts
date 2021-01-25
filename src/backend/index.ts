/**
 * 后台逻辑
 * 数据正确性在此保证
 */

import { Card, Game, Player } from "./class";
import { Coin } from "./enum";

let game = new Game();

export { game };

export function createGame(players: Player[], winScore: number) {
  game = new Game(players, winScore);
}

// 检测玩家能否购买卡片
function canBuyCard(player: Player, card: Card): boolean {
  let can = true;
  let diff = 0;
  for (let i = 0; i < player.coins.length; i++) {
    can = can && player.coins[i] >= card.price[i];
    if (!can) {
      diff +=
        player.coins[i] < card.price[i] ? card.price[i] - player.coins[i] : 0;
    }
  }
  if (!can && player.coins[Coin.X] >= diff) {
    return true;
  }
  return can;
}

// 检测玩家获得新卡片后能否获取奖励卡
function checkBonus(playerIdx: number) {
  let can = true;
  const player = game.players[playerIdx];
  const cardValues = [0, 0, 0, 0, 0];
  for (const card of player.cards) {
    cardValues[card.value]++;
  }
  for (let i = 0; i < game.bonusDeck.length; i++) {
    for (let j = 0; j < cardValues.length; j++) {
      can = can && cardValues[j] >= game.bonusDeck[i].price[j];
    }
    if (can) {
      const bonus = game.bonusDeck.splice(i, 1)[0];
      player.bonusList.push(bonus);
    }
  }
}

/**
 * 四种行动
 */

export function getCoin(playerIdx: number, coins: number[]) {
  if (game.bank.subCoin(coins)) {
    game.players[playerIdx].addCoins(coins);
    // 拿取货币成功, 行动结束
    game.nextTurn();
  }
}

export function buyCard(playerIdx: number, cardX: number, cardY: number) {
  if (game.deck.availableCard(cardX, cardY)) {
    const card = game.deck.cards[cardX][cardY];
    if (canBuyCard(game.players[playerIdx], card)) {
      game.players[playerIdx].subCoins(card.price);
      game.deck.removeCard(cardX, cardY);
      game.players[playerIdx].cards.push(card);
      game.bank.addCoins(card.price);
      checkBonus(playerIdx);
      // 购买卡片成功, 行动结束
      game.nextTurn();
    }
  }
}

export function saveCard(playerIdx: number, cardX: number, cardY: number) {
  if (game.deck.availableCard(cardX, cardY)) {
    const card = game.deck.cards[cardX][cardY];
    // 最多扣押三张卡牌
    if (game.players[playerIdx].savedCards.length < 3) {
      game.deck.removeCard(cardX, cardY);
      game.players[playerIdx].savedCards.push(card);
      // 拿取万能币
      const xcoin = [];
      for (let i = 0; i < card.price.length; i++) {
        xcoin.push(0);
      }
      xcoin[xcoin.length - 1] = 1;
      getCoin(playerIdx, xcoin);
      // 扣押卡牌成功, 行动结束
      game.nextTurn();
    }
  }
}

export function buySavedCard(playerIdx: number, cardX: number) {
  if (game.players[playerIdx].savedCards.length > cardX) {
    const card = game.players[playerIdx].savedCards[cardX];
    if (canBuyCard(game.players[playerIdx], card)) {
      game.players[playerIdx].subCoins(card.price);
      game.players[playerIdx].savedCards.splice(cardX, 1);
      game.players[playerIdx].cards.push(card);
      game.bank.addCoins(card.price);
      checkBonus(playerIdx);
      // 购买扣押卡牌成功, 行动结束
      game.nextTurn();
    }
  }
}
