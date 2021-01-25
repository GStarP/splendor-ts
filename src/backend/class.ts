import { Coin } from "@/backend/enum";
import cards from "./cards";

/**
 * 银行
 */
export class Bank {
  // 六种货币的剩余数量
  storage: number[];

  constructor(n = 7, nx = 5) {
    this.storage = [n, n, n, n, n, nx];
  }

  addCoins(coins: number[]) {
    for (let i = 0; i < coins.length; i++) {
      this.storage[i] += coins[i];
    }
  }

  subCoin(coins: number[]): boolean {
    let enough = true;
    for (let i = 0; i < coins.length; i++) {
      enough = enough && this.storage[i] >= coins[i];
      // 只有当库存大于等于 4 时才能拿取 2 枚同类货币
      enough = enough && (coins[i] < 2 || this.storage[i] >= 4);
      if (!enough) return enough;
    }
    for (let i = 0; i < coins.length; i++) {
      this.storage[i] -= coins[i];
    }
    return enough;
  }
}

/**
 * 卡牌
 */
export class Card {
  // 分数
  score: number;
  // 需要的货币
  price: number[];
  // 提供的货币
  value: Coin;

  constructor(score: number, price: number[], value: Coin) {
    this.score = score;
    this.price = price;
    this.value = value;
  }
}

/**
 * 卡组
 */
export class Deck {
  // 剩余卡牌
  cards: Card[][];
  // 同时显示数量
  showNum: number;

  constructor() {
    this.cards = this.initializeCards();
    this.showNum = 4;
  }

  initializeCards(): Card[][] {
    return cards;
  }

  getShowCards(): Card[][] {
    const showCards = [];
    for (const heap of this.cards) {
      if (heap.length <= this.showNum) {
        showCards.push(heap);
      } else {
        showCards.push(heap.slice(0, this.showNum));
      }
    }
    return showCards;
  }

  availableCard(i: number, j: number) {
    return this.cards.length > i && this.showNum > j;
  }

  removeCard(i: number, j: number) {
    if (this.availableCard(i, j)) {
      this.cards[i].splice(j, 1);
    }
  }
}

/**
 * 奖励卡
 */
export class Bonus {
  // 分数
  score: number;
  // 条件
  price: number[];

  constructor(score: number, price: number[]) {
    this.score = score;
    this.price = price;
  }
}

/**
 * 玩家
 */
export class Player {
  // 名称
  name: string;
  // 持有货币
  coins: number[];
  // 持有卡牌
  cards: Card[];
  // 扣押卡牌
  savedCards: Card[];
  // 持有奖励卡
  bonusList: Bonus[];

  constructor(name: string) {
    this.name = name;
    this.coins = [0, 0, 0, 0, 0, 0];
    this.cards = [];
    this.savedCards = [];
    this.bonusList = [];
  }

  getScore(): number {
    let score = 0;
    for (const card of this.cards) {
      score += card.score;
    }
    for (const bonus of this.bonusList) {
      score += bonus.score;
    }
    return score;
  }

  addCoins(coins: number[]) {
    for (let i = 0; i < coins.length; i++) {
      this.coins[i] += coins[i];
    }
  }

  subCoins(coins: number[]) {
    for (let i = 0; i < coins.length; i++) {
      this.coins[i] -= coins[i];
    }
  }
}

export class Game {
  // 玩家列表
  players: Player[];
  // 银行
  bank: Bank;
  // 卡组
  deck: Deck;
  // 奖励卡组
  bonusDeck: Bonus[];
  // 获胜分数
  winScore: number;

  // 正在行动的玩家
  active: number;

  constructor(players: Player[] = [], winScore = 20) {
    this.players = players;
    // 三人及以下时每种货币移除两枚
    if (this.players.length < 4) {
      this.bank = new Bank(5);
    } else {
      this.bank = new Bank();
    }
    this.deck = new Deck();
    // TODO 随机初始化奖励卡
    this.bonusDeck = [];
    this.winScore = winScore;

    this.active = 0;
  }

  nextTurn() {
    this.active = (this.active + 1) % this.players.length;
  }
}
