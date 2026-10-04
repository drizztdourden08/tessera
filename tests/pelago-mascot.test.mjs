/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { AnimatedMascot, BRAND_FAMILY, Mascot, sceneMarkup } from '../src/brand';
import { motionPivots } from '../src/brand/AnimatedMascot/behavior/motion-pivots';
import { mascotFor } from '../src/brand/ChosenMascot/behavior/mascot-for';

const mascot = BRAND_FAMILY.archipelia.mascot;
const motion = mascot?.motion;
const SENTRI_CLIPS = Object.keys(BRAND_FAMILY.rotp.mascot?.motion?.animations ?? {});

describe('Pelago, the Archipelia mascot', () => {
  it('has Sentri\'s seven animations, idle at rest, and a drift that always loops', () => {
    expect(mascot?.name).toBe('Pelago');
    expect(Object.keys(motion?.animations ?? {})).toEqual(SENTRI_CLIPS);
    expect(motion?.rest).toBe('idle');
    expect(motion?.ambient?.loop).toBe(true);
  });

  it('drifts only the three spheres, each loop ending where it starts', () => {
    const pivots = motionPivots(motion);
    for (const track of motion?.ambient?.tracks ?? []) {
      expect(['sphereTop', 'sphereLeft', 'sphereRight']).toContain(track.part);
      expect(pivots.has(track.part)).toBe(true);
      expect(track.frames[0]).toEqual({ at: 0 });
      expect(track.frames.at(-1)).toEqual({ at: 1 });
    }
  });

  it('lags the eyes and hands a fraction of each clip behind the body', () => {
    let lagged = 0;
    for (const clip of Object.values(motion?.animations ?? {})) {
      for (const track of clip.tracks.filter((t) => t.lag)) {
        lagged += 1;
        expect(track.lag).toBeLessThan(clip.duration / 4);
      }
    }
    expect(lagged).toBeGreaterThan(0);
  });

  it('melts the spheres through one goo filter, with a moving group for every part and each glint riding its sphere', () => {
    const html = renderToString(h(AnimatedMascot, { brand: 'archipelia', scale: 2 }));
    expect(html.match(/<filter /g)).toHaveLength(1);
    expect(html).toContain('<feGaussianBlur');
    expect(html).toContain('<feColorMatrix');
    expect(html).not.toContain('shape-rendering');
    for (const part of ['rig', 'shadow', 'body', 'eyes', 'handLeft', 'handRight']) expect(html.match(new RegExp(`data-motion-part="${part}"`, 'g'))).toHaveLength(1);
    for (const part of ['sphereTop', 'sphereLeft', 'sphereRight']) expect(html.match(new RegExp(`data-motion-part="${part}"`, 'g'))).toHaveLength(2);
  });

  it('writes the goo filter into static markup too, for the icon files', () => {
    const markup = sceneMarkup(mascot.variants[0].compose(), { idPrefix: 'pelago' });
    expect(markup).toContain('<filter id="pelago-goo-1"');
    expect(markup).toContain('filter="url(#pelago-goo-1)"');
    expect(markup).not.toContain('crispEdges');
  });

  it('floats its eyes with look, up to its reach, and lifts its hands with podAngles or handAngles', () => {
    const at = (pose) => renderToString(h(Mascot, { brand: 'archipelia', pose }));
    expect(at({ look: [9, 0] })).toBe(at({ look: [2.5, 0] }));
    expect(at({ podAngles: { left: 30 } })).toBe(at({ handAngles: { left: 30 } }));
    expect(at({ handAngles: { left: 30 } })).not.toBe(at({}));
  });

  it('is the mascot ChosenMascot picks for Archipelia', () => {
    expect(mascotFor('auto', 'archipelia')).toBe('pelago');
    expect(mascotFor('auto', undefined, 'archipelia')).toBe('pelago');
    expect(mascotFor('pelago', 'rotp')).toBe('pelago');
  });
});
