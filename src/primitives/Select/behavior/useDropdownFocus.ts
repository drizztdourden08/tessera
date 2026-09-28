/* @layer renderer-components @kind hook */
import { useEffect } from 'react';
import type { UseDropdownFocusParams } from './useDropdownFocus.type';

const useDropdownFocus = (params: UseDropdownFocusParams): void => {
  const { open, searchable, highlightIdx, searchRef, contentRef } = params;

  useEffect(() => {
    if (!open || !searchable) return undefined;
    const frame = requestAnimationFrame(() => searchRef.current?.focus());
    return () => cancelAnimationFrame(frame);
  }, [open, searchable, searchRef]);

  useEffect(() => {
    if (!open || highlightIdx < 0) return;
    const el = contentRef.current?.querySelector(`[data-idx="${highlightIdx}"]`);
    el?.scrollIntoView({ block: 'nearest' });
  }, [highlightIdx, open, contentRef]);
};

export { useDropdownFocus };
