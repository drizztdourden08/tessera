/* @layer renderer-components @kind logic */
import type { WidgetDefinition, WidgetLayout } from '../Widget.type';
import { DEFAULT_LAYOUT_STORAGE_KEY } from '../Widget.constants';
import { ensureAllWidgets } from './ensureAllWidgets';
import { startingLayout } from './startingLayout';

const readLocalLayout = (definitions: readonly WidgetDefinition[], storageKey: string): WidgetLayout | null => {
  try {
    const raw = localStorage.getItem(storageKey);
    return raw ? ensureAllWidgets(JSON.parse(raw) as WidgetLayout, definitions) : null;
  } catch {
    return null;
  }
};

const loadLayoutLocal = (
  definitions: readonly WidgetDefinition[],
  storageKey = DEFAULT_LAYOUT_STORAGE_KEY,
  preset?: WidgetLayout,
): WidgetLayout => readLocalLayout(definitions, storageKey) ?? startingLayout(definitions, preset);

export { loadLayoutLocal };
