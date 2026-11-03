/* @layer renderer-components @kind util */
import { tagHueClass } from '../../tag-hue/tag-hue-class';
import type { AvatarProps } from '../Avatar.type';

const avatarClass = (props: AvatarProps): string => {
  const { color, size = 'xs', variant = 'default', initials, icon, className } = props;
  return [
    'avatar',
    `avatar--${size}`,
    tagHueClass(color),
    variant === 'owner' && 'avatar--owner',
    initials === undefined && icon === undefined && 'avatar--unassigned',
    className,
  ].filter(Boolean).join(' ');
};

export { avatarClass };
