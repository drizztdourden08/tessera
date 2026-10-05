/* @layer renderer-components @kind hook */
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { observeResize } from '../../dom/observe-resize';
import { needsMultiline } from './needs-multiline';
import { quoteLayoutOf } from './quote-layout-of';

const useQuoteLines = (children: ReactNode) => {
  const rootRef = useRef<HTMLQuoteElement | null>(null);
  const textRef = useRef<HTMLSpanElement | null>(null);
  const reserveRef = useRef<number | null>(null);
  const multilineRef = useRef(false);
  const [isMultiline, setMultiline] = useState(false);

  const measure = useCallback((): void => {
    const root = rootRef.current;
    const text = textRef.current;
    const layout = root && text ? quoteLayoutOf(root, text) : null;
    if (!layout) return;
    if (!multilineRef.current) reserveRef.current = layout.start;
    const next = needsMultiline(layout, reserveRef.current ?? layout.start, multilineRef.current);
    multilineRef.current = next;
    setMultiline(next);
  }, []);

  useLayoutEffect(measure, [measure, children]);

  useEffect(() => {
    return observeResize([rootRef.current], measure);
  }, [measure]);

  return { rootRef, textRef, isMultiline };
};

export { useQuoteLines };
