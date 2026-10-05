/* @layer stories @kind component */
import { Box, Button, Field, Icon, NumberInput, Status, Tag, Text } from '../../../src/primitives';
import type { PresetEditorProps } from './preset-samples.type';

const PresetEditor = ({ preset, dirty, onChange, onSave }: PresetEditorProps) => (
  <Box className="preset-editor">
    <Box className="preset-editor__head">
      <Text variant="title">{preset.name}</Text>
      <Tag variant="category" color="violet">{preset.game}</Tag>
      {dirty && <Status tone="warning" dot>Unsaved changes</Status>}
      <Button className="preset-editor__save" size="sm" variant="primary" icon={<Icon name="save" />} disabled={!dirty} onClick={onSave}>Save</Button>
    </Box>
    <Field label="Crystals for Ganon's Tower" hint="Default 7.">
      <NumberInput buttons="sides" value={preset.tower} min={0} max={7} onChange={(tower) => onChange({ tower })} />
    </Field>
    <Field label="Crystals for Ganon" hint="Default 7.">
      <NumberInput buttons="sides" value={preset.ganon} min={0} max={7} onChange={(ganon) => onChange({ ganon })} />
    </Field>
  </Box>
);

export { PresetEditor };
