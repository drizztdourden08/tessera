/* @layer renderer-components @kind component */
import { Icon } from '../../Icon';
import { AVATAR_ICON_SIZE, AVATAR_INITIALS_MAX } from '../Avatar.constants';
import type { AvatarProps } from '../Avatar.type';

const AvatarFace = (props: Pick<AvatarProps, 'initials' | 'icon' | 'size'>) => {
  const { initials, icon, size = 'xs' } = props;
  if (icon !== undefined) return <Icon name={icon} size={AVATAR_ICON_SIZE[size]} aria-hidden />;
  return initials === undefined ? null : <>{initials.slice(0, AVATAR_INITIALS_MAX)}</>;
};

export { AvatarFace };
