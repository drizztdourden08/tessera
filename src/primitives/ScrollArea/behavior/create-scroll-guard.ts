/* @layer renderer-components @kind logic */
import type { ScrollPosition } from '../ScrollArea.type';

const createScrollGuard = () => {
  let pendingTarget: ScrollPosition | null = null;

  const markProgrammatic = (target: ScrollPosition): void => {
    pendingTarget = target;
  };

  const shouldSuppress = (current: ScrollPosition): boolean => {
    if (!pendingTarget) return false;
    if (current.top === pendingTarget.top && current.left === pendingTarget.left) pendingTarget = null;
    return true;
  };

  return { markProgrammatic, shouldSuppress };
};

export { createScrollGuard };
