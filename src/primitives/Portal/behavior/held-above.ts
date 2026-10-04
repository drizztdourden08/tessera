/* @layer renderer-components @kind logic */
import { LAYER_STACKS } from './dismiss-layers.constants';
import type { DismissDocument, DismissLayer } from './dismiss-layers.type';

const heldAbove = (doc: DismissDocument, layer: DismissLayer, node: Node): boolean => {
  const stack = LAYER_STACKS.get(doc) ?? [];
  return stack.slice(stack.indexOf(layer) + 1).some((upper) => upper.holds(node));
};

export { heldAbove };
