/* @layer stories @kind util */
import { PRESET_DEFAULTS } from './preset-samples.constants';
import type { PresetOptions, SamplePreset } from './preset-samples.type';

const presetOptionRow = (preset: SamplePreset, onChange: (patch: Partial<SamplePreset>) => void, key: keyof PresetOptions) => ({
  changed: preset[key] !== PRESET_DEFAULTS[key],
  onReset: () => onChange({ [key]: PRESET_DEFAULTS[key] }),
});

export { presetOptionRow };
