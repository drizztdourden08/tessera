/* @layer renderer-components @kind util */
import { isRecord } from './is-record';

const readField = (item: unknown, path: string): unknown =>
  path.split('.').reduce<unknown>((node, part) => (isRecord(node) ? node[part] : undefined), item);

export { readField };
