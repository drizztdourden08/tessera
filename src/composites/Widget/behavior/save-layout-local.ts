/* @layer renderer-components @kind logic */
import type { WidgetLayout } from '../Widget.type';
import { DEFAULT_LAYOUT_STORAGE_KEY } from '../Widget.constants';

const saveLayoutLocal = (layout: WidgetLayout, storageKey = DEFAULT_LAYOUT_STORAGE_KEY): boolean => {
  try {
    localStorage.setItem(storageKey, JSON.stringify(layout));
    return true;
  } catch {
    return false;
  }
};

export { saveLayoutLocal };
