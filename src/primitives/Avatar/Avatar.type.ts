/* @layer renderer-components @kind types */
import type { IconName } from '../Icon/Icon.type';
import type { TagCategoryColor } from '../Tag/Tag.type';

type AvatarSize = 'xs' | 'sm' | 'lg';

type AvatarVariant = 'default' | 'owner';

type AvatarStatus = 'running' | 'quiet' | 'fault' | 'none';

type AvatarShape = 'circle' | 'square';

type AvatarFace =
  | { initials: string; icon?: never; src?: never }
  | { icon: IconName; initials?: never; src?: never }
  | { src: string; initials?: never; icon?: never }
  | { initials?: never; icon?: never; src?: never };

interface AvatarBase {
  label: string;
  color?: TagCategoryColor;
  size?: AvatarSize;
  variant?: AvatarVariant;
  shape?: AvatarShape;
  status?: AvatarStatus;
  className?: string;
}

type AvatarProps = AvatarBase & AvatarFace;

interface AvatarFaceValue {
  src?: string;
  initials?: string;
  icon?: IconName;
}

export type { AvatarFaceValue, AvatarProps, AvatarShape, AvatarSize, AvatarStatus, AvatarVariant };
