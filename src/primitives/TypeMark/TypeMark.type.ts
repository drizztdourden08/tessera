/* @layer renderer-components @kind types */
import type { IconName } from '../Icon/Icon.type';
import type { StatusTone } from '../Status/Status.type';
import type { TagCategoryColor } from '../Tag/Tag.type';

type TypeMarkSize = 'xs' | 'sm';

type TypeMarkVariant = 'tile' | 'outline';

type TypeMarkTone = Extract<StatusTone, 'info' | 'success' | 'warning' | 'danger'>;

interface TypeMarkProps {
  icon: IconName;
  label: string;
  color?: TagCategoryColor;
  tone?: TypeMarkTone;
  size?: TypeMarkSize;
  variant?: TypeMarkVariant;
  className?: string;
}

export type { TypeMarkProps, TypeMarkSize, TypeMarkTone, TypeMarkVariant };
