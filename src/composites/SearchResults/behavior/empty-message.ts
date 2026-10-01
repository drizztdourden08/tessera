/* @layer renderer-components @kind logic */
import type { ReactNode } from 'react';
import type { TesseraStrings } from '../../../primitives/strings/tessera-strings.type';
import type { EmptyMessageInput } from '../SearchResults.type';

const emptyMessage = (input: EmptyMessageInput, strings: TesseraStrings['navigation']): ReactNode | null => {
  const { needle, count, jumpCount, idleMessage, emptyMessage: nothing } = input;
  if (needle === '') return idleMessage ?? strings.typeToSearch;
  if (count > 0 || jumpCount > 0) return null;
  return nothing ?? strings.nothingMatches(needle);
};

export { emptyMessage };
