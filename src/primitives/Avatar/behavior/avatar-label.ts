/* @layer renderer-components @kind util */
import { AVATAR_STATUS_WORD } from '../Avatar.constants';
import type { AvatarProps } from '../Avatar.type';

const avatarLabel = (props: AvatarProps): string => {
  const { label, status = 'none' } = props;
  return status === 'none' ? label : `${label}, ${AVATAR_STATUS_WORD[status]}`;
};

export { avatarLabel };
