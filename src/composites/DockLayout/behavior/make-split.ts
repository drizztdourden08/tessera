/* @layer renderer-components @kind logic */
import type { LayoutNode, SplitAxis } from '../DockLayout.type';

const sumOf = (sizes: readonly number[]) => sizes.reduce((total, size) => total + size, 0);

const makeSplit = (axis: SplitAxis, children: readonly LayoutNode[], sizes: readonly number[]): LayoutNode => {
  const flat: LayoutNode[] = [];
  const shares: number[] = [];
  children.forEach((child, i) => {
    const size = sizes[i] ?? 0;
    if (child.kind !== 'split' || child.axis !== axis) {
      flat.push(child);
      shares.push(size);
      return;
    }
    const inner = sumOf(child.sizes) || 1;
    child.children.forEach((grand, k) => {
      flat.push(grand);
      shares.push((size * (child.sizes[k] ?? 0)) / inner);
    });
  });
  const only = flat[0];
  if (flat.length === 1 && only) return only;
  const total = sumOf(shares) || 1;
  return { kind: 'split', axis, children: flat, sizes: shares.map((share) => share / total) };
};

export { makeSplit };
