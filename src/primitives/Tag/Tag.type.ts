/* @layer renderer-components @kind types */
import type { MouseEventHandler, ReactNode } from 'react';
import type { SelectedTone } from '../field-control/selected-tone.type';
import type { IconName } from '../Icon/Icon.type';

type TagVariant = 'normal' | 'urgency' | 'category' | 'custom';

type TagNormalColor = 'neutral' | 'primary' | 'secondary' | 'tertiary';

type TagUrgencyColor = 'success' | 'warning' | 'danger' | 'info';

type TagCategoryColor = 'rose' | 'orange' | 'amber' | 'lime' | 'green' | 'teal' | 'cyan' | 'blue' | 'violet' | 'pink';

type TagColor = TagNormalColor | TagUrgencyColor | TagCategoryColor;

type TagCustomColor = `#${string}`;

type TagLook =
  | { variant?: 'normal'; color?: TagNormalColor }
  | { variant: 'urgency'; color: TagUrgencyColor }
  | { variant: 'category'; color: TagCategoryColor }
  | { variant: 'custom'; color: TagCustomColor };

interface TagNoLink {
  href?: never;
  navigate?: never;
  onClick?: never;
  target?: never;
  rel?: never;
}

type TagAction =
  | (TagNoLink & { onRemove?: () => void; name?: string; selected?: never; selectedTone?: never; onSelect?: never; role?: never })
  | (TagNoLink & { selected: boolean; selectedTone?: SelectedTone; onSelect: () => void; role?: 'radio'; onRemove?: never; name?: never })
  | {
    href: string;
    navigate?: (href: string) => void;
    onClick?: MouseEventHandler<HTMLAnchorElement>;
    target?: string;
    rel?: string;
    selected?: never;
    selectedTone?: never;
    onSelect?: never;
    role?: never;
    onRemove?: never;
    name?: never;
  };

type TagData = Partial<Record<`data-${string}`, string | number>>;

interface TagBase {
  pill?: boolean;
  outlined?: boolean;
  dot?: boolean;
  icon?: IconName;
  disabled?: boolean;
  title?: string;
  className?: string;
  children: ReactNode;
}

type TagProps = TagLook & TagAction & TagBase & TagData;

export type {
  TagCategoryColor, TagColor, TagCustomColor, TagData, TagLook, TagNormalColor, TagProps, TagUrgencyColor, TagVariant,
};
