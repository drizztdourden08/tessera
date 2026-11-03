/* @layer renderer-components @kind logic */
import type { PointerEvent } from 'react';
import { sweepSession } from './sweep-session';
import type { SweepSession, ToggleSweepInput } from './toggle-sweep.type';

const sweepStart = (key: string, current: boolean, event: PointerEvent<HTMLElement>, input: ToggleSweepInput): SweepSession | null => {
  if (input.startWhen?.(event) === false) return null;
  return sweepSession({ first: key, value: !current, order: input.order, together: input.expandStart?.(key), onSet: input.onSet });
};

export { sweepStart };
