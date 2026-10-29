/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';
import type { WindowHeaderActionsRow } from '../WindowHeader/WindowHeader.type';

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
  stackNarrow?: boolean;
  subtitle?: ReactNode;
  headerActions?: ReactNode;
  headerActionsRow?: WindowHeaderActionsRow;
  actions?: ReactNode;
  children: ReactNode;
}

type DrawerHeaderProps = Pick<DrawerProps, 'look' | 'eyebrow' | 'title' | 'titleWrap' | 'stackNarrow' | 'subtitle' | 'headerActions' | 'headerActionsRow' | 'onClose'> & {
  titleId: string;
};

export type { DrawerHeaderProps, DrawerLook, DrawerProps, DrawerSize };
