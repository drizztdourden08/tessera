/* @layer renderer-components @kind types */
import type { CSSProperties, MouseEventHandler, ReactNode } from 'react';
import type { IconName } from '../../Icon/Icon.type';
import type { TagData, TagVariant } from '../Tag.type';

interface TagBodyProps {
  variant?: TagVariant;
  dot?: boolean;
  icon?: IconName;
  reason?: string;
  children: ReactNode;
}

interface TagFrameProps {
  cls: string;
  paint: CSSProperties | undefined;
  title?: string;
  disabled: boolean;
  data: TagData;
  body: ReactNode;
}

interface TagToggleProps extends TagFrameProps {
  role?: 'radio';
  selected: boolean;
  onSelect: () => void;
}

interface TagAnchorProps extends TagFrameProps {
  href: string;
  navigate?: (href: string) => void;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
  target?: string;
  rel?: string;
}

interface TagChipProps extends TagFrameProps {
  label: string;
  onRemove?: () => void;
}

export type { TagAnchorProps, TagBodyProps, TagChipProps, TagToggleProps };
