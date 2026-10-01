/* @layer renderer-components @kind hook */
import { useContext, useEffect, useId, useRef, useState } from 'react';
import { HintReportContext } from './hint-report-context';
import { keyboardFocus } from './keyboard-focus';
import type { HintHandlers, HintReporter, UseHintReportParams } from './hint.type';

const useHintReport = <K extends string>(params: UseHintReportParams<K>): HintReporter<K> => {
  const { hintOf, onHint } = params;
  const report = useContext(HintReportContext);
  const source = useId();
  const [hovered, setHovered] = useState<K | null>(null);
  const [focused, setFocused] = useState<K | null>(null);
  const onHintRef = useRef(onHint);
  const shownRef = useRef(false);
  const key = hovered ?? focused;
  const hint = key === null ? undefined : hintOf(key);
  const label = hint?.label;
  const description = hint?.description ?? '';

  useEffect(() => {
    onHintRef.current = onHint;
  });

  useEffect(() => {
    if (label === undefined && !shownRef.current) return;
    const next = label === undefined ? null : { label, description };
    shownRef.current = next !== null;
    onHintRef.current?.(next);
    report?.(source, next);
  }, [label, description, report, source]);

  useEffect(() => () => {
    if (!shownRef.current) return;
    shownRef.current = false;
    onHintRef.current?.(null);
    report?.(source, null);
  }, [report, source]);

  const handlersFor = (target: K): HintHandlers => ({
    onMouseEnter: () => setHovered(target),
    onMouseLeave: () => setHovered((current) => (current === target ? null : current)),
    onFocus: (event) => {
      if (keyboardFocus(event.target)) setFocused(target);
    },
    onBlur: () => setFocused((current) => (current === target ? null : current)),
  });

  return { handlersFor };
};

export { useHintReport };
