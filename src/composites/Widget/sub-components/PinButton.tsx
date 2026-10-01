/* @layer renderer-components @kind component */
import { Icon } from '../../../primitives/Icon';
import { IconButton } from '../../../primitives/IconButton';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { PIN_ICONS, PIN_NEXT } from '../Widget.constants';
import type { PinButtonProps } from './PinButton.type';

const PinButton = (props: PinButtonProps) => {
  const { pin, onTop, onChange } = props;
  const { widgets } = useTesseraStrings();
  const titles = { off: widgets.pinTitleOff, top: widgets.pinTitleTop, 'with-app': widgets.pinTitleWithApp };
  return (
    <IconButton className="widget__btn" label={titles[pin]} title={titles[pin]} active={onTop} onClick={() => onChange(PIN_NEXT[pin])}>
      <Icon name={PIN_ICONS[pin]} size={12} />
    </IconButton>
  );
};

export { PinButton };
