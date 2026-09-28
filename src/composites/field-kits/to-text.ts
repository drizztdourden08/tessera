/* @layer renderer-components @kind logic */
import { isNullish } from './coerce';

const toText = (value: unknown): string => (isNullish(value) ? '' : String(value));

export { toText };
