/* @layer stories @kind story */
import type { StoryLiteMeta } from '@storylite/storylite';
import { ListItemList, ListItemRow, MasterDetailLayout, SettingsPage, SettingsSection, StatTile, Widget } from '../../src/composites';
import type { SettingsSectionData } from '../../src/composites';
import { Box, Button, Field, Flex, Icon, NumberInput, PasswordInput, RadioGroup, Stack, StatRow, Status, Tag, Text, TextInput } from '../../src/primitives';
import './spike.css';

const meta = { title: 'Spike/Type scale', parameters: { renderer: 'react' } } satisfies StoryLiteMeta;
const noop = () => {};
const SEED = '48213907715260934413';

const HOSTING: SettingsSectionData[] = [
  {
    id: 'hosting', title: 'Hosting', description: 'How a session runs on this computer.',
    rows: [
      { id: 'port', title: 'Local port', hint: 'Players connect to this port.', description: 'The port the room listens on. Open it on your router to host for friends outside your network.', input: { kind: 'number', value: 38281, min: 1, max: 65535, onChange: noop } },
      { id: 'shutdown', title: 'Auto shutdown', hint: 'Minutes without players.', description: 'Stop the room after this many minutes with nobody connected. 0 keeps it running.', input: { kind: 'number', value: 120, min: 0, unit: 'min', onChange: noop } },
      { id: 'release', title: 'Release mode', hint: 'When items go back.', description: 'When a finished player\'s remaining items are sent to their owners.', input: { kind: 'segmented', value: 'auto', onChange: noop, options: [{ value: 'disabled', label: 'Disabled' }, { value: 'enabled', label: 'Enabled' }, { value: 'auto', label: 'Auto' }, { value: 'goal', label: 'Goal' }] } },
      { id: 'collect', title: 'Collect mode', hint: 'When items are pulled in.', description: 'When a player may collect their items from other worlds.', input: { kind: 'select', value: 'goal', onChange: noop, options: [{ value: 'disabled', label: 'Disabled' }, { value: 'enabled', label: 'Enabled' }, { value: 'goal', label: 'After the goal' }] } },
    ],
  },
  {
    id: 'commands', title: 'Commands', description: 'What players may ask the server.',
    rows: [
      { id: 'hint-cost', title: 'Hint cost', hint: 'Percent of checks per hint.', description: 'How many checks a hint costs, as a percent of the player\'s locations.', input: { kind: 'slider', value: 10, min: 0, max: 100, step: 5, formatValue: (v: number) => `${v} %`, onChange: noop } },
      { id: 'password', title: 'Room password', hint: 'Kept in the vault.', description: 'Players and trackers need it to join. Leave empty for an open room.', input: { kind: 'password', value: '', onChange: noop } },
      { id: 'spoiler', title: 'Spoiler log', hint: 'Written next to the output.', noDescription: true, input: { kind: 'toggle', value: true, onChange: noop } },
    ],
    changedCount: 2,
    onReset: noop,
  },
  {
    id: 'engine', title: 'Engine', description: 'The private Python with the pinned Archipelago source.',
    rows: [
      {
        id: 'engine-state', title: 'State', hint: 'Checked at start.', noDescription: true,
        content: (
          <Stack gap="xs">
            <Flex gap="sm" align="center"><Status tone="success" dot>Ready</Status><Tag>pinned</Tag><Tag variant="urgency" color="info">0.6.7</Tag></Flex>
            <StatRow label="Archipelago" value="0.6.7" mono />
            <StatRow label="Python" value="3.12.7 (embedded)" mono />
            <StatRow label="Folder" value={String.raw`C:\Users\ana\AppData\Roaming\Archipelia\Data\engine\0.6.7-win32-x64`} mono />
            <Text variant="label">Last check</Text>
            <Text variant="caption">Setting it up downloads about 90 MB once. Last checked 4 minutes ago.</Text>
          </Stack>
        ),
      },
    ],
  },
];

const ORDERED = [HOSTING[2], HOSTING[0], HOSTING[1]].filter((s): s is SettingsSectionData => s !== undefined);

const SettingsScreen = () => (
  <Box className="spike-screen">
    <SettingsPage icon={<Icon name="radio" />} title="Hosting" anchors={ORDERED.map((s) => ({ id: s.id, label: s.title ?? s.id }))}>
      {ORDERED.map((section) => <SettingsSection key={section.id} {...section} />)}
    </SettingsPage>
  </Box>
);

const SERVERS = [
  { id: 'nas', name: 'Home NAS', meta: 'nas.local · SSH key', tone: 'danger', state: 'failing' },
  { id: 'vps', name: 'Hetzner VPS', meta: '95.217.40.12 · password', tone: 'success', state: 'tested' },
  { id: 'bram', name: 'Bram\'s server', meta: 'bram.duckdns.org · SSH key', tone: 'neutral', state: 'not tested' },
] as const;

const FormScreen = () => (
  <Box className="spike-screen">
    <MasterDetailLayout
      list={(
        <Stack gap="sm">
          <Flex justify="between" align="center"><Text variant="label">Servers · 3</Text><Button size="sm" variant="primary">Add</Button></Flex>
          {SERVERS.map((s) => <ListItemRow key={s.id} actionVisibility="always" name={s.name} meta={s.meta} selected={s.id === 'nas'} action={<Status tone={s.tone}>{s.state}</Status>} />)}
          <Text variant="caption">Passwords and key passphrases stay encrypted in the vault and are only used by the app itself.</Text>
        </Stack>
      )}
      detail={(
        <Stack gap="sm">
          <Flex justify="between" align="center"><Text as="h2" variant="subtitle">Home NAS</Text><Flex gap="sm"><Button variant="secondary">Test connection</Button><Button variant="primary">Save</Button></Flex></Flex>
          <Field label="Label"><TextInput defaultValue="Home NAS" /></Field>
          <Field label="Host" hint="Name or address of the machine."><TextInput defaultValue="nas.local" /></Field>
          <Field label="SSH port"><NumberInput value={22} onChange={noop} /></Field>
          <Field label="User name"><TextInput defaultValue="ap" /></Field>
          <RadioGroup label="Authentication" value="key" onChange={noop} options={[{ value: 'key', label: 'SSH key file' }, { value: 'password', label: 'Password' }]} />
          <Field label="Key file" hint="Only the path is stored."><TextInput defaultValue={String.raw`C:\Users\ana\.ssh\id_ed25519`} /></Field>
          <Field label="Key passphrase" hint="Leave empty for a key without one."><PasswordInput mode="new" value="" onChange={noop} /></Field>
          <Field label="Archipelago path on the host" hint="The source folder of Archipelago 0.6.7."><TextInput defaultValue="/opt/archipelago" /></Field>
          <Field label="Game port" hint="Players connect here. Open it on the host's firewall."><NumberInput value={38281} onChange={noop} /></Field>
        </Stack>
      )}
    />
  </Box>
);

const PLAYERS = [
  { name: 'Ana', game: 'Timespinner', checks: '112 / 220', state: 'playing', tone: 'success' },
  { name: 'Bram', game: 'A Link to the Past', checks: '74 / 216', state: 'playing', tone: 'success' },
  { name: 'Cleo', game: 'Hollow Knight', checks: '9 / 310', state: 'offline', tone: 'neutral' },
  { name: 'Dax', game: 'Ocarina of Time', checks: '216 / 216', state: 'goal', tone: 'primary' },
] as const;

const WidgetScreen = () => (
  <Box className="spike-screen">
    <Stack gap="md" className="spike-fill">
      <Box className="spike-tiles">
        <StatTile label="Players" value="3 / 4" unit="connected" />
        <StatTile label="Checks" value="411" unit="seen by the server" />
        <StatTile label="Hints" value="4" unit="open, 2 found" />
        <StatTile label="Uptime" value="42 min" unit="hosting" />
      </Box>
      <Box className="spike-widgets">
        <Box className="spike-widget">
          <Widget id="room" tabs={[{ id: 'room', label: 'Room' }]} activeId="room" paneKey="a" opacity={1} onActivateTab={noop} onClose={noop}>
            <Stack gap="sm" className="spike-pad">
              <StatRow label="Host" value="This computer" />
              <StatRow label="Address" value="localhost:38281" mono copyable />
              <StatRow label="Room page" value="https://archipelago.gg/room/kW3x9QpLz" mono />
              <StatRow label="Password" value="Set" />
              <StatRow label="Seed" value={SEED} mono />
              <StatRow label="Output" value={`AP_${SEED}.zip`} mono />
              <Text variant="label">Files (4)</Text>
              {[`AP_${SEED}.archipelago`, `AP_${SEED}_P1_Ana.aptimespinner`, `AP_${SEED}_P2_Bram.aplttp`, `AP_${SEED}_Spoiler.txt`].map((f) => <Text key={f} variant="caption" mono>{f}</Text>)}
            </Stack>
          </Widget>
        </Box>
        <Box className="spike-widget">
          <Widget id="players" tabs={[{ id: 'players', label: 'Players' }, { id: 'hints', label: 'Hints' }]} activeId="players" paneKey="b" opacity={1} onActivateTab={noop} onClose={noop}>
            <Stack gap="sm" className="spike-pad">
              {PLAYERS.map((p) => (
                <Stack key={p.name} gap="xs" className="spike-player">
                  <Flex justify="between" align="center"><Text variant="body">{p.name}</Text><Status tone={p.tone} dot>{p.state}</Status></Flex>
                  <Flex gap="xs" wrap><Tag variant="category" color="violet">{p.game}</Tag><Tag>slot {PLAYERS.indexOf(p) + 1}</Tag></Flex>
                  <StatRow label="Checks" value={p.checks} mono />
                </Stack>
              ))}
            </Stack>
          </Widget>
        </Box>
      </Box>
    </Stack>
  </Box>
);

const RUNS = [
  ['Friday run', '2 hours ago', 'This computer', 'Timespinner, A Link to the Past, Hollow Knight', 'stopped', '1.2 GB'],
  ['Bottle hunt', 'yesterday', 'Home NAS', 'Ocarina of Time, Majora\'s Mask', 'failed', '4.1 MB'],
  ['Weekly async', '3 days ago', 'archipelago.gg', 'Super Metroid, A Link to the Past, Pokemon Emerald, Factorio', 'stopped', '880 MB'],
  ['Keysanity race', '5 days ago', 'This computer', 'A Link to the Past', 'stopped', '96 MB'],
  ['Cozy co-op', 'last week', 'Hetzner VPS', 'Stardew Valley, Terraria', 'stopped', '310 MB'],
  ['Short test', 'last week', 'This computer', 'Timespinner', 'stopped', '12 MB'],
  ['Grinch night', '2 weeks ago', 'archipelago.gg', 'The Grinch, Donkey Kong Country 3', 'stopped', '220 MB'],
  ['Metroid marathon', '2 weeks ago', 'Home NAS', 'Super Metroid, Metroid Prime, Hollow Knight', 'failed', '2.0 MB'],
  ['Friday run', '3 weeks ago', 'This computer', 'Timespinner, A Link to the Past, Hollow Knight', 'stopped', '1.1 GB'],
  ['Zelda trio', '3 weeks ago', 'Hetzner VPS', 'A Link to the Past, Ocarina of Time, Link\'s Awakening DX', 'stopped', '640 MB'],
  ['Solo practice', 'last month', 'This computer', 'Celeste 64', 'stopped', '8 MB'],
  ['Big async', 'last month', 'archipelago.gg', '12 games', 'stopped', '3.4 GB'],
] as const;

const runRow = ([name, when, host, games, status, size]: (typeof RUNS)[number], i: number) => (
  <ListItemRow key={`${name}-${i}`} actionVisibility="always" name={name} meta={`${when} · ${host}`}
    columns={[{ primary: games, secondary: games.includes(',') ? `${games.split(',').length} players` : '1 player' }, { primary: size, secondary: 'output', align: 'end' }]}
    action={<Flex gap="xs" align="center"><Tag variant="urgency" color={status === 'failed' ? 'danger' : 'info'}>{status}</Tag><Button size="sm" variant="ghost">Open</Button></Flex>} />
);

const ListScreen = () => (
  <Box className="spike-screen">
    <Stack gap="sm">
      <Flex justify="between" align="center"><Text variant="label">Session runs · {RUNS.length}</Text><Button size="sm" variant="secondary">Clean old runs</Button></Flex>
      <Text variant="label">This week</Text>
      <ListItemList>{RUNS.slice(0, 4).map(runRow)}</ListItemList>
      <Text variant="label">Earlier</Text>
      <ListItemList>{RUNS.slice(4).map((run, i) => runRow(run, i + 4))}</ListItemList>
    </Stack>
  </Box>
);

const Overview = { name: 'Overview', render: () => <Text variant="body">T-03 decision previews: the same four screens at 10 or 12 px small text, with or without forced upper case.</Text> };
const Settings = { name: 'Settings', render: () => <SettingsScreen /> };
const Form = { name: 'Form', render: () => <FormScreen /> };
const WidgetStory = { name: 'Widget', render: () => <WidgetScreen /> };
const List = { name: 'List', render: () => <ListScreen /> };

export default meta;
export { Form, List, Overview, Settings, WidgetStory as Widget };
