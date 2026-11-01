/* @layer tooling-scripts @kind test */
import { describe, expect, it } from 'vitest';
import { BRAND_FAMILY } from '../src/brand';
import { motionKeyframes } from '../src/brand/MascotStage/behavior/motion-keyframes';
import { motionPivots } from '../src/brand/MascotStage/behavior/motion-pivots';

const mascot = BRAND_FAMILY.archipelia.mascot;
const { motion } = mascot;
const SENTRI_CLIPS = Object.keys(BRAND_FAMILY.rotp.mascot.motion.animations);
const ISLETS = ['isletA', 'isletB', 'isletC', 'isletD'];
const THREADS = ['spokeA', 'spokeB', 'spokeC', 'spokeD', 'ringAB', 'ringBC', 'ringCD', 'ringDA'];

const ends = (track) => [track.frames[0]?.at, track.frames.at(-1)?.at];

describe('K1 Pelago, the Archipelia island spirit', { tags: ['critical'] }, () => {
  it('has the same animations as Sentri, idle at rest, and a pebble drift that always loops', () => {
    expect(mascot.name).toBe('Pelago');
    expect(Object.keys(motion.animations)).toEqual(SENTRI_CLIPS);
    expect(motion.rest).toBe('idle');
    expect(motion.ambient.loop).toBe(true);
    for (const track of motion.ambient.tracks) expect(track.part).toMatch(/^pebble[ABC]$/);
  });

  it('runs every track of every clip from 0 to 1 in order, on a part that has a pivot', () => {
    const pivots = motionPivots(motion);
    for (const clip of [...Object.values(motion.animations), motion.ambient]) {
      for (const track of clip.tracks) {
        expect(pivots.has(track.part), `${clip.name}: ${track.part}`).toBe(true);
        expect(ends(track)).toEqual([0, 1]);
        expect(track.frames.every((f, i) => i === 0 || f.at >= track.frames[i - 1].at)).toBe(true);
      }
    }
  });

  it('moves every thread in each clip that moves an islet, so the threads stay joined', () => {
    for (const clip of Object.values(motion.animations)) {
      const parts = new Set(clip.tracks.map((t) => t.part));
      if (!ISLETS.some((part) => parts.has(part))) continue;
      for (const thread of THREADS) expect(parts.has(thread), `${clip.name}: ${thread}`).toBe(true);
    }
  });

  it('fades a part by the frame\'s opacity, so a track that adds to another still dims it', () => {
    const [rest, faded] = motionKeyframes([{ at: 0 }, { at: 1, opacity: 0.6 }], [0, 0]);
    expect(rest.opacity).toBe(0);
    expect(faded.opacity).toBeCloseTo(-0.4);
  });
});

describe('K1 Pelago states', { tags: ['critical'] }, () => {
  it('names only effects it draws, and loops every state that holds', () => {
    const ids = new Set(motion.effects.map((e) => e.id));
    for (const clip of Object.values(motion.animations)) for (const id of clip.still ?? []) expect(ids.has(id), `${clip.name}: ${id}`).toBe(true);
    for (const name of ['default', 'content', 'curious', 'focused', 'sleep', 'love', 'working', 'idea', 'confused', 'worried', 'low-power', 'resting']) expect(motion.animations[name].loop, name).toBe(true);
  });
});
