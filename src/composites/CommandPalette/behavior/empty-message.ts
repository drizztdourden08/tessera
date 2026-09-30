/* @layer renderer-components @kind logic */
import type { ReactNode } from 'react';

const emptyMessage = (query: string, count: number, emptyText: ReactNode): ReactNode => {
  if (query.trim().length === 0 || count > 0) return null;
  return emptyText ?? `No results for "${query}"`;
};

export { emptyMessage };
