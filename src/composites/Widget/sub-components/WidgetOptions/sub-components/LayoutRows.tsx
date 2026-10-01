/* @layer renderer-components @kind component */
import { Slider } from '../../../../../primitives/Slider';
import { useTesseraStrings } from '../../../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import type { WidgetVisibility } from '../../../Widget.type';
import { OPACITY_MAX, OPACITY_MIN, OPACITY_STEP, ROOM_CHOICES, SHOW_CHOICES } from '../WidgetOptions.constants';
import type { LayoutRowsProps, RoomChoice } from '../WidgetOptions.type';
import { ChoiceRow } from './ChoiceRow';
import { OptionRow } from './OptionRow';
import { WindowRows } from './WindowRows';

const LayoutRows = (props: LayoutRowsProps) => {
  const { placement, makeRoom, makeRoomHint, onMakeRoomChange, opacity, onOpacityChange, show, onShowChange, contextLabel } = props;
  const { widgets } = useTesseraStrings();
  const words = { ...widgets, makeRoomHint: makeRoomHint ?? widgets.makeRoomHint, contextLabel: contextLabel ?? widgets.contextLabel };
  const percent = Math.round(opacity * OPACITY_MAX);

  return (
    <>
      {placement === 'docked' && (
        <ChoiceRow<RoomChoice>
          label={widgets.mainView}
          value={makeRoom ? 'room' : 'overlay'}
          choices={ROOM_CHOICES}
          words={words}
          onChange={(next) => onMakeRoomChange(next === 'room')}
        />
      )}
      {placement === 'popped' && <WindowRows {...props} />}
      {placement !== 'popped' && (
        <ChoiceRow<WidgetVisibility> label={widgets.show} value={show} choices={SHOW_CHOICES} words={words} onChange={onShowChange} />
      )}
      <OptionRow label={widgets.opacity}>
        <Slider
          size="sm"
          value={percent}
          min={OPACITY_MIN}
          max={OPACITY_MAX}
          step={OPACITY_STEP}
          onChange={(v) => onOpacityChange(v / OPACITY_MAX)}
          formatValue={(v) => `${v}%`}
          hint={{ label: widgets.opacityValue(percent), description: widgets.opacityHint }}
        />
      </OptionRow>
    </>
  );
};

export { LayoutRows };
