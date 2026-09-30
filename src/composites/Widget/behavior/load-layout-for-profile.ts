/* @layer renderer-components @kind logic */
import type { WidgetLayout } from '../Widget.type';
import { loadLayoutLocal } from './load-layout-local';
import { migrateLayout } from './migrate-layout';
import type { LocalLayoutSource, WidgetPersistenceIO } from './widget-store.type';

const readProfileLayout = async (profileId: string, io: WidgetPersistenceIO): Promise<WidgetLayout | null> => {
  try {
    const state = await io.load(profileId);
    return state?.widgetLayout ? migrateLayout(state.widgetLayout) : null;
  } catch {
    return null;
  }
};

const loadLayoutForProfile = async (
  profileId: string,
  io: WidgetPersistenceIO,
  fallback: LocalLayoutSource = {},
): Promise<WidgetLayout> =>
  (await readProfileLayout(profileId, io)) ?? loadLayoutLocal(fallback.storageKey, fallback.preset);

export { loadLayoutForProfile };
