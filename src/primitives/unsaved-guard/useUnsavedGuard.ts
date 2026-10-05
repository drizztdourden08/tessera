/* @layer renderer-components @kind hook */
import { useCallback, useState } from 'react';
import { settleSave } from './settle-save';
import { unsavedAsk } from './unsaved-ask';
import type { UnsavedGuard, UnsavedGuardOptions } from './unsaved-guard.type';

const useUnsavedGuard = <M,>(options: UnsavedGuardOptions<M>): UnsavedGuard<M> => {
  const { dirty, busy = false, onSave, onDiscard, perform } = options;
  const [pending, setPending] = useState<M | null>(null);
  const [blocked, setBlocked] = useState(false);
  const [saving, setSaving] = useState(false);

  const request = useCallback((move: M) => {
    const ask = unsavedAsk(dirty, busy);
    if (ask === 'wait') setBlocked(true);
    else if (ask === 'ask') setPending(move);
    else perform(move);
  }, [dirty, busy, perform]);

  const stay = useCallback(() => {
    setPending(null);
    setBlocked(false);
  }, []);

  const discard = useCallback(() => {
    if (pending === null) return;
    setPending(null);
    onDiscard?.();
    perform(pending);
  }, [pending, onDiscard, perform]);

  const save = useCallback(async () => {
    if (pending === null || !onSave) return;
    setSaving(true);
    const saved = await settleSave(onSave);
    setSaving(false);
    setPending(null);
    if (saved) perform(pending);
  }, [pending, onSave, perform]);

  return { pending, blocked, saving, request, stay, discard, save: onSave ? () => void save() : undefined };
};

export { useUnsavedGuard };
