/* @layer renderer-components @kind logic */
import { DEFAULT_LAYOUT_STORAGE_KEY } from '../Widget.constants';
import type { WidgetLayout } from '../Widget.type';
import { createDefaultLayout } from './create-default-layout';
import { migrateLayout } from './migrate-layout';

const readLocalLayout = (storageKey: string): WidgetLayout | null => {
  try {
    const raw = localStorage.getItem(storageKey);
    return raw ? migrateLayout(JSON.parse(raw)) : null;
  } catch {
    return null;
  }
};

const loadLayoutLocal = (storageKey = DEFAULT_LAYOUT_STORAGE_KEY, preset?: WidgetLayout): WidgetLayout =>
  readLocalLayout(storageKey) ?? preset ?? createDefaultLayout();

export { loadLayoutLocal };
