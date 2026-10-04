/* @layer stories @kind story */
import type { StoryLiteMeta } from '@storylite/storylite';
import { Box, Button, Field, Flex, Icon, Select, Status, Tag, Text, TextInput } from '../../src/primitives';
import { FileList } from './parts/FileList';
import { ItemCard } from './parts/ItemCard';
import { PathField } from './parts/PathField';
import { RowGrid } from './parts/RowGrid';
import { ActionBar } from './parts/ActionBar';
import './spike.css';

const meta = { title: 'Spike/Files', parameters: { renderer: 'react' } } satisfies StoryLiteMeta;
const noop = () => {};
const SEED = '48213907715260934413';
const MB = 1024 ** 2;

const T19 = {
  name: 'T-19',
  render: () => (
    <Box className="spike-shot spike-shot--w768">
      <Text className="spike-caption">Server editor: the SSH key as a PathField, Browse opens the native dialog through Brock, long paths cut in the middle</Text>
      <Field label="Key file" hint="Only the path is stored."><PathField value={String.raw`C:\Users\ana\.ssh\archipelago-servers\home-nas\id_ed25519`} /></Field>
      <Field label="Key file" hint="Only the path is stored."><PathField value={null} placeholder="No key file yet" /></Field>
      <Text className="spike-caption">Session builder: a player from a file, while a file is dragged onto it</Text>
      <Field label="Player file"><PathField value={null} dropping /></Field>
      <Text className="spike-caption">Data overview and room output: read only, with copy and reveal</Text>
      <PathField kind="folder" readOnly value={String.raw`C:\Users\ana\AppData\Roaming\Archipelia\Data`} />
      <PathField readOnly value={String.raw`C:\Users\ana\AppData\Roaming\Archipelia\Data\runs\friday-run\AP_${SEED}.zip`} />
    </Box>
  ),
};

const OUTPUT = [
  { path: `AP_${SEED}.zip`, size: 18.4 * MB, modified: 'today 19:02' },
  { path: `AP_${SEED}.archipelago`, size: 2.1 * MB, modified: 'today 19:02' },
  { path: `AP_${SEED}_P1_Ana.aptimespinner`, size: 0.04 * MB, modified: 'today 19:02' },
  { path: `AP_${SEED}_P2_Bram.aplttp`, size: 0.6 * MB, modified: 'today 19:02' },
  { path: `AP_${SEED}_Spoiler.txt`, size: 1.3 * MB, modified: 'today 19:02' },
  { path: `AP_${SEED}.apsave`, size: 0.2 * MB, modified: 'today 19:44' },
  { path: 'server.log', size: 0.3 * MB, modified: 'today 19:45' },
];

const T20 = {
  name: 'T-20',
  render: () => (
    <Box className="spike-shot spike-shot--w768">
      <Text className="spike-caption">Room widget: the output as a FileList, with size, date, open and reveal per file</Text>
      <Flex justify="between" align="center"><Text variant="body" className="spike-strong">Output · 7 files · 23.0 MB</Text><Button size="sm" variant="secondary" icon={<Icon name="folder-open" />}>Open folder</Button></Flex>
      <FileList files={OUTPUT} />
      <Text className="spike-caption">Before generation</Text>
      <FileList files={[]} empty="No output files yet. They show here once the seed is generated." />
    </Box>
  ),
};

const T21 = {
  name: 'T-21',
  render: () => (
    <Box className="spike-shot spike-shot--wide">
      <Text className="spike-caption">Games store: ItemCard with media, eyebrow, status, tags, details clamped to three lines, actions through ActionBar</Text>
      <Box className="spike-grid-3">
        <ItemCard media="gamepad-2" eyebrow="Official" title="Timespinner" status={{ label: 'update', tone: 'warning' }}
          tags={[<Tag key="a" variant="category" color="violet">Metroidvania</Tag>, <Tag key="b">PC</Tag>]} details={['World 1.2.0', 'For AP 0.6.7', 'Installed 1.1.4']}
          actions={[{ id: 'u', label: 'Update', icon: 'download', kind: 'primary', onSelect: noop }, { id: 'p', label: 'Make a preset', onSelect: noop }, { id: 'r', label: 'Remove', icon: 'trash-2', kind: 'danger', onSelect: noop }]} />
        <ItemCard media="puzzle" mediaTone="teal" eyebrow="Community" title="The Grinch" status={{ label: 'stable', tone: 'info' }}
          tags={[<Tag key="a" variant="category" color="green">Platformer</Tag>, <Tag key="b">PC (Steam)</Tag>]} details={['World 1.5.8', 'Tracker available', 'Needs the Grinch-AP client from the world page']}
          actions={[{ id: 'i', label: 'Install', icon: 'download', kind: 'primary', onSelect: noop }, { id: 'w', label: 'World page', icon: 'external-link', onSelect: noop }]} />
        <ItemCard selected media="gamepad-2" mediaTone="amber" eyebrow="Official" title="Hollow Knight" status={{ label: 'installed', tone: 'success' }}
          tags={[<Tag key="a" variant="category" color="violet">Metroidvania</Tag>]} details={['World 0.6.7', 'For AP 0.6.7', '3 presets']}
          actions={[{ id: 'p', label: 'Make a preset', icon: 'plus', kind: 'primary', onSelect: noop }, { id: 'r', label: 'Remove', icon: 'trash-2', kind: 'danger', onSelect: noop }]} />
      </Box>
      <Text className="spike-caption">Media on the left, for lists and the data overview</Text>
      <Box className="spike-grid-2">
        <ItemCard layout="left" media="history" mediaTone="rose" eyebrow="Data" title="Session runs" details={['14 runs', '1.6 GB', 'oldest 3 months ago']} actions={[{ id: 'c', label: 'Clean old runs', onSelect: noop }, { id: 'o', label: 'Open folder', icon: 'folder-open', onSelect: noop }]} />
        <ItemCard layout="left" media="cpu" eyebrow="Data" title="Engine" status={{ label: 'ready', tone: 'success' }} details={['Archipelago 0.6.7', '288 MB']} actions={[{ id: 'o', label: 'Open folder', icon: 'folder-open', onSelect: noop }, { id: 'r', label: 'Rebuild', kind: 'danger', onSelect: noop }]} />
      </Box>
    </Box>
  ),
};

type Player = { slot: number; name: string; game: string; preset: string; overrides: string; changed: boolean; file?: string };
const PLAYERS: Player[] = [
  { slot: 1, name: 'Ana', game: 'Timespinner', preset: 'p1', overrides: '2 changes', changed: true },
  { slot: 2, name: 'Bram', game: 'A Link to the Past', preset: 'p2', overrides: 'no changes', changed: false },
  { slot: 3, name: 'Cleo', game: 'Hollow Knight', preset: 'yaml', overrides: 'from file', changed: false, file: 'Cleo_HK.yaml' },
];
const GAMES = [{ value: 'Timespinner', label: 'Timespinner' }, { value: 'A Link to the Past', label: 'A Link to the Past' }, { value: 'Hollow Knight', label: 'Hollow Knight' }];
const PRESETS = [{ value: 'p1', label: 'Short run' }, { value: 'p2', label: 'Keysanity' }, { value: 'yaml', label: 'Player file (yaml)' }];
const COLUMNS = [{ id: 'slot', label: '#' }, { id: 'name', label: 'Name' }, { id: 'game', label: 'Game' }, { id: 'preset', label: 'Preset' }, { id: 'overrides', label: 'Overrides' }, { id: 'actions', label: 'Actions', align: 'end' as const }];

const cell = (p: Player, id: string) => {
  if (id === 'slot') return <Text variant="body">{p.slot}</Text>;
  if (id === 'name') return <TextInput defaultValue={p.name} aria-label={`Name of player ${p.slot}`} />;
  if (id === 'game') return <Select value={p.game} options={GAMES} onChange={noop} searchable />;
  if (id === 'preset') return <Select value={p.preset} options={PRESETS} onChange={noop} />;
  if (id === 'overrides') return <Status tone={p.changed ? 'warning' : 'neutral'}>{p.overrides}</Status>;
  return <ActionBar size="sm" keep={1} actions={[{ id: 'e', label: 'Edit', icon: 'pencil', onSelect: noop }, { id: 'd', label: 'Duplicate', icon: 'copy', onSelect: noop }, { id: 'r', label: 'Remove', icon: 'trash-2', kind: 'danger', onSelect: noop }]} />;
};

const grid = <RowGrid columns={COLUMNS} rows={PLAYERS} getId={(p) => String(p.slot)} rowLabel={(p) => `Player ${p.slot}`} renderCell={cell} selectedId="2" />;

const T22 = {
  name: 'T-22',
  render: () => (
    <Box className="spike-shot spike-shot--xwide">
      <Text className="spike-caption">Session builder players as a RowGrid: header and rows share one column template</Text>
      {grid}
      <Text className="spike-caption">The same RowGrid in a 520 px column: it stacks by its own width (container query) and every cell keeps its label</Text>
      <Box className="spike-narrow-col">{grid}</Box>
    </Box>
  ),
};

const Overview = { name: 'Overview', render: () => <Text variant="body">T-19 to T-22 previews.</Text> };

export default meta;
export { Overview, T19, T20, T21, T22 };
