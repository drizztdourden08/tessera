/* @layer renderer-components @kind types */
import type { RefObject } from 'react';
import type { GrowFallback } from './overflow-probe.type';
import type { TableColumn } from '../../../data/table/types';

type FallbackFlag = 'fit' | 'grow';

type FallbackResolver = (root: HTMLElement, paths: readonly string[], fitted: Map<string, number>) => GrowFallback;

type ChangeWatcher = (root: HTMLElement, onChange: () => void) => (() => void) | undefined;

interface UseMeasuredFallbackInput {
  columns: readonly TableColumn[];
  rootRef: RefObject<HTMLElement | null>;
  flag: FallbackFlag;
  resolve: FallbackResolver;
  watch: ChangeWatcher;
}

export type {
  ChangeWatcher, FallbackFlag, FallbackResolver, UseMeasuredFallbackInput,
};
