/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';
import type { StatusTone } from '../../primitives/Status';
import type { HeadingLevel } from '../../primitives/Title';
import type { ActionItem } from '../ActionBar';

type ItemCardLayout = 'top' | 'left';

type ItemCardMediaHeight = 'band' | 'auto';

type ItemCardMediaTone = 'neutral' | 'primary' | 'info' | 'success' | 'warning' | 'danger';

interface ItemCardStatus {
  label: string;
  tone: StatusTone;
}

interface ItemCardProps {
  title: ReactNode;
  eyebrow?: ReactNode;
  status?: ItemCardStatus;
  tags?: readonly ReactNode[];
  details?: readonly ReactNode[];
  media?: ReactNode;
  mediaTone?: ItemCardMediaTone;
  mediaHeight?: ItemCardMediaHeight;
  layout?: ItemCardLayout;
  href?: string;
  navigate?: (href: string) => void;
  actions?: readonly ActionItem[];
  selected?: boolean;
  onOpen?: () => void;
  level?: HeadingLevel;
  className?: string;
}

type ItemCardTitleProps = Pick<ItemCardProps, 'title' | 'href' | 'navigate' | 'onOpen' | 'selected'> & { level: HeadingLevel };

interface ItemCardDetailsProps {
  details: readonly ReactNode[];
}

type ItemCardTopProps = Pick<ItemCardProps, 'eyebrow' | 'status'>;

type ItemCardFootProps = Pick<ItemCardProps, 'tags' | 'details' | 'actions'>;

export type {
  ItemCardDetailsProps, ItemCardFootProps, ItemCardLayout, ItemCardMediaHeight, ItemCardMediaTone, ItemCardProps, ItemCardStatus, ItemCardTitleProps, ItemCardTopProps,
};
