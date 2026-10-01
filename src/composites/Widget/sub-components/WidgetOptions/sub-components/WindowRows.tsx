/* @layer renderer-components @kind component */
import { useTesseraStrings } from '../../../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import type { PinMode } from '../../../Widget.type';
import { PIN_CHOICES, SNAP_CHOICES } from '../WidgetOptions.constants';
import type { SnapChoice, WindowRowsProps } from '../WidgetOptions.type';
import { ChoiceRow } from './ChoiceRow';

const WindowRows = (props: WindowRowsProps) => {
  const { pin, onPinChange, snap, onSnapChange } = props;
  const { widgets } = useTesseraStrings();
  return (
    <>
      {pin !== undefined && onPinChange && (
        <ChoiceRow<PinMode> label={widgets.pin} value={pin} choices={PIN_CHOICES} words={widgets} onChange={onPinChange} />
      )}
      {snap !== undefined && onSnapChange && (
        <ChoiceRow<SnapChoice>
          label={widgets.snap}
          value={snap ? 'snap' : 'free'}
          choices={SNAP_CHOICES}
          words={widgets}
          onChange={(next) => onSnapChange(next === 'snap')}
        />
      )}
    </>
  );
};

export { WindowRows };
