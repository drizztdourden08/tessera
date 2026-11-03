/* @layer renderer-components @kind component */
import { Tooltip } from '../Tooltip';
import { avatarClass } from './behavior/avatar-class';
import { useAvatarFace } from './behavior/useAvatarFace';
import { AvatarFace } from './sub-components/AvatarFace';
import type { AvatarProps } from './Avatar.type';
import './Avatar.css';
import '../../theme/tag-hue.css';

const Avatar = (props: AvatarProps) => {
  const { label, size } = props;
  const { face, onImageError } = useAvatarFace(props);
  return (
    <Tooltip content={label}>
      <span className={avatarClass(props, face)} role="img" aria-label={label}>
        <AvatarFace face={face} label={label} size={size} onImageError={onImageError} />
      </span>
    </Tooltip>
  );
};

export { Avatar };
