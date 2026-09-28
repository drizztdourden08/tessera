/* @layer renderer-components @kind logic */
import { isNullish } from './isNullish';
import type { GroupKeyFn } from './strategy-registry.type';

const fallbackGroupKey: GroupKeyFn = (value) => (isNullish(value) ? '' : String(value));

export { fallbackGroupKey };
