/* @layer renderer-components @kind types */
import type { WidgetDefinition, WidgetLayout } from '../Widget.type';
import type { WidgetPersistenceIO } from './widget-store.type';

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

type LayoutUpdater = (prev: WidgetLayout) => WidgetLayout;

export type { LayoutUpdater, StartupOverride, UseWidgetLayoutParams };
