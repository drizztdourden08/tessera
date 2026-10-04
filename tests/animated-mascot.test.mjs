/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { AnimatedMascot, BRAND_FAMILY, BRAND_APPS, MASCOT_CLIPS } from '../src/brand';
import { motionKeyframes } from '../src/brand/AnimatedMascot/behavior/motion-keyframes';
import { motionPivots } from '../src/brand/AnimatedMascot/behavior/motion-pivots';

const motions = BRAND_APPS.flatMap((app) => {
  const motion = BRAND_FAMILY[app].mascot?.motion;
  return motion ? [[app, motion]] : [];
});

const isRest = (frame) => Object.keys(frame).every((key) => key === 'at' || key === 'ease');

describe('AnimatedMascot', () => {
  it('renders the still mascot on a stage, with a group for every moving part and no motion on the server', () => {
    const html = renderToString(h(AnimatedMascot, { brand: 'rotp', animation: 'jump', scale: 2 }));
    expect(html).toContain('viewBox="0 0 43 38"');
    for (const part of ['rig', 'shadow', 'podLeft', 'podRight', 'eyes']) expect(html).toContain(`data-motion-part="${part}"`);
    expect(html).toContain('animated-mascot');
    expect(html).not.toContain('style=');
  });
});

describe('mascot motion data', () => {
  it('lists the ten clips every mascot plays, in order', () => {
    expect(MASCOT_CLIPS).toEqual(['idle', 'move', 'jump', 'wave', 'scan', 'happy', 'alert', 'point', 'blink', 'link']);
    expect(motions.map(([app]) => app).sort()).toEqual(['archipelia', 'brock', 'rotp']);
  });

  it.each(motions)('%s: plays every clip in the shared list, in its order and no other, idle at rest', (_app, motion) => {
    expect(Object.keys(motion.animations)).toEqual([...MASCOT_CLIPS]);
    expect(motion.rest).toBe('idle');
  });

  it.each(motions)('%s: every track names a known part and runs from 0 to 1 in order', (_app, motion) => {
    const pivots = motionPivots(motion);
    for (const clip of Object.values(motion.animations)) {
      for (const track of clip.tracks) {
        expect(pivots.has(track.part)).toBe(true);
        const offsets = track.frames.map((f) => f.at);
        expect(offsets[0]).toBe(0);
        expect(offsets.at(-1)).toBe(1);
        expect([...offsets].sort((a, b) => a - b)).toEqual(offsets);
      }
    }
  });

  it.each(motions)('%s: an animation that plays once starts and ends at rest', (_app, motion) => {
    for (const clip of Object.values(motion.animations).filter((c) => !c.loop)) {
      for (const track of clip.tracks) {
        expect(isRest(track.frames[0])).toBe(true);
        expect(isRest(track.frames.at(-1))).toBe(true);
      }
    }
  });
});

describe('mascot effects', () => {
  it("draws Sentri's spark and Flint's spark and chip glow on the stage, hidden until a clip fades them in", () => {
    const sentri = renderToString(h(AnimatedMascot, { brand: 'rotp', scale: 2 }));
    const flint = renderToString(h(AnimatedMascot, { brand: 'brock', scale: 2 }));
    expect(sentri).toContain('data-motion-part="spark" opacity="0"');
    for (const part of ['spark', 'chipGlow']) expect(flint).toContain(`data-motion-part="${part}" opacity="0"`);
  });

  it("counts an effect's opacity from 0, so a frame without one keeps it hidden", () => {
    const [hidden, shown] = motionKeyframes([{ at: 0 }, { at: 1, opacity: 1 }], [0, 0], 0);
    expect(hidden.opacity).toBe(0);
    expect(shown.opacity).toBe(1);
  });
});

describe('motionKeyframes', () => {
  it('turns each frame around the pivot with the same list of functions, and counts opacity from the part\'s own, so every frame blends and adds up', () => {
    const frames = motionKeyframes([{ at: 0 }, { at: 1, x: 1, y: -2, rotate: 10, scaleY: 0.5, opacity: 0.4 }], [5, 15.5]);
    expect(frames[0]).toEqual({ offset: 0, easing: 'cubic-bezier(0.37, 0, 0.63, 1)', opacity: 0, transform: 'translate(5px, 15.5px) rotate(0deg) scale(1, 1) translate(-5px, -15.5px)' });
    expect(frames[1].transform).toBe('translate(6px, 13.5px) rotate(10deg) scale(1, 0.5) translate(-5px, -15.5px)');
    expect(frames[1].opacity).toBeCloseTo(-0.6);
  });
});
