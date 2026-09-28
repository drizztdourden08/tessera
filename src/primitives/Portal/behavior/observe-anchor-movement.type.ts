/* @layer renderer-components @kind types */
type EventTargetLike = Pick<Window, 'addEventListener' | 'removeEventListener'>;

interface AnchorMovementHandlers {
  onScroll: () => void;
  onResize: () => void;
}

export type { EventTargetLike, AnchorMovementHandlers };
