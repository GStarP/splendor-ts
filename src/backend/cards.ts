import { Card } from "./class";
import { Coin } from "./enum";

const data = [
  [
    [1, 4, 0, 0, 0, 0, Coin.Y],
    [1, 0, 4, 0, 0, 0, Coin.R],
    [1, 0, 0, 4, 0, 0, Coin.B],
    [1, 0, 0, 0, 4, 0, Coin.O],
    [1, 0, 0, 0, 0, 4, Coin.P]
  ],
  [
    [2, 5, 0, 0, 0, 0, Coin.O],
    [2, 0, 5, 0, 0, 0, Coin.Y],
    [2, 0, 0, 5, 0, 0, Coin.P],
    [2, 0, 0, 0, 5, 0, Coin.B],
    [2, 0, 0, 0, 0, 5, Coin.R]
  ],
  [
    [4, 7, 0, 0, 0, 0, Coin.B],
    [4, 0, 7, 0, 0, 0, Coin.P],
    [4, 0, 0, 7, 0, 0, Coin.O],
    [4, 0, 0, 0, 7, 0, Coin.R],
    [4, 0, 0, 0, 0, 7, Coin.Y]
  ]
];

const cards = [] as Card[][];

for (let i = 0; i < data.length; i++) {
  const arr = [] as Card[];
  for (let j = 0; j < data[i].length; j++) {
    const d = data[i][j];
    // TODO 会报错 Card 不是 constructor
    // arr.push(new Card(d[0], [d[1], d[2], d[3], d[4], d[5]], d[6]));
    arr.push({
      score: d[0],
      price: [d[1], d[2], d[3], d[4], d[5]],
      value: d[6]
    });
  }
  cards.push(arr);
}

export default cards;
