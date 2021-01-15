import { Coin } from "@/types/enum"

/**
 * 银行
 */
export class Bank {

  // 六种货币的剩余数量
  storage: number[]

  constructor(n: number = 5, nx: number = 5) {
    this.storage = [n, n, n, n, n, nx];
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

  constructor(cards: Card[][]) {
    this.cards = cards;
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
