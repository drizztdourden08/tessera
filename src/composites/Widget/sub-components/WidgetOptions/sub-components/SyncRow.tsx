/* @layer renderer-components @kind component */
import { Toggle } from '../../../../../primitives/Toggle';
import { useTesseraStrings } from '../../../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import type { SyncRowProps } from '../WidgetOptions.type';
import { ControlMenuRow } from '../../../../ControlMenu';

const SyncRow = (props: SyncRowProps) => {
  const { sync, onSyncChange } = props;
  const { widgets } = useTesseraStrings();
  const hint = sync ? { label: widgets.syncOn, description: widgets.syncOnHint } : { label: widgets.syncOff, description: widgets.syncOffHint };
  return (
    <ControlMenuRow label={widgets.sync} about={widgets.syncAbout}>
      <Toggle size="sm" checked={sync} onChange={onSyncChange} aria-label={widgets.sync} hint={hint} />
    </ControlMenuRow>
  );
};

export { SyncRow };
