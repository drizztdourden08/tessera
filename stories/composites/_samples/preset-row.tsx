/* @layer stories @kind util */
import type { ManagedListRowParts } from '../../../src/composites';
import { Status } from '../../../src/primitives';
import type { SamplePreset } from './preset-samples.type';

const presetRow = (preset: SamplePreset): ManagedListRowParts => ({
  meta: [`${preset.changes} changes`, preset.edited].filter(Boolean).join(' · '),
  columns: preset.missing ? [{ primary: <Status tone="warning">not installed</Status>, align: 'end' }] : undefined,
});

export { presetRow };
