/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';
import type { BackAction } from '../../primitives/action-data';

interface WindowHeaderProps {
  eyebrow?: ReactNode;
  title?: ReactNode;
  titleWrap?: boolean;
  titleId?: string;
  subtitle?: ReactNode;
  onClose?: () => void;
  back?: BackAction;
  extra?: ReactNode;
  actions?: ReactNode;
  className?: string;
}

type WindowHeaderTitlesProps = Pick<WindowHeaderProps, 'eyebrow' | 'title' | 'titleId' | 'subtitle'>;

interface WindowHeaderBackProps {
  back: BackAction;
}

export type { WindowHeaderBackProps, WindowHeaderProps, WindowHeaderTitlesProps };
