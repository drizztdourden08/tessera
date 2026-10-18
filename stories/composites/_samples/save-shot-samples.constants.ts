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

const SHOTS = [HERO_SAMPLE_URLS.night, HERO_SAMPLE_URLS.dunes, HERO_SAMPLE_URLS.tile];

const MANY_SHOT_SAVES: readonly ShotSave[] = Array.from({ length: 10 }, (_, index) => ({
  id: `m${index + 1}`,
  name: `Slot ${index + 1}`,
  when: NOW - (index + 1) * 90 * MINUTE,
  shot: SHOTS[index % SHOTS.length] ?? HERO_SAMPLE_URLS.night,
}));

export { MANY_SHOT_SAVES, SHOT_SAVES };
