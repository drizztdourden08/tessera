/* @layer renderer-components @kind logic */
import { SPAN_BODY_SELECTOR } from '../SpanBar.constants';

const bodyOf = (target: EventTarget): HTMLElement | null =>
  (target instanceof HTMLElement && target.matches(SPAN_BODY_SELECTOR) ? target : null);

export { bodyOf };
