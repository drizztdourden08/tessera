/* @layer renderer-components @kind hook */
import { useCallback, useRef } from 'react';
import { trackListWith } from '../DataTable.constants';
import { useFitFallback } from './useFitFallback';
import { useGrowFallback } from './useGrowFallback';
import { TRACKS_PROPERTY } from './useColumnSizing.constants';
import type { ColumnSizing, UseColumnSizingInput } from './useColumnSizing.type';

const useColumnSizing = ({ columns }: UseColumnSizingInput): ColumnSizing => {
  const rootRef = useRef<HTMLElement>(null);
  const columnsRef = useRef(columns);
  columnsRef.current = columns;

  const growFallback = useGrowFallback({ columns, rootRef });
  const growFallbackRef = useRef(growFallback);
  growFallbackRef.current = growFallback;

  const fitFallback = useFitFallback({ columns, rootRef });
  const fitFallbackRef = useRef(fitFallback);
  fitFallbackRef.current = fitFallback;

  const previewWidth = useCallback((path: string, width: number) => {
    const root = rootRef.current;
    if (!root) return;
    const tracks = trackListWith(columnsRef.current, { path, width }, {
      grow: growFallbackRef.current,
      fit: fitFallbackRef.current,
    });
    root.style.setProperty(TRACKS_PROPERTY, tracks);
  }, []);

  return {
    rootRef, previewWidth, growFallback, fitFallback,
  };
};

export { useColumnSizing };
