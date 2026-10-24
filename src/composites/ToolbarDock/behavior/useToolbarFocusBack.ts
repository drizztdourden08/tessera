/* @layer renderer-components @kind hook */
import { useEffect } from 'react';
import type { RefObject } from 'react';
import { focusToolbarHandle } from './focus-toolbar-handle';

const useToolbarFocusBack = (rootRef: RefObject<HTMLElement | null>, restore: RefObject<string | null>): void => {
  useEffect(() => {
    const root = rootRef.current;
    if (!root || restore.current === null) return;
    focusToolbarHandle(root, restore.current);
    restore.current = null;
  });
};

export { useToolbarFocusBack };
