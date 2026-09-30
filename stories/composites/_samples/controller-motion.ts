/* @layer stories @kind logic */
import type { StickPlotPoint } from '../../../src/composites';

type StickMotion = 'rest' | 'roll' | 'free';

const REST_DRIFT: StickPlotPoint = { x: 0.04, y: -0.03 };
const JITTER = 0.012;

const restAt = (t: number): StickPlotPoint => ({
  x: REST_DRIFT.x + JITTER * Math.sin(t * 7.3),
  y: REST_DRIFT.y + JITTER * Math.cos(t * 5.1),
});

const rollAt = (t: number): StickPlotPoint => ({ x: 0.97 * Math.cos(t * 2.4), y: 0.97 * Math.sin(t * 2.4) });

const freeAt = (t: number): StickPlotPoint => {
  const reach = 0.5 - 0.5 * Math.cos(t * 0.8);
  return { x: reach * Math.cos(t * 1.7), y: reach * Math.sin(t * 1.7) };
};

const MOTIONS: Record<StickMotion, (t: number) => StickPlotPoint> = { rest: restAt, roll: rollAt, free: freeAt };

const stickAt = (t: number, motion: StickMotion = 'free'): StickPlotPoint => MOTIONS[motion](t);

const triggerAt = (t: number): number => Math.max(0, Math.sin(t * 1.9)) ** 1.5;

export { stickAt, triggerAt };
export type { StickMotion };
