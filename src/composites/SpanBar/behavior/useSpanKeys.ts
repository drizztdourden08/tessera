/* @layer renderer-components @kind hook */
import type { KeyboardEvent } from 'react';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { spanKeyStep } from './span-key-step';
import type { SpanKeysSetup } from './useSpanKeys.type';

const useSpanKeys = (setup: SpanKeysSetup): ((event: KeyboardEvent<HTMLElement>) => void) => {
  const { span, total, minLength, readOnly, onChange, onActivate, announce } = setup;
  const { spanBar } = useTesseraStrings();
  return (event) => {
    if (event.key === 'Enter' && onActivate) {
      event.preventDefault();
      onActivate();
      return;
    }
    if (readOnly) return;
    const next = spanKeyStep({ key: event.key, alt: event.altKey, shift: event.shiftKey, ctrl: event.ctrlKey }, span, total, minLength);
    if (!next) return;
    event.preventDefault();
    onChange?.(next);
    announce?.(spanBar.range(next.start + 1, next.end + 1));
  };
};

export { useSpanKeys };
