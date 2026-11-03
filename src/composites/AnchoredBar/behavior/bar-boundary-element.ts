/* @layer renderer-components @kind logic */
import { ownerDocumentOf } from '../../../primitives/dom/owner-document';
import type { BarBoundary } from '../AnchoredBar.type';

const barBoundaryElement = (boundary: BarBoundary | undefined, node: HTMLElement): HTMLElement | null => {
  if (boundary === undefined) return null;
  if (typeof boundary === 'string') return ownerDocumentOf(node).querySelector<HTMLElement>(boundary);
  return 'current' in boundary ? boundary.current : boundary;
};

export { barBoundaryElement };
