import { Game, Player } from "./class";

let game = new Game();

export { game };

export function createGame(players: Player[], winScore: number) {
  game = new Game(players, winScore);
};
