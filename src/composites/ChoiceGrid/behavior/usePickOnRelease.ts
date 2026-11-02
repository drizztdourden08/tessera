/* @layer renderer-components @kind hook */
import { useEffect } from 'react';
import type { RefObject } from 'react';
import { choiceReleasePick } from './choice-release-pick';

const usePickOnRelease = (rootRef: RefObject<HTMLElement | null>, enabled: boolean, pick: (index: number) => void): void => {
  useEffect(() => {
    if (!enabled) return undefined;
    const release = choiceReleasePick(rootRef, pick);
    window.addEventListener('pointerup', release, true);
    return () => window.removeEventListener('pointerup', release, true);
  }, [enabled, rootRef, pick]);
};

export { usePickOnRelease };
