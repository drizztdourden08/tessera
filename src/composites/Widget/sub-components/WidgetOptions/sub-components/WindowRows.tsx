/* @layer renderer-components @kind component */
import { SegmentedControl } from '../../../../../primitives/SegmentedControl';
import { Small } from '../../../../../primitives/text-elements';
import { Toggle } from '../../../../../primitives/Toggle';
import type { PinMode } from '../../../Widget.type';
import { PIN_OPTIONS } from '../WidgetOptions.constants';
import type { WindowRowsProps } from '../WidgetOptions.type';
import { OptionRow } from './OptionRow';

const WindowRows = (props: WindowRowsProps) => {
  const { pin, onPinChange, snap, onSnapChange } = props;
  return (
    <>
      {pin !== undefined && onPinChange && (
        <>
          <Small tone="muted" className="widget-options__section">Window</Small>
          <OptionRow label="Pin" hint="With app: on top exactly when the app is">
            <SegmentedControl<PinMode> value={pin} options={PIN_OPTIONS} onChange={onPinChange} />
          </OptionRow>
        </>
      )}
      {snap !== undefined && onSnapChange && (
        <OptionRow label="Snap to edges" hint="The app's and other widgets' windows"><Toggle checked={snap} onChange={onSnapChange} /></OptionRow>
      )}
    </>
  );
};

export { WindowRows };
