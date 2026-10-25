/* @layer renderer-components @kind logic */
import type { LayoutNode } from '../DockLayout.type';
import { CORNER_AXES } from './corner.constants';
import type { CornerEnd, CornerOptions } from './corner.type';
import { cornerSites } from './corner-sites';
import { giveCorner } from './give-corner';
import { takeCorner } from './take-corner';

const turnCorner = (tree: LayoutNode, paneKey: string, end: CornerEnd, options: CornerOptions = {}): LayoutNode => {
  for (const along of options.along ? [options.along] : CORNER_AXES) {
    const { take, give } = cornerSites(tree, paneKey, { end, along });
    const next = options.give === true
      ? giveCorner(tree, give)
      : (takeCorner(tree, take) ?? (options.give === false ? null : giveCorner(tree, give)));
    if (next) return next;
  }
  return tree;
};

export { turnCorner };
