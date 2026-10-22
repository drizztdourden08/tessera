/* @layer renderer-components @kind types */
import type { WindowLock } from '../ScreenWindow.type';
import type { WindowCornerTitleProps } from './WindowCornerTitle.type';

interface WindowCornerProps {
  lock: WindowLock;
  onClose: () => void;
  title?: WindowCornerTitleProps;
}

export type { WindowCornerProps };
