/* @layer stories @kind story */
import type { StoryLiteMeta } from '@storylite/storylite';
import { ListItemRow } from '../../src/composites';
import { Box, Field, Icon, Stack, Tag, Text, TextInput } from '../../src/primitives';
import { ActionBar } from './parts/ActionBar';
import type { BarAction } from './parts/ActionBar';
import { EditorHeader } from './parts/EditorHeader';
import { ValidationSummary } from './parts/ValidationSummary';
import './spike.css';

const meta = { title: 'Spike/Editors', parameters: { renderer: 'react' } } satisfies StoryLiteMeta;
const noop = () => {};

const BUILDER_PROBLEMS = [
  { id: '1', message: 'Two players are named Bram', field: 'players.2.name' },
  { id: '2', message: 'Cleo: import a player file', field: 'players.3.source' },
  { id: '3', message: 'Ana: start_inventory must be a map of item names to counts', field: 'players.1.overrides' },
  { id: '4', message: 'Pick a server to host on', field: 'host.server' },
  { id: '5', message: 'Dax: Ocarina of Time is not installed', field: 'players.4.game' },
  { id: '6', message: 'The port must be between 1 and 65535', field: 'host.port' },
];

const T12 = {
  name: 'T-12',
  render: () => (
    <Box className="spike-shot spike-shot--w768">
      <Text className="spike-caption">Session builder: ValidationSummary, each problem jumps to its field, the rest fold under “and 2 more”</Text>
      <ValidationSummary title="Before this session can run" problems={BUILDER_PROBLEMS} onFocusField={noop} />
      <Text className="spike-caption">Server editor: the same part above the form instead of loose captions</Text>
      <ValidationSummary problems={[{ id: 'k', message: 'Enter the path of the key file.', field: 'auth.keyPath' }, { id: 'p', message: 'The Archipelago path must be absolute.', field: 'apPath' }]} onFocusField={noop} />
      <Field label="Archipelago path on the host" error="The Archipelago path must be absolute." hint="The source folder of Archipelago 0.6.7.">
        <TextInput defaultValue="srv/archipelago" invalid />
      </Field>
      <Text className="spike-caption">Preset editor: warning tone for options to check before saving</Text>
      <ValidationSummary tone="warning" title="2 options need a look" problems={[{ id: 'a', message: 'Start Inventory: “Bombs (10)” is above the max of 1', field: 'start_inventory' }, { id: 'b', message: 'Plando Texts: the JSON does not parse (line 3)', field: 'plando_texts' }]} onFocusField={noop} />
    </Box>
  ),
};

const PRESET_ACTIONS: BarAction[] = [
  { id: 'reset', label: 'Reset all', icon: 'rotate-ccw', onSelect: noop },
  { id: 'dup', label: 'Duplicate', icon: 'copy', onSelect: noop },
  { id: 'import', label: 'Import yaml', icon: 'upload', onSelect: noop },
  { id: 'export', label: 'Export yaml', icon: 'download', onSelect: noop },
  { id: 'delete', label: 'Delete', icon: 'trash-2', kind: 'danger', onSelect: noop },
  { id: 'save', label: 'Save', icon: 'save', kind: 'primary', onSelect: noop },
];

const BUILDER_ACTIONS: BarAction[] = [
  { id: 'tpl', label: 'Save as template', icon: 'bookmark', onSelect: noop },
  { id: 'run', label: 'Run', icon: 'play', kind: 'primary', onSelect: noop },
];

const T13 = {
  name: 'T-13',
  render: () => (
    <Box className="spike-shot spike-shot--wide">
      <Text className="spike-caption">Preset editor: name edits in place, the game as context, one save state, actions through ActionBar</Text>
      <EditorHeader name="Keysanity" onNameChange={noop} icon={<Icon name="sliders-horizontal" />} context={<Tag variant="category" color="violet">A Link to the Past</Tag>} state="dirty" actions={PRESET_ACTIONS} keep={1} />
      <Text className="spike-caption">Session builder: back to sessions in the header, the same state chip after a save</Text>
      <EditorHeader name="Friday run" onNameChange={noop} onBack={noop} backLabel="Back to sessions" icon={<Icon name="layers" />} context={<Tag>3 players</Tag>} state="saved" actions={BUILDER_ACTIONS} />
      <Text className="spike-caption">The five states</Text>
      <Stack gap="sm">
        {(['clean', 'dirty', 'saving', 'saved', 'error'] as const).map((s) => (
          <EditorHeader key={s} name="Keysanity" onNameChange={noop} context={<Tag variant="category" color="violet">A Link to the Past</Tag>} state={s} actions={[{ id: 'save', label: 'Save', kind: 'primary', onSelect: noop }]} />
        ))}
      </Stack>
    </Box>
  ),
};

const TEMPLATE_ACTIONS: BarAction[] = [
  { id: 'edit', label: 'Edit', icon: 'pencil', onSelect: noop },
  { id: 'dup', label: 'Duplicate', icon: 'copy', onSelect: noop },
  { id: 'del', label: 'Delete', icon: 'trash-2', kind: 'danger', onSelect: noop },
  { id: 'run', label: 'Run', icon: 'play', kind: 'primary', onSelect: noop },
];

const RUN_ACTIONS: BarAction[] = [
  { id: 'open', label: 'Open', onSelect: noop },
  { id: 'log', label: 'Show log', icon: 'file-text', onSelect: noop },
  { id: 'del', label: 'Delete', icon: 'trash-2', kind: 'danger', onSelect: noop },
];

const T14 = {
  name: 'T-14',
  render: () => (
    <Box className="spike-shot spike-shot--w768">
      <Text className="spike-caption">Preset editor header at 620 px: Save stays, two actions show, the rest go under More (opened here)</Text>
      <Box className="spike-narrow"><ActionBar actions={PRESET_ACTIONS} keep={2} /></Box>
      <Text className="spike-caption">TemplateRow and RunRow: one line at any width, Delete always red and always asks</Text>
      <ListItemRow actionVisibility="always" name="Friday run" meta="Timespinner, A Link to the Past, Hollow Knight · 3 players" action={<ActionBar size="sm" actions={TEMPLATE_ACTIONS} keep={1} />} />
      <ListItemRow actionVisibility="always" name="Friday run" meta="2 hours ago · This computer · stopped" action={<ActionBar size="sm" actions={RUN_ACTIONS} keep={1} />} />
      <Text className="spike-caption">Same bar with room for everything: nothing folds</Text>
      <ActionBar actions={PRESET_ACTIONS} keep={5} />
    </Box>
  ),
};

const Overview = { name: 'Overview', render: () => <Text variant="body">T-12, T-13 and T-14 previews.</Text> };

export default meta;
export { Overview, T12, T13, T14 };
