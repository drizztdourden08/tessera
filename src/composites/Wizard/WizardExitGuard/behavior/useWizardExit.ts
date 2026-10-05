/* @layer renderer-components @kind hook */
import { useCallback } from 'react';
import { useUnsavedGuard } from '../../../../primitives/unsaved-guard/useUnsavedGuard';
import type { WizardExit, WizardExitOptions } from './useWizardExit.type';

const useWizardExit = (options: WizardExitOptions): WizardExit => {
  const { dirty, busy, onExit } = options;
  const guard = useUnsavedGuard<'exit'>({ dirty, busy, perform: onExit });
  const { request } = guard;
  const requestExit = useCallback(() => request('exit'), [request]);
  return {
    requestExit,
    guard: { open: guard.pending !== null || guard.blocked, blocked: guard.blocked, onDiscard: guard.discard, onStay: guard.stay },
  };
};

export { useWizardExit };
