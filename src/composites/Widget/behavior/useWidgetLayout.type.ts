/* @layer renderer-components @kind types */
import type { WidgetDefinition, WidgetLayout } from '../Widget.type';
import type { WidgetPersistenceIO } from './widgetStore.type';

interface StartupOverride {
  fresh: boolean;
  widgets: string[];
}

interface UseWidgetLayoutParams {
  definitions: readonly WidgetDefinition[];
  profileId: string | null;
  io: WidgetPersistenceIO;
  startup?: StartupOverride;
  storageKey?: string;
  preset?: WidgetLayout;
}

export type { StartupOverride, UseWidgetLayoutParams };
