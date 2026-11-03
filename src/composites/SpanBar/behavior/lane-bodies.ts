/* @layer renderer-components @kind logic */
import { SPAN_BODY_SELECTOR } from '../SpanBar.constants';

const laneBodies = (lane: HTMLElement): HTMLElement[] =>
  Array.from(lane.querySelectorAll<HTMLElement>(SPAN_BODY_SELECTOR)).sort(
    (first, second) => first.getBoundingClientRect().left - second.getBoundingClientRect().left,
  );

export { laneBodies };
