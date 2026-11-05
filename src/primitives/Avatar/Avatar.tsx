/* @layer renderer-components @kind component */
import { Tooltip } from '../Tooltip';
import { avatarClass } from './behavior/avatar-class';
import { avatarLabel } from './behavior/avatar-label';
import { useAvatarFace } from './behavior/useAvatarFace';
import { AvatarFace } from './sub-components/AvatarFace';
import { AvatarStatusDot } from './sub-components/AvatarStatusDot';
import type { AvatarProps } from './Avatar.type';
import './Avatar.css';
import '../../theme/tag-hue.css';

const Avatar = (props: AvatarProps) => {
  const { size, status } = props;
  const label = avatarLabel(props);
  const { face, onImageError } = useAvatarFace(props);
  return (
    <Tooltip content={label}>
      <span className={avatarClass(props, face)} role="img" aria-label={label}>
        <AvatarFace face={face} size={size} onImageError={onImageError} />
        <AvatarStatusDot status={status} />
      </span>
    </Tooltip>
  );
};

export { Avatar };
