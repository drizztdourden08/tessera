/* @layer renderer-components @kind component */
import { SegmentedControl } from '../../../../../primitives/SegmentedControl';
import type { SegmentOption } from '../../../../../primitives/SegmentedControl/SegmentedControl.type';
import { useTesseraStrings } from '../../../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { Small } from '../../../../../primitives/text-elements';
import { Toggle } from '../../../../../primitives/Toggle';
import type { PinMode } from '../../../Widget.type';
import type { WindowRowsProps } from '../WidgetOptions.type';
import { OptionRow } from './OptionRow';

const WindowRows = (props: WindowRowsProps) => {
  const { pin, onPinChange, snap, onSnapChange } = props;
  const { widgets } = useTesseraStrings();
  const pinOptions: SegmentOption<PinMode>[] = [
    { value: 'off', label: widgets.pinOff, title: widgets.pinOffTitle },
    { value: 'top', label: widgets.pinOnTop, title: widgets.pinOnTopTitle },
    { value: 'with-app', label: widgets.pinWithApp, title: widgets.pinWithAppTitle },
  ];
  return (
    <>
      {pin !== undefined && onPinChange && (
        <>
          <Small tone="muted" className="widget-options__section">{widgets.windowSection}</Small>
          <OptionRow label={widgets.pin} hint={widgets.pinHint}>
            <SegmentedControl<PinMode> value={pin} options={pinOptions} onChange={onPinChange} />
          </OptionRow>
        </>
      )}
      {snap !== undefined && onSnapChange && (
        <OptionRow label={widgets.snapToEdges} hint={widgets.snapHint}><Toggle checked={snap} onChange={onSnapChange} /></OptionRow>
      )}
    </>
  );
};

export { WindowRows };
