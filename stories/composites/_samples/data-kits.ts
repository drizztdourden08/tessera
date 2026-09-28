/* @layer stories @kind data */
import { buildSchema } from '../../../src/data';
import type { FieldDescriptor, FieldKind } from '../../../src/data';
import { PLAYERS } from './data-players';

const KIT_ROWS = [
  {
    note: 'Waiting on the Mantis Claw before heading into Deepnest',
    ping: 42,
    deathLink: true,
    status: 'playing',
    slot: 'slot-4',
    tags: ['async', 'streamer'],
    connection: { host: 'mw.harbor.local', port: 38281 },
    reward: { item: 'Mothwing Cloak' },
    extra: null,
  },
  {
    note: 'Goal reached, staying connected for hints',
    ping: 88,
    deathLink: false,
    status: 'idle',
    slot: 'slot-2',
    tags: [],
    connection: { host: 'mw.harbor.local', port: 38282 },
    reward: { currency: 'Geo', amount: 300 },
    extra: null,
  },
];

const KIT_FIELDS = buildSchema(KIT_ROWS, { kinds: { note: 'string' } });

const sampleFieldFor = (kind: FieldKind): FieldDescriptor | undefined =>
  KIT_FIELDS.find((field) => field.kind === kind);

const KIT_START: Record<string, unknown> = { ...KIT_ROWS[0] };

const SLOT_CHOICES = PLAYERS.map((player) => ({ value: player.id, label: player.name, description: player.id }));

const resolveKitOptions = (targetKind: string) => (targetKind === 'slot' ? SLOT_CHOICES : []);

export { KIT_START, resolveKitOptions, sampleFieldFor };
