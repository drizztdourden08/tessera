/* @layer renderer-components @kind types */
import type { VirtualListReorder } from '../VirtualList.type';

interface ListThumbnailsInput<T> {
  reorder: VirtualListReorder<T>;
  items: readonly T[];
  indexOfKey: ReadonlyMap<string, number>;
  keys: readonly string[];
}

export type { ListThumbnailsInput };
