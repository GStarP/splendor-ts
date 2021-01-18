import { Player } from "@/backend/class";
import { game, createGame } from '@/backend/index';

export function launchGame(players: Player[], winScore: number) {
  createGame(players, winScore);
};
