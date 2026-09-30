/* @layer renderer-components @kind logic */
import type { ReactNode } from 'react';
import type { EmptyMessageInput } from '../SearchResults.type';

const emptyMessage = (input: EmptyMessageInput): ReactNode | null => {
  const { needle, count, jumpCount, idleMessage, emptyMessage: nothing } = input;
  if (needle === '') return idleMessage;
  if (count > 0 || jumpCount > 0) return null;
  return nothing ?? `Nothing matches "${needle}".`;
};

export { emptyMessage };
