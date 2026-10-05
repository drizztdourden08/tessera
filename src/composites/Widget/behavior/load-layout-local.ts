/* @layer renderer-components @kind logic */
import { readStored } from '../../../primitives/dom/read-stored';
import { DEFAULT_LAYOUT_STORAGE_KEY } from '../Widget.constants';
import type { WidgetLayout } from '../Widget.type';
import { createDefaultLayout } from './create-default-layout';
import { migrateLayout } from './migrate-layout';

const storedLayout = (stored: unknown): WidgetLayout | undefined => (stored === null ? undefined : migrateLayout(stored));

const loadLayoutLocal = (storageKey = DEFAULT_LAYOUT_STORAGE_KEY, preset?: WidgetLayout): WidgetLayout =>
  readStored(storageKey, storedLayout) ?? preset ?? createDefaultLayout();

export { loadLayoutLocal };
