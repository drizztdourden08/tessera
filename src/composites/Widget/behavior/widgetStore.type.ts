/* @layer renderer-components @kind types */
import type { WidgetLayout } from '../Widget.type';

interface WidgetPersistenceIO {
  load: (profileId: string) => Promise<Record<string, unknown> | null>;
  save: (profileId: string, blob: Record<string, unknown>) => Promise<void>;
}

interface LocalLayoutSource {
  storageKey?: string;
  preset?: WidgetLayout;
}

export type { LocalLayoutSource, WidgetPersistenceIO };
