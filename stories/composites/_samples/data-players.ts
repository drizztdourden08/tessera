/* @layer stories @kind data */
import { buildSchema } from '../../../src/data';
import type { SchemaConfig } from '../../../src/data';

type PlayerStatus = 'playing' | 'idle' | 'goal' | 'offline';

type PlayerRow = {
  id: string;
  name: string;
  game: string;
  status: PlayerStatus;
  checked: number;
  total: number;
  hintPoints: number;
  deathLink: boolean;
  lastSeen: string;
  connection: { host: string; ping: number };
  tags: string[];
};

type PlayerSeed = [
  slot: number, name: string, game: string, status: PlayerStatus,
  progress: [checked: number, total: number], hintPoints: number, deathLink: boolean,
  lastSeen: string, ping: number, tags: string[],
];

const row = (seed: PlayerSeed): PlayerRow => {
  const [slot, name, game, status, [checked, total], hintPoints, deathLink, lastSeen, ping, tags] = seed;
  return {
    id: `slot-${slot}`,
    name,
    game,
    status,
    checked,
    total,
    hintPoints,
    deathLink,
    lastSeen,
    connection: { host: 'mw.harbor.local:38281', ping },
    tags,
  };
};

const SEEDS: readonly PlayerSeed[] = [
  [1, 'Wren', 'Hollow Knight', 'playing', [212, 386], 14, true, 'now', 38, ['host']],
  [2, 'Marlowe', 'Celeste', 'goal', [202, 202], 31, false, '12 min ago', 54, []],
  [3, 'Tavi', 'Stardew Valley', 'playing', [141, 309], 6, false, 'now', 71, ['async']],
  [4, 'Oskar', 'Factorio', 'idle', [88, 412], 2, false, '4 min ago', 120, ['streamer']],
  [5, 'Priya', 'Terraria', 'playing', [176, 280], 9, true, 'now', 45, []],
  [6, 'Juno', 'Timespinner', 'offline', [64, 198], 0, true, '2 h ago', 0, ['async']],
  [7, 'Bastien', 'Super Metroid', 'playing', [59, 100], 11, true, 'now', 29, ['streamer']],
  [8, 'Kaede', 'Ori and the Blind Forest', 'idle', [130, 256], 4, false, '9 min ago', 88, []],
  [9, 'Ines', 'Subnautica', 'playing', [97, 235], 7, false, 'now', 63, []],
  [10, 'Rook', 'Minecraft', 'goal', [105, 105], 22, false, '40 min ago', 47, ['async']],
  [11, 'Sol', 'Hollow Knight', 'playing', [190, 386], 12, true, 'now', 52, []],
  [12, 'Hollis', 'Stardew Valley', 'offline', [22, 309], 0, false, 'yesterday', 0, []],
  [13, 'Mireille', 'Celeste', 'playing', [150, 202], 8, false, '1 min ago', 34, ['streamer']],
  [14, 'Dax', 'Factorio', 'playing', [301, 412], 17, false, 'now', 96, ['host', 'async']],
];

const PLAYERS: readonly PlayerRow[] = SEEDS.map(row);

const PLAYER_CONFIG: SchemaConfig = {
  kinds: { name: 'string', lastSeen: 'string' },
  labels: { id: 'Slot', checked: 'Checks done', total: 'Checks total', deathLink: 'Death link' },
  order: ['id', 'name', 'game', 'status', 'checked', 'total'],
  hidden: ['connection'],
  groups: [
    { id: 'who', label: 'Player', paths: ['id', 'name', 'game', 'tags'] },
    { id: 'progress', label: 'Progress', paths: ['status', 'checked', 'total', 'hintPoints'] },
    { id: 'session', label: 'Session', paths: ['deathLink', 'lastSeen', 'connection'] },
  ],
};

const PLAYER_SCHEMA = buildSchema(PLAYERS, PLAYER_CONFIG);

const GAMES: readonly string[] = [...new Set(PLAYERS.map((player) => player.game))];

const STATUSES: readonly PlayerStatus[] = ['playing', 'idle', 'goal', 'offline'];

const playerName = (id: string): string | undefined =>
  PLAYERS.find((player) => player.id === id)?.name;

export { GAMES, PLAYERS, PLAYER_CONFIG, PLAYER_SCHEMA, STATUSES, playerName };
export type { PlayerRow, PlayerStatus };
