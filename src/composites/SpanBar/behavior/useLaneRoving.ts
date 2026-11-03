/* @layer renderer-components @kind hook */
import { useLayoutEffect, useRef } from 'react';
import type { FocusEvent, KeyboardEvent, RefObject } from 'react';
import { bodyOf } from './body-of';
import { laneBodies } from './lane-bodies';
import { plainStep } from './plain-step';
import type { LaneRovingState } from './useLaneRoving.type';

const useLaneRoving = (laneRef: RefObject<HTMLElement | null>): LaneRovingState => {
  const active = useRef<HTMLElement | null>(null);

  const apply = (): void => {
    const lane = laneRef.current;
    if (!lane) return;
    const bodies = laneBodies(lane);
    const current = active.current && bodies.includes(active.current) ? active.current : bodies[0];
    bodies.forEach((body) => {
      body.tabIndex = body === current ? 0 : -1;
    });
  };

  useLayoutEffect(apply);

  const onFocus = (event: FocusEvent<HTMLElement>): void => {
    const body = bodyOf(event.target);
    if (!body) return;
    active.current = body;
    apply();
  };

  const onKeyDown = (event: KeyboardEvent<HTMLElement>): void => {
    const step = plainStep(event);
    const from = bodyOf(event.target);
    if (step === undefined || !from || !laneRef.current) return;
    const bodies = laneBodies(laneRef.current);
    const next = bodies[bodies.indexOf(from) + step];
    if (!next) return;
    event.preventDefault();
    next.focus();
  };

  return { onFocus, onKeyDown };
};

export { useLaneRoving };
