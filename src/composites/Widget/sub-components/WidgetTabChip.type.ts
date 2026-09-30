/* @layer renderer-components @kind types */
import type { WidgetId } from '../../DockLayout';
import type { WidgetTab } from '../Widget.type';

interface WidgetTabChipProps {
  tab: WidgetTab;
  active: boolean;
  onActivate: (id: WidgetId) => void;
}

export type { WidgetTabChipProps };
