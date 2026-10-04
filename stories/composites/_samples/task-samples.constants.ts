/* @layer stories @kind data */
import type { LogKindDef, LogRow } from '../../../src/composites';
import type { StepperStep } from '../../../src/primitives';

const RUN_STEPS: readonly StepperStep[] = [
  { id: 'prepare', label: 'Prepare the players' },
  { id: 'generate', label: 'Generate the world' },
  { id: 'host', label: 'Start the server' },
  { id: 'connect', label: 'Open the room' },
];

const RUN_LOG_KINDS: readonly LogKindDef[] = [
  { id: 'info', label: 'Info' },
  { id: 'error', label: 'Error', tone: 'danger', toneMessage: true },
];

const row = (index: number, kind: string, message: string): LogRow => ({
  id: String(index), gutter: `14:02:${String(10 + index).padStart(2, '0')}`, tag: 'gen', kind, message,
});

const RUN_LOG: readonly LogRow[] = [
  row(1, 'info', 'Archipelago 0.6.2, seed 48213907751426690131'),
  row(2, 'info', 'Loaded 6 player files'),
  row(3, 'info', 'Creating items for Link (A Link to the Past)'),
  row(4, 'info', 'Creating items for Samus (Super Metroid)'),
  row(5, 'info', 'Filling 1,204 locations'),
  row(6, 'info', 'Placing progression items'),
  row(7, 'error', 'Fill failed: no reachable location for Morph Ball in world 2'),
];

const RUN_LINE = 'Generating: placing progression items (612 of 1,204)';

const RUN_ERROR = 'The world could not be generated: no reachable location for Morph Ball in world 2. Check the Super Metroid options.';

export { RUN_ERROR, RUN_LINE, RUN_LOG, RUN_LOG_KINDS, RUN_STEPS };
