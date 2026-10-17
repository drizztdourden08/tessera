/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';

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

type TagAction =
  | { onRemove?: () => void; name?: string; selected?: never; onSelect?: never; role?: never }
  | { selected: boolean; onSelect: () => void; role?: 'radio'; onRemove?: never; name?: never };

type TagData = Partial<Record<`data-${string}`, string | number>>;

interface TagBase {
  disabled?: boolean;
  title?: string;
  className?: string;
  children: ReactNode;
}

type TagProps = TagLook & TagAction & TagBase & TagData;

export type {
  TagCategoryColor, TagColor, TagCustomColor, TagLook, TagNormalColor, TagProps, TagUrgencyColor, TagVariant,
};
