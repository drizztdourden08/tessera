/* @layer renderer-components @kind component */
import { Icon } from '../../Icon';
import type { BadgeIconProps } from './BadgeIcon.type';

const BadgeIcon = ({ icon }: BadgeIconProps) => (icon === undefined ? null : <Icon name={icon} size={10} aria-hidden />);

export { BadgeIcon };
