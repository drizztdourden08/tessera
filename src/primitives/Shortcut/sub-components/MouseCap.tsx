/* @layer renderer-components @kind component */
import { Icon } from '../../Icon';
import { MOUSE_SPECS } from './MouseCap.constants';
import type { MouseCapProps } from './MouseCap.type';

const MouseCap = (props: MouseCapProps) => {
  const { button } = props;
  const { name, icon } = MOUSE_SPECS[button];
  return (
    <span className="shortcut__mouse">
      <Icon icon={icon} className="shortcut__mouse-icon" />
      <span className="shortcut__spoken">{name}</span>
    </span>
  );
};

export { MouseCap };
