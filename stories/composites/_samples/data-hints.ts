/* @layer stories @kind data */
import { buildSchema } from '../../../src/data';
import type { SchemaConfig } from '../../../src/data';
import { PLAYERS, playerName } from './data-players';

type HintPriority = 'progression' | 'useful' | 'filler';

type HintRow = {
  id: string;
  finder: string;
  receiver: string;
  item: string;
  location: string;
  found: boolean;
  priority: HintPriority;
  entrance?: string;
};

const HINTS: readonly HintRow[] = [
  { id: 'hint-1', finder: 'slot-3', receiver: 'slot-1', item: 'Mantis Claw', location: 'Pierre\'s General Store', found: false, priority: 'progression' },
  { id: 'hint-2', finder: 'slot-7', receiver: 'slot-5', item: 'Grappling Hook', location: 'Wrecked Ship Energy Tank', found: true, priority: 'progression' },
  { id: 'hint-3', finder: 'slot-1', receiver: 'slot-9', item: 'Seaglide Fragment', location: 'Crystal Peak Chest', found: false, priority: 'useful', entrance: 'Crystal Peak' },
  { id: 'hint-4', finder: 'slot-14', receiver: 'slot-13', item: 'Strawberry', location: 'Automation Research', found: false, priority: 'filler' },
  { id: 'hint-5', finder: 'slot-5', receiver: 'slot-8', item: 'Bash', location: 'Dungeon Chest 4', found: true, priority: 'progression', entrance: 'Underground' },
  { id: 'hint-6', finder: 'slot-11', receiver: 'slot-4', item: 'Oil Processing', location: 'Resting Grounds Grub', found: false, priority: 'progression' },
  { id: 'hint-7', finder: 'slot-9', receiver: 'slot-6', item: 'Timespinner Wheel', location: 'Aurora Databox', found: false, priority: 'useful' },
  { id: 'hint-8', finder: 'slot-2', receiver: 'slot-11', item: 'Monarch Wings', location: 'Farewell Golden', found: true, priority: 'progression' },
  { id: 'hint-9', finder: 'slot-13', receiver: 'slot-3', item: 'Iridium Pickaxe', location: 'Summit B-Side', found: false, priority: 'useful' },
  { id: 'hint-10', finder: 'slot-8', receiver: 'slot-7', item: 'Speed Booster', location: 'Ginso Tree Core', found: false, priority: 'progression', entrance: 'Ginso Tree' },
];

const HINT_CONFIG: SchemaConfig = {
  kinds: { item: 'string', location: 'string' },
  labels: { id: 'Hint' },
  order: ['id', 'item', 'receiver', 'finder', 'location'],
};

const HINT_SCHEMA = buildSchema(HINTS, HINT_CONFIG);

const resolveSlotDefault = (id: string): string | undefined => playerName(id);

const resolveSlotField = (targetKind: string, id: string, displayField: string): string | undefined => {
  if (targetKind !== 'slot') return undefined;
  const player = PLAYERS.find((entry) => entry.id === id);
  const value = player ? (player as Record<string, unknown>)[displayField] : undefined;
  return value === undefined ? undefined : String(value);
};

const SLOT_TARGET_FIELDS = [
  { path: 'name', label: 'Name' },
  { path: 'game', label: 'Game' },
  { path: 'status', label: 'Status' },
];

const resolveTargetFields = (targetKind: string) => (targetKind === 'slot' ? SLOT_TARGET_FIELDS : []);

export { HINTS, HINT_CONFIG, HINT_SCHEMA, resolveSlotDefault, resolveSlotField, resolveTargetFields };
export type { HintRow };
