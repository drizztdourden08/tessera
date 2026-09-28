/* @layer renderer-components @kind types */
import type { ArrayIdRefResolver } from '../registry.type';

interface IdRefBadgeListProps {
  list: readonly unknown[];
  targetKind?: string;
  resolveIdRefDisplay?: ArrayIdRefResolver;
}

export type { IdRefBadgeListProps };
