/* @layer tooling-scripts @kind test */
import { describe, expect, it } from 'vitest';
import { travelFor } from '../src/brand/MascotStage/behavior/travel-for';
import { MAX_STEP_S } from '../src/brand/MascotStage/MascotStage.constants';
import { holdSpot } from '../src/composites/GuidedTour/behavior/hold-spot';
import { settleLoop } from '../src/composites/GuidedTour/behavior/settle-loop';
import { walkSpeed } from '../src/composites/GuidedTour/behavior/walk-speed';
import { MASCOT_STAND_SLACK, MASCOT_WALK_S, SETTLE_FRAMES, SETTLE_MS } from '../src/composites/GuidedTour/GuidedTour.constants';

const SLOW_FRAME_MS = 100;

const slowView = () => {
  const frames = [];
  let time = 0;
  const view = {
    requestAnimationFrame: (callback) => frames.push(callback),
    cancelAnimationFrame: () => undefined,
  };
  const step = () => {
    time += SLOW_FRAME_MS;
    frames.splice(0).forEach((frame) => frame(time));
  };
  return { view, frames, step, now: () => time };
};

const walker = (x, target, speed) => ({ x, velocity: 0, reduced: false, bounds: { min: 0, max: 4000 }, travel: { target, speed, walking: true } });

const walkTime = (from, to, frameS) => {
  const actor = walker(from, to, walkSpeed(from, to));
  let spent = 0;
  while (spent < 10) {
    spent += frameS;
    if (travelFor(actor, Math.min(MAX_STEP_S, frameS))) return spent;
  }
  return spent;
};

describe('the tour settles at 10 frames a second', () => {
  it('stops measuring a target that never holds still within the settle time, even when the page keeps kicking it', () => {
    const { view, frames, step, now } = slowView();
    let flip = 0;
    const loop = settleLoop(view, () => {
      flip += 1;
      return false;
    });
    loop.kick();
    while (frames.length > 0 && now() < SETTLE_MS * 4) {
      step();
      loop.kick();
    }
    expect(now()).toBeLessThanOrEqual(SETTLE_MS + SLOW_FRAME_MS);
    expect(flip).toBeLessThanOrEqual(SETTLE_MS / SLOW_FRAME_MS + 1);
    loop.follow();
    expect(frames).toHaveLength(1);
  });

  it('stops once the hole is calm for its frames', () => {
    const { view, frames, step } = slowView();
    const loop = settleLoop(view, () => true);
    loop.kick();
    let ticks = 0;
    while (frames.length > 0) {
      step();
      ticks += 1;
    }
    expect(ticks).toBe(SETTLE_FRAMES);
  });

  it('measures again on a kick after it settled', () => {
    const { view, frames, step } = slowView();
    const loop = settleLoop(view, () => true);
    loop.kick();
    while (frames.length > 0) step();
    loop.kick();
    expect(frames).toHaveLength(1);
  });
});

describe('the mascot walk', () => {
  it('ends in the same wall time at 10 frames a second as at 60', () => {
    const fast = walkTime(0, 1200, 1 / 60);
    const slow = walkTime(0, 1200, SLOW_FRAME_MS / 1000);
    expect(fast).toBeLessThan(MASCOT_WALK_S + 0.5);
    expect(slow).toBeLessThan(MASCOT_WALK_S + 0.5);
  });

  it('walks a long way no slower than a short one, within its walk time', () => {
    expect(walkTime(0, 2400, SLOW_FRAME_MS / 1000)).toBeLessThan(MASCOT_WALK_S + 0.5);
    expect(walkTime(0, 40, SLOW_FRAME_MS / 1000)).toBeLessThan(MASCOT_WALK_S);
  });
});

describe('the mascot stand', () => {
  const held = { x: 400, y: 200, face: 'right' };

  it('keeps its stand when a new measure moves it less than the slack', () => {
    expect(holdSpot(held, { x: 400 + MASCOT_STAND_SLACK - 1, y: 199, face: 'left' }, MASCOT_STAND_SLACK)).toBe(held);
  });

  it('moves when the stand changes past the slack, and drops it when there is none', () => {
    const far = { x: 400 + MASCOT_STAND_SLACK, y: 200, face: 'right' };
    expect(holdSpot(held, far, MASCOT_STAND_SLACK)).toBe(far);
    expect(holdSpot(held, null, MASCOT_STAND_SLACK)).toBeNull();
    expect(holdSpot(null, held, MASCOT_STAND_SLACK)).toBe(held);
  });
});
