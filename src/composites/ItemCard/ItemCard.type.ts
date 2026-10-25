/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';
import type { StatusTone } from '../../primitives/Status';
import type { HeadingLevel } from '../../primitives/Title';
import type { ActionItem } from '../ActionBar';

type ItemCardLayout = 'top' | 'left';

type ItemCardMediaHeight = 'band' | 'auto';

type ItemCardDensity = 'normal' | 'compact';

type ItemCardMediaSize = 'band' | 'sm';

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
  mediaSize?: ItemCardMediaSize;
  density?: ItemCardDensity;
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

type ItemCardRowProps = ItemCardProps & { tile?: ReactNode };

type ItemCardBodyProps = ItemCardProps & { tile?: ReactNode };

interface ItemCardMediaProps {
  media?: ReactNode;
  tone?: ItemCardMediaTone;
  height?: ItemCardMediaHeight;
  tiled: boolean;
}

interface ItemCardHeadProps {
  tile: ReactNode;
  children: ReactNode;
}

export type {
  ItemCardBodyProps, ItemCardDensity, ItemCardDetailsProps, ItemCardFootProps, ItemCardHeadProps, ItemCardLayout, ItemCardMediaHeight, ItemCardMediaProps,
  ItemCardMediaSize, ItemCardMediaTone, ItemCardProps, ItemCardRowProps, ItemCardStatus, ItemCardTitleProps, ItemCardTopProps,
};
