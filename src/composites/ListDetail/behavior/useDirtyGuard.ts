/* @layer renderer-components @kind hook */
import { useCallback, useState } from 'react';
import type { DirtyGuard, DirtyGuardOptions, ListDetailMove } from '../ListDetail.type';

const useDirtyGuard = (options: DirtyGuardOptions): DirtyGuard => {
  const { dirty, onSave, onDiscard, perform } = options;
  const [pending, setPending] = useState<ListDetailMove | null>(null);
  const [saving, setSaving] = useState(false);

  const request = useCallback((move: ListDetailMove) => {
    if (dirty) setPending(move);
    else perform(move);
  }, [dirty, perform]);

  const stay = useCallback(() => setPending(null), []);

  const discard = useCallback(() => {
    if (!pending) return;
    setPending(null);
    onDiscard?.();
    perform(pending);
  }, [pending, onDiscard, perform]);

  const save = useCallback(async () => {
    if (!pending || !onSave) return;
    setSaving(true);
    const saved = await Promise.resolve(onSave()).then((result) => result !== false, () => false);
    setSaving(false);
    setPending(null);
    if (saved) perform(pending);
  }, [pending, onSave, perform]);

  return { pending, saving, request, stay, discard, save: onSave ? () => void save() : undefined };
};

export { useDirtyGuard };
