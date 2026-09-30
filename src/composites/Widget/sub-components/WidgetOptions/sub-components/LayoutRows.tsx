/* @layer renderer-components @kind component */
import { SegmentedControl } from '../../../../../primitives/SegmentedControl';
import type { SegmentOption } from '../../../../../primitives/SegmentedControl/SegmentedControl.type';
import { Slider } from '../../../../../primitives/Slider';
import { Toggle } from '../../../../../primitives/Toggle';
import type { WidgetVisibility } from '../../../Widget.type';
import {
  DEFAULT_CONTEXT_LABEL, DEFAULT_MAKE_ROOM_HINT, OPACITY_MAX, OPACITY_MIN, OPACITY_STEP, SHOW_ALWAYS,
} from '../WidgetOptions.constants';
import type { LayoutRowsProps } from '../WidgetOptions.type';
import { OptionRow } from './OptionRow';
import { WindowRows } from './WindowRows';

const LayoutRows = (props: LayoutRowsProps) => {
  const {
    placement, makeRoom, makeRoomHint = DEFAULT_MAKE_ROOM_HINT, onMakeRoomChange, opacity, onOpacityChange, show,
    onShowChange, contextLabel = DEFAULT_CONTEXT_LABEL,
  } = props;
  const popped = placement === 'popped';
  const showOptions: SegmentOption<WidgetVisibility>[] = [SHOW_ALWAYS, { value: 'context-only', label: contextLabel }];

  return (
    <>
      {placement === 'docked' && (
        <OptionRow label="Make room" hint={makeRoomHint}><Toggle checked={makeRoom} onChange={onMakeRoomChange} /></OptionRow>
      )}
      {popped && <WindowRows {...props} />}
      <OptionRow label="Opacity">
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
        <OptionRow label="Show"><SegmentedControl<WidgetVisibility> value={show} options={showOptions} onChange={onShowChange} /></OptionRow>
      )}
    </>
  );
};

export { LayoutRows };
