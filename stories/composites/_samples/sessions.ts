/* @layer stories @kind data */
import type { TreeNode } from '../../../src/composites';

type SessionStatus = 'running' | 'waiting' | 'finished';

type SampleSession = {
  id: string;
  name: string;
  host: string;
  server: string;
  players: number;
  preset: string;
  status: SessionStatus;
  started: string;
};

type SamplePlayer = {
  slot: number;
  name: string;
  game: string;
  checks: string;
};

const SESSIONS: readonly [SampleSession, ...SampleSession[]] = [
  { id: 'ses-0412', name: 'Friday async', host: 'mira', server: 'eu-west-2', players: 8, preset: 'Casual', status: 'running', started: '2 h ago' },
  { id: 'ses-0415', name: 'League week 3', host: 'tobias', server: 'us-east-1', players: 12, preset: 'Tournament', status: 'waiting', started: 'Not started' },
  { id: 'ses-0398', name: 'Practice room', host: 'mira', server: 'local', players: 2, preset: 'Short', status: 'finished', started: 'Yesterday' },
  { id: 'ses-0420', name: 'Community night', host: 'ade', server: 'eu-west-2', players: 24, preset: 'Casual', status: 'running', started: '35 min ago' },
];

const PLAYERS: readonly SamplePlayer[] = [
  { slot: 1, name: 'mira', game: 'Puzzle platformer', checks: '112 / 180' },
  { slot: 2, name: 'tobias', game: 'Space shooter', checks: '64 / 150' },
  { slot: 3, name: 'ade', game: 'Farming sim', checks: '201 / 240' },
  { slot: 4, name: 'kenji', game: 'Metroidvania', checks: '38 / 212' },
  { slot: 5, name: 'lou', game: 'Rhythm game', checks: '90 / 90' },
];

const ITEM_LOG: readonly string[] = [
  'mira sent Double jump to kenji',
  'ade found Hover boots for mira',
  'tobias sent Shield upgrade to lou',
  'lou completed their goal',
  'kenji sent Seed bag to ade',
  'mira found Map fragment for tobias',
];

const STATUS_LABEL: Record<SessionStatus, string> = {
  running: 'Running',
  waiting: 'Waiting for players',
  finished: 'Finished',
};

const leaf = (key: string, label: string, players: SamplePlayer[]): TreeNode<SamplePlayer> => ({
  key, label, meta: `${players.length} players`, children: [], items: players,
});

const SERVER_TREE: TreeNode<SamplePlayer> = {
  key: 'root',
  label: 'All servers',
  items: [],
  children: [
    {
      key: 'eu-west-2',
      label: 'eu-west-2',
      meta: '2 sessions',
      items: [],
      children: [
        leaf('eu-west-2/friday-async', 'Friday async', PLAYERS.slice(0, 3)),
        leaf('eu-west-2/community-night', 'Community night', PLAYERS.slice(2)),
      ],
    },
    {
      key: 'us-east-1',
      label: 'us-east-1',
      meta: '1 session',
      items: [],
      children: [leaf('us-east-1/league-week-3', 'League week 3', PLAYERS.slice(1, 4))],
    },
  ],
};

const FLAT_TREE: TreeNode<SamplePlayer> = { key: 'root', label: 'Players', children: [], items: [...PLAYERS] };
const EMPTY_TREE: TreeNode<SamplePlayer> = { key: 'root', label: 'Players', children: [], items: [] };

export { EMPTY_TREE, FLAT_TREE, ITEM_LOG, PLAYERS, SERVER_TREE, SESSIONS, STATUS_LABEL };
export type { SamplePlayer, SampleSession };
