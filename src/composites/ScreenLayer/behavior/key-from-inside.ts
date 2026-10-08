/* @layer renderer-components @kind logic */
import { isNode } from '../../../primitives/Portal/behavior/is-node';

const keyFromInside = (layer: HTMLElement | null) => (target: EventTarget | null): boolean => {
  if (!layer || !target || !isNode(target)) return true;
  const doc = layer.ownerDocument;
  return target === doc.body || target === doc.documentElement || layer.contains(target);
};

export { keyFromInside };
