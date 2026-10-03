/* @layer renderer-components @kind util */
import { isSeparator } from './is-separator';
import { tidyNodes } from './tidy-nodes';
import type { MenuGroup, MenuNode } from '../DropdownMenu.type';
import type { MenuMatch } from './menu-match.type';

const leavesOf = (nodes: readonly MenuNode[], path: readonly string[]): MenuMatch[] =>
  nodes.flatMap((node) => {
    if (isSeparator(node)) return [];
    const children = tidyNodes(node.children ?? []);
    return children.length > 0 ? leavesOf(children, [...path, node.label]) : [{ item: node, path }];
  });

const menuLeaves = (groups: readonly MenuGroup[]): MenuMatch[] =>
  groups.flatMap((group) => leavesOf(group.items, group.label ? [group.label] : []));

export { menuLeaves };
