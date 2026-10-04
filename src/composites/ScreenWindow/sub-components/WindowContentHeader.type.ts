/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';
import type { ScreenWindowHeader } from '../ScreenWindow.type';

interface WindowContentHeaderProps {
  header: ScreenWindowHeader;
  title: ReactNode;
  titleId: string;
  onClose: () => void;
}

export type { WindowContentHeaderProps };
