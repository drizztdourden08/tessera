/* @layer renderer-components @kind component */
import { useTesseraStrings } from '../../../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import type { PinMode } from '../../../Widget.type';
import { PIN_CHOICES, SNAP_CHOICES } from '../WidgetOptions.constants';
import type { SnapChoice, WindowRowsProps } from '../WidgetOptions.type';
import { ChoiceRow } from './ChoiceRow';
import { GroupRow } from './GroupRow';
import { SyncRow } from './SyncRow';

const WindowRows = (props: WindowRowsProps) => {
  const { pin, onPinChange, snap, onSnapChange, sync, onSyncChange, group, groups, onGroupChange } = props;
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
      {sync !== undefined && onSyncChange && <SyncRow sync={sync} onSyncChange={onSyncChange} />}
      {group !== undefined && onGroupChange && <GroupRow group={group} groups={groups} onGroupChange={onGroupChange} />}
    </>
  );
};

export { WindowRows };
