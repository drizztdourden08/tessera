/* @layer stories @kind hook */
import { useState } from 'react';
import { PRESET_DEFAULTS, PRESETS } from './preset-samples.constants';
import type { SamplePreset } from './preset-samples.type';

const useSamplePresets = (start: readonly SamplePreset[] = PRESETS) => {
  const [items, setItems] = useState<readonly SamplePreset[]>(start);
  const rename = (id: string, name: string) => setItems((list) => list.map((p) => (p.id === id ? { ...p, name } : p)));
  const remove = (id: string) => setItems((list) => list.filter((p) => p.id !== id));
  const create = (name = 'New preset', game = 'A Link to the Past'): string => {
    const id = `new-${Date.now()}`;
    setItems((list) => [{ ...PRESET_DEFAULTS, id, name, game, notes: '', changes: 0 }, ...list]);
    return id;
  };
  const save = (preset: SamplePreset) => setItems((list) => list.map((p) => (p.id === preset.id ? preset : p)));
  return { items, rename, remove, create, save };
};

export { useSamplePresets };
