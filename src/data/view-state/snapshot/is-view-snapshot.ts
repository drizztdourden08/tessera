/* @layer renderer-components @kind logic */
import { SNAPSHOT_VERSION } from './snapshot.constants';
import type { ViewSnapshot } from './snapshot.type';

const isArrayOfObjects = (value: unknown): boolean =>
  Array.isArray(value) && value.every((entry) => typeof entry === 'object' && entry !== null);

const isViewSnapshot = (value: unknown): value is ViewSnapshot => {
  if (typeof value !== 'object' || value === null) return false;
  const candidate = value as Partial<ViewSnapshot>;
  return (
    candidate.v === SNAPSHOT_VERSION &&
    isArrayOfObjects(candidate.columns) &&
    isArrayOfObjects(candidate.sort) &&
    Array.isArray(candidate.groupBy) &&
    candidate.groupBy.every((path) => typeof path === 'string') &&
    isArrayOfObjects(candidate.filters)
  );
};

export { isViewSnapshot };
