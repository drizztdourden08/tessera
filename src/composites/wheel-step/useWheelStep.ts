/* @layer renderer-components @kind hook */
import { useEffect, useRef } from 'react';
import type { WheelStepOptions } from './wheel-step.type';
import { wheelStepOf } from './wheel-step-of';

const useWheelStep = (options: WheelStepOptions): void => {
  const { refs, active, watch } = options;
  const latest = useRef(options);
  latest.current = options;

  useEffect(() => {
    if (!active) return undefined;
    const nodes = latest.current.refs.map((ref) => ref.current).filter((node): node is HTMLElement => node !== null);
    const wheel = (event: WheelEvent): void => {
      const step = wheelStepOf(event);
      if (step === undefined) return;
      event.preventDefault();
      latest.current.onStep(step);
    };
    nodes.forEach((node) => node.addEventListener('wheel', wheel, { passive: false }));
    return () => nodes.forEach((node) => node.removeEventListener('wheel', wheel));
  }, [active, watch, refs.length]);
};

export { useWheelStep };
