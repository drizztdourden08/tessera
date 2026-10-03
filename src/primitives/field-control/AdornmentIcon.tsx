/* @layer renderer-components @kind component */
import { Icon } from '../Icon';
import { isIconName } from '../Icon/behavior/is-icon-name';
import type { AdornmentIconProps } from './input-adornment.type';

const AdornmentIcon = (props: AdornmentIconProps) => {
  const { icon, size } = props;
  return typeof icon === 'string' && isIconName(icon) ? <Icon name={icon} size={size} /> : icon;
};

export { AdornmentIcon };
