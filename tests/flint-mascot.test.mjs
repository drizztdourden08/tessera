/* @layer tooling-scripts @kind test */
import { describe, expect, it } from 'vitest';
import { BRAND_FAMILY } from '../src/brand';
import { mascotBrandOf } from '../src/brand/AnimatedMascot/behavior/mascot-brand-of';
import { composeFlint } from '../src/brand/flint/compose-flint';

const flint = BRAND_FAMILY.brock.mascot;

describe('K1 Flint, the Brock mascot', { tags: ['critical'] }, () => {
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

  it('is the mascot brand="auto" picks inside the brock palette', () => {
    expect(mascotBrandOf('brock')).toBe('brock');
    expect(mascotBrandOf('rotp')).toBe('rotp');
  });
});
