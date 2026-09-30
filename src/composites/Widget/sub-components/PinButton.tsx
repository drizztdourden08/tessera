/* @layer renderer-components @kind component */
import { Icon } from '../../../primitives/Icon';
import { IconButton } from '../../../primitives/IconButton';
import { PIN_ICONS, PIN_NEXT, PIN_TITLES } from '../Widget.constants';
import type { PinButtonProps } from './PinButton.type';

const PinButton = (props: PinButtonProps) => {
  const { pin, onTop, onChange } = props;
  return (
    <IconButton className="widget__btn" label={PIN_TITLES[pin]} title={PIN_TITLES[pin]} active={onTop} onClick={() => onChange(PIN_NEXT[pin])}>
      <Icon name={PIN_ICONS[pin]} size={12} />
    </IconButton>
  );
};

export { PinButton };
