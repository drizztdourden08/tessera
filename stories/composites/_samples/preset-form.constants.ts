/* @layer stories @kind data */
import type { SegmentTextOption, SelectOption } from '../../../src/primitives';
import type { PresetGoal } from './preset-samples.type';

const GAME_OPTIONS: SelectOption[] = [
  { value: 'A Link to the Past', label: 'A Link to the Past' },
  { value: 'Ocarina of Time', label: 'Ocarina of Time' },
  { value: 'Timespinner', label: 'Timespinner' },
];

const GOAL_OPTIONS: SegmentTextOption<PresetGoal>[] = [
  { value: 'ganon', label: 'Defeat Ganon' },
  { value: 'triforce', label: 'Triforce hunt' },
  { value: 'pedestal', label: 'Pedestal' },
];

const POOL_OPTIONS: SelectOption[] = [
  { value: 'normal', label: 'Normal', description: 'Every item, with spare hearts and upgrades.' },
  { value: 'hard', label: 'Hard', description: 'Fewer upgrades, no spare bottles.' },
  { value: 'expert', label: 'Expert', description: 'Only what the run needs.' },
];

export { GAME_OPTIONS, GOAL_OPTIONS, POOL_OPTIONS };
