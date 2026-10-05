/* @layer stories @kind component */
import { SaveBar } from '../../../src/composites';
import { Box, Field, NumberInput, Tag, Text } from '../../../src/primitives';
import type { PresetEditorProps } from './preset-samples.type';
import './PresetEditor.css';

const PresetEditor = ({ preset, state, error, onChange, onSave, onDiscard }: PresetEditorProps) => (
  <Box className="preset-editor">
    <Box className="preset-editor__head">
      <Text variant="title">{preset.name}</Text>
      <Tag variant="category" color="violet">{preset.game}</Tag>
    </Box>
    <Field label="Crystals for Ganon's Tower" hint="Default 7.">
      <NumberInput buttons="sides" value={preset.tower} min={0} max={7} onChange={(tower) => onChange({ tower })} />
    </Field>
    <Field label="Crystals for Ganon" hint="Default 7.">
      <NumberInput buttons="sides" value={preset.ganon} min={0} max={7} onChange={(ganon) => onChange({ ganon })} />
    </Field>
    <SaveBar className="preset-editor__bar" state={state} error={error} onSave={onSave} onDiscard={onDiscard} />
  </Box>
);

export { PresetEditor };
