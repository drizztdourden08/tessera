/* @layer renderer-components @kind hook */
import { useLayoutEffect } from 'react';
import type { RefObject } from 'react';
import { anchorNames } from './anchor-names';
import { ANCHOR_NAME_PROPERTY as PROPERTY } from './useAnchorName.constants';

const useAnchorName = (active: boolean, anchorRef: RefObject<HTMLElement | null>, name: string): void => {
  useLayoutEffect(() => {
    const anchor = anchorRef.current;
    if (!active || !anchor) return undefined;
    anchor.style.setProperty(PROPERTY, anchorNames(anchor.style.getPropertyValue(PROPERTY), name, null));
    return () => {
      const rest = anchorNames(anchor.style.getPropertyValue(PROPERTY), null, name);
      if (rest === '') anchor.style.removeProperty(PROPERTY);
      else anchor.style.setProperty(PROPERTY, rest);
    };
  }, [active, anchorRef, name]);
};

export { useAnchorName };
