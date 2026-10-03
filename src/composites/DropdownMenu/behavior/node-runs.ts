/* @layer renderer-components @kind util */
import { isSeparator } from './is-separator';
import { itemKind } from './item-kind';
import type { MenuNode } from '../DropdownMenu.type';
import type { NodeRun } from './node-runs.type';

const isRadio = (node: MenuNode): boolean => !isSeparator(node) && itemKind(node) === 'radio';

const keyOf = (node: MenuNode, index: number): string => (isSeparator(node) ? `separator-${index}` : node.id);

const nodeRuns = (nodes: readonly MenuNode[]): NodeRun[] => {
  const runs: NodeRun[] = [];
  nodes.forEach((node, index) => {
    const last = runs.at(-1);
    if (isRadio(node) && last?.radio) runs[runs.length - 1] = { ...last, nodes: [...last.nodes, node] };
    else runs.push({ key: isRadio(node) ? `radio-${keyOf(node, index)}` : keyOf(node, index), radio: isRadio(node), nodes: [node] });
  });
  return runs;
};

export { nodeRuns };
