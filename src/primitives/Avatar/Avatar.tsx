/* @layer renderer-components @kind component */
import { Tooltip } from '../Tooltip';
import { avatarClass } from './behavior/avatar-class';
import { AvatarFace } from './sub-components/AvatarFace';
import type { AvatarProps } from './Avatar.type';
import './Avatar.css';
import '../../theme/tag-hue.css';

const Avatar = (props: AvatarProps) => {
  const { label, initials, icon, size } = props;
  return (
    <Tooltip content={label}>
      <span className={avatarClass(props)} role="img" aria-label={label}>
        <AvatarFace initials={initials} icon={icon} size={size} />
      </span>
    </Tooltip>
  );
};

export { Avatar };
