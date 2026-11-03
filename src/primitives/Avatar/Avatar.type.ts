/* @layer renderer-components @kind types */
import type { IconName } from '../Icon/Icon.type';
import type { TagCategoryColor } from '../Tag/Tag.type';

type AvatarSize = 'xs' | 'sm';

type AvatarVariant = 'default' | 'owner';

type AvatarFace =
  | { initials: string; icon?: never }
  | { icon: IconName; initials?: never }
  | { initials?: never; icon?: never };

interface AvatarBase {
  label: string;
  color?: TagCategoryColor;
  size?: AvatarSize;
  variant?: AvatarVariant;
  className?: string;
}

type AvatarProps = AvatarBase & AvatarFace;

export type { AvatarProps, AvatarSize, AvatarVariant };
