/* @layer renderer-components @kind types */
import type { AvatarProps } from '../../primitives/Avatar';
import type { IconName } from '../../primitives/Icon/Icon.type';

type SignalTone = 'danger' | 'warning' | 'info' | 'success' | 'neutral';

type SignalMark = { icon: IconName; avatar?: never } | { avatar: AvatarProps; icon?: never };

interface SignalItem {
  id: string;
  icon: IconName;
  count?: number;
  label: string;
  tone: SignalTone;
  mark2?: SignalMark;
  iconOnly?: boolean;
  onClick?: () => void;
}

interface SignalStripProps {
  items: readonly SignalItem[];
  max?: number;
  iconOnly?: boolean;
  wrap?: boolean;
  'aria-label'?: string;
  className?: string;
}

export type { SignalItem, SignalMark, SignalStripProps, SignalTone };
