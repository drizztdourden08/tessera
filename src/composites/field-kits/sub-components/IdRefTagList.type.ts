/* @layer renderer-components @kind types */
import type { ArrayIdRefResolver } from '../registry.type';

interface IdRefTagListProps {
  list: readonly unknown[];
  targetKind?: string;
  resolveIdRefDisplay?: ArrayIdRefResolver;
}

export type { IdRefTagListProps };
