/* @layer stories @kind component */
import { Box, Tag, Text } from '../../../src/primitives';
import type { SamplePreset } from './preset-samples.type';

const PresetEditorHead = ({ preset }: { preset: SamplePreset }) => (
  <Box className="preset-editor__head">
    <Box className="preset-editor__title">
      <Text variant="title">{preset.name}</Text>
      <Tag variant="category" color="violet">{preset.game}</Tag>
    </Box>
    <Text variant="caption">{[`${preset.changes} changes from the defaults`, preset.edited].filter(Boolean).join(' · ')}</Text>
  </Box>
);

export { PresetEditorHead };
