/* @layer renderer-components @kind component */
import { SegmentedControl } from '../../../../../primitives/SegmentedControl';
import type { SegmentOption } from '../../../../../primitives/SegmentedControl/SegmentedControl.type';
import { Slider } from '../../../../../primitives/Slider';
import { useTesseraStrings } from '../../../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { Toggle } from '../../../../../primitives/Toggle';
import type { WidgetVisibility } from '../../../Widget.type';
import { OPACITY_MAX, OPACITY_MIN, OPACITY_STEP } from '../WidgetOptions.constants';
import type { LayoutRowsProps } from '../WidgetOptions.type';
import { OptionRow } from './OptionRow';
import { WindowRows } from './WindowRows';

const LayoutRows = (props: LayoutRowsProps) => {
  const { placement, makeRoom, makeRoomHint, onMakeRoomChange, opacity, onOpacityChange, show, onShowChange, contextLabel } = props;
  const { widgets } = useTesseraStrings();
  const popped = placement === 'popped';
  const showOptions: SegmentOption<WidgetVisibility>[] = [
    { value: 'always', label: widgets.showAlways },
    { value: 'context-only', label: contextLabel ?? widgets.contextLabel },
  ];

  return (
    <>
      {placement === 'docked' && (
        <OptionRow label={widgets.makeRoom} hint={makeRoomHint ?? widgets.makeRoomHint}><Toggle checked={makeRoom} onChange={onMakeRoomChange} /></OptionRow>
      )}
      {popped && <WindowRows {...props} />}
      <OptionRow label={widgets.opacity}>
        <Slider
          value={Math.round(opacity * OPACITY_MAX)}
          min={OPACITY_MIN}
          max={OPACITY_MAX}
          step={OPACITY_STEP}
          onChange={(v) => onOpacityChange(v / OPACITY_MAX)}
          showValue
          formatValue={(v) => `${v}%`}
        />
      </OptionRow>
      {!popped && (
        <OptionRow label={widgets.show}><SegmentedControl<WidgetVisibility> value={show} options={showOptions} onChange={onShowChange} /></OptionRow>
      )}
    </>
  );
};

export { LayoutRows };
