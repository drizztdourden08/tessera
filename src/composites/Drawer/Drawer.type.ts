/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';

type DrawerSide = 'left' | 'right' | 'top';

type DrawerSize = 'md' | 'lg' | 'wide' | 'xl';

interface DrawerProps {
  open: boolean;
  onClose: () => void;
  side?: DrawerSide;
  size?: DrawerSize;
  label?: string;
  eyebrow?: ReactNode;
  title?: ReactNode;
  titleWrap?: boolean;
  subtitle?: ReactNode;
  headerActions?: ReactNode;
  actions?: ReactNode;
  children: ReactNode;
}

type DrawerHeaderProps = Pick<DrawerProps, 'eyebrow' | 'title' | 'titleWrap' | 'subtitle' | 'headerActions' | 'onClose'> & {
  titleId: string;
};

export type { DrawerHeaderProps, DrawerProps, DrawerSize };
