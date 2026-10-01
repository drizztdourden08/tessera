/* @layer renderer-components @kind logic */
import type { ReactNode } from 'react';
import type { TesseraStrings } from '../../../primitives/strings/tessera-strings.type';

const emptyMessage = (query: string, count: number, emptyText: ReactNode, strings: TesseraStrings['navigation']): ReactNode => {
  if (query.trim().length === 0 || count > 0) return null;
  return emptyText ?? strings.noResultsFor(query);
};

export { emptyMessage };
