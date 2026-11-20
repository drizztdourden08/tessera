/* @layer renderer-components @kind component */
import { Icon } from '../../Icon';
import { useTesseraStrings } from '../../TesseraProvider/behavior/useTesseraStrings';
import { DRAG_ICON, MOUSE_SPECS } from './MouseCap.constants';
import type { MouseCapProps } from './MouseCap.type';

const MouseCap = (props: MouseCapProps) => {
  const { button } = props;
  const { icon } = MOUSE_SPECS[button];
  const name = useTesseraStrings().keys[`mouse-${button}`];
  const drag = button === 'drag';
  return (
    <span className={drag ? 'shortcut__mouse shortcut__mouse--drag' : 'shortcut__mouse'}>
      <Icon icon={icon} className="shortcut__mouse-icon" />
      {drag ? <Icon name={DRAG_ICON} className="shortcut__drag" /> : null}
      <span className="shortcut__spoken">{name}</span>
    </span>
  );
};

export { MouseCap };
