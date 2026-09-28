/* @layer renderer-components @kind hook */
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { measuredFitWidths } from './measure-column';
import { sameFallback } from './same-fallback';
import { MEASURE_DELAY_MS } from './useMeasuredFallback.constants';
import type { GrowFallback } from './overflow-probe.type';
import type { TableColumn } from '../../../data/table/types';
import type { FallbackFlag, UseMeasuredFallbackInput } from './useMeasuredFallback.type';

const flaggedPathsOf = (columns: readonly TableColumn[], flag: FallbackFlag): string[] =>
  columns.filter((column) => column[flag]).map((column) => column.path);

const columnsSignature = (columns: readonly TableColumn[]): string => JSON.stringify(columns);

const useMeasuredFallback = (input: UseMeasuredFallbackInput): GrowFallback => {
  const { columns, rootRef, flag, resolve, watch } = input;
  const [fallback, setFallback] = useState<GrowFallback>(null);

  const signature = columnsSignature(columns);
  const flaggedPaths = useMemo(() => flaggedPathsOf(columns, flag), [signature, flag]);
  const pathsRef = useRef(flaggedPaths);
  pathsRef.current = flaggedPaths;

  const measure = useCallback(() => {
    const root = rootRef.current;
    const paths = pathsRef.current;
    if (!root) return;
    if (paths.length === 0) {
      setFallback((previous) => (previous === null ? previous : null));
      return;
    }
    const fitted = new Map(measuredFitWidths(root, paths).map(({ path, width }) => [path, width]));
    const next = resolve(root, paths, fitted);
    setFallback((previous) => (sameFallback(previous, next) ? previous : next));
  }, [rootRef, resolve]);

  useEffect(() => {
    measure();
  }, [measure, signature]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const stop = watch(root, () => {
      clearTimeout(timer);
      timer = setTimeout(measure, MEASURE_DELAY_MS);
    });
    if (!stop) return undefined;
    return () => {
      clearTimeout(timer);
      stop();
    };
  }, [measure, rootRef, watch]);

  return fallback;
};

export { useMeasuredFallback };
