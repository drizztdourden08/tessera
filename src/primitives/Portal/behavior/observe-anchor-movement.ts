/* @layer renderer-components @kind util */
import type { AnchorMovementHandlers, EventTargetLike } from './observe-anchor-movement.type';

const observeAnchorMovement = (
  target: EventTargetLike,
  handlers: AnchorMovementHandlers,
): (() => void) => {
  const { onScroll, onResize } = handlers;

  target.addEventListener('scroll', onScroll, true);
  target.addEventListener('resize', onResize);

  return () => {
    target.removeEventListener('scroll', onScroll, true);
    target.removeEventListener('resize', onResize);
  };
};

export { observeAnchorMovement };
