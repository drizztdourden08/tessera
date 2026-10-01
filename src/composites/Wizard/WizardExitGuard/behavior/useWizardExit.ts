/* @layer renderer-components @kind hook */
import { useCallback, useState } from 'react';
import type { WizardExit, WizardExitOptions } from './useWizardExit.type';

const useWizardExit = (options: WizardExitOptions): WizardExit => {
  const { dirty, busy, onExit } = options;
  const [asking, setAsking] = useState<'discard' | 'blocked' | null>(null);
  const requestExit = useCallback(() => {
    if (busy) setAsking('blocked');
    else if (dirty) setAsking('discard');
    else onExit();
  }, [busy, dirty, onExit]);
  const onDiscard = useCallback(() => {
    setAsking(null);
    onExit();
  }, [onExit]);
  const onStay = useCallback(() => setAsking(null), []);
  return { requestExit, guard: { open: asking !== null, blocked: asking === 'blocked', onDiscard, onStay } };
};

export { useWizardExit };
