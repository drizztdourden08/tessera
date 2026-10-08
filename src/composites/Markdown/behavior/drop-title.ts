/* @layer renderer-components @kind util */
import type { MarkdownTree } from '../Markdown.type';

const dropTitle = () => (tree: MarkdownTree) => {
  const children = tree.children ?? [];
  const at = children.findIndex((child) => child.type !== 'html');
  const first = children[at];
  if (first?.type === 'heading' && first.depth === 1) children.splice(at, 1);
};

export { dropTitle };
