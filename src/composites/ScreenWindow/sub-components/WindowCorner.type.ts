/* @layer renderer-components @kind types */
import type { WindowLock } from '../ScreenWindow.type';

interface WindowCornerProps {
  lock: WindowLock;
  onClose: () => void;
}

export type { WindowCornerProps };
