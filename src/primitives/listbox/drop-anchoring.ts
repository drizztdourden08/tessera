/* @layer renderer-components @kind util */
import type { AnchoredPlacement } from '../Anchored/Anchored.type';
import type { FloatingPlacement } from '../Floating/Floating.type';
import type { ListboxDrop } from './listbox-drop.type';

const dropAnchoring = (drop: ListboxDrop<HTMLElement>): { place: AnchoredPlacement; fallback: FloatingPlacement | null } => {
  const { placement, attach, end } = drop;
  const place: AnchoredPlacement = `${attach === 'up' ? 'top' : 'bottom'}-${end ? 'end' : 'start'}`;
  if (!placement) return { place, fallback: null };
  return { place, fallback: end ? { top: placement.top, right: placement.right } : { top: placement.top, left: placement.left } };
};

export { dropAnchoring };
