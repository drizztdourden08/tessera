/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';

type DrawerSide = 'left' | 'right' | 'top';

type DrawerSize = 'md' | 'lg' | 'wide' | 'xl';

type DrawerLook = 'default' | 'record';

interface DrawerProps {
  open: boolean;
  onClose: () => void;
  side?: DrawerSide;
  size?: DrawerSize;
  look?: DrawerLook;
  label?: string;
  eyebrow?: ReactNode;
  title?: ReactNode;
  titleWrap?: boolean;
  subtitle?: ReactNode;
  headerActions?: ReactNode;
  actions?: ReactNode;
  children: ReactNode;
}

type DrawerHeaderProps = Pick<DrawerProps, 'look' | 'eyebrow' | 'title' | 'titleWrap' | 'subtitle' | 'headerActions' | 'onClose'> & {
  titleId: string;
};

export type { DrawerHeaderProps, DrawerLook, DrawerProps, DrawerSize };
