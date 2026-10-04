import type { ReactNode } from 'react';
import type { OptionDef, OptionValue } from '@archipelia/model';
import {
  GameCard, OptionControl, OptionField, OptionGroupTabs, PlayerRow, PlayerRowHeader, RunRow, SessionStatusBar, TemplateRow,
} from '@archipelia/design';
import { Stack } from '@drizztdourden08/tessera/primitives';
import { ServerManager } from 'X:/archipelia/apps/desktop/src/views/ServerManager/ServerManager';
import { ServerForm } from 'X:/archipelia/apps/desktop/src/views/ServerManager/sub-components/ServerForm/ServerForm';
import { ServerTestPanel } from 'X:/archipelia/apps/desktop/src/views/ServerManager/sub-components/ServerTestPanel/ServerTestPanel';
import { PresetList } from 'X:/archipelia/apps/desktop/src/views/PresetsHub/sub-components/PresetList/PresetList';
import { ProblemList } from 'X:/archipelia/apps/desktop/src/views/SessionBuilder/sub-components/ProblemList/ProblemList';
import { BuilderHeader } from 'X:/archipelia/apps/desktop/src/views/SessionBuilder/sub-components/BuilderHeader/BuilderHeader';
import { EditorHeader } from 'X:/archipelia/apps/desktop/src/views/PresetEditor/sub-components/EditorHeader/EditorHeader';
import { LiveNotice } from 'X:/archipelia/apps/desktop/src/views/SessionDashboard/sub-components/LiveNotice/LiveNotice';
import { ConsoleWidget } from 'X:/archipelia/apps/desktop/src/views/SessionDashboard/sub-components/ConsoleWidget/ConsoleWidget';
import { RoomWidget } from 'X:/archipelia/apps/desktop/src/views/SessionDashboard/sub-components/RoomWidget/RoomWidget';
import { SessionSummary } from 'X:/archipelia/apps/desktop/src/views/SessionDashboard/sub-components/SessionSummary/SessionSummary';
import { DataOverview } from 'X:/archipelia/apps/desktop/src/views/DataOverview/DataOverview';
import 'X:/archipelia/apps/desktop/src/views/SessionBuilder/SessionBuilder.css';
import 'X:/archipelia/apps/desktop/src/views/PresetEditor/PresetEditor.css';
import 'X:/archipelia/apps/desktop/src/views/PresetsHub/PresetsHub.css';
import 'X:/archipelia/apps/desktop/src/views/SessionDashboard/SessionDashboard.css';
import { SERVERS, SESSION } from './data';

type Scene = { width: number; render: () => ReactNode };
const noop = () => {};
const L = ({ children }: { children: ReactNode }) => <div className="h-label">{children}</div>;

const GAMES = [{ value: 'Timespinner', label: 'Timespinner' }, { value: 'A Link to the Past', label: 'A Link to the Past' }, { value: 'Hollow Knight', label: 'Hollow Knight' }];
const SOURCES = [{ value: 'p1', label: 'Short run' }, { value: 'p2', label: 'Keysanity' }, { value: 'yaml', label: 'Player file (yaml)' }];

const playerRows = () => (
  <div>
    <PlayerRowHeader />
    <PlayerRow slot={1} name="Ana" game="Timespinner" source="p1" gameOptions={GAMES} sourceOptions={SOURCES} overrides="2 changes" changed selected={false} canEdit
      onName={noop} onGame={noop} onSource={noop} onImport={noop} onEdit={noop} onDuplicate={noop} onRemove={noop} />
    <PlayerRow slot={2} name="Bram" game="A Link to the Past" source="p2" gameOptions={GAMES} sourceOptions={SOURCES} overrides="no changes" changed={false} selected canEdit
      onName={noop} onGame={noop} onSource={noop} onImport={noop} onEdit={noop} onDuplicate={noop} onRemove={noop} />
    <PlayerRow slot={3} name="Cleo" game="Hollow Knight" source="yaml" fileName="Cleo_HK.yaml" gameOptions={GAMES} sourceOptions={SOURCES} overrides="from file" changed={false} selected={false} canEdit={false}
      onName={noop} onGame={noop} onSource={noop} onImport={noop} onEdit={noop} onDuplicate={noop} onRemove={noop} />
  </div>
);

const ITEMS = ['Progressive Sword', 'Progressive Glove', 'Bombs (10)', 'Arrows (10)', 'Moon Pearl', 'Hookshot', 'Pegasus Boots', 'Magic Mirror', 'Flippers', 'Lamp'];
const def = (seed: Partial<OptionDef> & Pick<OptionDef, 'key' | 'kind' | 'default' | 'displayName'>): OptionDef => ({
  group: 'Item & Location Options', description: '', visibility: ['simple', 'complex'], weightable: false, ...seed,
});
const OPTIONS: { def: OptionDef; value: OptionValue; changed: boolean }[] = [
  {
    def: def({ key: 'start_inventory', displayName: 'Start Inventory', kind: 'counter', default: {}, validKeys: ITEMS, description: 'Start with these items.' }),
    value: { 'Progressive Sword': 1, 'Bombs (10)': 2, 'Pegasus Boots': 1 }, changed: true,
  },
  {
    def: def({ key: 'plando_texts', displayName: 'Plando Texts', kind: 'dict', default: {}, description: 'Set the text of chosen text boxes.' }),
    value: { uncle_leaving_text: 'Have fun, Bram', ganon_phase_3_alt: 'Got wax in your ears?' }, changed: true,
  },
  {
    def: def({ key: 'progression_balancing', displayName: 'Progression Balancing', kind: 'named-range', default: 50, range: { min: 0, max: 99 }, namedValues: { disabled: 0, normal: 50, extreme: 99 }, description: 'A system that can move progression earlier, to try and prevent the player from getting stuck and bored early.' }),
    value: 50, changed: false,
  },
  {
    def: def({ key: 'start_hints', displayName: 'Start Hints', kind: 'set', default: [], validKeys: ITEMS, description: 'Start with these item\'s locations prefilled into the !hint command.' }),
    value: ['Moon Pearl', 'Hookshot'], changed: true,
  },
];

const optionsForm = () => (
  <Stack gap="md">
    <OptionGroupTabs tabs={[{ id: 'game', label: 'Game Options', count: 41 }, { id: 'items', label: 'Item & Location Options', count: 12 }, { id: 'dungeon', label: 'Dungeon Items', count: 6 }]}
      activeTab="items" onTabChange={noop} query="" onQueryChange={noop} showAdvanced={false} onShowAdvancedChange={noop} advancedCount={9} />
    {OPTIONS.map(({ def: d, value, changed }) => (
      <OptionField key={d.key} label={d.displayName} description={d.description} changed={changed} onReset={noop}>
        <OptionControl def={d} value={value} onChange={noop} />
      </OptionField>
    ))}
  </Stack>
);

const PRESET_GROUPS = [
  { game: 'A Link to the Past', schema: {}, rows: [
    { preset: { id: 'p2', name: 'Keysanity' }, meta: 'A Link to the Past, 7 changes' },
    { preset: { id: 'p4', name: 'Open, fast Ganon' }, meta: 'A Link to the Past, 3 changes' },
  ] },
  { game: 'Timespinner', schema: {}, rows: [{ preset: { id: 'p1', name: 'Short run' }, meta: 'Timespinner, 2 changes, edited 3 days ago' }] },
  { game: 'Ocarina of Time', schema: null, rows: [{ preset: { id: 'p5', name: 'Bottle hunt' }, meta: 'Ocarina of Time, 11 changes' }] },
] as never;

const statusBar = () => (
  <SessionStatusBar status="hosting" statusTone="success" name="Friday run" host="This computer" address="localhost:38281"
    seed="48213907715260934413" uptime="42 min" progress={null} copied={false} stoppable onResetLayout={noop} onCopy={noop} onStop={noop} />
);

const PLAYERS = [
  { slot: 1, name: 'Ana', game: 'Timespinner', status: 'playing', checked: 112, total: 220 },
  { slot: 2, name: 'Bram', game: 'A Link to the Past', status: 'playing', checked: 74, total: 216 },
  { slot: 3, name: 'Cleo', game: 'Hollow Knight', status: 'offline', checked: 9, total: 310 },
] as never;

const SCENES: Record<string, Scene> = {
  'T-12': {
    width: 760,
    render: () => (
      <>
        <L>Session builder: ProblemList</L>
        <ProblemList problems={['Two players are named Bram', 'Cleo: import a player file', 'Ana: start_inventory must be a map of item names to counts', 'Pick a server to host on']} />
        <L>Server editor: problems as captions under the header</L>
        <div className="h-frame"><ServerManagerDetailProblems /></div>
      </>
    ),
  },
  'T-13': {
    width: 1180,
    render: () => (
      <>
        <L>Preset editor: EditorHeader</L>
        <EditorHeader name="Keysanity" onNameChange={noop} gameLabel="A Link to the Past" canSave busy={false} dirty
          onSave={noop} onResetAll={noop} onDuplicate={noop} onDelete={noop} onImport={noop} onExport={noop} />
        <L>Session builder: BuilderHeader</L>
        <BuilderHeader name="Friday run" saved busy={false} canRun onBack={noop} onName={noop} onSave={noop} onRun={noop} />
      </>
    ),
  },
  'T-14': {
    width: 620,
    render: () => (
      <>
        <L>Preset editor header at 620 px</L>
        <EditorHeader name="Keysanity" onNameChange={noop} gameLabel="A Link to the Past" canSave busy={false} dirty
          onSave={noop} onResetAll={noop} onDuplicate={noop} onDelete={noop} onImport={noop} onExport={noop} />
        <L>TemplateRow</L>
        <TemplateRow id="t1" name="Friday run" meta="Timespinner, A Link to the Past, Hollow Knight" playersLabel="3 players" onEdit={noop} onRun={noop} onDuplicate={noop} onDelete={noop} />
        <L>RunRow</L>
        <div role="list"><RunRow id="r1" when="2 hours ago" name="Friday run" host="This computer" status={{ label: 'stopped', tone: 'neutral' }} hasLog canDelete onOpen={noop} onShowLog={noop} onDelete={noop} /></div>
        <L>Session bar</L>
        {statusBar()}
      </>
    ),
  },
  'T-15': {
    width: 1500,
    render: () => (
      <>
        <div className="h-row">
          <div style={{ flex: '0 0 360px' }}>
            <L>Presets page: PresetList</L>
            <div style={{ marginTop: 20 }}><PresetList groups={PRESET_GROUPS} total={4} selectedId="p2" loading={false} error={null} canCreate onSelect={noop} onNew={noop} /></div>
          </div>
          <div>
            <L>Servers page: ServerManager on MasterDetailLayout</L>
            <div style={{ height: 640, display: 'flex', overflow: 'hidden', marginTop: 20 }}><ServerManager /></div>
          </div>
        </div>
      </>
    ),
  },
  'T-16': {
    width: 760,
    render: () => (
      <>
        <L>Servers: ServerTestPanel after Test connection</L>
        <ServerTestPanel test={SERVERS[0].lastTest ?? null} pinned={SERVERS[0].hostKeySha256} busy={false} onTrust={noop} />
      </>
    ),
  },
  'T-17': {
    width: 760,
    render: () => (
      <>
        <L>Players and Hints widgets: LiveNotice per phase</L>
        <LiveNotice phase="idle" error={null} onPassword={noop} />
        <LiveNotice phase="connecting" error={null} onPassword={noop} />
        <LiveNotice phase="failed" error="connect ECONNREFUSED 127.0.0.1:38281" onPassword={noop} />
        <LiveNotice phase="closed" error={null} onPassword={noop} />
        <LiveNotice phase="password" error="Invalid password" onPassword={noop} />
        <L>Session bar status pill</L>
        {statusBar()}
      </>
    ),
  },
  'T-18': {
    width: 520,
    render: () => (<><L>Console widget (content, without the widget frame)</L><ConsoleWidget session={SESSION} enabled /></>),
  },
  'T-19': {
    width: 760,
    render: () => (
      <>
        <L>Server editor: key file and Archipelago path (ServerForm)</L>
        <ServerForm entry={SERVERS[0]} inputs={{ password: '', passphrase: '' }} onEntry={noop} onInputs={noop} />
        <L>Session builder: player from a file (PlayerRow)</L>
        <PlayerRow slot={3} name="Cleo" game="Hollow Knight" source="yaml" fileName="Cleo_HK.yaml" gameOptions={GAMES} sourceOptions={SOURCES} overrides="from file" changed={false} selected={false} canEdit={false}
          onName={noop} onGame={noop} onSource={noop} onImport={noop} onEdit={noop} onDuplicate={noop} onRemove={noop} />
        <L>Data overview: data folder path</L>
        <DataOverviewTop />
      </>
    ),
  },
  'T-20': {
    width: 620,
    render: () => (<><L>Room widget (content, without the widget frame)</L><RoomWidget session={SESSION} lines={[]} /></>),
  },
  'T-21': {
    width: 1180,
    render: () => (
      <>
        <L>Games store: GameCard</L>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          <GameCard title="Timespinner" source="Official" status={{ label: 'update', tone: 'warning' }} details={['World 1.2.0', 'For AP 0.6.7']} actions={[{ label: 'Update', onClick: noop, variant: 'primary' }, { label: 'Remove', onClick: noop, variant: 'danger' }]} />
          <GameCard title="The Grinch" source="Community" tag="stable" details={['World 1.5.8', 'Tracker available', 'Played on PC (Steam)']} actions={[{ label: 'Install', onClick: noop, variant: 'primary' }]} />
          <GameCard title="Hollow Knight" source="Official" status={{ label: 'installed', tone: 'success' }} details={['World 0.6.7', 'For AP 0.6.7']} actions={[{ label: 'Make a preset', onClick: noop }, { label: 'Remove', onClick: noop, variant: 'danger' }]} />
        </div>
      </>
    ),
  },
  'T-22': {
    width: 1280,
    render: () => (<><L>Session builder players at 1280 px</L>{playerRows()}</>),
  },
  'T-22-narrow': {
    width: 760,
    render: () => (<><L>Same rows at 760 px: the header row is hidden under 60rem</L>{playerRows()}</>),
  },
  'T-23': { width: 980, render: () => (<><L>Preset editor: option rows</L>{optionsForm()}</>) },
  ActionTile: {
    width: 1180,
    render: () => (
      <>
        <L>Session summary: StatTile row (StatCard with an action was deleted in 2ed76d4)</L>
        <SessionSummary players={PLAYERS} hints={[]} phase="live" uptime="42 min" status="Hosting" />
        <L>Session bar: SessionStatusBar</L>
        {statusBar()}
        <L>Data overview: domain cards, the folder button sits apart from them</L>
        <DataOverview />
      </>
    ),
  },
};

const ServerManagerDetailProblems = () => <div style={{ height: 230, overflow: 'hidden' }}><ServerManagerFor id="srv3" /></div>;
const ServerManagerFor = ({ id }: { id: string }) => {
  if (!location.hash.includes('server=')) history.replaceState(null, '', `${location.pathname}${location.hash}?server=${id}`);
  return <ServerManager />;
};
const DataOverviewTop = () => <div style={{ maxHeight: 120, overflow: 'hidden' }}><DataOverview /></div>;

export { SCENES };
