/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';
import type { BackAction } from '../../primitives/action-data';

type WindowHeaderLook = 'record';

type WindowHeaderActionsRow = 'title' | 'eyebrow';

interface WindowHeaderProps {
  look?: WindowHeaderLook;
  eyebrow?: ReactNode;
  title?: ReactNode;
  titleWrap?: boolean;
  titleId?: string;
  subtitle?: ReactNode;
  onClose?: () => void;
  back?: BackAction;
  extra?: ReactNode;
  actions?: ReactNode;
  actionsRow?: WindowHeaderActionsRow;
  stackNarrow?: boolean;
  className?: string;
}

type WindowHeaderTitlesProps = Pick<WindowHeaderProps, 'eyebrow' | 'title' | 'titleId' | 'subtitle'> & {
  eyebrowActions?: ReactNode;
};

type WindowHeaderToolsProps = Pick<WindowHeaderProps, 'extra' | 'actions' | 'onClose'> & {
  extraFits: boolean;
};

interface WindowHeaderActionsProps {
  children: ReactNode;
}

interface WindowHeaderBackProps {
  back: BackAction;
}

export type { WindowHeaderActionsProps, WindowHeaderActionsRow, WindowHeaderBackProps, WindowHeaderLook, WindowHeaderProps, WindowHeaderTitlesProps, WindowHeaderToolsProps };
