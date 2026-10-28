/* @layer renderer-components @kind hook */
import { useRef } from 'react';
import type { PointerEvent } from 'react';
import { SCRUB_PIXELS } from '../NumberField.constants';
import type { ScrubDrag, ScrubHandlers, ScrubParams } from '../NumberField.type';
import { releasePointer } from './release-pointer';
import { stepNumber } from './step-number';

const useScrub = (params: ScrubParams): ScrubHandlers | undefined => {
  const drag = useRef<ScrubDrag | null>(null);
  const latest = useRef(params);
  latest.current = params;
  if (!params.enabled) return undefined;

  const release = (event: PointerEvent<HTMLElement>): void => {
    drag.current = null;
    releasePointer(event);
  };

  return {
    onPointerDown: (event) => {
      if (event.button !== 0) return;
      event.currentTarget.setPointerCapture(event.pointerId);
      drag.current = { x: event.clientX, value: latest.current.value };
    },
    onPointerMove: (event) => {
      const current = drag.current;
      if (current === null) return;
      const count = Math.trunc((event.clientX - current.x) / SCRUB_PIXELS);
      if (count === 0) return;
      current.x += count * SCRUB_PIXELS;
      current.value = stepNumber(current.value, count, { ...latest.current.config, fine: event.shiftKey });
      latest.current.onChange(current.value);
    },
    onPointerUp: release,
    onPointerCancel: release,
  };
};

export { useScrub };
