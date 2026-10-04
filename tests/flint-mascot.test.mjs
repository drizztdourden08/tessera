/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { AnimatedMascot, BRAND_FAMILY, Mascot, sceneMarkup } from '../src/brand';
import { mascotFor } from '../src/brand/ChosenMascot/behavior/mascot-for';
import { composeFlint } from '../src/brand/flint/compose-flint';

const flint = BRAND_FAMILY.brock.mascot;
const sentri = BRAND_FAMILY.rotp.mascot;

describe('Flint, the Brock mascot', () => {
  it('is the Brock brand\'s mascot, with one variant', () => {
    expect(flint?.name).toBe('Flint');
    expect(flint?.variants.map((v) => v.id)).toEqual(['flint']);
  });

  it('has every animation Sentri has, plus point and blink, idle at rest', () => {
    const names = Object.keys(flint?.motion?.animations ?? {});
    for (const name of Object.keys(sentri?.motion?.animations ?? {})) expect(names).toContain(name);
    expect(names).toEqual(expect.arrayContaining(['point', 'blink']));
    expect(flint?.motion?.rest).toBe('idle');
  });

  it('draws smooth facets, while Sentri keeps its crisp pixels', () => {
    expect(renderToString(h(Mascot, { brand: 'brock', scale: 2 }))).not.toContain('shape-rendering');
    expect(renderToString(h(Mascot, { brand: 'rotp', scale: 2 }))).toContain('shape-rendering="crispEdges"');
    expect(sceneMarkup(composeFlint())).not.toContain('crispEdges');
    expect(sceneMarkup(sentri.variants[0].compose())).toContain('shape-rendering="crispEdges"');
  });

  it('renders on a stage with a group for every moving part', () => {
    const html = renderToString(h(AnimatedMascot, { brand: 'brock', animation: 'wave', scale: 2 }));
    expect(html).toContain('viewBox="0 0 48.5 43.5"');
    for (const part of ['rig', 'shadow', 'handLeft', 'handRight', 'eyes', 'mouth']) expect(html).toContain(`data-motion-part="${part}"`);
    expect(html).not.toContain('style=');
  });

  it('sits on its flat base: the rig pivot and the shadow centre are on the bottom of the body', () => {
    const motion = flint?.motion;
    const scene = composeFlint();
    const { shadow } = motion;
    expect(motion.pivot[1]).toBe(27.75);
    expect(shadow.at[1] + shadow.piece.h / 2).toBe(motion.pivot[1]);
    expect(scene.height).toBe(28.5);
  });

  it('turns its hands and moves its eyes from a pose, the smile following the eyes by half', () => {
    const scene = composeFlint({ look: [5, -3], handAngles: { left: 40, right: -90 } });
    const byLabel = new Map(scene.nodes.map((n) => [n.label, n]));
    expect(byLabel.get('Left hand').angle).toBe(40);
    expect(byLabel.get('Right hand').angle).toBe(-90);
    const eyes = byLabel.get('Eyes').children;
    expect(eyes[0].left).toBeCloseTo(15.35 + 2);
    expect(eyes[0].top).toBeCloseTo(10.15 - 1);
    expect(byLabel.get('Mouth').left).toBeCloseTo(18.05 + 1);
  });

  it('is picked by name, by the brock brand and by the brock palette', () => {
    expect(mascotFor('flint')).toBe('flint');
    expect(mascotFor('auto', 'brock')).toBe('flint');
    expect(mascotFor('auto', undefined, 'brock')).toBe('flint');
    expect(mascotFor('auto', undefined, 'rotp')).toBe('sentri');
  });
});
