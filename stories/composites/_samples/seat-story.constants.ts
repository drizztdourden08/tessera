/* @layer stories @kind data */
import type { ActionItem } from '../../../src/composites';
import type { PlaygroundArgTypes } from '../../_template/controls/playground.type';
import type { SeatCardArgs } from './seat-story.type';

const SEAT_ARGS: SeatCardArgs = {
  state: 'filled',
  name: 'Planner',
  meta: 'Opus, 12 min',
  reason: 'Waiting for your answer',
  hint: 'Add an agent to fill it',
  label: 'Seat 3',
  lead: true,
  actions: true,
  clickable: true,
  selected: false,
};

const SEAT_ARG_TYPES: PlaygroundArgTypes<SeatCardArgs> = {
  state: { group: 'State', control: 'select', options: ['filled', 'attention', 'held', 'empty', 'add'], description: 'Taken, taken and waiting on you, held for a player, open, or the dashed add button.' },
  name: { group: 'Content', control: 'text', description: 'Who sits there. Filled and attention.' },
  meta: { group: 'Content', control: 'text', description: 'A quiet line under the name. Empty hides it.' },
  reason: { group: 'Content', control: 'text', description: 'Why the seat needs you. Attention only.' },
  hint: { group: 'Content', control: 'text', description: 'A short hint on a held or open seat.' },
  label: { group: 'Content', control: 'text', description: 'The seat name on a held or open seat, or what the add button adds.' },
  lead: { group: 'Content', control: 'boolean', description: 'An icon before the name.' },
  actions: { group: 'Behaviour', control: 'boolean', description: 'Two actions at the foot of a filled or held seat.' },
  clickable: { group: 'Behaviour', control: 'boolean', description: 'onSelect: the name becomes the one button of a filled seat.' },
  selected: { group: 'Behaviour', control: 'boolean', description: 'The seat whose editor is open. Filled and attention.' },
};

const noop = () => undefined;

const SEAT_ACTIONS: readonly ActionItem[] = [
  { id: 'rename', label: 'Rename', icon: 'pencil', onSelect: noop },
  { id: 'remove', label: 'Remove', icon: 'trash-2', kind: 'danger', onSelect: noop },
];

const SEAT_CODE = `import { SeatCard, SeatGrid } from '@drizztdourden08/tessera';

<SeatGrid label="Agents of the project">
  <SeatCard state="filled" name="Planner" meta="Opus, 12 min" selected onSelect={openAgent} />
  <SeatCard state="attention" name="Builder" reason="Waiting for your answer" onSelect={openAgent} />
  <SeatCard state="held" label="Seat 3" hint="Waiting for Sam" />
  <SeatCard state="empty" label="Seat 4" hint="Add an agent to fill it" />
  <SeatCard state="add" label="Add a seat" onSelect={addSeat} />
</SeatGrid>`;

export { noop, SEAT_ACTIONS, SEAT_ARG_TYPES, SEAT_ARGS, SEAT_CODE };
