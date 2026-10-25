/* @layer renderer-components @kind logic */
import type { LayoutNode } from '../DockLayout.type';
import { NO_SITES } from './corner.constants';
import type { CornerSites, CornerSpot, CornerStep, GiveSite, TakeSite } from './corner.type';
import { pathTo } from './path-to';

const endIndexOf = (count: number, spot: CornerSpot) => (spot.end === 'start' ? 0 : count - 1);

const stepsOf = (path: LayoutNode[]): CornerStep[] =>
  path.slice(0, -1).flatMap((parent, depth) => {
    const child = path[depth + 1];
    return parent.kind === 'split' && child ? [{ parent, depth, at: parent.children.indexOf(child) }] : [];
  }).reverse();

const isExtreme = ({ parent, at }: CornerStep) => at === 0 || at === parent.children.length - 1;

const takeSiteOf = (path: LayoutNode[], step: CornerStep, spot: CornerSpot): TakeSite | null => {
  const outer = path[step.depth - 1];
  const inner = step.parent;
  if (outer?.kind !== 'split' || outer.axis !== spot.along || inner.children.length < 2) return null;
  const innerAt = outer.children.indexOf(inner);
  const beside = spot.end === 'start' ? innerAt - 1 : innerAt + 1;
  return outer.children[beside] ? { outer, inner, at: step.at, innerAt, beside } : null;
};

const giveSiteOf = ({ parent, at }: CornerStep, spot: CornerSpot): GiveSite | null => {
  const otherAt = at === 0 ? 1 : parent.children.length - 2;
  const other = parent.children[otherAt];
  if (other?.kind !== 'split' || other.axis !== spot.along || other.children.length < 2) return null;
  return { column: parent, other, at, otherAt, beside: endIndexOf(other.children.length, spot) };
};

const cornerSites = (tree: LayoutNode, key: string, spot: CornerSpot): CornerSites => {
  const path = pathTo(tree, key);
  if (!path || path[path.length - 1]?.kind !== 'pane') return NO_SITES;
  const sites: CornerSites = { take: null, give: null };
  for (const step of stepsOf(path)) {
    if (step.parent.axis === spot.along) {
      if (step.at !== endIndexOf(step.parent.children.length, spot)) break;
    } else if (isExtreme(step)) {
      sites.take ??= takeSiteOf(path, step, spot);
      sites.give ??= giveSiteOf(step, spot);
    }
  }
  return sites;
};

export { cornerSites };
