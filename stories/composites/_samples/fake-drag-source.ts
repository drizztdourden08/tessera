/* @layer stories @kind logic */
import type { FakeDragGrab } from './fake-drag-source.type';

const fakeDragSource = (element: HTMLElement, type: string, payload: string, onGrab: (grab: FakeDragGrab) => void): (() => void) => {
  const onDown = (event: PointerEvent): void => {
    if (event.button === 0) onGrab({ type, payload });
  };
  element.addEventListener('pointerdown', onDown);
  return () => element.removeEventListener('pointerdown', onDown);
};

export { fakeDragSource };
