/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';
import type { BackAction } from '../../../primitives/action-data';
import type { ScreenWindowHeader } from '../ScreenWindow.type';

interface WindowContentHeaderProps {
  header: ScreenWindowHeader;
  back?: BackAction;
  title: ReactNode;
  titleId: string;
  onClose: () => void;
}

export type { WindowContentHeaderProps };
