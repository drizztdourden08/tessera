/* @layer renderer-components @kind logic */
import type { WidgetLayout } from '../Widget.type';
import type { WidgetPersistenceIO } from './widget-store.type';

const readProfileBlob = async (profileId: string, io: WidgetPersistenceIO): Promise<Record<string, unknown>> => {
  try {
    return (await io.load(profileId)) ?? {};
  } catch {
    return {};
  }
};

const saveLayoutForProfile = async (profileId: string, layout: WidgetLayout, io: WidgetPersistenceIO): Promise<void> => {
  const existing = await readProfileBlob(profileId, io);
  existing.widgetLayout = layout;
  await io.save(profileId, existing);
};

export { saveLayoutForProfile };
