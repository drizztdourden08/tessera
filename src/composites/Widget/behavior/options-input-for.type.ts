/* @layer renderer-components @kind types */
import type { Rect } from '../../DockLayout';
import type { WidgetOptionsMenuInput } from './widget-options-menu.type';

type OptionsPlace = Pick<WidgetOptionsMenuInput, 'makeRoomHint' | 'contextLabel' | 'own' | 'sync' | 'onSyncChange'> & {
  rect: Rect | null;
  main: Rect | null;
};

export type { OptionsPlace };
