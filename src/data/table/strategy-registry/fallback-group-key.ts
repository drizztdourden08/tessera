/* @layer renderer-components @kind logic */
import { isNullish } from './is-nullish';
import type { GroupKeyFn } from './strategy-registry.type';

const fallbackGroupKey: GroupKeyFn = (value) => (isNullish(value) ? '' : String(value));

export { fallbackGroupKey };
