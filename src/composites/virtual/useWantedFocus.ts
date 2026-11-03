/* @layer renderer-components @kind hook */
import { useEffect } from 'react';
import type { RefObject } from 'react';

const useWantedFocus = (wanted: RefObject<string | null>, indexOfKey: ReadonlyMap<string, number>, focusItem: (index: number) => void): void => {
  useEffect(() => {
    const key = wanted.current;
    const at = key === null ? undefined : indexOfKey.get(key);
    if (at === undefined) return;
    wanted.current = null;
    focusItem(at);
  });
};

export { useWantedFocus };
