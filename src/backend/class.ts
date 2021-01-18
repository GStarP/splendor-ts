import { Coin } from "@/backend/enum"

/**
 * 银行
 */
export class Bank {

  // 六种货币的剩余数量
  storage: number[]

  constructor(n: number = 7, nx: number = 5) {
    this.storage = [n, n, n, n, n, nx];
  }

  addCoins(coins: number[]) {
    for (let i = 0; i < coins.length; i++) {
      this.storage[i] += coins[i];
    }
  }

  subCoin(coins: number[]) {
    let enough = true;
    for (let i = 0; i < coins.length; i++) {
      enough &&= this.storage[i] >= coins[i];
    }
    for (let i = 0; i < coins.length; i++) {
      this.storage[i] -= coins[i];
    }
  }

}

/**
 * 卡牌
 */
export class Card {

  // 分数
  score: number
  // 需要的货币
  price: number[]
  // 提供的货币
  value: Coin
  // 卡牌名称
  name: string

  constructor(score: number, price: number[], value: Coin, name: string) {
    this.score = score;
    this.price = price;
    this.value = value;
    this.name = name;
  }

}

/**
 * 卡组
 */
export class Deck {

  // 剩余卡牌
  cards: Card[][]
  // 同时显示数量
  showNum: number

  constructor() {
    // TODO 读取卡组信息
    this.cards = [];
    this.showNum = 4;
  }

  getShowCards(): Card[][] {
    const showCards = []
    for (const heap of this.cards) {
      if (heap.length <= this.showNum) {
        showCards.push(heap);
      } else {
        showCards.push(heap.slice(0, this.showNum))
      }
    }
    return showCards;
  }

  removeCard(i: number, j: number) {
    if (this.cards.length > i && this.cards[i].length > j) {
      this.cards[i].splice(j, 1);
    }
  }

}

/**
 * 玩家
 */
export class Player {

  // 名称
  name: string
  // 持有货币
  coins: number[]
  // 持有卡牌
  cards: Card[]
  // 扣押卡牌
  savedCards: Card[]

  constructor(name: string) {
    this.name = name;
    this.coins = [0, 0, 0, 0, 0, 0];
    this.cards = [];
    this.savedCards = [];
  }

  getScore(): number {
    let score = 0;
    for (const card of this.cards) {
      score += card.score
    }
    return score
  }

}

export class Game {

  // 玩家列表
  players: Player[]
  // 银行
  bank: Bank
  // 卡组
  deck: Deck
  // 获胜分数
  winScore: number

  // 正在行动的玩家
  active: number

  constructor(players: Player[] = [], winScore: number = 20) {
    this.players = players;
    // 四人及以下时每种货币移除两枚
    if (this.players.length <= 4) {
      this.bank = new Bank(5);
    } else {
      this.bank = new Bank();
    }
    this.deck = new Deck();
    this.winScore = winScore;

    this.active = 0;
  }

  nextTurn() {
    this.active = (this.active + 1) % this.players.length;
  }

}
