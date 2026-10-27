/* @layer renderer-components @kind util */
import { LINK_ID_SKIP } from '../Markdown.constants';
import type { LinkIdsOptions, MarkdownTextNode, MarkdownTextTree } from '../Markdown.type';
import { splitIds } from './split-ids';

const splitText = (node: MarkdownTextNode, options: LinkIdsOptions): MarkdownTextNode[] =>
  options.rules.reduce<MarkdownTextNode[]>(
    (nodes, rule) => nodes.flatMap((part) => (part.type === 'text' && part.value !== undefined ? splitIds(part.value, rule, options.allowPaths) : [part])),
    [node],
  );

const rewrite = (children: MarkdownTextNode[], options: LinkIdsOptions): MarkdownTextNode[] =>
  children.flatMap((node) => {
    if (LINK_ID_SKIP.has(node.type)) return [node];
    if (node.type === 'text') return splitText(node, options);
    if (node.children) node.children = rewrite(node.children, options);
    return [node];
  });

const linkIds = (options: LinkIdsOptions) => (tree: MarkdownTextTree) => {
  if (options.rules.length > 0 && tree.children) tree.children = rewrite(tree.children, options);
};

export { linkIds };
