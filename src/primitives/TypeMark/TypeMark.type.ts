/* @layer renderer-components @kind types */
import type { IconName } from '../Icon/Icon.type';
import type { TagCategoryColor } from '../Tag/Tag.type';

type TypeMarkSize = 'xs' | 'sm';

type TypeMarkVariant = 'tile' | 'outline';

interface TypeMarkProps {
  icon: IconName;
  label: string;
  color?: TagCategoryColor;
  size?: TypeMarkSize;
  variant?: TypeMarkVariant;
  className?: string;
}

export type { TypeMarkProps, TypeMarkSize, TypeMarkVariant };
