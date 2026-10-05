/* @layer stories @kind hook */
import { useState } from 'react';
import type { SamplePreset } from './preset-samples.type';

const usePresetDraft = (saved: SamplePreset | undefined, startDirty: boolean) => {
  const [draft, setDraft] = useState<SamplePreset | null>(saved && startDirty ? { ...saved, tower: 5, ganon: 6, keysanity: false } : null);
  const dirty = draft !== null && draft.id === saved?.id && JSON.stringify(draft) !== JSON.stringify(saved);
  return { draft: dirty ? draft : saved, dirty, setDraft, clear: () => setDraft(null) };
};

export { usePresetDraft };
