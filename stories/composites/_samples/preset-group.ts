/* @layer stories @kind util */
import type { SamplePreset } from './preset-samples.type';

const presetGroup = (preset: SamplePreset): string => (preset.missing ? `${preset.game} · game not installed` : preset.game);

export { presetGroup };
