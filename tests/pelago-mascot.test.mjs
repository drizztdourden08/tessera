/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { AnimatedMascot, BRAND_FAMILY, Mascot, sceneMarkup } from '../src/brand';
import { motionKeyframes } from '../src/brand/AnimatedMascot/behavior/motion-keyframes';
import { motionPivots } from '../src/brand/AnimatedMascot/behavior/motion-pivots';
import { mascotFor } from '../src/brand/ChosenMascot/behavior/mascot-for';

const mascot = BRAND_FAMILY.archipelia.mascot;
const { motion } = mascot;
const SENTRI_CLIPS = Object.keys(BRAND_FAMILY.rotp.mascot.motion.animations);
const ISLETS = ['isletA', 'isletB', 'isletC', 'isletD'];
const THREADS = ['spokeA', 'spokeB', 'spokeC', 'spokeD', 'ringAB', 'ringBC', 'ringCD', 'ringDA'];

const ends = (track) => [track.frames[0]?.at, track.frames.at(-1)?.at];

describe('Pelago, the Archipelia island spirit', () => {
  it('has Sentri\'s seven animations, then point, link and blink, idle at rest, and a pebble drift that always loops', () => {
    expect(mascot.name).toBe('Pelago');
    expect(Object.keys(motion.animations)).toEqual([...SENTRI_CLIPS, 'point', 'link', 'blink']);
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

  it('draws a moving group for every part, with no filter, as smooth vector art', () => {
    const html = renderToString(h(AnimatedMascot, { brand: 'archipelia', scale: 2 }));
    expect(html).not.toContain('<filter');
    expect(html).not.toContain('shape-rendering');
    for (const part of ['rig', 'shadow', 'island', 'glow', 'eyes', 'pebbleA', 'sparkA', ...ISLETS, ...THREADS]) {
      expect(html.match(new RegExp(`data-motion-part="${part}"`, 'g')), part).toHaveLength(1);
    }
  });

  it('writes the same island into static markup for the icon files', () => {
    const markup = sceneMarkup(mascot.variants[0].compose(), { idPrefix: 'pelago' });
    expect(markup).not.toContain('<filter');
    expect(markup).not.toContain('crispEdges');
    expect(markup).toContain('#7c4dff');
  });

  it('moves its eyes with look up to its reach, and swings its upper islets with handAngles or podAngles', () => {
    const at = (pose) => renderToString(h(Mascot, { brand: 'archipelia', pose }));
    expect(at({ look: [9, 0] })).toBe(at({ look: [1.6, 0] }));
    expect(at({ look: [1, 0] })).not.toBe(at({}));
    expect(at({ podAngles: { left: 30 } })).toBe(at({ handAngles: { left: 30 } }));
    expect(at({ handAngles: { right: -40 } })).not.toBe(at({}));
  });

  it('fades a part by the frame\'s opacity, so a track that adds to another still dims it', () => {
    const [rest, faded] = motionKeyframes([{ at: 0 }, { at: 1, opacity: 0.6 }], [0, 0]);
    expect(rest.opacity).toBe(0);
    expect(faded.opacity).toBeCloseTo(-0.4);
  });

  it('is the mascot ChosenMascot picks for Archipelia', () => {
    expect(mascotFor('auto', 'archipelia')).toBe('pelago');
    expect(mascotFor('auto', undefined, 'archipelia')).toBe('pelago');
    expect(mascotFor('pelago', 'rotp')).toBe('pelago');
  });
});

describe('Pelago in depth', () => {
  it('draws the islets, sparks and ring threads after the island, clipped out of its upper half, so they pass behind the top and in front of the bottom', () => {
    const { nodes } = mascot.variants[0].compose();
    const orbits = nodes.at(-1);
    expect(nodes.findIndex((n) => n.label === 'Island')).toBe(nodes.length - 2);
    expect(orbits.label).toBe('Orbits');
    expect(orbits.clip.length).toBeGreaterThan(20);
    expect(orbits.children.map((n) => n.label)).toEqual(['Thread AB', 'Thread BC', 'Thread CD', 'Thread DA', 'Orbit A', 'Orbit B', 'Orbit C', 'Orbit D']);
    expect(sceneMarkup(mascot.variants[0].compose(), { idPrefix: 'pelago' })).toContain('clip-path="url(#pelago-clip-1)"');
  });
});
