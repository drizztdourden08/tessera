/* @layer renderer-components @kind util */
import { tagHueClass } from '../../tag-hue/tag-hue-class';
import type { AvatarFaceValue, AvatarProps } from '../Avatar.type';

const isBlank = (face: AvatarFaceValue): boolean => face.initials === undefined && face.icon === undefined && face.src === undefined;

const avatarClass = (props: AvatarProps, face: AvatarFaceValue): string => {
  const { color, size = 'xs', variant = 'default', shape = 'circle', className } = props;
  return [
    'avatar',
    `avatar--${size}`,
    tagHueClass(color),
    variant === 'owner' && 'avatar--owner',
    shape === 'square' && 'avatar--square',
    isBlank(face) && 'avatar--unassigned',
    className,
  ].filter(Boolean).join(' ');
};

export { avatarClass };
