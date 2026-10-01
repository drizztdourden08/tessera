/* @layer renderer-components @kind util */
import { isSeparator } from './is-separator';
import type { MenuNode } from '../DropdownMenu.type';

const tidyNodes = (nodes: readonly MenuNode[]): MenuNode[] => {
  const kept: MenuNode[] = [];
  nodes.forEach((node) => {
    const last = kept.at(-1);
    if (!isSeparator(node) || (last !== undefined && !isSeparator(last))) kept.push(node);
  });
  const tail = kept.at(-1);
  if (tail !== undefined && isSeparator(tail)) kept.pop();
  return kept;
};

export { tidyNodes };
