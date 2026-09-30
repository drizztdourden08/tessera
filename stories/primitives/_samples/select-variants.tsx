/* @layer stories @kind component */
import { useState } from 'react';
import { Box, Button, ButtonRow, Select, Text } from '../../../src/primitives';
import type { ListboxColumn } from '../../../src/primitives';
import { ValueReadout } from '../../_template/ValueReadout';
import { BuildDetails } from './BuildDetails';
import { BuildLine } from './BuildLine';
import { BUILDS, GAMES, PLAYERS, REGION_GROUPS, REGIONS } from './picker-data';
import { BUILD_COLUMNS, GAME_CATEGORIES, GAME_COLUMNS, STATUS_COLUMNS } from './picker-emoji';
import { useLateBuilds } from './picker-live';
import type { Build, Game, Player } from './picker-data';

const PLAYER_COLUMNS: readonly ListboxColumn<Player>[] = [
  { field: 'name' },
  { field: 'role', tone: 'muted' },
  { field: 'online', map: { true: 'online', false: 'away' }, tone: { true: 'success', false: 'muted' }, align: 'end' },
];

const nameOf = (item: { name: string } | { title: string } | null): string => {
  if (item === null) return 'none';
  return 'name' in item ? item.name : item.title;
};

const PlainStrings = () => {
  const [region, setRegion] = useState<string | null>('Eastern Palace');
  return (
    <ValueReadout value={region ?? 'none'}>
      <Select items={REGIONS} value={region} onChange={setRegion} placeholder="Pick a region" />
    </ValueReadout>
  );
};

type BuildPickerProps = { columns?: readonly ListboxColumn<Build>[]; full?: boolean; details?: boolean; compact?: boolean };

const BuildPicker = (props: BuildPickerProps) => {
  const { columns, full, details, compact } = props;
  const [build, setBuild] = useState<Build | null>(BUILDS[2] ?? null);
  return (
    <ValueReadout value={nameOf(build)}>
      <Select
        className="picker-narrow"
        items={BUILDS}
        columns={columns}
        itemComponent={details ? BuildDetails : undefined}
        valueComponent={compact ? BuildLine : undefined}
        valueDisplay={full ? 'full' : 'label'}
        value={build}
        onChange={setBuild}
        placeholder="Pick a build"
      />
    </ValueReadout>
  );
};

const ObjectColumns = () => <BuildPicker columns={BUILD_COLUMNS} />;

const ConditionalColumns = () => <BuildPicker columns={STATUS_COLUMNS} />;

const DetailsFull = () => <BuildPicker details full />;

const DetailsCompact = () => <BuildPicker details compact />;

const FullTrigger = () => (
  <Box className="story-column">
    <Text className="story-label">compact, the label only</Text>
    <BuildPicker columns={STATUS_COLUMNS} />
    <Text className="story-label">full, the same columns in the trigger</Text>
    <BuildPicker columns={STATUS_COLUMNS} full />
  </Box>
);

const Categories = () => {
  const [game, setGame] = useState<Game | null>(null);
  return (
    <ValueReadout value={nameOf(game)}>
      <Select items={GAMES} columns={GAME_COLUMNS} groupBy="kind" categories={GAME_CATEGORIES} value={game} onChange={setGame} placeholder="Pick a game" />
    </ValueReadout>
  );
};

const MultiSelect = () => {
  const [players, setPlayers] = useState<Player[]>(PLAYERS.slice(0, 1));
  return (
    <ValueReadout value={players.map((player) => player.name)}>
      <Select items={PLAYERS} columns={PLAYER_COLUMNS} max={3} values={players} onValuesChange={setPlayers} placeholder="Pick up to three players" />
    </ValueReadout>
  );
};

const Optional = () => {
  const [region, setRegion] = useState<string | null>(null);
  return (
    <ValueReadout value={region ?? 'none'}>
      <Select items={REGIONS} min={0} value={region} onChange={setRegion} placeholder="Any region" />
    </ValueReadout>
  );
};

const OneProperty = () => {
  const [playerId, setPlayerId] = useState<number | null>(3);
  return (
    <ValueReadout value={playerId === null ? 'none' : `id ${playerId}`}>
      <Select items={PLAYERS} valueField="id" columns={PLAYER_COLUMNS} value={playerId} onChange={setPlayerId} placeholder="Pick a player" />
    </ValueReadout>
  );
};

const AsyncList = () => {
  const { builds, loading, reload, reorder } = useLateBuilds();
  const [buildId, setBuildId] = useState<number | null>(101);
  return (
    <ValueReadout value={buildId === null ? 'none' : `build ${buildId}`}>
      <Select items={builds} valueField="id" columns={STATUS_COLUMNS} loading={loading} emptyText="No builds yet" value={buildId} onChange={setBuildId} placeholder="Pick a build" />
      <ButtonRow>
        <Button size="sm" variant="secondary" onClick={reload}>Load again</Button>
        <Button size="sm" variant="secondary" onClick={reorder} disabled={loading}>Reorder the list</Button>
      </ButtonRow>
    </ValueReadout>
  );
};

const OptionsAndGroups = () => {
  const [region, setRegion] = useState('desert');
  return (
    <ValueReadout value={region === '' ? 'none' : region}>
      <Select groups={REGION_GROUPS} searchable value={region} onChange={setRegion} placeholder="Pick a region" />
    </ValueReadout>
  );
};

export {
  AsyncList, Categories, ConditionalColumns, DetailsCompact, DetailsFull, FullTrigger, MultiSelect, ObjectColumns, OneProperty, Optional, OptionsAndGroups, PlainStrings,
};
