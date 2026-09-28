/* @layer renderer-components @kind logic */
import type { WidgetDefinition, WidgetLayout } from '../Widget.type';
import { ensureAllWidgets } from './ensureAllWidgets';
import { loadLayoutLocal } from './loadLayoutLocal';
import type { LocalLayoutSource, WidgetPersistenceIO } from './widgetStore.type';

const readProfileLayout = async (
  profileId: string,
  io: WidgetPersistenceIO,
  definitions: readonly WidgetDefinition[],
): Promise<WidgetLayout | null> => {
  try {
    const state = await io.load(profileId);
    const layout = state?.widgetLayout as WidgetLayout | undefined;
    return layout ? ensureAllWidgets(layout, definitions) : null;
  } catch {
    return null;
  }
};

const loadLayoutForProfile = async (
  profileId: string,
  io: WidgetPersistenceIO,
  definitions: readonly WidgetDefinition[],
  fallback: LocalLayoutSource = {},
): Promise<WidgetLayout> =>
  (await readProfileLayout(profileId, io, definitions))
  ?? loadLayoutLocal(definitions, fallback.storageKey, fallback.preset);

export { loadLayoutForProfile };
