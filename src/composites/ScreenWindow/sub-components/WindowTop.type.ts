/* @layer renderer-components @kind types */
import type { ScreenWindowProps } from '../ScreenWindow.type';

interface WindowTopProps extends ScreenWindowProps {
  bare: boolean;
  named: boolean;
  titleId: string;
}

export type { WindowTopProps };
