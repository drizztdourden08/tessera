/* @layer renderer-components @kind util */
import { LINK_ID_SKIP } from '../Markdown.constants';
import type { MarkdownTextNode, MarkdownTextTree } from '../Markdown.type';
import { timesBetweenDigits } from './times-between-digits';

const walk = (children: MarkdownTextNode[]): void => {
  for (const node of children) {
    if (LINK_ID_SKIP.has(node.type)) continue;
    if (node.type === 'text' && node.value !== undefined) node.value = timesBetweenDigits(node.value);
    if (node.children) walk(node.children);
  }
};

const smartTimes = () => (tree: MarkdownTextTree) => {
  if (tree.children) walk(tree.children);
};

export { smartTimes };
