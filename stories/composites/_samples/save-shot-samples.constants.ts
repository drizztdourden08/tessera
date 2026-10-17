/* @layer stories @kind data */
import { HERO_SAMPLE_URLS } from './hero-sample-urls.constants';
import type { ShotSave } from './save-samples.type';

const MINUTE = 60_000;

const NOW = Date.now();

const SHOT_SAVES: readonly ShotSave[] = [
  { id: 'q1', name: 'Before the palace', when: NOW - 5 * MINUTE, shot: HERO_SAMPLE_URLS.night },
  { id: 'q2', name: 'Hookshot in hand', when: NOW - 160 * MINUTE, shot: HERO_SAMPLE_URLS.dunes },
  { id: 'q3', name: 'Dark World start, with the moon pearl and a full set of bombs', when: NOW - 1400 * MINUTE, shot: HERO_SAMPLE_URLS.tile },
];

export { SHOT_SAVES };
