/* @layer renderer-components @kind types */
import type { MenuNode } from '../DropdownMenu.type';

interface NodeRun {
  key: string;
  radio: boolean;
  nodes: readonly MenuNode[];
}

export type { NodeRun };
