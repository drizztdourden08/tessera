/* @layer stories @kind hook */
import { useRef, useState } from 'react';
import { moveInList } from './move-in-list';
import type { Player } from './row-grid-players.type';

const usePlayers = (initial: readonly Player[], onEdit?: () => void) => {
  const [players, setList] = useState<readonly Player[]>(initial);
  const setPlayers = (next: (list: readonly Player[]) => readonly Player[]): void => {
    setList(next);
    onEdit?.();
  };
  const made = useRef(0);
  const fresh = (base: Partial<Player>): Player => {
    made.current += 1;
    return { name: '', game: 'alttp', preset: 'default', overrides: 0, ...base, id: `new-${String(made.current)}` };
  };
  return {
    players,
    update: (id: string, patch: Partial<Player>) => setPlayers((list) => list.map((player) => (player.id === id ? { ...player, ...patch } : player))),
    add: () => setPlayers((list) => [...list, fresh({ name: `Player ${String(list.length + 1)}` })]),
    remove: (id: string) => setPlayers((list) => list.filter((player) => player.id !== id)),
    move: (from: number, to: number) => setPlayers((list) => moveInList(list, from, to)),
    duplicate: (player: Player) => setPlayers((list) => {
      const at = list.indexOf(player);
      return [...list.slice(0, at + 1), fresh({ ...player, name: `${player.name} copy` }), ...list.slice(at + 1)];
    }),
  };
};

export { usePlayers };
