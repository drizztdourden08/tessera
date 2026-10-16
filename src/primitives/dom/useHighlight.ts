/* @layer renderer-components @kind hook */
import { useEffect, useEffectEvent, useRef } from 'react';
import type { HighlightHandlers, HighlightSource, UseHighlightParams } from './highlight.type';

const useHighlight = (params: UseHighlightParams): HighlightHandlers => {
  const { onHighlight, disabled = false, active = false } = params;
  const lit = useRef<ReadonlySet<HighlightSource>>(new Set());

  const turn = (source: HighlightSource, on: boolean): void => {
    const before = lit.current;
    if (before.has(source) === on) return;
    const after = new Set(before);
    if (on) after.add(source);
    else after.delete(source);
    lit.current = after;
    if (on && before.size === 0 && !disabled) onHighlight?.();
  };
  const follow = useEffectEvent((on: boolean) => turn('active', on));

  useEffect(() => {
    follow(active);
  }, [active]);

  return {
    onPointerEnter: () => turn('pointer', true),
    onPointerLeave: () => turn('pointer', false),
    onFocus: () => turn('focus', true),
    onBlur: () => turn('focus', false),
  };
};

export { useHighlight };
