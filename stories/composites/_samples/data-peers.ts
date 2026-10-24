/* @layer stories @kind data */
import { buildSchema } from '../../../src/data';
import type { SchemaConfig } from '../../../src/data';

type PeerRow = {
  id: string;
  name: string;
  state: string;
  world: string;
  ping: number;
};

const WORLDS: readonly string[] = ['Hollow Knight', 'Celeste', 'Factorio', 'Terraria', 'Subnautica', 'Minecraft'];
const CONNECTED_COUNT = 4;
const KNOWN_COUNT = 900;

const peer = (slot: number, state: string): PeerRow => ({
  id: `peer-${slot}`,
  name: `Peer ${String(slot).padStart(4, '0')}`,
  state,
  world: WORLDS[slot % WORLDS.length] ?? '',
  ping: 20 + ((slot * 37) % 180),
});

const PEERS: readonly PeerRow[] = [
  ...Array.from({ length: CONNECTED_COUNT }, (_, at) => peer(at + 1, 'Connected')),
  ...Array.from({ length: KNOWN_COUNT }, (_, at) => peer(CONNECTED_COUNT + at + 1, 'Known')),
];

const PEER_CONFIG: SchemaConfig = {
  kinds: { name: 'string', state: 'string', world: 'string' },
  labels: { id: 'Slot', ping: 'Ping (ms)' },
  order: ['name', 'state', 'world', 'ping'],
  hidden: ['id'],
};

const PEER_SCHEMA = buildSchema(PEERS, PEER_CONFIG);

export { PEERS, PEER_SCHEMA };
export type { PeerRow };
