/* @layer stories @kind story */
import type { StoryLiteMeta } from '@storylite/storylite';
import { MasterDetailLayout } from '../../src/composites';
import { Box, Button, Field, Flex, Icon, NumberStepper, PasswordInput, Stack, Status, Tag, Text } from '../../src/primitives';
import { CheckList } from './parts/CheckList';
import { CommandConsole } from './parts/CommandConsole';
import { ConnectionStatus } from './parts/ConnectionStatus';
import { EditorHeader } from './parts/EditorHeader';
import { ManagedList } from './parts/ManagedList';
import './spike.css';

const meta = { title: 'Spike/Session', parameters: { renderer: 'react' } } satisfies StoryLiteMeta;
const noop = () => {};

const PRESETS = [
  { id: 'p2', name: 'Keysanity', meta: '7 changes · edited 2 hours ago', group: 'A Link to the Past' },
  { id: 'p4', name: 'Open, fast Ganon', meta: '3 changes', group: 'A Link to the Past' },
  { id: 'p6', name: 'Swordless chaos', meta: '12 changes', group: 'A Link to the Past' },
  { id: 'p1', name: 'Short run', meta: '2 changes · edited 3 days ago', group: 'Timespinner' },
  { id: 'p5', name: 'Bottle hunt', meta: '11 changes', group: 'Ocarina of Time · game not installed', trailing: <Status tone="warning">not installed</Status> },
];

const T15 = {
  name: 'T-15',
  render: () => (
    <Box className="spike-shot spike-shot--xwide">
      <Text className="spike-caption">Presets page as MasterDetail: ManagedList on the left (count, New, filter, groups, rename in place, delete that asks), dirty guard on the right</Text>
      <MasterDetailLayout
        list={<ManagedList title="Presets" items={PRESETS} selectedId="p2" renamingId="p4" filter="" />}
        detail={(
          <Stack gap="md">
            <EditorHeader name="Keysanity" onNameChange={noop} context={<Tag variant="category" color="violet">A Link to the Past</Tag>} state="dirty"
              actions={[{ id: 'dup', label: 'Duplicate', icon: 'copy', onSelect: noop }, { id: 'del', label: 'Delete', icon: 'trash-2', kind: 'danger', onSelect: noop }, { id: 'save', label: 'Save', icon: 'save', kind: 'primary', onSelect: noop }]} keep={1} />
            <Flex gap="sm" align="center" justify="between" className="spike-guard">
              <Text variant="body">Keysanity has unsaved changes. Save them before you open Short run?</Text>
              <Flex gap="xs"><Button size="sm" variant="ghost">Stay here</Button><Button size="sm" variant="secondary">Discard</Button><Button size="sm" variant="primary">Save and open</Button></Flex>
            </Flex>
            <Field label="Crystals for Ganon's Tower" hint="Default 7."><NumberStepper value={5} min={0} max={7} onChange={noop} /></Field>
            <Field label="Crystals for Ganon" hint="Default 7."><NumberStepper value={6} min={0} max={7} onChange={noop} /></Field>
          </Stack>
        )}
      />
      <Text className="spike-caption">The same ManagedList while loading, when empty and on an error</Text>
      <Box className="spike-grid-3">
        <Box className="spike-panel"><ManagedList title="Servers" items={[]} createLabel="Add" loading /></Box>
        <Box className="spike-panel"><ManagedList title="Presets" items={[]} createLabel="New" empty="Install a game from Games, then make a preset for it." /></Box>
        <Box className="spike-panel"><ManagedList title="Servers" items={[]} createLabel="Add" error="Could not read servers.json: unexpected end of input" /></Box>
      </Box>
    </Box>
  ),
};

const T16 = {
  name: 'T-16',
  render: () => (
    <Box className="spike-shot spike-shot--w768">
      <Text className="spike-caption">Servers: Test connection result as a CheckList (pass, advice and failure no longer look the same)</Text>
      <CheckList
        summary={<Text variant="body" className="spike-strong">Home NAS is not ready</Text>}
        checks={[
          { id: 'connect', label: 'Connect over SSH', state: 'pass', detail: 'ap@nas.local:22, key C:\\Users\\ana\\.ssh\\id_ed25519' },
          { id: 'python', label: 'Python', state: 'pass', detail: '/usr/bin/python3 is 3.12.3' },
          { id: 'multiserver', label: 'MultiServer.py', state: 'pass', detail: '/opt/archipelago/MultiServer.py found' },
          { id: 'ap-version', label: 'Archipelago version', state: 'fail', detail: 'Archipelago 0.6.5, this app runs 0.6.7', action: <Button size="sm" variant="secondary">How to update</Button> },
          { id: 'game-port', label: 'Game port', state: 'fail', detail: 'port 38281 is in use', action: <Button size="sm" variant="secondary">Pick another port</Button> },
          { id: 'linger', label: 'Keep running after logout', state: 'warn', detail: 'lingering is off or systemd is missing, the server runs under nohup setsid' },
        ]}
      />
      <Text className="spike-caption">While the test runs</Text>
      <CheckList checks={[
        { id: 'connect', label: 'Connect over SSH', state: 'pass', detail: 'ap@95.217.40.12:22' },
        { id: 'python', label: 'Python', state: 'pending' },
        { id: 'multiserver', label: 'MultiServer.py', state: 'skip', detail: 'waits for Python' },
      ]} />
    </Box>
  ),
};

const AUTH = (
  <Flex gap="xs" align="center">
    <PasswordInput mode="current" value="" onChange={noop} placeholder="Room password" aria-label="Room password" />
    <Button variant="primary">Watch</Button>
  </Flex>
);

const T17 = {
  name: 'T-17',
  render: () => (
    <Box className="spike-shot spike-shot--w768">
      <Text className="spike-caption">Players and Hints widgets: one ConnectionStatus for every phase of the live room</Text>
      <ConnectionStatus phase="idle" detail="Live data shows while the room is hosting." />
      <ConnectionStatus phase="connecting" detail="ws://localhost:38281" />
      <ConnectionStatus phase="live" label="Live, watching as Ana" since="for 42 min" />
      <ConnectionStatus phase="reconnecting" detail="Lost the room 4 s ago, try 2 of 5" />
      <ConnectionStatus phase="closed" onRetry={noop} />
      <ConnectionStatus phase="failed" detail="connect ECONNREFUSED 127.0.0.1:38281" onRetry={noop} />
      <ConnectionStatus phase="auth" detail="Enter it to watch. It is not stored." auth={AUTH} />
      <Text className="spike-caption">compact, in a widget title bar or the session bar</Text>
      <Flex gap="lg">
        <ConnectionStatus compact phase="live" label="Live" />
        <ConnectionStatus compact phase="reconnecting" />
        <ConnectionStatus compact phase="failed" label="Offline" />
      </Flex>
    </Box>
  ),
};

const LINES = [
  { id: '1', kind: 'sent', text: '/players' },
  { id: '2', kind: 'reply', text: 'Team #1: Ana (Timespinner) playing, Bram (A Link to the Past) playing, Cleo (Hollow Knight) offline' },
  { id: '3', kind: 'sent', text: '/hint Ana Timespinner Wheel' },
  { id: '4', kind: 'reply', text: '[Hint]: Ana\'s Timespinner Wheel is at Lake Serene Bridge in Bram\'s World. (found)' },
  { id: '5', kind: 'sent', text: '/save' },
  { id: '6', kind: 'reply', text: 'Saved to AP_48213907715260934413.apsave' },
  { id: '7', kind: 'sent', text: '/relase Cleo' },
  { id: '8', kind: 'error', text: 'Unknown command /relase. Did you mean /release?' },
] as const;

const T18 = {
  name: 'T-18',
  render: () => (
    <Box className="spike-shot spike-shot--w768">
      <Text className="spike-caption">Console widget: output and history in one place, Enter sends, Up and Down walk the history</Text>
      <CommandConsole onSubmit={noop} draft="/hint Bram Moon Pearl" placeholder="/hint Johnny Moon Pearl" lines={LINES}
        quick={[{ label: 'Save', command: '/save' }, { label: 'Players', command: '/players' }, { label: 'Release Cleo', command: '/release Cleo', confirm: true }, { label: 'Collect for Cleo', command: '/collect Cleo', confirm: true }]} />
      <Text className="spike-caption">No hosting room</Text>
      <CommandConsole onSubmit={noop} disabled disabledReason="Commands need a hosting room. Start the session first." placeholder="/hint Johnny Moon Pearl" quick={[{ label: 'Save', command: '/save' }, { label: 'Players', command: '/players' }]} />
    </Box>
  ),
};

const Overview = { name: 'Overview', render: () => <Text variant="body">T-15 to T-18 previews. <Icon name="layers" /></Text> };

export default meta;
export { Overview, T15, T16, T17, T18 };
