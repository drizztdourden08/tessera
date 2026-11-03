/* @layer renderer-components @kind types */
import type { ScrollAlign, SpanInput } from './virtual.type';

interface ScrollToSpanInput {
  scroller: HTMLElement;
  body: HTMLElement | null;
  shifted: boolean;
  across: boolean;
  span: Pick<SpanInput, 'top' | 'height'>;
  align: ScrollAlign;
}

export type { ScrollToSpanInput };
