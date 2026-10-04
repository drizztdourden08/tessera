/* @layer renderer-components @kind logic */
import type { WidgetId } from '../../DockLayout';
import type { WidgetDefinition } from '../Widget.type';
import type { WidgetManagerProps } from '../sub-components/WidgetManager.type';
import type { WindowRowsProps } from '../sub-components/WidgetOptions/WidgetOptions.type';

const windowRowsFor = <D extends WidgetDefinition>(props: WidgetManagerProps<D>, id: WidgetId): WindowRowsProps => {
  const { windowOptions, onWindowOptionsChange: change } = props;
  const own = windowOptions?.(id);
  if (own === undefined || change === undefined) return {};
  return {
    sync: own.sync,
    onSyncChange: (sync) => change(id, { sync }),
  };
};

export { windowRowsFor };
