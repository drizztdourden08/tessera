/* @layer stories @kind story */
import type { StoryLiteMeta } from '@storylite/storylite';
import { ActionTile } from '../../src/composites/ActionTile';
import { StatTile } from '../../src/composites';
import { Box, Text } from '../../src/primitives';
import './spike.css';

const meta = { title: 'Spike/ActionTile', parameters: { renderer: 'react' } } satisfies StoryLiteMeta;
const noop = () => {};

const Proposed = {
  name: 'Proposed',
  render: () => (
    <Box className="spike-shot spike-shot--xwide">
      <Text className="spike-caption">Session dashboard: the summary row, each tile leads to the widget or does its one job</Text>
      <Box className="spike-grid-4">
        <ActionTile label="Players" icon="users" value="2 / 3" unit="connected" meta="Cleo is offline" onOpen={noop} openLabel="Show the Players widget" />
        <ActionTile label="Address" icon="link" value="localhost:38281" meta="Players join here" action={{ label: 'Copy address', icon: 'copy', onSelect: noop }} />
        <ActionTile label="Hints" icon="sparkles" value="4" unit="open" meta="2 found" onOpen={noop} openLabel="Show the Hints widget" />
        <ActionTile label="Uptime" icon="clock" value="42 min" status={{ label: 'hosting', tone: 'success' }} meta="Auto shutdown after 2 h idle" action={{ label: 'Stop', icon: 'square', variant: 'danger', onSelect: noop }} />
      </Box>
      <Text className="spike-caption">Data overview: one tile per data domain, its action and its folder on the tile</Text>
      <Box className="spike-grid-4">
        <ActionTile label="Session runs" icon="history" value="1.6 GB" meta="14 runs, oldest 3 months ago" tools={[{ label: 'Open the runs folder', icon: 'folder-open', onSelect: noop }]} action={{ label: 'Clean old runs', icon: 'trash-2', onSelect: noop }} />
        <ActionTile label="Installed worlds" icon="gamepad-2" value="512 MB" meta="9 worlds, 3 with updates" tools={[{ label: 'Open the worlds folder', icon: 'folder-open', onSelect: noop }]} action={{ label: 'Open games', onSelect: noop }} />
        <ActionTile label="Engine" icon="cpu" value="288 MB" meta="Archipelago 0.6.7" status={{ label: 'ready', tone: 'success' }} tools={[{ label: 'Open the engine folder', icon: 'folder-open', onSelect: noop }]} action={{ label: 'Rebuild engine', icon: 'refresh-cw', variant: 'danger', onSelect: noop }} />
        <ActionTile label="Presets" icon="sliders-horizontal" value="23" unit="presets" meta="410 KB" tools={[{ label: 'Open the presets folder', icon: 'folder-open', onSelect: noop }]} action={{ label: 'Export presets', icon: 'download', onSelect: noop }} />
      </Box>
      <Text className="spike-caption">Next to StatTile: StatTile stays a passive reading (trend, delta, sparkline); ActionTile has no trend but takes an action, tools and onOpen</Text>
      <Box className="spike-grid-4">
        <StatTile label="Checks" value="195" unit="seen by the server" delta="+12" trend="up" />
        <ActionTile label="Games" icon="gamepad-2" value="12" unit="installed" meta="3 with updates" action={{ label: 'Update all', icon: 'download', variant: 'primary', onSelect: noop }} onOpen={noop} openLabel="Open games" />
        <ActionTile size="sm" label="Seed" value="48213907715260934413" action={{ label: 'Copy seed', icon: 'copy', onSelect: noop }} />
        <ActionTile size="sm" label="Server" icon="server" value="Home NAS" status={{ label: 'failing', tone: 'danger' }} meta="2 of 5 checks failed" action={{ label: 'Test again', icon: 'refresh-cw', onSelect: noop }} />
      </Box>
    </Box>
  ),
};

const Overview = { name: 'Overview', render: () => <Text variant="body">ActionTile proposal (T-07).</Text> };

export default meta;
export { Overview, Proposed };
