/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { AnimatedMascot, BRAND_FAMILY, BRAND_APPS, MASCOT_CLIP_GROUPS, MASCOT_CLIP_VARIANTS, MASCOT_CLIPS } from '../src/brand';
import { motionKeyframes } from '../src/brand/AnimatedMascot/behavior/motion-keyframes';
import { motionPivots } from '../src/brand/AnimatedMascot/behavior/motion-pivots';
import { stageScene } from '../src/brand/AnimatedMascot/behavior/stage-scene';

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
  it('lists the clips every mascot plays, in order, and puts each one in exactly one gallery group', () => {
    expect(MASCOT_CLIPS.slice(0, 10)).toEqual(['idle', 'move', 'jump', 'wave', 'scan', 'happy', 'alert', 'point', 'blink', 'link']);
    expect(MASCOT_CLIPS).toHaveLength(29);
    expect(MASCOT_CLIP_GROUPS.flatMap((g) => g.clips).sort()).toEqual([...MASCOT_CLIPS].sort());
    for (const [variant, original] of Object.entries(MASCOT_CLIP_VARIANTS)) {
      const group = MASCOT_CLIP_GROUPS.find((g) => g.clips.includes(variant))?.clips ?? [];
      expect(group.indexOf(variant) - group.indexOf(original)).toBe(1);
    }
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
  it("draws Sentri's spark and Flint's spark and chip glow on the stage for link, hidden until the clip fades them in", () => {
    const sentri = renderToString(h(AnimatedMascot, { brand: 'rotp', animation: 'link', scale: 2 }));
    const flint = renderToString(h(AnimatedMascot, { brand: 'brock', animation: 'link', scale: 2 }));
    expect(sentri).toContain('data-motion-part="spark" opacity="0"');
    for (const part of ['spark', 'chipGlow']) expect(flint).toContain(`data-motion-part="${part}" opacity="0"`);
  });

  it("shows a clip's still effects in the drawing itself, so reduced motion keeps them, and draws fixed effects on the stage outside the rig", () => {
    const motion = { ...BRAND_FAMILY.rotp.mascot.motion, effects: [{ id: 'mark', piece: { name: 'Mark', w: 1, h: 1, paths: [] }, at: [0, 0], fixed: true }] };
    const scene = stageScene(BRAND_FAMILY.rotp.mascot.variants[0].compose(), motion, { ...motion.animations.idle, still: ['mark'] });
    const [stage] = scene.nodes;
    expect(stage.children.at(-1)).toMatchObject({ part: 'mark' });
    expect(stage.children.at(-1).hidden).toBeUndefined();
    expect(stageScene(BRAND_FAMILY.rotp.mascot.variants[0].compose(), motion).nodes[0].children.at(-1).hidden).toBe(true);
  });

  it('draws only the effects the playing clip names, so a clip without symbols carries none', () => {
    const idle = renderToString(h(AnimatedMascot, { brand: 'rotp', animation: 'idle' }));
    const sleep = renderToString(h(AnimatedMascot, { brand: 'rotp', animation: 'sleep' }));
    expect(idle).not.toContain('data-motion-part="spark"');
    for (const part of ['closed', 'zSmall', 'zMid', 'zBig']) expect(sleep).toContain(`data-motion-part="${part}"`);
    expect(sleep).not.toContain('data-motion-part="heart"');
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
