/* @layer renderer-components @kind logic */
import { writeStored } from '../../../primitives/dom/write-stored';
import type { WidgetLayout } from '../Widget.type';
import { DEFAULT_LAYOUT_STORAGE_KEY } from '../Widget.constants';

const saveLayoutLocal = (layout: WidgetLayout, storageKey = DEFAULT_LAYOUT_STORAGE_KEY): boolean => writeStored(storageKey, layout);

export { saveLayoutLocal };
