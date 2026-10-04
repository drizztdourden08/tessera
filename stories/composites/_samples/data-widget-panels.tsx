/* @layer stories @kind component */
import { useState } from 'react';
import { LogPanel } from '../../../src/composites';
import { Box, ProgressBar, Stack, Status, Text, TextInput } from '../../../src/primitives';
import type { StatusTone } from '../../../src/primitives';
import { HINTS } from './data-hints';
import { LOG_ROWS } from './data-log';
import { PLAYERS, playerName } from './data-players';
import '../LogPanel.stories.css';
import type { PlayerRow, PlayerStatus } from './data-players';

const STATUS_TONE: Record<PlayerStatus, StatusTone> = {
  playing: 'success', idle: 'warning', goal: 'neutral', offline: 'danger',
};

type PlayersView = { compact?: boolean; sort?: 'name' | 'progress'; finished?: boolean };

const playersFor = (view: PlayersView): PlayerRow[] => {
  const shown = PLAYERS.filter((player) => view.finished !== false || player.status !== 'goal');
  if (view.sort === 'name') return [...shown].sort((a, b) => a.name.localeCompare(b.name));
  if (view.sort === 'progress') return [...shown].sort((a, b) => b.checked / b.total - a.checked / a.total);
  return shown;
};

const PlayersPanel = (props: PlayersView) => (
  <Stack className="widget-story__list">
    {playersFor(props).map((player) => (
      <Box key={player.id} className="widget-story__player">
        <Box className="story-row">
          <Text>{player.name}</Text>
          <Status tone={STATUS_TONE[player.status]}>{player.status}</Status>
        </Box>
        {!props.compact && <Text className="story-label">{player.game}</Text>}
        {!props.compact && <ProgressBar value={player.checked} max={player.total} />}
      </Box>
    ))}
  </Stack>
);

const LogWidget = () => <LogPanel rows={LOG_ROWS} className="server-log" countLabel="lines" height="fill" />;

const HintsPanel = () => (
  <Stack className="widget-story__list">
    {HINTS.map((hint) => (
      <Box key={hint.id} className="widget-story__hint">
        <Text>{`${hint.item} for ${playerName(hint.receiver) ?? hint.receiver}`}</Text>
        <Text className="story-label">{`${hint.location}, in ${playerName(hint.finder) ?? hint.finder}'s world`}</Text>
      </Box>
    ))}
  </Stack>
);

const ConsolePanel = () => {
  const [lines, setLines] = useState<string[]>(['Connected to mw.harbor.local:38281', 'Type /players or /hint <item>']);
  const [draft, setDraft] = useState('');
  const submit = () => {
    if (!draft.trim()) return;
    setLines((prev) => [...prev, `> ${draft}`, `Unknown command: ${draft.split(' ')[0]}`]);
    setDraft('');
  };
  return (
    <Stack className="widget-story__console">
      <Box className="widget-story__list widget-story__lines">
        {lines.map((line, i) => <Text key={`${i}-${line}`} className="widget-story__mono">{line}</Text>)}
      </Box>
      <TextInput
        value={draft}
        placeholder="Command"
        onChange={(event) => setDraft(event.target.value)}
        onKeyDown={(event) => { if (event.key === 'Enter') submit(); }}
      />
    </Stack>
  );
};

const WIDGET_CONTENT = {
  players: <PlayersPanel />,
  log: <LogWidget />,
  hints: <HintsPanel />,
  console: <ConsolePanel />,
};

export { PlayersPanel, WIDGET_CONTENT };
export type { PlayersView };
