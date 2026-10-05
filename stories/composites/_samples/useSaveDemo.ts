/* @layer stories @kind hook */
import { useEffect, useRef, useState } from 'react';
import type { SaveBarState } from '../../../src/composites';

const SAVE_DELAY = 700;

type SavePhase = 'idle' | 'saving' | 'saved' | 'error';

const stateOf = (phase: SavePhase, dirty: boolean): SaveBarState => {
  if (phase === 'saving' || phase === 'error') return phase;
  if (dirty) return 'dirty';
  return phase === 'saved' ? 'saved' : 'clean';
};

const useSaveDemo = (dirty: boolean) => {
  const [phase, setPhase] = useState<SavePhase>('idle');
  const timer = useRef<number | undefined>(undefined);
  useEffect(() => () => window.clearTimeout(timer.current), []);
  const run = (commit: () => string | undefined): Promise<boolean> => new Promise((resolve) => {
    setPhase('saving');
    timer.current = window.setTimeout(() => {
      const failed = commit() !== undefined;
      setPhase(failed ? 'error' : 'saved');
      resolve(!failed);
    }, SAVE_DELAY);
  });
  return { state: stateOf(phase, dirty), run, reset: () => setPhase('idle') };
};

export { useSaveDemo };
