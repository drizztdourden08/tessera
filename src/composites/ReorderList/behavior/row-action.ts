/* @layer renderer-components @kind util */
import type { KeyboardEvent } from 'react';
import type { ReorderKeysInput } from '../ReorderList.type';
import { rowKeyAction } from './row-key-action';

const rowAction = (event: KeyboardEvent<HTMLElement>, id: string, { rename, activate }: Pick<ReorderKeysInput, 'rename' | 'activate'>): boolean => {
  const action = rowKeyAction(event, { rename: rename !== undefined, activate: activate !== undefined });
  if (action === 'rename') event.preventDefault();
  (action === 'rename' ? rename : activate)?.(id);
  return action !== undefined;
};

export { rowAction };
