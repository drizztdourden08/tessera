/* @layer renderer-components @kind component */
import { Icon } from '../../Icon';
import { AVATAR_ICON_SIZE, AVATAR_INITIALS_MAX } from '../Avatar.constants';
import { AvatarImage } from './AvatarImage';
import type { AvatarFaceProps } from './AvatarFace.type';

const AvatarFace = (props: AvatarFaceProps) => {
  const { face, size = 'xs', onImageError } = props;
  if (face.src !== undefined) return <AvatarImage src={face.src} onError={onImageError} />;
  if (face.icon !== undefined) return <Icon name={face.icon} size={AVATAR_ICON_SIZE[size]} aria-hidden />;
  return face.initials === undefined ? null : <>{face.initials.slice(0, AVATAR_INITIALS_MAX)}</>;
};

export { AvatarFace };
