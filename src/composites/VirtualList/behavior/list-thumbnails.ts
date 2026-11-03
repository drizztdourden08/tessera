/* @layer renderer-components @kind logic */
import { GHOST_LIMIT } from '../VirtualList.constants';
import type { ReactNode } from 'react';
import type { ListThumbnailsInput } from './list-thumbnails.type';

const listThumbnails = <T,>(input: ListThumbnailsInput<T>): readonly ReactNode[] => {
  const { reorder, items, indexOfKey, keys } = input;
  return keys.slice(0, GHOST_LIMIT).flatMap((key) => {
    const at = indexOfKey.get(key);
    const item = at === undefined ? undefined : items[at];
    return item === undefined || at === undefined ? [] : [reorder.renderThumbnail?.(item, at)];
  });
};

export { listThumbnails };
