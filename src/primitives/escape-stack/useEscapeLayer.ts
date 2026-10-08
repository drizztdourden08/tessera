/* @layer renderer-components @kind hook */
import { useEffect, useRef } from 'react';
import { pushEscape } from './push-escape';
import type { EscapeDocument, EscapeHolds, EscapeLevel } from './escape-stack.type';

const useEscapeLayer = (doc: EscapeDocument | null | undefined, level: EscapeLevel, onEscape: () => void, holds?: EscapeHolds): void => {
  const latest = useRef({ onEscape, holds });
  latest.current = { onEscape, holds };
  const scoped = holds !== undefined;

  useEffect(() => {
    if (!doc) return undefined;
    const own = scoped ? (target: EventTarget | null) => latest.current.holds?.(target) ?? true : undefined;
    return pushEscape(doc, level, () => latest.current.onEscape(), own);
  }, [doc, level, scoped]);
};

export { useEscapeLayer };
