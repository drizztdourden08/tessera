/* @layer renderer-components @kind types */
import type { RowFeatureProps } from './row-features.type';

interface UseRowRefInput<T> {
  rowRef?: RowFeatureProps<T>['rowRef'];
  row: T;
  id: string;
}

export type { UseRowRefInput };
