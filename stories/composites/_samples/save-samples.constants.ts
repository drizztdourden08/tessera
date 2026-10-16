/* @layer stories @kind data */
import type { SampleSave } from './save-samples.type';

const SAMPLE_SAVES: readonly SampleSave[] = [
  { id: 's1', name: 'Before the palace', when: 'Today, 21:40', minutesAgo: 5 },
  { id: 's2', name: 'Hookshot in hand', when: 'Today, 19:05', minutesAgo: 160 },
  { id: 's3', name: 'Dark World start', when: 'Yesterday, 22:18', minutesAgo: 1400 },
  { id: 's4', name: 'Ice Palace, second key', when: 'Monday, 20:51', minutesAgo: 4400 },
];

const UNDO_FOR = 8000;

export { SAMPLE_SAVES, UNDO_FOR };
