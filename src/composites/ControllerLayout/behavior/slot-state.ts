/* @layer renderer-components @kind logic */
import { STICK_REST } from '../ControllerLayout.constants';
import type { ControllerSlotState } from '../ControllerLayout.type';

interface Analog {
  pressed?: boolean;
  value?: number;
}

const finite = (value: number | undefined): number => (typeof value === 'number' && Number.isFinite(value) ? value : 0);

const clampUnit = (value: number | undefined): number => Math.min(1, Math.max(0, finite(value)));

const clampAxis = (value: number | undefined): number => Math.min(1, Math.max(-1, finite(value)));

const amountOf = (state: Analog | undefined): number => {
  if (!state) return 0;
  if (state.value !== undefined) return clampUnit(state.value);
  return state.pressed ? 1 : 0;
};

const isActive = (state: Analog | undefined): boolean => state?.pressed === true || amountOf(state) > 0;

const stickMoved = (state: ControllerSlotState | undefined): boolean =>
  Math.hypot(clampAxis(state?.x), clampAxis(state?.y)) >= STICK_REST;

export { amountOf, clampAxis, isActive, stickMoved };
