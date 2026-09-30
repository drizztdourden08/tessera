/* @layer renderer-components @kind logic */
import { SHARE } from '../DockLayout.constants';
import type { DockEdge, DockTarget, LayoutNode, LeafNode, WidgetId } from '../DockLayout.type';
import { axisOfEdge } from './axis-of-edge';
import { isLeadingEdge } from './is-leading-edge';
import { wrapBeside } from './wrap-beside';

const shareFor = (leaf: LeafNode, beside: LeafNode): number => {
  if (leaf.kind === 'main') return SHARE.mainBesidePane;
  return beside.kind === 'main' ? SHARE.paneBesideMain : SHARE.paneBesidePane;
};

const insertBeside = (node: LayoutNode, leaf: LeafNode, key: string, edge: DockEdge): LayoutNode => {
  if (node.kind !== 'split') return node.key === key ? wrapBeside(node, edge, leaf, shareFor(leaf, node)) : node;
  const index = node.children.findIndex((child) => child.kind !== 'split' && child.key === key);
  const target = index >= 0 ? node.children[index] : null;
  if (target && target.kind !== 'split' && axisOfEdge(edge) === node.axis) {
    const at = isLeadingEdge(edge) ? index : index + 1;
    const children = [...node.children];
    const sizes = [...node.sizes];
    const current = sizes[index] ?? 0;
    const share = current * shareFor(leaf, target);
    sizes[index] = current - share;
    children.splice(at, 0, leaf);
    sizes.splice(at, 0, share);
    return { ...node, children, sizes };
  }
  return { ...node, children: node.children.map((child) => insertBeside(child, leaf, key, edge)) };
};

const joinTabs = (node: LayoutNode, key: string, widgets: WidgetId[]): LayoutNode => {
  if (node.kind === 'pane') return node.key === key ? { ...node, widgets: [...node.widgets, ...widgets], active: widgets[0] ?? node.active } : node;
  if (node.kind === 'split') return { ...node, children: node.children.map((child) => joinTabs(child, key, widgets)) };
  return node;
};

const insertAt = (tree: LayoutNode, leaf: LeafNode, target: DockTarget): LayoutNode => {
  if (target.at === 'outer') return wrapBeside(tree, target.edge, leaf, leaf.kind === 'main' ? SHARE.outerMain : SHARE.outerPane);
  if (target.at === 'tab') return leaf.kind === 'pane' ? joinTabs(tree, target.key, leaf.widgets) : tree;
  return insertBeside(tree, leaf, target.key, target.edge);
};

export { insertAt };
